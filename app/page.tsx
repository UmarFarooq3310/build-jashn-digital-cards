import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { getPageAlternates, PUBLIC_ROBOTS, DEFAULT_KEYWORDS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
  description:
    'Create 3D animated wish cards, wedding invitations with WhatsApp RSVP, and smart digital business cards in 18 languages with Cardzy.',
  keywords: DEFAULT_KEYWORDS,
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
    description:
      'Create 3D animated wish cards, wedding invitations with WhatsApp RSVP, and smart digital business cards in 18 languages with Cardzy.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy — 3D Digital Cards, Wedding Invitations & Smart vCards',
    description:
      'Create 3D animated wish cards, wedding invitations with WhatsApp RSVP, and smart digital business cards in 18 languages.',
    images: ['/og-image.jpg'],
  },
}


const AdBanner = nextDynamic(
  () => import('@/components/ad-banner').then((mod) => mod.AdBanner)
)
const CategoryTabs = nextDynamic(
  () => import('@/components/home/category-tabs').then((mod) => mod.CategoryTabs)
)
const GamingWinnersSection = nextDynamic(
  () => import('@/components/home/gaming-winners-section').then((mod) => mod.GamingWinnersSection)
)
const SocialProofSection = nextDynamic(
  () => import('@/components/home/social-proof').then((mod) => mod.SocialProofSection)
)
const InvitationsSection = nextDynamic(
  () => import('@/components/home/invitations-section').then((mod) => mod.InvitationsSection)
)
const ConciergeService = nextDynamic(
  () => import('@/components/home/concierge-service').then((mod) => mod.ConciergeService)
)
const StructuredFaqSection = nextDynamic(
  () => import('@/components/home/structured-faq').then((mod) => mod.StructuredFaqSection)
)
const FeaturedGuidesSection = nextDynamic(
  () => import('@/components/home/featured-guides').then((mod) => mod.FeaturedGuidesSection)
)
const HomeCTA = nextDynamic(
  () => import('@/components/home/home-cta').then((mod) => mod.HomeCTA)
)
const FloatingCTA = nextDynamic(
  () => import('@/components/home/floating-cta').then((mod) => mod.FloatingCTA)
)

const homepageJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cardzy',
    url: 'https://cardzy.online',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description:
      'Create 3D animated digital wish cards, wedding invitations with WhatsApp RSVP, and smart digital business cards in 18 languages.',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free — Standard wish cards with 3D animations and music',
      },
      {
        '@type': 'Offer',
        price: '4',
        priceCurrency: 'USD',
        description: 'Pro — Premium themes, WhatsApp RSVP, Google Maps, custom music',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cardzy.online',
      },
    ],
  },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Hero />
      
      {/* How it works right below Hero */}
      <HowItWorks />

      {/* Ad between sections */}
      <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

      {/* Consolidated categories in tab structure */}
      <CategoryTabs />

      {/* 🎮 Gaming Winner Cards Section */}
      <GamingWinnersSection />

      {/* 🌟 Social Proof & Testimonials Section */}
      <SocialProofSection />

      {/* RSVP feature block */}
      <InvitationsSection />

      {/* Concierge Custom Card Creation Service */}
      <ConciergeService />

      {/* ❓ High-Value Semantic Structured FAQ Section */}
      <StructuredFaqSection />

      {/* 📚 Editorial Guides & Celebration Wording Section (High-Value E-E-A-T) */}
      <FeaturedGuidesSection />

      {/* Final CTA block */}
      <HomeCTA />

      {/* Sticky Mobile Floating Button */}
      <FloatingCTA />
    </>
  )
}
