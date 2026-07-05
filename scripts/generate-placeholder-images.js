#!/usr/bin/env node
/**
 * Generates thematic portrait-orientation placeholder SVG images
 * for all occasions and invitation types.
 * Run: node scripts/generate-placeholder-images.js
 */

const fs = require('fs')
const path = require('path')

// Each entry: [id, label, urduLabel, gradient stops [top, bottom], motif emoji/symbol]
const occasions = [
  ['birthday',        'Birthday',         'سالگرہ مبارک',      '#1a237e','#7b1fa2',  '🎂'],
  ['anniversary',     'Anniversary',      'سالگرہِ شادی',      '#880e4f','#4a148c',  '💍'],
  ['new-baby',        'New Baby',         'مبارک ہو',           '#f48fb1','#ce93d8',  '🍼'],
  ['get-well-soon',   'Get Well Soon',    'صحت مند رہو',        '#1565c0','#00897b',  '💊'],
  ['farewell',        'Farewell',         'الوداع',             '#37474f','#546e7a',  '✈️'],
  ['congratulations', 'Congratulations',  'مبارک ہو',           '#e65100','#f57f17',  '🎉'],
  ['thank-you',       'Thank You',        'شکریہ',              '#2e7d32','#558b2f',  '🎁'],
  ['miss-you',        'Miss You',         'تمہاری یاد',         '#ad1457','#6a1b9a',  '💌'],
  ['good-luck',       'Good Luck',        'کامیابی کی دعا',     '#f9a825','#ef6c00',  '⭐'],
  ['welcome-back',    'Welcome Back',     'خوش آمدید',          '#00695c','#1565c0',  '🏠'],
  ['eid-ul-fitr',     'Eid ul Fitr',      'عید مبارک',          '#1b5e20','#33691e',  '🌙'],
  ['eid-ul-adha',     'Eid ul Adha',      'عید الاضحیٰ مبارک', '#33691e','#1b5e20',  '🌙'],
  ['ramadan',         'Ramadan',          'رمضان مبارک',        '#1a237e','#311b92',  '🕌'],
  ['jumma',           'Jumma Mubarak',    'جمعہ مبارک',         '#004d40','#006064',  '⭐'],
  ['hajj',            'Hajj Mubarak',     'حج مبارک',           '#bf8600','#795548',  '🕋'],
  ['umrah',           'Umrah Mubarak',    'عمرہ مبارک',         '#4e342e','#bf8600',  '🕋'],
  ['milad',           'Milad-un-Nabi',    'میلاد مبارک',        '#1a237e','#006064',  '🌙'],
  ['graduation',      'Graduation',       'کامیابی مبارک',      '#1a237e','#0d47a1',  '🎓'],
  ['new-job',         'New Job',          'نوکری مبارک',        '#1b5e20','#2e7d32',  '💼'],
  ['promotion',       'Promotion',        'ترقی مبارک',         '#e65100','#bf360c',  '🏆'],
  ['new-home',        'New Home',         'گھر مبارک',          '#4e342e','#795548',  '🏡'],
  ['business-launch', 'Business Launch',  'مبارک ہو',           '#0d47a1','#1565c0',  '🚀'],
  ['exam-pass',       'Exam Pass',        'کامیابی مبارک',      '#1a237e','#283593',  '📜'],
  ['new-year',        'New Year',         'نیا سال مبارک',      '#0d1b4c','#4a0e6b',  '✨'],
  ['independence-day','Independence Day', 'جشنِ آزادی مبارک',   '#1b5e20','#2e7d32',  '🇵🇰'],
  ['kashmir-day',     'Kashmir Day',      'یکجہتی کشمیر',      '#1a237e','#0d47a1',  '🏔️'],
  ['mothers-day',     "Mother's Day",     'ماں کے نام',         '#880e4f','#ad1457',  '💐'],
  ['fathers-day',     "Father's Day",     'بابا کے نام',        '#1a237e','#37474f',  '👔'],
  ['valentines',      "Valentine's Day",  'محبت کا دن',         '#b71c1c','#880e4f',  '❤️'],
  ['friendship-day',  'Friendship Day',   'دوستی مبارک',        '#e91e63','#ff9800',  '🤝'],
  ['basant',          'Basant',           'بسنت بہار مبارک',    '#f9a825','#388e3c',  '🪁'],
  ['condolence',      'Condolence',       'اِنّا لِلّٰہِ',     '#37474f','#455a64',  '🌿'],
  ['nikah',           'Nikah Mubarak',    'نکاح مبارک',         '#bf8600','#5d4037',  '💍'],
  ['shaadi',          'Shaadi Mubarak',   'شادی مبارک',         '#8e0f24','#4a0510',  '👑'],
  ['mehndi',          'Mehndi Mubarak',   'مہندی مبارک',        '#2e7d32','#f9a825',  '🌺'],
]

