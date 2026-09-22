const fs = require('fs')
const file = './components/magic-scenarios/graduation-scenario.tsx'
let content = fs.readFileSync(file, 'utf8')
content = content.replace(
  /englishText=\{data\.wishContent\?\.secretLetter \|\| data\.inviteContent\?\.eventTitle \|\| `Proudly presented to \$\{data\.recipientName\}/,
  'englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `Proudly presented to ${data.recipientName} for outstanding dedication, countless late-night study sessions, and achieving this magnificent milestone. The future is entirely yours!`}'
)
fs.writeFileSync(file, content, 'utf8')
