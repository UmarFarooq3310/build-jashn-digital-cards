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
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 transition-all duration-300 focus:outline-none p-3.5 text-left active:scale-98',
        'w-full shadow-sm',
        active
          ? 'border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-500/20 scale-[1.03]'
          : 'border-border/60 hover:border-emerald-500/50 hover:shadow-lg hover:-translate-y-1',
      )}
      style={{ aspectRatio: '3/4', background: fallback }}
      aria-pressed={active}
      aria-label={displayLabel}
    >
      {/* ── Background image (SVG placeholder or real photo) ── */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={displayLabel}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}

      {/* ── Rich Gradient Scrim Overlay ── */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

      {/* ── Active ring overlay ── */}
      {active && (
        <span className="absolute inset-0 rounded-[22px] ring-2 ring-inset ring-emerald-400 pointer-events-none" />
      )}

      {/* ── Top Header Bar (Category Pill + Active Badge) ── */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/50 text-white/90 border border-white/20 backdrop-blur-md">
          {catText}
        </span>
        {active ? (
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shadow-md animate-scaleIn">
            <CheckCircle2 className="size-4" />
          </span>
        ) : (
          <span className="flex size-6 items-center justify-center rounded-full bg-black/40 text-white/80 border border-white/20 backdrop-blur-md group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Sparkles className="size-3" />
          </span>
        )}
      </div>

      {/* ── Central Emblem Icon Badge ── */}
      <div className="relative z-10 flex justify-center my-auto">
        <div className={cn(
          "flex size-12 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:rotate-6",
          active
            ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-emerald-500/40"
            : "bg-white/15 text-white border-white/30 group-hover:bg-white/25"
        )}>
          <JashnIcon name={icon} className="size-6" />
        </div>
      </div>

      {/* ── Bottom Text Overlay (Title & Tagline) ── */}
      <div className="relative z-10 flex flex-col items-start gap-0.5 pt-2 border-t border-white/15 w-full overflow-visible">
        <span className={cn(
          "text-white font-extrabold tracking-tight drop-shadow-md group-hover:text-emerald-300 transition-colors",
          (lang === 'ur' || lang === 'ar') ? "font-urdu text-base font-bold py-1 leading-relaxed" : "text-xs leading-tight line-clamp-1"
        )}>
          {displayLabel}
        </span>
        <span className={cn(
          "text-white/80 font-semibold",
          (lang === 'ur' || lang === 'ar') ? "font-urdu text-xs py-0.5 leading-relaxed" : "text-[10px] leading-snug line-clamp-1"
        )}>
          {displayTagline}
        </span>
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
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {list.map((o) => (
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
            active={value === o.id}
            onClick={() => onChange(o.id)}
          />
        ))}
      </div>
    </div>
  )
}
