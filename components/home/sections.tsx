'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
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
  Plus
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { JashnIcon } from '@/lib/jashn/icon'
import { OCCASIONS, getOccasionLabel, getOccasionTagline } from '@/lib/jashn/occasions'
import { WishCard } from '@/components/jashn/wish-card'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

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
    <section ref={sectionRef} className="bg-gradient-to-b from-background via-emerald-950/5 to-background py-16 relative overflow-hidden">
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
              <h4 className="font-bold text-teal-600 text-sm flex items-center gap-1.5">
                <Sparkles className="size-4 shrink-0" /> {t('wishCardsStandardThemes')}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('freeForeverDesc')}
              </p>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-emerald-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                {t('cardzyProPremium')}
              </div>
              <h4 className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                <Crown className="size-4 shrink-0" /> {t('liveRsvpsMaps')}
              </h4>
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

// ─────────────────────────────────────────────────────────────────────────
// 2. CATEGORY TABS (Wedding, Birthday, Friendship, Festivals & Milestones)
// ─────────────────────────────────────────────────────────────────────────
type TabType = 'global' | 'wedding' | 'birthday' | 'friendship' | 'festivals'

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
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker={t('exploreCollection')}
          title={t('findCardForEveryMoment')}
          desc={t('heroDesc')}
          className="tabs-head"
        />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex rounded-2xl bg-muted/60 p-1.5 border border-border">
            {(
              [
                { id: 'global', label: t('globalCelebrations') || 'World Holidays & Global Days' },
                { id: 'wedding', label: t('weddings') || 'Weddings & Celebrations' },
                { id: 'birthday', label: t('birthdays') || 'Birthdays & Milestones' },
                { id: 'friendship', label: t('greetingsWishes') || 'Friendship & Wishes' },
                { id: 'festivals', label: t('religiousCulturalTab') || 'Festivals & Achievements' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-card text-emerald-700 dark:text-emerald-400 shadow-sm border border-emerald-500/20'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[350px]">
          {/* TAB 0: GLOBAL CELEBRATIONS */}
          {activeTab === 'global' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">{t('globalCelebrations')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('worldHolidaysTitle')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {t('worldHolidaysDesc')}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {globalOccasions.map((o) => (
                  <Link
                    key={o.id}
                    href={`/create-wish?occasion=${o.id}`}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-emerald-500/20 bg-card hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
                  >
                    <div>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-3">
                        <JashnIcon name={o.icon} className="size-5" />
                      </div>
                      <h4 className="text-base font-bold text-foreground">{getOccasionLabel(o, lang, t)}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {getOccasionTagline(o, lang, t)}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      {t('sendWishCardBtn')} <ArrowRight className="size-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: WEDDING */}
          {activeTab === 'wedding' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600">{t('weddings')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('celebrateLoveTogetherness')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {t('weddingCardsDesc')}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {weddingOccasions.map((o) => (
                  <Link
                    key={o.id}
                    href={`/create-wish?occasion=${o.id}`}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-teal-500/20 bg-card hover:border-teal-500 hover:shadow-violet-100 transition-all duration-200"
                  >
                    <div>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors mb-3">
                        <JashnIcon name={o.icon} className="size-5" />
                      </div>
                      <h4 className="text-base font-bold text-foreground">{t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {t('cardDescriptionText')}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:underline">
                      {t('orderCardBtn')} <ArrowRight className="size-3" />
                    </span>
                  </Link>
                ))}

                {/* Mughal Mehndi Invitation Link */}
                <Link
                  href="/create-invitation?type=mehndi"
                  className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-dashed border-amber-500 bg-gradient-to-br from-amber-500/5 to-card hover:border-teal-500 transition-all duration-200 animate-pulse"
                >
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 mb-3">
                      <Gem className="size-5" />
                    </div>
                    <h4 className="text-base font-bold text-amber-800">{t('mughalMehndiTitle')}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {t('mughalMehndiDesc')}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-600">
                    {t('buildInvitation')} <ArrowRight className="size-3" />
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
                    <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600">{t('birthdays')}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">{t('vibrantBirthdayTitle')}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                      {t('vibrantBirthdayDesc')}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>{t('bdayFeat1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>{t('bdayFeat2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-indigo-600 shrink-0" />
                      <span>{t('bdayFeat3')}</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Link
                      href="/create-wish?occasion=birthday"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#0d9488] px-5 text-xs sm:text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md"
                    >
                      {t('sendWish')} — {t('birthdays')} <ArrowRight className="size-3.5" />
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
                        language: lang,
                        senderName: t('sampleSenderSajid') || 'Sajid',
                        recipientName: t('sampleRecipientZainab') || 'Zainab',
                        message: t('sampleBdayMsg'),
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
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-500">{t('greetingsWishes')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('strengthenBondsTitle')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {t('strengthenBondsDesc')}
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
                    <h4 className="text-base font-bold text-foreground mt-4">{t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {t('friendshipFeat')}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-500 group-hover:underline">
                      {t('writeNote')} <ArrowRight className="size-3" />
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
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">{t('festivals')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('celebrateFestivalsMilestones')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {t('celebrateFestivalsDesc')}
                </p>
              </div>

              {/* Group A: Religious Occasions */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-700 border-b border-emerald-500/10 pb-1.5 flex items-center gap-1.5">
                  <Moon className="size-4 text-emerald-700" /> {t('festivals')}
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
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-teal-600 truncate">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group B: Milestones & Achievements */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-700 border-b border-amber-500/10 pb-1.5 flex items-center gap-1.5">
                  <Award className="size-4 text-amber-700" /> {t('achievements')}
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
                        <span className="text-xs font-bold text-foreground leading-tight block group-hover:text-teal-600 truncate">
                          {t(`occ_${o.id.replace(/-/g, '_')}`) || o.label}
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
    <section ref={sectionRef} className="relative overflow-hidden border-t border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-[#08300c]/5 py-20">
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
            <h3 className={cn(
              "font-extrabold text-foreground",
              (lang === 'ur' || lang === 'ar') ? "font-urdu text-2xl md:text-3xl leading-[2.2] py-2" : "text-2xl leading-tight"
            )}>
              {t('oneLink')}
            </h3>
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

  return (
    <section className="border-t border-emerald-900/10 bg-gradient-to-b from-background via-emerald-950/5 to-background py-16 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker={t('designShowcase')}
          title={t('liveAnimatedCardPreview')}
          desc={t('swipeShowcaseDesc')}
        />

        {/* ── Responsive Grid Showcase (Zero Horizontal Scroll, Uniform Width & Height) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="w-full flex flex-col items-center justify-between rounded-3xl border border-emerald-900/20 bg-card/70 p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[500px]"
            >
              {/* Details above card */}
              <div className="text-center mb-4 w-full">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full mb-1.5">
                  <Sparkles className="size-3.5 text-amber-500" /> {card.title}
                </span>
                <p className="text-xs text-muted-foreground line-clamp-1">{card.description}</p>
              </div>

              {/* Uniform card wrapper (Fixed Aspect & Identical Dimensions) */}
              <div className="w-full max-w-[360px] mx-auto flex-1 flex flex-col justify-center rounded-2xl overflow-hidden shadow-xl border border-amber-500/20 bg-card">
                {card.type === 'wish' ? (
                  <WishCard watermark={card.watermark} data={card.data as any} />
                ) : (
                  <InvitationCard watermark={card.watermark} showCountdown={true} data={card.data as any} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
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
    <section ref={sectionRef} className="border-t border-teal-500/20 bg-gradient-to-br from-teal-600 to-teal-900 text-[#f5f3ff] py-20 relative overflow-hidden">
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
    <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
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
          "flex h-12 items-center justify-center gap-2 rounded-full px-6 font-bold text-sm text-white shadow-2xl transition-all active:scale-95 border border-white/15",
          isOpen 
            ? "bg-zinc-800 ring-4 ring-zinc-800/20" 
            : "bg-teal-600 hover:bg-teal-600/90 ring-4 ring-teal-100 shadow-amber-500/10"
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
