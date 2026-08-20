import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { getPageAlternates, PUBLIC_ROBOTS, DEFAULT_KEYWORDS, SITE_PUBLISHER } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    keywords: DEFAULT_KEYWORDS,
    publisher: SITE_PUBLISHER,
    alternates: getPageAlternates('/', lang),
    robots: PUBLIC_ROBOTS,
  }
}


const AdBanner = dynamic(
  () => import('@/components/ad-banner').then((mod) => mod.AdBanner)
)
const CategoryTabs = dynamic(
  () => import('@/components/home/category-tabs').then((mod) => mod.CategoryTabs)
)
const GamingWinnersSection = dynamic(
  () => import('@/components/home/gaming-winners-section').then((mod) => mod.GamingWinnersSection)
)
const SocialProofSection = dynamic(
  () => import('@/components/home/social-proof').then((mod) => mod.SocialProofSection)
)
const InvitationsSection = dynamic(
  () => import('@/components/home/invitations-section').then((mod) => mod.InvitationsSection)
)
const ConciergeService = dynamic(
  () => import('@/components/home/concierge-service').then((mod) => mod.ConciergeService)
)
const StructuredFaqSection = dynamic(
  () => import('@/components/home/structured-faq').then((mod) => mod.StructuredFaqSection)
)
const HomeCTA = dynamic(
  () => import('@/components/home/home-cta').then((mod) => mod.HomeCTA)
)
const FloatingCTA = dynamic(
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

      {/* Final CTA block */}
      <HomeCTA />

      {/* Sticky Mobile Floating Button */}
      <FloatingCTA />
    </>
  )
}
