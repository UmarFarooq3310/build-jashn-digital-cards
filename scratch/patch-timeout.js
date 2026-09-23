const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const hack = `        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000))
        const dataUrl = await Promise.race([
          toJpeg(el, {
            cacheBust: true,
            filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
            width: targetWidth,
            height: targetHeight,
            pixelRatio: 1, // Keep low res for GIF
            quality: 0.7,
            style: {
              transform: \`scale(\${scale})\`,
              transformOrigin: 'top left',
              animation: 'none',
              transition: 'none',
              width: \`\${naturalWidth}px\`,
              height: \`\${naturalHeight}px\`,
              margin: '0',
            },
          }),
          timeoutPromise
        ])`;

// regex replace the old toJpeg call
const regex = /const dataUrl = await toJpeg\(el, \{[\s\S]*?\}\)/;
file = file.replace(regex, hack);

// also make width smaller
file = file.replace('const targetWidth = Math.min(400, naturalWidth)', 'const targetWidth = Math.min(250, naturalWidth)');

fs.writeFileSync('components/jashn/share-bar.tsx', file);
