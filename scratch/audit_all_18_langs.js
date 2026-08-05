const { BLOG_POSTS, getLocalizedPost } = require('../lib/blog/data');

const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

console.log("Starting Full Multilingual Audit for all 10 posts across 18 languages...");

let missingSubtitles = 0;
let missingSeoTitles = 0;
let missingMetaDescs = 0;
let totalChecked = 0;

BLOG_POSTS.forEach(post => {
  LANGS.forEach(lang => {
    totalChecked++;
    const loc = getLocalizedPost(post, lang);

    if (lang !== 'en') {
      if (loc.subtitle === post.subtitle) {
        console.warn(`[WARN] Post ${post.slug} lang ${lang} has English fallback subtitle!`);
        missingSubtitles++;
      }
      if (loc.seoTitle === post.seoTitle) {
        console.warn(`[WARN] Post ${post.slug} lang ${lang} has English fallback seoTitle!`);
        missingSeoTitles++;
      }
      if (loc.metaDescription === post.metaDescription) {
        console.warn(`[WARN] Post ${post.slug} lang ${lang} has English fallback metaDescription!`);
        missingMetaDescs++;
      }
    }
  });
});

console.log(`\nAudit Complete! Total checked: ${totalChecked} post-language pairs.`);
console.log(`Missing/Fallback Subtitles: ${missingSubtitles}`);
console.log(`Missing/Fallback SEO Titles: ${missingSeoTitles}`);
console.log(`Missing/Fallback Meta Descriptions: ${missingMetaDescs}`);

if (missingSubtitles === 0 && missingSeoTitles === 0 && missingMetaDescs === 0) {
  console.log("SUCCESS: 100% Perfect Translation Coverage Across All 18 Languages!");
}
