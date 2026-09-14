export type EventCategory = 'islamic' | 'global_faiths' | 'family' | 'national' | 'milestones'

export interface CalendarEventDef {
  id: string
  title: string
  urduTitle: string
  category: EventCategory
  description: string
  hijriNote?: string
  ruleType: 'fixed' | 'nth_weekday' | 'scheduled'
  fixedMonth?: number
  fixedDay?: number
  nthWeekday?: {
    month: number
    dayOfWeek: number
    nth: number
  }
  scheduledDates?: Array<{
    date: string
    hijriNote?: string
  }>
  greetings: {
    en: string
    ur: string
  }
  ctaText: string
  ctaLink: string
  emoji: string
}

export interface CalculatedEvent {
  id: string
  title: string
  urduTitle: string
  category: EventCategory
  description: string
  hijriNote?: string
  date: Date
  dateStr: string
  formattedDate: string
  daysRemaining: number
  badgeText: string
  greetings: {
    en: string
    ur: string
  }
  ctaText: string
  ctaLink: string
  wishLink: string
  invitationLink: string
  occasionId: string
  invitationTypeId: string
  emoji: string
}

export const CATEGORY_LABELS: Record<EventCategory, { en: string; ur: string; color: string; border: string; bg: string }> = {
  islamic: {
    en: "Islamic & Hijri",
    ur: "اسلامی و ہجری",
    color: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  global_faiths: {
    en: "Global Faiths",
    ur: "عالمی مذاہب و تہوار",
    color: "text-purple-700 dark:text-purple-300",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
  },
  family: {
    en: "Family & Love",
    ur: "خاندان اور رشتے",
    color: "text-rose-700 dark:text-rose-300",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
  },
  national: {
    en: "National & Civic",
    ur: "قومی اور بین الاقوامی",
    color: "text-blue-700 dark:text-blue-300",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  milestones: {
    en: "Milestones & Seasons",
    ur: "سنگ میل اور سیزنز",
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
}

function calculateNthWeekday(year: number, month: number, dayOfWeek: number, nth: number): Date {
  if (nth > 0) {
    const firstDay = new Date(year, month - 1, 1)
    const firstDayOfWeek = firstDay.getDay()
    const offset = (dayOfWeek - firstDayOfWeek + 7) % 7
    const targetDay = 1 + offset + (nth - 1) * 7
    return new Date(year, month - 1, targetDay)
  } else {
    const nextMonthFirst = new Date(year, month, 1)
    const lastDay = new Date(nextMonthFirst.getTime() - 86400000)
    const cur = new Date(lastDay)
    while (cur.getDay() !== dayOfWeek) {
      cur.setDate(cur.getDate() - 1)
    }
    return cur
  }
}

export const ALL_WORLDWIDE_EVENTS: CalendarEventDef[] = [
  {
    "id": "eid-milad-un-nabi",
    "title": "Eid Milad-un-Nabi (Mawlid al-Nabi)",
    "urduTitle": "عید میلاد النبی ﷺ",
    "category": "islamic",
    "description": "Celebration of the birth of the Holy Prophet Muhammad (PBUH) on 12 Rabi-ul-Awwal. Commemorated with spiritual gatherings, illumination, and sharing sweets.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2026-09-25",
        "hijriNote": "12 Rabi-ul-Awwal 1448 AH"
      },
      {
        "date": "2027-09-14",
        "hijriNote": "12 Rabi-ul-Awwal 1449 AH"
      },
      {
        "date": "2028-09-02",
        "hijriNote": "12 Rabi-ul-Awwal 1450 AH"
      }
    ],
    "greetings": {
      "en": "May the divine blessings of Prophet Muhammad (PBUH) illuminate your life with peace, joy, and faith. Happy Mawlid al-Nabi!",
      "ur": "آپ کو اور آپ کے اہل خانہ کو جشنِ ولادتِ مصطفیٰ ﷺ بہت بہت مبارک ہو۔ اللہ پاک ہم سب پر اپنی رحمتیں نازل فرمائے۔"
    },
    "ctaText": "Send 3D Milad Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🕌"
  },
  {
    "id": "gyarvi-shareef",
    "title": "Gyarvi Sharif (11th Rabi-us-Sani)",
    "urduTitle": "گیارہویں شریف",
    "category": "islamic",
    "description": "Monthly spiritual gathering commemorating Hazrat Sheikh Abdul Qadir Jilani (R.A), observed with charity and Khatam-e-Quran.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2026-10-23",
        "hijriNote": "11 Rabi-us-Sani 1448 AH"
      },
      {
        "date": "2027-10-12",
        "hijriNote": "11 Rabi-us-Sani 1449 AH"
      }
    ],
    "greetings": {
      "en": "Gyarvi Sharif Mubarak! May spiritual harmony and divine blessings surround you and your family.",
      "ur": "گیارہویں شریف کی فیوض و برکات آپ کے اہل خانہ پر برسیں۔ اللہ تعالیٰ سب کو نیک اعمال کی توفیق دے۔"
    },
    "ctaText": "Send Spiritual Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "📿"
  },
  {
    "id": "shab-e-miraj",
    "title": "Shab-e-Miraj (Isra and Mi'raj)",
    "urduTitle": "شبِ معراج النبی ﷺ",
    "category": "islamic",
    "description": "The blessed night commemorating the miraculous ascension of Prophet Muhammad (PBUH) to the heavens on the 27th of Rajab.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-01-06",
        "hijriNote": "27 Rajab 1448 AH"
      },
      {
        "date": "2027-12-26",
        "hijriNote": "27 Rajab 1449 AH"
      }
    ],
    "greetings": {
      "en": "On this holy night of Isra & Miraj, may your heartfelt prayers be answered and your home be filled with divine light.",
      "ur": "شبِ معراج کے اس پرنور موقع پر اللہ تعالیٰ آپ کی تمام دعائیں قبول فرمائے اور زندگی میں برکت و سکون عطا کرے۔"
    },
    "ctaText": "Send Miraj Dua Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "✨"
  },
  {
    "id": "shab-e-barat",
    "title": "Shab-e-Barat (Night of Forgiveness)",
    "urduTitle": "شبِ برات (لیلة البراءة)",
    "category": "islamic",
    "description": "The night of records and forgiveness on 15th Shaban. Believers engage in night-long worship, Quran recitation, and seeking pardon from loved ones.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-01-23",
        "hijriNote": "15 Shaban 1448 AH"
      },
      {
        "date": "2028-01-12",
        "hijriNote": "15 Shaban 1449 AH"
      }
    ],
    "greetings": {
      "en": "On Shab-e-Barat, I seek your forgiveness for any shortcomings. May Allah grant you health, prosperity, and peace.",
      "ur": "شبِ برات کے بابرکت لمحوں میں اگر مجھ سے کوئی غلطی ہوئی ہو تو معاف فرمائیں۔ دعا گو ہوں کہ اللہ آپ کا دامن خوشیوں سے بھر دے۔"
    },
    "ctaText": "Send Forgiveness Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🤲"
  },
  {
    "id": "ramadan-start",
    "title": "First Day of Ramadan (Holy Month of Fasting)",
    "urduTitle": "یکم رمضان المبارک",
    "category": "islamic",
    "description": "The dawn of the sacred month of Ramadan. Muslims worldwide observe fasting, Taraweeh prayers, charity, and self-purification.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-02-08",
        "hijriNote": "1 Ramadan 1448 AH"
      },
      {
        "date": "2028-01-28",
        "hijriNote": "1 Ramadan 1449 AH"
      }
    ],
    "greetings": {
      "en": "Ramadan Mubarak! May this sacred month bring endless peace, forgiveness, and health to you and your loved ones.",
      "ur": "ماہِ صیام کی پہلی سحری اور رمضان المبارک کی آمد بہت بہت مبارک ہو! اللہ پاک روزے اور عبادات قبول فرمائے۔"
    },
    "ctaText": "Send Ramadan Mubarak Card",
    "ctaLink": "/create-wish?category=ramadan",
    "emoji": "🌙"
  },
  {
    "id": "roza-kushai-season",
    "title": "Roza Kushai Season (Child's First Fast)",
    "urduTitle": "روزہ کشائی تقریبات",
    "category": "islamic",
    "description": "Celebration honoring children observing their very first fast, marked with rose garlands, special iftar feasts, and family blessings.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-02-22",
        "hijriNote": "15 Ramadan 1448 AH"
      },
      {
        "date": "2028-02-11",
        "hijriNote": "15 Ramadan 1449 AH"
      }
    ],
    "greetings": {
      "en": "Mubarak on this memorable Roza Kushai milestone! May Allah bless the little one with deep iman and a radiant future.",
      "ur": "ننھے روزے دار کو پہلا روزہ مبارک! اللہ تعالیٰ بچے کو دین و دنیا کی تمام بھلائیاں اور نیک توفیق عطا فرمائے۔"
    },
    "ctaText": "Make Roza Kushai Invite",
    "ctaLink": "/create-invitation",
    "emoji": "🌸"
  },
  {
    "id": "laylat-al-qadr",
    "title": "Laylat al-Qadr (Night of Power)",
    "urduTitle": "لیلۃ القدر (شبِ قدر)",
    "category": "islamic",
    "description": "The night better than a thousand months (27th of Ramadan). The Quran was first revealed to Prophet Muhammad (PBUH) on this blessed night.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-06",
        "hijriNote": "27 Ramadan 1448 AH"
      },
      {
        "date": "2028-02-23",
        "hijriNote": "27 Ramadan 1449 AH"
      }
    ],
    "greetings": {
      "en": "May the divine grace of Laylat al-Qadr heal all sorrows, answer your prayers, and multiply your blessings.",
      "ur": "ہزار مہینوں سے افضل رات لیلۃ القدر کی برکتیں آپ پر اور آپ کے اہل خانہ پر سایہ فگن ہوں۔ دعاؤں میں یاد رکھیں۔"
    },
    "ctaText": "Send Shab-e-Qadr Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "⭐"
  },
  {
    "id": "chand-raat",
    "title": "Chand Raat (Eve of Eid ul-Fitr)",
    "urduTitle": "چاند رات مبارک",
    "category": "islamic",
    "description": "The joyful evening marking the sighting of the Shawwal crescent. Vibrant night bazaars, mehndi application, and family celebrations.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-09",
        "hijriNote": "29/30 Ramadan 1448 AH"
      },
      {
        "date": "2028-02-26",
        "hijriNote": "29/30 Ramadan 1449 AH"
      }
    ],
    "greetings": {
      "en": "Chand Raat Mubarak! May the sight of the new moon bring glittering happiness, henna smiles, and festive joy!",
      "ur": "چاند رات مبارک! ہاتھوں پر مہندی کی خوشبو اور دلوں میں خوشیوں کے ساتھ عید کی آمد آپ سب کو مبارک ہو۔"
    },
    "ctaText": "Send Chand Raat Card",
    "ctaLink": "/create-wish?category=eid",
    "emoji": "🎉"
  },
  {
    "id": "eid-ul-fitr",
    "title": "Eid ul-Fitr (The Feast of Fast-Breaking)",
    "urduTitle": "عید الفطر المبارک",
    "category": "islamic",
    "description": "The grand three-day Islamic festival concluding Ramadan. Celebrated with congregational prayers, family banquets, Eidi gifting, and sweet sheer khurma.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-10",
        "hijriNote": "1 Shawwal 1448 AH"
      },
      {
        "date": "2028-02-27",
        "hijriNote": "1 Shawwal 1449 AH"
      }
    ],
    "greetings": {
      "en": "Eid Mubarak! May this joyous day bring peace, laughter, and togetherness to your heart and home.",
      "ur": "عید الفطر کی دلی مبارکباد! اللہ تعالیٰ آپ کی تمام عبادات اور روزے قبول فرمائے اور یہ عید آپ کے لیے خوشیاں لائے۔"
    },
    "ctaText": "Send 3D Eid Card",
    "ctaLink": "/eid-mubarak-cards",
    "emoji": "🕌"
  },
  {
    "id": "hajj-season",
    "title": "Hajj Pilgrimage Begins",
    "urduTitle": "مناسکِ حج کا آغاز",
    "category": "islamic",
    "description": "Millions of pilgrims assemble in Makkah and Mina to perform the sacred fifth pillar of Islam.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-05-15",
        "hijriNote": "8 Dhu al-Hijjah 1448 AH"
      },
      {
        "date": "2028-05-04",
        "hijriNote": "8 Dhu al-Hijjah 1449 AH"
      }
    ],
    "greetings": {
      "en": "Hajj Mubarak to all pilgrims! May Allah accept their prayers and grant every believer the opportunity to visit the holy Kaaba.",
      "ur": "حج مبرور! اللہ تعالیٰ تمام عازمینِ حج کے مناسک قبول فرمائے اور ہر مسلمان کو حرمین شریفین کی زیارت نصیب فرمائے۔"
    },
    "ctaText": "Send Hajj Mubarak Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🕋"
  },
  {
    "id": "day-of-arafah",
    "title": "Day of Arafah (Youm-e-Arafat)",
    "urduTitle": "یومِ عرفہ",
    "category": "islamic",
    "description": "The pinnacle of the Hajj pilgrimage. Pilgrims stand on Mount Arafat seeking divine mercy and forgiveness from dawn until dusk.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-05-16",
        "hijriNote": "9 Dhu al-Hijjah 1448 AH"
      },
      {
        "date": "2028-05-05",
        "hijriNote": "9 Dhu al-Hijjah 1449 AH"
      }
    ],
    "greetings": {
      "en": "On this blessed Day of Arafah, may your fasts and duas wipe away all past sins and welcome unending peace.",
      "ur": "یومِ عرفہ کی پرنور ساعتیں مبارک! دعا ہے کہ اللہ پاک آج کے دن مانگی گئی تمام التجائیں قبول فرمائے۔"
    },
    "ctaText": "Send Arafah Dua Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🌄"
  },
  {
    "id": "eid-ul-adha",
    "title": "Eid ul-Adha (Feast of the Sacrifice)",
    "urduTitle": "عید الاضحیٰ (بقر عید)",
    "category": "islamic",
    "description": "Commemorating Prophet Ibrahim's willingness to sacrifice in obedience to Allah. Marked by Qurbani, charity, and communal feasts.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-05-17",
        "hijriNote": "10 Dhu al-Hijjah 1448 AH"
      },
      {
        "date": "2028-05-06",
        "hijriNote": "10 Dhu al-Hijjah 1449 AH"
      }
    ],
    "greetings": {
      "en": "Eid ul-Adha Mubarak! May the spirit of sacrifice bring peace, prosperity, and endless blessings to your household.",
      "ur": "عید الاضحیٰ مبارک! اللہ تعالیٰ آپ کی قربانی، جذبہ اور دعائیں شرفِ قبولیت بخشے۔ باربی کیو اور خوشیاں مبارک!"
    },
    "ctaText": "Send 3D Qurbani Card",
    "ctaLink": "/eid-mubarak-cards",
    "emoji": "🐑"
  },
  {
    "id": "islamic-new-year",
    "title": "Islamic New Year (1st Muharram 1449 AH)",
    "urduTitle": "نیا اسلامی سال (یکم محرم الحرام)",
    "category": "islamic",
    "description": "The beginning of the new Hijri calendar year commemorating the historic migration (Hijrah) of Prophet Muhammad (PBUH) from Makkah to Madinah.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-06-05",
        "hijriNote": "1 Muharram 1449 AH"
      },
      {
        "date": "2028-05-25",
        "hijriNote": "1 Muharram 1450 AH"
      }
    ],
    "greetings": {
      "en": "Hijri New Year Mubarak! May the new Islamic year 1449 bring peace, renewed faith, and harmony to our world.",
      "ur": "نیا ہجری سال 1449 مبارک! دعا ہے کہ یہ سال امتِ مسلمہ اور آپ کے گھرانے کے لیے امن و سلامتی کا پیامبر ہو۔"
    },
    "ctaText": "Send New Hijri Year Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🗓️"
  },
  {
    "id": "day-of-ashura",
    "title": "Day of Ashura (10th Muharram)",
    "urduTitle": "یومِ عاشور (10 محرم)",
    "category": "islamic",
    "description": "Solemn day remembering the supreme sacrifice of Hazrat Imam Hussain (R.A) and his companions at Karbala for truth and justice.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-06-14",
        "hijriNote": "10 Muharram 1449 AH"
      },
      {
        "date": "2028-06-03",
        "hijriNote": "10 Muharram 1450 AH"
      }
    ],
    "greetings": {
      "en": "May the profound lessons of patience, truth, and courage of Karbala guide our hearts on the path of righteousness.",
      "ur": "شہدائے کربلا کی لازوال قربانیوں کو سلام۔ اللہ تعالیٰ ہمیں حق و سچ کے راستے پر ثابت قدم رہنے کی توفیق عطا فرمائے۔"
    },
    "ctaText": "Share Ashura Remembrance",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🕊️"
  },
  {
    "id": "chehlum-imam-hussain",
    "title": "Chehlum / Arba'een (20th Safar)",
    "urduTitle": "چہلم حضرت امام حسین رضی اللہ عنہ",
    "category": "islamic",
    "description": "The fortieth day after the Day of Ashura, marked with pilgrimage and contemplation on sacrifice and justice.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-07-24",
        "hijriNote": "20 Safar 1449 AH"
      },
      {
        "date": "2028-07-13",
        "hijriNote": "20 Safar 1450 AH"
      }
    ],
    "greetings": {
      "en": "Honoring the enduring legacy of courage and justice. May peace prevail in every heart and nation.",
      "ur": "شہادتِ امام حسین علیہ السلام کا چہلم۔ حق اور انصاف کا وہ پیغام جو صدیوں تک زندہ رہے گا۔"
    },
    "ctaText": "Send Memorial Card",
    "ctaLink": "/create-wish?category=islamic",
    "emoji": "🖤"
  },
  {
    "id": "halloween",
    "title": "Halloween (All Hallows' Eve)",
    "urduTitle": "ہیلووین تہوار",
    "category": "global_faiths",
    "description": "Global celebration of trick-or-treating, costumes, pumpkin lanterns, and spooky party gatherings.",
    "ruleType": "fixed",
    "fixedMonth": 10,
    "fixedDay": 31,
    "greetings": {
      "en": "Happy Halloween! Wishing you a night full of fun costumes, sweet treats, and spooky delight!",
      "ur": "ہیلووین مبارک! ڈھیروں میٹھی ٹریٹس اور پرلطف رات آپ کے لیے یادگار ثابت ہو۔"
    },
    "ctaText": "Send Halloween Wish",
    "ctaLink": "/create-wish?category=halloween",
    "emoji": "🎃"
  },
  {
    "id": "all-saints-day",
    "title": "All Saints' Day",
    "urduTitle": "آل سینٹس ڈے",
    "category": "global_faiths",
    "description": "Christian holiday honoring all known and unknown saints and martyrs in Christian faith.",
    "ruleType": "fixed",
    "fixedMonth": 11,
    "fixedDay": 1,
    "greetings": {
      "en": "Wishing you a blessed All Saints' Day filled with grace, peace, and spiritual reflection.",
      "ur": "آل سینٹس ڈے کی پرامن اور بابرکت مبارکباد۔"
    },
    "ctaText": "Send Blessings Card",
    "ctaLink": "/create-wish?category=christian",
    "emoji": "🕯️"
  },
  {
    "id": "diwali",
    "title": "Diwali (Festival of Lights)",
    "urduTitle": "دیوالی (روشنیوں کا تہوار)",
    "category": "global_faiths",
    "description": "Major Hindu festival celebrating the victory of light over darkness and good over evil with oil diyas, fireworks, and mithai.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2026-11-08"
      },
      {
        "date": "2027-10-29"
      },
      {
        "date": "2028-10-17"
      }
    ],
    "greetings": {
      "en": "Happy Diwali! May the divine light bring eternal joy, prosperity, and good health to your household.",
      "ur": "دیوالی کی پرمسرت مبارکباد! روشنیوں کا یہ تہوار آپ کی زندگی میں امن اور برکتیں لائے۔"
    },
    "ctaText": "Send 3D Diwali Card",
    "ctaLink": "/create-wish?category=diwali",
    "emoji": "🪔"
  },
  {
    "id": "hanukkah",
    "title": "Hanukkah (Festival of Dedication)",
    "urduTitle": "ہنوکا (تہوارِ روشنائی)",
    "category": "global_faiths",
    "description": "Eight-day Jewish celebration marked by the lighting of the menorah, playing dreidel, and eating traditional foods.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2026-12-04"
      },
      {
        "date": "2027-12-24"
      }
    ],
    "greetings": {
      "en": "Happy Hanukkah! May the light of the menorah illuminate your days with happiness, peace, and warmth.",
      "ur": "ہنوکا مبارک! شمع دان کی روشنی آپ کے گھر کو محبت اور سکون سے بھر دے۔"
    },
    "ctaText": "Send Hanukkah Card",
    "ctaLink": "/create-wish?category=holiday",
    "emoji": "🕎"
  },
  {
    "id": "christmas-eve",
    "title": "Christmas Eve",
    "urduTitle": "کرسمس ایو",
    "category": "global_faiths",
    "description": "The enchanting evening before Christmas Day celebrated with candlelight carols, family reunions, and tree decorating.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 24,
    "greetings": {
      "en": "Wishing you a peaceful Christmas Eve surrounded by family warmth, glowing carols, and heartfelt joy.",
      "ur": "کرسمس ایو کی خوبصورت شام مبارک! آپ کا گھر خوشیوں اور محبت کے گیتوں سے گونج اٹھے۔"
    },
    "ctaText": "Send Christmas Card",
    "ctaLink": "/create-wish?category=christmas",
    "emoji": "🎄"
  },
  {
    "id": "christmas-day",
    "title": "Christmas Day",
    "urduTitle": "کرسمس کا تہوار",
    "category": "global_faiths",
    "description": "Celebration of the birth of Jesus Christ, marked by church services, gift exchanges, and feasts across the globe.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 25,
    "greetings": {
      "en": "Merry Christmas! May the season bring boundless peace, love, and joyful laughter to you and yours.",
      "ur": "میری کرسمس! یہ مقدس تہوار آپ کے لیے خوشیاں، امن اور بے شمار برکتیں لے کر آئے۔"
    },
    "ctaText": "Send 3D Christmas Card",
    "ctaLink": "/create-wish?category=christmas",
    "emoji": "🎅"
  },
  {
    "id": "boxing-day",
    "title": "Boxing Day",
    "urduTitle": "باکسنگ ڈے",
    "category": "global_faiths",
    "description": "Traditional Commonwealth holiday on Dec 26 celebrating sharing gifts, charity boxes, and sports tournaments.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 26,
    "greetings": {
      "en": "Happy Boxing Day! Wishing you relaxing moments, great holiday feasts, and time with loved ones.",
      "ur": "باکسنگ ڈے مبارک! تعطیلات کا یہ وقت آپ کے لیے پُرسکون اور مسرت بخش ہو۔"
    },
    "ctaText": "Send Holiday Wish",
    "ctaLink": "/create-wish?category=holiday",
    "emoji": "🎁"
  },
  {
    "id": "new-years-eve",
    "title": "New Year's Eve",
    "urduTitle": "نیو ایئر ایو (سالِ نو کی رات)",
    "category": "global_faiths",
    "description": "Worldwide countdown welcoming the incoming calendar year with fireworks, parties, and champagne toasts.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 31,
    "greetings": {
      "en": "Cheers to New Year's Eve! Here's to leaving worries behind and stepping into a year of breakthroughs.",
      "ur": "نیو ایئر ایو مبارک! نیا سال آپ کے لیے کامیابیوں، صحت اور نئی امیدوں کی نوید لائے۔"
    },
    "ctaText": "Send New Year Card",
    "ctaLink": "/create-wish?category=newyear",
    "emoji": "🥂"
  },
  {
    "id": "new-years-day",
    "title": "New Year's Day (Welcome 2027)",
    "urduTitle": "نیا سال مبارک 2027",
    "category": "global_faiths",
    "description": "First day of the Gregorian calendar year. A day for fresh starts, resolutions, family brunches, and blessings.",
    "ruleType": "fixed",
    "fixedMonth": 1,
    "fixedDay": 1,
    "greetings": {
      "en": "Happy New Year 2027! May the coming 365 days be your most fulfilling, peaceful, and prosperous yet.",
      "ur": "نیا سال 2027 بہت بہت مبارک ہو! دعا ہے کہ یہ سال آپ کے تمام خوابوں کی تعبیر بن کر آئے۔"
    },
    "ctaText": "Send 3D New Year Card",
    "ctaLink": "/create-wish?category=newyear",
    "emoji": "🎆"
  },
  {
    "id": "orthodox-christmas",
    "title": "Orthodox Christmas",
    "urduTitle": "آرتھوڈوکس کرسمس",
    "category": "global_faiths",
    "description": "Celebrated according to the Julian calendar by Eastern Orthodox Christians across Eastern Europe and Greece.",
    "ruleType": "fixed",
    "fixedMonth": 1,
    "fixedDay": 7,
    "greetings": {
      "en": "Merry Orthodox Christmas! Wishing you divine tranquility, warmth, and fellowship.",
      "ur": "آرتھوڈوکس کرسمس کی مبارکباد! آپ کے گھر امن اور برکت قائم رہے۔"
    },
    "ctaText": "Send Orthodox Card",
    "ctaLink": "/create-wish?category=christmas",
    "emoji": "⭐"
  },
  {
    "id": "makar-sankranti",
    "title": "Makar Sankranti & Lohri",
    "urduTitle": "مکر سنکرانتی اور لوہڑی",
    "category": "global_faiths",
    "description": "Winter harvest festival celebrating the transition of the sun into Capricorn with kite-flying and bonfire feasts.",
    "ruleType": "fixed",
    "fixedMonth": 1,
    "fixedDay": 14,
    "greetings": {
      "en": "Happy Makar Sankranti & Lohri! May the warmth of the bonfire fill your days with abundance and vitality.",
      "ur": "مکر سنکرانتی اور لوہڑی کی دلی مبارکباد! نئی فصل اور الاؤ کی گرمی خوشحالی لائے۔"
    },
    "ctaText": "Send Harvest Card",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🪁"
  },
  {
    "id": "chinese-new-year",
    "title": "Lunar New Year / Chinese Spring Festival",
    "urduTitle": "چینی سالِ نو (بہار کا تہوار)",
    "category": "global_faiths",
    "description": "Major East Asian festival featuring dragon dances, red envelopes (hongbao), family reunions, and dumpling feasts.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-02-06"
      },
      {
        "date": "2028-01-26"
      }
    ],
    "greetings": {
      "en": "Gong Xi Fa Cai! Wishing you immense wealth, longevity, and thriving fortunes in the New Lunar Year.",
      "ur": "چینی نئے سال کی شاندار مبارکباد! یہ نیا سال آپ کے لیے ترقی اور خوشحالی لے کر آئے۔"
    },
    "ctaText": "Send Lunar New Year Card",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🏮"
  },
  {
    "id": "lantern-festival",
    "title": "Lantern Festival (Yuanxiao)",
    "urduTitle": "لالٹین فیسٹیول",
    "category": "global_faiths",
    "description": "Concluding day of the Lunar New Year celebrations marked by releasing illuminated paper lanterns into the night sky.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-02-20"
      },
      {
        "date": "2028-02-09"
      }
    ],
    "greetings": {
      "en": "Happy Lantern Festival! May every floating lantern carry your wishes into a bright and hopeful future.",
      "ur": "لالٹین فیسٹیول مبارک! روشنیاں آپ کی زندگی کا اندھیرا دور کر دیں۔"
    },
    "ctaText": "Send Lantern Wish",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🏮"
  },
  {
    "id": "maha-shivratri",
    "title": "Maha Shivratri",
    "urduTitle": "مہا شیو راتری",
    "category": "global_faiths",
    "description": "The Great Night of Shiva in Hindu tradition, celebrated with all-night vigils, meditation, and offerings.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-06"
      },
      {
        "date": "2028-02-24"
      }
    ],
    "greetings": {
      "en": "Happy Maha Shivratri! May divine power bring clarity, strength, and inner peace into your spirit.",
      "ur": "مہا شیو راتری کی شب آپ کے لیے روحانی سکون اور کامیابیوں کا ذریعہ بنے۔"
    },
    "ctaText": "Send Spiritual Card",
    "ctaLink": "/create-wish?category=spiritual",
    "emoji": "🔱"
  },
  {
    "id": "st-patricks-day",
    "title": "St. Patrick's Day",
    "urduTitle": "سینٹ پیٹرکس ڈے",
    "category": "global_faiths",
    "description": "Irish cultural and religious holiday marked worldwide by wearing green, clover emblems, and festive parades.",
    "ruleType": "fixed",
    "fixedMonth": 3,
    "fixedDay": 17,
    "greetings": {
      "en": "Happy St. Patrick's Day! May the luck of the shamrock be with you in everything you do!",
      "ur": "سینٹ پیٹرکس ڈے مبارک! خوش قسمتی اور مسکراہٹیں ہمیشہ آپ کے ساتھ رہیں۔"
    },
    "ctaText": "Send Green Wish",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "☘️"
  },
  {
    "id": "nowruz",
    "title": "Nowruz (Persian & Kurdish New Year)",
    "urduTitle": "جشنِ نوروز",
    "category": "global_faiths",
    "description": "Ancient celebration of the spring equinox representing renewal, celebrated across Iran, Central Asia, and Pakistan.",
    "ruleType": "fixed",
    "fixedMonth": 3,
    "fixedDay": 20,
    "greetings": {
      "en": "Nowruz Mubarak! May the rebirth of nature bring fresh beginnings, prosperity, and colorful joy.",
      "ur": "نوروز مبارک! بہار کی آمد آپ کی زندگی کو سرسبز اور شاداب بنا دے۔"
    },
    "ctaText": "Send Nowruz Card",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🌱"
  },
  {
    "id": "purim",
    "title": "Purim",
    "urduTitle": "پوریم کا تہوار",
    "category": "global_faiths",
    "description": "Joyful Jewish holiday commemorating the salvation of the Jewish people in ancient Persia, marked with costumes and treats.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-23"
      },
      {
        "date": "2028-03-12"
      }
    ],
    "greetings": {
      "en": "Chag Purim Sameach! Wishing you a day of laughter, delicious hamantaschen, and celebration.",
      "ur": "پوریم کا تہوار مبارک! خوشیوں اور میٹھے پکوانوں سے بھرا دن مبارک ہو۔"
    },
    "ctaText": "Send Purim Card",
    "ctaLink": "/create-wish?category=holiday",
    "emoji": "🎭"
  },
  {
    "id": "holi",
    "title": "Holi (Festival of Colors)",
    "urduTitle": "ہولی (رنگوں کا تہوار)",
    "category": "global_faiths",
    "description": "Vibrant Hindu festival celebrating the arrival of spring, love, and the triumph of good, celebrated with colored gulal powders.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-22"
      },
      {
        "date": "2028-03-11"
      }
    ],
    "greetings": {
      "en": "Happy Holi! May your life be painted with the vibrant colors of love, laughter, and lasting peace.",
      "ur": "ہولی کی رنگ برنگی مبارکباد! یہ تہوار آپ کی زندگی میں قوس قزح کے رنگ بھر دے۔"
    },
    "ctaText": "Send 3D Holi Card",
    "ctaLink": "/create-wish?category=holi",
    "emoji": "🎨"
  },
  {
    "id": "good-friday",
    "title": "Good Friday",
    "urduTitle": "گڈ فرائیڈے",
    "category": "global_faiths",
    "description": "Christian holy day commemorating the crucifixion of Jesus Christ and his sacrifice at Calvary.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-26"
      },
      {
        "date": "2028-04-14"
      }
    ],
    "greetings": {
      "en": "May the grace and supreme sacrifice commemorated on Good Friday inspire peace and humility in your life.",
      "ur": "گڈ فرائیڈے پر قربانی اور محبت کے ابدی پیغام کی یاد مبارک۔"
    },
    "ctaText": "Send Thoughtful Card",
    "ctaLink": "/create-wish?category=christian",
    "emoji": "✝️"
  },
  {
    "id": "easter-sunday",
    "title": "Easter Sunday",
    "urduTitle": "ایسٹر سنڈے",
    "category": "global_faiths",
    "description": "The primary Christian celebration honoring the resurrection of Jesus Christ, marked by sunrise services and Easter egg hunts.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-03-28"
      },
      {
        "date": "2028-04-16"
      }
    ],
    "greetings": {
      "en": "Happy Easter! May the promise of renewal and resurrection fill your home with radiant hope and joy.",
      "ur": "ایسٹر سنڈے کی مسرت مبارک! یہ بہار کا تہوار آپ کے لیے نئی امیدیں اور خوشیاں لائے۔"
    },
    "ctaText": "Send Easter Card",
    "ctaLink": "/create-wish?category=easter",
    "emoji": "🐣"
  },
  {
    "id": "passover",
    "title": "Passover (Pesach)",
    "urduTitle": "عیدِ فسح (پیساخ)",
    "category": "global_faiths",
    "description": "Major Jewish festival commemorating the liberation from slavery in ancient Egypt, celebrated with the traditional Seder feast.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-04-22"
      },
      {
        "date": "2028-04-11"
      }
    ],
    "greetings": {
      "en": "Chag Pesach Sameach! Wishing you a blessed Passover full of freedom, renewal, and family peace.",
      "ur": "عیدِ فسح مبارک! آزادی اور تجدید کا یہ مقدس وقت آپ کے لیے مبارک ہو۔"
    },
    "ctaText": "Send Passover Card",
    "ctaLink": "/create-wish?category=holiday",
    "emoji": "🍷"
  },
  {
    "id": "vaisakhi",
    "title": "Vaisakhi (Baisakhi Harvest Festival)",
    "urduTitle": "بیساکھی کا میلہ",
    "category": "global_faiths",
    "description": "Sikh and Punjabi harvest festival celebrating the birth of the Khalsa panth with bhangra dancing and community langar.",
    "ruleType": "fixed",
    "fixedMonth": 4,
    "fixedDay": 13,
    "greetings": {
      "en": "Happy Vaisakhi! May the golden harvest bring prosperity, music, and abundant cheer to your home.",
      "ur": "بیساکھی مبارک! سنہری فصلیں اور خوشیاں آپ کے آنگن میں رقصاں رہیں۔"
    },
    "ctaText": "Send Vaisakhi Card",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🌾"
  },
  {
    "id": "buddha-purnima",
    "title": "Buddha Purnima (Vesak)",
    "urduTitle": "بدھ پورنیما (ویساک)",
    "category": "global_faiths",
    "description": "Celebration of the birth, enlightenment, and passing of Gautama Buddha, observed with meditation and lantern offerings.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-05-20"
      },
      {
        "date": "2028-05-09"
      }
    ],
    "greetings": {
      "en": "Happy Buddha Purnima! May the teachings of compassion, mindfulness, and peace guide your path.",
      "ur": "بدھ پورنیما مبارک! امن، سچائی اور رواداری کی روشنی آپ کے دل کو منور رکھے۔"
    },
    "ctaText": "Send Peace Card",
    "ctaLink": "/create-wish?category=spiritual",
    "emoji": "☸️"
  },
  {
    "id": "raksha-bandhan",
    "title": "Raksha Bandhan (Rakhi)",
    "urduTitle": "رکشا بندھن (راکھی)",
    "category": "global_faiths",
    "description": "Indian and South Asian festival celebrating the sacred bond between brothers and sisters through tying the sacred rakhi thread.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-08-18"
      },
      {
        "date": "2028-08-05"
      }
    ],
    "greetings": {
      "en": "Happy Raksha Bandhan! Celebrating the unbreakable bond of love, protection, and laughter between siblings.",
      "ur": "رکشا بندھن مبارک! بہن بھائی کا یہ انمول رشتہ ہمیشہ پیار اور حفاظت کے سائے میں پروان چڑھے۔"
    },
    "ctaText": "Send Rakhi Card",
    "ctaLink": "/create-wish?category=sibling",
    "emoji": "🧵"
  },
  {
    "id": "janmashtami",
    "title": "Krishna Janmashtami",
    "urduTitle": "کرشن جنم اشٹمی",
    "category": "global_faiths",
    "description": "Hindu festival celebrating the birth of Lord Krishna with devotional singing, fasting, and Dahi Handi competitions.",
    "ruleType": "scheduled",
    "scheduledDates": [
      {
        "date": "2027-08-25"
      },
      {
        "date": "2028-08-13"
      }
    ],
    "greetings": {
      "en": "Happy Janmashtami! May melody, righteousness, and pure joy touch every corner of your world.",
      "ur": "جنم اشٹمی مبارک! محبت اور امن کا پیغام آپ کے لیے خوشیاں لائے۔"
    },
    "ctaText": "Send Celebration Card",
    "ctaLink": "/create-wish?category=cultural",
    "emoji": "🪈"
  },
  {
    "id": "daughters-day",
    "title": "International Daughters Day",
    "urduTitle": "بیٹیوں کا عالمی دن",
    "category": "family",
    "description": "Celebrating the unconditional warmth, joy, and sparkle daughters bring to families worldwide.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 9,
      "dayOfWeek": 0,
      "nth": 4
    },
    "greetings": {
      "en": "Happy Daughters Day! To the light of our eyes and the heartbeat of our home — we love you endlessly!",
      "ur": "ہماری پیاری بیٹی کو بیٹیوں کا دن مبارک! تم ہمارے گھر کی رونق اور رب کی سب سے خوبصورت رحمت ہو۔"
    },
    "ctaText": "Send Daughter Wish",
    "ctaLink": "/create-wish?category=family",
    "emoji": "👧"
  },
  {
    "id": "world-smile-day",
    "title": "World Smile Day",
    "urduTitle": "مسکراہٹ کا عالمی دن",
    "category": "family",
    "description": "Dedicated to smiles and kind acts across the globe on the first Friday of October.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 10,
      "dayOfWeek": 5,
      "nth": 1
    },
    "greetings": {
      "en": "Happy World Smile Day! Keep sharing that beautiful smile of yours — it makes the world brighter!",
      "ur": "مسکراہٹ کا عالمی دن مبارک! مسکراتے رہیں کیونکہ آپ کی مسکراہٹ دوسروں کے دلوں میں امید جگاتی ہے۔"
    },
    "ctaText": "Send Smile Card",
    "ctaLink": "/create-wish?category=friendship",
    "emoji": "😊"
  },
  {
    "id": "sweetest-day",
    "title": "Sweetest Day",
    "urduTitle": "سوئیٹسٹ ڈے",
    "category": "family",
    "description": "Observed on the third Saturday of October to share sweet messages, chocolates, and notes of appreciation.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 10,
      "dayOfWeek": 6,
      "nth": 3
    },
    "greetings": {
      "en": "Happy Sweetest Day! Sending sweet thoughts and warm wishes to the sweetest person in my life.",
      "ur": "سوئیٹسٹ ڈے مبارک! آپ کا ساتھ میری زندگی کا سب سے پیارا اور میٹھا تحفہ ہے۔"
    },
    "ctaText": "Send Sweet Card",
    "ctaLink": "/create-wish?category=love",
    "emoji": "🍫"
  },
  {
    "id": "international-mens-day",
    "title": "International Men's Day",
    "urduTitle": "مردوں کا عالمی دن",
    "category": "family",
    "description": "Recognizing positive male role models, fathers, brothers, and husbands who contribute selflessly to family and society.",
    "ruleType": "fixed",
    "fixedMonth": 11,
    "fixedDay": 19,
    "greetings": {
      "en": "Happy Men's Day! Thank you for your strength, guidance, and endless support in our lives.",
      "ur": "مردوں کے عالمی دن پر آپ کی محنت، قربانیوں اور خاندانی دیکھ بھال کو سلام۔"
    },
    "ctaText": "Send Appreciation Card",
    "ctaLink": "/create-wish?category=family",
    "emoji": "👔"
  },
  {
    "id": "thanksgiving-day",
    "title": "Thanksgiving Day (United States)",
    "urduTitle": "یومِ تشکر (تھینکس گونگ)",
    "category": "family",
    "description": "National day of gratitude, roasted turkey feasts, and family gatherings on the fourth Thursday of November.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 11,
      "dayOfWeek": 4,
      "nth": 4
    },
    "greetings": {
      "en": "Happy Thanksgiving! Grateful for the gift of your presence, friendship, and shared memories.",
      "ur": "یومِ تشکر مبارک! اللہ تعالیٰ کی عطا کردہ نعمتوں اور آپ کی مخلص صحبت پر دل سے شکرگزار ہوں۔"
    },
    "ctaText": "Send Thanksgiving Card",
    "ctaLink": "/create-wish?category=holiday",
    "emoji": "🦃"
  },
  {
    "id": "valentines-day",
    "title": "Valentine's Day",
    "urduTitle": "ویلنٹائن ڈے (یومِ محبت)",
    "category": "family",
    "description": "Global celebration of romantic love, flowers, chocolates, and heartfelt declarations.",
    "ruleType": "fixed",
    "fixedMonth": 2,
    "fixedDay": 14,
    "greetings": {
      "en": "Happy Valentine's Day, my love! With you, every single day feels magical and deeply blessed.",
      "ur": "ویلنٹائن ڈے مبارک! میری زندگی میں آپ کی محبت سب سے انمول خزانہ ہے، ہمیشہ سلامت رہیں۔"
    },
    "ctaText": "Send 3D Love Card",
    "ctaLink": "/create-wish?category=love",
    "emoji": "💖"
  },
  {
    "id": "international-womens-day",
    "title": "International Women's Day",
    "urduTitle": "خواتین کا عالمی دن",
    "category": "family",
    "description": "Global day celebrating the social, economic, cultural, and personal achievements of women everywhere.",
    "ruleType": "fixed",
    "fixedMonth": 3,
    "fixedDay": 8,
    "greetings": {
      "en": "Happy International Women's Day! Celebrating your resilience, grace, and limitless potential.",
      "ur": "خواتین کا عالمی دن مبارک! آپ کی ہمت، محنت اور لازوال قربانیوں کو دل کی گہرائیوں سے خراجِ تحسین۔"
    },
    "ctaText": "Send Women's Day Card",
    "ctaLink": "/create-wish?category=women",
    "emoji": "👑"
  },
  {
    "id": "siblings-day",
    "title": "National Siblings Day",
    "urduTitle": "بہن بھائیوں کا دن",
    "category": "family",
    "description": "A day to cherish the lifelong companion, partner in mischief, and best confidant — your sibling.",
    "ruleType": "fixed",
    "fixedMonth": 4,
    "fixedDay": 10,
    "greetings": {
      "en": "Happy Siblings Day! Through all our childhood fights and grown-up laughs, you'll always be my favorite!",
      "ur": "بہن بھائیوں کا دن مبارک! لڑائی جھگڑے اپنی جگہ مگر تم میرے دل کے سب سے قریب ہو۔"
    },
    "ctaText": "Send Sibling Card",
    "ctaLink": "/create-wish?category=sibling",
    "emoji": "👫"
  },
  {
    "id": "world-pet-day",
    "title": "World Pet & Animal Day",
    "urduTitle": "پالتو جانوروں کی محبت کا دن",
    "category": "family",
    "description": "Honoring our furry companions who bring unwavering loyalty and unconditional joy into our homes.",
    "ruleType": "fixed",
    "fixedMonth": 4,
    "fixedDay": 11,
    "greetings": {
      "en": "Happy Pet Day! Celebrating our sweet four-legged family member who fills the home with unconditional love.",
      "ur": "ہمارے پیارے پالتو دوست کا دن مبارک! جس نے گھر کو بے غرض محبت اور خوشیوں سے بھر رکھا ہے۔"
    },
    "ctaText": "Send Pet Tribute Card",
    "ctaLink": "/create-wish?category=pet",
    "emoji": "🐾"
  },
  {
    "id": "mothers-day",
    "title": "Mother's Day (International)",
    "urduTitle": "ماؤں کا عالمی دن",
    "category": "family",
    "description": "Celebrating mothers, maternal figures, and the limitless, unconditional sacrifices of motherhood.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 5,
      "dayOfWeek": 0,
      "nth": 2
    },
    "greetings": {
      "en": "Happy Mother's Day, dearest Mom! Your prayer is my shield, and your smile is my whole paradise.",
      "ur": "پیاری امی جان، مدرز ڈے مبارک! آپ کی دعا میرے سر کا تاج اور آپ کے قدموں تلے میری جنت ہے۔"
    },
    "ctaText": "Send 3D Mother's Day Card",
    "ctaLink": "/create-wish?category=mother",
    "emoji": "💐"
  },
  {
    "id": "global-parents-day",
    "title": "Global Day of Parents",
    "urduTitle": "والدین کا عالمی دن",
    "category": "family",
    "description": "UN-declared observance honoring mothers and fathers for their selfless dedication toward children.",
    "ruleType": "fixed",
    "fixedMonth": 6,
    "fixedDay": 1,
    "greetings": {
      "en": "Happy Parents Day! Thank you Mom & Dad for the sacrifices you made to give us wings to fly.",
      "ur": "والدین کا عالمی دن مبارک! امی ابو آپ کی شب و روز کی محنت نے ہی مجھے اس قابل بنایا ہے۔"
    },
    "ctaText": "Send Parents Tribute",
    "ctaLink": "/create-wish?category=family",
    "emoji": "🏡"
  },
  {
    "id": "best-friends-day",
    "title": "National Best Friends Day",
    "urduTitle": "بہترین دوست کا دن",
    "category": "family",
    "description": "Celebrating the friend who knows all your secrets, supports your wildest ideas, and stays through thick and thin.",
    "ruleType": "fixed",
    "fixedMonth": 6,
    "fixedDay": 8,
    "greetings": {
      "en": "Happy Best Friends Day! Grateful for a friend like you who makes the toughest days feel effortless.",
      "ur": "بیسٹ فرینڈ ڈے مبارک! تم جیسے سچے اور مخلص دوست کا ہونا زندگی کی سب سے بڑی نعمت ہے۔"
    },
    "ctaText": "Send Bestie Card",
    "ctaLink": "/create-wish?category=friendship",
    "emoji": "🤞"
  },
  {
    "id": "fathers-day",
    "title": "Father's Day",
    "urduTitle": "باپ کا عالمی دن",
    "category": "family",
    "description": "Honoring fathers and father figures for their silent hard work, enduring guidance, and unwavering strength.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 6,
      "dayOfWeek": 0,
      "nth": 3
    },
    "greetings": {
      "en": "Happy Father's Day, Dad! Thank you for being my anchor, my teacher, and my biggest hero.",
      "ur": "ابو جان، فادرز ڈے مبارک! آپ کی قربانیاں اور انگلی پکڑ کر چلانا میں زندگی بھر نہیں بھول سکتا۔"
    },
    "ctaText": "Send 3D Father's Day Card",
    "ctaLink": "/create-wish?category=father",
    "emoji": "🦸‍♂️"
  },
  {
    "id": "international-friendship-day",
    "title": "International Friendship Day",
    "urduTitle": "دوستی کا عالمی دن",
    "category": "family",
    "description": "Global day celebrating the bonds that transcend borders and bridge cultures through mutual affection.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 8,
      "dayOfWeek": 0,
      "nth": 1
    },
    "greetings": {
      "en": "Happy Friendship Day! Life is so much richer with you by my side. Here is to our lifelong friendship!",
      "ur": "دوستی کا عالمی دن مبارک! تمہارا ساتھ زندگی کے ہر موڑ پر ایک انمول سرمایہ ہے۔"
    },
    "ctaText": "Send Friendship Card",
    "ctaLink": "/create-wish?category=friendship",
    "emoji": "🤝"
  },
  {
    "id": "sisters-day",
    "title": "National Sisters Day",
    "urduTitle": "بہنوں کا دن",
    "category": "family",
    "description": "A special day to express affection for sisters who bring grace, laughter, and care to life.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 8,
      "dayOfWeek": 0,
      "nth": 1
    },
    "greetings": {
      "en": "Happy Sisters Day! You are not just my sister, you are my lifelong confidante and guardian angel.",
      "ur": "پیاری بہنا کو سسٹرز ڈے مبارک! تم میری سب سے بڑی رازدار اور گھر کی مسکراہٹ ہو۔"
    },
    "ctaText": "Send Sister Card",
    "ctaLink": "/create-wish?category=family",
    "emoji": "👭"
  },
  {
    "id": "grandparents-day",
    "title": "National Grandparents Day",
    "urduTitle": "دادا دادی اور نانا نانی کا دن",
    "category": "family",
    "description": "Honoring the pillars of family wisdom, storytelling, and warm hugs — grandparents.",
    "ruleType": "nth_weekday",
    "nthWeekday": {
      "month": 9,
      "dayOfWeek": 0,
      "nth": 2
    },
    "greetings": {
      "en": "Happy Grandparents Day! Your love, bedtime stories, and wisdom have shaped our family generations.",
      "ur": "دادا دادی اور نانا نانی کو یہ دن مبارک! آپ کا سایہ ہمارے گھر کے لیے رب کی بہت بڑی رحمت ہے۔"
    },
    "ctaText": "Send Grandparents Card",
    "ctaLink": "/create-wish?category=family",
    "emoji": "👴"
  },
  {
    "id": "saudi-national-day",
    "title": "Saudi National Day (Al-Yaom Al-Watany)",
    "urduTitle": "سعودی قومی دن (اليوم الوطني)",
    "category": "national",
    "description": "Commemorating the unification of the Kingdom of Saudi Arabia by King Abdulaziz in 1932.",
    "ruleType": "fixed",
    "fixedMonth": 9,
    "fixedDay": 23,
    "greetings": {
      "en": "Happy Saudi National Day 96! May the Kingdom continue to prosper with vision, unity, and peace.",
      "ur": "سعودی عرب کا قومی دن مبارک! دعا ہے کہ یہ برادر اسلامی ملک ہمیشہ امن و ترقی کی منازل طے کرے۔"
    },
    "ctaText": "Send Saudi Green Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇸🇦"
  },
  {
    "id": "german-unity-day",
    "title": "German Unity Day (Tag der Deutschen Einheit)",
    "urduTitle": "جرمن یومِ یکجہتی",
    "category": "national",
    "description": "Celebrating the reunification of Germany in 1990 as a sovereign, united democratic nation.",
    "ruleType": "fixed",
    "fixedMonth": 10,
    "fixedDay": 3,
    "greetings": {
      "en": "Happy German Unity Day! Celebrating freedom, shared history, and the strength of a united Europe.",
      "ur": "جرمن یومِ یکجہتی مبارک! امن اور آزادی کا یہ دن سب کے لیے خوشحالی کا باعث بنے۔"
    },
    "ctaText": "Send Civic Wish",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇩🇪"
  },
  {
    "id": "iqbal-day-pakistan",
    "title": "Iqbal Day (Allama Muhammad Iqbal)",
    "urduTitle": "یومِ اقبال (علامہ محمد اقبال)",
    "category": "national",
    "description": "Honoring the birth anniversary of Allama Iqbal, the national poet-philosopher of Pakistan.",
    "ruleType": "fixed",
    "fixedMonth": 11,
    "fixedDay": 9,
    "greetings": {
      "en": "Happy Iqbal Day! May the vision of Khudi (self-reliance) and courage inspire our youth to reach great heights.",
      "ur": "یومِ اقبال مبارک! حکیم الامت کے خودی کے فلسفے کو اپنائیں اور ملک و قوم کا نام روشن کریں۔"
    },
    "ctaText": "Send Iqbal Poetry Card",
    "ctaLink": "/create-wish?category=pakistan",
    "emoji": "🇵🇰"
  },
  {
    "id": "uae-national-day",
    "title": "UAE National Day (Spirit of the Union)",
    "urduTitle": "متحدہ عرب امارات کا قومی دن",
    "category": "national",
    "description": "Celebrating the union of the seven emirates in 1971 under the visionary leadership of Sheikh Zayed bin Sultan Al Nahyan.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 2,
    "greetings": {
      "en": "Happy UAE National Day! May the Emirates reach ever greater heights of innovation, tolerance, and prosperity.",
      "ur": "متحدہ عرب امارات کے قومی دن کی دلی مبارکباد! یہ ملک ہمیشہ امن اور ترقی کا گہوارہ بنا رہے۔"
    },
    "ctaText": "Send UAE National Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇦🇪"
  },
  {
    "id": "quaid-e-azam-day",
    "title": "Quaid-e-Azam Day (Muhammad Ali Jinnah)",
    "urduTitle": "یومِ قائد اعظم محمد علی جناح",
    "category": "national",
    "description": "Birth anniversary of Quaid-e-Azam Muhammad Ali Jinnah, founder of Pakistan, celebrated with state honors.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 25,
    "greetings": {
      "en": "Happy Quaid Day! Let us remember the golden principles: Unity, Faith, and Discipline.",
      "ur": "بانیِ پاکستان قائد اعظم محمد علی جناح کا یومِ ولادت مبارک! اتحاد، ایمان اور تنظیم ہمارا شعار ہو۔"
    },
    "ctaText": "Send Quaid Tribute Card",
    "ctaLink": "/create-wish?category=pakistan",
    "emoji": "🇵🇰"
  },
  {
    "id": "australia-day",
    "title": "Australia Day",
    "urduTitle": "آسٹریلیا ڈے",
    "category": "national",
    "description": "National day of Australia marking the diverse history, culture, and achievements of the nation.",
    "ruleType": "fixed",
    "fixedMonth": 1,
    "fixedDay": 26,
    "greetings": {
      "en": "Happy Australia Day! Celebrating mateship, resilience, and sunny skies across the country.",
      "ur": "آسٹریلیا ڈے مبارک! آپ کے لیے یہ قومی دن مسرت اور نئی کامیابیوں کا سال بنے۔"
    },
    "ctaText": "Send Australia Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇦🇺"
  },
  {
    "id": "india-republic-day",
    "title": "Republic Day of India",
    "urduTitle": "یومِ جمہوریہ بھارت",
    "category": "national",
    "description": "Commemorating the enactment of the Constitution of India in 1950 with grand parades in New Delhi.",
    "ruleType": "fixed",
    "fixedMonth": 1,
    "fixedDay": 26,
    "greetings": {
      "en": "Happy Republic Day India! Wishing freedom, justice, and prosperity to all citizens.",
      "ur": "یومِ جمہوریہ مبارک! آئین اور جمہوریت کی سربلندی ہمیشہ قائم رہے۔"
    },
    "ctaText": "Send Republic Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇮🇳"
  },
  {
    "id": "saudi-founding-day",
    "title": "Saudi Founding Day (Youm Al-Badees)",
    "urduTitle": "یومِ تاسیس سعودی عرب",
    "category": "national",
    "description": "Commemorating the foundation of the First Saudi State by Imam Muhammad bin Saud in 1727.",
    "ruleType": "fixed",
    "fixedMonth": 2,
    "fixedDay": 22,
    "greetings": {
      "en": "Happy Saudi Founding Day! Celebrating three centuries of rich heritage, pride, and glory.",
      "ur": "سعودی عرب کا یومِ تاسیس مبارک! تین صدیوں پر محیط شاندار تاریخ اور ورثہ مبارک ہو۔"
    },
    "ctaText": "Send Founding Day Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇸🇦"
  },
  {
    "id": "pakistan-day",
    "title": "Pakistan Resolution Day (Youm-e-Pakistan)",
    "urduTitle": "یومِ پاکستان (23 مارچ)",
    "category": "national",
    "description": "Commemorating the historic Lahore Resolution of 1940 and adoption of Pakistan's first constitution in 1956.",
    "ruleType": "fixed",
    "fixedMonth": 3,
    "fixedDay": 23,
    "greetings": {
      "en": "Happy Pakistan Day! Proud of our heritage and committed to building a prosperous, progressive motherland.",
      "ur": "23 مارچ یومِ پاکستان مبارک! چاند تارے کا یہ پرچم ہمیشہ بلندیوں پر لہراتا رہے، پاکستان زندہ باد!"
    },
    "ctaText": "Send Pakistan Day Card",
    "ctaLink": "/create-wish?category=pakistan",
    "emoji": "🇵🇰"
  },
  {
    "id": "canada-day",
    "title": "Canada Day",
    "urduTitle": "کینیڈا ڈے",
    "category": "national",
    "description": "National day celebrating the confederation of Canada in 1867 with fireworks, parades, and maple leaf banners.",
    "ruleType": "fixed",
    "fixedMonth": 7,
    "fixedDay": 1,
    "greetings": {
      "en": "Happy Canada Day! Proud to celebrate peace, diversity, and the true north strong and free.",
      "ur": "کینیڈا ڈے مبارک! تنوع، امن اور خوبصورتی کا یہ تہوار سب کو مبارک ہو۔"
    },
    "ctaText": "Send Canada Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇨🇦"
  },
  {
    "id": "us-independence-day",
    "title": "US Independence Day (4th of July)",
    "urduTitle": "امریکی یومِ آزادی (4 جولائی)",
    "category": "national",
    "description": "Celebrating the adoption of the Declaration of Independence in 1776 with barbecues and fireworks.",
    "ruleType": "fixed",
    "fixedMonth": 7,
    "fixedDay": 4,
    "greetings": {
      "en": "Happy 4th of July! Have a blast celebrating liberty, family, and dazzling fireworks!",
      "ur": "امریکی یومِ آزادی مبارک! باربی کیو اور آتش بازی کی روشنیوں سے بھرا دن مبارک ہو۔"
    },
    "ctaText": "Send 4th of July Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇺🇸"
  },
  {
    "id": "pakistan-independence-day",
    "title": "Pakistan Independence Day (14th August)",
    "urduTitle": "جشنِ آزادی پاکستان (14 اگست)",
    "category": "national",
    "description": "Commemorating the birth of Pakistan as a sovereign nation in 1947. Green flags, national songs, and citywide illuminations.",
    "ruleType": "fixed",
    "fixedMonth": 8,
    "fixedDay": 14,
    "greetings": {
      "en": "14th August Mubarak! Proud of our green flag, resilient nation, and beloved homeland. Pakistan Zindabad!",
      "ur": "جشنِ آزادی 14 اگست مبارک! سبز ہلالی پرچم کی سربلندی اور پاکستان کی سلامتی کے لیے دعائیں۔ پاکستان پائندہ باد!"
    },
    "ctaText": "Send 3D Independence Card",
    "ctaLink": "/create-wish?category=pakistan",
    "emoji": "🇵🇰"
  },
  {
    "id": "india-independence-day",
    "title": "India Independence Day (15th August)",
    "urduTitle": "یومِ آزادی بھارت (15 اگست)",
    "category": "national",
    "description": "Commemorating India's independence from British rule in 1947, celebrated with flag hoisting and cultural pageants.",
    "ruleType": "fixed",
    "fixedMonth": 8,
    "fixedDay": 15,
    "greetings": {
      "en": "Happy Independence Day India! Celebrating freedom, harmony, and national pride across the globe.",
      "ur": "بھارتی یومِ آزادی مبارک! امن، ترقی اور بھائی چارے کا یہ سفر جاری رہے۔"
    },
    "ctaText": "Send Tiranga Card",
    "ctaLink": "/create-wish?category=national",
    "emoji": "🇮🇳"
  },
  {
    "id": "pakistan-defense-day",
    "title": "Pakistan Defense Day (6th September)",
    "urduTitle": "یومِ دفاع پاکستان (6 ستمبر)",
    "category": "national",
    "description": "Honoring the courage and sacrifices of the armed forces in defending the motherland during the 1965 war.",
    "ruleType": "fixed",
    "fixedMonth": 9,
    "fixedDay": 6,
    "greetings": {
      "en": "6th September Defense Day Mubarak! Saluting the brave martyrs and defenders who keep our borders safe.",
      "ur": "6 ستمبر یومِ دفاع مبارک! وطن کی حفاظت کرنے والے بہادر سپاہیوں اور شہداء کو قوم کا سلام۔"
    },
    "ctaText": "Send Defense Tribute",
    "ctaLink": "/create-wish?category=pakistan",
    "emoji": "🎖️"
  },
  {
    "id": "winter-wedding-season",
    "title": "South Asian Winter Wedding Season Peak",
    "urduTitle": "موسمِ سرما کی شادیوں کا سیزن",
    "category": "milestones",
    "description": "The most glamorous time of the year across Pakistan and South Asia. Hundreds of thousands of Nikkah, Mehndi, and Walima banquets take place.",
    "ruleType": "fixed",
    "fixedMonth": 11,
    "fixedDay": 15,
    "greetings": {
      "en": "Shaadi Season Mubarak! Wishing the happy couple an enchanting journey of love, laughter, and lifelong devotion.",
      "ur": "شادی کا موسم مبارک! اللہ تعالیٰ نئے جوڑے کو خوشیوں بھری رفاقت اور لمبی زندگی عطا فرمائے۔"
    },
    "ctaText": "Create Digital Wedding Invite",
    "ctaLink": "/create-invitation",
    "emoji": "💍"
  },
  {
    "id": "corporate-annual-gala-season",
    "title": "Corporate Annual Gala & Networking Season",
    "urduTitle": "کارپوریٹ سالانہ نیٹ ورکنگ تقریبات",
    "category": "milestones",
    "description": "Year-end business banquets, award ceremonies, and exchange of professional digital visiting cards.",
    "ruleType": "fixed",
    "fixedMonth": 12,
    "fixedDay": 1,
    "greetings": {
      "en": "Congratulations on a stellar business year! Wishing your leadership and team greater milestones ahead.",
      "ur": "شاندار کاروباری سال مبارک! امید ہے کہ آنے والا سال مزید کامیابیوں اور شراکت داریوں کا پیش خیمہ ہوگا۔"
    },
    "ctaText": "Generate Smart vCard",
    "ctaLink": "/create-visiting-card",
    "emoji": "💼"
  },
  {
    "id": "spring-wedding-season",
    "title": "Spring Engagement & Nikkah Season",
    "urduTitle": "بہار کا سیزن: منگنی اور نکاح",
    "category": "milestones",
    "description": "Warm spring days bring outdoor garden weddings, floral Nikkah ceremonies, and pre-wedding dholki parties.",
    "ruleType": "fixed",
    "fixedMonth": 3,
    "fixedDay": 15,
    "greetings": {
      "en": "Congratulations on your Engagement and Nikkah! May your bond blossom as beautifully as the flowers of spring.",
      "ur": "منگنی اور نکاح کی ڈھیروں مبارکباد! بہار کے اس پرنور موسم میں آپ کا رشتہ ہمیشہ مسکراتا رہے۔"
    },
    "ctaText": "Create Spring Nikkah Card",
    "ctaLink": "/create-invitation",
    "emoji": "💐"
  },
  {
    "id": "school-farewell-prom-season",
    "title": "School Farewell & College Prom Season",
    "urduTitle": "اسکول و کالج الوداعی تقریبات",
    "category": "milestones",
    "description": "Graduating classes celebrate farewell nights, signing yearbooks, and sharing heartfelt digital memory cards.",
    "ruleType": "fixed",
    "fixedMonth": 4,
    "fixedDay": 15,
    "greetings": {
      "en": "Happy Farewell! Carry fond school memories close to your heart as you step toward big collegiate dreams.",
      "ur": "الوداعی تقریب مبارک! اسکول کی یادیں سمیٹیں اور کامیابی کے نئے سفر پر فخر سے قدم رکھیں۔"
    },
    "ctaText": "Send Farewell Memory Card",
    "ctaLink": "/create-wish?category=milestone",
    "emoji": "🎓"
  },
  {
    "id": "graduation-season",
    "title": "University Graduation Convocation Season",
    "urduTitle": "یونیورسٹی کانووکیشن اور ڈگری سیزن",
    "category": "milestones",
    "description": "The proud moment when graduates toss their mortarboard caps and receive their academic degrees.",
    "ruleType": "fixed",
    "fixedMonth": 5,
    "fixedDay": 15,
    "greetings": {
      "en": "Congratulations Graduate! Your sleepless nights and hard work have paid off. The world awaits your brilliance!",
      "ur": "گریجویشن اور ڈگری کی مبارکباد! آپ کی محنت رنگ لائی ہے، مستقبل میں مزید کامیابیوں کے لیے دعا گو ہوں۔"
    },
    "ctaText": "Create Graduation Card",
    "ctaLink": "/create-wish?category=graduation",
    "emoji": "📜"
  },
  {
    "id": "baby-shower-aqiqah-season",
    "title": "Baby Shower & Aqiqah Blessings Season",
    "urduTitle": "عقیقہ اور بے بی شاور سیزن",
    "category": "milestones",
    "description": "Welcoming a newborn into the family with Aqiqah sacrifice, sweets, and celebration invitations.",
    "ruleType": "fixed",
    "fixedMonth": 6,
    "fixedDay": 10,
    "greetings": {
      "en": "Mubarak on the arrival of your sweet baby angel! May the little one grow up healthy, wise, and blessed.",
      "ur": "گھر میں ننھے مہمان کی آمد اور عقیقہ بہت بہت مبارک! اللہ پاک بچے کو نیک اور والدین کی آنکھوں کی ٹھنڈک بنائے۔"
    },
    "ctaText": "Make Aqiqah Invitation",
    "ctaLink": "/create-invitation",
    "emoji": "🍼"
  },
  {
    "id": "summer-reunion-season",
    "title": "Summer Family Reunion & Picnic Season",
    "urduTitle": "موسمِ گرما: خاندانی ری یونین",
    "category": "milestones",
    "description": "Families from around the globe gather for annual summer vacations, hill station trips, and barbecues.",
    "ruleType": "fixed",
    "fixedMonth": 7,
    "fixedDay": 10,
    "greetings": {
      "en": "Warmest wishes for our family reunion! Distance cannot weaken the bond that connects our hearts.",
      "ur": "فیملی ری یونین مبارک! فاصلے کتنے بھی ہوں، خاندان کی محبت ہمیشہ دلوں کو جوڑ کر رکھتی ہے۔"
    },
    "ctaText": "Send Reunion Invitation",
    "ctaLink": "/create-invitation",
    "emoji": "🏕️"
  },
  {
    "id": "housewarming-season",
    "title": "Housewarming & Griha Pravesh Season",
    "urduTitle": "نئے گھر کی خوشی (ہاؤس وارمنگ)",
    "category": "milestones",
    "description": "Blessing and opening a new home or apartment with family, friends, and shared housewarming feasts.",
    "ruleType": "fixed",
    "fixedMonth": 8,
    "fixedDay": 20,
    "greetings": {
      "en": "Congratulations on your new home! May this house be filled with laughter, barakah, and precious memories.",
      "ur": "نیا گھر بہت بہت مبارک! اللہ تعالیٰ اس گھر کو امن، خوشیوں اور رحمتوں کا گہوارہ بنائے۔"
    },
    "ctaText": "Make Dawat Invitation",
    "ctaLink": "/create-invitation",
    "emoji": "🏡"
  },
  {
    "id": "teacher-appreciation-week",
    "title": "World Teachers' Day & Appreciation",
    "urduTitle": "اساتذہ کا عالمی دن",
    "category": "milestones",
    "description": "Honoring mentors, tutors, and teachers who shape minds, ignite curiosity, and build the future.",
    "ruleType": "fixed",
    "fixedMonth": 10,
    "fixedDay": 5,
    "greetings": {
      "en": "Happy Teachers' Day! Thank you for your patience, wisdom, and for inspiring us to believe in our dreams.",
      "ur": "اساتذہ کا عالمی دن مبارک! آپ کی رہنمائی اور محنت نے ہماری سوچ کو شعور کی بلندی عطا کی۔"
    },
    "ctaText": "Send Teacher Wish",
    "ctaLink": "/create-wish?category=teacher",
    "emoji": "🧑‍🏫"
  },
  {
    "id": "silver-golden-anniversary",
    "title": "Milestone Wedding Anniversaries (Silver & Golden)",
    "urduTitle": "شادی کی سلور و گولڈن اینیورسری",
    "category": "milestones",
    "description": "Commemorating 25 and 50 years of enduring marital devotion, partnership, and family legacy.",
    "ruleType": "fixed",
    "fixedMonth": 10,
    "fixedDay": 20,
    "greetings": {
      "en": "Happy Wedding Anniversary! Your decades together are a testament to true love, compromise, and devotion.",
      "ur": "شادی کی سالگرہ مبارک! آپ کی باہمی رفاقت، وفا اور محبت ہم سب کے لیے ایک روشن مثال ہے۔"
    },
    "ctaText": "Send 3D Anniversary Card",
    "ctaLink": "/create-wish?category=anniversary",
    "emoji": "🥂"
  }
]

