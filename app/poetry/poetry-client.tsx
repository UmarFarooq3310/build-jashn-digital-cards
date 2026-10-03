'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Video,
  Eye,
  ExternalLink,
  MessageCircle,
  X,
  Send,
} from 'lucide-react'
import { downloadCanvasAsVideo } from '@/lib/jashn/card-media-export'
import { POET_PROFILES, POPULAR_SEARCH_KEYWORDS, POETRY_DATABASE, Poem } from '@/lib/jashn/poetry-data'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'
import { getClientTracking } from '@/lib/jashn/tracking'
import { isDeviceAdmin } from '@/lib/jashn/admin-presence'
import { encodeShortWish } from '@/lib/jashn/codec'
import { cn } from '@/lib/utils'

export interface PoetryThemeConfig {
  id: string
  name: string
  bgClass: string
  borderClass: string
  glowColor: string
  accentColor: string
  tagBadgeClass: string
  innerBoxClass: string
  coupletClass: string
  dividerSymbol: string
  filigreeClass: string
  wishThemeId: string
  wishBgVariantId: string
  flyerGradients: [string, string, string]
  flyerAccent: string
}

export const POETRY_THEMES: PoetryThemeConfig[] = [
  {
    id: 'mughal-emerald',
    name: 'Mughal Emerald',
    bgClass: 'from-[#031d14] via-[#02130d] to-[#010a07]',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400/80',
    glowColor: 'rgba(16, 185, 129, 0.20)',
    accentColor: 'text-emerald-300',
    tagBadgeClass: 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300',
    innerBoxClass: 'bg-[#020e09]/90 border-emerald-500/25',
    coupletClass: 'text-emerald-50',
    dividerSymbol: '❦ ✦ ❦',
    filigreeClass: 'text-emerald-400/50',
    wishThemeId: 'emerald-luxury',
    wishBgVariantId: 'poetry-emerald-calligraphy',
    flyerGradients: ['#042117', '#02120b', '#010a07'],
    flyerAccent: '#34d399',
  },
  {
    id: 'royal-plum',
    name: 'Royal Velvet Plum',
    bgClass: 'from-[#24082c] via-[#14031a] to-[#08010b]',
    borderClass: 'border-purple-500/40 hover:border-pink-400/80',
    glowColor: 'rgba(217, 70, 239, 0.18)',
    accentColor: 'text-purple-300',
    tagBadgeClass: 'bg-purple-950/80 border-purple-500/30 text-purple-300',
    innerBoxClass: 'bg-[#100214]/90 border-purple-500/25',
    coupletClass: 'text-pink-50',
    dividerSymbol: '✦ ❖ ✦',
    filigreeClass: 'text-pink-400/50',
    wishThemeId: 'royal-velvet-plum',
    wishBgVariantId: 'poetry-royal-velvet',
    flyerGradients: ['#280831', '#14031a', '#08010b'],
    flyerAccent: '#e879f9',
  },
  {
    id: 'night-indigo',
    name: 'Mushaira Night Indigo',
    bgClass: 'from-[#071436] via-[#040c21] to-[#020512]',
    borderClass: 'border-indigo-500/40 hover:border-sky-400/80',
    glowColor: 'rgba(99, 102, 241, 0.20)',
    accentColor: 'text-indigo-300',
    tagBadgeClass: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300',
    innerBoxClass: 'bg-[#03081a]/90 border-indigo-500/25',
    coupletClass: 'text-indigo-50',
    dividerSymbol: '✦ ✧ ✦',
    filigreeClass: 'text-indigo-400/50',
    wishThemeId: 'mushaira-night-indigo',
    wishBgVariantId: 'poetry-dusk-indigo',
    flyerGradients: ['#091b45', '#040d24', '#020512'],
    flyerAccent: '#818cf8',
  },
  {
    id: 'vintage-amber',
    name: 'Vintage Gilded Amber',
    bgClass: 'from-[#241505] via-[#160b02] to-[#0a0501]',
    borderClass: 'border-amber-500/45 hover:border-amber-300/85',
    glowColor: 'rgba(245, 158, 11, 0.20)',
    accentColor: 'text-amber-300',
    tagBadgeClass: 'bg-amber-950/80 border-amber-500/30 text-amber-300',
    innerBoxClass: 'bg-[#110701]/90 border-amber-500/30',
    coupletClass: 'text-amber-50',
    dividerSymbol: '❦ ❦ ❦',
    filigreeClass: 'text-amber-400/60',
    wishThemeId: 'vintage-parchment',
    wishBgVariantId: 'poetry-vintage-parchment',
    flyerGradients: ['#2b1806', '#160b02', '#0a0501'],
    flyerAccent: '#fbbf24',
  },
  {
    id: 'crimson-ghazal',
    name: 'Crimson Ghazal',
    bgClass: 'from-[#2c0710] via-[#1a0309] to-[#0b0103]',
    borderClass: 'border-rose-500/40 hover:border-rose-300/85',
    glowColor: 'rgba(244, 63, 94, 0.20)',
    accentColor: 'text-rose-300',
    tagBadgeClass: 'bg-rose-950/80 border-rose-500/30 text-rose-300',
    innerBoxClass: 'bg-[#130206]/90 border-rose-500/25',
    coupletClass: 'text-rose-50',
    dividerSymbol: '❦ ❖ ❦',
    filigreeClass: 'text-rose-400/50',
    wishThemeId: 'crimson-ghazal',
    wishBgVariantId: 'poetry-crimson-ghazal',
    flyerGradients: ['#320813', '#1a0309', '#0b0103'],
    flyerAccent: '#fb7185',
  },
]

export function getPoemTheme(poem: Poem): PoetryThemeConfig {
  let hash = 0
  for (let i = 0; i < poem.id.length; i++) {
    hash = (hash * 31 + poem.id.charCodeAt(i)) >>> 0
  }
  return POETRY_THEMES[hash % POETRY_THEMES.length]
}

