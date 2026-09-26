import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'FAQ — Digital Cards, Wedding Invitations & vCards | Cardzy',
  description:
    'Got questions? Find answers about Cardzy 3D animated cards, WhatsApp wedding RSVP, smart digital visiting cards, pricing, and how to share with one link.',
  keywords: [
    'Cardzy FAQ',
    'digital cards questions',
    'how to make digital wedding invitation',
    'WhatsApp RSVP help',
    'digital business card FAQ',
    'how to create Eid card online',
    'animated card help',
    'Cardzy how it works',
  ],
  alternates: getPageAlternates('/faq'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'FAQ — Digital Cards, Wedding Invitations & vCards | Cardzy',
    description:
      'Answers to all common questions about Cardzy digital cards, WhatsApp RSVP invitations, visiting cards and more.',
    url: 'https://cardzy.online/faq',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Digital Cards, Wedding Invitations & vCards | Cardzy',
    description: 'Answers about Cardzy 3D cards, WhatsApp RSVP, visiting cards, pricing and sharing.',
    images: ['/og-image.jpg'],
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

