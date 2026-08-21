import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Smart Digital Business Card Maker (vCard) | Cardzy',
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
  alternates: getPageAlternates('/create-visiting-card'),
  robots: PUBLIC_ROBOTS,
}

export default function CreateVisitingCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
