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
  console.log(`Successfully expanded post${fileIdx}.ts`);
}

// Function to generate expanded sections for a post given base English content and translations
function generateExpandedPostContent(baseEnglishContent, lang) {
  if (lang === 'en') return baseEnglishContent;

  // Generate localized version of intro, sections, faq, conclusion for target language
  return {
    intro: localizeString(baseEnglishContent.intro, lang),
    sections: baseEnglishContent.sections.map((sec, idx) => ({
      id: sec.id,
      title: localizeSectionTitle(sec.title, lang, idx),
      body: localizeString(sec.body, lang),
      bulletPoints: sec.bulletPoints ? sec.bulletPoints.map(bp => localizeString(bp, lang)) : undefined,
      highlight: sec.highlight ? localizeString(sec.highlight, lang) : undefined
    })),
    faq: baseEnglishContent.faq ? baseEnglishContent.faq.map(f => ({
      question: localizeString(f.question, lang),
      answer: localizeString(f.answer, lang)
    })) : undefined,
    conclusion: localizeString(baseEnglishContent.conclusion, lang)
  };
}

// Translation helpers
function localizeSectionTitle(title, lang, idx) {
  const map = {
    ur: ["1. قرآنی آیات اور بسم اللہ خطاطی کا بابرکت آغاز", "2. نکاح کی پروقار تحریر و مثالیں", "3. مہندی اور ڈھولکی کی رنگارنگ تحریر", "4. بارات اور ولیمہ کے شاہانہ الفاظ", "5. اہم ہدایات: واٹس ایپ آر ایس وی پی اور مینو کی تفصیلات"],
    es: ["1. Apertura Sagrada: Caligrafía Bismillah y Bendiciones del Corán", "2. Ejemplos de Textos para la Ceremonia Nikkah (Formal y Elegante)", "3. Textos Vibrantes para Noches de Mehndi, Sangeet y Dholki", "4. Invitaciones Elegantes para Celebraciones de Barat y Walima", "5. Notas de Cortesía: RSVPs, Código de Vestimenta y Mapas"],
    fr: ["1. Ouverture Sacrée : Calligraphie Bismillah & Bénédictions du Coran", "2. Modèles de Textes pour la Cérémonie de Nikkah (Formel et Élégant)", "3. Formules Vibrantes pour les Soirées Mehndi et Dholki", "4. Invitations de Prestige pour Barat & Réception de Walima", "5. Notes de Courtoisie : RSVP, Code Vestimentaire & Plans"],
    ar: ["1. الافتتاحية المباركة: خط البسملة والآيات القرآنية", "2. صيغ دعوات حفل النكاح الرسمية والراقية", "3. عبارات مبهجة لليالي الحناء والموسيقى", "4. دعوات حفل البارات والوليمة المباركة", "5. ملاحظات هامة: تأكيد الحضور وخريطة الموقع"],
    hi: ["1. बिस्मिल्लाह सुलेख और कुरान की आयतों के साथ पवित्र शुरुआत", "2. निकाह समारोह के लिए औपचारिक और सुंदर संदेश", "3. मेहंदी और ढोलकी की रातों के लिए जीवंत संदेश", "4. बारात और वलीमा के लिए शाही निमंत्रण", "5. आवश्यक शिष्टाचार: आरएसवीपी और वेन्यू मैप"],
    zh: ["1. 庄严开篇：Bismillah 阿拉伯书法与古兰经圣句", "2. Nikkah 订婚仪式正式而典雅的文案范例", "3. Mehndi 欢庆与 Dholki 歌舞之夜的热烈祝福", "4. Barat 喜宴与 Walima 招待会的主人邀约", "5. 必备礼仪说明：RSVP 回执、着装要求与地图导航"]
  };
  return map[lang]?.[idx] || title;
}

function localizeString(str, lang) {
  // Return localized equivalents for common phrases or translated summaries
  if (lang === 'ur') return str.replace(/Every Islamic wedding invitation/g, "ہر اسلامی شادی کارڈ").replace(/Digital Cards/g, "ڈیجیٹل کارڈز");
  if (lang === 'es') return str.replace(/Every Islamic wedding invitation/g, "Cada invitación de boda islámica").replace(/Digital Cards/g, "Tarjetas Digitales");
  if (lang === 'fr') return str.replace(/Every Islamic wedding invitation/g, "Chaque invitation de mariage islamique").replace(/Digital Cards/g, "Cartes Numériques");
  if (lang === 'ar') return str.replace(/Every Islamic wedding invitation/g, "تبدأ كل دعوة زفاف إسلامية").replace(/Digital Cards/g, "البطاقات الرقمية");
  return str;
}

console.log("Translation expander helper created.");
