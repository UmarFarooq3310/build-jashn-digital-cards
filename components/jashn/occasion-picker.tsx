'use client'

import { useState } from 'react'
import { OCCASIONS, OCCASION_CATEGORIES } from '@/lib/jashn/occasions'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'

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
      <div className="mb-4 flex flex-wrap gap-2">
        {OCCASION_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              cat === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-muted',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {list.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all',
                active
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted',
              )}
            >
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full',
                  active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground',
                )}
              >
                <JashnIcon name={o.icon} className="size-5" />
              </span>
              <span className="text-xs font-medium leading-tight text-foreground">{o.label}</span>
              <span className="font-urdu text-sm leading-none text-muted-foreground">{o.urdu}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
