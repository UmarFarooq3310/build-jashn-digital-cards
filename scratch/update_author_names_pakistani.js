const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../lib/blog/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Replacements for author names in data.ts
content = content.replace(/name:\s*'Zara Malik'/g, "name: 'Umar Farooq'");
content = content.replace(/name:\s*'Ali Raza'/g, "name: 'Kainat'");
content = content.replace(/name:\s*'Hamza Farooq'/g, "name: 'Zayn Ali'");
content = content.replace(/name:\s*'Elena Rostova'/g, "name: 'Hasnain'");
content = content.replace(/name:\s*'Marcus Vance'/g, "name: 'Ahmed'");
content = content.replace(/name:\s*'David Sterling'/g, "name: 'Umar Farooq'");

fs.writeFileSync(dataPath, content, 'utf8');
console.log("Updated all author names in lib/blog/data.ts to authentic Pakistani names.");
