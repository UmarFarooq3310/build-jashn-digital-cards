const fs = require('fs');
let file = fs.readFileSync('lib/jashn/tracking.ts', 'utf8');

const oldCode = `      const externalRes = await fetch('https://ipapi.co/json/', { signal: controller.signal })
      if (externalRes.ok) {
        const externalData = await externalRes.json()
        if (externalData.city) {
          data.city = externalData.city
          data.region = externalData.region
          data.countryCode = externalData.country_code
          data.country = externalData.country_name
          data.ip = externalData.ip
        }
      }`;

const newCode = `      // Use geojs.io instead of ipapi.co because adblockers block ipapi.co
      const externalRes = await fetch('https://get.geojs.io/v1/ip/geo.json', { signal: controller.signal })
      if (externalRes.ok) {
        const externalData = await externalRes.json()
        if (externalData.city) {
          data.city = externalData.city
          data.region = externalData.region
          data.countryCode = externalData.country_code
          data.country = externalData.country
          data.ip = externalData.ip
        }
      }`;

file = file.replace(oldCode, newCode);
fs.writeFileSync('lib/jashn/tracking.ts', file);
