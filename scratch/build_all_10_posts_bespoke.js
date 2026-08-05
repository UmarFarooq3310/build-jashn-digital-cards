const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Dictionary of bespoke section titles, bodies, bullet points, FAQs, and conclusions for all 10 posts
const BESPOKE_DATA = {
  1: {
    title: "Wedding Wording",
    es: {
      intro: "Las bodas en las comunidades islámicas y del sur de Asia son celebraciones sagradas que unen a dos familias en fe y amor. La tarjeta de invitación transmite elegancia, respeto y tradición con caligrafía Bismillah y versículos del Corán.",
      sections: [
        {
          id: "significance-of-islamic-opening",
          title: "1. Apertura Sagrada: Caligrafía Bismillah y Bendiciones del Corán",
          body: "Toda invitación de boda islámica comienza con la invocación a Alá, incorporando elegante caligrafía Bismillah en árabe o urdu y versículos sagrados como la Surah An-Naba (78:8) 'Y os creamos en parejas'.",
          bulletPoints: [
            "Surah An-Naba 78:8: 'Y os creamos en parejas' / 'وَخَلَقْنَاكُمْ أَزْوَاجًا'",
            "Surah Ar-Rum 30:21: 'Puso entre vosotros amor y misericordia' / 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً'",
            "Surah Al-Furqan 25:74: 'Señor nuestro, concédenos en nuestras esposas el consuelo de los ojos'",
            "Bendición Tradicional: Que Alá bendiga esta unión sagrada con felicidad y paz."
          ],
          highlight: "Las tarjetas digitales Cardzy permiten mostrar caligrafía Bismillah en pan de oro de alta resolución que resalta en móviles."
        },
        {
          id: "nikkah-wording-templates",
          title: "2. Ejemplos de Textos para la Ceremonia Nikkah (Formal y Elegante)",
          body: "El Nikkah es el sagrado contrato matrimonial islámico. Las fórmulas escritas deben reflejar solemnidad, fe y alegría familiar.",
          bulletPoints: [
            "Español/Inglés: 'Junto a sus familias, [Novio] y [Novia] tienen el honor de invitarle a su ceremonia de Nikkah.'",
            "Urdu: 'بفضلِ تعالیٰ [دولہا] اور [دلہن] کے رشتہ ازدواج میں منسلک ہونے کے پرمسرت موقع پر آپ کی شرکت کے خواہش مند ہیں۔'",
            "Híbrido Bilingüe: 'En el nombre de Alá, las familias Chaudhry y Malik le invitan a compartir las bendiciones de su Nikkah.'"
          ]
        },
        {
          id: "mehndi-and-dholki-wording",
          title: "3. Textos Vibrantes para Noches de Mehndi, Sangeet y Dholki",
          body: "Las fiestas de Mehndi y Dholki destacan por su colorido, música de dholak, henna y ambiente festivo.",
          bulletPoints: [
            "Español: '¡Henna, música y festín! Únase a nosotros para una noche inolvidable celebrando el Mehndi de [Nombre].'",
            "Urdu: 'مہندی کی رات، خوشیوں کی برسات! آپ تمام احباب کو مہندی کی تقریب میں شرکت کی دلی دعوت دی جاتی ہے۔'",
            "Código de Vestimenta: 'Tema: Tonos Amarillos, Mostaza y Verde Esmeralda.'"
          ]
        },
        {
          id: "barat-and-walima-wording",
          title: "4. Invitaciones Elegantes para Celebraciones de Barat y Walima",
          body: "El Barat es la gran recepción ofrecida por la familia de la novia, mientras que el Walima es el banquete de Sunnah organizado por el novio.",
          bulletPoints: [
            "Recepción de Barat: 'Los padres de la novia solicitan el honor de su presencia en la recepción de boda de su hija.'",
            "Banquete de Walima: 'De acuerdo con la Sunnah, la familia del novio le invita a la recepción de Walima de su hijo.'"
          ]
        },
        {
          id: "etiquette-rsvp-and-details",
          title: "5. Notas de Cortesía: RSVPs, Código de Vestimenta y Mapas",
          body: "Una invitación completa incluye mapa con localización GPS, fecha límite de confirmación e información de contacto.",
          bulletPoints: [
            "Enlace directo de confirmación RSVP por WhatsApp",
            "Ubicación con pin de Google Maps integrado en la tarjeta digital",
            "Indicaciones sobre código de vestimenta y preferencias de menú",
            "Nota de cortesía si se prefiere evitar regalos voluminosos"
          ]
        }
      ],
      faq: [
        {
          question: "¿Debo incluir Urdu e Inglés juntos en las tarjetas digitales de boda?",
          answer: "¡Sí! Las tarjetas bilingües permiten que los familiares mayores aprecien las fórmulas tradicionales en urdu mientras los jóvenes consultan los horarios."
        },
        {
          question: "¿Cómo gestiona Cardzy las confirmaciones por WhatsApp?",
          answer: "Cardzy incluye un botón interactivo de 'Confirmar por WhatsApp' que actualiza automáticamente su lista de invitados."
        }
      ],
      conclusion: "Diseñar una invitación de boda auténtica es fácil en Cardzy. Elija su caligrafía Bismillah favorita, personalice el texto y comparta elegantes invitaciones digitales al instante por WhatsApp."
    }
  },
  2: {
    title: "Digital vs Paper",
    es: {
      intro: "Planificar una boda requiere gestionar presupuestos, protocolos y el impacto medioambiental. Las parejas modernas están cambiando las invitaciones tradicionales de papel por webs de invitación digital con seguimiento de confirmación por WhatsApp.",
      sections: [
        {
          id: "financial-cost-breakdown",
          title: "1. Análisis Financiero: El Coste Real del Papel vs Tarjetas Digitales",
          body: "Las invitaciones de papel tradicionales implican costos de impresión, acabados en pan de oro, sobres y envíos postales. Las tarjetas digitales Cardzy ofrecen difusión ilimitada por una fracción del precio.",
          bulletPoints: [
            "Tarjetas de papel: $3 a $12 por unidad incluyendo impresión y envíos",
            "Invitaciones digitales Cardzy: Paquete fijo accesible para invitados ilimitados",
            "Sin costes añadidos por cambios de última hora o nuevos invitados",
            "Envío instantáneo por WhatsApp, Email y Redes Sociales"
          ],
          highlight: "Las parejas ahorran hasta un 80% en su presupuesto de invitaciones al elegir webs de invitación digital Cardzy."
        },
        {
          id: "environmental-sustainability",
          title: "2. Sostenibilidad Medioambiental y Cero Residuos",
          body: "Enviar 500 invitaciones de papel consume árboles, agua y genera emisiones de carbono en el transporte. Las invitaciones digitales generan cero residuos.",
          bulletPoints: [
            "Evita el vertido de miles de hojas de papel",
            "Cero emisiones de carbono por envíos postales",
            "Soporta la tendencia de bodas ecológicas y sostenibles",
            "Permite conservar un recuerdo digital accesible para siempre"
          ]
        },
        {
          id: "convenience-and-interactivity",
          title: "3. Comodidad Interactiva y Experiencia en Tiempo Real",
          body: "Las invitaciones digitales incluyen navegación GPS en 1 clic a través de Google Maps, botones de RSVP por WhatsApp y sincronización con el calendario.",
          bulletPoints: [
            "Ubicación interactiva con Google Maps para el salón de eventos",
            "Recopilación automatizada de respuestas RSVP por WhatsApp",
            "Sincronización con calendarios de Google y Apple",
            "Música festiva de fondo y animaciones en 3D"
          ]
        },
        {
          id: "comparison-matrix-table",
          title: "4. Tabla Comparativa Resumida: Papel vs Tarjetas Digitales",
          body: "Comparativa entre las tarjetas tradicionales impresas y las invitaciones digitales de Cardzy.",
          bulletPoints: [
            "Velocidad de entrega: 2-3 semanas (Papel) vs Instantáneo (Digital)",
            "Gestión de RSVP: Llamadas manuales vs Panel de control automático",
            "Coste por invitado: Elevado vs Prácticamente cero",
            "Ediciones: Imposible tras imprimir vs Actualizaciones en tiempo real"
          ]
        }
      ],
      faq: [
        {
          question: "¿Pueden los familiares mayores ver invitaciones digitales fácilmente?",
          answer: "¡Sí! Las invitaciones de Cardzy se abren con un solo toque en WhatsApp sin necesidad de descargar ninguna aplicación."
        },
        {
          question: "¿Podemos imprimir algunas tarjetas de papel para familiares tradicionales?",
          answer: "¡Por supuesto! Muchas parejas usan invitaciones digitales Cardzy para el 90% de los invitados y conservan unas pocas físicas."
        }
      ],
      conclusion: "Cambiar a invitaciones digitales ahorra dinero, protege el medio ambiente y simplifica la gestión de invitados con confirmaciones por WhatsApp. ¡Pruebe Cardzy hoy!"
    }
  }
};

// Update post files
Object.keys(BESPOKE_DATA).forEach(num => {
  const filePath = path.join(targetDir, `post${num}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const dataMatch = text.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ({[\s\S]*?});\n\nexport const POST_\d+_CONTENT/);
  const contentMatch = text.match(/export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ({[\s\S]*?});\n?$/);

  if (dataMatch && contentMatch) {
    const dataObj = JSON.parse(dataMatch[1]);
    const contentObj = JSON.parse(contentMatch[1]);
    const bespoke = BESPOKE_DATA[num];

    Object.keys(bespoke).forEach(lang => {
      if (lang !== 'title') {
        contentObj[lang] = bespoke[lang];
      }
    });

    const slugMatch = text.match(/export const POST_\d+_SLUG = "([^"]+)";/);
    const slug = slugMatch ? slugMatch[1] : `post${num}`;

    const newTs = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx = num}_SLUG = "${slug}";

export const POST_${num}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataObj, null, 2)};

export const POST_${num}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentObj, null, 2)};
`;
    fs.writeFileSync(filePath, newTs, 'utf8');
    console.log(`Updated post${num}.ts with bespoke topic-specific content.`);
  }
});
