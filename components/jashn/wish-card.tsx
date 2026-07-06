'use client'

import { forwardRef, useRef } from 'react'
import { JashnIcon } from '@/lib/jashn/icon'
import { getOccasion } from '@/lib/jashn/occasions'
import { getTheme, getCategoryPatternClass } from '@/lib/jashn/themes'
import type { Language } from '@/lib/jashn/types'
import { CardDecor } from './decor'
import { RelationAvatar, detectRelation } from './relation-avatar'
import { AnimatedBackgroundDecor } from './animated-background-decor'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export interface WishCardData {
  occasionId: string
  themeId: string
  borderId?: string
  bgVariantId?: string
  message: string
  messageUrdu: string
  senderName: string
  recipientName?: string
  relation?: string
  language: Language
}

export const WishCard = forwardRef<HTMLDivElement, {
  data: WishCardData
  watermark?: boolean
  className?: string
}>(function WishCard({ data, watermark = true, className }, ref) {
  const occasion = getOccasion(data.occasionId)
  const theme = getTheme(data.themeId)
  const isIslamic = occasion?.category === 'Islamic'
  const categoryPatternClass = getCategoryPatternClass(occasion?.category)
  const patternClass = occasion?.patternOverlay || categoryPatternClass
  const showEn = data.language !== 'ur'
  const showUr = data.language !== 'en'
  const relationType = detectRelation(data.relation)
  const showAvatar = !!data.relation || !!data.recipientName

  const wrapRef = useRef<HTMLDivElement>(null)

  const recipientLabel = [
    data.relation ? `Dearest ${data.relation}` : null,
    data.recipientName,
  ]
    .filter(Boolean)
    .join(' ')

  const activeVariant = occasion?.bgVariants?.find(v => v.id === data.bgVariantId) || occasion?.bgVariants?.find(v => v.id === 'default')
  // The radial top-glow is layered ABOVE the gradient/image on every variant.
  const radialGlow = `radial-gradient(ellipse 80% 40% at 50% 0%, color-mix(in oklab, var(--c-accent, #f0c060) 20%, transparent), transparent 65%)`
  const backgroundStyle: React.CSSProperties = activeVariant
    ? activeVariant.bgImage
      ? {
          backgroundImage: `${radialGlow}, url(${activeVariant.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          // CSS gradients work on the 'background' shorthand — 'backgroundImage'
          // would strip the second layer if both are strings.
          background: `${radialGlow}, ${activeVariant.bgGradient}`,
        }
    : {}

  // ── 3D tilt on mouse move ──────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const card = wrap.querySelector<HTMLElement>('.wish-card-surface')
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / (r.width / 2)
      const dy = (e.clientY - cy) / (r.height / 2)
      gsap.to(card, {
        rotateY: dx * 10,
        rotateX: -dy * 10,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      })
      // parallax inner layers
      gsap.to(wrap.querySelectorAll('.parallax-far'), {
        x: dx * -8, y: dy * -8, duration: 0.4, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.parallax-mid'), {
        x: dx * -4, y: dy * -4, duration: 0.4, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.parallax-near'), {
        x: dx * 6, y: dy * 6, duration: 0.4, ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.5)',
      })
      gsap.to(wrap.querySelectorAll('.parallax-far, .parallax-mid, .parallax-near'), {
        x: 0, y: 0, duration: 0.5, ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, { scope: wrapRef })

  // ── Avatar float animation ─────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const av = wrap.querySelector('.avatar-float-anim')
    if (!av) return
    gsap.fromTo(av,
      { y: 0 },
      { y: -7, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true }
    )
    gsap.fromTo(av,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.3 }
    )
  }, { scope: wrapRef })

  // ── Content stagger entrance ───────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    gsap.fromTo(
      wrap.querySelectorAll('.wc-stagger'),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
    )
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="card-3d-wrap w-full" style={{ perspective: '1200px' }}>
      {/* ── Parallax glow blob (far layer) ── */}
      <div
        className="parallax-far pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, var(--c-glow, #ffd700) 0%, transparent 70%)` }}
      />

      <div
        ref={ref}
        className={`wish-card-surface jashn-card animate-slow-gradient card-3d-surface card-3d-entrance ${theme.cssClass} mx-auto w-full max-w-md rounded-[2.5rem] px-4 py-8 sm:px-6 sm:py-12 text-center ${className ?? ''}`}
        style={{ transformStyle: 'preserve-3d', ...backgroundStyle }}
      >
        {/* Decor layer (far) */}
        <div className="parallax-far">
          <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId} decorations={occasion?.decorations} />
        </div>

        {/* Background pattern layer */}
        {patternClass && (
          <div className={`card-bg-pattern absolute inset-0 ${patternClass}`} aria-hidden="true" />
        )}

        {/* Texture layers: grain + vignette + silk sheen */}
        <div className="card-texture" aria-hidden="true" />
        <div className="card-vignette" aria-hidden="true" />
        <div className="card-silk" aria-hidden="true" />

        {/* Ambient Animated backgrounds */}
        <AnimatedBackgroundDecor category={occasion?.category} occasionId={data.occasionId} />

        {/* ── Shimmer sweep overlay ── */}
        <div className="card-shimmer-sweep pointer-events-none parallax-mid" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-5 px-2 py-6">

          {/* ── Relation Avatar (floating, 2D illustrated) ── */}
          {showAvatar && (
            <div className="avatar-float-anim relative" style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.35))' }}>
              {/* glow ring behind avatar */}
              <span
                className="parallax-near absolute inset-0 -z-10 rounded-full blur-lg opacity-60"
                style={{ background: 'radial-gradient(circle, var(--c-glow) 0%, transparent 70%)', transform: 'scale(1.4)' }}
              />
              <RelationAvatar relation={data.relation || data.recipientName} size={72} />
            </div>
          )}

          {/* Recipient label */}
          {recipientLabel ? (
            <p
              className="wc-stagger text-sm font-medium uppercase tracking-[0.25em] opacity-80 parallax-near"
              style={{ color: 'var(--c-accent)' }}
            >
              For {recipientLabel}
            </p>
          ) : null}

          {/* Occasion icon */}
          <span
            className="wc-stagger parallax-mid flex items-center justify-center rounded-full border"
            style={{
              width: 56, height: 56,
              borderColor: 'var(--c-accent)',
              color: 'var(--c-accent)',
              background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
              boxShadow: '0 4px 20px color-mix(in oklab, var(--c-accent) 30%, transparent)',
            }}
          >
            {occasion ? <JashnIcon name={occasion.icon} className="size-7" /> : null}
          </span>

          {/* Urdu greeting */}
          {occasion ? (
            <p
              className="wc-stagger font-urdu text-3xl leading-snug parallax-mid"
              style={{ color: 'var(--c-accent)', textShadow: '0 2px 12px color-mix(in oklab, var(--c-accent) 50%, transparent)' }}
            >
              {occasion.urdu}
            </p>
          ) : null}

          {/* Shimmer tagline */}
          <h1 className="wc-stagger shimmer-text text-balance text-2xl font-extrabold tracking-tight sm:text-3xl parallax-near">
            {occasion?.tagline ?? 'Mubarak ho'}
          </h1>

          {/* Divider */}
          <span
            className="wc-stagger my-1 block h-px w-24 parallax-mid"
            style={{ background: 'var(--c-accent)', opacity: 0.6 }}
            aria-hidden="true"
          />

          {/* Messages */}
          {showUr && data.messageUrdu ? (
            <p className="wc-stagger font-urdu text-xl leading-loose">{data.messageUrdu}</p>
          ) : null}
          {showEn && data.message ? (
            <p className="wc-stagger text-pretty text-base leading-relaxed opacity-95">
              {data.message}
            </p>
          ) : null}

          {/* Sender */}
          {data.senderName ? (
            <p className="wc-stagger mt-2 text-sm parallax-near">
              <span className="opacity-70">With love, </span>
              <span className="font-semibold" style={{ color: 'var(--c-accent)' }}>
                {data.senderName}
              </span>
            </p>
          ) : null}
        </div>

        {/* Watermark */}
        {watermark ? (
          <div className="relative z-10 mt-2 border-t pt-4" style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}>
            <p className="font-urdu text-sm opacity-80">بنایا گیا Jashn.app سے — آپ بھی بنائیں مفت</p>
            <p className="text-[11px] uppercase tracking-widest opacity-60">Made with Jashn.app</p>
          </div>
        ) : null}
      </div>
    </div>
  )
})
