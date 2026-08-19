import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Cardzy Digital Cards',
  description: 'Find answers to the most common questions about Cardzy digital wish cards, wedding invitations, visiting cards, pricing, RSVP tracking, and language support.',
  alternates: getPageAlternates('/faq'),
  robots: PUBLIC_ROBOTS,
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

