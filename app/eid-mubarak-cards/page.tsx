import type { Metadata } from 'next'
import { EidCardsClient } from './eid-cards-client'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Urdu Eid Mubarak Wishes & Digital Cards | Cardzy',
  description:
    'Create animated Eid Mubarak cards & send Urdu Eid Mubarak wishes online. Discover "Eid Mubarak to you too" in Urdu words (خیر مبارک) & share instant WhatsApp greetings.',
  alternates: {
    canonical: 'https://cardzy.online/eid-mubarak-cards',
    languages: getLanguageAlternates('/eid-mubarak-cards'),
  },
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

