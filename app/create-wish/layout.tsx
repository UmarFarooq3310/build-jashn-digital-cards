import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create 3D Animated Wish Cards with Photo & Name | Cardzy',
  description:
    'Design custom 3D animated wish cards for Eid Mubarak, birthdays, anniversaries, and holidays with custom family photo and music.',
  keywords: [
    '3D animated wish cards',
    'online greeting card maker',
    'Eid Mubarak card with photo',
    'animated birthday card',
    'custom anniversary card',
    'WhatsApp wish card',
    'digital greeting card',
  ],
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

