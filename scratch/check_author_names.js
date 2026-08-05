const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../lib/blog/data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

const matches = content.match(/author:\s*\{[\s\S]*?name:\s*'([^']+)'/g);
if (matches) {
  matches.forEach((m, i) => {
    const nameMatch = m.match(/name:\s*'([^']+)'/);
    console.log(`Post ${i + 1}: ${nameMatch ? nameMatch[1] : 'unknown'}`);
  });
}
