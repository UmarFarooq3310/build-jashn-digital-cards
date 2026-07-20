import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, BookOpen, Clock, Calendar, Heart, Share2, Sparkles, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eid Mubarak Wish Wording & Urdu Messages Ideas — Cardzy',
  description:
    'Browse our curated collection of Eid Mubarak wishes, traditional Urdu greetings, and poetry verses for digital animated greeting cards.',
  keywords: [
    'Eid Mubarak wishes in Urdu',
    'Eid card wording templates',
    'bilingual eid greeting messages',
    'Urdu poetry for Eid cards',
    'send digital Eid wishes Pakistan',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards',
  description: 'Browse our curated collection of Eid Mubarak wishes, traditional Urdu greetings, and poetry verses for digital animated greeting cards.',
  url: 'https://cardzy.online/guide/eid-wording-ideas',
  author: {
    '@type': 'Organization',
    name: 'Cardzy Editorial Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cardzy.online/favicon.svg',
    },
  },
  datePublished: '2026-07-08',
  dateModified: '2026-07-18',
}

export default function EidGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          
          {/* Back button */}
          <Link
            href="/guide"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> Back to Guides
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-10">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Eid Greetings
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
                Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards
              </h1>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/60 py-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" /> Published July 8, 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" /> 4 min read
                </span>
                <span>By Cardzy Editorial Team</span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">
              
              <p>
                Eid-ul-Fitr and Eid-ul-Adha are times of immense gratitude, gathering, and sharing love with family. A long-standing subcontinental tradition is sending Eid cards to loved ones. While paper cards are harder to find, sending an <strong>animated digital wish card</strong> brings back that exact nostalgia with full audio chimes, sliding calligraphy, and custom animations.
              </p>
              <p>
                If you are creating an Eid card on Cardzy, choosing the right words makes a huge difference. Here is our curated collection of short, formal, and poetic greetings in English and Urdu that you can copy and use directly.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                1. Classic & Short English Wording
              </h2>
              <p>
                These are perfect for sharing with colleagues, friends, or on your social media status. They are concise yet warm:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>&quot;May this blessed day bring peace, happiness, and prosperity to your home. Eid Mubarak to you and your family!&quot;</li>
                <li>&quot;Wishing you a joyous Eid filled with laughter, delicious feasts, and cherished moments with loved ones.&quot;</li>
                <li>&quot;May the guidance and blessings of Allah be with you and your family today and always. Eid Mubarak!&quot;</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                2. Heartwarming Family Messages
              </h2>
              <p>
                When sending to close relatives, grandparents, or cousins, choose a message that emphasizes togetherness and connection:
              </p>
              <blockquote>
                <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-1">
                  &quot;Even though we are miles apart this Eid, you are always in our hearts and prayers. Sending you our warmest hugs and wishes for a beautiful Eid celebration. Can&apos;t wait to celebrate together soon!&quot;
                </p>
              </blockquote>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                3. Urdu Wording & Traditional Poetry (Shayari)
              </h2>
              <p>
                Expressing Eid greetings in Urdu carries a special emotional depth. In Cardzy, our templates render Urdu in the beautiful <strong>Noto Nastaliq Urdu</strong> font, which looks incredibly elegant.
              </p>

              <div className="space-y-4 my-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h4 className="font-bold text-xs sm:text-sm text-muted-foreground uppercase mb-2">Traditional Blessing Wording</h4>
                  <p className="text-base sm:text-lg font-urdu text-primary text-right leading-relaxed">
                    آپ کو اور آپ کے تمام اہل خانہ کو میری طرف سے عید سعید مبارک۔ اللہ تعالیٰ آپ کی زندگی کو خوشیوں، صحت اور تندرستی سے بھر دے۔ آمین۔
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h4 className="font-bold text-xs sm:text-sm text-muted-foreground uppercase mb-2">Beautiful Eid Poetry (Eid Shayari)</h4>
                  <p className="text-base sm:text-lg font-urdu text-primary text-center leading-relaxed py-2">
                    عید کا دن ہے گلے ہم کو لگا کر ملئے<br />
                    رسم دنیا بھی ہے، موقع بھی ہے، دستور بھی ہے
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    (A perfect poetic couplet to send to your spouse or close friends!)
                  </p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                4. Customizing Your Eid Card on Cardzy
              </h2>
              <p>
                Ready to create your card? Follow these quick steps to make it stand out:
              </p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Select the Eid Mubarak Occasion:</strong> Head to the Wish builder and select Eid.
                </li>
                <li>
                  <strong>Choose a Theme:</strong> The <em>Mughal Gold</em> theme features classic green and gold ornaments, perfect for religious celebrations. The <em>Midnight Kashi</em> theme offers deep blue tiling motifs.
                </li>
                <li>
                  <strong>Toggle Bilingual Language:</strong> Add your recipient name in English, and write a custom Urdu greeting in the Urdu input box.
                </li>
                <li>
                  <strong>Add Audio:</strong> Choose a festive background tune to play as the card animates open.
                </li>
              </ol>

            </div>

            {/* Article Footer / CTA */}
            <footer className="mt-12 border-t border-border/80 pt-8 text-center">
              <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5">
                <Heart className="size-5 text-primary shrink-0 animate-pulse" /> Send Your Blessings Today
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Customize your Eid card with animations, Urdu font, and traditional music. Share instantly on WhatsApp for free.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/create-wish?occasion=eid-ul-fitr"
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Send className="size-4" /> Send an Eid Wish Now
                </Link>
                <Link
                  href="/guide"
                  className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  More Celebration Guides
                </Link>
              </div>
            </footer>
          </article>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
