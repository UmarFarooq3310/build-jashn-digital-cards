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
  {
    id: 'saffron-kesari',
    name: 'Saffron Kesari',
    cssClass: 'theme-saffron-kesari',
    isPremium: false,
    previewColor: '#e65100',
    motif: 'petals',
  },
  // ── Authentic Pakistani Heritage Themes ─────────────────────────
  {
    id: 'truck-art',
    name: 'Truck Art & Chamakpatti 🛻',
    cssClass: 'theme-truck-art',
    isPremium: false,
    previewColor: '#e63946',
    motif: 'floral',
  },
  {
    id: 'sindhi-ajrak',
    name: 'Sindhi Ajrak & Ralli 🧣',
    cssClass: 'theme-sindhi-ajrak',
    isPremium: false,
    previewColor: '#12234e',
    motif: 'geometric',
  },
  {
    id: 'mayun-ubtan',
    name: 'Mayun Genda Phool 🌼',
    cssClass: 'theme-mayun-ubtan',
    isPremium: false,
    previewColor: '#e59500',
    motif: 'petals',
  },
  {
    id: 'lahori-badshahi',
    name: 'Lahore Badshahi Qila 🕌',
    cssClass: 'theme-lahori-badshahi',
    isPremium: false,
    previewColor: '#4a0e17',
    motif: 'sparkle',
  },
  {
    id: 'barat-jamawar',
    name: 'Barat Jamawar & Zardozi 👑',
    cssClass: 'theme-barat-jamawar',
    isPremium: false,
    previewColor: '#680e15',
    motif: 'sparkle',
  },
  {
    id: 'walima-champagne',
    name: 'Walima Pastel Mint 💎',
    cssClass: 'theme-walima-champagne',
    isPremium: false,
    previewColor: '#1e3d34',
    motif: 'floral',
  },
  {
    id: 'khyber-rubab',
    name: 'Khyber Heritage Rubab 🪕',
    cssClass: 'theme-khyber-rubab',
    isPremium: false,
    previewColor: '#9c4125',
    motif: 'geometric',
  },
  {
    id: 'sufi-qawwali',
    name: 'Sufi Qawwali Night ✨',
    cssClass: 'theme-sufi-qawwali',
    isPremium: false,
    previewColor: '#0f1423',
    motif: 'stars',
  },
  // Premium
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

export interface ThemeColors {
  bg1: string
  bg2: string
  ink: string
  accent: string
  glow: string
}

export const THEME_COLOR_VARS: Record<string, ThemeColors> = {
  'mehndi-red': { bg1: '#8e0f24', bg2: '#3a0210', ink: '#fff8ee', accent: '#f0c060', glow: '#ffe090' },
  'feroza-teal': { bg1: '#005f63', bg2: '#001e20', ink: '#e8fafa', accent: '#72dde0', glow: '#a8efef' },
  'royal-blue': { bg1: '#1a237e', bg2: '#080c2e', ink: '#edf0ff', accent: '#b8c4ff', glow: '#ccd5ff' },
  'emerald-classic': { bg1: '#1b5e20', bg2: '#061408', ink: '#f0fff2', accent: '#f5d060', glow: '#fae890' },
  'saffron-kesari': { bg1: '#d44a00', bg2: '#481500', ink: '#fff5e8', accent: '#ffd060', glow: '#ffe898' },
  'truck-art': { bg1: '#bd0f34', bg2: '#24050d', ink: '#fffdf5', accent: '#ffd600', glow: '#00f5d4' },
  'sindhi-ajrak': { bg1: '#101f42', bg2: '#420d12', ink: '#fff8f0', accent: '#d4af37', glow: '#f7a072' },
  'mayun-ubtan': { bg1: '#d97706', bg2: '#451a03', ink: '#fffdfa', accent: '#fde047', glow: '#fef08a' },
  'lahori-badshahi': { bg1: '#4c0519', bg2: '#1c0209', ink: '#fffbeb', accent: '#f59e0b', glow: '#fde68a' },
  'barat-jamawar': { bg1: '#7f1d1d', bg2: '#2b0404', ink: '#fef2f2', accent: '#fbbf24', glow: '#fef3c7' },
  'walima-champagne': { bg1: '#1e3d34', bg2: '#091713', ink: '#f0fdf4', accent: '#fde68a', glow: '#dcfce7' },
  'khyber-rubab': { bg1: '#7c2d12', bg2: '#270d06', ink: '#fffaf5', accent: '#fb923c', glow: '#fed7aa' },
  'sufi-qawwali': { bg1: '#0f172a', bg2: '#020617', ink: '#f8fafc', accent: '#38bdf8', glow: '#bae6fd' },
  'plum-jamuni': { bg1: '#4a148c', bg2: '#160030', ink: '#f5e8ff', accent: '#f090c0', glow: '#ffb8d8' },
  'mughal-gold': { bg1: '#4e3220', bg2: '#1c0c04', ink: '#fff8ed', accent: '#f0c060', glow: '#ffe08c' },
  'violet-noor': { bg1: '#3d0c5c', bg2: '#180028', ink: '#f8eeff', accent: '#d8a0ff', glow: '#ecc8ff' },
  'pink-zardozi': { bg1: '#ad1457', bg2: '#540026', ink: '#fff2f8', accent: '#ffd060', glow: '#ffe89a' },
  'ivory-shahi': { bg1: '#f0e4c8', bg2: '#dcc898', ink: '#3a2008', accent: '#8b5e10', glow: '#c89830' },
  'midnight-kashi': { bg1: '#0d1b4c', bg2: '#030614', ink: '#e8f0ff', accent: '#60c0f0', glow: '#90d8ff' },
  'ruby-gulabi': { bg1: '#980018', bg2: '#400008', ink: '#fff2f2', accent: '#ffb0c8', glow: '#ffd0dc' },
}


