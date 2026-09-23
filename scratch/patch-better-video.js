const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const oldCodeRegex = /const targetWidth = Math\.min\(480, naturalWidth\)[\s\S]*?recorder\.stop\(\)\n        \}\n      \}/;

const newCode = `const targetWidth = Math.min(720, naturalWidth) // HD Quality
      const scale = targetWidth / naturalWidth
      const targetHeight = Math.round(naturalHeight * scale)
      
      const dataUrl = await toPng(el, {
        cacheBust: true,
        filter: (node) => !['IFRAME', 'SCRIPT', 'INS'].includes((node as HTMLElement).tagName),
        width: targetWidth,
        height: targetHeight,
        pixelRatio: 2, // Ultra crisp quality
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
      
      const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' 
                     : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' 
                     : ''
                     
      if (!mimeType) throw new Error('Video recording not supported on this browser')
      
      const stream = canvas.captureStream(30)
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2500000 }) // High bitrate for better quality
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
      
      // 5 Seconds at 30fps = 150 frames
      let frame = 0
      const totalFrames = 150 
      
      // Generate some random floating sparkles
      const sparkles = Array.from({ length: 25 }).map(() => ({
        x: Math.random() * targetWidth,
        y: Math.random() * targetHeight + targetHeight * 0.2, // Start slightly lower
        radius: Math.random() * 2.5 + 0.5,
        speedY: Math.random() * 1.5 + 0.5,
        wobbleSpeed: Math.random() * 0.1,
        wobbleOffset: Math.random() * Math.PI * 2
      }))
      
      const drawFrame = () => {
        ctx.clearRect(0, 0, targetWidth, targetHeight)
        
        // --- 1. Subtle cinematic zoom effect ---
        const zoom = 1 + (frame / totalFrames) * 0.04 // 4% zoom over 5 seconds
        ctx.save()
        ctx.translate(targetWidth / 2, targetHeight / 2)
        ctx.scale(zoom, zoom)
        ctx.translate(-targetWidth / 2, -targetHeight / 2)
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        ctx.restore()
        
        // --- 2. Sweeping Light Ray (sweeps twice) ---
        const progress = frame / totalFrames
        const sweepProgress = (progress * 2) % 1 // Sweeps 0 to 1 twice
        const rayX = (sweepProgress * (targetWidth * 2.5)) - targetWidth
        
        ctx.save()
        ctx.globalCompositeOperation = 'overlay'
        const gradient = ctx.createLinearGradient(rayX, 0, rayX + 150, targetHeight)
        gradient.addColorStop(0, 'rgba(255,255,255,0)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.fillStyle = gradient
        ctx.transform(1, 0, -0.4, 1, 0, 0)
        ctx.fillRect(rayX, 0, 250, targetHeight)
        ctx.restore()
        
        // --- 3. Floating Sparkles / Confetti ---
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        sparkles.forEach(s => {
          s.y -= s.speedY
          const x = s.x + Math.sin(frame * s.wobbleSpeed + s.wobbleOffset) * 10
          
          ctx.beginPath()
          ctx.arc(x, s.y, s.radius, 0, Math.PI * 2)
          ctx.fillStyle = \`rgba(255, 235, 133, \${Math.max(0, 1 - s.y/targetHeight)})\` // Fade out near top
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(255, 235, 133, 0.8)'
          ctx.fill()
        })
        ctx.restore()
        
        frame++
        if (frame <= totalFrames) {
          setTimeout(drawFrame, 33)
        } else {
          recorder.stop()
        }`;

file = file.replace(oldCodeRegex, newCode);
fs.writeFileSync('components/jashn/share-bar.tsx', file);
