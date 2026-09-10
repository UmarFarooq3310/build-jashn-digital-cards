import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
  description:
    'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
  keywords: [
    'wedding card wording',
    'Pakistani wedding card text',
    'wedding invitation wording Urdu',
    'wedding card wording in Urdu and English',
    'Nikkah card text examples',
    'Mehndi invitation wording',
    'Barat wedding card lines',
    'Walima card text',
    'Islamic wedding card text',
  ],
  alternates: getPageAlternates('/guide/pakistani-wedding-invitations'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
    description:
      'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
    url: 'https://cardzy.online/guide/pakistani-wedding-invitations',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wedding Card Wording & Pakistani Invitation Templates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Card Wording: Pakistani & Urdu Templates | Cardzy',
    description:
      'Explore 50+ royal wedding card wording templates in Urdu & English. Copy-ready lines for Nikkah, Mehndi, Barat & Walima with Bismillah text. Read the guide!',
    images: ['/og-image.jpg'],
  },
}

export default function WeddingGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
