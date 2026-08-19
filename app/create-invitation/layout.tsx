import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create Digital Wedding Invitations — Cardzy',
  description:
    'Design 4K animated wedding invitations for Nikkah, Mehndi, Barat & Walima with Google Maps directions, music, and instant WhatsApp RSVP tracking.',
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

