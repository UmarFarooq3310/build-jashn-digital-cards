import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free Digital Wedding Invitation Maker with WhatsApp RSVP | Cardzy',
  description:
    'Design free luxury animated wedding invitations with Urdu wording, Google Maps, background music & 1-click WhatsApp RSVP tracking. Build your dream invite in minutes!',
  keywords: [
    'wedding card wording',
    'Pakistani wedding card maker',
    'digital wedding invitation free',
    'Nikkah invitation online',
    'wedding invitation wording Urdu',
    'Mehndi card',
    'Barat invitation',
    'Walima digital card',
    'WhatsApp wedding RSVP',
    'animated wedding card',
    'online wedding invitation Pakistan',
    'Islamic wedding card digital',
  ],
  alternates: getPageAlternates('/create-invitation'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Free Digital Wedding Invitation Maker with WhatsApp RSVP | Cardzy',
    description:
      'Animated wedding invitations with Urdu wording, maps, music & WhatsApp RSVP. Nikkah, Mehndi, Barat & Walima — all in one free tool.',
    url: 'https://cardzy.online/create-invitation',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Free Digital Wedding Invitation Maker — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Wedding Invitation Maker with WhatsApp RSVP | Cardzy',
    description: 'Animated Urdu wedding invitations with maps, music & WhatsApp RSVP tracking. Free!',
    images: ['/og-image.jpg'],
  },
}

export default function CreateInvitationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

