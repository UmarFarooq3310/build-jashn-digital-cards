'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Heart,
  Copy,
  Check,
  Feather,
  Sparkles,
  Share2,
  Download,
  BookOpen,
  Layers,
  Search,
} from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cn } from '@/lib/utils'

interface CuratedTreasuryVerse {
  id: string
  poet: string
  poetUrdu: string
  category: string
  themeBadge: string
  originalText: string
  translation: string
  mood: string
  verseId: string
}

const FEATURED_TREASURY_VERSES: CuratedTreasuryVerse[] = [
  {
    id: 'khudi-iqbal',
    poet: 'Allama Muhammad Iqbal',
    poetUrdu: 'علامہ محمد اقبال',
    category: 'خودی و حوصلہ',
    themeBadge: 'Khudi & Motivation',
    originalText: 'ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحان اور بھی ہیں',
    translation: 'Beyond these glittering stars lie yet other worlds; the trials of passionate love are not yet ended.',
    mood: 'Ambition & Self-Realization',
    verseId: 'poem-0001',
  },
  {
    id: 'ishq-ghalib',
    poet: 'Mirza Asadullah Khan Ghalib',
    poetUrdu: 'مرزا اسد اللہ خاں غالب',
    category: 'عشق و محبت',
    themeBadge: 'Ishq & Romance',
    originalText: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
    translation: 'Thousands of intense desires, each worth dying for; many of my yearnings were fulfilled, yet so few they still seem.',
    mood: 'Longing & Human Condition',
    verseId: 'poem-0021',
  },
  {
    id: 'umeed-faiz',
    poet: 'Faiz Ahmed Faiz',
    poetUrdu: 'فیض احمد فیض',
    category: 'امید و بہار',
    themeBadge: 'Hope & Renewal',
    originalText: 'گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے',
    translation: 'May the vernal breeze breathe vibrant hues into the blossoms; do return, so the garden of happiness may flourish once more.',
    mood: 'Gentle Optimism & Longing',
    verseId: 'poem-0041',
  },
  {
    id: 'sufi-bakhsh',
    poet: 'Mian Muhammad Bakhsh',
    poetUrdu: 'میاں محمد بخش',
    category: 'تصوف و پنجابی کلام',
    themeBadge: 'Punjabi Sufi Classic',
    originalText: 'اول حمد ثنا الٰہی جو مالک ہر ہر دا\nاس دا نام چتارن والا ہر دم رہندا تردا',
    translation: 'First praise belongs to the Almighty Creator, the Sovereign of all; whoever cherishes His divine Name sails unharmed through life.',
    mood: 'Spiritual Peace & Devotion',
    verseId: 'poem-0071',
  },
  {
    id: 'hikmat-rumi',
    poet: 'Jalaluddin Rumi',
    poetUrdu: 'مولانا جلال الدین رومی',
    category: 'حکمت و روحانیت',
    themeBadge: 'Persian Spiritual',
    originalText: 'بشنو از نی چون حکایت می‌کند\nوز جدایی‌ها شکایت می‌کند',
    translation: 'Listen to the reed flute as it laments, telling the deep tale of eternal separation from its divine origin.',
    mood: 'Soulful Contemplation',
    verseId: 'poem-0081',
  },
  {
    id: 'darwish-life',
    poet: 'Mahmoud Darwish',
    poetUrdu: 'محمود درویش',
    category: 'عربی شاہکار',
    themeBadge: 'Arabic Resilience',
    originalText: 'وَنَحْنُ نُحِبُّ الحَيَاةَ إِذَا مَا اسْتَطَعْنَا إِلَيْهَا سَبِيلا',
    translation: 'And we love life whenever we can find a way to it; we celebrate existence against all odds.',
    mood: 'Defiance, Hope & Life',
    verseId: 'poem-0091',
  },
]

