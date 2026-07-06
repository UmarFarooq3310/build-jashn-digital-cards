import type { Occasion, MessageTemplate } from './types'

const RAW_OCCASIONS: any[] = [
  // PERSONAL
  { id: 'birthday', label: 'Birthday', tagline: 'Saalgirah Mubarak', urdu: 'سالگرہ مبارک', category: 'Personal', icon: 'Cake', bgImage: '/occasions/birthday.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#7b1fa2)' },
  { id: 'anniversary', label: 'Anniversary', tagline: 'Anniversary Mubarak', urdu: 'سالگرہِ شادی مبارک', category: 'Personal', icon: 'Heart', bgImage: '/occasions/anniversary.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#4a148c)' },
  { id: 'new-baby', label: 'New Baby', tagline: 'Mubarak ho!', urdu: 'مبارک ہو', category: 'Personal', icon: 'Baby', bgImage: '/occasions/new-baby.jpg', bgGradient: 'linear-gradient(160deg,#f48fb1,#ce93d8)' },
  { id: 'get-well-soon', label: 'Get Well Soon', tagline: 'Sehatmand raho', urdu: 'صحت مند رہو', category: 'Personal', icon: 'HeartPulse', bgImage: '/occasions/get-well-soon.jpg', bgGradient: 'linear-gradient(160deg,#1565c0,#00897b)' },
  { id: 'farewell', label: 'Farewell', tagline: 'Alvida', urdu: 'الوداع', category: 'Personal', icon: 'Plane', bgImage: '/occasions/farewell.jpg', bgGradient: 'linear-gradient(160deg,#37474f,#546e7a)' },
  { id: 'congratulations', label: 'Congratulations', tagline: 'Mubarak ho', urdu: 'مبارک ہو', category: 'Personal', icon: 'PartyPopper', bgImage: '/occasions/congratulations.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#f57f17)' },
  { id: 'thank-you', label: 'Thank You', tagline: 'Shukriya', urdu: 'شکریہ', category: 'Personal', icon: 'Gift', bgImage: '/occasions/thank-you.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#558b2f)' },
  { id: 'miss-you', label: 'Miss You', tagline: 'Tumhari yaad aati hai', urdu: 'تمہاری یاد آتی ہے', category: 'Personal', icon: 'HandHeart', bgImage: '/occasions/miss-you.jpg', bgGradient: 'linear-gradient(160deg,#ad1457,#6a1b9a)' },
  { id: 'good-luck', label: 'Good Luck', tagline: 'Kamiyaabi ki dua', urdu: 'کامیابی کی دعا', category: 'Personal', icon: 'Sparkles', bgImage: '/occasions/good-luck.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#ef6c00)' },
  { id: 'welcome-back', label: 'Welcome Back', tagline: 'Khush Aamdeed', urdu: 'خوش آمدید', category: 'Personal', icon: 'Sprout', bgImage: '/occasions/welcome-back.jpg', bgGradient: 'linear-gradient(160deg,#00695c,#1565c0)' },

  // ISLAMIC & RELIGIOUS
  { id: 'eid-ul-fitr', label: 'Eid ul Fitr', tagline: 'Eid Mubarak', urdu: 'عید مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-fitr.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#33691e)' },
  { id: 'eid-ul-adha', label: 'Eid ul Adha', tagline: 'Eid ul Adha Mubarak', urdu: 'عید الاضحیٰ مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-adha.jpg', bgGradient: 'linear-gradient(160deg,#33691e,#1b5e20)' },
  { id: 'ramadan', label: 'Ramadan Mubarak', tagline: 'Ramadan Mubarak', urdu: 'رمضان مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/ramadan.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#311b92)' },
  { id: 'jumma', label: 'Jumma Mubarak', tagline: 'Jumma Mubarak', urdu: 'جمعہ مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/jumma.jpg', bgGradient: 'linear-gradient(160deg,#004d40,#006064)' },
  { id: 'hajj', label: 'Hajj Mubarak', tagline: 'Hajj Mubarak', urdu: 'حج مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/hajj.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#795548)' },
  { id: 'umrah', label: 'Umrah Mubarak', tagline: 'Umrah Mubarak', urdu: 'عمرہ مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/umrah.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#bf8600)' },
  { id: 'milad', label: 'Milad-un-Nabi', tagline: 'Milad Mubarak', urdu: 'میلاد مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/milad.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#006064)' },

  // ACHIEVEMENTS
  { id: 'graduation', label: 'Graduation', tagline: 'Kamiyabi Mubarak', urdu: 'کامیابی مبارک', category: 'Achievements', icon: 'GraduationCap', bgImage: '/occasions/graduation.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'new-job', label: 'New Job', tagline: 'Naukri Mubarak', urdu: 'نوکری مبارک', category: 'Achievements', icon: 'Briefcase', bgImage: '/occasions/new-job.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'promotion', label: 'Promotion', tagline: 'Taraqqi Mubarak', urdu: 'ترقی مبارک', category: 'Achievements', icon: 'Award', bgImage: '/occasions/promotion.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#bf360c)' },
  { id: 'new-home', label: 'New Home', tagline: 'Ghar Mubarak', urdu: 'گھر مبارک', category: 'Achievements', icon: 'House', bgImage: '/occasions/new-home.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#795548)' },
  { id: 'business-launch', label: 'Business Launch', tagline: 'Mubarak ho', urdu: 'مبارک ہو', category: 'Achievements', icon: 'Rocket', bgImage: '/occasions/business-launch.jpg', bgGradient: 'linear-gradient(160deg,#0d47a1,#1565c0)' },
  { id: 'exam-pass', label: 'Result / Exam Pass', tagline: 'Kamiyabi Mubarak', urdu: 'کامیابی مبارک', category: 'Achievements', icon: 'ScrollText', bgImage: '/occasions/exam-pass.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#283593)' },

  // SEASONAL / NATIONAL
  { id: 'new-year', label: 'New Year', tagline: 'Naya Saal Mubarak', urdu: 'نیا سال مبارک', category: 'National', icon: 'Sparkles', bgImage: '/occasions/new-year.jpg', bgGradient: 'linear-gradient(160deg,#0d1b4c,#4a0e6b)' },
  { id: 'independence-day', label: 'Independence Day', tagline: 'Jashn-e-Azadi Mubarak', urdu: 'جشنِ آزادی مبارک', category: 'National', icon: 'Flag', bgImage: '/occasions/independence-day.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'kashmir-day', label: 'Kashmir Day', tagline: 'Yakjehti-e-Kashmir', urdu: 'یکجہتی کشمیر', category: 'National', icon: 'Flag', bgImage: '/occasions/kashmir-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'mothers-day', label: "Mother's Day", tagline: 'Maa ke naam', urdu: 'ماں کے نام', category: 'National', icon: 'Heart', bgImage: '/occasions/mothers-day.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#ad1457)' },
  { id: 'fathers-day', label: "Father's Day", tagline: 'Baba ke naam', urdu: 'بابا کے نام', category: 'National', icon: 'Heart', bgImage: '/occasions/fathers-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#37474f)' },
  { id: 'valentines', label: "Valentine's Day", tagline: 'Pyar ka din', urdu: 'محبت کا دن', category: 'National', icon: 'Heart', bgImage: '/occasions/valentines.jpg', bgGradient: 'linear-gradient(160deg,#b71c1c,#880e4f)' },
  { id: 'friendship-day', label: 'Friendship Day', tagline: 'Dosti Mubarak', urdu: 'دوستی مبارک', category: 'National', icon: 'Users', bgImage: '/occasions/friendship-day.jpg', bgGradient: 'linear-gradient(160deg,#e91e63,#ff9800)' },
  { id: 'basant', label: 'Basant / Spring', tagline: 'Basant Bahar Mubarak', urdu: 'بسنت بہار مبارک', category: 'National', icon: 'Flower2', bgImage: '/occasions/basant.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#388e3c)' },

  // FAMILY
  { id: 'condolence', label: 'Condolence', tagline: 'Inna lillahi wa inna ilayhi raji\u2019un', urdu: 'اِنّا لِلّٰہِ وَاِنّا اِلَیہِ رَاجِعُون', category: 'Family', icon: 'Sprout', bgImage: '/occasions/condolence.jpg', bgGradient: 'linear-gradient(160deg,#37474f,#455a64)' },
  { id: 'nikah', label: 'Nikah Mubarak', tagline: 'Nikah Mubarak', urdu: 'نکاح مبارک', category: 'Family', icon: 'Gem', bgImage: '/occasions/nikah.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#5d4037)' },
  { id: 'shaadi', label: 'Shaadi Mubarak', tagline: 'Shaadi Mubarak', urdu: 'شادی مبارک', category: 'Family', icon: 'Crown', bgImage: '/occasions/shaadi.jpg', bgGradient: 'linear-gradient(160deg,#8e0f24,#4a0510)' },
  { id: 'mehndi', label: 'Mehndi Mubarak', tagline: 'Mehndi Mubarak', urdu: 'مہندی مبارک', category: 'Family', icon: 'Flower2', bgImage: '/occasions/mehndi.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#f9a825)' },
]

