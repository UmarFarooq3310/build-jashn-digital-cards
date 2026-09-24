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

const RAMADAN_SCENES = [
  { id: 0, label: 'Hilal', icon: '🌙' },
  { id: 1, label: 'Lanterns', icon: '🏮' },
  { id: 2, label: 'Duas', icon: '📜' },
  { id: 3, label: 'Blessings', icon: '🤲' },
]

export function RamadanScenario({
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

  // Scene 0: Hilal
  const [hilalSighted, setHilalSighted] = useState<boolean>(false)

  // Scene 1: Lanterns
  const defaultDuas = [
    { id: 1, quote: 'Dhahaba adh-dhama’u wabtallatil-‘urooq wa thabatal-ajru in sha Allah (The thirst has gone, veins moistened, and reward confirmed). 🤲', title: 'Iftar Dua' },
    { id: 2, quote: 'May the holy light of the Quran fill your days with peace, patience, and serenity. 🌙', title: 'Barakah' },
    { id: 3, quote: 'May Allah accept your fasting, night prayers, charity, and soften your heart with His mercy. ✨', title: 'Acceptance' },
  ]
  const duas = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultDuas
  const [litLanterns, setLitLanterns] = useState<number[]>([])
  const [activeDua, setActiveDua] = useState<string | null>(null)

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
    const isNowPlaying = magicAudio.toggleMelody('ramadan')
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

  // Handle Sight Hilal
  const handleSightHilal = () => {
    if (hilalSighted) return
    magicAudio.playChime()
    setHilalSighted(true)
    spawnBurst(['🌙', '✨', '⭐', '🌟', '🕌'], 18)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playFanfare()
      unlockScene(1)
      setTimeout(() => goToScene(1), 3000)
    }, 600)
  }

  // Handle Light Lantern
  const handleLightLantern = (id: number, quote: string) => {
    if (litLanterns.includes(id)) return
    magicAudio.playChime()
    const next = [...litLanterns, id]
    setLitLanterns(next)
    setActiveDua(quote)
    spawnBurst(['🏮', '✨', '🔥'], 6)

    if (next.length === duas.length) {
      magicAudio.playFanfare()
      triggerConfetti()
      unlockScene(2)
      unlockScene(3)
      setTimeout(() => goToScene(2), 3000)
    }
  }

  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string) => {
    const msg = encodeURIComponent(
      `Ramadan Mubarak! ✨ ${data.recipientName} received your Ramadan Kareem magic card on Cardzy: Reacted with ${emoji} 🌙🤲\n\nView card: ${returnUrl}`
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
        reaction: `${emoji} Ramadan Kareem Dua!`,
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
          '--card-bg': 'rgba(4, 24, 28, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#06b6d4',
          '--rose': '#0891b2',
          '--txt': '#ecfeff',
          '--mut': '#a5f3fc',
        } as any}
      >
        {/* Top Header Bar: Back to All Magic Cards & Music Toggle */}
        <div className="flex items-center justify-between w-full mb-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-cyan-200 transition-all shadow-sm cursor-pointer"
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/15 text-[#f5c451] uppercase mb-1">
          🌙 RAMADAN KAREEM
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Ramadan Mubarak, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#a5f3fc] mb-2.5">
          Warm prayers from {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {RAMADAN_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#031d22] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#a5f3fc] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: HILAL ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Sight the Ramadan Hilal
            </h2>
            <p className="text-xs text-[#a5f3fc] mb-2">
              Tap the crescent moon to welcome the holy month of mercy
            </p>

            <div className="magic-stage">
              <div
                onClick={handleSightHilal}
                className={cn(
                  'w-36 h-36 mx-auto rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-700 relative',
                  hilalSighted
                    ? 'bg-gradient-to-tr from-cyan-500/30 via-amber-400/30 to-yellow-300/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] scale-110'
                    : 'bg-black/30 border border-cyan-400/20 hover:scale-105'
                )}
              >
                <span className={cn('text-6xl transition-transform duration-700', hilalSighted ? 'scale-125 rotate-6' : 'hover:scale-110')}>
                  🌙
                </span>
                <span className="text-[11px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
                  {hilalSighted ? 'Ramadan Mubarak! ✨' : 'Tap the Hilal'}
                </span>
              </div>
            </div>

            {hilalSighted ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Light Lanterns Next 🏮</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the crescent moon to begin ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: SACRED LANTERNS ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Light the Ramadan Fanous
            </h2>
            <p className="text-xs text-[#a5f3fc] mb-2">
              Tap each traditional lantern to kindle its light and unlock daily Duas
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
                      {isLit ? 'Lit ✨' : `Fanous ${idx + 1}`}
                    </span>
                  </div>
                )
              })}
            </div>

            {activeDua && (
              <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-xs text-cyan-200 italic mb-2 animate-in fade-in">
                &ldquo;{activeDua}&rdquo;
              </div>
            )}

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
                  <span>Read Prayers 📜</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-1.5">
                🏮 Light {duas.length - litLanterns.length} more lantern{duas.length - litLanterns.length > 1 ? 's' : ''} to continue
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 2: LETTER & PRAYERS ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              Dear {data.recipientName},
            </h2>

            <TypewriterLetter
              className="magic-letter text-xs text-cyan-100 max-h-52 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `Ramadan Mubarak to you and your loved ones! May this holy month of fasting, reflection, and Quran bring divine peace, purification, and limitless barakah into your household. May every Suhoor and Iftar be full of gratitude.`}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— In prayers, ${data.senderName}`}
              photoUrl={data.wishContent?.photoUrl || data.inviteContent?.photoUrl}
              urduClassName="mt-2.5 text-right font-nastaliq text-sm text-amber-200"
              signatureClassName="mt-3 text-right font-serif italic text-amber-300"
            />

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
                <span>Send Duas 🤲</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: DUAS & BLESSINGS ================= */}
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
              A Blessed Month to You!
            </h2>
            <p className="text-xs text-[#a5f3fc] mb-2">
              Send warm Ramadan prayers back to {data.senderName}
            </p>

            {/* Reaction Emojis */}
            <div className="my-3">
              <p className="text-[11px] text-[#a5f3fc] mb-1.5">
                Send Dua reaction:
              </p>
              <div className="flex justify-center gap-2">
                {['🌙', '🤲', '✨', '🍯', '🕌'].map((emoji) => (
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
              <span>Say Ramadan Mubarak on WhatsApp 💬</span>
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
