'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FaqAccordion } from '@/components/faq-accordion'
import { HelpCircle, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Cardzy free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Cardzy offers a 100% Free plan to create and send animated wish cards and digital invitations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do RSVP responses work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Guests can respond directly on your digital invitation link. You can track all responses in real-time and export guest lists to CSV from your dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which languages are supported on Cardzy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cardzy supports 18 international languages including English, Urdu, Spanish, French, Arabic, Hindi, Mandarin, Portuguese, Russian, German, Japanese, Korean, Italian, Turkish, Indonesian, Bengali, Vietnamese, and Swahili.',
      },
    },
  ],
}

export default function FaqPage() {
  const { t } = useLang()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <HelpCircle className="size-4" /> {t('needHelp')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('faqTitle')}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('faqHeaderDesc')}
            </p>
          </div>

          {/* Accordion Component */}
          <FaqAccordion />

          {/* Contact Callout */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 shadow-sm max-w-lg mx-auto">
              <Sparkles className="size-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{t('haveDifferentQuestion')}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('differentQuestionDesc')}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/923093518796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  id="contact-whatsapp-link"
                >
                  {t('msgWhatsapp')}
                </a>
                <a
                  href="mailto:cardzyonline@gmail.com"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  id="contact-support-link"
                >
                  {t('emailUs')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
