const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// 18 Languages
const LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw'];

// Helper to save a post
function savePost(fileIdx, slug, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Generated authentic 18-language post${fileIdx}.ts`);
}

// Global Category Mapping
const CATEGORIES = {
  wedding: {
    en: 'Wedding & Nikkah', ur: 'شادی و نکاح', ar: 'الزفاف والنكاح', es: 'Boda y Nikkah', fr: 'Mariage & Nikkah',
    hi: 'शादी और निकाह', zh: '婚礼与仪式', pt: 'Casamento e Nikkah', ru: 'Свадьба и Никах', de: 'Hochzeit & Nikkah',
    ja: '結婚式＆Nikkah', ko: '웨딩 & 니카', it: 'Matrimonio & Nikkah', tr: 'Düğün ve Nikah', id: 'Pernikahan & Akad',
    bn: 'বিয়ে ও নিকাহ', vi: 'Đám Cưới & Hôn Lễ', sw: 'Harusi na Nikkah'
  },
  eid: {
    en: 'Eid & Holidays', ur: 'عید اور تعطیلات', ar: 'العيد والمناسبات الإسلامية', es: 'Eid y Festividades', fr: 'Aïd & Fêtes',
    hi: 'ईद और त्योहार', zh: '开斋节与节日', pt: 'Eid e Feriados', ru: 'Эйд и Праздники', de: 'Eid & Feiertage',
    ja: 'Eid＆祝日', ko: '이드 & 축제', it: 'Eid e Festività', tr: 'Bayram ve Tatiller', id: 'Idul Fitri & Liburan',
    bn: 'ঈদ ও ছুটির দিন', vi: 'Lễ Eid & Ngày Lễ', sw: 'Eid na Sikukuu'
  },
  business: {
    en: 'Business & vCards', ur: 'ڈیجیٹل وزٹنگ کارڈز', ar: 'بطاقات الأعمال الرقمية', es: 'Negocios y vCards', fr: 'Affaires & vCards',
    hi: 'बिजनेस और डिजिटल कार्ड', zh: '商务与数字名片', pt: 'Negócios e vCards', ru: 'Бизнес и vCard', de: 'Business & vCards',
    ja: 'ビジネス＆デジタル名刺', ko: '비즈니스 & vCard', it: 'Business e vCard', tr: 'İş Dünyası ve vCard', id: 'Bisnis & vCard',
    bn: 'ব্যবসা ও ডিজিটাল কার্ড', vi: 'Kinh Doanh & Danh Thiếp', sw: 'Biashara na vCard'
  },
  planning: {
    en: 'Event Planning', ur: 'تقاریب اور آر ایس وی پی', ar: 'تخطيط المناسبات وإدارتها', es: 'Planificación de Eventos', fr: 'Organisation d\'Événements',
    hi: 'इवेंट प्लानिंग व आरएसवीपी', zh: '活动策划与管理', pt: 'Planeamento de Eventos', ru: 'Организация событий', de: 'Event-Planung',
    ja: 'イベント企画・管理', ko: '이벤트 기획 & RSVP', it: 'Pianificazione Eventi', tr: 'Etkinlik Planlama', id: 'Perencanaan Acara',
    bn: 'অনুষ্ঠান পরিকল্পনা', vi: 'Lên Kế Hoạch Sự Kiện', sw: 'Mipango ya Sherehe'
  }
};

console.log('Building all 20 blog posts translations...');
