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
        "fixed transition-all duration-300 pointer-events-auto notranslate",
        // Mobile: Centered horizontally at bottom with safe-area spacing above nav
        "bottom-20 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-[calc(100vw-2rem)] max-sm:max-w-[380px]",
        // Desktop / Tablet: Pinned to bottom corner
        "sm:bottom-6 sm:w-auto sm:max-w-md",
        isRtl ? "sm:left-6" : "sm:right-6"
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2.5 sm:gap-3 rounded-2xl border py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300',
          // Sleek dark frosted glass with subtle iOS-style color accents
          'bg-zinc-950/95 dark:bg-zinc-900/95 text-zinc-100',
          isError && 'border-rose-500/40 ring-1 ring-rose-500/20 shadow-[0_8px_30px_rgba(244,63,94,0.2)]',
          toast.type === 'success' && 'border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-[0_8px_30px_rgba(16,185,129,0.2)]',
          toast.type === 'info' && 'border-amber-500/40 ring-1 ring-amber-500/20 shadow-[0_8px_30px_rgba(245,158,11,0.15)]',
          isRtl && 'font-urdu text-right'
        )}
      >
        <span
          className={cn(
            "shrink-0 flex items-center justify-center size-6 sm:size-7 rounded-full",
            toast.type === 'success' && "bg-emerald-500/15 text-emerald-400",
            isError && "bg-rose-500/15 text-rose-400",
            toast.type === 'info' && "bg-amber-500/15 text-amber-400"
          )}
        >
          {toast.type === 'success' && <CheckCircle2 className="size-3.5 sm:size-4" />}
          {isError && <AlertCircle className="size-3.5 sm:size-4 animate-pulse" />}
          {toast.type === 'info' && <Info className="size-3.5 sm:size-4" />}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-[13px] font-semibold leading-snug text-zinc-100 break-words tracking-tight">
            {toast.message}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notification"
          className="rounded-lg p-1 hover:bg-white/10 text-zinc-400 hover:text-zinc-100 transition-colors shrink-0 cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>,
    document.body
  )
}
