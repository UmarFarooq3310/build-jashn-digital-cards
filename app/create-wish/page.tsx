import type { Metadata } from 'next'
import { CreateWishWrapper } from './create-wish-wrapper'
import { CreateWishProse } from './create-wish-prose'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Create 3D Animated Wish Cards | Cardzy',
    description:
      'Design and personalize 3D animated greeting cards for Eid, Birthdays, Anniversaries, and Ramadan with photos, music, and WhatsApp sharing.',
    alternates: getPageAlternates('/create-wish', lang),
    robots: PUBLIC_ROBOTS,
  }
}

export default function CreateWishPage() {
  return (
    <>
      <CreateWishWrapper />
      <CreateWishProse />
    </>
  )
}
