import type { Metadata } from 'next'
import { CreateInvitationWrapper } from './create-invitation-wrapper'
import { CreateInvitationProse } from './create-invitation-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

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
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-invitation'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Create Wedding Invitations & Urdu Cards with RSVP | Cardzy',
    description:
      'Design luxury animated wedding invitations with Urdu wording, Google Maps, background music & 1-click WhatsApp RSVP tracking. Build your dream invite free!',
    url: 'https://cardzy.online/create-invitation',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Create Wedding Invitations with RSVP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Wedding Invitations & Urdu Cards with RSVP | Cardzy',
    description:
      'Design luxury animated wedding invitations with Urdu wording, Google Maps, background music & 1-click WhatsApp RSVP tracking. Build your dream invite free!',
    images: ['/og-image.jpg'],
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
