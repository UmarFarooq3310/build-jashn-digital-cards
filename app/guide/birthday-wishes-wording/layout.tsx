import type { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Birthday Wish Wording Ideas & Messages — Cardzy',
  description:
    'Heartfelt, funny, and formal birthday wishes for every kind of card. Copy-ready messages for family, friends, coworkers, and kids, plus tips for animated birthday cards.',
  alternates: {
    canonical: 'https://cardzy.online/guide/birthday-wishes-wording',
    languages: getLanguageAlternates('/guide/birthday-wishes-wording'),
  },
  }

export default function BirthdayGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
