import type { Metadata } from 'next'
import { CreateVisitingCardWrapper } from './create-visiting-card-wrapper'
import { CreateVisitingCardProse } from './create-visiting-card-prose'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Create Smart Digital Business Cards (vCard) | Cardzy',
    description:
      'Build smart executive digital business cards with scannable QR codes, 1-tap contact vCard download, and Google Maps office pins.',
    alternates: getPageAlternates('/create-visiting-card', lang),
    robots: PUBLIC_ROBOTS,
  }
}

export default function CreateVisitingCardPage() {
  return (
    <>
      <CreateVisitingCardWrapper />
      <CreateVisitingCardProse />
    </>
  )
}
