'use client'
import { Crown, X, Check, Sparkles, Lock } from 'lucide-react'
import Link from 'next/link'

interface ProUpgradeGateProps {
  feature: string
  description?: string
  onClose: () => void
}

const PRO_HIGHLIGHTS = [
  'Unlimited cards in all categories (5 limit on Free)',
  'Permanent lifetime cards (No 30-day auto-expiry)',
  'All 12+ premium themes & borders',
  'Remove Cardzy watermark & download HQ PNGs',
  'Priority support & real-time RSVP exports',
]

export function ProUpgradeGate({ feature, description, onClose }: ProUpgradeGateProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0d14] border border-amber-500/40 rounded-3xl shadow-2xl p-6 max-w-sm w-full relative ring-1 ring-white/10 animate-in zoom-in-95 fade-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
            <Crown className="size-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base leading-tight">Pro Feature</h3>
            <p className="text-xs text-amber-400/90 font-medium mt-0.5">{feature}</p>
          </div>
        </div>

        {description && (
          <p className="text-sm text-zinc-300 mb-4 leading-relaxed border-l-2 border-amber-500/40 pl-3">
            {description}
          </p>
        )}

        {/* Pro benefits list */}
        <div className="bg-white/5 rounded-2xl p-3.5 space-y-2 mb-5">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
            What you unlock with Pro
          </p>
          {PRO_HIGHLIGHTS.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-zinc-200">
              <Check className="size-3.5 text-emerald-400 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Pricing hint */}
        <p className="text-center text-[11px] text-zinc-500 mb-3">
          Starting from <span className="text-amber-400 font-bold">$1.99 / PKR 499/mo</span> · Annual $20.30 / PKR 5,090 (15% OFF)
        </p>

        <Link
          href="/pricing"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-black bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="size-4" />
          Upgrade to Pro
        </Link>

        <button
          onClick={onClose}
          className="block w-full mt-2 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center cursor-pointer"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}

/** Banner shown in dashboard when a free user has hit their card creation limit */
export function CardLimitBanner({
  cardType,
  limit,
  current,
  isProOnly = false,
}: {
  cardType: string
  limit: number
  current: number
  isProOnly?: boolean
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm mt-3">
      <Lock className="size-4 text-amber-400 shrink-0" />
      <div className="flex-1 min-w-0">
        {isProOnly ? (
          <span className="text-zinc-300 text-xs">
            <span className="font-bold text-amber-300">Pro only</span> — {cardType} requires a Pro plan.
          </span>
        ) : (
          <span className="text-zinc-300 text-xs">
            <span className="font-bold text-amber-300">Limit reached</span> — Free plan allows{' '}
            {limit} {cardType}{limit === 1 ? '' : 's'} ({current}/{limit} used).
          </span>
        )}
      </div>
      <Link
        href="/pricing"
        className="px-3 py-1.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        Upgrade
      </Link>
    </div>
  )
}
