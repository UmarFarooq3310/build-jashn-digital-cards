const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const targetDir = path.join(__dirname, '../../public/images/carousel')
const artifactDir = '/Users/apple/.gemini/antigravity-cli/brain/84ce8a88-4a5d-48e6-8761-4f9fc5ea62a9'

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// SLIDE 1: COVER
const svg1 = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg1" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="65%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#022c22"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#042f2e"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#f59e0b" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#bg1)"/>

  <!-- Lantern Strings & Lamps -->
  <line x1="200" y1="0" x2="200" y2="120" stroke="#f59e0b" stroke-width="2" opacity="0.7"/>
  <line x1="880" y1="0" x2="880" y2="120" stroke="#f59e0b" stroke-width="2" opacity="0.7"/>
  <circle cx="200" cy="140" r="20" fill="url(#gold)" filter="url(#glow)"/>
  <circle cx="880" cy="140" r="20" fill="url(#gold)" filter="url(#glow)"/>

  <!-- Confetti Dots -->
  <circle cx="150" cy="250" r="6" fill="#fef08a" opacity="0.8"/>
  <circle cx="920" cy="280" r="8" fill="#f59e0b" opacity="0.8"/>
  <circle cx="220" cy="850" r="7" fill="#34d399" opacity="0.7"/>
  <circle cx="850" cy="880" r="6" fill="#fef08a" opacity="0.8"/>

  <!-- Top Badge -->
  <rect x="340" y="80" width="400" height="44" rx="22" fill="#f59e0b" fill-opacity="0.2" stroke="url(#gold)" stroke-width="2"/>
  <text x="540" y="109" font-family="sans-serif" font-size="16" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="3">DIGITAL WISH CARDS &amp; INVITATIONS</text>

  <!-- Headline -->
  <text x="540" y="210" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">Say It Beautifully</text>

  <!-- Card Mockup -->
  <g transform="translate(320, 270)" filter="url(#shadow)">
    <rect x="0" y="0" width="440" height="620" rx="32" fill="url(#cardBg)" stroke="url(#gold)" stroke-width="6"/>
    <!-- Card Mandala Frame -->
    <circle cx="220" cy="310" r="160" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.3" stroke-dasharray="8 6"/>
    <circle cx="220" cy="310" r="120" fill="none" stroke="#fef08a" stroke-width="1.5" opacity="0.4"/>
    
    <!-- Crescent & Star Icon -->
    <path d="M 220 200 A 45 45 0 1 0 255 260 A 35 35 0 1 1 220 200 Z" fill="url(#gold)"/>
    <polygon points="250,215 254,225 265,225 256,232 259,242 250,236 241,242 244,232 235,225 246,225" fill="#fef08a"/>
    
    <!-- Card Text -->
    <text x="220" y="370" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="url(#gold)" text-anchor="middle">Mughal Gold Eid</text>
    <text x="220" y="415" font-family="sans-serif" font-size="18" fill="#a7f3d0" text-anchor="middle">May peace &amp; prosperity illuminate your home.</text>
    <line x1="120" y1="460" x2="320" y2="460" stroke="#f59e0b" stroke-width="1" opacity="0.4"/>
    <text x="220" y="500" font-family="sans-serif" font-size="15" font-weight="bold" fill="#fef08a" text-anchor="middle" letter-spacing="2">CARDZY.ONLINE</text>
  </g>

  <!-- Bottom Right Tagline -->
  <text x="1030" y="1040" font-family="sans-serif" font-size="18" font-weight="800" fill="#fef08a" text-anchor="end">Cardzy.online · Digital Wish Cards &amp; Event Invitations</text>
