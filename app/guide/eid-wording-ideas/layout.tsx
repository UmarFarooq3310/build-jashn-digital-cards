import type { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Eid Mubarak Wording & Wishes in Urdu & English (With Meanings & Replies) | Cardzy',
  description:
    'Free Eid Mubarak wording in Urdu & English — copyable phrases, "Eid Mubarak to you too" meaning & replies (Khair Mubarak), greetings, and 3D animated Eid cards.',
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
