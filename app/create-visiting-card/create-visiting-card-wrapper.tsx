'use client'

import dynamic from 'next/dynamic'
import { Loader2, CreditCard } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const CreateVisitingCardClientTool = dynamic(
  () => import('./create-visiting-card-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-700" />
      </div>
    ),
  }
)

export function CreateVisitingCardWrapper() {
  const { t } = useLang()

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* SSR-rendered heading visible to crawlers + supports i18n translations */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
            <CreditCard className="size-4 text-emerald-600" />
            <span>{t('createVisitingCard') || 'Digital Visiting Cards'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {t('createInteractiveVisitingCardTitle') || 'Create Your Interactive Digital Business Card'}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t('createInteractiveVisitingCardSubtitle') || 'Share your digital business card on WhatsApp, Email, or Social Media. Includes 1-click Save Contact (.vcf), Google Maps directions, and 18 language support!'}
          </p>
        </div>
        <CreateVisitingCardClientTool />
      </div>
    </div>
  )
}
