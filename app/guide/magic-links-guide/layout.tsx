import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: '3D Magic Links Guide — Proposals & Surprises | Cardzy',
  description:
    'Learn to create interactive 3D magic links on Cardzy — ring box proposals, blowable candles & confetti surprises. Step-by-step guide with examples.',
  keywords: [
    'magic link guide',
    '3D proposal card how to',
    'interactive birthday magic link',
    'online marriage proposal idea',
    'will you marry me card guide',
    'animated magic surprise link',
    'WhatsApp magic celebration',
    'Cardzy magic links tutorial',
    'digital love confession card',
  ],
  alternates: getPageAlternates('/guide/magic-links-guide'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: '3D Magic Links Guide — Proposals & Surprises | Cardzy',
    description:
      'Learn how to create interactive 3D magic links on Cardzy — velvet ring box proposals, blowable birthday candles, popping confetti & love confessions.',
    url: 'https://cardzy.online/guide/magic-links-guide',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Magic Links Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Magic Links Guide — Proposals & Surprises | Cardzy',
    description:
      'Learn how to create interactive 3D magic links on Cardzy — proposals, birthday candles, confetti & love confessions.',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

export default function MagicLinksGuideLayout({
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
      { '@type': 'ListItem', position: 3, name: 'Magic Links Guide', item: 'https://cardzy.online/guide/magic-links-guide' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '3D Magic Links Guide — Proposals & Surprises',
    description:
      'Learn how to create interactive 3D magic links on Cardzy — velvet ring box proposals, blowable birthday candles, popping confetti & love confessions.',
    image: ['https://cardzy.online/og-image.jpg'],
    datePublished: '2024-09-01T00:00:00Z',
    dateModified: '2026-10-23T00:00:00Z',
    inLanguage: 'en',
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
      '@id': 'https://cardzy.online/guide/magic-links-guide',
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
