'use client'

import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

export function ToastNotification() {
  const toast = useJashn((s) => s.toast)
  const hideToast = useJashn((s) => s.hideToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      hideToast()
    }, 4000)
    return () => clearTimeout(timer)
  }, [toast, hideToast])

  if (!toast) return null

  return (
    <div className="fixed bottom-5 right-5 z-[100] max-w-sm w-[calc(100vw-2.5rem)] animate-slide-up">
      <div className={cn(
        "flex items-center gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md bg-background/90",
        toast.type === 'success' && "border-emerald-500/30 text-emerald-800 dark:text-emerald-300",
        toast.type === 'error' && "border-destructive/30 text-destructive",
        toast.type === 'info' && "border-primary/20 text-primary"
      )}>
        <span className="shrink-0">
          {toast.type === 'success' && <CheckCircle2 className="size-5 text-emerald-600" />}
          {toast.type === 'error' && <AlertCircle className="size-5 text-destructive" />}
          {toast.type === 'info' && <Info className="size-5 text-primary" />}
        </span>
        <p className="text-sm font-semibold flex-1 leading-snug">{toast.message}</p>
        <button
          onClick={hideToast}
          className="rounded-lg p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
