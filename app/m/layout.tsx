import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: '✨ 3D Magic Surprise Celebration • Cardzy',
  description: 'Tap to unbox your interactive 3D surprise experience (blow candles, open ring box, pop confetti) on Cardzy.',
  robots: PRIVATE_ROBOTS,
  openGraph: {
    title: '✨ Someone created an Interactive 3D Surprise for you! 🎁',
    description: 'Tap to open your interactive 3D celebration surprise: blow out candles, unbox 3D gift box, and reveal animated message on Cardzy.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: 'https://cardzy.online/api/og?type=magic&title=3D+Magic+Celebration+Surprise',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Cardzy 3D Magic Celebration Surprise Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '✨ Interactive 3D Magic Surprise • Cardzy',
    description: 'Blow candles, unbox ring box, and reveal personalized animated greetings on Cardzy.',
    images: ['https://cardzy.online/api/og?type=magic&title=3D+Magic+Celebration+Surprise'],
  },
}

export default function MagicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
