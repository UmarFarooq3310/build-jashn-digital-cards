import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Cardzy Digital Cards',
  description: 'Find answers to common questions about Cardzy digital wish cards, wedding invitations, smart vCards, pricing plans, and WhatsApp RSVP tracking.',
  keywords: [
    'Cardzy FAQ',
    'digital cards questions',
    'how to make digital wedding invitation',
    'WhatsApp RSVP help',
    'digital business card FAQ',
  ],
  alternates: getPageAlternates('/faq'),
  robots: PUBLIC_ROBOTS,
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

