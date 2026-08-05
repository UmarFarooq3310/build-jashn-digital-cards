const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

const SEO_TITLES = {
  1: {
    es: "Guía de Textos para Invitaciones de Boda Islámicas (Urdu e Inglés)",
    fr: "Guide des Textes de Faire-Part de Mariage Islamique (Ourdou & Anglais)",
    ar: "دليل صيغ دعوات الزفاف الإسلامية والباكستانية (أردو وإنجليزي)",
    hi: "शादी और निकाह निमंत्रण पत्र गाइड (उर्दू और अंग्रेजी)",
    zh: "伊斯兰与巴基斯坦婚礼请柬文案指南（乌尔都语与英语）",
    pt: "Guia de Texto para Convites de Casamento Islâmicos (Urdu e Inglês)",
    ru: "Руководство по текстам мусульманских свадебных приглашений (Урду и Английский)",
    de: "Leitfaden für islamische Hochzeitseinladungstexte (Urdu & Englisch)",
    ja: "イスラム・巴基斯坦結婚式招待状文面ガイド（ウルドゥー語＆英語）",
    ko: "이슬람 결혼식 초대장 문구 가이드 (우르두어 및 영어)",
    it: "Guida ai Testi per Inviti di Nozze Islamici (Urdu e Inglese)",
    tr: "İslami ve Geleneksel Düğün Davetiye Metinleri Rehberi (Urduca ve İngilizce)",
    id: "Panduan Teks Undangan Pernikahan Islami (Urdu & Inggris)",
    bn: "ইসলামিক বিয়ের কার্ডের ভাষা নির্দেশিকা (উর্দু ও ইংরেজি)",
    vi: "Hướng Dẫn Viết Thiệp Mời Đám Cưới Hồi Giáo (Tiếng Urdu & Anh)",
    sw: "Mwongozo wa Maneno ya Kadi za Harusi (Urdu na Kiingereza)"
  },
  2: {
    es: "Comparativa de Costes: Invitaciones Digitales vs Papel — Cardzy",
    fr: "Comparatif Prix Faire-Part Numérique vs Papier — Cardzy",
    ar: "مقارنة تكلفة بطاقات الزفاف الرقمية والورقية — كاردزي",
    hi: "डिजिटल बनाम पेपर शादी कार्ड लागत तुलना — कार्डज़ी",
    zh: "数字电子请柬与纸质请柬成本对比 — Cardzy",
    pt: "Comparação de Custos: Convites Digitais vs Papel — Cardzy",
    ru: "Сравнение стоимости цифровых и бумажных открыток — Cardzy",
    de: "Kostenvergleich Digitale vs. Papier-Hochzeitseinladungen — Cardzy",
    ja: "デジタル vs 紙の結婚式招待状 コスト比較 — Cardzy",
    ko: "디지털 vs 종이 청첩장 비용 비교 — Cardzy",
    it: "Confronto Costi Inviti Digitali vs Carta — Cardzy",
    tr: "Dijital ve Kağıt Davetiye Maliyet Karşılaştırması — Cardzy",
    id: "Perbandingan Biaya Undangan Digital vs Kertas — Cardzy",
    bn: "ডিজিটাল বনাম কাগজের বিয়ের کارڈের খরচ তুলনা — কার্ডজি",
    vi: "So Sánh Chi Phí Thiệp Mời Kỹ Thuật Số vs Thiệp Giấy — Cardzy",
    sw: "Linganisho la Gharama za Kadi za Kidijitali dhidi ya Karatasi — Cardzy"
  },
  3: {
    es: "Tarjetas de Eid Personalizadas con Foto y Nombre — Cardzy",
    fr: "Cartes d'Aïd Personnalisées avec Photo & Nom — Cardzy",
    ar: "بطاقات تهنئة العيد بالصور والأسماء — كاردزي",
    hi: "फोटो और नाम के साथ पर्सनल ईद कार्ड — कार्डज़ी",
    zh: "个性化照片与姓名开斋节贺卡 — Cardzy",
    pt: "Cartões de Eid Personalizados com Foto e Nome — Cardzy",
    ru: "Персональные открытки на Эйд с фото и именем — Cardzy",
    de: "Personalisierte Eid-Karten mit Foto & Namen — Cardzy",
    ja: "写真＆名前入り Eid Mubarakカード — Cardzy",
    ko: "사진 및 이름 맞춤형 이드 카드 — Cardzy",
    it: "Biglietti Eid Personalizzati con Foto e Nome — Cardzy",
    tr: "Fotoğraflı ve İsimli Bayram Kartı — Cardzy",
    id: "Kartu Ucapan Idul Fitri Foto & Nama — Cardzy",
    bn: "ছবি ও নাম সহ ব্যক্তিগতকৃত ঈদ কার্ড — কার্ডজি",
    vi: "Thiệp Eid Cá Nhân Hóa Kèm Ảnh & Tên — Cardzy",
    sw: "Kadi za Eid zenye Picha na Jina — Cardzy"
  },
  4: {
    es: "Guía de Tarjetas de Visita Digitales NFC — Cardzy",
    fr: "Guide des Cartes de Visite Numériques NFC — Cardzy",
    ar: "دليل بطاقات الأعمال الرقمية NFC — كاردزي",
    hi: "स्मार्ट NFC डिजिटल बिजनेस कार्ड गाइड — कार्डज़ी",
    zh: "智能 NFC 数字名片指南 — Cardzy",
    pt: "Guia de Cartões de Visita Digitais NFC — Cardzy",
    ru: "Руководство по цифровым визиткам NFC — Cardzy",
    de: "NFC Digitale Visitenkarten Leitfaden — Cardzy",
    ja: "スマートNFCデジタル名刺ガイド — Cardzy",
    ko: "스마트 NFC 디지털 명함 가이드 — Cardzy",
    it: "Guida ai Biglietti da Visita Digitali NFC — Cardzy",
    tr: "Akıllı NFC Dijital Kartvizit Rehberi — Cardzy",
    id: "Panduan Kartu Nama Digital NFC — Cardzy",
    bn: "স্মার্ট এনএফসি ডিজিটাল বিজনেস কার্ড গাইড — কার্ডজি",
    vi: "Hướng Dẫn Danh Thiếp Kỹ Thuật Số NFC — Cardzy",
    sw: "Mwongozo wa Kadi za Biashara za NFC — Cardzy"
  },
  5: {
    es: "Gestión de Listas de Invitados de Boda y Confirmaciones WhatsApp — Cardzy",
    fr: "Gestion des Listes d'Invités de Mariage & RSVP WhatsApp — Cardzy",
    ar: "إدارة قائمة ضيوف الزفاف وتأكيد الحضور عبر واتساب — كاردزي",
    hi: "शादी के मेहमानों की सूची और व्हाट्सएप आरएसवीपी प्रबंधन — कार्डज़ी",
    zh: "婚礼宾客名单与 WhatsApp RSVP 确认管理指南 — Cardzy",
    pt: "Gestão de Listas de Convidados de Casamento e RSVPs WhatsApp — Cardzy",
    ru: "Управление списками гостей свадьбы и RSVP в WhatsApp — Cardzy",
    de: "Hochzeitsgästeliste & WhatsApp RSVP Management — Cardzy",
    ja: "結婚式ゲストリスト＆WhatsApp RSVP管理ガイド — Cardzy",
    ko: "결혼식 하객 리스트 및 WhatsApp RSVP 관리 가이드 — Cardzy",
    it: "Gestione Liste Invitati di Nozze e RSVP WhatsApp — Cardzy",
    tr: "Düğün Davetli Listesi ve WhatsApp LCV Yönetimi — Cardzy",
    id: "Manajemen Daftar Tamu Pernikahan & RSVP WhatsApp — Cardzy",
    bn: "বিয়ের অতিথির তালিকা ও হোয়াটসঅ্যাপ আরএসভিপি ম্যানেজমেন্ট — কার্ডজি",
    vi: "Quản Lý Danh Sách Khách Mời Đám Cưới & RSVP WhatsApp — Cardzy",
    sw: "Usimamizi wa Orodha ya Wageni wa Harusi na RSVP ya WhatsApp — Cardzy"
  },
  6: {
    es: "Crear Invitaciones Digitales Online con RSVP por WhatsApp — Cardzy",
    fr: "Créer des Invitations Numériques en Ligne avec RSVP WhatsApp — Cardzy",
    ar: "إنشاء بطاقات دعوة رقمية مع تأكيد الحضور عبر واتساب — كاردزي",
    hi: "व्हाट्सएप आरएसवीपी के साथ ऑनलाइन डिजिटल निमंत्रण कार्ड — कार्डज़ी",
    zh: "在线创建含 WhatsApp RSVP 的数字请柬网站 — Cardzy",
    pt: "Criar Convites Digitais Online com RSVP WhatsApp — Cardzy",
    ru: "Онлайн цифровые пригласительные с RSVP в WhatsApp — Cardzy",
    de: "Online Digitale Einladungen mit WhatsApp RSVP erstellen — Cardzy",
    ja: "WhatsApp RSVP機能付きオンラインデジタル招待状の作成 — Cardzy",
    ko: "WhatsApp RSVP 기능이 있는 온라인 디지털 청첩장 만들기 — Cardzy",
    it: "Crea Inviti Digitali Online con RSVP WhatsApp — Cardzy",
    tr: "WhatsApp LCV ile Online Dijital Davetiye Kartı Oluşturma — Cardzy",
    id: "Buat Kartu Undangan Digital Online dengan RSVP WhatsApp — Cardzy",
    bn: "হোয়াটসঅ্যাপ আরএসভিপি সহ অনলাইন ডিজিটাল ইনভিটেশন কার্ড — কার্ডজি",
    vi: "Tạo Thiệp Mời Kỹ Thuật Số Online Kèm RSVP WhatsApp — Cardzy",
    sw: "Unda Kadi za Mialiko ya Kidijitali Mtandaoni zenye RSVP ya WhatsApp — Cardzy"
  },
  7: {
    es: "Diseñar Tarjetas de Felicitación 3D Animadas Personalizadas — Cardzy",
    fr: "Créer des Cartes de Vœux 3D Animées Personnalisées — Cardzy",
    ar: "تصميم بطاقات تهنئة 3D متحركة ومخصصة — كاردزي",
    hi: "कस्टम 3D एनिमेटेड विश कार्ड डिज़ाइन करें — कार्डज़ी",
    zh: "设计制作 3D 动画定制祝福卡片 — Cardzy",
    pt: "Criar Cartões de Cumprimentos 3D Animados Personalizados — Cardzy",
    ru: "Создание персональных 3D анимированных открыток — Cardzy",
    de: "Personalisierte 3D-animierte Glückwunschkarten gestalten — Cardzy",
    ja: "カスタム3Dアニメーションお祝いカードのデザイン — Cardzy",
    ko: "맞춤형 3D 애니메이션 축하 카드 디자인 — Cardzy",
    it: "Progetta Biglietti di Auguri 3D Animati Personalizzati — Cardzy",
    tr: "Özel 3D Hareketli Tebrik Kartı Tasarlama — Cardzy",
    id: "Rancang Kartu Ucapan 3D Animasi Kustom — Cardzy",
    bn: "কাস্টম ৩ডি অ্যানিমেটেড শুভেচ্ছা কার্ড ডিজাইন করুন — কার্ডজি",
    vi: "Thiết Kế Thiệp Chúc Mừng Hoạt Hình 3D Tùy Chỉnh — Cardzy",
    sw: "Unda Kadi za Salamu za 3D za Uhuishaji — Cardzy"
  },
  8: {
    es: "Guía de Tarjetas Digitales de Festividades Navidad y Año Nuevo — Cardzy",
    fr: "Guide des Cartes Virtuelles de Fêtes Noël & Nouvel An — Cardzy",
    ar: "دليل بطاقات المناسبات العالمية الكريسماس والسنة الجديدة — كاردزي",
    hi: "क्रिसमस और नए साल के विश कार्ड गाइड — कार्डज़ी",
    zh: "全球节日与圣诞跨年电子贺卡指南 — Cardzy",
    pt: "Guia de Cartões Digitais de Festas Natal e Ano Novo — Cardzy",
    ru: "Гид по новогодним и рождественским открыткам — Cardzy",
    de: "Leitfaden für digitale Weihnachts- & Neujahrskarten — Cardzy",
    ja: "クリスマス＆2026年新春グローバルEカードガイド — Cardzy",
    ko: "글로벌 휴일 크리스마스 및 새해 E-카드 가이드 — Cardzy",
    it: "Guida ai Biglietti Digitali di Natale e Capodanno — Cardzy",
    tr: "Noel ve Yılbaşı Dijital E-Kart Rehberi — Cardzy",
    id: "Panduan Kartu Ucapan Liburan Natal & Tahun Baru — Cardzy",
    bn: "ক্রিসমাস ও নববর্ষের ডিজিটাল ই-কার্ড নির্দেশিকা — কার্ডজি",
    vi: "Hướng Dẫn Thiệp Kỹ Thuật Số Lễ Hội Giáng Sinh & Năm Mới — Cardzy",
    sw: "Mwongozo wa Kadi za Kidijitali za Sikukuu za Krismasi na Mwaka Mpya — Cardzy"
  },
  9: {
    es: "Tarjetas de Cumpleaños Animadas e Invitaciones de Fiesta — Cardzy",
    fr: "Cartes d'Anniversaire Animées et Invitations de Fête — Cardzy",
    ar: "بطاقات أعياد الميلاد المتحركة ودعوات الحفلات — كاردزي",
    hi: "एनिमेटेड जन्मदिन कार्ड और पार्टी आमंत्रण — कार्डज़ी",
    zh: "动态生日祝福卡与派对邀请函网站 — Cardzy",
    pt: "Cartões de Aniversário Animados e Convites para Festas — Cardzy",
    ru: "Анимированные открытки на день рождения и приглашения — Cardzy",
    de: "Animierte Geburtstagskarten & Party-Einladungen — Cardzy",
    ja: "動く誕生日お祝いカード＆パーティ招待状 — Cardzy",
    ko: "애니메이션 생일 카과 파티 초대장 — Cardzy",
    it: "Biglietti di Compleanno Animati e Inviti per Feste — Cardzy",
    tr: "Hareketli Doğum Günü Kartları ve Parti Davetiyeleri — Cardzy",
    id: "Kartu Ulang Tahun Animasi & Undangan Pesta — Cardzy",
    bn: "অ্যানিমেটেড জন্মদিনের কার্ড এবং পার্টি ইনভিটেশন — কার্ডজি",
    vi: "Thiệp Sinh Nhật Hoạt Hình & Thiệp Mời Dự Tiệc — Cardzy",
    sw: "Kadi za Siku ya Kuzaliwa za Uhuishaji na Mialiko ya Sherehe — Cardzy"
  },
  10: {
    es: "Tarjetas de Visita Digitales Inteligentes Guardado .VCF en 1 Clic — Cardzy",
    fr: "Cartes de Visite Numériques Intelligentes Enregistrement .VCF 1 Clic — Cardzy",
    ar: "بطاقات الأعمال الرقمية الذكية حفظ VCF بنقرة واحدة — كاردزي",
    hi: "स्मार्ट डिजिटल बिजनेस कार्ड 1-क्लिक VCF सेव — कार्डज़ी",
    zh: "智能数字名片一键保存 .VCF 联系人 — Cardzy",
    pt: "Cartões de Visita Digitais Inteligentes Guardado .VCF em 1 Clique — Cardzy",
    ru: "Умные цифровые визитки с сохранением VCF в 1 клик — Cardzy",
    de: "NFC Visitenkarten mit 1-Klick VCF Speicherung — Cardzy",
    ja: "ワンクリック.VCF保存機能付きスマートデジタル名刺 — Cardzy",
    ko: "1클릭 .VCF 연락처 저장 스마트 디지털 명함 — Cardzy",
    it: "Biglietti da Visita Digitali Smart Salvataggio .VCF 1 Clic — Cardzy",
    tr: "1-Tıkla VCF Kaydetmeli Akıllı Dijital Kartvizitler — Cardzy",
    id: "Kartu Nama Digital Cerdas Simpan .VCF 1-Klik — Cardzy",
    bn: "১-ক্লিক VCF সেভ স্মার্ট ডিজিটাল বিজনেস কার্ড — কার্ডজি",
    vi: "Danh Thiếp Kỹ Thuật Số Thông Minh Lưu .VCF 1-Click — Cardzy",
    sw: "Kadi za Biashara za Kidijitali zenye Hifadhi ya VCF ya Mbofyo 1 — Cardzy"
  }
};

