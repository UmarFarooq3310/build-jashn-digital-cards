'use client';

import { useState, useEffect } from 'react';
import { subscribeToPushWithResult } from '@/lib/push-notifications';
import { useJashn } from '@/lib/jashn/store';
import { Bell, CheckCircle2, X, AlertCircle, RefreshCw, Share, Plus } from 'lucide-react';

// ─── Platform detection helpers ─────────────────────────────────────────────

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isInStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false
  return (
    ('standalone' in window.navigator && (window.navigator as any).standalone === true) ||
    window.matchMedia('(display-mode: standalone)').matches
  )
}

function isPushSupported(): boolean {
  if (typeof window === 'undefined') return false
  // iOS in-browser (not installed as PWA) cannot receive push — skip entirely
  if (isIos() && !isInStandaloneMode()) return false
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
}

const DISMISS_KEY = 'cardzy_push_dismissed_at'
const SUBSCRIBED_KEY = 'cardzy_push_subscribed'
// Don't show again for 7 days after dismissal
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000

function wasDismissedRecently(): boolean {
  try {
    const ts = localStorage.getItem(DISMISS_KEY)
    if (!ts) return false
    return Date.now() - parseInt(ts, 10) < DISMISS_COOLDOWN_MS
  } catch { return false }
}

function markDismissed() {
  try { localStorage.setItem(DISMISS_KEY, Date.now().toString()) } catch {}
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PushNotificationPrompt() {
  const user = useJashn(s => s.user);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── Track notification click ──────────────────────────────────────────
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const clickedNotifId = urlParams.get('_cnid');
      if (clickedNotifId) {
        const sessionKey = 'tracked_notif_' + clickedNotifId;
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, 'true');
          fetch('/api/push/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationId: clickedNotifId }),
            keepalive: true,
          }).catch(() => {});
        }
        urlParams.delete('_cnid');
        const cleanSearch = urlParams.toString();
        const cleanUrl = window.location.pathname + (cleanSearch ? '?' + cleanSearch : '') + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (_) {}

    // ── iOS in-browser: show "Add to Home Screen" guide instead ──────────
    if (isIos() && !isInStandaloneMode()) {
      const alreadyShown = sessionStorage.getItem('cardzy_ios_guide_shown')
      if (!alreadyShown && !localStorage.getItem(SUBSCRIBED_KEY)) {
        // Delay slightly so it doesn't flash immediately on load
        const t = setTimeout(() => {
          setShowIosGuide(true)
          sessionStorage.setItem('cardzy_ios_guide_shown', 'true')
        }, 4000)
        return () => clearTimeout(t)
      }
      return
    }

    // ── Non-iOS: standard push flow ───────────────────────────────────────
    if (!isPushSupported()) return;

    // Register / update service worker
    navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
      .then((reg) => reg.update().catch(() => {}))
      .catch(() => {});

    // If user previously subscribed but has since reset/revoked permission → clear stale flag so we re-register
    if (localStorage.getItem(SUBSCRIBED_KEY) === 'true' && Notification.permission !== 'granted') {
      localStorage.removeItem(SUBSCRIBED_KEY);
    }

    // Already subscribed previously — don't re-prompt or re-subscribe
    if (localStorage.getItem(SUBSCRIBED_KEY) === 'true') return;

    // Already granted — silently re-subscribe in background
    if (Notification.permission === 'granted') {
      subscribeToPushWithResult(false, user?.uid)
        .then((res) => {
          if (res.success) { setShowPrompt(false); setShowBell(false); }
        })
        .catch(() => {});
      return;
    }

    // Already denied — show floating bell with guidance
    if (Notification.permission === 'denied') {
      if (!wasDismissedRecently()) setShowBell(true);
      return;
    }

    // Dismissed recently — don't re-prompt
    if (wasDismissedRecently()) {
      setShowBell(true);
      return;
    }

    // Default — show prompt after short delay
    const t = setTimeout(() => setShowPrompt(true), 3000)

    const handleReopen = () => { setShowPrompt(true); setErrorMessage(null); };
    window.addEventListener('open_push_prompt', handleReopen);
    return () => {
      clearTimeout(t)
      window.removeEventListener('open_push_prompt', handleReopen);
    };
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      if (Notification.permission === 'denied') {
        setErrorMessage('Notifications are blocked. Tap the 🔒 lock icon in your address bar → set Notifications to "Allow".');
        setLoading(false);
        return;
      }
      const res = await subscribeToPushWithResult(false, user?.uid);
      if (res.success && res.token) {
        setSuccess(true);
        setShowBell(false);
        setTimeout(() => { setShowPrompt(false); setSuccess(false); }, 2500);
      } else {
        setErrorMessage(res.error || 'Failed to register. Please tap Retry.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error subscribing to notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    markDismissed();
    setShowPrompt(false);
    setShowBell(true);
  };

  const handleIosDismiss = () => {
    markDismissed();
    setShowIosGuide(false);
  };

  return (
    <>
      {/* ── iOS "Add to Home Screen" Guide ─────────────────────────────────── */}
      {showIosGuide && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[2147483645] w-[calc(100vw-24px)] max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto">
          <div className="bg-[#090b10]/97 backdrop-blur-2xl border border-amber-500/50 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] p-5 text-slate-100 space-y-3 relative ring-1 ring-white/10">
            <button onClick={handleIosDismiss} className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Bell className="size-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-tight">Get Notifications on iPhone</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Add Cardzy to your Home Screen first</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {[
                { icon: <Share className="size-4 text-blue-400 shrink-0" />, text: 'Tap the Share button at the bottom of Safari' },
                { icon: <Plus className="size-4 text-blue-400 shrink-0" />, text: 'Tap "Add to Home Screen"' },
                { icon: <Bell className="size-4 text-amber-400 shrink-0" />, text: 'Open Cardzy from your Home Screen & enable notifications' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="size-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">{i + 1}</div>
                  {step.icon}
                  <span>{step.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleIosDismiss}
              className="w-full py-2.5 text-xs font-bold text-zinc-400 hover:text-white border border-white/10 rounded-xl transition-colors mt-1"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* ── Main Permission Prompt ──────────────────────────────────────────── */}
      {showPrompt && (
        <div
          className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-[2147483645] w-[calc(100vw-24px)] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto"
          role="dialog"
          aria-label="Push Notifications"
        >
          <div className="bg-[#090b10]/95 backdrop-blur-2xl border border-amber-500/50 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] p-4 sm:p-5 text-slate-100 flex flex-col gap-3 relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            {success ? (
              <div className="flex items-center gap-3 py-1 text-emerald-400">
                <CheckCircle2 className="size-5 shrink-0" />
                <div>
                  <div className="font-extrabold text-sm">Notifications Enabled! 🎉</div>
                  <div className="text-[11px] text-zinc-300">You'll get instant card views & RSVP alerts.</div>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-rose-400">
                  <AlertCircle className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Notifications Blocked</h4>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/10">
                  <button onClick={() => { markDismissed(); setErrorMessage(null); setShowPrompt(false); setShowBell(true); }} className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:text-white rounded-xl">
                    Close
                  </button>
                  <button onClick={handleEnable} disabled={loading} className="px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl flex items-center gap-1.5">
                    {loading ? <RefreshCw className="size-3.5 animate-spin" /> : <Bell className="size-3.5" />}
                    {loading ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-sm">
                      <Bell className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Stay Updated 🔔</h4>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                        Get instant card views, RSVP responses & event updates.
                      </p>
                    </div>
                  </div>
                  <button onClick={handleDismiss} className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer" aria-label="Close">
                    <X className="size-4" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10 mt-1">
                  <button onClick={handleDismiss} disabled={loading} className="px-4 py-2 min-h-[42px] text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all disabled:opacity-50 cursor-pointer">
                    Not Now
                  </button>
                  <button onClick={handleEnable} disabled={loading} className="px-5 py-2 min-h-[42px] text-xs font-black bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2">
                    {loading && <RefreshCw className="size-3.5 animate-spin" />}
                    {loading ? 'Enabling...' : 'Enable Notifications'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Floating Bell (minimised state) ────────────────────────────────── */}
      {showBell && !showPrompt && !showIosGuide && (
        <button
          onClick={() => { setShowPrompt(true); setErrorMessage(null); }}
          className="fixed bottom-6 right-4 sm:right-6 z-[2147483640] size-11 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Enable notifications"
        >
          <Bell className="size-5 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
        </button>
      )}
    </>
  );
}
