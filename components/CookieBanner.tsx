'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Cookie, X, Check, Lock, BarChart3, Sparkles, ShieldCheck, Settings2, RotateCcw } from 'lucide-react'
import { useLang, type LangCode } from '@/lib/lang/context'
import { COOKIE_TRANSLATIONS } from '@/lib/lang/cookie-translations'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CookiePrefs {
  essential: true
  analytics: boolean
  advertising: boolean
}

const CONSENT_KEY = 'cardzy_consent_v3'

// ─── Extend window ────────────────────────────────────────────────────────────

declare global {
  interface Window {
    openCookiePreferences?: () => void
    openCookieAlert?: () => void
    showCookieAlert?: () => void
    openCardzyCookieConsent?: () => void
    resetCookieConsent?: () => void
    gtag?: (...args: unknown[]) => void
    __pendingCookieModal?: boolean
    __pendingCookieAlert?: boolean
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadConsent(): CookiePrefs | null {
  try {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return {
        essential: true,
        analytics: parsed.analytics !== false,
        advertising: parsed.advertising !== false,
      }
    }
  } catch {
    // ignore
  }
  return null
}

function saveConsent(prefs: CookiePrefs) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }))
    localStorage.setItem('cardzy_cookie_consent', prefs.analytics && prefs.advertising ? 'accepted' : 'declined')
    document.cookie = `cardzy_cookie_consent=${prefs.analytics && prefs.advertising ? 'accepted' : 'declined'}; max-age=31536000; path=/; SameSite=Lax`
  } catch {
    // ignore
  }
}

