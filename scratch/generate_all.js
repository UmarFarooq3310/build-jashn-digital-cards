const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Helper to write TS file
function writePostFile(filename, dataObj, contentObj) {
  const tsContent = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataObj, null, 2)}

export const POST_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentObj, null, 2)}
`;
  fs.writeFileSync(path.join(targetDir, filename), tsContent, 'utf8');
  console.log(`Successfully generated ${filename}`);
}

console.log('Script ready to assemble 10 post translations files.');
