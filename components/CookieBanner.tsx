'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import {
  Cookie,
  ShieldCheck,
  ExternalLink,
  X,
  Settings2,
  Check,
  Lock,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import { useLang, type LangCode } from '@/lib/lang/context'

declare global {
  interface Window {
    openCookiePreferences?: () => void
    openCardzyCookieConsent?: () => void
    cardzyOpenCookiePreferences?: () => void
    showCookieAlert?: () => void
    openCookieAlert?: () => void
    gtag?: (...args: any[]) => void
  }
}

const STORAGE_KEY = 'cookie_consent'
const VERSIONED_KEY = 'cardzy_consent_v3'
const LEGACY_CONSENT_KEY = 'cardzy_cookie_consent'
const LEGACY_PREFS_KEY = 'cardzy_cookie_prefs'

interface CookiePrefs {
  essential: boolean
  analytics: boolean
  advertising: boolean
}

const COOKIE_TEXTS: Record<string, Record<LangCode, string>> = {
  noticeTitle: {
    en: 'Cookie & Privacy Notice',
    ur: 'کوکی اور پرائیویسی نوٹس',
    es: 'Aviso de Cookies y Privacidad',
    fr: 'Avis sur les cookies et la confidentialité',
    ar: 'إشعار ملفات تعريف الارتباط والخصوصية',
    hi: 'कुकी और गोपनीयता सूचना',
    zh: 'Cookie 与隐私声明',
    pt: 'Aviso de Cookies e Privacidade',
    ru: 'Уведомление о файлах cookie и конфиденциальности',
    de: 'Cookie- & Datenschutzhinweis',
    ja: 'Cookieとプライバシーに関する通知',
    ko: '쿠키 및 개인정보 보호 고지',
    it: 'Informativa su Cookie e Privacy',
    tr: 'Çerez ve Gizlilik Bildirimi',
    id: 'Pemberitahuan Cookie & Privasi',
    bn: 'কুকিজ এবং গোপনীয়তা বিজ্ঞপ্তি',
    vi: 'Thông Báo Cookie & Quyền Riêng Tư',
    sw: 'Notisi ya Vidakuzi na Faragha',
  },
  modalTitle: {
    en: 'Cookie Preferences & Privacy Choices',
    ur: 'کوکی ترجیحات اور پرائیویسی اختیارات',
    es: 'Preferencias de Cookies y Privacidad',
    fr: 'Préférences de cookies et choix de confidentialité',
    ar: 'تفضيلات ملفات الكوكيز وخيارات الخصوصية',
    hi: 'कुकी प्राथमिकताएं और गोपनीयता विकल्प',
    zh: 'Cookie 首选项与隐私选择',
    pt: 'Preferências de Cookies e Privacidade',
    ru: 'Настройки файлов cookie и конфиденциальности',
    de: 'Cookie-Einstellungen & Datenschutzauswahl',
    ja: 'Cookie設定とプライバシーの選択',
    ko: '쿠키 기본 설정 및 개인정보 보호 선택',
    it: 'Preferenze Cookie e Scelte sulla Privacy',
    tr: 'Çerez Tercihleri ve Gizlilik Seçenekleri',
    id: 'Preferensi Cookie & Pilihan Privasi',
    bn: 'কুকিজ পছন্দসমূহ এবং গোপনীয়তা বিকল্প',
    vi: 'Tùy Chọn Cookie & Quyền Riêng Tư',
    sw: 'Mapendeleo ya Vidakuzi na Faragha',
  },
  modalDesc: {
    en: 'Choose which cookies you allow us to use. Essential cookies are always required for authentication, RSVP tracking, and card operations.',
    ur: 'منتخب کریں کہ آپ ہمیں کون سی کوکیز استعمال کرنے کی اجازت دیتے ہیں۔ لاگ ان اور کارڈ کی ترسیل کے لیے ضروری کوکیز لازمی ہیں۔',
    es: 'Elija qué cookies nos permite utilizar. Las cookies esenciales siempre son necesarias para la autenticación y el funcionamiento de las tarjetas.',
    fr: 'Choisissez les cookies que vous nous autorisez à utiliser. Les cookies essentiels sont toujours requis pour le fonctionnement du service.',
    ar: 'اختر ملفات تعريف الارتباط التي تسمح لنا باستخدامها. ملفات تعريف الارتباط الأساسية مطلوبة دائماً للمصادقة وعمل البطاقات.',
    hi: 'चुनें कि आप हमें किन कुकीज़ का उपयोग करने की अनुमति देते हैं। प्रमाणीकरण और कार्ड संचालन के लिए आवश्यक कुकीज़ हमेशा अनिवार्य हैं।',
    zh: '选择您允许我们使用的 Cookie。为确保身份验证和贺卡制作正常运行，必要 Cookie 始终处于启用状态。',
    pt: 'Escolha quais cookies você nos permite usar. Cookies essenciais são sempre necessários para autenticação e operações de cartões.',
    ru: 'Выберите, какие файлы cookie вы разрешаете использовать. Необходимые файлы cookie всегда включены для авторизации и работы открыток.',
    de: 'Wählen Sie aus, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für die Anmeldung und Kartenfunktionen stets erforderlich.',
    ja: '使用を許可するCookieを選択してください。認証やカード機能に必要な必須Cookieは常に有効です。',
    ko: '사용을 허용할 쿠키를 선택해 주세요. 로그인 인증 및 카드 기능에 필요한 필수 쿠키는 항상 활성화됩니다.',
    it: 'Scegli quali cookie permetterci di utilizzare. I cookie essenziali sono sempre necessari per l’autenticazione e il funzionamento dei biglietti.',
    tr: 'Kullanmamıza izin verdiğiniz çerezleri seçin. Kimlik doğrulama ve kart işlemleri için gerekli çerezler her zaman zorunludur.',
    id: 'Pilih cookie mana yang Anda izinkan. Cookie esensial selalu diperlukan untuk autentikasi dan pembuatan kartu.',
    bn: 'আমরা কোন কুকিজ ব্যবহার করতে পারব তা বেছে নিন। প্রমাণীকরণ ও کارڈ তৈরির জন্য প্রয়োজনীয় কুকিজ সর্বদা সক্রিয় থাকে।',
    vi: 'Chọn loại cookie bạn cho phép chúng tôi sử dụng. Cookie thiết yếu luôn bắt buộc để đăng nhập và tạo thiệp.',
    sw: 'Chagua vidakuzi unavyoturuhusu kutumia. Vidakuzi muhimu vinahitajika kila mara kwa uthibitishaji na huduma za kadi.',
  },
  noticeDesc: {
    en: 'We use cookies to enhance your experience, analyze site performance, and serve relevant content. Review our',
    ur: 'ہم آپ کے تجربے کو بہتر بنانے اور متعلقہ اشتہارات کے لیے کوکیز استعمال کرتے ہیں۔ مزید معلومات کے لیے ہماری',
    es: 'Utilizamos cookies para mejorar su experiencia, analizar el rendimiento y mostrar contenido relevante. Revise nuestra',
    fr: 'Nous utilisons des cookies pour améliorer votre expérience, analyser les performances et diffuser du contenu pertinent. Consultez notre',
    ar: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل أداء الموقع وعرض محتوى ملائم. راجع',
    hi: 'हम आपके अनुभव को बेहतर बनाने और उपयुक्त सामग्री प्रस्तुत करने के लिए कुकीज़ का उपयोग करते हैं। हमारी',
    zh: '我们使用 Cookie 以提升您的使用体验、分析网站性能并提供相关内容。请查阅我们的',
    pt: 'Usamos cookies para melhorar sua experiência, analisar o desempenho do site e exibir conteúdo relevante. Consulte nossa',
    ru: 'Мы используем файлы cookie для улучшения работы сайта, анализа производительности и показа релевантного контента. Ознакомьтесь с нашей',
    de: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, die Website-Leistung zu analysieren und relevante Inhalte anzuzeigen. Lesen Sie unsere',
    ja: '利便性の向上、サイト分析、適切なコンテンツ配信のためにCookieを使用しています。詳しくは',
    ko: '사용자 경험 향상, 사이트 분석 및 맞춤형 콘텐츠 제공을 위해 쿠키를 사용합니다. 자세한 내용은',
    it: 'Utilizziamo i cookie per migliorare la tua esperienza, analizzare le prestazioni del sito e offrire contenuti pertinenti. Consulta la nostra',
    tr: 'Deneyiminizi geliştirmek, site performansını analiz etmek ve ilgili içerikleri sunmak için çerezleri kullanıyoruz. İnceleyin:',
    id: 'Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis performa situs, dan menyajikan konten yang relevan. Pelajari',
    bn: 'আমরা আপনার অভিজ্ঞতা উন্নত করতে, সাইট বিশ্লেষণ করতে এবং প্রাসঙ্গিক বিষয়বস্তু পরিবেশন করতে কুকিজ ব্যবহার করি। আমাদের',
    vi: 'Chúng tôi sử dụng cookie để nâng cao trải nghiệm, phân tích hiệu suất và phân phối nội dung phù hợp. Xem',
    sw: 'Tunatumia vidakuzi kuboresha uzoefu wako, kuchanganua utendaji na kutoa maudhui yanayofaa. Pitia',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    ur: 'پرائیویسی پالیسی',
    es: 'Política de Privacidad',
    fr: 'Politique de Confidentialité',
    ar: 'سياسة الخصوصية',
    hi: 'गोपनीयता नीति',
    zh: '隐私政策',
    pt: 'Política de Privacidade',
    ru: 'Политикой конфиденциальности',
    de: 'Datenschutzerklärung',
    ja: 'プライバシーポリシー',
    ko: '개인정보 처리방침',
    it: 'Informativa sulla Privacy',
    tr: 'Gizlilik Politikası',
    id: 'Kebijakan Privasi',
    bn: 'গোপনীয়তা নীতি',
    vi: 'Chính sách bảo mật',
    sw: 'Sera ya Faragha',
  },
  learnMore: {
    en: 'to learn more.',
    ur: 'دیکھیں۔',
    es: 'para más información.',
    fr: 'pour en savoir plus.',
    ar: 'لمعرفة المزيد.',
    hi: 'पढ़ें।',
    zh: '了解详情。',
    pt: 'para saber mais.',
    ru: 'чтобы узнать больше.',
    de: 'um mehr zu erfahren.',
    ja: 'をご確認ください。',
    ko: '을 확인하세요.',
    it: 'per saperne di più.',
    tr: 'daha fazla bilgi için.',
    id: 'untuk info lebih lanjut.',
    bn: 'পড়ুন।',
    vi: 'để biết thêm chi tiết.',
    sw: 'kujifunza zaidi.',
  },
  strictlyEssential: {
    en: 'Strictly Essential Cookies',
    ur: 'لازمی ضروری کوکیز',
    es: 'Cookies Estrictamente Esenciales',
    fr: 'Cookies strictement essentiels',
    ar: 'ملفات تعريف الارتباط الأساسية',
    hi: 'अत्यंत आवश्यक कुकीज़',
    zh: '必要核心 Cookie',
    pt: 'Cookies Estritamente Essenciais',
    ru: 'Строго необходимые файлы cookie',
    de: 'Zwingend erforderliche Cookies',
    ja: '必須Cookie',
    ko: '필수 쿠키',
    it: 'Cookie Strettamente Necessari',
    tr: 'Kesinlikle Gerekli Çerezler',
    id: 'Cookie Sangat Penting',
    bn: 'অপরিহার্য প্রয়োজনীয় কুকিজ',
    vi: 'Cookie Thực Sự Cần Thiết',
    sw: 'Vidakuzi Muhimu Kabisa',
  },
  strictlyEssentialDesc: {
    en: 'Required for secure login authentication, guest RSVPs, and card draft saving.',
    ur: 'محفوظ لاگ ان، مہمانوں کے آر ایس وی پی اور کارڈ محفوظ کرنے کے لیے لازمی۔',
    es: 'Necesarias para inicio de sesión seguro, confirmaciones RSVP y guardado de tarjetas.',
    fr: 'Requis pour la connexion sécurisée, les réponses RSVP et la sauvegarde des cartes.',
    ar: 'ضرورية لتسجيل الدخول الآمن، وتأكيدات الحضور، وحفظ مسودات البطاقات.',
    hi: 'सुरक्षित लॉगिन प्रमाणीकरण, मेहमानों के RSVP और कार्ड ड्राफ्ट सहेजने के लिए आवश्यक।',
    zh: '用于安全登录验证、宾客 RSVP 回复及贺卡草稿自动保存。',
    pt: 'Necessários para login seguro, confirmações de RSVP e salvamento de cartões.',
    ru: 'Необходимы для безопасного входа, RSVP-ответов гостей и сохранения черновиков.',
    de: 'Erforderlich für sichere Anmeldung, RSVP-Rückmeldungen und Speichern von Kartenentwürfen.',
    ja: '安全なログイン認証、ゲストRSVP、カード下書き保存に必要です。',
    ko: '안전한 로그인 인증, 게스트 RSVP 및 카드 임시 저장에 필요합니다.',
    it: 'Necessari per l’accesso sicuro, le conferme RSVP e il salvataggio delle bozze.',
    tr: 'Güvenli giriş kimlik doğrulaması, RSVP ve kart taslaklarını kaydetmek için gereklidir.',
    id: 'Diperlukan untuk autentikasi login aman, RSVP tamu, dan penyimpanan draf kartu.',
    bn: 'নিরাপদ লগইন প্রমাণীকরণ, গেস্ট RSVP এবং কার্ড খসড়া সংরক্ষণের জন্য প্রয়োজন।',
    vi: 'Cần thiết để đăng nhập an toàn, phản hồi RSVP và lưu bản nháp thiệp.',
    sw: 'Inahitajika kwa uthibitishaji salama wa kuingia, RSVP na kuhifadhi kadi.',
  },
  alwaysActive: {
    en: 'Always Active',
    ur: 'ہمیشہ فعال',
    es: 'Siempre Activo',
    fr: 'Toujours actif',
    ar: 'دائماً نشط',
    hi: 'हमेशा सक्रिय',
    zh: '始终启用',
    pt: 'Sempre Ativo',
    ru: 'Всегда активно',
    de: 'Immer aktiv',
    ja: '常に有効',
    ko: '항상 활성화',
    it: 'Sempre Attivo',
    tr: 'Her Zaman Aktif',
    id: 'Selalu Aktif',
    bn: 'সর্বদা সক্রিয়',
    vi: 'Luôn Hoạt Động',
    sw: 'Inafanya Kazi Daima',
  },
  analyticsTitle: {
    en: 'Performance & Analytics',
    ur: 'کارکردگی اور اینالیٹکس',
    es: 'Rendimiento y Analítica',
    fr: 'Performance et statistiques',
    ar: 'الأداء والتحليلات',
    hi: 'प्रदर्शन और एनालिटिक्स',
    zh: '性能与统计分析',
    pt: 'Desempenho e Estatísticas',
    ru: 'Производительность и аналитика',
    de: 'Leistung & Webanalyse',
    ja: 'パフォーマンスと分析',
    ko: '성능 및 분석',
    it: 'Prestazioni e Analisi',
    tr: 'Performans ve Analitik',
    id: 'Performa & Analitik',
    bn: 'কর্মক্ষমতা ও বিশ্লেষণ',
    vi: 'Hiệu Suất & Phân Tích',
    sw: 'Utendaji na Uchanganuzi',
  },
  analyticsDesc: {
    en: 'Measures traffic metrics and page loading speeds to help us improve the experience.',
    ur: 'ویب سائٹ کی رفتار اور ٹریفک کا تجزیہ کرتا ہے تاکہ بہتر تجربہ دیا جا سکے۔',
    es: 'Mide métricas de tráfico y velocidad de carga para mejorar la experiencia.',
    fr: 'Mesure le trafic et la vitesse de chargement pour améliorer nos services.',
    ar: 'يقيس حركة المرور وسرعة تحميل الصفحات لمساعدتنا على تحسين التجربة.',
    hi: 'साइट की गति और ट्रैफ़िक को मापता है ताकि अनुभव बेहतर किया जा सके।',
    zh: '衡量流量指标和页面加载速度，以持续优化产品体验。',
    pt: 'Mede métricas de tráfego e velocidade de carregamento para otimizar o serviço.',
    ru: 'Измеряет посещаемость и скорость загрузки для постоянного улучшения сервиса.',
    de: 'Misst Besucherzahlen und Ladezeiten, um das Nutzungserlebnis stetig zu optimieren.',
    ja: 'トラフィック指標と読み込み速度を測定し、使いやすさを向上させます。',
    ko: '트래픽 통계와 페이지 로딩 속도를 측정하여 서비스 품질을 개선합니다.',
    it: 'Misura il traffico e i tempi di caricamento per ottimizzare l’esperienza.',
    tr: 'Deneyimi geliştirmek için trafik metriklerini ve sayfa hızını ölçer.',
    id: 'Mengukur metrik lalu lintas dan kecepatan muat untuk meningkatkan pengalaman.',
    bn: 'অভিজ্ঞতা উন্নত করার জন্য ট্র্যাফিক মেট্রিক্স এবং গতি পরিমাপ করে।',
    vi: 'Đo lường lưu lượng truy cập và tốc độ tải trang để cải thiện trải nghiệm.',
    sw: 'Hupima idadi ya watembeleaji na kasi ya upakiaji ili kuboresha huduma.',
  },
  advertisingTitle: {
    en: 'Google AdSense & Advertising',
    ur: 'گوگل ایڈسینس اور اشتہارات',
    es: 'Google AdSense y Publicidad',
    fr: 'Google AdSense et publicité',
    ar: 'جوجل أدسينس والإعلانات',
    hi: 'गूगल ऐडसेंस और विज्ञापन',
    zh: 'Google AdSense 广告投放',
    pt: 'Google AdSense e Publicidade',
    ru: 'Google AdSense и реклама',
    de: 'Google AdSense & Werbung',
    ja: 'Google AdSenseと広告',
    ko: 'Google AdSense 맞춤 광고',
    it: 'Google AdSense e Pubblicità',
    tr: 'Google AdSense ve Reklamlar',
    id: 'Google AdSense & Periklanan',
    bn: 'গুগল অ্যাডসেন্স ও বিজ্ঞাপন',
    vi: 'Quảng Cáo Google AdSense',
    sw: 'Google AdSense na Matangazo',
  },
  advertisingDesc: {
    en: 'Enables relevant, family-safe advertisements supporting free card generation.',
    ur: 'مناسب اور فیملی فرینڈلی اشتہارات دکھاتا ہے تاکہ مفت کارڈز کی سہولت جاری رہ سکے۔',
    es: 'Permite anuncios relevantes y seguros que apoyan la creación gratuita de tarjetas.',
    fr: 'Permet d’afficher des annonces pertinentes et familiales finançant la gratuité.',
    ar: 'يتيح إعلانات ملائمة وآمنة للعائلة تدعم إنشاء البطاقات المجانية.',
    hi: 'प्रासंगिक और परिवार-अनुकूल विज्ञापन सक्षम करता है जो मुफ्त कार्ड निर्माण का समर्थन करते हैं।',
    zh: '展示安全得体的个性化广告，支持我们持续提供免费贺卡制作服务。',
    pt: 'Permite anúncios relevantes e adequados que apoiam a criação gratuita de cartões.',
    ru: 'Позволяет показывать безопасную рекламу, поддерживающую бесплатное создание открыток.',
    de: 'Ermöglicht familienfreundliche Werbung zur Unterstützung der kostenlosen Kartenerstellung.',
    ja: '無料カード作成を維持するための安心で適切な広告を配信します。',
    ko: '무료 카드 제작 서비스를 지원하는 안전하고 유용한 맞춤형 광고를 제공합니다.',
    it: 'Consente annunci pertinenti e sicuri per supportare la creazione gratuita di biglietti.',
    tr: 'Ücretsiz kart oluşturmayı destekleyen güvenli reklamların gösterilmesini sağlar.',
    id: 'Mengaktifkan iklan relevan dan aman untuk mendukung pembuatan kartu gratis.',
    bn: 'প্রাসঙ্গিক ও নিরাপদ বিজ্ঞাপন সক্ষম করে যা বিনামূল্যে کارڈ তৈরিকে সমর্থন করে।',
    vi: 'Hiển thị quảng cáo an toàn, phù hợp để duy trì dịch vụ tạo thiệp miễn phí.',
    sw: 'Huwezesha matangazo salama na yanayofaa kusaidia utengenezaji wa kadi bila malipo.',
  },
  acceptAll: {
    en: 'Accept All',
    ur: 'تمام قبول کریں',
    es: 'Aceptar Todo',
    fr: 'Tout accepter',
    ar: 'قبول الكل',
    hi: 'सभी स्वीकार करें',
    zh: '全部接受',
    pt: 'Aceitar Tudo',
    ru: 'Принять все',
    de: 'Alle akzeptieren',
    ja: 'すべて同意',
    ko: '모두 동의',
    it: 'Accetta Tutti',
    tr: 'Tümünü Kabul Et',
    id: 'Terima Semua',
    bn: 'সব গ্রহণ করুন',
    vi: 'Chấp Nhận Tất Cả',
    sw: 'Kubali Yote',
  },
  decline: {
    en: 'Decline',
    ur: 'مسترد کریں',
    es: 'Rechazar',
    fr: 'Refuser',
    ar: 'رفض',
    hi: 'अस्वीकार करें',
    zh: '拒绝',
    pt: 'Recusar',
    ru: 'Отклонить',
    de: 'Ablehnen',
    ja: '拒否する',
    ko: '거부',
    it: 'Rifiuta',
    tr: 'Reddet',
    id: 'Tolak',
    bn: 'প্রত্যাখ্যান করুন',
    vi: 'Từ Chối',
    sw: 'Kataa',
  },
  saveChoices: {
    en: 'Save Preferences',
    ur: 'ترجیحات محفوظ کریں',
    es: 'Guardar Preferencias',
    fr: 'Enregistrer les choix',
    ar: 'حفظ التفضيلات',
    hi: 'प्राथमिकताएं सहेजें',
    zh: '保存首选项',
    pt: 'Salvar Preferências',
    ru: 'Сохранить выбор',
    de: 'Auswahl speichern',
    ja: '設定を保存',
    ko: '선택사항 저장',
    it: 'Salva Preferenze',
    tr: 'Tercihleri Kaydet',
    id: 'Simpan Pilihan',
    bn: 'পছন্দ সংরক্ষণ করুন',
    vi: 'Lưu Tùy Chọn',
    sw: 'Hifadhi Mapendeleo',
  },
  preferences: {
    en: 'Cookie Preferences',
    ur: 'کوکی ترجیحات',
    es: 'Preferencias de Cookies',
    fr: 'Préférences de cookies',
    ar: 'تفضيلات ملفات الكوكيز',
    hi: 'कुकी प्राथमिकताएं',
    zh: 'Cookie 设置',
    pt: 'Preferências de Cookies',
    ru: 'Настройки файлов cookie',
    de: 'Cookie-Einstellungen',
    ja: 'Cookie設定',
    ko: '쿠키 설정',
    it: 'Preferenze Cookie',
    tr: 'Çerez Tercihleri',
    id: 'Preferensi Cookie',
    bn: 'কুকিজ পছন্দসমূহ',
    vi: 'Tùy Chọn Cookie',
    sw: 'Mapendeleo ya Vidakuzi',
  },
}

