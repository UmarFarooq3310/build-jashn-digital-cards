import { Moon, Star } from 'lucide-react'
import type { CardTheme } from '@/lib/jashn/types'

/**
 * Animated decorative layer rendered inside a `.jashn-card`.
 * Picks effects based on the theme's motif. Decorative only.
 */
export function CardDecor({
  theme,
  islamic = false,
  borderId = 'mehndi',
}: {
  theme: CardTheme
  islamic?: boolean
  borderId?: string
}) {
  return (
    <>
      {/* 1. Mehndi Floral Border (Default top & bottom) */}
      {borderId === 'mehndi' && (
        <>
          <span className="mehndi-border top" aria-hidden="true" />
          <span className="mehndi-border bottom" aria-hidden="true" />
        </>
      )}

      {/* 2. Mughal Arch Frame */}
      {borderId === 'mughal-arch' && (
        <span className="absolute inset-4 mughal-arch pointer-events-none rounded-[1.8rem]" aria-hidden="true" />
      )}

      {/* 3. Royal Gold Frame */}
      {borderId === 'royal-gold' && (
        <span 
          className="absolute inset-4 border-2 border-double pointer-events-none rounded-[1.8rem]" 
          style={{ 
            borderColor: 'color-mix(in oklab, var(--c-accent) 75%, transparent)', 
            boxShadow: '0 0 0 1px color-mix(in oklab, var(--c-accent) 40%, transparent), inset 0 0 0 2px color-mix(in oklab, var(--c-accent) 20%, transparent)' 
          }} 
          aria-hidden="true" 
        />
      )}

      {/* 4. Elegant Floral Frame */}
      {borderId === 'floral-frame' && (
        <span 
          className="absolute inset-4 border border-dashed pointer-events-none rounded-[1.8rem]" 
          style={{ 
            borderColor: 'color-mix(in oklab, var(--c-accent) 60%, transparent)', 
            boxShadow: 'inset 0 0 8px color-mix(in oklab, var(--c-accent) 15%, transparent)' 
          }} 
          aria-hidden="true" 
        />
      )}

      {/* Sparkles for premium/sparkle/floral themes */}
      {(theme.motif === 'sparkle' || theme.motif === 'floral' || theme.isPremium) && (
        <SparkleField />
      )}

      {/* Falling petals */}
      {theme.motif === 'petals' && <PetalField />}

      {/* Twinkling stars */}
      {theme.motif === 'stars' && <StarField />}

      {/* Crescent + star for Islamic occasions */}
      {islamic && (
        <div
          className="crescent-float pointer-events-none absolute right-6 top-9 flex items-center gap-1"
          style={{ color: 'var(--c-accent)' }}
          aria-hidden="true"
        >
          <Moon className="size-7 -rotate-12 fill-current" />
          <Star className="size-3 fill-current" />
        </div>
      )}
    </>
  )
}

function SparkleField() {
  const dots = [
    { top: '14%', left: '12%', delay: '0s' },
    { top: '22%', left: '82%', delay: '0.6s' },
    { top: '52%', left: '8%', delay: '1.1s' },
    { top: '70%', left: '88%', delay: '0.3s' },
    { top: '40%', left: '50%', delay: '1.5s' },
    { top: '82%', left: '30%', delay: '0.9s' },
  ]
  return (
    <span aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="sparkle"
          style={{ top: d.top, left: d.left, animationDelay: d.delay }}
        />
      ))}
    </span>
  )
}

function PetalField() {
  const petals = Array.from({ length: 9 })
  return (
    <span aria-hidden="true">
      {petals.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 11 + 5) % 100}%`,
            animationDuration: `${6 + (i % 4)}s`,
            animationDelay: `${(i % 5) * 0.8}s`,
          }}
        />
      ))}
    </span>
  )
}

function StarField() {
  const stars = [
    { top: '10%', left: '20%', size: 14, delay: '0s' },
    { top: '16%', left: '70%', size: 10, delay: '0.7s' },
    { top: '30%', left: '88%', size: 16, delay: '1.2s' },
    { top: '60%', left: '14%', size: 12, delay: '0.4s' },
    { top: '75%', left: '60%', size: 10, delay: '1.6s' },
    { top: '46%', left: '40%', size: 8, delay: '1s' },
  ]
  return (
    <span aria-hidden="true">
      {stars.map((s, i) => (
        <Star
          key={i}
          className="twinkle fill-current"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}
