const fs = require('fs')

let content = fs.readFileSync('./app/m/[slug]/page.tsx', 'utf8')

// Sender preview block
content = content.replace(
  /<main[\s\S]*?perspective: '2000px'[\s\S]*?\{renderScenario\(\)\}[\s\S]*?<\/main>/g,
  '<main className="w-full max-w-2xl z-10 flex flex-col items-center justify-center my-auto animate-float-slow">\n        {renderScenario()}\n      </main>'
)

fs.writeFileSync('./app/m/[slug]/page.tsx', content, 'utf8')
