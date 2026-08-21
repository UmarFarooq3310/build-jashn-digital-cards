'use client'

import Link from 'next/link'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  CheckCircle,
  Crown,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Award,
  UserCheck,
} from 'lucide-react'
import { BLOG_POSTS, getLocalizedPost, type BlogPost } from '@/lib/blog/data'
import { useLang } from '@/lib/lang/context'
import { useState } from 'react'
import { AdBanner } from '@/components/ad-banner'
import { Breadcrumbs } from '@/components/breadcrumbs'

const POST_UI_STRINGS: Record<string, Record<string, string>> = {
  backToBlog: {
    en: 'Back to All Guides & Articles',
    ur: 'تمام گائیڈز اور مضامین پر واپس جائیں',
    ar: 'العودة إلى جميع الأدلة والمقالات',
    es: 'Volver a Todas las Guías y Artículos',
    fr: 'Retour à Tous les Guides et Articles',
    hi: 'सभी गाइड और लेखों पर वापस जाएं',
    zh: '返回所有指南与文章',
    pt: 'Voltar a Todos os Guias e Artigos',
    ru: 'Назад ко всем руководствам и статьям',
    de: 'Zurück zu allen Anleitungen & Artikeln',
    ja: 'すべてのガイド＆記事に戻る',
    ko: '모든 가이드 & 아티클로 돌아가기',
    it: 'Torna a Tutte le Guide e gli Articoli',
    tr: 'Tüm Rehberlere ve Makalelere Dön',
    id: 'Kembali ke Semua Panduan & Artikel',
    bn: 'সমস্ত গাইড এবং নিবন্ধে ফিরে যান',
    vi: 'Quay Lại Tất Cả Hướng Dẫn & Bài Viết',
    sw: 'Rudi Kwenye Miongozo na Makala Yote',
  },
  tableOfContents: {
    en: 'Table of Contents',
    ur: 'فہرست عنوانات',
    ar: 'جدول المحتويات',
    es: 'Tabla de Contenidos',
    fr: 'Table des Matières',
    hi: 'सामग्री की तालिका',
    zh: '文章目录',
    pt: 'Índice de Conteúdos',
    ru: 'Содержание',
    de: 'Inhaltsverzeichnis',
    ja: '目次',
    ko: '목차',
    it: 'Indice dei Contenuti',
    tr: 'İçindekiler',
    id: 'Daftar Isi',
    bn: 'সূচিপত্র',
    vi: 'Mục Lục Bài Viết',
    sw: 'Yaliyomo',
  },
  faqTitle: {
    en: 'Frequently Asked Questions',
    ur: 'بار بار پوچھے گئے سوالات (FAQ)',
    ar: 'الأسئلة الشائعة',
    es: 'Preguntas Frecuentes',
    fr: 'Foire Aux Questions',
    hi: 'अक्सर पूछे जाने वाले प्रश्न',
    zh: '常见问题解答',
    pt: 'Perguntas Frequentes',
    ru: 'Часто задаваемые вопросы',
    de: 'Häufig gestellte Fragen',
    ja: 'よくある質問',
    ko: '자주 묻는 질문',
    it: 'Domande Frequenti',
    tr: 'Sıkça Sorulan Sorular',
    id: 'Pertanyaan yang Sering Diajukan',
    bn: 'সাধারণ জিজ্ঞাসা (FAQ)',
    vi: 'Câu Hỏi Thường Gặp',
    sw: 'Maswali Yanayoulizwa Mara Kwa Mara',
  },
  keyTakeaway: {
    en: 'Key Takeaway & Recommendation',
    ur: 'اہم ترین خلاصہ اور تجویز',
    ar: 'الخلاصة والتوصية الرئيسية',
    es: 'Resumen y Recomendación Clave',
    fr: 'Résumé et Recommandation Clé',
    hi: 'मुख्य निष्कर्ष और अनुशंसा',
    zh: '核心总结与建议',
    pt: 'Conclusão e Recomendação Principal',
    ru: 'Главный вывод и рекомендация',
    de: 'Wichtigstes Fazit & Empfehlung',
    ja: '要点とおすすめのポイント',
    ko: '핵심 요약 및 추천',
    it: 'Conclusione e Raccomandazione Chiave',
    tr: 'Önemli Çıkarım ve Tavsiye',
    id: 'Kesimpulan & Rekomendasi Utama',
    bn: 'প্রধান মূল কথা ও পরামর্শ',
    vi: 'Tóm Tắt & Lời Khuyên Chính',
    sw: 'Muhtasari na Mapendekezo Makuu',
  },
  shareArticle: {
    en: 'Share This Article',
    ur: 'یہ آرٹیکل شیئر کریں',
    ar: 'مشاركة هذا المقال',
    es: 'Compartir Este Artículo',
    fr: 'Partager Cet Article',
    hi: 'यह लेख शेयर करें',
    zh: '分享这篇文章',
    pt: 'Partilhar Este Artigo',
    ru: 'Поделиться этой статьей',
    de: 'Diesen Artikel teilen',
    ja: 'この記事をシェアする',
    ko: '이 아티클 공유하기',
    it: 'Condividi Questo Articolo',
    tr: 'Bu Makaleyi Paylaş',
    id: 'Bagikan Artikel Ini',
    bn: 'এই নিবন্ধটি শেয়ার করুন',
    vi: 'Chia Sẻ Bài Viết Này',
    sw: 'Shiriki Makala Hii',
  },
  copyLink: {
    en: 'Copy Article Link',
    ur: 'لینک کاپی کریں',
    ar: 'نسخ رابط المقال',
    es: 'Copiar Enlace',
    fr: 'Copier Le Lien',
    hi: 'लिंक कॉपी करें',
    zh: '复制文章链接',
    pt: 'Copiar Ligação',
    ru: 'Скопировать ссылку',
    de: 'Link kopieren',
    ja: 'リンクをコピー',
    ko: '링크 복사',
    it: 'Copia Link',
    tr: 'Bağlantıyı Kopyala',
    id: 'Salin Tautan',
    bn: 'লিংক কপি করুন',
    vi: 'Sao Chép Đường Dẫn',
    sw: 'Nakili Kiungo',
  },
  copied: {
    en: 'Link Copied!',
    ur: 'لینک کاپی ہو گیا!',
    ar: 'تم نسخ الرابط!',
    es: '¡Enlace Copiado!',
    fr: 'Lien Copié !',
    hi: 'लिंक कॉपी हो गया!',
    zh: '链接已复制！',
    pt: 'Ligação Copiada!',
    ru: 'Ссылка скопирована!',
    de: 'Link kopiert!',
    ja: 'コピーしました！',
    ko: '복사되었습니다!',
    it: 'Link Copiato!',
    tr: 'Bağlantı Kopyalandı!',
    id: 'Tautan Disalin!',
    bn: 'লিংক কপি হয়েছে!',
    vi: 'Đã Sao Chép!',
    sw: 'Imenakiliwa!',
  },
  relatedTitle: {
    en: 'Related Guides & Articles',
    ur: 'مزید متعلقہ گائیڈز اور مضامین',
    ar: 'أدلة ومقالات ذات صلة',
    es: 'Guías y Artículos Relacionados',
    fr: 'Guides et Articles Similaires',
    hi: 'संबंधित गाइड और लेख',
    zh: '相关指南与文章',
    pt: 'Guias e Artigos Relacionados',
    ru: 'Похожие руководства и статьи',
    de: 'Ähnliche Anleitungen & Artikel',
    ja: '関連ガイド＆記事',
    ko: '관련 가이드 & 아티클',
    it: 'Guide e Articoli Correlati',
    tr: 'İlgili Rehberler ve Makaleler',
    id: 'Panduan & Artikel Terkait',
    bn: 'সম্পর্কিত নির্দেশিকা এবং নিবন্ধ',
    vi: 'Hướng Dẫn & Bài Viết Liên Quan',
    sw: 'Miongozo na Makala Yanayohusiana',
  },
  aboutAuthor: {
    en: 'About the Author',
    ur: 'مصنف کے بارے میں',
    ar: 'عن الكاتب',
    es: 'Sobre el Autor',
    fr: 'À Propos de l’Auteur',
    hi: 'लेखक के बारे में',
    zh: '关于作者',
    pt: 'Sobre o Autor',
    ru: 'Об авторе',
    de: 'Über den Autor',
    ja: '著者について',
    ko: '저자 소개',
    it: 'Informazioni sull’Autore',
    tr: 'Yazar Hakkında',
    id: 'Tentang Penulis',
    bn: 'লেখক সম্পর্কে',
    vi: 'Về Tác Giả',
    sw: 'Kuhusu Mwandishi',
  },
  viewAllByAuthor: {
    en: 'View all guides by this author',
    ur: 'اس مصنف کے تمام مضامین دیکھیں',
    ar: 'عرض جميع أدلة الكاتب',
    es: 'Ver todas las guías del autor',
    fr: 'Voir tous les guides de cet auteur',
    hi: 'इस लेखक के सभी गाइड देखें',
    zh: '查看该作者的所有指南',
    pt: 'Ver todos os guias deste autor',
    ru: 'Все руководства автора',
    de: 'Alle Anleitungen dieses Autors',
    ja: 'この著者のすべての記事を見る',
    ko: '이 저자의 모든 가이드 보기',
    it: 'Vedi tutte le guide di questo autore',
    tr: 'Yazarın tüm rehberlerini gör',
    id: 'Lihat semua panduan penulis ini',
    bn: 'এই লেখকের সমস্ত গাইড দেখুন',
    vi: 'Xem tất cả hướng dẫn của tác giả này',
    sw: 'Tazama miongozo yote ya mwandishi huyu',
  },
}

