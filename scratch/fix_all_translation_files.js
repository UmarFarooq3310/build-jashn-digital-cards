const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Dictionaries for post subtitles per language
const SUBTITLE_TRANSLATIONS = {
  1: {
    es: "Ejemplos detallados de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, versículos del Corán y etiquetas de RSVP.",
    fr: "Modèles complets de textes pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, versets du Coran et étiquette RSVP.",
    ar: "عبارات راقية لدعوات النكاح والحناء والبارات والوليمة باللغتين الأردو والإنجليزي مع خط البسملة والآيات القرآنية وآداب الضيافة.",
    hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बिस्मिल्लाह सुलेख, कुरान की आयतों और RSVP नियमों के साथ विस्तृत उदाहरण।",
    zh: "包含 Nikkah 订婚、Mehndi 欢庆、Barat 喜宴与 Walima 招待会的双语文案模板、Bismillah 书法及古兰经祝福语。",
    pt: "Exemplos completos de texto para cartões de Nikkah, Mehndi, Barat e Walima com caligrafia Bismillah e versículos do Alcorão.",
    ru: "Подробные образцы текстов для Никаха, Мехнди, Барата и Валима с каллиграфией Бисмилля, кораническими стихами и этикетом.",
    de: "Umfassende Textbeispiele für Nikkah-, Mehndi-, Barat- und Walima-Karten mit Bismillah-Kalligrafie und Koransversen.",
    ja: "Nikkah、Mehndi、Barat、Walimaカードのためのビスミッラー書道、コーランの聖句、マナー集。",
    ko: "니카(Nikkah), 멘디, 바라트, 발리마 카드를 위한 비스밀라 서예 및 코란 구절 포함 우아한 문구 예시.",
    it: "Esempi completi per biglietti Nikkah, Mehndi, Barat e Walima con calligrafia Bismillah e versi del Corano.",
    tr: "Nikah, Kına, Barat ve Düğün kartları için Besmele hat sanatı, Ayetler ve ev sahibi davet sözleri örnekleri.",
    id: "Contoh teks lengkap untuk kartu Akad Nikah, Mehndi, Barat, dan Walima dengan kaligrafi Bismillah dan ayat Al-Qur'an.",
    bn: "নিকাহ, মেহেদি, বারাত এবং ওয়ালিমা কার্ডের জন্য বিসমিল্লাহ ক্যালিগ্রাফি এবং কুরআনের আয়াত সহ লেখার নমুনা।",
    vi: "Các mẫu câu phong phú cho thiệp Nikkah, Mehndi, Barat và tiệc Walima kèm thư pháp Bismillah và câu kinh Coran.",
    sw: "Mifano ya maneno ya kadi za Nikkah, Mehndi, Barat na Walima zenye kaligrafia ya Bismillah na aya za Qur'ani."
  },
  2: {
    es: "Desglose financiero detallado, ahorro medioambiental y comparación en la gestión de confirmaciones de asistencia (RSVP).",
    fr: "Analyse financière détaillée, économies environnementales et comparaison de la gestion des confirmations de présence (RSVP).",
    ar: "تحليل مالي شامل ومقارنة التوفير البيئي وإدارة تأكيد الحضور بين الدعوات الرقمية والورقية.",
    hi: "वित्तीय लागत, पर्यावरण संरक्षण और आरएसवीपी प्रबंधन का विस्तृत तुलनात्मक विश्लेषण।",
    zh: "详细的财务费用分析、环保表现与实时 RSVP 宾客确认效率对比指南。",
    pt: "Análise financeira detalhada, economia ambiental e comparação da gestão de confirmações de presença (RSVP).",
    ru: "Подробный финансовый анализ, экологическая польза и сравнение удобства управления списками гостей.",
    de: "Detaillierte Finanzanalyse, Umweltersparnis und Vergleich des RSVP-Gästemanagements.",
    ja: "印刷費用、環境への配慮、リアルタイムRSVP確認管理の包括的な比較ガイド。",
    ko: "상세한 비용 분석, 환경 보호 효과 및 하객 RSVP 관리 효율성 비교 가이드.",
    it: "Analisi finanziaria dettagliata, risparmio ambientale e confronto nella gestione delle conferme di presenza (RSVP).",
    tr: "Detaylı finansal maliyet analizi, çevre tasarrufu ve LCV davetli takibi karşılaştırması.",
    id: "Analisis biaya keuangan mendalam, penghematan lingkungan, dan perbandingan manajemen RSVP.",
    bn: "বিস্তারিত খরচের হিসাব, পরিবেশগত সুবিধা এবং আরএসভিপি ম্যানেজমেন্টের তুলনামূলক বিশ্লেষণ।",
    vi: "Phân tích chi phí tài chính chi tiết, tiết kiệm môi trường và so sánh quản lý RSVP.",
    sw: "Uchanganuzi wa kina wa gharama, utunzaji wa mazingira, na linganisho la usimamizi wa RSVP."
  },
  3: {
    es: "Cree hermosas tarjetas 3D animadas de Eid con fotos familiares personalizadas, nombres y oraciones en árabe y urdu.",
    fr: "Créez de magnifiques cartes d'Aïd animées en 3D avec photos de famille, prénoms et bénédictions en arabe et ourdou.",
    ar: "أنشئ بطاقات عيد 3D متحركة رائعة مع صور العائلة والأسماء ودعوات إسلامية مباركة باللغتين العربية والأردو.",
    hi: "पारिवारिक फ़ोटो, नाम और अरबी/उर्दू दुआओं के साथ सुंदर 3D एनिमेटेड ईद कार्ड बनाएं।",
    zh: "打造融入家庭合影、名字及阿拉伯语/乌尔都语虔诚祈祷的精美 3D 动态开斋节贺卡。",
    pt: "Crie lindos cartões de Eid animados em 3D com fotos de família personalizadas, nomes e bênçãos.",
    ru: "Создавайте прекрасные 3D-анимированные открытки на Эйд с семейными фото, именами и дуа.",
    de: "Erstellen Sie wunderschöne 3D-animierte Eid-Karten mit Familienfotos, Namen und Gebeten.",
    ja: "家族写真、名前、アラビア語・ウルドゥー語の祈りを込めた美しい3DアニメーションEidカードを作成。",
    ko: "가족 사진, 이름, 아랍어/우르두어 기도 문구가 포함된 아름다운 3D 애니메이션 이드 카드를 만드세요.",
    it: "Crea splendidi biglietti 3D animati per l'Eid con foto di famiglia, nomi e preghiere in arabo e urdu.",
    tr: "Aile fotoğrafları, isimler ve dualar içeren harika 3D hareketli Bayram tebrik kartları oluşturun.",
    id: "Buat kartu Idul Fitri 3D animasi indah dengan foto keluarga, nama, dan doa-doa Islami.",
    bn: "পরিবারের ছবি, নাম এবং দোয়া সহ চমৎকার ৩ডি অ্যানিমেটেড ঈদ কার্ড তৈরি করুন।",
    vi: "Tạo thiệp Eid hoạt hình 3D tuyệt đẹp với ảnh gia đình, tên tùy chỉnh và lời chúc ý nghĩa.",
    sw: "Unda kadi nzuri za 3D za Eid zenye picha za familia, majina na baraka."
  },
  4: {
    es: "Cómo las tarjetas NFC y la descarga en 1 clic de archivos .VCF revolucionan el networking profesional.",
    fr: "Comment les cartes NFC et le téléchargement .VCF en 1 clic révolutionnent le réseau professionnel.",
    ar: "كيف تحدث بطاقات NFC وحفظ جهات الاتصال بنقرة واحدة ثورة في التواصل المهني والتنفيذي.",
    hi: "NFC कार्ड और 1-क्लिक .VCF कांटेक्ट सेविंग कैसे बिजनेस नेटवर्किंग में क्रांति ला रहे हैं।",
    zh: "探索 NFC 名片与一键保存 .VCF 联系人功能如何颠覆现代商务社交与高管人脉拓展。",
    pt: "Como os cartões NFC e a captura de contactos .VCF em 1 clique revolucionam o networking.",
    ru: "Как карты NFC и сохранение контакта .VCF в 1 клик меняют деловой нетворкинг.",
    de: "Wie NFC-Karten und 1-Klick-VCF-Speicherung das berufliche Networking revolutionieren.",
    ja: "NFCカードとワンクリック.VCF保存がビジネスネットワーキングをどう革新するか。",
    ko: "NFC 카드와 1클릭 .VCF 연락처 저장이 경영진 네트워킹을 어떻게 혁신하는지 알아보세요.",
    it: "Come i biglietti NFC e il salvataggio contatti .VCF in 1 clic rivoluzionano il networking.",
    tr: "NFC kartların ve 1-Tıkla .VCF kişi kaydetmenin kurumsal iletişimi nasıl değiştirdiğini keşfedin.",
    id: "Bagaimana kartu NFC dan simpan kontak .VCF 1-klik merevolusi jaringan bisnis profesional.",
    bn: "এনএফসি কার্ড এবং ১-ক্লিক .VCF সেভ ফিচার কীভাবে বিজনেস নেটওয়ার্কিং উন্নত করে।",
    vi: "Cách danh thiếp NFC và tính năng lưu .VCF 1-click cách mạng hóa kết nối doanh nghiệp.",
    sw: "Jinsi kadi za NFC na hifadhi ya anwani ya .VCF ya mbofyo 1 inavyoboresha mawasiliano."
  },
  5: {
    es: "Elimine el caos en el recuento de invitados con el seguimiento automatizado de confirmaciones por WhatsApp y paneles en vivo.",
    fr: "Éliminez le chaos du décompte des invités grâce au suivi automatisé des RSVP WhatsApp et aux tableaux de bord en direct.",
    ar: "تخلص من فوضى إحصاء الضيوف بفضل التتبع الآلي لتأكيد الحضور عبر واتساب واللوحات التفاعلية المباشرة.",
    hi: "व्हाट्सएप आरएसवीपी ट्रैकिंग और लाइव डैशबोर्ड के साथ मेहमानों की गिनती की अव्यवस्था को समाप्त करें।",
    zh: "借助 WhatsApp 自动确认回复与实时可视化看板，告别婚礼宾客名单统计混乱。",
    pt: "Elimine o caos na contagem de convidados com o rastreamento automatizado de RSVPs pelo WhatsApp.",
    ru: "Забудьте о хаосе подсчета гостей благодаря автоматическому отслеживанию ответов в WhatsApp и панели управления.",
    de: "Beenden Sie das Gästelisten-Chaos mit automatischer WhatsApp-RSVP-Verfolgung und Live-Dashboards.",
    ja: "WhatsApp自動RSVP確認とリアルタイムダッシュボードでゲスト管理の混乱を解消。",
    ko: "자동화된 WhatsApp RSVP 추적과 실시간 대시보드로 결혼식 하객 관리의 혼란을 해결하세요.",
    it: "Elimina il caos nel conteggio degli ospiti con la gestione automatizzata dei RSVP su WhatsApp e dashboard dal vivo.",
    tr: "WhatsApp LCV takibi ve canlı yönetim paneliyle davetli listesi karmaşasına son verin.",
    id: "Atasi kebingungan perhitungan tamu dengan pelacakan RSVP WhatsApp otomatis dan dasbor langsung.",
    bn: "স্বয়ংক্রিয় হোয়াটসঅ্যাপ আরএসভিপি ট্র্যাকিং এবং লাইভ ড্যাশবোর্ডের মাধ্যমে অতিথিদের তালিকা পরিচালনা সহজ করুন।",
    vi: "Loại bỏ sự hỗn loạn khi đếm khách bằng tính năng theo dõi RSVP WhatsApp tự động và bảng điều khiển trực tiếp.",
    sw: "Ondoa machafuko ya kuhesabu wageni kwa kufuatilia majibu ya WhatsApp na dashibodi za moja kwa moja."
  },
  6: {
    es: "Cree webs de invitación interactivas con animaciones doradas, música, mapas de ubicación y botones de confirmación por WhatsApp.",
    fr: "Créez des sites d'invitation interactifs avec animations dorées, musique, cartes et boutons de suivi RSVP WhatsApp.",
    ar: "أنشئ مواقع دعوات تفاعلية مع مؤثرات ذهبية وموسيقى وخريطة الموقع وأزرار تأكيد الحضور عبر واتساب.",
    hi: "गोल्ड फ़ॉइल एनिमेशन, संगीत, मैप्स और व्हाट्सएप आरएसवीपी बटन के साथ इंटरैक्टिव डिजिटल कार्ड बनाएं।",
    zh: "轻松创建带有烫金动态特效、门票音乐、地图导航及 WhatsApp RSVP 确认按钮的数字请柬网站。",
    pt: "Crie sites de convite interativos com animações em folha de ouro, música, mapas e botões WhatsApp RSVP.",
    ru: "Создавайте интерактивные сайты-приглашения с золотой анимацией, музыкой, картой и кнопкой WhatsApp RSVP.",
    de: "Erstellen Sie interaktive Einladungs-Websites mit Goldfolien-Animationen, Musik, Karten und WhatsApp RSVP.",
    ja: "ゴールドフォイルアニメーション、音楽、会場マップ、WhatsApp RSVPボタンを備えた体験型招待状サイトを作成。",
    ko: "골드 포일 애니메이션, 배경 음악, 위치 지도, WhatsApp RSVP 버튼이 포함된 인터랙티브 초대장 웹사이트를 제작하세요.",
    it: "Crea siti di invito interattivi con animazioni dorate, musica, mappe del luogo e pulsanti RSVP WhatsApp.",
    tr: "Altın yaldız animasyonları, müzik, haritalar ve WhatsApp LCV butonlarıyla etkileşimli davetiye web siteleri oluşturun.",
    id: "Buat situs undangan interaktif dengan animasi emas, musik, peta lokasi, dan tombol RSVP WhatsApp.",
    bn: "গোল্ড ফয়েল অ্যানিমেশন, মিউজিক, গুগল ম্যাপস এবং হোয়াটসঅ্যাপ আরএসভিপি বাটন সহ ইন্টারঅ্যাক্টিভ ডিজিটাল ইনভিটেশন ওয়েবসাইট তৈরি করুন।",
    vi: "Tạo website thiệp mời tương tác với hiệu ứng mạ vàng, âm nhạc, bản đồ vị trí và nút RSVP WhatsApp.",
    sw: "Unda tovuti za kadi za mialiko zenye uhuishaji wa dhahabu, muziki, ramani za ukumbi na vifungo vya RSVP."
  },
  7: {
    es: "Convierta simples mensajes de texto en experiencias visuales 3D interactivas con sonido, fotos y nombres personalizados.",
    fr: "Transformez de simples messages texte en expériences visuelles 3D interactives avec son, photos et prénoms personnalisés.",
    ar: "حول تهانيك النصية إلى تجربة بصرية 3D تفاعلية رائعة مع الصوت والصور والأسماء المخصصة.",
    hi: "साधारण टेक्स्ट मैसेज को ऑडियो, फोटो और नाम के साथ 3D विज़ुअल अनुभव में बदलें।",
    zh: "将平淡的文字祝福升级为融入音乐、立体图层、照片与专属姓名的高能 3D 视觉体验。",
    pt: "Transforme mensagens simples de texto em experiências visuais 3D interativas com som, fotos e nomes.",
    ru: "Превратите простые текстовые поздравления в интерактивные 3D-открытки со звуком, фото и именами.",
    de: "Verwandeln Sie einfache Textgrüße in interaktive visuelle 3D-Erlebnisse mit Ton, Fotos und Namen.",
    ja: "シンプルなテキストメッセージを、音楽・写真・名前入りの対話型3Dビジュアル体験に変換。",
    ko: "단순한 텍스트 축하 메시지를 음악, 사진, 이름을 넣은 인터랙티브 3D 비주얼 경험으로 변환하세요.",
    it: "Trasforma semplici messaggi di testo in esperienze visive 3D interattive con suono, foto e nomi.",
    tr: "Düz metin mesajlarını sesli, fotoğraflı ve özel isimli etkileşimli 3D görsel deneyimlere dönüştürün.",
    id: "Ubah ucapan teks biasa menjadi pengalaman visual 3D interaktif dengan suara, foto, dan nama.",
    bn: "সাধারণ টেক্সট মেসেজকে গান, ছবি এবং নাম সহ ৩ডি ভিজ্যুয়াল অভিজ্ঞতায় রূপান্তর করুন।",
    vi: "Biến tin nhắn văn bản đơn giản thành trải nghiệm 3D tương tác sống động với âm thanh, hình ảnh và tên cá nhân.",
    sw: "Badilisha ujumbe wa kawaida wa maandishi kuwa picha za 3D zenye sauti, picha na majina."
  },
  8: {
    es: "Envíe felicitaciones animadas para Navidad, Año Nuevo 2026, Acción de Gracias, Diwali y Año Nuevo Lunar.",
    fr: "Envoyez des cartes de vœux animées pour Noël, le Nouvel An 2026, Action de Grâce, Diwali et le Nouvel An LUNAIRE.",
    ar: "أرسل تهاني متحركة لأعياد الميلاد والسنة الجديدة 2026 وعيد الشكر والمناسبات العالمية.",
    hi: "क्रिसमस, नए साल 2026, थैंक्सगिविंग, दिवाली और लूनर न्यू ईयर के लिए एनिमेटेड विश कार्ड भेजें।",
    zh: "为圣诞节、2026跨年新年、感恩节、排灯节及农历春节设计并发送炫酷的 3D 电子贺卡。",
    pt: "Envie cumprimentos animados para o Natal, Ano Novo de 2026, Ação de Graças, Diwali e Ano Novo Chinês.",
    ru: "Отправляйте анимированные открытки на Рождество, Новый год 2026, День благодарения и другие праздники.",
    de: "Versenden Sie animierte Grüße zu Weihnachten, Neujahr 2026, Thanksgiving, Diwali und zum Mondneujahr.",
    ja: "クリスマス、2026年新春、サンクスギビング、ディワリ、旧正月のための動くアニメーションEカードを送信。",
    ko: "크리스마스, 2026년 새해, 추수감사절, 디왈리, 설날을 위한 애니메이션 E-카드를 보내세요.",
    it: "Invia auguri animati per Natale, Capodanno 2026, Ringraziamento, Diwali e Capodanno Lunare.",
    tr: "Noel, 2026 Yılbaşı, Şükran Günü, Diwali ve Bahar Bayramı için hareketli e-kartlar gönderin.",
    id: "Kirim ucapan animasi untuk Natal, Tahun Baru 2026, Thanksgiving, Diwali, dan Imlek.",
    bn: "ক্রিসমাস, নতুন বছর ২০২৬, থ্যাঙ্কসগিভিং, দেওয়ালি এবং নতুন বছরের জন্য অ্যানিমেটেড কার্ড পাঠান।",
    vi: "Gửi lời chúc mừng hoạt hình cho Giáng sinh, Năm mới 2026, Lễ Tạ ơn, Diwali và Tết Nguyên đán.",
    sw: "Tuma kadi za kielektroniki za uhuishaji za Krismasi, Mwaka Mpya 2026, Thanksgiving, na Diwali."
  },
  9: {
    es: "Diseñe tarjetas de cumpleaños 3D interactivas y webs de invitación para fiestas especiales con música.",
    fr: "Concevez des cartes d'anniversaire 3D interactives et des sites d'invitation de fête avec musique.",
    ar: "صمم بطاقات أعياد ميلاد 3D تفاعلية ومواقع دعوات الحفلات الخاصة مع الصوت والموسيقى.",
    hi: "संगीत के साथ इंटरैक्टिव 3D जन्मदिन की शुभकामनाएं और पार्टी आमंत्रण कार्ड बनाएं।",
    zh: "设计制作融入沉浸式音乐的 3D 交互式生日祝福卡片与派对邀请函网站。",
    pt: "Crie cartões de aniversário 3D interativos e sites de convite para festas com música.",
    ru: "Создавайте интерактивные 3D-открытки на день рождения и сайты-приглашения на вечеринку с музыкой.",
    de: "Gestalten Sie interaktive 3D-Geburtstagskarten und Party-Einladungswebsites mit Musik.",
    ja: "お祝いの音楽を備えた3Dインタラクティブ誕生日祝いカード＆パーティークラブサイトを作成。",
    ko: "음악이 포함된 인터랙티브 3D 생일 축하 카드 및 특별 파티 초대장 웹사이트를 디자인하세요.",
    it: "Progetta biglietti di compleanno 3D interattivi e siti di invito per feste con musica.",
    tr: "Müzikli etkileşimli 3D doğum günü tebrik kartları ve özel parti davetiye web siteleri tasarlayın.",
    id: "Rancang kartu ucapan ulang tahun 3D interaktif dan situs undangan pesta dengan musik.",
    bn: "মিউজিক সহ ইন্টারঅ্যাক্টিভ ৩ডি জন্মদিনের শুভেচ্ছা কার্ড এবং পার্টির ইনভিটেশন ওয়েবসাইট তৈরি করুন।",
    vi: "Thiết kế thiệp chúc mừng sinh nhật 3D tương tác và website mời dự tiệc với âm nhạc sinh động.",
    sw: "Unda kadi za siku ya kuzaliwa za 3D zenye uhuishaji na tovuti za mialiko ya sherehe zenye muziki."
  },
  10: {
    es: "Optimice el guardado de contactos profesionales con vCards web dinámicas y archivos de contacto móviles.",
    fr: "Simplifiez l'enregistrement des contacts professionnels grâce aux vCards web dynamiques et fichiers de contact mobiles.",
    ar: "سهل عملية حفظ جهات الاتصال المهنية عبر بطاقات vCard التفاعلية وملفات الجوال المباشرة.",
    hi: "डायनामिक वेब vCards और मोबाइल संपर्क फ़ाइलों के साथ पेशेवर संपर्क सहेजने को आसान बनाएं।",
    zh: "借助动态网页 vCard 与手机通讯录 .VCF 文件，一键颠覆商务联系人保存体验。",
    pt: "Simplifique a gravação de contactos profissionais com vCards dinâmicos e ficheiros de contacto móveis.",
    ru: "Упростите сохранение деловых контактов с помощью динамических веб-визиток и файлов .VCF.",
    de: "Optimieren Sie das Speichern von Geschäftskontakten mit dynamischen Web-vCards und VCF-Dateien.",
    ja: "動的なWeb vCardとモバイル連絡先ファイルで、ビジネス連絡先の保存プロセスを効率化。",
    ko: "동적 웹 vCard 및 모바일 연락처 파일로 전문 연락처 저장 프로세스를 간소화하세요.",
    it: "Semplifica il salvataggio dei contatti professionali con vCard web dinamiche e file di contatto mobili.",
    tr: "Dinamik web vCard'ları ve mobil kişi dosyalarıyla profesyonel kişi kaydetme sürecini kolaylaştırın.",
    id: "Mempermudah penyimpanan kontak profesional dengan vCard web dinamis dan file kontak seluler.",
    bn: "ডায়নামিক ওয়েব ভিকার্ড এবং মোবাইল ভি-কার্ড ফাইলের মাধ্যমে ব্যবসায়িক যোগাযোগ সংরক্ষণ সহজ করুন।",
    vi: "Tối ưu hóa việc lưu danh bạ chuyên nghiệp với vCard web động và tệp liên hệ di động.",
    sw: "Rahisisha uhifadhi wa anwani za kitaalamu kwa kutumia vCard za wavuti na faili za anwani za simu."
  }
};

// Execute subtitle replacement across post1.ts .. post10.ts
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const subs = SUBTITLE_TRANSLATIONS[fileIdx];
  if (!subs) return;

  let updatedCount = 0;
  Object.keys(subs).forEach(lang => {
    const localizedSub = subs[lang];
    // Regex pattern matching the subtitle field under the lang key in POST_X_DATA
    const langSectionRegex = new RegExp(`("${lang}":\\s*\\{[^}]*?"subtitle":\\s*")[^"]*(")`, 's');
    if (langSectionRegex.test(text)) {
      text = text.replace(langSectionRegex, `$1${localizedSub}$2`);
      updatedCount++;
    }
  });

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Updated post${fileIdx}.ts subtitles for ${updatedCount} languages.`);
});
