'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Cookie, X, Check, Lock, BarChart3, Sparkles, ShieldCheck, Settings2 } from 'lucide-react'

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
    gtag?: (...args: unknown[]) => void
    __pendingCookieModal?: boolean
  }
}

// ─── Pre-mount stub so footer/header calls before hydration queue correctly ──

if (typeof window !== 'undefined' && !window.openCookiePreferences) {
  window.openCookiePreferences = () => {
    window.__pendingCookieModal = true
    window.dispatchEvent(new CustomEvent('cardzy:open-cookie-prefs'))
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadConsent(): CookiePrefs | null {
  try {
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
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }))
    // Legacy keys kept for any existing integrations
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
  const [mounted, setMounted] = useState(false)
  // null = not yet decided (show banner), non-null = decided (hide banner)
  const [consent, setConsent] = useState<CookiePrefs | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>({ essential: true, analytics: true, advertising: true })

  const openModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  // Accept / decline helpers
  const accept = useCallback((analytics: boolean, advertising: boolean) => {
    const p: CookiePrefs = { essential: true, analytics, advertising }
    saveConsent(p)
    pushGtagConsent(analytics, advertising)
    setConsent(p)
    setShowModal(false)
  }, [])

  // On mount: read stored consent, wire up global function + event
  useEffect(() => {
    setMounted(true)

    // Replace stub with real opener
    window.openCookiePreferences = openModal

    // If stub was called before mount, open immediately
    if (window.__pendingCookieModal) {
      window.__pendingCookieModal = false
      openModal()
    }

    // Also listen via custom event
    const handler = () => openModal()
    window.addEventListener('cardzy:open-cookie-prefs', handler)

    // Load stored consent
    const stored = loadConsent()
    setConsent(stored)
    if (stored) {
      // Replay consent signals on every page load so gtag is in sync
      pushGtagConsent(stored.analytics, stored.advertising)
      // Seed modal toggles with existing choices
      setPrefs(stored)
    }

    return () => {
      window.removeEventListener('cardzy:open-cookie-prefs', handler)
    }
  }, [openModal])

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

  // ─── Render ────────────────────────────────────────────────────────────────

  // Don't render anything during SSR
  if (!mounted) return null

  return (
    <>
      {/* ── First-visit banner (shown until user decides) ── */}
      {consent === null && !showModal && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-3 right-3 z-[2147483644] mx-auto max-w-xl sm:left-auto sm:right-5 sm:bottom-5 sm:mx-0 notranslate"
        >
          <div className="rounded-2xl border border-amber-500/50 bg-[#0b0d13]/97 p-5 text-white shadow-2xl backdrop-blur-xl">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Cookie className="size-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-white leading-tight">Cookie & Privacy Notice</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <ShieldCheck className="size-3" /> GDPR · ePrivacy
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Decline and close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, provide personalised content, and
              analyse site traffic in compliance with our{' '}
              <Link href="/privacy-policy" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>
              . See our{' '}
              <Link href="/cookies" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                Cookie Policy
              </Link>{' '}
              for details.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all"
              >
                <Settings2 className="size-3.5 text-amber-400" />
                Customise
              </button>
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="px-4 py-2 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => accept(true, true)}
                className="px-5 py-2 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90 text-slate-950 text-xs font-black shadow-lg transition-all ml-auto"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preferences modal (portal to body) ── */}
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
          style={{
            position: 'fixed', inset: 0,
            zIndex: 2147483647,
            display: showModal ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '1rem',
          }}
          className="notranslate"
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
                    Cookie Preferences
                  </h2>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Choose which cookies you allow us to use.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto p-5 space-y-3" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              {/* Essential — always on */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Lock className="size-3.5 text-emerald-400 shrink-0" />
                      Strictly Essential
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Required for login, card drafts, and language settings. Cannot be disabled.
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    Always On
                  </span>
                </div>
              </div>

              {/* Analytics */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <BarChart3 className="size-3.5 text-cyan-400 shrink-0" />
                      Analytics & Performance
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Measures traffic and page speed (Google Analytics) to help us improve the site.
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
                      Google AdSense & Advertising
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Enables relevant ads that support free card generation. See our{' '}
                      <Link href="/cookies" onClick={closeModal} className="text-amber-400 hover:underline">Read Full Cookie Policy</Link>.
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
            </div>

            {/* Modal footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-t border-white/10 bg-slate-950/80">
              <button
                type="button"
                onClick={() => accept(false, false)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl border border-white/15 bg-white/8 hover:bg-white/15 text-xs font-bold text-zinc-300 hover:text-white transition-all"
              >
                Decline All
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => accept(prefs.analytics, prefs.advertising)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all"
                >
                  <Check className="size-3.5" />
                  Save Choices
                </button>
                <button
                  type="button"
                  onClick={() => accept(true, true)}
                  className="px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90 text-slate-950 text-xs font-black shadow-lg transition-all"
                >
                  Accept All
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
