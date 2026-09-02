import type { Metadata } from 'next'
import { EidCardsClient } from './eid-cards-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Urdu Eid Mubarak Wishes & Digital Cards | Cardzy',
  description:
    'Create animated Eid Mubarak cards with Urdu wishes online. Learn Khair Mubarak replies and share instant 3D Eid greeting links on WhatsApp.',
  keywords: [
    'Urdu Eid Mubarak wishes',
    'Eid Mubarak to you too in Urdu',
    'Khair Mubarak reply',
    'animated Eid cards online',
    'Eid Mubarak digital greeting card',
    'Eid card with photo',
    'WhatsApp Eid wishes link',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/eid-mubarak-cards'),
  robots: PUBLIC_ROBOTS,
}

export default function EidMubarakCardsPage() {
  return (
    <div className="py-10 md:py-16">
      <EidCardsClient />
    </div>
  )
}

