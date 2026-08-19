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
      'Design 4K animated wedding invitations for Nikkah, Mehndi, Barat & Walima with Google Maps directions, music, and instant WhatsApp RSVP tracking.',
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
