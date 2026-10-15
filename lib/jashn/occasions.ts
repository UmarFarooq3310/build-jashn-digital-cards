import type { Occasion, MessageTemplate } from './types'

const RAW_OCCASIONS: any[] = [
  // PERSONAL & MILESTONES
  { id: 'birthday', label: 'Birthday', tagline: 'Happy Birthday', urdu: 'سالگرہ مبارک', category: 'Personal', icon: 'Cake', bgImage: '/occasions/birthday.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#7b1fa2)' },
  { id: 'milestone-birthday', label: 'Milestone Birthday (18th/21st/50th)', tagline: 'Cheers to Your Special Year', urdu: 'خصوصی سالگرہ', category: 'Personal', icon: 'Trophy', bgGradient: 'linear-gradient(160deg,#4c0519,#be185d)' },
  { id: 'anniversary', label: 'Anniversary', tagline: 'Happy Anniversary', urdu: 'سالگرہِ شادی', category: 'Personal', icon: 'Heart', bgImage: '/occasions/anniversary.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#4a148c)' },
  { id: 'golden-anniversary', label: 'Golden Jubilee (50th Anniversary)', tagline: '50 Golden Years of Love', urdu: 'گولڈن جوبلی (50ویں سالگرہ)', category: 'Personal', icon: 'Crown', bgGradient: 'linear-gradient(160deg,#451a03,#eab308)' },
  { id: 'new-baby', label: 'New Baby', tagline: 'Welcome Little One', urdu: 'ننھے مہمان کی آمد', category: 'Personal', icon: 'Gift', bgImage: '/occasions/new-baby.jpg', bgGradient: 'linear-gradient(160deg,#f48fb1,#ce93d8)' },
  { id: 'gender-reveal', label: 'Gender Reveal / Baby News', tagline: 'It’s a Special Surprise!', urdu: 'خوشخبری / سرپرائز', category: 'Personal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#1e1b4b,#ec4899)' },
  { id: 'get-well-soon', label: 'Get Well Soon', tagline: 'Wishing You a Speedy Recovery', urdu: 'جلد صحت یابی کی دعا', category: 'Personal', icon: 'Heart', bgImage: '/occasions/get-well-soon.jpg', bgGradient: 'linear-gradient(160deg,#1565c0,#00897b)' },
  { id: 'sympathy', label: 'Deepest Sympathy', tagline: 'In Loving Memory & Thoughts', urdu: 'دلی تعزیت و ہمدردی', category: 'Personal', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#09090b,#3f3f46)' },
  { id: 'farewell', label: 'Farewell & Bon Voyage', tagline: 'Wishing You the Best Ahead', urdu: 'الوداع و نیک تمنائیں', category: 'Personal', icon: 'Plane', bgImage: '/occasions/farewell.jpg', bgGradient: 'linear-gradient(160deg,#37474f,#546e7a)' },
  { id: 'congratulations', label: 'Congratulations', tagline: 'Warmest Congratulations!', urdu: 'بہت بہت مبارک ہو', category: 'Personal', icon: 'PartyPopper', bgImage: '/occasions/congratulations.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#f57f17)' },
  { id: 'thank-you', label: 'Thank You', tagline: 'With Gratitude & Thanks', urdu: 'دل کی گہرائیوں سے شکریہ', category: 'Personal', icon: 'Gift', bgImage: '/occasions/thank-you.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#558b2f)' },
  { id: 'miss-you', label: 'Miss You', tagline: 'Thinking of You Always', urdu: 'آپ کی یاد آ رہی ہے', category: 'Personal', icon: 'Heart', bgImage: '/occasions/miss-you.jpg', bgGradient: 'linear-gradient(160deg,#ad1457,#6a1b9a)' },
  { id: 'good-luck', label: 'Good Luck & Best Wishes', tagline: 'Best of Luck in Everything', urdu: 'نیک خواہشات و دعا', category: 'Personal', icon: 'Sparkles', bgImage: '/occasions/good-luck.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#ef6c00)' },
  { id: 'welcome-back', label: 'Welcome Back', tagline: 'So Happy to Have You Back', urdu: 'خوش آمدید', category: 'Personal', icon: 'Sparkles', bgImage: '/occasions/welcome-back.jpg', bgGradient: 'linear-gradient(160deg,#00695c,#1565c0)' },
  { id: 'retirement', label: 'Happy Retirement', tagline: 'Cheers to Your Golden Years', urdu: 'ریٹائرمنٹ مبارک', category: 'Personal', icon: 'Award', bgGradient: 'linear-gradient(160deg,#0c4a6e,#f59e0b)' },
  { id: 'poetry', label: 'Poetry & Shayari', tagline: 'Kalaam & Heartfelt Dedication', urdu: 'شاعری و نذرانۂ عقیدت', category: 'Personal', icon: 'Feather', bgGradient: 'linear-gradient(160deg,#20130b,#4a2511,#78350f)' },

  // GLOBAL CELEBRATIONS & HOLIDAYS
  { id: 'christmas', label: 'Christmas', tagline: 'Merry Christmas & Happy Holidays', urdu: 'کرسمس مبارک', category: 'Universal', icon: 'TreePine', bgImage: '/occasions/birthday.jpg', bgGradient: 'linear-gradient(160deg,#b71c1c,#2e7d32)' },
  { id: 'new-year', label: 'New Year', tagline: 'Happy New Year 2026', urdu: 'نیا سال مبارک 2026', category: 'Universal', icon: 'Sparkles', bgImage: '/occasions/new-year.jpg', bgGradient: 'linear-gradient(160deg,#0d1b4c,#4a0e6b)' },
  { id: 'thanksgiving', label: 'Thanksgiving', tagline: 'Happy Thanksgiving', urdu: 'تھینکس گیونگ مبارک', category: 'Universal', icon: 'Utensils', bgGradient: 'linear-gradient(160deg,#3e1c00,#d97706)' },
  { id: 'halloween', label: 'Halloween', tagline: 'Spooktacular Halloween', urdu: 'ہیلووین مبارک', category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#180b28,#ea580c)' },
  { id: 'easter', label: 'Easter', tagline: 'Happy Easter Blessings', urdu: 'ایسٹر کی مبارکباد', category: 'Universal', icon: 'Egg', bgGradient: 'linear-gradient(160deg,#2e1065,#c084fc)' },
  { id: 'diwali', label: 'Diwali', tagline: 'Happy Diwali & Festival of Lights', urdu: 'دیوالی مبارک', category: 'Universal', icon: 'Flame', bgGradient: 'linear-gradient(160deg,#451a03,#d97706)' },
  { id: 'hanukkah', label: 'Hanukkah', tagline: 'Happy Hanukkah', urdu: 'ہنوکا مبارک', category: 'Universal', icon: 'Star', bgGradient: 'linear-gradient(160deg,#0f172a,#1d4ed8)' },
  { id: 'lunar-new-year', label: 'Lunar New Year', tagline: 'Happy Lunar New Year', urdu: 'قمری نیا سال مبارک', category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#450a0a,#dc2626)' },
  { id: 'valentines', label: "Valentine's Day", tagline: 'Happy Valentine’s Day', urdu: 'ویلنٹائن ڈے مبارک', category: 'Universal', icon: 'Heart', bgImage: '/occasions/valentines.jpg', bgGradient: 'linear-gradient(160deg,#b71c1c,#880e4f)' },
  { id: 'mothers-day', label: "Mother's Day", tagline: 'Happy Mother’s Day', urdu: 'ماں کا دن مبارک', category: 'Universal', icon: 'Heart', bgImage: '/occasions/mothers-day.jpg', bgGradient: 'linear-gradient(160deg,#880e4f,#ad1457)' },
  { id: 'fathers-day', label: "Father's Day", tagline: 'Happy Father’s Day', urdu: 'باپ کا دن مبارک', category: 'Universal', icon: 'Crown', bgImage: '/occasions/fathers-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#37474f)' },
  { id: 'st-patricks-day', label: "St. Patrick's Day", tagline: 'Happy St. Patrick’s Day', urdu: 'سینٹ پیٹرک ڈے', category: 'Universal', icon: 'Clover', bgGradient: 'linear-gradient(160deg,#022c22,#059669)' },
  { id: 'earth-day', label: 'Earth Day & Spring', tagline: 'Happy Earth Day & Happy Spring', urdu: 'ارتھ ڈے و بہار', category: 'Universal', icon: 'Globe', bgGradient: 'linear-gradient(160deg,#064e3b,#0d9488)' },
  { id: 'friendship-day', label: 'Friendship Day', tagline: 'Happy Friendship Day', urdu: 'دوستی کا دن مبارک', category: 'Universal', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#e91e63,#ff9800)' },

  // ISLAMIC & RELIGIOUS
  { id: 'eid-ul-fitr', label: 'Eid ul Fitr', tagline: 'Eid Mubarak', urdu: 'عید الفطر مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-fitr.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#33691e)' },
  { id: 'eid-ul-adha', label: 'Eid ul Adha', tagline: 'Eid ul Adha Mubarak', urdu: 'عید الاضحیٰ مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/eid-ul-adha.jpg', bgGradient: 'linear-gradient(160deg,#33691e,#1b5e20)' },
  { id: 'ramadan', label: 'Ramadan Mubarak', tagline: 'Ramadan Mubarak', urdu: 'رمضان المبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/ramadan.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#311b92)' },
  { id: 'jumma', label: 'Jumma Mubarak', tagline: 'Jumma Mubarak', urdu: 'جمعہ مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/jumma.jpg', bgGradient: 'linear-gradient(160deg,#004d40,#006064)' },
  { id: 'hajj', label: 'Hajj Mubarak', tagline: 'Hajj Mubarak', urdu: 'حج مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/hajj.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#795548)' },
  { id: 'umrah', label: 'Umrah Mubarak', tagline: 'Umrah Mubarak', urdu: 'عمرہ مبارک', category: 'Islamic', icon: 'Star', bgImage: '/occasions/umrah.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#bf8600)' },
  { id: 'milad', label: 'Milad-un-Nabi', tagline: 'Milad Mubarak', urdu: 'میلاد النبیؐ مبارک', category: 'Islamic', icon: 'Moon', bgImage: '/occasions/milad.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#006064)' },

  // ACHIEVEMENTS
  { id: 'graduation', label: 'Graduation', tagline: 'Congratulations Graduate!', urdu: 'گریجویشن مبارک', category: 'Achievements', icon: 'GraduationCap', bgImage: '/occasions/graduation.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'new-job', label: 'New Job', tagline: 'Congratulations on Your New Job', urdu: 'نئی ملازمت مبارک', category: 'Achievements', icon: 'Briefcase', bgImage: '/occasions/new-job.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'promotion', label: 'Promotion', tagline: 'Congratulations on Your Promotion', urdu: 'ترقی مبارک', category: 'Achievements', icon: 'Award', bgImage: '/occasions/promotion.jpg', bgGradient: 'linear-gradient(160deg,#e65100,#bf360c)' },
  { id: 'new-home', label: 'New Home / Housewarming', tagline: 'Congratulations on Your New Home', urdu: 'نیا گھر مبارک', category: 'Achievements', icon: 'House', bgImage: '/occasions/new-home.jpg', bgGradient: 'linear-gradient(160deg,#4e342e,#795548)' },
  { id: 'business-launch', label: 'Business Launch', tagline: 'Wishing Your Business Great Success', urdu: 'نیا کاروبار مبارک', category: 'Achievements', icon: 'Rocket', bgImage: '/occasions/business-launch.jpg', bgGradient: 'linear-gradient(160deg,#0d47a1,#1565c0)' },
  { id: 'exam-pass', label: 'Result / Exam Pass', tagline: 'Congratulations on Passing!', urdu: 'کامیابی مبارک', category: 'Achievements', icon: 'ScrollText', bgImage: '/occasions/exam-pass.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#283593)' },
  { id: 'phd-defense', label: 'Doctorate / PhD Defense', tagline: 'Congratulations Dr.!', urdu: 'پی ایچ ڈی و ڈاکٹریٹ مبارک', category: 'Achievements', icon: 'GraduationCap', bgGradient: 'linear-gradient(160deg,#1e1b4b,#312e81,#ca8a04)' },
  { id: 'driving-license', label: 'Driving License Passed', tagline: 'License Passed! Ready to Roll', urdu: 'ڈرائیونگ لائسنس مبارک', category: 'Achievements', icon: 'Award', bgGradient: 'linear-gradient(160deg,#0f172a,#0284c7,#10b981)' },
  { id: 'sports-trophy', label: 'Sports & Tournament Trophy', tagline: 'Champion of the Field!', urdu: 'کھیل میں شاندار فتح مبارک', category: 'Achievements', icon: 'Trophy', bgGradient: 'linear-gradient(160deg,#1c1917,#78350f,#eab308)' },
  { id: 'visa-approved', label: 'Visa & Immigration Approval', tagline: 'Visa Approved! Pack Your Bags', urdu: 'ویزا منظوری مبارک', category: 'Achievements', icon: 'Plane', bgGradient: 'linear-gradient(160deg,#042f2e,#0d9488,#38bdf8)' },

  // SEASONAL & NATIONAL
  { id: 'independence-day', label: 'Independence Day', tagline: 'Happy Independence Day', urdu: 'یومِ آزادی مبارک', category: 'National', icon: 'Flag', bgImage: '/occasions/independence-day.jpg', bgGradient: 'linear-gradient(160deg,#1b5e20,#2e7d32)' },
  { id: 'kashmir-day', label: 'Kashmir Solidarity Day', tagline: 'Kashmir Solidarity Day', urdu: 'یومِ یکجہتی کشمیر', category: 'National', icon: 'Flag', bgImage: '/occasions/kashmir-day.jpg', bgGradient: 'linear-gradient(160deg,#1a237e,#0d47a1)' },
  { id: 'basant', label: 'Basant / Spring Festival', tagline: 'Basant Bahar Mubarak', urdu: 'بسنت بہار مبارک', category: 'National', icon: 'Flower2', bgImage: '/occasions/basant.jpg', bgGradient: 'linear-gradient(160deg,#f9a825,#388e3c)' },

  // FAMILY
  { id: 'nikah', label: 'Nikah Mubarak', tagline: 'Nikah Mubarak', urdu: 'نکاح مبارک', category: 'Family', icon: 'Gem', bgImage: '/occasions/nikah.jpg', bgGradient: 'linear-gradient(160deg,#bf8600,#5d4037)' },
  { id: 'shaadi', label: 'Shaadi Mubarak', tagline: 'Shaadi Mubarak', urdu: 'شادی مبارک', category: 'Family', icon: 'Crown', bgImage: '/occasions/shaadi.jpg', bgGradient: 'linear-gradient(160deg,#8e0f24,#4a0510)' },
  { id: 'mehndi', label: 'Mehndi Mubarak', tagline: 'Mehndi Mubarak', urdu: 'مہندی مبارک', category: 'Family', icon: 'Flower2', bgImage: '/occasions/mehndi.jpg', bgGradient: 'linear-gradient(160deg,#2e7d32,#f9a825)' },
  { id: 'baby-shower', label: 'Baby Shower', tagline: 'Congratulations Baby Shower!', urdu: 'بیبی شاور مبارک', category: 'Family', icon: 'Gift', bgImage: '/occasions/new-baby.jpg', bgGradient: 'linear-gradient(160deg,#f48fb1,#81d4fa)' },
  { id: 'baat-pakki', label: 'Baat Pakki / Roka', tagline: 'Baat Pakki Mubarak', urdu: 'بات پکی مبارک', category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#831843,#be185d,#ca8a04)' },
  { id: 'housewarming-blessings', label: 'Ghar Parvesh / Housewarming', tagline: 'Home Sweet Home Blessings', urdu: 'نیا گھر مبارک ہو', category: 'Family', icon: 'House', bgGradient: 'linear-gradient(160deg,#064e3b,#047857,#f59e0b)' },

  // WORLDWIDE CALENDAR CELEBRATIONS
  { id: 'shab-e-miraj', label: "Shab-e-Miraj", tagline: "The Blessed Night Journey & Miraj", urdu: "شبِ معراج مبارک", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#0f172a,#1e1b4b,#065f46)' },
  { id: 'shab-e-barat', label: "Shab-e-Barat", tagline: "Night of Forgiveness & Blessings", urdu: "شبِ برات مبارک", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#042f2e,#115e59,#0f766e)' },
  { id: 'roza-kushai', label: "Roza Kushai / First Fast", tagline: "Blessed First Fast Celebration", urdu: "روزہ کشائی مبارک", category: 'Islamic', icon: 'Star', bgGradient: 'linear-gradient(160deg,#14532d,#15803d,#166534)' },
  { id: 'laylat-al-qadr', label: "Laylat al-Qadr", tagline: "The Night of Power & Decree", urdu: "لیلتہ القدر مبارک", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#022c22,#064e3b,#0f766e)' },
  { id: 'chand-raat', label: "Chand Raat", tagline: "Chand Raat Mubarak & Festivities", urdu: "چاند رات مبارک", category: 'Islamic', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#581c87,#7e22ce,#c026d3)' },
  { id: 'day-of-arafah', label: "Day of Arafah", tagline: "Blessed Day of Dua & Forgiveness", urdu: "یومِ عرفہ مبارک", category: 'Islamic', icon: 'Star', bgGradient: 'linear-gradient(160deg,#78350f,#b45309,#d97706)' },
  { id: 'islamic-new-year', label: "Islamic New Year (Hijri)", tagline: "Happy Hijri New Year", urdu: "نیا اسلامی سال مبارک", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#064e3b,#047857,#059669)' },
  { id: 'ashura', label: "Youm-e-Ashura", tagline: "Solemn Day of Ashura (10 Muharram)", urdu: "یومِ عاشورہ", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#18181b,#27272a,#3f3f46)' },
  { id: 'chehlum', label: "Arbaeen / Chehlum", tagline: "Solemn Remembrance & Tribute", urdu: "چہلم امام حسینؑ", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#09090b,#18181b,#27272a)' },
  { id: 'gyarvi-sharif', label: "Gyarvi Sharif", tagline: "Blessed Gyarvi Sharif Blessings", urdu: "گیارہویں شریف مبارک", category: 'Islamic', icon: 'Star', bgGradient: 'linear-gradient(160deg,#1e1b4b,#312e81,#047857)' },
  { id: 'youm-e-ali', label: "Youm-e-Ali (A.S.)", tagline: "Commemorating the Blessed Birth & Legacy of Imam Ali (A.S.)", urdu: "یومِ علیؑ مبارک", category: 'Islamic', icon: 'Moon', bgGradient: 'linear-gradient(160deg,#064e3b,#047857,#022c22)' },
  { id: 'urs', label: "Urs Mubarak", tagline: "Blessed Urs Mubarak & Spiritual Blessings", urdu: "عرس مبارک", category: 'Islamic', icon: 'Star', bgGradient: 'linear-gradient(160deg,#1e1b4b,#312e81,#047857)' },
  { id: 'all-saints-day', label: "All Saints Day", tagline: "Honoring All Saints & Martyrs", urdu: "آل سینٹس ڈے", category: 'Universal', icon: 'Star', bgGradient: 'linear-gradient(160deg,#1e293b,#334155,#64748b)' },
  { id: 'boxing-day', label: "Boxing Day", tagline: "Happy Boxing Day & Family Time", urdu: "باکسنگ ڈے مبارک", category: 'Universal', icon: 'Gift', bgGradient: 'linear-gradient(160deg,#831843,#be185d,#ec4899)' },
  { id: 'orthodox-christmas', label: "Orthodox Christmas", tagline: "Blessed Orthodox Christmas", urdu: "آرتھوڈوکس کرسمس", category: 'Universal', icon: 'TreePine', bgGradient: 'linear-gradient(160deg,#1e3a8a,#2563eb,#60a5fa)' },
  { id: 'makar-sankranti', label: "Makar Sankranti & Lohri", tagline: "Harvest Festivities & Joyous Lohri", urdu: "مکر سنکرانتی و لوہڑی", category: 'Universal', icon: 'Sun', bgGradient: 'linear-gradient(160deg,#7c2d12,#ea580c,#f59e0b)' },
  { id: 'lantern-festival', label: "Lantern Festival", tagline: "Happy Lantern Festival & Unity", urdu: "لالٹین فیسٹیول مبارک", category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#7f1d1d,#b91c1c,#ef4444)' },
  { id: 'maha-shivratri', label: "Maha Shivratri", tagline: "Sacred Maha Shivratri Blessings", urdu: "مہا شیو راتری", category: 'Universal', icon: 'Flame', bgGradient: 'linear-gradient(160deg,#2e1065,#581c87,#7e22ce)' },
  { id: 'nowruz', label: "Nowruz (Persian New Year)", tagline: "Happy Nowruz & Spring Equinox", urdu: "نوروز مبارک", category: 'Universal', icon: 'Flower2', bgGradient: 'linear-gradient(160deg,#064e3b,#059669,#10b981)' },
  { id: 'purim', label: "Purim", tagline: "Chag Purim Sameach!", urdu: "پوریم مبارک", category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#172554,#1d4ed8,#3b82f6)' },
  { id: 'holi', label: "Holi (Festival of Colors)", tagline: "Happy Holi & Vibrant Colors", urdu: "ہولی مبارک", category: 'Universal', icon: 'Sparkles', bgGradient: 'linear-gradient(160deg,#831843,#be185d,#e11d48,#f59e0b)' },
  { id: 'good-friday', label: "Good Friday", tagline: "Solemn Remembrance & Grace", urdu: "گڈ فرائیڈے", category: 'Universal', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#18181b,#27272a,#475569)' },
  { id: 'passover', label: "Passover (Pesach)", tagline: "Chag Pesach Sameach!", urdu: "عیدِ فصح (پیساخ)", category: 'Universal', icon: 'Star', bgGradient: 'linear-gradient(160deg,#1e1b4b,#1d4ed8,#60a5fa)' },
  { id: 'vaisakhi', label: "Vaisakhi / Baisakhi", tagline: "Happy Vaisakhi & Khalsa Sirjana", urdu: "بیساکھی مبارک", category: 'Universal', icon: 'Sun', bgGradient: 'linear-gradient(160deg,#78350f,#d97706,#eab308)' },
  { id: 'buddha-purnima', label: "Buddha Purnima (Vesak)", tagline: "Peace, Wisdom & Compassion", urdu: "بدھ پورنیما", category: 'Universal', icon: 'Sun', bgGradient: 'linear-gradient(160deg,#713f12,#ca8a04,#eab308)' },
  { id: 'raksha-bandhan', label: "Raksha Bandhan", tagline: "Happy Raksha Bandhan Brother & Sister", urdu: "رکشا بندھن مبارک", category: 'Universal', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#831843,#e11d48,#f43f5e)' },
  { id: 'janmashtami', label: "Krishna Janmashtami", tagline: "Happy Krishna Janmashtami", urdu: "کرشنا جنم اشٹمی", category: 'Universal', icon: 'Crown', bgGradient: 'linear-gradient(160deg,#172554,#1d4ed8,#2563eb)' },
  { id: 'daughters-day', label: "National Daughters Day", tagline: "Cherishing Our Wonderful Daughters", urdu: "بیٹیوں کا عالمی دن مبارک", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#831843,#db2777,#f472b6)' },
  { id: 'world-smile-day', label: "World Smile Day", tagline: "Share a Smile & Spread Joy", urdu: "مسکراہٹ کا عالمی دن", category: 'Family', icon: 'Smile', bgGradient: 'linear-gradient(160deg,#713f12,#eab308,#fde047)' },
  { id: 'sweetest-day', label: "Sweetest Day", tagline: "Sweet Thoughts for Someone Special", urdu: "میٹھی یادوں کا دن", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#881337,#e11d48,#fb7185)' },
  { id: 'mens-day', label: "International Men's Day", tagline: "Honoring the Men Who Inspire Us", urdu: "مردوں کا عالمی دن مبارک", category: 'Family', icon: 'Crown', bgGradient: 'linear-gradient(160deg,#0f172a,#1e3a8a,#3b82f6)' },
  { id: 'womens-day', label: "International Women's Day", tagline: "Celebrating Courage, Grace & Leadership", urdu: "خواتین کا عالمی دن مبارک", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#4a044e,#a21caf,#e879f9)' },
  { id: 'siblings-day', label: "National Siblings Day", tagline: "Forever Friends, Partners in Crime", urdu: "بہن بھائیوں کا دن مبارک", category: 'Family', icon: 'Users', bgGradient: 'linear-gradient(160deg,#1e1b4b,#4338ca,#818cf8)' },
  { id: 'pet-day', label: "National Pet Day", tagline: "Love for Our Furry Best Friends", urdu: "پالتو جانوروں کا دن", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#78350f,#d97706,#fbbf24)' },
  { id: 'parents-day', label: "Parents Day", tagline: "Endless Gratitude for Mom & Dad", urdu: "والدین کا دن مبارک", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#831843,#be185d,#e11d48)' },
  { id: 'sisters-day', label: "National Sisters Day", tagline: "To the Best Sister in the World", urdu: "بہنوں کا دن مبارک", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#701a75,#c026d3,#f0abfc)' },
  { id: 'grandparents-day', label: "Grandparents Day", tagline: "Wisdom, Warmth & Endless Love", urdu: "دادا دادی، نانا نانی کا دن", category: 'Family', icon: 'Heart', bgGradient: 'linear-gradient(160deg,#451a03,#92400e,#d97706)' },
  { id: 'saudi-national-day', label: "Saudi National Day", tagline: "Saudi National Day - Pride & Vision", urdu: "سعودی قومی دن مبارک", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#022c22,#047857,#10b981)' },
  { id: 'german-unity-day', label: "German Unity Day", tagline: "Tag der Deutschen Einheit", urdu: "جرمن یومِ یکجہتی", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#18181b,#dc2626,#eab308)' },
  { id: 'iqbal-day', label: "Iqbal Day", tagline: "Tribute to Allama Muhammad Iqbal", urdu: "یومِ اقبال — حکیم الامت کو سلام", category: 'National', icon: 'BookOpen', bgGradient: 'linear-gradient(160deg,#064e3b,#047857,#0284c7)' },
  { id: 'uae-national-day', label: "UAE National Day (Eid Al Etihad)", tagline: "Spirit of the Union - UAE", urdu: "متحدہ عرب امارات کا قومی دن", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#14532d,#dc2626,#000000)' },
  { id: 'quaid-day', label: "Quaid-e-Azam Day", tagline: "Tribute to Quaid-e-Azam Muhammad Ali Jinnah", urdu: "یومِ ولادت قائداعظمؒ مبارک", category: 'National', icon: 'Star', bgGradient: 'linear-gradient(160deg,#064e3b,#047857,#059669)' },
  { id: 'australia-day', label: "Australia Day", tagline: "Reflect, Respect & Celebrate", urdu: "آسٹریلیا ڈے", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#172554,#1d4ed8,#dc2626)' },
  { id: 'india-republic-day', label: "Republic Day of India", tagline: "Celebrating the Constitution & Sovereignty", urdu: "یومِ جمہوریہ بھارت", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#ea580c,#ffffff,#16a34a)' },
  { id: 'pakistan-day', label: "Pakistan Day (23 March)", tagline: "One Nation, One Destiny", urdu: "یومِ پاکستان مبارک (23 مارچ)", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#022c22,#064e3b,#059669)' },
  { id: 'saudi-founding-day', label: "Saudi Founding Day", tagline: "Three Centuries of Glory", urdu: "سعودی یومِ تاسیس مبارک", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#451a03,#78350f,#b45309)' },
  { id: 'canada-day', label: "Canada Day", tagline: "Happy Canada Day! Strong & Free", urdu: "کینیڈا ڈے مبارک", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#7f1d1d,#dc2626,#ef4444)' },
  { id: 'us-independence-day', label: "US 4th of July", tagline: "Happy Independence Day USA", urdu: "امریکی یومِ آزادی (4 جولائی)", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#1e3a8a,#dc2626,#f8fafc)' },
  { id: 'india-independence-day', label: "Independence Day of India", tagline: "Celebrating Independence Day (15 August)", urdu: "یومِ آزادی بھارت (15 اگست)", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#ea580c,#1e3a8a,#16a34a)' },
  { id: 'defence-day', label: "Defence Day of Pakistan", tagline: "6th September - Salute to Our Martyrs", urdu: "یومِ دفاع پاکستان (6 ستمبر)", category: 'National', icon: 'Flag', bgGradient: 'linear-gradient(160deg,#022c22,#064e3b,#1e3a8a)' },
  { id: 'teachers-day', label: "World Teachers' Day", tagline: "Saluting the Architects of Our Future", urdu: "اساتذہ کا عالمی دن مبارک", category: 'Achievements', icon: 'Award', bgGradient: 'linear-gradient(160deg,#1e3a8a,#0d9488,#10b981)' },

  // GAMING & ESPORTS WINNER
  { id: 'pubg-winner', label: 'PUBG Winner', tagline: 'Winner Winner Chicken Dinner!', urdu: 'ونر ونر چکن ڈنر!', category: 'Gaming', icon: 'Trophy', bgGradient: 'linear-gradient(135deg,#1f1604,#452d0a,#120c02)' },
  { id: 'free-fire-winner', label: 'Free Fire Winner', tagline: 'Booyah! Victory Royale', urdu: 'بویا! شاندار فتح!', category: 'Gaming', icon: 'Flame', bgGradient: 'linear-gradient(135deg,#2e0d06,#52180d,#160502)' },
  { id: 'ludo-champion', label: 'Ludo Champion', tagline: 'Ludo Champion of the Day!', urdu: 'لوڈو چیمپئن آف دی ڈے!', category: 'Gaming', icon: 'Gamepad2', bgGradient: 'linear-gradient(135deg,#15183b,#2c326b,#0d0e24)' },
  { id: 'number-draw-winner', label: 'Number Draw Winner', tagline: 'You Hit the Winning Number!', urdu: 'نمبر ڈرا فاتح!', category: 'Gaming', icon: 'Hash', bgGradient: 'linear-gradient(135deg,#042e25,#0c5746,#021a15)' },
  { id: 'bingo-winner', label: 'Bingo Winner', tagline: 'BINGO! You’re the Winner!', urdu: 'بنگو فاتح!', category: 'Gaming', icon: 'Sparkles', bgGradient: 'linear-gradient(135deg,#2e1042,#521c73,#1a0726)' },
  { id: 'esports-winner', label: 'Esports Tournament Winner', tagline: 'Tournament Champion!', urdu: 'ٹورنامنٹ چیمپئن!', category: 'Gaming', icon: 'Trophy', bgGradient: 'linear-gradient(135deg,#072b47,#0e4b7a,#031829)' },
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
  } else if (cat === 'Gaming') {
    soundCategory = 'festive'
    patternOverlay = 'jashn-pattern-personal'
    decorations = ['trophy', 'star-cluster', 'confetti', 'sparkles']
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
    poetry:          'linear-gradient(150deg,#1c1007 0%,#3d1e0a 50%,#68320a 100%)',
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

  if (occ.id === 'poetry') {
    bgVariants = [
      baseVariant,
      { id: 'poetry-vintage-parchment', name: 'Vintage Parchment', bgGradient: 'linear-gradient(150deg,#24140b 0%,#452312 50%,#783c18 100%)' },
      { id: 'poetry-royal-velvet', name: 'Royal Velvet Plum', bgGradient: 'linear-gradient(150deg,#1a051d 0%,#380b3d 50%,#63126e 100%)' },
      { id: 'poetry-dusk-indigo', name: 'Mushaira Night Indigo', bgGradient: 'linear-gradient(150deg,#0a0f24 0%,#151f47 50%,#283570 100%)' },
      { id: 'poetry-emerald-calligraphy', name: 'Emerald Kalaam', bgGradient: 'linear-gradient(150deg,#041f16 0%,#093d2c 50%,#136348 100%)' },
      { id: 'poetry-crimson-ghazal', name: 'Crimson Ghazal', bgGradient: 'linear-gradient(150deg,#24040a 0%,#4a0a16 50%,#7d1225 100%)' },
    ]
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
  'Gaming',
] as const

export function getOccasion(id: string | undefined): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id)
}

/** Pre-written templates per occasion. Falls back to a generic set. */
export const MESSAGE_TEMPLATES: Record<string, MessageTemplate[]> = {
  'poetry': [
    {
      en: "Hazaron khwahishen aisi ke har khwahish pe dam nikle\nBohat niklay mere armaan lekin phir bhi kam nikle",
      ur: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے",
    },
    {
      en: "Sitaron se aage jahan aur bhi hain\nAbhi ishq ke imtihan aur bhi hain",
      ur: "ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں",
    },
    {
      en: "Gulon mein rang bhare baad-e-naubahar chale\nChale bhi aao ki gulshan ka karobaar chale",
      ur: "گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے",
    },
    {
      en: "Wo aye bazm mein itna to mir ne dekha\nPhir us ke baad charaghon mein roshni na rahi",
      ur: "وہ آئے بزم میں اتنا تو میرؔ نے دیکھا\nپھر اس کے بعد چراغوں میں روشنی نہ رہی",
    },
  ],
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
  'sympathy': [
    {
      en: "Inna Lillahi wa inna ilayhi raji'un. Sending our deepest condolences and heartfelt prayers to you and your family. May Allah grant the departed soul highest rank in Jannah and grant you all patience and strength. Ameen.",
      ur: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\nاس غم کی گھڑی میں ہم آپ اور آپ کے تمام اہل خانہ کے دکھ میں برابر کے شریک ہیں۔ اللہ تعالیٰ مرحوم کو جوارِ رحمت میں اعلیٰ مقام اور پسماندگان کو صبرِ جمیل عطا فرمائے۔ آمین۔",
      ar: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\nأخلص التعازي والمواساة لكم ولعائلتكم الكريمة. نسأل الله للفقيد الرحمة والمغفرة ولكم الصبر والسلوان.",
      es: "Nuestro más sentido pésame para ti y tu familia en este momento tan doloroso. Que Dios les brinde paz, consuelo y fortaleza.",
      fr: "Nos plus sincères condoléances à vous et à votre famille en ce moment douloureux. Que la paix et le réconfort vous accompagnent.",
      hi: "ईश्वर दिवंगत आत्मा को शांति प्रदान करे और इस कठिन समय में आपको व आपके परिवार को संबल और धैर्य दे। हमारी गहरी संवेदनाएं आपके साथ हैं।",
      zh: "惊悉噩耗，深感悲痛。向您及家人致以最沉痛的哀悼，愿逝者安息，望节哀顺变。",
      pt: "Nossos mais sinceros sentimentos a você e sua família neste momento difícil. Que encontrem conforto e paz.",
      ru: "Примите наши самые искренние и глубокие соболезнования. Сил, терпения и душевного покоя вам и вашим близким в эту трудную минуту.",
      de: "Unser tiefstes Mitgefühl und herzliches Beileid gilt dir und deiner Familie. Mögen Kraft und Trost euch begleiten.",
      ja: "心よりお悔やみ申し上げます。故人のご冥福と、ご遺族の皆様に安らぎが訪れますよう深くお祈り申し上げます。",
      ko: "삼가 고인의 명복을 빌며, 유가족분들께 깊은 애도와 위로의 마음을 전합니다.",
      it: "Le nostre più sentite condoglianze a te e alla tua famiglia in questo momento di profondo dolore. Vi siamo vicini.",
      tr: "Başınız sağ olsun. Merhuma Allah'tan rahmet, kederli ailesine ve sizlere sabır ve başsağlığı dileriz.",
      id: "Inna lillahi wa inna ilaihi raji'un. Turut berduka cita yang sedalam-dalamnya. Semoga almarhum husnul khatimah dan keluarga diberikan ketabahan.",
      bn: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন। শোকসন্তপ্ত পরিবারের প্রতি আমাদের গভীর সমবেদনা রইল। আল্লাহ মরহুমকে জান্নাত দান করুন এবং আপনাদের ধৈর্য দান করুন।",
      vi: "Xin gửi lời chia buồn sâu sắc nhất đến bạn và gia đình. Cầu mong linh hồn người đã khuất được an nghỉ thanh thản.",
      sw: "Inna lillahi wa inna ilayhi raji'un. Pokeeni rambirambi zetu za dhati katika kipindi hiki kigumu. Mungu awape subira na faraja."
    },
    {
      en: "Please accept our deepest condolences and heartfelt sympathy during this difficult time. Wishing you comfort, peace, and strength in the days ahead.",
      ur: "دلی تعزیت و ہمدردی۔ اللہ پاک آپ کو اور آپ کے خاندان کو اس گہرے صدمے پر صبر و حوصلہ عطا فرمائے اور غم کو اپنی رحمتوں سے ہلکا فرمائے۔ آمین۔",
      ar: "عظّم الله أجركم وأحسن عزاءكم وغفر لميتكم وألهمكم جميل الصبر والسلوان.",
      es: "Deseándoles paz para traer consuelo, valor para enfrentar los días venideros y recuerdos amorosos para guardar siempre en el corazón.",
      fr: "Que les doux souvenirs de l'être cher vous apportent réconfort et sérénité. Toutes nos pensées sont avec vous.",
      hi: "इस दुख की घड़ी में हम आपके साथ हैं। ईश्वर आपको इस अपار क्षति को सहने की शक्ति दे।",
      zh: "愿逝者的美好回忆带给您温暖与力量，在这个艰难时刻，我们的心与您同在。",
      pt: "Desejando paz, coragem e conforto para enfrentar os dias à frente. Nossos pensamentos estão com você.",
      ru: "Скорбим вместе с вами. Светлая память об ушедшем навсегда останется в наших сердцах.",
      de: "In diesen schweren Stunden sind unsere Gedanken bei euch. Möge die Erinnerung an die gemeinsame Zeit Kraft spenden.",
      ja: "悲しみに寄り添い、心よりご冥福をお祈りいたします。どうかお心を強く持ってください。",
      ko: "갑작스러운 슬픔에 깊은 위로를 전하며, 고인의 따뜻했던 기억이 평안을 가져다주기를 바랍니다.",
      it: "Vi auguriamo pace e conforto per superare questi giorni difficili. Un abbraccio affettuoso.",
      tr: "Acınızı yürekten paylaşıyor, sizlere sabır ve metanet diliyoruz. Mekanı cennet olsun.",
      id: "Semoga Tuhan memberikan penghiburan, kekuatan, dan ketenangan bagi keluarga yang ditinggalkan.",
      bn: "এই কঠিন মুহূর্তে আপনাদের প্রতি রইল সহমর্মিতা ও শান্তি কামনার প্রার্থনা।",
      vi: "Nguyện cầu sự bình an và sức mạnh đến với gia đình bạn để vượt qua nỗi mất mát to lớn này.",
      sw: "Tunawaombea faraja, amani na ujasiri katika siku hizi za majonzi. Mko kwenye maombi yetu."
    }
  ],
  'condolence': [
    {
      en: "Inna Lillahi wa inna ilayhi raji'un. Sending our deepest condolences and heartfelt prayers to you and your family. May Allah grant the departed soul highest rank in Jannah and grant you all patience and strength. Ameen.",
      ur: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\nاس غم کی گھڑی میں ہم آپ اور آپ کے تمام اہل خانہ کے دکھ میں برابر کے شریک ہیں۔ اللہ تعالیٰ مرحوم کو جوارِ رحمت میں اعلیٰ مقام اور پسماندگان کو صبرِ جمیل عطا فرمائے۔ آمین۔",
      ar: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\nأخلص التعازي والمواساة لكم ولعائلتكم الكريمة. نسأل الله للفقيد الرحمة والمغفرة ولكم الصبر والسلوان.",
      es: "Nuestro más sentido pésame para ti y tu familia en este momento tan doloroso. Que Dios les brinde paz, consuelo y fortaleza.",
      fr: "Nos plus sincères condoléances à vous et à votre famille en ce moment douloureux. Que la paix et le réconfort vous accompagnent.",
      hi: "ईश्वर दिवंगत आत्मा को शांति प्रदान करे और इस कठिन समय में आपको व आपके परिवार को संबल और धैर्य दे। हमारी गहरी संवेदनाएं आपके साथ हैं।",
      zh: "惊悉噩耗，深感悲痛。向您及家人致以最沉痛的哀悼，愿逝者安息，望节哀顺变。",
      pt: "Nossos mais sinceros sentimentos a você e sua família neste momento difícil. Que encontrem conforto e paz.",
      ru: "Примите наши самые искренние и глубокие соболезнования. Сил, терпения и душевного покоя вам и вашим близким в эту трудную минуту.",
      de: "Unser tiefstes Mitgefühl und herzliches Beileid gilt dir und deiner Familie. Mögen Kraft und Trost euch begleiten.",
      ja: "心よりお悔やみ申し上げます。故人のご冥福と、ご遺族の皆様に安らぎが訪れますよう深くお祈り申し上げます。",
      ko: "삼가 고인의 명복을 빌며, 유가족분들께 깊은 애도와 위로의 마음을 전합니다.",
      it: "Le nostre più sentite condoglianze a te e alla tua famiglia in questo momento di profondo dolore. Vi siamo vicini.",
      tr: "Başınız sağ olsun. Merhuma Allah'tan rahmet, kederli ailesine ve sizlere sabır ve başsağlığı dileriz.",
      id: "Inna lillahi wa inna ilaihi raji'un. Turut berduka cita yang sedalam-dalamnya. Semoga almarhum husnul khatimah dan keluarga diberikan ketabahan.",
      bn: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন। শোকসন্তপ্ত পরিবারের প্রতি আমাদের গভীর সমবেদনা রইল। আল্লাহ মরহুমকে জান্নাত দান করুন এবং আপনাদের ধৈর্য দান করুন।",
      vi: "Xin gửi lời chia buồn sâu sắc nhất đến bạn và gia đình. Cầu mong linh hồn người đã khuất được an nghỉ thanh thản.",
      sw: "Inna lillahi wa inna ilayhi raji'un. Pokeeni rambirambi zetu za dhati katika kipindi hiki kigumu. Mungu awape subira na faraja."
    }
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
  'pubg-winner': [
    { en: "Winner Winner Chicken Dinner! Dominated the battlegrounds with ultimate skills!", ur: "ونر ونر چکن ڈنر! میدانِ جنگ فتح کر لیا!" },
  ],
  'free-fire-winner': [
    { en: "Booyah! Outstanding Victory Royale on the battlefield!", ur: "بویا! زبردست شاندار فتح حاصل کی!" },
  ],
  'ludo-champion': [
    { en: "Ludo Champion of the Day! Mastered every move and conquered the board!", ur: "لوڈو چیمپئن آف دی ڈے! بورڈ پر شاندار فتح!" },
  ],
  'number-draw-winner': [
    { en: "Congratulations! You Hit the Winning Number! Lucky day!", ur: "مبارک ہو! آپ کا لکی نمبر نکل آیا!" },
  ],
  'bingo-winner': [
    { en: "BINGO! You're the Grand Winner! Perfect score!", ur: "بنگو! آپ شاندار فاتح بن گئے!" },
  ],
  'esports-winner': [
    { en: "Tournament Champion! Crowned as the Esports Winner with supreme performance!", ur: "ای سپورٹس ٹورنامنٹ چیمپئن! زبردست فتح مبارک!" },
  ],
  'shab-e-miraj': [
    { en: "Warmest greetings on Shab-e-Miraj! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "شبِ معراج مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Shab-e-Miraj! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Shab-e-Miraj! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Shab-e-Miraj ! Paix, bonheur et prospérité.", hi: "Shab-e-Miraj की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Shab-e-Miraj之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Shab-e-Miraj! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Shab-e-Miraj! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Shab-e-Miraj! Möge dieser Tag Freude und Frieden bringen.", tr: "Shab-e-Miraj kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Shab-e-Miraj! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'shab-e-barat': [
    { en: "Shab-e-Barat Mubarak! May Allah forgive our shortcomings and accept our prayers on this blessed night.", ur: "شبِ برات مبارک ہو! اللہ تعالیٰ اس بابرکت رات ہماری مغفرت فرمائے اور دعائیں قبول فرمائے۔", ar: "ليلة البراءة مباركة! جعلها الله ليلة مغفرة ورضوان وقبول للدعاء.", hi: "शब-ए-बरात मुबारक! ईश्वर इस पवित्र रात हमारी दुआएं कुबूल करे।" },
  ],
  'roza-kushai': [
    { en: "Roza Kushai Mubarak! Congratulations to our dear child on observing their first fast. May Allah bless you!", ur: "پہلا روزہ مبارک ہو! ماشاءاللہ ننھے روزے دار کو روزہ کشائی کی دلی مبارکباد۔ اللہ دین و دنیا میں کامیابی دے۔", ar: "مبارك الصيام الأول! جعلكم الله من الصالحين المقبولين.", hi: "पहला रोज़ा मुबारक! नन्हे रोज़ेदार को बहुत-बहुत बधाई।" },
  ],
  'laylat-al-qadr': [
    { en: "Warmest greetings on Laylat al-Qadr! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "لیلتہ القدر مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Laylat al-Qadr! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Laylat al-Qadr! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Laylat al-Qadr ! Paix, bonheur et prospérité.", hi: "Laylat al-Qadr की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Laylat al-Qadr之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Laylat al-Qadr! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Laylat al-Qadr! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Laylat al-Qadr! Möge dieser Tag Freude und Frieden bringen.", tr: "Laylat al-Qadr kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Laylat al-Qadr! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'chand-raat': [
    { en: "Chand Raat Mubarak! Wishing you and your family a festive evening filled with joy, laughter, and mehndi.", ur: "چاند رات مبارک ہو! عید کی آمد آپ کی زندگی میں ڈھیروں خوشیاں اور مسکراہٹیں لے کر آئے۔", ar: "ليلة العيد مباركة! تقبل الله طاعاتكم وأدام أفراحكم.", hi: "चांद रात मुबारक! खुशियों और मुस्कानों से भरी शाम मुबारक हो।" },
  ],
  'day-of-arafah': [
    { en: "Warmest greetings on Day of Arafah! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ عرفہ مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Day of Arafah! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Day of Arafah! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Day of Arafah ! Paix, bonheur et prospérité.", hi: "Day of Arafah की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Day of Arafah之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Day of Arafah! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Day of Arafah! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Day of Arafah! Möge dieser Tag Freude und Frieden bringen.", tr: "Day of Arafah kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Day of Arafah! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'islamic-new-year': [
    { en: "Warmest greetings on Islamic New Year (Hijri)! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "نیا اسلامی سال مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Islamic New Year (Hijri)! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Islamic New Year (Hijri)! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Islamic New Year (Hijri) ! Paix, bonheur et prospérité.", hi: "Islamic New Year (Hijri) की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Islamic New Year (Hijri)之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Islamic New Year (Hijri)! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Islamic New Year (Hijri)! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Islamic New Year (Hijri)! Möge dieser Tag Freude und Frieden bringen.", tr: "Islamic New Year (Hijri) kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Islamic New Year (Hijri)! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'ashura': [
    { en: "Warmest greetings on Youm-e-Ashura! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ عاشورہ! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Youm-e-Ashura! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Youm-e-Ashura! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Youm-e-Ashura ! Paix, bonheur et prospérité.", hi: "Youm-e-Ashura की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Youm-e-Ashura之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Youm-e-Ashura! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Youm-e-Ashura! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Youm-e-Ashura! Möge dieser Tag Freude und Frieden bringen.", tr: "Youm-e-Ashura kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Youm-e-Ashura! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'chehlum': [
    { en: "Warmest greetings on Arbaeen / Chehlum! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "چہلم امام حسینؑ! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Arbaeen / Chehlum! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Arbaeen / Chehlum! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Arbaeen / Chehlum ! Paix, bonheur et prospérité.", hi: "Arbaeen / Chehlum की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Arbaeen / Chehlum之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Arbaeen / Chehlum! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Arbaeen / Chehlum! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Arbaeen / Chehlum! Möge dieser Tag Freude und Frieden bringen.", tr: "Arbaeen / Chehlum kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Arbaeen / Chehlum! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'gyarvi-sharif': [
    { en: "Warmest greetings on Gyarvi Sharif! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "گیارہویں شریف مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Gyarvi Sharif! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Gyarvi Sharif! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Gyarvi Sharif ! Paix, bonheur et prospérité.", hi: "Gyarvi Sharif की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Gyarvi Sharif之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Gyarvi Sharif! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Gyarvi Sharif! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Gyarvi Sharif! Möge dieser Tag Freude und Frieden bringen.", tr: "Gyarvi Sharif kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Gyarvi Sharif! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'all-saints-day': [
    { en: "Warmest greetings on All Saints Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "آل سینٹس ڈے! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة All Saints Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en All Saints Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de All Saints Day ! Paix, bonheur et prospérité.", hi: "All Saints Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在All Saints Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em All Saints Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с All Saints Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu All Saints Day! Möge dieser Tag Freude und Frieden bringen.", tr: "All Saints Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari All Saints Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'boxing-day': [
    { en: "Warmest greetings on Boxing Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "باکسنگ ڈے مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Boxing Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Boxing Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Boxing Day ! Paix, bonheur et prospérité.", hi: "Boxing Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Boxing Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Boxing Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Boxing Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Boxing Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Boxing Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Boxing Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'orthodox-christmas': [
    { en: "Warmest greetings on Orthodox Christmas! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "آرتھوڈوکس کرسمس! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Orthodox Christmas! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Orthodox Christmas! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Orthodox Christmas ! Paix, bonheur et prospérité.", hi: "Orthodox Christmas की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Orthodox Christmas之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Orthodox Christmas! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Orthodox Christmas! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Orthodox Christmas! Möge dieser Tag Freude und Frieden bringen.", tr: "Orthodox Christmas kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Orthodox Christmas! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'makar-sankranti': [
    { en: "Warmest greetings on Makar Sankranti & Lohri! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "مکر سنکرانتی و لوہڑی! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Makar Sankranti & Lohri! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Makar Sankranti & Lohri! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Makar Sankranti & Lohri ! Paix, bonheur et prospérité.", hi: "Makar Sankranti & Lohri की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Makar Sankranti & Lohri之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Makar Sankranti & Lohri! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Makar Sankranti & Lohri! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Makar Sankranti & Lohri! Möge dieser Tag Freude und Frieden bringen.", tr: "Makar Sankranti & Lohri kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Makar Sankranti & Lohri! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'lantern-festival': [
    { en: "Warmest greetings on Lantern Festival! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "لالٹین فیسٹیول مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Lantern Festival! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Lantern Festival! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Lantern Festival ! Paix, bonheur et prospérité.", hi: "Lantern Festival की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Lantern Festival之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Lantern Festival! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Lantern Festival! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Lantern Festival! Möge dieser Tag Freude und Frieden bringen.", tr: "Lantern Festival kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Lantern Festival! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'maha-shivratri': [
    { en: "Warmest greetings on Maha Shivratri! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "مہا شیو راتری! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Maha Shivratri! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Maha Shivratri! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Maha Shivratri ! Paix, bonheur et prospérité.", hi: "Maha Shivratri की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Maha Shivratri之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Maha Shivratri! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Maha Shivratri! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Maha Shivratri! Möge dieser Tag Freude und Frieden bringen.", tr: "Maha Shivratri kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Maha Shivratri! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'nowruz': [
    { en: "Warmest greetings on Nowruz (Persian New Year)! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "نوروز مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Nowruz (Persian New Year)! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Nowruz (Persian New Year)! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Nowruz (Persian New Year) ! Paix, bonheur et prospérité.", hi: "Nowruz (Persian New Year) की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Nowruz (Persian New Year)之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Nowruz (Persian New Year)! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Nowruz (Persian New Year)! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Nowruz (Persian New Year)! Möge dieser Tag Freude und Frieden bringen.", tr: "Nowruz (Persian New Year) kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Nowruz (Persian New Year)! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'purim': [
    { en: "Warmest greetings on Purim! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "پوریم مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Purim! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Purim! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Purim ! Paix, bonheur et prospérité.", hi: "Purim की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Purim之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Purim! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Purim! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Purim! Möge dieser Tag Freude und Frieden bringen.", tr: "Purim kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Purim! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'holi': [
    { en: "Happy Holi! May your life be as colorful and joyful as the vibrant colors of this beautiful festival.", ur: "ہولی کے رنگارنگ تہوار کی دلی مبارکباد! آپ کی زندگی ہمیشہ خوشیوں اور رنگوں سے مسکراتی رہے۔", ar: "عيد هولي سعيد! نتمنى لكم حياة مليئة بالألوان والبهجة.", hi: "होली की हार्दिक शुभकामनाएं! आपके जीवन में रंगों की तरह खुशियां और उमंग हमेशा बनी रहे।" },
  ],
  'good-friday': [
    { en: "Warmest greetings on Good Friday! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "گڈ فرائیڈے! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Good Friday! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Good Friday! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Good Friday ! Paix, bonheur et prospérité.", hi: "Good Friday की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Good Friday之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Good Friday! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Good Friday! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Good Friday! Möge dieser Tag Freude und Frieden bringen.", tr: "Good Friday kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Good Friday! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'passover': [
    { en: "Warmest greetings on Passover (Pesach)! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "عیدِ فصح (پیساخ)! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Passover (Pesach)! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Passover (Pesach)! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Passover (Pesach) ! Paix, bonheur et prospérité.", hi: "Passover (Pesach) की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Passover (Pesach)之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Passover (Pesach)! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Passover (Pesach)! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Passover (Pesach)! Möge dieser Tag Freude und Frieden bringen.", tr: "Passover (Pesach) kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Passover (Pesach)! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'vaisakhi': [
    { en: "Warmest greetings on Vaisakhi / Baisakhi! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "بیساکھی مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Vaisakhi / Baisakhi! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Vaisakhi / Baisakhi! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Vaisakhi / Baisakhi ! Paix, bonheur et prospérité.", hi: "Vaisakhi / Baisakhi की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Vaisakhi / Baisakhi之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Vaisakhi / Baisakhi! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Vaisakhi / Baisakhi! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Vaisakhi / Baisakhi! Möge dieser Tag Freude und Frieden bringen.", tr: "Vaisakhi / Baisakhi kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Vaisakhi / Baisakhi! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'buddha-purnima': [
    { en: "Warmest greetings on Buddha Purnima (Vesak)! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "بدھ پورنیما! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Buddha Purnima (Vesak)! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Buddha Purnima (Vesak)! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Buddha Purnima (Vesak) ! Paix, bonheur et prospérité.", hi: "Buddha Purnima (Vesak) की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Buddha Purnima (Vesak)之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Buddha Purnima (Vesak)! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Buddha Purnima (Vesak)! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Buddha Purnima (Vesak)! Möge dieser Tag Freude und Frieden bringen.", tr: "Buddha Purnima (Vesak) kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Buddha Purnima (Vesak)! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'raksha-bandhan': [
    { en: "Warmest greetings on Raksha Bandhan! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "رکشا بندھن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Raksha Bandhan! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Raksha Bandhan! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Raksha Bandhan ! Paix, bonheur et prospérité.", hi: "Raksha Bandhan की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Raksha Bandhan之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Raksha Bandhan! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Raksha Bandhan! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Raksha Bandhan! Möge dieser Tag Freude und Frieden bringen.", tr: "Raksha Bandhan kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Raksha Bandhan! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'janmashtami': [
    { en: "Warmest greetings on Krishna Janmashtami! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "کرشنا جنم اشٹمی! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Krishna Janmashtami! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Krishna Janmashtami! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Krishna Janmashtami ! Paix, bonheur et prospérité.", hi: "Krishna Janmashtami की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Krishna Janmashtami之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Krishna Janmashtami! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Krishna Janmashtami! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Krishna Janmashtami! Möge dieser Tag Freude und Frieden bringen.", tr: "Krishna Janmashtami kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Krishna Janmashtami! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'daughters-day': [
    { en: "Warmest greetings on National Daughters Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "بیٹیوں کا عالمی دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة National Daughters Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en National Daughters Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de National Daughters Day ! Paix, bonheur et prospérité.", hi: "National Daughters Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在National Daughters Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em National Daughters Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с National Daughters Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu National Daughters Day! Möge dieser Tag Freude und Frieden bringen.", tr: "National Daughters Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari National Daughters Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'world-smile-day': [
    { en: "Warmest greetings on World Smile Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "مسکراہٹ کا عالمی دن! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة World Smile Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en World Smile Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de World Smile Day ! Paix, bonheur et prospérité.", hi: "World Smile Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在World Smile Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em World Smile Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с World Smile Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu World Smile Day! Möge dieser Tag Freude und Frieden bringen.", tr: "World Smile Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari World Smile Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'sweetest-day': [
    { en: "Warmest greetings on Sweetest Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "میٹھی یادوں کا دن! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Sweetest Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Sweetest Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Sweetest Day ! Paix, bonheur et prospérité.", hi: "Sweetest Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Sweetest Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Sweetest Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Sweetest Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Sweetest Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Sweetest Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Sweetest Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'mens-day': [
    { en: "Warmest greetings on International Men's Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "مردوں کا عالمی دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة International Men's Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en International Men's Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de International Men's Day ! Paix, bonheur et prospérité.", hi: "International Men's Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在International Men's Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em International Men's Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с International Men's Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu International Men's Day! Möge dieser Tag Freude und Frieden bringen.", tr: "International Men's Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari International Men's Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'womens-day': [
    { en: "Warmest greetings on International Women's Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "خواتین کا عالمی دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة International Women's Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en International Women's Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de International Women's Day ! Paix, bonheur et prospérité.", hi: "International Women's Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在International Women's Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em International Women's Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с International Women's Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu International Women's Day! Möge dieser Tag Freude und Frieden bringen.", tr: "International Women's Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari International Women's Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'siblings-day': [
    { en: "Warmest greetings on National Siblings Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "بہن بھائیوں کا دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة National Siblings Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en National Siblings Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de National Siblings Day ! Paix, bonheur et prospérité.", hi: "National Siblings Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在National Siblings Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em National Siblings Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с National Siblings Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu National Siblings Day! Möge dieser Tag Freude und Frieden bringen.", tr: "National Siblings Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari National Siblings Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'pet-day': [
    { en: "Warmest greetings on National Pet Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "پالتو جانوروں کا دن! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة National Pet Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en National Pet Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de National Pet Day ! Paix, bonheur et prospérité.", hi: "National Pet Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在National Pet Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em National Pet Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с National Pet Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu National Pet Day! Möge dieser Tag Freude und Frieden bringen.", tr: "National Pet Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari National Pet Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'parents-day': [
    { en: "Warmest greetings on Parents Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "والدین کا دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Parents Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Parents Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Parents Day ! Paix, bonheur et prospérité.", hi: "Parents Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Parents Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Parents Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Parents Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Parents Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Parents Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Parents Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'sisters-day': [
    { en: "Warmest greetings on National Sisters Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "بہنوں کا دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة National Sisters Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en National Sisters Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de National Sisters Day ! Paix, bonheur et prospérité.", hi: "National Sisters Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在National Sisters Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em National Sisters Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с National Sisters Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu National Sisters Day! Möge dieser Tag Freude und Frieden bringen.", tr: "National Sisters Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari National Sisters Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'grandparents-day': [
    { en: "Warmest greetings on Grandparents Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "دادا دادی، نانا نانی کا دن! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Grandparents Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Grandparents Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Grandparents Day ! Paix, bonheur et prospérité.", hi: "Grandparents Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Grandparents Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Grandparents Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Grandparents Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Grandparents Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Grandparents Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Grandparents Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'saudi-national-day': [
    { en: "Warmest greetings on Saudi National Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "سعودی قومی دن مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Saudi National Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Saudi National Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Saudi National Day ! Paix, bonheur et prospérité.", hi: "Saudi National Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Saudi National Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Saudi National Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Saudi National Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Saudi National Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Saudi National Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Saudi National Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'german-unity-day': [
    { en: "Warmest greetings on German Unity Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "جرمن یومِ یکجہتی! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة German Unity Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en German Unity Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de German Unity Day ! Paix, bonheur et prospérité.", hi: "German Unity Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在German Unity Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em German Unity Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с German Unity Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu German Unity Day! Möge dieser Tag Freude und Frieden bringen.", tr: "German Unity Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari German Unity Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'iqbal-day': [
    { en: "Warmest greetings on Iqbal Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ اقبال — حکیم الامت کو سلام! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Iqbal Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Iqbal Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Iqbal Day ! Paix, bonheur et prospérité.", hi: "Iqbal Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Iqbal Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Iqbal Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Iqbal Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Iqbal Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Iqbal Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Iqbal Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'uae-national-day': [
    { en: "Warmest greetings on UAE National Day (Eid Al Etihad)! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "متحدہ عرب امارات کا قومی دن! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة UAE National Day (Eid Al Etihad)! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en UAE National Day (Eid Al Etihad)! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de UAE National Day (Eid Al Etihad) ! Paix, bonheur et prospérité.", hi: "UAE National Day (Eid Al Etihad) की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在UAE National Day (Eid Al Etihad)之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em UAE National Day (Eid Al Etihad)! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с UAE National Day (Eid Al Etihad)! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu UAE National Day (Eid Al Etihad)! Möge dieser Tag Freude und Frieden bringen.", tr: "UAE National Day (Eid Al Etihad) kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari UAE National Day (Eid Al Etihad)! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'quaid-day': [
    { en: "Warmest greetings on Quaid-e-Azam Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ ولادت قائداعظمؒ مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Quaid-e-Azam Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Quaid-e-Azam Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Quaid-e-Azam Day ! Paix, bonheur et prospérité.", hi: "Quaid-e-Azam Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Quaid-e-Azam Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Quaid-e-Azam Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Quaid-e-Azam Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Quaid-e-Azam Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Quaid-e-Azam Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Quaid-e-Azam Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'australia-day': [
    { en: "Warmest greetings on Australia Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "آسٹریلیا ڈے! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Australia Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Australia Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Australia Day ! Paix, bonheur et prospérité.", hi: "Australia Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Australia Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Australia Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Australia Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Australia Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Australia Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Australia Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'india-republic-day': [
    { en: "Warmest greetings on Republic Day of India! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ جمہوریہ بھارت! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Republic Day of India! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Republic Day of India! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Republic Day of India ! Paix, bonheur et prospérité.", hi: "Republic Day of India की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Republic Day of India之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Republic Day of India! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Republic Day of India! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Republic Day of India! Möge dieser Tag Freude und Frieden bringen.", tr: "Republic Day of India kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Republic Day of India! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'pakistan-day': [
    { en: "Happy Pakistan Day! Commemorating the historic Lahore Resolution of 1940. Pakistan Zindabad!", ur: "یومِ پاکستان مبارک ہو! 23 مارچ 1940 کی قراردادِ پاکستان کی یاد میں، پاکستان زندہ باد!", ar: "يوم باكستان سعيد! نتمنى لباكستان دوام التقدم والازدهار.", hi: "पाकिस्तान दिवस की शुभकामनाएं।" },
  ],
  'saudi-founding-day': [
    { en: "Warmest greetings on Saudi Founding Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "سعودی یومِ تاسیس مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Saudi Founding Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Saudi Founding Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Saudi Founding Day ! Paix, bonheur et prospérité.", hi: "Saudi Founding Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Saudi Founding Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Saudi Founding Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Saudi Founding Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Saudi Founding Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Saudi Founding Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Saudi Founding Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'canada-day': [
    { en: "Warmest greetings on Canada Day! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "کینیڈا ڈے مبارک! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Canada Day! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Canada Day! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Canada Day ! Paix, bonheur et prospérité.", hi: "Canada Day की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Canada Day之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Canada Day! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Canada Day! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Canada Day! Möge dieser Tag Freude und Frieden bringen.", tr: "Canada Day kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Canada Day! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'us-independence-day': [
    { en: "Warmest greetings on US 4th of July! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "امریکی یومِ آزادی (4 جولائی)! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة US 4th of July! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en US 4th of July! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de US 4th of July ! Paix, bonheur et prospérité.", hi: "US 4th of July की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在US 4th of July之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em US 4th of July! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с US 4th of July! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu US 4th of July! Möge dieser Tag Freude und Frieden bringen.", tr: "US 4th of July kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari US 4th of July! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'india-independence-day': [
    { en: "Warmest greetings on Independence Day of India! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ آزادی بھارت (15 اگست)! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Independence Day of India! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Independence Day of India! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Independence Day of India ! Paix, bonheur et prospérité.", hi: "Independence Day of India की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Independence Day of India之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Independence Day of India! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Independence Day of India! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Independence Day of India! Möge dieser Tag Freude und Frieden bringen.", tr: "Independence Day of India kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Independence Day of India! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'defence-day': [
    { en: "Warmest greetings on Defence Day of Pakistan! Wishing you and your loved ones peace, happiness, and prosperity.", ur: "یومِ دفاع پاکستان (6 ستمبر)! اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو ہمیشہ خوش و خرم رکھے۔", ar: "أطيب التهاني بمناسبة Defence Day of Pakistan! نتمنى لكم ولعائلتكم السلام والسعادة والبركة.", es: "¡Cálidos saludos en Defence Day of Pakistan! Deseándote paz, felicidad y prosperidad.", fr: "Meilleurs vœux à l'occasion de Defence Day of Pakistan ! Paix, bonheur et prospérité.", hi: "Defence Day of Pakistan की हार्दिक शुभकामनाएं! आपके जीवन में सुख, शांति और समृद्धि आए।", zh: "在Defence Day of Pakistan之际致以最诚挚的祝福！祝您平安、喜乐与繁荣。", pt: "Calorosas saudações em Defence Day of Pakistan! Paz, felicidade e prosperidade para você.", ru: "Сердечные поздравления с Defence Day of Pakistan! Мира, счастья и благополучия вам и вашим близким.", de: "Herzliche Grüße zu Defence Day of Pakistan! Möge dieser Tag Freude und Frieden bringen.", tr: "Defence Day of Pakistan kutlu olsun! Size ve sevdiklerinize huzur ve mutluluk dileriz.", id: "Salam hangat di hari Defence Day of Pakistan! Semoga kedamaian dan kebahagiaan selalu menyertai Anda." },
  ],
  'teachers-day': [
    { en: "Happy Teachers' Day! Thank you for inspiring, guiding, and illuminating our path with wisdom and patience.", ur: "اساتذہ کا عالمی دن مبارک! علم اور حکمت سے ہماری زندگیوں کو روشن کرنے پر آپ کا تہہ دل سے شکریہ۔", ar: "يوم معلم سعيد! شكراً لكم على العطاء والإلهام الدائم.", hi: "शिक्षक दिवस की हार्दिक शुभकामनाएं! हमारे मार्गदर्शक बनने के लिए दिल से धन्यवाद।" },
  ],
  'youm-e-ali': [
    {
      en: "Heartiest greetings on Youm-e-Ali (A.S.)! May the wisdom, justice, and courage of Imam Ali (A.S.) guide your path with endless blessings.",
      ur: "ولادتِ باسعادت امیر المومنین حضرت علیؑ بہت بہت مبارک ہو۔ مولا علیؑ کا اسوہ و بصیرت آپ کی زندگی کو منور رکھے۔",
      ar: "نرفع أسمى آيات التهاني والتبريكات بمناسبة ذكرى ولادة أمير المؤمنين الإمام علي بن أبي طالب (عليه السلام). كل عام وأنتم بخير!",
      es: "¡Mis más cálidos saludos en el Día del Imán Alí (a.s.)! Que su justicia, sabiduría y bendiciones iluminen siempre tu vida.",
      fr: "Meilleurs vœux à l'occasion du jour de l'Imam Ali (a.s.) ! Que sa sagesse, sa justice et ses bénédictions éclairent votre vie.",
      hi: "यौम-ए-अली (अ.स.) मुबारक! हज़रत अली (अ.स.) का ज्ञान, न्याय और शिक्षाएं आपके जीवन में सुख और शांति लाएं।",
      zh: "热烈祝贺伊玛目阿里（愿主赐福之）诞辰吉庆！愿伊玛目的智慧与美德为您带来平安与光明。",
      pt: "Calorosas saudações no Dia do Imam Ali (a.s.)! Que sua sabedoria, justiça e bênçãos iluminem sua vida.",
      ru: "Сердечные поздравления с днем рождения Имама Али (а.с.)! Пусть его мудрость, справедливость и благодать озаряют ваш путь.",
      de: "Herzliche Glückwünsche zum Tag von Imam Ali (a.s.)! Möge seine Weisheit und Gerechtigkeit Ihr Leben segnen.",
      ja: "イマーム・アリー（彼に平安あれ）の生誕記念日に心よりお祝いを申し上げます。知恵と祝福が共にあらんことを。",
      ko: "이맘 알리의 탄생을 기념하며 진심으로 축하의 인사를 전합니다. 지혜와 평화가 늘 함께하시기를 기원합니다.",
      it: "I più calorosi auguri nel giorno dell'Imam Ali (a.s.)! Che la sua saggezza e rettitudine illuminino il tuo cammino.",
      tr: "Hz. Ali'nin (k.v.) veladeti ve Mevlid-i Ali mübarek olsun! Adaleti ve ilmi daima yolunuza ışık tutsun.",
      id: "Selamat memperingati Hari Lahir Imam Ali (a.s.)! Semoga hikmah, keadilan, dan akhlak beliau senantiasa menerangi kehidupan Anda.",
      bn: "যৌমে আলী (আ.) মোবারক! হযরত আলী (আ.)-এর জ্ঞান, প্রজ্ঞা ও ইনসাফ আপনার জীবনে সুখ ও বরকত নিয়ে আসুক।",
      vi: "Kính chúc mừng ngày kỷ niệm Đức Imam Ali (a.s.)! Cầu mong trí tuệ, sự công chính và phước lành luôn ở bên bạn.",
      sw: "Heri ya Siku ya Imam Ali (a.s.)! Hekima, uadilifu na baraka zake ziongoze maisha yako daima."
    }
  ],
  'urs': [
    {
      en: "Urs Mubarak! May the spiritual grace, peace, and blessings of the revered saints illuminate your heart and home.",
      ur: "عرس مبارک! اللہ تعالیٰ اولیائے کرام کے فیض، امن اور برکتوں سے آپ کے گھر اور دل کو سدا منور رکھے۔",
      ar: "عرس مبارك! نسأل الله تعالى أن يملأ قلوبكم بالسكينة والبركات والأنوار الإيمانية الدائمة.",
      es: "¡Urs Mubarak! Que la paz, la serenidad y las bendiciones de los santos iluminen tu corazón y tu hogar.",
      fr: "Urs Moubarak ! Que la sérénité spirituelle, la paix et les bénédictions illuminent votre cœur et votre foyer.",
      hi: "उर्स मुबारक! ईश्वर की कृपा, संतों का आशीर्वाद और रूहानी सुकून आपके घर-आंगन को रोशन रखे।",
      zh: "乌尔斯圣纪吉庆！愿圣贤的安宁、智慧与吉祥神圣光芒长照您的家庭与心灵。",
      pt: "Urs Mubarak! Que a serenidade espiritual, a paz e as bênçãos iluminem seu lar e coração.",
      ru: "Урс Мубарак! Пусть духовное умиротворение, милость и благословения праведников наполнят ваш дом светом.",
      de: "Urs Mubarak! Möge der spirituelle Frieden und der göttliche Segen dein Herz und dein Zuhause erleuchten.",
      ja: "ウルス・ムバラク！聖者たちの霊的な平安と祝福が、あなたのご家庭と心を明るく照らしますように。",
      ko: "우르스 무바라크! 성자들의 영적 평화와 축복이 당신의 가정과 마음에 가득하기를 기원합니다.",
      it: "Urs Mubarak! Che la pace spirituale e le benedizioni dei santi illuminino la tua casa e il tuo cuore.",
      tr: "Urs-i Şerifiniz mübarek olsun! Manevi huzur, feyiz ve bereket yuvanızı ve kalbinizi aydınlatsın.",
      id: "Selamat Memperingati Haul Akbar / Urs Mubarak! Semoga kedamaian spiritual dan berkah para kekasih Allah menyertai Anda.",
      bn: "উরস মোবারক! আল্লাহর ওলিদের রুহানি ফয়েজ, বরকত এবং শান্তি আপনার জীবনে অফুরন্ত আলো দান করুক।",
      vi: "Chúc mừng Lễ Urs Mubarak! Cầu mong sự bình an thanh tịnh và phước lành soi sáng mái ấm của bạn.",
      sw: "Urs Mubarak! Amani ya kiroho na baraka za waja wema ziangazie moyo na nyumba yako daima."
    }
  ],
  'milestone-birthday': [
    {
        "en": "Happy Milestone Birthday! Reaching this monumental chapter is truly special. May the coming years bring you radiant health, boundless wisdom, and endless happiness!",
        "ur": "خصوصی سالگرہ مبارک! زندگی کے اس تاریخی سنگِ میل پر پہنچنا بہت بڑا اعزاز ہے۔ اللہ پاک آپ کو لمبی عمر، بہترین صحت اور بے شمار خوشیاں عطا فرمائے۔ آمین۔",
        "ar": "عيد ميلاد استثنائي مبارك! الوصول إلى هذه المحطة التاريخية إنجاز يستحق الاحتفال. نسأل الله لك دوام الصحة والعافية والسعادة الدائمة.",
        "es": "¡Feliz Cumpleaños de Hito Histórico! Llegar a este gran capítulo es algo extraordinario. ¡Que los próximos años te traigan salud, sabiduría y felicidad!",
        "fr": "Joyeux anniversaire pour ce cap marquant ! Atteindre cette étape monumentale est un moment précieux. Santé, sagesse et bonheur pour les années à venir !",
        "hi": "इस ऐतिहासिक जन्मदिन के पड़ाव पर हार्दिक शुभकामनाएं! ईश्वर आपको दीर्घायु, उत्तम स्वास्थ्य और अपार खुशियां प्रदान करे।",
        "zh": "里程碑生日快乐！迈入这一具有纪念意义的重要人生篇章，愿您在未来的岁月里健康长寿、智慧相伴、幸福无疆！",
        "pt": "Feliz Aniversário de Marco Histórico! Alcançar este capítulo especial é maravilhoso. Que os próximos anos tragam saúde e muita felicidade!",
        "ru": "С юбилеем! Достижение этого знаменательного рубежа — настоящий праздник. Крепкого здоровья, мудрости и бесконечного счастья на долгие годы!",
        "de": "Herzlichen Glückwunsch zu diesem besonderen Meilenstein-Geburtstag! Möge dieses neue Kapitel voller Gesundheit, Weisheit und Freude sein!",
        "ja": "人生の特別な節目となるお誕生日、心よりお祝い申し上げます！これからも素晴らしい健康と幸福が続きますように。",
        "ko": "인생의 특별한 이정표가 되는 생일을 진심으로 축하합니다! 앞으로의 날들이 건강과 지혜, 끝없는 행복으로 가득하길 기원합니다.",
        "it": "Buon compleanno per questo importante traguardo! Raggiungere questa tappa è speciale. Ti auguro salute, saggezza e felicità!",
        "tr": "Dönüm noktası doğum günün kutlu olsun! Bu özel yaşa ulaşmak büyük bir mutluluk. Sağlık, bilgelik ve neşe dolu yıllar dilerim!",
        "id": "Selamat Ulang Tahun untuk tonggak bersejarah ini! Semoga tahun-tahun mendatang membawa kesehatan, kebijaksanaan, dan kebahagiaan berlimpah!",
        "bn": "জীবনের বিশেষ মাইলফলক জন্মদিনে আন্তরিক শুভেচ্ছা! আল্লাহ আপনাকে দীর্ঘায়ু, সুস্বাস্থ্য ও অফুরন্ত আনন্দ দান করুন।",
        "vi": "Chúc mừng sinh nhật cột mốc trọng đại! Chúc bạn những năm tháng tới luôn tràn ngập sức khỏe, trí tuệ và hạnh phúc viên mãn!",
        "sw": "Heri ya siku ya kuzaliwa ya kihistoria! Kufikia hatua hii ni jambo maalum sana. Mungu akupe afya njema na furaha daima!"
    }
],
  'golden-anniversary': [
    {
        "en": "Golden Jubilee Mubarak! 50 incredible years of love, devotion, and togetherness. May your beautiful bond continue to inspire everyone around you!",
        "ur": "گولڈن جوبلی سالگرہ مبارک! 50 سالہ رفاقت، سچی محبت اور خلوص پر دلی مبارکباد۔ اللہ پاک آپ دونوں کی جوڑی کو سدا سلامت اور خوش و خرم رکھے۔ آمین۔",
        "ar": "مبارك اليوبيل الذهبي! خمسون عاماً من المحبة والوفاء والشراكة المباركة. حفظكم الله وأدام المحبة بينكما في خير وسعادة.",
        "es": "¡Felices Bodas de Oro! 50 años increíbles de amor, devoción y complicidad. ¡Que su hermoso lazo continúe inspirando a todos!",
        "fr": "Joyeuses Noces d'Or ! 50 années exceptionnelles d'amour, de dévouement et de complicité. Que votre union demeure une source d'inspiration !",
        "hi": "गोल्डन जुबली शादी की सालगिरह पर हार्दिक बधाई! प्रेम और समर्पण के 50 सुनहरे साल। ईश्वर आपकी जोड़ी को सदा खुशहाल रखे।",
        "zh": "金婚五十周年吉庆！半个世纪的风雨同舟、相濡以沫。愿二老的深情厚谊永葆青春、白头偕老！",
        "pt": "Felizes Bodas de Ouro! 50 anos incríveis de amor, lealdade e companheirismo. Que a união de vocês continue linda e inspiradora!",
        "ru": "С золотой свадьбой! 50 прекрасных лет любви, уважения и взаимопонимания. Пусть ваш союз остается примером истинного счастья!",
        "de": "Herzlichen Glückwunsch zur Goldenen Hochzeit! 50 wundervolle Jahre voller Liebe und Verbundenheit. Möge euer Bund weiterhin erstrahlen!",
        "ja": "金婚式、誠におめでとうございます！50年という長い歳月を共に歩んでこられた深い絆に、心より敬意と祝福を捧げます。",
        "ko": "금혼식을 진심으로 축하드립니다! 50년 동안 서로를 아끼고 사랑해 온 아름다운 동행이 앞으로도 영원히 빛나길 바랍니다.",
        "it": "Buone Nozze d'Oro! 50 anni meravigliosi d'amore e dedizione. Che il vostro splendido legame continui a illuminare chi vi circonda!",
        "tr": "Altın Yıldönümünüz Kutlu Olsun! 50 yıllık sevgi, sadakat ve birlikteliğiniz her daim ilham vermeye devam etsin!",
        "id": "Selamat Ulang Tahun Pernikahan Emas ke-50! Semoga ikatan cinta yang luar biasa ini terus diberkahi dengan kedamaian dan kebahagiaan!",
        "bn": "৫০তম বিবাহবার্ষিকী তথা গোল্ডেন জুবিলির শুভেচ্ছা! আপনাদের ভালোবাসা ও একসাথে চলার ৫০টি সোনালী বছর সবার জন্য অনুপ্রেরণা।",
        "vi": "Chúc mừng đám cưới Vàng 50 năm! 50 năm sắt son, thủy chung và tràn ngập yêu thương. Chúc hai bạn luôn bình an và hạnh phúc bên nhau!",
        "sw": "Hongera kwa Jubilei ya Dhahabu ya miaka 50 ya ndoa! Upendo wenu wa dhati na ushirikiano uwe baraka kwa vizazi vyote."
    }
],
  'gender-reveal': [
    {
        "en": "Congratulations on the sweet baby news! We can't wait to welcome your newest family member. Wishing mother and baby radiant health and happiness!",
        "ur": "خوشخبری اور آمدِ نو مولود مبارک! اللہ تعالیٰ آنے والے ننھے مہمان کو آپ کی آنکھوں کی ٹھنڈک، صحت اور لمبی عمر عطا فرمائے۔ آمین۔",
        "ar": "مبارك هذه البشارة السعيدة واستقبال المولود المرتقب! جعله الله قرة عين لوالديه ورزقه الصحة والعافية والبركة.",
        "es": "¡Felicitaciones por la emocionante noticia del bebé! Deseando a la mamá y al bebé muchísima salud, ternura y alegría.",
        "fr": "Félicitations pour cette merveilleuse nouvelle ! Nous avons hâte d'accueillir ce petit ange. Plein de santé et d'amour à la maman et au bébé !",
        "hi": "घर में आने वाले नन्हे मेहमान की शुभ सूचना पर बहुत-बहुत बधाई! माँ और बच्चे दोनों को उत्तम स्वास्थ्य और खुशियां मिलें।",
        "zh": "热烈祝贺宝宝即将降临的特大喜讯！愿宝宝健康茁壮成长，为全家带来无尽的欢乐与福气！",
        "pt": "Parabéns pela doce notícia do bebê! Desejando à mamãe e ao bebezinho muita saúde, carinho e momentos inesquecíveis.",
        "ru": "Поздравляем с радостной вестью о скором прибавлении! Желаем будущей маме и малышу крепкого здоровья, мира и счастья!",
        "de": "Herzlichen Glückwunsch zu den wunderbaren Babynachrichten! Wir freuen uns sehr auf das Kleine. Gesundheit und Glück für die Familie!",
        "ja": "新しい命の嬉しいお知らせ、心よりお祝い申し上げます！母子ともに健康で、笑顔あふれる毎日となりますように。",
        "ko": "아름다운 아기 탄생 소식을 진심으로 축하드립니다! 산모와 아기 모두 건강하고 가정에 기쁨이 가득하길 소망합니다.",
        "it": "Congratulazioni per la bellissima notizia del bebè in arrivo! Auguriamo alla mamma e al piccolo tanta salute e serenità.",
        "tr": "Müjdeli bebek haberi kutlu olsun! Anneye ve minik yavrumuza sağlık, huzur ve bereket dolu bir ömür dileriz.",
        "id": "Selamat atas kabar gembira kehadiran buah hati tercinta! Semoga ibu dan bayi selalu dalam lindungan sehat dan bahagia.",
        "bn": "পরিবারে নতুন অতিথি আগমনের সুসংবাদে প্রাণঢালা অভিনন্দন! মা ও শিশুর সুস্বাস্থ্য ও দীর্ঘায়ু কামনা করি।",
        "vi": "Chúc mừng tin vui đón chào thành viên nhí mới! Chúc mẹ và bé luôn khỏe mạnh, bình an và ngập tràn niềm vui gia đình!",
        "sw": "Hongera kwa habari njema ya mtoto anayetarajiwa! Mungu amlinde mama na mtoto kwa afya tele na furaha."
    }
],
  'retirement': [
    {
        "en": "Congratulations on your well-deserved retirement! Thank you for decades of dedication and excellence. May this golden chapter bring you peace, travel, and joy!",
        "ur": "ریٹائرمنٹ مبارک ہو! آپ کی برسوں کی انتھک محنت اور شاندار خدمات کو سلام۔ دعا ہے کہ زندگی کا یہ نیا دور آپ کے لیے سکون، صحت اور خوشیوں کا پیامبر ہو۔",
        "ar": "تهانينا بمناسبة التقاعد المستحق بجدارة! شكراً لعقود من العطاء والتميز. نتمنى لك مرحلة جديدة عامرة بالراحة وراحة البال.",
        "es": "¡Felicitaciones por tu merecida jubilación! Gracias por años de entrega y excelencia. ¡Que esta nueva etapa te traiga paz y descanso!",
        "fr": "Félicitations pour cette retraite bien méritée ! Merci pour vos années de dévouement et d'excellence. Profitez pleinement de ce nouveau chapitre !",
        "hi": "शानदार रिटायरमेंट पर हार्दिक बधाई! आपके समर्पण और उत्कृष्ट सेवा के लिए धन्यवाद। यह नया अध्याय शांति और आनंद लेकर आए।",
        "zh": "光荣退休，诚挚祝贺！感谢您数十年来兢兢业业的奉献与杰出成就。愿您的退休生活悠然自得、平安喜乐！",
        "pt": "Parabéns pela merecida aposentadoria! Obrigado por anos de dedicação exemplar. Que esta nova fase seja repleta de descanso e realizações!",
        "ru": "Поздравляем с заслуженным выходом на пенсию! Спасибо за годы преданного труда и профессионализма. Желаем отдыха, здоровья и радости!",
        "de": "Herzlichen Glückwunsch zum wohlverdienten Ruhestand! Danke für deinen jahrzehntelangen Einsatz. Genieße die neue Freiheit in vollen Zügen!",
        "ja": "ご退職、誠におめでとうございます！長年にわたるご尽力と素晴らしい功績に敬意を表し、心より感謝申し上げます。素敵なセカンドライフを！",
        "ko": "명예로운 정년퇴직을 진심으로 축하드립니다! 오랜 세월 동안 보여주신 헌신과 열정에 감사드리며, 여유롭고 행복한 새 출발을 응원합니다.",
        "it": "Congratulazioni per la tua meritata pensione! Grazie per anni di dedizione ed eccellenza. Goditi questo meraviglioso capitolo di libertà e pace!",
        "tr": "Emekliliğin hayırlı olsun! Yıllarca verdiğin emek ve başarılar için teşekkür eder, huzurlu ve keyifli bir ömür dileriz.",
        "id": "Selamat atas masa purnabakti yang membanggakan! Terima kasih atas dedikasi dan karya terbaik selama ini. Nikmati masa pensiun dengan penuh berkah!",
        "bn": "মর্যাদাপূর্ণ অবসর গ্রহণের জন্য আন্তরিক অভিনন্দন! আপনার দীর্ঘ কর্মজীবনের নিষ্ঠা ও সেবার জন্য ধন্যবাদ। অবসরের দিনগুলি শান্তিময় হোক।",
        "vi": "Chúc mừng bạn đã đến tuổi nghỉ hưu vinh quang! Cảm ơn sự cống hiến xuất sắc trong suốt những năm qua. Chúc bạn an nhàn và hạnh phúc!",
        "sw": "Hongera sana kwa kustaafu kwa heshima! Asante kwa miaka mingi ya kazi yenye weledi. Furahia mapumziko haya kwa amani na furaha."
    }
],
  'christmas': [
    {
        "en": "Merry Christmas! Wishing you and your loved ones a season filled with warmth, love, joy, and peace.",
        "ur": "کرسمس کی پرمسرت مبارکباد! دعا ہے کہ یہ تہوار آپ کے گھر اور دل کو امن، محبت اور خوشیوں سے منور کر دے۔",
        "ar": "عيد ميلاد مجيد! نتمنى لكم ولعائلاتكم موسماً مليئاً بالسلام والدفء والمحبة والبهجة.",
        "es": "¡Feliz Navidad! Deseando a ti y a tus seres queridos una temporada llena de calidez, amor, paz y alegría.",
        "fr": "Joyeux Noël ! Que cette période festive soit remplie de chaleur, d'amour, de paix et de bonheur pour vous et vos proches.",
        "hi": "क्रिसमस की हार्दिक शुभकामनाएं! यह पावन पर्व आपके और आपके परिवार के जीवन में शांति, प्रेम और खुशियां लाए।",
        "zh": "圣诞快乐！愿这个充满温情的节日为您和家人带来平安、喜乐与满满的祝福！",
        "pt": "Feliz Natal! Desejo a você e à sua família uma época abençoada com muita paz, carinho e alegria.",
        "ru": "Счастливого Рождества! Пусть этот светлый праздник принесет в ваш дом тепло, уют, мир и благополучие!",
        "de": "Frohe Weihnachten! Möge diese festliche Zeit dir und deinen Liebsten Wärme, Frieden und Freude schenken.",
        "ja": "メリークリスマス！温かい光と愛、そして穏やかな笑顔に包まれた素敵なクリスマスをお過ごしください。",
        "ko": "메리 크리스마스! 따뜻한 사랑과 평화, 기쁨이 가득한 축복의 성탄절이 되기를 기원합니다.",
        "it": "Buon Natale! Auguro a te e ai tuoi cari una stagione ricca di pace, calore, amore e serenità.",
        "tr": "Mutlu Noeller! Sizlere ve sevdiklerinize huzur, neşe, sevgi ve mutluluk dolu bir bayram dilerim.",
        "id": "Selamat Hari Natal! Semoga damai dan sukacita Natal senantiasa memenuhi hati serta rumah tangga Anda.",
        "bn": "শুভ বড়দিন! আপনার এবং আপনার প্রিয়জনদের জীবন শান্তি, প্রেম ও আনন্দে ভরে উঠুক।",
        "vi": "Giáng Sinh an lành! Chúc bạn và gia đình một mùa lễ hội ấm áp, tràn ngập yêu thương và hạnh phúc.",
        "sw": "Heri ya Krismasi! Nakutakia wewe na familia yako msimu uliojaa upendo, amani na furaha tele."
    }
],
  'thanksgiving': [
    {
        "en": "Happy Thanksgiving! Grateful for your presence in our lives. Wishing you a bountiful feast and a heart full of joy.",
        "ur": "تھینکس گیونگ مبارک! شکرگزاری کے اس دن پر آپ کی دوستی اور محبت کا تہہ دل سے شکریہ۔ آپ کے لیے ڈھیروں دعائیں اور برکتیں۔",
        "ar": "عيد شكر سعيد! ممتنون لوجودكم الطيب في حياتنا، متمنين لكم مائدة عامرة وقلوباً مفعمة بالامتنان والفرح.",
        "es": "¡Feliz Día de Acción de Gracias! Agradecido por tu amistad y presencia. Que disfrutes de una fiesta llena de paz y alegría.",
        "fr": "Joyeuse fête de Thanksgiving ! Reconnaissant de vous compter dans notre vie. Bénédictions et abondance à votre table !",
        "hi": "थैंक्सगिविंग की शुभकामनाएं! जीवन में आपके साथ और प्रेम के लिए हार्दिक आभार। आपका जीवन खुशियों से भरा रहे।",
        "zh": "感恩节快乐！心怀感恩，感谢生命中有您的相伴。愿您的生活中常伴欢声笑语与满满的温情！",
        "pt": "Feliz Dia de Ação de Graças! Muito grato por sua presença e carinho. Que seu dia seja farto de paz e felicidade.",
        "ru": "С Днем Благодарения! Спасибо за то, что вы есть в нашей жизни. Желаем уюта, тепла и изобилия в вашем доме!",
        "de": "Frohes Erntedankfest! Dankbar für deine Begleitung. Möge dein Herz voller Freude und dein Tisch reich gedeckt sein.",
        "ja": "感謝祭おめでとうございます！いつも温かい支えをありがとうございます。たくさんの実りと幸せをお祈りします。",
        "ko": "추수감사절을 축하합니다! 함께할 수 있어 진심으로 감사드리며, 풍요롭고 행복한 시간이 되시길 바랍니다.",
        "it": "Buon Ringraziamento! Grato per la tua presenza nella nostra vita. Ti auguro una festa ricca di amore e gioia.",
        "tr": "Şükran Gününüz Kutlu Olsun! Hayatımızda olduğun için minnettarız. Bereket ve huzur dolu bir gün dilerim.",
        "id": "Selamat Hari Thanksgiving! Bersyukur atas kehadiran Anda dalam hidup kami. Semoga dilimpahi damai dan kebahagiaan.",
        "bn": "থ্যাঙ্কসগিভিং-এর শুভেচ্ছা! জীবনে আপনার উপস্থিতির জন্য আমরা কৃতজ্ঞ। আনন্দ ও শান্তিতে কাটুক আপনার প্রতিটি দিন।",
        "vi": "Chúc mừng Lễ Tạ Ơn! Cảm ơn vì đã luôn đồng hành cùng chúng tôi. Chúc bạn một mùa lễ ấm áp và tràn đầy phúc lành.",
        "sw": "Heri ya Siku ya Shukrani! Nashukuru kwa uwepo wako maishani mwetu. Uwe na baraka tele na amani moyoni."
    }
],
  'halloween': [
    {
        "en": "Happy Halloween! Wishing you a spooktacular night filled with sweet treats, fun costumes, and thrilling memories!",
        "ur": "ہیلووین مبارک! ڈھیر سارے لذیذ ٹریٹس، دلچسپ ملبوسات اور ہنسی مذاق سے بھری رات کی پرلطف تمنائیں۔",
        "ar": "هالوين سعيد وممتع! نتمنى لكم أمسية مرحة مليئة بالحلويات والأزياء المبهجة والذكريات الجميلة.",
        "es": "¡Feliz Halloween! Deseándote una noche fantástica llena de dulces deliciosos, disfraces geniales y mucha diversión.",
        "fr": "Joyeux Halloween ! Passez une soirée terrifiante et amusante, remplie de friandises et de rires !",
        "hi": "हैलोवीन की शुभकामनाएं! मीठे पकवानों, अनोखी वेशभूषा और मौज-मस्ती भरी रात का भरपूर आनंद लें!",
        "zh": "万圣节快乐！愿您度过一个充满奇装异服、欢歌笑语与无尽惊喜的奇妙之夜！",
        "pt": "Feliz Halloween! Desejando uma noite assustadoramente divertida com muitos doces e fantasias incríveis!",
        "ru": "С Хэллоуином! Желаем весело провести этот вечер, полный сладких угощений, крутых костюмов и ярких эмоций!",
        "de": "Fröhliches Halloween! Ich wünsche dir eine schaurig-schöne Nacht voller Süßigkeiten und jeder Menge Spaß!",
        "ja": "ハッピーハロウィン！美味しいお菓子とユニークな仮装で、最高にエキサイティングな夜をお過ごしください！",
        "ko": "해피 할로윈! 맛있는 캔디와 멋진 코스튬으로 가득한 신나고 특별한 밤이 되기를 바랍니다!",
        "it": "Buon Halloween! Ti auguro una serata paurosamente divertente tra dolcetti, maschere e tante risate!",
        "tr": "Cadılar Bayramınız Kutlu Olsun! Bol şekerli, eğlenceli kostümlü ve keyifli bir gece dilerim!",
        "id": "Selamat Halloween! Semoga malam ini penuh dengan keseruan, kostum keren, dan aneka manisan lezat!",
        "bn": "শুভ হ্যালোইন! মিষ্টি উপহার, মজার পোশাক আর আনন্দময় অনুভূতির দারুণ একটি রাত কাটুক আপনার!",
        "vi": "Halloween vui vẻ! Chúc bạn có một đêm lễ hội độc đáo với nhiều bánh kẹo và khoảnh khắc đáng nhớ!",
        "sw": "Heri ya Halloween! Uwe na usiku wa kusisimua uliojaa peremende, mavazi ya kipekee na furaha tele."
    }
],
  'easter': [
    {
        "en": "Happy Easter! May the miracle of Easter bring renewal, hope, and abundant joy to you and your family.",
        "ur": "ایسٹر مبارک! دعا ہے کہ ایسٹر کی بہار آپ کے گھرانے کے لیے نئی امید، زندگی اور دائمی خوشیوں کی نوید لائے۔",
        "ar": "فصح مجيد ومبارك! عسى أن يحمل عيد الفصح التجدد والأمل والبركات الوافرة لكم ولأسركم الكريمة.",
        "es": "¡Feliz Pascua de Resurrección! Que el milagro de la Pascua traiga renovación, esperanza y alegría a tu hogar.",
        "fr": "Joyeuses Pâques ! Que la grâce de Pâques apporte renouveau, espérance et paix dans votre foyer.",
        "hi": "ईस्टर की हार्दिक शुभकामनाएं! ईस्टर का यह पावन पर्व आपके जीवन में नई आशा, प्रेम और खुशियां लेकर आए।",
        "zh": "复活节快乐！愿复活节的神圣光辉为您和家人带来崭新的希望、平安与丰盛的喜悦！",
        "pt": "Feliz Páscoa! Que o milagre da Páscoa renove a esperança, a paz e a alegria em seu coração e em seu lar.",
        "ru": "Со Светлой Пасхой! Пусть этот святой день принесет в ваши сердца обновление, надежду, мир и чистую радость!",
        "de": "Frohe Ostern! Möge das Osterfest dir und deiner Familie neue Hoffnung, Erneuerung und Segen bringen.",
        "ja": "ハッピーイースター！復活祭の光が、あなたとご家族に新しい希望と豊かな喜びをもたらしますように。",
        "ko": "행복한 부활절을 기원합니다! 부활의 기쁨과 새로운 희망이 당신과 가정에 가득하길 소망합니다.",
        "it": "Buona Pasqua! Che il miracolo della Pasqua porti speranza rinnovata, serenità e gioia alla tua famiglia.",
        "tr": "Paskalya Bayramınız Kutlu Olsun! Bu kutsal gün evinize umut, yenilenme ve bol neşe getirsin.",
        "id": "Selamat Hari Paskah! Kiranya damai dan sukacita Paskah membawa pengharapan baru bagi Anda sekeluarga.",
        "bn": "শুভ ইস্টার! ইস্টারের পবিত্র আলো আপনার জীবনকে নতুন আশা, শান্তি ও আনন্দে উদ্ভাসিত করুক।",
        "vi": "Chúc mừng Lễ Phục Sinh! Cầu mong phép màu Phục Sinh đem lại sự đổi mới, hy vọng và niềm vui dồi dào.",
        "sw": "Heri ya Pasaka! Muujiza wa Pasaka ulete matumaini mapya, amani na furaha tele katika familia yako."
    }
],
  'diwali': [
    {
        "en": "Happy Diwali! May the festival of lights illuminate your life with health, wealth, prosperity, and endless joy.",
        "ur": "دیوالی مبارک! روشنیوں کا یہ خوبصورت تہوار آپ کی زندگی کو صحت، امن، خوشحالی اور کامیابیوں سے جگمگا دے۔",
        "ar": "عيد ديوالي سعيد! عسى أن يضيء مهرجان الأنوار حياتكم بالصحة والرخاء والبركة والبهجة الدائمة.",
        "es": "¡Feliz Diwali! Que el festival de las luces ilumine tu camino con prosperidad, salud y felicidad infinita.",
        "fr": "Joyeux Diwali ! Que la fête des lumières illumine votre existence de prospérité, de santé et de joie.",
        "hi": "दीपावली की हार्दिक शुभकामनाएं! दीपों का यह पावन पर्व आपके जीवन को सुख, समृद्धि, उत्तम स्वास्थ्य और खुशियों से रोशन करे।",
        "zh": "排灯节快乐！愿这璀璨的光明节照亮您的前程，赐予您健康、繁荣、富足与无尽的喜悦！",
        "pt": "Feliz Diwali! Que o festival das luzes ilumine sua jornada com muita saúde, fartura e alegria contagiante.",
        "ru": "С праздником Дивали! Пусть фестиваль огней озарит вашу жизнь здоровьем, благополучием и немеркнущим светом радости!",
        "de": "Fröhliches Diwali! Möge das Lichterfest dein Leben mit Gesundheit, Wohlstand und tiefer Freude erhellen.",
        "ja": "ディワリおめでとうございます！光の祭典があなたの人生を健康と繁栄、そして無限の幸福で照らしますように。",
        "ko": "디왈리 축제를 축하합니다! 찬란한 빛의 축제가 당신의 삶에 건강과 번영, 끝없는 기쁨을 비춰주기를 기원합니다.",
        "it": "Buon Diwali! Possa la festa delle luci illuminare la tua vita con salute, prosperità e grande serenità.",
        "tr": "Diwali Bayramınız Kutlu Olsun! Işıklar festivali hayatınızı sağlık, bereket ve daimi neşeyle aydınlatsın.",
        "id": "Selamat Hari Raya Diwali! Semoga festival cahaya menerangi langkah hidup Anda dengan kemakmuran dan kedamaian.",
        "bn": "শুভ দীপাবলি! আলোর এই উৎসব আপনার জীবনকে সুখ, সমৃদ্ধি, সুস্বাস্থ্য ও আনন্দে আলোকিত করে তুলুক।",
        "vi": "Chúc mừng Lễ hội Ánh sáng Diwali! Cầu chúc ánh sáng rực rỡ mang đến thịnh vượng, sức khỏe và niềm vui cho bạn.",
        "sw": "Heri ya Diwali! Tamasha la taa liangazie maisha yako kwa afya, ufanisi na furaha isiyo na kifani."
    }
],
  'hanukkah': [
    {
        "en": "Chag Urim Sameach! Happy Hanukkah! May the Menorah candles bring warmth, light, peace, and miracles to your home.",
        "ur": "ہنوکا مبارک! روشنیوں کے اس مقدس تہوار پر آپ کے گھر اور خاندان کے لیے امن، برکت اور خوشحالی کی دعا ہے۔",
        "ar": "عيد حانوكا سعيد! عسى أن تملأ شموع الحانوكا بيتكم بالدفء والسلام والنور والبركات المباركة.",
        "es": "¡Jag Janucá Sameaj! Que las luces de la Menorá traigan paz, milagros, amor y bendición a tu hogar.",
        "fr": "Joyeux Hanoucca ! Que les bougies de la Menorah illuminent votre foyer de paix, de chaleur et de miracles.",
        "hi": "हनुक्का की हार्दिक शुभकामनाएं! यह रोशनी का त्योहार आपके घर में शांति, सुख और चमत्कारिक आशीषें लेकर आए।",
        "zh": "光明节吉庆！愿光明节的烛光为您的家庭带来温馨、安宁、和平与奇迹般的美好祝福！",
        "pt": "Chag Hanukkah Sameach! Que as velas da Menorá tragam calor, paz, saúde e milagres para a sua família.",
        "ru": "Счастливой Хануки! Пусть свет меноры наполнит ваш дом теплом, миром, радостью и чудесными благословениями!",
        "de": "Chag Chanukka Sameach! Mögen die Lichter der Menora Frieden, Wärme und Wunder in dein Heim bringen.",
        "ja": "ハヌカーおめでとうございます！メノラーの温かい光が、ご家庭に平和と希望、そして奇跡をもたらしますように。",
        "ko": "하누카를 진심으로 축하합니다! 메노라의 촛불이 당신의 가정에 따스한 빛과 평화, 기적을 밝혀주길 바랍니다.",
        "it": "Chag Hanukkah Sameach! Possa la luce della Menorah portare calore, serenità e miracoli nella tua casa.",
        "tr": "Hanuka Bayramınız Kutlu Olsun! Menora ışıkları evinize huzur, bereket ve mucizeler taşısın.",
        "id": "Selamat Hari Raya Hanukkah! Semoga lilin Menorah membawa kehangatan, terang, dan damai di rumah Anda.",
        "bn": "শুভ হানুক্কা! আলোর এই দিনগুলি আপনার ঘরে উষ্ণতা, শান্তি ও বিস্ময়কর আনন্দ বয়ে আনুক।",
        "vi": "Chúc mừng Lễ Hanukkah! Cầu mong ngọn nến Menorah soi sáng mái ấm của bạn với sự bình an và phép màu tuyệt diệu.",
        "sw": "Heri ya Hanukkah! Mishumaa ya Menorah ilete joto, mwangaza na miujiza yenye amani nyumbani kwako."
    }
],
  'lunar-new-year': [
    {
        "en": "Happy Lunar New Year! Wishing you good fortune, robust health, blossoming wealth, and boundless joy in this new spring!",
        "ur": "قمری نیا سال مبارک! بہار کے اس نئے سال میں آپ کے لیے صحت، خوشحالی، برکت اور شاندار کامیابیوں کی تمنا ہے۔",
        "ar": "سنة قمرية جديدة سعيدة! نتمنى لكم وافر الصحة والخير والازدهار والرخاء مع إطلالة هذا الربيع الجميل.",
        "es": "¡Feliz Año Nuevo Lunar! Te deseo abundancia, excelente salud, prosperidad y felicidad infinita en esta nueva primavera.",
        "fr": "Joyeux Nouvel An Lunaire ! Que ce nouveau printemps vous comble de santé, de prospérité, de chance et de bonheur !",
        "hi": "चंद्र नव वर्ष की हार्दिक शुभकामनाएं! यह नया साल आपके जीवन में उत्तम स्वास्थ्य, धन, समृद्धि और अपार खुशियां लेकर आए।",
        "zh": "恭贺新禧，新春大吉！祝您在崭新的一年里龙马精神、身体健康、吉星高照、富贵吉祥、阖家幸福！",
        "pt": "Feliz Ano Novo Lunar! Desejando muita fortuna, saúde de ferro, prosperidade e harmonia nesta nova primavera.",
        "ru": "С Лунным Новым Годом! Желаем крепкого здоровья, процветания, удачи во всех делах и семейного благополучия!",
        "de": "Frohes Mondneujahr! Ich wünsche dir Glück, beste Gesundheit, wachsenden Wohlstand und Freude im neuen Frühling.",
        "ja": "旧正月おめでとうございます！新春を迎え、皆様のご健康とご多幸、そして更なる飛躍を心よりお祈り申し上げます。",
        "ko": "새해 복 많이 받으세요! 음력 설을 맞아 건강과 번영, 온갖 길운이 가득하시기를 진심으로 축원합니다.",
        "it": "Buon Capodanno Lunare! Ti auguro grande fortuna, ottima salute, prosperità e tanta felicità in questa primavera.",
        "tr": "Ay Yeni Yılınız Kutlu Olsun! Yeni baharla birlikte sağlık, bereket, şans ve daimi neşe sizinle olsun.",
        "id": "Selamat Tahun Baru Imlek! Semoga tahun baru ini membawa keberuntungan, kesehatan prima, dan rezeki berlimpah.",
        "bn": "শুভ চান্দ্র নববর্ষ! নতুন বসন্তে আপনার জীবনে প্রাচুর্য, সুস্বাস্থ্য এবং অবিরাম আনন্দ বর্ষিত হোক।",
        "vi": "Chúc Mừng Năm Mới Âm Lịch! Chúc bạn và gia đình an khang thịnh vượng, vạn sự như ý và tài lộc dồi dào.",
        "sw": "Heri ya Mwaka Mpya wa Lunar! Nakutakia afya thabiti, mafanikio tele na furaha tele katika majira haya mapya."
    }
],
  'st-patricks-day': [
    {
        "en": "Happy St. Patrick's Day! May luck be your companion, peace hold your hand, and laughter fill your days with cheer!",
        "ur": "سینٹ پیٹرک ڈے مبارک! دعا ہے کہ خوش قسمتی آپ کا ساتھ دے اور ہر دن خوشیوں اور مسکراہٹوں سے معمور ہو۔",
        "ar": "عيد القديس باتريك سعيد! جعل الله التوفيق حليفكم والسلام رفيقكم والبهجة تملأ أوقاتكم بكل خير.",
        "es": "¡Feliz Día de San Patricio! Que la buena suerte te acompañe, la paz reine en tu hogar y la alegría colme tu vida.",
        "fr": "Joyeuse Saint-Patrick ! Que la chance vous sourie, que la paix vous accompagne et que la joie illumine vos journées !",
        "hi": "सेंट पैट्रिक दिवस की शुभकामनाएं! सौभाग्य सदा आपके साथ रहे और आपका जीवन खुशियों से महकता रहे।",
        "zh": "圣帕特里克节快乐！愿好运常伴左右，愿和平常驻心间，愿欢歌笑语洋溢在每一个明媚的日子里！",
        "pt": "Feliz Dia de São Patrício! Que a boa sorte seja sua companheira constante e seu coração viva em festa!",
        "ru": "С Днем Святого Патрика! Пусть удача сопутствует во всем, а жизнь будет наполнена смехом, теплом и добром!",
        "de": "Fröhlichen St. Patrick's Day! Möge das Glück dein ständiger Begleiter sein und Freude deine Tage erfüllen.",
        "ja": "セント・パトリックス・デーおめでとうございます！幸運の四つ葉のクローバーが、あなたにたくさんの笑顔を運びますように。",
        "ko": "세인트 패트릭 데이를 축하합니다! 행운이 언제나 함께하고 평화와 웃음이 가득한 날들이 되시길 바랍니다.",
        "it": "Buon San Patrizio! Che la fortuna sia la tua compagna fedele e che la gioia riempia ogni tuo giorno.",
        "tr": "St. Patrick Gününüz Kutlu Olsun! Şans her an yanınızda, neşe ve huzur hayatınızın ayrılmaz parçası olsun.",
        "id": "Selamat Hari St. Patrick! Semoga keberuntungan selalu menyertai dan keceriaan memenuhi hari-hari Anda.",
        "bn": "সেন্ট প্যাট্রিক দিবসের শুভেচ্ছা! সৌভাগ্য সদা আপনার সাথী হোক এবং জীবনে আনন্দ উপচে পড়ুক।",
        "vi": "Chúc mừng Ngày Thánh Patrick! Chúc may mắn luôn mỉm cười và niềm vui luôn tràn ngập trong cuộc sống của bạn.",
        "sw": "Heri ya Siku ya Mtakatifu Patrick! Bahati njema iwe nawe na amani itawale maishani mwako daima."
    }
],
  'earth-day': [
    {
        "en": "Happy Earth Day! Let us cherish, nurture, and protect our beautiful green planet together for generations to come.",
        "ur": "یومِ ارض مبارک! آئیے مل کر اپنی اس خوبصورت زمین کی حفاظت، دیکھ بھال اور قدردانی کا عزم کریں۔",
        "ar": "يوم أرض مبارك! فلنحافظ على كوكبنا الجميل ونرعاه معاً ليبقى آمناً ومزدهراً للأجيال القادمة.",
        "es": "¡Feliz Día de la Tierra! Valoremos, cuidemos y protejamos nuestro hermoso planeta verde para las futuras generaciones.",
        "fr": "Joyeuse Journée de la Terre ! Chérissons et préservons ensemble notre magnifique planète pour les générations futures.",
        "hi": "पृथ्वी दिवस की हार्दिक शुभकामनाएं! आइए मिलकर अपनी इस हरी-भरी सुंदर धरती की रक्षा और संवर्धन का संकल्प लें।",
        "zh": "世界地球日快乐！让我们携起手来，悉心呵护并珍惜我们这颗美丽的绿色星球，造福子孙后代！",
        "pt": "Feliz Dia da Terra! Vamos valorizar, nutrir e proteger o nosso belo planeta para as gerações futuras.",
        "ru": "С Днем Земли! Давайте вместе беречь, лелеять и защищать нашу прекрасную планету для будущих поколений!",
        "de": "Alles Gute zum Tag der Erde! Lasst uns unseren wunderbaren grünen Planeten gemeinsam schützen und bewahren.",
        "ja": "アースデイ（地球の日）おめでとうございます！かけがえのない美しい地球を、未来のために共に守り育てましょう。",
        "ko": "지구의 날을 축하합니다! 아름다운 지구를 아끼고 보호하여 미래 세대에 건강하게 물려줄 수 있기를 다짐합니다.",
        "it": "Buona Giornata della Terra! Custodiamo, proteggiamo e amiamo il nostro splendido pianeta per il futuro di tutti.",
        "tr": "Dünya Günü Kutlu Olsun! Gelecek nesiller için güzel yeşil gezegenimizi el ele verip koruyalım.",
        "id": "Selamat Hari Bumi! Mari bersama-sama merawat dan menjaga kelestarian bumi tercinta untuk generasi masa depan.",
        "bn": "বিশ্ব ধরিত্রী দিবসের শুভেচ্ছা! আসুন একসাথে আমাদের সুন্দর এই সবুজ পৃথিবীর যত্ন নিই ও একে রক্ষা করি।",
        "vi": "Chúc mừng Ngày Trái Đất! Hãy cùng nhau nâng niu và bảo vệ hành tinh xanh tươi đẹp của chúng ta cho muôn đời sau.",
        "sw": "Heri ya Siku ya Dunia! Tushirikiane pamoja kuitunza na kuilinda sayari yetu nzuri kwa vizazi vijavyo."
    }
],
  'phd-defense': [
    {
        "en": "Congratulations Dr.! Your successful PhD defense is a historic triumph of intellect, endurance, and vision. So immensely proud of your academic excellence!",
        "ur": "ڈاکٹریٹ و پی ایچ ڈی مبارک، ڈاکٹر صاحب! آپ کی انتھک سائنسی تحقیق اور شاندار کامیابی قابلِ فخر ہے۔ اللہ پاک علم کے اس سفر کو مزید برکت عطا فرمائے۔ آمین۔",
        "ar": "ألف مبارك مناقشة الدكتوراه بنجاح دكتورنا العزيز! إنجاز أكاديمي عظيم يتوج سنوات الصبر والاجتهاد العلمي الرفيع.",
        "es": "¡Felicitaciones Doctor/a! La defensa exitosa de tu doctorado es un triunfo histórico de brillantez y perseverancia. ¡Qué gran orgullo!",
        "fr": "Toutes nos félicitations Docteur ! Votre brillante soutenance de thèse est l'aboutissement d'années de rigueur et d'excellence. Immense fierté !",
        "hi": "डॉक्टरेट व पीएचडी की शानदार सफलता पर हार्दिक बधाई डॉक्टर साहिब! आपकी वर्षों की कठिन तपस्या ने आज सर्वोच्च सम्मान पाया है।",
        "zh": "热烈祝贺博士答辩圆满成功，博士阁下！这是智慧、毅力与学术追求的历史性巅峰荣耀，实至名归，为您感到由衷自豪！",
        "pt": "Parabéns, Doutor/a! A defesa da sua tese de doutorado é uma conquista acadêmica magnífica fruto de anos de dedicação. Muito orgulho!",
        "ru": "Поздравляем с успешной защитой докторской диссертации, Доктор! Это выдающаяся победа ума, упорства и научной мысли. Гордимся вами!",
        "de": "Herzlichen Glückwunsch, Herr/Frau Doktor! Deine erfolgreiche Promotion ist ein triumphaler Meilenstein harter akademischer Arbeit. Enorm stolz!",
        "ja": "博士号取得・論文審査の合格、誠におめでとうございます！長年の研究への情熱と弛まぬ努力が結実した最高峰の栄誉です。",
        "ko": "박사 학위 취득 및 디펜스 통과를 진심으로 축하드립니다, 박사님! 학문적 열정과 인내가 빚어낸 최고의 성취에 큰 박수를 보냅니다.",
        "it": "Congratulazioni Dottore/Dottoressa! Il successo della tua tesi di dottorato è il trionfo dell'ingegno e della perseveranza. Orgogliosissimi!",
        "tr": "Tebrikler Sayın Doktor! Doktora tez savunmandaki büyük başarın, yılların emeğinin taçlanmasıdır. Seninle gurur duyuyoruz!",
        "id": "Selamat atas gelar Doktor yang diraih! Ujian disertasi PhD Anda adalah bukti kecemerlangan intelektual dan ketekunan luar biasa. Sangat bangga!",
        "bn": "পিএইচডি ডিগ্রি অর্জনে প্রাণঢালা অভিনন্দন, ডক্টর সাহেব! আপনার মেধা, নিষ্ঠা ও গবেষণার এক ঐতিহাসিক বিজয়। আমরা গর্বিত!",
        "vi": "Chúc mừng tân Tiến sĩ! Bảo vệ thành công luận án tiến sĩ là minh chứng sáng ngời cho trí tuệ và sự kiên trì phi thường của bạn!",
        "sw": "Hongera sana Daktari! Kuhitimu kwa shahada ya Uzamivu (PhD) ni ushindi mkubwa wa kielimu na bidii ya miaka mingi. Tunajivunia wewe!"
    }
],
  'driving-license': [
    {
        "en": "Congratulations on passing your driving test! The roads are officially yours. Wishing you safe travels, scenic adventures, and smooth rides!",
        "ur": "ڈرائیونگ لائسنس پاس کرنے پر بہت بہت مبارک ہو! گاڑی اب آپ کی مٹھی میں ہے۔ دعا ہے کہ آپ کا ہر سفر محفوظ، پرسکون اور خوشگوار ہو۔",
        "ar": "مبارك اجتياز اختبار القيادة والحصول على الرخصة! الطريق مفتوح أمامك، نتمنى لك رحلات آمنة وسلسة مليئة بالتوفيق والسلامة.",
        "es": "¡Felicitaciones por aprobar tu examen de conducir! Las carreteras son oficialmente tuyas. ¡Deseándote viajes seguros y maravillosas aventuras!",
        "fr": "Félicitations pour votre permis de conduire ! La route vous appartient. Nous vous souhaitons des trajets en toute sécurité et de superbes aventures !",
        "hi": "ड्राइविंग टेस्ट पास करने और लाइसेंस मिलने पर बहुत-बहुत बधाई! हर सफर सुरक्षित और खुशियों से भरा रहे।",
        "zh": "恭喜顺利通过驾照考核！从此天高路广，持证上路。祝您一路顺风、行车平安、畅行无阻！",
        "pt": "Parabéns por passar no teste de motorista! As estradas são suas agora. Desejo a você viagens seguras e passeios incríveis!",
        "ru": "Поздравляем со сдачей на права! Дороги официально открыты для тебя. Желаем безопасной езды, зеленого света и легких путей!",
        "de": "Herzlichen Glückwunsch zur bestandenen Führerscheinprüfung! Die Straßen gehören dir. Allzeit sichere und gute Fahrt!",
        "ja": "運転免許の合格おめでとうございます！安全運転で、自由で快適な素晴らしいドライブをたくさん楽しんでくださいね！",
        "ko": "운전면허 취득을 진심으로 축하합니다! 이제 직접 운전대를 잡고 달릴 시간입니다. 언제나 안전운전하시고 즐거운 드라이브 되세요!",
        "it": "Congratulazioni per aver superato l'esame di guida! Ti auguro viaggi meravigliosi, massima sicurezza e strade sempre libere!",
        "tr": "Ehliyet sınavını geçmeni yürekten tebrik ederim! Yollar artık seni bekliyor. Kazasız, belasız ve keyifli sürüşler dilerim!",
        "id": "Selamat atas kelulusan ujian mengemudi dan mendapatkan SIM! Semoga setiap perjalanan Anda selalu aman, lancar, dan menyenangkan!",
        "bn": "ড্রাইভিং লাইসেন্স পরীক্ষায় উত্তীর্ণ হওয়ায় অনেক অভিনন্দন! নিরাপদে গাড়ি চালান এবং আপনার প্রতিটি সফর শুভ হোক।",
        "vi": "Chúc mừng bạn đã xuất sắc thi đỗ bằng lái xe! Chúc bạn vạn dặm bình an, lái xe an toàn và khám phá những chân trời mới!",
        "sw": "Hongera kwa kufaulu mtihani wa udereva na kupata leseni! Nakutakia safari salama na zenye baraka popote uendapo!"
    }
],
  'sports-trophy': [
    {
        "en": "Victory Trophy Mubarak! True champions rise through discipline and heart. What an extraordinary performance on the field. Keep conquering!",
        "ur": "شاندار فتح اور ٹرافی جیتنا مبارک ہو! میدان میں آپ کی بے مثال کارکردگی نے دل جیت لیے۔ اللہ پاک آپ کو کھیلوں میں مزید بلندیاں عطا فرمائے۔",
        "ar": "مبارك كأس البطولة والانتصار المستحق! أداء بطولي وعزيمة فولاذية في الملعب. هنيئاً لك هذا التتويج الباهر والمجد الرياضي!",
        "es": "¡Felicitaciones por el trofeo y la victoria! El verdadero campeón se forja con disciplina y pasión. ¡Qué actuación tan sobresaliente!",
        "fr": "Félicitations pour ce trophée et cette magnifique victoire ! Une prestation de haut vol sur le terrain digne d'un véritable champion !",
        "hi": "शानदार खिताबी जीत और ट्रॉफी पर बधाई! खेल के मैदान पर आपका यह जबर्दस्त प्रदर्शन हम सभी का सिर गर्व से ऊंचा करता है।",
        "zh": "热烈祝贺勇夺冠军奖杯！坚韧拼搏、技压群雄，展现了真正的王者风范。向赛场英雄致敬，再创辉煌！",
        "pt": "Parabéns pelo troféu e pela vitória espetacular! Um verdadeiro campeão se faz com garra e coração. Continue brilhando!",
        "ru": "Поздравляем с завоеванием чемпионского кубка! Потрясающее выступление на поле и заслуженная победа. Только вперед, к новым вершинам!",
        "de": "Herzlichen Glückwunsch zum Meisterpokal! Was für ein überragender Triumph und Teamgeist auf dem Platz. Weiter so, Champion!",
        "ja": "優勝トロフィーの獲得、おめでとうございます！日々の鍛錬と不屈の闘志が実を結んだ素晴らしい勝利です。次のステージも応援しています！",
        "ko": "우승 트로피 차지를 진심으로 축하합니다! 그라운드에서 보여준 압도적인 기량과 투혼은 최고였습니다. 챔피언의 앞날을 응원합니다!",
        "it": "Congratulazioni per il trofeo e la splendida vittoria! Una prestazione da vero fuoriclasse sul campo. Continua a vincere!",
        "tr": "Şampiyonluk kupasını tebrik ederim! Sahada gösterdiğin azim ve muazzam performansla gerçek bir şampiyonsun. Başarıların daim olsun!",
        "id": "Selamat atas perolehan piala dan kemenangan spektakuler! Kerja keras dan semangat juang di lapangan telah terbukti nyata. Juara sejati!",
        "bn": "টুর্নামেন্টে অসাধারণ জয় ও চ্যাম্পিয়ন ট্রফি জয়ে প্রাণঢালা অভিনন্দন! আপনার দুর্দান্ত নৈপুণ্য আমাদের গর্বিত করেছে।",
        "vi": "Chúc mừng chiếc cúp vô địch danh giá! Phong độ thi đấu quả cảm và đẳng cấp đã mang lại chiến thắng vang dội. Mãi là nhà vô địch!",
        "sw": "Hongera kwa kutwaa kombe la ushindi! Mchezo wako uwanjani ulikuwa wa kiwango cha juu sana. Endelea kuwika bingwa!"
    }
],
  'visa-approved': [
    {
        "en": "Visa Approved Mubarak! Your international journey is officially unlocked. Pack your bags and embark on this thrilling adventure to new horizons!",
        "ur": "ویزا منظوری مبارک ہو! نئے سفر اور روشن مستقبل کے دروازے کھل گئے۔ اللہ پاک آپ کے اس بین الاقوامی سفر کو آسان، کامیاب اور بابرکت بنائے۔ آمین۔",
        "ar": "مبارك صدور التأشيرة والموافقة الرسمية! فُتحت أمامك آفاق دولية جديدة، نتمنى لك رحلة موفقة وتوفيقاً باهراً في وجهتك القادمة.",
        "es": "¡Felicitaciones por la visa aprobada! Tu viaje internacional está oficialmente desbloqueado. ¡Prepara tus maletas y disfruta este gran sueño!",
        "fr": "Félicitations pour l'obtention de votre visa ! Les portes du monde s'ouvrent à vous. Préparez vos bagages pour cette formidable aventure !",
        "hi": "वीजा मंजूर होने पर बहुत-बहुत बधाई! आपके सपनों की अंतर्राष्ट्रीय उड़ान का रास्ता साफ हो गया है। आपकी नई यात्रा बेहद सफल और सुखद रहे।",
        "zh": "热烈祝贺签证顺利获批！通往全球广阔天地的大门已然敞开。收拾行囊，开启奔赴锦绣前程的崭新旅程吧！",
        "pt": "Parabéns pelo visto aprovado! O seu passaporte para novos horizontes está carimbado. Prepare as malas e aproveite cada segundo dessa jornada!",
        "ru": "Поздравляем с одобрением визы! Дорога к новым международным горизонтам открыта. Собирай чемоданы и лети навстречу мечте!",
        "de": "Herzlichen Glückwunsch zum genehmigten Visum! Dein Weg in die Welt steht nun offen. Pack deine Koffer für dieses aufregende Abenteuer!",
        "ja": "ビザ発給・承認、誠におめでとうございます！世界への新たな扉が開かれました。素晴らしい旅立ちと未来の成功をお祈りします！",
        "ko": "비자 승인을 진심으로 축하합니다! 새로운 세상을 향한 문이 활짝 열렸습니다. 설레는 마음으로 짐을 꾸리고 멋진 도전을 시작하세요!",
        "it": "Congratulazioni per il visto approvato! Il tuo viaggio verso nuovi orizzonti è realtà. Prepara le valigie per questa splendida avventura!",
        "tr": "Vize onayını yürekten tebrik ederim! Yepyeni ufuklara yelken açma vakti geldi. Yolculuğun hayırlı, başarıların sonsuz olsun!",
        "id": "Selamat atas persetujuan visa Anda! Pintu menuju petualangan dan masa depan internasional telah terbuka. Selamat berkemas dan sukses selalu!",
        "bn": "ভিসা অনুমোদনে আন্তরিক অভিনন্দন! আপনার স্বপ্নের আন্তর্জাতিক যাত্রার পথ সুগম হলো। নতুন দেশে আপনার জীবন সুখ ও সফলতায় ভরে উঠুক।",
        "vi": "Chúc mừng visa của bạn đã được phê duyệt! Cánh cửa bước ra thế giới đã mở rộng. Hãy chuẩn bị hành lý cho chuyến phiêu lưu tuyệt vời này!",
        "sw": "Hongera sana kwa kupata visa! Milango ya safari yako ya kimataifa imefunguliwa rasmi. Funga mizigo na ufurahie safari yenye mafanikio!"
    }
],
  'baby-shower': [
    {
        "en": "Happy Baby Shower! Celebrating the upcoming arrival of your precious bundle of joy. Wishing the family boundless love, health, and sweet blessings!",
        "ur": "بیبی شاور مبارک! نئے ننھے مہمان کی آمد پر آپ کے پورے گھرانے کو دلی مبارکباد۔ اللہ ماں اور بچے دونوں کو صحت کاملہ عطا فرمائے۔",
        "ar": "مبارك حفل استقبال المولود! نحتفل معكم بقرب وصول هذه الهدية الغالية، نسأل الله للوالدة والمولود دوام الصحة والسلامة والسرور.",
        "es": "¡Feliz Baby Shower! Celebrando la pronta llegada de este hermoso angelito. ¡Deseándoles a la familia amor, salud y bendiciones!",
        "fr": "Joyeuse Baby Shower ! Célébrons l'arrivée prochaine de ce précieux trésor. Plein d'amour, de santé et de douceur pour toute la famille !",
        "hi": "गोद भराई / बेबी शॉवर की हार्दिक शुभकामनाएं! आने वाले नन्हे मेहमान के स्वागत की खुशी में पूरा परिवार खुशियों और स्वास्थ्य से परिपूर्ण रहे।",
        "zh": "迎婴派对圆满吉庆！欢喜迎接即将降临的天使小宝贝。祝愿准妈妈与宝宝平安康健，全家充满爱与温暖！",
        "pt": "Feliz Chá de Bebê! Celebrando a chegada iminente do seu bem mais precioso. Muita saúde, carinho e bênçãos para toda a família!",
        "ru": "С праздником Бэби Шауэр! С нетерпением ждем скорого появления на свет вашего драгоценного чуда. Здоровья и любви вашей семье!",
        "de": "Alles Gute zur Babyparty! Wir freuen uns riesig auf euer kleines Wunder. Möge die Familie mit Gesundheit und Liebe gesegnet sein!",
        "ja": "ベビーシャワーおめでとうございます！待ち遠しい新しい命の誕生を心から祝福し、母子の健康とご家族の幸せをお祈りします。",
        "ko": "베이비 샤워를 축하합니다! 곧 찾아올 소중한 천사를 맞이하며, 산모의 건강과 가정에 넘치는 축복이 가득하길 기원합니다.",
        "it": "Buon Baby Shower! Festeggiamo insieme il dolce arrivo del vostro piccolo tesoro. Tanta salute, amore e gioia a tutta la famiglia!",
        "tr": "Baby Shower kutlu olsun! Yakında aramıza katılacak minik mucizeyi heyecanla bekliyor, anneye ve bebeğe sağlık ve mutluluk diliyoruz!",
        "id": "Selamat Baby Shower! Menyambut kehadiran buah hati yang sangat dinanti. Semoga ibu dan si kecil selalu sehat serta diberkahi kebahagiaan!",
        "bn": "বেবি শাওয়ারের শুভেচ্ছা! অনাগত ছোট্ট সোনামণির আগমনে পরিবারে সুখ, সুস্বাস্থ্য ও অফুরন্ত ভালোবাসা ছড়িয়ে পড়ুক।",
        "vi": "Chúc mừng tiệc đón em bé Baby Shower! Cùng chờ đón thiên thần nhỏ đáng yêu. Chúc mẹ tròn con vuông và gia đình luôn ngập tràn yêu thương!",
        "sw": "Hongera kwa Baby Shower! Tunasherehekea ujio wa mtoto wenu mpendwa. Mungu aibariki familia kwa afya na upendo tele!"
    }
],
  'baat-pakki': [
    {
        "en": "Baat Pakki Mubarak! Two hearts and two families uniting in love and blessings. May this beautiful beginning blossom into lifelong happiness!",
        "ur": "بات پکی مبارک ہو! دو خاندانوں کے اس بابرکت ملاپ پر دل کی گہرائیوں سے مبارکباد۔ اللہ تعالیٰ اس رشتے کو محبت اور خیر کا گہوارہ بنائے۔ آمین۔",
        "ar": "مبارك الخطوبة الرسمية وتمام الاتفاق المبارك! جمع الله بين قلبيكما في خير وأتمم فرحتكم على أتم وجه وأسعد حال.",
        "es": "¡Felicitaciones por el compromiso formal (Baat Pakki)! Dos almas y familias unidas con amor. ¡Que este inicio florezca en felicidad eterna!",
        "fr": "Félicitations pour vos fiançailles officielles ! L'union de deux cœurs et de deux familles. Que cette belle alliance soit source de bonheur infini !",
        "hi": "बात पक्की / सगाई की बहुत-बहुत बधाई! दो दिलों और परिवारों का यह सुंदर मिलन सदा प्रेम, विश्वास और खुशियों से महकता रहे।",
        "zh": "订婚吉庆，喜结良缘！两心相印、两家结好。愿这份美好良缘化作一生的相知相伴与甜美幸福！",
        "pt": "Parabéns pelo noivado formal! Duas almas e duas famílias unidas em amor e respeito. Que esta união floresça em eterna felicidade!",
        "ru": "Поздравляем с помолвкой и официальным союзом! Союз двух сердец и семей. Пусть это прекрасное начало приведет к вечному счастью!",
        "de": "Herzlichen Glückwunsch zur offiziellen Verlobung! Zwei Herzen und Familien vereint in Liebe. Möge dieser Bund für immer blühen!",
        "ja": "ご婚約・結納、誠におめでとうございます！二つの心とご両家が結ばれた素晴らしい門出を祝い、末永いお幸せをお祈りいたします。",
        "ko": "약혼과 혼담 성사를 진심으로 축하합니다! 두 마음과 두 가정이 하나로 맺어지는 이 아름다운 시작이 영원한 행복으로 이어지길 바랍니다.",
        "it": "Congratulazioni per il fidanzamento ufficiale! Due cuori e due famiglie uniti nell'amore. Che questo legame duri per tutta la vita!",
        "tr": "Söz / Nişanınız Hayırlı Olsun! İki kalbin ve ailenin sevgiyle birleştiği bu güzel başlangıç ömür boyu mutluluk getirsin!",
        "id": "Selamat atas pertunangan dan ikatan keluarga yang bahagia! Semoga langkah awal yang indah ini berbuah kebahagiaan abadi hingga pelaminan!",
        "bn": "পাকা কথা ও বাগদানে আন্তরিক শুভেচ্ছা! দুটি হৃদয় ও দুটি পরিবারের সুন্দর বন্ধন সারা জীবন প্রেম ও শান্তিতে ভরিয়ে রাখুক।",
        "vi": "Chúc mừng lễ đính hôn và giao ước gắn kết! Hai trái tim và hai gia đình cùng chung vui. Chúc cho tình yêu này đơm hoa kết trái viên mãn!",
        "sw": "Hongera kwa posa na mapatano rasmi! Mioyo miwili na familia mbili zikiungana kwa upendo. Mwanzo huu ulete furaha ya maisha yote!"
    }
],
  'housewarming-blessings': [
    {
        "en": "Housewarming Mubarak! May your new abode be filled with the warmth of love, divine barakah, joyful laughter, and cherished memories!",
        "ur": "نیا گھر مبارک ہو! اللہ پاک آپ کے اس نئے مسکن کو رحمتوں، برکتوں، امن اور دائمی خوشیوں کا گہوارہ بنائے۔ آمین۔",
        "ar": "منزل مبارك وعامر بذكر الله! نسأل الله أن يجعله دار أمان ورزق وسلام وبركة لكم ولجميع أفراد أسرتكم.",
        "es": "¡Felicidades por tu nuevo hogar! Que esté lleno de risas cálidas, bendiciones celestiales y momentos inolvidables.",
        "fr": "Félicitations pour votre nouvelle maison ! Que ce foyer soit béni de paix, de joie, d'amour et de doux souvenirs partagés.",
        "hi": "गृह प्रवेश की हार्दिक शुभकामनाएं! आपका यह नया घर सुख, शांति, समृद्धि, आपसी प्रेम और खुशियों का धाम बने।",
        "zh": "乔迁新居大吉！愿您的新宅充满欢声笑语、阖家安康、福泽深厚、紫气东来！",
        "pt": "Parabéns pela casa nova! Que o seu novo lar seja repleto de amor, serenidade, gargalhadas e memórias inesquecíveis.",
        "ru": "С новосельем! Пусть ваш новый дом будет крепостью любви, мира, достатка и душевного спокойствия!",
        "de": "Herzlichen Glückwunsch zum neuen Heim! Möge dieses Haus voller Wärme, Segen, Lachen und wunderschöner Erinnerungen sein.",
        "ja": "新築・新居へのお引越し、おめでとうございます！新しいお住まいにたくさんの笑顔と安らぎ、そして幸運が満ちますように。",
        "ko": "새 보금자리 입주를 진심으로 축하합니다! 새 집에서 가족 모두 건강하시고 사랑과 웃음이 가 끊이지 않기를 기원합니다.",
        "it": "Buona nuova casa! Possa la tua nuova dimora essere colma di calore, amore, risate felici e dolci ricordi.",
        "tr": "Yeni eviniz kutlu olsun! Yeni yuvanızdan huzur, sağlık, bereket ve neşe hiç eksik olmasın.",
        "id": "Selamat menempati rumah baru! Semoga rumah ini selalu dinaungi berkah, kedamaian, dan kenangan indah bersama keluarga.",
        "bn": "নতুন গৃহে প্রবেশের আন্তরিক শুভেচ্ছা! আপনার এই নতুন বাড়ি সুখ, শান্তি, সমৃদ্ধি ও ভালোবাসার নিরাপদ আশ্রয় হোক।",
        "vi": "Chúc mừng tân gia! Cầu mong tổ ấm mới của bạn luôn tràn ngập tiếng cười, sự ấm áp và tài lộc dồi dào.",
        "sw": "Hongera kwa makazi mapya! Nyumba yenu mpya ijazwe na upendo, amani, vicheko na kumbukumbu nzuri daima."
    }
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
  const tmpls = getTemplates(occasionId)
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

export function isTemplateMessage(text: string | undefined): boolean {
  if (!text) return false
  const trimmed = text.trim()
  if (!trimmed) return false
  for (const list of Object.values(MESSAGE_TEMPLATES)) {
    for (const tmpl of list) {
      for (const val of Object.values(tmpl)) {
        if (typeof val === 'string' && val.trim() === trimmed) return true
      }
    }
  }
  for (const tmpl of GENERIC_TEMPLATES) {
    for (const val of Object.values(tmpl)) {
      if (typeof val === 'string' && val.trim() === trimmed) return true
    }
  }
  return false
}

export function getTemplates(occasionId: string | undefined): MessageTemplate[] {
  if (!occasionId) return GENERIC_TEMPLATES
  const clean = occasionId.toLowerCase()
  if (clean === 'sympathy' || clean === 'condolence' || clean.includes('sympathy') || clean.includes('condolence') || clean.includes('majlis') || clean.includes('taazia') || clean.includes('chelum')) {
    return MESSAGE_TEMPLATES['sympathy'] ?? GENERIC_TEMPLATES
  }
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
