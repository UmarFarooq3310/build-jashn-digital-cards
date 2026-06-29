import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { AdBanner } from '@/components/ad-banner'
import {
  WeddingSection,
  BirthdaysSection,
  FriendshipSection,
  InvitationsSection,
  CelebrationEventsSection,
  HowItWorks,
  SampleCards,
  HomeCTA,
} from '@/components/home/sections'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        
        <WeddingSection />
        <BirthdaysSection />

        {/* Ad between sections */}
        <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

        <FriendshipSection />
        <InvitationsSection />
        <CelebrationEventsSection />
        
        <HowItWorks />

        {/* Ad before sample cards */}
        <AdBanner format="display" className="mx-auto max-w-4xl px-4 py-2" />

        <SampleCards />
        <HomeCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
