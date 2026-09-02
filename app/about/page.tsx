import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Users,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

// ── Organization Structured Data ─────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cardzy Digital Solutions',
  url: 'https://cardzy.online',
  logo: 'https://cardzy.online/favicon.svg',
  description:
    'Cardzy is a celebration platform providing 3D animated cards, wedding invitations with WhatsApp RSVP, and smart visiting cards in 18 languages.',
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
  },
  email: 'cardzyonline@gmail.com',
  telephone: '+923093518796',
  sameAs: [
    'https://www.instagram.com/cardzyonline',
    'https://www.tiktok.com/@cardzyonline',
    'https://www.facebook.com/share/1bPTaFnxDz/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'cardzyonline@gmail.com',
      availableLanguage: ['English', 'Urdu'],
    },
  ],
}

import { AboutClientContent } from './about-content'

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClientContent />
    </>
  )
}

