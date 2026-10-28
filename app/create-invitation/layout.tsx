import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free Digital Wedding Invitations with WhatsApp RSVP | Cardzy',
  description:
    'Design luxury animated wedding invitations with Urdu wording, venue details, background music & 1-click WhatsApp RSVP tracking. Build invites in minutes!',
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
    title: 'Free Digital Wedding Invitations with WhatsApp RSVP | Cardzy',
    description:
      'Animated wedding invitations with Urdu wording, schedule details, music & WhatsApp RSVP. Nikkah, Mehndi, Barat & Walima — all in one free tool.',
    url: 'https://cardzy.online/create-invitation',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Free Digital Wedding Invitation Maker — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Wedding Invitations with WhatsApp RSVP | Cardzy',
    description: 'Animated Urdu wedding invitations with schedule details, music & WhatsApp RSVP tracking. Free!',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

const invitationProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Cardzy Digital Wedding & Event Invitation Suite with WhatsApp RSVP',
  description:
    'Design luxury animated wedding invitations with authentic Urdu wording, venue schedules, background music, and real-time WhatsApp RSVP tracking.',
  image: 'https://cardzy.online/og-image.jpg',
  brand: {
    '@type': 'Brand',
    name: 'Cardzy',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://cardzy.online/create-invitation',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.95',
    reviewCount: '489',
  },
}

export default function CreateInvitationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(invitationProductJsonLd) }}
      />
      {children}
    </>
  )
}

