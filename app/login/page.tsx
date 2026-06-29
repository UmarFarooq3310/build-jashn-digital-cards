'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Mail, Lock, User, Phone, Check, X, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signUp, signIn, migrateGuestCards } = useJashn()
  
  // Tab state: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  
  // Signup multi-step: 1 (Info) | 2 (Password)
  const [signupStep, setSignupStep] = useState<1 | 2>(1)
  
  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Real-time error messages
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  
  // Password Strength conditions
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
    if (user) {
      router.push(redirect)
    }
  }, [user, router, redirect])

  // Validation routines
  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(val)
  }

  const validatePhone = (val: string) => {
    // Pakistani mobile number format: e.g. +923001234567, 03001234567, 3001234567
    const regex = /^(?:\+92|0)?3[0-9]{9}$/
    return regex.test(val.replace(/[\s-]/g, ''))
  }

  // Real-time email validation (Signup)
  useEffect(() => {
    if (!email) return
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address' }))
    } else {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.email
        return copy
      })
    }
  }, [email])

  // Real-time phone validation (Signup)
  useEffect(() => {
    if (!phone) return
    if (!validatePhone(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Enter a valid Pakistani mobile number (e.g. 03001234567)',
      }))
    } else {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.phone
        return copy
      })
    }
  }, [phone])

  // Real-time name validation
  useEffect(() => {
    if (!name) return
    if (name.trim().length < 2) {
      setErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters long' }))
    } else {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.name
        return copy
      })
    }
  }, [name])

  // Real-time password match validation
  useEffect(() => {
    if (!confirmPassword) return
    if (confirmPassword !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }))
    } else {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy.confirmPassword
        return copy
      })
    }
  }, [confirmPassword, password])

  // Check Step 1 validity
  const isStep1Valid =
    name.trim().length >= 2 &&
    validateEmail(email) &&
    validatePhone(phone) &&
    !errors.name &&
    !errors.email &&
    !errors.phone

  // Check Step 2 validity
  const isStep2Valid =
    strengthScore >= 75 &&
    confirmPassword === password &&
    !errors.confirmPassword

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStep1Valid) {
      setSignupStep(2)
      setGeneralError(null)
    } else {
      setGeneralError('Please correct the validation errors in Step 1.')
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStep2Valid) {
      setGeneralError('Please ensure your password is secure and matching.')
      return
    }

    const success = await signUp(name.trim(), email.trim(), phone.trim(), password)
    if (success) {
      // Auto migrate any guest-created wishes or invitations in local store to this user
      const currentUser = useJashn.getState().user
      if (currentUser) {
        await migrateGuestCards(currentUser.uid)
      }
      router.push(redirect)
    } else {
      setGeneralError('This email is already registered. Please log in instead.')
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    if (!validateEmail(loginEmail)) {
      setGeneralError('Please enter a valid email address.')
      return
    }

    const success = await signIn(loginEmail.trim(), loginPassword)
    if (success) {
      const currentUser = useJashn.getState().user
      if (currentUser) {
        await migrateGuestCards(currentUser.uid)
      }
      router.push(redirect)
    } else {
      setGeneralError('Incorrect email or password. Please try again.')
    }
  }


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6 rounded-3xl border border-border bg-card p-8 shadow-xl relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-gold to-emerald-500" />
          
          <div className="text-center">
            <img src="/icon.svg" alt="Jashn Logo" className="mx-auto size-12 rounded-2xl mb-3 shadow-md" />
            <h1 className="text-2xl font-extrabold text-foreground">Welcome to Jashn</h1>
            <p className="text-xs text-muted-foreground mt-1">Design premium digital cards, invitations & track RSVPs live</p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-muted text-sm font-semibold">
            <button
              onClick={() => {
                setActiveTab('login')
                setGeneralError(null)
              }}
              className={cn(
                "py-2.5 rounded-lg transition-all",
                activeTab === 'login'
                  ? "bg-card text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup')
                setGeneralError(null)
              }}
              className={cn(
                "py-2.5 rounded-lg transition-all",
                activeTab === 'signup'
                  ? "bg-card text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Register Account
            </button>
          </div>



          {/* General alert error */}
          {generalError && (
            <div className="p-3.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-xs font-medium leading-relaxed">
              {generalError}
            </div>
          )}

          {/* LOGIN VIEW */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ali@example.com"
                    className="w-full rounded-xl border border-input bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Lock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                </div>
              </div>

              <Button type="submit" className="w-full py-5 bg-primary hover:bg-primary/90 font-bold text-primary-foreground rounded-xl">
                Sign In <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          )}

          {/* SIGNUP VIEW */}
          {activeTab === 'signup' && (
            <div>
              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-4 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span className={cn(signupStep === 1 ? "text-primary" : "text-muted-foreground")}>1. Basic Info</span>
                <span className="h-px bg-border flex-1 mx-3" />
                <span className={cn(signupStep === 2 ? "text-primary" : "text-muted-foreground")}>2. Security</span>
              </div>

              {/* Step 1: Basic Info */}
              {signupStep === 1 && (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Your Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ali Khan"
                        className={cn(
                          "w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none",
                          errors.name ? "border-destructive focus:ring-destructive" : "border-input"
                        )}
                      />
                      <User className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    </div>
                    {errors.name && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ali@example.com"
                        className={cn(
                          "w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none",
                          errors.email ? "border-destructive focus:ring-destructive" : "border-input"
                        )}
                      />
                      <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    </div>
                    {errors.email && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-foreground">Pakistani Phone Number</label>
                      <span className="text-[10px] text-muted-foreground">Formats: 03xxxxxxxxx / +923xxxxxxxxx</span>
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 03001234567"
                        className={cn(
                          "w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none",
                          errors.phone ? "border-destructive focus:ring-destructive" : "border-input"
                        )}
                      />
                      <Phone className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    </div>
                    {errors.phone && <p className="text-[11px] text-destructive mt-1 font-medium">{errors.phone}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={!isStep1Valid}
                    className="w-full py-5 bg-primary hover:bg-primary/90 font-bold text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    Continue to Password <ArrowRight className="ml-2 size-4" />
                  </Button>
                </form>
              )}

              {/* Step 2: Password and confirmation */}
              {signupStep === 2 && (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Choose Strong Password</label>
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

                  {/* Password Strength Meter */}
                  <div className="space-y-2 p-3 rounded-2xl bg-muted/50 border border-border/50">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-muted-foreground">Password Strength:</span>
                      <span className={cn(
                        strengthScore <= 50 ? "text-destructive" : strengthScore === 75 ? "text-amber-600" : "text-emerald-700"
                      )}>
                        {strengthScore === 0 && 'None'}
                        {strengthScore === 25 && 'Very Weak'}
                        {strengthScore === 50 && 'Weak'}
                        {strengthScore === 75 && 'Moderate (Acceptable)'}
                        {strengthScore === 100 && 'Very Strong'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden flex gap-0.5">
                      <div className={cn("h-full transition-all duration-300", strengthScore >= 25 ? (strengthScore <= 50 ? "bg-destructive" : strengthScore === 75 ? "bg-amber-500" : "bg-emerald-600") : "bg-transparent")} style={{ width: '25%' }} />
                      <div className={cn("h-full transition-all duration-300", strengthScore >= 50 ? (strengthScore <= 50 ? "bg-destructive" : strengthScore === 75 ? "bg-amber-500" : "bg-emerald-600") : "bg-transparent")} style={{ width: '25%' }} />
                      <div className={cn("h-full transition-all duration-300", strengthScore >= 75 ? (strengthScore === 75 ? "bg-amber-500" : "bg-emerald-600") : "bg-transparent")} style={{ width: '25%' }} />
                      <div className={cn("h-full transition-all duration-300", strengthScore >= 100 ? "bg-emerald-600" : "bg-transparent")} style={{ width: '25%' }} />
                    </div>

                    {/* Conditions checklist */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-medium">
                      <div className="flex items-center gap-1.5">
                        {hasMinLength ? <Check className="size-3.5 text-emerald-600" /> : <X className="size-3.5 text-muted-foreground" />}
                        <span className={hasMinLength ? "text-foreground" : "text-muted-foreground"}>Min 8 characters</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {hasMixedCase ? <Check className="size-3.5 text-emerald-600" /> : <X className="size-3.5 text-muted-foreground" />}
                        <span className={hasMixedCase ? "text-foreground" : "text-muted-foreground"}>Aa & aA cases</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {hasNumber ? <Check className="size-3.5 text-emerald-600" /> : <X className="size-3.5 text-muted-foreground" />}
                        <span className={hasNumber ? "text-foreground" : "text-muted-foreground"}>At least 1 number</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {hasSpecial ? <Check className="size-3.5 text-emerald-600" /> : <X className="size-3.5 text-muted-foreground" />}
                        <span className={hasSpecial ? "text-foreground" : "text-muted-foreground"}>At least 1 special char</span>
                      </div>
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
                          "w-full rounded-xl border bg-background p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none",
                          errors.confirmPassword ? "border-destructive focus:ring-destructive" : "border-input"
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
                      className="py-5 font-semibold text-foreground flex items-center justify-center gap-1 rounded-xl w-1/3 hover:bg-muted"
                    >
                      <ArrowLeft className="size-4" /> Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isStep2Valid}
                      className="w-2/3 py-5 bg-primary hover:bg-primary/90 font-bold text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Register Account
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}

