'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles, Smartphone, ShieldCheck, Loader2, AlertCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { AdBanner } from '@/components/ad-banner'
import { useJashn } from '@/lib/jashn/store'
import type { Plan } from '@/lib/jashn/types'

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentMethod = 'jazzcash' | 'easypaisa'
type PaymentState = 'idle' | 'loading' | 'success' | 'error'

// ─── Plan Config ──────────────────────────────────────────────────────────────
const PLAN_PRICES: Record<Exclude<Plan, 'free'>, number> = {
  pro: 499,
  business: 2999,
}

// ─── Phone Validation ─────────────────────────────────────────────────────────
function isValidPKPhone(phone: string): boolean {
  // Accepts: 03001234567, 0300-1234567, +923001234567
  const cleaned = phone.replace(/[\s\-]/g, '')
  return /^(\+92|0092|0)?3[0-9]{9}$/.test(cleaned)
}

function normalizePKPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-]/g, '')
  if (cleaned.startsWith('+92')) return '0' + cleaned.slice(3)
  if (cleaned.startsWith('0092')) return '0' + cleaned.slice(4)
  return cleaned
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PricingPage() {
  const router = useRouter()
  const { user, upgrade } = useJashn()

  // Modal state
  const [paymentModalPlan, setPaymentModalPlan] = useState<Exclude<Plan, 'free'> | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('jazzcash')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // Payment flow state
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [txnRef, setTxnRef] = useState('')

  // ── Open modal & reset state ──────────────────────────────────────────────
  function openModal(plan: Exclude<Plan, 'free'>) {
    setPaymentModalPlan(plan)
    setPaymentState('idle')
    setErrorMessage('')
    setPhone('')
    setPhoneError('')
    setTxnRef('')
  }

  function closeModal() {
    if (paymentState === 'loading') return // Prevent close during payment
    setPaymentModalPlan(null)
    setPaymentState('idle')
    setErrorMessage('')
  }

  // ── Validate phone on blur ────────────────────────────────────────────────
  function handlePhoneBlur() {
    if (phone && !isValidPKPhone(phone)) {
      setPhoneError('Enter a valid Pakistani mobile number (e.g. 0300 1234567)')
    } else {
      setPhoneError('')
    }
  }

  // ── Submit payment ─────────────────────────────────────────────────────────
  async function handlePayment() {
    if (!paymentModalPlan) return

    // Validate phone
    if (!isValidPKPhone(phone)) {
      setPhoneError('Enter a valid Pakistani mobile number (e.g. 0300 1234567)')
      return
    }
    setPhoneError('')

    const normalizedPhone = normalizePKPhone(phone)
    const amount = PLAN_PRICES[paymentModalPlan]

    setPaymentState('loading')
    setErrorMessage('')

    try {
      const response = await fetch(`/api/payment/${selectedMethod}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: normalizedPhone,
          amount,
          planId: paymentModalPlan,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // ✅ Payment initiated successfully
        // In sandbox: this means the OTP was sent / transaction approved
        setTxnRef(data.txnRefNo ?? data.orderId ?? '')
        setPaymentState('success')

        // Update local plan state (simulates DB update)
        await upgrade(paymentModalPlan)

        // Auto-close after 3 seconds
        setTimeout(() => {
          closeModal()
        }, 3000)
      } else {
        // ❌ Payment failed — show gateway error message
        setPaymentState('error')
        setErrorMessage(
          data.message ?? 'Payment could not be processed. Please try again.'
        )
      }
    } catch (err) {
      console.error('Payment request failed:', err)
      setPaymentState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  async function handleDowngrade(plan: 'free') {
    if (!user) {
      router.push('/login?redirect=/pricing')
      return
    }

    if (confirm('Are you sure you want to cancel your paid plan and downgrade to the Free plan?')) {
      try {
        await upgrade(plan)
        alert('Plan canceled successfully. Your account has been downgraded to Free.')
      } catch (e) {
        console.error('Failed to downgrade plan:', e)
        alert('Failed to downgrade plan. Please try again.')
      }
    }
  }

  // ── Helper: plan button label ─────────────────────────────────────────────
  function planButtonLabel(plan: Plan, label: string): string {
    if (user?.plan === plan) return 'Current Plan'
    return label
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="size-4" /> Simple & Affordable Pricing
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Choose the Perfect Plan for Your Celebration
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay easily via JazzCash or EasyPaisa in PKR. No international credit card required!
            </p>
          </div>

          {/* ── Pricing Grid ──────────────────────────────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Free Plan */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold text-foreground">Free</h3>
                <p className="text-xs text-muted-foreground mt-1">Perfect for sending quick personal greetings.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-foreground">Rs 0</span>
                  <span className="text-sm text-muted-foreground"> / forever</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> 3 Classic Free Themes</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Unlimited Wish Cards</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Instant WhatsApp & Link Sharing</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Basic Invitation Pages</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full"
                variant="outline"
                disabled={user?.plan === 'free'}
                onClick={() => handleDowngrade('free')}
              >
                {planButtonLabel('free', 'Get Started Free')}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl flex flex-col justify-between text-left">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                Most Popular
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">Pro</h3>
                  <Crown className="size-5 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">For weddings, grand events and premium animations.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-primary">Rs 499</span>
                  <span className="text-sm text-muted-foreground"> / month</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> All 9+ Premium & Mughal Gold Themes</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> No Jashn Watermark</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> Floating Petal & Sparkle Animations</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> Real-time View & RSVP Analytics</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> High Resolution PNG Downloads</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={() => openModal('pro')}
                disabled={user?.plan === 'pro'}
              >
                {planButtonLabel('pro', 'Upgrade to Pro')}
              </Button>
            </div>

            {/* Business Plan */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold text-foreground">Business</h3>
                <p className="text-xs text-muted-foreground mt-1">For brands, venues, and corporate event organizers.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-foreground">Rs 2,999</span>
                  <span className="text-sm text-muted-foreground"> / month</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Everything in Pro Plan</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Branded Cards with Custom Logo</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Customer & Guest List Export</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Auto-send via WhatsApp API</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Dedicated Account Manager</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full"
                variant="secondary"
                onClick={() => openModal('business')}
                disabled={user?.plan === 'business'}
              >
                {planButtonLabel('business', 'Get Business Plan')}
              </Button>
            </div>
          </div>

          {/* ── Payment Methods Banner ─────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-border bg-muted/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Smartphone className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Supported Payment Gateways in Pakistan</h4>
                <p className="text-xs text-muted-foreground">
                  Direct mobile wallet payments with instant confirmation via JazzCash & EasyPaisa.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">JazzCash</span>
              <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">EasyPaisa</span>
            </div>
          </div>
        </div>

        {/* ── Payment Modal ───────────────────────────────────────────────── */}
        {paymentModalPlan && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          >
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl text-left">

              {/* Modal Header */}
              <h3 className="text-xl font-bold text-foreground mb-1">
                Checkout: {paymentModalPlan.charAt(0).toUpperCase() + paymentModalPlan.slice(1)} Plan
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                Total:{' '}
                <span className="font-bold text-primary">
                  Rs {PLAN_PRICES[paymentModalPlan].toLocaleString()}
                </span>{' '}
                / month
              </p>

              {/* ── Success State ──────────────────────────────────────────── */}
              {paymentState === 'success' && (
                <div className="rounded-xl bg-emerald-500/10 p-6 text-center border border-emerald-500/30">
                  <ShieldCheck className="mx-auto size-12 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-emerald-700 text-lg">Payment Successful!</h4>
                  <p className="text-xs text-emerald-600 mt-1">
                    Your account has been upgraded to{' '}
                    <span className="font-bold uppercase">{paymentModalPlan}</span>.
                  </p>
                  {txnRef && (
                    <p className="text-xs text-emerald-500/70 mt-2 font-mono">
                      Ref: {txnRef}
                    </p>
                  )}
                  <p className="text-xs text-emerald-500/60 mt-3">Closing automatically…</p>
                </div>
              )}

              {/* ── Error State ────────────────────────────────────────────── */}
              {paymentState === 'error' && (
                <div className="rounded-xl bg-red-500/10 p-4 border border-red-500/30 mb-4 flex items-start gap-3">
                  <AlertCircle className="size-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">Payment Failed</p>
                    <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* ── Form (idle or error state) ─────────────────────────────── */}
              {(paymentState === 'idle' || paymentState === 'error') && (
                <div className="space-y-4">

                  {/* Wallet Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Select Mobile Wallet
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('jazzcash')}
                        className={`rounded-xl border p-3 text-center font-bold text-sm transition-all ${
                          selectedMethod === 'jazzcash'
                            ? 'border-red-600 bg-red-600/10 text-red-600 ring-2 ring-red-600/30'
                            : 'border-border text-foreground hover:bg-muted/50'
                        }`}
                      >
                        JazzCash
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('easypaisa')}
                        className={`rounded-xl border p-3 text-center font-bold text-sm transition-all ${
                          selectedMethod === 'easypaisa'
                            ? 'border-emerald-600 bg-emerald-600/10 text-emerald-600 ring-2 ring-emerald-600/30'
                            : 'border-border text-foreground hover:bg-muted/50'
                        }`}
                      >
                        EasyPaisa
                      </button>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      {selectedMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (phoneError) setPhoneError('')
                        if (paymentState === 'error') setPaymentState('idle')
                      }}
                      onBlur={handlePhoneBlur}
                      placeholder="0300 1234567"
                      className={`w-full rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        phoneError ? 'border-red-400 focus:ring-red-400' : 'border-input'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      An OTP will be sent to this number to confirm payment.
                    </p>
                  </div>

                  {/* Sandbox Notice */}
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
                    <p className="text-xs text-amber-700 font-medium">
                      🧪 Sandbox mode — use test number{' '}
                      <span className="font-mono">
                        {selectedMethod === 'jazzcash' ? '03001234567' : '03331234567'}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex justify-end gap-2">
                    <Button variant="ghost" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={!phone || !!phoneError}
                      className="bg-primary text-primary-foreground font-bold px-6"
                    >
                      Pay Rs {PLAN_PRICES[paymentModalPlan].toLocaleString()}
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Loading State ──────────────────────────────────────────── */}
              {paymentState === 'loading' && (
                <div className="py-10 text-center space-y-3">
                  <Loader2 className="mx-auto size-10 text-primary animate-spin" />
                  <p className="text-sm font-medium text-foreground">Processing payment…</p>
                  <p className="text-xs text-muted-foreground">
                    Check your {selectedMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} app for the OTP prompt.
                  </p>
                </div>
              )}

            </div>
          </div>
        )}
      </main>

      <AdBanner format="display" className="mx-auto max-w-4xl px-4 pb-6" />
      <SiteFooter />
    </div>
  )
}
