'use client'

import dynamic from 'next/dynamic'
import { Loader2, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

const CreateMagicLinkClientTool = dynamic(
  () => import('./create-magic-link-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-28 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 text-[#7B0D1E] animate-spin" />
          <span className="text-muted-foreground text-xs font-bold animate-pulse">Loading Magic Studio...</span>
        </div>
      </div>
    ),
  }
)

export function CreateMagicLinkWrapper() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  return (
    <div className="relative overflow-hidden min-w-0">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="py-12 md:py-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center w-full relative z-10">
        {/* Top Studio Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500/10 to-amber-500/10 dark:from-rose-500/20 dark:to-amber-500/20 px-5 py-2 border border-rose-200 dark:border-rose-800 text-[#7B0D1E] dark:text-rose-300 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm transition-transform hover:scale-105">
          <Sparkles className="size-4 text-amber-500 animate-pulse" />
          <span>Cardzy 3D Magic Studio 🪄</span>
        </div>

        {/* Main Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-serif mb-5 drop-shadow-sm ${
            isUrdu ? 'font-urdu leading-relaxed' : ''
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B0D1E] to-[#b45309] dark:from-rose-400 dark:to-amber-400">
            {t('createMagicLinkTitle', 'Create 3D Animated')}
          </span>
          <br className="hidden sm:block" />
          <span className="text-foreground">
            {' Magic Links ✨'}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium mb-10 leading-relaxed ${
            isUrdu ? 'font-urdu text-lg' : ''
          }`}
        >
          {t(
            'createMagicLinkSubTitle',
            'Surprise someone with an interactive 3D experience — blowable candles, velvet ring box, popping balloons & instant reactions.'
          )}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { e: '💍', t: '3D Ring Box Proposal', c: 'hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30' },
            { e: '🎂', t: 'Blowable Candles', c: 'hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30' },
            { e: '🎊', t: 'Floating Confetti', c: 'hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30' },
            { e: '🌙', t: 'Eid & Ramadan', c: 'hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30' },
            { e: '📲', t: '1-Click WhatsApp Share', c: 'hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30' },
          ].map((p) => (
            <span
              key={p.t}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-card/80 backdrop-blur-sm border border-border text-foreground shadow-sm transition-all duration-300 cursor-default ${p.c}`}
            >
              <span className="text-lg">{p.e}</span>
              <span>{p.t}</span>
            </span>
          ))}
        </div>

        {/* Client Tool Body */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none -z-10 rounded-3xl" />
          <CreateMagicLinkClientTool />
        </div>
      </div>
    </div>
  )
}
