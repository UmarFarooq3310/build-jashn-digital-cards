import type { Metadata } from 'next'
import { GuideClientContent } from './guide-content'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Wedding Card Wording & Urdu Celebration Guides | Cardzy',
  description:
    'Explore copy-ready wedding card wording, Urdu Eid wishes, and celebration etiquette guides. Curated by cultural stylists for WhatsApp sharing. Browse guides!',
  keywords: [
    'wedding card wording',
    'Urdu Eid wishes',
    'Pakistani wedding card text',
    'digital invitation guides',
    'wedding card wording ideas',
    'Eid greeting messages',
    'birthday card wishes',
    'invitation etiquette',
    'Cardzy guides',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/guide'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Wedding Card Wording & Urdu Celebration Guides | Cardzy',
    description:
      'Explore copy-ready wedding card wording, Urdu Eid wishes, and celebration etiquette guides. Curated by cultural stylists for WhatsApp sharing. Browse guides!',
    url: 'https://cardzy.online/guide',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wedding Card Wording & Celebration Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Card Wording & Urdu Celebration Guides | Cardzy',
    description:
      'Explore copy-ready wedding card wording, Urdu Eid wishes, and celebration etiquette guides. Curated by cultural stylists for WhatsApp sharing. Browse guides!',
    images: ['/og-image.jpg'],
  },
}

import { Breadcrumbs } from '@/components/breadcrumbs'

export default function GuideIndexPage() {
  return (
    <div className="py-8 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <Breadcrumbs items={[{ label: 'Celebration Guides & Ideas', href: '/guide' }]} className="mb-6" />
      <GuideClientContent />
    </div>
  )
}
