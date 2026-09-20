'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const CreateMagicLinkClientTool = dynamic(
  () => import('./create-magic-link-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7A1E2B]" />
      </div>
    ),
  }
)

export function CreateMagicLinkWrapper() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="py-4 md:py-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
      {/* Dynamic heading with i18n translations & crawlable semantics */}
      <div className="text-center mb-6">
        <h1
          className={`text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-[#7A1E2B] font-serif mb-2 ${
            isUrdu ? 'font-urdu leading-relaxed' : ''
          }`}
        >
          {t('createMagicLinkTitle', 'Create 3D Animated Magic Link 🪄')}
        </h1>
        <h2
          className={`text-[#5A4530] text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium ${
            isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''
          }`}
        >
          {t(
            'createMagicLinkSubTitle',
            'Interactive celebrations with popping balloons, blowable candles, 3D velvet ring box, and love reactions!'
          )}
        </h2>
      </div>
      <CreateMagicLinkClientTool />
    </div>
  )
}
