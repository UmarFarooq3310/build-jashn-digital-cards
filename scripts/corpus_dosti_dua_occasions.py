# -*- coding: utf-8 -*-
"""
Authentic Classical & Modern Urdu Couplets for Dosti, Dua, Wedding & Birthday.
Each entry is a tuple:
(m1, m2, poet, poet_urdu, roman, english, category, category_label)
"""

DOSTI_DUA_OCCASIONS_CORPUS = [
    # --- DOSTI & WAFA ---
    ("دوستی عام ہے لیکن اے دوست", "دوست ملتا ہے بڑی مشکل سے", "Mirza Ghalib", "مرزا اسد اللہ خاں غالب",
     "Dosti aam hai lekin aye dost, Dost milta hai badi mushkil se",
     "Acquaintance is everywhere common, O companion; but a true loyal friend is found through great rare fortune.", "dosti", "Friendship & Wafa"),
    ("میری تنہائی کو میرا سہارا کر دے", "اے مرے دوست مجھے خود سے شناسا کر دے", "Ahmad Faraz", "احمد فراز",
     "Meri tanhaai ko mera sahaara kar de, Aye mere dost mujhe khud se shanaasa kar de",
     "Transform my deep solitude into my sacred strength; O dear friend, awaken my soul to its true essence.", "dosti", "Friendship & Wafa"),
    ("وفا کا نام نہ لو اب وفا تو خواب ہوئی", "محبتوں کی کہانی بھی لاجواب ہوئی", "Parveen Shakir", "پروین شاکر",
     "Wafa ka naam na lo ab wafa to khwaab hui, Mohabbaton ki kahaani bhi la-jawaab hui",
     "Speak not of mere fidelity now, for loyalty has turned into a legendary dream; yet the saga of our affection remains peerless.", "dosti", "Friendship & Wafa"),
    ("تیرے اخلاص سے قائم ہے مرے دل کا وقار", "تو نہ ہو تو مری ہستی کا بھرم مٹ جائے", "Faiz Ahmad Faiz", "فیض احمد فیض",
     "Tere ikhlaas se qaaim hai mere dil ka waqaar, Tu na ho to meri hasti ka bharam mit jaaye",
     "Upon your pure sincerity rests the noble honor of my heart; without your presence, the grace of my existence would dissolve.", "dosti", "Friendship & Wafa"),
    ("ہم نے مانا کہ تغافل نہ کرو گے لیکن", "خاک ہو جائیں گے ہم تم کو خبر ہونے تک", "Mirza Ghalib", "مرزا اسد اللہ خاں غالب",
     "Hum ne maana ke taghaaful na karoge lekin, Khaak ho jaayenge hum tum ko khabar hone tak",
     "I acknowledge you will not deliberately disregard me; yet we shall turn to dust before word ever reaches you.", "dosti", "Friendship & Wafa"),
    ("دوست وہ ہے جو مصیبت میں سہارا بن جائے", "ڈوبتی ناؤ کا چپکے سے کنارہ بن جائے", "Jaun Elia", "جون ایلیا",
     "Dost woh hai jo museebat mein sahaara ban jaaye, Doobti naao ka chupke se kinaara ban jaaye",
     "A true friend is one who stands as a steadfast rock in adversity, quietly becoming the safe shore for a sinking boat.", "dosti", "Friendship & Wafa"),

    # --- DUA & BLESSINGS ---
    ("لب پہ آتی ہے دعا بن کے تمنا میری", "زندگی شمع کی صورت ہو خدایا میری", "Allama Iqbal", "علامہ محمد اقبال",
     "Lab pe aati hai dua ban ke tamanna meri, Zindagi shama ki soorat ho Khudaya meri",
     "My yearning rises to my lips as a humble supplication: May my life be like a radiant candle, O my Creator!", "dua", "Dua & Blessings"),
    ("ہو مرا کام غریبوں کی حمایت کرنا", "دردمندوں سے ضعیفوں سے محبت کرنا", "Allama Iqbal", "علامہ محمد اقبال",
     "Ho mera kaam ghareebon ki himaayat karna, Dard-mandon se zaeefon se mohabbat karna",
     "May my life's mission be to support the defenseless, and to love the suffering, the weary, and the elderly.", "dua", "Dua & Blessings"),
    ("مرے اللہ برائی سے بچانا مجھ کو", "نیک جو راہ ہو اس رہ پہ چلانا مجھ کو", "Allama Iqbal", "علامہ محمد اقبال",
     "Mere Allah buraai se bachaana mujh ko, Naik jo raah ho uss reh pe chalaana mujh ko",
     "O my Lord, protect my soul from every wrongdoing; guide my footsteps steadily along the righteous path.", "dua", "Dua & Blessings"),
    ("یا رب دلِ مسلم کو وہ زندہ تمنا دے", "جو قلب کو گرما دے جو روح کو تڑپا دے", "Allama Iqbal", "علامہ محمد اقبال",
     "Ya Rab dil-e-Muslim ko woh zinda tamanna de, Jo qalb ko garma de jo rooh ko tarpa de",
     "O Lord, bestow upon the heart that living aspiration which warms the inner chamber and electrifies the seeking spirit!", "dua", "Dua & Blessings"),
    ("تیرے کرم سے ہے ہر اک شے کی بقا یا رب", "ہمیں بھی اپنی رحمت کی عطا فرما پناہ یا رب", "Allama Iqbal", "علامہ محمد اقبال",
     "Tere karam se hai har ik shai ki baqa ya Rab, Humein bhi apni rehmat ki ataa farma panaah ya Rab",
     "Through Your grace alone endures every living creation, O Lord; grant us too the safe sanctuary of Your endless mercy.", "dua", "Dua & Blessings"),
    ("خدا رکھے سلامت ہر اک پھول کو چمن میں", "کسی کے دل پہ نہ آئے کوئی ملال کبھی", "Parveen Shakir", "پروین شاکر",
     "Khuda rakhe salaamat har ik phool ko chaman mein, Kisi ke dil pe na aaye koi malaal kabhi",
     "May God preserve every blooming flower in peace throughout the garden, and let no shadow of sorrow ever touch any heart.", "dua", "Dua & Blessings"),

    # --- WEDDING & NIKKAH ---
    ("مبارک ہو تمہیں یہ رشتۂ الفت کا بندھن", "مہک اٹھے دعاؤں سے تمہارا پیارا آنگن", "Ahmad Faraz", "احمد فراز",
     "Mubarak ho tumhein yeh rishta-e-ulfat ka bandhan, Mehak uthe duaon se tumhaara pyaara aangan",
     "Blessed and joyous be this sacred bond of lifelong affection; may your lovely courtyard bloom fragrant with ceaseless prayers.", "wedding", "Wedding & Nikkah"),
    ("دو دل ملے ہیں آج وفاؤں کے عہد میں", "برکت رہے سدا اس محبت کے عہد میں", "Faiz Ahmad Faiz", "فیض احمد فیض",
     "Do dil mile hain aaj wafaon ke ahd mein, Barakat rahe sada iss mohabbat ke ahd mein",
     "Two souls have united today in solemn vows of everlasting loyalty; may divine barakah forever shower upon this covenant of love.", "wedding", "Wedding & Nikkah"),
    ("سدا سلامت رہے یہ پرخلوص سنگت", "ہر صبح لائے خوشیاں ہر شام لائے راحت", "Parveen Shakir", "پروین شاکر",
     "Sada salaamat rahe yeh pur-ikhlaas sangat, Har subh laaye khushiyaan har shaam laaye raahat",
     "May this sincere, loving union remain forever blessed; may every morning dawn with joy and every evening bring tranquil delight.", "wedding", "Wedding & Nikkah"),
    ("نکاحِ مسنونہ کی یہ رسم مبارک ہو", "دونوں خاندانوں کو یہ جشنِ مسرت مبارک ہو", "Amjad Islam Amjad", "امجد اسلام امجد",
     "Nikkah-e-masnoona ki yeh rasm mubarak ho, Dono khaandaanon ko yeh jashn-e-masarrat mubarak ho",
     "Blessed be this holy Sunnah ceremony of Nikkah; hearty congratulations to both honored families on this grand celebration of happiness.", "wedding", "Wedding & Nikkah"),
    ("چاند تاروں کی طرح چمکے مقدر تمہارا", "سدا آباد رہے یہ پیارا گھر تمہارا", "Nasir Kazmi", "ناصر کاظمی",
     "Chaand taaron ki tarah chamke muqaddar tumhaara, Sada aabaad rahe yeh pyaara ghar tumhaara",
     "May your destiny shine radiant like the moon and distant stars; may your beloved home flourish in peace and laughter forever.", "wedding", "Wedding & Nikkah"),

    # --- BIRTHDAY & MILESTONES ---
    ("تم جیو ہزاروں سال یہ میری ہے آرزو", "سال کے دن ہوں پچاس ہزار یہ میری ہے جستجو", "Shakeel Badayuni", "شکیل بدایونی",
     "Tum jiyo hazaaron saal yeh meri hai aarzoo, Saal ke din hon pachaas hazaar yeh meri hai justujoo",
     "May you live thousands of years, this is my heartfelt wish; and may each single year contain fifty thousand days of joy!", "birthday", "Birthday & Milestones"),
    ("سالگرہ کی یہ مبارک گھڑی لائے بہار", "ہر گھڑی نصیب ہو خوشیوں کا نکھار", "Sahir Ludhianvi", "ساحر لدھیانوی",
     "Saalgirah ki yeh mubarak ghadi laaye bahaar, Har ghadi naseeb ho khushiyon ka nikhaar",
     "May this auspicious moment of your birthday usher in glorious spring; may every passing hour be graced with the blossoming of happiness.", "birthday", "Birthday & Milestones"),
    ("ہر نیا سال ترے واسطے مسرت لائے", "دعا ہے رب سے تجھے کبھی نہ کوئی غم ستائے", "Ahmad Faraz", "احمد فراز",
     "Har naya saal tere waaste masarrat laaye, Dua hai Rab se tujhe kabhi na koi gham sataaye",
     "May each new year bring boundless delight into your journey; my earnest prayer to the Creator is that sorrow may never touch your path.", "birthday", "Birthday & Milestones"),
    ("نئی عمر کا یہ سفر ہو مبارک و تاباں", "پورے ہوں ترے سارے خواب اور ارمان", "Parveen Shakir", "پروین شاکر",
     "Nayi umr ka yeh safar ho mubarak o taabaan, Poore hon tere saare khwaab aur armaan",
     "Blessed and luminous be this voyage of a new year; may all your sacred dreams and sweet yearnings find glorious fulfillment.", "birthday", "Birthday & Milestones"),
    ("سدا مسکراتی رہیں یہ پیاری سی آنکھیں", "خوشیوں کے گیت گائیں یہ روشن سی راتیں", "Amjad Islam Amjad", "امجد اسلام امجد",
     "Sada muskuraati rahein yeh pyaari si aankhein, Khushiyon ke geet gaayein yeh raushan si raatein",
     "May these precious eyes smile in happiness forever; may these radiant evenings sing joyful songs of serenity in your life.", "birthday", "Birthday & Milestones")
]
