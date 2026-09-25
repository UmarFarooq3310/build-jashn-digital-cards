export interface Poem {
  id: string
  title: string
  format: 'two_liner' | 'full_poem' | 'couplet'
  poet: string
  poetUrdu: string
  poetOrigin?: string
  poetEra?: string
  category: 'ishq' | 'wedding' | 'khudi' | 'sufi' | 'birthday' | 'dosti' | 'gham' | 'dua' | 'wisdom'
  categoryLabel: string
  originalLanguage: 'ur' | 'ar' | 'fa' | 'pa' | 'en' | 'hi' | 'es' | 'fr'
  direction: 'rtl' | 'ltr'
  originalText: string
  romanText: string
  englishTranslation: string
  urduTranslation?: string
  meaning?: string
  tags: string[]
  recommendedCardType: 'wish' | 'invitation' | 'magic' | 'any'
  cardPrefillMsg: string
  createdAt?: number
  isCustom?: boolean
  isVerified?: boolean
}

export interface PoetInfo {
  name: string
  nameUrdu: string
  era: string
  origin: string
  tagline: string
  popularThemes: string[]
}

export const POET_PROFILES: Record<string, PoetInfo> = {
  'Allama Iqbal': {
    name: 'Allama Muhammad Iqbal',
    nameUrdu: 'علامہ محمد اقبال',
    era: '1877 – 1938',
    origin: 'Pakistan / South Asia',
    tagline: 'Shair-e-Mashriq (Poet of the East) — Master of Khudi, Vision & Self-Realization',
    popularThemes: ['Khudi', 'Motivation', 'Sufism', 'Youth', 'Shaheen', 'Vision'],
  },
  'Mirza Ghalib': {
    name: 'Mirza Asadullah Khan Ghalib',
    nameUrdu: 'مرزا اسد اللہ خاں غالب',
    era: '1797 – 1869',
    origin: 'Delhi / Agra, South Asia',
    tagline: 'The Legendary Polymath of Urdu & Persian Ghazals — Wit, Love & Philosophy',
    popularThemes: ['Ishq', 'Philosophy', 'Dard', 'Wit', 'Life Realities', 'Ghazal'],
  },
  'Faiz Ahmad Faiz': {
    name: 'Faiz Ahmad Faiz',
    nameUrdu: 'فیض احمد فیض',
    era: '1911 – 1984',
    origin: 'Pakistan',
    tagline: 'Lenin Peace Prize Laureate — Sublime Romance intertwined with Human Dignity',
    popularThemes: ['Love & Hope', 'Elegance', 'Social Justice', 'Longing', 'Hum Dekhenge'],
  },
  'Jaun Elia': {
    name: 'Jaun Elia',
    nameUrdu: 'جون ایلیا',
    era: '1931 – 2002',
    origin: 'Amroha / Karachi',
    tagline: 'The Nihilist Romantic — Raw Emotion, Uncompromising Honesty & Intense Passion',
    popularThemes: ['Heartbreak', 'Existentialism', 'Intense Romance', 'Melancholy', 'Philosophy'],
  },
  'Ahmad Faraz': {
    name: 'Ahmad Faraz',
    nameUrdu: 'احمد فراز',
    era: '1931 – 2008',
    origin: 'Pakistan',
    tagline: 'The Voice of Unconditional Love & Sensual Melodies of Modern Urdu Poetry',
    popularThemes: ['Pure Romance', 'Ghazals', 'Devotion', 'Loyalty', 'Ranjish'],
  },
  'Parveen Shakir': {
    name: 'Parveen Shakir',
    nameUrdu: 'پروین شاکر',
    era: '1952 – 1994',
    origin: 'Pakistan',
    tagline: 'Khushboo of Urdu Poetry — Fragrance of Feminine Sensitivity, Grace & Romance',
    popularThemes: ['Fragrance & Bloom', 'Elegance', 'First Love', 'Nikkah Blessings', 'Khushboo'],
  },
  'Mir Taqi Mir': {
    name: 'Mir Taqi Mir',
    nameUrdu: 'میر تقی میر',
    era: '1723 – 1810',
    origin: 'Delhi / Lucknow',
    tagline: 'Khuda-e-Sukhan (God of Poetic Verses) — Delicacy, Simplicity & Deep Pathos',
    popularThemes: ['Classical Ghazal', 'Patience', 'Deep Affection', 'Heartfelt Pain'],
  },
  'Bahadur Shah Zafar': {
    name: 'Bahadur Shah Zafar',
    nameUrdu: 'بہادر شاہ ظفر',
    era: '1775 – 1862',
    origin: 'Delhi, South Asia',
    tagline: 'The Last Mughal Emperor — Melancholic Majesty, Poetic Grief & Timeless Elegance',
    popularThemes: ['Ghazal', 'Nostalgia', 'Transience', 'Dignity'],
  },
  'Sahir Ludhianvi': {
    name: 'Sahir Ludhianvi',
    nameUrdu: 'ساحر لدھیانوی',
    era: '1921 – 1980',
    origin: 'Ludhiana / Mumbai',
    tagline: 'The People’s Lyricist — Unforgettable Golden Era Poetry of Passion & Social Hope',
    popularThemes: ['Golden Era Ghazals', 'Romance', 'Taj Mahal', 'Humanity'],
  },
  'Nasir Kazmi': {
    name: 'Nasir Kazmi',
    nameUrdu: 'ناصر کاظمی',
    era: '1925 – 1972',
    origin: 'Ambala / Lahore',
    tagline: 'Poet of the Evening Melody — Nostalgia, Moonlit Melancholy & Gentle Grace',
    popularThemes: ['Nostalgia', 'Moonlight', 'Dusk', 'Quiet Romance'],
  },
  'Habib Jalib': {
    name: 'Habib Jalib',
    nameUrdu: 'حبیب جالب',
    era: '1928 – 1993',
    origin: 'Hoshiarpur / Lahore',
    tagline: 'Poet of the Masses — Fearless Truth, Justice, and Unbreakable Spirit',
    popularThemes: ['Truth', 'Courage', 'People’s Voice', 'Freedom'],
  },
  'Jalaluddin Rumi': {
    name: 'Mawlana Jalaluddin Rumi',
    nameUrdu: 'مولانا جلال الدین رومی',
    era: '1207 – 1273',
    origin: 'Balkh / Konya (Persia & Turkey)',
    tagline: 'The Universal Mystic Sage — Ecstatic Divine Love, Unity & Eternal Soul Connection',
    popularThemes: ['Soul Connection', 'Spiritual Love', 'Wedding Unity', 'Light'],
  },
  'Hafez Shirazi': {
    name: 'Khwaja Hafez Shirazi',
    nameUrdu: 'خواجہ حافظ شیرازی',
    era: '1315 – 1390',
    origin: 'Shiraz, Persia',
    tagline: 'Master of Persian Lyrical Mysticism — Joy, Spiritual Wine & Celestial Beauty',
    popularThemes: ['Divine Wine', 'Joy', 'Beloved', 'Spiritual Freedom'],
  },
  'Saadi Shirazi': {
    name: 'Sheikh Saadi Shirazi',
    nameUrdu: 'شیخ سعدی شیرازی',
    era: '1210 – 1291',
    origin: 'Shiraz, Persia',
    tagline: 'Author of Gulistan & Bustan — Universal Human Brotherhood & Timeless Moral Wisdom',
    popularThemes: ['Humanity', 'Compassion', 'Wisdom', 'Ethics'],
  },
  'Omar Khayyam': {
    name: 'Omar Khayyam',
    nameUrdu: 'عمر خیام',
    era: '1048 – 1131',
    origin: 'Nishapur, Persia',
    tagline: 'Astronomer-Poet of the Rubaiyat — Seizing the Present Moment & Wonders of Life',
    popularThemes: ['Carpe Diem', 'Present Moment', 'Beauty of Life', 'Mystery'],
  },
  'Amir Khusro': {
    name: 'Hazrat Amir Khusro',
    nameUrdu: 'حضرت امیر خسرو',
    era: '1253 – 1325',
    origin: 'Delhi, South Asia',
    tagline: 'Tuti-e-Hind (Parrot of India) — Founder of Qawwali & Sublime Spiritual Romance',
    popularThemes: ['Rang', 'Sufi Devotion', 'Celebration', 'Spring'],
  },
  'Bulleh Shah': {
    name: 'Baba Bulleh Shah',
    nameUrdu: 'بابا بلھے شاہ',
    era: '1680 – 1757',
    origin: 'Kasur, Punjab',
    tagline: 'Kafi Master — Ecstatic Mystic Verse of True Unconditional Love & Devotion',
    popularThemes: ['Sufism', 'Divine Union', 'Truth', 'Ecstasy'],
  },
  'Waris Shah': {
    name: 'Syed Waris Shah',
    nameUrdu: 'سید وارث شاہ',
    era: '1722 – 1798',
    origin: 'Jandiala Sher Khan, Punjab',
    tagline: 'Shakespeare of Punjabi — Creator of the Immortal Heer Epic of Devoted Love',
    popularThemes: ['Heer Ranjha', 'Eternal Love', 'Folklore', 'Cultural Heritage'],
  },
  'Mian Muhammad Bakhsh': {
    name: 'Mian Muhammad Bakhsh',
    nameUrdu: 'میاں محمد بخش',
    era: '1830 – 1907',
    origin: 'Kashmir / Punjab',
    tagline: 'Author of Saiful Maluk — Profound Wisdom on Loyalty, Kindness & Faith',
    popularThemes: ['Saiful Maluk', 'Loyalty', 'Good Deeds', 'Patience'],
  },
  'Nizar Qabbani': {
    name: 'Nizar Qabbani',
    nameUrdu: 'نزار قباني',
    era: '1923 – 1998',
    origin: 'Damascus, Syria',
    tagline: 'Poet of Love & Arab Romance — Modern Arabic Master of Sensual Elegance & Flowers',
    popularThemes: ['Arabic Romance', 'Jasmine', 'Bridal Beauty', 'Devotion'],
  },
  'Mahmoud Darwish': {
    name: 'Mahmoud Darwish',
    nameUrdu: 'محمود درويش',
    era: '1941 – 2008',
    origin: 'Palestine',
    tagline: 'National Poet of Palestine — Ethereal Verses on Belonging, Olive Trees & Love',
    popularThemes: ['Belonging', 'Olive Trees', 'Deep Love', 'Hope'],
  },
  'Khalil Gibran': {
    name: 'Kahlil Gibran',
    nameUrdu: 'جبران خلیل جبران',
    era: '1883 – 1931',
    origin: 'Bsharri, Lebanon / Boston',
    tagline: 'Author of The Prophet — Timeless Wisdom on Marriage, Joy, Love & Freedom',
    popularThemes: ['Marriage', 'Giving', 'Children', 'Eternal Companionship'],
  },
  'Rabindranath Tagore': {
    name: 'Rabindranath Tagore',
    nameUrdu: 'رابندر ناتھ ٹیگور',
    era: '1861 – 1941',
    origin: 'Kolkata, Bengal',
    tagline: 'Nobel Laureate — Gitanjali, Song Offerings, Freedom of Mind & Lyrical Peace',
    popularThemes: ['Mind without Fear', 'Nature', 'Divine Peace', 'Love'],
  },
  'William Shakespeare': {
    name: 'William Shakespeare',
    nameUrdu: 'ولیم شیکسپیئر',
    era: '1564 – 1616',
    origin: 'Stratford-upon-Avon, England',
    tagline: 'The Bard of Avon — Supreme Master of Sonnets, True Love & Human Nature',
    popularThemes: ['Sonnet 18', 'Eternal Love', 'Time & Beauty', 'Marriage of True Minds'],
  },
  'Pablo Neruda': {
    name: 'Pablo Neruda',
    nameUrdu: 'پابلو نیرودا',
    era: '1904 – 1973',
    origin: 'Parral, Chile',
    tagline: 'Nobel Laureate — Passionate Love Sonnets, Ocean Depths & Lyrical Intimacy',
    popularThemes: ['Sonnet XVII', 'Pure Love', 'Nature', 'Intimacy'],
  },
  'Maya Angelou': {
    name: 'Maya Angelou',
    nameUrdu: 'مایا اینجلو',
    era: '1928 – 2014',
    origin: 'St. Louis, USA',
    tagline: 'Voice of Courage & Dignity — Still I Rise, Phenomenal Woman & Inner Strength',
    popularThemes: ['Still I Rise', 'Resilience', 'Grace', 'Courage'],
  },
  'Robert Frost': {
    name: 'Robert Frost',
    nameUrdu: 'رابرٹ فراسٹ',
    era: '1874 – 1963',
    origin: 'USA',
    tagline: 'Four-time Pulitzer Laureate — Woods, Stopping by Snowy Evenings & Paths Taken',
    popularThemes: ['Promises to Keep', 'The Road Not Taken', 'Nature', 'Life Journey'],
  },
  'Emily Dickinson': {
    name: 'Emily Dickinson',
    nameUrdu: 'ایملی ڈکنسن',
    era: '1830 – 1886',
    origin: 'Amherst, Massachusetts, USA',
    tagline: 'The Enigmatic Mystic — Hope is the Thing with Feathers & Soulful Introspection',
    popularThemes: ['Hope', 'Soul', 'Immensity of Nature', 'Eternity'],
  },
}

