'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, MailOpen, Sparkles, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const urduRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const emailFormRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
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
    // Urdu text slides from left
    .fromTo(
      urduRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
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
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 size-[400px] rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        {/* ── Left column ── */}
        <div>
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground opacity-0"
          >
            <Sparkles className="size-3.5 text-primary" />
            Pakistan&apos;s first animated card platform
          </span>

          <h1
            ref={headingRef}
            className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl opacity-0"
          >
            Beautiful wishes &amp; invitations,{' '}
            <span className="text-primary">made in minutes</span>
          </h1>

          <p ref={urduRef} className="mt-3 font-urdu text-2xl text-primary opacity-0">
            ہر خوشی کے لیے ایک خوبصورت پیغام
          </p>

          <p ref={descRef} className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground opacity-0">
            Send heartfelt animated wish cards or full event invitations with
            RSVP, live countdowns and maps. Bilingual Urdu &amp; English. Share
            instantly on WhatsApp.
          </p>

          {/* CTA buttons */}
          <div ref={buttonsRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create-wish"
              className={buttonVariants({ size: 'lg', className: 'h-14 text-base opacity-0' })}
            >
              <Sparkles className="size-5" />
              Send a Wish
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/create-invitation"
              className={buttonVariants({
                size: 'lg',
                variant: 'secondary',
                className: 'h-14 text-base opacity-0',
              })}
            >
              <MailOpen className="size-5" />
              Create Invitation
            </Link>
          </div>

          {/* ── Inline email signup ── */}
          <div ref={emailFormRef} className="mt-6 opacity-0">
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Or sign up free with your email
            </p>
            <form onSubmit={handleEmailSignup} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  aria-label="Email address for sign up"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
              >
                Sign Up <ArrowRight className="size-3.5" />
              </button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              No credit card required · Free forever plan · Instant shareable link
            </p>
          </div>
        </div>

        {/* ── Right column — Card preview ── */}
        <div ref={cardRef} className="relative opacity-0">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 blur-2xl" />
          <div className="rotate-2 transition-transform hover:rotate-0 duration-500">
            <WishCard
              watermark
              data={{
                occasionId: 'eid-ul-fitr',
                themeId: 'mughal-gold',
                language: 'both',
                senderName: 'Ahmed Family',
                recipientName: 'You',
                message:
                  'May this blessed Eid bring joy, peace and prosperity to you and your loved ones.',
                messageUrdu: 'اللہ یہ مبارک دن آپ کے لیے خوشیوں کا باعث بنائے۔',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
