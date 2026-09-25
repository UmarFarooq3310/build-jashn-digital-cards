"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, Clock, Sparkles } from "lucide-react"

const FEATURED_GUIDES = [
  {
    slug: "complete-guide-to-pakistani-wedding-invitation-wording-urdu-english",
    title: "The Complete Guide to Pakistani & Islamic Wedding Invitation Wording (Urdu & English)",
    excerpt: "Master bilingual wording for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, celebrated quotes, and RSVP etiquette.",
    category: "Wedding & Nikkah",
    categoryColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    author: "Umar Farooq",
    authorRole: "Senior Cultural Event & Wedding Stylist",
    authorAvatar: "/authors/umar-farooq.svg",
    authorHref: "/authors/umar-farooq",
    readTime: "14 min read",
  },
  {
    slug: "smart-digital-business-cards-for-pakistani-entrepreneurs-and-executives",
    title: "Smart Digital Business Cards for Pakistani Entrepreneurs & Executives (2026)",
    excerpt: "How contactless vCards with instant .vcf downloads and QR codes are replacing paper visiting cards for modern professionals in Pakistan.",
    category: "Business & vCards",
    categoryColor: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    author: "Kainat",
    authorRole: "Tech & Digital Product Strategist",
    authorAvatar: "/authors/kainat.svg",
    authorHref: "/authors/kainat",
    readTime: "10 min read",
  },
  {
    slug: "ultimate-guide-to-global-holiday-ecards-christmas-thanksgiving-newyear",
    title: "The Ultimate Guide to Global Holiday E-Cards: Christmas, Thanksgiving & New Year 2026",
    excerpt: "Etiquette, heartfelt wording templates, and step-by-step guidance for sending animated holiday greeting cards across global time zones.",
    category: "Eid & Holidays",
    categoryColor: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
    author: "Hasnain",
    authorRole: "Creative & Cultural Events Editor",
    authorAvatar: "/authors/hasnain.svg",
    authorHref: "/authors/hasnain",
    readTime: "11 min read",
  },
  {
    slug: "how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly",
    title: "How to Manage Pakistani Wedding Guest Lists & WhatsApp RSVPs Effortlessly",
    excerpt: "Stop chasing guests manually. Discover how interactive digital invitations automate RSVP headcounts, dietary notes, and event countdowns.",
    category: "Event Planning",
    categoryColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
    author: "Umar Farooq",
    authorRole: "Senior Cultural Event & Wedding Stylist",
    authorAvatar: "/authors/umar-farooq.svg",
    authorHref: "/authors/umar-farooq",
    readTime: "9 min read",
  },
]

export function FeaturedGuidesSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/80 bg-gradient-to-b from-background via-card/50 to-background py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <BookOpen className="size-3.5" />
              <span>Editorial Guides &amp; Inspiration</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Master Celebration Wording &amp; Digital Etiquette
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Authored by our cultural stylists and technology editors. Explore wording formulas, Urdu Nastaliq calligraphy tips, and digital invitation advice.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start md:self-end text-sm font-bold text-[#D4AF37] hover:underline underline-offset-4 shrink-0 transition-colors"
          >
            <span>View All 24 Master Guides</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${guide.categoryColor}`}>
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  <Link href={`/blog/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-4">
                <Link
                  href={guide.authorHref}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <div className="relative size-8 rounded-full overflow-hidden border border-border bg-muted">
                    <Image
                      src={guide.authorAvatar}
                      alt={guide.author}
                      width={32}
                      height={32}
                      className="object-cover size-full"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-foreground">
                      {guide.author}
                    </span>
                    <span className="block text-[11px] text-muted-foreground truncate max-w-[180px] sm:max-w-[220px]">
                      {guide.authorRole}
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/blog/${guide.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:translate-x-0.5 transition-transform shrink-0"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Need tailored invitation wording in Urdu, English, or Arabic?</p>
              <p className="text-xs text-muted-foreground">Browse all 24 curated wording templates or request custom calligraphy assistance.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/calendar"
              className="text-xs font-bold text-[#D4AF37] hover:underline transition-colors"
            >
              🗓️ Celebration Calendar (80+ Events)
            </Link>
            <Link
              href="/authors"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Meet Authors
            </Link>
            <Link
              href="/blog"
              className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-black hover:bg-[#c49f30] transition-colors shadow-xs"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
