import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Urdu Eid Wishes & Wording: 50+ Copy-Ready Quotes | Cardzy',
  description:
    'Discover 50+ beautiful Urdu Eid wishes, heartfelt poetry & Khair Mubarak replies. Copy-ready quotes in Urdu & English for cards and WhatsApp. Copy yours now!',
  keywords: [
    'Urdu Eid wishes',
    'Urdu Eid Mubarak wishes',
    'Eid Mubarak wording Urdu',
    'Eid wishes in Urdu and English',
    'Khair Mubarak reply meaning',
    'Eid greeting quotes',
    'Eid Mubarak card messages',
    'Urdu Eid poetry',
  ],
  alternates: getPageAlternates('/guide/eid-wording-ideas'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Urdu Eid Wishes & Wording: 50+ Copy-Ready Quotes | Cardzy',
    description:
      'Discover 50+ beautiful Urdu Eid wishes, heartfelt poetry & Khair Mubarak replies. Copy-ready quotes in Urdu & English for cards and WhatsApp. Copy yours now!',
    url: 'https://cardzy.online/guide/eid-wording-ideas',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Urdu Eid Wishes & Wording' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urdu Eid Wishes & Wording: 50+ Copy-Ready Quotes | Cardzy',
    description:
      'Discover 50+ beautiful Urdu Eid wishes, heartfelt poetry & Khair Mubarak replies. Copy-ready quotes in Urdu & English for cards and WhatsApp. Copy yours now!',
    images: ['/og-image.jpg'],
  },
}

export default function EidGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cardzy.online' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://cardzy.online/guide' },
      { '@type': 'ListItem', position: 3, name: 'Eid Wording Ideas', item: 'https://cardzy.online/guide/eid-wording-ideas' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
