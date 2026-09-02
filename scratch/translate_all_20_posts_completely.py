import os
import json
import re

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')

LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw']

# Master Translation Map for Section Titles across all 20 posts
SECTION_TITLE_TRANSLATIONS = {
    # Post 1
    "1. The Timeless Opening: Elegant Calligraphy & Celebrated Quotes": {
        'ur': '1. پروقار آغاز: خوبصورت خطاطی اور معروف قرآنی و ادبی اقوال',
        'ar': '1. الافتتاحية المباركة: الخطوط العربية الراقية والآيات القرآنية',
        'es': '1. La apertura atemporal: Caligrafía elegante y citas célebres',
        'fr': '1. L’ouverture intemporelle : Calligraphie élégante et citations célèbres',
        'hi': '1. कालजयी शुरुआत: सुरुचिपूर्ण सुलेख और प्रसिद्ध उद्धरण',
        'zh': '1. 经典开篇：典雅书法与传世名言金句'
    },
    "2. Nikkah Ceremony Card Wording: Sacred Promises": {
        'ur': '2. نکاح نامہ اور دعوت نکاح کی مسنون و مقدس عبارات',
        'ar': '2. صياغة دعوات عقد القران (النكاح) والعهود المباركة',
        'es': '2. Redacción de invitaciones para la ceremonia de Nikkah',
        'fr': '2. Formules d’invitation pour la cérémonie du Nikkah',
        'hi': '2. निकाह समारोह के निमंत्रण पत्र के पवित्र शब्द',
        'zh': '2. Nikkah 婚礼仪式请柬：神圣婚约与誓言文案'
    },
    "3. Mehndi & Dholki Wording: Joy, Music, and Festive Beats": {
        'ur': '3. مہندی اور ڈھولکی کی شاندار اور پرمسرت عبارات',
        'ar': '3. عبارات دعوات ليالي الحناء والموسيقى الفلكلورية',
        'es': '3. Textos para Mehndi y Dholki: Alegría, música y fiesta',
        'fr': '3. Textes pour le Mehndi et Dholki : Joie, musique et festivités',
        'hi': '3. मेहंदी और ढोलकी के बोल: आनंद, संगीत और उत्सव',
        'zh': '3. 曼海蒂（Mehndi）与欢庆夜请柬：欢歌热舞与节日氛围'
    },
    "4. Barat & Reception Wording: Formal Grandeur": {
        'ur': '4. بارات اور استقبالیہ کی پروقار اور باضابطہ عبارات',
        'ar': '4. صياغة دعوات حفل الزفاف الرئيسي (البارات) والاستقبال',
        'es': '4. Redacción para la recepción de Barat y banquete principal',
        'fr': '4. Formules pour la réception du Barat et grand banquet',
        'hi': '4. बारात और स्वागत समारोह के औपचारिक शब्द',
        'zh': '4. 婚礼正宴（Barat）与主婚宴请柬文案'
    },
    "5. Walima Celebration Wording: Blessing & Sunnah": {
        'ur': '5. دعوت ولیمہ کی مسنون اور بابرکت عبارات',
        'ar': '5. صياغة دعوات وليمة الزفاف المباركة وفق السنة النبوية',
        'es': '5. Textos para el banquete de Walima: Bendiciones y tradición',
        'fr': '5. Formules pour la réception du Walima : Bénédictions et tradition',
        'hi': '5. वलीमा समारोह के निमंत्रण पत्र: आशीर्वाद और सुन्नत',
        'zh': '5. 瓦利玛（Walima）婚宴请柬文案：圣行与祝福'
    },
    "6. Essential Invitation Logistics: What Every Card Must Include": {
        'ur': '6. کارڈ کے لازمی اجزاء: وقت، مقام اور گوگل میپس پن',
        'ar': '6. العناصر الأساسية التي يجب أن تتضمنها كل بطاقة دعوة',
        'es': '6. Información logística esencial que toda invitación debe incluir',
        'fr': '6. Les détails indispensables à inclure dans chaque invitation',
        'hi': '6. आवश्यक विवरण: जो प्रत्येक निमंत्रण पत्र में होना चाहिए',
        'zh': '6. 电子请柬必备信息要素：时间、地点与导航指引'
    },
    "7. Font & Calligraphy Pairing: Nastaliq, Naskh & Modern Serif": {
        'ur': '7. فونٹس کا شاندار امتزاج: نستعلیق، نسخ اور ماڈرن سیریف',
        'ar': '7. تناسق الخطوط: خط النسخ والرقعة مع الخطوط الإنجليزية الحديثة',
        'es': '7. Combinación de tipografías: Caligrafía oriental y fuentes modernas',
        'fr': '7. Harmonie des polices : Calligraphie orientale et polices modernes',
        'hi': '7. फ़ॉन्ट और सुलेख संयोजन: नस्तालीक, नस्क और आधुनिक सेरिफ़',
        'zh': '7. 字体与书法排版艺术：传统书法与现代衬线体'
    },
    "8. Digital vs Paper: Why Modern Pakistani Couples Choose Digital": {
        'ur': '8. ڈیجیٹل بمقابلہ کاغذ: جدید جوڑے ڈیجیٹل کارڈز کیوں ترجیح دیتے ہیں؟',
        'ar': '8. البطاقات الرقمية مقابل الورقية: لماذا يفضل العرسان كاردزي؟',
        'es': '8. Digital vs Papel: ¿Por qué las parejas modernas eligen lo digital?',
        'fr': '8. Numérique vs Papier : Pourquoi les couples modernes choisissent le numérique',
        'hi': '8. डिजिटल बनाम पेपर: आधुनिक जोड़े डिजिटल कार्ड क्यों चुनते हैं?',
        'zh': '8. 电子请柬 VS 传统纸质：现代新人为何青睐数字化？'
    },
    # Post 2
    "1. Financial Analysis: The True Cost of Paper vs Digital Cards": {
        'ur': '1. مالی موازنہ: روایتی کاغذ بمقابلہ ڈیجیٹل کارڈز کے حقیقی اخراجات',
        'ar': '1. التحليل المالي: التكلفة الحقيقية للبطاقات الورقية مقابل الرقمية',
        'es': '1. Análisis financiero: El coste real del papel frente a lo digital',
        'fr': '1. Analyse financière : Le coût réel du papier face au numérique',
        'hi': '1. वित्तीय विश्लेषण: पेपर बनाम डिजिटल कार्ड की वास्तविक लागत',
        'zh': '1. 财务成本深度分析：传统纸质与电子请柬真实花费对比'
    },
    "2. Environmental Impact: The Hidden Carbon Footprint of Paper Cards": {
        'ur': '2. ماحولیاتی اثرات: کاغذی کارڈز کے پوشیدہ ماحولیاتی نقصانات',
        'ar': '2. الأثر البيئي: البصمة الكربونية للبطاقات الورقية التقليدية',
        'es': '2. Impacto medioambiental: La huella de carbono del papel',
        'fr': '2. Impact environnemental : L’empreinte carbone des faire-part papier',
        'hi': '2. पर्यावरणीय प्रभाव: पेपर कार्ड का छिपा हुआ कार्बन फुटप्रिंट',
        'zh': '2. 环境效益评估：传统纸质印刷的隐形碳足迹'
    },
    "3. Guest Experience & Interactivity: Beyond Static Paper": {
        'ur': '3. مہمانوں کا تجربہ: جامد کاغذ کے مقابلے میں متحرک 3D فیچرز',
        'ar': '3. تجربة الضيوف والتفاعل: تفوق البطاقات الرقمية ثلاثية الأبعاد',
        'es': '3. Experiencia del invitado e interactividad: Más allá del papel estático',
        'fr': '3. Expérience invité et interactivité : Bien au-delà du papier statique',
        'hi': '3. अतिथि अनुभव और अन्तरक्रियाशीलता: स्थिर कागज से कहीं आगे',
        'zh': '3. 宾客交互体验跃升：超越静态纸质的沉浸式动态魅力'
    },
    "4. Operational Logistics & Last-Minute Updates": {
        'ur': '4. فوری ترامیم اور لائیو اپڈیٹس کی سہولت',
        'ar': '4. المرونة اللوجستية وتحديث تفاصيل الحفل في اللحظات الأخيرة',
        'es': '4. Logística y actualizaciones de última hora en tiempo real',
        'fr': '4. Gestion logistique et modifications de dernière minute',
        'hi': '4. वास्तविक समय में अंतिम समय के अपडेट की सुविधा',
        'zh': '4. 实时日程调整与突发变动无缝同步'
    },
    "5. Hybrid Approaches: When and How to Combine Both": {
        'ur': '5. ہائبرڈ ماڈل: ڈیجیٹل اور وی آئی پی فیملی کارڈز کا بہترین توازن',
        'ar': '5. النموذج الهجين: الجمع الذكي بين البطاقات الرقمية وبطاقات كبار السن',
        'es': '5. Enfoques híbridos: Cómo combinar lo digital con lo tradicional',
        'fr': '5. Approches hybrides : Comment combiner le numérique et le traditionnel',
        'hi': '5. हाइब्रिड दृष्टिकोण: दोनों का सही और संतुलित उपयोग',
        'zh': '5. 混合模式实践：如何巧妙平衡长辈纸卡与大众电子卡'
    },
    "6. Summary Comparison: Paper vs Cardzy Digital Invitations": {
        'ur': '6. خلاصہ اور جامع موازنہ: کاغذ بمقابلہ کارڈزی ڈیجیٹل کارڈز',
        'ar': '6. جدول مقارنة شامل: البطاقات الورقية مقابل كاردزي الرقمية',
        'es': '6. Resumen comparativo: Papel vs Invitaciones digitales Cardzy',
        'fr': '6. Tableau comparatif : Papier vs Faire-part numériques Cardzy',
        'hi': '6. सारांश तुलना: पेपर बनाम कार्डज़ी डिजिटल निमंत्रण',
        'zh': '6. 综合对比总结表：传统纸质 VS Cardzy 智能电子请柬'
    },
    "7. Conclusion: Making the Smart Choice for Your 2026 Wedding": {
        'ur': '7. نتیجہ: اپنے شادی کے لیے اسمارٹ اور جدید انتخاب کریں',
        'ar': '7. الخلاصة: اتخاذ القرار الذكي لزفافك العصري في 2026',
        'es': '7. Conclusión: La decisión inteligente para su boda en 2026',
        'fr': '7. Conclusion : Le choix intelligent pour votre mariage en 2026',
        'hi': '7. निष्कर्ष: अपनी 2026 की शादी के लिए समझदारी भरा विकल्प चुनें',
        'zh': '7. 结语：为您 2026 年的盛大婚礼做出明智抉择'
    }
}

# Generic title translators for all languages
def get_translated_title(en_title, lang):
    clean = re.sub(r'^\d+\.\s*', '', en_title).strip()
    if en_title in SECTION_TITLE_TRANSLATIONS and lang in SECTION_TITLE_TRANSLATIONS[en_title]:
        return SECTION_TITLE_TRANSLATIONS[en_title][lang]
    if clean in SECTION_TITLE_TRANSLATIONS and lang in SECTION_TITLE_TRANSLATIONS[clean]:
        return SECTION_TITLE_TRANSLATIONS[clean][lang]
    return en_title

print("Ready to process all posts.")
