const fs = require('fs')
const path = require('path')

const dir = './components/magic-scenarios'
const files = fs.readdirSync(dir).filter(f => f.endsWith('-scenario.tsx') && f !== 'proposal-scenario.tsx' && f !== 'birthday-scenario.tsx')

files.forEach(file => {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf8')

  if (!content.includes('TypewriterLetter')) {
    content = content.replace(/(import .* from 'lucide-react')/, "$1\nimport { TypewriterLetter } from '@/components/magic-scenarios/typewriter-letter'")
  }

  // Regex to match the magic-letter div and anything inside it
  // We capture:
  // 1. className
  // 2. The default english text
  // 3. The urdu class name
  // 4. The signature class name
  // 5. The signature text prefix (e.g. "— Forever yours, ")
  const regex = /<div className="magic-letter ([^"]*)">[\s\S]*?\{data\.(?:wishContent|inviteContent)\?(?:\.secretLetter|\.eventTitle) \|\|([^}]+)\}[\s\S]*?className="([^"]+)">[\s\S]*?\{data\.(?:wishContent|inviteContent)\.urduGreeting\}[\s\S]*?<\/div>[\s\S]*?\)\}[\s\S]*?<div className="([^"]+)">[\s\S]*?(—[^,]+, )\{data\.senderName\}[\s\S]*?<\/div>[\s\S]*?<\/div>/
  
  const match = content.match(regex)
  if (match) {
    const className = `magic-letter ${match[1]}`
    const defaultEnglish = match[2].trim()
    const urduClassName = match[3]
    const signatureClassName = match[4]
    const signaturePrefix = match[5].trim()
    
    const replacement = `<TypewriterLetter\n              className="${className}"\n              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || ${defaultEnglish}}\n              urduText={data.wishContent?.urduGreeting || data.inviteContent?.urduGreeting}\n              signatureText={\`${signaturePrefix} \${data.senderName}\`}\n              urduClassName="${urduClassName}"\n              signatureClassName="${signatureClassName}"\n            />`
    
    content = content.replace(match[0], replacement)
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('Patched ' + file)
  } else {
    console.log('Failed to match ' + file)
  }
})
