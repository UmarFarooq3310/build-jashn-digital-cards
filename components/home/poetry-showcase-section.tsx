'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Feather, Sparkles, ArrowRight, BookOpen, Copy, Check, Share2, Eye } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

interface FeaturedVerse {
  id: string
  poet: string
  poetUrdu: string
  category: string
  categoryLabel: string
  origin: string
  langBadge: string
  lang: 'ur' | 'pa' | 'fa' | 'ar' | 'en'
  direction: 'rtl' | 'ltr'
  originalText: string
  translation: string
}

const FEATURED_VERSES: FeaturedVerse[] = [
  {
    id: 'poem-0001',
    poet: 'Allama Muhammad Iqbal',
    poetUrdu: 'علامہ محمد اقبال',
    category: 'hikmat',
    categoryLabel: 'Wisdom & Purpose',
    origin: 'Sialkot / Lahore, Pakistan',
    langBadge: '🇵🇰 Urdu',
    lang: 'ur',
    direction: 'rtl',
    originalText: 'ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحان اور بھی ہیں',
    translation: 'Beyond these glittering stars lie yet other worlds; the trials of passionate love are not yet ended.',
  },
  {
    id: 'poem-0021',
    poet: 'Mirza Asadullah Khan Ghalib',
    poetUrdu: 'مرزا اسد اللہ خاں غالب',
    category: 'ishq',
    categoryLabel: 'Ishq & Romance',
    origin: 'Agra / Delhi, India',
    langBadge: '🇵🇰 Urdu',
    lang: 'ur',
    direction: 'rtl',
    originalText: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    translation: 'Thousands of intense desires, each worth dying for; many of my yearnings were fulfilled, yet so few they still seem.',
  },
  {
    id: 'poem-0041',
    poet: 'Faiz Ahmed Faiz',
    poetUrdu: 'فیض احمد فیض',
    category: 'umeed',
    categoryLabel: 'Hope & Renewal',
    origin: 'Sialkot / Lahore, Pakistan',
    langBadge: '🇵🇰 Urdu',
    lang: 'ur',
    direction: 'rtl',
    originalText: 'گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے',
    translation: 'May the vernal breeze breathe vibrant hues into the blossoms; do return, so the garden may flourish once more.',
  },
  {
    id: 'poem-0071',
    poet: 'Mian Muhammad Bakhsh',
    poetUrdu: 'میاں محمد بخش',
    category: 'sufi',
    categoryLabel: 'Punjabi Sufi Classic',
    origin: 'Mirpur, Kashmir / Punjab',
    langBadge: '🌾 Punjabi',
    lang: 'pa',
    direction: 'rtl',
    originalText: 'اول حمد ثنا الٰہی جو مالک ہر ہر دا\nاس دا نام چتارن والا ہر دم رہندا تردا',
    translation: 'First praise belongs to the Almighty Creator, the Sovereign of all; whoever cherishes His divine Name sails unharmed through life.',
  },
  {
    id: 'poem-0081',
    poet: 'Jalaluddin Rumi',
    poetUrdu: 'مولانا جلال الدین رومی',
    category: 'roohaniyat',
    categoryLabel: 'Persian Spiritual',
    origin: 'Balkh / Konya (Persian / Sufi)',
    langBadge: '🇮🇷 Persian',
    lang: 'fa',
    direction: 'rtl',
    originalText: 'بشنو از نی چون حکایت می‌کند\nوز جدایی‌ها شکایت می‌کند',
    translation: 'Listen to the reed flute as it laments, telling the deep tale of eternal separation from its divine origin.',
  },
  {
    id: 'poem-0091',
    poet: 'Mahmoud Darwish',
    poetUrdu: 'محمود درویش',
    category: 'resilience',
    categoryLabel: 'Arabic Resilience & Life',
    origin: 'Al-Birwa, Palestine',
    langBadge: '🇸🇦 Arabic',
    lang: 'ar',
    direction: 'rtl',
    originalText: 'وَنَحْنُ نُحِبُّ الحَيَاةَ إِذَا مَا اسْتَطَعْنَا إِلَيْهَا سَبِيلا\nنُحِبُّ الحَيَاةَ إِذَا مَا اسْتَطَعْنَا إِلَيْهَا سَبِيلا',
    translation: 'And we love life whenever we can find a way to it; we love life whenever we can find a way to it.',
  },
  {
    id: 'poem-0094',
    poet: 'William Shakespeare',
    poetUrdu: 'ولیم شیکسپیئر',
    category: 'ishq',
    categoryLabel: 'Eternal Love & Sonnet',
    origin: 'Stratford-upon-Avon, England',
    langBadge: '🇬🇧 English',
    lang: 'en',
    direction: 'ltr',
    originalText: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate.",
    translation: 'کیا میں تیرا موازنہ موسمِ گرما کے کسی دلکش دن سے کروں؟\nتو تو اس سے کہیں زیادہ پیاری اور پُروقار ہے۔',
  },
  {
    id: 'poem-0118',
    poet: 'Robert Frost',
    poetUrdu: 'رابرٹ فراسٹ',
    category: 'azm',
    categoryLabel: 'Purpose & Determination',
    origin: 'San Francisco / New England, USA',
    langBadge: '🇬🇧 English',
    lang: 'en',
    direction: 'ltr',
    originalText: 'The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep.',
    translation: 'جنگل دلکش ہیں، تاریک اور پرشکوہ گہرے،\nلیکن مجھے اپنے وعدے نبھانے ہیں،\nاور سونے سے پہلے مجھے میلوں دور کا سفر طے کرنا ہے۔',
  },
  {
    id: 'poem-0119',
    poet: 'John Keats',
    poetUrdu: 'جان کیٹس',
    category: 'qudrat',
    categoryLabel: 'Timeless Beauty & Art',
    origin: 'London, England',
    langBadge: '🇬🇧 English',
    lang: 'en',
    direction: 'ltr',
    originalText: 'A thing of beauty is a joy for ever:\nIts loveliness increases; it will never\nPass into nothingness.',
    translation: 'ہر دلکش و خوبصورت شے ابدی مسرت کا باعث ہوتی ہے:\nاس کا حسن و جمال وقت کے ساتھ بڑھتا ہی چلا جاتا ہے،\nاور کبھی فنا نہیں ہوتا۔',
  },
]

