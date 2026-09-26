import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Magic Links Guide — 3D Proposals, Candles & Surprises | Cardzy',
  description:
    'Learn how to create interactive 3D magic links on Cardzy — velvet ring box proposals, blowable birthday candles, popping confetti & love confessions. Step-by-step guide with examples.',
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
    title: 'Magic Links Guide — 3D Proposals, Candles & Surprises | Cardzy',
    description:
      'Learn how to create interactive 3D magic links on Cardzy — velvet ring box proposals, blowable birthday candles, popping confetti & love confessions.',
    url: 'https://cardzy.online/guide/magic-links-guide',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Magic Links Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magic Links Guide — 3D Proposals, Candles & Surprises | Cardzy',
    description:
      'Learn how to create interactive 3D magic links on Cardzy — proposals, birthday candles, confetti & love confessions.',
    images: ['/og-image.jpg'],
  },
}

export default function MagicLinksGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
