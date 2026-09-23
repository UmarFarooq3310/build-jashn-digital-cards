const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const regex = /const frames = \[\][\s\S]*?console\.log\('Starting gifshot\.\.\.'\)/;

const newCode = `      // Take ONE snapshot to avoid html-to-image hanging
      const dataUrl = await toJpeg(el, {
        cacheBust: true,
        filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
        width: targetWidth,
        height: targetHeight,
        pixelRatio: 1, 
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
      
      // Now simulate a glow effect by drawing the snapshot to a canvas 4 times
      const frames = []
      const img = new Image()
      img.src = dataUrl
      await new Promise(r => { img.onload = r })
      
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      
      const glowOpacities = [0, 0.4, 0.8, 0.4]
      
      for (let i = 0; i < 4; i++) {
        if (!ctx) break
        ctx.clearRect(0, 0, targetWidth, targetHeight)
        
        // Draw base image
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        
        // Add simulated yellow glow overlay to make it look "animated"
        if (glowOpacities[i] > 0) {
          ctx.fillStyle = \`rgba(250, 204, 21, \${glowOpacities[i] * 0.15})\`
          ctx.fillRect(0, 0, targetWidth, targetHeight)
          
          // Add border glow
          ctx.strokeStyle = \`rgba(250, 204, 21, \${glowOpacities[i] * 0.8})\`
          ctx.lineWidth = 10
          ctx.strokeRect(5, 5, targetWidth - 10, targetHeight - 10)
        }
        
        frames.push(canvas.toDataURL('image/jpeg', 0.8))
      }
      
      console.log('Starting gifshot...')`;

file = file.replace(regex, newCode);
fs.writeFileSync('components/jashn/share-bar.tsx', file);
