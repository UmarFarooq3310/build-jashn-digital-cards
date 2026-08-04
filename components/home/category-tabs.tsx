'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import {
  ArrowRight,
  Sparkles,
  Heart,
  Moon,
  Cake,
  Gem,
  Award,
  Globe
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

import { JashnIcon } from '@/lib/jashn/icon'
import { OCCASIONS, getOccasionLabel, getOccasionTagline } from '@/lib/jashn/occasions'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'
import { SectionHead } from './section-head'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const WishCard = dynamic(
  () => import('@/components/jashn/wish-card').then((mod) => mod.WishCard),
  { ssr: false }
)

type TabType = 'global' | 'wedding' | 'birthday' | 'visiting' | 'friendship' | 'festivals'

function getGlobalCardTheme(id: string) {
  switch (id) {
    case 'christmas':
      return {
        badgeKey: 'badge_christmas',
        badgeFallback: '🎄 Christmas',
        bg: 'from-rose-500/10 via-emerald-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
    case 'diwali':
      return {
        badgeKey: 'badge_diwali',
        badgeFallback: '🪔 Festival of Lights',
        bg: 'from-amber-500/10 via-orange-500/5 to-card border-amber-500/20 hover:border-amber-500/50 shadow-xs hover:shadow-amber-500/10',
        iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
        badgeColor: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20',
        btnColor: 'text-amber-600 dark:text-amber-400',
      }
    case 'new-year':
      return {
        badgeKey: 'badge_newyear',
        badgeFallback: '🎆 New Year 2026',
        bg: 'from-indigo-500/10 via-purple-500/5 to-card border-indigo-500/20 hover:border-indigo-500/50 shadow-xs hover:shadow-indigo-500/10',
        iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
        badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
        btnColor: 'text-indigo-600 dark:text-indigo-400',
      }
    case 'thanksgiving':
      return {
        badgeKey: 'badge_thanksgiving',
        badgeFallback: '🍁 Thanksgiving',
        bg: 'from-orange-500/10 via-amber-500/5 to-card border-orange-500/20 hover:border-orange-500/50 shadow-xs hover:shadow-orange-500/10',
        iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white',
        badgeColor: 'bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-500/20',
        btnColor: 'text-orange-600 dark:text-orange-400',
      }
    case 'lunar-new-year':
      return {
        badgeKey: 'badge_lunarnewyear',
        badgeFallback: '🧧 Lunar New Year',
        bg: 'from-red-500/10 via-rose-500/5 to-card border-red-500/20 hover:border-red-500/50 shadow-xs hover:shadow-red-500/10',
        iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white',
        badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
        btnColor: 'text-red-600 dark:text-red-400',
      }
    case 'hanukkah':
      return {
        badgeKey: 'badge_hanukkah',
        badgeFallback: '🕎 Hanukkah',
        bg: 'from-sky-500/10 via-blue-500/5 to-card border-sky-500/20 hover:border-sky-500/50 shadow-xs hover:shadow-sky-500/10',
        iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white',
        badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
        btnColor: 'text-sky-600 dark:text-sky-400',
      }
    case 'valentines':
      return {
        badgeKey: 'badge_valentines',
        badgeFallback: '💖 Valentine’s',
        bg: 'from-rose-500/10 via-pink-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
    case 'easter':
      return {
        badgeKey: 'badge_easter',
        badgeFallback: '🐣 Easter',
        bg: 'from-purple-500/10 via-violet-500/5 to-card border-purple-500/20 hover:border-purple-500/50 shadow-xs hover:shadow-purple-500/10',
        iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
        btnColor: 'text-purple-600 dark:text-purple-400',
      }
    default:
      return {
        badgeKey: 'badge_globalholiday',
        badgeFallback: '🌍 Global Holiday',
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
        badgeKey: 'badge_bestfriends',
        badgeFallback: '💕 Best Friends',
        bg: 'from-pink-500/10 via-rose-500/5 to-card border-pink-500/20 hover:border-pink-500/50 shadow-xs hover:shadow-pink-500/10',
        iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white',
        badgeColor: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20',
        btnColor: 'text-pink-600 dark:text-pink-400',
      }
    case 'thank-you':
      return {
        badgeKey: 'badge_gratitude',
        badgeFallback: '🙏 Gratitude',
        bg: 'from-emerald-500/10 via-teal-500/5 to-card border-emerald-500/20 hover:border-emerald-500/50 shadow-xs hover:shadow-emerald-500/10',
        iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
        badgeColor: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20',
        btnColor: 'text-emerald-600 dark:text-emerald-400',
      }
    case 'miss-you':
      return {
        badgeKey: 'badge_heartfeltnote',
        badgeFallback: '💌 Heartfelt Note',
        bg: 'from-purple-500/10 via-violet-500/5 to-card border-purple-500/20 hover:border-purple-500/50 shadow-xs hover:shadow-purple-500/10',
        iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
        btnColor: 'text-purple-600 dark:text-purple-400',
      }
    default:
      return {
        badgeKey: 'badge_warmwish',
        badgeFallback: '🌸 Warm Wish',
        bg: 'from-rose-500/10 via-pink-500/5 to-card border-rose-500/20 hover:border-rose-500/50 shadow-xs hover:shadow-rose-500/10',
        iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        btnColor: 'text-rose-600 dark:text-rose-400',
      }
  }
}

export function CategoryTabs() {
  const { t, lang } = useLang()
  const [activeTab, setActiveTab] = useState<TabType>('global')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const timer = setTimeout(() => {
      gsap.fromTo(el.querySelector('.tabs-head'), { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, { scope: sectionRef })

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
                label: t('digitalBusinessCardsCategory') || '💼 Digital Business Cards',
                icon: Sparkles,
                activeClass: 'bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 text-white shadow-lg shadow-teal-500/20 border-amber-400/30',
              },
              {
                id: 'friendship',
                label: t('friendshipDayCategory') || '💕 Friendship Day',
                icon: Heart,
                activeClass: 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-pink-500/20 border-pink-400/30',
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
                            {t(theme.badgeKey) || theme.badgeFallback}
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
                          {t('animatedCardBadge') || 'Animated Card'}
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
                  const badgeText = isNikah ? (t('royalNikahBadge') || '💍 Royal Nikah') : isMehndi ? (t('mehndiDholkiBadge') || '🪔 Mehndi & Dholki') : (t('weddingBadge') || '💐 Wedding')
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
                          {t('weddingCardDescriptionText') || 'Animated card with customizable music, couple names & royal themes.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-extrabold">
                        <span className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                          {t('orderCardBtn') || 'Create Wedding Card'} <ArrowRight className="size-3.5" />
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                          {t('rsvpPlusMapsBadge') || 'RSVP + Maps'}
                        </span>
                      </div>
                    </Link>
                  )
                })}

                {/* Mughal Mehndi Invitation Special Feature Card */}
                <Link
                  href="/create-invitation"
                  rel="nofollow"
                  className="group relative flex flex-col justify-between p-6 rounded-3xl border-2 border-dashed border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card hover:border-amber-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
                        <Gem className="size-6 text-amber-600" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500 text-slate-950 shadow-xs">
                        {t('premiumFullInviteBadge') || '★ Premium Full Invite'}
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
                      {t('liveRsvpWebLinkBadge') || 'Live RSVP Web Link'}
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
                      <Sparkles className="size-4 text-amber-500" /> {t('celebratoryFeaturesIncluded') || 'Celebratory Features Included:'}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-card border border-amber-500/30 hover:border-amber-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-amber-700 dark:text-amber-300">
                          <span>{t('animatedCakeCandles') || '🎂 Animated Cake & Candles'}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          {t('animatedCakeCandlesDesc') || 'Flashing candle flames, party poppers & cake cutting animations.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-card border border-purple-500/30 hover:border-purple-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-purple-700 dark:text-purple-300">
                          <span>{t('sparklesFireworks') || '🎆 Sparkles & Fireworks'}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          {t('sparklesFireworksDesc') || 'Joyful balloon bursts, confetti rain & magical sparkle effects.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-card border border-indigo-500/30 hover:border-indigo-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-indigo-700 dark:text-indigo-300">
                          <span>{t('birthdaySongsBeats') || '🎵 Birthday Songs & Beats'}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          {t('birthdaySongsBeatsDesc') || 'Custom background music & cheerful happy birthday tunes.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-card border border-rose-500/30 hover:border-rose-500 transition-all shadow-xs">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-rose-700 dark:text-rose-300">
                          <span>{t('milestoneCelebrations') || '👑 Milestone Celebrations'}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          {t('milestoneCelebrationsDesc') || 'Crown badges & luxury themes for 18th, 21st, 50th & 60th birthdays.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href="/create-wish"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 px-7 text-xs sm:text-sm font-black text-white transition-all shadow-lg hover:shadow-pink-500/25 active:scale-98"
                    >
                      <span>{t('createBirthdayCard') || 'Create Birthday Card'}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href="/create-wish"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 px-5 text-xs sm:text-sm font-extrabold text-purple-700 dark:text-purple-300 transition-all"
                    >
                      <span>{t('milestoneBirthdayBtn') || 'Milestone Birthday (18th/21st/50th)'}</span>
                    </Link>
                  </div>
                </div>

                {/* Card Preview Column */}
                <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0 relative z-10">
                  <div className="relative">
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
                  {t('digitalBusinessVisitingCards') || '💼 Digital Business & Visiting Cards'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
                  {t('smartDigitalVisitingCardsTitle') || 'Smart Digital Visiting Cards with 1-Click Contact Download (.vcf)'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('smartDigitalVisitingCardsDesc') || 'Create executive, tech, medical, legal, and real estate digital business cards. Include phone, WhatsApp, Google Maps pin, social profiles, and 1-click Save Contact feature!'}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-12 items-center bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'catCorporate', defaultTitle: 'Corporate & Business', descKey: 'cat_corporate_desc', defaultDesc: 'CEOs, Managers & Founders' },
                      { key: 'catTech', defaultTitle: 'Tech & Freelancers', descKey: 'cat_tech_desc', defaultDesc: 'Developers, Designers & Creators' },
                      { key: 'catMedical', defaultTitle: 'Medical & Healthcare', descKey: 'cat_medical_desc', defaultDesc: 'Doctors, Dentists & Clinics' },
                      { key: 'catLegal', defaultTitle: 'Legal & Advocate', descKey: 'cat_legal_desc', defaultDesc: 'Lawyers & Consultants' },
                      { key: 'catRealEstate', defaultTitle: 'Real Estate & Builders', descKey: 'cat_realestate_desc', defaultDesc: 'Realtors & Property Agents' },
                      { key: 'catFashion', defaultTitle: 'Fashion & Beauty Salon', descKey: 'cat_beauty_desc', defaultDesc: 'Salons & Makeup Artists' },
                    ].map((cat, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-muted/40 border border-border text-left hover:border-emerald-500/40 transition-colors">
                        <div className="text-xs font-extrabold text-foreground">{t(cat.key) || cat.defaultTitle}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{t(cat.descKey) || cat.defaultDesc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/create-visiting-card"
                      className="inline-flex h-11 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 text-xs sm:text-sm font-black text-white hover:opacity-90 transition-all shadow-lg active:scale-98"
                    >
                      <span>{t('createDigitalVisitingCardBtn') || 'Create Digital Visiting Card'}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-xs p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-amber-500/40 space-y-4 transition-transform hover:scale-102 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        {t('executiveGoldBadge') || 'Executive Gold'}
                      </span>
                      <span className="text-[10px] font-bold opacity-75">Cardzy.online</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xl font-black tracking-tight">Dr. Zaryab Malik</div>
                      <div className="text-xs font-bold text-amber-300">Chief Executive Officer</div>
                      <div className="text-[11px] opacity-75">Malik Global Enterprises</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-bold">
                      <div className="p-2.5 rounded-xl bg-white/10 text-center">{t('callDirectBtn') || '📞 Call Direct'}</div>
                      <div className="p-2.5 rounded-xl bg-emerald-600 text-center text-white">{t('whatsAppChatBtn') || '💬 WhatsApp'}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs text-center shadow-md">
                      {t('saveContactVcfBtn') || '📥 Save Contact (.vcf)'}
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
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/30 uppercase">
                  <Heart className="size-3.5 text-pink-500 fill-pink-500 animate-pulse" />
                  {t('internationalFriendshipDay') || '💕 International Friendship Day 💖'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                  {t('celebrateFriendshipDayTitle') || 'Celebrate Friendship Day!'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('celebrateFriendshipDayDesc') || 'Send personalized 3D animated wish cards, family & friend photo frames, custom music, and heartfelt messages to your best friends on WhatsApp, Instagram, or email.'}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {friendshipOccasions.map((o) => {
                  const theme = getFriendshipCardTheme(o.id)
                  return (
                    <Link
                      key={o.id}
                      href="/create-wish"
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
                            {t(theme.badgeKey) || theme.badgeFallback}
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
                          {t('heartfeltCardBadge') || 'Heartfelt Card'}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVALS & MILESTONES */}
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
                  <Moon className="size-4 text-emerald-600" /> {t('religiousCulturalFestivals') || 'Religious & Cultural Festivals'}
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
                        <span className="text-[10px] text-muted-foreground font-medium">{t('sendWishCardSub') || 'Send Wish Card'}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group B: Milestones & Achievements */}
              <div className="space-y-4 pt-2">
                <div className="text-xs uppercase font-extrabold tracking-wider text-amber-700 dark:text-amber-300 border-b border-amber-500/20 pb-2 flex items-center gap-2">
                  <Award className="size-4 text-amber-600" /> {t('milestonesLifeAchievements') || 'Milestones & Life Achievements'}
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
                        <span className="text-[10px] text-muted-foreground font-medium">{t('congratulateSub') || 'Congratulate'}</span>
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
