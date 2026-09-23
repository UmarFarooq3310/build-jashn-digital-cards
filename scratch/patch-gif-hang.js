const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const oldLoop = `      for (let i = 0; i < 4; i++) {
        el.style.boxShadow = glowStates[i]
        // Wait a tiny bit for DOM to apply style (optional, but toJpeg takes time anyway)
        const dataUrl = await toJpeg(el, {
          cacheBust: true,
          filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
          width: targetWidth,
          height: targetHeight,
          pixelRatio: 1, // Keep low res for GIF
          quality: 0.8,
          style: {
            transform: \`scale(\${scale})\`,
            transformOrigin: 'top left',
            animation: 'none',
            transition: 'none',
            width: \`\${naturalWidth}px\`,
            height: \`\${naturalHeight}px\`,
            margin: '0',
          },
        })
        frames.push(dataUrl)
      }`;

const newLoop = `      for (let i = 0; i < 4; i++) {
        el.style.boxShadow = glowStates[i]
        await new Promise(r => setTimeout(r, 150)) // give browser time to breathe and apply styles
        console.log('GIF frame ' + i + ' starting...')
        const dataUrl = await toJpeg(el, {
          cacheBust: true,
          filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
          width: targetWidth,
          height: targetHeight,
          pixelRatio: 1, // Keep low res for GIF
          quality: 0.8,
          style: {
            transform: \`scale(\${scale})\`,
            transformOrigin: 'top left',
            animation: 'none',
            transition: 'none',
            width: \`\${naturalWidth}px\`,
            height: \`\${naturalHeight}px\`,
            margin: '0',
          },
        })
        frames.push(dataUrl)
        console.log('GIF frame ' + i + ' done.')
      }`;

file = file.replace(oldLoop, newLoop);

const oldGifshot = `      // Generate GIF
      gifshot.createGIF({`;
      
const newGifshot = `      console.log('Starting gifshot...')
      // Generate GIF
      gifshot.createGIF({`;

file = file.replace(oldGifshot, newGifshot);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
