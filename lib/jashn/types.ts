export type Language = 'en' | 'es' | 'fr' | 'ar' | 'hi' | 'zh' | 'pt' | 'ru' | 'de' | 'ja' | 'ko' | 'it' | 'tr' | 'id' | 'ur' | 'bn' | 'vi' | 'sw'

export interface Occasion {
  id: string
  /** English display label */
  label: string
  /** Transliterated / Urdu greeting shown on the card e.g. "Eid Mubarak" */
  tagline: string
  /** Urdu script greeting */
  urdu?: string
  category: 'Personal' | 'Islamic' | 'Achievements' | 'National' | 'Family' | 'Universal'
  /** lucide icon name (kebab not needed — we map PascalCase) */
  icon: string
  /** portrait background image path (e.g. '/occasions/birthday.jpg') */
  bgImage?: string
  /** fallback gradient used when bgImage is missing */
  bgGradient?: string
  /** hand-drawn sketch SVG illustration path (e.g. '/sketches/birthday.svg') */
  sketchImage?: string
  bgVariants?: { id: string; name: string; bgGradient: string; bgImage?: string }[]
  patternOverlay?: string
  decorations?: string[]
  soundCategory?: 'dholki' | 'islamic' | 'festive' | 'somber' | 'default'
}

export interface InvitationType {
  id: string
  label: string
  urdu?: string
  category: 'Wedding' | 'Religious' | 'Social' | 'Professional'
  icon: string
  /** does this event have a bride/groom pair */
  couple?: boolean
  /** portrait background image path (e.g. '/invitations/mehndi.jpg') */
  bgImage?: string
  /** fallback gradient used when bgImage is missing */
  bgGradient?: string
  /** hand-drawn sketch SVG illustration path (e.g. '/sketches/mehndi.svg') */
  sketchImage?: string
  bgVariants?: { id: string; name: string; bgGradient: string; bgImage?: string }[]
  patternOverlay?: string
  decorations?: string[]
  soundCategory?: 'dholki' | 'islamic' | 'festive' | 'somber' | 'default'
}

export interface CardTheme {
  id: string
  name: string
  /** the css class applied to .jashn-card */
  cssClass: string
  isPremium: boolean
  /** preview swatch color */
  previewColor: string
  /** decorative motif emphasis */
  motif: 'floral' | 'geometric' | 'stars' | 'petals' | 'tiles' | 'sparkle'
}

export interface MessageTemplate {
  en: string
  ur: string
  es?: string
  fr?: string
  ar?: string
  hi?: string
  zh?: string
  pt?: string
  ru?: string
  de?: string
  ja?: string
  ko?: string
  it?: string
  tr?: string
  id?: string
  bn?: string
  vi?: string
  sw?: string
}

export type Plan = 'free' | 'pro' | 'business'

export interface JashnUser {
  uid: string
  name: string
  email: string
  phone?: string
  password?: string
  plan: Plan
  planActivatedAt?: number
  planExpiresAt?: number
  createdAt: number
}

export interface RsvpGuest {
  id: string
  invitationSlug: string
  guestName: string
  phone?: string
  attending: 'yes' | 'no' | 'maybe'
  guestCount: number
  note?: string
  createdAt: number
}

export interface Wish {
  id: string
  slug: string
  creatorId: string
  occasionId: string
  message: string
  language: Language
  themeId: string
  borderId?: string
  bgVariantId?: string
  senderName: string
  recipientName: string
  relation?: string
  viewCount: number
  createdAt: number
}

export interface Invitation {
  id: string
  slug: string
  creatorId: string
  typeId: string
  title: string
  hostNames: string
  groom: string
  bride: string
  date: string // ISO date
  time: string
  venue: string
  city: string
  mapsLink: string
  dressCode: string
  notes: string
  rsvpPhone: string
  themeId: string
  borderId?: string
  bgVariantId?: string
  rsvpCount: number
  viewCount?: number
  createdAt: number
}
