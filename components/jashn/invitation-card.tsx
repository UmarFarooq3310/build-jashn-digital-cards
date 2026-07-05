'use client'

import { forwardRef, useRef } from 'react'
import { CalendarDays, Clock, MapPin, Shirt } from 'lucide-react'
import { JashnIcon } from '@/lib/jashn/icon'
import { getInvitationType } from '@/lib/jashn/invitations'
import { getTheme } from '@/lib/jashn/themes'
import { CardDecor } from './decor'
import { Countdown } from './countdown'
import { RelationAvatar } from './relation-avatar'
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

function Detail({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span style={{ color: 'var(--c-accent)' }}>{icon}</span>
      <span>{children}</span>
    </span>
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
  const isIslamic = type?.category === 'Religious'
  const isCouple = type?.couple && (data.groom || data.bride)

  const wrapRef = useRef<HTMLDivElement>(null)

  // ── 3D tilt on mouse move ──────────────────────────────────────────────
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
        rotateY: dx * 9, rotateX: -dy * 9,
        duration: 0.35, ease: 'power2.out', transformPerspective: 1100,
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-far'), {
        x: dx * -7, y: dy * -7, duration: 0.35, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-mid'), {
        x: dx * -3, y: dy * -3, duration: 0.35, ease: 'power2.out',
      })
      gsap.to(wrap.querySelectorAll('.inv-parallax-near'), {
        x: dx * 5, y: dy * 5, duration: 0.35, ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0, duration: 0.65, ease: 'elastic.out(1,0.5)',
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

  // ── Avatar pair float ──────────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const avatars = wrap.querySelectorAll('.inv-avatar-anim')
    if (!avatars.length) return
    gsap.fromTo(avatars,
      { opacity: 0, scale: 0.6, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.15, delay: 0.4 }
    )
    // gentle sway
    gsap.to(avatars[0], {
      y: -6, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
    if (avatars[1]) {
      gsap.to(avatars[1], {
        y: -6, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5,
      })
    }
  }, { scope: wrapRef })

  // ── Content stagger ────────────────────────────────────────────────────
  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    gsap.fromTo(
      wrap.querySelectorAll('.ic-stagger'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: 'power2.out', delay: 0.55 }
    )
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} className="card-3d-wrap w-full" style={{ perspective: '1200px' }}>
      {/* Far glow blob */}
      <div
        className="inv-parallax-far pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--c-glow,#ffd700) 0%, transparent 70%)' }}
      />

      <div
        ref={ref}
        className={`inv-card-surface jashn-card card-3d-surface card-3d-entrance ${theme.cssClass} mx-auto w-full max-w-md rounded-[2.5rem] px-4 py-8 sm:px-6 sm:py-12 text-center shadow-2xl ${className ?? ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Decor far layer */}
        <div className="inv-parallax-far">
          <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId} />
        </div>

        {/* Shimmer sweep overlay */}
        <div className="card-shimmer-sweep pointer-events-none inv-parallax-mid" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-4 px-2 py-4">

          {/* ── Couple avatar pair ── */}
          {isCouple ? (
            <div className="flex items-end justify-center gap-3 inv-parallax-near">
              <div
                className="inv-avatar-anim"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              >
                <RelationAvatar relation="bride" size={64} />
              </div>
              {/* heart divider */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mb-2 inv-avatar-anim">
                <path d="M14 24 Q4 16 4 10 A5 5 0 0 1 14 8 A5 5 0 0 1 24 10 Q24 16 14 24Z"
                  fill="var(--c-accent)" opacity="0.9" />
              </svg>
              <div
                className="inv-avatar-anim"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              >
                <RelationAvatar relation="groom" size={64} />
              </div>
            </div>
          ) : (
            /* ── Single event icon ── */
            <span
              className="ic-stagger inv-parallax-mid flex items-center justify-center rounded-full border"
              style={{
                width: 56, height: 56,
                borderColor: 'var(--c-accent)',
                color: 'var(--c-accent)',
                background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
                boxShadow: '0 4px 20px color-mix(in oklab, var(--c-accent) 30%, transparent)',
              }}
            >
              {type ? <JashnIcon name={type.icon} className="size-7" /> : null}
            </span>
          )}

          {/* Urdu type label */}
          {type ? (
            <p
              className="ic-stagger font-urdu text-2xl inv-parallax-mid"
              style={{
                color: 'var(--c-accent)',
                textShadow: '0 2px 12px color-mix(in oklab, var(--c-accent) 50%, transparent)',
              }}
            >
              {type.urdu}
            </p>
          ) : null}

          <p className="ic-stagger text-xs uppercase tracking-[0.3em] opacity-75">
            {type?.label ?? 'Invitation'}
          </p>

          {/* Couple names or title */}
          {isCouple ? (
            <div className="my-1 inv-parallax-near ic-stagger">
              <p className="shimmer-text text-3xl font-extrabold leading-tight">
                {data.groom || 'Groom'}
              </p>
              <p className="my-1 font-urdu text-lg" style={{ color: 'var(--c-accent)' }}>
                ویڈز
              </p>
              <p className="shimmer-text text-3xl font-extrabold leading-tight">
                {data.bride || 'Bride'}
              </p>
            </div>
          ) : (
            <h1 className="ic-stagger shimmer-text text-balance text-3xl font-extrabold leading-tight inv-parallax-near">
              {data.title || data.hostNames || type?.label}
            </h1>
          )}

          {/* Host */}
          {data.hostNames && !isCouple && (
            <p className="ic-stagger text-sm opacity-85">Hosted by {data.hostNames}</p>
          )}
          {data.hostNames && isCouple && (
            <p className="ic-stagger text-sm opacity-85">
              {data.hostNames} request the pleasure of your company
            </p>
          )}

          {/* Divider */}
          <span
            className="ic-stagger my-1 block h-px w-24 inv-parallax-mid"
            style={{ background: 'var(--c-accent)', opacity: 0.6 }}
            aria-hidden="true"
          />

          {/* Event details */}
          <div className="ic-stagger flex flex-col items-center gap-3 text-sm">
            {data.date && (
              <Detail icon={<CalendarDays className="size-4" />}>{formatDate(data.date)}</Detail>
            )}
            {data.time && (
              <Detail icon={<Clock className="size-4" />}>{formatTime12h(data.time)}</Detail>
            )}
            {(data.venue || data.city) && (
              <Detail icon={<MapPin className="size-4" />}>
                {[data.venue, data.city].filter(Boolean).join(', ')}
              </Detail>
            )}
            {data.dressCode && (
              <Detail icon={<Shirt className="size-4" />}>Dress code: {data.dressCode}</Detail>
            )}
          </div>

          {/* Notes */}
          {data.notes && (
            <p className="ic-stagger text-pretty text-sm italic leading-relaxed opacity-85">
              &ldquo;{data.notes}&rdquo;
            </p>
          )}

          {/* Countdown */}
          {showCountdown && data.date && (
            <div className="ic-stagger mt-3 w-full">
              <Countdown date={data.date} time={data.time} />
            </div>
          )}
        </div>

        {/* Watermark */}
        {watermark && (
          <div
            className="relative z-10 mt-2 border-t pt-4"
            style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}
          >
            <p className="font-urdu text-sm opacity-80">بنایا گیا Jashn.app سے — آپ بھی بنائیں مفت</p>
            <p className="text-[11px] uppercase tracking-widest opacity-60">Made with Jashn.app</p>
          </div>
        )}
      </div>
    </div>
  )
})
