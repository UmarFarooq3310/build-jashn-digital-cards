import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Eid Mubarak 3D Cards Campaign — Free Animated Wishes | Cardzy',
  description:
    'Celebrate Eid with free personalized 3D animated wish cards. Add your photo, custom Urdu blessings, and share in one WhatsApp tap. Create yours in 60 seconds!',
  keywords: [
    'Eid Mubarak campaign',
    'Eid celebration cards free',
    'animated Eid wishes',
    'custom Eid cards with photo',
    'Eid Mubarak 3D card',
    'free Eid card online',
    'WhatsApp Eid wishes',
  ],
  alternates: getPageAlternates('/campaign'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Eid Mubarak 3D Cards Campaign — Free Animated Wishes | Cardzy',
    description:
      'Free personalized 3D animated Eid cards with photo, Urdu blessings, and instant WhatsApp sharing.',
    url: 'https://cardzy.online/campaign',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Eid Mubarak Campaign' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eid Mubarak 3D Cards Campaign — Free | Cardzy',
    description: 'Free 3D animated Eid cards with photo, Urdu blessings, and WhatsApp sharing.',
    images: ['/og-image.jpg'],
  },
}

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