export const POETRY_CATEGORIES = [
  { id: 'ishq', label: 'Love & Romance', labelUrdu: 'عشق و محبت', icon: '💖' },
  { id: 'wedding', label: 'Wedding & Nikkah', labelUrdu: 'شادی و نکاح', icon: '💍' },
  { id: 'khudi', label: 'Motivation & Khudi', labelUrdu: 'خودی و حوصلہ', icon: '🦅' },
  { id: 'sufi', label: 'Sufi & Spiritual', labelUrdu: 'تصوف و معرفت', icon: '🕊️' },
  { id: 'birthday', label: 'Birthday & Milestones', labelUrdu: 'سالگرہ و سنگ میل', icon: '🎂' },
  { id: 'dosti', label: 'Friendship & Wafa', labelUrdu: 'دوستی و وفا', icon: '🤝' },
  { id: 'dua', label: 'Dua & Blessings', labelUrdu: 'دعائیں و برکت', icon: '🤲' },
  { id: 'wisdom', label: 'Wisdom & Life', labelUrdu: 'حکمت و دانائی', icon: '📜' },
  { id: 'gham', label: 'Sad & Melancholy', labelUrdu: 'اداسی و درد', icon: '🥀' },
] as const

export const POPULAR_SEARCH_KEYWORDS = [
  { word: 'خودی', label: '⚡ Khudi (خودی)', query: 'خودی' },
  { word: 'شاہین', label: '🦅 Shaheen (شاہین)', query: 'شاہین' },
  { word: 'عشق', label: '💖 Ishq (عشق و محبت)', query: 'عشق' },
  { word: 'نکاح', label: '💍 Nikkah (نکاح و شادی)', query: 'نکاح' },
  { word: 'سالگرہ', label: '🎂 Birthday (سالگرہ)', query: 'سالگرہ' },
  { word: 'خوشبو', label: '🌸 Khushboo (خوشبو)', query: 'خوشبو' },
  { word: 'رنجش', label: '💔 Ranjish (رنجش)', query: 'رنجش' },
  { word: 'دوست', label: '🤝 Dosti (دوستی)', query: 'دوست' },
  { word: 'دعا', label: '🤲 Dua (دعا و برکت)', query: 'دعا' },
  { word: 'چاند', label: '🌙 Chand (چاند)', query: 'چاند' },
  { word: 'Rumi', label: '🕊️ Rumi & Sufi', query: 'Rumi' },
  { word: 'Shakespeare', label: '🎭 Shakespeare', query: 'Shakespeare' },
]

import poetryFallback from './poetry-fallback.json'

// 1,000 authentic, verified poetry items stored locally (0 Firestore reads, instant 0ms load)
export const POETRY_DATABASE: Poem[] = (poetryFallback as any[]) || []
