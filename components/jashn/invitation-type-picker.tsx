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
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 transition-all duration-300 focus:outline-none p-3.5 text-left active:scale-98 w-full shadow-sm',
        active
          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-xl shadow-[#D4AF37]/20 scale-[1.02]'
          : 'border-border/60 hover:border-[#D4AF37]/50 hover:shadow-lg hover:-translate-y-1',
      )}
      style={{ aspectRatio: '3/4', background: fallback }}
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
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

      {/* ── Active ring overlay ── */}
      {active && (
        <span className="absolute inset-0 rounded-[22px] ring-2 ring-inset ring-[#D4AF37] pointer-events-none" />
      )}

      {/* ── Top Header Bar (Category/Couple Badge + Active Check) ── */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/70 text-white border border-white/25 backdrop-blur-md shadow-xs">
          {catText}
        </span>
        {active && (
          <span className="flex size-6 items-center justify-center rounded-full bg-[#D4AF37] text-slate-950 font-bold shadow-md animate-scaleIn">
            <CheckCircle2 className="size-4" />
          </span>
        )}
      </div>

      {/* ── Central Emblem Icon Badge ── */}
      <div className="relative z-10 flex justify-center my-auto">
        <div className={cn(
          "flex size-12 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
          active
            ? "bg-[#7B0D1E] text-[#D4AF37] border-[#D4AF37]/60 shadow-lg shadow-[#7B0D1E]/40"
            : "bg-black/50 text-white border-white/25 group-hover:bg-black/70"
        )}>
          <JashnIcon name={icon} className="size-6" />
        </div>
      </div>

      {/* ── Bottom Text Overlay (Title with Frosted High-Contrast Pill) ── */}
      <div className="relative z-10 w-full mt-auto">
        <div className="rounded-2xl bg-black/80 backdrop-blur-md px-3 py-2 border border-white/20 text-left shadow-lg transition-colors group-hover:bg-black/90">
          <span className={cn(
            "text-white font-extrabold tracking-tight block drop-shadow-xs",
            (lang === 'ur' || lang === 'ar') ? "font-urdu text-sm sm:text-base leading-relaxed" : "text-xs sm:text-sm leading-tight line-clamp-2"
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
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
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
