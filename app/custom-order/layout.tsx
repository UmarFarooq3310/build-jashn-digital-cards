import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Custom 3D Card Design Order — Concierge Service | Cardzy',
  description:
    'Order a fully custom 3D animated wish card or wedding invitation crafted by the Cardzy design team. Fast turnaround, shareable WhatsApp link, and unique designs just for you.',
  keywords: [
    'custom card design',
    'bespoke wedding invitation',
    'concierge card service',
    'custom 3D animated cards',
    'personalized event invitation design',
    'custom Eid card',
    'Cardzy custom order',
  ],
  alternates: getPageAlternates('/custom-order'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Custom 3D Card Design Order — Concierge Service | Cardzy',
    description:
      'Order a custom 3D animated card or wedding invitation designed by Cardzy experts. Unique, fast, and shareable on WhatsApp.',
    url: 'https://cardzy.online/custom-order',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Custom Card Design Order' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom 3D Card Design Order — Concierge Service | Cardzy',
    description: 'Bespoke 3D animated cards and wedding invitations crafted by the Cardzy team.',
    images: ['/og-image.jpg'],
  },
}

export default function CustomOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
