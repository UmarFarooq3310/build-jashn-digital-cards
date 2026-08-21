import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog/data'
import { Award, BookOpen, ExternalLink, GraduationCap, MapPin, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Umar Farooq — Senior Cultural Event & Wedding Stylist | Cardzy',
  description:
    'Umar Farooq is Senior Wedding Stylist at Cardzy, authoring guides on Pakistani wedding cards, Urdu calligraphy, and WhatsApp RSVP tech.',
  keywords: [
    'Umar Farooq Cardzy',
    'Pakistani wedding card stylist',
    'wedding invitation wording author',
    'Islamic wedding card expert',
    'Cardzy authors',
  ],
  alternates: getPageAlternates('/authors/umar-farooq'),
  robots: PUBLIC_ROBOTS,
}

// ── Person Structured Data (Schema.org E-E-A-T) ──────────────────────────────
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Umar Farooq',
  jobTitle: 'Senior Cultural Event & Wedding Stylist',
  worksFor: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
  image: 'https://cardzy.online/authors/umar-farooq.svg',
  description:
    'Senior Wedding Stylist at Cardzy specializing in South Asian and Islamic wedding traditions, Urdu/English wording, and RSVP tech.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National University of Sciences and Technology (NUST)',
  },
  knowsAbout: [
    'Pakistani Wedding Traditions',
    'Nikkah, Mehndi, Barat & Walima Protocols',
    'Urdu Nastaliq Calligraphy & Typography',
    'WhatsApp RSVP Management',
    'Digital Greeting Cards',
  ],
  sameAs: [
    'https://www.instagram.com/cardzyonline',
    'https://www.tiktok.com/@cardzyonline',
    'https://www.facebook.com/share/1bPTaFnxDz/',
  ],
  email: 'mailto:cardzyonline@gmail.com',
}

export default function UmarFarooqAuthorPage() {
  const authorPosts = BLOG_POSTS.filter((post) => post.author.name === 'Umar Farooq')

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
            { label: 'Umar Farooq' },
          ]}
          className="mb-6"
        />

        {/* ── Author Profile Card ────────────────────────────────────── */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Author Photo / Avatar with Verified Ring */}
            <div className="relative shrink-0">
              <div className="size-28 sm:size-32 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-amber-900 p-1 shadow-lg shadow-emerald-950/20 overflow-hidden">
                <img
                  src="/authors/umar-farooq.svg"
                  alt="Umar Farooq - Senior Cultural Event & Wedding Stylist"
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  <Award className="size-3.5 text-emerald-600" /> Senior Editorial Lead
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  <Sparkles className="size-3 text-amber-500" /> 8+ Yrs Experience
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Umar Farooq
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400">
                Senior Cultural Event &amp; Wedding Stylist · Cardzy Digital Solutions
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 text-amber-600 shrink-0" /> Islamabad / Rawalpindi, Pakistan
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3.5 text-emerald-600 shrink-0" /> B.S. Communication &amp; Design (NUST)
                </span>
              </div>
            </div>
          </div>

          {/* ── Professional Bio ──────────────────────────────────────── */}
          <div className="pt-6 border-t border-border space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Umar Farooq</strong> serves as the Senior Cultural Event &amp; Wedding Stylist at Cardzy Digital Solutions. With over eight years of hands-on experience in wedding event design, bilingual invitation copywriting, and South Asian celebratory traditions, Umar leads Cardzy&rsquo;s cultural styling initiatives.
            </p>
            <p>
              Drawing from real-world event coordination for Nikkah, Mehndi, Barat, and Walima celebrations across Pakistan, the UAE, the UK, and North America, Umar specializes in marrying traditional Urdu Nastaliq calligraphy and Islamic honorific etiquette with cutting-edge 3D interactive greeting card technology and automated WhatsApp RSVP workflows.
            </p>
            <p>
              His guides have helped thousands of couples and families design respectful, culturally rich invitations while eliminating the printing costs, delays, and environmental footprint of traditional paper cards.
            </p>
          </div>

          {/* ── Credentials & Expertise Grid ─────────────────────────── */}
          <div className="pt-6 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3.5">
              Credentials &amp; Areas of Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                'Pakistani & South Asian Wedding Protocols (Nikkah, Mehndi, Barat, Walima)',
                'Urdu Nastaliq Calligraphy & Arabic Bismillah Invocations',
                'WhatsApp RSVP Architecture & Guest Management Etiquette',
                'Eco-friendly Paperless Event Technology & Digital Concierge',
                'Bilingual English/Urdu Wedding Poetry & Quote Curation',
                'Diaspora Celebration Coordination (UK, US, Canada, UAE, Australia)',
              ].map((cred) => (
                <div key={cred} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-muted/20 p-3 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
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
                href="mailto:cardzyonline@gmail.com?subject=Question%20for%20Umar%20Farooq"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-muted transition-colors text-foreground"
              >
                <Mail className="size-4 text-emerald-600" />
                <span>Contact via Cardzy Editorial</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Authored Articles Section ──────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Published Guides by Umar Farooq
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authorPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.metaDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                  <span>{post.readTime}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:underline">Read Master Guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
