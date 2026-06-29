'use client'

import { Lock } from 'lucide-react'
import { THEMES } from '@/lib/jashn/themes'
import { cn } from '@/lib/utils'

export function ThemePicker({
  value,
  onChange,
  isPro,
  onLockedClick,
}: {
  value: string
  onChange: (id: string) => void
  isPro: boolean
  onLockedClick?: () => void
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {THEMES.map((t) => {
        const locked = t.isPremium && !isPro
        const active = value === t.id
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => (locked ? onLockedClick?.() : onChange(t.id))}
            className={cn(
              'group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all',
              active ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/40',
            )}
          >
            <span
              className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-lg"
              style={{
                background: `linear-gradient(160deg, ${t.previewColor}, color-mix(in oklab, ${t.previewColor} 55%, #000))`,
              }}
            >
              {locked ? (
                <Lock className="size-4 text-white/90" />
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">
                  {t.motif}
                </span>
              )}
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground">{t.name}</span>
            {t.isPremium ? (
              <span className="text-[9px] font-bold uppercase tracking-wide text-gold">Pro</span>
            ) : (
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground">Free</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
