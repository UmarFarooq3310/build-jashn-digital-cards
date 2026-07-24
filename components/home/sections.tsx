'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Moon,
  Flower2,
  Cake,
  Gem,
  CheckCircle,
  Award,
  Crown,
  ChevronLeft,
  ChevronRight,
  Mail,
  X,
  Plus,
  Globe
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import dynamic from 'next/dynamic'
import { JashnIcon } from '@/lib/jashn/icon'
import { OCCASIONS, getOccasionLabel, getOccasionTagline } from '@/lib/jashn/occasions'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

const WishCard = dynamic(
  () => import('@/components/jashn/wish-card').then((mod) => mod.WishCard),
  { ssr: false }
)
const InvitationCard = dynamic(
  () => import('@/components/jashn/invitation-card').then((mod) => mod.InvitationCard),
  { ssr: false }
)

// Sub-component for Section Heading
function SectionHead({
  kicker,
  title,
  desc,
  kickerColor = 'text-amber-600 dark:text-amber-400',
  className,
}: {
  kicker: string
  title: string
  desc?: string
  kickerColor?: string
  className?: string
}) {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", kickerColor, isUrdu && "font-urdu tracking-normal text-sm")}>
        {kicker}
      </p>
      <h2 className={cn("mt-2 text-balance font-extrabold tracking-tight text-foreground", isUrdu ? "font-urdu text-2xl sm:text-3xl md:text-4xl leading-[2.2] py-2" : "text-3xl sm:text-4xl leading-tight")}>
        {title}
      </h2>
      {desc ? (
        <p className={cn("mx-auto mt-3 max-w-xl text-pretty text-muted-foreground", isUrdu ? "font-urdu text-base sm:text-lg leading-[2.2] py-2" : "text-sm sm:text-base leading-relaxed")}>
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
  const { t } = useLang()
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
    <section ref={sectionRef} className="bg-gradient-to-b from-background via-emerald-950/5 to-background py-10 md:py-12 relative overflow-hidden">
      {/* Subtle mandala background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.04] text-emerald-800 pointer-events-none select-none">
        <Flower2 className="w-full h-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <SectionHead
          kicker={t('howItWorks')}
          title={t('pickOccasion') + ' & ' + t('personalizeShare')}
          desc={t('heroDesc').split('.')[0] + '.'}
          className="hiw-head"
        />

        {/* 2-Step Horizontal Stepper */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12">
          {/* Step 1 */}
          <div className="hiw-step relative rounded-2xl border border-teal-500/10 bg-card p-6 shadow-sm flex gap-4 items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 font-bold text-lg">
              1
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <span>{t('pickOccasion')}</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {t('pickOccasionDesc')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="hiw-step relative rounded-2xl border border-teal-500/10 bg-card p-6 shadow-sm flex gap-4 items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 font-bold text-lg">
              2
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <span>{t('personalizeShare')}</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {t('personalizeShareDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Free vs Premium Pricing Indicator (Surfaced Earlier) */}
        <div className="pricing-box max-w-4xl mx-auto rounded-3xl border border-teal-500/15 bg-gradient-to-br from-violet-50 via-card to-violet-100 p-6 sm:p-8 shadow-md">
          <div className="text-center mb-6">
            <span className="inline-block bg-teal-600 text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-1">
              {t('pricing')}
            </span>
            <h3 className="text-lg font-extrabold text-foreground">{t('simpleTransparentPricing')}</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-teal-500/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-100 text-teal-600 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                {t('freeForever')}
              </div>
              <p className="font-bold text-teal-600 text-sm flex items-center gap-1.5">
                <Sparkles className="size-4 shrink-0" /> {t('wishCardsStandardThemes')}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('freeForeverDesc')}
              </p>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-emerald-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                {t('cardzyProPremium')}
              </div>
              <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                <Crown className="size-4 shrink-0" /> {t('liveRsvpsMaps')}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('proUpgradeDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getGlobalCardTheme(id: string) {
  switch (id) {
    case 'christmas':
      return {
        badge: '🎄 Christmas',
        bg: 'from-rose-500/10 via-emerald-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
    case 'diwali':
      return {
        badge: '🪔 Festival of Lights',
        bg: 'from-amber-500/10 via-orange-500/5 to-card border-amber-500/20 hover:border-amber-500/50 shadow-xs hover:shadow-amber-500/10',
        iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
        badgeColor: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20',
        btnColor: 'text-amber-600 dark:text-amber-400',
      }
    case 'new-year':
      return {
        badge: '🎆 New Year 2026',
        bg: 'from-indigo-500/10 via-purple-500/5 to-card border-indigo-500/20 hover:border-indigo-500/50 shadow-xs hover:shadow-indigo-500/10',
        iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
        badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
        btnColor: 'text-indigo-600 dark:text-indigo-400',
      }
    case 'thanksgiving':
      return {
        badge: '🍁 Thanksgiving',
        bg: 'from-orange-500/10 via-amber-500/5 to-card border-orange-500/20 hover:border-orange-500/50 shadow-xs hover:shadow-orange-500/10',
        iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white',
        badgeColor: 'bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-500/20',
        btnColor: 'text-orange-600 dark:text-orange-400',
      }
    case 'lunar-new-year':
      return {
        badge: '🧧 Lunar New Year',
        bg: 'from-red-500/10 via-rose-500/5 to-card border-red-500/20 hover:border-red-500/50 shadow-xs hover:shadow-red-500/10',
        iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white',
        badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
        btnColor: 'text-red-600 dark:text-red-400',
      }
    case 'hanukkah':
      return {
        badge: '🕎 Hanukkah',
        bg: 'from-sky-500/10 via-blue-500/5 to-card border-sky-500/20 hover:border-sky-500/50 shadow-xs hover:shadow-sky-500/10',
        iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white',
        badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
        btnColor: 'text-sky-600 dark:text-sky-400',
      }
    case 'valentines':
      return {
        badge: '💖 Valentine’s',
        bg: 'from-rose-500/10 via-pink-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
    case 'easter':
      return {
        badge: '🐣 Easter',
        bg: 'from-purple-500/10 via-violet-500/5 to-card border-purple-500/20 hover:border-purple-500/50 shadow-xs hover:shadow-purple-500/10',
        iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
        btnColor: 'text-purple-600 dark:text-purple-400',
      }
    default:
      return {
        badge: '🌍 Global Holiday',
        bg: 'from-emerald-500/10 via-teal-500/5 to-card border-emerald-500/20 hover:border-emerald-500/50 shadow-xs hover:shadow-emerald-500/10',
        iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
        badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
        btnColor: 'text-emerald-600 dark:text-emerald-400',
      }
  }
}

function getFriendshipCardTheme(id: string) {
  switch (id) {
    case 'friendship-day':
      return {
        badge: '💕 Best Friends',
        bg: 'from-pink-500/10 via-rose-500/5 to-card border-pink-500/20 hover:border-pink-500/50 shadow-xs hover:shadow-pink-500/10',
        iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white',
        badgeColor: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20',
        btnColor: 'text-pink-600 dark:text-pink-400',
      }
    case 'thank-you':
      return {
        badge: '🙏 Gratitude',
        bg: 'from-emerald-500/10 via-teal-500/5 to-card border-emerald-500/20 hover:border-emerald-500/50 shadow-xs hover:shadow-emerald-500/10',
        iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
        badgeColor: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20',
        btnColor: 'text-emerald-600 dark:text-emerald-400',
      }
    case 'miss-you':
      return {
        badge: '💌 Heartfelt Note',
        bg: 'from-purple-500/10 via-violet-500/5 to-card border-purple-500/20 hover:border-purple-500/50 shadow-xs hover:shadow-purple-500/10',
        iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
        btnColor: 'text-purple-600 dark:text-purple-400',
      }
    default:
      return {
        badge: '🌸 Warm Wish',
        bg: 'from-rose-500/10 via-pink-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 2. CATEGORY TABS (Wedding, Birthday, Friendship, Festivals & Milestones)
// ─────────────────────────────────────────────────────────────────────────
type TabType = 'global' | 'wedding' | 'birthday' | 'visiting' | 'friendship' | 'festivals'

export function CategoryTabs() {
  const { t, lang } = useLang()
  const [activeTab, setActiveTab] = useState<TabType>('global')
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
  const globalOccasions = OCCASIONS.filter(
    (o) =>
      o.id === 'christmas' ||
      o.id === 'new-year' ||
      o.id === 'thanksgiving' ||
      o.id === 'halloween' ||
      o.id === 'easter' ||
      o.id === 'diwali' ||
      o.id === 'hanukkah' ||
      o.id === 'lunar-new-year' ||
      o.id === 'valentines' ||
      o.id === 'mothers-day' ||
      o.id === 'fathers-day' ||
      o.id === 'st-patricks-day' ||
      o.id === 'earth-day' ||
      o.id === 'friendship-day'
  )
  const weddingOccasions = OCCASIONS.filter((o) => o.category === 'Family')
  const friendshipOccasions = OCCASIONS.filter(
    (o) => o.id === 'friendship-day' || o.id === 'thank-you' || o.id === 'miss-you'
  )
  const religiousOccasions = OCCASIONS.filter((o) => o.category === 'Islamic')
  const milestoneOccasions = OCCASIONS.filter((o) => o.category === 'Achievements' || o.category === 'National')

  return (
    <section ref={sectionRef} className="py-10 md:py-12 bg-gradient-to-b from-background via-emerald-500/[0.02] to-background">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker={t('categoryTabsKicker')}
          title={t('findCardForEveryMoment')}
          className="tabs-head mb-6"
        />

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-10">
          {(
            [
              {
                id: 'global',
                label: t('globalCelebrations') || 'World Holidays & Global Days',
                icon: Globe,
                activeClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20 border-emerald-400/30',
              },
              {
                id: 'wedding',
                label: t('weddings') || 'Weddings & Celebrations',
                icon: Gem,
                activeClass: 'bg-gradient-to-r from-amber-600 to-teal-600 text-white shadow-lg shadow-amber-500/20 border-amber-400/30',
              },
              {
                id: 'birthday',
                label: t('birthdays') || 'Birthdays & Milestones',
                icon: Cake,
                activeClass: 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 border-pink-400/30',
              },
              {
                id: 'visiting',
                label: '💼 Digital Business Cards',
                icon: Sparkles,
                activeClass: 'bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 text-white shadow-lg shadow-teal-500/20 border-amber-400/30',
              },
              {
                id: 'friendship',
                label: t('greetingsWishes') || 'Friendship & Wishes',
                icon: Heart,
                activeClass: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20 border-rose-400/30',
              },
              {
                id: 'festivals',
                label: t('religiousCulturalTab') || 'Festivals & Achievements',
                icon: Moon,
                activeClass: 'bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 text-white shadow-lg shadow-teal-500/20 border-emerald-400/30',
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 border shadow-xs active:scale-95',
                  isActive
                    ? cn('scale-105', tab.activeClass)
                    : 'bg-card/90 hover:bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-emerald-500/40 hover:scale-102'
                )}
              >
                <Icon className={cn('size-4 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400')} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[220px]">
          {/* TAB 0: GLOBAL CELEBRATIONS */}
          {activeTab === 'global' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                  <Sparkles className="size-3.5 text-emerald-500" />
                  {t('globalCelebrations') || 'World Holidays & Global Days'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                  {t('worldHolidaysTitle') || 'Celebrate Holidays & Traditions Worldwide'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('worldHolidaysDesc') || 'From Christmas & Thanksgiving to Diwali, Lunar New Year & Hanukkah, send elegant digital greeting cards across borders.'}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {globalOccasions.map((o) => {
                  const theme = getGlobalCardTheme(o.id)
                  return (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      rel="nofollow"
                      className={cn(
                        "group relative flex flex-col justify-between p-6 rounded-3xl border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden",
                        theme.bg
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className={cn("flex size-12 items-center justify-center rounded-2xl transition-all duration-300 shadow-xs group-hover:scale-110 group-hover:rotate-3", theme.iconBg)}>
                            <JashnIcon name={o.icon} className="size-6" />
                          </div>
                          <span className={cn("px-3 py-1 rounded-full text-[11px] font-extrabold uppercase border tracking-wider", theme.badgeColor)}>
                            {theme.badge}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {getOccasionLabel(o, lang, t)}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {getOccasionTagline(o, lang, t)}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-extrabold">
                        <span className={cn("inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1", theme.btnColor)}>
                          {t('sendWishCardBtn') || 'Create & Send Card'}
                          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                          Animated Card
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 1: WEDDING */}
          {activeTab === 'wedding' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 uppercase">
                  <Gem className="size-3.5 text-teal-500" />
                  {t('weddings') || 'Weddings & Celebrations'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                  {t('celebrateLoveTogetherness') || 'Celebrate Love & Eternal Togetherness'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('weddingCardsDesc') || 'Design royal Nikah, Mehndi, Baraat, Walima & Engagement digital cards with live countdown, maps & instant WhatsApp RSVP.'}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {weddingOccasions.map((o) => {
                  const isNikah = o.id === 'nikah'
                  const isMehndi = o.id === 'mehndi'
                  const badgeText = isNikah ? '💍 Royal Nikah' : isMehndi ? '🪔 Mehndi & Dholki' : '💐 Wedding'
                  const bgClass = isNikah
                    ? 'from-amber-500/10 via-yellow-500/5 to-card border-amber-500/20 hover:border-amber-500/50 shadow-xs'
                    : isMehndi
                    ? 'from-emerald-500/10 via-teal-500/5 to-card border-emerald-500/20 hover:border-emerald-500/50 shadow-xs'
                    : 'from-teal-500/10 via-emerald-500/5 to-card border-teal-500/20 hover:border-teal-500/50 shadow-xs'
                  const iconBg = isNikah
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white'
                    : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white'

                  return (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      rel="nofollow"
                      className={cn(
                        "group relative flex flex-col justify-between p-6 rounded-3xl border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden",
                        bgClass
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className={cn("flex size-12 items-center justify-center rounded-2xl transition-all duration-300 shadow-xs group-hover:scale-110 group-hover:rotate-3", iconBg)}>
                            <JashnIcon name={o.icon} className="size-6" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase border border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300 tracking-wider">
                            {badgeText}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-foreground tracking-tight group-hover:text-teal-600 transition-colors">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {t('cardDescriptionText') || 'Animated card with customizable music, couple names & royal themes.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-extrabold">
                        <span className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                          {t('orderCardBtn') || 'Create Wedding Card'} <ArrowRight className="size-3.5" />
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                          RSVP + Maps
                        </span>
                      </div>
                    </Link>
                  )
                })}

                {/* Mughal Mehndi Invitation Special Feature Card */}
                <Link
                  href="/create-invitation?type=mehndi"
                  rel="nofollow"
                  className="group relative flex flex-col justify-between p-6 rounded-3xl border-2 border-dashed border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card hover:border-amber-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
                        <Gem className="size-6 text-amber-600" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500 text-slate-950 shadow-xs">
                        ★ Premium Full Invite
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-amber-800 dark:text-amber-300 tracking-tight">
                      {t('mughalMehndiTitle') || 'Mughal Royal Mehndi Invitation'}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {t('mughalMehndiDesc') || 'Full event invitation page with Dholki music, Google Maps, RSVP counter & countdown timer.'}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-extrabold">
                    <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 group-hover:translate-x-1 transition-transform">
                      {t('buildInvitation') || 'Build Full Invitation'} <ArrowRight className="size-3.5" />
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                      Live RSVP Web Link
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: BIRTHDAY */}
          {activeTab === 'birthday' && (
            <div className="animate-fadeIn space-y-6">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 text-pink-700 dark:text-pink-300 border border-pink-500/30 uppercase shadow-xs">
                  <Cake className="size-4 text-pink-500" />
                  {t('birthdays') || 'Birthdays & Milestones'}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground pt-1">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
                    {t('vibrantBirthdayTitle') || 'Vibrant Animated Birthday Greetings'}
                  </span> 🎉
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('vibrantBirthdayDesc') || 'Send sweet, colorful birthday wishes to your friends, family, and loved ones with animated cake candles, playful sparkles, custom music & photo frames.'}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-12 items-center bg-gradient-to-br from-card via-card to-pink-500/[0.03] border border-pink-500/20 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-black text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                      <Sparkles className="size-4 text-amber-500" /> Celebratory Features Included:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-card border border-amber-500/30 hover:border-amber-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-amber-700 dark:text-amber-300">
                          <span>🎂 Animated Cake & Candles</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          Flashing candle flames, party poppers & cake cutting animations.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-card border border-purple-500/30 hover:border-purple-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-purple-700 dark:text-purple-300">
                          <span>🎆 Sparkles & Fireworks</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          Joyful balloon bursts, confetti rain & magical sparkle effects.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-card border border-indigo-500/30 hover:border-indigo-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-indigo-700 dark:text-indigo-300">
                          <span>🎵 Birthday Songs & Beats</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          Custom background music & cheerful happy birthday tunes.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-card border border-rose-500/30 hover:border-rose-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-rose-700 dark:text-rose-300">
                          <span>👑 Milestone Celebrations</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          Crown badges & luxury themes for 18th, 21st, 50th & 60th birthdays.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href="/create-wish?occasion=birthday"
                      rel="nofollow"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 px-7 text-xs sm:text-sm font-black text-white transition-all shadow-lg hover:shadow-pink-500/25 active:scale-98"
                    >
                      <span>Create Birthday Card</span>
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/create-wish?occasion=milestone-birthday"
                      rel="nofollow"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 px-5 text-xs sm:text-sm font-extrabold text-purple-700 dark:text-purple-300 transition-all"
                    >
                      <span>Milestone Birthday (18th/21st/50th)</span>
                    </Link>
                  </div>
                </div>

                {/* Card Preview Column with Glowing Colorful Aura */}
                <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0 relative z-10">
                  <div className="relative">
                    {/* Multi-colored background glow halo */}
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 blur-2xl pointer-events-none" />

                    <div className="relative w-full max-w-xs rotate-2 shadow-2xl rounded-3xl overflow-hidden border-2 border-pink-500/40 transition-all duration-300 hover:rotate-0 hover:scale-105">
                      <WishCard
                        watermark={false}
                        data={{
                          occasionId: 'birthday',
                          themeId: 'midnight-kashi',
                          language: lang,
                          senderName: t('sampleSenderSajid') || 'Sajid',
                          recipientName: t('sampleRecipientZainab') || 'Zainab',
                          message: t('sampleBdayMsg') || 'Wishing you a year filled with happiness, success, and joyful moments!',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISITING CARDS */}
          {activeTab === 'visiting' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                  💼 Digital Business & Visiting Cards
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
                  Smart Digital Visiting Cards with 1-Click Contact Download (.vcf)
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Create executive, tech, medical, legal, and real estate digital business cards. Include phone, WhatsApp, Google Maps pin, social profiles, and 1-click <strong>Save Contact</strong> feature!
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-12 items-center bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { title: 'Corporate & Business', desc: 'CEOs, Managers & Founders' },
                      { title: 'Tech & Freelancers', desc: 'Developers, Designers & Creators' },
                      { title: 'Medical & Healthcare', desc: 'Doctors, Dentists & Clinics' },
                      { title: 'Legal & Advocate', desc: 'Lawyers & Consultants' },
                      { title: 'Real Estate', desc: 'Realtors & Property Agents' },
                      { title: 'Beauty & Fashion', desc: 'Salons & Makeup Artists' },
                    ].map((cat, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-muted/40 border border-border text-left hover:border-emerald-500/40 transition-colors">
                        <div className="text-xs font-extrabold text-foreground">{cat.title}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{cat.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/create-visiting-card"
                      className="inline-flex h-11 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 text-xs sm:text-sm font-black text-white hover:opacity-90 transition-all shadow-lg active:scale-98"
                    >
                      <span>Create Digital Visiting Card</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-xs p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-amber-500/40 space-y-4 transition-transform hover:scale-102 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        Executive Gold
                      </span>
                      <span className="text-[10px] font-bold opacity-75">Cardzy.online</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xl font-black tracking-tight">Dr. Zaryab Malik</div>
                      <div className="text-xs font-bold text-amber-300">Chief Executive Officer</div>
                      <div className="text-[11px] opacity-75">Malik Global Enterprises</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-bold">
                      <div className="p-2.5 rounded-xl bg-white/10 text-center">📞 Call Direct</div>
                      <div className="p-2.5 rounded-xl bg-emerald-600 text-center text-white">💬 WhatsApp</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs text-center shadow-md">
                      📥 Save Contact (.vcf)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FRIENDSHIP */}
          {activeTab === 'friendship' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 uppercase">
                  <Heart className="size-3.5 text-rose-500" />
                  {t('greetingsWishes') || 'Greetings & Wishes'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                  {t('strengthenBondsTitle') || 'Strengthen Your Bonds of Friendship'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('strengthenBondsDesc') || 'Show gratitude, say thank you, tell them they are missed, or celebrate Friendship Day with personalized heartwarming notes.'}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {friendshipOccasions.map((o) => {
                  const theme = getFriendshipCardTheme(o.id)
                  return (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      rel="nofollow"
                      className={cn(
                        "group relative flex flex-col justify-between p-6 rounded-3xl border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden",
                        theme.bg
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className={cn("flex size-12 items-center justify-center rounded-2xl transition-all duration-300 shadow-xs group-hover:scale-110 group-hover:rotate-3", theme.iconBg)}>
                            <JashnIcon name={o.icon} className="size-6" />
                          </div>
                          <span className={cn("px-3 py-1 rounded-full text-[11px] font-extrabold uppercase border tracking-wider", theme.badgeColor)}>
                            {theme.badge}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-foreground tracking-tight group-hover:text-rose-600 transition-colors">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {t('friendshipFeat') || 'Send personalized note cards with heartfelt greetings & music.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-extrabold">
                        <span className={cn("inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1", theme.btnColor)}>
                          {t('writeNote') || 'Write Heartfelt Note'} <ArrowRight className="size-3.5" />
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                          Heartfelt Card
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVALS & MILESTONES (Religious Occasions and Achievements Separated) */}
          {activeTab === 'festivals' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="max-w-2xl space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 uppercase">
                  <Award className="size-3.5 text-amber-500" />
                  {t('festivals') || 'Festivals & Achievements'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                  {t('celebrateFestivalsMilestones') || 'Celebrate Religious Festivals & Major Achievements'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('celebrateFestivalsDesc') || 'Send Eid, Ramadan, Jumma, Hajj, Graduation, New Job, Promotion & Housewarming cards instantly.'}
                </p>
              </div>

              {/* Group A: Religious Occasions */}
              <div className="space-y-4">
                <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-300 border-b border-emerald-500/20 pb-2 flex items-center gap-2">
                  <Moon className="size-4 text-emerald-600" /> Religious & Cultural Festivals
                </div>
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
                  {religiousOccasions.map((o) => (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      rel="nofollow"
                      className="group flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-card p-3.5 transition-all hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                        <JashnIcon name={o.icon} className="size-5" />
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-emerald-600 truncate">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">Send Wish Card</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group B: Milestones & Achievements */}
              <div className="space-y-4 pt-2">
                <div className="text-xs uppercase font-extrabold tracking-wider text-amber-700 dark:text-amber-300 border-b border-amber-500/20 pb-2 flex items-center gap-2">
                  <Award className="size-4 text-amber-600" /> Milestones & Life Achievements
                </div>
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
                  {milestoneOccasions.map((o) => (
                    <Link
                      key={o.id}
                      href={`/create-wish?occasion=${o.id}`}
                      rel="nofollow"
                      className="group flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-card p-3.5 transition-all hover:border-amber-500 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xs">
                        <JashnIcon name={o.icon} className="size-5" />
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-amber-600 truncate">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">Congratulate</span>
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
  const { t, lang } = useLang()
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
    <section ref={sectionRef} className="relative overflow-hidden border-t border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-[#08300c]/5 py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker={t('createInvitation')}
          kickerColor="text-emerald-700 font-bold"
          title={t('oneLink')}
          desc={t('designInviteDesc')}
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
                  title: t('sampleMehndiTitle'),
                  hostNames: t('sampleHostMalik'),
                  groom: t('sampleGroomZaryab') || 'Zaryab',
                  bride: t('sampleBrideRida') || 'Rida',
                  date: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 10), // 12 days in future
                  time: '8:00 PM',
                  venue: t('sampleVenuePC') || 'Pearl Continental Lawn',
                  city: t('sampleCityRawalpindi') || 'Rawalpindi',
                  dressCode: t('sampleDressYellowGreen'),
                  notes: t('sampleNotesDholki'),
                  themeId: 'emerald-classic',
                }}
              />
            </div>
          </div>

          {/* Feature list */}
          <div className="inv-features lg:col-span-7 space-y-6 order-1 lg:order-2">
            <p className={cn(
              "font-extrabold text-foreground text-2xl leading-tight",
              (lang === 'ur' || lang === 'ar') && "font-urdu text-2xl md:text-3xl leading-[2.2] py-2"
            )}>
              {t('oneLink')}
            </p>
            <p className={cn(
              "text-muted-foreground",
              (lang === 'ur' || lang === 'ar') ? "font-urdu text-base sm:text-lg leading-[2.2] py-2" : "text-sm leading-relaxed"
            )}>
              {t('oneLinkDesc')}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {[
                t('featWhatsappRsvp'),
                t('featGoogleMaps'),
                t('featCountdown'),
                t('featDressCodeNotes'),
                t('featHostDashboard'),
                t('featPremiumAudio'),
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
                {t('createInvitation')} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {t('viewDashboard')} →
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
  const { t, lang } = useLang()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const cardsData = [
    {
      type: 'wish',
      title: t('sampleEidCardTitle'),
      description: t('sampleEidCardDesc'),
      watermark: true,
      data: {
        occasionId: 'eid-ul-fitr',
        themeId: 'mughal-gold',
        language: lang,
        senderName: t('sampleSenderAhmed'),
        recipientName: t('sampleRecipientYou'),
        message: t('sampleEidMsg'),
      }
    },
    {
      type: 'wish',
      title: t('sampleShaadiCardTitle'),
      description: t('sampleShaadiCardDesc'),
      watermark: true,
      data: {
        occasionId: 'shaadi',
        themeId: 'pink-zardozi',
        language: lang,
        senderName: t('sampleSenderKhan'),
        message: t('sampleShaadiMsg'),
      }
    },
    {
      type: 'wish',
      title: t('sampleBirthdayCardTitle'),
      description: t('sampleBirthdayCardDesc'),
      watermark: true,
      data: {
        occasionId: 'birthday',
        themeId: 'midnight-kashi',
        language: lang,
        senderName: t('sampleSenderBilal'),
        recipientName: t('sampleRecipientSana'),
        message: t('sampleBdayMsg'),
      }
    },
    {
      type: 'invitation',
      title: t('sampleMehndiInviteTitle'),
      description: t('sampleMehndiInviteDesc'),
      watermark: true,
      data: {
        typeId: 'mehndi',
        title: t('sampleMehndiTitle'),
        hostNames: t('sampleHostMalik'),
        groom: t('sampleGroomHamza'),
        bride: t('sampleBrideAyesha'),
        date: '2026-12-20',
        time: '7:00 PM',
        venue: t('sampleVenueRoyal'),
        city: t('sampleCityLahore'),
        dressCode: t('sampleDressYellowGreen'),
        notes: t('sampleNotesDholki'),
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

  return null
}

// ─────────────────────────────────────────────────────────────────────────
// 4. CTA SECTION (Only 2 main button CTA pairings on page, Hero & bottom)
// ─────────────────────────────────────────────────────────────────────────
export function HomeCTA() {
  const { t } = useLang()
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
    <section ref={sectionRef} className="border-t border-teal-500/20 bg-gradient-to-br from-teal-600 to-teal-900 text-[#f5f3ff] py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f5f3ff_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-4 py-8 text-center relative z-10 space-y-6">
        <h2 className="cta-item text-balance text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
          {t('spreadJoy')}
        </h2>
        <p className="cta-item mx-auto mt-2 max-w-md text-pretty text-amber-100/80 text-sm sm:text-base leading-relaxed">
          {t('spreadJoyDesc')}
        </p>
        
        {/* Main CTA pair (Instance 2 of 2) */}
        <div className="cta-item mt-8 flex flex-col justify-center gap-3 sm:flex-row max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/create-wish"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 text-sm font-bold text-[#0f766e] hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25"
          >
            {t('sendWish')} <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/create-invitation"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition-all"
          >
            {t('createInvitation')}
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
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div suppressHydrationWarning className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
      {/* Floating Options Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 items-end mb-1 animate-slideUp">
          <Link
            href="/create-wish"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Sparkles className="size-3.5" />
            <span>{t('sendWish')}</span>
          </Link>
          <Link
            href="/create-invitation"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xl border border-white/10 active:scale-95 transition-transform"
          >
            <Mail className="size-3.5" />
            <span>{t('createInvitation')}</span>
          </Link>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-full px-6 font-bold text-sm text-white transition-all active:scale-95 border border-white/15",
          isOpen 
            ? "bg-zinc-800 ring-4 ring-zinc-800/20 shadow-2xl" 
            : "bg-emerald-800 hover:bg-emerald-900 ring-4 ring-emerald-900/20 shadow-lg"
        )}
        aria-label="Create card menu"
      >
        {isOpen ? (
          <>
            <X className="size-4 shrink-0" />
            <span>{t('close')}</span>
          </>
        ) : (
          <>
            <Plus className="size-4 shrink-0" />
            <span>{t('getStarted')}</span>
          </>
        )}
      </button>
    </div>
  )
}

export function ConciergeService() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const whatsappMessage = encodeURIComponent(
    "Hi Cardzy Team! I want you to create my custom event invitation / wish card. Here are my details:\n\n" +
    "• Event Title / Occasion: \n" +
    "• Host / Couple Names: \n" +
    "• Date & Time: \n" +
    "• Venue & City: \n" +
    "• Special Message / Notes: "
  )

  const whatsappUrl = `https://wa.me/923093518796?text=${whatsappMessage}`
  const emailUrl = `mailto:cardzyonline@gmail.com?subject=Custom%20Card%20Creation%20Request&body=Hi%20Cardzy%20Team,%0A%0AI%20would%20like%20you%20to%20create%20my%20card.%0A%0AEvent%20Title:%20%0AGroom%20%26%20Bride%20Names:%20%0ADate%20%26%20Time:%20%0AVenue%20%26%20City:%20%0ARSVP%20Contact:%20`

  return (
    <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-10 md:py-12 px-4 relative overflow-hidden my-4 md:my-6 rounded-3xl max-w-6xl mx-auto border border-indigo-500/20 shadow-2xl">
      {/* Glow background effects */}
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-widest">
          <Sparkles className="size-4 text-emerald-400" />
          <span>{t('conciergeKicker')}</span>
        </div>

        <h2 className={cn("text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight", isUrdu && "font-urdu leading-[2.2]")}>
          {t('conciergeTitle')}
        </h2>

        <p className={cn("mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed", isUrdu && "font-urdu text-base sm:text-lg leading-[2.2]")}>
          {t('conciergeDesc')}
        </p>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
            <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
              1
            </div>
            <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
              {t('conciergeStep1Title')}
            </h3>
            <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
              {t('conciergeStep1Desc')}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
            <div className="size-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-extrabold text-lg">
              2
            </div>
            <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
              {t('conciergeStep2Title')}
            </h3>
            <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
              {t('conciergeStep2Desc')}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
            <div className="size-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-lg">
              3
            </div>
            <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
              {t('conciergeStep3Title')}
            </h3>
            <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
              {t('conciergeStep3Desc')}
            </p>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 text-sm sm:text-base shadow-xl shadow-emerald-950/50 transition-all hover:scale-105"
          >
            <span>{t('sendWhatsApp')}</span>
            <ArrowRight className="size-5" />
          </a>

          <a
            href={emailUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 text-sm sm:text-base shadow-lg transition-all hover:scale-105"
          >
            <Mail className="size-5" />
            <span>{t('sendEmail')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
