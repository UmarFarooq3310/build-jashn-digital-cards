'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Heart, Send, Wand2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { Breadcrumbs } from '@/components/breadcrumbs'

const MAGIC_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: { en: 'Back to Guides' },
  badge: { en: 'New Feature' },
  title: { en: 'How to Use Magic Links for Digital Cards' },
  publishedDate: { en: 'Sep 21, 2026' },
  readTime: { en: '3 min read' },
  author: { en: 'Umar Farooq' },
  introP1: { en: 'Say goodbye to wondering if your guest received your invitation or read your wish. With our new Magic Links feature, every digital card you share comes with its own real-time view tracking.' },
  sec1Title: { en: '1. What is a Magic Link?' },
  sec1Bullet1: { en: 'A unique URL generated specifically for an individual recipient.' },
  sec1Bullet2: { en: 'It instantly tracks when the recipient opens the link and views the card.' },
  sec2Title: { en: '2. How to Generate Magic Links' },
  sec2Bullet1: { en: 'Open any digital card (Wish, Invitation, or Visiting Card) that you created.' },
  sec2Bullet2: { en: 'Click the "Create Magic Link" button.' },
  sec2Bullet3: { en: 'Enter the recipient\'s name to generate their specific, tracked URL.' },
  sec3Title: { en: '3. Track the Views' },
  sec3Bullet1: { en: 'Head over to your Dashboard.' },
  sec3Bullet2: { en: 'Check the real-time "Viewed" status and timestamp to see exactly when they opened the card!' },
  ctaTitle: { en: 'Try Magic Links Now' },
  ctaDesc: { en: 'Start sending trackable cards today.' },
  sendWishBtn: { en: 'Create a Card' },
  moreGuidesBtn: { en: 'More Guides' },
}

export default function MagicLinksGuidePage() {
  const { lang, t } = useLang()

  const getText = (key: string) => {
    return MAGIC_GUIDE_TEXT[key]?.[lang] || MAGIC_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <Breadcrumbs
          items={[
            { label: 'Celebration Guides', href: '/guide' },
            { label: 'Magic Links Guide' },
          ]}
          className="mb-4"
        />

        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" /> {getText('backToGuides')}
        </Link>

        <article>
          <header className="mb-10">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 border border-indigo-500/20">
              {getText('badge')}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              {getText('title')}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/60 py-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" /> {getText('publishedDate')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" /> {getText('readTime')}
              </span>
              <span className="font-semibold text-foreground">
                {getText('author')}
              </span>
            </div>
          </header>

          <div className="prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">

            <p>{getText('introP1')}</p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec1Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec1Bullet1')}</li>
              <li>{getText('sec1Bullet2')}</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec2Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec2Bullet1')}</li>
              <li>{getText('sec2Bullet2')}</li>
              <li>{getText('sec2Bullet3')}</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec3Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec3Bullet1')}</li>
              <li>{getText('sec3Bullet2')}</li>
            </ul>
          </div>

          <footer className="mt-12 border-t border-border/80 pt-8 text-center">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5">
              <Wand2 className="size-5 text-indigo-500 shrink-0" /> {getText('ctaTitle')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              {getText('ctaDesc')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/create-invitation"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Send className="size-4" /> {getText('sendWishBtn')}
              </Link>
              <Link
                href="/guide"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                {getText('moreGuidesBtn')}
              </Link>
            </div>
          </footer>
        </article>

      </div>
    </div>
  )
}
