import dynamic from 'next/dynamic'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
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
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

import { getPageAlternates, PUBLIC_ROBOTS, DEFAULT_KEYWORDS, SITE_PUBLISHER, SITE_CREATOR } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL('https://cardzy.online'),
  title: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
  description:
    'Create 3D animated wish cards, wedding invitations with WhatsApp RSVP, and smart digital business cards in 18 languages with Cardzy.',
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: 'Cardzy Editorial Team', url: 'https://cardzy.online' }],
  creator: SITE_CREATOR,
  publisher: SITE_PUBLISHER,
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
      'Create 3D animated wish cards, wedding invitations with WhatsApp RSVP, and executive digital visiting cards with Cardzy.',
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
    email: 'cardzyonline@gmail.com',
    telephone: '+923093518796',
    sameAs: [
      'https://www.tiktok.com/@cardzyonline',
      'https://www.instagram.com/cardzyonline',
      'https://www.facebook.com/cardzyonline',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cardzy',
    url: 'https://cardzy.online',
    description:
      'Create stunning 3D animated digital wish cards, digital wedding invitations with WhatsApp RSVP tracking, and executive digital visiting cards.',
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
        <link rel="preconnect" href="https://jashn-app-e3888.firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://jashn-app-e3888.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.openCookiePreferences = window.openCookiePreferences || function() {
                try {
                  window.__pendingCookieModal = true;
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
                    if (typeof window.openCookiePreferences === 'function') {
                      window.openCookiePreferences();
                    }
                  }
                } catch(err) {}
              }, false);
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
              #cookie-consent-banner,
              #cardzy-cookie-modal-root,
              [data-cookie-root] {
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 2147483647 !important;
                pointer-events: auto !important;
              }
              iframe.goog-te-banner-frame,
              .goog-te-banner-frame,
              .goog-te-balloon-frame,
              #goog-gt-tt,
              .goog-te-spinner-pos,
              .goog-te-banner,
              #google_translate_element,
              body > .skiptranslate:not(#cookie-consent-banner):not(#cardzy-cookie-modal-root),
              div.skiptranslate:not(#cookie-consent-banner):not(#cardzy-cookie-modal-root) {
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                function isAdError(msg, src) {
                  if (!msg && !src) return false;
                  var str = (String(msg || '') + ' ' + String(src || '')).toLowerCase();
                  return str.indexOf('adsbygoogle') !== -1 ||
                         str.indexOf('tagerror') !== -1 ||
                         str.indexOf('all \\'ins\\' elements') !== -1 ||
                         str.indexOf('already have ads') !== -1 ||
                         str.indexOf('no_div') !== -1 ||
                         str.indexOf('pagead2') !== -1;
                }
                window.addEventListener('error', function(e) {
                  if (e && (isAdError(e.message, e.filename) || isAdError(e.error && e.error.message, e.filename))) {
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    if (e.preventDefault) e.preventDefault();
                    return true;
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  if (e && (isAdError(e.reason && e.reason.message, '') || isAdError(e.reason, ''))) {
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    if (e.preventDefault) e.preventDefault();
                  }
                }, true);
                var origOnError = window.onerror;
                window.onerror = function(msg, url, line, col, err) {
                  if (isAdError(msg, url) || (err && isAdError(err.message, url))) {
                    return true;
                  }
                  if (origOnError) return origOnError.apply(this, arguments);
                  return false;
                };
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background font-sans antialiased overflow-x-hidden w-full max-w-[100vw]" suppressHydrationWarning>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8899224608517833"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <LanguageProvider>
          <CookieBanner />
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
          <ToastNotification />
          {process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
