'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const CreateWishClientTool = dynamic(
  () => import('./create-wish-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    ),
  }
)

export function CreateWishWrapper() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="py-4 md:py-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center w-full">
      {/* SSR-rendered heading visible to crawlers + supports i18n translations */}
      <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-[#7B0D1E] font-serif mb-2 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
        {t('create3dAnimatedWishCardsTitle') || 'Create 3D Animated Wish Cards'}
      </h1>
      <h2 className={`text-[#5A4530] text-sm sm:text-base max-w-xl mx-auto font-medium mb-6 ${isUrdu ? 'font-urdu text-base leading-relaxed' : ''}`}>
        {t('createWishSubTitle') || 'Animated Wishes & Event Invitations — Cardzy'}
      </h2>
      <CreateWishClientTool />
    </div>
  )
}
