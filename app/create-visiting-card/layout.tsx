import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
  description:
    'Create a free smart digital visiting card with QR code, 1-tap .vcf saving, and WhatsApp sharing. Perfect for executives, freelancers, and entrepreneurs in Pakistan & beyond.',
  keywords: [
    'digital business card free',
    'vCard maker online',
    'smart visiting card',
    'QR code business card',
    'contact card Pakistan',
    'executive digital card',
    'electronic business card',
    'digital visiting card Pakistan',
    'free QR business card',
    'vcf download card',
  ],
  alternates: getPageAlternates('/create-visiting-card'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
    description:
      'Create a free digital visiting card with QR code and WhatsApp sharing. Share your contact in one tap.',
    url: 'https://cardzy.online/create-visiting-card',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Free Smart Digital Business Card Maker — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
    description: 'Free digital visiting card with QR code, .vcf saving & WhatsApp sharing.',
    images: ['/og-image.jpg'],
  },
}

export default function CreateVisitingCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
