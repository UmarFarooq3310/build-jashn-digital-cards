'use client'

import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

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
  {
    id: 'cyber-hud',
    name: 'Cyber Gaming HUD',
    desc: 'Esports glowing tech brackets & reticles',
    isPremium: true,
    preview: 'cyber',
  },
]

/** Small SVG preview of each border style */
function BorderPreview({ type, accent = '#c8a44a' }: { type: string; accent?: string }) {
  const W = 38
  const H = 24
  const c = accent

  switch (type) {
    case 'mehndi':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[3, 8, 13, 18, 23, 28, 33].map((x) => (
            <g key={x}>
              <circle cx={x} cy={3} r={1} fill={c} opacity={0.85} />
              <circle cx={x} cy={3} r={2} stroke={c} strokeWidth={0.5} opacity={0.5} />
              <circle cx={x} cy={21} r={1} fill={c} opacity={0.85} />
              <circle cx={x} cy={21} r={2} stroke={c} strokeWidth={0.5} opacity={0.5} />
            </g>
          ))}
        </svg>
      )
    case 'corners':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <path d={`M4 8 L4 4 L8 4`} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M${W-4} 8 L${W-4} 4 L${W-8} 4`} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M4 ${H-8} L4 ${H-4} L8 ${H-4}`} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M${W-4} ${H-8} L${W-4} ${H-4} L${W-8} ${H-4}`} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      )
    case 'dashed':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={3} y={3} width={W-6} height={H-6} rx={3}
            stroke={c} strokeWidth={1} strokeDasharray="3 2" opacity={0.75} />
        </svg>
      )
    case 'diamond':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[3, 10, 17, 24, 31].map((x) => (
            <g key={x}>
              <rect x={x} y={1.5} width={3.5} height={3.5} rx={0.4} transform={`rotate(45 ${x+1.75} ${3.25})`}
                fill={c} opacity={0.7} />
              <rect x={x} y={H-5} width={3.5} height={3.5} rx={0.4} transform={`rotate(45 ${x+1.75} ${H-3.25})`}
                fill={c} opacity={0.7} />
            </g>
          ))}
        </svg>
      )
    case 'arch':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <path d={`M3 ${H-3} L3 11 Q${W/2} 3 ${W-3} 11 L${W-3} ${H-3}`}
            stroke={c} strokeWidth={1.2} opacity={0.8} />
          <path d={`M6 ${H-3} L6 13 Q${W/2} 6 ${W-6} 13 L${W-6} ${H-3}`}
            stroke={c} strokeWidth={0.6} opacity={0.4} />
        </svg>
      )
    case 'royal':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={2} y={2} width={W-4} height={H-4} rx={2}
            stroke={c} strokeWidth={1.3} opacity={0.85} />
          <rect x={5} y={5} width={W-10} height={H-10} rx={1.5}
            stroke={c} strokeWidth={0.6} opacity={0.45} />
        </svg>
      )
    case 'double':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <rect x={2} y={2} width={W-4} height={H-4} rx={2}
            stroke={c} strokeWidth={1} opacity={0.8} />
          <rect x={6} y={6} width={W-12} height={H-12} rx={1.5}
            stroke={c} strokeWidth={0.6} opacity={0.5} />
        </svg>
      )
    case 'woven':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[0,3,6,9,12,15,18,21].map((y) => (
            <line key={`l${y}`} x1={0} y1={y} x2={6} y2={y+6}
              stroke={c} strokeWidth={0.6} opacity={0.5} />
          ))}
          {[0,3,6,9,12,15,18,21].map((y) => (
            <line key={`r${y}`} x1={W} y1={y} x2={W-6} y2={y+6}
              stroke={c} strokeWidth={0.6} opacity={0.5} />
          ))}
          <rect x={2} y={2} width={W-4} height={H-4} rx={2}
            stroke={c} strokeWidth={0.5} opacity={0.3} />
        </svg>
      )
    case 'cyber':
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <path d="M4 7 L4 4 L7 4" stroke="#06B6D4" strokeWidth={1.2} />
          <path d={`M${W-4} 7 L${W-4} 4 L${W-7} 4`} stroke="#06B6D4" strokeWidth={1.2} />
          <path d={`M4 ${H-7} L4 ${H-4} L7 ${H-4}`} stroke="#F59E0B" strokeWidth={1.2} />
          <path d={`M${W-4} ${H-7} L${W-4} ${H-4} L${W-7} ${H-4}`} stroke="#F59E0B" strokeWidth={1.2} />
          <circle cx={W/2} cy={H/2} r={2} stroke="#06B6D4" strokeWidth={0.6} />
          <line x1={W/2-4} y1={H/2} x2={W/2+4} y2={H/2} stroke="#06B6D4" strokeWidth={0.5} opacity={0.7} />
        </svg>
      )
    default:
      return <div className="w-9 h-6 rounded border opacity-40" style={{ borderColor: c }} />
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
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getBorderTranslationKeys = (id: string) => {
    switch (id) {
      case 'mehndi': return { nameKey: 'borderNameMehndi', descKey: 'borderDescMehndi' }
      case 'corners': return { nameKey: 'borderNameCorners', descKey: 'borderDescCorners' }
      case 'floral-frame': return { nameKey: 'borderNameDashed', descKey: 'borderDescDashed' }
      case 'diamond-strip': return { nameKey: 'borderNameDiamondStrip', descKey: 'borderDescDiamondStrip' }
      case 'mughal-arch': return { nameKey: 'borderNameMughalArch', descKey: 'borderDescMughalArch' }
      case 'royal-gold': return { nameKey: 'borderNameRoyalGold', descKey: 'borderDescRoyalGold' }
      case 'double-frame': return { nameKey: 'borderNameDoubleFrame', descKey: 'borderDescDoubleFrame' }
      case 'woven': return { nameKey: 'borderNameWoven', descKey: 'borderDescWoven' }
      case 'cyber-hud': return { nameKey: 'borderNameCyberHud', descKey: 'borderDescCyberHud' }
      default: return { nameKey: '', descKey: '' }
    }
  }

  return (
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-5">
      {BORDERS.map((b) => {
        const locked = b.isPremium && !isPro
        const active = value === b.id
        const { nameKey, descKey } = getBorderTranslationKeys(b.id)
        const translatedName = nameKey ? (t(nameKey as any) || b.name) : b.name
        const translatedDesc = descKey ? (t(descKey as any) || b.desc) : b.desc

        return (
          <button
            key={b.id}
            type="button"
            onClick={() => (locked ? onLockedClick?.() : onChange(b.id))}
            aria-pressed={active}
            className={cn(
              'group relative flex flex-col items-center text-center gap-1 rounded-xl border p-1.5 sm:p-2 transition-all duration-200',
              active
                ? 'border-[#7B0D1E] bg-[#7B0D1E]/8 ring-2 ring-[#7B0D1E]/30 shadow-xs dark:bg-[#7B0D1E]/15'
                : 'border-border bg-card hover:border-[#7B0D1E]/35 hover:bg-muted/50',
            )}
          >
            {/* Live SVG preview */}
            <span className="relative flex items-center justify-center">
              <BorderPreview type={b.preview} accent={active ? '#7B0D1E' : '#a07840'} />
              {locked && (
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs">
                  <Lock className="size-2" />
                </span>
              )}
            </span>

            <div className="w-full min-w-0">
              <span className={cn("text-[10px] sm:text-[10.5px] font-bold leading-tight text-foreground block truncate", isUrdu && "font-urdu text-[11px]")}>
                {translatedName}
              </span>
              <span className={cn("text-[8.5px] text-muted-foreground line-clamp-1 leading-tight", isUrdu && "font-urdu text-[9px]")}>
                {translatedDesc}
              </span>
            </div>

            {b.isPremium ? (
              <span className={cn("text-[6.5px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-0.5 py-0 rounded", isUrdu && "font-urdu")}>
                {t('badgePro') || 'PRO'}
              </span>
            ) : (
              <span className={cn("text-[6.5px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-0.5 py-0 rounded", isUrdu && "font-urdu")}>
                {t('badgeFree') || 'FREE'}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
