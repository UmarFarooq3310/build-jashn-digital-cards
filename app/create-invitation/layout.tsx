import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Royal Digital Wedding Invitations & Online Cards | Cardzy',
  description:
    'Design 4K animated digital wedding invitations, Nikkah cards, and Mehndi sites with live WhatsApp RSVP tracking and Google Maps venue pin.',
  alternates: {
    canonical: 'https://cardzy.online/create-invitation',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CreateInvitationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