export const OCCASIONS: Occasion[] = RAW_OCCASIONS.map(occ => {
  let soundCategory: 'dholki' | 'islamic' | 'festive' | 'somber' | 'default' = 'default'
  let patternOverlay = 'jashn-pattern-personal'
  let decorations: string[] = ['confetti']

  const cat = occ.category
  if (cat === 'Islamic') {
    soundCategory = 'islamic'
    patternOverlay = 'jashn-pattern-islamic'
    decorations = ['moon', 'star-cluster']
  } else if (cat === 'Family') {
    if (occ.id === 'condolence') {
      soundCategory = 'somber'
      patternOverlay = 'jashn-pattern-professional'
      decorations = ['foliage']
    } else {
      soundCategory = 'dholki'
      patternOverlay = 'jashn-pattern-wedding'
      decorations = ['dholak', 'shehnai', 'floral-borders']
    }
  } else if (cat === 'Personal') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-personal'
    decorations = occ.id === 'anniversary' || occ.id === 'miss-you' ? ['heart', 'sparkles'] : ['confetti', 'balloons']
  } else if (cat === 'Achievements') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-professional'
    decorations = ['achievement-badge', 'star-cluster']
  } else if (cat === 'National') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-personal'
    decorations = occ.id === 'basant' ? ['kite', 'flowers'] : ['star-cluster', 'sparkles']
  }

  // ── Per-occasion rich default gradient ──────────────────────────────────
  const OCCASION_DEFAULTS: Record<string, string> = {
    // Personal
    birthday:        'linear-gradient(150deg,#3a0070 0%,#7b1fa2 45%,#1a237e 100%)',
    anniversary:     'linear-gradient(150deg,#6a0035 0%,#ad1457 50%,#4a148c 100%)',
    'new-baby':      'linear-gradient(150deg,#7b3fa0 0%,#e91e9a 50%,#f06292 100%)',
    'get-well-soon': 'linear-gradient(150deg,#004d7a 0%,#1565c0 50%,#00695c 100%)',
    farewell:        'linear-gradient(150deg,#1c2a38 0%,#37474f 50%,#263238 100%)',
    congratulations: 'linear-gradient(150deg,#7f2700 0%,#e65100 50%,#c43e00 100%)',
    'thank-you':     'linear-gradient(150deg,#1b3a20 0%,#2e7d32 50%,#1a5c1e 100%)',
    'miss-you':      'linear-gradient(150deg,#5c0030 0%,#ad1457 50%,#4a148c 100%)',
    'good-luck':     'linear-gradient(150deg,#7f4c00 0%,#ef6c00 50%,#f9a825 100%)',
    'welcome-back':  'linear-gradient(150deg,#004d40 0%,#00695c 50%,#0d47a1 100%)',
    // Islamic
    'eid-ul-fitr':   'linear-gradient(150deg,#0a2e0f 0%,#1b5e20 50%,#33691e 100%)',
    'eid-ul-adha':   'linear-gradient(150deg,#1a3d00 0%,#33691e 50%,#1b5e20 100%)',
    ramadan:         'linear-gradient(150deg,#0d1040 0%,#1a237e 50%,#311b92 100%)',
    jumma:           'linear-gradient(150deg,#002018 0%,#004d40 50%,#005f50 100%)',
    hajj:            'linear-gradient(150deg,#3d2c00 0%,#795548 50%,#bf8600 100%)',
    umrah:           'linear-gradient(150deg,#2c1a12 0%,#4e342e 50%,#a07000 100%)',
    milad:           'linear-gradient(150deg,#0d1040 0%,#1a237e 50%,#004d40 100%)',
    // Achievements
    graduation:      'linear-gradient(150deg,#0a0e3a 0%,#1a237e 50%,#0d47a1 100%)',
    'new-job':       'linear-gradient(150deg,#0a2010 0%,#1b5e20 50%,#2e7d32 100%)',
    promotion:       'linear-gradient(150deg,#5a1800 0%,#bf360c 50%,#e65100 100%)',
    'new-home':      'linear-gradient(150deg,#1c100a 0%,#4e342e 50%,#6d4c41 100%)',
    'business-launch':'linear-gradient(150deg,#050e2e 0%,#0d47a1 50%,#1565c0 100%)',
    'exam-pass':     'linear-gradient(150deg,#0a0e3a 0%,#283593 50%,#3949ab 100%)',
    // National
    'new-year':      'linear-gradient(150deg,#060d28 0%,#0d1b4c 50%,#3a0860 100%)',
    'independence-day':'linear-gradient(150deg,#0a2010 0%,#1b5e20 60%,#2e7d32 100%)',
    'kashmir-day':   'linear-gradient(150deg,#060e2e 0%,#1a237e 55%,#0d47a1 100%)',
    'mothers-day':   'linear-gradient(150deg,#5c0028 0%,#880e4f 50%,#c2185b 100%)',
    'fathers-day':   'linear-gradient(150deg,#0c1428 0%,#1a237e 50%,#2d3a50 100%)',
    valentines:      'linear-gradient(150deg,#5c0008 0%,#b71c1c 50%,#880e4f 100%)',
    'friendship-day':'linear-gradient(150deg,#8c0040 0%,#e91e63 50%,#ff6f00 100%)',
    basant:          'linear-gradient(150deg,#5a4000 0%,#f9a825 50%,#2e6b1a 100%)',
    // Family
    condolence:      'linear-gradient(150deg,#1a1a1a 0%,#37474f 50%,#263238 100%)',
    nikah:           'linear-gradient(150deg,#3d2800 0%,#bf8600 50%,#5d4037 100%)',
    shaadi:          'linear-gradient(150deg,#3a0008 0%,#8e0f24 50%,#4a0510 100%)',
    mehndi:          'linear-gradient(150deg,#0f3010 0%,#2e7d32 50%,#c07800 100%)',
  }

  const defaultGradient = OCCASION_DEFAULTS[occ.id] || occ.bgGradient || 'linear-gradient(150deg,#1a237e,#7b1fa2)'
  const baseVariant = { id: 'default', name: occ.label + ' Classic', bgGradient: defaultGradient }

  let bgVariants: { id: string; name: string; bgGradient: string; bgImage?: string }[] = [baseVariant]

  if (cat === 'Islamic') {
    bgVariants.push(
      { id: 'islamic-emerald',  name: 'Emerald Garden',   bgGradient: 'linear-gradient(150deg,#042010 0%,#0a3d1f 50%,#1b5e20 100%)' },
      { id: 'islamic-royal',    name: 'Royal Night',      bgGradient: 'linear-gradient(150deg,#04091a 0%,#0d1b4c 50%,#1a237e 100%)' },
      { id: 'islamic-crimson',  name: 'Mughal Crimson',   bgGradient: 'linear-gradient(150deg,#280006 0%,#5c0010 50%,#8e0f24 100%)' },
      { id: 'islamic-teal',     name: 'Deep Teal',        bgGradient: 'linear-gradient(150deg,#001a16 0%,#004d40 50%,#006064 100%)' },
      { id: 'islamic-gold',     name: 'Amber Dusk',       bgGradient: 'linear-gradient(150deg,#2a1800 0%,#6d4c00 50%,#bf8600 100%)' },
      { id: 'islamic-ivory',    name: 'Ivory Shahi',      bgGradient: 'linear-gradient(150deg,#e8dcc8 0%,#f3e9d2 50%,#e4d3aa 100%)' },
      { id: 'islamic-obsidian', name: 'Obsidian & Emerald', bgGradient: 'linear-gradient(150deg,#09090b 0%,#022c22 55%,#059669 100%)' },
      { id: 'islamic-midnight-gold', name: 'Midnight & Gold', bgGradient: 'linear-gradient(150deg,#030712 0%,#1e1b4b 55%,#d97706 100%)' },
      { id: 'islamic-lavender-glow', name: 'Lavender Glow', bgGradient: 'linear-gradient(150deg,#17052e 0%,#3b0764 50%,#c084fc 100%)' }
    )
  } else if (cat === 'Family') {
    if (occ.id === 'condolence') {
      bgVariants.push(
        { id: 'somber-slate',   name: 'Slate Dusk',       bgGradient: 'linear-gradient(150deg,#0e1215 0%,#263238 50%,#37474f 100%)' },
        { id: 'somber-navy',    name: 'Midnight Peace',   bgGradient: 'linear-gradient(150deg,#020510 0%,#050a26 50%,#0d1b4c 100%)' },
        { id: 'somber-charcoal',name: 'Charcoal',         bgGradient: 'linear-gradient(150deg,#111111 0%,#1c1c1c 50%,#2a2a2a 100%)' },
      )
    } else {
      bgVariants.push(
        { id: 'wedding-crimson',name: 'Crimson Velvet',   bgGradient: 'linear-gradient(150deg,#200005 0%,#4a0510 50%,#8e0f24 100%)' },
        { id: 'wedding-gold',   name: 'Mughal Gold',      bgGradient: 'linear-gradient(150deg,#2a1800 0%,#5d4037 50%,#bf8600 100%)' },
        { id: 'wedding-teal',   name: 'Feroza Teal',      bgGradient: 'linear-gradient(150deg,#001a16 0%,#004d40 50%,#006064 100%)' },
        { id: 'wedding-plum',   name: 'Royal Plum',       bgGradient: 'linear-gradient(150deg,#180030 0%,#4a148c 50%,#7b1fa2 100%)' },
        { id: 'wedding-rose',   name: 'Rose Gold',        bgGradient: 'linear-gradient(150deg,#3a0018 0%,#880e4f 50%,#c2185b 100%)' },
        { id: 'wedding-indigo', name: 'Indigo & Gold',    bgGradient: 'linear-gradient(150deg,#06082e 0%,#1a237e 50%,#8a6000 100%)' },
        { id: 'wedding-emerald-gold', name: 'Emerald & Gold', bgGradient: 'linear-gradient(150deg,#0a2e16 0%,#1e3d2f 50%,#d97706 100%)' },
        { id: 'wedding-velvet-night', name: 'Midnight Rose', bgGradient: 'linear-gradient(150deg,#2e0515 0%,#500724 50%,#b45309 100%)' },
        { id: 'wedding-royal-platinum', name: 'Navy & Silver', bgGradient: 'linear-gradient(150deg,#090d16 0%,#1e293b 55%,#94a3b8 100%)' }
      )
    }
  } else if (cat === 'Achievements') {
    bgVariants.push(
      { id: 'achieve-navy',    name: 'Navy Pride',        bgGradient: 'linear-gradient(150deg,#030818 0%,#0d1b4c 50%,#1a237e 100%)' },
      { id: 'achieve-emerald', name: 'Emerald Success',   bgGradient: 'linear-gradient(150deg,#051408 0%,#1b5e20 50%,#004d40 100%)' },
      { id: 'achieve-bronze',  name: 'Bronze & Dark',     bgGradient: 'linear-gradient(150deg,#100806 0%,#2c1a12 50%,#4e342e 100%)' },
      { id: 'achieve-steel',   name: 'Steel Slate',       bgGradient: 'linear-gradient(150deg,#0e1520 0%,#1a237e 50%,#37474f 100%)' },
      { id: 'achieve-gold',    name: 'Gold Rush',         bgGradient: 'linear-gradient(150deg,#3d2800 0%,#7a5000 50%,#bf8600 100%)' },
      { id: 'achieve-deep-space', name: 'Obsidian Navy', bgGradient: 'linear-gradient(150deg,#09090b 0%,#172554 50%,#3b82f6 100%)' },
      { id: 'achieve-platinum-gold', name: 'Platinum & Gold', bgGradient: 'linear-gradient(150deg,#18181b 0%,#27272a 50%,#ca8a04 100%)' },
      { id: 'achieve-magenta-glow', name: 'Deep Magenta', bgGradient: 'linear-gradient(150deg,#1a001a 0%,#4c0519 50%,#be185d 100%)' }
    )
  } else if (cat === 'National') {
    bgVariants.push(
      { id: 'national-deep',   name: 'Deep Indigo',       bgGradient: 'linear-gradient(150deg,#04091a 0%,#0d1b4c 50%,#1a237e 100%)' },
      { id: 'national-forest', name: 'Forest Green',      bgGradient: 'linear-gradient(150deg,#051408 0%,#1b5e20 50%,#2e7d32 100%)' },
      { id: 'national-plum',   name: 'Plum Night',        bgGradient: 'linear-gradient(150deg,#180030 0%,#4a0e6b 50%,#7b1fa2 100%)' },
      { id: 'national-rose',   name: 'Rose Dusk',         bgGradient: 'linear-gradient(150deg,#3a0018 0%,#880e4f 50%,#c2185b 100%)' },
      { id: 'national-amber',  name: 'Amber Glow',        bgGradient: 'linear-gradient(150deg,#3d2000 0%,#bf6000 50%,#f9a825 100%)' },
      { id: 'national-midnight-green', name: 'Midnight & Forest', bgGradient: 'linear-gradient(150deg,#022c22 0%,#064e3b 50%,#10b981 100%)' },
      { id: 'national-cyber-glow', name: 'Cyber Indigo', bgGradient: 'linear-gradient(150deg,#09090b 0%,#1e1b4b 55%,#6366f1 100%)' }
    )
  } else {
    // Personal / fallback
    bgVariants.push(
      { id: 'festive-violet',  name: 'Deep Violet',       bgGradient: 'linear-gradient(150deg,#180030 0%,#4a148c 50%,#7b1fa2 100%)' },
      { id: 'festive-rose',    name: 'Crimson Rose',      bgGradient: 'linear-gradient(150deg,#3a0018 0%,#880e4f 50%,#c2185b 100%)' },
      { id: 'festive-teal',    name: 'Deep Teal',         bgGradient: 'linear-gradient(150deg,#001a16 0%,#004d40 50%,#006064 100%)' },
      { id: 'festive-navy',    name: 'Midnight Navy',     bgGradient: 'linear-gradient(150deg,#030818 0%,#0d1b4c 50%,#1565c0 100%)' },
      { id: 'festive-amber',   name: 'Amber Sunset',      bgGradient: 'linear-gradient(150deg,#3d1c00 0%,#bf4e00 50%,#f9a825 100%)' },
      { id: 'festive-aurora',  name: 'Aurora Teal',       bgGradient: 'linear-gradient(150deg,#030712 0%,#111827 50%,#0d9488 100%)' },
      { id: 'festive-peach-cream', name: 'Peach & Cream', bgGradient: 'linear-gradient(150deg,#4c0519 0%,#881337 55%,#fbcfe8 100%)' },
      { id: 'festive-midnight-glimmer', name: 'Midnight Glimmer', bgGradient: 'linear-gradient(150deg,#09090b 0%,#172554 50%,#60a5fa 100%)' }
    )
  }

  return {
    ...occ,
    soundCategory,
    patternOverlay,
    decorations,
    bgVariants
  }
})

