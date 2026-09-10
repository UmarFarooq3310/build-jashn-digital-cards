'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    showToast?: (message: string, type?: 'success' | 'info' | 'error') => void
  }
}

export function ToastNotification() {
  const [mounted, setMounted] = useState(false)
  const storeToast = useJashn((s) => s.toast)
  const hideToast = useJashn((s) => s.hideToast)
  const [toast, setToast] = useState<{ id?: string | number; message: string; type: 'success' | 'info' | 'error' } | null>(null)
  const { lang } = useLang()
  const isRtl = lang === 'ur' || lang === 'ar'

  useEffect(() => {
    setMounted(true)

    // Expose global showToast method on window
    window.showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
      const toastObj = { id: Date.now() + Math.random(), message, type }
      setToast(toastObj)
    }

    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        setToast(customEvent.detail)
      }
    }

    window.addEventListener('jashn-toast', handleCustomToast)
    return () => {
      window.removeEventListener('jashn-toast', handleCustomToast)
    }
  }, [])

  useEffect(() => {
    if (storeToast) {
      setToast(storeToast as any)
    }
  }, [storeToast])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
      hideToast()
    }, 5000)
    return () => clearTimeout(timer)
  }, [toast?.id, toast?.message, hideToast])

  if (!mounted || typeof document === 'undefined' || !toast) return null

  const isError = toast.type === 'error'

  const handleClose = () => {
    setToast(null)
    hideToast()
  }

  return createPortal(
    <div
      id="cardzy-toast-root"
      data-toast-root="true"
      role="region"
      aria-live="polite"
      aria-label="Notification"
      key={(toast as any)?.id || toast.message}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        zIndex: 2147483647,
        pointerEvents: 'auto',
        visibility: 'visible',
        opacity: 1,
      }}
      className={cn(
        "fixed max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto shadow-2xl transition-all duration-300 pointer-events-auto notranslate",
        // Position at bottom: safe offset above mobile navigation
        "bottom-24 sm:bottom-6",
        // RTL on bottom-left, LTR on bottom-right
        isRtl ? "left-4 sm:left-6" : "right-4 sm:right-6"
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3.5 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300',
          isError && 'bg-red-600/95 text-white border-red-500 shadow-[0_10px_30px_rgba(220,38,38,0.5)]',
          toast.type === 'success' && 'bg-emerald-600/95 text-white border-emerald-500 shadow-[0_10px_30px_rgba(5,150,105,0.4)]',
          toast.type === 'info' && 'bg-[#0b0d13]/98 text-white border-amber-500/50 shadow-[0_10px_30px_rgba(245,158,11,0.25)]',
          isRtl && 'font-urdu text-right'
        )}
      >
        <span className="shrink-0 flex items-center justify-center size-8 rounded-full bg-white/20 shadow-inner">
          {toast.type === 'success' && <CheckCircle2 className="size-5 text-emerald-300" />}
          {isError && <AlertCircle className="size-5 text-red-200 animate-pulse" />}
          {toast.type === 'info' && <Info className="size-5 text-amber-400" />}
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
          className="rounded-lg p-1.5 hover:bg-white/20 text-white/90 hover:text-white transition-colors shrink-0 cursor-pointer"
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    </div>,
    document.body
  )
}
