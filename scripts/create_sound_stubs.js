const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '../public/sounds');

// A minimal valid silent 1-second MP3 base64 string
const SILENT_MP3_BASE64 = 
  '//uQxAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kMQwAAAAAAYAAQAAAA==';

const soundFiles = [
  'dholki.mp3',
  'islamic.mp3',
  'festive.mp3',
  'click.mp3',
  'somber.mp3'
];

function createStubs() {
  if (!fs.existsSync(SOUNDS_DIR)) {
    fs.mkdirSync(SOUNDS_DIR, { recursive: true });
    console.log('Created directory:', SOUNDS_DIR);
  }

  const buffer = Buffer.from(SILENT_MP3_BASE64, 'base64');

  soundFiles.forEach(file => {
    const filePath = path.join(SOUNDS_DIR, file);
    fs.writeFileSync(filePath, buffer);
    console.log('Created sound stub:', filePath);
  });
}

createStubs();
