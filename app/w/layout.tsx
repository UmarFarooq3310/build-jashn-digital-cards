import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: '✨ You received a 3D Animated Card! • Cardzy',
  description: 'Tap to open your interactive 3D animated greeting card, blow the candles, and reveal personalized wishes on Cardzy.',
  robots: PRIVATE_ROBOTS,
  openGraph: {
    title: '✨ Someone sent you a 3D Animated Card! 💌',
    description: 'Tap to open the 3D envelope, blow interactive candles, and reveal your personalized celebration greeting on Cardzy.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: 'https://cardzy.online/api/og?type=wish&title=3D+Animated+Greeting+Card',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Cardzy 3D Animated Greeting Card Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '✨ You received a 3D Animated Card! 💌',
    description: 'Tap to open the 3D envelope and view your personalized animated greeting on Cardzy.',
    images: ['https://cardzy.online/api/og?type=wish&title=3D+Animated+Greeting+Card'],
  },
}

export default function NoIndexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