const POETRY_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: {
    en: 'Back to Guides Hub',
    ur: 'واپس گائیڈز مرکز',
    ar: 'العودة إلى مركز الأدلة',
    es: 'Volver al Centro de Guías',
    fr: 'Retour au Centre des Guides',
    hi: 'गाइड्स हब पर वापस जाएं',
    zh: '返回指南中心',
    pt: 'Voltar ao Hub de Guias',
    ru: 'Назад в центр руководств',
    de: 'Zurück zur Anleitungsübersicht',
    ja: 'ガイドハブに戻る',
    ko: '가이드 허브로 돌아가기',
    it: 'Torna all\'Hub delle Guide',
    tr: 'Rehber Merkezine Dön',
    id: 'Kembali ke Pusat Panduan',
    bn: 'গাইডস হাবে ফিরে যান',
    vi: 'Quay Lại Trung Tâm Hướng Dẫn',
    sw: 'Rudi kwenye Kituo cha Miongozo',
  },
  badge: {
    en: 'Poetry Treasury & Story Cards Guide',
    ur: 'شاعری و اسٹوری کارڈز گائیڈ',
    ar: 'دليل خزانة الشعر وبطاقات القصة',
    es: 'Guía del Tesoro Poético y Tarjetas Story',
    fr: 'Guide du Trésor Poétique et Cartes Story',
    hi: 'कविता संग्रह और स्टोरी कार्ड्स गाइड',
    zh: '诗歌宝库与故事卡片全指南',
    pt: 'Guia do Tesouro Poético e Story Cards',
    ru: 'Руководство по поэтической сокровищнице и сторис-открыткам',
    de: 'Poesie-Schatzkammer & Story-Karten Guide',
    ja: '名詩ライブラリ＆ストーリーカードガイド',
    ko: '명시 컬렉션 & 스토리 카드 완벽 가이드',
    it: 'Guida al Tesoro Poetico e Carte Story',
    tr: 'Şiir Hazinesi ve Hikaye Kartları Rehberi',
    id: 'Panduan Khazanah Puisi & Kartu Cerita',
    bn: 'কবিতা সংগ্রহ ও স্টোরি কার্ড গাইড',
    vi: 'Hướng Dẫn Kho Tàng Thơ Ca & Thiệp Câu Chuyện',
    sw: 'Mwongozo wa Hazina ya Mashairi na Kadi za Hadithi',
  },
  title: {
    en: 'The Complete Guide to Cardzy’s 1,000+ Poetry Treasury & Royal Story Cards',
    ur: 'کارڈزی کا 1,000+ شاعری گنجینہ: اشعار کی تلاش، رائل اسٹوری کارڈز اور واٹس ایپ شیئرنگ کی مکمل گائیڈ',
    ar: 'الدليل الشامل لخزانة Cardzy التي تضم أكثر من 1000 بيت شعر وبطاقات القصص الملكية',
    es: 'Guía Completa del Tesoro de Más de 1,000 Poemas y Tarjetas Reales de Cardzy',
    fr: 'Le Guide Complet du Trésor Poétique de 1 000+ Vers et Cartes Royales de Cardzy',
    hi: 'Cardzy का 1,000+ शायरी खजाना: शेर की खोज, रॉयल स्टोरी कार्ड्स और व्हाट्सएप शेयरिंग गाइड',
    zh: 'Cardzy 1,000+ 经典诗篇宝库与皇家故事卡片全景指南',
    pt: 'O Guia Completo do Tesouro de Mais de 1.000 Poemas e Cartões Reais do Cardzy',
    ru: 'Полный гид по поэтической сокровищнице Cardzy из 1000+ стихов и королевским сторис-открыткам',
    de: 'Der umfassende Leitfaden zu Cardzys Poesie-Sammlung mit 1.000+ Versen und königlichen Story-Karten',
    ja: 'Cardzyの1,000編以上の名詩コレクション＆ロイヤルストーリーカード完全ガイド',
    ko: 'Cardzy의 1,000개 이상의 명시 컬렉션과 로열 스토리 카드 완벽 가이드',
    it: 'La Guida Completa alla Raccolta di Oltre 1.000 Poesie e Carte Story Reali di Cardzy',
    tr: 'Cardzy\'nin 1.000\'den Fazla Şiir Hazinesi ve Asil Hikaye Kartları Rehberi',
    id: 'Panduan Lengkap untuk Khazanah 1.000+ Puisi & Kartu Cerita Mewah Cardzy',
    bn: 'Cardzy-র ১,০০০+ কবিতার অমূল্য ভাণ্ডার এবং রাজকীয় স্টোরি কার্ডের পরিপূর্ণ নির্দেশিকা',
    vi: 'Cẩm Nang Toàn Diện Về Kho Tàng 1.000+ Bài Thơ & Thiệp Câu Chuyện Hoàng Gia Của Cardzy',
    sw: 'Mwongozo Kamili wa Hazina ya Mashairi 1,000+ na Kadi za Kifalme za Cardzy',
  },
  subtitle: {
    en: 'Discover how to explore 1,000+ verified verses across Urdu, Punjabi, Persian, Arabic, and English. Learn to filter by poet and theme, download 1080px luxury story cards, and share poetry seamlessly.',
    ur: 'علامہ اقبال، مرزا غالب، فیض اور رومی کے منتخب اشعار دریافت کریں، 1-کلک میں خوبصورت اسٹوری کارڈز ڈاؤن لوڈ کریں اور واٹس ایپ پر شیئر کریں۔',
    ar: 'اكتشف كيفية تصفح أكثر من 1000 بيت شعر محقق باللغات الأردية والبنجابية والفارسية والعربية والإنجليزية مع تحميل بطاقات عالية الدقة ومشاركتها عبر واتساب.',
    es: 'Descubre más de 1,000 versos verificados en urdu, punjabi, persa, árabe e inglés. Filtra por poeta y tema, descarga tarjetas de lujo en 1080px y comparte fácilmente.',
    fr: 'Découvrez plus de 1 000 vers vérifiés en ourdou, pendjabi, persan, arabe et anglais. Filtrez par poète et thème, téléchargez des cartes luxueuses en 1080px et partagez-les en un clic.',
    hi: 'उर्दू, पंजाबी, फारसी, अरबी और अंग्रेजी के 1,000+ प्रामाणिक शेर खोजें। कवि और थीम अनुसार फ़िल्टर करें और 1080px स्टोरी कार्ड डाउनलोड करें।',
    zh: '探索乌尔都语、旁遮普语、波斯语、阿拉伯语与英语的1000多首精选诗篇，按诗人与主题智能筛选，一键下载1080px奢华故事卡片。',
    pt: 'Explore mais de 1.000 versos verificados em urdu, punjabi, persa, árabe e inglês. Filtre por poeta e tema, baixe cartões de luxo em 1080px e compartilhe.',
    ru: 'Откройте для себя более 1000 проверенных стихов на урду, панджаби, персидском, арабском и английском языках. Скачивайте открытки 1080px в один клик.',
    de: 'Entdecken Sie über 1.000 verifizierte Verse auf Urdu, Punjabi, Persisch, Arabisch und Englisch. Filtern Sie nach Dichtern und Themen und laden Sie Story-Karten herunter.',
    ja: 'ウルドゥー語、パンジャブ語、ペルシャ語、アラビア語、英語にわたる1,000以上の名詩を探索。詩人やテーマ別に検索し、高画質カードを保存できます。',
    ko: '우르두어, 펀자브어, 페르시아어, 아랍어, 영어로 구성된 1,000개 이상의 명시를 탐색하고 1080px 고화질 스토리 카드를 바로 다운로드하세요.',
    it: 'Scopri oltre 1.000 versi verificati in urdu, punjabi, persiano, arabo e inglese. Filtra per autore e tema, scarica eleganti carte in 1080px e condividi.',
    tr: 'Urduca, Pencapça, Farsça, Arapça ve İngilizce dillerinde 1.000\'den fazla doğrulanmış şiiri keşfedin. Şaire göre filtreleyin ve 1080px kartlar indirin.',
    id: 'Temukan lebih dari 1.000 bait puisi terverifikasi dalam bahasa Urdu, Punjabi, Persia, Arab, dan Inggris. Unduh kartu mewah 1080px dalam sekali sentuh.',
    bn: 'উর্দু, পাঞ্জাবি, ফার্সি, আরবি এবং ইংরেজিতে ১,০০০+ পরীক্ষিত কবিতা আবিষ্কার করুন, কবি ও বিষয়ভিত্তিক ফিল্টার করুন এবং বিলাসবহুল কার্ড ডাউনলোড করুন।',
    vi: 'Khám phá hơn 1.000 câu thơ tuyển chọn bằng tiếng Urdu, Punjabi, Ba Tư, Ả Rập và Anh. Lọc theo nhà thơ, tải thiệp 1080px và chia sẻ dễ dàng.',
    sw: 'Gundua zaidi ya mashairi 1,000 yaliyothibitishwa kwa Kiurdu, Kipunjabi, Kiajemi, Kiarabu na Kiingereza na upakue kadi maridadi za 1080px.',
  },
  publishedDate: {
    en: 'Published September 24, 2026',
    ur: 'شائع ہوا: 24 ستمبر 2026',
    ar: 'تاريخ النشر: 24 سبتمبر 2026',
    es: 'Publicado el 24 de septiembre de 2026',
    fr: 'Publié le 24 septembre 2026',
    hi: 'प्रकाशित: 24 सितंबर 2026',
    zh: '发布于 2026年9月24日',
    pt: 'Publicado em 24 de setembro de 2026',
    ru: 'Опубликовано 24 сентября 2026 г.',
    de: 'Veröffentlicht am 24. September 2026',
    ja: '2026年9月24日公開',
    ko: '2026년 9월 24일 작성됨',
    it: 'Pubblicato il 24 settembre 2026',
    tr: 'Yayınlanma: 24 Eylül 2026',
    id: 'Diterbitkan 24 September 2026',
    bn: 'প্রকাশের তারিখ: ২৪ সেপ্টেম্বর, ২০২৬',
    vi: 'Đăng ngày 24 tháng 9 năm 2026',
    sw: 'Ilichapishwa 24 Septemba 2026',
  },
  readTime: {
    en: '6 min read',
    ur: '6 منٹ مطالعہ',
    ar: '6 دقائق قراءة',
    es: '6 min de lectura',
    fr: '6 min de lecture',
    hi: '6 मिनट का पाठ',
    zh: '6 分钟阅读',
    pt: '6 min de leitura',
    ru: '6 мин чтения',
    de: '6 Min. Lesezeit',
    ja: '6分で読める',
    ko: '6분 소요',
    it: '6 min di lettura',
    tr: '6 dk okuma',
    id: '6 menit baca',
    bn: '৬ মিনিট পাঠ',
    vi: '6 phút đọc',
    sw: 'dakika 6 za kusoma',
  },
  author: {
    en: 'By Umar Farooq (Cultural Stylist)',
    ur: 'تحریر: عمر فاروق (ثقافتی نگار)',
    ar: 'بقلم عمر فاروق (باحث ثقافي)',
    es: 'Por Umar Farooq (Estilista Cultural)',
    fr: 'Par Umar Farooq (Chroniqueur Culturel)',
    hi: 'उमर फारूक (सांस्कृतिक विशेषज्ञ) द्वारा',
    zh: 'Umar Farooq 撰写（文化学者）',
    pt: 'Por Umar Farooq (Estilista Cultural)',
    ru: 'Автор: Умар Фарук (культуролог)',
    de: 'Von Umar Farooq (Kulturkurator)',
    ja: 'Umar Farooq（カルチャースタイリスト）による執筆',
    ko: 'Umar Farooq 작성 (문화 큐레이터)',
    it: 'Di Umar Farooq (Curatore Culturale)',
    tr: 'Umar Farooq Tarafından (Kültür Yazarı)',
    id: 'Oleh Umar Farooq (Kurator Budaya)',
    bn: 'উমর ফারুক (সাংস্কৃতিক গবেষক) কর্তৃক',
    vi: 'Bởi Umar Farooq (Chuyên Gia Văn Hóa)',
    sw: 'Na Umar Farooq (Mwanazuoni wa Utamaduni)',
  },
  sec1Title: {
    en: '1. What is Cardzy’s 1,000+ Poetry Treasury?',
    ur: '1. کارڈزی شاعری گنجینہ کیا ہے؟',
    ar: '1. ما هي خزانة شعر Cardzy التي تضم أكثر من 1000 بيت؟',
    es: '1. ¿Qué es el Tesoro Poético de Más de 1,000 Versos de Cardzy?',
    fr: '1. Qu\'est-ce que le Trésor Poétique de 1 000+ Vers de Cardzy ?',
    hi: '1. Cardzy का 1,000+ शायरी खजाना क्या है?',
    zh: '1. 什么是 Cardzy 1,000+ 经典诗篇宝库？',
    pt: '1. O que é o Tesouro de Mais de 1.000 Poemas do Cardzy?',
    ru: '1. Что представляет собой поэтическая сокровищница Cardzy?',
    de: '1. Was ist Cardzys Poesie-Schatzkammer mit 1.000+ Versen?',
    ja: '1. Cardzyの1,000編以上の名詩ライブラリとは？',
    ko: '1. Cardzy의 1,000개 이상의 명시 컬렉션이란?',
    it: '1. Cos\'è la Raccolta di Oltre 1.000 Poesie di Cardzy?',
    tr: '1. Cardzy\'nin 1.000\'den Fazla Şiir Hazinesi Nedir?',
    id: '1. Apa itu Khazanah 1.000+ Puisi Cardzy?',
    bn: '১. Cardzy-র ১,০০০+ কবিতার অমূল্য ভাণ্ডার কী?',
    vi: '1. Kho Tàng 1.000+ Bài Thơ Tuyển Chọn Cardzy Là Gì?',
    sw: '1. Hazina ya Mashairi 1,000+ ya Cardzy ni Nini?',
  },
  sec1Desc: {
    en: 'Cardzy’s Poetry Treasury is a dedicated, authentic literary archive featuring over 1,000 non-duplicated classical and modern verses. Curated directly from historical divans and verified manuscripts, it brings together Urdu, Punjabi, Persian, Arabic, and English literature into a fast, mobile-friendly interface designed for reading, discovering, and sharing.',
    ur: 'کارڈزی پوئیٹری ٹریژری انٹرنیٹ کی سب سے معتبر اور جدید ڈیجیٹل شاعری لائبریری ہے۔ یہاں 1,000 سے زائد غیر مکرر اشعار اور نظمیں اردو، پنجابی، فارسی، عربی اور انگریزی میں مستند دیوانوں سے جمع کی گئی ہیں۔ علامہ اقبال کے فلسفہ خودی سے لے کر غالب کے شوخ انداز اور میاں محمد بخش کے صوفیانہ کلام تک، ہر شعر تصدیق شدہ اور محفوظ ہے۔',
    ar: 'تعد خزانة شعر Cardzy أرشيفاً أدبياً أصيلاً يضم أكثر من 1000 بيت شعر كلاسيكي وحديث بدون أي تكرار، مأخوذة مباشرة من الدواوين التاريخية الموثوقة باللغات الأردية والبنجابية والفارسية والعربية والإنجليزية في منصة عصرية فائقة السرعة.',
    es: 'El Tesoro Poético de Cardzy es un archivo literario auténtico con más de 1,000 versos clásicos y modernos sin duplicados, extraídos directamente de manuscritos y poemarios históricos en urdu, punjabi, persa, árabe e inglés.',
    fr: 'Le Trésor Poétique de Cardzy est une archive littéraire authentique regroupant plus de 1 000 vers classiques et modernes sans aucun doublon, extraits directement de recueils historiques vérifiés.',
    hi: 'Cardzy का शायरी खजाना एक प्रामाणिक साहित्यिक संग्रह है जिसमें बिना किसी दोहराव के 1,000 से अधिक कालजयी शेर शामिल हैं। यह उर्दू, पंजाबी, फारसी, अरबी और अंग्रेजी के उत्कृष्ट कलाम को प्रस्तुत करता है।',
    zh: 'Cardzy 诗歌宝库是一座严谨纯粹的文学殿堂，收录了1000多首去重、经过考证的经典与现代诗篇。直接甄选自权威古籍善本与历代诗集，涵盖乌尔都、波斯、阿拉伯与英语文学。',
    pt: 'O Tesouro Poético do Cardzy é um arquivo literário autêntico que reúne mais de 1.000 versos clássicos e contemporâneos sem repetições, selecionados diretamente de fontes históricas confiáveis.',
    ru: 'Сокровищница поэзии Cardzy — это подлинный литературный архив из более чем 1000 уникальных классических и современных стихов без дубликатов, собранных из проверенных исторических сборников.',
    de: 'Cardzys Poesie-Schatzkammer ist ein authentisches Literaturarchiv mit über 1.000 unikalen klassischen und modernen Versen aus verifizierten Manuskripten.',
    ja: 'Cardzyの詩歌コレクションは、重複のない1,000編以上の名作を集めた本格的な文学アーカイブです。歴史的な詩集や手稿から厳選され、読みやすく共有しやすいデザインになっています。',
    ko: 'Cardzy 명시 컬렉션은 중복 없이 엄선된 1,000개 이상의 고전 및 현대 시 구절을 담은 정통 문학 아카이브입니다. 역사적인 시집에서 직접 검증하여 독서와 공유에 최적화되었습니다.',
    it: 'Il Tesoro Poetico di Cardzy è un archivio letterario autentico con oltre 1.000 versi classici e moderni privi di duplicati, tratti direttamente da storici canzonieri e manoscritti verificati.',
    tr: 'Cardzy Şiir Hazinesi, tarihi divanlardan ve güvenilir el yazmalarından derlenmiş, tekrarsız 1.000\'den fazla klasik ve modern mısradan oluşan özgün bir edebiyat arşividir.',
    id: 'Khazanah Puisi Cardzy adalah arsip sastra autentik yang menampilkan lebih dari 1.000 bait klasik dan modern tanpa duplikasi, diambil langsung dari manuskrip bersejarah.',
    bn: 'Cardzy-র কবিতার ভাণ্ডার হলো একটি খাঁটি সাহিত্য সংগ্রহশালা যেখানে ১,০০০-এরও বেশি অনন্য ধ্রুপদী ও আধুনিক কবিতা রয়েছে, যা নির্ভরযোগ্য ঐতিহাসিক কাব্যগ্রন্থ থেকে সংকলিত।',
    vi: 'Kho tàng thơ ca của Cardzy là một kho lưu trữ văn học chuẩn xác với hơn 1.000 câu thơ kinh điển và hiện đại không trùng lặp, tuyển chọn trực tiếp từ các văn bản lịch sử đã được kiểm chứng.',
    sw: 'Hazina ya Mashairi ya Cardzy ni kumbukumbu halisi ya kifasihi yenye zaidi ya mashairi 1,000 ya kale na ya kisasa yasiyorudiwa, yaliyokusanywa kutoka vitabu vya kihistoria vilivyothibitishwa.',
  },
  sec1Callout: {
    en: '✨ Zero Duplication & 100% Verified: Unlike unvetted poetry blogs where the same couplet repeats dozens of times, Cardzy ensures every poem appears exactly once with verified author attribution, poet dates, and clean Nastaliq typography.',
    ur: '✨ کوئی تکرار نہیں اور 100% تصدیق شدہ: عام بلاگز کے برعکس جہاں ایک ہی شعر بار بار ملتا ہے، کارڈزی پر ہر کلام مستند شاعر کے نام، سن پیدائش اور خوبصورت نستعلیق رسم الخط کے ساتھ موجود ہے۔',
    ar: '✨ محتوى خالٍ من التكرار ومحقق 100%: على عكس المواقع غير الموثوقة التي تكرر الأبيات باستمرار، يضمن Cardzy ظهور كل قصيدة مرة واحدة مع توثيق اسم الشاعر وتاريخه والخط الجميل.',
    es: '✨ Cero duplicados y 100% verificado: a diferencia de blogs no contrastados donde el mismo verso se repite decenas de veces, Cardzy garantiza que cada poema aparece con autor verificado y tipografía cuidada.',
    fr: '✨ Zéro doublon et 100 % vérifié : contrairement aux blogs où le même poème se répète indéfiniment, Cardzy garantit chaque citation avec attribution d\'auteur certifiée et typographie soignée.',
    hi: '✨ कोई दोहराव नहीं और 100% प्रामाणिक: अन्य सामान्य ब्लॉगों के विपरीत जहाँ एक ही शेर बार-बार मिलता है, Cardzy पर हर शेर कवि के प्रामाणिक नाम और सुंदर लिखावट के साथ मिलता है।',
    zh: '✨ 零重复与100%正版校验：告别泛滥的无序抄录，Cardzy 确保每首诗篇独一无二，并配有严谨的作者考据、生卒年表与纯正书法字体排版。',
    pt: '✨ Zero duplicações e 100% verificado: ao contrário de sites comuns onde os mesmos versos se repetem, o Cardzy garante autoria verificada e tipografia impecável.',
    ru: '✨ Никаких повторов и 100% точность: в отличие от случайных сайтов, в Cardzy каждое стихотворение уникально, снабжено точной атрибуцией автора и выверенной типографикой.',
    de: '✨ Null Duplikate & 100% verifiziert: Im Gegensatz zu ungeprüften Websites stellt Cardzy sicher, dass jedes Gedicht genau einmal mit geprüfter Autorenschaft und edler Typografie erscheint.',
    ja: '✨ 重複ゼロ＆100%真贋確認済み：同じフレーズが乱立する一般的なブログとは異なり、Cardzyではすべての詩が著者情報と美しいタイポグラフィとともに正確に収録されています。',
    ko: '✨ 중복 제로 & 100% 검증 완료: 동일한 구절이 반복되는 여타 블로그와 달리, Cardzy는 공인된 작가 정보와 세련된 서체로 완벽히 정제된 시만을 제공합니다.',
    it: '✨ Zero duplicati e verifica al 100%: a differenza dei blog generici, Cardzy garantisce che ogni verso sia attribuito all\'autore corretto con una tipografia impeccabile.',
    tr: '✨ Sıfır Tekrar ve %100 Doğrulanmış: Aynı dizelerin defalarca tekrarlandığı sitelerin aksine, Cardzy her şiiri yazar bilgisi ve özel hat sanatıyla tek ve benzersiz sunar.',
    id: '✨ Tanpa Duplikasi & 100% Terverifikasi: Tidak seperti blog biasa, Cardzy memastikan setiap puisi hadir satu kali dengan atribusi penulis yang akurat dan tipografi elegan.',
    bn: '✨ শূন্য পুনরাবৃত্তি এবং ১০০% প্রামাণ্য: ইন্টারনেটের অযাচাইকৃত ব্লগের মতো একই কবিতা বারবার নয়, Cardzy নিশ্চিত করে প্রতিটি শ্লোক সঠিক কবি ও মার্জিত ফন্টসহ অনন্যভাবে উপস্থাপিত।',
    vi: '✨ Không trùng lặp & Xác thực 100%: Khác với các blog trôi nổi, Cardzy đảm bảo mỗi tác phẩm chỉ xuất hiện một lần với đầy đủ thông tin tác giả và trình bày mỹ thuật chuẩn mực.',
    sw: '✨ Hakuna Kurudiarudia na Imethibitishwa 100%: Tofauti na tovuti nyingine, Cardzy inahakikisha kila shairi linaonekana mara moja pekee likiwa na jina halisi la mwandishi na muundo nadhifu.',
  },
  sec2Title: {
    en: '2. Top Curated Masterpieces to Discover',
    ur: '2. گنجینہ کے مقبول ترین منتخب اشعار',
    ar: '2. أبرز الروائع الشعرية المختارة',
    es: '2. Obras Maestras Destacadas para Descubrir',
    fr: '2. Les Grands Chefs-d\'œuvre à Découvrir',
    hi: '2. संग्रह के सर्वाधिक लोकप्रिय चुनिंदा शेर',
    zh: '2. 宝库中最受喜爱的殿堂级名作精选',
    pt: '2. Obras-Primas em Destaque para Descobrir',
    ru: '2. Главные жемчужины коллекции',
    de: '2. Ausgewählte Meisterwerke zum Entdecken',
    ja: '2. コレクション厳選の珠玉の名句',
    ko: '2. 가장 사랑받는 엄선 명작 구절',
    it: '2. I Migliori Capolavori da Scoprire',
    tr: '2. Keşfedilecek En Seçkin Şaheserler',
    id: '2. Mahakarya Pilihan Terbaik untuk Dijelajahi',
    bn: '২. ভাণ্ডারের সবচেয়ে জনপ্রিয় নির্বাচিত শ্লোকসমূহ',
    vi: '2. Những Tuyệt Tác Chọn Lọc Hàng Đầu',
    sw: '2. Mashairi Bora Yaliyoteuliwa Kugundua',
  },
  sec2Subtitle: {
    en: 'Tap copy for instant text, share directly to WhatsApp, or view in the full treasury.',
    ur: 'ان اشعار کو کاپی کریں، واٹس ایپ پر شیئر کریں یا گنجینہ میں مکمل کلام پڑھیں۔',
    ar: 'انسخ النص بضغطة واحدة، أو شاركه مباشرة عبر واتساب، أو تصفحه في الخزانة الكاملة.',
    es: 'Copia el texto al instante, compártelo en WhatsApp o explóralo en el tesoro completo.',
    fr: 'Copiez le texte en un clic, partagez directement sur WhatsApp ou découvrez le poème complet.',
    hi: 'टेक्स्ट तुरंत कॉपी करें, सीधे व्हाट्सएप पर शेयर करें या पूरे खजाने में देखें।',
    zh: '一键复制原文文本，直接分享至 WhatsApp，或点击进入宝库浏览全诗。',
    pt: 'Copie o texto em um toque, compartilhe no WhatsApp ou veja o poema completo no acervo.',
    ru: 'Скопируйте текст в один клик, отправьте в WhatsApp или откройте в сокровищнице.',
    de: 'Text sofort kopieren, direkt auf WhatsApp teilen oder in der Schatzkammer ansehen.',
    ja: 'ワンタップでテキストをコピー、WhatsAppで直接シェア、または全編をライブラリで閲覧できます。',
    ko: '원터치로 텍스트를 복사하거나 WhatsApp으로 공유하고 전체 시를 감상해보세요.',
    it: 'Copia il testo con un tocco, condividi subito su WhatsApp o leggi l\'opera completa.',
    tr: 'Metni anında kopyalayın, doğrudan WhatsApp\'ta paylaşın veya hazinede tamamını okuyun.',
    id: 'Salin teks secara instan, bagikan langsung ke WhatsApp, atau buka dalam khazanah lengkap.',
    bn: 'এক ক্লিকে টেক্সট কপি করুন, হোয়াটসঅ্যাপে শেয়ার করুন অথবা মূল ভাণ্ডারে সম্পূর্ণ কবিতা পড়ুন।',
    vi: 'Sao chép lời thơ ngay lập tức, chia sẻ qua WhatsApp hoặc xem trọn vẹn bài thơ trong kho tàng.',
    sw: 'Nakili maandishi mara moja, shiriki moja kwa moja WhatsApp au tazama shairi lote kwenye hazina.',
  },
  exploreBtn: {
    en: 'Explore All 1,000+ Verses',
    ur: 'تمام 1,000+ اشعار دیکھیں',
    ar: 'استكشف أكثر من 1000 بيت شعر',
    es: 'Explorar los Más de 1,000 Versos',
    fr: 'Explorer Tous les 1 000+ Vers',
    hi: 'सभी 1,000+ शेर देखें',
    zh: '探索全部 1,000+ 首诗篇',
    pt: 'Explorar Todos os 1.000+ Versos',
    ru: 'Смотреть все 1000+ стихов',
    de: 'Alle 1.000+ Verse entdecken',
    ja: '1,000編以上の名詩をすべて見る',
    ko: '1,000개 이상의 명시 전체 보기',
    it: 'Esplora Tutti i 1.000+ Versi',
    tr: '1.000\'den Fazla Şiiri Keşfet',
    id: 'Jelajahi Semua 1.000+ Puisi',
    bn: 'সকল ১,০০০+ কবিতা দেখুন',
    vi: 'Khám Phá Tất Cả 1.000+ Câu Thơ',
    sw: 'Gundua Mashairi Yote 1,000+',
  },
  copySher: {
    en: 'Copy Sher',
    ur: 'شعر کاپی کریں',
    ar: 'نسخ البيت',
    es: 'Copiar Verso',
    fr: 'Copier le Vers',
    hi: 'शेर कॉपी करें',
    zh: '复制诗句',
    pt: 'Copiar Verso',
    ru: 'Скопировать стих',
    de: 'Vers kopieren',
    ja: '詩句をコピー',
    ko: '시 구절 복사',
    it: 'Copia Verso',
    tr: 'Dizeyi Kopyala',
    id: 'Salin Bait',
    bn: 'শ্লোক কপি করুন',
    vi: 'Sao Chép Thơ',
    sw: 'Nakili Shairi',
  },
  copied: {
    en: 'Copied!',
    ur: 'کاپی ہو گیا!',
    ar: 'تم النسخ!',
    es: '¡Copiado!',
    fr: 'Copié !',
    hi: 'कॉपी हो गया!',
    zh: '已复制！',
    pt: 'Copiado!',
    ru: 'Скопировано!',
    de: 'Kopiert!',
    ja: 'コピー完了！',
    ko: '복사 완료!',
    it: 'Copiato!',
    tr: 'Kopyalandı!',
    id: 'Tersalin!',
    bn: 'কপি হয়েছে!',
    vi: 'Đã sao chép!',
    sw: 'Imenakiliwa!',
  },
  sec3Title: {
    en: '3. How to Download 1080px Royal Story Cards',
    ur: '3. 1080px رائل اسٹوری کارڈز کیسے ڈاؤن لوڈ کریں؟',
    ar: '3. كيفية تحميل بطاقات القصص الملكية بدقة 1080 بكسل',
    es: '3. Cómo Descargar Tarjetas Reales en 1080px',
    fr: '3. Comment Télécharger des Cartes Story Royales en 1080px',
    hi: '3. 1080px रॉयल स्टोरी कार्ड कैसे डाउनलोड करें?',
    zh: '3. 如何一键下载 1080px 皇家故事卡片',
    pt: '3. Como Baixar Story Cards Reais em 1080px',
    ru: '3. Как скачать королевские сторис-открытки в 1080px',
    de: '3. So laden Sie königliche 1080px Story-Karten herunter',
    ja: '3. 1080px高画質ロイヤルストーリーカードのダウンロード方法',
    ko: '3. 1080px 고화질 로열 스토리 카드 다운로드 방법',
    it: '3. Come Scaricare Carte Story Reali in 1080px',
    tr: '3. 1080px Asil Hikaye Kartları Nasıl İndirilir?',
    id: '3. Cara Mengunduh Kartu Cerita Mewah 1080px',
    bn: '৩. কীভাবে ১০৮০ পিক্সেল রাজকীয় স্টোরি কার্ড ডাউনলোড করবেন?',
    vi: '3. Cách Tải Xuống Thiệp Câu Chuyện Hoàng Gia 1080px',
    sw: '3. Jinsi ya Kupakua Kadi za Kifalme za 1080px',
  },
  sec3Desc: {
    en: 'Cardzy includes an instant high-resolution graphics generator directly built into the Treasury, removing the need for third-party photo editing apps:',
    ur: 'کسی بھی گرافک ڈیزائن سوفٹ ویئر یا ایڈیٹنگ ایپ کے بغیر، اب آپ 1-کلک میں شاہانہ اسٹوری کارڈ ڈاؤن لوڈ کر سکتے ہیں:',
    ar: 'يتضمن Cardzy مولد صور مدمج فائق الدقة داخل الخزانة، مما يغنيك تماماً عن برامج تعديل الصور المعقدة:',
    es: 'Cardzy incluye un generador gráfico de alta resolución integrado directamente en el tesoro, sin necesidad de apps externas:',
    fr: 'Cardzy intègre directement un générateur graphique haute résolution, sans avoir besoin d\'applications de retouche tierces :',
    hi: 'Cardzy में एक हाई-रेज़ोल्यूशन ग्राफिक जनरेटर शामिल है, जिससे किसी अन्य फोटो एडिटिंग ऐप की आवश्यकता नहीं पड़ती:',
    zh: 'Cardzy 诗歌宝库内置即时高清图形生成引擎，无需任何第三方修图软件即可生成绝美大片：',
    pt: 'O Cardzy inclui um gerador de gráficos em alta resolução integrado, eliminando a necessidade de apps de edição:',
    ru: 'Cardzy оснащен встроенным генератором графики высокого разрешения, избавляющим от сторонних фоторедакторов:',
    de: 'Cardzy verfügt über einen integrierten hochauflösenden Grafikgenerator, ganz ohne externe Bearbeitungs-Apps:',
    ja: 'Cardzyにはライブラリ直結の高解像度画像ジェネレーターが内蔵されており、編集アプリは一切不要です：',
    ko: 'Cardzy에는 별도의 사진 편집 앱 없이도 바로 사용할 수 있는 고해상도 그래픽 생성기가 내장되어 있습니다:',
    it: 'Cardzy include un generatore grafico ad alta risoluzione integrato, senza bisogno di app terze di fotoritocco:',
    tr: 'Cardzy, harici fotoğraf düzenleme uygulamalarına ihtiyaç duymadan yüksek çözünürlüklü grafikler oluşturan yerleşik bir motora sahiptir:',
    id: 'Cardzy dilengkapi generator grafis resolusi tinggi langsung di dalamnya, tanpa perlu aplikasi edit foto tambahan:',
    bn: 'Cardzy-তে রয়েছে উচ্চ রেজোলিউশনের নিজস্ব গ্রাফিক্স ইঞ্জিন, যাতে কোনো অতিরিক্ত এডিটিং অ্যাপের প্রয়োজন হয় না:',
    vi: 'Cardzy tích hợp sẵn trình tạo đồ họa độ phân giải cao ngay trong kho tàng, không cần ứng dụng chỉnh sửa ảnh bên ngoài:',
    sw: 'Cardzy ina mtengenezaji wa picha wa ubora wa juu ndani yake, bila kuhitaji programu nyingine za uhariri:',
  },
  step1Title: {
    en: 'Step 1: Choose Any Verse',
    ur: 'مرحلہ 1: کوئی بھی شعر منتخب کریں',
    ar: 'الخطوة 1: اختر أي بيت شعر',
    es: 'Paso 1: Elige Cualquier Verso',
    fr: 'Étape 1 : Choisissez un Vers',
    hi: 'चरण 1: कोई भी शेर चुनें',
    zh: '第一步：挑选心仪诗篇',
    pt: 'Passo 1: Escolha Qualquer Verso',
    ru: 'Шаг 1: Выберите стихотворение',
    de: 'Schritt 1: Vers auswählen',
    ja: 'ステップ1：お好みの詩句を選ぶ',
    ko: '1단계: 마음에 드는 시 구절 선택',
    it: 'Passo 1: Scegli Qualsiasi Verso',
    tr: '1. Adım: Herhangi Bir Şiir Seçin',
    id: 'Langkah 1: Pilih Bait Puisi',
    bn: 'ধাপ ১: যেকোনো শ্লোক বেছে নিন',
    vi: 'Bước 1: Chọn Câu Thơ Yêu Thích',
    sw: 'Hatua 1: Chagua Shairi Lolote',
  },
  step1Desc: {
    en: 'Browse the Treasury or filter by your favorite poet and mood.',
    ur: 'گنجینہ میں براؤز کریں یا اپنے پسندیدہ شاعر اور موڈ کے مطابق فلٹر کریں۔',
    ar: 'تصفح الخزانة أو قم بالتصفية حسب الشاعر المفضل لديك وحالتك المزاجية.',
    es: 'Explora el tesoro o filtra por tu poeta favorito y estado de ánimo.',
    fr: 'Parcourez le trésor ou filtrez selon votre poète préféré et votre humeur.',
    hi: 'खजाने में ब्राउज़ करें या अपने पसंदीदा कवि और मूड के अनुसार फ़िल्टर करें।',
    zh: '在宝库中浏览漫步，或根据您心仪的诗人与情绪心境进行精准检索。',
    pt: 'Navegue pelo acervo ou filtre pelo seu poeta favorito e momento emocional.',
    ru: 'Просматривайте каталог или фильтруйте по автору и настроению.',
    de: 'Durchstöbern Sie die Sammlung oder filtern Sie nach Dichter und Stimmung.',
    ja: 'ライブラリを閲覧するか、お気に入りの詩人や気分で絞り込みます。',
    ko: '컬렉션을 둘러보거나 좋아하는 시인과 분위기별로 검색해보세요.',
    it: 'Sfoglia il catalogo o filtra in base al tuo poeta preferito e al tuo umore.',
    tr: 'Hazineyi inceleyin veya favori şairinize ve ruh halinize göre filtreleyin.',
    id: 'Jelajahi khazanah atau filter berdasarkan penyair favorit dan suasana hati Anda.',
    bn: 'ভাণ্ডার ব্রাউজ করুন অথবা প্রিয় কবি ও অনুভূতি অনুযায়ী ফিল্টার করুন।',
    vi: 'Duyệt qua kho tàng hoặc lọc theo nhà thơ yêu thích và cảm xúc của bạn.',
    sw: 'Vinjari hazina au chuja kulingana na mshairi unayempenda na hisia zako.',
  },
  step2Title: {
    en: 'Step 2: Tap "Image" or "Video"',
    ur: 'مرحلہ 2: "تصویر" یا "ویڈیو" پر کلک کریں',
    ar: 'الخطوة 2: اضغط على "صورة" أو "فيديو"',
    es: 'Paso 2: Toca "Imagen" o "Video"',
    fr: 'Étape 2 : Cliquez sur "Image" ou "Vidéo"',
    hi: 'चरण 2: "इमेज" या "वीडियो" पर टैप करें',
    zh: '第二步：轻按「图片」或「视频」',
    pt: 'Passo 2: Toque em "Imagem" ou "Vídeo"',
    ru: 'Шаг 2: Нажмите «Фото» или «Видео»',
    de: 'Schritt 2: Tippen Sie auf „Bild“ oder „Video“',
    ja: 'ステップ2：「画像」または「動画」をタップ',
    ko: '2단계: \'이미지\' 또는 \'비디오\' 탭하기',
    it: 'Passo 2: Tocca "Immagine" o "Video"',
    tr: '2. Adım: "Resim" veya "Video"ya Dokunun',
    id: 'Langkah 2: Ketuk "Gambar" atau "Video"',
    bn: 'ধাপ ২: "ছবি" অথবা "ভিডিও" বোতামে ক্লিক করুন',
    vi: 'Bước 2: Chạm vào "Hình Ảnh" hoặc "Video"',
    sw: 'Hatua 2: Gusa "Picha" au "Video"',
  },
  step2Desc: {
    en: 'Download crystal-clear HD PNG image cards or animated MP4 status videos in one tap.',
    ur: 'شاہانہ نستعلیق بارڈرز کے ساتھ ایچ ڈی تصویر یا متحرک ویڈیو منتخب کریں۔',
    ar: 'حمّل بطاقات صور PNG عالية الوضوح أو مقاطع فيديو MP4 متحركة للحالات بنقرة واحدة.',
    es: 'Descarga tarjetas PNG en alta definición o videos animados MP4 en un toque.',
    fr: 'Téléchargez des cartes images PNG en HD ou des vidéos animées MP4 en un clic.',
    hi: 'एक टैप में क्रिस्टल-क्लियर HD PNG इमेज कार्ड या एनिमेटेड MP4 वीडियो डाउनलोड करें।',
    zh: '一键下载清澈细腻的高清 PNG 贺卡或专为社交动态打造的 MP4 动效短视频。',
    pt: 'Baixe cartões em PNG de alta definição ou vídeos animados MP4 para status em um toque.',
    ru: 'Скачивайте открытки в HD PNG или анимированные MP4-ролики для сторис в один клик.',
    de: 'Laden Sie gestochen scharfe HD-PNG-Karten oder animierte MP4-Statusvideos mit einem Tipp herunter.',
    ja: 'ワンタップで鮮明なHD PNG画像カードや美しい動くMP4動画を保存できます。',
    ko: '원터치로 선명한 HD PNG 이미지 카드나 감성적인 MP4 애니메이션 비디오를 다운로드하세요.',
    it: 'Scarica biglietti immagine PNG in HD o video animati MP4 per gli stati con un tocco.',
    tr: 'Tek dokunuşla kristal netliğinde HD PNG kartlar veya animasyonlu MP4 videolar indirin.',
    id: 'Unduh kartu gambar PNG HD atau video status MP4 beranimasi dalam satu ketukan.',
    bn: 'এক ক্লিকে অত্যন্ত স্পষ্ট HD PNG ছবি অথবা অ্যানিমেটেড MP4 স্ট্যাটাস ভিডিও ডাউনলোড করুন।',
    vi: 'Tải xuống thiệp ảnh PNG chuẩn nét hoặc video MP4 chuyển động cho tin chỉ trong một chạm.',
    sw: 'Pakua kadi za picha safi za HD PNG au video za hali za MP4 kwa kugusa mara moja.',
  },
  step3Title: {
    en: 'Step 3: Direct Download',
    ur: 'مرحلہ 3: فوری ڈاؤن لوڈ',
    ar: 'الخطوة 3: تحميل مباشر',
    es: 'Paso 3: Descarga Directa',
    fr: 'Étape 3 : Téléchargement Direct',
    hi: 'चरण 3: डायरेक्ट डाउनलोड',
    zh: '第三步：极速保存本地',
    pt: 'Passo 3: Download Direto',
    ru: 'Шаг 3: Прямое скачивание',
    de: 'Schritt 3: Direkt herunterladen',
    ja: 'ステップ3：端末に直接保存',
    ko: '3단계: 바로 저장하기',
    it: 'Passo 3: Download Diretto',
    tr: '3. Adım: Doğrudan İndirme',
    id: 'Langkah 3: Unduh Langsung',
    bn: 'ধাপ ৩: সরাসরি ডাউনলোড',
    vi: 'Bước 3: Tải Xuống Trực Tiếp',
    sw: 'Hatua 3: Upakuaji wa Moja kwa Moja',
  },
  step3Desc: {
    en: 'The graphic or video is saved straight to your phone, ready for WhatsApp Status & Instagram.',
    ur: 'کارڈ فوری آپ کی گیلری میں محفوظ ہو جاتا ہے، واٹس ایپ اسٹیٹس اور انسٹاگرام کے لیے تیار۔',
    ar: 'يتم حفظ الصورة أو الفيديو مباشرة في معرض هاتفك، لتكون جاهزة لحالة واتساب وإنستغرام.',
    es: 'El archivo se guarda en tu teléfono, listo para Estados de WhatsApp e historias de Instagram.',
    fr: 'Le fichier s\'enregistre sur votre téléphone, prêt pour les Statuts WhatsApp et Instagram.',
    hi: 'कार्ड सीधे आपकी फोन गैलरी में सेव हो जाता है, व्हाट्सएप स्टेटस और इंस्टाग्राम के लिए तैयार।',
    zh: '贺卡直接保存至手机相册，格式完美适配 WhatsApp 状态、微信朋友圈与小红书。',
    pt: 'O arquivo é salvo direto na galeria, pronto para Status do WhatsApp e Instagram.',
    ru: 'Файл сохраняется прямо на телефон, готовый к публикации в WhatsApp и Instagram.',
    de: 'Die Datei wird direkt auf Ihrem Smartphone gespeichert – ideal für WhatsApp-Status und Instagram.',
    ja: '画像や動画がスマホに直接保存され、WhatsAppステータスやInstagramにすぐ投稿できます。',
    ko: '완성된 카드가 갤러리에 바로 저장되어 WhatsApp 상태나 인스타그램 스토리에 즉시 공유 가능합니다.',
    it: 'Il file viene salvato subito sul telefono, pronto per lo stato di WhatsApp e Instagram.',
    tr: 'Görsel doğrudan telefonunuza kaydedilir; WhatsApp Durum ve Instagram için anında hazırdır.',
    id: 'Grafik langsung tersimpan di galeri ponsel Anda, siap untuk Status WhatsApp & Instagram.',
    bn: 'কার্ডটি সরাসরি আপনার ফোনের গ্যালারিতে সংরক্ষিত হয়, হোয়াটসঅ্যাপ স্ট্যাটাস ও ইনস্টাগ্রামের জন্য প্রস্তুত।',
    vi: 'Ảnh hoặc video được lưu thẳng vào điện thoại của bạn, sẵn sàng cho Tin WhatsApp và Instagram.',
    sw: 'Picha au video inahifadhiwa moja kwa moja kwenye simu yako, tayari kwa Status za WhatsApp na Instagram.',
  },
  customStudioTitle: {
    en: 'Create Your Own Custom Poetry Post & Dedication',
    ur: 'خود اپنا شاعری کارڈ بنائیں (کسٹم اسٹوڈیو)',
    ar: 'أنشئ بطاقة شعر مخصصة مع إهداء خاص',
    es: 'Crea tu Propia Publicación Poética con Dedicatoria',
    fr: 'Créez votre Propre Carte de Poésie avec Dédicace',
    hi: 'अपना खुद का शायरी कार्ड बनाएं (कस्टम स्टूडियो)',
    zh: '创作专属个性化诗词明信片与心意题字',
    pt: 'Crie seu Próprio Post de Poesia com Dedicatória',
    ru: 'Создайте авторскую поэтическую открытку с посвящением',
    de: 'Eigenen Poesie-Beitrag mit Widmung erstellen',
    ja: 'オリジナルの詩文カード＆献辞作成スタジオ',
    ko: '나만의 맞춤 시 카드 & 헌사 작성 스튜디오',
    it: 'Crea il Tuo Post di Poesia con Dedica',
    tr: 'Kendi Şiir Gönderinizi ve İthafınızı Oluşturun',
    id: 'Buat Postingan Puisi & Dedikasi Kustom Anda Sendiri',
    bn: 'নিজের পছন্দের শ্লোক দিয়ে কাস্টম কার্ড তৈরি করুন',
    vi: 'Tự Tạo Thiệp Thơ Riêng Kèm Lời Đề Tặng',
    sw: 'Tengeneza Chapisho Lako Mwenyewe la Shairi na Wakfu',
  },
  customStudioDesc: {
    en: 'Want to craft a post with your own verses? Visit our self-creation studio on the Poetry page where you can enter any poet name, custom verses, and dedication, pick a luxury theme, and download your HD PNG or MP4 card directly.',
    ur: 'اگر آپ اپنی مرضی کا شعر، شاعر کا نام اور کسی کے نام انتساب (Dedication) شامل کر کے کارڈ بنانا چاہتے ہیں، تو شاعری پیج پر موجود "خود شاعری کارڈ بنائیں" اسٹوڈیو استعمال کریں اور فوری ایچ ڈی تصویر یا ویڈیو ڈاؤن لوڈ کریں۔',
    ar: 'هل ترغب في تصميم بطاقة بأبياتك الخاصة؟ تفضل بزيارة استوديو التصميم الذاتي في صفحة الشعر حيث يمكنك كتابة اسم الشاعر والكلمات والإهداء الخاص وتنزيل البطاقة مباشرة.',
    es: '¿Quieres crear una publicación con tus propios versos? Visita nuestro estudio en la página de Poesía, añade el autor, dedicatoria, elige un tema y descarga tu tarjeta.',
    fr: 'Envie de créer une carte avec vos propres vers ? Utilisez notre studio sur la page Poésie pour saisir l\'auteur, vos textes et une dédicace personnalisée.',
    hi: 'क्या आप अपनी पसंद के शेर से कार्ड बनाना चाहते हैं? शायरी पेज पर हमारे कस्टम स्टूडियो पर जाएँ, कवि का नाम व संदेश लिखें और तुरंत HD PNG या MP4 डाउनलोड करें।',
    zh: '想要用自己珍藏的诗句创作贺卡？前往诗歌页面的「自制诗词工坊」，输入诗人、自选诗句与专属致辞，挑选奢华背景即可下载 HD PNG 或 MP4 视频。',
    pt: 'Quer criar um cartão com seus próprios versos? Visite o estúdio na página de Poesia, adicione autor e dedicatória, escolha um tema e baixe em alta qualidade.',
    ru: 'Хотите создать открытку со своими стихами? Посетите нашу студию на странице поэзии: укажите автора, текст и посвящение, выберите тему и скачайте открытку.',
    de: 'Möchten Sie einen Beitrag mit eigenen Versen gestalten? Nutzen Sie unser Studio auf der Poesie-Seite, tragen Sie Autor, Text und Widmung ein und laden Sie die Karte herunter.',
    ja: 'オリジナルの詩でカードを作りたいですか？詩歌ページの作成スタジオで詩人名やメッセージ、献辞を入力し、ラグジュアリーなカードをダウンロードできます。',
    ko: '나만의 시나 문구로 카드를 만들고 싶으신가요? 시 페이지의 자체 제작 스튜디오에서 시인 이름, 문구, 헌사를 넣고 럭셔리 카드를 바로 다운로드하세요.',
    it: 'Vuoi creare una card con i tuoi versi preferiti? Visita lo studio nella pagina Poesia, inserisci autore, testo e dedica, e scarica subito la tua creazione.',
    tr: 'Kendi dizelerinizle bir kart oluşturmak ister misiniz? Şiir sayfamızdaki özel stüdyoyu ziyaret edin, şair adı ve ithaf ekleyip kartınızı anında indirin.',
    id: 'Ingin membuat kartu dengan bait pilihan Anda sendiri? Kunjungi studio kustom di halaman Puisi untuk menambahkan bait, nama penyair, dan dedikasi favorit.',
    bn: 'নিজের পছন্দের কবিতা দিয়ে কার্ড বানাতে চান? কবিতা পেজের নিজস্ব স্টুডিও ব্যবহার করুন, কবির নাম ও শুভেচ্ছা বার্তা লিখে সরাসরি কার্ড ডাউনলোড করুন।',
    vi: 'Bạn muốn tạo thiệp với những câu thơ của riêng mình? Ghé thăm xưởng sáng tạo trên trang Thơ, điền tên tác giả, lời đề tặng và tải ngay thiệp HD.',
    sw: 'Je, unataka kutengeneza kadi kwa mashairi yako mwenyewe? Tembelea studio yetu kwenye ukurasa wa Mashairi na upakue kadi yako ya kifahari moja kwa moja.',
  },
  sec4Title: {
    en: '4. Mastering the 4 Cascading Filters',
    ur: '4. فلٹرز کا سمارٹ استعمال (زبان، شاعر اور موضوع)',
    ar: '4. إتقان الفلاتر الذكية الأربعة',
    es: '4. Domina los 4 Filtros Inteligentes',
    fr: '4. Maîtrisez les 4 Filtres Intelligents',
    hi: '4. चार स्मार्ट फ़िल्टर का प्रभावी उपयोग',
    zh: '4. 玩转四大层叠智能筛选器',
    pt: '4. Dominando os 4 Filtros Inteligentes',
    ru: '4. Освойте 4 умных фильтра каталога',
    de: '4. Die 4 intelligenten Filter gezielt nutzen',
    ja: '4. 4つのスマートフィルターを使いこなす',
    ko: '4. 4가지 스마트 필터 200% 활용하기',
    it: '4. Padroneggia i 4 Filtri Intelligenti',
    tr: '4. 4 Kademeli Akıllı Filtreyi Keşfedin',
    id: '4. Menguasai 4 Filter Cerdas Berjenjang',
    bn: '৪. চারটি স্মার্ট ফিল্টারের সঠিক ব্যবহার',
    vi: '4. Làm Chủ 4 Bộ Lọc Thông Minh',
    sw: '4. Kutumia Vichujio 4 Mahiri',
  },
  sec4Desc: {
    en: 'Our cascading filtering system lets you find the exact verse you need in seconds without endless scrolling:',
    ur: 'کارڈزی پر مطلوبہ شعر تلاش کرنا انتہائی آسان ہے۔ آپ ایک ہی وقت میں چار فلٹرز کا استعمال کر سکتے ہیں:',
    ar: 'يتيح لك نظام التصفية الذكي العثور على بيت الشعر المطلوب خلال ثوانٍ معدودة دون الحاجة للبحث الطويل:',
    es: 'Nuestro sistema de filtros te permite encontrar el verso exacto en segundos sin desplazamientos interminables:',
    fr: 'Notre système de filtres vous permet de trouver le poème parfait en quelques secondes :',
    hi: 'हमारा स्मार्ट फ़िल्टरिंग सिस्टम आपको बिना समय गंवाए कुछ ही सेकंड में मनचाहा शेर ढूंढने की सुविधा देता है:',
    zh: '层叠式即时筛选系统助你在几秒钟内定位心仪诗句，告别漫无目的的翻找：',
    pt: 'Nosso sistema de filtros permite encontrar o verso perfeito em segundos sem rolagem infinita:',
    ru: 'Система фильтрации позволяет найти нужную строчку за считанные секунды:',
    de: 'Mit unserem Filtersystem finden Sie im Handumdrehen den perfekten Vers ohne langes Suchen:',
    ja: '段階的なフィルター機能により、何千編もの作品から探している詩を瞬時に見つけることができます：',
    ko: '체계적인 필터 시스템을 통해 끝없는 스크롤 없이 몇 초 만에 원하는 시를 바로 찾을 수 있습니다:',
    it: 'Il nostro sistema di filtri ti consente di trovare la poesia esatta in pochi secondi:',
    tr: 'Kademeli filtreleme sistemimiz, aradığınız mısrayı saniyeler içinde kolayca bulmanızı sağlar:',
    id: 'Sistem filter kami memungkinkan Anda menemukan bait yang tepat dalam hitungan detik:',
    bn: 'আমাদের ফিল্টারিং সিস্টেমের মাধ্যমে আপনি সেকেন্ডের মধ্যেই নিখুঁত কবিতা খুঁজে পেতে পারেন:',
    vi: 'Hệ thống lọc thông minh giúp bạn tìm chính xác câu thơ cần thiết chỉ trong vài giây:',
    sw: 'Mfumo wetu wa kuchuja unakuwezesha kupata shairi unalotaka kwa sekunde chache:',
  },
  filterLang: {
    en: 'Language Filter: Filter between Urdu, Punjabi, Persian, Arabic, and English.',
    ur: 'زبان کا فلٹر: اردو، پنجابی، فارسی، عربی اور انگریزی کے درمیان انتخاب کریں۔',
    ar: 'فلتر اللغة: التبديل بسلاسة بين الأردية والبنجابية والفارسية والعربية والإنجليزية.',
    es: 'Filtro de Idioma: Elige entre urdu, punjabi, persa, árabe e inglés.',
    fr: 'Filtre de Langue : Choisissez entre l\'ourdou, le pendjabi, le persan, l\'arabe et l\'anglais.',
    hi: 'भाषा फ़िल्टर: उर्दू, पंजाबी, फारसी, अरबी और अंग्रेजी के बीच चयन करें।',
    zh: '语言筛选：轻松在乌尔都语、旁遮普语、波斯语、阿拉伯语与英语之间一键切换。',
    pt: 'Filtro de Idioma: Filtre entre urdu, punjabi, persa, árabe e inglês.',
    ru: 'Фильтр языка: выбор между урду, панджаби, персидским, арабским и английским языками.',
    de: 'Sprachfilter: Filtern Sie zwischen Urdu, Punjabi, Persisch, Arabisch und Englisch.',
    ja: '言語フィルター：ウルドゥー語、パンジャブ語、ペルシャ語、アラビア語、英語から選択。',
    ko: '언어 필터: 우르두어, 펀자브어, 페르시아어, 아랍어, 영어 간 간편 전환.',
    it: 'Filtro Lingua: Seleziona tra urdu, punjabi, persiano, arabo e inglese.',
    tr: 'Dil Filtresi: Urduca, Pencapça, Farsça, Arapça ve İngilizce arasında filtreleme yapın.',
    id: 'Filter Bahasa: Pilih antara bahasa Urdu, Punjabi, Persia, Arab, dan Inggris.',
    bn: 'ভাষা ফিল্টার: উর্দু, পাঞ্জাবি, ফার্সি, আরবি এবং ইংরেজির মধ্যে নির্বাচন করুন।',
    vi: 'Bộ Lọc Ngôn Ngữ: Lọc giữa tiếng Urdu, Punjabi, Ba Tư, Ả Rập và Anh.',
    sw: 'Kichujio cha Lugha: Chuja kati ya Kiurdu, Kipunjabi, Kiajemi, Kiarabu na Kiingereza.',
  },
  filterPoet: {
    en: 'Poet Filter: Select from over 30 celebrated classical and modern masters (Iqbal, Ghalib, Faiz, Jaun Elia, Ahmad Faraz, Mian Muhammad Bakhsh, Rumi, Shakespeare, etc.).',
    ur: 'شاعر کا فلٹر: 30 سے زائد عظیم اساتذہ سخن میں سے انتخاب کریں (اقبال، غالب، فیض، جون ایلیا، احمد فراز، میاں محمد بخش، رومی، وغیرہ)۔',
    ar: 'فلتر الشاعر: اختر من بين أكثر من 30 من كبار الشعراء الكلاسيكيين والمعاصرين (إقبال، غالب، فيض، جون إيليا، الرومي، وغيرهم).',
    es: 'Filtro de Poeta: Selecciona entre más de 30 grandes maestros clásicos y modernos (Iqbal, Ghalib, Faiz, Jaun Elia, Rumi, etc.).',
    fr: 'Filtre de Poète : Choisissez parmi plus de 30 grands maîtres classiques et modernes (Iqbal, Ghalib, Faiz, Rumi, etc.).',
    hi: 'कवि फ़िल्टर: 30 से अधिक महान कवियों में से चुनें (इक़बाल, ग़ालिब, फ़ैज़, जौन एलिया, रूमी, आदि)।',
    zh: '诗人筛选：从30多位享誉世界的古典与现代文学巨匠中挑选（如伊克巴尔、迦利布、费兹、鲁米、莎士比亚等）。',
    pt: 'Filtro de Poeta: Escolha entre mais de 30 mestres consagrados da literatura (Iqbal, Ghalib, Faiz, Rumi, etc.).',
    ru: 'Фильтр поэтов: более 30 великих авторов (Икбал, Галиб, Фаиз, Джаун Элия, Руми, Шекспир и др.).',
    de: 'Dichterfilter: Wählen Sie aus über 30 berühmten Meistern (Iqbal, Ghalib, Faiz, Jaun Elia, Rumi usw.).',
    ja: '詩人フィルター：イクバール、ガーリブ、ファイズ、ルーミー、シェイクスピアなど30名以上の文豪から選択。',
    ko: '시인 필터: 이크발, 갈립, 파이즈, 루미, 셰익스피어 등 30인 이상의 세계적 대문호 중 선택.',
    it: 'Filtro Poeti: Scegli tra oltre 30 grandi maestri classici e contemporanei (Iqbal, Ghalib, Faiz, Rumi, ecc.).',
    tr: 'Şair Filtresi: 30\'dan fazla ünlü usta arasından seçim yapın (İkbal, Galib, Faiz, Rumi vb.).',
    id: 'Filter Penyair: Pilih dari 30+ maestro puisi terkemuka (Iqbal, Ghalib, Faiz, Rumi, dll.).',
    bn: 'কবি ফিল্টার: ৩০ জনেরও বেশি বিখ্যাত ধ্রুপদী ও আধুনিক কবির মধ্য থেকে বেছে নিন (ইকবাল, গালিব, ফয়েজ, রুমি ইত্যাদি)।',
    vi: 'Bộ Lọc Nhà Thơ: Chọn từ hơn 30 thi hào kinh điển và hiện đại (Iqbal, Ghalib, Faiz, Rumi, Shakespeare...).',
    sw: 'Kichujio cha Washairi: Chagua kutoka kwa washairi zaidi ya 30 mashuhuri (Iqbal, Ghalib, Faiz, Rumi, n.k.).',
  },
  filterTheme: {
    en: 'Theme Filter: Select by human emotion — Ishq (Romance), Khudi (Self-Belief), Sufi (Devotion), Hikmat (Wisdom), Dua (Blessings), Dosti (Friendship), and Gham (Melancholy).',
    ur: 'موضوع کا فلٹر: جذبات کے مطابق انتخاب — عشق، خودی، تصوف، حکمت، دعا، دوستی اور غم۔',
    ar: 'فلتر الموضوع: التصنيف حسب العاطفة الإنسانية — العشق، عزة النفس (خودي)، التصوف، الحكمة، الدعاء، الصداقة، والحزن.',
    es: 'Filtro de Tema: Clasificado por emociones: Amor, Superación, Mística Sufí, Sabiduría, Oración, Amistad y Melancolía.',
    fr: 'Filtre de Thème : Selon l\'émotion recherchée : Amour, Foi en soi, Soufisme, Sagesse, Prière, Amitié et Nostalgie.',
    hi: 'विषय फ़िल्टर: मानवीय भावनाओं के आधार पर चयन — इश्क़, ख़ुदी, सूफ़ी, हिकमत, दुआ, दोस्ती और ग़म।',
    zh: '主题情感筛选：按人类细腻情感检索 — 爱情（Ishq）、自信励志（Khudi）、苏菲灵修（Sufi）、智慧哲思（Hikmat）、祈愿祝福（Dua）、友情与离愁。',
    pt: 'Filtro de Tema: Selecione por emoção humana — Romance, Autoconfiança, Mística Sufi, Sabedoria, Oração e Amizade.',
    ru: 'Фильтр тем: по эмоциональному настрою — любовь, вера в себя, суфизм, мудрость, молитва, дружба и грусть.',
    de: 'Themenfilter: Nach Emotionen filtern – Liebe (Ishq), Selbstvertrauen (Khudi), Weisheit, Segen, Freundschaft.',
    ja: 'テーマフィルター：感情別に検索 — 愛・ロマンス、信念、スーフィズム、知恵、祈り・祝福、友情、哀愁。',
    ko: '테마 필터: 인간의 깊은 감정별 탐색 — 사랑, 자아실현, 영성, 지혜, 축복의 기도, 우정, 그리움.',
    it: 'Filtro Tema: Seleziona in base all\'emozione — Amore, Autostima, Mistica Sufi, Saggezza, Preghiera e Amicizia.',
    tr: 'Tema Filtresi: Duygulara göre seçim — Aşk, Özgüven (Hudi), Tasavvuf, Hikmet, Dua, Dostluk ve Hüzün.',
    id: 'Filter Tema: Pilih berdasarkan emosi manusia — Cinta, Keyakinan Diri, Sufi, Kebijaksanaan, Doa, dan Sahabat.',
    bn: 'বিষয়ভিত্তিক ফিল্টার: মানবিক অনুভূতির ওপর ভিত্তি করে নির্বাচন — ভালোবাসা, আত্মবিশ্বাস, সুফিবাদ, জ্ঞান, প্রার্থনা ও বন্ধুত্ব।',
    vi: 'Bộ Lọc Chủ Đề: Lựa chọn theo cung bậc cảm xúc — Tình yêu, Niềm tin, Tâm linh, Trí tuệ, Lời chúc, Tình bạn.',
    sw: 'Kichujio cha Mandhari: Chagua kulingana na hisia za kibinadamu — Upendo, Kujiamini, Hekima, Dua, na Urafiki.',
  },
  filterFormat: {
    en: 'Format Filter: Toggle between short 2-liner Ash’aar (ideal for quick status sharing) and complete Nazms/Ghazals.',
    ur: 'فارمیٹ کا فلٹر: دو سطری اشعار (اسٹیٹس شیئرنگ کے لیے بہترین) اور مکمل نظموں / غزلوں کے درمیان انتخاب۔',
    ar: 'فلتر النمط: التبديل بين الأبيات الثنائية السريعة (المثالية لحالات الهاتف) والقصائد والغزليات الكاملة.',
    es: 'Filtro de Formato: Alterna entre versos cortos de 2 líneas (ideales para estados) y poemas completos.',
    fr: 'Filtre de Format : Alternez entre courts distiques de 2 lignes (parfaits pour les statuts) et poèmes complets.',
    hi: 'प्रारूप फ़िल्टर: 2 पंक्तियों वाले छोटे शेर (स्टेटस के लिए उत्तम) और पूरी नज़्मों/ग़ज़लों के बीच स्विच करें।',
    zh: '体裁格式筛选：在两句式精悍绝句短诗（极适合快节奏社交分享）与完整长篇诗歌之间随心切换。',
    pt: 'Filtro de Formato: Alterne entre versos curtos de 2 linhas (ótimos para status) e poemas completos.',
    ru: 'Фильтр формата: переключайтесь между двустишиями (идеально для статусов) и полными поэмами.',
    de: 'Formatfilter: Wechseln Sie zwischen kurzen 2-Zeilern (ideal für Status-Updates) und kompletten Gedichten.',
    ja: 'フォーマットフィルター：ステータス共有に最適な短い2行詩と、完全版の長編詩を切り替え可能。',
    ko: '형식 필터: 소셜 상태 공유에 알맞은 짧은 2행 시구절과 감동적인 전체 시 원문 간 간편 전환.',
    it: 'Filtro Formato: Passa da brevi distici di 2 righe (perfetti per gli stati) a composizioni poetiche complete.',
    tr: 'Biçim Filtresi: Kısa 2 dizelik beyitler (durum paylaşımları için ideal) ile tam şiirler arasında geçiş yapın.',
    id: 'Filter Format: Beralih antara bait pendek 2 baris (cocok untuk status) dan puisi atau ghazal lengkap.',
    bn: 'ফরম্যাট ফিল্টার: ছোট ২ লাইনের শ্লোক (স্ট্যাটাসের জন্য আদর্শ) এবং সম্পূর্ণ কবিতার মধ্যে স্যুইচ করুন।',
    vi: 'Bộ Lọc Định Dạng: Chuyển đổi giữa câu thơ ngắn 2 dòng (phù hợp cho tin mạng xã hội) và bài thơ hoàn chỉnh.',
    sw: 'Kichujio cha Muundo: Badilisha kati ya mistari mifupi 2 (bora kwa hadithi) na mashairi kamili.',
  },
  ctaTitle: {
    en: 'Explore the Full 1,000+ Poetry Treasury',
    ur: '1,000+ اشعار کا گنجینہ دیکھیں',
    ar: 'تصفح خزانة الشعر الكاملة التي تضم أكثر من 1000 بيت',
    es: 'Explora el Tesoro Completo de Más de 1,000 Poemas',
    fr: 'Explorez l\'Ensemble du Trésor Poétique de 1 000+ Vers',
    hi: '1,000+ शायरी का पूरा खजाना एक्सप्लोर करें',
    zh: '即刻启程，探索 1,000+ 传世诗篇全景宝库',
    pt: 'Explore o Acervo Completo com Mais de 1.000 Poemas',
    ru: 'Исследуйте полную сокровищницу из 1000+ стихов',
    de: 'Entdecken Sie die vollständige Sammlung mit 1.000+ Versen',
    ja: '1,000編以上の名詩コレクションを今すぐ体験',
    ko: '1,000개 이상의 명시 보물창고를 지금 탐색해보세요',
    it: 'Esplora l\'Intera Raccolta di Oltre 1.000 Poesie',
    tr: '1.000\'den Fazla Şiirden Oluşan Tam Hazineyi Keşfedin',
    id: 'Jelajahi Khazanah Lengkap 1.000+ Puisi Sekarang',
    bn: '১,০০০+ কবিতার সম্পূর্ণ ভাণ্ডার ঘুরে দেখুন',
    vi: 'Khám Phá Toàn Bộ Kho Tàng 1.000+ Bài Thơ Tuyệt Đẹp',
    sw: 'Gundua Hazina Nzima ya Mashairi Zaidi ya 1,000',
  },
  ctaDesc: {
    en: 'Discover timeless couplets, switch between original script, Roman Urdu, and English translations, and download your royal Story Card in one tap.',
    ur: 'لازوال اشعار تلاش کریں، اصل رسم الخط، رومن اور انگریزی ترجمہ دیکھیں اور 1-کلک میں رائل اسٹوری کارڈ ڈاؤن لوڈ کریں۔',
    ar: 'اكتشف أبياتاً خالدة، وبدّل بين النص الأصلي والترجمة الإنجليزية، وحمّل بطاقتك الملكية بنقرة واحدة.',
    es: 'Descubre versos atemporales, alterna entre texto original y traducciones, y descarga tu tarjeta real con un toque.',
    fr: 'Découvrez des vers intemporels, alternez entre script d\'origine et traductions, et téléchargez votre carte royale.',
    hi: 'कालजयी शेर खोजें, मूल लिपि और अनुवाद देखें और एक क्लिक में अपना रॉयल स्टोरी कार्ड डाउनलोड करें।',
    zh: '赏析传世名句，自由切换原著书写与英文译文，一键生成并下载你的皇家风韵卡片。',
    pt: 'Descubra versos atemporais, alterne entre os textos originais e traduções, e baixe seu cartão real.',
    ru: 'Находите вечные строки, переключайтесь между оригиналом и переводом и скачивайте королевские открытки в один клик.',
    de: 'Entdecken Sie zeitlose Verse, wechseln Sie zwischen Originaltext und Übersetzung und laden Sie Ihre Karte herunter.',
    ja: '時代を超える名句を味わい、原文と翻訳を切り替えながら、ワンタップで豪華なカードを保存できます。',
    ko: '세월이 흘러도 변치 않는 명구를 감상하고, 원문과 번역을 확인하며 나만의 로열 카드를 원클릭으로 다운로드하세요.',
    it: 'Scopri versi senza tempo, confronta testo originale e traduzione, e scarica la tua card reale con un tocco.',
    tr: 'Zamansız dizeleri keşfedin, orijinal yazı ile çeviriler arasında geçiş yapın ve asil kartınızı tek dokunuşla indirin.',
    id: 'Temukan bait abadi, beralih antara naskah asli dan terjemahan, lalu unduh kartu mewah Anda.',
    bn: 'চিরন্তন শ্লোকসমূহ আবিষ্কার করুন, মূল লিপি ও অনুবাদের মধ্যে পরিবর্তন করুন এবং এক ক্লিকে কার্ড ডাউনলোড করুন।',
    vi: 'Khám phá những vần thơ vượt thời gian, chuyển đổi ngôn ngữ linh hoạt và tải thiệp hoàng gia trong một chạm.',
    sw: 'Gundua mashairi ya kudumu, badilisha kati ya maandishi asilia na tafsiri, na pakua kadi yako ya kifalme.',
  },
  ctaBtn: {
    en: 'Launch Poetry Treasury',
    ur: 'شاعری گنجینہ کھولیں',
    ar: 'فتح خزانة الشعر',
    es: 'Abrir Tesoro Poético',
    fr: 'Ouvrir le Trésor Poétique',
    hi: 'शायरी खजाना खोलें',
    zh: '立即进入诗篇宝库',
    pt: 'Abrir Tesouro Poético',
    ru: 'Открыть сокровищницу',
    de: 'Poesie-Schatzkammer öffnen',
    ja: '詩歌ライブラリを開く',
    ko: '명시 컬렉션 바로가기',
    it: 'Apri il Tesoro Poetico',
    tr: 'Şiir Hazinesini Aç',
    id: 'Buka Khazanah Puisi',
    bn: 'কবিতা ভাণ্ডার খুলুন',
    vi: 'Mở Kho Tàng Thơ Ca',
    sw: 'Fungua Hazina ya Mashairi',
  },
  toastCopied: {
    en: 'Poetry copied to clipboard! 📋',
    ur: 'شعر کاپی ہو گیا! 📋',
    ar: 'تم نسخ الشعر إلى الحافظة! 📋',
    es: '¡Poesía copiada al portapapeles! 📋',
    fr: 'Poésie copiée dans le presse-papiers ! 📋',
    hi: 'शायरी क्लिपबोर्ड पर कॉपी हो गई! 📋',
    zh: '诗词已复制到剪贴板！📋',
    pt: 'Poesia copiada para a área de transferência! 📋',
    ru: 'Стихотворение скопировано в буфер обмена! 📋',
    de: 'Gedicht in die Zwischenablage kopiert! 📋',
    ja: '詩をクリップボードにコピーしました！📋',
    ko: '시가 클립보드에 복사되었습니다! 📋',
    it: 'Poesia copiata negli appunti! 📋',
    tr: 'Şiir panoya kopyalandı! 📋',
    id: 'Puisi disalin ke papan klip! 📋',
    bn: 'কবিতাটি ক্লিপবোর্ডে কপি করা হয়েছে! 📋',
    vi: 'Đã sao chép thơ vào khay nhớ tạm! 📋',
    sw: 'Shairi limenakiliwa kwenye ubao wa kunakili! 📋',
  },
}


