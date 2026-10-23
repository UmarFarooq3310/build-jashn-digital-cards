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
              Cardzy offers interactive 3D digital wish cards, wedding invitation landing pages with real-time WhatsApp RSVP tracking, and executive digital visiting cards (vCards). All tools and card generators made available through Cardzy are intended to facilitate personal joy, family communication, and modern digital networking.
            </p>
            <p>
              While we strive for 99.9% uptime, optimal responsive layouts, and universal cross-device audio-visual compatibility, we cannot guarantee that every browser, mobile operating system, or email client will render animations, web audio codecs, or background music autoplay identically. Modern browsers (such as Safari, Chrome, and Firefox) implement strict autoplay policies requiring user gestures before audio playback can begin.
            </p>
            <p>
              All event logistics, dates, venue locations, couple names, and customized family messages uploaded into Cardzy are the sole responsibility of the card creator or host. Cardzy acts solely as a technological canvas and hosting conduit for user-configured celebrations.
            </p>
          </div>
        </section>

        {/* Section 2: User-Generated Content & Event Logistics */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg sm:text-xl">
            <BookOpen className="size-5 shrink-0" />
            <h2>2. User-Generated Content &amp; Event Logistics Accuracy</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Users have the capability to create personalized digital cards containing custom photographs, celebratory greetings, poetry verses, venue coordinates, schedule details, and RSVP links. Cardzy does not pre-screen or verify the accuracy of dates, banquet hall addresses, telephone contacts, or personal declarations entered by users.
            </p>
            <p>
              Event organizers, wedding hosts, and card senders bear full responsibility for confirming the accuracy of their wedding itineraries, Nikkah timings, dinner reservations, and dress code directions prior to dispatching links to invitees. Cardzy assumes no liability for missed events, scheduling conflicts, venue misdirection, or incorrect contact details inputted into digital cards.
            </p>
            <p>
              Cardzy strictly prohibits the dissemination of unlawful, defamatory, fraudulent, impersonating, or abusive content through its cards. Any card reported and verified to violate our Acceptable Use standards is subject to immediate deactivation without notice.
            </p>
          </div>
        </section>

        {/* Section 3: Audio, Typography & Media Intellectual Property */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-extrabold text-lg sm:text-xl">
            <Award className="size-5 shrink-0" />
            <h2>3. Audio, Typography &amp; Creative Media Intellectual Property</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              The platform provides curated selections of royalty-free background music, ambient celebration melodies, and cultural instrumental tracks. These audio assets are licensed or synthesized for personal, non-commercial celebration streaming within the Cardzy card viewer. Cardzy does not claim ownership of third-party musical compositions or classical poetry verses whose public domain status or licensing permits fair cultural use.
            </p>
            <p>
              Classical Urdu and Eastern literary poetry (including couplets by Allama Iqbal, Mirza Ghalib, Faiz Ahmed Faiz, and Mian Muhammad Bakhsh) included in our curated poetry treasury are published for cultural appreciation, educational preservation, and personal greeting usage. If you are a copyright owner or authorized representative and believe that any media, typography, or poetry selection infringes your intellectual property rights, please contact our designated agent at <a href="mailto:cardzyonline@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">cardzyonline@gmail.com</a> with comprehensive DMCA-compliant notice details for swift investigation and resolution.
            </p>
          </div>
        </section>

        {/* Section 4: External Links & Third-Party Services */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-extrabold text-lg sm:text-xl">
            <ExternalLink className="size-5 shrink-0" />
            <h2>4. External Links &amp; Third-Party Services</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Our website, articles, and celebration guides contain links to external third-party services (such as WhatsApp, Google Maps, venue catering services, and social media platforms). In some instances, we may participate in affiliate programs where we earn a commission on qualifying referrals at no extra cost to you.
            </p>
            <p>
              Cardzy has no control over the content, privacy practices, terms of service, or operational uptime of third-party platforms. When you click an external link, you leave Cardzy and are subject to the independent policies of that external website. We strongly encourage users to review the privacy statements of any external service they visit.
            </p>
            <p>
              Mapping services and route directions are embedded using Google Maps API or direct URL schemes. Route accuracy, traffic data, and geographic representations are provided solely by the mapping provider and may vary based on actual roadway conditions.
            </p>
          </div>
        </section>

        {/* Section 5: Google AdSense & Family-Safe Policy Commitment */}
        <section className="rounded-3xl border border-emerald-500/40 bg-emerald-950/10 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-lg sm:text-xl">
            <ShieldCheck className="size-5 shrink-0" />
            <h2>5. Google AdSense &amp; Family-Safe Policy Commitment</h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-foreground/90 leading-relaxed">
            <p className="font-semibold text-emerald-900 dark:text-emerald-300 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              Cardzy complies strictly with Google Publisher Policies, ensuring 100% original, safe, and family-friendly event planning content across all pages.
            </p>
            <p className="text-muted-foreground">
              We utilize Google AdSense to serve advertisements on select public pages. Google, as a third-party vendor, uses cookies (such as DART cookies and advertising identifiers) to serve ads based on your prior visits to our website or other sites on the Internet. We do not publish, host, or link to adult content, copyrighted material, dangerous products, deceptive advertising, or hate speech.
            </p>
            <p className="text-muted-foreground">
              Visitors may opt out of personalized advertising by visiting Google&rsquo;s Ads Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">adssettings.google.com</a>) or via the Network Advertising Initiative opt-out page. We respect user privacy preferences through Google Consent Mode v2 implementation.
            </p>
          </div>
        </section>

        {/* Section 6: Automated Translations & Multilingual Availability */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-teal-600 dark:text-teal-400 font-extrabold text-lg sm:text-xl">
            <BookOpen className="size-5 shrink-0" />
            <h2>6. Multilingual Translation &amp; Linguistic Disclaimer</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Cardzy offers multi-language support across dozens of world languages, including Urdu, Arabic, English, Hindi, Spanish, French, Chinese, and Turkish. While our core interfaces and wording guides have been translated with care, localized idioms, regional cultural variations, or automated transliteration nuances may exist.
            </p>
            <p>
              Users are advised to review translated text prior to dispatching official invitations to ensure appropriateness for their specific cultural, familial, and religious traditions. Cardzy provides open editable text fields across all card generators so users can fine-tune every phrasing to match their bespoke needs.
            </p>
          </div>
        </section>

        {/* Section 7: Limitation of Liability */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-extrabold text-lg sm:text-xl">
            <Lock className="size-5 shrink-0" />
            <h2>7. Limitation of Liability</h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Cardzy is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express, statutory, or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
            </p>
            <p>
              To the fullest extent permissible by applicable law, Cardzy, its founders, directors, employees, affiliates, and editorial authors shall not be liable for any indirect, incidental, special, punitive, exemplary, or consequential damages resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your access to, use of, or inability to access or use our digital cards and RSVP tools;</li>
              <li>Any unauthorized access to, alteration of, or disclosure of card data or guest submissions;</li>
              <li>Any temporary server maintenance, unexpected downtime, network disruptions, or communication latency;</li>
              <li>Any errors, omissions, or inaccuracies in user-provided event information or mapping directions.</li>
            </ul>
          </div>
        </section>

        {/* Section 8: Contact & Inquiries */}
        <section className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-extrabold text-lg sm:text-xl">
            <Mail className="size-5 shrink-0" />
            <h2>8. Contact &amp; Legal Inquiries</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            If you have questions regarding this Disclaimer, intellectual property policies, or content concerns, our compliance team is here to assist you:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-bold pt-2">
            <a href="mailto:cardzyonline@gmail.com" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-card px-4 py-2.5 text-foreground hover:bg-emerald-500/10 transition-colors shadow-2xs">
              ✉️ cardzyonline@gmail.com
            </a>
            <a href="https://api.whatsapp.com/send?phone=923093518796" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-600 text-white px-4 py-2.5 hover:bg-emerald-700 transition-colors shadow-2xs">
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
