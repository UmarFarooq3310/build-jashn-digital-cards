import type { Metadata } from 'next'
import { CreateInvitationWrapper } from './create-invitation-wrapper'
import { CreateInvitationProse } from './create-invitation-prose'

export const metadata: Metadata = {
  title: 'Create Digital Wedding Invitations with WhatsApp RSVP | Cardzy',
  description: 'Design royal 4K animated wedding invitation websites for Nikkah, Mehndi, Barat, and Walima with Google Maps directions, music, and WhatsApp RSVP tracking.',
  alternates: {
    canonical: 'https://cardzy.online/create-invitation',
  },
}

export default function CreateInvitationPage() {
  return (
    <>
      <CreateInvitationWrapper />
      <CreateInvitationProse />
    </>
  )
}