export default function PoetryGuidePage() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  const showToast = useJashn((s) => s.showToast)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const getText = (key: string) => {
    return POETRY_GUIDE_TEXT[key]?.[lang] || POETRY_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  const handleCopy = (verse: CuratedTreasuryVerse) => {
    const text = `${verse.originalText}\n\n— ${isUrdu ? verse.poetUrdu : verse.poet}\nhttps://cardzy.online/poetry`
    navigator.clipboard.writeText(text)
    setCopiedId(verse.id)
    showToast(getText('toastCopied'), 'success')
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleWhatsApp = (verse: CuratedTreasuryVerse) => {
    const text = encodeURIComponent(
      `${verse.originalText}\n\n— ${isUrdu ? verse.poetUrdu : verse.poet}\n\nhttps://cardzy.online/poetry`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  return (
    <div className="py-8 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-foreground">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Celebration Guides', href: '/guide' },
          { label: 'Poetry Treasury & Story Cards' },
        ]}
        className="mb-4"
      />

      {/* Back button */}
      <Link
        href="/guide"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>{getText('backToGuides')}</span>
      </Link>

      {/* Guide Header */}
      <div className="space-y-4 border-b border-border/80 pb-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Feather className="size-3.5 text-amber-500" />
          <span>{getText('badge')}</span>
        </div>

        <h1 className={cn(
          "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
          isUrdu ? "font-urdu leading-relaxed" : "leading-tight"
        )}>
          {getText('title')}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {getText('subtitle')}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>{getText('publishedDate')}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>{getText('readTime')}</span>
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            <span>{getText('author')}</span>
          </span>
        </div>
      </div>

      {/* Guide Body */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-10 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {getText('sec1Title')}
          </h2>
          <p className="text-muted-foreground">
            {getText('sec1Desc')}
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            {getText('sec1Callout')}
          </div>
        </section>

        {/* Section 2: Curated Verses with Copy, WhatsApp & Treasury Links */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {getText('sec2Title')}
              </h2>
              <p className="text-xs text-muted-foreground">
                {getText('sec2Subtitle')}
              </p>
            </div>
            <Link
              href="/poetry"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors shrink-0"
            >
              <span>{getText('exploreBtn')}</span>
              <Sparkles className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_TREASURY_VERSES.map((v) => (
              <div
                key={v.id}
                translate="no"
                className="notranslate p-5 rounded-2xl bg-card border border-border/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {isUrdu ? v.category : v.themeBadge}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {v.mood}
                    </span>
                  </div>

                  <p translate="no" className="notranslate font-urdu text-lg sm:text-xl text-right leading-loose text-foreground py-2 font-medium">
                    {v.originalText}
                  </p>

                  <p translate="no" className="notranslate text-xs text-muted-foreground italic mt-2 border-t border-border/50 pt-2">
                    "{v.translation}"
                  </p>
                  <p translate="no" className="notranslate text-xs font-bold text-amber-500 mt-1">
                    — {isUrdu ? v.poetUrdu : v.poet}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => handleCopy(v)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors"
                  >
                    {copiedId === v.id ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                    <span>{copiedId === v.id ? getText('copied') : getText('copySher')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsApp(v)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Share2 className="size-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <Link
                    href={`/poetry?id=${v.verseId}`}
                    className="flex items-center justify-center p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors shrink-0"
                    title="Open in Treasury"
                  >
                    <BookOpen className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Instant Story Card Downloads */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {getText('sec3Title')}
          </h2>
          <p className="text-muted-foreground">
            {getText('sec3Desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">{getText('step1Title')}</div>
              <p className="text-xs text-muted-foreground">{getText('step1Desc')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">{getText('step2Title')}</div>
              <p className="text-xs text-muted-foreground">{getText('step2Desc')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-extrabold text-sm">{getText('step3Title')}</div>
              <p className="text-xs text-muted-foreground">{getText('step3Desc')}</p>
            </div>
          </div>

          {/* Self-Creation Studio Highlight */}
          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-slate-900 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-amber-400" />
              <h3 className="text-base font-bold text-foreground">
                {getText('customStudioTitle')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {getText('customStudioDesc')}
            </p>
          </div>
        </section>

        {/* Section 4: Dynamic Filtering */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {getText('sec4Title')}
          </h2>
          <p className="text-muted-foreground">
            {getText('sec4Desc')}
          </p>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong>{getText('filterLang').split(':')[0]}:</strong>{getText('filterLang').substring(getText('filterLang').indexOf(':') + 1)}
            </li>
            <li>
              <strong>{getText('filterPoet').split(':')[0]}:</strong>{getText('filterPoet').substring(getText('filterPoet').indexOf(':') + 1)}
            </li>
            <li>
              <strong>{getText('filterTheme').split(':')[0]}:</strong>{getText('filterTheme').substring(getText('filterTheme').indexOf(':') + 1)}
            </li>
            <li>
              <strong>{getText('filterFormat').split(':')[0]}:</strong>{getText('filterFormat').substring(getText('filterFormat').indexOf(':') + 1)}
            </li>
          </ul>
        </section>

        {/* Section 5: Call to Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-slate-900 border border-amber-500/30 text-center space-y-4 mt-8">
          <Feather className="size-8 mx-auto text-amber-400 animate-pulse" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {getText('ctaTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            {getText('ctaDesc')}
          </p>
          <div className="pt-2">
            <Link
              href="/poetry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
            >
              <span>{getText('ctaBtn')}</span>
              <Sparkles className="size-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
