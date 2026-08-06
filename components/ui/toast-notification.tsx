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
  }, [toast, hideToast])

  if (!toast) return null

  const isUrduRtl = isRtl
  const isError = toast.type === 'error'

  const handleClose = () => {
    setToast(null)
    hideToast()
  }

  return (
    <div
      key={(toast as any)?.id || toast.message}
      dir={isUrduRtl ? 'rtl' : 'ltr'}
      className="fixed bottom-6 right-4 sm:right-6 z-[9999999] max-w-sm w-[calc(100vw-2rem)] sm:w-auto shadow-2xl transition-all duration-300 pointer-events-auto animate-in fade-in slide-in-from-bottom-5"
    >
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300',
          isError && 'bg-red-600 text-white border-red-500 shadow-red-600/50',
          toast.type === 'success' && 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30',
          toast.type === 'info' && 'bg-slate-900 text-white border-slate-700 shadow-slate-900/30',
          isUrduRtl && 'font-urdu text-right'
        )}
        style={
          isError
            ? {
                backgroundColor: '#dc2626',
                color: '#ffffff',
                borderColor: '#ef4444',
                boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 8px 10px -6px rgba(220, 38, 38, 0.2)',
              }
            : toast.type === 'success'
            ? {
                backgroundColor: '#059669',
                color: '#ffffff',
                borderColor: '#10b981',
                boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.3)',
              }
            : {
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderColor: '#334155',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.3)',
              }
        }
      >
        <span className="shrink-0 flex items-center justify-center size-7 rounded-full bg-white/20">
          {toast.type === 'success' && <CheckCircle2 className="size-5 text-white" />}
          {isError && <AlertCircle className="size-5 text-white" />}
          {toast.type === 'info' && <Info className="size-5 text-white" />}
        </span>
        <p className="text-sm font-bold flex-1 leading-snug text-white" style={{ color: '#ffffff' }}>
          {toast.message}
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-lg p-1.5 hover:bg-white/20 text-white/90 hover:text-white transition-colors shrink-0"
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    </div>
  )
}
