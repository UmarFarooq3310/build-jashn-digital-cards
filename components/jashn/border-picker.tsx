'use client'

import { Lock, Frame, ShieldCheck, Heart, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BORDERS = [
  { id: 'mehndi', name: 'Mehndi Floral', desc: 'Traditional borders at top & bottom', icon: Heart, isPremium: false },
  { id: 'mughal-arch', name: 'Mughal Arch', desc: 'Authentic royal arched frame overlay', icon: Frame, isPremium: true },
  { id: 'royal-gold', name: 'Royal Gold', desc: 'Double-line gold border with inset', icon: ShieldCheck, isPremium: true },
  { id: 'floral-frame', name: 'Dashed Frame', desc: 'Minimalist elegant dashed border line', icon: Sparkles, isPremium: false },
]

export function BorderPicker({
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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {BORDERS.map((b) => {
        const locked = b.isPremium && !isPro
        const active = value === b.id
        const Icon = b.icon
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => (locked ? onLockedClick?.() : onChange(b.id))}
            className={cn(
              'group relative flex flex-col items-center text-center justify-between gap-1.5 rounded-xl border p-3.5 transition-all',
              active ? 'border-primary bg-primary/5 ring-2 ring-primary/30' : 'border-border bg-card hover:border-primary/40',
            )}
          >
            <span
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
              )}
            >
              <Icon className="size-5" />
              {locked && (
                <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-white shadow">
                  <Lock className="size-2.5" />
                </span>
              )}
            </span>
            <div className="space-y-0.5">
              <span className="text-xs font-semibold leading-tight text-foreground block">{b.name}</span>
              <span className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{b.desc}</span>
            </div>
            {b.isPremium ? (
              <span className="text-[8px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">Pro</span>
            ) : (
              <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Free</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
