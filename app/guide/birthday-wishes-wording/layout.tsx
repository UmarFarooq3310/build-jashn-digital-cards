import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages | Cardzy',
  description:
    'Find the perfect birthday card wording — heartfelt, funny, or formal messages for family & friends. 50+ copy-ready templates and 1-click 3D card creator.',
  keywords: [
    'birthday wishes wording',
    'birthday card messages',
    'birthday wishes for friends',
    'heartfelt birthday wishes',
    'funny birthday card messages',
    'milestone birthday wording',
    'birthday card text templates',
    'birthday wishes in Urdu',
    '50th birthday wishes',
    'birthday message for mum',
  ],
  alternates: getPageAlternates('/guide/birthday-wishes-wording'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages | Cardzy',
    description:
      'Heartfelt, funny, and formal birthday card messages for friends, family & coworkers. Copy-ready + instant 3D card maker.',
    url: 'https://cardzy.online/guide/birthday-wishes-wording',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Birthday Wishes Wording Guide — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages | Cardzy',
    description:
      'Heartfelt, funny, and formal birthday card wording templates. Copy + create a 3D card in seconds.',
    images: ['/og-image.jpg'],
  },
}

export default function BirthdayGuideLayout({
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
      { '@type': 'ListItem', position: 3, name: 'Birthday Wishes Wording', item: 'https://cardzy.online/guide/birthday-wishes-wording' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Birthday Wishes Wording: 50+ Copy-Ready Messages',
    description:
      'Find the perfect birthday card wording — heartfelt, funny, or formal messages for family & friends. 50+ copy-ready templates and 1-click 3D card creator.',
    image: ['https://cardzy.online/og-image.jpg'],
    datePublished: '2024-08-01T00:00:00Z',
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
      '@id': 'https://cardzy.online/guide/birthday-wishes-wording',
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
