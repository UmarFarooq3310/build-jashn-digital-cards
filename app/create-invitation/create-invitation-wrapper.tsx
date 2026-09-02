'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const CreateInvitationClientTool = dynamic(
  () => import('./create-invitation-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    ),
  }
)

export function CreateInvitationWrapper() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="py-4 md:py-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center w-full">
      {/* SSR-rendered heading visible to crawlers + supports i18n translations */}
      <h1 className={`text-2xl font-extrabold tracking-tight sm:text-4xl text-[#7B0D1E] mb-2 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
        {t('createDigitalWeddingInvitationsHeader') || 'Create Digital Wedding Invitations'}
      </h1>
      <h2 className={`text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto font-medium mb-6 ${isUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}`}>
        {t('design4kAnimatedWeddingInvitationsSubHeader') || 'Design 4K Animated Wedding Invitations — Cardzy'}
      </h2>
      <CreateInvitationClientTool />
    </div>
  )
}
