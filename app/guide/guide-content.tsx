'use client'

import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const GUIDE_HUB_TEXT: Record<string, Record<string, string>> = {
  hubTitle: {
    en: "Celebration Guides & Ideas",
    ur: "تقریبات کے لیے رہنما اور خیالات",
    es: "Guías e Ideas para Celebraciones",
    fr: "Guides et Idées de Célébration",
    ar: "أدلة وأفكار الاحتفالات",
    hi: "उत्सव गाइड और विचार",
    zh: "庆典指南与创意",
    pt: "Guias e Ideias para Celebrações",
    ru: "Руководства и идеи для праздников",
    de: "Leitfäden & Ideen für Feiern",
    ja: "お祝いガイド＆アイデア",
    ko: "축하 행사 가이드 및 아이디어",
    it: "Guide e Idee per le Feste",
    tr: "Kutlama Rehberleri ve Fikirleri",
    id: "Panduan & Ide Perayaan",
    bn: "উদযাপন গাইড ও আইডিয়া",
    vi: "Hướng Dẫn & Ý Tưởng Kỷ Niệm",
    sw: "Miongozo na Mawazo ya Sherehe"
  },
  hubSub: {
    en: "Find inspiration, wording templates, and step-by-step guides to design beautiful digital invitations and wish cards for every occasion.",
    ur: "تمام تقریبات کے لیے خوبصورت ڈیجیٹل دعوت نامے اور وش کارڈز بنانے کے رہنما اور خیالات۔",
    es: "Encuentra inspiración, plantillas de texto y guías paso a paso para diseñar hermosas invitaciones digitales y tarjetas de deseos.",
    fr: "Trouvez l'inspiration, des modèles de texte et des guides étape par étape pour créer de magnifiques invitations numériques.",
    ar: "احصل على الإلهام ونماذج النصوص والدلائل الخطوة بخطوة لتصميم بطاقات ودعوات رقمية رائعة لكل المناسبات.",
    hi: "हर अवसर के लिए सुंदर डिजिटल आमंत्रण और कार्ड डिज़ाइन करने के लिए विचार और गाइड खोजें।",
    zh: "寻找灵感、文字模板与指南，助您为每个重大节日设计精美的数字邀请函与祝贺卡。",
    pt: "Encontre inspiração, modelos de texto e guias passo a passo para criar lindos convites digitais.",
    ru: "Вдохновляйтесь примерами, шаблонами текстов и руководствами для создания красивых приглашений и открыток.",
    de: "Finden Sie Inspiration, Textvorlagen und Anleitungen für wunderschöne digitale Einladungen und Wunschkarten.",
    ja: "あらゆるお祝いに合わせた文面テンプレートやデザインガイドをご活用ください。",
    ko: "모든 행사를 위한 문구 템플릿과 스타일 가이드를 확인해 멋진 디지털 카드를 만들어 보세요.",
    it: "Trova ispirazione, modelli di testo e guide passo-passo per creare splendidi inviti digitali e biglietti di auguri.",
    tr: "Her özel gün için güzel dijital davetiyeler ve dilek kartları tasarlamak üzere fikirler ve şablonlar bulun.",
    id: "Temukan inspirasi, templat kata-kata, dan panduan untuk membuat undangan digital yang indah.",
    bn: "যেকোনো অনুষ্ঠানের জন্য ডিজিটাল ইনভিটেশন ও শুভেচ্ছা کارڈের আইডিয়া এবং টেক্সট টেমপ্লেট খুঁজুন।",
    vi: "Tìm nguồn cảm hứng, mẫu lời chúc và hướng dẫn từng bước để thiết kế thiệp điện tử tinh tế.",
    sw: "Pata mawazo, violezo vya maneno na miongozo ya kutengeneza kadi nzuri za dijitali na mialiko."
  },
  weddingGuideTitle: {
    en: "How to Design the Perfect Digital Wedding Invitation: Wording & Etiquette",
    ur: "مکمل ڈیجیٹل شادی کا دعوت نامہ کیسے بنائیں: الفاظ اور طریقے",
    es: "Cómo Diseñar la Invitación de Boda Digital Perfecta: Redacción y Etiqueta",
    fr: "Comment Concevoir l'Invitation de Mariage Numérique Parfaite: Formulation et Étiquette",
    ar: "كيفية تصميم دعوة الزفاف الرقمية المثالية: الصياغة وآداب الدعوة",
    hi: "परफेक्ट डिजिटल वेडिंग कार्ड कैसे बनाएं: शब्द और शिष्टाचार",
    zh: "如何设计完美的数字婚礼邀请函：用词与礼仪指南",
    pt: "Como Criar o Convite de Casamento Digital Perfeito: Redação e Etiqueta",
    ru: "Как создать идеальное цифровое свадебное приглашение: формулировки и этикет",
    de: "So gestalten Sie die perfekte digitale Hochzeitseinladung: Formulierungen & Etikette",
    ja: "完璧なデジタル結婚式招待状のデザイン方法：文面とマナー",
    ko: "완벽한 디지털 결혼식 초대장 제작 방법: 문구 및 예절",
    it: "Come Progettare l'Invito di Nozze Digitale Perfetto: Testo ed Etichetta",
    tr: "Kusursuz Dijital Düğün Davetiyesi Nasıl Tasarlanır: Metinler ve Nezaket Kuralları",
    id: "Cara Merancang Undangan Pernikahan Digital yang Sempurna: Kata-kata & Etika",
    bn: "নিখুঁত ডিজিটাল ডিজিটাল বিয়ের আমন্ত্রণ তৈরির নির্দেশিকা: শব্দ ও শিষ্টাচার",
    vi: "Cách Thiết Kế Thiệp Mời Đám Cưới Kỹ Thuật Số Hoàn Hảo: Lời Chúc & Nghi Thức",
    sw: "Jinsi ya Kutengeneza Mwaliko Bora wa Harusi wa Dijitali: Maneno na Etiquette"
  },
  weddingGuideDesc: {
    en: "A comprehensive guide outlining wording templates, timeline tips, and theme selection for Wedding, Mehndi, Baraat, Walima, and other celebration events.",
    ur: "شادی، مہندی، بارات اور ولیمہ کی تقریبات کے لیے بہترین الفاظ، وقت کی تجاویز اور تھیم کے انتخاب کا مکمل گائیڈ۔",
    es: "Una guía completa con plantillas de texto, consejos sobre horarios y selección de temas para Bodas, Mehndi, Baraat y Walima.",
    fr: "Un guide complet détaillant les modèles de texte, conseils de calendrier et choix de thèmes pour Mariages, Mehndi, Baraat et Walima.",
    ar: "دليل شامل يوضح نماذج النصوص ونصائح الجدول الزمني واختيار الثيمات لحفلات الزفاف والملكة والوليمة.",
    hi: "शादी, मेहंदी, बारात और वलीमा समारोह के लिए शब्द टेम्पलेट और गाइड।",
    zh: "包含婚礼、Mehndi、Baraat 和 Walima 的文字模板、时间规划与主题选择全指南。",
    pt: "Um guia completo com modelos de texto, dicas de cronograma e escolha de temas para Casamentos, Mehndi, Baraat e Walima.",
    ru: "Подробное руководство с шаблонами текстов, советами по времени и выбором темы для свадьбы, мехнди, бараата и валимы.",
    de: "Ein umfassender Leitfaden mit Textvorlagen, Zeitplantipps und Themenauswahl für Hochzeit, Mehndi, Baraat und Walima.",
    ja: "結婚式、Mehndi、Baraat、Walimaの文面テンプレート、タイムライン、テーマ選択を網羅したガイド。",
    ko: "결혼식, 멘디, 바라트, 발리마 행사를 위한 문구 템플릿, 일정 팁 및 테마 선택 가이드.",
    it: "Una guida completa con modelli di testo, consigli sulla cronologia e selezione del tema per Matrimoni, Mehndi, Baraat e Walima.",
    tr: "Düğün, Kına, Baraat ve Velime etkinlikleri için metin şablonları, zamanlama ipuçları ve tema seçim rehberi.",
    id: "Panduan lengkap yang berisi templat kata-kata, tips jadwal, dan pilihan tema untuk Pernikahan, Mehndi, Baraat, dan Walima.",
    bn: "বিবাহ, মেহেদি, বারাত ও ওয়ালিমা অনুষ্ঠানের জন্য টেক্সট টেমপ্লেট ও সম্পূর্ণ গাইড।",
    vi: "Hướng dẫn toàn diện gồm các mẫu lời chúc, mẹo thời gian và lựa chọn chủ đề cho Đám Cưới, Mehndi, Baraat và Walima.",
    sw: "Mwongozo kamili unaoeleza violezo vya maneno, vidokezo vya ratiba, na uchaguzi wa mandhari ya Harusi, Mehndi, Baraat na Walima."
  },
  eidGuideTitle: {
    en: "Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards",
    ur: "عید مبارک وش کارڈز کے لیے بہترین اور خوبصورت الفاظ کے خیالات",
    es: "Ideas de Mensajes Creativos y Frases Personalizadas para Tarjetas de Eid Mubarak",
    fr: "Idées de Textes Créatifs et Messages Personnalisés pour Cartes Eid Mubarak",
    ar: "أفكار ورسائل إبداعية لمباركات وصياغة بطاقات عيد مبارك",
    hi: "ईद मुबारक विश कार्ड के लिए रचनात्मक शब्द और संदेश विचार",
    zh: "开斋节 / 宰牲节祝贺卡创意文字与自定义祝福语指南",
    pt: "Ideias de Mensagens Criativas para Cartões de Eid Mubarak",
    ru: "Идеи красивых текстов и поздравлений для открыток Ид Мубарак",
    de: "Kreative Text- und Nachrichten-Ideen für Eid Mubarak Wunschkarten",
    ja: "Eid Mubarakカード用のクリエイティブなメッセージ＆文面集",
    ko: "이드 무바라크 카드를 위한 창의적인 문구 및 메시지 아이디어",
    it: "Idee di Testi Creativi e Messaggi Personalizzati per Biglietti Eid Mubarak",
    tr: "Bayram Tebrik Kartları İçin Yaratıcı Metin ve Mesaj Fikirleri",
    id: "Ide Kata-kata Kreatif & Pesan Khusus untuk Kartu Ucapan Idul Fitri / Adha",
    bn: "ঈদ মোবারক শুভেচ্ছা کارڈের জন্য চমৎকার টেক্সট ও বার্তার আইডিয়া",
    vi: "Ý Tưởng Lời Chúc Sáng Tạo & Thông Điệp Tùy Chỉnh Cho Thiệp Eid Mubarak",
    sw: "Mawazo ya Maneno ya Ubunifu na Ujumbe wa Kadi za Eid Mubarak"
  },
  eidGuideDesc: {
    en: "Discover traditional blessings, modern wording, and beautiful bilingual text templates to send to family and friends this Eid.",
    ur: "عید پر اپنے پیاروں کو بھیجنے کے لیے روایتی اور جدید خوبصورت پیغامات اور ٹیمپلیٹس۔",
    es: "Descubre bendiciones tradicionales, frases modernas y hermosas plantillas de texto bilingües para compartir con tu familia este Eid.",
    fr: "Découvrez des bénédictions traditionnelles, des textes modernes et de superbes modèles bilingues à envoyer à vos proches pour l'Aïd.",
    ar: "اكتشف التهاني التقليدية، والنصوص الحديثة، ونماذج النصوص ثنائية اللغة الجميلة لإرسالها للعائلة والأصدقاء في العيد.",
    hi: "इस ईद अपने दोस्तों और परिवार को भेजने के लिए पारंपरिक आशीर्वाद और सुंदर द्विभाषी टेक्स्ट टेम्पलेट खोजें।",
    zh: "探索传统祝福、现代寄语以及精美双语文字模板，在节日期间呈献给亲朋好友。",
    pt: "Descubra bênçãos tradicionais, frases modernas e lindos modelos bilíngues para enviar à família neste Eid.",
    ru: "Откройте для себя традиционные пожелания, современные тексты и двуязычные шаблоны для поздравления близких с праздником Ид.",
    de: "Entdecken Sie traditionelle Segen, moderne Formulierungen und schöne zweisprachige Textvorlagen für das Eid-Fest.",
    ja: "伝統的な祝福の言葉や現代風の文面、美しくエレガントなメッセージテンプレートをご覧ください。",
    ko: "이번 이드에 가족과 친구들에게 보낼 전통 축복 문구와 현대적인 메시지 템플릿을 확인하세요.",
    it: "Scopri benedizioni tradizionali, frasi moderne e splendidi modelli di testo bilingui da inviare a parenti e amici per l'Eid.",
    tr: "Bu Bayramda ailenize ve dostlarınıza göndermek için geleneksel dualar, modern mesajlar ve iki dilli şablonlar keşfedin.",
    id: "Temukan ucapan tradisional, kata-kata modern, dan templat teks dua bahasa yang indah untuk dikirimkan kepada keluarga saat Hari Raya.",
    bn: "এই ঈদে পরিবার ও বন্ধুদের পাঠানোর জন্য চমৎকার প্রথাগত ও আধুনিক শুভেচ্ছা বার্তার সংগ্রহ।",
    vi: "Khám phá lời chúc truyền thống, câu từ hiện đại và các mẫu thiệp song ngữ đẹp mắt để gửi tặng gia đình dịp lễ Eid.",
    sw: "Gundua baraka za jadi, maneno ya kisasa, na violezo vizuri vya lugha mbili vya kutuma kwa familia na marafiki wakati wa Eid."
  },
  overviewBadge: {
    en: "Learning Hub Overview", ur: "رہنمائی مرکز کا جائزہ", es: "Resumen del Centro de Aprendizaje", fr: "Aperçu du Centre d'Apprentissage", ar: "نظرة عامة على مركز المعرفة", hi: "ज्ञान केंद्र अवलोकन", zh: "学习中心概览", pt: "Visão Geral da Central de Aprendizado", ru: "Обзор Центра Обучения", de: "Wissenszentrum Übersicht", ja: "ラーニングハブ概要", ko: "러닝 허브 개요", it: "Panoramica del Centro di Apprendimento", tr: "Rehberlik Merkezi Genel Bakış", id: "Ikhtisar Pusat Panduan", bn: "লার্নিং হাব ওভারভিউ", vi: "Tổng Quan Trung Tâm Hướng Dẫn", sw: "Muhtasari wa Kituo cha Mafunzo"
  },
  overviewTitle: {
    en: "Comprehensive Digital Card & Invitation Guides — Cardzy",
    ur: "مکمل ڈیجیٹل کارڈ اور دعوت نامہ گائیڈز — کارڈزی",
    es: "Guías Integrales de Invitaciones y Tarjetas Digitales — Cardzy",
    fr: "Guides Complets d'Invitations et Cartes Numériques — Cardzy",
    ar: "أدلة شاملة للبطاقات والدعوات الرقمية — Cardzy",
    hi: "व्यापक डिजिटल कार्ड और आमंत्रण गाइड — Cardzy",
    zh: "Cardzy 综合数字卡片与邀请函指南",
    pt: "Guia Completo de Convites e Cartões Digitais — Cardzy",
    ru: "Полное руководство по цифровым приглашениям и открыткам — Cardzy",
    de: "Umfassende Anleitungen für digitale Karten & Einladungen — Cardzy",
    ja: "デジタルカード＆招待状の総合ガイド — Cardzy",
    ko: "디지털 카드 및 초대장 종합 가이드 — Cardzy",
    it: "Guida Completa agli Inviti e Biglietti Digitali — Cardzy",
    tr: "Kapsamlı Dijital Kart ve Davetiye Rehberleri — Cardzy",
    id: "Panduan Lengkap Kartu & Undangan Digital — Cardzy",
    bn: "সম্পূর্ণ ডিজিটাল کارڈ ও ইনভিটেশন গائیڈز — Cardzy",
    vi: "Hướng Dẫn Thiệp Mời & Thiệp Kỹ Thuật Số Toàn Diện — Cardzy",
    sw: "Mwongozo Kamili wa Kadi za Dijitali na Mialiko — Cardzy"
  },
  overviewDesc: {
    en: "Welcome to the Cardzy Celebration Guide Hub. Whether you are planning a traditional South Asian wedding with Nikkah, Mehndi, Barat, and Walima events, or sending animated Eid Mubarak greetings to family across the globe, our expert guides provide curated wording templates, blessings, host protocols, and step-by-step instructions.",
    ur: "کارڈزی گائیڈز ہب میں خوش آمدید۔ چاہیں آپ نکاح، مہندی، بارات اور ولیمہ کی منصوبہ بندی کر رہے ہوں یا پوری دنیا میں عید کی مبارکباد بھیج رہے ہوں، ہمارے گائیڈز آپ کو تمام تفصیلات اور ٹیمپلیٹس فراہم کرتے ہیں۔",
    es: "Bienvenido al Centro de Guías de Cardzy. Ya sea que estés planificando una boda tradicional o enviando felicitaciones de Eid animadas a tu familia en todo el mundo, nuestras guías expertas ofrecen plantillas de redacción y consejos paso a paso.",
    fr: "Bienvenue sur le centre de guides Cardzy. Que vous planifiez un mariage traditionnel ou envoyiez des vœux de l'Aïd animés à votre famille dans le monde entier, nos guides vous fournissent des modèles de texte et des instructions étape par étape.",
    ar: "مرحباً بك في مركز أدلة الاحتفالات من Cardzy. سواء كنت تخطط لحفل زفاف تقليدي أو ترسل تهاني العيد المتحركة لعائلتك حول العالم، تتيح لك أدلتنا الحصول على أفكار صياغة جاهزة وإرشادات خطوة بخطوة.",
    hi: "Cardzy सेलिब्रेशन गाइड हब में आपका स्वागत है। चाहे आप शादी की योजना बना रहे हों या दुनिया भर में ईद की बधाई भेज रहे हों, हमारे गाइड आपको हर कदम पर मदद करते हैं।",
    zh: "欢迎来到 Cardzy 节日与庆祝指南中心。无论您是在筹备传统婚礼，还是向全球亲友发送动态开斋节祝福，我们的指南均提供精选文字模板与步骤说明。",
    pt: "Bem-vindo à Central de Guias do Cardzy. Quer esteja planejando um casamento tradicional ou enviando saudações animadas de Eid para sua família, nossos guias fornecem modelos de redação e instruções passo a passo.",
    ru: "Добро пожаловать в центр руководств Cardzy. Планируете ли вы традиционную свадьбу или отправляете анимированные поздравления с праздником Ид по всему миру, наши статьи помогут выбрать нужные формулировки и правила.",
    de: "Willkommen im Cardzy Wissenszentrum. Egal ob Sie eine traditionelle Hochzeit planen oder animierte Eid-Grüße an Ihre Familie weltweit senden – unsere Leitfäden bieten Ihnen Vorlagen und Schritt-für-Schritt-Anleitungen.",
    ja: "Cardzyお祝いガイドハブへようこそ。伝統的な結婚式の計画から、世界中のご家族へのアニメーション付きEidカードの送信まで、エキスパートによる文面テンプレートや手順をご紹介します。",
    ko: "Cardzy 축하 행사 가이드 허브에 오신 것을 환영합니다. 전통 결혼식 계획부터 전 세계 가족에게 보낼 애니메이션 이드 카드 제작까지, 당사의 가이드가 문구 템플릿과 단계별 안내를 제공합니다.",
    it: "Benvenuto nel Centro Guide di Cardzy. Che tu stia pianificando un matrimonio tradizionale o inviando auguri animati per l'Eid in tutto il mondo, le nostre guide offrono modelli di testo e istruzioni dettagliate.",
    tr: "Cardzy Kutlama Rehberi Merkezine hoş geldiniz. İster geleneksel bir düğün planlıyor olun, ister dünyanın dört bir yanındaki ailenize animasyonlu Bayram tebrikleri gönderiyor olun, rehberlerimiz size şablonlar ve adımları sunar.",
    id: "Selamat datang di Pusat Panduan Cardzy. Baik Anda merencanakan pernikahan tradisional maupun mengirimkan ucapan Idul Fitri animasi ke keluarga di seluruh dunia, panduan kami menyediakan templat kata-kata dan petunjuk langkah demi langkah.",
    bn: "Cardzy গাইড হাবে স্বাগতম। আপনি কোনো বিবাহ অনুষ্ঠানের পরিকল্পনা করছেন বা বিশ্বজুড়ে পরিবারকে অ্যানিমেটেড ঈদের শুভেচ্ছা পাঠাচ্ছেন, আমাদের গাইড আপনাকে সব ধরনের সহায়তা প্রদান করে।",
    vi: "Chào mừng bạn đến với Trung tâm Hướng dẫn Cardzy. Cho dù bạn đang lên kế hoạch cho một đám cưới truyền thống hay gửi lời chúc Eid sinh động đến gia đình trên toàn thế giới, các hướng dẫn của chúng tôi đều cung cấp mẫu câu phù hợp.",
    sw: "Karibu kwenye Kituo cha Miongozo cha Cardzy. Iwe unapanga harusi ya kitamaduni au unatuma salamu za Eid za picha za mwendo kwa familia duniani kote, miongozo yetu inakupa violezo vya maneno na maagizo ya hatua kwa hatua."
  },
  box1Title: {
    en: "Pakistani Wedding Wording", ur: "پاکستانی شادی کے الفاظ", es: "Redacción para Bodas", fr: "Formulation de Mariage", ar: "صياغة دعوات الزفاف", hi: "वेडिंग कार्ड के शब्द", zh: "婚礼用词指南", pt: "Texto para Casamentos", ru: "Свадебные формулировки", de: "Hochzeits-Formulierungen", ja: "結婚式の文面ガイド", ko: "결혼식 문구 가이드", it: "Testi per Matrimoni", tr: "Düğün Davetiye Metinleri", id: "Kata-kata Undangan Pernikahan", bn: "বিয়ের টেক্সট টেমপ্লেট", vi: "Lời Chúc Đám Cưới", sw: "Maneno ya Mwaliko wa Harusi"
  },
  box1Desc: {
    en: "Explore traditional host protocols, Bismillah calligraphy, and timing etiquette for Nikkah, Barat, and Walima cards.",
    ur: "نکاح، بارات اور ولیمہ کے لیے بسم اللہ خطاطی اور روایتی الفاظ۔",
    es: "Explora protocolos de anfitriones, caligrafía tradicional y etiqueta para tarjetas de Nikkah, Barat y Walima.",
    fr: "Découvrez les protocoles traditionnels, la calligraphie et l'étiquette pour les cartes de Nikkah, Barat et Walima.",
    ar: "استكشف البروتوكولات التقليدية والخط العربي وآداب التوقيت لدعوات النكاح والوليمة.",
    hi: "निकाह, बारात और वलीमा कार्ड के लिए पारंपरिक प्रोटोकॉल और बिस्मिल्लाह सुलेख का उपयोग करें।",
    zh: "探索 Nikkah、Barat 与 Walima 卡片的传统礼仪、书法艺术与时间安排技巧。",
    pt: "Explore protocolos tradicionais, caligrafia e etiqueta para cartões de Nikkah, Barat e Walima.",
    ru: "Изучите традиции оформления, каллиграфию и правила этикета для свадебных приглашений.",
    de: "Entdecken Sie traditionelle Gastgeber-Protokolle, Kalligrafie und Zeitplan-Etikette für Einladungskarten.",
    ja: "Nikkah、Barat、Walimaカードのための伝統的なカリグラフィーやマナーをご確認いただけます。",
    ko: "니카, 바라트, 발리마 카드를 위한 전통 호스트 예절, 칼리그라피 및 일정 작성법을 알아보세요.",
    it: "Esplora i protocolli tradizionali, la calligrafia e l'etichetta per i biglietti di Nikkah, Barat e Walima.",
    tr: "Nikah, Baraat ve Velime kartları için geleneksel protokolleri, hat sanatını ve zamanlama kurallarını inceleyin.",
    id: "Pelajari protokol tuan rumah tradisional, kaligrafi, dan etika waktu untuk kartu Nikkah, Barat, dan Walima.",
    bn: "নিকাহ, বারাত ও ওয়ালিমা کارڈের জন্য ঐতিহ্যবাহী শব্দ ও ডিজাইনের তথ্য।",
    vi: "Khám phá các nghi thức truyền thống, thư pháp và quy tắc thời gian cho thiệp Nikkah, Barat và Walima.",
    sw: "Gundua itifaki za jadi, kaligrafia, na etiquette ya nyakati za kadi za Nikkah, Barat, na Walima."
  },
  box2Title: {
    en: "Eid Wording & Poetry", ur: "عیدی الفاظ اور شاعری", es: "Frases de Eid y Poesía", fr: "Textes et Poésie de l'Aïd", ar: "عبارات وشعر العيد", hi: "ईद शब्द और शायरी", zh: "开斋节祝福与诗歌", pt: "Frases de Eid e Poesia", ru: "Поздравления и стихи к празднику Ид", de: "Eid-Formulierungen & Poesie", ja: "Eidのメッセージ＆詩句", ko: "이드 문구 및 시", it: "Testi e Poesie per l'Eid", tr: "Bayram Mesajları ve Şiirler", id: "Kata-kata & Puisi Idul Fitri", bn: "ঈদের বার্তা ও কবিতা", vi: "Lời Chúc & Thơ Eid", sw: "Maneno na Mashairi ya Eid"
  },
  box2Desc: {
    en: "Find short English greetings, Urdu Shayari, and Quranic blessings for Eid-ul-Fitr and Eid-ul-Adha wish cards.",
    ur: "عید الفطر اور عید الاضحی کے لیے مختصر انگریزی پیغامات اور اردو شاعری۔",
    es: "Encuentra mensajes cortos, poesía en urdu y bendiciones para tus tarjetas de Eid-ul-Fitr y Eid-ul-Adha.",
    fr: "Trouvez de courts vœux, de la poésie en ourdou et des bénédictions pour vos cartes de l'Aïd.",
    ar: "اعثر على تحيات قصيرة، وشعر أوردو، وبركات قرآنية لبطاقات عيد الفطر وعيد الأضحى.",
    hi: "ईद-उल-फितर और ईद-उल-अजहा विश कार्ड के लिए छोटे बधाई संदेश और उर्दू शायरी खोजें।",
    zh: "获取精短的开斋节与宰牲节祝福语、乌尔都语诗歌和祝辞。",
    pt: "Encontre mensagens curtas, poesia em urdu e bênçãos para cartões de Eid-ul-Fitr e Eid-ul-Adha.",
    ru: "Найдите короткие поздравления и душевные стихи для открыток к праздникам Ид аль-Фитр и Ид аль-Адха.",
    de: "Finden Sie kurze Sprüche, Urdu-Poesie und Segen für Eid-ul-Fitr und Eid-ul-Adha Wunschkarten.",
    ja: "Eid-ul-FitrやEid-ul-Adhaのための短い挨拶文や詩的メッセージを見つけましょう。",
    ko: "이드 알 피트르 및 이드 알 아드하 위시 카드를 위한 짧은 인사말과 시 문구를 확인해보세요.",
    it: "Trova brevi auguri, poesie in urdu e benedizioni per i biglietti di Eid-ul-Fitr e Eid-ul-Adha.",
    tr: "Ramazan ve Kurban Bayramı kartları için kısa mesajlar, Türkçe ve Urduca şiirler bulun.",
    id: "Temukan ucapan singkat, puisi indah, dan doa berkah untuk kartu ucapan Idul Fitri dan Idul Adha.",
    bn: "ঈদুল ফিতর ও ঈদুল আজহার উইশ کارڈের জন্য চমৎকার টেক্সট ও কবিতার সম্ভার।",
    vi: "Tìm các lời chúc ngắn gọn, câu thơ hay và lời cầu chúc cho thiệp Eid-ul-Fitr và Eid-ul-Adha.",
    sw: "Pata salamu fupi, mashairi, na baraka za kadi za Eid-ul-Fitr na Eid-ul-Adha."
  },
  box3Title: {
    en: "WhatsApp RSVP Tracking", ur: "واٹس ایپ RSVP ٹریکنگ", es: "Seguimiento de RSVP por WhatsApp", fr: "Suivi des RSVP via WhatsApp", ar: "تتبع تأكيد الحضور عبر واتساب", hi: "व्हाट्सएप RSVP ट्रैकिंग", zh: "WhatsApp RSVP 回复追踪", pt: "Rastreamento de RSVP no WhatsApp", ru: "Отслеживание RSVP через WhatsApp", de: "WhatsApp RSVP-Verwaltung", ja: "WhatsApp RSVP追跡機能", ko: "WhatsApp RSVP 참석 추적", it: "Tracciamento RSVP su WhatsApp", tr: "WhatsApp RSVP Takibi", id: "Pelacakan RSVP WhatsApp", bn: "হোয়াটসঅ্যাপ RSVP ট্র্যাকিং", vi: "Theo Dõi RSVP Qua WhatsApp", sw: "Ufuatiliaji wa RSVP wa WhatsApp"
  },
  box3Desc: {
    en: "Learn how to manage guest list headcounts, embed Google Maps directions, and automate attendee responses.",
    ur: "مہمانوں کی فہرست کا انتظام، گوگل میپس لوکیشن اور فوری RSVP کے جوابات۔",
    es: "Aprende a gestionar el número de invitados, integrar ubicaciones de Google Maps y automatizar respuestas.",
    fr: "Apprenez à gérer le nombre d'invités, intégrer les itinéraires Google Maps et automatiser les réponses.",
    ar: "تعلم كيفية إدارة عدد الضيوف، وإدراج اتجاهات خرائط جوجل، وأتمتة إجابات الحضور.",
    hi: "सीखें कि मेहमानों की संख्या कैसे प्रबंधित करें, गूगल मैप्स दिशा-निर्देश जोड़ें और प्रतिक्रियाएं स्वचालित करें।",
    zh: "了解如何管理宾客出席人数、嵌入 Google 地图导航链接并自动统计回复。",
    pt: "Aprenda a gerenciar a lista de convidados, incorporar direções do Google Maps e automatizar respostas.",
    ru: "Узнайте, как управлять списками гостей, встраивать карты Google Maps и автоматизировать ответы.",
    de: "Lernen Sie, wie Sie Ihre Gästeliste verwalten, Google Maps Wegbeschreibungen einbinden und Rückmeldungen automatisieren.",
    ja: "ゲスト人数の cluster 管理やGoogleマップの埋め込み、自動返信の利用方法をご紹介します。",
    ko: "게스트 참석 인원 관리, Google 지도 길안내 첨부 및 자동 응답 확인 방법을 알아보세요.",
    it: "Scopri come gestire il numero di invitati, incorporare le indicazioni di Google Maps e automatizzare le risposte.",
    tr: "Davetli sayılarını nasıl yöneteceğinizi, Google Haritalar yol tariflerini eklemeyi ve yanıtları otomatikleştirmeyi öğrenin.",
    id: "Pelajari cara mengelola jumlah tamu, menyematkan petunjuk Google Maps, dan mengotomatiskan balasan.",
    bn: "অতিথিদের উপস্থিতি ব্যবস্থাপনা, গুগল ম্যাপস দিকনির্দেশনা যুক্ত করা ও স্বয়ংক্রিয় উত্তর জানা।",
    vi: "Học cách quản lý số lượng khách mời, nhúng bản đồ Google Maps và tự động hóa phản hồi của người tham dự.",
    sw: "Jifunze jinsi ya kusimamia idadi ya wageni, kuweka ramani za Google Maps, na kufanya majibu ya wageni kuwa ya kiotomatiki."
  },
  readTime6min: {
    en: "6 min read", ur: "6 منٹ مطالعہ", es: "6 min de lectura", fr: "6 min de lecture", ar: "6 دقائق قراءة", hi: "6 मिनट का पाठ", zh: "6 分钟阅读", pt: "6 min de leitura", ru: "6 мин чтения", de: "6 Min. Lesezeit", ja: "6分で読める", ko: "6분 소요", it: "6 min di lettura", tr: "6 dk okuma", id: "6 menit baca", bn: "৬ মিনিট পাঠ", vi: "6 phút đọc", sw: "dakika 6 za kusoma"
  },
  readTime4min: {
    en: "4 min read", ur: "4 منٹ مطالعہ", es: "4 min de lectura", fr: "4 min de lecture", ar: "4 دقائق قراءة", hi: "4 मिनट का पाठ", zh: "4 分钟阅读", pt: "4 min de leitura", ru: "4 мин чтения", de: "4 Min. Lesezeit", ja: "4分で読める", ko: "4분 소요", it: "4 min di lettura", tr: "4 dk okuma", id: "4 menit baca", bn: "৪ মিনিট পাঠ", vi: "4 phút đọc", sw: "dakika 4 za kusoma"
  },
  dateJuly18: {
    en: "July 18, 2026", ur: "18 جولائی 2026", es: "18 de julio de 2026", fr: "18 juillet 2026", ar: "18 يوليو 2026", hi: "18 जुलाई 2026", zh: "2026年7月18日", pt: "18 de julho de 2026", ru: "18 июля 2026 г.", de: "18. Juli 2026", ja: "2026年7月18日", ko: "2026년 7월 18일", it: "18 luglio 2026", tr: "18 Temmuz 2026", id: "18 Juli 2026", bn: "১৮ জুলাই, ২০২৬", vi: "18 tháng 7 năm 2026", sw: "18 Julai 2026"
  },
  dateJuly15: {
    en: "July 15, 2026", ur: "15 جولائی 2026", es: "15 de julio de 2026", fr: "15 juillet 2026", ar: "15 يوليو 2026", hi: "15 जुलाई 2026", zh: "2026年7月15日", pt: "15 de julho de 2026", ru: "15 июля 2026 г.", de: "15. Juli 2026", ja: "2026年7月15日", ko: "2026년 7월 15일", it: "15 luglio 2026", tr: "15 Temmuz 2026", id: "15 Juli 2026", bn: "১৫ জুলাই, ২০২৬", vi: "15 tháng 7 năm 2026", sw: "15 Julai 2026"
  },
  birthdayGuideTitle: {
    en: "Birthday Wish Wording Ideas: Heartfelt, Funny & Formal Messages"
  },
  birthdayGuideDesc: {
    en: "Copy-ready birthday messages sorted by tone and relationship — sweet, funny, formal, and messages just for kids."
  },
  readTime5min: {
    en: "5 min read"
  },
  dateAug6: {
    en: "August 6, 2026"
  }
}