export const OCCASION_CATEGORIES = [
  'Personal',
  'Islamic',
  'Achievements',
  'National',
  'Family',
] as const

export function getOccasion(id: string | undefined): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id)
}

/** Pre-written templates per occasion. Falls back to a generic set. */
export const MESSAGE_TEMPLATES: Record<string, MessageTemplate[]> = {
  birthday: [
    { en: 'Wishing you a day full of love, laughter and cake. May Allah bless you with health and happiness always!', ur: 'آپ کو سالگرہ بہت بہت مبارک ہو۔ اللہ آپ کو لمبی عمر، صحت اور خوشیاں عطا فرمائے۔ آمین' },
    { en: 'Another year wiser and brighter! May all your dreams come true this year. Happy Birthday!', ur: 'سالگرہ مبارک ہو! اللہ کرے آپ کی ہر خواہش پوری ہو اور زندگی خوشیوں سے بھری رہے۔' },
  ],
  anniversary: [
    { en: 'Happy Anniversary! May your bond grow stronger and your love deeper with every passing year.', ur: 'سالگرہِ شادی مبارک ہو! اللہ آپ دونوں کو ہمیشہ خوش و خرم رکھے۔' },
  ],
  'new-baby': [
    { en: 'Mubarak ho! May this little angel fill your home with endless joy and blessings.', ur: 'مبارک ہو! اللہ اس ننھے مہمان کو صحت اور لمبی عمر عطا فرمائے۔' },
  ],
  'get-well-soon': [
    { en: 'Get well soon! Praying for your speedy recovery and good health. We miss your smile.', ur: 'جلد صحت یاب ہو جائیں۔ اللہ آپ کو شفائے کاملہ عطا فرمائے۔ آمین' },
  ],
  farewell: [
    { en: 'Farewell, my friend. The memories we made will stay forever. Wishing you success ahead!', ur: 'الوداع! آپ کے ساتھ گزرے لمحے ہمیشہ یاد رہیں گے۔ آگے کی منزلیں مبارک ہوں۔' },
  ],
  congratulations: [
    { en: 'Congratulations! Your hard work has truly paid off. So proud of you!', ur: 'مبارک ہو! آپ کی محنت رنگ لائی۔ ہمیں آپ پر فخر ہے۔' },
  ],
  'thank-you': [
    { en: 'Thank you from the bottom of my heart. Your kindness means the world to me.', ur: 'دل کی گہرائیوں سے شکریہ۔ آپ کی محبت اور مہربانی کا کوئی بدل نہیں۔' },
  ],
  'miss-you': [
    { en: 'Missing you more than words can say. Hope to see you very soon, my dear.', ur: 'آپ کی بہت یاد آتی ہے۔ جلد ملاقات کی امید ہے۔' },
  ],
  'good-luck': [
    { en: 'Best of luck! May Allah make every step easy and crown your efforts with success.', ur: 'اللہ آپ کو کامیابی عطا فرمائے۔ بہترین دعاؤں کے ساتھ — گڈ لک!' },
  ],
  'welcome-back': [
    { en: 'Welcome back! We have missed you dearly. So happy to have you here again.', ur: 'خوش آمدید! آپ کی واپسی پر بہت خوشی ہوئی۔' },
  ],
  'eid-ul-fitr': [
    { en: 'Eid Mubarak! May this blessed day bring joy, peace and prosperity to you and your family.', ur: 'عید مبارک! اللہ یہ مبارک دن آپ کے لیے خوشیوں اور برکتوں کا باعث بنائے۔' },
  ],
  'eid-ul-adha': [
    { en: 'Eid ul Adha Mubarak! May your sacrifices be accepted and your home filled with blessings.', ur: 'عید الاضحیٰ مبارک! اللہ آپ کی قربانی قبول فرمائے۔ آمین' },
  ],
  ramadan: [
    { en: 'Ramadan Mubarak! May this holy month bring countless blessings and forgiveness your way.', ur: 'رمضان مبارک! اللہ اس مبارک مہینے کی برکتیں آپ پر نازل فرمائے۔' },
  ],
  jumma: [
    { en: 'Jumma Mubarak! May this blessed Friday fill your heart with peace and your duas be accepted.', ur: 'جمعہ مبارک! اللہ آپ کی تمام دعائیں قبول فرمائے۔' },
  ],
  hajj: [
    { en: 'Hajj Mubarak! May Allah accept your pilgrimage and reward you abundantly.', ur: 'حج مبارک! اللہ آپ کا حج قبول فرمائے۔ حجِ مبرور نصیب ہو۔' },
  ],
  umrah: [
    { en: 'Umrah Mubarak! May your journey be accepted and your prayers answered.', ur: 'عمرہ مبارک! اللہ آپ کا عمرہ قبول فرمائے۔' },
  ],
  graduation: [
    { en: 'Congratulations on your graduation! Your dedication has earned this proud moment. Onward to greater heights!', ur: 'کامیابی مبارک ہو! آپ کی محنت رنگ لائی۔ آگے کی منزلیں مبارک ہوں۔' },
  ],
  'new-job': [
    { en: 'Naukri Mubarak! Wishing you success and growth in this exciting new chapter.', ur: 'نوکری مبارک ہو! اللہ اس نئے سفر کو آپ کے لیے کامیاب بنائے۔' },
  ],
  promotion: [
    { en: 'Taraqqi Mubarak! Well deserved. May you keep rising higher and higher.', ur: 'ترقی مبارک ہو! اللہ آپ کو مزید کامیابیاں عطا فرمائے۔' },
  ],
  'new-home': [
    { en: 'Ghar Mubarak! May your new home be blessed with love, laughter and endless happiness.', ur: 'گھر مبارک ہو! اللہ اس گھر کو خوشیوں اور برکتوں سے بھر دے۔' },
  ],
  'business-launch': [
    { en: 'Congratulations on your new venture! May your business flourish and bring great success.', ur: 'نئے کاروبار کی مبارکباد! اللہ آپ کے کاروبار میں برکت عطا فرمائے۔' },
  ],
  'exam-pass': [
    { en: 'Congratulations on your result! Your hard work truly paid off. So proud of you!', ur: 'نتیجہ مبارک ہو! آپ کی محنت کامیاب ہوئی۔ مبارک ہو!' },
  ],
  'new-year': [
    { en: 'Happy New Year! May this year bring you new hopes, fresh starts and beautiful moments.', ur: 'نیا سال مبارک ہو! اللہ یہ سال آپ کے لیے خوشیوں بھرا بنائے۔' },
  ],
  'independence-day': [
    { en: 'Happy Independence Day! Proud to be Pakistani. Pakistan Zindabad!', ur: 'جشنِ آزادی مبارک ہو! پاکستان زندہ باد۔' },
  ],
  'kashmir-day': [
    { en: 'Standing in solidarity with our Kashmiri brothers and sisters. Kashmir Banega Pakistan.', ur: 'یومِ یکجہتی کشمیر — ہم اپنے کشمیری بھائیوں کے ساتھ ہیں۔' },
  ],
  'mothers-day': [
    { en: 'Happy Mother\u2019s Day to the heart of our family. Your love is our greatest blessing.', ur: 'ماں کے نام — آپ کی محبت ہماری سب سے بڑی دولت ہے۔ مدرز ڈے مبارک۔' },
  ],
  'fathers-day': [
    { en: 'Happy Father\u2019s Day to my hero. Thank you for everything you do for us.', ur: 'بابا کے نام — آپ ہمارے ہیرو ہیں۔ فادرز ڈے مبارک۔' },
  ],
  valentines: [
    { en: 'You are my today and all of my tomorrows. Happy Valentine\u2019s Day, my love.', ur: 'تم میرا آج اور میری ہر آنے والی صبح ہو۔ ویلنٹائن مبارک۔' },
  ],
  'friendship-day': [
    { en: 'Happy Friendship Day! Grateful for a friend like you who makes life brighter.', ur: 'دوستی مبارک! آپ جیسے دوست کا ساتھ ایک نعمت ہے۔' },
  ],
  condolence: [
    { en: 'Our deepest condolences. May the departed soul rest in eternal peace and the family find strength.', ur: 'اِنّا لِلّٰہِ وَاِنّا اِلَیہِ رَاجِعُون۔ اللہ مرحوم کی مغفرت فرمائے اور لواحقین کو صبر عطا فرمائے۔' },
  ],
  nikah: [
    { en: 'Nikah Mubarak! May Allah bless this sacred union with love, mercy and lifelong companionship.', ur: 'نکاح مبارک ہو! اللہ اس مقدس رشتے میں محبت اور برکت عطا فرمائے۔' },
  ],
  shaadi: [
    { en: 'Shaadi Mubarak! Wishing the happy couple a lifetime of love and togetherness.', ur: 'شادی مبارک ہو! اللہ جوڑے کو ہمیشہ خوش و خرم رکھے۔' },
  ],
  basant: [
    { en: 'Wishing you a joyful Basant filled with colorful kites, spring blossoms, and happiness!', ur: 'بسنت اور بہار کا موسم آپ کے لیے خوشیاں اور رنگارنگ مسکراہٹیں لے کر آئے۔ بسنت مبارک!' }
  ],
  mehndi: [
    { en: 'Wishing you a night filled with colorful mehndi, music, and beautiful celebrations!', ur: 'مہندی کی یہ رنگارنگ رات آپ کی زندگی کو خوشیوں اور مسکراہٹوں سے سجا دے۔ مہندی مبارک!' }
  ],
  milad: [
    { en: 'Wishing you and your family a blessed Eid Milad-un-Nabi. May peace and blessings be upon you.', ur: 'عید میلاد النبی مبارک ہو! اللہ تعالیٰ آپ کو حضور اکرم ﷺ کے صدقے ڈھیروں رحمتیں اور برکتیں عطا فرمائے۔' }
  ],
}

const GENERIC_TEMPLATES: MessageTemplate[] = [
  { en: 'Sending you my warmest wishes on this special occasion!', ur: 'اس خاص موقع پر آپ کو دلی مبارکباد!' },
]

export function getTemplates(occasionId: string | undefined): MessageTemplate[] {
  if (!occasionId) return GENERIC_TEMPLATES
  return MESSAGE_TEMPLATES[occasionId] ?? GENERIC_TEMPLATES
}
