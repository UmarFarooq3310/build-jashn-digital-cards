import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us | Cardzy',
  description: 'Contact Cardzy Digital Solutions for support, custom card orders, and questions. Email: cardzyonline@gmail.com — we respond within 24–48 business hours.',
  keywords: [
    'contact Cardzy',
    'Cardzy WhatsApp support',
    'digital cards help',
    'customer service Cardzy',
    'custom card inquiries',
  ],
  alternates: getPageAlternates('/contact'),
  robots: PUBLIC_ROBOTS,
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

