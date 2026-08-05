const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

function savePost(slug, fileIdx, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Saved post${fileIdx}.ts`);
}

// Map of categories translated per language
const CAT_MAP = {
  "Wedding & Nikkah": {
    en: "Wedding & Nikkah", ur: "شادیاں اور نکاح", es: "Bodas y Nikkah", fr: "Mariage & Nikkah",
    ar: "الزفاف والنكاح", hi: "शादी और निकाह", zh: "婚礼与订婚", pt: "Casamento e Nikkah",
    ru: "Свадьба и Никах", de: "Hochzeit & Nikkah", ja: "結婚式＆Nikkah", ko: "결혼식 & 니카",
    it: "Matrimonio e Nikkah", tr: "Düğün ve Nikah", id: "Pernikahan & Nikkah", bn: "বিবাহ ও নিকাহ",
    vi: "Đám Cưới & Nikkah", sw: "Harusi na Nikkah"
  },
  "Event Planning": {
    en: "Event Planning", ur: "تقاریب کی گائیڈز", es: "Planificación de Eventos", fr: "Organisation d'Événements",
    ar: "تخطيط المناسبات", hi: "इवेंट प्लानिंग", zh: "活动策划", pt: "Planeamento de Eventos",
    ru: "Организация событий", de: "Event-Planung", ja: "イベント企画", ko: "이벤트 기획",
    it: "Pianificazione Eventi", tr: "Etkinlik Planlama", id: "Perencanaan Acara", bn: "অনুষ্ঠান পরিকল্পনা",
    vi: "Lên Kế Hoạch Sự Kiện", sw: "Mipango ya Sherehe"
  },
  "Eid & Holidays": {
    en: "Eid & Holidays", ur: "عید اور تہوار", es: "Eid y Festividades", fr: "Aïd & Fêtes",
    ar: "العيد والمناسبات", hi: "ईद और त्योहार", zh: "开斋节与节日", pt: "Eid e Feriados",
    ru: "Эйд и Праздники", de: "Eid & Feiertage", ja: "Eid＆祝日", ko: "이드 & 휴일",
    it: "Eid e Festività", tr: "Bayram ve Tatiller", id: "Idul Fitri & Liburan", bn: "ঈদ ও উৎসব",
    vi: "Eid & Lễ Hội", sw: "Eid na Sikukuu"
  },
  "Business & vCards": {
    en: "Business & vCards", ur: "بزنس اور ویزٹنگ کارڈز", es: "Negocios y Tarjetas Digitales", fr: "Entreprise & Cartes vCard",
    ar: "الأعمال وبطاقات VCard", hi: "बिजनेस और डिजिटल कार्ड", zh: "商务与数字名片", pt: "Negócios e vCards",
    ru: "Бизнес и Визитки", de: "Business & Visitenkarten", ja: "ビジネス＆デジタル名刺", ko: "비즈니스 & 명함",
    it: "Business e vCard", tr: "İş ve Dijital Kartvizit", id: "Bisnis & vCard", bn: "বিজনেস ও ডিজিটাল কার্ড",
    vi: "Doanh Nghiệp & Danh Thiếp", sw: "Biashara na vCard"
  }
};

console.log("Translation helper initialized.");
