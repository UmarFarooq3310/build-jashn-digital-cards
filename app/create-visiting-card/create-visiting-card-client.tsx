'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CreditCard,
  Building2,
  Code,
  Stethoscope,
  Scale,
  Home,
  Sparkles,
  Wrench,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Palette,
  Check,
  Share2,
  Copy,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import { CardQrCode } from '@/components/jashn/qr-code'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useJashn } from '@/lib/jashn/store'
import { useLang, LANGUAGES } from '@/lib/lang/context'
import type { Language, VisitingCardCategory, VisitingCard } from '@/lib/jashn/types'
import { VISITING_CARD_CATEGORIES, VISITING_CARD_THEMES } from '@/lib/jashn/visiting-card-themes'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { cn, validateWhatsAppNumber } from '@/lib/utils'

export default function CreateVisitingCardPage() {
  const { t, lang, setLang } = useLang()
  const { createVisitingCard, showToast } = useJashn()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedCategory, setSelectedCategory] = useState<VisitingCardCategory>('business')
  const [selectedThemeId, setSelectedThemeId] = useState<string>('executive-gold')

  const [fullName, setFullName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [mapLink, setMapLink] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  // Validation Error States
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCard, setCreatedCard] = useState<VisitingCard | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Auto-normalize website URL
  const formatWebsiteUrl = (url: string) => {
    let clean = url.trim()
    if (!clean) return ''
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      return `https://${clean}`
    }
    return clean
  }

  const runValidation = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = t('fullNameRequired', 'Full Name is required')
    }

    // Title validation
    if (!title.trim()) {
      newErrors.title = t('jobTitleRequired', 'Job Title / Role is required')
    }

    // Phone validation
    const cleanPhone = phone.trim()
    if (!cleanPhone) {
      newErrors.phone = t('phoneRequired', 'Phone number is required')
    } else if (!/^[+0-9\s-]{7,18}$/.test(cleanPhone)) {
      newErrors.phone = t('invalidPhone', 'Please enter a valid phone number')
    }

    // WhatsApp validation (optional but must be valid if provided)
    if (whatsapp.trim()) {
      const res = validateWhatsAppNumber(whatsapp)
      if (!res.isValid) {
        newErrors.whatsapp = res.error || t('invalidPhone', 'Please enter a valid WhatsApp number')
      }
    }

    // Email validation (optional but must be valid if provided)
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        newErrors.email = t('validEmailRequired', 'Please enter a valid email address')
      }
    }

    // Website validation (optional)
    if (website.trim()) {
      const normUrl = formatWebsiteUrl(website)
      try {
        new URL(normUrl)
      } catch (e) {
        newErrors.website = t('invalidWebsite', 'Invalid website URL format')
      }
    }

    return newErrors
  }

  const validateForm = (): boolean => {
    const errsMap = runValidation()
    setErrors(errsMap)
    return Object.keys(errsMap).length === 0
  }

  const previewData: Partial<VisitingCard> = {
    fullName: fullName.trim() || t('defaultVisitingName', 'Dr. Zaryab Malik'),
    title: title.trim() || t('defaultVisitingTitle', 'Chief Executive Officer'),
    company: company.trim() || t('defaultVisitingCompany', 'Malik Global Enterprises'),
    category: selectedCategory,
    phone: phone.trim() || '+92 300 1234567',
    whatsapp: whatsapp.trim() || phone.trim() || '+92 300 1234567',
    email: email.trim() || 'contact@malikglobal.com',
    website: website.trim() ? formatWebsiteUrl(website) : 'malikglobal.com',
    address: address.trim() || 'Suite 402, Blue Area, Islamabad',
    mapLink: mapLink.trim() || 'https://maps.google.com',
    bio: bio.trim() || t('defaultVisitingBio', 'Leading digital innovations & global business solutions.'),
    avatarUrl: avatarUrl.trim(),
    themeId: selectedThemeId,
    language: lang,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errsMap = runValidation()
    setErrors(errsMap)
    const errKeys = Object.keys(errsMap)
    if (errKeys.length > 0) {
      setStep(2)
      const firstKey = errKeys[0]
      const firstErr = errsMap[firstKey] || t('completeAllRequiredFields', 'Please correct the highlighted errors in the form')
      showToast(firstErr, 'error')
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById(`field-${firstKey}`) || document.querySelector(`[name="${firstKey}"]`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            ;(el as HTMLElement).focus()
          }
        }, 120)
      }
      return
    }

    setIsSubmitting(true)
    try {
      const card = await createVisitingCard({
        fullName: fullName.trim(),
        title: title.trim(),
        company: company.trim(),
        category: selectedCategory,
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || phone.trim(),
        email: email.trim(),
        website: website.trim() ? formatWebsiteUrl(website) : '',
        address: address.trim(),
        mapLink: mapLink.trim(),
        bio: bio.trim(),
        avatarUrl: avatarUrl.trim(),
        themeId: selectedThemeId,
        language: lang,
      })

      setCreatedCard(card)
      showToast(t('visitingCardCreatedSuccess', 'Digital Visiting Card Created Successfully! 🎉'), 'success')
    } catch (err: any) {
      console.error(err)
      showToast(err?.message || 'Failed to create visiting card. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyLink = () => {
    if (!createdCard) return
    recordCardShare('vcard', createdCard.slug, 'copy')
    const liveUrl = `${window.location.origin}/v/${createdCard.slug}`
    navigator.clipboard.writeText(liveUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div className="space-y-8">

          {createdCard ? (
            /* Created Result View */
            <div className="max-w-2xl mx-auto space-y-4 bg-card border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 mx-auto flex items-center justify-center">
                  <Check className="size-8" />
                </div>
                <h2 className="text-2xl font-black text-foreground">{t('visitingCardLiveTitle') || 'Your Digital Visiting Card is Live! 🎉'}</h2>
                <p className="text-xs text-muted-foreground">
                  {t('visitingCardLiveSubtitle') || 'Anyone who clicks your link can save your phone number to their contacts in 1 click or chat with you on WhatsApp!'}
                </p>
              </div>

              {/* Card Preview */}
              <div className="py-2">
                <VisitingCardView data={createdCard} showShareBtn={false} />
              </div>

              {/* Share Bar & Links */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/v/${createdCard.slug}`}
                    className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-xs font-mono font-bold text-foreground outline-none"
                  />
                  <Button
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto h-12 px-6 rounded-2xl font-bold bg-primary text-primary-foreground shrink-0"
                  >
                    {copiedLink ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
                    <span>{copiedLink ? (t('copied') || 'Copied!') : (t('copyLink') || 'Copy Link')}</span>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi! Here is my Digital Visiting Card: ${typeof window !== 'undefined' ? window.location.origin : ''}/v/${createdCard.slug}`)}`}
                    onClick={() => recordCardShare('vcard', createdCard.slug, 'whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
                  >
                    <MessageSquare className="size-4" />
                    <span>{t('shareOnWhatsApp') || 'Share on WhatsApp'}</span>
                  </a>

                  <Link
                    href={`/v/${createdCard.slug}?mode=sender`}
                    target="_blank"
                    className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card hover:bg-muted font-bold text-sm text-foreground shadow-sm"
                  >
                    <span>{t('viewPublicLiveCard') || 'View (Sender Mode)'}</span>
                    <ExternalLink className="size-4" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setShowShareModal(true)}
                  className="w-full h-12 rounded-2xl border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Share2 className="size-4" />
                  <span>Share via SMS, QR Code & Download Image (PNG)</span>
                </button>

                {/* Universal Luxury Share Modal */}
                {showShareModal && createdCard && (
                  <CardShareModal
                    card={{
                      title: createdCard.fullName || 'Digital Visiting Card',
                      recipientOrCouple: createdCard.fullName,
                      type: 'vcard',
                      slug: createdCard.slug,
                      url: `/v/${createdCard.slug}`,
                      viewsCount: createdCard.viewCount || 0,
                      shares: createdCard.shares,
                      occasion: createdCard.company || createdCard.title || 'Digital Business Profile',
                      senderName: createdCard.fullName,
                      waMessage: `Hi! Here is my Digital Visiting Card: ${typeof window !== 'undefined' ? window.location.origin : ''}/v/${createdCard.slug}`,
                    }}
                    onClose={() => setShowShareModal(false)}
                  />
                )}

                {/* External Barcode & Scannable QR Code Section */}
                <div className="pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">
                    Digital Visiting Card Barcode / QR Code
                  </span>
                  <CardQrCode slug={createdCard.slug} cardType="v" size={160} showDownloadBtn={true} />
                </div>

                <button
                  onClick={() => setCreatedCard(null)}
                  className="w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground pt-4 underline"
                >
                  {t('createAnotherCard') || '← Create Another Visiting Card'}
                </button>
              </div>
            </div>
          ) : (
            /* Builder Form + Live Preview Grid */
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Form Column */}
              <form noValidate onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">

                {/* 2-Step Progress Header */}
                <div className="flex items-center justify-between gap-2 p-1.5 bg-muted/60 rounded-2xl border border-border/60 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
                      step === 1
                        ? "bg-emerald-700 text-white shadow-sm font-black"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    <Palette className="size-3.5" />
                    <span>{t('vcardStepStyle') || '1. Theme & Style'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
                      step === 2
                        ? "bg-emerald-700 text-white shadow-sm font-black"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    <User className="size-3.5" />
                    <span>{t('vcardStepContact') || '2. Contact Details'}</span>
                  </button>
                </div>

                {/* ── STEP 1: THEME & STYLE ── */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    {/* 1. Category Selection */}
                    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <label className={cn("text-xs font-extrabold uppercase tracking-wider text-muted-foreground block", isUrdu ? "text-right font-urdu" : "text-left")}>
                          {t('selectCategorySection') || 'Select Industry / Profession Category'}
                        </label>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {VISITING_CARD_CATEGORIES.map((cat) => {
                          const catKey = cat.id === 'business' ? 'catCorporate'
                            : cat.id === 'creative' ? 'catTech'
                            : cat.id === 'medical' ? 'catMedical'
                            : cat.id === 'legal' ? 'catLegal'
                            : cat.id === 'real-estate' ? 'catRealEstate'
                            : cat.id === 'beauty' ? 'catFashion'
                            : cat.id === 'services' ? 'catServices'
                            : ''
                          const taglineKey = cat.id === 'business' ? 'taglineCorporate'
                            : cat.id === 'creative' ? 'taglineTech'
                            : cat.id === 'medical' ? 'taglineMedical'
                            : cat.id === 'legal' ? 'taglineLegal'
                            : cat.id === 'real-estate' ? 'taglineRealEstate'
                            : cat.id === 'beauty' ? 'taglineFashion'
                            : cat.id === 'services' ? 'taglineServices'
                            : ''
                          const translatedLabel = catKey ? t(catKey) : cat.label
                          const isSelected = selectedCategory === cat.id
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setSelectedCategory(cat.id)}
                              className={cn(
                                'flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border text-left transition-all',
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary shadow-xs font-bold ring-2 ring-primary/20'
                                  : 'border-border bg-card hover:border-primary/40 text-muted-foreground'
                              )}
                            >
                              <span className={cn(
                                "size-2 rounded-full shrink-0",
                                isSelected ? "bg-primary" : "bg-muted-foreground/40"
                              )} />
                              <span className="text-xs font-bold text-foreground truncate">{translatedLabel}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* 2. Theme Selection */}
                    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                      <label className={cn("text-xs font-extrabold uppercase tracking-wider text-muted-foreground block", isUrdu ? "text-right font-urdu" : "text-left")}>
                        {t('selectThemeSection') || 'Select Card Style & Colors'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {VISITING_CARD_THEMES.map((th) => {
                          const styleKey = th.id === 'executive-gold' ? 'styleExecutiveGold'
                            : th.id === 'tech-dark' ? 'styleCyberTech'
                            : th.id === 'emerald-luxury' ? 'styleRoyalEmerald'
                            : th.id === 'corporate-blue' ? 'styleCorporateNavy'
                            : th.id === 'rose-gold-elegance' ? 'styleRoseGold'
                            : th.id === 'minimal-clean' ? 'styleCleanPearl'
                            : ''
                          const translatedThemeName = styleKey ? t(styleKey) : th.name
                          const isSelected = selectedThemeId === th.id
                          return (
                            <button
                              key={th.id}
                              type="button"
                              onClick={() => setSelectedThemeId(th.id)}
                              className={cn(
                                'flex items-center gap-2 p-2 rounded-xl border transition-all text-left',
                                isSelected
                                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs font-bold'
                                  : 'border-border hover:border-primary/40'
                              )}
                            >
                              <div
                                className="size-5 rounded-full shrink-0 border border-white/20 shadow-xs"
                                style={{ background: th.bgGradient }}
                              />
                              <span className="text-xs font-bold text-foreground truncate">{translatedThemeName}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Next to Step 2 Button */}
                    <div className="pt-2">
                      <Button
                        type="button"
                        onClick={() => {
                          setStep(2)
                          if (typeof window !== 'undefined') {
                            window.scrollTo({ top: 120, behavior: 'smooth' })
                          }
                        }}
                        className="w-full h-12 rounded-2xl font-black text-sm bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                      >
                        <span>{t('btnNext') || 'Next'}</span>
                        <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: PERSONAL & CONTACT DETAILS ── */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                      <label className={cn("text-xs font-extrabold uppercase tracking-wider text-muted-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('contactDetailsSection') || 'Contact & Business Details'}
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('fullNameLabel') || 'Full Name *'}</label>
                          <Input
                            id="field-fullName"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value)
                              if (errors.fullName) setErrors({ ...errors, fullName: '' })
                            }}
                            placeholder={t('fullNamePlaceholder') || 'e.g. Dr. Zaryab Malik'}
                            className={cn('rounded-xl', errors.fullName && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.fullName && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('jobTitleLabel') || 'Job Title / Designation *'}</label>
                          <Input
                            id="field-title"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value)
                              if (errors.title) setErrors({ ...errors, title: '' })
                            }}
                            placeholder={t('jobTitlePlaceholder') || 'e.g. Chief Executive Officer'}
                            className={cn('rounded-xl', errors.title && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.title && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.title}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('companyLabel') || 'Company / Clinic / Brand Name'}</label>
                          <Input
                            id="field-company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder={t('companyPlaceholder') || 'e.g. Malik Global Enterprises'}
                            className="rounded-xl"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('phoneLabel') || 'Phone Number *'}</label>
                          <Input
                            id="field-phone"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              if (errors.phone) setErrors({ ...errors, phone: '' })
                            }}
                            placeholder={t('phonePlaceholder') || 'e.g. +92 300 1234567'}
                            className={cn('rounded-xl', errors.phone && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.phone && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('whatsAppLabel') || 'WhatsApp Number'}</label>
                          <Input
                            id="field-whatsapp"
                            value={whatsapp}
                            onChange={(e) => {
                              setWhatsapp(e.target.value)
                              if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' })
                            }}
                            placeholder={t('whatsAppPlaceholder') || 'e.g. +92 300 1234567'}
                            className={cn('rounded-xl', errors.whatsapp && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.whatsapp && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.whatsapp}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('emailLabel') || 'Email Address'}</label>
                          <Input
                            id="field-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (errors.email) setErrors({ ...errors, email: '' })
                            }}
                            placeholder={t('emailPlaceholder') || 'e.g. contact@malikglobal.com'}
                            className={cn('rounded-xl', errors.email && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.email && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('websiteLabel') || 'Website URL'}</label>
                          <Input
                            id="field-website"
                            value={website}
                            onChange={(e) => {
                              setWebsite(e.target.value)
                              if (errors.website) setErrors({ ...errors, website: '' })
                            }}
                            placeholder={t('websitePlaceholder') || 'e.g. malikglobal.com'}
                            className={cn('rounded-xl', errors.website && 'border-rose-500 ring-1 ring-rose-500/30')}
                          />
                          {errors.website && (
                            <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                              <AlertCircle className="size-3" /> {errors.website}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('googleMapsLabel') || 'Google Maps Location Link'}</label>
                          <Input
                            id="field-mapLink"
                            value={mapLink}
                            onChange={(e) => setMapLink(e.target.value)}
                            placeholder={t('googleMapsPlaceholder') || 'e.g. https://maps.google.com/...'}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('officeAddressLabel') || 'Office / Clinic Address'}</label>
                        <Input
                          id="field-address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={t('officeAddressPlaceholder') || 'e.g. Suite 402, Blue Area, Islamabad'}
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('shortBioLabel') || 'Short Professional Bio / Services'}</label>
                        <Textarea
                          id="field-bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder={t('shortBioPlaceholder') || 'Write a brief intro about your services, clinic, or business...'}
                          rows={3}
                          className="rounded-xl text-xs"
                        />
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <label className={cn("text-xs font-bold text-foreground block", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>{t('avatarUrlLabel') || 'Profile Image URL (Optional)'}</label>
                        <Input
                          id="field-avatar"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                          placeholder={t('avatarUrlPlaceholder') || 'https://example.com/your-image.jpg'}
                          className="rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    {/* Step 2 Bottom Navigation (Back + Submit) */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setStep(1)
                          if (typeof window !== 'undefined') {
                            window.scrollTo({ top: 120, behavior: 'smooth' })
                          }
                        }}
                        className="h-12 px-6 rounded-2xl font-bold text-sm border-border flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back'}</span>
                      </Button>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-2xl font-black text-sm bg-emerald-700 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-950/20 active:scale-98 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Sparkles className="size-4 animate-spin" />
                            <span>{t('creatingCardBtn') || 'Creating Card...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('generateCardBtn') || 'Generate Live Digital Visiting Card'}</span>
                            <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Live Preview Column */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="text-center">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                    {t('livePreviewTitle') || 'Live Real-Time Preview'}
                  </span>
                </div>
                <VisitingCardView data={previewData} showShareBtn={false} />
              </div>
            </div>
          )}

        {/* Premium Guide Overview Card */}
        <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-left space-y-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3.5" /> {t('vcardOverviewBadge') || 'vCard Builder Overview'}
            </span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-extrabold text-foreground tracking-tight ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
            {t('smartDigitalBusinessCardsTitle') || 'Smart Digital Business Cards & Executive vCard Builder'}
          </h2>
          <p className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}`}>
            {t('smartDigitalBusinessCardsDesc') || 'Create smart digital business cards with Cardzy. Share your contact info, social links, WhatsApp, and Google Maps office pins with one tap. Save money on paper cards and network faster.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
                {t('oneTapVCardDownloadTitle') || 'One-Tap vCard Download'}
              </h3>
              <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('oneTapVCardDownloadDesc') || 'Allow clients and prospects to save your phone number, email, address, and website directly to their smartphone contacts with one click.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
                {t('dynamicQrCodeSharingTitle') || 'Dynamic QR Code Sharing'}
              </h3>
              <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('dynamicQrCodeSharingDesc') || 'Generate high-resolution scannable QR codes for your digital visiting card to feature on physical print materials, email signatures, and badges.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
              <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
                {t('zeroPrintingExpenseTitle') || 'Zero Printing Expense'}
              </h3>
              <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('zeroPrintingExpenseDesc') || 'Update your designation, phone number, or company address anytime without spending thousands on reprinting traditional paper cards.'}
              </p>
            </div>
          </div>
        </section>
    </div>
  )
}
