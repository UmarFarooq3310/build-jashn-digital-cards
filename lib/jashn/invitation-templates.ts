export interface InvitationWordingTemplate {
  name: string
  title: string
  hostNames: string
  notes: string
  dressCode?: string
  lang: 'en' | 'ur'
}

export const INVITATION_WORDING_TEMPLATES: Record<string, InvitationWordingTemplate[]> = {
  'wedding-gala': [
    {
      name: 'Royal Wedding & Reception',
      lang: 'en',
      title: 'Wedding Gala & Reception',
      hostNames: 'The Families of Groom & Bride',
      notes: 'Together with our families, we cordially invite you to celebrate the wedding union and shower your blessings upon the newlywed couple.',
      dressCode: 'Formal Royal / Traditional Black Tie',
    },
    {
      name: 'پرخلوص تقریبِ عروسی و ولیمہ',
      lang: 'ur',
      title: 'پرخلوص تقریبِ عروسی و ولیمہ',
      hostNames: 'خاندانِ احمد و ملک',
      notes: 'تقریبِ عروسی میں تشریف لا کر دولہا اور دلہن کو اپنی دعاؤں سے نوازیں۔ آپ کی شرکت ہمارے لیے باعثِ مسرت و افتخار ہوگی۔',
      dressCode: 'روایتی شاہی لباس',
    },
    {
      name: 'Grand Family Celebration',
      lang: 'en',
      title: 'Grand Wedding Celebration',
      hostNames: 'Chaudhry & Malik Families',
      notes: 'We request the honor of your presence and prayers for the couple as we celebrate their wedding.',
      dressCode: 'Traditional Formal',
    },
  ],
  'nikkah': [
    {
      name: 'Sacred Nikkah Ceremony',
      lang: 'en',
      title: 'Nikkah Ceremony',
      hostNames: 'The Families of Groom & Bride',
      notes: 'In the name of Allah, the Most Gracious. We cordially request the honor of your presence and prayers to bless the couple on their sacred Nikkah ceremony.',
      dressCode: 'Traditional White / Pastels',
    },
    {
      name: 'مبارک تقریبِ نکاح',
      lang: 'ur',
      title: 'باسمِ تعالی - تقریبِ با برکتِ نکاح',
      hostNames: 'خاندانِ احمد و خان',
      notes: 'بارگاہِ الٰہی میں التماس ہے کہ اس پُرمسرت موقع پر تشریف لا کر دولہا اور دلہن کو دعاؤں سے نوازیں۔ آپ کی آمد باعثِ برکت ہوگی۔',
      dressCode: 'روایتی مشرقی لباس',
    },
    {
      name: 'Formal Spiritual Nikkah',
      lang: 'en',
      title: 'Solemn Nikkah & Dua',
      hostNames: 'Mr. & Mrs. Khan',
      notes: 'We warmly invite you to join us and bless the bride and groom as two souls unite under Allah’s grace and mercy.',
      dressCode: 'Formal Modest',
    },
  ],
  'mehndi': [
    {
      name: 'Festive Henna & Dholki Night',
      lang: 'en',
      title: 'Mehndi & Mayun Celebration',
      hostNames: 'Family & Friends',
      notes: 'Henna, beats & festive feasts! Join us for a lively night of dholki, henna, and dancing to celebrate and bless the couple.',
      dressCode: 'Yellow, Green & Vibrant Colors',
    },
    {
      name: 'پُرشور مہندی کی شام',
      lang: 'ur',
      title: 'پُرمسرت تقریبِ مہندی',
      hostNames: 'ہم زلف و دوستان',
      notes: 'ڈھولک اور مہندی کی رنگارنگ شام میں دلہا اور دلہن کو دعائیں دینے کے لیے آپ کی آمد کا انتظار رہے گا۔',
      dressCode: 'زرد و سبز رنگین لباس',
    },
  ],
  'dholki': [
    {
      name: 'Music & Dholki Night',
      lang: 'en',
      title: 'Dholki & Sangeet Night',
      hostNames: 'Bride & Groom Friends',
      notes: 'Bring your best dance moves and brightest smiles for a night of music, joy, and blessings for the couple!',
      dressCode: 'Vibrant Festive Wear',
    },
  ],
  'barat': [
    {
      name: 'Royal Barat Departure & Feast',
      lang: 'en',
      title: 'Barat Ceremony',
      hostNames: 'Groom Family',
      notes: 'Joyfully inviting you to accompany the Barat and bless the newly married couple as they begin their journey together.',
      dressCode: 'Traditional Formal',
    },
    {
      name: 'شاندار بارات',
      lang: 'ur',
      title: 'پُرعظمت تقریبِ بارات',
      hostNames: 'خاندانِ شفیق',
      notes: 'بارات میں شرکت فرما کر دولہا اور دلہن کو اپنی دعاؤں کا تحفہ دیجیے۔ آپ کی آمد ہمارے لیے باعثِ افتخار ہوگی۔',
      dressCode: 'شاندار روایتی لباس',
    },
  ],
  'walima': [
    {
      name: 'Walima Reception Feast',
      lang: 'en',
      title: 'Sunnah Walima Reception',
      hostNames: 'Groom & Family',
      notes: 'In accordance with Sunnah, we cordially invite you to the Walima reception feast to celebrate and pray for the couple.',
      dressCode: 'Formal Elegance',
    },
    {
      name: 'دعوتِ ولیمہ مسنونہ',
      lang: 'ur',
      title: 'پُرخلوص دعوتِ ولیمہ مسنونہ',
      hostNames: 'خاندانِ علی و فاروق',
      notes: 'سنتِ نبویؐ کے مطابق دعوتِ ولیمہ میں شرکت فرما کر طعام نوش فرمائیں اور دلہا دلہن کو اپنی دعاؤں میں یاد رکھیں۔',
      dressCode: 'رسمی باوقار لباس',
    },
  ],
  'birthday-party': [
    {
      name: 'Grand Birthday Bash',
      lang: 'en',
      title: 'Birthday Bash & Cake Cutting',
      hostNames: 'Host & Family',
      notes: 'Join us to celebrate another wonderful year with cake, music, and great memories!',
      dressCode: 'Smart Casual / Party Wear',
    },
    {
      name: 'سالگرہ کی پُر مسرت تقریب',
      lang: 'ur',
      title: 'سالگرہ کی پُرمسرت تقریب',
      hostNames: 'خاندانِ خان',
      notes: 'سالگرہ کا کیک کاٹنے اور خوشیاں بانٹنے کے لیے آپ کی آمد کے منتظر ہیں۔',
      dressCode: 'پارٹی ویئر',
    },
  ],
  'eid-party': [
    {
      name: 'Eid Reunion & Banquet',
      lang: 'en',
      title: 'Eid Mubarak Family Banquet',
      hostNames: 'Family & Friends',
      notes: 'Wishing you a blessed Eid! Join us for Eid delicacies, laughter, and family togetherness.',
      dressCode: 'Traditional Festive',
    },
    {
      name: 'دعوتِ عید ملن',
      lang: 'ur',
      title: 'پُرخلوص دعوتِ عید ملن',
      hostNames: 'خاندانِ رحمن',
      notes: 'عید سعید کے مبارک موقع پر آپ کو پُرتکلف طعام اور عید ملن کی پرخلوص دعوت دی جاتی ہے۔',
      dressCode: 'عید کا روایتی لباس',
    },
  ],
  'graduation-party': [
    {
      name: 'Graduation Success Celebration',
      lang: 'en',
      title: 'Graduation Party',
      hostNames: 'Parents & Family',
      notes: 'Hard work paid off! Come celebrate this academic milestone and bless our graduate for new beginnings.',
      dressCode: 'Semi-Formal / Cocktail',
    },
  ],
  'anniversary-party': [
    {
      name: 'Anniversary Celebration',
      lang: 'en',
      title: 'Wedding Anniversary Party',
      hostNames: 'The Family',
      notes: 'Cheers to years of love and laughter! We warmly invite you to join us as we celebrate this milestone anniversary.',
      dressCode: 'Cocktail Attire',
    },
  ],
  'office-party': [
    {
      name: 'Corporate Annual Gala',
      lang: 'en',
      title: 'Annual Corporate Gala & Dinner',
      hostNames: 'Executive Board',
      notes: 'Celebrating a year of extraordinary achievements, innovation, and teamwork. Your presence will be honored.',
      dressCode: 'Business Formal / Black Tie',
    },
  ],
  'dinner-party': [
    {
      name: 'Exclusive Dinner Party',
      lang: 'en',
      title: 'Soirée & Dinner Party',
      hostNames: 'Your Hosts',
      notes: 'Join us for an evening of fine dining, pleasant conversations, and wonderful company.',
      dressCode: 'Smart Casual',
    },
  ],
}

