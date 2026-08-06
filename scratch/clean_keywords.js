const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../app'));

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match `keywords: [...]` pattern across lines
  const newContent = content.replace(/keywords:\s*\[[\s\S]*?\],?\n?/g, '');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Cleaned keywords in ${path.relative(process.cwd(), filePath)}`);
  }
});
