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
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {THEMES.map((theme) => {
        const isSelected = value === theme.id
        const isLocked = theme.isPremium && !isPro
        const themeKey = getThemeTranslationKey(theme.id)
        const translatedThemeName = themeKey ? t(themeKey) : theme.name
        const motifKey = getMotifTranslationKey(theme.motif)
        const translatedMotif = motifKey ? t(motifKey) : theme.motif

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
                  {translatedMotif}
                </span>
              )}
            </span>
            <span className={cn("text-[11px] font-medium leading-tight text-foreground", isUrdu && "font-urdu text-xs")}>
              {translatedThemeName}
            </span>
            {theme.isPremium ? (
              <span className={cn("text-[9px] font-bold uppercase tracking-wide text-gold", isUrdu && "font-urdu")}>
                {t('badgePro') || 'PRO'}
              </span>
            ) : (
              <span className={cn("text-[9px] uppercase tracking-wide text-muted-foreground", isUrdu && "font-urdu")}>
                {t('badgeFree') || 'FREE'}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
