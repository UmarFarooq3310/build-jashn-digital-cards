'use client'

import Link from 'next/link'
import { Star, Award } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export function SocialProofSection() {
  const { t } = useLang()

  const reviews = [
    {
      name: t('rev1Name') || 'Fatima & Tariq',
      role: t('rev1Role') || 'Nikah & Shaadi Host',
      comment: t('rev1Comment') || 'Cardzy saved our wedding invitation! We created a 3D Nikah card in 2 minutes and tracked 250+ WhatsApp RSVPs effortlessly.',
      stars: 5,
      color: 'emerald',
    },
    {
      name: t('rev2Name') || 'Zain (ProGamer_X)',
      role: t('rev2Role') || 'PUBG Tournament Winner',
      comment: t('rev2Comment') || 'The PUBG Victory Winner cards are unreal! Sent my squad chicken dinner card and everyone on Discord asked how I made it.',
      stars: 5,
      color: 'amber',
    },
    {
      name: t('rev3Name') || 'Amina R.',
      role: t('rev3Role') || 'Birthday & Family Wish Sender',
      comment: t('rev3Comment') || 'Loved the Urdu script and background audio! My grandmother was moved to tears by the birthday card melody.',
      stars: 5,
      color: 'rose',
    },
  ]

  const avatarColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
  }

  const borderAccents: Record<string, string> = {
    emerald: 'border-t-emerald-500',
    amber: 'border-t-amber-500',
    rose: 'border-t-rose-500',
  }

  return (
    <section className="py-12 bg-gradient-to-b from-background via-emerald-500/[0.04] to-background border-y border-border/50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 space-y-10 text-center relative z-10">
        {/* Top Badges Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
            <Award className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('trustedPlatformBadge') || 'Trusted Digital Greetings Platform 🌟'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t('lovedBySendersTitle') || 'Loved by Senders Across 60+ Countries Worldwide'}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            {t('lovedBySendersSub') || 'From birthdays and Nikah invitations to custom greeting cards, see why senders across the world choose Cardzy.'}{' '}
            <Link href="/about" className="text-emerald-600 dark:text-emerald-400 underline font-semibold hover:opacity-80">
              Read about our mission
            </Link>
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '60+', label: t('globalCountriesLabel') || 'Global Countries', sub: t('sendersWorldwideSub') || 'Senders across 60+ nations', accent: 'border-t-emerald-500' },
            { metric: '18', label: t('languagesSupportedLabel') || 'Languages Supported', sub: t('languagesSub') || 'Urdu, Arabic, English & more', accent: 'border-t-teal-500' },
            { metric: '100%', label: t('mobileOptimizedLabel') || 'Mobile & Desktop', sub: t('instantWebAccessSub') || 'Instant web browser access', accent: 'border-t-amber-500' },
            { metric: 'Free', label: t('freeCreationLabel') || 'Free Creation', sub: t('zeroCreditCardRequired') || 'Zero credit card required', accent: 'border-t-violet-500' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border border-border/70 border-t-2 ${item.accent} bg-card/80 backdrop-blur-sm p-5 shadow-xs text-center space-y-1 hover:border-emerald-500/40 hover:scale-[1.03] hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                {item.metric}
              </div>
              <div className="text-xs font-bold text-foreground">{item.label}</div>
              <div className="text-[10px] text-muted-foreground">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Real User Reviews Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border border-border/80 border-t-2 ${borderAccents[rev.color]} bg-card/80 backdrop-blur-sm p-6 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow duration-300`}
            >
              <div className="space-y-2">
                {/* Decorative quote mark */}
                <span className="block text-4xl leading-none font-serif text-emerald-500/10 select-none">&ldquo;</span>
                <div className="flex items-center gap-1 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-foreground italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center gap-3">
                {/* Avatar initial */}
                <div className={`flex size-8 items-center justify-center rounded-full text-xs font-extrabold border ${avatarColors[rev.color]}`}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-foreground">{rev.name}</div>
                  <div className="text-[10px] text-muted-foreground">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
