'use client'

import { HelpCircle, ChevronDown, Sparkles, ShieldCheck, Leaf, Smartphone, MessageCircle, Link2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export interface FAQItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

export const STRUCTURED_FAQS_MULTILINGUAL: Record<string, { question: Record<string, string>; answer: Record<string, string> }> = {
  'how-do-animated-digital-invitations-work': {
    question: {
      en: 'How do animated digital invitations work?',
      ur: 'اینیمیٹڈ ڈیجیٹل دعوت نامے کیسے کام کرتے ہیں؟',
      ar: 'كيف تعمل بطاقات الدعوة الرقمية المتحركة ثلاثية الأبعاد؟',
      es: '¿Cómo funcionan las invitaciones digitales animadas?',
      fr: 'Comment fonctionnent les invitations numériques animées ?',
      hi: 'एनिमेटेड डिजिटल निमंत्रण पत्र कैसे काम करते हैं?',
      zh: '3D 动态电子请柬是如何工作的？',
      pt: 'Como funcionam os convites digitais animados?',
      ru: 'Как работают анимированные цифровые приглашения?',
      de: 'Wie funktionieren animierte digitale Einladungen?',
      ja: 'アニメーション付きデジタル招待状はどのように機能しますか？',
      ko: '애니메이션 디지털 초대장은 어떻게 작동하나요?',
      it: 'Come funzionano gli inviti digitali animati?',
      tr: 'Animasyonlu dijital davetiyeler nasıl çalışır?',
      id: 'Bagaimana cara kerja undangan digital beranimasi?',
      bn: 'অ্যানিমেটেড ডিজিটাল নিমন্ত্রণপত্র কীভাবে কাজ করে?',
      vi: 'Thiệp mời kỹ thuật số hoạt hình hoạt động như thế nào?',
      sw: 'Je, mialiko ya kidijitali yenye uhuishaji inafanyaje kazi?'
    },
    answer: {
      en: "Cardzy's animated digital invitations transform traditional paper stationery into an immersive, interactive online event landing page. When guests open their custom link, they experience a realistic 3D envelope unboxing animation accompanied by curated background music, celebratory confetti, and elegant bilingual typography. Each invitation page includes essential event logistics such as an interactive Google Maps venue link, a live countdown timer, dress code guidelines, photo galleries, and gift registry details on any mobile or desktop browser.",
      ur: 'کارڈزی کے اینیمیٹڈ ڈیجیٹل کارڈز روایتی کاغذ کے کارڈز کو جدید 3D لفافہ اوپننگ، پس منظر کی دھن، کنفیٹی اور اردو نستعلیق خطاطی کے ساتھ ایک لائیو ویب پیج میں بدل دیتے ہیں۔ مہمان اپنے موبائل فون پر بغیر کسی ایپ کو ڈاؤن لوڈ کیے صرف ایک لنک پر کلک کر کے گوگل میپس لوکیشن، ٹائمر اور واٹس ایپ آر ایس وی پی حاصل کر سکتے ہیں۔',
      ar: 'تحوّل كاردزي بطاقات الدعوة الورقية التقليدية إلى صفحات ويب تفاعلية ثلاثية الأبعاد 3D مع موسيقى خلفية، خطوط عربية أنيقة، وخريطة الموقع عبر خرائط جوجل، وتأكيد الحضور عبر واتساب بضغطة زر دون الحاجة لتحميل أي تطبيق.',
      es: 'Las invitaciones digitales animadas de Cardzy transforman la papelería tradicional en una experiencia interactiva en 3D con música de fondo, confeti, mapas de Google Maps y confirmación de RSVP por WhatsApp sin necesidad de descargar aplicaciones.',
      fr: 'Les invitations numériques Cardzy transforment le papier traditionnel en une page web interactive 3D avec déballage d\'enveloppe, musique d\'ambiance, itinéraire Google Maps et gestion RSVP par WhatsApp sans application requise.',
      hi: 'कार्डज़ी के एनिमेटेड डिजिटल कार्ड पारंपरिक निमंत्रण पत्रों को 3D लिफाफा अनबॉक्सिंग, मधुर पृष्ठभूमि संगीत, गूगल मैप्स लोकेशन और व्हाट्सएप आरएसवीपी के साथ एक आधुनिक इंटरैक्टिव वेब पेज में बदलते हैं।',
      zh: 'Cardzy 动态电子请柬将传统纸质贺卡升华为沉浸式 3D 信封展开页面，配以典雅背景音乐、Google 地图精准导航及 WhatsApp 一键 RSVP 确认，无需下载任何 App。',
      pt: 'Os convites digitais animados da Cardzy transformam os cartões tradicionais numa experiência 3D interativa com música de fundo, confetes, mapa GPS do Google Maps e confirmação RSVP via WhatsApp.',
      ru: 'Анимированные цифровые приглашения Cardzy превращают обычные открытки в интерактивные 3D-страницы с открытием конверта, музыкой, геолокацией Google Maps и кнопкой ответа в WhatsApp.',
      de: 'Die animierten digitalen Einladungen von Cardzy verwandeln traditionelle Papierkarten in interaktive 3D-Seiten mit Briefumschlag-Animation, Musik, Google Maps Wegbeschreibung und WhatsApp-RSVP.',
      ja: 'Cardzyのデジタル招待状は、3D封筒開封アニメーション、BGM、Googleマップ案内、1タップWhatsApp出欠確認を備えた最新のウェブページとして機能します。',
      ko: 'Cardzy의 애니메이션 디지털 초대장은 3D 봉투 개봉 효과, 배경 음악, Google 지도 길 안내, 원클릭 WhatsApp 참석 확인(RSVP)을 제공하는 인터랙티브 웹페이지입니다.',
      it: 'Gli inviti digitali animati di Cardzy trasformano la carta tradizionale in una pagina web 3D interattiva con musica, coriandoli, indicazioni Google Maps e RSVP via WhatsApp.',
      tr: 'Cardzy animasyonlu dijital davetiyeleri, 3D zarf açılma efekti, arka plan müziği, Google Haritalar konumu ve WhatsApp LCV onayı ile etkileşimli bir deneyim sunar.',
      id: 'Undangan digital animasi Cardzy mengubah kartu kertas biasa menjadi halaman web interaktif 3D dengan efek buka amplop, musik latar, navigasi Google Maps, dan konfirmasi WhatsApp RSVP.',
      bn: 'কার্ডজির অ্যানিমেটেড ডিজিটাল কার্ডগুলি ৩ডি খাম খোলার অ্যানিমেশন, ব্যাকগ্রাউন্ড মিউজিক, গুগল ম্যাপস লোকেশন এবং হোয়াটসঅ্যাপ আরএসভিপি সহ আধুনিক ওয়েব অভিজ্ঞতা প্রদান করে।',
      vi: 'Thiệp mời kỹ thuật số hoạt hình của Cardzy mang đến trải nghiệm 3D mở phong bì chân thực, nhạc nền, bản đồ Google Maps và xác nhận tham dự RSVP qua WhatsApp tiện lợi.',
      sw: 'Mialiko ya kidijitali ya Cardzy inabadilisha kadi za kawaida kuwa kurasa za wavuti za 3D zenye uhuishaji, muziki, ramani ya Google Maps na uthibitisho wa RSVP wa WhatsApp.'
    }
  },
  'how-do-couples-track-guest-rsvps-via-whatsapp': {
    question: {
      en: 'How do couples track guest RSVPs via WhatsApp?',
      ur: 'واٹس ایپ کے ذریعے مہمانوں کے آر ایس وی پی کو کیسے ٹریک کیا جاتا ہے؟',
      ar: 'كيف يمكن تتبع وتأكيد حضور الضيوف عبر واتساب؟',
      es: '¿Cómo confirman y gestionan los invitados su asistencia por WhatsApp?',
      fr: 'Comment les invités confirment-ils leur présence par WhatsApp ?',
      hi: 'व्हाट्सएप के माध्यम से मेहमानों के आरएसवीपी को कैसे ट्रैक किया जाता है?',
      zh: '如何通过 WhatsApp 实时追踪管理宾客 RSVP 回执？',
      pt: 'Como os anfitriões rastreiam as confirmações RSVP pelo WhatsApp?',
      ru: 'Как отслеживать ответы гостей (RSVP) через WhatsApp?',
      de: 'Wie verfolgen Gastgeber Gäste-Zusagen über WhatsApp?',
      ja: 'WhatsAppを通じてゲストの出欠（RSVP）をどのように管理しますか？',
      ko: 'WhatsApp을 통해 하객 참석 여부(RSVP)를 어떻게 확인하나요?',
      it: 'Come si tracciano le conferme di partecipazione (RSVP) via WhatsApp?',
      tr: 'WhatsApp üzerinden davetli LCV yanıtları nasıl takip edilir?',
      id: 'Bagaimana cara melacak konfirmasi kehadiran (RSVP) tamu lewat WhatsApp?',
      bn: 'হোয়াটসঅ্যাপের মাধ্যমে অতিথিদের আরএসভিপি কীভাবে ট্র্যাক করা হয়?',
      vi: 'Làm thế nào để theo dõi phản hồi tham dự (RSVP) của khách qua WhatsApp?',
      sw: 'Je, waandaaji wanafuatiliaje uthibitisho wa wageni (RSVP) kupitia WhatsApp?'
    },
    answer: {
      en: "Tracking guest attendance with Cardzy is completely automated. When guests visit your wedding or event invitation website, they confirm their attendance, guest count, and dietary preferences. Our integrated WhatsApp RSVP system instantly delivers the confirmation directly to the host's phone and synchronizes live with your Cardzy host dashboard.",
      ur: 'کارڈزی کے ساتھ مہمانوں کی حاضری کو ٹریک کرنا بالکل خودکار ہے۔ جب مہمان آپ کے کارڈ لنک پر جاتے ہیں، وہ شرکت کی تصدیق اور افراد کی تعداد درج کرتے ہیں، جو خود بخود میزبان کے واٹس ایپ پر اور لائیو ڈیش بورڈ میں موصول ہو جاتی ہے۔',
      ar: 'يتم تأكيد الحضور تلقائياً؛ حيث يقوم الضيف بتأكيد حضوره وتحديد عدد أفراد عائلته، وتصلك الرسالة فوراً على رقم واتساب الخاص بك مع تحديث مباشر في لوحة التحكم.',
      es: 'El seguimiento de asistencia es 100% automatizado. Los invitados confirman su asistencia y número de acompañantes, enviando una notificación directa a su WhatsApp y al panel de control.',
      fr: 'La gestion des présences est entièrement automatisée. Les invités confirment leur présence en un clic, et vous recevez instantanément les détails sur votre WhatsApp et votre tableau de bord.',
      hi: 'मेहमानों की उपस्थिति को ट्रैक करना पूरी तरह से स्वचालित है। जब मेहमान आपके कार्ड पर पुष्टि करते हैं, तो विवरण तुरंत आपके व्हाट्सएप और लाइव डैशबोर्ड पर पहुंच जाता है।',
      zh: '宾客在请柬页面选择出席状态与同行人数后，系统会自动生成标准格式的 WhatsApp 确认消息直达主人手机，并在后台实时汇总统计。',
      pt: 'O rastreamento de convidados é totalmente automatizado. As confirmações chegam diretamente ao seu WhatsApp e ao painel de controlo da Cardzy.',
      ru: 'Отслеживание ответов гостей автоматизировано: при подтверждении на сайте гость отправляет структурированное сообщение в WhatsApp прямо организатору.',
      de: 'Die Gästeverwaltung ist vollautomatisiert. Zusagen werden direkt an Ihre WhatsApp-Nummer gesendet und im Cardzy-Dashboard in Echtzeit aktualisiert.',
      ja: 'ゲストが招待ページで出欠と人数を選択すると、主催者のWhatsAppに即座に通知が届き、ダッシュボードで一覧集計されます。',
      ko: '하객이 초대장에서 참석 여부와 인원을 입력하면 즉시 주최자의 WhatsApp으로 전송되며 실시간 대시보드에 자동 집계됩니다.',
      it: 'La gestione delle presenze è automatica: gli ospiti confermano con un clic e ricevi i dettagli su WhatsApp e sulla tua dashboard Cardzy.',
      tr: 'Katılım takibi tamamen otomatiktir. Davetliler katılım durumunu onayladığında doğrudan WhatsApp numaranıza ve Cardzy panelinize bildirim gelir.',
      id: 'Pelacakan kehadiran otomatis; konfirmasi tamu langsung terkirim ke WhatsApp Anda dan tersinkronisasi di dasbor Cardzy secara real-time.',
      bn: 'অতিথিদের উপস্থিতি ট্র্যাক করা সম্পূর্ণ স্বয়ংক্রিয়। নিশ্চিতকরণ বার্তা সরাসরি আপনার হোয়াটসঅ্যাপ এবং কার্ডজি ড্যাশবোর্ডে চলে আসে।',
      vi: 'Quản lý khách mời hoàn toàn tự động. Xác nhận tham dự được gửi trực tiếp đến WhatsApp của bạn và cập nhật trên bảng điều khiển Cardzy.',
      sw: 'Ufuatiliaji wa wageni ni wa kiotomatiki kabisa. Uthibitisho unatumwa moja kwa moja kwenye WhatsApp yako na dashibodi ya Cardzy.'
    }
  },
  'are-photos-and-personal-details-kept-secure': {
    question: {
      en: 'Are photos and personal details kept secure?',
      ur: 'کیا تصاویر اور ذاتی تفصیلات مکمل محفوظ رہتی ہیں؟',
      ar: 'هل الصور والبيانات الشخصية آمنة ومحمية؟',
      es: '¿Están seguras las fotos y los datos personales?',
      fr: 'Les photos et les données personnelles sont-elles sécurisées ?',
      hi: 'क्या तस्वीरें और व्यक्तिगत विवरण सुरक्षित रहते हैं?',
      zh: '上传的照片与私人信息是否享有隐私安全保障？',
      pt: 'As fotos e os dados pessoais estão seguros?',
      ru: 'Защищены ли фотографии и личные данные?',
      de: 'Sind Fotos und persönliche Daten geschützt?',
      ja: '写真や個人情報のセキュリティは安全ですか？',
      ko: '업로드한 사진과 개인정보는 안전하게 보호되나요?',
      it: 'Le foto e i dettagli personali sono al sicuro?',
      tr: 'Fotoğraflar ve kişisel bilgiler güvende mi?',
      id: 'Apakah foto dan data pribadi tersimpan dengan aman?',
      bn: 'ছবি এবং ব্যক্তিগত তথ্য কি সুরক্ষিত থাকে?',
      vi: 'Hình ảnh và thông tin cá nhân có được bảo mật an toàn không?',
      sw: 'Je, picha na maelezo binafsi yanalindwa kwa usalama?'
    },
    answer: {
      en: 'Yes, user privacy, family photographs, and event details are protected by enterprise-grade HTTPS encryption and Google Cloud infrastructure. We strictly adhere to GDPR regulations and never sell or publicly scrape your private family data.',
      ur: 'جی ہاں، کارڈزی پر تمام ڈیٹا اور تصاویر جدید ترین انکرپشن اور گوگل کلاؤڈ سیکیورٹی پروٹوکولز کے تحت محفوظ رکھی جاتی ہیں۔ ہم آپ کی ذاتی معلومات کو کبھی کسی تیسرے فریق کے ساتھ شیئر نہیں کرتے۔',
      ar: 'نعم، جميع الصور والبيانات مشفرة ومحمية عبر خوادم Google Cloud المشفرة وفق أعلى معايير الخصوصية وGDPR، ولا تتم مشاركتها مطلقاً.',
      es: 'Sí, todas las fotografías y datos familiares están protegidos con cifrado HTTPS y servidores de Google Cloud, cumpliendo estrictamente con el RGPD.',
      fr: 'Oui, vos photos et données sont protégées par un chiffrement de pointe et hébergées sur Google Cloud dans le respect total du RGPD.',
      hi: 'हाँ, कार्डज़ी पर आपका सारा डेटा और पारिवारिक तस्वीरें गूगल क्लाउड सुरक्षा और एन्क्रिप्शन के तहत 100% सुरक्षित रहती हैं।',
      zh: '是的，所有照片与家庭信息均依托 Google Cloud 企业级加密存储，严格遵循 GDPR 隐私条例，绝不泄露或商业化您的私人数据。',
      pt: 'Sim, todas as fotos e informações são protegidas por criptografia avançada e infraestrutura Google Cloud com total privacidade.',
      ru: 'Да, все данные и фотографии надежно защищены шифрованием HTTPS и облачной инфраструктурой Google Cloud в соответствии с GDPR.',
      de: 'Ja, alle Fotos und Daten sind durch moderne HTTPS-Verschlüsselung und Google Cloud-Infrastruktur DSGVO-konform geschützt.',
      ja: 'はい、すべての写真と個人情報はGoogle Cloudの暗号化ストレージで厳重に保護され、第三者に共有されることはありません。',
      ko: '네, 업로드된 사진과 개인정보는 Google Cloud의 엔터프라이즈급 암호화 기술로 철저히 보호되며 안전하게 관리됩니다.',
      it: 'Sì, tutte le foto e i dettagli personali sono protetti da crittografia avanzata su Google Cloud nel pieno rispetto del GDPR.',
      tr: 'Evet, fotoğraflarınız ve kişisel verileriniz Google Cloud şifreleme altyapısıyla KVKK ve GDPR standartlarına uygun olarak korunur.',
      id: 'Ya, semua foto dan detail acara dilindungi dengan enkripsi tingkat tinggi dan infrastruktur Google Cloud yang aman.',
      bn: 'হ্যাঁ, ব্যবহারকারীর গোপনীয়তা এবং ছবিগুলি গুগল ক্লাউড এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত থাকে।',
      vi: 'Có, toàn bộ ảnh và dữ liệu được bảo vệ bằng mã hóa HTTPS tiêu chuẩn cao trên nền tảng Google Cloud an toàn tuyệt đối.',
      sw: 'Ndiyo, picha na data zako zinalindwa kwa njia fiche ya hali ya juu na miundombinu ya Google Cloud kwa usalama kamili.'
    }
  },
  'can-digital-greeting-cards-be-customized-on-mobile-devices': {
    question: {
      en: 'Can digital greeting cards be customized on mobile devices?',
      ur: 'کیا موبائل فون پر ڈیجیٹل گریٹنگ کارڈز بنائے جا سکتے ہیں؟',
      ar: 'هل يمكن تصميم وتعديل بطاقات التهنئة عبر الهاتف المحمول؟',
      es: '¿Se pueden personalizar las tarjetas digitales desde el móvil?',
      fr: 'Peut-on personnaliser les cartes numériques sur smartphone ?',
      hi: 'क्या मोबाइल फोन पर डिजिटल कार्ड कस्टमाइज़ किए जा सकते हैं?',
      zh: '能否在手机移动端轻松定制与生成电子贺卡？',
      pt: 'É possível personalizar os cartões digitais pelo telemóvel / celular?',
      ru: 'Можно ли создавать и редактировать открытки на смартфоне?',
      de: 'Können digitale Grußkarten auf dem Smartphone erstellt werden?',
      ja: 'スマートフォンからデジタルカードをカスタマイズできますか？',
      ko: '스마트폰 모바일 기기에서도 디지털 카드를 맞춤 제작할 수 있나요?',
      it: 'È possibile personalizzare i biglietti digitali da smartphone?',
      tr: 'Dijital tebrik kartları cep telefonundan özelleştirilebilir mi?',
      id: 'Bisakah kartu ucapan digital disesuaikan langsung dari ponsel?',
      bn: 'মোবাইল ফোনে কি ডিজিটাল গ্রিটিং কার্ড তৈরি করা যায়?',
      vi: 'Có thể tùy chỉnh thiệp chúc mừng kỹ thuật số trên điện thoại không?',
      sw: 'Je, kadi za kidijitali zinaweza kutengenezwa kwenye simu ya mkononi?'
    },
    answer: {
      en: 'Cardzy is built mobile-first. You can design, customize poetry/text in 18 languages, upload family photos, select background audio, and generate instant WhatsApp share links directly from any smartphone browser.',
      ur: 'کارڈزی کو مکمل طور پر موبائل فرسٹ بنایا گیا ہے۔ آپ اپنے سمارٹ فون سے بغیر کسی ایپ کے صرف 2 منٹ میں اردو نستعلیق شاعری، نام، تصاویر اور آڈیو کے ساتھ کارڈ تیار کر کے شیئر کر سکتے ہیں۔',
      ar: 'تم تصميم كاردزي ليعمل بسلاسة على الهواتف؛ حيث يمكنك كتابة النصوص، رفع الصور، واختيار الموسيقى وتوليد رابط واتساب الفوري بكل سهولة.',
      es: 'Cardzy está optimizado para móviles. Puede personalizar textos, fotos, música y generar enlaces de WhatsApp directamente desde el navegador de su teléfono.',
      fr: 'Cardzy est 100% adapté aux mobiles. Créez, personnalisez textes, photos et musique en quelques clics depuis votre smartphone.',
      hi: 'कार्डज़ी को मोबाइल-फ्रेंडली बनाया गया है। आप अपने फोन से 2 मिनट में नाम, फोटो, संगीत और संदेश जोड़कर तुरंत व्हाट्सएप लिंक बना सकते हैं।',
      zh: 'Cardzy 采用移动优先设计，您无需下载软件即可在手机浏览器中快速编辑文字、上传照片、添加背景音乐并一键生成专属分享链接。',
      pt: 'O Cardzy é 100% otimizado para dispositivos móveis. Crie e personalize os seus cartões diretamente no navegador do seu smartphone.',
      ru: 'Cardzy оптимизирован для смартфонов: создавайте дизайн, добавляйте фото, музыку и делитесь ссылкой в WhatsApp прямо из браузера.',
      de: 'Cardzy ist mobil optimiert. Gestalten Sie Texte, Fotos und Musik direkt im Smartphone-Browser und teilen Sie den Link sofort über WhatsApp.',
      ja: 'Cardzyはスマホに完全対応しています。ブラウザ上で写真、文字、BGMを設定し、すぐにWhatsAppやSNSで共有できます。',
      ko: 'Cardzy는 모바일에 최적화되어 있어 별도 앱 설치 없이 스마트폰 브라우저에서 문구, 사진, 음악을 넣고 즉시 공유할 수 있습니다.',
      it: 'Cardzy è ottimizzato per dispositivi mobili. Puoi personalizzare testi, foto e musica direttamente dallo smartphone.',
      tr: 'Cardzy mobil öncelikli tasarlanmıştır. Telefonunuzun tarayıcısından 2 dakikada fotoğraf, metin ve müzik ekleyip link oluşturabilirsiniz.',
      id: 'Cardzy dirancang mobile-first. Anda bisa membuat dan mengedit kartu dengan foto, musik, dan teks langsung dari browser ponsel.',
      bn: 'কার্ডজি মোবাইল-ফার্স্ট প্রযুক্তিতে তৈরি। আপনি আপনার স্মার্টফোন থেকেই ছবি, মিউজিক এবং টেক্সট দিয়ে সহজেই কার্ড তৈরি করতে পারেন।',
      vi: 'Cardzy tối ưu hoàn hảo cho điện thoại. Bạn có thể tự do chỉnh sửa văn bản, chèn ảnh, nhạc và tạo link chia sẻ ngay trên trình duyệt.',
      sw: 'Cardzy imeboreshwa kwa simu za mkononi. Unaweza kubuni kadi yenye picha, muziki na maneno kwa dakika chache moja kwa moja kwenye simu.'
    }
  },
  'what-is-the-eco-friendly-impact-of-switching-to-paperless-cards': {
    question: {
      en: 'What is the eco-friendly impact of switching to paperless cards?',
      ur: 'کاغذ کے بغیر ڈیجیٹل کارڈز کے ماحول دوست فوائد کیا ہیں؟',
      ar: 'ما هو الأثر البيئي الإيجابي للتحول إلى البطاقات الرقمية بدون ورق؟',
      es: '¿Cuál es el impacto ecológico de utilizar tarjetas digitales sin papel?',
      fr: 'Quel est l\'impact écologique de passer aux invitations sans papier ?',
      hi: 'पेपरलेस डिजिटल कार्ड अपनाने के पर्यावरण-अनुकूल लाभ क्या हैं?',
      zh: '告别传统纸质请柬、拥抱无纸化数字贺卡具有哪些环保优势？',
      pt: 'Qual é o impacto ecológico de mudar para convites sem papel?',
      ru: 'Какова экологическая польза перехода на электронные открытки?',
      de: 'Welchen umweltfreundlichen Nutzen haben papierlose digitale Einladungen?',
      ja: 'ペーパーレスなデジタルカードに切り替える環境面でのメリットは何ですか？',
      ko: '종이 없는 디지털 카드로 전환할 때 얻을 수 있는 친환경적 이점은 무엇인가요?',
      it: 'Qual è l\'impatto ecologico del passaggio ai biglietti digitali senza carta?',
      tr: 'Kağıtsız dijital davetiyelere geçmenin çevre dostu faydaları nelerdir?',
      id: 'Apa dampak ramah lingkungan dari beralih ke kartu digital tanpa kertas?',
      bn: 'কাগজবিহীন ডিজিটাল কার্ড ব্যবহারের পরিবেশগত সুবিধা কী?',
      vi: 'Lợi ích thân thiện với môi trường khi chuyển sang thiệp kỹ thuật số là gì?',
      sw: 'Je, kuna faida gani za kimazingira za kutumia kadi za kidijitali zisizo na karatasi?'
    },
    answer: {
      en: 'Switching to Cardzy eliminates paper waste, deforestation, synthetic dye chemicals, and shipping carbon emissions while saving hundreds of dollars in printing and postage costs.',
      ur: 'ڈیجیٹل کارڈز کے استعمال سے درختوں کی کٹائی اور کاغذ کے ضیاع کی مکمل روک تھام ہوتی ہے۔ اس سے نہ صرف ماحول کا تحفظ ہوتا ہے بلکہ پرنٹنگ اور ڈاک کے ہزاروں روپے کی بچت بھی ہوتی ہے۔',
      ar: 'يساهم استخدام بطاقات كاردزي الرقمية في حماية البيئة من خلال تقليل استهلاك الورق وقطع الأشجار، فضلاً عن توفير مئات الدولارات من تكاليف الطباعة والشحن.',
      es: 'El uso de invitaciones digitales elimina el desperdicio de papel y las emisiones de transporte, ahorrando cientos de dólares en costes de imprenta.',
      fr: 'Opter pour des faire-part numériques préserve les forêts, élimine le gaspillage de papier et vous fait économiser sur les frais d\'impression et d\'envoi.',
      hi: 'डिजिटल कार्ड अपनाने से पेड़ों की कटाई और कागज की बर्बादी रुकती है, पर्यावरण सुरक्षित रहता है और छपाई व डाक के भारी खर्च की बचत होती है।',
      zh: '使用 Cardzy 数字化请柬可杜绝纸张浪费与过度砍伐，减少物流碳排放，并为您节省大量印刷制作与快递邮寄开支。',
      pt: 'Adotar convites digitais elimina o desperdício de papel e as emissões de transporte, poupando centenas de euros em custos de impressão.',
      ru: 'Электронные открытки сохраняют деревья, исключают бумажные отходы и экономят значительные средства на полиграфии и доставке.',
      de: 'Digitale Einladungen schützen Wälder, vermeiden Müll und sparen hunderte Euro an Druck- und Portokosten.',
      ja: 'デジタルカードを選ぶことで、森林伐採や紙ゴミの削減に貢献し、印刷代や郵送費を大幅に節約できます。',
      ko: '디지털 초대장을 사용하면 종이 낭비와 탄소 배출을 줄여 환경을 보호하며, 고가의 인쇄비와 우편 발송 비용을 절약할 수 있습니다.',
      it: 'Passare agli inviti digitali riduce il consumo di carta e le emissioni di CO2, risparmiando sui costi di stampa e spedizione.',
      tr: 'Dijital davetiyeler kağıt israfını ve ağaç kesimini önler, karbon ayak izini azaltır ve yüksek baskı masraflarından tasarruf sağlar.',
      id: 'Kartu digital ramah lingkungan karena mencegah penebangan pohon, mengurangi sampah kertas, dan menghemat biaya cetak serta ongkir.',
      bn: 'ডিজিটাল কার্ড ব্যবহারের ফলে কাগজ ও গাছ বাঁচানো যায় এবং প্রিন্টিং ও ডাক খরচের বিপুল সাশ্রয় হয়।',
      vi: 'Sử dụng thiệp kỹ thuật số giúp bảo vệ môi trường, giảm rác thải giấy và tiết kiệm đáng kể chi phí in ấn cũng như chuyển phát.',
      sw: 'Kutumia kadi za kidijitali kunaokoa miti, kunaondoa upotevu wa karatasi na kuokoa gharama kubwa za uchapishaji na usafirishaji.'
    }
  },
  'how-do-guest-limits-and-digital-delivery-links-operate': {
    question: {
      en: 'How do guest limits and digital delivery links operate?',
      ur: 'مہمانوں کی تعداد کی کیا حد ہے اور کارڈ کا لنک کیسے بھیجا جاتا ہے؟',
      ar: 'ما هو الحد الأقصى لعدد الضيوف وكيف يتم إرسال رابط البطاقة؟',
      es: '¿Hay límite de invitados y cómo funciona el enlace de entrega?',
      fr: 'Y a-t-il une limite d\'invités et comment fonctionne le lien ?',
      hi: 'मेहमानों की संख्या की क्या सीमा है और डिजिटल लिंक कैसे काम करता है?',
      zh: '请柬是否设有宾客浏览人数上限？分享链接如何快速分发？',
      pt: 'Existe limite de convidados e como funciona o link de partilha?',
      ru: 'Есть ли лимит на количество гостей и как работает ссылка?',
      de: 'Gibt es ein Gästelimit und wie funktioniert der Einladungslink?',
      ja: '招待客の人数制限はありますか？またリンクはどのように共有できますか？',
      ko: '하객 수에 제한이 있나요? 초대장 링크는 어떻게 전달되나요?',
      it: 'C\'è un limite di invitati e come funziona il link di condivisione?',
      tr: 'Davetli sayısı sınırı var mı ve paylaşım bağlantısı nasıl çalışır?',
      id: 'Apakah ada batasan jumlah tamu dan bagaimana cara membagikan tautan?',
      bn: 'অতিথির সংখ্যার কি কোনো সীমাবদ্ধতা আছে এবং লিঙ্ক কীভাবে কাজ করে?',
      vi: 'Có giới hạn số lượng khách không và liên kết thiệp hoạt động như thế nào?',
      sw: 'Je, kuna kikomo cha idadi ya wageni na kiungo cha kadi kinafanyaje kazi?'
    },
    answer: {
      en: 'Cardzy has zero guest limits. You receive a clean short link (cardzy.online/i/your-slug) and custom QR code that can be shared with 20 or 2,000+ guests simultaneously across WhatsApp groups, email, and social media.',
      ur: 'کارڈزی پر مہمانوں کی تعداد کی کوئی حد نہیں ہے۔ آپ ایک ہی کارڈ کا لنک اور کیو آر کوڈ 20 افراد یا 2000 مہمانوں کے واٹس ایپ گروپس میں بیک وقت بغیر کسی پابندی کے شیئر کر سکتے ہیں۔',
      ar: 'لا توجد أي حدود لعدد الضيوف؛ ستحصل على رابط قصير مخصص ورمز QR يمكنك مشاركته مع آلاف الضيوف عبر مجموعات واتساب ورسائل البريد دون قيود.',
      es: 'No hay límite de invitados. Recibirá un enlace corto y un código QR que puede enviar a 20 o a más de 2.000 invitados por WhatsApp o correo.',
      fr: 'Aucune limite d\'invités. Vous obtenez un lien court et un QR code partageables instantanément à autant d\'invités que vous le souhaitez.',
      hi: 'मेहमानों की संख्या की कोई सीमा नहीं है। आप एक ही लिंक और क्यूआर कोड को 20 से लेकर 2000+ मेहमानों के व्हाट्सएप ग्रुप में बिना किसी रुकावट के भेज सकते हैं।',
      zh: 'Cardzy 请柬不设任何访客人数上限。您将获得专属短网址与高清二维码，可无限制发送给 20 位亲友或数千名宾客。',
      pt: 'Sem qualquer limite de convidados. Recebe um link direto e código QR para partilhar com centenas ou milhares de pessoas pelo WhatsApp.',
      ru: 'Ограничений по числу гостей нет. Вы получаете постоянную короткую ссылку и QR-код для отправки любому количеству гостей в WhatsApp и соцсетях.',
      de: 'Es gibt kein Gästelimit. Sie erhalten einen individuellen Kurzlink und QR-Code, den Sie unbegrenzt über WhatsApp und E-Mail teilen können.',
      ja: '人数制限はありません。専用の短縮リンクとQRコードを、数十人から数千人のゲストへWhatsAppやSNSで一斉送信できます。',
      ko: '하객 수 제한이 전혀 없습니다. 생성된 단축 URL과 QR 코드를 수십 명 또는 수천 명의 하객에게 WhatsApp, 카카오톡, 이메일로 무제한 공유할 수 있습니다.',
      it: 'Nessun limite di invitati. Ricevi un link breve e un codice QR condivisibili con tutti i tuoi contatti su WhatsApp senza restrizioni.',
      tr: 'Davetli sınırı yoktur. Oluşturulan kısa bağlantıyı ve QR kodunu WhatsApp gruplarında binlerce kişiye sınırsızca gönderebilirsiniz.',
      id: 'Tidak ada batasan tamu. Anda mendapatkan tautan singkat dan kode QR yang bisa dibagikan ke ribuan tamu tanpa batas.',
      bn: 'অতিথির কোনো সীমা নেই। আপনি একটি লিঙ্ক ও কিউআর কোড হাজার হাজার অতিথির সাথে হোয়াটসঅ্যাপে শেয়ার করতে পারেন।',
      vi: 'Hoàn toàn không giới hạn số lượng khách. Bạn nhận được link ngắn và mã QR để gửi cho hàng nghìn khách qua WhatsApp, Zalo hoặc mạng xã hội.',
      sw: 'Hakuna kikomo cha wageni. Unapokea kiungo fupi na msimbo wa QR unaoweza kutuma kwa maelfu ya wageni kupitia WhatsApp bila kizuizi.'
    }
  }
}

export function StructuredFaqSection() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const faqItems = Object.entries(STRUCTURED_FAQS_MULTILINGUAL).map(([id, item]) => ({
    id,
    question: item.question[lang] || item.question.en || Object.values(item.question)[0],
    answer: item.answer[lang] || item.answer.en || Object.values(item.answer)[0]
  }))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-100/90 via-white to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-y border-slate-200 dark:border-slate-800/80 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-10 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/5 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 px-4 py-1.5 text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider shadow-xs">
            <HelpCircle className="size-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{t('faqKicker') || 'High-Value Knowledge Base'}</span>
          </div>

          <h2
            id="faq-heading"
            className={cn(
              "text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight",
              isUrdu ? "font-urdu leading-[2.2]" : "leading-tight"
            )}
          >
            {t('faqsMainHeading') || 'Frequently Asked Questions About Digital Invitations & Cards'}
          </h2>

          <p className={cn(
            "text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed",
            isUrdu ? "font-urdu text-base sm:text-lg" : ""
          )}>
            {t('faqSubDesc') || 'Everything you need to know about animated digital cards, 1-click WhatsApp RSVP tracking, data security, mobile compatibility, and eco-friendly event planning.'}
          </p>
        </div>

        {/* Semantic HTML5 Accordion List using <details> and <summary> */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={item.id}
              className={cn(
                "group rounded-2xl sm:rounded-3xl border border-slate-300/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-md [&_summary::-webkit-details-marker]:none open:border-emerald-600/60 dark:open:border-emerald-500/60 open:shadow-md",
                isUrdu ? "font-urdu text-right" : ""
              )}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-950 dark:text-slate-50 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400 list-none">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 text-xs font-black text-emerald-900 dark:text-emerald-300 shrink-0">
                    0{index + 1}
                  </span>
                  <span className="text-left leading-snug">{item.question}</span>
                </div>
                <ChevronDown className="size-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:-rotate-180 group-open:text-emerald-600 dark:group-open:text-emerald-400" />
              </summary>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
