'use client'

import { useState } from 'react'
import Image from 'next/image'
import { OCCASIONS, OCCASION_CATEGORIES } from '@/lib/jashn/occasions'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'

/** Portrait card ratio ~3:4. Overlays label + Urdu tagline on a gradient scrim. */
function OccasionCard({
  id,
  label,
  urdu,
  icon,
  bgImage,
  bgGradient,
  active,
  onClick,
}: {
  id: string
  label: string
  urdu: string
  icon: string
  bgImage?: string
  bgGradient?: string
  active: boolean
  onClick: () => void
}) {
  const fallback = bgGradient ?? 'linear-gradient(160deg,#1a237e,#4a0e6b)'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        // portrait ratio
        'w-full',
        active
          ? 'border-primary ring-2 ring-primary/40 shadow-lg shadow-primary/20'
          : 'border-transparent hover:border-primary/50 hover:shadow-md',
      )}
      style={{ aspectRatio: '3/4', background: fallback }}
      aria-pressed={active}
      aria-label={label}
    >
      {/* ── Background image (SVG placeholder or real photo) ── */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={label}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}

      {/* ── Gradient scrim: dark at bottom for legibility ── */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

      {/* ── Active ring overlay ── */}
      {active && (
        <span className="absolute inset-0 rounded-[14px] ring-2 ring-inset ring-primary/60 pointer-events-none" />
      )}

      {/* ── Icon badge (top-right corner) ── */}
      <span
        className={cn(
          'absolute right-2 top-2 flex size-7 items-center justify-center rounded-full border border-white/20 backdrop-blur-sm transition-colors',
          active ? 'bg-primary text-primary-foreground' : 'bg-black/40 text-white',
        )}
      >
        <JashnIcon name={icon} className="size-3.5" />
      </span>

      {/* ── Text overlay at bottom ── */}
      <span className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-0.5 p-2.5">
        <span className="text-[11px] font-bold leading-tight text-white drop-shadow-sm line-clamp-2">
          {label}
        </span>
        <span className="font-urdu text-[13px] leading-snug text-white/80 drop-shadow-sm line-clamp-1">
          {urdu}
        </span>
      </span>
    </button>
  )
}

export function OccasionPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  const [cat, setCat] = useState<(typeof OCCASION_CATEGORIES)[number]>('Personal')
  const list = OCCASIONS.filter((o) => o.category === cat)

  return (
    <div>
      {/* Category filter pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {OCCASION_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
              cat === c
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-muted',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Portrait grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((o) => (
          <OccasionCard
            key={o.id}
            id={o.id}
            label={o.label}
            urdu={o.urdu}
            icon={o.icon}
            bgImage={o.bgImage}
            bgGradient={o.bgGradient}
            active={value === o.id}
            onClick={() => onChange(o.id)}
          />
        ))}
      </div>
    </div>
  )
}
