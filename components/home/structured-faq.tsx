'use client'

import { HelpCircle, ChevronDown, Sparkles, ShieldCheck, Leaf, Smartphone, MessageCircle, Link2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export interface FAQItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

export const STRUCTURED_FAQS = [
  {
    id: 'how-do-animated-digital-invitations-work',
    question: 'How do animated digital invitations work?',
    answer:
      "Cardzy's animated digital invitations transform traditional paper stationery into an immersive, interactive online event landing page. When guests open their custom link, they experience a realistic 3D envelope unboxing animation accompanied by curated background music, celebratory confetti, and elegant bilingual typography. Unlike static PDF attachments or video files that require large downloads and consume device storage, Cardzy invitations are lightweight web applications hosted in the cloud. Each invitation page includes essential event logistics such as an interactive Google Maps venue link, a live countdown timer, dress code guidelines, photo galleries, and gift registry details. Guests can access and interact with the invitation instantly on any iPhone, Android phone, tablet, or desktop browser with zero app installation required.",
  },
  {
    id: 'how-do-couples-track-guest-rsvps-via-whatsapp',
    question: 'How do couples track guest RSVPs via WhatsApp?',
    answer:
      "Tracking guest attendance with Cardzy is completely automated and eliminates the stress of paper response cards or messy spreadsheets. When guests visit your wedding or event invitation website, they can confirm their attendance ('Attending', 'Regretfully Decline', or 'Maybe'), specify the exact number of adults and children in their party, select dietary preferences, and submit a personal congratulatory message to the hosts. With our integrated WhatsApp RSVP system, guest confirmations are instantly converted into a pre-formatted WhatsApp message delivered directly to the host's phone number and synchronized with your real-time Cardzy host dashboard. This allows event organizers and wedding planners to maintain accurate guest headcounts, manage catering quantities, and finalize seating arrangements effortlessly.",
  },
  {
    id: 'are-photos-and-personal-details-kept-secure',
    question: 'Are photos and personal details kept secure?',
    answer:
      "Yes, user privacy, family photographs, and sensitive event details are protected by enterprise-grade cybersecurity standards. All interactions on Cardzy are transmitted over HTTPS/TLS encrypted connections and fortified by strict Content Security Policies (CSP) and HTTP Strict Transport Security (HSTS). Uploaded couple portraits, family pictures, and venue coordinates are stored in encrypted cloud storage buckets powered by Google Cloud and Firebase infrastructure. We strictly adhere to Google Publisher Policies, GDPR, and global data protection regulations—meaning we never sell, monetize, or publicly scrape your private family data. Event hosts retain total control over their data and can edit details, restrict public indexing, or permanently delete invitations and wish cards at any time.",
  },
  {
    id: 'can-digital-greeting-cards-be-customized-on-mobile-devices',
    question: 'Can digital greeting cards be customized on mobile devices?',
    answer:
      "Cardzy is built mobile-first, ensuring that 100% of our card creation, personalization, and sharing features work flawlessly on iOS and Android smartphones without requiring any software downloads. Our intuitive card builder allows you to select from over 30 celebration categories—including Eid Mubarak, Weddings, Birthdays, Anniversaries, and Corporate Networking vCards—directly within your mobile browser. You can type custom poetry in Urdu or English, upload memorable pictures from your phone's camera roll, choose background melodies, customize color palettes, and preview the full 3D opening animation in real time. Once customized, a shareable link and high-resolution QR code are generated in seconds, ready to be sent instantly across WhatsApp, SMS, Instagram DMs, or email.",
  },
  {
    id: 'what-is-the-eco-friendly-impact-of-switching-to-paperless-cards',
    question: 'What is the eco-friendly impact of switching to paperless cards?',
    answer:
      "Switching to Cardzy paperless digital invitations and greeting cards drastically reduces the environmental footprint of modern celebrations. Traditional paper stationery manufacturing requires harvesting vast timber forests, consuming thousands of liters of fresh water per batch, and generating hazardous chemical waste from synthetic dyes, metallic foil stamping, and plastic laminates. Furthermore, international postal delivery produces significant transportation carbon emissions. By adopting digital invitations, couples and event hosts eliminate physical paper waste, non-biodegradable glitter, and delivery vehicle emissions while simultaneously saving hundreds of dollars in printing and courier costs. It represents an elegant, sustainable, and modern solution that honors important life traditions while actively conserving our planet's natural resources.",
  },
  {
    id: 'how-do-guest-limits-and-digital-delivery-links-operate',
    question: 'How do guest limits and digital delivery links operate?',
    answer:
      "Cardzy operates on an unrestricted, scalable cloud delivery architecture designed to support celebrations of every size. When you publish a digital invitation or wish card, you receive a permanent, clean short URL (such as cardzy.online/i/your-event-slug) accompanied by a custom high-resolution QR code suitable for digital messaging or printing on welcome signboards. There are no arbitrary caps on the number of guests who can open your invitation—you can share the same link with 20 intimate family members or broadcast it to 2,000 guests across multiple WhatsApp groups, broadcast lists, and email newsletters simultaneously. Our high-speed cloud content delivery network (CDN) guarantees fast loading times, 99.9% uptime, and smooth multimedia playback regardless of concurrent traffic.",
  },
]

export function StructuredFaqSection() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: STRUCTURED_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-card/60 border-y border-border/80 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <HelpCircle className="size-3.5" /> {t('faqKicker') || 'High-Value Knowledge Base'}
          </div>

          <h2
            id="faq-heading"
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight ${isUrdu ? 'font-urdu leading-[2]' : ''}`}
          >
            {t('faqsMainHeading') || 'Frequently Asked Questions About Digital Invitations & Cards'}
          </h2>

          <p className={`text-sm sm:text-base text-muted-foreground leading-relaxed ${isUrdu ? 'font-urdu text-base' : ''}`}>
            {t('faqSubDesc') || 'Everything you need to know about animated digital cards, 1-click WhatsApp RSVP tracking, data security, mobile compatibility, and eco-friendly event planning.'}
          </p>
        </div>

        {/* Semantic HTML5 Accordion List using <details> and <summary> */}
        <div className="space-y-4">
          {STRUCTURED_FAQS.map((item, index) => (
            <details
              key={item.id}
              className="group rounded-2xl sm:rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-amber-500/40 hover:shadow-md [&_summary::-webkit-details-marker]:none open:border-emerald-500/40 open:bg-card/90"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-base sm:text-lg text-foreground transition-colors group-hover:text-amber-500 list-none">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                    0{index + 1}
                  </span>
                  <span className="text-left leading-snug">{item.question}</span>
                </div>
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:-rotate-180 group-open:text-emerald-500" />
              </summary>

              <div className="mt-4 pt-4 border-t border-border/60 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
