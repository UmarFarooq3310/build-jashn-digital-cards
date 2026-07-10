'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles, Wand2, UserCheck, Heart, Grid, Loader2, AlertCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { OccasionPicker } from '@/components/jashn/occasion-picker'
import { ThemePicker } from '@/components/jashn/theme-picker'
import { BorderPicker } from '@/components/jashn/border-picker'
import { BackgroundPicker } from '@/components/jashn/background-picker'
import { WishCard } from '@/components/jashn/wish-card'
import CardAnimationPreview from '@/components/jashn/CardAnimationPreview'
import AudioPlayer from '@/components/jashn/AudioPlayer'
import { useCardSound } from '@/lib/jashn/useCardSound'
import { useJashn } from '@/lib/jashn/store'
import { getOccasion, getTemplates } from '@/lib/jashn/occasions'
import { encodeShortWish } from '@/lib/jashn/codec'
import type { Language } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'

const RELATIONS = [
  { id: 'Brother', en: 'Brother', ur: 'بھائی' },
  { id: 'Sister', en: 'Sister', ur: 'بہن' },
  { id: 'Mother', en: 'Mother', ur: 'امی' },
  { id: 'Father', en: 'Father', ur: 'ابو' },
  { id: 'Friend', en: 'Friend', ur: 'دوست' },
  { id: 'Husband', en: 'Husband', ur: 'شوہر' },
  { id: 'Wife', en: 'Wife', ur: 'بیوی' },
  { id: 'Son', en: 'Son', ur: 'بیٹا' },
  { id: 'Daughter', en: 'Daughter', ur: 'بیٹی' },
  { id: 'Bestie', en: 'Best Friend', ur: 'بہترین دوست' },
]

function CreateWishContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createWish, updateWish, wishes } = useJashn()

  const editSlug = searchParams.get('edit')

  useEffect(() => {
    if (!user) {
      const currentPath = window.location.pathname + window.location.search
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [user, router])

  const [step, setStep] = useState<1 | 2>(1)
  const [occasionId, setOccasionId] = useState('birthday')
  const [showMobilePreview, setShowMobilePreview] = useState(true)
  const [language, setLanguage] = useState<Language>('both')
  const [message, setMessage] = useState('')
  const [messageUrdu, setMessageUrdu] = useState('')
  const [themeId, setThemeId] = useState('mehndi-red')
  const [borderId, setBorderId] = useState('mehndi')
  const [bgVariantId, setBgVariantId] = useState('default')
  const [senderName, setSenderName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [relation, setRelation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const templates = getTemplates(occasionId)
  const selectedOccasion = getOccasion(occasionId)
  const isPro = user?.plan === 'pro' || user?.plan === 'business'
  const { playClickSound } = useCardSound(selectedOccasion?.soundCategory)

  useEffect(() => {
    if (editSlug) {
      const existing = wishes.find((w) => w.slug === editSlug)
      if (existing) {
        setOccasionId(existing.occasionId)
        setLanguage(existing.language || 'both')
        setMessage(existing.message || '')
        setMessageUrdu(existing.messageUrdu || '')
        setThemeId(existing.themeId || 'mehndi-red')
        setBorderId(existing.borderId || 'mehndi')
        setBgVariantId(existing.bgVariantId || 'default')
        setSenderName(existing.senderName || '')
        setRecipientName(existing.recipientName || '')
        setRelation(existing.relation || '')
        setStep(2)
      }
    } else {
      const occParam = searchParams.get('occasion')
      if (occParam) {
        setOccasionId(occParam)
        const t = getTemplates(occParam)
        if (t.length > 0) {
          setMessage(t[0].en)
          setMessageUrdu(t[0].ur)
        }
        setStep(2)
      }
    }
  }, [searchParams, editSlug, wishes])

  function handleOccasionSelect(id: string) {
    setOccasionId(id)
    const newTemplates = getTemplates(id)
    if (newTemplates.length > 0) {
      setMessage(newTemplates[0].en)
      setMessageUrdu(newTemplates[0].ur)
    }
    setErrors({})
    setStep(2)
  }

  function applyTemplate(index: number) {
    const t = templates[index]
    if (t) {
      setMessage(t.en)
      setMessageUrdu(t.ur)
    }
    setErrors((prev) => {
      const copy = { ...prev }
      delete copy.message
      delete copy.messageUrdu
      return copy
    })
  }

  function runValidation() {
    const errs: Record<string, string> = {}
    const nameRegex = /^[A-Za-z\s]*$/

    if (senderName.trim() && !nameRegex.test(senderName.trim())) {
      errs.senderName = "Sender name must contain only letters and spaces."
    }

    if (recipientName.trim() && !nameRegex.test(recipientName.trim())) {
      errs.recipientName = "Recipient name must contain only letters and spaces."
    }

    if (step === 2) {
      if (language === 'en' && !message.trim()) {
        errs.message = "English message is required."
      } else if (language === 'ur' && !messageUrdu.trim()) {
        errs.messageUrdu = "Urdu message is required."
      } else if (language === 'both' && !message.trim() && !messageUrdu.trim()) {
        errs.message = "At least one message (English or Urdu) is required."
        errs.messageUrdu = "At least one message (English or Urdu) is required."
      }
    }

    return errs
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    
    // Live validation
    const tempErrors = { ...errors }
    const nameRegex = /^[A-Za-z\s]*$/

    if (field === 'senderName' || field === 'recipientName') {
      if (value.trim() && !nameRegex.test(value.trim())) {
        tempErrors[field] = "Only letters and spaces are allowed."
      } else {
        delete tempErrors[field]
      }
    } else if (field === 'message' || field === 'messageUrdu') {
      // Clear message errors if at least one starts to contain text
      if (value.trim()) {
        delete tempErrors.message
        delete tempErrors.messageUrdu
      }
    }

    setErrors(tempErrors)
  }

  async function handleFinish() {
    const errs = runValidation()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      return
    }

    const payload = {
      occasionId,
      message: message || templates[0]?.en || 'Best wishes!',
      messageUrdu: messageUrdu || templates[0]?.ur || 'بہترین دعائیں!',
      language,
      themeId,
      borderId,
      bgVariantId,
      senderName: senderName.trim() || user?.name || 'A Well Wisher',
      recipientName: recipientName.trim(),
      relation,
    }

    playClickSound()

    if (editSlug) {
      await updateWish(editSlug, payload)
      router.push(`/w/${editSlug}`)
    } else {
      const wish = await createWish(payload)
      router.push(`/w/${wish.slug}`)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#7B0D1E]">
          {editSlug ? 'Edit Animated Wish Card' : 'Send an Animated Wish Card'}
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Select relation, write your custom message, pick dynamic themes & generate a clean short link!
        </p>

        {/* 2-Step Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4">
          {[
            { s: 1, label: 'Choose Occasion' },
            { s: 2, label: 'Personalize & Share' },
          ].map(({ s, label }) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => { setErrors({}); setStep(s as 1 | 2); }}
                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-[#7B0D1E] text-white ring-4 ring-[#7B0D1E]/20'
                    : 'bg-[#7B0D1E]/20 text-[#7B0D1E] cursor-pointer'
                }`}
              >
                {s}
              </button>
              <span className={`hidden text-xs font-semibold sm:inline ${step === s ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {s < 2 && <span className="text-muted-foreground/40 sm:ml-2">/</span>}
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

      {/* Mobile Sticky Preview */}
      {step === 2 && (
        <div className="sticky top-16 z-40 block lg:hidden border border-border bg-card/95 backdrop-blur-md shadow-sm rounded-2xl mb-6 transition-all overflow-hidden">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="size-4 text-[#7B0D1E] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-3">
              <AudioPlayer occasionId={occasionId} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobilePreview(!showMobilePreview)}
                className="text-xs h-7 px-2.5 font-semibold text-[#7B0D1E] border-[#7B0D1E]/20 hover:bg-[#7B0D1E]/5"
              >
                {showMobilePreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
          </div>

          {showMobilePreview && (
            <div className="h-[210px] w-full overflow-hidden flex justify-center bg-muted/10 relative border-t border-border/50">
              <div className="absolute top-2 transform scale-[0.42] sm:scale-[0.5] origin-top">
                <CardAnimationPreview occasionId={occasionId} animationKey={occasionId} className="max-w-md" roundedClass="rounded-[2.5rem]">
                  <WishCard
                    data={{
                      occasionId,
                      themeId,
                      borderId,
                      bgVariantId,
                      message: message || templates[0]?.en || 'Best wishes!',
                      messageUrdu: messageUrdu || templates[0]?.ur || 'بہترین دعائیں!',
                      senderName: senderName || user?.name || 'Your Name',
                      recipientName,
                      relation,
                      language,
                    }}
                  />
                </CardAnimationPreview>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Step 1: Select Event / Occasion</h2>
                  <span className="text-xs font-medium text-muted-foreground">Click any tile to edit</span>
                </div>
                <OccasionPicker value={occasionId} onChange={handleOccasionSelect} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Header info block */}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#7B0D1E]">Selected Occasion</span>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      {selectedOccasion?.label} <span className="font-urdu text-base text-muted-foreground">({selectedOccasion?.urdu})</span>
                    </h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep(1)} className="text-xs flex items-center gap-1">
                    <Grid className="size-3.5" /> View Occasions
                  </Button>
                </div>

                {/* Block 1: Names & Relations */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1">
                    <UserCheck className="size-4" /> 1. Recipient & Relations
                  </h3>
                  
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Who is this card for? (Select Relation)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {RELATIONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRelation(relation === r.en ? '' : r.en)}
                          className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                            relation === r.en
                              ? 'border-[#7B0D1E] bg-[#7B0D1E] text-white shadow-sm ring-2 ring-[#7B0D1E]/30'
                              : 'border-border bg-background text-foreground hover:bg-muted'
                          }`}
                        >
                          {r.en} <span className="font-urdu opacity-80">({r.ur})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Recipient Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => handleFieldChange('recipientName', e.target.value, setRecipientName)}
                        placeholder="e.g. Ayesha, Bilal"
                        className={cn(
                          "w-full rounded-xl border p-3 text-sm bg-background focus:outline-none focus:ring-2",
                          errors.recipientName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.recipientName && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.recipientName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => handleFieldChange('senderName', e.target.value, setSenderName)}
                        placeholder="e.g. Tariq & Family"
                        className={cn(
                          "w-full rounded-xl border p-3 text-sm bg-background focus:outline-none focus:ring-2",
                          errors.senderName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.senderName && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.senderName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Block 2: Message Calligraphy */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1 flex-1">
                      <Heart className="size-4" /> 2. Message Calligraphy
                    </h3>
                    <div className="flex items-center rounded-lg bg-muted p-1 text-xs font-semibold ml-2">
                      {(['both', 'en', 'ur'] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => { setLanguage(lang); setErrors({}); }}
                          className={`rounded-md px-2.5 py-1 transition-colors capitalize ${
                            language === lang ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                          }`}
                        >
                          {lang === 'both' ? 'Bilingual' : lang === 'en' ? 'English' : 'Urdu'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {templates.length > 0 && (
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Choose Pre-written Template
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {templates.map((t, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyTemplate(idx)}
                            className="flex items-center gap-1 rounded-lg border border-[#7B0D1E]/20 bg-[#7B0D1E]/5 px-3 py-1.5 text-xs font-medium text-[#7B0D1E] hover:bg-[#7B0D1E]/10 transition-colors"
                          >
                            <Wand2 className="size-3" /> Template {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {(language === 'both' || language === 'en') && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        English Message
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => handleFieldChange('message', e.target.value, setMessage)}
                        placeholder="Write your custom wish in English..."
                        className={cn(
                          "w-full rounded-xl border p-3 text-sm bg-background focus:outline-none focus:ring-2",
                          errors.message ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.message}
                        </p>
                      )}
                    </div>
                  )}

                  {(language === 'both' || language === 'ur') && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Urdu Message (اردو پیغام)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={messageUrdu}
                        onChange={(e) => handleFieldChange('messageUrdu', e.target.value, setMessageUrdu)}
                        placeholder="اپنا پیغام اردو میں لکھیں..."
                        className={cn(
                          "w-full font-urdu rounded-xl border p-3 text-base bg-background focus:outline-none focus:ring-2",
                          errors.messageUrdu ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.messageUrdu && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.messageUrdu}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Block 3: Themes & Designs */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1">
                    <Sparkles className="size-4" /> 3. Card Theme &amp; Artwork
                  </h3>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Select Theme Style
                    </label>
                    <ThemePicker
                      value={themeId}
                      onChange={setThemeId}
                      isPro={isPro}
                      onLockedClick={() => router.push('/pricing')}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Select Card Border Design
                    </label>
                    <BorderPicker
                      value={borderId}
                      onChange={setBorderId}
                      isPro={isPro}
                      onLockedClick={() => router.push('/pricing')}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Select Card Background Design
                    </label>
                    <BackgroundPicker
                      value={bgVariantId}
                      onChange={setBgVariantId}
                      variants={selectedOccasion?.bgVariants}
                    />
                  </div>
                </div>

                {/* Action Block */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-6 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 size-4" /> Change Occasion
                  </Button>
                  <Button onClick={handleFinish} className="w-full sm:w-auto bg-[#7B0D1E] hover:bg-[#7B0D1E]/90 text-white font-bold px-8 shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                    {editSlug ? 'Save Changes' : 'Generate Clean Link'} <Sparkles className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column — sticky preview */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-md text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="size-4 text-[#7B0D1E] animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Live Animated Preview
              </p>
            </div>
            <div className="transform scale-[0.95] origin-top">
              <CardAnimationPreview occasionId={occasionId} animationKey={occasionId} className="max-w-md mx-auto" roundedClass="rounded-[2.5rem]">
                <WishCard
                  data={{
                    occasionId,
                    themeId,
                    borderId,
                    bgVariantId,
                    message: message || templates[0]?.en || 'Best wishes!',
                    messageUrdu: messageUrdu || templates[0]?.ur || 'بہترین دعائیں!',
                    senderName: senderName || user?.name || 'Your Name',
                    recipientName,
                    relation,
                    language,
                  }}
                />
              </CardAnimationPreview>
            </div>

            {/* Sound preview */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sound Preview
              </p>
              <AudioPlayer occasionId={occasionId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreateWishPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-8 md:py-12">
        <Suspense fallback={
          <div className="flex py-20 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
          </div>
        }>
          <CreateWishContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
