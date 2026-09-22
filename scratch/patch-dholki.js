const fs = require('fs');
let file = fs.readFileSync('app/invitation-themes-wedding.css', 'utf8');

file = file.replace(
  /\.inv-type-dholki\s*{[\s\S]*?}/,
  `.inv-type-dholki {
  --c-bg1: #064e3b;
  --c-bg2: #022c22;
  --c-ink: #fefce8;
  --c-accent: #eab308;
  --c-glow: #ca8a04;
  --c-accent2: #be185d;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(234, 179, 8, 0.22) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(190, 24, 93, 0.18) 0%, transparent 45%),
    linear-gradient(145deg, #064e3b 0%, #14532d 45%, #022c22 100%);
}`
);

fs.writeFileSync('app/invitation-themes-wedding.css', file);
