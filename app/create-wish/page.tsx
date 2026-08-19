import type { Metadata } from 'next'
import { CreateWishWrapper } from './create-wish-wrapper'
import { CreateWishProse } from './create-wish-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Create 3D Animated Wish Cards with Photos | Cardzy',
    description:
      'Design and personalize 3D animated greeting cards for Eid, Birthdays, Anniversaries, and Ramadan with photos, music, and WhatsApp sharing.',
    keywords: [
      '3D animated wish cards',
      'online greeting card maker',
      'Eid Mubarak card with photo',
      'animated birthday card',
      'custom anniversary card',
      'WhatsApp wish card',
      'digital greeting card',
    ],
    publisher: SITE_PUBLISHER,
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
