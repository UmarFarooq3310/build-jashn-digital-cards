import type { InvitationType } from './types'

export const INVITATION_TYPES: InvitationType[] = [
  // WEDDING (SHAADI)
  { id: 'mehndi', label: 'Mehndi Night', urdu: 'مہندی', category: 'Wedding', icon: 'Flower2', couple: true },
  { id: 'dholki', label: 'Dholki', urdu: 'ڈھولکی', category: 'Wedding', icon: 'Music', couple: true },
  { id: 'nikkah', label: 'Nikkah Ceremony', urdu: 'نکاح', category: 'Wedding', icon: 'Gem', couple: true },
  { id: 'barat', label: 'Barat Day', urdu: 'بارات', category: 'Wedding', icon: 'Crown', couple: true },
  { id: 'walima', label: 'Walima', urdu: 'ولیمہ', category: 'Wedding', icon: 'Utensils', couple: true },
  { id: 'engagement', label: 'Engagement (Mangni)', urdu: 'منگنی', category: 'Wedding', icon: 'Heart', couple: true },

  // RELIGIOUS EVENTS
  { id: 'eid-party', label: 'Eid Party / Gathering', urdu: 'عید ملن', category: 'Religious', icon: 'Moon' },
  { id: 'milad', label: 'Milad un Nabi', urdu: 'میلاد النبی', category: 'Religious', icon: 'Star' },
  { id: 'quran-khatam', label: 'Quran Khatam', urdu: 'قرآن ختم', category: 'Religious', icon: 'BookOpen' },
  { id: 'iftaar', label: 'Iftaar Party', urdu: 'افطار پارٹی', category: 'Religious', icon: 'Utensils' },
  { id: 'chelum', label: 'Chelum / Chehlum', urdu: 'چہلم', category: 'Religious', icon: 'Sprout' },

  // SOCIAL EVENTS
  { id: 'birthday-party', label: 'Birthday Party', urdu: 'سالگرہ', category: 'Social', icon: 'Cake' },
  { id: 'graduation-party', label: 'Graduation Party', urdu: 'گریجویشن', category: 'Social', icon: 'GraduationCap' },
  { id: 'family-reunion', label: 'Family Reunion', urdu: 'فیملی ملاپ', category: 'Social', icon: 'Users' },
  { id: 'baby-shower', label: 'Baby Shower', urdu: 'بے بی شاور', category: 'Social', icon: 'Baby' },
  { id: 'kids-party', label: 'Kids Party', urdu: 'بچوں کی پارٹی', category: 'Social', icon: 'PartyPopper' },
  { id: 'house-warming', label: 'House Warming', urdu: 'گھر وارمنگ', category: 'Social', icon: 'House' },

  // PROFESSIONAL / BUSINESS
  { id: 'shop-opening', label: 'Shop / Business Opening', urdu: 'دکان کی افتتاح', category: 'Professional', icon: 'Store' },
  { id: 'office-party', label: 'Office Party', urdu: 'آفس پارٹی', category: 'Professional', icon: 'Briefcase' },
  { id: 'seminar', label: 'Seminar / Webinar', urdu: 'سیمینار', category: 'Professional', icon: 'Users' },
  { id: 'product-launch', label: 'Product Launch', urdu: 'پروڈکٹ لانچ', category: 'Professional', icon: 'Rocket' },
  { id: 'school-function', label: 'School / College Function', urdu: 'تقریب', category: 'Professional', icon: 'Building2' },
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
