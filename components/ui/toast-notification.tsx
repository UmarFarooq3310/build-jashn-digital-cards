'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export function ToastNotification() {
  const storeToast = useJashn((s) => s.toast)
  const hideToast = useJashn((s) => s.hideToast)
  const [localToast, setLocalToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)
  const { lang, isRtl } = useLang()

  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        setLocalToast(customEvent.detail)
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

  const currentToast = localToast || storeToast

  useEffect(() => {
    if (!currentToast) return
    const timer = setTimeout(() => {
      setLocalToast(null)
      hideToast()
    }, 4500)
    return () => clearTimeout(timer)
  }, [currentToast, hideToast])

  if (!currentToast) return null

  const isUrduRtl = isRtl || lang === 'ur' || lang === 'ar'
  const positionClass = isUrduRtl
    ? 'top-auto bottom-6 right-auto left-4 sm:left-6'
    : 'top-auto bottom-6 left-auto right-4 sm:right-6'

  const handleClose = () => {
    setLocalToast(null)
    hideToast()
  }

  return (
    <div
      key={(currentToast as any)?.id || currentToast.message}
      dir={isUrduRtl ? 'rtl' : 'ltr'}
      className={cn(
        'fixed z-[999999] max-w-sm w-[calc(100vw-2rem)] sm:w-auto shadow-2xl transition-all duration-300 pointer-events-auto',
        positionClass
      )}
    >
      <div className={cn(
        'flex items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl',
        currentToast.type === 'success' && 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30',
        currentToast.type === 'error' && 'bg-red-600 text-white border-red-500 shadow-red-600/40',
        currentToast.type === 'info' && 'bg-slate-900 text-white border-slate-700 shadow-slate-900/30',
        isUrduRtl && 'font-urdu text-right'
      )}>
        <span className="shrink-0">
          {currentToast.type === 'success' && <CheckCircle2 className="size-5 text-white" />}
          {currentToast.type === 'error' && <AlertCircle className="size-5 text-white" />}
          {currentToast.type === 'info' && <Info className="size-5 text-white" />}
        </span>
        <p className="text-sm font-bold flex-1 leading-snug text-white">{currentToast.message}</p>
        <button
          onClick={handleClose}
          className="rounded-lg p-1 hover:bg-white/20 text-white/80 hover:text-white transition-colors shrink-0"
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    </div>
  )
}
