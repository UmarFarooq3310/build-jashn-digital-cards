'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Wand2, UserCheck, Heart, Grid, Loader2, AlertCircle, Edit3, Palette, Eye } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { OccasionPicker } from '@/components/jashn/occasion-picker'
import { ThemePicker } from '@/components/jashn/theme-picker'
import { BorderPicker } from '@/components/jashn/border-picker'
import { BackgroundPicker } from '@/components/jashn/background-picker'
import { WishCard } from '@/components/jashn/wish-card'
import CardAnimationPreview from '@/components/jashn/CardAnimationPreview'
import { useJashn } from '@/lib/jashn/store'
import { getOccasion, getTemplates, getLocalizedTemplateText } from '@/lib/jashn/occasions'
import type { Language } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

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
  { id: 'BestFriend', en: 'Best Friend', ur: 'بہترین دوست' },
]

function CreateWishContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createWish, updateWish, wishes } = useJashn()
  const { t, lang } = useLang()

  const editSlug = searchParams.get('edit')

  // Free creation for everyone - no login required to send cards

  const [step, setStep] = useState<1 | 2>(1)
  const [occasionId, setOccasionId] = useState('birthday')
  const [mobileTab, setMobileTab] = useState<'details' | 'design' | 'preview'>('details')
  const [language, setLanguage] = useState<Language>('en')
  const [message, setMessage] = useState('')
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

  useEffect(() => {
    if (editSlug) {
      const existing = wishes.find((w) => w.slug === editSlug)
      if (existing) {
        setOccasionId(existing.occasionId)
        setLanguage(existing.language || 'en')
        setMessage(existing.message || '')
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
        const tPlates = getTemplates(occParam)
        if (tPlates.length > 0) {
          setMessage(getLocalizedTemplateText(tPlates[0], lang))
        }
        setStep(2)
      }
    }
  }, [searchParams, editSlug, wishes, lang])

  function handleOccasionSelect(id: string) {
    setOccasionId(id)
    const newTemplates = getTemplates(id)
    if (newTemplates.length > 0) {
      setMessage(getLocalizedTemplateText(newTemplates[0], lang))
    }
    setErrors({})
    setStep(2)
  }

  function applyTemplate(index: number) {
    const tmpl = templates[index]
    if (tmpl) {
      setMessage(getLocalizedTemplateText(tmpl, lang))
    }
    setErrors((prev) => {
      const copy = { ...prev }
      delete copy.message
      return copy
    })
  }

  function runValidation() {
    const errs: Record<string, string> = {}

    if (step === 2 && !message.trim()) {
      errs.message = t('titleRequired')
    }

    return errs
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    const tempErrors = { ...errors }
    if (field === 'message' && value.trim()) {
      delete tempErrors.message
    }
    setErrors(tempErrors)
  }

  async function handleFinish() {
    const errs = runValidation()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setMobileTab('details')
      }
      return
    }

    const payload = {
      occasionId,
      message: message || (lang === 'ur' ? templates[0]?.ur : templates[0]?.en) || 'Best wishes!',
      language,
      themeId,
      borderId,
      bgVariantId,
      senderName: senderName.trim() || user?.name || 'A Well Wisher',
      recipientName: recipientName.trim(),
      relation,
    }

    if (editSlug) {
      await updateWish(editSlug, payload)
      router.push(`/w/${editSlug}`)
    } else {
      const wish = await createWish(payload)
      router.push(`/w/${wish.slug}`)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-4 pb-20">
      <div className="mb-8 text-center">
        {/* Card Studio Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <Link
            href="/create-invitation"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5DFD3] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#5A4530] transition-all hover:border-[#7A1E2B]/40 hover:text-foreground shadow-sm"
          >
            🎉 {t('weddingInvitationTitle') || 'Wedding & Event Invitation'}
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7A1E2B] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md">
            📧 {t('sendAnimatedWishCard') || 'Send an Animated Wish Card'}
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-[#7A1E2B] font-serif">
          {editSlug ? t('editAnimatedWishCard') : t('sendAnimatedWishCard')}
        </h1>
        <p className="mt-2 text-[#5A4530] text-sm sm:text-base max-w-xl mx-auto">
          Beautiful Animated Wishes &amp; Invitations for Every Celebration — Cardzy.online
        </p>

        {/* Horizontal 2-Step Stepper */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {[
            { s: 1, label: t('stepChooseOccasion') },
            { s: 2, label: t('personalizeShare') },
          ].map(({ s, label }, idx) => (
            <div key={s} className="flex items-center gap-3">
              <button
                onClick={() => { setErrors({}); setStep(s as 1 | 2); }}
                className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-all ${
                  step === s
                    ? 'text-[#7A1E2B]'
                    : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }`}
              >
                <span className={`flex size-7 items-center justify-center rounded-full text-xs transition-all ${
                  step === s
                    ? 'bg-[#7A1E2B] text-white shadow-md ring-4 ring-[#7A1E2B]/20'
                    : 'bg-muted/80 text-muted-foreground'
                }`}>
                  {s}
                </span>
                <span>{label}</span>
              </button>
              {idx < 1 && <div className="h-px w-8 sm:w-12 bg-[#E5DFD3]" />}
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
                <OccasionPicker value={occasionId} onChange={handleOccasionSelect} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Header Selected Occasion Info */}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#7B0D1E]">
                      {t('selectedOccasion')}
                    </span>
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {t(`occ_${selectedOccasion?.id.replace(/-/g, '_')}`) || selectedOccasion?.label}
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

                {/* 📝 Details Tab Content */}
                <div className={cn(mobileTab !== 'details' && 'hidden lg:block', 'space-y-5')}>
                  {/* Relation Pills */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider text-[#7A1E2B] flex items-center gap-1.5 border-b border-[#7A1E2B]/10 pb-1.5">
                      <UserCheck className="size-4" /> 1. WHO IS THIS CARD FOR? (SELECT RELATION)
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {RELATIONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRelation(relation === r.en ? '' : r.en)}
                          className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
                            relation === r.en
                              ? 'border-[#7A1E2B] bg-[#7A1E2B] text-white shadow-md ring-2 ring-[#7A1E2B]/25'
                              : 'border-[#E5DFD3] bg-white text-[#5A4530] hover:bg-muted/60'
                          }`}
                        >
                          {t(('rel' + r.id) as any) || r.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-foreground">
                        Recipient Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => handleFieldChange('recipientName', e.target.value, setRecipientName)}
                        placeholder="e.g. Ayesha"
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.recipientName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7A1E2B]"
                        )}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-foreground">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => handleFieldChange('senderName', e.target.value, setSenderName)}
                        placeholder="e.g. Tariq & Family"
                        dir={lang === 'ur' || lang === 'ar' ? 'auto' : 'ltr'}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                          errors.senderName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7A1E2B]"
                        )}
                      />
                    </div>
                  </div>

                  {/* Message & Pre-written templates */}
                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider text-[#7A1E2B] flex items-center gap-1.5">
                        <Heart className="size-4" /> 2. CARD MESSAGE
                      </h3>
                    </div>

                    {templates.length > 0 && (
                      <div>
                        <label className="mb-2 block text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          CHOOSE PRE-WRITTEN WISH TEMPLATE
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {templates.map((tmpl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => applyTemplate(idx)}
                              className="flex items-center gap-1.5 rounded-xl border border-[#7A1E2B]/20 bg-[#7A1E2B]/5 px-3 py-1.5 text-xs font-bold text-[#7A1E2B] hover:bg-[#7A1E2B]/15 transition-all"
                            >
                              🎁 Template {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <textarea
                        rows={3}
                        dir={lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(message) ? 'rtl' : 'ltr'}
                        value={message}
                        onChange={(e) => handleFieldChange('message', e.target.value, setMessage)}
                        placeholder={t('writeMsgPlaceholder')}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all leading-relaxed",
                          (lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(message)) && "font-urdu text-base",
                          errors.message ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7A1E2B]"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" /> {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 🎨 Design Tab Content */}
                <div className={cn(mobileTab !== 'design' && 'hidden lg:block', 'space-y-6 pt-4 border-t border-border')}>
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider text-[#7A1E2B] flex items-center gap-1.5 border-b border-[#7A1E2B]/10 pb-1.5">
                    <Palette className="size-4" /> 3. CARD THEME &amp; ARTWORK
                  </h3>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      SELECT THEME STYLE
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
                      SELECT BORDER FRAME
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
                      SELECT CANVAS TEXTURE
                    </label>
                    <BackgroundPicker
                      value={bgVariantId}
                      onChange={setBgVariantId}
                      variants={selectedOccasion?.bgVariants}
                    />
                  </div>
                </div>

                {/* 👁️ Preview Tab Content (Mobile) */}
                <div className={cn(mobileTab !== 'preview' && 'hidden lg:hidden', 'space-y-4 pt-2')}>
                  <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/20 to-card p-4 text-center shadow-md">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A1E2B] flex items-center gap-1.5">
                        ♡ LIVE PREVIEW
                      </span>
                    </div>

                    <div className="flex justify-center overflow-hidden py-2">
                      <div className="w-full">
                        <CardAnimationPreview occasionId={occasionId} animationKey={occasionId} className="max-w-md mx-auto" roundedClass="rounded-[2.5rem]">
                          <WishCard
                            data={{
                              occasionId,
                              themeId,
                              borderId,
                              bgVariantId,
                              message: message || (lang === 'ur' ? templates[0]?.ur : templates[0]?.en) || 'Best wishes!',
                              senderName: senderName || user?.name || 'Your Name',
                              recipientName,
                              relation,
                              language,
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
                    className="w-full sm:w-auto rounded-full h-11 px-6 border-[#E5DFD3]"
                  >
                    ← Change Occasion
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="w-full sm:w-auto bg-[#7A1E2B] hover:bg-[#7A1E2B]/90 text-white font-extrabold h-11 px-8 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    Create &amp; Share Wish Card 🚀
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Right Column — Sticky Live Animated Card Preview */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-xl text-center backdrop-blur-md">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center justify-center gap-1.5">
              <Heart className="size-3.5 text-[#7B0D1E] animate-pulse" /> {t('livePreview')}
            </p>

            <div>
              <CardAnimationPreview occasionId={occasionId} animationKey={occasionId} className="max-w-md mx-auto" roundedClass="rounded-[2.5rem]">
                <WishCard
                  data={{
                    occasionId,
                    themeId,
                    borderId,
                    bgVariantId,
                    message: message || (lang === 'ur' ? templates[0]?.ur : templates[0]?.en) || 'Best wishes!',
                    senderName: senderName || user?.name || 'Your Name',
                    recipientName,
                    relation,
                    language,
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
              {editSlug ? t('saveChanges') : t('createWishBtn')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CreateWishPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
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
