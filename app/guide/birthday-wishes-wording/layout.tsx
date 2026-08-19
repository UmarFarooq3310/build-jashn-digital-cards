import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wish Wording Ideas & Messages — Cardzy',
  description:
    'Heartfelt, funny, and formal birthday wishes for every kind of card. Copy-ready messages for family, friends, coworkers, and kids, plus tips for animated birthday cards.',
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
