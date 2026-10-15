'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ViralFooterBadgeProps {
  isPro?: boolean
  variant?: 'wish' | 'invitation' | 'magic' | 'vcard'
  className?: string
}

export function ViralFooterBadge({
  isPro = false,
  variant = 'wish',
  className,
}: ViralFooterBadgeProps) {
  // If card creator has Cardzy Pro, watermark/branding is removed for complete white-label privacy
  if (isPro) {
    return null
  }

  const targetUrl =
    variant === 'invitation'
      ? '/create-invitation?utm_source=recipient_card&utm_medium=viral_badge&utm_campaign=invitation_view'
      : variant === 'magic'
      ? '/create-magic-link?utm_source=recipient_card&utm_medium=viral_badge&utm_campaign=magic_view'
      : variant === 'vcard'
      ? '/create-visiting-card?utm_source=recipient_card&utm_medium=viral_badge&utm_campaign=vcard_view'
      : '/create-wish?utm_source=recipient_card&utm_medium=viral_badge&utm_campaign=wish_view'

  return (
    <div className={cn("w-full flex justify-center items-center py-2 z-20 shrink-0", className)}>
      <Link
        href={targetUrl}
        className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/85 hover:bg-slate-900/95 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:text-white hover:scale-[1.02] active:scale-98"
        title="Create your own free 3D card or wedding invitation on Cardzy"
      >
        {/* Ambient subtle glow ring */}
        <span className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-purple-500/20 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100" />

        <Sparkles className="relative size-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

        <span className="relative font-medium text-slate-300">
          Created with <strong className="font-bold text-amber-300">Cardzy</strong>
        </span>

        <span className="relative text-slate-500 select-none">•</span>

        <span className="relative font-semibold text-emerald-400 transition-colors group-hover:text-emerald-300 flex items-center gap-1">
          Create your free 3D card
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  )
}