const GUIDES = [
  {
    slug: 'pakistani-wedding-invitations',
    titleKey: 'weddingGuideTitle',
    descKey: 'weddingGuideDesc',
    catKey: 'catWedding',
    readTimeKey: 'readTime6min',
    dateKey: 'dateJuly18',
  },
  {
    slug: 'eid-wording-ideas',
    titleKey: 'eidGuideTitle',
    descKey: 'eidGuideDesc',
    catKey: 'catReligious',
    readTimeKey: 'readTime4min',
    dateKey: 'dateJuly15',
  },
  {
    slug: 'birthday-wishes-wording',
    titleKey: 'birthdayGuideTitle',
    descKey: 'birthdayGuideDesc',
    catKey: 'birthdays',
    readTimeKey: 'readTime5min',
    dateKey: 'dateAug6',
  },
]

export function GuideClientContent() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return GUIDE_HUB_TEXT[key]?.[lang] || GUIDE_HUB_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <BookOpen className="size-4" /> {t('learningHub') || 'Learning Hub'}
        </span>
        <h1 className={cn(
          "mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl",
          isUrdu ? "font-urdu leading-relaxed py-2 text-3xl sm:text-4xl" : "leading-tight"
        )}>
          {getText('hubTitle')}
        </h1>
        <p className={cn(
          "mt-3 text-lg text-muted-foreground max-w-2xl mx-auto",
          isUrdu ? "font-urdu leading-relaxed text-base sm:text-lg" : "leading-relaxed"
        )}>
          {getText('hubSub')}
        </p>
      </div>

      {/* Guide Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {GUIDES.map((g) => {
          const title = getText(g.titleKey)
          const description = getText(g.descKey)
          const category = t(g.catKey) || 'Guide'
          const readTime = getText(g.readTimeKey)
          const date = getText(g.dateKey)

          return (
            <article
              key={g.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    {category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" /> {readTime}
                  </span>
                </div>

                <h3 className={cn(
                  "mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors",
                  isUrdu && "font-urdu leading-relaxed py-1"
                )}>
                  <Link href={`/guide/${g.slug}`}>
                    <span className="absolute inset-0" />
                    {title}
                  </Link>
                </h3>

                <p className={cn(
                  "mt-3 text-sm leading-relaxed text-muted-foreground",
                  isUrdu && "font-urdu leading-relaxed py-1"
                )}>
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="size-3.5" /> {date}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:translate-x-1 transition-transform">
                  {t('readGuide') || 'Read Guide'} <ArrowRight className="size-3.5" />
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Premium Guide Overview Card */}
      <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-sm backdrop-blur-xs text-left space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-3.5" /> {getText('overviewBadge')}
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">
          {getText('overviewTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {getText('overviewDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className="font-extrabold text-xs text-foreground">{getText('box1Title')}</h3>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{getText('box1Desc')}</p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className="font-extrabold text-xs text-foreground">{getText('box2Title')}</h3>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{getText('box2Desc')}</p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-background/60 shadow-2xs hover:border-emerald-500/30 transition-all">
            <h3 className="font-extrabold text-xs text-foreground">{getText('box3Title')}</h3>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{getText('box3Desc')}</p>
          </div>
        </div>
      </section>

      {/* Featured Resources & Tool Links */}
      <section className="mt-12 p-6 rounded-3xl border border-primary/20 bg-primary/5 space-y-4">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Sparkles className="size-4 text-primary" /> Popular Cardzy Tools & Featured Articles
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <li>
            <Link href="/create-invitation" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → Create Digital Wedding Invitation
            </Link>
            <p className="text-muted-foreground text-xs">Design 4K animated invitation websites with live WhatsApp RSVP tracking.</p>
          </li>
          <li>
            <Link href="/pricing" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → View Cardzy Pricing & Plans
            </Link>
            <p className="text-muted-foreground text-xs">Explore transparent plans for unlimited cards and premium themes.</p>
          </li>
          <li>
            <Link href="/blog/how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → How to Manage Wedding Guest Lists & RSVPs
            </Link>
            <p className="text-muted-foreground text-xs">Master guest tracking, dietary preferences, and automated WhatsApp reminders.</p>
          </li>
          <li>
            <Link href="/blog/digital-vs-paper-wedding-invitations-cost-eco-comparison" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → Digital vs Paper Wedding Invitations Comparison
            </Link>
            <p className="text-muted-foreground text-xs">Detailed cost, eco-impact, and guest response time analysis.</p>
          </li>
          <li>
            <Link href="/about" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → About Cardzy & Our Mission
            </Link>
            <p className="text-muted-foreground text-xs">Learn about our team and global digital celebration platform.</p>
          </li>
          <li>
            <Link href="/create-visiting-card" className="font-bold text-primary hover:underline inline-flex items-center gap-1.5">
              → Create Smart Digital Business Card
            </Link>
            <p className="text-muted-foreground text-xs">Build digital vCards with 1-tap VCF download for seamless networking.</p>
          </li>
        </ul>
      </section>
    </div>
  )
}