// Immediate global hook fallback before component mounts
if (typeof window !== 'undefined') {
  ;(window as any).openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open_cookie_preferences'))
    document.dispatchEvent(new CustomEvent('open_cookie_preferences'))
  }
  ;(window as any).openCardzyCookieConsent = (window as any).openCookiePreferences
  ;(window as any).showCookieAlert = (window as any).openCookiePreferences
  ;(window as any).openCookieAlert = (window as any).openCookiePreferences
}

export function CookieBanner() {
  const langContext = useLang()
  const lang = langContext?.lang || 'en'
  const activeLang: LangCode = (lang as LangCode) || 'en'
  const tr = (key: string): string => {
    return COOKIE_TEXTS[key]?.[activeLang] || COOKIE_TEXTS[key]?.en || ''
  }

  const [showNoticeBanner, setShowNoticeBanner] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential: true,
    analytics: true,
    advertising: true,
  })

  const openedAtRef = useRef<number>(0)

  const openPreferencesModal = useCallback(() => {
    openedAtRef.current = Date.now()
    setShowModal(true)
    setShowNoticeBanner(false)
  }, [])

  const closePreferencesModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (Date.now() - openedAtRef.current < 350) return
    if (e.target === e.currentTarget) {
      closePreferencesModal()
    }
  }

  useEffect(() => {
    // Expose global methods for footer, settings, and other components
    window.openCookiePreferences = openPreferencesModal
    window.openCardzyCookieConsent = openPreferencesModal
    window.cardzyOpenCookiePreferences = openPreferencesModal
    window.showCookieAlert = openPreferencesModal
    window.openCookieAlert = openPreferencesModal

    try {
      const storedConsent = localStorage.getItem(VERSIONED_KEY)

      const urlHasCookieParam =
        window.location.search.includes('cookie') ||
        window.location.search.includes('consent') ||
        window.location.hash.includes('cookie') ||
        window.location.hash.includes('privacy-choices')

      if (urlHasCookieParam) {
        setShowNoticeBanner(false)
        setShowModal(true)
      } else if (storedConsent) {
        try {
          const parsed = JSON.parse(storedConsent)
          if (parsed && typeof parsed === 'object') {
            setPrefs({
              essential: true,
              analytics: parsed.analytics !== false,
              advertising: parsed.advertising !== false,
            })
            // Already has valid v3 consent
            setShowNoticeBanner(false)
          } else {
            setShowNoticeBanner(true)
          }
        } catch {
          setShowNoticeBanner(true)
        }
      } else {
        setShowNoticeBanner(true)
      }
    } catch {
      setShowNoticeBanner(true)
    }

    const handleCustomTrigger = () => {
      openPreferencesModal()
    }

    // Comprehensive event listeners
    window.addEventListener('open_cookie_consent', handleCustomTrigger)
    window.addEventListener('open_cookie_preferences', handleCustomTrigger)
    window.addEventListener('show_cookie_alert', handleCustomTrigger)
    window.addEventListener('cardzy_open_cookie_preferences', handleCustomTrigger)
    document.addEventListener('open_cookie_consent', handleCustomTrigger)
    document.addEventListener('open_cookie_preferences', handleCustomTrigger)
    document.addEventListener('show_cookie_alert', handleCustomTrigger)

    // Check for hash changes like #cookie-preferences
    const handleHashChange = () => {
      if (
        window.location.hash === '#cookie-preferences' ||
        window.location.hash === '#cookie-settings' ||
        window.location.hash === '#cookies'
      ) {
        openPreferencesModal()
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    // Global document click delegate for any button/link with data attributes
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        '[data-open-cookie-preferences], [data-cookie-preferences], a[href="#cookie-preferences"], a[href="#cookie-settings"]'
      )
      if (target) {
        e.preventDefault()
        e.stopPropagation()
        openPreferencesModal()
      }
    }
    document.addEventListener('click', handleDocumentClick)

    // Keyboard ESC listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open_cookie_consent', handleCustomTrigger)
      window.removeEventListener('open_cookie_preferences', handleCustomTrigger)
      window.removeEventListener('show_cookie_alert', handleCustomTrigger)
      window.removeEventListener('cardzy_open_cookie_preferences', handleCustomTrigger)
      document.removeEventListener('open_cookie_consent', handleCustomTrigger)
      document.removeEventListener('open_cookie_preferences', handleCustomTrigger)
      document.removeEventListener('show_cookie_alert', handleCustomTrigger)
      window.removeEventListener('hashchange', handleHashChange)
      document.removeEventListener('click', handleDocumentClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openPreferencesModal])

  const updateGoogleConsent = (analytics: boolean, advertising: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: advertising ? 'granted' : 'denied',
        ad_user_data: advertising ? 'granted' : 'denied',
        ad_personalization: advertising ? 'granted' : 'denied',
      })
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cardzy_consent_change', {
          detail: { analytics, advertising },
        })
      )
      window.dispatchEvent(
        new CustomEvent('cookie_consent_change', {
          detail: { analytics, advertising },
        })
      )
    }
  }

  const persistConsent = (analytics: boolean, advertising: boolean) => {
    const isAllAccepted = analytics && advertising
    const consentPayload = {
      essential: true,
      analytics,
      advertising,
      timestamp: Date.now(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, isAllAccepted ? 'accepted' : 'declined')
      localStorage.setItem(VERSIONED_KEY, JSON.stringify(consentPayload))
      localStorage.setItem(LEGACY_CONSENT_KEY, isAllAccepted ? 'accepted' : 'rejected')
      localStorage.setItem(LEGACY_PREFS_KEY, JSON.stringify(consentPayload))

      document.cookie = `${STORAGE_KEY}=${isAllAccepted ? 'accepted' : 'declined'}; max-age=31536000; path=/; SameSite=Lax; secure`
      document.cookie = `${LEGACY_CONSENT_KEY}=${isAllAccepted ? 'accepted' : 'rejected'}; max-age=31536000; path=/; SameSite=Lax; secure`
    } catch (e) {
      console.warn('Unable to write cookie consent to storage', e)
    }

    setPrefs({ essential: true, analytics, advertising })
    updateGoogleConsent(analytics, advertising)
    setShowNoticeBanner(false)
    setShowModal(false)
  }

  const handleAcceptAll = () => {
    persistConsent(true, true)
  }

  const handleDeclineAll = () => {
    persistConsent(false, false)
  }

  const handleSaveCustom = () => {
    persistConsent(prefs.analytics, prefs.advertising)
  }

  return (
    <>
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. Floating Persistent Cookie Settings Trigger Badge          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {!showNoticeBanner && !showModal && (
        <button
          type="button"
          onClick={openPreferencesModal}
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            zIndex: 9999999,
          }}
          className="flex items-center gap-2 rounded-full border border-amber-500/60 bg-[#0c0e14]/95 px-3.5 py-2 text-xs font-bold text-amber-400 shadow-2xl backdrop-blur-md hover:bg-slate-900 hover:border-amber-400 hover:scale-105 transition-all active:scale-95 cursor-pointer pointer-events-auto group notranslate"
          aria-label={tr('preferences')}
          title={tr('preferences')}
        >
          <Cookie className="size-4 group-hover:rotate-12 transition-transform text-amber-400 shrink-0" />
          <span className="text-[11px] text-zinc-200 font-semibold">{tr('preferences')}</span>
        </button>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. First-Time Visitor Bottom Floating Notice Banner           */}
      {/* ───────────────────────────────────────────────────────────── */}
      {showNoticeBanner && !showModal && (
        <div
          id="cookie-consent-banner"
          role="region"
          aria-label="Cookie & Privacy Notice"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '12px',
            right: '12px',
            maxWidth: '576px',
            zIndex: 9999999,
          }}
          className="mx-auto sm:mr-6 sm:ml-auto rounded-2xl sm:rounded-3xl border border-amber-500/60 bg-[#0a0a0e]/98 p-5 sm:p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl opacity-100 transition-all duration-300 pointer-events-auto notranslate"
        >
          <div className="space-y-4">
            {/* Top Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="size-11 sm:size-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
                  <div className="size-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                    <Cookie className="size-6 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      {tr('noticeTitle')}
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      <ShieldCheck className="size-3" /> GDPR / ePrivacy
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {tr('noticeDesc')}{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 transition-colors inline-flex items-center gap-0.5"
                    >
                      <span>{tr('privacyPolicy')}</span>
                      <ExternalLink className="size-3 opacity-70" />
                    </Link>{' '}
                    {tr('learnMore')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDeclineAll}
                className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label={tr('decline')}
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={openPreferencesModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              >
                <Settings2 className="size-3.5 text-amber-400" />
                <span>{tr('preferences')}</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleDeclineAll}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-200 hover:text-white text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {tr('decline')}
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 hover:opacity-95 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {tr('acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. Full Centered Cookie Preferences Alert Dialog Modal        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {showModal && (
        <div
          id="cardzy-cookie-modal-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          className="p-3 sm:p-4 md:p-6 opacity-100 transition-opacity duration-200 pointer-events-auto notranslate"
          onClick={handleBackdropClick}
        >
          <div
            style={{
              maxHeight: '90vh',
              width: '100%',
              maxWidth: '36rem',
            }}
            className="relative rounded-3xl border border-amber-500/50 bg-[#0c0e14] shadow-2xl overflow-hidden flex flex-col text-white opacity-100 transition-all duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-slate-950/90">
              <div className="flex items-start gap-3.5 pr-2">
                <div className="size-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 p-2 text-amber-400 flex items-center justify-center shrink-0">
                  <Cookie className="size-6 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      id="cookie-preferences-title"
                      className="text-base sm:text-lg font-extrabold text-white tracking-tight"
                    >
                      {tr('modalTitle')}
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      <ShieldCheck className="size-3" /> GDPR / ePrivacy
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{tr('modalDesc')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <kbd className="hidden sm:inline text-[11px] font-mono bg-white/10 border border-white/15 px-1.5 py-0.5 rounded text-zinc-400">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={closePreferencesModal}
                  className="rounded-xl p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-160px)]">
              {/* 1. Strictly Essential Cookies */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-4.5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <Lock className="size-4 text-emerald-400 shrink-0" />
                      <span>{tr('strictlyEssential')}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('strictlyEssentialDesc')}
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                    {tr('alwaysActive')}
                  </span>
                </div>
              </div>

              {/* 2. Performance & Analytics Cookies */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-4.5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <BarChart3 className="size-4 text-cyan-400 shrink-0" />
                      <span>{tr('analyticsTitle')}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('analyticsDesc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                      className="sr-only peer"
                      aria-label="Toggle analytics cookies"
                    />
                    <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
                  </label>
                </div>
              </div>

              {/* 3. Advertising & Marketing Cookies */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-4.5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <Sparkles className="size-4 text-amber-400 shrink-0" />
                      <span>{tr('advertisingTitle')}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tr('advertisingDesc')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={prefs.advertising}
                      onChange={(e) => setPrefs({ ...prefs, advertising: e.target.checked })}
                      className="sr-only peer"
                      aria-label="Toggle advertising cookies"
                    />
                    <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                  </label>
                </div>
              </div>

              {/* Privacy Policy Link Note */}
              <div className="text-[11px] text-zinc-400 px-1 pt-1 flex items-center justify-between">
                <span>
                  {tr('noticeDesc')}{' '}
                  <Link
                    href="/privacy-policy"
                    onClick={closePreferencesModal}
                    className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 inline-flex items-center gap-0.5"
                  >
                    <span>{tr('privacyPolicy')}</span>
                    <ExternalLink className="size-3 opacity-70" />
                  </Link>
                </span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-4 sm:p-5 border-t border-white/10 bg-slate-950/90">
              <button
                type="button"
                onClick={handleDeclineAll}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-200 hover:text-white text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
              >
                {tr('decline')}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Check className="size-3.5" />
                  <span>{tr('saveChoices')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 hover:opacity-95 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {tr('acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
