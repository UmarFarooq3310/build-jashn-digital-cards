'use client'

import React from 'react'
import { Sparkles, Heart, Compass, Moon, Sun, Coffee, Wind, Eye } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

interface MilestoneStatsProps {
  age: number
  recipientName: string
}

export function MilestoneStatsShowcase({ age, recipientName }: MilestoneStatsProps) {
  const { t } = useLang()
  const safeAge = Math.max(1, Number(age) || 24)
  const daysAlive = safeAge * 365 + Math.floor(safeAge / 4)
  const hoursAlive = daysAlive * 24

  // Scientific & Cosmic Trivia from Google
  const cosmicMilesMillion = (safeAge * 584).toLocaleString() // Earth orbits ~584 million miles/year
  const heartbeatsMillion = (safeAge * 36.5).toFixed(0) // ~100k beats/day * 365 = 36.5M/year
  const breathsMillion = (safeAge * 7.3).toFixed(0) // ~20k breaths/day * 365 = 7.3M/year
  const dreamHours = Math.floor(hoursAlive / 3).toLocaleString() // ~1/3 of life spent dreaming
  const chaiCups = Math.floor(daysAlive * 1.6).toLocaleString()

  const stats = [
    {
      label: t('spaceTraveled', 'Space Traveled on Earth'),
      val: `${cosmicMilesMillion}M`,
      unit: 'Miles around the Sun',
      sub: 'Whirling through the cosmos at 67,000 mph',
      icon: Compass,
      color: 'text-amber-300',
      border: 'border-amber-400/50',
      bg: 'from-amber-950/40 to-black/60',
    },
    {
      label: t('heartbeatsPure', 'Heartbeats of Pure Life'),
      val: `${heartbeatsMillion}M`,
      unit: 'Beats dedicated to you',
      sub: 'Your heart beating faithfully every second',
      icon: Heart,
      color: 'text-rose-400',
      border: 'border-rose-400/50',
      bg: 'from-rose-950/40 to-black/60',
    },
    {
      label: t('breathsWonder', 'Breaths of Wonder Taken'),
      val: `${breathsMillion}M`,
      unit: 'Breaths of fresh air',
      sub: 'Inhaling the beauty of the world',
      icon: Wind,
      color: 'text-sky-400',
      border: 'border-sky-400/50',
      bg: 'from-sky-950/40 to-black/60',
    },
    {
      label: t('hoursDreaming', 'Hours of Cosmic Dreaming'),
      val: dreamHours,
      unit: 'Hours in dreamland',
      sub: 'Recharging your soul under the stars',
      icon: Moon,
      color: 'text-purple-400',
      border: 'border-purple-400/50',
      bg: 'from-purple-950/40 to-black/60',
    },
    {
      label: t('sunrisesWitnessed', 'Sunrises Witnessed'),
      val: daysAlive.toLocaleString(),
      unit: 'Glorious mornings',
      sub: 'Each day the world is brighter with you',
      icon: Sun,
      color: 'text-yellow-400',
      border: 'border-yellow-400/50',
      bg: 'from-yellow-950/40 to-black/60',
    },
    {
      label: t('warmCupsOfChai', 'Warm Cups of Chai / Coffee'),
      val: chaiCups,
      unit: 'Cups of warmth & chats',
      sub: 'Shared laughs and deep conversations',
      icon: Coffee,
      color: 'text-emerald-400',
      border: 'border-emerald-400/50',
      bg: 'from-emerald-950/40 to-black/60',
    },
  ]

  return (
    <div className="w-full space-y-4 my-4 animate-in fade-in duration-500 text-left">
      <div className="text-center mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/30">
          {t('cosmicStoryOf', 'The Cosmic Story of')} {recipientName} ✨
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-amber-100 mt-2">
          {safeAge} {t('yearsOfExistence', 'Years of Existence in Numbers')}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {t('journeyCompleted', 'Here is the magnificent journey your body and soul have completed:')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {stats.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-2 ${item.border} bg-gradient-to-br ${item.bg} backdrop-blur-md shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                  {item.label}
                </span>
                <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className={`size-4 ${item.color}`} />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl sm:text-3xl font-black ${item.color} tracking-tight`}>
                  {item.val}
                </span>
                <span className="text-xs font-bold text-slate-300">{item.unit}</span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1 font-medium leading-tight">
                {item.sub}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
