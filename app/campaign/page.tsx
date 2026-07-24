'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Check,
  ArrowRight,
  Moon,
  Heart,
  Globe,
  MessageCircle,
  MapPin,
  Clock,
  Sparkle,
  CheckCircle2,
  Gift,
  Flame,
} from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const SLIDES = [
  {
    id: 1,
    title: 'Slide 1: Hook / Cover',
    headline: 'Say It Beautifully',
    caption: 'Full-bleed luxury cover with 3D Mughal Gold card, floating lanterns, and gold foil typography.',
    badge: 'Cover Slide',
    tags: ['#Cardzy', '#SayItBeautifully', '#DigitalCards', '#AnimatedWishes'],
  },
  {
    id: 2,
    title: 'Slide 2: Occasions Showcase',
    headline: '50+ Templates, Every Celebration',
    caption: 'Vibrant 4-card grid displaying authentic Cardzy templates: Mughal Eid, Zardozi Shaadi, Kashi Birthday, and Royal Mehndi.',
    badge: 'Templates',
    tags: ['#EidMubarak', '#WeddingInvitation', '#BirthdayCard', '#DiwaliWishes'],
  },
  {
    id: 3,
    title: 'Slide 3: Interactive Features',
    headline: 'One Link. RSVP, Maps & Countdown.',
    caption: 'Smartphone UI featuring WhatsApp RSVP button, Google Maps venue card, live flip countdown clock, and dress code notes.',
    badge: 'RSVP & Maps',
    tags: ['#RSVP', '#EventInvitation', '#DigitalRSVP', '#WeddingPlanning'],
  },
  {
    id: 4,
    title: 'Slide 4: Global Reach',
    headline: 'Send Wishes in 18 Languages',
    caption: 'Connect with family worldwide in English, Urdu (اردو), Arabic (العربية), Spanish, French, Chinese, and 12 more languages.',
    badge: '18 Languages',
    tags: ['#Multilingual', '#GlobalWishes', '#UrduCards', '#ArabicGreeting'],
  },
  {
    id: 5,
    title: 'Slide 5: High-Converting CTA',
    headline: 'Create Yours in Minutes — Free',
    caption: 'Start sending animated wish cards instantly with our Free Forever plan. No credit card required.',
    badge: 'Free Forever',
    tags: ['#FreePlan', '#CreateInMinutes', '#CardzyOnline', '#FreeInvitations'],
  },
]

const INSTAGRAM_CAPTION = `✨ Say It Beautifully with Cardzy! ✨

Looking for the perfect way to invite guests or send animated wishes to your loved ones worldwide? 🌍

💌 50+ Beautiful Animated Templates (Eid, Birthdays, Weddings, Diwali & more)
📱 1-Click WhatsApp RSVP & Live Event Countdowns
📍 Integrated Google Maps Directions for Guests
🌐 Send Wishes in 18 Global Languages

Create yours in minutes for FREE! Click the link in bio to get started ➡️ cardzy.online

#Cardzy #DigitalInvitations #WishCards #RSVP #WeddingInvitations #EidMubarak #FreeInvitations #CardzyOnline`

