const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

// Add the import for gifshot
file = file.replace(
  "import { useLang } from '@/lib/lang/context'",
  "import { useLang } from '@/lib/lang/context'\nimport gifshot from 'gifshot'"
);

// Add the downloadGif state
file = file.replace(
  "const [downloading, setDownloading] = useState(false)",
  "const [downloading, setDownloading] = useState(false)\n  const [gifGenerating, setGifGenerating] = useState(false)"
);

// Add the downloadGif function
const gifFunction = `
  async function downloadGif() {
    if (!captureRef?.current) return
    setGifGenerating(true)
    try {
      if (inferredSlug) {
        recordCardShare(inferredType, inferredSlug, 'image') // Track as image
      }
      const { toJpeg } = await import('html-to-image')
      const el = captureRef.current
      
      const naturalWidth = el.offsetWidth
      const naturalHeight = el.offsetHeight
      const targetWidth = Math.min(400, naturalWidth) // Keep GIF small
      const scale = targetWidth / naturalWidth
      const targetHeight = Math.round(naturalHeight * scale)
      
      const frames = []
      const originalTransform = el.style.transform
      const originalShadow = el.style.boxShadow
      
      // We will capture 4 frames, simulating a pulsing glow effect
      const glowStates = [
        'none',
        '0 0 20px rgba(250, 204, 21, 0.4)',
        '0 0 40px rgba(250, 204, 21, 0.8)',
        '0 0 20px rgba(250, 204, 21, 0.4)',
      ]

      for (let i = 0; i < 4; i++) {
        el.style.boxShadow = glowStates[i]
        // Wait a tiny bit for DOM to apply style (optional, but toJpeg takes time anyway)
        const dataUrl = await toJpeg(el, {
          cacheBust: true,
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
      }
      
      // Restore original styles
      el.style.transform = originalTransform
      el.style.boxShadow = originalShadow

      // Generate GIF
      gifshot.createGIF({
        images: frames,
        gifWidth: targetWidth,
        gifHeight: targetHeight,
        interval: 0.3, // 300ms per frame
        numFrames: 4,
        frameDuration: 3, 
        sampleInterval: 10,
        numWorkers: 2
      }, function(obj) {
        if (!obj.error) {
          const link = document.createElement('a')
          link.download = \`\${fileName}.gif\`
          link.href = obj.image
          link.click()
        }
        setGifGenerating(false)
      })
    } catch (e) {
      console.error('GIF generation failed:', e)
      setGifGenerating(false)
    }
  }
`;

file = file.replace(
  "async function downloadPng() {",
  gifFunction + "\n\n  async function downloadPng() {"
);

// Add the button to the UI
const buttons = `
          {captureRef && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-10 border-border/50 bg-background/60 backdrop-blur-md active:scale-95"
                onClick={downloadPng}
                disabled={downloading || gifGenerating}
              >
                {downloading ? <span className="animate-pulse">Saving...</span> : <><Download className="size-4 mr-1.5" /> PNG</>}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-10 border-border/50 bg-background/60 backdrop-blur-md active:scale-95 text-purple-600 hover:text-purple-700"
                onClick={downloadGif}
                disabled={downloading || gifGenerating}
              >
                {gifGenerating ? <span className="animate-pulse">GIF...</span> : <><Download className="size-4 mr-1.5" /> GIF</>}
              </Button>
            </>
          )}
`;

file = file.replace(
  /\{\s*captureRef\s*&&\s*\(\s*<Button[\s\S]*?PNG<\/>\}\s*<\/Button>\s*\)\s*\}/,
  buttons
);

fs.writeFileSync('components/jashn/share-bar.tsx', file);
