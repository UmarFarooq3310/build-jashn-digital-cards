'use client'

import { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { getOccasion } from '@/lib/jashn/occasions'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardAnimationPreviewProps {
  occasionId: string
  children: React.ReactNode
  animationKey?: string
  className?: string
  roundedClass?: string
}

// ─── Occasion classifier helpers ─────────────────────────────────────────────

function classifyOccasion(occasionId: string) {
  const id = occasionId.toLowerCase().trim()
  const occasion = getOccasion(id)
  const category = occasion?.category ?? ''

  const isWedding =
    id === 'nikah' || id === 'shaadi' || id === 'anniversary' ||
    category === 'Family'

  // Mehndi has its OWN animation — check before isWedding fallthrough
  const isMehndi = id === 'mehndi'

  const isBirthday = id === 'birthday'

  const isIslamic =
    category === 'Islamic' ||
    id === 'eid-ul-fitr' || id === 'eid-ul-adha' || id === 'ramadan' ||
    id === 'jumma' || id === 'hajj' || id === 'umrah' || id === 'milad'

  const isFriendship =
    id === 'friendship-day' || id === 'thank-you' || id === 'miss-you' ||
    id === 'valentines' || id === 'mothers-day' || id === 'fathers-day' ||
    id === 'get-well-soon' || id === 'good-luck' || id === 'welcome-back' ||
    id === 'farewell' || id === 'new-baby'

  const isNational =
    id === 'independence-day' || id === 'kashmir-day' || id === 'basant' ||
    id === 'new-year' || id === 'graduation' || id === 'new-job' ||
    id === 'promotion' || id === 'congratulations' || id === 'exam-pass' ||
    id === 'business-launch' || id === 'new-home' ||
    category === 'Achievements' || category === 'National'

  // Resolve priority: mehndi before wedding (mehndi IS in Family category)
  if (isMehndi) return 'mehndi'
  if (isBirthday) return 'birthday'
  if (isIslamic) return 'islamic'
  if (isWedding) return 'wedding'
  if (isFriendship) return 'friendship'
  if (isNational) return 'national'
  return 'default'
}

// ─── Overlay element counts ───────────────────────────────────────────────────
// Keep total overlay DOM nodes ≤ 25

const PETAL_COUNT = 6       // wedding
const HENNA_DOT_COUNT = 8   // mehndi
const CONFETTI_COUNT = 20   // birthday
const LANTERN_COUNT = 5     // islamic
const HEART_COUNT = 8       // friendship
const STAR_COUNT = 12       // national
const SPARKLE_COUNT = 6     // default

// ─── Deterministic pseudo-random (seeded) ────────────────────────────────────
// Avoids hydration mismatches; same seed → same positions every render.
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ─── Overlay sub-components (pure render, no animations — GSAP handles those) ─

/** 6 gold/rose teardrop petal SVGs */
function WeddingOverlay() {
  return (
    <>
      {/* Tagline shimmer target — GSAP brightens it */}
      <div
        className="anim-shimmer pointer-events-none absolute inset-0"
        style={{ willChange: 'filter' }}
        aria-hidden="true"
      />

      {/* 6 petals */}
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <svg
          key={i}
          className="anim-petal pointer-events-none absolute"
          viewBox="0 0 20 30"
          width={12}
          height={18}
          style={{
            top: '-20px',
            left: `${10 + seededRand(i * 13) * 80}%`,
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <path
            d="M10 0 C14 6 16 14 10 28 C4 14 6 6 10 0Z"
            fill={i % 2 === 0 ? '#e6b54a' : '#e8998a'}
            opacity="0.85"
          />
        </svg>
      ))}
    </>
  )
}

