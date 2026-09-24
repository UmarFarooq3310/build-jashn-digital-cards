export type MagicLinkType = 'wish' | 'invite'

export type MagicOccasion =
  | 'proposal'
  | 'birthday'
  | 'wedding'
  | 'eid'
  | 'anniversary'
  | 'graduation'
  | 'party'
  | 'newborn'
  | 'ramadan'
  | 'apology'
  | 'friendship'
  | 'thankyou'
  | 'getwell'
  | 'newyear'

export type MagicThemeId =
  | 'emerald-gold'
  | 'mughal-gold'
  | 'ruby-velvet'
  | 'royal-sapphire'
  | 'midnight-stars'
  | 'romantic-rose'
  | 'proposal-crimson'
  | 'proposal-rose'
  | 'proposal-amethyst'
  | 'proposal-emerald'
  | 'proposal-champagne'
  | 'proposal-noir'
  | string

export interface InteractiveItem {
  id: number
  icon: string
  color: string
  title: string
  quote: string
}

export interface ProposalMemory {
  id: number
  title: string
  text: string
}

export interface MagicWishContent {
  balloons?: InteractiveItem[]
  candlesCount?: number
  interactiveItems?: InteractiveItem[]
  secretLetter: string
  urduGreeting?: string
  tagline?: string
  photos?: string[]
  // Proposal & Romance Specifics
  howWeMet?: string
  specialDate?: string
  whatsappNumber?: string
  photoUrl?: string
  reasonsToMarry?: ProposalMemory[]
  proposalAnswer?: string
  proposalAccepted?: boolean
}

export interface MagicInviteContent {
  eventTitle: string
  eventDate: string
  eventTime?: string
  venueName: string
  venueAddress: string
  googleMapsUrl?: string
  venueMapsUrl?: string
  dressCode?: string
  allowRsvp?: boolean
  coupleNames?: string
  hostsNames?: string
  whatsappNumber?: string
  photoUrl?: string
}

export interface CardShareStats {
  whatsapp?: number
  sms?: number
  copy?: number
  qr?: number
  image?: number
  video?: number
  app?: number
}

export interface MagicLinkData {
  id?: string
  slug: string
  type: MagicLinkType
  occasion: MagicOccasion
  theme: MagicThemeId
  senderName: string
  senderId?: string
  recipientName: string
  recipientAge?: number
  birthDate?: string
  wishContent?: MagicWishContent
  inviteContent?: MagicInviteContent
  createdLocation?: string
  country?: string
  countryCode?: string
  city?: string
  region?: string
  ip?: string
  device?: string
  browser?: string
  os?: string
  viewsCount?: number
  shares?: CardShareStats
  createdAt: number | any
}

export interface MagicResponseData {
  id?: string
  linkId: string
  recipientName?: string
  type: 'reaction' | 'rsvp' | 'proposal_answer'
  reaction?: string
  proposalAnswer?: {
    accepted: boolean
    choiceText: string
    partnerName?: string
  }
  rsvp?: {
    attending: boolean
    guestsCount?: number
    guestName?: string
    dietaryNotes?: string
    wishes?: string
  }
  rsvpDetails?: {
    guestName: string
    attending: boolean
    guestsCount: number
    dietaryNotes?: string
    wishes?: string
  }
  createdLocation?: string
  country?: string
  countryCode?: string
  city?: string
  region?: string
  ip?: string
  device?: string
  browser?: string
  os?: string
  timestamp: number | any
}
