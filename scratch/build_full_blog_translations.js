const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 18 Languages list
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

console.log("Building translations generator script...");
