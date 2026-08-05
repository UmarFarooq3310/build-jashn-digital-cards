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
import { CardQrCode } from './qr-code'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export interface WishCardData {
  slug?: string
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
  playerName?: string
  killCount?: string
  rank?: string
  winningNumber?: string
  photoUrl?: string
  audioTrack?: string
}

function GamingScorecardHUD({ data }: { data: WishCardData }) {
  const getBannerTitle = (occId: string) => {
    switch (occId) {
      case 'pubg-winner': return '🍗 WINNER WINNER CHICKEN DINNER! 🍗'
      case 'free-fire-winner': return '🔥 BOOYAH! VICTORY ROYALE 🔥'
      case 'ludo-champion': return '🎲 LUDO CHAMPION OF THE DAY! 🎲'
      case 'number-draw-winner': return '🔢 WINNING NUMBER HIT! 🔢'
      case 'bingo-winner': return '🎯 BINGO GRAND WINNER! 🎯'
      case 'esports-winner': return '🏅 TOURNAMENT CHAMPION! 🏅'
      default: return '🏆 VICTORY ROYALE CHAMPION 🏆'
    }
  }

  const bannerTitle = getBannerTitle(data.occasionId)
  const playerName = data.playerName || data.recipientName || 'PLAYER #1'
  const kills = data.killCount || '15'
  const rank = data.rank || '1'
  const winningNo = data.winningNumber

  return (
    <div className="w-full relative rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-slate-950 via-slate-900 to-black p-4 sm:p-6 shadow-[0_0_40px_rgba(245,158,11,0.25)] text-white overflow-hidden space-y-4 my-2">
      {/* Cyber Corner HUD Tech Accents */}
      <div className="absolute top-2 left-2 size-3 border-t-2 border-l-2 border-amber-400" />
      <div className="absolute top-2 right-2 size-3 border-t-2 border-r-2 border-amber-400" />
      <div className="absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-amber-400" />
      <div className="absolute bottom-2 right-2 size-3 border-b-2 border-r-2 border-amber-400" />

      {/* Glow Backlight */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 size-48 rounded-full bg-amber-500/20 blur-2xl" />

      {/* PUBG Style Metallic Victory Banner Header */}
      <div className="relative z-10 mx-auto max-w-md bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 p-0.5 rounded-xl shadow-lg">
        <div className="bg-slate-950 px-4 py-2 rounded-[10px] text-center">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {bannerTitle}
          </span>
        </div>
      </div>

      {/* Player Gamer Tag Spotlight */}
      <div className="relative z-10 text-center space-y-1 py-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest text-slate-300">
          <span>🎮 GAMER TAG / MVP SQUAD</span>
        </div>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)] uppercase">
          {playerName}
        </h3>
      </div>

      {/* PUBG / Esports Victory Stats - Vertical Stack */}
      <div className="relative z-10 flex flex-col gap-2.5 pt-2 w-full max-w-md mx-auto">
        {/* Stat Box 1: Kills / Score */}
        <div className="flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-3 text-left backdrop-blur-md shadow-md">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            🔥 KILLS / SCORE
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-300 drop-shadow-md">
            {kills}
          </span>
        </div>

        {/* Stat Box 2: Final Rank */}
        <div className="flex items-center justify-between rounded-2xl border border-amber-500/40 bg-amber-950/40 px-5 py-3 text-left backdrop-blur-md shadow-md">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
            👑 FINAL RANK
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-md">
            #{rank}
          </span>
        </div>

        {/* Stat Box 3: Winning # (Only rendered if present) */}
        {winningNo ? (
          <div className="flex items-center justify-between rounded-2xl border border-purple-500/40 bg-purple-950/40 px-5 py-3 text-left backdrop-blur-md shadow-md">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
              🎰 WINNING NUMBER
            </span>
            <span className="text-2xl sm:text-3xl font-black text-purple-300 drop-shadow-md">
              {winningNo}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
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
  const isGamingWinner = [
    'pubg-winner',
    'free-fire-winner',
    'ludo-champion',
    'number-draw-winner',
    'bingo-winner',
    'esports-winner',
  ].includes(data.occasionId)

  const categoryPatternClass = getCategoryPatternClass(occasion?.category)
  const patternClass = occasion?.patternOverlay || categoryPatternClass
  const relationType = detectRelation(data.relation)
  const showAvatar = (!isGamingWinner) && (!!data.relation || !!data.recipientName)

  const wrapRef = useRef<HTMLDivElement>(null)

  const getLocalizedRelation = (rel?: string) => {
    if (!rel) return ''
    const key = `rel${rel.replace(/\s+/g, '')}`
    return t(key as any) || rel
  }

  const dearestPrefix = t('dearest') || 'Dearest'
  const localizedRelation = getLocalizedRelation(data.relation)

  const recipientLabel = isGamingWinner ? null : [
    data.relation ? `${dearestPrefix} ${localizedRelation}` : null,
    data.recipientName,
  ]
    .filter(Boolean)
    .join(' ')

  const activeVariant = occasion?.bgVariants?.find(v => v.id === data.bgVariantId) || occasion?.bgVariants?.find(v => v.id === 'default')
  const isLight = isLightVariant(activeVariant?.id)
  const radialGlow = `radial-gradient(ellipse 80% 40% at 50% 0%, color-mix(in oklab, var(--c-accent, #f0c060) 20%, transparent), transparent 65%)`
  const backgroundStyle: React.CSSProperties = activeVariant
    ? activeVariant.bgImage
      ? {
          backgroundImage: `${radialGlow}, url(${activeVariant.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          background: `${radialGlow}, ${activeVariant.bgGradient}`,
        }
    : {}

  // ── 3D tilt on mouse move ──────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const card = wrap.querySelector<HTMLElement>('.wish-card-surface')
    if (!card) return

    let rect: DOMRect | null = null

    const onEnter = () => {
      rect = card.getBoundingClientRect()
    }

    const onMove = (e: MouseEvent) => {
      if (!rect) rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      gsap.to(card, {
        rotateY: dx * 10,
        rotateX: -dy * 10,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      })
      const far = wrap.querySelectorAll('.parallax-far')
      if (far.length > 0) {
        gsap.to(far, {
          x: dx * -8, y: dy * -8, duration: 0.4, ease: 'power2.out',
        })
      }
      const mid = wrap.querySelectorAll('.parallax-mid')
      if (mid.length > 0) {
        gsap.to(mid, {
          x: dx * -4, y: dy * -4, duration: 0.4, ease: 'power2.out',
        })
      }
      const near = wrap.querySelectorAll('.parallax-near')
      if (near.length > 0) {
        gsap.to(near, {
          x: dx * 6, y: dy * 6, duration: 0.4, ease: 'power2.out',
        })
      }
    }

    const onLeave = () => {
      rect = null
      gsap.to(card, {
        rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out',
      })
      const parallaxEls = wrap.querySelectorAll('.parallax-far, .parallax-mid, .parallax-near')
      if (parallaxEls.length > 0) {
        gsap.to(parallaxEls, {
          x: 0, y: 0, duration: 0.6, ease: 'power2.out',
        })
      }
    }

    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, { scope: wrapRef })

  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const av = wrap.querySelector('.avatar-float-anim')
    if (!av) return
    gsap.fromTo(av,
      { y: 0 },
      { y: -7, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true }
    )
  }, { scope: wrapRef })

  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const card = wrap.querySelector('.wish-card-surface')
    if (card) {
      gsap.fromTo(card,
        { scale: 0.98, y: 8 },
        { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="wish-card-wrapper relative w-full py-1" style={{ perspective: '1000px' }}>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-35 blur-3xl transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, var(--c-glow, #ffd700) 0%, transparent 70%)` }}
      />

      <div
        ref={ref}
        className={`wish-card-surface jashn-card animate-slow-gradient card-3d-surface card-3d-entrance ${theme.cssClass} mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-3xl px-4 py-4 sm:px-6 sm:py-5 lg:py-6 text-center shadow-xl transition-all duration-300 ${isLight ? 'light-bg' : 'dark-bg'} ${className ?? ''}`}
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

        <div className="relative z-10 mx-auto flex w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl flex-col items-center gap-3 sm:gap-5 px-3 py-3">

          {recipientLabel ? (
            <p
              className="wc-stagger text-xs font-semibold uppercase tracking-[0.2em] opacity-85 parallax-near"
              style={{ color: 'var(--c-accent)' }}
            >
              {recipientLabel}
            </p>
          ) : null}

          {data.photoUrl ? (
            <div className="avatar-float-anim relative my-1" style={{ filter: 'drop-shadow(0 8px 22px rgba(0,0,0,0.4))' }}>
              <span
                className="parallax-near absolute inset-0 -z-10 rounded-full blur-xl opacity-75"
                style={{ background: 'radial-gradient(circle, var(--c-glow, #ffd700) 0%, transparent 75%)', transform: 'scale(1.5)' }}
              />
              <div className="relative size-24 md:size-28 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.photoUrl} alt="Uploaded Card Photo" className="size-full object-cover" />
              </div>
            </div>
          ) : showAvatar ? (
            <div className="avatar-float-anim relative" style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.32))' }}>
              <span
                className="parallax-near absolute inset-0 -z-10 rounded-full blur-lg opacity-60"
                style={{ background: 'radial-gradient(circle, var(--c-glow) 0%, transparent 70%)', transform: 'scale(1.4)' }}
              />
              <RelationAvatar relation={data.relation || data.recipientName} size={68} />
            </div>
          ) : null}

          <span
            className="wc-stagger parallax-mid flex items-center justify-center rounded-full border transition-transform duration-300 hover:scale-105"
            style={{
              width: 54, height: 54,
              borderColor: 'var(--c-accent)',
              color: 'var(--c-accent)',
              background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
              boxShadow: '0 4px 18px color-mix(in oklab, var(--c-accent) 30%, transparent)',
            }}
          >
            {occasion ? <JashnIcon name={occasion.icon} className="size-7 md:size-8" /> : null}
          </span>

          {occasion && (
            <h2
              className={cn(
                "wc-stagger shimmer-text text-balance font-extrabold tracking-tight parallax-near",
                (lang === 'ur' || lang === 'ar') ? "font-urdu text-xl sm:text-2xl md:text-3xl leading-loose py-1" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              )}
            >
              {t(`occ_${occasion.id.replace(/-/g, '_')}`) || occasion.tagline || occasion.label}
            </h2>
          )}

          {/* 🎮 GAMING WINNER SCOREBOARD DISPLAY 🎮 */}
          {isGamingWinner ? (
            <GamingScorecardHUD data={data} />
          ) : null}

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
                className={cn(
                  "wc-stagger w-full rounded-2xl p-3 sm:p-4 shadow-inner parallax-near transition-all",
                  isRtlScript ? "text-right" : "text-left"
                )}
                style={{
                  background: 'color-mix(in oklab, var(--c-accent) 8%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--c-accent) 18%, transparent)',
                }}
              >
                <p className={cn(
                  "text-balance transition-all",
                  isRtlScript
                    ? "font-urdu text-base sm:text-lg md:text-xl leading-loose text-right"
                    : "text-sm sm:text-base leading-relaxed opacity-95 text-left"
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
