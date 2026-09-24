'use client'

import { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useJashn } from '@/lib/jashn/store'
import type { VisitingCard } from '@/lib/jashn/types'
import { shouldIncrementView, isSenderOrOwner } from '@/lib/jashn/view-tracker'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Sparkles, Eye, Edit3, Trash2, ShieldCheck, Cpu, Share2, X, Loader2, ArrowLeft, ExternalLink, MessageCircle, Smartphone, Copy, Check, QrCode } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { recordCardShare } from '@/lib/jashn/magic-service'

export default function VisitingCardPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user, visitingCards, getVisitingCard, incrementVisitingCardView, deleteVisitingCard, showToast } = useJashn()
  const { t } = useLang()
  const cardRef = useRef<HTMLDivElement>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  const [card, setCard] = useState<VisitingCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Sender preview: ONLY true if explicitly requested via query params (?mode=sender, ?preview=true, ?role=sender)
  // When copying clean link (/v/slug), both sender and receiver see the authentic receiver experience
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('preview') === 'true' ||
    searchParams.get('role') === 'sender'

  useEffect(() => {
    async function loadCard() {
      const storeCard = getVisitingCard(slug)
      if (storeCard) {
        setCard(storeCard)
        // Only increment view count if viewer is receiver (not sender/creator)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          if (shouldIncrementView(slug, 'vcard', storeCard.creatorId, searchParams, user?.uid)) {
            incrementVisitingCardView(slug)
            setCard((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
          }
        }
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

      const activeDb = getFirebaseDb() || db
      if (isFirebaseConfigured && activeDb) {
        try {
          const docRef = doc(activeDb, 'visitingCards', slug)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const fetchedCard = docSnap.data() as VisitingCard
            setCard(fetchedCard)
            // Only increment view count if viewer is receiver (not sender/creator)
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              if (shouldIncrementView(slug, 'vcard', fetchedCard.creatorId, searchParams, user?.uid)) {
                incrementVisitingCardView(slug)
                setCard((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
              }
            }
          }
        } catch (e) {
          console.error('Failed to load visiting card from Firestore:', e)
        }
      }
      setLoading(false)
    }

    loadCard()
  }, [slug, getVisitingCard, incrementVisitingCardView, searchParams, user?.uid])

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

  // Universal share methods for creator
  const handleDirectCopy = () => {
    recordCardShare('vcard', card.slug, 'copy')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    navigator.clipboard?.writeText(fullReceiverUrl)
    setCopiedLink(true)
    showToast(t('linkCopied', 'Clean vCard link copied! 📋'), 'success')
    setTimeout(() => setCopiedLink(false), 2200)
  }

  const handleDirectWhatsApp = () => {
    recordCardShare('vcard', card.slug, 'whatsapp')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    const text = encodeURIComponent(`💼 Here is my official Digital Business Card:\n${fullReceiverUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleDirectNativeShare = async () => {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        recordCardShare('vcard', card.slug, 'app')
        await navigator.share({
          title: card.fullName || 'Digital Business Card',
          text: `💼 Here is ${card.fullName}'s verified Digital Business Card:`,
          url: fullReceiverUrl,
        })
      } catch {
        // User cancelled
      }
    } else {
      handleDirectCopy()
    }
  }

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  if (isSenderMode) {
    return (
      <div className="py-6 px-4 pb-28 sm:pb-12">
        <div className="mx-auto max-w-2xl md:max-w-4xl text-center">
          {/* ── High-Converting Card Delivery & Quick Share Hero ── */}
          <div className="mb-6 rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 text-white p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black uppercase tracking-wider">
                <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
                <span>Your Smart vCard is Live! 💼</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Share Profile of <span className="text-[#D4AF37]">{card.fullName}</span>
              </h1>
              
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                Share your executive digital business profile with clients, partners, and contacts with 1 click.
              </p>

              {/* Primary 1-Click Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl pt-2">
                <Button
                  onClick={handleDirectWhatsApp}
                  className="h-12 rounded-2xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  <span>Send on WhatsApp</span>
                </Button>

                {typeof navigator !== 'undefined' && 'share' in navigator ? (
                  <Button
                    onClick={handleDirectNativeShare}
                    className="h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Share2 className="size-4 shrink-0" />
                    <span>Share via Apps</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowShareModal(true)}
                    className="h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <QrCode className="size-4 shrink-0" />
                    <span>QR Code & Image</span>
                  </Button>
                )}

                <Button
                  onClick={handleDirectCopy}
                  variant="outline"
                  className="h-12 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  {copiedLink ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 shrink-0" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </Button>
              </div>

              {/* Secondary Creator Options (Edit / Delete / Preview) */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-white/10 w-full text-xs">
                <Link
                  href={receiverUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition-colors border border-white/10"
                >
                  <ExternalLink className="size-3 text-amber-400" /> View Receiver Screen
                </Link>
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition-colors border border-white/10 cursor-pointer"
                >
                  <Edit3 className="size-3 text-amber-400" /> Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[11px] font-semibold transition-colors border border-red-500/20 cursor-pointer"
                >
                  <Trash2 className="size-3" /> Delete
                </button>
                <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1 ml-2">
                  <Eye className="size-3" /> {card.viewCount || 0} views
                </span>
              </div>
            </div>
          </div>

          {/* Badges & Views Info */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/80 px-4 py-1.5 text-xs font-extrabold text-amber-300 shadow-sm">
              <Cpu className="size-4 text-amber-400" /> {
                card.category === 'business' ? (t('catCorporate') || 'Corporate & Executive')
                : card.category === 'creative' ? (t('catTech') || 'Tech & Creative')
                : card.category === 'medical' ? (t('catMedical') || 'Medical & Healthcare')
                : card.category === 'legal' ? (t('catLegal') || 'Legal & Financial')
                : card.category === 'real-estate' ? (t('catRealEstate') || 'Real Estate & Property')
                : card.category === 'beauty' ? (t('catFashion') || 'Beauty & Fashion')
                : card.category === 'services' ? (t('catServices') || 'Professional Services')
                : (card.category || 'Executive Profile')
              }
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-900/80 px-4 py-1.5 text-xs font-extrabold text-emerald-300 shadow-sm">
              <ShieldCheck className="size-4 text-emerald-400" /> {t('verifiedVCard') || 'Verified Smart vCard'}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-1.5 text-xs font-extrabold text-slate-200 shadow-sm">
              <Eye className="size-4 text-emerald-400" /> {card.viewCount || 0} {t('viewsLabel') || 'views'}
            </span>
          </div>

          {/* Main Visiting Card Surface */}
          <div className="my-6 py-4 flex justify-center">
            <div className="w-full max-w-md">
              <VisitingCardView ref={cardRef} data={card} showShareBtn={false} showQrCode={false} />
            </div>
          </div>

          {/* Share & QR Code Panel */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center gap-6 text-left">
            <div className="w-full text-center sm:text-left">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t('shareReceiverLink') || 'Share Receiver Link With Contacts'}
              </h3>
              <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-vcard-${card.slug}`} />
            </div>

            <div className="w-full pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {t('receiverQrCode') || 'Receiver Shareable QR Code'}
              </span>
              <CardQrCode slug={slug} cardType="v" size={160} showDownloadBtn={true} />
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-8 rounded-2xl p-6 text-center border border-border bg-card shadow-sm">
            <p className="text-base font-bold mb-1 text-foreground">{t('createAnotherBusinessCard') || 'Create Another Digital Business Card'}</p>
            <Link
              href="/create-visiting-card"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
            >
              {t('buildYourVcard') || 'Create Visiting Card'} <Sparkles className="size-4" />
            </Link>
          </div>
        </div>

        {/* Sticky Mobile Share Bar for Sender Mode */}
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-[#D4AF37]/30 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
          <Button
            onClick={handleDirectWhatsApp}
            className="flex-1 h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>WhatsApp</span>
          </Button>
          <Button
            onClick={handleDirectCopy}
            variant="outline"
            className="h-11 px-3.5 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            {copiedLink ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            <span>{copiedLink ? 'Copied' : 'Copy'}</span>
          </Button>
          <Button
            onClick={() => setShowShareModal(true)}
            className="h-11 px-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e5c35a] text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
          >
            <Share2 className="size-4" />
            <span>Share</span>
          </Button>
        </div>

        {/* Floating Action Pill for Desktop SENDER */}
        <div className="hidden sm:flex fixed bottom-4 right-4 z-40 items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-bold shadow-xl border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Share Link & QR"
          >
            <Share2 className="size-3.5 text-amber-400" />
            <span>Share</span>
          </button>
        </div>

        {/* Universal Luxury Share Modal */}
        {showShareModal && (
          <CardShareModal
            card={{
              title: card.fullName || 'Digital Visiting Card',
              recipientOrCouple: card.fullName,
              type: 'vcard',
              slug: card.slug,
              url: `/v/${card.slug}`,
              viewsCount: card.viewCount || 0,
              shares: card.shares,
              occasion: card.company || card.title || 'Digital Business Profile',
              senderName: card.fullName,
              waMessage: waMsg,
              phone: card.phone,
              email: card.email,
              website: card.website,
              address: card.address,
            }}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative overflow-y-auto px-4 py-4 sm:py-6 bg-[#050507] text-white w-full select-none">
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
          <span>{t('makeYourOwn')}</span>
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
          <span>{t('shareVCard')}</span>
        </button>

        {/* Universal Luxury Share Modal */}
        {showShareModal && (
          <CardShareModal
            card={{
              title: card.fullName || 'Digital Visiting Card',
              recipientOrCouple: card.fullName,
              type: 'vcard',
              slug: card.slug,
              url: `/v/${card.slug}`,
              viewsCount: card.viewCount || 0,
              shares: card.shares,
              occasion: card.company || card.title || 'Digital Business Profile',
              senderName: card.fullName,
              waMessage: waMsg,
              phone: card.phone,
              email: card.email,
              website: card.website,
              address: card.address,
            }}
            onClose={() => setShowShareModal(false)}
          />
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
