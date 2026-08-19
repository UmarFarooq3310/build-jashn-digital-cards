import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Smart Digital Business Card Maker (vCard) | Cardzy',
  description:
    'Create interactive smart digital business cards for executives and entrepreneurs in Pakistan. Share via QR code & WhatsApp with 1-tap contact save.',
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
