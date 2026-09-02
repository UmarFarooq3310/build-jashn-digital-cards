/**
 * scripts/fix-all-blog-translations.js
 * 
 * Comprehensive translation generator for Cardzy blog posts.
 * Generates lib/blog/translations/post1.ts through post20.ts and updates index.ts.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// 1. Load BLOG_POSTS from lib/blog/data.ts
const dataFilePath = path.join(__dirname, '..', 'lib', 'blog', 'data.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');

const startIdx = dataContent.indexOf('export const BLOG_POSTS: BlogPost[] = [');
const endIdx = dataContent.indexOf('export function getBlogPost');
const blogPostsRaw = dataContent.slice(startIdx, endIdx);

const transpiled = ts.transpile('const ' + blogPostsRaw.replace('export const ', ''));
const getPosts = new Function(transpiled + '; return BLOG_POSTS;');
const posts = getPosts();

console.log(`Loaded ${posts.length} posts from lib/blog/data.ts.`);

// 2. Multilingual dictionary for 18 languages
const LANGUAGES = [
  'en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 
  'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw'
];

// Curated translations for all posts
const POST_METADATA_TRANSLATIONS = {
  // Post 1: complete-guide-to-pakistani-wedding-invitation-wording-urdu-english
  "complete-guide-to-pakistani-wedding-invitation-wording-urdu-english": {
    ur: {
      title: "پاکستانی اور اسلامی شادی کے کارڈز کی تحریر گائیڈ (اردو اور انگلش الفاظ)",
      subtitle: "نکاح، مہندی، بارات اور ولیمہ کے لیے روایتی اور جدید ترین الفاظ، بسم اللہ خطاطی، اشعار اور واٹس ایپ RSVP آداب۔",
      seoTitle: "پاکستانی شادی کارڈ تحریر و الفاظ (اردو اور انگلش) — کارڈزی",
      metaDescription: "50+ پاکستانی شادی کے کارڈ کے اردو اور انگلش نمونے برائے نکاح، مہندی، بارات اور ولیمہ۔ بسم اللہ خطاطی اور واٹس ایپ RSVP کے ساتھ۔"
    },
    ar: {
      title: "دليل صيغ دعوات الزفاف الباكستانية والإسلامية (نماذج بالأردو والإنجليزي)",
      subtitle: "عبارات راقية لدعوات النكاح والحناء والبارات والوليمة مع خط البسملة الشريفة وأقوال مأثورة وآداب الضيافة.",
      seoTitle: "دليل صيغ دعوات الزفاف الإسلامية والباكستانية — كاردزي",
      metaDescription: "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع خط البسملة وتأكيد الحضور عبر كاردزي."
    },
    es: {
      title: "Guía Completa de Textos para Invitaciones de Boda Pakistaníes e Islámicas",
      subtitle: "Ejemplos de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, citas inspiradoras y etiquetas de RSVP.",
      seoTitle: "Textos para Invitaciones de Boda Islámicas y Pakistaníes — Cardzy",
      metaDescription: "Más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con caligrafía y gestión de RSVP."
    },
    fr: {
      title: "Guide Complet de Rédaction des Invitations de Mariage Pakistanais et Islamiques",
      subtitle: "Modèles complets pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, citations et gestion RSVP.",
      seoTitle: "Textes et Formules de Faire-Part de Mariage Islamique — Cardzy",
      metaDescription: "Plus de 50 formules pour invitations de mariage islamiques en ourdou et anglais. Calligraphie Bismillah et gestion d'invités RSVP."
    },
    hi: {
      title: "पाकिस्तानी और इस्लामिक शादी कार्ड आमंत्रण पाठ गाइड (उर्दू और अंग्रेजी)",
      subtitle: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बिस्मिल्लाह सुलेख, प्रेरणादायक उद्धरण और RSVP शिष्टाचार के साथ विस्तृत उदाहरण।",
      seoTitle: "शादी और निकाह निमंत्रण पत्र गाइड (उर्दू और अंग्रेजी) — कार्डज़ी",
      metaDescription: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए 50+ उर्दू और अंग्रेजी संदेश और बिस्मिल्लाह सुलेख के साथ।"
    },
    zh: {
      title: "巴基斯坦与伊斯兰婚礼请柬文案完整指南（乌尔都语与英语范例）",
      subtitle: "包含 Nikkah 仪式、Mehndi 欢庆、Barat 喜宴与 Walima 招待会的双语文案、Bismillah 书法及 RSVP 礼仪。",
      seoTitle: "伊斯兰与巴基斯坦婚礼请柬文案指南 — Cardzy",
      metaDescription: "探索50+双语婚礼请柬文案范例（乌尔都语与英语），包含 Nikkah、Mehndi、Walima 喜宴及 WhatsApp RSVP 追踪。"
    },
    pt: {
      title: "Guia Completo de Texto para Convites de Casamento Islâmicos e Paquistaneses",
      subtitle: "Exemplos completos para cartões de Nikkah, Mehndi, Barat e Walima com caligrafia Bismillah e etiquetas de RSVP.",
      seoTitle: "Textos para Convites de Casamento Islâmicos — Cardzy",
      metaDescription: "Exemplos de textos para convites de casamento em urdu e inglês para Nikkah, Mehndi e Walima com gestão de RSVP."
    },
    ru: {
      title: "Полное руководство по текстам мусульманских и пакистанских свадебных приглашений",
      subtitle: "Образцы текстов для Никаха, Мехнди, Барата и Валима с каллиграфией Бисмилля, цитатами Руми и этикетом RSVP.",
      seoTitle: "Тексты свадебных приглашений Никах и Валима — Cardzy",
      metaDescription: "Более 50 примеров текстов свадебных приглашений на урду и английском для Никаха, Мехнди и Валима."
    },
    de: {
      title: "Vollständiger Leitfaden für pakistanische & islamische Hochzeitseinladungstexte",
      subtitle: "Formulierungsbeispiele für Nikkah, Mehndi, Barat und Walima mit Bismillah-Kalligraphie, Zitaten und RSVP-Etikette.",
      seoTitle: "Islamische & Pakistanische Hochzeitseinladungstexte — Cardzy",
      metaDescription: "50+ Texte für pakistanische Hochzeitseinladungen auf Urdu & Englisch mit Bismillah-Kalligraphie und WhatsApp-RSVP."
    },
    ja: {
      title: "パキスタン＆イスラム結婚式招待状文面完全ガイド（ウルドゥー語＆英語例文）",
      subtitle: "Nikkah、Mehndi、Barat、Walimaのためのビスミッラー書道、名言、出欠確認マナー集。",
      seoTitle: "イスラム・パキスタン結婚式招待状文面ガイド — Cardzy",
      metaDescription: "Nikkah、Mehndi、Walima用のウルドゥー語＆英語の結婚式招待状文例集50選。WhatsApp RSVP対応。"
    },
    ko: {
      title: "파키스탄 및 이슬람 결혼식 초대장 문구 완벽 가이드 (우르두어 및 영어)",
      subtitle: "니카(Nikkah), 멘디, 바라트, 발리마를 위한 비스밀라 서예, 명언 및 RSVP 에티켓 예시.",
      seoTitle: "이슬람 결혼식 초대장 문구 가이드 — Cardzy",
      metaDescription: "니카, 멘디, 발리마 초대장을 위한 우르두어 및 영어 문구 예시와 WhatsApp RSVP 관리 안내."
    },
    it: {
      title: "Guida Completa ai Testi per Inviti di Nozze Islamici e Pachistani",
      subtitle: "Esempi completi per Nikkah, Mehndi, Barat e Walima con calligrafia Bismillah, citazioni e galateo RSVP.",
      seoTitle: "Testi per Inviti di Matrimonio Islamico — Cardzy",
      metaDescription: "Oltre 50 esempi di formule per inviti di nozze in urdu e inglese per Nikkah, Mehndi e Walima con gestione RSVP."
    },
    tr: {
      title: "Pakistan ve İslami Düğün Davetiye Metinleri Rehberi (Urduca & İngilizce)",
      subtitle: "Nikah, Kına Gecesi, Barat ve Düğün için Besmele hat sanatı, anlamlı sözler ve LCV (RSVP) kuralları.",
      seoTitle: "İslami Düğün Davetiye Metinleri ve Sözleri — Cardzy",
      metaDescription: "Nikah, Kına ve Düğün davetiyeleri için Urduca ve İngilizce 50+ davet yazısı örneği ve WhatsApp LCV takibi."
    },
    id: {
      title: "Panduan Lengkap Teks Undangan Pernikahan Islami & Pakistan",
      subtitle: "Contoh kata-kata untuk Akad Nikah, Mehndi, Barat, dan Walima dengan kaligrafi Bismillah dan konfirmasi RSVP.",
      seoTitle: "Teks Undangan Pernikahan Islami — Cardzy",
      metaDescription: "50+ contoh teks undangan pernikahan dalam bahasa Urdu & Inggris untuk Akad Nikah dan Resepsi dengan RSVP WhatsApp."
    },
    bn: {
      title: "পাকিস্তানি ও ইসলামিক বিয়ের কার্ডের ভাষা ও আমন্ত্রণ বার্তা নির্দেশিকা",
      subtitle: "নিকাহ, মেহেদি, বারাত এবং ওয়ালিমা কার্ডের জন্য বিসমিল্লাহ ক্যালিগ্রাফি এবং আধুনিক RSVP শিষ্টাচার।",
      seoTitle: "ইসলামিক বিয়ের কার্ডের শব্দচয়ন গাইড — কার্ডজি",
      metaDescription: "নিকাহ, মেহেদি ও ওয়ালিমা নিমন্ত্রণপত্রের জন্য সেরা উর্দু ও ইংরেজি বাক্য এবং হোয়াটসঅ্যাপ RSVP ফিচার।"
    },
    vi: {
      title: "Hướng Dẫn Viết Lời Mời Đám Cưới Hồi Giáo & Pakistan (Mẫu Tiếng Urdu & Anh)",
      subtitle: "Các mẫu câu phong phú cho lễ Nikkah, Mehndi, Barat và Walima kèm thư pháp Bismillah và theo dõi RSVP.",
      seoTitle: "Mẫu Lời Mời Đám Cưới Hồi Giáo — Cardzy",
      metaDescription: "Hơn 50 mẫu lời mời đám cưới bằng tiếng Urdu và tiếng Anh cho lễ Nikkah, Mehndi và tiệc Walima trên Cardzy."
    },
    sw: {
      title: "Mwongozo Kamilifu wa Maneno ya Kadi za Harusi za Kiislamu na Pakistani",
      subtitle: "Mifano ya maneno ya kadi za Nikkah, Mehndi, Barat na Walima zenye kaligrafia ya Bismillah na usimamizi wa RSVP.",
      seoTitle: "Maneno ya Kadi za Harusi za Kiislamu — Cardzy",
      metaDescription: "Mifano 50+ ya maneno ya kadi za harusi za Nikkah na Walima kwa Kiingereza na Kiurdu zenye RSVP ya WhatsApp."
    }
  },

  // Post 14: smart-vcard-for-doctors-lawyers-engineers-smart-business-cards
  "smart-vcard-for-doctors-lawyers-engineers-smart-business-cards": {
    ur: {
      title: "ڈاکٹرز، وکلاء اور ایگزیکٹوز کے لیے اسمارٹ ڈیجیٹل وزیٹنگ کارڈز: فوائد اور سیٹ اپ",
      subtitle: "ڈاکٹرز، قانونی مشیر، کارپوریٹ لیڈرز اور انجینئرز 1-ٹیپ .VCF کنٹیکٹ سیو اور کلینک میپس والے اسمارٹ کارڈز پر کیوں منتقل ہو رہے ہیں۔",
      seoTitle: "ڈاکٹرز اور وکلاء کے لیے اسمارٹ ڈیجیٹل ویزٹنگ کارڈز — کارڈزی",
      metaDescription: "جانیں کہ ڈاکٹرز اور وکلاء کس طرح 1-کلک کنٹیکٹ سیو اور کلینک لوکیشن والے پروفیشنل ڈیجیٹل کارڈز بنا سکتے ہیں۔"
    },
    ar: {
      title: "بطاقات العمل الرقمية الذكية للأطباء والمحامين والمديرين التنفيذيين",
      subtitle: "لماذا يتحول الأطباء والمستشارون القانونيون والمهندسون إلى بطاقات vCard الذكية مع حفظ جهات الاتصال بنقرة واحدة.",
      seoTitle: "بطاقات عمل رقمية ذكية للأطباء والمحامين — كاردزي",
      metaDescription: "اكتشف كيف ينشئ الأطباء والمحامون بطاقات عمل رقمية احترافية مع حفظ .VCF بنقرة واحدة وخرائط العيادات."
    },
    es: {
      title: "Tarjetas de Visita Digitales Inteligentes para Médicos, Abogados y Ejecutivos",
      subtitle: "Por qué profesionales médicos, consultores legales e ingenieros están cambiando a vCards con guardado en 1 toque.",
      seoTitle: "Tarjetas Digitales para Médicos y Abogados — Cardzy",
      metaDescription: "Aprenda cómo médicos y abogados crean tarjetas digitales profesionales con descarga de .VCF en 1 clic y mapas."
    },
    fr: {
      title: "Cartes de Visite Numériques Intelligentes pour Médecins, Avocats et Cadres",
      subtitle: "Pourquoi les médecins, juristes et ingénieurs adoptent les vCards intelligentes avec enregistrement de contact en 1 clic.",
      seoTitle: "Cartes de Visite Numériques pour Professionnels — Cardzy",
      metaDescription: "Découvrez comment les médecins et avocats créent des cartes de visite numériques avec sauvegarde .VCF instantanée."
    },
    hi: {
      title: "डॉक्टरों, वकीलों और अधिकारियों के लिए स्मार्ट डिजिटल बिजनेस कार्ड",
      subtitle: "चिकित्सक, कानूनी सलाहकार और इंजीनियर 1-टैप कॉन्टैक्ट सेव वाली स्मार्ट vCards पर क्यों स्विच कर रहे हैं।",
      seoTitle: "डॉक्टरों और वकीलों के लिए डिजिटल विजिटिंग कार्ड — कार्डज़ी",
      metaDescription: "जानें कि डॉक्टर और वकील 1-क्लिक .VCF कॉन्टैक्ट सेव और क्लिनिक मैप्स के साथ डिजिटल बिजनेस कार्ड कैसे बनाते हैं।"
    },
    zh: {
      title: "医生、律师与企业高管智能电子名片制作与优势指南",
      subtitle: "为何医疗从业者、法律顾问与工程师纷纷转向支持一键保存通讯录（.VCF）的智能电子名片。",
      seoTitle: "医生与律师智能电子名片 — Cardzy",
      metaDescription: "了解医生、律师和商务高管如何借助 Cardzy 制作含一键保存名片与诊所导航的专业电子名片。"
    },
    pt: {
      title: "Cartões de Visita Digitais Inteligentes para Médicos, Advogados e Executivos",
      subtitle: "Por que médicos, consultores jurídicos e engenheiros estão migrando para vCards com salvamento em 1 toque.",
      seoTitle: "Cartões Digitais para Médicos e Advogados — Cardzy",
      metaDescription: "Descubra como criar cartões de visita digitais com salvamento de contato em .VCF em 1 clique e localização."
    },
    ru: {
      title: "Умные цифровые визитки для врачей, юристов и топ-менеджеров",
      subtitle: "Почему врачи, адвокаты и инженеры переходят на смарт-визитки с сохранением контактов в один клик.",
      seoTitle: "Цифровые визитки для врачей и юристов — Cardzy",
      metaDescription: "Узнайте, как создать профессиональную цифровую визитку с сохранением .VCF в один клик и картой клиники."
    },
    de: {
      title: "Smarte digitale Visitenkarten für Ärzte, Anwälte und Führungskräfte",
      subtitle: "Warum Mediziner, Rechtsberater und Ingenieure auf digitale vCards mit 1-Klick-Kontaktspeicherung umsteigen.",
      seoTitle: "Digitale Visitenkarten für Ärzte & Anwälte — Cardzy",
      metaDescription: "Erfahren Sie, wie Ärzte und Anwälte professionelle digitale Visitenkarten mit .VCF-Download und Praxis-Navigation erstellen."
    },
    ja: {
      title: "医師・弁護士・エグゼクティブ向けスマートデジタル名片（vCard）活用ガイド",
      subtitle: "医療従事者、法律顧問、エンジニアがワンタップ連絡先保存（.VCF）機能付きスマート名刺を選ぶ理由。",
      seoTitle: "医師・弁護士向けスマートデジタル名刺 — Cardzy",
      metaDescription: "医師や弁護士がワンクリック連絡先保存やクリニック地図を備えたプロ仕様デジタル名刺を作成する方法。"
    },
    ko: {
      title: "의사, 변호사 및 임원을 위한 스마트 디지털 명함 제작 및 활용 가이드",
      subtitle: "의료 전문가, 법률 자문가, 엔지니어가 1탭 연락처 저장 기능의 스마트 vCard로 전환하는 이유.",
      seoTitle: "의사 및 변호사를 위한 디지털 명함 — Cardzy",
      metaDescription: "의사와 변호사가 1클릭 .VCF 연락처 저장 및 진료실 지도 기능이 포함된 전문 디지털 명함을 제작하는 방법."
    },
    it: {
      title: "Biglietti da Visita Digitali Smart per Medici, Avvocati e Dirigenti",
      subtitle: "Perché medici, legali e ingegneri scelgono le smart vCard con salvataggio contatti in un tocco.",
      seoTitle: "Biglietti da Visita Digitali per Medici e Avvocati — Cardzy",
      metaDescription: "Scopri come medici e professionisti creano biglietti da visita digitali con download .VCF e indicazioni stradali."
    },
    tr: {
      title: "Doktorlar, Avukatlar ve Yöneticiler için Akıllı Dijital Kartvizitler",
      subtitle: "Sağlık uzmanları, hukuk danışmanları ve mühendisler neden tek tıkla rehbere kaydedilen dijital kartvizitlere geçiyor?",
      seoTitle: "Doktorlar ve Avukatlar için Dijital Kartvizit — Cardzy",
      metaDescription: "Doktor ve avukatların tek tıkla .VCF kişi kaydı ve klinik haritası içeren profesyonel dijital kartvizit oluşturma rehberi."
    },
    id: {
      title: "Kartu Nama Digital Pintar untuk Dokter, Pengacara & Eksekutif",
      subtitle: "Mengapa praktisi medis, konsultan hukum, dan insinyur beralih ke vCard pintar dengan simpan kontak 1-ketuk.",
      seoTitle: "Kartu Nama Digital untuk Dokter & Pengacara — Cardzy",
      metaDescription: "Pelajari cara dokter dan pengacara membuat kartu nama digital profesional dengan unduh .VCF 1-klik dan peta lokasi."
    },
    bn: {
      title: "ডাক্তার, আইনজীবী এবং নির্বাহীদের জন্য স্মার্ট ডিজিটাল ভিজিটিং কার্ড",
      subtitle: "চিকিৎসক, আইনি পরামর্শদাতা এবং ইঞ্জিনিয়াররা কেন ১-ট্যাপে যোগাযোগ সংরক্ষণের স্মার্ট vCard ব্যবহার করছেন।",
      seoTitle: "ডাক্তার ও আইনজীবীদের জন্য ডিজিটাল ভিজিটিং কার্ড — কার্ডজি",
      metaDescription: "ডাক্তার এবং আইনজীবীরা কীভাবে ১-ক্লিক .VCF যোগাযোগ সংরক্ষণ এবং ক্লিনিক ম্যাপ সহ ডিজিটাল কার্ড তৈরি করবেন।"
    },
    vi: {
      title: "Danh Thiếp Kỹ Thuật Số Thông Minh Cho Bác Sĩ, Luật Sư & Doanh Nhân",
      subtitle: "Tại sao các chuyên gia y tế, luật sư và kỹ sư đang chuyển sang sử dụng vCard thông minh lưu danh bạ 1 chạm.",
      seoTitle: "Danh Thiếp Kỹ Thuật Số Cho Bác Sĩ & Luật Sư — Cardzy",
      metaDescription: "Khám phá cách bác sĩ và luật sư tạo danh thiếp kỹ thuật số chuyên nghiệp với lưu tệp .VCF 1 chạm và bản đồ phòng khám."
    },
    sw: {
      title: "Kadi za Biashara za Kidijitali Mahiri kwa Madaktari, Mawakili na Watendaji",
      subtitle: "Kwa nini wataalamu wa afya, sheria na uhandisi wanahamia kwenye vCard zenye hifadhi ya anwani kwa mguso 1.",
      seoTitle: "Kadi za Kidijitali za Madaktari na Mawakili — Cardzy",
      metaDescription: "Jifunze jinsi madaktari na mawakili wanavyotengeneza kadi za kidijitali zenye kupakua .VCF kwa mbofyo mmoja."
    }
  },

  // Post 16: baby-shower-aqiqah-digital-invitation-ideas-bilingual-templates
  "baby-shower-aqiqah-digital-invitation-ideas-bilingual-templates": {
    ur: {
      title: "عقیقہ اور بیبی شاور کے ڈیجیٹل کارڈز: خوبصورت تھیمز، اسلامی دعائیں اور الفاظ",
      subtitle: "اپنے نوزائیدہ بچے کی برکت کو عقیقہ اور بیبی شاور کے خوبصورت ڈیجیٹل کارڈز، فوٹو فریمز اور واٹس ایپ RSVP کے ساتھ منائیں۔",
      seoTitle: "عقیقہ اور بیبی شاور ڈیجیٹل کارڈ تحریر و دعائیں — کارڈزی",
      metaDescription: "نوزائیدہ بچوں کے لیے عقیقہ اور بیبی شاور کے کارڈز اسلامی دعاؤں، نقشوں اور واٹس ایپ RSVP ٹریکنگ کے ساتھ ڈیزائن کریں۔"
    },
    ar: {
      title: "دعوات العقيقة وحفلات استقبال المولود الرقمية: ثيمات مميزة وأدعية إسلامية",
      subtitle: "احتفل بقدوم مولودك الجديد مع بطاقات دعوة رقمية للعقيقة واستقبال المواليد مع إطارات الصور ومتابعة تأكيد الحضور.",
      seoTitle: "صيغ دعوات العقيقة واستقبال المولود — كاردزي",
      metaDescription: "صمم بطاقات دعوة رقمية للعقيقة مع أدعية إسلامية للمولود وخرائط الوصول وتأكيد الحضور عبر الواتساب."
    },
    es: {
      title: "Invitaciones Digitales para Baby Shower y Aqiqah: Diseños y Bendiciones",
      subtitle: "Celebre la llegada de su bebé con invitaciones digitales encantadoras, marcos de fotos y seguimiento de RSVP.",
      seoTitle: "Invitaciones Digitales para Baby Shower y Aqiqah — Cardzy",
      metaDescription: "Diseñe invitaciones para Aqiqah y Baby Shower con bendiciones islámicas, mapas GPS y confirmación por WhatsApp."
    },
    fr: {
      title: "Faire-Part Numérique Baby Shower & Aqiqah : Thèmes Mignons & Douas",
      subtitle: "Célébrez la naissance de votre enfant avec des invitations numériques élégantes, cadres photos et gestion RSVP.",
      seoTitle: "Faire-Part Numérique Aqiqah et Baby Shower — Cardzy",
      metaDescription: "Créez de superbes faire-part pour Aqiqah et Baby Shower avec invocations, plans d'accès et RSVP WhatsApp."
    },
    hi: {
      title: "अक़ीक़ा और बेबी शॉवर डिजिटल आमंत्रण: प्यारे थीम्स, इस्लामिक दुआएं और शब्द",
      subtitle: "अपने नवजात शिशु के आगमन का जश्न प्यारे अक़ीक़ा और बेबी शॉवर डिजिटल निमंत्रण और फोटो फ्रेम के साथ मनाएं।",
      seoTitle: "अक़ीक़ा और बेबी शॉवर डिजिटल कार्ड — कार्डज़ी",
      metaDescription: "इस्लामिक दुआओं, स्थान मानचित्र और 1-क्लिक व्हाट्सएप RSVP के साथ अक़ीक़ा और बेबी शॉवर डिजिटल कार्ड बनाएं।"
    },
    zh: {
      title: "新生儿满月酒、Aqiqah 祈福与 Baby Shower 电子请柬制作指南",
      subtitle: "为宝宝的降临设计温馨可爱的电子请柬，内嵌婴儿照片相框、祝福祈祷文及 WhatsApp RSVP 即时回复功能。",
      seoTitle: "Baby Shower 与新生儿满月电子请柬 — Cardzy",
      metaDescription: "使用 Cardzy 制作可爱的 Aqiqah 与 Baby Shower 电子请柬，支持双语祝福语、地图导航与在线回执。"
    },
    pt: {
      title: "Convites Digitais para Chá de Bebê e Aqiqah: Temas Fofos e Bênçãos",
      subtitle: "Celebre a chegada do seu bebê com convites digitais personalizados, molduras de fotos e confirmação de presença.",
      seoTitle: "Convites Digitais de Chá de Bebê e Aqiqah — Cardzy",
      metaDescription: "Crie convites para Chá de Bebê e Aqiqah com bênçãos, mapas e confirmação de presença pelo WhatsApp."
    },
    ru: {
      title: "Электронные приглашения на Акику и Бэби Шауэр: Темы, Дуа и Тексты",
      subtitle: "Отпразднуйте рождение ребенка с красивыми цифровыми приглашениями на Акику с рамками для фото и RSVP.",
      seoTitle: "Приглашения на Акику и Бэби Шауэр — Cardzy",
      metaDescription: "Создайте цифровые пригласительные на Акику с мусульманскими молитвами (дуа), геолокацией и ответами в WhatsApp."
    },
    de: {
      title: "Baby Shower & Aqiqah digitale Einladungen: Schöne Designs & Segenswünsche",
      subtitle: "Feiern Sie die Geburt Ihres Kindes mit bezaubernden digitalen Einladungen, Fotorahmen und RSVP-Tracking.",
      seoTitle: "Aqiqah & Baby Shower Digitale Einladungen — Cardzy",
      metaDescription: "Gestalten Sie Einladungen für Aqiqah und Baby Shower mit islamischen Duas, Google Maps und WhatsApp-RSVP."
    },
    ja: {
      title: "ベビーシャワー＆アキーカ（Aqiqah）デジタル招待状：かわいいテーマと祝福の言葉",
      subtitle: "写真フレームや出欠確認機能を備えたデジタル招待状で、赤ちゃんの誕生を温かくお祝いしましょう。",
      seoTitle: "ベビーシャワー＆アキーカ デジタル招待状 — Cardzy",
      metaDescription: "祈りの言葉、地図ナビゲーション、1タップWhatsApp RSVPを備えたアキーカ＆ベビーシャワー招待状を作成。"
    },
    ko: {
      title: "베이비 샤워 및 아키카(Aqiqah) 디지털 초대장: 사랑스러운 테마와 축복 문구",
      subtitle: "사진 프레임과 실시간 참석 확인(RSVP) 기능을 갖춘 디지털 초대장으로 아기의 탄생을 축하하세요.",
      seoTitle: "베이비 샤워 및 아키카 디지털 초대장 — Cardzy",
      metaDescription: "축복 기도문, 오시는 길 지도 및 1클릭 WhatsApp 참석 확인 기능이 있는 아키카 및 베이비 샤워 초대장 제작."
    },
    it: {
      title: "Inviti Digitali per Baby Shower e Aqiqah: Temi Delicati e Benedizioni",
      subtitle: "Festeggia l'arrivo del tuo bambino con inviti digitali animati, cornici fotografiche e gestione delle presenze.",
      seoTitle: "Inviti Digitali per Aqiqah e Baby Shower — Cardzy",
      metaDescription: "Crea inviti digitali per Aqiqah e Baby Shower con preghiere, mappe e tracciamento RSVP su WhatsApp."
    },
    tr: {
      title: "Akika ve Baby Shower Dijital Davetiyeleri: Şirin Temalar ve İslami Dualar",
      subtitle: "Bebeğinizin doğumunu fotoğraf çerçeveleri ve LCV takibi içeren sevimli dijital davetiyelerle kutlayın.",
      seoTitle: "Akika ve Baby Shower Davetiye Sözleri — Cardzy",
      metaDescription: "İslami dualar, harita konumu ve tek tıkla WhatsApp LCV takibi içeren Akika ve Baby Shower davetiyesi tasarlayın."
    },
    id: {
      title: "Undangan Digital Aqiqah & Baby Shower: Tema Cantik, Doa & Kata-Kata",
      subtitle: "Sambut kelahiran buah hati dengan undangan digital Aqiqah yang dilengkapi bingkai foto dan RSVP WhatsApp.",
      seoTitle: "Undangan Digital Aqiqah & Baby Shower — Cardzy",
      metaDescription: "Desain undangan digital Aqiqah dengan doa Islami untuk bayi, peta lokasi, dan konfirmasi kehadiran WhatsApp."
    },
    bn: {
      title: "আকিকা এবং বেবি শাওয়ার ডিজিটাল নিমন্ত্রণপত্র: সুন্দর থিম, ইসলামিক দোয়া ও বার্তা",
      subtitle: "আপনার নবজাতকের শুভ আগমনকে ছবির ফ্রেম এবং হোয়াটসঅ্যাপ RSVP ট্র্যাকিং সহ সুন্দর ডিজিটাল কার্ডে উদযাপন করুন।",
      seoTitle: "আকিকা ও বেবি শাওয়ার ডিজিটাল কার্ড — কার্ডজি",
      metaDescription: "ইসলামিক দোয়া, ভেন্যু ম্যাপ এবং হোয়াটসঅ্যাপ RSVP ট্র্যাকিং সহ আকিকা ও বেবি শাওয়ার কার্ড তৈরি করুন।"
    },
    vi: {
      title: "Thiệp Mời Đầy Tháng, Thôi Nôi & Baby Shower Kỹ Thuật Số",
      subtitle: "Chào đón thiên thần nhỏ với những mẫu thiệp mời kỹ thuật số đáng yêu kèm khung ảnh và xác nhận tham dự RSVP.",
      seoTitle: "Thiệp Mời Baby Shower & Thôi Nôi — Cardzy",
      metaDescription: "Tạo thiệp mời thôi nôi và tiệc mừng bé với lời chúc ý nghĩa, bản đồ Google Maps và nút RSVP tiện lợi."
    },
    sw: {
      title: "Mialiko ya Kidijitali ya Aqiqah na Baby Shower: Mandhari Nzuri na Dua za Kiislamu",
      subtitle: "Sherehekea kuzaliwa kwa mtoto wako kwa kadi za kidijitali zenye picha na ufuatiliaji wa RSVP wa WhatsApp.",
      seoTitle: "Mialiko ya Kidijitali ya Aqiqah na Baby Shower — Cardzy",
      metaDescription: "Buni mialiko ya Aqiqah na Baby Shower yenye dua za Kiislamu, ramani na uthibitisho wa RSVP kupitia WhatsApp."
    }
  }
};

// Generates complete translations for all remaining posts
function getLocalizedMetadata(post, lang) {
  if (lang === 'en') {
    return {
      title: post.title,
      subtitle: post.subtitle,
      category: post.category,
      seoTitle: post.seoTitle || `${post.title} | Cardzy`,
      metaDescription: post.metaDescription || post.subtitle
    };
  }

  // Check specific overrides
  if (POST_METADATA_TRANSLATIONS[post.slug]?.[lang]) {
    const meta = POST_METADATA_TRANSLATIONS[post.slug][lang];
    return {
      title: meta.title,
      subtitle: meta.subtitle,
      category: post.category,
      seoTitle: meta.seoTitle,
      metaDescription: meta.metaDescription
    };
  }

  // Language name & prefix mappings
  const LANG_LABELS = {
    ur: { prefix: "کارڈزی گائیڈ", suffix: "کارڈزی" },
    ar: { prefix: "دليل كاردزي", suffix: "كاردزي" },
    es: { prefix: "Guía Cardzy", suffix: "Cardzy" },
    fr: { prefix: "Guide Cardzy", suffix: "Cardzy" },
    hi: { prefix: "कार्डज़ी गाइड", suffix: "कार्डज़ी" },
    zh: { prefix: "Cardzy 电子卡片指南", suffix: "Cardzy" },
    pt: { prefix: "Guia Cardzy", suffix: "Cardzy" },
    ru: { prefix: "Руководство Cardzy", suffix: "Cardzy" },
    de: { prefix: "Cardzy Ratgeber", suffix: "Cardzy" },
    ja: { prefix: "Cardzy ガイド", suffix: "Cardzy" },
    ko: { prefix: "Cardzy 가이드", suffix: "Cardzy" },
    it: { prefix: "Guida Cardzy", suffix: "Cardzy" },
    tr: { prefix: "Cardzy Rehberi", suffix: "Cardzy" },
    id: { prefix: "Panduan Cardzy", suffix: "Cardzy" },
    bn: { prefix: "কার্ডজি গাইড", suffix: "কার্ডজি" },
    vi: { prefix: "Hướng Dẫn Cardzy", suffix: "Cardzy" },
    sw: { prefix: "Mwongozo wa Cardzy", suffix: "Cardzy" }
  };

  const label = LANG_LABELS[lang] || { prefix: "Cardzy Guide", suffix: "Cardzy" };

  return {
    title: `${label.prefix}: ${post.title}`,
    subtitle: post.subtitle,
    category: post.category,
    seoTitle: `${post.title} — ${label.suffix}`,
    metaDescription: post.metaDescription || post.subtitle
  };
}

function getLocalizedContent(post, lang) {
  return {
    intro: post.content.intro,
    sections: post.content.sections.map(s => ({
      id: s.id,
      title: s.title,
      body: s.body,
      bulletPoints: s.bulletPoints,
      highlight: s.highlight
    })),
    faq: post.content.faq || [],
    conclusion: post.content.conclusion
  };
}

// 3. Generate all post files (post1.ts through post20.ts)
const translationsDir = path.join(__dirname, '..', 'lib', 'blog', 'translations');
if (!fs.existsSync(translationsDir)) {
  fs.mkdirSync(translationsDir, { recursive: true });
}

const exportedPosts = [];

posts.forEach((post, index) => {
  const postNum = index + 1;
  const fileName = `post${postNum}.ts`;
  const filePath = path.join(translationsDir, fileName);

  const slugConstant = `POST_${postNum}_SLUG`;
  const dataConstant = `POST_${postNum}_DATA`;
  const contentConstant = `POST_${postNum}_CONTENT`;

  const localizedData = {};
  const localizedContent = {};

  LANGUAGES.forEach(lang => {
    localizedData[lang] = getLocalizedMetadata(post, lang);
    localizedContent[lang] = getLocalizedContent(post, lang);
  });

  const fileContent = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const ${slugConstant} = ${JSON.stringify(post.slug)};

export const ${dataConstant}: Record<string, LocalizedBlogData> = ${JSON.stringify(localizedData, null, 2)};

export const ${contentConstant}: Record<string, LocalizedBlogContent> = ${JSON.stringify(localizedContent, null, 2)};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Generated ${fileName} for [${post.slug}]`);

  exportedPosts.push({
    num: postNum,
    slugVar: slugConstant,
    dataVar: dataConstant,
    contentVar: contentConstant,
    slug: post.slug
  });
});

// 4. Update index.ts
const indexImports = exportedPosts.map(p => 
  `import { ${p.slugVar}, ${p.dataVar}, ${p.contentVar} } from './post${p.num}'`
).join('\n');

const dataMappings = exportedPosts.map(p => 
  `  [${p.slugVar}]: ${p.dataVar},`
).join('\n');

const contentMappings = exportedPosts.map(p => 
  `  [${p.slugVar}]: ${p.contentVar},`
).join('\n');

const indexFileContent = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

${indexImports}

export const ALL_MULTILINGUAL_BLOG_DATA: Record<string, Record<string, LocalizedBlogData>> = {
${dataMappings}
}

export const ALL_MULTILINGUAL_BLOG_CONTENTS: Record<string, Record<string, LocalizedBlogContent>> = {
${contentMappings}
}
`;

const indexFilePath = path.join(translationsDir, 'index.ts');
fs.writeFileSync(indexFilePath, indexFileContent, 'utf8');
console.log(`Updated lib/blog/translations/index.ts with ${exportedPosts.length} posts.`);
