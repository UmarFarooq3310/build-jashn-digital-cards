import type { InvitationType } from './types'

export const INVITATION_TYPES: InvitationType[] = [
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

export const INVITATION_CATEGORIES = [
  'Wedding',
  'Religious',
  'Social',
  'Professional',
] as const

export function getInvitationType(id: string | undefined): InvitationType | undefined {
  return INVITATION_TYPES.find((t) => t.id === id)
}
