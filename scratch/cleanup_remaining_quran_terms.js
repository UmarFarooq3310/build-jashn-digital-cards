const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../lib/blog/data.ts');
const post1Path = path.join(__dirname, '../lib/blog/translations/post1.ts');

// Cleanup data.ts
let dataContent = fs.readFileSync(dataPath, 'utf8');
dataContent = dataContent.replace(
  /Following the Bismillah, it is traditional to feature a Quranic verse that reflects the divine wisdom of marriage and partnership\. Here are the most beloved verses used in South Asian wedding invitations:/g,
  'Following the opening, it is popular to feature celebrated quotes from timeless poets and leaders that reflect the beauty of love, marriage, and partnership. Here are iconic quotes frequently featured in elegant wedding invitations:'
);
fs.writeFileSync(dataPath, dataContent, 'utf8');

// Cleanup post1.ts
let post1Content = fs.readFileSync(post1Path, 'utf8');
post1Content = post1Content.replace(/Versets du Coran et étiquette/g, "Citations célèbres de Rumi & Gibran et étiquette");
post1Content = post1Content.replace(/Sacred Opening: Bismillah Calligraphy & Quranic Blessings/g, "Timeless Opening: Calligraphy & Celebrated Quotes by Rumi & Gibran");
post1Content = post1Content.replace(/and verses like Surah An-Naba \(78:8\) 'And We created you in pairs'\./g, 'and timeless sayings by celebrated poets like Rumi: "Love is the bridge between you and everything."');
fs.writeFileSync(post1Path, post1Content, 'utf8');

console.log("Cleanup complete!");
