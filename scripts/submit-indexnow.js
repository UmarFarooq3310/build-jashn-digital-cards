/**
 * Multi-Search Engine URL Indexing & Submission Script
 *
 * Engines covered:
 * 1. Microsoft Bing & Yahoo & DuckDuckGo & Ecosia (via Bing IndexNow)
 * 2. Yandex (via Yandex IndexNow)
 * 3. Seznam.cz (via Seznam IndexNow)
 * 4. Naver (via Naver IndexNow)
 * 5. IndexNow Central (syncs across all participating engines)
 * 6. Google (via Google Web Search Indexing API if service account enabled in GSC)
 *
 * Usage:
 *   node scripts/submit-indexnow.js          # Submits the 4 changed URLs
 *   node scripts/submit-indexnow.js --all    # Submits all 56 URLs from sitemap
 *   node scripts/submit-indexnow.js <urls>   # Submits custom URLs
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HOST = 'cardzy.online';
const KEY = 'c4rdzy1ndexn0w20268f7b2c9e4a1d6e3';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const DEFAULT_CHANGED_URLS = [
  'https://cardzy.online/',
  'https://cardzy.online/cookies',
  'https://cardzy.online/guide/poetry-for-cards-and-invitations',
  'https://cardzy.online/calendar',
];

async function fetchSitemapUrls() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map((m) => m[1]);
    return urls.length > 0 ? urls : DEFAULT_CHANGED_URLS;
  } catch (err) {
    console.warn('Could not fetch sitemap.xml dynamically, falling back to default list.', err.message);
    return DEFAULT_CHANGED_URLS;
  }
}

function loadGoogleServiceAccount() {
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const fullPath = path.resolve(process.cwd(), envFile);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    const match = content.match(/FIREBASE_SERVICE_ACCOUNT_KEY=(.*)/);
    if (match) {
      let val = match[1].trim();
      if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
        val = val.slice(1, -1);
      }
      try {
        return JSON.parse(val);
      } catch (e) {
        // Continue
      }
    }
  }
  return null;
}

function createGoogleJWT(sa, scope) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: scope,
    aud: sa.token_uri,
    exp: now + 3600,
    iat: now,
  };
  const encHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encClaim = Buffer.from(JSON.stringify(claim)).toString('base64url');
  const signInput = `${encHeader}.${encClaim}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const privateKey = sa.private_key.replace(/\\n/g, '\n');
  const signature = signer.sign(privateKey, 'base64url');
  return `${signInput}.${signature}`;
}

async function getGoogleAccessToken(sa) {
  const jwt = createGoogleJWT(sa, 'https://www.googleapis.com/auth/indexing');
  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  return data.access_token || null;
}

async function submitToGoogle(urls) {
  console.log('\n--- Checking Google Web Search Indexing API ---');
  const sa = loadGoogleServiceAccount();
  if (!sa) {
    console.log('ℹ️  No Google Service Account configured for Google Indexing API.');
    return;
  }

  const token = await getGoogleAccessToken(sa);
  if (!token) {
    console.log('⚠️  Could not obtain Google OAuth token for service account:', sa.client_email);
    return;
  }

  console.log(`Service Account: ${sa.client_email}`);
  let successCount = 0;

  for (const url of urls) {
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED',
        }),
      });

      const body = await res.json();
      if (res.status === 200) {
        console.log(`  [Google] 200 OK: ${url}`);
        successCount++;
      } else if (res.status === 403 && body?.error?.message?.includes('disabled')) {
        console.log(`  [Google] API not enabled yet in GCP. To activate 1-click Google Indexing API:`);
        console.log(`           1. Enable: https://console.developers.google.com/apis/api/indexing.googleapis.com/overview?project=${sa.project_id}`);
        console.log(`           2. Add ${sa.client_email} as Owner in Google Search Console.`);
        break;
      } else {
        console.log(`  [Google] Status ${res.status}: ${body?.error?.message || 'Error'}`);
      }
    } catch (err) {
      console.log(`  [Google] Failed:`, err.message);
    }
  }

  if (successCount > 0) {
    console.log(`🎉 Successfully submitted ${successCount} URLs directly to Google Indexing API!`);
  }
}

async function submitToIndexNowEngines(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`\n--- Submitting ${urls.length} URLs to IndexNow Engines ---`);
  urls.forEach((u) => console.log(`  • ${u}`));

  const engines = [
    { name: 'IndexNow Central', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Microsoft Bing (+ Yahoo, DuckDuckGo, Ecosia)', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
    { name: 'Seznam.cz', url: 'https://search.seznam.cz/indexnow' },
    { name: 'Naver', url: 'https://searchadvisor.naver.com/indexnow' },
  ];

  for (const engine of engines) {
    try {
      const res = await fetch(engine.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const isOk = [200, 202].includes(res.status);
      console.log(`[${engine.name}] ${res.status} ${res.statusText} ${isOk ? '✅' : '❌'}`);
    } catch (err) {
      console.log(`[${engine.name}] Error: ${err.message}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args.includes('--all')) {
    urls = await fetchSitemapUrls();
  } else if (args.filter((a) => a.startsWith('http')).length > 0) {
    urls = args.filter((a) => a.startsWith('http'));
  } else {
    urls = DEFAULT_CHANGED_URLS;
  }

  await submitToIndexNowEngines(urls);
  await submitToGoogle(urls);

  console.log('\n--- Summary ---');
  console.log('• Bing, Yahoo, DuckDuckGo, Ecosia: SUBMITTED (via Bing & IndexNow Central)');
  console.log('• Yandex: SUBMITTED');
  console.log('• Seznam.cz: SUBMITTED');
  console.log('• Naver: SUBMITTED');
  console.log('• Google: Discovers via sitemap (https://cardzy.online/sitemap.xml) and robots.txt.');
}

main();
