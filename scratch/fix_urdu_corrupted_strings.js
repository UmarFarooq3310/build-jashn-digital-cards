const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../lib/blog/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const lines = content.split('\n');
const fixedLines = lines.map(line => {
  if (line.includes('Urdu Poetic Invocation:')) {
    return '            \'Urdu Poetic Invocation: "بفضلِ تعالیٰ، ہم اپنی بیٹی/بیٹے کی شادی مبارک کے اس پرمسرت موقع پر آپ کو شرکت کی دلی دعوت دیتے ہیں۔" (By the grace of Almighty Allah, we extend our heartfelt invitation to the wedding of our daughter/son).\',';
  }
  if (line.includes('Urdu Template 1:')) {
    return '            \'Urdu Template 1: "بفضلِ تعالیٰ [دولہا کا نام] اور [دلہن کا نام] کے رشتہ ازدواج میں منسلک ہونے کی مسرت میں آپ کی شرکت کے خواہش مند ہیں۔"\',';
  }
  if (line.includes('Urdu Festive Template:')) {
    return '            \'Urdu Festive Template: "مہندی کی رات، خوشیوں کی برسات! آپ تمام احباب کو مہندی اور ڈھولکی کی تقریب میں شرکت کی دلی دعوت دی جاتی ہے۔"\',';
  }
  if (line.includes('Urdu Blessing:')) {
    return '            \'Urdu Blessing: "اللہ تعالیٰ اس نئے جوڑے کو خوشیوں، محبت اور برکتوں سے نوازے اور ان کی زندگی میں سدا بہار خوشیاں لائے۔"\',';
  }
  return line;
});

fs.writeFileSync(dataPath, fixedLines.join('\n'), 'utf8');
console.log("Cleaned up all corrupted Urdu strings successfully.");
