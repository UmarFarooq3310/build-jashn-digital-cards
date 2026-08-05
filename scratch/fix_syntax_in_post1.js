const fs = require('fs');
const path = require('path');

const post1Path = path.join(__dirname, '../lib/blog/translations/post1.ts');
let content = fs.readFileSync(post1Path, 'utf8');

content = content.replace(/"Rumi: 'Love is the bridge between you and everything\.',/g, '"Rumi: \'Love is the bridge between you and everything.\'",');
content = content.replace(/"Kahlil Gibran: 'Let there be spaces in your togetherness, and let the winds of the heavens dance between you\.',/g, '"Kahlil Gibran: \'Let there be spaces in your togetherness, and let the winds of the heavens dance between you.\'",');
content = content.replace(/"Maya Angelou: 'Love recognizes no barriers, it leaps fences to arrive full of hope\.',/g, '"Maya Angelou: \'Love recognizes no barriers, it leaps fences to arrive full of hope.\'",');

fs.writeFileSync(post1Path, content, 'utf8');
console.log("Fixed syntax in post1.ts!");
