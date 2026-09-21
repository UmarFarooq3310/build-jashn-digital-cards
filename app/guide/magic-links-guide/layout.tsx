import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wishes Wording Ideas & Card Messages | Cardzy',
  description:
    'Heartfelt, funny, and formal birthday card messages. Copy-ready wording templates for family, friends, and coworkers with design tips.',
  keywords: [
    'birthday wishes wording',
    'birthday messages for friends',
    'heartfelt birthday wishes',
    'funny birthday card messages',
    'milestone birthday wording',
    'birthday card text templates',
  ],
  alternates: getPageAlternates('/guide/birthday-wishes-wording'),
  robots: PUBLIC_ROBOTS,
}

export default function BirthdayGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
