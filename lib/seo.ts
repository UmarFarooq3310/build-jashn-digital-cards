export const SITE_URL = 'https://cardzy.online'
export const SITE_PUBLISHER = 'Cardzy'
export const SITE_CREATOR = 'Cardzy'

export const SUPPORTED_LANGS = [
  'en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de',
  'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'
] as const

export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_KEYWORDS = [
  'Urdu Eid wishes',
  'wedding card wording',
  'Pakistani wedding card text',
  'digital wish cards',
  '3D animated greeting cards',
  'digital wedding invitations',
  'Pakistani wedding cards',
  'WhatsApp RSVP invitations',
  'smart digital business cards',
  'vCard generator',
  'Eid Mubarak digital cards',
  'Nikkah invitations online',
  'Mehndi invitations',
  'Walima invitation website',
  'online birthday cards with photo',
  'multilingual digital cards',
  'Cardzy',
]


/**
 * Builds the canonical URL for a given path.
 * Always returns a clean, absolute canonical URL without query parameters.
 */
export function getCanonicalUrl(path: string, _lang?: string | null): string {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  // Ensure any query parameters are stripped from canonical URL
  const pathWithoutQuery = cleanPath.split('?')[0]
  return `${SITE_URL}${pathWithoutQuery}`
}

/**
 * Generates language alternate URLs (hreflang) for a given path if needed.
 */
export function getLanguageAlternates(path: string): Record<string, string> {
  const canonicalUrl = getCanonicalUrl(path)
  return {
    'x-default': canonicalUrl,
    'en': canonicalUrl,
  }
}

/**
 * Returns the `alternates` metadata object for Next.js metadata.
 * Ensures the canonical URL is strictly clean and unified across all query parameter variations.
 */
export function getPageAlternates(path: string, _lang?: string | null) {
  return {
    canonical: getCanonicalUrl(path),
  }
}

/**
 * Robots directive for public indexable pages & blog posts: index, follow.
 */
export const PUBLIC_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
} as const

/**
 * Robots directive for private / protected routes (e.g., /dashboard, /admin_portal, /i/, /w/, /v/): noindex, nofollow.
 */
export const PRIVATE_ROBOTS = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
} as const

