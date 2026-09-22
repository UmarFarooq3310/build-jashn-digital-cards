const fs = require('fs')
const file = './components/magic-scenarios/wedding-scenario.tsx'
let content = fs.readFileSync(file, 'utf8')
content = content.replace(
  /englishText=\{data\.wishContent\?\.secretLetter \|\| data\.inviteContent\?\.eventTitle \|\| `We joyfully request the pleasure of your presence and warm prayers as our beloved \$\{couple\}/,
  'englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `We joyfully request the pleasure of your presence and warm prayers as our beloved ${couple} embark on this beautiful sacred journey of marriage.`}'
)
fs.writeFileSync(file, content, 'utf8')
