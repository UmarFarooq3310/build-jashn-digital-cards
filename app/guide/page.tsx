import type { Metadata } from 'next'
import { GuideClientContent } from './guide-content'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Celebration Guides & Wording Ideas — Cardzy Digital Cards',
    description:
      'Explore our collection of expert guides for designing digital invitations, animated wish cards, wedding invitations, Eid greetings, and more. Find wording templates and tips for every occasion.',
    alternates: getPageAlternates('/guide', lang),
    robots: PUBLIC_ROBOTS,
  }
}

export default function GuideIndexPage() {
  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <GuideClientContent />
    </div>
  )
}
