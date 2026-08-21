import type { Metadata } from 'next'
import { GuideClientContent } from './guide-content'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Celebration Guides & Wording Ideas — Cardzy Digital Cards',
  description:
    'Explore expert guides for digital invitations, holiday cards, and wedding announcements with copy-ready wording for every occasion.',
  keywords: [
    'digital invitation guides',
    'wedding card wording ideas',
    'Eid greeting messages',
    'birthday card wishes',
    'invitation etiquette',
    'Cardzy guides',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/guide'),
  robots: PUBLIC_ROBOTS,
}

import { Breadcrumbs } from '@/components/breadcrumbs'

export default function GuideIndexPage() {
  return (
    <div className="py-8 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <Breadcrumbs items={[{ label: 'Celebration Guides & Ideas', href: '/guide' }]} className="mb-6" />
      <GuideClientContent />
    </div>
  )
}
