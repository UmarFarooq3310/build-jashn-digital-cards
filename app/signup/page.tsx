'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Check, X, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { GoogleOneTap } from '@/components/google-one-tap'
import { CardzyLogo } from '@/components/ui/logo'
import { useLang } from '@/lib/lang/context'

// Popular email domains for autocomplete suggestions
const EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'live.com',
  'protonmail.com',
  'ymail.com',
]

interface EmailSuggestProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  hasError?: boolean
  id?: string
}

function EmailSuggestInput({ value, onChange, placeholder, hasError, id }: EmailSuggestProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Compute suggestions whenever value changes
  useEffect(() => {
    const atIdx = value.indexOf('@')
    if (atIdx === -1) {
      // No @ yet — show nothing
      setSuggestions([])
      setShow(false)
      return
    }
    const local = value.slice(0, atIdx + 1) // e.g. "ali@"
    const typed = value.slice(atIdx + 1).toLowerCase() // what they typed after @

    const filtered = EMAIL_DOMAINS.filter((d) => d.startsWith(typed) && d !== typed)
    const built = filtered.map((d) => `${local}${d}`)
    setSuggestions(built)
    setShow(built.length > 0)
    setHighlighted(-1)
  }, [value])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pick = (val: string) => {
    onChange(val)
    setShow(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!show) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, -1))
    } else if (e.key === 'Enter' && highlighted >= 0) {
      e.preventDefault()
      pick(suggestions[highlighted])
    } else if (e.key === 'Escape') {
      setShow(false)
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        id={id}
        type="email"
        required
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShow(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'ali@example.com'}
        className={cn(
          'w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none transition-colors',
          hasError ? 'border-destructive focus:ring-destructive' : 'border-input'
        )}
      />
      <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground pointer-events-none" />

      {show && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover shadow-lg overflow-hidden text-sm">
          {suggestions.map((s, i) => {
            const atIdx = s.indexOf('@')
            const local = s.slice(0, atIdx + 1)
            const domain = s.slice(atIdx + 1)
            return (
              <li
                key={s}
                onMouseDown={(e) => { e.preventDefault(); pick(s) }}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 cursor-pointer select-none transition-colors',
                  i === highlighted ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'
                )}
              >
                <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                <span>
                  <span className="font-medium">{local}</span>
                  <span className={cn(i === highlighted ? 'text-primary font-semibold' : 'text-muted-foreground')}>{domain}</span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────

function SignupPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signUp, signInWithGoogle, migrateGuestCards } = useJashn()

  const [signupStep, setSignupStep] = useState<1 | 2>(1)
  const { t } = useLang()

  const [name, setName] = useState('')
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    const success = await signInWithGoogle()
    if (success) {
      const currentUser = useJashn.getState().user
      if (currentUser) await migrateGuestCards(currentUser.uid)
      window.location.href = redirect
    }
    setIsGoogleLoading(false)
  }

  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current, { y: 48, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out',
    })
  }, { scope: cardRef })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasMinLength = password.length >= 8
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  let strengthScore = 0
  if (hasMinLength) strengthScore += 25
  if (hasMixedCase) strengthScore += 25
  if (hasNumber) strengthScore += 25
  if (hasSpecial) strengthScore += 25

  const redirect = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    if (user) router.push(redirect)
  }, [user, router, redirect])

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  useEffect(() => {
    if (!email) return
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address' }))
    } else {
      setErrors((prev) => { const c = { ...prev }; delete c.email; return c })
    }
  }, [email])

  useEffect(() => {
    if (!name) return
    if (name.trim().length < 2) {
      setErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters' }))
    } else {
      setErrors((prev) => { const c = { ...prev }; delete c.name; return c })
    }
  }, [name])

  useEffect(() => {
    if (!confirmPassword) return
    if (confirmPassword !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }))
    } else {
      setErrors((prev) => { const c = { ...prev }; delete c.confirmPassword; return c })
    }
  }, [confirmPassword, password])

  const isStep1Valid =
    name.trim().length >= 2 &&
    validateEmail(email) &&
    !errors.name &&
    !errors.email

  const isStep2Valid =
    strengthScore >= 75 &&
    confirmPassword === password &&
    !errors.confirmPassword

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStep1Valid) {
      setSignupStep(2)
      setGeneralError(null)
      setTimeout(() => {
        gsap.fromTo('.signup-step-fields', { x: 30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.45, ease: 'power2.out',
        })
      }, 20)
    } else {
      setGeneralError('Please fix the errors above before continuing.')
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStep2Valid) {
      setGeneralError('Please ensure your password is secure and matching.')
      return
    }
    setGeneralError(null)
    setIsSubmitting(true)
    const success = await signUp(name.trim(), email.trim(), '', password)
    setIsSubmitting(false)
    if (success) {
      const currentUser = useJashn.getState().user
      if (currentUser) await migrateGuestCards(currentUser.uid)
      router.push(redirect)
    } else {
      setGeneralError('This email is already registered. Please sign in instead.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GoogleOneTap redirectTo={redirect} />
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div ref={cardRef} className="w-full max-w-md space-y-6 rounded-3xl border border-border bg-card p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-gold to-emerald-500" />

          <div className="text-center">
            <CardzyLogo className="mx-auto size-12 mb-3 shadow-md" />
            <h1 className="text-2xl font-extrabold text-foreground">{t('createFreeAccount')}</h1>
            <p className="text-xs text-muted-foreground mt-1">Design premium digital cards, invitations & track RSVPs live</p>
          </div>

          {generalError && (
            <div className="p-3.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-xs font-medium leading-relaxed">
              {generalError}
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-4 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span className={cn(signupStep === 1 ? 'text-primary' : 'text-muted-foreground')}>1. Basic Info</span>
            <span className="h-px bg-border flex-1 mx-3" />
            <span className={cn(signupStep === 2 ? 'text-primary' : 'text-muted-foreground')}>2. Password</span>
          </div>

          {/* Step 1 */}
          {signupStep === 1 && (
            <form onSubmit={handleNextStep} className="signup-step-fields space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Khan"
                    className={cn(
                      'w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none',
                      errors.name ? 'border-destructive focus:ring-destructive' : 'border-input'
                    )}
                  />
                  <User className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                </div>
                {errors.name && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                <EmailSuggestInput
                  value={email}
                  onChange={setEmail}
                  hasError={!!errors.email}
                />
                {errors.email && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.email}</p>}
              </div>

              <Button
                type="submit"
                disabled={!isStep1Valid}
                className="w-full py-5 bg-primary hover:bg-primary/90 font-bold text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Continue <ArrowRight className="ml-2 size-4" />
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                <span className="flex-1 h-px bg-border" />
                {t('orContinueWith')}
                <span className="flex-1 h-px bg-border" />
              </div>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-background hover:bg-muted py-3 text-sm font-semibold text-foreground transition-colors disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {t('continueWithGoogle')}
              </button>
            </form>
          )}

          {/* Step 2 */}
          {signupStep === 2 && (
            <form onSubmit={handleSignupSubmit} className="signup-step-fields space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">{t('password')}</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Lock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                </div>
              </div>

              {/* Strength meter */}
              <div className="space-y-2 p-3 rounded-2xl bg-muted/50 border border-border/50">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Strength:</span>
                  <span className={cn(
                    strengthScore <= 50 ? 'text-destructive' : strengthScore === 75 ? 'text-amber-600' : 'text-emerald-700'
                  )}>
                    {strengthScore === 0 && 'None'}
                    {strengthScore === 25 && 'Very Weak'}
                    {strengthScore === 50 && 'Weak'}
                    {strengthScore === 75 && 'Moderate'}
                    {strengthScore === 100 && 'Strong'}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-border overflow-hidden flex gap-0.5">
                  {[25, 50, 75, 100].map((threshold) => (
                    <div
                      key={threshold}
                      className={cn('h-full transition-all duration-300', strengthScore >= threshold
                        ? (strengthScore <= 50 ? 'bg-destructive' : strengthScore === 75 ? 'bg-amber-500' : 'bg-emerald-600')
                        : 'bg-transparent'
                      )}
                      style={{ width: '25%' }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-medium">
                  {[
                    { ok: hasMinLength, label: 'Min 8 characters' },
                    { ok: hasMixedCase, label: 'Upper & lower case' },
                    { ok: hasNumber, label: 'At least 1 number' },
                    { ok: hasSpecial, label: 'Special character' },
                  ].map(({ ok, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      {ok ? <Check className="size-3.5 text-emerald-600" /> : <X className="size-3.5 text-muted-foreground" />}
                      <span className={ok ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      'w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none',
                      errors.confirmPassword ? 'border-destructive focus:ring-destructive' : 'border-input'
                    )}
                  />
                  <Lock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSignupStep(1)}
                  className="py-5 font-semibold rounded-xl w-1/3 hover:bg-muted flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button
                  type="submit"
                  disabled={!isStep2Valid || isSubmitting}
                  className="w-2/3 py-5 bg-primary hover:bg-primary/90 font-bold text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : t('createFreeAccount')}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/60">
            {t('alreadyHaveAccount')}{' '}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-primary hover:underline font-bold">
              {t('logIn')}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    }>
      <SignupPageContent />
    </Suspense>
  )
}
