import type { Metadata } from 'next'
import { EidCardsClient } from './eid-cards-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Urdu Eid Wishes & 3D Animated Eid Cards (Free) | Cardzy',
  description:
    'Send heartfelt Urdu Eid wishes with personalized 3D animated cards! Add your photo, music & Urdu poetry, then share instantly on WhatsApp. Create free in 60s.',
  keywords: [
    'Urdu Eid wishes',
    'Urdu Eid Mubarak wishes',
    'Eid Mubarak wishes in Urdu',
    'Eid Mubarak to you too in Urdu',
    'Khair Mubarak reply in Urdu',
    'animated Eid cards online',
    'Eid Mubarak digital greeting card',
    'Eid card with photo',
    'WhatsApp Eid wishes link',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/eid-mubarak-cards'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Urdu Eid Wishes & 3D Animated Eid Cards (Free) | Cardzy',
    description:
      'Send heartfelt Urdu Eid wishes with personalized 3D animated cards! Add your photo, music & Urdu poetry, then share instantly on WhatsApp. Create free in 60s.',
    url: 'https://cardzy.online/eid-mubarak-cards',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Urdu Eid Wishes & 3D Animated Eid Cards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urdu Eid Wishes & 3D Animated Eid Cards (Free) | Cardzy',
    description:
      'Send heartfelt Urdu Eid wishes with personalized 3D animated cards! Add your photo, music & Urdu poetry, then share instantly on WhatsApp. Create free in 60s.',
    images: ['/og-image.jpg'],
  },
}

export default function EidMubarakCardsPage() {
  return (
    <div className="py-10 md:py-16">
      <EidCardsClient />
    </div>
  )
}

