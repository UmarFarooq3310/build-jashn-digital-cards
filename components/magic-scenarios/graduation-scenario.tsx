'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Trophy,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  PartyPopper,
  Heart,
  Award,
  MessageCircle,
} from 'lucide-react'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'
import { magicAudio } from '@/lib/jashn/magic-audio'
import { submitMagicResponse, normalizeWhatsAppNumber } from '@/lib/jashn/magic-service'

interface ScenarioProps {
  data: MagicLinkData
  slug: string
  soundEnabled: boolean
  audio: any
  triggerConfetti: () => void
  onSendLove: () => void
  loveSent: boolean
}

const GRADUATION_SCENES = [
  { id: 0, label: 'Cap Toss', icon: '🎓' },
  { id: 1, label: 'Honors', icon: '🏆' },
  { id: 2, label: 'Diploma', icon: '📜' },
  { id: 3, label: 'Cheers', icon: '🎉' },
]

export function GraduationScenario({
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

  // Scene 0: Cap
  const [capTossed, setCapTossed] = useState<boolean>(false)

  // Scene 1: Honors
  const defaultMilestones = [
    { id: 1, quote: 'All your late-night study marathons and dedication have paid off in pure gold! 🏆', title: 'Perseverance' },
    { id: 2, quote: 'This graduation degree is merely your launchpad — the world is ready for your brilliance! 🚀', title: 'Future Leader' },
    { id: 3, quote: 'You set the standard for hard work, integrity, and academic excellence! 🌟', title: 'Excellence' },
    { id: 4, quote: 'Here is to turning ambitious dreams into historic milestones! 🥂', title: 'Ambition' },
  ]
  const milestones = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultMilestones
  const [unlockedHonors, setUnlockedHonors] = useState<number[]>([])

  // Scene 2: Diploma
  const [diplomaUnrolled, setDiplomaUnrolled] = useState<boolean>(false)

  // Scene 3: Celebration
  const [selectedReaction, setSelectedReaction] = useState<string>('🎓')
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
    const isNowPlaying = magicAudio.toggleMelody('graduation')
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

  // Handle Cap Toss
  const handleTossCap = () => {
    if (capTossed) return
    magicAudio.playFanfare()
    setCapTossed(true)
    spawnBurst(['🎓', '✨', '🎉', '🌟', '🥂'], 22)
    triggerConfetti()
    unlockScene(1)
    setTimeout(() => {
      magicAudio.playChime()
      setTimeout(() => goToScene(1), 3000)
    }, 600)
  }

  // Handle Unlock Honor
  const handleUnlockHonor = (id: number) => {
    if (unlockedHonors.includes(id)) return
    magicAudio.playChime()
    const next = [...unlockedHonors, id]
    setUnlockedHonors(next)
    spawnBurst(['🏆', '✨'], 5)
    unlockScene(2)

    if (next.length === milestones.length) {
      magicAudio.playSparkle()
      triggerConfetti()
      setTimeout(() => goToScene(2), 3000)
    }
  }

  // Handle Unroll Diploma
  const handleUnrollDiploma = () => {
    if (diplomaUnrolled) return
    magicAudio.playWaxCrack()
    setDiplomaUnrolled(true)
    spawnBurst(['📜', '✨', '🌟', '🎓'], 18)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playChime()
      unlockScene(3)
      setTimeout(() => goToScene(3), 3000)
    }, 600)
  }

  const rawPhone = normalizeWhatsAppNumber(data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || (data as any)?.whatsappNumber)
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string) => {
    const msg = encodeURIComponent(
      `Congratulations Graduate! 🎓✨ ${data.recipientName} received your Graduation Magic card on Cardzy: Reacted with ${emoji} 🏆🌟\n\nView card: ${returnUrl}`
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
        reaction: `${emoji} Graduation Cheers!`,
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
          '--card-bg': 'rgba(5, 18, 38, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#38bdf8',
          '--rose': '#2563eb',
          '--txt': '#f0f9ff',
          '--mut': '#bae6fd',
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-sky-400/40 bg-sky-500/15 text-[#f5c451] uppercase mb-1">
          🎓 GRADUATION HONORS
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Congrats, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#bae6fd] mb-2.5">
          Proudly celebrated by {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {GRADUATION_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#031428] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#bae6fd] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: CAP TOSS ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Toss the Graduation Cap!
            </h2>
            <p className="text-xs text-[#bae6fd] mb-2">
              Tap the mortarboard to launch your cap high into the sky
            </p>

            <div className="magic-stage">
              <div
                onClick={handleTossCap}
                className="relative w-40 h-40 mx-auto flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <span
                  className={cn(
                    'text-6xl transition-all duration-700 block',
                    capTossed ? 'magic-cap-tossed' : 'group-hover:scale-110'
                  )}
                >
                  🎓
                </span>
                <span className="text-[11px] font-bold text-amber-300 mt-2 uppercase tracking-wider">
                  {capTossed ? 'Hats Off! 🌟' : 'Tap to Toss Cap'}
                </span>
              </div>
            </div>

            {capTossed ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Academic Honors 🏆</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the graduation cap to celebrate ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: HONORS ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Academic Milestones & Honors
            </h2>
            <p className="text-xs text-[#bae6fd] mb-2">
              Tap each badge to unlock your accomplishments
            </p>

            <div className="magic-tiles my-2">
              {milestones.map((m: any, idx: number) => {
                const isRev = unlockedHonors.includes(m.id || idx)
                return (
                  <div
                    key={m.id || idx}
                    onClick={() => handleUnlockHonor(m.id || idx)}
                    className={cn(
                      'magic-tile',
                      isRev && 'revealed'
                    )}
                  >
                    <span className="text-xl mb-1">
                      {isRev ? '🌟' : '🏆'}
                    </span>
                    <span className="text-[11px] font-bold text-[#f5c451]">
                      {m.title || `Honor ${idx + 1}`}
                    </span>
                    {isRev && (
                      <p className="text-[10px] text-sky-100 mt-1 line-clamp-3 leading-tight text-center px-1">
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
                <span>Unroll Diploma 📜</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: DIPLOMA SCROLL ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Official Degree Diploma
            </h2>
            <p className="text-xs text-[#bae6fd] mb-2">
              Tap the red ribbon to unroll your graduation proclamation
            </p>

            {!diplomaUnrolled ? (
              <div className="magic-stage">
                <div
                  onClick={handleUnrollDiploma}
                  className="w-56 h-36 mx-auto rounded-2xl border border-sky-400/40 bg-gradient-to-b from-[#0e274d] to-[#041226] shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-102 transition-transform select-none animate-pulse"
                >
                  <div className="size-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-white flex items-center justify-center text-xl shadow-lg mb-1">
                    📜
                  </div>
                  <span className="text-xs font-bold text-amber-300 font-serif">
                    Tap to Unroll Degree Scroll
                  </span>
                </div>
              </div>
            ) : (
              <TypewriterLetter
              className="magic-letter text-xs text-sky-100 max-h-52 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `Proudly presented to ${data.recipientName} for outstanding dedication, countless late-night study sessions, and achieving this magnificent milestone. The future is entirely yours!`}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— Proudly witnessed by, ${data.senderName}`}
              photoUrl={data.wishContent?.photoUrl || data.inviteContent?.photoUrl}
              urduClassName="mt-2.5 text-right font-nastaliq text-sm text-amber-200"
              signatureClassName="mt-3 text-right font-serif italic text-amber-300"
            />
            )}

            {diplomaUnrolled ? (
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
                  <span>Celebrate 🎉</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the ribbon to unroll ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 3: CHEERS & CELEBRATION ================= */}
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
              Class of 2026 Champion!
            </h2>
            <p className="text-xs text-[#bae6fd] mb-2">
              The entire world is waiting for your genius
            </p>

            {/* Reaction Emojis */}
            <div className="my-3">
              <p className="text-[11px] text-[#bae6fd] mb-1.5">
                Send cheers back to {data.senderName}:
              </p>
              <div className="flex justify-center gap-2">
                {['🎓', '🏆', '🚀', '🌟', '🥂'].map((emoji) => (
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
              <span>Send Cheers on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=graduation"
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
