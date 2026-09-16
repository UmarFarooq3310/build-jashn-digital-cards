'use client';

import { useState, useEffect } from 'react';
import { subscribeToPush, isSubscribed } from '@/lib/push-notifications';
import { Bell, CheckCircle2, X } from 'lucide-react';

export function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
    
    // If already granted, immediately register/refresh device token in Firestore in background
    if (Notification.permission === 'granted') {
      subscribeToPush().catch((err) => {
        console.warn('Auto push subscription notice:', err);
      });
      return;
    }

    // If permission was explicitly denied, do not bother the user with the prompt
    if (Notification.permission === 'denied') {
      return;
    }

    // Check if dismissed recently (7 days)
    const dismissed = localStorage.getItem('cardzy_push_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) return;
    }

    // Show single clean custom card on open
    setShow(true);
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    try {
      const token = await subscribeToPush();
      if (token) {
        setSuccess(true);
        setTimeout(() => setShow(false), 2000);
      } else {
        setShow(false);
      }
    } catch (err) {
      console.error(err);
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('cardzy_push_dismissed', Date.now().toString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-[2147483645] w-[calc(100vw-24px)] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto"
      role="dialog"
      aria-label="Notification Permission"
    >
      <div className="bg-[#090b10]/95 backdrop-blur-2xl border border-amber-500/50 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] p-4 sm:p-5 text-slate-100 flex flex-col gap-3 relative overflow-hidden ring-1 ring-white/10">
        {/* Subtle decorative gold sheen */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {success ? (
          <div className="flex items-center gap-3 py-1 text-emerald-400">
            <CheckCircle2 className="size-5 shrink-0" />
            <span className="font-extrabold text-sm tracking-wide">Notifications enabled successfully! 🎉</span>
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
                    Get instant event alerts, RSVP replies & new 3D card templates directly on your screen.
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
  );
}
