const fs = require('fs');
let file = fs.readFileSync('components/adsense-cleaner.tsx', 'utf8');

const hack = `    const origConsoleError = console.error
    console.error = function (...args) {
      if (args[0] && typeof args[0] === 'string' && isAdError(args[0])) {
        return
      }
      origConsoleError.apply(this, args)
    }
`;

file = file.replace(
  "const origOnError = window.onerror",
  hack + "\n    const origOnError = window.onerror"
);

fs.writeFileSync('components/adsense-cleaner.tsx', file);
