import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Noto_Nastaliq_Urdu } from 'next/font/google'
import { ToastNotification } from '@/components/ui/toast-notification'
import { FirebaseAuthListener } from '@/components/firebase-auth-listener'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const nastaliq = Noto_Nastaliq_Urdu({
  variable: '--font-nastaliq',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Jashn — Pakistan\'s Animated Digital Wish & Invitation Cards',
  description:
    'Jashn (jashn.app) lets you send beautiful animated wish cards and full event invitations with RSVP, countdowns, and Urdu calligraphy. Free to start.',
  generator: 'v0.app',
  other: {
    'google-adsense-account': 'ca-pub-8899224608517833',
  },
  keywords: [
    'Jashn',
    'digital invitation Pakistan',
    'shaadi card',
    'eid mubarak card',
    'animated wish card',
    'mehndi invitation',
  ],
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Jashn — Pakistan\'s Animated Digital Wish & Invitation Cards',
    description:
      'Jashn (jashn.app) lets you send beautiful animated wish cards and full event invitations with RSVP, countdowns, and Urdu calligraphy. Free to start.',
    url: 'https://jashn.app',
    siteName: 'Jashn',
    images: [
      {
        url: 'https://jashn.app/apple-icon.png',
        width: 180,
        height: 180,
        alt: 'Jashn App Icon',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Jashn — Pakistan\'s Animated Digital Wish & Invitation Cards',
    description:
      'Jashn (jashn.app) lets you send beautiful animated wish cards and full event invitations with RSVP, countdowns, and Urdu calligraphy. Free to start.',
    images: ['https://jashn.app/apple-icon.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#7B0D1E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nastaliq.variable}`}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-8899224608517833" />
      </head>
      <body className="bg-background font-sans antialiased overflow-x-hidden">
        <FirebaseAuthListener />
        {children}
        <ToastNotification />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
