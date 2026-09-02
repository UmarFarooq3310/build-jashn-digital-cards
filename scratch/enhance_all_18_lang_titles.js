const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

const TITLES_18 = {
  6: {
    en: 'Online Invitation Cards with Live WhatsApp RSVP Tracking (2026)',
    ur: 'آن لائن ڈیجیٹل دعوت نامے اور لائیو واٹس ایپ آر ایس وی پی بنانے کی جامع گائیڈ',
    ar: 'دليل إنشاء بطاقات الدعوة الرقمية عبر الإنترنت مع تتبع الحضور المباشر عبر واتساب',
    es: 'Tarjetas de Invitación Digitales con Seguimiento de RSVP en Vivo por WhatsApp (2026)',
    fr: 'Faire-Part Numériques en Ligne avec Suivi des Réponses RSVP par WhatsApp (2026)',
    hi: 'लाइव व्हाट्सएप आरएसवीपी ट्रैकिंग के साथ ऑनलाइन डिजिटल निमंत्रण पत्र गाइड (2026)',
    zh: '在线电子请柬制作全攻略：集成 WhatsApp 实时 RSVP 宾客回执追踪（2026版）',
    pt: 'Convites Digitais Online com Rastreamento de RSVP em Tempo Real no WhatsApp (2026)',
    ru: 'Создание электронных приглашений онлайн с отслеживанием ответов в WhatsApp (2026)',
    de: 'Online-Einladungskarten mit Live-WhatsApp-RSVP-Verwaltung (Leitfaden 2026)',
    ja: 'WhatsAppリアルタイム出欠確認付きオンライン招待状作成ガイド（2026年版）',
    ko: '실시간 WhatsApp 참석 확인(RSVP) 기능을 갖춘 모바일 청첩장 제작 가이드 (2026)',
    it: 'Inviti Digitali Online con Tracciamento RSVP in Tempo Reale su WhatsApp (2026)',
    tr: 'Canlı WhatsApp LCV Takibi ile Çevrimiçi Dijital Davetiye Hazırlama Rehberi (2026)',
    id: 'Panduan Membuat Undangan Digital Online dengan Konfirmasi WhatsApp RSVP Real-Time (2026)',
    bn: 'লাইভ হোয়াটসঅ্যাপ আরএসভিপি ট্র্যাকিং সহ অনলাইন ডিজিটাল নিমন্ত্রণপত্র তৈরির গাইড (২০২৬)',
    vi: 'Thiết Kế Thiệp Mời Kỹ Thuật Số Trực Tuyến Tích Hợp Xác Nhận Tham Dự WhatsApp (2026)',
    sw: 'Kadi za Mialiko za Kidijitali zenye Ufuatiliaji wa Moja kwa Moja wa RSVP ya WhatsApp (2026)'
  },
  7: {
    en: 'How to Design Custom 3D Animated Wish Cards with Name, Photo & Audio',
    ur: 'سالگرہ، عید اور سالگرہ کے لیے نام، تصویر اور آڈیو کے ساتھ 3D وش کارڈز بنانے کا طریقہ',
    ar: 'كيفية تصميم بطاقات تهنئة ثلاثية الأبعاد متحركة مع الصور والأسماء والصوتيات',
    es: 'Cómo Diseñar Tarjetas de Felicitación Animadas en 3D Personalizadas con Nombre, Foto y Música',
    fr: 'Comment Créer des Cartes de Vœux Animées 3D Personnalisées avec Nom, Photo et Musique',
    hi: 'नाम, फोटो और संगीत के साथ कस्टम 3D एनिमेटेड विश कार्ड कैसे बनाएं',
    zh: '如何设计专属 3D 动态祝福卡：支持定制姓名、照片与背景音乐',
    pt: 'Como Criar Cartões de Felicitações Animados em 3D com Nome, Foto e Áudio',
    ru: 'Как создать анимированные 3D-открытки с именем, фотографией и музыкой',
    de: '3D-animierte Grußkarten mit Namen, Foto und Musik selbst gestalten',
    ja: '名前・写真・音楽付き3Dアニメーションお祝いカードのデザイン方法',
    ko: '이름, 사진, 배경음악을 넣은 맞춤형 3D 애니메이션 축하 카드 제작법',
    it: 'Come Creare Biglietti di Auguri Animati in 3D con Nome, Foto e Musica',
    tr: 'İsim, Fotoğraf ve Müzikli Özel 3D Animasyonlu Tebrik Kartı Tasarımı',
    id: 'Cara Mendesain Kartu Ucapan Animasi 3D Kustom dengan Nama, Foto, dan Musik',
    bn: 'নাম, ছবি এবং অডিও সহ কাস্টম ৩ডি অ্যানিমেটেড শুভেচ্ছা কার্ড তৈরির নিয়ম',
    vi: 'Cách Thiết Kế Thiệp Chúc Mừng 3D Hoạt Hình Kèm Tên, Ảnh và Nhạc Nền',
    sw: 'Jinsi ya Kubuni Kadi za Pongezi za 3D zenye Jina, Picha na Muziki'
  },
  8: {
    en: 'The Ultimate Guide to Global Holiday E-Cards: Christmas, Thanksgiving & New Year 2026',
    ur: 'عالمی تعطیلات اور سال نو کے لیے اینیمیٹڈ 3D ای کارڈز کی مکمل گائیڈ',
    ar: 'الدليل الشامل لبطاقات التهنئة الإلكترونية للمناسبات العالمية ورأس السنة الجديدة',
    es: 'Guía Completa de Tarjetas Electrónicas para Festividades Globales: Navidad y Año Nuevo 2026',
    fr: 'Guide Ultime des Cartes Virtuelles de Fêtes : Noël, Thanksgiving & Nouvel An 2026',
    hi: 'वैश्विक छुट्टियों के ई-कार्ड के लिए अंतिम गाइड: क्रिसमस और नया साल 2026',
    zh: '全球节日电子贺卡终极指南：圣诞节、感恩节与2026新年祝福',
    pt: 'Guia Definitivo de Cartões Virtuais para Festas Globais: Natal e Ano Novo 2026',
    ru: 'Полное руководство по электронным открыткам: Рождество, Новый Год 2026',
    de: 'Der ultimative Leitfaden für Feiertags-E-Cards: Weihnachten & Neujahr 2026',
    ja: '世界の祝日＆ホリデー電子カード完全ガイド：クリスマス＆2026年新年',
    ko: '글로벌 연말연시 모바일 카드 완벽 가이드: 크리스마스 & 2026년 새해',
    it: 'Guida Definitiva ai Biglietti Virtuali per le Feste: Natale e Capodanno 2026',
    tr: 'Yılbaşı ve Bayram Tebrik E-Kartları Rehberi: Yeni Yıl 2026',
    id: 'Panduan Lengkap E-Card Liburan Global: Natal & Tahun Baru 2026',
    bn: 'আন্তর্জাতিক ছুটির দিনের ই-কার্ড গাইড: ক্রিসমাস ও নতুন বছর ২০২৬',
    vi: 'Cẩm Nang Thiệp Điện Tử Cho Mùa Lễ Hội: Giáng Sinh & Năm Mới 2026',
    sw: 'Mwongozo Kamili wa Kadi za Sikukuu za Kidijitali: Krismasi na Mwaka Mpya 2026'
  },
  9: {
    en: 'How to Create Animated Birthday Wish Cards & Milestone Party Invitations Online',
    ur: 'سالگرہ کے اینیمیٹڈ وش کارڈز اور پارٹی دعوت نامے آن لائن بنانے کا آسان طریقہ',
    ar: 'طريقة تصميم بطاقات أعياد الميلاد المتحركة ودعوات الحفلات عبر الإنترنت',
    es: 'Cómo Crear Tarjetas de Cumpleaños Animadas e Invitaciones de Fiesta Online',
    fr: 'Comment Créer des Cartes d’Anniversaire Animées et Invitations de Fête en Ligne',
    hi: 'ऑनलाइन एनिमेटेड जन्मदिन कार्ड और पार्टी निमंत्रण कैसे बनाएं',
    zh: '在线制作动态生日祝福贺卡与里程碑派对请柬完整教程',
    pt: 'Como Criar Cartões de Aniversário Animados e Convites de Festa Online',
    ru: 'Как создать анимированные открытки на день рождения и приглашения на вечеринку',
    de: 'Animierte Geburtstagskarten und Party-Einladungen online gestalten',
    ja: 'オンラインでアニメーション付き誕生日カード＆パーティー招待状を作成する方法',
    ko: '온라인으로 생일 축하 애니메이션 카드 및 파티 초대장 만드는 법',
    it: 'Come Creare Biglietti di Compleanno Animati e Inviti per Feste Online',
    tr: 'Çevrimiçi Animasyonlu Doğum Günü Tebrik Kartı ve Parti Davetiyesi Hazırlama',
    id: 'Cara Membuat Kartu Ucapan Ulang Tahun Animasi & Undangan Pesta Online',
    bn: 'অনলাইনে অ্যানিমেটেড জন্মদিনের শুভেচ্ছা কার্ড ও পার্টি নিমন্ত্রণপত্র তৈরি',
    vi: 'Cách Tạo Thiệp Sinh Nhật Hoạt Hình & Thiệp Mời Tiệc Trực Tuyến',
    sw: 'Jinsi ya Kutengeneza Kadi za Siku ya Kuzaliwa na Mialiko ya Sherehe Mtandaoni'
  },
  10: {
    en: 'The Future of Networking: Smart Digital Business Cards with 1-Click .VCF Save',
    ur: 'نیٹ ورکنگ کا مستقبل: اسمارٹ ڈیجیٹل وزٹنگ کارڈز اور 1-کلک vCard سیو',
    ar: 'مستقبل التواصل المهني: بطاقات الأعمال الرقمية الذكية مع حفظ ملف VCF بضغطة زر',
    es: 'El Futuro del Networking: Tarjetas de Visita Digitales Inteligentes con Guardado .VCF',
    fr: 'L’Avenir du Réseautage : Cartes de Visite Numériques avec Sauvegarde .VCF en 1 Clic',
    hi: 'नेटवर्किंग का भविष्य: 1-क्लिक वीसीएफ सेव के साथ स्मार्ट डिजिटल बिजनेस कार्ड',
    zh: '商务社交的未来：支持一键保存 .VCF 通讯录的名片数字化转型',
    pt: 'O Futuro do Networking: Cartões de Visita Digitais com Salvamento .VCF em 1 Clique',
    ru: 'Будущее нетворкинга: Умные цифровые визитки с сохранением контакта .VCF в 1 клик',
    de: 'Die Zukunft des Networkings: Smarte digitale Visitenkarten mit 1-Klick-.VCF-Speicherung',
    ja: 'ネットワーキングの未来：1クリック.VCF保存機能付きスマートデジタル名刺',
    ko: '네트워킹의 미래: 1클릭 .VCF 연락처 저장을 지원하는 스마트 디지털 명함',
    it: 'Il Futuro del Networking: Biglietti da Visita Digitali con Salvataggio .VCF in 1 Clic',
    tr: 'İletişimin Geleceği: Tek Tıkla .VCF Rehbere Kaydedilen Akıllı Dijital Kartvizitler',
    id: 'Masa Depan Networking: Kartu Nama Digital Pintar dengan Simpan Kontak .VCF 1-Klik',
    bn: 'নেটওয়ার্কিংয়ের ভবিষ্যৎ: ১-ক্লিক ভিসিএফ সেভ সহ স্মার্ট ডিজিটাল বিজনেস কার্ড',
    vi: 'Tương Lai Của Kết Nối: Danh Thiếp Thông Minh Lưu Danh Bạ .VCF Chỉ Với 1 Chạm',
    sw: 'Mustakabali wa Mtandao: Kadi Mahiri za Kidijitali zenye Hifadhi ya .VCF kwa Mbofyo 1'
  },
  11: {
    en: 'Digital Invitation Etiquette: Master the Art of Sharing Invitations on WhatsApp & Social Media',
    ur: 'ڈیجیٹل کارڈ شیئرنگ کے آداب: واٹس ایپ اور سوشل میڈیا پر دعوت نامے بھیجنے کے اصول',
    ar: 'إتيكيت وآداب مشاركة بطاقات الدعوة الرقمية عبر واتساب ووسائل التواصل الاجتماعي',
    es: 'Etiqueta para Invitaciones Digitales: Consejos para Compartir en WhatsApp y Redes Sociales',
    fr: 'Étiquette des Invitations Numériques : Les Bonnes Pratiques sur WhatsApp et Réseaux Sociaux',
    hi: 'डिजिटल निमंत्रण शिष्टाचार: व्हाट्सएप और सोशल मीडिया पर कार्ड साझा करने के नियम',
    zh: '电子请柬分享礼仪全书：在 WhatsApp 与社交媒体中优雅发送邀请',
    pt: 'Etiqueta para Convites Digitais: Boas Práticas de Partilha no WhatsApp e Redes Sociais',
    ru: 'Этикет электронных приглашений: Как правильно делиться ими в WhatsApp и соцсетях',
    de: 'Digitale Einladungs-Etikette: Einladungen stilvoll über WhatsApp & Social Media teilen',
    ja: 'デジタル招待状のマナー：WhatsAppやSNSでスマートに共有する方法',
    ko: '모바일 청첩장 공유 에티켓: WhatsApp 및 SNS 전달 가이드',
    it: 'Galateo degli Inviti Digitali: Come Condividerli su WhatsApp e Social Media',
    tr: 'Dijital Davetiye Adabı: WhatsApp ve Sosyal Medyada Davetiye Paylaşım Kuralları',
    id: 'Etika Undangan Digital: Cara Tepat Membagikan Undangan di WhatsApp & Media Sosial',
    bn: 'ডিজিটাল নিমন্ত্রণ সৌজন্য: হোয়াটসঅ্যাপ ও সোশ্যাল মিডিয়ায় কার্ড শেয়ারিংয়ের নিয়ম',
    vi: 'Phép Lịch Sự Khi Gửi Thiệp Điện Tử: Quy Tắc Chia Sẻ Qua WhatsApp & Mạng Xã Hội',
    sw: 'Maadili ya Mialiko ya Kidijitali: Mbinu za Kutuma Mialiko Kwenye WhatsApp na Mitandao'
  },
  12: {
    en: 'Creative Mehndi & Dholki Digital Card Ideas: Vibrant Themes, Songs & Urdu Wording',
    ur: 'مہندی اور ڈھولکی کے اینیمیٹڈ کارڈز: موسیقی، روایتی تھیمز اور اردو شاعری کے آئیڈیاز',
    ar: 'أفكار بطاقات الحناء والدولكي الرقمية: ثيمات فلكلورية وموسيقى وعبارات تراثية',
    es: 'Ideas Creativas para Tarjetas Digitales de Mehndi y Dholki: Diseños Vibrantes y Música',
    fr: 'Idées Créatives de Faire-Part Numériques pour Mehndi et Dholki : Thèmes Festifs & Musique',
    hi: 'मेहंदी और ढोलकी डिजिटल कार्ड के रचनात्मक विचार: जीवंत थीम और लोकगीत',
    zh: 'Mehndi 曼海蒂与 Dholki 欢庆之夜电子请柬创意设计：传统主题与配乐',
    pt: 'Ideias Criativas de Convites Digitais para Mehndi e Dholki: Temas Vibrantes e Músicas',
    ru: 'Идеи цифровых приглашений на Мехнди и Дхолки: яркие темы, музыка и традиции',
    de: 'Kreative digitale Mehndi- & Dholki-Einladungen: Farbenfrohe Themen und Musikideen',
    ja: 'Mehndi＆Dholkiデジタルカードのクリエイティブなアイデア：テーマと音楽',
    ko: '멘디 & 돌키 축제 모바일 카드 아이디어: 화려한 테마와 전통 음악',
    it: 'Idee Creative per Biglietti Digitali Mehndi e Dholki: Temi Vivaci e Musica',
    tr: 'Kına Gecesi (Mehndi) İçin Yaratıcı Dijital Davetiye Fikirleri: Müzik ve Temalar',
    id: 'Ide Kreatif Undangan Digital Malam Mehndi & Henna: Tema Meriah & Musik Tradisional',
    bn: 'মেহেন্দী ও ঢোলকি ডিজিটাল কার্ডের চমৎকার আইডিয়া: লোকসঙ্গীত ও উৎসবের থিম',
    vi: 'Ý Tưởng Thiệp Kỹ Thuật Số Cho Đêm Hội Mehndi & Dholki: Chủ Đề Sinh Động & Âm Nhạc',
    sw: 'Mawazo ya Kadi za Kidijitali za Mehndi na Dholki: Mandhari ya Rangi na Muziki'
  },
  13: {
    en: 'Best Eid ul Adha & Qurbani Wishes: Animated Cards, Duas & Multilingual Greetings',
    ur: 'عید الاضحیٰ اور قربانی کے بہترین وش کارڈز: دعائیں، اینیمیشن اور کثیر لسانی پیغامات',
    ar: 'أفضل بطاقات تهنئة عيد الأضحى المبارك: أدعية مأثورة ورسائل تهنئة متعددة اللغات',
    es: 'Las Mejores Felicitaciones para Eid al-Adha: Tarjetas Animadas, Duas y Mensajes',
    fr: 'Meilleurs Vœux pour l’Aïd el-Kébir : Cartes Animées, Invocations et Textes Multilingues',
    hi: 'ईद उल-अजहा और कुर्बानी की शुभकामनाएं: एनिमेटेड कार्ड, दुआएं और बहुभाषी संदेश',
    zh: '古尔邦节（宰牲节）专属 3D 电子贺卡与祈祷祝福语精选',
    pt: 'Melhores Votos para Eid ul Adha: Cartões Animados, Orações e Mensagens Bilíngues',
    ru: 'Лучшие поздравления с праздником Курбан-байрам (Эйд аль-Адха): Открытки и дуа',
    de: 'Die besten Eid ul-Adha & Kurban-Grüße: 3D-animierte Karten, Bittgebete und Texte',
    ja: 'Eid ul Adha（犠牲祭）お祝いデジタルカード：アニメーション＆多言語メッセージ',
    ko: '이드 알아드하(Eid ul Adha) 축하 모바일 카드: 3D 애니메이션 & 축복 메시지',
    it: 'I Migliori Auguri per Eid al-Adha: Biglietti Animati, Preghiere e Messaggi Multilingue',
    tr: 'En Güzel Kurban Bayramı Tebrik Mesajları: 3D Animasyonlu Kartlar ve Dualar',
    id: 'Kumpulan Ucapan Selamat Hari Raya Idul Adha & Qurban: Kartu Animasi 3D dan Doa',
    bn: 'পবিত্র ঈদুল আজহা ও কোরবানির শুভেচ্ছা কার্ড: দোয়া এবং বহুভাষিক বার্তা',
    vi: 'Lời Chúc Lễ Eid ul Adha Ý Nghĩa: Thiệp Hoạt Hình 3D, Lời Cầu Nguyện & Lời Chúc',
    sw: 'Kadi Bora za Eid ul Adha na Ujumbe wa Sikukuu ya Kuchinja: Kadi za 3D na Dua'
  },
  14: {
    en: 'Smart Digital vCards for Doctors, Lawyers & Engineers: Professional Use Cases',
    ur: 'ڈاکٹرز، وکلاء اور انجینئرز کے لیے اسمارٹ ڈیجیٹل وزٹنگ کارڈز کے فوائد اور سیٹ اپ',
    ar: 'بطاقات الأعمال الرقمية الذكية للأطباء والمحامين والمهندسين: المزايا وطريقة الاستخدام',
    es: 'vCards Digitales Inteligentes para Médicos, Abogados e Ingenieros: Casos de Éxito',
    fr: 'vCards Numériques pour Médecins, Avocats et Ingénieurs : Usages Professionnels',
    hi: 'डॉक्टरों, वकीलों और इंजीनियरों के लिए स्मार्ट डिजिटल वीकार्ड: व्यावसायिक लाभ',
    zh: '专为医生、律师与工程师量身打造的智能电子名片（vCard）解决方案',
    pt: 'vCards Digitais Inteligentes para Médicos, Advogados e Engenheiros: Benefícios',
    ru: 'Умные цифровые визитки для врачей, юристов и инженеров: Профессиональные решения',
    de: 'Smarte digitale vCards für Ärzte, Anwälte und Ingenieure: Professionelle Vorteile',
    ja: '医師・弁護士・エンジニア向けスマートデジタル名刺（vCard）：ビジネス活用事例',
    ko: '의사, 변호사, 엔지니어를 위한 맞춤형 스마트 디지털 명함(vCard) 활용 가이드',
    it: 'vCard Digitali Intelligenti per Medici, Avvocati e Ingegneri: Soluzioni Professionali',
    tr: 'Doktorlar, Avukatlar ve Mühendisler İçin Akıllı Dijital Kartvizit (vCard) Rehberi',
    id: 'vCard Digital Pintar untuk Dokter, Pengacara & Insinyur: Manfaat Profesional',
    bn: 'ডাক্তার, আইনজীবী ও প্রকৌশলীদের জন্য স্মার্ট ডিজিটাল বিজনেস কার্ড ব্যবহারের সুবিধা',
    vi: 'Danh Thiếp Kỹ Thuật Số (vCard) Cho Bác Sĩ, Luật Sư & Kỹ Sư: Ứng Dụng Chuyên Nghiệp',
    sw: 'Kadi Mahiri za vCard kwa Madaktari, Mawakili na Wahandisi: Faida za Kitaalamu'
  },
  15: {
    en: 'How to Write Heartfelt Wedding Anniversary Wishes & Create Animated Couple Cards',
    ur: 'شادی کی سالگرہ کے پرخلوص پیغامات اور اینیمیٹڈ جوڑی کارڈز بنانے کا گائیڈ',
    ar: 'أجمل عبارات تهنئة ذكرى الزواج وكيفية تصميم بطاقات متحركة رومانسية للزوجين',
    es: 'Cómo Redactar Felicitaciones de Aniversario de Boda y Crear Tarjetas Románticas en 3D',
    fr: 'Rédiger des Vœux d’Anniversaire de Mariage et Créer des Cartes Animées pour Couples',
    hi: 'शादी की सालगिरह के दिल को छू लेने वाले संदेश और एनिमेटेड कपल कार्ड कैसे बनाएं',
    zh: '如何撰写感人至深的结婚纪念日祝福语并定制情侣浪漫 3D 电子贺卡',
    pt: 'Como Escrever Mensagens de Aniversário de Casamento e Criar Cartões Animados',
    ru: 'Как написать душевные поздравления с годовщиной свадьбы и создать открытку для пары',
    de: 'Herzerwärmende Glückwünsche zum Hochzeitstag verfassen & romantische Karten erstellen',
    ja: '心温まる結婚記念日のメッセージの書き方とロマンチックな3Dカード作成法',
    ko: '감동적인 결혼기념일 축하 문구 작성법 및 부부 맞춤형 3D 애니메이션 카드 제작',
    it: 'Come Scrivere Auguri di Anniversario di Nozze e Creare Biglietti Romantici in 3D',
    tr: 'Evlilik Yıldönümü Tebrik Mesajları Yazma ve Çiftlere Özel 3D Kart Hazırlama',
    id: 'Cara Menulis Ucapan Ulang Tahun Pernikahan Romantis & Membuat Kartu Animasi 3D',
    bn: 'বিবাহবার্ষিকীর রোমান্টিক শুভেচ্ছা বার্তা লেখা এবং কাপল কার্ড তৈরির গাইড',
    vi: 'Cách Viết Lời Chúc Kỷ Niệm Ngày Cưới Ý Nghĩa & Thiết Kế Thiệp Đôi Hoạt Hình',
    sw: 'Jinsi ya Kuandika Jumbe za Maadhimisho ya Harusi na Kubuni Kadi za Wanandoa za 3D'
  },
  16: {
    en: 'Baby Shower & Aqiqah Digital Invitation Ideas: Cute Themes & Bilingual Duas',
    ur: 'عقیقہ اور بیبی شاور کے ڈیجیٹل کارڈز: خوبصورت تھیمز، اسلامی دعائیں اور الفاظ',
    ar: 'أفكار دعوات العقيقة وحفلات استقبال المولود: ثيمات مميزة وأدعية باللغتين',
    es: 'Ideas de Invitaciones Digitales para Baby Shower y Aqiqah: Diseños Tiernos y Bendiciones',
    fr: 'Idées de Faire-Part Numériques pour Baby Shower & Aqiqah : Thèmes Adorables & Duas',
    hi: 'बेबी शॉवर और अकीका डिजिटल कार्ड के विचार: सुंदर थीम और द्विभाषी दुआएं',
    zh: '宝宝满月宴、新生儿迎新派对（Aqiqah）电子请柬创意与双语祝福文案',
    pt: 'Ideias de Convites Digitais para Chá de Bebê e Aqiqah: Temas Encantadores e Orações',
    ru: 'Идеи электронных приглашений на Акику и Бэби Шауэр: Милые темы и молитвы',
    de: 'Baby-Shower- & Aqiqah-Einladungen digital gestalten: Schöne Themen & Segenswünsche',
    ja: 'ベビーシャワー＆Aqiqahデジタル招待状のアイデア：かわいいテーマと祝福メッセージ',
    ko: '베이비 샤워 및 아기 탄생(Aqiqah) 모바일 초대장 아이디어: 귀여운 테마와 축복 문구',
    it: 'Idee per Inviti Digitali Baby Shower e Aqiqah: Temi Deliziosi e Benedizioni',
    tr: 'Baby Shower ve Akika İçin Dijital Davetiye Fikirleri: Sevimli Temalar ve Dualar',
    id: 'Ide Undangan Digital Aqiqah & Baby Shower: Tema Menggemaskan dan Doa Syukur',
    bn: 'আকিকা ও বেবি শাওয়ার ডিজিটাল নিমন্ত্রণপত্রের আইডিয়া: সুন্দর থিম ও ইসলামিক দোয়া',
    vi: 'Ý Tưởng Thiệp Mời Tiệc Đầy Tháng, Thôi Nôi & Chào Đón Em Bé: Chủ Đề Dễ Thương',
    sw: 'Mawazo ya Kadi za Kidijitali za Aqiqah na Baby Shower: Mandhari Nzuri na Dua'
  },
  17: {
    en: 'How to Create Free Digital Wedding Invitations Online in 2026 (Step-by-Step)',
    ur: 'مفت ڈیجیٹل شادی کا کارڈ آن لائن بنانے کا مکمل مرحلہ وار طریقہ',
    ar: 'كيفية إنشاء بطاقة دعوة زفاف رقمية مجاناً عبر الإنترنت خطوة بخطوة',
    es: 'Cómo Crear Invitaciones de Boda Digitales Gratis Online en 2026 (Paso a Paso)',
    fr: 'Comment Créer un Faire-Part de Mariage Numérique Gratuit en Ligne en 2026 (Tutoriel)',
    hi: '2026 में ऑनलाइन मुफ्त डिजिटल शादी का कार्ड कैसे बनाएं (चरण-दर-चरण गाइड)',
    zh: '2026 免费在线制作 3D 动态婚礼电子请柬新手详细教程（图文详解）',
    pt: 'Como Criar Convites de Casamento Digitais Gratuitos Online em 2026 (Passo a Passo)',
    ru: 'Как бесплатно создать электронное свадебное приглашение онлайн в 2026 году',
    de: 'Kostenlose digitale Hochzeitseinladungen 2026 online erstellen (Schritt für Schritt)',
    ja: '2026年版 無料で作成できるオンライン結婚式招待状チュートリアル',
    ko: '2026년 무료 온라인 모바일 청첩장 만들기 (단계별 완벽 튜토리얼)',
    it: 'Come Creare Inviti di Matrimonio Digitali Gratuiti Online nel 2026 (Passo Passo)',
    tr: '2026 Yılında Çevrimiçi Ücretsiz Dijital Düğün Davetiyesi Nasıl Hazırlanır (Adım Adım)',
    id: 'Cara Membuat Undangan Pernikahan Digital Gratis Online di 2026 (Langkah Demi Langkah)',
    bn: '২০২৬ সালে অনলাইনে বিনামূল্যে ডিজিটাল বিয়ের কার্ড তৈরির সহজ নিয়ম',
    vi: 'Cách Tự Làm Thiệp Cưới Kỹ Thuật Số Miễn Phí Trực Tuyến Năm 2026 (Hướng Dẫn Chi Tiết)',
    sw: 'Jinsi ya Kutengeneza Kadi ya Harusi ya Kidijitali ya Bure Mtandaoni 2026 (Hatua kwa Hatua)'
  },
  18: {
    en: 'Ramadan Mubarak Wishes, Duas & Iftar Party Invitations in 2026',
    ur: 'رمضان المبارک کے وش کارڈز، افطار پارٹی دعوت نامے اور دعاؤں کی گائیڈ',
    ar: 'بطاقات تهنئة شهر رمضان المبارك ودعوات موائد الإفطار وأدعية الشهر الفضيل',
    es: 'Felicitaciones de Ramadán Mubarak, Duas e Invitaciones para Fiestas de Iftar 2026',
    fr: 'Vœux de Ramadan Moubarak, Invocations et Invitations aux Repas d’Iftar 2026',
    hi: 'रमजान मुबारक की शुभकामनाएं, दुआएं और इफ्तार पार्टी निमंत्रण पत्र 2026',
    zh: '2026 斋月吉庆（Ramadan Mubarak）3D 电子贺卡与开斋宴（Iftar）请柬精选',
    pt: 'Mensagens de Ramadan Mubarak, Orações e Convites para Festas de Iftar 2026',
    ru: 'Поздравления с Рамаданом, дуа и приглашения на ифтар в 2026 году',
    de: 'Ramadan Mubarak Wünsche, Bittgebete & Einladungen zum Iftar-Essen 2026',
    ja: 'ラマダン・ムバラクのお祝いカード、祈り、イフタール招待状（2026年）',
    ko: '2026 라마단 무바라크 축하 모바일 카드, 기도문 및 이프타르 초대장',
    it: 'Auguri di Ramadan Mubarak, Preghiere e Inviti per Cene di Iftar 2026',
    tr: 'Ramazan-ı Şerif Tebrik Kartları, Dualar ve İftar Davetiyesi Örnekleri 2026',
    id: 'Kumpulan Ucapan Ramadhan Mubarak, Doa Puasa & Undangan Buka Bersama (Bukber) 2026',
    bn: 'পবিত্র মাহে রমজান মোবারক শুভেচ্ছা কার্ড ও ইফতার মাহফিলের দাওয়াতপত্র ২০২৬',
    vi: 'Lời Chúc Tháng Ramadan Mubarak Ý Nghĩa, Lời Cầu Nguyện & Thiệp Mời Tiệc Iftar 2026',
    sw: 'Kadi za Ramadhani Mubarak, Dua na Mialiko ya Futari (Iftar) 2026'
  },
  19: {
    en: 'Graduation and Farewell Digital Cards: Wishes & Milestone Party Ideas',
    ur: 'گریجویشن مبارک اور الوداعی تقریب کے اینیمیٹڈ ڈیجیٹل کارڈز اور آئیڈیاز',
    ar: 'بطاقات التخرج وحفلات الوداع الرقمية: عبارات تهنئة وأفكار دعوات الحفلات',
    es: 'Tarjetas Digitales de Graduación y Despedida: Felicitaciones e Ideas para Fiestas',
    fr: 'Cartes Numériques de Remise de Diplôme et Fêtes de Départ : Idées & Vœux',
    hi: 'दीक्षांत समारोह और विदाई डिजिटल कार्ड: शुभकामनाएं और पार्टी विचार',
    zh: '毕业季与欢送会专属 3D 电子请柬与毕业祝福语创意合集',
    pt: 'Cartões Digitais de Formatura e Despedida: Votos de Sucesso e Ideias de Festas',
    ru: 'Электронные открытки на выпускной и прощальную вечеринку: Поздравления и идеи',
    de: 'Digitale Karten für Abschluss & Abschied: Glückwünsche und Party-Ideen',
    ja: '卒業祝い＆送別会デジタルカード：メッセージとおしゃれなパーティー演出',
    ko: '졸업 축하 및 송별회 모바일 카드: 축하 문구와 파티 기획 아이디어',
    it: 'Biglietti Digitali per Feste di Laurea e Addii: Auguri e Idee per la Festa',
    tr: 'Mezuniyet ve Veda Partisi Dijital Tebrik Kartları: Kutlama Mesajları ve Fikirler',
    id: 'Kartu Digital Wisuda & Perpisahan: Ucapan Selamat dan Ide Pesta Kelulusan',
    bn: 'গ্র্যাজুয়েশন এবং বিদায়ী সংবর্ধনা ডিজিটাল শুভেচ্ছা কার্ডের আইডিয়া',
    vi: 'Thiệp Kỹ Thuật Số Lễ Tốt Nghiệp & Tiệc Chia Tay: Lời Chúc & Ý Tưởng Tổ Chức',
    sw: 'Kadi za Kidijitali za Mahafali na Sherehe za Kuaga: Pongezi na Mawazo ya Sherehe'
  },
  20: {
    en: 'WhatsApp RSVP & Wedding Guest Management: Complete Host Guide for 500+ Attendees',
    ur: 'واٹس ایپ آر ایس وی پی اور شادی کے مہمانوں کی مکمل مینجمنٹ گائیڈ برائے 500+ مہمان',
    ar: 'الدليل الشامل لتنظيم وإدارة حضور ضيوف الزفاف عبر واتساب لأكثر من 500 ضيف',
    es: 'Gestión de Invitados de Boda y RSVP por WhatsApp: Guía Completa para Más de 500 Asistentes',
    fr: 'Gestion des Invités de Mariage et RSVP WhatsApp : Guide Complet pour Plus de 500 Convives',
    hi: 'व्हाट्सएप आरएसवीपी और शादी के मेहमान प्रबंधन: 500+ मेहमानों के लिए संपूर्ण मेजबान गाइड',
    zh: '500+ 超大型婚宴宾客智能管理全指南：基于 WhatsApp RSVP 的全流程把控',
    pt: 'Gestão de Convidados de Casamento e RSVP no WhatsApp: Guia Completo para 500+ Pessoas',
    ru: 'Управление списками гостей на свадьбе через WhatsApp RSVP: Руководство для 500+ гостей',
    de: 'WhatsApp-RSVP & Gästemanagement für Hochzeiten: Leitfaden für 500+ Gäste',
    ja: '500人規模の結婚式出欠管理をWhatsAppでスマートに完結させる完全マニュアル',
    ko: '500명 이상 대규모 웨딩 하객을 위한 WhatsApp RSVP 실전 관리 가이드',
    it: 'Gestione degli Invitati di Nozze e RSVP su WhatsApp: Guida Completa per 500+ Ospiti',
    tr: '500+ Kişilik Düğünlerde WhatsApp LCV ve Davetli Yönetimi Rehberi',
    id: 'Panduan Lengkap Manajemen Tamu Pernikahan & WhatsApp RSVP untuk 500+ Undangan',
    bn: '৫০০+ অতিথির বিয়ের জন্য হোয়াটসঅ্যাপ আরএসভিপি ও মেহমান ম্যানেজমেন্টের সহজ নির্দেশিকা',
    vi: 'Quản Lý Danh Sách 500+ Khách Mời Đám Cưới & Xác Nhận Tham Dự Qua WhatsApp Toàn Diện',
    sw: 'Usimamizi Kamili wa Wageni 500+ wa Harusi na Uthibitisho wa RSVP ya WhatsApp'
  }
};

