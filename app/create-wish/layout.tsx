import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Urdu Eid Wishes & 3D Animated Wish Card Maker | Cardzy',
  description:
    'Create 3D animated cards with Urdu Eid wishes, birthday greetings & family photos. Add music and send interactive card links via WhatsApp. Try it free today!',
  keywords: [
    'Urdu Eid wishes',
    '3D animated wish cards',
    'online greeting card maker',
    'Eid Mubarak card with photo',
    'Urdu Eid Mubarak wishes',
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

