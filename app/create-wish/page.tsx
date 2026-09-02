import type { Metadata } from 'next'
import { CreateWishWrapper } from './create-wish-wrapper'
import { CreateWishProse } from './create-wish-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Create 3D Animated Wish Cards with Photos | Cardzy',
  description:
    'Design and personalize 3D animated greeting cards for Eid, Birthdays, Anniversaries, and Ramadan with photos, music, and WhatsApp sharing.',
  keywords: [
    '3D animated wish cards',
    'online greeting card maker',
    'Eid Mubarak card with photo',
    'animated birthday card',
    'custom anniversary card',
    'WhatsApp wish card',
    'digital greeting card',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-wish'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Create 3D Animated Wish Cards with Photos | Cardzy',
    description:
      'Design personalized 3D animated greeting cards for Eid, Birthdays, Anniversaries & Ramadan with photos, music, and WhatsApp sharing.',
    url: 'https://cardzy.online/create-wish',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Create 3D Animated Wish Cards — Cardzy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create 3D Animated Wish Cards with Photos | Cardzy',
    description:
      'Design personalized 3D animated greeting cards for Eid, Birthdays & more with photos, music, and WhatsApp sharing.',
    images: ['/og-image.jpg'],
  },
}

export default function CreateWishPage() {
  return (
    <>
      <CreateWishWrapper />
      <CreateWishProse />
    </>
  )
}
