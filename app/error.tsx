'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log non-sensitive client error diagnostic
    console.error('[Cardzy App Error]', error.message)
  }, [error])

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center space-y-6">
        <div className="mx-auto size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
          <AlertCircle className="size-8" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Please try refreshing or return to the home page.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 px-6 py-3 text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="size-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 hover:bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-all cursor-pointer"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
