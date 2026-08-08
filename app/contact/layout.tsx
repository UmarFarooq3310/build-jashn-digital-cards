import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us — Cardzy Digital Cards',
  description: 'Get in touch with the Cardzy team for support, custom orders, pricing questions, or partnership inquiries. Reach us via WhatsApp, email, or our contact form.',
  alternates: {
    canonical: 'https://cardzy.online/contact',
    languages: getLanguageAlternates('/contact'),
  },
  openGraph: {
    title: 'Contact Cardzy — Digital Cards & Invitations Support',
    description: 'Need help with a digital wish card, wedding invitation, or visiting card? Contact Cardzy via WhatsApp or email. We respond within 24 hours.',
    url: 'https://cardzy.online/contact',
    siteName: 'Cardzy Digital Cards',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

