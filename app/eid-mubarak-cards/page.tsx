import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Sparkles, Send, Globe, MessageSquare, MapPin, Clock, HelpCircle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eid Mubarak Cards: Digital Greetings | Cardzy',
  description:
    'Create interactive Eid Mubarak digital cards with Cardzy. Personalize greetings in 18 languages, track RSVPs, and share via WhatsApp in seconds.',
  keywords: [
    'Eid Mubarak cards',
    'digital Eid greetings',
    'personalized Eid wish card',
    'online Eid invitation card',
    'WhatsApp Eid cards',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I send Eid Mubarak digital cards in Arabic or Urdu via WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Cardzy supports 18 languages, including full right-to-left (RTL) typography for Arabic and Urdu. You can customize your message in your preferred script and share the card link directly to WhatsApp contacts or group chats instantly.',
      },
    },
  ],
}

export default function EidMubarakCardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors mb-6"
          >
            <ArrowLeft className="size-4" /> Back to Wish Cards
          </Link>

          <article>
            {/* Header */}
            <header className="mb-8">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Sparkles className="size-3.5" /> Occasion Landing Page
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
                Interactive Digital Eid Mubarak Cards & Event Invitations
              </h1>
            </header>

            {/* Main Template Preview Image Banner */}
            <div className="my-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 flex items-center justify-center p-6 text-center">
                <div className="space-y-3">
                  <div className="inline-block rounded-full bg-amber-400/20 px-4 py-1 text-xs font-semibold text-amber-300 backdrop-blur-xs">
                    Template Preview
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">
                    Eid Mubarak عید مبارک
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md mx-auto">
                    Interactive crescent moon & lantern themes with WhatsApp RSVP & custom music
                  </p>
                </div>
              </div>
              <div className="p-4 bg-muted/30 border-t border-border/60 text-xs text-muted-foreground text-center italic">
                <strong>Preview Image Alt Text:</strong> Interactive gold-accented Eid Mubarak digital card preview with crescent moon calligraphy, live countdown timer, and WhatsApp RSVP button.
              </div>
            </div>

            {/* Body Content */}
            <div className="prose prose-emerald max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">
              
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3 flex items-center gap-2">
                Celebrate Joy & Unity with Meaningful Eid Greetings
              </h2>
              <p>
                Eid is a time of spiritual reflection, gratitude, and heartfelt reunion. Whether marking the joyous end of Ramadan during Eid al-Fitr or honoring faith and togetherness on Eid al-Adha, sharing blessings lies at the core of the holiday. However, when family members and friends are scattered across the globe, traditional paper greetings can take days to arrive or get lost in transit.
              </p>
              <p>
                Cardzy bridges traditional warmth with instant modern connectivity. Our <strong>Eid Mubarak cards</strong> deliver your greetings instantly, bringing loved ones closer through rich visual aesthetics, animated crescent moons, classic arabesque art, and personalized photo or audio messages.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2">
                Why Cardzy’s Eid Mubarak Digital Cards Stand Out
              </h2>
              <p>
                Unlike static image files or generic e-cards that get buried in chat feeds, Cardzy offers a feature-rich, interactive experience designed for family greetings, community open houses, and corporate Eid Dawats.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
                  <Globe className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Multilingual in 18 Languages</h4>
                    <p className="text-xs text-muted-foreground mt-1">Share blessings in Arabic, Urdu, Turkish, English, French, Bengali, and 12 other languages with authentic scripts.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
                  <MessageSquare className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Instant WhatsApp Sharing</h4>
                    <p className="text-xs text-muted-foreground mt-1">Deliver your <strong>digital Eid greetings</strong> straight to individual chats or family broadcast groups in one tap.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">WhatsApp RSVP Tracking</h4>
                    <p className="text-xs text-muted-foreground mt-1">Hosting an Eid Dawat or dinner party? Collect headcounts and attendance confirmations directly via WhatsApp.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
                  <MapPin className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Google Maps & Countdown Clocks</h4>
                    <p className="text-xs text-muted-foreground mt-1">Embedded pin locations guide guests to your venue, while live countdown timers build excitement for Chaand Raat.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3 flex items-center gap-2">
                Personalize Your Eid Greetings in Minutes
              </h2>
              <p>
                Designing a <strong>personalized Eid wish card</strong> or <strong>online Eid invitation card</strong> takes only a few simple steps. Select from gold-accented or minimalist Islamic art themes, add family photos, craft custom messages, and append event details if hosting a gathering. Send instant warmth across borders so your greetings arrive right as the crescent moon is sighted.
              </p>

            </div>

            {/* Internal Links Box */}
            <div className="my-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Explore Related Cardzy Occasions
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">→</span>
                  <Link href="/create-wish?category=ramadan" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    Ramadan Mubarak Greetings
                  </Link> — Send holy month blessings to loved ones before Eid.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">→</span>
                  <Link href="/guide/pakistani-wedding-invitations" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    Pakistani & Islamic Wedding Invitations
                  </Link> — Plan post-Eid wedding functions with interactive maps & RSVPs.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">→</span>
                  <Link href="/create-wish?category=birthday" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    Custom Birthday Wish Cards
                  </Link> — Create animated year-round birthday wishes for family and friends.
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="my-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <HelpCircle className="size-5 text-amber-500" /> Frequently Asked Questions
              </h3>
              <div className="space-y-3 border-t border-border/60 pt-4">
                <h4 className="font-bold text-base text-foreground">
                  Can I send Eid Mubarak digital cards in Arabic or Urdu via WhatsApp?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes! Cardzy supports 18 languages, including full right-to-left (RTL) typography for Arabic and Urdu. You can customize your message in your preferred script and share the card link directly to WhatsApp contacts or group chats instantly.
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center rounded-3xl bg-gradient-to-r from-emerald-900 to-amber-950 p-8 text-white shadow-md">
              <h3 className="text-2xl font-extrabold">Ready to Send Your Eid Blessings?</h3>
              <p className="text-sm text-emerald-200 mt-2 max-w-md mx-auto">
                Customize your Eid Mubarak card with animations, Urdu/Arabic script, and background music in under 2 minutes.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/create-wish?category=eid"
                  className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Send className="size-4" /> Create Your Eid Card Now
                </Link>
              </div>
            </div>

          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
