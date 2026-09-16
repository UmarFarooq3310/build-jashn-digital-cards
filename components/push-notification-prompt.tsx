'use client';

import { useState, useEffect } from 'react';
import { subscribeToPush } from '@/lib/push-notifications';
import { Bell, CheckCircle2, X, AlertCircle } from 'lucide-react';

export function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deniedNotice, setDeniedNotice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

    // 1. If already granted, immediately register & sync token in background
    if (Notification.permission === 'granted') {
      subscribeToPush().catch((err) => {
        console.warn('Auto push subscription notice:', err);
      });
      setShowPrompt(false);
      setShowBell(false);
      return;
    }

    // 2. If denied, show floating bell so user can get unblock instructions if they want
    if (Notification.permission === 'denied') {
      setShowPrompt(false);
      setShowBell(true);
      return;
    }

    // 3. If default (not yet requested)
    setShowPrompt(true);
    setShowBell(false);

    // Also listen to custom event to reopen prompt if triggered from menu
    const handleReopen = () => {
      setShowPrompt(true);
      setDeniedNotice(false);
    };
    window.addEventListener('open_push_prompt', handleReopen);
    return () => window.removeEventListener('open_push_prompt', handleReopen);
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    setDeniedNotice(false);
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'denied') {
        setDeniedNotice(true);
        setLoading(false);
        return;
      }

      const token = await subscribeToPush();
      if (token) {
        setSuccess(true);
        setShowBell(false);
        setTimeout(() => {
          setShowPrompt(false);
          setSuccess(false);
        }, 2200);
      } else {
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'denied') {
          setDeniedNotice(true);
        } else {
          setShowPrompt(false);
          setShowBell(true);
        }
      }
    } catch (err) {
      console.error(err);
      setShowPrompt(false);
      setShowBell(true);
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
                <span className="font-extrabold text-sm tracking-wide">Device registered for notifications! 🎉</span>
              </div>
            ) : deniedNotice ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-amber-400">
                  <AlertCircle className="size-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Notifications are Blocked</h4>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      To receive notifications on this phone, tap the <strong>🔒 lock / tune icon</strong> in your browser address bar above, go to <strong>Permissions → Notifications</strong>, and select <strong>Allow</strong>. Then refresh.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => { setDeniedNotice(false); setShowPrompt(false); setShowBell(true); }}
                    className="px-4 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                  >
                    Got It
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
                    className="px-5 py-2 min-h-[42px] text-xs font-black bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
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
          onClick={() => setShowPrompt(true)}
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
