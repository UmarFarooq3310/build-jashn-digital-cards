'use client'

import { forwardRef, useRef } from 'react'
import { CalendarDays, Clock, MapPin, Shirt, Star } from 'lucide-react'
import { JashnIcon } from '@/lib/jashn/icon'
import { getInvitationType } from '@/lib/jashn/invitations'
import { getTheme, getCategoryPatternClass, isLightVariant } from '@/lib/jashn/themes'
import { CardDecor } from './decor'
import { Countdown } from './countdown'
import { RelationAvatar } from './relation-avatar'
import { getInvitationTypeTheme } from '@/lib/jashn/invitationThemes'
import { AnimatedBackgroundDecor } from './animated-background-decor'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export interface InvitationCardData {
  typeId: string
  title: string
  hostNames: string
  groom: string
  bride: string
  date: string
  time: string
  venue: string
  city: string
  dressCode: string
  bgVariantId?: string
  notes: string
  themeId: string
  borderId?: string
}

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(`${date}T00:00`)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatTime12h(timeStr: string) {
  if (!timeStr) return ''
  const match = timeStr.match(/^(\d{2}):(\d{2})$/)
  if (!match) return timeStr
  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${ampm}`
}

/**
 * Type-specific ambient animated layers rendered below the card content.
 * Purely decorative, pointer-events-none, z-index 1.
 */
function CardAnimLayers({ typeId }: { typeId: string }) {
  switch (typeId) {
    case 'mehndi':
      return (
        <span aria-hidden="true">
          <span className="orb-float orb-1 pointer-events-none absolute" />
          <span className="orb-float orb-2 pointer-events-none absolute" />
          {[0,1,2,3].map(i => (
            <span key={i} className="petal-spiral pointer-events-none absolute"
              style={{ left: `${15 + i*22}%`, '--petal-delay': `${i*1.1}s`, '--petal-dur': '5s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'dholki':
      return (
        <span aria-hidden="true">
          {['#f72585','#f9c74f','#4cc9f0','#7209b7','#ff9e00','#06d6a0'].map((c,i) => (
            <span key={i} className="confetti-piece pointer-events-none"
              style={{ background: c, left: `${10+i*14}%`, top: '-10px',
                '--cdel': `${i*0.35}s`, '--cd': '2.6s', '--cx': `${(i%2===0?1:-1)*18}px` } as React.CSSProperties} />
          ))}
          {[0,1].map(i => (
            <span key={i} className="light-ray pointer-events-none"
              style={{ left: `${25+i*40}%`, '--ray-delay': `${i*2}s`, '--ray-dur': '5s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'nikkah':
      return (
        <span aria-hidden="true">
          {[0,1,2].map(i => (
            <span key={i} className="shooting-star pointer-events-none"
              style={{ top: `${10+i*20}%`, left: `${5+i*15}%`,
                '--shoot-delay': `${i*1.5}s`, '--shoot-dur': '4s' } as React.CSSProperties} />
          ))}
          {[0,1,2,3].map(i => (
            <span key={i} className="glitter-particle pointer-events-none"
              style={{ left: `${15+i*20}%`, top: `${20+i*15}%`,
                '--glit-delay': `${i*0.6}s`, '--glit-dur': '3s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'barat':
      return (
        <span aria-hidden="true">
          {[0,1,2,3,4,5].map(i => (
            <span key={i} className="glitter-particle pointer-events-none"
              style={{ left: `${10+i*15}%`, top: `${15+i*10}%`,
                '--glit-delay': `${i*0.4}s`, '--glit-dur': '3.5s',
                background: '#ffd700', boxShadow: '0 0 4px 1px #ffd700' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'walima':
      return (
        <span aria-hidden="true">
          <span className="orb-float orb-1 pointer-events-none absolute" />
          <span className="orb-float orb-2 pointer-events-none absolute" />
          {[0,1,2,3,4].map(i => (
            <span key={i} className="bubble pointer-events-none absolute"
              style={{ width: 12+i*4, height: 12+i*4, left: `${12+i*18}%`, bottom: `${8+i*5}%`,
                '--bub-delay': `${i*0.8}s`, '--bub-dur': '5s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'engagement':
      return (
        <span aria-hidden="true">
          {[0,1,2,3].map(i => (
            <span key={i} className="petal-spiral pointer-events-none absolute"
              style={{ left: `${20+i*18}%`, background: 'rgba(244,160,192,0.8)',
                '--petal-delay': `${i*0.9}s`, '--petal-dur': '4.5s' } as React.CSSProperties} />
          ))}
          {[0,1,2].map(i => (
            <span key={i} className="glitter-particle pointer-events-none"
              style={{ left: `${20+i*25}%`, top: `${30+i*15}%`,
                '--glit-delay': `${i*0.5}s`, background: 'rgba(212,175,55,0.9)' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'eid-party':
      return (
        <span aria-hidden="true">
          {[0,1,2].map(i => (
            <span key={i} className="bubble pointer-events-none absolute"
              style={{ width: 14+i*6, height: 14+i*6, left: `${15+i*28}%`, bottom: `${5+i*8}%`,
                '--bub-delay': `${i*1.2}s`, '--bub-dur': '6s' } as React.CSSProperties} />
          ))}
          {[0,1].map(i => (
            <span key={i} className="shooting-star pointer-events-none"
              style={{ top: `${8+i*22}%`, left: `${8+i*20}%`,
                '--shoot-delay': `${i*2}s`, '--shoot-dur': '3.5s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'milad':
      return (
        <span aria-hidden="true">
          {[0,1,2,3].map(i => (
            <span key={i} className="light-ray pointer-events-none"
              style={{ left: `${15+i*22}%`, '--ray-delay': `${i*1.5}s`, '--ray-dur': '7s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'iftaar':
      return (
        <span aria-hidden="true">
          {[0,1].map(i => (
            <span key={i} className="shooting-star pointer-events-none"
              style={{ top: `${5+i*18}%`, left: `${10+i*25}%`,
                '--shoot-delay': `${i*2.5}s`, '--shoot-dur': '4s' } as React.CSSProperties} />
          ))}
          {[0,1,2].map(i => (
            <span key={i} className="bubble pointer-events-none absolute"
              style={{ width: 10+i*4, height: 10+i*4, right: `${10+i*12}%`, bottom: `${10+i*6}%`,
                '--bub-delay': `${i*1.0}s`, '--bub-dur': '5s',
                borderColor: 'rgba(255,193,7,0.4)' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'birthday-party':
      return (
        <span aria-hidden="true">
          {['#ff6b9d','#ffd700','#4cc9f0','#7209b7','#ff9e00','#06d6a0','#f72585','#00b4d8'].map((c,i) => (
            <span key={i} className="confetti-piece pointer-events-none"
              style={{ background: c, left: `${5+i*12}%`, top: '-10px',
                '--cdel': `${i*0.28}s`, '--cd': '2.4s', '--cx': `${(i%2===0?1:-1)*22}px` } as React.CSSProperties} />
          ))}
          {[0,1,2,3,4].map(i => (
            <span key={i} className="glitter-particle pointer-events-none"
              style={{ left: `${12+i*18}%`, top: `${20+i*12}%`,
                '--glit-delay': `${i*0.4}s`, '--glit-dur': '2.5s',
                background: ['#ff6b9d','#ffd700','#4cc9f0','#7209b7','#ff9e00'][i] } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'graduation-party':
      return (
        <span aria-hidden="true">
          {[0,1,2,3].map(i => (
            <span key={i} className="glitter-particle pointer-events-none"
              style={{ left: `${15+i*22}%`, top: `${15+i*18}%`,
                '--glit-delay': `${i*0.5}s`, '--glit-dur': '3s',
                background: '#ffd700', boxShadow: '0 0 5px 2px #ffd70080' } as React.CSSProperties} />
          ))}
          {[0,1].map(i => (
            <span key={i} className="shooting-star pointer-events-none"
              style={{ top: `${8+i*20}%`, left: `${5+i*18}%`,
                '--shoot-delay': `${i*1.8}s`, '--shoot-dur': '3.5s' } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'kids-party':
      return (
        <span aria-hidden="true">
          <span className="blob-bg" aria-hidden="true" />
          {['#ff6b6b','#ffd700','#00e5ff','#ff85c1','#a0ff70','#ffb347'].map((c,i) => (
            <span key={i} className="confetti-piece pointer-events-none"
              style={{ background: c, left: `${8+i*15}%`, top: '-8px',
                '--cdel': `${i*0.3}s`, '--cd': '2.0s', '--cx': `${(i%2===0?1:-1)*15}px` } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'product-launch':
      return (
        <span aria-hidden="true">
          {[0,1,2].map(i => (
            <span key={i} className="swirl-particle pointer-events-none absolute"
              style={{ top: '50%', left: '50%', '--swirl-r': `${30+i*15}px`,
                '--swirl-dur': `${3+i*1.2}s`, animationDelay: `${-i*1.5}s` } as React.CSSProperties} />
          ))}
          {[0,1,2,3].map(i => (
            <span key={i} className="shooting-star pointer-events-none"
              style={{ top: `${5+i*18}%`, left: `${5+i*20}%`,
                '--shoot-delay': `${i*0.8}s`, '--shoot-dur': '2.5s',
                background: i%2===0 ? '#00f5ff' : '#b700ff',
                boxShadow: `0 0 4px 2px ${i%2===0 ? 'rgba(0,245,255,0.6)' : 'rgba(183,0,255,0.6)'}` } as React.CSSProperties} />
          ))}
        </span>
      )
    case 'shop-opening':
      return (
        <span aria-hidden="true">
          <span className="ripple pointer-events-none absolute" style={{ width: 60, height: 60, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <span className="ripple pointer-events-none absolute" style={{ width: 60, height: 60, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '0.7s' }} />
          <span className="ripple pointer-events-none absolute" style={{ width: 60, height: 60, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '1.4s' }} />
        </span>
      )
    default:
      return null
  }
}

/** A single detail row with a tinted pill background */
function DetailPill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-full px-4 py-2 text-sm w-full justify-center"
      style={{
        background: 'color-mix(in oklab, var(--c-accent) 10%, transparent)',
        border: '1px solid color-mix(in oklab, var(--c-accent) 20%, transparent)',
        color: 'var(--c-ink)',
      }}
    >
      <span style={{ color: 'var(--c-accent)', flexShrink: 0 }}>{icon}</span>
      <span className="leading-snug">{children}</span>
    </div>
  )
}

/** Ornamental SVG ribbon divider */
function OrnamentDivider() {
  return (
    <div className="flex items-center gap-2 w-full my-1 ic-stagger inv-parallax-mid" aria-hidden="true">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--c-accent))' }} />
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
        <path d="M11 1 L13 7 L11 13 L9 7 Z" fill="var(--c-accent)" opacity="0.9" />
        <circle cx="1" cy="7" r="1.5" fill="var(--c-accent)" opacity="0.6" />
        <circle cx="21" cy="7" r="1.5" fill="var(--c-accent)" opacity="0.6" />
        <path d="M4 7 Q7.5 4 11 7 Q14.5 10 18 7" stroke="var(--c-accent)" strokeWidth="0.8" fill="none" opacity="0.5" />
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--c-accent), transparent)' }} />
    </div>
  )
}

/** Top ornament crown / star cluster */
function TopOrnament({ hasCouple }: { hasCouple: boolean }) {
  if (hasCouple) {
    return (
      <div className="flex items-center justify-center gap-1 mb-1 ic-stagger" aria-hidden="true">
        <Star className="size-2.5 fill-current opacity-60" style={{ color: 'var(--c-accent)' }} />
        <Star className="size-3.5 fill-current opacity-85" style={{ color: 'var(--c-accent)' }} />
        <Star className="size-2.5 fill-current opacity-60" style={{ color: 'var(--c-accent)' }} />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center gap-1 mb-1 ic-stagger" aria-hidden="true">
      <div className="h-px w-8" style={{ background: 'var(--c-accent)', opacity: 0.5 }} />
      <Star className="size-3 fill-current opacity-75" style={{ color: 'var(--c-accent)' }} />
      <div className="h-px w-8" style={{ background: 'var(--c-accent)', opacity: 0.5 }} />
    </div>
  )
}

export const InvitationCard = forwardRef<HTMLDivElement, {
  data: InvitationCardData
  watermark?: boolean
  showCountdown?: boolean
  className?: string
}>(function InvitationCard({ data, watermark = true, showCountdown = true, className }, ref) {
  const type = getInvitationType(data.typeId)
  const theme = getTheme(data.themeId)
  const typeTheme = getInvitationTypeTheme(data.typeId)
  const isIslamic = type?.category === 'Religious'
  const isCouple = type?.couple && (data.groom || data.bride)
  const categoryPatternClass = getCategoryPatternClass(type?.category)
  const patternClass = type?.patternOverlay || categoryPatternClass

  const activeVariant = type?.bgVariants?.find(v => v.id === data.bgVariantId) || type?.bgVariants?.find(v => v.id === 'default')
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

  const wrapRef = useRef<HTMLDivElement>(null)

  // ── 3D tilt on mouse move ─────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const card = wrap.querySelector<HTMLElement>('.inv-card-surface')
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
      gsap.to(card, {
        rotateY: dx * 8, rotateX: -dy * 8,
        duration: 0.4, ease: 'power2.out', transformPerspective: 1100,
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-far'), {
        x: dx * -6, y: dy * -6, duration: 0.4, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-mid'), {
        x: dx * -2.5, y: dy * -2.5, duration: 0.4, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-near'), {
        x: dx * 4, y: dy * 4, duration: 0.4, ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.5)',
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-far,.inv-parallax-mid,.inv-parallax-near'), {
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

  // ── Avatar float ─────────────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const avatars = wrap.querySelectorAll('.inv-avatar-anim')
    if (!avatars.length) return
    gsap.fromTo(avatars,
      { opacity: 0, scale: 0.65, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.15, delay: 0.3 }
    )
    gsap.to(avatars[0], { y: -6, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true })
    if (avatars[1]) {
      gsap.to(avatars[1], { y: -6, duration: 3.0, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.6 })
    }
  }, { scope: wrapRef })

  // ── Stagger content ───────────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    gsap.fromTo(
      wrap.querySelectorAll('.ic-stagger'),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power2.out', delay: 0.45 }
    )
  }, { scope: wrapRef })

  // ── Type-specific GSAP entrance ───────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const profile = typeTheme?.animProfile
    if (!profile) return
    const card = wrap.querySelector<HTMLElement>('.inv-card-surface')
    if (!card) return
    const tl = gsap.timeline({ delay: 0.1 })

    switch (profile) {
      case 'bloom':
        tl.fromTo(wrap.querySelectorAll('.decor-leaf'),
          { scale: 0, opacity: 0, transformOrigin: 'bottom center' },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' })
        tl.fromTo(wrap.querySelectorAll('.decor-mandala'),
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 0.5, duration: 1, stagger: 0.2, ease: 'back.out(1.4)' }, '-=0.5')
        break
      case 'bounce-beat':
        tl.fromTo(card, { scaleY: 0.85, scaleX: 1.08 }, { scaleY: 1, scaleX: 1, duration: 0.5, ease: 'elastic.out(1.2,0.5)' })
        tl.fromTo(wrap.querySelectorAll('.decor-note'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, '-=0.3')
        break
      case 'shimmer-fade':
        tl.fromTo(card, { opacity: 0, filter: 'brightness(2)' }, { opacity: 1, filter: 'brightness(1)', duration: 1.2, ease: 'power2.inOut' })
        break
      case 'royal-entrance':
        tl.fromTo(card, { scale: 0.72, opacity: 0, rotateX: 14 }, { scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' })
        tl.fromTo(wrap.querySelectorAll('.decor-gold-dust'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.5')
        break
      case 'float-up':
        tl.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' })
        tl.fromTo(wrap.querySelectorAll('.decor-crystal'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, '-=0.4')
        break
      case 'heart-burst':
        tl.fromTo(wrap.querySelectorAll('.decor-heart-particle'), { scale: 0, opacity: 0, transformOrigin: 'center' }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2.5)' })
        break
      case 'lantern-swing':
        tl.fromTo(wrap.querySelectorAll('.decor-lantern,.decor-lantern-warm'), { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'bounce.out' })
        break
      case 'confetti-pop':
        tl.fromTo(wrap.querySelectorAll('.decor-balloon'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(2)' })
        tl.fromTo(wrap.querySelectorAll('.decor-sparkle-pop'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(3)' }, '-=0.3')
        break
      case 'cap-toss':
        tl.fromTo(wrap.querySelectorAll('.decor-star-burst'), { y: 20, opacity: 0, rotation: -90 }, { y: 0, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' })
        break
      case 'leaf-drift':
        tl.fromTo(wrap.querySelectorAll('.decor-fall-leaf'), { y: -30, opacity: 0 }, { y: 0, opacity: 0.8, duration: 0.8, stagger: 0.2, ease: 'power2.out' })
        break
      case 'cloud-drift':
        tl.fromTo(wrap.querySelectorAll('.decor-baby-star,.decor-baby-balloon'), { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' })
        break
      case 'candy-spin':
        tl.fromTo(wrap.querySelectorAll('.decor-candy'), { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' })
        break
      case 'spotlight-sweep':
        tl.fromTo(wrap.querySelectorAll('.decor-spotlight'), { opacity: 0, scale: 0 }, { opacity: 0.7, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' })
        break
      case 'node-connect':
        tl.fromTo(wrap.querySelectorAll('.decor-node'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' })
        tl.fromTo(wrap.querySelectorAll('.decor-line'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' })
        break
      case 'rocket-launch':
        tl.fromTo(wrap.querySelectorAll('.decor-neon-particle,.decor-streak'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' })
        tl.fromTo(card, { filter: 'brightness(1.5) saturate(2)' }, { filter: 'brightness(1) saturate(1)', duration: 0.8, ease: 'power2.out' }, '-=0.2')
        break
      case 'book-open':
        tl.fromTo(card, { rotateY: -25, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 1.0, ease: 'power3.out' })
        tl.fromTo(wrap.querySelectorAll('.decor-edu-spark'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.3')
        break
      case 'sunset-shift':
        tl.fromTo(card, { opacity: 0, filter: 'saturate(0)' }, { opacity: 1, filter: 'saturate(1)', duration: 1.2, ease: 'power2.inOut' })
        break
      case 'mist-fade':
        tl.fromTo(card, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power2.inOut' })
        break
      default: break
    }
  }, { scope: wrapRef, dependencies: [typeTheme?.animProfile] })

  return (
    <div ref={wrapRef} className="card-3d-wrap w-full" style={{ perspective: '1200px' }}>
      {/* Ambient glow blob behind card */}
      <div
        className="inv-parallax-far pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--c-glow,#ffd700) 0%, transparent 70%)' }}
      />

      <div
        ref={ref}
        className={`inv-card-surface jashn-card animate-slow-gradient card-3d-surface card-3d-entrance ${theme.cssClass} ${typeTheme?.typeClass ?? ''} mx-auto w-full max-w-sm rounded-3xl shadow-2xl ${isLight ? 'light-bg' : 'dark-bg'} ${className ?? ''}`}
        style={{ transformStyle: 'preserve-3d', ...backgroundStyle }}
      >
        {/* Decor layer */}
        <div className="inv-parallax-far">
          <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId} typeDecor={typeTheme?.decor} decorations={type?.decorations} />
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
        <AnimatedBackgroundDecor category={type?.category} occasionId={data.typeId} />

        {/* Shimmer sweep */}
        <div className="card-shimmer-sweep pointer-events-none inv-parallax-mid" aria-hidden="true" />

        {/* ── Type-specific animated layers ── */}
        <CardAnimLayers typeId={data.typeId} />

        {/* ── Card body ──────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-6 gap-0">

          {/* Top ornament */}
          <TopOrnament hasCouple={!!isCouple} />

          {/* Type label (Urdu + English) */}
          {type && (
            <div className="ic-stagger inv-parallax-mid flex flex-col items-center gap-0.5 mb-3">
              <p
                className="font-urdu text-xl leading-relaxed"
                style={{ color: 'var(--c-accent)', textShadow: '0 1px 8px color-mix(in oklab,var(--c-accent) 40%,transparent)' }}
              >
                {type.urdu}
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] opacity-60 font-medium">
                {type.label}
              </p>
            </div>
          )}

          {/* ── Couple avatars ── */}
          {isCouple ? (
            <div className="flex items-end justify-center gap-4 mb-4 inv-parallax-near">
              <div className="flex flex-col items-center gap-1.5">
                <div className="inv-avatar-anim" style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.35))' }}>
                  <RelationAvatar relation="bride" size={60} />
                </div>
                {data.bride && (
                  <p className="text-[11px] opacity-70 font-medium tracking-wide">{data.bride}</p>
                )}
              </div>

              {/* Ampersand / heart centre */}
              <div className="flex flex-col items-center pb-5 inv-avatar-anim">
                <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
                  <path
                    d="M18 28 Q5 20 5 11 A7 7 0 0 1 18 9 A7 7 0 0 1 31 11 Q31 20 18 28Z"
                    fill="var(--c-accent)"
                    opacity="0.85"
                  />
                </svg>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="inv-avatar-anim" style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.35))' }}>
                  <RelationAvatar relation="groom" size={60} />
                </div>
                {data.groom && (
                  <p className="text-[11px] opacity-70 font-medium tracking-wide">{data.groom}</p>
                )}
              </div>
            </div>
          ) : (
            /* ── Single event icon ── */
            <div
              className="ic-stagger inv-parallax-mid mb-4 flex items-center justify-center rounded-full"
              style={{
                width: 64, height: 64,
                border: '1.5px solid color-mix(in oklab,var(--c-accent) 50%,transparent)',
                color: 'var(--c-accent)',
                background: 'color-mix(in oklab,var(--c-accent) 10%,transparent)',
                boxShadow: '0 0 0 6px color-mix(in oklab,var(--c-accent) 8%,transparent), 0 6px 24px color-mix(in oklab,var(--c-accent) 25%,transparent)',
              }}
            >
              {type && <JashnIcon name={type.icon} className="size-7" />}
            </div>
          )}

          {/* Couple headline or event title */}
          {isCouple ? (
            <div className="ic-stagger inv-parallax-near text-center mb-1">
              <p className="shimmer-text text-2xl font-bold leading-tight tracking-wide">
                {data.groom || 'Groom'} <span style={{ color: 'var(--c-accent)', opacity: 0.7 }}>&amp;</span> {data.bride || 'Bride'}
              </p>
              {data.hostNames && (
                <p className="mt-1.5 text-xs opacity-65 tracking-wide">
                  {data.hostNames} joyfully invite you
                </p>
              )}
            </div>
          ) : (
            <div className="ic-stagger inv-parallax-near text-center mb-1">
              <h1 className="shimmer-text text-2xl font-bold leading-snug tracking-wide">
                {data.title || data.hostNames || type?.label}
              </h1>
              {data.hostNames && data.title && (
                <p className="mt-1.5 text-xs opacity-65 tracking-wide">Hosted by {data.hostNames}</p>
              )}
            </div>
          )}

          {/* Warm host invite line for couple cards */}
          {isCouple && data.hostNames && false /* already shown above */ && null}

          <OrnamentDivider />

          {/* ── Event details as pills ── */}
          <div className="ic-stagger flex flex-col items-stretch gap-2 w-full mt-1">
            {data.date && (
              <DetailPill icon={<CalendarDays className="size-3.5" />}>
                {formatDate(data.date)}
              </DetailPill>
            )}
            {data.time && (
              <DetailPill icon={<Clock className="size-3.5" />}>
                {formatTime12h(data.time)}
              </DetailPill>
            )}
            {(data.venue || data.city) && (
              <DetailPill icon={<MapPin className="size-3.5" />}>
                {[data.venue, data.city].filter(Boolean).join(' · ')}
              </DetailPill>
            )}
            {data.dressCode && (
              <DetailPill icon={<Shirt className="size-3.5" />}>
                {data.dressCode}
              </DetailPill>
            )}
          </div>

          {/* Personal notes / message */}
          {data.notes && (
            <div
              className="ic-stagger mt-4 w-full rounded-2xl px-4 py-3 text-center"
              style={{
                background: 'color-mix(in oklab,var(--c-accent) 7%,transparent)',
                border: '1px solid color-mix(in oklab,var(--c-accent) 15%,transparent)',
              }}
            >
              <p
                className="text-xs italic leading-relaxed opacity-85"
                style={{ fontStyle: 'italic' }}
              >
                &ldquo;{data.notes}&rdquo;
              </p>
            </div>
          )}

          {/* Countdown */}
          {showCountdown && data.date && (
            <div className="ic-stagger mt-4 w-full">
              <Countdown date={data.date} time={data.time} />
            </div>
          )}
        </div>

        {/* Watermark footer */}
        {watermark && (
          <div
            className="relative z-10 px-6 pb-5 pt-3 flex flex-col items-center gap-0.5"
            style={{ borderTop: '1px solid color-mix(in oklab,var(--c-accent) 18%,transparent)' }}
          >
            <p className="font-urdu text-xs opacity-60">بنایا گیا Jashn.app سے</p>
            <p className="text-[9px] uppercase tracking-widest opacity-40">jashn.app</p>
          </div>
        )}
      </div>
    </div>
  )
})
