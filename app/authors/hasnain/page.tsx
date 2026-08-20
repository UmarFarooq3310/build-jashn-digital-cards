import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog/data'
import { Award, BookOpen, ExternalLink } from 'lucide-react'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Hasnain — Creative Events & Culture Editor | Cardzy',
    description:
      'Hasnain is a Creative & Cultural Events Editor at Cardzy, writing guides on holiday e-cards, party invitations, and digital sharing etiquette.',
    keywords: [
      'Hasnain Cardzy',
      'events editor',
      'holiday ecards author',
      'birthday invitation writer',
      'Cardzy authors',
    ],
    alternates: getPageAlternates('/authors/hasnain', lang),
    robots: PUBLIC_ROBOTS,
  }
}

import { Breadcrumbs } from '@/components/breadcrumbs'

export default function HasnainAuthorPage() {
  const authorPosts = BLOG_POSTS.filter((post) => post.author.name === 'Hasnain')

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 w-full">
      <Breadcrumbs
        items={[
          { label: 'Authors & Editors', href: '/about' },
          { label: 'Hasnain' },
        ]}
        className="mb-6"
      />
      {/* Header Profile Section */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="size-24 sm:size-28 rounded-full bg-blue-950 text-blue-300 font-extrabold text-3xl flex items-center justify-center border-4 border-blue-400/30 shadow-md shrink-0">
            H
          </div>
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Award className="size-3.5" /> Global Events Editor
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Hasnain
            </h1>
            <p className="text-sm sm:text-base font-semibold text-muted-foreground">
              Global Creative & Cultural Events Editor, Cardzy
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-muted-foreground">
              <span>📍 Karachi / Islamabad, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Bio Body */}
        <div className="mt-8 pt-8 border-t border-border/60 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            Hasnain is the Global Creative & Cultural Events Editor at Cardzy, crafting guides on 3D animated holiday e-cards (Christmas, Thanksgiving, New Year, Diwali), birthday party invitations, and digital sharing etiquette.
          </p>
          <p>
            Passionate about multilingual digital storytelling, Hasnain explores how families across 60+ countries use Cardzy to send personalized wish cards in 18 languages via WhatsApp, Instagram Stories, and SMS.
          </p>
          <p>
            His articles help users choose the right design themes, write heartfelt blessings, and navigate digital invitation etiquette for global celebrations.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap gap-4 text-xs font-bold">
          <a
            href="https://www.instagram.com/cardzyonline?igsh=MXNmMTllajE5cG5zZQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 hover:bg-muted transition-colors text-foreground"
          >
            <svg className="size-4 text-pink-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg> Instagram Profile <ExternalLink className="size-3 text-muted-foreground" />
          </a>
          <a
            href="https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 hover:bg-muted transition-colors text-foreground"
          >
            🎵 TikTok @cardzyonline <ExternalLink className="size-3 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Authored Articles */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
            Articles & Guides by Hasnain
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border/80 bg-card p-5 shadow-2xs hover:border-blue-500/40 hover:shadow-sm transition-all flex flex-col justify-between"
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
                <span>{post.readTime} read</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:underline">Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
