'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Heart, Send } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const BIRTHDAY_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: { en: 'Back to Guides' },
  badge: { en: 'Birthday Wishes' },
  title: {
    en: 'Birthday Wish Wording Ideas: Heartfelt, Funny & Formal Messages for Every Card',
  },
  publishedDate: { en: 'Published August 6, 2026' },
  readTime: { en: '5 min read' },
  author: { en: 'By Cardzy Editorial Team' },
  introP1: {
    en: "The hardest part of sending a birthday card is rarely the design — it's staring at a blank message box, trying to find words that actually sound like you. Below are wording ideas sorted by tone and relationship, so you can pick one, tweak it with a name or an inside joke, and send it in under a minute.",
  },
  sec1Title: { en: '1. Short & Sweet (Works for Almost Anyone)' },
  sec1Bullet1: {
    en: 'Wishing you a birthday that\'s as wonderful as you are. Here\'s to another year of good things!',
  },
  sec1Bullet2: {
    en: 'Happy birthday! May this year bring you more laughter, less stress, and everything you\'ve been hoping for.',
  },
  sec1Bullet3: {
    en: 'Another year older, another year more amazing. Have a fantastic birthday!',
  },
  sec2Title: { en: '2. Heartfelt Messages for Family & Close Friends' },
  sec2Quote: {
    en: "Watching you grow into who you are has been one of the best parts of my life. On your birthday, I just want you to know how proud I am of you, and how grateful I am to have you in my corner. Here's to celebrating every version of you, this year and every year after.",
  },
  sec3Title: { en: '3. Funny & Playful Wishes for Close Friends' },
  sec3Bullet1: {
    en: "Happy birthday! You're not getting older, you're just becoming a rarer vintage.",
  },
  sec3Bullet2: {
    en: 'Congratulations on surviving another year of my terrible jokes. Here\'s to many more!',
  },
  sec3Bullet3: {
    en: "I was going to get you a gift, but then I remembered you already have me as a friend. You're welcome.",
  },
  sec4Title: { en: '4. Formal Wording for Coworkers & Acquaintances' },
  sec4Bullet1: {
    en: 'Wishing you a very happy birthday and a year filled with great health, success, and happiness.',
  },
  sec4Bullet2: {
    en: "On your special day, we wanted to take a moment to wish you a wonderful birthday and thank you for all you bring to the team.",
  },
  sec5Title: { en: '5. Messages for a Child\'s Birthday' },
  sec5Bullet1: {
    en: 'Happy birthday to a truly special kid! May your day be filled with cake, balloons, and all your favorite things.',
  },
  sec5Bullet2: {
    en: "You're another year older and another year more awesome. Have the best birthday ever!",
  },
  sec6Title: { en: '6. Customizing Your Birthday Card on Cardzy' },
  step1Title: { en: 'Pick the Birthday Template' },
  step1Desc: { en: 'Open the Wish builder and choose from confetti, balloon, or cake-themed animated designs.' },
  step2Title: { en: 'Match the Wording to the Relationship' },
  step2Desc: { en: 'Use a heartfelt message for family, a playful one for close friends, or a formal note for coworkers — pick from the ideas above or write your own.' },
  step3Title: { en: 'Add a Personal Touch' },
  step3Desc: { en: 'Upload a favorite photo together, or record a short voice note so the birthday person hears your message, not just reads it.' },
  step4Title: { en: 'Share Instantly' },
  step4Desc: { en: 'Get a shareable link and send it directly on WhatsApp, no printing, no waiting, no shipping cost.' },
  ctaTitle: { en: 'Send a Birthday Wish Today' },
  ctaDesc: {
    en: 'Build an animated birthday card in minutes with music, photos, and a message that actually sounds like you. Share it free on WhatsApp.',
  },
  sendWishBtn: { en: 'Create a Birthday Card Now' },
  moreGuidesBtn: { en: 'More Celebration Guides' },
}

export default function BirthdayGuidePage() {
  const { lang, t } = useLang()

  const getText = (key: string) => {
    return BIRTHDAY_GUIDE_TEXT[key]?.[lang] || BIRTHDAY_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-4">

        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" /> {getText('backToGuides')}
        </Link>

        <article>
          <header className="mb-10">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
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
              <span>{getText('author')}</span>
            </div>
          </header>

          <div className="prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">

            <p>{getText('introP1')}</p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec1Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec1Bullet1')}&quot;</li>
              <li>&quot;{getText('sec1Bullet2')}&quot;</li>
              <li>&quot;{getText('sec1Bullet3')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec2Title')}
            </h3>
            <blockquote>
              <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-1">
                &quot;{getText('sec2Quote')}&quot;
              </p>
            </blockquote>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec3Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec3Bullet1')}&quot;</li>
              <li>&quot;{getText('sec3Bullet2')}&quot;</li>
              <li>&quot;{getText('sec3Bullet3')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec4Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec4Bullet1')}&quot;</li>
              <li>&quot;{getText('sec4Bullet2')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec5Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec5Bullet1')}&quot;</li>
              <li>&quot;{getText('sec5Bullet2')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec6Title')}
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>{getText('step1Title')}: </strong>{getText('step1Desc')}</li>
              <li><strong>{getText('step2Title')}: </strong>{getText('step2Desc')}</li>
              <li><strong>{getText('step3Title')}: </strong>{getText('step3Desc')}</li>
              <li><strong>{getText('step4Title')}: </strong>{getText('step4Desc')}</li>
            </ol>

          </div>

          <footer className="mt-12 border-t border-border/80 pt-8 text-center">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5">
              <Heart className="size-5 text-primary shrink-0 animate-pulse" /> {getText('ctaTitle')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              {getText('ctaDesc')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/create-wish"
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
