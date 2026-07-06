import type { InvitationType } from './types'

const RAW_INVITATION_TYPES: any[] = [
  // WEDDING (SHAADI)
  { id: 'mehndi',     label: 'Mehndi Night',          urdu: 'مہندی',            category: 'Wedding',      icon: 'Flower2',       couple: true, bgImage: '/invitations/mehndi.jpg',          bgGradient: 'linear-gradient(160deg,#2e7d32,#f9a825)' },
  { id: 'dholki',     label: 'Dholki',                urdu: 'ڈھولکی',           category: 'Wedding',      icon: 'Music',         couple: true, bgImage: '/invitations/dholki.jpg',          bgGradient: 'linear-gradient(160deg,#880e4f,#f9a825)' },
  { id: 'nikkah',     label: 'Nikkah Ceremony',       urdu: 'نکاح',             category: 'Wedding',      icon: 'Gem',           couple: true, bgImage: '/invitations/nikkah.jpg',          bgGradient: 'linear-gradient(160deg,#bf8600,#5d4037)' },
  { id: 'barat',      label: 'Barat Day',             urdu: 'بارات',            category: 'Wedding',      icon: 'Crown',         couple: true, bgImage: '/invitations/barat.jpg',           bgGradient: 'linear-gradient(160deg,#8e0f24,#4a0510)' },
  { id: 'walima',     label: 'Walima',                urdu: 'ولیمہ',            category: 'Wedding',      icon: 'Utensils',      couple: true, bgImage: '/invitations/walima.jpg',          bgGradient: 'linear-gradient(160deg,#c8a96e,#5d4037)' },
  { id: 'engagement', label: 'Engagement (Mangni)',   urdu: 'منگنی',            category: 'Wedding',      icon: 'Heart',         couple: true, bgImage: '/invitations/engagement.jpg',      bgGradient: 'linear-gradient(160deg,#880e4f,#c2185b)' },

  // RELIGIOUS EVENTS
  { id: 'eid-party',     label: 'Eid Party / Gathering', urdu: 'عید ملن',      category: 'Religious',    icon: 'Moon',                      bgImage: '/invitations/eid-party.jpg',       bgGradient: 'linear-gradient(160deg,#1b5e20,#33691e)' },
  { id: 'milad',         label: 'Milad un Nabi',         urdu: 'میلاد النبی',  category: 'Religious',    icon: 'Star',                      bgImage: '/invitations/milad.jpg',           bgGradient: 'linear-gradient(160deg,#1a237e,#006064)' },
  { id: 'quran-khatamå',  label: 'Quran Khatam',          urdu: 'قرآن ختم',     category: 'Religious',    icon: 'BookOpen',                  bgImage: '/invitations/quran-khatam.jpg',    bgGradient: 'linear-gradient(160deg,#004d40,#1b5e20)' },
  { id: 'iftaar',        label: 'Iftaar Party',          urdu: 'افطار پارٹی',  category: 'Religious',    icon: 'Utensils',                  bgImage: '/invitations/iftaar.jpg',          bgGradient: 'linear-gradient(160deg,#1a237e,#311b92)' },
  { id: 'chelum',        label: 'Chelum / Chehlum',      urdu: 'چہلم',         category: 'Religious',    icon: 'Sprout',                    bgImage: '/invitations/chelum.jpg',          bgGradient: 'linear-gradient(160deg,#37474f,#455a64)' },

  // SOCIAL EVENTS
  { id: 'birthday-party',  label: 'Birthday Party',     urdu: 'سالگرہ',       category: 'Social',       icon: 'Cake',                      bgImage: '/invitations/birthday-party.jpg',  bgGradient: 'linear-gradient(160deg,#1a237e,#7b1fa2)' },
  { id: 'graduation-party',label: 'Graduation Party',   urdu: 'گریجویشن',     category: 'Social',       icon: 'GraduationCap',             bgImage: '/invitations/graduation-party.jpg',bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'family-reunion',  label: 'Family Reunion',     urdu: 'فیملی ملاپ',   category: 'Social',       icon: 'Users',                     bgImage: '/invitations/family-reunion.jpg',  bgGradient: 'linear-gradient(160deg,#e65100,#bf360c)' },
  { id: 'baby-shower',     label: 'Baby Shower',        urdu: 'بے بی شاور',   category: 'Social',       icon: 'Baby',                      bgImage: '/invitations/baby-shower.jpg',     bgGradient: 'linear-gradient(160deg,#f48fb1,#ce93d8)' },
  { id: 'kids-party',      label: 'Kids Party',         urdu: 'بچوں کی پارٹی',category: 'Social',       icon: 'PartyPopper',               bgImage: '/invitations/kids-party.jpg',      bgGradient: 'linear-gradient(160deg,#e91e63,#ff9800)' },
  { id: 'house-warming',   label: 'House Warming',      urdu: 'گھر وارمنگ',   category: 'Social',       icon: 'House',                     bgImage: '/invitations/house-warming.jpg',   bgGradient: 'linear-gradient(160deg,#4e342e,#795548)' },

  // PROFESSIONAL / BUSINESS
  { id: 'shop-opening',   label: 'Shop / Business Opening', urdu: 'دکان کی افتتاح', category: 'Professional', icon: 'Store',      bgImage: '/invitations/shop-opening.jpg',    bgGradient: 'linear-gradient(160deg,#0d47a1,#1565c0)' },
  { id: 'office-party',   label: 'Office Party',            urdu: 'آفس پارٹی',      category: 'Professional', icon: 'Briefcase',  bgImage: '/invitations/office-party.jpg',    bgGradient: 'linear-gradient(160deg,#37474f,#1a237e)' },
  { id: 'seminar',        label: 'Seminar / Webinar',       urdu: 'سیمینار',         category: 'Professional', icon: 'Users',      bgImage: '/invitations/seminar.jpg',         bgGradient: 'linear-gradient(160deg,#1565c0,#283593)' },
  { id: 'product-launch', label: 'Product Launch',          urdu: 'پروڈکٹ لانچ',    category: 'Professional', icon: 'Rocket',     bgImage: '/invitations/product-launch.jpg',  bgGradient: 'linear-gradient(160deg,#0d1b4c,#4a0e6b)' },
  { id: 'school-function',label: 'School / College Function',urdu: 'تقریب',          category: 'Professional', icon: 'Building2',  bgImage: '/invitations/school-function.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#0d47a1)' },
]