</svg>
`

// SLIDE 2: OCCASIONS (4 CARDS GRID)
const svg2 = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg2" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#022c22"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bg2)"/>

  <!-- Top Badge & Header -->
  <text x="540" y="100" font-family="sans-serif" font-size="18" font-weight="900" fill="#f59e0b" text-anchor="middle" letter-spacing="3">50+ TEMPLATES</text>
  <text x="540" y="170" font-family="Georgia, serif" font-size="56" font-weight="bold" fill="url(#gold)" text-anchor="middle">Every Celebration</text>

  <!-- 4-Card Grid -->
  <!-- Card 1: Mughal Eid -->
  <g transform="translate(100, 230)" filter="url(#shadow)">
    <rect width="410" height="350" rx="24" fill="#042f2e" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="205" cy="140" r="60" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 4"/>
    <path d="M 205 100 A 30 30 0 1 0 230 140 A 24 24 0 1 1 205 100 Z" fill="url(#gold)"/>
    <text x="205" y="240" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="url(#gold)" text-anchor="middle">Mughal Eid Card</text>
    <text x="205" y="280" font-family="sans-serif" font-size="16" fill="#a7f3d0" text-anchor="middle">Teal &amp; Gold Mandalas</text>
  </g>

  <!-- Card 2: Zardozi Shaadi -->
  <g transform="translate(570, 230)" filter="url(#shadow)">
    <rect width="410" height="350" rx="24" fill="#831843" stroke="#f472b6" stroke-width="4"/>
    <circle cx="205" cy="130" r="45" fill="none" stroke="#f472b6" stroke-width="3"/>
    <circle cx="205" cy="130" r="30" fill="none" stroke="#fbcfe8" stroke-width="2"/>
    <text x="205" y="240" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#fbcfe8" text-anchor="middle">Zardozi Shaadi</text>
    <text x="205" y="280" font-family="sans-serif" font-size="16" fill="#f472b6" text-anchor="middle">Magenta Floral Brocade</text>
  </g>

  <!-- Card 3: Kashi Birthday -->
  <g transform="translate(100, 610)" filter="url(#shadow)">
    <rect width="410" height="350" rx="24" fill="#1e1b4b" stroke="#818cf8" stroke-width="4"/>
    <polygon points="205,100 215,130 245,130 220,150 230,180 205,160 180,180 190,150 165,130 195,130" fill="#c7d2fe"/>
    <text x="205" y="240" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#c7d2fe" text-anchor="middle">Kashi Birthday</text>
    <text x="205" y="280" font-family="sans-serif" font-size="16" fill="#818cf8" text-anchor="middle">Midnight Blue Lights</text>
  </g>

  <!-- Card 4: Royal Mehndi -->
  <g transform="translate(570, 610)" filter="url(#shadow)">
    <rect width="410" height="350" rx="24" fill="#78350f" stroke="#fbbf24" stroke-width="4"/>
    <path d="M 205 100 L 245 140 L 205 180 L 165 140 Z" fill="none" stroke="#fbbf24" stroke-width="3"/>
    <circle cx="205" cy="140" r="15" fill="#fde68a"/>
    <text x="205" y="240" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#fde68a" text-anchor="middle">Royal Mehndi</text>
    <text x="205" y="280" font-family="sans-serif" font-size="16" fill="#fbbf24" text-anchor="middle">Golden Henna Art</text>
  </g>

  <!-- Bottom Right Tagline -->
  <text x="1030" y="1040" font-family="sans-serif" font-size="18" font-weight="800" fill="#fef08a" text-anchor="end">Cardzy.online · Digital Wish Cards &amp; Event Invitations</text>
</svg>
`

