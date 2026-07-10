import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Celebration Guides & Wording Ideas — Jashn Digital Cards',
  description:
    'Explore our collection of expert guides for designing digital Pakistani wedding invitations, Eid wish cards, Valima messages, and more. Find wording templates and tips.',
  keywords: [
    'Pakistani wedding card templates',
    'Eid Mubarak wishes wording',
    'shaadi card design guides',
    'bilingual digital cards pakistan',
    'how to design mehndi cards',
  ],
}

interface Guide {
  slug: string
  title: string
  description: string
  readTime: string
  date: string
  category: string
}

const GUIDES: Guide[] = [
  {
    slug: 'pakistani-wedding-invitations',
    title: 'How to Design the Perfect Pakistani Wedding Invitation: Wording & Etiquette',
    description:
      'A comprehensive guide outlining Urdu/English wording templates, timeline configuration, and theme selection for Shaadi, Mehndi, and Valima celebrations.',
    readTime: '6 min read',
    date: 'July 10, 2026',
    category: 'Weddings',
  },
  {
    slug: 'eid-wording-ideas',
    title: 'Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards',
    description:
      'Discover traditional blessings, modern wording, and beautiful bilingual (Urdu & English) text templates to send to family and friends this Eid.',
    readTime: '4 min read',
    date: 'July 8, 2026',
    category: 'Eid Greetings',
  },
]

export default function GuideIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <BookOpen className="size-4" /> Learning Hub
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Celebration Guides & Ideas
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find inspiration, wording templates, and step-by-step guides to design beautiful, modern digital invitations and wish cards for every major occasion.
            </p>
          </div>

          {/* Guide Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {GUIDES.map((g) => (
              <article
                key={g.slug}
                className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {g.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {g.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="mt-6 text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/guide/${g.slug}`}>
                      <span className="absolute inset-0 rounded-3xl" aria-hidden="true" />
                      {g.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {g.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold text-primary">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" /> Published {g.date}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="size-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Prompt/CTA */}
          <div className="mt-16 text-center rounded-3xl border border-primary/20 bg-primary/5 p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="size-5 text-primary shrink-0" /> Ready to design your invitation?
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Jashn offers ready-made digital templates with interactive RSVP, calligraphy, and music. Use our guides to plan and launch your invite.
              </p>
            </div>
            <Link
              href="/create-invitation"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
            >
              Create Invitation Free
            </Link>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
