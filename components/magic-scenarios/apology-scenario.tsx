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

const APOLOGY_SCENES = [
  { id: 0, label: 'Mend', icon: '❤️' },
  { id: 1, label: 'Amends', icon: '🕊️' },
  { id: 2, label: 'Letter', icon: '📜' },
  { id: 3, label: 'Peace', icon: '💖' },
]

export function ApologyScenario({
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

  // Scene 0: Kintsugi Heart
  const [heartMended, setHeartMended] = useState<boolean>(false)

  // Scene 1: Amends
  const defaultAmends = [
    { id: 1, quote: 'I realize my mistake and deeply regret causing you any hurt or discomfort.', title: 'I Am Truly Sorry' },
    { id: 2, quote: 'Our bond means the world to me, far more than any pride or argument.', title: 'You Matter' },
    { id: 3, quote: 'I promise to listen more attentively and be much more thoughtful going forward.', title: 'My Promise' },
    { id: 4, quote: 'I hope you can find it in your heart to grant me a fresh start.', title: 'Fresh Start' },
  ]
  const amends = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultAmends
  const [revealedAmends, setRevealedAmends] = useState<number[]>([])

  // Scene 3: Forgiveness
  const [forgiven, setForgiven] = useState<boolean | null>(null)
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
    const isNowPlaying = magicAudio.toggleMelody('apology')
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

  // Handle Mend Heart
  const handleMendHeart = () => {
    if (heartMended) return
    magicAudio.playChime()
    setHeartMended(true)
    spawnBurst(['💖', '✨', '🕊️', '🌸'], 16)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playFanfare()
      unlockScene(1)
    }, 600)
  }

  // Handle Reveal Amend
  const handleRevealAmend = (id: number) => {
    if (revealedAmends.includes(id)) return
    magicAudio.playChime()
    const next = [...revealedAmends, id]
    setRevealedAmends(next)
    spawnBurst(['🕊️', '✨'], 5)

    if (next.length >= 2) {
      unlockScene(2)
    }
    if (next.length === amends.length) {
      magicAudio.playSparkle()
      triggerConfetti()
    }
  }

  // Handle Forgive
  const handleForgive = async (choice: boolean) => {
    setForgiven(choice)
    magicAudio.playFanfare()
    spawnBurst(choice ? ['💖', '🕊️', '✨', '🌸'] : ['🕊️', '🤍'], 16)
    triggerConfetti()
    onSendLove()

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'reaction',
        reaction: choice ? 'I Forgive You 💖' : 'Let’s talk soon 🕊️',
      })
    } catch {
      // offline fallback
    }
  }

  const rawPhone = data.wishContent?.whatsappNumber?.replace(/[^0-9]/g, '') || ''
  const replyText = forgiven === true ? 'I accept your apology and forgive you with all my heart 💖' : 'Thank you for your sincere message, let us talk soon 🕊️'
  const whatsAppMessage = encodeURIComponent(
    `Apology response from ${data.recipientName}: ${replyText}`
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
          '--card-bg': 'rgba(28, 8, 14, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#f43f5e',
          '--rose': '#fb7185',
          '--txt': '#fff1f2',
          '--mut': '#fecdd3',
        } as any}
      >
        {/* Top Header Bar: Back to All Magic Cards & Music Toggle */}
        <div className="flex items-center justify-between w-full mb-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-rose-200 transition-all shadow-sm cursor-pointer"
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
          🥺 SINCERE APOLOGY & PEACE
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          For {data.recipientName}
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#fecdd3] mb-2.5">
          From the heart of {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {APOLOGY_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#22040b] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#fecdd3] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: KINTSUGI HEART ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Mending the Fractures
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              Tap the broken heart to heal it with golden Kintsugi seams
            </p>

            <div className="magic-stage">
              <div
                onClick={handleMendHeart}
                className="relative w-40 h-40 mx-auto flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <div
                  className={cn(
                    'size-24 rounded-full bg-gradient-to-tr from-rose-900/60 via-red-800/40 to-amber-700/50 border-2 border-amber-300 flex items-center justify-center text-4xl transition-all duration-700',
                    heartMended ? 'magic-kintsugi-glow scale-110' : 'group-hover:scale-105 animate-pulse'
                  )}
                >
                  {heartMended ? '💖' : '💔'}
                </div>
                <span className="text-[11px] font-bold text-amber-300 mt-2 uppercase tracking-wider">
                  {heartMended ? 'Mended in Gold! ✨' : 'Tap to Heal Heart'}
                </span>
              </div>
            </div>

            {heartMended ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Read Thoughts Next 🕊️</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the heart to mend ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: AMENDS ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Words from the Heart
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              Tap each chapter card to read what I wish to say
            </p>

            <div className="magic-tiles my-2">
              {amends.map((a: any, idx: number) => {
                const isRev = revealedAmends.includes(a.id || idx)
                return (
                  <div
                    key={a.id || idx}
                    onClick={() => handleRevealAmend(a.id || idx)}
                    className={cn(
                      'magic-tile',
                      isRev && 'revealed'
                    )}
                  >
                    <span className="text-xl mb-1">
                      {isRev ? '🕊️' : '💭'}
                    </span>
                    <span className="text-[11px] font-bold text-[#f5c451]">
                      {a.title || `Point ${idx + 1}`}
                    </span>
                    {isRev && (
                      <p className="text-[10px] text-rose-100 mt-1 line-clamp-3 leading-tight text-center px-1">
                        {a.quote}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {unlockedScenes.includes(2) ? (
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
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-1.5">
                🕊️ Tap cards to unlock letter
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 2: LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              Dear {data.recipientName},
            </h2>

            <div className="magic-letter text-xs text-rose-100 max-h-52 overflow-y-auto">
              {data.wishContent?.secretLetter ||
                `I am writing this with complete humility and sincerity. What happened was my fault, and seeing distance between us weighs heavily on my heart. You have been a source of light and warmth in my life, and I never want to jeopardize that. I am truly, deeply sorry.`}
              {data.wishContent?.urduGreeting && (
                <div className="mt-2.5 text-right font-nastaliq text-sm text-amber-200">
                  {data.wishContent.urduGreeting}
                </div>
              )}
              <div className="mt-3 text-right font-serif italic text-amber-300">
                — Sincerely yours, {data.senderName}
              </div>
            </div>

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
                <span>A Fresh Chapter 🕊️</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: FORGIVENESS & PEACE ================= */}
        {activeScene === 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-start mb-1">
              <button
                type="button"
                onClick={() => goToScene(2)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
            </div>

            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              A Bridge to Healing
            </h2>
            <p className="text-xs text-[#fecdd3] mb-2">
              How would you like to respond to {data.senderName}?
            </p>

            <div className="flex gap-2 my-3">
              <button
                type="button"
                onClick={() => handleForgive(true)}
                className={cn(
                  'flex-1 py-3 px-2 rounded-2xl border text-center transition-transform cursor-pointer',
                  forgiven === true
                    ? 'bg-rose-500/30 border-[#f5c451] scale-105 shadow-md'
                    : 'bg-white/5 border-white/10 hover:scale-102'
                )}
              >
                <span className="text-2xl block mb-1">💖</span>
                <span className="text-xs font-bold text-amber-300 block">I Forgive You</span>
                <span className="text-[10px] text-[#fecdd3]">Let&apos;s put it behind us</span>
              </button>

              <button
                type="button"
                onClick={() => handleForgive(false)}
                className={cn(
                  'flex-1 py-3 px-2 rounded-2xl border text-center transition-transform cursor-pointer',
                  forgiven === false
                    ? 'bg-purple-500/30 border-purple-400 scale-105 shadow-md'
                    : 'bg-white/5 border-white/10 hover:scale-102'
                )}
              >
                <span className="text-2xl block mb-1">🕊️</span>
                <span className="text-xs font-bold text-amber-300 block">Let&apos;s Talk Soon</span>
                <span className="text-[10px] text-[#fecdd3]">I appreciate this note</span>
              </button>
            </div>

            {/* Direct WhatsApp Response Button */}
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <span>Reply on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link"
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
