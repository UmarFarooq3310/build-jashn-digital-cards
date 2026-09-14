'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

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
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getVariantTranslationKey = (id: string) => {
    switch (id) {
      case 'default': return 'bgDefaultGradient'
      case 'wedding-crimson': return 'bgCrimsonVelvet'
      case 'wedding-gold': return 'bgMughalGold'
      case 'wedding-teal': return 'bgFerozaTeal'
      case 'wedding-royal': return 'bgRoyalIndigo'
      case 'wedding-emerald-gold': return 'bgEmeraldGold'
      case 'wedding-royal-plum': return 'bgRoyalPlumGold'
      case 'wedding-champagne-pink': return 'bgRoseChampagne'
      case 'islamic-teal':
      case 'festive-teal': return 'colorDeepTeal'
      case 'festive-navy': return 'colorMidnightNavy'
      case 'festive-amber': return 'colorAmberSunset'
      case 'festive-violet': return 'colorDeepViolet'
      case 'festive-rose': return 'colorCrimsonRose'
      case 'festive-aurora': return 'colorAuroraTeal'
      case 'festive-peach-cream': return 'colorPeachCream'
      case 'festive-midnight-glimmer': return 'colorMidnightGlimmer'
      default: return ''
    }
  }

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
        const key = getVariantTranslationKey(v.id)
        const translatedName = key ? (t(key as any) || v.name) : v.name

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
              'group relative flex flex-col items-center gap-2 rounded-2xl border p-2.5 transition-all text-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B0D1E]',
              active
                ? 'border-[#7B0D1E] ring-2 ring-[#7B0D1E]/30 shadow-sm bg-[#7B0D1E]/6 dark:bg-[#7B0D1E]/15'
                : 'border-border hover:border-[#7B0D1E]/40 bg-card hover:bg-muted/40',
            )}
          >
            {/* Pure colour swatch without obscuring scrim */}
            <span
              className="relative flex h-12 sm:h-14 w-full items-center justify-center overflow-hidden rounded-xl border border-black/15 dark:border-white/15 shadow-inner transition-transform group-hover:scale-[1.02]"
              style={swatchStyle}
            >
              {active && (
                <span className="flex size-6 items-center justify-center rounded-full bg-white/95 text-[#7B0D1E] shadow-md border border-black/10">
                  <Check className="size-3.5 stroke-[3]" />
                </span>
              )}
            </span>

            {/* Variant name printed clearly underneath swatch */}
            <div className="w-full px-0.5 pt-0.5 text-center min-w-0">
              <span className={cn(
                "block truncate text-xs font-bold leading-tight text-foreground transition-colors group-hover:text-[#7B0D1E]",
                isUrdu && "font-urdu text-sm leading-normal"
              )}>
                {translatedName}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
