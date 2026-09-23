const fs = require('fs');
let file = fs.readFileSync('components/live-presence-tracker.tsx', 'utf8');

file = file.replace(
  "import { useJashn } from '@/lib/jashn/store'",
  "import { useJashn } from '@/lib/jashn/store'\nimport { getClientTracking } from '@/lib/jashn/tracking'"
);

file = file.replace(
  "const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'",
  "const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'\n        const tracking = await getClientTracking()\n        const exactLocation = tracking.city ? \`\${tracking.city}, \${tracking.countryCode}\` : timezone"
);

file = file.replace(
  "timezone,",
  "timezone: exactLocation,"
);

fs.writeFileSync('components/live-presence-tracker.tsx', file);
