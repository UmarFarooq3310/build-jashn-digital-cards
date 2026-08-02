import { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, MessageSquare, Mail, ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Contact2, Tag, HelpCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ConciergeService } from '@/components/home/concierge-service'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Order Global Digital Cards, Invitations & Visiting Cards | Cardzy Concierge',
  description: 'Send your event, wish, or digital visiting card details directly via WhatsApp or Email and our team will craft your custom animated card with live link in minutes.',
}

export default function CustomOrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_60%)] bg-gradient-to-b from-emerald-950/20 via-background to-background pt-10 pb-6 px-4">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
                <Sparkles className="size-4 text-amber-500 animate-pulse" />
                Global Digital Cards Concierge Service 📲
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 shadow-sm">
                <Globe className="size-3.5 text-amber-500" />
                English, Urdu & 18 Languages
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Let Us Create Your Custom Card &{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                Send You The Live Link
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
              Don&apos;t want to design yourself? Simply fill out the simple form below or message us directly on WhatsApp or Email. We craft <strong>Wish Cards</strong>, <strong>Event Invitations</strong>, and <strong>Digital Visiting Cards</strong> — no design skills needed!
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <Zap className="size-3.5 text-amber-500" />
                <span>Ready in Minutes</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <Contact2 className="size-3.5 text-teal-500" />
                <span>Digital Visiting Cards</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>18 Global Languages</span>
              </div>
            </div>

            {/* Navigation links to Pricing & FAQs */}
            <div className="flex justify-center items-center gap-4 pt-2 text-sm font-semibold">
              <Link href="/pricing" className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <Tag className="size-4 text-amber-500" />
                <span>View Transparent Pricing Plans →</span>
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/faq" className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <HelpCircle className="size-4 text-amber-500" />
                <span>Browse FAQs →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Concierge Form & Action Component */}
        <div className="px-4">
          <ConciergeService />
        </div>

        {/* FAQ & Self-service Section */}
        <section className="py-12 px-4 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-muted-foreground text-sm">
              Everything you need to know about our global digital card custom creation service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-base text-foreground">
                Which Card Types can I request?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can request <strong>Wish & Greeting Cards</strong> (Birthday, Eid, Anniversary, Friendship), <strong>Event Invitations</strong> (Wedding, Nikah, Birthday Party with RSVP & Google Maps), or <strong>Digital Visiting Cards</strong> (.vcf contact card).
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-base text-foreground">
                Is English, Urdu & Global Language supported?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes! We support 18 global languages including English, Urdu (نستعلیق), Arabic, Spanish, French, Hindi, and more. Send us your text in any language!
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-base text-foreground">
                How fast will I receive my live link?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Usually within minutes! Once we receive your text/details on WhatsApp or Email, our team generates your live link and sends it directly to your chat.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-base text-foreground">
                Where can I check Pricing & Plans?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our custom card concierge service is free to try! You can also check our full <Link href="/pricing" className="text-emerald-600 dark:text-emerald-400 font-bold underline">Pricing Page</Link> for premium invitation features & custom domains.
              </p>
            </div>
          </div>

          {/* Self-service Builder Links */}
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/10 via-teal-950/10 to-amber-950/10 p-6 text-center space-y-4">
            <h3 className="font-extrabold text-lg text-foreground">
              Want to try designing your card yourself?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/create-wish"
                className={buttonVariants({ size: 'lg', className: 'rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white' })}
              >
                <Sparkles className="size-4" />
                <span>Create Wish Card</span>
              </Link>
              <Link
                href="/create-invitation"
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-xl font-bold border-emerald-800/30' })}
              >
                <span>Create Event Invitation</span>
              </Link>
              <Link
                href="/create-visiting-card"
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-xl font-bold border-teal-800/30' })}
              >
                <Contact2 className="size-4 text-teal-500" />
                <span>Digital Visiting Cards</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
