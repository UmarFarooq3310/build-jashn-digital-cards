'use client'
import Link from 'next/link'
import { Heart, Globe, Sparkles, ShieldCheck, Zap, Users, Mail, MessageSquare, MapPin, ArrowRight, Star } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const aboutJsonLd = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Cardzy',
  url: 'https://cardzy.online', logo: 'https://cardzy.online/favicon.svg',
  description: 'Cardzy is a global digital celebration platform for animated wish cards and event invitations, supporting 18 languages and serving users in 60+ countries.',
  foundingLocation: 'Islamabad, Pakistan',
  sameAs: ['https://www.instagram.com/cardzyonline','https://www.tiktok.com/@cardzyonline','https://www.facebook.com/share/1bPTaFnxDz/'],
}

export default function AboutPage() {
  const { t } = useLang()

  const products = [
    { icon: <Sparkles className="size-6" />, bg: 'bg-emerald-100 text-emerald-700', title: 'Animated Wish Cards', body: 'Create personalised, 3D-animated digital greeting cards for Eid Mubarak, birthdays, anniversaries, Ramadan, graduations, and 35+ other occasions. Add a photo, custom message, name, and background music. Share instantly via a link — no app required.' },
    { icon: <Heart className="size-6" />, bg: 'bg-amber-100 text-amber-700', title: 'Digital Event Invitations', body: 'Build a full animated invitation website for your Nikkah, Mehndi, Barat, Walima, Birthday Party, or any event. Includes live RSVP tracking, Google Maps venue pin, WhatsApp one-tap RSVP, countdown timer, and a shareable link you can blast to 200+ family members instantly.' },
    { icon: <ShieldCheck className="size-6" />, bg: 'bg-blue-100 text-blue-700', title: 'Digital Visiting Cards', body: 'Create a smart digital business card (vCard) for doctors, lawyers, executives, real estate agents, and entrepreneurs. Share via QR code or link. Recipients save your full contact details with one tap — always up to date, zero printing cost.' },
  ]

  const values = [
    [<Globe key="g" className="size-5" />, '18 Languages — Including Urdu & Arabic', "Cardzy is the only digital card platform with native Urdu Nastaliq script, Arabic, and 16 other world languages. Create a bilingual Urdu-English Nikkah invitation that both your London relatives and your Lahore elders can read beautifully."],
    [<Zap key="z" className="size-5" />, 'Instant — No Printing, No Courier', "Your card is live the moment you click create. Share it in any WhatsApp group, Instagram Story, or SMS. No 2-week print wait, no Rs. 40,000 printing bill, no cards stuck in courier delays before the wedding."],
    [<Users key="u" className="size-5" />, 'Real-Time RSVP & Guest Management', "Track exactly who has confirmed attendance for your event. Export the full guest list to CSV. The WhatsApp RSVP button increases response rates dramatically compared to phone-call follow-ups."],
    [<Star key="s" className="size-5" />, 'South Asian Cultural Authenticity', "Cardzy is designed with Pakistani and South Asian celebrations at its heart — Mehndi themes, Islamic geometric patterns, Bismillah calligraphy openers, dholki music tracks, and occasion categories covering every function from Mangni to Walima."],
    [<ShieldCheck key="sc" className="size-5" />, 'Free to Start, Genuinely', "No credit card. No trial period. Cardzy's free plan lets you create unlimited wish cards with classic themes. Upgrade only when you need premium animations or watermark removal."],
    [<Sparkles key="sp" className="size-5" />, 'Global Reach for Diaspora Families', "Pakistani, Indian, and Bangladeshi diaspora families are spread across the UK, USA, UAE, Canada, and Australia. Cardzy cards work perfectly across time zones — your Eid card reaches your relative in Manchester the same second you create it in Karachi."],
  ]

  const whoWeServe = [
    'Pakistani families celebrating Eid ul Fitr, Eid ul Adha, and national holidays',
    'Couples planning Nikkah, Mehndi, Barat, and Walima functions in Pakistan and abroad',
    'Muslim families marking Ramadan, Quran Khatam, Hajj, and Umrah milestones',
    'Pakistani, Indian, and Bangladeshi diaspora families in the UK, USA, UAE, and Canada',
    'Business executives and doctors needing professional digital visiting cards',
    'Wedding planners and event managers handling multiple client events',
    'School and university students celebrating graduation and exam results',
    'Corporate teams sending New Year, Eid, and company milestone cards',
    'Real estate agents and lawyers sharing smart digital business cards via QR',
    'NGOs and community organisations managing event invitations and RSVPs',
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-6">
              <Heart className="size-4" /> {t('aboutBadge')}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              {t('aboutH1')}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-emerald-100/80">
              Cardzy is a global digital celebration platform bringing loved ones together through interactive, multi-lingual animated wish cards and professional event invitations. Born in Pakistan. Built for the world.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('aboutWelcome')}</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Cardzy is a modern digital wish card and event invitation platform created for South Asian families, diaspora communities, and anyone who believes that celebrations deserve more than a plain text message. We combine rich animated design, multilingual text support, and practical event management tools — all in one place, accessible from any smartphone or computer.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              The idea for Cardzy was born from a simple frustration: sending an Eid Mubarak WhatsApp message to a hundred relatives felt impersonal, but printing and couriering physical cards was expensive, slow, and wasteful. Cardzy is the solution — as warm and personal as a handwritten card but as instant and effortless as a text message.
            </p>
            <div className="rounded-3xl border border-border bg-card p-7 space-y-4">
              <h3 className="text-xl font-extrabold text-foreground">{t('aboutProblem')}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Traditional paper greeting cards are expensive (a single Pakistani wedding invitation printing run can cost Rs. 20,000–80,000), take days to produce, cannot be updated once printed, and are impossible to share across WhatsApp family groups or with overseas relatives in real time. Generic Western card sites offer no Urdu script support, no South Asian occasion categories, and no Pakistani payment options. Cardzy was built to fill this gap.
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="bg-muted/40 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('aboutWhatOffer')}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <div className={`flex size-12 items-center justify-center rounded-2xl ${p.bg}`}>{p.icon}</div>
                  <h3 className="font-extrabold text-foreground">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-center">{t('aboutWhyChoose')}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map(([icon, title, body]) => (
                <div key={title as string} className="rounded-2xl border border-border bg-card p-5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700">{icon}<h3 className="font-bold text-foreground text-sm">{title as string}</h3></div>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{body as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="bg-muted/40 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('aboutWhoServe')}</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              {whoWeServe.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-center">{t('aboutValues')}</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                ['Authenticity','We honour South Asian culture, Islamic traditions, and the emotional weight of family celebrations. Every design decision is made with cultural respect.'],
                ['Simplicity','Creating a card should take two minutes, not two hours. We remove every unnecessary step so you can focus on the message, not the software.'],
                ['Accessibility','Cardzy is free to start and available in 18 languages. Beautiful digital celebrations should be accessible to every family, regardless of budget.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-6 text-center space-y-2">
                  <h3 className="font-extrabold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HQ & Contact */}
        <section className="bg-muted/40 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('aboutHQ')}</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
                <MapPin className="size-5 text-emerald-700" />
                <h3 className="font-bold text-foreground text-sm">Location</h3>
                <p className="text-sm text-muted-foreground">Islamabad / Rawalpindi, Pakistan</p>
              </div>
              <a href="mailto:cardzyonline@gmail.com" className="group rounded-2xl border border-border bg-card p-5 space-y-2 hover:border-emerald-500/50 transition-all">
                <Mail className="size-5 text-emerald-700" />
                <h3 className="font-bold text-foreground text-sm group-hover:text-emerald-700 transition-colors">Email</h3>
                <p className="text-sm text-muted-foreground">cardzyonline@gmail.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </a>
              <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-border bg-card p-5 space-y-2 hover:border-emerald-500/50 transition-all">
                <MessageSquare className="size-5 text-emerald-700" />
                <h3 className="font-bold text-foreground text-sm group-hover:text-emerald-700 transition-colors">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">+92 309 3518796</p>
                <p className="text-xs text-muted-foreground">Usually responds within hours</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 text-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t('aboutReady')}</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Join thousands of families and professionals who use Cardzy to celebrate, connect, and communicate in style — for free.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/create-wish" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-7 py-3.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors shadow-md">
                <Sparkles className="size-4" />{t('createWishCard')}<ArrowRight className="size-4" />
              </Link>
              <Link href="/create-invitation" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-800/30 px-7 py-3.5 text-sm font-bold text-foreground hover:bg-muted transition-colors">
                {t('createInvitation')}
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-7 py-3.5 text-sm font-bold text-foreground hover:bg-muted transition-colors">
                {t('contactPageBadge')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
