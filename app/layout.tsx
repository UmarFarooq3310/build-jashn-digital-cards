import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ToastNotification } from '@/components/ui/toast-notification'
import { FirebaseAuthListener } from '@/components/firebase-auth-listener'
import { AdSenseHandler } from '@/components/adsense-handler'
import { LanguageProvider } from '@/lib/lang/context'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cardzy.online'),
  title: 'Cardzy — Digital Wish Cards & Event Invitations',
  description:
    'Create and share animated digital wish cards & event websites for weddings, Eid, birthdays & celebrations with RSVP and 18 languages.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://cardzy.online',
  },
  other: {
    'google-adsense-account': 'ca-pub-8899224608517833',
  },
  keywords: [
    'Cardzy',
    'digital invitation',
    'animated wish card',
    'online invitation',
    'eid mubarak card',
    'wedding invitation',
    'birthday card',
    'RSVP invitation',
    'multilingual card',
    'event invitation',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon-180x180.png',
  },
  openGraph: {
    title: 'Cardzy — Digital Wish Cards & Event Invitations',
    description:
      'Create and share animated digital wish cards & event websites for weddings, Eid, birthdays & celebrations with RSVP and 18 languages.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    images: [
      {
        url: '/post1.svg',
        width: 1200,
        height: 630,
        alt: 'Cardzy — Beautiful Animated Wish Cards & Invitations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy — Digital Wish Cards & Event Invitations',
    description:
      'Create and share animated digital wish cards & event websites for weddings, Eid, birthdays & celebrations with RSVP and 18 languages.',
    images: ['/post1.svg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://cardzy.online/#website',
      url: 'https://cardzy.online',
      name: 'Cardzy',
      description: 'Global digital wish cards & event invitations',
    },
    {
      '@type': 'Organization',
      '@id': 'https://cardzy.online/#organization',
      name: 'Cardzy Online',
      url: 'https://cardzy.online',
      logo: 'https://cardzy.online/favicon.svg',
      sameAs: [
        'https://facebook.com/cardzy.online',
        'https://x.com/cardzy_online',
        'https://instagram.com/cardzy.online',
        'https://youtube.com/@cardzyonline',
        'https://linkedin.com/company/cardzy-online',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'cardzyonline@gmail.com',
        contactType: 'customer service',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="google-adsense-account" content="ca-pub-8899224608517833" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-sans antialiased overflow-x-hidden w-full max-w-[100vw]">
        <LanguageProvider>
          <AdSenseHandler />
          <FirebaseAuthListener />
          {children}
          <ToastNotification />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
