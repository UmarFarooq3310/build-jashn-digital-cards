import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pricing Plans for Digital Cards & Invitations | Cardzy',
  description:
    'Affordable plans for luxury 4K digital wedding invitations, animated wish cards, smart digital business cards, and WhatsApp RSVP tracking.',
  keywords: [
    'Cardzy pricing',
    'digital invitation cost',
    'wedding card pricing Pakistan',
    'digital visiting card price',
    'animated wish card plans',
  ],
  alternates: getPageAlternates('/pricing'),
  robots: PUBLIC_ROBOTS,
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

