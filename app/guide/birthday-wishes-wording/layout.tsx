import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages & Card Texts | Cardzy',
  description:
    'Find the perfect birthday card wording — heartfelt, funny, or formal messages for friends, family & coworkers. 50+ copy-ready templates + 1-click 3D card creator.',
  keywords: [
    'birthday wishes wording',
    'birthday card messages',
    'birthday wishes for friends',
    'heartfelt birthday wishes',
    'funny birthday card messages',
    'milestone birthday wording',
    'birthday card text templates',
    'birthday wishes in Urdu',
    '50th birthday wishes',
    'birthday message for mum',
  ],
  alternates: getPageAlternates('/guide/birthday-wishes-wording'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages & Card Texts | Cardzy',
    description:
      'Heartfelt, funny, and formal birthday card messages for friends, family & coworkers. Copy-ready + instant 3D card maker.',
    url: 'https://cardzy.online/guide/birthday-wishes-wording',
    siteName: 'Cardzy',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Birthday Wishes Wording Guide — Cardzy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Wishes Wording: 50+ Copy-Ready Messages | Cardzy',
    description:
      'Heartfelt, funny, and formal birthday card wording templates. Copy + create a 3D card in seconds.',
    images: ['/og-image.jpg'],
  },
}

export default function BirthdayGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
