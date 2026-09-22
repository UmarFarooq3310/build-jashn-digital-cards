'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { INVITATION_TYPES, INVITATION_CATEGORIES } from '@/lib/jashn/invitations'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

function InvitationTypeCard({
  id,
  label,
  urdu,
  category,
  icon,
  bgImage,
  bgGradient,
  isCouple,
  priority,
  active,
  onClick,
}: {
  id: string
  label: string
  urdu?: string
  category?: string
  icon: string
  bgImage?: string
  bgGradient?: string
  isCouple?: boolean
  priority?: boolean
  active: boolean
  onClick: () => void
}) {
  const { lang, t } = useLang()
  const fallback = bgGradient ?? 'linear-gradient(160deg,#8e0f24,#4a0510)'
  const displayLabel = t(`type_${id.replace(/-/g, '_')}`) || (lang === 'ur' && urdu ? urdu : label)

  const catKey = category ? category.toLowerCase() : 'wedding'
  const catText = isCouple 
    ? (t('coupleBadge') || 'Couple') 
    : (t(catKey) || category || 'Event')

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none p-2.5 sm:p-3 text-left active:scale-98 w-full shadow-xs',
        active
          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
          : 'border-border/60 hover:border-[#D4AF37]/50 hover:shadow-md hover:-translate-y-0.5',
      )}
      style={{ aspectRatio: '4/3', minHeight: '120px', background: fallback }}
      aria-pressed={active}
      aria-label={displayLabel}
    >
      {/* ── Background image ── */}
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

      {/* ── Gradient scrim ── */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 pointer-events-none" />

      {/* ── Active ring overlay ── */}
      {active && (
        <span className="absolute inset-0 rounded-[14px] ring-2 ring-inset ring-[#D4AF37] pointer-events-none" />
      )}

      {/* ── Top Header Bar (Category/Couple Badge + Active Check) ── */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-black/70 text-white border border-white/25 backdrop-blur-md shadow-xs">
          {catText}
        </span>
        {active && (
          <span className="flex size-5 items-center justify-center rounded-full bg-[#D4AF37] text-slate-950 font-bold shadow-md animate-scaleIn">
            <CheckCircle2 className="size-3.5" />
          </span>
        )}
      </div>

      {/* ── Bottom Content Row (Icon Emblem + Frosted Pill Title) ── */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 w-full mt-auto">
        <div className={cn(
          "flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md shadow-md transition-all duration-300 group-hover:scale-105",
          active
            ? "bg-[#7B0D1E] text-[#D4AF37] border-[#D4AF37]/60 shadow-[#7B0D1E]/40"
            : "bg-black/60 text-white border-white/25 group-hover:bg-black/80"
        )}>
          <JashnIcon name={icon} className="size-3.5 sm:size-4" />
        </div>
        <div className="min-w-0 flex-1 rounded-xl bg-black/85 backdrop-blur-md px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/20 shadow-md">
          <span className={cn(
            "text-white font-extrabold tracking-tight block drop-shadow-xs whitespace-normal line-clamp-2 break-words",
            (lang === 'ur' || lang === 'ar') ? "font-urdu text-xs sm:text-sm leading-snug" : "text-[11px] sm:text-xs leading-snug"
          )}>
            {displayLabel}
          </span>
        </div>
      </div>
    </button>
  )
}

export function InvitationTypePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  const { t } = useLang()
  const [cat, setCat] = useState<(typeof INVITATION_CATEGORIES)[number]>('Wedding')
  const list = INVITATION_TYPES.filter((t) => t.category === cat)

  return (
    <div>
      {/* Category filter pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {INVITATION_CATEGORIES.map((c) => {
          const catKey = c.toLowerCase()
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all duration-200 shadow-xs active:scale-95',
                cat === c
                  ? 'bg-[#7B0D1E] text-white shadow-md shadow-[#7B0D1E]/25'
                  : 'bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {t(catKey as any) || t(`cat_${catKey}` as any) || c}
            </button>
          )
        })}
      </div>

      {/* Portrait grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t, idx) => (
          <InvitationTypeCard
            key={t.id}
            id={t.id}
            label={t.label}
            urdu={t.urdu || ''}
            category={t.category}
            icon={t.icon}
            bgImage={t.bgImage}
            bgGradient={t.bgGradient}
            isCouple={t.couple}
            priority={idx < 6}
            active={value === t.id}
            onClick={() => onChange(t.id)}
          />
        ))}
      </div>
    </div>
  )
}
