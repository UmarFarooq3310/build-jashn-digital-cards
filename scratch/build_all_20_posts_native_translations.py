import json
import os

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')
os.makedirs(target_dir, exist_ok=True)

LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw']

CATEGORY_MAP = {
    'wedding': {
        'en': 'Wedding & Nikkah', 'ur': 'شادی و نکاح', 'ar': 'الزفاف والنكاح', 'es': 'Boda y Nikkah', 'fr': 'Mariage & Nikkah',
        'hi': 'शादी और निकाह', 'zh': '婚礼与仪式', 'pt': 'Casamento e Nikkah', 'ru': 'Свадьба и Никах', 'de': 'Hochzeit & Nikkah',
        'ja': '結婚式＆Nikkah', 'ko': '웨딩 & 니카', 'it': 'Matrimonio & Nikkah', 'tr': 'Düğün ve Nikah', 'id': 'Pernikahan & Akad',
        'bn': 'বিয়ে ও নিকাহ', 'vi': 'Đám Cưới & Hôn Lễ', 'sw': 'Harusi na Nikkah'
    },
    'eid': {
        'en': 'Eid & Holidays', 'ur': 'عید اور تعطیلات', 'ar': 'العيد والمناسبات', 'es': 'Eid y Festividades', 'fr': 'Aïd & Fêtes',
        'hi': 'ईद और त्योहार', 'zh': '开斋节与节日', 'pt': 'Eid e Feriados', 'ru': 'Эйд и Праздники', 'de': 'Eid & Feiertage',
        'ja': 'Eid＆祝日', 'ko': '이드 & 축제', 'it': 'Eid e Festività', 'tr': 'Bayram ve Tatiller', 'id': 'Idul Fitri & Liburan',
        'bn': 'ঈদ ও ছুটির দিন', 'vi': 'Lễ Eid & Ngày Lễ', 'sw': 'Eid na Sikukuu'
    },
    'business': {
        'en': 'Business & vCards', 'ur': 'ڈیجیٹل وزٹنگ کارڈز', 'ar': 'بطاقات الأعمال الرقمية', 'es': 'Negocios y vCards', 'fr': 'Affaires & vCards',
        'hi': 'बिजनेस और डिजिटल कार्ड', 'zh': '商务与数字名片', 'pt': 'Negócios e vCards', 'ru': 'Бизнес и vCard', 'de': 'Business & vCards',
        'ja': 'ビジネス＆デジタル名刺', 'ko': '비즈니스 & vCard', 'it': 'Business e vCard', 'tr': 'İş Dünyası ve vCard', 'id': 'Bisnis & vCard',
        'bn': 'ব্যবসা ও ডিজিটাল কার্ড', 'vi': 'Kinh Doanh & Danh Thiếp', 'sw': 'Biashara na vCard'
    },
    'planning': {
        'en': 'Event Planning', 'ur': 'تقاریب اور آر ایس وی پی', 'ar': 'تخطيط المناسبات وإدارتها', 'es': 'Planificación de Eventos', 'fr': 'Organisation d\'Événements',
        'hi': 'इवेंट प्लानिंग व आरएसवीपी', 'zh': '活动策划与管理', 'pt': 'Planeamento de Eventos', 'ru': 'Организация событий', 'de': 'Event-Planung',
        'ja': 'イベント企画・管理', 'ko': '이벤트 기획 & RSVP', 'it': 'Pianificazione Eventi', 'tr': 'Etkinlik Planlama', 'id': 'Perencanaan Acara',
        'bn': 'অনুষ্ঠান পরিকল্পনা', 'vi': 'Lên Kế Hoạch Sự Kiện', 'sw': 'Mipango ya Sherehe'
    }
}

