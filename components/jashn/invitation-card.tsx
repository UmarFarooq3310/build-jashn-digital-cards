import { forwardRef } from 'react'
import { CalendarDays, Clock, MapPin, Shirt } from 'lucide-react'
import { JashnIcon } from '@/lib/jashn/icon'
import { getInvitationType } from '@/lib/jashn/invitations'
import { getTheme } from '@/lib/jashn/themes'
import { CardDecor } from './decor'
import { Countdown } from './countdown'

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
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime12h(timeStr: string) {
  if (!timeStr) return ''
  const match = timeStr.match(/^(\d{2}):(\d{2})$/)
  if (!match) return timeStr
  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  return `${hours}:${minutes} ${ampm}`
}

export const InvitationCard = forwardRef<HTMLDivElement, {
  data: InvitationCardData
  watermark?: boolean
  showCountdown?: boolean
  className?: string
}>(function InvitationCard(
  { data, watermark = true, showCountdown = true, className },
  ref,
) {
  const type = getInvitationType(data.typeId)
  const isIslamic = type?.category === 'Religious'
  const isCouple = type?.couple && (data.groom || data.bride)

  return (
    <div
      ref={ref}
      className={`jashn-card ${getTheme(data.themeId).cssClass} mx-auto w-full max-w-md rounded-[2.5rem] px-4 py-8 sm:px-6 sm:py-12 text-center shadow-2xl ${className ?? ''}`}
    >
      <CardDecor theme={getTheme(data.themeId)} islamic={isIslamic} borderId={data.borderId} />

      <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-4 px-2 py-4">
        <span
          className="flex size-14 items-center justify-center rounded-full border"
          style={{
            borderColor: 'var(--c-accent)',
            color: 'var(--c-accent)',
            background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
          }}
        >
          {type ? <JashnIcon name={type.icon} className="size-7" /> : null}
        </span>

        {type ? (
          <p className="font-urdu text-2xl" style={{ color: 'var(--c-accent)' }}>
            {type.urdu}
          </p>
        ) : null}

        <p className="text-xs uppercase tracking-[0.3em] opacity-75">
          {type?.label ?? 'Invitation'}
        </p>

        {isCouple ? (
          <div className="my-1">
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
          <h1 className="shimmer-text text-balance text-3xl font-extrabold leading-tight">
            {data.title || data.hostNames || type?.label}
          </h1>
        )}

        {data.hostNames && !isCouple ? (
          <p className="text-sm opacity-85">Hosted by {data.hostNames}</p>
        ) : null}
        {data.hostNames && isCouple ? (
          <p className="text-sm opacity-85">{data.hostNames} request the pleasure of your company</p>
        ) : null}

        <span
          className="my-1 block h-px w-24"
          style={{ background: 'var(--c-accent)', opacity: 0.6 }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3 text-sm">
          {data.date ? (
            <Detail icon={<CalendarDays className="size-4" />}>
              {formatDate(data.date)}
            </Detail>
          ) : null}
          {data.time ? (
            <Detail icon={<Clock className="size-4" />}>{formatTime12h(data.time)}</Detail>
          ) : null}
          {(data.venue || data.city) ? (
            <Detail icon={<MapPin className="size-4" />}>
              {[data.venue, data.city].filter(Boolean).join(', ')}
            </Detail>
          ) : null}
          {data.dressCode ? (
            <Detail icon={<Shirt className="size-4" />}>
              Dress code: {data.dressCode}
            </Detail>
          ) : null}
        </div>

        {data.notes ? (
          <p className="text-pretty text-sm italic leading-relaxed opacity-85">
            “{data.notes}”
          </p>
        ) : null}

        {showCountdown && data.date ? (
          <div className="mt-3 w-full">
            <Countdown date={data.date} time={data.time} />
          </div>
        ) : null}
      </div>

      {watermark ? (
        <div
          className="relative z-10 mt-2 border-t pt-4"
          style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}
        >
          <p className="font-urdu text-sm opacity-80">بنایا گیا Jashn.app سے — آپ بھی بنائیں مفت</p>
          <p className="text-[11px] uppercase tracking-widest opacity-60">
            Made with Jashn.app
          </p>
        </div>
      ) : null}
    </div>
  )
})

function Detail({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <span className="flex items-center gap-2">
      <span style={{ color: 'var(--c-accent)' }}>{icon}</span>
      <span>{children}</span>
    </span>
  )
}
