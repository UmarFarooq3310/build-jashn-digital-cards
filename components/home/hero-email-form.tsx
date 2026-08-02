'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'

export function HeroEmailForm() {
  const router = useRouter()
  const { t } = useLang()
  const user = useJashn((s) => s.user)
  const [heroEmail, setHeroEmail] = useState('')

  if (user) {
    return null
  }

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroEmail.trim()) return
    router.push(`/signup?email=${encodeURIComponent(heroEmail.trim())}`)
  }

  return (
    <div className="mt-8">
      <p className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {t('orSignUp')}
      </p>
      <form onSubmit={handleEmailSignup} className="flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="email"
            value={heroEmail}
            onChange={(e) => setHeroEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-emerald-800/20 bg-card/80 py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/60 shadow-sm transition-all"
            aria-label="Email address for sign up"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 px-5 py-3 text-sm font-extrabold text-white shadow-md active:scale-95 transition-all"
        >
          {t('signUpArrow')} <ArrowRight className="size-3.5" />
        </button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">
        {t('noCardRequired')} · {t('instantShareableLink')}
      </p>
    </div>
  )
}
