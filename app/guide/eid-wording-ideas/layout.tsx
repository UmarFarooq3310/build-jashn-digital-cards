import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Eid Mubarak Wishes, Urdu Wording & Replies | Cardzy',
  description:
    'Free Eid Mubarak wording in Urdu & English with copyable phrases, Khair Mubarak replies, festive greetings, and animated Eid card wording ideas.',
  keywords: [
    'Eid Mubarak wording Urdu',
    'Khair Mubarak reply meaning',
    'Eid wishes in English',
    'Eid greeting quotes',
    'Eid Mubarak card messages',
  ],
  alternates: getPageAlternates('/guide/eid-wording-ideas'),
  robots: PUBLIC_ROBOTS,
}

export default function EidGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
