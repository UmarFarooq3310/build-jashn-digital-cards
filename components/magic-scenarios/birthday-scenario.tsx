'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Heart,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Cake,
  Gift,
  Flame,
  MessageCircle,
} from 'lucide-react'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'
import { magicAudio } from '@/lib/jashn/magic-audio'
import { submitMagicResponse } from '@/lib/jashn/magic-service'

interface ScenarioProps {
  data: MagicLinkData
  slug: string
  soundEnabled: boolean
  audio: any
  triggerConfetti: () => void
  onSendLove: () => void
  loveSent: boolean
}

const BIRTHDAY_SCENES = [
  { id: 0, label: 'Balloons', icon: '🎈' },
  { id: 1, label: 'Cake', icon: '🎂' },
  { id: 2, label: 'Gift', icon: '🎁' },
  { id: 3, label: 'Celebration', icon: '💖' },
]

export function BirthdayScenario({
  data,
  slug,
  soundEnabled,
  triggerConfetti,
  onSendLove,
  loveSent,
}: ScenarioProps) {
  const { t } = useLang()

  const [activeScene, setActiveScene] = useState<number>(0)
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([0])
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false)

  // Scene 0: Balloons
  const defaultBalloons = [
    { id: 1, color: '#f43f5e', quote: 'You illuminate every single room you walk into! ✨', label: 'Wish 1' },
    { id: 2, color: '#0ea5e9', quote: 'Remember our 2 AM laughter? Priceless memories! 🌙', label: 'Wish 2' },
    { id: 3, color: '#eab308', quote: 'May all your biggest ambitions come to life this year! 🚀', label: 'Wish 3' },
    { id: 4, color: '#a855f7', quote: 'The world is infinitely better with your kindness! 💛', label: 'Wish 4' },
  ]
  const balloons = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultBalloons
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([])
  const [activeQuote, setActiveQuote] = useState<string | null>(null)

  // Scene 1: Cake & Candles
  const [blownCandles, setBlownCandles] = useState<number[]>([])
  const [cakeCut, setCakeCut] = useState<boolean>(false)

  // Scene 2: 3D Gift Box
  const [giftOpen, setGiftOpen] = useState<boolean>(false)

  // Scene 3: Letter & Celebration
  const [selectedReaction, setSelectedReaction] = useState<string>('🎂')
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number; duration: number }[]>([])

  const spawnBurst = (emojis: string[], count = 12) => {
    const newItems = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 96,
      duration: 2.2 + Math.random() * 2.2,
    }))
    setParticles((prev) => [...prev, ...newItems])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)))
    }, 4500)
  }

  const handleToggleMusic = () => {
    const isNowPlaying = magicAudio.toggleMelody('birthday')
    setMusicPlaying(isNowPlaying)
  }

  const unlockScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
  }

  const goToScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
    setActiveScene(sceneIdx)
    try {
      magicAudio.playSparkle()
    } catch {}
  }

  // Handle Balloon Pop
  const handlePopBalloon = (b: any) => {
    if (poppedBalloons.includes(b.id)) return
    magicAudio.playPop()
    const next = [...poppedBalloons, b.id]
    setPoppedBalloons(next)
    setActiveQuote(b.quote)
    spawnBurst(['🎈', '✨', '🎉'], 6)
    unlockScene(1)

    if (next.length === balloons.length) {
      magicAudio.playChime()
      triggerConfetti()
    }
  }

  // Handle Blow Candle
  const handleBlowCandle = (idx: number) => {
    if (blownCandles.includes(idx)) return
    magicAudio.playBlow()
    const next = [...blownCandles, idx]
    setBlownCandles(next)
    spawnBurst(['💨', '✨'], 5)
    unlockScene(2)

    if (next.length >= 3) {
      setCakeCut(true)
      magicAudio.playFanfare()
      triggerConfetti()
    }
  }

  // Handle Open Gift
  const handleOpenGift = () => {
    if (giftOpen) return
    magicAudio.playWaxCrack()
    setGiftOpen(true)
    spawnBurst(['🎁', '✨', '💖', '🌟'], 16)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playChime()
      unlockScene(3)
    }, 600)
  }

  // Handle Reaction
  const handleReaction = async (emoji: string) => {
    setSelectedReaction(emoji)
    spawnBurst([emoji], 12)
    magicAudio.playPop()
    onSendLove()

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'reaction',
        reaction: `${emoji} Birthday Blessing!`,
      })
    } catch {
      // offline fallback
    }
  }

  const rawPhone = data.wishContent?.whatsappNumber?.replace(/[^0-9]/g, '') || ''
  const whatsAppMessage = encodeURIComponent(
    `Hey ${data.senderName}! ✨ ${data.recipientName} loved your Birthday Magic Link! Reacted with ${selectedReaction} 🎂🎉`
  )
  const whatsAppHref = rawPhone
    ? `https://wa.me/${rawPhone}?text=${whatsAppMessage}`
    : `https://api.whatsapp.com/send?text=${whatsAppMessage}`

  return (
    <div className="w-full flex flex-col items-center justify-center select-none animate-in fade-in duration-300">
      {/* Floating Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="magic-fx text-2xl"
          style={{
            left: `${p.left}vw`,
            '--d': `${p.duration}s`,
          } as any}
        >
          {p.emoji}
        </span>
      ))}

      {/* Screen-Perfect Centered Card */}
      <div
        className="magic-card select-none text-white mx-auto shadow-2xl relative"
        style={{
          '--card-bg': 'rgba(10, 24, 18, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#34d399',
          '--rose': '#10b981',
          '--txt': '#f0fff4',
          '--mut': '#bbf7d0',
        } as any}
      >
        {/* Top Header Bar: Back to All Magic Cards & Music Toggle */}
        <div className="flex items-center justify-between w-full mb-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-emerald-200 transition-all shadow-sm cursor-pointer"
            title="Back to All Magic Cards"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back</span>
          </Link>

          <button
            type="button"
            onClick={handleToggleMusic}
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 text-sm transition-all cursor-pointer shadow-sm"
            title={musicPlaying ? 'Mute music' : 'Play synthesized music'}
          >
            {musicPlaying ? '🎵' : '🔇'}
          </button>
        </div>

        {/* Pill Badge */}
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-[#f5c451] uppercase mb-1">
          🎂 BIRTHDAY SURPRISE
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Happy Birthday, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#bbf7d0] mb-2.5">
          Surprise curated by {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {BIRTHDAY_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#062414] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#bbf7d0] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: POP BALLOONS ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Pop the Birthday Balloons!
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Tap each floating balloon to unlock secret birthday wishes
            </p>

            <div className="grid grid-cols-2 gap-2.5 my-3">
              {balloons.map((b: any, idx: number) => {
                const isPopped = poppedBalloons.includes(b.id)
                return (
                  <div
                    key={b.id || idx}
                    onClick={() => handlePopBalloon(b)}
                    className={cn(
                      'p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[88px] flex flex-col items-center justify-center relative overflow-hidden',
                      isPopped
                        ? 'border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'border-white/15 bg-white/5 hover:scale-105 active:scale-95 magic-balloon-item'
                    )}
                  >
                    <span className="text-2xl mb-1">
                      {isPopped ? '💥' : '🎈'}
                    </span>
                    <span className="text-[11px] font-bold text-[#f5c451]">
                      {isPopped ? 'Unlocked ✨' : b.label || `Balloon ${idx + 1}`}
                    </span>
                    {isPopped && (
                      <p className="text-[10px] text-emerald-200 mt-1 line-clamp-2 leading-tight">
                        {b.quote}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {activeQuote && (
              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 italic mb-2 animate-in fade-in">
                &ldquo;{activeQuote}&rdquo;
              </div>
            )}

            {unlockedScenes.includes(1) ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Blow Candles Next 🎂</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-1.5">
                🎈 Pop {balloons.length - poppedBalloons.length} more balloon{balloons.length - poppedBalloons.length > 1 ? 's' : ''} to continue
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: BLOW CANDLES ON CAKE ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Make a Birthday Wish!
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Tap each candle flame to blow it out
            </p>

            {/* 3D Birthday Cake Container */}
            <div className="relative my-4 p-4 rounded-2xl bg-black/30 border border-emerald-500/20 flex flex-col items-center">
              {/* Candles Row */}
              <div className="flex gap-4 items-end mb-1 z-10">
                {[0, 1, 2].map((idx) => {
                  const isBlown = blownCandles.includes(idx)
                  return (
                    <div
                      key={idx}
                      onClick={() => handleBlowCandle(idx)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      {/* Flame */}
                      <span
                        className={cn(
                          'text-xl transition-all',
                          isBlown ? 'opacity-30 scale-75' : 'magic-flame-anim scale-110'
                        )}
                      >
                        {isBlown ? '💨' : '🔥'}
                      </span>
                      {/* Candle Stick */}
                      <div className="w-2.5 h-7 rounded-sm bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 shadow-sm" />
                    </div>
                  )
                })}
              </div>

              {/* Cake Layers */}
              <div className="w-36 h-12 rounded-t-xl bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 border-t-2 border-white/40 shadow-inner flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow">
                  {data.recipientAge ? `${data.recipientAge} Fabulous Years` : 'Happy Birthday'}
                </span>
              </div>
              <div className="w-44 h-14 rounded-b-2xl bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 border-t border-amber-300/30 flex items-center justify-around px-2">
                <span className="text-sm">🍓</span>
                <span className="text-sm">✨</span>
                <span className="text-sm">🍓</span>
                <span className="text-sm">✨</span>
                <span className="text-sm">🍓</span>
              </div>
            </div>

            {cakeCut ? (
              <div className="flex items-center justify-between gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => goToScene(0)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToScene(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Unwrap Gift 🎁</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-1.5">
                💨 Blow all 3 candles to cut the cake
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 2: UNWRAP GIFT ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              A Special Gift for You
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Tap the ribbon to unwrap your celebration surprise
            </p>

            <div className="magic-stage">
              <div
                onClick={handleOpenGift}
                className={cn('magic-gift-wrap mx-auto cursor-pointer select-none', giftOpen && 'open')}
              >
                {/* Gift Lid */}
                <div className="magic-gift-lid w-32 h-9 mx-auto rounded-t-lg bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border border-yellow-200/50 shadow-md relative flex items-center justify-center">
                  <span className="text-xl -mt-3">🎀</span>
                </div>
                {/* Gift Body */}
                <div className="w-28 h-24 mx-auto rounded-b-xl bg-gradient-to-b from-emerald-600 to-emerald-900 border border-emerald-400/50 shadow-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-y-0 w-4 bg-amber-400/80 left-1/2 -ml-2" />
                  <div className="absolute inset-x-0 h-4 bg-amber-400/80 top-1/2 -mt-2" />
                  {giftOpen && (
                    <span className="text-4xl animate-bounce z-10">
                      🌟
                    </span>
                  )}
                </div>
              </div>
            </div>

            {giftOpen ? (
              <div className="flex items-center justify-between gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToScene(3)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Read Letter 💌</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the gift box to open ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 3: LETTER & CELEBRATION ================= */}
        {activeScene === 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-start mb-1">
              <button
                type="button"
                onClick={() => goToScene(2)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
            </div>
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              Dear {data.recipientName},
            </h2>

            <div className="magic-letter text-xs text-slate-100 max-h-48 overflow-y-auto">
              {data.wishContent?.secretLetter ||
                'May this upcoming year bring you boundless happiness, soaring career milestones, vibrant health, and unforgettable journeys with the ones you love most! Keep shining bright!'}
              {data.wishContent?.urduGreeting && (
                <div className="mt-2.5 text-right font-nastaliq text-sm text-amber-200">
                  {data.wishContent.urduGreeting}
                </div>
              )}
              <div className="mt-3 text-right font-serif italic text-amber-300">
                — With love, {data.senderName}
              </div>
            </div>

            {/* Reaction Emojis */}
            <div className="mt-3">
              <p className="text-[11px] text-[#bbf7d0] mb-1.5">
                Send a reaction to {data.senderName}:
              </p>
              <div className="flex justify-center gap-2">
                {['🎂', '💖', '🎉', '🌟', '🥳'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleReaction(emoji)}
                    className={cn(
                      'text-xl p-2 rounded-xl border transition-transform cursor-pointer',
                      selectedReaction === emoji
                        ? 'bg-[#f5c451]/30 border-[#f5c451] scale-110 shadow-sm'
                        : 'bg-white/5 border-white/10 hover:scale-105'
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Response Button */}
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <span>Say Thank You on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=birthday"
              className="inline-block text-[10.5px] text-slate-400 hover:text-amber-300 transition-colors mt-2"
            >
              Crafted on Cardzy Jashn • Create your own Magic Link ✨
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
