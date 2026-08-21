import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us | Cardzy',
  description: 'Learn about Cardzy Digital Solutions — our mission to provide animated digital invitations, greeting cards, and WhatsApp RSVP management with a commitment to privacy and family-safe content.',
  keywords: [
    'about Cardzy',
    'digital cards platform',
    'Cardzy story',
    'Cardzy mission',
    'multilingual celebration cards',
  ],
  alternates: getPageAlternates('/about'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'About Cardzy — Digital Wish Cards & Event Invitations',
    description: 'Cardzy is a multilingual digital celebration platform serving over 60 countries.',
    url: 'https://cardzy.online/about',
    siteName: 'Cardzy Digital Cards',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

