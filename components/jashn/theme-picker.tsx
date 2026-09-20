'use client'

import { Check, Lock } from 'lucide-react'
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
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getThemeTranslationKey = (id: string) => {
    switch (id) {
      case 'mehndi-red': return 'themeMehndiRed'
      case 'feroza-teal': return 'themeFerozaTeal'
      case 'royal-blue': return 'themeRoyalBlue'
      case 'emerald-classic': return 'themeEmeraldClassic'
      case 'saffron-kesari': return 'themeSaffronKesari'
      case 'plum-jamuni': return 'themePlumJamuni'
      case 'mughal-gold': return 'themeMughalGold'
      case 'violet-noor': return 'themeVioletNoor'
      case 'pink-zardozi': return 'themePinkZardozi'
      case 'ivory-shahi': return 'themeIvoryShahi'
      case 'midnight-kashi': return 'themeMidnightKashi'
      case 'ruby-gulabi': return 'themeRubyGulabi'
      default: return ''
    }
  }

  const getMotifTranslationKey = (motif: string) => {
    switch (motif) {
      case 'geometric': return 'motifGeometric'
      case 'floral': return 'motifFloral'
      case 'stars': return 'motifStars'
      case 'petals': return 'motifPetals'
      case 'sparkle': return 'motifSparkle'
      default: return ''
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {THEMES.map((theme) => {
        const isSelected = value === theme.id
        const isLocked = theme.isPremium && !isPro
        const themeKey = getThemeTranslationKey(theme.id)
        const translatedThemeName = themeKey ? (t(themeKey as any) || theme.name) : theme.name
        const motifKey = getMotifTranslationKey(theme.motif)
        const translatedMotif = motifKey ? (t(motifKey as any) || theme.motif) : theme.motif
        const isLightSwatch = theme.id === 'ivory-shahi'

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
            aria-pressed={isSelected}
            className={cn(
              'group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 sm:p-2.5 transition-all text-center',
              isSelected
                ? 'border-[#7B0D1E] bg-[#7B0D1E]/8 ring-2 ring-[#7B0D1E]/35 shadow-xs dark:bg-[#7B0D1E]/15'
                : 'border-border bg-card hover:border-[#7B0D1E]/40 hover:bg-muted/40'
            )}
          >
            {/* PRO / FREE badge positioned top right */}
            {theme.isPremium ? (
              <span className={cn(
                "absolute top-1.5 right-1.5 rounded-md bg-amber-500/15 border border-amber-500/30 px-1 py-0.2 text-[7.5px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 leading-none",
                isUrdu && "font-urdu"
              )}>
                {t('badgePro') || 'PRO'}
              </span>
            ) : null}

            {/* Pure colour swatch */}
            <span
              className={cn(
                "relative flex size-8 sm:size-9 items-center justify-center rounded-xl shadow-inner transition-transform group-hover:scale-105 border",
                isLightSwatch ? "border-stone-300" : "border-black/15 dark:border-white/15"
              )}
              style={{ background: theme.previewColor }}
            >
              {isLocked ? (
                <Lock className={cn("size-3.5 drop-shadow-md", isLightSwatch ? "text-stone-800" : "text-white")} />
              ) : isSelected ? (
                <Check
                  className={cn(
                    "size-4 stroke-[3] drop-shadow-sm",
                    isLightSwatch ? "text-stone-900" : "text-white"
                  )}
                />
              ) : null}
            </span>

            {/* Typography labels below swatch */}
            <div className="flex flex-col items-center w-full min-w-0 space-y-0.5">
              <span className={cn("text-xs font-bold leading-tight text-foreground truncate w-full", isUrdu && "font-urdu text-xs leading-normal")}>
                {translatedThemeName}
              </span>
              <span className={cn("text-[9.5px] font-medium text-muted-foreground capitalize truncate w-full", isUrdu && "font-urdu text-[10px]")}>
                {translatedMotif}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
