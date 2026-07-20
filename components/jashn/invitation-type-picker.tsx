'use client'

import { useState } from 'react'
import Image from 'next/image'
import { INVITATION_TYPES, INVITATION_CATEGORIES } from '@/lib/jashn/invitations'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

function InvitationTypeCard({
  id,
  label,
  urdu,
  icon,
  bgImage,
  bgGradient,
  isCouple,
  active,
  onClick,
}: {
  id: string
  label: string
  urdu?: string
  icon: string
  bgImage?: string
  bgGradient?: string
  isCouple?: boolean
  active: boolean
  onClick: () => void
}) {
  const { lang, t } = useLang()
  const fallback = bgGradient ?? 'linear-gradient(160deg,#8e0f24,#4a0510)'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full',
        active
          ? 'border-primary ring-2 ring-primary/40 shadow-lg shadow-primary/20'
          : 'border-transparent hover:border-primary/50 hover:shadow-md',
      )}
      style={{ aspectRatio: '3/4', background: fallback }}
      aria-pressed={active}
      aria-label={label}
    >
      {/* Background image (SVG placeholder or real photo) */}
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

      {/* Gradient scrim */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

      {/* Active ring */}
      {active && (
        <span className="absolute inset-0 rounded-[14px] ring-2 ring-inset ring-primary/60 pointer-events-none" />
      )}

      {/* Icon badge */}
      <span
        className={cn(
          'absolute right-2 top-2 flex size-7 items-center justify-center rounded-full border border-white/20 backdrop-blur-sm transition-colors',
          active ? 'bg-primary text-primary-foreground' : 'bg-black/40 text-white',
        )}
      >
        <JashnIcon name={icon} className="size-3.5" />
      </span>

      {/* Couple badge */}
      {isCouple && (
        <span className="absolute left-2 top-2 rounded-full bg-black/50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
          {t('coupleBadge') || (lang === 'ur' ? 'جوڑا' : 'Couple')}
        </span>
      )}

      {/* Text overlay */}
      <span className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-0.5 p-2.5">
        {lang === 'ur' ? (
          <span className="font-urdu text-base font-bold leading-relaxed py-0.5 text-white drop-shadow-sm line-clamp-2">
            {urdu}
          </span>
        ) : (
          <span className="text-[11px] font-bold leading-tight text-white drop-shadow-sm line-clamp-2">
            {t(`type_${id.replace(/-/g, '_')}`) || label}
          </span>
        )}
      </span>
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
  const [cat, setCat] = useState<(typeof INVITATION_CATEGORIES)[number]>('Wedding')
  const list = INVITATION_TYPES.filter((t) => t.category === cat)

  return (
    <div>
      {/* Category filter pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {INVITATION_CATEGORIES.map((c) => (
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
        {list.map((t) => (
          <InvitationTypeCard
            key={t.id}
            id={t.id}
            label={t.label}
            urdu={t.urdu || ''}
            icon={t.icon}
            bgImage={t.bgImage}
            bgGradient={t.bgGradient}
            isCouple={t.couple}
            active={value === t.id}
            onClick={() => onChange(t.id)}
          />
        ))}
      </div>
    </div>
  )
}
