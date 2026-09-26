'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Heart,
  Copy,
  Check,
  Feather,
  Sparkles,
  Share2,
  Download,
  BookOpen,
  Layers,
  Search,
} from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

interface CuratedTreasuryVerse {
  id: string
  poet: string
  poetUrdu: string
  category: string
  themeBadge: string
  originalText: string
  translation: string
  mood: string
  verseId: string
}

const FEATURED_TREASURY_VERSES: CuratedTreasuryVerse[] = [
  {
    id: 'khudi-iqbal',
    poet: 'Allama Muhammad Iqbal',
    poetUrdu: 'علامہ محمد اقبال',
    category: 'خودی و حوصلہ',
    themeBadge: 'Khudi & Motivation',
    originalText: 'ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحان اور بھی ہیں',
    translation: 'Beyond these glittering stars lie yet other worlds; the trials of passionate love are not yet ended.',
    mood: 'Ambition & Self-Realization',
    verseId: 'poem-0001',
  },
  {
    id: 'ishq-ghalib',
    poet: 'Mirza Asadullah Khan Ghalib',
    poetUrdu: 'مرزا اسد اللہ خاں غالب',
    category: 'عشق و محبت',
    themeBadge: 'Ishq & Romance',
    originalText: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    translation: 'Thousands of intense desires, each worth dying for; many of my yearnings were fulfilled, yet so few they still seem.',
    mood: 'Longing & Human Condition',
    verseId: 'poem-0021',
  },
  {
    id: 'umeed-faiz',
    poet: 'Faiz Ahmed Faiz',
    poetUrdu: 'فیض احمد فیض',
    category: 'امید و بہار',
    themeBadge: 'Hope & Renewal',
    originalText: 'گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے',
    translation: 'May the vernal breeze breathe vibrant hues into the blossoms; do return, so the garden of happiness may flourish once more.',
    mood: 'Gentle Optimism & Longing',
    verseId: 'poem-0041',
  },
  {
    id: 'sufi-bakhsh',
    poet: 'Mian Muhammad Bakhsh',
    poetUrdu: 'میاں محمد بخش',
    category: 'تصوف و پنجابی کلام',
    themeBadge: 'Punjabi Sufi Classic',
    originalText: 'اول حمد ثنا الٰہی جو مالک ہر ہر دا\nاس دا نام چتارن والا ہر دم رہندا تردا',
    translation: 'First praise belongs to the Almighty Creator, the Sovereign of all; whoever cherishes His divine Name sails unharmed through life.',
    mood: 'Spiritual Peace & Devotion',
    verseId: 'poem-0071',
  },
  {
    id: 'hikmat-rumi',
    poet: 'Jalaluddin Rumi',
    poetUrdu: 'مولانا جلال الدین رومی',
    category: 'حکمت و روحانیت',
    themeBadge: 'Persian Spiritual',
    originalText: 'بشنو از نی چون حکایت می‌کند\nوز جدایی‌ها شکایت می‌کند',
    translation: 'Listen to the reed flute as it laments, telling the deep tale of eternal separation from its divine origin.',
    mood: 'Soulful Contemplation',
    verseId: 'poem-0081',
  },
  {
    id: 'darwish-life',
    poet: 'Mahmoud Darwish',
    poetUrdu: 'محمود درویش',
    category: 'عربی شاہکار',
    themeBadge: 'Arabic Resilience',
    originalText: 'وَنَحْنُ نُحِبُّ الحَيَاةَ إِذَا مَا اسْتَطَعْنَا إِلَيْهَا سَبِيلا',
    translation: 'And we love life whenever we can find a way to it; we celebrate existence against all odds.',
    mood: 'Defiance, Hope & Life',
    verseId: 'poem-0091',
  },
]

