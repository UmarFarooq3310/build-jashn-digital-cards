import Link from 'next/link'
import { ArrowRight, MailOpen, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Pakistan&apos;s first animated card platform
          </span>

          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Beautiful wishes &amp; invitations,{' '}
            <span className="text-primary">made in minutes</span>
          </h1>

          <p className="mt-3 font-urdu text-2xl text-primary">
            ہر خوشی کے لیے ایک خوبصورت پیغام
          </p>

          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Send heartfelt animated wish cards or full event invitations with
            RSVP, live countdowns and maps. Bilingual Urdu &amp; English. Share
            instantly on WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create-wish"
              className={buttonVariants({ size: 'lg', className: 'h-14 text-base' })}
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
                className: 'h-14 text-base',
              })}
            >
              <MailOpen className="size-5" />
              Create Invitation
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · Free forever plan · Instant shareable link
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 blur-2xl" />
          <div className="rotate-2 transition-transform hover:rotate-0">
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
