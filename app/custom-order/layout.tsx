import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Custom 3D Card Design Order — Concierge Service | Cardzy',
  description:
    'Order a custom 3D animated wish card or wedding invitation crafted by Cardzy designers. Fast turnaround, WhatsApp link, and unique bespoke designs.',
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
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Cardzy Custom Card Design Order' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom 3D Card Design Order — Concierge Service | Cardzy',
    description: 'Bespoke 3D animated cards and wedding invitations crafted by the Cardzy team.',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

const customOrderProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Cardzy Bespoke Custom Card & Invitation Design Service',
  description:
    'Dedicated concierge design service for bespoke 3D animated cards, luxury wedding invitations, and corporate e-invites crafted by Cardzy artists.',
  image: 'https://cardzy.online/og-image.jpg',
  brand: {
    '@type': 'Brand',
    name: 'Cardzy',
  },
  offers: {
    '@type': 'Offer',
    price: '9.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://cardzy.online/custom-order',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.98',
    reviewCount: '86',
  },
}

export default function CustomOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customOrderProductJsonLd) }}
      />
      {children}
    </>
  )
}
