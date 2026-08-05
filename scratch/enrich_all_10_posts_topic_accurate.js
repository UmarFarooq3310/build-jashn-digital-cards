const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Helper to translate exact section text based on section id & topic
function translateSection(sec, lang) {
  if (lang === 'en') return sec;

  // Dictionary of exact translations by section id & lang
  const ID_TRANS = {
    "limitations-of-paper-visiting-cards": {
      es: {
        title: "1. Por Qué las Tarjetas de Visita de Papel Están Quedando Obsoletas",
        body: "Más del 88% de las tarjetas de visita impresas entregadas en eventos terminan tiradas a la basura en menos de una semana debido a lo pesado que resulta guardar los datos manualmente en el móvil.",
        bulletPoints: [
          "Más del 88% de las tarjetas de papel se pierden o se desechan",
          "Actualizar números de teléfono requiere costosas reimpresiones",
          "No pueden mostrar portfolios dinámicos, vídeos ni redes sociales",
          "Consumo de papel poco ecológico"
        ]
      },
      fr: {
        title: "1. Pourquoi les Cartes de Visite Papier Deviennent-elles Obsolètes",
        body: "Plus de 88 % des cartes de visite en papier jetées lors de conférences finissent à la poubelle en moins d'une semaine.",
        bulletPoints: [
          "Plus de 88 % des cartes en papier sont perdues ou jetées",
          "La mise à jour des coordonnées nécessite une réimpression coûteuse",
          "Impossible d'afficher des portfolios dynamiques ou des vidéos",
          "Consommation de papier non écologique"
        ]
      },
      ar: {
        title: "1. لماذا أصبحت بطاقات الأعمال الورقية عديمة الفائدة؟",
        body: "أكثر من 88% من بطاقات الأعمال الورقية يتم التخلص منها خلال أسبوع واحد من المؤتمرات واللقاءات.",
        bulletPoints: [
          "أكثر من 88% من البطاقات تنتهي في السلة أو تضيع",
          "تحديث البيانات يتطلب طباعة جديدة ومكلفة",
          "عجز البطاقات الورقية عن إظهار معرض الأعمال والفيديوهات",
          "استهلاك ورقي غير صديق للبيئة"
        ]
      },
      ur: {
        title: "1. کاغذی ویزٹنگ کارڈز کی خامیاں اور جدید حل",
        body: "تقریباً 88 فیصد کاغذی وزٹنگ کارڈز ایک ہفتے کے اندر ضائع ہو جاتے ہیں کیونکہ فون میں نمبر ٹائپ کرنا مشکل ہوتا ہے۔",
        bulletPoints: [
          "88% سے زائد کاغذی کارڈز ضائع ہو جاتے ہیں",
          "نمبر یا پتہ تبدیل ہونے پر دوبارہ پرنٹنگ کا خرچہ",
          "پورٹ فولیو، ویڈیوز اور سوشل لنکس دکھانے سے قاصر",
          "کاغذ کے استعمال سے ماحول پر منفی اثرات"
        ]
      }
    },
    "how-nfc-and-digital-vcards-work": {
      es: {
        title: "2. Cómo Funcionan las Tarjetas vCard NFC y Códigos QR",
        body: "La tecnología NFC transmite su perfil profesional directamente a cualquier smartphone iPhone o Android sin necesidad de instalar aplicaciones.",
        bulletPoints: [
          "Toque la tarjeta NFC contra cualquier smartphone para abrir la vCard",
          "Código QR dinámico de respaldo para móviles más antiguos",
          "Botón 'Guardar contacto' (.vcf) en 1 clic directo a la agenda",
          "Edición de datos en tiempo real sin reimprimir tarjetas físicas"
        ]
      },
      fr: {
        title: "2. Comment Fonctionnent les Cartes vCard NFC et Codes QR",
        body: "La technologie NFC transmet votre profil professionnel directement à tout smartphone sans aucune application.",
        bulletPoints: [
          "Approchez la carte NFC de tout smartphone pour ouvrir le profil vCard",
          "Code QR dynamique en secours pour les appareils anciens",
          "Bouton 'Enregistrer le contact' (.vcf) en 1 clic directement dans l'annuaire",
          "Mise à jour en temps réel des coordonnées sans réimprimer"
        ]
      },
      ar: {
        title: "2. كيف تعمل بطاقات vCard الرقمية وتقنية NFC؟",
        body: "تقنية الاتصال قريب المدى (NFC) تنقل ملفك الشخصي المهني مباشرة إلى أي هاتف ذكي دون الحاجة لتطبيقات.",
        bulletPoints: [
          "ملامسة بطاقة NFC مع الهاتف تفتح صفحة الأعمال فوراً",
          "رمز QR تفاعلي كخيار إضافي للأجهزة القديمة",
          "زر 'حفظ جهة الاتصال' (.vcf) بنقرة واحدة في الهاتف",
          "تعديل البيانات في أي وقت دون إعادة الطباعة"
        ]
      },
      ur: {
        title: "2. این ایف سی اور کیو آر کوڈ کیسے کام کرتے ہیں؟",
        body: "این ایف سی ٹیکنالوجی کے ذریعے آپ کا ڈیجیٹل کارڈ بغیر کسی ایپ کے کسی بھی اسمارٹ فون پر فوراً کھل جاتا ہے۔",
        bulletPoints: [
          "این ایف سی کارڈ چھونے سے پروفائل فوراً کھل جاتی ہے",
          "پرانے فونز کے لیے اینیمیٹڈ کیو آر کوڈ کی سہولت",
          "1-Click 'Save Contact' بٹن سے ڈائریکٹ فون بک میں سیو کریں",
          "بغیر پرنٹنگ خرچے کے جب چاہیں معلومات اپ ڈیٹ کریں"
        ]
      }
    },
    "essential-features-of-executive-vcard": {
      es: {
        title: "3. Elementos Clave de una Tarjeta Digital de Alto Rendimiento",
        body: "Una tarjeta digital inteligente incluye fotografía profesional HD, logotipo corporativo, enlace directo a WhatsApp, redes sociales y mapa de la empresa.",
        bulletPoints: [
          "Foto de perfil en alta resolución y logotipo corporativo",
          "Botón directo de 'Guardar Contacto en el Teléfono'",
          "Enlaces interactivos a WhatsApp, Email, Teléfono y Web",
          "Iconos de redes profesionales (LinkedIn, Instagram, X, YouTube)"
        ]
      },
      fr: {
        title: "3. Fonctionnalités Essentielles d'une Carte de Visite Numérique",
        body: "Une carte de visite numérique professionnelle comprend une photo HD, le logo de l'entreprise, un lien direct WhatsApp et des réseaux sociaux.",
        bulletPoints: [
          "Photo de profil HD et logo d'entreprise",
          "Bouton direct 'Enregistrer dans les contacts'",
          "Liens cliquables WhatsApp, E-mail, Téléphone et Site Web",
          "Icônes de réseaux sociaux (LinkedIn, Instagram, YouTube)"
        ]
      },
      ar: {
        title: "3. الميزات الأساسية لبطاقة الأعمال الرقمية الناجحة",
        body: "تتضمن بطاقة الأعمال الرقمية عالية التفاعل صورة عالية الدقة، شعار الشركة، رابط واتساب مباشر، وشبكات التواصل.",
        bulletPoints: [
          "صورة شخصية عالية الدقة وشعار الشركة",
          "زر حفظ جهة الاتصال المباشر في الجوال",
          "روابط تفاعلية لواتساب والبريد والموقع الإلكتروني",
          "أيقونات التواصل الاجتماعي (LinkedIn, Instagram, YouTube)"
        ]
      },
      ur: {
        title: "3. پروفیشنل ڈیجیٹل وزٹنگ کارڈ کے لازمی عناصر",
        body: "ایک بہترین ڈیجیٹل بزنس کارڈ میں ایچ ڈی فوٹو، کمپنی کا لوگو، واٹس ایپ لنک اور سوشل میڈیا لنکس شامل ہوتے ہیں۔",
        bulletPoints: [
          "ایچ ڈی پروفائل فوٹو اور کمپنی کا لوگو",
          "ڈائریکٹ فون میں کنٹیکٹ سیو کرنے کا بٹن",
          "واٹس ایپ، ای میل اور ویب سائٹ کے کلک ایبل لنکس",
          "لنکڈ ان، انسٹاگرام اور یوٹیوب کے آئیکنز"
        ]
      }
    },
    "roi-and-cost-benefits": {
      es: {
        title: "4. Análisis de Rentabilidad y Ahorro para Equipos Comerciales",
        body: "Las empresas ahorran miles de euros al año al adoptar vCards digitales para sus departamentos comerciales y directivos.",
        bulletPoints: [
          "Elimina gastos continuos de imprenta por incorporaciones o promociones",
          "Imagen de marca coherente y centralizada para todo el equipo",
          "Métricas analíticas de contactos y seguimiento de clics"
        ]
      },
      fr: {
        title: "4. Rentabilité et Avantages Financiers pour les Entreprises",
        body: "Les entreprises économisent des milliers d'euros chaque année en équipant leurs équipes commerciales de cartes vCard numériques.",
        bulletPoints: [
          "Élimine les frais d'impression récurrents pour les nouveaux employés",
          "Image de marque cohérente et centralisée",
          "Suivi analytique du réseau et nombre de clics"
        ]
      },
      ar: {
        title: "4. العائد على الاستثمار وتوفير التكاليف للشركات",
        body: "توفر الشركات آلاف الدولارات سنوياً من خلال اعتماد بطاقات vCard الرقمية لفرق المبيعات والإدارة.",
        bulletPoints: [
          "إلغاء تكاليف الطباعة المستمرة للموظفين الجدد",
          "توحيد الهوية البصرية للشركة عبر جميع الفرق",
          "تحليلات تفاعلية لمعدل قياس التواصل والزيارات"
        ]
      },
      ur: {
        title: "4. بزنس ٹیموں کے لیے لاگت اور بچت کے فوائد",
        body: "کمپنیاں ہر سال ڈیجیٹل وی کارڈز اپنا کر ہزاروں روپے پرنٹنگ کے اخراجات کی بچت کرتی ہیں۔",
        bulletPoints: [
          "نئے ملازمین کی بھرتی پر بار بار کارڈز پرنٹ کروانے کی بچت",
          "پوری کمپنی کی یکساں اور خوبصورت برانڈنگ",
          "نیٹ ورکنگ اینالیٹکس اور کلکس کا فوری ریکارڈ"
        ]
      }
    }
  };

  const override = ID_TRANS[sec.id]?.[lang];
  if (override) {
    return {
      id: sec.id,
      title: override.title,
      body: override.body,
      bulletPoints: override.bulletPoints,
      highlight: sec.highlight ? override.highlight || sec.highlight : undefined
    };
  }

  return {
    id: sec.id,
    title: sec.title,
    body: sec.body,
    bulletPoints: sec.bulletPoints,
    highlight: sec.highlight
  };
}

console.log("Topic-accurate enrichment helper built.");
