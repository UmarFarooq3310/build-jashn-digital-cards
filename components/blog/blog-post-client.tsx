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
} from 'lucide-react'
import { BLOG_POSTS, getLocalizedPost, type BlogPost } from '@/lib/blog/data'
import { useLang } from '@/lib/lang/context'
import { useState } from 'react'
import { AdBanner } from '@/components/ad-banner'

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
  createCTA: {
    en: 'Create Your Royal Digital Card',
    ur: 'اپنا شاہی ڈیجیٹل کارڈ بنائیں',
    ar: 'أنشئ بطاقتك الرقمية الملكية',
    es: 'Crea Tu Tarjeta Digital Real',
    fr: 'Créez Votre Carte Numérique Royale',
    hi: 'अपना रॉयल डिजिटल कार्ड बनाएं',
    zh: '创建您的皇家数字卡片',
    pt: 'Crie o Seu Cartão Digital Real',
    ru: 'Создайте свою королевскую цифровую карту',
    de: 'Erstellen Sie Ihre königliche digitale Karte',
    ja: 'ロイヤルデジタルカードを作成',
    ko: '로열 디지털 카드 만들기',
    it: 'Crea il Tuo Biglietto Digitale Reale',
    tr: 'Kraliyet Dijital Kartınızı Oluşturun',
    id: 'Buat Kartu Digital Mewah Anda',
    bn: 'আপনার রাজকীয় ডিজিটাল কার্ড তৈরি করুন',
    vi: 'Tạo Thiệp Kỹ Thuật Số Hoàng Gia Của Bạn',
    sw: 'Tengeneza Kadi Yako ya Kidijitali ya Kifalme',
  },
}

export function BlogPostClient({ initialPost }: { initialPost: BlogPost }) {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)

  const post = getLocalizedPost(initialPost, lang)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => getLocalizedPost(p, lang))

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
        {/* Post Header Banner */}
        <div className="relative py-12 md:py-20 border-b border-[#D4AF37]/20 bg-[radial-gradient(50%_50%_at_50%_20%,rgba(212,175,55,0.15),transparent_70%)]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
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
                {post.publishedAt}
              </span>
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

            {/* Author Profile */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-black text-base">
                  {post.author.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {post.author.name}
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <div className="text-xs text-zinc-400">{post.author.role}</div>
                </div>
              </div>

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

        {/* Featured Image */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[16/9] bg-slate-900">
            <img 
              src={post.featuredImage} 
              alt={post.title.slice(0, 90)} 
              width={1200}
              height={630}
              loading="lazy"
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Post Content Layout */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
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
              {post.content.intro}
            </div>

            {/* Sections */}
            {post.content.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 pt-4 border-t border-white/10 scroll-mt-24">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>{section.title}</span>
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">{section.body}</p>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlight && (
                  <div className="p-4 rounded-2xl border border-[#D4AF37]/40 bg-[#0a0a0c] text-xs font-bold text-[#D4AF37] shadow-inner">
                    💡 {section.highlight}
                  </div>
                )}
              </section>
            ))}

            {/* Ad Banner placement */}
            <AdBanner format="display" className="my-8 mx-auto max-w-4xl px-4" />

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
                {post.content.conclusion}
              </p>
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
                      alt={rel.title.slice(0, 90)}
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
