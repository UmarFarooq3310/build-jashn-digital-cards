'use client'

import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Jashn and how does it work?",
    answer: "Jashn (jashn.app) is Pakistan's premier platform for creating animated digital wish cards and full event invitation websites. We help you design and share beautiful, bilingual (English & Urdu) invites for weddings, dholkis, birthdays, Eid, and more. You simply select a template, customize the text and event details (like maps, date, and dress code), choose an optional background audio track, and generate a unique link to share with your family and friends via WhatsApp."
  },
  {
    question: "How can I create and send a digital wish card?",
    answer: "To send a wish card, go to 'Send a Wish' from the navigation. Select your occasion (such as Eid Mubarak, Birthday, Wedding, or Anniversary), pick a theme, enter the sender and recipient names, write a custom message (in English, Urdu, or both), and click create. You will instantly get a link to send on WhatsApp, or you can preview the animated card with traditional music and animations."
  },
  {
    question: "How do I create a digital event invitation website?",
    answer: "For invitations, choose 'Create Invitation' in the menu. Enter your event details—host names, bride & groom names, date, venue, dress code, and optional Google Maps location links. Once created, Jashn hosts a dedicated, beautiful invitation web page for your event. Guests visiting this link will see a countdown timer, event location, and an interactive RSVP section."
  },
  {
    question: "Is Jashn free to use?",
    answer: "Yes, Jashn is completely free to start! With our Free Plan, you can create unlimited wish cards using our classic free themes, send basic invitation pages, and share them instantly. For premium events like weddings, we offer Pro and Business upgrades."
  },
  {
    question: "What features are included in the Pro and Business plans?",
    answer: "Our Pro Plan (Rs. 499) removes the Jashn watermark, unlocks premium themes (like Mughal Gold and Pink Zardozi), enables petal & sparkle falling animations, provides real-time view & RSVP guest analytics, and allows high-resolution image downloads. The Business Plan (Rs. 2,999) is designed for event organizers and venues, offering branded cards with custom logos, CSV guest list exports, WhatsApp API sending, and a dedicated account manager."
  },
  {
    question: "What payment methods are supported in Pakistan?",
    answer: "To make it incredibly easy for users in Pakistan, we support direct mobile wallet billing. You can upgrade your plan instantly using JazzCash or EasyPaisa. Simply enter your mobile wallet number during checkout on our Pricing page, and you will receive a secure OTP confirmation request on your phone."
  },
  {
    question: "How do guest RSVPs and analytics work?",
    answer: "When you share a premium invitation, your guests can click 'Going' or 'Maybe' and enter the number of guests attending directly on your invitation link. As the creator, you can log into your Jashn Dashboard at any time to see the total view count, how many guests have RSVPed, and view the list of guest names and attendance counts in real-time."
  },
  {
    question: "Can I add Urdu text and Nastaliq calligraphy to my cards?",
    answer: "Absolutely! Jashn features native support for the beautiful Noto Nastaliq Urdu font. During customization, you can write Urdu text for titles, sender names, and messages. Our templates are designed to display Urdu calligraphy gracefully alongside English details."
  },
  {
    question: "Can I add background music or sounds to my invitation?",
    answer: "Yes. Jashn supports ambient audio themes to set the mood for your invitations. You can select classic Dholki beats for mehndis, soft instrumental/shehnai for weddings, festive tunes for birthdays, or serene background sounds. Guests can easily mute or unmute the audio using a floating speaker button on the page."
  },
  {
    question: "Can I download my card as a high-resolution image?",
    answer: "Yes, Pro and Business plan users can download their wish cards as high-quality PNG images. This is perfect for posting on Instagram, printing, or sending as a static photo, though we highly recommend sharing the interactive animated web link for the best multimedia experience."
  },
  {
    question: "Do these digital invitations work on mobile devices?",
    answer: "Yes, Jashn cards are fully responsive and optimized for mobile screens. Since over 95% of guests open invitations on their mobile phones via WhatsApp, we design every theme to look stunning, load fast, and animate smoothly on all iOS and Android smartphones."
  }
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
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
              <span className="text-base sm:text-lg">{item.question}</span>
              <ChevronDown
                className={`size-5 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[350px] opacity-100 border-t border-border' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <p className="p-5 text-sm sm:text-base leading-relaxed text-muted-foreground bg-muted/20">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
