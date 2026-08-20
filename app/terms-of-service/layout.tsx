import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service & Acceptable Use Policy | Cardzy',
  description:
    'Read the official Terms of Service and Acceptable Use Policy for Cardzy digital wish cards, wedding invitation platforms, and digital business cards.',
  keywords: [
    'terms of service',
    'acceptable use policy',
    'Cardzy terms',
    'digital invitation rules',
    'user agreement',
  ],
  alternates: getPageAlternates('/terms-of-service'),
  robots: PUBLIC_ROBOTS,
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
