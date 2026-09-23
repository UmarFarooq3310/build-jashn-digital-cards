const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

file = file.replace(
  "frames.push(canvas.toDataURL('image/jpeg', 0.4)) // Low quality png for faster gif processing\n      }",
  "frames.push(canvas.toDataURL('image/jpeg', 0.4))\n        if (frame % 10 === 0) await new Promise(r => setTimeout(r, 0))\n      }"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
