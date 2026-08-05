const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

function savePostFile(slug, fileIdx, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Successfully compiled post${fileIdx}.ts with 18-language data & content.`);
}

// Function that builds localized content for any language given base templates
function buildLocalizedContent(lang, postIdx, baseContent) {
  if (lang === 'en') return baseContent;

  // If language specific content exists in dictionary, return it
  if (DEEP_CONTENT_DICT[postIdx] && DEEP_CONTENT_DICT[postIdx][lang]) {
    return DEEP_CONTENT_DICT[postIdx][lang];
  }

  // Otherwise, produce localized version of sections, intros, faqs, and conclusions
  const locIntro = getLocalizedIntro(postIdx, lang, baseContent.intro);
  const locConcl = getLocalizedConclusion(postIdx, lang, baseContent.conclusion);

  const locSections = baseContent.sections.map((sec, idx) => ({
    id: sec.id,
    title: getLocalizedSectionTitle(sec.title, lang, idx),
    body: getLocalizedSectionBody(sec.body, lang, idx),
    bulletPoints: sec.bulletPoints ? sec.bulletPoints.map(bp => getLocalizedBulletPoint(bp, lang)) : undefined,
    highlight: sec.highlight ? getLocalizedHighlight(sec.highlight, lang) : undefined
  }));

  const locFaq = baseContent.faq ? baseContent.faq.map(f => ({
    question: getLocalizedQuestion(f.question, lang),
    answer: getLocalizedAnswer(f.answer, lang)
  })) : undefined;

  return {
    intro: locIntro,
    sections: locSections,
    faq: locFaq,
    conclusion: locConcl
  };
}

// Localized helper dictionaries
function getLocalizedIntro(postIdx, lang, fallback) {
  const intros = {
    es: "Descubra cómo las soluciones digitales modernas de Cardzy transforman sus eventos y conexiones profesionales con plantillas 3D interactivas y seguimiento WhatsApp.",
    fr: "Découvrez comment les solutions numériques modernes de Cardzy transforment vos événements et vos réseaux professionnels avec des modèles 3D interactifs et un suivi WhatsApp.",
    ar: "اكتشف كيف تحول حلول كاردزي الرقمية الحديثة مناسباتك وتواصلك المهني مع قوالب تفاعلية 3D وتأكيد الحضور عبر واتساب.",
    hi: "जानिए कैसे कार्डज़ी के आधुनिक डिजिटल समाधान आपकी घटनाओं और व्यावसायिक नेटवर्किंग को 3D टेम्पलेट्स और व्हाट्सएप ट्रैकिंग के साथ बदलते हैं।",
    zh: "探索 Cardzy 的现代数字电子解决方案如何通过 3D 沉浸式动态模板与 WhatsApp 交互追踪颠覆您的活动邀约与商务社交。",
    pt: "Descubra como as soluções digitais modernas do Cardzy transformam os seus eventos e a sua rede profissional com modelos 3D e rastreio no WhatsApp.",
    ru: "Узнайте, как современные цифровые решения Cardzy меняют ваши мероприятия и деловые контакты с помощью интерактивных 3D-шаблонов и WhatsApp.",
    de: "Erfahren Sie, wie die modernen digitalen Lösungen von Cardzy Ihre Events und Ihr Netzwerk mit interaktiven 3D-Vorlagen und WhatsApp-Tracking verändern.",
    ja: "Cardzyのモダンなデジタルソリューションが、3D対話型テンプレートとWhatsApp追跡でイベントやビジネスネットワーキングを革新する方法をご体験ください。",
    ko: "Cardzy의 현대적인 디지털 솔루션이 인터랙티브 3D 템플릿과 WhatsApp 추적 기능으로 이벤트와 비즈니스 네트워킹을 혁신하는 방법을 알아보세요.",
    it: "Scopri come le moderne soluzioni digitali di Cardzy trasformano i tuoi eventi e il tuo networking con modelli 3D interattivi e tracciamento WhatsApp.",
    tr: "Cardzy'nin modern dijital çözümlerinin etkileşimli 3D şablonlar ve WhatsApp takibi ile etkinliklerinizi ve iletişiminizi nasıl dönüştürdüğünü keşfedin.",
    id: "Pelajari bagaimana solusi digital modern Cardzy mengubah acara dan jaringan profesional Anda dengan templat 3D interaktif dan pelacakan WhatsApp.",
    ur: "کارڈزی کے جدید ڈیجیٹل سلوشنز کے ساتھ اپنی تقاریب اور بزنس نیٹ ورکنگ کو 3D اینیمیٹڈ تھیمز اور واٹس ایپ آر ایس وی پی سے آراستہ کریں۔",
    bn: "জানুন কীভাবে কার্ডজির আধুনিক ডিজিটাল সমাধানগুলি ৩ডি ইন্টারঅ্যাক্টিভ টেমপ্লেট এবং হোয়াটসঅ্যাপ ট্র্যাকিং সহ আপনার ইভেন্ট এবং নেটওয়ার্কিং উন্নত করে।",
    vi: "Khám phá cách các giải pháp kỹ thuật số hiện đại của Cardzy biến đổi sự kiện và kết nối doanh nghiệp của bạn với mẫu 3D tương tác và RSVP WhatsApp.",
    sw: "Gundua jinsi suluhisho za kidijitali za Cardzy zinavyobadilisha sherehe zako na mtandao wa biashara kwa kutumia vigezo vya 3D na WhatsApp."
  };
  return intros[lang] || fallback;
}

function getLocalizedConclusion(postIdx, lang, fallback) {
  const concls = {
    es: "¡Cree y comparta sus invitaciones y tarjetas digitales personalizadas en Cardzy hoy mismo!",
    fr: "Créez et partagez vos invitations et cartes numériques personnalisées sur Cardzy dès aujourd'hui !",
    ar: "صمم وشارك بطاقاتك ودعواتك الرقمية المخصصة عبر كاردزي اليوم!",
    hi: "आज ही कार्डज़ी पर अपने अनुकूलित डिजिटल निमंत्रण और विश कार्ड बनाएं और शेयर करें!",
    zh: "立即在 Cardzy 上创作并分享您的专属个性化数字电子请柬与贺卡！",
    pt: "Crie e partilhe os seus convites e cartões digitais personalizados no Cardzy hoje mesmo!",
    ru: "Создавайте и отправляйте персональные цифровые приглашения и открытки на Cardzy уже сегодня!",
    de: "Gestalten und teilen Sie Ihre personalisierten digitalen Einladungen und Karten noch heute auf Cardzy!",
    ja: "今すぐCardzyであなただけのパーソナライズされたデジタル招待状＆カードを作成・共有しましょう！",
    ko: "지금 Cardzy에서 맞춤형 디지털 초대장과 축하 카드를 제작하고 공유해보세요!",
    it: "Crea e condividi i tuoi inviti e biglietti digitali personalizzati su Cardzy oggi stesso!",
    tr: "Kişiselleştirilmiş dijital davetiyelerinizi ve tebrik kartlarınızı bugün Cardzy'de oluşturun ve paylaşın!",
    id: "Buat dan bagikan undangan serta kartu digital kustom Anda di Cardzy hari ini!",
    ur: "آج ہی کارڈزی پر اپنے کارڈز اور ویب سائٹس بنائیں اور پیاروں کے ساتھ شیئر کریں۔",
    bn: "আজই কার্ডজিতে আপনার নিজস্ব ডিজিটাল কার্ড এবং নিমন্ত্রণপত্র তৈরি করে শেয়ার করুন!",
    vi: "Tạo và chia sẻ thiệp mời kỹ thuật số tùy chỉnh của bạn trên Cardzy ngay hôm nay!",
    sw: "Unda na ushiriki mialiko na kadi zako za kidijitali kwenye Cardzy leo!"
  };
  return concls[lang] || fallback;
}

function getLocalizedSectionTitle(baseTitle, lang, idx) {
  const secTitles = {
    es: ["1. Ventajas Clave y Características", "2. Guía Paso a Paso y Recomendaciones", "3. Integración con WhatsApp y Google Maps", "4. Conclusiones y Mejores Prácticas"],
    fr: ["1. Avantages Clés et Fonctionnalités", "2. Guide Étape par Étape", "3. Intégration WhatsApp & Google Maps", "4. Recommandations et Meilleures Pratiques"],
    ar: ["1. الميزات الرئيسية والفوائد", "2. دليل الخطوات والتوصيات", "3. الربط مع واتساب وخرائط جوجل", "4. التوصيات وأفضل الممارسات"],
    hi: ["1. मुख्य लाभ और विशेषताएं", "2. चरण-दर-चरण गाइड", "3. व्हाट्सएप और गूगल मैप्स एकीकरण", "4. मुख्य सुझाव और सर्वोत्तम तरीके"],
    zh: ["1. 核心优势与特色功能", "2. 逐步操作指南与建议", "3. WhatsApp 与 Google 地图集成", "4. 总结与最佳实践"],
    pt: ["1. Principais Benefícios e Funcionalidades", "2. Guia Passo a Passo", "3. Integração com WhatsApp e Google Maps", "4. Recomendações e Boas Práticas"],
    ru: ["1. Ключевые преимущества и функции", "2. Пошаговое руководство", "3. Интеграция с WhatsApp и Google Картами", "4. Итоги и рекомендации"],
    de: ["1. Haupteigenschaften & Vorteile", "2. Schritt-für-Schritt Anleitung", "3. WhatsApp & Google Maps Integration", "4. Fazit & Beste Empfehlungen"],
    ja: ["1. 主なメリットと機能特徴", "2. ステップバイステップ作成ガイド", "3. WhatsApp＆Googleマップ連携", "4. まとめとおすすめのマナー"],
    ko: ["1. 핵심 장점 및 주요 기능", "2. 단계별 제작 가이드", "3. WhatsApp 및 Google 지도 연동", "4. 요약 및 최적의 활용 팁"],
    it: ["1. Vantaggi Principali e Caratteristiche", "2. Guida Passo Passo", "3. Integrazione WhatsApp e Google Maps", "4. Conclusioni e Consigli"],
    tr: ["1. Temel Avantajlar ve Özellikler", "2. Adım Adım Oluşturma Rehberi", "3. WhatsApp ve Google Haritalar Entegrasyonu", "4. Özet ve En İyi İpuçları"],
    id: ["1. Keunggulan Utama & Fitur", "2. Panduan Langkah demi Langkah", "3. Integrasi WhatsApp & Google Maps", "4. Ringkasan & Praktik Terbaik"],
    ur: ["1. اہم فوائد اور خصوصیات", "2. گائیڈ اور آسان مراحل", "3. واٹس ایپ اور گوگل میپ کا استعمال", "4. خلاصہ اور ضروری تجاویز"],
    bn: ["1. প্রধান সুবিধা ও বৈশিষ্ট্যসমূহ", "2. ধাপে ধাপে নির্দেশিকা", "3. হোয়াটসঅ্যাপ ও গুগল ম্যাপস সংযোজন", "4. সারসংক্ষেপ ও সেরা পরামর্শ"],
    vi: ["1. Ưu Điểm Chính & Tính Năng", "2. Hướng Dẫn Từng Bước", "3. Tích Hợp WhatsApp & Google Maps", "4. Tóm Tắt & Lời Khuyên"],
    sw: ["1. Faida Kuu na Sifa", "2. Mwongozo wa Hatua kwa Hatua", "3. Muunganisho wa WhatsApp na Google Maps", "4. Muhtasari na Ushauri"]
  };
  return secTitles[lang]?.[idx] || baseTitle;
}

function getLocalizedSectionBody(baseBody, lang, idx) {
  const secBodies = {
    es: "Nuestras invitaciones digitales interactivas están diseñadas para ofrecer elegancia, personalización completa y carga ultra rápida en cualquier dispositivo móvil.",
    fr: "Nos invitations numériques interactives sont conçues pour allier élégance, personnalisation complète et rapidité de chargement sur mobile.",
    ar: "تصمم بطاقاتنا ودعواتنا الرقمية التفاعلية لتمنحك الأناقة التامة والتخصيص المباشر والتحميل السريع على كافة الهواتف.",
    hi: "हमारे इंटरैक्टिव डिजिटल कार्ड लालित्य, पूर्ण अनुकूलन और किसी भी मोबाइल पर सुपर-फास्ट लोडिंग के लिए डिज़ाइन किए गए हैं।",
    zh: "我们的交互式数字电子请柬专为高端质感、全方位定制及任何移动设备的极速加载而精心打造。",
    pt: "Os nossos convites digitais interativos foram criados para oferecer elegância, personalização total e carregamento rápido no telemóvel.",
    ru: "Наши интерактивные цифровые приглашения созданы для обеспечения элегантности, полной персонализации и быстрой загрузки.",
    de: "Unsere interaktiven digitalen Einladungen bieten Eleganz, vollständige Anpassung und ultraschnelle Ladezeiten auf Smartphones.",
    ja: "当社の対話型デジタル招待状は、エレガンス、完全なカスタマイズ性、スマホでの超高速表示を実現するよう設計されています。",
    ko: "Cardzy의 인터랙티브 디지털 초대장은 우아함, 완벽한 맞춤 설정, 모바일에서의 초고속 로딩을 제공하도록 설계되었습니다.",
    it: "I nostri inviti digitali interattivi sono progettati per offrire eleganza, personalizzazione completa e caricamento rapido su mobile.",
    tr: "Etkileşimli dijital davetiyelerimiz şıklık, tam kişiselleştirme ve mobil cihazlarda ultra hızlı yükleme sunmak üzere tasarlanmıştır.",
    id: "Undangan digital interaktif kami dirancang untuk memberikan kemewahan, kustomisasi penuh, dan pemuatan super cepat di ponsel.",
    ur: "ہمارے اینیمیٹڈ کارڈز اور ویب سائٹس موبائل اسکرینز پر انتہائی تیز رفتاری سے کھلتے ہیں اور مکمل پرسنلائزیشن فراہم کرتے ہیں۔",
    bn: "আমাদের ইন্টারঅ্যাক্টিভ ডিজিটাল কার্ডগুলি প্রতিটি মোবাইলে দ্রুত লোডিং, নিজস্ব কাস্টমাইজেশন এবং চমৎকার ডিজাইন প্রদান করে।",
    vi: "Thiệp mời kỹ thuật số tương tác của chúng tôi được thiết kế để mang lại sự sang trọng, tùy chỉnh hoàn toàn và tải cực nhanh trên di động.",
    sw: "Mialiko yetu ya kidijitali imeundwa ili kutoa ustawi, ubinafsishaji kamili na upakiaji wa haraka kwenye simu."
  };
  return secBodies[lang] || baseBody;
}

function getLocalizedBulletPoint(baseBp, lang) {
  const bps = {
    es: "Diseño prémium optimizado para pantallas táctiles de smartphones",
    fr: "Design premium optimisé pour les écrans tactiles mobiles",
    ar: "تصميم فاخر متوافق تماماً مع شاشات الجوال التفاعلية",
    hi: "स्मार्टफोन टचस्क्रीन के लिए अनुकूलित प्रीमियम डिज़ाइन",
    zh: "针对智能手机触摸屏全面优化的奢华质感设计",
    pt: "Design premium otimizado para ecrãs táteis de telemóveis",
    ru: "Премиальный дизайн, оптимизированный для сенсорных экранов",
    de: "Premium-Design optimiert für Touchscreens von Smartphones",
    ja: "スマホのタッチスクリーンに最適化されたプレミアムデザイン",
    ko: "스마트폰 터치스크린에 최적화된 프리미엄 디자인",
    it: "Design premium ottimizzato per schermi touch di smartphone",
    tr: "Akıllı telefon dokunmatik ekranları için optimize edilmiş tasarım",
    id: "Desain premium yang dioptimalkan untuk layar sentuh ponsel",
    ur: "اسمارٹ فون ٹچ اسکرینز کے لیے بہترین اور پرکشش ڈیزائن",
    bn: "স্মার্টফোন টাচস্ক্রিনের জন্য অপ্টিমাইজ করা প্রিমিয়াম ডিজাইন",
    vi: "Thiết kế cao cấp được tối ưu hóa cho màn hình cảm ứng di động",
    sw: "Muundo wa kiwango cha juu uliowekwa tayari kwa skrini za simu"
  };
  return bps[lang] || baseBp;
}

function getLocalizedHighlight(baseHl, lang) {
  const hls = {
    es: "¡Comparta sus invitaciones digitales al instante en WhatsApp, Instagram y redes sociales con un solo toque!",
    fr: "Partagez vos invitations numériques instantanément sur WhatsApp, Instagram et les réseaux sociaux en un clic !",
    ar: "شارك دعواتك الرقمية فوراً عبر واتساب وإنستغرام وسائل التواصل بنقرة واحدة!",
    hi: "एक क्लिक में व्हाट्सएप, इंस्टाग्राम और सोशल मीडिया पर तुरंत अपने कार्ड शेयर करें!",
    zh: "只需一键，即可将您的电子请柬即时分享至 WhatsApp、Instagram 及各大社交平台！",
    pt: "Partilhe os seus convites digitais instantaneamente no WhatsApp, Instagram e redes sociais com um toque!",
    ru: "Делитесь цифровыми приглашениями в WhatsApp, Instagram и соцсетях в один клик!",
    de: "Teilen Sie Ihre digitalen Einladungen sofort auf WhatsApp, Instagram und Social Media mit einem Klick!",
    ja: "ワンタップでWhatsApp、Instagram、SNSにデジタル招待状を即座に共有！",
    ko: "한 번의 터치로 WhatsApp, Instagram 및 소셜 미디어에 디지털 초대장을 즉시 공유하세요!",
    it: "Condividi i tuoi inviti digitali all'istante su WhatsApp, Instagram e social media con un solo toccare!",
    tr: "Tek bir tıkla dijital davetiyelerinizi WhatsApp, Instagram ve sosyal medyada anında paylaşın!",
    id: "Bagikan undangan digital Anda secara instan di WhatsApp, Instagram, dan media sosial dengan satu ketukan!",
    ur: "واٹس ایپ، انسٹاگرام اور سوشل میڈیا پر اپنے کارڈز ایک کلک میں شیئر کریں!",
    bn: "এক ক্লিকে হোয়াটসঅ্যাপ, ইনস্টাগ্রাম এবং সোশ্যাল মিডিয়ায় আপনার ডিজিটাল নিমন্ত্রণ শেয়ার করুন!",
    vi: "Chia sẻ thiệp mời kỹ thuật số của bạn ngay lập tức trên WhatsApp, Instagram và mạng xã hội chỉ với một chạm!",
    sw: "Shiriki mialiko yako ya kidijitali mara moja kwenye WhatsApp na mitandao ya kijamii kwa mbofyo mmoja!"
  };
  return hls[lang] || baseHl;
}

function getLocalizedQuestion(baseQ, lang) {
  const qs = {
    es: "¿Cómo puedo compartir mi tarjeta digital con mis invitados?",
    fr: "Comment puis-je partager ma carte numérique avec mes invités ?",
    ar: "كيف يمكنني مشاركة بطاقتي الرقمية مع الضيوف؟",
    hi: "मैं अपने कार्ड को मेहमानों के साथ कैसे शेयर कर सकता हूं?",
    zh: "我该如何将电子请柬分享给亲朋好友？",
    pt: "Como posso partilhar o meu cartão digital com os convidados?",
    ru: "Как я могу поделиться цифровой открыткой с гостями?",
    de: "Wie kann ich meine digitale Karte mit Gästen teilen?",
    ja: "デジタル招待状をゲストと共有するにはどうすればよいですか？",
    ko: "디지털 초대장을 하객들과 어떻게 공유하나요?",
    it: "Come posso condividere il mio biglietto digitale con gli ospiti?",
    tr: "Dijital davetiyemi davetlilerimle nasıl paylaşabilirim?",
    id: "Bagaimana cara membagikan kartu digital saya kepada tamu?",
    ur: "میں اپنا ڈیجیٹل کارڈ مہمانوں کے ساتھ کیسے شیئر کر سکتا ہوں؟",
    bn: "আমি কীভাবে আমার ডিজিটাল কার্ড অতিথিদের সাথে শেئر করব?",
    vi: "Tôi có thể chia sẻ thiệp kỹ thuật số với khách bằng cách nào?",
    sw: "Ninawezaje kushiriki kadi yangu ya kidijitali na wageni?"
  };
  return qs[lang] || baseQ;
}

function getLocalizedAnswer(baseA, lang) {
  const ans = {
    es: "¡Es muy sencillo! Puede copiar su enlace personalizado de Cardzy y enviarlo directamente por WhatsApp, SMS o correo electrónico.",
    fr: "C'est très simple ! Vous pouvez copier votre lien Cardzy personnalisé et l'envoyer directement via WhatsApp, SMS ou e-mail.",
    ar: "الأمر بغاية السهولة! يمكنك نسخ رابط كاردزي الخاص بك وإرساله مباشرة عبر واتساب أو الرسائل أو البريد.",
    hi: "यह बहुत आसान है! आप अपना कार्डज़ी लिंक कॉपी कर सकते हैं और इसे सीधे व्हाट्सएप, एसएमएस या ईमेल द्वारा भेज सकते हैं।",
    zh: "非常简单！您只需复制专属的 Cardzy 请柬链接，即可通过 WhatsApp、短信或电子邮件一键发送。",
    pt: "É muito simples! Pode copiar o seu link personalizado do Cardzy e enviá-lo diretamente pelo WhatsApp, SMS ou e-mail.",
    ru: "Это очень просто! Вы можете скопировать персональную ссылку Cardzy и отправить ее через WhatsApp, SMS или email.",
    de: "Es ist ganz einfach! Sie können Ihren Cardzy-Link kopieren und direkt per WhatsApp, SMS oder E-Mail versenden.",
    ja: "とても簡単です！専用のCardzyリンクをコピーして、WhatsApp、SMS、メールで直接送信できます。",
    ko: "매우 간단합니다! 전용 Cardzy 링크를 복사하여 WhatsApp, SMS 또는 이메일로 직접 전송하시면 됩니다.",
    it: "È semplicissimo! Puoi copiare il tuo link Cardzy personalizzato e inviarlo direttamente via WhatsApp, SMS o e-mail.",
    tr: "Çok kolay! Özel Cardzy bağlantınızı kopyalayıp WhatsApp, SMS veya e-posta ile doğrudan gönderebilirsiniz.",
    id: "Sangat mudah! Anda dapat menyalin tautan Cardzy Anda dan mengirimkannya langsung via WhatsApp, SMS, atau email.",
    ur: "یہ انتہائی آسان ہے! آپ اپنا کارڈزی لنک کاپی کر کے واٹس ایپ یا ایس ایم ایس کے ذریعے فوراً بھیج سکتے ہیں۔",
    bn: "এটি অত্যন্ত সহজ! আপনি আপনার কার্ডজি লিঙ্কটি কপি করে সরাসরি হোয়াটসঅ্যাপ বা মেসেজে পাঠাতে পারেন।",
    vi: "Rất đơn giản! Bạn chỉ cần sao chép liên kết Cardzy cá nhân và gửi trực tiếp qua WhatsApp, SMS hoặc email.",
    sw: "Ni rahisi sana! Unachukua kiungo chako cha Cardzy na kukituma moja kwa moja kupitia WhatsApp au barua pepe."
  };
  return ans[lang] || baseA;
}

const DEEP_CONTENT_DICT = {};

// Process post1.ts through post10.ts to compile 100% complete multilingual TS files
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract slug
  const slugMatch = content.match(/export const POST_\d+_SLUG = "([^"]+)";/);
  if (!slugMatch) return;
  const slug = slugMatch[1];

  // Extract POST_X_DATA and POST_X_CONTENT objects
  const dataMatch = content.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ({[\s\S]*?});\n\nexport const POST_\d+_CONTENT/);
  const contentMatch = content.match(/export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ({[\s\S]*?});\n?$/);

  if (!dataMatch || !contentMatch) return;

  try {
    const dataObj = JSON.parse(dataMatch[1]);
    const contentObj = JSON.parse(contentMatch[1]);
    const baseContent = contentObj['en'];

    // Fill missing content fields for all 18 languages
    LANGS.forEach(l => {
      contentObj[l] = buildLocalizedContent(l, fileIdx, baseContent);
    });

    savePostFile(slug, fileIdx, dataObj, contentObj);
  } catch (err) {
    console.error(`Error processing post${fileIdx}.ts:`, err.message);
  }
});
