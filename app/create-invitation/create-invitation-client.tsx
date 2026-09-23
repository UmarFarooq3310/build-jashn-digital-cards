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
import { PreviewCardFit } from '@/components/jashn/preview-card-fit'
import { useJashn } from '@/lib/jashn/store'
import { INVITATION_TYPES, getInvitationType } from '@/lib/jashn/invitations'
import { getInvitationWordingTemplates, type InvitationWordingTemplate } from '@/lib/jashn/invitation-templates'
import { useLang } from '@/lib/lang/context'
import { cn, isPageReload } from '@/lib/utils'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

function cleanStepLabel(text: string) {
  return text.replace(/^[\d\.\s\u0660-\u0669\u09E6-\u09EF\u0966-\u096F\u06D4\-]+/, '').trim()
}

function CreateInvitationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createInvitation, updateInvitation, invitations, isAuthLoading, showToast } = useJashn()
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const editSlug = searchParams.get('edit')
  const typeParam = searchParams.get('type')
  const titleParam = searchParams.get('title')
  const notesParam = searchParams.get('notes')
  const dateParam = searchParams.get('date')
  const timeParam = searchParams.get('time')
  const venueParam = searchParams.get('venue')
  const cityParam = searchParams.get('city')
  const hostParam = searchParams.get('hostNames') || searchParams.get('host')
  const groomParam = searchParams.get('groom')
  const brideParam = searchParams.get('bride')
  const dressCodeParam = searchParams.get('dressCode')

  const [step, setStep] = useState<1 | 2 | 3 | 4>(() => {
    if (editSlug || typeParam || titleParam) return 2
    return 1
  })
  const [typeId, setTypeId] = useState<string>(() => {
    if (typeParam) return typeParam
    return 'nikkah'
  })
  

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

  const [title, setTitle] = useState(() => titleParam || '')
  const [hostNames, setHostNames] = useState(() => hostParam || '')
  const [groom, setGroom] = useState(() => groomParam || '')
  const [bride, setBride] = useState(() => brideParam || '')
  const [date, setDate] = useState(() => dateParam || '')
  const [time, setTime] = useState(() => timeParam || '')
  const [venue, setVenue] = useState(() => venueParam || '')
  const [city, setCity] = useState(() => cityParam || '')
  const [mapsLink, setMapsLink] = useState('')
  const [dressCode, setDressCode] = useState(() => dressCodeParam || '')
  const [notes, setNotes] = useState(() => notesParam || '')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [themeId, setThemeId] = useState('mehndi-red')
  const [borderId, setBorderId] = useState('mehndi')
  const [bgVariantId, setBgVariantId] = useState('default')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoUrl2, setPhotoUrl2] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const draftKey = editSlug ? `cardzy_draft_invite_edit_${editSlug}` : 'cardzy_draft_invitation'
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)

  // Listen to beforeunload to detect page refresh/reload reliably
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem('__cardzy_reloading__', '1')
        if (!editSlug) {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_invitation')
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
        localStorage.removeItem('cardzy_draft_invitation')
      } catch {}

      // If user refreshed the creation page (and not editing an existing card), clear draft and reset all fields
      if (!editSlug && isReload) {
        try {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_invitation')
        } catch {}
        if (!isCancelled) {
          setTitle('')
          setHostNames('')
          setGroom('')
          setBride('')
          setDate('')
          setTime('')
          setVenue('')
          setCity('')
          setMapsLink('')
          setDressCode('')
          setNotes('')
          setRsvpPhone('')
          setPhotoUrl('')
          setPhotoUrl2('')
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
          const existing = invitations.find((i) => i.slug === editSlug)
          if (existing) {
            loadedData = existing
          } else {
            const activeDb = getFirebaseDb() || db
            if (isFirebaseConfigured && activeDb) {
              try {
                const snap = await getDoc(doc(activeDb, 'invitations', editSlug))
                if (snap.exists()) {
                  loadedData = snap.data()
                }
              } catch (err) {
                console.error('Error loading invitation for edit:', err)
              }
            }
          }
        }

        if (loadedData && !isCancelled) {
          if (loadedData.typeId) setTypeId(loadedData.typeId)
          if (loadedData.title !== undefined) setTitle(loadedData.title)
          if (loadedData.hostNames !== undefined) setHostNames(loadedData.hostNames)
          if (loadedData.groom !== undefined) setGroom(loadedData.groom)
          if (loadedData.bride !== undefined) setBride(loadedData.bride)
          if (loadedData.date) setDate(loadedData.date)
          if (loadedData.time) setTime(loadedData.time)
          if (loadedData.venue !== undefined) setVenue(loadedData.venue)
          if (loadedData.city !== undefined) setCity(loadedData.city)
          if (loadedData.mapsLink !== undefined) setMapsLink(loadedData.mapsLink)
          if (loadedData.dressCode !== undefined) setDressCode(loadedData.dressCode)
          if (loadedData.notes !== undefined) setNotes(loadedData.notes)
          if (loadedData.rsvpPhone !== undefined) setRsvpPhone(loadedData.rsvpPhone)
          if (loadedData.themeId) setThemeId(loadedData.themeId)
          if (loadedData.borderId) setBorderId(loadedData.borderId)
          if (loadedData.bgVariantId) setBgVariantId(loadedData.bgVariantId)
          if (loadedData.photoUrl) setPhotoUrl(loadedData.photoUrl)
          if (loadedData.photoUrl2) setPhotoUrl2(loadedData.photoUrl2)
          if (loadedData.step) setStep(loadedData.step as any)
          else setStep(2)
        }
      } else {
        let hasDraft = false
        try {
          const draftJson = typeof window !== 'undefined' ? sessionStorage.getItem(draftKey) : null
          if (draftJson) {
            const d = JSON.parse(draftJson)
            if (d && typeof d === 'object') {
              hasDraft = true
              if (d.typeId) setTypeId(d.typeId)
              if (d.title !== undefined) setTitle(d.title)
              if (d.hostNames !== undefined) setHostNames(d.hostNames)
              if (d.groom !== undefined) setGroom(d.groom)
              if (d.bride !== undefined) setBride(d.bride)
              if (d.date) setDate(d.date)
              if (d.time) setTime(d.time)
              if (d.venue !== undefined) setVenue(d.venue)
              if (d.city !== undefined) setCity(d.city)
              if (d.mapsLink !== undefined) setMapsLink(d.mapsLink)
              if (d.dressCode !== undefined) setDressCode(d.dressCode)
              if (d.notes !== undefined) setNotes(d.notes)
              if (d.rsvpPhone !== undefined) setRsvpPhone(d.rsvpPhone)
              if (d.themeId) setThemeId(d.themeId)
              if (d.borderId) setBorderId(d.borderId)
              if (d.bgVariantId) setBgVariantId(d.bgVariantId)
              if (d.photoUrl) setPhotoUrl(d.photoUrl)
              if (d.photoUrl2) setPhotoUrl2(d.photoUrl2)
              if (d.step) setStep(d.step as any)
            }
          }
        } catch {}

        if (!hasDraft) {
          const typeP = searchParams.get('type')
          const titleP = searchParams.get('title')
          const notesP = searchParams.get('notes')
          const dateP = searchParams.get('date')
          const timeP = searchParams.get('time')
          const venueP = searchParams.get('venue')
          const cityP = searchParams.get('city')
          const hostP = searchParams.get('hostNames') || searchParams.get('host')
          const groomP = searchParams.get('groom')
          const brideP = searchParams.get('bride')
          const dressCodeP = searchParams.get('dressCode')

          if (typeP) {
            setTypeId(typeP)
            setStep(2)
          }
          if (titleP) {
            setTitle(titleP)
            setStep(2)
          }
          if (notesP) setNotes(notesP)
          if (dateP) setDate(dateP)
          if (timeP) setTime(timeP)
          if (venueP) setVenue(venueP)
          if (cityP) setCity(cityP)
          if (hostP) setHostNames(hostP)
          if (groomP) setGroom(groomP)
          if (brideP) setBride(brideP)
          if (dressCodeP) setDressCode(dressCodeP)
        }
      }
      if (!isCancelled) setIsInitialLoaded(true)
    }

    initData()
    return () => {
      isCancelled = true
    }
  }, [editSlug, draftKey])

  // 2. Auto-save draft on every change (SESSION ONLY for active back/forward flow)
  useEffect(() => {
    if (!isInitialLoaded || typeof window === 'undefined') return
    const draftData = {
      step,
      typeId,
      title,
      hostNames,
      groom,
      bride,
      date,
      time,
      venue,
      city,
      mapsLink,
      dressCode,
      notes,
      rsvpPhone,
      themeId,
      borderId,
      bgVariantId,
      photoUrl,
      photoUrl2,
    }
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draftData))
    } catch {}
  }, [
    isInitialLoaded,
    draftKey,
    step,
    typeId,
    title,
    hostNames,
    groom,
    bride,
    date,
    time,
    venue,
    city,
    mapsLink,
    dressCode,
    notes,
    rsvpPhone,
    themeId,
    borderId,
    bgVariantId,
    photoUrl,
    photoUrl2,
  ])

  // 3. Browser Back / PopState support
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.cardzyStep === 'number') {
        setStep(e.state.cardzyStep as 1 | 2 | 3 | 4)
      } else {
        setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : 1))
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const changeStep = (nextStep: 1 | 2 | 3 | 4) => {
    setStep(nextStep)
    if (typeof window !== 'undefined') {
      window.history.pushState({ cardzyStep: nextStep }, '', window.location.href)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

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
    changeStep(2)

    // Automatically set default templates for the newly selected occasion
    const tPlates = getInvitationWordingTemplates(id, lang)
    if (tPlates.length > 0) {
      const tmpl = tPlates[0]
      setTitle(tmpl.title)
      setHostNames(tmpl.hostNames)
      setNotes(tmpl.notes)
      if (tmpl.dressCode) setDressCode(tmpl.dressCode)
    }
  }

  function runValidation() {
    const errs: Record<string, string> = {}

    if (isCouple) {
      if (!groom.trim()) {
        errs.groom = t('groomRequired', 'Groom Name is required')
      }
      if (!bride.trim()) {
        errs.bride = t('brideRequired', 'Bride Name is required')
      }
    } else {
      if (!title.trim()) {
        errs.title = t('eventTitleRequired', 'Event Title is required')
      }
    }

    if (!hostNames.trim()) {
      errs.hostNames = t('hostNamesRequired', 'Host Name(s) is required')
    }

    if (!date.trim()) {
      errs.date = t('eventDateRequired', 'Event Date is required')
    }

    if (!time.trim()) {
      errs.time = t('eventTimeRequired', 'Event Time is required')
    }

    if (!venue.trim()) {
      errs.venue = t('venueRequired', 'Venue is required')
    }

    if (!city.trim()) {
      errs.city = t('cityRequired', 'City is required')
    }

    if (!rsvpPhone.trim()) {
      errs.rsvpPhone = t('rsvpPhoneRequired', 'WhatsApp RSVP Phone Number is required')
    } else {
      const cleanedPhone = rsvpPhone.trim().replace(/\s+/g, '')
      if (!/^\+?\d{10,14}$/.test(cleanedPhone)) {
        errs.rsvpPhone = t('invalidPhone', 'Please enter a valid phone number (e.g. +923001234567)')
      }
    }

    return errs
  }

  function goToStep3() {
    const errs = runValidation()
    setErrors(errs)
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      const firstKey = errKeys[0]
      const firstError = errs[firstKey] || t('checkInputDetails', 'Please check your input details.')
      showToast(firstError, 'error')
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
    changeStep(3)
  }

  function goToStep4() {
    changeStep(4)
  }

  function goToStep2() {
    changeStep(2)
  }

  function goToStep3Back() {
    changeStep(3)
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    const tempErrors = { ...errors }

    if (field === 'rsvpPhone') {
      if (!value.trim()) {
        tempErrors.rsvpPhone = t('rsvpPhoneRequired', 'WhatsApp RSVP Phone Number is required')
      } else {
        const cleanedPhone = value.trim().replace(/\s+/g, '')
        if (!/^\+?\d{10,14}$/.test(cleanedPhone)) {
          tempErrors.rsvpPhone = t('invalidPhone', 'Please enter a valid phone number')
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
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      changeStep(2)
      const firstKey = errKeys[0]
      const firstError = errs[firstKey] || t('checkInputDetails', 'Please check your input details.')
      showToast(firstError, 'error')
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
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('invitationUpdatedSuccess', 'Invitation updated successfully! 🎉'), 'success')
        router.push(`/i/${editSlug}?mode=sender`)
      } else {
        const inv = await createInvitation(payload)
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('invitationCreatedSuccess', 'Invitation created successfully! 🚀'), 'success')
        router.push(`/i/${inv.slug}?mode=sender`)
      }
    } catch (err: any) {
      console.error('Failed to create invitation:', err)
      showToast(err?.message || 'Failed to generate invitation. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-6 text-center">
        {/* Card Studio Mode Switcher */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs mb-5">
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            💌 {t('studioTabWish', 'Wish Cards')}
          </Link>
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs bg-[#7B0D1E]">
            🎉 {t('studioTabInvite', 'Invitations')}
          </div>
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            🪄 {t('studioTabMagic', 'Magic Links')}
          </Link>
          <Link
            href="/create-visiting-card"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            📇 {t('studioTabVCard', 'Visiting Cards')}
          </Link>
        </div>



        {/* 4-Part Progress Stepper */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { s: 1, label: t('stepPartOccasion') || '1. Occasion' },
            { s: 2, label: t('stepPartDetails') || '2. Event Details' },
            { s: 3, label: t('stepPartWording') || '3. Wording & Photos' },
            { s: 4, label: t('stepPartDesign') || '4. Theme & Design' },
          ].map(({ s, label }) => {
            const isClickable = s === 1 || !!typeId
            return (
              <div key={s} className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isClickable) {
                      setErrors({})
                      changeStep(s as 1 | 2 | 3 | 4)
                    }
                  }}
                  disabled={!isClickable}
                  className={`flex size-7 sm:size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-[#7B0D1E] text-white shadow-md ring-4 ring-[#7B0D1E]/20'
                      : isClickable
                      ? 'bg-muted text-muted-foreground hover:bg-[#7B0D1E]/10 hover:text-[#7B0D1E] cursor-pointer'
                      : 'bg-muted/40 text-muted-foreground/40 cursor-not-allowed'
                  }`}
                >
                  {s}
                </button>
                <span
                  onClick={() => {
                    if (isClickable) {
                      setErrors({})
                      changeStep(s as 1 | 2 | 3 | 4)
                    }
                  }}
                  className={`hidden sm:inline text-xs transition-colors ${
                    step === s
                      ? 'text-[#7B0D1E] font-extrabold'
                      : isClickable
                      ? 'text-muted-foreground hover:text-foreground font-semibold cursor-pointer'
                      : 'text-muted-foreground/40 font-semibold cursor-not-allowed'
                  }`}
                >
                  {cleanStepLabel(label)}
                </span>
                {s < 4 && <div className="hidden sm:block h-px w-4 sm:w-6 bg-border" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* 📱 Mobile Tabs (Only visible when step >= 2 & Mobile < 1024px) */}

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Column */}
        <div className="lg:col-span-7 space-y-4">
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

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button
                    onClick={() => changeStep(2)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('btnNext') || 'Next'}</span>
                    <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                  </Button>
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className="space-y-4">
                {/* Header Selected Event Info (Shared across Parts 2, 3, 4) */}
                <div className="flex items-center justify-between border-b border-border pb-2.5 mb-2">
                  <div>
                    <span className="text-[9.5px] uppercase font-extrabold tracking-wider text-[#7B0D1E] block">
                      {t('selectedOccasion')}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5 leading-tight">
                      {t(`type_${selectedType?.id.replace(/-/g, '_')}`) || selectedType?.label}
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changeStep(1)}
                    className="text-[11px] h-7 px-2.5 rounded-lg flex items-center gap-1 border-border bg-card hover:bg-muted text-foreground font-semibold"
                  >
                    <Grid className="size-3 text-[#7B0D1E]" /> {t('viewOccasions')}
                  </Button>
                </div>

                {/* 📝 Part 2: Event Details */}
                {step === 2 && (
                  <div className={cn('space-y-5 text-left', (lang === 'ur' || lang === 'ar') && 'text-right font-urdu')}>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5">
                      <Edit3 className="size-4" /> {t('stepPartDetails') || '2. Event Details'}
                    </h3>

                    {isCouple ? (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                              {selectedType?.id === 'anniversary-party' ? (t('partner1Name') || 'Husband / Partner 1 Name') : (t('groomName') === 'groomName' ? 'Groom Name' : t('groomName'))} *
                            </label>
                            <input
                              id="field-groom"
                              type="text"
                              required
                              value={groom}
                              onChange={(e) => handleFieldChange('groom', e.target.value, setGroom)}
                              placeholder={selectedType?.id === 'anniversary-party' ? 'e.g. Tariq Mahmood' : t('placeholderGroom')}
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
                            <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                              {selectedType?.id === 'anniversary-party' ? (t('partner2Name') || 'Wife / Partner 2 Name') : (t('brideName') === 'brideName' ? 'Bride Name' : t('brideName'))} *
                            </label>
                            <input
                              id="field-bride"
                              type="text"
                              required
                              value={bride}
                              onChange={(e) => handleFieldChange('bride', e.target.value, setBride)}
                              placeholder={selectedType?.id === 'anniversary-party' ? 'e.g. Khadija Begum' : t('placeholderBride')}
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

                        <div>
                          <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            {t('eventTitle')} ({t('optional') || 'Optional'})
                          </label>
                          <input
                            id="field-title-couple"
                            type="text"
                            value={title}
                            onChange={(e) => handleFieldChange('title', e.target.value, setTitle)}
                            placeholder={selectedType?.label || 'e.g. Milestone Wedding Anniversaries (Silver & Golden)'}
                            dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                            className="w-full rounded-2xl border border-input p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] transition-all"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('eventTitle')} *
                        </label>
                        <input
                          id="field-title"
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
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('hostNamesLabel')} *
                      </label>
                      <input
                        id="field-hostNames"
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('eventDateLabel')} *
                        </label>
                        <input
                          id="field-date"
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('eventTimeLabel')} *
                        </label>
                        <input
                          id="field-time"
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('venueLabel')} *
                        </label>
                        <input
                          id="field-venue"
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('cityLabel')} *
                        </label>
                        <input
                          id="field-city"
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
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('rsvpPhoneLabel')} *
                      </label>
                      <input
                        id="field-rsvpPhone"
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
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
                        <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
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

                    {/* Part 2 Navigation */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-6 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => changeStep(1)}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back'}</span>
                      </Button>
                      <Button
                        onClick={goToStep3}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{t('btnNext') || 'Next'}</span>
                        <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* 📝 Part 3: Wording & Photos */}
                {step === 3 && (
                  <div className={cn('space-y-5 text-left', (lang === 'ur' || lang === 'ar') && 'text-right font-urdu')}>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5">
                      <Sparkles className="size-4" /> {t('stepPartWording') || '3. Wording & Photos'}
                    </h3>

                    {/* 📝 CHOOSE PRE-WRITTEN INVITATION TEMPLATE */}
                    {wordingTemplates.length > 0 && (
                      <div className="rounded-2xl border border-input bg-card p-4 space-y-2.5 shadow-xs">
                        <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
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
                      <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
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
                      <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                        <Camera className="size-4 text-[#7B0D1E]" /> {isCouple ? t('couplePhotosLabel') : t('eventPhotoLabel')}
                      </label>

                      <div className={cn("grid gap-3", isCouple ? "grid-cols-2" : "grid-cols-1")}>
                        {/* Photo 1 Upload Box */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-input bg-background/50 space-y-2 text-center">
                          <span className="text-[11px] font-semibold text-muted-foreground">
                            {isCouple ? t('bridePhoto') : t('customCardPhoto')}
                          </span>
                          {photoUrl ? (
                            <div className="relative size-16 rounded-xl overflow-hidden border border-border shadow-sm">
                              <img src={photoUrl} alt="Bride or Primary Host Portrait Preview" className="size-full object-cover" />
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
                                <img src={photoUrl2} alt="Groom or Secondary Host Portrait Preview" className="size-full object-cover" />
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

                    {/* Part 3 Navigation */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-6 mt-6">
                      <Button
                        variant="outline"
                        onClick={goToStep2}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back'}</span>
                      </Button>
                      <Button
                        onClick={goToStep4}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{t('btnNext') || 'Next'}</span>
                        <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* 🎨 Part 4: Theme & Design */}
                {step === 4 && (
                  <div className={cn('space-y-3.5 text-left', (lang === 'ur' || lang === 'ar') && 'text-right font-urdu')}>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1">
                      <Palette className="size-3.5" /> {t('stepPartDesign') || '4. Theme & Design'}
                    </h3>

                    <div className="space-y-1.5">
                      <label className={cn("block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('selectTheme')}
                      </label>
                      <ThemePicker
                        value={themeId}
                        onChange={setThemeId}
                        isPro={isPro}
                        onLockedClick={() => router.push('/pricing')}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={cn("block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('selectBorderFrame')}
                      </label>
                      <BorderPicker
                        value={borderId}
                        onChange={setBorderId}
                        isPro={isPro}
                        onLockedClick={() => router.push('/pricing')}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={cn("block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                        {t('selectCardBackgroundStyle')}
                      </label>
                      <BackgroundPicker
                        value={bgVariantId}
                        onChange={setBgVariantId}
                        variants={selectedType?.bgVariants}
                      />
                    </div>

                    {/* Part 4 Navigation */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-6 mt-6">
                      <Button
                        variant="outline"
                        onClick={goToStep3Back}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back'}</span>
                      </Button>
                      <Button
                        onClick={handleFinish}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-xl shadow-[#7B0D1E]/20 active:scale-98 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Sparkles className="size-4 animate-spin" />
                            <span>{t('generatingCard', 'Generating Card...')}</span>
                          </>
                        ) : (
                          <>
                            <span>{editSlug ? (t('btnUpdate') || 'Update') : (t('btnFinish') || 'Finish 🚀')}</span>
                            <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* Desktop & Mobile Right Column — Sticky Live Interactive Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20 rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-xl text-center backdrop-blur-md overflow-hidden" suppressHydrationWarning>
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5">
                <Heart className="size-3.5 text-[#7B0D1E] animate-pulse" /> {t('livePreview')}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#7B0D1E]/10 text-[#7B0D1E] border border-[#7B0D1E]/20">
                <Sparkles className="size-2.5" /> Full Card Fit
              </span>
            </div>

            <PreviewCardFit topOffset={80} bottomOffset={24} reservedHeaderHeight={56}>
              <CardAnimationPreview occasionId={typeId} animationKey={typeId} className="max-w-sm mx-auto" roundedClass="rounded-3xl">
                <InvitationCard
                  data={{
                    typeId,
                    title: step === 1 ? (title || selectedType?.label || t('invitation', 'Invitation')) : (title || selectedType?.label || ''),
                    hostNames: step === 1 ? (hostNames || t('defaultHostNames', 'The Families of Hassan & Ayesha')) : (hostNames || ''),
                    groom: step === 1 ? (groom || t('defaultGroom', 'Hassan')) : (groom || ''),
                    bride: step === 1 ? (bride || t('defaultBride', 'Ayesha')) : (bride || ''),
                    date: step === 1 ? (date || '2026-12-14') : (date || ''),
                    time: step === 1 ? (time || '07:00 PM') : (time || ''),
                    venue: step === 1 ? (venue || t('defaultVenue', 'Pearl Continental, Grand Ballroom')) : (venue || ''),
                    city: step === 1 ? (city || t('defaultCity', 'Lahore')) : (city || ''),
                    dressCode: step === 1 ? (dressCode || t('defaultDressCode', 'Traditional Royal / Formal')) : (dressCode || ''),
                    notes: step === 1 ? (notes || t('defaultNotes', 'Your gracious presence will double our joy and happiness.')) : (notes || ''),
                    themeId,
                    borderId,
                    bgVariantId,
                    photoUrl,
                    photoUrl2,
                  }}
                  showCountdown={false}
                />
              </CardAnimationPreview>
            </PreviewCardFit>
          </div>
        </div>
      </div>


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
              {t('multilingualWordingDesc') || 'Explore pre-written Urdu and English wedding wording, blessings, and host protocols.'}
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
    <Suspense fallback={
      <div className="flex py-20 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    }>
      <CreateInvitationContent />
    </Suspense>
  )
}