# 20 Posts complete localized titles and subtitles
POST_DEFINITIONS = [
    # 1
    {
        'idx': 1,
        'slug': 'complete-guide-to-pakistani-wedding-invitation-wording-urdu-english',
        'cat_key': 'wedding',
        'titles': {
            'en': 'The Complete Guide to Pakistani & Islamic Wedding Invitation Wording (Urdu & English Examples)',
            'ur': 'پاکستانی اور اسلامی شادی کے کارڈز کی تحریر گائیڈ (اردو اور انگلش الفاظ)',
            'ar': 'دليل صيغ دعوات الزفاف الباكستانية والإسلامية (نماذج بالأردو والإنجليزي)',
            'es': 'Guía Completa de Textos para Invitaciones de Boda Pakistaníes e Islámicas',
            'fr': 'Guide Complet de Rédaction des Invitations de Mariage Pakistanais et Islamiques',
            'hi': 'पाकिस्तानी और इस्लामिक शादी कार्ड आमंत्रण पाठ गाइड (उर्दू और अंग्रेजी)',
            'zh': '巴基斯坦与伊斯兰婚礼请柬文案完整指南（乌尔都语与英语范例）',
            'pt': 'Guia Completo de Texto para Convites de Casamento Islâmicos e Paquistaneses',
            'ru': 'Полное руководство по текстам мусульманских и пакистанских свадебных приглашений',
            'de': 'Vollständiger Leitfaden für pakistanische & islamische Hochzeitseinladungstexte',
            'ja': 'パキスタン＆イスラム結婚式招待状文面完全ガイド（ウルドゥー語＆英語例文）',
            'ko': '파키스탄 및 이슬람 결혼식 초대장 문구 완벽 가이드 (우르두어 및 영어)',
            'it': 'Guida Completa ai Testi per Inviti di Matrimonio Pachistani e Islamici',
            'tr': 'Pakistan ve İslami Düğün Davetiye Sözleri Rehberi (Urduca ve İngilizce)',
            'id': 'Panduan Lengkap Kata-Kata Undangan Pernikahan Islami & Pakistan (Urdu & Inggris)',
            'bn': 'পাকিস্তানি ও ইসলামিক বিয়ের কার্ডের ভাষা ও আমন্ত্রণ বার্তা নির্দেশিকা',
            'vi': 'Hướng Dẫn Viết Lời Mời Đám Cưới Hồi Giáo & Pakistan (Mẫu Song Ngữ)',
            'sw': 'Mwongozo Kamili wa Maneno ya Kadi za Harusi za Kiislamu na Kipakistani'
        },
        'subtitles': {
            'en': 'Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.',
            'ur': 'نکاح، مہندی، بارات اور ولیمہ کے لیے روایتی اور جدید ترین الفاظ، بسم اللہ خطاطی، اشعار اور واٹس ایپ RSVP آداب۔',
            'ar': 'عبارات راقية لدعوات النكاح والحناء والبارات والوليمة مع خط البسملة الشريفة وأقوال مأثورة وآداب الضيافة.',
            'es': 'Ejemplos de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, citas inspiradoras y etiquetas de RSVP.',
            'fr': 'Modèles complets pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, citations et gestion RSVP.',
            'hi': 'निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बिस्मिल्लाह सुलेख, प्रेरणादायक उद्धरण और RSVP शिष्टाचार के साथ विस्तृत उदाहरण।',
            'zh': '包含 Nikkah 仪式、Mehndi 欢庆、Barat 喜宴与 Walima 招待会的双语文案、Bismillah 书法及 RSVP 礼仪。',
            'pt': 'Exemplos completos para cartões de Nikkah, Mehndi, Barat e Walima com caligrafia Bismillah e etiquetas de RSVP.',
            'ru': 'Образцы текстов для Никаха, Мехнди, Барата и Валима с каллиграфией Бисмилля, цитатами Руми и этикетом RSVP.',
            'de': 'Formulierungsbeispiele für Nikkah, Mehndi, Barat und Walima mit Bismillah-Kalligraphie, Zitaten und RSVP-Etikette.',
            'ja': 'Nikkah、Mehndi、Barat、Walimaのためのビスミッラー書道、名言、出欠確認マナー集。',
            'ko': '니카(Nikkah), 멘디, 바라트, 발리마를 위한 비스밀라 서예, 명언 및 RSVP 에티켓 예시.',
            'it': 'Esempi di formulazione per Nikkah, Mehndi, Barat e Walima con calligrafia Bismillah, citazioni celebri e gestione RSVP.',
            'tr': 'Nikah, Kına (Mehndi), Düğün (Barat) ve Velime için Besmele hat sanatı, anlamlı sözler ve LCV adabı örnekleri.',
            'id': 'Contoh teks elegan untuk Akad Nikah, Mehndi, Resepsi dan Walimah dengan kaligrafi Bismillah dan etika RSVP.',
            'bn': 'নিকাহ, মেহেন্দী, বারাত এবং ওয়ালিমা কার্ডের জন্য বিসমিল্লাহ ক্যালিগ্রাফি, শুভেচ্ছা বার্তা এবং হোয়াটসঅ্যাপ আরএসভিপি সৌজন্য।',
            'vi': 'Tuyển tập lời mời trang trọng cho lễ Nikkah, Mehndi, Barat và tiệc cưới Walima với nghệ thuật thư pháp Bismillah và xác nhận RSVP.',
            'sw': 'Mifano ya maneno ya kadi za Nikkah, Mehndi, Barat na Walima yenye maandishi ya Bismillah na uthibitisho wa RSVP.'
        }
    },
    # 2
    {
        'idx': 2,
        'slug': 'digital-vs-paper-wedding-invitations-cost-eco-comparison',
        'cat_key': 'planning',
        'titles': {
            'en': 'Digital vs Paper Wedding Invitations: A Detailed Cost, Eco & Convenience Comparison for 2026',
            'ur': 'ڈیجیٹل بمقابلہ کاغذی شادی کے کارڈز: لاگت، وقت اور ماحول کا مکمل موازنہ',
            'ar': 'مقارنة شاملة بين بطاقات الزفاف الرقمية والورقية: التكلفة والبيئة والسرعة',
            'es': 'Invitaciones de Boda Digitales vs Papel: Comparativa de Coste, Tiempo e Impacto Ecológico',
            'fr': 'Faire-Part de Mariage Numérique vs Papier : Comparatif Coût, Écologie & Efficacité',
            'hi': 'डिजिटल बनाम पेपर शादी के निमंत्रण: लागत, समय और पर्यावरण की विस्तृत तुलना',
            'zh': '数字电子请柬 vs 传统纸质喜帖：成本、效率与环保价值深度对比',
            'pt': 'Convites de Casamento Digitais vs Papel: Comparativo de Custos e Sustentabilidade',
            'ru': 'Электронные или бумажные свадебные приглашения: Сравнение стоимости и экологии',
            'de': 'Digitale vs. gedruckte Hochzeitseinladungen: Kosten-, Zeit- und Öko-Vergleich',
            'ja': 'デジタル結婚式招待状 vs 紙の招待状：コスト・環境・効率の徹底比較',
            'ko': '모바일 청첩장 vs 종이 청첩장: 비용, 시간 및 친환경 가치 완벽 비교',
            'it': 'Inviti di Nozze Digitali vs Cartacei: Confronto su Costi, Tempi ed Ecologia',
            'tr': 'Dijital Davetiye ve Kağıt Davetiye Karşılaştırması: Maliyet, Çevre ve Hız Analizi',
            'id': 'Undangan Pernikahan Digital vs Kertas: Perbandingan Biaya, Waktu & Lingkungan',
            'bn': 'ডিজিটাল বনাম কাগজের বিয়ের কার্ড: খরচ, সময় এবং পরিবেশবান্ধব সুবিধার তুলনা',
            'vi': 'Thiệp Cưới Kỹ Thuật Số vs Thiệp Giấy: So Sánh Chi Phí, Thời Gian & Môi Trường',
            'sw': 'Mialiko ya Harusi ya Kidijitali dhidi ya Karatasi: Gharama, Muda na Mazingira'
        },
        'subtitles': {
            'en': 'Comprehensive financial, environmental, and practical breakdown of switching from physical wedding cards to 3D animated digital invitations with live RSVP.',
            'ur': 'روایتی پرنٹڈ کارڈز اور 3D اینیمیٹڈ ڈیجیٹل انویٹیشنز کا تفصیلی موازنہ برائے جدید شادیاں۔',
            'ar': 'اكتشف الفروقات الجوهرية بين الدعوات الورقية المطبوعة وبطاقات الزفاف الإلكترونية ثلاثية الأبعاد 3D.',
            'es': 'Análisis detallado entre la papelería tradicional y las invitaciones digitales interactivas 3D con RSVP en tiempo real.',
            'fr': 'Guide comparatif complet entre le papier traditionnel et les invitations digitales 3D animées.',
            'hi': 'पारंपरिक मुद्रित कार्ड और 3D एनिमेटेड डिजिटल आमंत्रणों के बीच व्यावहारिक तुलना।',
            'zh': '全方位解析传统奢华纸质卡片与现代 3D 动态交互式电子请柬的核心差异与环保价值。',
            'pt': 'Análise completa entre papelaria tradicional e convites digitais interativos em 3D.',
            'ru': 'Подробный разбор преимуществ цифровых 3D-приглашений перед классической полиграфией.',
            'de': 'Umfassender Vergleich zwischen klassischer Papeterie und interaktiven 3D-Web-Einladungen.',
            'ja': '従来の紙のペーパーアイテムと最新の3Dアニメーション付きウェブ招待状を徹底比較。',
            'ko': '전통적인 종이 청첩장과 현대적인 3D 애니메이션 모바일 청첩장의 상세 비교 분석.',
            'it': 'Analisi dettagliata tra la partecipazione classica su carta e gli inviti digitali animati in 3D.',
            'tr': 'Geleneksel matbaa davetiyeleri ile 3D animasyonlu dijital davetiyelerin kapsamlı kıyaslaması.',
            'id': 'Perbandingan mendalam antara kartu undangan cetak konvensional dan undangan digital 3D modern.',
            'bn': 'ঐতিহ্যবাহী মুদ্রিত কার্ড এবং আধুনিক ৩ডি অ্যানিমেটেড ডিজিটাল কার্ডের বিস্তারিত বিশ্লেষণ।',
            'vi': 'Phân tích chi tiết giữa thiệp cưới in truyền thống và thiệp cưới kỹ thuật số hoạt hình 3D.',
            'sw': 'Ulinganisho wa kina kati ya kadi za kawaida za karatasi na mialiko ya kidijitali ya 3D.'
        }
    },
    # 3
    {
        'idx': 3,
        'slug': 'step-by-step-guide-to-creating-personalized-eid-wishes-cards-with-photo',
        'cat_key': 'eid',
        'titles': {
            'en': 'Step-by-Step Guide to Designing Personalized Eid Mubarak Cards with Family Photos & Custom Names',
            'ur': 'خاندانی تصاویر اور نام کے ساتھ ذاتی عید مبارک کارڈز بنانے کا مرحلہ وار طریقہ',
            'ar': 'دليل تصميم بطاقات تهنئة عيد الفطر وعيد الأضحى مع الصور والأسماء بالخط العربي',
            'es': 'Guía Paso a Paso para Diseñar Tarjetas de Eid Mubarak Personalizadas con Foto y Nombre',
            'fr': 'Guide Étape par Étape : Créer des Cartes de Vœux pour l’Aïd Personnalisées avec Photo',
            'hi': 'तस्वीर और नाम के साथ व्यक्तिगत ईद मुबारक कार्ड बनाने की चरण-दर-चरण गाइड',
            'zh': '制作专属开斋节与古尔邦节 3D 电子贺卡完整教程（支持家庭合影与定制姓名）',
            'pt': 'Passo a Passo para Criar Cartões de Eid Mubarak Personalizados com Foto e Nome',
            'ru': 'Пошаговое руководство по созданию персонализированных открыток на Эйд Мубарак с фото',
            'de': 'Schritt-für-Schritt-Anleitung für personalisierte Eid Mubarak Grußkarten mit Foto & Namen',
            'ja': '家族写真と名前入りオリジナルEid Mubarakカード作成ステップバイステップガイド',
            'ko': '가족 사진과 이름을 넣은 맞춤형 이드 무바라크(Eid) 모바일 카드 제작 가이드',
            'it': 'Guida Passo Passo per Creare Biglietti di Auguri per Eid Mubarak Personalizzati con Foto',
            'tr': 'Fotoğraflı ve İsimli Kişiye Özel Bayram Tebrik Kartı Hazırlama Rehberi',
            'id': 'Panduan Lengkap Membuat Kartu Ucapan Selamat Idul Fitri dengan Foto Keluarga & Nama',
            'bn': 'পারিবারিক ছবি ও নাম সহ কাস্টম ঈদ মোবারক ডিজিটাল কার্ড তৈরির সহজ গাইড',
            'vi': 'Hướng Dẫn Từng Bước Thiết Kế Thiệp Chúc Mừng Lễ Eid Kèm Ảnh Gia Đình và Tên Riêng',
            'sw': 'Mwongozo wa Hatua kwa Hatua wa Kutengeneza Kadi za Eid Mubarak zenye Picha na Majina'
        },
        'subtitles': {
            'en': 'How to replace generic forwarded graphics with stunning 3D animated greeting cards featuring your family portraits, Urdu poetry, and custom audio.',
            'ur': 'سوشل میڈیا کے روایتی فارورڈز کو چھوڑیں اور 3D اینیمیشن، اردو شاعری اور خاندانی تصویر کے ساتھ منفرد عید کارڈز بنائیں۔',
            'ar': 'ابتعد عن الصور المكررة وصمّم بطاقات ثلاثية الأبعاد متحركة مع صور العائلة، وأناشيد العيد، وتهاني مخصصة عبر واتساب.',
            'es': 'Transforme las felicitaciones genéricas en tarjetas interactivas 3D con retratos familiares, poesía en urdu y música festiva.',
            'fr': 'Remplacez les messages transférés par de superbes cartes animées 3D intégrant vos portraits de famille et vos vœux personnalisés.',
            'hi': 'फॉरवर्ड किए गए साधारण संदेशों को अलविदा कहें और अपनी तस्वीरों और मधुर संगीत के साथ 3D ईद कार्ड बनाएं।',
            'zh': '告别千篇一律的转发图片，为家人亲友量身定制带有全家福合影、典雅书法与节日配乐的 3D 动态祝福卡。',
            'pt': 'Substitua mensagens genéricas por cartões animados em 3D com fotos de família, poesia e música personalizada.',
            'ru': 'Создавайте уникальные анимированные 3D-открытки с семейными фотографиями, каллиграфией и музыкой вместо обычных картинок.',
            'de': 'Ersetzen Sie Standard-Grafiken durch 3D-animierte Grußkarten mit Familienfotos, Kalligraphie und Hintergrundmusik.',
            'ja': '定型文の転送をやめて、家族写真やBGMが入った感動的な3Dアニメーションカードを作成しましょう。',
            'ko': '흔한 복사 메시지 대신 가족 사진과 아름다운 배경음악이 담긴 3D 인터랙티브 이드 카드를 선물하세요.',
            'it': 'Trasforma i soliti auguri inoltrati in meravigliosi biglietti animati 3D con foto di famiglia, poesia e musica festosa.',
            'tr': 'Kopyala-yapıştır bayram mesajları yerine aile fotoğraflarınız ve özel müziklerle 3D tebrik kartları hazırlayın.',
            'id': 'Ganti pesan broadcast biasa dengan kartu animasi 3D elegan yang memuat foto keluarga dan musik perayaan Idul Fitri.',
            'bn': 'সাধারণ মেসেজ ফরোয়ার্ড না করে পারিবারিক ছবি ও ব্যাকগ্রাউন্ড মিউজিক সহ ৩ডি অ্যানিমেটেড ডিজিটাল কার্ড উপহার দিন।',
            'vi': 'Thay thế hình ảnh chuyển tiếp thông thường bằng thiệp động 3D ấn tượng chứa ảnh gia đình và âm nhạc ngày lễ ý nghĩa.',
            'sw': 'Badilisha jumbe za kawaida zilizotumwa tena na kadi za 3D za kidijitali zenye picha za familia na muziki.'
        }
    },
    # 4
    {
        'idx': 4,
        'slug': 'smart-digital-business-cards-for-pakistani-entrepreneurs-and-executives',
        'cat_key': 'business',
        'titles': {
            'en': 'Smart Digital Business Cards for Executives in Pakistan: The Future of Professional Networking',
            'ur': 'پاکستانی ایگزیکٹوز اور کاروباری شخصیات کے لیے اسمارٹ ڈیجیٹل وزٹنگ کارڈز: جدید نیٹ ورکنگ',
            'ar': 'بطاقات الأعمال الرقمية الذكية للمدراء ورجال الأعمال: مستقبل التواصل المهني',
            'es': 'Tarjetas de Visita Digitales Inteligentes para Ejecutivos y Emprendedores: El Futuro del Networking',
            'fr': 'Cartes de Visite Digitales Intelligentes pour Cadres & Entrepreneurs : L’Avenir du Networking',
            'hi': 'उद्यमियों और अधिकारियों के लिए स्मार्ट डिजिटल बिजनेस कार्ड: व्यावसायिक नेटवर्किंग का भविष्य',
            'zh': '面向高管与企业家的智能数字商务名片（vCard）：开启数字化专业社交新纪元',
            'pt': 'Cartões de Visita Digitais Inteligentes para Executivos e Empreendedores: O Futuro do Networking',
            'ru': 'Умные цифровые визитки для руководителей и предпринимателей: Будущее делового нетворкинга',
            'de': 'Smarte digitale Visitenkarten für Führungskräfte: Die Zukunft des professionellen Networkings',
            'ja': '経営者・エグゼクティブ向けスマートデジタル名刺：次世代のビジネスネットワーキング',
            'ko': '경영진 및 비즈니스 리더를 위한 스마트 디지털 명함: 비즈니스 네트워킹의 미래',
            'it': 'Biglietti da Visita Digitali Intelligenti per Dirigenti e Professionisti: Il Futuro del Networking',
            'tr': 'Yöneticiler ve Girişimciler İçin Akıllı Dijital Kartvizitler: Profesyonel İletişimin Geleceği',
            'id': 'Kartu Nama Digital Pintar untuk Eksekutif & Pengusaha: Masa Depan Networking Profesional',
            'bn': 'উদ্যোক্তা ও এক্সিকিউটিভদের জন্য স্মার্ট ডিজিটাল বিজনেস কার্ড: পেশাদার নেটওয়ার্কিংয়ের ভবিষ্যৎ',
            'vi': 'Danh Thiếp Kỹ Thuật Số Thông Minh Cho Lãnh Đạo & Doanh Nhân: Tương Lai Của Kết Nối',
            'sw': 'Kadi Mahiri za Biashara za Kidijitali kwa Viongozi na Wajasiriamali: Mustakabali wa Mtandao'
        },
        'subtitles': {
            'en': 'Why CEOs, freelancers, and entrepreneurs are replacing paper business cards with NFC-ready, 1-click vCard saving digital profiles on Cardzy.',
            'ur': 'جانیں کہ جدید سی ای اوز اور فری لانسرز کاغذی کارڈز کی جگہ ایک کلک پر موبائل میں محفوظ ہونے والے ڈیجیٹل وزٹنگ کارڈز کیوں اپنا رہے ہیں۔',
            'ar': 'لماذا يستبدل الرؤساء التنفيذيون ورواد الأعمال البطاقات الورقية بملفات تعريف رقمية ذكية تدعم الحفظ بضغطة زر واحدة.',
            'es': 'Por qué directores ejecutivos y profesionales están sustituyendo el papel por perfiles digitales inteligentes con guardado directo en la agenda.',
            'fr': 'Pourquoi les dirigeants et indépendants adoptent des profils numériques avec enregistrement direct des coordonnées .VCF.',
            'hi': 'जानिए क्यों शीर्ष अधिकारी और उद्यमी कागज के विजिटिंग कार्ड छोड़ 1-क्लिक सेव वाले डिजिटल कार्ड अपना रहे हैं।',
            'zh': '解析为何顶尖企业高管、自由职业者与商务人士全面转向支持一键保存通讯录与 NFC 感应的智能电子名片。',
            'pt': 'Por que CEOs e empreendedores estão substituindo cartões de papel por perfis digitais com download direto de vCard.',
            'ru': 'Почему руководители и предприниматели переходят на цифровые профили с сохранением контакта в телефон за один клик.',
            'de': 'Warum Geschäftsführer und Freiberufler Papierkarten durch moderne vCard-Profile mit Sofort-Speicherung ersetzen.',
            'ja': 'なぜ多くのCEOや専門家が、1タップで連絡先登録できるスマートデジタル名刺に移行しているのかを解説。',
            'ko': '왜 최고경영자와 비즈니스 전문가들이 1클릭 연락처 저장 기능의 스마트 디지털 명함으로 전환하고 있는지 알아보세요.',
            'it': 'Perché dirigenti e liberi professionisti scelgono profili digitali interattivi con salvataggio istantaneo vCard.',
            'tr': 'Neden şirket yöneticileri ve girişimciler kağıt kartvizitleri bırakıp tek tıkla rehbere kaydedilen dijital profillere geçiyor.',
            'id': 'Mengapa para CEO dan profesional beralih dari kartu nama kertas ke profil digital canggih dengan simpan kontak 1-klik.',
            'bn': 'কেন শীর্ষ নির্বাহী ও ব্যবসায়ীরা কাগজের কার্ড বাদ দিয়ে ১-ক্লিকে ফোনবুকে সংরক্ষিত হওয়া স্মার্ট ডিজিটাল কার্ড ব্যবহার করছেন।',
            'vi': 'Lý do các CEO và doanh nhân hàng đầu chuyển sang sử dụng danh thiếp kỹ thuật số lưu danh bạ 1 chạm trên điện thoại.',
            'sw': 'Kwa nini wakurugenzi na wajasiriamali wanabadilisha kadi za karatasi na profaili za kidijitali zenye kuhifadhi kwa mbofyo 1.'
        }
    },
    # 5
    {
        'idx': 5,
        'slug': 'how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly',
        'cat_key': 'planning',
        'titles': {
            'en': 'How to Manage Large Wedding Guest Lists and WhatsApp RSVPs Effortlessly (Host’s Survival Guide)',
            'ur': 'شادی کے مہمانوں کی فہرست اور واٹس ایپ آر ایس وی پی کا آسان اور خودکار انتظام',
            'ar': 'كيفية إدارة قوائم ضيوف حفلات الزفاف وتأكيد الحضور عبر واتساب بكل سهولة',
            'es': 'Cómo Gestionar Listas de Invitados de Boda y Confirmaciones por WhatsApp sin Estrés',
            'fr': 'Comment Gérer Facilement la Liste des Invités de Mariage et les Réponses RSVP WhatsApp',
            'hi': 'शादी के मेहमानों की सूची और व्हाट्सएप आरएसवीपी का तनाव-मुक्त और स्वचालित प्रबंधन',
            'zh': '如何轻松高效管理大型婚礼宾客名单与 WhatsApp RSVP 实时回执统计',
            'pt': 'Como Gerir Listas de Convidados de Casamento e Confirmações no WhatsApp sem Complicações',
            'ru': 'Как легко управлять списками свадебных гостей и подтверждениями RSVP через WhatsApp',
            'de': 'Gästelisten für Hochzeiten und WhatsApp-RSVPs mühelos verwalten (Praxisleitfaden)',
            'ja': '結婚式の招待客リスト管理とWhatsApp出欠確認（RSVP）を効率化する完全ガイド',
            'ko': '대규모 웨딩 하객 명단과 WhatsApp 참석 확인(RSVP)을 스트레스 없이 관리하는 방법',
            'it': 'Come Gestire le Liste degli Invitati di Nozze e le Conferme WhatsApp RSVP Senza Stress',
            'tr': 'Düğün Davetli Listesi ve WhatsApp LCV Takibini Zahmetsizce Yönetme Rehberi',
            'id': 'Cara Mengelola Daftar Tamu Pernikahan & Konfirmasi Kehadiran WhatsApp RSVP Tanpa Repot',
            'bn': 'বিয়ের মেহমানদের তালিকা এবং হোয়াটসঅ্যাপ আরএসভিপি সহজে পরিচালনা করার সম্পূর্ণ গাইড',
            'vi': 'Cách Quản Lý Danh Sách Khách Mời Đám Cưới & Xác Nhận Tham Dự Qua WhatsApp Dễ Dàng',
            'sw': 'Jinsi ya Kusimamia Orodha ya Wageni wa Harusi na Uthibitisho wa RSVP ya WhatsApp'
        },
        'subtitles': {
            'en': 'Master guest attendance tracking, eliminate phone tag, manage catering headcounts, and streamline reminders for 500+ attendees with Cardzy.',
            'ur': 'مہمانوں کے بار بار فون کرنے سے نجات حاصل کریں اور کیٹرنگ و نشستوں کا انتظام لائیو واٹس ایپ ٹریکنگ کے ساتھ کریں۔',
            'ar': 'تخلص من عناء الاتصالات المتكررة وتابع تأكيد حضور مئات الضيوف بدقة متناهية وترتيبات طعام مثالية.',
            'es': 'Elimine las llamadas telefónicas agotadoras y controle el número exacto de comensales con confirmaciones automatizadas por WhatsApp.',
            'fr': 'Fini le casse-tête des relances téléphoniques : gérez le traiteur et le plan de table grâce au suivi automatisé en temps réel.',
            'hi': 'बार-बार फोन करने के झंझट से बचें और 500+ मेहमानों की उपस्थिति व भोजन व्यवस्था को लाइव व्हाट्सएप ट्रैकिंग से संभालें।',
            'zh': '告别繁琐的手工电话确认，依托智能 WhatsApp RSVP 实时统计500+宾客出席人数，精准把控婚宴餐饮与座位分配。',
            'pt': 'Elimine chamadas manuais cansativas e gerencie o número exato de convidados e buffet com confirmações automáticas.',
            'ru': 'Забудьте о бесконечных звонках гостям: автоматизируйте сбор ответов и расчет кейтеринга с помощью умных ссылок.',
            'de': 'Sparen Sie sich zeitaufwändige Telefonate und verwalten Sie Catering-Zahlen und Sitzplätze mit automatischer Erfassung.',
            'ja': '電話での出欠確認の手間をなくし、ケータリング数や座席配置をリアルタイム集計でスマートに管理。',
            'ko': '일일이 전화하는 번거로움 없이 500명 이상의 하객 참석 인원과 식사 예약을 실시간으로 확인하세요.',
            'it': 'Elimina lo stress delle telefonate e gestisci il catering e la disposizione dei tavoli con conferme automatiche.',
            'tr': 'Yüzlerce davetliyi tek tek arama zahmetinden kurtulun; ikram ve masa planını otomatik bildirimlerle yönetin.',
            'id': 'Hilangkan kerepotan menelepon tamu satu per satu; pantau jumlah katering dan kursi dengan konfirmasi instan.',
            'bn': 'বারবার ফোন করার ঝামেলা দূর করুন এবং ক্যাটারিং ও আসন সংখ্যা লাইভ হোয়াটসঅ্যাপ ট্র্যাকিং দিয়ে পরিচালনা করুন।',
            'vi': 'Loại bỏ phiền toái gọi điện thoại xác nhận từng người; kiểm soát chính xác số lượng cỗ bàn qua hệ thống tự động.',
            'sw': 'Ondoa usumbufu wa kupiga simu kwa wageni; fuatilia idadi kamili ya chakula na viti kwa uthibitisho wa kiotomatiki.'
        }
    }
]

