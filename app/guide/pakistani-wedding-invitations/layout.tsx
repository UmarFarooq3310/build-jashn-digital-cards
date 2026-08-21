import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pakistani Wedding Card Text & Urdu Wording | Cardzy',
  description:
    '50+ Pakistani wedding card text examples in Urdu and English for Nikkah, Mehndi, Barat & Walima cards with Bismillah & WhatsApp RSVP.',
  keywords: [
    'Pakistani wedding card text',
    'wedding invitation wording Urdu',
    'Nikkah card text examples',
    'Mehndi invitation wording',
    'Barat wedding card lines',
    'Walima card text',
    'Islamic wedding card text',
  ],
  alternates: getPageAlternates('/guide/pakistani-wedding-invitations'),
  robots: PUBLIC_ROBOTS,
}

export default function WeddingGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
