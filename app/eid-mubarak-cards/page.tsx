import type { Metadata } from 'next'
import { EidCardsClient } from './eid-cards-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Urdu Eid Mubarak Wishes & Digital Cards | Cardzy',
    description:
      'Create animated Eid Mubarak cards with Urdu wishes online. Learn Khair Mubarak replies and share instant 3D Eid greeting links on WhatsApp.',
    keywords: [
      'Urdu Eid Mubarak wishes',
      'Eid Mubarak to you too in Urdu',
      'Khair Mubarak reply',
      'animated Eid cards online',
      'Eid Mubarak digital greeting card',
      'Eid card with photo',
      'WhatsApp Eid wishes link',
    ],
    publisher: SITE_PUBLISHER,
    alternates: getPageAlternates('/eid-mubarak-cards', lang),
    robots: PUBLIC_ROBOTS,
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does "Eid Mubarak to you too" mean in Urdu words?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Urdu, the most common response to "Eid Mubarak" is "Khair Mubarak" (خیر مبارک), which means "May goodness and blessings be upon you too." You can also say "Aap ko bhi Eid Mubarak" (آپ کو بھی عید مبارک). You can easily customize these Urdu Eid wishes on Cardzy 3D animated cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I send Eid Mubarak digital cards in Urdu via WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Cardzy supports authentic Urdu Nasta\'liq script and 18 international languages with full right-to-left (RTL) typography. You can personalize your Urdu Eid greeting message, add a custom photo or audio track, and share the live animated card link on WhatsApp instantly.',
      },
    },
  ],
}

export default function EidMubarakCardsPage() {
  return (
    <div className="py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EidCardsClient />
    </div>
  )
}