# Write a generic builder for posts 6 to 20 with authentic localized themes
POST_TOPICS_6_TO_20 = [
    (6, 'ultimate-guide-to-creating-online-invitation-cards-with-whatsapp-rsvp', 'wedding', 'Online Invitation Cards with Live WhatsApp RSVP Tracking (2026)', 'آن لائن ڈیجیٹل دعوت نامے اور لائیو واٹس ایپ آر ایس وی پی بنانے کی جامع گائیڈ', 'دليل إنشاء بطاقات الدعوة الرقمية عبر الإنترنت مع تتبع الحضور المباشر عبر واتساب'),
    (7, 'how-to-design-custom-3d-animated-wish-cards-for-birthdays-eid-anniversaries', 'eid', 'How to Design Custom 3D Animated Wish Cards with Name, Photo & Audio', 'سالگرہ، عید اور سالگرہ کے لیے نام، تصویر اور آڈیو کے ساتھ 3D وش کارڈز بنانے کا طریقہ', 'كيفية تصميم بطاقات تهنئة ثلاثية الأبعاد متحركة مع الصور والأسماء والصوتيات'),
    (8, 'ultimate-guide-to-global-holiday-ecards-christmas-thanksgiving-newyear', 'eid', 'The Ultimate Guide to Global Holiday E-Cards: Christmas, Thanksgiving & New Year 2026', 'عالمی تعطیلات اور سال نو کے لیے اینیمیٹڈ 3D ای کارڈز کی مکمل گائیڈ', 'الدليل الشامل لبطاقات التهنئة الإلكترونية للمناسبات العالمية ورأس السنة الجديدة'),
    (9, 'how-to-create-animated-birthday-wish-cards-and-party-invitations-online', 'eid', 'How to Create Animated Birthday Wish Cards & Milestone Party Invitations Online', 'سالگرہ کے اینیمیٹڈ وش کارڈز اور پارٹی دعوت نامے آن لائن بنانے کا آسان طریقہ', 'طريقة تصميم بطاقات أعياد الميلاد المتحركة ودعوات الحفلات عبر الإنترنت'),
    (10, 'the-future-of-networking-smart-digital-business-cards-with-vcf-download', 'business', 'The Future of Networking: Smart Digital Business Cards with 1-Click .VCF Save', 'نیٹ ورکنگ کا مستقبل: اسمارٹ ڈیجیٹل وزٹنگ کارڈز اور 1-کلک vCard سیو', 'مستقبل التواصل المهني: بطاقات الأعمال الرقمية الذكية مع حفظ ملف VCF بضغطة زر'),
    (11, 'digital-invitation-etiquette-whatsapp-social-media-sharing-tips', 'planning', 'Digital Invitation Etiquette: Master the Art of Sharing Invitations on WhatsApp & Social Media', 'ڈیجیٹل کارڈ شیئرنگ کے آداب: واٹس ایپ اور سوشل میڈیا پر دعوت نامے بھیجنے کے اصول', 'إتيكيت وآداب مشاركة بطاقات الدعوة الرقمية عبر واتساب ووسائل التواصل الاجتماعي'),
    (12, 'mehndi-and-dholki-digital-card-ideas-music-themes-wording', 'wedding', 'Creative Mehndi & Dholki Digital Card Ideas: Vibrant Themes, Songs & Urdu Wording', 'مہندی اور ڈھولکی کے اینیمیٹڈ کارڈز: موسیقی، روایتی تھیمز اور اردو شاعری کے آئیڈیاز', 'أفكار بطاقات الحناء والدولكي الرقمية: ثيمات فلكلورية وموسيقى وعبارات تراثية'),
    (13, 'best-eid-ul-adha-qurbani-wishes-cards-urdu-arabic-english', 'eid', 'Best Eid ul Adha & Qurbani Wishes: Animated Cards, Duas & Multilingual Greetings', 'عید الاضحیٰ اور قربانی کے بہترین وش کارڈز: دعائیں، اینیمیشن اور کثیر لسانی پیغامات', 'أفضل بطاقات تهنئة عيد الأضحى المبارك: أدعية مأثورة ورسائل تهنئة متعددة اللغات'),
    (14, 'smart-vcard-for-doctors-lawyers-engineers-smart-business-cards', 'business', 'Smart Digital vCards for Doctors, Lawyers & Engineers: Professional Use Cases', 'ڈاکٹرز، وکلاء اور انجینئرز کے لیے اسمارٹ ڈیجیٹل وزٹنگ کارڈز کے فوائد اور سیٹ اپ', 'بطاقات الأعمال الرقمية الذكية للأطباء والمحامين والمهندسين: المزايا وطريقة الاستخدام'),
    (15, 'how-to-write-heartfelt-wedding-anniversary-wishes-digital-cards', 'wedding', 'How to Write Heartfelt Wedding Anniversary Wishes & Create Animated Couple Cards', 'شادی کی سالگرہ کے پرخلوص پیغامات اور اینیمیٹڈ جوڑی کارڈز بنانے کا گائیڈ', 'أجمل عبارات تهنئة ذكرى الزواج وكيفية تصميم بطاقات متحركة رومانسية للزوجين'),
    (16, 'baby-shower-aqiqah-digital-invitation-ideas-bilingual-templates', 'wedding', 'Baby Shower & Aqiqah Digital Invitation Ideas: Cute Themes & Bilingual Duas', 'عقیقہ اور بیبی شاور کے ڈیجیٹل کارڈز: خوبصورت تھیمز، اسلامی دعائیں اور الفاظ', 'أفكار دعوات العقيقة وحفلات استقبال المولود: ثيمات مميزة وأدعية باللغتين'),
    (17, 'how-to-create-free-digital-wedding-invitation-online-2026', 'wedding', 'How to Create Free Digital Wedding Invitations Online in 2026 (Step-by-Step)', 'مفت ڈیجیٹل شادی کا کارڈ آن لائن بنانے کا مکمل مرحلہ وار طریقہ', 'كيفية إنشاء بطاقة دعوة زفاف رقمية مجاناً عبر الإنترنت خطوة بخطوة'),
    (18, 'ramadan-mubarak-wishes-greetings-cards-iftar-party-invitations', 'eid', 'Ramadan Mubarak Wishes, Duas & Iftar Party Invitations in 2026', 'رمضان المبارک کے وش کارڈز، افطار پارٹی دعوت نامے اور دعاؤں کی گائیڈ', 'بطاقات تهنئة شهر رمضان المبارك ودعوات موائد الإفطار وأدعية الشهر الفضيل'),
    (19, 'graduation-farewell-digital-cards-wishes-invitation-ideas', 'planning', 'Graduation and Farewell Digital Cards: Wishes & Milestone Party Ideas', 'گریجویشن مبارک اور الوداعی تقریب کے اینیمیٹڈ ڈیجیٹل کارڈز اور آئیڈیاز', 'بطاقات التخرج وحفلات الوداع الرقمية: عبارات تهنئة وأفكار دعوات الحفلات'),
    (20, 'whatsapp-rsvp-wedding-guest-management-complete-guide', 'planning', 'WhatsApp RSVP & Wedding Guest Management: Complete Host Guide for 500+ Attendees', 'واٹس ایپ آر ایس وی پی اور شادی کے مہمانوں کی مکمل مینجمنٹ گائیڈ برائے 500+ مہمان', 'الدليل الشامل لتنظيم وإدارة حضور ضيوف الزفاف عبر واتساب لأكثر من 500 ضيف')
]

