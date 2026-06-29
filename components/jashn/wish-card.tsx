import { forwardRef } from 'react'
import { JashnIcon } from '@/lib/jashn/icon'
import { getOccasion } from '@/lib/jashn/occasions'
import { getTheme } from '@/lib/jashn/themes'
import type { Language } from '@/lib/jashn/types'
import { CardDecor } from './decor'

export interface WishCardData {
  occasionId: string
  themeId: string
  borderId?: string
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
  const showEn = data.language !== 'ur'
  const showUr = data.language !== 'en'

  const recipientLabel = [
    data.relation ? `Dearest ${data.relation}` : null,
    data.recipientName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="card-3d-wrap w-full">
      <div
        ref={ref}
        className={`jashn-card card-3d-surface card-3d-entrance ${theme.cssClass} mx-auto w-full max-w-md rounded-[2.5rem] px-4 py-8 sm:px-6 sm:py-12 text-center ${className ?? ''}`}
      >
      <CardDecor theme={theme} islamic={isIslamic} borderId={data.borderId} />

      <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-5 px-2 py-6">
        {recipientLabel ? (
          <p
            className="text-sm font-medium uppercase tracking-[0.25em] opacity-80"
            style={{ color: 'var(--c-accent)' }}
          >
            For {recipientLabel}
          </p>
        ) : null}

        <span
          className="flex size-16 items-center justify-center rounded-full border"
          style={{
            borderColor: 'var(--c-accent)',
            color: 'var(--c-accent)',
            background: 'color-mix(in oklab, var(--c-accent) 12%, transparent)',
          }}
        >
          {occasion ? <JashnIcon name={occasion.icon} className="size-8" /> : null}
        </span>

        {/* Urdu greeting headline */}
        {occasion ? (
          <p className="font-urdu text-3xl leading-snug" style={{ color: 'var(--c-accent)' }}>
            {occasion.urdu}
          </p>
        ) : null}

        {/* Shimmering tagline */}
        <h1 className="shimmer-text text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
          {occasion?.tagline ?? 'Mubarak ho'}
        </h1>

        <span
          className="my-1 block h-px w-24"
          style={{ background: 'var(--c-accent)', opacity: 0.6 }}
          aria-hidden="true"
        />

        {/* Message */}
        {showUr && data.messageUrdu ? (
          <p className="font-urdu text-xl leading-loose">{data.messageUrdu}</p>
        ) : null}
        {showEn && data.message ? (
          <p className="text-pretty text-base leading-relaxed opacity-95">
            {data.message}
          </p>
        ) : null}

        {/* Sender */}
        {data.senderName ? (
          <p className="mt-2 text-sm">
            <span className="opacity-70">With love, </span>
            <span className="font-semibold" style={{ color: 'var(--c-accent)' }}>
              {data.senderName}
            </span>
          </p>
        ) : null}
      </div>

     {watermark ? (
        <div className="relative z-10 mt-2 border-t pt-4" style={{ borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' }}>
          <p className="font-urdu text-sm opacity-80">بنایا گیا Jashn.app سے — آپ بھی بنائیں مفت</p>
          <p className="text-[11px] uppercase tracking-widest opacity-60">
            Made with Jashn.app
          </p>
        </div>
      ) : null}
    </div>   
  </div>    
  )
})