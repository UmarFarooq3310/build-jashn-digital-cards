import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ShieldAlert, CheckCircle2, HelpCircle, Mail, Globe, Scale } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service | Cardzy',
  description:
    "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
  alternates: getPageAlternates('/terms-of-service'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Terms of Service | Cardzy',
    description:
      "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
    url: 'https://cardzy.online/terms-of-service',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Cardzy',
    description:
      "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service — Cardzy',
  url: 'https://cardzy.online/terms-of-service',
  description:
    'Terms of Service governing the use of Cardzy digital wish cards, wedding invitations, and smart visiting cards.',
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms-of-service' }]} />

          {/* Header Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 mt-4 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              <Scale className="size-3.5" /> Legal Terms &amp; Conditions
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Terms of Service for cardzy.online
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last updated: August 20, 2026 &nbsp;·&nbsp; Effective immediately
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              These Terms of Service govern your access to and use of the website <strong className="text-foreground">cardzy.online</strong>, operated by <strong className="text-foreground">Cardzy Digital Solutions</strong>. By using this website and creating or viewing digital cards and invitations, you accept and agree to be bound by these terms.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

            {/* 1. Acceptance of Terms */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>1. Acceptance of Terms &amp; Scope of Agreement</h2>
              </div>
              <p>
                By visiting, accessing, browsing, or utilizing <strong className="text-foreground">Cardzy (cardzy.online)</strong>, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service, our{' '}
                <Link href="/privacy-policy" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                  Privacy Policy
                </Link>{' '}
                and our{' '}
                <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                  Cookie Policy
                </Link>.
                These terms constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Host&rdquo;, or &ldquo;Recipient&rdquo;) and Cardzy Digital Solutions. If you do not accept these terms in their entirety, you must immediately terminate access to our website and cease using our digital card creation tools.
              </p>
              <p>
                We reserve the right to update or modify these Terms of Service at any time without prior written notice. Changes become effective immediately upon posting to this page with an updated &ldquo;Last updated&rdquo; timestamp. Continued utilization of our platform following revisions indicates your explicit concurrence with the updated terms.
              </p>
            </section>

            {/* 2. Nature of Service & Account-Free Architecture */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <FileText className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>2. Nature of Service &amp; Zero-Signup Card Architecture</h2>
              </div>
              <p>
                Cardzy provides an intuitive web-based suite for designing and sharing interactive celebration cards, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Wish &amp; Greeting Cards:</strong> Interactive 3D cards with virtual envelopes, festive confetti, background music, and personal dedications for birthdays, Eid, anniversaries, and holidays.</li>
                <li><strong className="text-foreground">Wedding &amp; Event Invitations:</strong> Responsive digital invitation landing pages featuring event itineraries, venue map pins, bilingual calligraphy headers, and real-time WhatsApp RSVP tracking.</li>
                <li><strong className="text-foreground">Smart Visiting Cards (vCards):</strong> Executive networking cards with direct WhatsApp contact buttons, social handles, phone dials, and downloadable .vcf address book integration.</li>
                <li><strong className="text-foreground">Magic Link Cards:</strong> Dynamic URL-encoded cards that render client-side without requiring recipient app installations or account creation.</li>
              </ul>
              <p className="pt-1">
                Cardzy is built upon a frictionless, privacy-first foundation. Most card generation workflows do not require user account registration. Data entered into transient generator sessions is stored client-side in your browser’s local storage until published or exported. Published invitation records are maintained to deliver live links to your guests.
              </p>
            </section>

            {/* 3. User Content & Intellectual Property Rights */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Scale className="size-5 text-amber-600 dark:text-amber-400" />
                <h2>3. User-Submitted Content &amp; Intellectual Property Rights</h2>
              </div>
              <p>
                You retain complete ownership of all personal photographs, family greetings, event descriptions, host names, and creative messages that you input or upload to create digital cards on Cardzy.
              </p>
              <p>
                By publishing or generating a digital card through our service, you grant Cardzy a non-exclusive, worldwide, royalty-free license to host, cache, render, display, and transmit your card content solely for the purpose of serving your digital card webpage to you and your designated recipients. We do not sell, repurpose, or distribute your private event photographs or personal family messages for marketing purposes without your prior consent.
              </p>
              <p>
                You represent and warrant that you possess all requisite rights, licenses, and permissions for any images, graphics, audio, or text you incorporate into your cards, and that your submissions do not infringe upon any third-party intellectual property or privacy rights.
              </p>
            </section>

            {/* 4. Acceptable Use Policy */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <ShieldAlert className="size-5 text-rose-600 dark:text-rose-400" />
                <h2>4. Acceptable Use Policy &amp; Prohibited Conduct</h2>
              </div>
              <p>
                Cardzy is strictly maintained as a family-friendly, celebratory platform. In order to preserve the safety, integrity, and reputation of our service and all participating communities, you agree not to use Cardzy to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create, transmit, or share cards containing hateful, violent, discriminatory, defamatory, pornographic, sexually suggestive, or harassing language or imagery;</li>
                <li>Impersonate any public figure, corporate entity, or third party with fraudulent or deceptive intent;</li>
                <li>Conduct unsolicited bulk commercial messaging, promotional spam, phishing, or financial solicitations;</li>
                <li>Upload or distribute malicious code, automated bots, scrapers, viruses, or scripts intended to disrupt platform infrastructure;</li>
                <li>Circumvent or attempt to tamper with our digital access controls, security mechanisms, or rate-limiting safeguards;</li>
                <li>Publish sensitive personal identification data (such as bank details, government ID numbers, or private medical records) without lawful authorization.</li>
              </ul>
              <p className="pt-1">
                Cardzy reserves the right, at its sole discretion and without liability, to review, disable, or delete any card or link found in violation of this Acceptable Use Policy, and to block offending IP addresses.
              </p>
            </section>

            {/* 5. Service Availability & "As Is" Operations */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Globe className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>5. Service Provided &ldquo;As Is&rdquo; &amp; Uptime Disclaimers</h2>
              </div>
              <p>
                Cardzy and its associated digital invitation tools are provided on an <strong className="text-foreground">&ldquo;as is&rdquo;</strong> and <strong className="text-foreground">&ldquo;as available&rdquo;</strong> basis.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>While we maintain robust server infrastructure and global content delivery networks, we do not warrant or guarantee uninterrupted 100% uptime, immediate server response times, or absolute data permanence.</li>
                <li>We make no warranties regarding the accuracy or suitability of mapping coordinates, venue navigation links, or network latency during peak wedding seasons.</li>
                <li>We reserve the right to perform routine system upgrades, maintenance windows, server migrations, and feature deprecations as necessary to sustain platform health.</li>
              </ul>
            </section>

            {/* 6. Third-Party Integrations */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Globe className="size-5 text-blue-600 dark:text-blue-400" />
                <h2>6. Third-Party Integrations (WhatsApp, Google Maps, AdSense)</h2>
              </div>
              <p>
                Our services seamlessly interface with external platforms to enhance functionality, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">WhatsApp API:</strong> Cardzy utilizes standard WhatsApp URL click-to-chat protocols to facilitate instant RSVP message composition and card link dispatching. Cardzy does not inspect, read, or store WhatsApp end-to-end encrypted private messages exchanged between hosts and guests.</li>
                <li><strong className="text-foreground">Google Maps &amp; Navigation:</strong> Venue directions rely on Google Maps endpoints. Cardzy is not responsible for routing deviations or geographic errors occurring within the mapping service.</li>
                <li><strong className="text-foreground">Google AdSense:</strong> We display non-intrusive advertisements on select public pages in compliance with Google Publisher Policies. Third-party advertising partners may place cookies subject to your consent choices.</li>
              </ul>
            </section>

            {/* 7. Limitation of Liability */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Scale className="size-5 text-amber-600 dark:text-amber-400" />
                <h2>7. Limitation of Liability</h2>
              </div>
              <p>
                To the maximum extent permitted by applicable law, Cardzy Digital Solutions, its founders, officers, employees, contributors, and service partners shall not be held liable for any indirect, incidental, special, exemplary, consequential, or punitive damages whatsoever, including without limitation:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of event attendance, missed RSVP notices, or scheduling confusion;</li>
                <li>Loss of profits, revenue, reputation, or personal data;</li>
                <li>Technical interruptions, corrupted video exports, or audio playback failures on third-party mobile browsers;</li>
                <li>Unauthorized third-party access, alteration, or interception of shared web links.</li>
              </ul>
              <p className="pt-1">
                In no event shall Cardzy&rsquo;s aggregate liability arising out of or related to these terms exceed the total amount actually paid by you to Cardzy in the preceding six (6) months, or USD $50.00, whichever is less.
              </p>
            </section>

            {/* 8. Indemnification */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <ShieldAlert className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>8. Indemnification</h2>
              </div>
              <p>
                You agree to defend, indemnify, and hold harmless Cardzy Digital Solutions, its officers, directors, contractors, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your access to or use of the platform; (b) your violation of these Terms of Service; (c) any content you upload, publish, or transmit through our card generators; or (d) your infringement of any third-party intellectual property or privacy right.
              </p>
            </section>

            {/* 9. Governing Law & Dispute Resolution */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Scale className="size-5 text-indigo-600 dark:text-indigo-400" />
                <h2>9. Governing Law &amp; Dispute Resolution</h2>
              </div>
              <p>
                These Terms of Service and any disputes arising out of or relating to your use of Cardzy shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles.
              </p>
              <p>
                Any legal action, proceeding, or dispute that cannot be resolved amicably through good-faith informal consultation shall be submitted to the exclusive jurisdiction of the competent courts of Islamabad / Rawalpindi, Pakistan.
              </p>
            </section>

            {/* 10. Contact Information */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>10. Contact Details for Legal Inquiries</h2>
              </div>
              <p>
                If you have questions, inquiries, or legal concerns regarding these Terms of Service, please reach out to our team:
              </p>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1 text-xs sm:text-sm">
                <p><strong>Entity:</strong> Cardzy Digital Solutions</p>
                <p><strong>Support &amp; Legal Desk:</strong> <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">cardzyonline@gmail.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">cardzy.online/contact</Link></p>
                <p><strong>WhatsApp Support:</strong> +92 309 3518796</p>
                <p><strong>Operating HQ:</strong> Islamabad / Rawalpindi, Pakistan</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
