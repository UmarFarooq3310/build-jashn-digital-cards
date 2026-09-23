const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

file = file.replace(
  "const targetWidth = Math.min(720, naturalWidth) // HD Quality",
  "const targetWidth = Math.min(480, naturalWidth) // Safe for 10s GIF on mobile"
);

file = file.replace(
  "const totalFrames = 50",
  "const totalFrames = 120 // 10 seconds at 12 fps to prevent mobile crashes"
);

file = file.replace(
  "interval: 0.05, // 20fps",
  "interval: 0.083, // ~12fps (10 seconds total)"
);

file = file.replace(
  "const zoom = 1 + (frame / totalFrames) * 0.04",
  "const zoom = 1 + (frame / totalFrames) * 0.08 // More zoom over 10s"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
