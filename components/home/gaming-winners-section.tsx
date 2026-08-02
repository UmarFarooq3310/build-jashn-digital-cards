'use client'

import Link from 'next/link'
import { Sparkles, Trophy, Flame, Gamepad2, Hash, ArrowRight, Award, Crown } from 'lucide-react'
import { SectionHead } from './section-head'
import { useLang } from '@/lib/lang/context'

const GAMING_CARDS = [
  {
    slug: 'pubg-winner',
    title: 'PUBG Winner',
    tagline: 'Winner Winner Chicken Dinner!',
    badge: '🏆 PUBG Mobile / BGMI',
    icon: Trophy,
    bgGradient: 'from-amber-950 via-slate-900 to-amber-950',
    border: 'border-amber-500/30 hover:border-amber-400',
    accentColor: 'text-amber-400',
    btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
  },
  {
    slug: 'free-fire-winner',
    title: 'Free Fire Winner',
    tagline: 'Booyah! Victory Royale',
    badge: '🔥 Free Fire Battle',
    icon: Flame,
    bgGradient: 'from-orange-950 via-slate-900 to-orange-950',
    border: 'border-orange-500/30 hover:border-orange-400',
    accentColor: 'text-orange-400',
    btnBg: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
  },
  {
    slug: 'ludo-champion',
    title: 'Ludo Champion',
    tagline: 'Ludo Champion of the Day!',
    badge: '🎲 Board Game MVP',
    icon: Gamepad2,
    bgGradient: 'from-indigo-950 via-slate-900 to-indigo-950',
    border: 'border-indigo-500/30 hover:border-indigo-400',
    accentColor: 'text-indigo-400',
    btnBg: 'bg-indigo-500 hover:bg-indigo-400 text-white',
  },
  {
    slug: 'number-draw-winner',
    title: 'Number Draw Winner',
    tagline: 'You Hit the Winning Number!',
    badge: '🔢 Lucky Draw Winner',
    icon: Hash,
    bgGradient: 'from-emerald-950 via-slate-900 to-emerald-950',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    accentColor: 'text-emerald-400',
    btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
  },
  {
    slug: 'bingo-winner',
    title: 'Bingo Winner',
    tagline: 'BINGO! You’re the Winner!',
    badge: '🎯 Bingo Grand Winner',
    icon: Sparkles,
    bgGradient: 'from-purple-950 via-slate-900 to-purple-950',
    border: 'border-purple-500/30 hover:border-purple-400',
    accentColor: 'text-purple-400',
    btnBg: 'bg-purple-500 hover:bg-purple-400 text-white',
  },
  {
    slug: 'esports-winner',
    title: 'Esports Tournament Winner',
    tagline: 'Tournament Champion!',
    badge: '🏅 Esports Champion',
    icon: Crown,
    bgGradient: 'from-sky-950 via-slate-900 to-sky-950',
    border: 'border-sky-500/30 hover:border-sky-400',
    accentColor: 'text-sky-400',
    btnBg: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
  },
]

export function GamingWinnersSection() {
  const { t } = useLang()

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 size-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
            <Trophy className="size-4 text-amber-400 animate-pulse" />
            <span>High Energy Victory Cards 🎮</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            🎮 Gaming Winner Cards
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Celebrate match victories, chicken dinners, high score streaks, bingo hits, and tournament champions with custom animated winner cards!
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
                      {card.badge}
                    </span>
                    <div className={`p-2.5 rounded-2xl bg-white/10 ${card.accentColor} transition-transform group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 text-left">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className={`text-sm font-bold ${card.accentColor}`}>
                      "{card.tagline}"
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6">
                  <Link
                    href={`/create-wish?occasion=${card.slug}`}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl ${card.btnBg} px-5 py-3 font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:brightness-110 active:scale-95`}
                  >
                    <span>Create Winner Card</span>
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