const invitations = [
  ['mehndi',          'Mehndi Night',       'مہندی',            '#2e7d32','#f9a825',  '🌺'],
  ['dholki',          'Dholki',             'ڈھولکی',           '#880e4f','#f9a825',  '🥁'],
  ['nikkah',          'Nikkah Ceremony',    'نکاح',             '#bf8600','#5d4037',  '💍'],
  ['barat',           'Barat Day',          'بارات',            '#8e0f24','#4a0510',  '👑'],
  ['walima',          'Walima',             'ولیمہ',            '#c8a96e','#5d4037',  '🥂'],
  ['engagement',      'Engagement',         'منگنی',            '#880e4f','#c2185b',  '💖'],
  ['eid-party',       'Eid Party',          'عید ملن',          '#1b5e20','#33691e',  '🌙'],
  ['milad',           'Milad un Nabi',      'میلاد النبی',      '#1a237e','#006064',  '⭐'],
  ['quran-khatam',    'Quran Khatam',       'قرآن ختم',         '#004d40','#1b5e20',  '📖'],
  ['iftaar',          'Iftaar Party',       'افطار پارٹی',      '#1a237e','#311b92',  '🕌'],
  ['chelum',          'Chelum',             'چہلم',             '#37474f','#455a64',  '🌿'],
  ['birthday-party',  'Birthday Party',     'سالگرہ',           '#1a237e','#7b1fa2',  '🎂'],
  ['graduation-party','Graduation Party',   'گریجویشن',         '#1a237e','#0d47a1',  '🎓'],
  ['family-reunion',  'Family Reunion',     'فیملی ملاپ',       '#e65100','#bf360c',  '👨‍👩‍👧‍👦'],
  ['baby-shower',     'Baby Shower',        'بے بی شاور',       '#f48fb1','#ce93d8',  '🍼'],
  ['kids-party',      'Kids Party',         'بچوں کی پارٹی',   '#e91e63','#ff9800',  '🎈'],
  ['house-warming',   'House Warming',      'گھر وارمنگ',       '#4e342e','#795548',  '🏡'],
  ['shop-opening',    'Shop Opening',       'دکان کی افتتاح',   '#0d47a1','#1565c0',  '🏪'],
  ['office-party',    'Office Party',       'آفس پارٹی',        '#37474f','#1a237e',  '🏢'],
  ['seminar',         'Seminar',            'سیمینار',           '#1565c0','#283593',  '🎤'],
  ['product-launch',  'Product Launch',     'پروڈکٹ لانچ',      '#0d1b4c','#4a0e6b',  '🚀'],
  ['school-function', 'School Function',    'تقریب',             '#1b5e20','#0d47a1',  '🏫'],
]

