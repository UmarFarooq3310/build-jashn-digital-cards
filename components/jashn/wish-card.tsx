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
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'
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

function GamingScorecardHUD({ data, lang, isPublicCard }: { data: WishCardData; lang: string; isPublicCard?: boolean }) {
  const { t } = useLang()
  
  const getBannerTitle = (occId: string) => {
    switch (occId) {
      case 'pubg-winner': return '🍗 WINNER WINNER CHICKEN DINNER! 🍗'
      case 'free-fire-winner': return '🔥 BOOYAH! VICTORY ROYALE 🔥'
      case 'ludo-champion': return '🎲 LUDO SUPREME KING! 🎲'
      case 'number-draw-winner': return '🎰 JACKPOT WINNING NUMBER! 🎰'
      case 'bingo-winner': return '🎯 BINGO GRAND WINNER! 🎯'
      case 'esports-winner': return '🏆 ESPORTS GRAND FINALS MVP 🏆'
      default: return '🏆 VICTORY ROYALE CHAMPION 🏆'
    }
  }

  const getThemeStyles = (occId: string) => {
    switch (occId) {
      case 'pubg-winner':
        return {
          border: 'border-amber-400/80',
          glow: 'bg-amber-500/35',
          bannerGradient: 'from-amber-600 via-yellow-400 to-amber-600',
          titleColor: 'text-amber-300',
          nameGradient: 'from-amber-200 via-yellow-300 to-amber-400',
          accentColor: '#f59e0b',
          tagline: 'PLAYERUNKNOWN BATTLEGROUNDS CHAMPION',
          badge: 'SURVIVOR #1 // SQUAD MVP',
          hudBorder: 'border-amber-400/40 hover:border-amber-400/80',
          hudBg: 'from-amber-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-amber-300',
          statValueColor: 'text-amber-100',
          statGlow: 'rgba(245,158,11,0.6)',
        }
      case 'free-fire-winner':
        return {
          border: 'border-orange-500/80',
          glow: 'bg-orange-500/35',
          bannerGradient: 'from-orange-600 via-amber-400 to-red-600',
          titleColor: 'text-orange-300',
          nameGradient: 'from-orange-200 via-amber-300 to-yellow-400',
          accentColor: '#f97316',
          tagline: 'GARENA FREE FIRE BATTLEGROUNDS',
          badge: 'HEROIC GRANDMASTER // BOOYAH',
          hudBorder: 'border-orange-400/40 hover:border-orange-400/80',
          hudBg: 'from-orange-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-orange-300',
          statValueColor: 'text-orange-100',
          statGlow: 'rgba(249,115,22,0.6)',
        }
      case 'ludo-champion':
        return {
          border: 'border-indigo-400/80',
          glow: 'bg-indigo-500/35',
          bannerGradient: 'from-indigo-600 via-violet-400 to-pink-500',
          titleColor: 'text-indigo-300',
          nameGradient: 'from-indigo-200 via-violet-300 to-pink-300',
          accentColor: '#6366f1',
          tagline: 'LUDO KING ALL-STAR CHAMPIONSHIP',
          badge: 'BOARD CONQUEROR // 6-6-6 STRIKER',
          hudBorder: 'border-indigo-400/40 hover:border-indigo-400/80',
          hudBg: 'from-indigo-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-indigo-300',
          statValueColor: 'text-indigo-100',
          statGlow: 'rgba(99,102,241,0.6)',
        }
      case 'number-draw-winner':
        return {
          border: 'border-emerald-400/80',
          glow: 'bg-emerald-500/35',
          bannerGradient: 'from-emerald-600 via-teal-300 to-emerald-600',
          titleColor: 'text-emerald-300',
          nameGradient: 'from-emerald-200 via-teal-300 to-yellow-200',
          accentColor: '#10b981',
          tagline: 'LUCKY NUMBER GRAND JACKPOT',
          badge: 'GOLDEN TICKET // VIP WINNER',
          hudBorder: 'border-emerald-400/40 hover:border-emerald-400/80',
          hudBg: 'from-emerald-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-emerald-300',
          statValueColor: 'text-emerald-100',
          statGlow: 'rgba(16,185,129,0.6)',
        }
      case 'bingo-winner':
        return {
          border: 'border-fuchsia-400/80',
          glow: 'bg-fuchsia-500/35',
          bannerGradient: 'from-fuchsia-600 via-pink-400 to-purple-600',
          titleColor: 'text-fuchsia-300',
          nameGradient: 'from-fuchsia-200 via-pink-300 to-amber-200',
          accentColor: '#d946ef',
          tagline: 'BINGO NIGHT MASTER WINNER',
          badge: 'FULL HOUSE // BINGO KING',
          hudBorder: 'border-fuchsia-400/40 hover:border-fuchsia-400/80',
          hudBg: 'from-fuchsia-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-fuchsia-300',
          statValueColor: 'text-fuchsia-100',
          statGlow: 'rgba(217,70,239,0.6)',
        }
      case 'esports-winner':
      default:
        return {
          border: 'border-cyan-400/80',
          glow: 'bg-cyan-500/35',
          bannerGradient: 'from-cyan-600 via-sky-300 to-blue-600',
          titleColor: 'text-cyan-300',
          nameGradient: 'from-cyan-200 via-sky-300 to-amber-300',
          accentColor: '#06b6d4',
          tagline: 'ESPORTS TOURNAMENT MVP GRAND FINALS',
          badge: 'CHAMPIONSHIP MVP // APEX LEADER',
          hudBorder: 'border-cyan-400/40 hover:border-cyan-400/80',
          hudBg: 'from-cyan-950/70 via-slate-950/90 to-black/95',
          statColor: 'text-cyan-300',
          statValueColor: 'text-cyan-100',
          statGlow: 'rgba(6,182,212,0.6)',
        }
    }
  }

  const tStyles = getThemeStyles(data.occasionId)
  const bannerTitle = getBannerTitle(data.occasionId)
  const playerName = data.playerName || data.recipientName || '---'
  const kills = data.killCount || '---'
  const rank = data.rank || '1'
  const winningNo = data.winningNumber || ''
  const localizedMsg = data.message ? getLocalizedMessageText(data.message, data.occasionId, lang) : ''
  const senderOrSquad = data.senderName || '---'

  const formattedRank = (() => {
    if (!rank || rank === '---') return '---'
    const trimmed = rank.trim()
    if (/^\d+$/.test(trimmed)) return `#${trimmed}`
    return trimmed
  })()

  const getRankFontSize = (val: string) => {
    if (val.length <= 3) return 'text-2xl sm:text-3xl md:text-4xl'
    if (val.length <= 7) return 'text-lg sm:text-xl md:text-2xl'
    if (val.length <= 14) return 'text-xs sm:text-sm md:text-base font-extrabold'
    return 'text-[11px] sm:text-xs font-bold'
  }

  const getKillsFontSize = (val: string) => {
    if (val.length <= 4) return 'text-2xl sm:text-3xl md:text-4xl'
    if (val.length <= 8) return 'text-lg sm:text-xl md:text-2xl'
    if (val.length <= 14) return 'text-xs sm:text-sm md:text-base font-extrabold'
    return 'text-[11px] sm:text-xs font-bold'
  }

  const getPlayerNameFontSize = (val: string) => {
    if (val.length <= 10) return 'text-2xl sm:text-3xl md:text-4xl'
    if (val.length <= 18) return 'text-xl sm:text-2xl md:text-3xl'
    return 'text-base sm:text-lg md:text-xl'
  }

  return (
    <div className="relative w-full text-white space-y-3.5 py-1 select-none">
      {/* ── Cyber HUD Glow Backlight ── */}
      <div className={cn("pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 size-64 rounded-full blur-3xl opacity-70", tStyles.glow)} />

      {/* ── Top Tournament Banner with Pulsating Neon Border ── */}
      <div className={cn("relative z-10 mx-auto max-w-lg p-0.5 rounded-2xl shadow-2xl bg-gradient-to-r", tStyles.bannerGradient)}>
        <div className="bg-slate-950/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[14px] text-center border border-white/15 relative overflow-hidden">
          {/* Subtle tech crosshair watermark */}
          <div className="absolute top-1 right-2 text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-500 opacity-40">
            [SYS_LIVE_VICTORY]
          </div>
          <span className={cn("text-xs sm:text-sm md:text-base font-black uppercase tracking-wider italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] block", tStyles.titleColor)}>
            {bannerTitle}
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-6 sm:w-10 bg-slate-700" />
            <span className="text-[7.5px] sm:text-[9px] uppercase font-mono font-bold tracking-[0.2em] text-slate-400">
              {tStyles.tagline}
            </span>
            <span className="h-px w-6 sm:w-10 bg-slate-700" />
          </div>
        </div>
      </div>

      {/* ── Player / Avatar Showcase ── */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 pt-1 max-w-full px-2">
        {data.photoUrl ? (
          <div className="relative size-16 sm:size-20 md:size-24 rounded-2xl p-1 bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-600 shadow-2xl">
            <ZoomableImageBadge
              src={data.photoUrl}
              alt={data.recipientName ? `${data.recipientName} Photo` : 'Player Photo'}
              title={data.recipientName ? `${data.recipientName} — Wish Card Photo` : 'Wish Card Photo'}
              className="size-full rounded-[14px] bg-slate-950"
            >
              <img src={data.photoUrl} alt="Player Photo" crossOrigin="anonymous" className="size-full object-cover" />
            </ZoomableImageBadge>
            <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-md bg-amber-500 text-[8px] sm:text-[8.5px] font-black text-slate-950 shadow-md pointer-events-none z-20">
              MVP ⭐
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-[9.5px] sm:text-xs font-black uppercase tracking-widest text-amber-300 shadow-lg shadow-amber-500/10">
            <span className="inline-block size-1.5 sm:size-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{tStyles.badge}</span>
          </div>
        )}

        {/* ── 3D Gamer Tag ── */}
        <h2 className={cn(
          "font-black italic tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] uppercase bg-gradient-to-r px-2 leading-tight break-words max-w-full text-center",
          getPlayerNameFontSize(playerName),
          tStyles.nameGradient
        )}>
          {playerName}
        </h2>
      </div>

      {/* ── High-Tech Esports Scorecard HUD (2-Column Grid) ── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3.5 max-w-md mx-auto pt-1 w-full px-1">
        {/* Scorecard Box 1: Kills / Score */}
        <div className={cn(
          "rounded-2xl border bg-gradient-to-b p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center backdrop-blur-md shadow-xl relative overflow-hidden transition-all min-h-[76px] sm:min-h-[88px]",
          tStyles.hudBorder,
          tStyles.hudBg
        )}>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/30" />
          <span className={cn("text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider block mb-1 font-mono leading-tight", tStyles.statColor)}>
            🔥 COMBAT KILLS
          </span>
          <span
            className={cn("font-black block tracking-tight leading-tight break-words max-w-full px-1", getKillsFontSize(kills), tStyles.statValueColor)}
            style={{ textShadow: `0 0 16px ${tStyles.statGlow}` }}
          >
            {kills}
          </span>
          <div className="w-full flex items-center justify-center gap-1 mt-1 opacity-60">
            <span className="h-0.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <span className="block h-full w-4/5 bg-gradient-to-r from-emerald-500 to-amber-400" />
            </span>
          </div>
        </div>

        {/* Scorecard Box 2: Final Rank */}
        <div className={cn(
          "rounded-2xl border bg-gradient-to-b p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center backdrop-blur-md shadow-xl relative overflow-hidden transition-all min-h-[76px] sm:min-h-[88px]",
          tStyles.hudBorder,
          tStyles.hudBg
        )}>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/30" />
          <span className={cn("text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider block mb-1 font-mono leading-tight", tStyles.statColor)}>
            👑 TOURNAMENT RANK
          </span>
          <span
            className={cn("font-black block tracking-tight leading-tight break-words max-w-full px-1", getRankFontSize(formattedRank), tStyles.statValueColor)}
            style={{ textShadow: `0 0 16px ${tStyles.statGlow}` }}
          >
            {formattedRank}
          </span>
          <div className="w-full flex items-center justify-center gap-1 mt-1 opacity-60">
            <span className="h-0.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <span className="block h-full w-full bg-gradient-to-r from-amber-500 to-yellow-300" />
            </span>
          </div>
        </div>

        {/* Scorecard Box 3: Winning Number (if available) */}
        {winningNo && (
          <div className="col-span-2 rounded-2xl border border-purple-400/60 bg-gradient-to-b from-purple-950/80 to-slate-950/90 p-2.5 sm:p-3 text-center backdrop-blur-md shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400/50" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400/50" />
            <span className="text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-purple-300 block mb-0.5 font-mono">
              🎰 LUCKY NUMBER HIT
            </span>
            <span className="text-lg sm:text-2xl font-black text-purple-100 drop-shadow-[0_2px_12px_rgba(168,85,247,0.7)] block break-words">
              {winningNo}
            </span>
          </div>
        )}
      </div>

      {/* ── Victory Combat Debrief Message ── */}
      {(localizedMsg || !isPublicCard) && (
        <div className="relative z-10 max-w-md mx-auto rounded-2xl border border-white/20 bg-slate-950/85 p-3.5 sm:p-4 text-center backdrop-blur-md shadow-lg relative overflow-hidden">
          <div className="text-[8.5px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1.5 flex items-center justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>MISSION DEBRIEF // VICTORY REPORT</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-medium">
            &ldquo;{localizedMsg || 'Dominated the battleground with elite precision, unmatched tactics, and supreme firepower!'}&rdquo;
          </p>
        </div>
      )}

      {/* ── Footer Squad Signature ── */}
      {(senderOrSquad || !isPublicCard) && (
        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-3 max-w-md mx-auto text-xs text-slate-400 px-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
            <span>🎮</span>
            <span>DEPLOYED BY SQUAD</span>
          </span>
          <span className="font-extrabold text-amber-400 tracking-wide text-xs sm:text-sm drop-shadow-sm">
            {senderOrSquad}
          </span>
        </div>
      )}
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
  const isIslamic =
    occasion?.category === 'Islamic' ||
    (occasion?.category as string) === 'Religious' ||
    [
      'eid-ul-fitr', 'eid-ul-adha', 'ramadan', 'jumma', 'hajj', 'umrah', 'milad',
      'roza-kushai', 'iftaar', 'hajj-dinner', 'eid-party', 'shab-e-barat', 'shab-e-meraj'
    ].includes(data.occasionId)

  const isGamingWinner = [
    'pubg-winner',
    'free-fire-winner',
    'ludo-champion',
    'number-draw-winner',
    'bingo-winner',
    'esports-winner',
  ].includes(data.occasionId)

  const defaultBorderId = isIslamic ? 'mughal-arch' : (isGamingWinner ? 'cyber-hud' : 'mehndi')

  const isPublicCard = !!data.slug
  const categoryPatternClass = getCategoryPatternClass(occasion?.category)
  const patternClass = occasion?.patternOverlay || categoryPatternClass
  const relationType = detectRelation(data.relation)
  const showAvatar = (!isGamingWinner) && (!!data.relation || !!data.recipientName || !isPublicCard)

  const wrapRef = useRef<HTMLDivElement>(null)

  const getLocalizedRelation = (rel?: string) => {
    if (!rel) return ''
    const key = `rel${rel.replace(/\s+/g, '')}`
    return t(key as any) || rel
  }

  const dearestPrefix = t('dearest') || 'Dearest'
  const localizedRelation = getLocalizedRelation(data.relation)

  const recipientLabel = isGamingWinner ? null : (
    (data.relation || data.recipientName)
      ? [
          data.relation ? `${dearestPrefix} ${localizedRelation}` : null,
          data.recipientName,
        ]
          .filter(Boolean)
          .join(' ')
      : (!isPublicCard ? '---' : null)
  )

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
        <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId || defaultBorderId} decorations={occasion?.decorations} />

        {patternClass && (
          <div className={`card-bg-pattern absolute inset-0 ${patternClass}`} aria-hidden="true" />
        )}

        <div className="card-texture" aria-hidden="true" />
        <div className="card-vignette" aria-hidden="true" />
        <div className="card-silk" aria-hidden="true" />

        {/* Premium Royal Mughal Atmospheric Layers */}
        <div className="damask-overlay" aria-hidden="true" />
        <div className="deep-vignette" aria-hidden="true" />
        <div className="silk-sweep" aria-hidden="true" />
        <div className="royal-inner-glow" aria-hidden="true" />

        {/* Warm Golden Bokeh Orbs */}
        <div className="bokeh-layer" aria-hidden="true">
          <div className="bokeh-orb" style={{ width: 50, height: 50, top: '12%', left: '10%', '--bokeh-dur': '10s', '--bokeh-delay': '0.5s', '--bokeh-dx': '10px', '--bokeh-dy': '-15px', '--bokeh-dx2': '-12px', '--bokeh-dy2': '10px', '--bokeh-dx3': '8px', '--bokeh-dy3': '-8px' } as React.CSSProperties} />
          <div className="bokeh-orb" style={{ width: 35, height: 35, top: '45%', right: '15%', '--bokeh-dur': '9s', '--bokeh-delay': '2s', '--bokeh-dx': '-10px', '--bokeh-dy': '12px', '--bokeh-dx2': '8px', '--bokeh-dy2': '-10px', '--bokeh-dx3': '-6px', '--bokeh-dy3': '8px' } as React.CSSProperties} />
          <div className="bokeh-orb" style={{ width: 40, height: 40, bottom: '25%', left: '20%', '--bokeh-dur': '11s', '--bokeh-delay': '3.5s', '--bokeh-dx': '14px', '--bokeh-dy': '-10px', '--bokeh-dx2': '-8px', '--bokeh-dy2': '6px', '--bokeh-dx3': '10px', '--bokeh-dy3': '-12px' } as React.CSSProperties} />
        </div>

        {/* Rising Gold Dust Particles */}
        <div className="gold-dust-layer" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="gold-dust-particle"
              style={{
                left: `${10 + (i * 10)}%`,
                bottom: `${8 + (i % 3) * 20}%`,
                '--dust-dur': `${5.5 + (i % 4) * 1.2}s`,
                '--dust-delay': `${i * 0.8}s`,
                '--dust-dx': `${(i % 2 === 0 ? 1 : -1) * (6 + (i % 5) * 4)}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <AnimatedBackgroundDecor category={occasion?.category} occasionId={data.occasionId} />

        <div className="card-shimmer-sweep pointer-events-none parallax-mid" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl flex-col items-center gap-3 sm:gap-5 px-3 pt-5 pb-3 sm:py-5">
          {/* 🎮 Dedicated Esports Gaming HUD 🎮 */}
          {isGamingWinner ? (
            <GamingScorecardHUD data={data} lang={lang} isPublicCard={isPublicCard} />
          ) : (
            <>
              {recipientLabel ? (
                <p
                  className={cn(
                    "wc-stagger font-semibold opacity-85 parallax-near",
                    (lang === 'ur' || lang === 'ar') ? "font-urdu text-sm tracking-normal" : "text-xs uppercase tracking-[0.2em]"
                  )}
                  style={{ color: 'var(--c-accent)' }}
                >
                  {recipientLabel}
                </p>
              ) : null}

              {/* Sacred Islamic Bismillah Calligraphy Crest */}
              {isIslamic && (
                <div className="flex flex-col items-center justify-center my-1 wc-stagger select-none pointer-events-none max-w-full px-2" aria-hidden="true">
                  <div className="flex items-center justify-center gap-2 mb-1 opacity-90">
                    <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[var(--c-accent)]" />
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--c-accent)' }} className="opacity-95 shrink-0">
                      <path d="M12 2L14.5 7L20 7L16 11L18 16.5L12 13.5L6 16.5L8 11L4 7L9.5 7L12 2Z" />
                    </svg>
                    <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[var(--c-accent)]" />
                  </div>
                  <div
                    className="font-urdu text-base sm:text-lg md:text-xl font-bold tracking-normal leading-relaxed text-center px-4 py-0.5 rounded-full border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/10 shadow-2xs"
                    style={{
                      color: 'var(--c-accent)',
                      textShadow: '0 0 14px color-mix(in oklab, var(--c-accent) 45%, transparent)',
                    }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                </div>
              )}

              {data.photoUrl ? (
                <div className="avatar-float-anim relative my-1" style={{ filter: 'drop-shadow(0 8px 22px rgba(0,0,0,0.4))' }}>
                  <span
                    className="parallax-near absolute inset-0 -z-10 rounded-full blur-xl opacity-75"
                    style={{ background: 'radial-gradient(circle, var(--c-glow, #ffd700) 0%, transparent 75%)', transform: 'scale(1.5)' }}
                  />
                  <ZoomableImageBadge
                    src={data.photoUrl}
                    alt={data.recipientName ? `${data.recipientName} Photo` : 'Uploaded Card Photo'}
                    title={data.recipientName ? `${data.recipientName} — Wish Card Photo` : 'Wish Card Photo'}
                    className="relative size-24 md:size-28 rounded-full border-4 border-[#D4AF37] shadow-2xl bg-black hover:scale-105 transition-transform"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.photoUrl} alt="Uploaded Card Photo" crossOrigin="anonymous" className="size-full object-cover" />
                  </ZoomableImageBadge>
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
                    "wc-stagger shimmer-text gold-foil-emboss text-balance font-extrabold tracking-tight parallax-near",
                    (lang === 'ur' || lang === 'ar') ? "font-urdu text-xl sm:text-2xl md:text-3xl leading-loose py-1" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  )}
                >
                  {t(`occ_${occasion.id.replace(/-/g, '_')}`) || occasion.tagline || occasion.label}
                </h2>
              )}

              <span
                className="wc-stagger block h-px w-20 md:w-28 parallax-mid"
                style={{ background: 'var(--c-accent)', opacity: 0.6 }}
                aria-hidden="true"
              />

              {(data.message || !isPublicCard) ? (() => {
                const localizedMsg = data.message ? getLocalizedMessageText(data.message, data.occasionId, lang) : '---'
                const isRtlScript = (lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(localizedMsg)) && localizedMsg !== '---'
                return (
                  <div
                    className={cn(
                      "wc-stagger w-full px-4 sm:px-6 parallax-near transition-all max-h-60 sm:max-h-80 overflow-y-auto overscroll-contain break-words break-all [overflow-wrap:anywhere] [word-break:break-word]",
                      isRtlScript ? "text-right" : "text-center"
                    )}
                  >
                    <p className={cn(
                      "text-balance transition-all break-words break-all [overflow-wrap:anywhere] [word-break:break-word]",
                      isRtlScript
                        ? "font-urdu text-base sm:text-lg md:text-xl leading-loose text-right"
                        : "text-sm sm:text-base leading-relaxed opacity-95 italic"
                    )}
                    style={{ color: 'var(--c-ink)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    >
                      &ldquo;{localizedMsg}&rdquo;
                    </p>
                  </div>
                )
              })() : null}

              {(data.senderName || !isPublicCard) ? (
                <p className="wc-stagger text-sm sm:text-base parallax-near">
                  <span className="opacity-70">{t('withLove')} </span>
                  <span
                    className={cn(
                      "font-bold",
                      (lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(data.senderName || '')) ? "font-urdu tracking-normal" : "tracking-wide"
                    )}
                    style={{ color: 'var(--c-accent)' }}
                  >
                    {data.senderName || '---'}
                  </span>
                </p>
              ) : null}

              {/* 🎂 Birthday Candle — Elegantly positioned UNDER the name */}
              {data.occasionId === 'birthday' && (
                <div className="anim-candle wc-stagger flex items-center justify-center -mt-1 my-1 pointer-events-none" aria-hidden="true">
                  <svg
                    viewBox="0 0 40 70"
                    width={28}
                    height={50}
                    style={{ willChange: 'transform' }}
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
                </div>
              )}
            </>
          )}
        </div>

        {watermark ? (
          <div className="relative z-10 mt-2 border-t pt-3 md:pt-4" style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}>
            <p
              className={lang === 'ur' ? "font-urdu text-xs md:text-sm opacity-80" : "text-xs font-semibold opacity-80"}
              style={{ color: 'var(--c-ink)' }}
            >
              {t('madeWithCardzy')} — {t('createYoursFree')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
})
