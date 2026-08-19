import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Custom Card Design Order - Concierge Service | Cardzy',
  description:
    'Order custom 3D animated wish cards, wedding & event invitations, and digital vCards crafted by our expert design team. Delivered instantly with a live WhatsApp link.',
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
