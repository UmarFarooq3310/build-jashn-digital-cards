'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Clock, Calendar, Smartphone, MapPin, Music } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export default function WeddingGuidePage() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          
          {/* Back button */}
          <Link
            href="/guide"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> {t('backToGuides') || 'Back to Guides'}
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-10">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                {t('catWedding') || 'Weddings'}
              </span>
              <h1 className={cn(
                "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight",
                isUrdu && "font-urdu leading-relaxed py-2 text-2xl sm:text-3xl"
              )}>
                {lang === 'ur' ? 'مکمل ڈیجیٹل شادی کا دعوت نامہ کیسے بنائیں: الفاظ اور طریقے' : 'How to Design the Perfect Pakistani Wedding Invitation: Wording & Etiquette'}
              </h1>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/60 py-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" /> {lang === 'ur' ? 'شائع شدہ: 10 جولائی 2026' : 'Published July 10, 2026'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" /> 6 {t('minRead') || 'min read'}
                </span>
                <span>{t('editorialTeam') || 'By Cardzy Editorial Team'}</span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">
              
              <p>
                In Pakistan, wedding planning is a vibrant journey filled with tradition, colors, and multiple grand events. Historically, printing and distributing hundreds of physical cards was a heavy logistics task, taking weeks and eating up a huge chunk of the wedding budget. 
              </p>
              <p>
                Today, <strong>digital wedding invitations</strong> are revolutionizing how Pakistani couples invite guests. They are environmentally friendly, cost-effective, and provide interactive features like instant RSVP collection, Google Maps directions, and ambient background music.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                1. The Anatomy of a Pakistani Wedding Invite
              </h2>
              <p>
                Unlike western cards which are single-day affairs, a Pakistani wedding card typically covers multiple functions—chiefly the <strong>Mehndi/Mayun</strong>, the <strong>Baraat (Shaadi)</strong>, and the <strong>Valima</strong>. When building a digital invitation page, make sure the following details are present and clearly structured:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Host Names:</strong> Historically prefixed with traditional blessings, showing who is hosting the event (often the bride&apos;s parents for Baraat, and the groom&apos;s parents for Valima).</li>
                <li><strong>Bilingual Greetings:</strong> A traditional Islamic opening in Urdu calligraphy (like Bismillah-ir-Rahman-ir-Rahim) followed by English details.</li>
                <li><strong>Event Timings:</strong> In Pakistan, it is crucial to state both the arrival time and the dinner/nikah time (e.g. &quot;Guests arrival: 7:00 PM, Baraat Arrival: 8:00 PM&quot;).</li>
                <li><strong>Dress Code Guidelines:</strong> Helping guests match the vibe (e.g. festive yellows/greens for Mehndi, formals or traditional sherwanis/lehengas for Shaadi).</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                2. Traditional Wording Templates (English & Urdu)
              </h2>
              <p>
                Here are a few popular wording layouts you can drop directly into your Cardzy digital invitation setup:
              </p>

              {/* Boxed template: Mehndi */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm my-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Mehndi / Dholki Template
                </span>
                <p className="font-semibold text-foreground text-sm">English Wording:</p>
                <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                  &quot;The Khan Family cordially invites you to join us for an evening of music, henna, and dance as we celebrate the Mehndi Ceremony of their beloved son, Hamza. Let&apos;s beat the dhol and dance the night away!&quot;
                </p>
                <p className="font-semibold text-foreground text-sm mt-3">Urdu Calligraphy Wording:</p>
                <p className="text-sm font-urdu text-primary text-right leading-relaxed">
                  ہمزہ کی مہندی کی رنگا رنگ تقریب میں ہم آپ کو دل کی گہرائیوں سے خوش آمدید کہتے ہیں۔ آئیں اور اس خوشی کے موقع پر ہماری خوشیوں کو دوبالا کریں۔
                </p>
              </div>

              {/* Boxed template: Baraat */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm my-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded">
                  Baraat / Shaadi Template
                </span>
                <p className="font-semibold text-foreground text-sm">English Wording:</p>
                <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                  &quot;With the blessings of Allah Subhana Wa Ta&apos;ala, Mr. & Mrs. Tariq Mahmood request the honor of your presence at the Wedding Reception (Baraat) of their daughter, Ayesha, with Hamza (Son of Mr. & Mrs. Jamil Khan).&quot;
                </p>
                <p className="font-semibold text-foreground text-sm mt-3">Urdu Calligraphy Wording:</p>
                <p className="text-sm font-urdu text-primary text-right leading-relaxed">
                  اللہ تعالیٰ کے فضل و کرم سے، ہم آپ کو اپنی بیٹی عائشہ اور ہمزہ کے رشتہ ازدواج میں منسلک ہونے کی خوشی میں شرکت کی دعوت دیتے ہیں۔
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                3. Elevating the Invitation with Modern Features
              </h2>
              <p>
                A digital invitation is much more than a static JPEG shared on WhatsApp. By leveraging the interactive features built into platforms like Cardzy, you make guest coordination extremely simple:
              </p>
              
              <div className="grid gap-6 sm:grid-cols-3 my-6">
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <MapPin className="size-6 text-primary mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">Google Maps</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Direct routing links to venues like Royal Palm or Marquee halls.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <Smartphone className="size-6 text-primary mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">Online RSVP</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Guests register their attendance instantly, saving caterer costs.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <Music className="size-6 text-primary mx-auto mb-2" />
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">Traditional Audio</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Autoplay soft instrumentals or traditional dholki beats.
                  </p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
                4. Etiquette When Sharing on WhatsApp
              </h2>
              <p>
                When sending your Cardzy link, avoid bulk spamming. Personalize your WhatsApp message:
              </p>
              <blockquote>
                <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-1">
                  &quot;Assalamu Alaikum Uncle, we are thrilled to invite you to Hamza&apos;s wedding. Please find our interactive invitation card with dates, map links, and RSVP RSVP details here: [Your Cardzy Link]. Looking forward to having you!&quot;
                </p>
              </blockquote>

            </div>

            {/* Article Footer / CTA */}
            <footer className="mt-12 border-t border-border/80 pt-8 text-center">
              <h3 className={cn("text-xl font-bold text-foreground", isUrdu && "font-urdu py-1")}>
                {t('launchInviteTitle') || 'Launch Your Invitation in Minutes'}
              </h3>
              <p className={cn("text-sm text-muted-foreground mt-1 max-w-md mx-auto", isUrdu && "font-urdu py-1")}>
                {t('launchInviteSub') || 'Select from our heritage Mughal Gold or Emerald Classic themes, fill in your timings, and create a beautiful mobile-responsive website.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/create-invitation"
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  {t('createInvitationBtn') || 'Create Invitation'}
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  {t('viewPremiumThemes') || 'View Premium Themes'}
                </Link>
              </div>
            </footer>
          </article>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
