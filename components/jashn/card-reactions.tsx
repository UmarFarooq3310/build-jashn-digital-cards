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

    // Update count
    setCounts((prev) => {
      const updated = { ...prev, [reaction.id]: (prev[reaction.id] || 0) + 1 }
      try {
        localStorage.setItem(`cardzy_reactions_${cardType}_${cardSlug}`, JSON.stringify(updated))
      } catch {}
      return updated
    })

    // Spawn 8-12 floating emoji particles
    const rect = e.currentTarget.getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top

    const newParticles: FloatingParticle[] = Array.from({ length: 9 }).map((_, i) => ({
      id: ++particleIdRef.current,
      emoji: reaction.emoji,
      x: startX + (Math.random() * 60 - 30),
      y: startY - (Math.random() * 20),
      size: Math.floor(Math.random() * 12) + 20, // 20px - 32px
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
    <div className="w-full flex flex-col items-center select-none my-4">
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

      {/* Interactive Reaction Pill Dock */}
      <div
        className={cn(
          'inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full backdrop-blur-xl border shadow-xl transition-all',
          theme === 'light'
            ? 'bg-white/85 border-slate-200 shadow-slate-200/50'
            : 'bg-slate-900/80 border-white/15 shadow-black/40'
        )}
      >
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-400 pl-2 pr-1">
          <Sparkles className="size-3 animate-pulse" />
          <span>React:</span>
        </span>

        {REACTIONS.map((r) => {
          const count = counts[r.id] || 0
          const isTapped = tappedId === r.id

          return (
            <button
              key={r.id}
              type="button"
              onClick={(e) => handleReaction(r, e)}
              className={cn(
                'group relative flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full transition-all duration-150 active:scale-90 cursor-pointer',
                isTapped
                  ? 'bg-amber-400/20 ring-2 ring-amber-400/50 scale-110'
                  : theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              )}
              title={isUrdu ? r.labelUr : r.labelEn}
            >
              <span className="text-base sm:text-lg group-hover:scale-125 transition-transform duration-150">
                {r.emoji}
              </span>
              <span
                className={cn(
                  'text-[10.5px] sm:text-xs font-bold',
                  count > 0 ? 'text-amber-400 font-extrabold' : 'text-slate-300'
                )}
              >
                {count > 0 ? count : (isUrdu ? r.labelUr : r.labelEn)}
              </span>
            </button>
          )
        })}
      </div>

      <p className="text-[10px] text-muted-foreground mt-1.5 font-medium tracking-wide">
        {isUrdu ? 'مبارکباد یا دعا دینے کے لیے ایموجی ٹیپ کریں ✨' : 'Tap any emoji to send instant blessings & celebration ✨'}
      </p>

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
