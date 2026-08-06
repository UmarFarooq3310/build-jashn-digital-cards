'use client'

import { Star, Award } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export function SocialProofSection() {
  const { t } = useLang()

  return (
    <section className="py-12 bg-gradient-to-b from-background via-emerald-500/[0.03] to-background border-y border-border/50">
      <div className="mx-auto max-w-6xl px-4 space-y-10 text-center">
        {/* Top Badges Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
            <Award className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('trustedPlatformBadge') || 'Trusted Digital Greetings Platform 🌟'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t('lovedBySendersTitle') || 'Loved by Senders Across 60+ Countries Worldwide'}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            {t('lovedBySendersSub') || 'From birthdays and Nikah invitations to custom greeting cards, see why senders across the world choose Cardzy.'}
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '60+', label: t('globalCountriesLabel') || 'Global Countries', sub: t('sendersWorldwideSub') || 'Senders across 60+ nations' },
            { metric: '18', label: t('languagesSupportedLabel') || 'Languages Supported', sub: t('languagesSub') || 'Urdu, Arabic, English & more' },
            { metric: '100%', label: t('mobileOptimizedLabel') || 'Mobile & Desktop', sub: t('instantWebAccessSub') || 'Instant web browser access' },
            { metric: 'Free', label: t('freeCreationLabel') || 'Free Creation', sub: t('zeroCreditCardRequired') || 'Zero credit card required' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border/70 bg-card p-5 shadow-xs text-center space-y-1 hover:border-emerald-500/40 transition-all"
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
          {[
            {
              name: t('rev1Name') || 'Fatima & Tariq',
              role: t('rev1Role') || 'Nikah & Shaadi Host',
              comment: t('rev1Comment') || 'Cardzy saved our wedding invitation! We created a 3D Nikah card in 2 minutes and tracked 250+ WhatsApp RSVPs effortlessly.',
              stars: 5,
            },
            {
              name: t('rev2Name') || 'Zain (ProGamer_X)',
              role: t('rev2Role') || 'PUBG Tournament Winner',
              comment: t('rev2Comment') || 'The PUBG Victory Winner cards are unreal! Sent my squad chicken dinner card and everyone on Discord asked how I made it.',
              stars: 5,
            },
            {
              name: t('rev3Name') || 'Amina R.',
              role: t('rev3Role') || 'Birthday & Family Wish Sender',
              comment: t('rev3Comment') || 'Loved the Urdu script and background audio! My grandmother was moved to tears by the birthday card melody.',
              stars: 5,
            },
          ].map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-foreground italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-border/50">
                <div className="font-extrabold text-xs text-foreground">{rev.name}</div>
                <div className="text-[10px] text-muted-foreground">{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
