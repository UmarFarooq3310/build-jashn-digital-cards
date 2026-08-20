import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Disclaimer & Legal Notice | Cardzy',
  description:
    'Read Cardzy’s official disclaimer regarding digital services, interactive 3D cards, user-generated content, advertising disclosures, and website terms.',
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
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
