import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create Digital Wedding Invitations — Cardzy',
  description:
    'Design 4K animated digital wedding invitations, Nikkah cards, and Mehndi sites with live WhatsApp RSVP tracking and Google Maps venue pin.',
  alternates: getPageAlternates('/create-invitation'),
  robots: PUBLIC_ROBOTS,
}

export default function CreateInvitationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

