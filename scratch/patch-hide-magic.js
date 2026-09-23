const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const oldButton = `<Button onClick={downloadGif} variant="outline" disabled={downloading || gifGenerating} className="bg-[#7A1E2B] hover:bg-[#5a1620] text-white border-transparent shadow-md">
            <Download className="size-4" />
            <span className="font-extrabold">{gifGenerating ? (gifProgress > 0 ? \`Making GIF \${gifProgress}%\` : 'Making GIF…') : 'Share as GIF'}</span>
          </Button>`;

const newButton = `{inferredType !== 'magic' && (
            <Button onClick={downloadGif} variant="outline" disabled={downloading || gifGenerating} className="bg-[#7A1E2B] hover:bg-[#5a1620] text-white border-transparent shadow-md">
              <Download className="size-4" />
              <span className="font-extrabold">{gifGenerating ? (gifProgress > 0 ? \`Making GIF \${gifProgress}%\` : 'Making GIF…') : 'Share as GIF'}</span>
            </Button>
          )}`;

file = file.replace(oldButton, newButton);
fs.writeFileSync('components/jashn/share-bar.tsx', file);
