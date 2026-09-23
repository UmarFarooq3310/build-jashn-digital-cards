'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";
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
  Award,
  Star,
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

const THANKYOU_SCENES = [
  { id: 0, label: 'Tribute Box', icon: '🎁' },
  { id: 1, label: 'Appreciation', icon: '✨' },
  { id: 2, label: 'Letter', icon: '📜' },
  { id: 3, label: 'Gratitude', icon: '🙏' },
]

export function ThankYouScenario({
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

  // Scene 0: Gift Box
  const [boxOpened, setBoxOpened] = useState<boolean>(false)

  // Scene 1: Appreciation Notes
  const defaultNotes = [
    { id: 1, title: 'Generous Heart', quote: 'Your generosity and warmth have made a world of difference.' },
    { id: 2, title: 'Invaluable Support', quote: 'I am deeply grateful for your continuous encouragement and guidance.' },
    { id: 3, title: 'Pure Kindness', quote: 'Few people touch lives with the kindness and grace that you bring.' },
    { id: 4, title: 'Lasting Impact', quote: 'Thank you from the bottom of my heart for everything you have done.' },
  ]
  const notes = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultNotes
  const [revealedNotes, setRevealedNotes] = useState<number[]>([])

  // Scene 2: Wax seal
  const [waxBroken, setWaxBroken] = useState<boolean>(false)

  // Scene 3: Reaction
  const [selectedReaction, setSelectedReaction] = useState<string>('🙏')
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

  const handleOpenBox = () => {
    if (boxOpened) return
    magicAudio.playPop()
    setBoxOpened(true)
    spawnBurst(['✨', '🌟', '💛', '👑', '🙏'], 16)
    triggerConfetti()
    unlockScene(1)
    setTimeout(() => {
      magicAudio.playFanfare()
      setTimeout(() => goToScene(1), 2000)
    }, 500)
  }

  const handleRevealNote = (id: number) => {
    if (revealedNotes.includes(id)) return
    magicAudio.playChime()
    const next = [...revealedNotes, id]
    setRevealedNotes(next)
    spawnBurst(['✨', '🌟', '💛', '🙏'], 8)
    if (next.length === notes.length) {
      triggerConfetti()
      unlockScene(2)
    }
  }

  const handleBreakWax = () => {
    if (waxBroken) return
    magicAudio.playWaxCrack()
    setWaxBroken(true)
    spawnBurst(['✨', '📜', '💛', '🌟'], 12)
    unlockScene(3)
  }

  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string) => {
    const msg = encodeURIComponent(
      `Thank You! 💛✨ ${data.recipientName} received your Thank You Magic card on Cardzy and reacted with ${emoji} 🙏\n\nView card: ${returnUrl}`
    )
    return rawPhone
      ? `https://wa.me/${rawPhone}?text=${msg}`
      : `https://api.whatsapp.com/send?text=${msg}`
  }
  const whatsAppHref = getWhatsAppUrl(selectedReaction)

  const handleSendReaction = async (emoji: string) => {
    setSelectedReaction(emoji)
    spawnBurst([emoji, '✨', '💛'], 15)
    triggerConfetti()
    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'reaction',
        reaction: `${emoji} ${data.recipientName} responded to Thank You Capsule`,
      })
    } catch {}
    onSendLove()

    // Open WhatsApp so user can return view and send reply
    const waUrl = getWhatsAppUrl(emoji)
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank')
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto text-center">
      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-2xl animate-float-up opacity-90"
            style={{
              left: `${p.left}%`,
              bottom: '0%',
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Music Toggle */}
      <div className="flex justify-end mb-3">
        <button
          type="button"
          onClick={handleToggleMusic}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer',
            musicPlaying
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          )}
        >
          <Volume2 className="size-3.5" />
          <span>{musicPlaying ? 'Music Playing 🎵' : 'Play Music'}</span>
        </button>
      </div>

      {/* Progress Navigator */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
        {THANKYOU_SCENES.map((s) => {
          const isUnlocked = unlockedScenes.includes(s.id)
          const isActive = activeScene === s.id
          return (
            <button
              key={s.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => goToScene(s.id)}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed',
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : isUnlocked
                  ? 'text-white/80 hover:bg-white/10'
                  : 'text-white/30'
              )}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* SCENE 0: GOLDEN TRIBUTE BOX */}
      {activeScene === 0 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 bg-amber-500/20 text-amber-300 border border-amber-400/40">
              🙏 Heartfelt Gratitude & Tribute
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mb-2">
              With Deep Gratitude, {data.recipientName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-6">
              {data.senderName} has sent you a special token of appreciation and recognition.
            </p>

            <div
              onClick={handleOpenBox}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenBox()}
              className={cn(
                'size-36 mx-auto rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl border-2 select-none',
                boxOpened
                  ? 'bg-amber-500/20 border-amber-400 scale-105 shadow-[0_0_50px_rgba(245,158,11,0.4)]'
                  : 'bg-white/10 border-white/30 hover:scale-105 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse'
              )}
            >
              <span className="text-6xl mb-1">{boxOpened ? '✨' : '🎁'}</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                {boxOpened ? 'Opened!' : 'Tap to Unbox'}
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => goToScene(1)}
                disabled={!unlockedScenes.includes(1)}
                className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-950 transition-all bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discover Appreciation Highlights</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 1: APPRECIATION HIGHLIGHTS */}
      {activeScene === 1 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 bg-amber-500/20 text-amber-300 border border-amber-400/40">
              ✨ Words of Appreciation
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-black text-white mb-2">
              Tap to Reveal Every Tribute 🌟
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              Unlocked ({revealedNotes.length} / {notes.length})
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {notes.map((note: any, idx: number) => {
                const isRevealed = revealedNotes.includes(note.id || idx + 1)
                return (
                  <div
                    key={note.id || idx}
                    onClick={() => handleRevealNote(note.id || idx + 1)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRevealNote(note.id || idx + 1)}
                    className={cn(
                      'p-4 rounded-2xl border text-left transition-all cursor-pointer duration-300 flex flex-col justify-between min-h-[90px]',
                      isRevealed
                        ? 'bg-gradient-to-br from-amber-950/80 to-yellow-950/50 border-amber-400/60 shadow-lg'
                        : 'bg-white/5 border-white/15 hover:border-amber-400/50 hover:bg-white/10'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-amber-300">
                        {note.title || `Note #${idx + 1}`}
                      </span>
                      <span className="text-sm">{isRevealed ? '⭐' : '✨'}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {isRevealed ? note.quote : 'Tap to reveal appreciation note...'}
                    </p>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => goToScene(2)}
              disabled={!unlockedScenes.includes(2)}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-950 transition-all bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read Full Thank You Letter</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* SCENE 2: WAX SEAL LETTER */}
      {activeScene === 2 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
            <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 bg-amber-500/20 text-amber-300 border border-amber-400/40">
              📜 Gratitude Letter from {data.senderName}
            </span>

            {!waxBroken ? (
              <div className="my-8 text-center space-y-4">
                <div
                  onClick={handleBreakWax}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleBreakWax()}
                  className="size-28 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 border-4 border-amber-200 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 transition-all select-none animate-pulse"
                >
                  <span className="text-4xl">💌</span>
                  <span className="text-[9px] font-black uppercase text-slate-950 tracking-widest mt-1">
                    Break Seal
                  </span>
                </div>
                <p className="text-xs text-amber-300 font-bold">
                  Tap the golden wax seal to unroll the message
                </p>
              </div>
            ) : (
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/10 border border-amber-400/30 text-left text-amber-100 font-serif leading-relaxed text-sm sm:text-base space-y-3">
                <div className="flex items-center justify-between border-b border-amber-400/20 pb-2">
                  <span className="text-xs font-sans font-bold text-amber-300">
                    To: {data.recipientName}
                  </span>
                  <span className="text-xs font-sans font-bold text-amber-300">
                    From: {data.senderName}
                  </span>
                </div>
                <TypewriterLetter
                  englishText={data.wishContent?.secretLetter || data.wishContent?.tagline || 'Thank you endlessly for your kindness and help!'}
                  urduText={data.wishContent?.urduGreeting}
                  signatureText={`With Gratitude, ${data.senderName}`}
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => goToScene(3)}
              disabled={!unlockedScenes.includes(3)}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-950 transition-all bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Reply & Warm Wishes</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* SCENE 3: GRATITUDE REPLY */}
      {activeScene === 3 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
            <div className="size-20 rounded-full mx-auto mb-4 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              🙏
            </div>

            <h3 className="text-2xl font-serif font-black text-white mb-2">
              Thank You Truly! 💛
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-6">
              Send a warm reaction back to {data.senderName}.
            </p>

            {/* Reaction Options */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {['🙏', '💛', '🌸', '✨', '💐', '🤝'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleSendReaction(emoji)}
                  className={cn(
                    'size-12 rounded-2xl text-2xl flex items-center justify-center transition-all cursor-pointer border',
                    selectedReaction === emoji
                      ? 'bg-amber-500 text-slate-950 scale-110 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105'
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {loveSent && (
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold mb-4 animate-in zoom-in-95">
                ✨ Gratitude recorded! Tap below to send on WhatsApp:
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <span>Say Thank You on WhatsApp 💬</span>
              </a>

              <Link
                href="/create-magic-link?occasion=thankyou"
                className="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
              >
                Send a Thank You Magic Link to Someone 🪄
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
