'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Heart, Send, Wand2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cn } from '@/lib/utils'

const MAGIC_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: {
    en: 'Back to Guides',
    ur: 'گائیڈز پر واپس جائیں',
    ar: 'العودة إلى الأدلة',
    es: 'Volver a las Guías',
    fr: 'Retour aux Guides',
    hi: 'वापस गाइड पर जाएं',
    zh: '返回指南列表',
    pt: 'Voltar para os Guias',
    ru: 'Назад к руководствам',
    de: 'Zurück zu den Anleitungen',
    ja: 'ガイド一覧に戻る',
    ko: '가이드 목록으로 돌아가기',
    it: 'Torna alle Guide',
    tr: 'Rehberlere Dön',
    id: 'Kembali ke Panduan',
    bn: 'গাইডে ফিরে যান',
    vi: 'Quay Lại Hướng Dẫn',
    sw: 'Rudi kwenye Miongozo',
  },
  badge: {
    en: 'Magic Links & Live Tracking',
    ur: 'میجک لنکس اور لائیو ٹریکنگ',
    ar: 'الروابط السحرية والتتبع المباشر',
    es: 'Enlaces Mágicos y Seguimiento',
    fr: 'Liens Magiques et Suivi',
    hi: 'मैजिक लिंक और लाइव ट्रैकिंग',
    zh: '魔法链接与实时追踪',
    pt: 'Links Mágicos e Rastreamento',
    ru: 'Волшебные ссылки и трекинг',
    de: 'Magic Links & Live-Tracking',
    ja: 'マジックリンク＆リアルタイム追跡',
    ko: '매직 링크 및 실시간 추적',
    it: 'Link Magici e Tracciamento',
    tr: 'Sihirli Bağlantılar ve Canlı Takip',
    id: 'Tautan Ajaib & Pelacakan Langsung',
    bn: 'ম্যাজিক লিঙ্ক ও লাইভ ট্র্যাকিং',
    vi: 'Liên Kết Kỳ Diệu & Theo Dõi Trực Tiếp',
    sw: 'Viungo vya Kichawi na Ufuatiliaji',
  },
  title: {
    en: 'How to Use Magic Links for Digital Cards & Invitations',
    ur: 'ڈیجیٹل کارڈز اور دعوت ناموں کے لیے میجک لنکس کیسے استعمال کریں',
    ar: 'كيفية استخدام الروابط السحرية للبطاقات والدعوات الرقمية',
    es: 'Cómo Usar los Enlaces Mágicos para Tarjetas e Invitaciones Digitales',
    fr: 'Comment Utiliser les Liens Magiques pour les Cartes et Invitations Numériques',
    hi: 'डिजिटल कार्ड और आमंत्रणों के लिए मैजिक लिंक का उपयोग कैसे करें',
    zh: '如何使用数字卡片与邀请函的魔法链接',
    pt: 'Como Usar Links Mágicos para Cartões e Convites Digitais',
    ru: 'Как использовать волшебные ссылки для цифровых открыток и приглашений',
    de: 'So nutzen Sie Magic Links für digitale Karten & Einladungen',
    ja: 'デジタルカード＆招待状でのマジックリンク活用ガイド',
    ko: '디지털 카드와 초대장을 위한 매직 링크 사용법',
    it: 'Come Usare i Link Magici per Biglietti e Inviti Digitali',
    tr: 'Dijital Kartlar ve Davetiyeler İçin Sihirli Bağlantılar Nasıl Kullanılır',
    id: 'Cara Menggunakan Tautan Ajaib untuk Kartu & Undangan Digital',
    bn: 'ডিজিটাল কার্ড ও ইনভিটেশনের জন্য কীভাবে ম্যাজিক লিঙ্ক ব্যবহার করবেন',
    vi: 'Cách Sử Dụng Liên Kết Kỳ Diệu Cho Thiệp & Lời Mời Kỹ Thuật Số',
    sw: 'Jinsi ya Kutumia Viungo vya Kichawi kwa Kadi za Kidijitali na Mialiko',
  },
  publishedDate: {
    en: 'Published September 21, 2026',
    ur: 'شائع ہوا: 21 ستمبر 2026',
    ar: 'تاريخ النشر: 21 سبتمبر 2026',
    es: 'Publicado el 21 de septiembre de 2026',
    fr: 'Publié le 21 septembre 2026',
    hi: 'प्रकाशित: 21 सितंबर 2026',
    zh: '发布于 2026年9月21日',
    pt: 'Publicado em 21 de setembro de 2026',
    ru: 'Опубликовано 21 сентября 2026 г.',
    de: 'Veröffentlicht am 21. September 2026',
    ja: '2026年9月21日公開',
    ko: '2026년 9월 21일 작성됨',
    it: 'Pubblicato il 21 settembre 2026',
    tr: 'Yayınlanma: 21 Eylül 2026',
    id: 'Diterbitkan 21 September 2026',
    bn: 'প্রকাশের তারিখ: ২১ সেপ্টেম্বর, ২০২৬',
    vi: 'Đăng ngày 21 tháng 9 năm 2026',
    sw: 'Ilichapishwa 21 Septemba 2026',
  },
  readTime: {
    en: '3 min read',
    ur: '3 منٹ مطالعہ',
    ar: '3 دقائق قراءة',
    es: '3 min de lectura',
    fr: '3 min de lecture',
    hi: '3 मिनट का पाठ',
    zh: '3 分钟阅读',
    pt: '3 min de leitura',
    ru: '3 мин чтения',
    de: '3 Min. Lesezeit',
    ja: '3分で読める',
    ko: '3분 소요',
    it: '3 min di lettura',
    tr: '3 dk okuma',
    id: '3 menit baca',
    bn: '৩ মিনিট পাঠ',
    vi: '3 phút đọc',
    sw: 'dakika 3 za kusoma',
  },
  author: {
    en: 'By Umar Farooq',
    ur: 'تحریر: عمر فاروق',
    ar: 'بقلم عمر فاروق',
    es: 'Por Umar Farooq',
    fr: 'Par Umar Farooq',
    hi: 'उमर फारूक द्वारा',
    zh: 'Umar Farooq 撰写',
    pt: 'Por Umar Farooq',
    ru: 'Автор: Умар Фарук',
    de: 'Von Umar Farooq',
    ja: 'Umar Farooqによる執筆',
    ko: 'Umar Farooq 작성',
    it: 'Di Umar Farooq',
    tr: 'Umar Farooq Tarafından',
    id: 'Oleh Umar Farooq',
    bn: 'উমর ফারুক কর্তৃক',
    vi: 'Bởi Umar Farooq',
    sw: 'Na Umar Farooq',
  },
  introP1: {
    en: 'Say goodbye to wondering if your guest received your invitation or read your wish. With Cardzy’s Magic Links feature, every digital card you share comes with its own real-time view tracking and interactive 3D unboxing experience.',
    ur: 'اب یہ سوچنے کی ضرورت نہیں کہ مہمان کو آپ کا دعوت نامہ ملا یا انہوں نے آپ کی مبارکباد پڑھی یا نہیں۔ کارڈزی کے میجک لنکس کے ذریعے آپ کا ہر ڈیجیٹل کارڈ ریئل ٹائم ویو ٹریکنگ اور دلکش تھری ڈی ان باکسنگ کے ساتھ شیئر ہوتا ہے۔',
    ar: 'وداعاً للشك في استلام الضيف لدعوتك أو قراءة تهنئتك. مع ميزة الروابط السحرية في Cardzy، تأتي كل بطاقة بتتبع مباشر لفتحها وتجربة تفاعلية رائعة.',
    es: 'Dile adiós a la incertidumbre de saber si tu invitado recibió la invitación. Con los Enlaces Mágicos de Cardzy, cada tarjeta digital cuenta con seguimiento de vistas en tiempo real y una experiencia interactiva.',
    fr: 'Ne vous demandez plus si votre invité a reçu votre invitation. Avec les Liens Magiques de Cardzy, chaque carte numérique inclut un suivi en temps réel et une expérience interactive en 3D.',
    hi: 'अब यह सोचने की ज़रूरत नहीं है कि मेहमान को आपका कार्ड मिला या नहीं। Cardzy के मैजिक लिंक के साथ हर कार्ड रियल-टाइम व्यू ट्रैकिंग के साथ आता है।',
    zh: '告别对宾客是否收到请柬或阅览祝福的疑虑。借助 Cardzy 魔法链接功能，您分享的每张数字卡片都自带实时阅读回执与沉浸式 3D 开箱体验。',
    pt: 'Diga adeus à dúvida se o convidado recebeu seu convite. Com os Links Mágicos do Cardzy, cada cartão digital conta com rastreamento de visualização em tempo real.',
    ru: 'Больше не нужно гадать, получил ли гость приглашение. С функцией Magic Links в Cardzy каждая открытка отправляется с отслеживанием прочтения в реальном времени.',
    de: 'Kein Rätselraten mehr, ob Ihre Einladung ankam. Mit Magic Links von Cardzy erhält jede Karte ein Echtzeit-View-Tracking und ein interaktives 3D-Unboxing.',
    ja: 'ゲストが招待状を受け取ったかどうか悩む必要はもうありません。Cardzyのマジックリンクなら、リアルタイムの閲覧追跡と3D演出が楽しめます。',
    ko: '하객이 초대장을 받았는지 고민하지 마세요. Cardzy 매जिक 링크는 실시간 열람 확인과 멋진 3D 언박싱 경험을 제공합니다.',
    it: 'Dì addio al dubbio se l\'ospite ha ricevuto il tuo invito. Con i Link Magici di Cardzy, ogni biglietto ha un tracciamento delle visualizzazioni in tempo reale.',
    tr: 'Misafirinizin davetiyeyi alıp almadığını merak etmeye son. Cardzy Sihirli Bağlantılar ile her dijital kart gerçek zamanlı görüntüleme takibiyle paylaşılır.',
    id: 'Tidak perlu lagi bertanya-tanya apakah tamu Anda telah membaca kartu. Dengan Tautan Ajaib Cardzy, setiap kartu dilengkapi pelacakan status buka secara langsung.',
    bn: 'অতিথি আমন্ত্রণপত্র পেয়েছেন কিনা তা নিয়ে আর ভাবতে হবে না। Cardzy-র ম্যাজিক লিংকের মাধ্যমে প্রতিটি কার্ড রিয়েল-টাইম ভিউ ট্র্যাকিং সুবিধা পায়।',
    vi: 'Không còn phải băn khoăn liệu khách mời đã xem thiệp chưa. Với Liên Kết Kỳ Diệu của Cardzy, mỗi tấm thiệp đều có tính năng theo dõi lượt xem theo thời gian thực.',
    sw: 'Sema kwaheri kwa kujiuliza ikiwa mgeni wako alipokea mwaliko. Viungo vya Kichawi vya Cardzy vinajumuisha ufuatiliaji wa papo hapo wa utazamaji.',
  },
  sec1Title: {
    en: '1. What is a Magic Link?',
    ur: '1. میجک لنک کیا ہے؟',
    ar: '1. ما هو الرابط السحري؟',
    es: '1. ¿Qué es un Enlace Mágico?',
    fr: '1. Qu\'est-ce qu\'un Lien Magique ?',
    hi: '1. मैजिक लिंक क्या है?',
    zh: '1. 什么是魔法链接？',
    pt: '1. O que é um Link Mágico?',
    ru: '1. Что такое волшебная ссылка?',
    de: '1. Was ist ein Magic Link?',
    ja: '1. マジックリンクとは？',
    ko: '1. 매직 링크란 무엇인가요?',
    it: '1. Cos\'è un Link Magico?',
    tr: '1. Sihirli Bağlantı Nedir?',
    id: '1. Apa itu Tautan Ajaib?',
    bn: '১. ম্যাজিক লিঙ্ক কী?',
    vi: '1. Liên Kết Kỳ Diệu Là Gì?',
    sw: '1. Kiungo cha Kichawi ni nini?',
  },
  sec1Bullet1: {
    en: 'A personalized interactive URL generated specifically for an individual recipient.',
    ur: 'ایک ذاتی اور انٹرایکٹو لنک جو خاص طور پر کسی ایک وصول کنندہ کے نام پر تیار کیا جاتا ہے۔',
    ar: 'رابط تفاعلي مخصص يتم إنشاؤه خصيصاً لمستلم محدد باسمه.',
    es: 'Una URL personalizada generada específicamente para un destinatario individual.',
    fr: 'Une URL interactive personnalisée générée pour un destinataire individuel.',
    hi: 'एक व्यक्तिगत इंटरैक्टिव URL जो विशेष रूप से किसी एक प्राप्तकर्ता के लिए बनाया जाता है।',
    zh: '为指定收件人量身生成的专属个性化互动链接。',
    pt: 'Uma URL personalizada gerada especificamente para um destinatário.',
    ru: 'Персональная интерактивная ссылка, созданная для конкретного получателя.',
    de: 'Eine personalisierte interaktive URL, speziell für einen einzelnen Empfänger.',
    ja: '特定の受取人専用に生成される個別インタラクティブURLです。',
    ko: '특정 수신인을 위해 개별적으로 생성된 맞춤형 인터랙티브 링크입니다.',
    it: 'Un URL personalizzato generato specificamente per un singolo destinatario.',
    tr: 'Belirli bir alıcı için özel olarak oluşturulan kişiselleştirilmiş etkileşimli bağlantı.',
    id: 'URL interaktif khusus yang dibuat untuk penerima individual.',
    bn: 'নির্দিষ্ট একজন প্রাপকের জন্য বিশেষভাবে তৈরি একটি ব্যক্তিগত ইন্টারঅ্যাক্টিভ লিংক।',
    vi: 'Một liên kết tương tác được tạo riêng cho từng người nhận cụ thể.',
    sw: 'URL maalum ya mwingiliano iliyotengenezwa kwa ajili ya mpokeaji mmoja.',
  },
  sec1Bullet2: {
    en: 'It instantly tracks when the recipient opens the link and views the card, updating your live dashboard.',
    ur: 'جیسے ہی وصول کنندہ لنک کھولتا ہے، یہ فوری طور پر ٹریک کرتا ہے اور آپ کے لائیو ڈیش بورڈ پر تصدیق دکھاتا ہے۔',
    ar: 'يتتبع على الفور متى يفتح المستلم الرابط ويعرض البطاقة، مع تحديث لوحة التحكم في الوقت الفعلي.',
    es: 'Rastrea instantáneamente cuando el destinatario abre el enlace y ve la tarjeta.',
    fr: 'Il suit instantanément l\'ouverture du lien et met à jour votre tableau de bord.',
    hi: 'यह तुरंत ट्रैक करता है कि प्राप्तकर्ता ने लिंक कब खोला और कार्ड कब देखा।',
    zh: '收件人打开链接并查阅卡片时立即记录，并在控制台实时更新状态。',
    pt: 'Rastreia no momento exato em que o destinatário abre o link e visualiza o cartão.',
    ru: 'Мгновенно фиксирует открытие ссылки получателем и обновляет статус в вашей панели.',
    de: 'Erfasst sofort, wann der Empfänger den Link öffnet und aktualisiert Ihr Dashboard.',
    ja: '受取人がリンクを開いてカードを閲覧した瞬間にダッシュボードへ記録されます。',
    ko: '수신인이 링크를 열고 카드를 보는 즉시 대시보드에 열람 기록이 갱신됩니다.',
    it: 'Traccia immediatamente l\'apertura del link da parte del destinatario.',
    tr: 'Alıcının bağlantıyı açıp kartı görüntülediği anı kaydederek panelinizi günceller.',
    id: 'Langsung mencatat saat penerima membuka tautan dan melihat kartu Anda.',
    bn: 'প্রাপক যখনই লিংকটি খুলে কার্ড দেখেন তখনই লাইভ ড্যাশবোর্ডে তা ট্র্যাক হয়ে যায়।',
    vi: 'Theo dõi ngay khi người nhận mở liên kết và cập nhật trạng thái trên bảng điều khiển.',
    sw: 'Hufuatilia mara moja wakati mpokeaji anapofungua kiungo na kuona kadi.',
  },
  sec2Title: {
    en: '2. How to Generate Magic Links',
    ur: '2. میجک لنکس کیسے بنائیں؟',
    ar: '2. كيفية إنشاء الروابط السحرية',
    es: '2. Cómo Generar Enlaces Mágicos',
    fr: '2. Comment Générer des Liens Magiques',
    hi: '2. मैजिक लिंक कैसे बनाएं',
    zh: '2. 如何生成魔法链接',
    pt: '2. Como Gerar Links Mágicos',
    ru: '2. Как создать волшебные ссылки',
    de: '2. So erstellen Sie Magic Links',
    ja: '2. マジックリンクの作成方法',
    ko: '2. 매직 링크 생성 방법',
    it: '2. Come Generare i Link Magici',
    tr: '2. Sihirli Bağlantılar Nasıl Oluşturulur',
    id: '2. Cara Membuat Tautan Ajaib',
    bn: '২. কীভাবে ম্যাজিক লিঙ্ক তৈরি করবেন',
    vi: '2. Cách Tạo Liên Kết Kỳ Diệu',
    sw: '2. Jinsi ya Kuunda Viungo vya Kichawi',
  },
  sec2Bullet1: {
    en: 'Open the Magic Link studio directly from the navigation or from any digital card you created.',
    ur: 'نیویگیشن سے براہ راست میجک لنک اسٹوڈیو کھولیں یا اپنے بنائے گئے کسی بھی کارڈ سے بنائیں',
    ar: 'افتح استوديو الروابط السحرية مباشرة من القائمة أو من أي بطاقة قمت بإنشائها.',
    es: 'Abre el estudio de Enlaces Mágicos directamente desde la navegación o desde cualquier tarjeta creada.',
    fr: 'Ouvrez le studio de Liens Magiques depuis le menu ou depuis n\'importe quelle carte.',
    hi: 'नेविगेशन से सीधे मैजिक लिंक स्टूडियो खोलें या अपने बनाए किसी भी कार्ड से बनाएं।',
    zh: '直接从导航栏打开魔法链接制作台，或在已创建的任意数字卡片中点击生成。',
    pt: 'Abra o estúdio de Links Mágicos pelo menu ou a partir de qualquer cartão criado.',
    ru: 'Откройте студию Magic Links в меню или из любой созданной вами открытки.',
    de: 'Öffnen Sie das Magic Link Studio direkt im Menü oder bei einer Ihrer erstellten Karten.',
    ja: 'メニューからマジックリンクスタジオを開くか、作成したカードから直接作成します。',
    ko: '상단 메뉴에서 매직 링크 스튜디오로 이동하거나 제작한 카드에서 생성 버튼을 누르세요.',
    it: 'Apri lo studio dei Link Magici direttamente dal menu o da una tua carta.',
    tr: 'Menüden Sihirli Bağlantı stüdyosunu açın veya oluşturduğunuz herhangi bir karttan tıklayın.',
    id: 'Buka studio Tautan Ajaib langsung dari navigasi atau dari kartu yang telah dibuat.',
    bn: 'মেনু থেকে সরাসরি ম্যাজিক লিঙ্ক স্টুডিও খুলুন বা যেকোনো তৈরি করা কার্ড থেকে তৈরি করুন।',
    vi: 'Mở studio Liên Kết Kỳ Diệu từ thanh điều hướng hoặc từ bất kỳ thiệp nào bạn đã tạo.',
    sw: 'Fungua studio ya Viungo vya Kichawi moja kwa moja kutoka kwenye menyu.',
  },
  sec2Bullet2: {
    en: 'Choose an occasion (Birthday, Wedding, Eid, Anniversary, Apology, Proposal, Friendship, etc.).',
    ur: 'مناسبت منتخب کریں (سالگرہ، شادی، عید، سالگرہ شادی، دوستی، معذرت، وغیرہ)۔',
    ar: 'اختر المناسبة (عيد ميلاد، زفاف، عيد، ذكرى سنوية، اعتذار، صداقة، إلخ).',
    es: 'Elige la ocasión (Cumpleaños, Boda, Eid, Aniversario, Disculpa, Amistad, etc.).',
    fr: 'Choisissez une occasion (Anniversaire, Mariage, Aïd, Amitié, etc.).',
    hi: 'अवसर चुनें (जन्मदिन, शादी, ईद, सालगिरह, दोस्ती, आदि)।',
    zh: '挑选场合（生日、婚礼、开斋节、纪念日、道歉、求婚、友谊等）。',
    pt: 'Escolha a ocasião (Aniversário, Casamento, Eid, Pedido, Amizade, etc.).',
    ru: 'Выберите повод (День рождения, Свадьба, Ид, Юбилей, Извинение, Предложение и др.).',
    de: 'Wählen Sie einen Anlass (Geburtstag, Hochzeit, Eid, Jubiläum, Entschuldigung usw.).',
    ja: 'イベントを選択（誕生日、結婚式、記念日、プロポーズ、友情など）。',
    ko: '행사를 선택하세요 (생일, 결혼식, 이드, 기념일, 사과, 프로포즈, 우정 등).',
    it: 'Scegli l\'occasione (Compleanno, Matrimonio, Eid, Anniversario, Scuse, ecc.).',
    tr: 'Etkinliği seçin (Doğum Günü, Düğün, Bayram, Yıldönümü, Özür, Evlilik Teklifi vb.).',
    id: 'Pilih acara (Ulang Tahun, Pernikahan, Idul Fitri, Hari Jadi, Permintaan Maaf, dll).',
    bn: 'উপলক্ষ বেছে নিন (জন্মদিন, বিবাহ, ঈদ, বিবাহবার্ষিকী, ক্ষমা প্রার্থনা, বন্ধুত্ব ইত্যাদি)।',
    vi: 'Chọn dịp kỷ niệm (Sinh nhật, Đám cưới, Lễ Eid, Kỷ niệm, Xin lỗi, Cầu hôn, v.v.).',
    sw: 'Chagua tukio (Siku ya Kuzaliwa, Harusi, Eid, Kumbukumbu, Samahani, n.k.).',
  },
  sec2Bullet3: {
    en: 'Enter the recipient’s name and your heartfelt message to generate a custom 3D tracked link.',
    ur: 'وصول کنندہ کا نام اور اپنا پیغام درج کریں تاکہ ایک کسٹم تھری ڈی ٹریکڈ لنک تیار ہو جائے۔',
    ar: 'أدخل اسم المستلم ورسالتك الخاصة لإنشاء رابط تفاعلي ثلاثي الأبعاد مع التتبع.',
    es: 'Ingresa el nombre del destinatario y tu mensaje para generar un enlace 3D con seguimiento.',
    fr: 'Entrez le nom du destinataire et votre message pour générer un lien 3D suivi personnalisé.',
    hi: 'प्राप्तकर्ता का नाम और अपना संदेश दर्ज करके कस्टम 3D ट्रैक किया गया लिंक बनाएं।',
    zh: '输入收件人姓名与真情寄语，立即生成专属且带追踪的 3D 互动链接。',
    pt: 'Digite o nome do destinatário e sua mensagem para gerar o link 3D rastreado.',
    ru: 'Введите имя получателя и теплое послание для генерации персональной 3D-ссылки.',
    de: 'Geben Sie den Namen des Empfängers und Ihre Nachricht ein, um den Link zu erstellen.',
    ja: '受取人の名前とメッセージを入力し、個別追跡対応の3Dリンクを生成します。',
    ko: '수신인 이름과 진심 어린 메시지를 입력하여 3D 추적 링크를 만드세요.',
    it: 'Inserisci il nome del destinatario e il messaggio per generare il link 3D.',
    tr: 'Alıcının adını ve samimi mesajınızı girerek özel takip bağlantısı oluşturun.',
    id: 'Masukkan nama penerima dan pesan hangat Anda untuk menghasilkan tautan 3D.',
    bn: 'প্রাপকের নাম ও আপনার আন্তরিক বার্তা লিখে কাস্টম ৩ডি ট্র্যাকড লিঙ্ক তৈরি করুন।',
    vi: 'Nhập tên người nhận và thông điệp của bạn để tạo liên kết 3D có theo dõi.',
    sw: 'Ingiza jina la mpokeaji na ujumbe wako ili kuunda kiungo cha 3D kinachofuatiliwa.',
  },
  sec3Title: {
    en: '3. Track the Views in Real-Time',
    ur: '3. ریئل ٹائم میں مناظر ٹریک کریں',
    ar: '3. تتبع المشاهدات في الوقت الفعلي',
    es: '3. Rastrea las Vistas en Tiempo Real',
    fr: '3. Suivez les Vues en Temps Réel',
    hi: '3. रियल-टाइम में व्यूज ट्रैक करें',
    zh: '3. 实时追踪查看回执',
    pt: '3. Acompanhe as Visualizações em Tempo Real',
    ru: '3. Отслеживайте просмотры в реальном времени',
    de: '3. Aufrufe in Echtzeit verfolgen',
    ja: '3. リアルタイムでの閲覧状況確認',
    ko: '3. 실시간 열람 현황 추적',
    it: '3. Traccia le Visualizzazioni in Tempo Reale',
    tr: '3. Görüntülemeleri Canlı Takip Edin',
    id: '3. Lacak Status Buka secara Real-Time',
    bn: '৩. রিয়েল-টাইমে ভিউ ট্র্যাক করুন',
    vi: '3. Theo Dõi Lượt Xem Theo Thời Gian Thực',
    sw: '3. Fuatilia Utazamaji kwa Wakati Halisi',
  },
  sec3Bullet1: {
    en: 'Head over to your Cardzy Dashboard at any time.',
    ur: 'کسی بھی وقت اپنے کارڈزی ڈیش بورڈ پر جائیں۔',
    ar: 'توجه إلى لوحة تحكم Cardzy الخاصة بك في أي وقت.',
    es: 'Accede a tu Panel de Control de Cardzy en cualquier momento.',
    fr: 'Accédez à votre tableau de bord Cardzy à tout moment.',
    hi: 'किसी भी समय अपने Cardzy डैशबोर्ड पर जाएं।',
    zh: '随时进入您的 Cardzy 用户控制台。',
    pt: 'Acesse seu painel Cardzy a qualquer momento.',
    ru: 'Перейдите в личный кабинет Cardzy в любое удобное время.',
    de: 'Rufen Sie jederzeit Ihr Cardzy-Dashboard auf.',
    ja: 'いつでもCardzyダッシュボードで確認できます。',
    ko: '언제든지 Cardzy 대시보드로 이동하세요.',
    it: 'Accedi alla tua Dashboard Cardzy in qualsiasi momento.',
    tr: 'İstediğiniz zaman Cardzy Panelinize gidin.',
    id: 'Kunjungi Dasbor Cardzy Anda kapan saja.',
    bn: 'যেকোনো সময় আপনার Cardzy ড্যাশবোর্ডে প্রবেশ করুন।',
    vi: 'Truy cập Bảng điều khiển Cardzy của bạn bất cứ lúc nào.',
    sw: 'Nenda kwenye Dashibodi yako ya Cardzy wakati wowote.',
  },
  sec3Bullet2: {
    en: 'Check the real-time \'Viewed\' status and timestamp to see exactly when they opened the card!',
    ur: 'ریئل ٹائم \'دیکھا گیا\' (Viewed) کا اسٹیٹس اور ٹائم اسٹیمپ چیک کریں تاکہ معلوم ہو سکے کہ انہوں نے کارڈ کب کھولا۔',
    ar: 'تحقق من حالة \'تمت المشاهدة\' والتوقيت الدقيق لمعرفة وقت فتحهم للبطاقة على الفور!',
    es: '¡Comprueba el estado \'Visto\' en tiempo real y la hora exacta en que abrieron la tarjeta!',
    fr: 'Consultez le statut \'Vu\' et l\'horodatage exact de l\'ouverture du lien.',
    hi: 'रियल-टाइम \'Viewed\' स्थिति और समय देखकर पता लगाएं कि उन्होंने कार्ड कब खोला!',
    zh: '查看实时的“已读”状态及确切时间戳，精准掌握对方何时开启了祝福！',
    pt: 'Verifique o status \'Visto\' e o horário exato da abertura do cartão!',
    ru: 'Проверьте статус «Просмотрено» и точное время открытия вашей открытки!',
    de: 'Sehen Sie den Status \'Angesehen\' und den exakten Zeitstempel der Öffnung!',
    ja: '「閲覧済み」ステータスと正確な日時で、いつカードを開いたかが分かります！',
    ko: '실시간 \'열람됨\' 상태와 타임스탬프로 카드를 열어본 시간을 확인하세요!',
    it: 'Verifica lo stato \'Visualizzato\' e l\'orario esatto in cui è stato aperto il biglietto!',
    tr: 'Gerçek zamanlı \'Görüntülendi\' durumuyla kartın ne zaman açıldığını görün!',
    id: 'Periksa status \'Dilihat\' dan stempel waktu untuk mengetahui kapan kartu dibuka!',
    bn: 'রিয়েল-টাইম \'Viewed\' স্ট্যাটাস এবং সময় দেখে জেনে নিন কখন তারা কার্ডটি খুলেছেন!',
    vi: 'Kiểm tra trạng thái \'Đã xem\' và dấu thời gian để biết chính xác khi nào họ mở thiệp!',
    sw: 'Angalia hali ya \'Imetazamwa\' na muda kamili walipofungua kadi!',
  },
  ctaTitle: {
    en: 'Try Magic Links Now',
    ur: 'ابھی میجک لنکس آزمائیں',
    ar: 'جرب الروابط السحرية الآن',
    es: 'Prueba los Enlaces Mágicos Ahora',
    fr: 'Essayez les Liens Magiques Maintenant',
    hi: 'अभी मैजिक लिंक आज़माएं',
    zh: '立即体验魔法链接',
    pt: 'Experimente os Links Mágicos Agora',
    ru: 'Попробуйте волшебные ссылки прямо сейчас',
    de: 'Jetzt Magic Links ausprobieren',
    ja: '今すぐマジックリンクを体験',
    ko: '지금 매직 링크 사용해보기',
    it: 'Prova i Link Magici Ora',
    tr: 'Sihirli Bağlantıları Şimdi Deneyin',
    id: 'Coba Tautan Ajaib Sekarang',
    bn: 'এখনই ম্যাজিক লিঙ্ক ব্যবহার করুন',
    vi: 'Thử Liên Kết Kỳ Diệu Ngay',
    sw: 'Jaribu Viungo vya Kichawi Sasa',
  },
  ctaDesc: {
    en: 'Create trackable 3D surprise cards with confetti, music, and instant view receipts.',
    ur: 'کنفیٹی، موسیقی اور فوری ویو رسید کے ساتھ ٹریک کے قابل تھری ڈی کارڈز بنائیں۔',
    ar: 'أنشئ بطاقات مفاجآت ثلاثية الأبعاد مع المؤثرات والموسيقى وتأكيد المشاهدة الفوري.',
    es: 'Crea tarjetas 3D sorpresa con confeti, música y confirmación de lectura instantánea.',
    fr: 'Créez des cartes 3D surprises avec confettis, musique et accusés de lecture.',
    hi: 'कंफ़ेद्दी, संगीत और तुरंत व्यू रसीद के साथ ट्रैक करने योग्य 3D कार्ड बनाएं।',
    zh: '制作带有动态礼花、优美旋律与即时查阅回执的趣味 3D 惊喜贺卡。',
    pt: 'Crie cartões 3D com confetes, música e confirmação de leitura instantânea.',
    ru: 'Создавайте 3D-открытки с конфетти, музыкой и уведомлением о просмотре.',
    de: 'Erstellen Sie 3D-Überraschungskarten mit Konfetti, Musik und Lesebestätigung.',
    ja: '紙吹雪、音楽、閲覧確認レシート付きの3Dサプライズカードを作成しましょう。',
    ko: '꽃가루, 음악, 실시간 열람 확인이 포함된 3D 서프라이즈 카드를 만들어 보세요.',
    it: 'Crea cartoline 3D a sorpresa con coriandoli, musica e conferma di lettura.',
    tr: 'Konfeti, müzik ve anlık görüntüleme bildirimiyle 3D sürpriz kartlar oluşturun.',
    id: 'Buat kartu kejutan 3D yang dapat dilacak lengkap dengan konfeti dan musik.',
    bn: 'কনফেটি, মিউজিক এবং ইনস্ট্যান্ট ভিউ রসিদ সহ ৩ডি সারপ্রাইজ কার্ড তৈরি করুন।',
    vi: 'Tạo thiệp 3D bất ngờ có hoa giấy, âm nhạc và xác nhận lượt xem tức thì.',
    sw: 'Tengeneza kadi za mshangao za 3D zenye muziki na uthibitisho wa kutazamwa.',
  },
  sendWishBtn: {
    en: 'Create a Magic Link',
    ur: 'میجک لنک بنائیں',
    ar: 'إنشاء رابط سحري',
    es: 'Crear Enlace Mágico',
    fr: 'Créer un Lien Magique',
    hi: 'मैजिक लिंक बनाएं',
    zh: '制作魔法链接',
    pt: 'Criar Link Mágico',
    ru: 'Создать ссылку',
    de: 'Magic Link erstellen',
    ja: 'マジックリンクを作る',
    ko: '매직 링크 만들기',
    it: 'Crea Link Magico',
    tr: 'Sihirli Bağlantı Oluştur',
    id: 'Buat Tautan Ajaib',
    bn: 'ম্যাজিক লিঙ্ক তৈরি করুন',
    vi: 'Tạo Liên Kết Kỳ Diệu',
    sw: 'Unda Kiungo cha Kichawi',
  },
  moreGuidesBtn: {
    en: 'More Guides',
    ur: 'مزید گائیڈز',
    ar: 'المزيد من الأدلة',
    es: 'Más Guías',
    fr: 'Plus de Guides',
    hi: 'और गाइड्स',
    zh: '查看更多指南',
    pt: 'Mais Guias',
    ru: 'Больше руководств',
    de: 'Weitere Anleitungen',
    ja: '他のガイドを見る',
    ko: '가이드 더보기',
    it: 'Altre Guide',
    tr: 'Daha Fazla Rehber',
    id: 'Panduan Lainnya',
    bn: 'আরও গাইড',
    vi: 'Xem Thêm Hướng Dẫn',
    sw: 'Miongozo Zaidi',
  },
}

