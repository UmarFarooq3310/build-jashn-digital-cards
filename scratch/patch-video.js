const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const oldRegex = /async function downloadGif\(\) \{[\s\S]*?console\.log\('Starting gifshot\.\.\.'\)[\s\S]*?setGifGenerating\(false\)\n      \}\)\n    \} catch \(e\) \{[\s\S]*?setGifGenerating\(false\)\n    \}\n  \}/;

const newCode = `  async function downloadGif() {
    if (!captureRef?.current) return
    setGifGenerating(true)
    try {
      if (inferredSlug) {
        recordCardShare(inferredType, inferredSlug, 'video')
      }
      const { toPng } = await import('html-to-image')
      const el = captureRef.current
      
      const naturalWidth = el.offsetWidth
      const naturalHeight = el.offsetHeight
      const targetWidth = Math.min(480, naturalWidth)
      const scale = targetWidth / naturalWidth
      const targetHeight = Math.round(naturalHeight * scale)
      
      const dataUrl = await toPng(el, {
        cacheBust: true,
        filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
        width: targetWidth,
        height: targetHeight,
        pixelRatio: 1.5,
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
      
      const img = new Image()
      img.src = dataUrl
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = () => reject(new Error('Image load failed')); })
      
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      
      if (!ctx) throw new Error('Canvas not supported')
      
      // Determine supported mime type
      const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' 
                     : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' 
                     : ''
                     
      if (!mimeType) throw new Error('Video recording not supported on this browser')
      
      const stream = canvas.captureStream(30)
      const recorder = new MediaRecorder(stream, { mimeType })
      const chunks: BlobPart[] = []
      
      recorder.ondataavailable = (e) => chunks.push(e.data)
      
      const recordingPromise = new Promise<void>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          const ext = mimeType.includes('mp4') ? 'mp4' : 'webm'
          link.download = \`\${fileName}.\${ext}\`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
          resolve()
        }
      })
      
      recorder.start()
      
      // Draw 60 frames over 2 seconds to create a smooth video
      let frame = 0
      const totalFrames = 60
      
      const drawFrame = () => {
        ctx.clearRect(0, 0, targetWidth, targetHeight)
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        
        // Add a sweeping light ray effect
        const progress = frame / totalFrames
        const rayX = (progress * (targetWidth * 2)) - targetWidth
        
        ctx.save()
        ctx.globalCompositeOperation = 'overlay'
        const gradient = ctx.createLinearGradient(rayX, 0, rayX + 100, targetHeight)
        gradient.addColorStop(0, 'rgba(255,255,255,0)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.4)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.fillStyle = gradient
        ctx.transform(1, 0, -0.5, 1, 0, 0) // Skew it
        ctx.fillRect(rayX, 0, 200, targetHeight)
        ctx.restore()
        
        frame++
        if (frame < totalFrames) {
          setTimeout(drawFrame, 33) // ~30fps
        } else {
          recorder.stop()
        }
      }
      
      drawFrame()
      await recordingPromise
      
      setGifGenerating(false)
    } catch (e) {
      console.error('Video generation failed:', e)
      setGifGenerating(false)
    }
  }`;

file = file.replace(oldRegex, newCode);

file = file.replace(
  "Making GIF…",
  "Making Video…"
);

file = file.replace(
  "Share as GIF",
  "Share as Video"
);

file = file.replace(
  "{gifGenerating ? <span className=\"animate-pulse\">GIF...</span> : <><Download className=\"size-4 mr-1.5\" /> GIF</>}",
  "{gifGenerating ? <span className=\"animate-pulse\">Video...</span> : <><Download className=\"size-4 mr-1.5\" /> Video</>}"
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
