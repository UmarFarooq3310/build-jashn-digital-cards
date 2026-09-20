'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  Mail,
  Camera,
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

const ANNIVERSARY_SCENES = [
  { id: 0, label: 'Bottle', icon: '🍾' },
  { id: 1, label: 'Memories', icon: '📸' },
  { id: 2, label: 'Letter', icon: '📜' },
  { id: 3, label: 'Love', icon: '💖' },
]

export function AnniversaryScenario({
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

  // Scene 0: Bottle
  const [corkPopped, setCorkPopped] = useState<boolean>(false)

  // Scene 1: Memories
  const defaultMemories = [
    { id: 1, quote: 'The very first day I saw your smile, I knew my heart was home. ❤️', title: 'Day One' },
    { id: 2, quote: 'Through every high and low, you have been my rock and greatest peace. 🌹', title: 'Our Rock' },
    { id: 3, quote: 'To the love of my life: thank you for making every day extraordinary! ✨', title: 'Everyday Joy' },
    { id: 4, quote: 'Here is to our journey so far, and the forever memories yet to come! 🥂', title: 'Forever' },
  ]
  const memories = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultMemories
  const [revealedMemories, setRevealedMemories] = useState<number[]>([])

  // Scene 2: Wax Seal
  const [waxBroken, setWaxBroken] = useState<boolean>(false)

  // Scene 3: Celebration
  const [selectedReaction, setSelectedReaction] = useState<string>('🥂')
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
    const isNowPlaying = magicAudio.toggleMelody('anniversary')
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

  // Handle Cork Pop
  const handlePopCork = () => {
    if (corkPopped) return
    magicAudio.playPop()
    setCorkPopped(true)
    spawnBurst(['🍾', '🥂', '✨', '💖', '🫧'], 18)
    triggerConfetti()
    unlockScene(1)
    setTimeout(() => {
      magicAudio.playFanfare()
    }, 500)
  }

  // Handle Reveal Memory
  const handleRevealMemory = (id: number) => {
    if (revealedMemories.includes(id)) return
    magicAudio.playChime()
    const next = [...revealedMemories, id]
    setRevealedMemories(next)
    spawnBurst(['💖', '✨'], 5)
    unlockScene(2)

    if (next.length === memories.length) {
      magicAudio.playSparkle()
      triggerConfetti()
    }
  }

  // Handle Break Wax
  const handleBreakWax = () => {
    if (waxBroken) return
    magicAudio.playWaxCrack()
    setWaxBroken(true)
    spawnBurst(['💌', '🌹', '✨', '💖'], 16)
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
        reaction: `${emoji} Anniversary Love!`,
      })
    } catch {
      // offline fallback
    }
  }

  const rawPhone = data.wishContent?.whatsappNumber?.replace(/[^0-9]/g, '') || ''
  const whatsAppMessage = encodeURIComponent(
    `Happy Anniversary! ✨ ${data.recipientName} loved your Anniversary Magic card from Cardzy: Reacted with ${selectedReaction} 🥂❤️`
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
          '--card-bg': 'rgba(32, 6, 16, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#f43f5e',
          '--rose': '#ff5c8a',
          '--txt': '#fff1f2',
          '--mut': '#fecdd3',
        } as any}
      >
        {/* Top Header Bar: Back to All Magic Cards & Music Toggle */}
        <div className="flex items-center justify-between w-full mb-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-amber-200 transition-all shadow-sm cursor-pointer"
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-rose-400/40 bg-rose-500/15 text-[#f5c451] uppercase mb-1">
          🥂 GOLDEN ANNIVERSARY
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Happy Anniversary, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#fecdd3] mb-2.5">
          Forever yours, {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {ANNIVERSARY_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#24030e] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#fecdd3] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: POP CORK ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Let&apos;s Pop the Champagne!
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              Tap the bottle to pop the cork and celebrate our milestone
            </p>

            <div className="magic-stage">
              <div
                onClick={handlePopCork}
                className="relative w-36 h-40 mx-auto flex flex-col items-center justify-end cursor-pointer group"
              >
                {/* Cork */}
                <div
                  className={cn(
                    'w-6 h-6 rounded-t-md bg-amber-600 border border-amber-400/60 shadow-md transition-all',
                    corkPopped ? 'magic-cork-flying' : 'group-hover:-translate-y-1'
                  )}
                />
                {/* Bottle Neck */}
                <div className="w-8 h-10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-950 border border-emerald-500/30" />
                {/* Bottle Body */}
                <div className="w-24 h-24 rounded-t-2xl rounded-b-lg bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 border border-emerald-500/30 shadow-2xl relative flex items-center justify-center">
                  <div className="p-1 rounded bg-amber-400/20 border border-amber-400/50 text-center">
                    <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest block">
                      Cardzy Cuvee
                    </span>
                    <span className="text-xs">🥂</span>
                  </div>
                </div>
              </div>
            </div>

            {corkPopped ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Memory Lane 📸</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the champagne bottle to pop ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: MEMORIES ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Cherished Moments
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              Tap each chapter card to reminisce our journey
            </p>

            <div className="magic-tiles my-2">
              {memories.map((m: any, idx: number) => {
                const isRev = revealedMemories.includes(m.id || idx)
                return (
                  <div
                    key={m.id || idx}
                    onClick={() => handleRevealMemory(m.id || idx)}
                    className={cn(
                      'magic-tile',
                      isRev && 'revealed'
                    )}
                  >
                    <span className="text-xl mb-1">
                      {isRev ? '💖' : '📸'}
                    </span>
                    <span className="text-[11px] font-bold text-[#f5c451]">
                      {m.title || `Chapter ${idx + 1}`}
                    </span>
                    {isRev && (
                      <p className="text-[10px] text-rose-100 mt-1 line-clamp-3 leading-tight text-center px-1">
                        {m.quote}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

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
                <span>Read Letter 📜</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              The Anniversary Note
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              Tap the red wax stamp to break the seal
            </p>

            {!waxBroken ? (
              <div className="magic-stage">
                <div
                  onClick={handleBreakWax}
                  className="w-56 h-36 mx-auto rounded-2xl border border-rose-400/40 bg-gradient-to-b from-[#3a0a1c] to-[#1a030b] shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-102 transition-transform select-none animate-pulse"
                >
                  <div className="size-14 rounded-full bg-gradient-to-tr from-rose-700 to-red-500 border-2 border-amber-400 flex items-center justify-center text-xl shadow-lg mb-1">
                    💌
                  </div>
                  <span className="text-xs font-bold text-amber-300 font-serif">
                    Tap to Break Wax Seal
                  </span>
                </div>
              </div>
            ) : (
              <div className="magic-letter text-xs text-rose-100 max-h-52 overflow-y-auto">
                {data.wishContent?.secretLetter ||
                  'Happy Anniversary to my favorite person in the whole universe! Thank you for walking beside me through every high, every quiet evening, and every storm. Here is to our forever!'}
                {data.wishContent?.urduGreeting && (
                  <div className="mt-2.5 text-right font-nastaliq text-sm text-amber-200">
                    {data.wishContent.urduGreeting}
                  </div>
                )}
                <div className="mt-3 text-right font-serif italic text-amber-300">
                  — Forever yours, {data.senderName}
                </div>
              </div>
            )}

            {waxBroken ? (
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
                  <span>Celebrate 💖</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the wax seal to read ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 3: CELEBRATION ================= */}
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
              Cheers to Us, {data.recipientName}!
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              May our bond grow stronger with each passing year
            </p>

            {/* Reaction Emojis */}
            <div className="my-3">
              <p className="text-[11px] text-[#fecdd3] mb-1.5">
                Send love back to {data.senderName}:
              </p>
              <div className="flex justify-center gap-2">
                {['🥂', '❤️', '💍', '🌹', '✨'].map((emoji) => (
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
              className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <span>Send Love on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=anniversary"
              className="inline-block text-[10.5px] text-slate-400 hover:text-amber-300 transition-colors mt-3"
            >
              Crafted on Cardzy Jashn • Create your own Magic Link ✨
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
