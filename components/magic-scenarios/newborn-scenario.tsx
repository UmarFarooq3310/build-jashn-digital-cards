'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Heart,
  Baby,
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

const NEWBORN_SCENES = [
  { id: 0, label: 'Cradle', icon: '🍼' },
  { id: 1, label: 'Milestones', icon: '🌟' },
  { id: 2, label: 'Blessing', icon: '📜' },
  { id: 3, label: 'Dua', icon: '💖' },
]

export function NewbornScenario({
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

  // Scene 0: Cradle
  const [cradleRocked, setCradleRocked] = useState<boolean>(false)

  // Scene 1: Milestones
  const defaultMilestones = [
    { id: 1, quote: 'Ten tiny fingers, ten tiny toes, and a whole universe of love! 👶', title: 'Tiny Miracle' },
    { id: 2, quote: 'May this little bundle of joy bring boundless barakah and laughter to your home. 🌟', title: 'Home Barakah' },
    { id: 3, quote: 'Congratulations to the proud parents! May they grow in health and grace. 🌸', title: 'Proud Parents' },
    { id: 4, quote: 'A precious gift sent straight from the heavens to be cherished forever! 🍼', title: 'Heaven Sent' },
  ]
  const milestones = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultMilestones
  const [revealedMilestones, setRevealedMilestones] = useState<number[]>([])

  // Scene 3: Celebration
  const [selectedReaction, setSelectedReaction] = useState<string>('👶')
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
    const isNowPlaying = magicAudio.toggleMelody('newborn')
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

  // Handle Cradle Rock
  const handleRockCradle = () => {
    if (cradleRocked) return
    magicAudio.playChime()
    setCradleRocked(true)
    spawnBurst(['🍼', '✨', '🌸', '👶', '🌟'], 18)
    triggerConfetti()
    unlockScene(1)
    setTimeout(() => {
      magicAudio.playFanfare()
      setTimeout(() => goToScene(1), 3000)
    }, 500)
  }

  // Handle Reveal Milestone
  const handleRevealMilestone = (id: number) => {
    if (revealedMilestones.includes(id)) return
    magicAudio.playChime()
    const next = [...revealedMilestones, id]
    setRevealedMilestones(next)
    spawnBurst(['🌸', '✨'], 5)
    unlockScene(2)

    if (next.length === milestones.length) {
      magicAudio.playSparkle()
      triggerConfetti()
      setTimeout(() => goToScene(2), 3000)
    }
  }

  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string) => {
    const msg = encodeURIComponent(
      `Congratulations on the little miracle! ✨ ${data.recipientName} received your Newborn Blessing card on Cardzy: Reacted with ${emoji} 👶🌸\n\nView card: ${returnUrl}`
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
        reaction: `${emoji} Baby Shower Blessings!`,
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
          '--card-bg': 'rgba(8, 26, 20, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#34d399',
          '--rose': '#f472b6',
          '--txt': '#f0fdf4',
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-pink-400/40 bg-pink-500/15 text-[#f5c451] uppercase mb-1">
          🍼 NEWBORN BLESSING & SHOWER
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Welcome Little Angel!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#bbf7d0] mb-2.5">
          Dedicated to {data.recipientName} by {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {NEWBORN_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#062016] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#bbf7d0] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: CRADLE ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Rock the Golden Cradle
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Tap the cradle to chime a soothing lullaby blessing
            </p>

            <div className="magic-stage">
              <div
                onClick={handleRockCradle}
                className="relative w-40 h-40 mx-auto flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <div
                  className={cn(
                    'size-24 rounded-full bg-gradient-to-tr from-pink-500/20 via-amber-400/30 to-emerald-400/20 border-2 border-amber-300 shadow-[0_0_35px_rgba(244,114,182,0.4)] flex items-center justify-center text-4xl transition-transform duration-500',
                    cradleRocked ? 'magic-crib-rocking scale-110' : 'group-hover:scale-105 animate-pulse'
                  )}
                >
                  🍼
                </div>
                <span className="text-[11px] font-bold text-amber-300 mt-2 uppercase tracking-wider">
                  {cradleRocked ? 'Sweet Dreams! ✨' : 'Tap to Rock Cradle'}
                </span>
              </div>
            </div>

            {cradleRocked ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Baby Milestones 🌟</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the cradle to begin ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: MILESTONES ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Sweet Blessings & Milestones
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Tap each card to unlock wishes for the newborn
            </p>

            <div className="magic-tiles my-2">
              {milestones.map((m: any, idx: number) => {
                const isRev = revealedMilestones.includes(m.id || idx)
                return (
                  <div
                    key={m.id || idx}
                    onClick={() => handleRevealMilestone(m.id || idx)}
                    className={cn(
                      'magic-tile',
                      isRev && 'revealed'
                    )}
                  >
                    <span className="text-xl mb-1">
                      {isRev ? '🌸' : '🌟'}
                    </span>
                    <span className="text-[11px] font-bold text-[#f5c451]">
                      {m.title || `Blessing ${idx + 1}`}
                    </span>
                    {isRev && (
                      <p className="text-[10px] text-emerald-100 mt-1 line-clamp-3 leading-tight text-center px-1">
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

        {/* ================= SCENE 2: BLESSING LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              Dear {data.recipientName} & Parents,
            </h2>

            <TypewriterLetter
              className="magic-letter text-xs text-emerald-100 max-h-52 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `A heartfelt welcome to your precious little bundle of joy! May their tiny hands bring enormous joy, their sweet laughter fill your home with light, and may they always walk under Allah's loving protection and grace.`}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— With warmest Duas, ${data.senderName}`}
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
                <span>Send Blessings 💖</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: CELEBRATION & DUAS ================= */}
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
              Blessings for the Little Angel
            </h2>
            <p className="text-xs text-[#bbf7d0] mb-2">
              Send warm congratulations to {data.senderName}
            </p>

            {/* Reaction Emojis */}
            <div className="my-3">
              <p className="text-[11px] text-[#bbf7d0] mb-1.5">
                Send congratulations back:
              </p>
              <div className="flex justify-center gap-2">
                {['👶', '🍼', '🌸', '🤲', '🌟'].map((emoji) => (
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
              <span>Send Congratulations on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=newborn"
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
