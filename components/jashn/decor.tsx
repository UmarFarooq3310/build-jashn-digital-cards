'use client'

import { Moon, Star } from 'lucide-react'
import type { CardTheme } from '@/lib/jashn/types'
import type { InvitationDecorType } from '@/lib/jashn/invitationThemes'
import { CardDecorAccents } from './decor-accents'

// ─── Main CardDecor ────────────────────────────────────────────────────────

/**
 * Animated decorative layer rendered inside a `.jashn-card`.
 * Picks effects based on the theme motif AND the invitation type decor.
 */
export function CardDecor({
  theme,
  islamic = false,
  borderId = 'mehndi',
  typeDecor,
  decorations = [],
}: {
  theme: CardTheme
  islamic?: boolean
  borderId?: string
  typeDecor?: InvitationDecorType
  decorations?: string[]
}) {
  return (
    <>
      <CardDecorAccents keys={decorations} />
      {/* ── Border styles ─────────────────────────────────────────── */}

      {/* 1. Mehndi Floral — top + bottom only (no left/right) */}
      {borderId === 'mehndi' && (
        <>
          <span className="mehndi-border top" aria-hidden="true" />
          <span className="mehndi-border bottom" aria-hidden="true" />
        </>
      )}

      {/* 2. Mughal Arch — full arched frame */}
      {borderId === 'mughal-arch' && (
        <span className="mughal-arch absolute pointer-events-none" aria-hidden="true" />
      )}

      {/* 3. Royal Gold — double-line full frame */}
      {borderId === 'royal-gold' && (
        <span className="border-royal-gold pointer-events-none" aria-hidden="true" />
      )}

      {/* 4. Dashed Frame — clean minimal dashed full frame */}
      {borderId === 'floral-frame' && (
        <span className="border-dashed-frame pointer-events-none" aria-hidden="true" />
      )}

      {/* 5. Corner Brackets — four L-shaped corners */}
      {borderId === 'corners' && (
        <>
          <span className="border-corners pointer-events-none" aria-hidden="true" />
          <span className="border-corner-bottom-left" aria-hidden="true" />
          <span className="border-corner-bottom-right" aria-hidden="true" />
        </>
      )}

      {/* 6. Double Line Frame */}
      {borderId === 'double-frame' && (
        <span className="border-double-frame pointer-events-none" aria-hidden="true" />
      )}

      {/* 7. Diamond Strip — top + bottom */}
      {borderId === 'diamond-strip' && (
        <>
          <span className="border-diamond-strip top" aria-hidden="true" />
          <span className="border-diamond-strip bottom" aria-hidden="true" />
        </>
      )}

      {/* 8. Woven / Lattice */}
      {borderId === 'woven' && (
        <span className="border-woven pointer-events-none" aria-hidden="true" />
      )}

      {/* ── Type-specific decor (highest priority) ─────────────────── */}
      {typeDecor && <TypeDecor type={typeDecor} />}

      {/* ── Generic motif fallbacks (when no typeDecor) ─────────────── */}
      {!typeDecor && (theme.motif === 'sparkle' || theme.motif === 'floral' || theme.isPremium) && (
        <SparkleField />
      )}
      {!typeDecor && theme.motif === 'petals' && <PetalField />}
      {!typeDecor && theme.motif === 'stars' && <StarField />}

      {/* ── Islamic crescent (always shown for Islamic occasions) ───── */}
      {islamic && !typeDecor && (
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

// ─── Type-specific decor dispatcher ───────────────────────────────────────

function TypeDecor({ type }: { type: InvitationDecorType }) {
  switch (type) {
    case 'mehndi-floral':     return <MehndiDecor />
    case 'dholki-music':      return <DholkiDecor />
    case 'nikkah-islamic':    return <NikkahDecor />
    case 'barat-royal':       return <BaratDecor />
    case 'walima-crystal':    return <WalimaDecor />
    case 'engagement-roses':  return <EngagementDecor />
    case 'eid-lanterns':      return <EidDecor />
    case 'milad-light':       return <MiladDecor />
    case 'quran-geometric':   return <QuranDecor />
    case 'iftaar-sunset':     return <IftaarDecor />
    case 'chelum-minimal':    return <ChelumDecor />
    case 'birthday-balloons': return <BirthdayDecor />
    case 'graduation-caps':   return <GraduationDecor />
    case 'family-leaves':     return <FamilyDecor />
    case 'baby-clouds':       return <BabyDecor />
    case 'kids-candy':        return <KidsDecor />
    case 'house-plants':      return <HouseDecor />
    case 'shop-spotlight':    return <ShopDecor />
    case 'office-shapes':     return <OfficeDecor />
    case 'seminar-nodes':     return <SeminarDecor />
    case 'launch-neon':       return <LaunchDecor />
    case 'school-books':      return <SchoolDecor />
    default:                  return null
  }
}

// ─── Wedding Decor Components ──────────────────────────────────────────────

function MehndiDecor() {
  const leaves = [
    { top: '8%',  left: '5%',  rotate: '-20deg', delay: '0s',    size: 20 },
    { top: '15%', left: '88%', rotate: '30deg',  delay: '0.8s',  size: 16 },
    { top: '55%', left: '4%',  rotate: '-10deg', delay: '1.4s',  size: 18 },
    { top: '70%', left: '90%', rotate: '15deg',  delay: '0.4s',  size: 14 },
  ]
  const mandalas = [
    { top: '5%',  left: '5%',  size: 70,  delay: '0s' },
    { top: '5%',  left: '5%',  size: 110, delay: '1s' },
    { top: '75%', right: '5%', size: 80,  delay: '0.5s' },
  ]
  const particles = [
    { top: '20%', left: '20%', delay: '0s'   },
    { top: '35%', left: '75%', delay: '0.7s' },
    { top: '60%', left: '30%', delay: '1.3s' },
    { top: '80%', left: '65%', delay: '0.3s' },
    { top: '45%', left: '50%', delay: '1.8s' },
  ]
  return (
    <span aria-hidden="true">
      {leaves.map((l, i) => (
        <span
          key={`ml-${i}`}
          className="decor-leaf pointer-events-none"
          style={{
            position: 'absolute',
            top: l.top, left: l.left,
            width: l.size, height: l.size * 1.4,
            transform: `rotate(${l.rotate})`,
            animationDelay: l.delay,
          }}
        />
      ))}
      {mandalas.map((m, i) => (
        <span
          key={`mm-${i}`}
          className="decor-mandala pointer-events-none"
          style={{
            position: 'absolute',
            top: m.top,
            left: m.left,
            right: (m as any).right,
            width: m.size,
            height: m.size,
            animationDelay: m.delay,
          }}
        />
      ))}
      {particles.map((p, i) => (
        <span
          key={`mp-${i}`}
          className="decor-bloom-particle pointer-events-none"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}
    </span>
  )
}

function DholkiDecor() {
  const notes = ['♩', '♪', '♫', '♬']
  const positions = [
    { top: '12%', left: '10%', delay: '0s',   scale: 1.2 },
    { top: '20%', left: '80%', delay: '0.5s', scale: 1 },
    { top: '55%', left: '8%',  delay: '1.1s', scale: 0.9 },
    { top: '65%', left: '85%', delay: '0.8s', scale: 1.1 },
  ]
  const confetti = [
    { top: '10%', left: '25%', bg: '#f72585', delay: '0s' },
    { top: '30%', left: '70%', bg: '#f9c74f', delay: '0.4s' },
    { top: '70%', left: '20%', bg: '#4cc9f0', delay: '0.9s' },
    { top: '80%', left: '60%', bg: '#7209b7', delay: '0.6s' },
    { top: '50%', left: '90%', bg: '#f72585', delay: '1.2s' },
  ]
  return (
    <span aria-hidden="true">
      {positions.map((p, i) => (
        <span
          key={`dn-${i}`}
          className="decor-note pointer-events-none"
          style={{
            position: 'absolute',
            top: p.top, left: p.left,
            fontSize: `${16 * p.scale}px`,
            animationDelay: p.delay,
          }}
        >
          {notes[i % notes.length]}
        </span>
      ))}
      {confetti.map((c, i) => (
        <span
          key={`dc-${i}`}
          className="decor-confetti pointer-events-none"
          style={{
            position: 'absolute',
            top: c.top, left: c.left,
            background: c.bg,
            animationDelay: c.delay,
          }}
        />
      ))}
    </span>
  )
}

function NikkahDecor() {
  const particles = [
    { top: '12%', left: '15%', delay: '0s'   },
    { top: '22%', left: '80%', delay: '0.8s' },
    { top: '50%', left: '8%',  delay: '1.5s' },
    { top: '68%', left: '88%', delay: '0.4s' },
    { top: '40%', left: '45%', delay: '1.1s' },
    { top: '82%', left: '30%', delay: '2s'   },
  ]
  return (
    <span aria-hidden="true">
      {/* Islamic crescent + star */}
      <div
        className="crescent-float pointer-events-none absolute right-6 top-8 flex items-center gap-1"
        style={{ color: 'var(--c-accent)' }}
      >
        <Moon className="size-8 -rotate-12 fill-current opacity-70" />
        <Star className="size-3 fill-current" />
      </div>
      {particles.map((p, i) => (
        <span
          key={`np-${i}`}
          className="decor-particle pointer-events-none"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}
    </span>
  )
}

function BaratDecor() {
  const dustParticles = [
    { top: '20%', left: '12%', delay: '0s',   dur: '4s' },
    { top: '35%', left: '82%', delay: '0.6s', dur: '5s' },
    { top: '60%', left: '18%', delay: '1.2s', dur: '4.5s' },
    { top: '75%', left: '75%', delay: '0.3s', dur: '3.8s' },
    { top: '50%', left: '50%', delay: '1.7s', dur: '5.2s' },
    { top: '15%', left: '60%', delay: '0.9s', dur: '4.2s' },
  ]
  return (
    <span aria-hidden="true">
      {dustParticles.map((p, i) => (
        <span
          key={`bd-${i}`}
          className="decor-gold-dust pointer-events-none"
          style={{
            position: 'absolute',
            top: p.top, left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </span>
  )
}

function WalimaDecor() {
  const crystals = [
    { top: '14%', left: '10%', size: 7, delay: '0s'   },
    { top: '22%', left: '85%', size: 5, delay: '0.7s' },
    { top: '48%', left: '6%',  size: 8, delay: '1.3s' },
    { top: '65%', left: '90%', size: 6, delay: '0.4s' },
    { top: '38%', left: '50%', size: 4, delay: '1.8s' },
    { top: '80%', left: '40%', size: 7, delay: '1.0s' },
  ]
  return (
    <span aria-hidden="true">
      {crystals.map((c, i) => (
        <span
          key={`wc-${i}`}
          className="decor-crystal pointer-events-none"
          style={{
            position: 'absolute',
            top: c.top, left: c.left,
            width: c.size, height: c.size,
            animationDelay: c.delay,
          }}
        />
      ))}
    </span>
  )
}

function EngagementDecor() {
  const hearts = [
    { top: '15%', left: '8%',  delay: '0s',   size: 10, color: 'rgba(244,160,192,0.8)' },
    { top: '25%', left: '85%', delay: '0.6s', size: 8,  color: 'rgba(255,133,161,0.7)' },
    { top: '55%', left: '5%',  delay: '1.2s', size: 12, color: 'rgba(244,160,192,0.6)' },
    { top: '70%', left: '88%', delay: '0.3s', size: 9,  color: 'rgba(212,175,55,0.7)' },
    { top: '42%', left: '48%', delay: '1.7s', size: 7,  color: 'rgba(255,133,161,0.8)' },
  ]
  return (
    <span aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={`eh-${i}`}
          className="decor-heart-particle pointer-events-none"
          style={{
            position: 'absolute',
            top: h.top, left: h.left,
            width: h.size, height: h.size,
            background: h.color,
            animationDelay: h.delay,
          }}
        />
      ))}
    </span>
  )
}

// ─── Religious Decor Components ────────────────────────────────────────────

function EidDecor() {
  const lanterns = [
    { top: '6%',  left: '10%', delay: '0s',   size: 14 },
    { top: '4%',  left: '80%', delay: '0.4s', size: 12 },
    { top: '8%',  left: '45%', delay: '0.8s', size: 16 },
  ]
  return (
    <span aria-hidden="true">
      {/* Crescent + star */}
      <div
        className="crescent-float pointer-events-none absolute right-5 top-7 flex items-center gap-1"
        style={{ color: 'var(--c-accent)' }}
      >
        <Moon className="size-9 -rotate-12 fill-current opacity-80" />
        <Star className="size-3.5 fill-current" />
      </div>
      {/* Small extra stars */}
      {[
        { top: '12%', left: '20%', size: 10, delay: '0s' },
        { top: '18%', left: '65%', size: 8,  delay: '0.7s' },
        { top: '30%', left: '8%',  size: 12, delay: '1.2s' },
        { top: '72%', left: '15%', size: 9,  delay: '0.4s' },
        { top: '78%', left: '78%', size: 11, delay: '1.6s' },
      ].map((s, i) => (
        <Star
          key={`es-${i}`}
          className="twinkle fill-current pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            color: 'var(--c-accent)',
            animationDelay: s.delay,
          }}
        />
      ))}
      {lanterns.map((l, i) => (
        <span
          key={`el-${i}`}
          className="decor-lantern pointer-events-none"
          style={{
            position: 'absolute',
            top: l.top, left: l.left,
            width: l.size, height: l.size * 1.6,
            animationDelay: i % 2 === 0 ? '0s' : '0.5s',
          }}
        />
      ))}
    </span>
  )
}

function MiladDecor() {
  const orbs = [
    { top: '10%', left: '10%', size: 40, delay: '0s'   },
    { top: '20%', left: '75%', size: 30, delay: '1s'   },
    { top: '60%', left: '5%',  size: 25, delay: '0.5s' },
    { top: '70%', left: '80%', size: 35, delay: '1.5s' },
  ]
  return (
    <span aria-hidden="true">
      <div
        className="crescent-float pointer-events-none absolute right-5 top-7 flex items-center gap-1"
        style={{ color: 'var(--c-accent)' }}
      >
        <Moon className="size-8 -rotate-12 fill-current opacity-60" />
        <Star className="size-3 fill-current" />
      </div>
      {orbs.map((o, i) => (
        <span
          key={`mo-${i}`}
          className="decor-glow-orb pointer-events-none"
          style={{
            position: 'absolute',
            top: o.top, left: o.left,
            width: o.size, height: o.size,
            animationDelay: o.delay,
          }}
        />
      ))}
    </span>
  )
}

function QuranDecor() {
  const rays = [
    { top: '0%', left: '30%', height: 60, delay: '0s'   },
    { top: '0%', left: '50%', height: 80, delay: '0.8s' },
    { top: '0%', left: '70%', height: 50, delay: '1.5s' },
  ]
  return (
    <span aria-hidden="true">
      {rays.map((r, i) => (
        <span
          key={`qr-${i}`}
          className="decor-ray pointer-events-none"
          style={{
            position: 'absolute',
            top: r.top, left: r.left,
            height: r.height,
            animationDelay: r.delay,
          }}
        />
      ))}
      <div
        className="crescent-float pointer-events-none absolute right-5 top-7"
        style={{ color: 'var(--c-accent)' }}
      >
        <Moon className="size-7 -rotate-12 fill-current opacity-50" />
      </div>
    </span>
  )
}

function IftaarDecor() {
  const lanterns = [
    { top: '4%',  left: '12%', delay: '0s'   },
    { top: '6%',  left: '82%', delay: '0.6s' },
  ]
  return (
    <span aria-hidden="true">
      {lanterns.map((l, i) => (
        <span
          key={`il-${i}`}
          className="decor-lantern-warm pointer-events-none"
          style={{
            position: 'absolute',
            top: l.top, left: l.left,
            animationDelay: l.delay,
          }}
        />
      ))}
      <div
        className="crescent-float pointer-events-none absolute right-5 top-6"
        style={{ color: 'var(--c-accent)' }}
      >
        <Moon className="size-8 -rotate-12 fill-current opacity-70" />
        <Star className="size-3 fill-current" />
      </div>
    </span>
  )
}

function ChelumDecor() {
  const mists = [
    { top: '20%', left: '5%',  size: 80,  delay: '0s'   },
    { top: '50%', left: '70%', size: 100, delay: '2s'   },
    { top: '75%', left: '20%', size: 60,  delay: '4s'   },
  ]
  return (
    <span aria-hidden="true">
      {mists.map((m, i) => (
        <span
          key={`cm-${i}`}
          className="decor-mist pointer-events-none"
          style={{
            position: 'absolute',
            top: m.top, left: m.left,
            width: m.size, height: m.size,
            animationDelay: m.delay,
          }}
        />
      ))}
    </span>
  )
}

// ─── Social Decor Components ───────────────────────────────────────────────

function BirthdayDecor() {
  const balloons = [
    { top: '5%',  left: '8%',  color: '#ff6b9d', delay: '0s',   size: 18 },
    { top: '8%',  left: '82%', color: '#ffd700', delay: '0.5s', size: 16 },
    { top: '20%', left: '92%', color: '#4cc9f0', delay: '1s',   size: 14 },
    { top: '3%',  left: '50%', color: '#7209b7', delay: '0.8s', size: 20 },
  ]
  const sparkles = [
    { top: '30%', left: '15%', color: '#ff6b9d', delay: '0s'   },
    { top: '40%', left: '80%', color: '#ffd700', delay: '0.6s' },
    { top: '65%', left: '10%', color: '#4cc9f0', delay: '1.2s' },
    { top: '75%', left: '85%', color: '#ff6b9d', delay: '0.3s' },
    { top: '55%', left: '50%', color: '#ffd700', delay: '1.7s' },
  ]
  return (
    <span aria-hidden="true">
      {balloons.map((b, i) => (
        <span
          key={`bb-${i}`}
          className="decor-balloon pointer-events-none"
          style={{
            position: 'absolute',
            top: b.top, left: b.left,
            width: b.size, height: b.size * 1.25,
            background: b.color,
            animationDelay: b.delay,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`bs-${i}`}
          className="decor-sparkle-pop pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            background: s.color,
            boxShadow: `0 0 6px 2px ${s.color}`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}

function GraduationDecor() {
  const stars = [
    { top: '10%', left: '12%', delay: '0s'   },
    { top: '18%', left: '78%', delay: '0.5s' },
    { top: '45%', left: '5%',  delay: '1.1s' },
    { top: '60%', left: '88%', delay: '0.7s' },
    { top: '78%', left: '30%', delay: '1.5s' },
    { top: '25%', left: '50%', delay: '0.3s' },
  ]
  return (
    <span aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={`gs-${i}`}
          className="decor-star-burst pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}

function FamilyDecor() {
  const leaves = [
    { delay: '0s',   left: '10%', size: 14, dur: '6s'  },
    { delay: '1s',   left: '30%', size: 12, dur: '7s'  },
    { delay: '2s',   left: '55%', size: 16, dur: '5.5s' },
    { delay: '0.5s', left: '75%', size: 13, dur: '6.5s' },
    { delay: '1.5s', left: '88%', size: 11, dur: '7.5s' },
  ]
  return (
    <span aria-hidden="true">
      {leaves.map((l, i) => (
        <span
          key={`fl-${i}`}
          className="decor-fall-leaf pointer-events-none"
          style={{
            position: 'absolute',
            top: '-5%',
            left: l.left,
            width: l.size, height: l.size,
            animationDelay: l.delay,
            animationDuration: l.dur,
          }}
        />
      ))}
    </span>
  )
}

function BabyDecor() {
  const stars = [
    { top: '8%',  left: '15%', size: 10, delay: '0s'   },
    { top: '12%', left: '70%', size: 8,  delay: '0.7s' },
    { top: '30%', left: '88%', size: 12, delay: '1.2s' },
    { top: '65%', left: '8%',  size: 9,  delay: '0.4s' },
    { top: '80%', left: '60%', size: 11, delay: '1.6s' },
  ]
  const balloons = [
    { top: '4%',  left: '20%', color: '#f4a0c0', delay: '0s',   size: 14 },
    { top: '6%',  left: '75%', color: '#7ab4f5', delay: '0.8s', size: 12 },
    { top: '2%',  left: '48%', color: '#c3b1e1', delay: '1.4s', size: 16 },
  ]
  return (
    <span aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={`bys-${i}`}
          className="decor-baby-star pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
      {balloons.map((b, i) => (
        <span
          key={`byb-${i}`}
          className="decor-baby-balloon pointer-events-none"
          style={{
            position: 'absolute',
            top: b.top, left: b.left,
            width: b.size, height: b.size * 1.3,
            background: b.color,
            animationDelay: b.delay,
          }}
        />
      ))}
    </span>
  )
}

function KidsDecor() {
  const candies = [
    { top: '8%',  left: '10%', color: '#ff6b6b', delay: '0s'   },
    { top: '12%', left: '80%', color: '#ffd700', delay: '0.4s' },
    { top: '50%', left: '5%',  color: '#00e5ff', delay: '0.9s' },
    { top: '60%', left: '88%', color: '#ff85c1', delay: '1.3s' },
    { top: '30%', left: '45%', color: '#a0ff70', delay: '0.7s' },
  ]
  return (
    <span aria-hidden="true">
      {candies.map((c, i) => (
        <span
          key={`kc-${i}`}
          className="decor-candy pointer-events-none"
          style={{
            position: 'absolute',
            top: c.top, left: c.left,
            borderColor: c.color,
            boxShadow: `0 0 6px 2px ${c.color}40`,
            animationDelay: c.delay,
          }}
        />
      ))}
    </span>
  )
}

function HouseDecor() {
  const plants = [
    { bottom: '8%', left: '6%',  height: 30, delay: '0s'   },
    { bottom: '6%', right: '6%', height: 25, delay: '0.5s' },
  ]
  return (
    <span aria-hidden="true">
      {plants.map((p, i) => (
        <span
          key={`hp-${i}`}
          className="decor-plant pointer-events-none"
          style={{
            position: 'absolute',
            bottom: p.bottom,
            left: p.left,
            right: (p as any).right,
            height: p.height,
            animationDelay: p.delay,
          }}
        />
      ))}
    </span>
  )
}

// ─── Professional Decor Components ────────────────────────────────────────

function ShopDecor() {
  const orbs = [
    { top: '5%',  left: '30%', size: 50, delay: '0s'   },
    { top: '5%',  left: '60%', size: 40, delay: '0.8s' },
  ]
  return (
    <span aria-hidden="true">
      {orbs.map((o, i) => (
        <span
          key={`so-${i}`}
          className="decor-spotlight pointer-events-none"
          style={{
            position: 'absolute',
            top: o.top, left: o.left,
            width: o.size, height: o.size,
            animationDelay: o.delay,
          }}
        />
      ))}
    </span>
  )
}

function OfficeDecor() {
  const shapes = [
    { top: '10%', left: '8%',  size: 20, radius: '3px', delay: '0s'   },
    { top: '15%', left: '82%', size: 16, radius: '50%', delay: '0.7s' },
    { top: '55%', left: '5%',  size: 14, radius: '50%', delay: '1.3s' },
    { top: '70%', left: '85%', size: 18, radius: '3px', delay: '0.4s' },
    { top: '40%', left: '48%', size: 12, radius: '50%', delay: '1.8s' },
  ]
  return (
    <span aria-hidden="true">
      {shapes.map((s, i) => (
        <span
          key={`os-${i}`}
          className="decor-shape pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            borderRadius: s.radius,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}

function SeminarDecor() {
  const nodes = [
    { top: '15%', left: '12%', delay: '0s'   },
    { top: '20%', left: '78%', delay: '0.6s' },
    { top: '50%', left: '8%',  delay: '1.1s' },
    { top: '65%', left: '85%', delay: '0.3s' },
    { top: '38%', left: '48%', delay: '1.5s' },
    { top: '78%', left: '35%', delay: '0.9s' },
  ]
  const lines = [
    { top: '18%', left: '15%', width: '60%', delay: '0s'   },
    { top: '53%', left: '10%', width: '40%', delay: '0.8s' },
  ]
  return (
    <span aria-hidden="true">
      {nodes.map((n, i) => (
        <span
          key={`sn-${i}`}
          className="decor-node pointer-events-none"
          style={{
            position: 'absolute',
            top: n.top, left: n.left,
            animationDelay: n.delay,
          }}
        />
      ))}
      {lines.map((l, i) => (
        <span
          key={`sl-${i}`}
          className="decor-line pointer-events-none"
          style={{
            position: 'absolute',
            top: l.top, left: l.left,
            width: l.width,
            animationDelay: l.delay,
          }}
        />
      ))}
    </span>
  )
}

function LaunchDecor() {
  const particles = [
    { top: '80%', left: '10%', delay: '0s',   drift: '8px',  travel: '90px', dur: '3s' },
    { top: '75%', left: '30%', delay: '0.5s', drift: '-5px', travel: '70px', dur: '2.5s' },
    { top: '85%', left: '55%', delay: '1s',   drift: '10px', travel: '100px', dur: '3.5s' },
    { top: '70%', left: '75%', delay: '0.3s', drift: '-8px', travel: '80px', dur: '2.8s' },
    { top: '90%', left: '88%', delay: '1.5s', drift: '6px',  travel: '60px', dur: '2.2s' },
  ]
  const streaks = [
    { top: '0%', left: '20%', height: 40, delay: '0s'   },
    { top: '0%', left: '50%', height: 60, delay: '0.7s' },
    { top: '0%', left: '75%', height: 35, delay: '1.4s' },
  ]
  return (
    <span aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={`lp-${i}`}
          className="decor-neon-particle pointer-events-none"
          style={{
            position: 'absolute',
            top: p.top, left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
            '--drift': p.drift,
            '--travel': p.travel,
          } as React.CSSProperties}
        />
      ))}
      {streaks.map((s, i) => (
        <span
          key={`ls-${i}`}
          className="decor-streak pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            height: s.height,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}

function SchoolDecor() {
  const sparks = [
    { top: '12%', left: '10%', delay: '0s'   },
    { top: '18%', left: '82%', delay: '0.5s' },
    { top: '45%', left: '6%',  delay: '1.1s' },
    { top: '65%', left: '88%', delay: '0.7s' },
    { top: '78%', left: '40%', delay: '1.5s' },
  ]
  return (
    <span aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={`sch-${i}`}
          className="decor-edu-spark pointer-events-none"
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            animationDelay: s.delay,
          }}
        />
      ))}
    </span>
  )
}

// ─── Generic fallback fields (used when no typeDecor) ─────────────────────

function SparkleField() {
  const dots = [
    { top: '14%', left: '12%', delay: '0s'   },
    { top: '22%', left: '82%', delay: '0.6s' },
    { top: '52%', left: '8%',  delay: '1.1s' },
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
    { top: '10%', left: '20%', size: 14, delay: '0s'   },
    { top: '16%', left: '70%', size: 10, delay: '0.7s' },
    { top: '30%', left: '88%', size: 16, delay: '1.2s' },
    { top: '60%', left: '14%', size: 12, delay: '0.4s' },
    { top: '75%', left: '60%', size: 10, delay: '1.6s' },
    { top: '46%', left: '40%', size: 8,  delay: '1s'   },
  ]
  return (
    <span aria-hidden="true">
      {stars.map((s, i) => (
        <Star
          key={i}
          className="twinkle fill-current"
          style={{
            position: 'absolute',
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
