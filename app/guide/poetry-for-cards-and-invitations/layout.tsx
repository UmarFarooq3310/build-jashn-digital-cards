import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Cardzy Poetry Treasury & Story Cards Guide | 1,000+ Verses & Shayari',
  description:
    'Explore 1,000+ verified poems from Allama Iqbal, Mirza Ghalib, Faiz, and Rumi. Learn to download royal 1080px story cards, filter by theme, and share on WhatsApp.',
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
    title: 'Cardzy Poetry Treasury & Story Cards Guide | 1,000+ Verses & Shayari',
    description:
      'Explore 1,000+ verified poems from Allama Iqbal, Mirza Ghalib, Faiz, and Rumi. Learn to download royal 1080px story cards, filter by theme, and share on WhatsApp.',
    url: `${SITE_URL}/guide/poetry-for-cards-and-invitations`,
    siteName: 'Cardzy Digital Cards',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Poetry Treasury and Story Cards Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy Poetry Treasury & Story Cards Guide | 1,000+ Verses & Shayari',
    description:
      'Explore 1,000+ verified poems from Allama Iqbal, Mirza Ghalib, Faiz, and Rumi. Learn to download royal 1080px story cards, filter by theme, and share on WhatsApp.',
    images: ['/og-image.jpg'],
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
