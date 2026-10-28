import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
  description:
    'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
  keywords: [
    'wedding card wording',
    'Pakistani wedding card text',
    'wedding invitation wording Urdu',
    'wedding card wording in Urdu and English',
    'Nikkah card text examples',
    'Mehndi invitation wording',
    'Barat wedding card lines',
    'Walima card text',
    'Islamic wedding card text',
  ],
  alternates: getPageAlternates('/guide/pakistani-wedding-invitations'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
    description:
      'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
    url: 'https://cardzy.online/guide/pakistani-wedding-invitations',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wedding Card Wording & Pakistani Invitation Templates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
    description:
      'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
    images: ['/og-image.jpg'],
  },
}

export default function WeddingGuideLayout({
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
      { '@type': 'ListItem', position: 3, name: 'Pakistani Wedding Invitations', item: 'https://cardzy.online/guide/pakistani-wedding-invitations' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Wedding Card Wording: Pakistani & Urdu Templates',
    description:
      'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text.',
    image: ['https://cardzy.online/og-image.jpg'],
    datePublished: '2024-08-01T00:00:00Z',
    dateModified: '2026-10-23T00:00:00Z',
    inLanguage: 'ur',
    author: {
      '@type': 'Organization',
      name: 'Cardzy Editorial Team',
      url: 'https://cardzy.online/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cardzy',
      url: 'https://cardzy.online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cardzy.online/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://cardzy.online/guide/pakistani-wedding-invitations',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  )
}
