'use client'

import Link from 'next/link'
import {
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Lock,
  Mail,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function DisclaimerPage() {
  const { lang } = useLang()
  const isRtl = lang === 'ur' || lang === 'ar'

  return (
    <main className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full ${isRtl ? 'dir-rtl' : ''}`}>
      <Breadcrumbs items={[{ label: 'Disclaimer', href: '/disclaimer' }]} />

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 mt-4 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <ShieldAlert className="size-3.5" /> Official Legal Notice
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Website &amp; Digital Services Disclaimer
        </h1>

        <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
          Last updated: August 20, 2026
        </p>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
          The information, interactive celebration templates, and digital card generation services provided by Cardzy (https://cardzy.online) are intended for general personal celebration, family announcements, and professional digital networking purposes. By accessing or using our platform, you acknowledge and agree to the terms outlined in this Disclaimer.
        </p>
      </div>

      <div className="space-y-8 text-foreground">
        {/* Section 1: Website & Digital Invitation Service Terms */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-extrabold text-lg sm:text-xl">
            <Sparkles className="size-5 shrink-0" />
            <h2>1. Website &amp; Digital Invitation Service Terms</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Cardzy offers interactive 3D digital wish cards, wedding invitation landing pages with real-time WhatsApp RSVP tracking, and executive digital visiting cards (vCards).
            </p>
            <p>
              While we strive for 99.9% uptime, optimal responsive layouts, and universal cross-device audio-visual compatibility, we cannot guarantee that every browser or device operating system will render animations or audio autoplay identically due to device-specific browser autoplay security policies.
            </p>
            <p>
              All event logistics, dates, venue locations, couple names, and customized family messages uploaded into Cardzy are the sole responsibility of the card creator or host.
            </p>
          </div>
        </section>

        {/* Section 2: External Links & Third-Party Disclaimer */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-extrabold text-lg sm:text-xl">
            <ExternalLink className="size-5 shrink-0" />
            <h2>2. External Links &amp; Third-Party Disclaimer</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Our website, articles, and celebration guides contain links to external third-party services (such as WhatsApp, Google Maps, venue catering services, and social media platforms). In some instances, we may participate in affiliate programs where we earn a commission on qualifying referrals at no extra cost to you.
            </p>
            <p>
              Cardzy has no control over the content, privacy practices, or uptime of third-party platforms. When you click an external link, you leave Cardzy and are subject to the policies of that external website.
            </p>
          </div>
        </section>

        {/* Section 3: Google AdSense & Family-Safe Policy Commitment */}
        <section className="rounded-3xl border border-emerald-500/40 bg-emerald-950/10 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-lg sm:text-xl">
            <ShieldCheck className="size-5 shrink-0" />
            <h2>3. Google AdSense &amp; Family-Safe Policy Commitment</h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-foreground/90 leading-relaxed">
            <p className="font-semibold text-emerald-900 dark:text-emerald-300 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              Cardzy complies strictly with Google Publisher Policies, ensuring 100% original, safe, and family-friendly event planning content.
            </p>
            <p className="text-muted-foreground">
              We utilize Google AdSense to serve advertisements on select public pages. Google, as a third-party vendor, uses cookies (such as DART cookies) to serve ads based on your prior visits to our website or other sites on the Internet. We do not publish, host, or link to adult content, copyrighted material, dangerous products, or deceptive advertising.
            </p>
          </div>
        </section>

        {/* Section 4: Limitation of Liability */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-extrabold text-lg sm:text-xl">
            <Lock className="size-5 shrink-0" />
            <h2>4. Limitation of Liability</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Cardzy is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.
            </p>
            <p>
              To the fullest extent permissible by applicable law, Cardzy, its founders, and editorial authors shall not be liable for any indirect, incidental, or consequential damages resulting from your use of, or inability to use, our digital cards, RSVP tracking tools, or shared links.
            </p>
          </div>
        </section>

        {/* Section 5: Contact & Inquiries */}
        <section className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-extrabold text-lg sm:text-xl">
            <Mail className="size-5 shrink-0" />
            <h2>5. Contact &amp; Legal Inquiries</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            If you have questions regarding this Disclaimer or intellectual property policies, please contact our team:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-bold pt-2">
            <a href="mailto:cardzyonline@gmail.com" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-card px-4 py-2.5 text-foreground hover:bg-emerald-500/10 transition-colors shadow-2xs">
              ✉️ cardzyonline@gmail.com
            </a>
            <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-600 text-white px-4 py-2.5 hover:bg-emerald-700 transition-colors shadow-2xs">
              💬 WhatsApp Support: +92 309 3518796
            </a>
            <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-foreground hover:bg-secondary transition-colors shadow-2xs">
              🛡️ Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-foreground hover:bg-secondary transition-colors shadow-2xs">
              📜 Terms of Service
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
