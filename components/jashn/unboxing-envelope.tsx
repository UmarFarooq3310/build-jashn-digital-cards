'use client'

import { useState } from 'react'
import { Sparkles, Heart, Gift, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UnboxingEnvelope({
  recipientName,
  senderName,
  occasionTitle,
  onOpen,
}: {
  recipientName?: string
  senderName?: string
  occasionTitle?: string
  onOpen: () => void
}) {
  const [opened, setOpened] = useState(false)

  function handleOpen() {
    setOpened(true)
    setTimeout(() => {
      onOpen()
    }, 700)
  }

  if (opened) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 transition-all duration-700">
      <div className="relative w-full max-w-sm sm:max-w-md text-center space-y-6 animate-scaleIn">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 size-64 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
            <span>YOU HAVE A SPECIAL CARD</span>
          </span>
          {occasionTitle && (
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
              {occasionTitle}
            </h2>
          )}
        </div>

        {/* 3D Wax Sealed Envelope Box */}
        <div
          onClick={handleOpen}
          className="group relative mx-auto w-full aspect-[4/3] max-w-xs sm:max-w-sm rounded-3xl border-2 border-amber-400/50 bg-gradient-to-b from-amber-950/80 via-slate-900 to-black p-6 shadow-2xl backdrop-blur-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-amber-400 flex flex-col items-center justify-between"
        >
          {/* Top Flap Angle Decoration */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amber-500/20 to-transparent clip-path-triangle pointer-events-none" />

          <div className="relative z-10 space-y-1 pt-4">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              FOR: {recipientName || 'YOU'}
            </p>
            {senderName && (
              <p className="text-[11px] text-slate-300">
                FROM: <span className="font-extrabold text-white">{senderName}</span>
              </p>
            )}
          </div>

          {/* Golden Wax Seal Emblem */}
          <div className="relative z-10 my-auto flex items-center justify-center">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-[0_0_25px_rgba(245,158,11,0.6)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <span className="absolute inset-0 rounded-full border-2 border-dashed border-amber-900/40 animate-spin-slow" />
              <Heart className="size-9 fill-current text-slate-950" />
            </div>
          </div>

          <div className="relative z-10 pb-2">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <span>Tap Wax Seal To Open ✉️</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
