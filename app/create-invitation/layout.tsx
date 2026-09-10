import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create Wedding Invitations & Urdu Cards with RSVP | Cardzy',
  description:
    'Design luxury animated wedding invitations with Urdu wording, Google Maps, background music & 1-click WhatsApp RSVP tracking. Build your dream invite free!',
  keywords: [
    'wedding card wording',
    'Pakistani wedding card maker',
    'digital wedding invitation',
    'Nikkah invitation online',
    'wedding invitation wording Urdu',
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

