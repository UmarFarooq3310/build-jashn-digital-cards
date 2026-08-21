import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Clock, MessageSquare, CheckCircle, HelpCircle } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Cardzy',
  description:
    'Contact Cardzy Digital Solutions for support with 3D digital wish cards, wedding invitations with WhatsApp RSVP, and smart digital visiting cards. Response within 24–48 business hours.',
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
    'Contact Cardzy Digital Solutions for support with digital wish cards, wedding invitations, visiting cards, and WhatsApp RSVP management. Response within 24–48 business hours.',
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

      <main className="min-h-screen bg-background">
        {/* ── Header / Hero ─────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact' }]} />
            <div className="mt-6 text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Contact Us
              </h1>
              <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-emerald-100/80">
                Have a question, need assistance with your card, or want to discuss custom solutions?
                Reach out to <strong className="text-white">Cardzy Digital Solutions</strong>.
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
                    Support Email
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  Official Business Entity: <strong className="text-foreground">Cardzy Digital Solutions</strong>
                </p>
                <a
                  href="mailto:cardzyonline@gmail.com"
                  className="block text-base font-bold text-emerald-700 dark:text-emerald-400 hover:underline break-all min-h-[48px] flex items-center"
                >
                  cardzyonline@gmail.com
                </a>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
                  <Clock className="size-3.5 shrink-0 text-amber-600" />
                  <span>Response Time: <strong className="text-foreground">Within 24–48 business hours</strong></span>
                </div>
              </div>

              {/* WhatsApp Support Card */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <MessageSquare className="size-5 shrink-0" />
                  <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                    WhatsApp Helpline
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  Direct Live Chat Support for Instant Inquiries
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
                  <span>Mon–Fri: Within 2–4 hours</span>
                </div>
              </div>

              {/* Business Entity & Location */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <MapPin className="size-5 shrink-0" />
                  <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                    Business Address
                  </h2>
                </div>
                <p className="text-sm font-bold text-foreground">
                  Cardzy Digital Solutions
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Islamabad / Rawalpindi, Pakistan<br />
                  Operating globally across 18 languages.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/40">
                  <span>Support Email: <strong className="text-foreground">cardzyonline@gmail.com</strong></span>
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
                    Send Us a Message
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Fill out our contact form below. Our support team responds to all inquiries within{' '}
                    <strong className="text-foreground">24–48 business hours</strong> via{' '}
                    <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                      cardzyonline@gmail.com
                    </a>.
                  </p>
                </div>

                <ContactForm />
              </div>

              {/* Help & Details Sidebar (2 cols) */}
              <div className="lg:col-span-2 space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
                  <h3 className="text-base font-bold text-foreground">How We Can Help</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                    {[
                      '3D Digital Wish Cards & Personalization',
                      'Wedding Invitations & WhatsApp RSVP Tracking',
                      'Smart Digital Visiting Cards (vCard) setup',
                      'Custom Concierge & Event Design Orders',
                      'Account, Billing & Subscription Upgrades',
                      'Privacy, Data Protection & GDPR Inquiries',
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
                    Direct Business Details
                  </h3>
                  <div className="text-xs sm:text-sm space-y-1.5 text-muted-foreground">
                    <p><strong>Entity:</strong> Cardzy Digital Solutions</p>
                    <p><strong>Support Email:</strong> cardzyonline@gmail.com</p>
                    <p><strong>Response Time:</strong> Within 24–48 business hours</p>
                    <p><strong>HQ:</strong> Islamabad / Rawalpindi, Pakistan</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
                  <h3 className="text-sm font-bold text-foreground">Quick Policy & Help Links</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li>
                      <Link href="/about" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                        → About Cardzy
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                        → Frequently Asked Questions
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                        → Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                        → Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms-of-service" className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                        → Terms of Service
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
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {[
                {
                  q: 'What is the best way to contact Cardzy support?',
                  a: 'The most direct way is sending an email to cardzyonline@gmail.com or using the contact form on this page. Our team at Cardzy Digital Solutions guarantees a response within 24–48 business hours.',
                },
                {
                  q: 'How does digital wedding invitation RSVP work?',
                  a: 'Cardzy invitations include an automated WhatsApp RSVP button. Guests tap the button to confirm their attendance directly with the host, and event organizers can track responses in real time.',
                },
                {
                  q: 'How do I create and share a digital greeting card?',
                  a: 'Simply choose an occasion on cardzy.online/create-wish, customize the recipient name, theme, and music, and copy your instant link to share via WhatsApp, SMS, or email.',
                },
                {
                  q: 'Is Cardzy free to use for personal celebrations?',
                  a: 'Yes, Cardzy provides free access to create unlimited personalized 3D wish cards. Optional premium tiers offer custom domain branding, watermark removal, and bulk guest management.',
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
                Need more help? Visit our full{' '}
                <Link href="/faq" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                  Knowledge Base &amp; FAQ Page →
                </Link>
              </p>
              <a
                href="mailto:cardzyonline@gmail.com"
                className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              >
                cardzyonline@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
