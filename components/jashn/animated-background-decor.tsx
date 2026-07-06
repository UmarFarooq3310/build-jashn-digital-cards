'use client'

import React from 'react'

interface AnimatedBackgroundDecorProps {
  category?: string
  occasionId?: string
}

export function AnimatedBackgroundDecor({ category, occasionId }: AnimatedBackgroundDecorProps) {
  const cat = category?.toLowerCase().trim() || ''
  const isIslamic = cat === 'islamic' || cat === 'religious'
  const isWedding = cat === 'family' || cat === 'wedding'
  const isFestive = cat === 'personal' || cat === 'social' || cat === 'national'
  const isAchievement = cat === 'achievements' || cat === 'professional'
  const isCondolence = occasionId === 'condolence' || occasionId === 'chelum'

  if (isCondolence) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] z-[1]" aria-hidden="true">

      {/* ── 1. Twinkling Stars (Islamic / Religious) ──────────────────────── */}
      {isIslamic && (
        <div className="absolute inset-0 motion-reduce:hidden">
          {[
            { top: '15%', left: '20%', delay: '0.2s', duration: '2.5s', size: 6 },
            { top: '30%', left: '80%', delay: '0.8s', duration: '3s',   size: 8 },
            { top: '65%', left: '15%', delay: '1.5s', duration: '2.8s', size: 5 },
            { top: '80%', left: '75%', delay: '0.4s', duration: '3.2s', size: 7 },
            { top: '45%', left: '85%', delay: '1.1s', duration: '2.4s', size: 6 },
            { top: '55%', left: '45%', delay: '1.9s', duration: '3.5s', size: 4 },
          ].map((star, i) => (
            <div
              key={`twinkling-star-${i}`}
              className="absolute animate-[pulse_2s_infinite] text-[var(--c-accent)] opacity-40"
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            >
              <svg width={star.size} height={star.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* ── 2. Floating Petals (Wedding / Mehndi / Shaadi / Family) ─────────── */}
      {isWedding && (
        <div className="absolute inset-0 motion-reduce:hidden">
          {[
            { left: '15%', delay: '0.5s', duration: '6s',   size: 10 },
            { left: '38%', delay: '1.8s', duration: '7.5s', size: 8  },
            { left: '60%', delay: '0.1s', duration: '5.5s', size: 12 },
            { left: '82%', delay: '2.5s', duration: '6.8s', size: 9  },
            { left: '27%', delay: '3.2s', duration: '7s',   size: 7  },
            { left: '70%', delay: '1.0s', duration: '6.2s', size: 11 },
          ].map((petal, i) => (
            <span
              key={`floating-petal-${i}`}
              className="petal-spiral pointer-events-none absolute"
              style={{
                left: petal.left,
                width: petal.size,
                height: petal.size * 1.4,
                '--petal-delay': petal.delay,
                '--petal-dur': petal.duration,
                background: 'color-mix(in oklab, var(--c-accent) 65%, transparent)',
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* ── 3. Sparkle Confetti (Personal / Social / National) ─────────────── */}
      {isFestive && (
        <div className="absolute inset-0 motion-reduce:hidden">
          {/* Floating sparkle dots */}
          {[
            { top: '8%',  left: '12%', delay: '0s',    dur: '3.5s', size: 5,  color: 'var(--c-accent)' },
            { top: '18%', left: '78%', delay: '0.6s',  dur: '2.8s', size: 7,  color: 'var(--c-glow)'   },
            { top: '55%', left: '8%',  delay: '1.2s',  dur: '3.2s', size: 4,  color: 'var(--c-accent)' },
            { top: '70%', left: '85%', delay: '0.3s',  dur: '4s',   size: 6,  color: 'var(--c-glow)'   },
            { top: '38%', left: '90%', delay: '1.8s',  dur: '3.8s', size: 5,  color: 'var(--c-accent)' },
            { top: '85%', left: '20%', delay: '0.9s',  dur: '3s',   size: 8,  color: 'var(--c-glow)'   },
          ].map((s, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-[pulse_2s_ease-in-out_infinite] opacity-50"
              style={{
                top: s.top,
                left: s.left,
                color: s.color,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.2L22 11.6l-5.2 5.2L18.4 22 12 18.4 5.6 22l1.6-5.2-5.2-5.2 7.6-2.4L12 2z" />
              </svg>
            </div>
          ))}
          {/* Small confetti pieces */}
          {[
            { top: '5%',  left: '30%', rotate: '20deg',  color: '#f72585', size: '6px 10px', delay: '0.2s' },
            { top: '10%', left: '65%', rotate: '-15deg', color: '#4cc9f0', size: '8px 5px',  delay: '1.1s' },
            { top: '60%', left: '5%',  rotate: '45deg',  color: '#f9c74f', size: '7px 7px',  delay: '0.7s' },
            { top: '75%', left: '92%', rotate: '-30deg', color: '#06d6a0', size: '5px 9px',  delay: '1.5s' },
          ].map((c, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute rounded-sm animate-[bounce_4s_ease-in-out_infinite] opacity-60"
              style={{
                top: c.top,
                left: c.left,
                transform: `rotate(${c.rotate})`,
                background: c.color,
                width: c.size.split(' ')[0],
                height: c.size.split(' ')[1],
                animationDelay: c.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ── 4. Rising Stars (Achievements / Professional) ────────────────── */}
      {isAchievement && (
        <div className="absolute inset-0 motion-reduce:hidden">
          {[
            { bottom: '15%', left: '10%',  delay: '0s',   dur: '4s',   size: 10 },
            { bottom: '25%', left: '80%',  delay: '0.8s', dur: '4.5s', size: 8  },
            { bottom: '40%', left: '45%',  delay: '1.6s', dur: '3.8s', size: 12 },
            { bottom: '10%', left: '55%',  delay: '0.4s', dur: '5s',   size: 7  },
          ].map((s, i) => (
            <div
              key={`achieve-star-${i}`}
              className="absolute animate-[pulse_3s_ease-in-out_infinite] text-[var(--c-accent)] opacity-35"
              style={{
                bottom: s.bottom,
                left: s.left,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          ))}
          {/* Corner badge glow */}
          <div
            className="absolute top-6 right-6 rounded-full opacity-20 animate-[pulse_3s_ease-in-out_infinite]"
            style={{
              width: 48,
              height: 48,
              background: 'radial-gradient(circle, var(--c-accent), transparent 70%)',
            }}
          />
        </div>
      )}

    </div>
  )
}
