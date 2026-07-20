'use client'

import { forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'
import { JashnIcon } from '@/lib/jashn/icon'
import { getOccasion, getLocalizedMessageText } from '@/lib/jashn/occasions'
import { getTheme, getCategoryPatternClass, isLightVariant } from '@/lib/jashn/themes'
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
  messageUrdu?: string
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
  const { lang, t } = useLang()
  const occasion = getOccasion(data.occasionId)
  const theme = getTheme(data.themeId)
  const isIslamic = occasion?.category === 'Islamic'
  const categoryPatternClass = getCategoryPatternClass(occasion?.category)
  const patternClass = occasion?.patternOverlay || categoryPatternClass
  const showEn = data.language === 'en'
  const showUr = data.language === 'ur'
  const relationType = detectRelation(data.relation)
  const showAvatar = !!data.relation || !!data.recipientName

  const wrapRef = useRef<HTMLDivElement>(null)

  const getLocalizedRelation = (rel?: string) => {
    if (!rel) return ''
    // Map relation string like "Best Friend" to translation key "relBestFriend"
    const key = `rel${rel.replace(/\s+/g, '')}`
    return t(key as any) || rel
  }

  const dearestPrefix = t('dearest') || 'Dearest'
  const localizedRelation = getLocalizedRelation(data.relation)

  const recipientLabel = [
    data.relation ? `${dearestPrefix} ${localizedRelation}` : null,
    data.recipientName,
  ]
    .filter(Boolean)
    .join(' ')

  const activeVariant = occasion?.bgVariants?.find(v => v.id === data.bgVariantId) || occasion?.bgVariants?.find(v => v.id === 'default')
  const isLight = isLightVariant(activeVariant?.id)
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
    const card = wrap.querySelector('.wish-card-surface')
    if (card) {
      gsap.fromTo(card,
        { scale: 0.92, rotateX: 12, opacity: 0, y: 24 },
        { scale: 1, rotateX: 0, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      )
    }
    gsap.fromTo(
      wrap.querySelectorAll('.wc-stagger'),
      { y: 14, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.25 }
    )
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="wish-card-wrapper relative w-full py-1" style={{ perspective: '1000px' }}>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-35 blur-3xl transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, var(--c-glow, #ffd700) 0%, transparent 70%)` }}
      />

      <div
        ref={ref}
        className={`wish-card-surface jashn-card animate-slow-gradient card-3d-surface card-3d-entrance ${theme.cssClass} mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl rounded-3xl px-4 py-5 sm:px-6 sm:py-6 text-center shadow-xl transition-all duration-300 ${isLight ? 'light-bg' : 'dark-bg'} ${className ?? ''}`}
        style={{ transformStyle: 'preserve-3d', ...backgroundStyle }}
      >
        <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId} decorations={occasion?.decorations} />

        {patternClass && (
          <div className={`card-bg-pattern absolute inset-0 ${patternClass}`} aria-hidden="true" />
        )}

        <div className="card-texture" aria-hidden="true" />
        <div className="card-vignette" aria-hidden="true" />
        <div className="card-silk" aria-hidden="true" />

        <AnimatedBackgroundDecor category={occasion?.category} occasionId={data.occasionId} />

        <div className="card-shimmer-sweep pointer-events-none parallax-mid" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-col items-center gap-3 sm:gap-4 px-3 py-3">

          {recipientLabel ? (
            <p
              className="wc-stagger text-xs font-semibold uppercase tracking-[0.2em] opacity-85 parallax-near"
              style={{ color: 'var(--c-accent)' }}
            >
              {recipientLabel}
            </p>
          ) : null}

          {showAvatar && (
            <div className="avatar-float-anim relative" style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.32))' }}>
              <span
                className="parallax-near absolute inset-0 -z-10 rounded-full blur-lg opacity-60"
                style={{ background: 'radial-gradient(circle, var(--c-glow) 0%, transparent 70%)', transform: 'scale(1.4)' }}
              />
              <RelationAvatar relation={data.relation || data.recipientName} size={68} />
            </div>
          )}

          <span
            className="wc-stagger parallax-mid flex items-center justify-center rounded-full border transition-transform duration-300 hover:scale-105"
            style={{
              width: 50, height: 50,
              borderColor: 'var(--c-accent)',
              color: 'var(--c-accent)',
              background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
              boxShadow: '0 4px 18px color-mix(in oklab, var(--c-accent) 30%, transparent)',
            }}
          >
            {occasion ? <JashnIcon name={occasion.icon} className="size-6 md:size-7" /> : null}
          </span>

          {occasion && (
            <h1
              className={cn(
                "wc-stagger shimmer-text text-balance font-extrabold tracking-tight parallax-near",
                (lang === 'ur' || lang === 'ar') ? "font-urdu text-xl sm:text-2xl md:text-3xl leading-loose py-1" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              )}
            >
              {t(`occ_${occasion.id.replace(/-/g, '_')}`) || occasion.tagline || occasion.label}
            </h1>
          )}

          <span
            className="wc-stagger block h-px w-20 md:w-28 parallax-mid"
            style={{ background: 'var(--c-accent)', opacity: 0.6 }}
            aria-hidden="true"
          />

          {data.message ? (() => {
            const localizedMsg = getLocalizedMessageText(data.message, data.occasionId, lang)
            const isRtlScript = lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(localizedMsg)
            return (
              <div
                className="wc-stagger w-full rounded-2xl p-3 sm:p-4 text-center shadow-inner parallax-near transition-all"
                style={{
                  background: 'color-mix(in oklab, var(--c-accent) 8%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--c-accent) 18%, transparent)',
                }}
              >
                <p className={cn(
                  "text-balance transition-all",
                  isRtlScript
                    ? "font-urdu text-base sm:text-lg md:text-xl leading-loose"
                    : "text-sm sm:text-base leading-relaxed opacity-95"
                )}
                style={{ color: 'var(--c-ink)' }}
                >
                  &ldquo;{localizedMsg}&rdquo;
                </p>
              </div>
            )
          })() : null}

          {data.senderName ? (
            <p className="wc-stagger text-sm sm:text-base parallax-near">
              <span className="opacity-70">{t('withLove')} </span>
              <span className="font-bold tracking-wide" style={{ color: 'var(--c-accent)' }}>
                {data.senderName}
              </span>
            </p>
          ) : null}
        </div>

        {watermark ? (
          <div className="relative z-10 mt-2 border-t pt-3 md:pt-4" style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}>
            <p className={lang === 'ur' ? "font-urdu text-xs md:text-sm opacity-80" : "text-xs font-semibold opacity-80"}>
              {t('madeWithCardzy')} — {t('createYoursFree')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
})
