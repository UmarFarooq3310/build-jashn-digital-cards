'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles, Grid, Loader2, AlertCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { ThemePicker } from '@/components/jashn/theme-picker'
import { BorderPicker } from '@/components/jashn/border-picker'
import { BackgroundPicker } from '@/components/jashn/background-picker'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { InvitationTypePicker } from '@/components/jashn/invitation-type-picker'
import CardAnimationPreview from '@/components/jashn/CardAnimationPreview'
import AudioPlayer from '@/components/jashn/AudioPlayer'
import { useCardSound } from '@/lib/jashn/useCardSound'
import { AdBanner } from '@/components/ad-banner'
import { useJashn } from '@/lib/jashn/store'
import { INVITATION_TYPES, INVITATION_CATEGORIES, getInvitationType } from '@/lib/jashn/invitations'
import { encodeShortInvitation } from '@/lib/jashn/codec'
import { JashnIcon } from '@/lib/jashn/icon'
import { cn } from '@/lib/utils'
import { isFirebaseConfigured } from '@/lib/firebase'

function CreateInvitationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createInvitation, updateInvitation, invitations, isAuthLoading } = useJashn()

  const editSlug = searchParams.get('edit')

  useEffect(() => {
    if (!isAuthLoading && !user) {
      const currentPath = window.location.pathname + window.location.search
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [user, isAuthLoading, router])

  if (isAuthLoading) {
    return (
      <div className="flex py-20 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [typeId, setTypeId] = useState('nikkah')
  const [category, setCategory] = useState<(typeof INVITATION_CATEGORIES)[number]>('Wedding')
  
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
  const [date, setDate] = useState(getTodayString())
  const [time, setTime] = useState(getCurrentTimeString())
  const [venue, setVenue] = useState('')
  const [city, setCity] = useState('')
  const [mapsLink, setMapsLink] = useState('')
  const [dressCode, setDressCode] = useState('')
  const [notes, setNotes] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [themeId, setThemeId] = useState('mehndi-red')
  const [borderId, setBorderId] = useState('mehndi')
  const [bgVariantId, setBgVariantId] = useState('default')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedType = getInvitationType(typeId)
  const isCouple = selectedType?.couple
  const isPro = user?.plan === 'pro' || user?.plan === 'business'
  const { playClickSound } = useCardSound(selectedType?.soundCategory)

  useEffect(() => {
    if (editSlug) {
      const existing = invitations.find((i) => i.slug === editSlug)
      if (existing) {
        setTypeId(existing.typeId)
        const found = getInvitationType(existing.typeId)
        if (found) {
          setCategory(found.category)
        }
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
        setStep(2)
      }
    } else {
      const typeParam = searchParams.get('type')
      if (typeParam) {
        setTypeId(typeParam)
        const found = getInvitationType(typeParam)
        if (found) {
          setCategory(found.category)
        }
        setStep(2)
      }
    }
  }, [searchParams, editSlug, invitations])

  const filteredTypes = INVITATION_TYPES.filter((t) => t.category === category)

  function handleTypeSelect(id: string) {
    setTypeId(id)
    setErrors({})
    setStep(2)
  }

  function runValidation() {
    const errs: Record<string, string> = {}
    const nameRegex = /^[A-Za-z\s]+$/

    if (isCouple) {
      if (!groom.trim()) {
        errs.groom = "Groom's name is required."
      } else if (!nameRegex.test(groom.trim())) {
        errs.groom = "Only letters and spaces are allowed."
      }

      if (!bride.trim()) {
        errs.bride = "Bride's name is required."
      } else if (!nameRegex.test(bride.trim())) {
        errs.bride = "Only letters and spaces are allowed."
      }
    } else {
      if (!title.trim() && !selectedType?.label) {
        errs.title = "Please enter an event title."
      } else if (title.trim() && !nameRegex.test(title.trim())) {
        errs.title = "Only letters and spaces are allowed."
      }
    }

    if (hostNames.trim() && !nameRegex.test(hostNames.trim())) {
      errs.hostNames = "Only letters and spaces are allowed."
    }

    if (!date) {
      errs.date = "Please select an event date."
    }

    if (!time) {
      errs.time = "Please select an event time."
    }

    if (!rsvpPhone.trim()) {
      errs.rsvpPhone = "RSVP WhatsApp number is required."
    } else {
      const cleanedPhone = rsvpPhone.trim()
      if (!/^\d+$/.test(cleanedPhone)) {
        errs.rsvpPhone = "Phone number must contain only numbers (no letters, spaces, or symbols)."
      } else if (cleanedPhone.length < 10 || cleanedPhone.length > 12) {
        errs.rsvpPhone = "Phone number must be between 10 and 12 digits (e.g. 03001234567)."
      }
    }

    return errs
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    
    // Live validation check on change
    const tempErrors = { ...errors }
    const nameRegex = /^[A-Za-z\s]+$/

    if (field === 'groom' || field === 'bride' || field === 'title' || field === 'hostNames') {
      if (!value.trim()) {
        if (field === 'groom') tempErrors.groom = "Groom's name is required."
        else if (field === 'bride') tempErrors.bride = "Bride's name is required."
        else if (field === 'title' && !selectedType?.label) tempErrors.title = "Event title is required."
        else delete tempErrors[field]
      } else if (!nameRegex.test(value.trim())) {
        tempErrors[field] = "Only letters and spaces are allowed."
      } else {
        delete tempErrors[field]
      }
    } else if (field === 'rsvpPhone') {
      if (!value.trim()) {
        tempErrors.rsvpPhone = "RSVP WhatsApp number is required."
      } else if (!/^\d+$/.test(value.trim())) {
        tempErrors.rsvpPhone = "Must contain only numbers."
      } else if (value.trim().length < 10 || value.trim().length > 12) {
        tempErrors.rsvpPhone = "Must be between 10 and 12 digits."
      } else {
        delete tempErrors.rsvpPhone
      }
    } else if (field === 'date') {
      if (!value) tempErrors.date = "Please select an event date."
      else delete tempErrors.date
    } else if (field === 'time') {
      if (!value) tempErrors.time = "Please select an event time."
      else delete tempErrors.time
    }

    setErrors(tempErrors)
  }

  function validateStep2() {
    const errs = runValidation()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      return
    }
    setStep(3)
  }

  async function handleFinish() {
    const errs = runValidation()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      setStep(2)
      return
    }

    const cleanedPhone = rsvpPhone.trim()
    const payload = {
      typeId,
      title: title.trim() || selectedType?.label || 'Event Invitation',
      hostNames: hostNames.trim(),
      groom: groom.trim(),
      bride: bride.trim(),
      date,
      time,
      venue,
      city,
      mapsLink,
      dressCode,
      notes,
      rsvpPhone: cleanedPhone,
      themeId,
      borderId,
      bgVariantId,
    }

    playClickSound()

    if (editSlug) {
      await updateInvitation(editSlug, payload)
      router.push(`/i/${editSlug}`)
    } else {
      const inv = await createInvitation(payload)
      router.push(`/i/${inv.slug}`)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-primary">
          {editSlug ? 'Edit Event Invitation' : 'Create an Event Invitation'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Design digital invitations complete with live countdowns, Google Maps & RSVP tracking
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4">
          {[
            { s: 1, label: 'Event Type' },
            { s: 2, label: 'Event Details' },
            { s: 3, label: 'Theme & Border' },
            { s: 4, label: 'Generate Link' },
          ].map(({ s, label }) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { setErrors({}); setStep(s as 1 | 2 | 3 | 4); }}
                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : step > s
                    ? 'bg-primary/20 text-primary cursor-pointer'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </button>
              <span className={`hidden text-xs font-medium sm:inline ${step === s ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {s < 4 && <span className="text-muted-foreground/40 sm:ml-2">/</span>}
            </div>
          ))}
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 mx-auto max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-semibold text-red-600 flex items-center gap-2 shadow-sm">
          <AlertCircle className="size-4 shrink-0 text-red-600" />
          <span>Please fix the validation errors below before proceeding.</span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Step 1: Select Event Type</h2>
                  <span className="text-xs text-muted-foreground">Click any tile to select</span>
                </div>
                <InvitationTypePicker
                  value={typeId}
                  onChange={(id) => {
                    setTypeId(id)
                    setStep(2)
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-primary">Selected Event</span>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      {selectedType?.label} <span className="font-urdu text-base text-muted-foreground">({selectedType?.urdu})</span>
                    </h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep(1)} className="text-xs flex items-center gap-1">
                    <Grid className="size-3.5" /> View All Event Types
                  </Button>
                </div>

                <h3 className="text-base font-bold text-foreground pt-2">Step 2: Fill Event Information</h3>

                {isCouple ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Groom&apos;s Name *</label>
                      <input
                        type="text"
                        required
                        value={groom}
                        onChange={(e) => handleFieldChange('groom', e.target.value, setGroom)}
                        placeholder="e.g. Shahzaib Khan"
                        className={cn(
                          "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                          errors.groom ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
                        )}
                      />
                      {errors.groom && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.groom}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Bride&apos;s Name *</label>
                      <input
                        type="text"
                        required
                        value={bride}
                        onChange={(e) => handleFieldChange('bride', e.target.value, setBride)}
                        placeholder="e.g. Fatima Ali"
                        className={cn(
                          "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                          errors.bride ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
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
                    <label className="mb-1 block text-sm font-medium">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleFieldChange('title', e.target.value, setTitle)}
                      placeholder={`e.g. Annual ${selectedType?.label}`}
                      className={cn(
                        "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                        errors.title ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
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
                  <label className="mb-1 block text-sm font-medium">Host / Family Names</label>
                  <input
                    type="text"
                    value={hostNames}
                    onChange={(e) => handleFieldChange('hostNames', e.target.value, setHostNames)}
                    placeholder="e.g. Mr. & Mrs. Tariq Mahmood"
                    className={cn(
                      "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                      errors.hostNames ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
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
                    <label className="mb-1 block text-sm font-medium">Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => handleFieldChange('date', e.target.value, setDate)}
                      className={cn(
                        "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                        errors.date ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
                      )}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                        <AlertCircle className="size-3 shrink-0" /> {errors.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Time *</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => handleFieldChange('time', e.target.value, setTime)}
                      className={cn(
                        "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                        errors.time ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
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
                    <label className="mb-1 block text-sm font-medium">Venue Name</label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. Pearl Continental Marquee"
                      className="w-full rounded-xl border border-input bg-background p-2.5 text-sm focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="w-full rounded-xl border border-input bg-background p-2.5 text-sm focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Google Maps Link (Optional)</label>
                    <input
                      type="text"
                      value={mapsLink}
                      onChange={(e) => setMapsLink(e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="w-full rounded-xl border border-input bg-background p-2.5 text-sm focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">RSVP WhatsApp Number *</label>
                    <input
                      type="text"
                      required
                      value={rsvpPhone}
                      onChange={(e) => handleFieldChange('rsvpPhone', e.target.value, setRsvpPhone)}
                      placeholder="e.g. 03001234567"
                      className={cn(
                        "w-full rounded-xl border p-2.5 text-sm bg-background focus:outline-none focus:ring-2",
                        errors.rsvpPhone ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-input focus:ring-primary focus:border-primary"
                      )}
                    />
                    {errors.rsvpPhone && (
                      <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                        <AlertCircle className="size-3 shrink-0" /> {errors.rsvpPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Dress Code (Optional)</label>
                    <input
                      type="text"
                      value={dressCode}
                      onChange={(e) => setDressCode(e.target.value)}
                      placeholder="e.g. Traditional / Formal"
                      className="w-full rounded-xl border border-input bg-background p-2.5 text-sm focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Special Notes / Message</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Children strictly not allowed"
                      className="w-full rounded-xl border border-input bg-background p-2.5 text-sm focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 size-4" /> Back to Event Types
                  </Button>
                  <Button onClick={validateStep2} className="w-full sm:w-auto bg-primary text-primary-foreground font-bold">
                    Next: Choose Theme <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Step 3: Choose Invitation Theme</h2>
                  <ThemePicker
                    value={themeId}
                    onChange={setThemeId}
                    isPro={isPro}
                    onLockedClick={() => router.push('/pricing')}
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="text-base font-bold text-foreground mb-3">Choose Card Border Design</h2>
                  <BorderPicker
                    value={borderId}
                    onChange={setBorderId}
                    isPro={isPro}
                    onLockedClick={() => router.push('/pricing')}
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="text-base font-bold text-foreground mb-3">Choose Card Background Design</h2>
                  <BackgroundPicker
                    value={bgVariantId}
                    onChange={setBgVariantId}
                    variants={selectedType?.bgVariants}
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 size-4" /> Back
                  </Button>
                  <Button onClick={() => setStep(4)} className="w-full sm:w-auto bg-primary text-primary-foreground font-bold">
                    Next: Final Preview & Share <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">Step 4: Confirm & Generate Clean Link</h2>
                <p className="text-sm text-muted-foreground">
                  Check the live preview on the right. Once created, guests can view event details, RSVP on WhatsApp with sound effects, and view countdowns.
                </p>
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(3)} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 size-4" /> Back
                  </Button>
                  <Button onClick={handleFinish} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg flex items-center justify-center gap-1.5">
                    {editSlug ? 'Save Changes' : 'Create Clean Link'} <Sparkles className="size-4 sm:size-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {/* Rectangle ad above live preview */}
          <AdBanner format="display" className="hidden lg:block" />
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-md text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Invitation Live Preview
            </p>
            <div className="transform scale-[0.95] origin-top">
              <CardAnimationPreview occasionId={typeId} animationKey={typeId}>
                <InvitationCard
                  data={{
                    typeId,
                    title: title || selectedType?.label || 'Invitation',
                    hostNames,
                    groom,
                    bride,
                    date: date || new Date().toISOString().slice(0, 10),
                    time: time || '7:00 PM',
                    venue: venue || 'Venue Name',
                    city: city || 'Lahore',
                    dressCode,
                    notes,
                    themeId,
                    borderId,
                    bgVariantId,
                  }}
                />
              </CardAnimationPreview>
            </div>

            {/* Sound preview — manual play only, NO autoplay */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sound Preview
              </p>
              <AudioPlayer occasionId={typeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreateInvitationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-8 md:py-12">
        <Suspense fallback={
          <div className="flex py-20 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-emerald-600" />
          </div>
        }>
          <CreateInvitationContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
