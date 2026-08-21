'use client'

import Link from 'next/link'
import {
  Sparkles,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { useLang } from '@/lib/lang/context'
import { ABOUT_T, pt } from '@/lib/lang/page-translations'

export function AboutClientContent() {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <main className={`min-h-screen bg-background ${isUrdu ? 'font-urdu' : ''}`}>
      {/* ── Hero / Header ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: pt(ABOUT_T.heroTitle, lang), href: '/about' }]} />
          <div className="mt-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5 text-amber-400" /> {pt(ABOUT_T.welcomeBadge, lang)}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {pt(ABOUT_T.heroTitle, lang)}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-emerald-100/90 max-w-2xl mx-auto">
              {pt(ABOUT_T.heroSubtitle, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission Section ───────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-card border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {pt(ABOUT_T.missionTitle, lang)}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {pt(ABOUT_T.missionText1, lang)}
            </p>
          </div>

          {/* Core Offerings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
              <div className="size-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">{pt(ABOUT_T.offering1Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.offering1Desc, lang)}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
              <div className="size-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Mail className="size-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">{pt(ABOUT_T.offering2Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.offering2Desc, lang)}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 space-y-3 shadow-2xs">
              <div className="size-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Globe className="size-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">{pt(ABOUT_T.offering3Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.offering3Desc, lang)}
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
              {pt(ABOUT_T.valuesTitle, lang)}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Cardzy is built upon foundational principles designed to protect users, families, and our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1: Family-Safe */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
              <div className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <HeartHandshake className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{pt(ABOUT_T.val1Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.val1Desc, lang)}
              </p>
            </div>

            {/* Value 2: Privacy-First */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
              <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{pt(ABOUT_T.val2Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.val2Desc, lang)}
              </p>
            </div>

            {/* Value 3: Paperless Sustainability */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3.5 shadow-2xs">
              <div className="size-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Leaf className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{pt(ABOUT_T.val3Title, lang)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pt(ABOUT_T.val3Desc, lang)}
              </p>
            </div>
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
                href="/create-wish"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-3 min-h-[48px] transition-colors"
              >
                <span>{pt(ABOUT_T.ctaWishBtn, lang)}</span>
              </Link>
              <Link
                href="/create-invitation"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-bold px-5 py-3 min-h-[48px] transition-colors"
              >
                <span>{pt(ABOUT_T.ctaInviteBtn, lang)}</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-3 min-h-[48px] underline underline-offset-4"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
