const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

function writePostFile(slug, dataObj, contentObj, fileIndex) {
  const fileContent = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIndex}_SLUG = "${slug}";

export const POST_${fileIndex}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataObj, null, 2)};

export const POST_${fileIndex}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentObj, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIndex}.ts`), fileContent, 'utf8');
  console.log(`Generated post${fileIndex}.ts for slug: ${slug}`);
}

const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// POST 1
const p1_slug = 'complete-guide-to-pakistani-wedding-invitation-wording-urdu-english';
const p1_data = {};
const p1_content = {};

LANGS.forEach(l => {
  p1_data[l] = {
    title: l === 'ur' ? "پاکستانی شادی کارڈ تحریر گائیڈ (اردو اور انگریزی الفاظ)"
         : l === 'ar' ? "دليل صيغ دعوات الزفاف الباكستانية والإسلامية (أردو وإنجليزي)"
         : l === 'es' ? "Guía Completa de Textos para Invitaciones de Boda (Urdu e Inglés)"
         : l === 'fr' ? "Guide Complet de Rédaction des Invitations de Mariage (Ourdou & Anglais)"
         : l === 'hi' ? "पाकिस्तानी शादी कार्ड आमंत्रण पाठ गाइड (उर्दू और अंग्रेजी)"
         : l === 'zh' ? "婚礼请柬措辞与文案完整指南（乌尔都语与英语）"
         : l === 'pt' ? "Guia Completo de Texto para Convites de Casamento (Urdu e Inglês)"
         : l === 'ru' ? "Полное руководство по текстам свадебных приглашений (Урду и Английский)"
         : l === 'de' ? "Vollständiger Leitfaden für Hochzeitseinladungstexte (Urdu & Englisch)"
         : l === 'ja' ? "結婚式招待状の文面と例文完全ガイド（ウルドゥー語＆英語）"
         : l === 'ko' ? "결혼식 초대장 문구 작성 완벽 가이드 (우르두어 및 영어)"
         : l === 'it' ? "Guida Completa ai Testi per Inviti di Nozze (Urdu e Inglese)"
         : l === 'tr' ? "Düğün Davetiyesi Yazım ve Metin Rehberi (Urduca ve İngilizce)"
         : l === 'id' ? "Panduan Lengkap Teks Undangan Pernikahan (Bahasa Urdu & Inggris)"
         : l === 'bn' ? "পাকিস্তানি ও ইসলামিক বিয়ের নিমন্ত্রণপত্রের লেখা গাইড (উর্দু ও ইংরেজি)"
         : l === 'vi' ? "Hướng Dẫn Viết Lời Mời Đám Cưới Hồi Giáo & Pakistan (Tiếng Urdu & Anh)"
         : l === 'sw' ? "Mwongozo Kamilifu wa Maneno ya Kadi za Harusi za Kiislamu (Kiuswahili & Kiingereza)"
         : "The Complete Guide to Pakistani & Islamic Wedding Invitation Wording (Urdu & English Examples)",
    subtitle: l === 'ur' ? "نکاح، مہندی، بارات اور ولیمہ کے لیے روایتی اور جدید ترین اردو اور انگلش الفاظ و دعائیں"
             : "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.",
    category: "Wedding & Nikkah",
    seoTitle: l === 'ur' ? "پاکستانی شادی اور نکاح کارڈ تحریر گائیڈ — کارڈزی" : "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)",
    metaDescription: l === 'ur' ? "نکاح، مہندی، بارات اور ولیمہ کارڈز کے لیے بہترین اردو اور انگریزی تحریر، قرآنی آیات اور دعائیں۔ کارڈزی پر خوبصورت ڈیجیٹل کارڈز دیکھیں۔" : "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette."
  };

  p1_content[l] = {
    intro: l === 'ur'
      ? "پاکستان اور دنیا بھر میں تمام برادریوں کے لیے شادیاں ایک انتہائی مقدس اور پرمسرت موقع ہیں۔ شادی کا کارڈ اس خوبصورت سفر کے آغاز کا باضابطہ پیغام ہوتا ہے۔ کارڈزی پر آپ اپنے کارڈز میں اردو خطاطی، قرآنی دعاؤں اور انگلش ٹیکسٹ کے ساتھ خوبصورت اینیمیٹڈ ڈیزائن بنا سکتے ہیں۔"
      : "Weddings in South Asian and Islamic communities worldwide are sacred, grand celebrations. The wedding invitation card sets the tone for the entire event, conveying warmth, spiritual blessings, and cultural pride with elegant wording in Urdu and English.",
    sections: [
      {
        id: "significance-of-islamic-opening",
        title: l === 'ur' ? "1. بسم اللہ خطاطی اور قرآنی آیات کا بابرکت آغاز" : "1. Sacred Opening: Bismillah Calligraphy & Quranic Blessings",
        body: "Every Islamic wedding invitation begins with the sacred invocation of Almighty Allah, incorporating elegant Arabic or Urdu Bismillah calligraphy and verses like Surah An-Naba (78:8) 'And We created you in pairs'.",
        bulletPoints: [
          "Quran 78:8: 'And We created you in pairs' / 'وَخَلَقْنَاكُمْ أَزْوَاجًا'",
          "Quran 30:21: 'He put love and mercy between your hearts' / 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً'",
          "Quran 25:74: 'Our Lord! Grant unto us spouses who will be the comfort of our eyes'",
          "Traditional Blessing: May Allah bless this sacred union with happiness and peace."
        ],
        highlight: "Cardzy Digital Cards allow displaying high-resolution gold foil Bismillah calligraphy that shines on mobile screens."
      },
      {
        id: "nikkah-wording-templates",
        title: l === 'ur' ? "2. نکاح کی پروقار تحریر و مثالیں" : "2. Nikkah Ceremony Wording Examples (Formal & Elegant)",
        body: "The Nikkah is the solemn Islamic marriage contract. The wording should convey dignity, faith, and joy.",
        bulletPoints: [
          "English: 'Together with their families, [Groom] & [Bride] request the honor of your presence at their Nikkah ceremony.'",
          "Urdu: 'بفضلِ تعالیٰ [دولہا] اور [دلہن] کے رشتہ ازدواج میں منسلک ہونے کے پرمسرت موقع پر آپ کی شرکت کے خواہش مند ہیں۔'",
          "Bilingual Hybrid: 'In the name of Allah, Chaudhry & Malik families cordially invite you to share in the divine blessings of Nikkah.'"
        ]
      },
      {
        id: "mehndi-and-dholki-wording",
        title: l === 'ur' ? "3. مہندی اور ڈھولکی کی رنگارنگ تحریر" : "3. Vibrant Wording for Mehndi, Sangeet & Dholki Nights",
        body: "The Mehndi and Dholki celebrations are packed with music, henna, dholak beats, and cheerful dancing.",
        bulletPoints: [
          "English: 'Henna, Beats & Festive Feasts! Join us for an enchanting night of music as we celebrate the Mehndi of [Name].'",
          "Urdu: 'مہندی کی رات، خوشیوں کی برسات! آپ تمام احباب کو مہندی کی تقریب میں شرکت کی دلی دعوت دی جاتی ہے۔'",
          "Dress Code Note: 'Theme: Shades of Yellow, Mustard & Emerald Green.'"
        ]
      },
      {
        id: "barat-and-walima-wording",
        title: l === 'ur' ? "4. بارات اور ولیمہ کے شاہانہ الفاظ" : "4. Regal Host Invitations for Barat & Walima Galas",
        body: "The Barat is the main reception hosted by the bride's family, and Walima is the Sunnah feast hosted by the groom's family.",
        bulletPoints: [
          "Barat Reception: '[Parents] solicit the gracious presence of your family at the Wedding Gala & Barat of their daughter.'",
          "Walima Feast: 'In accordance with Sunnah, [Parents] request your company at the Walima Reception of their son.'"
        ]
      },
      {
        id: "etiquette-rsvp-and-details",
        title: l === 'ur' ? "5. اہم ہدایات: واٹس ایپ آر ایس وی پی اور مینو کی تفصیلات" : "5. Essential Courtesy Notes: RSVPs, Dress Codes & Venue Maps",
        body: "A complete invitation provides clear location pins, RSVP deadlines, and contact information for guests.",
        bulletPoints: [
          "WhatsApp Instant RSVP link for easy headcounts",
          "GPS Google Maps Location Pin embedded directly into digital card",
          "Dress Code Guidelines and Meal preferences note",
          "No boxed gifts courtesy request if preferred"
        ]
      }
    ],
    faq: [
      { question: "Should I include Urdu and English together on digital cards?", answer: "Yes! Dual language cards ensure older relatives appreciate traditional Urdu honorifics while younger guests read event timings in English." },
      { question: "How does Cardzy handle WhatsApp RSVPs?", answer: "Cardzy puts an interactive 'RSVP on WhatsApp' button right inside your card, automatically updating your guest response counter." }
    ],
    conclusion: "Designing an authentic Pakistani or Islamic wedding card is effortless on Cardzy. Choose your favorite Bismillah calligraphy, customize wording in Urdu and English, and share elegant digital invitations via WhatsApp instantly."
  };
});

// POST 2
const p2_slug = "digital-vs-paper-wedding-invitations-cost-eco-comparison";
const p2_data = {};
const p2_content = {};

LANGS.forEach(l => {
  p2_data[l] = {
    title: l === 'ur' ? "ڈیجیٹل بنام روایتی کاغذ کے شادی کارڈز: لاگت اور ماحول کا موازنہ" 
         : l === 'ar' ? "بطاقات الزفاف الرقمية مقابل الورقية: مقارنة التكلفة والبيئة"
         : l === 'es' ? "Invitaciones de Boda Digitales vs Papel: Comparativa de Coste y Sostenibilidad"
         : l === 'fr' ? "Faire-Part de Mariage Numériques vs Papier : Comparatif Coût et Écologie"
         : l === 'hi' ? "डिजिटल बनाम पारंपरिक पेपर शादी कार्ड: लागत और पर्यावरण की तुलना"
         : l === 'zh' ? "数字电子婚礼请柬与传统纸质请柬：成本、环保与便捷性对比"
         : l === 'de' ? "Digitale vs. Papier-Hochzeitseinladungen: Kosten & Umwelt im Vergleich"
         : l === 'ja' ? "デジタル結婚式招待状 vs 紙の招待状：コスト・環境・利便性比較"
         : l === 'ko' ? "디지털 vs 종이 청첩장: 비용, 친환경, 편의성 상세 비교"
         : l === 'pt' ? "Convites de Casamento Digitais vs Papel: Comparação de Custos e Sustentabilidade"
         : l === 'ru' ? "Цифровые против бумажных свадебных приглашений: сравнение стоимости и экологии"
         : l === 'it' ? "Partecipazioni di Nozze Digitali vs Carta: Confronto Costi ed Ecologia"
         : l === 'tr' ? "Dijital ve Kağıt Düğün Davetiyeleri: Maliyet ve Çevre Karşılaştırması"
         : l === 'id' ? "Undangan Pernikahan Digital vs Kertas: Perbandingan Biaya & Lingkungan"
         : l === 'bn' ? "ডিজিটাল বনাম কাগজের বিয়ের কার্ড: খরচ ও পরিবেশ বান্ধব তুলনা"
         : l === 'vi' ? "Thiệp Mời Đám Cưới Kỹ Thuật Số vs Thiệp Giấy: So Sánh Chi Phí & Môi Trường"
         : l === 'sw' ? "Kadi za Harusi za Kidijitali dhidi ya Karatasi: Linganisho la Gharama na Mazingira"
         : "Digital vs Paper Wedding Invitations: A Detailed Cost, Eco & Convenience Comparison for 2026",
    subtitle: l === 'ur' ? "کاغذی کارڈز کی پرنٹنگ اور کورئیر اخراجات کے مقابلے میں 3D ڈیجیٹل کارڈز کے فائدے"
             : "Comprehensive financial breakdown, environmental savings, and RSVP management comparison.",
    category: "Event Planning",
    seoTitle: l === 'ur' ? "ڈیجیٹل بمقابلہ کاغذی شادی کارڈ موازنہ — کارڈزی" : "Digital vs Paper Wedding Cards Cost Comparison — Cardzy",
    metaDescription: l === 'ur' ? "شادیاں یادگار بنائیں کم خرچ میں! کارڈزی پر اینیمیٹڈ ڈیجیٹل کارڈز اور کاغذی کارڈز کی لاگت کا تفصیلی جائزہ دیکھیں۔" : "Detailed comparison of digital vs paper wedding invitations covering printing costs, courier fees, RSVP efficiency, and zero paper waste."
  };

  p2_content[l] = {
    intro: l === 'ur'
      ? "آج کے دور میں روایت اور جدید ٹیکنالوجی کے امتزاج نے شادی کے کارڈز کا طریقہ کار بدل دیا ہے۔ کاغذی کارڈز کے بھاری پرنٹنگ اور ڈاک اخراجات کے مقابلے میں اینیمیٹڈ ڈیجیٹل کارڈز وقت اور پیسے کی بچت کرتے ہیں۔"
      : "Planning a wedding involves managing budgets, host protocols, and environmental impact. Modern couples are shifting from traditional paper invitations to luxury digital invitation websites with WhatsApp RSVP tracking.",
    sections: [
      {
        id: "financial-cost-breakdown",
        title: l === 'ur' ? "1. مالی اخراجات کا تفصیلی جائزہ: کاغذ بمقابلہ ڈیجیٹل" : "1. Financial Analysis: The True Cost of Paper vs Digital Cards",
        body: "Traditional paper invitations involve printing, custom foil stamping, envelopes, and postal courier fees, easily running into hundreds of dollars. Cardzy digital cards provide unlimited sharing at a fraction of the cost.",
        bulletPoints: [
          "Paper Cards: $3 - $12 per card including printing and shipping",
          "Digital Invitations on Cardzy: Flat affordable package for unlimited guests",
          "Zero extra cost for last-minute guest additions or updates",
          "Instant delivery via WhatsApp, Email, and Social Media"
        ],
        highlight: "Couples save up to 80% on invitation budgets by choosing luxury digital invitation websites on Cardzy."
      },
      {
        id: "environmental-sustainability",
        title: l === 'ur' ? "2. ماحول دوست پائیداری اور شجرکاری میں حصہ" : "2. Environmental Sustainability & Zero Waste",
        body: "Sending 500 paper invitations consumes trees, water, and generates shipping carbon emissions. Digital invitations produce zero paper waste.",
        bulletPoints: [
          "Saves thousands of paper pages from landfills",
          "Zero carbon emissions from postal delivery trucks",
          "Supports modern eco-friendly green wedding trends",
          "Keeps a digital keepsake accessible forever on smartphones"
        ]
      },
      {
        id: "convenience-and-interactivity",
        title: l === 'ur' ? "3. آن لائن آر ایس وی پی اور جدید سہولیات" : "3. Interactive Convenience & Real-Time Guest Experience",
        body: "Digital invitations include interactive 1-click Google Maps venue navigation, WhatsApp instant RSVP buttons, and calendar sync.",
        bulletPoints: [
          "Embedded Google Maps GPS pins for wedding venues",
          "Automated WhatsApp RSVP response collection",
          "Calendar sync (Google & Apple Calendar integration)",
          "Background festive audio music & 3D animations"
        ]
      },
      {
        id: "comparison-matrix-table",
        title: l === 'ur' ? "4. خلاصہ موازنہ ٹیبل" : "4. Summary Comparison Matrix: Paper vs Digital Cards",
        body: "Key metrics comparison between traditional paper cards and Cardzy digital invitations.",
        bulletPoints: [
          "Delivery speed: 2-3 weeks (Paper) vs Instant (Digital)",
          "RSVP tracking: Manual phone calls vs Automated dashboard",
          "Cost per guest: High vs Virtually Zero",
          "Updates/Edits: Impossible after printing vs Instant live updates"
        ]
      },
      {
        id: "faqs",
        title: l === 'ur' ? "5. اکثر پوچھے گئے سوالات" : "5. Frequently Asked Questions",
        body: "Common questions couples ask when transitioning to digital invitations."
      }
    ],
    faq: [
      { question: "Can elderly family members view digital cards easily?", answer: "Yes! Cardzy invitations open with a single tap on WhatsApp without downloading any app." },
      { question: "Can we print a few paper cards for traditional relatives while using digital for others?", answer: "Absolutely! Many couples use Cardzy digital invitations for 90% of guests while keeping a few physical cards." }
    ],
    conclusion: "Switching to digital invitations saves money, protects the environment, and simplifies guest management with automated WhatsApp RSVPs. Try Cardzy today!"
  };
});

writePostFile(p1_slug, p1_data, p1_content, 1);
writePostFile(p2_slug, p2_data, p2_content, 2);

console.log("Posts 1 and 2 regenerated.");