export default function MagicLinksGuidePage() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return MAGIC_GUIDE_TEXT[key]?.[lang] || MAGIC_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <Breadcrumbs
          items={[
            { label: 'Celebration Guides', href: '/guide' },
            { label: 'Magic Links Guide' },
          ]}
          className="mb-4"
        />

        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" /> {getText('backToGuides')}
        </Link>

        <article>
          <header className="mb-10">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 border border-indigo-500/20">
              {getText('badge')}
            </span>
            <h1 className={cn(
              "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl",
              isUrdu ? "font-urdu leading-relaxed text-2xl sm:text-3xl" : "leading-tight"
            )}>
              {getText('title')}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/60 py-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" /> {getText('publishedDate')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" /> {getText('readTime')}
              </span>
              <span className="font-semibold text-foreground">
                {getText('author')}
              </span>
            </div>
          </header>

          <div className={cn("prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base", isUrdu && "font-urdu")}>

            <p>{getText('introP1')}</p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec1Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec1Bullet1')}</li>
              <li>{getText('sec1Bullet2')}</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec2Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec2Bullet1')}</li>
              <li>{getText('sec2Bullet2')}</li>
              <li>{getText('sec2Bullet3')}</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec3Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{getText('sec3Bullet1')}</li>
              <li>{getText('sec3Bullet2')}</li>
            </ul>
          </div>

          <footer className="mt-12 border-t border-border/80 pt-8 text-center">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5">
              <Wand2 className="size-5 text-indigo-500 shrink-0" /> {getText('ctaTitle')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              {getText('ctaDesc')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/create-magic-link"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Send className="size-4" /> {getText('sendWishBtn')}
              </Link>
              <Link
                href="/guide"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                {getText('moreGuidesBtn')}
              </Link>
            </div>
          </footer>
        </article>

      </div>
    </div>
  )
}
