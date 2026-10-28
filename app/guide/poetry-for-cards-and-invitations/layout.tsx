import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Poetry Treasury & Story Cards Guide — 1,000+ Verses | Cardzy',
  description:
    'Explore 1,000+ verified poems from Iqbal, Ghalib, Faiz, and Rumi. Download royal 1080px story cards for WhatsApp and share timeless shayari.',
  keywords: [
    'poetry treasury guide',
    'Urdu shayari guide',
    'story cards download',
    'Allama Iqbal poetry',
    'Mirza Ghalib couplets',
    'Faiz Ahmed Faiz verses',
    'Punjabi Sufi poetry',
    'Rumi verses',
    'WhatsApp status shayari',
    '1080px poetry card generator',
  ],
  alternates: getPageAlternates('/guide/poetry-for-cards-and-invitations'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Poetry Treasury & Story Cards Guide — 1,000+ Verses | Cardzy',
    description:
      'Explore 1,000+ verified poems from Iqbal, Ghalib, Faiz, and Rumi. Download royal 1080px story cards for WhatsApp and share timeless shayari.',
    url: `${SITE_URL}/guide/poetry-for-cards-and-invitations`,
    siteName: 'Cardzy Digital Cards',
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Cardzy Poetry Treasury and Story Cards Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poetry Treasury & Story Cards Guide — 1,000+ Verses | Cardzy',
    description:
      'Explore 1,000+ verified poems from Iqbal, Ghalib, Faiz, and Rumi. Download royal 1080px story cards for WhatsApp and share timeless shayari.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
}

export default function PoetryGuideLayout({
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
      { '@type': 'ListItem', position: 3, name: 'Poetry for Cards & Invitations', item: 'https://cardzy.online/guide/poetry-for-cards-and-invitations' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Poetry Treasury & Story Cards Guide — 1,000+ Verses',
    description:
      'Explore 1,000+ verified poems from Iqbal, Ghalib, Faiz, and Rumi. Download royal 1080px story cards for WhatsApp and share timeless shayari.',
    image: [`${SITE_URL}/og-image.jpg`],
    datePublished: '2024-09-01T00:00:00Z',
    dateModified: '2026-10-23T00:00:00Z',
    inLanguage: 'ur',
    author: {
      '@type': 'Organization',
      name: 'Cardzy Editorial Team',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cardzy',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guide/poetry-for-cards-and-invitations`,
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