export function formatMetricCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function PoetryClient() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur'
  const showToast = useJashn((s) => s.showToast)
  const user = useJashn((s) => s.user)
  const searchParams = useSearchParams()

  const LANGUAGE_OPTIONS = useMemo(() => [
    { id: 'all', label: isUrdu ? '🌐 تمام کلام (1,000+)' : '🌐 All (1,000+)' },
    { id: 'ur', label: isUrdu ? '🇵🇰 اردو غزلیں (710+)' : '🇵🇰 Urdu Ghazals (710+)' },
    { id: 'pa', label: isUrdu ? '🌾 پنجابی صوفی (120+)' : '🌾 Punjabi Sufi (120+)' },
    { id: 'fa', label: isUrdu ? '🇮🇷 فارسی حکمت (50+)' : '🇮🇷 Persian Wisdom (50+)' },
    { id: 'ar', label: isUrdu ? '🇸🇦 عربی کلاسیک (50+)' : '🇸🇦 Arabic Classics (50+)' },
    { id: 'en', label: isUrdu ? '🇬🇧 انگلش (70+)' : '🇬🇧 English (70+)' },
  ], [isUrdu])

  const handleSelectLanguage = (langId: string) => {
    setSelectedLanguage(langId)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (langId === 'all') {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', langId)
      }
      window.history.replaceState({}, '', url.toString())
    }
  }

  const [poems, setPoems] = useState<Poem[]>(() => POETRY_DATABASE)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPoet, setSelectedPoet] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'two_liner' | 'full_poem'>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(30)
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'original' | 'roman' | 'english' | 'urdu' | 'meaning'>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [isGeneratingFlyer, setIsGeneratingFlyer] = useState<string | null>(null)
  const [generatingVideoId, setGeneratingVideoId] = useState<string | null>(null)
  const [videoProgress, setVideoProgress] = useState<number>(0)
  const [highlightedPoemId, setHighlightedPoemId] = useState<string | null>(null)
  const [statsMap, setStatsMap] = useState<Record<string, { views?: number; copies?: number; shares?: number; likes?: number; flyers?: number }>>({})
  
  // Custom Poetry Post Creator State (By Self: poet name, poetry, dedication, download)
  const [customPoet, setCustomPoet] = useState<string>('مرزا اسد اللہ خاں غالب')
  const [customDedication, setCustomDedication] = useState<string>('برائے جانِ جاں')
  const [customVerse, setCustomVerse] = useState<string>(
    'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے'
  )
  const [customThemeId, setCustomThemeId] = useState<string>('mughal-emerald')
  const [isDownloadingCustomFlyer, setIsDownloadingCustomFlyer] = useState<boolean>(false)
  const [isGeneratingCustomVideo, setIsGeneratingCustomVideo] = useState<boolean>(false)
  const [customVideoProgress, setCustomVideoProgress] = useState<number>(0)
  const [customCopied, setCustomCopied] = useState<boolean>(false)

  // Load saved favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cardzy_poetry_favorites')
      if (saved) {
        setLikedIds(new Set(JSON.parse(saved)))
      }
    } catch {}
  }, [])


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

  // Automatically reset currentPage to 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedPoet, selectedLanguage, selectedFormat, pageSize])

  // Cascading Filter: If selected poet does not exist in the active language, reset poet to 'all'
  useEffect(() => {
    if (selectedPoet !== 'all') {
      const isAvailableInLang = poetList.some((p) => p.name === selectedPoet)
      if (!isAvailableInLang) {
        setSelectedPoet('all')
      }
    }
  }, [selectedLanguage, poetList, selectedPoet])

  // Pagination calculations: 30 items per page by default, ensuring users can reach footer and page bottom easily
  const totalPages = Math.max(1, Math.ceil(filteredPoems.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(filteredPoems.length, currentPage * pageSize)
  const displayedPoems = useMemo(() => {
    return filteredPoems.slice(startIndex, endIndex)
  }, [filteredPoems, startIndex, endIndex])

  // Fetch real-time view & activity stats for displayed poems
  useEffect(() => {
    if (displayedPoems.length === 0) return
    const ids = displayedPoems.map((p) => p.id).join(',')
    fetch(`/api/poetry-activity?ids=${encodeURIComponent(ids)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.stats) {
          setStatsMap((prev) => ({ ...prev, ...data.stats }))
        }
      })
      .catch(() => {})
  }, [displayedPoems])

  // Get authentic base + live metrics for a poem
  const getPoemMetrics = (poemId: string) => {
    let hash = 0
    for (let i = 0; i < poemId.length; i++) {
      hash = (hash * 31 + poemId.charCodeAt(i)) >>> 0
    }
    const baseViews = 54 + (hash % 145)
    const baseLikes = 9 + (hash % 38)
    const baseShares = 5 + (hash % 23)

    const live = statsMap[poemId] || {}
    const isLocalLiked = likedIds.has(poemId)
    const views = baseViews + (live.views || 0)
    const likes = baseLikes + (live.likes || 0) + (isLocalLiked ? 1 : 0)
    const shares = baseShares + (live.shares || 0) + (live.copies || 0)

    return { views, likes, shares }
  }

  // Generate Tailored Canvas for Custom User Poetry Card
  const generateCustomPoetryCanvas = async (
    verseText: string,
    poetName: string,
    dedication?: string,
    theme?: PoetryThemeConfig
  ): Promise<HTMLCanvasElement | null> => {
    const activeTheme = theme || POETRY_THEMES[0]
    const cleanLines = (verseText || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.includes('شعر نمبر') && !l.startsWith('—'))

    if (cleanLines.length === 0) return null

    if (typeof document !== 'undefined' && document.fonts) {
      try {
        await document.fonts.ready
      } catch (e) {}
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1080
    const tempCtx = canvas.getContext('2d')
    if (!tempCtx) return null

    const isRtl = /[\u0600-\u06FF]/.test(verseText)
    const maxWidth = isRtl ? 820 : 840
    const isLongPoem = cleanLines.length > 8
    const fontDeclaration = isRtl
      ? (isLongPoem
          ? 'bold 26px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", serif'
          : 'bold 33px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", serif')
      : (isLongPoem
          ? 'italic bold 22px "Georgia", "Times New Roman", serif'
          : 'italic bold 28px "Georgia", "Times New Roman", serif')

    tempCtx.font = fontDeclaration

    const wrappedLines: string[] = []
    cleanLines.forEach((origLine) => {
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
      if (currentLine) wrappedLines.push(currentLine)
    })

    const lineHeight = isRtl ? (isLongPoem ? 68 : 88) : (isLongPoem ? 44 : 54)
    const verseBoxHeight = Math.max(isRtl ? 200 : 170, wrappedLines.length * lineHeight + (isRtl ? 80 : 60))
    const headerHeight = dedication && dedication.trim() ? 190 : 140
    const footerHeight = 110
    const calculatedHeight = Math.max(540, headerHeight + verseBoxHeight + footerHeight)

    canvas.height = calculatedHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // 1. Theme Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, canvas.height)
    gradient.addColorStop(0, activeTheme.flyerGradients[0])
    gradient.addColorStop(0.4, activeTheme.flyerGradients[1])
    gradient.addColorStop(1, activeTheme.flyerGradients[2])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1080, canvas.height)

    // 2. Ornate Double Gold & Theme Accent Borders
    ctx.lineWidth = 8
    ctx.strokeStyle = '#d97706'
    ctx.strokeRect(28, 28, 1024, canvas.height - 56)

    ctx.lineWidth = 2
    ctx.strokeStyle = activeTheme.flyerAccent || '#fef08a'
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

    // 4. Header Section: Dedication Ribbon & Poet Name
    let currentY = 80
    if (dedication && dedication.trim()) {
      ctx.fillStyle = activeTheme.flyerAccent || '#38bdf8'
      ctx.font = 'bold 21px sans-serif'
      ctx.fillText(`✨ ${dedication.trim()} ✨`, 540, currentY)
      currentY += 46
    }

    ctx.fillStyle = '#fde68a'
    ctx.font = isRtl
      ? 'bold 34px "Noto Nastaliq Urdu", "Traditional Arabic", serif'
      : 'bold 32px "Georgia", "Times New Roman", serif'
    ctx.fillText(poetName || (isRtl ? 'شاعر' : 'Poet'), 540, currentY)

    currentY += 30
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(220, currentY)
    ctx.lineTo(860, currentY)
    ctx.stroke()

    // 5. Verse Box Container
    const boxTop = currentY + 22
    const boxWidth = 940
    const boxLeft = 70

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)'
    ctx.fillRect(boxLeft, boxTop, boxWidth, verseBoxHeight)
    ctx.strokeStyle = activeTheme.flyerAccent ? `${activeTheme.flyerAccent}55` : 'rgba(251, 191, 36, 0.35)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(boxLeft, boxTop, boxWidth, verseBoxHeight)

    ctx.fillStyle = '#ffffff'
    ctx.font = fontDeclaration
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let verseY = boxTop + (isRtl ? 45 : 35) + (lineHeight / 2)
    wrappedLines.forEach((line) => {
      ctx.fillText(line.trim(), 540, verseY)
      verseY += lineHeight
    })

    // 6. Footer Line
    const footerY = boxTop + verseBoxHeight + 35
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)'
    ctx.beginPath()
    ctx.moveTo(260, footerY)
    ctx.lineTo(820, footerY)
    ctx.stroke()

    ctx.fillStyle = '#fef08a'
    ctx.font = 'bold 18px sans-serif'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦ Created with Cardzy.online ✦', 540, footerY + 30)

    return canvas
  }

  // Handle Download Custom Image Card
  const handleDownloadCustomImage = async () => {
    if (!customVerse.trim()) {
      showToast(isUrdu ? 'براہ کرم پہلے کچھ اشعار درج کریں' : 'Please enter some poetry verses first', 'error')
      return
    }

    setIsDownloadingCustomFlyer(true)
    showToast(isUrdu ? 'شاعری کارڈ تیار کیا جا رہا ہے... ⏳' : 'Generating custom poetry card... ⏳', 'info')

    try {
      const selectedTheme = POETRY_THEMES.find((t) => t.id === customThemeId) || POETRY_THEMES[0]
      const canvas = await generateCustomPoetryCanvas(customVerse, customPoet, customDedication, selectedTheme)
      if (!canvas) throw new Error('Failed to generate canvas')

      const sanitizedPoet = (customPoet || 'verse').toLowerCase().replace(/[^a-z0-9]/g, '-')
      const fileName = `Cardzy-Custom-Poetry-${sanitizedPoet}.png`

      // Direct file download to user device (bypass system share dialog)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (blob) {
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = fileName
        link.href = objectUrl
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(objectUrl)
        }, 1500)
      } else {
        const imageURL = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = fileName
        link.href = imageURL
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
        }, 500)
      }

      showToast(isUrdu ? 'شاعری کارڈ ڈاؤنلوڈ ہو گیا! 🎨' : 'Custom poetry card downloaded! 🎨', 'success')
    } catch (err) {
      console.error(err)
      showToast(isUrdu ? 'کارڈ بنانے میں خرابی پیش آئی' : 'Failed to generate card', 'error')
    } finally {
      setIsDownloadingCustomFlyer(false)
    }
  }

  // Handle Download Custom Animated Video
  const handleDownloadCustomVideo = async () => {
    if (!customVerse.trim()) {
      showToast(isUrdu ? 'براہ کرم پہلے کچھ اشعار درج کریں' : 'Please enter some poetry verses first', 'error')
      return
    }

    setIsGeneratingCustomVideo(true)
    setCustomVideoProgress(0)
    showToast(isUrdu ? 'ویڈیو تیار ہو رہی ہے... ⏳' : 'Generating animated video... ⏳', 'info')

    try {
      const selectedTheme = POETRY_THEMES.find((t) => t.id === customThemeId) || POETRY_THEMES[0]
      const canvas = await generateCustomPoetryCanvas(customVerse, customPoet, customDedication, selectedTheme)
      if (!canvas) throw new Error('Failed to generate canvas')

      const sanitizedPoet = (customPoet || 'verse').toLowerCase().replace(/[^a-z0-9]/g, '-')
      const success = await downloadCanvasAsVideo({
        canvas,
        fileName: `Cardzy-Custom-Poetry-${sanitizedPoet}-video`,
        audioTrack: 'friendship-soft',
        onProgress: (p) => setCustomVideoProgress(p),
      })

      if (success) {
        showToast(isUrdu ? 'شاعری ویڈیو ڈاؤنلوڈ ہو گئی! 🎥' : 'Poetry video downloaded! 🎥', 'success')
      }
    } catch (err) {
      console.error(err)
      showToast(isUrdu ? 'ویڈیو بنانے میں خرابی پیش آئی' : 'Failed to generate video', 'error')
    } finally {
      setIsGeneratingCustomVideo(false)
      setCustomVideoProgress(0)
    }
  }

  // Handle Custom WhatsApp Share
  const handleCustomWhatsAppShare = () => {
    if (!customVerse.trim()) return
    const shareText = encodeURIComponent(
      `${customVerse}\n\n— ${customPoet || 'شاعر'}${customDedication ? `\n(نذرانہ: ${customDedication})` : ''}\n\nhttps://cardzy.online/poetry`
    )
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank')
  }

  // Handle Custom Copy Text
  const handleCustomCopy = () => {
    if (!customVerse.trim()) return
    const textToCopy = `${customVerse}\n\n— ${customPoet || 'شاعر'}${customDedication ? `\n(نذرانہ: ${customDedication})` : ''}\n\nhttps://cardzy.online/poetry`
    navigator.clipboard.writeText(textToCopy)
    setCustomCopied(true)
    showToast(isUrdu ? 'کلام کاپی ہو گیا!' : 'Poetry copied to clipboard!', 'success')
    setTimeout(() => setCustomCopied(false), 2500)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    setTimeout(() => {
      const el = document.getElementById('poetry-collection-header')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 380, behavior: 'smooth' })
      }
    }, 40)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis-start')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push('ellipsis-end')
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  // Handle URL deep link query params (?poem=... or ?poet=... or ?lang=... or ?category=...)
  useEffect(() => {
    if (!searchParams) return
    const poemParam = searchParams.get('poem')
    const poetParam = searchParams.get('poet')
    const categoryParam = searchParams.get('category')
    const langParam = searchParams.get('lang')

    if (langParam) {
      setSelectedLanguage(langParam)
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (poetParam) {
      setSelectedPoet(poetParam)
    }

    if (poemParam) {
      setHighlightedPoemId(poemParam)
      const foundPoem = poems.find((p) => p.id === poemParam)
      if (foundPoem) {
        trackPoetryActivity(foundPoem, 'view', 'direct_link')
        // Automatically switch language filter to match the poem if no explicit lang was provided
        if (!langParam && foundPoem.originalLanguage) {
          setSelectedLanguage(foundPoem.originalLanguage)
        }
      }
    }
  }, [searchParams, poems])

  // Pagination & auto-scroll to highlighted poem when filters/page are updated
  useEffect(() => {
    if (!highlightedPoemId) return
    const poemIndex = filteredPoems.findIndex((p) => p.id === highlightedPoemId)
    if (poemIndex !== -1) {
      const targetPage = Math.floor(poemIndex / pageSize) + 1
      setCurrentPage(targetPage)
      setTimeout(() => {
        const el = document.getElementById(highlightedPoemId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 350)
    }
  }, [highlightedPoemId, filteredPoems, pageSize])

  // Track poetry activity (views, clicks, copies, shares, flyers, likes)
  const trackPoetryActivity = (
    poem: Poem,
    action: 'view' | 'click' | 'share' | 'copy' | 'flyer' | 'download' | 'card_bridge' | 'like' | 'unlike',
    channel?: string
  ) => {
    try {
      getClientTracking()
        .then((tracking) => {
          fetch('/api/poetry-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              poemId: poem.id,
              poet: poem.poet,
              title: poem.title,
              action,
              channel: channel || 'web',
              userName: user?.name || (typeof window !== 'undefined' ? localStorage.getItem('cardzy_visitor_name') || '' : ''),
              userEmail: user?.email || '',
              userId: user?.uid || '',
              country: tracking?.country,
              countryCode: tracking?.countryCode,
              city: tracking?.city,
              region: tracking?.region,
              createdLocation: tracking?.createdLocation,
              device: tracking?.device,
              browser: tracking?.browser,
              ip: tracking?.ip,
            }),
          }).catch(() => {})
        })
        .catch(() => {
          fetch('/api/poetry-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              poemId: poem.id,
              poet: poem.poet,
              title: poem.title,
              action,
              channel: channel || 'web',
              userName: user?.name || '',
              userEmail: user?.email || '',
              userId: user?.uid || '',
            }),
          }).catch(() => {})
        })
    } catch (e) {}
  }

  // Helper to extract active language text, poet metadata, and years
  const getActiveVerseDetails = (poem: Poem, tabOverride?: 'original' | 'roman' | 'english' | 'urdu' | 'meaning') => {
    const currentTab =
      tabOverride ||
      activeTabMap[poem.id] ||
      'original'

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
    setStatsMap((prev) => {
      const cur = prev[poem.id] || {}
      return {
        ...prev,
        [poem.id]: {
          ...cur,
          copies: (cur.copies || 0) + 1,
        },
      }
    })
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

    setStatsMap((prev) => {
      const cur = prev[poem.id] || {}
      return {
        ...prev,
        [poem.id]: {
          ...cur,
          likes: Math.max(0, (cur.likes || 0) + (isCurrentlyLiked ? -1 : 1)),
        },
      }
    })

    // Sync to Firestore backend with visitor metadata
    trackPoetryActivity(poem, isCurrentlyLiked ? 'unlike' : 'like', 'heart_button')
  }

  // WhatsApp Share: Shares active selected language text, poet name, and website link exactly once
  const handleWhatsAppShare = (poem: Poem) => {
    const { text, poetDisplayName, currentTab } = getActiveVerseDetails(poem)
    setStatsMap((prev) => {
      const cur = prev[poem.id] || {}
      return {
        ...prev,
        [poem.id]: {
          ...cur,
          shares: (cur.shares || 0) + 1,
        },
      }
    })
    trackPoetryActivity(poem, 'share', `whatsapp_${currentTab}`)
    const shareText = encodeURIComponent(
      `${text}\n\n— ${poetDisplayName}\n\nhttps://cardzy.online/poetry`
    )
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank')
  }

  // SMS / Native Share: For native Web Share API (mobile), provide clean verse text so WhatsApp/apps do not duplicate url
  const handleSmsOrNativeShare = async (poem: Poem) => {
    const { text, poetDisplayName, currentTab } = getActiveVerseDetails(poem)
    setStatsMap((prev) => {
      const cur = prev[poem.id] || {}
      return {
        ...prev,
        [poem.id]: {
          ...cur,
          shares: (cur.shares || 0) + 1,
        },
      }
    })
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

  // Generate Tailored, Dynamic-Height Story Flyer Canvas
  const generatePoetryCanvas = async (poem: Poem): Promise<{
    canvas: HTMLCanvasElement
    sanitizedTitle: string
    text: string
    poetDisplayName: string
  } | null> => {
    const { text, lines, isRtl, poetDisplayName, poetEra } = getActiveVerseDetails(poem)
    if (typeof document !== 'undefined' && document.fonts) {
      try {
        await document.fonts.ready
      } catch (e) {}
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1080
    const tempCtx = canvas.getContext('2d')
    if (!tempCtx) return null

    // Measure & wrap verse lines cleanly with comfortable margins
    const maxWidth = isRtl ? 820 : 840
    const isLongPoem = lines.length > 8
    const fontDeclaration = isRtl
      ? (isLongPoem
          ? 'bold 25px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", "Traditional Arabic", serif'
          : 'bold 32px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", "Traditional Arabic", serif')
      : (isLongPoem
          ? 'italic bold 22px "Georgia", "Times New Roman", serif'
          : 'italic bold 28px "Georgia", "Times New Roman", serif')

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

    // Generous line height adapted for length (66px for long Urdu, 86px for standard)
    const lineHeight = isRtl ? (isLongPoem ? 66 : 86) : (isLongPoem ? 42 : 52)
    const verseBoxHeight = Math.max(isRtl ? 190 : 160, wrappedLines.length * lineHeight + (isRtl ? 80 : 60))
    const headerHeight = poetEra ? 170 : 140
    const footerHeight = 110
    const calculatedHeight = Math.max(540, headerHeight + verseBoxHeight + footerHeight)

    canvas.height = calculatedHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const poemTheme = getPoemTheme(poem)

    // 1. Luxury Theme Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, canvas.height)
    gradient.addColorStop(0, poemTheme.flyerGradients[0])
    gradient.addColorStop(0.4, poemTheme.flyerGradients[1])
    gradient.addColorStop(1, poemTheme.flyerGradients[2])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1080, canvas.height)

    // 2. Ornate Double Gold & Theme Accent Borders
    ctx.lineWidth = 8
    ctx.strokeStyle = '#d97706'
    ctx.strokeRect(28, 28, 1024, canvas.height - 56)

    ctx.lineWidth = 2
    ctx.strokeStyle = poemTheme.flyerAccent || '#fef08a'
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

    // 4. Top Header: Poet Name & Years
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

    topY += 28
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

    const sanitizedTitle = (poem.title || 'poetry').toLowerCase().replace(/[^a-z0-9]/g, '-')
    return { canvas, sanitizedTitle, text, poetDisplayName }
  }

  // Generate Tailored, Dynamic-Height Story Flyer in the Active Card Language
  const handleDownloadFlyer = async (poem: Poem) => {
    setIsGeneratingFlyer(poem.id)
    const { currentTab } = getActiveVerseDetails(poem)
    trackPoetryActivity(poem, 'flyer', `canvas_png_${currentTab}`)

    showToast(
      isUrdu
        ? 'کارڈ تیار کیا جا رہا ہے... برائے مہربانی ایک لمحہ انتظار فرمائیں ⏳'
        : 'Generating high-resolution card... please wait a moment ⏳',
      'info'
    )

    try {
      const result = await generatePoetryCanvas(poem)
      if (!result) return

      const { canvas, sanitizedTitle, text, poetDisplayName } = result
      const fileName = `Cardzy-${sanitizedTitle}.png`

      // Direct file download to user device (bypass system share dialog)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (blob) {
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = fileName
        link.href = objectUrl
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(objectUrl)
        }, 1500)
      } else {
        const imageURL = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = fileName
        link.href = imageURL
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
        }, 500)
      }

      showToast(
        isUrdu
          ? 'کارڈ کامیابی کے ساتھ ڈاؤنلوڈ ہو گیا! 🎨'
          : 'Card downloaded successfully! 🎨',
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

  // Generate Animated Celebration Video (MP4 / WebM with golden sparkles & light beam)
  const handleDownloadPoetryVideo = async (poem: Poem) => {
    setGeneratingVideoId(poem.id)
    setVideoProgress(0)
    trackPoetryActivity(poem, 'download', 'video')

    showToast(
      isUrdu
        ? 'شاعری کی ویڈیو تیار ہو رہی ہے... برائے مہربانی انتظار فرمائیں ⏳'
        : 'Generating animated poetry video... please wait ⏳',
      'info'
    )

    try {
      const result = await generatePoetryCanvas(poem)
      if (!result) return

      const { canvas, sanitizedTitle } = result
      const success = await downloadCanvasAsVideo({
        canvas,
        fileName: `Cardzy-${sanitizedTitle}-video`,
        audioTrack: 'friendship-soft',
        onProgress: (p) => setVideoProgress(p),
      })

      if (success) {
        showToast(
          isUrdu ? 'شاعری ویڈیو ڈاؤنلوڈ ہو گئی! 🎥' : 'Poetry video downloaded successfully! 🎥',
          'success'
        )
      }
    } catch (err) {
      console.error('Video generation error:', err)
      showToast(
        isUrdu ? 'ویڈیو بنانے میں خرابی پیش آئی' : 'Failed to generate video',
        'error'
      )
    } finally {
      setGeneratingVideoId(null)
      setVideoProgress(0)
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

          {/* Quick Jump to Custom Card Creator */}
          <div className="mt-4 flex items-center justify-center">
            <a
              href="#create-custom-poetry"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="size-4 fill-slate-950" />
              <span>{isUrdu ? 'خود اپنی شاعری پوسٹ بنائیں و ڈاؤنلوڈ کریں ✍️' : 'Create & Download Your Own Poetry Card ✍️'}</span>
            </a>
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

            {/* Quick Language Filter Pills in Hero */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {LANGUAGE_OPTIONS.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => handleSelectLanguage(pill.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 border",
                    selectedLanguage === pill.id
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-amber-500/25 ring-2 ring-amber-400/80 scale-105 font-black"
                      : "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80 hover:border-amber-400/40"
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FILTER CONTROLS (Sticky 4-Dropdown Clean Grid, Mobile-Optimized Text) --- */}
      <section className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 py-1.5 sm:py-3 px-2 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto space-y-1.5 sm:space-y-2.5">
          {/* Quick Language Pills Bar inside Sticky Header */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {LANGUAGE_OPTIONS.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => handleSelectLanguage(pill.id)}
                className={cn(
                  'px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10.5px] sm:text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 shadow-xs border',
                  selectedLanguage === pill.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-amber-500/20 font-black scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80 hover:border-amber-400/40'
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3">
            {/* 1. Language Dropdown */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9.5px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-0.5 sm:gap-1 leading-none tracking-tight">
                <span>🌐</span> <span>{isUrdu ? 'زبان' : 'Language'}</span>
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleSelectLanguage(e.target.value)}
                className="w-full text-[9.5px] sm:text-xs font-semibold rounded-lg sm:rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-1 sm:px-2.5 py-1 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                <option value="all">
                  {isUrdu ? '🌐 تمام کلام (1,000+)' : '🌐 All (1,000+)'}
                </option>
                <option value="ur">
                  {isUrdu ? '🇵🇰 اردو (710+)' : '🇵🇰 Urdu (710+)'}
                </option>
                <option value="pa">
                  {isUrdu ? '🌾 پنجابی (120+)' : '🌾 Punjabi (120+)'}
                </option>
                <option value="fa">
                  {isUrdu ? '🇮🇷 فارسی (50+)' : '🇮🇷 Persian (50+)'}
                </option>
                <option value="ar">
                  {isUrdu ? '🇸🇦 عربی (50+)' : '🇸🇦 Arabic (50+)'}
                </option>
                <option value="en">
                  {isUrdu ? '🇬🇧 انگلش (70+)' : '🇬🇧 English (70+)'}
                </option>
                <option value="es">
                  {isUrdu ? '🇪🇸 ہسپانوی (5+)' : '🇪🇸 Spanish (5+)'}
                </option>
              </select>
            </div>

            {/* 2. Poet Dropdown (Cascading: Filters based on active language) */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9.5px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-0.5 sm:gap-1 leading-none tracking-tight">
                <Feather className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'شاعر' : 'Poet'}</span>
              </label>
              <select
                value={selectedPoet}
                onChange={(e) => setSelectedPoet(e.target.value)}
                className="w-full text-[9.5px] sm:text-xs font-semibold rounded-lg sm:rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-1 sm:px-2.5 py-1 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
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
            <div className="flex flex-col gap-0.5">
              <label className="text-[9.5px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-0.5 sm:gap-1 leading-none tracking-tight">
                <Filter className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'موضوع' : 'Theme'}</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-[9.5px] sm:text-xs font-semibold rounded-lg sm:rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-1 sm:px-2.5 py-1 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Format Dropdown */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9.5px] sm:text-xs font-bold text-amber-300/90 flex items-center gap-0.5 sm:gap-1 leading-none tracking-tight">
                <Layers className="size-2.5 sm:size-3 text-amber-400" /> <span>{isUrdu ? 'طرز' : 'Format'}</span>
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="w-full text-[9.5px] sm:text-xs font-semibold rounded-lg sm:rounded-xl bg-slate-900/95 border border-amber-500/35 text-slate-100 px-1 sm:px-2.5 py-1 sm:py-2 focus:outline-none focus:ring-1.5 focus:ring-amber-400 shadow-xs cursor-pointer truncate"
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

      {/* --- CUSTOM POETRY POST CREATOR SECTION --- */}
      <section id="create-custom-poetry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-slate-950 via-[#0e1628] to-slate-950 p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Ambient Lighting & Top Hairline */}
          <div className="absolute -top-32 -right-32 size-80 rounded-full pointer-events-none blur-3xl opacity-30 bg-amber-500/25" />
          <div className="absolute -bottom-32 -left-32 size-80 rounded-full pointer-events-none blur-3xl opacity-20 bg-emerald-500/25" />
          <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="size-3.5 text-amber-400" />
              <span>{isUrdu ? 'خود اپنی شاعری پوسٹ بنائیں و ڈاؤنلوڈ کریں' : 'Custom Poetry Post & Card Studio'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {isUrdu
                ? 'اپنا کلام، شاعر کا نام اور نذرانہ لکھ کر خوبصورت کارڈ ڈاؤنلوڈ کریں'
                : 'Design & Download Your Personalized Poetry Card'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {isUrdu
                ? 'کسی بھی شاعر کا نام لکھیں، اپنی پسند کے اشعار یا غزل پیسٹ کریں، چاہنے والے کے نام نذرانہ یا انتساب شامل کریں، اور 1-کلک میں خوبصورت HD تصویر یا متحرک ویڈیو ڈاؤنلوڈ کریں!'
                : 'Paste any verses, specify the poet name, dedicate it to someone special, choose a luxury aesthetic theme, and download your card in HD (Image & Video) instantly!'}
            </p>
          </div>

          {/* 2-Column Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start relative z-10">
            {/* Form Inputs (Left: 7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* 1. Poet Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Feather className="size-3.5 text-amber-400" />
                    <span>{isUrdu ? 'شاعر کا نام' : 'Poet Name'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {isUrdu ? '(یا اپنا نام لکھیں)' : '(Or write your own name)'}
                  </span>
                </label>
                <input
                  type="text"
                  value={customPoet}
                  onChange={(e) => setCustomPoet(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً: علامہ اقبال، مرزا غالب، یا اپنا نام' : 'e.g. Mirza Ghalib, Allama Iqbal, or Your Name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/35 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
                />
                {/* Quick Poet Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {['مرزا اسد اللہ خاں غالب', 'علامہ محمد اقبال', 'فیض احمد فیض', 'جون ایلیا', 'احمد فراز'].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setCustomPoet(name)}
                      className={cn(
                        "text-[10.5px] px-2 py-0.5 rounded-md transition-all cursor-pointer border",
                        customPoet === name
                          ? "bg-amber-500/25 border-amber-400 text-amber-200 font-bold"
                          : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Dedication To Someone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Heart className="size-3.5 text-rose-400" />
                    <span>{isUrdu ? 'نذرانہ / انتساب (کس کے نام؟)' : 'Dedication (To Someone)'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {isUrdu ? '(اختیاری)' : '(Optional)'}
                  </span>
                </label>
                <input
                  type="text"
                  value={customDedication}
                  onChange={(e) => setCustomDedication(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً: برائے جانِ جاں، والدین کے نام، دوست کے نام' : 'e.g. Dedicated to Farhan, For My Soulmate, To Mom'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/35 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
                />
                {/* Quick Dedication Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {['برائے جانِ جاں', 'Dedicated to My Love', 'والدین کے نام', 'دوستِ عزیز کے نام', 'For My Best Friend'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setCustomDedication(d)}
                      className={cn(
                        "text-[10.5px] px-2 py-0.5 rounded-md transition-all cursor-pointer border",
                        customDedication === d
                          ? "bg-rose-500/25 border-rose-400 text-rose-200 font-bold"
                          : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                  {customDedication && (
                    <button
                      type="button"
                      onClick={() => setCustomDedication('')}
                      className="text-[10.5px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      ✕ Clear
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Poetry Verses (Textarea) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Scroll className="size-3.5 text-emerald-400" />
                    <span>{isUrdu ? 'کلام / اشعار (یہاں پیسٹ کریں یا لکھیں)' : 'Poetry Verses (Type or Paste)'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {customVerse.split('\n').filter(Boolean).length} lines
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  dir={/[\u0600-\u06FF]/.test(customVerse) ? 'rtl' : 'ltr'}
                  placeholder={
                    isUrdu
                      ? 'اپنے اشعار یا غزل یہاں پیسٹ کریں...\nہر مصرع الگ سطر میں لکھیں'
                      : 'Type or paste your verses here...\nWrite each line on a new line'
                  }
                  className={cn(
                    "w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/35 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner leading-relaxed",
                    /[\u0600-\u06FF]/.test(customVerse) ? "font-urdu text-base text-right" : "font-serif"
                  )}
                />
                {/* Sample Verses Quick Starters */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10.5px] text-slate-400 font-medium">
                    {isUrdu ? 'نمونہ کلام:' : 'Sample verses:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPoet('مرزا اسد اللہ خاں غالب')
                      setCustomVerse('ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے')
                      setCustomDedication('برائے جانِ جاں')
                    }}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                  >
                    غالب
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPoet('علامہ محمد اقبال')
                      setCustomVerse('ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحان اور بھی ہیں')
                      setCustomDedication('نوجوانانِ وطن کے نام')
                    }}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                  >
                    اقبال
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPoet('فیض احمد فیض')
                      setCustomVerse('مجھ سے پہلی سی محبت مری محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات')
                      setCustomDedication('یادِ محبوب')
                    }}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                  >
                    فیض
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPoet('جون ایلیا')
                      setCustomVerse('جو گزاری نہ جا سکی ہم سے\nہم نے وہ زندگی گزاری ہے')
                      setCustomDedication('تنہائی کے نام')
                    }}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                  >
                    جون ایلیا
                  </button>
                </div>
              </div>

              {/* 4. Luxury Aesthetic Theme Picker */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-400" />
                  <span>{isUrdu ? 'کارڈ کا شاہانہ تھیم منتخب کریں' : 'Choose Luxury Aesthetic Theme'}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {POETRY_THEMES.map((th) => {
                    const isSelected = customThemeId === th.id
                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setCustomThemeId(th.id)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-xl text-left transition-all border cursor-pointer",
                          isSelected
                            ? "bg-slate-900 border-amber-400 ring-2 ring-amber-400/50 shadow-md"
                            : "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300"
                        )}
                      >
                        <span
                          className="size-4 rounded-full shrink-0 border border-white/20 shadow-xs"
                          style={{ background: th.flyerAccent }}
                        />
                        <span className={cn("text-xs font-bold truncate", isSelected ? "text-amber-300 font-extrabold" : "text-slate-300")}>
                          {th.name}
                        </span>
                        {isSelected && <Check className="size-3 text-amber-400 ml-auto shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Real-Time Live Card Preview & Download Studio (Right: 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Eye className="size-3.5 text-emerald-400" />
                  <span>{isUrdu ? 'براہ راست کارڈ پریویو' : 'Live Card Preview'}</span>
                </span>
                <span className="text-[10px] text-amber-400/90 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Ready to Export
                </span>
              </div>

              {/* The Live Rendered Card Container */}
              {(() => {
                const activeTheme = POETRY_THEMES.find((t) => t.id === customThemeId) || POETRY_THEMES[0]
                const isRtl = /[\u0600-\u06FF]/.test(customVerse)
                const verseLines = customVerse
                  .split('\n')
                  .map((l) => l.trim())
                  .filter(Boolean)

                return (
                  <div
                    className={cn(
                      "rounded-3xl p-5 sm:p-6 border shadow-2xl relative overflow-hidden transition-all duration-300 bg-gradient-to-br min-h-[300px] flex flex-col justify-between",
                      activeTheme.bgClass,
                      activeTheme.borderClass
                    )}
                  >
                    {/* Atmospheric Glow */}
                    <div
                      className="absolute -top-20 -right-20 size-48 rounded-full pointer-events-none blur-3xl opacity-40"
                      style={{ background: activeTheme.glowColor }}
                    />
                    <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />
                    <div className={cn("absolute top-2.5 left-3 text-xs select-none pointer-events-none font-serif opacity-40", activeTheme.filigreeClass)}>╔═</div>
                    <div className={cn("absolute top-2.5 right-3 text-xs select-none pointer-events-none font-serif opacity-40", activeTheme.filigreeClass)}>═╗</div>

                    {/* Dedication Banner */}
                    {customDedication && customDedication.trim() ? (
                      <div className="text-center mb-3 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs">
                          <span>✨</span>
                          <span>{customDedication.trim()}</span>
                          <span>✨</span>
                        </span>
                      </div>
                    ) : (
                      <div className="text-center mb-3 text-[10.5px] uppercase font-bold text-amber-400/80 tracking-wider">
                        ✦ Cardzy Poetry ✦
                      </div>
                    )}

                    {/* Inner Verse Container */}
                    <div className={cn("p-4 sm:p-5 rounded-2xl border relative overflow-hidden backdrop-blur-md shadow-inner text-center my-auto", activeTheme.innerBoxClass)}>
                      <div className={cn("absolute right-2 bottom-1 opacity-10 text-4xl select-none font-serif pointer-events-none", activeTheme.accentColor)}>❦</div>
                      
                      <div className={cn("space-y-2 py-1", isRtl ? "text-right" : "text-center")} dir={isRtl ? 'rtl' : 'ltr'}>
                        {verseLines.length > 0 ? (
                          verseLines.map((line, idx) => (
                            <p
                              key={idx}
                              className={cn(
                                "leading-relaxed break-words",
                                isRtl
                                  ? "font-urdu text-base sm:text-lg text-amber-100 font-bold"
                                  : "font-serif italic text-sm sm:text-base text-slate-100"
                              )}
                            >
                              {line}
                            </p>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500 italic">
                            {isUrdu ? 'یہاں اشعار ظاہر ہوں گے...' : 'Your poetry lines will appear here...'}
                          </p>
                        )}
                      </div>

                      {/* Couplet Separator */}
                      <div className="flex items-center justify-center gap-2 my-2.5 opacity-60" aria-hidden="true">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400/50" />
                        <span className="text-amber-300 text-xs font-serif">{activeTheme.dividerSymbol}</span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400/50" />
                      </div>

                      {/* Poet Attribution */}
                      <div className="mt-2 text-center">
                        <span
                          className={cn(
                            "text-xs sm:text-sm font-black tracking-wider text-amber-300",
                            isRtl ? "font-urdu text-sm sm:text-base" : "font-serif italic"
                          )}
                        >
                          — {customPoet || (isRtl ? 'نامعلوم شاعر' : 'Anonymous Poet')}
                        </span>
                      </div>
                    </div>

                    {/* Cardzy Footer Line */}
                    <div className="text-center mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400 font-medium">
                      ✦ Cardzy.online Digital Studio ✦
                    </div>
                  </div>
                )
              })()}

              {/* Action & Download Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Download Image Card */}
                  <button
                    type="button"
                    onClick={handleDownloadCustomImage}
                    disabled={isDownloadingCustomFlyer || isGeneratingCustomVideo}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black transition-all border shadow-lg cursor-pointer",
                      isDownloadingCustomFlyer
                        ? "bg-amber-500/25 text-amber-200 border-amber-400/50 cursor-wait animate-pulse"
                        : "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 border-amber-400/40 shadow-amber-500/20 active:scale-95"
                    )}
                  >
                    {isDownloadingCustomFlyer ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-slate-950" />
                        <span>{isUrdu ? 'کارڈ بن رہا ہے...' : 'Generating HD Image...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="size-4 text-slate-950" />
                        <span>{isUrdu ? 'تصویر کارڈ ڈاؤنلوڈ (HD)' : 'Download Image Card (HD)'}</span>
                      </>
                    )}
                  </button>

                  {/* Download Video Card */}
                  <button
                    type="button"
                    onClick={handleDownloadCustomVideo}
                    disabled={isGeneratingCustomVideo || isDownloadingCustomFlyer}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black transition-all border shadow-lg cursor-pointer",
                      isGeneratingCustomVideo
                        ? "bg-rose-500/25 text-rose-200 border-rose-400/50 cursor-wait animate-pulse"
                        : "bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white border-rose-500/40 shadow-rose-600/20 active:scale-95"
                    )}
                  >
                    {isGeneratingCustomVideo ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-white" />
                        <span>{customVideoProgress > 0 ? `${customVideoProgress}%` : (isUrdu ? 'ویڈیو بن رہی ہے...' : 'Making Video...')}</span>
                      </>
                    ) : (
                      <>
                        <Video className="size-4 text-white" />
                        <span>{isUrdu ? 'ویڈیو ڈاؤنلوڈ (MP4)' : 'Download Video (MP4)'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Secondary Quick Share Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCustomWhatsAppShare}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-xs font-bold transition-all cursor-pointer"
                  >
                    <MessageCircle className="size-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCustomCopy}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    {customCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-amber-400" />}
                    <span>{customCopied ? (isUrdu ? 'کاپی ہوگیا!' : 'Copied!') : (isUrdu ? 'متن کاپی کریں' : 'Copy Text')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POETRY GRID --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div id="poetry-collection-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 flex-wrap">
            <span>
              {isUrdu ? (
                <>
                  صفحہ <strong className="text-amber-400 font-black text-base">{currentPage}</strong> از <strong className="text-white font-bold">{totalPages}</strong>{' '}
                  <span className="text-slate-400 text-xs font-normal">
                    ({filteredPoems.length} میں سے {filteredPoems.length > 0 ? startIndex + 1 : 0} تا {endIndex} اشعار)
                  </span>
                </>
              ) : (
                <>
                  Showing <strong className="text-amber-400 font-black text-base">{filteredPoems.length > 0 ? startIndex + 1 : 0}–{endIndex}</strong> of{' '}
                  <strong className="text-amber-400 font-black text-base">{filteredPoems.length}</strong>{' '}
                  masterpiece verses{' '}
                  <span className="text-slate-400 text-xs font-normal">
                    (Page {currentPage} of {totalPages})
                  </span>
                </>
              )}
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
          
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            {/* Per-page selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-[11px]">{isUrdu ? 'فی صفحہ:' : 'Per page:'}</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 text-xs font-bold cursor-pointer focus:outline-hidden focus:border-amber-500"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </select>
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
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>↺</span>
                <span>{isUrdu ? 'تمام فلٹرز ختم کریں' : 'Reset All Filters'}</span>
              </button>
            )}
          </div>
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
              {displayedPoems.map((poem) => {
                const currentTab = activeTabMap[poem.id] || 'original'
                const isLiked = likedIds.has(poem.id)
                const isCopied = copiedId === poem.id
                const isHighlighted = highlightedPoemId === poem.id
                const theme = getPoemTheme(poem)
                const metrics = getPoemMetrics(poem.id)

                return (
                  <article
                    key={poem.id}
                    id={poem.id}
                    translate="no"
                    className={cn(
                      "notranslate group relative flex flex-col justify-between rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden break-words border bg-gradient-to-br",
                      theme.bgClass,
                      theme.borderClass,
                      isHighlighted
                        ? "ring-2 ring-amber-400 shadow-amber-500/20"
                        : "hover:shadow-amber-500/5"
                    )}
                  >
                    {/* Atmospheric Glow & Ornaments */}
                    <div
                      className="absolute -top-24 -right-24 size-64 rounded-full pointer-events-none blur-3xl opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ background: theme.glowColor }}
                    />
                    <div
                      className="absolute -bottom-24 -left-24 size-48 rounded-full pointer-events-none blur-3xl opacity-25"
                      style={{ background: theme.glowColor }}
                    />
                    <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />
                    <div className={cn("absolute top-2.5 left-3 text-xs select-none pointer-events-none font-serif opacity-30", theme.filigreeClass)}>╔═</div>
                    <div className={cn("absolute top-2.5 right-3 text-xs select-none pointer-events-none font-serif opacity-30", theme.filigreeClass)}>═╗</div>

                    {/* Top Metadata Header */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={cn("text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border shadow-2xs", theme.tagBadgeClass)}>
                              {poem.originalLanguage}
                            </span>
                            {poem.format === 'full_poem' && (
                              <span className="text-[10px] text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-800/50 font-bold flex items-center gap-1">
                                <BookOpen className="size-2.5" />
                                <span>{isUrdu ? 'مکمل کلام' : 'Full Poem'}</span>
                              </span>
                            )}
                            {poem.category && (
                              <span className="text-[10px] text-amber-300/90 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/40 truncate max-w-[130px] font-semibold">
                                {poem.category}
                              </span>
                            )}
                          </div>
                          <h3 translate="no" className="notranslate text-base sm:text-lg font-bold text-slate-100 mt-2 group-hover:text-amber-300 transition-colors truncate">
                            {poem.title}
                          </h3>
                          <p translate="no" className="notranslate text-xs text-slate-300 mt-0.5 flex items-center gap-1.5 flex-wrap">
                            <span>By <strong>{poem.poet}</strong></span>
                            {poem.poetUrdu && (
                              <span translate="no" className="notranslate text-emerald-400 font-urdu text-xs font-bold">{poem.poetUrdu}</span>
                            )}
                            {poem.poetEra && (
                              <span className="text-[10.5px] text-slate-400">({poem.poetEra})</span>
                            )}
                          </p>

                          {/* Live Metrics: Views, Likes, Shares (Identical to other Cardzy cards) */}
                          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-bold shadow-2xs">
                              <Eye className="size-2.5 text-emerald-400 shrink-0" />
                              <span>{formatMetricCount(metrics.views)} {isUrdu ? 'مناظر' : 'views'}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[10px] font-bold shadow-2xs">
                              <Heart className={cn("size-2.5 shrink-0", isLiked ? "fill-rose-400 text-rose-400" : "text-rose-400")} />
                              <span>{formatMetricCount(metrics.likes)}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] font-bold shadow-2xs">
                              <Share2 className="size-2.5 text-amber-400 shrink-0" />
                              <span>{formatMetricCount(metrics.shares)} {isUrdu ? 'شیئر' : 'shares'}</span>
                            </span>
                          </div>
                        </div>

                        {/* Top Action Buttons (Like) */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleLike(poem)}
                            title="Save to favorites"
                            className={cn(
                              'p-1.5 rounded-full transition-colors cursor-pointer border',
                              isLiked
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border-white/5'
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
                          <div translate="no" className="notranslate flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-3 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                translate="no"
                                onClick={() => setActiveTabMap((prev) => ({ ...prev, [poem.id]: tab.id }))}
                                className={cn(
                                  'notranslate shrink-0 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center whitespace-nowrap cursor-pointer shadow-2xs',
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
                      <div translate="no" className={cn("notranslate min-h-[150px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl border relative overflow-hidden backdrop-blur-md shadow-inner transition-all", theme.innerBoxClass)}>
                        <div className={cn("absolute right-3 bottom-2 opacity-10 text-5xl select-none font-serif pointer-events-none", theme.accentColor)}>
                          ❦
                        </div>

                        {/* --- 1. ORIGINAL SCRIPT VIEW --- */}
                        {currentTab === 'original' && (
                          <div translate="no" className="notranslate w-full flex flex-col justify-between flex-1">
                            <div className={cn("space-y-2.5 w-full max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500/30", poem.direction === 'rtl' ? "text-right" : "text-left")}>
                              {poem.originalText
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p
                                  key={idx}
                                  translate="no"
                                  className={cn(
                                    "notranslate leading-relaxed break-words",
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
                              translate="no"
                              className={cn(
                                "notranslate mt-4 pt-2.5 border-t border-amber-500/20 flex items-center gap-2",
                                poem.direction === 'rtl' ? "justify-end text-right" : "justify-start text-left"
                              )}
                              dir={poem.direction}
                            >
                              {poem.direction === 'rtl' ? (
                                <>
                                  <span translate="no" className="notranslate text-[11px] text-slate-400">({poem.poetOrigin || poem.poet})</span>
                                  <span translate="no" className="notranslate font-urdu text-sm sm:text-base font-extrabold text-amber-300">
                                    — {poem.poetUrdu}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span translate="no" className="notranslate font-serif text-xs sm:text-sm font-bold text-amber-300">
                                    — {poem.poet}
                                  </span>
                                  <span translate="no" className="notranslate text-[11px] text-slate-400">({poem.poetOrigin || poem.poetEra})</span>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 2. URDU TRANSLATION VIEW --- */}
                        {currentTab === 'urdu' && (
                          <div translate="no" className="notranslate w-full flex flex-col justify-between flex-1 text-right" dir="rtl">
                            <div className="space-y-2.5 w-full max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500/30 text-right">
                              {(poem.urduTranslation || poem.originalText)
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p key={idx} translate="no" className="notranslate font-urdu text-lg sm:text-xl text-amber-100 leading-relaxed break-words">
                                  {line}
                                </p>
                              ))}
                            </div>

                            <div translate="no" className="notranslate mt-4 pt-2.5 border-t border-amber-500/20 flex items-center justify-end gap-2 text-right">
                              <span translate="no" className="notranslate text-[11px] text-slate-400">({poem.poet})</span>
                              <span translate="no" className="notranslate font-urdu text-sm sm:text-base font-extrabold text-amber-300">
                                — {poem.poetUrdu}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* --- 3. ROMAN URDU VIEW --- */}
                        {currentTab === 'roman' && (
                          <div translate="no" className="notranslate w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500/30">
                              {poem.romanText
                                .split('\n')
                                .filter((line) => line.trim() && !line.includes('شعر نمبر') && !line.startsWith('—'))
                                .map((line, idx) => (
                                <p key={idx} translate="no" className="notranslate text-xs sm:text-sm text-slate-200 font-medium italic break-words">
                                  {line.split(' — ')[0]}
                                </p>
                              ))}
                            </div>

                            <div translate="no" className="notranslate mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span translate="no" className="notranslate font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span translate="no" className="notranslate text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 4. ENGLISH TRANSLATION VIEW --- */}
                        {currentTab === 'english' && (
                          <div translate="no" className="notranslate w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500/30">
                              {poem.englishTranslation.split('\n').map((line, idx) => (
                                <p key={idx} translate="no" className="notranslate text-xs sm:text-sm text-slate-300 leading-relaxed font-sans break-words">
                                  {line}
                                </p>
                              ))}
                              {poem.meaning && (
                                <p translate="no" className="notranslate text-[11px] text-amber-400/90 mt-2 pt-1.5 border-t border-slate-800">
                                  💡 <strong>Context:</strong> {poem.meaning}
                                </p>
                              )}
                            </div>

                            <div translate="no" className="notranslate mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span translate="no" className="notranslate font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span translate="no" className="notranslate text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- 5. CONTEXT & MEANING VIEW --- */}
                        {currentTab === 'meaning' && (
                          <div translate="no" className="notranslate w-full flex flex-col justify-between flex-1 text-left" dir="ltr">
                            <div className="space-y-2 w-full">
                              <p translate="no" className="notranslate text-xs sm:text-sm text-amber-200/95 leading-relaxed font-sans break-words">
                                {poem.meaning || poem.englishTranslation}
                              </p>
                              {poem.tags && poem.tags.length > 0 && (
                                <div translate="no" className="notranslate flex flex-wrap gap-1 pt-1.5">
                                  {poem.tags.map((t, idx) => (
                                    <span key={idx} translate="no" className="notranslate text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div translate="no" className="notranslate mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-start gap-2 text-left" dir="ltr">
                              <span translate="no" className="notranslate font-serif text-xs sm:text-sm font-bold text-amber-300">
                                — {poem.poet}
                              </span>
                              {poem.poetUrdu && (
                                <span translate="no" className="notranslate text-xs font-urdu text-emerald-400">({poem.poetUrdu})</span>
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

                        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleDownloadFlyer(poem)}
                            disabled={isGeneratingFlyer === poem.id || generatingVideoId === poem.id}
                            className={cn(
                              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shrink-0",
                              isGeneratingFlyer === poem.id
                                ? "bg-amber-500/25 text-amber-200 border-amber-400/50 cursor-wait animate-pulse shadow-sm shadow-amber-500/20"
                                : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 cursor-pointer active:scale-95"
                            )}
                            title={isUrdu ? 'کارڈ ڈاؤن لوڈ کریں (تصویر)' : 'Download High-Resolution Story Card (Image)'}
                          >
                            {isGeneratingFlyer === poem.id ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin text-amber-300" />
                                <span>{isUrdu ? 'کارڈ بن رہا ہے...' : 'Generating...'}</span>
                              </>
                            ) : (
                              <>
                                <Download className="size-3.5" />
                                <span>{isUrdu ? 'تصویر' : 'Image'}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadPoetryVideo(poem)}
                            disabled={generatingVideoId === poem.id || isGeneratingFlyer === poem.id}
                            className={cn(
                              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shrink-0",
                              generatingVideoId === poem.id
                                ? "bg-rose-500/25 text-rose-200 border-rose-400/50 cursor-wait animate-pulse shadow-sm shadow-rose-500/20"
                                : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30 cursor-pointer active:scale-95"
                            )}
                            title={isUrdu ? 'شاعری کی متحرک ویڈیو ڈاؤنلوڈ کریں' : 'Download Animated Video (MP4 for WhatsApp Status / Reels)'}
                          >
                            {generatingVideoId === poem.id ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin text-rose-300" />
                                <span>{videoProgress > 0 ? `${videoProgress}%` : (isUrdu ? 'ویڈیو بن رہی ہے...' : 'Making...')}</span>
                              </>
                            ) : (
                              <>
                                <Video className="size-3.5 text-rose-400" />
                                <span>{isUrdu ? 'ویڈیو' : 'Video (MP4)'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* --- PAGINATION BAR --- */}
            {totalPages > 1 ? (
              <div className="mt-12 pt-6 border-t border-slate-800/90 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {/* First Page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="size-9 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    title={isUrdu ? 'پہلا صفحہ' : 'First Page'}
                    aria-label="First Page"
                  >
                    <ChevronsLeft className="size-4" />
                  </button>

                  {/* Previous Page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 h-9 rounded-xl border border-amber-500/30 bg-slate-900/90 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title={isUrdu ? 'پچھلا صفحہ' : 'Previous Page'}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">{isUrdu ? 'پچھلا' : 'Prev'}</span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((p, idx) => {
                      if (typeof p === 'string') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-1.5 text-slate-500 text-xs select-none">
                            •••
                          </span>
                        )
                      }
                      const isActive = p === currentPage
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={cn(
                            "min-w-9 h-9 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center",
                            isActive
                              ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25 ring-2 ring-amber-400/50 scale-105"
                              : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80"
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 h-9 rounded-xl border border-amber-500/30 bg-slate-900/90 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title={isUrdu ? 'اگلا صفحہ' : 'Next Page'}
                    aria-label="Next Page"
                  >
                    <span className="hidden sm:inline">{isUrdu ? 'اگلا' : 'Next'}</span>
                    <ChevronRight className="size-4" />
                  </button>

                  {/* Last Page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="size-9 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    title={isUrdu ? 'آخری صفحہ' : 'Last Page'}
                    aria-label="Last Page"
                  >
                    <ChevronsRight className="size-4" />
                  </button>
                </div>

                {/* Quick Page Jump & Page Summary */}
                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap justify-center">
                  <span>
                    {isUrdu ? (
                      <>صفحہ <strong className="text-amber-300 font-bold">{currentPage}</strong> از <strong className="text-white font-bold">{totalPages}</strong></>
                    ) : (
                      <>Page <strong className="text-amber-300 font-bold">{currentPage}</strong> of <strong className="text-white font-bold">{totalPages}</strong></>
                    )}
                  </span>
                  {totalPages > 4 && (
                    <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
                      <span>{isUrdu ? 'براہ راست صفحہ:' : 'Jump to:'}</span>
                      <select
                        value={currentPage}
                        onChange={(e) => handlePageChange(Number(e.target.value))}
                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-bold text-xs cursor-pointer focus:outline-hidden focus:border-amber-500"
                        aria-label="Jump to page"
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                          <option key={pNum} value={pNum}>
                            {isUrdu ? `صفحہ ${pNum}` : `Page ${pNum}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ) : filteredPoems.length > 0 ? (
              <div className="text-center py-6 mt-6 border-t border-slate-800/80">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/30 px-3.5 py-1.5 rounded-full font-medium">
                  ✓ {isUrdu ? `تمام ${filteredPoems.length} اشعار لوڈ ہو چکے ہیں` : `All ${filteredPoems.length} matching verses loaded`}
                </span>
              </div>
            ) : null}
          </>
        )}
      </main>
    </div>
  )
}
