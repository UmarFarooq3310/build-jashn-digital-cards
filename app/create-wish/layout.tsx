import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create 3D Animated Wish Cards with Photo & Name | Cardzy',
  description:
    'Design custom 3D animated wish cards for Eid Mubarak, birthdays, anniversaries, and holidays with custom family photo and music.',
  alternates: getPageAlternates('/create-wish'),
  robots: PUBLIC_ROBOTS,
}

export default function CreateWishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

