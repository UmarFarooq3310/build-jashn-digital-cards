'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Moon,
  Heart,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Gift,
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

const EID_SCENES = [
  { id: 0, label: 'Crescent', icon: '🌙' },
  { id: 1, label: 'Lanterns', icon: '🏮' },
  { id: 2, label: 'Eidi', icon: '🎁' },
  { id: 3, label: 'Dua', icon: '🤲' },
]

export function EidScenario({
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

  // Scene 0: Moon
  const [moonSighted, setMoonSighted] = useState<boolean>(false)

  // Scene 1: Lanterns
  const defaultDuas = [
    { id: 1, quote: 'Taqabbal Allahu minna wa minkum — May Allah accept our fasts and prayers! 🤲', title: 'Dua 1' },
    { id: 2, quote: 'May this blessed Eid bring divine peace, joy, and barakah to your home. 🌙', title: 'Dua 2' },
    { id: 3, quote: 'May your celebrations be as sweet as sheer khurma and filled with family warmth! 🍯', title: 'Dua 3' },
  ]
  const duas = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultDuas
  const [litLanterns, setLitLanterns] = useState<number[]>([])
  const [activeDua, setActiveDua] = useState<string | null>(null)

  // Scene 2: Eidi
  const [eidiOpened, setEidiOpened] = useState<boolean>(false)

  // Scene 3: Celebration
  const [selectedReaction, setSelectedReaction] = useState<string>('🌙')
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
    const isNowPlaying = magicAudio.toggleMelody('eid')
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

  // Handle Sight Moon
  const handleSightMoon = () => {
    if (moonSighted) return
    magicAudio.playChime()
    setMoonSighted(true)
    spawnBurst(['🌙', '✨', '⭐', '🌟'], 16)
    triggerConfetti()
    unlockScene(1)
    setTimeout(() => {
      magicAudio.playFanfare()
    }, 500)
    setTimeout(() => goToScene(1), 3000)
  }

  // Handle Light Lantern
  const handleLightLantern = (id: number, quote: string) => {
    if (litLanterns.includes(id)) return
    magicAudio.playChime()
    const next = [...litLanterns, id]
    setLitLanterns(next)
    setActiveDua(quote)
    spawnBurst(['🏮', '✨', '🔥'], 6)
    unlockScene(2)

    if (next.length === duas.length) {
      magicAudio.playFanfare()
      triggerConfetti()
      setTimeout(() => goToScene(2), 3000)
    }
  }

  // Handle Open Eidi
  const handleOpenEidi = () => {
    if (eidiOpened) return
    magicAudio.playWaxCrack()
    setEidiOpened(true)
    spawnBurst(['🎁', '✨', '🌙', '💵', '🍯'], 18)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playChime()
      unlockScene(3)
      setTimeout(() => goToScene(3), 3000)
    }, 600)
  }

  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string) => {
    const msg = encodeURIComponent(
      `Khair Mubarak! ✨ ${data.recipientName} received your Eid Mubarak magic card on Cardzy: Reacted with ${emoji} 🌙🤲\n\nView card: ${returnUrl}`
    )
    return rawPhone
      ? `https://wa.me/${rawPhone}?text=${msg}`
      : `https://api.whatsapp.com/send?text=${msg}`
  }
  const whatsAppHref = getWhatsAppUrl(selectedReaction)

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
        reaction: `${emoji} Eid Mubarak Greeting!`,
      })
    } catch {
      // offline fallback
    }

    // Open WhatsApp so user can return view and send reply
    const waUrl = getWhatsAppUrl(emoji)
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank')
    }
  }

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
          '--card-bg': 'rgba(3, 24, 18, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#10b981',
          '--rose': '#059669',
          '--txt': '#f0fff4',
          '--mut': '#a7f3d0',
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-[#f5c451] uppercase mb-1">
          🌙 EID MUBARAK
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Eid Mubarak, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#a7f3d0] mb-2.5">
          Warmest greetings from {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {EID_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#032014] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#a7f3d0] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: CRESCENT MOON ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Sight the Eid Crescent!
            </h2>
            <p className="text-xs text-[#a7f3d0] mb-2">
              Tap the golden crescent to illuminate the Chand Raat sky
            </p>

            <div className="magic-stage">
              <div
                onClick={handleSightMoon}
                className={cn(
                  'w-36 h-36 mx-auto rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-700 relative',
                  moonSighted
                    ? 'bg-gradient-to-tr from-amber-500/30 to-yellow-300/40 shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110'
                    : 'bg-black/30 border border-emerald-400/20 hover:scale-105'
                )}
              >
                <span className={cn('text-6xl transition-transform duration-700', moonSighted ? 'scale-125 rotate-6' : 'hover:scale-110')}>
                  🌙
                </span>
                <span className="text-[11px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
                  {moonSighted ? 'Chand Mubarak! ✨' : 'Tap the Moon'}
                </span>
              </div>
            </div>

            {moonSighted ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Light Eid Lanterns 🏮</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the crescent to begin Eid celebrations ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: SACRED LANTERNS ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Light the Festive Lanterns
            </h2>
            <p className="text-xs text-[#a7f3d0] mb-2">
              Tap each traditional Fanous to kindle its flame and unlock blessings
            </p>

            <div className="grid grid-cols-3 gap-2 my-3">
              {duas.map((d: any, idx: number) => {
                const isLit = litLanterns.includes(d.id)
                return (
                  <div
                    key={d.id || idx}
                    onClick={() => handleLightLantern(d.id, d.quote)}
                    className={cn(
                      'p-2.5 rounded-2xl border text-center transition-all cursor-pointer min-h-[90px] flex flex-col items-center justify-center relative magic-lantern-item',
                      isLit
                        ? 'border-amber-400/50 bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'border-white/15 bg-white/5 hover:scale-105'
                    )}
                  >
                    <span className="text-3xl mb-1">
                      {isLit ? '🏮' : '🪔'}
                    </span>
                    <span className="text-[10px] font-bold text-amber-300">
                      {isLit ? 'Lit ✨' : `Lantern ${idx + 1}`}
                    </span>
                  </div>
                )
              })}
            </div>

            {activeDua && (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 italic mb-2 animate-in fade-in">
                &ldquo;{activeDua}&rdquo;
              </div>
            )}

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
                <span>Open Eidi 🎁</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: EIDI ENVELOPE ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Your Eidi Blessing Envelope
            </h2>
            <p className="text-xs text-[#a7f3d0] mb-2">
              Tap the wax seal to open your special Eidi
            </p>

            <div className="magic-stage">
              <div
                onClick={handleOpenEidi}
                className={cn(
                  'w-56 h-36 mx-auto rounded-2xl border cursor-pointer relative overflow-hidden transition-all duration-500 flex flex-col items-center justify-center',
                  eidiOpened
                    ? 'border-amber-400 bg-gradient-to-b from-[#2d1f05] to-[#120d02] shadow-[0_0_35px_rgba(245,158,11,0.4)]'
                    : 'border-emerald-400/40 bg-gradient-to-b from-emerald-900/60 to-emerald-950/80 hover:scale-102 animate-pulse'
                )}
              >
                <span className="text-4xl mb-1">
                  {eidiOpened ? '💌' : '🎁'}
                </span>
                <span className="text-xs font-bold text-amber-300 font-serif">
                  {eidiOpened ? 'Eidi Mubarak Unlocked! ✨' : 'Tap to Break Seal'}
                </span>
                <span className="text-[10px] text-emerald-300/80 mt-1">
                  Special Eidi from {data.senderName}
                </span>
              </div>
            </div>

            {eidiOpened ? (
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
                  <span>Read Eid Dua 🤲</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the envelope to unwrap Eidi ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 3: EID DUA & GREETINGS ================= */}
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

            <TypewriterLetter
              className="magic-letter text-xs text-emerald-100 max-h-48 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || 'Eid Mubarak! May Allah shower your life with limitless peace, joyful family laughter, vibrant health, and divine barakah. May all your prayers be answered!'}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— Duas and love, ${data.senderName}`}
              urduClassName="mt-2.5 text-right font-nastaliq text-sm text-amber-200"
              signatureClassName="mt-3 text-right font-serif italic text-amber-300"
            />

            {/* Reaction Emojis */}
            <div className="mt-3">
              <p className="text-[11px] text-[#a7f3d0] mb-1.5">
                Send Eid Mubarak greetings back to {data.senderName}:
              </p>
              <div className="flex justify-center gap-2">
                {['🌙', '🤲', '✨', '🍯', '🎉'].map((emoji) => (
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
              <span>Say Khair Mubarak on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=eid"
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
