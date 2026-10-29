import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, Megaphone, FileText, CheckCircle, ExternalLink, Mail, MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cardzy',
  description:
    "Read Cardzy's Privacy Policy. Learn how we protect personal data, enforce Google AdSense & GDPR compliance, and manage cookies securely.",
  alternates: getPageAlternates('/privacy-policy'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Privacy Policy | Cardzy',
    description:
      "Read Cardzy's Privacy Policy. Learn how we protect personal data, enforce Google AdSense & GDPR compliance, and manage cookies securely.",
    url: 'https://cardzy.online/privacy-policy',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Cardzy',
    description:
      "Read Cardzy's Privacy Policy. Learn how we protect personal data, enforce Google AdSense & GDPR compliance, and manage cookies securely.",
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Cardzy',
  url: 'https://cardzy.online/privacy-policy',
  description:
    'Cardzy Privacy Policy explaining data collection, user rights, Google AdSense cookie usage, and GDPR/ePrivacy compliance.',
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />

          {/* Header Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 mt-4 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              <Shield className="size-3.5" /> Privacy &amp; Data Protection
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Privacy Policy for cardzy.online
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last updated: August 20, 2026 &nbsp;·&nbsp; Effective immediately
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              This Privacy Policy explains how <strong className="text-foreground">Cardzy Digital Solutions</strong> (&ldquo;Cardzy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and safeguards information when you visit and use <strong className="text-foreground">cardzy.online</strong>. We are committed to transparency, user privacy, and compliance with global privacy regulations including GDPR and Google Publisher Policies.
            </p>
          </div>

          {/* Policy Body */}
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

            {/* 1. Data Controller & Site Owner */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <FileText className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>1. Data Controller &amp; Site Owner</h2>
              </div>
              <p>
                The data controller responsible for your personal information is:
              </p>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1.5 text-xs sm:text-sm">
                <p><strong className="text-foreground">Business / Entity Name:</strong> Cardzy Digital Solutions</p>
                <p><strong className="text-foreground">Website:</strong> <a href="https://cardzy.online" className="text-emerald-700 dark:text-emerald-400 hover:underline">https://cardzy.online</a></p>
                <p><strong className="text-foreground">Support Email:</strong> <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold">cardzyonline@gmail.com</a></p>
                <p><strong className="text-foreground">Helpline / WhatsApp:</strong> +92 309 3518796</p>
                <p><strong className="text-foreground">Operating Location:</strong> Islamabad / Rawalpindi, Pakistan</p>
              </div>
            </section>

            {/* 2. Google AdSense & Advertising Disclosures */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Megaphone className="size-5 text-amber-600 dark:text-amber-400" />
                <h2>2. Google AdSense &amp; Advertising Disclosures (Required)</h2>
              </div>
              <p>
                This website uses <strong className="text-foreground">Google AdSense</strong> to display advertisements. Google and its third-party advertising partners may use cookies, web beacons, and device identifiers to serve personalised or non-personalised advertisements based on your visits to this website (cardzy.online) and other websites across the Internet.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Third-Party Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to your website or other websites.
                </li>
                <li>
                  <strong className="text-foreground">Personalized Advertising:</strong> Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to Cardzy and/or other sites on the Internet.
                </li>
                <li>
                  <strong className="text-foreground">Opting Out:</strong> You may opt out of personalized advertising at any time by visiting{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-1"
                  >
                    Google Ad Technology &amp; Personalization <ExternalLink className="size-3.5" />
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://youradchoices.com/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-1"
                  >
                    youradchoices.com <ExternalLink className="size-3.5" />
                  </a>.
                </li>
                <li>
                  <strong className="text-foreground">Google Consent Mode v2:</strong> We implement Google Consent Mode v2. If you decline advertising cookies via our cookie consent banner, non-personalized contextual ads are served without setting ad tracking cookies on your device.
                </li>
              </ul>
            </section>

            {/* 3. Data We Collect & Processing Purposes */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Eye className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>3. Categories of Data We Collect &amp; How It Is Processed</h2>
              </div>
              <p>We adhere to the data minimization principle under global privacy regulations, collecting solely what is necessary to render your digital cards and maintain website security:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Card &amp; Invitation Parameters:</strong> Names of celebrants, couple names, venue coordinates, wedding dates, poetry selections, and RSVP contact phone numbers. For URL-encoded Magic Links, this data is packed directly into the link hash or URL query parameters, meaning it is decoded client-side in the recipient&rsquo;s browser without centralized database profiling.
                </li>
                <li>
                  <strong className="text-foreground">Interactive Guestbook &amp; RSVP Submissions:</strong> When wedding guests or wish recipients submit an RSVP or guestbook blessing, their declared name, guest count, and optional congratulatory note are stored securely to display on the host&rsquo;s event page.
                </li>
                <li>
                  <strong className="text-foreground">Contact Form &amp; Customer Support:</strong> When communicating via <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline">our contact desk</Link> or email, we collect your name, email address, inquiry topic, and message text exclusively to resolve your inquiry. Support logs are retained for 180 days and then purged.
                </li>
                <li>
                  <strong className="text-foreground">Technical Log Files &amp; Telemetry:</strong> Standard web server logs containing Internet Protocol (IP) addresses, browser user-agent strings, referring URLs, and request timestamps to monitor system uptime, thwart brute-force cyberattacks, and ensure platform health.
                </li>
                <li>
                  <strong className="text-foreground">Advertising &amp; Analytics Cookies:</strong> Anonymous device identifiers and cookie tags processed by Google AdSense to serve contextual or personalized advertisements in accordance with your consent preferences.
                </li>
              </ul>
            </section>

            {/* 4. Local Storage, Client-Side State & Zero-Tracking Philosophy */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Lock className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>4. Local Storage, Transient Session State &amp; Zero-Tracking</h2>
              </div>
              <p>
                Unlike conventional invitation platforms that force users to create an account, verify personal phone numbers, and submit contact books, Cardzy operates primarily through an ephemeral, privacy-first model:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Browser LocalStorage:</strong> Draft card designs, customized poetry choices, and UI theme selections are persisted locally within your web browser&rsquo;s storage (`localStorage` and `sessionStorage`). This information remains on your physical device and is never transmitted to our backend until you publish or share.</li>
                <li><strong className="text-foreground">No Third-Party Address Book Scraping:</strong> We never request access to your mobile phone contacts, phonebook sync, or email address lists. Sharing is executed through standard WhatsApp URL intents where you select your recipients directly in the official WhatsApp app.</li>
              </ul>
            </section>

            {/* 5. User Choices & Cookie Control */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>5. Your Choices, Managing Cookies &amp; Google Consent Mode v2</h2>
              </div>
              <p>You retain comprehensive autonomy over tracking technologies and cookie storage:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Interactive Consent Banner:</strong> You can accept or reject non-essential analytics and advertising cookies at any point using our cookie preference dialog or the &ldquo;Cookie Preferences&rdquo; link in the website footer.
                </li>
                <li>
                  <strong className="text-foreground">Google Consent Mode v2 Integration:</strong> When a user chooses to decline marketing cookies, Cardzy signals Google Consent Mode v2 with `ad_storage='denied'` and `analytics_storage='denied'`. AdSense then serves purely contextual, non-personalized advertising without placing persistent user-tracking cookies.
                </li>
                <li>
                  <strong className="text-foreground">Browser-Level Blocking:</strong> You may configure Chrome, Edge, Safari, or Firefox to block cookies or clear local site storage automatically upon closing. Essential functionality such as language localization will default gracefully if cookies are disabled.
                </li>
                <li>
                  <strong className="text-foreground">Ad Personalization Opt-Out:</strong> Visit{' '}
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                    Google Ads Settings
                  </a>{' '}
                  or{' '}
                  <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                    youradchoices.com
                  </a>{' '}
                  to opt out of cross-site behavioural profiling across digital ad networks.
                </li>
              </ul>
              <p className="pt-1">
                For complete technical descriptions of each cookie and retention duration, review our{' '}
                <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 font-bold underline">
                  Comprehensive Cookie Policy
                </Link>.
              </p>
            </section>

            {/* 6. Data Retention & Erasure Policy */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <FileText className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>6. Data Retention Schedules &amp; Card Erasure</h2>
              </div>
              <p>
                We maintain clear, finite retention timelines for all hosted digital assets:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Published Event Invitations:</strong> Maintained for the duration of the event plus 90 days thereafter to allow hosts to download guest RSVP tallies, after which records are queued for automated archiving or deletion.</li>
                <li><strong className="text-foreground">Wish Cards &amp; Poetry Story Cards:</strong> Cached statically on edge CDNs for seamless recipient access. Senders can request card removal at any point by emailing our support desk.</li>
                <li><strong className="text-foreground">Server Access Logs:</strong> Rotated and overwritten on a continuous 30-day security cycle.</li>
              </ul>
            </section>

            {/* 7. Rights for UK, EU, and Global Visitors (GDPR & CCPA) */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>7. Global Data Subject Rights (GDPR, UK-GDPR &amp; CCPA/CPRA)</h2>
              </div>
              <p>
                Regardless of where you reside, Cardzy provides robust data privacy protections. If you are located in the European Economic Area (EEA), the United Kingdom, or California, you are entitled to exercise specific statutory rights:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Right of Access (Article 15 GDPR):</strong> Request a copy of the personal data held about you in a clear, machine-readable format.</li>
                <li><strong className="text-foreground">Right to Rectification (Article 16 GDPR):</strong> Request correction of inaccurate or incomplete event information.</li>
                <li><strong className="text-foreground">Right to Erasure / &ldquo;Right to be Forgotten&rdquo; (Article 17 GDPR):</strong> Request permanent deletion of your published invitations, guestbook entries, or contact communications.</li>
                <li><strong className="text-foreground">Right to Restrict Processing (Article 18 GDPR):</strong> Request temporary freezing of your data in contested scenarios.</li>
                <li><strong className="text-foreground">California Consumer Privacy Act (CCPA/CPRA):</strong> We do not sell, rent, or share personal information with third parties for monetary consideration. California residents have the right to know what personal data is collected and request deletion without discrimination.</li>
              </ul>
              <p className="pt-1">
                To submit a formal data request, email our compliance officer at <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">cardzyonline@gmail.com</a> with the subject line &ldquo;Data Subject Rights Request&rdquo; along with the URL of your card. Requests are authenticated and resolved within 30 days free of charge.
              </p>
            </section>

            {/* 8. Children's Privacy (COPPA & Global Standards) */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>8. Children&rsquo;s Privacy Protection</h2>
              </div>
              <p>
                Cardzy is a family-oriented service, but our card generation and publication features are intended to be utilized by parents, guardians, or adults aged 16 and older. We do not knowingly collect, profile, or solicit personal identification from children under the age of 13 (or under 16 in applicable European jurisdictions) in compliance with the Children&rsquo;s Online Privacy Protection Act (COPPA) and Article 8 of the GDPR.
              </p>
              <p>
                When parents design birthday cards celebrating a minor child, all information is provided under parental supervision and consent. If you believe a minor has submitted personal data without parental authorization, please contact us for immediate deletion.
              </p>
            </section>

            {/* 9. Contact Information */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>9. How to Contact Our Privacy Desk</h2>
              </div>
              <p>
                If you have questions, feedback, or concerns regarding our privacy practices, cookie controls, or data governance, please reach out to:
              </p>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1 text-xs sm:text-sm">
                <p><strong>Cardzy Digital Solutions</strong></p>
                <p><strong>Privacy Email:</strong> <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">cardzyonline@gmail.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">cardzy.online/contact</Link></p>
                <p><strong>WhatsApp Support:</strong> +92 309 3518796</p>
                <p><strong>HQ:</strong> Islamabad / Rawalpindi, Pakistan</p>
                <p><strong>Response Time:</strong> Within 24–48 business hours</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
