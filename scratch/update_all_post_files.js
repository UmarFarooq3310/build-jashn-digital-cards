const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

const TRANSLATION_LOOKUP = {
  es: {
    "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.": "Ejemplos detallados de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, versículos del Corán y etiquetas de RSVP.",
    "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)": "Guía de Textos para Invitaciones de Boda Islámicas (Urdu e Inglés)",
    "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette.": "Descubra más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con versículos del Corán.",
    "Comprehensive financial breakdown, environmental savings, and RSVP management comparison.": "Desglose financiero detallado, ahorro medioambiental y comparación en la gestión de confirmaciones de asistencia (RSVP).",
    "Digital vs Paper Wedding Cards Cost Comparison — Cardzy": "Comparativa de Costes: Invitaciones Digitales vs Papel — Cardzy",
    "Detailed comparison of digital vs paper wedding invitations covering printing costs, courier fees, RSVP efficiency, and zero paper waste.": "Comparativa detallada entre invitaciones de boda digitales y en papel: costes de impresión, envíos, gestión RSVP y cero residuos.",
    "Create beautiful 3D animated Eid cards with custom family photos, names, and Arabic/Urdu duas.": "Cree hermosas tarjetas 3D animadas de Eid con fotos familiares personalizadas, nombres y oraciones en árabe y urdu.",
    "Personalized Eid Cards with Photo & Name — Cardzy": "Tarjetas de Eid Personalizadas con Foto y Nombre — Cardzy",
    "Design custom 3D animated Eid Mubarak wish cards with family photos, personalized names, and Quranic blessings. Share instantly on WhatsApp.": "Diseñe tarjetas animadas 3D de Eid Mubarak con fotos familiares, nombres personalizados y bendiciones. Comparta al instante por WhatsApp.",
    "How NFC cards and 1-Click .VCF contact saving revolutionize executive networking.": "Cómo las tarjetas NFC y la descarga en 1 clic de archivos .VCF revolucionan el networking profesional.",
    "Smart NFC Digital Business Cards Guide — Cardzy": "Guía de Tarjetas de Visita Digitales NFC — Cardzy",
    "Discover how NFC digital business cards and QR code vCards help executives save contacts instantly into phonebooks with high networking conversion.": "Descubra cómo las tarjetas de visita digitales NFC y vCards QR ayudan a guardar contactos al instante en la agenda telefónica con alta conversión.",
    "Eliminate guest counting chaos with automated WhatsApp RSVP tracking and live dashboards.": "Elimine el caos en el recuento de invitados con el seguimiento automatizado de confirmaciones por WhatsApp y paneles en vivo.",
    "Manage Wedding Guest Lists & WhatsApp RSVPs — Cardzy": "Gestión de Listas de Invitados de Boda y Confirmaciones WhatsApp — Cardzy",
    "Learn how to manage wedding guest lists, collect meal preferences, send venue pins, and track live WhatsApp RSVPs on Cardzy.": "Aprenda a gestionar listas de invitados de boda, recopilar preferencias de menú, enviar ubicaciones y realizar el seguimiento de RSVP en vivo.",
    "Create interactive invitation websites with gold foil animations, music, venue maps, and WhatsApp RSVP buttons.": "Cree webs de invitación interactivas con animaciones doradas, música, mapas de ubicación y botones de confirmación por WhatsApp.",
    "Create Online Digital Invitation Cards with WhatsApp RSVP — Cardzy": "Crear Invitaciones Digitales Online con RSVP por WhatsApp — Cardzy",
    "Learn how to build digital invitation websites on Cardzy with interactive 3D templates, embedded Google Maps, custom music, and live WhatsApp RSVP tracking.": "Aprenda a crear webs de invitación digital en Cardzy con plantillas 3D interactivas, Google Maps integrado, música y seguimiento de RSVP por WhatsApp.",
    "Turn simple text greetings into interactive 3D visual experiences with sound, photos, and personalized names.": "Convierta simples mensajes de texto en experiencias visuales 3D interactivas con sonido, fotos y nombres personalizados.",
    "Design Custom 3D Animated Wish Cards — Cardzy": "Diseñar Tarjetas de Felicitación 3D Animadas Personalizadas — Cardzy",
    "Create custom 3D animated greetings cards with personal photos, recipient names, background audio, and instant WhatsApp link sharing on Cardzy.": "Cree tarjetas de felicitación animadas 3D con fotos personales, nombres, música de fondo y enlace compartible por WhatsApp.",
    "Send animated greetings for Christmas, New Year 2026, Thanksgiving, Diwali, and Lunar New Year.": "Envíe felicitaciones animadas para Navidad, Año Nuevo 2026, Acción de Gracias, Diwali y Año Nuevo Lunar.",
    "Global Holiday E-Cards Guide Christmas & New Year — Cardzy": "Guía de Tarjetas Digitales de Festividades Navidad y Año Nuevo — Cardzy",
    "Explore luxury 3D animated e-cards for Christmas, Thanksgiving, New Year 2026, Diwali, and Lunar New Year with photo customization on Cardzy.": "Explore tarjetas digitales animadas 3D de lujo para Navidad, Acción de Gracias, Año Nuevo 2026 y festividades globales con personalización de foto.",
    "Design interactive 3D birthday wish cards and milestone party invitation websites with music.": "Diseñe tarjetas de cumpleaños 3D interactivas y webs de invitación para fiestas especiales con música.",
    "Animated Birthday Cards & Party Invitations — Cardzy": "Tarjetas de Cumpleaños Animadas e Invitaciones de Fiesta — Cardzy",
    "Build animated birthday wish cards and milestone party invitations with custom photos, celebratory music, and WhatsApp RSVP on Cardzy.": "Cree tarjetas de cumpleaños animadas e invitaciones de fiesta con fotos personalizadas, música festiva y confirmaciones por WhatsApp en Cardzy.",
    "Streamline professional contact saving with dynamic web vCards and mobile contact files.": "Optimice el guardado de contactos profesionales con vCards web dinámicas y archivos de contacto móviles.",
    "Smart Digital Business Cards 1-Click VCF Save — Cardzy": "Tarjetas de Visita Digitales Inteligentes Guardado .VCF en 1 Clic — Cardzy",
    "Discover how Cardzy's smart digital business cards with 1-click .VCF contact saving help professionals boost networking conversion rates.": "Descubra cómo las tarjetas de visita digitales inteligentes de Cardzy con guardado .VCF en 1 clic ayudan a aumentar la tasa de conversión en networking."
  },
  fr: {
    "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.": "Modèles complets de textes pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, versets du Coran et étiquette RSVP.",
    "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)": "Guide des Textes de Faire-Part de Mariage Islamique (Ourdou & Anglais)",
    "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette.": "Exemples de formules pour invitations de mariage islamiques et pakistanaises en ourdou et anglais. Versets du Coran et étiquette.",
    "Comprehensive financial breakdown, environmental savings, and RSVP management comparison.": "Analyse financière détaillée, économies environnementales et comparaison de la gestion des confirmations de présence (RSVP).",
    "Digital vs Paper Wedding Cards Cost Comparison — Cardzy": "Comparatif Prix Faire-Part Numérique vs Papier — Cardzy",
    "Detailed comparison of digital vs paper wedding invitations covering printing costs, courier fees, RSVP efficiency, and zero paper waste.": "Comparatif détaillé entre faire-part numériques et papier : coûts d'impression, frais d'envoi, gestion RSVP et zéro déchet.",
    "Create beautiful 3D animated Eid cards with custom family photos, names, and Arabic/Urdu duas.": "Créez de magnifiques cartes d'Aïd animées en 3D avec photos de famille, prénoms et bénédictions en arabe et ourdou.",
    "Personalized Eid Cards with Photo & Name — Cardzy": "Cartes d'Aïd Personnalisées avec Photo & Nom — Cardzy",
    "Design custom 3D animated Eid Mubarak wish cards with family photos, personalized names, and Quranic blessings. Share instantly on WhatsApp.": "Concevez des cartes d'Aïd Mubarak animées en 3D avec photos de famille, noms et bénédictions. Partagez instantanément sur WhatsApp.",
    "How NFC cards and 1-Click .VCF contact saving revolutionize executive networking.": "Comment les cartes NFC et le téléchargement .VCF en 1 clic révolutionnent le réseau professionnel.",
    "Smart NFC Digital Business Cards Guide — Cardzy": "Guide des Cartes de Visite Numériques NFC — Cardzy",
    "Discover how NFC digital business cards and QR code vCards help executives save contacts instantly into phonebooks with high networking conversion.": "Découvrez comment les cartes de visite numériques NFC et vCards QR permettent d'enregistrer instantanément les contacts dans l'annuaire.",
    "Eliminate guest counting chaos with automated WhatsApp RSVP tracking and live dashboards.": "Éliminez le chaos du décompte des invités grâce au suivi automatisé des RSVP WhatsApp et aux tableaux de bord en direct.",
    "Manage Wedding Guest Lists & WhatsApp RSVPs — Cardzy": "Gestion des Listes d'Invités de Mariage & RSVP WhatsApp — Cardzy",
    "Learn how to manage wedding guest lists, collect meal preferences, send venue pins, and track live WhatsApp RSVPs on Cardzy.": "Apprenez à gérer les listes d'invités, recueillir les préférences de repas, envoyer les adresses et suivre les RSVP WhatsApp en direct.",
    "Create interactive invitation websites with gold foil animations, music, venue maps, and WhatsApp RSVP buttons.": "Créez des sites d'invitation interactifs avec animations dorées, musique, cartes et boutons de suivi RSVP WhatsApp.",
    "Create Online Digital Invitation Cards with WhatsApp RSVP — Cardzy": "Créer des Invitations Numériques en Ligne avec RSVP WhatsApp — Cardzy",
    "Learn how to build digital invitation websites on Cardzy with interactive 3D templates, embedded Google Maps, custom music, and live WhatsApp RSVP tracking.": "Apprenez à créer des sites d'invitation numérique sur Cardzy avec modèles 3D interactifs, Google Maps intégré et suivi RSVP WhatsApp.",
    "Turn simple text greetings into interactive 3D visual experiences with sound, photos, and personalized names.": "Transformez de simples messages texte en expériences visuelles 3D interactives avec son, photos et prénoms personnalisés.",
    "Design Custom 3D Animated Wish Cards — Cardzy": "Créer des Cartes de Vœux 3D Animées Personnalisées — Cardzy",
    "Create custom 3D animated greetings cards with personal photos, recipient names, background audio, and instant WhatsApp link sharing on Cardzy.": "Créez des cartes de vœux animées en 3D avec photos personnelles, prénoms, musique de fond et partage instantané sur WhatsApp.",
    "Send animated greetings for Christmas, New Year 2026, Thanksgiving, Diwali, and Lunar New Year.": "Envoyez des cartes de vœux animées pour Noël, le Nouvel An 2026, Action de Grâce, Diwali et le Nouvel An LUNAIRE.",
    "Global Holiday E-Cards Guide Christmas & New Year — Cardzy": "Guide des Cartes Virtuelles de Fêtes Noël & Nouvel An — Cardzy",
    "Explore luxury 3D animated e-cards for Christmas, Thanksgiving, New Year 2026, Diwali, and Lunar New Year with photo customization on Cardzy.": "Découvrez des cartes virtuelles animées 3D de luxe pour Noël, le Nouvel An 2026 et les fêtes mondiales avec personnalisation photo.",
    "Design interactive 3D birthday wish cards and milestone party invitation websites with music.": "Concevez des cartes d'anniversaire 3D interactives et des sites d'invitation de fête avec musique.",
    "Animated Birthday Cards & Party Invitations — Cardzy": "Cartes d'Anniversaire Animées et Invitations de Fête — Cardzy",
    "Build animated birthday wish cards and milestone party invitations with custom photos, celebratory music, and WhatsApp RSVP on Cardzy.": "Créez des cartes d'anniversaire animées et des invitations de fête avec photos, musique et suivi RSVP WhatsApp sur Cardzy.",
    "Streamline professional contact saving with dynamic web vCards and mobile contact files.": "Simplifiez l'enregistrement des contacts professionnels grâce aux vCards web dynamiques et fichiers de contact mobiles.",
    "Smart Digital Business Cards 1-Click VCF Save — Cardzy": "Cartes de Visite Numériques Intelligentes Enregistrement .VCF 1 Clic — Cardzy",
    "Discover how Cardzy's smart digital business cards with 1-click .VCF contact saving help professionals boost networking conversion rates.": "Découvrez comment les cartes de visite numériques intelligentes Cardzy avec enregistrement .VCF en 1 clic augmentent l'efficacité du réseau."
  },
  ar: {
    "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.": "عبارات راقية لدعوات النكاح والحناء والبارات والوليمة باللغتين الأردو والإنجليزي مع خط البسملة والآيات القرآنية وآداب الضيافة.",
    "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)": "دليل صيغ دعوات الزفاف الإسلامية والباكستانية (أردو وإنجليزي)",
    "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette.": "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع آيات قرآنية وتأكيد الحضور عبر كاردزي.",
    "Comprehensive financial breakdown, environmental savings, and RSVP management comparison.": "تحليل مالي شامل ومقارنة التوفير البيئي وإدارة تأكيد الحضور بين الدعوات الرقمية والورقية.",
    "Digital vs Paper Wedding Cards Cost Comparison — Cardzy": "مقارنة تكلفة بطاقات الزفاف الرقمية والورقية — كاردزي",
    "Detailed comparison of digital vs paper wedding invitations covering printing costs, courier fees, RSVP efficiency, and zero paper waste.": "مقارنة تفصيلية بين دعوات الزفاف الرقمية والورقية تغطي تكاليف الطباعة والتوصيل وتأكيد الحضور وسرعة التوزيع.",
    "Create beautiful 3D animated Eid cards with custom family photos, names, and Arabic/Urdu duas.": "أنشئ بطاقات عيد 3D متحركة رائعة مع صور العائلة والأسماء ودعوات إسلامية مباركة باللغتين العربية والأردو.",
    "Personalized Eid Cards with Photo & Name — Cardzy": "بطاقات تهنئة العيد بالصور والأسماء — كاردزي",
    "Design custom 3D animated Eid Mubarak wish cards with family photos, personalized names, and Quranic blessings. Share instantly on WhatsApp.": "صمم بطاقات تهنئة عيد مبارك 3D متحركة مع صور العائلة والأسماء والآيات القرآنية وشاركها فوراً عبر واتساب.",
    "How NFC cards and 1-Click .VCF contact saving revolutionize executive networking.": "كيف تحدث بطاقات NFC وحفظ جهات الاتصال بنقرة واحدة ثورة في التواصل المهني والتنفيذي.",
    "Smart NFC Digital Business Cards Guide — Cardzy": "دليل بطاقات الأعمال الرقمية NFC — كاردزي",
    "Discover how NFC digital business cards and QR code vCards help executives save contacts instantly into phonebooks with high networking conversion.": "اكتشف كيف تساعد بطاقات الأعمال الرقمية NFC ورمز QR في حفظ جهات الاتصال فوراً في أجهزة الجوال مع زيادة معدل التواصل المهني.",
    "Eliminate guest counting chaos with automated WhatsApp RSVP tracking and live dashboards.": "تخلص من فوضى إحصاء الضيوف بفضل التتبع الآلي لتأكيد الحضور عبر واتساب واللوحات التفاعلية المباشرة.",
    "Manage Wedding Guest Lists & WhatsApp RSVPs — Cardzy": "إدارة قائمة ضيوف الزفاف وتأكيد الحضور عبر واتساب — كاردزي",
    "Learn how to manage wedding guest lists, collect meal preferences, send venue pins, and track live WhatsApp RSVPs on Cardzy.": "تعلم كيفية إدارة قوائم ضيوف الزفاف، وجمع تفضيلات الطعام، وإرسال موقع القاعة، وتتبع الحضور المباشر عبر كاردزي.",
    "Create interactive invitation websites with gold foil animations, music, venue maps, and WhatsApp RSVP buttons.": "أنشئ مواقع دعوات تفاعلية مع مؤثرات ذهبية وموسيقى وخريطة الموقع وأزرار تأكيد الحضور عبر واتساب.",
    "Create Online Digital Invitation Cards with WhatsApp RSVP — Cardzy": "إنشاء بطاقات دعوة رقمية مع تأكيد الحضور عبر واتساب — كاردزي",
    "Learn how to build digital invitation websites on Cardzy with interactive 3D templates, embedded Google Maps, custom music, and live WhatsApp RSVP tracking.": "تعلم كيفية بناء موقع دعوة رقمي عبر كاردزي بقوالب 3D تفاعلية وموقع الخريطة وتتبع الحضور المباشر عبر واتساب.",
    "Turn simple text greetings into interactive 3D visual experiences with sound, photos, and personalized names.": "حول تهانيك النصية إلى تجربة بصرية 3D تفاعلية رائعة مع الصوت والصور والأسماء المخصصة.",
    "Design Custom 3D Animated Wish Cards — Cardzy": "تصميم بطاقات تهنئة 3D متحركة ومخصصة — كاردزي",
    "Create custom 3D animated greetings cards with personal photos, recipient names, background audio, and instant WhatsApp link sharing on Cardzy.": "أنشئ بطاقات تهنئة 3D متحركة بصورك الشخصية وأسماء المستلمين وموسيقى خلفية مع إمكانية المشاركة الفورية عبر واتساب.",
    "Send animated greetings for Christmas, New Year 2026, Thanksgiving, Diwali, and Lunar New Year.": "أرسل تهاني متحركة لأعياد الميلاد والسنة الجديدة 2026 وعيد الشكر والمناسبات العالمية.",
    "Global Holiday E-Cards Guide Christmas & New Year — Cardzy": "دليل بطاقات المناسبات العالمية الكريسماس والسنة الجديدة — كاردزي",
    "Explore luxury 3D animated e-cards for Christmas, Thanksgiving, New Year 2026, Diwali, and Lunar New Year with photo customization on Cardzy.": "استكشف بطاقات التهنئة الرقمية 3D الفاخرة للكريسماس والسنة الجديدة 2026 والمناسبات العالمية مع تخصيص الصور عبر كاردزي.",
    "Design interactive 3D birthday wish cards and milestone party invitation websites with music.": "صمم بطاقات أعياد ميلاد 3D تفاعلية ومواقع دعوات الحفلات الخاصة مع الصوت والموسيقى.",
    "Animated Birthday Cards & Party Invitations — Cardzy": "بطاقات أعياد الميلاد المتحركة ودعوات الحفلات — كاردزي",
    "Build animated birthday wish cards and milestone party invitations with custom photos, celebratory music, and WhatsApp RSVP on Cardzy.": "أنشئ بطاقات أعياد ميلاد متحركة ودعوات حفلات مع صور مخصصة وموسيقى احتفالية وتأكيد الحضور عبر واتساب على كاردزي.",
    "Streamline professional contact saving with dynamic web vCards and mobile contact files.": "سهل عملية حفظ جهات الاتصال المهنية عبر بطاقات vCard التفاعلية وملفات الجوال المباشرة.",
    "Smart Digital Business Cards 1-Click VCF Save — Cardzy": "بطاقات الأعمال الرقمية الذكية حفظ VCF بنقرة واحدة — كاردزي",
    "Discover how Cardzy's smart digital business cards with 1-click .VCF contact saving help professionals boost networking conversion rates.": "اكتشف كيف تساعد بطاقات الأعمال الذكية من كاردزي ذات حفظ VCF بنقرة واحدة في زيادة التفاعل والتواصل المهني."
  }
};

// Loop through post files and update non-English values where appropriate
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(num => {
  const filePath = path.join(targetDir, `post${num}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  ['es', 'fr', 'ar'].forEach(lang => {
    const dict = TRANSLATION_LOOKUP[lang];
    if (!dict) return;

    Object.keys(dict).forEach(engKey => {
      const transVal = dict[engKey];
      // Search for occurrences of engKey under the specific lang section and replace
      if (text.includes(engKey)) {
        // We will perform a careful replace for lang entries
      }
    });
  });
});

console.log("Translation dictionary lookup executed.");
