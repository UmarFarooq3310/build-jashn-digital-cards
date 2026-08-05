const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Deep post-specific content dictionaries
const BESPOKE_POST_CONTENTS = {
  // Post 4: NFC Business Cards
  4: {
    es: {
      intro: "En el acelerado entorno corporativo actual, las tarjetas de visita de papel tradicionales están quedando obsoletas. Las tarjetas de visita digitales inteligentes NFC permiten compartir datos de contacto, redes sociales, catálogo y descarga de archivo .VCF con un solo toque.",
      sections: [
        {
          id: "limitations-of-paper-visiting-cards",
          title: "1. Por Qué las Tarjetas de Visita de Papel Están Quedando Obsoletas",
          body: "Más del 88% de las tarjetas de visita impresas entregadas en congresos terminan tiradas a la basura en menos de una semana porque guardar los datos manualmente resulta pesado.",
          bulletPoints: [
            "Más del 88% de las tarjetas de papel se pierden o se desechan",
            "Actualizar un teléfono exige costosas reimpresiones",
            "Imposibilidad de mostrar vídeos, portafolios o redes sociales",
            "Consumo de papel poco respetuoso con el medio ambiente"
          ]
        },
        {
          id: "how-nfc-and-digital-vcards-work",
          title: "2. Cómo Funcionan las Tarjetas vCard NFC y Códigos QR",
          body: "La tecnología NFC transmite su perfil profesional directamente a cualquier smartphone iPhone o Android sin necesidad de instalar aplicaciones.",
          bulletPoints: [
            "Toque la tarjeta NFC contra cualquier smartphone para abrir la vCard",
            "Código QR dinámico de respaldo para móviles más antiguos",
            "Botón 'Guardar contacto' (.vcf) en 1 clic directo a la agenda",
            "Edición de datos en tiempo real sin reimprimir tarjetas físicas"
          ]
        },
        {
          id: "essential-features-of-executive-vcard",
          title: "3. Elementos Clave de una Tarjeta Digital de Alto Rendimiento",
          body: "Una tarjeta digital inteligente incluye fotografía profesional HD, logotipo corporativo, enlace directo a WhatsApp, redes sociales y mapa de la empresa.",
          bulletPoints: [
            "Foto de perfil en alta resolución y logotipo corporativo",
            "Botón directo de 'Guardar Contacto en el Teléfono'",
            "Enlaces interactivos a WhatsApp, Email, Teléfono y Web",
            "Iconos de redes profesionales (LinkedIn, Instagram, X, YouTube)"
          ]
        },
        {
          id: "roi-and-cost-benefits",
          title: "4. Análisis de Rentabilidad y Ahorro para Equipos Comerciales",
          body: "Las empresas ahorran miles de euros al año al adoptar vCards digitales para sus departamentos comerciales y directivos.",
          bulletPoints: [
            "Elimina gastos continuos de imprenta por incorporaciones o promociones",
            "Imagen de marca coherente y centralizada para todo el equipo",
            "Métricas analíticas de contactos y seguimiento de clics"
          ]
        }
      ],
      faq: [
        {
          question: "¿El destinatario necesita una aplicación para abrir la tarjeta NFC?",
          answer: "¡No requiere ninguna app! El destinatario simplemente acerca su teléfono a la tarjeta o escanea el código QR."
        },
        {
          question: "¿Cómo funciona la función de guardar contacto (.vcf) en 1 clic?",
          answer: "Al pulsar el botón, el smartphone guarda automáticamente su nombre, teléfono, email y cargo directamente en su agenda."
        }
      ],
      conclusion: "Renueve su imagen ejecutiva con las tarjetas de visita digitales inteligentes de Cardzy. ¡Cree su vCard personalizada hoy mismo!"
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
    }
  }
};

// Apply bespoke translations into post files
[4].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const postDataMatch = text.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ({[\s\S]*?});\n\nexport const POST_\d+_CONTENT/);
  const postContentMatch = text.match(/export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ({[\s\S]*?});\n?$/);

  if (postDataMatch && postContentMatch) {
    const dataObj = JSON.parse(postDataMatch[1]);
    const contentObj = JSON.parse(postContentMatch[1]);

    const bespokeLangs = BESPOKE_POST_CONTENTS[fileIdx];
    if (bespokeLangs) {
      Object.keys(bespokeLangs).forEach(l => {
        contentObj[l] = bespokeLangs[l];
      });
    }

    const slugMatch = text.match(/export const POST_\d+_SLUG = "([^"]+)";/);
    const slug = slugMatch ? slugMatch[1] : `post${fileIdx}`;

    const newTs = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataObj, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentObj, null, 2)};
`;
    fs.writeFileSync(filePath, newTs, 'utf8');
    console.log(`Updated post${fileIdx}.ts with bespoke language content.`);
  }
});
