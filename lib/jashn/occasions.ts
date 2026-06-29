import type { Occasion, MessageTemplate } from './types'

export const OCCASIONS: Occasion[] = [
  // PERSONAL
  { id: 'birthday', label: 'Birthday', tagline: 'Saalgirah Mubarak', urdu: 'سالگرہ مبارک', category: 'Personal', icon: 'Cake' },
  { id: 'anniversary', label: 'Anniversary', tagline: 'Anniversary Mubarak', urdu: 'سالگرہِ شادی مبارک', category: 'Personal', icon: 'Heart' },
  { id: 'new-baby', label: 'New Baby', tagline: 'Mubarak ho!', urdu: 'مبارک ہو', category: 'Personal', icon: 'Baby' },
  { id: 'get-well-soon', label: 'Get Well Soon', tagline: 'Sehatmand raho', urdu: 'صحت مند رہو', category: 'Personal', icon: 'HeartPulse' },
  { id: 'farewell', label: 'Farewell', tagline: 'Alvida', urdu: 'الوداع', category: 'Personal', icon: 'Plane' },
  { id: 'congratulations', label: 'Congratulations', tagline: 'Mubarak ho', urdu: 'مبارک ہو', category: 'Personal', icon: 'PartyPopper' },
  { id: 'thank-you', label: 'Thank You', tagline: 'Shukriya', urdu: 'شکریہ', category: 'Personal', icon: 'Gift' },
  { id: 'miss-you', label: 'Miss You', tagline: 'Tumhari yaad aati hai', urdu: 'تمہاری یاد آتی ہے', category: 'Personal', icon: 'HandHeart' },
  { id: 'good-luck', label: 'Good Luck', tagline: 'Kamiyaabi ki dua', urdu: 'کامیابی کی دعا', category: 'Personal', icon: 'Sparkles' },
  { id: 'welcome-back', label: 'Welcome Back', tagline: 'Khush Aamdeed', urdu: 'خوش آمدید', category: 'Personal', icon: 'Sprout' },

  // ISLAMIC & RELIGIOUS
  { id: 'eid-ul-fitr', label: 'Eid ul Fitr', tagline: 'Eid Mubarak', urdu: 'عید مبارک', category: 'Islamic', icon: 'Moon' },
  { id: 'eid-ul-adha', label: 'Eid ul Adha', tagline: 'Eid ul Adha Mubarak', urdu: 'عید الاضحیٰ مبارک', category: 'Islamic', icon: 'Moon' },
  { id: 'ramadan', label: 'Ramadan Mubarak', tagline: 'Ramadan Mubarak', urdu: 'رمضان مبارک', category: 'Islamic', icon: 'Moon' },
  { id: 'jumma', label: 'Jumma Mubarak', tagline: 'Jumma Mubarak', urdu: 'جمعہ مبارک', category: 'Islamic', icon: 'Star' },
  { id: 'hajj', label: 'Hajj Mubarak', tagline: 'Hajj Mubarak', urdu: 'حج مبارک', category: 'Islamic', icon: 'Star' },
  { id: 'umrah', label: 'Umrah Mubarak', tagline: 'Umrah Mubarak', urdu: 'عمرہ مبارک', category: 'Islamic', icon: 'Star' },
  { id: 'milad', label: 'Milad-un-Nabi', tagline: 'Milad Mubarak', urdu: 'میلاد مبارک', category: 'Islamic', icon: 'Moon' },

  // ACHIEVEMENTS
  { id: 'graduation', label: 'Graduation', tagline: 'Kamiyabi Mubarak', urdu: 'کامیابی مبارک', category: 'Achievements', icon: 'GraduationCap' },
  { id: 'new-job', label: 'New Job', tagline: 'Naukri Mubarak', urdu: 'نوکری مبارک', category: 'Achievements', icon: 'Briefcase' },
  { id: 'promotion', label: 'Promotion', tagline: 'Taraqqi Mubarak', urdu: 'ترقی مبارک', category: 'Achievements', icon: 'Award' },
  { id: 'new-home', label: 'New Home', tagline: 'Ghar Mubarak', urdu: 'گھر مبارک', category: 'Achievements', icon: 'House' },
  { id: 'business-launch', label: 'Business Launch', tagline: 'Mubarak ho', urdu: 'مبارک ہو', category: 'Achievements', icon: 'Rocket' },
  { id: 'exam-pass', label: 'Result / Exam Pass', tagline: 'Kamiyabi Mubarak', urdu: 'کامیابی مبارک', category: 'Achievements', icon: 'ScrollText' },

  // SEASONAL / NATIONAL
  { id: 'new-year', label: 'New Year', tagline: 'Naya Saal Mubarak', urdu: 'نیا سال مبارک', category: 'National', icon: 'Sparkles' },
  { id: 'independence-day', label: 'Independence Day', tagline: 'Jashn-e-Azadi Mubarak', urdu: 'جشنِ آزادی مبارک', category: 'National', icon: 'Flag' },
  { id: 'kashmir-day', label: 'Kashmir Day', tagline: 'Yakjehti-e-Kashmir', urdu: 'یکجہتی کشمیر', category: 'National', icon: 'Flag' },
  { id: 'mothers-day', label: "Mother's Day", tagline: 'Maa ke naam', urdu: 'ماں کے نام', category: 'National', icon: 'Heart' },
  { id: 'fathers-day', label: "Father's Day", tagline: 'Baba ke naam', urdu: 'بابا کے نام', category: 'National', icon: 'Heart' },
  { id: 'valentines', label: "Valentine's Day", tagline: 'Pyar ka din', urdu: 'محبت کا دن', category: 'National', icon: 'Heart' },
  { id: 'friendship-day', label: 'Friendship Day', tagline: 'Dosti Mubarak', urdu: 'دوستی مبارک', category: 'National', icon: 'Users' },
  { id: 'basant', label: 'Basant / Spring', tagline: 'Basant Bahar Mubarak', urdu: 'بسنت بہار مبارک', category: 'National', icon: 'Flower2' },

  // FAMILY
  { id: 'condolence', label: 'Condolence', tagline: 'Inna lillahi wa inna ilayhi raji\u2019un', urdu: 'اِنّا لِلّٰہِ وَاِنّا اِلَیہِ رَاجِعُون', category: 'Family', icon: 'Sprout' },
  { id: 'nikah', label: 'Nikah Mubarak', tagline: 'Nikah Mubarak', urdu: 'نکاح مبارک', category: 'Family', icon: 'Gem' },
  { id: 'shaadi', label: 'Shaadi Mubarak', tagline: 'Shaadi Mubarak', urdu: 'شادی مبارک', category: 'Family', icon: 'Crown' },
  { id: 'mehndi', label: 'Mehndi Mubarak', tagline: 'Mehndi Mubarak', urdu: 'مہندی مبارک', category: 'Family', icon: 'Flower2' },
]

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
