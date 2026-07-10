import type { CardTheme } from './types'

export const THEMES: CardTheme[] = [
  // Free
  {
    id: 'mehndi-red',
    name: 'Mehndi Red',
    cssClass: 'theme-mehndi-red',
    isPremium: false,
    previewColor: '#8e0f24',
    motif: 'floral',
  },
  {
    id: 'feroza-teal',
    name: 'Feroza Teal',
    cssClass: 'theme-feroza-teal',
    isPremium: false,
    previewColor: '#008080',
    motif: 'stars',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    cssClass: 'theme-royal-blue',
    isPremium: false,
    previewColor: '#1a237e',
    motif: 'geometric',
  },
  {
    id: 'emerald-classic',
    name: 'Emerald Classic',
    cssClass: 'theme-emerald-classic',
    isPremium: false,
    previewColor: '#1B5E20',
    motif: 'floral',
  },
  // Premium
  {
    id: 'saffron-kesari',
    name: 'Saffron Kesari',
    cssClass: 'theme-saffron-kesari',
    isPremium: true,
    previewColor: '#e65100',
    motif: 'petals',
  },
  {
    id: 'plum-jamuni',
    name: 'Plum Jamuni',
    cssClass: 'theme-plum-jamuni',
    isPremium: true,
    previewColor: '#4A148C',
    motif: 'sparkle',
  },
  {
    id: 'mughal-gold',
    name: 'Mughal Gold',
    cssClass: 'theme-mughal-gold',
    isPremium: true,
    previewColor: '#5D4037',
    motif: 'sparkle',
  },
  {
    id: 'violet-noor',
    name: 'Violet Noor',
    cssClass: 'theme-violet-noor',
    isPremium: true,
    previewColor: '#4A0E6B',
    motif: 'sparkle',
  },
  {
    id: 'pink-zardozi',
    name: 'Pink Zardozi',
    cssClass: 'theme-pink-zardozi',
    isPremium: true,
    previewColor: '#c2185b',
    motif: 'floral',
  },
  {
    id: 'ivory-shahi',
    name: 'Ivory Shahi',
    cssClass: 'theme-ivory-shahi',
    isPremium: true,
    previewColor: '#e4d3aa',
    motif: 'petals',
  },
  {
    id: 'midnight-kashi',
    name: 'Midnight Kashi',
    cssClass: 'theme-midnight-kashi',
    isPremium: true,
    previewColor: '#0d1b4c',
    motif: 'stars',
  },
  {
    id: 'ruby-gulabi',
    name: 'Ruby Gulabi',
    cssClass: 'theme-ruby-gulabi',
    isPremium: true,
    previewColor: '#b00020',
    motif: 'petals',
  },
]

export const FREE_THEMES = THEMES.filter((t) => !t.isPremium)
export const PREMIUM_THEMES = THEMES.filter((t) => t.isPremium)

export function getTheme(id: string | undefined): CardTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

export function getCategoryPatternClass(category: string | undefined): string {
  if (!category) return ''
  const cat = category.toLowerCase().trim()
  if (cat === 'islamic' || cat === 'religious') {
    return 'jashn-pattern-islamic'
  }
  if (cat === 'family' || cat === 'wedding') {
    return 'jashn-pattern-wedding'
  }
  if (cat === 'personal' || cat === 'social' || cat === 'national') {
    return 'jashn-pattern-personal'
  }
  if (cat === 'achievements' || cat === 'professional') {
    return 'jashn-pattern-professional'
  }
  return ''
}

export function isLightVariant(variantId: string | undefined): boolean {
  if (!variantId) return false
  const id = variantId.toLowerCase().trim()
  return (
    id === 'islamic-ivory' ||
    id === 'ivory-shahi' ||
    id === 'light-ivory' ||
    id === 'light-gold' ||
    id === 'cream' ||
    id === 'white'
  )
}

