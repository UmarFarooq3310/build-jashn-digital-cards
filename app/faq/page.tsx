'use client'
import Link from 'next/link'
import { HelpCircle, Sparkles, MessageSquare, Mail } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const FAQ_ITEMS = [
  { q: 'What is Cardzy and how does it work?', a: 'Cardzy (cardzy.online) is a global platform for creating animated digital wish cards and full event invitation websites. You fill in your event or occasion details, choose an animated theme, personalise the message, and receive a shareable link. Recipients open the link on any device — no app download required.' },
  { q: 'How can I create and send a digital wish card?', a: 'Visit the Create Wish Card page, select your occasion, pick a theme, enter names, write or select a pre-written message, optionally upload a photo, and click Create. You get a unique shareable link to send via WhatsApp, Instagram, email, or SMS.' },
  { q: 'How do I create a digital event invitation website?', a: 'Go to Create Invitation, choose your event type (Nikkah, Mehndi, Barat, Walima, Birthday, Iftaar, etc.), fill in host names, event date and time, venue details, and your RSVP WhatsApp number. Cardzy generates a live invitation page with a countdown timer, Google Maps link, and WhatsApp RSVP button.' },
  { q: 'Is Cardzy free to use?', a: 'Yes, Cardzy is completely free to start. Create unlimited wish cards using classic themes and share them instantly without any account registration. Pro and Business plans unlock advanced features like premium animations, watermark removal, and high-resolution PNG downloads.' },
  { q: 'What features are included in the Pro and Business plans?', a: 'Pro Plan removes watermarks, unlocks all premium animated themes, enables PNG card downloads, and gives unlimited card storage. The Business Plan adds custom company logos, bulk CSV guest list exports, priority support, and dedicated account management.' },
  { q: 'How do I upgrade to a Pro or Business plan?', a: 'Contact us via WhatsApp at +92 309 3518796 or email cardzyonline@gmail.com. Share your payment proof (EasyPaisa, JazzCash, PayPal, or bank transfer) and your account email, and we will activate your plan within 2 hours during business hours.' },
  { q: 'What payment methods do you accept?', a: 'Pakistan: EasyPaisa, JazzCash, and local bank transfer. International: PayPal, Wise, and international bank transfer. All transactions are manually confirmed with a WhatsApp or email notification.' },
  { q: 'How do guest RSVPs and analytics work?', a: "When a guest opens your invitation link, they see a 'Going / Maybe / Not Going' button. All responses are logged in real time and visible in your dashboard. Export the full confirmed guest list as a CSV file for seating and catering planning." },
  { q: 'What languages are supported on Cardzy?', a: 'Cardzy supports 18 languages: English, Urdu (with authentic Nastaliq script), Spanish, French, Arabic, Hindi, Mandarin Chinese, Portuguese, Russian, German, Japanese, Korean, Italian, Turkish, Indonesian, Bengali, Vietnamese, and Swahili.' },
  { q: 'Can I download my card as a high-resolution image?', a: 'Yes. Pro and Business plan users can download their wish cards as high-quality PNG images suitable for sharing on Instagram, printing, or saving in a digital photo album.' },
  { q: 'Do these digital invitations work on mobile devices?', a: 'Absolutely. All Cardzy cards and invitations are 100% mobile-first and fully responsive. They are optimised for iOS and Android smartphones — exactly where most recipients will open them.' },
  { q: 'Can I edit a card after I have already shared the link?', a: 'Yes. If you have a Cardzy account, you can edit your card or invitation from your dashboard at any time. Changes apply immediately — the same link your guests received will show the updated version.' },
  { q: 'How do I create a digital business visiting card (vCard)?', a: 'Visit Create Visiting Card, select your professional category, fill in your name, designation, company, phone, WhatsApp, email, website, and address. Choose a professional theme, click Create, and receive a permanent link and QR code to share.' },
  { q: 'Is my card data private and secure?', a: "Cardzy cards are accessible to anyone with the link — this is intentional, as you share them widely. We do not sell your personal data to third parties. For sensitive invitations, use a public venue name rather than a personal home address. See our Privacy Policy for full details." },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question', name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FaqPage() {
  const { t } = useLang()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <HelpCircle className="size-4" /> {t('faqPageBadge')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('faqPageH1')}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('faqPageSubtitle')}
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="space-y-0 divide-y divide-border border border-border rounded-3xl overflow-hidden shadow-sm">
            {FAQ_ITEMS.map((item, index) => (
              <details key={index} className="group bg-card open:bg-muted/30 transition-colors">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6 font-semibold text-foreground hover:text-primary transition-colors">
                  <span className="text-sm sm:text-base leading-snug">{item.q}</span>
                  <span className="mt-0.5 shrink-0 text-muted-foreground text-lg leading-none select-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* About section */}
          <div className="mt-14 space-y-4 text-muted-foreground">
            <h2 className="text-2xl font-extrabold text-foreground">{t('faqAboutCardzy')}</h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Cardzy is a global digital celebration platform designed for South Asian families and the worldwide diaspora. The platform allows anyone to create animated digital wish cards for occasions like Eid Mubarak, birthdays, anniversaries, and Ramadan — and professional digital event invitations for weddings, Nikkah ceremonies, Mehndi nights, Iftaar parties, and more.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Unlike generic greeting card websites, Cardzy is built with Pakistani and South Asian cultural traditions at its core — featuring Urdu Nastaliq script, Islamic calligraphy patterns, Mehndi and dholki themes, and bilingual templates that honour both older family members and younger generations.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Cardzy is free to use for standard wish cards and invitations. Pro and Business plans unlock advanced features. Cardzy serves users in Pakistan, India, the UAE, Saudi Arabia, the UK, USA, Canada, Australia, and 60+ other countries.
            </p>
          </div>

          {/* Contact callout */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 shadow-sm max-w-lg mx-auto">
              <Sparkles className="size-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{t('faqStillQuestion')}</h2>
              <p className="text-sm text-muted-foreground mt-1">Our team responds via WhatsApp and email within 24 hours.</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
                  <MessageSquare className="size-4" />{t('faqWhatsappUs')}
                </a>
                <a href="mailto:cardzyonline@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                  <Mail className="size-4" />{t('faqEmailUs')}
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                  {t('contactPageBadge')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
