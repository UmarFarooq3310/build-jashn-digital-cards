'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/lib/lang/context'
import { Heart, Sparkles, Globe, MapPin, Mail, MessageSquare, ShieldCheck, Zap } from 'lucide-react'

const ABOUT_TEXT: Record<string, Record<string, string>> = {
  tagline: {
    en: "Our Story & Mission",
    ur: "ہماری کہانی اور مقصد",
    es: "Nuestra Historia y Misión",
    fr: "Notre Histoire & Mission",
    ar: "قصتنا ومهمتنا",
    hi: "हमारी कहानी और मिशन",
    zh: "我们的故事与使命",
    pt: "Nossa História e Missão",
    ru: "Наша история и миссия",
    de: "Unsere Geschichte & Mission",
    ja: "私たちのストーリーとミッション",
    ko: "우리의 이야기와 사명",
    it: "La Nostra Storia e Missione",
    tr: "Hikayemiz ve Misyonumuz",
    id: "Kisah & Misi Kami",
    bn: "আমাদের গল্প ও লক্ষ্য",
    vi: "Câu Chuyện & Sứ Mệnh",
    sw: "Hadithi na Dira Wetu"
  },
  mainHeading: {
    en: "Connecting Celebrations Worldwide",
    ur: "دنیا بھر کی تقریبات کو جوڑنا",
    es: "Conectando Celebraciones en Todo el Mundo",
    fr: "Connecter les Célébrations à Travers le Monde",
    ar: "ربط الاحتفالات حول العالم",
    hi: "दुनिया भर के उत्सवों को जोड़ना",
    zh: "连接全球的美好庆典",
    pt: "Conectando Celebrações em Todo o Mundo",
    ru: "Объединяя праздники по всему миру",
    de: "Weltweite Feiern verbinden",
    ja: "世界中のお祝いを繋ぐ",
    ko: "전 세계의 축하를 연결합니다",
    it: "Connettere le Celebrazioni nel Mondo",
    tr: "Dünyadaki Kutlamaları Birleştiriyoruz",
    id: "Menghubungkan Perayaan di Seluruh Dunia",
    bn: "বিশ্বজুড়ে উৎসবের মেলবন্ধন",
    vi: "Kết Nối Mọi Dịp Lễ Trên Toàn Cầu",
    sw: "Kuunganisha Sherehe Duniani Kote"
  },
  subtitle: {
    en: "Bringing loved ones together through interactive, multi-lingual digital wish cards and event invitations.",
    ur: "انٹرایکٹو اور کثیر لسانی ڈیجیٹل کارڈز اور دعوت ناموں کے ذریعے پیاروں کو قریب لانا۔",
    es: "Uniendo a tus seres queridos mediante tarjetas e invitaciones digitales interactivas y multilingües.",
    fr: "Rapprocher vos proches grâce à des cartes de vœux et invitations numériques interactives et multilingues.",
    ar: "جمع الأحبة معًا من خلال بطاقات معايدة ودعوات رقمية تفاعلية ومتعددة اللغات.",
    hi: "इंटरएक्टिव, बहुभाषी डिजिटल विश कार्ड और निमंत्रण के माध्यम से अपनों को करीब लाना।",
    zh: "通过多语言互动数字贺卡与邀请函，让身处各地的亲友紧密相连。",
    pt: "Aproximando entes queridos através de cartões e convites digitais interativos e multilíngues.",
    ru: "Сближая близких с помощью интерактивных цифровых открыток и приглашений на разных языках.",
    de: "Bringt Ihre Liebsten durch interaktive, mehrsprachige digitale Wunschkarten und Einladungen zusammen.",
    ja: "インタラクティブで多言語に対応したデジタルカードと招待状で、大切な人々を近づけます。",
    ko: "대화형 다국어 디지털 소원 카드와 행사 초대장을 통해 사랑하는 이들을 하나로 모읍니다.",
    it: "Avvicinare i cari attraverso biglietti e inviti digitali interattivi e multilingue.",
    tr: "İnteraktif ve çok dilli dijital tebrik kartları ve davetiyelerle sevdiklerinizi bir araya getiriyoruz.",
    id: "Mendekatkan orang-orang tercinta melalui kartu ucapan dan undangan digital interaktif multi-bahasa.",
    bn: "ইন্টারেক্টিভ ও বহুভাষিক ডিজিটাল উইশ কার্ড এবং ইনভিটেশনের মাধ্যমে প্রিয়জনদের একসূত্রে বাঁধা।",
    vi: "Gắn kết người thân yêu qua thiệp chúc mừng và thiệp mời kỹ thuật số tương tác đa ngôn ngữ.",
    sw: "Kuwaleta wapendwa pamoja kupitia kadi za dijitali za lugha nyingi na mialiko shirikishi."
  },
  s1Title: {
    en: "Welcome to Cardzy",
    ur: "کارڈزی میں خوش آمدید",
    es: "Bienvenido a Cardzy",
    fr: "Bienvenue sur Cardzy",
    ar: "أهلاً بكم في كاردزي",
    hi: "Cardzy में आपका स्वागत है",
    zh: "欢迎使用 Cardzy",
    pt: "Bem-vindo ao Cardzy",
    ru: "Добро пожаловать в Cardzy",
    de: "Willkommen bei Cardzy",
    ja: "Cardzyへようこそ",
    ko: "Cardzy에 오신 것을 환영합니다",
    it: "Benvenuto su Cardzy",
    tr: "Cardzy'ye Hoş Geldiniz",
    id: "Selamat Datang di Cardzy",
    bn: "Cardzy-তে স্বাগতম",
    vi: "Chào mừng đến với Cardzy",
    sw: "Karibu Cardzy"
  },
  s1Content: {
    en: "Cardzy (cardzy.online) is a digital wish-card and event-invitation platform crafted to help people celebrate life's special moments and stay connected, no matter where they are in the world. Operating from Islamabad and Rawalpindi, Pakistan, we combine cultural authenticity with modern Web technology.",
    ur: "کارڈزی (cardzy.online) ایک ڈیجیٹل وش کارڈ اور ایونٹ انویٹیشن پلیٹ فارم ہے جو اسلام آباد اور راولپنڈی، پاکستان سے چلایا جاتا ہے۔ ہم ثقافتی روایات کو جدید ویب ٹیکنالوجی کے ساتھ جوڑتے ہیں۔",
    es: "Cardzy (cardzy.online) es una plataforma de tarjetas e invitaciones digitales diseñada para ayudar a las personas a celebrar momentos especiales. Con sede en Islamabad y Rawalpindi, Pakistán, combinamos autenticidad cultural con tecnología moderna.",
    fr: "Cardzy (cardzy.online) est une plateforme de cartes de vœux et d'invitations numériques basée à Islamabad et Rawalpindi, au Pakistan. Nous allions authenticité culturelle et technologie moderne.",
    ar: "كاردزي (cardzy.online) هي منصة بطاقات ودعوات رقمية تم إنشاؤها لمساعدة الأشخاص على الاحتفال بالمناسبات الخاصة. نعمل من إسلام آباد وراولبندي، باكستان، ونجمع بين الأصالة الثقافية والتقنية الحديثة.",
    hi: "Cardzy (cardzy.online) एक डिजिटल विश-कार्ड और आमंत्रण प्लेटफॉर्म है। इस्लामाबाद और रावलपिंडी, पाकिस्तान से संचालित, हम सांस्कृतिक प्रामाणिकता को आधुनिक वेब तकनीक के साथ जोड़ते हैं।",
    zh: "Cardzy (cardzy.online) 是一个数字祝贺卡与活动邀请函平台。总部位于巴基斯坦伊斯兰堡与拉瓦尔品第，我们致力于将传统文化底蕴与现代 Web 科技无缝结合。",
    pt: "O Cardzy (cardzy.online) é uma plataforma de cartões e convites digitais criada para celebrar momentos especiais. Operando em Islamabad e Rawalpindi, Paquistão, unimos autenticidade cultural e tecnologia moderna.",
    ru: "Cardzy (cardzy.online) — это платформа цифровых открыток и приглашений. Базируясь в Исламабаде и Равалпинди (Пакистан), мы сочетаем культурную аутентичность с современными веб-технологиями.",
    de: "Cardzy (cardzy.online) ist eine digitale Plattform für Wunschkarten und Event-Einladungen mit Sitz in Islamabad/Rawalpindi, Pakistan. Wir verbinden kulturelle Authentizität mit moderner Webtechnologie.",
    ja: "Cardzy（cardzy.online）は、特別な瞬間を祝うためのデジタルカード＆招待状プラットフォームです。パキスタンの イスラマバード/ラワルピンディ から、文化的な伝統と最新のWeb技術を融合させて届けています。",
    ko: "Cardzy(cardzy.online)는 특별한 순간을 함께 축하할 수 있도록 돕는 디지털 카드 및 초대장 플랫폼입니다. 파키스탄 이슬라마바드/라왈핀디에서 설립되어 전통 문화와 현대적 웹 기술을 결합합니다.",
    it: "Cardzy (cardzy.online) è una piattaforma di biglietti e inviti digitali creata per celebrare i momenti speciali. Con sede a Islamabad e Rawalpindi, Pakistan, uniamo autenticità culturale e tecnologia moderna.",
    tr: "Cardzy (cardzy.online), özel anları kutlamanıza yardımcı olan bir dijital kart ve davetiye platformudur. İslamabad ve Rawalpindi, Pakistan merkezli olarak kültürel samimiyeti modern teknolojiyle buluşturuyoruz.",
    id: "Cardzy (cardzy.online) adalah platform kartu ucapan dan undangan digital berbasis di Islamabad dan Rawalpindi, Pakistan. Kami menggabungkan keotentikan budaya dengan teknologi web modern.",
    bn: "Cardzy (cardzy.online) হলো একটি ডিজিটাল উইশ-কার্ড এবং ইনভিটেশন প্ল্যাটফর্ম। পাকিস্তান থেকে পরিচালিত, আমরা সাংস্কৃতিক ঐতিহ্যকে আধুনিক ওয়েব প্রযুক্তির সাথে যুক্ত করি।",
    vi: "Cardzy (cardzy.online) là nền tảng thiệp mừng và thiệp mời kỹ thuật số hoạt động từ Islamabad & Rawalpindi, Pakistan. Chúng tôi kết hợp nét văn hóa bản địa với công nghệ web hiện đại.",
    sw: "Cardzy (cardzy.online) ni jukwaa la kadi za dijitali na mialiko ya hafla lililopo Islamabad na Rawalpindi, Pakistan. Tunachanganya utamaduni wa asili na teknolojia ya kisasa ya wavuti."
  },
  s2Title: {
    en: "The Problem We Solve",
    ur: "مسئلہ جس کا ہم حل پیش کرتے ہیں",
    es: "El Problema que Solucionamos",
    fr: "Le Problème Que Nous Résolvons",
    ar: "المشكلة التي نحلها",
    hi: "समस्या जिसका हम समाधान करते हैं",
    zh: "我们解决的痛点",
    pt: "O Problema que Solucionamos",
    ru: "Проблема, которую мы решаем",
    de: "Das Problem, das wir lösen",
    ja: "解決する課題",
    ko: "우리가 해결하는 문제",
    it: "Il Problema che Risolviamo",
    tr: "Çözdüğümüz Sorun",
    id: "Masalah yang Kami Selesaikan",
    bn: "আমরা যে সমস্যার সমাধান করি",
    vi: "Vấn Đề Chúng Tôi Giải Quyết",
    sw: "Tatizo Tunalotatua"
  },
  s2Content: {
    en: "In an interconnected world, sending celebratory wishes or inviting loved ones to special milestones should be seamless, elegant, and personal. Traditional paper invitations can be expensive, slow to deliver, and difficult to manage across international borders. Cardzy replaces costly printed cards with vibrant, interactive digital experiences that reach your guests instantly on WhatsApp and social platforms.",
    ur: "کاغذی دعوت نامے مہنگے، سست اور بین الاقوامی سرحدوں کے پار پہنچانے میں دشوار ہوتے ہیں۔ کارڈزی مہنگے پرنٹ شدہ کارڈز کی جگہ رنگین اور انٹرایکٹو ڈیجیٹل تجربات فراہم کرتا ہے جو واٹس ایپ پر فوری پہنچتے ہیں۔",
    es: "Las invitaciones de papel tradicionales son costosas, lentas de entregar y difíciles de gestionar internacionalmente. Cardzy reemplaza las costosas tarjetas impresas por experiencias digitales interactivas que llegan al instante por WhatsApp.",
    fr: "Les invitations papier sont coûteuses, lentes à livrer et difficiles à gérer à l'international. Cardzy remplace les cartes imprimées par des expériences numériques interactives livrées instantanément via WhatsApp.",
    ar: "الدعوات الورقية التقليدية مكلفة وبطيئة وصعبة التوزيع عبر الحدود. يستبدل كاردزي البطاقات المطبوعة بتجارب رقمية تفاعلية تصل فوراً عبر واتساب.",
    hi: "पारंपरिक कागजी निमंत्रण महंगे, धीमे और अंतरराष्ट्रीय सीमाओं पर प्रबंधित करने में कठिन होते हैं। Cardzy महंगे प्रिंटेड कार्ड को व्हाट्सएप पर तुरंत पहुंचने वाले डिजिटल अनुभवों से बदलता है।",
    zh: "传统纸质请柬成本高昂、寄送缓慢，且难以跨国分发。Cardzy 用生动直观的互动数字体验取代昂贵的纸质印刷品，让您的祝福与邀请瞬间直达亲友的 WhatsApp 与社交软件。",
    pt: "Convites de papel são caros, demorados e difíceis de enviar para o exterior. O Cardzy substitui cartões impressos por experiências digitais interativas que chegam instantaneamente pelo WhatsApp.",
    ru: "Традиционные бумажные приглашения стоят дорого, доставляются долго и сложны в международной отправке. Cardzy заменяет их интерактивными цифровыми открытками, моментально приходящими в WhatsApp.",
    de: "Papiereinladungen sind teuer, langsam und international schwer zu verwalten. Cardzy ersetzt gedruckte Karten durch interaktive digitale Erlebnisse, die sofort über WhatsApp zugestellt werden.",
    ja: "従来の紙の招待状は高価で配送に時間がかかり、海外への送付も困難です。Cardzyは印刷カードを、WhatsAppで瞬時に届くインタラクティブなデジタル体験へと置き換えます。",
    ko: "종이 초대장은 비용이 많이 들고 배송이 느리며 해외 전달이 어렵습니다. Cardzy는 expensive한 인쇄 카드를 WhatsApp으로 즉시 전달되는 대화형 디지털 경험으로 대체합니다.",
    it: "Gli inviti cartacei sono costosi, lenti da consegnare e difficili da gestire all'estero. Cardzy sostituisce i biglietti stampati con esperienze digitali interattive che arrivano all'istante su WhatsApp.",
    tr: "Geleneksel kağıt davetiyeler pahalıdır, yavaştır ve uluslararası teslimatı zordur. Cardzy, pahalı baskı kartların yerine WhatsApp üzerinden anında ulaşan interaktif dijital deneyimler sunar.",
    id: "Undangan kertas mahal, lambat, dan sulit dikirim ke luar negeri. Cardzy menggantikan kartu cetak mahal dengan pengalaman digital interaktif yang sampai seketika di WhatsApp.",
    bn: "কাগজের ইনভিটেশন দামী, ধীরগতির এবং আন্তর্জাতিকভাবে পাঠানো কঠিন। Cardzy প্রস্টেড কার্ডের পরিবর্তে ইন্টারঅ্যাক্টিভ ডিজিটাল অভিজ্ঞতা প্রদান করে যা হোয়াটসঅ্যাপে তাৎক্ষণিক পৌঁছায়।",
    vi: "Thiệp giấy truyền thống đắt đỏ, giao chậm và khó gửi đi quốc tế. Cardzy thay thế thiệp in bằng trải nghiệm kỹ thuật số tương tác gửi tức thì qua WhatsApp.",
    sw: "Mialiko ya karatasi ni ghali, inachukua muda na ni vigumu kuisambaza kimataifa. Cardzy inabadilisha kadi za karatasi na kadi za dijitali zinazofika mara moja kupitia WhatsApp."
  },
  s3Title: {
    en: "What We Do",
    ur: "ہم کیا کرتے ہیں",
    es: "Lo Que Hacemos",
    fr: "Ce Que Nous Faisons",
    ar: "ماذا نقدم",
    hi: "हम क्या करते हैं",
    zh: "我们的核心功能",
    pt: "O Que Fazemos",
    ru: "Что мы делаем",
    de: "Was wir tun",
    ja: "提供する機能",
    ko: "우리가 하는 일",
    it: "Cosa Facciamo",
    tr: "Neler Yapıyoruz",
    id: "Layanan Kami",
    bn: "আমরা কী করি",
    vi: "Dịch Vụ Của Chúng Tôi",
    sw: "Tunachofanya"
  },
  s3Content: {
    en: "Cardzy enables individuals and hosts to create and share animated wish cards and digital event invitations tailored for weddings, birthdays, Eid, anniversaries, and corporate gatherings.",
    ur: "کارڈزی صارفین اور میزبانوں کو شادیوں، سالگرہ، عید، سالگرہ اور کارپوریٹ تقریبات کے لیے متحرک وش کارڈز اور ڈیجیٹل دعوت نامے بنانے کی اجازت دیتا ہے۔",
    es: "Cardzy permite a usuarios y anfitriones crear y compartir tarjetas de deseos animadas e invitaciones digitales para bodas, cumpleaños, Eid, aniversarios y eventos corporativos.",
    fr: "Cardzy permet de créer et de partager des cartes animées et des invitations numériques personnalisées pour les mariages, anniversaires, l'Aïd et les événements d'entreprise.",
    ar: "يتيح كاردزي للأفراد والمضيفين إنشاء ومشاركة بطاقات ودعوات رقمية متحركة للأعراس وأعياد الميلاد والعيد والمناسبات.",
    hi: "Cardzy शादी, जन्मदिन, ईद, वर्षगांठ और कॉर्पोरेट आयोजनों के लिए एनिमेटेड विश कार्ड और डिजिटल निमंत्रण बनाने की सुविधा देता है।",
    zh: "Cardzy 助力广大用户与活动策划者轻松打造动感祝贺卡与数字邀请函，完美适用于婚礼、生日、祝寿、开业及节日庆典。",
    pt: "O Cardzy permite criar e compartilhar cartões animados e convites digitais para casamentos, aniversários, Eid e eventos corporativos.",
    ru: "Cardzy позволяет создавать и отправлять анимированные открытки и цифровые приглашения на свадьбы, дни рождения, Аид и корпоративы.",
    de: "Cardzy ermöglicht das Erstellen animierter Wunschkarten und digitaler Einladungen für Hochzeiten, Geburtstage, Eid, Jubiläen und Firmen-Events.",
    ja: "Cardzyでは、結婚式、誕生日、Eid、記念日、法人 eventなどのために、アニメーション付きカードやデジタル招待状を作成・共有できます。",
    ko: "Cardzy는 결혼식, 생일, 이드, 기념일 및 기업 행사를 위한 애니메이션 소원 카드와 디지털 초대장을 손쉽게 만들고 공유할 수 있게 합니다.",
    it: "Cardzy consente di creare e condividere biglietti d'auguri animati e inviti digitali per matrimoni, compleanni, Eid, anniversari ed eventi aziendali.",
    tr: "Cardzy; düğünler, doğum günleri, Bayram, yıldönümleri ve kurumsal etkinlikler için animasyonlu kartlar ve davetiyeler oluşturmanızı sağlar.",
    id: "Cardzy memungkinkan siapa saja membuat dan membagikan kartu animasi dan undangan digital untuk pernikahan, ulang tahun, Eid, dan acara kantor.",
    bn: "Cardzy বিয়ে, জন্মদিন, ঈদ, অ্যানিভার্সারি এবং কর্পোরেট ইভেন্টের জন্য অ্যানিমেটেড উইশ কার্ড এবং ডিজিটাল ইনভিটেশন তৈরির সুযোগ দেয়।",
    vi: "Cardzy cho phép tạo và chia sẻ thiệp mừng hoạt hình & thiệp mời kỹ thuật số cho đám cưới, sinh nhật, lễ Eid, kỷ niệm và sự kiện công ty.",
    sw: "Cardzy inamwezesha mtu yeyote kuunda na kushiriki kadi za dijitali na mialiko ya harusi, siku ya kuzaliwa, Eid na sherehe mbalimbali."
  },
  f1Title: {
    en: "18 Global Languages",
    ur: "18 عالمی زبانیں",
    es: "18 Idiomas Globales",
    fr: "18 Langues Mondiales",
    ar: "18 لغة عالمية",
    hi: "18 वैश्विक भाषाएं",
    zh: "支持 18 种全球语言",
    pt: "18 Idiomas Globais",
    ru: "18 языков мира",
    de: "18 globale Sprachen",
    ja: "18言語に対応",
    ko: "18개 글로벌 언어 지원",
    it: "18 Lingue Globali",
    tr: "18 Küresel Dil",
    id: "18 Bahasa Global",
    bn: "১৮টি বিশ্বব্যাপী ভাষা",
    vi: "18 Ngôn Ngữ Toàn Cầu",
    sw: "Lugha 18 za Dunia"
  },
  f1Desc: {
    en: "Express blessings in your native script including English, Urdu, Arabic, Turkish, French, and 13 other regional languages.",
    ur: "انگریزی، اردو، عربی، ترکی، فرانسیسی اور 13 دیگر علاقائی زبانوں میں اپنے پیغامات لکھیں۔",
    es: "Expresa tus deseos en tu idioma nativo, incluyendo inglés, urdu, árabe, turco, francés y otros 13 idiomas.",
    fr: "Exprimez vos vœux dans votre langue maternelle : anglais, ourdou, arabe, turc, français et 13 autres langues.",
    ar: "عبر عن أمنياتك بلغتك الأم بما في ذلك الإنجليزية والأردية والعربية والتركية والفرنسية و13 لغة أخرى.",
    hi: "अंग्रेजी, उर्दू, अरबी, तुर्की, फ्रेंच और 13 अन्य क्षेत्रीय भाषाओं में अपनी शुभकामनाएं व्यक्त करें।",
    zh: "提供英语、乌尔都语、阿拉伯语、土耳其语、法语等 18 种语言的原汁原味字形排版。",
    pt: "Escreva mensagens em seu idioma nativo, incluindo inglês, urdu, árabe, turco, francês e mais 13 idiomas.",
    ru: "Пишите поздравления на родном языке, включая английский, урду, арабский, турецкий, французский и еще 13 языков.",
    de: "Drücken Sie Wünsche in Ihrer Muttersprache aus, darunter Englisch, Urdu, Arabisch, Türkisch, Französisch und 13 weitere.",
    ja: "英語、ウルドゥー語、アラビア語、トルコ語、フランス語など18の言語とフォントに対応しています。",
    ko: "영어, 우르두어, 아랍어, 튀르키예어, 프랑스어 및 13개 지역 언어를 포함한 고유 문자로 마음을 전하세요.",
    it: "Esprimi i tuoi auguri nella tua lingua madre, tra cui inglese, urdu, arabo, turco, francese e altre 13 lingue.",
    tr: "İngilizce, Urduca, Arapça, Türkçe, Fransızca ve 13 diğer dilde kendi dilinizle tebriklerinizi iletin.",
    id: "Sampaikan ucapan dalam bahasa Anda sendiri, termasuk Bahasa Inggris, Urdu, Arab, Turki, Prancis, dan 13 bahasa lainnya.",
    bn: "ইংরেজি, উর্দু, আরবি, তুর্কি, ফরাসি এবং আরও ১৩টি আঞ্চলিক ভাষায় শুভেচ্ছা জানান।", vi: "Bày tỏ lời chúc bằng tiếng mẹ đẻ bao gồm tiếng Anh, Urdu, Ả Rập, Thổ Nhĩ Kỳ, Pháp và 13 ngôn ngữ khác.",
    sw: "Eleza baraka zako kwa lugha yako ya asili ikiwa ni pamoja na Kiingereza, Kiurdu, Kiarabu, Kituruki na lugha nyingine 13."
  },
  f2Title: {
    en: "WhatsApp RSVP Tracking",
    ur: "واٹس ایپ آر ایس وی پی ٹریکنگ",
    es: "Confirmación RSVP por WhatsApp",
    fr: "Suivi RSVP via WhatsApp",
    ar: "تأكيد الحضور عبر واتساب",
    hi: "व्हाट्सएप RSVP ट्रैकिंग",
    zh: "WhatsApp RSVP 实时回执",
    pt: "Rastreamento RSVP no WhatsApp",
    ru: "Отслеживание RSVP в WhatsApp",
    de: "WhatsApp RSVP-Nachverfolgung",
    ja: "WhatsApp RSVP追跡",
    ko: "WhatsApp RSVP 참석 확인",
    it: "Tracciamento RSVP su WhatsApp",
    tr: "WhatsApp RSVP Takibi",
    id: "Pelacakan RSVP WhatsApp",
    bn: "হোয়াটসঅ্যাপ RSVP ট্র্যাকিং",
    vi: "Theo Dõi RSVP Qua WhatsApp",
    sw: "Ufuatiliaji wa RSVP wa WhatsApp"
  },
  f2Desc: {
    en: "Collect attendance confirmations, guest counts, and dietary responses with one-click WhatsApp integration.",
    ur: "ایک کلک واٹس ایپ انٹیگریشن کے ذریعے مہمانوں کی حاضری اور جوابات جمع کریں۔",
    es: "Recopila confirmaciones de asistencia y respuestas de invitados con un clic vía WhatsApp.",
    fr: "Collectez les confirmations de présence et réponses des invités en un clic via WhatsApp.",
    ar: "جمع تأكيدات الحضور وعدد الضيوف والاستجابات بنقرة واحدة عبر واتساب.",
    hi: "एक-क्लिक व्हाट्सएप एकीकरण के साथ उपस्थिति की पुष्टि और मेहमानों की प्रतिक्रियाएं एकत्र करें।",
    zh: "一键关联 WhatsApp，实时收集宾客出席确认、同行人数与饮食偏好。",
    pt: "Colete confirmações de presença e contagem de convidados com um clique no WhatsApp.",
    ru: "Собирайте подтверждения присутствия и количество гостей в один клик через WhatsApp.",
    de: "Sammeln Sie Anmeldungen und Gästezahlen mit einem Klick über WhatsApp.",
    ja: "ワンタップのWhatsApp連携で、出席確認やゲスト人数を簡単に収集できます。",
    ko: "원클릭 WhatsApp 연동으로 참석 여부 및 하객 수를 편리하게 수집하세요.",
    it: "Raccogli conferme di presenza e numero di ospiti con un clic tramite WhatsApp.",
    tr: "Tek tıkla WhatsApp entegrasyonu ile katılım onaylarını ve davetli sayılarını toplayın.",
    id: "Kumpulkan konfirmasi kehadiran dan jumlah tamu dengan satu klik di WhatsApp.",
    bn: "এক ক্লিকে হোয়াটসঅ্যাপ ইন্টিগ্রেশনের মাধ্যমে অতিথিদের উপস্থিতি ও সাড়া সংগ্রহ করুন।",
    vi: "Thu thập xác nhận tham dự và số lượng khách chỉ bằng 1 cú nhấp chuột qua WhatsApp.",
    sw: "Kusanya uthibitisho wa mahudhurio na idadi ya wageni kwa kubonyeza moja kwenye WhatsApp."
  },
  f3Title: {
    en: "Google Maps Venue Links",
    ur: "گوگل میپس لوکیشن لنکس",
    es: "Ubicación en Google Maps",
    fr: "Lien de Lieu Google Maps",
    ar: "روابط خرائط جوجل للموقع",
    hi: "गूगल मैप्स स्थान लिंक",
    zh: "Google Maps 地图导航",
    pt: "Localização no Google Maps",
    ru: "Локация в Google Maps",
    de: "Google Maps Standort-Links",
    ja: "Googleマップ会場案内",
    ko: "Google 지도 장소 링크",
    it: "Mappe di Google per la Sede",
    tr: "Google Haritalar Konumu",
    id: "Tautan Lokasi Google Maps",
    bn: "গুগল ম্যাপস লোকেশন লিঙ্ক",
    vi: "Định Vị Google Maps Vấn Đề",
    sw: "Viungo vya Google Maps"
  },
  f3Desc: {
    en: "Guide guests straight to your home or hall without sending manual directions.",
    ur: "مہمانوں کو الگ سے راستہ بتائے بغیر سیدھا اپنے گھر یا ہال کی لوکیشن دیں۔",
    es: "Guía a tus invitados directamente a tu casa o salón sin enviar instrucciones manuales.",
    fr: "Guidez vos invités directement jusqu'à votre salle sans envoyer d'explications manuelle.",
    ar: "توجيه الضيوف مباشرة إلى منزلك أو قاعتك دون الحاجة لإرسال تفاصيل المسار يدويًا.",
    hi: "अलग से दिशा-निर्देश भेजे बिना मेहमानों को सीधे अपने घर या हॉल का रास्ता दिखाएं।",
    zh: "直接嵌入地图精准定位，无须手动发定位即可将宾客指引至宴会现场。",
    pt: "Guie os convidados diretamente para sua casa ou salão sem enviar orientações manuais.",
    ru: "Направляйте гостей прямо к вашему дому или залу без отправки инструкции вручную.",
    de: "Führen Sie Gäste direkt zu Ihrem Zuhause oder Saal, ohne Wegbeschreibungen tippen zu müssen.",
    ja: "手動で道順を送ることなく、ゲストを自宅や会場へ直接案内できます。",
    ko: "수동으로 길을 설명할 필요 없이 하객을 예식장이나 집으로 직접 안내하세요.",
    it: "Guida gli ospiti direttamente a casa tua o in sala senza inviare indicazioni manuali.",
    tr: "Manuel yol tarifi göndermeden davetlileri doğrudan evinize veya salona yönlendirin.",
    id: "Arahkan tamu langsung ke rumah atau gedung acara tanpa perlu mengetik petunjuk arah.",
    bn: "আলাদা করে দিকনির্দেশ না পাঠিয়ে অতিথিদের সরাসরি আপনার বাড়ি বা হলে নিয়ে আসুন।",
    vi: "Dẫn đường cho khách đến thẳng nhà hoặc hội trường mà không cần nhắn tin chỉ đường.",
    sw: "Waelekeze wageni moja kwa moja hadi nyumbani au ukumbini bila kutuma maelekezo ya mkono."
  },
  f4Title: {
    en: "Live Event Countdowns",
    ur: "لائیو کاؤنٹ ڈاؤن ٹائمر",
    es: "Contador en Tiempo Real",
    fr: "Comptes à Rebours en Direct",
    ar: "عداد تنازلي مباشر",
    hi: "लाइव काउंटडाउन टाइमर",
    zh: "倒计时实时计时器",
    pt: "Contagem Regressiva ao Vivo",
    ru: "Живой обратный отсчет",
    de: "Live-Countdown-Timer",
    ja: "カウントダウンタイマー",
    ko: "실시간 카운트다운 타이머",
    it: "Count-down in Tempo Reale",
    tr: "Canlı Geri Sayım Sayacı",
    id: "Hitung Mundur Acara",
    bn: "লাইভ কাউন্টডাউন টাইমার",
    vi: "Đếm Ngược Thời Gian Thực",
    sw: "Wakati wa Kuhesabu Kurudi"
  },
  f4Desc: {
    en: "Build excitement leading up to your wedding day, party, or holiday morning.",
    ur: "اپنی شادی کے دن، پارٹی یا عید کی صبح تک جوش و خروش بڑھائیں۔",
    es: "Genera emoción antes de tu boda, fiesta o mañana festiva.",
    fr: "Créez de l'enthousiasme à l'approche de votre mariage, fête ou matin de fête.",
    ar: "زيادة الحماس والترقب حتى يوم الزفاف أو الحفلة أو صباح العيد.",
    hi: "अपनी शादी के दिन, पार्टी या त्योहार की सुबह तक उत्साह बढ़ाएं।",
    zh: "为大婚喜日子、寿宴及开业盛典营造满满的期盼与仪式感。",
    pt: "Crie expectativa até o dia do casamento, festa ou manhã de feriado.",
    ru: "Создавайте предвкушение пред свадьбой, вечеринкой или праздничным утром.",
    de: "Steigern Sie die Vorfreude auf Ihren Hochzeitstag, Ihre Party oder den Feiertag.",
    ja: "結婚式やパーティー、休日の朝に向けて期待感を高めます。",
    ko: "결혼식, 파티 또는 명절 아침까지 설렘과 기대감을 높여보세요.",
    it: "Crea attesa fino al giorno del matrimonio, della festa o della mattina di festa.",
    tr: "Düğün gününüz, partiniz veya bayram sabahına kadar heyecanı artırın.",
    id: "Ciptakan kegembiraan menjelang hari pernikahan, pesta, atau pagi hari raya.",
    bn: "আপনার বিয়ের দিন, পার্টি বা ঈদের সকালের জন্য উৎসাহ বাড়িয়ে তুলুন।",
    vi: "Tạo sự hào hứng chờ đón ngày cưới, bữa tiệc hoặc buổi sáng ngày lễ.",
    sw: "Jenga msisimko kuelekea siku ya harusi, karamu au asubuhi ya sikukuu."
  },
  s4Title: {
    en: "What Makes Cardzy Different",
    ur: "کارڈزی کو کیا چیز منفرد بناتی ہے",
    es: "Lo Que Hace Diferente a Cardzy",
    fr: "Ce Qui Rend Cardzy Unique",
    ar: "ما الذي يجعل كاردزي مختلفاً",
    hi: "Cardzy को क्या अलग बनाता है",
    zh: "Cardzy 的独特之处",
    pt: "O que Torna o Cardzy Diferente",
    ru: "Что делает Cardzy особенным",
    de: "Was Cardzy unterscheidet",
    ja: "Cardzyのユニークな点",
    ko: "Cardzy가 특별한 이유",
    it: "Cosa Rende Cardzy Diverso",
    tr: "Cardzy'yi Farklı Kılan Nedir",
    id: "Apa yang Membuat Cardzy Berbeda",
    bn: "Cardzy-কে যা অনন্য করে তোলে",
    vi: "Điểm Khác Biệt Của Cardzy",
    sw: "Anachofanya Cardzy Kuwa Tofauti"
  },
  s4Content: {
    en: "We believe sending heartfelt wishes should be accessible to everyone. That is why Cardzy offers free-forever digital wish cards for everyday greetings. For hosts planning larger events or weddings, our affordable Cardzy Pro upgrade unlocks advanced guest management, custom maps, live countdowns, and ad-free customization.",
    ur: "ہم مانتے ہیں کہ مبارکباد کے پیغامات بھیجنا ہر ایک کے لیے آسان ہونا چاہیے۔ اسی لیے کارڈزی روزمرہ پیغامات کے لیے بالکل مفت کارڈز پیش کرتا ہے۔ بڑے ایونٹس کے لیے کارڈزی پرو پلان دستیاب ہے۔",
    es: "Creemos que enviar deseos sinceros debe ser accesible para todos. Por eso Cardzy ofrece tarjetas digitales gratuitas para siempre. Para eventos más grandes, nuestro plan Cardzy Pro desbloquea funciones avanzadas.",
    fr: "Nous pensons que l'envoi de vœux doit être accessible à tous. C'est pourquoi Cardzy propose des cartes gratuites à vie. Pour les grands événements, Cardzy Pro débloque des fonctionnalités avancées.",
    ar: "نؤمن بأن إرسال الأمنيات يجب أن يكون متاحاً للجميع. لذلك يقدم كاردزي بطاقات مجانية مدى الحياة. وللمناسبات الكبيرة، يوفر Cardzy Pro مزايا متقدمة.",
    hi: "हम मानते हैं कि दिल से शुभकामनाएं भेजना हर किसी के लिए सुलभ होना चाहिए। इसीलिए Cardzy हमेशा के लिए मुफ़्त कार्ड प्रदान करता है। बड़े आयोजनों के लिए Cardzy Pro उन्नत सुविधाएँ अनलॉक करता है।",
    zh: "我们坚信分享真心祝福应当没有任何门槛。因此 Cardzy 永久提供免费版的祝贺卡。而针对大型婚礼与聚会，Cardzy Pro 方案则解锁高级嘉宾管理与无广告体验。",
    pt: "Acreditamos que enviar felicitações deve ser acessível a todos. Por isso o Cardzy oferece cartões gratuitos para sempre. Para grandes eventos, o Cardzy Pro desbloqueia recursos avançados.",
    ru: "Мы верим, что отправка искренних пожеланий должна быть доступна каждому. Поэтому Cardzy бесплатно предоставляет открытки всегда. Для крупных событий есть тариф Cardzy Pro.",
    de: "Wir glauben, dass das Versenden von Wünschen für jeden zugänglich sein sollte. Cardzy bietet dauerhaft kostenlose Karten. Für große Events bietet Cardzy Pro erweiterte Funktionen.",
    ja: "心のこもったお祝いを送ることは誰にとっても手軽であるべきだと考えています。そのためCardzyは無料のウィッシュカードを提供しています。大規模イベントにはCardzy Proが利用可能です。",
    ko: "진심 어린 마음을 전하는 일은 누구에게나 쉬워야 한다고 믿습니다. 그렇기에 Cardzy는 평생 무료 소원 카드를 제공합니다. 대형 행사의 경우 Cardzy Pro로 업그레이드할 수 있습니다.",
    it: "Crediamo che inviare auguri sinceri debba essere accessibile a tutti. Ecco perché Cardzy offre biglietti gratuiti per sempre. Per eventi più grandi, Cardzy Pro sblocca funzioni avanzate.",
    tr: "Samimi dilekler göndermenin herkes için erişilebilir olması gerektiğine inanıyoruz. Cardzy ücretsiz kartlar sunar. Büyük etkinlikler için Cardzy Pro gelişmiş özellikler sağlar.",
    id: "Kami percaya mengucapkan selamat harus dapat diakses semua orang. Cardzy menyediakan kartu ucapan gratis selamanya. Untuk acara besar, paket Cardzy Pro membuka fitur lanjutan.",
    bn: "আমরা বিশ্বাস করি যে শুভেচ্ছা বার্তা পাঠানো সবার জন্য সহজ হওয়া উচিত। তাই Cardzy চিরতরে বিনামূল্যে উইশ کارڈ প্রদান করে। বড় ইভেন্টের জন্য রয়েছে Cardzy Pro।",
    vi: "Chúng tôi tin rằng việc gửi lời chúc chân thành nên dễ dàng với mọi người. Cardzy cung cấp thiệp miễn phí mãi mãi. Với sự kiện lớn, Cardzy Pro nâng cấp tính năng cao cấp.",
    sw: "Tunaamini kutuma matamanio kutoka moyoni lazima iwe rahisi kwa kila mtu. Ndiyo maana Cardzy inatoa kadi za bure kabisa. Kwa hafla kubwa, Cardzy Pro inafungua vipengele vya juu."
  },
  contactTitle: {
    en: "Contact Information",
    ur: "رابطے کی معلومات",
    es: "Información de Contacto",
    fr: "Informations de Contact",
    ar: "معلومات الاتصال",
    hi: "संपर्क जानकारी",
    zh: "联系方式与总部",
    pt: "Informações de Contato",
    ru: "Контактная информация",
    de: "Kontaktinformationen",
    ja: "お問い合わせ先",
    ko: "연락처 정보",
    it: "Informazioni di Contatto",
    tr: "İletişim Bilgileri",
    id: "Informasi Kontak",
    bn: "যোগাযোগের তথ্য",
    vi: "Thông Tin Liên Hệ",
    sw: "Taarifa za Mawasiliano"
  },
  locLabel: {
    en: "Operating Location: Islamabad / Rawalpindi, Pakistan",
    ur: "مقام: اسلام آباد / راولپنڈی، پاکستان",
    es: "Ubicación: Islamabad / Rawalpindi, Pakistán",
    fr: "Siège : Islamabad / Rawalpindi, Pakistan",
    ar: "الموقع الرئيسي: إسلام آباد / راولبندي، باكستان",
    hi: "स्थान: इस्लामाबाद / रावलपिंडी, पाकिस्तान",
    zh: "运营总部：巴基斯坦·伊斯兰堡 / 拉瓦尔品第",
    pt: "Localização: Islamabad / Rawalpindi, Paquistão",
    ru: "Локация: Исламабад / Равалпинди, Пакистан",
    de: "Standort: Islamabad / Rawalpindi, Pakistan",
    ja: "拠点：パキスタン・イスラマバード/ラワルピンディ",
    ko: "운영 위치: 파키스탄 이슬라마바드 / 라왈핀디",
    it: "Sede Operativa: Islamabad / Rawalpindi, Pakistan",
    tr: "Konum: İslamabad / Rawalpindi, Pakistan",
    id: "Lokasi Operasional: Islamabad / Rawalpindi, Pakistan",
    bn: "অবস্থান: ইসলামাবাদ / রাওয়ালপিন্ডি, পাকিস্তান",
    vi: "Địa điểm: Islamabad / Rawalpindi, Pakistan",
    sw: "Eneo la Kazi: Islamabad / Rawalpindi, Pakistan"
  }
}

