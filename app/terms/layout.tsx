import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service & Usage Policy — Cardzy',
  description:
    'Read Cardzy terms of service, user account agreement, acceptable use guidelines, and digital card creator policies.',
  keywords: [
    'terms of service',
    'usage policy',
    'user agreement',
    'Cardzy terms',
  ],
  alternates: getPageAlternates('/terms'),
  robots: PUBLIC_ROBOTS,
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
