const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

// Add state for progress
file = file.replace(
  "const [gifGenerating, setGifGenerating] = useState(false)",
  "const [gifGenerating, setGifGenerating] = useState(false)\n  const [gifProgress, setGifProgress] = useState(0)"
);

// Add progressCallback to gifshot
file = file.replace(
  "numWorkers: 2,",
  "numWorkers: 2,\n          progressCallback: (captureProgress: number) => setGifProgress(Math.round(captureProgress * 100)),"
);

// Reset progress when starting
file = file.replace(
  "setGifGenerating(true)",
  "setGifGenerating(true)\n    setGifProgress(0)"
);

// Update button UI
file = file.replace(
  "{gifGenerating ? <span className=\"animate-pulse\">GIF...</span> : <><Download className=\"size-4 mr-1.5\" /> GIF</>}",
  "{gifGenerating ? <span className=\"animate-pulse\">{gifProgress > 0 ? \`GIF \${gifProgress}%\` : 'GIF...'}</span> : <><Download className=\"size-4 mr-1.5\" /> GIF</>}"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
