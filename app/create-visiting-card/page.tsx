import type { Metadata } from 'next'
import { CreateVisitingCardWrapper } from './create-visiting-card-wrapper'
import { CreateVisitingCardProse } from './create-visiting-card-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Create Smart Digital Business Cards (vCard) | Cardzy',
  description:
    'Create smart digital business cards for executives and entrepreneurs. Share via QR code and WhatsApp with 1-tap .vcf contact saving.',
  keywords: [
    'digital business card',
    'vCard maker',
    'smart visiting card',
    'QR code business card',
    'contact card Pakistan',
    'executive digital card',
    'electronic business card',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-visiting-card'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Create Smart Digital Business Cards (vCard) | Cardzy',
    description:
      'Create smart digital business cards for executives & entrepreneurs. Share via QR code and WhatsApp with 1-tap .vcf contact saving.',
    url: 'https://cardzy.online/create-visiting-card',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Smart Digital Business Cards — Cardzy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Smart Digital Business Cards (vCard) | Cardzy',
    description:
      'Create smart digital business cards. Share via QR code and WhatsApp with 1-tap .vcf contact saving.',
    images: ['/og-image.jpg'],
  },
}

export default function CreateVisitingCardPage() {
  return (
    <>
      <CreateVisitingCardWrapper />
      <CreateVisitingCardProse />
    </>
  )
}
