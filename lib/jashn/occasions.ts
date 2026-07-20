import type { Occasion, MessageTemplate } from './types'

const RAW_OCCASIONS: any[] = [
  // PERSONAL & MILESTONES
  { id: 'birthday', label: 'Birthday', tagline: 'Happy Birthday', category: 'Personal', icon: 'Cake', bgImage: '/occasions/birthday.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#7b1fa2)' },
  { id: 'milestone-birthday', label: 'Milestone Birthday (18th/21st/50th)', tagline: 'Cheers to Your Special Year', category: 'Personal', icon: 'Trophy', bgGradient: 'linear-gradient(160deg,#4c0519,#be185d)' },
  { id: 'anniversary', label: 'Anniversary', tagline: 'Happy Anniversary', category: 'Personal', icon: 'Heart', bgImage: '/occasions/anniversary.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#4a148c)' },
  { id: 'golden-anniversary', label: 'Golden Jubilee (50th Anniversary)', tagline: '50 Golden Years of Love', category: 'Personal', icon: 'Crown', bgGradient: 'linear-gradient(160deg,#451a03,#eab308)' },
  { id: 'new-baby', label: 'New Baby', tagline: 'Welcome Little One', category: 'Personal', icon: 'Baby', bgImage: '/occasions/new-baby.jpg', bgGradient: 'linear-gradient(160deg,#f48fb1,#ce93d8)' },
  { id: 'gender-reveal', label: 'Gender Reveal / Baby News', tagline: 'It’s a Special Surprise!', category: 'Personal', icon: 'Baby', bgGradient: 'linear-gradient(160deg,#1e1b4b,#ec4899)' },
  { id: 'get-well-soon', label: 'Get Well Soon', tagline: 'Wishing You a Speedy Recovery', category: 'Personal', icon: 'HeartPulse', bgImage: '/occasions/get-well-soon.jpg', bgGradient: 'linear-gradient(160deg,#1565c0,#00897b)' },
  { id: 'sympathy', label: 'Deepest Sympathy', tagline: 'In Loving Memory & Thoughts', category: 'Personal', icon: 'HeartHandshake', bgGradient: 'linear-gradient(160deg,#09090b,#3f3f46)' },
  { id: 'farewell', label: 'Farewell & Bon Voyage', tagline: 'Wishing You the Best Ahead', category: 'Personal', icon: 'Plane', bgImage: '/occasions/farewell.jpg', bgGradient: 'linear-gradient(160deg,#37474f,#546e7a)' },
  { id: 'congratulations', label: 'Congratulations', tagline: 'Warmest Congratulations!', category: 'Personal', icon: 'PartyPopper', bgImage: '/occasions/congratulations.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#f57f17)' },
  { id: 'thank-you', label: 'Thank You', tagline: 'With Gratitude & Thanks', category: 'Personal', icon: 'Gift', bgImage: '/occasions/thank-you.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#558b2f)' },
  { id: 'miss-you', label: 'Miss You', tagline: 'Thinking of You Always', category: 'Personal', icon: 'HandHeart', bgImage: '/occasions/miss-you.jpg', bgGradient: 'linear-gradient(160deg,#ad1457,#6a1b9a)' },
  { id: 'good-luck', label: 'Good Luck & Best Wishes', tagline: 'Best of Luck in Everything', category: 'Personal', icon: 'Sparkles', bgImage: '/occasions/good-luck.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#ef6c00)' },
  { id: 'welcome-back', label: 'Welcome Back', tagline: 'So Happy to Have You Back', category: 'Personal', icon: 'Sprout', bgImage: '/occasions/welcome-back.jpg', bgGradient: 'linear-gradient(160deg,#00695c,#1565c0)' },
  { id: 'retirement', label: 'Happy Retirement', tagline: 'Cheers to Your Golden Years', category: 'Personal', icon: 'Palmtree', bgGradient: 'linear-gradient(160deg,#0c4a6e,#f59e0b)' },

  // GLOBAL CELEBRATIONS & HOLIDAYS
  { id: 'christmas', label: 'Christmas', tagline: 'Merry Christmas & Happy Holidays', category: 'Universal', icon: 'TreePine', bgImage: '/occasions/birthday.jpg', bgGradient: 'linear-gradient(160deg,#b71c1c,#2e7d32)' },
  { id: 'new-year', label: 'New Year', tagline: 'Happy New Year 2026', category: 'Universal', icon: 'Sparkles', bgImage: '/occasions/new-year.jpg', bgGradient: 'linear-gradient(160deg,#0d1b4c,#4a0e6b)' },
  { id: 'thanksgiving', label: 'Thanksgiving', tagline: 'Happy Thanksgiving', category: 'Universal', icon: 'Utensils', bgGradient: 'linear-gradient(160deg,#3e1c00,#d97706)' },
  { id: 'halloween', label: 'Halloween', tagline: 'Spooktacular Halloween', category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#180b28,#ea580c)' },
  { id: 'easter', label: 'Easter', tagline: 'Happy Easter Blessings', category: 'Universal', icon: 'Egg', bgGradient: 'linear-gradient(160deg,#2e1065,#c084fc)' },
  { id: 'diwali', label: 'Diwali', tagline: 'Happy Diwali & Festival of Lights', category: 'Universal', icon: 'Flame', bgGradient: 'linear-gradient(160deg,#451a03,#d97706)' },
  { id: 'hanukkah', label: 'Hanukkah', tagline: 'Happy Hanukkah', category: 'Universal', icon: 'Star', bgGradient: 'linear-gradient(160deg,#0f172a,#1d4ed8)' },
  { id: 'lunar-new-year', label: 'Lunar New Year', tagline: 'Happy Lunar New Year', category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#450a0a,#dc2626)' },
  { id: 'valentines', label: "Valentine's Day", tagline: 'Happy Valentine’s Day', category: 'Universal', icon: 'Heart', bgImage: '/occasions/valentines.jpg', bgGradient: 'linear-gradient(160deg,#b71c1c,#880e4f)' },
  { id: 'mothers-day', label: "Mother's Day", tagline: 'Happy Mother’s Day', category: 'Universal', icon: 'Heart', bgImage: '/occasions/mothers-day.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#ad1457)' },
  { id: 'fathers-day', label: "Father's Day", tagline: 'Happy Father’s Day', category: 'Universal', icon: 'Heart', bgImage: '/occasions/fathers-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#37474f)' },
  { id: 'st-patricks-day', label: "St. Patrick's Day", tagline: 'Happy St. Patrick’s Day', category: 'Universal', icon: 'Clover', bgGradient: 'linear-gradient(160deg,#022c22,#059669)' },
  { id: 'earth-day', label: 'Earth Day & Spring', tagline: 'Happy Earth Day & Happy Spring', category: 'Universal', icon: 'Globe', bgGradient: 'linear-gradient(160deg,#064e3b,#0d9488)' },
  { id: 'friendship-day', label: 'Friendship Day', tagline: 'Happy Friendship Day', category: 'Universal', icon: 'Users', bgImage: '/occasions/friendship-day.jpg', bgGradient: 'linear-gradient(160deg,#e91e63,#ff9800)' },

  // ISLAMIC & RELIGIOUS
  { id: 'eid-ul-fitr', label: 'Eid ul Fitr', tagline: 'Eid Mubarak', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-fitr.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#33691e)' },
  { id: 'eid-ul-adha', label: 'Eid ul Adha', tagline: 'Eid ul Adha Mubarak', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-adha.jpg', bgGradient: 'linear-gradient(160deg,#33691e,#1b5e20)' },
  { id: 'ramadan', label: 'Ramadan Mubarak', tagline: 'Ramadan Mubarak', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/ramadan.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#311b92)' },
  { id: 'jumma', label: 'Jumma Mubarak', tagline: 'Jumma Mubarak', category: 'Islamic', icon: 'Star', bgImage: '/occasions/jumma.jpg', bgGradient: 'linear-gradient(160deg,#004d40,#006064)' },
  { id: 'hajj', label: 'Hajj Mubarak', tagline: 'Hajj Mubarak', category: 'Islamic', icon: 'Star', bgImage: '/occasions/hajj.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#795548)' },
  { id: 'umrah', label: 'Umrah Mubarak', tagline: 'Umrah Mubarak', category: 'Islamic', icon: 'Star', bgImage: '/occasions/umrah.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#bf8600)' },
  { id: 'milad', label: 'Milad-un-Nabi', tagline: 'Milad Mubarak', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/milad.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#006064)' },

  // ACHIEVEMENTS
  { id: 'graduation', label: 'Graduation', tagline: 'Congratulations Graduate!', category: 'Achievements', icon: 'GraduationCap', bgImage: '/occasions/graduation.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'new-job', label: 'New Job', tagline: 'Congratulations on Your New Job', category: 'Achievements', icon: 'Briefcase', bgImage: '/occasions/new-job.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'promotion', label: 'Promotion', tagline: 'Congratulations on Your Promotion', category: 'Achievements', icon: 'Award', bgImage: '/occasions/promotion.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#bf360c)' },
  { id: 'new-home', label: 'New Home / Housewarming', tagline: 'Congratulations on Your New Home', category: 'Achievements', icon: 'House', bgImage: '/occasions/new-home.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#795548)' },
  { id: 'business-launch', label: 'Business Launch', tagline: 'Wishing Your Business Great Success', category: 'Achievements', icon: 'Rocket', bgImage: '/occasions/business-launch.jpg', bgGradient: 'linear-gradient(160deg,#0d47a1,#1565c0)' },
  { id: 'exam-pass', label: 'Result / Exam Pass', tagline: 'Congratulations on Passing!', category: 'Achievements', icon: 'ScrollText', bgImage: '/occasions/exam-pass.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#283593)' },

  // SEASONAL & NATIONAL
  { id: 'independence-day', label: 'Independence Day', tagline: 'Happy Independence Day', category: 'National', icon: 'Flag', bgImage: '/occasions/independence-day.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'kashmir-day', label: 'Kashmir Solidarity Day', tagline: 'Kashmir Solidarity Day', category: 'National', icon: 'Flag', bgImage: '/occasions/kashmir-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'basant', label: 'Basant / Spring Festival', tagline: 'Basant Bahar Mubarak', category: 'National', icon: 'Flower2', bgImage: '/occasions/basant.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#388e3c)' },

  // FAMILY
  { id: 'nikah', label: 'Nikah Mubarak', tagline: 'Nikah Mubarak', category: 'Family', icon: 'Gem', bgImage: '/occasions/nikah.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#5d4037)' },
  { id: 'shaadi', label: 'Shaadi Mubarak', tagline: 'Shaadi Mubarak', category: 'Family', icon: 'Crown', bgImage: '/occasions/shaadi.jpg', bgGradient: 'linear-gradient(160deg,#8e0f24,#4a0510)' },
  { id: 'mehndi', label: 'Mehndi Mubarak', tagline: 'Mehndi Mubarak', category: 'Family', icon: 'Flower2', bgImage: '/occasions/mehndi.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#f9a825)' },
  { id: 'baby-shower', label: 'Baby Shower', tagline: 'Congratulations Baby Shower!', category: 'Family', icon: 'Baby', bgImage: '/occasions/new-baby.jpg', bgGradient: 'linear-gradient(160deg,#f48fb1,#81d4fa)' },
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
    soundCategory = 'dholki'
    patternOverlay = 'jashn-pattern-wedding'
    decorations = ['dholak', 'shehnai', 'floral-borders']
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
  } else if (cat === 'Universal') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-personal'
    decorations = occ.id === 'christmas' ? ['star-cluster', 'sparkles'] : ['confetti', 'balloons']
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
  'Universal',
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
  'birthday': [
    { en: "Wishing you a day full of love, laughter and cake. May Allah bless you with health and happiness always!", ur: "آپ کو سالگرہ بہت بہت مبارک ہو۔ اللہ آپ کو لمبی عمر، صحت اور خوشیاں عطا فرمائے۔ آمین", es: "¡Te deseo un día lleno de amor, risas y pastel! ¡Que Dios te bendiga siempre con salud y felicidad!", fr: "Je vous souhaite une journée pleine d'amour, de rires et de gâteau. Que Dieu vous bénisse toujours !", ar: "أتمنى لك يوماً مليئاً بالحب والضحك والسعادة. بارك الله فيك بالصحة والعافية دائماً!", hi: "आपको प्यार, हंसी और केक से भरे दिन की शुभकामनाएं। ईश्वर आपको हमेशा स्वास्थ्य और खुशी प्रदान करे!", zh: "祝您度过充满爱、欢笑和蛋糕的一天。愿上天永远赐予您健康与幸福！", pt: "Desejo a você um dia cheio de amor, risadas e bolo. Que Deus te abençoe com saúde e felicidade sempre!", ru: "Желаю дня, полного любви, смеха и торта! Пусть Бог всегда дарует вам здоровье и счастье!", de: "Ich wünsche dir einen Tag voller Liebe, Lachen und Kuchen. Möge Gott dich immer segnen!", ja: "愛と笑顔とケーキに満ちた素晴らしい一日になりますように。素晴らしい健康と幸せをお祈りします！", ko: "사랑과 웃음, 케이크로 가득한 하루가 되기를 바랍니다. 항상 건강과 행복이 가득하기를 기원합니다!", it: "Ti auguro una giornata piena d'amore, risate e torta. Che Dio ti benedica sempre con salute e felicità!", tr: "Sevgi, kahkaha ve pasta dolu bir gün dilerim. Allah sana her zaman sağlık ve mutluluk versin!", id: "Semoga hari Anda penuh dengan cinta, tawa, dan kue. Semoga Tuhan selalu memberkati Anda dengan kesehatan dan kebahagiaan!", bn: "ভালোবাসা, হাসি এবং কেক ভরা একটি দিনের শুভেচ্ছা। আল্লাহ সর্বদা আপনাকে স্বাস্থ্য ও সুখ দান করুন!", vi: "Chúc bạn một ngày tràn ngập tình yêu, tiếng cười và bánh ngọt. Chúc bạn luôn khỏe mạnh và hạnh phúc!", sw: "Nakutakia siku iliyojaa upendo, kicheko na keki. Mungu akubariki na afya na furaha siku zote!" },
    { en: "Another year wiser and brighter! May all your dreams come true this year. Happy Birthday!", ur: "سالگرہ مبارک ہو! اللہ کرے آپ کی ہر خواہش پوری ہو اور زندگی خوشیوں سے بھری رہے۔", es: "¡Un año más sabio y brillante! Que todos tus sueños se hagan realidad este año. ¡Feliz Cumpleaños!", fr: "Une année de plus, plus sage et plus brillante ! Que tous vos rêves se réalisent cette année. Joyeux anniversaire !", ar: "عام آخر أكثر حكمة وإشراقاً! أتمنى أن تتحقق كل أحلامك هذا العام. عيد ميلاد سعيد!", hi: "एक और नया साल, अधिक समझदार और उज्ज्वल! इस साल आपके सभी सपने सच हों। जन्मदिन मुबारक!", zh: "新的一年，更加睿智与光彩照人！愿您今年的梦想成真。生日快乐！", pt: "Mais um ano mais sábio e brilhante! Que todos os seus sonhos se realizem este ano. Feliz Aniversário!", ru: "Еще один год мудрости и радости! Пусть все ваши мечты сбудутся в этом году. С днем рождения!", de: "Ein weiteres Jahr weiser und strahlender! Mögen all deine Träume dieses Jahr in Erfüllung gehen. Alles Gute zum Geburtstag!", ja: "知恵と輝きに満ちた新しい一年！あなたのすべての夢が今年叶いますように。お誕生日おめでとうございます！", ko: "지혜롭고 빛나는 또 한 해! 올해 당신의 모든 꿈이 이루어지기를 바랍니다. 생일 축하합니다!", it: "Un altro anno più saggio e luminoso! Che tutti i tuoi sogni si avverino quest'anno. Buon compleanno!", tr: "Daha bilge ve parlak bir yıl daha! Bu yıl tüm hayallerin gerçek olsun. Doğum Günün Kutlu Olsun!", id: "Satu tahun lagi lebih bijak dan bersinar! Semoga semua impian Anda terwujud tahun ini. Selamat Ulang Tahun!", bn: "আরেকটি নতুন ও উজ্জ্বল বছর! এই বছর আপনার সমস্ত স্বপ্ন সত্যি হোক। শুভ জন্মদিন!", vi: "Một năm mới trí tuệ và tỏa sáng hơn! Chúc mọi ước mơ của bạn thành hiện thực trong năm nay. Chúc mừng sinh nhật!", sw: "Mwaka mwingine mwenye busara na angavu zaidi! Hata ndoto zako zote zitimie mwaka huu. Heri ya Siku ya Kuzaliwa!" },
  ],
  'anniversary': [
    { en: "Happy Anniversary! May your bond grow stronger and your love deeper with every passing year.", ur: "سالگرہِ شادی مبارک ہو! اللہ آپ دونوں کو ہمیشہ خوش و خرم رکھے۔", es: "¡Feliz Aniversario! Que su vínculo se vuelva más fuerte y su amor más profundo con cada año que pasa.", fr: "Joyeux anniversaire de mariage ! Que votre lien se renforce et que votre amour s'approfondisse chaque année.", ar: "ذكرى زواج سعيدة! تمنياتنا أن تزداد رابطتكم قوة وحبكم عمقاً مع كل عام يمر.", hi: "शादी की सालगिरह मुबारक! हर बीतते साल के साथ आपका रिश्ता और मजबूत हो।", zh: "周年纪念快乐！愿您们的感情随着岁月的流逝更加深厚与牢固。", pt: "Feliz Aniversário de Casamento! Que o laço de vocês se fortaleça a cada ano.", ru: "С годовщиной! Пусть ваша связь становится крепче, а любовь — глубже с каждым годом.", de: "Alles Gute zum Jahrestag! Möge eure Liebe mit jedem Jahr stärker und tiefer werden.", ja: "結婚記念日おめでとうございます！年を重ねるごとに愛と絆が深まりますように。", ko: "결혼 기념일을 축하합니다! 해가 갈수록 두 분의 사랑과 유대가 더욱 깊어지기를 기원합니다.", it: "Buon anniversario! Che il vostro legame diventi sempre più forte e il vostro amore sempre più profondo.", tr: "Evlilik Yıldönümünüz Kutlu Olsun! Bağınız her geçen yıl daha da güçlensin.", id: "Selamat Hari Jadi! Semoga ikatan Anda semakin kuat dan cinta Anda semakin dalam setiap tahunnya.", bn: "বিবাহ বার্ষিকী শুভ হোক! প্রতি বছরের সাথে আপনাদের ভালোবাসা আরও গভীর হোক।", vi: "Chúc mừng kỷ niệm ngày cưới! Chúc tình yêu của hai bạn ngày càng mặn nồng theo thời gian.", sw: "Heri ya Kumbukumbu ya Harusi! Uhusiano wenu uwe imara na upendo wenu uwe kina kila mwaka." },
  ],
  'new-baby': [
    { en: "Mubarak ho! May this little angel fill your home with endless joy and blessings.", ur: "مبارک ہو! اللہ اس ننھے مہمان کو صحت اور لمبی عمر عطا فرمائے۔", es: "¡Felicidades! Que este angelito llene su hogar de alegría y bendiciones infinitas.", fr: "Félicitations ! Que ce petit ange remplisse votre foyer de joie et de bénédictions infinies.", ar: "مبارك! عسى أن يملأ هذا الملاك الصغير منزلكم بالفرح والبركات الدائمة.", hi: "बधाई हो! यह छोटा सा फरिश्ता आपके घर को खुशियों और आशीर्वाद से भर दे।", zh: "恭喜！愿这个小天使为您的小家带来无限的喜悦与祝福。", pt: "Parabéns! Que este anjinho encha sua casa de alegria e bênçãos infinitas.", ru: "Поздравляем! Пусть этот маленький ангелочек наполнит ваш дом бесконечной радостью!", de: "Herzlichen Glückwunsch! Möge dieser kleine Engel euer Zuhause mit Freude erfüllen.", ja: "おめでとうございます！この小さな天使がご家庭に溢れる幸せをもたらしますように。", ko: "축하합니다! 이 작은 천사가 가정에 끝없는 기쁨과 축복을 가져다주기를 바랍니다.", it: "Congratulazioni! Che questo piccolo angelo riempia la vostra casa di gioia e benedizioni.", tr: "Tebrikler! Bu küçük melek evinizi sonsuz neşe ve bereketle doldursun.", id: "Selamat! Semoga malaikat kecil ini memenuhi rumah Anda dengan kegembiraan dan berkah yang tak henti.", bn: "অভিনন্দন! এই ছোট্ট দেবদূত আপনাদের ঘরকে অসীম আনন্দে ভরিয়ে তুলুক।", vi: "Chúc mừng! Chúc thiên thần nhỏ mang lại niềm vui và hạnh phúc vô tận cho gia đình bạn.", sw: "Hongera! Malaika huyu mdogo ajaze nyumba yenu na furaha na baraka zisizo na mwisho." },
  ],
  'get-well-soon': [
    { en: "Get well soon! Praying for your speedy recovery and good health. We miss your smile.", ur: "جلد صحت یاب ہو جائیں۔ اللہ آپ کو شفائے کاملہ عطا فرمائے۔ آمین", es: "¡Que te mejores pronto! Oramos por tu rápida recuperación y buena salud. Extrañamos tu sonrisa.", fr: "Rétablissez-vous vite ! Nous prions pour votre rapide guérison et votre bonne santé.", ar: "أتمنى لك الشفاء العاجل! ندعو الله لك بالصحة والعافية السريعة.", hi: "जल्द स्वस्थ हों! आपके शीघ्र स्वस्थ होने की प्रार्थना करते हैं। आपकी मुस्कान की याद आती है।", zh: "祝您早日康复！祈祷您尽快恢复健康。我们想念您的笑容。", pt: "Melhore logo! Rezando por sua rápida recuperação e boa saúde. Sentimos falta do seu sorriso.", ru: "Выздоравливайте скорее! Молимся о вашем скорейшем выздоровлении и крепком здоровье.", de: "Gute Besserung! Wir beten für deine schnelle Genesung. Wir vermissen dein Lächeln.", ja: "一日も早いご回復をお祈り申し上げます。お大事になさってください。", ko: "쾌유를 빕니다! 빠른 회복과 건강을 기도합니다. 당신의 미소가 그리워요.", it: "Guarisci presto! Preghiamo per una tua rapida guarigione. Ci manca il tuo sorriso.", tr: "Geçmiş olsun! Bir an önce sağlığına kavuşman için dua ediyoruz.", id: "Semoga lekas sembuh! Mendoakan kesembuhan dan kesehatan Anda.", bn: "তাড়াতাড়ি সুস্থ হয়ে উঠুন! আপনার দ্রুত আরোগ্য কামনা করছি।", vi: "Sớm bình phục nhé! Cầu chúc bạn mau chóng hồi phục sức khỏe.", sw: "Ugua pole! Tunakuombea upone haraka na uwe na afya njema." },
  ],
  'farewell': [
    { en: "Farewell, my friend. The memories we made will stay forever. Wishing you success ahead!", ur: "الوداع! آپ کے ساتھ گزرے لمحے ہمیشہ یاد رہیں گے۔ آگے کی منزلیں مبارک ہوں۔", es: "¡Hasta luego, amigo! Los recuerdos que creamos permanecerán para siempre. ¡Éxito en lo que viene!", fr: "Adieu, mon ami ! Les souvenirs que nous avons créés resteront à jamais. Succès pour la suite !", ar: "وداعاً يا صديقي! الذكريات التي صنعناها ستظل خالدة. نتمنى لك التوفيق في قادم الأيام!", hi: "अलविदा दोस्त! साथ बिताए लम्हे हमेशा याद रहेंगे। आगे की यात्रा सफल हो!", zh: "珍重，朋友！美好的回忆将永存心间。祝您前程似锦！", pt: "Adeus, meu amigo! As memórias que criamos permanecerão para sempre. Sucesso à frente!", ru: "Прощай, мой друг! Воспоминания останутся навсегда. Желаю успехов в будущем!", de: "Leb wohl, mein Freund! Die gemeinsamen Erinnerungen bleiben für immer. Viel Erfolg für die Zukunft!", ja: "さようなら、友人よ。共に過ごした思い出は永遠です。これからのご活躍をお祈りします！", ko: "작별 인사를 전합니다, 친구여! 함께한 추억은 영원히 남을 것입니다. 앞날에 성공이 가득하기를!", it: "Addio amico mio! I ricordi creati rimarranno per sempre. Ti auguro un futuro di successo!", tr: "Elveda dostum! Birlikte biriktirdiğimiz anılar sonsuza dek yaşayacak. Geleceğinde başarılar!", id: "Selamat tinggal, sahabatku! Kenangan yang kita buat akan bertahan selamanya. Sukses selalu!", bn: "বিদায় বন্ধু! একসাথে কাটানো স্মৃতিগুলো চিরকাল থাকবে। আগামী দিনের সাফল্য কামনা করি!", vi: "Tạm biệt bạn tôi! Những kỷ niệm đẹp sẽ còn mãi. Chúc bạn thành công phía trước!", sw: "Kwaheri rafiki wangu! Kumbukumbu zetu zitabaki milele. Nakutakia mafanikio mema!" },
  ],
  'congratulations': [
    { en: "Congratulations! Your hard work has truly paid off. So proud of you!", ur: "مبارک ہو! آپ کی محنت رنگ لائی۔ ہمیں آپ پر فخر ہے۔", es: "¡Felicitaciones! Tu arduo trabajo realmente ha valido la pena. ¡Muy orgulloso de ti!", fr: "Félicitations ! Votre travail acharné a porter ses fruits. Si fier de vous !", ar: "مبارك! لقد أثمر عملك الجاد حقاً. نحن فخورون بك جداً!", hi: "बधाई हो! आपकी कड़ी मेहनत रंग लाई है। आप पर बहुत गर्व है!", zh: "祝贺您！您的付出终于换来了丰硕的成果。为您感到无比自豪！", pt: "Parabéns! Seu trabalho duro realmente valeu a pena. Muito orgulhoso de você!", ru: "Поздравляем! Ваш упорный труд принес свои плоды. Мы так гордимся вами!", de: "Herzlichen Glückwunsch! Deine harte Arbeit hat sich gelohnt. Wir sind so stolz auf dich!", ja: "おめでとうございます！努力が実を結びましたね。心から誇りに思います！", ko: "축하합니다! 당신의 노력이 진정으로 결실을 맺었습니다. 정말 자랑스럽습니다!", it: "Congratulazioni! Il tuo duro lavoro ha dato i suoi frutti. Orgogliosi di te!", tr: "Tebrikler! Sıkı çalışmanın karşılığını aldın. Seninle gurur duyuyoruz!", id: "Selamat! Kerja keras Anda benar-benar membuahkan hasil. Sangat bangga pada Anda!", bn: "অভিনন্দন! আপনার কঠোর পরিশ্রম সফল হয়েছে। আপনার জন্য আমরা গর্বিত!", vi: "Chúc mừng! Sự chăm chỉ của bạn đã gặt hái thành công. Rất tự hào về bạn!", sw: "Hongera! Kazi yako ngumu imeleta matunda mema. Tunajivunia wewe!" },
  ],
  'thank-you': [
    { en: "Thank you from the bottom of my heart. Your kindness means the world to me.", ur: "دل کی گہرائیوں سے شکریہ۔ آپ کی محبت اور مہربانی کا کوئی بدل نہیں۔", es: "Gracias de todo corazón. Tu amabilidad significa el mundo para mí.", fr: "Merci du fond du cœur. Votre gentillesse représente tout pour moi.", ar: "شكراً لك من أعماق قلبي. لطفك يعني لي الكثير.", hi: "दिल की गहराइयों से धन्यवाद। आपकी दयालुता मेरे लिए बहुत मायने रखती है।", zh: "打心底感谢您。您的善意对我来说至关重要。", pt: "Obrigado do fundo do meu coração. Sua bondade significa o mundo para mim.", ru: "Спасибо от всего сердца. Ваша доброта значит для меня невероятно много.", de: "Danke von ganzem Herzen. Deine Freundlichkeit bedeutet mir die Welt.", ja: "心から感謝いたします。あなたの優しさに心より感謝申し上げます。", ko: "진심으로 감사드립니다. 당신의 친절은 제게 매우 큰 의미입니다.", it: "Grazie di cuore. La tua gentilezza significa molto per me.", tr: "Yürekten teşekkür ederim. İyiliğin benim için dünyalara bedel.", id: "Terima kasih dari lubuk hati yang terdalam. Kebaikan Anda sangat berarti bagi saya.", bn: "হৃদয়ের অন্তস্তল থেকে ধন্যবাদ। আপনার দয়া আমার জন্য অনেক মূল্যবান।", vi: "Cảm ơn bạn từ tận đáy lòng. Lòng tốt của bạn có ý nghĩa rất lớn với tôi.", sw: "Asante kutoka vilindi vya moyo wangu. Wema wako una maana kubwa kwangu." },
  ],
  'miss-you': [
    { en: "Missing you more than words can say. Hope to see you very soon, my dear.", ur: "آپ کی بہت یاد آتی ہے۔ جلد ملاقات کی امید ہے۔", es: "Te extraño más de lo que las palabras pueden decir. Espero verte pronto, querido.", fr: "Tu me manques plus que les mots ne peuvent le dire. J'espère te revoir très vite.", ar: "أفتقدك أكثر مما تعبر عنه الكلمات. أتمنى أن أراك قريباً جداً يا عزيزي.", hi: "शब्दों से बढ़कर आपकी याद आती है। जल्द ही आपसे मिलने की उम्मीद है।", zh: "想念您，语言难以表达。希望能尽快与您相见。", pt: "Sinto sua falta mais do que as palavras podem dizer. Espero te ver em breve.", ru: "Скучаю по вам сильнее, чем можно выразить словами. Надеюсь скорейшей встречи!", de: "Vermisse dich mehr als Worte sagen können. Hoffe wir sehen uns ganz bald wieder.", ja: "言葉では言い表せないほど寂しいです。近いうちにお会いできることを願っています。", ko: "말로 다 표현할 수 없을 만큼 보고 싶습니다. 조만간 만나기를 바랍니다.", it: "Mi manchi più di quanto le parole possano dire. Spero di vederti presto.", tr: "Seni kelimelerin anlatabileceğinden çok özlüyorum. Yakında görüşmek dileğiyle.", id: "Merindukanmu lebih dari yang bisa terucapkan. Semoga bisa segera bertemu.", bn: "কথায় প্রকাশ করার চেয়েও বেশি আপনার কথা মনে পড়ছে। খুব শিগগিরই দেখা হবে আশা করি।", vi: "Nhớ bạn nhiều hơn mọi lời nói. Hy vọng sớm được gặp lại bạn.", sw: "Ninakukosa zaidi ya maneno yanavyoweza kusema. Natumai kuonana nawe hivi karibuni." },
  ],
  'good-luck': [
    { en: "Best of luck! May Allah make every step easy and crown your efforts with success.", ur: "اللہ آپ کو کامیابی عطا فرمائے۔ بہترین دعاؤں کے ساتھ — گڈ لک!", es: "¡Mucha suerte! Que Dios haga fácil cada paso y corone tus esfuerzos con el éxito.", fr: "Bonne chance ! Que Dieu facilite chaque étape et couronne vos efforts de succès.", ar: "بالتوفيق! جعل الله كل خطوة سهلة وتوّج جهودك بالنجاح.", hi: "शुभकामनाएं! ईश्वर आपके हर कदम को आसान बनाए और सफलता प्रदान करे।", zh: "祝您好运！愿上天赐予您力量，让您的付出收获辉煌的成功。", pt: "Boa sorte! Que Deus facilite cada passo e coroe seus esforços com sucesso.", ru: "Удачи! Пусть каждый ваш шаг будет легким, а усилия увенчаются успехом.", de: "Viel Glück! Möge jeder Schritt leicht fallen und deine Mühen von Erfolg gekrönt sein.", ja: "ご幸運をお祈りします！すべてのステップがスムーズに進み、成功を収めますように。", ko: "행운을 빕니다! 모든 걸음이 순조롭고 노력이 성공으로 결실을 맺기를 기원합니다.", it: "Buona fortuna! Che ogni passo sia facile e i tuoi sforzi siano coronati dal successo.", tr: "Bol şans! Allah her adımını kolaylaştırsın ve çabalarını başarıyla taçlandırsın.", id: "Semoga berhasil! Semoga Tuhan memudahkan setiap langkah dan membuahkan kesuksesan.", bn: "শুভকামনা! আল্লাহ আপনার প্রতিটি পদক্ষেপ সহজ করুন এবং সাফল্য দান করুন।", vi: "Chúc bạn may mắn! Chúc mọi bước đi của bạn thuận lợi và gặt hái thành công rực rỡ.", sw: "Kila la heri! Mungu arahisishe kila hatua na atawaze juhudi zako na mafanikio." },
  ],
  'welcome-back': [
    { en: "Welcome back! We have missed you dearly. So happy to have you here again.", ur: "خوش آمدید! آپ کی واپسی پر بہت خوشی ہوئی۔", es: "¡Bienvenido de nuevo! Te hemos extrañado mucho. Muy felices de tenerte de vuelta.", fr: "Bon retour parmi nous ! Vous nous avez beaucoup manqué. Si heureux de vous revoir.", ar: "أهلاً بعودتك! لقد افتقدناك كثيراً. سعداء جداً بوجودك معنا من جديد.", hi: "वापसी पर स्वागत है! हमें आपकी बहुत याद आई। आपको दोबारा पाकर बहुत खुशी हुई।", zh: "欢迎回来！我们非常想念您。很高兴能再次看到您。", pt: "Bem-vindo de volta! Sentimos muito a sua falta. Muito feliz em ter você aqui de novo.", ru: "С возвращением! Мы так скучали. Очень рады видеть вас снова!", de: "Willkommen zurück! Wir haben dich sehr vermisst. Schön, dass du wieder da bist.", ja: "お帰りなさい！あなたがいなくてとても寂しかったです。またお会いできてとても嬉しいです。", ko: "다시 오신 것을 환영합니다! 그동안 많이 보고 싶었습니다. 다시 만나게 되어 매우 기쁩니다.", it: "Bentornato! Ci sei mancato molto. Molto felici di averti di nuovo qui.", tr: "Tekrar hoş geldin! Seni çok özledik. Seni yeniden aramızda görmek harika.", id: "Selamat datang kembali! Kami sangat merindukan Anda. Senang memiliki Anda kembali.", bn: "ফিরে আসার জন্য স্বাগতম! আপনার কথা খুব মনে পড়েছে। আপনাকে আবার পেয়ে আমরা আনন্দিত।", vi: "Chào mừng bạn trở lại! Chúng tôi rất nhớ bạn. Rất vui được gặp lại bạn.", sw: "Karibu tena! Tulikukosa sana. Furaha kubwa kuwa nawe tena." },
  ],
  'eid-ul-fitr': [
    { en: "Eid Mubarak! May this blessed day bring joy, peace and prosperity to you and your family.", ur: "عید مبارک! اللہ یہ مبارک دن آپ کے لیے خوشیوں اور برکتوں کا باعث بنائے۔", es: "¡Eid Mubarak! Que este bendito día traiga alegría, paz y prosperidad a ti y a tu familia.", fr: "Eid Mubarak ! Que ce jour béni apporte joie, paix et prospérité à vous et votre famille.", ar: "عيد مبارك! عسى أن يجلب هذا اليوم المبارك الفرح والسلام والازدهار لك ولعائلتك.", hi: "ईद मुबारक! यह मुबारक दिन आपके और आपके परिवार के लिए खुशी, शांति और समृद्धि लाए।", zh: "开斋节快乐！愿这个祥和的日子为您和您的家人带来喜悦、和平与繁荣。", pt: "Eid Mubarak! Que este dia abençoado traga alegria, paz e prosperidade para você e sua família.", ru: "Аид Мубарак! Пусть этот благословенный день принесет радость, мир и процветание вашей семье.", de: "Eid Mubarak! Möge dieser gesegnete Tag dir und deiner Familie Freude, Frieden und Wohlstand bringen.", ja: "イード・ムバラク！この祝福された日があなたとご家族に平和と繁栄をもたらしますように。", ko: "이드 무바라크! 이 축복받은 날이 귀하와 가족에게 기쁨, 평화, 번영을 가져다주기를 기원합니다.", it: "Eid Mubarak! Che questo giorno benedetto porti gioia, pace e prosperità a te e alla tua famiglia.", tr: "Ramazan Bayramınız Kutlu Olsun! Bu mübarek gün size ve ailenize huzur ve bereket getirsin.", id: "Selamat Hari Raya Idul Fitri! Semoga hari yang berkah ini membawa kebahagiaan dan kedamaian.", bn: "ঈদুল ফিতরের শুভেচ্ছা! এই বরকতময় দিনটি আপনার ও আপনার পরিবারের জন্য আনন্দ বয়ে আনুক।", vi: "Eid Mubarak! Chúc ngày may mắn này mang lại niềm vui, bình an và thịnh vượng cho gia đình bạn.", sw: "Eid Mubarak! Siku hii yenye baraka ilete furaha, amani na ufanisi kwako na familia yako." },
  ],
  'eid-ul-adha': [
    { en: "Eid ul Adha Mubarak! May your sacrifices be accepted and your home filled with blessings.", ur: "عید الاضحیٰ مبارک! اللہ آپ کی قربانی قبول فرمائے۔ آمین", es: "¡Eid ul Adha Mubarak! Que tus sacrificios sean aceptados y tu hogar se llene de bendiciones.", fr: "Eid ul Adha Mubarak ! Que vos sacrifices soient acceptés et votre foyer comblé de bénédictions.", ar: "عيد الأضحى مبارك! تقبل الله طاعاتكم وصالح أعمالكم وأدام عليكم البركات.", hi: "ईद-उल-अजहा मुबारक! ईश्वर आपकी कुर्बानी स्वीकार करे और आपके घर को खुशियों से भरे।", zh: "宰牲节快乐！愿您的奉献得到应有的福报，愿您的家庭平安祥和。", pt: "Eid ul Adha Mubarak! Que seus sacrifícios sejam aceitos e sua casa repleta de bênçãos.", ru: "Курбан Байрам Мубарак! Пусть ваши жертвы будут приняты, а дом наполнится благодатью.", de: "Eid ul Adha Mubarak! Mögen deine Opfer angenommen werden und dein Heim gesegnet sein.", ja: "イード・アル＝アドハー・ムバラク！あなたの献身が受け入れられ、ご家庭に幸多からんことを。", ko: "이드 알 아드하 무바라크! 귀하의 희생이 수납되고 가정에 축복이 가득하기를 기원합니다.", it: "Eid ul Adha Mubarak! Che i tuoi sacrifici siano accettati e la tua casa colma di benedizioni.", tr: "Kurban Bayramınız Kutlu Olsun! Kurbanlarınız kabul, eviniz bereketle dolsun.", id: "Selamat Hari Raya Idul Adha! Semoga kurban Anda diterima dan rumah Anda penuh berkah.", bn: "ঈদুল আজহার শুভেচ্ছা! আল্লাহ আপনার কুরবানি কবুল করুন এবং ঘর বরকতে ভরিয়ে দিন।", vi: "Eid ul Adha Mubarak! Chúc hy sinh của bạn được ghi nhận và mái ấm tràn ngập phước lành.", sw: "Eid ul Adha Mubarak! Dhabihu zenu zikubaliwe na nyumba yenu ijaye baraka." },
  ],
  'ramadan': [
    { en: "Ramadan Mubarak! May this holy month bring countless blessings and forgiveness your way.", ur: "رمضان مبارک! اللہ اس مبارک مہینے کی برکتیں آپ پر نازل فرمائے۔", es: "¡Ramadán Mubarak! Que este mes sagrado traiga innumerables bendiciones a tu vida.", fr: "Ramadan Mubarak ! Que ce mois saint vous apporte d'innombrables bénédictions et le pardon.", ar: "رمضان مبارك! اعاده الله عليكم بالخير واليمن والبركات والمغفرة.", hi: "रमजान मुबारक! यह पवित्र महीना आपके जीवन में अनगिनत दुआएं और बरकतें लाए।", zh: "斋月吉庆！愿这个神圣的月份为您带来无尽的吉祥与赦免。", pt: "Ramadan Mubarak! Que este mês sagrado traga inúmeras bênçãos para você.", ru: "Рамадан Мубарак! Пусть этот священный месяц принесет мир и прощение.", de: "Ramadan Mubarak! Möge dieser heilige Monat dir Segen und Vergebung bringen.", ja: "ラマダン・ムバラク！この神聖な月がたくさんの祝福と平安をもたらしますように。", ko: "라마단 무바라크! 이 거룩한 달이 무수한 축복과 용서를 가져다주기를 기대합니다.", it: "Ramadan Mubarak! Che questo mese santo porti innumerevoli benedizioni.", tr: "Ramazan-ı Şerifiniz Mübarek Olsun! Bu mübarek ay sizlere bereket getirsin.", id: "Ramadhan Mubarak! Semoga bulan suci ini membawa keberkahan dan ampunan bagi Anda.", bn: "রমজান মোবারক! এই পবিত্র মাস আপনার জীবনে অসীম রহমত ও বরকত নিয়ে আসুক।", vi: "Ramadan Mubarak! Chúc tháng thánh này mang lại vô vàn phước lành cho bạn.", sw: "Ramadhan Mubarak! Mwezi huu mtukufu ulete baraka tele na msamaha kwako." },
  ],
  'jumma': [
    { en: "Jumma Mubarak! May this blessed Friday fill your heart with peace and your duas be accepted.", ur: "جمعہ مبارک! اللہ آپ کی تمام دعائیں قبول فرمائے۔", es: "¡Jumma Mubarak! Que este bendito viernes llene tu corazón de paz.", fr: "Jumma Mubarak ! Que ce vendredi béni remplisse votre cœur de paix.", ar: "جمعة مباركة! جعل الله هذا اليوم المبارك نوراً لقلبك واستجابة لدعائك.", hi: "जुम्मा मुबारक! ईश्वर इस पवित्र शुक्रवार को आपकी सभी दुआएं स्वीकार करे।", zh: "主麻吉庆！愿这个安详的主麻日为您带来心中的平静与安宁。", pt: "Jumma Mubarak! Que esta sexta-feira abençoada encha seu coração de paz.", ru: "Джума Мубарак! Пусть эта благословенная пятница принесет покой и ответы на молитвы.", de: "Jumma Mubarak! Möge dieser gesegnete Freitag dein Herz mit Frieden erfüllen.", ja: "ジュマ・ムバラク！この金曜日があなたに平和と祈りの成就をもたらしますように。", ko: "주마 무바라크! 이 축복받은 금요일이 당신의 마음을 평화로 채우기를 바랍니다.", it: "Jumma Mubarak! Che questo benedetto venerdì riempia il tuo cuore di pace.", tr: "Hayırlı Cumalar! Bu mübarek gün dualarınızın kabulüne vesile olsun.", id: "Jumat Berkah! Semoga hari Jumat ini memenuhi hati Anda dengan kedamaian.", bn: "জুম্মা মোবারক! আল্লাহ আপনার মনের সমস্ত নেক আশা পূরণ করুন।", vi: "Jumma Mubarak! Chúc thứ Sáu may mắn này mang lại sự bình yên trong tâm hồn bạn.", sw: "Juma'a Mubarak! Ijumaa hii yenye baraka ijaze moyo wako amani." },
  ],
  'hajj': [
    { en: "Hajj Mubarak! May Allah accept your pilgrimage and reward you abundantly.", ur: "حج مبارک! اللہ آپ کا حج قبول فرمائے۔ حجِ مبرور نصیب ہو۔", es: "¡Hajj Mubarak! Que Dios acepte tu peregrinación y te recompense abundantemente.", fr: "Hajj Mubarak ! Que Dieu accepte votre pèlerinage et vous récompense grandement.", ar: "حج مبرور وذنب مغفور وسعي مشكور. تقبل الله منكم صالح الأعمال.", hi: "हज मुबारक! ईश्वर आपकी यात्रा को स्वीकार करे और आपको असीम पुण्य प्रदान करे।", zh: "朝觐吉庆！愿上天接纳您的朝圣，赐予您丰厚的福报。", pt: "Hajj Mubarak! Que Deus aceite sua peregrinação e o recompense grandemente.", ru: "Хадж Мубарак! Пусть Аллах примет ваше паломничество и вознаградит вас.", de: "Hajj Mubarak! Möge Gott deine Pilgerreise annehmen und reichlich belohnen.", ja: "ハッジ・ムバラク！巡礼が受け入れられ、素晴らしい祝福がありますように。", ko: "하찌 무바라크! 귀하의 순례가 수납되고 풍성한 보상을 받으시기를 바랍니다.", it: "Hajj Mubarak! Che Dio accetti il tuo pellegrinaggio e ti ricompensi ampiamente.", tr: "Haccınız Mübarek Olsun! Allah ibadetlerinizi kabul eylesin.", id: "Selamat Menunaikan Ibadah Haji! Semoga haji Anda mabrur dan diterima.", bn: "হজ্জ মোবারک! আল্লাহ আপনার হজ্জ কবুল করুন এবং হজ্জে মাবরুর দান করুন।", vi: "Hajj Mubarak! Chúc chuyến hành hương của bạn được chấp nhận và vẹn tròn phước lành.", sw: "Hajj Mubarak! Mungu akubali ibada yako na akutuze kwa wingi." },
  ],
  'umrah': [
    { en: "Umrah Mubarak! May your journey be accepted and your prayers answered.", ur: "عمرہ مبارک! اللہ آپ کا عمرہ قبول فرمائے۔", es: "¡Umrah Mubarak! Que tu viaje sea aceptado y tus oraciones escuchadas.", fr: "Umrah Mubarak ! Que votre voyage soit accepté et vos prières exaucées.", ar: "عمرة مباركة ودعوات مستجابة. تقبل الله منا ومنكم صالح الأعمال.", hi: "उमराह मुबारक! ईश्वर आपकी यात्रा स्वीकार करे और आपकी प्रार्थनाएं सुने।", zh: "副朝吉庆！愿您的朝圣成功，祈祷得到回应。", pt: "Umrah Mubarak! Que sua jornada seja aceita e suas orações respondidas.", ru: "Умра Мубарак! Пусть ваше путешествие будет принято, а молитвы услышаны.", de: "Umrah Mubarak! Möge deine Reise angenommen und deine Gebete erhört werden.", ja: "ウムラ・ムバラク！旅が祝福され、お祈りが届きますように。", ko: "움라 무바라크! 귀하의 여정이 수납되고 기도가 응답받기를 기원합니다.", it: "Umrah Mubarak! Che il tuo viaggio sia accettato e le tue preghiere esaudite.", tr: "Umreniz Mübarek Olsun! Dualarınız kabul, ibadetleriniz makbul olsun.", id: "Umrah Mubarak! Semoga ibadah umrah Anda diterima dan doa-doa Anda dikabulkan.", bn: "ওমরাহ মোবারক! আল্লাহ আপনার যাত্রা কবুল করুন اور دعائیں مستجاب کریں۔", vi: "Umrah Mubarak! Chúc chuyến đi của bạn được chấp nhận và lời nguyện cầu thành hiện thực.", sw: "Umrah Mubarak! Safari yako ikubaliwe na maombi yako yajibiwe." },
  ],
  'graduation': [
    { en: "Congratulations on your graduation! Your dedication has earned this proud moment. Onward to greater heights!", ur: "کامیابی مبارک ہو! آپ کی محنت رنگ لائی۔ آگے کی منزلیں مبارک ہوں۔", es: "¡Felicitaciones por tu graduación! Tu dedicación ha ganado este momento de orgullo.", fr: "Félicitations pour votre diplôme ! Votre dévouement a mérité ce moment de fierté.", ar: "تهانينا بمناسبة التخرج! لقد أثمر اجتهادك هذا الفخر والإنجاز. إلى مزيد من النجاحات!", hi: "ग्रेजुएशन पर बधाई! आपकी लगन ने यह गर्व का क्षण अर्जित किया है।", zh: "恭喜毕业！您的努力铸就了这一骄傲的时刻。", pt: "Parabéns pela sua graduação! Sua dedicação conquistou este momento de orgulho.", ru: "Поздравляем с окончанием учебы! Ваше усердие принесло этот гордый момент.", de: "Herzlichen Glückwunsch zum Abschluss! Dein Einsatz hat diesen stolzen Moment verdient.", ja: "ご卒業おめでとうございます！努力が実を結んだ誇らしい瞬間です。", ko: "졸업을 축하합니다! 당신의 헌신이 이 자랑스러운 순간을 만들었습니다.", it: "Congratulazioni per la tua laurea! La tua dedizione ha meritato questo momento di orgoglio.", tr: "Mezuniyetini tebrik ederim! Özverin bu gurur verici anı hak etti.", id: "Selamat atas kelulusan Anda! Dedikasi Anda telah membuahkan momen yang membanggakan ini.", bn: "গ্র্যাজুয়েশনে অভিনন্দন! আপনার কঠোর পরিশ্রম এই গর্বের মুহূর্ত এনে দিয়েছে।", vi: "Chúc mừng tốt nghiệp! Sự chăm chỉ của bạn đã gặt hái thành công này.", sw: "Hongera kwa kuhitimu! Jitihada zako zimezaa matunda haya ya kujivunia." },
  ],
  'new-job': [
    { en: "Naukri Mubarak! Wishing you success and growth in this exciting new chapter.", ur: "نوکری مبارک ہو! اللہ اس نئے سفر کو آپ کے لیے کامیاب بنائے۔", es: "¡Felicidades por tu nuevo trabajo! Te deseo éxito y crecimiento en este nuevo capítulo.", fr: "Félicitations pour ce nouveau travail ! Succès et épanouissement pour ce nouveau chapitre.", ar: "مبارك الوظيفة الجديدة! نتمنى لك النجاح والتقدم في هذا الفصل الجديد والمثير.", hi: "नई नौकरी मुबारक! इस नए अध्याय में आपकी सफलता और प्रगति की कामना करते हैं।", zh: "祝贺入职新岗位！愿在这个全新的篇章中大展宏图、蒸蒸日上。", pt: "Parabéns pelo novo emprego! Desejando sucesso e crescimento neste novo capítulo.", ru: "Поздравляем с новой работой! Желаем успехов и карьерного роста в новой главе!", de: "Herzlichen Glückwunsch zum neuen Job! Viel Erfolg für dieses aufregende neue Kapitel.", ja: "ご就職おめでとうございます！新しいステージでのご活躍を応援しております。", ko: "새로운 직장에 취업하신 것을 축하합니다! 새로운 출발에 성공과 발전이 가득하기를!", it: "Congratulazioni per il nuovo lavoro! Ti auguro successo in questo nuovo capitolo.", tr: "Yeni işin hayırlı olsun! Bu yeni sayfada başarı ve yükseliş dilerim.", id: "Selamat atas pekerjaan baru Anda! Semoga sukses dan berkembang di babak baru ini.", bn: "নতুন চাকরি মোবারক! এই নতুন অধ্যায়ে আপনার সাফল্য কামনা করি।", vi: "Chúc mừng công việc mới! Chúc bạn gặt hái nhiều thành công trong chặng đường mới này.", sw: "Hongera za kazi mpya! Nakutakia mafanikio katika sura hii mpya." },
  ],
  'promotion': [
    { en: "Taraqqi Mubarak! Well deserved. May you keep rising higher and higher.", ur: "ترقی مبارک ہو! اللہ آپ کو مزید کامیابیاں عطا فرمائے۔", es: "¡Felicidades por el ascenso! Muy merecido. Que sigas alcanzando metas aún mayores.", fr: "Félicitations pour cette promotion ! Bien mérité. Continuez à viser toujours plus haut !", ar: "مبارك الترقية! تستحقها بجدارة. عسى أن تواصل الصعود إلى قمم أعلى وأعلى.", hi: "पदोन्नति मुबारक! आप इसके हकदार थे। ईश्वर करे आप ऐसे ही सफलता की ऊंचाइयों को छूते रहें।", zh: "恭喜升职！实至名归。愿您在未来的事业中步步高升！", pt: "Parabéns pela promoção! Muito merecido. Que você continue subindo cada vez mais alto.", ru: "Поздравляем с повышением! Вполне заслуженно. Желаем покорения новых вершин!", de: "Herzlichen Glückwunsch zur Beförderung! Hochverdient. Mögest du weiter aufsteigen.", ja: "ご昇進おめでとうございます！日頃の努力の賜物です。更なるご活躍をお祈りします。", ko: "승진을 축하합니다! 자격이 충분하십니다. 앞으로도 승승장구하시기를 바랍니다.", it: "Congratulazioni per la promozione! Ben meritata. Che tu possa salire sempre più in alto.", tr: "Terfi etmeni tebrik ederim! Hak edilmiş bir başarı. Daha yüksek yerlere gelmen dileğiyle.", id: "Selamat atas promosi jabatan Anda! Sangat layak. Semoga terus meraih puncak kesuksesan.", bn: "পদোন্নতিতে অভিনন্দন! এটি আপনার প্রাপ্য ছিল। সাফল্যের শিখরে এগিয়ে যান।", vi: "Chúc mừng thăng chức! Rất xứng đáng. Chúc bạn vươn cao hơn nữa trong sự nghiệp.", sw: "Hongera kwa kupandishwa vyeo! Unastahili sana. Endelea kupanda juu zaidi." },
  ],
  'new-home': [
    { en: "Ghar Mubarak! May your new home be blessed with love, laughter and endless happiness.", ur: "گھر مبارک ہو! اللہ اس گھر کو خوشیوں اور برکتوں سے بھر دے۔", es: "¡Felicidades por tu nuevo hogar! Que esté lleno de amor, risas y felicidad infinita.", fr: "Félicitations pour votre nouvelle maison ! Qu'elle soit bénie d'amour et de bonheur.", ar: "منزل مبارك! جعل الله بيتك الجديد عامراً بالحب والضحك والسعادة الأبدية.", hi: "नया घर मुबारक! आपका नया घर प्यार, हंसी और असीम खुशियों से भरा रहे।", zh: "乔迁之喜！愿您的新家充满爱、欢笑与无限的幸福。", pt: "Parabéns pela casa nova! Que seu novo lar seja abençoado com muito amor e alegria.", ru: "С новосельем! Пусть ваш новый дом будет благословлен любовью и бесконечным счастьем.", de: "Herzlichen Glückwunsch zum neuen Zuhause! Möge es voller Liebe und Freude sein.", ja: "新居へのお引越しおめでとうございます！愛と笑顔に満ちた素敵なご家庭になりますように。", ko: "새 집 입주를 축하합니다! 새 보금자리에 사랑과 행복이 가득하기를 기원합니다.", it: "Buona nuova casa! Che la tua nuova casa sia benedetta da amore, risate e felicità.", tr: "Yeni eviniz hayırlı olsun! Eviniz huzur, sevgi ve neşeyle dolsun.", id: "Selamat atas rumah baru Anda! Semoga rumah baru ini dipenuhi cinta dan kebahagiaan.", bn: "নতুন ঘর মোবারক! আপনার নতুন ঘর ভালোবাসা ও অসীম সুখে ভরে উঠুক।", vi: "Chúc mừng nhà mới! Chúc tổ ấm mới tràn ngập tình yêu thương và tiếng cười.", sw: "Hongera za nyumba mpya! Nyumba yenu mpya ibarikiwe na upendo na furaha." },
  ],
  'business-launch': [
    { en: "Congratulations on your new venture! May your business flourish and bring great success.", ur: "نئے کاروبار کی مبارکباد! اللہ آپ کے کاروبار میں برکت عطا فرمائے۔", es: "¡Felicitaciones por tu nuevo emprendimiento! Que tu negocio prospere y traiga gran éxito.", fr: "Félicitations pour cette nouvelle entreprise ! Que votre projet prospère et connaisse un grand succès.", ar: "تهانينا بمناسبة افتتاح مشروعك الجديد! عسى أن يزدهر عملك ويحقق نجاحاً باهراً.", hi: "नए व्यवसाय की बधाई! आपका व्यवसाय खूब फले-फूले और बड़ी सफलता लाए।", zh: "祝贺开业大吉！愿您的事业蒸蒸日上、客源滚滚，取得巨大成功。", pt: "Parabéns pelo novo empreendimento! Que seu negócio prospere e traga grande sucesso.", ru: "Поздравляем с открытием нового бизнеса! Пусть ваше предприятие процветает!", de: "Herzlichen Glückwunsch zum neuen Unternehmen! Möge dein Geschäft blühen und florieren.", ja: "ご開店・ご起業おめでとうございます！事業の更なるご発展とご成功をお祈りいたします。", ko: "새로운 사업 개시를 축하합니다! 사업이 번창하여 큰 성공을 거두기를 기원합니다.", it: "Congratulazioni per la nuova impresa! Che la tua attività fiorisca e porti un grande successo.", tr: "Yeni iş yeriniz hayırlı olsun! İşinizin bereketi bol, başarısı daim olsun.", id: "Selamat atas usaha baru Anda! Semoga bisnis Anda berkembang pesat dan sukses besar.", bn: "নতুন ব্যবসার জন্য অভিনন্দন! আপনার ব্যবসা সমৃদ্ধ হোক এবং সফলতা আনুক।", vi: "Chúc mừng khai trương! Chúc công việc kinh doanh của bạn ngày càng phát đạt.", sw: "Hongera kwa biashara mpya! Biashara yako ishamiri na ilete mafanikio makubwa." },
  ],
  'exam-pass': [
    { en: "Congratulations on your result! Your hard work truly paid off. So proud of you!", ur: "نتیجہ مبارک ہو! آپ کی محنت کامیاب ہوئی۔ مبارک ہو!", es: "¡Felicitaciones por tus resultados! Tu arduo trabajo realmente valió la pena.", fr: "Félicitations pour vos résultats ! Votre travail a porté ses fruits.", ar: "مبروك النجاح والتفوق! لقد أثمر جهدك وصبرك إنجازاً رائعاً. فخورون بك!", hi: "परीक्षा परिणाम पर बधाई! आपकी मेहनत वाकई रंग लाई है।", zh: "恭喜取得优异成绩！您的辛勤付出终于换来了喜人的结果。", pt: "Parabéns pelo seu resultado! Seu trabalho duro realmente valeu a pena.", ru: "Поздравляем с отличным результатом! Твой труд оправдал себя.", de: "Herzlichen Glückwunsch zum Ergebnis! Deine Mühe hat sich gelohnt.", ja: "合格おめでとうございます！努力が実を結びましたね。", ko: "시험 합격을 축하합니다! 노력이 결실을 맺어 정말 기쁩니다.", it: "Congratulazioni per il tuo risultato! Il tuo impegno ha dato i suoi frutti.", tr: "Sınav sonucunu tebrik ederim! Emeğinin karşılığını aldın.", id: "Selamat atas hasil ujian Anda! Kerja keras Anda benar-benar terbayar.", bn: "পরীক্ষার ফলাফলে অভিনন্দন! আপনার পরিশ্রমের ফল পেয়েছেন।", vi: "Chúc mừng kết quả thi xuất sắc! Sự nỗ lực của bạn đã được đền đáp.", sw: "Hongera kwa matokeo mazuri! Kazi yako ngumu imelipa." },
  ],
  'new-year': [
    { en: "Happy New Year! May this year bring you new hopes, fresh starts and beautiful moments.", ur: "نیا سال مبارک ہو! اللہ یہ سال آپ کے لیے خوشیوں بھرا بنائے۔", es: "¡Feliz Año Nuevo! Que este año te traiga nuevas esperanzas y hermosos momentos.", fr: "Bonne année ! Que cette année vous apporte de nouveaux espoirs et de beaux moments.", ar: "سنة جديدة سعيدة! عسى أن يحمل هذا العام آمالاً جديدة وبدايات مشرقة وتجارب جميلة.", hi: "नया साल मुबारक! यह नया साल आपके जीवन में नई उम्मीदें और खुशियां लाए।", zh: "新年快乐！愿新的一年为您带来全新的希望、全新的开始与美好的瞬间。", pt: "Feliz Ano Novo! Que este ano traga novas esperanças e momentos lindos.", ru: "С Новым Годом! Пусть этот год принесет новые надежды и прекрасные моменты.", de: "Frohes neues Jahr! Möge dieses Jahr neue Hoffnung und schöne Momente bringen.", ja: "明けましておめでとうございます！新しい希望と笑顔に満ちた一年になりますように。", ko: "새해 복 많이 받으세요! 올 한 해 새로운 희망과 행복이 가득하시기를 바랍니다.", it: "Buon Anno! Che questo anno ti porti nuove speranze e splendidi momenti.", tr: "Mutlu Yıllar! Bu yeni yıl sana yeni umutlar ve güzel anlar getirsin.", id: "Selamat Tahun Baru! Semoga tahun ini membawa harapan baru dan momen indah.", bn: "শুভ নববর্ষ! এই নতুন বছর আপনার জন্য নতুন আশা ও আনন্দ নিয়ে আসুক।", vi: "Chúc mừng năm mới! Chúc bạn một năm mới tràn ngập hy vọng và khoảnh khắc đẹp.", sw: "Heri ya Mwaka Mpya! Mwaka huu ulete matumaini mapya na nyakati nzuri." },
  ],
  'independence-day': [
    { en: "Happy Independence Day! Proud to be Pakistani. Pakistan Zindabad!", ur: "جشنِ آزادی مبارک ہو! پاکستان زندہ باد۔", es: "¡Feliz Día de la Independencia! Orgulloso de nuestra nación. ¡Viva la patria!", fr: "Joyeuse fête de l'indépendance ! Fier de notre nation.", ar: "عيد استقلال سعيد! فخورون بوطننا العظيم. عاش الوطن حراً مستقلاً!", hi: "स्वतंत्रता दिवस की शुभकामनाएं! हमें अपने देश पर गर्व है। जय हिंद!", zh: "独立日快乐！为我们的国家感到无比自豪与骄傲。", pt: "Feliz Dia da Independência! Orgulho da nossa nação.", ru: "С Днем Независимости! Гордимся нашей родиной!", de: "Alles Gute zum Unabhängigkeitstag! Stolz auf unser Land.", ja: "独立記念日おめでとうございます！私たちの国に誇りを持っています。", ko: "독립기념일을 축하합니다! 우리 조국에 자부심을 느낍니다.", it: "Buona Festa dell'Indipendenza! Orgogliosi della nostra nazione.", tr: "Bağımsızlık Günümüz Kutlu Olsun! Ülkemizle gurur duyuyoruz.", id: "Selamat Hari Kemerdekaan! Bangga menjadi bagian dari bangsa ini.", bn: "স্বাধীনতা দিবসের শুভেচ্ছা! আমাদের দেশের জন্য আমরা গর্বিত।", vi: "Chúc mừng ngày Quốc khánh! Tự hào về đất nước chúng ta.", sw: "Heri ya Siku ya Uhuru! Tunajivunia nchi wetu." },
  ],
  'kashmir-day': [
    { en: "Standing in solidarity with our Kashmiri brothers and sisters. Kashmir Banega Pakistan.", ur: "یومِ یکجہتی کشمیر — ہم اپنے کشمیری بھائیوں کے ساتھ ہیں۔", es: "En solidaridad con nuestros hermanos y hermanas de Cachemira.", fr: "En solidarité avec nos frères et sœurs du Cachemire.", ar: "تضامناً مع إخواننا وأخواتنا في كشمير. ندعو لهم بالحرية والسلام.", hi: "कश्मीर दिवस पर एकजुटता और शांति का संदेश।", zh: "表达我们对克什米尔人民的坚定支持与团结。", pt: "Em solidariedade com nossos irmãos e irmãs da Caxemira.", ru: "В знак солидарности с нашими кашмирскими братьями и сестрами.", de: "In Solidarität mit unseren Brüdern und Schwestern in Kaschmir.", ja: "カシミールの人々に連帯と平和の祈りを捧げます。", ko: "카슈미르 형제 자매들과 연대합니다.", it: "In solidarietà con i nostri fratelli e sorelle del Kashmir.", tr: "Keşmirli kardeşlerimizle dayanışma içindeyiz.", id: "Solidaritas bersama saudara-saudari kita di Kashmir.", bn: "কাশ্মীরি ভাই-বোনদের সাথে সংহতি প্রকাশ করছি।", vi: "Đoàn kết cùng anh chị em Kashmir.", sw: "Kwa mshikamano na ndugu zetu wa Kashmir." },
  ],
  'mothers-day': [
    { en: "Happy Mother's Day to the heart of our family. Your love is our greatest blessing.", ur: "ماں کے نام — آپ کی محبت ہماری سب سے بڑی دولت ہے۔ مدرز ڈے مبارک۔", es: "¡Feliz Día de la Madre al corazón de nuestra familia! Tu amor es nuestra mayor bendición.", fr: "Joyeuse fête des mères au cœur de notre famille. Votre amour est notre plus grande bénédiction.", ar: "عيد أم سعيد لقلب عائلتنا ورمز الحنان. حبك هو أعظم بركة في حياتنا.", hi: "मातृ दिवस की शुभकामनाएं! आपका प्यार ही हमारे परिवार की असली ताकत है।", zh: "母亲节快乐！致我们家庭的核心——您的哎是我们最大的福报。", pt: "Feliz Dia das Mães para o coração da nossa família. Seu amor é nossa maior bênção.", ru: "С Днем Матери! Твоя любовь — наше главное благословение.", de: "Alles Gute zum Muttertag! Deine Liebe ist der größte Segen für unsere Familie.", ja: "母の日おめでとうございます！お母さんの愛は私たちの宝物です。", ko: "어버이날 축하합니다! 어머니의 사랑은 우리 가족의 가장 큰 축복입니다.", it: "Buona Festa della Mamma al cuore della nostra famiglia. Il tuo amore è la nostra benedizione.", tr: "Anneler Günü Kutlu Olsun! Senin sevgin bizim en büyük bereketimiz.", id: "Selamat Hari Ibu! Kasih sayangmu adalah berkah terbesar bagi keluarga kami.", bn: "মাদার্স ডে-র শুভেচ্ছা! আপনার ভালোবাসা আমাদের জীবনের সেরা উপহার।", vi: "Chúc mừng Ngày của Mẹ! Tình yêu của mẹ là phước lành lớn nhất của chúng con.", sw: "Heri ya Siku ya Akina Mama! Upendo wako ni baraka yetu kuu." },
  ],
  'fathers-day': [
    { en: "Happy Father's Day to my hero. Thank you for everything you do for us.", ur: "بابا کے نام — آپ ہمارے ہیرو ہیں۔ فادرز ڈے مبارک۔", es: "¡Feliz Día del Padre a mi héroe! Gracias por todo lo que haces por nosotros.", fr: "Joyeuse fête des pères à mon héros. Merci pour tout ce que vous faites pour nous.", ar: "عيد أب سعيد لبطلي الأول. شكراً لك على كل ما تفعله من أجلنا.", hi: "फादर्स डे की शुभकामनाएं! मेरे हीरो, हमारे लिए सब कुछ करने के लिए धन्यवाद।", zh: "父亲节快乐！致我的英雄——感谢您为我们付出的所有一切。", pt: "Feliz Dia dos Pais para o meu herói. Obrigado por tudo o que você faz por nós.", ru: "С Днем Отца моего героя! Спасибо за всё, что ты делаешь для нас.", de: "Alles Gute zum Vatertag für meinen Helden. Danke für alles, was du für uns tust.", ja: "父の日おめでとうございます！僕のヒーロー、いつも本当にありがとう。", ko: "나의 영웅인 아버지, 어버이날 축하합니다! 항상 감사드립니다.", it: "Buona Festa del Papà al mio eroe. Grazie per tutto quello che fai per noi.", tr: "Babalar Günü Kutlu Olsun kahramanım. Bizim için yaptığın her şey için teşekkürler.", id: "Selamat Hari Ayah untuk pahlawanku. Terima kasih atas semua yang Ayah lakukan.", bn: "ফাদার্স ডে-র শুভেচ্ছা! আমার হিরো, আমাদের জন্য সব করার জন্য ধন্যবাদ।", vi: "Chúc mừng Ngày của Cha! Cảm ơn người anh hùng của con vì tất cả.", sw: "Heri ya Siku ya Akina Baba kwa shujaa wangu. Asante kwa kila kitu." },
  ],
  'valentines': [
    { en: "You are my today and all of my tomorrows. Happy Valentine's Day, my love.", ur: "تم میرا آج اور میری ہر آنے والی صبح ہو۔ ویلنٹائن مبارک۔", es: "Eres mi hoy y todos mis mañanas. Feliz Día de San Valentín, mi amor.", fr: "Tu es mon aujourd'hui et tous mes demains. Joyeuse Saint-Valentin, mon amour.", ar: "أنت حاضري وكل أيامي القادمة. عيد حب سعيد يا حبيبي.", hi: "तुम मेरा आज हो और मेरा आने वाला हर कल। वैलेन्टाइन डे मुबारक, मेरे प्यार।", zh: "你是我所有的今天与未来。情人节快乐，我的挚爱。", pt: "Você é o meu hoje e todos os meus amanhãs. Feliz Dia dos Namorados, meu amor.", ru: "Ты мое настоящее и все мое будущее. С Днем Святого Валентина, любовь моя!", de: "Du bist mein Heute und all mein Morgen. Alles Gute zum Valentinstag, meine Liebe.", ja: "あなたは私の今日、そしてすべての明日です。バレンタインデーおめでとう、愛する人へ。", ko: "당신은 나의 오늘이자 모든 내일입니다. 발렌타인데이 축하해요, 내 사랑.", it: "Sei il mio oggi e tutti i miei domani. Buon San Valentino, amore mio.", tr: "Sen benim bugünüm ve tüm yarınlarımsın. Sevgililer Günün Kutlu Olsun sevgilim.", id: "Kamu adalah hari iniku dan seluruh masa depanku. Selamat Hari Valentine, cintaku.", bn: "তুমি আমার বর্তমান এবং আমার প্রতিটি ভবিষ্যৎ। ভালোবাসা দিবসের শুভেচ্ছা, আমার ভালোবাসা।", vi: "Em là hiện tại và là tất cả tương lai của anh. Chúc mừng Lễ Tình Nhân, tình yêu của anh.", sw: "Wewe ni leo yangu na kesho zangu zote. Heri ya Siku ya Wapendanao, mpenzi wangu." },
  ],
  'friendship-day': [
    { en: "Happy Friendship Day! Grateful for a friend like you who makes life brighter.", ur: "دوستی مبارک! آپ جیسے دوست کا ساتھ ایک نعمت ہے۔", es: "¡Feliz Día de la Amistad! Agradecido por un amigo como tú que ilumina la vida.", fr: "Joyeuse fête de l'amitié ! Reconnaissant d'avoir un ami comme vous qui rend la vie plus belle.", ar: "عيد صداقة سعيد! ممتن لوجود صديق مثلك يجعل الحياة أكثر إشراقاً.", hi: "फ्रेंडशिप डे की शुभकामनाएं! आप जैसा दोस्त मिलना सौभाग्य की बात है।", zh: "友谊节快乐！非常感谢能有您这样能照亮生活的好朋友。", pt: "Feliz Dia da Amizade! Grato por um amigo como você que torna a vida mais brilhante.", ru: "С Днем Дружбы! Благодарен за такого друга, как ты, делающего жизнь ярче.", de: "Alles Gute zum Tag der Freundschaft! Dankbar für einen Freund wie dich.", ja: "友情の日おめでとう！人生を明るく照らしてくれるあなたという友人に感謝します。", ko: "우정의 날을 축하합니다! 삶을 더 밝게 만들어 주는 당신 같은 친구가 있어 감사합니다.", it: "Buona Festa dell'Amicizia! Grato per un amico come te che rende la vita più luminosa.", tr: "Dünya Arkadaşlık Günün Kutlu Olsun! Hayatımı güzelleştiren dostluğuna minnettarım.", id: "Selamat Hari Persahabatan! Bersyukur memiliki sahabat seperti kamu.", bn: "বন্ধুত্ব দিবসের শুভেচ্ছা! আপনার মতো বন্ধু পাওয়া জীবনের অন্যতম সুন্দর উপহার।", vi: "Chúc mừng Ngày Tình Bạn! Biết ơn vì có người bạn như bạn thắp sáng cuộc sống.", sw: "Heri ya Siku ya Urafiki! Nashukuru kwa rafiki kama wewe anayefanya maisha kuwa angavu." },
  ],
  'nikah': [
    { en: "Nikah Mubarak! May Allah bless this sacred union with love, mercy and lifelong companionship.", ur: "نکاح مبارک ہو! اللہ اس مقدس رشتے میں محبت اور برکت عطا فرمائے۔", es: "¡Nikah Mubarak! Que Dios bendiga esta sagrada unión con amor y compañía de por vida.", fr: "Nikah Mubarak ! Que Dieu bénisse cette union sacrée d'amour et de complicité.", ar: "بارك الله لكما وبارك عليكما وجمع بينكما في خیر. نکاح مبارك!", hi: "निकाह मुबारक! ईश्वर इस पवित्र बंधन में प्यार, दया और जीवनभर का साथ प्रदान करे।", zh: "尼卡赫吉庆！愿上天赐予这段神圣的婚姻爱、慈悲与白头偕老的永恒伴侣。", pt: "Nikah Mubarak! Que Deus abençoe esta união sagrada com amor e companheirismo.", ru: "Никах Мубарак! Пусть Аллах благословит этот священный союз любовью и согласием.", de: "Nikah Mubarak! Möge Gott diesen heiligen Bund mit Liebe und Segen erfüllen.", ja: "ニカー・ムバラク！この神聖な結びつきに豊かな愛と祝福がありますように。", ko: "니카 무바라크! 이 거룩한 결합에 사랑과 보살핌이 영원하기를 기도합니다.", it: "Nikah Mubarak! Che Dio benedica questa sacra unione con amore e compagnia eterna.", tr: "Nikahınız Mübarek Olsun! Allah bu kutsal yuvayı sevgisiz ve bereketsiz bırakmasın.", id: "Nikah Mubarak! Semoga Allah memberkahi pernikahan suci ini dengan cinta dan kasih sayang.", bn: "নিকাহ মোবারক! আল্লাহ এই পবিত্র বন্ধনে ভালোবাসা ও বরকত দান করুন।", vi: "Nikah Mubarak! Chúc hôn lễ thiêng liêng của hai bạn luôn ngập tràn tình yêu và bình an.", sw: "Nikah Mubarak! Mungu abariki muungano huu mtukufu kwa upendo na amani." },
  ],
  'shaadi': [
    { en: "Shaadi Mubarak! Wishing the happy couple a lifetime of love and togetherness.", ur: "شادی مبارک ہو! اللہ جوڑے کو ہمیشہ خوش و خرم رکھے۔", es: "¡Felicidades por la boda! Deseando a la feliz pareja toda una vida de amor y unión.", fr: "Félicitations pour le mariage ! Souhaitant au jeune couple une vie d'amour et de bonheur.", ar: "شادي مبارك! نتمنى للعروسين حياة مليئة بالحب والسعادة والتوافق الدائم.", hi: "शादी मुबारक! खुशहाल जोड़े को जीवनभर प्यार और साथ की शुभकामनाएं।", zh: "新婚快乐！祝愿这对新人相亲相爱、百年好合、永结同心。", pt: "Feliz Casamento! Desejando ao feliz casal uma vida inteira de amor e união.", ru: "Поздравляем со свадьбой! Желаем счастливой паре любви и согласия на всю жизнь.", de: "Herzlichen Glückwunsch zur Hochzeit! Wünsche dem glücklichen Paar ein Leben voller Liebe.", ja: "ご結婚おめでとうございます！お二人の末永いお幸せとお慶びをお祈り申し上げます。", ko: "결혼을 축하합니다! 행복한 두 사람의 앞날에 사랑과 기쁨이 영원하기를!", it: "Buon matrimonio! Augurando alla felice coppia una vita di amore e unione.", tr: "Düğününüz Kutlu Olsun! Mutlu çifte ömür boyu sevgi ve birliktelik dileriz.", id: "Selamat Menempuh Hidup Baru! Semoga pasangan berbahagia ini selalu diliputi cinta.", bn: "শাদী মোবারক! নবদম্পতিকে আজীবন ভালোবাসা ও আনন্দের শুভেচ্ছা।", vi: "Chúc mừng đám cưới! Chúc đôi tân lang tân nương hạnh phúc viên mãn suốt đời.", sw: "Hongera za harusi! Nakutakia wanandoa maisha marefu ya upendo na amani." },
  ],
  'basant': [
    { en: "Wishing you a joyful Basant filled with colorful kites, spring blossoms, and happiness!", ur: "بسنت اور بہار کا موسم آپ کے لیے خوشیاں اور رنگارنگ مسکراہٹیں لے کر آئے۔ بسنت مبارک!", es: "¡Te deseo un alegre Basant lleno de cometas de colores, flores de primavera y felicidad!", fr: "En vous souhaitant un joyeux Basant rempli de cerfs-volants colorés et de bonheur !", ar: "نتمنى لك بسنت سعيداً مليئاً بالطائرات الورقية الملونة وزهور الربيع والبهجة!", hi: "रंग-बिरंगी पतंगों और बहार की खुशियों से भरे बसंत उत्सव की हार्दिक शुभकामनाएं!", zh: "祝您风筝节（Basant）快乐！愿春风与五彩斑斓的风筝为您带来满怀的喜悦。", pt: "Desejando um Basant alegre cheio de pipas coloridas e felicidade primaveril!", ru: "Желаем радостного праздника Басант с яркими воздушными змеями и весельем!", de: "Ich wünsche dir ein fröhliches Basant-Fest voller bunter Drachen und Frühlingsfreude!", ja: "色とりどりの凧と春の喜びに満ちた楽しいバサント祭になりますように！", ko: "알록달록한 연과 봄꽃으로 가득한 즐거운 바산트 축제가 되기를 바랍니다!", it: "Ti auguro un felice Basant pieno di aquiloni colorati e felicità primaverile!", tr: "Rengarenk uçurtmalar ve bahar sevinciyle dolu mutlu bir Basant dilerim!", id: "Semoga Basant Anda penuh kegembiraan dengan layang-layang berwarna-warni dan kebahagiaan!", bn: "রঙিন ঘুড়ি ও বসন্তের আনন্দে ভরা বসন্ত উৎসবের শুভেচ্ছা!", vi: "Chúc bạn một lễ hội Basant vui vẻ tràn ngập diều rực rỡ sắc màu và hạnh phúc!", sw: "Nakutakia Basant yenye furaha iliyojaa ghala za rangi na amani ya chipukizi!" },
  ],
  'mehndi': [
    { en: "Wishing you a night filled with colorful mehndi, music, and beautiful celebrations!", ur: "مہندی کی یہ رنگارنگ رات آپ کی زندگی کو خوشیوں اور مسکراہٹوں سے سجا دے۔ مہندی مبارک!", es: "¡Deseándote una noche llena de mehndi colorido, música y hermosas celebraciones!", fr: "En vous souhaitant une nuit remplie de henné coloré, de musique et de belles célébrations !", ar: "نتمنى لك ليلة حناء ملونة مليئة بالموسيقى والاحتفالات الجميلة. مہندی مبارک!", hi: "रंग-बिरंगी मेहंदी, संगीत और खूबसूरत जश्न से भरी इस रात की ढेर सारी शुभकामनाएं!", zh: "愿这个手绘汉纳（Mehndi）之夜充满靓丽色彩、悠扬动听的音乐与难忘的庆祝！", pt: "Desejando uma noite cheia de mehndi colorido, música e celebrações lindas!", ru: "Желаем ночи, полной яркой мехенди, музыки и прекрасных празднований!", de: "Ich wünsche dir eine Nacht voller bunter Mehndi-Muster, Musik und schöner Feiern!", ja: "色鮮やかなメヘンディと音楽、素晴らしいお祝いに満ちた夜になりますように！", ko: "화려한 멘디와 음악, 아름다운 축하로 가득한 밤이 되기를 기원합니다!", it: "Ti auguro una notte piena di mehndi colorati, musica e splendidi festeggiamenti!", tr: "Rengarenk kına desenleri, müzik ve güzel kutlamalarla dolu bir gece dilerim!", id: "Semoga malam ini penuh dengan keindahan mehndi, musik, dan perayaan yang indah!", bn: "মেহেন্দির রঙিন রাতটি গান ও সুখে ভরা উদযাপনে পরিণত হোক। মেহেন্দি মোবারক!", vi: "Chúc bạn một đêm Mehndi rực rỡ sắc màu, âm nhạc và những buổi ăn mừng tuyệt vời!", sw: "Nakutakia usiku wenye rangi za mehndi, muziki na sherehe nzuri!" },
  ],
  'milad': [
    { en: "Wishing you and your family a blessed Eid Milad-un-Nabi. May peace and blessings be upon you.", ur: "عید میلاد النبی مبارک ہو! اللہ تعالیٰ آپ کو حضور اکرم ﷺ کے صدقے ڈھیروں رحمتیں اور برکتیں عطا فرمائے۔", es: "Deseándote a ti y a tu familia un bendito Eid Milad-un-Nabi. Que la paz sea contigo.", fr: "En vous souhaitant à vous et votre famille un béni Eid Milad-un-Nabi. Paix sur vous.", ar: "مولد نبوي شريف مبارك! أعاده الله عليكم وعلى الأمة الإسلامية بالخير واليمن والبركات.", hi: "ईद मिलाद-उन-नबी की दिली मुबारकबाद। ईश्वर आप पर अपनी रहमत बरसाए।", zh: "祝您和您的家人圣纪节吉庆！愿平安全知赐予您与您的家庭。", pt: "Desejando a você e sua família um abençoado Eid Milad-un-Nabi. Paz e bênçãos.", ru: "Мавлид ан-Наби Мубарак! Пусть мир и благословение пребывают с вашей семьей.", de: "Eid Milad-un-Nabi Mubarak! Möge Frieden und Segen auf euch ruhen.", ja: "マウリド・アン＝ナビーのお祝いを申し上げます。平安と祝福がありますように。", ko: "마울리드 안 나비 축복을 전합니다. 평화와 축복이 항상 함께하기를 기원합니다.", it: "Eid Milad-un-Nabi Mubarak a te e alla tua famiglia. Che la pace sia con voi.", tr: "Mevlid Kandiliniz Mübarek Olsun! Peygamberimizin nuru evinize dolsun.", id: "Selamat Memperingati Maulid Nabi Muhammad SAW! Semoga kedamaian menyertai Anda.", bn: "ঈদে মিলাদুন্নবী মোবারক! আল্লাহ তাআলা আপনার পরিবারকে শান্তিতে রাখুন।", vi: "Chúc mừng ngày lễ Eid Milad-un-Nabi. Chúc gia đình bạn bình an và nhận nhiều phước lành.", sw: "Heri ya Eid Milad-un-Nabi. Amani na baraka ziwe juu yako na familia yako." },
  ],
}

const GENERIC_TEMPLATES: MessageTemplate[] = [
  { en: "Sending you my warmest wishes on this special occasion!", ur: "اس خاص موقع پر آپ کو دلی مبارکباد!", es: "¡Te envío mis más cálidos deseos en esta ocasión tan especial!", fr: "Je vous envoie mes meilleurs vœux en cette occasion spéciale !", ar: "أبعث إليك بأطيب الأمنيات وأجمل التهاني في هذه المناسبة الخاصة!", hi: "इस विशेष अवसर पर आपको मेरी हार्दिक शुभकामनाएं!", zh: "在这个特别的日子里，向您致以最诚挚的祝福！", pt: "Enviando meus mais calorosos votos nesta ocasião especial!", ru: "От всей души поздравляю вас с этим знаменательным событием!", de: "Ich sende dir die herzlichsten Grüße zu diesem besonderen Anlass!", ja: "この特別な日に心からの温かいお祝いを申し上げます！", ko: "이 특별한 날을 맞아 마음 깊이 축하의 인사를 전합니다!", it: "Ti invio i miei più caldi auguri in questa occasione speciale!", tr: "Bu özel günde sana en içten dileklerimi gönderiyorum!", id: "Mengirimkan doa dan ucapan hangat pada kesempatan istimewa ini!", bn: "এই বিশেষ উপলক্ষে আপনাকে জানাই আমার আন্তরিক শুভেচ্ছা!", vi: "Gửi đến bạn những lời chúc ấm áp nhất trong dịp đặc biệt này!", sw: "Nakutumia matamanio yangu ya dhati kabisa katika nafasi hii maalum!" },
]

export function getLocalizedTemplateText(template: MessageTemplate | undefined, lang: string): string {
  if (!template) return ''
  const l = lang as keyof MessageTemplate
  if (template[l]) return template[l] as string
  return template.en || ''
}

export function getLocalizedMessageText(msg: string | undefined, occasionId: string | undefined, lang: string): string {
  if (!msg) return ''
  const tmpls = (occasionId && MESSAGE_TEMPLATES[occasionId]) ? MESSAGE_TEMPLATES[occasionId] : GENERIC_TEMPLATES
  for (const tmpl of tmpls) {
    const values = Object.values(tmpl)
    if (values.includes(msg)) {
      const langKey = lang as keyof MessageTemplate
      if (tmpl[langKey]) {
        return tmpl[langKey] as string
      }
    }
  }
  return msg
}

export function getTemplates(occasionId: string | undefined): MessageTemplate[] {
  if (!occasionId) return GENERIC_TEMPLATES
  return MESSAGE_TEMPLATES[occasionId] ?? GENERIC_TEMPLATES
}

export function getOccasionLabel(occ: Occasion | undefined, lang: string, t?: (k: string) => string): string {
  if (!occ) return ''
  if (t) {
    const key = `occ_${occ.id.replace(/-/g, '_')}`
    const translated = t(key as any)
    if (translated) return translated
  }
  if (lang === 'ur' && occ.urdu) return occ.urdu
  return occ.label
}

export function getOccasionTagline(occ: Occasion | undefined, lang: string, t?: (k: string) => string): string {
  if (!occ) return ''
  if (t) {
    const tagKey = `tag_${occ.id.replace(/-/g, '_')}`
    const tagTrans = t(tagKey as any)
    if (tagTrans) return tagTrans
    const occKey = `occ_${occ.id.replace(/-/g, '_')}`
    const occTrans = t(occKey as any)
    if (occTrans) return occTrans
  }
  if (lang === 'ur' && occ.urdu) return occ.urdu
  return occ.tagline || occ.label
}
