'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles } from 'lucide-react'
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
  const isUrdu = lang === 'ur' || lang === 'ar'

  // Modal state
  const [paymentModalPlan, setPaymentModalPlan] = useState<Exclude<Plan, 'free'> | null>(null)

  function openModal(plan: Exclude<Plan, 'free'>) {
    if (!user) {
      router.push('/login')
      return
    }
    setPaymentModalPlan(plan)
  }

  function closeModal() {
    setPaymentModalPlan(null)
  }

  async function handleDowngrade(plan: 'free') {
    if (!user) {
      router.push('/login')
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
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="size-4" /> {t('simpleTransparentPricing')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('choosePerfectPlan')}
            </h1>
            <h2 className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pricingHeaderDesc')}{' '}
              Ready to start? Design your digital card today using our{' '}
              <Link href="/create-invitation" className="text-primary underline font-semibold hover:opacity-80">
                Digital Invitation Builder
              </Link>{' '}
              or craft an executive{' '}
              <Link href="/create-visiting-card" className="text-primary underline font-semibold hover:opacity-80">
                Digital Business Card
              </Link>.
            </h2>
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

          {/* Detailed Feature Comparison Table & FAQs */}
          <section className="mt-16 rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-left space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" /> Plan Comparison
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-extrabold text-foreground tracking-tight ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
              Detailed Plan Comparison &amp; Inclusions
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Compare features across Free, Pro, and Business plans to choose the best option for your wedding, corporate announcements, or festive greetings.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4">Free Plan</th>
                    <th className="py-3 px-4">Pro Plan ($4/mo)</th>
                    <th className="py-3 px-4">Business Plan ($18/mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">3D Wish Cards</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited Classic</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited Premium</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited VIP</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">WhatsApp RSVP Tracking</td>
                    <td className="py-3 px-4">Basic Direct Link</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Live Dashboard + Auto Export</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Multi-Event RSVP Concierge</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">Watermark Removal</td>
                    <td className="py-3 px-4 text-muted-foreground">Includes Cardzy Badge</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">100% Removed</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">100% Removed + Custom Logo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">Languages &amp; RTL Urdu Nastaliq</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">All 18 Languages</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">All 18 Languages</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">All 18 Languages + Custom Fonts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">Support SLA</td>
                    <td className="py-3 px-4">Email (24–48h)</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Priority WhatsApp (2–4h)</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Dedicated Account Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pricing FAQ */}
            <div className="pt-4 space-y-3">
              <h3 className="font-bold text-base text-foreground">Frequently Asked Questions about Cardzy Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5">
                  <h4 className="font-bold text-foreground">Can I use Cardzy completely for free?</h4>
                  <p>Yes! Our Free Forever tier lets you create and share unlimited 3D greeting cards with full music and text customization without entering credit card details.</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-1.5">
                  <h4 className="font-bold text-foreground">How do I pay in PKR or international currencies?</h4>
                  <p>We accept JazzCash, EasyPaisa, Nayapay, Sadapay, bank transfers, and international cards. Message our WhatsApp hotline at +92 309 3518796 for instant activation.</p>
                </div>
              </div>
            </div>
          </section>
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
    </div>
  )
}
