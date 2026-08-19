import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wish Wording Ideas & Messages — Cardzy',
  description:
    'Heartfelt, funny, and formal birthday wish messages for every card. Copy-ready wording for family, friends, and coworkers, plus card design tips.',
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
