import type { Metadata } from 'next'
import { CreateInvitationWrapper } from './create-invitation-wrapper'
import { CreateInvitationProse } from './create-invitation-prose'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Create Digital Wedding Invitations with WhatsApp RSVP | Cardzy',
    description:
      'Design royal 4K animated wedding invitation websites for Nikkah, Mehndi, Barat, and Walima with Google Maps directions, music, and WhatsApp RSVP tracking.',
    alternates: getPageAlternates('/create-invitation', lang),
    robots: PUBLIC_ROBOTS,
  }
}

export default function CreateInvitationPage() {
  return (
    <>
      <CreateInvitationWrapper />
      <CreateInvitationProse />
    </>
  )
}
