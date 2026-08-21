import type { Metadata } from 'next'
import { CreateInvitationWrapper } from './create-invitation-wrapper'
import { CreateInvitationProse } from './create-invitation-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Create Wedding Invitations with WhatsApp RSVP | Cardzy',
  description:
    'Design 4K animated wedding invitations for Nikkah, Mehndi, Barat & Walima with Google Maps, music, and instant WhatsApp RSVP tracking.',
  keywords: [
    'digital wedding invitation',
    'Pakistani wedding card maker',
    'Nikkah invitation online',
    'Mehndi card',
    'Barat invitation',
    'Walima digital card',
    'WhatsApp wedding RSVP',
    'animated wedding card',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-invitation'),
  robots: PUBLIC_ROBOTS,
}

export default function CreateInvitationPage() {
  return (
    <>
      <CreateInvitationWrapper />
      <CreateInvitationProse />
    </>
  )
}
