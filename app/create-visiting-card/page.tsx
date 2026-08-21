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
}

export default function CreateVisitingCardPage() {
  return (
    <>
      <CreateVisitingCardWrapper />
      <CreateVisitingCardProse />
    </>
  )
}
