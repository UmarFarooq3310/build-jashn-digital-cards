'use client'
import Link from 'next/link'
import { HelpCircle, Sparkles, MessageSquare, Mail } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { LOCALIZED_FAQS } from '@/lib/lang/faq-data'

export default function FaqPage() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LOCALIZED_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q[lang] || item.q.en,
      acceptedAnswer: { '@type': 'Answer', text: item.a[lang] || item.a.en },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className={`py-8 md:py-16 ${isUrdu ? 'font-urdu' : ''}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: t('faqTitle') || 'Frequently Asked Questions', href: '/faq' }]} className="mb-6" />

          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <HelpCircle className="size-4" /> {t('faqPageBadge')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('faqPageH1')}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('faqPageSubtitle')}
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="space-y-0 divide-y divide-border border border-border rounded-3xl overflow-hidden shadow-sm">
            {LOCALIZED_FAQS.map((item, index) => {
              const question = item.q[lang] || item.q.en
              const answer = item.a[lang] || item.a.en
              return (
                <details key={index} className="group bg-card open:bg-muted/30 transition-colors">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6 font-semibold text-foreground hover:text-primary transition-colors">
                    <span className="text-sm sm:text-base leading-snug">{question}</span>
                    <span className="mt-0.5 shrink-0 text-muted-foreground text-lg leading-none select-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{answer}</p>
                  </div>
                </details>
              )
            })}
          </div>

          {/* About section */}
          <div className="mt-14 space-y-4 text-muted-foreground">
            <h2 className="text-2xl font-extrabold text-foreground">{t('faqAboutCardzy')}</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              {t('faqAboutCardzyP1')}
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              {t('faqAboutCardzyP2')}
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              {t('faqAboutCardzyP3')}
            </p>
          </div>

          {/* Contact callout */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 shadow-sm max-w-lg mx-auto">
              <Sparkles className="size-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{t('faqStillQuestion')}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t('faqRespondNote')}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
                  <MessageSquare className="size-4" />{t('faqWhatsappUs')}
                </a>
                <a href="mailto:cardzyonline@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                  <Mail className="size-4" />{t('faqEmailUs')}
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                  {t('contactPageBadge')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
