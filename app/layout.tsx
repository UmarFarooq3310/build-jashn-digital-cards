import dynamic from 'next/dynamic'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { ToastNotification } from '@/components/ui/toast-notification'
import { ImageLightboxModal } from '@/components/ui/image-lightbox'
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
const PushNotificationPrompt = dynamic(
  () => import('@/components/push-notification-prompt').then((mod) => mod.PushNotificationPrompt)
)
const LivePresenceTracker = dynamic(
  () => import('@/components/live-presence-tracker').then((mod) => mod.LivePresenceTracker)
)

import { CookieBanner } from '@/components/CookieBanner'

const SiteHeader = dynamic(
  () => import('@/components/site-header').then((mod) => mod.SiteHeader)
)
const SiteFooter = dynamic(
  () => import('@/components/site-footer').then((mod) => mod.SiteFooter)
)
const MobileBottomDock = dynamic(
  () => import('@/components/mobile-bottom-dock').then((mod) => mod.MobileBottomDock)
)

import { Poppins, Noto_Nastaliq_Urdu, Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: true,
})

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-nastaliq',
  display: 'swap',
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
  title: 'Cardzy — 3D Digital Wedding Invitations & Wish Cards',
  description:
    'Create interactive 3D animated greeting cards, Pakistani wedding invitations with WhatsApp RSVP, and smart vCards. Free online card maker in 18 languages.',
  keywords: DEFAULT_KEYWORDS,
  authors: [
    { name: 'Umar Farooq', url: 'https://cardzy.online/authors/umar-farooq' },
    { name: 'Kainat Rasheed', url: 'https://cardzy.online/authors/kainat-rasheed' },
    { name: 'Hasnain Sajid', url: 'https://cardzy.online/authors/hasnain-sajid' },
  ],
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
    title: 'Cardzy — 3D Digital Wedding Invitations & Wish Cards',
    description:
      'Tap to open interactive 3D animated greeting cards, wedding invitations with automated WhatsApp RSVP tracking, and smart vCards.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    images: [
      {
        url: 'https://cardzy.online/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Cardzy — 3D Animated Cards & Digital Wedding Invitations Maker',
      },
    ],
    locale: 'en_US',
    alternateLocale: [
      'ur_PK',
      'ar_SA',
      'hi_IN',
      'es_ES',
      'fr_FR',
      'zh_CN',
      'pt_BR',
      'ru_RU',
      'de_DE',
      'ja_JP',
      'ko_KR',
      'it_IT',
      'tr_TR',
      'id_ID',
      'bn_BD',
      'vi_VN',
      'sw_KE',
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy — 3D Digital Wedding Invitations & Animated Wish Cards',
    description:
      'Create interactive 3D animated cards, Pakistani wedding invitations with WhatsApp RSVP, and digital visiting cards in 18 languages.',
    images: ['https://cardzy.online/og-image.jpg'],
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
    areaServed: 'Worldwide',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'cardzyonline@gmail.com',
        telephone: '+923093518796',
        availableLanguage: ['English', 'Urdu'],
      },
    ],
    sameAs: [
      'https://www.tiktok.com/@cardzyonline',
      'https://www.instagram.com/cardzyonline',
      'https://www.facebook.com/people/Cardzyonline/61591756277026/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cardzy',
    url: 'https://cardzy.online',
    inLanguage: [
      'en', 'ur', 'ar', 'hi', 'es', 'fr', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw'
    ],
    description:
      'Create stunning 3D animated digital wish cards, digital wedding invitations with WhatsApp RSVP tracking, and executive digital visiting cards.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cardzy.online/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://cardzy.online/#webapp',
    name: 'Cardzy — 3D Digital Cards & Wedding Invitations Generator',
    url: 'https://cardzy.online',
    inLanguage: [
      'en', 'ur', 'ar', 'hi', 'es', 'fr', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw'
    ],
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All modern browsers (iOS, Android, Windows, macOS)',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas & WebGL support.',
    description:
      'Online 3D animated greeting card and wedding invitation generator with candle blowing, ring box unboxing, automated WhatsApp RSVPs, 1,000+ Urdu Poetry Treasury, and digital vCards.',
    featureList: [
      '3D Interactive Greeting Cards with Candle Blowing and Envelope Wax Seal Opening',
      'Pakistani Digital Wedding Invitations with Automated WhatsApp RSVP',
      'Interactive 3D Ring Box Unboxing Surprise Links',
      '1,000+ Verified Urdu & English Poetry Treasury with 1-Click Card Conversion',
      'Smart Digital vCards with QR Code and .vcf Contact Download',
      'Bilingual Support in Urdu Nastaliq, Roman Urdu, and 18 Global Languages',
      'Local Pakistani Checkout via JazzCash, EasyPaisa & Raast Bank Transfer'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 1350,
      bestRating: 5,
      worstRating: 1,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Cardzy Free',
        price: '0',
        priceCurrency: 'PKR',
        description: '5 free cards per category, 30-day active links, 5 classic themes & background audio',
      },
      {
        '@type': 'Offer',
        name: 'Cardzy Pro Monthly',
        price: '499',
        priceCurrency: 'PKR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '499',
          priceCurrency: 'PKR',
          unitCode: 'MON',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'MON',
          },
        },
        description: 'Unlimited 3D cards, permanent lifetime links, no watermarks, automated WhatsApp RSVP tracker',
      },
      {
        '@type': 'Offer',
        name: 'Cardzy Pro USD',
        price: '1.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '1.99',
          priceCurrency: 'USD',
          unitCode: 'MON',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'MON',
          },
        },
        description: 'Cardzy Pro global plan: unlimited cards, lifetime links, no watermark, real-time RSVP',
      },
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoNastaliq.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="cKRdWrDWn4jrJ4Btb4eAfg"
          async
        />
        {jsonLd.map((item, idx) => (
          <script
            key={`ld-json-${idx}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            suppressHydrationWarning
          />
        ))}
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
              #cookie-settings-persistent-badge,
              #cardzy-toast-root,
              [data-cookie-root],
              [data-toast-root] {
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
              body > .skiptranslate:not(#cookie-consent-banner):not(#cardzy-cookie-modal-root):not(#cookie-settings-persistent-badge):not(#cardzy-toast-root):not([data-cookie-root]):not([data-toast-root]),
              div.skiptranslate:not(#cookie-consent-banner):not(#cardzy-cookie-modal-root):not(#cookie-settings-persistent-badge):not(#cardzy-toast-root):not([data-cookie-root]):not([data-toast-root]) {
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
          id="cardzy-ad-error-trap"
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
                         str.indexOf('pagead2') !== -1 ||
                         str.indexOf('gsi_logger') !== -1;
                }
                // Intercept console.error and console.warn before dev overlays capture them
                var origConsoleError = console.error;
                console.error = function() {
                  var argsStr = Array.prototype.slice.call(arguments).map(function(a) {
                    return String((a && a.message) || a || '');
                  }).join(' ');
                  if (isAdError(argsStr, '')) {
                    return;
                  }
                  if (origConsoleError) origConsoleError.apply(console, arguments);
                };
                var origConsoleWarn = console.warn;
                console.warn = function() {
                  var argsStr = Array.prototype.slice.call(arguments).map(function(a) {
                    return String((a && a.message) || a || '');
                  }).join(' ');
                  if (isAdError(argsStr, '')) {
                    return;
                  }
                  if (origConsoleWarn) origConsoleWarn.apply(console, arguments);
                };
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
      <body className={`${poppins.variable} ${notoNastaliq.variable} ${playfair.variable} bg-background font-sans antialiased overflow-x-hidden w-full max-w-[100vw]`} suppressHydrationWarning>
        {/* ── Google Analytics 4 (GA4) with Google Consent Mode v2 ── */}
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-90JTPVFNQ8"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
              gtag('js', new Date());
              gtag('config', 'G-90JTPVFNQ8', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* ── Google AdSense ── */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8899224608517833"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="cardzy-cookie-dispatcher"
          strategy="afterInteractive"
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
              window.showCookieAlert = window.showCookieAlert || function() {
                try {
                  window.__pendingCookieAlert = true;
                  window.dispatchEvent(new CustomEvent('show_cookie_alert'));
                  document.dispatchEvent(new CustomEvent('show_cookie_alert'));
                } catch(e) {}
              };
              window.openCookieAlert = window.showCookieAlert;
              window.resetCookieConsent = window.resetCookieConsent || function() {
                try {
                  localStorage.removeItem('cardzy_consent_v3');
                  localStorage.removeItem('cardzy_cookie_consent');
                  localStorage.removeItem('cookie_consent');
                  if (typeof window.showCookieAlert === 'function') window.showCookieAlert();
                } catch(e) {}
              };
              document.addEventListener('click', function(e) {
                try {
                  var target = e.target && e.target.closest && e.target.closest('[data-open-cookie-preferences], [data-cookie-preferences], [data-show-cookie-alert], [data-reset-cookies], a[href="#cookie-preferences"], a[href="#cookie-alert"]');
                  if (target) {
                    e.preventDefault();
                    if (target.hasAttribute('data-show-cookie-alert') || target.getAttribute('href') === '#cookie-alert') {
                      if (typeof window.showCookieAlert === 'function') window.showCookieAlert();
                    } else if (target.hasAttribute('data-reset-cookies')) {
                      if (typeof window.resetCookieConsent === 'function') window.resetCookieConsent();
                    } else {
                      if (typeof window.openCookiePreferences === 'function') window.openCookiePreferences();
                    }
                  }
                } catch(err) {}
              }, false);
            `,
          }}
        />
        <LanguageProvider>
          <CookieBanner />
          <AdSenseCleaner />
          <AdSenseHandler />
          <FirebaseAuthListener />
          <div className="app-root-layout flex min-h-screen flex-col bg-background pb-14 lg:pb-0">
            <SiteHeader />
            <main className="flex-1 w-full">
              {children}
            </main>
            <SiteFooter />
            <MobileBottomDock />
          </div>
          <ToastNotification />
          <ImageLightboxModal />
          <PushNotificationPrompt />
          <LivePresenceTracker />
          {process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