const AUTHOR_BIOS: Record<string, { bio: string; location: string; credentials: string; instagram: string; tiktok: string }> = {
  'Cardzy Editorial Team': {
    bio: 'The Cardzy Editorial Team consists of certified digital stationery designers, cultural event planners, and multilingual invitation copywriters delivering expert wedding etiquette, RSVP workflows, and digital card guides.',
    location: 'Islamabad / Lahore, Pakistan',
    credentials: 'Lead Event & Stationery Specialists',
    instagram: 'https://www.instagram.com/cardzyonline',
    tiktok: 'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S',
  },
  'Umar Farooq': {
    bio: 'Senior Cultural Event & Wedding Stylist at Cardzy. Specializing in Pakistani, Islamic, and South Asian wedding traditions, bilingual invitation etiquette in Urdu & English, and WhatsApp RSVP management.',
    location: 'Islamabad / Rawalpindi, Pakistan',
    credentials: 'Lead Wedding & Cultural Stylist',
    instagram: 'https://www.instagram.com/cardzyonline',
    tiktok: 'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S',
  },
  Kainat: {
    bio: 'Tech & Product Strategist at Cardzy. Leading research on modern digital business cards, executive vCard protocols, and cost-effective digital invitation solutions for global professionals and businesses.',
    location: 'Lahore / Islamabad, Pakistan',
    credentials: 'Lead Product & Tech Strategist',
    instagram: 'https://www.instagram.com/cardzyonline',
    tiktok: 'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S',
  },
  Hasnain: {
    bio: 'Global Creative & Cultural Events Editor at Cardzy. Crafting guides on 3D animated holiday e-cards, birthday party invitations, and digital sharing etiquette across 18 languages.',
    location: 'Karachi / Islamabad, Pakistan',
    credentials: 'Global Events & Culture Editor',
    instagram: 'https://www.instagram.com/cardzyonline',
    tiktok: 'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S',
  },
}

