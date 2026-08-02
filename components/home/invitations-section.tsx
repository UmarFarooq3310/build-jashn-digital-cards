'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'
import { SectionHead } from './section-head'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const InvitationCard = dynamic(
  () => import('@/components/jashn/invitation-card').then((mod) => mod.InvitationCard),
  { ssr: false }
)

export function InvitationsSection() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const timer = setTimeout(() => {
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
    }, 100)

    return () => clearTimeout(timer)
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
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-950 px-6 font-bold text-white hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-950/20 active:scale-95 transition-transform"
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
