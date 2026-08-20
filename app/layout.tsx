import dynamic from 'next/dynamic'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { ToastNotification } from '@/components/ui/toast-notification'
import { LanguageProvider } from '@/lib/lang/context'
import './globals.css'

const AdSenseCleaner = dynamic(
  () => import('@/components/adsense-cleaner').then((mod) => mod.AdSenseCleaner)
)
const FirebaseAuthListener = dynamic(
  () => import('@/components/firebase-auth-listener').then((mod) => mod.FirebaseAuthListener)
)
const AdSenseHandler = dynamic(
  () => import('@/components/adsense-handler').then((mod) => mod.AdSenseHandler)
)
const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => mod.Analytics)
)

import { CookieBanner } from '@/components/CookieBanner'

const SiteHeader = dynamic(
  () => import('@/components/site-header').then((mod) => mod.SiteHeader)
)
const SiteFooter = dynamic(
  () => import('@/components/site-footer').then((mod) => mod.SiteFooter)
)

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
}

import { getPageAlternates, PUBLIC_ROBOTS, DEFAULT_KEYWORDS, SITE_PUBLISHER, SITE_CREATOR } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL('https://cardzy.online'),
  title: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
  description:
    'Design, customize, and share interactive 3D digital wish cards, wedding invitations with automated WhatsApp RSVP tracking, and executive smart digital business cards (vCards) in 18 languages.',
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: 'Cardzy Editorial Team', url: 'https://cardzy.online' }],
  creator: SITE_CREATOR,
  publisher: SITE_PUBLISHER,
  generator: 'v0.app',
  alternates: getPageAlternates('/'),
  robots: PUBLIC_ROBOTS,
  verification: {
    google: 'google8c02e6f18e222682',
  },
  other: {
    'google-adsense-account': 'ca-pub-8899224608517833',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Cardzy | 3D Animated Digital Wish Cards & Wedding Invitations',
    description:
      'Design, personalize, and share interactive 3D digital cards with music, photo upload, and instant WhatsApp RSVP tracking.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cardzy Digital Wish Cards & Invitations Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy | 3D Animated Digital Wish Cards & Wedding Invitations',
    description:
      'Create personalized 3D animated wish cards, wedding invitations with RSVP, and executive digital visiting cards.',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cardzy',
    url: 'https://cardzy.online',
    logo: 'https://cardzy.online/android-chrome-512x512.png',
    image: 'https://cardzy.online/android-chrome-512x512.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cardzy',
    url: 'https://cardzy.online',
    description:
      'Create stunning 3D animated digital wish cards, digital wedding invitations with WhatsApp RSVP tracking, and executive digital visiting cards.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cardzy.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
          dangerouslySetInnerHTML={{
            __html: `
              window.openCookiePreferences = window.openCookiePreferences || function() {
                try {
                  window.dispatchEvent(new CustomEvent('open_cookie_preferences'));
                  document.dispatchEvent(new CustomEvent('open_cookie_preferences'));
                } catch(e) {}
              };
              window.openCardzyCookieConsent = window.openCookiePreferences;
              window.showCookieAlert = window.openCookiePreferences;
              document.addEventListener('click', function(e) {
                try {
                  var target = e.target && e.target.closest && e.target.closest('[data-open-cookie-preferences], [data-cookie-preferences], a[href="#cookie-preferences"]');
                  if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (typeof window.openCookiePreferences === 'function') {
                      window.openCookiePreferences();
                    }
                  }
                } catch(err) {}
              }, true);
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, html body, body[style], html[style] {
                top: 0px !important;
                margin-top: 0px !important;
                padding-top: 0px !important;
                position: static !important;
                transform: none !important;
              }
              iframe.goog-te-banner-frame,
              .goog-te-banner-frame,
              .goog-te-balloon-frame,
              #goog-gt-tt,
              .goog-te-spinner-pos,
              .goog-te-banner,
              #google_translate_element,
              .skiptranslate,
              body > .skiptranslate,
              div.skiptranslate {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0px !important;
                width: 0px !important;
                max-height: 0px !important;
                margin: 0px !important;
                padding: 0px !important;
                position: absolute !important;
                top: -9999px !important;
                left: -9999px !important;
                pointer-events: none !important;
              }
              body > .google-auto-placed,
              body > div.google-auto-placed,
              body > iframe[name^="google_ads_"],
              body > ins.adsbygoogle:not(main ins),
              .google-auto-placed-top,
              [class*="google-auto-placed-top"] {
                display: none !important;
                height: 0 !important;
                max-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                position: absolute !important;
                top: -9999px !important;
                pointer-events: none !important;
              }
              header {
                top: 0 !important;
                margin-top: 0 !important;
              }
            `,
          }}
        />
      </head>
      <body className="bg-background font-sans antialiased overflow-x-hidden w-full max-w-[100vw]" suppressHydrationWarning>
        <LanguageProvider>
          <AdSenseCleaner />
          <AdSenseHandler />
          <FirebaseAuthListener />
          <div className="app-root-layout flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 w-full">
              {children}
            </main>
            <SiteFooter />
          </div>
          <CookieBanner />
          <ToastNotification />
          {process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
