import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { getPageAlternates, PUBLIC_ROBOTS, DEFAULT_KEYWORDS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cardzy — 3D Digital Wedding Invitations & Wish Cards',
  description:
    'Create interactive 3D animated greeting cards, Pakistani wedding invitations with WhatsApp RSVP, and smart vCards. Free online card maker in 18 languages.',
  keywords: DEFAULT_KEYWORDS,
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Cardzy — 3D Digital Wedding Invitations & Wish Cards',
    description:
      'Tap to open interactive 3D animated greeting cards, wedding invitations with automated WhatsApp RSVP tracking, and smart vCards.',
    url: 'https://cardzy.online',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: 'https://cardzy.online/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Cardzy — 3D Digital Wedding Invitations & Animated Wish Cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardzy — 3D Digital Wedding Invitations & Animated Wish Cards',
    description:
      'Create interactive 3D animated cards, Pakistani wedding invitations with WhatsApp RSVP, and digital visiting cards in 18 languages.',
    images: ['https://cardzy.online/og-image.jpg'],
  },
}


const AdBanner = nextDynamic(
  () => import('@/components/ad-banner').then((mod) => mod.AdBanner)
)
const CategoryTabs = nextDynamic(
  () => import('@/components/home/category-tabs').then((mod) => mod.CategoryTabs)
)
const PoetryShowcaseSection = nextDynamic(
  () => import('@/components/home/poetry-showcase-section').then((mod) => mod.PoetryShowcaseSection)
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

export default function Page() {
  return (
    <>
      <Hero />
      
      {/* How it works right below Hero */}
      <HowItWorks />

      {/* Ad between sections */}
      <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

      {/* Consolidated categories in tab structure */}
      <CategoryTabs />

      {/* 📜 1,000+ World Poetry Treasury Showcase Section */}
      <PoetryShowcaseSection />

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
