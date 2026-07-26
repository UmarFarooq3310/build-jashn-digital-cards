'use client'

import { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useJashn } from '@/lib/jashn/store'
import type { VisitingCard } from '@/lib/jashn/types'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Eye, Edit3, Trash2, ShieldCheck, Cpu } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export default function VisitingCardPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()

  const { user, getVisitingCard, incrementVisitingCardView, deleteVisitingCard, showToast } = useJashn()
  const { t } = useLang()
  const cardRef = useRef<HTMLDivElement>(null)

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

      // 2. Sample fallback
      if (slug === 'sample' || slug === 'demo') {
        setCard({
          id: 'sample',
          slug: 'sample',
          creatorId: 'demo',
          fullName: 'Umar Farooq',
          title: 'Senior Software Engineer & Tech Lead',
          company: 'Jashn Digital Cards',
          phone: '+92 300 1234567',
          whatsapp: '+92 300 1234567',
          email: 'contact@cardzy.online',
          website: 'https://cardzy.online',
          address: 'Lahore, Pakistan',
          bio: 'Crafting premium interactive digital invitation cards and smart vCards with multi-language support.',
          themeId: 'obsidian-gold',
          category: 'business',
          language: 'en',
          viewCount: 184,
          createdAt: Date.now(),
        })
        setLoading(false)
        return
      }

      // 3. Fetch from Firestore if not in store
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

  const isCreator = Boolean(user && card && user.uid === card.creatorId)

  function handleEdit() {
    router.push(`/create-visiting-card?edit=${slug}`)
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this visiting card? This action cannot be undone.')) {
      deleteVisitingCard(slug)
      showToast('Visiting card deleted successfully', 'info')
      router.push('/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507]">
        <div className="size-10 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
        <p className="mt-4 text-xs font-bold text-zinc-400">Loading Executive Visiting Card...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] p-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Visiting Card Not Found</h1>
        <p className="text-xs text-zinc-400 max-w-sm">
          The requested digital visiting card link may have been moved or deleted.
        </p>
        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] text-slate-950 font-black text-xs shadow-lg hover:brightness-110"
        >
          <Sparkles className="size-4" />
          <span>Create Your Digital Visiting Card</span>
        </Link>
      </div>
    )
  }

  const cleanUrl = typeof window !== 'undefined' ? window.location.href : `https://cardzy.online/v/${slug}`
  const waMsg = `Check out ${card.fullName}'s Digital Business Card on Cardzy: ${cleanUrl}`

  return (
    <div className="flex min-h-screen flex-col bg-[#050507] text-white">
      <SiteHeader />

      <main className="flex-1 py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-lg space-y-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>{t('backToHome') || 'Back to Cardzy'}</span>
            </Link>

            <Link
              href="/create-visiting-card"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D4AF37] hover:underline"
            >
              <Sparkles className="size-3.5" />
              <span>{t('createYours') || 'Create Yours'}</span>
            </Link>
          </div>

          {/* Owner Control Banner */}
          {isCreator && (
            <div className="rounded-2xl border border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-md backdrop-blur-md">
              <div>
                <p className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="size-4 text-[#D4AF37] animate-pulse" /> You Created This Card!
                </p>
                <p className="text-xs text-zinc-300">Manage, edit or share your digital business profile.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5 border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 text-[#D4AF37]"
                >
                  <Edit3 className="size-3.5" /> Edit Card
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  size="sm"
                  className="flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="size-3.5" /> Delete Card
                </Button>
              </div>
            </div>
          )}

          {/* Header Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-extrabold text-[#D4AF37]">
              <Cpu className="size-3.5 text-[#D4AF37]" /> {card.category || 'Executive NFC Profile'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
              <ShieldCheck className="size-3.5" /> Verified vCard
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
              <Eye className="size-3.5" /> {card.viewCount ?? 1} views
            </span>
          </div>

          {/* Main Visiting Card Surface */}
          <div className="py-2">
            <VisitingCardView ref={cardRef} data={card} showShareBtn={false} showQrCode={false} />
          </div>

          {/* Share & Download Section */}
          <div className="mt-8 rounded-3xl border border-[#D4AF37]/30 bg-[#0a0a0c] p-6 shadow-2xl flex flex-col items-center gap-6 backdrop-blur-xl">
            <div className="w-full text-center sm:text-left">
              <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                Share Visiting Card & Download Image
              </h3>
              <ShareBar url={cleanUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-vcard-${card.slug}`} />
            </div>

            {/* External Scannable & Downloadable QR Code Box */}
            <div className="w-full pt-4 border-t border-white/10 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Digital Profile QR Code (Outside Card)
              </span>
              <CardQrCode slug={slug} cardType="v" size={170} showDownloadBtn={true} />
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-8 rounded-3xl p-6 text-center border border-[#D4AF37]/30 bg-[#0a0a0c] shadow-lg space-y-2">
            <p className="text-lg font-extrabold text-white">Create Your Digital Business Card</p>
            <p className="text-xs font-medium text-zinc-400 max-w-sm mx-auto">
              Stand out with 3D flip cards, instant vCard contact downloads, and multi-language support.
            </p>
            <Link
              href="/create-visiting-card"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#E5C35A] px-6 py-2.5 text-xs font-black text-slate-950 shadow-lg hover:brightness-110 transition-all"
            >
              Build Your vCard <Sparkles className="size-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
