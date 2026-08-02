import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { GuideClientContent } from './guide-content'

export const metadata: Metadata = {
  title: 'Celebration Guides & Wording Ideas — Cardzy Digital Cards',
  description:
    'Explore our collection of expert guides for designing digital invitations, animated wish cards, wedding invitations, Eid greetings, and more. Find wording templates and tips for every occasion.',
  alternates: {
    canonical: 'https://cardzy.online/guide',
  },
  keywords: [
    'digital invitation templates',
    'Eid Mubarak wishes wording',
    'wedding card design guides',
    'multilingual digital cards',
    'how to design invitation cards',
    'birthday card wording ideas',
  ],
}

export default function GuideIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20 max-w-5xl mx-auto px-4 w-full">
        <GuideClientContent />

        {/* Premium Guide Overview Card */}
        <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-left space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3.5" /> Learning Hub Overview
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Comprehensive Digital Card & Invitation Guides — Cardzy
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Welcome to the Cardzy Celebration Guide Hub. Whether you are planning a traditional South Asian wedding with Nikkah, Mehndi, Barat, and Walima events, or sending animated Eid Mubarak greetings to family across the globe, our expert guides provide curated wording templates, Quranic verses, host protocols, and step-by-step instructions. Explore traditional and modern calligraphic wording in English, Urdu (Nastaliq script), and Arabic.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className="font-extrabold text-xs text-foreground">Pakistani Wedding Wording</h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Explore traditional host protocols, Bismillah calligraphy, and timing etiquette for Nikkah, Barat, and Walima cards.</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className="font-extrabold text-xs text-foreground">Eid Wording & Poetry</h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Find short English greetings, Urdu Shayari, and Quranic blessings for Eid-ul-Fitr and Eid-ul-Adha wish cards.</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className="font-extrabold text-xs text-foreground">WhatsApp RSVP Tracking</h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Learn how to manage guest list headcounts, embed Google Maps directions, and automate attendee responses.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
