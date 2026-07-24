'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useJashn } from '@/lib/jashn/store'
import type { VisitingCard } from '@/lib/jashn/types'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export default function VisitingCardPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const { getVisitingCard, incrementVisitingCardView } = useJashn()
  const { t } = useLang()
  const [card, setCard] = useState<VisitingCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCard() {
      // 1. Try local store
      const storeCard = getVisitingCard(slug)
      if (storeCard) {
        setCard(storeCard)
        incrementVisitingCardView(slug)
        setLoading(false)
        return
      }

      // 2. Fetch from Firestore if not in store
      if (db) {
        try {
          const docRef = doc(db, 'visitingCards', slug)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const fetchedCard = docSnap.data() as VisitingCard
            setCard(fetchedCard)
            updateDoc(docRef, { viewCount: increment(1) }).catch(console.error)
          }
        } catch (e) {
          console.error('Failed to load visiting card from Firestore:', e)
        }
      }
      setLoading(false)
    }

    loadCard()
  }, [slug, getVisitingCard, incrementVisitingCardView])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="size-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        <p className="mt-4 text-xs font-bold text-muted-foreground">Loading Digital Visiting Card...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Visiting Card Not Found</h1>
        <p className="text-xs text-muted-foreground max-w-sm">
          The requested digital visiting card link may have been moved or deleted.
        </p>
        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs"
        >
          <Sparkles className="size-4" />
          <span>Create Your Digital Visiting Card</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-10 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span>{t('backToHome') || 'Back to Cardzy'}</span>
            </Link>

            <Link
              href="/create-visiting-card"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <Sparkles className="size-3.5" />
              <span>{t('createYours') || 'Create Yours'}</span>
            </Link>
          </div>

          <VisitingCardView data={card} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
