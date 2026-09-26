import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free 3D Animated Wish Card Maker — Eid, Birthday & More | Cardzy',
  description:
    'Create free 3D animated wish cards with Urdu Eid wishes, birthday greetings & family photos. Add music and send interactive card links via WhatsApp in seconds!',
  keywords: [
    'Urdu Eid wishes',
    '3D animated wish cards',
    'online greeting card maker free',
    'Eid Mubarak card with photo',
    'Urdu Eid Mubarak wishes',
    'animated birthday card',
    'custom anniversary card',
    'WhatsApp wish card',
    'digital greeting card',
    'free Eid card maker',
    'birthday card with music online',
  ],
  alternates: getPageAlternates('/create-wish'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Free 3D Animated Wish Card Maker — Eid, Birthday & More | Cardzy',
    description:
      'Make free personalized 3D animated wish cards with photos, music & Urdu messages. Share instantly on WhatsApp.',
    url: 'https://cardzy.online/create-wish',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Free 3D Animated Wish Card Maker — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 3D Animated Wish Card Maker — Eid, Birthday & More | Cardzy',
    description: 'Free 3D animated wish cards with photos, music & Urdu messages. Share on WhatsApp instantly.',
    images: ['/og-image.jpg'],
  },
}

export default function CreateWishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

