const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');

  // Replace unescaped quotes inside JSON strings
  // Replace Rumi: "..." -> Rumi: '...'
  text = text.replace(/Rumi: \\?"([^"'\\]+)\\?"/g, "Rumi: '$1'");
  text = text.replace(/Kahlil Gibran: \\?"([^"'\\]+)\\?"/g, "Kahlil Gibran: '$1'");
  text = text.replace(/Maya Angelou: \\?"([^"'\\]+)\\?"/g, "Maya Angelou: '$1'");

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Cleaned JSON quotes in post${fileIdx}.ts`);
});
