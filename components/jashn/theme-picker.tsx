'use client'

import { Lock } from 'lucide-react'
import { THEMES } from '@/lib/jashn/themes'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

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
  const { t } = useLang()

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {THEMES.map((theme) => {
        const isSelected = value === theme.id
        const isLocked = theme.isPremium && !isPro

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => {
              if (isLocked) {
                onLockedClick?.()
              } else {
                onChange(theme.id)
              }
            }}
            className={cn(
              'relative flex flex-col items-center gap-1 rounded-2xl border p-3 transition-all',
              isSelected
                ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary'
                : 'border-border hover:border-primary/50'
            )}
          >
            <span
              className="flex size-10 items-center justify-center rounded-xl font-bold shadow-inner"
              style={{ background: theme.previewColor }}
            >
              {isLocked ? (
                <Lock className="size-4 text-white/90" />
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">
                  {theme.motif}
                </span>
              )}
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground">{theme.name}</span>
            {theme.isPremium ? (
              <span className="text-[9px] font-bold uppercase tracking-wide text-gold">{t('badgePro')}</span>
            ) : (
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground">{t('badgeFree')}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
