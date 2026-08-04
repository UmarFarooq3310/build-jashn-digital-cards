'use client'

import Link from 'next/link'
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen, Crown } from 'lucide-react'
import { BLOG_POSTS, getLocalizedPost } from '@/lib/blog/data'
import { useLang } from '@/lib/lang/context'

const BLOG_UI_STRINGS: Record<string, Record<string, string>> = {
  badge: {
    en: 'Cardzy Knowledge Hub & Guides',
    ur: 'کارڈزی گائیڈز اور معلومات',
    ar: 'مركز معلومات و أدلة كاردزي',
    es: 'Centro de Conocimiento y Guías Cardzy',
    fr: 'Centre de Connaissances & Guides Cardzy',
    hi: 'कार्डज़ी नॉलेज हब और गाइड',
    zh: 'Cardzy 知识中心与指南',
    pt: 'Centro de Conhecimento e Guias Cardzy',
    ru: 'Центр знаний и руководств Cardzy',
    de: 'Cardzy Wissen & Anleitungen',
    ja: 'Cardzyナレッジハブ＆ガイド',
    ko: 'Cardzy 지식 센터 & 가이드',
    it: 'Centro di Conoscenza e Guide Cardzy',
    tr: 'Cardzy Bilgi Merkezi ve Rehberler',
    id: 'Pusat Pengetahuan & Panduan Cardzy',
    bn: 'কার্ডজি নলেজ হাব এবং গাইড',
    vi: 'Trung Tâm Kiến Thức & Hướng Dẫn Cardzy',
    sw: 'Kituo cha Maarifa na Miongozo cha Cardzy',
  },
  heroTitle: {
    en: 'Digital Cards, Event Planning',
    ur: 'ڈیجیٹل کارڈز اور تقاریب کی گائیڈز',
    ar: 'البطاقات الرقمية وتخطيط المناسبات',
    es: 'Tarjetas Digitales y Planificación de Eventos',
    fr: 'Cartes Numériques & Organisation d’Événements',
    hi: 'डिजिटल कार्ड और इवेंट प्लानिंग',
    zh: '数字贺卡、活动策划',
    pt: 'Cartões Digitais e Planeamento de Eventos',
    ru: 'Цифровые карты и организация событий',
    de: 'Digitale Karten & Event-Planung',
    ja: 'デジタルカード、イベント企画',
    ko: '디지털 카드, 이벤트 기획',
    it: 'Biglietti Digitali e Pianificazione Eventi',
    tr: 'Dijital Kartlar ve Etkinlik Planlama',
    id: 'Kartu Digital, Perencanaan Acara',
    bn: 'ডিজিটাল কার্ড, অনুষ্ঠান পরিকল্পনা',
    vi: 'Thiệp Kỹ Thuật Số & Lên Kế Hoạch Sự Kiện',
    sw: 'Kadi za Kidijitali na Mipango ya Sherehe',
  },
  heroHighlight: {
    en: '& Celebration Guides',
    ur: 'اور جشن مبارک باد گائیڈز',
    ar: 'وأدلة الاحتفالات والمناسبات',
    es: 'y Guías de Celebración',
    fr: 'et Guides de Célébration',
    hi: 'और उत्सव गाइड',
    zh: '与庆祝指南',
    pt: 'e Guias de Celebração',
    ru: 'и руководства по праздникам',
    de: '& Feier-Anleitungen',
    ja: '＆お祝いガイド',
    ko: '& 축하 가이드',
    it: 'e Guide alle Celebrazioni',
    tr: 've Kutlama Rehberleri',
    id: '& Panduan Perayaan',
    bn: 'এবং উৎসব নির্দেশিকা',
    vi: '& Hướng Dẫn Chúc Mừng',
    sw: 'na Miongozo ya Sherehe',
  },
  heroDesc: {
    en: 'Discover expert tips, bilingual invitation wording ideas, wedding RSVP strategies, and digital business card best practices for modern celebrations.',
    ur: 'اردو اور انگریزی کارڈ کی عبارات، ولیمے کی دعوت کے طریقے، اور واٹس ایپ آر ایس وی پی کی مکمل گائیڈز دیکھیں۔',
    ar: 'اكتشف أفضل النصائح لكتابة الدعوات، وإدارة الحضور عبر واتساب، وبطاقات الأعمال الرقمية الذكية.',
    es: 'Descubra consejos expertos, redactado bilingüe para invitaciones, estrategias de RSVP y mejores prácticas para tarjetas digitales.',
    fr: 'Découvrez des conseils d’experts, des idées de textes bilingues, la gestion RSVP et les meilleures pratiques pour cartes digitales.',
    hi: 'सुंदर निमंत्रण पत्र, शादी के संदेश, डिजिटल बिजनेस कार्ड और व्हाट्सएप आरएसवीपी गाइड पढ़ें।',
    zh: '探索专业建议、双语请柬用词灵感、婚礼 RSVP 确认策略与智能数字名片最佳实践。',
    pt: 'Descubra dicas de especialistas, ideias de textos bilíngues para convites, estratégias de RSVP e melhores práticas para cartões digitais.',
    ru: 'Откройте для себя советы экспертов, двуязычные тексты приглашений, стратегии RSVP и лучшие практики для цифровых визиток.',
    de: 'Entdecken Sie Experten-Tipps, zweisprachige Einladungstexte, WhatsApp-RSVP-Strategien und digitale Visitenkarten-Praktiken.',
    ja: '専門家のアドバイス、バイリンガル招待状文面、結婚式RSVP管理、デジタル名刺のベストプラクティスをご覧ください。',
    ko: '전문가 팁, 양국어 청첩장 문구 아이디어, 웨딩 RSVP 전략 및 디지털 명함 활용법을 확인하세요.',
    it: 'Scopri i consigli degli esperti, idee per inviti bilingui, strategie RSVP e migliori pratiche per biglietti da visita digitali.',
    tr: 'Uzman tavsiyelerini, iki dilli davetiye metinlerini, WhatsApp LCV taktiklerini ve dijital kartvizit rehberlerini keşfedin.',
    id: 'Temukan tips ahli, ide teks undangan bilingual, strategi RSVP pernikahan, dan panduan kartu bisnis digital.',
    bn: 'উর্দু ও ইংরেজি কার্ডের ভাষা, ওয়ালিমা দাওয়াত পদ্ধতি এবং হোয়াটসঅ্যাপ আরএসভিপির সম্পূর্ণ গাইড দেখুন।',
    vi: 'Khám phá lời khuyên chuyên gia, ý tưởng lời mời song ngữ, chiến lược RSVP đám cưới và danh thiếp kỹ thuật số.',
    sw: 'Gundua vidokezo vya wataalamu, maneno ya kadi kwa lugha mbili, mbinu za RSVP za harusi na miongozo ya kadi za biashara.',
  },
  featuredBadge: {
    en: 'Featured Master Guide',
    ur: 'نمایاں ماسٹر گائیڈ',
    ar: 'الدليل الرئيسي المميز',
    es: 'Guía Maestra Destacada',
    fr: 'Guide Maître En Vedette',
    hi: 'विशेष मास्टर गाइड',
    zh: '精选主打指南',
    pt: 'Guia Mestre em Destaque',
    ru: 'Главное руководство',
    de: 'Hervorgehobener Hauptleitfaden',
    ja: '注目マスターガイド',
    ko: '주요 추천 가이드',
    it: 'Guida Principale in Evidenza',
    tr: 'Öne Çıkan Ana Rehber',
    id: 'Panduan Utama Pilihan',
    bn: 'বিশেষ মাস্টার গাইড',
    vi: 'Hướng Dẫn Nổi Bật',
    sw: 'Mwongozo Mkuu Ulioteuliwa',
  },
  allArticles: {
    en: 'All Knowledge Articles & Guides',
    ur: 'تمام معلومات اور رہنمائی کے مضامین',
    ar: 'جميع المقالات والأدلة التعليمية',
    es: 'Todos los Artículos y Guías',
    fr: 'Tous Les Articles et Guides',
    hi: 'सभी ज्ञान लेख और गाइड',
    zh: '所有知识文章与指南',
    pt: 'Todos os Artigos e Guias',
    ru: 'Все статьи и руководства',
    de: 'Alle Wissensartikel & Anleitungen',
    ja: 'すべてのナレッジ記事＆ガイド',
    ko: '모든 지식 아티클 & 가이드',
    it: 'Tutti gli Articoli e le Guide',
    tr: 'Tüm Bilgi Makaleleri ve Rehberler',
    id: 'Semua Artikel Pengetahuan & Panduan',
    bn: 'সমস্ত তথ্য এবং নির্দেশিকা নিবন্ধ',
    vi: 'Tất Cả Bài Viết & Hướng Dẫn',
    sw: 'Makala Yote ya Maarifa na Miongozo',
  },
  readArticle: {
    en: 'Read Article',
    ur: 'مکمل مضمون پڑھیں',
    ar: 'اقرأ المقال',
    es: 'Leer Artículo',
    fr: 'Lire L’Article',
    hi: 'लेख पढ़ें',
    zh: '阅读文章',
    pt: 'Ler Artigo',
    ru: 'Читать статью',
    de: 'Artikel Lesen',
    ja: '記事を読む',
    ko: '아티클 읽기',
    it: 'Leggi Articolo',
    tr: 'Makaleyi Oku',
    id: 'Baca Artikel',
    bn: 'নিবন্ধটি পড়ুন',
    vi: 'Đọc Bài Viết',
    sw: 'Soma Makala',
  },
}

