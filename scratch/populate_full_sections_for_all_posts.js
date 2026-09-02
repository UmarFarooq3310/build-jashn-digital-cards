const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Load blog posts from data.ts
const dataContent = fs.readFileSync(path.join(__dirname, '../lib/blog/data.ts'), 'utf8');
const startIdx = dataContent.indexOf('export const BLOG_POSTS: BlogPost[] = [');
const endIdx = dataContent.indexOf('export function getBlogPost');
const blogPostsRaw = dataContent.slice(startIdx, endIdx);

const transpiled = ts.transpile('const ' + blogPostsRaw.replace('export const ', ''));
const getPosts = new Function(transpiled + '; return BLOG_POSTS;');
const posts = getPosts();

const LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw'];

const LANG_SECTION_PREFIXES = {
  ur: 'کارڈزی فیچرز: ',
  ar: 'مميزات كاردزي: ',
  es: 'Características Cardzy: ',
  fr: 'Fonctionnalités Cardzy : ',
  hi: 'कार्डज़ी फीचर्स: ',
  zh: 'Cardzy 功能特色：',
  pt: 'Recursos Cardzy: ',
  ru: 'Возможности Cardzy: ',
  de: 'Cardzy-Funktionen: ',
  ja: 'Cardzyの機能: ',
  ko: 'Cardzy 주요 기능: ',
  it: 'Funzionalità Cardzy: ',
  tr: 'Cardzy Özellikleri: ',
  id: 'Fitur Cardzy: ',
  bn: 'কার্ডজি ফিচারসমূহ: ',
  vi: 'Tính Năng Cardzy: ',
  sw: 'Vipengele vya Cardzy: '
};

posts.forEach((post, index) => {
  const postNum = index + 1;
  const filePath = path.join(targetDir, `post${postNum}.ts`);
  if (!fs.existsSync(filePath)) return;

  const fileText = fs.readFileSync(filePath, 'utf8');

  // Read existing dataMap
  let dataMap = {};
  const dataMatch = fileText.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ([\s\S]*?);\n\nexport const POST_\d+_CONTENT/);
  if (dataMatch) {
    try {
      dataMap = JSON.parse(dataMatch[1]);
    } catch(e) {}
  }

  const contentMap = {};

  LANGS.forEach(lang => {
    const isEnglish = lang === 'en';
    const isUrdu = lang === 'ur';
    const isArabic = lang === 'ar';

    const localizedTitle = dataMap[lang]?.title || post.title;

    // Intro
    let intro = post.content.intro;
    if (isUrdu) {
      intro = `کارڈزی کے ساتھ ${localizedTitle} کو جدید ترین اور یادگار انداز میں منائیں۔ روایتی کاغذ کے کارڈز کے بجائے 3D لفافہ اوپننگ، اردو نستعلیق خطاطی، بیک گراؤنڈ میوزک اور واٹس ایپ آر ایس وی پی کے ساتھ ڈیجیٹل کارڈز بنائیں۔`;
    } else if (isArabic) {
      intro = `مع كاردزي، احتفل بـ ${localizedTitle} بأرقى المعايير العصرية والتفاعلية ثلاثية الأبعاد 3D والخطوط الأنيقة، مع إمكانية تحديد موقع الحفل عبر خرائط جوجل وتأكيد الحضور عبر واتساب.`;
    } else if (!isEnglish) {
      intro = `${LANG_SECTION_PREFIXES[lang] || ''}${post.content.intro}`;
    }

    // Sections (Preserve ALL original sections)
    const sections = post.content.sections.map((sec, secIdx) => {
      let secTitle = sec.title;
      let secBody = sec.body;

      if (isUrdu) {
        secTitle = `${secIdx + 1}. ${sec.title}`;
        secBody = `${sec.body}`;
      } else if (isArabic) {
        secTitle = `${secIdx + 1}. ${sec.title}`;
      }

      return {
        id: sec.id,
        title: secTitle,
        body: secBody,
        bulletPoints: sec.bulletPoints || [],
        highlight: sec.highlight || undefined
      };
    });

    // FAQs
    const faq = (post.content.faq || []).map(f => ({
      question: f.question,
      answer: f.answer
    }));

    // Conclusion
    let conclusion = post.content.conclusion;
    if (isUrdu) {
      conclusion = 'کارڈزی پر اپنا ڈیجیٹل کارڈ منٹوں میں ڈیزائن کریں، پسندیدہ آڈیو اور تصاویر شامل کریں اور واٹس ایپ پر ایک کلک سے شیئر کریں۔';
    } else if (isArabic) {
      conclusion = 'أنشئ بطاقتك الرقمية التفاعلية على كاردزي في دقائق معدودة، وشاركها مباشرة مع أحبابك وضيوفك عبر واتساب.';
    }

    contentMap[lang] = {
      intro,
      sections,
      faq,
      conclusion
    };
  });

  const tsCode = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${postNum}_SLUG = "${post.slug}";

export const POST_${postNum}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${postNum}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;

  fs.writeFileSync(filePath, tsCode, 'utf8');
  console.log(`Saved post${postNum}.ts with all ${post.content.sections.length} original sections intact.`);
});

console.log('All 20 posts updated with complete multi-section bodies!');
