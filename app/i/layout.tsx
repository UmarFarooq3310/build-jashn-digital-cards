import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: "💍 You're Cordially Invited! • Cardzy 3D Digital Invitation",
  description: 'Tap to unbox your interactive 3D wedding invitation, view event details & venue map, and RSVP directly via WhatsApp.',
  robots: PRIVATE_ROBOTS,
  openGraph: {
    title: "💍 You're Cordially Invited! Tap to Open 3D Envelope",
    description: 'You have been invited to a celebration! Tap to open the luxury 3D animated invitation and send your WhatsApp RSVP.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: 'https://cardzy.online/api/og?type=invitation&title=Digital+Wedding+Invitation',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Cardzy 3D Digital Wedding Invitation Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "💍 You're Cordially Invited! Tap to Open 3D Invitation",
    description: 'Interactive 3D wedding invitation with automated WhatsApp RSVP on Cardzy.',
    images: ['https://cardzy.online/api/og?type=invitation&title=Digital+Wedding+Invitation'],
  },
}

export default function NoIndexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
