'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  MousePointerClick,
  Sparkles,
  Heart,
  Gift,
  Moon,
  Flower2,
  Cake,
  Gem,
  CheckCircle,
  Award,
  Crown,
  Star,
  GraduationCap,
  MessageCircle,
  Plus,
  X,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { JashnIcon } from '@/lib/jashn/icon'
import { OCCASIONS } from '@/lib/jashn/occasions'
import { WishCard } from '@/components/jashn/wish-card'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { cn } from '@/lib/utils'

// Sub-component for Section Heading
function SectionHead({
  kicker,
  title,
  desc,
  kickerColor = 'text-[#7B0D1E]',
  className,
}: {
  kicker: string
  title: string
  desc?: string
  kickerColor?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", kickerColor)}>
        {kicker}
      </p>
      <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground text-sm sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 1. HOW IT WORKS (Compact horizontal 2-step stepper + Pricing indicator)
// ─────────────────────────────────────────────────────────────────────────
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.hiw-head'), { y: 25, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    })
    gsap.fromTo(el.querySelectorAll('.hiw-step'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.fromTo(el.querySelector('.pricing-box'), { scale: 0.95, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="border-t border-[#7B0D1E]/10 bg-[#FAF6F0] py-16 relative overflow-hidden">
      {/* Subtle mandala background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] text-[#7B0D1E] pointer-events-none select-none">
        <Flower2 className="w-full h-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <SectionHead
          kicker="Bazaar-e-Jashn"
          title="Create & Send in Two Simple Steps"
          desc="Beautiful bilingual designs with interactive elements, made fast."
          className="hiw-head"
        />

        {/* 2-Step Horizontal Stepper */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12">
          {/* Step 1 */}
          <div className="hiw-step relative rounded-2xl border border-[#7B0D1E]/10 bg-card p-6 shadow-sm flex gap-4 items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#7B0D1E]/10 text-[#7B0D1E] font-bold text-lg">
              1
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <span>Pick Occasion</span>
                <span className="font-urdu text-xs text-[#7B0D1E]/60">(تقریب چنیں)</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Choose from 50+ beautiful templates across weddings, birthdays, festivals, achievements, or friendship notes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="hiw-step relative rounded-2xl border border-[#7B0D1E]/10 bg-card p-6 shadow-sm flex gap-4 items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#7B0D1E]/10 text-[#7B0D1E] font-bold text-lg">
              2
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <span>Personalize & Share</span>
                <span className="font-urdu text-xs text-[#7B0D1E]/60">(کارڈ بنائیں اور بھیجیں)</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Add names, select design themes/music, type in English or Urdu script with live preview, and generate a clean shareable link instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Free vs Premium Pricing Indicator (Surfaced Earlier) */}
        <div className="pricing-box max-w-4xl mx-auto rounded-3xl border border-[#7B0D1E]/15 bg-gradient-to-br from-[#7B0D1E]/5 via-card to-[#7B0D1E]/10 p-6 sm:p-8 shadow-md">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#7B0D1E] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-1">
              Pricing Options
            </span>
            <h3 className="text-lg font-extrabold text-foreground">Transparent Desi Pricing</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-[#7B0D1E]/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#7B0D1E]/10 text-[#7B0D1E] px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                Free Forever
              </div>
              <h4 className="font-bold text-[#7B0D1E] text-sm flex items-center gap-1.5">
                <Sparkles className="size-4 shrink-0" /> Wish Cards & Standard Themes
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All personalized greetings (Eid, Birthdays, Friendship notes) are 100% free! Includes bilingual script, floating animations, and clean sharing link.
              </p>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-emerald-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                Jashn Pro (Premium)
              </div>
              <h4 className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                <Crown className="size-4 shrink-0" /> Live RSVPs, Maps & Countdowns
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upgrade event invitations (Mehndi, Shaadi, Parties) for a small fee. Add Google Map pins, dress codes, host control dashboard, and receive real-time guest confirmations on WhatsApp!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 2. CATEGORY TABS (Wedding, Birthday, Friendship, Festivals & Milestones)
// ─────────────────────────────────────────────────────────────────────────
type TabType = 'wedding' | 'birthday' | 'friendship' | 'festivals'

export function CategoryTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('wedding')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.tabs-head'), { y: 25, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    })
  }, { scope: sectionRef })

  // Categories mapping
  const weddingOccasions = OCCASIONS.filter(
    (o) => o.id === 'shaadi' || o.id === 'nikah' || o.id === 'anniversary'
  )

  const friendshipOccasions = OCCASIONS.filter(
    (o) => o.id === 'friendship-day' || o.id === 'miss-you' || o.id === 'thank-you'
  )

  // Separating Festivals (Religious) from Milestones (Achievements)
  const religiousOccasions = OCCASIONS.filter(
    (o) => o.category === 'Islamic' && o.id !== 'condolence'
  )

  const milestoneOccasions = OCCASIONS.filter(
    (o) => 
      o.category === 'Achievements' || 
      o.id === 'new-year' || 
      o.id === 'independence-day' || 
      o.id === 'graduation'
  )

  return (
    <section ref={sectionRef} className="border-t border-border bg-card py-20 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="tabs-head">
          <SectionHead
            kicker="Daawat-e-Jashn"
            title="Explore Card Categories"
            desc="Select a category to view stunning card templates and start personalizing."
          />
        </div>

        {/* Tab Buttons bar (Scrollable on mobile) */}
        <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-2 sm:gap-6 justify-start sm:justify-center pb-2 mb-8">
          {[
            { id: 'wedding', label: 'Wedding & Shaadi', urdu: 'شادی اور نکاح', icon: Gem },
            { id: 'birthday', label: 'Birthdays & Saalgirah', urdu: 'سالگرہ مبارک', icon: Cake },
            { id: 'friendship', label: 'Friendship & Notes', urdu: 'دوستی اور پیغامات', icon: Heart },
            { id: 'festivals', label: 'Festivals & Milestones', urdu: 'تہوار اور سنگ میل', icon: Moon },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-semibold text-sm transition-all whitespace-nowrap border-b-2",
                  active
                    ? "border-[#7B0D1E] text-[#7B0D1E] bg-[#7B0D1E]/5 font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <Icon className="size-4" />
                <div className="text-left">
                  <span className="block leading-tight text-xs sm:text-sm">{tab.label}</span>
                  <span className="block font-urdu text-[10px] opacity-75 sm:hidden lg:block">{tab.urdu}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="min-h-[380px] bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border p-6 sm:p-8 transition-all duration-300">
          
          {/* TAB 1: WEDDING */}
          {activeTab === 'wedding' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#7B0D1E]">Mughal Mughal Vibe</span>
                <h3 className="text-xl font-bold text-foreground mt-1">Celebrate Eternal Love & Togetherness</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  Beautiful Mughal-arched Shaadi, Nikkah, Mehndi cards and Anniversary wishes with traditional bilingual greetings.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {weddingOccasions.map((o) => (
                  <Link
                    key={o.id}
                    href={`/create-wish?occasion=${o.id}`}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-[#7B0D1E]/20 bg-card hover:border-[#7B0D1E] hover:shadow-[0_12px_24px_-10px_rgba(123,13,30,0.1)] transition-all duration-200"
                  >
                    <div>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#7B0D1E]/10 text-[#7B0D1E] group-hover:bg-[#7B0D1E] group-hover:text-white transition-colors mb-3">
                        <JashnIcon name={o.icon} className="size-5" />
                      </div>
                      <h4 className="text-base font-bold text-foreground">{o.label} Card</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Bilingual wedding greeting scripts in English and Urdu calligraphy.
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7B0D1E] group-hover:underline">
                      Customize Card <ArrowRight className="size-3" />
                    </span>
                  </Link>
                ))}

                {/* Mughal Mehndi Invitation Link */}
                <Link
                  href="/create-invitation?type=mehndi"
                  className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-dashed border-amber-500 bg-gradient-to-br from-amber-500/5 to-card hover:border-[#7B0D1E] transition-all duration-200 animate-pulse"
                >
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 mb-3">
                      <Gem className="size-5" />
                    </div>
                    <h4 className="text-base font-bold text-amber-800">Mughal Mehndi &amp; Baraat Invitations</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Create a complete digital invitation website with venue location pins, dress guides, and live countdowns.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7B0D1E]">
                    Build Invitation <ArrowRight className="size-3" />
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: BIRTHDAY */}
          {activeTab === 'birthday' && (
            <div className="animate-fadeIn">
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600">Saalgirah Mubarak</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">Vibrant Animated Birthday Greetings</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                      Send sweet, colorful birthday wishes to your friends, family, and loved ones with animated cake candles and playful sparkles. Every card includes a custom music-box birthday chime when opened!
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>Customizable Saalgirah Cards with Urdu calligraphy (سالگرہ مبارک)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>Playful balloon, confetti, and sparkles float animations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>Free creation and instant sharing via WhatsApp links</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Link
                      href="/create-wish?occasion=birthday"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7B0D1E] to-[#b81d36] px-5 text-xs sm:text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md"
                    >
                      Create Birthday Card <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Card Preview Column */}
                <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
                  <div className="w-full max-w-xs rotate-2 shadow-lg rounded-2xl overflow-hidden border border-indigo-50">
                    <WishCard
                      watermark={false}
                      data={{
                        occasionId: 'birthday',
                        themeId: 'midnight-kashi',
                        language: 'both',
                        senderName: 'Sajid',
                        recipientName: 'Zainab',
                        message: 'May Allah bless you with a year of immense success and happiness!',
                        messageUrdu: 'سالگرہ مبارک ہو! اللہ آپ کو ڈھیروں خوشیاں نصیب فرمائے۔',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FRIENDSHIP */}
          {activeTab === 'friendship' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-500">Dosti Mubarak</span>
                <h3 className="text-xl font-bold text-foreground mt-1">Strengthen Your Bonds of Friendship</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  Show gratitude, say thank you, tell them they are missed, or celebrate Friendship Day with personalized heartwarming notes.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {friendshipOccasions.map((o) => (
                  <Link
                    key={o.id}
                    href={`/create-wish?occasion=${o.id}`}
                    className="group relative overflow-hidden rounded-2xl border border-rose-100/80 bg-card p-5 hover:border-rose-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        <JashnIcon name={o.icon} className="size-4.5" />
                      </div>
                      <Heart className="size-4 text-rose-200 group-hover:text-rose-400 transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-foreground mt-4">{o.label} Card</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Send warm, heartfelt vibes with a clean, short shareable link instantly.
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-500 group-hover:underline">
                      Write Note <ArrowRight className="size-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVALS & MILESTONES (Religious Occasions and Achievements Separated) */}
          {activeTab === 'festivals' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">Milestones &amp; Festivals</span>
                <h3 className="text-xl font-bold text-foreground mt-1">Celebrate Festivals &amp; Milestones</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  Congratulate achievements, promotions, graduations, or send blessings on Eid, Ramadan, and national events.
                </p>
              </div>

              {/* Group A: Religious Occasions */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-700 border-b border-emerald-500/10 pb-1.5 flex items-center gap-1.5">
                  <Moon className="size-4 text-emerald-700" /> Religious Occasions (مذہبی تہوار)
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {religiousOccasions.map((o) => (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      className="group flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-card p-3 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/[0.02]"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <JashnIcon name={o.icon} className="size-4" />
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-[#7B0D1E] truncate">
                          {o.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-urdu block">
                          {o.urdu}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group B: Milestones & Achievements */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-700 border-b border-amber-500/10 pb-1.5 flex items-center gap-1.5">
                  <Award className="size-4 text-amber-700" /> Achievements &amp; Life Events (کامیابی اور سنگ میل)
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {milestoneOccasions.map((o) => (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      className="group flex items-center gap-2.5 rounded-xl border border-amber-100 bg-card p-3 transition-all hover:border-amber-500/40 hover:bg-amber-500/[0.02]"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <JashnIcon name={o.icon} className="size-4" />
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-[#7B0D1E] truncate">
                          {o.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-urdu block">
                          {o.urdu}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────
// 2.5 INVITATIONS (RSVP Feature Block)
// ─────────────────────────────────────────────────────────────────────────
export function InvitationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el.querySelector('.inv-head'), { y: 35, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.fromTo(el.querySelector('.inv-card'), { x: -60, opacity: 0, rotate: -3 }, {
      x: 0, opacity: 1, rotate: -1, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' }
    })
    gsap.fromTo(el.querySelector('.inv-features'), { x: 60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' }
    })
    gsap.fromTo(el.querySelectorAll('.inv-feature-item'), { y: 12, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 65%', toggleActions: 'play none none none' }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-[#08300c]/5 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker="Desi Event Coordinator"
          kickerColor="text-emerald-700 font-bold"
          title="Digital Invitations with Live RSVPs"
          desc="Perfect for Wedding, Mehndi, Baraat, Walima, Nikkah, Birthday Parties, and family events. Everything coordinates in one elegant dashboard."
          className="inv-head"
        />

        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Sample Invitation preview */}
          <div className="inv-card lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm shadow-xl rounded-3xl -rotate-1 transform hover:rotate-0 transition-transform duration-500">
              <InvitationCard
                watermark={false}
                showCountdown={true}
                data={{
                  typeId: 'mehndi',
                  title: 'Mehndi Night',
                  hostNames: 'The Malik Family',
                  groom: 'Zaryab',
                  bride: 'Rida',
                  date: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 10), // 12 days in future
                  time: '8:00 PM',
                  venue: 'Pearl Continental Lawn',
                  city: 'Rawalpindi',
                  dressCode: 'Bright Yellows & Greens',
                  notes: 'Traditional dholki and delicious food setup.',
                  themeId: 'emerald-classic',
                }}
              />
            </div>
          </div>

          {/* Feature list */}
          <div className="inv-features lg:col-span-7 space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl font-extrabold text-foreground leading-tight">
              One link, all the details your guests need.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No more printing expensive paper cards. Share your custom invitation link on WhatsApp. Guests can confirm attendance with one-click, see Google Map directions, and watch the live wedding countdown!
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {[
                'WhatsApp RSVP confirmations',
                'Google Maps integration',
                'Live event countdown timers',
                'Dress code & family notes',
                'Secure host dashboard control',
                'Premium animations & background audio',
              ].map((f) => (
                <div key={f} className="inv-feature-item flex items-center gap-2 text-xs font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/create-invitation"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/10 active:scale-95 transition-transform"
              >
                Create Event Invitation <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View Host Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 3. SAMPLE CARDS CAROUSEL (Touch-swipeable & dot navigation slider)
// ─────────────────────────────────────────────────────────────────────────

export function SampleCards() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const cardsData = [
    {
      type: 'wish',
      title: 'Eid Mubarak Card',
      urduTitle: 'عید مبارک کارڈ',
      description: 'Mughal Gold theme with traditional blessings',
      watermark: true,
      data: {
        occasionId: 'eid-ul-fitr',
        themeId: 'mughal-gold',
        language: 'both',
        senderName: 'The Ahmed Family',
        recipientName: 'You',
        message: 'May this blessed Eid bring joy, peace and prosperity to you and your loved ones.',
        messageUrdu: 'اللہ یہ مبارک دن آپ کے لیے خوشیوں کا باعث بنائے۔',
      }
    },
    {
      type: 'wish',
      title: 'Shaadi Mubarak Card',
      urduTitle: 'شادی مبارک کارڈ',
      description: 'Elegant Pink Zardozi design with custom script',
      watermark: true,
      data: {
        occasionId: 'shaadi',
        themeId: 'pink-zardozi',
        language: 'both',
        senderName: 'The Khan Family',
        message: 'Wishing the happy couple a lifetime of love and togetherness.',
        messageUrdu: 'اللہ جوڑے کو ہمیشہ خوش رکھے۔',
      }
    },
    {
      type: 'wish',
      title: 'Saalgirah Mubarak Card',
      urduTitle: 'سالگرہ مبارک کارڈ',
      description: 'Midnight Kashi design with music-box chime',
      watermark: true,
      data: {
        occasionId: 'birthday',
        themeId: 'midnight-kashi',
        language: 'both',
        senderName: 'Bilal',
        recipientName: 'Sana',
        message: 'May Allah bless you with health and happiness always. Happy Birthday!',
        messageUrdu: 'سالگرہ مبارک ہو! اللہ آپ کو لمبی عمر عطا فرمائے۔',
      }
    },
    {
      type: 'invitation',
      title: 'Mehndi Invitation',
      urduTitle: 'دعوت نامہ مہندی',
      description: 'Emerald Classic event website invitation with RSVP',
      watermark: true,
      data: {
        typeId: 'mehndi',
        title: 'Mehndi Night',
        hostNames: 'The Malik Family',
        groom: 'Hamza',
        bride: 'Ayesha',
        date: '2026-12-20',
        time: '7:00 PM',
        venue: 'Royal Palm',
        city: 'Lahore',
        dressCode: 'Yellow & Green',
        notes: 'Dholki and dinner to follow.',
        themeId: 'emerald-classic',
      }
    }
  ]

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const itemWidth = carouselRef.current.clientWidth
      const index = Math.round(scrollLeft / itemWidth)
      setActiveCardIndex(index)
    }
  }

  const navigateToCard = (idx: number) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.clientWidth
      carouselRef.current.scrollTo({ left: idx * itemWidth, behavior: 'smooth' })
      setActiveCardIndex(idx)
    }
  }

  return (
    <section className="border-t border-[#7B0D1E]/10 bg-[#FAF6F0]/60 py-16 relative">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHead
          kicker="Zebaish"
          title="Consolidated Design Showcase"
          desc="Swipe to view live animated greetings and RSVP event invitations. Deep jewel tones, shimmering calligraphy, and floating petals."
        />

        {/* Carousel Showcase */}
        <div className="relative mt-8 max-w-md mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={() => navigateToCard(Math.max(0, activeCardIndex - 1))}
            className="absolute left-[-20px] sm:left-[-50px] top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full border border-[#7B0D1E]/20 bg-card text-[#7B0D1E] shadow-md hover:bg-[#7B0D1E] hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeCardIndex === 0}
            aria-label="Previous card"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          <button
            onClick={() => navigateToCard(Math.min(cardsData.length - 1, activeCardIndex + 1))}
            className="absolute right-[-20px] sm:right-[-50px] top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full border border-[#7B0D1E]/20 bg-card text-[#7B0D1E] shadow-md hover:bg-[#7B0D1E] hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeCardIndex === cardsData.length - 1}
            aria-label="Next card"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Cards slider */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-8 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {cardsData.map((card, idx) => (
              <div key={idx} className="w-full shrink-0 snap-center pb-4 flex flex-col items-center">
                {/* Details above card */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5 justify-center">
                    <span>{card.title}</span>
                    <span className="font-urdu text-sm text-[#7B0D1E] font-medium">({card.urduTitle})</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.description}</p>
                </div>

                {/* Card renderer */}
                <div className="w-[320px] shadow-2xl rounded-3xl overflow-hidden border border-[#7B0D1E]/15 bg-card hover:scale-[1.01] transition-transform duration-300">
                  {card.type === 'wish' ? (
                    <WishCard watermark={card.watermark} data={card.data as any} />
                  ) : (
                    <InvitationCard watermark={card.watermark} showCountdown={true} data={card.data as any} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel dots indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => navigateToCard(idx)}
                className={cn(
                  "size-2.5 rounded-full transition-all",
                  activeCardIndex === idx
                    ? "bg-[#7B0D1E] w-6"
                    : "bg-[#7B0D1E]/20 hover:bg-[#7B0D1E]/40"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 4. CTA SECTION (Only 2 main button CTA pairings on page, Hero & bottom)
// ─────────────────────────────────────────────────────────────────────────
export function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el.querySelectorAll('.cta-item'), { y: 25, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="border-t border-[#7B0D1E]/20 bg-gradient-to-br from-[#7B0D1E] to-[#4A0510] text-[#FAF6F0] py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FAF6F0_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-4 py-8 text-center relative z-10 space-y-6">
        <span className="cta-item inline-block font-urdu text-2xl text-amber-400 font-medium">
          ہر خوشی کے لیے ایک خوبصورت پیغام
        </span>
        <h2 className="cta-item text-balance text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
          Ready to spread some joy?
        </h2>
        <p className="cta-item mx-auto mt-2 max-w-md text-pretty text-amber-100/80 text-sm sm:text-base leading-relaxed">
          Create your first animated wish card or full event invitation for free. No credit card or pre-signup required.
        </p>
        
        {/* Main CTA pair (Instance 2 of 2) */}
        <div className="cta-item mt-8 flex flex-col justify-center gap-3 sm:flex-row max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/create-wish"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 text-sm font-bold text-[#4A0510] hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25"
          >
            Send a Wish <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/create-invitation"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition-all"
          >
            Create Invitation
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 5. STICKY MOBILE FLOATING CTA BUTTON
// ─────────────────────────────────────────────────────────────────────────
export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
      {/* Floating Options Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 items-end mb-1 animate-slideUp">
          <Link
            href="/create-wish"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-[#7B0D1E] text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Sparkles className="size-3.5" />
            <span>Send a Wish / کارڈ بھیجیں</span>
          </Link>
          <Link
            href="/create-invitation"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Mail className="size-3.5" />
            <span>Create Invitation / دعوت نامہ</span>
          </Link>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-full px-6 font-bold text-sm text-white shadow-2xl transition-all active:scale-95 border border-white/15",
          isOpen 
            ? "bg-zinc-800 ring-4 ring-zinc-800/20" 
            : "bg-[#7B0D1E] hover:bg-[#7B0D1E]/90 ring-4 ring-[#7B0D1E]/20 shadow-amber-500/10"
        )}
        aria-label="Create card menu"
      >
        {isOpen ? (
          <>
            <X className="size-4 shrink-0" />
            <span>Close</span>
          </>
        ) : (
          <>
            <Plus className="size-4 shrink-0" />
            <span>Create Card / کارڈ بنائیں</span>
          </>
        )}
      </button>
    </div>
  )
}