Object.entries(TITLES_18).forEach(([idxStr, titlesDict]) => {
  const postIdx = parseInt(idxStr, 10);
  const filePath = path.join(targetDir, `post${postIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const slugMatch = content.match(/export const POST_\d+_SLUG = "([^"]+)";/);
  const slug = slugMatch ? slugMatch[1] : '';

  const dataMatch = content.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ([\s\S]*?);\n\nexport const POST_\d+_CONTENT/);
  if (!dataMatch) return;

  let dataMap = JSON.parse(dataMatch[1]);
  Object.entries(titlesDict).forEach(([lang, title]) => {
    if (dataMap[lang]) {
      dataMap[lang].title = title;
      dataMap[lang].seoTitle = `${title} — Cardzy`;
    }
  });

  const contentMatch = content.match(/export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ([\s\S]*?);\n$/);
  if (!contentMatch) return;

  let contentMap = JSON.parse(contentMatch[1]);
  Object.entries(titlesDict).forEach(([lang, title]) => {
    if (contentMap[lang] && contentMap[lang].sections && contentMap[lang].sections[0]) {
      contentMap[lang].sections[0].title = title;
    }
  });

  const tsCode = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${postIdx}_SLUG = "${slug}";

export const POST_${postIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${postIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;

  fs.writeFileSync(filePath, tsCode, 'utf8');
  console.log(`Updated post${postIdx}.ts with full 18-language localized titles.`);
});

console.log('Successfully updated posts 6-20 with full 18-language titles!');
