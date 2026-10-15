'use client'

import React from 'react'
import { Check, X, Sparkles, Crown, MessageCircle, ShieldCheck, Zap, Infinity as InfinityIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureRow {
  name: string
  description?: string
  free: string | boolean
  pro: string | boolean
  highlight?: boolean
}

const COMPARISON_FEATURES: FeatureRow[] = [
  {
    name: 'Branding & Watermarks',
    description: 'Clean recipient view for weddings and corporate vCards',
    free: 'Cardzy footer badge',
    pro: '✨ 100% White-Label (No Watermarks)',
    highlight: true,
  },
  {
    name: 'Automated WhatsApp RSVPs',
    description: 'Real-time 1-click guest confirmations directly to WhatsApp',
    free: false,
    pro: '⚡ Real-Time WhatsApp Tracking + CSV/PDF Export',
    highlight: true,
  },
  {
    name: 'Link Duration & Permanence',
    description: 'How long your cards and invitation links remain active',
    free: '30-Day Active Links',
    pro: '♾️ Permanent Lifetime Links',
    highlight: true,
  },
  {
    name: '3D Interactive Magic Links',
    description: 'Candle blowing, 3D ring box unboxing, envelope wax seals',
    free: 'Limited Scenarios',
    pro: 'All 3D Magic Scenarios Unlocked',
  },
  {
    name: '1,000+ Poetry Treasury Integration',
    description: '1-click direct card conversion from Iqbal, Ghalib & Faiz',
    free: 'Browse & Read Only',
    pro: '1-Click 3D Nastaliq Card Creation',
  },
  {
    name: 'Luxury Themes & Border Frames',
    description: 'Mughal Emerald, Royal Plum, Gold Leaf & Velvet',
    free: '5 Classic Themes',
    pro: 'All 12+ Luxury Themes & Custom Fonts',
  },
  {
    name: 'Background Music & Voice Notes',
    description: 'Royalty-free soundtracks and custom audio recordings',
    free: 'Standard Library',
    pro: 'Full Treasury + Custom MP3 Upload',
  },
  {
    name: 'Active Card Creation Limits',
    description: 'Number of digital cards you can generate and share',
    free: '5 Cards per category',
    pro: 'Unlimited 3D Cards & Invitations',
  },
  {
    name: 'VIP WhatsApp Concierge Support',
    description: 'Direct assistance for wedding guest lists and setup',
    free: 'Standard Email',
    pro: 'Priority WhatsApp (+92 309 3518796)',
  },
]

interface ProComparisonMatrixProps {
  onUpgradeClick?: () => void
  className?: string
  isUrdu?: boolean
}

export function ProComparisonMatrix({
  onUpgradeClick,
  className,
  isUrdu = false,
}: ProComparisonMatrixProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl", className)}>
      {/* Matrix Header Banner */}
      <div className="border-b border-border/80 bg-muted/40 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-500 dark:text-amber-400 mb-2">
            <Sparkles className="size-3.5" />
            <span>{isUrdu ? 'پلان کی تفصیلی موازنہ' : 'Free vs. Cardzy Pro Comparison'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            {isUrdu ? 'کارڈزی پرو کے ساتھ ہر تقریب کو یادگار بنائیں' : 'Upgrade to Cardzy Pro for Unmatched Luxury'}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            {isUrdu
              ? 'بغیر واٹر مارک، مستقل لنکس اور خودکار واٹس ایپ آر ایس وی پی ٹریکنگ کے ساتھ شادیوں اور تقریبات کے لیے بہترین حل۔'
              : 'Remove watermarks, keep your wedding memories alive forever, and track guest RSVPs with automated WhatsApp alerts.'}
          </p>
        </div>

        {onUpgradeClick && (
          <button
            type="button"
            onClick={onUpgradeClick}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-extrabold text-sm px-6 py-3 shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Crown className="size-4 text-amber-200" />
            <span>{isUrdu ? 'پرو پر اپ گریڈ کریں (Rs 499)' : 'Upgrade to Pro ($1.99 / Rs 499)'}</span>
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/20">
              <th className="py-4 px-4 sm:px-6 font-bold text-foreground w-1/2">
                {isUrdu ? 'فیچر / سہولت' : 'Feature & Capability'}
              </th>
              <th className="py-4 px-4 sm:px-6 font-bold text-muted-foreground w-1/4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm sm:text-base font-extrabold text-foreground">Free</span>
                  <span className="text-[11px] font-normal text-muted-foreground">$0 (Rs 0)</span>
                </div>
              </th>
              <th className="py-4 px-4 sm:px-6 font-bold text-primary w-1/4 text-center bg-primary/5 border-l border-r border-primary/20">
                <div className="flex flex-col items-center">
                  <span className="inline-flex items-center gap-1 text-sm sm:text-base font-extrabold text-primary">
                    <Crown className="size-4 text-amber-500 fill-amber-500" /> Cardzy Pro
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    $1.99 / mo (Rs 499 / mo)
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {COMPARISON_FEATURES.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  "transition-colors hover:bg-muted/30",
                  row.highlight && "bg-amber-500/5 font-medium"
                )}
              >
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-bold text-foreground", row.highlight && "text-amber-500 dark:text-amber-400")}>
                        {row.name}
                      </span>
                      {row.highlight && (
                        <span className="hidden sm:inline-flex rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.2 text-[10px] font-bold text-amber-500">
                          High Value
                        </span>
                      )}
                    </div>
                    {row.description && (
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        {row.description}
                      </span>
                    )}
                  </div>
                </td>

                {/* Free Value */}
                <td className="py-4 px-4 sm:px-6 text-center text-muted-foreground">
                  {typeof row.free === 'boolean' ? (
                    row.free ? (
                      <Check className="size-4 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="size-4 text-rose-500/70 mx-auto" />
                    )
                  ) : (
                    <span>{row.free}</span>
                  )}
                </td>

                {/* Pro Value */}
                <td className="py-4 px-4 sm:px-6 text-center bg-primary/5 border-l border-r border-primary/20 font-semibold text-foreground">
                  {typeof row.pro === 'boolean' ? (
                    row.pro ? (
                      <Check className="size-5 text-emerald-500 mx-auto font-bold" />
                    ) : (
                      <X className="size-4 text-rose-500/70 mx-auto" />
                    )
                  ) : (
                    <span className={cn(row.highlight ? "text-primary font-bold" : "text-foreground")}>
                      {row.pro}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Matrix Footer Callout */}
      <div className="p-4 sm:p-6 bg-muted/40 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
          <span>
            {isUrdu
              ? 'مقامی پاکستانی ادائیگی (JazzCash / EasyPaisa / Raast) اور بین الاقوامی کارڈز دونوں تعاون یافتہ ہیں۔'
              : 'Instant activation via JazzCash, EasyPaisa, Raast Bank Transfer & International Cards.'}
          </span>
        </div>

        {onUpgradeClick && (
          <button
            type="button"
            onClick={onUpgradeClick}
            className="font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isUrdu ? 'ابھی شروع کریں' : 'Choose Plan & Checkout'}</span>
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  )
}
