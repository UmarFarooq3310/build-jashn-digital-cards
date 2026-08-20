'use client'

import { useRef } from 'react'
import { Flower2, Sparkles, Crown } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang/context'
import { SectionHead } from './section-head'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HowItWorks() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    // Defer GSAP setup slightly on mobile to avoid blocking initial paint
    const timer = setTimeout(() => {
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
    }, 100)

    return () => clearTimeout(timer)
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

        {/* 3-Step Horizontal Stepper */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
          {/* Step 1 */}
          <div className="hiw-step relative rounded-2xl border border-teal-500/10 bg-card p-5 sm:p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-extrabold text-base border border-teal-500/20">
                1
              </span>
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Choose Format &amp; Occasion
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Select 3D animated wish cards, royal wedding invitations with WhatsApp RSVP, or contactless executive smart vCards across 34+ celebration themes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="hiw-step relative rounded-2xl border border-teal-500/10 bg-card p-5 sm:p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-base border border-amber-500/20">
                2
              </span>
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Personalize Photos &amp; Music
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Upload photos, add synthesized background music (shehnai, dholki, chimes), write custom messages in 18 languages, and attach event venue map links.
            </p>
          </div>

          {/* Step 3 */}
          <div className="hiw-step relative rounded-2xl border border-teal-500/10 bg-card p-5 sm:p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-base border border-emerald-500/20">
                3
              </span>
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Share &amp; Track WhatsApp RSVPs
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Share directly via WhatsApp, SMS, or QR code. Guests unbox an interactive 3D card on their phone and confirm attendance with real-time RSVP updates.
            </p>
          </div>
        </div>

        {/* Free vs Premium Pricing Indicator */}
        <div className="pricing-box max-w-6xl mx-auto rounded-3xl border border-teal-500/15 bg-gradient-to-br from-violet-50 via-card to-violet-100 p-6 sm:p-8 shadow-md">
          <div className="text-center mb-6">
            <span className="inline-block bg-teal-800 text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-1">
              {t('pricing')}
            </span>
            <h3 className="text-lg font-extrabold text-foreground">{t('simpleTransparentPricing')}</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-teal-500/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-100 text-teal-900 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                {t('freeForever')}
              </div>
              <p className="font-bold text-teal-800 text-sm flex items-center gap-1.5">
                <Sparkles className="size-4 shrink-0" /> {t('wishCardsStandardThemes')}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('freeForeverDesc')}
              </p>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-card border border-emerald-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-900/10 text-emerald-950 px-2 py-0.5 rounded-bl-xl text-[10px] font-bold">
                {t('cardzyProPremium')}
              </div>
              <p className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
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
