'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, MailOpen, Sparkles, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'
import { WishCard } from '@/components/jashn/wish-card'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const emailFormRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { t, lang } = useLang()
  const [heroEmail, setHeroEmail] = useState('')

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Badge slides down from above
    tl.fromTo(
      badgeRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    // Heading word-by-word feel via clip + translate
    .fromTo(
      headingRef.current,
      { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8 },
      '-=0.2'
    )
    // Description fades up
    .fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55 },
      '-=0.3'
    )
    // Buttons pop in staggered
    .fromTo(
      buttonsRef.current?.children ?? [],
      { scale: 0.85, opacity: 0, y: 16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: 'back.out(1.5)' },
      '-=0.2'
    )
    // Email form slides up
    .fromTo(
      emailFormRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.15'
    )
    // Card swings in from the right
    .fromTo(
      cardRef.current,
      { x: 80, opacity: 0, rotateY: 20, scale: 0.92 },
      { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.7'
    )

    // Floating card idle animation
    gsap.to(cardRef.current, {
      y: -10,
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    })
  }, { scope: sectionRef })

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroEmail.trim()) return
    router.push(`/signup?email=${encodeURIComponent(heroEmail.trim())}`)
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-emerald-950/20 via-background to-background pt-6">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-emerald-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 size-[400px] rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
        {/* ── Left column ── */}
        <div>
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 shadow-sm opacity-0"
          >
            <Sparkles className="size-4 text-amber-500 animate-pulse" />
            {t('tagline')} 🌍
          </span>

          {lang === 'ur' || lang === 'ar' ? (
            <h1
              ref={headingRef}
              className="mt-5 font-urdu text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[2.5] py-4 text-emerald-900 dark:text-emerald-300 overflow-visible text-balance opacity-0"
            >
              {t('heroHeading')}
            </h1>
          ) : (
            <h1
              ref={headingRef}
              className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-foreground opacity-0"
            >
              {t('heroHeading').replace(t('heroHeadingHighlight'), '').trim()}{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">{t('heroHeadingHighlight')}</span>
            </h1>
          )}

          <p ref={descRef} className="mt-4 max-w-lg text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground opacity-0">
            {t('heroDesc')}
          </p>

          {/* CTA buttons */}
          <div ref={buttonsRef} className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href="/create-wish"
              className={buttonVariants({ size: 'lg', className: 'h-14 px-7 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-emerald-950/20 rounded-2xl opacity-0' })}
            >
              <Sparkles className="size-5 text-amber-300" />
              {t('sendWish')}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/create-invitation"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'h-14 px-7 text-base font-bold border-emerald-800/30 hover:bg-emerald-900/10 rounded-2xl opacity-0',
              })}
            >
              <MailOpen className="size-5 text-amber-600" />
              {t('createInvitation')}
            </Link>
          </div>

          {/* ── Inline email signup ── */}
          <div ref={emailFormRef} className="mt-8 opacity-0">
            <p className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {t('orSignUp')}
            </p>
            <form onSubmit={handleEmailSignup} className="flex items-center gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-emerald-800/20 bg-card/80 py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/60 shadow-sm transition-all"
                  aria-label="Email address for sign up"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-3 text-sm font-bold text-white shadow-md active:scale-95 transition-all"
              >
                {t('signUpArrow')} <ArrowRight className="size-3.5" />
              </button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              {t('noCardRequired')} · {t('instantShareableLink')}
            </p>
          </div>
        </div>

        {/* ── Right column — Card preview ── */}
        <div ref={cardRef} className="relative opacity-0">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
          <div className="transition-transform duration-500">
            <WishCard
              watermark
              data={{
                occasionId: 'eid-ul-fitr',
                themeId: 'mughal-gold',
                language: lang,
                senderName: t('heroSampleSender') || 'Ahmed Family',
                recipientName: t('heroSampleRecipient') || 'You & Family',
                message: t('heroSampleMsg') || 'May this blessed Eid bring joy, peace and prosperity to you and your loved ones.',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
