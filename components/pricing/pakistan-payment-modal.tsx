'use client'

import React, { useState } from 'react'
import {
  X,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Zap,
  CreditCard,
  Building2,
  Smartphone,
  Sparkles,
  Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PakistanPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail?: string
  billingCycle: 'monthly' | 'annual'
  onBillingCycleChange?: (cycle: 'monthly' | 'annual') => void
  isUrdu?: boolean
}

type PaymentMethodType = 'jazzcash' | 'easypaisa' | 'raast' | 'card'

export function PakistanPaymentModal({
  isOpen,
  onClose,
  userEmail = '',
  billingCycle = 'monthly',
  onBillingCycleChange,
  isUrdu = false,
}: PakistanPaymentModalProps) {
  const [currencyTab, setCurrencyTab] = useState<'pkr' | 'usd'>('pkr')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('jazzcash')
  const [trxId, setTrxId] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!isOpen) return null

  const isAnnual = billingCycle === 'annual'
  const pkrPrice = isAnnual ? 'PKR 5,090' : 'PKR 499'
  const usdPrice = isAnnual ? '$20.30' : '$1.99'
  const periodLabel = isAnnual ? (isUrdu ? 'سالانہ (15% رعایت)' : 'Annual (15% OFF)') : (isUrdu ? 'ماہانہ' : 'Monthly')

  // Payment destination details
  const PAYMENT_DETAILS = {
    accountNumber: '03093518796',
    formattedNumber: '0309 3518796',
    accountTitle: 'Cardzy Official / Muhammad Umar',
    raastId: '03093518796',
    bankName: 'Nayapay / Raast Instant Transfer',
  }

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const generateWhatsAppMessage = () => {
    const methodNames: Record<PaymentMethodType, string> = {
      jazzcash: 'JazzCash',
      easypaisa: 'EasyPaisa',
      raast: 'Raast / Bank Transfer',
      card: 'International Card / Stripe',
    }

    const selectedName = methodNames[selectedMethod] || 'JazzCash'
    const planText = `Cardzy Pro (${isAnnual ? 'Annual 15% OFF' : 'Monthly'} - ${currencyTab === 'pkr' ? pkrPrice : usdPrice})`

    return encodeURIComponent(
      `Assalam-o-Alaikum Cardzy Team! ✨\n\nI want to upgrade to ${planText}.\n` +
      `• Payment Method: ${selectedName}\n` +
      `• Account Email: ${userEmail || '[Please specify]'}\n` +
      (trxId ? `• Transaction ID / Ref: ${trxId}\n` : '') +
      `\nI have attached my payment receipt/screenshot. Please activate my Pro account.`
    )
  }

  const whatsappUrl = `https://wa.me/923093518796?text=${generateWhatsAppMessage()}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl text-left my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="size-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
            <Crown className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-foreground">
              {isUrdu ? 'کارڈزی پرو سبسکرپشن' : 'Upgrade to Cardzy Pro'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isUrdu ? 'بغیر واٹر مارک، لائف ٹائم لنکس اور واٹس ایپ آر ایس وی پی' : 'No watermarks, lifetime links & automated WhatsApp RSVPs'}
            </p>
          </div>
        </div>

        {/* Currency & Region Selector Tabs */}
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-2xl bg-muted/80 p-1 border border-border">
          <button
            type="button"
            onClick={() => setCurrencyTab('pkr')}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer",
              currencyTab === 'pkr'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>🇵🇰 پاکستان (PKR)</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrencyTab('usd')}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer",
              currencyTab === 'usd'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>🌍 International (USD)</span>
          </button>
        </div>

        {/* Selected Plan Summary Banner */}
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/25 p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              {isUrdu ? 'منتخب شدہ رقم' : 'Amount to Pay'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-primary">
                {currencyTab === 'pkr' ? pkrPrice : usdPrice}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                / {periodLabel}
              </span>
            </div>
          </div>

          {onBillingCycleChange && (
            <div className="flex rounded-xl bg-background/80 border border-border p-0.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => onBillingCycleChange('monthly')}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  !isAnnual ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => onBillingCycleChange('annual')}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  isAnnual ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Annual (-15%)
              </button>
            </div>
          )}
        </div>

        {/* --- SECTION 1: PAKISTAN LOCAL PAYMENT METHODS --- */}
        {currencyTab === 'pkr' && (
          <div className="mt-4 space-y-4">
            {/* Method Pill Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('jazzcash')}
                className={cn(
                  "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer",
                  selectedMethod === 'jazzcash'
                    ? "border-rose-500 bg-rose-500/10 text-rose-500 font-bold shadow-xs"
                    : "border-border bg-muted/40 hover:bg-muted text-muted-foreground"
                )}
              >
                <Smartphone className="size-4 mb-1" />
                <span className="text-xs">JazzCash</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('easypaisa')}
                className={cn(
                  "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer",
                  selectedMethod === 'easypaisa'
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold shadow-xs"
                    : "border-border bg-muted/40 hover:bg-muted text-muted-foreground"
                )}
              >
                <Smartphone className="size-4 mb-1" />
                <span className="text-xs">EasyPaisa</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('raast')}
                className={cn(
                  "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer",
                  selectedMethod === 'raast'
                    ? "border-sky-500 bg-sky-500/10 text-sky-500 font-bold shadow-xs"
                    : "border-border bg-muted/40 hover:bg-muted text-muted-foreground"
                )}
              >
                <Building2 className="size-4 mb-1" />
                <span className="text-xs">Raast / Bank</span>
              </button>
            </div>

            {/* Account Details Box */}
            <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block">
                    {selectedMethod === 'raast' ? 'Raast ID / Mobile' : `${selectedMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Account`}
                  </span>
                  <span className="text-base font-mono font-black text-foreground">
                    {PAYMENT_DETAILS.formattedNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PAYMENT_DETAILS.accountNumber, 'acc')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background border border-border hover:bg-muted text-xs font-bold text-foreground transition-all cursor-pointer shadow-xs"
                >
                  {copiedField === 'acc' ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                <span className="text-muted-foreground">Account Title:</span>
                <span className="font-bold text-foreground">{PAYMENT_DETAILS.accountTitle}</span>
              </div>

              {selectedMethod === 'raast' && (
                <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                  <span className="text-muted-foreground">Bank / Gateway:</span>
                  <span className="font-bold text-foreground">{PAYMENT_DETAILS.bankName}</span>
                </div>
              )}
            </div>

            {/* Verification Step: Trx ID & Screenshot prompt */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground block">
                {isUrdu ? 'ٹرانزیکشن آئی ڈی / رسید نمبر (اختیاری):' : 'Transaction ID / Sender Number (Optional):'}
              </label>
              <input
                type="text"
                placeholder="e.g. TID 12345678901 or 0300-XXXXXXX"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 font-mono"
              />
            </div>
          </div>
        )}

        {/* --- SECTION 2: INTERNATIONAL PAYMENT (USD) --- */}
        {currencyTab === 'usd' && (
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-2.5 text-xs text-foreground">
              <div className="flex items-center gap-2 font-bold text-primary text-sm">
                <CreditCard className="size-4" />
                <span>Credit / Debit Card & International Checkout</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We accept Visa, MasterCard, American Express, and UnionPay for global subscriptions at <strong>{usdPrice} / {periodLabel}</strong>.
              </p>
              <div className="flex items-center gap-2 pt-1 text-emerald-500 font-semibold">
                <ShieldCheck className="size-4" />
                <span>256-Bit SSL Encrypted & Instant Cardzy Pro Activation</span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp & Email Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 px-4 shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
          >
            <MessageCircle className="size-4 fill-white" />
            <span>
              {isUrdu ? 'واٹس ایپ پر رسید بھیجیں اور فوری فعال کروائیں' : 'Submit on WhatsApp (+92 309 3518796)'}
            </span>
          </a>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <Zap className="size-3 fill-emerald-500" />
              <span>{isUrdu ? 'فوری تصدیق (5 سے 15 منٹ)' : 'Average activation time: 5-15 mins'}</span>
            </span>
            <a
              href={`mailto:cardzyonline@gmail.com?subject=Cardzy%20Pro%20Upgrade&body=${generateWhatsAppMessage()}`}
              className="hover:text-primary transition-colors underline"
            >
              Email Backup
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
