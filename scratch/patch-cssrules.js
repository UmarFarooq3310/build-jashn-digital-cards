const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const hack = `      const originalCssRules = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
      if (originalCssRules) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
          get() {
            try {
              return originalCssRules.get!.call(this)
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
  "const el = captureRef.current",
  "const el = captureRef.current\n" + hack
);

file = file.replace(
  "const img = new Image()",
  restoreHack + "\n\n      const img = new Image()"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
