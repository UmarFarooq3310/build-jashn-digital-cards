'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, Mail, MessageSquare, CheckCircle2, Gift, Calendar, User, FileText, Phone, Contact2, Globe, HelpCircle, Tag } from 'lucide-react'
import Link from 'next/link'
import { cn, validateWhatsAppNumber } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

export function ConciergeService() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const [mode, setMode] = useState<'form' | 'direct'>('form')
  const [cardType, setCardType] = useState<'wish' | 'invitation' | 'visiting'>('wish')
  const [occasion, setOccasion] = useState('')
  const [names, setNames] = useState('')
  const [eventDetails, setEventDetails] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Build formatted text message from form
  const buildMessage = () => {
    const typeLabel =
      cardType === 'wish'
        ? t('wishGreetingCardType') || 'Wish / Greeting Card'
        : cardType === 'invitation'
        ? t('eventInvitationCardType') || 'Event Invitation Card'
        : t('digitalVisitingCardType') || 'Digital Visiting / Business Card'

    return (
      `Hi Cardzy Team! I want a custom card created for me.\n\n` +
      `*Card Type:* ${typeLabel}\n` +
      `*Occasion / Purpose:* ${occasion || 'General Wish/Celebration/Business'}\n` +
      `*Names / Title:* ${names || 'Not specified'}\n` +
      `*Details / Message:* ${eventDetails || 'Please contact me for details'}\n` +
      `*My Contact:* ${contactInfo || 'Not specified'}\n\n` +
      `Please create my card and send me the live link!`
    )
  }

  const getWhatsAppUrl = () => {
    const text = mode === 'form' ? buildMessage() : (
      "Hi Cardzy Team! I want you to create my custom event invitation, wish card, or digital visiting card. Here are my details:\n\n" +
      "*Card Type (Wish / Invitation / Visiting):* \n" +
      "*Title / Name / Designation:* \n" +
      "*Details / Date & Venue / Services:* \n" +
      "*Special Message:* \n" +
      "*My WhatsApp / Contact:* "
    )
    return `https://wa.me/923093518796?text=${encodeURIComponent(text)}`
  }

  const getEmailUrl = () => {
    const text = mode === 'form' ? buildMessage() : (
      "Hi Cardzy Team,\n\nI would like you to create my card.\n\n" +
      "*Card Type:* \n" +
      "*Title / Name:* \n" +
      "*Event Details / Business Info:* \n" +
      "*My Contact:* "
    )
    const subject = encodeURIComponent(`Custom Card Request: ${occasion || 'Wish / Invitation / Visiting Card'}`)
    return `mailto:cardzyonline@gmail.com?subject=${subject}&body=${encodeURIComponent(text)}`
  }

  const handleFormSubmit = (e: React.FormEvent, target: 'whatsapp' | 'email') => {
    e.preventDefault()
    setPhoneError('')

    if (target === 'whatsapp' && contactInfo.trim()) {
      const res = validateWhatsAppNumber(contactInfo)
      if (!res.isValid) {
        setPhoneError(res.error || 'Please enter a valid WhatsApp number')
        return
      }
    }

    setSubmitted(true)
    if (target === 'whatsapp') {
      window.open(getWhatsAppUrl(), '_blank')
    } else {
      window.location.href = getEmailUrl()
    }
  }

  return (
    <section id="concierge-section" className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden my-6 md:my-10 rounded-3xl max-w-6xl mx-auto border border-emerald-500/20 shadow-2xl">
      {/* Background glow animations */}
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-[28rem] rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="mx-auto w-full relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest shadow-xs">
              <Sparkles className="size-4 text-amber-400 animate-pulse" />
              <span>{t('conciergeKicker') || 'Too Busy? We Create For You! 📲'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-widest shadow-xs">
              <Globe className="size-3.5 text-amber-400" />
              <span>{t('globalDigitalCards18Langs') || 'Global Digital Cards & 18 Languages 🌍'}</span>
            </span>
          </div>

          <h2 className={cn("text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight", isUrdu && "font-urdu leading-[2.2]")}>
            {t('conciergeTitle') || "Send Details on WhatsApp or Email — We'll Make Your Card!"}
          </h2>

          <p className={cn("mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed", isUrdu && "font-urdu text-base sm:text-lg leading-[2.2]")}>
            {t('conciergeDesc') || "Don't have time to design? Send us your details for Wish Cards, Event Invitations, or Digital Visiting Cards (English, Urdu & 18 languages). Our expert team will craft your custom animated card and send your live link directly!"}
          </p>

          {/* Service Highlights Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-1 text-xs">
            <span className="bg-white/10 px-3 py-1 rounded-full text-emerald-300 border border-emerald-500/20 font-semibold">
              {t('wishGreetingCardsBadge') || '✨ Wish & Greeting Cards'}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-amber-300 border border-amber-500/20 font-semibold">
              {t('eventInvitationsRsvpBadge') || '💌 Event Invitations (RSVP & Maps)'}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-teal-300 border border-teal-500/20 font-semibold">
              {t('digitalVisitingCardsVcfBadge') || '🪪 Digital Visiting Cards (.vcf)'}
            </span>
            <Link href="/pricing" className="bg-emerald-500/20 hover:bg-emerald-500/30 text-white px-3 py-1 rounded-full border border-emerald-400/30 font-bold transition-all flex items-center gap-1">
              <Tag className="size-3 text-amber-400" />
              <span>{t('pricingTitle') || 'Pricing'}</span>
            </Link>
            <Link href="/faq" className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white px-3 py-1 rounded-full border border-white/20 font-semibold transition-all flex items-center gap-1">
              <HelpCircle className="size-3" />
              <span>{t('faqNav') || 'FAQs'}</span>
            </Link>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-white/10 p-1.5 backdrop-blur-md border border-white/10">
            <button
              onClick={() => setMode('form')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all",
                mode === 'form'
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <FileText className="size-4" />
              <span>{t('fillQuickForm') || 'Fill Quick Form'}</span>
            </button>
            <button
              onClick={() => setMode('direct')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all",
                mode === 'direct'
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <MessageSquare className="size-4" />
              <span>{t('directWhatsappEmail') || 'Direct WhatsApp & Email'}</span>
            </button>
          </div>
        </div>

        {/* Form Mode */}
        {mode === 'form' ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
              <h3 className="text-lg font-extrabold text-emerald-300 flex items-center gap-2">
                <Sparkles className="size-5 text-amber-400" />
                <span>{t('simpleDetailsFormTitle') || 'Simple Details Form (No design selection needed)'}</span>
              </h3>
              <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {t('freeCustomCreationBadge') || '100% Free Custom Creation'}
              </span>
            </div>

            {/* Card Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t('selectCardTypeLabel') || '1. Select Card Type'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCardType('wish')}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all",
                    cardType === 'wish'
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  )}
                >
                  <Gift className="size-4 text-emerald-400" />
                  <span>{t('wishGreetingCardType') || 'Wish / Greeting Card'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardType('invitation')}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all",
                    cardType === 'invitation'
                      ? "border-amber-500 bg-amber-500/20 text-amber-300 shadow-md"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  )}
                >
                  <Calendar className="size-4 text-amber-400" />
                  <span>{t('eventInvitationCardType') || 'Event Invitation Card'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardType('visiting')}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all",
                    cardType === 'visiting'
                      ? "border-teal-500 bg-teal-500/20 text-teal-300 shadow-md"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  )}
                >
                  <Contact2 className="size-4 text-teal-400" />
                  <span>{t('digitalVisitingCardType') || 'Digital Visiting Card'}</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-emerald-400" />
                  <span>
                    {cardType === 'wish'
                      ? (t('wishOccasionPurposeLabel') || 'Wish Occasion / Purpose *')
                      : cardType === 'invitation'
                      ? (t('eventTypeOccasionLabel') || 'Event Type / Occasion *')
                      : (t('professionCategoryLabel') || 'Profession / Business Category *')}
                  </span>
                </label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder={
                    cardType === 'wish'
                      ? (t('wishOccasionPlaceholder') || "e.g. Birthday, Eid Mubarak, Anniversary, Friendship, General Wish")
                      : cardType === 'invitation'
                      ? (t('eventOccasionPlaceholder') || "e.g. Wedding / Barat, Nikah, Birthday Party, Walima, Corporate Event")
                      : (t('professionPlaceholder') || "e.g. Doctor, CEO, Lawyer, Real Estate Agent, IT Consultant, Clinic")
                  }
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="size-3.5 text-emerald-400" />
                  <span>
                    {cardType === 'wish'
                      ? (t('recipientSenderNameLabel') || 'Recipient / Sender Name(s) *')
                      : cardType === 'invitation'
                      ? (t('hostCoupleNameLabel') || 'Host / Couple Name(s) *')
                      : (t('fullNameDesignationLabel') || 'Full Name & Designation *')}
                  </span>
                </label>
                <input
                  type="text"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  placeholder={
                    cardType === 'wish'
                      ? (t('wishRecipientPlaceholder') || "e.g. To: Sarah OR From: Usman & Family")
                      : cardType === 'invitation'
                      ? (t('coupleNamePlaceholder') || "e.g. Bride & Groom: Fatima & Zaryab")
                      : (t('designationPlaceholder') || "e.g. Dr. Zaryab Malik - Chief Executive Officer")
                  }
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="size-3.5 text-emerald-400" />
                <span>
                  {cardType === 'wish'
                    ? (t('wishMessageLabel') || 'Wish Message & Personal Note *')
                    : cardType === 'invitation'
                    ? (t('eventDetailsLabel') || 'Event Date, Time, Venue & RSVP Details *')
                    : (t('businessDetailsLabel') || 'Business Details, Address, Phone & Website *')}
                </span>
              </label>
              <textarea
                rows={3}
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder={
                  cardType === 'wish'
                    ? (t('wishMessagePlaceholder') || "e.g. Wishing you a happy birthday filled with joy and blessings! From your friend Usman.")
                    : cardType === 'invitation'
                    ? (t('eventDetailsPlaceholder') || "e.g. Date: 15th August, Time: 7 PM, Venue: PC Hotel Lahore. RSVP: 0300-1234567")
                    : (t('businessDetailsPlaceholder') || "e.g. Phone: +92 300 1234567, Address: Gulberg Lahore, Services: Dental Clinic, Website: clinic.com")
                }
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Phone className="size-3.5 text-emerald-400" />
                <span>{t('yourWhatsappContactLabel') || 'Your WhatsApp Number / Contact (To receive live link)'}</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => {
                  setContactInfo(e.target.value)
                  if (phoneError) setPhoneError('')
                }}
                placeholder={t('contactInfoPlaceholder') || "e.g. +92 309 3518796 or 0309 3518796"}
                className={cn(
                  "w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all",
                  phoneError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500/20"
                )}
              />
              {phoneError && (
                <p className="text-xs font-bold text-red-400 flex items-center gap-1 mt-1">
                  ⚠️ {phoneError}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={(e) => handleFormSubmit(e, 'whatsapp')}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="size-5 fill-white/20" />
                <span>{t('sendViaWhatsappBtn') || 'Send via WhatsApp 🟢'}</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={(e) => handleFormSubmit(e, 'email')}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="size-5" />
                <span>{t('sendViaEmailBtn') || 'Send via Email ✉️'}</span>
              </button>
            </div>

            {submitted && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="size-4" />
                <span>{t('formattingRedirectSuccess') || 'Opening messaging app with your formatted details... Our team will send your live card link shortly!'}</span>
              </div>
            )}
          </div>
        ) : (
          /* Direct Chat Mode */
          <div className="space-y-6">
            {/* 3 Step Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
                <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
                  1
                </div>
                <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
                  {t('conciergeStep1Title') || "1. Send Details"}
                </h3>
                <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
                  {t('conciergeStep1Desc') || "Send us event names, dates, venue location pins, wish text, or business visiting card info on WhatsApp or Email."}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
                <div className="size-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-extrabold text-lg">
                  2
                </div>
                <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
                  {t('conciergeStep2Title') || "2. Expert Custom Design"}
                </h3>
                <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
                  {t('conciergeStep2Desc') || "Our expert designer team crafts your customized animated invitation, wish card, or digital visiting card."}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-3">
                <div className="size-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-lg">
                  3
                </div>
                <h3 className={cn("font-bold text-lg text-white", isUrdu && "font-urdu text-xl leading-relaxed")}>
                  {t('conciergeStep3Title') || "3. Get Your Live Link"}
                </h3>
                <p className={cn("text-xs text-slate-300 leading-relaxed", isUrdu && "font-urdu text-sm leading-[2.1]")}>
                  {t('conciergeStep3Desc') || "We send your ready-to-share WhatsApp link back in minutes so you can send it to guests or clients!"}
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 text-sm sm:text-base shadow-xl shadow-emerald-950/50 transition-all hover:scale-105"
              >
                <MessageSquare className="size-5 fill-white/20" />
                <span>{t('chatDirectlyWhatsappBtn') || 'Chat Directly on WhatsApp 💬'}</span>
                <ArrowRight className="size-5" />
              </a>

              <a
                href={getEmailUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 text-sm sm:text-base shadow-lg transition-all hover:scale-105"
              >
                <Mail className="size-5" />
                <span>{t('sendEmail') || "Send Details via Email ✉️"}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
