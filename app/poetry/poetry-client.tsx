'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  Copy,
  Check,
  Share2,
  Sparkles,
  Heart,
  Download,
  BookOpen,
  Scroll,
  Feather,
  Filter,
  Tag,
  Layers,
  Loader2,
} from 'lucide-react'
import { POET_PROFILES, POPULAR_SEARCH_KEYWORDS, POETRY_DATABASE, Poem } from '@/lib/jashn/poetry-data'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

export function PoetryClient() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  const showToast = useJashn((s) => s.showToast)

  const [poems, setPoems] = useState<Poem[]>(() => POETRY_DATABASE)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPoet, setSelectedPoet] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'two_liner' | 'full_poem'>('all')
  const [visibleCount, setVisibleCount] = useState<number>(30)
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'original' | 'roman' | 'english' | 'urdu' | 'meaning'>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [isGeneratingFlyer, setIsGeneratingFlyer] = useState<string | null>(null)
  const [highlightedPoemId, setHighlightedPoemId] = useState<string | null>(null)

  // Load saved favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cardzy_poetry_favorites')
      if (saved) {
        setLikedIds(new Set(JSON.parse(saved)))
      }
    } catch {}
  }, [])

  // Sentinel ref for infinite scroll
  const observerTarget = useRef<HTMLDivElement | null>(null)


  // Language counts across entire 1,000 poem library
  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    poems.forEach((p) => {
      if (p.originalLanguage) {
        counts[p.originalLanguage] = (counts[p.originalLanguage] || 0) + 1
      }
    })
    return counts
  }, [poems])

  // Category counts based on active language filter (or all)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    const base = selectedLanguage === 'all'
      ? poems
      : poems.filter((p) => p.originalLanguage === selectedLanguage)

    base.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    })
    return counts
  }, [poems, selectedLanguage])

  // Cascading Poet list: shows ONLY poets who wrote in the currently selected language
  const poetList = useMemo(() => {
    const map = new Map<string, number>()
    const pool = selectedLanguage === 'all'
      ? poems
      : poems.filter((p) => p.originalLanguage === selectedLanguage)

    pool.forEach((p) => {
      if (p.poet) {
        const poet = p.poet.trim()
        map.set(poet, (map.get(poet) || 0) + 1)
      }
    })
    const sorted = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }))
    return [{ name: 'all', count: pool.length }, ...sorted]
  }, [poems, selectedLanguage])

  // Find active poet profile for spotlight
  const activePoetProfile = useMemo(() => {
    if (selectedPoet === 'all') return null
    return (
      POET_PROFILES[selectedPoet] ||
      Object.values(POET_PROFILES).find(
        (p) =>
          p.name.toLowerCase().includes(selectedPoet.toLowerCase()) ||
          selectedPoet.toLowerCase().includes(p.name.toLowerCase()) ||
          (p.nameUrdu && selectedPoet.includes(p.nameUrdu))
      ) || {
        name: selectedPoet,
        nameUrdu: poems.find((p) => p.poet.toLowerCase().includes(selectedPoet.toLowerCase()))?.poetUrdu || '',
        era: poems.find((p) => p.poet.toLowerCase().includes(selectedPoet.toLowerCase()))?.poetEra || 'Classical Master',
        origin: poems.find((p) => p.poet.toLowerCase().includes(selectedPoet.toLowerCase()))?.poetOrigin || 'World Literature',
        tagline: `Celebrated classical and modern verses composed by ${selectedPoet}.`,
        popularThemes: ['Poetry', 'Ghazal', 'Masterpiece', 'Wisdom'],
      }
    )
  }, [selectedPoet, poems])

  // Filter poems across the entire 1,000 dataset based on search, category, poet, language, and format
  const filteredPoems = useMemo(() => {
    return poems.filter((poem) => {
      const poetNorm = poem.poet.toLowerCase().trim()
      const poetUrduNorm = (poem.poetUrdu || '').trim()

      if (selectedPoet !== 'all') {
        const selLower = selectedPoet.toLowerCase()
        const matchesPoet =
          poetNorm === selLower ||
          poetNorm.includes(selLower) ||
          selLower.includes(poetNorm) ||
          (poetUrduNorm && (poetUrduNorm.includes(selectedPoet) || selectedPoet.includes(poetUrduNorm)))
        if (!matchesPoet) return false
      }

      if (selectedCategory !== 'all') {
        if (poem.category !== selectedCategory) return false
      }

      if (selectedLanguage !== 'all') {
        if (poem.originalLanguage !== selectedLanguage) return false
      }

      if (selectedFormat !== 'all') {
        if (poem.format !== selectedFormat) return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const textMatch =
          poem.originalText.toLowerCase().includes(q) ||
          poem.romanText.toLowerCase().includes(q) ||
          poem.englishTranslation.toLowerCase().includes(q) ||
          (poem.urduTranslation && poem.urduTranslation.toLowerCase().includes(q)) ||
          poem.title.toLowerCase().includes(q) ||
          poem.poet.toLowerCase().includes(q) ||
          (poem.poetUrdu && poem.poetUrdu.includes(q)) ||
          (poem.tags && poem.tags.some((tag) => tag.toLowerCase().includes(q)))

        if (!textMatch) return false
      }

      return true
    })
  }, [poems, searchQuery, selectedCategory, selectedPoet, selectedLanguage, selectedFormat])

  // Automatically reset visibleCount to 30 whenever any filter or search changes
  useEffect(() => {
    setVisibleCount(30)
  }, [searchQuery, selectedCategory, selectedPoet, selectedLanguage, selectedFormat])

  // Cascading Filter: If selected poet does not exist in the active language, reset poet to 'all'
  useEffect(() => {
    if (selectedPoet !== 'all') {
      const isAvailableInLang = poetList.some((p) => p.name === selectedPoet)
      if (!isAvailableInLang) {
        setSelectedPoet('all')
      }
    }
  }, [selectedLanguage, poetList, selectedPoet])

  // Infinite Scroll Observer: As the user scrolls down, automatically load more verses from the dataset
  useEffect(() => {
    const target = observerTarget.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => {
            if (prev < filteredPoems.length) {
              return Math.min(prev + 30, filteredPoems.length)
            }
            return prev
          })
        }
      },
      { root: null, rootMargin: '500px', threshold: 0.05 }
    )

    observer.observe(target)
    return () => {
      observer.disconnect()
    }
  }, [filteredPoems.length])

  // Handle URL deep link query params (?poem=... or ?poet=...)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const poemParam = params.get('poem')
    const poetParam = params.get('poet')
    const categoryParam = params.get('category')

    if (categoryParam) setSelectedCategory(categoryParam)
    if (poetParam) setSelectedPoet(poetParam)

    if (poemParam) {
      setHighlightedPoemId(poemParam)
      const foundPoem = poems.find((p) => p.id === poemParam)
      if (foundPoem) {
        trackPoetryActivity(foundPoem, 'view', 'direct_link')
      }
      setTimeout(() => {
        const el = document.getElementById(poemParam)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 350)
    }
  }, [poems])

  // Track poetry activity
  const trackPoetryActivity = (poem: Poem, action: 'view' | 'share' | 'copy' | 'flyer' | 'card_bridge', channel?: string) => {
    try {
      fetch('/api/poetry-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poemId: poem.id,
          poet: poem.poet,
          title: poem.title,
          action,
          channel: channel || 'web',
        }),
      }).catch(() => {})
    } catch (e) {}
  }

  // Helper to extract active language text, poet metadata, and years
  const getActiveVerseDetails = (poem: Poem, tabOverride?: 'original' | 'roman' | 'english' | 'urdu' | 'meaning') => {
    const currentTab =
      tabOverride ||
      activeTabMap[poem.id] ||
      (isUrdu && poem.originalLanguage !== 'ur' && poem.urduTranslation ? 'urdu' : 'original')

    let text = ''
    let isRtl = false
    let tabLabel = ''

    if (currentTab === 'original') {
      text = poem.originalText
      isRtl = poem.direction === 'rtl'
      tabLabel = poem.originalLanguage.toUpperCase()
    } else if (currentTab === 'urdu') {
      text = poem.urduTranslation || poem.originalText
      isRtl = true
      tabLabel = 'URDU'
    } else if (currentTab === 'roman') {
      text = poem.romanText || poem.originalText
      isRtl = false
      tabLabel = 'ROMAN URDU'
    } else if (currentTab === 'english') {
      text = poem.englishTranslation || poem.originalText
      isRtl = false
      tabLabel = 'ENGLISH'
    } else if (currentTab === 'meaning') {
      text = poem.meaning || poem.englishTranslation || poem.originalText
      isRtl = false
      tabLabel = 'MEANING'
    }

    const cleanLines = (text || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.includes('شعر نمبر') && !l.startsWith('—'))

    const cleanText = cleanLines.join('\n')

    const poetProfile =
      POET_PROFILES[poem.poet] ||
      Object.values(POET_PROFILES).find(
        (p) =>
          p.name.toLowerCase().includes(poem.poet.toLowerCase()) ||
          poem.poet.toLowerCase().includes(p.name.toLowerCase())
      )

    const poetEra = poem.poetEra || poetProfile?.era || ''

    const poetDisplayName = isRtl
      ? (poem.poetUrdu || poem.poet)
      : poem.poet

    return {
      currentTab,
      text: cleanText,
      lines: cleanLines,
      isRtl,
      tabLabel,
      poetDisplayName,
      poetFullName: `${poem.poet}${poem.poetUrdu ? ` (${poem.poetUrdu})` : ''}`,
      poetEra,
    }
  }

  // Copy Verse: Copies active selected language text, poet name, and website line till /poetry
  const handleCopy = (poem: Poem) => {
    const { text, poetDisplayName, currentTab } = getActiveVerseDetails(poem)
    const textToCopy = `${text}\n\n— ${poetDisplayName}\n\nhttps://cardzy.online/poetry`

    navigator.clipboard.writeText(textToCopy)
    setCopiedId(poem.id)
    trackPoetryActivity(poem, 'copy', `text_copy_${currentTab}`)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleToggleLike = (poem: Poem) => {
    const isCurrentlyLiked = likedIds.has(poem.id)
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (isCurrentlyLiked) next.delete(poem.id)
      else next.add(poem.id)
      try {
        localStorage.setItem('cardzy_poetry_favorites', JSON.stringify(Array.from(next)))
      } catch {}
      return next
    })

    // Sync to Firestore backend via /api/poetry-activity
    try {
      fetch('/api/poetry-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poemId: poem.id,
          poet: poem.poet,
          title: poem.title,
          action: isCurrentlyLiked ? 'unlike' : 'like',
        }),
      }).catch(() => {})
    } catch {}
  }

  // WhatsApp Share: Shares active selected language text, poet name, and website link exactly once
  const handleWhatsAppShare = (poem: Poem) => {
    const { text, poetDisplayName, currentTab } = getActiveVerseDetails(poem)
    trackPoetryActivity(poem, 'share', `whatsapp_${currentTab}`)
    const shareText = encodeURIComponent(
      `${text}\n\n— ${poetDisplayName}\n\nhttps://cardzy.online/poetry`
    )
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank')
  }

  // SMS / Native Share: For native Web Share API (mobile), provide clean verse text so WhatsApp/apps do not duplicate url
  const handleSmsOrNativeShare = async (poem: Poem) => {
    const { text, poetDisplayName, currentTab } = getActiveVerseDetails(poem)
    trackPoetryActivity(poem, 'share', `sms_native_${currentTab}`)
    const poetryUrl = 'https://cardzy.online/poetry'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        // Passing the URL only in 'url' (not repeated in text) prevents WhatsApp and Android/iOS share sheet from showing the link twice
        await navigator.share({
          title: `${poem.title} — ${poetDisplayName}`,
          text: `${text}\n\n— ${poetDisplayName}`,
          url: poetryUrl,
        })
        return
      } catch (e) {}
    }

    // Fallback to SMS protocol (SMS does not take separate url, so single link in body)
    const smsBody = encodeURIComponent(`${text}\n\n— ${poetDisplayName}\n\n${poetryUrl}`)
    window.open(`sms:?&body=${smsBody}`, '_self')
  }

  // Generate Tailored, Dynamic-Height Story Flyer in the Active Card Language
  const handleDownloadFlyer = async (poem: Poem) => {
    setIsGeneratingFlyer(poem.id)
    const { text, lines, isRtl, poetDisplayName, poetEra, currentTab } = getActiveVerseDetails(poem)
    trackPoetryActivity(poem, 'flyer', `canvas_png_${currentTab}`)

    // Show initial loading feedback for mobile and desktop users
    showToast(
      isUrdu
        ? 'کارڈ تیار کیا جا رہا ہے... برائے مہربانی ایک لمحہ انتظار فرمائیں ⏳'
        : 'Generating high-resolution card... please wait a moment ⏳',
      'info'
    )

    try {
      if (typeof document !== 'undefined' && document.fonts) {
        try {
          await document.fonts.ready
        } catch (e) {}
      }

      const canvas = document.createElement('canvas')
      canvas.width = 1080
      const tempCtx = canvas.getContext('2d')
      if (!tempCtx) return

      // Measure & wrap verse lines cleanly with comfortable margins
      const maxWidth = isRtl ? 820 : 840
      const fontDeclaration = isRtl
        ? 'bold 32px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", "Traditional Arabic", serif'
        : 'italic bold 28px "Georgia", "Times New Roman", serif'

      tempCtx.font = fontDeclaration

      const wrappedLines: string[] = []
      lines.forEach((origLine) => {
        const words = origLine.split(' ')
        let currentLine = ''
        for (let w = 0; w < words.length; w++) {
          const testLine = currentLine ? currentLine + ' ' + words[w] : words[w]
          if (tempCtx.measureText(testLine).width > maxWidth && currentLine) {
            wrappedLines.push(currentLine)
            currentLine = words[w]
          } else {
            currentLine = testLine
          }
        }
        if (currentLine) {
          wrappedLines.push(currentLine)
        }
      })

      // Generous line height (86px for Urdu to prevent dots and descenders colliding, 52px for English)
      const lineHeight = isRtl ? 86 : 52
      const verseBoxHeight = Math.max(isRtl ? 190 : 160, wrappedLines.length * lineHeight + (isRtl ? 80 : 60))
      
      const headerHeight = poetEra ? 215 : 185
      const footerHeight = 110
      const calculatedHeight = Math.max(580, headerHeight + verseBoxHeight + footerHeight)

      // Set exact dynamic canvas height to eliminate unnecessary empty space
      canvas.height = calculatedHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 1. Luxury Dark Emerald & Gold Obsidian Gradient
      const gradient = ctx.createLinearGradient(0, 0, 1080, canvas.height)
      gradient.addColorStop(0, '#051f15')
      gradient.addColorStop(0.4, '#02120b')
      gradient.addColorStop(0.75, '#04161d')
      gradient.addColorStop(1, '#080f18')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1080, canvas.height)

      // 2. Ornate Double Gold Borders
      ctx.lineWidth = 8
      ctx.strokeStyle = '#d97706'
      ctx.strokeRect(28, 28, 1024, canvas.height - 56)

      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#fef08a'
      ctx.strokeRect(40, 40, 1000, canvas.height - 80)

      // 3. Corner Rosettes
      ctx.fillStyle = '#fbbf24'
      ctx.font = '24px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦ ❖ ✦', 110, 75)
      ctx.fillText('✦ ❖ ✦', 970, 75)
      ctx.fillText('✦ ❖ ✦', 110, canvas.height - 55)
      ctx.fillText('✦ ❖ ✦', 970, canvas.height - 55)

      // 4. Top Header: Poet Name & Years (From - To)
      let topY = 90
      ctx.fillStyle = '#fde68a'
      ctx.font = isRtl
        ? 'bold 34px "Noto Nastaliq Urdu", "Traditional Arabic", serif'
        : 'bold 32px "Georgia", "Times New Roman", serif'
      ctx.fillText(poetDisplayName, 540, topY)

      if (poetEra) {
        topY += 38
        ctx.fillStyle = '#94a3b8'
        ctx.font = 'bold 18px sans-serif'
        ctx.fillText(`(${poetEra})`, 540, topY)
      }

      topY += 32
      ctx.fillStyle = '#6ee7b7'
      ctx.font = 'bold 15px sans-serif'
      const catLabel = (poem.categoryLabel || 'Masterpiece').toUpperCase()
      // Clean category title without language or roman badges
      ctx.fillText(`✦ ${catLabel} ✦`, 540, topY)

      topY += 22
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(220, topY)
      ctx.lineTo(860, topY)
      ctx.stroke()

      // 5. Middle Section: Verse Container Box
      const boxTop = topY + 22
      const boxWidth = 940
      const boxLeft = 70

      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'
      ctx.fillRect(boxLeft, boxTop, boxWidth, verseBoxHeight)
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)'
      ctx.lineWidth = 1.5
      ctx.strokeRect(boxLeft, boxTop, boxWidth, verseBoxHeight)

      // Draw Verse Lines with middle baseline alignment to prevent glyph cutoffs
      ctx.fillStyle = '#ffffff'
      ctx.font = fontDeclaration
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      let verseY = boxTop + (isRtl ? 45 : 35) + (lineHeight / 2)
      wrappedLines.forEach((line) => {
        ctx.fillText(line.trim(), 540, verseY)
        verseY += lineHeight
      })

      // 6. Bottom Footer: Website Attribution Line
      const footerY = boxTop + verseBoxHeight + 35
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)'
      ctx.beginPath()
      ctx.moveTo(260, footerY)
      ctx.lineTo(820, footerY)
      ctx.stroke()

      ctx.fillStyle = '#fef08a'
      ctx.font = 'bold 18px sans-serif'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦ Powered by Cardzy.online ✦', 540, footerY + 30)

      // Clean file naming and trigger direct image download
      const sanitizedTitle = (poem.title || 'poetry').toLowerCase().replace(/[^a-z0-9]/g, '-')
      const imageURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `Cardzy-${sanitizedTitle}.png`
      link.href = imageURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showToast(
        isUrdu
          ? 'کارڈ کامیابی کے ساتھ تیار اور ڈاؤن لوڈ ہو گیا! اپنی گیلری یا فائلز میں دیکھیں۔ 🎨'
          : 'Card downloaded successfully! Check your photos or downloads 🎨',
        'success'
      )
    } catch (err) {
      console.error('Flyer download error:', err)
      showToast(
        isUrdu
          ? 'کارڈ بنانے میں خرابی۔ برائے مہربانی دوبارہ کوشش کریں۔'
          : 'Failed to generate card. Please try again.',
        'error'
      )
    } finally {
      setIsGeneratingFlyer(null)
    }
  }

  // Category list localized with exact library counts
  const categoriesList = useMemo(() => [
    { id: 'all', label: isUrdu ? `تمام موضوعات (${poems.length})` : `All Themes (${poems.length})`, icon: '✨' },
    { id: 'ishq', label: isUrdu ? `عشق و محبت (${categoryCounts['ishq'] || 0})` : `Love & Romance (${categoryCounts['ishq'] || 0})`, icon: '💖' },
    { id: 'wedding', label: isUrdu ? `شادی و نکاح (${categoryCounts['wedding'] || 0})` : `Wedding & Nikkah (${categoryCounts['wedding'] || 0})`, icon: '💍' },
    { id: 'khudi', label: isUrdu ? `خودی و حوصلہ (${categoryCounts['khudi'] || 0})` : `Motivation & Khudi (${categoryCounts['khudi'] || 0})`, icon: '🦅' },
    { id: 'sufi', label: isUrdu ? `تصوف و روحانیت (${categoryCounts['sufi'] || 0})` : `Sufi & Spiritual (${categoryCounts['sufi'] || 0})`, icon: '🕊️' },
    { id: 'birthday', label: isUrdu ? `سالگرہ و سنگ میل (${categoryCounts['birthday'] || 0})` : `Birthday & Milestones (${categoryCounts['birthday'] || 0})`, icon: '🎂' },
    { id: 'dosti', label: isUrdu ? `دوستی و وفا (${categoryCounts['dosti'] || 0})` : `Friendship & Dosti (${categoryCounts['dosti'] || 0})`, icon: '🤝' },
    { id: 'dua', label: isUrdu ? `دعائیں و برکت (${categoryCounts['dua'] || 0})` : `Dua & Blessings (${categoryCounts['dua'] || 0})`, icon: '🤲' },
    { id: 'wisdom', label: isUrdu ? `حکمت و دانائی (${categoryCounts['wisdom'] || 0})` : `Wisdom & Life (${categoryCounts['wisdom'] || 0})`, icon: '📜' },
    { id: 'gham', label: isUrdu ? `اداسی و درد (${categoryCounts['gham'] || 0})` : `Sad & Melancholy (${categoryCounts['gham'] || 0})`, icon: '🥀' },
  ], [isUrdu, poems.length, categoryCounts])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-inner">
            <Feather className="size-4 animate-pulse text-amber-400" />
            <span>
              {isUrdu
                ? 'گنجینۂ کلاسیکی و جدید شاعری'
                : 'Treasury of Classical & Modern World Poetry'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {isUrdu ? 'گنجینۂ شاعری و کلام' : 'Poetry & Shayari Treasury'}
            </span>
            <span className={cn("mt-2 block text-xl sm:text-3xl text-emerald-300 tracking-normal", isUrdu ? "font-urdu" : "")}>
              {isUrdu
                ? 'منتخب کلام، اشعار و خوبصورت پیغامات'
                : 'Timeless Masterpieces from Legendary World Poets'}
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isUrdu
              ? 'علامہ اقبال، مرزا غالب، فیض، جون ایلیا، احمد فراز، پروین شاکر، رومی، شیکسپیئر اور محمود درویش کے مستند کلام کو تلاش کریں۔ 1-کلک میں کارڈز اور انویٹیشنز میں استعمال کریں!'
              : 'Discover verified verses from Allama Iqbal, Mirza Ghalib, Faiz, Jaun Elia, Rumi, Shakespeare, Mahmoud Darwish, and more. Use in 1-click on your 3D Wish Cards & Wedding Invitations!'}
          </p>

          {/* Quick Statistics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Sparkles className="size-3.5 text-amber-400" />
              <span><strong>100% Free</strong> Global Public Domain Poetry</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Scroll className="size-3.5 text-emerald-400" />
              <span><strong>25+ Legendary</strong> World Poets</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <BookOpen className="size-3.5 text-blue-400" />
              <span><strong>10 Curated</strong> Themes & Moods</span>
            </div>
          </div>

          {/* --- SEARCH BAR --- */}
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-4 sm:size-5 text-amber-400/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isUrdu
                    ? 'کوئی بھی شعر، شاعر (اقبال، غالب، رومی) یا موضوع تلاش کریں...'
                    : 'Search any verse, line, poet (Iqbal, Ghalib, Rumi, Shakespeare), or theme...'
                }
                className="w-full pl-11 pr-16 py-3 sm:py-3.5 rounded-2xl bg-slate-900/95 border border-amber-500/40 text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded-lg border border-slate-700 cursor-pointer"
                >
                  {isUrdu ? 'صاف کریں' : 'Clear'}
                </button>
              )}
            </div>

            {/* Popular 1-Tap Search Keywords */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center text-xs">
              <span className="text-slate-400 font-medium mr-1 flex items-center gap-1 text-[11px]">
                <Tag className="size-3 text-amber-400" /> {isUrdu ? 'فوری تلاش:' : 'Quick Search:'}
              </span>
              {POPULAR_SEARCH_KEYWORDS.map((kw) => (
                <button
                  key={kw.label}
                  type="button"
                  onClick={() => setSearchQuery(kw.query)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer",
                    searchQuery.toLowerCase() === kw.query.toLowerCase()
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800"
                  )}
                >
                  {kw.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FILTER CONTROLS (Sticky 4-Dropdown Clean Grid, Mobile-Optimized Text) --- */}
      <section className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 py-2 sm:py-3 px-2 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {/* 1. Language Dropdown */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <label className="text-[10px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-1">
                <span>🌐</span> <span>{isUrdu ? 'زبان' : 'Language'}</span>
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full text-[11px] sm:text-xs font-semibold rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-2 py-1.5 sm:px-2.5 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                <option value="all">
                  {isUrdu ? `🌐 تمام زبانیں (${poems.length})` : `🌐 All (${poems.length})`}
                </option>
                <option value="ur">
                  {isUrdu ? `🇵🇰 اردو (${languageCounts['ur'] || 0})` : `🇵🇰 Urdu (${languageCounts['ur'] || 0})`}
                </option>
                <option value="pa">
                  {isUrdu ? `🌾 پنجابی (${languageCounts['pa'] || 0})` : `🌾 Punjabi (${languageCounts['pa'] || 0})`}
                </option>
                <option value="fa">
                  {isUrdu ? `🇮🇷 فارسی (${languageCounts['fa'] || 0})` : `🇮🇷 Persian (${languageCounts['fa'] || 0})`}
                </option>
                <option value="ar">
                  {isUrdu ? `🇸🇦 عربی (${languageCounts['ar'] || 0})` : `🇸🇦 Arabic (${languageCounts['ar'] || 0})`}
                </option>
                <option value="en">
                  🇬🇧 English ({languageCounts['en'] || 0})
                </option>
                <option value="es">
                  {isUrdu ? `🇪🇸 ہسپانوی (${languageCounts['es'] || 0})` : `🇪🇸 Spanish (${languageCounts['es'] || 0})`}
                </option>
              </select>
            </div>

            {/* 2. Poet Dropdown (Cascading: Filters based on active language) */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <label className="text-[10px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-1">
                <Feather className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'شاعر' : 'Poet'}</span>
              </label>
              <select
                value={selectedPoet}
                onChange={(e) => setSelectedPoet(e.target.value)}
                className="w-full text-[11px] sm:text-xs font-semibold rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-2 py-1.5 sm:px-2.5 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                <option value="all">
                  {selectedLanguage === 'all'
                    ? (isUrdu ? `⭐ تمام شعراء (${poetList[0]?.count || poems.length})` : `⭐ All Poets (${poetList[0]?.count || poems.length})`)
                    : selectedLanguage === 'pa'
                    ? (isUrdu ? `⭐ پنجابی شعراء (${poetList[0]?.count || 0})` : `⭐ Punjabi Poets (${poetList[0]?.count || 0})`)
                    : selectedLanguage === 'ur'
                    ? (isUrdu ? `⭐ اردو شعراء (${poetList[0]?.count || 0})` : `⭐ Urdu Poets (${poetList[0]?.count || 0})`)
                    : selectedLanguage === 'fa'
                    ? (isUrdu ? `⭐ فارسی شعراء (${poetList[0]?.count || 0})` : `⭐ Persian Poets (${poetList[0]?.count || 0})`)
                    : selectedLanguage === 'ar'
                    ? (isUrdu ? `⭐ عربی شعراء (${poetList[0]?.count || 0})` : `⭐ Arabic Poets (${poetList[0]?.count || 0})`)
                    : selectedLanguage === 'en'
                    ? `⭐ English Poets (${poetList[0]?.count || 0})`
                    : (isUrdu ? `⭐ ہسپانوی شعراء (${poetList[0]?.count || 0})` : `⭐ Spanish Poets (${poetList[0]?.count || 0})`)}
                </option>
                {poetList
                  .filter((p) => p.name !== 'all')
                  .map(({ name, count }) => (
                    <option key={name} value={name}>
                      {name} ({count})
                    </option>
                  ))}
              </select>
            </div>

            {/* 3. Theme / Category Dropdown */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <label className="text-[10px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-1">
                <Filter className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'موضوع' : 'Theme'}</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-[11px] sm:text-xs font-semibold rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-2 py-1.5 sm:px-2.5 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Format Dropdown */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <label className="text-[10px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-1">
                <Layers className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'طرز' : 'Format'}</span>
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="w-full text-[11px] sm:text-xs font-semibold rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-2 py-1.5 sm:px-2.5 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                <option value="all">{isUrdu ? '📜 تمام طرز' : '📜 All Formats'}</option>
                <option value="two_liner">{isUrdu ? '📜 دو سطری اشعار' : '📜 2-Line Ash’aar'}</option>
                <option value="full_poem">{isUrdu ? '📖 مکمل کلام' : '📖 Full Poems'}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* --- POET PROFILE SPOTLIGHT --- */}
      {selectedPoet !== 'all' && activePoetProfile && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/95 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                  {activePoetProfile.name}
                </h2>
                {activePoetProfile.nameUrdu && (
                  <span className="text-lg sm:text-xl font-urdu font-black text-emerald-400">
                    {activePoetProfile.nameUrdu}
                  </span>
                )}
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                  {activePoetProfile.era} · {activePoetProfile.origin}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed max-w-3xl">
                {activePoetProfile.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {activePoetProfile.popularThemes?.map((theme) => (
                <span key={theme} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  #{theme}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- POETRY GRID --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 flex-wrap">
            <span>
              {isUrdu ? 'دکھائے جا رہے ہیں' : 'Showing'}{' '}
              <strong className="text-amber-400 font-black text-base">{Math.min(visibleCount, filteredPoems.length)}</strong>{' '}
              {isUrdu ? 'از' : 'of'}{' '}
              <strong className="text-amber-400 font-black text-base">{filteredPoems.length}</strong>{' '}
              {isUrdu ? 'شاہکار اشعار' : 'masterpiece verses'}{' '}
              <span className="text-slate-400 text-xs font-normal">
                ({isUrdu ? 'مکمل 1000 کے گنجینہ سے' : 'from 1,000 total library'})
              </span>
            </span>
            {selectedPoet !== 'all' && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold">
                by {selectedPoet}
              </span>
            )}
            {selectedLanguage !== 'all' && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                {selectedLanguage}
              </span>
            )}
          </div>
          {(selectedCategory !== 'all' || selectedPoet !== 'all' || selectedLanguage !== 'all' || selectedFormat !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedPoet('all')
                setSelectedLanguage('all')
                setSelectedFormat('all')
                setSearchQuery('')
              }}
              className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>↺</span>
              <span>{isUrdu ? 'تمام فلٹرز ختم کریں' : 'Reset All Filters'}</span>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 flex flex-col items-center justify-center gap-3">
            <div className="size-10 rounded-full border-3 border-amber-500/20 border-t-amber-400 animate-spin" />
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-200">
                {isUrdu ? 'گنجینۂ شاعری سے کلام لوڈ ہو رہا ہے...' : 'Loading Poetry Treasury from Cloud...'}
              </h3>
            </div>
          </div>
        ) : filteredPoems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-6">
            <Scroll className="size-10 text-amber-400/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">
              {isUrdu ? 'کوئی کلام نہیں ملا' : 'No verses found matching your criteria'}
            </h3>
            <p className="text-slate-400 text-xs mt-1.5 max-w-md mx-auto">
              {isUrdu
                ? 'کسی دوسرے شاعر یا موضوع کو تلاش کریں، یا تمام فلٹرز ختم کریں۔'
                : 'Try searching with another poet name like "Iqbal" or "Ghalib", or reset your filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedPoet('all')
                setSelectedLanguage('all')
                setSelectedFormat('all')
                setSearchQuery('')
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors cursor-pointer"
            >
              {isUrdu ? 'تمام کلام دیکھیں' : 'View All Verses'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredPoems.slice(0, visibleCount).map((poem) => {
                const currentTab = activeTabMap[poem.id] || (isUrdu && poem.originalLanguage !== 'ur' && poem.urduTranslation ? 'urdu' : 'original')
                const isLiked = likedIds.has(poem.id)
                const isCopied = copiedId === poem.id
                const isHighlighted = highlightedPoemId === poem.id

                return (
                  <article
                    key={poem.id}
                    id={poem.id}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-3xl bg-slate-900/80 border p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 backdrop-blur-xs overflow-hidden break-words",
                      isHighlighted
                        ? "border-amber-400 ring-2 ring-amber-400/40 shadow-amber-500/10"
                        : "border-slate-800/90 hover:border-amber-500/40"
                    )}
                  >
                    {/* Top Metadata Header */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                              {poem.categoryLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                              {poem.originalLanguage}
                            </span>
                            {poem.poetOrigin && (
                              <span className="text-[10px] text-emerald-400/80 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40 truncate max-w-[120px]">
                                {poem.poetOrigin}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-slate-100 mt-1.5 group-hover:text-amber-300 transition-colors truncate">
                            {poem.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                            <span>By <strong>{poem.poet}</strong></span>
                            {poem.poetUrdu && (
                              <span className="text-emerald-400 font-urdu text-xs font-bold">{poem.poetUrdu}</span>
                            )}
                          </p>
                        </div>

                        {/* Top Action Buttons (Share to Default App, Save to Favorites) */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSmsOrNativeShare(poem)}
                            title="Share via default app"
                            className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                            aria-label="Share verse to default app"
                          >
                            <Share2 className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleLike(poem)}
                            title="Save to favorites"
                            className={cn(
                              'p-1.5 rounded-full transition-colors cursor-pointer',
                              isLiked
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400'
                            )}
                            aria-label="Save poem"
                          >
                            <Heart className={cn('size-3.5', isLiked && 'fill-rose-400')} />
                          </button>
                        </div>
                      </div>

                      {/* Language Switcher Tabs per poem */}
                      {(() => {
                        const pLang = poem.originalLanguage
                        let tabs: { id: 'original' | 'roman' | 'english' | 'urdu' | 'meaning'; label: string }[] = []
                        if (pLang === 'en') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (English)' : '🇬🇧 English' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : '🇵🇰 Urdu Translation' },
                            { id: 'meaning', label: isUrdu ? 'مفہوم' : '💡 Meaning' },
                          ]
                        } else if (pLang === 'ur') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (اردو)' : '🇵🇰 Urdu (Original)' },
                            { id: 'roman', label: isUrdu ? 'رومن اردو' : '📖 Roman Urdu' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : '🇬🇧 English Translation' },
                          ]
                        } else if (pLang === 'pa') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (پنجابی)' : '🌾 Punjabi' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : '🇵🇰 Urdu' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : '🇬🇧 English' },
                          ]
                        } else if (pLang === 'fa') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (فارسی)' : '🇮🇷 Persian' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : '🇵🇰 Urdu' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : '🇬🇧 English' },
                          ]
                        } else if (pLang === 'ar') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (عربی)' : '🇸🇦 Arabic' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : '🇵🇰 Urdu' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : '🇬🇧 English' },
                          ]
                        } else if (pLang === 'es') {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام (Español)' : '🇪🇸 Spanish' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : '🇬🇧 English' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : '🇵🇰 Urdu' },
                          ]
                        } else {
                          tabs = [
                            { id: 'original', label: isUrdu ? 'اصل کلام' : 'Original' },
                            { id: 'urdu', label: isUrdu ? 'اردو ترجمہ' : 'Urdu' },
                            { id: 'english', label: isUrdu ? 'انگریزی ترجمہ' : 'English' },
                          ]
                        }

                        return (
                          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-3 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTabMap((prev) => ({ ...prev, [poem.id]: tab.id }))}
                                className={cn(
                                  'shrink-0 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap cursor-pointer shadow-2xs',
                                  currentTab === tab.id
                                    ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                                    : 'text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800'
                                )}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        )
                      })()}

                      {/* Main Verse Content Area */}
                      <div className="min-h-[150px] flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/60 border border-slate-800/80 relative overflow-hidden">
                        <div className="absolute right-3 bottom-2 opacity-5 text-5xl select-none font-serif text-amber-300 pointer-events-none">
                          ❦
                        </div>

                        {/* --- 1. ORIGINAL SCRIPT VIEW --- */}
                        {currentTab === 'original' && (
                          <div className="w-full flex flex-col justify-between flex-1">
                            <div className={cn("space-y-2.5 w-full", poem.direction === 'rtl' ? "text-right" : "text-left")}>
                              {poem.originalText
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p
                                  key={idx}
                                  className={cn(
                                    "leading-relaxed break-words",
                                    poem.direction === 'rtl'
                                      ? "font-urdu text-lg sm:text-xl text-amber-100"
                                      : "font-serif text-sm sm:text-base text-slate-100 italic"
                                  )}
                                  dir={poem.direction}
                                >
                                  {line}
                                </p>
                              ))}
                            </div>

                            {/* Poet Attribution */}
                            <div
                              className={cn(
                                "mt-4 pt-2.5 border-t border-amber-500/20 flex items-center gap-2",
                                poem.direction === 'rtl' ? "justify-end text-right" : "justify-start text-left"
                              )}
                              dir={poem.direction}
                            >
                              {poem.direction === 'rtl' ? (
                                <>
                                  <span className="text-[11px] text-slate-400">({poem.poetOrigin || poem.poet})</span>
                                  <span className="font-urdu text-sm sm:text-base font-extrabold text-amber-300">
                                    — {poem.poetUrdu}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="font-serif text-xs sm:text-sm font-bold text-amber-300">
                                    — {poem.poet}
                                  </span>
                                  <span className="text-[11px] text-slate-400">({poem.poetOrigin || poem.poetEra})</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 2. URDU TRANSLATION VIEW --- */}
                        {currentTab === 'urdu' && (
                          <div className="w-full flex flex-col justify-between flex-1 text-right" dir="rtl">
                            <div className="space-y-2.5 w-full text-right">
                              {(poem.urduTranslation || poem.originalText)
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p key={idx} className="font-urdu text-lg sm:text-xl text-amber-100 leading-relaxed break-words">
                                  {line}
                                </p>
                              ))}
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-amber-500/20 flex items-center justify-end gap-2 text-right">
                              <span className="text-[11px] text-slate-400">({poem.poet})</span>
                              <span className="font-urdu text-sm sm:text-base font-extrabold text-amber-300">
                                — {poem.poetUrdu}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* --- 3. ROMAN URDU VIEW --- */}
                        {currentTab === 'roman' && (
                          <div className="w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full">
                              {poem.romanText
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p key={idx} className="text-xs sm:text-sm text-slate-200 font-medium italic break-words">
                                  {line.split(' — ')[0]}
                                </p>
                              ))}
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span className="font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span className="text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 4. ENGLISH TRANSLATION VIEW --- */}
                        {currentTab === 'english' && (
                          <div className="w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full">
                              {poem.englishTranslation.split('\n').map((line, idx) => (
                                <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans break-words">
                                  {line}
                                </p>
                              ))}
                              {poem.meaning && (
                                <p className="text-[11px] text-amber-400/90 mt-2 pt-1.5 border-t border-slate-800">
                                  💡 <strong>Context:</strong> {poem.meaning}
                                </p>
                              )}
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span className="font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span className="text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 5. CONTEXT & MEANING VIEW --- */}
                        {currentTab === 'meaning' && (
                          <div className="w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full">
                              <p className="text-xs sm:text-sm text-amber-200/95 leading-relaxed font-sans break-words">
                                {poem.meaning || poem.englishTranslation}
                              </p>
                              {poem.tags && poem.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1.5">
                                  {poem.tags.map((t, idx) => (
                                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span className="font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span className="text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col gap-2.5">
                      {/* Direct Actions: Copy, WhatsApp, SMS/Share, Flyer */}
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleCopy(poem)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                            title="Copy active verse and poet name"
                          >
                            {isCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-amber-400" />}
                            <span>{isCopied ? (isUrdu ? 'کاپی ہوگیا!' : 'Copied!') : (isUrdu ? 'کاپی' : 'Copy')}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWhatsAppShare(poem)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-xs font-semibold transition-colors cursor-pointer"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="size-3.5" />
                            <span>WhatsApp</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSmsOrNativeShare(poem)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800/40 text-xs font-semibold transition-colors cursor-pointer"
                            title="Share via SMS / Native share"
                          >
                            <span className="text-xs">💬</span>
                            <span>{isUrdu ? 'پیغام' : 'SMS'}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownloadFlyer(poem)}
                          disabled={isGeneratingFlyer === poem.id}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shrink-0",
                            isGeneratingFlyer === poem.id
                              ? "bg-amber-500/25 text-amber-200 border-amber-400/50 cursor-wait animate-pulse shadow-sm shadow-amber-500/20"
                              : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 cursor-pointer active:scale-95"
                          )}
                          title={isUrdu ? 'کارڈ ڈاؤن لوڈ کریں' : 'Download High-Resolution Story Card'}
                        >
                          {isGeneratingFlyer === poem.id ? (
                            <>
                              <Loader2 className="size-3.5 animate-spin text-amber-300" />
                              <span>{isUrdu ? 'کارڈ بن رہا ہے...' : 'Generating Card...'}</span>
                            </>
                          ) : (
                            <>
                              <Download className="size-3.5" />
                              <span>{isUrdu ? 'کارڈ ڈاؤنلوڈ' : 'Story Card'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* 1-Click Cardzy Bridge Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-0.5">
                        {poem.recommendedCardType === 'invitation' ? (
                          <>
                            <Link
                              href="/create-invitation"
                              onClick={() => {
                                try {
                                  sessionStorage.setItem('cardzy_prefill_msg', poem.cardPrefillMsg)
                                } catch {}
                                trackPoetryActivity(poem, 'card_bridge', 'wedding_invitation')
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-bold shadow-xs transition-all"
                            >
                              <Scroll className="size-3.5 text-amber-300" />
                              <span>{isUrdu ? 'شادی دعوت نامہ بنائیں' : 'Use in Wedding Invite'}</span>
                            </Link>
                            <Link
                              href="/create-magic-link"
                              onClick={() => {
                                try {
                                  sessionStorage.setItem('cardzy_prefill_msg', poem.cardPrefillMsg)
                                } catch {}
                                trackPoetryActivity(poem, 'card_bridge', 'magic_link')
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-900 to-amber-900 hover:from-rose-800 hover:to-amber-800 text-white text-xs font-bold shadow-xs transition-all"
                            >
                              <Sparkles className="size-3.5 text-amber-300" />
                              <span>{isUrdu ? '3D میجک لنک' : '3D Magic Link 🪄'}</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/create-wish"
                              onClick={() => {
                                try {
                                  sessionStorage.setItem('cardzy_prefill_msg', poem.cardPrefillMsg)
                                } catch {}
                                trackPoetryActivity(poem, 'card_bridge', 'wish_card')
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold shadow-xs transition-all"
                            >
                              <Heart className="size-3.5 fill-slate-950" />
                              <span>{isUrdu ? '3D وش کارڈ بنائیں' : 'Create 3D Wish Card'}</span>
                            </Link>
                            <Link
                              href="/create-magic-link"
                              onClick={() => {
                                try {
                                  sessionStorage.setItem('cardzy_prefill_msg', poem.cardPrefillMsg)
                                } catch {}
                                trackPoetryActivity(poem, 'card_bridge', 'magic_link')
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-900 to-pink-900 hover:from-purple-800 hover:to-pink-800 text-white text-xs font-bold shadow-xs transition-all"
                            >
                              <Sparkles className="size-3.5 text-amber-300" />
                              <span>{isUrdu ? '3D میجک لنک' : '3D Magic Link 🪄'}</span>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Infinite Scroll Sentinel & Load More Indicator */}
            <div ref={observerTarget} className="mt-10 py-6 flex flex-col items-center justify-center">
              {filteredPoems.length > visibleCount ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-300 bg-slate-900/90 px-4 py-2 rounded-full border border-amber-500/30">
                    <div className="size-4 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin" />
                    <span>{isUrdu ? 'مزید اشعار خودکار طور پر لوڈ ہو رہے ہیں...' : 'Loading more verses on scroll...'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 30, filteredPoems.length))}
                    className="px-6 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {isUrdu
                      ? `مزید لوڈ کریں (+30) — باقی ${filteredPoems.length - visibleCount}`
                      : `Load More (+30) — ${filteredPoems.length - visibleCount} remaining`}
                  </button>
                </div>
              ) : filteredPoems.length > 0 ? (
                <div className="text-center py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/30 px-3.5 py-1.5 rounded-full font-medium">
                    ✓ {isUrdu ? `تمام ${filteredPoems.length} اشعار لوڈ ہو چکے ہیں` : `All ${filteredPoems.length} matching verses loaded`}
                  </span>
                </div>
              ) : null}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
