import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ToastNotification } from '@/components/ui/toast-notification'
import { FirebaseAuthListener } from '@/components/firebase-auth-listener'
import { AdSenseHandler } from '@/components/adsense-handler'
import { LanguageProvider } from '@/lib/lang/context'
import './globals.css'

const poppins = { variable: '--font-poppins', className: '' }
const urduFont = { variable: '--font-urdu', className: '' }

export const metadata: Metadata = {
  metadataBase: new URL('https://cardzy.online'),
  title: 'Cardzy — Digital Wish Cards & Event Invitations',
  description:
    'Create and share animated digital wish cards & event websites for weddings, Eid, birthdays & celebrations with RSVP and 18 languages.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://cardzy.online/',
    languages: {
      'en': 'https://cardzy.online/',
      'ur': 'https://cardzy.online/',
      'ar': 'https://cardzy.online/',
      'x-default': 'https://cardzy.online/',
    },
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
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
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
        'https://www.facebook.com/share/1bPTaFnxDz/',
        'https://www.instagram.com/cardzyonline',
        'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S',
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
    <html lang="en" className={`${poppins.variable} ${urduFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://jashn-app-e3888.firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://jashn-app-e3888.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <meta name="google-adsense-account" content="ca-pub-8899224608517833" />
        <meta name="google-site-verification" content="google8c02e6f18e222682" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8899224608517833"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-sans antialiased overflow-x-hidden w-full max-w-[100vw]" suppressHydrationWarning>
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