function renderTextWithLinks(text: string) {
  if (!text) return null
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    const label = match[1]
    const href = match[2]
    const isExternal = href.startsWith('http://') || href.startsWith('https://')

    if (isExternal) {
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4AF37] hover:underline font-semibold underline-offset-2 inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      )
    } else {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="text-[#D4AF37] hover:underline font-semibold underline-offset-2"
        >
          {label}
        </Link>
      )
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export function BlogPostClient({ initialPost }: { initialPost: BlogPost }) {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)

  const post = getLocalizedPost(initialPost, lang)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => getLocalizedPost(p, lang))

  const authorSlug = post.author.name.toLowerCase().replace(/\s+/g, '-')
  const authorInfo = AUTHOR_BIOS[post.author.name] || AUTHOR_BIOS['Umar Farooq']

  const tUI = (key: string) => {
    return POST_UI_STRINGS[key]?.[lang] || POST_UI_STRINGS[key]?.en || key
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const isRtl = lang === 'ur' || lang === 'ar'

  return (
    <div className="min-h-screen bg-[#07080c] text-white pb-24 selection:bg-[#D4AF37] selection:text-slate-950">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          isDark
          items={[
            { label: 'Blog & Guides', href: '/blog' },
            { label: post.category, href: '/blog' },
            { label: post.seoTitle || post.title },
          ]}
        />
      </div>

      {/* Post Header Banner */}
      <div className="relative py-8 md:py-12 border-b border-[#D4AF37]/20 bg-[radial-gradient(50%_50%_at_50%_20%,rgba(212,175,55,0.15),transparent_70%)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#D4AF37] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tUI('backToBlog')}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 font-black uppercase text-[10px]">
              {post.category}
            </span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {post.readTime}
            </span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              Published: {post.publishedAt}
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span className="text-emerald-400/90 flex items-center gap-1 font-medium">
                • Updated: {post.updatedAt}
              </span>
            )}
          </div>

          <h1
            className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight ${
              isRtl ? 'dir-rtl font-serif' : ''
            }`}
          >
            {post.seoTitle || post.title}
          </h1>

          <p className={`text-base sm:text-lg text-zinc-300 leading-relaxed ${isRtl ? 'dir-rtl' : ''}`}>
            {post.subtitle}
          </p>

          {/* Author Profile Top Header Byline */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/authors/${authorSlug}`}
              className="flex items-center gap-3 group/author"
              title={`View author profile: ${post.author.name}`}
            >
              <div className="size-11 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-black text-base group-hover/author:border-[#D4AF37] transition-all shadow-md overflow-hidden shrink-0">
                <img
                  src={`/authors/${authorSlug}.svg`}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className="size-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 group-hover/author:text-[#D4AF37] transition-colors">
                  <span>{post.author.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded-sm">
                    Verified Author
                  </span>
                </div>
                <div className="text-xs text-zinc-400">{post.author.role}</div>
              </div>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{copied ? tUI('copied') : tUI('copyLink')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image Banner */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[16/9] bg-slate-900">
          <img
            src={post.featuredImage}
            alt={`${post.title} — Cardzy Featured Master Guide Header`}
            width={1200}
            height={630}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Post Content Layout */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#0a0a0c]/90 p-5 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#D4AF37] tracking-wider border-b border-white/10 pb-3">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{tUI('tableOfContents')}</span>
            </div>
            <nav className="space-y-2 text-xs">
              {post.content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-zinc-300 hover:text-[#D4AF37] transition-colors py-1 leading-snug truncate"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Article Body */}
        <article className={`lg:col-span-8 space-y-8 text-zinc-200 leading-relaxed text-base ${isRtl ? 'dir-rtl' : ''}`}>
          {/* Intro Paragraph */}
          <div className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-md text-base leading-relaxed text-zinc-100 font-medium">
            {renderTextWithLinks(post.content.intro)}
          </div>

          {/* Sections */}
          {post.content.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4 pt-4 border-t border-white/10 scroll-mt-24">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>{section.title}</span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">{renderTextWithLinks(section.body)}</p>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {section.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                      <span>{renderTextWithLinks(bp)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.highlight && (
                <div className="p-4 rounded-2xl border border-[#D4AF37]/40 bg-[#0a0a0c] text-xs font-bold text-[#D4AF37] shadow-inner">
                  💡 {renderTextWithLinks(section.highlight)}
                </div>
              )}
            </section>
          ))}

          {/* Ad Banner placement */}
          <AdBanner format="display" className="my-8 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

          {/* FAQs Section */}
          {post.content.faq && post.content.faq.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-6">
              <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-[#D4AF37]" />
                <span>{tUI('faqTitle')}</span>
              </h3>

              <div className="space-y-4">
                {post.content.faq.map((f, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0c]/80 space-y-2">
                    <h4 className="text-sm font-bold text-[#D4AF37]">Q: {f.question}</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaway & Conclusion */}
          <div className="p-6 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0a0a0c] via-[#D4AF37]/10 to-[#0a0a0c] space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>{tUI('keyTakeaway')}</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {renderTextWithLinks(post.content.conclusion)}
            </p>
          </div>

          {/* Author Box / Detailed Byline Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 bg-[#0a0a0c] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{tUI('aboutAuthor')}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="size-20 rounded-2xl bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-black text-2xl shrink-0 shadow-lg overflow-hidden">
                <img
                  src={`/authors/${authorSlug}.svg`}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-lg font-extrabold text-white">{post.author.name}</h4>
                  <CheckCircle className="size-4 text-[#D4AF37]" />
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {authorInfo.credentials}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {authorInfo.bio}
                </p>
                <div className="text-[11px] text-zinc-400 pt-1">
                  <span>📍 {authorInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`/authors/${authorSlug}`}
                className="inline-flex items-center gap-1.5 font-bold text-[#D4AF37] hover:underline"
              >
                <span>{tUI('viewAllByAuthor')}</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>

              <div className="flex items-center gap-3">
                <a
                  href={authorInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                >
                  Instagram <ExternalLink className="size-3" />
                </a>
                <span>•</span>
                <a
                  href={authorInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                >
                  TikTok <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#D4AF37]/20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <span>{tUI('relatedTitle')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0c] overflow-hidden hover:border-[#D4AF37]/50 transition-all p-5 space-y-3"
              >
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={rel.featuredImage}
                    alt={`${rel.title} — Related Cardzy Guide`}
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">{rel.category}</div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
