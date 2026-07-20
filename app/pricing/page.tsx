'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import type { Plan } from '@/lib/jashn/types'

// ─── Plan Config ──────────────────────────────────────────────────────────────
const PLAN_PRICES: Record<Exclude<Plan, 'free'>, { usd: number; pkr: number; label: string }> = {
  pro: { usd: 4, pkr: 1100, label: '$4 (Rs 1,100)' },
  business: { usd: 18, pkr: 5000, label: '$18 (Rs 5,000)' },
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PricingPage() {
  const router = useRouter()
  const { user, upgrade } = useJashn()
  const { t, lang } = useLang()

  // Modal state
  const [paymentModalPlan, setPaymentModalPlan] = useState<Exclude<Plan, 'free'> | null>(null)

  function openModal(plan: Exclude<Plan, 'free'>) {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent('/pricing')}`)
      return
    }
    setPaymentModalPlan(plan)
  }

  function closeModal() {
    setPaymentModalPlan(null)
  }

  async function handleDowngrade(plan: 'free') {
    if (!user) {
      router.push('/login?redirect=/pricing')
      return
    }

    if (confirm(lang === 'ur' ? 'کیا آپ واقعی اپنا ادا شدہ پلان منسوخ کر کے فری پلان پر منتقل ہونا چاہتے ہیں؟' : 'Are you sure you want to cancel your paid plan and downgrade to the Free plan?')) {
      try {
        await upgrade(plan)
        alert(lang === 'ur' ? 'پلان کامیابی کے ساتھ منسوخ ہو گیا۔ آپ کا اکاؤنٹ فری پر منتقل کر دیا گیا ہے۔' : 'Plan canceled successfully. Your account has been downgraded to Free.')
      } catch (e) {
        console.error('Failed to downgrade plan:', e)
        alert(lang === 'ur' ? 'پلان منسوخ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔' : 'Failed to downgrade plan. Please try again.')
      }
    }
  }

  function planButtonLabel(plan: Plan, fallbackLabel: string): string {
    if (user?.plan === plan) return t('currentPlan') || 'Current Plan'
    return fallbackLabel
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="size-4" /> {t('simpleTransparentPricing')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('choosePerfectPlan')}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pricingHeaderDesc')}
            </p>
          </div>

          {/* ── Pricing Grid ──────────────────────────────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Free Plan */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold text-foreground">Free</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('freePlanDesc')}</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-foreground">$0 <span className="text-lg font-normal text-muted-foreground">(Rs 0)</span></span>
                  <span className="text-sm text-muted-foreground"> {t('forever')}</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_free_1')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_free_2')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_free_3')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_free_4')}</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full"
                variant="outline"
                disabled={user?.plan === 'free'}
                onClick={() => handleDowngrade('free')}
              >
                {planButtonLabel('free', t('getStartedFree'))}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl flex flex-col justify-between text-left">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                {t('mostPopular')}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">Pro</h3>
                  <Crown className="size-5 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t('proPlanDesc')}</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-primary">$4 <span className="text-lg font-normal text-muted-foreground">(Rs 1,100)</span></span>
                  <span className="text-sm text-muted-foreground"> {t('perMonth')}</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> {t('feat_pro_1')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> {t('feat_pro_2')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> {t('feat_pro_3')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> {t('feat_pro_4')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary font-bold" /> {t('feat_pro_5')}</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={() => openModal('pro')}
                disabled={user?.plan === 'pro'}
              >
                {planButtonLabel('pro', t('upgradeToPro'))}
              </Button>
            </div>

            {/* Business Plan */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold text-foreground">Business</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('businessPlanDesc')}</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-foreground">$18 <span className="text-lg font-normal text-muted-foreground">(Rs 5,000)</span></span>
                  <span className="text-sm text-muted-foreground"> {t('perMonth')}</span>
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_biz_1')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_biz_2')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_biz_3')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_biz_4')}</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> {t('feat_biz_5')}</li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full"
                variant="secondary"
                onClick={() => openModal('business')}
                disabled={user?.plan === 'business'}
              >
                {planButtonLabel('business', t('getBusinessPlan'))}
              </Button>
            </div>
          </div>

          {/* ── How to Pay Banner ──────────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-border bg-muted/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t('howToUpgrade')}</h4>
                <p className="text-xs text-muted-foreground">
                  {t('howToUpgradeDesc')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://wa.me/923093518796"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                WhatsApp: +92 309 3518796
              </a>
              <a
                href="mailto:cardzyonline@gmail.com"
                className="rounded-lg bg-primary hover:bg-primary/90 transition-colors px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                Email: cardzyonline@gmail.com
              </a>
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
                {lang === 'ur' ? `${paymentModalPlan.toUpperCase()} پلان پر اپ گریڈ کریں` : `Upgrade to ${paymentModalPlan.charAt(0).toUpperCase() + paymentModalPlan.slice(1)} Plan`}
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                {lang === 'ur' ? 'قیمت:' : 'Price:'}{' '}
                <span className="font-bold text-primary">
                  {PLAN_PRICES[paymentModalPlan].label} {t('perMonth')}
                </span>
              </p>

              <div className="space-y-4">
                <div className="rounded-xl bg-muted/60 border border-border p-4 text-sm text-foreground leading-relaxed">
                  <p className="font-semibold mb-2">{t('upgradeInstructions')}</p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground text-xs">
                    <li>{t('upgradeStep1')}</li>
                    <li>{t('upgradeStep2')}</li>
                    <li>{t('upgradeStep3')}</li>
                  </ol>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/923093518796?text=${encodeURIComponent(`Hi! I would like to upgrade to the ${paymentModalPlan} plan on Cardzy. My account email is: ${user?.email || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors p-3 font-bold text-sm text-white"
                  >
                    <span>💬 WhatsApp (+92 309 3518796)</span>
                  </a>

                  <a
                    href={`mailto:cardzyonline@gmail.com?subject=${encodeURIComponent(`Upgrade to ${paymentModalPlan.charAt(0).toUpperCase() + paymentModalPlan.slice(1)} Plan — Cardzy`)}&body=${encodeURIComponent(`Hi,\n\nI want to upgrade to the ${paymentModalPlan} plan on Cardzy.\nMy account email is: ${user?.email || ''}\n\nI have attached my payment proof.\n\nThank you.`)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:bg-muted/50 transition-colors p-3 font-bold text-sm text-foreground"
                  >
                    <span>✉️ Email: cardzyonline@gmail.com</span>
                  </a>
                </div>

                <p className="text-[11px] text-muted-foreground text-center">
                  {t('intlNote')}
                </p>

                <div className="pt-2 flex justify-end">
                  <Button variant="ghost" onClick={closeModal}>
                    {t('closeBtn')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
