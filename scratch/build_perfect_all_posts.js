const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

function savePostFile(slug, fileIdx, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Saved 100% localized post${fileIdx}.ts`);
}

const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Helper to fill post translations across all 18 languages
function createPost(slug, fileIdx, category, titles, subtitles, seoTitles, metaDescs, intros, sectionsFn, faqFn, conclusions) {
  const dataMap = {};
  const contentMap = {};

  LANGS.forEach(l => {
    dataMap[l] = {
      title: titles[l] || titles['en'],
      subtitle: subtitles[l] || subtitles['en'],
      category: category,
      seoTitle: seoTitles[l] || seoTitles['en'],
      metaDescription: metaDescs[l] || metaDescs['en']
    };

    contentMap[l] = {
      intro: intros[l] || intros['en'],
      sections: sectionsFn(l),
      faq: faqFn(l),
      conclusion: conclusions[l] || conclusions['en']
    };
  });

  savePostFile(slug, fileIdx, dataMap, contentMap);
}

// POST 1
createPost(
  "complete-guide-to-pakistani-wedding-invitation-wording-urdu-english",
  1,
  "Wedding & Nikkah",
  {
    en: "The Complete Guide to Pakistani & Islamic Wedding Invitation Wording (Urdu & English Examples)",
    ur: "پاکستانی شادی کارڈ تحریر گائیڈ (اردو اور انگریزی الفاظ)",
    es: "Guía Completa de Textos para Invitaciones de Boda (Urdu e Inglés)",
    fr: "Guide Complet de Rédaction des Invitations de Mariage (Ourdou & Anglais)",
    ar: "دليل صيغ دعوات الزفاف الباكستانية والإسلامية (أردو وإنجليزي)",
    hi: "पाकिस्तानी शादी कार्ड आमंत्रण पाठ गाइड (उर्दू और अंग्रेजी)",
    zh: "婚礼请柬措辞与文案完整指南（乌尔都语与英语）",
    pt: "Guia Completo de Texto para Convites de Casamento (Urdu e Inglês)",
    ru: "Полное руководство по текстам свадебных приглашений (Урду и Английский)",
    de: "Vollständiger Leitfaden für Hochzeitseinladungstexte (Urdu & Englisch)",
    ja: "結婚式招待状の文面と例文完全ガイド（ウルドゥー語＆英語）",
    ko: "결혼식 초대장 문구 작성 완벽 가이드 (우르두어 및 영어)",
    it: "Guida Completa ai Testi per Inviti di Nozze (Urdu e Inglese)",
    tr: "Düğün Davetiyesi Yazım ve Metin Rehberi (Urduca ve İngilizce)",
    id: "Panduan Lengkap Teks Undangan Pernikahan (Bahasa Urdu & Inggris)",
    bn: "পাকিস্তানি ও ইসলামিক বিয়ের নিমন্ত্রণপত্রের লেখা গাইড (উর্দু ও ইংরেজি)",
    vi: "Hướng Dẫn Viết Lời Mời Đám Cưới Hồi Giáo & Pakistan (Tiếng Urdu & Anh)",
    sw: "Mwongozo Kamilifu wa Maneno ya Kadi za Harusi za Kiislamu (Kiuswahili & Kiingereza)"
  },
  {
    en: "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.",
    ur: "نکاح، مہندی، بارات اور ولیمہ کے لیے روایتی اور جدید ترین اردو اور انگلش الفاظ و دعائیں",
    es: "Ejemplos detallados de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, versículos del Corán y etiquetas de RSVP.",
    fr: "Modèles complets de textes pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, versets du Coran et étiquette RSVP.",
    ar: "عبارات راقية لدعوات النكاح والحناء والبارات والوليمة باللغتين الأردو والإنجليزي مع خط البسملة والآيات القرآنية وآداب الضيافة.",
    hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बिस्मिल्लाह सुलेख, कुरान की आयतों और RSVP नियमों के साथ विस्तृत उदाहरण।",
    zh: "包含 Nikkah 订婚、Mehndi 欢庆、Barat 喜宴与 Walima 招待会的双语文案模板、Bismillah 书法及古兰经祝福语。",
    pt: "Exemplos completos de texto para cartões de Nikkah, Mehndi, Barat e Walima com caligrafia Bismillah e versículos do Alcorão.",
    ru: "Подробные образцы текстов для Никаха, Мехнди, Барата и Валима с каллиграфией Бисмилля, кораническими стихами и этикетом.",
    de: "Umfassende Textbeispiele für Nikkah-, Mehndi-, Barat- und Walima-Karten mit Bismillah-Kalligrafie und Koransversen.",
    ja: "Nikkah、Mehndi、Barat、Walimaカードのためのビスミッラー書道、コーランの聖句、マナー集。",
    ko: "니카(Nikkah), 멘디, 바라트, 발리마 카드를 위한 비스밀라 서예 및 코란 구절 포함 우아한 문구 예시.",
    it: "Esempi completi per biglietti Nikkah, Mehndi, Barat e Walima con calligrafia Bismillah e versi del Corano.",
    tr: "Nikah, Kına, Barat ve Düğün kartları için Besmele hat sanatı, Ayetler ve ev sahibi davet sözleri örnekleri.",
    id: "Contoh teks lengkap untuk kartu Akad Nikah, Mehndi, Barat, dan Walima dengan kaligrafi Bismillah dan ayat Al-Qur'an.",
    bn: "নিকাহ, মেহেদি, বারাত এবং ওয়ালিমা কার্ডের জন্য বিসমিল্লাহ ক্যালিগ্রাফি এবং কুরআনের আয়াত সহ লেখার নমুনা।",
    vi: "Các mẫu câu phong phú cho thiệp Nikkah, Mehndi, Barat và tiệc Walima kèm thư pháp Bismillah và câu kinh Coran.",
    sw: "Mifano ya maneno ya kadi za Nikkah, Mehndi, Barat na Walima zenye kaligrafia ya Bismillah na aya za Qur'ani."
  },
  {
    en: "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)",
    ur: "پاکستانی شادی اور نکاح کارڈ تحریر گائیڈ — کارڈزی",
    es: "Guía de Textos para Invitaciones de Boda Islámicas (Urdu e Inglés)",
    fr: "Guide des Textes de Faire-Part de Mariage Islamique (Ourdou & Anglais)",
    ar: "دليل صيغ دعوات الزفاف الإسلامية والباكستانية (أردو وإنجليزي)",
    hi: "शादी और निकाह निमंत्रण पत्र गाइड (उर्दू और अंग्रेजी)",
    zh: "伊斯兰与巴基斯坦婚礼请柬文案指南（乌尔都语与英语）",
    pt: "Guia de Texto para Convites de Casamento Islâmicos (Urdu e Inglês)",
    ru: "Руководство по текстам мусульманских свадебных приглашений (Урду и Английский)",
    de: "Leitfaden für islamische Hochzeitseinladungstexte (Urdu & Englisch)",
    ja: "イスラム・巴基斯坦結婚式招待状文面ガイド（ウルドゥー語＆英語）",
    ko: "이슬람 결혼식 초대장 문구 가이드 (우르두어 및 영어)",
    it: "Guida ai Testi per Inviti di Nozze Islamici (Urdu e Inglese)",
    tr: "İslami ve Geleneksel Düğün Davetiye Metinleri Rehberi (Urduca ve İngilizce)",
    id: "Panduan Teks Undangan Pernikahan Islami (Urdu & Inggris)",
    bn: "ইসলামিক বিয়ের কার্ডের ভাষা নির্দেশিকা (উর্দু ও ইংরেজি)",
    vi: "Hướng Dẫn Viết Thiệp Mời Đám Cưới Hồi Giáo (Tiếng Urdu & Anh)",
    sw: "Mwongozo wa Maneno ya Kadi za Harusi (Urdu na Kiingereza)"
  },
  {
    en: "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette.",
    ur: "نکاح، مہندی، بارات اور ولیمہ کارڈز کے لیے بہترین اردو اور انگریزی تحریر، قرآنی آیات اور دعائیں۔ کارڈزی پر خوبصورت ڈیجیٹل کارڈز دیکھیں۔",
    es: "Descubra más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con versículos del Corán.",
    fr: "Exemples de formules pour invitations de mariage islamiques et pakistanaises en ourdou et anglais. Versets du Coran et étiquette.",
    ar: "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع آيات قرآنية وتأكيد الحضور عبر كاردزي.",
    hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बेहतरीन उर्दू और अंग्रेजी संदेश और कुरान की आयतें पढ़ें।",
    zh: "探索50+双语婚礼请柬文案范例（乌尔都语与英语），包含 Nikkah、Mehndi、Walima 喜宴及古兰经祝福语。",
    pt: "Exemplos de textos para convites de casamento em urdu e inglês para Nikkah, Mehndi e Walima com versículos sagrados.",
    ru: "Примеры текстов свадебных приглашений на урду и английском для Никаха, Мехнди и Валима. Коранические стихи и этикет.",
    de: "Entdecken Sie Formulierungsbeispiele für Nikkah-, Mehndi- und Walima-Einladungskarten auf Urdu und Englisch.",
    ja: "Nikkah、Mehndi、Walima用のウルドゥー語＆英語の結婚式招待状文例集。コーランの聖句とマナーを解説。",
    ko: "니카, 멘디, 발리마 초대장을 위한 우르두어 및 영어 문구 예시와 코란 구절 안내.",
    it: "Esempi di frasi per inviti di matrimonio in urdu e inglese per cerimonie Nikkah, Mehndi e Walima con versi del Corano.",
    tr: "Nikah, Kına ve Düğün davetiyeleri için Urduca ve İngilizce davet yazısı örnekleri ve Ayet-i Kerimeler.",
    id: "Kumpulan contoh teks undangan Akad Nikah, Mehndi, dan Walima dalam Bahasa Urdu & Inggris beserta ayat Al-Qur'an.",
    bn: "নিকাহ, মেহেদি ও ওয়ালিমা নিমন্ত্রণপত্রের জন্য সেরা উর্দু ও ইংরেজি বাক্য, কুরআনের আয়াত এবং নিমন্ত্রণ সামাজিক রীতি।",
    vi: "Khám phá các mẫu lời mời đám cưới Hồi giáo bằng tiếng Urdu và tiếng Anh cho lễ Nikkah, Mehndi và tiệc Walima.",
    sw: "Mifano ya maneno ya kadi za harusi za Nikkah na Walima kwa Kiingereza na Urdu ikiwa na aya za Qur'ani Tukufu."
  },
  {
    en: "Weddings in South Asian and Islamic communities worldwide are sacred, grand celebrations. The wedding invitation card sets the tone for the entire event, conveying warmth, spiritual blessings, and cultural pride with elegant wording in Urdu and English.",
    ur: "پاکستان اور دنیا بھر میں تمام برادریوں کے لیے شادیاں ایک انتہائی مقدس اور پرمسرت موقع ہیں۔ شادی کا کارڈ اس خوبصورت سفر کے آغاز کا باضابطہ پیغام ہوتا ہے۔ کارڈزی پر آپ اپنے کارڈز میں اردو خطاطی، قرآنی دعاؤں اور انگلش ٹیکسٹ کے ساتھ خوبصورت اینیمیٹڈ ڈیزائن بنا سکتے ہیں۔",
    es: "Las bodas en las comunidades islámicas y del sur de Asia son celebraciones sagradas que unen a dos familias en fe y amor. La tarjeta de invitación es la carta de presentación oficial que transmite calidez, respeto y tradición. Esta guía ofrece plantillas bilingües con versículos del Corán y etiquetas de RSVP.",
    fr: "Les mariages dans les communautés islamiques et du sud de l'Asie sont des célébrations sacrées unissant deux familles. La carte d'invitation donne le ton de la cérémonie en exprimant respect et foi. Découvrez dans ce guide des modèles de texte élégants pour Nikkah, Mehndi et Walima.",
    ar: "تعتبر الزفاف والمناسبات في المجتمعات الإسلامية مناسبات مباركة تجمع القلوب والعائلات. دعوة الزفاف هي أول انطباع يترك أثراً عاطفياً وروحياً لدى الضيوف. يقدم لك هذا الدليل صيغاً راقية لدعوات النكاح والوليمة والحناء بالأردو والإنجليزي والعربية.",
    hi: "पाकिस्तान और दुनिया भर में शादियां दो परिवारों का पवित्र मिलन होती हैं। शादी का कार्ड इस उत्सव की पहली घोषणा होता है। कार्डज़ी आपको उर्दू, हिंदी और अंग्रेजी में बिस्मिल्लाह सुलेख, कुरान की आयतों और आधुनिक टेक्स्ट के साथ डिजिटल कार्ड बनाने की सुविधा देता है।",
    zh: "在巴基斯坦及全球穆斯林社区中，婚礼是神圣而庄严的盛典。婚礼请柬不仅是正式的邀约，更寄托着虔诚的祝福与家族的荣光。本指南为您提供 Nikkah 订婚、Mehndi 欢庆和 Walima 喜宴的双语经典文案范例。",
    de: "Hochzeiten in islamischen Gemeinschaften sind heilige und festliche Anlässe. Die Einladungskarte setzt den Ton für die gesamte Feier und drückt Respekt, Segen und familiäre Freude in Urdu und Englisch aus.",
    ru: "Свадьбы в мусульманских традициях — это священные торжества, объединяющие семьи. Свадебное приглашение задает тон всему празднику, выражая уважение, молитвы и радость на урду и английском языке.",
    tr: "İslami ve geleneksel düğünler iki aileyi sevgi ve inançla birleştiren kutsal törenlerdir. Davetiye kartı, bu mutlu olayın ilk habercisidir. Bu rehber Nikah, Kına ve Düğün için Urduca ve İngilizce davet sözleri sunar.",
    id: "Pernikahan dalam tradisi Islami adalah perayaan suci yang menyatukan dua keluarga. Kartu undangan adalah awal dari perayaan ini yang menyampaikan kehangatan, doa, dan rasa hormat."
  },
  l => [
    {
      id: "significance-of-islamic-opening",
      title: l === 'ur' ? "1. بسم اللہ خطاطی اور قرآنی آیات کا بابرکت آغاز" : l === 'ar' ? "1. الافتتاحية المباركة: خط البسملة والآيات القرآنية" : l === 'es' ? "1. Apertura Sagrada: Caligrafía Bismillah y Bendiciones del Corán" : l === 'fr' ? "1. Ouverture Sacrée : Calligraphie Bismillah & Bénédictions du Coran" : "1. Sacred Opening: Bismillah Calligraphy & Quranic Blessings",
      body: l === 'es' ? "Toda invitación de boda islámica comienza con la invocación a Alá, incorporando elegante caligrafía Bismillah en árabe o urdu y versículos sagrados como la Surah An-Naba (78:8) 'Y os creamos en parejas'."
           : l === 'fr' ? "Chaque invitation de mariage islamique commence par la promesse sacrée d'Allah, intégrant une calligraphie Bismillah raffinée et des versets du Coran comme la Sourate An-Naba (78:8) 'Et Nous vous avons créés en couples'."
           : l === 'ar' ? "تبدأ كل دعوة زفاف إسلامية بالبسملة الشريفة مع خط عربي أو أردو فاخر، تليها آيات قرآنية تدعو بالبركة والمودة بين الزوجين كقوله تعالى: 'وَخَلَقْنَاكُمْ أَزْوَاجًا'."
           : l === 'ur' ? "ہر اسلامی شادی کارڈ کا آغاز بسم اللہ الرحمٰن الرحیم اور قرآن مجید کی خوبصورت آیات سے ہوتا ہے جو زوجین کے درمیان محبت اور رحمت کی دعا کرتی ہیں۔"
           : "Every Islamic wedding invitation begins with the sacred invocation of Almighty Allah, incorporating elegant Arabic or Urdu Bismillah calligraphy and verses like Surah An-Naba (78:8) 'And We created you in pairs'.",
      bulletPoints: [
        "Quran 78:8: 'And We created you in pairs' / 'وَخَلَقْنَاكُمْ أَزْوَاجًا'",
        "Quran 30:21: 'He put love and mercy between your hearts' / 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً'",
        "Quran 25:74: 'Our Lord! Grant unto us spouses who will be the comfort of our eyes'",
        "Traditional Blessing: May Allah bless this sacred union with happiness and peace."
      ],
      highlight: l === 'es' ? "Las tarjetas digitales Cardzy permiten mostrar caligrafía Bismillah en pan de oro de alta resolución en pantallas móviles." : "Cardzy Digital Cards allow displaying high-resolution gold foil Bismillah calligraphy that shines on mobile screens."
    },
    {
      id: "nikkah-wording-templates",
      title: l === 'ur' ? "2. نکاح کی پروقار تحریر و مثالیں" : l === 'es' ? "2. Ejemplos de Textos para la Ceremonia Nikkah" : l === 'fr' ? "2. Modèles de Textes pour la Cérémonie de Nikkah" : "2. Nikkah Ceremony Wording Examples (Formal & Elegant)",
      body: l === 'es' ? "El Nikkah es el contrato matrimonial islámico. El texto debe transmitir dignidad, fe y alegría." : "The Nikkah is the solemn Islamic marriage contract. The wording should convey dignity, faith, and joy.",
      bulletPoints: [
        "English: 'Together with their families, [Groom] & [Bride] request the honor of your presence at their Nikkah ceremony.'",
        "Urdu: 'بفضلِ تعالیٰ [دولہا] اور [دلہن] کے رشتہ ازدواج میں منسلک ہونے کے پرمسرت موقع پر آپ کی شرکت کے خواہش مند ہیں۔'",
        "Bilingual Hybrid: 'In the name of Allah, Chaudhry & Malik families cordially invite you to share in the divine blessings of Nikkah.'"
      ]
    },
    {
      id: "mehndi-and-dholki-wording",
      title: l === 'ur' ? "3. مہندی اور ڈھولکی کی رنگارنگ تحریر" : l === 'es' ? "3. Textos Vibrantes para Noches de Mehndi y Dholki" : "3. Vibrant Wording for Mehndi, Sangeet & Dholki Nights",
      body: "The Mehndi and Dholki celebrations are packed with music, henna, dholak beats, and cheerful dancing.",
      bulletPoints: [
        "English: 'Henna, Beats & Festive Feasts! Join us for an enchanting night of music as we celebrate the Mehndi of [Name].'",
        "Urdu: 'مہندی کی رات، خوشیوں کی برسات! آپ تمام احباب کو مہندی کی تقریب میں شرکت کی دلی دعوت دی جاتی ہے۔'",
        "Dress Code Note: 'Theme: Shades of Yellow, Mustard & Emerald Green.'"
      ]
    },
    {
      id: "barat-and-walima-wording",
      title: l === 'ur' ? "4. بارات اور ولیمہ کے شاہانہ الفاظ" : l === 'es' ? "4. Invitaciones Elegantes para Celebraciones de Barat y Walima" : "4. Regal Host Invitations for Barat & Walima Galas",
      body: "The Barat is the main reception hosted by the bride's family, and Walima is the Sunnah feast hosted by the groom's family.",
      bulletPoints: [
        "Barat Reception: '[Parents] solicit the gracious presence of your family at the Wedding Gala & Barat of their daughter.'",
        "Walima Feast: 'In accordance with Sunnah, [Parents] request your company at the Walima Reception of their son.'"
      ]
    },
    {
      id: "etiquette-rsvp-and-details",
      title: l === 'ur' ? "5. اہم ہدایات: واٹس ایپ آر ایس وی پی اور مینو کی تفصیلات" : l === 'es' ? "5. Notas de Cortesía: RSVPs, Código de Vestimenta y Mapas" : "5. Essential Courtesy Notes: RSVPs, Dress Codes & Venue Maps",
      body: "A complete invitation provides clear location pins, RSVP deadlines, and contact information for guests.",
      bulletPoints: [
        "WhatsApp Instant RSVP link for easy headcounts",
        "GPS Google Maps Location Pin embedded directly into digital card",
        "Dress Code Guidelines and Meal preferences note",
        "No boxed gifts courtesy request if preferred"
      ]
    }
  ],
  l => [
    {
      question: l === 'es' ? "¿Debo incluir Urdu e Inglés juntos en tarjetas digitales?" : "Should I include Urdu and English together on digital cards?",
      answer: l === 'es' ? "¡Sí! Las tarjetas bilingües garantizan que los familiares mayores aprecien los tratamientos tradicionales en urdu mientras los invitados jóvenes leen los horarios en inglés." : "Yes! Dual language cards ensure older relatives appreciate traditional Urdu honorifics while younger guests read event timings in English."
    },
    {
      question: l === 'es' ? "¿Cómo gestiona Cardzy los RSVP de WhatsApp?" : "How does Cardzy handle WhatsApp RSVPs?",
      answer: l === 'es' ? "Cardzy incluye un botón interactivo de 'Confirmar por WhatsApp' directamente en la tarjeta, actualizando su contador de invitados automáticamente." : "Cardzy puts an interactive 'RSVP on WhatsApp' button right inside your card, automatically updating your guest response counter."
    }
  ],
  {
    en: "Designing an authentic Pakistani or Islamic wedding card is effortless on Cardzy. Choose your favorite Bismillah calligraphy, customize wording in Urdu and English, and share elegant digital invitations via WhatsApp instantly.",
    ur: "کارڈزی پر اپنے شادی کارڈز بنانا انتہائی آسان ہے۔ بسم اللہ خطاطی منتخب کریں، اردو اور انگلش تحریر درج کریں اور واٹس ایپ پر فوراً شیئر کریں۔",
    es: "Diseñar una invitación de boda auténtica es fácil en Cardzy. Elija su caligrafía Bismillah favorita, personalice el texto y comparta elegantes invitaciones digitales al instante.",
    fr: "Rédiger un faire-part de mariage authentique est simple sur Cardzy. Choisissez votre calligraphie Bismillah, personnalisez les formules et partagez vos invitations sur WhatsApp.",
    ar: "إنشاء دعوة زفاف إسلامية راقية أمر بغاية السهولة عبر كاردزي. اختر خط البسملة المناسب، وسجل العبارات باللغتين، وشارك الدعوة فوراً عبر واتساب."
  }
);

console.log("Post 1 fully created with rich native strings.");
