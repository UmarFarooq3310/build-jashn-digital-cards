'use client'

import { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useJashn } from '@/lib/jashn/store'
import type { VisitingCard } from '@/lib/jashn/types'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Sparkles, Eye, Edit3, Trash2, ShieldCheck, Cpu, Share2, X, Loader2, ArrowLeft, ExternalLink } from 'lucide-react'
import { useLang } from '@/lib/lang/context'

export default function VisitingCardPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()
  const searchParams = useSearchParams()

  const { visitingCards, getVisitingCard, incrementVisitingCardView, deleteVisitingCard, showToast } = useJashn()
  const { t } = useLang()
  const cardRef = useRef<HTMLDivElement>(null)

  const [card, setCard] = useState<VisitingCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)

  // Check explicitly if the user opened the page in Sender Mode
  const isSenderMode = searchParams.get('mode') === 'sender' || searchParams.get('preview') === 'true' || searchParams.get('role') === 'sender'

  useEffect(() => {
    async function loadCard() {
      const storeCard = getVisitingCard(slug)
      if (storeCard) {
        setCard(storeCard)
        incrementVisitingCardView(slug)
        setLoading(false)
        return
      }

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] text-white">
        <Loader2 className="size-10 text-[#D4AF37] animate-spin" />
        <p className="mt-4 text-xs font-bold text-zinc-400">Loading Business Profile...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] p-6 text-center space-y-4 text-white">
        <h1 className="text-2xl font-bold text-[#D4AF37]">Visiting Card Not Found</h1>
        <p className="text-xs text-zinc-400 max-w-sm">
          The requested digital business profile link may have moved or expired.
        </p>
        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] text-slate-950 font-black text-xs shadow-lg hover:brightness-110"
        >
          <Sparkles className="size-4" />
          <span>Create Digital Business Card</span>
        </Link>
      </div>
    )
  }

  // Always share the CLEAN receiver URL without ?mode=sender
  const receiverUrl = `/v/${slug}`
  const waMsg = `Check out ${card.fullName}'s Digital Business Card on Cardzy: ${receiverUrl}`

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  if (isSenderMode) {
    return (
      <div className="flex min-h-screen flex-col bg-[#050507] text-white">
        <SiteHeader />

        <main className="flex-1 py-10 px-4 flex flex-col items-center">
          <div className="w-full max-w-lg space-y-6">
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

            {/* Creator Control Panel */}
            <div className="rounded-2xl border border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-md backdrop-blur-md">
              <div>
                <p className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="size-4 text-[#D4AF37] animate-pulse" /> You Created This vCard!
                </p>
                <p className="text-xs text-zinc-300">Manage, edit or share your digital business profile.</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Link
                  href={receiverUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs hover:bg-[#D4AF37]/30 transition-all"
                >
                  <ExternalLink className="size-3.5" /> View Receiver Screen
                </Link>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="text-xs flex items-center gap-1.5 border-zinc-300 bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold shadow-xs"
                >
                  <Edit3 className="size-3.5 text-black" />
                  <span className="text-black font-extrabold">Edit Card</span>
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  size="sm"
                  className="text-xs flex items-center gap-1.5 font-bold"
                >
                  <Trash2 className="size-3.5" /> Delete Card
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-extrabold text-[#D4AF37]">
                <Cpu className="size-3.5 text-[#D4AF37]" /> {card.category || 'Executive Profile'}
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
                  Share Receiver Link With Contacts
                </h3>
                <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-vcard-${card.slug}`} />
              </div>

              <div className="w-full pt-4 border-t border-white/10 flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Receiver Shareable QR Code
                </span>
                <CardQrCode slug={slug} cardType="v" size={170} showDownloadBtn={true} />
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-8 rounded-3xl p-6 text-center border border-[#D4AF37]/30 bg-[#0a0a0c] shadow-lg space-y-2">
              <p className="text-lg font-extrabold text-white">Create Another Business Card</p>
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

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative overflow-hidden px-4 py-4 sm:py-6 bg-[#050507] text-white w-full select-none">
      {/* Gold Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-lg flex items-center justify-between z-20 py-2 px-3.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <CardzyLogo className="size-7 transition-transform group-hover:scale-105" />
          <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#E5C35A] bg-clip-text text-transparent">
            Cardzy vCard
          </span>
        </Link>

        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] text-slate-950 px-3.5 py-1.5 text-xs font-black shadow-md hover:brightness-110 transition-all hover:scale-105"
        >
          <Sparkles className="size-3" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </header>

      {/* Receiver Screen Main Centered 3D Business Card */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center my-auto py-6 sm:py-10 z-10">
        <div className="w-full py-2 flex justify-center">
          <VisitingCardView ref={cardRef} data={card} showShareBtn={false} showQrCode={false} />
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-3 z-20 pb-2 text-center">
        <button
          onClick={() => setShowShareModal((o) => !o)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-zinc-900/90 hover:bg-zinc-800 text-[#D4AF37] font-extrabold py-2.5 px-6 text-xs sm:text-sm shadow-xl transition-all hover:scale-105"
        >
          <Share2 className="size-4" />
          <span>Share vCard</span>
        </button>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0c0c0f] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-sm w-full space-y-5 text-white relative shadow-2xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-lg text-[#D4AF37]">Share Visiting Card</h3>
                <p className="text-xs text-zinc-400">Share link or download scannable QR vCard</p>
              </div>

              <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-vcard-${card.slug}`} />

              <div className="pt-3 border-t border-white/10 flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">vCard Profile QR Code</span>
                <CardQrCode slug={slug} cardType="v" size={140} showDownloadBtn={true} />
              </div>
            </div>
          </div>
        )}

        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#D4AF37] transition-colors font-medium"
        >
          <Sparkles className="size-3 text-[#D4AF37]" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>
    </div>
  )
}
