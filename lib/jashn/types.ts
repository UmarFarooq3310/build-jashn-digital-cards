export type Language = 'ur' | 'en' | 'both'

export interface Occasion {
  id: string
  /** English display label */
  label: string
  /** Transliterated / Urdu greeting shown on the card e.g. "Eid Mubarak" */
  tagline: string
  /** Urdu script greeting */
  urdu: string
  category: 'Personal' | 'Islamic' | 'Achievements' | 'National' | 'Family'
  /** lucide icon name (kebab not needed — we map PascalCase) */
  icon: string
}

export interface InvitationType {
  id: string
  label: string
  urdu: string
  category: 'Wedding' | 'Religious' | 'Social' | 'Professional'
  icon: string
  /** does this event have a bride/groom pair */
  couple?: boolean
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
}

export type Plan = 'free' | 'pro' | 'business'

export interface JashnUser {
  uid: string
  name: string
  email: string
  phone?: string
  password?: string
  plan: Plan
  createdAt: number
}

export interface Wish {
  id: string
  slug: string
  creatorId: string
  occasionId: string
  message: string
  messageUrdu: string
  language: Language
  themeId: string
  borderId?: string
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
  rsvpCount: number
  viewCount?: number
  createdAt: number
}
