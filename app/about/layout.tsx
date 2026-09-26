import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Cardzy — Digital Cards in 18 Languages for 60+ Countries',
  description:
    'Cardzy is a multilingual digital celebration platform from Pakistan. We build 3D animated wish cards, WhatsApp RSVP wedding invitations, and smart digital business cards for people in 60+ countries.',
  keywords: [
    'about Cardzy',
    'digital cards platform Pakistan',
    'Cardzy story',
    'Cardzy mission',
    'multilingual celebration cards',
    'digital invitation company',
    'Pakistani tech startup cards',
  ],
  alternates: getPageAlternates('/about'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'About Cardzy — Digital Cards in 18 Languages for 60+ Countries',
    description:
      'Cardzy is a multilingual digital celebration platform from Pakistan serving over 60 countries with 3D animated cards and wedding invitations.',
    url: 'https://cardzy.online/about',
    siteName: 'Cardzy Digital Cards',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'About Cardzy Digital Cards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cardzy — Digital Cards in 18 Languages for 60+ Countries',
    description: 'Multilingual digital celebration platform — 3D cards, wedding RSVP, and smart vCards from Pakistan.',
    images: ['/og-image.jpg'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

