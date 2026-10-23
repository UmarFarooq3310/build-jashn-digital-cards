'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProComparisonMatrix } from '@/components/pricing/pro-comparison-matrix'
import { PakistanPaymentModal } from '@/components/pricing/pakistan-payment-modal'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import type { Plan } from '@/lib/jashn/types'

// ─── Plan Config ──────────────────────────────────────────────────────────────
interface PriceConfig {
  usd: number
  pkr: number
  label: string
  periodEn: string
  periodUr: string
  savingsLabel?: string
}

const PRO_PRICING: {
  monthly: PriceConfig
  annual: PriceConfig
} = {
  monthly: {
    usd: 1.99,
    pkr: 499,
    label: '$1.99 (Rs 499)',
    periodEn: '/ month',
    periodUr: '/ ماہانہ',
  },
  annual: {
    usd: 20.30,
    pkr: 5090,
    label: '$20.30 (Rs 5,090)',
    periodEn: '/ year (15% OFF)',
    periodUr: '/ سالانہ (15% بچت)',
    savingsLabel: 'Save 15%',
  },
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PricingPage() {
  const router = useRouter()
  const { user, upgrade } = useJashn()
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  // Billing cycle toggle: monthly or annual (15% off)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  // Modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false)

  function openModal() {
    if (!user) {
      router.push('/login')
      return
    }
    setPaymentModalOpen(true)
  }

  function closeModal() {
    setPaymentModalOpen(false)
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

  const isPaidUser = user?.plan === 'pro' || user?.plan === 'business'
  const activeProPrice = PRO_PRICING[billingCycle]

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="size-4" /> {t('simpleTransparentPricing')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('choosePerfectPlan')}
            </h1>
            <h2 className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pricingHeaderDesc')}{' '}
              {t('pricingBuilderLink')}{' '}
              <Link href="/create-invitation" className="text-primary underline font-semibold hover:opacity-80">
                {t('pricingInviteBuilder')}
              </Link>{' '}
              {t('pricingOrCraft')}{' '}
              <Link href="/create-visiting-card" className="text-primary underline font-semibold hover:opacity-80">
                {t('pricingBusinessCard')}
              </Link>.
            </h2>

            {/* ── Billing Cycle Toggle (Monthly vs Annual 15% OFF) ──────── */}
            <div className="mt-8 flex items-center justify-center">
              <div className="inline-flex items-center rounded-2xl bg-muted/80 p-1.5 border border-border shadow-inner">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`rounded-xl px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isUrdu ? 'ماہانہ بلنگ' : 'Monthly Billing'}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`relative flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                    billingCycle === 'annual'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{isUrdu ? 'سالانہ بلنگ' : 'Annual Billing'}</span>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    {isUrdu ? '15% رعایت' : '15% OFF'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Pricing Grid (2 Plans: Free & Pro) ─────────────────────────── */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">

            {/* Free Plan */}
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm flex flex-col justify-between text-left transition-all hover:border-border/80">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{t('tblFreePlan')}</h3>
                <p className="text-xs text-muted-foreground mt-1.5">{t('freePlanDesc')}</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">$0 <span className="text-lg font-normal text-muted-foreground">(Rs 0)</span></span>
                  <span className="text-sm text-muted-foreground"> {t('forever')}</span>
                </div>
                <ul className="space-y-3.5 text-sm text-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{isUrdu ? '5 مفت کارڈز ہر کیٹیگری کے لیے (وش، دعوت نامے، وزٹنگ کارڈز)' : '5 Free Cards for each category (Wishes, Invites, vCards, Magic)'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{isUrdu ? '5 کلاسک فری تھیمز اور فریمز' : '5 Classic Free Themes & Border Frames'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{isUrdu ? 'پس منظر موسیقی و ساؤنڈ ٹریکس شامل ہیں' : 'Background Music & Celebration Audio Included'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{isUrdu ? '30 دن تک لنک لائیو و فعال (کارڈزی واٹر مارک کے ساتھ)' : '30-Day Active Links (with Cardzy watermark)'}</span>
                  </li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full h-11 font-semibold rounded-2xl"
                variant="outline"
                disabled={user?.plan === 'free'}
                onClick={() => handleDowngrade('free')}
              >
                {user?.plan === 'free' ? (t('currentPlan') || 'Current Plan') : t('getStartedFree')}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border-2 border-primary bg-card p-8 sm:p-10 shadow-2xl flex flex-col justify-between text-left ring-4 ring-primary/10">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm flex items-center gap-1.5">
                <Crown className="size-3.5 text-amber-300" /> {t('mostPopular')}
              </span>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-foreground">Pro</h3>
                    <Crown className="size-5 text-amber-500" />
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {isUrdu ? '15% سالانہ بچت' : '15% Off Applied'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{t('proPlanDesc')}</p>
                <div className="my-6">
                  {billingCycle === 'monthly' ? (
                    <div>
                      <span className="text-3xl sm:text-4xl font-extrabold text-primary">$1.99 <span className="text-lg font-normal text-muted-foreground">(Rs 499)</span></span>
                      <span className="text-sm text-muted-foreground"> {t('perMonth')}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-extrabold text-primary">$20.30 <span className="text-lg font-normal text-muted-foreground">(Rs 5,090)</span></span>
                        <span className="text-sm text-muted-foreground">{isUrdu ? '/ سال' : '/ year'}</span>
                      </div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        {isUrdu ? 'صرف $1.69 (Rs 424) فی ماہ — 15% رعایت کے ساتھ' : 'Just ~$1.69 / mo (Rs 424 / mo) — Save 15%'}
                      </p>
                    </div>
                  )}
                </div>
                <ul className="space-y-3.5 text-sm text-foreground">
                  <li className="flex items-center gap-2.5"><Check className="size-4 text-primary font-bold shrink-0" /> {t('feat_pro_1')}</li>
                  <li className="flex items-center gap-2.5"><Check className="size-4 text-primary font-bold shrink-0" /> {t('feat_pro_2')}</li>
                  <li className="flex items-center gap-2.5"><Check className="size-4 text-primary font-bold shrink-0" /> {t('feat_pro_3')}</li>
                  <li className="flex items-center gap-2.5"><Check className="size-4 text-primary font-bold shrink-0" /> {t('feat_pro_4')}</li>
                  <li className="flex items-center gap-2.5"><Check className="size-4 text-primary font-bold shrink-0" /> {t('feat_pro_5')}</li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-4 text-primary font-bold shrink-0" />
                    <span>{isUrdu ? 'مہمانوں کی لسٹ CSV اور PDF رپورٹ ڈاؤن لوڈ' : 'Full Guest List CSV & PDF Report Download'}</span>
                  </li>
                </ul>
              </div>
              <Button
                className="mt-8 w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-md transition-all"
                onClick={openModal}
                disabled={isPaidUser}
              >
                {isPaidUser ? (t('currentPlan') || 'Current Plan') : (t('upgradeToPro') || 'Upgrade to Pro')}
              </Button>
            </div>
          </div>

          {/* ── How to Pay Banner ──────────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-border bg-muted/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
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
                href="https://api.whatsapp.com/send?phone=923093518796"
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

          {/* Detailed Feature Comparison Table & Pro Highlights */}
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <ProComparisonMatrix onUpgradeClick={openModal} isUrdu={isUrdu} />

            {/* Pricing FAQ */}
            <div className="pt-8 space-y-4">
              <h3 className="font-bold text-xl text-foreground">{t('pricingFaqH3')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">{t('pricingFaqQ1')}</h4>
                  <p className="leading-relaxed">{t('pricingFaqA1')}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">{t('pricingFaqQ2')}</h4>
                  <p className="leading-relaxed">{t('pricingFaqA2')}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">Which local and international payment methods are supported?</h4>
                  <p className="leading-relaxed">
                    In Pakistan, we support instant mobile payments via JazzCash, EasyPaisa, Raast instant transfers, SadaPay, NayaPay, and bank transfers. Internationally, we accept all major Visa, MasterCard, UnionPay debit/credit cards, and digital wallet options.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">Can I upgrade to Pro for just a single month for my wedding?</h4>
                  <p className="leading-relaxed">
                    Absolutely! You are never locked into an annual contract. Many couples upgrade to the $1.99 (Rs 499) monthly Pro plan to manage their wedding RSVPs, download guest headcounts, and export 10-second high-definition vertical MP4 videos, then downgrade to Free whenever they choose.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">Do my wedding guests or greeting card recipients see advertisements?</h4>
                  <p className="leading-relaxed">
                    On our Pro plan, your published wedding invitation links, greeting cards, and smart visiting cards are delivered 100% ad-free with zero watermarks. Your guests enjoy a clean, royal experience with nothing distracting from your celebration.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">Do my existing cards disappear if I cancel my subscription?</h4>
                  <p className="leading-relaxed">
                    Never. All wedding websites, wish cards, and visiting cards you have already created remain live and accessible online. If you downgrade to the Free plan, you retain access to basic features while premium themes and export tools revert to Free mode.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">Can I create corporate or executive visiting cards with Cardzy Pro?</h4>
                  <p className="leading-relaxed">
                    Yes! Pro users can generate unlimited smart digital visiting cards (vCards) with custom brand palettes, company logos, direct WhatsApp click-to-chat links, one-touch phone dialing, and downloadable .vcf contact files.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 space-y-1.5 shadow-xs">
                  <h4 className="font-bold text-foreground text-sm">How does the 100% Satisfaction Guarantee and support work?</h4>
                  <p className="leading-relaxed">
                    Our team provides dedicated direct customer support via WhatsApp (+92 309 3518796) and email (cardzyonline@gmail.com). If you experience any technical difficulties activating Pro features or exporting cards, our engineering team assists you within hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Value Breakdown & Eco-friendly Comparison */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-border bg-card/60 space-y-4">
              <h3 className="font-extrabold text-lg sm:text-xl text-foreground">
                Cardzy Pro vs. Traditional Paper Invitations: The Smart Choice
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Traditional paper wedding invitations for a 300-guest event typically cost between Rs 35,000 to Rs 90,000 ($120 to $350 USD) when factoring in gold foil printing, calligrapher fees, boxed packaging, and courier delivery charges. Furthermore, last-minute venue changes or timing corrections require costly reprints.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">95% Cost Savings</div>
                  <p className="text-muted-foreground">Get unlimited digital guest links, instant RSVP tracking, and high-definition MP4 story cards starting at just Rs 499 ($1.99).</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                  <div className="font-bold text-primary">100% Eco-Friendly</div>
                  <p className="text-muted-foreground">Save hundreds of pounds of bleached cardstock, synthetic foils, and transport emissions with zero-waste digital celebration cards.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                  <div className="font-bold text-amber-500">Live Edits Anytime</div>
                  <p className="text-muted-foreground">Update hall dinner timings, GPS map coordinates, or ceremony dates instantly without sending confused correction messages.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Comprehensive Pakistan (JazzCash / EasyPaisa / Raast) & International Payment Modal ───────────────────────────────────────────────── */}
        <PakistanPaymentModal
          isOpen={paymentModalOpen}
          onClose={closeModal}
          userEmail={user?.email || ''}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
          isUrdu={isUrdu}
        />
    </div>
  )
}
