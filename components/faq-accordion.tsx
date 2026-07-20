'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const FAQ_ITEMS = [
  { qKey: 'faq_q1', aKey: 'faq_a1', fallbackQ: "What is Cardzy and how does it work?", fallbackA: "Cardzy (cardzy.online) is a global platform for creating animated digital wish cards and full event invitation websites..." },
  { qKey: 'faq_q2', aKey: 'faq_a2', fallbackQ: "How can I create and send a digital wish card?", fallbackA: "To send a wish card, select your occasion (Eid, Birthday, Wedding, Christmas), pick a theme, enter names, and click create." },
  { qKey: 'faq_q3', aKey: 'faq_a3', fallbackQ: "How do I create a digital event invitation website?", fallbackA: "Choose 'Create Invitation' in the menu, enter your event details, and Cardzy generates a dedicated invitation page." },
  { qKey: 'faq_q4', aKey: 'faq_a4', fallbackQ: "Is Cardzy free to use?", fallbackA: "Yes, Cardzy is completely free to start! You can create unlimited wish cards using our classic free themes and share them instantly." },
  { qKey: 'faq_q5', aKey: 'faq_a5', fallbackQ: "What features are included in the Pro and Business plans?", fallbackA: "Our Pro Plan removes watermarks and unlocks all premium themes. The Business Plan offers custom logos and CSV exports." },
  { qKey: 'faq_q6', aKey: 'faq_a6', fallbackQ: "How do I upgrade to a Pro or Business plan?", fallbackA: "Reach out via WhatsApp (+92 309 3518796) or Email (cardzyonline@gmail.com) with payment proof." },
  { qKey: 'faq_q7', aKey: 'faq_a7', fallbackQ: "What payment methods do you accept?", fallbackA: "For Pakistan: EasyPaisa, JazzCash, or Bank Transfer. For International: PayPal, Wise, or Bank Transfer." },
  { qKey: 'faq_q8', aKey: 'faq_a8', fallbackQ: "How do guest RSVPs and analytics work?", fallbackA: "Guests click 'Going' or 'Maybe' on your link. You can view real-time view counts and guest attendance in your Dashboard." },
  { qKey: 'faq_q9', aKey: 'faq_a9', fallbackQ: "What languages are supported?", fallbackA: "Cardzy supports 18 languages: English, Spanish, French, Arabic, Hindi, Mandarin, Portuguese, Russian, German, Japanese, Korean, Italian, Turkish, Indonesian, Urdu, Bengali, Vietnamese, and Swahili." },
  { qKey: 'faq_q10', aKey: 'faq_a10', fallbackQ: "Can I download my card as a high-resolution image?", fallbackA: "Yes, Pro and Business plan users can download their wish cards as high-quality PNG images." },
  { qKey: 'faq_q11', aKey: 'faq_a11', fallbackQ: "Do these digital invitations work on mobile devices?", fallbackA: "Yes, Cardzy cards are 100% responsive and optimized for mobile screens on iOS and Android." },
]

export function FaqAccordion() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        const question = t(item.qKey) || item.fallbackQ
        const answer = t(item.aKey) || item.fallbackA

        return (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={isOpen}
              id={`faq-btn-${index}`}
            >
              <span className="text-base sm:text-lg">{question}</span>
              <ChevronDown
                className={`size-5 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[400px] opacity-100 border-t border-border' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <p className="p-5 text-sm sm:text-base leading-relaxed text-muted-foreground bg-muted/20">
                {answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
