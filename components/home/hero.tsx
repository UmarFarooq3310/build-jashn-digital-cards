'use client'

import Link from 'next/link'
import { ArrowRight, MailOpen, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'
import { HeroEmailForm } from './hero-email-form'
import { HeroStaticCard } from './hero-static-card'

export function Hero() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(4,120,87,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_50%)] bg-gradient-to-b from-emerald-950/20 via-background to-background pt-6"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
        {/* ── Left column ── */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 shadow-sm"
            >
              <Sparkles className="size-4 text-amber-500 animate-pulse" />
              {t('heroTagline') || 'Global Digital Cards & Event Invitations 🌍'}
            </span>
            
            <Link
              href="/create-wish"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm hover:bg-emerald-500/20 transition-all"
            >
              <Sparkles className="size-3.5 text-emerald-500 animate-bounce" />
              <span>{t('createWishCard')} →</span>
            </Link>
          </div>

          <h1
            className={`mt-5 text-balance font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground ${isUrdu ? 'font-urdu leading-[2.2]' : ''}`}
          >
            {t('heroMainTitlePart1') || 'Create 3D Animated Digital Cards & Wedding Invitations,'}{' '}
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-amber-400 bg-clip-text text-transparent">
              {t('heroMainTitlePart2') || 'with WhatsApp RSVP & Custom Music'}
            </span>
          </h1>

          <p className={`mt-4 max-w-xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-base sm:text-lg leading-[2.2]' : ''}`}>
            {t('heroSubText') || 'Design, personalize, and share interactive 3D digital wish cards, royal Pakistani & global wedding invitations with automated WhatsApp RSVP tracking, and executive smart digital business cards (vCards). Zero printing costs, instant delivery in 18 languages.'}
          </p>

          {/* 4-Pillar Value Proposition Quick Badges */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-2.5 max-w-xl">
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              <span className="text-sm">🎁</span>
              <span>3D Opening Cards &amp; Music</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-900 dark:text-amber-300">
              <span className="text-sm">💍</span>
              <span>WhatsApp RSVP Tracking</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
              <span className="text-sm">📇</span>
              <span>Smart vCard &amp; QR Contacts</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3 py-2 text-xs font-semibold text-purple-900 dark:text-purple-300">
              <span className="text-sm">🌍</span>
              <span>18 Languages Localized</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/create-wish"
              className={buttonVariants({ size: 'lg', className: 'h-13 px-6 text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-950/20 rounded-2xl' })}
            >
              <Sparkles className="size-4 text-amber-300" />
              {t('createWishCard')}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/create-invitation"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'h-13 px-6 text-sm sm:text-base font-bold border-emerald-800/30 hover:bg-emerald-900/10 rounded-2xl',
              })}
            >
              <MailOpen className="size-4 text-amber-600" />
              {t('createInvitation')}
            </Link>
            <Link
              href="/create-visiting-card"
              className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 underline underline-offset-4"
            >
              <span>Smart vCards →</span>
            </Link>
          </div>

          {/* ── Inline email signup ── */}
          <HeroEmailForm />
        </div>

        {/* ── Right column — Card preview ── */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
          <div className="w-full transition-transform duration-500">
            <HeroStaticCard />
          </div>
        </div>
      </div>
    </section>
  )
}
