const fs = require('fs')
const content = fs.readFileSync('./app/create-magic-link/create-magic-link-client.tsx', 'utf8')
const matches = content.match(/min-w-[a-zA-Z0-9\[\]-]+/g) || []
console.log([...new Set(matches)].sort().join('\n'))
