import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog/data'
import { Award, BookOpen, ExternalLink, GraduationCap, MapPin, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Hasnain — Creative & Cultural Events Editor | Cardzy',
    description:
      'Hasnain is the Creative & Cultural Events Editor at Cardzy. Author of authoritative guides on 3D animated greeting cards, festive e-cards, and digital celebration etiquette.',
    keywords: [
      'Hasnain Cardzy',
      'holiday ecards editor',
      '3D greeting card author',
      'digital celebration etiquette',
      'Cardzy authors',
    ],
    alternates: getPageAlternates('/authors/hasnain', lang),
    robots: PUBLIC_ROBOTS,
  }
}

// ── Person Structured Data (Schema.org E-E-A-T) ──────────────────────────────
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hasnain',
  jobTitle: 'Creative & Cultural Events Editor',
  worksFor: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
  image: 'https://cardzy.online/authors/hasnain.svg',
  description:
    'Creative & Cultural Events Editor at Cardzy specializing in 3D animated greeting cards, cross-cultural celebrations across 18 languages, and instant mobile card sharing etiquette.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Karachi (UoK)',
  },
  knowsAbout: [
    '3D Animated Greeting Cards',
    'Cross-Cultural Celebration Etiquette',
    'Multilingual Digital Storytelling (18 Languages)',
    'Festive Holiday E-Cards (Eid, Christmas, Diwali, New Year)',
    'Mobile Social Sharing Optimization',
  ],
  sameAs: [
    'https://www.instagram.com/cardzyonline',
    'https://www.tiktok.com/@cardzyonline',
    'https://www.facebook.com/share/1bPTaFnxDz/',
  ],
  email: 'mailto:cardzyonline@gmail.com',
}

export default function HasnainAuthorPage() {
  const authorPosts = BLOG_POSTS.filter((post) => post.author.name === 'Hasnain')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Authors & Editors', href: '/authors' },
            { label: 'Hasnain' },
          ]}
          className="mb-6"
        />

        {/* ── Author Profile Card ────────────────────────────────────── */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Author Photo / Avatar with Verified Ring */}
            <div className="relative shrink-0">
              <div className="size-28 sm:size-32 rounded-3xl bg-gradient-to-br from-blue-800 via-indigo-900 to-sky-900 p-1 shadow-lg shadow-blue-950/20 overflow-hidden">
                <img
                  src="/authors/hasnain.svg"
                  alt="Hasnain - Creative & Cultural Events Editor"
                  width={128}
                  height={128}
                  className="size-full rounded-[22px] object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 size-8 rounded-full bg-emerald-600 border-2 border-card flex items-center justify-center text-white shadow-sm" title="Verified Editorial Author">
                <ShieldCheck className="size-4.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                  <Award className="size-3.5 text-blue-600" /> Global Events Editor
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                  <Sparkles className="size-3 text-indigo-500" /> 5+ Yrs Experience
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Hasnain
              </h1>
              <p className="text-sm sm:text-base font-semibold text-blue-700 dark:text-blue-400">
                Creative &amp; Cultural Events Editor · Cardzy Digital Solutions
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 text-amber-600 shrink-0" /> Karachi / Islamabad, Pakistan
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3.5 text-blue-600 shrink-0" /> B.A. Media Arts &amp; Creative Writing (UoK)
                </span>
              </div>
            </div>
          </div>

          {/* ── Professional Bio ──────────────────────────────────────── */}
          <div className="pt-6 border-t border-border space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Hasnain</strong> is the Creative &amp; Cultural Events Editor at Cardzy Digital Solutions, producing authoritative guides on festive digital greeting cards, 3D animations, music synchronization, and digital etiquette for international celebrations.
            </p>
            <p>
              With five years of experience in creative writing, digital media production, and cultural journalism, Hasnain explores how multicultural families in over 60 countries celebrate Eid ul Fitr, Eid ul Adha, Ramadan, Christmas, Diwali, Lunar New Year, Hanukkah, and birthdays through customized interactive digital wish cards.
            </p>
            <p>
              His articles provide actionable wording templates, design tips, and social sharing etiquette for WhatsApp, Instagram Direct, and instant messaging channels.
            </p>
          </div>

          {/* ── Credentials & Expertise Grid ─────────────────────────── */}
          <div className="pt-6 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3.5">
              Credentials &amp; Areas of Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                '3D Animated Greeting Card Architecture & Background Music Curation',
                'Global Holiday Traditions (Eid, Christmas, Diwali, New Year, Ramadan)',
                'Multilingual Celebration Copywriting in 18 Global Languages',
                'Digital Invitation & RSVP Social Etiquette for WhatsApp & SMS',
                'Creative Visual Storytelling & Mobile Confetti/Particle Animations',
                'Personalized Milestone Greetings (Birthdays, Graduations, Anniversaries)',
              ].map((cred) => (
                <div key={cred} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-muted/20 p-3 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Verified Social & Contact Links ──────────────────────── */}
          <div className="pt-6 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
              Connect &amp; Follow
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <a
                href="https://www.instagram.com/cardzyonline"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-muted transition-colors text-foreground"
              >
                <svg className="size-4 text-pink-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                </svg>
                <span>Instagram Profile</span>
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>

              <a
                href="https://www.tiktok.com/@cardzyonline"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-muted transition-colors text-foreground"
              >
                <span className="text-base">🎵</span>
                <span>TikTok @cardzyonline</span>
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>

              <a
                href="mailto:cardzyonline@gmail.com?subject=Question%20for%20Hasnain"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-muted transition-colors text-foreground"
              >
                <Mail className="size-4 text-blue-600" />
                <span>Contact via Cardzy Editorial</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Authored Articles Section ──────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Published Guides by Hasnain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authorPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-2xs hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.metaDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                  <span>{post.readTime}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:underline">Read Master Guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
