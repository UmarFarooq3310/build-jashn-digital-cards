'use client'

import Link from 'next/link'
import {
  ArrowRight,
  MousePointerClick,
  PenLine,
  Palette,
  Send,
  Heart,
  Calendar,
  Gift,
  PartyPopper,
  Sparkles,
  Users,
  Moon,
  Flower2,
  Cake,
  Gem,
  CheckCircle,
} from 'lucide-react'
import { JashnIcon } from '@/lib/jashn/icon'
import { OCCASIONS } from '@/lib/jashn/occasions'
import { INVITATION_TYPES } from '@/lib/jashn/invitations'
import { WishCard } from '@/components/jashn/wish-card'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { cn } from '@/lib/utils'

// Sub-component for Section Heading
function SectionHead({
  kicker,
  title,
  desc,
  kickerColor = 'text-primary',
}: {
  kicker: string
  title: string
  desc?: string
  kickerColor?: string
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", kickerColor)}>
        {kicker}
      </p>
      <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {desc}
        </p>
      ) : null}
    </div>
  )
}

// 1. Wedding / Engagement Themed Section (Gold/Maroon Mughal Vibe)
export function WeddingSection() {
  const weddingOccasions = OCCASIONS.filter(
    (o) => o.id === 'shaadi' || o.id === 'nikah' || o.id === 'anniversary'
  )
  
  return (
    <section className="relative overflow-hidden border-t border-[#8e0f24]/20 bg-gradient-to-br from-[#4a0510]/5 via-card to-[#8e0f24]/5 py-20">
      {/* Decorative Floral background SVG */}
      <div className="absolute right-0 top-0 -mr-16 -mt-16 size-64 opacity-10 text-[#8e0f24] pointer-events-none">
        <Flower2 className="w-full h-full" />
      </div>
      <div className="absolute left-0 bottom-0 -ml-16 -mb-16 size-64 opacity-10 text-[#8e0f24] pointer-events-none">
        <Flower2 className="w-full h-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <SectionHead
          kicker="Wedding & Engagement"
          kickerColor="text-[#8e0f24] font-extrabold"
          title="Celebrate Eternal Love & Togetherness"
          desc="Beautiful Mughal-arched Shaadi, Nikkah, Mehndi cards and Anniversary wishes with traditional bilingual greetings."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card creations */}
          {weddingOccasions.map((o) => (
            <Link
              key={o.id}
              href={`/create-wish?occasion=${o.id}`}
              className="group flex flex-col justify-between p-6 rounded-3xl border border-[#8e0f24]/20 bg-card hover:border-[#8e0f24] hover:shadow-[0_20px_40px_-15px_rgba(142,15,36,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#8e0f24]/10 text-[#8e0f24] group-hover:bg-[#8e0f24] group-hover:text-[#fff4e6] transition-colors mb-4">
                  <JashnIcon name={o.icon} className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{o.label} Card</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bilingual greeting cards in English and Urdu script with elegant floral overlays.
                </p>
              </div>
              <span className="mt-6 flex items-center gap-1 text-xs font-bold text-[#8e0f24] hover:underline">
                Create custom card <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
          
          {/* Featured invitation link */}
          <Link
            href="/create-invitation?type=mehndi"
            className="group flex flex-col justify-between p-6 rounded-3xl border-2 border-dashed border-[#e6b54a] bg-gradient-to-br from-[#e6b54a]/5 to-card hover:border-[#8e0f24] transition-all duration-300"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e6b54a]/20 text-[#8e0f24] mb-4">
                <Gem className="size-6 text-[#e6b54a] animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-[#8e0f24] mb-1">Mughal Mehndi & Baraat Invitations</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Create a full multi-day digital invitation website with venue location map pins, dress code guides, and live countdowns.
              </p>
            </div>
            <span className="mt-6 flex items-center gap-1 text-xs font-bold text-[#8e0f24]">
              Build Wedding Invitation <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// 2. Birthdays Section (Fun / Playful / Vibrant Balloon Vibe)
export function BirthdaysSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#0d1b4c]/10 bg-gradient-to-br from-[#0d1b4c]/5 via-card to-[#1a237e]/5 py-20">
      {/* Star twinkling decoration or neon glows */}
      <div className="absolute right-10 bottom-10 size-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute left-10 top-10 size-72 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
            Saalgirah Mubarak
          </p>
          <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Vibrant Animated Birthday Greetings
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Send sweet, colorful birthday wishes to your friends, family, and loved ones with animated cake candles and playful sparkles.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-card rounded-[2.5rem] border border-indigo-100 p-8 md:p-12 shadow-xl">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Cake className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-foreground">Customizable Saalgirah Cards</h3>
                <p className="text-xs text-muted-foreground">Select a playful midnight theme and add recipient details.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Our birthday greeting template contains Urdu script (&ldquo;سالگرہ مبارک&rdquo;) with sweet customizable messages. Every card includes a custom music-box birthday chime when opened!
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/create-wish?occasion=birthday"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-[#5fb6e6] px-6 font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-600/20"
              >
                Send Birthday Wish <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/create-invitation?type=birthday"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Create Party Invitation
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 max-w-sm flex justify-center">
            {/* Visual preview of birthday card */}
            <div className="w-full rotate-2 transform hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-3xl overflow-hidden border border-indigo-100">
              <WishCard
                watermark={false}
                data={{
                  occasionId: 'birthday',
                  themeId: 'midnight-kashi',
                  language: 'both',
                  senderName: 'Sajid',
                  recipientName: 'Zainab',
                  message: 'May Allah bless you with a year of immense success and happiness!',
                  messageUrdu: 'سالگرہ مبارک ہو! اللہ آپ کو ڈھیروں خوشیاں نصیب فرمائے۔',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 3. Friendship Section (Cozy / Sunset / Hand-heart Vibe)
export function FriendshipSection() {
  const friendshipOccasions = OCCASIONS.filter(
    (o) => o.id === 'friendship-day' || o.id === 'miss-you' || o.id === 'thank-you'
  )

  return (
    <section className="relative border-t border-rose-100 bg-gradient-to-br from-rose-50/70 via-peach-50/40 to-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker="Dosti Mubarak"
          kickerColor="text-rose-500 font-extrabold"
          title="Strengthen Your Bonds of Friendship"
          desc="Show gratitude, say thank you, tell them they are missed, or celebrate Friendship Day with personalized heart warming notes."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {friendshipOccasions.map((o) => (
            <Link
              key={o.id}
              href={`/create-wish?occasion=${o.id}`}
              className="group relative overflow-hidden rounded-3xl border border-rose-100/80 bg-card p-6 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <JashnIcon name={o.icon} className="size-5" />
                </div>
                <Heart className="size-4 text-rose-200 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-300" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{o.label} Card</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Send warm, heartfelt vibes with a clean, short shareable link instantly.
              </p>
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-rose-500">
                Write a note <ArrowRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// 4. Invitations Section (Emerald / Sophisticated Wedding / Events Countdowns)
export function InvitationsSection() {
  return (
    <section className="relative overflow-hidden border-t border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-[#08300c]/5 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          kicker="Desi Event Coordinator"
          kickerColor="text-emerald-700 font-bold"
          title="Digital Invitations with Live RSVPs"
          desc="Perfect for Wedding, Mehndi, Baraat, Walima, Nikkah, Birthday Parties, and family events. Everything coordinates in one elegant dashboard."
        />

        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Sample Invitation preview */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm shadow-xl rounded-3xl -rotate-1 transform hover:rotate-0 transition-transform duration-500">
              <InvitationCard
                watermark={false}
                showCountdown={true}
                data={{
                  typeId: 'mehndi',
                  title: 'Mehndi Night',
                  hostNames: 'The Malik Family',
                  groom: 'Zaryab',
                  bride: 'Rida',
                  date: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 10), // 12 days in future
                  time: '8:00 PM',
                  venue: 'Pearl Continental Lawn',
                  city: 'Rawalpindi',
                  dressCode: 'Bright Yellows & Greens',
                  notes: 'Traditional dholki and delicious food setup.',
                  themeId: 'emerald-classic',
                }}
              />
            </div>
          </div>

          {/* Feature list */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl font-extrabold text-foreground leading-tight">
              One link, all the details your guests need.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No more printing expensive paper cards. Share your custom invitation link on WhatsApp. Guests can confirm attendance with one-click, see Google Map directions, and watch the live wedding countdown!
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {[
                'WhatsApp RSVP confirmations',
                'Google Maps integration',
                'Live event countdown timers',
                'Dress code & family notes',
                'Secure host dashboard control',
                'Premium animates & background audio',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/create-invitation"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/10"
              >
                Create Event Invitation <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                View Host Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 5. Celebration Events Section (Elegant Golden Vibe)
export function CelebrationEventsSection() {
  const celebrationOccasions = OCCASIONS.filter(
    (o) =>
      o.category === 'Islamic' ||
      o.category === 'Achievements' ||
      o.id === 'graduation' ||
      o.id === 'new-year' ||
      o.id === 'independence-day'
  ).slice(0, 8)

  return (
    <section className="relative overflow-hidden border-t border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-card to-amber-600/5 py-20">
      {/* Decorative stars */}
      <div className="absolute top-10 left-1/4 size-1 bg-amber-500 rounded-full opacity-10 animate-ping" />
      <div className="absolute bottom-16 right-1/4 size-1.5 bg-amber-400 rounded-full opacity-20 animate-pulse" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Jashn &amp; Achievements
          </p>
          <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Celebrate Festivals &amp; Milestones
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground text-sm">
            Congratulate career promotions, graduations, business launches, or send blessings on Eid, Ramadan, and Independence Day.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {celebrationOccasions.map((o) => (
            <Link
              key={o.id}
              href={`/create-wish?occasion=${o.id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-amber-100 bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 hover:bg-amber-500/5"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 transition-all group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white">
                <JashnIcon name={o.icon} className="size-5" />
              </span>
              <div>
                <span className="text-xs font-bold text-foreground leading-tight block">
                  {o.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  {o.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:underline"
          >
            Explore all celebration themes <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---------------------------
// RETAINED ORIGINAL SECTIONS: HowItWorks, SampleCards, HomeCTA
// ---------------------------

const STEPS = [
  { icon: MousePointerClick, title: 'Pick occasion or event', desc: 'Choose from 30+ wishes or 20+ invitation types.' },
  { icon: PenLine, title: 'Add your details', desc: 'Write a message or fill in event info — in Urdu, English or both.' },
  { icon: Palette, title: 'Choose a theme', desc: 'Select from free and premium animated Pakistani designs.' },
  { icon: Send, title: 'Share the link', desc: 'Send instantly on WhatsApp, Instagram or copy the link.' },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead kicker="How it works" title="Live in four simple steps" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="absolute right-4 top-4 text-4xl font-extrabold text-primary/10">
                {i + 1}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SampleCards() {
  return (
    <section className="border-t border-border bg-secondary/10">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead
          kicker="Sample designs"
          title="Animated, bilingual, unmistakably desi"
          desc="Deep jewel tones, Mughal arches, mehndi borders, shimmering calligraphy and floating petals."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <WishCard
            watermark
            data={{
              occasionId: 'shaadi',
              themeId: 'pink-zardozi',
              language: 'both',
              senderName: 'The Khan Family',
              message: 'Wishing the happy couple a lifetime of love and togetherness.',
              messageUrdu: 'اللہ جوڑے کو ہمیشہ خوش رکھے۔',
            }}
          />
          <InvitationCard
            watermark
            showCountdown={false}
            data={{
              typeId: 'mehndi',
              title: 'Mehndi Night',
              hostNames: 'The Malik Family',
              groom: 'Hamza',
              bride: 'Ayesha',
              date: '2026-12-20',
              time: '7:00 PM',
              venue: 'Royal Palm',
              city: 'Lahore',
              dressCode: 'Yellow & Green',
              notes: 'Dholki and dinner to follow.',
              themeId: 'emerald-classic',
            }}
          />
          <WishCard
            watermark
            data={{
              occasionId: 'birthday',
              themeId: 'midnight-kashi',
              language: 'both',
              senderName: 'Bilal',
              recipientName: 'Sana',
              message: 'May Allah bless you with health and happiness always. Happy Birthday!',
              messageUrdu: 'سالگرہ مبارک ہو! اللہ آپ کو لمبی عمر عطا فرمائے۔',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export function HomeCTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Ready to spread some joy?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
          Create your first animated wish or invitation for free. No sign-up
          needed to start.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/create-wish"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Send a Wish <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/create-invitation"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-7 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/70"
          >
            Create Invitation
          </Link>
        </div>
      </div>
    </section>
  )
}
