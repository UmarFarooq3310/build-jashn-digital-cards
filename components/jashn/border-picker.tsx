'use client'

import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BORDERS = [
  {
    id: 'mehndi',
    name: 'Mehndi Floral',
    desc: 'Henna dot pattern top & bottom',
    isPremium: false,
    preview: 'mehndi',
  },
  {
    id: 'corners',
    name: 'Corner Brackets',
    desc: 'Elegant L-shaped corner accents',
    isPremium: false,
    preview: 'corners',
  },
  {
    id: 'floral-frame',
    name: 'Dashed Frame',
    desc: 'Minimal full dashed border',
    isPremium: false,
    preview: 'dashed',
  },
  {
    id: 'diamond-strip',
    name: 'Diamond Strip',
    desc: 'Diamond chain top & bottom',
    isPremium: false,
    preview: 'diamond',
  },
  {
    id: 'mughal-arch',
    name: 'Mughal Arch',
    desc: 'Royal arched full frame',
    isPremium: true,
    preview: 'arch',
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    desc: 'Classic double-line full frame',
    isPremium: true,
    preview: 'royal',
  },
  {
    id: 'double-frame',
    name: 'Double Frame',
    desc: 'Nested double border lines',
    isPremium: true,
    preview: 'double',
  },
  {
    id: 'woven',
    name: 'Woven Lattice',
    desc: 'Diagonal cross-hatch edge border',
    isPremium: true,
    preview: 'woven',
  },
]

/** Small SVG preview of each border style */
function BorderPreview({ type, accent = '#c8a44a' }: { type: string; accent?: string }) {
  const W = 52
  const H = 38
  const c = accent

  switch (type) {
    case 'mehndi':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[4, 10, 16, 22, 28, 34, 40, 46].map((x) => (
            <g key={x}>
              <circle cx={x} cy={4} r={1.5} fill={c} opacity={0.85} />
              <circle cx={x} cy={4} r={3} stroke={c} strokeWidth={0.7} opacity={0.5} />
              <circle cx={x} cy={34} r={1.5} fill={c} opacity={0.85} />
              <circle cx={x} cy={34} r={3} stroke={c} strokeWidth={0.7} opacity={0.5} />
            </g>
          ))}
        </svg>
      )
    case 'corners':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {/* top-left */}
          <path d={`M6 14 L6 6 L14 6`} stroke={c} strokeWidth={1.8} strokeLinecap="round" />
          {/* top-right */}
          <path d={`M${W-6} 14 L${W-6} 6 L${W-14} 6`} stroke={c} strokeWidth={1.8} strokeLinecap="round" />
          {/* bottom-left */}
          <path d={`M6 ${H-14} L6 ${H-6} L14 ${H-6}`} stroke={c} strokeWidth={1.8} strokeLinecap="round" />
          {/* bottom-right */}
          <path d={`M${W-6} ${H-14} L${W-6} ${H-6} L${W-14} ${H-6}`} stroke={c} strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      )
    case 'dashed':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={4} y={4} width={W-8} height={H-8} rx={4}
            stroke={c} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.75} />
        </svg>
      )
    case 'diamond':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[4, 12, 20, 28, 36, 44].map((x) => (
            <g key={x}>
              <rect x={x} y={2} width={5} height={5} rx={0.5} transform={`rotate(45 ${x+2.5} ${4.5})`}
                fill={c} opacity={0.7} />
              <rect x={x} y={H-7} width={5} height={5} rx={0.5} transform={`rotate(45 ${x+2.5} ${H-4.5})`}
                fill={c} opacity={0.7} />
            </g>
          ))}
        </svg>
      )
    case 'arch':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <path d={`M4 ${H-4} L4 16 Q${W/2} 4 ${W-4} 16 L${W-4} ${H-4}`}
            stroke={c} strokeWidth={1.4} opacity={0.8} />
          <path d={`M8 ${H-4} L8 18 Q${W/2} 9 ${W-8} 18 L${W-8} ${H-4}`}
            stroke={c} strokeWidth={0.7} opacity={0.4} />
        </svg>
      )
    case 'royal':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={3} y={3} width={W-6} height={H-6} rx={3}
            stroke={c} strokeWidth={1.6} opacity={0.85} />
          <rect x={7} y={7} width={W-14} height={H-14} rx={2}
            stroke={c} strokeWidth={0.8} opacity={0.45} />
        </svg>
      )
    case 'double':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={3} y={3} width={W-6} height={H-6} rx={3}
            stroke={c} strokeWidth={1.2} opacity={0.8} />
          <rect x={8} y={8} width={W-16} height={H-16} rx={2}
            stroke={c} strokeWidth={0.8} opacity={0.5} />
        </svg>
      )
    case 'woven':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {/* left edge lattice */}
          {[0,4,8,12,16,20,24,28,32].map((y) => (
            <line key={`l${y}`} x1={0} y1={y} x2={8} y2={y+8}
              stroke={c} strokeWidth={0.8} opacity={0.5} />
          ))}
          {/* right edge */}
          {[0,4,8,12,16,20,24,28,32].map((y) => (
            <line key={`r${y}`} x1={W} y1={y} x2={W-8} y2={y+8}
              stroke={c} strokeWidth={0.8} opacity={0.5} />
          ))}
          <rect x={3} y={3} width={W-6} height={H-6} rx={3}
            stroke={c} strokeWidth={0.6} opacity={0.3} />
        </svg>
      )
    default:
      return <div className="w-12 h-8 rounded border opacity-40" style={{ borderColor: c }} />
  }
}

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
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {BORDERS.map((b) => {
        const locked = b.isPremium && !isPro
        const active = value === b.id
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => (locked ? onLockedClick?.() : onChange(b.id))}
            aria-pressed={active}
            className={cn(
              'group relative flex flex-col items-center text-center gap-2 rounded-xl border p-3 transition-all duration-200',
              active
                ? 'border-primary bg-primary/8 ring-2 ring-primary/25 shadow-sm'
                : 'border-border bg-card hover:border-primary/35 hover:bg-muted/50',
            )}
          >
            {/* Live SVG preview */}
            <span className="relative flex items-center justify-center">
              <BorderPreview type={b.preview} accent={active ? 'var(--color-primary)' : '#a07840'} />
              {locked && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                  <Lock className="size-2" />
                </span>
              )}
            </span>

            <div className="space-y-0.5 w-full">
              <span className="text-[11px] font-semibold leading-tight text-foreground block truncate">
                {b.name}
              </span>
              <span className="text-[9px] text-muted-foreground line-clamp-2 leading-tight">
                {b.desc}
              </span>
            </div>

            {b.isPremium ? (
              <span className="text-[8px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                Pro
              </span>
            ) : (
              <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                Free
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