export default function PoetryGuidePage() {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  const showToast = useJashn((s) => s.showToast)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (verse: CuratedTreasuryVerse) => {
    const text = `${verse.originalText}\n\n— ${isUrdu ? verse.poetUrdu : verse.poet}\nhttps://cardzy.online/poetry`
    navigator.clipboard.writeText(text)
    setCopiedId(verse.id)
    showToast(isUrdu ? 'شعر کاپی ہو گیا! 📋' : 'Poetry copied to clipboard! 📋', 'success')
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleWhatsApp = (verse: CuratedTreasuryVerse) => {
    const text = encodeURIComponent(
      `${verse.originalText}\n\n— ${isUrdu ? verse.poetUrdu : verse.poet}\n\nhttps://cardzy.online/poetry`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  return (
    <div className="py-8 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-foreground">
      {/* Back button */}
      <Link
        href="/guide"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>{isUrdu ? 'واپس گائیڈز مرکز' : 'Back to Guides Hub'}</span>
      </Link>

      {/* Guide Header */}
      <div className="space-y-4 border-b border-border/80 pb-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Feather className="size-3.5 text-amber-500" />
          <span>{isUrdu ? 'شاعری و اسٹوری کارڈز گائیڈ' : 'Poetry Treasury & Story Cards Guide'}</span>
        </div>

        <h1 className={cn(
          "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
          isUrdu ? "font-urdu leading-relaxed" : "leading-tight"
        )}>
          {isUrdu
            ? 'کارڈزی کا 1,000+ شاعری گنجینہ: اشعار کی تلاش، رائل اسٹوری کارڈز اور واٹس ایپ شیئرنگ کی مکمل گائیڈ'
            : 'The Complete Guide to Cardzy’s 1,000+ Poetry Treasury & Royal Story Cards'}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {isUrdu
            ? 'علامہ اقبال، مرزا غالب، فیض اور رومی کے منتخب اشعار دریافت کریں، 1-کلک میں خوبصورت اسٹوری کارڈز ڈاؤن لوڈ کریں اور واٹس ایپ پر شیئر کریں۔'
            : 'Discover how to explore 1,000+ verified verses across Urdu, Punjabi, Persian, Arabic, and English. Learn to filter by poet and theme, download 1080px luxury story cards, and share poetry seamlessly.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>September 24, 2026</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>6 min read</span>
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            <span>By Umar Farooq (Cultural Stylist)</span>
          </span>
        </div>
      </div>

      {/* Guide Body */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-10 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {isUrdu ? '1. کارڈزی شاعری گنجینہ کیا ہے؟' : '1. What is Cardzy’s 1,000+ Poetry Treasury?'}
          </h2>
          <p className="text-muted-foreground">
            {isUrdu
              ? 'کارڈزی پوئیٹری ٹریژری انٹرنیٹ کی سب سے معتبر اور جدید ڈیجیٹل شاعری لائبریری ہے۔ یہاں 1,000 سے زائد غیر مکرر اشعار اور نظمیں اردو، پنجابی، فارسی، عربی اور انگریزی میں مستند دیوانوں سے جمع کی گئی ہیں۔ علامہ اقبال کے فلسفہ خودی سے لے کر غالب کے شوخ انداز اور میاں محمد بخش کے صوفیانہ کلام تک، ہر شعر تصدیق شدہ اور محفوظ ہے۔'
              : 'Cardzy’s Poetry Treasury is a dedicated, authentic literary archive featuring over 1,000 non-duplicated classical and modern verses. Curated directly from historical divans and verified manuscripts, it brings together Urdu, Punjabi, Persian, Arabic, and English literature into a fast, mobile-friendly interface designed for reading, discovering, and sharing.'}
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            ✨ <strong>Zero Duplication & 100% Verified:</strong> Unlike unvetted poetry blogs where the same couplet repeats dozens of times, Cardzy ensures every poem appears exactly once with verified author attribution, poet dates, and clean Nastaliq typography.
          </div>
        </section>

        {/* Section 2: Curated Verses with Copy, WhatsApp & Treasury Links */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {isUrdu ? '2. گنجینہ کے مقبول ترین منتخب اشعار' : '2. Top Curated Masterpieces to Discover'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isUrdu
                  ? 'ان اشعار کو کاپی کریں، واٹس ایپ پر شیئر کریں یا گنجینہ میں مکمل کلام پڑھیں۔'
                  : 'Tap copy for instant text, share directly to WhatsApp, or view in the full treasury.'}
              </p>
            </div>
            <Link
              href="/poetry"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors shrink-0"
            >
              <span>Explore All 1,000+ Verses</span>
              <Sparkles className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_TREASURY_VERSES.map((v) => (
              <div
                key={v.id}
                translate="no"
                className="notranslate p-5 rounded-2xl bg-card border border-border/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {isUrdu ? v.category : v.themeBadge}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {v.mood}
                    </span>
                  </div>

                  <p translate="no" className="notranslate font-urdu text-lg sm:text-xl text-right leading-loose text-foreground py-2 font-medium">
                    {v.originalText}
                  </p>

                  <p translate="no" className="notranslate text-xs text-muted-foreground italic mt-2 border-t border-border/50 pt-2">
                    "{v.translation}"
                  </p>
                  <p translate="no" className="notranslate text-xs font-bold text-amber-500 mt-1">
                    — {isUrdu ? v.poetUrdu : v.poet}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => handleCopy(v)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors"
                  >
                    {copiedId === v.id ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                    <span>{copiedId === v.id ? (isUrdu ? 'کاپی ہو گیا' : 'Copied!') : (isUrdu ? 'کاپی' : 'Copy Sher')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsApp(v)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Share2 className="size-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <Link
                    href={`/poetry?id=${v.verseId}`}
                    className="flex items-center justify-center p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors shrink-0"
                    title="Open in Treasury"
                  >
                    <BookOpen className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Instant Story Card Downloads */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {isUrdu ? '3. 1080px رائل اسٹوری کارڈز کیسے ڈاؤن لوڈ کریں؟' : '3. How to Download 1080px Royal Story Cards'}
          </h2>
          <p className="text-muted-foreground">
            {isUrdu
              ? 'کسی بھی گرافک ڈیزائن سوفٹ ویئر یا ایڈیٹنگ ایپ کے بغیر، اب آپ 1-کلک میں شاہانہ اسٹوری کارڈ ڈاؤن لوڈ کر سکتے ہیں:'
              : 'Cardzy includes an instant high-resolution graphics generator directly built into the Treasury, removing the need for third-party photo editing apps:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">Step 1: Choose Any Verse</div>
              <p className="text-xs text-muted-foreground">Browse the Treasury or filter by your favorite poet and mood.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">Step 2: Tap "Story Card"</div>
              <p className="text-xs text-muted-foreground">Watch the live generator render authentic centered Nastaliq text on gold borders.</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">Step 3: Direct Download</div>
              <p className="text-xs text-muted-foreground">The crystal-clear PNG is saved straight to your phone, ready for WhatsApp Status & Instagram.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Dynamic Filtering */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {isUrdu ? '4. فلٹرز کا سمارٹ استعمال (زبان، شاعر اور موضوع)' : '4. Mastering the 4 Cascading Filters'}
          </h2>
          <p className="text-muted-foreground">
            {isUrdu
              ? 'کارڈزی پر مطلوبہ شعر تلاش کرنا انتہائی آسان ہے۔ آپ ایک ہی وقت میں چار فلٹرز کا استعمال کر سکتے ہیں:'
              : 'Our cascading filtering system lets you find the exact verse you need in seconds without endless scrolling:'}
          </p>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong>Language Filter (زبان):</strong> Filter between Urdu (اردو), Punjabi (پنجابی), Persian (فارسی), Arabic (عربی), and English.
            </li>
            <li>
              <strong>Poet Filter (شاعر):</strong> Select from over 30 celebrated classical and modern masters (Iqbal, Ghalib, Faiz, Jaun Elia, Ahmad Faraz, Mian Muhammad Bakhsh, Rumi, Shakespeare, etc.).
            </li>
            <li>
              <strong>Theme Filter (موضوع):</strong> Select by human emotion — Ishq (Romance), Khudi (Self-Belief), Sufi (Devotion), Hikmat (Wisdom), Dua (Blessings), Dosti (Friendship), and Gham (Melancholy).
            </li>
            <li>
              <strong>Format Filter (فارمیٹ):</strong> Toggle between short 2-liner Ash’aar (ideal for quick status sharing) and complete Nazms/Ghazals.
            </li>
          </ul>
        </section>

        {/* Section 5: Call to Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-slate-900 border border-amber-500/30 text-center space-y-4 mt-8">
          <Feather className="size-8 mx-auto text-amber-400 animate-pulse" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {isUrdu ? '1,000+ اشعار کا گنجینہ دیکھیں' : 'Explore the Full 1,000+ Poetry Treasury'}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Discover timeless couplets, switch between original script, Roman Urdu, and English translations, and download your royal Story Card in one tap.
          </p>
          <div className="pt-2">
            <Link
              href="/poetry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
            >
              <span>Launch Poetry Treasury</span>
              <Sparkles className="size-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
