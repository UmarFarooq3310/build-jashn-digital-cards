'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, PartyPopper, Heart, MailOpen, ArrowRight, Volume2, VolumeX, CheckCircle, Gem } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

type ShowcaseTab = 'magic' | 'wedding' | 'wish'

export function HeroStaticCard() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('magic')
  const [candleBlown, setCandleBlown] = useState(false)
  const [ringBoxOpen, setRingBoxOpen] = useState(false)
  const [magicProp, setMagicProp] = useState<'candle' | 'ring'>('candle')
  const [confettiBurst, setConfettiBurst] = useState(false)
  const [soundMuted, setSoundMuted] = useState(false)

  const playChime = () => {
    if (soundMuted || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime
      const freqs = [523.25, 659.25, 783.99, 1046.5]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.09)
        gain.gain.setValueAtTime(0.12, now + idx * 0.09)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.55)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.09)
        osc.stop(now + idx * 0.09 + 0.6)
      })
    } catch {
      // Audio context may require user interaction or not be supported
    }
  }

  const triggerBlowCandle = () => {
    setCandleBlown(true)
    setConfettiBurst(true)
    playChime()
    setTimeout(() => setConfettiBurst(false), 3000)
  }

  const triggerOpenRingBox = () => {
    setRingBoxOpen((prev) => !prev)
    setConfettiBurst(true)
    playChime()
    setTimeout(() => setConfettiBurst(false), 3000)
  }

  return (
    <div className="relative w-full">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-35 blur-3xl bg-[radial-gradient(circle,#10b981_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-25 blur-3xl bg-[radial-gradient(circle,#f59e0b_0%,transparent_60%)]" />

      {/* Main Glass Showcase Container */}
      <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl rounded-3xl p-4 sm:p-5 text-center shadow-2xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden backdrop-blur-xl">
        {/* Shimmer top border line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        {/* Micro confetti explosion on interaction */}
        {confettiBurst && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="absolute size-2 rounded-full animate-ping"
                style={{
                  left: `${15 + (i * 3) % 70}%`,
                  top: `${20 + (i * 5) % 60}%`,
                  backgroundColor: ['#f59e0b', '#ec4899', '#10b981', '#6366f1', '#f43f5e'][i % 5],
                  animationDuration: `${0.8 + (i % 4) * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Header Controls: Live Badge, Showcase Tabs, Sound Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2.5 border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-extrabold text-emerald-300 border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Interactive Demo</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundMuted(!soundMuted)}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-colors"
            title={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {soundMuted ? <VolumeX className="size-3 text-rose-400" /> : <Volume2 className="size-3 text-amber-400" />}
            <span className="hidden sm:inline">{soundMuted ? 'Muted' : 'Sound ON'}</span>
          </button>
        </div>

        {/* 3 Showcase Mode Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/10 mb-3 sm:mb-3.5">
          <button
            type="button"
            onClick={() => setActiveTab('magic')}
            className={cn(
              'flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer',
              activeTab === 'magic'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span>🪄</span>
            <span className="truncate">3D Magic</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wedding')}
            className={cn(
              'flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer',
              activeTab === 'wedding'
                ? 'bg-gradient-to-r from-amber-600 to-emerald-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span>💍</span>
            <span className="truncate">Wedding</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wish')}
            className={cn(
              'flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer',
              activeTab === 'wish'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span>🎂</span>
            <span className="truncate">Wish Card</span>
          </button>
        </div>

        {/* ── Tab 1: 3D Magic Link Interactive Experience ── */}
        {activeTab === 'magic' && (
          <div className="space-y-2.5">
            {/* Prop Selector Pills */}
            <div className="flex justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setMagicProp('candle')
                  setCandleBlown(false)
                }}
                className={cn(
                  'px-3 py-1 rounded-full font-bold transition-all border text-[11px]',
                  magicProp === 'candle'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                )}
              >
                🎂 Birthday Candle
              </button>
              <button
                type="button"
                onClick={() => {
                  setMagicProp('ring')
                  setRingBoxOpen(false)
                }}
                className={cn(
                  'px-3 py-1 rounded-full font-bold transition-all border text-[11px]',
                  magicProp === 'ring'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                )}
              >
                💍 Velvet Ring Box
              </button>
            </div>

            {/* Interactive Object Showcase */}
            {magicProp === 'candle' ? (
              <div className="py-1 flex flex-col items-center">
                <div
                  onClick={triggerBlowCandle}
                  className="relative group cursor-pointer p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-rose-950/40 to-slate-900 border border-rose-500/30 hover:border-rose-400/60 shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  {/* Glowing Candle Flame */}
                  <div className="flex flex-col items-center">
                    {!candleBlown ? (
                      <div className="relative mb-1">
                        <div className="size-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full rounded-t-[50%] animate-pulse blur-[1px] shadow-[0_0_20px_#f59e0b]" />
                        <div className="absolute top-1 left-2 size-2 bg-white rounded-full opacity-80" />
                      </div>
                    ) : (
                      <div className="h-6 flex items-center justify-center text-xs text-slate-400 font-bold animate-fadeIn">
                        💨 Smoke &amp; Wish Made!
                      </div>
                    )}

                    {/* Candle Stick */}
                    <div className="w-4 h-11 rounded-t-sm bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 border border-rose-200/40 shadow-inner" />

                    {/* Cake Top Base */}
                    <div className="w-28 h-5.5 rounded-b-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 border-t-2 border-amber-400/60 shadow-lg flex items-center justify-center text-[10px] font-bold text-amber-200">
                      🧁 Birthday Cake
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-extrabold text-white">
                    {candleBlown ? '🎉 Yay! Birthday Wish Granted!' : 'Tap the Candle to Blow & Make a Wish! 🎂'}
                  </p>
                  <p className="text-xs text-rose-300/80 mt-0.5">
                    {candleBlown
                      ? 'Custom music & floating balloons triggered for the receiver.'
                      : 'Interactive WebGL 3D prop on your recipient’s phone.'}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerBlowCandle}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                  >
                    {candleBlown ? 'Blow Again 💨' : 'Blow Candle Now 🎂'}
                  </button>
                  <Link
                    href="/create-magic-link"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Create Magic Link</span>
                    <ArrowRight className="size-3 text-amber-400" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-1 flex flex-col items-center">
                <div
                  onClick={triggerOpenRingBox}
                  className="relative group cursor-pointer p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#2e0914] to-slate-900 border border-amber-500/40 hover:border-amber-400 shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-3.5xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                      {ringBoxOpen ? '💍' : '🎁'}
                    </span>
                    <div className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-extrabold text-amber-300">
                      {ringBoxOpen ? '✨ Box Opened · Diamond Sparkle' : 'Tap to Unbox the Velvet Ring Box'}
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-extrabold text-amber-200">
                    {ringBoxOpen ? '💖 “Will You Marry Me?” Unboxed!' : 'Tap the Box to Open & Reveal Proposal!'}
                  </p>
                  <p className="text-xs text-amber-300/70 mt-0.5">
                    With shehnai chords, romantic polaroids, and Wishes Wall.
                  </p>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerOpenRingBox}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                  >
                    {ringBoxOpen ? 'Close Box 📦' : 'Open Ring Box 💍'}
                  </button>
                  <Link
                    href="/create-magic-link"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Create Magic Link</span>
                    <ArrowRight className="size-3 text-amber-400" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 2: Royal Shaadi & WhatsApp RSVP Preview ── */}
        {activeTab === 'wedding' && (
          <div className="space-y-2 py-0.5 text-left">
            <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-[#1a080d] via-[#2d0f17] to-[#120508] border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold border-b border-amber-500/20 pb-1.5">
                <span>✨ Royal Pakistani Shaadi</span>
                <span className="bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  ⏰ 12 Days To Go
                </span>
              </div>

              <div className="text-center py-2">
                <p className="text-[10.5px] uppercase tracking-widest text-amber-400 font-bold">
                  Bismillah ir-Rahman ir-Rahim
                </p>
                <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent mt-0.5">
                  Zaryab &amp; Rida
                </h3>
                <p className="text-xs text-rose-200/90 mt-0.5">Barat &amp; Walima Celebration</p>
                <p className="text-[11px] text-slate-300 mt-1.5">📍 Pearl Continental Lawn, Islamabad</p>
              </div>

              {/* RSVP Mock Badge */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-500/20">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle className="size-3.5" />
                  <span>248 Confirmed via WhatsApp</span>
                </div>
                <Link
                  href="/create-invitation"
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm transition-colors"
                >
                  Create RSVP Card →
                </Link>
              </div>
            </div>

            <p className="text-xs text-center text-slate-300">
              Includes live event countdown timer, guest count tracking, and dress code notes.
            </p>
          </div>
        )}

        {/* ── Tab 3: Festive 3D Wish Card Preview ── */}
        {activeTab === 'wish' && (
          <div className="space-y-2 py-0.5">
            <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 border border-emerald-500/30 shadow-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                <Sparkles className="size-3 text-amber-300" />
                Special Celebration Card
              </span>

              <h3 className="text-xl font-extrabold text-white mt-1.5">
                Warmest Wishes &amp; Blessings! 🌟
              </h3>

              <div className="my-1.5 p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/20 text-xs text-emerald-100 italic">
                “May your journey ahead be blessed with boundless joy, health, and prosperity.”
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1.5 border-t border-emerald-500/20">
                <span className="text-amber-300 font-bold">From: Family &amp; Friends</span>
                <span className="text-[11px] text-emerald-400">🎶 Audio Playing</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <Link
                href="/create-wish"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <PartyPopper className="size-3.5 text-amber-300" />
                <span>Create Wish Card Free</span>
              </Link>
            </div>
          </div>
        )}

        {/* Footer Guarantee Bar */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle className="size-3" />
            <span>Zero App Install Needed</span>
          </span>
          <span className="text-amber-400 font-bold">18 Languages · Instant Link</span>
        </div>
      </div>
    </div>
  )
}

