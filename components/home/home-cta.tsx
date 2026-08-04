'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/lang/context'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HomeCTA() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    const timer = setTimeout(() => {
      gsap.fromTo(el.querySelectorAll('.cta-item'), { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="border-t border-teal-500/20 bg-gradient-to-br from-teal-600 to-teal-900 text-[#f5f3ff] py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f5f3ff_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-4 py-8 text-center relative z-10 space-y-6">
        <h2 className="cta-item text-balance text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
          {t('spreadJoy')}
        </h2>
        <p className="cta-item mx-auto mt-2 max-w-md text-pretty text-amber-100/80 text-sm sm:text-base leading-relaxed">
          {t('spreadJoyDesc')}
        </p>
        
        {/* Main CTA pair */}
        <div className="cta-item mt-8 flex flex-col justify-center gap-3 sm:flex-row max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/create-wish"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 text-sm font-bold text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/25"
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
