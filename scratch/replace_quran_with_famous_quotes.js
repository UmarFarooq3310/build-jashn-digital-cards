const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '../lib/blog/data.ts');
const targetDir = path.join(__dirname, '../lib/blog/translations');

// Replacement mappings for data.ts
function updateBlogDataFile() {
  let content = fs.readFileSync(blogDataPath, 'utf8');

  // Replace subtitle and meta descriptions mentioning Quranic verses
  content = content.replace(/Quranic verses/g, "inspiring quotes by celebrated authors");
  content = content.replace(/Quranic quotes/g, "inspirational quotes");
  content = content.replace(/Quranic blessings/g, "heartfelt quotes and blessings");
  content = content.replace(/Quranic verses and RSVP etiquette/g, "famous quotes by Rumi, Gibran, and RSVP etiquette");
  content = content.replace(/versículos del Corán/g, "citas de autores célebres como Rumi y Gibran");
  content = content.replace(/versets du Coran/g, "citations de célèbres auteurs comme Rumi et Gibran");
  content = content.replace(/آيات قرآنية/g, "أقوال واقتباسات ملهمة لكبار الشعراء والحكماء");
  content = content.replace(/قرآنی آیات/g, "رومی اور خلیل جبران کے خوبصورت اقوال");

  // Replace Section 1 Title and Body in post1 inside data.ts
  content = content.replace(
    /The Sacred Opening: Bismillah Calligraphy & Quranic Blessings/g,
    "The Timeless Opening: Elegant Calligraphy & Celebrated Quotes"
  );

  content = content.replace(
    /bismillah-calligraphy-and-quranic-blessings/g,
    "bismillah-calligraphy-and-celebrated-quotes"
  );

  // Replace Quran verses with famous quotes in data.ts
  content = content.replace(
    /'Quran 78:8 \(Surah An-Naba\)[^']*'/g,
    '\'Rumi: "Love is the bridge between you and everything."\''
  );
  content = content.replace(
    /'Quran 30:21 \(Surah Ar-Rum\)[^']*'/g,
    '\'Kahlil Gibran: "Let there be spaces in your togetherness, and let the winds of the heavens dance between you."\''
  );
  content = content.replace(
    /'Quran 25:74 \(Surah Al-Furqan\)[^']*'/g,
    '\'Maya Angelou: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope."\''
  );

  fs.writeFileSync(blogDataPath, content, 'utf8');
  console.log("Successfully updated lib/blog/data.ts with famous people quotes.");
}

// Replacement mappings for translation post files
function updateTranslationFiles() {
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
    const filePath = path.join(targetDir, `post${fileIdx}.ts`);
    if (!fs.existsSync(filePath)) return;

    let text = fs.readFileSync(filePath, 'utf8');

    // General string replacements
    text = text.replace(/Quranic verses/g, "celebrated quotes by Rumi & Kahlil Gibran");
    text = text.replace(/Quranic blessings/g, "inspirational sayings by Maya Angelou & Rumi");
    text = text.replace(/Quran 78:8:[^"]*"/g, 'Rumi: "Love is the bridge between you and everything."');
    text = text.replace(/Quran 30:21:[^"]*"/g, 'Kahlil Gibran: "Let there be spaces in your togetherness, and let the winds of the heavens dance between you."');
    text = text.replace(/Quran 25:74:[^"]*"/g, 'Maya Angelou: "Love recognizes no barriers, it leaps fences to arrive full of hope."');

    // Multilingual replacements for Quran terms
    text = text.replace(/versículos del Corán/g, "citas inspiradoras de Rumi y Kahlil Gibran");
    text = text.replace(/versets du Coran/g, "citations célèbres de Rumi et Kahlil Gibran");
    text = text.replace(/الآيات القرآنية/g, "أقوال واقتباسات ملهمة لرومي وخليل جبران");
    text = text.replace(/آيات قرآنية/g, "أقوال ملهمة لرومي وخليل جبران");
    text = text.replace(/قرآنی آیات/g, "رومی اور خلیل جبران کے سدا بہار اقوال");
    text = text.replace(/câu kinh Coran/g, "trích dẫn truyền cảm hứng của Rumi & Kahlil Gibran");
    text = text.replace(/versi del Corano/g, "citazioni famose di Rumi e Kahlil Gibran");
    text = text.replace(/Koransversen/g, "berühmte Zitate von Rumi und Kahlil Gibran");
    text = text.replace(/кораническими стихами/g, "вдохновляющими цитатами Руми и Халиля Джебрана");
    text = text.replace(/Ayet-i Kerimeler/g, "Rumi ve Halil Cibran'dan ilham verici sözler");
    text = text.replace(/aya za Qur'ani/g, "nukuu za Rumi na Kahlil Gibran");
    text = text.replace(/コーランの聖句/g, "ルミやハリール・ジ布朗による名言");
    text = text.replace(/코란 구절/g, "루미와 칼릴 지브란의 명언");
    text = text.replace(/古兰经祝福语/g, "鲁米与纪伯伦的名人名言");
    text = text.replace(/古兰经圣句/g, "鲁米与纪伯伦的经典名言");
    text = text.replace(/कुरुआन की आयतों/g, "रूमी और खलील जिब्रान के प्रेरणादायक विचारों");
    text = text.replace(/کؤرآن کی آیات/g, "رومی اور خلیل جبران کے سدا بہار اقوال");

    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`Updated post${fileIdx}.ts - replaced Quran references with famous quotes.`);
  });
}

updateBlogDataFile();
updateTranslationFiles();
