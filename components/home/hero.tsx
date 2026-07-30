import Link from 'next/link'
import { ArrowRight, MailOpen, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'
import { HeroEmailForm } from './hero-email-form'

export function Hero() {
  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(4,120,87,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_50%)] bg-gradient-to-b from-emerald-950/20 via-background to-background pt-6"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
        {/* ── Left column ── */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 shadow-sm"
          >
            <Sparkles className="size-4 text-amber-500 animate-pulse" />
            Global Digital Cards & Event Invitations 🌍
          </span>

          <h1
            className="mt-5 text-balance font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground"
          >
            Beautiful wishes & invitations,{' '}
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              made in minutes
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
            Create animated digital wish cards and event websites for Eid, weddings, birthdays & celebrations with live RSVP & 18 languages.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href="/create-wish"
              className={buttonVariants({ size: 'lg', className: 'h-14 px-7 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-emerald-950/20 rounded-2xl' })}
            >
              <Sparkles className="size-5 text-amber-300" />
              Send a Wish
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/create-invitation"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'h-14 px-7 text-base font-bold border-emerald-800/30 hover:bg-emerald-900/10 rounded-2xl',
              })}
            >
              <MailOpen className="size-5 text-amber-600" />
              Create Invitation
            </Link>
          </div>

          {/* ── Inline email signup ── */}
          <HeroEmailForm />
        </div>

        {/* ── Right column — Card preview ── */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
          <div className="w-full transition-transform duration-500">
            <WishCard
              watermark
              data={{
                occasionId: 'eid-ul-fitr',
                themeId: 'mughal-gold',
                language: 'en',
                senderName: 'Ahmed Family',
                recipientName: 'You & Family',
                message: 'May this blessed Eid bring joy, peace and prosperity to you and your loved ones.',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
