'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
  Camera,
  X,
} from 'lucide-react'
import { CardQrCode } from '@/components/jashn/qr-code'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import type { VisitingCardCategory, VisitingCard } from '@/lib/jashn/types'
import { VISITING_CARD_CATEGORIES, VISITING_CARD_THEMES } from '@/lib/jashn/visiting-card-themes'
import { VisitingCardView, getInitials } from '@/components/jashn/visiting-card'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { cn, validateWhatsAppNumber, isPageReload } from '@/lib/utils'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function CreateVisitingCardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editSlug = searchParams.get('edit')

  const { t, lang, setLang } = useLang()
  const { createVisitingCard, updateVisitingCard, getVisitingCard, showToast } = useJashn()
  const isUrdu = lang === 'ur' || lang === 'ar'

  // Step 1: Contact Details (Data Entry) -> Step 2: Theme & Style
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

  const draftKey = editSlug ? `cardzy_draft_vcard_edit_${editSlug}` : 'cardzy_draft_vcard'
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)

  // Listen to beforeunload to detect page refresh/reload reliably
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem('__cardzy_reloading__', '1')
        if (!editSlug) {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_vcard')
        }
      } catch {}
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [draftKey, editSlug])

  // 1. Initial Load: Restore draft or fetch edit record
  useEffect(() => {
    let isCancelled = false
    async function initData() {
      const isReload = isPageReload() || (typeof window !== 'undefined' && sessionStorage.getItem('__cardzy_reloading__') === '1')
      // Clean up legacy entries and reload flag
      try {
        sessionStorage.removeItem('__cardzy_reloading__')
        localStorage.removeItem(draftKey)
        localStorage.removeItem('cardzy_draft_vcard')
      } catch {}

      // If user refreshed the creation page (and not editing an existing card), clear draft and reset all fields
      if (!editSlug && isReload) {
        try {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_vcard')
        } catch {}
        if (!isCancelled) {
          setFullName('')
          setTitle('')
          setCompany('')
          setPhone('')
          setWhatsapp('')
          setEmail('')
          setWebsite('')
          setAddress('')
          setMapLink('')
          setBio('')
          setAvatarUrl('')
          setStep(1)
          setIsInitialLoaded(true)
        }
        return
      }

      if (editSlug) {
        let loadedData: any = null
        try {
          const draftJson = typeof window !== 'undefined' ? sessionStorage.getItem(draftKey) : null
          if (draftJson) loadedData = JSON.parse(draftJson)
        } catch {}

        if (!loadedData) {
          let cardToEdit = getVisitingCard(editSlug!)
          if (!cardToEdit) {
            const activeDb = getFirebaseDb() || db
            if (isFirebaseConfigured && activeDb) {
              try {
                const docSnap = await getDoc(doc(activeDb, 'visitingCards', editSlug!))
                if (docSnap.exists()) {
                  cardToEdit = docSnap.data() as VisitingCard
                }
              } catch (e) {
                console.error('Error fetching vcard for edit:', e)
              }
            }
          }
          if (cardToEdit) loadedData = cardToEdit
        }

        if (loadedData && !isCancelled) {
          if (loadedData.fullName !== undefined) setFullName(loadedData.fullName)
          if (loadedData.title !== undefined) setTitle(loadedData.title)
          if (loadedData.company !== undefined) setCompany(loadedData.company)
          if (loadedData.phone !== undefined) setPhone(loadedData.phone)
          if (loadedData.whatsapp !== undefined) setWhatsapp(loadedData.whatsapp)
          if (loadedData.email !== undefined) setEmail(loadedData.email)
          if (loadedData.website !== undefined) setWebsite(loadedData.website)
          if (loadedData.address !== undefined) setAddress(loadedData.address)
          if (loadedData.mapLink !== undefined) setMapLink(loadedData.mapLink)
          if (loadedData.bio !== undefined) setBio(loadedData.bio)
          if (loadedData.avatarUrl !== undefined) setAvatarUrl(loadedData.avatarUrl)
          if (loadedData.category) setSelectedCategory(loadedData.category)
          if (loadedData.themeId) setSelectedThemeId(loadedData.themeId)
          if (loadedData.language) setLang(loadedData.language)
          if (loadedData.step) setStep(loadedData.step as 1 | 2)
        }
      } else {
        try {
          const draftJson = typeof window !== 'undefined' ? sessionStorage.getItem(draftKey) : null
          if (draftJson) {
            const d = JSON.parse(draftJson)
            if (d && typeof d === 'object' && !isCancelled) {
              if (d.fullName !== undefined) setFullName(d.fullName)
              if (d.title !== undefined) setTitle(d.title)
              if (d.company !== undefined) setCompany(d.company)
              if (d.phone !== undefined) setPhone(d.phone)
              if (d.whatsapp !== undefined) setWhatsapp(d.whatsapp)
              if (d.email !== undefined) setEmail(d.email)
              if (d.website !== undefined) setWebsite(d.website)
              if (d.address !== undefined) setAddress(d.address)
              if (d.mapLink !== undefined) setMapLink(d.mapLink)
              if (d.bio !== undefined) setBio(d.bio)
              if (d.avatarUrl !== undefined) setAvatarUrl(d.avatarUrl)
              if (d.selectedCategory) setSelectedCategory(d.selectedCategory)
              if (d.selectedThemeId) setSelectedThemeId(d.selectedThemeId)
              if (d.step) setStep(d.step as 1 | 2)
            }
          }
        } catch {}
      }
      if (!isCancelled) setIsInitialLoaded(true)
    }

    initData()
    return () => {
      isCancelled = true
    }
  }, [editSlug, getVisitingCard, setLang, draftKey])

  // 2. Auto-save draft on every change (session-only for back/forward navigation flow)
  useEffect(() => {
    if (!isInitialLoaded || typeof window === 'undefined') return
    const draftData = {
      step,
      selectedCategory,
      selectedThemeId,
      fullName,
      title,
      company,
      phone,
      whatsapp,
      email,
      website,
      address,
      mapLink,
      bio,
      avatarUrl,
      lang,
    }
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draftData))
    } catch {}
  }, [
    isInitialLoaded,
    draftKey,
    step,
    selectedCategory,
    selectedThemeId,
    fullName,
    title,
    company,
    phone,
    whatsapp,
    email,
    website,
    address,
    mapLink,
    bio,
    avatarUrl,
    lang,
  ])

  // 3. Browser Back / PopState support
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.cardzyStep === 'number') {
        setStep(e.state.cardzyStep as 1 | 2)
      } else {
        setStep(1)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const changeStep = (nextStep: 1 | 2) => {
    setStep(nextStep)
    if (typeof window !== 'undefined') {
      window.history.pushState({ cardzyStep: nextStep }, '', window.location.href)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  // Auto-normalize website URL
  const formatWebsiteUrl = (url: string) => {
    let clean = url.trim()
    if (!clean) return ''
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      return `https://${clean}`
    }
    return clean
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Photo size must be less than 5MB', 'error')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string)
      showToast('Profile photo uploaded! ✨', 'info')
    }
    reader.readAsDataURL(file)
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

  const previewData: Partial<VisitingCard> = {
    fullName: fullName.trim() || '',
    title: title.trim() || '',
    company: company.trim() || '',
    category: selectedCategory,
    phone: phone.trim() || '',
    whatsapp: whatsapp.trim() || phone.trim() || '',
    email: email.trim() || '',
    website: website.trim() ? formatWebsiteUrl(website) : '',
    address: address.trim() || '',
    mapLink: mapLink.trim() || '',
    bio: bio.trim() || '',
    avatarUrl: avatarUrl.trim(),
    themeId: selectedThemeId,
    language: lang,
  }

  const handleProceedToTheme = () => {
    const errsMap = runValidation()
    setErrors(errsMap)
    const errKeys = Object.keys(errsMap)
    if (errKeys.length > 0) {
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
    changeStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errsMap = runValidation()
    setErrors(errsMap)
    const errKeys = Object.keys(errsMap)
    if (errKeys.length > 0) {
      changeStep(1)
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
      if (editSlug) {
        await updateVisitingCard(editSlug, {
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
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('cardUpdatedSuccess') || 'Visiting Card Updated Successfully! 🎉', 'success')
        router.push(`/v/${editSlug}?mode=sender`)
      } else {
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
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('visitingCardCreatedSuccess', 'Digital Visiting Card Created Successfully! 🎉'), 'success')
        router.push(`/v/${card.slug}?mode=sender`)
      }
    } catch (err: any) {
      console.error(err)
      showToast(err?.message || 'Failed to save visiting card. Please try again.', 'error')
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
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      {/* Universal Studio Mode Switcher */}
      <div className="text-center mb-6">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs">
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            💌 {t('studioTabWish', 'Wish Cards')}
          </Link>
          <Link
            href="/create-invitation"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            🎉 {t('studioTabInvite', 'Invitations')}
          </Link>
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            🪄 {t('studioTabMagic', 'Magic Links')}
          </Link>
          <div
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs bg-[#7B0D1E]"
          >
            <span>📇</span>
            <span>{t('studioTabVCard', 'Visiting Cards')}</span>
          </div>
        </div>
      </div>

      {createdCard ? (
        /* Fallback Created Result View (if rendered directly) */
        <div className="max-w-2xl mx-auto space-y-4 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="size-14 rounded-full bg-[#7B0D1E]/10 text-[#7B0D1E] mx-auto flex items-center justify-center">
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
                className="w-full sm:w-auto h-12 px-6 rounded-2xl font-bold bg-[#7B0D1E] hover:bg-[#630A18] text-white shrink-0"
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
                className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card hover:bg-muted font-bold text-sm text-foreground shadow-sm"
              >
                <span>{t('viewPublicLiveCard') || 'View Sender Dashboard'}</span>
                <ExternalLink className="size-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setShowShareModal(true)}
              className="w-full h-12 rounded-2xl border border-[#7B0D1E]/40 bg-[#7B0D1E]/10 hover:bg-[#7B0D1E]/20 text-[#7B0D1E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
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
                  phone: createdCard.phone,
                  email: createdCard.email,
                  website: createdCard.website,
                  address: createdCard.address,
                  avatarUrl: createdCard.avatarUrl,
                }}
                onClose={() => setShowShareModal(false)}
              />
            )}

            {/* Barcode & Scannable QR Code Section */}
            <div className="pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-[#7B0D1E] dark:text-rose-400 uppercase tracking-wider">
                Digital Visiting Card Barcode / QR Code
              </span>
              <CardQrCode slug={createdCard.slug} cardType="v" size={160} showDownloadBtn={true} />
            </div>

            <button
              onClick={() => setCreatedCard(null)}
              className="w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground pt-4 underline cursor-pointer"
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
                onClick={() => changeStep(1)}
                className={cn(
                  'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer',
                  step === 1
                    ? 'bg-[#7B0D1E] text-white shadow-sm font-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                )}
              >
                <User className="size-3.5" />
                <span>{t('vcardStepContact') || '1. Contact Details'}</span>
              </button>
              <button
                type="button"
                onClick={handleProceedToTheme}
                className={cn(
                  'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer',
                  step === 2
                    ? 'bg-[#7B0D1E] text-white shadow-sm font-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                )}
              >
                <Palette className="size-3.5" />
                <span>{t('vcardStepStyle') || '2. Theme & Style'}</span>
              </button>
            </div>

            {/* ── STEP 1: CONTACT DETAILS (FIRST DATA ENTRY) ── */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                  <h3
                    className={cn(
                      'text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5',
                      lang === 'ur' || lang === 'ar' ? 'text-right flex-row-reverse font-urdu' : 'text-left'
                    )}
                  >
                    <User className="size-4" /> {t('contactDetailsSection') || '1. CONTACT & BUSINESS DETAILS'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('fullNameLabel') || 'Full Name *'}
                      </label>
                      <input
                        id="field-fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value)
                          if (errors.fullName) setErrors({ ...errors, fullName: '' })
                        }}
                        placeholder={t('fullNamePlaceholder') || 'e.g. Dr. Zaryab Malik'}
                        dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                        className={cn(
                          'w-full rounded-2xl border p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-all shadow-xs',
                          errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-[#7B0D1E]',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      />
                      {errors.fullName && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('jobTitleLabel') || 'Job Title / Designation *'}
                      </label>
                      <input
                        id="field-title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                          if (errors.title) setErrors({ ...errors, title: '' })
                        }}
                        placeholder={t('jobTitlePlaceholder') || 'e.g. Chief Executive Officer'}
                        dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                        className={cn(
                          'w-full rounded-2xl border p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-all shadow-xs',
                          errors.title ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-[#7B0D1E]',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      />
                      {errors.title && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.title}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('companyLabel') || 'Company / Clinic / Brand Name'}
                      </label>
                      <input
                        id="field-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t('companyPlaceholder') || 'e.g. Malik Global Enterprises'}
                        dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                        className={cn(
                          'w-full rounded-2xl border border-input p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all shadow-xs',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      />
                    </div>

                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('phoneLabel') || 'Phone / WhatsApp Number *'}
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          if (errors.phone) setErrors({ ...errors, phone: '' })
                        }}
                        placeholder={t('phonePlaceholder') || 'e.g. +92 300 1234567'}
                        dir="ltr"
                        className={cn(
                          'w-full rounded-2xl border p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-all shadow-xs',
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-[#7B0D1E]'
                        )}
                      />
                      {errors.phone && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('emailLabel') || 'Email Address'}
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors({ ...errors, email: '' })
                        }}
                        placeholder={t('emailPlaceholder') || 'e.g. contact@malikglobal.com'}
                        dir="ltr"
                        className={cn(
                          'w-full rounded-2xl border p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-all shadow-xs',
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-[#7B0D1E]'
                        )}
                      />
                      {errors.email && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                        )}
                      >
                        {t('websiteLabel') || 'Website URL'}
                      </label>
                      <input
                        id="field-website"
                        type="text"
                        value={website}
                        onChange={(e) => {
                          setWebsite(e.target.value)
                          if (errors.website) setErrors({ ...errors, website: '' })
                        }}
                        placeholder={t('websitePlaceholder') || 'e.g. malikglobal.com'}
                        dir="ltr"
                        className={cn(
                          'w-full rounded-2xl border p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-all shadow-xs',
                          errors.website ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-[#7B0D1E]'
                        )}
                      />
                      {errors.website && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.website}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Single Clean Full Address String Input */}
                  <div className="pt-1">
                    <label
                      className={cn(
                        'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                        lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                      )}
                    >
                      {t('businessAddress') || 'Full Address (Street, City, District / Office)'}
                    </label>
                    <input
                      id="field-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('officeAddressPlaceholder') || 'e.g. Suite 402, Blue Area, Islamabad'}
                      dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                      className={cn(
                        'w-full rounded-2xl border border-input p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all shadow-xs',
                        lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                      )}
                    />
                  </div>

                  <div className="pt-1">
                    <label
                      className={cn(
                        'text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5',
                        lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                      )}
                    >
                      {t('shortBioLabel') || 'Short Professional Bio / Services'}
                    </label>
                    <textarea
                      id="field-bio"
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={t('shortBioPlaceholder') || 'Write a brief intro about your services, clinic, or business...'}
                      dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                      className={cn(
                        'w-full rounded-2xl border border-input p-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all shadow-xs leading-relaxed',
                        lang === 'ur' || lang === 'ar' ? 'text-right font-urdu' : 'text-left'
                      )}
                    />
                  </div>

                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className={cn(
                          'text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5',
                          lang === 'ur' || lang === 'ar' ? 'text-right flex-row-reverse font-urdu' : 'text-left'
                        )}
                      >
                        <Camera className="size-4 text-[#7B0D1E]" />
                        <span>{t('customCardPhotoLabel') || 'Profile / Business Photo (Optional)'}</span>
                      </label>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          className="text-[11px] text-red-500 font-bold hover:underline cursor-pointer"
                        >
                          {t('removePhotoBtn') || 'Remove Photo'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 rounded-2xl border border-input bg-background px-4 py-2.5 text-xs font-bold hover:bg-muted cursor-pointer transition-all shadow-xs">
                        <Camera className="size-4 text-[#7B0D1E]" />
                        <span>{avatarUrl ? (t('changePhoto') || 'Change Photo') : (t('uploadPhoto') || 'Upload Photo')}</span>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                      {avatarUrl ? (
                        <div className="relative size-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={avatarUrl} alt="Avatar Profile Preview" className="size-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                          <div className="size-10 rounded-full border-2 border-dashed border-border flex items-center justify-center font-black text-xs text-[#7B0D1E] bg-muted/60">
                            {getInitials(fullName)}
                          </div>
                          <span className="text-[11px] font-medium">(Default Initials: {getInitials(fullName)})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 1 Bottom Button (Proceed to Theme & Style) */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={handleProceedToTheme}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('btnNext') || 'Next'}</span>
                    <ArrowRight className={cn('size-4', isUrdu && 'rotate-180')} />
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 2: THEME & STYLE PICKER (COLOR & CATEGORY) ── */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {/* 1. Category Selection */}
                <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                  <h3
                    className={cn(
                      'text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5',
                      isUrdu ? 'text-right flex-row-reverse font-urdu' : 'text-left'
                    )}
                  >
                    <Building2 className="size-4" /> {t('selectCategorySection') || '1. SELECT INDUSTRY / PROFESSION CATEGORY'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {VISITING_CARD_CATEGORIES.map((cat) => {
                      const catKey =
                        cat.id === 'business'
                          ? 'catCorporate'
                          : cat.id === 'creative'
                          ? 'catTech'
                          : cat.id === 'medical'
                          ? 'catMedical'
                          : cat.id === 'legal'
                          ? 'catLegal'
                          : cat.id === 'real-estate'
                          ? 'catRealEstate'
                          : cat.id === 'beauty'
                          ? 'catFashion'
                          : cat.id === 'services'
                          ? 'catServices'
                          : ''
                      const translatedLabel = catKey ? t(catKey) : cat.label
                      const isSelected = selectedCategory === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={cn(
                            'flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs',
                            isSelected
                              ? 'border-[#7B0D1E] bg-[#7B0D1E]/10 text-[#7B0D1E] font-bold ring-2 ring-[#7B0D1E]/20'
                              : 'border-border bg-card hover:border-[#7B0D1E]/40 text-muted-foreground'
                          )}
                        >
                          <span
                            className={cn(
                              'size-2.5 rounded-full shrink-0',
                              isSelected ? 'bg-[#7B0D1E]' : 'bg-muted-foreground/40'
                            )}
                          />
                          <span className="text-xs font-bold text-foreground truncate">{translatedLabel}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. Theme Selection */}
                <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                  <h3
                    className={cn(
                      'text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5',
                      isUrdu ? 'text-right flex-row-reverse font-urdu' : 'text-left'
                    )}
                  >
                    <Palette className="size-4" /> {t('selectThemeSection') || '2. SELECT CARD STYLE & COLORS'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {VISITING_CARD_THEMES.map((th) => {
                      const styleKey =
                        th.id === 'executive-gold'
                          ? 'styleExecutiveGold'
                          : th.id === 'tech-dark'
                          ? 'styleCyberTech'
                          : th.id === 'emerald-luxury'
                          ? 'styleRoyalEmerald'
                          : th.id === 'corporate-blue'
                          ? 'styleCorporateNavy'
                          : th.id === 'rose-gold-elegance'
                          ? 'styleRoseGold'
                          : th.id === 'minimal-clean'
                          ? 'styleCleanPearl'
                          : th.id === 'obsidian-gold'
                          ? 'styleObsidianGold'
                          : th.id === 'royal-amethyst'
                          ? 'styleRoyalAmethyst'
                          : ''
                      const translatedThemeName = styleKey ? (t(styleKey as any) || th.name) : th.name
                      const isSelected = selectedThemeId === th.id
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSelectedThemeId(th.id)}
                          className={cn(
                            'flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left cursor-pointer shadow-xs',
                            isSelected
                              ? 'border-[#7B0D1E] bg-[#7B0D1E]/10 ring-2 ring-[#7B0D1E]/20 font-bold'
                              : 'border-border hover:border-[#7B0D1E]/40 bg-card'
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

                {/* Step 2 Bottom Navigation (Back to Details + Submit / Update) */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => changeStep(1)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className={cn('size-4', isUrdu && 'rotate-180')} />
                    <span>{t('btnBack') || 'Back'}</span>
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-xl shadow-[#7B0D1E]/20 active:scale-98 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="size-4 animate-spin" />
                        <span>{editSlug ? (t('saving') || 'Saving...') : (t('finishingCardBtn') || 'Finishing...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{editSlug ? (t('btnUpdate') || 'Update') : (t('btnFinish') || 'Finish 🚀')}</span>
                        <ArrowRight className={cn('size-4', isUrdu && 'rotate-180')} />
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
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#7B0D1E] flex items-center justify-center gap-1.5">
                <Sparkles className="size-3.5" />
                <span>{t('livePreviewTitle') || 'Live Real-Time Preview'}</span>
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
