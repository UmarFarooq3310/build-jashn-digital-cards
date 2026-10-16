import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service & Acceptable Use Policy | Cardzy',
  description:
    "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
  keywords: [
    'terms of service',
    'acceptable use policy',
    'Cardzy terms',
    'digital invitation rules',
    'user agreement',
  ],
  alternates: getPageAlternates('/terms-of-service'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Terms of Service & Acceptable Use Policy | Cardzy',
    description:
      "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
    url: 'https://cardzy.online/terms-of-service',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service & Acceptable Use Policy | Cardzy',
    description:
      "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
