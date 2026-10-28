import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
  description:
    'Create a free smart digital visiting card with QR code, 1-tap .vcf saving, and WhatsApp sharing. Perfect for professionals in Pakistan & globally.',
  keywords: [
    'digital business card free',
    'vCard maker online',
    'smart visiting card',
    'QR code business card',
    'contact card Pakistan',
    'executive digital card',
    'electronic business card',
    'digital visiting card Pakistan',
    'free QR business card',
    'vcf download card',
  ],
  alternates: getPageAlternates('/create-visiting-card'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
    description:
      'Create a free digital visiting card with QR code and WhatsApp sharing. Share your contact in one tap.',
    url: 'https://cardzy.online/create-visiting-card',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Free Smart Digital Business Card Maker — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Smart Digital Business Card Maker (vCard + QR) | Cardzy',
    description: 'Free digital visiting card with QR code, .vcf saving & WhatsApp sharing.',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

const vcardProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Cardzy Smart Digital Business Card & vCard Maker',
  description:
    'Generate contactless digital visiting cards with QR code generation, 1-tap .vcf smartphone contact download, and WhatsApp instant exchange.',
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
    url: 'https://cardzy.online/create-visiting-card',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.88',
    reviewCount: '194',
  },
}

export default function CreateVisitingCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vcardProductJsonLd) }}
      />
      {children}
    </>
  )
}