export function getNextEventDate(event: CalendarEventDef, today: Date): { date: Date; hijriNote?: string } {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  if (event.ruleType === "fixed") {
    const month = event.fixedMonth!
    const day = event.fixedDay!
    const currentYear = today.getFullYear()
    let candidate = new Date(currentYear, month - 1, day)
    if (candidate < startOfToday) {
      candidate = new Date(currentYear + 1, month - 1, day)
    }
    return { date: candidate, hijriNote: event.hijriNote }
  }

  if (event.ruleType === "nth_weekday") {
    const { month, dayOfWeek, nth } = event.nthWeekday!
    const currentYear = today.getFullYear()
    let candidate = calculateNthWeekday(currentYear, month, dayOfWeek, nth)
    if (candidate < startOfToday) {
      candidate = calculateNthWeekday(currentYear + 1, month, dayOfWeek, nth)
    }
    return { date: candidate, hijriNote: event.hijriNote }
  }

  if (event.ruleType === "scheduled" && event.scheduledDates) {
    for (const item of event.scheduledDates) {
      const d = new Date(item.date + "T00:00:00")
      if (d >= startOfToday) {
        return { date: d, hijriNote: item.hijriNote || event.hijriNote }
      }
    }
    const last = event.scheduledDates[event.scheduledDates.length - 1]
    return { date: new Date(last.date + "T00:00:00"), hijriNote: last.hijriNote }
  }

  return { date: new Date(today.getFullYear() + 1, 0, 1) }
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function formatEventDate(d: Date): string {
  const m = MONTH_NAMES[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  return `${m} ${day}, ${year}`
}


export const EVENT_OCCASIONS_MAP: Record<string, { occasion: string; invitationType: string; isMilestone?: boolean }> = {
  'eid-milad-un-nabi': { occasion: 'milad', invitationType: 'milad' },
  'gyarvi-shareef': { occasion: 'gyarvi-sharif', invitationType: 'quran-khatam' },
  'shab-e-miraj': { occasion: 'shab-e-miraj', invitationType: 'quran-khatam' },
  'shab-e-barat': { occasion: 'shab-e-barat', invitationType: 'quran-khatam' },
  'ramadan-start': { occasion: 'ramadan', invitationType: 'iftaar' },
  'roza-kushai-season': { occasion: 'roza-kushai', invitationType: 'roza-kushai' },
  'laylat-al-qadr': { occasion: 'laylat-al-qadr', invitationType: 'quran-khatam' },
  'chand-raat': { occasion: 'chand-raat', invitationType: 'chand-raat-mela' },
  'eid-ul-fitr': { occasion: 'eid-ul-fitr', invitationType: 'eid-party' },
  'hajj-season': { occasion: 'hajj', invitationType: 'hajj-dinner' },
  'day-of-arafah': { occasion: 'day-of-arafah', invitationType: 'hajj-dinner' },
  'eid-ul-adha': { occasion: 'eid-ul-adha', invitationType: 'eid-party' },
  'islamic-new-year': { occasion: 'islamic-new-year', invitationType: 'quran-khatam' },
  'day-of-ashura': { occasion: 'ashura', invitationType: 'quran-khatam' },
  'chehlum-imam-hussain': { occasion: 'chehlum', invitationType: 'quran-khatam' },
  'halloween': { occasion: 'halloween', invitationType: 'halloween-party' },
  'all-saints-day': { occasion: 'all-saints-day', invitationType: 'dinner-party' },
  'diwali': { occasion: 'diwali', invitationType: 'diwali-party' },
  'hanukkah': { occasion: 'hanukkah', invitationType: 'dinner-party' },
  'christmas-eve': { occasion: 'christmas', invitationType: 'christmas-party' },
  'christmas-day': { occasion: 'christmas', invitationType: 'christmas-party' },
  'boxing-day': { occasion: 'boxing-day', invitationType: 'dinner-party' },
  'new-years-eve': { occasion: 'new-year', invitationType: 'new-year-party' },
  'new-years-day': { occasion: 'new-year', invitationType: 'new-year-party' },
  'orthodox-christmas': { occasion: 'orthodox-christmas', invitationType: 'christmas-party' },
  'makar-sankranti': { occasion: 'makar-sankranti', invitationType: 'dinner-party' },
  'chinese-new-year': { occasion: 'lunar-new-year', invitationType: 'dinner-party' },
  'lantern-festival': { occasion: 'lantern-festival', invitationType: 'dinner-party' },
  'maha-shivratri': { occasion: 'maha-shivratri', invitationType: 'dinner-party' },
  'st-patricks-day': { occasion: 'st-patricks-day', invitationType: 'dinner-party' },
  'nowruz': { occasion: 'nowruz', invitationType: 'dinner-party' },
  'purim': { occasion: 'purim', invitationType: 'dinner-party' },
  'holi': { occasion: 'holi', invitationType: 'holi-celebration' },
  'good-friday': { occasion: 'good-friday', invitationType: 'dinner-party' },
  'easter-sunday': { occasion: 'easter', invitationType: 'easter-brunch' },
  'passover': { occasion: 'passover', invitationType: 'dinner-party' },
  'vaisakhi': { occasion: 'vaisakhi', invitationType: 'dinner-party' },
  'buddha-purnima': { occasion: 'buddha-purnima', invitationType: 'dinner-party' },
  'raksha-bandhan': { occasion: 'raksha-bandhan', invitationType: 'family-reunion' },
  'janmashtami': { occasion: 'janmashtami', invitationType: 'dinner-party' },
  'daughters-day': { occasion: 'daughters-day', invitationType: 'family-reunion' },
  'world-smile-day': { occasion: 'world-smile-day', invitationType: 'kids-party' },
  'sweetest-day': { occasion: 'sweetest-day', invitationType: 'dinner-party' },
  'international-mens-day': { occasion: 'mens-day', invitationType: 'dinner-party' },
  'thanksgiving-day': { occasion: 'thanksgiving', invitationType: 'dinner-party' },
  'valentines-day': { occasion: 'valentines', invitationType: 'dinner-party' },
  'international-womens-day': { occasion: 'womens-day', invitationType: 'dinner-party' },
  'siblings-day': { occasion: 'siblings-day', invitationType: 'family-reunion' },
  'world-pet-day': { occasion: 'pet-day', invitationType: 'kids-party' },
  'mothers-day': { occasion: 'mothers-day', invitationType: 'family-reunion' },
  'global-parents-day': { occasion: 'parents-day', invitationType: 'family-reunion' },
  'best-friends-day': { occasion: 'friendship-day', invitationType: 'dinner-party' },
  'fathers-day': { occasion: 'fathers-day', invitationType: 'family-reunion' },
  'international-friendship-day': { occasion: 'friendship-day', invitationType: 'dinner-party' },
  'sisters-day': { occasion: 'sisters-day', invitationType: 'family-reunion' },
  'grandparents-day': { occasion: 'grandparents-day', invitationType: 'family-reunion' },
  'saudi-national-day': { occasion: 'saudi-national-day', invitationType: 'national-day-gala' },
  'german-unity-day': { occasion: 'german-unity-day', invitationType: 'national-day-gala' },
  'iqbal-day-pakistan': { occasion: 'iqbal-day', invitationType: 'national-day-gala' },
  'uae-national-day': { occasion: 'uae-national-day', invitationType: 'national-day-gala' },
  'quaid-e-azam-day': { occasion: 'quaid-day', invitationType: 'national-day-gala' },
  'australia-day': { occasion: 'australia-day', invitationType: 'national-day-gala' },
  'india-republic-day': { occasion: 'india-republic-day', invitationType: 'national-day-gala' },
  'saudi-founding-day': { occasion: 'saudi-founding-day', invitationType: 'national-day-gala' },
  'pakistan-day': { occasion: 'pakistan-day', invitationType: 'national-day-gala' },
  'canada-day': { occasion: 'canada-day', invitationType: 'national-day-gala' },
  'us-independence-day': { occasion: 'us-independence-day', invitationType: 'national-day-gala' },
  'pakistan-independence-day': { occasion: 'independence-day', invitationType: 'national-day-gala' },
  'india-independence-day': { occasion: 'india-independence-day', invitationType: 'national-day-gala' },
  'pakistan-defense-day': { occasion: 'defence-day', invitationType: 'national-day-gala' },
  'winter-wedding-season': { occasion: 'shaadi', invitationType: 'wedding-gala', isMilestone: true },
  'corporate-annual-gala-season': { occasion: 'promotion', invitationType: 'office-party', isMilestone: true },
  'spring-wedding-season': { occasion: 'nikah', invitationType: 'nikkah', isMilestone: true },
  'school-farewell-prom-season': { occasion: 'farewell', invitationType: 'prom-farewell', isMilestone: true },
  'graduation-season': { occasion: 'graduation', invitationType: 'graduation-party', isMilestone: true },
  'baby-shower-aqiqah-season': { occasion: 'baby-shower', invitationType: 'aqiqah-party', isMilestone: true },
  'summer-reunion-season': { occasion: 'friendship-day', invitationType: 'family-reunion', isMilestone: true },
  'housewarming-season': { occasion: 'new-home', invitationType: 'house-warming', isMilestone: true },
  'teacher-appreciation-week': { occasion: 'teachers-day', invitationType: 'teachers-day-event', isMilestone: true },
  'silver-golden-anniversary': { occasion: 'golden-anniversary', invitationType: 'anniversary-party', isMilestone: true },
}

export function getEventsForRollingYear(today?: Date): CalculatedEvent[] {
  const refDate = today || new Date()
  const startOfToday = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate())

  const calculated: CalculatedEvent[] = ALL_WORLDWIDE_EVENTS.map((event) => {
    const { date, hijriNote } = getNextEventDate(event, refDate)
    const diffTime = date.getTime() - startOfToday.getTime()
    const daysRemaining = Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)))

    let badgeText = ""
    if (daysRemaining === 0) {
      badgeText = "Today! 🎉"
    } else if (daysRemaining === 1) {
      badgeText = "Tomorrow"
    } else if (daysRemaining <= 7) {
      badgeText = `In ${daysRemaining} days`
    } else if (daysRemaining <= 30) {
      badgeText = `In ${daysRemaining} days`
    } else {
      const months = Math.round(daysRemaining / 30)
      badgeText = `In ${months} month${months > 1 ? "s" : ""}`
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`

    const mapping = EVENT_OCCASIONS_MAP[event.id] || { occasion: 'birthday', invitationType: 'birthday-party' }
    const occasionId = mapping.occasion
    const invitationTypeId = mapping.invitationType

    const encodedWishGreeting = encodeURIComponent(event.greetings.en)
    const encodedTitle = encodeURIComponent(event.title)

    const wishLink = `/create-wish?occasion=${encodeURIComponent(occasionId)}&message=${encodedWishGreeting}`
    const invitationLink = `/create-invitation?type=${encodeURIComponent(invitationTypeId)}&title=${encodedTitle}&date=${dateStr}`

    const isMilestone = mapping.isMilestone || event.category === 'milestones'
    const ctaText = isMilestone ? 'Create Invitation' : 'Send 3D Card'
    const ctaLink = isMilestone ? invitationLink : wishLink

    return {
      id: event.id,
      title: event.title,
      urduTitle: event.urduTitle,
      category: event.category,
      description: event.description,
      hijriNote,
      date,
      dateStr,
      formattedDate: formatEventDate(date),
      daysRemaining,
      badgeText,
      greetings: event.greetings,
      ctaText,
      ctaLink,
      wishLink,
      invitationLink,
      occasionId,
      invitationTypeId,
      emoji: event.emoji,
    }
  })

  return calculated.sort((a, b) => a.date.getTime() - b.date.getTime())
}
