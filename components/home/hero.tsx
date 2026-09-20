'use client'

import Link from 'next/link'
import { ArrowRight, MailOpen, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'
import { HeroStaticCard } from './hero-static-card'

export function Hero() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(4,120,87,0.18),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.14),transparent_50%),radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%)] bg-gradient-to-b from-emerald-950/30 via-background to-background pt-2 sm:pt-4"
    >
      {/* Floating sparkle decorations */}
      <div className="pointer-events-none absolute top-20 left-[10%] size-2 rounded-full bg-amber-400/40 animate-pulse" />
      <div className="pointer-events-none absolute top-40 right-[15%] size-1.5 rounded-full bg-emerald-400/30 animate-bounce" />
      <div className="pointer-events-none absolute bottom-32 left-[20%] size-1 rounded-full bg-amber-300/25 animate-pulse" />

      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:gap-10 px-4 py-6 sm:py-8 lg:py-10 lg:grid-cols-2">
        {/* ── Left column ── */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/create-magic-link"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/15 backdrop-blur-md px-4 py-1.5 text-xs font-black text-amber-900 dark:text-amber-200 shadow-sm hover:border-amber-400 hover:scale-105 transition-all group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="group-hover:rotate-12 transition-transform">🪄</span>
              <span>3D Magic Links: Ring Box &amp; Candle Blowing</span>
              <span className="text-[10px] uppercase font-black bg-gradient-to-r from-rose-600 to-amber-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                NEW
              </span>
              <ArrowRight className="size-3 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <span
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-xs"
            >
              <Sparkles className="size-3.5 text-emerald-500 animate-pulse" />
              {t('heroTagline') || '18 Languages & WhatsApp RSVP 🌍'}
            </span>
          </div>

          <h1
            className={`mt-3.5 sm:mt-4 text-balance font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground ${isUrdu ? 'font-urdu leading-[2.2]' : ''}`}
          >
            {t('heroMainTitlePart1') || 'Create 3D Animated Digital Cards & Wedding Invitations,'}{' '}
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-amber-400 bg-clip-text text-transparent">
              {t('heroMainTitlePart2') || 'with WhatsApp RSVP & Custom Music'}
            </span>
          </h1>

          {/* Gold shimmer divider */}
          <span className="mx-0 mt-2.5 block h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          <p className={`mt-3 max-w-xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-base sm:text-lg leading-[2.2]' : ''}`}>
            {t('heroSubText') || 'Design, personalize, and share interactive 3D digital wish cards, royal Pakistani & global wedding invitations with automated WhatsApp RSVP tracking, and executive smart digital business cards (vCards). Zero printing costs, instant delivery in 18 languages.'}
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/create-wish"
              aria-label="Start Designing 3D Digital Wish Card"
              className={buttonVariants({ size: 'lg', className: 'h-13 sm:h-14 px-6 text-sm sm:text-base font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-950/30 hover:shadow-emerald-500/20 rounded-2xl transition-all duration-300' })}
            >
              <Sparkles className="size-4 text-amber-300" />
              {t('createWishCard')}
            </Link>
            <Link
              href="/create-invitation"
              aria-label="Build Royal Wedding Invitation with WhatsApp RSVP"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'h-13 sm:h-14 px-6 text-sm sm:text-base font-extrabold border-emerald-800/30 hover:bg-emerald-900/10 hover:border-emerald-600/40 rounded-2xl transition-all duration-300',
              })}
            >
              <MailOpen className="size-4 text-amber-600" />
              {t('createInvitation')}
            </Link>
          </div>
        </div>

        {/* ── Right column — Interactive Demo (Top Right), 4 Badges & Magic Link Under ── */}
        <div className="flex flex-col gap-3.5 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto lg:mx-0">
          {/* Interactive Demo Showcase Card (Top Right) */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-amber-500/12 blur-2xl" />
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-emerald-500/8 blur-3xl" />
            <HeroStaticCard />
          </div>

          {/* 4-Pillar Value Proposition Badges */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2 rounded-xl bg-rose-500/8 backdrop-blur-sm border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-900 dark:text-rose-300 hover:border-rose-500/40 transition-colors">
              <span className="text-base">🪄</span>
              <span className="truncate">3D Magic Props &amp; Balloons</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/8 backdrop-blur-sm border border-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-900 dark:text-amber-300 hover:border-amber-500/40 transition-colors">
              <span className="text-base">💍</span>
              <span className="truncate">WhatsApp RSVP Tracking</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/8 backdrop-blur-sm border border-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300 hover:border-emerald-500/40 transition-colors">
              <span className="text-base">💬</span>
              <span className="truncate">Wishes Wall &amp; Guestbook</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-purple-500/8 backdrop-blur-sm border border-purple-500/20 px-3 py-2 text-xs font-semibold text-purple-900 dark:text-purple-300 hover:border-purple-500/40 transition-colors">
              <span className="text-base">🌍</span>
              <span className="truncate">18 Languages Localized</span>
            </div>
          </div>

          {/* Create Magic Link CTA Button */}
          <Link
            href="/create-magic-link"
            aria-label="Create 3D Animated Magic Link"
            className="w-full h-12 sm:h-13 px-5 text-sm sm:text-base font-extrabold bg-gradient-to-r from-[#7A1E2B] via-rose-700 to-amber-700 hover:from-[#631822] hover:to-amber-600 text-white shadow-lg shadow-rose-950/30 hover:shadow-amber-500/20 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span className="text-base">🪄</span>
            <span>Create Magic Link</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
