import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Disclaimer & Legal Notice | Cardzy',
  description:
    'Official disclaimer for Cardzy regarding digital services, 3D animated cards, user content, advertising, and terms of service.',
  keywords: [
    'Cardzy disclaimer',
    'legal notice',
    'digital service disclaimer',
    'affiliate disclosure',
    'website usage terms',
    'user content liability',
  ],
  alternates: getPageAlternates('/disclaimer'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Disclaimer & Legal Notice | Cardzy',
    description:
      'Official disclaimer for Cardzy regarding digital services, 3D animated cards, user content, advertising, and terms of service.',
    url: 'https://cardzy.online/disclaimer',
    siteName: 'Cardzy',
    type: 'website',
    images: [{ url: 'https://cardzy.online/og-image.jpg', width: 1200, height: 630, alt: 'Disclaimer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer & Legal Notice | Cardzy',
    description:
      'Official disclaimer for Cardzy regarding digital services, 3D animated cards, user content, advertising, and terms of service.',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
