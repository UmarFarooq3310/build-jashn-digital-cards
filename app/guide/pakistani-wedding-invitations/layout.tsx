import { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pakistani Wedding Card Text & Invitation Wording (Urdu & English) | Cardzy',
  description:
    'Explore 50+ Pakistani wedding card text examples in Urdu and English for Nikkah, Mehndi, Barat, and Walima cards with Bismillah calligraphy and WhatsApp RSVP links.',
  alternates: {
    canonical: 'https://cardzy.online/guide/pakistani-wedding-invitations',
    languages: getLanguageAlternates('/guide/pakistani-wedding-invitations'),
  },
}

export default function WeddingGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
