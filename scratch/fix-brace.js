const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const regex = /if \(frame <= totalFrames\) \{\s*setTimeout\(drawFrame, 33\)\s*\} else \{\s*recorder\.stop\(\)\s*\}\s*\}\s*\}\s*drawFrame\(\)/;

const fixed = `if (frame <= totalFrames) {
          setTimeout(drawFrame, 33)
        } else {
          recorder.stop()
        }
      }
      
      drawFrame()`;

file = file.replace(regex, fixed);
fs.writeFileSync('components/jashn/share-bar.tsx', file);
