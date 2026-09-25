# scripts/generate_291_unique_verses.py
# -*- coding: utf-8 -*-
import json
import re

NEW_VERSES = [
    # --- MIRZA GHALIB ---
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "قاصد کے آتے آتے خط اک اور لکھ رکھوں\nمیں جانتا ہوں جو وہ لکھیں گے جواب میں",
        "romanText": "Qasid ke aate aate khat ik aur likh rakhun\nMain jaanta hun jo wo likhenge jawab mein",
        "englishTranslation": "Before the courier even returns, let me write another letter; I already know what they will write in response.",
        "urduTranslation": "قاصد کے آنے سے پہلے ہی میں ایک اور خط لکھ لوں، کیونکہ مجھے معلوم ہے کہ وہ جواب میں کیا فرمائیں گے۔",
        "meaning": "Witty impatience and deep familiarity with the beloved's temperament."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "بازیچۂ اطفال ہے دنیا مرے آگے\nہوتا ہے شب و روز تماشا مرے آگے",
        "romanText": "Bazicha-e-atfal hai dunya mere aage\nHota hai shab-o-roz tamasha mere aage",
        "englishTranslation": "The world is merely a child's playground before me; day and night, a spectacle unfolds before my eyes.",
        "urduTranslation": "یہ دنیا میرے لیے بچوں کے کھیل سے زیادہ کچھ نہیں، جہاں شب و روز ایک تماشا برپا رہتا ہے۔",
        "meaning": "Philosophical detachment from worldly vanity."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہوئی مدت کہ غالبؔ مر گیا پر یاد آتا ہے\nوہ ہر اک بات پر کہنا کہ یوں ہوتا تو کیا ہوتا",
        "romanText": "Hui muddat ke Ghalib mar gaya par yaad aata hai\nWo har ik baat par kehna ke yun hota to kya hota",
        "englishTranslation": "An age has passed since Ghalib died, yet still we remember his perpetual wonder: 'What if it had been thus?'",
        "urduTranslation": "غالب کو بچھڑے زمانہ گزرا مگر یاد آتا ہے کہ وہ ہر بات پر سوچا کرتا تھا کہ اگر یوں ہوتا تو کیا ہوتا۔",
        "meaning": "Immortal introspective couplet."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا\nاگر اور جیتے رہتے یہی انتظار ہوتا",
        "romanText": "Yeh na thi hamari qismat ke wisal-e-yaar hota\nAgar aur jeete rehte yahi intezar hota",
        "englishTranslation": "It was not in our fate that union with the beloved would be granted; had we lived on forever, this waiting alone would remain.",
        "urduTranslation": "ہماری قسمت میں محبوب کا وصال نہ تھا، اگر عمر دراز بھی ملتی تو بس یہی انتظار مقدر رہتا۔",
        "meaning": "Enduring patience amidst unrequited longing."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "رگوں میں دوڑتے پھرنے کے ہم نہیں قائل\nجب آنکھ ہی سے نہ ٹپکا تو پھر لہو کیا ہے",
        "romanText": "Ragon mein daurte phirne ke hum nahin qayil\nJab aankh hi se na tapka to phir lahu kya hai",
        "englishTranslation": "We are not impressed by blood simply flowing through veins; if it does not well up in the eyes, what use is blood?",
        "urduTranslation": "صرف رگوں میں دوڑتے خون کا کوئی فائدہ نہیں، جب تک وہ احساس اور درد بن کر آنکھوں سے نہ ٹپکے۔",
        "meaning": "True passion requires emotional manifestation."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "dard", "categoryLabel": "Sorrow & Longing",
        "originalText": "غم اگرچہ جاں گسل ہے پہ کہاں بچیں کہ دل ہے\nغمِ عشق گر نہ ہوتا غمِ روزگار ہوتا",
        "romanText": "Gham agarcha jaan-gusil hai pa kahan bachein ke dil hai\nGham-e-ishq gar na hota gham-e-rozgar hota",
        "englishTranslation": "Though sorrow is soul-shattering, how could the heart escape it? If not the sorrow of love, the sorrow of livelihood would take its place.",
        "urduTranslation": "غم جان لیوا سہی لیکن دل اس سے بچ نہیں سکتا، محبت کا غم نہ ہوتا تو روزگار اور زمانے کا غم ہوتا۔",
        "meaning": "The inevitability of struggle in mortal existence."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "محبت میں نہیں ہے فرق جینے اور مرنے کا\nاسی کو دیکھ کر جیتے ہیں جس کافر پہ دم نکلے",
        "romanText": "Mohabbat mein nahin hai farq jeene aur marne ka\nUsi ko dekh kar jeete hain jis kafir pe dam nikle",
        "englishTranslation": "In love there is no division between living and dying; we draw breath only by beholding the beloved for whom life departs.",
        "urduTranslation": "عشق میں جینے اور مرنے کا فرق مٹ جاتا ہے، ہم اسی کو دیکھ کر جیتے ہیں جس پر دل و جان نچھاور ہے۔",
        "meaning": "The transcendent ecstasy of devotion."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "عشق پر زور نہیں ہے یہ وہ آتش غالبؔ\nکہ لگائے نہ لگے اور بجھائے نہ بنے",
        "romanText": "Ishq par zor nahin hai yeh wo aatish Ghalib\nKe lagaaye na lage aur bujhaaye na bane",
        "englishTranslation": "Love is beyond human control, O Ghalib; it is a blaze that cannot be kindled by will, nor extinguished when alight.",
        "urduTranslation": "محبت پر کسی کا بس نہیں چلتا، یہ وہ آگ ہے جو زبردستی نہیں جلائی جا سکتی اور بھڑک اٹھے تو بجھائی نہیں جا سکتی۔",
        "meaning": "The irresistible sovereignty of passion."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "دل ہی تو ہے نہ سنگ و خشت درد سے بھر نہ آئے کیوں\nروئیں گے ہم ہزار بار کوئی ہمیں ستائے کیوں",
        "romanText": "Dil hi to hai na sang-o-khisht dard se bhar na aaye kyun\nRoyenge hum hazaar baar koi humein sataaye kyun",
        "englishTranslation": "It is a tender heart after all, not stone or brick; why should it not overflow with ache?",
        "urduTranslation": "یہ دل ہے پتھر یا اینٹ تو نہیں، اس میں درد کیوں نہ اٹھے؛ کوئی ہمیں ستائے گا تو ہم ہزار بار آنسو بہائیں گے۔",
        "meaning": "Human sensitivity and the right to mourn."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "نہ تھا کچھ تو خدا تھا کچھ نہ ہوتا تو خدا ہوتا\nڈبویا مجھ کو ہونے نے نہ ہوتا میں تو کیا ہوتا",
        "romanText": "Na tha kuch to khuda tha kuch na hota to khuda hota\nDuboya mujh ko hone ne na hota main to kya hota",
        "englishTranslation": "When nothing existed, God was; had nothing come to be, God would still be; my very coming into being proved my undoing.",
        "urduTranslation": "جب کچھ نہ تھا تو خدا موجود تھا اور اگر کچھ نہ ہوتا تب بھی خدا ہوتا، میرے اپنے وجود نے ہی مجھے مصیبت میں ڈالا۔",
        "meaning": "Existential contemplation on being and nothingness."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے",
        "romanText": "Hazaron khwahishein aisi ke har khwahish pe dam nikle\nBohat nikle mere armaan lekin phir bhi kam nikle",
        "englishTranslation": "Thousands of desires, each worth dying for; many of my yearnings were fulfilled, yet so many remain.",
        "urduTranslation": "ہزاروں ایسی خواہشیں ہیں جن پر جان نچھاور کرنے کو جی چاہے، دل کے بہت سے ارمان نکلے مگر پھر بھی بہت سے باقی رہ گئے۔",
        "meaning": "The boundless appetite of human longing."
    },
    {
        "poet": "Mirza Ghalib", "poetUrdu": "مرزا اسد اللہ خاں غالب", "poetOrigin": "Agra / Delhi, India", "poetEra": "1797 – 1869",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "قیدِ حیات و بندِ غم اصل میں دونوں ایک ہیں\nموت سے پہلے آدمی غم سے نجات پائے کیوں",
        "romanText": "Qaid-e-hayaat-o-band-e-gham asal mein donon ek hain\nMaut se pehle aadmi gham se najaat paaye kyun",
        "englishTranslation": "The prison of life and the bonds of sorrow are one and the same; why then should mortal man expect freedom from grief before death?",
        "urduTranslation": "زندگی کی قید اور غم کی زنجیریں حقیقت میں ایک ہی ہیں، موت سے پہلے انسان دکھ اور تکلیف سے کیسے نجات پا سکتا ہے۔",
        "meaning": "Sorrow as an inseparable condition of mortality."
    },

    # --- ALLAMA IQBAL ---
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "inqilab", "categoryLabel": "Revolution & Hope",
        "originalText": "نہیں ہے نا امید اقبالؔ اپنی کشتِ ویراں سے\nذرا نم ہو تو یہ مٹی بڑی زرخیز ہے ساقی",
        "romanText": "Nahin hai na-umeed Iqbal apni kisht-e-veeraan se\nZara nam ho to yeh mitti bari zarkhez hai saqi",
        "englishTranslation": "Iqbal is never hopeless of his barren soil; with just a touch of moisture, this earth is richly fertile, O cupbearer.",
        "urduTranslation": "اقبال اپنی قوم اور دھرتی سے مایوس نہیں، ذرا سی محنت اور بیداری سے یہ مٹی بے پناہ زرخیز ثابت ہوگی۔",
        "meaning": "Unshakable faith in human renewal."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "عمل سے زندگی بنتی ہے جنت بھی جہنم بھی\nیہ خاکی اپنی فطرت میں نہ نوری ہے نہ ناری ہے",
        "romanText": "Amal se zindagi banti hai jannat bhi jahannam bhi\nYeh khaaki apni fitrat mein na noori hai na naari hai",
        "englishTranslation": "Through deeds life fashions its heaven and its hell; this earthly being in nature is neither of light nor of fire.",
        "urduTranslation": "انسان کے اعمال ہی اس کی زندگی کو جنت یا جہنم بناتے ہیں، انسان اپنی سرشت میں محض مٹی ہے جو عمل سے پہچانی جاتی ہے۔",
        "meaning": "The supremacy of personal responsibility."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
        "romanText": "Khudi ko kar buland itna ke har taqdeer se pehle\nKhuda bande se khud poochhe bata teri raza kya hai",
        "englishTranslation": "Elevate your selfhood so high that before writing destiny, God Himself inquires: Tell Me, what is your desire?",
        "urduTranslation": "اپنی خودی کو اس بلندی پر لے جاؤ کہ تقدیر رقم کرنے سے قبل اللہ تعالیٰ تم سے خود پوچھے کہ تیری مرضی کیا ہے۔",
        "meaning": "The pinnacle of spiritual self-realization."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "inqilab", "categoryLabel": "Revolution & Hope",
        "originalText": "تو شاہیں ہے پرواز ہے کام تیرا\nترے سامنے آسماں اور بھی ہیں",
        "romanText": "Tu shaheen hai parwaaz hai kaam tera\nTere saamne aasmaan aur bhi hain",
        "englishTranslation": "You are a falcon, your mission is flight; boundless skies still await your soaring wings.",
        "urduTranslation": "تم شاہین ہو اور بلندیوں پر اڑنا تمہارا مقدر ہے، تمہارے سفر کے لیے لامتناہی آسمان کھلے ہیں۔",
        "meaning": "Calling youth to limitless aspiration."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "گرتے ہیں شہسوار ہی میدانِ جنگ میں\nوہ طفل کیا گرے جو گھٹنوں کے بل چلے",
        "romanText": "Girte hain sheh-sawaar hi maidan-e-jang mein\nWo tifl kya gire jo ghutnon ke bal چلے",
        "englishTranslation": "Only mighty knights fall upon the battlefield; how could that timid infant fall who only crawls on knees?",
        "urduTranslation": "میدانِ کارزار میں صرف بہادر گھڑسوار گرتے ہیں، وہ کیا گرے گا جو ہمیشہ زمین پر گھٹنوں کے بل چلتا رہا ہو۔",
        "meaning": "Daring to risk failure in noble pursuit."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "نگاہِ مردِ مومن سے بدل جاتی ہیں تقدیریں\nجو ہو ذوقِ یقیں پیدا تو کٹ جاتی ہیں زنجیریں",
        "romanText": "Nigah-e-mard-e-momin se badal jaati hain taqdeerein\nJo ho zauq-e-yaqeen paida to kat jaati hain zanjeerein",
        "englishTranslation": "By the visionary gaze of a devoted soul destines are altered; when conviction awakens, all chains shatter.",
        "urduTranslation": "مردِ حق کی نگاہ سے زمانے کے فیصلے بدل جاتے ہیں، پختہ یقین پیدا ہو جائے تو غلامی کی زنجیریں ٹوٹ جاتی ہیں۔",
        "meaning": "The power of unwavering spiritual certitude."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "inqilab", "categoryLabel": "Revolution & Hope",
        "originalText": "افراد کے ہاتھوں میں ہے اقوام کی تقدیر\nہر فرد ہے ملت کے مقدر کا ستارہ",
        "romanText": "Afraad ke haathon mein hai aqwaam ki taqdeer\nHar fard hai millat ke muqaddar ka sitara",
        "englishTranslation": "In the hands of individuals rests the destiny of nations; each person is a star in the firmament of the community.",
        "urduTranslation": "قوموں کی تقدیر ان کے افراد کی محنت اور کردار سے بنتی ہے، ہر فرد اپنی قوم کے مقدر کا چمکتا ستارہ ہے۔",
        "meaning": "Collective strength rooted in personal excellence."
    },
    {
        "poet": "Allama Iqbal", "poetUrdu": "علامہ محمد اقبال", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1877 – 1938",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہزاروں سال نرگس اپنی بے نوری پہ روتی ہے\nبڑی مشکل سے ہوتا ہے چمن میں دیدہ ور پیدا",
        "romanText": "Hazaron saal nargis apni be-noori pe roti hai\nBari mushkil se hota hai chaman mein deeda-war paida",
        "englishTranslation": "For millennia the narcissus laments its sightlessness; with supreme rarity is a true visionary born in the garden.",
        "urduTranslation": "نرگس ہزاروں برس اپنی بے نوری پر روتی ہے تب جا کر چمن میں کوئی صاحبِ بصیرت دیدہ ور جنم لیتا ہے۔",
        "meaning": "The precious rarity of visionary leadership."
    },

    # --- FAIZ AHMAD FAIZ ---
    {
        "poet": "Faiz Ahmad Faiz", "poetUrdu": "فیض احمد فیض", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1911 – 1984",
        "originalLanguage": "ur", "category": "inqilab", "categoryLabel": "Revolution & Hope",
        "originalText": "بول کہ لب آزاد ہیں تیرے\nبول زباں اب تک تیری ہے",
        "romanText": "Bol ke lab azaad hain tere\nBol zabaan ab tak teri hai",
        "englishTranslation": "Speak, for your lips are yet free; speak, for your voice is still your own!",
        "urduTranslation": "آواز بلند کر کیونکہ تیرے ہونٹ ابھی آزاد ہیں اور سچ کہنا تیرا حق ہے!",
        "meaning": "Courage in the face of tyranny."
    },
    {
        "poet": "Faiz Ahmad Faiz", "poetUrdu": "فیض احمد فیض", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1911 – 1984",
        "originalLanguage": "ur", "category": "inqilab", "categoryLabel": "Revolution & Hope",
        "originalText": "ہم پرورشِ لوح و قلم کرتے رہیں گے\nجو دل پہ گزرتی ہے رقم کرتے رہیں گے",
        "romanText": "Hum parvarish-e-lauh-o-qalam karte rahenge\nJo dil pe guzarti hai raqam karte rahenge",
        "englishTranslation": "We shall nurture the sacred page and pen; whatever the heart endures, we shall chronicle without fear.",
        "urduTranslation": "ہم قلم اور کاغذ کا حق ادا کرتے رہیں گے، اور دل پر جو بھی بیتے گی اسے سچائی کے ساتھ لکھتے رہیں گے۔",
        "meaning": "The sacred duty of truthful expression."
    },
    {
        "poet": "Faiz Ahmad Faiz", "poetUrdu": "فیض احمد فیض", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1911 – 1984",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے",
        "romanText": "Gulon mein rang bhare baad-e-naubahar chale\nChale bhi aao ke gulshan ka karobar chale",
        "englishTranslation": "Let blossoms blush with hue as the spring breeze stirs; come forth, my love, so the garden's life may awaken.",
        "urduTranslation": "بہار کی ہوا چلی ہے اور پھولوں میں رنگ بھر رہے ہیں، تم بھی آ جاؤ تاکہ اس گلشن کی رونق بحال ہو سکے۔",
        "meaning": "Lyrical hope combining love and renewal."
    },
    {
        "poet": "Faiz Ahmad Faiz", "poetUrdu": "فیض احمد فیض", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1911 – 1984",
        "originalLanguage": "ur", "category": "dard", "categoryLabel": "Sorrow & Longing",
        "originalText": "مقام فیضؔ کوئی راہ میں جچا ہی نہیں\nجو کوئے یار سے نکلے تو سوئے دار چلے",
        "romanText": "Maqam Faiz koi raah mein jacha hi nahin\nJo koo-e-yaar se nikle to soo-e-daar چلے",
        "englishTranslation": "No resting place pleased Faiz along the journey; when we departed the beloved's street, we walked straight toward the gallows.",
        "urduTranslation": "ہمیں راستے میں کوئی منزل راس نہ آئی، محبوب کی گلی سے رخصت ہوئے تو سیدھے دار و رسن کی راہ لی۔",
        "meaning": "Sacrifice for the beloved and the cause."
    },
    {
        "poet": "Faiz Ahmad Faiz", "poetUrdu": "فیض احمد فیض", "poetOrigin": "Sialkot / Lahore, Pakistan", "poetEra": "1911 – 1984",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "مجھ سے پہلی سی محبت مرے محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
        "romanText": "Mujh se pehli si mohabbat mere mehboob na maang\nMain ne samjha tha ke tu hai to darakhshan hai hayaat",
        "englishTranslation": "Do not ask of me that first carefree passion, my love; once I believed that with you alone, all life was luminous.",
        "urduTranslation": "مجھ سے اب پہلے جیسی بے پروا محبت کا تقاضا نہ کرو، کیونکہ دنیا کے دوسرے دکھوں نے بھی دل کو گھیر لیا ہے۔",
        "meaning": "Awakening to the broader pains of society."
    },

    # --- AHMAD FARAZ ---
    {
        "poet": "Ahmad Faraz", "poetUrdu": "احمد فراز", "poetOrigin": "Kohat / Islamabad, Pakistan", "poetEra": "1931 – 2008",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "سلسلے توڑ گیا وہ سبھی جاتے جاتے\nورنہ اتنے تو مراسم تھے کہ آتے جاتے",
        "romanText": "Silsile tor gaya wo sabhi jaate jaate\nWarna itne to maraasim the ke aate jaate",
        "englishTranslation": "Departing, they severed every link; otherwise there was enough acquaintance for passing visits.",
        "urduTranslation": "جاتے جاتے وہ تمام تعلقات ختم کر گیا، حالانکہ اتنی جان پہچان تو تھی کہ کبھی کبھار ملاقات ہو سکتی۔",
        "meaning": "The sting of sudden detachment."
    },
    {
        "poet": "Ahmad Faraz", "poetUrdu": "احمد فراز", "poetOrigin": "Kohat / Islamabad, Pakistan", "poetEra": "1931 – 2008",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "اس سے پہلے کہ بے وفا ہو جائیں\nکیوں نہ اے دوست ہم جدا ہو جائیں",
        "romanText": "Is se pehle ke be-wafa ho jayein\nKyun na ae dost hum juda ho jayein",
        "englishTranslation": "Before we turn unfaithful to our sacred bond, why do we not part with grace, dear companion?",
        "urduTranslation": "اس سے پہلے کہ محبت میں بے وفائی در آئے، کیوں نہ ہم باوقار طریقے سے الگ ہو جائیں۔",
        "meaning": "Preserving mutual respect before bitterness arrives."
    },
    {
        "poet": "Ahmad Faraz", "poetUrdu": "احمد فراز", "poetOrigin": "Kohat / Islamabad, Pakistan", "poetEra": "1931 – 2008",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "شکوۂ ظلمتِ شب سے تو کہیں بہتر تھا\nاپنے حصے کی کوئی شمع جلاتے جاتے",
        "romanText": "Shikwa-e-zulmat-e-shab se to kahin behtar tha\nApne hisse ki koi shama jalaate jaate",
        "englishTranslation": "Far better than lamenting the night's darkness would have been to light the candle of your own share.",
        "urduTranslation": "رات کے اندھیرے کا شکوہ کرنے کے بجائے کتنا اچھا ہوتا کہ ہم اپنی بساط کے مطابق کوئی چراغ روشن کر جاتے۔",
        "meaning": "Constructive action over passive complaint."
    },

    # --- JAUN ELIA ---
    {
        "poet": "Jaun Elia", "poetUrdu": "جون ایلیا", "poetOrigin": "Amroha, India / Karachi, Pakistan", "poetEra": "1931 – 2002",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "بے دلی کیا یوں ہی دن گزر جائیں گے\nصرف زندہ رہے ہم تو مر جائیں گے",
        "romanText": "Be-dili kya yunhi din guzar jayeinge\nSirf zinda rahe hum to mar jayeinge",
        "englishTranslation": "Listless apathy! Will our days pass in such vanity? If we merely exist without soul, we shall perish.",
        "urduTranslation": "کیا بے دلی سے ہی سارے دن بیت جائیں گے؟ اگر صرف سانسیں لیتے رہے تو ہم زندہ درگور ہو جائیں گے۔",
        "meaning": "Existential dread of empty survival."
    },
    {
        "poet": "Jaun Elia", "poetUrdu": "جون ایلیا", "poetOrigin": "Amroha, India / Karachi, Pakistan", "poetEra": "1931 – 2002",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "شاید مجھے کسی سے محبت نہیں ہوئی\nلیکن یقین سب کو دلاتا رہا ہوں میں",
        "romanText": "Shayad mujhe kisi se mohabbat nahin hui\nLekin yaqeen sab ko dilata raha hun main",
        "englishTranslation": "Perhaps I have truly never loved anyone; yet I spent my life convincing everyone that I did.",
        "urduTranslation": "شاید مجھے حقیقت میں کسی سے عشق نہ ہوا، مگر میں ساری عمر سب کو اس کا یقین دلاتا رہا۔",
        "meaning": "Brutal self-honesty on emotional detachment."
    },
    {
        "poet": "Jaun Elia", "poetUrdu": "جون ایلیا", "poetOrigin": "Amroha, India / Karachi, Pakistan", "poetEra": "1931 – 2002",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "جو گزاری نہ جا سکی ہم سے\nہم نے وہ زندگی گزاری ہے",
        "romanText": "Jo guzaari na ja saki hum se\nHum ne wo zindagi guzaari hai",
        "englishTranslation": "The life that was unbearable to endure—that is the very life we have somehow lived through.",
        "urduTranslation": "وہ زندگی جو کسی طور جینے کے لائق نہ تھی، ہم نے وہی زندگی کاٹ کر دکھائی ہے۔",
        "meaning": "Enduring the unendurable."
    },

    # --- PARVEEN SHAKIR ---
    {
        "poet": "Parveen Shakir", "poetUrdu": "پروین شاکر", "poetOrigin": "Karachi / Islamabad, Pakistan", "poetEra": "1952 – 1994",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "کو بہ کو پھیل گئی بات شناسائی کی\nاس نے خوشبو کی طرح میری پذیرائی کی",
        "romanText": "Koo-ba-koo phail gayi baat shanasayi ki\nUs ne khushbu ki tarah meri paziraayi ki",
        "englishTranslation": "From street to street the story of our acquaintance spread; they welcomed me as fragrance embraces the air.",
        "urduTranslation": "ہماری شناسائی کا چرچا گلی گلی پھیل گیا، اس نے خوشبو کی مانند میرا استقبال کیا۔",
        "meaning": "Fragrance of intimate devotion."
    },
    {
        "poet": "Parveen Shakir", "poetUrdu": "پروین شاکر", "poetOrigin": "Karachi / Islamabad, Pakistan", "poetEra": "1952 – 1994",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "حسن کے سمجھنے کو عمر چاہیے جاناں\nدو گھڑی کی چاہت میں لڑکپن نہیں جاتا",
        "romanText": "Husn ke samajhne ko umr chahiye jaanan\nDo ghari ki chahat mein larkpan nahin jaata",
        "englishTranslation": "To truly comprehend beauty requires a lifetime, my love; brief affection cannot outgrow youthful naivety.",
        "urduTranslation": "حقیقی حسن کی قدر جاننے کے لیے عمر درکار ہے، گھڑی دو گھڑی کے عشق سے نادانی دور نہیں ہوتی۔",
        "meaning": "Maturity versus impulse in love."
    },
    {
        "poet": "Parveen Shakir", "poetUrdu": "پروین شاکر", "poetOrigin": "Karachi / Islamabad, Pakistan", "poetEra": "1952 – 1994",
        "originalLanguage": "ur", "category": "dard", "categoryLabel": "Sorrow & Longing",
        "originalText": "کیسے کہہ دوں کہ مجھے چھوڑ دیا ہے اس نے\nبات تو سچ ہے مگر بات ہے رسوائی کی",
        "romanText": "Kaise keh dun ke mujhe chhor diya hai us ne\nBaat to sach hai magar baat hai ruswayi ki",
        "englishTranslation": "How could I confess that they have abandoned me? The statement is true, but it brings public humiliation.",
        "urduTranslation": "میں دنیا کے سامنے کیسے اقرار کروں کہ اس نے مجھے چھوڑ دیا ہے، بات تو سچ ہے مگر اس میں رسوائی چھپی ہے۔",
        "meaning": "The silent dignity of heartbreak."
    },

    # --- MIR TAQI MIR ---
    {
        "poet": "Mir Taqi Mir", "poetUrdu": "میر تقی میر", "poetOrigin": "Agra / Delhi / Lucknow, India", "poetEra": "1723 – 1810",
        "originalLanguage": "ur", "category": "ishq", "categoryLabel": "Love & Romance",
        "originalText": "پتا پتا بوٹا بوٹا حال ہمارا جانے ہے\nجانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے",
        "romanText": "Patta patta boota boota haal hamara jaane hai\nJaane na jaane gul hi na jaane baagh to saara jaane hai",
        "englishTranslation": "Every leaf and every branch knows our condition of love; whether the elusive rose acknowledges it or not, the entire garden knows.",
        "urduTranslation": "چمن کا ہر پتا اور بوٹا ہمارے دل کی حالت جانتا ہے، اگر محبوب گل بے خبر بھی رہے تو سارا باغ واقف ہے۔",
        "meaning": "Unmistakable universal affection."
    },
    {
        "poet": "Mir Taqi Mir", "poetUrdu": "میر تقی میر", "poetOrigin": "Agra / Delhi / Lucknow, India", "poetEra": "1723 – 1810",
        "originalLanguage": "ur", "category": "dard", "categoryLabel": "Sorrow & Longing",
        "originalText": "نازکی اس کے لب کی کیا کہیے\nپنکھڑی اک گلاب کی سی ہے",
        "romanText": "Naazuki us ke lab ki kya kahiye\nPankhuri ik gulaab ki si hai",
        "englishTranslation": "How can one praise the delicate softness of her lips? They are like the petal of a rose.",
        "urduTranslation": "محبوب کے لبوں کی نزاکت کا کیا بیان ہو، وہ تو گلاب کی تازہ پنکھڑی جیسے نازک ہیں۔",
        "meaning": "Exquisite tenderness."
    },
    {
        "poet": "Mir Taqi Mir", "poetUrdu": "میر تقی میر", "poetOrigin": "Agra / Delhi / Lucknow, India", "poetEra": "1723 – 1810",
        "originalLanguage": "ur", "category": "falsafa", "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہستی اپنی حباب کی سی ہے\nیہ نمائش سراب کی سی ہے",
        "romanText": "Hasti apni hubaab ki si hai\nYeh numaish saraab ki si hai",
        "englishTranslation": "Our existence is like a fleeting water bubble; this worldly display is merely like a desert mirage.",
        "urduTranslation": "انسان کی زندگی پانی کے بلبلے کی طرح ناپائیدار ہے اور یہ ساری دنیا سراب کی مانند ایک دھوکا ہے۔",
        "meaning": "The transience of mortal life."
    }
]

print(f"Loaded {len(NEW_VERSES)} starter verses.")
