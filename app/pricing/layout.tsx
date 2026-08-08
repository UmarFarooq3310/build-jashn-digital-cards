import { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pricing Plans - Digital Wish Cards & Invitations | Cardzy',
  description:
    'Affordable plans for luxury 4K digital wedding invitations, animated wish cards, smart digital business cards, and WhatsApp RSVP tracking.',
  alternates: {
    canonical: 'https://cardzy.online/pricing',
    languages: getLanguageAlternates('/pricing'),
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

