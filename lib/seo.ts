export const SITE_URL = 'https://cardzy.online'
export const SITE_PUBLISHER = 'Cardzy'
export const SITE_CREATOR = 'Cardzy'

export const SUPPORTED_LANGS = [
  'en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de',
  'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'
] as const

export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_KEYWORDS = [
  // High-Intent Global English Keywords (US, UK, CA, AU, Worldwide)
  '3D animated greeting cards',
  'digital wedding invitation maker',
  'interactive birthday card online',
  'blow out candles virtual birthday card',
  'online birthday cards with photo and music',
  'free interactive e-cards',
  'wedding invitation with whatsapp rsvp',
  'digital envelope opening animation',
  '3D ring box unboxing proposal link',
  'smart digital business cards',
  'vCard generator with qr code',
  'multilingual digital cards',
  'virtual greeting card maker free',
  'custom music greeting card online',

  // Regional & Islamic Keywords (Middle East, South Asia, Global Diaspora)
  'pakistani wedding cards text',
  'nikkah invitation online',
  'walima invitation card online',
  'eid mubarak wishes in urdu',
  'whatsapp rsvp wedding card',
  'candle blowing card online',
  'ring box unboxing invitation',
  'pakistani wedding card wording',
  'qr code business card pakistan',
  'digital visiting card maker',
  'islamic occasion cards online',
  'ramadan mubarak cards with music',
  'hajj and umrah congratulation cards',
  'shadi card text in urdu',
  'eid wishes card banayein',
  'dholki invitation wording in urdu',
  'mehndi card design online',
  'nikkah card maker online',
  'shadi mubarak card online',
  'salgirah mubarak wish card',
  'urdu poetry greeting cards',
  'eid card design free maker',
  'urdu eid wishes',

  // Multilingual High-Intent Intent Terms (Spanish, Arabic, French)
  'tarjetas de invitacion digitales 3d',
  'tarjetas de cumpleanos interactivas',
  'بطاقات دعوة زفاف إلكترونية 3D',
  'بطاقات تهنئة رقمية متحركة',
  'invitations de mariage numeriques interactives',
  'carte de voeux 3d animee en ligne',
  'Cardzy',
]

/**
 * Open Graph & Twitter metadata preset specifically formatted for WhatsApp and social crawlers.
 * WhatsApp requires absolute URLs, image dimensions, proper content types, and under 300KB images.
 */
export function getWhatsAppOpenGraph({
  title = 'Cardzy — 3D Digital Wedding Invitations, Wish Cards & vCards',
  description = 'Open interactive 3D animated greeting cards, Pakistani digital wedding invitation maker with WhatsApp RSVP, and smart vCards.',
  path = '/',
  imageUrl = `${SITE_URL}/og-image.jpg`,
  imageAlt = 'Cardzy Interactive 3D Digital Cards and Invitations',
}: {
  title?: string
  description?: string
  path?: string
  imageUrl?: string
  imageAlt?: string
}) {
  const url = getCanonicalUrl(path)
  return {
    title,
    description,
    url,
    siteName: 'Cardzy',
    type: 'website' as const,
    images: [
      {
        url: imageUrl.startsWith('http') ? imageUrl : `${SITE_URL}${imageUrl}`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: imageAlt,
      },
    ],
  }
}


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
 * Includes hreflang alternates for all 18 supported languages.
 * Google uses ?lang= query param — canonical always points to the clean base URL.
 */
export function getPageAlternates(path: string, _lang?: string | null) {
  const canonical = getCanonicalUrl(path)
  const languages: Record<string, string> = {
    'x-default': canonical,
    'en': canonical,
    'ur': `${canonical}?lang=ur`,
    'ar': `${canonical}?lang=ar`,
    'hi': `${canonical}?lang=hi`,
    'es': `${canonical}?lang=es`,
    'fr': `${canonical}?lang=fr`,
    'zh': `${canonical}?lang=zh`,
    'pt': `${canonical}?lang=pt`,
    'ru': `${canonical}?lang=ru`,
    'de': `${canonical}?lang=de`,
    'ja': `${canonical}?lang=ja`,
    'ko': `${canonical}?lang=ko`,
    'it': `${canonical}?lang=it`,
    'tr': `${canonical}?lang=tr`,
    'id': `${canonical}?lang=id`,
    'bn': `${canonical}?lang=bn`,
    'vi': `${canonical}?lang=vi`,
    'sw': `${canonical}?lang=sw`,
  }
  return {
    canonical,
    languages,
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

