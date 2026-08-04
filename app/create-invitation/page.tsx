'use client'

import '@/app/invitation-themes-animations.css'
import '@/app/invitation-themes-wedding.css'
import '@/app/invitation-themes-religious.css'
import '@/app/invitation-themes-social.css'
import '@/app/invitation-themes-professional.css'
import '@/app/invitation-themes-premium.css'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles, Grid, Loader2, AlertCircle, Heart, Check, Edit3, Palette, Eye, Camera, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { ThemePicker } from '@/components/jashn/theme-picker'
import { BorderPicker, BORDERS } from '@/components/jashn/border-picker'
import { THEMES } from '@/lib/jashn/themes'
import { BackgroundPicker } from '@/components/jashn/background-picker'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { InvitationTypePicker } from '@/components/jashn/invitation-type-picker'
import CardAnimationPreview from '@/components/jashn/CardAnimationPreview'
import { useJashn } from '@/lib/jashn/store'
import { INVITATION_TYPES, getInvitationType } from '@/lib/jashn/invitations'
import { getInvitationWordingTemplates, type InvitationWordingTemplate } from '@/lib/jashn/invitation-templates'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

function CreateInvitationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createInvitation, updateInvitation, invitations, isAuthLoading, showToast } = useJashn()
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const editSlug = searchParams.get('edit')

  const [step, setStep] = useState<1 | 2>(1)
  const [typeId, setTypeId] = useState('nikkah')
  const [mobileTab, setMobileTab] = useState<'details' | 'design' | 'preview'>('details')

  const getTodayString = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const getCurrentTimeString = () => {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const [title, setTitle] = useState('')
  const [hostNames, setHostNames] = useState('')
  const [groom, setGroom] = useState('')
  const [bride, setBride] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [city, setCity] = useState('')
  const [mapsLink, setMapsLink] = useState('')
  const [dressCode, setDressCode] = useState('')
  const [notes, setNotes] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [themeId, setThemeId] = useState('mehndi-red')
  const [borderId, setBorderId] = useState('mehndi')
  const [bgVariantId, setBgVariantId] = useState('default')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoUrl2, setPhotoUrl2] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedType = getInvitationType(typeId)
  const isCouple = selectedType?.couple
  const isPro = user?.plan === 'pro' || user?.plan === 'business'

  const wordingTemplates = getInvitationWordingTemplates(typeId, lang)

  function applyWordingTemplate(tmpl: InvitationWordingTemplate) {
    if (!isCouple && tmpl.title) {
      setTitle(tmpl.title)
    }
    if (tmpl.hostNames) setHostNames(tmpl.hostNames)
    if (tmpl.notes) setNotes(tmpl.notes)
    if (tmpl.dressCode) setDressCode(tmpl.dressCode)

    const newErrors = { ...errors }
    delete newErrors.title
    delete newErrors.hostNames
    delete newErrors.notes
    setErrors(newErrors)

    showToast('Pre-written invitation template applied! ✨', 'info')
  }

  // Free creation for everyone - no login required to send invitations

  useEffect(() => {
    if (editSlug) {
      const existing = invitations.find((i) => i.slug === editSlug)
      if (existing) {
        setTypeId(existing.typeId)
        setTitle(existing.title || '')
        setHostNames(existing.hostNames || '')
        setGroom(existing.groom || '')
        setBride(existing.bride || '')
        setDate(existing.date || getTodayString())
        setTime(existing.time || getCurrentTimeString())
        setVenue(existing.venue || '')
        setCity(existing.city || '')
        setMapsLink(existing.mapsLink || '')
        setDressCode(existing.dressCode || '')
        setNotes(existing.notes || '')
        setRsvpPhone(existing.rsvpPhone || '')
        setThemeId(existing.themeId || 'mehndi-red')
        setBorderId(existing.borderId || 'mehndi')
        setBgVariantId(existing.bgVariantId || 'default')
        setPhotoUrl(existing.photoUrl || '')
        setPhotoUrl2(existing.photoUrl2 || '')
        setStep(2)
      }
    } else {
      const typeParam = searchParams.get('type')
      if (typeParam) {
        setTypeId(typeParam)
        setStep(2)
      }
    }
  }, [searchParams, editSlug, invitations])

  function handlePhotoUpload1(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Photo 1 size must be less than 5MB', 'error')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoUrl(reader.result as string)
      showToast('Photo 1 uploaded! ✨', 'info')
    }
    reader.readAsDataURL(file)
  }

  function handlePhotoUpload2(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Photo 2 size must be less than 5MB', 'error')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoUrl2(reader.result as string)
      showToast('Photo 2 uploaded! ✨', 'info')
    }
    reader.readAsDataURL(file)
  }

  if (isAuthLoading) {
    return (
      <div className="flex py-20 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    )
  }

  // Auth protection removed to support guest user creation as requested

  function handleTypeSelect(id: string) {
    setTypeId(id)
    setErrors({})
    setStep(2)
  }

  function runValidation() {
    const errs: Record<string, string> = {}

    if (step === 2) {
      if (isCouple) {
        if (!groom.trim()) {
          errs.groom = t('groomRequired') || 'Groom Name is required'
        }
        if (!bride.trim()) {
          errs.bride = t('brideRequired') || 'Bride Name is required'
        }
      } else {
        if (!title.trim()) {
          errs.title = t('eventTitleRequired') || 'Event Title is required'
        }
      }

      if (!hostNames.trim()) {
        errs.hostNames = t('hostNamesRequired') || 'Host Name(s) is required'
      }

      if (!date.trim()) {
        errs.date = t('eventDateRequired') || 'Event Date is required'
      }

      if (!time.trim()) {
        errs.time = t('eventTimeRequired') || 'Event Time is required'
      }

      if (!venue.trim()) {
        errs.venue = t('venueRequired') || 'Venue is required'
      }

      if (!city.trim()) {
        errs.city = t('cityRequired') || 'City is required'
      }

      if (!rsvpPhone.trim()) {
        errs.rsvpPhone = 'WhatsApp RSVP Phone Number is required'
      } else {
        const cleanedPhone = rsvpPhone.trim().replace(/\s+/g, '')
        if (!/^\+?\d{10,14}$/.test(cleanedPhone)) {
          errs.rsvpPhone = t('invalidPhone') || 'Please enter a valid phone number (e.g. +923001234567)'
        }
      }
    }

    return errs
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    const tempErrors = { ...errors }

    if (field === 'rsvpPhone') {
      if (!value.trim()) {
        tempErrors.rsvpPhone = 'WhatsApp RSVP Phone Number is required'
      } else {
        const cleanedPhone = value.trim().replace(/\s+/g, '')
        if (!/^\+?\d{10,14}$/.test(cleanedPhone)) {
          tempErrors.rsvpPhone = t('invalidPhone') || 'Please enter a valid phone number'
        } else {
          delete tempErrors.rsvpPhone
        }
      }
    } else {
      if (value.trim()) {
        delete tempErrors[field]
      }
    }

    setErrors(tempErrors)
  }

  async function handleFinish() {
    const errs = runValidation()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const firstError = Object.values(errs)[0] || 'Please check your input details.'
      showToast(firstError, 'error')
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setMobileTab('details')
      }
      return
    }

    // Fallback premium themes/borders for non-pro users so anyone can create without signup
    let finalThemeId = themeId
    let finalBorderId = borderId

    const selectedTheme = THEMES.find((t) => t.id === themeId)
    const selectedBorder = BORDERS.find((b) => b.id === borderId)
    if ((selectedTheme?.isPremium || selectedBorder?.isPremium) && !isPro) {
      finalThemeId = 'emerald-classic'
      finalBorderId = 'mehndi'
    }

    const cleanedPhone = rsvpPhone.trim().replace(/\s+/g, '')
    const payload = {
      typeId,
      title: title.trim() || selectedType?.label || 'Event Invitation',
      hostNames: hostNames.trim() || 'Host & Family',
      groom: groom.trim() || (isCouple ? 'Groom' : ''),
      bride: bride.trim() || (isCouple ? 'Bride' : ''),
      date: date || new Date().toISOString().slice(0, 10),
      time: time || '7:00 PM',
      venue: venue.trim() || 'Grand Event Venue',
      city: city.trim() || 'City',
      mapsLink,
      dressCode,
      notes,
      rsvpPhone: cleanedPhone,
      themeId: finalThemeId,
      borderId: finalBorderId,
      bgVariantId,
      photoUrl,
      photoUrl2,
    }

    if (editSlug) {
      await updateInvitation(editSlug, payload)
      router.push(`/i/${editSlug}?mode=sender`)
    } else {
      const inv = await createInvitation(payload)
      router.push(`/i/${inv.slug}?mode=sender`)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-6 text-center">
        {/* Card Studio Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7B0D1E] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md">
            🎉 {t('weddingInvitationTitle') || 'Wedding & Event Invitation'}
          </div>
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs sm:text-sm font-bold text-muted-foreground transition-all hover:border-[#7B0D1E]/40 hover:text-foreground shadow-sm"
          >
            💌 {t('sendAnimatedWishCard') || 'Wish / Greeting Card'}
          </Link>
        </div>



        {/* 2-Step Progress Stepper */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {[
            { s: 1, label: t('stepChooseOccasion') || (lang === 'ur' ? '1. تقریب منتخب کریں' : '1. Choose Occasion') },
            { s: 2, label: t('stepPersonalizeShare') || t('personalizeShare') || (lang === 'ur' ? '2. تفصیلات لکھیں اور شیئر کریں' : '2. Personalize & Share') },
          ].map(({ s, label }) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { setErrors({}); setStep(s as 1 | 2); }}
                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-[#7B0D1E] text-white ring-4 ring-[#7B0D1E]/20 shadow-md'
                    : 'bg-[#7B0D1E]/15 text-[#7B0D1E] hover:bg-[#7B0D1E]/25 cursor-pointer'
                }`}
              >
                {s}
              </button>
              <span className={`text-xs font-semibold ${step === s ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {s < 2 && <span className="text-muted-foreground/40 ml-1">/</span>}
            </div>
          ))}
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-5 mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-semibold text-red-600 flex items-center gap-2 shadow-sm">
          <AlertCircle className="size-4 shrink-0 text-red-600" />
          <span>{t('validationErrorsNotice')}</span>
        </div>
      )}

      {/* 📱 Mobile Tabs (Only visible on Step 2 & Mobile < 1024px) */}
      {step === 2 && (
        <div className="block lg:hidden mb-5">
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-muted/60 p-1.5 border border-border/70 shadow-sm">
            <button
              onClick={() => setMobileTab('details')}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all',
                mobileTab === 'details'
                  ? 'bg-background text-[#7B0D1E] shadow-md border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Edit3 className="size-3.5" />
              <span>{t('tabDetails')}</span>
            </button>

            <button
              onClick={() => setMobileTab('design')}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all',
                mobileTab === 'design'
                  ? 'bg-background text-[#7B0D1E] shadow-md border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Palette className="size-3.5" />
              <span>{t('tabDesign')}</span>
            </button>

            <button
              onClick={() => setMobileTab('preview')}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all relative',
                mobileTab === 'preview'
                  ? 'bg-[#7B0D1E] text-white shadow-md'
                  : 'text-[#7B0D1E] bg-[#7B0D1E]/10 hover:bg-[#7B0D1E]/20'
              )}
            >
              <Eye className="size-3.5" />
              <span>{t('tabPreview')}</span>
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-500 animate-ping" />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                    <Grid className="size-5 text-[#7B0D1E]" /> {t('stepChooseOccasion')}
                  </h2>
                  <span className="text-xs font-medium text-muted-foreground">{t('clickTileToPersonalize')}</span>
                </div>

                <InvitationTypePicker
                  value={typeId}
                  onChange={handleTypeSelect}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Header Selected Event Info */}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#7B0D1E]">
                      {t('selectedOccasion')}
                    </span>
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {t(`type_${selectedType?.id.replace(/-/g, '_')}`) || selectedType?.label}
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="text-xs h-8 px-3 rounded-xl flex items-center gap-1.5"
                  >
                    <Grid className="size-3.5 text-[#7B0D1E]" /> {t('viewOccasions')}
                  </Button>
                </div>

                {/* 📝 Details Tab Content (Mobile details or Desktop always) */}
                <div className={cn(mobileTab !== 'details' && 'hidden lg:block', 'space-y-5 text-left', (lang === 'ur' || lang === 'ar') && 'text-right font-urdu')}>
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5">
                    <Edit3 className="size-4" /> 1. {t('cardDetailsHeading')}
                  </h3>

                  {isCouple ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('groomName') === 'groomName' ? 'Groom Name' : t('groomName')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={groom}
                          onChange={(e) => handleFieldChange('groom', e.target.value, setGroom)}
                          placeholder={t('placeholderGroom')}
                          dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                          className={cn(
                            "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                            errors.groom ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]",
                            (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left"
                          )}
                        />
                        {errors.groom && (
                          <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle className="size-3 shrink-0" /> {errors.groom}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('brideName') === 'brideName' ? 'Bride Name' : t('brideName')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={bride}
                          onChange={(e) => handleFieldChange('bride', e.target.value, setBride)}
                          placeholder={t('placeholderBride')}
                          dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                          className={cn(
                            "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                            errors.bride ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]",
                            (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left"
                          )}
                        />
                        {errors.bride && (
                          <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle className="size-3 shrink-0" /> {errors.bride}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('eventTitle')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => handleFieldChange('title', e.target.value, setTitle)}
                        placeholder={`e.g. ${selectedType?.label || 'Annual Event'}`}
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.title ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.title && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.title}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('hostNamesLabel')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={hostNames}
                      onChange={(e) => handleFieldChange('hostNames', e.target.value, setHostNames)}
                      placeholder={t('placeholderHost')}
                      dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                      className={cn(
                        "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                        errors.hostNames ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                      )}
                    />
                    {errors.hostNames && (
                      <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                        <AlertCircle className="size-3 shrink-0" /> {errors.hostNames}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('eventDateLabel')} *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => handleFieldChange('date', e.target.value, setDate)}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.date ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.date && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('eventTimeLabel')} *
                      </label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => handleFieldChange('time', e.target.value, setTime)}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.time ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.time && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('venueLabel')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={venue}
                        onChange={(e) => handleFieldChange('venue', e.target.value, setVenue)}
                        placeholder={t('placeholderVenue')}
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.venue ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.venue && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.venue}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('cityLabel')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => handleFieldChange('city', e.target.value, setCity)}
                        placeholder={t('placeholderCity')}
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.city ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('rsvpPhoneLabel')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => handleFieldChange('rsvpPhone', e.target.value, setRsvpPhone)}
                      placeholder={t('placeholderRsvpPhone')}
                      className={cn(
                        "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                        errors.rsvpPhone ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                      )}
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {t('rsvpPhoneHelp')}
                    </p>
                    {errors.rsvpPhone && (
                      <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                        <AlertCircle className="size-3 shrink-0" /> {errors.rsvpPhone}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('mapsLinkLabel')}
                      </label>
                      <input
                        type="text"
                        value={mapsLink}
                        onChange={(e) => setMapsLink(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="w-full rounded-2xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all"
                      />
                    </div>
                    <div>
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('dressCodeLabel')}
                      </label>
                      <input
                        type="text"
                        value={dressCode}
                        onChange={(e) => setDressCode(e.target.value)}
                        placeholder={t('placeholderDressCode')}
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className="w-full rounded-2xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all"
                      />
                    </div>
                  </div>

                  {/* 📝 CHOOSE PRE-WRITTEN INVITATION TEMPLATE (Placed on top of Special Notes / Message) */}
                  {wordingTemplates.length > 0 && (
                    <div className="rounded-2xl border border-input bg-card p-4 space-y-2.5 shadow-xs">
                      <label className={cn("text-xs font-bold text-[#7B0D1E] uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                        <Sparkles className="size-4 text-amber-500" /> {t('selectWordingTemplateLabel') || t('choosePrewrittenTemplate') || 'CHOOSE PRE-WRITTEN INVITATION TEMPLATE:'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {wordingTemplates.map((tmpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyWordingTemplate(tmpl)}
                            className="flex items-center gap-1.5 rounded-xl border border-[#7B0D1E]/20 bg-[#7B0D1E]/5 px-3 py-1.5 text-xs font-bold text-[#7B0D1E] hover:bg-[#7B0D1E]/15 transition-all active:scale-95 shadow-xs"
                          >
                            📜 <span>{tmpl.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={cn("mb-1.5 block text-xs font-bold text-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('notesLabel')}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('placeholderNotes')}
                      dir={lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(notes) ? 'rtl' : 'ltr'}
                      className={cn(
                        "w-full rounded-2xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all leading-relaxed",
                        (lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(notes)) && "font-urdu text-base text-right"
                      )}
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="rounded-2xl border border-input bg-card p-4 space-y-3">
                    <label className={cn("text-xs font-bold text-[#7B0D1E] uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                      <Camera className="size-4" /> {isCouple ? t('couplePhotosLabel') : t('eventPhotoLabel')}
                    </label>

                    <div className={cn("grid gap-3", isCouple ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
                      {/* Photo 1 Upload Box */}
                      <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-input bg-background/50 space-y-2 text-center">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          {isCouple ? t('bridePhoto') : t('customCardPhoto')}
                        </span>
                        {photoUrl ? (
                          <div className="relative size-16 rounded-xl overflow-hidden border border-border shadow-sm">
                            <img src={photoUrl} alt="Photo 1 Preview" className="size-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setPhotoUrl('')}
                              className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 transition-all"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ) : null}
                        <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-bold hover:bg-muted cursor-pointer transition-all shadow-xs">
                          <Camera className="size-3.5 text-[#7B0D1E]" />
                          <span>{photoUrl ? t('changePhoto') : t('uploadPhoto')}</span>
                          <input type="file" accept="image/*" onChange={handlePhotoUpload1} className="hidden" />
                        </label>
                      </div>

                      {/* Photo 2 Upload Box (Only for couple invitations e.g. Groom Photo) */}
                      {isCouple ? (
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-input bg-background/50 space-y-2 text-center">
                          <span className="text-[11px] font-semibold text-muted-foreground">
                            {t('groomPhoto')}
                          </span>
                          {photoUrl2 ? (
                            <div className="relative size-16 rounded-xl overflow-hidden border border-border shadow-sm">
                              <img src={photoUrl2} alt="Photo 2 Preview" className="size-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setPhotoUrl2('')}
                                className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 transition-all"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ) : null}
                          <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-bold hover:bg-muted cursor-pointer transition-all shadow-xs">
                            <Camera className="size-3.5 text-[#7B0D1E]" />
                            <span>{photoUrl2 ? t('changePhoto') : t('uploadPhoto')}</span>
                            <input type="file" accept="image/*" onChange={handlePhotoUpload2} className="hidden" />
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* 🎨 Design Tab Content (Mobile design or Desktop always) */}
                <div className={cn(mobileTab !== 'design' && 'hidden lg:block', 'space-y-6 pt-4 border-t border-border')}>
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5">
                    <Palette className="size-4" /> 2. {t('cardStylingHeading')}
                  </h3>

                  <div>
                    <label className={cn("mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('selectTheme')}
                    </label>
                    <ThemePicker
                      value={themeId}
                      onChange={setThemeId}
                      isPro={isPro}
                      onLockedClick={() => router.push('/pricing')}
                    />
                  </div>

                  <div>
                    <label className={cn("mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('selectBorderFrame')}
                    </label>
                    <BorderPicker
                      value={borderId}
                      onChange={setBorderId}
                      isPro={isPro}
                      onLockedClick={() => router.push('/pricing')}
                    />
                  </div>

                  <div>
                    <label className={cn("mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                      {t('selectCardBackgroundStyle')}
                    </label>
                    <BackgroundPicker
                      value={bgVariantId}
                      onChange={setBgVariantId}
                      variants={selectedType?.bgVariants}
                    />
                  </div>
                </div>

                {/* 👁️ Preview Tab Content (Only displayed on Mobile when preview tab active) */}
                <div className={cn(mobileTab !== 'preview' && 'hidden lg:hidden', 'space-y-4 pt-2')}>
                  <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/20 to-card p-4 text-center shadow-md">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5">
                        <Heart className="size-3.5 text-[#7B0D1E] animate-pulse" /> {t('livePreview')}
                      </span>
                    </div>

                    <div className="flex justify-center overflow-hidden py-2">
                      <div className="w-full">
                        <CardAnimationPreview occasionId={typeId} animationKey={typeId} className="max-w-sm mx-auto" roundedClass="rounded-3xl">
                          <InvitationCard
                            data={{
                              typeId,
                              title: title || selectedType?.label || (lang === 'ur' ? 'دعوت نامہ' : 'Invitation'),
                              hostNames: hostNames || (lang === 'ur' ? 'خاندانِ احمد و ملک' : 'The Families of Hassan & Ayesha'),
                              groom: groom || (lang === 'ur' ? 'حسن' : 'Hassan'),
                              bride: bride || (lang === 'ur' ? 'عائشہ' : 'Ayesha'),
                              date: date || '2026-12-14',
                              time: time || '07:00 PM',
                              venue: venue || (lang === 'ur' ? 'پرل کانٹینینٹل، گراں ہال' : 'Pearl Continental, Grand Ballroom'),
                              city: city || (lang === 'ur' ? 'لاہور' : 'Lahore'),
                              dressCode: dressCode || (lang === 'ur' ? 'رواینی شاہی لباس' : 'Traditional Royal / Formal'),
                              notes: notes || (lang === 'ur' ? 'آپ کی آمد ہمارے لیے باعثِ مسرت و افتخار ہوگی۔' : 'Your gracious presence will double our joy and happiness.'),
                              themeId,
                              borderId,
                              bgVariantId,
                              photoUrl,
                              photoUrl2,
                            }}
                          />
                        </CardAnimationPreview>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-6 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto rounded-2xl h-11"
                  >
                    <ArrowLeft className="mr-2 size-4" /> {t('changeEventType')}
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="w-full sm:w-auto bg-[#7B0D1E] hover:bg-[#7B0D1E]/90 text-white font-extrabold h-11 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    {editSlug ? t('saveInvitationBtn') : t('createAndShareBtn')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Right Column — Sticky Live Interactive Preview */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-xl text-center backdrop-blur-md">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center justify-center gap-1.5">
              <Heart className="size-3.5 text-[#7B0D1E] animate-pulse" /> {t('livePreview')}
            </p>
            <div>
              <CardAnimationPreview occasionId={typeId} animationKey={typeId} className="max-w-sm mx-auto" roundedClass="rounded-3xl">
                <InvitationCard
                  data={{
                    typeId,
                    title: title || selectedType?.label || (lang === 'ur' ? 'دعوت نامہ' : 'Invitation'),
                    hostNames: hostNames || (lang === 'ur' ? 'خاندانِ احمد و ملک' : 'The Families of Hassan & Ayesha'),
                    groom: groom || (lang === 'ur' ? 'حسن' : 'Hassan'),
                    bride: bride || (lang === 'ur' ? 'عائشہ' : 'Ayesha'),
                    date: date || '2026-12-14',
                    time: time || '07:00 PM',
                    venue: venue || (lang === 'ur' ? 'پرل کانٹینینٹل، گراں ہال' : 'Pearl Continental, Grand Ballroom'),
                    city: city || (lang === 'ur' ? 'لاہور' : 'Lahore'),
                    dressCode: dressCode || (lang === 'ur' ? 'رواینی شاہی لباس' : 'Traditional Royal / Formal'),
                    notes: notes || (lang === 'ur' ? 'آپ کی آمد ہمارے لیے باعثِ مسرت و افتخار ہوگی۔' : 'Your gracious presence will double our joy and happiness.'),
                    themeId,
                    borderId,
                    bgVariantId,
                    photoUrl,
                    photoUrl2,
                  }}
                />
              </CardAnimationPreview>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Sticky Bottom Action Bar (Fixed at bottom on phone screens when step 2) */}
      {step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden border-t border-border/80 bg-background/95 backdrop-blur-md p-3 shadow-2xl">
          <div className="mx-auto flex max-w-md items-center gap-2">
            {mobileTab !== 'preview' ? (
              <Button
                variant="outline"
                onClick={() => setMobileTab('preview')}
                className="flex-1 rounded-2xl text-xs font-bold h-12 border-[#7B0D1E]/30 text-[#7B0D1E] bg-[#7B0D1E]/5"
              >
                <Eye className="size-4 mr-1 text-[#7B0D1E]" /> {t('tabPreview')}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setMobileTab('details')}
                className="flex-1 rounded-2xl text-xs font-bold h-12"
              >
                <Edit3 className="size-4 mr-1 text-[#7B0D1E]" /> {t('tabDetails')}
              </Button>
            )}

            <Button
              onClick={handleFinish}
              className="flex-[1.5] bg-[#7B0D1E] hover:bg-[#7B0D1E]/90 text-white font-extrabold text-xs h-12 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              {editSlug ? t('saveChanges') : t('createAndShareBtn')}
            </Button>
          </div>
        </div>
      )}

      {/* Premium Guide Overview Card */}
      <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-left space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-3.5" /> {t('invitationFeaturesBadge') || 'Invitation Features'}
          </span>
        </div>
        <h2 className={`text-xl sm:text-2xl font-extrabold text-foreground tracking-tight ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
          {t('royalWeddingInvitationsTitle') || 'Royal 4K Animated Wedding Invitations & Online Nikkah Cards'}
        </h2>
        <p className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}`}>
          {t('royalWeddingInvitationsDesc') || 'Create breathtaking animated digital wedding invitation websites for Nikkah, Mehndi, Barat, Walima, and Save-The-Date celebrations. Features include custom venue pins with Google Maps directions, background music tracks, custom RSVP form with automatic WhatsApp host notifications, and multiday event itineraries.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('liveWhatsappRsvpTitle') || 'Live WhatsApp RSVP Tracking'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('liveWhatsappRsvpDesc') || 'Receive guest attendance confirmations and headcount updates directly in WhatsApp.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('googleMapsVenuePinTitle') || 'Google Maps Venue Pin'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('googleMapsVenuePinDesc') || 'Help guests navigate directly to your marquee or wedding hall with one click.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('multilingualWordingTitle') || 'Multilingual Wording Support'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('multilingualWordingDesc') || 'Explore pre-written Urdu and English wedding wording, Quranic verses, and host protocols.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function CreateInvitationPage() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="py-4 md:py-6 max-w-7xl mx-auto px-4 text-center w-full">
      <h1 className={`text-2xl font-extrabold tracking-tight sm:text-4xl text-[#7B0D1E] mb-2 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
        {t('createDigitalWeddingInvitationsHeader') || 'Create Digital Wedding Invitations'}
      </h1>
      <h2 className={`text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto font-medium mb-6 ${isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}`}>
        {t('design4kAnimatedWeddingInvitationsSubHeader') || 'Design 4K Animated Wedding Invitations — Cardzy'}
      </h2>
      <Suspense fallback={
        <div className="flex py-20 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
        </div>
      }>
        <CreateInvitationContent />
      </Suspense>
    </div>
  )
}