export default function AboutPage() {
  const { lang } = useLang()
  const t = (key: string) => ABOUT_TEXT[key]?.[lang] || ABOUT_TEXT[key]?.en || ''

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Header Badge & Title */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3.5" /> {t('tagline')}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              {t('mainHeading')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Core Content Card */}
          <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-8 text-foreground leading-relaxed">
            
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
                <Heart className="size-5 text-emerald-600 dark:text-emerald-400" /> {t('s1Title')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t('s1Content')}
              </p>
            </section>

            <section className="border-t border-border/60 pt-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
                <Globe className="size-5 text-emerald-600 dark:text-emerald-400" /> {t('s2Title')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t('s2Content')}
              </p>
            </section>

            <section className="border-t border-border/60 pt-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
                <Zap className="size-5 text-emerald-600 dark:text-emerald-400" /> {t('s3Title')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                {t('s3Content')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <h3 className="font-bold text-sm text-foreground">{t('f1Title')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('f1Desc')}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <h3 className="font-bold text-sm text-foreground">{t('f2Title')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('f2Desc')}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <h3 className="font-bold text-sm text-foreground">{t('f3Title')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('f3Desc')}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <h3 className="font-bold text-sm text-foreground">{t('f4Title')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('f4Desc')}</p>
                </div>
              </div>
            </section>

            <section className="border-t border-border/60 pt-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" /> {t('s4Title')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t('s4Content')}
              </p>
            </section>

            <section className="border-t border-border/60 pt-6 bg-emerald-500/5 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">{t('contactTitle')}</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t('locLabel')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Email: <a href="mailto:cardzyonline@gmail.com" className="text-foreground hover:underline font-medium">cardzyonline@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp: <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline font-medium">+92 309 3518796</a></span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
