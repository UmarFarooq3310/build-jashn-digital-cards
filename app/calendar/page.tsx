import type { Metadata } from 'next'
import { CelebrationCalendarClient } from '@/components/calendar/calendar-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL, SITE_PUBLISHER } from '@/lib/seo'

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
          <CelebrationCalendarClient />
        </div>
      </main>
    </>
  )
}
