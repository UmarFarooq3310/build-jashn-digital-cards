import { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Create 3D Animated Wish Cards with Photo & Name | Cardzy',
  description:
    'Design custom 3D animated wish cards for Eid Mubarak, birthdays, anniversaries, and holidays with custom family photo and music.',
  alternates: {
    canonical: 'https://cardzy.online/create-wish',
    languages: getLanguageAlternates('/create-wish'),
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CreateWishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