export function PoetryShowcaseSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const showToast = useJashn((s) => s.showToast)

  const trackPoetryAction = (item: FeaturedVerse, action: 'click' | 'copy' | 'share') => {
    fetch('/api/poetry-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poemId: item.id,
        poet: item.poet,
        title: item.poet,
        action,
        channel: `home_${action}`,
      }),
    }).catch(() => {})
  }

  const handleCopyVerse = (item: FeaturedVerse) => {
    const poemUrl = typeof window !== 'undefined' ? `${window.location.origin}/poetry?poem=${item.id}&lang=${item.lang}` : `https://cardzy.online/poetry?poem=${item.id}&lang=${item.lang}`
    const textToCopy = `${item.originalText}\n\n— ${item.poet}${item.poetUrdu ? ` (${item.poetUrdu})` : ''}\n${poemUrl}`
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy)
      setCopiedId(item.id)
      trackPoetryAction(item, 'copy')
      showToast('Verse copied to clipboard! 📋', 'success')
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const handleShareVerse = async (item: FeaturedVerse) => {
    const poemUrl = typeof window !== 'undefined' ? `${window.location.origin}/poetry?poem=${item.id}&lang=${item.lang}` : `https://cardzy.online/poetry?poem=${item.id}&lang=${item.lang}`
    const shareText = `${item.originalText}\n\n— ${item.poet}${item.poetUrdu ? ` (${item.poetUrdu})` : ''}\n${poemUrl}`
    trackPoetryAction(item, 'share')

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${item.poet} | Cardzy Poetry`,
          text: `${item.originalText}\n\n— ${item.poet}`,
          url: poemUrl,
        })
        return
      } catch (err: any) {
        if (err.name === 'AbortError') return
      }
    }

    // Fallback: WhatsApp share
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
    window.open(waUrl, '_blank')
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-slate-950 via-[#0d0918] to-background text-foreground border-y border-purple-900/30">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-500/10 via-amber-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 size-72 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-20 size-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold shadow-xs">
            <Sparkles className="size-3.5 text-amber-400" />
            <span>1,000+ Masterpieces in Treasury</span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
              Free &amp; Verified
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Classical &amp; Modern{' '}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
              Poetry Treasury
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-medium">
            Immerse yourself in authentic couplets from Iqbal, Ghalib, Faiz, Mian Muhammad Bakhsh, Rumi, and Mahmoud Darwish. Convert any verse into a personalized <strong>3D Animated Wish Card</strong> or download high-resolution <strong>Instagram Story Flyers</strong> with 1 tap.
          </p>

          {/* Quick Filter Tag Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { label: '🇵🇰 Urdu Ghazals (710+)', href: '/poetry?lang=ur' },
              { label: '🌾 Punjabi Sufi (120+)', href: '/poetry?lang=pa' },
              { label: '🇮🇷 Persian Wisdom (50+)', href: '/poetry?lang=fa' },
              { label: '🇸🇦 Arabic Classics (50+)', href: '/poetry?lang=ar' },
              { label: '🇬🇧 English (70+)', href: '/poetry?lang=en' },
            ].map((badge) => (
              <Link
                key={badge.label}
                href={badge.href}
                className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-amber-400/50 hover:bg-slate-800 text-[11px] sm:text-xs font-semibold text-slate-200 transition-all shadow-2xs"
              >
                {badge.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 6 Curated Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {FEATURED_VERSES.map((item) => (
            <div
              key={item.id}
              translate="no"
              className="notranslate rounded-3xl bg-slate-900/90 border border-purple-500/20 hover:border-amber-500/40 p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 group relative overflow-hidden backdrop-blur-md"
            >
              {/* Subtle card decorative top glow */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all" />

              {/* Card Header: Poet & Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-lg bg-slate-800/80 text-amber-300 border border-slate-700/50">
                    {item.langBadge}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 translate="no" className="notranslate font-extrabold text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors">
                      {item.poet}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{item.origin}</p>
                  </div>
                  {item.poetUrdu && (
                    <span translate="no" className="notranslate font-urdu text-sm sm:text-base text-amber-400/90 shrink-0">
                      {item.poetUrdu}
                    </span>
                  )}
                </div>

                {/* The Verse Calligraphy Box - Clicking navigates directly to the poem with language filter */}
                <Link
                  href={`/poetry?poem=${item.id}&lang=${item.lang}`}
                  onClick={() => trackPoetryAction(item, 'click')}
                  translate="no"
                  className="notranslate mt-4 p-4 rounded-2xl bg-black/40 border border-slate-800/80 hover:border-amber-400/50 hover:bg-black/60 transition-all text-center block group/calligraphy cursor-pointer relative"
                  title="Click to view and download full poem in Poetry Treasury"
                >
                  <p
                    dir={item.direction}
                    translate="no"
                    className={cn(
                      "notranslate text-lg sm:text-xl md:text-2xl text-amber-200 leading-[2.1] whitespace-pre-line tracking-wide drop-shadow-xs group-hover/calligraphy:text-amber-300 transition-colors",
                      item.direction === 'rtl' ? "font-urdu" : "font-serif italic font-medium tracking-normal leading-[1.8]"
                    )}
                  >
                    {item.originalText}
                  </p>
                  <p
                    translate="no"
                    className={cn(
                      "notranslate mt-3 text-xs leading-relaxed border-t border-slate-800/70 pt-2.5",
                      item.direction === 'rtl' ? "font-sans italic text-slate-300/85" : "font-urdu text-amber-300/90 text-sm leading-[1.9]"
                    )}
                  >
                    {item.direction === 'rtl' ? `“${item.translation}”` : item.translation}
                  </p>
                  <div className="mt-2 text-[10px] text-amber-400/80 font-mono flex items-center justify-center gap-1 opacity-0 group-hover/calligraphy:opacity-100 transition-opacity">
                    <span>Open in Poetry Hub</span>
                    <ArrowRight className="size-3" />
                  </div>
                </Link>
              </div>

              {/* Action Buttons: Pure Icons (Copy, Share, View in Treasury) */}
              <div className="pt-2 border-t border-slate-800/70 grid grid-cols-3 gap-2">
                {/* Copy Verse Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleCopyVerse(item)
                  }}
                  className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
                  title="Copy verse"
                >
                  {copiedId === item.id ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleShareVerse(item)
                  }}
                  className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
                  title="Share verse"
                >
                  <Share2 className="size-4" />
                </button>

                {/* Primary: View Full Poem & Flyer in Treasury */}
                <Link
                  href={`/poetry?poem=${item.id}&lang=${item.lang}`}
                  onClick={() => trackPoetryAction(item, 'click')}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-95"
                  title="View full poem and story flyer in Treasury"
                >
                  <BookOpen className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bottom Treasury CTA Banner */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-slate-950 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Feather className="size-4" />
              <span>Complete 1,000-Poem Literary Archive</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Discover 1,000+ Verses across 18 Themes &amp; 100+ World Poets
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Filter by Ishq, Sufism, Friendship, Birthday Wishes, Shadi &amp; Blessings. Download tailored Story Flyers or send as animated WhatsApp greetings.
            </p>
          </div>

          <Link
            href="/poetry"
            className="shrink-0 h-13 px-7 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            <span>Explore Full Treasury (1,000+)</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