export const INVITATION_TYPES: InvitationType[] = RAW_INVITATION_TYPES.map(type => {
  let soundCategory: 'dholki' | 'islamic' | 'festive' | 'somber' | 'default' = 'default'
  let patternOverlay = 'jashn-pattern-personal'
  let decorations: string[] = ['confetti']

  const cat = type.category
  if (cat === 'Wedding') {
    soundCategory = 'dholki'
    patternOverlay = 'jashn-pattern-wedding'
    decorations = ['dholak', 'shehnai', 'floral-borders']
  } else if (cat === 'Religious') {
    if (type.id === 'chelum') {
      soundCategory = 'somber'
      patternOverlay = 'jashn-pattern-professional'
      decorations = ['foliage']
    } else {
      soundCategory = 'islamic'
      patternOverlay = 'jashn-pattern-islamic'
      decorations = ['moon', 'star-cluster']
    }
  } else if (cat === 'Social') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-personal'
    decorations = type.id === 'engagement' || type.id === 'anniversary' ? ['heart', 'sparkles'] : ['confetti', 'balloons']
  } else if (cat === 'Professional') {
    soundCategory = 'default'
    patternOverlay = 'jashn-pattern-professional'
    decorations = ['achievement-badge', 'nodes']
  }

  const baseVariant = { id: 'default', name: 'Default Gradient', bgGradient: type.bgGradient || 'linear-gradient(160deg,#1a237e,#7b1fa2)' }
  
  let bgVariants: { id: string; name: string; bgGradient: string; bgImage?: string }[] = [baseVariant]
  if (cat === 'Wedding') {
    bgVariants.push(
      { id: 'wedding-crimson', name: 'Crimson Velvet', bgGradient: 'linear-gradient(160deg,#8e0f24,#4a0510)' },
      { id: 'wedding-gold', name: 'Mughal Gold', bgGradient: 'linear-gradient(160deg,#bf8600,#5d4037)' },
      { id: 'wedding-teal', name: 'Feroza Teal', bgGradient: 'linear-gradient(160deg,#006064,#004d40)' },
      { id: 'wedding-royal', name: 'Royal Indigo', bgGradient: 'linear-gradient(160deg,#1a237e,#bf8600)' },
      { id: 'wedding-emerald-gold', name: 'Emerald & Gold', bgGradient: 'linear-gradient(160deg,#0a2e16,#1e3d2f,#d97706)' },
      { id: 'wedding-royal-plum', name: 'Royal Plum & Gold', bgGradient: 'linear-gradient(160deg,#2e0854,#4a148c,#d97706)' },
      { id: 'wedding-champagne-pink', name: 'Rose & Champagne', bgGradient: 'linear-gradient(160deg,#50051e,#880e4f,#fbcfe8)' }
    )
  } else if (cat === 'Religious') {
    if (type.id === 'chelum') {
      bgVariants.push(
        { id: 'somber-slate', name: 'Slate Dusk', bgGradient: 'linear-gradient(160deg,#37474f,#263238)' },
        { id: 'somber-navy', name: 'Midnight Peace', bgGradient: 'linear-gradient(160deg,#0d1b4c,#050a26)' }
      )
    } else {
      bgVariants.push(
        { id: 'islamic-emerald', name: 'Emerald Arch', bgGradient: 'linear-gradient(160deg,#0a3d1f,#1b5e20)' },
        { id: 'islamic-royal', name: 'Royal Blue Night', bgGradient: 'linear-gradient(160deg,#0d1b4c,#1a237e)' },
        { id: 'islamic-crimson', name: 'Mughal Crimson', bgGradient: 'linear-gradient(160deg,#5c0010,#8e0f24)' },
        { id: 'islamic-ivory', name: 'Ivory Gold', bgGradient: 'linear-gradient(160deg,#f3e9d2,#e4d3aa)' },
        { id: 'islamic-midnight-gold', name: 'Midnight & Gold', bgGradient: 'linear-gradient(160deg,#020617,#1e1b4b,#d97706)' },
        { id: 'islamic-emerald-glow', name: 'Emerald Glow', bgGradient: 'linear-gradient(160deg,#022c22,#064e3b,#10b981)' },
        { id: 'islamic-sand-gold', name: 'Sahara Amber', bgGradient: 'linear-gradient(160deg,#1e1b4b,#451a03,#eab308)' }
      )
    }
  } else if (cat === 'Professional') {
    bgVariants.push(
      { id: 'achieve-steel', name: 'Steel Success', bgGradient: 'linear-gradient(160deg,#37474f,#1a237e)' },
      { id: 'achieve-emerald', name: 'Emerald Wealth', bgGradient: 'linear-gradient(160deg,#1b5e20,#004d40)' },
      { id: 'achieve-bronze', name: 'Bronze Gold', bgGradient: 'linear-gradient(160deg,#4e342e,#2c1a12)' },
      { id: 'achieve-deep-space', name: 'Midnight Space', bgGradient: 'linear-gradient(160deg,#09090b,#172554,#3b82f6)' },
      { id: 'achieve-platinum-silver', name: 'Silver Slate', bgGradient: 'linear-gradient(160deg,#0f0f10,#27272a,#a1a1aa)' },
      { id: 'achieve-purple-glow', name: 'Purple Glow', bgGradient: 'linear-gradient(160deg,#1e1b4b,#4c1d95,#a78bfa)' }
    )
  } else {
    bgVariants.push(
      { id: 'festive-pink', name: 'Vibrant Pink', bgGradient: 'linear-gradient(160deg,#e91e63,#880e4f)' },
      { id: 'festive-sunset', name: 'Sunset Purple', bgGradient: 'linear-gradient(160deg,#7b1fa2,#4a148c)' },
      { id: 'festive-teal', name: 'Teal Oasis', bgGradient: 'linear-gradient(160deg,#006064,#002d30)' },
      { id: 'festive-lavender', name: 'Lavender Dusk', bgGradient: 'linear-gradient(160deg,#1e1b4b,#311042,#c084fc)' },
      { id: 'festive-sunset-glow', name: 'Sunset Glow', bgGradient: 'linear-gradient(160deg,#310015,#500724,#f59e0b)' },
      { id: 'festive-aurora', name: 'Aurora Glimmer', bgGradient: 'linear-gradient(160deg,#030712,#111827,#0d9488)' }
    )
  }

  return {
    ...type,
    soundCategory,
    patternOverlay,
    decorations,
    bgVariants
  }
})

export const INVITATION_CATEGORIES = [
  'Wedding',
  'Religious',
  'Social',
  'Professional',
] as const

export function getInvitationType(id: string | undefined): InvitationType | undefined {
  return INVITATION_TYPES.find((t) => t.id === id)
}