// SLIDE 3: RSVP & FEATURES (SMARTPHONE UI)
const svg3 = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg3" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#022c22"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bg3)"/>

  <!-- Header -->
  <text x="540" y="100" font-family="sans-serif" font-size="18" font-weight="900" fill="#f59e0b" text-anchor="middle" letter-spacing="3">ONE LINK</text>
  <text x="540" y="170" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="url(#gold)" text-anchor="middle">RSVP, Maps &amp; Countdown</text>

  <!-- Phone Container -->
  <g transform="translate(300, 220)" filter="url(#shadow)">
    <!-- Smartphone Outline -->
    <rect width="480" height="760" rx="48" fill="#011e17" stroke="#10b981" stroke-width="4"/>
    
    <!-- Phone Screen Content -->
    <rect x="15" y="15" width="450" height="730" rx="36" fill="#042f2e"/>
    
    <!-- Title Section -->
    <text x="225" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f59e0b" text-anchor="middle" letter-spacing="2">MEHNDI &amp; SHAADI</text>
    <text x="225" y="120" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Ayesha &amp; Zaryab&apos;s Wedding</text>

    <!-- WhatsApp RSVP Button -->
    <rect x="40" y="160" width="370" height="64" rx="20" fill="#25D366"/>
    <text x="225" y="200" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">WhatsApp RSVP — Confirm</text>

    <!-- Google Maps Card -->
    <rect x="40" y="250" width="370" height="100" rx="20" fill="#0d9488" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="75" cy="300" r="14" fill="#ef4444"/>
    <text x="110" y="290" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Google Maps Location Pin</text>
    <text x="110" y="320" font-family="sans-serif" font-size="14" fill="#a7f3d0">Pearl Continental Lawn, Rawalpindi</text>

    <!-- Live Countdown -->
    <rect x="40" y="375" width="370" height="100" rx="20" fill="#0d9488" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="75" cy="425" r="14" fill="#f59e0b"/>
    <text x="110" y="415" font-family="sans-serif" font-size="18" font-weight="bold" fill="#f59e0b">Live Countdown Clock</text>
    <text x="110" y="445" font-family="monospace" font-size="20" font-weight="bold" fill="#ffffff">12d : 08h : 30m : 15s</text>

    <!-- Dress Code -->
    <rect x="40" y="500" width="370" height="80" rx="20" fill="#0d9488" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5"/>
    <text x="110" y="535" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Dress Code Notes</text>
    <text x="110" y="560" font-family="sans-serif" font-size="13" fill="#a7f3d0">Yellow &amp; Emerald Festive Attire</text>

    <!-- Footer link in screen -->
    <text x="225" y="660" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f59e0b" text-anchor="middle">cardzy.online</text>
  </g>

  <!-- Bottom Right Tagline -->
  <text x="1030" y="1040" font-family="sans-serif" font-size="18" font-weight="800" fill="#fef08a" text-anchor="end">Cardzy.online · Digital Wish Cards &amp; Event Invitations</text>
</svg>
`

// SLIDE 4: GLOBAL 18 LANGUAGES
const svg4 = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg4" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#022c22"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bg4)"/>

  <!-- Top Header -->
  <text x="540" y="100" font-family="sans-serif" font-size="18" font-weight="900" fill="#f59e0b" text-anchor="middle" letter-spacing="3">GLOBAL REACH</text>
  <text x="540" y="170" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="url(#gold)" text-anchor="middle">Send Wishes in 18 Languages</text>

  <!-- Centerpiece Globe Silhouette -->
  <circle cx="540" cy="540" r="220" fill="#042f2e" stroke="#10b981" stroke-width="4"/>
  <circle cx="540" cy="540" r="180" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10 6" opacity="0.6"/>
  <circle cx="540" cy="540" r="140" fill="none" stroke="#34d399" stroke-width="1.5" opacity="0.4"/>
  <text x="540" y="555" font-family="sans-serif" font-size="44" font-weight="bold" fill="#34d399" text-anchor="middle">18 LANGS</text>

  <!-- 4 Multilingual Cards -->
  <!-- 1. Urdu / Arabic -->
  <g transform="translate(100, 260)" filter="url(#shadow)">
    <rect width="320" height="180" rx="20" fill="#042f2e" stroke="url(#gold)" stroke-width="3"/>
    <text x="160" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f59e0b" text-anchor="middle">Urdu / Arabic</text>
    <text x="160" y="125" font-family="sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">عید مبارک</text>
  </g>

  <!-- 2. Spanish -->
  <g transform="translate(660, 260)" filter="url(#shadow)">
    <rect width="320" height="180" rx="20" fill="#831843" stroke="#f472b6" stroke-width="3"/>
    <text x="160" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f472b6" text-anchor="middle">Spanish</text>
    <text x="160" y="120" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">¡Felicidades!</text>
  </g>

  <!-- 3. English -->
  <g transform="translate(100, 660)" filter="url(#shadow)">
    <rect width="320" height="180" rx="20" fill="#1e1b4b" stroke="#818cf8" stroke-width="3"/>
    <text x="160" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#818cf8" text-anchor="middle">English</text>
    <text x="160" y="120" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">Happy Birthday</text>
  </g>

  <!-- 4. Chinese -->
  <g transform="translate(660, 660)" filter="url(#shadow)">
    <rect width="320" height="180" rx="20" fill="#78350f" stroke="#fbbf24" stroke-width="3"/>
    <text x="160" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fbbf24" text-anchor="middle">Chinese</text>
    <text x="160" y="125" font-family="sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">祝贺</text>
  </g>

  <!-- Bottom Right Tagline -->
  <text x="1030" y="1040" font-family="sans-serif" font-size="18" font-weight="800" fill="#fef08a" text-anchor="end">Cardzy.online · Digital Wish Cards &amp; Event Invitations</text>
</svg>
`