export const GENERIC_INVITATION_TEMPLATES: InvitationWordingTemplate[] = [
  {
    name: 'Classic General Invitation',
    lang: 'en',
    title: 'Special Event & Gathering',
    hostNames: 'The Host Family',
    notes: 'We request the pleasure of your company to celebrate this special occasion with us.',
    dressCode: 'Formal / Smart Casual',
  },
  {
    name: 'عمومی پُرخلوص دعوت نامہ',
    lang: 'ur',
    title: 'خاص تقریب و محفل',
    hostNames: 'خاندان و دوستان',
    notes: 'اس پُرمسرت موقع پر آپ کی تشریف آوری ہمارے لیے باعثِ فخر و مسرت ہوگی۔',
    dressCode: 'روایتی باوقار لباس',
  },
]

export function getInvitationWordingTemplates(typeId: string | undefined, currentLang?: string): InvitationWordingTemplate[] {
  const all = (!typeId ? GENERIC_INVITATION_TEMPLATES : (INVITATION_WORDING_TEMPLATES[typeId] || GENERIC_INVITATION_TEMPLATES))
  const isRtlLang = currentLang === 'ur' || currentLang === 'ar'

  if (isRtlLang) {
    const urduOnly = all.filter((t) => t.lang === 'ur')
    return urduOnly.length > 0 ? urduOnly : all
  } else {
    const englishOnly = all.filter((t) => t.lang === 'en')
    return englishOnly.length > 0 ? englishOnly : all
  }
}
