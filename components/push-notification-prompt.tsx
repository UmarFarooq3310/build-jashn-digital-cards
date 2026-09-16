'use client';

import { useState, useEffect } from 'react';
import { subscribeToPushWithResult } from '@/lib/push-notifications';
import { Bell, CheckCircle2, X, AlertCircle, RefreshCw } from 'lucide-react';

export function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

    // 1. If already granted, attempt background registration
    if (Notification.permission === 'granted') {
      subscribeToPushWithResult()
        .then((res) => {
          if (res.success) {
            setShowPrompt(false);
            setShowBell(false);
          } else if (res.error) {
            console.warn('Background auto push registration note:', res.error);
          }
        })
        .catch(() => {});
    }

    // 2. If denied, show floating bell with unblock guidance
    if (Notification.permission === 'denied') {
      setShowPrompt(false);
      setShowBell(true);
      return;
    }

    // 3. Show prompt by default if not granted
    if (Notification.permission === 'default') {
      setShowPrompt(true);
      setShowBell(false);
    }

    const handleReopen = () => {
      setShowPrompt(true);
      setErrorMessage(null);
    };
    window.addEventListener('open_push_prompt', handleReopen);
    return () => window.removeEventListener('open_push_prompt', handleReopen);
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'denied') {
        setErrorMessage('Notifications are blocked in your browser. Tap the 🔒 icon in the address bar to set Notifications to Allow.');
        setLoading(false);
        return;
      }

      const res = await subscribeToPushWithResult();
      if (res.success && res.token) {
        setSuccess(true);
        setShowBell(false);
        setTimeout(() => {
          setShowPrompt(false);
          setSuccess(false);
        }, 2500);
      } else {
        setErrorMessage(res.error || 'Failed to register push token. Tap Retry.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error subscribing to notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowBell(true);
  };

  return (
    <>
      {/* 1. Main Permission Prompt Card */}
      {showPrompt && (
        <div 
          className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-[2147483645] w-[calc(100vw-24px)] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto"
          role="dialog"
          aria-label="Push Notifications"
        >
          <div className="bg-[#090b10]/95 backdrop-blur-2xl border border-amber-500/50 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] p-4 sm:p-5 text-slate-100 flex flex-col gap-3 relative overflow-hidden ring-1 ring-white/10">
            {/* Subtle decorative gold sheen */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            {success ? (
              <div className="flex items-center gap-3 py-1 text-emerald-400">
                <CheckCircle2 className="size-5 shrink-0" />
                <div>
                  <div className="font-extrabold text-sm tracking-wide">Phone Registered Successfully! 🎉</div>
                  <div className="text-[11px] text-zinc-300">You will now receive instant push alerts.</div>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-rose-400">
                  <AlertCircle className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Push Setup Notice</h4>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed whitespace-pre-line">
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/10">
                  <button
                    onClick={() => { setErrorMessage(null); setShowPrompt(false); setShowBell(true); }}
                    className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:text-white rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEnable}
                    disabled={loading}
                    className="px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl flex items-center gap-1.5"
                  >
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
                        Get instant card views, RSVP responses & event updates on your phone screen.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDismiss} 
                    className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10 mt-1">
                  <button 
                    onClick={handleDismiss}
                    disabled={loading}
                    className="px-4 py-2 min-h-[42px] text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Not Now
                  </button>
                  <button 
                    onClick={handleEnable}
                    disabled={loading}
                    className="px-5 py-2 min-h-[42px] text-xs font-black bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {loading && <RefreshCw className="size-3.5 animate-spin" />}
                    {loading ? 'Enabling...' : 'Enable Notifications'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Floating Bell Button when minimized on mobile/desktop */}
      {showBell && !showPrompt && (
        <button
          onClick={() => {
            setShowPrompt(true);
            setErrorMessage(null);
          }}
          className="fixed bottom-6 right-4 sm:right-6 z-[2147483640] size-11 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Enable notifications"
          title="Enable notifications"
        >
          <Bell className="size-5 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
        </button>
      )}
    </>
  );
}
