'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Heart,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Lock,
  Unlock,
  MessageCircle,
  Share2,
  ExternalLink,
  Calendar,
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

const PROPOSAL_SCENES = [
  { id: 0, label: 'Ring', icon: '💍' },
  { id: 1, label: 'Memories', icon: '💗' },
  { id: 2, label: 'Letter', icon: '💌' },
  { id: 3, label: 'Answer', icon: '❤️' },
]

const ESCALATING_NO_TEXTS = [
  'No',
  'Are you sure? 🥺',
  'Think again 😏',
  'Wrong button!',
  'Okay… YES 💖',
]

export function ProposalScenario({
  data,
  slug,
  soundEnabled,
  audio,
  triggerConfetti,
  onSendLove,
  loveSent,
}: ScenarioProps) {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const [activeScene, setActiveScene] = useState<number>(0)
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([0])

  // Music state
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false)

  // Scene 1: 3D Velvet Ring Box
  const [boxOpen, setBoxOpen] = useState<boolean>(false)

  // Scene 2: 3-4 Memory Notes
  const defaultMemories = [
    { id: 1, title: 'Your Smile', quote: 'Your smile lights up every single room we enter. ✨' },
    { id: 2, title: 'Late Night Talks', quote: 'Our late-night talks turn simple hours into pure gold. 🌙' },
    { id: 3, title: 'Home in You', quote: 'With you, any place in the whole world feels like home. 💖' },
  ]
  const memories = data.wishContent?.balloons?.length ? data.wishContent.balloons : defaultMemories
  const [revealedMemories, setRevealedMemories] = useState<number[]>([])

  // Scene 3: Typewriter Letter
  const rawLetter = data.wishContent?.secretLetter ||
    "From the very first cup of chai we shared to every quiet evening since, you have made my world softer, kinder, and brighter. I never want to spend a single day without your hand in mine."
  
  const formattedLetter = `Dear ${data.recipientName},\n\n${rawLetter}${
    data.wishContent?.urduGreeting ? `\n\n${data.wishContent.urduGreeting}` : ''
  }\n\n— Forever yours,\n${data.senderName}`

  const [displayedChars, setDisplayedChars] = useState<number>(0)
  const [typewriterComplete, setTypewriterComplete] = useState<boolean>(false)
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Scene 4: Dodging NO & Big YES
  const [hasSaidYes, setHasSaidYes] = useState<boolean>(false)
  const [noIndex, setNoIndex] = useState<number>(0)
  const [noPos, setNoPos] = useState<{ left: number; top: number }>({ left: 30, top: 60 })
  const [selectedReaction, setSelectedReaction] = useState<string>('💖')

  // Floating particles
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

  // Handle continuous synthesized music toggle
  const handleToggleMusic = () => {
    const isNowPlaying = magicAudio.toggleMelody()
    setMusicPlaying(isNowPlaying)
  }

  // Typewriter effect trigger for Scene 3
  useEffect(() => {
    if (activeScene === 2) {
      setDisplayedChars(0)
      setTypewriterComplete(false)
      let currentIdx = 0
      typingTimerRef.current = setInterval(() => {
        currentIdx += 1
        setDisplayedChars(currentIdx)
        if (currentIdx >= formattedLetter.length) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current)
          setTypewriterComplete(true)
          unlockScene(3)
        }
      }, 24)

      return () => {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current)
      }
    }
  }, [activeScene, formattedLetter])

  const unlockScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
  }

  const goToScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
    setActiveScene(sceneIdx)
    try {
      magicAudio.playWhoosh()
    } catch {}
  }

  // 1. Handle Opening 3D Velvet Ring Box
  const handleOpenRingBox = () => {
    if (boxOpen) return
    magicAudio.playWaxCrack()
    setBoxOpen(true)
    unlockScene(1)
    spawnBurst(['💎', '✨', '💖'], 14)

    setTimeout(() => {
      magicAudio.playChime()
      triggerConfetti()
    }, 500)

    // Auto-advance to memories scene
    setTimeout(() => {
      goToScene(1)
    }, 3000)
  }

  // 2. Handle Revealing a Memory Card
  const handleRevealMemory = (id: number, quote: string) => {
    if (revealedMemories.includes(id)) return
    magicAudio.playPop()
    const next = [...revealedMemories, id]
    setRevealedMemories(next)
    spawnBurst(['💗', '✨'], 5)

    if (next.length >= memories.length) {
      magicAudio.playFanfare()
      unlockScene(2)
      // Auto-advance to letter scene
      setTimeout(() => {
        goToScene(2)
      }, 2500)
    }
  }

  // 3. Skip Typewriter to end
  const handleSkipTypewriter = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
    setDisplayedChars(formattedLetter.length)
    setTypewriterComplete(true)
    unlockScene(3)
    magicAudio.playSparkle()
  }

  // 4. Handle Dodging "NO" button
  const handleDodgeNo = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    magicAudio.playWhoosh()

    setNoIndex((prev) => (prev + 1) % ESCALATING_NO_TEXTS.length)
    
    setNoPos({
      left: Math.round(10 + Math.random() * 50),
      top: Math.round(45 + Math.random() * 40),
    })
  }

  // 5. Handle Saying YES!
  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const getWhatsAppUrl = (emoji: string = '💍') => {
    const msg = encodeURIComponent(
      `${data.recipientName} reacted ${emoji} to your Proposal on Cardzy: Said YES! 💍💖🥂\n\nView celebration: ${returnUrl}`
    )
    return rawPhone
      ? `https://wa.me/${rawPhone}?text=${msg}`
      : `https://api.whatsapp.com/send?text=${msg}`
  }
  const whatsAppHref = getWhatsAppUrl(selectedReaction)

  const handleSayYes = async () => {
    setHasSaidYes(true)
    magicAudio.playFanfare()
    triggerConfetti()
    setTimeout(() => triggerConfetti(), 400)
    setTimeout(() => triggerConfetti(), 800)
    spawnBurst(['💖', '💍', '✨', '🎉', '🥂'], 36)
    onSendLove()

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'proposal_answer',
        reaction: '💍 Said YES to Proposal!',
        proposalAnswer: {
          accepted: true,
          choiceText: 'YES! 💖',
          partnerName: data.recipientName,
        },
      })
    } catch {
      // offline fallback
    }

    // Open WhatsApp so user can return view and send reply
    const waUrl = getWhatsAppUrl('💍💖')
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank')
    }
  }

  const handleReaction = async (emoji: string) => {
    setSelectedReaction(emoji)
    spawnBurst([emoji], 12)
    magicAudio.playPop()

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'reaction',
        reaction: `${emoji} Proposal Reaction`,
      })
    } catch {}

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
          '--acc': '#f5c451',
          '--rose': '#ff5c8a',
          '--txt': '#fff3ea',
          '--mut': '#d9b8b0',
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-[#ff5c8a] bg-[#ff5c8a]/20 text-[#f5c451] uppercase mb-1">
          💍 ULTRA ROMANTIC & VIRAL
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          For {data.recipientName}
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#d9b8b0] mb-2.5">
          From {data.senderName}
        </p>

        {/* Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {PROPOSAL_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#2a0613] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#d9b8b0] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 1: THE RING BOX ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white mb-0.5">
              {data.senderName} has something to ask you…
            </h2>
            <p className="text-xs text-[#d9b8b0] mb-1">Tap the velvet box to open it</p>

            <div className="magic-stage">
              <div
                className={cn('magic-box', boxOpen && 'open')}
                onClick={handleOpenRingBox}
                role="button"
                aria-label="Velvet Ring Box"
              >
                <div className="magic-ring" />
                <div className="magic-base" />
                <div className="magic-lid" />
              </div>
            </div>

            {!boxOpen && (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">✨ tap to open ✨</div>
            )}
          </div>
        )}

        {/* ================= SCENE 2: MEMORIES ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white mb-0.5">
              Little things I love about you
            </h2>
            <p className="text-xs text-[#d9b8b0] mb-1">Tap each heart</p>

            <div className="magic-tiles">
              {memories.map((m, idx) => {
                const isRev = revealedMemories.includes(m.id || idx + 1)
                return (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => handleRevealMemory(m.id || idx + 1, m.quote)}
                    className={cn('magic-tile', isRev && 'revealed')}
                  >
                    <div className="text-2xl mb-1">{isRev ? '💖' : '💗'}</div>
                    <small
                      className={cn(
                        'text-[11px] leading-tight block text-[#d9b8b0]',
                        isRev && 'text-white italic'
                      )}
                    >
                      {isRev ? m.quote : m.title || `Moment ${idx + 1}`}
                    </small>
                  </button>
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
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-[#2a0613] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: TYPEWRITER LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
              A Letter From The Heart
            </h2>

            <div className="magic-letter">
              {formattedLetter.slice(0, displayedChars)}
              {!typewriterComplete && (
                <span className="inline-block w-1.5 h-3.5 bg-[#f5c451] ml-0.5 animate-pulse align-middle" />
              )}
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-[10.5px]">
              {!typewriterComplete ? (
                <button
                  type="button"
                  onClick={handleSkipTypewriter}
                  className="text-[#f5c451] hover:underline cursor-pointer"
                >
                  Skip to end ⚡
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDisplayedChars(0)
                    setTypewriterComplete(false)
                    goToScene(2)
                  }}
                  className="text-[#d9b8b0] hover:text-[#f5c451] cursor-pointer"
                >
                  Replay ↺
                </button>
              )}
              <span className="text-[#d9b8b0]">
                {typewriterComplete ? 'Written in the stars' : 'Typing from heart...'}
              </span>
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
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-[#2a0613] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 4: WILL YOU MARRY ME? & DODGING NO ================= */}
        {activeScene === 3 && (
          <div className="animate-in fade-in duration-300">
            {!hasSaidYes ? (
              <>
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

                <div className="font-serif font-bold text-2xl sm:text-3xl text-[#f5c451] mt-2 mb-1">
                  Will you marry me? 💍
                </div>
                <p className="text-xs text-[#d9b8b0] mb-3">Choose wisely… 😏</p>

                <div className="magic-arena">
                  <button
                    type="button"
                    onClick={handleSayYes}
                    className="magic-yes"
                  >
                    YES! 💖
                  </button>

                  <button
                    type="button"
                    onMouseEnter={handleDodgeNo}
                    onPointerEnter={handleDodgeNo}
                    onTouchStart={handleDodgeNo}
                    onClick={handleDodgeNo}
                    style={{
                      left: `${noPos.left}%`,
                      top: `${noPos.top}%`,
                    }}
                    className="magic-no"
                  >
                    {ESCALATING_NO_TEXTS[noIndex]}
                  </button>
                </div>
              </>
            ) : (
              /* ================= FINISH REVEAL CARD ================= */
              <div className="mt-3 pt-3 border-t border-white/15 animate-in fade-in duration-500">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f5c451] mb-2">
                  {data.recipientName} said YES! 💍
                </h2>
                <p className="text-xs text-[#d9b8b0] mb-3">Send a sweet reaction to {data.senderName}:</p>

                {/* Reactions Bar */}
                <div className="flex justify-center items-center gap-2.5 mb-4">
                  {['❤️', '😍', '🎉', '🙏'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className={cn(
                        'size-10 rounded-full border text-xl flex items-center justify-center transition-all cursor-pointer',
                        selectedReaction === emoji
                          ? 'border-[#f5c451] bg-white/20 scale-110 shadow-md'
                          : 'border-white/20 hover:border-[#f5c451] bg-white/5 hover:bg-white/15'
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-2 max-w-xs mx-auto">
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magic-btn w-full block text-center"
                  >
                    Send on WhatsApp 💌
                  </a>

                  <Link
                    href="/create-magic-link?occasion=proposal"
                    className="magic-btn w-full block text-center"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      color: '#fff3ea',
                      boxShadow: 'none',
                    }}
                  >
                    Create your own magic link ✨
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Step Indicator & Date */}
        <div className="flex justify-between items-center text-[11px] text-[#d9b8b0] mt-4 pt-2 border-t border-white/10">
          <span>{activeScene + 1} / 4</span>
          <span>{data.wishContent?.specialDate || ''}</span>
        </div>

      </div>
    </div>
  )
}
