import type { Metadata } from 'next'
import { CreateWishWrapper } from './create-wish-wrapper'
import { CreateWishProse } from './create-wish-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Urdu Eid Wishes & 3D Animated Wish Card Maker | Cardzy',
  description:
    'Create 3D animated cards with Urdu Eid wishes, birthday greetings & family photos. Add music and send interactive card links via WhatsApp. Try it free today!',
  keywords: [
    'Urdu Eid wishes',
    '3D animated wish cards',
    'online greeting card maker',
    'Eid Mubarak card with photo',
    'Urdu Eid Mubarak wishes',
    'animated birthday card',
    'custom anniversary card',
    'WhatsApp wish card',
    'digital greeting card',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-wish'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Urdu Eid Wishes & 3D Animated Wish Card Maker | Cardzy',
    description:
      'Create 3D animated cards with Urdu Eid wishes, birthday greetings & family photos. Add music and send interactive card links via WhatsApp. Try it free today!',
    url: 'https://cardzy.online/create-wish',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Urdu Eid Wishes & 3D Animated Wish Card Maker — Cardzy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urdu Eid Wishes & 3D Animated Wish Card Maker | Cardzy',
    description:
      'Create 3D animated cards with Urdu Eid wishes, birthday greetings & family photos. Add music and send interactive card links via WhatsApp. Try it free today!',
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
