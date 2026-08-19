import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Cardzy — 3D Digital Cards & Invitation Platform',
  description: 'Learn about Cardzy, the global digital card and invitation platform for families worldwide. Discover our story, mission, and celebration features.',
  keywords: [
    'about Cardzy',
    'digital cards platform',
    'Cardzy story',
    'Cardzy mission',
    'multilingual celebration cards',
  ],
  alternates: getPageAlternates('/about'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'About Cardzy — Digital Wish Cards & Event Invitations',
    description: 'Cardzy is a multilingual digital celebration platform serving over 60 countries.',
    url: 'https://cardzy.online/about',
    siteName: 'Cardzy Digital Cards',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

