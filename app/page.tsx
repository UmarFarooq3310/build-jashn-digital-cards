import dynamic from 'next/dynamic'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/sections'

const AdBanner = dynamic(
  () => import('@/components/ad-banner').then((mod) => mod.AdBanner)
)
const CategoryTabs = dynamic(
  () => import('@/components/home/sections').then((mod) => mod.CategoryTabs)
)
const InvitationsSection = dynamic(
  () => import('@/components/home/sections').then((mod) => mod.InvitationsSection)
)
const ConciergeService = dynamic(
  () => import('@/components/home/sections').then((mod) => mod.ConciergeService)
)
const HomeCTA = dynamic(
  () => import('@/components/home/sections').then((mod) => mod.HomeCTA)
)
const FloatingCTA = dynamic(
  () => import('@/components/home/sections').then((mod) => mod.FloatingCTA)
)

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        
        {/* How it works moved higher, right below the Hero */}
        <HowItWorks />

        {/* Ad between sections */}
        <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

        {/* Consolidated categories in a beautiful tab structure */}
        <CategoryTabs />

        {/* RSVP feature block */}
        <InvitationsSection />

        {/* Concierge Custom Card Creation Service ("We Create For You!") */}
        <ConciergeService />

        {/* Final CTA block */}
        <HomeCTA />
      </main>

      {/* Sticky Mobile Floating Button */}
      <FloatingCTA />

      <SiteFooter />
    </div>
  )
}
