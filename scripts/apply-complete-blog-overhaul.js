const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// 1. Read existing data.ts
const dataFilePath = path.join(__dirname, '..', 'lib', 'blog', 'data.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');

const startIdx = dataContent.indexOf('export const BLOG_POSTS: BlogPost[] = [');
const endIdx = dataContent.indexOf('export function getBlogPost');

const blogPostsRaw = dataContent.slice(startIdx, endIdx);
const transpiled = ts.transpile('const ' + blogPostsRaw.replace('export const ', ''));
const getPosts = new Function(transpiled + '; return BLOG_POSTS;');
const posts = getPosts();

console.log(`Loaded ${posts.length} posts from data.ts`);

// 2. Load expanded and new posts JSON
const newAndExpanded = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_and_expanded_posts.json'), 'utf8'));

// 3. Natural metadata
const { NATURAL_METADATA } = require('./natural-blog-data.js');

// 4. Update existing posts
const postMap = new Map();
posts.forEach(p => postMap.set(p.slug, p));

// Fix Post 4 typos
const post4 = postMap.get('smart-digital-business-cards-for-pakistani-entrepreneurs-and-executives');
if (post4) {
  post4.content.intro = "In the modern business landscape of Pakistan — from tech startups in National Incubation Centers to corporate headquarters in Karachi, Lahore, and Islamabad — first impressions dictate deal closures and strategic partnerships. For decades, the standard tool for exchanging contact information was the paper visiting card. However, paper cards suffer from major flaws: they are easily lost, take up wallet space, cannot be updated when your phone number or title changes, and require constant reprinting. In 2026, forward-thinking CEOs, sales directors, freelancers, and entrepreneurs are switching to Smart Digital Business Cards (vCards). In this comprehensive guide, we explore how digital business cards work, their ROI benefits, and how to create your executive digital contact card on Cardzy.";
}

// Fix Post 5 typos
const post5 = postMap.get('how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly');
if (post5) {
  const s3 = post5.content.sections.find(s => s.id === 'step-by-step-guest-management-plan');
  if (s3 && s3.bulletPoints) {
    s3.bulletPoints = [
      'Phase 1: Segment Your Guest List (6 Weeks Out): Create 3 tiers in a digital spreadsheet: Tier A (Immediate Family), Tier B (Close Friends & Relatives), Tier C (Colleagues & Distant Acquaintances).',
      'Phase 2: Send Cardzy Digital Links (4 Weeks Out): Broadcast your interactive card link via WhatsApp to Tier A and B guests with an RSVP deadline of 2 weeks prior to event.',
      'Phase 3: Review Headcounts & Fill Remaining Capacity (2 Weeks Out): Check confirmed headcounts. If extra capacity is available at the hall, extend invitations to Tier C guests.',
      'Phase 4: Finalize Catering Order (1 Week Out): Hand exact confirmed headcount numbers to your caterer and marquee management.'
    ];
  }
}

// Apply natural metadata
for (const [slug, meta] of Object.entries(NATURAL_METADATA)) {
  const p = postMap.get(slug);
  if (p) {
    p.subtitle = meta.subtitle;
    p.metaDescription = meta.metaDescription;
  }
}

// Apply expansions for existing posts
for (const [slug, updated] of Object.entries(newAndExpanded)) {
  if (postMap.has(slug)) {
    const p = postMap.get(slug);
    if (updated.readTime) p.readTime = updated.readTime;
    if (updated.wordCount) p.wordCount = updated.wordCount;
    if (updated.subtitle) p.subtitle = updated.subtitle;
    if (updated.metaDescription) p.metaDescription = updated.metaDescription;
    if (updated.content) p.content = updated.content;
    console.log(`Expanded existing post: [${slug}] with ${p.content.sections.length} sections`);
  }
}

// Append 4 brand-new posts
const NEW_SLUGS = [
  "pakistani-and-islamic-wedding-timeline-etiquette-guide",
  "custom-gaming-victory-cards-pubg-free-fire-esports-hud",
  "housewarming-dawat-and-roza-kushai-digital-invitation-guide",
  "nfc-metal-cards-vs-smart-digital-vcards-comparison-2026"
];

NEW_SLUGS.forEach(slug => {
  if (!postMap.has(slug) && newAndExpanded[slug]) {
    posts.push(newAndExpanded[slug]);
    postMap.set(slug, newAndExpanded[slug]);
    console.log(`Appended new post: [${slug}]`);
  }
});

console.log(`Total posts after overhaul: ${posts.length}`);

// 5. Serialize posts into clean TypeScript
const header = dataContent.slice(0, startIdx);
const footer = dataContent.slice(endIdx);

const serializedPosts = 'export const BLOG_POSTS: BlogPost[] = ' + JSON.stringify(posts, null, 2) + '\n\n';

const updatedDataFileContent = header + serializedPosts + footer;
fs.writeFileSync(dataFilePath, updatedDataFileContent, 'utf8');
console.log(`Successfully updated lib/blog/data.ts with ${posts.length} posts!`);