function pushGtagConsent(analytics: boolean, advertising: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: advertising ? 'granted' : 'denied',
      ad_user_data: advertising ? 'granted' : 'denied',
      ad_personalization: advertising ? 'granted' : 'denied',
    })
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CookieBanner() {
  const { lang } = useLang()
  const activeLang: LangCode = (lang as LangCode) || 'en'
  const isRtl = activeLang === 'ur' || activeLang === 'ar'

  const tr = useCallback((key: string): string => {
    return COOKIE_TRANSLATIONS[key]?.[activeLang] || COOKIE_TRANSLATIONS[key]?.en || ''
  }, [activeLang])

  const [mounted, setMounted] = useState(false)
  // null = not yet decided (show banner), non-null = decided (hide banner)
  const [consent, setConsent] = useState<CookiePrefs | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>({ essential: true, analytics: true, advertising: true })

  const triggerToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    if (typeof window !== 'undefined') {
      if (typeof window.showToast === 'function') {
        window.showToast(message, type)
      } else {
        window.dispatchEvent(new CustomEvent('jashn-toast', {
          detail: { id: Date.now() + Math.random(), message, type }
        }))
      }
    }
  }, [])

  const openModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const showAlertBanner = useCallback(() => {
    setShowModal(false)
    setConsent(null)
    triggerToast(tr('toastNoticeActive'), 'info')
  }, [triggerToast, tr])

  const resetConsent = useCallback((withToast = false) => {
    try {
      localStorage.removeItem(CONSENT_KEY)
      localStorage.removeItem('cardzy_cookie_consent')
      localStorage.removeItem('cookie_consent')
    } catch {}
    setShowModal(false)
    setConsent(null)
    if (withToast) {
      triggerToast(tr('toastReset'), 'info')
    }
  }, [triggerToast, tr])

  // Accept / decline helpers
  const accept = useCallback((analytics: boolean, advertising: boolean) => {
    const p: CookiePrefs = { essential: true, analytics, advertising }
    saveConsent(p)
    pushGtagConsent(analytics, advertising)
    setConsent(p)
    setShowModal(false)
    triggerToast(tr('toastSaved'), 'success')
  }, [triggerToast, tr])

  // Keep handlers in a ref so the mount effect has an immutable empty dependency array
  const handlersRef = useRef({
    openModal,
    closeModal,
    showAlertBanner,
    resetConsent,
    triggerToast,
    tr,
  })

  useEffect(() => {
    handlersRef.current = {
      openModal,
      closeModal,
      showAlertBanner,
      resetConsent,
      triggerToast,
      tr,
    }
  })

  // On mount: read stored consent, wire up global functions + events
  useEffect(() => {
    setMounted(true)

    // Wire up global openers
    window.openCookiePreferences = () => handlersRef.current.openModal()
    window.openCardzyCookieConsent = () => handlersRef.current.openModal()
    window.openCookieAlert = () => handlersRef.current.showAlertBanner()
    window.showCookieAlert = () => handlersRef.current.showAlertBanner()
    window.resetCookieConsent = () => handlersRef.current.resetConsent(true)

    // If pre-mount flags were set, trigger corresponding view
    if (window.__pendingCookieModal) {
      window.__pendingCookieModal = false
      handlersRef.current.openModal()
    }
    if (window.__pendingCookieAlert) {
      window.__pendingCookieAlert = false
      handlersRef.current.showAlertBanner()
    }

    // Event listeners
    const modalHandler = () => handlersRef.current.openModal()
    const alertHandler = () => handlersRef.current.showAlertBanner()
    const resetHandler = () => handlersRef.current.resetConsent(true)

    window.addEventListener('cardzy:open-cookie-prefs', modalHandler)
    window.addEventListener('open_cookie_preferences', modalHandler)
    window.addEventListener('cardzy:show-cookie-alert', alertHandler)
    window.addEventListener('show_cookie_alert', alertHandler)
    window.addEventListener('reset_cookie_consent', resetHandler)

    // Click delegator for data attributes and anchor links
    const handleDocumentClick = (e: MouseEvent) => {
      try {
        const target = (e.target as HTMLElement)?.closest?.(
          '[data-open-cookie-preferences], [data-cookie-preferences], [data-show-cookie-alert], [data-reset-cookies], a[href="#cookie-preferences"], a[href="#cookie-alert"]'
        )
        if (target) {
          e.preventDefault()
          e.stopPropagation()
          const href = target.getAttribute('href')
          if (target.hasAttribute('data-show-cookie-alert') || href === '#cookie-alert') {
            handlersRef.current.showAlertBanner()
          } else if (target.hasAttribute('data-reset-cookies')) {
            handlersRef.current.resetConsent(true)
          } else {
            handlersRef.current.openModal()
          }
        }
      } catch {}
    }
    document.addEventListener('click', handleDocumentClick, true)

    // Check if user requested to show or reset cookies via URL query or hash
    if (typeof window !== 'undefined') {
      const search = window.location.search.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      const hasCookieTrigger =
        search.includes('cookie') ||
        search.includes('reset') ||
        hash.includes('cookie') ||
        hash.includes('privacy-choices')

      if (hasCookieTrigger) {
        handlersRef.current.resetConsent(false)
        setTimeout(() => {
          handlersRef.current.triggerToast(handlersRef.current.tr('toastNoticeActive'), 'info')
        }, 350)
      } else {
        const stored = loadConsent()
        setConsent(stored)
        if (stored) {
          pushGtagConsent(stored.analytics, stored.advertising)
          setPrefs(stored)
        }
      }
    }

    return () => {
      window.removeEventListener('cardzy:open-cookie-prefs', modalHandler)
      window.removeEventListener('open_cookie_preferences', modalHandler)
      window.removeEventListener('cardzy:show-cookie-alert', alertHandler)
      window.removeEventListener('show_cookie_alert', alertHandler)
      window.removeEventListener('reset_cookie_consent', resetHandler)
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  // Prevent background scroll when modal open
  useEffect(() => {
    if (!mounted) return
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal, mounted])

  // ESC to close modal
  useEffect(() => {
    if (!showModal) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showModal, closeModal])

  // Don't render anything during SSR
  if (!mounted || typeof document === 'undefined') return null

  return (
    <>
      {/* ── First-visit banner (portal directly to body with maximum z-index) ── */}
      {consent === null && !showModal && createPortal(
        <div
          id="cookie-consent-banner"
          data-cookie-root="true"
          role="region"
          aria-label={tr('noticeTitle')}
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '12px',
            right: '12px',
            zIndex: 2147483647,
            maxWidth: '576px',
            margin: '0 auto',
            pointerEvents: 'auto',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
          }}
          className={`sm:left-auto sm:right-5 sm:bottom-5 sm:mx-0 pointer-events-auto ${isRtl ? 'font-urdu text-right' : ''}`}
        >
          <div className="rounded-2xl border border-amber-500/60 bg-[#0b0d13]/98 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Cookie className="size-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-white leading-tight">{tr('noticeTitle')}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <ShieldCheck className="size-3" /> {tr('complianceBadge')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {tr('noticeBody')}{' '}
              <Link href="/privacy-policy" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                {tr('privacyPolicy')}
              </Link>
              {tr('seeOur')}
              <Link href="/cookies" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                {tr('cookiePolicy')}
              </Link>
              {tr('forDetails')}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <Settings2 className="size-3.5 text-amber-400" />
                {tr('customise')}
              </button>
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="px-4 py-2 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {tr('decline')}
              </button>
              <button
                type="button"
                onClick={() => accept(true, true)}
                className={`px-5 py-2 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90 text-slate-950 text-xs font-black shadow-lg transition-all cursor-pointer ${isRtl ? 'mr-auto' : 'ml-auto'}`}
              >
                {tr('acceptAll')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Persistent Floating Cookie Settings Badge (when consent has been saved) ── */}
      {consent !== null && !showModal && createPortal(
        <div
          id="cookie-settings-persistent-badge"
          data-cookie-root="true"
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            position: 'fixed',
            bottom: '16px',
            left: isRtl ? 'auto' : '16px',
            right: isRtl ? '16px' : 'auto',
            zIndex: 2147483640,
            pointerEvents: 'auto',
          }}
          className={`pointer-events-auto ${isRtl ? 'font-urdu' : ''}`}
        >
          <button
            type="button"
            onClick={openModal}
            data-cookie-root="true"
            aria-label={tr('cookieSettings')}
            className="group flex items-center gap-2 rounded-full border border-amber-500/50 bg-[#0b0d13]/95 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-2xl backdrop-blur-md hover:bg-slate-900 hover:text-white hover:border-amber-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Cookie className="size-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>{tr('cookieSettings')}</span>
          </button>
        </div>,
        document.body
      )}

      {/* ── Preferences modal (portal to body) ── */}
      {createPortal(
        <div
          id="cardzy-cookie-modal-root"
          data-cookie-root="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483647,
            display: showModal ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '1rem',
            pointerEvents: showModal ? 'auto' : 'none',
          }}
          className={isRtl ? 'font-urdu text-right' : ''}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-amber-500/40 bg-[#0b0d13] text-white shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Cookie className="size-5 text-amber-400" />
                </div>
                <div>
                  <h2 id="cookie-prefs-title" className="font-extrabold text-base text-white leading-tight">
                    {tr('modalTitle')}
                  </h2>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {tr('modalSubtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto p-5 space-y-3" style={{ maxHeight: 'calc(90vh - 160px)' }}>
              {/* Essential — always on */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Lock className="size-3.5 text-emerald-400 shrink-0" />
                      {tr('essentialTitle')}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('essentialDesc')}
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    {tr('essentialBadge')}
                  </span>
                </div>
              </div>

              {/* Analytics */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <BarChart3 className="size-3.5 text-cyan-400 shrink-0" />
                      {tr('analyticsTitle')}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('analyticsDesc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                      className="sr-only peer"
                      aria-label="Toggle analytics cookies"
                    />
                    <div className="w-10 h-[22px] rounded-full bg-zinc-700 peer-checked:bg-emerald-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-[18px]" />
                  </label>
                </div>
              </div>

              {/* Advertising */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Sparkles className="size-3.5 text-amber-400 shrink-0" />
                      {tr('advertisingTitle')}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('advertisingDesc')}{' '}
                      <Link href="/cookies" onClick={closeModal} className="text-amber-400 hover:underline">{tr('readPolicy')}</Link>.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={prefs.advertising}
                      onChange={(e) => setPrefs((p) => ({ ...p, advertising: e.target.checked }))}
                      className="sr-only peer"
                      aria-label="Toggle advertising cookies"
                    />
                    <div className="w-10 h-[22px] rounded-full bg-zinc-700 peer-checked:bg-amber-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-[18px]" />
                  </label>
                </div>
              </div>

              {/* Reset Banner button inside modal */}
              <div className="pt-1 flex items-center justify-between text-xs text-zinc-400">
                <span>{tr('wantToSeeNoticeAgain')}</span>
                <button
                  type="button"
                  onClick={() => resetConsent(true)}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline font-semibold cursor-pointer"
                >
                  <RotateCcw className="size-3" /> {tr('reopenAlertBanner')}
                </button>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-t border-white/10 bg-slate-950/80">
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {tr('declineAll')}
              </button>
              <div className={`flex items-center gap-2 ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
                <button
                  type="button"
                  onClick={() => accept(prefs.analytics, prefs.advertising)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Check className="size-3.5" />
                  {tr('saveChoices')}
                </button>
                <button
                  type="button"
                  onClick={() => accept(true, true)}
                  className="px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90 text-slate-950 text-xs font-black shadow-lg transition-all cursor-pointer"
                >
                  {tr('acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