function makeSVG(id, label, urduLabel, colorTop, colorBot, emoji) {
  // Decorative patterns vary per category feel
  const isWedding = ['mehndi','dholki','nikkah','barat','walima','engagement','shaadi','nikah'].includes(id)
  const isIslamic = ['eid-ul-fitr','eid-ul-adha','ramadan','jumma','hajj','umrah','milad','eid-party','quran-khatam','iftaar','chelum'].includes(id)
  const isMuted   = ['condolence','chelum','farewell'].includes(id)

  // decorative circles/arcs
  const deco = isWedding ? `
    <circle cx="160" cy="60" r="55" fill="none" stroke="rgba(255,220,100,0.18)" stroke-width="1.5"/>
    <circle cx="160" cy="60" r="40" fill="none" stroke="rgba(255,220,100,0.12)" stroke-width="1"/>
    <path d="M110 60 Q160 10 210 60" fill="none" stroke="rgba(255,220,100,0.25)" stroke-width="1.5"/>
    <circle cx="40" cy="400" r="60" fill="rgba(255,220,100,0.06)"/>
    <circle cx="280" cy="380" r="50" fill="rgba(255,220,100,0.06)"/>
  ` : isIslamic ? `
    <circle cx="260" cy="60" r="45" fill="rgba(255,255,255,0.06)"/>
    <path d="M255 45 A20 20 0 1 1 245 80 A14 14 0 1 0 255 45" fill="rgba(255,255,255,0.15)"/>
    <circle cx="270" cy="55" r="3" fill="rgba(255,255,255,0.4)"/>
    <line x1="0" y1="200" x2="320" y2="200" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  ` : isMuted ? `
    <circle cx="160" cy="80" r="50" fill="rgba(255,255,255,0.04)"/>
    <path d="M60 420 Q160 360 260 420" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
  ` : `
    <circle cx="30"  cy="80"  r="30" fill="rgba(255,255,255,0.06)"/>
    <circle cx="290" cy="120" r="22" fill="rgba(255,255,255,0.06)"/>
    <circle cx="160" cy="30"  r="18" fill="rgba(255,255,255,0.05)"/>
    <circle cx="50"  cy="380" r="40" fill="rgba(255,255,255,0.05)"/>
  `

  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="427" viewBox="0 0 320 427">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="${colorTop}"/>
      <stop offset="100%" stop-color="${colorBot}"/>
    </linearGradient>
    <!-- bottom scrim so text is always legible -->
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(0,0,0,0)"/>
      <stop offset="55%"  stop-color="rgba(0,0,0,0.15)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.72)"/>
    </linearGradient>
  </defs>

  <!-- background -->
  <rect width="320" height="427" fill="url(#bg)"/>

  <!-- decorative layer -->
  ${deco}

  <!-- large centered emoji / motif -->
  <text x="160" y="210" text-anchor="middle" dominant-baseline="middle"
        font-size="88" opacity="0.35">${emoji}</text>

  <!-- subtle grid texture -->
  <rect width="320" height="427" fill="none"
        stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>

  <!-- bottom scrim -->
  <rect width="320" height="427" fill="url(#scrim)"/>

  <!-- label -->
  <text x="16" y="378" font-family="system-ui,sans-serif" font-size="17"
        font-weight="700" fill="white" opacity="0.95">${label}</text>

  <!-- urdu tagline -->
  <text x="304" y="404" font-family="serif" font-size="14"
        text-anchor="end" fill="rgba(255,255,255,0.75)"
        direction="rtl">${urduLabel}</text>
</svg>`
}

let created = 0

for (const [id, label, urdu, c1, c2, emoji] of occasions) {
  const svg = makeSVG(id, label, urdu, c1, c2, emoji)
  const dest = path.join(__dirname, '..', 'public', 'occasions', `${id}.jpg`)
  // Save as .svg but named .jpg — browsers handle SVG regardless of extension
  // For a real project you'd swap these for actual photos.
  // We write a companion .svg for clarity.
  const svgDest = path.join(__dirname, '..', 'public', 'occasions', `${id}.svg`)
  fs.writeFileSync(svgDest, svg, 'utf8')
  // Also write a tiny redirect SVG named .jpg so <Image src="...jpg"/> finds something
  fs.writeFileSync(dest, svg, 'utf8')
  created++
}

for (const [id, label, urdu, c1, c2, emoji] of invitations) {
  const svg = makeSVG(id, label, urdu, c1, c2, emoji)
  const dest = path.join(__dirname, '..', 'public', 'invitations', `${id}.jpg`)
  const svgDest = path.join(__dirname, '..', 'public', 'invitations', `${id}.svg`)
  fs.writeFileSync(svgDest, svg, 'utf8')
  fs.writeFileSync(dest, svg, 'utf8')
  created++
}

console.log(`✅ Generated ${created} placeholder images`)
console.log('   /public/occasions/   — 35 files')
console.log('   /public/invitations/ — 22 files')
console.log('')
console.log('Replace these with real photography when available.')
