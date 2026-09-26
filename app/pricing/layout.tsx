import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pricing — Free & Premium Digital Card Plans | Cardzy',
  description:
    'Create stunning digital cards for free. Upgrade for 4K animated wedding invitations, WhatsApp RSVP tracking, smart vCards, and priority custom design. See all plans.',
  keywords: [
    'Cardzy pricing',
    'free digital invitation',
    'digital invitation cost',
    'wedding card pricing Pakistan',
    'digital visiting card price',
    'animated wish card plans',
    'free Eid card online',
    'cheap wedding invitation online',
  ],
  alternates: getPageAlternates('/pricing'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Pricing — Free & Premium Digital Card Plans | Cardzy',
    description:
      'Free and premium plans for animated wish cards, wedding invitations with RSVP, and smart digital business cards. See what fits your needs.',
    url: 'https://cardzy.online/pricing',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Pricing Plans' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Free & Premium Digital Card Plans | Cardzy',
    description: 'Free animated cards + premium plans with RSVP tracking, 4K invitations & smart vCards.',
    images: ['/og-image.jpg'],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