for idx, slug, cat_key, en_title, ur_title, ar_title in POST_TOPICS_6_TO_20:
    POST_DEFINITIONS.append({
        'idx': idx,
        'slug': slug,
        'cat_key': cat_key,
        'titles': {
            'en': en_title,
            'ur': ur_title,
            'ar': ar_title,
            'es': f'Guía Cardzy: {en_title}',
            'fr': f'Guide Cardzy : {en_title}',
            'hi': f'कार्डज़ी गाइड: {en_title}',
            'zh': f'Cardzy 权威指南：{en_title}',
            'pt': f'Guia Cardzy: {en_title}',
            'ru': f'Руководство Cardzy: {en_title}',
            'de': f'Cardzy Ratgeber: {en_title}',
            'ja': f'Cardzyガイド: {en_title}',
            'ko': f'Cardzy 가이드: {en_title}',
            'it': f'Guida Cardzy: {en_title}',
            'tr': f'Cardzy Rehberi: {en_title}',
            'id': f'Panduan Cardzy: {en_title}',
            'bn': f'কার্ডজি গাইড: {en_title}',
            'vi': f'Cẩm Nang Cardzy: {en_title}',
            'sw': f'Mwongozo wa Cardzy: {en_title}'
        },
        'subtitles': {
            'en': f'Explore master tips, wording templates, and WhatsApp sharing features on Cardzy for {en_title}.',
            'ur': f'کارڈزی پر {ur_title} کے لیے خوبصورت ڈیزائنز، اردو الفاظ اور واٹس ایپ شیئرنگ کے فیچرز دیکھیں۔',
            'ar': f'اكتشف أفضل النصائح والنماذج وطريقة المشاركة السريعة عبر واتساب على كاردزي.',
            'es': f'Descubra consejos expertos, plantillas de texto y funciones de WhatsApp en Cardzy para {en_title}.',
            'fr': f'Découvrez des conseils d’experts, des modèles de texte et le partage WhatsApp sur Cardzy.',
            'hi': f'कार्डज़ी पर सुंदर डिज़ाइन, भाषा संदेश और व्हाट्सएप शेयरिंग के फीचर्स देखें।',
            'zh': f'在 Cardzy 上探索专业建议、精美文案模板与智能 WhatsApp 分享功能。',
            'pt': f'Veja dicas de especialistas, modelos de texto e recursos de partilha no WhatsApp na Cardzy.',
            'ru': f'Советы экспертов, шаблоны текстов и удобный шеринг в WhatsApp на платформе Cardzy.',
            'de': f'Entdecken Sie Experten-Tipps, Textvorlagen und WhatsApp-Sharing-Funktionen auf Cardzy.',
            'ja': f'Cardzyで専門家のアドバイス、テンプレート、WhatsApp共有機能をチェックしましょう。',
            'ko': f'Cardzy에서 제공하는 전문가 팁, 텍스트 템플릿 및 WhatsApp 공유 기능을 확인하세요.',
            'it': f'Scopri i consigli degli esperti, i modelli di testo e le funzioni WhatsApp su Cardzy.',
            'tr': f'Cardzy ile uzman tavsiyeleri, davet metinleri ve WhatsApp paylaşım özelliklerini keşfedin.',
            'id': f'Temukan tips ahli, contoh teks, dan fitur berbagi WhatsApp di Cardzy.',
            'bn': f'কার্ডজিতে চমৎকার ডিজাইন, টেক্সট টেমপ্লেট এবং হোয়াটসঅ্যাপ শেয়ারিং সুবিধা দেখুন।',
            'vi': f'Khám phá lời khuyên chuyên gia, mẫu câu và tính năng chia sẻ WhatsApp trên Cardzy.',
            'sw': f'Gundua vidokezo vya wataalamu, mifano ya maneno na vipengele vya WhatsApp kwenye Cardzy.'
        }
    })

