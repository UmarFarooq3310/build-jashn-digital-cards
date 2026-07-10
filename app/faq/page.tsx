import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FaqAccordion } from '@/components/faq-accordion'
import { HelpCircle, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — Jashn Digital Cards',
  description:
    'Find answers to commonly asked questions about Jashn. Learn how to design animated shaadi cards, send Eid wish cards, configure online RSVP tracking, add traditional audio, and upgrade using JazzCash or EasyPaisa.',
  keywords: [
    'Jashn FAQ',
    'digital shaadi card help',
    'pakistan online invitation RSVP',
    'how to design wedding cards online',
    'Jashn pricing support',
  ],
}

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <HelpCircle className="size-4" /> Need Help?
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions about Jashn? We have gathered answers to everything you need to know about creating, sharing, and managing your digital wish cards and invitations.
            </p>
          </div>

          {/* Accordion Component */}
          <FaqAccordion />

          {/* Contact Callout */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 shadow-sm max-w-lg mx-auto">
              <Sparkles className="size-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Have a different question?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                We are always happy to help you make your celebrations special. If you have custom template inquiries or technical issues, reach out to our team.
              </p>
              <a
                href="mailto:support@jashn.app"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                id="contact-support-link"
              >
                Contact Support
              </a>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
