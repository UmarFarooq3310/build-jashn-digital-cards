const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const hack = `      const originalCssRules = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
      if (originalCssRules) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
          get() {
            try {
              return originalCssRules.get.call(this)
            } catch (e) {
              return []
            }
          }
        })
      }`;

const restoreHack = `      if (originalCssRules) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', originalCssRules)
      }`;

file = file.replace(
  "const { toJpeg } = await import('html-to-image')",
  "const { toJpeg } = await import('html-to-image')\n" + hack
);

file = file.replace(
  "// Restore original styles",
  restoreHack + "\n      // Restore original styles"
);

file = file.replace(
  "const { toPng } = await import('html-to-image')",
  "const { toPng } = await import('html-to-image')\n" + hack
);

file = file.replace(
  "const link = document.createElement('a')",
  restoreHack + "\n      const link = document.createElement('a')"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