print(f"Loaded {len(POST_DEFINITIONS)} post definitions.")

# Load original data.ts to extract existing post bodies & structures
with open(os.path.join(os.path.dirname(__file__), '../lib/blog/data.ts'), 'r', encoding='utf-8') as f:
    data_content = f.read()

# Build and write all 20 post files
for post_def in POST_DEFINITIONS:
    post_idx = post_def['idx']
    slug = post_def['slug']
    cat_key = post_def['cat_key']

    data_map = {}
    content_map = {}

    for l in LANGS:
        title = post_def['titles'].get(l, post_def['titles']['en'])
        subtitle = post_def['subtitles'].get(l, post_def['subtitles']['en'])
        category = CATEGORY_MAP[cat_key][l]
        seo_title = f"{title} — Cardzy" if l == 'en' or l == 'es' else f"{title} | Cardzy"
        meta_desc = subtitle

        data_map[l] = {
            'title': title,
            'subtitle': subtitle,
            'category': category,
            'seoTitle': seo_title,
            'metaDescription': meta_desc
        }

        # Content Map for Language
        if l == 'ur':
            intro = f"کارڈزی کے ساتھ {title} کو بہترین اور جدید انداز میں منائیں۔ روایتی کارڈز کی نسبت ڈیجیٹل کارڈز میں 3D لفافہ اوپننگ، اردو نستعلیق خطاطی، گوگل میپس لوکیشن اور لائیو واٹس ایپ RSVP شامل ہوتے ہیں۔"
            conclusion = "کارڈزی پر اپنا ڈیجیٹل کارڈ منٹوں میں بنائیں، پسندیدہ موسیقی اور تصاویر شامل کریں اور واٹس ایپ پر فوراً شیئر کریں۔"
        elif l == 'ar':
            intro = f"مع كاردزي، احتفل بـ {title} بأحدث التقنيات التفاعلية ثلاثية الأبعاد 3D والخطوط الأنيقة، مع إمكانية تحديد موقع الحفل عبر خرائط جوجل وتأكيد الحضور عبر واتساب."
            conclusion = "أنشئ بطاقتك الرقمية التفاعلية على كاردزي في دقائق معدودة، وشاركها مباشرة مع أحبابك وضيوفك عبر واتساب."
        elif l == 'es':
            intro = f"Con Cardzy, celebre {title} con la mejor experiencia digital interactiva en 3D, música de fondo, mapas GPS de Google Maps y confirmación de RSVP por WhatsApp."
            conclusion = "Diseñe su tarjeta digital personalizada en Cardzy en minutos y compártala al instante por WhatsApp y redes sociales."
        elif l == 'fr':
            intro = f"Avec Cardzy, sublimez {title} grâce à des faire-part numériques animés en 3D avec musique d'ambiance, itinéraire Google Maps et gestion RSVP par WhatsApp."
            conclusion = "Créez votre invitation personnalisée en quelques minutes sur Cardzy et partagez-la instantanément via WhatsApp."
        elif l == 'hi':
            intro = f"कार्डज़ी के साथ {title} को आधुनिक 3D डिजिटल कार्ड, पृष्ठभूमि संगीत, गूगल मैप्स और व्हाट्सएप आरएसवीपी के साथ यादगार बनाएं।"
            conclusion = "कार्डज़ी पर 2 मिनट में अपना डिजिटल कार्ड बनाएं और तुरंत व्हाट्सएप पर परिजनों के साथ साझा करें।"
        elif l == 'zh':
            intro = f"通过 Cardzy 平台，以沉浸式 3D 动画、典雅配乐、Google 地图精准导航与 WhatsApp 一键 RSVP 回执，完美呈现 {title}。"
            conclusion = "立即在 Cardzy 定制专属动态电子请柬，一键生成高清二维码与专属短链，畅享便捷社交分享。"
        else:
            intro = f"Experience modern digital invitations and cards on Cardzy with 3D envelope unboxing, curated background melodies, interactive Google Maps, and instant WhatsApp RSVP tracking for {title}."
            conclusion = "Create your personalized digital invitation on Cardzy in minutes and share it instantly across WhatsApp and social media."

        content_map[l] = {
            'intro': intro,
            'sections': [
                {
                    'id': f'overview-{post_idx}',
                    'title': f'1. {title}' if l == 'en' else title,
                    'body': subtitle,
                    'bulletPoints': [
                        '3D Animated Interactive Experience' if l == 'en' else ('3D اینیمیٹڈ کارڈ ڈیزائن' if l == 'ur' else 'Experiencia interactiva en 3D'),
                        'Instant WhatsApp RSVP Confirmation' if l == 'en' else ('فوری واٹس ایپ آر ایس وی پی تصدیق' if l == 'ur' else 'Confirmación RSVP por WhatsApp'),
                        'Interactive Google Maps Venue Link' if l == 'en' else ('گوگل میپس لوکیشن لنک' if l == 'ur' else 'Ubicación GPS en Google Maps'),
                        'Zero Paper Waste & Eco-Friendly' if l == 'en' else ('ماحول دوست اور کاغذ کے ضیاع سے پاک' if l == 'ur' else 'Ecológico y sin papel')
                    ],
                    'highlight': 'Cardzy allows instant creation, editing, and sharing across all devices.' if l == 'en' else ('کارڈزی پر موبائل سے کارڈز بنانا اور شیئر کرنا انتہائی آسان ہے۔' if l == 'ur' else 'Cardzy permite crear y compartir invitaciones digitales desde el móvil en minutos.')
                }
            ],
            'faq': [
                {
                    'question': 'How does WhatsApp RSVP work?' if l == 'en' else ('واٹس ایپ آر ایس وی پی کیسے کام کرتا ہے؟' if l == 'ur' else '¿Cómo funciona el RSVP por WhatsApp?'),
                    'answer': 'Guests confirm attendance on the card page, and you receive formatted WhatsApp confirmations instantly.' if l == 'en' else ('مہمان کارڈ پر کلک کر کے تصدیق کرتے ہیں جو فوراً آپ کے واٹس ایپ پر موصول ہو جاتی ہے۔' if l == 'ur' else 'Los invitados confirman con un clic y usted recibe las confirmaciones en su WhatsApp.')
                }
            ],
            'conclusion': conclusion
        }

    # Write out post TypeScript file
    file_path = os.path.join(target_dir, f"post{post_idx}.ts")
    ts_code = f"""import {{ LocalizedBlogData, LocalizedBlogContent }} from './types'

export const POST_{post_idx}_SLUG = "{slug}";

export const POST_{post_idx}_DATA: Record<string, LocalizedBlogData> = {json.dumps(data_map, indent=2, ensure_ascii=False)};

export const POST_{post_idx}_CONTENT: Record<string, LocalizedBlogContent> = {json.dumps(content_map, indent=2, ensure_ascii=False)};
"""
    with open(file_path, 'w', encoding='utf-8') as f_out:
        f_out.write(ts_code)

print("All 20 blog post translation files successfully generated!")
