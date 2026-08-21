import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ShieldAlert, CheckCircle2, HelpCircle, Mail, Globe, Scale } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Service | Cardzy',
  description:
    "Review Cardzy's Terms of Service, acceptable use guidelines, limitation of liability, and service agreement for digital invitations.",
  alternates: { canonical: 'https://cardzy.online/terms-of-service' },
  robots: { index: true, follow: true },
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
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p>
                By visiting, accessing, or using <strong className="text-foreground">Cardzy (cardzy.online)</strong>, you agree to comply with and be legally bound by these Terms of Service and our{' '}
                <Link href="/privacy-policy" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                  Cookie Policy
                </Link>.
                If you do not agree to these terms, please discontinue use of our service immediately.
              </p>
            </section>

            {/* 2. Nature of Service & "As Is" Disclaimer */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <ShieldAlert className="size-5 text-amber-600 dark:text-amber-400" />
                <h2>2. Service Provided &ldquo;As Is&rdquo; &amp; No Uptime Guarantee</h2>
              </div>
              <p>
                This website and its card generation tools are provided strictly on an <strong className="text-foreground">&ldquo;as is&rdquo;</strong> and <strong className="text-foreground">&ldquo;as available&rdquo;</strong> basis for informational, celebratory, and personal communication purposes.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We make reasonable commercial efforts to ensure service availability, but we do not warrant or guarantee uninterrupted uptime, bug-free operation, or absolute data permanence.</li>
                <li>We do not guarantee the absolute accuracy, completeness, or timeliness of user-generated card text, host RSVP responses, or third-party mapping data.</li>
                <li>We reserve the right to modify, suspend, or discontinue any feature of the platform at any time without prior notice.</li>
              </ul>
            </section>

            {/* 3. Third-Party Links & External Services */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Globe className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>3. Third-Party Links &amp; External Services</h2>
              </div>
              <p>
                Cardzy may contain links or integrations with third-party websites and services, including WhatsApp (for RSVP messaging), Google Maps (for event venue pins), and Google AdSense (for advertising delivery).
              </p>
              <p>
                We do not endorse, control, or assume responsibility for the content, privacy practices, or service quality of any third-party websites or external platforms. Accessing external links is solely at your own risk.
              </p>
            </section>

            {/* 4. Acceptable Use & Content Guidelines */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <FileText className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>4. Acceptable Use Policy</h2>
              </div>
              <p>
                Cardzy is dedicated to providing family-friendly celebration technology. When using our tools, you agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Create, transmit, or share any abusive, hateful, defamatory, obscene, fraudulent, or unlawful content.</li>
                <li>Impersonate any individual, organization, or entity without legal authorization.</li>
                <li>Attempt to compromise system security, scrape data, or launch denial-of-service attacks.</li>
                <li>Use our invitation or greeting tools to transmit unsolicited commercial spam.</li>
              </ul>
              <p className="pt-1">
                We reserve the right to remove any violating content and terminate accounts that breach these standards.
              </p>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Scale className="size-5 text-amber-600 dark:text-amber-400" />
                <h2>5. Limitation of Liability</h2>
              </div>
              <p>
                To the maximum extent permitted by applicable law, Cardzy Digital Solutions, its officers, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, our service, digital cards, or RSVP tools.
              </p>
            </section>

            {/* 6. Contact Information */}
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
                <Mail className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h2>6. Contact Details for Legal Inquiries</h2>
              </div>
              <p>
                If you have questions regarding these Terms of Service, please contact us:
              </p>
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1 text-xs sm:text-sm">
                <p><strong>Entity:</strong> Cardzy Digital Solutions</p>
                <p><strong>Support Email:</strong> <a href="mailto:cardzyonline@gmail.com" className="text-emerald-700 dark:text-emerald-400 underline">cardzyonline@gmail.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 underline">cardzy.online/contact</Link></p>
                <p><strong>HQ:</strong> Islamabad / Rawalpindi, Pakistan</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
