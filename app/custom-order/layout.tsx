import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Custom Card Design Order - Concierge Service | Cardzy',
  description:
    'Order custom 3D animated wish cards and wedding invitations crafted by our expert design team. Delivered fast with a shareable WhatsApp live link.',
  keywords: [
    'custom card design',
    'bespoke wedding invitation',
    'concierge card service',
    'custom 3D animated cards',
    'personalized event invitation design',
    'Cardzy custom order',
  ],
  alternates: getPageAlternates('/custom-order'),
  robots: PUBLIC_ROBOTS,
}

export default function CustomOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
