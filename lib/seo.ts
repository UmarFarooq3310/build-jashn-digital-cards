export const SITE_URL = 'https://cardzy.online'
export const SITE_PUBLISHER = 'Cardzy'
export const SITE_CREATOR = 'Cardzy'

export const SUPPORTED_LANGS = [
  'en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de',
  'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'
] as const

export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_KEYWORDS = [
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
 * Builds the canonical URL for a given path and optional language.
 * - If a language query parameter is provided (e.g. 'ja', 'hi', 'ur'),
 *   it returns a self-referencing canonical URL including `?lang=${lang}`.
 * - If no language is provided or empty, it returns the base canonical URL.
 */
export function getCanonicalUrl(path: string, lang?: string | null): string {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  const fullUrl = `${SITE_URL}${cleanPath}`
  if (lang && typeof lang === 'string' && lang.trim().length > 0) {
    const trimmedLang = lang.trim()
    return `${fullUrl}?lang=${encodeURIComponent(trimmedLang)}`
  }
  return fullUrl
}

/**
 * Generates all language alternate URLs (hreflang) for a given path.
 * - `x-default`: Points to default URL without query parameters
 * - `en`: Points to default English URL without query parameters
 * - Other languages: Points to `${fullUrl}?lang=${lang}`
 */
export function getLanguageAlternates(path: string): Record<string, string> {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  const fullUrl = `${SITE_URL}${cleanPath}`

  const languages: Record<string, string> = {
    'x-default': fullUrl,
    'en': fullUrl,
  }

  SUPPORTED_LANGS.forEach((lang) => {
    if (lang !== 'en') {
      languages[lang] = `${fullUrl}?lang=${lang}`
    }
  })

  return languages
}

/**
 * Returns the `alternates` metadata object for Next.js metadata,
 * dynamically configuring the self-referencing canonical URL and all hreflang alternates.
 */
export function getPageAlternates(path: string, lang?: string | null) {
  return {
    canonical: getCanonicalUrl(path, lang),
    languages: getLanguageAlternates(path),
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

