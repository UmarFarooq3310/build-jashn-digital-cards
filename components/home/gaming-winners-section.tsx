'use client'

import Link from 'next/link'
import { Sparkles, Trophy, Flame, Gamepad2, Hash, ArrowRight, Crown } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const GAMING_CARDS = [
  {
    slug: 'pubg-winner',
    titleKey: 'pubgWinnerTitle',
    titleFallback: 'PUBG Winner',
    taglineKey: 'pubgWinnerTagline',
    taglineFallback: 'Winner Winner Chicken Dinner!',
    badgeKey: 'pubgWinnerBadge',
    badgeFallback: '🏆 PUBG Mobile / BGMI',
    icon: Trophy,
    bgGradient: 'from-[#1c1404] via-[#2d1e08] to-[#120d02]',
    border: 'border-amber-500/50 hover:border-amber-400',
    accentColor: 'text-amber-300',
    btnBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]',
    cornerColor: 'border-amber-400/50',
    glowRing: 'ring-amber-500/20',
  },
  {
    slug: 'free-fire-winner',
    titleKey: 'freeFireWinnerTitle',
    titleFallback: 'Free Fire Winner',
    taglineKey: 'freeFireWinnerTagline',
    taglineFallback: 'Booyah! Victory Royale',
    badgeKey: 'freeFireWinnerBadge',
    badgeFallback: '🔥 Free Fire Battle',
    icon: Flame,
    bgGradient: 'from-[#240a05] via-[#381008] to-[#150402]',
    border: 'border-orange-500/50 hover:border-orange-400',
    accentColor: 'text-orange-300',
    btnBg: 'bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-slate-950 shadow-[0_0_20px_rgba(249,115,22,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(249,115,22,0.3)]',
    cornerColor: 'border-orange-400/50',
    glowRing: 'ring-orange-500/20',
  },
  {
    slug: 'ludo-champion',
    titleKey: 'ludoChampionTitle',
    titleFallback: 'Ludo Champion',
    taglineKey: 'ludoChampionTagline',
    taglineFallback: 'Ludo Champion of the Day!',
    badgeKey: 'ludoChampionBadge',
    badgeFallback: '🎲 Board Game MVP',
    icon: Gamepad2,
    bgGradient: 'from-[#0e1026] via-[#1c1d42] to-[#08091a]',
    border: 'border-indigo-500/50 hover:border-indigo-400',
    accentColor: 'text-indigo-300',
    btnBg: 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]',
    cornerColor: 'border-indigo-400/50',
    glowRing: 'ring-indigo-500/20',
  },
  {
    slug: 'number-draw-winner',
    titleKey: 'numberDrawWinnerTitle',
    titleFallback: 'Number Draw Winner',
    taglineKey: 'numberDrawWinnerTagline',
    taglineFallback: 'You Hit the Winning Number!',
    badgeKey: 'numberDrawWinnerBadge',
    badgeFallback: '🔢 Lucky Draw Winner',
    icon: Hash,
    bgGradient: 'from-[#021f18] via-[#05352a] to-[#01140f]',
    border: 'border-emerald-500/50 hover:border-emerald-400',
    accentColor: 'text-emerald-300',
    btnBg: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
    cornerColor: 'border-emerald-400/50',
    glowRing: 'ring-emerald-500/20',
  },
  {
    slug: 'bingo-winner',
    titleKey: 'bingoWinnerTitle',
    titleFallback: 'Bingo Winner',
    taglineKey: 'bingoWinnerTagline',
    taglineFallback: 'BINGO! You’re the Winner!',
    badgeKey: 'bingoWinnerBadge',
    badgeFallback: '🎯 Bingo Grand Winner',
    icon: Sparkles,
    bgGradient: 'from-[#1f0a2d] via-[#35104c] to-[#12041b]',
    border: 'border-fuchsia-500/50 hover:border-fuchsia-400',
    accentColor: 'text-fuchsia-300',
    btnBg: 'bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-400 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(217,70,239,0.3)]',
    cornerColor: 'border-fuchsia-400/50',
    glowRing: 'ring-fuchsia-500/20',
  },
  {
    slug: 'esports-winner',
    titleKey: 'esportsWinnerTitle',
    titleFallback: 'Esports Tournament Winner',
    taglineKey: 'esportsWinnerTagline',
    taglineFallback: 'Tournament Champion!',
    badgeKey: 'esportsWinnerBadge',
    badgeFallback: '🏅 Esports Champion',
    icon: Crown,
    bgGradient: 'from-[#041b2d] via-[#082e4a] to-[#02101c]',
    border: 'border-cyan-500/50 hover:border-cyan-400',
    accentColor: 'text-cyan-300',
    btnBg: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    glowHover: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]',
    cornerColor: 'border-cyan-400/50',
    glowRing: 'ring-cyan-500/20',
  },
]

export function GamingWinnersSection() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Scan-line overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] z-[1]" />

      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 size-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
            <Trophy className="size-4 text-amber-400 animate-pulse" />
            <span>{t('gamingHighEnergy') || 'High Energy Victory Cards 🎮'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-white ${isUrdu ? 'font-urdu leading-[2]' : ''}`}>
            {t('gamingWinnerCardsTitle') || '🎮 Gaming Winner Cards'}
          </h2>

          <p className={`text-sm sm:text-base text-slate-300 max-w-2xl mx-auto ${isUrdu ? 'font-urdu text-base sm:text-lg leading-[2]' : ''}`}>
            {t('gamingWinnerCardsDesc') || 'Celebrate match victories, chicken dinners, high score streaks, bingo hits, and tournament champions with custom animated winner cards!'}
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAMING_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.slug}
                href={`/create-wish?occasion=${card.slug}`}
                aria-label={`Create ${t(card.titleKey, card.titleFallback)} Winner Card`}
                className={`group relative rounded-3xl border ${card.border} bg-gradient-to-b ${card.bgGradient} p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${card.glowHover} overflow-hidden cursor-pointer`}
              >
                {/* Corner brackets */}
                <div className={`absolute top-2.5 left-2.5 w-4 h-4 border-t border-l ${card.cornerColor} pointer-events-none`} />
                <div className={`absolute top-2.5 right-2.5 w-4 h-4 border-t border-r ${card.cornerColor} pointer-events-none`} />
                <div className={`absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l ${card.cornerColor} pointer-events-none`} />
                <div className={`absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r ${card.cornerColor} pointer-events-none`} />

                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-200 inline-flex items-center gap-1.5">
                      {/* Pulsing dot */}
                      <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                      {t(card.badgeKey, card.badgeFallback)}
                    </span>
                    <div className={`p-2.5 rounded-2xl bg-white/10 ${card.accentColor} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="size-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 text-left">
                    <p className={`text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors ${isUrdu ? 'font-urdu text-2xl leading-relaxed text-right' : ''}`}>
                      {t(card.titleKey, card.titleFallback)}
                    </p>
                    <p className={`text-sm font-bold ${card.accentColor} ${isUrdu ? 'font-urdu text-base leading-relaxed text-right' : ''}`}>
                      &quot;{t(card.taglineKey, card.taglineFallback)}&quot;
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6">
                  <div
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl ${card.btnBg} px-5 py-3 font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:brightness-110 active:scale-95`}
                  >
                    <span>{t(card.titleKey, card.titleFallback)} {t('winnerCardBtn') || 'Card'}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
