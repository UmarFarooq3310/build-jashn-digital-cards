'use client'

import Link from 'next/link'
import { Mail, MapPin, Clock, MessageSquare, CheckCircle, HelpCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { useLang } from '@/lib/lang/context'
import { CONTACT_T, pt } from '@/lib/lang/page-translations'

export function ContactClientContent() {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <main className={`min-h-screen bg-background ${isUrdu ? 'font-urdu' : ''}`}>
      {/* ── Header / Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {pt(CONTACT_T.h1, lang)}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-emerald-100/80">
              {pt(CONTACT_T.heroDesc, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* ── Crawlable Direct Business Contact Details ─────────────── */}
      <section className="py-8 md:py-12 bg-muted/40 border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {/* Support Email Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Mail className="size-5 shrink-0" />
                <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                  {pt(CONTACT_T.supportEmail, lang)}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                {pt(CONTACT_T.officialEntity, lang)}
              </p>
              <a
                href="mailto:cardzyonline@gmail.com"
                className="block text-base font-bold text-emerald-700 dark:text-emerald-400 hover:underline break-all min-h-[48px] flex items-center"
              >
                cardzyonline@gmail.com
              </a>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
                <Clock className="size-3.5 shrink-0 text-amber-600" />
                <span>{pt(CONTACT_T.responseTime, lang)}</span>
              </div>
            </div>

            {/* WhatsApp Support Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <MessageSquare className="size-5 shrink-0" />
                <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                  {pt(CONTACT_T.whatsappHelpline, lang)}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                {pt(CONTACT_T.liveChatSupport, lang)}
              </p>
              <a
                href="https://wa.me/923093518796"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-bold text-emerald-700 dark:text-emerald-400 hover:underline min-h-[48px] flex items-center"
              >
                +92 309 3518796
              </a>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
                <Clock className="size-3.5 shrink-0 text-emerald-600" />
                <span>{pt(CONTACT_T.monFriHours, lang)}</span>
              </div>
            </div>

            {/* Business Entity & Location */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <MapPin className="size-5 shrink-0" />
                <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                  {pt(CONTACT_T.businessAddress, lang)}
                </h2>
              </div>
              <p className="text-sm font-bold text-foreground">
                Cardzy Digital Solutions
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pt(CONTACT_T.operatingGlobally, lang)}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
                <span>{pt(CONTACT_T.supportEmailLabel, lang)} <strong className="text-foreground">cardzyonline@gmail.com</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ──────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Component (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {pt(CONTACT_T.sendMessage, lang)}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {pt(CONTACT_T.formDesc, lang)}
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Help & Details Sidebar (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-foreground">{pt(CONTACT_T.howWeHelp, lang)}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  {[
                    pt(CONTACT_T.helpItem1, lang),
                    pt(CONTACT_T.helpItem2, lang),
                    pt(CONTACT_T.helpItem3, lang),
                    pt(CONTACT_T.helpItem4, lang),
                    pt(CONTACT_T.helpItem5, lang),
                    pt(CONTACT_T.helpItem6, lang),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {pt(CONTACT_T.directDetailsTitle, lang)}
                </h3>
                <div className="text-xs sm:text-sm space-y-1.5 text-muted-foreground">
                  <p><strong>{pt(CONTACT_T.entityLabel, lang)}</strong> Cardzy Digital Solutions</p>
                  <p><strong>{pt(CONTACT_T.supportEmailLabel, lang)}</strong> cardzyonline@gmail.com</p>
                  <p><strong>{pt(CONTACT_T.responseTimeLabel, lang)}</strong> {pt(CONTACT_T.responseTime, lang).replace(/^.*?:\s*/, '')}</p>
                  <p><strong>{pt(CONTACT_T.hqLabel, lang)}</strong> Islamabad / Rawalpindi, Pakistan</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
                <h3 className="text-sm font-bold text-foreground">{pt(CONTACT_T.quickLinksTitle, lang)}</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="/about" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {pt(CONTACT_T.aboutCardzyLink, lang)}
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {pt(CONTACT_T.faqLink, lang)}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {pt(CONTACT_T.privacyPolicyLink, lang)}
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {pt(CONTACT_T.cookiePolicyLink, lang)}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {pt(CONTACT_T.termsOfServiceLink, lang)}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brief FAQ Snippet at Bottom ───────────────────────────── */}
      <section className="bg-muted/30 py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-6 text-emerald-700 dark:text-emerald-400" />
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              {pt(CONTACT_T.faqTitle, lang)}
            </h2>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {[
              {
                q: pt(CONTACT_T.faqQ1, lang),
                a: pt(CONTACT_T.faqA1, lang),
              },
              {
                q: pt(CONTACT_T.faqQ2, lang),
                a: pt(CONTACT_T.faqA2, lang),
              },
              {
                q: pt(CONTACT_T.faqQ3, lang),
                a: pt(CONTACT_T.faqA3, lang),
              },
              {
                q: pt(CONTACT_T.faqQ4, lang),
                a: pt(CONTACT_T.faqA4, lang),
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-2xs"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm sm:text-base font-bold text-foreground list-none select-none hover:bg-muted/40 transition-colors min-h-[48px]">
                  <span>{q}</span>
                  <span className="shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {pt(CONTACT_T.needMoreHelp, lang)}{' '}
              <Link href="/faq" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                {pt(CONTACT_T.knowledgeBaseLink, lang)}
              </Link>
            </p>
            <a
              href="mailto:cardzyonline@gmail.com"
              className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
            >
              {pt(CONTACT_T.emailSupportFooter, lang)}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
