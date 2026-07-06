'use client'

import { cn } from '@/lib/utils'

interface BgVariant {
  id: string
  name: string
  bgGradient: string
  bgImage?: string
}

export function BackgroundPicker({
  value,
  onChange,
  variants = [],
}: {
  value: string
  onChange: (id: string) => void
  variants?: BgVariant[]
}) {
  if (!variants || variants.length <= 1) {
    return (
      <p className="text-xs text-muted-foreground italic">
        No background variants available for this occasion.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {variants.map((v) => {
        const active = value === v.id || (!value && v.id === 'default')

        // CSS gradients must go on the 'background' shorthand property, not
        // 'backgroundImage', otherwise React treats the string as a URL reference.
        const swatchStyle: React.CSSProperties = v.bgImage
          ? { backgroundImage: `url(${v.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: v.bgGradient }

        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            aria-pressed={active}
            className={cn(
              'group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active
                ? 'border-primary ring-2 ring-primary/30 shadow-sm'
                : 'border-border hover:border-primary/50 bg-card',
            )}
          >
            {/* Colour swatch */}
            <span
              className="relative flex h-14 w-full items-end overflow-hidden rounded-lg"
              style={swatchStyle}
            >
              {/* Gradient scrim so the label is always legible over any colour */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {/* Variant name printed inside the swatch for immediate context */}
              <span className="relative z-10 w-full truncate px-1.5 pb-1 text-[10px] font-bold leading-tight text-white drop-shadow-sm">
                {v.name}
              </span>
            </span>

            {/* Active indicator dot */}
            {active && (
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-primary shadow ring-2 ring-white" />
            )}
          </button>
        )
      })}
    </div>
  )
}
