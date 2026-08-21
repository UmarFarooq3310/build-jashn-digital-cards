'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sparkles, Mail, X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

export function FloatingCTA() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div suppressHydrationWarning className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
      {/* Floating Options Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 items-end mb-1 animate-slideUp">
          <Link
            href="/create-wish"
            onClick={() => setIsOpen(false)}
            className="flex min-h-[48px] items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Sparkles className="size-4" />
            <span>{t('sendWish')}</span>
          </Link>
          <Link
            href="/create-invitation"
            onClick={() => setIsOpen(false)}
            className="flex min-h-[48px] items-center gap-2 bg-emerald-800 text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Mail className="size-4" />
            <span>{t('createInvitation')}</span>
          </Link>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-[48px] min-w-[48px] h-12 items-center justify-center gap-2 rounded-full px-6 font-bold text-sm text-white transition-all active:scale-95 border border-white/15 cursor-pointer",
          isOpen 
            ? "bg-zinc-800 ring-4 ring-zinc-800/20 shadow-2xl" 
            : "bg-emerald-800 hover:bg-emerald-900 ring-4 ring-emerald-900/20 shadow-lg"
        )}
        aria-label={isOpen ? t('close') : t('getStarted')}
      >
        {isOpen ? (
          <>
            <X className="size-4 shrink-0" />
            <span>{t('close')}</span>
          </>
        ) : (
          <>
            <Plus className="size-4 shrink-0" />
            <span>{t('getStarted')}</span>
          </>
        )}
      </button>
    </div>
  )
}