// SLIDE 5: CTA (FREE FOREVER PLAN)
const svg5 = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg5" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#022c22"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bg5)"/>

  <!-- Top Medallion -->
  <g transform="translate(540, 220)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="100" fill="#042f2e" stroke="url(#gold)" stroke-width="6"/>
    <circle cx="0" cy="0" r="84" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 4"/>
    <text x="0" y="-15" font-family="sans-serif" font-size="20" font-weight="900" fill="#fef08a" text-anchor="middle">FREE</text>
    <text x="0" y="15" font-family="sans-serif" font-size="20" font-weight="900" fill="#fef08a" text-anchor="middle">FOREVER</text>
    <text x="0" y="45" font-family="sans-serif" font-size="16" font-weight="800" fill="#a7f3d0" text-anchor="middle">PLAN</text>
  </g>

  <!-- Main Title -->
  <text x="540" y="440" font-family="Georgia, serif" font-size="56" font-weight="bold" fill="url(#gold)" text-anchor="middle">Create Yours in Minutes</text>
  <text x="540" y="520" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle">— FREE —</text>

  <!-- CTA Buttons -->
  <g transform="translate(290, 600)" filter="url(#shadow)">
    <!-- Primary CTA -->
    <rect width="500" height="84" rx="24" fill="url(#gold)"/>
    <text x="250" y="52" font-family="sans-serif" font-size="24" font-weight="900" fill="#022c22" text-anchor="middle">Create Wish Card Free ➔</text>
  </g>

  <g transform="translate(290, 720)" filter="url(#shadow)">
    <!-- Secondary CTA -->
    <rect width="500" height="84" rx="24" fill="#042f2e" stroke="#10b981" stroke-width="3"/>
    <text x="250" y="52" font-family="sans-serif" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">Build Event Invitation</text>
  </g>

  <!-- Trust Badges -->
  <text x="540" y="870" font-family="sans-serif" font-size="20" font-weight="bold" fill="#a7f3d0" text-anchor="middle">No Credit Card Required · Instant Shareable Link · 18 Languages</text>

  <!-- Bottom Right Tagline -->
  <text x="1030" y="1040" font-family="sans-serif" font-size="18" font-weight="800" fill="#fef08a" text-anchor="end">Cardzy.online · Digital Wish Cards &amp; Event Invitations</text>
</svg>
`

async function buildAll() {
  const slides = [
    { svg: svg1, name: 'slide1.jpg' },
    { svg: svg2, name: 'slide2.jpg' },
    { svg: svg3, name: 'slide3.jpg' },
    { svg: svg4, name: 'slide4.jpg' },
    { svg: svg5, name: 'slide5.jpg' },
  ]

  for (const item of slides) {
    const buf = Buffer.from(item.svg)
    const outPathPublic = path.join(targetDir, item.name)
    const outPathArtifact = path.join(artifactDir, item.name)

    await sharp(buf)
      .jpeg({ quality: 96 })
      .toFile(outPathPublic)

    await sharp(buf)
      .jpeg({ quality: 96 })
      .toFile(outPathArtifact)

    console.log(`Rendered ${item.name} successfully`)
  }
}

buildAll().catch(console.error)
