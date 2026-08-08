'use client'
import Link from 'next/link'
import { Mail, MessageSquare, MapPin, Clock, Phone, Globe, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export default function ContactPage() {
  const { t } = useLang()

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Cardzy',
    url: 'https://cardzy.online/contact',
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'Customer Support', email: 'cardzyonline@gmail.com' },
      { '@type': 'ContactPoint', contactType: 'WhatsApp', telephone: '+923093518796' },
    ],
  }

  const helpItems = [
    'Creating and sending animated digital wish cards for Eid, birthdays, anniversaries and weddings',
    'Building digital event invitation websites with RSVP tracking and Google Maps integration',
    'Creating professional digital visiting cards for doctors, lawyers, and businesses',
    'Upgrading to Pro or Business plan and processing payments via EasyPaisa, JazzCash, or PayPal',
    'Exporting guest CSV lists from your dashboard for event management',
    'Adding custom logos, fonts, and branding to your company invitation cards',
    'Troubleshooting card sharing issues on WhatsApp, Instagram Stories, and Facebook',
    'Placing custom concierge orders for royal wedding invitation designs',
    'Questions about card data privacy, storage, and account deletion',
    'Reporting bugs, suggesting new features, or providing product feedback',
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-6">
              <MessageSquare className="size-4" />
              {t('contactPageBadge')}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              {t('contactH1')}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-emerald-100/80">
              {t('contactHeroDesc')}
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-3xl border border-emerald-200/40 bg-card p-7 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MessageSquare className="size-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground group-hover:text-emerald-700 transition-colors">{t('contactWhatsApp')}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">For fast support, custom card orders, and pricing help. Monitored daily, response within a few hours.</p>
                  <p className="mt-3 font-bold text-emerald-700">+92 309 3518796</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  {t('contactChatNow')} <ArrowRight className="size-3" />
                </span>
              </a>

              <a href="mailto:cardzyonline@gmail.com"
                className="group flex flex-col gap-4 rounded-3xl border border-blue-200/40 bg-card p-7 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground group-hover:text-blue-700 transition-colors">{t('contactEmailSupport')}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">For account questions, billing, partnerships, or feature feedback. We respond within 24 hours.</p>
                  <p className="mt-3 font-bold text-blue-700">cardzyonline@gmail.com</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                  {t('contactSendEmail')} <ArrowRight className="size-3" />
                </span>
              </a>

              <div className="flex flex-col gap-4 rounded-3xl border border-amber-200/40 bg-card p-7 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">{t('contactLocation')}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Cardzy is a digital-first global platform headquartered in Pakistan, serving users in 60+ countries in 18 languages.</p>
                  <p className="mt-3 font-bold text-amber-700">Islamabad / Rawalpindi, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Clock className="size-5" />
                </div>
                <h2 className="text-lg font-extrabold text-foreground">{t('contactSupportHours')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="mt-1">Monday – Friday: Within 2–4 hours</p>
                  <p>Saturday – Sunday: Within 6–12 hours</p>
                  <p className="mt-1 text-xs">(Pakistan Standard Time, UTC+5)</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="mt-1">All days: Within 24 hours</p>
                  <p className="mt-1 text-xs">Complex or custom requests may take up to 48 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Team */}
        <section className="bg-muted/40 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('contactAboutTeam')}</h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Cardzy is built by a small, passionate team dedicated to making digital celebrations simple and beautiful for everyone.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                [<Globe key="g" className="size-4 text-emerald-600" />, 'Global Platform, Local Heart', 'Cardzy supports 18 languages and serves users from Pakistan, India, the UAE, the UK, the USA, Canada, Australia, and over 60 other countries.'],
                [<Phone key="p" className="size-4 text-emerald-600" />, 'Custom Order Service', 'Need a fully customised digital card? Our concierge service handles everything from bespoke Mehndi invitations to digital business cards. Reach us on WhatsApp.'],
                [<Mail key="m" className="size-4 text-emerald-600" />, 'Technical Support', 'Experiencing an issue with your card, RSVP tracking, or account? Email us with your card link and a description. We resolve most issues within one business day.'],
                [<MessageSquare key="ms" className="size-4 text-emerald-600" />, 'Partnerships & Press', 'Are you a wedding planner, events company, or media outlet? We welcome collaboration proposals. Reach out by email with details.'],
              ].map(([icon, title, desc]) => (
                <div key={title as string} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">{icon}{title as string}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc as string}</p>
                </div>
              ))}
            </div>

            {/* FAQ teaser */}
            <div className="rounded-3xl border border-emerald-200/50 bg-emerald-50 dark:bg-emerald-950/20 p-7 text-center">
              <h3 className="text-lg font-extrabold text-foreground mb-2">{t('contactFaqTeaser')}</h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-5">
                Browse our Frequently Asked Questions for instant answers about pricing, features, RSVP tracking, and language support.
              </p>
              <Link href="/faq" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition-colors shadow-sm">
                {t('contactViewFaq')} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Help With */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-8 text-center">{t('contactHelpTitle')}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
              {helpItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
