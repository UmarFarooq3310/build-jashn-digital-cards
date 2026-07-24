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
  Check,
  Share2,
  Copy,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useJashn } from '@/lib/jashn/store'
import { useLang, LANGUAGES } from '@/lib/lang/context'
import type { Language, VisitingCardCategory, VisitingCard } from '@/lib/jashn/types'
import { VISITING_CARD_CATEGORIES, VISITING_CARD_THEMES } from '@/lib/jashn/visiting-card-themes'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { cn } from '@/lib/utils'

export default function CreateVisitingCardPage() {
  const { t, lang, setLang } = useLang()
  const { createVisitingCard, showToast } = useJashn()

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

  // Validation Error States
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCard, setCreatedCard] = useState<VisitingCard | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Auto-normalize website URL
  const formatWebsiteUrl = (url: string) => {
    let clean = url.trim()
    if (!clean) return ''
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      return `https://${clean}`
    }
    return clean
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (minimum 2 characters)'
    }

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Job Title / Role is required'
    }

    // Phone validation
    const cleanPhone = phone.trim()
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+0-9\s-]{7,18}$/.test(cleanPhone)) {
      newErrors.phone = 'Invalid phone number format (e.g. +92 300 1234567)'
    }

    // Email validation (optional but must be valid if provided)
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@domain.com)'
      }
    }

    // Website validation (optional)
    if (website.trim()) {
      const normUrl = formatWebsiteUrl(website)
      try {
        new URL(normUrl)
      } catch (e) {
        newErrors.website = 'Invalid website URL format'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const previewData: Partial<VisitingCard> = {
    fullName: fullName.trim() || (lang === 'ur' ? 'ڈاکٹر زریاب ملک' : 'Dr. Zaryab Malik'),
    title: title.trim() || (lang === 'ur' ? 'چیف ایگزیکٹو آفیسر' : 'Chief Executive Officer'),
    company: company.trim() || (lang === 'ur' ? 'ملک گلوبل انٹرپرائزز' : 'Malik Global Enterprises'),
    category: selectedCategory,
    phone: phone.trim() || '+92 300 1234567',
    whatsapp: whatsapp.trim() || phone.trim() || '+92 300 1234567',
    email: email.trim() || 'contact@malikglobal.com',
    website: website.trim() ? formatWebsiteUrl(website) : 'malikglobal.com',
    address: address.trim() || 'Suite 402, Blue Area, Islamabad',
    mapLink: mapLink.trim() || 'https://maps.google.com',
    bio: bio.trim() || 'Leading digital innovations & global business solutions.',
    themeId: selectedThemeId,
    language: lang,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      showToast('Please correct the highlighted errors in the form', 'error')
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
        themeId: selectedThemeId,
        language: lang,
      })

      setCreatedCard(card)
      showToast('Digital Visiting Card Created Successfully!', 'success')
    } catch (err) {
      console.error(err)
      showToast('Failed to create visiting card. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyLink = () => {
    if (!createdCard) return
    const liveUrl = `${window.location.origin}/v/${createdCard.slug}`
    navigator.clipboard.writeText(liveUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-10 px-4">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header Banner */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
              <CreditCard className="size-4 text-emerald-600" />
              <span>{t('createVisitingCard') || 'Digital Visiting Cards'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              {t('createInteractiveVisitingCardTitle') || 'Create Your Interactive Digital Business Card'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t('createInteractiveVisitingCardSubtitle') || 'Share your digital business card on WhatsApp, Email, or Social Media. Includes 1-click Save Contact (.vcf), Google Maps directions, and 18 language support!'}
            </p>
          </div>

          {createdCard ? (
            /* Created Result View */
            <div className="max-w-2xl mx-auto space-y-6 bg-card border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
                  >
                    <MessageSquare className="size-4" />
                    <span>{t('shareOnWhatsApp') || 'Share on WhatsApp'}</span>
                  </a>

                  <Link
                    href={`/v/${createdCard.slug}`}
                    target="_blank"
                    className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card hover:bg-muted font-bold text-sm text-foreground shadow-sm"
                  >
                    <span>{t('viewPublicLiveCard') || 'View Public Live Card'}</span>
                    <ExternalLink className="size-4" />
                  </Link>
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
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">

                {/* 1. Category Selection */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                    {t('selectCategorySection') || '1. Select Industry / Profession Category'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {VISITING_CARD_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          'flex flex-col items-start gap-1 p-3.5 rounded-2xl border text-left transition-all',
                          selectedCategory === cat.id
                            ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold ring-2 ring-primary/20'
                            : 'border-border bg-card hover:border-primary/40 text-muted-foreground'
                        )}
                      >
                        <span className="text-xs font-bold text-foreground">{cat.label}</span>
                        <span className="text-[10px] opacity-75 line-clamp-1">{cat.tagline.split(',')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Theme Selection */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                    {t('selectThemeSection') || '2. Select Card Style & Colors'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {VISITING_CARD_THEMES.map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setSelectedThemeId(th.id)}
                        className={cn(
                          'flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left',
                          selectedThemeId === th.id
                            ? 'border-primary ring-2 ring-primary/20 shadow-md font-bold'
                            : 'border-border hover:border-primary/40'
                        )}
                      >
                        <div
                          className="size-6 rounded-full shrink-0 border border-white/20 shadow-sm"
                          style={{ background: th.bgGradient }}
                        />
                        <span className="text-xs font-bold text-foreground line-clamp-1">{th.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Personal & Contact Details */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                    {t('contactDetailsSection') || '3. Contact & Business Details'}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('fullNameLabel') || 'Full Name *'}</label>
                      <Input
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
                      <label className="text-xs font-bold text-foreground">{t('jobTitleLabel') || 'Job Title / Designation *'}</label>
                      <Input
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('companyLabel') || 'Company / Clinic / Brand Name'}</label>
                      <Input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t('companyPlaceholder') || 'e.g. Malik Global Enterprises'}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('phoneLabel') || 'Phone Number *'}</label>
                      <Input
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('whatsAppLabel') || 'WhatsApp Number'}</label>
                      <Input
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder={t('whatsAppPlaceholder') || 'e.g. +92 300 1234567'}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('emailLabel') || 'Email Address'}</label>
                      <Input
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">{t('websiteLabel') || 'Website URL'}</label>
                      <Input
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
                      <label className="text-xs font-bold text-foreground">{t('googleMapsLabel') || 'Google Maps Location Link'}</label>
                      <Input
                        value={mapLink}
                        onChange={(e) => setMapLink(e.target.value)}
                        placeholder={t('googleMapsPlaceholder') || 'e.g. https://maps.google.com/...'}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-foreground">{t('officeAddressLabel') || 'Office / Clinic Address'}</label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('officeAddressPlaceholder') || 'e.g. Suite 402, Blue Area, Islamabad'}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-foreground">{t('shortBioLabel') || 'Short Professional Bio / Services'}</label>
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={t('shortBioPlaceholder') || 'Write a brief intro about your services, clinic, or business...'}
                      rows={3}
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl font-black text-base bg-emerald-700 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-950/20 active:scale-98 transition-all"
                >
                  <span>{isSubmitting ? (t('creatingCardBtn') || 'Creating Card...') : (t('generateCardBtn') || 'Generate Live Digital Visiting Card')}</span>
                  <ArrowRight className="size-5" />
                </Button>
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
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
