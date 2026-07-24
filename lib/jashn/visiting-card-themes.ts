import type { VisitingCardCategory, VisitingCardTheme } from './types'

export const VISITING_CARD_CATEGORIES: { id: VisitingCardCategory; label: string; icon: string; tagline: string }[] = [
  { id: 'business', label: 'Corporate & Business', icon: 'Building2', tagline: 'Executive, Founder, Manager & Corporate Professional' },
  { id: 'creative', label: 'Tech & Freelancers', icon: 'Code', tagline: 'Software Developer, UI Designer, Creator & Marketer' },
  { id: 'medical', label: 'Medical & Healthcare', icon: 'Stethoscope', tagline: 'Doctor, Surgeon, Clinic, Specialist & Dentist' },
  { id: 'legal', label: 'Legal & Advocate', icon: 'Scale', tagline: 'Lawyer, Attorney, Legal Consultant & Corporate Advisor' },
  { id: 'real-estate', label: 'Real Estate & Builders', icon: 'Home', tagline: 'Realtor, Property Agent, Builder & Interior Architect' },
  { id: 'beauty', label: 'Fashion & Beauty Salon', icon: 'Sparkles', tagline: 'Makeup Artist, Hair Stylist, Fashion Designer & Boutique' },
  { id: 'services', label: 'Services & Consultants', icon: 'Wrench', tagline: 'Chef, Fitness Trainer, Electrician, Auto Service & Handyman' },
]

export const VISITING_CARD_THEMES: VisitingCardTheme[] = [
  {
    id: 'executive-gold',
    name: 'Executive Gold & Dark',
    bgGradient: 'linear-gradient(135deg, #09090b 0%, #1e1b4b 50%, #ca8a04 100%)',
    textColor: '#ffffff',
    accentColor: '#eab308',
    cardBg: '#09090b',
    isPremium: true,
  },
  {
    id: 'tech-dark',
    name: 'Cyber Tech Dark',
    bgGradient: 'linear-gradient(135deg, #030712 0%, #0f172a 60%, #06b6d4 100%)',
    textColor: '#ffffff',
    accentColor: '#22d3ee',
    cardBg: '#0b0f19',
    isPremium: false,
  },
  {
    id: 'emerald-luxury',
    name: 'Royal Emerald & Gold',
    bgGradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #d97706 100%)',
    textColor: '#ffffff',
    accentColor: '#f59e0b',
    cardBg: '#04271e',
    isPremium: true,
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Navy & Platinum',
    bgGradient: 'linear-gradient(135deg, #0a0e3a 0%, #1e3a8a 60%, #3b82f6 100%)',
    textColor: '#ffffff',
    accentColor: '#60a5fa',
    cardBg: '#0e172a',
    isPremium: false,
  },
  {
    id: 'rose-gold-elegance',
    name: 'Rose Gold Elegance',
    bgGradient: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #fb7185 100%)',
    textColor: '#ffffff',
    accentColor: '#fda4af',
    cardBg: '#370617',
    isPremium: true,
  },
  {
    id: 'minimal-clean',
    name: 'Clean Pearl & Slate',
    bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 60%, #94a3b8 100%)',
    textColor: '#0f172a',
    accentColor: '#0d9488',
    cardBg: '#ffffff',
    isPremium: false,
  },
]

export function getVisitingCardTheme(themeId?: string): VisitingCardTheme {
  return VISITING_CARD_THEMES.find((t) => t.id === themeId) || VISITING_CARD_THEMES[0]
}
