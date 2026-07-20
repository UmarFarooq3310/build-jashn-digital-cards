'use client'

import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

interface Guide {
  slug: string
  title: string
  titleUrdu: string
  description: string
  descriptionUrdu: string
  readTime: string
  readTimeUrdu: string
  date: string
  category: string
  categoryUrdu: string
}

const GUIDES: Guide[] = [
  {
    slug: 'pakistani-wedding-invitations',
    title: 'How to Design the Perfect Digital Wedding Invitation: Wording & Etiquette',
    titleUrdu: 'مکمل ڈیجیٹل شادی کا دعوت نامہ کیسے بنائیں: الفاظ اور طریقے',
    description:
      'A comprehensive guide outlining wording templates, timeline tips, and theme selection for Wedding, Mehndi, Baraat, Walima, and other celebration events.',
    descriptionUrdu: 'شادی، مہندی، بارات اور ولیمہ کی تقریبات کے لیے بہترین الفاظ، وقت کی تجاویز اور تھیم کے انتخاب کا مکمل گائیڈ۔',
    readTime: '6 min read',
    readTimeUrdu: '6 منٹ مطالعہ',
    date: 'July 18, 2026',
    category: 'Weddings',
    categoryUrdu: 'شادیاں',
  },
  {
    slug: 'eid-wording-ideas',
    title: 'Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards',
    titleUrdu: 'عید مبارک وش کارڈز کے لیے بہترین اور خوبصورت الفاظ کے خیالات',
    description:
      'Discover traditional blessings, modern wording, and beautiful bilingual text templates to send to family and friends this Eid.',
    descriptionUrdu: 'عید پر اپنے پیاروں کو بھیجنے کے لیے روایتی اور جدید خوبصورت پیغامات اور ٹیمپلیٹس۔',
    readTime: '4 min read',
    readTimeUrdu: '4 منٹ مطالعہ',
    date: 'July 15, 2026',
    category: 'Eid Greetings',
    categoryUrdu: 'عید مبارک',
  },
]

export function GuideClientContent() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <BookOpen className="size-4" /> {t('learningHub') || 'Learning Hub'}
        </span>
        <h1 className={cn(
          "mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl",
          isUrdu ? "font-urdu leading-relaxed py-2 text-3xl sm:text-4xl" : "leading-tight"
        )}>
          {t('celebrationGuidesIdeas') || 'Celebration Guides & Ideas'}
        </h1>
        <p className={cn(
          "mt-3 text-lg text-muted-foreground max-w-2xl mx-auto",
          isUrdu ? "font-urdu leading-relaxed text-base sm:text-lg" : "leading-relaxed"
        )}>
          {t('guideSub') || 'Find inspiration, wording templates, and step-by-step guides to design beautiful digital invitations and wish cards for every occasion.'}
        </p>
      </div>

      {/* Guide Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {GUIDES.map((g) => {
          const title = lang === 'ur' ? g.titleUrdu : (t(`guide_${g.slug.replace(/-/g, '_')}_title`) || g.title)
          const description = lang === 'ur' ? g.descriptionUrdu : (t(`guide_${g.slug.replace(/-/g, '_')}_desc`) || g.description)
          const category = lang === 'ur' ? g.categoryUrdu : g.category
          const readTime = lang === 'ur' ? g.readTimeUrdu : g.readTime

          return (
            <article
              key={g.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    {category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" /> {readTime}
                  </span>
                </div>

                <h2 className={cn(
                  "mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors",
                  isUrdu && "font-urdu leading-relaxed py-1"
                )}>
                  <Link href={`/guide/${g.slug}`}>
                    <span className="absolute inset-0" />
                    {title}
                  </Link>
                </h2>

                <p className={cn(
                  "mt-3 text-sm leading-relaxed text-muted-foreground",
                  isUrdu && "font-urdu leading-relaxed py-1"
                )}>
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="size-3.5" /> {g.date}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:translate-x-1 transition-transform">
                  {t('readGuide') || 'Read Guide'} <ArrowRight className="size-3.5" />
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
