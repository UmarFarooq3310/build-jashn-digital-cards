'use client'

import '@/app/invitation-themes-animations.css'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, UserCheck, Heart, Grid, Loader2, AlertCircle, Edit3, Palette, Eye, Sparkles, Trophy, Camera, Music, Volume2, VolumeX, X, CheckCircle2, Gamepad2, Flame, Hash, Shield, Crown, Swords, Zap } from 'lucide-react'
import { AUDIO_TRACKS } from '@/lib/jashn/audio'
import { celebrationAudio } from '@/lib/jashn/audio-synth'
import { generateAIWish, type AITone } from '@/lib/jashn/ai-generator'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { OccasionPicker } from '@/components/jashn/occasion-picker'
import { ThemePicker } from '@/components/jashn/theme-picker'
import { BorderPicker, BORDERS } from '@/components/jashn/border-picker'
import { THEMES } from '@/lib/jashn/themes'
import { BackgroundPicker } from '@/components/jashn/background-picker'
import { WishCard } from '@/components/jashn/wish-card'
import CardAnimationPreview from '@/components/jashn/CardAnimationPreview'
import { PreviewCardFit } from '@/components/jashn/preview-card-fit'
import { useJashn } from '@/lib/jashn/store'
import { getOccasion, getTemplates, getLocalizedTemplateText } from '@/lib/jashn/occasions'
import type { Language } from '@/lib/jashn/types'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useLang } from '@/lib/lang/context'
import { cn, isPageReload } from '@/lib/utils'
import { SmartWordingPicker } from '@/components/jashn/smart-wording-picker'
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'
import { POETRY_DATABASE } from '@/lib/jashn/poetry-data'

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

function cleanStepLabel(text: string) {
  return text.replace(/^[\d\.\s\u0660-\u0669\u09E6-\u09EF\u0966-\u096F\u06D4\-]+/, '').trim()
}

function CreateWishContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, createWish, updateWish, wishes, showToast } = useJashn()
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const occasionParam = searchParams.get('occasion')
  const categoryParam = searchParams.get('category')
  const messageParam = searchParams.get('message')
  const poemParam = searchParams.get('poem')
  const recipientParam = searchParams.get('recipient')
  const senderParam = searchParams.get('sender')
  const relationParam = searchParams.get('relation')
  const editSlug = searchParams.get('edit')

  const resolveOccasionFromCategory = (cat: string | null): string => {
    if (!cat) return 'birthday'
    const c = cat.toLowerCase()
    const map: Record<string, string> = {
      islamic: 'milad',
      eid: 'eid-ul-fitr',
      ramadan: 'ramadan',
      christmas: 'christmas',
      newyear: 'new-year',
      diwali: 'diwali',
      halloween: 'halloween',
      easter: 'easter',
      holi: 'holi',
      love: 'valentines',
      family: 'mothers-day',
      mother: 'mothers-day',
      father: 'fathers-day',
      friendship: 'friendship-day',
      sibling: 'siblings-day',
      cultural: 'basant',
      spiritual: 'shab-e-barat',
      holiday: 'new-year',
      achievement: 'graduation',
      national: 'pakistan-day',
    }
    return map[c] || 'birthday'
  }

  // Free creation for everyone - no login required to send cards

  const [step, setStep] = useState<1 | 2 | 3 | 4>(() => {
    if (editSlug) return 4
    if (occasionParam || categoryParam) return 2
    return 1
  })
  const [occasionId, setOccasionId] = useState<string>(() => {
    if (occasionParam) return occasionParam
    if (categoryParam) return resolveOccasionFromCategory(categoryParam)
    return 'birthday'
  })
  const [language, setLanguage] = useState<Language>('en')
  const [message, setMessage] = useState(() => {
    if (messageParam) return messageParam
    return ''
  })
  const [themeId, setThemeId] = useState('mehndi-red')
  const [borderId, setBorderId] = useState('mehndi')
  const [bgVariantId, setBgVariantId] = useState('default')
  const [senderName, setSenderName] = useState(() => {
    if (senderParam) return senderParam
    return ''
  })
  const [recipientName, setRecipientName] = useState(() => {
    if (recipientParam) return recipientParam
    return ''
  })
  const [relation, setRelation] = useState(() => {
    if (relationParam) return relationParam
    return ''
  })

  // Gaming Winner Extra Fields
  const [playerName, setPlayerName] = useState('')
  const [killCount, setKillCount] = useState('')
  const [rank, setRank] = useState('')
  const [winningNumber, setWinningNumber] = useState('')

  // Custom Photo, Audio & AI Generator State
  const [photoUrl, setPhotoUrl] = useState('')
  const [audioTrack, setAudioTrack] = useState('birthday-festive')
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [showAiModal, setShowAiModal] = useState(false)

  // Cleanup audio playback on unmount
  useEffect(() => {
    return () => {
      celebrationAudio.stop()
    }
  }, [])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isGamingOccasion = [
    'pubg-winner',
    'free-fire-winner',
    'ludo-champion',
    'number-draw-winner',
    'bingo-winner',
    'esports-winner',
  ].includes(occasionId)

  const isNumberDrawOrBingo = ['number-draw-winner', 'bingo-winner'].includes(occasionId)

  const templates = getTemplates(occasionId)
  const selectedOccasion = getOccasion(occasionId)
  const isPro = user?.plan === 'pro' || user?.plan === 'business'

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be under 5MB', 'error')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoUrl(reader.result as string)
      showToast('Photo uploaded successfully! ✨', 'info')
    }
    reader.readAsDataURL(file)
  }

  function handleGenerateAIWish(tone: AITone) {
    const aiText = generateAIWish({
      occasionLabel: selectedOccasion?.label || 'Special Occasion',
      recipientName: playerName || recipientName || 'Friend',
      relation,
      tone,
      occasionId,
      lang,
    })
    setMessage(aiText)
    setShowAiModal(false)
    showToast('AI Wish Generated! ✨', 'info')
  }

  const draftKey = editSlug ? `cardzy_draft_wish_edit_${editSlug}` : 'cardzy_draft_wish'
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)

  // Listen to beforeunload to detect page refresh/reload reliably
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem('__cardzy_reloading__', '1')
        if (!editSlug) {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_wish')
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
        localStorage.removeItem('cardzy_draft_wish')
      } catch {}

      // If user refreshed the creation page (and not editing an existing card), clear draft and reset all fields
      if (!editSlug && isReload) {
        try {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_wish')
        } catch {}
        if (!isCancelled) {
          setSenderName('')
          setRecipientName('')
          setMessage('')
          setRelation('')
          setPlayerName('')
          setKillCount('')
          setRank('')
          setWinningNumber('')
          setPhotoUrl('')
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
          const existing = wishes.find((w) => w.slug === editSlug)
          if (existing) {
            loadedData = existing
          } else {
            const activeDb = getFirebaseDb() || db
            if (isFirebaseConfigured && activeDb) {
              try {
                const snap = await getDoc(doc(activeDb, 'wishes', editSlug))
                if (snap.exists()) {
                  loadedData = snap.data()
                }
              } catch (err) {
                console.error('Error loading wish for edit:', err)
              }
            }
          }
        }

        if (loadedData && !isCancelled) {
          if (loadedData.occasionId) setOccasionId(loadedData.occasionId)
          if (loadedData.themeId) setThemeId(loadedData.themeId)
          if (loadedData.borderId) setBorderId(loadedData.borderId)
          if (loadedData.bgVariantId) setBgVariantId(loadedData.bgVariantId)
          if (loadedData.message !== undefined) setMessage(loadedData.message)
          if (loadedData.senderName !== undefined) setSenderName(loadedData.senderName)
          if (loadedData.recipientName !== undefined) setRecipientName(loadedData.recipientName)
          if (loadedData.relation) setRelation(loadedData.relation)
          if (loadedData.language) setLanguage(loadedData.language)
          if (loadedData.playerName) setPlayerName(loadedData.playerName)
          if (loadedData.killCount) setKillCount(loadedData.killCount)
          if (loadedData.rank) setRank(loadedData.rank)
          if (loadedData.winningNumber) setWinningNumber(loadedData.winningNumber)
          if (loadedData.photoUrl) setPhotoUrl(loadedData.photoUrl)
          if (loadedData.audioTrack) setAudioTrack(loadedData.audioTrack)
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
              if (d.occasionId) setOccasionId(d.occasionId)
              if (d.themeId) setThemeId(d.themeId)
              if (d.borderId) setBorderId(d.borderId)
              if (d.bgVariantId) setBgVariantId(d.bgVariantId)
              if (d.message !== undefined) setMessage(d.message)
              if (d.senderName !== undefined) setSenderName(d.senderName)
              if (d.recipientName !== undefined) setRecipientName(d.recipientName)
              if (d.relation) setRelation(d.relation)
              if (d.language) setLanguage(d.language)
              if (d.playerName) setPlayerName(d.playerName)
              if (d.killCount) setKillCount(d.killCount)
              if (d.rank) setRank(d.rank)
              if (d.winningNumber) setWinningNumber(d.winningNumber)
              if (d.photoUrl) setPhotoUrl(d.photoUrl)
              if (d.audioTrack) setAudioTrack(d.audioTrack)
              if (d.step) setStep(d.step as any)
            }
          }
        } catch {}

        if (!hasDraft) {
          const occParam = searchParams.get('occasion')
          const catParam = searchParams.get('category')
          const msgParam = searchParams.get('message')
          const poemP = searchParams.get('poem')
          const recParam = searchParams.get('recipient')
          const sndParam = searchParams.get('sender')
          const relParam = searchParams.get('relation')

          // Check for poetry prefill
          let prefillText = ''
          try {
            prefillText = sessionStorage.getItem('cardzy_prefill_msg') || ''
            sessionStorage.removeItem('cardzy_prefill_msg')
          } catch {}

          if (!prefillText && poemP) {
            const found = POETRY_DATABASE.find((p) => p.id === poemP)
            if (found) prefillText = found.cardPrefillMsg
          }

          const resolved = occParam || resolveOccasionFromCategory(catParam)
          if (occParam || catParam || prefillText || poemP || msgParam) {
            setOccasionId(resolved)
            if (prefillText) {
              setMessage(prefillText)
              setStep(2)
            } else if (msgParam) {
              setMessage(msgParam)
              setStep(2)
            } else {
              const tPlates = getTemplates(resolved)
              if (tPlates.length > 0) {
                setMessage(getLocalizedTemplateText(tPlates[0], lang))
              }
            }
            if (recParam) setRecipientName(recParam)
            if (sndParam) setSenderName(sndParam)
            if (relParam) setRelation(relParam)
            setStep(2)

            // Clean cluttered URL in address bar
            if (typeof window !== 'undefined' && (poemP || msgParam)) {
              try {
                window.history.replaceState({}, '', window.location.pathname)
              } catch {}
            }
          }
        }
      }
      if (!isCancelled) setIsInitialLoaded(true)
    }

    initData()
    return () => {
      isCancelled = true
    }
  }, [editSlug, draftKey])

  // 2. Auto-save draft on changes (SESSION ONLY for active back/forward flow)
  useEffect(() => {
    if (!isInitialLoaded || typeof window === 'undefined') return
    const draftData = {
      step,
      occasionId,
      themeId,
      borderId,
      bgVariantId,
      message,
      senderName,
      recipientName,
      relation,
      language,
      playerName,
      killCount,
      rank,
      winningNumber,
      photoUrl,
      audioTrack,
    }
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draftData))
    } catch {}
  }, [
    isInitialLoaded,
    draftKey,
    step,
    occasionId,
    themeId,
    borderId,
    bgVariantId,
    message,
    senderName,
    recipientName,
    relation,
    language,
    playerName,
    killCount,
    rank,
    winningNumber,
    photoUrl,
    audioTrack,
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
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }

  function handleOccasionSelect(id: string) {
    setOccasionId(id)
    setErrors({})
    changeStep(2)
    
    // Automatically set default template for the newly selected occasion if message is empty
    if (!message) {
      const tPlates = getTemplates(id)
      if (tPlates.length > 0) {
        setMessage(getLocalizedTemplateText(tPlates[0], lang))
      }
    }
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

    if (isGamingOccasion) {
      if (!playerName.trim() && !recipientName.trim()) {
        errs.playerName = t('playerNameRequired', 'Player / Squad Name is required')
      }
      if (killCount.trim() && !/\d+/.test(killCount.trim())) {
        errs.killCount = t('killCountNumber', 'Score / Kill Count must contain a number (e.g. 15 or 15 Kills)')
      }
      if (rank.trim() && !/\d+/.test(rank.trim())) {
        errs.rank = t('rankNumber', 'Rank must contain a number (e.g. 1 or #1)')
      }
    } else {
      if (!relation.trim()) {
        errs.relation = t('relationRequired', 'Please select a relation')
      }
      if (!recipientName.trim()) {
        errs.recipientName = t('recipientNameRequired', 'Recipient Name is required')
      }
      if (!senderName.trim()) {
        errs.senderName = t('senderNameRequired', 'Your Name (Sender) is required')
      }
    }
    if (!message.trim()) {
      errs.message = t('wishMessageRequired', 'Wish message is required')
    }

    return errs
  }

  function handleGoToStep3() {
    const errs = runValidation()
    setErrors(errs)
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      const firstKey = errKeys[0]
      showToast(errs[firstKey] || t('completeAllRequiredFields', 'Please complete all required fields.'), 'error')
      if (typeof window !== 'undefined') {
        const el = document.getElementById(`field-${firstKey}`) || document.querySelector(`[name="${firstKey}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ;(el as HTMLElement).focus()
        }
      }
      return
    }
    setStep(3)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }

  function handleGoToStep4() {
    setStep(4)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }

  function handleFieldChange(field: string, value: string, setter: (v: string) => void) {
    setter(value)
    const tempErrors = { ...errors }
    if (value.trim()) {
      delete tempErrors[field]
    }
    setErrors(tempErrors)
  }

  async function handleFinish() {
    const errs = runValidation()
    setErrors(errs)
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      setStep(2)
      const firstKey = errKeys[0]
      const firstError = errs[firstKey] || t('completeAllRequiredFields', 'Please complete all required fields marked in red.')
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

      const payload = {
        occasionId,
        message: message || (lang === 'ur' ? templates[0]?.ur : templates[0]?.en) || 'Winner Winner Chicken Dinner!',
        language,
        themeId: finalThemeId,
        borderId: finalBorderId,
        bgVariantId,
        senderName: senderName.trim() || user?.name || (isGamingOccasion ? 'Victory Squad' : 'A Well Wisher'),
        recipientName: (isGamingOccasion && playerName.trim()) ? playerName.trim() : (recipientName.trim() || 'Winner'),
        relation,
        playerName: playerName.trim(),
        killCount: killCount.trim(),
        rank: rank.trim(),
        winningNumber: winningNumber.trim(),
        photoUrl,
        audioTrack,
      }

      if (editSlug) {
        await updateWish(editSlug, payload)
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('wishUpdatedSuccess', 'Wish card updated successfully! 🎉'), 'success')
        router.push(`/w/${editSlug}?mode=sender`)
      } else {
        const wish = await createWish(payload)
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('wishCreatedSuccess', 'Wish card created successfully! 🚀'), 'success')
        router.push(`/w/${wish.slug}?mode=sender`)
      }
    } catch (err: any) {
      console.error('Failed to create wish card:', err)
      showToast(err?.message || 'Failed to generate wish card. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-8 text-center">
        {/* Card Studio Mode Switcher */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs mb-6">
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs bg-[#7B0D1E]">
            💌 {t('studioTabWish', 'Wish Cards')}
          </div>
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
            { s: 1, label: t('stepWishPartOccasion') || t('stepPartOccasion') || '1. Occasion' },
            { s: 2, label: t('stepWishPartDetails') || '2. Message & Details' },
            { s: 3, label: t('stepWishPartMedia') || '3. Photo & Music' },
            { s: 4, label: t('stepWishPartDesign') || t('stepPartDesign') || '4. Theme & Style' },
          ].map(({ s, label }) => {
            const isClickable = s === 1 || !!occasionId
            return (
              <div key={s} className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isClickable) {
                      setErrors({})
                      setStep(s as 1 | 2 | 3 | 4)
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
                      setStep(s as 1 | 2 | 3 | 4)
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

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
            {/* ── PART 1: OCCASION SELECTION ── */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                    <Grid className="size-5 text-[#7B0D1E]" /> {t('stepWishPartOccasion') || '1. Choose Celebration Occasion'}
                  </h2>
                  <span className="text-xs font-medium text-muted-foreground">{t('clickTileToPersonalize')}</span>
                </div>
                <OccasionPicker value={occasionId} onChange={handleOccasionSelect} />
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('btnNext') || 'Next'}</span>
                    <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                  </Button>
                </div>
              </div>
            )}



            {/* ── PART 2: MESSAGE & DETAILS ── */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Header Selected Occasion Info */}
                <div className="flex items-center justify-between border-b border-border pb-2.5 mb-2">
                  <div>
                    <span className="text-[9.5px] uppercase font-extrabold tracking-wider text-[#7B0D1E] block">
                      {t('selectedOccasion')}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5 leading-tight">
                      {t(`occ_${selectedOccasion?.id.replace(/-/g, '_')}`) || selectedOccasion?.label}
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="text-[11px] h-7 px-2.5 rounded-lg flex items-center gap-1 border-border bg-card hover:bg-muted text-foreground font-semibold"
                  >
                    <Grid className="size-3 text-[#7B0D1E]" /> {t('viewOccasions')}
                  </Button>
                </div>

                <div className={cn('space-y-5 text-left', (lang === 'ur' || lang === 'ar') && 'text-right font-urdu')}>
                  {isGamingOccasion ? (
                    <div className="space-y-4 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-black p-4 sm:p-5 text-slate-100 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
                      
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                          <Trophy className="size-4 text-amber-400" />
                          <span>🎮 ESPORTS VICTORY & SCORECARD</span>
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-900 border border-amber-500/30 px-2 py-0.5 rounded-full">
                          HUD CONFIG
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 pt-1">
                        {/* Player / Squad Tag */}
                        <div className="sm:col-span-2">
                          <label className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            <Gamepad2 className="size-3.5 text-amber-400" />
                            <span>Gamer Tag / Squad Name *</span>
                          </label>
                          <input
                            id="field-playerName"
                            type="text"
                            value={playerName}
                            onChange={(e) => handleFieldChange('playerName', e.target.value, setPlayerName)}
                            placeholder="e.g. ShadowSniper99 / Team Alpha"
                            className={cn(
                              "w-full rounded-2xl border p-3 text-sm bg-slate-950 text-white font-medium focus:outline-none focus:ring-2 transition-all",
                              errors.playerName ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:border-amber-400 focus:ring-amber-400/30"
                            )}
                          />
                          {errors.playerName && (
                            <p className="mt-1 text-xs font-semibold text-red-400 flex items-center gap-1">
                              <AlertCircle className="size-3 shrink-0" /> {errors.playerName}
                            </p>
                          )}
                        </div>

                        {/* Kills / Combat Score */}
                        <div>
                          <label className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            <Flame className="size-3.5 text-emerald-400" />
                            <span>Combat Kills / Score</span>
                          </label>
                          <input
                            id="field-killCount"
                            type="text"
                            value={killCount}
                            onChange={(e) => handleFieldChange('killCount', e.target.value, setKillCount)}
                            placeholder="e.g. 18 Kills or 2450 Pts"
                            className={cn(
                              "w-full rounded-2xl border p-3 text-sm bg-slate-950 text-white font-medium focus:outline-none focus:ring-2 transition-all",
                              errors.killCount ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:border-emerald-400 focus:ring-emerald-400/30"
                            )}
                          />
                          {/* Quick Preset Chips for Kills */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {[
                              { label: '5 Kills', value: '5' },
                              { label: '12 Kills', value: '12' },
                              { label: '24 Kills', value: '24' },
                              { label: '35 Kills', value: '35' },
                              { label: '50+ Godlike', value: '50+' },
                            ].map((preset) => (
                              <button
                                key={preset.value}
                                type="button"
                                onClick={() => handleFieldChange('killCount', preset.value, setKillCount)}
                                className={cn(
                                  "text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                                  killCount === preset.value
                                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40"
                                )}
                              >
                                🔥 {preset.label}
                              </button>
                            ))}
                          </div>
                          {errors.killCount && (
                            <p className="mt-1 text-xs font-semibold text-red-400 flex items-center gap-1">
                              <AlertCircle className="size-3 shrink-0" /> {errors.killCount}
                            </p>
                          )}
                        </div>

                        {/* Tournament Rank */}
                        <div>
                          <label className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            <Crown className="size-3.5 text-amber-400" />
                            <span>Tournament Rank</span>
                          </label>
                          <input
                            id="field-rank"
                            type="text"
                            value={rank}
                            onChange={(e) => handleFieldChange('rank', e.target.value, setRank)}
                            placeholder="e.g. 1, #1, #2, MVP"
                            className={cn(
                              "w-full rounded-2xl border p-3 text-sm bg-slate-950 text-white font-medium focus:outline-none focus:ring-2 transition-all",
                              errors.rank ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:border-amber-400 focus:ring-amber-400/30"
                            )}
                          />
                          {/* Quick Preset Chips for Rank */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {[
                              { label: '#1 Champion', value: '#1' },
                              { label: '#2 Runner-Up', value: '#2' },
                              { label: '#3 Squad', value: '#3' },
                              { label: 'Chicken Dinner', value: 'Winner #1' },
                              { label: 'MVP Leader', value: 'MVP' },
                            ].map((preset) => (
                              <button
                                key={preset.value}
                                type="button"
                                onClick={() => handleFieldChange('rank', preset.value, setRank)}
                                className={cn(
                                  "text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                                  rank === preset.value
                                    ? "bg-amber-500/20 border-amber-400 text-amber-300"
                                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40"
                                )}
                              >
                                👑 {preset.label}
                              </button>
                            ))}
                          </div>
                          {errors.rank && (
                            <p className="mt-1 text-xs font-semibold text-red-400 flex items-center gap-1">
                              <AlertCircle className="size-3 shrink-0" /> {errors.rank}
                            </p>
                          )}
                        </div>

                        {/* Winning Number for Lottery / Bingo */}
                        {isNumberDrawOrBingo && (
                          <div className="sm:col-span-2">
                            <label className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                              <Hash className="size-3.5 text-purple-400" />
                              <span>Lucky Winning Number</span>
                            </label>
                            <input
                              id="field-winningNumber"
                              type="text"
                              value={winningNumber}
                              onChange={(e) => setWinningNumber(e.target.value)}
                              placeholder="e.g. #777 / B-12"
                              className="w-full rounded-2xl border border-slate-700 p-3 text-sm bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            />
                          </div>
                        )}

                        {/* Sender / Squad Deployer */}
                        <div className="sm:col-span-2">
                          <label className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold text-sky-300 uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            <Shield className="size-3.5 text-sky-400" />
                            <span>Deployed By Squad / Clan Name <span className="text-slate-500 font-normal lowercase">(optional)</span></span>
                          </label>
                          <input
                            id="field-gamingSenderName"
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="e.g. Victory Squad / Clan Alpha"
                            className="w-full rounded-2xl border border-slate-700 p-3 text-sm bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Relation Pills */}
                      <div id="field-relation" className={cn("space-y-3 rounded-2xl p-2.5 transition-all", errors.relation && "border border-red-500/60 bg-red-50/50 dark:bg-red-950/20")}>
                        <h3 className={cn("text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5 border-b border-[#7B0D1E]/10 pb-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                          <UserCheck className="size-4 shrink-0" />
                          <span>{t('whoIsCardForHeader') || '1. WHO IS THIS CARD FOR? (SELECT RELATION)'}</span>
                          <span className="text-red-500 font-bold ml-0.5">*</span>
                        </h3>
                        <div className={cn("flex flex-wrap gap-2 pt-1", (lang === 'ur' || lang === 'ar') && "justify-end")}>
                          {RELATIONS.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => {
                                const nextVal = relation === r.en ? '' : r.en
                                setRelation(nextVal)
                                if (nextVal) {
                                  setErrors((prev) => {
                                    const copy = { ...prev }
                                    delete copy.relation
                                    return copy
                                  })
                                }
                              }}
                              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
                                relation === r.en
                                  ? 'border-[#7B0D1E] bg-[#7B0D1E] text-white shadow-xs ring-2 ring-[#7B0D1E]/25'
                                  : errors.relation
                                    ? 'border-red-300 bg-card text-foreground hover:bg-muted'
                                    : 'border-border bg-card text-foreground hover:bg-muted'
                              }`}
                            >
                              {t(('rel' + r.id) as any) || r.en}
                            </button>
                          ))}
                        </div>
                        {errors.relation && (
                          <p className={cn("mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500", (lang === 'ur' || lang === 'ar') ? "justify-end font-urdu" : "text-left")}>
                            <AlertCircle className="size-3.5 shrink-0" />
                            <span>{errors.relation}</span>
                          </p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            {t('recipientNameLabel') || 'Recipient Name *'}
                          </label>
                          <input
                            id="field-recipientName"
                            type="text"
                            value={recipientName}
                            onChange={(e) => handleFieldChange('recipientName', e.target.value, setRecipientName)}
                            placeholder={t('placeholderRecipient') || 'e.g. Ayesha'}
                            dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                            className={cn(
                              "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                              errors.recipientName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]",
                              (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left"
                            )}
                          />
                          {errors.recipientName && (
                            <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                              <AlertCircle className="size-3 shrink-0" /> {errors.recipientName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className={cn("mb-1.5 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                            {t('senderNameLabel') || 'Your Name (Sender) *'}
                          </label>
                          <input
                            id="field-senderName"
                            type="text"
                            value={senderName}
                            onChange={(e) => handleFieldChange('senderName', e.target.value, setSenderName)}
                            placeholder={t('placeholderSender') || 'e.g. Tariq & Family'}
                            dir={lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr'}
                            className={cn(
                              "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all",
                              errors.senderName ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]",
                              (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left"
                            )}
                          />
                          {errors.senderName && (
                            <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                              <AlertCircle className="size-3 shrink-0" /> {errors.senderName}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message & Pre-written templates */}
                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <h3 className={cn("text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                        {isGamingOccasion ? (
                          <>
                            <Swords className="size-4 text-amber-500" />
                            <span className="text-amber-500 dark:text-amber-400">2. VICTORY MISSION DEBRIEF / MESSAGE</span>
                          </>
                        ) : (
                          <>
                            <Heart className="size-4" />
                            <span>{t('cardMessageHeader') || '2. CARD MESSAGE'}</span>
                          </>
                        )}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowAiModal(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3 py-1 text-[11px] font-bold text-white shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      >
                        <Sparkles className="size-3" />
                        <span>{t('generateWithAi') || '✨ AI Wish Generator'}</span>
                      </button>
                    </div>

                    {templates.length > 0 && (
                      <div>
                        <label className={cn("mb-2 block text-xs font-bold text-foreground uppercase tracking-wider", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                          {t('choosePrewrittenWishTemplate') || 'CHOOSE PRE-WRITTEN WISH TEMPLATE'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {templates.map((tmpl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => applyTemplate(idx)}
                              className="flex items-center gap-1.5 rounded-xl border border-[#7B0D1E]/20 bg-[#7B0D1E]/5 px-3 py-1.5 text-xs font-bold text-[#7B0D1E] hover:bg-[#7B0D1E]/15 transition-all"
                            >
                              🎁 {t('templatePrefix') || 'Template'} {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 1-Click Smart Wording & Shayari Generator */}
                    {!isGamingOccasion && (
                      <SmartWordingPicker
                        lang={lang}
                        occasionId={occasionId}
                        onSelectWording={(selectedText) => {
                          handleFieldChange('message', selectedText, setMessage)
                          showToast('Wording applied! ✍️✨', 'success')
                        }}
                      />
                    )}

                    <div>
                      <textarea
                        id="field-message"
                        rows={3}
                        dir={lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(message) ? 'rtl' : 'ltr'}
                        value={message}
                        onChange={(e) => handleFieldChange('message', e.target.value, setMessage)}
                        placeholder={t('writeMsgPlaceholder')}
                        className={cn(
                          "w-full rounded-2xl border p-3 text-sm bg-background focus:outline-none focus:ring-2 transition-all leading-relaxed",
                          (lang === 'ur' || lang === 'ar' || /[\u0600-\u06FF]/.test(message)) && "font-urdu text-base",
                          errors.message ? "border-red-500 focus:ring-red-500" : "border-input focus:ring-[#7B0D1E]"
                        )}
                      />
                      {errors.message && (
                        <p className={cn("mt-1 text-xs font-semibold text-red-500 flex items-center gap-1", (lang === 'ur' || lang === 'ar') && "flex-row-reverse text-right font-urdu")}>
                          <AlertCircle className="size-3 shrink-0" /> {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Buttons for Part 2 */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-5 mt-5">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                    <span>{t('btnBack') || 'Back'}</span>
                  </Button>
                  <Button
                    onClick={handleGoToStep3}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('btnNext') || 'Next'}</span>
                    <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                  </Button>
                </div>
              </div>
            )}

            {/* ── PART 3: PHOTO & MUSIC ── */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Camera className="size-5 text-[#7B0D1E]" />
                    <span>{t('stepWishPartMedia') || '3. Photo & Music'}</span>
                  </h2>
                </div>

                {/* Custom Photo Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                      <Camera className="size-4 text-[#7B0D1E]" /> {t('customCardPhotoLabel') || 'Custom Card Photo (Optional)'}
                    </label>
                    {photoUrl && (
                      <button type="button" onClick={() => setPhotoUrl('')} className="text-[11px] text-red-500 font-bold hover:underline cursor-pointer">
                        {t('removePhotoBtn') || 'Remove Photo'}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 rounded-2xl border border-input bg-background px-4 py-2.5 text-xs font-bold hover:bg-muted cursor-pointer transition-all shadow-xs">
                      <Camera className="size-4 text-[#7B0D1E]" />
                      <span>{photoUrl ? (t('changePhoto') || 'Change Photo') : (t('uploadPhoto') || 'Upload Photo')}</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    {photoUrl && (
                      <ZoomableImageBadge
                        src={photoUrl}
                        alt="Custom Greeting Card Photo Upload Preview"
                        badgeText="View Large"
                        className="size-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md cursor-zoom-in"
                        imgClassName="size-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Audio Track Selector */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className={cn("flex items-center justify-between", (lang === 'ur' || lang === 'ar') && "flex-row-reverse")}>
                    <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5", (lang === 'ur' || lang === 'ar') ? "text-right flex-row-reverse font-urdu" : "text-left")}>
                      <Music className="size-4 text-[#7B0D1E]" /> {t('backgroundMusicTrackLabel') || 'Background Music Track (Plays on Open)'}
                    </label>
                    {audioTrack !== 'none' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (playingTrackId) {
                            celebrationAudio.stop()
                            setPlayingTrackId(null)
                          } else {
                            celebrationAudio.playTrack(audioTrack)
                            setPlayingTrackId(audioTrack)
                          }
                        }}
                        className="text-[11px] font-semibold text-[#7B0D1E] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="size-3.5" />
                        {playingTrackId ? (t('stopPreview') || 'Stop Sound ⏹️') : (t('previewSound') || 'Play Sound 🔊')}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {AUDIO_TRACKS.map((trk) => {
                      const isSelected = audioTrack === trk.id
                      const isCurrentlyPlaying = playingTrackId === trk.id
                      return (
                        <button
                          key={trk.id}
                          type="button"
                          onClick={() => {
                            setAudioTrack(trk.id)
                            if (trk.id === 'none') {
                              celebrationAudio.stop()
                              setPlayingTrackId(null)
                            } else {
                              celebrationAudio.playTrack(trk.id)
                              setPlayingTrackId(trk.id)
                            }
                          }}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs group",
                            isSelected
                              ? "border-[#7B0D1E] bg-[#7B0D1E]/8 ring-2 ring-[#7B0D1E]/25 font-bold"
                              : "border-border bg-card hover:border-[#7B0D1E]/30"
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={cn(
                              "size-8 rounded-xl flex items-center justify-center shrink-0 transition-all",
                              isSelected ? "bg-[#7B0D1E] text-white" : "bg-muted text-muted-foreground group-hover:bg-[#7B0D1E]/10 group-hover:text-[#7B0D1E]",
                              isCurrentlyPlaying && "animate-pulse ring-2 ring-amber-400"
                            )}>
                              {trk.id === 'none' ? (
                                <VolumeX className="size-4" />
                              ) : isCurrentlyPlaying ? (
                                <Volume2 className="size-4 text-white animate-bounce" />
                              ) : (
                                <Music className="size-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-foreground block truncate">{trk.name}</span>
                              <span className="text-[10px] text-muted-foreground capitalize">
                                {isCurrentlyPlaying ? '🎵 Playing sample...' : trk.category}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-[#7B0D1E] text-white">
                              <CheckCircle2 className="size-3.5" />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Buttons for Part 3 */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-5 mt-5">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                    <span>{t('btnBack') || 'Back'}</span>
                  </Button>
                  <Button
                    onClick={handleGoToStep4}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-lg shadow-[#7B0D1E]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('btnNext') || 'Next'}</span>
                    <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                  </Button>
                </div>
              </div>
            )}

            {/* ── PART 4: THEME & STYLE ── */}
            {step === 4 && (
              <div className="space-y-3.5 text-left">
                <div className="flex items-center justify-between border-b border-[#7B0D1E]/10 pb-1">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#7B0D1E] flex items-center gap-1.5">
                    <Palette className="size-3.5 text-[#7B0D1E]" />
                    <span>{t('stepWishPartDesign') || '4. Theme & Style'}</span>
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <label className={cn("block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", (lang === 'ur' || lang === 'ar') ? "text-right font-urdu" : "text-left")}>
                    {t('selectThemeStyleLabel') || 'SELECT THEME STYLE'}
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
                    {t('selectBorderFrameLabel') || 'SELECT BORDER FRAME'}
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
                    {t('selectCanvasTextureLabel') || 'SELECT CANVAS TEXTURE'}
                  </label>
                  <BackgroundPicker
                    value={bgVariantId}
                    onChange={setBgVariantId}
                    variants={selectedOccasion?.bgVariants}
                  />
                </div>

                {/* Bottom Navigation Buttons for Part 4 */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t border-border pt-5 mt-5">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
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
                        <span>{t('generatingCard', 'Generating Wish Card...')}</span>
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
        </div>

        {/* Desktop & Mobile Right Column — Sticky Live Animated Card Preview */}
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
              <CardAnimationPreview occasionId={occasionId} animationKey={occasionId} className="max-w-md mx-auto" roundedClass="rounded-[2.5rem]">
                <WishCard
                  data={{
                    occasionId,
                    themeId,
                    borderId,
                    bgVariantId,
                    message: step === 1
                      ? (message || (templates.length > 0 ? getLocalizedTemplateText(templates[0], lang) : t('defaultWishDefaultMessage', 'Wishing you a day filled with happiness, laughter and immense blessings!')))
                      : (message || ''),
                    senderName: step === 1
                      ? (senderName || user?.name || (isGamingOccasion ? 'Victory Squad' : t('defaultWishSender', 'Tariq & Family')))
                      : (senderName || user?.name || ''),
                    recipientName: (isGamingOccasion && playerName)
                      ? playerName
                      : (step === 1 ? (recipientName || t('defaultWishRecipient', 'Ayesha')) : (recipientName || '')),
                    relation: step === 1 ? (relation || t('defaultWishRelation', 'Friend')) : (relation || ''),
                    language,
                    playerName,
                    killCount,
                    rank,
                    winningNumber,
                    photoUrl,
                  }}
                />
              </CardAnimationPreview>
            </PreviewCardFit>
          </div>
        </div>
      </div>



      {/* AI Wish Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 text-left">
            <button
              type="button"
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#7B0D1E]">
                <Sparkles className="size-5" />
                <h3 className="font-extrabold text-base text-foreground">
                  {t('generateWithAi') || 'AI Wish Generator'}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Choose a tone to automatically generate personalized wording for {selectedOccasion?.label || 'your occasion'}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                { tone: 'warm' as AITone, label: 'Warm & Heartfelt ❤️', desc: 'Emotional & touching' },
                { tone: 'poetic' as AITone, label: 'Poetic & Elegant 🌸', desc: 'Graceful & deep' },
                { tone: 'funny' as AITone, label: 'Playful & Fun 😄', desc: 'Humorous & lively' },
                { tone: 'formal' as AITone, label: 'Formal & Respectful 🎩', desc: 'Polite & honored' },
                { tone: 'religious' as AITone, label: 'Spiritual & Blessed 🌙', desc: 'Prayers & blessings' },
                { tone: 'short' as AITone, label: 'Short & Sweet ✨', desc: 'Quick & punchy' },
              ].map(({ tone, label, desc }) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => handleGenerateAIWish(tone)}
                  className="flex flex-col items-start gap-1 p-3 rounded-2xl border border-border bg-background hover:border-[#7B0D1E]/50 hover:bg-muted/50 text-left transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  <span className="text-xs font-bold text-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Guide Overview Card */}
      <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-left space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-3.5" /> {t('wishCreatorOverviewBadge') || 'Wish Creator Overview'}
          </span>
        </div>
        <h2 className={`text-xl sm:text-2xl font-extrabold text-foreground tracking-tight ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
          {t('personalizedWishCardsTitle') || 'Personalized 3D Animated Wish Cards with Photo & Name'}
        </h2>
        <p className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}`}>
          {t('personalizedWishCardsDesc') || 'Cardzy allows you to create interactive, 3D animated greeting cards for Eid Mubarak, Birthdays, Friendship Day, Ramadan, Anniversaries, and Congratulations. Personalize your card with custom photo uploads, warm family messages in Urdu or English, background music tracks, and custom color accents. Share instantly via WhatsApp, Instagram, or email with zero setup required.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('personalPhotoNameCustomizationTitle') || 'Personal Photo & Name Customization'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('personalPhotoNameCustomizationDesc') || 'Upload photos and enter your custom sender name for a truly unique personalized greeting.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('multilingualTemplatesTitle') || '18 Multilingual Pre-written Templates'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('multilingualTemplatesDesc') || 'Choose from curated Urdu, Arabic, and English wish wording for every special occasion.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className={`font-extrabold text-xs text-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>
              {t('liveWhatsappRsvpTitle') || 'Instant WhatsApp & Social Share'}
            </h3>
            <p className={`text-[11px] text-muted-foreground mt-1 leading-relaxed ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
              {t('liveWhatsappRsvpDesc') || 'Share your animated greeting cards instantly with friends & family on WhatsApp with 1 click.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function CreateWishPage() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <Suspense fallback={
      <div className="flex py-20 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    }>
      <CreateWishContent />
    </Suspense>
  )
}