export function BlogIndexClient() {
  const { lang } = useLang()

  const tUI = (key: string) => {
    return BLOG_UI_STRINGS[key]?.[lang] || BLOG_UI_STRINGS[key]?.en || key
  }

  const posts = BLOG_POSTS.map((post) => getLocalizedPost(post, lang))
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-[#07080c] text-white pb-20 selection:bg-[#D4AF37] selection:text-slate-950">
        {/* Top Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#D4AF37]/15 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(212,175,55,0.14),transparent_70%)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{tUI('badge')}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              {tUI('heroTitle')}{' '}
              <span className="bg-gradient-to-r from-white via-[#FFF8DC] to-[#D4AF37] bg-clip-text text-transparent">
                {tUI('heroHighlight')}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              {tUI('heroDesc')}
            </p>
          </div>
        </section>

        {/* Featured Article Section */}
        {featuredPost && (
          <section className="py-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{tUI('featuredBadge')}</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-[#D4AF37]/30 bg-[#0a0a0c]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.12)] hover:border-[#D4AF37]/60 transition-all duration-300"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 font-extrabold uppercase tracking-wider text-[10px]">
                    {featuredPost.category}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {featuredPost.publishedAt}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {featuredPost.seoTitle || featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed line-clamp-3">
                  {featuredPost.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    {featuredPost.author.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                    <div className="text-[11px] text-zinc-400">{featuredPost.author.role}</div>
                  </div>

                  <div className="ml-auto inline-flex items-center gap-2 text-xs font-extrabold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>{tUI('readArticle')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-slate-900">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title.slice(0, 90)}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </Link>
          </section>
        )}

        {/* Grid of Remaining Articles */}
        <section className="py-8 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>{tUI('allArticles')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0c]/90 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg backdrop-blur-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900 border-b border-white/10">
                  <img
                    src={post.featuredImage}
                    alt={post.title.slice(0, 90)}
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {post.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-[#D4AF37]">
                    <span>{tUI('readArticle')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
    </div>
  )
}