/** 8 henna dots + warm color-wash overlay */
function MehndiOverlay() {
  // Henna grid positions (8 points in a pattern)
  const dotPositions = [
    { top: '15%', left: '12%' }, { top: '15%', left: '88%' },
    { top: '35%', left: '6%' },  { top: '35%', left: '94%' },
    { top: '60%', left: '10%' }, { top: '60%', left: '90%' },
    { top: '80%', left: '20%' }, { top: '80%', left: '80%' },
  ]

  return (
    <>
      {/* Warm overlay (GSAP fades in/out) */}
      <div
        className="anim-mehndi-wash pointer-events-none absolute inset-0 rounded-[2.5rem]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(251,140,0,0.18) 0%, transparent 70%)',
          willChange: 'opacity',
        }}
        aria-hidden="true"
      />

      {/* 8 henna dot elements */}
      {dotPositions.map((pos, i) => (
        <div
          key={i}
          className="anim-henna-dot pointer-events-none absolute rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            width: 10,
            height: 10,
            background: '#d97706',
            boxShadow: '0 0 6px 2px rgba(217,119,6,0.6)',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

/** Birthday: confetti dots + candle flame SVG */
function BirthdayOverlay() {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']

  return (
    <>
      {/* 20 confetti dots */}
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
        const shapeType = i % 3
        return (
          <div
            key={i}
            className="anim-confetti pointer-events-none absolute"
            style={{
              left: '50%',
              top: '50%',
              width: 8 + (i % 3) * 3,
              height: 8 + (i % 3) * 3,
              background: colors[i % colors.length],
              borderRadius: shapeType === 0 ? '50%' : shapeType === 1 ? '2px' : '0',
              transform: shapeType === 2 ? 'rotate(45deg)' : undefined,
              willChange: 'transform, opacity',
            }}
            aria-hidden="true"
          />
        )
      })}

      {/* Candle + flame SVG */}
      <svg
        className="anim-candle pointer-events-none absolute"
        viewBox="0 0 40 70"
        width={28}
        height={50}
        style={{
          bottom: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        {/* Candle body */}
        <rect x="14" y="30" width="12" height="30" rx="3" fill="#f9a8d4" />
        {/* Wick */}
        <line x1="20" y1="30" x2="20" y2="22" stroke="#6b7280" strokeWidth="1.5" />
        {/* Flame */}
        <path
          className="anim-flame"
          d="M20 4 C16 10 14 16 20 22 C26 16 24 10 20 4Z"
          fill="#f97316"
          style={{
            transformOrigin: '20px 22px',
            willChange: 'transform',
          }}
        />
        {/* Flame inner highlight */}
        <path
          d="M20 10 C18 14 18 18 20 20 C22 18 22 14 20 10Z"
          fill="#fef08a"
          opacity="0.7"
          style={{ transformOrigin: '20px 20px' }}
        />
      </svg>
    </>
  )
}

/** Islamic: crescent + 5 lanterns + light sweep */
function IslamicOverlay() {
  const lanternPositions = [
    { left: '8%', delay: 0 },
    { left: '25%', delay: 0.15 },
    { left: '50%', delay: 0.3 },
    { left: '72%', delay: 0.1 },
    { left: '88%', delay: 0.25 },
  ]

  return (
    <>
      {/* Crescent moon SVG — rises from bottom */}
      <svg
        className="anim-crescent pointer-events-none absolute"
        viewBox="0 0 60 60"
        width={44}
        height={44}
        style={{
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 0 8px rgba(230,196,90,0.7))',
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        {/* Crescent arc: large circle minus smaller offset circle */}
        <path
          d="M30 5 A25 25 0 1 1 30 55 A18 18 0 1 0 30 5Z"
          fill="#e6c45a"
        />
      </svg>

      {/* Light sweep */}
      <div
        className="anim-light-sweep pointer-events-none absolute inset-y-0 w-1/3 skew-x-6"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
          willChange: 'transform',
          left: '-34%',
        }}
        aria-hidden="true"
      />

      {/* 5 lanterns */}
      {lanternPositions.map((pos, i) => (
        <div
          key={i}
          className="anim-lantern pointer-events-none absolute flex flex-col items-center"
          style={{
            left: pos.left,
            top: '-8px',
            transformOrigin: 'top center',
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          {/* String */}
          <div style={{ width: 1, height: 16, background: 'rgba(230,196,90,0.5)' }} />
          {/* Hexagon lantern body */}
          <svg viewBox="0 0 40 50" width={20} height={26}>
            <path
              d="M20 2 L36 12 L36 38 L20 48 L4 38 L4 12Z"
              fill="#e6b54a"
              opacity="0.9"
            />
            <circle cx="20" cy="25" r="8" fill="#fff9c4" opacity="0.6" />
          </svg>
        </div>
      ))}
    </>
  )
}

/** Friendship/love: 8 floating hearts */
function FriendshipOverlay() {
  return (
    <>
      {Array.from({ length: HEART_COUNT }).map((_, i) => (
        <svg
          key={i}
          className="anim-heart pointer-events-none absolute"
          viewBox="0 0 24 24"
          width={14 + (i % 3) * 4}
          height={14 + (i % 3) * 4}
          style={{
            bottom: '-10px',
            left: `${8 + i * 11}%`,
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={i % 2 === 0 ? '#f43f5e' : '#fb7185'}
          />
        </svg>
      ))}
    </>
  )
}

/** National/achievements: star-shaped confetti in green/white */
function NationalOverlay() {
  const starColors = ['#01411C', '#FFFFFF', '#f5d020', '#01411C', '#FFFFFF']

  return (
    <>
      {Array.from({ length: STAR_COUNT }).map((_, i) => (
        <svg
          key={i}
          className="anim-nat-star pointer-events-none absolute"
          viewBox="0 0 24 24"
          width={10 + (i % 3) * 4}
          height={10 + (i % 3) * 4}
          style={{
            left: '50%',
            top: '40%',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={starColors[i % starColors.length]}
          />
        </svg>
      ))}
    </>
  )
}

/** Default: sparkle dots pulse */
function DefaultOverlay() {
  const positions = [
    { top: '12%', left: '10%' },
    { top: '20%', left: '85%' },
    { top: '45%', left: '5%' },
    { top: '55%', left: '92%' },
    { top: '78%', left: '18%' },
    { top: '82%', left: '75%' },
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="anim-sparkle pointer-events-none absolute rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            width: 7,
            height: 7,
            background: 'var(--c-glow, #ffd700)',
            boxShadow: '0 0 8px 3px var(--c-glow, #ffd700)',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CardAnimationPreview({
  occasionId,
  children,
  animationKey,
  className,
  roundedClass,
}: CardAnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const type = useMemo(() => classifyOccasion(occasionId), [occasionId])

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const root = containerRef.current
        if (!root) return

        // ── WEDDING / NIKAH / SHAADI / ANNIVERSARY ──────────────────────────
        if (type === 'wedding') {
          const tl = gsap.timeline()

          const borders = root.querySelectorAll('.mughal-arch, .border-royal-gold, .border-dashed-frame, .border-corners, .border-corner-bottom-left, .border-corner-bottom-right, .border-double-frame, .border-woven, .mehndi-border, .border-diamond-strip')
          if (borders.length > 0) {
            tl.fromTo(borders, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
          }

          const petals = root.querySelectorAll('.anim-petal')
          if (petals.length > 0) {
            tl.fromTo(
              petals,
              { y: 0, x: 0, rotation: 0, opacity: 0 },
              {
                y: 480,
                x: 'random(-40, 40)',
                rotation: 'random(120, 280)',
                opacity: 0.85,
                duration: 2.6,
                ease: 'sine.inOut',
                stagger: 0.3,
              },
              0.3,
            )
          }

          const shimmer = root.querySelectorAll('.anim-shimmer')
          if (shimmer.length > 0) {
            tl.fromTo(
              shimmer,
              { filter: 'brightness(1)' },
              {
                filter: 'brightness(1.35)',
                duration: 1.1,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              },
              1.0,
            )
          }

          return () => tl.kill()
        }

        // ── MEHNDI ──────────────────────────────────────────────────────────
        if (type === 'mehndi') {
          const tl = gsap.timeline()

          const wash = root.querySelectorAll('.anim-mehndi-wash')
          if (wash.length > 0) {
            tl.fromTo(
              wash,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                repeat: -1,
                yoyo: true,
                repeatDelay: 0.4,
              },
              0,
            )
          }

          const dots = root.querySelectorAll('.anim-henna-dot')
          if (dots.length > 0) {
            tl.fromTo(
              dots,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: 'back.out(2)',
                stagger: 0.12,
              },
              0.2,
            )
            tl.to(
              dots,
              {
                scale: 1.35,
                duration: 0.7,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { each: 0.15, repeat: -1 },
              },
              1.5,
            )
          }

          return () => tl.kill()
        }

        // ── BIRTHDAY ─────────────────────────────────────────────────────────
        if (type === 'birthday') {
          const tl = gsap.timeline()

          const confetti = root.querySelectorAll('.anim-confetti')
          if (confetti.length > 0) {
            tl.fromTo(
              confetti,
              { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
              {
                x: 'random(-160, 160)',
                y: 'random(-240, 80)',
                scale: 'random(0.7, 1.5)',
                rotation: 'random(0, 360)',
                opacity: 0,
                duration: 'random(1.1, 2.4)',
                ease: 'power3.out',
                stagger: { each: 0.025 },
              },
              0,
            )
          }

          const candle = root.querySelectorAll('.anim-candle')
          if (candle.length > 0) {
            tl.fromTo(
              candle,
              { y: 30, opacity: 0, scale: 0.7 },
              { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' },
              0.4,
            )
          }

          const flame = root.querySelectorAll('.anim-flame')
          if (flame.length > 0) {
            tl.to(
              flame,
              {
                scaleY: 1.35,
                scaleX: 0.82,
                duration: 0.11,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
              },
              1.0,
            )
          }

          return () => tl.kill()
        }

        // ── ISLAMIC / EID / RAMADAN ──────────────────────────────────────────
        if (type === 'islamic') {
          const tl = gsap.timeline()

          const crescent = root.querySelectorAll('.anim-crescent')
          if (crescent.length > 0) {
            tl.fromTo(
              crescent,
              { y: 60, opacity: 0, filter: 'drop-shadow(0 0 0px rgba(230,196,90,0))' },
              {
                y: 0,
                opacity: 1,
                filter: 'drop-shadow(0 0 12px rgba(230,196,90,0.9))',
                duration: 1.0,
                ease: 'power2.out',
              },
              0,
            )
            tl.to(
              crescent,
              {
                filter: 'drop-shadow(0 0 20px rgba(230,196,90,1))',
                duration: 1.4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              },
              1.1,
            )
          }

          const lanterns = root.querySelectorAll('.anim-lantern')
          if (lanterns.length > 0) {
            tl.fromTo(
              lanterns,
              { rotation: 0, opacity: 0 },
              {
                rotation: -8,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.12,
              },
              0.5,
            )
            tl.to(
              lanterns,
              {
                rotation: 8,
                duration: 2.0,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { each: 0.2, repeat: -1 },
              },
              1.2,
            )
          }

          const sweep = root.querySelectorAll('.anim-light-sweep')
          if (sweep.length > 0) {
            tl.fromTo(
              sweep,
              { x: '-34%' },
              { x: '140%', duration: 1.6, ease: 'power2.inOut' },
              1.0,
            )
          }

          return () => tl.kill()
        }

        // ── FRIENDSHIP / LOVE / THANK-YOU / MISS-YOU ─────────────────────────
        if (type === 'friendship') {
          const tl = gsap.timeline()

          const hearts = root.querySelectorAll('.anim-heart')
          if (hearts.length > 0) {
            tl.fromTo(
              hearts,
              { y: 0, x: 0, opacity: 0, scale: 0 },
              {
                y: -340,
                x: 'random(-50, 50)',
                opacity: 0,
                scale: 'random(0.7, 1.3)',
                duration: 'random(2.2, 3.8)',
                ease: 'power1.out',
                stagger: { each: 0.28, repeat: -1 },
                keyframes: [
                  { opacity: 0, scale: 0.4, y: 0, ease: 'back.out(2)', duration: 0.3 },
                  { opacity: 0.85, scale: 1.0, y: -160, ease: 'power1.out', duration: 1.4 },
                  { opacity: 0, y: -340, ease: 'power2.in', duration: 1.0 },
                ],
              },
              0,
            )
          }

          return () => tl.kill()
        }

        // ── NATIONAL / ACHIEVEMENTS / INDEPENDENCE ───────────────────────────
        if (type === 'national') {
          const tl = gsap.timeline()

          const stars = root.querySelectorAll('.anim-nat-star')
          if (stars.length > 0) {
            tl.fromTo(
              stars,
              { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
              {
                x: 'random(-170, 170)',
                y: 'random(-260, 60)',
                scale: 'random(0.6, 1.6)',
                rotation: 'random(0, 360)',
                opacity: 0,
                duration: 'random(1.0, 2.2)',
                ease: 'back.out(1.4)',
                stagger: { each: 0.04 },
              },
              0,
            )
          }

          return () => tl.kill()
        }

        // ── DEFAULT ──────────────────────────────────────────────────────────
        {
          const tl = gsap.timeline()

          const card = root.querySelectorAll('.jashn-card')
          if (card.length > 0) {
            tl.fromTo(
              card,
              { scale: 0.92, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.85, ease: 'power2.out' },
              0,
            )
          }

          const sparkles = root.querySelectorAll('.anim-sparkle')
          if (sparkles.length > 0) {
            tl.fromTo(
              sparkles,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(2)',
                stagger: 0.18,
              },
              0.3,
            )
            tl.to(
              sparkles,
              {
                scale: 1.4,
                opacity: 0.4,
                duration: 0.9,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { each: 0.22, repeat: -1 },
              },
              1.4,
            )
          }

          return () => tl.kill()
        }
      }, containerRef)

      return () => ctx.revert()
    },
    // Re-run whenever occasionId or the animationKey changes
    { dependencies: [type, animationKey], scope: containerRef },
  )

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* ── Card content ── */}
      {children}

      {/* ── Animation Overlays ── */}
      {type === 'wedding' && <WeddingOverlay />}
      {type === 'mehndi' && <MehndiOverlay />}
      {type === 'birthday' && <BirthdayOverlay />}
      {type === 'islamic' && <IslamicOverlay />}
      {type === 'friendship' && <FriendshipOverlay />}
      {type === 'national' && <NationalOverlay />}
      {type === 'default' && <DefaultOverlay />}
    </div>
  )
}
