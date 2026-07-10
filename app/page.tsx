import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { AdBanner } from '@/components/ad-banner'
import Script from 'next/script'
import {
  CategoryTabs,
  InvitationsSection,
  HowItWorks,
  SampleCards,
  HomeCTA,
  FloatingCTA,
} from '@/components/home/sections'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8899224608517833"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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

        {/* Ad before sample cards */}
        <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

        {/* Consolidated Swipeable/Carousel Showcase */}
        <SampleCards />

        {/* Final CTA block */}
        <HomeCTA />
      </main>

      {/* Sticky Mobile Floating Button */}
      <FloatingCTA />

      <SiteFooter />
    </div>
  )
}
