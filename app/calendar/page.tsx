import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CelebrationCalendarClient } from '@/components/calendar/calendar-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL, SITE_PUBLISHER } from '@/lib/seo'
import { Calendar, Sparkles, Moon, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Worldwide Celebration & Islamic Calendar 2026–2027 | Cardzy',
  description:
    'Explore 80+ upcoming Islamic dates (Hijri 1448–1449), global religious festivals, national days, and family milestones with dynamic rolling countdowns and 1-click 3D cards.',
  keywords: [
    'Islamic calendar 2026',
    'Hijri calendar 1448',
    'Ramadan 2027 date',
    'Eid ul Fitr 2027',
    'Eid ul Adha 2027',
    'worldwide festivals calendar',
    'global holiday calendar',
    'Pakistan holidays 2026',
    'Diwali 2026 date',
    'Christmas 2026 countdown',
    'digital wish card calendar',
    'Cardzy',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/calendar'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Worldwide Celebration & Islamic Calendar 2026–2027 | Cardzy',
    description:
      'Comprehensive 365-day rolling calendar covering 80+ Islamic, Christian, Hindu, family, and national celebrations with 1-click card creation.',
    url: `${SITE_URL}/calendar`,
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Worldwide Celebration & Islamic Calendar — Cardzy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worldwide Celebration & Islamic Calendar 2026–2027 | Cardzy',
    description:
      'Comprehensive 365-day rolling calendar covering 80+ Islamic, global, family, and national celebrations with 1-click card creation.',
    images: ['/og-image.jpg'],
  },
}

const calendarJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Worldwide Celebration & Islamic Calendar (Rolling 365 Days)',
  url: `${SITE_URL}/calendar`,
  description:
    'Comprehensive rolling calendar indexing 80 worldwide festivals, Islamic lunar milestones (Hijri 1448–1449), multi-faith holidays, and family observance days.',
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: SITE_URL,
  },
}

export default function CalendarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calendarJsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <Breadcrumbs items={[{ label: 'Celebration Calendar', href: '/calendar' }]} />

          {/* ── Page Header ── */}
          <header className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 mt-4 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3.5 py-1 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Calendar className="size-3.5" />
              <span>365-Day Rolling Celebration Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Worldwide Celebration &amp; Islamic Calendar (2026–2027)
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Track <strong className="text-foreground">80 major worldwide celebrations</strong> — from sacred Islamic lunar milestones (Hijri 1448–1449) and global multi-faith festivals to family relationship days and national holidays. This calendar dynamically begins from today and rolls forward 365 days, complete with copyable bilingual greetings and 1-click 3D cards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full border border-border">
                <Moon className="size-3.5 text-emerald-500" /> 15 Islamic Occasions
              </span>
              <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full border border-border">
                <Globe className="size-3.5 text-purple-500" /> 25 Global Faiths
              </span>
              <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full border border-border">
                <Heart className="size-3.5 text-rose-500" /> 16 Family &amp; Love Days
              </span>
              <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full border border-border">
                <Sparkles className="size-3.5 text-amber-500" /> 24 Civic &amp; Milestones
              </span>
            </div>
          </header>

          {/* ── Interactive Calendar Client ── */}
          <CelebrationCalendarClient />
        </div>
      </main>
    </>
  )
}
