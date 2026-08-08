import type { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Eid Mubarak Wish Wording & Urdu Messages Ideas — Cardzy',
  description:
    'Browse our curated collection of Eid Mubarak wishes, traditional Urdu greetings, and poetry verses for digital animated greeting cards.',
  alternates: {
    canonical: 'https://cardzy.online/guide/eid-wording-ideas',
    languages: getLanguageAlternates('/guide/eid-wording-ideas'),
  },
  }

export default function EidGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
