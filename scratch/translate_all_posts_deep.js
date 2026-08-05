const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Detailed section body & bullet translations per post topic & language
const DEEP_TRANSLATIONS = {
  // Post 4: NFC Business Cards
  4: {
    es: {
      intro: "En el acelerado entorno corporativo actual, las tarjetas de visita de papel tradicionales están quedando obsoletas. Las tarjetas de visita digitales NFC permiten compartir datos de contacto, redes sociales y archivo .VCF con un solo toque.",
      sections: [
        {
          id: "limitations-of-paper-visiting-cards",
          title: "1. Por Qué las Tarjetas de Visita de Papel Están Quedando Obsoletas",
          body: "Más del 88% de las tarjetas de visita impresas que se entregan en eventos se terminan tirando en menos de una semana debido a lo tedioso que resulta escribir los datos manualmente en el móvil.",
          bulletPoints: [
            "El 88%+ de las tarjetas de papel se pierden o se desechan",
            "Actualizar números de teléfono requiere costos adicionales de reimpresión",
            "No pueden mostrar portfolios dinámicos, vídeos ni redes sociales",
            "Consumo de papel poco ecológico"
          ]
        },
        {
          id: "how-nfc-and-digital-vcards-work",
          title: "2. Cómo Funcionan las Tarjetas vCard NFC y los Códigos QR",
          body: "La tecnología NFC (Near Field Communication) transmite su perfil de tarjeta digital directamente a cualquier teléfono iOS o Android sin necesidad de descargar aplicaciones.",
          bulletPoints: [
            "Acerque la tarjeta NFC a cualquier smartphone para abrir el perfil digital",
            "Código QR dinámico de respaldo para dispositivos antiguos",
            "Botón de 'Guardar Contacto' (.vcf) en 1 clic directamente en la agenda",
            "Edición de información de contacto en tiempo real sin reimprimir"
          ]
        },
        {
          id: "essential-features-of-executive-vcard",
          title: "3. Características Clave que Debe Tener Toda Tarjeta Digital Ejecutiva",
          body: "Una tarjeta de visita digital de alta conversión incluye foto de perfil en HD, logotipo corporativo, enlace directo a WhatsApp, redes sociales y ubicación.",
          bulletPoints: [
            "Foto de perfil HD / Fotografía ejecutiva y logotipo corporativo",
            "Botón directo de 'Guardar Contacto en el Teléfono'",
            "Enlaces interactivos a WhatsApp, Correo, Teléfono y Sitio Web",
            "Iconos de redes sociales (LinkedIn, Instagram, X, YouTube)"
          ]
        },
        {
          id: "roi-and-cost-benefits",
          title: "4. Análisis de Retorno de Inversión y Beneficios de Coste para Empresas",
          body: "Las empresas ahorran miles de dólares al año adoptando tarjetas vCard digitales para sus equipos de ventas y directivos.",
          bulletPoints: [
            "Elimina costes continuos de impresión para nuevos empleados o ascensos",
            "Consistencia de marca centralizada en todos los equipos corporativos",
            "Métricas de networking analíticas y seguimiento de clics"
          ]
        }
      ],
      faq: [
        {
          question: "¿El destinatario necesita una aplicación para abrir la tarjeta NFC?",
          answer: "¡No necesita ninguna aplicación! El destinatario simplemente acerca su smartphone a su tarjeta o escanea el código QR para ver su perfil en vivo."
        },
        {
          question: "¿Cómo funciona el botón de guardar contacto (.vcf) en 1 clic?",
          answer: "Al pulsar el botón, el teléfono del destinatario guarda automáticamente su nombre completo, número móvil, correo y cargo directamente en la agenda."
        }
      ],
      conclusion: "¡Mejore su imagen ejecutiva con las tarjetas de visita digitales inteligentes Cardzy! ¡Cree su vCard personalizada hoy mismo!"
    },
    fr: {
      intro: "Dans le monde professionnel actuel, les cartes de visite en papier deviennent rapidement obsolètes. Les cartes numériques NFC permettent de partager vos coordonnées, réseaux et fichiers .VCF d'un simple geste.",
      sections: [
        {
          id: "limitations-of-paper-visiting-cards",
          title: "1. Pourquoi les Cartes de Visite Papier Deviennent-elles Obsolètes",
          body: "Plus de 88 % des cartes de visite en papier jetées lors de conférences finissent à la poubelle en moins d'une semaine.",
          bulletPoints: [
            "Plus de 88 % des cartes en papier sont perdues ou jetées",
            "La mise à jour des coordonnées nécessite une réimpression coûteuse",
            "Impossible d'afficher des portfolios dynamiques ou des vidéos",
            "Consommation de papier non écologique"
          ]
        },
        {
          id: "how-nfc-and-digital-vcards-work",
          title: "2. Comment Fonctionnent les Cartes vCard NFC et Codes QR",
          body: "La technologie NFC transmet votre profil professionnel directement à tout smartphone sans aucune application.",
          bulletPoints: [
            "Approchez la carte NFC de tout smartphone pour ouvrir le profil vCard",
            "Code QR dynamique en secours pour les appareils anciens",
            "Bouton 'Enregistrer le contact' (.vcf) en 1 clic directement dans l'annuaire",
            "Mise à jour en temps réel des coordonnées sans réimprimer"
          ]
        },
        {
          id: "essential-features-of-executive-vcard",
          title: "3. Fonctionnalités Essentielles d'une Carte de Visite Numérique",
          body: "Une carte de visite numérique professionnelle comprend une photo HD, le logo de l'entreprise, un lien direct WhatsApp et des réseaux sociaux.",
          bulletPoints: [
            "Photo de profil HD et logo d'entreprise",
            "Bouton direct 'Enregistrer dans les contacts'",
            "Liens cliquables WhatsApp, E-mail, Téléphone et Site Web",
            "Icônes de réseaux sociaux (LinkedIn, Instagram, YouTube)"
          ]
        },
        {
          id: "roi-and-cost-benefits",
          title: "4. Rentabilité et Avantages Financiers pour les Entreprises",
          body: "Les entreprises économisent des milliers d'euros chaque année en équipant leurs équipes commerciales de cartes vCard numériques.",
          bulletPoints: [
            "Élimine les frais d'impression récurrents pour les nouveaux employés",
            "Image de marque cohérente et centralisée",
            "Suivi analytique du réseau et nombre de clics"
          ]
        }
      ],
      faq: [
        {
          question: "Le destinataire a-t-il besoin d'une application pour ouvrir la carte NFC ?",
          answer: "Aucune application n'est nécessaire ! Le destinataire approche simplement son téléphone ou scanne le code QR."
        },
        {
          question: "Comment fonctionne l'enregistrement du contact (.vcf) en 1 clic ?",
          answer: "En appuyant sur le bouton, le téléphone sauvegarde automatiquement votre nom, numéro, e-mail et fonction."
        }
      ],
      conclusion: "Valorisez votre image professionnelle avec les cartes de visite numériques Cardzy. Créez votre vCard aujourd'hui !"
    },
    ar: {
      intro: "في بيئة الأعمال السريعة اليوم، أصبحت بطاقات العمل الورقية التقليدية غير عملية. تتيح بطاقات NFC الرقمية مشاركة جميع بيانات الاتصال وروابط التواصل وحفظ الملف بنقرة واحدة.",
      sections: [
        {
          id: "limitations-of-paper-visiting-cards",
          title: "1. لماذا أصبحت بطاقات الأعمال الورقية عاديمة الفائدة؟",
          body: "أكثر من 88% من بطاقات الأعمال الورقية يتم التخلص منها خلال أسبوع واحد من المؤتمرات واللقاءات.",
          bulletPoints: [
            "أكثر من 88% من البطاقات تنتهي في السلة أو تضيع",
            "تحديث البيانات يتطلب طباعة جديدة ومكلفة",
            "عجز البطاقات الورقية عن إظهار معرض الأعمال والفيديوهات",
            "استهلاك ورقي غير صديق للبيئة"
          ]
        },
        {
          id: "how-nfc-and-digital-vcards-work",
          title: "2. كيف تعمل بطاقات vCard الرقمية وتقنية NFC؟",
          body: "تقنية الاتصال قريب المدى (NFC) تنقل ملفك الشخصي المهني مباشرة إلى أي هاتف ذكي دون الحاجة لتطبيقات.",
          bulletPoints: [
            "ملامسة بطاقة NFC مع الهاتف تفتح صفحة الأعمال فوراً",
            "رمز QR تفاعلي كخيار إضافي للأجهزة القديمة",
            "زر 'حفظ جهة الاتصال' (.vcf) بنقرة واحدة في الهاتف",
            "تعديل البيانات في أي وقت دون إعادة الطباعة"
          ]
        },
        {
          id: "essential-features-of-executive-vcard",
          title: "3. الميزات الأساسية لبطاقة الأعمال الرقمية الناجحة",
          body: "تتضمن بطاقة الأعمال الرقمية عالية التفاعل صورة عالية الدقة، شعار الشركة، رابط واتساب مباشر، وشبكات التواصل.",
          bulletPoints: [
            "صورة شخصية عالية الدقة وشعار الشركة",
            "زر حفظ جهة الاتصال المباشر في الجوال",
            "روابط تفاعلية لواتساب والبريد والموقع الإلكتروني",
            "أيقونات التواصل الاجتماعي (LinkedIn, Instagram, YouTube)"
          ]
        },
        {
          id: "roi-and-cost-benefits",
          title: "4. العائد على الاستثمار وتوفير التكاليف للشركات",
          body: "توفر الشركات آلاف الدولارات سنوياً من خلال اعتماد بطاقات vCard الرقمية لفرق المبيعات والإدارة.",
          bulletPoints: [
            "إلغاء تكاليف الطباعة المستمرة للموظفين الجدد",
            "توحيد الهوية البصرية للشركة عبر جميع الفرق",
            "تحليلات تفاعلية لمعدل قياس التواصل والزيارات"
          ]
        }
      ],
      faq: [
        {
          question: "هل يحتاج المستلم إلى تطبيق لقراءة بطاقة NFC؟",
          answer: "لا يحتاج إلى أي تطبيق! يكتفي المستلم بلمس هاتفه بالبطاقة أو مسح رمز QR."
        },
        {
          question: "كيف يعمل زر حفظ جهة الاتصال (.vcf) بنقرة واحدة؟",
          answer: "عند النقر، يقوم الهاتف تلقائياً بحفظ اسمك الكامل ورقمك والبريد والمسمى الوظيفي مباشرة في الأسماء."
        }
      ],
      conclusion: "ارتقِ بمظهرك المهني مع بطاقات الأعمال الرقمية الذكية من كاردزي. أنشئ بطاقتك الشخصية اليوم!"
    },
    ur: {
      intro: "کارپوریٹ دنیا میں روایتی کاغذی وزٹنگ کارڈز اکثر کچھ ہی دنوں میں ضائع ہو جاتے ہیں۔ این ایف سی اور اسمارٹ ڈیجیٹل بزنس کارڈز کے ذریعے آپ اپنے سمارٹ فون کو چھو کر یا کیو آر کوڈ اسکین کروا کر اپنا تمام تر بائیو ڈاٹ، سوشل لنکس اور 1-Click contact Save آپشن کسی کو بھی فراہم کر سکتے ہیں۔",
      sections: [
        {
          id: "limitations-of-paper-visiting-cards",
          title: "1. کاغذی ویزٹنگ کارڈز کی خامیاں اور جدید حل",
          body: "تقریباً 88 فیصد کاغذی وزٹنگ کارڈز ایک ہفتے کے اندر ضائع ہو جاتے ہیں کیونکہ فون میں نمبر ٹائپ کرنا مشکل ہوتا ہے۔",
          bulletPoints: [
            "88% سے زائد کاغذی کارڈز ضائع ہو جاتے ہیں",
            "نمبر یا پتہ تبدیل ہونے پر دوبارہ پرنٹنگ کا خرچہ",
            "پورٹ فولیو، ویڈیوز اور سوشل لنکس دکھانے سے قاصر",
            "کاغذ کے استعمال سے ماحول پر منفی اثرات"
          ]
        },
        {
          id: "how-nfc-and-digital-vcards-work",
          title: "2. این ایف سی اور کیو آر کوڈ کیسے کام کرتے ہیں؟",
          body: "این ایف سی ٹیکنالوجی کے ذریعے آپ کا ڈیجیٹل کارڈ بغیر کسی ایپ کے کسی بھی اسمارٹ فون پر فوراً کھل جاتا ہے۔",
          bulletPoints: [
            "این ایف سی کارڈ چھونے سے پروفائل فوراً کھل جاتی ہے",
            "پرانے فونز کے لیے اینیمیٹڈ کیو آر کوڈ کی سہولت",
            "1-Click 'Save Contact' بٹن سے ڈائریکٹ فون بک میں سیو کریں",
            "بغیر پرنٹنگ خرچے کے جب چاہیں معلومات اپ ڈیٹ کریں"
          ]
        },
        {
          id: "essential-features-of-executive-vcard",
          title: "3. پروفیشنل ڈیجیٹل وزٹنگ کارڈ کے لازمی عناصر",
          body: "ایک بہترین ڈیجیٹل بزنس کارڈ میں ایچ ڈی فوٹو، کمپنی کا لوگو، واٹس ایپ لنک اور سوشل میڈیا لنکس شامل ہوتے ہیں۔",
          bulletPoints: [
            "ایچ ڈی پروفائل فوٹو اور کمپنی کا لوگو",
            "ڈائریکٹ فون میں کنٹیکٹ سیو کرنے کا بٹن",
            "واٹس ایپ، ای میل اور ویب سائٹ کے کلک ایبل لنکس",
            "لنکڈ ان، انسٹاگرام اور یوٹیوب کے آئیکنز"
          ]
        },
        {
          id: "roi-and-cost-benefits",
          title: "4. بزنس ٹیموں کے لیے لاگت اور بچت کے فوائد",
          body: "کمپنیاں ہر سال ڈیجیٹل وی کارڈز اپنا کر ہزاروں روپے پرنٹنگ کے اخراجات کی بچت کرتی ہیں۔",
          bulletPoints: [
            "نئے ملازمین کی بھرتی پر بار بار کارڈز پرنٹ کروانے کی بچت",
            "پوری کمپنی کی یکساں اور خوبصورت برانڈنگ",
            "نیٹ ورکنگ اینالیٹکس اور کلکس کا فوری ریکارڈ"
          ]
        }
      ],
      faq: [
        {
          question: "کیا کارڈ کھولنے کے لیے کسی ایپ کی ضرورت ہے؟",
          answer: "جی نہیں! کسی بھی ایپ کی ضرورت نہیں، صرف فون کے ساتھ این ایف سی چھوئین یا کیو آر اسکین کریں۔"
        },
        {
          question: "1-Click Contact Save کام کیسے کرتا ہے؟",
          answer: "بٹن پر کلک کرتے ہی آپ کا پورا نام، فون نمبر، ای میل اور عہدہ خود بخود موبائل کنٹیکٹس میں سیو ہو جاتا ہے۔"
        }
      ],
      conclusion: "اپنی کارپوریٹ پہچان کو جدید بنائیں۔ آج ہی کارڈزی پر اپنا اسمارٹ ڈیجیٹل وزٹنگ کارڈ بنائیں۔"
    }
  }
};

console.log("Deep translations helper created.");
