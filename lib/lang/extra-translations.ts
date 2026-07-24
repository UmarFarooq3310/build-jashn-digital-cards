import type { LangCode } from './context'

export const EXTRA_T: Record<string, Record<LangCode, string>> = {
  numberOfPages: {
    en: 'Number of Pages', ur: 'صفحات کی تعداد', ar: 'عدد الصفحات', es: 'Número de páginas', fr: 'Nombre de pages', hi: 'पृष्ठों की संख्या', zh: '页数', pt: 'Número de páginas', ru: 'Количество страниц', de: 'Anzahl der Seiten', ja: 'ページ数', ko: '페이지 수', it: 'Numero di pagine', tr: 'Sayfa Sayısı', id: 'Jumlah Halaman', bn: 'পৃষ্ঠা সংখ্যা', vi: 'Số trang', sw: 'Idadi ya Kurasa',
  },
  pageCount: {
    en: 'Page Count', ur: 'صفحات کی کل تعداد', ar: 'عدد الصفحات', es: 'Conteo de páginas', fr: 'Nombre de pages', hi: 'पेज गिनती', zh: '页面总数', pt: 'Contagem de páginas', ru: 'Подсчет страниц', de: 'Seitenzahl', ja: 'ページカウント', ko: '페이지 수', it: 'Conteggio pagine', tr: 'Sayfa Sayısı', id: 'Hitungan Halaman', bn: 'পৃষ্ঠা গণনা', vi: 'Đếm trang', sw: 'Hesabu ya Kurasa',
  },
  totalPages: {
    en: 'Total Pages', ur: 'کل صفحات', ar: 'إجمالي الصفحات', es: 'Páginas totales', fr: 'Total des pages', hi: 'कुल पृष्ठ', zh: '总页数', pt: 'Total de páginas', ru: 'Всего страниц', de: 'Gesamtseiten', ja: '全ページ', ko: '전체 페이지', it: 'Pagine totali', tr: 'Toplam Sayfa', id: 'Total Halaman', bn: 'মোট পৃষ্ঠা', vi: 'Tổng số trang', sw: 'Jumla ya Kurasa',
  },
  page: {
    en: 'Page', ur: 'صفحہ', ar: 'صفحة', es: 'Página', fr: 'Page', hi: 'पृष्ठ', zh: '页', pt: 'Página', ru: 'Страница', de: 'Seite', ja: 'ページ', ko: '페이지', it: 'Pagina', tr: 'Sayfa', id: 'Halaman', bn: 'পৃষ্ঠা', vi: 'Trang', sw: 'Ukurasa',
  },
  pages: {
    en: 'Pages', ur: 'صفحات', ar: 'صفحات', es: 'Páginas', fr: 'Pages', hi: 'पृष्ठ', zh: '页', pt: 'Páginas', ru: 'Страницы', de: 'Seiten', ja: 'ページ', ko: '페이지', it: 'Pagine', tr: 'Sayfalar', id: 'Halaman', bn: 'পৃষ্ঠা', vi: 'Trang', sw: 'Kurasa',
  },

  // ── Digital Visiting Card Studio Translations ──
  createInteractiveVisitingCardTitle: {
    en: 'Create Your Interactive Digital Business Card',
    ur: 'اپنی انٹرایکٹو ڈیجیٹل بزنس کارڈ بنائیں',
    ar: 'أنشئ بطاقة أعمالك الرقمية التفاعلية',
    es: 'Crea tu Tarjeta de Presentación Digital Interactiva',
    fr: 'Créez votre carte de visite numérique interactive',
    hi: 'अपना इंटरेक्टिव डिजिटल बिजनेस कार्ड बनाएं',
    zh: '创建您的互动数字名片',
    pt: 'Crie seu Cartão de Visitas Digital Interativo',
    ru: 'Создайте свою интерактивную цифровую визитную карточку',
    de: 'Erstellen Sie Ihre interaktive digitale Visitenkarte',
    ja: 'インタラクティブなデジタル名片を作成する',
    ko: '대화형 디지털 명함을 만드세요',
    it: 'Crea il tuo biglietto da visita digitale interattivo',
    tr: 'Etkileşimli Dijital Kartvizitinizi Oluşturun',
    id: 'Buat Kart Nama Digital Interaktif Anda',
    bn: 'আপনার ইন্টারঅ্যাক্টিভ ডিজিটাল বিজনেস কার্ড তৈরি করুন',
    vi: 'Tạo Danh Thiếp Kỹ Thuật Số Tương Tác Của Bạn',
    sw: 'Unda Kadi Yako ya Biashara ya Kidijitali ya Interaktif',
  },
  createInteractiveVisitingCardSubtitle: {
    en: 'Share your digital business card on WhatsApp, Email, or Social Media. Includes 1-click Save Contact (.vcf), Google Maps directions, and 18 language support!',
    ur: 'واٹس ایپ اور ای میل پر اپنا لائیو ڈیجیٹل کارڈ شیئر کریں۔ 1-کلک میں نمبر سیو کرنے کی سہولت اور 18 زبانوں کی سپورٹ!',
    ar: 'شارك بطاقتك الرقمية عبر واتساب، البريد، أو وسائل التواصل. تتضمن حفظ جهة الاتصال بضغطة واحدة (.vcf)، اتجاهات خرائط جوجل، ودعم 18 لغة!',
    es: '¡Comparte tu tarjeta digital en WhatsApp, correo o redes sociales. Incluye Guardar Contacto en 1-clic (.vcf), ubicaciones de Google Maps y soporte en 18 idiomas!',
    fr: 'Partagez votre carte numérique sur WhatsApp, e-mail ou réseaux sociaux. Comprend la sauvegarde de contact en 1 clic (.vcf), cartes Google Maps et support de 18 langues !',
    hi: 'व्हाट्सएप, ईमेल या सोशल मीडिया पर अपना डिजिटल कार्ड साझा करें। 1-क्लिक सेव कॉन्टैक्ट (.vcf), गूगल मैप्स निर्देश और 18 भाषाओं का समर्थन शामिल है!',
    zh: '在 WhatsApp、电子邮件或社交媒体上分享您的数字名片。包含一键保存联系人 (.vcf)、Google 地图导航和 18 种语言支持！',
    pt: 'Compartilhe seu cartão digital no WhatsApp, e-mail ou redes sociais. Inclui salvar contato em 1 clique (.vcf), direções do Google Maps e suporte para 18 idiomas!',
    ru: 'Поделитесь своей цифровой визиткой в WhatsApp, Email или соцсетях. Сохранение контакта в 1 клик (.vcf), навигация Google Maps и поддержка 18 языков!',
    de: 'Teilen Sie Ihre digitale Visitenkarte auf WhatsApp, E-Mail oder Social Media. Inklusive 1-Klick-Kontaktspeicherung (.vcf), Google Maps und 18 Sprachen!',
    ja: 'WhatsApp、メール、SNSで名刺を共有。1クリックで連絡先保存（.vcf）、Googleマップ案内、18言語対応！',
    ko: 'WhatsApp, 이메일 또는 소셜 미디어로 명함을 공유하세요. 1클릭 연락처 저장(.vcf), Google 지도 및 18개 언어 지원 포함!',
    it: 'Condividi il tuo biglietto digitale su WhatsApp, Email o Social Media. Include Salvataggio Contatto in 1-click (.vcf), Google Maps e supporto a 18 lingue!',
    tr: 'Dijital kartvizitinizi WhatsApp, E-posta veya Sosyal Medyada paylaşın. Tek tıkla kişi kaydetme (.vcf), Google Haritalar tarifi ve 18 dil desteği dahildir!',
    id: 'Bagikan kart digital Anda di WhatsApp, Email, atau Media Sosial. Termasuk Simpan Kontak 1-klik (.vcf), Google Maps, dan dukungan 18 bahasa!',
    bn: 'হোয়াটসঅ্যাপ, ইমেল বা সোশ্যাল মিডিয়ায় আপনার ডিজিটাল কার্ড শেয়ার করুন। ১-ক্লিকে পরিচিতি সংরক্ষণ (.vcf), গুগল ম্যাপস দিকনির্দেশনা এবং ১৮টি ভাষার সহায়তা রয়েছে!',
    vi: 'Chia sẻ danh thiếp kỹ thuật số trên WhatsApp, Email hoặc Mạng xã hội. Bao gồm Lưu danh bạ 1-nhấp (.vcf), Google Maps và hỗ trợ 18 ngôn ngữ!',
    sw: 'Shiriki kadi yako ya kidijitali kwenye WhatsApp, Barua pepe au Mitandao ya Jamii. Inajumuisha Hifadhi Anwani kwa Mbofyo 1 (.vcf), Ramani za Google na usaidizi wa lugha 18!',
  },
  selectCategorySection: {
    en: '1. Select Industry / Profession Category',
    ur: '1. اپنی صنعت یا پیشہ ورانہ زمرہ منتخب کریں',
    ar: '1. اختر فئة الصناعة / المهنة',
    es: '1. Selecciona la Categoría de Industria / Profesión',
    fr: '1. Sélectionnez la catégorie d\'industrie / profession',
    hi: '1. उद्योग / व्यवसाय श्रेणी चुनें',
    zh: '1. 选择行业/职业分类',
    pt: '1. Selecione a Categoria de Indústria / Profissão',
    ru: '1. Выберите категорию отрасли / профессии',
    de: '1. Wählen Sie die Branche / Berufskategorie',
    ja: '1. 業界・職業カテゴリを選択',
    ko: '1. 업종/직종 카테고리 선택',
    it: '1. Seleziona Categoria Settore / Professione',
    tr: '1. Sektör / Meslek Kategorisi Seçin',
    id: '1. Pilih Kategori Industri / Profesi',
    bn: '১. শিল্প / পেশা বিভাগ নির্বাচন করুন',
    vi: '1. Chọn Danh Mục Ngành / Nghề Nghiệp',
    sw: '1. Chagua Kitengo cha Sekta / Taaluma',
  },
  selectThemeSection: {
    en: '2. Select Card Style & Colors',
    ur: '2. کارڈ کا اسٹائل اور رنگ منتخب کریں',
    ar: '2. اختر نمط وألوان البطاقة',
    es: '2. Selecciona el Estilo y Colores de la Tarjeta',
    fr: '2. Sélectionnez le style et les couleurs de la carte',
    hi: '2. कार्ड शैली और रंग चुनें',
    zh: '2. 选择名片样式与配色',
    pt: '2. Selecione o Estilo e Cores do Cartão',
    ru: '2. Выберите стиль и цвета карточки',
    de: '2. Wählen Sie Stil & Farben der Karte',
    ja: '2. カードスタイルとカラーを選択',
    ko: '2. 카드 스타일 및 색상 선택',
    it: '2. Seleziona Stile e Colori del Biglietto',
    tr: '2. Kart Stili ve Renklerini Seçin',
    id: '2. Pilih Gaya & Warna Kartu',
    bn: '২. কার্ড স্টাইল ও রঙ নির্বাচন করুন',
    vi: '2. Chọn Phong Cách & Màu Sắc Danh Thiếp',
    sw: '2. Chagua Mtindo na Rangi za Kadi',
  },
  contactDetailsSection: {
    en: '3. Contact & Business Details',
    ur: '3. رابطہ اور کاروباری تفصیلات درج کریں',
    ar: '3. تفاصيل الاتصال والعمل',
    es: '3. Detalles de Contacto y Empresa',
    fr: '3. Coordonnées & détails professionnels',
    hi: '3. संपर्क और व्यावसायिक विवरण',
    zh: '3. 联系方式与业务详情',
    pt: '3. Detalhes de Contato e Empresa',
    ru: '3. Контактные и деловые данные',
    de: '3. Kontakt- & Geschäftsdaten',
    ja: '3. 連絡先・ビジネス詳細',
    ko: '3. 연락처 및 비즈니스 상세정보',
    it: '3. Dettagli di Contatto e Aziendali',
    tr: '3. İletişim ve İş Detayları',
    id: '3. Detail Kontak & Bisnis',
    bn: '৩. পরিচিতি ও ব্যবসা সংক্রান্ত বিবরণ',
    vi: '3. Chi Tiết Liên Hệ & Kinh Doanh',
    sw: '3. Maelezo ya Mawasiliano na Biashara',
  },
  fullNameLabel: {
    en: 'Full Name *', ur: 'مکمل نام *', ar: 'الاسم الكامل *', es: 'Nombre Completo *', fr: 'Nom complet *', hi: 'पूरा नाम *', zh: '姓名 *', pt: 'Nome Completo *', ru: 'Полное имя *', de: 'Vollständiger Name *', ja: '氏名 *', ko: '성함 *', it: 'Nome Completo *', tr: 'Ad Soyad *', id: 'Nama Lengkap *', bn: 'সম্পূর্ণ নাম *', vi: 'Họ Và Tên *', sw: 'Jina Kamili *',
  },
  fullNamePlaceholder: {
    en: 'e.g. Dr. Zaryab Malik', ur: 'مثلاً: ڈاکٹر زریاب ملک', ar: 'مثال: د. زرياب مالك', es: 'ej. Dr. Zaryab Malik', fr: 'ex. Dr. Zaryab Malik', hi: 'उदा. डॉ. जरियाब मलिक', zh: '例如：扎里亚布·马利克博士', pt: 'ex. Dr. Zaryab Malik', ru: 'напр. Д-р Заряб Малик', de: 'z.B. Dr. Zaryab Malik', ja: '例：ザリヤブ・マリク博士', ko: '예: 자리압 말릭 박사', it: 'es. Dr. Zaryab Malik', tr: 'örn. Dr. Zaryab Malik', id: 'mis. Dr. Zaryab Malik', bn: 'যেমন: ড. জারিয়াব মালিক', vi: 'ví dụ: TS. Zaryab Malik', sw: 'mfano. Dkt. Zaryab Malik',
  },
  jobTitleLabel: {
    en: 'Job Title / Designation *', ur: 'عہدہ / جاب ٹائٹل *', ar: 'المسمى الوظيفي *', es: 'Título Profesional / Cargo *', fr: 'Intitulé del poste / Titre *', hi: 'पदनाम / रोल *', zh: '职位/头衔 *', pt: 'Cargo / Função *', ru: 'Должность / Профессия *', de: 'Berufsbezeichnung *', ja: '役職・職种 *', ko: '직함 / 역할 *', it: 'Qualifica / Ruolo *', tr: 'Unvan / Görev *', id: 'Jabatan / Peran *', bn: 'পদবি / রোল *', vi: 'Chức Danh / Vai Trò *', sw: 'Wadhifa / Cheo *',
  },
  jobTitlePlaceholder: {
    en: 'e.g. Chief Executive Officer', ur: 'مثلاً: چیف ایگزیکٹو آفیسر', ar: 'مثال: الرئيس التنفيذي', es: 'ej. Director Ejecutivo', fr: 'ex. Directeur Général', hi: 'उदा. मुख्य कार्यकारी अधिकारी', zh: '例如：首席执行官', pt: 'ex. Diretor Executivo', ru: 'напр. Генеральный директор', de: 'z.B. Geschäftsführer', ja: '例：最高経営責任者', ko: '예: 최고경영자', it: 'es. Amministratore Delegato', tr: 'örn. CEO / Genel Müdür', id: 'mis. Direktur Utama', bn: 'যেমন: প্রধান নির্বাহী কর্মকর্তা', vi: 'ví dụ: Giám Đốc Điều Hành', sw: 'mfano. Afisa Mtendaji Mkuu',
  },
  companyLabel: {
    en: 'Company / Clinic / Brand Name', ur: 'کمپنی / کلینک / برانڈ کا نام', ar: 'اسم الشركة / العيادة / العلامة التجارية', es: 'Nombre de Empresa / Clínica / Marca', fr: 'Nom d\'entreprise / clinique / marque', hi: 'कंपनी / क्लिनिक / ब्रांड का नाम', zh: '公司/诊所/品牌名称', pt: 'Nome da Empresa / Clínica / Marca', ru: 'Название компании / клиники / бренда', de: 'Firma / Klinik / Markenname', ja: '会社・クリニック・ブランド名', ko: '회사 / 클리닉 / 브랜드명', it: 'Nome Azienda / Clinica / Brand', tr: 'Şirket / Klinik / Marka Adı', id: 'Nama Perusahaan / Klinik / Brand', bn: 'কোম্পানি / ক্লিনিক / ব্র্যান্ডের নাম', vi: 'Tên Công Ty / Phòng Khám / Thương Hiệu', sw: 'Jina la Kampuni / Kliniki / Chapa',
  },
  companyPlaceholder: {
    en: 'e.g. Malik Global Enterprises', ur: 'مثلاً: ملک گلوبل انٹرپرائزز', ar: 'مثال: مشاريع مالك العالمية', es: 'ej. Malik Global Enterprises', fr: 'ex. Malik Global Enterprises', hi: 'उदा. मलिक ग्लोबल एंटरप्राइजेज', zh: '例如：马利克全球企业集团', pt: 'ex. Malik Global Enterprises', ru: 'напр. Malik Global Enterprises', de: 'z.B. Malik Global Enterprises', ja: '例：Malik Global Enterprises', ko: '예: Malik Global Enterprises', it: 'es. Malik Global Enterprises', tr: 'örn. Malik Global Enterprises', id: 'mis. Malik Global Enterprises', bn: 'যেমন: মালিক গ্লোবাল এন্টারপ্রাইজেস', vi: 'ví dụ: Tập Đoàn Malik Global', sw: 'mfano. Malik Global Enterprises',
  },
  phoneLabel: {
    en: 'Phone Number *', ur: 'فون نمبر *', ar: 'رقم الهاتف *', es: 'Número de Teléfono *', fr: 'Numéro de téléphone *', hi: 'फोन नंबर *', zh: '电话号码 *', pt: 'Número de Telefone *', ru: 'Номер телефона *', de: 'Telefonnummer *', ja: '電話番号 *', ko: '전화번호 *', it: 'Numero di Telefono *', tr: 'Telefon Numarası *', id: 'Nomor Telepon *', bn: 'ফোন নম্বর *', vi: 'Số Điện Thoại *', sw: 'Nambari ya Simu *',
  },
  phonePlaceholder: {
    en: 'e.g. +92 300 1234567', ur: 'مثلاً: +92 300 1234567', ar: 'مثال: +92 300 1234567', es: 'ej. +92 300 1234567', fr: 'ex. +92 300 1234567', hi: 'उदा. +92 300 1234567', zh: '例如：+92 300 1234567', pt: 'ex. +92 300 1234567', ru: 'напр. +92 300 1234567', de: 'z.B. +92 300 1234567', ja: '例：+92 300 1234567', ko: '예: +92 300 1234567', it: 'es. +92 300 1234567', tr: 'örn. +92 300 1234567', id: 'mis. +92 300 1234567', bn: 'যেমন: +92 300 1234567', vi: 'ví dụ: +92 300 1234567', sw: 'mfano. +92 300 1234567',
  },
  whatsAppLabel: {
    en: 'WhatsApp Number', ur: 'واٹس ایپ نمبر', ar: 'رقم الواتساب', es: 'Número de WhatsApp', fr: 'Numéro WhatsApp', hi: 'व्हाट्सएप नंबर', zh: 'WhatsApp 号码', pt: 'Número do WhatsApp', ru: 'Номер WhatsApp', de: 'WhatsApp-Nummer', ja: 'WhatsApp番号', ko: 'WhatsApp 번호', it: 'Numero WhatsApp', tr: 'WhatsApp Numarası', id: 'Nomor WhatsApp', bn: 'হোয়াটসঅ্যাপ নম্বর', vi: 'Số WhatsApp', sw: 'Nambari ya WhatsApp',
  },
  whatsAppPlaceholder: {
    en: 'e.g. +92 300 1234567', ur: 'مثلاً: +92 300 1234567', ar: 'مثال: +92 300 1234567', es: 'ej. +92 300 1234567', fr: 'ex. +92 300 1234567', hi: 'उदा. +92 300 1234567', zh: '例如：+92 300 1234567', pt: 'ex. +92 300 1234567', ru: 'напр. +92 300 1234567', de: 'z.B. +92 300 1234567', ja: '例：+92 300 1234567', ko: '예: +92 300 1234567', it: 'es. +92 300 1234567', tr: 'örn. +92 300 1234567', id: 'mis. +92 300 1234567', bn: 'যেমন: +92 300 1234567', vi: 'ví dụ: +92 300 1234567', sw: 'mfano. +92 300 1234567',
  },
  emailLabel: {
    en: 'Email Address', ur: 'ای میل ایڈریس', ar: 'البريد الإلكتروني', es: 'Correo Electrónico', fr: 'Adresse e-mail', hi: 'ईमेल पता', zh: '电子邮件地址', pt: 'Endereço de E-mail', ru: 'Электронная почта', de: 'E-Mail-Adresse', ja: 'メールアドレス', ko: '이메일 주소', it: 'Indirizzo Email', tr: 'E-posta Adresi', id: 'Alamat Email', bn: 'ইমেল ঠিকানা', vi: 'Địa Chỉ Email', sw: 'Anwani ya Barua Pepe',
  },
  emailPlaceholder: {
    en: 'e.g. contact@malikglobal.com', ur: 'مثلاً: contact@malikglobal.com', ar: 'مثال: contact@malikglobal.com', es: 'ej. contact@malikglobal.com', fr: 'ex. contact@malikglobal.com', hi: 'उदा. contact@malikglobal.com', zh: '例如：contact@malikglobal.com', pt: 'ex. contact@malikglobal.com', ru: 'напр. contact@malikglobal.com', de: 'z.B. contact@malikglobal.com', ja: '例：contact@malikglobal.com', ko: '예: contact@malikglobal.com', it: 'es. contact@malikglobal.com', tr: 'örn. contact@malikglobal.com', id: 'mis. contact@malikglobal.com', bn: 'যেমন: contact@malikglobal.com', vi: 'ví dụ: contact@malikglobal.com', sw: 'mfano. contact@malikglobal.com',
  },
  websiteLabel: {
    en: 'Website URL', ur: 'ویب سائٹ لنک', ar: 'رابط الموقع الإلكتروني', es: 'URL de Sitio Web', fr: 'URL du site web', hi: 'वेबसाइट यूआरएल', zh: '网站网址', pt: 'URL do Site', ru: 'Ссылка на сайт', de: 'Website-URL', ja: 'ウェブサイトURL', ko: '웹사이트 URL', it: 'URL del Sito Web', tr: 'Web Sitesi Adresi', id: 'URL Situs Web', bn: 'ওয়েবসাইট লিংক', vi: 'Trang Web', sw: 'Tovuti',
  },
  websitePlaceholder: {
    en: 'e.g. malikglobal.com', ur: 'مثلاً: malikglobal.com', ar: 'مثال: malikglobal.com', es: 'ej. malikglobal.com', fr: 'ex. malikglobal.com', hi: 'उदा. malikglobal.com', zh: '例如：malikglobal.com', pt: 'ex. malikglobal.com', ru: 'напр. malikglobal.com', de: 'z.B. malikglobal.com', ja: '例：malikglobal.com', ko: '예: malikglobal.com', it: 'es. malikglobal.com', tr: 'örn. malikglobal.com', id: 'mis. malikglobal.com', bn: 'যেমন: malikglobal.com', vi: 'ví dụ: malikglobal.com', sw: 'mfano. malikglobal.com',
  },
  googleMapsLabel: {
    en: 'Google Maps Location Link', ur: 'گوگل میپس لوکیشن لنک', ar: 'رابط موقع خرائط جوجل', es: 'Enlace de Ubicación en Google Maps', fr: 'Lien d\'emplacement Google Maps', hi: 'गूगल मैप्स लोकेशन लिंक', zh: 'Google 地图位置链接', pt: 'Link de Localização do Google Maps', ru: 'Ссылка на Google Карты', de: 'Google Maps Standorts-Link', ja: 'Googleマップ位置リンク', ko: 'Google 지도 위치 링크', it: 'Link Posizione Google Maps', tr: 'Google Haritalar Konum Linki', id: 'Tautan Lokasi Google Maps', bn: 'গুগল ম্যাপস লোকেশন লিংক', vi: 'Link Google Maps', sw: 'Kiungo cha Ramani za Google',
  },
  googleMapsPlaceholder: {
    en: 'e.g. https://maps.google.com/...', ur: 'مثلاً: https://maps.google.com/...', ar: 'مثال: https://maps.google.com/...', es: 'ej. https://maps.google.com/...', fr: 'ex. https://maps.google.com/...', hi: 'उदा. https://maps.google.com/...', zh: '例如：https://maps.google.com/...', pt: 'ex. https://maps.google.com/...', ru: 'напр. https://maps.google.com/...', de: 'z.B. https://maps.google.com/...', ja: '例：https://maps.google.com/...', ko: '예: https://maps.google.com/...', it: 'es. https://maps.google.com/...', tr: 'örn. https://maps.google.com/...', id: 'mis. https://maps.google.com/...', bn: 'যেমন: https://maps.google.com/...', vi: 'ví dụ: https://maps.google.com/...', sw: 'mfano. https://maps.google.com/...',
  },
  officeAddressLabel: {
    en: 'Office / Clinic Address', ur: 'دفتر یا کلینک کا پتہ', ar: 'عنوان المكتب / العيادة', es: 'Dirección de Oficina / Clínica', fr: 'Adresse du bureau / clinique', hi: 'कार्यालय / क्लिनिक का पता', zh: '办公室/诊所地址', pt: 'Endereço do Escritório / Clínica', ru: 'Адрес офиса / клиники', de: 'Büro- / Klinikadresse', ja: 'オフィス・クリニック住所', ko: '사무실 / 클리닉 주소', it: 'Indirizzo Ufficio / Clinica', tr: 'Ofis / Klinik Adresi', id: 'Alamat Kantor / Klinik', bn: 'অফিস / ক্লিনিকের ঠিকানা', vi: 'Địa Chỉ Văn Phòng / Phòng Khám', sw: 'Anwani ya Ofisi / Kliniki',
  },
  officeAddressPlaceholder: {
    en: 'e.g. Suite 402, Blue Area, Islamabad', ur: 'مثلاً: سویٹ 402، بلیو ایریا، اسلام آباد', ar: 'مثال: جناح شارع 402، إسلام آباد', es: 'ej. Suite 402, Blue Area, Islamabad', fr: 'ex. Suite 402, Blue Area, Islamabad', hi: 'उदा. सूट 402, ब्लू एरिया, इस्लामाबाद', zh: '例如：伊斯兰堡蓝区 402 套房', pt: 'ex. Suite 402, Blue Area, Islamabad', ru: 'напр. Сюита 402, Блу Эриа, Исламабад', de: 'z.B. Suite 402, Blue Area, Islamabad', ja: '例：イスラマバード ブルーエリア Suite 402', ko: '예: 이슬라마바드 블루 에어리어 Suite 402', it: 'es. Suite 402, Blue Area, Islamabad', tr: 'örn. Suite 402, Blue Area, Islamabad', id: 'mis. Suite 402, Blue Area, Islamabad', bn: 'যেমন: সুইট ৪০২, ব্লু এরিয়া, ইসলামাবাদ', vi: 'ví dụ: Tầng 402, Khu Blue Area, Islamabad', sw: 'mfano. Suite 402, Blue Area, Islamabad',
  },
  shortBioLabel: {
    en: 'Short Professional Bio / Services', ur: 'مختصر تعارف یا خدمات تفصیل', ar: 'نبذة عن الخدمات والمهن', es: 'Breve Biografía Profesional / Servicios', fr: 'Brève biographie / services', hi: 'संक्षिप्त पेशेवर परिचय / सेवाएं', zh: '简短专业介绍/服务内容', pt: 'Breve Biografia Profissional / Serviços', ru: 'Краткое описание услуг / профиля', de: 'Kurzes Berufsprofil / Dienstleistungen', ja: '簡単なプロフィール・サービス内容', ko: '간단한 프로필 / 서비스 소개', it: 'Breve Bio Professionale / Servizi', tr: 'Kısa Tanıtım / Hizmet Detayları', id: 'Bio Singkat / Layanan Professional', bn: 'সংক্ষিপ্ত পেশাদার পরিচয় / পরিষেবা', vi: "Giới Thiệu Dịch Vụ / Tiểu Sử Ngắn", sw: 'Maelezo Mafupi ya Huduma / Profaili',
  },
  shortBioPlaceholder: {
    en: 'Write a brief intro about your services, clinic, or business...', ur: 'اپنی خدمات، کلینک یا کاروبار کا مختصر تعارف لکھیں...', ar: 'اكتب نبذة مختصرة عن خدماتك أو عملك...', es: 'Escribe una breve introducción sobre tus servicios o empresa...', fr: 'Rédigez une courte présentation de vos services...', hi: 'अपनी सेवाओं, क्लिनिक या व्यवसाय के बारे में एक संक्षिप्त परिचय लिखें...', zh: '简要介绍您的服务、诊所或公司业务...', pt: 'Escreva uma breve introdução sobre seus serviços ou empresa...', ru: 'Напишите краткую информацию о ваших услугах...', de: 'Schreiben Sie eine kurze Vorstellung Ihrer Dienstleistungen...', ja: 'あなたのサービスや会社について簡単に紹介してください...', ko: '귀하의 서비스나 회사에 대한 간단한 소개를 입력하세요...', it: 'Scrivi una breve introduzione sui tuoi servizi o azienda...', tr: 'Hizmetleriniz veya şirketiniz hakkında kısa bir tanıtım yazın...', id: 'Tuliskan pengenalan singkat tentang layanan atau usaha Anda...', bn: 'আপনার পরিষেবা বা ব্যবসা সম্পর্কে একটি সংক্ষিপ্ত পরিচিতি লিখুন...', vi: 'Viết giới thiệu ngắn gọn về dịch vụ hoặc công ty của bạn...', sw: 'Andika maelezo mafupi kuhusu huduma au biashara yako...',
  },
  generateCardBtn: {
    en: 'Generate Live Digital Visiting Card', ur: 'لائیو ڈیجیٹل بزنس کارڈ بنائیں', ar: 'إنشاء بطاقة الأعمال الرقمية المباشرة', es: 'Generar Tarjeta Digital en Vivo', fr: 'Générer la carte numérique en direct', hi: 'लाइव डिजिटल बिजनेस कार्ड बनाएं', zh: '生成实时数字名片', pt: 'Gerar Cartão Digital Ao Vivo', ru: 'Создать цифровую визитку', de: 'Live Digital Visitenkarte erstellen', ja: 'デジタル名刺を即座に生成', ko: '라이브 디지털 명함 생성', it: 'Genera Biglietto Digitale Live', tr: 'Canlı Dijital Kartvizit Oluştur', id: 'Buat Kart Nama Digital Live', bn: 'লাইভ ডিজিটাল বিজনেস কার্ড তৈরি করুন', vi: 'Tạo Danh Thiếp Kỹ Thuật Số Live', sw: 'Unda Kadi ya Biashara ya Kidijitali Live',
  },
  creatingCardBtn: {
    en: 'Creating Card...', ur: 'کارڈ بنایا جا رہا ہے...', ar: 'جاري إنشاء البطاقة...', es: 'Creando Tarjeta...', fr: 'Création de la carte...', hi: 'कार्ड बनाया जा रहा है...', zh: '正在生成名片...', pt: 'Criando Cartão...', ru: 'Создание визитки...', de: 'Karte wird erstellt...', ja: 'カードを作成中...', ko: '명함 생성 중...', it: 'Creazione Biglietto...', tr: 'Kart Oluşturuluyor...', id: 'Membuat Kartu...', bn: 'কার্ড তৈরি করা হচ্ছে...', vi: 'Đang Tạo Danh Thiếp...', sw: 'Inaunda Kadi...',
  },
  livePreviewTitle: {
    en: 'Live Real-Time Preview', ur: 'لائیو رئیل ٹائم معاینہ', ar: 'معاينة مباشرة في الوقت الفعلي', es: 'Vista Previa en Tiempo Real', fr: 'Aperçu en temps réel', hi: 'लाइव रियल-टाइम पूर्वावलोकन', zh: '实时效果预览', pt: 'Visualização em Tempo Real', ru: 'Предпросмотр в реальном времени', de: 'Echtzeit-Vorschau', ja: 'リアルタイムプレビュー', ko: '실시간 미리보기', it: 'Anteprima in Tempo Reale', tr: 'Canlı Önizleme', id: 'Pratinjau Real-Time Live', bn: 'লাইভ রিয়েল-টাইম প্রিভিউ', vi: 'Xem Trước Thời Gian Thực', sw: 'Onyesho la Kukagua la Wakati Halisi',
  },
  visitingCardLiveTitle: {
    en: 'Your Digital Visiting Card is Live! 🎉', ur: 'آپ کا ڈیجیٹل بزنس کارڈ لائیو ہو گیا ہے! 🎉', ar: 'بطاقتك الرقمية جاهزة ومباشرة الآن! 🎉', es: '¡Tu Tarjeta Digital ya está Activa! 🎉', fr: 'Votre carte numérique est en ligne ! 🎉', hi: 'आपका डिजिटल बिजनेस कार्ड लाइव है! 🎉', zh: '您的数字名片已上线！🎉', pt: 'Seu Cartão Digital está No Ar! 🎉', ru: 'Ваша цифровая визитка уже работает! 🎉', de: 'Ihre digitale Visitenkarte ist live! 🎉', ja: 'デジタル名刺が公開されました！🎉', ko: '디지털 명함이 라이브로 생성되었습니다! 🎉', it: 'Il tuo Biglietto Digitale è Online! 🎉', tr: 'Dijital Kartvizitiniz Yayınlandı! 🎉', id: 'Kartu Nama Digital Anda Sudah Live! 🎉', bn: 'আপনার ডিজিটাল বিজনেস কার্ড লাইভ হয়েছে! 🎉', vi: 'Danh Thiếp Kỹ Thuật Số Của Bạn Đã Live! 🎉', sw: 'Kadi Yako ya Kidijitali Iko Live Sasa! 🎉',
  },
  visitingCardLiveSubtitle: {
    en: 'Anyone who clicks your link can save your phone number to their contacts in 1 click or chat with you on WhatsApp!', ur: 'آپ کے لنک پر کلک کرنے والا کوئی بھی شخص 1-کلک میں فون نمبر سیو کر سکتا ہے اور واٹس ایپ پر چیٹ شروع کر سکتا ہے!', ar: 'يمكن لأي شخص ينقر على رابطك حفظ رقم هاتفك بنقرة واحدة أو التحدث معك عبر الواتساب!', es: '¡Cualquiera que haga clic en tu enlace puede guardar tu teléfono en 1 clic o chatear en WhatsApp!', fr: 'Toute personne cliquant sur votre lien peut enregistrer votre numéro en 1 clic ou vous contacter sur WhatsApp !', hi: 'जो भी आपके लिंक पर क्लिक करेगा, वह 1-क्लिक में नंबर सेव कर सकता है या व्हाट्सएप पर बात कर सकता है!', zh: '任何人点击您的链接都可以一键保存您的电话号码到通讯录，或在 WhatsApp 上与您交谈！', pt: 'Qualquer pessoa que clicar no seu link pode salvar seu número em 1 clique ou conversar no WhatsApp!', ru: 'Каждый, кто перейдет по вашей ссылке, сможет в 1 клик сохранить ваш номер или написать в WhatsApp!', de: 'Jeder, der auf Ihren Link klickt, kann Ihre Nummer mit 1 Klick speichern oder auf WhatsApp chatten!', ja: 'リンクをクリックした人は1クリックで連絡先を保存したり、WhatsAppでチャットできます！', ko: '링크를 클릭하는 사람은 누구나 1클릭으로 전화번호를 저장하거나 WhatsApp으로 대화할 수 있습니다!', it: 'Chiunque clicchi sul tuo link può salvare il tuo numero in 1 click o chattare su WhatsApp!', tr: 'Linkinize tıklayan herkes numaranızı 1 tıkla rehbere kaydedebilir veya WhatsApp\'ta sohbet edebilir!', id: 'Siapa pun yang mengklik tautan Anda dapat menyimpan nomor Anda dalam 1 klik atau chat di WhatsApp!', bn: 'আপনার লিংকে ক্লিক করা যে কেউ ১-ক্লিকে নম্বর সংরক্ষণ করতে পারবেন বা হোয়াটসঅ্যাপে চ্যাট করতে পারবেন!', vi: 'Bất kỳ ai nhấp vào link đều có thể lưu số điện thoại trong 1-nhấp hoặc trò chuyện qua WhatsApp!', sw: 'Mtu wowote anayebofya kiungo chako anaweza kuhifadhi nambari yako kwa mbofyo 1 au kupiga gumzo kwenye WhatsApp!',
  },
  shareOnWhatsApp: {
    en: 'Share on WhatsApp', ur: 'واٹس ایپ پر شیئر کریں', ar: 'المشاركة عبر الواتساب', es: 'Compartir en WhatsApp', fr: 'Partager sur WhatsApp', hi: 'व्हाट्सएप पर साझा करें', zh: '分享到 WhatsApp', pt: 'Compartilhar no WhatsApp', ru: 'Поделиться в WhatsApp', de: 'Auf WhatsApp teilen', ja: 'WhatsAppで共有', ko: 'WhatsApp으로 공유', it: 'Condividi su WhatsApp', tr: 'WhatsApp\'ta Paylaş', id: 'Bagikan ke WhatsApp', bn: 'হোয়াটসঅ্যাপে শেয়ার করুন', vi: 'Chia Sẻ Qua WhatsApp', sw: 'Shiriki kwenye WhatsApp',
  },
  viewPublicLiveCard: {
    en: 'View Public Live Card', ur: 'لائیو کارڈ دیکھیں', ar: 'عرض البطاقة المباشرة', es: 'Ver Tarjeta Pública', fr: 'Voir la carte publique', hi: 'सार्वजनिक लाइव कार्ड देखें', zh: '查看公开名片', pt: 'Ver Cartão Público', ru: 'Открыть визитку', de: 'Öffentliche Karte ansehen', ja: '公開カードを表示', ko: '공개 카드 보기', it: 'Visualizza Biglietto Pubblico', tr: 'Canlı Kartı Görüntüle', id: 'Lihat Kartu Live', bn: 'পাবলিক লাইভ কার্ড দেখুন', vi: 'Xem Danh Thiếp Live', sw: 'Tazama Kadi ya Umma',
  },
  createAnotherCard: {
    en: '← Create Another Visiting Card', ur: '← ایک اور ڈیجیٹل کارڈ بنائیں', ar: '← إنشاء بطاقة أعمال أخرى', es: '← Crear Otra Tarjeta Digital', fr: '← Créer une autre carte', hi: '← दूसरा डिजिटल कार्ड बनाएं', zh: '← 创建另一张数字名片', pt: '← Criar Outro Cartão', ru: '← Создать еще одну визитку', de: '← Weitere Karte erstellen', ja: '← 別の名刺を作成する', ko: '← 다른 명함 생성하기', it: '← Crea un altro biglietto', tr: '← Başka Bir Kart Oluştur', id: '← Buat Kartu Lainnya', bn: '← আরেকটি ডিজিটাল কার্ড তৈরি করুন', vi: '← Tạo Danh Thiếp Khác', sw: '← Unda Kadi Nyingine',
  },
  copyLink: {
    en: 'Copy Link', ur: 'لنک کاپی کریں', ar: 'نسخ الرابط', es: 'Copiar Enlace', fr: 'Copier le lien', hi: 'कॉपी लिंक', zh: '复制链接', pt: 'Copiar Link', ru: 'Копировать ссылку', de: 'Link kopieren', ja: 'リンクをコピー', ko: '링크 복사', it: 'Copia Link', tr: 'Linki Kopyala', id: 'Salin Tautan', bn: 'লিংক কপি করুন', vi: 'Sao Chép Link', sw: 'Nakili Kiungo',
  },
  copied: {
    en: 'Copied!', ur: 'کاپی ہو گیا!', ar: 'تم النسخ!', es: '¡Copiado!', fr: 'Copié !', hi: 'कॉपी हो गया!', zh: '已复制！', pt: 'Copiado!', ru: 'Скопировано!', de: 'Kopiert!', ja: 'コピーしました！', ko: '복사됨!', it: 'Copiato!', tr: 'Kopyalandı!', id: 'Tersalin!', bn: 'কপি হয়েছে!', vi: 'Đã Sao Chép!', sw: 'Imenakiliwa!',
  },
}