export default function CampaignPage() {
  const { t } = useLang()
  const [activeSlide, setActiveSlide] = useState(0)
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const renderCardRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  const copyCaption = () => {
    navigator.clipboard.writeText(INSTAGRAM_CAPTION)
    setCopiedCaption(true)
    setTimeout(() => setCopiedCaption(false), 2000)
  }

  const exportSlidePng = async () => {
    if (!renderCardRef.current) return
    setDownloading(true)
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(renderCardRef.current, {
        width: 1080,
        height: 1080,
        pixelRatio: 1,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `cardzy-carousel-slide-${activeSlide + 1}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export slide PNG:', err)
    } finally {
      setDownloading(false)
    }
  }

  const current = SLIDES[activeSlide]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header Badge & Title */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-400 shadow-sm mb-4">
              <Sparkles className="size-4 text-amber-500 animate-pulse" />
              Instagram Campaign Set · Redesigned Full-Bleed 1080x1080 HD Set
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Cardzy Social Media <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-amber-600 bg-clip-text text-transparent">Carousel Campaign</span>
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore Cardzy&apos;s official 5-slide Instagram carousel set featuring rich full-bleed backgrounds, authentic card templates, and custom platform branding.
            </p>
          </div>

          {/* Interactive Slide Viewer & Generator */}
          <div className="grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-teal-500/20 bg-card p-6 sm:p-8 shadow-xl">
            {/* Left Column: Real-Time 1:1 Pixel-Perfect 1080x1080 Preview */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border-2 border-amber-400/50 shadow-2xl bg-[#022c22]">
                {/* 1080x1080 Full-Bleed Canvas Render Container */}
                <div
                  ref={renderCardRef}
                  className="relative w-full h-full p-6 flex flex-col justify-between select-none text-white font-sans overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d9488] via-[#064e3b] to-[#022c22]"
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 size-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 size-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

                  {/* ────────────────── SLIDE 1: SAY IT BEAUTIFULLY ────────────────── */}
                  {activeSlide === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center my-auto relative z-10 px-2 space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest shadow-sm">
                        <Sparkles className="size-3.5 text-amber-400" /> Digital Wish Cards & Invitations
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                        Say It <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Beautifully</span>
                      </h2>

                      {/* 3D Floating Mughal Card Preview */}
                      <div className="w-56 h-76 rounded-2xl bg-gradient-to-b from-[#042f2e] to-[#022c22] border-2 border-amber-400/90 shadow-2xl p-5 flex flex-col justify-between text-left rotate-1 hover:rotate-0 transition-transform relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 size-32 bg-amber-500/15 rounded-full blur-xl" />
                        <div className="flex justify-between items-center text-amber-400 relative z-10">
                          <Moon className="size-5" />
                          <span className="text-[11px] font-extrabold tracking-widest uppercase text-amber-300">Cardzy</span>
                        </div>
                        <div className="space-y-1.5 my-auto text-center relative z-10">
                          <p className="text-lg font-extrabold text-amber-300 drop-shadow-sm">Mughal Gold Eid</p>
                          <p className="text-xs text-emerald-100/90 leading-relaxed">May peace, prosperity & blessings illuminate your home.</p>
                        </div>
                        <div className="text-[10px] font-extrabold text-amber-400/90 border-t border-amber-500/30 pt-1.5 text-center relative z-10">
                          cardzy.online
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── SLIDE 2: 50+ TEMPLATES ────────────────── */}
                  {activeSlide === 1 && (
                    <div className="flex-1 flex flex-col justify-between my-auto relative z-10 px-1">
                      <div className="text-center space-y-1 mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">50+ Templates</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Every Celebration</h2>
                      </div>

                      {/* 4 Authentic Card Previews Grid */}
                      <div className="grid grid-cols-2 gap-3 my-auto">
                        {/* 1. Mughal Eid */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#042f2e] to-[#022c22] border-2 border-amber-400/70 shadow-lg flex flex-col justify-between h-34 relative overflow-hidden">
                          <div className="flex justify-between items-center text-amber-400">
                            <Moon className="size-4" />
                            <span className="text-[10px] font-extrabold text-amber-300">EID</span>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-amber-300">Mughal Eid Card</p>
                            <p className="text-[9px] text-emerald-200/80">Teal & Gold Mandalas</p>
                          </div>
                        </div>

                        {/* 2. Zardozi Shaadi */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#831843] to-[#500724] border-2 border-pink-400/70 shadow-lg flex flex-col justify-between h-34 relative overflow-hidden">
                          <div className="flex justify-between items-center text-pink-300">
                            <Heart className="size-4" />
                            <span className="text-[10px] font-extrabold text-pink-200">WEDDING</span>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-pink-200">Zardozi Shaadi</p>
                            <p className="text-[9px] text-pink-100/80">Magenta Floral Brocade</p>
                          </div>
                        </div>

                        {/* 3. Kashi Birthday */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] border-2 border-indigo-400/70 shadow-lg flex flex-col justify-between h-34 relative overflow-hidden">
                          <div className="flex justify-between items-center text-indigo-300">
                            <Gift className="size-4" />
                            <span className="text-[10px] font-extrabold text-indigo-200">BIRTHDAY</span>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-indigo-200">Kashi Birthday</p>
                            <p className="text-[9px] text-indigo-100/80">Midnight Blue Lights</p>
                          </div>
                        </div>

                        {/* 4. Royal Mehndi */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#78350f] to-[#451a03] border-2 border-amber-300/70 shadow-lg flex flex-col justify-between h-34 relative overflow-hidden">
                          <div className="flex justify-between items-center text-amber-300">
                            <Flame className="size-4" />
                            <span className="text-[10px] font-extrabold text-amber-200">MEHNDI</span>
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-amber-200">Royal Mehndi</p>
                            <p className="text-[9px] text-amber-100/80">Golden Henna Art</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── SLIDE 3: ONE LINK RSVP MAPS ────────────────── */}
                  {activeSlide === 2 && (
                    <div className="flex-1 flex flex-col justify-between my-auto relative z-10 px-1">
                      <div className="text-center space-y-1 mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">One Link</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">RSVP, Maps & Countdown</h2>
                      </div>

                      {/* iPhone Mockup Card */}
                      <div className="mx-auto w-full max-w-[270px] rounded-3xl bg-[#011e17] border-2 border-emerald-500/60 p-4 shadow-2xl space-y-3">
                        <div className="text-center space-y-0.5 border-b border-emerald-500/20 pb-2">
                          <p className="text-[10px] font-extrabold text-amber-300 uppercase">Mehndi & Shaadi Festivities</p>
                          <p className="text-xs font-extrabold text-white">Ayesha & Zaryab&apos;s Wedding</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md">
                          <MessageCircle className="size-4" /> WhatsApp RSVP — Confirm Attendance
                        </div>
                        <div className="p-2.5 rounded-xl bg-card/15 border border-white/10 text-white text-[10px] flex items-center gap-2">
                          <MapPin className="size-4 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <p className="font-extrabold text-white">Google Maps Venue Pin</p>
                            <p className="text-[9px] text-emerald-200/90 truncate">Pearl Continental Lawn, Rawalpindi</p>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-card/15 border border-white/10 text-white text-[10px] flex items-center justify-between">
                          <span className="flex items-center gap-1 font-extrabold text-amber-400">
                            <Clock className="size-3.5" /> Live Countdown
                          </span>
                          <span className="font-mono text-xs font-bold text-white">12d : 08h : 30m</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── SLIDE 4: 18 LANGUAGES ────────────────── */}
                  {activeSlide === 3 && (
                    <div className="flex-1 flex flex-col justify-between my-auto relative z-10 text-center px-1">
                      <div className="space-y-1 mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">Global Reach</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Send Wishes in 18 Languages</h2>
                      </div>
                      <div className="grid grid-cols-2 gap-3 my-auto text-left">
                        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500/50 shadow-md">
                          <p className="text-[11px] font-extrabold text-amber-400">Urdu / Arabic 🌙</p>
                          <p className="text-base font-extrabold font-urdu text-white mt-1">عید مبارک</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-pink-950/90 border-2 border-pink-500/50 shadow-md">
                          <p className="text-[11px] font-extrabold text-pink-300">Spanish 💃</p>
                          <p className="text-sm font-extrabold text-white mt-1">¡Felicidades!</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-indigo-950/90 border-2 border-indigo-500/50 shadow-md">
                          <p className="text-[11px] font-extrabold text-indigo-300">English 🎉</p>
                          <p className="text-sm font-extrabold text-white mt-1">Happy Birthday</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-amber-950/90 border-2 border-amber-500/50 shadow-md">
                          <p className="text-[11px] font-extrabold text-amber-300">Chinese 🧧</p>
                          <p className="text-sm font-extrabold text-white mt-1">祝贺</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────────────── SLIDE 5: CTA FREE FOREVER ────────────────── */}
                  {activeSlide === 4 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-auto relative z-10 px-2">
                      <span className="px-4 py-1.5 rounded-full bg-amber-500/25 border border-amber-400/60 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                        Free Forever Plan
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        Create Yours in Minutes — <span className="text-amber-400">Free</span>
                      </h2>
                      <div className="flex flex-col gap-3 w-full max-w-[250px]">
                        <div className="p-3.5 rounded-xl bg-amber-500 text-emerald-950 font-extrabold text-xs shadow-xl text-center">
                          Create Wish Card Free ➡️
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-800 border border-emerald-600 text-white font-extrabold text-xs shadow-xl text-center">
                          Build Invitation Website
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM RIGHT FULL PLATFORM WATERMARK & TAGLINE */}
                  <div className="relative z-10 border-t border-white/20 pt-2.5 flex items-center justify-between text-[10px] text-amber-200/90 font-semibold">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Sparkles className="size-3 text-amber-400" /> Cardzy
                    </span>
                    <span className="font-extrabold text-amber-300 tracking-tight">
                      Cardzy.online · Digital Wish Cards & Event Invitations
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="flex size-11 items-center justify-center rounded-full border border-teal-500/20 bg-card text-foreground hover:bg-teal-500/10 active:scale-95 transition-all min-h-[48px] min-w-[48px]"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex gap-2">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className="size-3 rounded-full transition-all min-h-[24px] min-w-[24px] flex items-center justify-center"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <span className={`size-2.5 rounded-full ${idx === activeSlide ? 'bg-teal-600 w-6' : 'bg-muted-foreground/30'}`} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex size-11 items-center justify-center rounded-full border border-teal-500/20 bg-card text-foreground hover:bg-teal-500/10 active:scale-95 transition-all min-h-[48px] min-w-[48px]"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Right Column: Slide Info & Export Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400">
                  {current.title}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                  {current.headline}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
                  {current.caption}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 text-xs font-semibold text-foreground border-y border-border py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Full-bleed 1080x1080 Instagram 1:1 HD Canvas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Bottom-Right Platform Branding: <strong>Cardzy.online · Digital Wish Cards & Event Invitations</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Authentic website card themes (Mughal Gold, Zardozi Shaadi, Kashi Birthday)</span>
                </div>
              </div>

              {/* Direct Export Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={exportSlidePng}
                  disabled={downloading}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 font-extrabold text-white hover:bg-emerald-900 active:scale-95 transition-all shadow-md min-h-[48px]"
                >
                  <Download className="size-4" /> {downloading ? 'Rendering HD PNG…' : `Export Slide ${current.id} (1080x1080)`}
                </button>

                <Link
                  href="/create-wish"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-teal-500/30 bg-card px-6 font-bold text-foreground hover:bg-teal-500/10 active:scale-95 transition-all min-h-[48px]"
                >
                  Create Card Free <ArrowRight className="size-4 text-amber-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* All 5 Thumbnails Selector */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-foreground mb-4">Complete 5-Slide Carousel Selector</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all p-3 text-left flex flex-col justify-between min-h-[48px] bg-gradient-to-br from-emerald-950 to-[#064e3b] text-white ${
                    idx === activeSlide
                      ? 'border-amber-400 ring-4 ring-amber-500/20 scale-[1.02]'
                      : 'border-border hover:border-amber-400/50'
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase">Slide {slide.id}</span>
                  <span className="text-xs font-bold text-white line-clamp-2">{slide.headline}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ready-to-Post Instagram Caption Box */}
          <div className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-amber-600" />
                <h3 className="text-lg font-extrabold text-foreground">Instagram & Social Media Caption</h3>
              </div>

              <button
                onClick={copyCaption}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-4 py-2 text-xs font-extrabold hover:bg-amber-500/30 active:scale-95 transition-all min-h-[44px]"
              >
                {copiedCaption ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                {copiedCaption ? 'Copied Caption!' : 'Copy Caption'}
              </button>
            </div>

            <pre className="whitespace-pre-wrap rounded-2xl bg-muted/60 p-4 text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed border border-border">
              {INSTAGRAM_CAPTION}
            </pre>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
