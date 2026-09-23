const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const oldRegex = /const mimeType = MediaRecorder\.isTypeSupported[\s\S]*?await recordingPromise/

const newCode = `      // Generate 50 frames (approx 2.5 seconds at 20fps) for the GIF
      const frames = []
      const totalFrames = 50
      
      const sparkles = Array.from({ length: 15 }).map(() => ({
        x: Math.random() * targetWidth,
        y: Math.random() * targetHeight + targetHeight * 0.2,
        radius: Math.random() * 2.5 + 0.5,
        speedY: Math.random() * 2 + 1,
        wobbleSpeed: Math.random() * 0.1,
        wobbleOffset: Math.random() * Math.PI * 2
      }))
      
      for (let frame = 0; frame < totalFrames; frame++) {
        ctx.clearRect(0, 0, targetWidth, targetHeight)
        
        // Zoom
        const zoom = 1 + (frame / totalFrames) * 0.04
        ctx.save()
        ctx.translate(targetWidth / 2, targetHeight / 2)
        ctx.scale(zoom, zoom)
        ctx.translate(-targetWidth / 2, -targetHeight / 2)
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        ctx.restore()
        
        // Light Ray
        const progress = frame / totalFrames
        const rayX = (progress * (targetWidth * 2.5)) - targetWidth
        
        ctx.save()
        ctx.globalCompositeOperation = 'overlay'
        const gradient = ctx.createLinearGradient(rayX, 0, rayX + 150, targetHeight)
        gradient.addColorStop(0, 'rgba(255,255,255,0)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.4)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.transform(1, 0, -0.4, 1, 0, 0)
        ctx.fillRect(rayX, 0, 250, targetHeight)
        ctx.restore()
        
        // Sparkles
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        sparkles.forEach(s => {
          s.y -= s.speedY
          const x = s.x + Math.sin(frame * s.wobbleSpeed + s.wobbleOffset) * 10
          ctx.beginPath()
          ctx.arc(x, s.y, s.radius, 0, Math.PI * 2)
          ctx.fillStyle = \`rgba(255, 235, 133, \${Math.max(0, 1 - s.y/targetHeight)})\`
          ctx.fill()
        })
        ctx.restore()
        
        frames.push(canvas.toDataURL('image/png', 0.5)) // Low quality png for faster gif processing
      }
      
      const recordingPromise = new Promise<void>((resolve, reject) => {
        // @ts-ignore
        gifshot.createGIF({
          images: frames,
          gifWidth: targetWidth,
          gifHeight: targetHeight,
          interval: 0.05, // 20fps
          numWorkers: 2,
          sampleInterval: 10
        }, function(obj: any) {
          if (!obj.error) {
            const link = document.createElement('a')
            link.download = \`\${fileName}.gif\`
            link.href = obj.image
            link.click()
            resolve()
          } else {
            reject(new Error('GIF generation failed'))
          }
        })
      })
      
      await recordingPromise`;

file = file.replace(oldRegex, newCode);

file = file.replace(
  "Making Video…",
  "Making GIF…"
);

file = file.replace(
  "Share as Video",
  "Share as GIF"
);

file = file.replace(
  "{gifGenerating ? <span className=\"animate-pulse\">Video...</span> : <><Download className=\"size-4 mr-1.5\" /> Video</>}",
  "{gifGenerating ? <span className=\"animate-pulse\">GIF...</span> : <><Download className=\"size-4 mr-1.5\" /> GIF</>}"
);

// We need to re-import gifshot if we removed it!
if (!file.includes("import gifshot")) {
  file = file.replace(
    "import { useLang } from '@/lib/lang/context'",
    "import { useLang } from '@/lib/lang/context'\n// @ts-ignore\nimport gifshot from 'gifshot'"
  );
}

fs.writeFileSync('components/jashn/share-bar.tsx', file);
