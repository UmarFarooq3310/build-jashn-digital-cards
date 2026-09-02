'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export function ToastNotification() {
  const storeToast = useJashn((s) => s.toast)
  const hideToast = useJashn((s) => s.hideToast)
  const [toast, setToast] = useState<{ id?: string | number; message: string; type: 'success' | 'info' | 'error' } | null>(null)
  const { lang } = useLang()
  const isRtl = lang === 'ur' || lang === 'ar'

  useEffect(() => {
    if (storeToast) {
      setToast(storeToast as any)
    }
  }, [storeToast])

  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        setToast(customEvent.detail)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('jashn-toast', handleCustomToast)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('jashn-toast', handleCustomToast)
      }
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
      hideToast()
    }, 4500)
    return () => clearTimeout(timer)
  }, [toast?.id, toast?.message, hideToast])

  if (!toast) return null

  const isError = toast.type === 'error'

  const handleClose = () => {
    setToast(null)
    hideToast()
  }

  return (
    <div
      key={(toast as any)?.id || toast.message}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(
        "fixed z-[99999999] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto shadow-2xl transition-all duration-300 pointer-events-auto animate-in fade-in slide-in-from-bottom-5",
        // Safe offset above mobile bottom bars (bottom-20) and bottom-6 on tablet/desktop
        "bottom-20 sm:bottom-6",
        // RTL on bottom-left, LTR on bottom-right
        isRtl ? "left-4 sm:left-6" : "right-4 sm:right-6"
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3.5 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300',
          isError && 'bg-red-600/95 text-white border-red-500 shadow-[0_10px_30px_rgba(220,38,38,0.5)]',
          toast.type === 'success' && 'bg-emerald-600/95 text-white border-emerald-500 shadow-[0_10px_30px_rgba(5,150,105,0.4)]',
          toast.type === 'info' && 'bg-slate-900/95 text-white border-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.4)]',
          isRtl && 'font-urdu text-right'
        )}
      >
        <span className="shrink-0 flex items-center justify-center size-8 rounded-full bg-white/20 shadow-inner">
          {toast.type === 'success' && <CheckCircle2 className="size-5 text-white" />}
          {isError && <AlertCircle className="size-5 text-white animate-pulse" />}
          {toast.type === 'info' && <Info className="size-5 text-white" />}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-snug text-white break-words">
            {toast.message}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notification"
          className="rounded-lg p-1.5 hover:bg-white/20 text-white/90 hover:text-white transition-colors shrink-0"
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    </div>
  )
}
