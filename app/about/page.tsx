import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Users,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'About Us | Cardzy',
  description:
    'Cardzy Digital Solutions provides interactive 3D digital wish cards, wedding invitations with WhatsApp RSVP management, and smart digital visiting cards (vCards) in 18 languages.',
  alternates: { canonical: 'https://cardzy.online/about' },
  robots: { index: true, follow: true },
}

// ── Organization Structured Data ─────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cardzy Digital Solutions',
  url: 'https://cardzy.online',
  logo: 'https://cardzy.online/favicon.svg',
  description:
    'Cardzy Digital Solutions is a digital celebration and event technology platform providing 3D-animated greeting cards, online wedding invitations with automated WhatsApp RSVP tracking, and paperless digital visiting cards across 18 languages.',
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
  },
  email: 'cardzyonline@gmail.com',
  telephone: '+923093518796',
  sameAs: [
    'https://www.instagram.com/cardzyonline',
    'https://www.tiktok.com/@cardzyonline',
    'https://www.facebook.com/share/1bPTaFnxDz/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'cardzyonline@gmail.com',
      availableLanguage: ['English', 'Urdu'],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        {/* ── Hero / Header ─────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'About Us', href: '/about' }]} />
            <div className="mt-6 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
                <Sparkles className="size-3.5 text-amber-400" /> Welcome to Cardzy
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                About Cardzy Digital Solutions
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-emerald-100/90 max-w-2xl mx-auto">
                Transforming how families, couples, and professionals celebrate milestone moments worldwide through 
                interactive animated invitations, 3D greeting cards, and automated WhatsApp RSVP management.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mission Section ───────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-card border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                At <strong className="text-foreground">Cardzy Digital Solutions</strong>, our mission is to make personal greetings 
                and event planning instantaneous, environmentally sustainable, and deeply engaging. We bridge the gap between impersonal 
                text messages and traditional paper cards by offering <strong className="text-foreground">animated digital invitations, 
                interactive 3D greeting cards, and automated WhatsApp RSVP tracking</strong> that can be shared in seconds across the globe.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Whether planning a wedding (Nikkah, Mehndi, Barat, Walima), celebrating a birthday or anniversary, or sharing festive greetings 
                for Eid, Diwali, or New Year, Cardzy empowers hosts and creators to deliver memorable experiences without the high costs, delays, 
                or environmental waste of physical paper printing.
              </p>
            </div>

            {/* Core Offerings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
                <div className="size-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">3D Animated Wish Cards</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Interactive greeting cards with customizable background music, recipient names, and festive visual effects across 35+ cultural and religious occasions.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
                <div className="size-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Mail className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">Wedding Invitations &amp; RSVP</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Complete digital event invitation websites featuring automated WhatsApp RSVP tracking, Google Maps venue navigation, and countdown timers.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
                <div className="size-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <Globe className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">Smart Digital Visiting Cards</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Executive paperless vCards with instant QR code sharing and one-tap contact downloads for entrepreneurs, doctors, and professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values Section ────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Our Core Values &amp; Commitments
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Cardzy is built upon three foundational pillars designed to protect users, families, and our planet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Value 1: Family-Safe */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
                <div className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <HeartHandshake className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Family-Safe Technology</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We are deeply committed to maintaining a wholesome, family-friendly platform. Every template, message, and advertisement is vetted to ensure suitability for audiences of all ages and cultures.
                </p>
              </div>

              {/* Value 2: Privacy-First */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
                <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Privacy-First Architecture</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We collect only the minimum data required to deliver invitations and cards. We never sell user data, and our ad systems strictly implement Google Consent Mode v2 and transparent GDPR cookie preferences.
                </p>
              </div>

              {/* Value 3: Paperless Sustainability */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
                <div className="size-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Leaf className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Paperless &amp; Sustainable</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  By replacing traditional paper cards with digital interactive greetings, Cardzy helps save thousands of trees, prevents toxic ink waste, and eliminates the carbon footprint of mail transport.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Serve Section ──────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Serving Global Celebrations in 18 Languages
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Cardzy is proudly engineered to serve diaspora communities and international celebrants across Pakistan, 
              India, the United Arab Emirates, the United Kingdom, the United States, Canada, and Australia, with full RTL 
              and Urdu Nastaliq font rendering alongside multilingual support for 18 languages.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                'Couples organizing wedding celebrations with live WhatsApp RSVP tracking',
                'Families sending personalized Eid Mubarak, Ramadan & festive greetings',
                'Event organizers and wedding planners coordinating guest lists and directions',
                'Business owners and executives sharing eco-friendly smart digital visiting cards',
                'Individuals sending birthday, anniversary, and graduation congratulations',
                'Global diaspora communities staying connected across borders and time zones',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Direct Contact & Trust Information ────────────────────── */}
        <section className="py-12 md:py-16 bg-muted/40 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-xs">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  Direct Business &amp; Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Need to speak with our team? Cardzy Digital Solutions is committed to providing prompt, transparent communication.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold">Entity Name</span>
                  <p className="font-bold text-foreground">Cardzy Digital Solutions</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold">Support Email</span>
                  <p>
                    <a href="mailto:cardzyonline@gmail.com" className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                      cardzyonline@gmail.com
                    </a>
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold">Response Time</span>
                  <p className="font-bold text-foreground">Within 24–48 business hours</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-3 min-h-[48px] transition-colors"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-3 min-h-[48px] underline underline-offset-4"
                >
                  <Lock className="size-3.5" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/cookies"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-3 min-h-[48px] underline underline-offset-4"
                >
                  <span>Cookie Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
