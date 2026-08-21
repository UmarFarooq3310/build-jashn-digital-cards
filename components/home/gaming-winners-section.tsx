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
    bgGradient: 'from-amber-950 via-slate-900 to-amber-950',
    border: 'border-amber-500/30 hover:border-amber-400',
    accentColor: 'text-amber-400',
    btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
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
    bgGradient: 'from-orange-950 via-slate-900 to-orange-950',
    border: 'border-orange-500/30 hover:border-orange-400',
    accentColor: 'text-orange-400',
    btnBg: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
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
    bgGradient: 'from-indigo-950 via-slate-900 to-indigo-950',
    border: 'border-indigo-500/30 hover:border-indigo-400',
    accentColor: 'text-indigo-400',
    btnBg: 'bg-indigo-500 hover:bg-indigo-400 text-white',
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
    bgGradient: 'from-emerald-950 via-slate-900 to-emerald-950',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    accentColor: 'text-emerald-400',
    btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
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
    bgGradient: 'from-purple-950 via-slate-900 to-purple-950',
    border: 'border-purple-500/30 hover:border-purple-400',
    accentColor: 'text-purple-400',
    btnBg: 'bg-purple-500 hover:bg-purple-400 text-white',
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
    bgGradient: 'from-sky-950 via-slate-900 to-sky-950',
    border: 'border-sky-500/30 hover:border-sky-400',
    accentColor: 'text-sky-400',
    btnBg: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
  },
]

export function GamingWinnersSection() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 size-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
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
              <div
                key={card.slug}
                className={`group relative rounded-3xl border ${card.border} bg-gradient-to-b ${card.bgGradient} p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-200">
                      {t(card.badgeKey, card.badgeFallback)}
                    </span>
                    <div className={`p-2.5 rounded-2xl bg-white/10 ${card.accentColor} transition-transform group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 text-left">
                    <p className={`text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors ${isUrdu ? 'font-urdu text-2xl leading-relaxed text-right' : ''}`}>
                      {t(card.titleKey, card.titleFallback)}
                    </p>
                    <p className={`text-sm font-bold ${card.accentColor} ${isUrdu ? 'font-urdu text-base leading-relaxed text-right' : ''}`}>
                      "{t(card.taglineKey, card.taglineFallback)}"
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6">
                  <Link
                    href={`/create-wish?occasion=${card.slug}`}
                    rel="nofollow"
                    aria-label={`Create ${t(card.titleKey, card.titleFallback)} Winner Card`}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl ${card.btnBg} px-5 py-3 font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:brightness-110 active:scale-95`}
                  >
                    <span>{t(card.titleKey, card.titleFallback)} {t('winnerCardBtn') || 'Card'}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