const META_DESCS = {
  1: {
    es: "Descubra más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con versículos del Corán.",
    fr: "Exemples de formules pour invitations de mariage islamiques et pakistanaises en ourdou et anglais. Versets du Coran et étiquette.",
    ar: "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع آيات قرآنية وتأكيد الحضور عبر كاردزي.",
    hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बेहतरीन उर्दू और अंग्रेजी संदेश और कुरान की आयतें पढ़ें।",
    zh: "探索50+双语婚礼请柬文案范例（乌尔都语与英语），包含 Nikkah、Mehndi、Walima 喜宴及古兰经祝福语。",
    pt: "Exemplos de textos para convites de casamento em urdu e inglês para Nikkah, Mehndi e Walima com versículos sagrados.",
    ru: "Примеры текстов свадебных приглашений на урду и английском для Никаха, Мехнди и Валима. Коранические стихи и этикет.",
    de: "Entdecken Sie Formulierungsbeispiele für Nikkah-, Mehndi- und Walima-Einladungskarten auf Urdu und Englisch.",
    ja: "Nikkah、Mehndi、Walima用のウルドゥー語＆英語の結婚式招待状文例集。コーランの聖句とマナーを解説。",
    ko: "니카, 멘디, 발리마 초대장을 위한 우르두어 및 영어 문구 예시와 코란 구절 안내.",
    it: "Esempi di frasi per inviti di matrimonio in urdu e inglese per cerimonie Nikkah, Mehndi e Walima con versi del Corano.",
    tr: "Nikah, Kına ve Düğün davetiyeleri için Urduca ve İngilizce davet yazısı örnekleri ve Ayet-i Kerimeler.",
    id: "Kumpulan contoh teks undangan Akad Nikah, Mehndi, dan Walima dalam Bahasa Urdu & Inggris beserta ayat Al-Qur'an.",
    bn: "নিকাহ, মেহেদি ও ওয়ালিমা নিমন্ত্রণপত্রের জন্য সেরা উর্দু ও ইংরেজি বাক্য, কুরআনের আয়াত এবং নিমন্ত্রণ সামাজিক রীতি।",
    vi: "Khám phá các mẫu lời mời đám cưới Hồi giáo bằng tiếng Urdu và tiếng Anh cho lễ Nikkah, Mehndi và tiệc Walima.",
    sw: "Mifano ya maneno ya kadi za harusi za Nikkah na Walima kwa Kiingereza na Urdu ikiwa na aya za Qur'ani Tukufu."
  },
  2: {
    es: "Comparativa detallada entre invitaciones de boda digitales y en papel: costes de impresión, envíos, gestión RSVP y cero residuos.",
    fr: "Comparatif détaillé entre faire-part numériques et papier : coûts d'impression, frais d'envoi, gestion RSVP et zéro déchet.",
    ar: "مقارنة تفصيلية بين دعوات الزفاف الرقمية والورقية تغطي تكاليف الطباعة والتوصيل وتأكيد الحضور وسرعة التوزيع.",
    hi: "डिजिटल और पारंपरिक पेपर शादी कार्ड की छपाई लागत, कूरियर खर्च और आरएसवीपी दक्षता का विस्तृत विश्लेषण।",
    zh: "全面对比数字电子婚礼请柬与传统纸质请柬的印刷成本、邮寄费用、RSVP 回执效率与零浪费环保优势。",
    pt: "Comparação detalhada entre convites de casamento digitais e em papel: custos de impressão, envios e gestão RSVP.",
    ru: "Подробный разбор расходов на печать, почтовые услуги, скорость RSVP и экологичность цифровых приглашений.",
    de: "Detaillierter Vergleich digitaler und gedruckter Hochzeitseinladungen bezüglich Druckkosten, Versand und RSVP-Effizienz.",
    ja: "結婚式招待状の印刷費用、郵送コスト、RSVP回収率、ペーパーレスのメリットを徹底比較。",
    ko: "청첩장 인쇄 비용, 우편 발송비, RSVP 회신율 및 친환경 이점을 비교 분석한 완벽 가이드.",
    it: "Confronto dettagliato tra inviti di nozze digitali e cartacei: costi di stampa, spese di spedizione e gestione RSVP.",
    tr: "Baskı maliyetleri, kargo ücretleri, LCV geri dönüş hızı ve çevre dostu dijital davetiyelerin karşılaştırması.",
    id: "Perbandingan detail undangan pernikahan digital vs kertas mencakup biaya cetak, pengiriman, dan efisiensi RSVP.",
    bn: "ডিজিটাল ও কাগজের নিমন্ত্রণপত্রের প্রিন্টিং খরচ, কুরিয়ার চার্জ এবং আরএসভিপি কার্যকারিতার বিস্তারিত তুলনা।",
    vi: "So sánh chi tiết thiệp mời đám cưới kỹ thuật số và thiệp giấy về chi phí in ấn, phí chuyển phát và hiệu quả RSVP.",
    sw: "Linganisho la kina la kadi za harusi za kidijitali na za karatasi linalohusu gharama za upigaji chapa na usafirishaji."
  },
  3: {
    es: "Diseñe tarjetas animadas 3D de Eid Mubarak con fotos familiares, nombres personalizados y bendiciones. Comparta al instante por WhatsApp.",
    fr: "Concevez des cartes d'Aïd Mubarak animées en 3D avec photos de famille, noms et bénédictions. Partagez instantanément sur WhatsApp.",
    ar: "صمم بطاقات تهنئة عيد مبارك 3D متحركة مع صور العائلة والأسماء والآيات القرآنية وشاركها فوراً عبر واتساب.",
    hi: "फैमिली फोटो, नाम और दुआओं के साथ कस्टम 3D एनिमेटेड ईद मुबारक विश कार्ड बनाएं और व्हाट्सएप पर शेयर करें।",
    zh: "设计制作融入全家福照片、个性化姓名及古兰经祝福的 3D 动态开斋节贺卡，支持 WhatsApp 一键分享。",
    pt: "Crie cartões animados 3D de Eid Mubarak com fotos de família, nomes e bênçãos. Compartilhe instantaneamente no WhatsApp.",
    ru: "Создавайте анимированные 3D-открытки Эйд Мубарак с семейными фото, именами и благословениями для отправки в WhatsApp.",
    de: "Gestalten Sie 3D-animierte Eid Mubarak Karten mit Familienfotos, Namen und Segen zum sofortigen Teilen auf WhatsApp.",
    ja: "家族写真、名前、コーランの祝福を載せた3DアニメーションEid Mubarakカードを作成し、WhatsAppで即座に共有。",
    ko: "가족 사진, 이름, 기도 문구가 담긴 맞춤형 3D 애니메이션 이드 카드를 제작하여 WhatsApp으로 즉시 공유하세요.",
    it: "Progetta biglietti animati 3D per Eid Mubarak con foto di famiglia, nomi e benedizioni. Condividi all'istante su WhatsApp.",
    tr: "Aile fotoğraflı, isimli ve dualı 3D hareketli Bayram tebrik kartları tasarlayın ve WhatsApp'tan anında paylaşın.",
    id: "Rancang kartu ucapan Idul Fitri 3D animasi dengan foto keluarga, nama, dan doa Islami. Bagikan langsung via WhatsApp.",
    bn: "পরিবারের ছবি, নাম এবং কুরআনিক দোয়া সহ ৩ডি অ্যানিমেটেড ঈদ কার্ড তৈরি করুন এবং হোয়াটসঅ্যাপে শেয়ার করুন।",
    vi: "Thiết kế thiệp Eid Mubarak hoạt hình 3D với ảnh gia đình, tên cá nhân và câu chúc ý nghĩa. Chia sẻ ngay qua WhatsApp.",
    sw: "Unda kadi za Eid Mubarak za 3D zenye picha za familia, majina na baraka. Shiriki mara moja kupitia WhatsApp."
  },
  4: {
    es: "Descubra cómo las tarjetas de visita digitales NFC y vCards QR ayudan a guardar contactos al instante en la agenda telefónica con alta conversión.",
    fr: "Découvrez comment les cartes de visite numériques NFC et vCards QR permettent d'enregistrer instantanément les contacts dans l'annuaire.",
    ar: "اكتشف كيف تساعد بطاقات الأعمال الرقمية NFC ورمز QR في حفظ جهات الاتصال فوراً في أجهزة الجوال مع زيادة معدل التواصل المهني.",
    hi: "जानिए कैसे NFC डिजिटल बिजनेस कार्ड और QR कोड vCards एक क्लिक में कांटेक्ट सीधे फोनबुक में सेव करने में मदद करते हैं।",
    zh: "了解 NFC 智能数字名片与二维码 vCard 如何帮助商务人士快速保存联系人至手机通讯录并提升社交转化率。",
    pt: "Descubra como os cartões digitais NFC e vCards QR ajudam a salvar contactos instantaneamente no telemóvel.",
    ru: "Узнайте, как цифровые визитки NFC и QR-коды vCard помогают мгновенно сохранять контакты в телефонную книгу.",
    de: "Erfahren Sie, wie digitale NFC-Visitenkarten und QR-vCards Kontaktdaten sofort im Smartphone speichern.",
    ja: "NFCデジタル名刺とQRコードvCardで、連絡先をスマホの電話帳に即座に保存・ネットワーク率を向上。",
    ko: "NFC 디지털 명함과 QR 코드 vCard가 연락처를 스마트폰에 즉시 저장하고 네트워킹 효율을 높이는 법을 알아보세요.",
    it: "Scopri come i biglietti da visita digitali NFC e vCard QR aiutano a salvare i contatti all'istante in rubrica.",
    tr: "NFC dijital kartvizitlerin ve QR kodlu vCard'ların kişileri telefon rehberine anında kaydetmeyi nasıl sağladığını keşfedin.",
    id: "Pelajari bagaimana kartu nama digital NFC dan vCard QR membantu menyimpan kontak secara instan ke buku telepon.",
    bn: "জানুন কীভাবে এনএফসি ডিজিটাল বিজনেস کارڈ এবং কিউআর কোড ভিকার্ড এক ক্লিকে ফোনে কনট্যাক্ট সেভ করতে সাহায্য করে।",
    vi: "Khám phá cách danh thiếp NFC và vCard QR giúp lưu danh bạ ngay lập tức vào điện thoại với hiệu quả kết nối cao.",
    sw: "Gundua jinsi kadi za biashara za NFC na vCard za QR zinavyosaidia kuhifadhi anwani papo hapo kwenye simu."
  },
  5: {
    es: "Aprenda a gestionar listas de invitados de boda, recopilar preferencias de menú, enviar ubicaciones y realizar el seguimiento de RSVP en vivo.",
    fr: "Apprenez à gérer les listes d'invités, recueillir les préférences de repas, envoyer les adresses et suivre les RSVP WhatsApp en direct.",
    ar: "تعلم كيفية إدارة قوائم ضيوف الزفاف، وجمع تفضيلات الطعام، وإرسال موقع القاعة، وتتبع الحضور المباشر عبر كاردزي.",
    hi: "शादी की मेहमान सूची प्रबंधित करना, भोजन प्राथमिकताएं एकत्र करना, स्थान भेजना और व्हाट्सएप पर लाइव आरएसवीपी ट्रैक करना सीखें।",
    zh: "学习如何轻松整理婚礼嘉宾名单、收集用餐偏好、发送 GPS 导航地址并跟踪 WhatsApp 实时 RSVP 确认。",
    pt: "Aprenda a gerir listas de convidados, recolher preferências de refeição, enviar localizações e rastrear RSVPs do WhatsApp ao vivo.",
    ru: "Узнайте, как управлять списками гостей, собирать предпочтения по меню, отправлять геометки и отслеживать ответы в WhatsApp.",
    de: "Lernen Sie, wie Sie Hochzeitsgästelisten verwalten, Menüwünsche sammeln, Anfahrtslinks senden und WhatsApp RSVPs live verfolgen.",
    ja: "ゲストリストの管理、食事の好みの収集、会場マップの送信、WhatsApp RSVPのライブ追跡方法を解説。",
    ko: "하객 리스트 관리, 식사 취향 수집, 위치 지도 전송 및 실시간 WhatsApp RSVP 추적 방법을 알아보세요.",
    it: "Impara a gestire le liste degli ospiti, raccogliere le preferenze per il menu, inviare posizioni e tracciare i RSVP su WhatsApp.",
    tr: "Düğün davetli listesini yönetmeyi, yemek tercihlerini toplamayı, konum paylaşmayı ve canlı LCV takibini öğrenin.",
    id: "Pelajari cara mengelola daftar tamu pernikahan, mengumpulkan preferensi makanan, mengirim lokasi, dan melacak RSVP WhatsApp.",
    bn: "বিয়ের অতিথির তালিকা তৈরি, খাবারের পছন্দ সংগ্রহ, ভেন্যুর গুগল ম্যাপ পাঠাতে এবং লাইভ হোয়াটসঅ্যাপ আরএসভিপি ট্র্যাক করতে শিখুন।",
    vi: "Học cách quản lý danh sách khách mời, thu thập sở thích ăn uống, gửi vị trí và theo dõi RSVP WhatsApp trực tiếp.",
    sw: "Jifunze jinsi ya kusimamia orodha ya wageni wa harusi, kukusanya mapendeleo ya chakula, na kufuatilia majibu ya WhatsApp."
  },
  6: {
    es: "Aprenda a crear webs de invitación digital en Cardzy con plantillas 3D interactivas, Google Maps integrado, música y seguimiento de RSVP por WhatsApp.",
    fr: "Apprenez à créer des sites d'invitation numérique sur Cardzy avec modèles 3D interactifs, Google Maps intégré et suivi RSVP WhatsApp.",
    ar: "تعلم كيفية بناء موقع دعوة رقمي عبر كاردزي بقوالب 3D تفاعلية وموقع الخريطة وتتبع الحضور المباشر عبر واتساب.",
    hi: "कार्डज़ी पर 3D टेम्प्लेट, गूगल मैप्स, म्यूजिक और व्हाट्सएप आरएसवीपी ट्रैकिंग के साथ डिजिटल निमंत्रण वेबसाइट बनाना सीखें।",
    zh: "学习如何在 Cardzy 上利用 3D 沉浸式模板、内置 Google 地图定位、背景音乐及 WhatsApp 实时 RSVP 功能创建电子请柬网站。",
    pt: "Aprenda a criar sites de convite digital no Cardzy com modelos 3D interativos, Google Maps integrado e rastreamento RSVP no WhatsApp.",
    ru: "Узнайте, как создавать сайты цифровых приглашений на Cardzy с интерактивными 3D-шаблонами, картами Google и RSVP в WhatsApp.",
    de: "Erstellen Sie digitale Einladungs-Websites auf Cardzy mit interaktiven 3D-Vorlagen, Google Maps, Musik und WhatsApp RSVP.",
    ja: "Cardzyで3Dテンプレート、Googleマップ、音楽、WhatsApp RSVPライブ追跡を備えたデジタル招待状サイトの作成方法を解説。",
    ko: "Cardzy에서 3D 템플릿, Google 지도, 배경 음악, 실시간 WhatsApp RSVP 추적이 포함된 디지털 초대장 웹사이트 구축 방법을 알아보세요.",
    it: "Impara a creare siti di invito digitale su Cardzy con modelli 3D interattivi, Google Maps integrato, musica e tracciamento RSVP su WhatsApp.",
    tr: "Cardzy'de etkileşimli 3D şablonlar, Google Haritalar, müzik ve canlı WhatsApp LCV takibi ile dijital davetiye siteleri oluşturmayı öğrenin.",
    id: "Pelajari cara membuat situs undangan digital di Cardzy dengan templat 3D interaktif, Google Maps, musik, dan pelacakan RSVP WhatsApp.",
    bn: "কার্ডজিতে ৩ডি টেমপ্লেট, গুগল ম্যাপস, মিউজিক এবং হোয়াটসঅ্যাপ আরএসভিপি ট্র্যাকিং সহ ডিজিটাল ইনভিটেশন ওয়েবসাইট তৈরি করতে শিখুন।",
    vi: "Học cách tạo website thiệp mời kỹ thuật số trên Cardzy với mẫu 3D tương tác, Google Maps, âm nhạc và theo dõi RSVP WhatsApp.",
    sw: "Jifunze jinsi ya kuunda tovuti za mialiko ya kidijitali kwenye Cardzy ukitumia vigezo vya 3D, Google Maps na RSVP ya WhatsApp."
  },
  7: {
    es: "Cree tarjetas de felicitación animadas 3D con fotos personales, nombres, música de fondo y enlace compartible por WhatsApp.",
    fr: "Créez des cartes de vœux animées en 3D avec photos personnelles, prénoms, musique de fond et partage instantané sur WhatsApp.",
    ar: "أنشئ بطاقات تهنئة 3D متحركة بصورك الشخصية وأسماء المستلمين وموسيقى خلفية مع إمكانية المشاركة الفورية عبر واتساب.",
    hi: "व्यक्तिगत फोटो, नाम, पृष्ठभूमि संगीत और व्हाट्सएप शेयरिंग के साथ कस्टम 3D एनिमेटेड विश कार्ड बनाएं।",
    zh: "在 Cardzy 上嵌入个人照片、专属姓名、背景音乐，一键生成 3D 沉浸式动态祝福卡片并通过 WhatsApp 即時分享。",
    pt: "Crie cartões de cumprimentos animados em 3D com fotos pessoais, nomes, áudio de fundo e partilha instantânea no WhatsApp.",
    ru: "Создавайте анимированные 3D-открытки с личными фото, именами, фоновой музыкой и мгновенной отправкой в WhatsApp.",
    de: "Erstellen Sie 3D-animierte Glückwunschkarten mit persönlichen Fotos, Namen, Hintergrundmusik und sofortigem Teilen auf WhatsApp.",
    ja: "個人写真、受信者の名前、背景音声を組み込んだカスタム3Dアニメーションお祝いカードを作成し、WhatsAppで即座に共有。",
    ko: "개인 사진, 수신자 이름, 배경 음악이 들어간 맞춤형 3D 애니메이션 축하 카드를 제작하고 WhatsApp으로 즉시 공유하세요.",
    it: "Crea biglietti di auguri animati 3D con foto personali, nomi dei destinatari, audio di sottofondo e condivisione istantanea su WhatsApp.",
    tr: "Kişisel fotoğraflar, isimler, arka plan müzikleri ve WhatsApp'tan anında paylaşılabilir bağlantılarla 3D hareketli kartlar oluşturun.",
    id: "Buat kartu ucapan 3D animasi kustom dengan foto pribadi, nama penerima, musik latar, dan berbagi tautan instan via WhatsApp.",
    bn: "ব্যক্তিগত ছবি, প্রাপকের নাম, ব্যাকগ্রাউন্ড মিউজিক এবং হোয়াটসঅ্যাপে তাৎক্ষণিক শেয়ারিং সহ কাস্টম ৩ডি অ্যানিমেটেড গ্রিটিং কার্ড তৈরি করুন।",
    vi: "Tạo thiệp chúc mừng hoạt hình 3D tùy chỉnh với ảnh cá nhân, tên người nhận, nhạc nền và chia sẻ liên kết tức thì qua WhatsApp.",
    sw: "Unda kadi za salamu za 3D za uhuishaji zenye picha binafsi, majina, sauti ya usuli, na kushiriki viungo kupitia WhatsApp."
  },
  8: {
    es: "Explore tarjetas digitales animadas 3D de lujo para Navidad, Acción de Gracias, Año Nuevo 2026 y festividades globales con personalización de foto.",
    fr: "Découvrez des cartes virtuelles animées 3D de luxe pour Noël, le Nouvel An 2026 et les fêtes mondiales avec personnalisation photo.",
    ar: "استكشف بطاقات التهنئة الرقمية 3D الفاخرة للكريسماس والسنة الجديدة 2026 والمناسبات العالمية مع تخصيص الصور عبر كاردزي.",
    hi: "कार्डज़ी पर फोटो अनुकूलन के साथ क्रिसमस, थैंक्सगिविंग, नए साल 2026 और दिवाली के लिए लक्जरी 3D एनिमेटेड ई-कार्ड देखें।",
    zh: "在 Cardzy 上探索涵盖圣诞节、感恩节、2026跨年新年、排灯节及农历春节的豪华 3D 动画电子贺卡并轻松嵌入照片。",
    pt: "Explore cartões digitais animados 3D de luxo para o Natal, Ação de Graças, Ano Novo de 2026 e feriados globais no Cardzy.",
    ru: "Откройте для себя роскошные 3D анимированные e-cards на Рождество, Новый год 2026 и праздники с персональными фото.",
    de: "Entdecken Sie luxuriöse 3D-animierte E-Karten für Weihnachten, Thanksgiving, Neujahr 2026 und Feiertage auf Cardzy.",
    ja: "クリスマス、サンクスギビング、2026年新春、ディワリ向けに写真カスタマイズができる豪華な3DアニメーションEカードを体験。",
    ko: "Cardzy에서 사진 맞춤 설정이 가능한 크리스마스, 추수감사절, 2026년 새해, 디왈리용 럭셔리 3D 애니메이션 E-카드를 만나보세요.",
    it: "Esplora biglietti digitali animati 3D di lusso per Natale, Ringraziamento, Capodanno 2026 e festività globali con foto su Cardzy.",
    tr: "Cardzy'de Noel, Şükran Günü, 2026 Yılbaşı ve tüm bayramlar için fotoğraf kişiselleştirmeli lüks 3D hareketli e-kartları keşfedin.",
    id: "Jelajahi e-card 3D animasi mewah untuk Natal, Thanksgiving, Tahun Baru 2026, dan liburan global dengan kustomisasi foto di Cardzy.",
    bn: "কার্ডজিতে ফটো কাস্টমাইজেশন সহ ক্রিসমাস, থ্যাঙ্কসগিভিং, নতুন বছর ২০২৬ এবং দেওয়ালির জন্য লক্সারি ৩ডি অ্যানিমেটেড ই-কার্ড উপভোগ করুন।",
    vi: "Khám phá các thiệp e-card 3D hoạt hình cao cấp cho Giáng sinh, Lễ Tạ ơn, Năm mới 2026 và các ngày lễ toàn cầu trên Cardzy.",
    sw: "Gundua kadi za kielektroniki za uhuishaji za 3D za Krismasi, Thanksgiving, Mwaka Mpya 2026 na sikukuu ukitumia Cardzy."
  },
  9: {
    es: "Cree tarjetas de cumpleaños animadas e invitaciones de fiesta con fotos personalizadas, música festiva y confirmaciones por WhatsApp en Cardzy.",
    fr: "Créez des cartes d'anniversaire animées et des invitations de fête avec photos, musique et suivi RSVP WhatsApp sur Cardzy.",
    ar: "أنشئ بطاقات أعياد ميلاد متحركة ودعوات حفلات مع صور مخصصة وموسيقى احتفالية وتأكيد الحضور عبر واتساب على كاردزي.",
    hi: "कार्डज़ी पर कस्टमाइज़्ड फ़ोटो, जश्न के संगीत और व्हाट्सएप आरएसवीपी के साथ एनिमेटेड जन्मदिन कार्ड और पार्टी आमंत्रण बनाएं।",
    zh: "在 Cardzy 上嵌入专属照片、选配欢快音乐并启用 WhatsApp RSVP 功能，建构全套沉浸式动态生日贺卡与派对邀请函。",
    pt: "Crie cartões de aniversário animados e convites para festas com fotos personalizadas, música e RSVPs do WhatsApp no Cardzy.",
    ru: "Создавайте анимированные открытки на день рождения и приглашения на вечеринки с фото, музыкой и WhatsApp RSVP на Cardzy.",
    de: "Erstellen Sie animierte Geburtstagskarten und Party-Einladungen mit Fotos, Musik und WhatsApp RSVP auf Cardzy.",
    ja: "Cardzyでカスタム写真、お祝いの音楽、WhatsApp RSVPを備えた動く誕生日お祝いカード＆パーティ招待状を作成。",
    ko: "Cardzy에서 맞춤형 사진, 축하 음악, WhatsApp RSVP가 포함된 애니메이션 생일 카드와 파티 초대장을 만드세요.",
    it: "Crea biglietti di compleanno animati e inviti per feste con foto personalizzate, musica e RSVP su WhatsApp su Cardzy.",
    tr: "Cardzy'de özel fotoğraflar, kutlama müzikleri ve WhatsApp LCV ile hareketli doğum günü kartları ve parti davetiyeleri hazırlayın.",
    id: "Buat kartu ucapan ulang tahun animasi dan undangan pesta dengan foto kustom, musik perayaan, dan RSVP WhatsApp di Cardzy.",
    bn: "কার্ডজিতে কাস্টম ছবি, আনন্দদায়ক গান এবং হোয়াটসঅ্যাপ আরএসভিপি সহ অ্যানিমেটেড জন্মদিনের কার্ড এবং পার্টি ইনভিটেশন তৈরি করুন।",
    vi: "Tạo thiệp chúc mừng sinh nhật hoạt hình và thiệp mời dự tiệc với ảnh tùy chỉnh, nhạc ăn mừng và RSVP WhatsApp trên Cardzy.",
    sw: "Unda kadi za siku ya kuzaliwa za uhuishaji na mialiko ya sherehe zenye picha, muziki na RSVP ya WhatsApp kwenye Cardzy."
  },
  10: {
    es: "Descubra cómo las tarjetas de visita digitales inteligentes de Cardzy con guardado .VCF en 1 clic ayudan a aumentar la tasa de conversión en networking.",
    fr: "Découvrez comment les cartes de visite numériques intelligentes Cardzy avec enregistrement .VCF en 1 clic augmentent l'efficacité du réseau.",
    ar: "اكتشف كيف تساعد بطاقات الأعمال الذكية من كاردزي ذات حفظ VCF بنقرة واحدة في زيادة التفاعل والتواصل المهني.",
    hi: "जानिए कैसे कार्डज़ी के 1-क्लिक .VCF कांटेक्ट सेविंग के साथ स्मार्ट डिजिटल बिजनेस कार्ड नेटवर्किंग रूपांतरण दरों को बढ़ाते हैं।",
    zh: "了解 Cardzy 带有 1 键保存 .VCF 联系人功能的智能数字名片如何协助商务人士大幅提升人脉建立与社交转化率。",
    pt: "Descubra como os cartões de visita digitais inteligentes do Cardzy com gravação .VCF em 1 clique ajudam a aumentar a conversão no networking.",
    ru: "Узнайте, как умные цифровые визитки Cardzy с сохранением контакта .VCF в 1 клик повышают эффективность бизнес-нетворкинга.",
    de: "Erfahren Sie, wie die smarten digitalen Visitenkarten von Cardzy mit 1-Klick VCF-Speicherung die Networking-Erfolgsquote steigern.",
    ja: "Cardzyのワンクリック.VCF保存機能付きスマートデジタル名刺が、ネットワーキングのコンバージョン率を劇的に高める理由を解説。",
    ko: "Cardzy의 1클릭 .VCF 연락처 저장 기능이 있는 스마트 디지털 명함이 네트워킹 전환율을 어떻게 높이는지 알아보세요.",
    it: "Scopri come i biglietti da visita digitali smart di Cardzy con salvataggio contatti .VCF in 1 clic aumentano i tassi di conversione nel networking.",
    tr: "Cardzy'nin 1-Tıkla .VCF kişi kaydetmeli akıllı dijital kartvizitlerinin profesyonel iletişimde dönüşüm oranlarını nasıl artırdığını keşfedin.",
    id: "Pelajari bagaimana kartu nama digital cerdas Cardzy dengan simpan kontak .VCF 1-klik membantu meningkatkan tingkat konversi jaringan.",
    bn: "জানুন কীভাবে ১-ক্লিক .VCF সেভ ফিচার সহ কার্ডজির স্মার্ট ডিজিটাল বিজনেস কার্ড আপনার বিজনেস নেটওয়ার্কিং উন্নত করে।",
    vi: "Khám phá cách danh thiếp kỹ thuật số thông minh của Cardzy với tính năng lưu .VCF 1-click giúp tăng tỷ lệ chuyển đổi kết nối doanh nghiệp.",
    sw: "Gundua jinsi kadi za biashara za kidijitali za Cardzy zenye hifadhi ya anwani ya .VCF ya mbofyo 1 zinavyoongeza ufanisi wa mawasiliano."
  }
};

// Replace seoTitle and metaDescription for all languages across all post files
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const titles = SEO_TITLES[fileIdx];
  const descs = META_DESCS[fileIdx];
  if (!titles || !descs) return;

  let updatedCount = 0;
  Object.keys(titles).forEach(lang => {
    const locTitle = titles[lang];
    const locDesc = descs[lang];

    // Regex match and replace for seoTitle
    const seoTitleRegex = new RegExp(`("${lang}":\\s*\\{[^}]*?"seoTitle":\\s*")[^"]*(")`, 's');
    if (seoTitleRegex.test(text)) {
      text = text.replace(seoTitleRegex, `$1${locTitle}$2`);
    }

    // Regex match and replace for metaDescription
    const metaDescRegex = new RegExp(`("${lang}":\\s*\\{[^}]*?"metaDescription":\\s*")[^"]*(")`, 's');
    if (metaDescRegex.test(text)) {
      text = text.replace(metaDescRegex, `$1${locDesc}$2`);
      updatedCount++;
    }
  });

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Updated post${fileIdx}.ts SEO titles & meta descriptions for ${updatedCount} languages.`);
});
