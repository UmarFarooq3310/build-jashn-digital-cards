const fs = require('fs');
let file = fs.readFileSync('components/jashn/share-bar.tsx', 'utf8');

const original = `{captureRef ? (
        <Button onClick={downloadPng} variant="outline" disabled={downloading} className="bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold border-zinc-300 shadow-xs">
          <Download className="size-4 text-black" />
          <span className="text-black font-extrabold">{downloading ? (t('saving') || 'Saving…') : (t('downloadPng') || 'Download PNG')}</span>
        </Button>
      ) : null}`;

const newButtons = `{captureRef ? (
        <>
          <Button onClick={downloadPng} variant="outline" disabled={downloading || gifGenerating} className="bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold border-zinc-300 shadow-xs">
            <Download className="size-4 text-black" />
            <span className="text-black font-extrabold">{downloading ? (t('saving') || 'Saving…') : 'PNG'}</span>
          </Button>
          <Button onClick={downloadGif} variant="outline" disabled={downloading || gifGenerating} className="bg-[#7A1E2B] hover:bg-[#5a1620] text-white border-transparent shadow-md">
            <Download className="size-4" />
            <span className="font-extrabold">{gifGenerating ? 'Making GIF…' : 'Share as GIF'}</span>
          </Button>
        </>
      ) : null}`;

file = file.replace(original, newButtons);
fs.writeFileSync('components/jashn/share-bar.tsx', file);
