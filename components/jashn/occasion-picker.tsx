'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { OCCASIONS, OCCASION_CATEGORIES, getOccasionLabel, getOccasionTagline } from '@/lib/jashn/occasions'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

/** Portrait card ratio ~3:4. Rich animated card tile with central emblem & tagline scrim. */
function OccasionCard({
  id,
  label,
  tagline,
  urdu,
  category,
  icon,
  bgImage,
  bgGradient,
  priority,
  active,
  onClick,
}: {
  id: string
  label: string
  tagline?: string
  urdu?: string
  category?: string
  icon: string
  bgImage?: string
  bgGradient?: string
  priority?: boolean
  active: boolean
  onClick: () => void
}) {
  const { lang, t } = useLang()
  const fallback = bgGradient ?? 'linear-gradient(160deg,#1a237e,#4a0e6b)'
  const displayLabel = getOccasionLabel({ id, label, urdu } as any, lang, t)
  const displayTagline = getOccasionTagline({ id, label, tagline, urdu } as any, lang, t)
  const catText = category ? (t(`cat_${category}`) || category) : 'Jashn'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none p-2.5 sm:p-3 text-left active:scale-98',
        'w-full shadow-xs',
        active
          ? 'border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/20 scale-[1.02]'
          : 'border-border/60 hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5',
      )}
      style={{ aspectRatio: '4/3', minHeight: '120px', background: fallback }}
      aria-pressed={active}
      aria-label={displayLabel}
    >
      {/* ── Background image (SVG placeholder or real photo) ── */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={displayLabel}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}

      {/* ── Rich Gradient Scrim Overlay ── */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 pointer-events-none" />

      {/* ── Active ring overlay ── */}
      {active && (
        <span className="absolute inset-0 rounded-[14px] ring-2 ring-inset ring-emerald-400 pointer-events-none" />
      )}

      {/* ── Top Header Bar (Category Pill + Active Badge) ── */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-black/60 text-white/90 border border-white/20 backdrop-blur-md shadow-xs">
          {catText}
        </span>
        {active && (
          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shadow-md animate-scaleIn">
            <CheckCircle2 className="size-3.5" />
          </span>
        )}
      </div>

      {/* ── Bottom Content Row (Icon Emblem + Frosted Pill Title & Tagline) ── */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 w-full mt-auto">
        <div className={cn(
          "flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md shadow-md transition-all duration-300 group-hover:scale-105",
          active
            ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-emerald-500/40"
            : "bg-black/60 text-white border-white/25 group-hover:bg-black/80"
        )}>
          <JashnIcon name={icon} className="size-3.5 sm:size-4" />
        </div>
        <div className="min-w-0 flex-1 rounded-xl bg-black/85 backdrop-blur-md px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/20 shadow-md">
          <span className={cn(
            "text-white font-extrabold tracking-tight block drop-shadow-xs group-hover:text-emerald-300 transition-colors whitespace-normal line-clamp-2 break-words",
            (lang === 'ur' || lang === 'ar') ? "font-urdu text-xs sm:text-sm leading-snug" : "text-[11px] sm:text-xs leading-snug"
          )}>
            {displayLabel}
          </span>
          {displayTagline && (
            <span className={cn(
              "text-white/80 font-medium block truncate",
              (lang === 'ur' || lang === 'ar') ? "font-urdu text-[10px] leading-tight" : "text-[9.5px] leading-none mt-0.5"
            )}>
              {displayTagline}
            </span>
          )}
        </div>
      </div>
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
  const { t } = useLang()
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
              'rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all duration-200 shadow-xs active:scale-95',
              cat === c
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            {t(`cat_${c}`) || c}
          </button>
        ))}
      </div>

      {/* Portrait grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o, idx) => (
          <OccasionCard
            key={o.id}
            id={o.id}
            label={o.label}
            tagline={o.tagline}
            urdu={o.urdu || ''}
            category={o.category}
            icon={o.icon}
            bgImage={o.bgImage}
            bgGradient={o.bgGradient}
            priority={idx < 6}
            active={value === o.id}
            onClick={() => onChange(o.id)}
          />
        ))}
      </div>
    </div>
  )
}
