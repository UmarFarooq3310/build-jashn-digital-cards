import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Clock, MessageSquare, CheckCircle, HelpCircle } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Cardzy',
  description:
    'Contact Cardzy Digital Solutions for support with digital cards and WhatsApp RSVP. Email: cardzyonline@gmail.com. Fast 24-48h response.',
  alternates: { canonical: 'https://cardzy.online/contact' },
  robots: { index: true, follow: true },
}

// ── Structured Data JSON-LD ──────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Us | Cardzy',
  url: 'https://cardzy.online/contact',
  description:
    'Contact Cardzy for support with digital wish cards, wedding invitations, smart visiting cards, and WhatsApp RSVP. Fast 24-48h response.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'cardzyonline@gmail.com',
      availableLanguage: ['English', 'Urdu'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
    {
      '@type': 'ContactPoint',
      contactType: 'WhatsApp Support',
      telephone: '+923093518796',
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I contact Cardzy support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can email our official support team at cardzyonline@gmail.com or message our WhatsApp helpline at +92 309 3518796. Our business entity is Cardzy Digital Solutions, and we respond within 24–48 business hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the standard response time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We respond to all email inquiries within 24–48 business hours. WhatsApp support is typically answered within 2–4 hours during standard business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create and share a digital card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Visit cardzy.online/create-wish or cardzy.online/create-invitation, customize your message, music, and theme, and copy your instant shareable link. No app download is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Cardzy free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Cardzy offers a free tier allowing unlimited classic greeting cards. Pro and business features offer advanced RSVP tracking and watermark removal.',
      },
    },
  ],
}

import { ContactClientContent } from './contact-content'

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactClientContent />
    </>
  )
}

