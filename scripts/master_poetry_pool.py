# scripts/master_poetry_pool.py
# Comprehensive pool of authentic Urdu, Punjabi, Persian, and Arabic poetry

POOL = [
    # GHALIB
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "قاصد کے آتے آتے خط اک اور لکھ رکھوں\nمیں جانتا ہوں جو وہ لکھیں گے جواب میں",
        "englishTranslation": "Before the messenger returns, let me write another letter; I already know what they will write in reply.",
        "urduTranslation": "قاصد کے آنے سے پہلے ہی میں ایک اور خط لکھ لوں، کیونکہ مجھے معلوم ہے کہ وہ جواب میں کیا فرمائیں گے۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "بازیچۂ اطفال ہے دنیا مرے آگے\nہوتا ہے شب و روز تماشا مرے آگے",
        "englishTranslation": "The world is merely a child's game before me; night and day, a spectacle unfolds before my eyes.",
        "urduTranslation": "یہ دنیا میرے لیے بچوں کے کھیل سے زیادہ کچھ نہیں، جہاں شب و روز ایک تماشا برپا رہتا ہے۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہوئی مدت کہ غالبؔ مر گیا پر یاد آتا ہے\nوہ ہر اک بات پر کہنا کہ یوں ہوتا تو کیا ہوتا",
        "englishTranslation": "A long time has passed since Ghalib died, yet still we remember his pondering: 'What if it had been thus?'",
        "urduTranslation": "غالب کو بچھڑے زمانہ گزرا مگر یاد آتا ہے کہ وہ ہر بات پر سوچا کرتا تھا کہ اگر یوں ہوتا تو کیا ہوتا۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا\nاگر اور جیتے رہتے یہی انتظار ہوتا",
        "englishTranslation": "It was not in our destiny that union with the beloved would happen; had we lived longer, this waiting alone would remain.",
        "urduTranslation": "ہماری قسمت میں محبوب کا وصال نہ تھا، اگر عمر دراز بھی ملتی تو بس یہی انتظار مقدر رہتا۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "رگوں میں دوڑتے پھرنے کے ہم نہیں قائل\nجب آنکھ ہی سے نہ ٹپکا تو پھر لہو کیا ہے",
        "englishTranslation": "We are not impressed by blood simply coursing through the veins; if it does not well up in the eyes, what use is blood?",
        "urduTranslation": "صرف رگوں میں دوڑتے خون کا کوئی فائدہ نہیں، جب تک وہ احساس اور درد بن کر آنکھوں سے نہ ٹپکے۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "غم اگرچہ جاں گسل ہے پہ کہاں بچیں کہ دل ہے\nغمِ عشق گر نہ ہوتا غمِ روزگار ہوتا",
        "englishTranslation": "Though grief is soul-shattering, how could the heart escape it? If not the sorrow of love, worldly sorrow would take its place.",
        "urduTranslation": "غم جان لیوا سہی لیکن دل اس سے بچ نہیں سکتا، محبت کا غم نہ ہوتا تو روزگار اور زمانے کا غم ہوتا۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "محبت میں نہیں ہے فرق جینے اور مرنے کا\nاسی کو دیکھ کر جیتے ہیں جس کافر پہ دم نکلے",
        "englishTranslation": "In love there is no difference between living and dying; we live only by gazing upon that beloved for whom life departs.",
        "urduTranslation": "عشق میں جینے اور مرنے کا فرق مٹ جاتا ہے، ہم اسی کو دیکھ کر جیتے ہیں جس پر دل و جان نچھاور ہے۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "عشق پر زور نہیں ہے یہ وہ آتش غالبؔ\nکہ لگائے نہ لگے اور بجھائے نہ بنے",
        "englishTranslation": "Love is beyond control, O Ghalib; it is a fire that cannot be lit by force, nor extinguished when ablaze.",
        "urduTranslation": "محبت پر کسی کا بس نہیں چلتا، یہ وہ آگ ہے جو زبردستی نہیں جلائی جا سکتی اور بھڑک اٹھے تو بجھائی نہیں جا سکتی۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "دل ہی تو ہے نہ سنگ و خشت درد سے بھر نہ آئے کیوں\nروئیں گے ہم ہزار بار کوئی ہمیں ستائے کیوں",
        "englishTranslation": "It is a sensitive heart after all, not stone or brick; why should it not ache with grief?",
        "urduTranslation": "یہ دل ہے پتھر یا اینٹ تو نہیں، اس میں درد کیوں نہ اٹھے؛ کوئی ہمیں ستائے گا تو ہم ہزار بار آنسو بہائیں گے۔"
    },
    {
        "poet": "Mirza Ghalib",
        "poetUrdu": "مرزا اسد اللہ خاں غالب",
        "poetOrigin": "Agra / Delhi, India",
        "poetEra": "1797 – 1869",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "نہ تھا کچھ تو خدا تھا کچھ نہ ہوتا تو خدا ہوتا\nڈبویا مجھ کو ہونے نے نہ ہوتا میں تو کیا ہوتا",
        "englishTranslation": "When nothing existed, God was there; had nothing come to be, God would still be; my very existence proved my undoing.",
        "urduTranslation": "جب کچھ نہ تھا تو خدا موجود تھا اور اگر کچھ نہ ہوتا تب بھی خدا ہوتا، میرے اپنے وجود نے ہی مجھے مصیبت میں ڈالا۔"
    },

    # ALLAMA IQBAL
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "نہیں ہے نا امید اقبالؔ اپنی کشتِ ویراں سے\nذرا نم ہو تو یہ مٹی بڑی زرخیز ہے ساقی",
        "englishTranslation": "Iqbal is never hopeless of his barren field; with just a little moisture, this soil is richly fertile, O cupbearer.",
        "urduTranslation": "اقبال اپنی قوم اور دھرتی سے مایوس نہیں، ذرا سی محنت اور بیداری سے یہ مٹی بے پناہ زرخیز ثابت ہوگی۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "عمل سے زندگی بنتی ہے جنت بھی جہنم بھی\nیہ خاکی اپنی فطرت میں نہ نوری ہے نہ ناری ہے",
        "englishTranslation": "Through righteous action life creates both heaven and hell; this earthly being in its essence is neither of light nor of fire.",
        "urduTranslation": "انسان کے اعمال ہی اس کی زندگی کو جنت یا جہنم بناتے ہیں، انسان اپنی سرشت میں محض مٹی ہے جو عمل سے پہچانی جاتی ہے۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
        "englishTranslation": "Elevate your selfhood so high that before writing your destiny, God Himself inquires: Tell Me, what is your desire?",
        "urduTranslation": "اپنی خودی کو اس بلندی پر لے جاؤ کہ تقدیر رقم کرنے سے قبل اللہ تعالیٰ تم سے خود پوچھے کہ تیری مرضی کیا ہے۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "تو شاہیں ہے پرواز ہے کام تیرا\nترے سامنے آسماں اور بھی ہیں",
        "englishTranslation": "You are a falcon, your calling is soaring flight; boundless skies still await your wings.",
        "urduTranslation": "تم شاہین ہو اور بلندیوں پر اڑنا تمہارا مقدر ہے، تمہارے سفر کے لیے لامتناہی آسمان کھلے ہیں۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "گرتے ہیں شہسوار ہی میدانِ جنگ میں\nوہ طفل کیا گرے جو گھٹنوں کے بل چلے",
        "englishTranslation": "Only mighty knights fall upon the battlefield; how could a child fall who only crawls on knees?",
        "urduTranslation": "میدانِ کارزار میں صرف بہادر گھڑسوار گرتے ہیں، وہ کیا گرے گا جو ہمیشہ زمین پر گھٹنوں کے بل چلتا رہا ہو۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "نگاہِ مردِ مومن سے بدل جاتی ہیں تقدیریں\nجو ہو ذوقِ یقیں پیدا تو کٹ جاتی ہیں زنجیریں",
        "englishTranslation": "By the visionary gaze of a true believer destines are transformed; when certitude is born, all chains break.",
        "urduTranslation": "مردِ حق کی نگاہ سے زمانے کے فیصلے بدل جاتے ہیں، پختہ یقین پیدا ہو جائے تو غلامی کی زنجیریں ٹوٹ جاتی ہیں۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "جس کھیت سے دہقاں کو میسر نہ ہو روزی\nاس کھیت کے ہر خوشۂ گندم کو جلا دو",
        "englishTranslation": "That field which yields no sustenance to the farmer: incinerate every ear of wheat standing in that field!",
        "urduTranslation": "جس کھیت کی فصل سے کسان کو روٹی نہ ملے، اس کھیت کے ایک ایک خوشے کو نذرِ آتش کر دو۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہزاروں سال نرگس اپنی بے نوری پہ روتی ہے\nبڑی مشکل سے ہوتا ہے چمن میں دیدہ ور پیدا",
        "englishTranslation": "For thousands of years the narcissus weeps over its sightlessness; with immense rarity is a true visionary born in the garden.",
        "urduTranslation": "نرگس ہزاروں برس اپنی بے نوری پر روتی ہے تب جا کر چمن میں کوئی صاحبِ بصیرت دیدہ ور جنم لیتا ہے۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "بے خطر کود پڑا آتشِ نمرود میں عشق\nعقل ہے محوِ تماشائے لبِ بام ابھی",
        "englishTranslation": "Fearlessly love leaped into the fiery furnace of Nimrod, while cautious intellect still stands watching from the rooftop.",
        "urduTranslation": "عشق نے بے خطر نمرود کی آگ میں چھلانگ لگا دی، جبکہ عقل اب بھی کنارے پر کھڑی سوچ بچار میں لگی ہے۔"
    },
    {
        "poet": "Allama Iqbal",
        "poetUrdu": "علامہ محمد اقبال",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1877 – 1938",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "یقینِ محکم، عملِ پیہم، محبت فاتحِ عالم\nجہادِ زندگانی میں ہیں یہ مردوں کی شمشیریں",
        "englishTranslation": "Unyielding faith, ceaseless action, and world-conquering love: these are the trusty swords of champions in life's battle.",
        "urduTranslation": "پختہ یقین، مسلسل محنت اور دنیا کو مسخر کرنے والی محبت، زندگی کے میدان میں انسان کے سب سے بڑے ہتھیار ہیں۔"
    },

    # FAIZ AHMAD FAIZ
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "بول کہ لب آزاد ہیں تیرے\nبول زباں اب تک تیری ہے",
        "englishTranslation": "Speak, for your lips are yet free; speak, for your voice is still your own!",
        "urduTranslation": "آواز بلند کر کیونکہ تیرے ہونٹ ابھی آزاد ہیں اور سچ کہنا تیرا حق ہے!"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "ہم پرورشِ لوح و قلم کرتے رہیں گے\nجو دل پہ گزرتی ہے رقم کرتے رہیں گے",
        "englishTranslation": "We shall nurture the sacred page and quill; whatever the heart endures, we shall write down without fear.",
        "urduTranslation": "ہم قلم اور کاغذ کا حق ادا کرتے رہیں گے، اور دل پر جو بھی بیتے گی اسے سچائی کے ساتھ لکھتے رہیں گے۔"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے",
        "englishTranslation": "Let blossoms take on color as the spring breeze stirs; come forth, my love, so the garden's life may flourish.",
        "urduTranslation": "بہار کی ہوا چلی ہے اور پھولوں میں رنگ بھر رہے ہیں، تم بھی آ جاؤ تاکہ اس گلشن کی رونق بحال ہو سکے۔"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "مقام فیضؔ کوئی راہ میں جچا ہی نہیں\nجو کوئے یار سے نکلے تو سوئے دار چلے",
        "englishTranslation": "No waystation pleased Faiz along the journey; when we departed the beloved's street, we walked straight toward the gallows.",
        "urduTranslation": "ہمیں راستے میں کوئی منزل راس نہ آئی، محبوب کی گلی سے رخصت ہوئے تو سیدھے دار و رسن کی راہ لی۔"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "مجھ سے پہلی سی محبت مرے محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
        "englishTranslation": "Do not demand of me that first untroubled passion, my love; once I believed that with you alone, all life was luminous.",
        "urduTranslation": "مجھ سے اب پہلے جیسی بے پروا محبت کا تقاضا نہ کرو، کیونکہ دنیا کے دوسرے دکھوں نے بھی دل کو گھیر لیا ہے۔"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "اور بھی دکھ ہیں زمانے میں محبت کے سوا\nراحتیں اور بھی ہیں وصل کی راحت کے سوا",
        "englishTranslation": "There are other sorrows in this world beyond love; there are other consolations beyond the ecstasy of union.",
        "urduTranslation": "اس دنیا میں عشق کے دکھ کے علاوہ اور بھی تلخیاں ہیں، اور محبوب کے وصل کے سوا بھی زندگی میں بہت سی راحتیں موجود ہیں۔"
    },
    {
        "poet": "Faiz Ahmad Faiz",
        "poetUrdu": "فیض احمد فیض",
        "poetOrigin": "Sialkot / Lahore, Pakistan",
        "poetEra": "1911 – 1984",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "ہم دیکھیں گے لازم ہے کہ ہم بھی دیکھیں گے\nوہ دن کہ جس کا وعدہ ہے جو لوحِ ازل پہ لکھا ہے",
        "englishTranslation": "We shall witness, it is inevitable that we too shall see that promised day inscribed upon eternal tablet.",
        "urduTranslation": "ہم ضرور دیکھیں گے کہ جب ظلم کے پہاڑ روئی کی طرح اڑیں گے اور حق و انصاف کا راج قائم ہوگا۔"
    },

    # MIR TAQI MIR
    {
        "poet": "Mir Taqi Mir",
        "poetUrdu": "میر تقی میر",
        "poetOrigin": "Agra / Delhi / Lucknow, India",
        "poetEra": "1723 – 1810",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "پتا پتا بوٹا بوٹا حال ہمارا جانے ہے\nجانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے",
        "englishTranslation": "Every leaf and every branch knows our condition of love; even if the elusive rose remains unaware, the entire garden knows.",
        "urduTranslation": "چمن کا ہر پتا اور بوٹا ہمارے دل کی حالت جانتا ہے، اگر محبوب گل بے خبر بھی رہے تو سارا باغ واقف ہے۔"
    },
    {
        "poet": "Mir Taqi Mir",
        "poetUrdu": "میر تقی میر",
        "poetOrigin": "Agra / Delhi / Lucknow, India",
        "poetEra": "1723 – 1810",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "نازکی اس کے لب کی کیا کہیے\nپنکھڑی اک گلاب کی سی ہے",
        "englishTranslation": "How could one describe the delicate softness of her lips? They are like the petal of a rose.",
        "urduTranslation": "محبوب کے لبوں کی نزاکت کا کیا بیان ہو، وہ تو گلاب کی تازہ پنکھڑی جیسے نازک ہیں۔"
    },
    {
        "poet": "Mir Taqi Mir",
        "poetUrdu": "میر تقی میر",
        "poetOrigin": "Agra / Delhi / Lucknow, India",
        "poetEra": "1723 – 1810",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "ہستی اپنی حباب کی سی ہے\nیہ نمائش سراب کی سی ہے",
        "englishTranslation": "Our existence is like a fleeting water bubble; this worldly display is merely like a desert mirage.",
        "urduTranslation": "انسان کی زندگی پانی کے بلبلے کی طرح ناپائیدار ہے اور یہ ساری دنیا سراب کی مانند ایک دھوکا ہے۔"
    },
    {
        "poet": "Mir Taqi Mir",
        "poetUrdu": "میر تقی میر",
        "poetOrigin": "Agra / Delhi / Lucknow, India",
        "poetEra": "1723 – 1810",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اب کے جنوں میں فاصلہ شاید نہ کچھ رہے\nدامن کے چاک اور گریبان کے چاک میں",
        "englishTranslation": "In this season of passion, no distance might remain between the torn hem and the torn collar.",
        "urduTranslation": "اس بار عشق کے جنون میں گریبان اور دامن کی دھجیاں سب ایک ہو جائیں گی۔"
    },
    {
        "poet": "Mir Taqi Mir",
        "poetUrdu": "میر تقی میر",
        "poetOrigin": "Agra / Delhi / Lucknow, India",
        "poetEra": "1723 – 1810",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "دیکھ تو دل کہ جاں سے اٹھتا ہے\nیہ دھواں سا کہاں سے اٹھتا ہے",
        "englishTranslation": "Look into the heart, for it rises from the soul; whence does this mournful smoke arise?",
        "urduTranslation": "ذرا دل میں جھانک کر دیکھو کہ یہ سوز اور دھواں کس گہری چوٹ کی وجہ سے اٹھ رہا ہے۔"
    },

    # AHMAD FARAZ
    {
        "poet": "Ahmad Faraz",
        "poetUrdu": "احمد فراز",
        "poetOrigin": "Kohat / Islamabad, Pakistan",
        "poetEra": "1931 – 2008",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "سلسلے توڑ گیا وہ سبھی جاتے جاتے\nورنہ اتنے تو مراسم تھے کہ آتے جاتے",
        "englishTranslation": "Departing, they severed every link; otherwise there remained enough warmth for passing visits.",
        "urduTranslation": "جاتے جاتے وہ تمام تعلقات ختم کر گیا، حالانکہ اتنی جان پہچان تو تھی کہ کبھی کبھار ملاقات ہو سکتی۔"
    },
    {
        "poet": "Ahmad Faraz",
        "poetUrdu": "احمد فراز",
        "poetOrigin": "Kohat / Islamabad, Pakistan",
        "poetEra": "1931 – 2008",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اس سے پہلے کہ بے وفا ہو جائیں\nکیوں نہ اے دوست ہم جدا ہو جائیں",
        "englishTranslation": "Before we turn unfaithful to our bond, why do we not part with grace, dear companion?",
        "urduTranslation": "اس سے پہلے کہ محبت میں بے وفائی در آئے، کیوں نہ ہم باوقار طریقے سے الگ ہو جائیں۔"
    },
    {
        "poet": "Ahmad Faraz",
        "poetUrdu": "احمد فراز",
        "poetOrigin": "Kohat / Islamabad, Pakistan",
        "poetEra": "1931 – 2008",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "شکوۂ ظلمتِ شب سے تو کہیں بہتر تھا\nاپنے حصے کی کوئی شمع جلاتے جاتے",
        "englishTranslation": "Far better than lamenting the darkness of the night would have been to light the candle of your own share.",
        "urduTranslation": "رات کے اندھیرے کا شکوہ کرنے کے بجائے کتنا اچھا ہوتا کہ ہم اپنی بساط کے مطابق کوئی چراغ روشن کر جاتے۔"
    },
    {
        "poet": "Ahmad Faraz",
        "poetUrdu": "احمد فراز",
        "poetOrigin": "Kohat / Islamabad, Pakistan",
        "poetEra": "1931 – 2008",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "سنا ہے بولے تو باتوں سے پھول جھڑتے ہیں\nیہ بات ہے تو چلو بات کر کے دیکھتے ہیں",
        "englishTranslation": "They say when my beloved speaks, fragrant blossoms fall; if true, let us converse and see.",
        "urduTranslation": "سنا ہے کہ وہ بولیں تو پھول جھڑتے ہیں، اگر ایسی بات ہے تو چل کر ان سے گفتگو کر کے دیکھتے ہیں۔"
    },
    {
        "poet": "Ahmad Faraz",
        "poetUrdu": "احمد فراز",
        "poetOrigin": "Kohat / Islamabad, Pakistan",
        "poetEra": "1931 – 2008",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "آنکھ سے دور نہ ہو دل سے اتر جائے گا\nوقت کا کیا ہے گزرتا ہے گزر جائے گا",
        "englishTranslation": "Let them not stray from sight, lest they slip from the heart; as for time, it always passes and will pass.",
        "urduTranslation": "محبوب کو نگاہوں سے اوجھل نہ ہونے دو ورنہ دل سے اتر جائے گا، وقت کا کیا ہے وہ تو گزر ہی جائے گا۔"
    },

    # JAUN ELIA
    {
        "poet": "Jaun Elia",
        "poetUrdu": "جون ایلیا",
        "poetOrigin": "Amroha, India / Karachi, Pakistan",
        "poetEra": "1931 – 2002",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "بے دلی کیا یوں ہی دن گزر جائیں گے\nصرف زندہ رہے ہم تو مر جائیں گے",
        "englishTranslation": "Listless apathy! Will our days pass in such vanity? If we merely exist without soul, we shall perish.",
        "urduTranslation": "کیا بے دلی سے ہی سارے دن بیت جائیں گے؟ اگر صرف سانسیں لیتے رہے تو ہم زندہ درگور ہو جائیں گے۔"
    },
    {
        "poet": "Jaun Elia",
        "poetUrdu": "جون ایلیا",
        "poetOrigin": "Amroha, India / Karachi, Pakistan",
        "poetEra": "1931 – 2002",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "شاید مجھے کسی سے محبت نہیں ہوئی\nلیکن یقین سب کو دلاتا رہا ہوں میں",
        "englishTranslation": "Perhaps I have truly never loved anyone; yet I spent my life convincing everyone that I did.",
        "urduTranslation": "شاید مجھے حقیقت میں کسی سے عشق نہ ہوا، مگر میں ساری عمر سب کو اس کا یقین دلاتا رہا۔"
    },
    {
        "poet": "Jaun Elia",
        "poetUrdu": "جون ایلیا",
        "poetOrigin": "Amroha, India / Karachi, Pakistan",
        "poetEra": "1931 – 2002",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "جو گزاری نہ جا سکی ہم سے\nہم نے وہ زندگی گزاری ہے",
        "englishTranslation": "The life that was unbearable to endure—that is the very life we have somehow lived through.",
        "urduTranslation": "وہ زندگی جو کسی طور جینے کے لائق نہ تھی، ہم نے وہی زندگی کاٹ کر دکھائی ہے۔"
    },
    {
        "poet": "Jaun Elia",
        "poetUrdu": "جون ایلیا",
        "poetOrigin": "Amroha, India / Karachi, Pakistan",
        "poetEra": "1931 – 2002",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "کتنی دلکش ہو تم کتنا دل جو ہوں میں\nکیا ستم ہے کہ ہم لوگ مر جائیں گے",
        "englishTranslation": "How charming you are, and how yearning a heart I possess; what a tragedy that one day we shall both pass away.",
        "urduTranslation": "تم کتنی دلکش ہو اور میں کتنا چاہنے والا دل رکھتا ہوں، کیسا ستم ہے کہ ایک دن ہم دونوں مٹی ہو جائیں گے۔"
    },
    {
        "poet": "Jaun Elia",
        "poetUrdu": "جون ایلیا",
        "poetOrigin": "Amroha, India / Karachi, Pakistan",
        "poetEra": "1931 – 2002",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "نیا اک رشتہ پیدا کیوں کریں ہم\nبچھڑنا ہے تو جھگڑا کیوں کریں ہم",
        "englishTranslation": "Why forge a new bond when parted we must be? If separation is fate, why contend and struggle?",
        "urduTranslation": "ہم نیا رشتہ کیوں بنائیں جب معلوم ہے کہ جدا ہونا ہے؛ اگر بچھڑنا ہی مقدر ہے تو جھگڑا کیسا۔"
    },

    # PARVEEN SHAKIR
    {
        "poet": "Parveen Shakir",
        "poetUrdu": "پروین شاکر",
        "poetOrigin": "Karachi / Islamabad, Pakistan",
        "poetEra": "1952 – 1994",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "کو بہ کو پھیل گئی بات شناسائی کی\nاس نے خوشبو کی طرح میری پذیرائی کی",
        "englishTranslation": "Word of our acquaintance spread through every street; they welcomed me as fragrance embraces the breeze.",
        "urduTranslation": "ہماری شناسائی کا چرچا گلی گلی پھیل گیا، اس نے خوشبو کی مانند میرا پرجوش استقبال کیا۔"
    },
    {
        "poet": "Parveen Shakir",
        "poetUrdu": "پروین شاکر",
        "poetOrigin": "Karachi / Islamabad, Pakistan",
        "poetEra": "1952 – 1994",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "حسن کے سمجھنے کو عمر چاہیے جاناں\nدو گھڑی کی چاہت میں لڑکپن نہیں جاتا",
        "englishTranslation": "To truly comprehend beauty requires a lifetime, my love; in a fleeting affection, youthful naivety does not vanish.",
        "urduTranslation": "حقیقی حسن کی قدر جاننے کے لیے عمر درکار ہے، گھڑی دو گھڑی کے عشق سے نادانی دور نہیں ہوتی۔"
    },
    {
        "poet": "Parveen Shakir",
        "poetUrdu": "پروین شاکر",
        "poetOrigin": "Karachi / Islamabad, Pakistan",
        "poetEra": "1952 – 1994",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "کیسے کہہ دوں کہ مجھے چھوڑ دیا ہے اس نے\nبات تو سچ ہے مگر بات ہے رسوائی کی",
        "englishTranslation": "How could I confess that they have abandoned me? The statement is true, but it brings public humiliation.",
        "urduTranslation": "میں دنیا کے سامنے کیسے اقرار کروں کہ اس نے مجھے چھوڑ دیا ہے، بات تو سچ ہے مگر اس میں رسوائی چھپی ہے۔"
    },
    {
        "poet": "Parveen Shakir",
        "poetUrdu": "پروین شاکر",
        "poetOrigin": "Karachi / Islamabad, Pakistan",
        "poetEra": "1952 – 1994",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا\nمسئلہ پھول کا ہے پھول کدھر جائے گا",
        "englishTranslation": "He is fragrance that can scatter upon the winds; the sorrow belongs to the fragile flower left behind.",
        "urduTranslation": "وہ تو خوشبو کی مانند ہوا میں اڑ جائے گا، اصل مسئلہ تو اس شاخ اور پھول کا ہے جو تنہا رہ جائے گا۔"
    },
    {
        "poet": "Parveen Shakir",
        "poetUrdu": "پروین شاکر",
        "poetOrigin": "Karachi / Islamabad, Pakistan",
        "poetEra": "1952 – 1994",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "چلنے کا حوصلہ نہیں رکنا محال کر دیا\nعشق کے اس سفر نے تو مجھ کو نڈھال کر دیا",
        "englishTranslation": "I lack strength to walk further, yet halting has been rendered impossible; this path of love has left me utterly spent.",
        "urduTranslation": "آگے چلنے کی سکت نہیں اور رکنا محال ہے، محبت کے اس سفر نے مجھے بالکل نڈھال کر دیا ہے۔"
    },

    # NASIR KAZMI
    {
        "poet": "Nasir Kazmi",
        "poetUrdu": "ناصر کاظمی",
        "poetOrigin": "Ambala, India / Lahore, Pakistan",
        "poetEra": "1925 – 1972",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "گئے دنوں کا سراغ لے کر کدھر سے آیا کدھر گیا وہ\nعجیب مانوس اجنبی تھا مجھے تو حیران کر گیا وہ",
        "englishTranslation": "Carrying traces of bygone days, whence did he come and whither did he go? A familiar stranger who left me in awe.",
        "urduTranslation": "ماضی کی یادیں لیے وہ کہاں سے آیا اور کہاں چلا گیا، وہ ایسا اجنبی تھا جو اپنا بھی لگتا تھا اور مجھے حیرت میں ڈال گیا۔"
    },
    {
        "poet": "Nasir Kazmi",
        "poetUrdu": "ناصر کاظمی",
        "poetOrigin": "Ambala, India / Lahore, Pakistan",
        "poetEra": "1925 – 1972",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "شہر کی بے چراغ گلیوں میں\nزندگی منہ چھپائے پھرتی ہے",
        "englishTranslation": "In the lamp-less alleys of the city, life wanders hiding its face in sorrow.",
        "urduTranslation": "شہر کی اندھیری گلیوں میں زندگی مایوسی کے عالم میں منہ چھپائے پھر رہی ہے۔"
    },

    # HABIB JALIB
    {
        "poet": "Habib Jalib",
        "poetUrdu": "حبیب جالب",
        "poetOrigin": "Hoshiarpur, India / Lahore, Pakistan",
        "poetEra": "1928 – 1993",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "ایسے دستور کو صبحِ بے نور کو\nمیں نہیں مانتا میں نہیں جانتا",
        "englishTranslation": "Such unjust law, such cheerless dawn: I do not accept it, I do not acknowledge it!",
        "urduTranslation": "ظلم کے ایسے ضابطے اور روشنی سے محروم صبح کو میں تسلیم کرنے سے انکار کرتا ہوں۔"
    },
    {
        "poet": "Habib Jalib",
        "poetUrdu": "حبیب جالب",
        "poetOrigin": "Hoshiarpur, India / Lahore, Pakistan",
        "poetEra": "1928 – 1993",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "ظلم رہے اور امن بھی ہو کیا ممکن ہے تم ہی کہو\nخون بھی بہے اور بات نہ ہو کیا ممکن ہے تم ہی کہو",
        "englishTranslation": "Can tyranny persist alongside peace? You tell me, is it possible? Can blood flow without voices speaking?",
        "urduTranslation": "تم خود ہی فیصلہ کرو، کیا ظلم کے سائے میں امن قائم رہ سکتا ہے یا ناحق خون بہنے پر خاموشی ممکن ہے؟"
    },
    {
        "poet": "Habib Jalib",
        "poetUrdu": "حبیب جالب",
        "poetOrigin": "Hoshiarpur, India / Lahore, Pakistan",
        "poetEra": "1928 – 1993",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "تم سے پہلے وہ جو اک شخص یہاں تخت نشیں تھا\nاس کو بھی اپنے خدا ہونے پہ اتنا ہی یقیں تھا",
        "englishTranslation": "The ruler who sat upon the throne here before you: he too was just as convinced of his own invincibility.",
        "urduTranslation": "تجھ سے پہلے جو حکمران یہاں اقتدار پر بیٹھا تھا، اسے بھی اپنے خدا ہونے کا اتنا ہی زعم تھا۔"
    },

    # MOMIN KHAN MOMIN
    {
        "poet": "Momin Khan Momin",
        "poetUrdu": "مومن خاں مومن",
        "poetOrigin": "Delhi, India",
        "poetEra": "1800 – 1851",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "تم مرے پاس ہوتے ہو گویا\nجب کوئی دوسرا نہیں ہوتا",
        "englishTranslation": "You feel right beside me whenever there is no one else around.",
        "urduTranslation": "جب محفل میں کوئی دوسرا موجود نہیں ہوتا، تو یوں لگتا ہے جیسے تم میرے بالکل قریب ہو۔"
    },
    {
        "poet": "Momin Khan Momin",
        "poetUrdu": "مومن خاں مومن",
        "poetOrigin": "Delhi, India",
        "poetEra": "1800 – 1851",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اثر اس کو ذرا نہیں ہوتا\nرنج راحت فزا نہیں ہوتا",
        "englishTranslation": "My pleas leave them unmoved; nor does my grief ever turn into comforting ease.",
        "urduTranslation": "میری آہوں اور التجاؤں کا اس پر کوئی اثر نہیں ہوتا، اور یہ دکھ کبھی راحت میں تبدیل نہیں ہوتا۔"
    },

    # DAGH DEHLVI
    {
        "poet": "Dagh Dehlvi",
        "poetUrdu": "داغؔ دہلوی",
        "poetOrigin": "Delhi / Hyderabad, India",
        "poetEra": "1831 – 1905",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اردو ہے جس کا نام ہمیں جانتے ہیں داغؔ\nسارے جہاں میں دھوم ہماری زباں کی ہے",
        "englishTranslation": "Urdu is its name and we know its grace, O Dagh; throughout the entire world our melodious tongue is celebrated.",
        "urduTranslation": "اے داغ! ہمیں معلوم ہے کہ اردو کیسی میٹھی زبان ہے، جس کی شیرینی کی دھوم پوری دنیا میں مچی ہے۔"
    },
    {
        "poet": "Dagh Dehlvi",
        "poetUrdu": "داغؔ دہلوی",
        "poetOrigin": "Delhi / Hyderabad, India",
        "poetEra": "1831 – 1905",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "لطفِ مے تجھ سے کیا کہوں زاہد\nہائے کمبخت تو نے پی ہی نہیں",
        "englishTranslation": "How could I describe the delight of wine to you, pious ascetic? Alas, you have never tasted it!",
        "urduTranslation": "اے پارسا! تجھے بادۂ عشق کی لذت کا کیا علم، افسوس کہ تو نے محبت کا یہ جام کبھی چکھا ہی نہیں۔"
    },
    {
        "poet": "Dagh Dehlvi",
        "poetUrdu": "داغؔ دہلوی",
        "poetOrigin": "Delhi / Hyderabad, India",
        "poetEra": "1831 – 1905",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "خوب پردہ ہے کہ چلمن سے لگے بیٹھے ہیں\nصاف چھپتے بھی نہیں سامنے آتے بھی نہیں",
        "englishTranslation": "A curious veil indeed: sitting right behind the screen; neither fully hiding nor stepping openly into view.",
        "urduTranslation": "پردے کا بھی کیا انداز ہے کہ چلمن سے لگے بیٹھے ہیں؛ نہ تو مکمل چھپتے ہیں اور نہ ہی سامنے آتے ہیں۔"
    },

    # BAHADUR SHAH ZAFAR
    {
        "poet": "Bahadur Shah Zafar",
        "poetUrdu": "بہادر شاہ ظفر",
        "poetOrigin": "Delhi, India / Rangoon, Burma",
        "poetEra": "1775 – 1862",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "کتنا ہے بد نصیب ظفرؔ دفن کے لیے\nدو گز زمین بھی نہ ملی کوئے یار میں",
        "englishTranslation": "How unfortunate is Zafar, who could not receive even two yards of earth in the beloved homeland for burial.",
        "urduTranslation": "ظفر کیسی بدقسمتی ہے کہ آخری آرام گاہ کے لیے اپنے محبوب وطن میں دو گز زمین بھی نصیب نہ ہوئی۔"
    },
    {
        "poet": "Bahadur Shah Zafar",
        "poetUrdu": "بہادر شاہ ظفر",
        "poetOrigin": "Delhi, India / Rangoon, Burma",
        "poetEra": "1775 – 1862",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "عمرِ دراز مانگ کے لائے تھے چار دن\nدو آرزو میں کٹ گئے دو انتظار میں",
        "englishTranslation": "We had asked for a long life, yet received merely four days: two spent in desire, and two in waiting.",
        "urduTranslation": "ہم زندگی کی لمبی دعا مانگ کر لائے تھے لیکن وہ چار دن ثابت ہوئی؛ دو آرزوؤں میں بیت گئے اور دو انتظار میں۔"
    },
    {
        "poet": "Bahadur Shah Zafar",
        "poetUrdu": "بہادر شاہ ظفر",
        "poetOrigin": "Delhi, India / Rangoon, Burma",
        "poetEra": "1775 – 1862",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "لگتا نہیں ہے دل مرا اجڑے دیار میں\nکس کی بنی ہے عالمِ نا پائیدار میں",
        "englishTranslation": "My heart finds no solace in this desolate realm; who has ever found permanence in this transient world?",
        "urduTranslation": "اس اجڑے دیار میں میرا دل نہیں لگتا، اس ناپائیدار دنیا میں آخر کس کی خوشیاں سدا قائم رہی ہیں۔"
    },

    # SAHIR LUDHIANVI
    {
        "poet": "Sahir Ludhianvi",
        "poetUrdu": "ساحر لدھیانوی",
        "poetOrigin": "Ludhiana / Mumbai, India",
        "poetEra": "1921 – 1980",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "تعارف روگ بن جائے تو اس کا بھولنا بہتر\nتعلق بوجھ بن جائے تو اس کا توڑنا اچھا",
        "englishTranslation": "If an acquaintance turns into painful malady, it is better forgotten; if a relationship becomes a burden, it is best severed.",
        "urduTranslation": "اگر کوئی جان پہچان دل کا روگ بن جائے تو اسے بھلا دینا چاہیے، اور اگر رشتہ بوجھ بن جائے تو اسے ختم کر دینا بہتر ہے۔"
    },
    {
        "poet": "Sahir Ludhianvi",
        "poetUrdu": "ساحر لدھیانوی",
        "poetOrigin": "Ludhiana / Mumbai, India",
        "poetEra": "1921 – 1980",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "وہ افسانہ جسے انجام تک لانا نہ ہو ممکن\nاسے اک خوبصورت موڑ دے کر چھوڑنا اچھا",
        "englishTranslation": "That love story which cannot reach fulfillment: far better to give it a graceful turn and let it rest.",
        "urduTranslation": "جس کہانی کی تکمیل ممکن نہ ہو، اسے کسی خوبصورت موڑ پر باوقار طریقے سے الوداع کہہ دینا ہی دانشمندی ہے۔"
    },
    {
        "poet": "Sahir Ludhianvi",
        "poetUrdu": "ساحر لدھیانوی",
        "poetOrigin": "Ludhiana / Mumbai, India",
        "poetEra": "1921 – 1980",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "میں پل دو پل کا شاعر ہوں پل دو پل مری کہانی ہے\nپل دو پل مری ہستی ہے پل دو پل مری جوانی ہے",
        "englishTranslation": "I am a poet of a passing moment, a brief moment is my story; a fleeting moment is my existence and youth.",
        "urduTranslation": "میری حیثیت صرف پل دو پل کے شاعر کی ہے، وقت کا دھارا ہر گزرنے والے کے بعد نیا کارواں لے آتا ہے۔"
    },

    # KAIFI AZMI
    {
        "poet": "Kaifi Azmi",
        "poetUrdu": "کیفی اعظمی",
        "poetOrigin": "Azamgarh / Mumbai, India",
        "poetEra": "1919 – 2002",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "اٹھ مری جان مرے ساتھ ہی چلنا ہے تجھے\nقلبِ ماحول میں لرزہ سا فگن ہونا ہے",
        "englishTranslation": "Arise my beloved, you must walk beside me; we must ignite a tremor across this unjust world.",
        "urduTranslation": "اے میری ہم سفر اٹھو اور میرے قدم سے قدم ملا کر چلو، ہمیں اس پرانے نظام کی بنیادوں کو بدلنا ہے۔"
    },

    # JOSH MALIHABADI
    {
        "poet": "Josh Malihabadi",
        "poetUrdu": "جوش ملیح آبادی",
        "poetOrigin": "Malihabad, India / Islamabad, Pakistan",
        "poetEra": "1898 – 1982",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "کام ہے میرا تغیر، نام ہے میرا شباب\nنعرۂ بے باک ہوں میں، شورشِ بیدار ہوں",
        "englishTranslation": "My mission is revolution, my name is youth; I am a fearless battle-cry, an awakening storm!",
        "urduTranslation": "تبدیلی لانا میرا مقصد ہے اور نوجوانی میرا نام؛ میں ظلم کے خلاف ایک بے خوف نعرہ اور بیداری کی للکار ہوں۔"
    },

    # HASRAT MOHANI
    {
        "poet": "Hasrat Mohani",
        "poetUrdu": "حسرت موہانی",
        "poetOrigin": "Mohan / Kanpur, India",
        "poetEra": "1875 – 1951",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "چپکے چپکے رات دن آنسو بہانا یاد ہے\nہم کو اب تک عاشقی کا وہ زمانہ یاد ہے",
        "englishTranslation": "Silently weeping night and day is vivid in memory; I still remember that era of passionate love.",
        "urduTranslation": "محبت میں رات دن چپکے چپکے آنسو بہانا ہمیں خوب یاد ہے، اور اس عاشقی کا سارا زمانہ دل میں محفوظ ہے۔"
    },

    # JIGAR MORADABADI
    {
        "poet": "Jigar Moradabadi",
        "poetUrdu": "جگر مراد آبادی",
        "poetOrigin": "Moradabad, India",
        "poetEra": "1890 – 1960",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "یہ عشق نہیں آساں بس اتنا سمجھ لیجے\nاک آگ کا دریا ہے اور ڈوب کے جانا ہے",
        "englishTranslation": "Love is no easy road, understand just this: it is a river of fire through which one must plunge.",
        "urduTranslation": "محبت کوئی آسان راستہ نہیں، یہ تو آگ کا سمندر ہے جس میں خود کو فنا کر کے ہی منزل ملتی ہے۔"
    },

    # FIRAQ GORAKHPURI
    {
        "poet": "Firaq Gorakhpuri",
        "poetUrdu": "فراق گورکھپوری",
        "poetOrigin": "Gorakhpur / Allahabad, India",
        "poetEra": "1896 – 1982",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "بہت پہلے سے ان قدموں کی آہٹ جان لیتے ہیں\nتجھے اے زندگی ہم دور سے پہچان لیتے ہیں",
        "englishTranslation": "We sense the approach of those footsteps from afar; O life, we recognize you even across the distance.",
        "urduTranslation": "ہم دور ہی سے محبوب کی چاپ پہچان لیتے ہیں، اے زندگی ہم تجھے فاصلوں سے بھی بخوبی جان جاتے ہیں۔"
    },

    # IBN-E-INSHA
    {
        "poet": "Ibn-e-Insha",
        "poetUrdu": "ابنِ انشا",
        "poetOrigin": "Jalandhar, India / Karachi, Pakistan",
        "poetEra": "1927 – 1978",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "انشاؔ جی اٹھو اب کوچ کرو اس شہر میں جی کو لگانا کیا\nدیوانے ہوئے سرگرداں ہوئے اب چین سے جا کر سو رہنا",
        "englishTranslation": "Rise, Insha ji, and depart; why anchor your heart here? You wandered madly; now go and sleep in peace.",
        "urduTranslation": "اے انشا اب یہاں سے رخصت ہو جاؤ، اس بستی میں دل لگانے کا کیا حاصل؛ اب جا کر سکون کی نیند سو جاؤ۔"
    },

    # MOHSIN NAQVI
    {
        "poet": "Mohsin Naqvi",
        "poetUrdu": "محسن نقوی",
        "poetOrigin": "Dera Ghazi Khan / Lahore, Pakistan",
        "poetEra": "1947 – 1996",
        "originalLanguage": "ur",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "یہ دل جو تیرے نام سے دھڑکتا تھا کبھی\nاب اس میں تیرے سوا کوئی بھی نہیں رہتا",
        "englishTranslation": "This heart that once beat to your name: now no one dwells in it except your sacred memory.",
        "urduTranslation": "یہ دل جو کبھی تیرے نام سے دھڑکتا تھا، آج بھی اس ویرانے میں تیری یاد کے سوا کسی کا بسیرا نہیں۔"
    },

    # SAGHAR SIDDIQUI
    {
        "poet": "Saghar Siddiqui",
        "poetUrdu": "ساغر صدیقی",
        "poetOrigin": "Ambala, India / Lahore, Pakistan",
        "poetEra": "1928 – 1974",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "زندگی جبرِ مسلسل کی طرح کاٹی ہے\nجانے کس جرم کی پائی ہے سزا یاد نہیں",
        "englishTranslation": "I have spent life like an enduring sentence; for what transgression I was punished, I recall no more.",
        "urduTranslation": "ہم نے زندگی کو ایک مسلسل قید اور جبر کی طرح گزارا، یہ بھی یاد نہیں کہ کس خطا کی سزا بھگت رہے ہیں۔"
    },

    # SHAKEEL BADAYUNI
    {
        "poet": "Shakeel Badayuni",
        "poetUrdu": "شکیل بدایونی",
        "poetOrigin": "Badaun / Mumbai, India",
        "poetEra": "1916 – 1970",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "غمِ عاشقی سے کہہ دو کہ رہے پرے پرے ہی\nکہ یہاں تو زندگی بھی بڑی بے نقاب سی ہے",
        "englishTranslation": "Tell the griefs of love to keep distance; for here life itself is already exposed and raw.",
        "urduTranslation": "عشق کے غم کو کہو کہ ذرا دور رہے، کیونکہ یہاں تو خود زندگی کی الجھنیں ہی بے پناہ ہیں۔"
    },

    # QATEEL SHIFAI
    {
        "poet": "Qateel Shifai",
        "poetUrdu": "قتیل شفائی",
        "poetOrigin": "Haripur, Pakistan",
        "poetEra": "1919 – 2001",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "گرمیِ حسرتِ ناکام سے جل جاتے ہیں\nہم چراغوں کی طرح شام سے جل جاتے ہیں",
        "englishTranslation": "From the burning of unfulfilled longing we burn; like solitary lamps, we ignite as evening falls.",
        "urduTranslation": "ہم اپنی ادھوری آرزوؤں کی تپش سے جلتے ہیں، اور شام ہوتے ہی چراغ کی مانند سلگ اٹھتے ہیں۔"
    },

    # NIDA FAZLI
    {
        "poet": "Nida Fazli",
        "poetUrdu": "ندا فاضلی",
        "poetOrigin": "Gwalior / Mumbai, India",
        "poetEra": "1938 – 2016",
        "originalLanguage": "ur",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "کبھی کسی کو مکمل جہاں نہیں ملتا\nکہیں زمیں تو کہیں آسماں نہیں ملتا",
        "englishTranslation": "No one ever receives a complete world; somewhere earth is missing, somewhere the sky.",
        "urduTranslation": "اس دنیا میں کسی کو بھی سب کچھ مکمل نہیں ملتا، کسی کو زمین کم پڑتی ہے تو کسی کو آسمان نصیب نہیں ہوتا۔"
    },

    # BASHIR BADR
    {
        "poet": "Bashir Badr",
        "poetUrdu": "بشیر بدر",
        "poetOrigin": "Kanpur / Bhopal, India",
        "poetEra": "1935 – Present",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اجالے اپنی یادوں کے ہمارے ساتھ رہنے دو\nنہ جانے کس گلی میں زندگی کی شام ہو جائے",
        "englishTranslation": "Leave the soft illuminations of your memories beside me; who knows in which street life's dusk may fall?",
        "urduTranslation": "اپنی یادوں کی روشنی میرے ساتھ رہنے دو، معلوم نہیں زندگی کی شام کس گلی میں ہو جائے۔"
    },

    # RAHAT INDORI
    {
        "poet": "Rahat Indori",
        "poetUrdu": "راحت اندوری",
        "poetOrigin": "Indore, India",
        "poetEra": "1950 – 2020",
        "originalLanguage": "ur",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "سبھی کا خون ہے شامل یہاں کی مٹی میں\nکسی کے باپ کا ہندوستاں تھوڑی ہے",
        "englishTranslation": "The blood of everyone is mingled in this soil; this land belongs exclusively to no single power!",
        "urduTranslation": "اس دھرتی کی مٹی میں ہر فرد کا لہو شامل ہے، یہ وطن سب کا مشترکہ گھر ہے۔"
    },

    # WASIF ALI WASIF
    {
        "poet": "Wasif Ali Wasif",
        "poetUrdu": "واصف علی واصف",
        "poetOrigin": "Khushab / Lahore, Pakistan",
        "poetEra": "1929 – 1993",
        "originalLanguage": "ur",
        "category": "dua",
        "categoryLabel": "Dua & Blessings",
        "originalText": "کرم کی اک نظر مولا ہمارے حال پر کر دے\nدلِ بے تاب کو اپنے کرم سے پر سکوں کر دے",
        "englishTranslation": "Cast a single glance of grace, O Master, upon our state; grant profound peace to this restless heart.",
        "urduTranslation": "اے پروردگار! اپنے لطف و کرم کی ایک نگاہ فرما اور ہمارے بے چین دل کو سکون اور اطمینان عطا کر۔"
    },

    # AMJAD ISLAM AMJAD
    {
        "poet": "Amjad Islam Amjad",
        "poetUrdu": "امجد اسلام امجد",
        "poetOrigin": "Lahore, Pakistan",
        "poetEra": "1944 – 2023",
        "originalLanguage": "ur",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اگر کبھی میری یاد آئے تو چاند راتوں کی نرم چاندنی میں\nدبے قدم تم چلے ہی آنا، کہ منتظر ہے نگاہ میری",
        "englishTranslation": "If ever you recall my memory, come softly amidst moonlit nights; my gaze forever waits for you.",
        "urduTranslation": "اگر کبھی میری یاد آئے تو چاندنی راتوں میں خاموشی سے چلے آنا، کہ میری نگاہیں تمہارے انتظار میں لگی ہیں۔"
    },

    # PUNJABI
    {
        "poet": "Baba Bulleh Shah",
        "poetUrdu": "بابا بلھے شاہ",
        "poetOrigin": "Kasur, Punjab",
        "poetEra": "1680 – 1757",
        "originalLanguage": "pa",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "نہ کر خودی گمان نی کڑئے، خالی ہتھ سدھاریں گی\nاک دن مٹی دے وچ ملنا، ایتھے کی کجھ ہاریں گی",
        "englishTranslation": "Harbor no vain pride, dear soul; with empty hands you shall depart. One day you must return to earth—why lose humility here?",
        "urduTranslation": "اے انسان تکبر و غرور نہ کر، آخر کار خالی ہاتھ ہی رخصت ہونا ہے؛ ایک دن مٹی میں ملنا ہے تو یہاں نیکی اور عاجزی کیوں نہ کمائی جائے؟"
    },
    {
        "poet": "Baba Bulleh Shah",
        "poetUrdu": "بابا بلھے شاہ",
        "poetOrigin": "Kasur, Punjab",
        "poetEra": "1680 – 1757",
        "originalLanguage": "pa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "جے توں اپنے یار نوں پاویں، سولی تے چڑھ کے ویکھ لے\nعشق نہ پچھے ذات صفاتاں، دل نال دل نوں جوڑ لے",
        "englishTranslation": "If you wish to attain your Beloved, look upon the path of sacrifice; true love cares nothing for lineage, it binds heart to heart.",
        "urduTranslation": "اگر تم اپنے محبوب کو پانا چاہتے ہو تو ایثار و قربانی کے راستے پر چلو؛ عشق ذات پات نہیں پوچھتا بلکہ دلوں کو دلوں سے جوڑتا ہے۔"
    },
    {
        "poet": "Baba Bulleh Shah",
        "poetUrdu": "بابا بلھے شاہ",
        "poetOrigin": "Kasur, Punjab",
        "poetEra": "1680 – 1757",
        "originalLanguage": "pa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "اٹھ گئے گوانڈھوں یار ربّا ہن کی کریئے\nپھوک مصلّی بھن سٹ کاسہ، عشقے دا کوئی تیر چلا",
        "englishTranslation": "The beloved neighbor has departed, O Lord, what shall I do now? Cast away rituals and kindle the arrow of authentic love!",
        "urduTranslation": "پڑوس سے محبوب بچھڑ گیا، اے خدا اب ہم کیا کریں؛ ظاہری رسومات چھوڑ کر عشق کی سچی آگ اپنے اندر جلاؤ۔"
    },
    {
        "poet": "Sultan Bahu",
        "poetUrdu": "سلطان باہو",
        "poetOrigin": "Shorekot, Jhang, Punjab",
        "poetEra": "1628 – 1691",
        "originalLanguage": "pa",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "نئیں جے رب ملدا نہاتے دھوتیاں، ملدا ڈڈواں مچھیاں ھو\nجے رب ملدا جنگل بیلے، ملدا گائیں وچھیاں ھو",
        "englishTranslation": "If God were found merely through ritual baths, frogs and fish would find Him; if in lonely jungles, the grazing calves would find Him!",
        "urduTranslation": "اگر رب صرف ظاہری نہانے دھونے سے ملتا تو مینڈک اور مچھلیاں پا لیتیں، اور اگر جنگلوں میں ملتا تو گائیں بچھڑے پا لیتے؛ رب تو سچے دل میں ملتا ہے۔"
    },
    {
        "poet": "Waris Shah",
        "poetUrdu": "سید وارث شاہ",
        "poetOrigin": "Jandiala Sher Khan, Punjab",
        "poetEra": "1722 – 1798",
        "originalLanguage": "pa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "وارث شاہ لُکائیے کِنج اس نوں، جیہڑا عشق چھپایا نئیں لُکدا\nچن چڑھیا کدی نہ لُکے بدلیں، دریا دا وگنا نئیں مُکدا",
        "englishTranslation": "O Waris Shah, how could one conceal love that can never be hidden? The risen moon cannot hide in clouds, nor can a river cease flowing.",
        "urduTranslation": "اے وارث شاہ! عشق کو کیسے چھپایا جائے جو چھپائے نہیں چھپتا؛ چاند بادلوں میں نہیں چھپ سکتا اور دریا کبھی بہنے سے نہیں رکتا۔"
    },
    {
        "poet": "Mian Muhammad Bakhsh",
        "poetUrdu": "میاں محمد بخش",
        "poetOrigin": "Mirpur, Kashmir / Punjab",
        "poetEra": "1830 – 1907",
        "originalLanguage": "pa",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "خاصاں دی گل عاماں اگے، نئیں مناسب کرنی\nمٹھی کھیر پکا محمدؔ، کُتیاں اگے دھرنی",
        "englishTranslation": "Sharing wisdom of the enlightened with the unheeding is unwise; like preparing sweet pudding and placing it before dogs.",
        "urduTranslation": "معرفت اور حکمت کی گہری باتیں بے قدرے لوگوں کے سامنے کرنا ایسا ہی ہے جیسے میٹھی کھیر پکا کر قدر نہ جاننے والوں کے سامنے رکھ دی جائے۔"
    },
    {
        "poet": "Mian Muhammad Bakhsh",
        "poetUrdu": "میاں محمد بخش",
        "poetOrigin": "Mirpur, Kashmir / Punjab",
        "poetEra": "1830 – 1907",
        "originalLanguage": "pa",
        "category": "dosti",
        "categoryLabel": "Friendship & Loyalty",
        "originalText": "جیڑھے لوک نہ قدر پچھانن، اوہناں کول نہ بہیئے\nاوکھے ویلے نال کھلووے، اوہی سجن کہیئے",
        "englishTranslation": "Do not keep company with those who fail to recognize true worth; only he who stands steadfast in trial is a true friend.",
        "urduTranslation": "جو لوگ قدر نہیں پہچانتے ان کی صحبت میں نہ بیٹھو؛ سچا دوست وہی ہے جو مشکل وقت میں تمہارے ساتھ مضبوطی سے کھڑا رہے۔"
    },
    {
        "poet": "Amrita Pritam",
        "poetUrdu": "امرتا پریتم",
        "poetOrigin": "Gujranwala / Delhi",
        "poetEra": "1919 – 2005",
        "originalLanguage": "pa",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "اج آکھاں وارث شاہ نوں، کِتھوں قبراں وچوں بول\nتے اج کتابِ عشق دا، کوئی اگلا ورقہ پھول",
        "englishTranslation": "Today I call upon Waris Shah: speak out from your grave! Turn to the next tragic page in the grand book of love!",
        "urduTranslation": "آج میں وارث شاہ کو پکارتی ہوں کہ قبر سے بول اٹھو، اور آج محبت اور انسانیت کی کتاب کا اگلا درد بھرا صفحہ کھولو۔"
    },
    {
        "poet": "Munir Niazi",
        "poetUrdu": "منیر نیازی",
        "poetOrigin": "Khanpur, India / Lahore, Pakistan",
        "poetEra": "1928 – 2006",
        "originalLanguage": "pa",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "کج شہر دے لوک وی ظالم سن، کج سانوں مرن دا شوق وی سی\nاک ہور دریا دا سامنا سی منیرؔ مینوں، اک پار کیتا تاں ویکھیا میں",
        "englishTranslation": "Partly the citizens were cruel, partly I too harbored a fatal desire; once I crossed one river, O Munir, another river stood before me.",
        "urduTranslation": "کچھ تو شہر کے لوگ بے درد تھے اور کچھ ہمیں بھی وفا میں فنا ہونے کی چاہ تھی؛ اے منیر! ابھی ایک دریا پار کیا ہی تھا کہ آگے دوسرا دریا کھڑا ملا۔"
    },
    {
        "poet": "Shah Hussain",
        "poetUrdu": "شاہ حسین",
        "poetOrigin": "Lahore, Punjab",
        "poetEra": "1538 – 1599",
        "originalLanguage": "pa",
        "category": "dard",
        "categoryLabel": "Sorrow & Longing",
        "originalText": "مائے نی میں کینوں آکھاں درد وچھوڑے دا حال نی\nدکھاں دی روٹی سولاں دا سالن، ہڈاں دا بالن بال نی",
        "englishTranslation": "O mother, to whom shall I tell the agony of my separation? Bread of sorrow, curry of thorns, and the fire lit with bones.",
        "urduTranslation": "اے ماں! میں اپنے دل کا دکھ اور ہجر کا درد کسے سناؤں، میرے دکھوں کی روٹی ہے اور کانٹوں کا سالن ہے۔"
    },
    {
        "poet": "Khwaja Ghulam Farid",
        "poetUrdu": "خواجہ غلام فرید",
        "poetOrigin": "Chacharan Sharif, Punjab",
        "poetEra": "1845 – 1901",
        "originalLanguage": "pa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "روہی دی ریت تے روواں رانجھن یار پئی ڈھونڈاں\nسہج سہاگ سہاوا تھیوے، پریم نگر دی پیت نبھاواں",
        "englishTranslation": "Upon the sands of the Rohi desert I weep, searching for my beloved Ranjhan; let divine love grace my existence.",
        "urduTranslation": "چولستان کے صحراؤں میں رانجھن کی تلاش میں روتی پھرتی ہوں، کاش محبت کا یہ سفر منزل تک پہنچ جائے۔"
    },

    # ARABIC
    {
        "poet": "Al-Mutanabbi",
        "poetUrdu": "المتنبی",
        "poetOrigin": "Kufa, Iraq",
        "poetEra": "915 – 965",
        "originalLanguage": "ar",
        "category": "inqilab",
        "categoryLabel": "Revolution & Hope",
        "originalText": "الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني\nوَالسّيفُ وَالرّمحُ والقرْطاسُ وَالقَلَمُ",
        "englishTranslation": "The horses, the dark night, and the desert know me well; as do the sword, the spear, the parchment, and the pen.",
        "urduTranslation": "گھوڑے، تاریک رات اور صحرا مجھے خوب پہچانتے ہیں؛ اور تلوار، نیزہ، کاغذ اور قلم بھی میری فصاحت و شجاعت کے گواہ ہیں۔"
    },
    {
        "poet": "Al-Mutanabbi",
        "poetUrdu": "المتنبی",
        "poetOrigin": "Kufa, Iraq",
        "poetEra": "915 – 965",
        "originalLanguage": "ar",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "عَلى قَدْرِ أهْلِ العَزْم تأتي العَزائِمُ\nوَتأتِي علَى قَدْرِ الكِرامِ المَكارمُ",
        "englishTranslation": "Noble endeavors are realized according to the resolve of great souls; generous deeds correspond to the magnanimity of the honorable.",
        "urduTranslation": "عظیم کارنامے بلند حوصلہ اور باہمت انسانوں کے عزم کے مطابق انجام پاتے ہیں، اور عزت والے لوگ ہی عظیم مقاصد حاصل کرتے ہیں۔"
    },

    # PERSIAN
    {
        "poet": "Saadi Shirazi",
        "poetUrdu": "سعدی شیرازی",
        "poetOrigin": "Shiraz, Iran",
        "poetEra": "1210 – 1291",
        "originalLanguage": "fa",
        "category": "falsafa",
        "categoryLabel": "Philosophy & Reflection",
        "originalText": "بنی‌آدم اعضای یکدیگرند\nکه در آفرینش ز یک گوہرند",
        "englishTranslation": "Human beings are members of one body, for in creation they are born of one essence.",
        "urduTranslation": "تمام انسان ایک دوسرے کے اعضا کی مانند ہیں کیونکہ ان کی تخلیق ایک ہی جوہر سے ہوئی ہے۔"
    },
    {
        "poet": "Saadi Shirazi",
        "poetUrdu": "سعدی شیرازی",
        "poetOrigin": "Shiraz, Iran",
        "poetEra": "1210 – 1291",
        "originalLanguage": "fa",
        "category": "dosti",
        "categoryLabel": "Friendship & Loyalty",
        "originalText": "درخت دوستی بنشان که کام دل به بار آرد\nنهال دشمنی برکن که رنج بی‌شمار آرد",
        "englishTranslation": "Plant the tree of friendship so that heart's desires may blossom into fruit; uproot enmity, for it brings boundless grief.",
        "urduTranslation": "دوستی کا درخت لگاؤ تاکہ دل کی مراد کا میٹھا پھل ملے، اور دشمنی کے پودے کو جڑ سے اکھاڑ پھینکو جو بے انتہا دکھ دیتا ہے۔"
    },
    {
        "poet": "Jalaluddin Rumi",
        "poetUrdu": "مولانا جلال الدین رومی",
        "poetOrigin": "Balkh / Konya",
        "poetEra": "1207 – 1273",
        "originalLanguage": "fa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند",
        "englishTranslation": "Listen to the reed flute as it tells its tale, lamenting the bitter pain of separation from its source.",
        "urduTranslation": "بانسری کی آواز سنو جب وہ اپنی بپتا سناتی ہے اور اصل وطن سے بچھڑنے کا نوحہ بیان کرتی ہے۔"
    },
    {
        "poet": "Amir Khusro",
        "poetUrdu": "امیر خسرو",
        "poetOrigin": "Patiyali / Delhi, India",
        "poetEra": "1253 – 1325",
        "originalLanguage": "fa",
        "category": "ishq",
        "categoryLabel": "Love & Romance",
        "originalText": "نمی دانم چہ منزل بود شب جائے کہ من بودم\nبہ ہر سو رقصِ بسمل بود شب جائے کہ من بودم",
        "englishTranslation": "I know not what sublime station it was where I stayed last night; on every side danced the ecstatic victims of divine love.",
        "urduTranslation": "میں نہیں جانتا کہ گزشتہ رات میں کس روحانی مقام پر تھا، جہاں ہر طرف دیدارِ الٰہی کے پیاسے والہانہ رقص میں محو تھے۔"
    }
]
