'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReactionItem {
  id: string
  emoji: string
  labelEn: string
  labelUr: string
  soundFreq: number
}

const REACTIONS: ReactionItem[] = [
  { id: 'love', emoji: '❤️', labelEn: 'Love', labelUr: 'محبت', soundFreq: 659.25 },
  { id: 'dua', emoji: '🤲', labelEn: 'Dua', labelUr: 'دعا', soundFreq: 587.33 },
  { id: 'mubarak', emoji: '🎉', labelEn: 'Mubarak', labelUr: 'مبارک', soundFreq: 783.99 },
  { id: 'congrats', emoji: '💐', labelEn: 'Congrats', labelUr: 'مبارکباد', soundFreq: 880.0 },
  { id: 'cheer', emoji: '👏', labelEn: 'Claps', labelUr: 'شاباش', soundFreq: 523.25 },
  { id: 'joy', emoji: '😂', labelEn: 'Joy', labelUr: 'خوشی', soundFreq: 698.46 },
]

class ReactionAudio {
  private ctx: AudioContext | null = null

  private getContext() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  playPopChime(baseFreq: number) {
    const ctx = this.getContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.18)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.35)
  }
}

const reactionAudio = new ReactionAudio()

interface FloatingParticle {
  id: number
  emoji: string
  x: number
  y: number
  size: number
  rotation: number
  vx: number
  vy: number
  opacity: number
}

export function CardLiveReactions({
  cardSlug,
  cardType,
  isUrdu = false,
  theme = 'dark',
}: {
  cardSlug: string
  cardType: 'wish' | 'invite' | 'magic' | 'vcard'
  isUrdu?: boolean
  theme?: 'dark' | 'light'
}) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [activeParticleList, setActiveParticleList] = useState<FloatingParticle[]>([])
  const [tappedId, setTappedId] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState<string | null>(null)
  const particleIdRef = useRef(0)

  // Load local reaction counts
  useEffect(() => {
    try {
      const storageKey = `cardzy_reactions_${cardType}_${cardSlug}`
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setCounts(JSON.parse(saved))
      }
    } catch {}
  }, [cardSlug, cardType])

  const handleReaction = (reaction: ReactionItem, e: React.MouseEvent<HTMLButtonElement>) => {
    reactionAudio.playPopChime(reaction.soundFreq)
    setTappedId(reaction.id)
    setTimeout(() => setTappedId(null), 400)

    setFeedbackText(
      isUrdu
        ? `${reaction.emoji} ${reaction.labelUr} بھیج دی گئی!`
        : `${reaction.emoji} ${reaction.labelEn} reaction sent!`
    )
    setTimeout(() => setFeedbackText(null), 2400)

    // Update count
    setCounts((prev) => {
      const updated = { ...prev, [reaction.id]: (prev[reaction.id] || 0) + 1 }
      try {
        localStorage.setItem(`cardzy_reactions_${cardType}_${cardSlug}`, JSON.stringify(updated))
      } catch {}
      return updated
    })

    // Sync reaction to Firestore backend
    try {
      fetch('/api/card-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardType,
          slug: cardSlug,
          action: 'reaction',
          channel: reaction.id,
        }),
      }).catch(() => {})
    } catch {}

    // Spawn floating emoji particles
    const rect = e.currentTarget.getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top

    const newParticles: FloatingParticle[] = Array.from({ length: 9 }).map((_, i) => ({
      id: ++particleIdRef.current,
      emoji: reaction.emoji,
      x: startX + (Math.random() * 60 - 30),
      y: startY - (Math.random() * 20),
      size: Math.floor(Math.random() * 12) + 22,
      rotation: Math.random() * 60 - 30,
      vx: (Math.random() - 0.5) * 80,
      vy: -(Math.random() * 120 + 80),
      opacity: 1,
    }))

    setActiveParticleList((prev) => [...prev, ...newParticles])

    // Clean up particles after animation
    setTimeout(() => {
      setActiveParticleList((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
    }, 1600)
  }

  return (
    <div className="w-full max-w-md mx-auto my-3 sm:my-4 select-none px-2">
      {/* Floating Particles Canvas Overlay */}
      {activeParticleList.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
          {activeParticleList.map((p) => (
            <div
              key={p.id}
              className="absolute animate-fade-fly-up"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                fontSize: `${p.size}px`,
                transform: `rotate(${p.rotation}deg)`,
                willChange: 'transform, opacity',
              }}
            >
              {p.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Interactive Reaction Card Dock */}
      <div
        className={cn(
          'w-full p-3 sm:p-4 rounded-3xl backdrop-blur-2xl border shadow-xl transition-all',
          theme === 'light'
            ? 'bg-white/90 border-slate-200/90 shadow-slate-300/40'
            : 'bg-slate-950/85 border-amber-500/25 shadow-2xl shadow-black/60'
        )}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-300">
            <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
            <span>{isUrdu ? 'مبارکباد و ردِعمل بھیجیں' : 'Send a Live Reaction'}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            {isUrdu ? 'ٹیپ کریں ✨' : 'Tap to celebrate ✨'}
          </span>
        </div>

        {/* 6-Column Responsive Grid (Full width on mobile, no horizontal overflow) */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {REACTIONS.map((r) => {
            const count = counts[r.id] || 0
            const isTapped = tappedId === r.id

            return (
              <button
                key={r.id}
                type="button"
                onClick={(e) => handleReaction(r, e)}
                className={cn(
                  'group relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-90 cursor-pointer border min-w-0',
                  isTapped
                    ? 'bg-amber-400/25 border-amber-400 ring-2 ring-amber-400/60 scale-105 shadow-md shadow-amber-500/30'
                    : theme === 'light'
                    ? 'bg-slate-100/90 hover:bg-amber-50 border-slate-200 hover:border-amber-300 shadow-xs'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-400/40 shadow-xs'
                )}
                title={isUrdu ? r.labelUr : r.labelEn}
              >
                {/* Floating Gold Count Badge on Top-Right */}
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black shadow-md border border-amber-300 animate-scale-in">
                    +{count}
                  </span>
                )}

                {/* Big Emoji Icon */}
                <span className="text-2xl sm:text-3xl group-hover:scale-120 transition-transform duration-200 drop-shadow-sm select-none">
                  {r.emoji}
                </span>

                {/* Crisp, Fully Readable Label Below */}
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] font-bold tracking-tight text-center mt-1 leading-tight select-none w-full truncate',
                    theme === 'light' ? 'text-slate-800' : 'text-slate-200 group-hover:text-amber-300',
                    isUrdu && 'font-urdu text-[11px]'
                  )}
                >
                  {isUrdu ? r.labelUr : r.labelEn}
                </span>
              </button>
            )
          })}
        </div>

        {/* Live Confirmation Status */}
        {feedbackText && (
          <div className="mt-2 text-center text-xs font-bold text-amber-300 animate-pulse flex items-center justify-center gap-1.5">
            <Heart className="size-3 text-rose-400 fill-rose-400" />
            <span>{feedbackText}</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeFlyUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(-80px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(1.4) rotate(-20deg);
          }
        }
        .animate-fade-fly-up {
          animation: fadeFlyUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}
