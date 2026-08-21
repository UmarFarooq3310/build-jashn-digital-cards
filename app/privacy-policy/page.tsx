import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, Megaphone, FileText, CheckCircle, ExternalLink, Mail, MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cardzy',
  description:
    'Read the Cardzy Privacy Policy. Learn how Cardzy Digital Solutions collects, uses, and protects personal data, and how Google AdSense uses cookies for advertising.',
  alternates: { canonical: 'https://cardzy.online/privacy-policy' },
  robots: { index: true, follow: true },
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
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-1"
                  >
                    Google Ad Settings <ExternalLink className="size-3.5" />
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-1"
                  >
                    aboutads.info choices <ExternalLink className="size-3.5" />
                  </a>.
                </li>
                <li>
                  <strong className="text-foreground">Google Consent Mode v2:</strong> We implement Google Consent Mode v2. If you decline advertising cookies via our cookie consent banner, non-personalized contextual ads are served without setting ad tracking cookies on your device.
                </li>
              </ul>
            </section>

            {/* 3. Data We Collect */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Eye className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>3. Data We Collect</h2>
              </div>
              <p>We collect only the minimum information necessary to deliver our services:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Contact Form Submissions:</strong> When you contact us via <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline">our contact form</Link> or email, we collect your name, email address, inquiry subject, and message content to respond to your support request.
                </li>
                <li>
                  <strong className="text-foreground">Card &amp; Invitation Content:</strong> Names, occasion greetings, event details, and RSVP configurations entered by hosts to generate digital cards.
                </li>
                <li>
                  <strong className="text-foreground">Basic Analytics &amp; Performance:</strong> Anonymous page views, performance metrics, and aggregated traffic analytics (if enabled by you) to maintain server health and improve user experience.
                </li>
                <li>
                  <strong className="text-foreground">Advertising Identifiers:</strong> Anonymous advertising cookie IDs processed by Google AdSense and accredited third-party ad networks.
                </li>
              </ul>
            </section>

            {/* 4. User Choices & Cookie Control */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Lock className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>4. Your Choices &amp; Managing Cookies</h2>
              </div>
              <p>You have full control over your privacy and cookie settings:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Cookie Consent Banner:</strong> You can accept or decline non-essential cookies via our floating cookie banner or bottom footer link at any time.
                </li>
                <li>
                  <strong className="text-foreground">Browser Settings:</strong> You can configure your browser (Chrome, Safari, Firefox, Edge) to block or delete cookies entirely. Please note that essential functions like language preference may require cookies.
                </li>
                <li>
                  <strong className="text-foreground">Ad Personalization:</strong> Manage your ad preferences directly via{' '}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 underline">
                    Google Ad Settings
                  </a>.
                </li>
              </ul>
              <p className="pt-2">
                For detailed information on the specific cookies we use, please review our dedicated{' '}
                <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 font-bold underline">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            {/* 5. Rights for UK, EU, and Global Visitors (GDPR) */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>5. Rights of UK / EU &amp; International Users</h2>
              </div>
              <p>
                If you are located in the United Kingdom, European Union (under GDPR), or other jurisdictions with data protection laws, you possess legal rights regarding your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Right to access the personal information we hold about you.</li>
                <li>Right to request rectification of inaccurate data.</li>
                <li>Right to request complete erasure (&ldquo;right to be forgotten&rdquo;) of your account or cards.</li>
                <li>Right to restrict or object to certain data processing activities.</li>
                <li>Right to data portability.</li>
              </ul>
              <p className="pt-1">
                To exercise any of these rights, email us at <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">cardzyonline@gmail.com</a>. We will process your request within 30 days free of charge.
              </p>
            </section>

            {/* 6. Contact Information */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>6. How to Contact Us</h2>
              </div>
              <p>
                If you have questions, feedback, or concerns regarding our privacy practices or advertising policies, please reach out to:
              </p>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1 text-xs sm:text-sm">
                <p><strong>Cardzy Digital Solutions</strong></p>
                <p><strong>Support Email:</strong> <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 underline">cardzyonline@gmail.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline">cardzy.online/contact</Link></p>
                <p><strong>Response Time:</strong> Within 24–48 business hours</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
