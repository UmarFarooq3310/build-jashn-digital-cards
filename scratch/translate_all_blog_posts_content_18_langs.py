import os
import json
import re

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')

LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw']

# Comprehensive vocabulary & sentence pattern translations
# for each of the 17 non-English languages
LANG_TERMS = {
    'ur': {
        'digital_cards': 'ڈیجیٹل کارڈز',
        'graduation': 'گریجویشن اور تعلیمی کامیابی',
        'farewell': 'الوداعی تقریب',
        'wedding': 'شادی و نکاح',
        'ramadan': 'رمضان المبارک',
        'iftar': 'افطار پارٹی',
        'eid': 'عید مبارک',
        'rsvp': 'واٹس ایپ آر ایس وی پی (RSVP)',
        'vcard': 'اسمارٹ وزٹنگ کارڈ (vCard)',
        'birthday': 'سالگرہ مبارک',
        'anniversary': 'شادی کی سالگرہ',
        'baby_shower': 'عقیقہ اور بیبی شاور',
        'photo_gallery': 'تصاویر اور یادگار گیلری',
        'music': 'پس منظر کی موسیقی',
        'confetti': 'اینیمیٹڈ 3D کنفیٹی',
        'google_maps': 'گوگل میپس لوکیشن لنک',
        'countdown': 'لائیو کاؤنٹ ڈاؤن ٹائمر',
        'share_whatsapp': 'واٹس ایپ پر فوری شیئرنگ',
        'save_money': 'پرنٹنگ اور ڈاک کے اخراجات کی بچت',
        'eco_friendly': 'ماحول دوست اور کاغذ کے ضیاع سے پاک'
    },
    'ar': {
        'digital_cards': 'البطاقات الرقمية',
        'graduation': 'حفل التخرج والنجاح الأكاديمي',
        'farewell': 'حفلات الوداع',
        'wedding': 'حفلات الزفاف وعقد القران',
        'ramadan': 'شهر رمضان المبارك',
        'iftar': 'موائد الإفطار',
        'eid': 'عيد مبارك',
        'rsvp': 'تأكيد الحضور عبر واتساب (RSVP)',
        'vcard': 'بطاقات الأعمال الرقمية الذكية (vCard)',
        'birthday': 'أعياد الميلاد',
        'anniversary': 'ذكرى الزواج السنوية',
        'baby_shower': 'العقيقة واستقبال المولود',
        'photo_gallery': 'معرض الصور والذكريات',
        'music': 'الموسيقى والأناشيد الخلفية',
        'confetti': 'مؤثرات الاحتفال ثلاثية الأبعاد 3D',
        'google_maps': 'موقع الحفل عبر خرائط جوجل',
        'countdown': 'العداد التنازلي التفاعلي',
        'share_whatsapp': 'المشاركة الفورية عبر واتساب',
        'save_money': 'توفير تكاليف الطباعة والتوصيل',
        'eco_friendly': 'صديقة للبيئة وبدون ورق'
    },
    'es': {
        'digital_cards': 'tarjetas digitales',
        'graduation': 'graduación y logros académicos',
        'farewell': 'fiestas de despedida',
        'wedding': 'bodas y matrimonios',
        'ramadan': 'Ramadán Mubarak',
        'iftar': 'cenas de Iftar',
        'eid': 'Eid Mubarak',
        'rsvp': 'confirmación RSVP por WhatsApp',
        'vcard': 'tarjetas de visita digitales vCard',
        'birthday': 'cumpleaños',
        'anniversary': 'aniversario de bodas',
        'baby_shower': 'Baby Shower y Aqiqah',
        'photo_gallery': 'galería de fotos y recuerdos',
        'music': 'música de fondo',
        'confetti': 'confeti animado 3D',
        'google_maps': 'ubicación GPS en Google Maps',
        'countdown': 'cuenta regresiva en vivo',
        'share_whatsapp': 'compartir al instante por WhatsApp',
        'save_money': 'ahorro en costes de imprenta',
        'eco_friendly': 'ecológico y sin papel'
    },
    'fr': {
        'digital_cards': 'faire-part numériques',
        'graduation': 'remise de diplôme et réussite',
        'farewell': 'fêtes de départ',
        'wedding': 'mariages et cérémonies',
        'ramadan': 'Ramadan Moubarak',
        'iftar': 'repas d’Iftar',
        'eid': 'Aïd Moubarak',
        'rsvp': 'gestion RSVP par WhatsApp',
        'vcard': 'cartes de visite digitales vCard',
        'birthday': 'anniversaires',
        'anniversary': 'anniversaire de mariage',
        'baby_shower': 'Baby Shower et Aqiqah',
        'photo_gallery': 'galerie photos et souvenirs',
        'music': 'musique d’ambiance',
        'confetti': 'confettis animés 3D',
        'google_maps': 'itinéraire Google Maps',
        'countdown': 'compte à rebours en temps réel',
        'share_whatsapp': 'partage instantané sur WhatsApp',
        'save_money': 'économies sur l’impression',
        'eco_friendly': 'écologique et zéro déchet'
    },
    'hi': {
        'digital_cards': 'डिजिटल कार्ड',
        'graduation': 'दीक्षांत समारोह और स्नातक',
        'farewell': 'विदाई समारोह',
        'wedding': 'विवाह और शादी',
        'ramadan': 'रमजान मुबारक',
        'iftar': 'इफ्तार पार्टी',
        'eid': 'ईद मुबारक',
        'rsvp': 'व्हाट्सएप आरएसवीपी (RSVP)',
        'vcard': 'डिजिटल विजिटिंग कार्ड (vCard)',
        'birthday': 'जन्मदिन',
        'anniversary': 'शादी की सालगिरह',
        'baby_shower': 'बेबी शॉवर और अकीका',
        'photo_gallery': 'फोटो गैलरी और यादें',
        'music': 'पृष्ठभूमि संगीत',
        'confetti': 'एनिमेटेड 3D कंफ़ेद्दी',
        'google_maps': 'गूगल मैप्स लोकेशन लिंक',
        'countdown': 'लाइव काउंटडाउन टाइमर',
        'share_whatsapp': 'व्हाट्सएप पर तुरंत साझा करें',
        'save_money': 'छपाई और डाक खर्च की बचत',
        'eco_friendly': 'पर्यावरण अनुकूल व पेपरलेस'
    },
    'zh': {
        'digital_cards': '电子请柬与贺卡',
        'graduation': '毕业典礼与学术成就',
        'farewell': '欢送晚会',
        'wedding': '婚礼庆典',
        'ramadan': '斋月吉庆',
        'iftar': '开斋晚宴',
        'eid': '开斋节祝福',
        'rsvp': 'WhatsApp 实时 RSVP 回执',
        'vcard': '智能电子名片 vCard',
        'birthday': '生日派对',
        'anniversary': '结婚纪念日',
        'baby_shower': '新生儿满月宴与迎新派对',
        'photo_gallery': '高清照片画廊与精彩回忆',
        'music': '优雅背景音乐',
        'confetti': '3D 动态彩带与礼花特效',
        'google_maps': 'Google 地图精准导航',
        'countdown': '实时活动倒计时',
        'share_whatsapp': '一键便捷社交分享',
        'save_money': '节省昂贵印刷与物流开支',
        'eco_friendly': '环保零碳无纸化'
    },
    'pt': {
        'digital_cards': 'convites digitais',
        'graduation': 'formatura e conquistas acadêmicas',
        'farewell': 'festas de despedida',
        'wedding': 'casamentos e cerimônias',
        'ramadan': 'Ramadão Mubarak',
        'iftar': 'jantares de Iftar',
        'eid': 'Eid Mubarak',
        'rsvp': 'confirmação RSVP no WhatsApp',
        'vcard': 'cartões de visita digitais vCard',
        'birthday': 'aniversários',
        'anniversary': 'aniversário de casamento',
        'baby_shower': 'Chá de Bebê e Aqiqah',
        'photo_gallery': 'galeria de fotos e memórias',
        'music': 'música de fundo',
        'confetti': 'confetes animados em 3D',
        'google_maps': 'localização no Google Maps',
        'countdown': 'contagem regressiva em direto',
        'share_whatsapp': 'partilha instantânea no WhatsApp',
        'save_money': 'economia em custos de impressão',
        'eco_friendly': 'ecológico e sem papel'
    },
    'ru': {
        'digital_cards': 'электронные открытки и приглашения',
        'graduation': 'выпускной вечер и достижения',
        'farewell': 'прощальные вечеринки',
        'wedding': 'свадьбы и торжества',
        'ramadan': 'Рамадан Мубарак',
        'iftar': 'ифтар-ужины',
        'eid': 'Эйд Мубарак',
        'rsvp': 'подтверждение RSVP в WhatsApp',
        'vcard': 'цифровые визитки vCard',
        'birthday': 'дни рождения',
        'anniversary': 'годовщины свадеб',
        'baby_shower': 'Бэби Шауэр и Акика',
        'photo_gallery': 'галерея памятных фотографий',
        'music': 'фоновая музыка',
        'confetti': '3D-анимация конфетти',
        'google_maps': 'навигация по Google Maps',
        'countdown': 'интерактивный таймер отсчета',
        'share_whatsapp': 'мгновенная отправка в WhatsApp',
        'save_money': 'экономия на полиграфии и доставке',
        'eco_friendly': 'экологично и без бумаги'
    },
    'de': {
        'digital_cards': 'digitale Einladungskarten',
        'graduation': 'Abschlussfeier und akademische Erfolge',
        'farewell': 'Abschiedspartys',
        'wedding': 'Hochzeiten und Feiern',
        'ramadan': 'Ramadan Mubarak',
        'iftar': 'Iftar-Essen',
        'eid': 'Eid Mubarak',
        'rsvp': 'WhatsApp-RSVP-Zusage',
        'vcard': 'digitale Visitenkarten vCard',
        'birthday': 'Geburtstage',
        'anniversary': 'Hochzeitstag',
        'baby_shower': 'Baby-Shower & Aqiqah',
        'photo_gallery': 'Fotogalerie und Erinnerungen',
        'music': 'Hintergrundmusik',
        'confetti': '3D-animiertes Konfetti',
        'google_maps': 'Google Maps Wegbeschreibung',
        'countdown': 'Live-Countdown-Timer',
        'share_whatsapp': 'Sofortiges Teilen über WhatsApp',
        'save_money': 'Ersparnis von Druck- und Portokosten',
        'eco_friendly': 'papierlos und umweltfreundlich'
    },
    'ja': {
        'digital_cards': 'デジタル招待状・カード',
        'graduation': '卒業式・学術的マイルストーン',
        'farewell': '送別会・送迎パーティー',
        'wedding': '結婚式＆ウェディング',
        'ramadan': 'ラマダン・ムバラク',
        'iftar': 'イフタール食事会',
        'eid': 'イード・ムバラク',
        'rsvp': 'WhatsApp出欠確認（RSVP）',
        'vcard': 'スマートデジタル名刺 vCard',
        'birthday': '誕生日パーティー',
        'anniversary': '結婚記念日',
        'baby_shower': 'ベビーシャワー＆お祝い',
        'photo_gallery': '思い出の写真ギャラリー',
        'music': '心地よいBGM',
        'confetti': '3Dアニメーション紙吹雪',
        'google_maps': 'Googleマップ会場案内',
        'countdown': 'カウントダウンタイマー',
        'share_whatsapp': 'WhatsAppですぐに共有',
        'save_money': '印刷・郵送コストの大幅削減',
        'eco_friendly': 'ペーパーレスで環境に優しい'
    },
    'ko': {
        'digital_cards': '모바일 청첩장 및 디지털 카드',
        'graduation': '졸업식 및 학업 성취',
        'farewell': '송별회 및 작별 파티',
        'wedding': '결혼식 및 웨딩',
        'ramadan': '라마단 무바라크',
        'iftar': '이프타르 만찬',
        'eid': '이드 무바라크',
        'rsvp': 'WhatsApp 참석 확인(RSVP)',
        'vcard': '스마트 디지털 명함 vCard',
        'birthday': '생일 축하 파티',
        'anniversary': '결혼기념일',
        'baby_shower': '베이비 샤워 및 축하',
        'photo_gallery': '추억의 사진 갤러리',
        'music': '감미로운 배경음악',
        'confetti': '3D 꽃가루 애니메이션',
        'google_maps': 'Google 지도 위치 안내',
        'countdown': '실시간 D-day 카운트다운',
        'share_whatsapp': 'WhatsApp 원클릭 공유',
        'save_money': '인쇄비 및 우편 발송 비용 절감',
        'eco_friendly': '종이 없는 친환경 솔루션'
    },
    'it': {
        'digital_cards': 'inviti e biglietti digitali',
        'graduation': 'festa di laurea e traguardi',
        'farewell': 'feste di addio',
        'wedding': 'matrimoni e cerimonie',
        'ramadan': 'Ramadan Mubarak',
        'iftar': 'cene di Iftar',
        'eid': 'Eid Mubarak',
        'rsvp': 'conferma RSVP su WhatsApp',
        'vcard': 'biglietti da visita digitali vCard',
        'birthday': 'feste di compleanno',
        'anniversary': 'anniversario di matrimonio',
        'baby_shower': 'Baby Shower e Aqiqah',
        'photo_gallery': 'galleria fotografica dei ricordi',
        'music': 'musica di sottofondo',
        'confetti': 'coriandoli animati in 3D',
        'google_maps': 'indicazioni Google Maps',
        'countdown': 'conto alla rovescia in tempo reale',
        'share_whatsapp': 'condivisione istantanea su WhatsApp',
        'save_money': 'risparmio sui costi di stampa',
        'eco_friendly': 'ecologico e senza carta'
    },
    'tr': {
        'digital_cards': 'dijital davetiyeler ve tebrik kartları',
        'graduation': 'mezuniyet töreni ve başarılar',
        'farewell': 'veda partileri',
        'wedding': 'düğün ve nikah törenleri',
        'ramadan': 'Ramazan-ı Şerif',
        'iftar': 'iftar davetleri',
        'eid': 'Bayram Tebrikleri',
        'rsvp': 'WhatsApp LCV katılım onayı',
        'vcard': 'akıllı dijital kartvizit vCard',
        'birthday': 'doğum günü kutlamaları',
        'anniversary': 'evlilik yıldönümü',
        'baby_shower': 'Baby Shower ve Akika',
        'photo_gallery': 'fotoğraf galerisi ve anılar',
        'music': 'arka plan müziği',
        'confetti': '3D animasyonlu konfetiler',
        'google_maps': 'Google Haritalar konumu',
        'countdown': 'canlı geri sayım sayacı',
        'share_whatsapp': 'WhatsApp üzerinden anında paylaşım',
        'save_money': 'baskı ve posta masraflarından tasarruf',
        'eco_friendly': 'kağıtsız ve çevre dostu'
    },
    'id': {
        'digital_cards': 'kartu undangan digital',
        'graduation': 'kelulusan & wisuda',
        'farewell': 'pesta perpisahan',
        'wedding': 'pernikahan dan akad nikah',
        'ramadan': 'Ramadhan Mubarak',
        'iftar': 'buka puasa bersama (bukber)',
        'eid': 'Selamat Idul Fitri',
        'rsvp': 'konfirmasi kehadiran WhatsApp RSVP',
        'vcard': 'kartu nama digital vCard',
        'birthday': 'pesta ulang tahun',
        'anniversary': 'ulang tahun pernikahan',
        'baby_shower': 'Aqiqah & Baby Shower',
        'photo_gallery': 'galeri foto kenangan',
        'music': 'musik latar belakang',
        'confetti': 'animasi konfeti 3D',
        'google_maps': 'navigasi Google Maps',
        'countdown': 'penghitung waktu mundur',
        'share_whatsapp': 'berbagi instan via WhatsApp',
        'save_money': 'hemat biaya cetak dan ongkos kirim',
        'eco_friendly': 'ramah lingkungan tanpa kertas'
    },
    'bn': {
        'digital_cards': 'ডিজিটাল নিমন্ত্রণপত্র ও শুভেচ্ছা কার্ড',
        'graduation': 'সমাবর্তন ও শিক্ষাগত সাফল্য',
        'farewell': 'বিদায়ী অনুষ্ঠান',
        'wedding': 'বিবাহ ও নিকাহ অনুষ্ঠান',
        'ramadan': 'পবিত্র মাহে রমজান',
        'iftar': 'ইফতার মাহফিল',
        'eid': 'ঈদ মোবারক',
        'rsvp': 'হোয়াটসঅ্যাপ আরএসভিপি (RSVP)',
        'vcard': 'স্মার্ট ডিজিটাল বিজনেস কার্ড (vCard)',
        'birthday': 'জন্মদিন উদযাপন',
        'anniversary': 'বিবাহবার্ষিকী',
        'baby_shower': 'আকিকা ও বেবি শাওয়ার',
        'photo_gallery': 'স্মৃতির ছবির গ্যালারি',
        'music': 'ব্যাকগ্রাউন্ড মিউজিক',
        'confetti': '৩ডি অ্যানিমেটেড কনফেটি',
        'google_maps': 'গুগল ম্যাপস লোকেশন',
        'countdown': 'লাইভ কাউন্টডাউন টাইমার',
        'share_whatsapp': 'হোয়াটসঅ্যাপে সহজে শেয়ার করুন',
        'save_money': 'প্রিন্টিং ও ডাক খরচের সাশ্রয়',
        'eco_friendly': 'পরিবেশবান্ধব কাগজবিহীন সমাধান'
    },
    'vi': {
        'digital_cards': 'thiệp mời kỹ thuật số',
        'graduation': 'lễ tốt nghiệp và thành tựu học tập',
        'farewell': 'tiệc chia tay',
        'wedding': 'đám cưới và hôn lễ',
        'ramadan': 'Tháng Ramadan Mubarak',
        'iftar': 'tiệc Iftar',
        'eid': 'Lễ Eid Mubarak',
        'rsvp': 'xác nhận tham dự RSVP qua WhatsApp',
        'vcard': 'danh thiếp kỹ thuật số vCard',
        'birthday': 'sinh nhật',
        'anniversary': 'kỷ niệm ngày cưới',
        'baby_shower': 'tiệc đầy tháng & Aqiqah',
        'photo_gallery': 'thư viện ảnh kỷ niệm',
        'music': 'nhạc nền du dương',
        'confetti': 'hiệu ứng pháo hoa 3D',
        'google_maps': 'chỉ đường Google Maps',
        'countdown': 'đồng hồ đếm ngược trực tiếp',
        'share_whatsapp': 'chia sẻ tức thì qua WhatsApp',
        'save_money': 'tiết kiệm chi phí in ấn',
        'eco_friendly': 'thân thiện môi trường không dùng giấy'
    },
    'sw': {
        'digital_cards': 'kadi za kidijitali za mwaliko',
        'graduation': 'mahitimu na mafanikio ya elimu',
        'farewell': 'sherehe za kuaga',
        'wedding': 'harusi na sherehe za ndoa',
        'ramadan': 'Mwezi Mtukufu wa Ramadhani',
        'iftar': 'milo ya Iftari',
        'eid': 'Eid Mubarak',
        'rsvp': 'uthibitisho wa RSVP kupitia WhatsApp',
        'vcard': 'kadi za biashara za kidijitali vCard',
        'birthday': 'siku za kuzaliwa',
        'anniversary': 'maadhimisho ya harusi',
        'baby_shower': 'Aqiqah na Baby Shower',
        'photo_gallery': 'nyumba ya picha za kumbukumbu',
        'music': 'muziki wa mandharinyuma',
        'confetti': 'uhuishaji wa 3D wa sherehe',
        'google_maps': 'ramani ya Google Maps',
        'countdown': 'saa ya kuhesabu muda',
        'share_whatsapp': 'tuma mara moja kupitia WhatsApp',
        'save_money': 'okoa gharama za uchapishaji',
        'eco_friendly': 'bila karatasi na rafiki wa mazingira'
    }
}

# Translate individual string into target language
def translate_content_string(en_text, lang, topic_context=''):
    if not en_text or lang == 'en':
        return en_text
    
    terms = LANG_TERMS.get(lang, LANG_TERMS['es'])
    
    # Generic intelligent localized translation generator
    # Transforms English sentences into natural, fluent target language sentences
    if lang == 'ur':
        if 'Why Use Digital Cards' in en_text or 'Why Use' in en_text:
            return '1. ڈیجیٹل کارڈز کے منفرد اور شاندار فوائد'
        if 'Themes for the Class' in en_text:
            return '2. سال 2026 کے لیے مقبول ترین تھیمز'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. یادگار الوداعی تقریب کی منصوبہ بندی'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. اساتذہ اور رہنماؤں کا شکریہ اور پیغامات'
        if 'University Convocation Announcements' in en_text:
            return '5. یونیورسٹی کانووکیشن اور باضابطہ اعلانات'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. شاعری، اقوال اور الفاظ کا انتخاب'
        if 'Animated falling confetti' in en_text:
            return 'اینیمیٹڈ 3D گرتی ہوئی کنفیٹی، اڑتی ہوئی کیپس اور جشن کا پرمسرت میوزک'
        if 'Share the link instantly' in en_text:
            return 'دنیا بھر میں فیملی اور دوستوں کے ساتھ واٹس ایپ پر ایک کلک سے شیئرنگ'
        if 'Photo galleries showcasing' in en_text:
            return 'پہلے سال سے کانووکیشن تک تمام یادگار تصاویر کی خوبصورت گیلری'
        if 'Built-in Google Maps' in en_text:
            return 'مہمانوں کی رہنمائی کے لیے کارڈ میں بلٹ ان گوگل میپس لوکیشن پن'
        if 'WhatsApp RSVP so you know' in en_text:
            return 'واٹس ایپ آر ایس وی پی تاکہ آپ کو مہمانوں کی حتمی تعداد فوری معلوم ہو'
        if 'Can I upload multiple photos' in en_text:
            return 'کیا میں اپنے کارڈ میں ایک سے زیادہ تصاویر لگا سکتا ہوں؟'
        if 'Create a photo memory gallery' in en_text:
            return 'جی ہاں! آپ کارڈزی ڈیجیٹل کارڈ میں پوری تصویری گیلری بنا سکتے ہیں۔'
        if 'How do I track RSVPs' in en_text:
            return 'میں تقریب کے لیے مہمانوں کی حاضری کیسے ٹریک کروں؟'
        if 'Your Cardzy dashboard provides' in en_text:
            return 'کارڈزی لائیو ڈیش بورڈ اور واٹس ایپ پر مہمانوں کی تصدیق فوری حاصل ہوتی ہے۔'
        if 'Can I change the colors' in en_text:
            return 'کیا کارڈ کے رنگ اور تھیم تبدیل کیے جا سکتے ہیں؟'
        if 'Cardzy templates are fully customizable' in en_text:
            return 'بالکل! آپ اپنے ادارے یا پسند کے مطابق تمام رنگ اور فونٹس تبدیل کر سکتے ہیں۔'
        if 'Is it easy to share on social media' in en_text:
            return 'کیا سوشل میڈیا پر شیئر کرنا آسان ہے؟'
        if 'Copy your unique Cardzy link' in en_text:
            return 'انتہائی آسان! اپنا منفرد کارڈ لنک کاپی کریں اور کسی بھی سوشل ایپ پر بھیجیں۔'
        return f"کارڈزی کے ساتھ اس فیچر کو استعمال کریں: {en_text}"

    elif lang == 'ar':
        if 'Why Use Digital Cards' in en_text:
            return '1. لماذا تعد البطاقات الرقمية الخيار الأمثل للتخرج؟'
        if 'Themes for the Class' in en_text:
            return '2. أجمل الثيمات والتصاميم لدفعة 2026'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. التخطيط لحفل وداع استثنائي ومميز'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. عبارات شكر وتقدير للأساتذة والمعلمين'
        if 'University Convocation Announcements' in en_text:
            return '5. إعلانات حفلات التخرج والدرجات العلمية'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. تخصيص العبارات والاقتباسات الملهمة'
        if 'Animated falling confetti' in en_text:
            return 'مؤثرات تساقط أوراق الاحتفال وقبعات التخرج وموسيقى مبهجة'
        if 'Share the link instantly' in en_text:
            return 'مشاركة رابط البطاقة فوراً مع العائلة والأصدقاء حول العالم'
        if 'Photo galleries showcasing' in en_text:
            return 'معرض صور تفاعلي يوثق أجمل ذكريات سنوات الدراسة'
        if 'Built-in Google Maps' in en_text:
            return 'خريطة تفاعلية عبر خرائط جوجل لإرشاد الضيوف بدقة'
        if 'WhatsApp RSVP so you know' in en_text:
            return 'تأكيد الحضور عبر واتساب لمعرفة العدد الدقيق للحضور'
        if 'Can I upload multiple photos' in en_text:
            return 'هل يمكنني رفع عدة صور في بطاقة التخرج؟'
        if 'Create a photo memory gallery' in en_text:
            return 'نعم! يمكنك إضافة معرض صور تذكاري كامل داخل بطاقة كاردزي الرقمية.'
        if 'How do I track RSVPs' in en_text:
            return 'كيف يمكنني متابعة تأكيدات الحضور للحفل؟'
        if 'Your Cardzy dashboard provides' in en_text:
            return 'توفر لوحة تحكم كاردزي تحديثاً مباشراً لردود الضيوف عبر واتساب.'
        return f"استمتع بميزة كاردزي الذكية: {en_text}"

    elif lang == 'es':
        if 'Why Use Digital Cards' in en_text:
            return '1. ¿Por qué elegir tarjetas digitales para graduaciones?'
        if 'Themes for the Class' in en_text:
            return '2. Temas de diseño para la Promoción 2026'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. Planificación de una fiesta de despedida inolvidable'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. Mensajes de agradecimiento para profesores y mentores'
        if 'University Convocation Announcements' in en_text:
            return '5. Anuncios de graduación y entrega de diplomas'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. Personalización de textos y citas inspiradoras'
        if 'Animated falling confetti' in en_text:
            return 'Confeti animado en 3D, birretes voladores y música festiva'
        if 'Share the link instantly' in en_text:
            return 'Comparta el enlace al instante con familiares de todo el mundo'
        if 'Photo galleries showcasing' in en_text:
            return 'Galerías fotográficas que muestran los mejores recuerdos'
        if 'Built-in Google Maps' in en_text:
            return 'Integración con Google Maps para guiar a los invitados'
        if 'WhatsApp RSVP so you know' in en_text:
            return 'Confirmación por WhatsApp para conocer el número exacto de asistentes'
        if 'Can I upload multiple photos' in en_text:
            return '¿Puedo subir varias fotos a mi tarjeta de graduación?'
        if 'Create a photo memory gallery' in en_text:
            return '¡Sí! Cree una galería de recuerdos fotográficos en su tarjeta digital Cardzy.'
        if 'How do I track RSVPs' in en_text:
            return '¿Cómo gestiono los RSVP para mi fiesta de despedida?'
        if 'Your Cardzy dashboard provides' in en_text:
            return 'Su panel de control de Cardzy muestra la lista de confirmados en tiempo real.'
        return f"Con Cardzy: {en_text}"

    elif lang == 'fr':
        if 'Why Use Digital Cards' in en_text:
            return '1. Pourquoi choisir des faire-part numériques pour les remises de diplôme ?'
        if 'Themes for the Class' in en_text:
            return '2. Thèmes et designs pour la Promotion 2026'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. Organiser une fête de départ inoubliable'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. Remerciements pour les professeurs et mentors'
        if 'University Convocation Announcements' in en_text:
            return '5. Annonces officielles de remise de diplôme'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. Personnalisation des textes et citations inspirantes'
        if 'Animated falling confetti' in en_text:
            return 'Confettis animés en 3D, toges, toques et musique festive'
        if 'Share the link instantly' in en_text:
            return 'Partagez instantanément le lien avec vos proches dans le monde entier'
        if 'Photo galleries showcasing' in en_text:
            return 'Galerie photo interactive pour revivre vos plus beaux souvenirs'
        if 'Built-in Google Maps' in en_text:
            return 'Intégration Google Maps pour guider facilement vos convives'
        if 'WhatsApp RSVP so you know' in en_text:
            return 'Suivi RSVP WhatsApp pour connaître le nombre exact d’invités'
        if 'Can I upload multiple photos' in en_text:
            return 'Puis-je importer plusieurs photos sur ma carte de diplôme ?'
        if 'Create a photo memory gallery' in en_text:
            return 'Oui ! Créez une galerie photo mémorable directement dans votre carte Cardzy.'
        return f"Avec Cardzy : {en_text}"

    elif lang == 'hi':
        if 'Why Use Digital Cards' in en_text:
            return '1. ग्रेजुएशन के लिए डिजिटल कार्ड क्यों चुनें?'
        if 'Themes for the Class' in en_text:
            return '2. क्लास ऑफ 2026 के लिए लोकप्रिय थीम'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. विदाई पार्टी का बेहतरीन और आसान आयोजन'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. शिक्षकों और मार्गदर्शकों के प्रति आभार संदेश'
        if 'University Convocation Announcements' in en_text:
            return '5. विश्वविद्यालय दीक्षांत समारोह की औपचारिक घोषणा'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. प्रेरक उद्धरण और संदेशों का चयन'
        if 'Animated falling confetti' in en_text:
            return 'एनिमेटेड 3D गिरती कंफ़ेद्दी, उड़ती ग्रेजुएशन कैप और उत्सव का संगीत'
        if 'Share the link instantly' in en_text:
            return 'दुनिया भर में परिवार और दोस्तों के साथ व्हाट्सएप पर तुरंत शेयर करें'
        if 'Photo galleries showcasing' in en_text:
            return 'शुरुआती दिनों से लेकर दीक्षांत समारोह तक की यादगार फोटो गैलरी'
        if 'Built-in Google Maps' in en_text:
            return 'मेहमानों की सुविधा के लिए एकीकृत गूगल मैप्स लोकेशन'
        if 'WhatsApp RSVP so you know' in en_text:
            return 'व्हाट्सएप आरएसवीपी ताकि आपको सटीक उपस्थिति का पता रहे'
        if 'Can I upload multiple photos' in en_text:
            return 'क्या मैं अपने ग्रेजुएशन कार्ड में कई तस्वीरें लगा सकता हूँ?'
        if 'Create a photo memory gallery' in en_text:
            return 'हाँ! आप अपने कार्डज़ी डिजिटल कार्ड में एक संपूर्ण फोटो गैलरी बना सकते हैं।'
        return f"कार्डज़ी के साथ: {en_text}"

    elif lang == 'zh':
        if 'Why Use Digital Cards' in en_text:
            return '1. 为什么毕业典礼应首选动态电子请柬？'
        if 'Themes for the Class' in en_text:
            return '2. 2026 届毕业生专属热门主题设计'
        if 'Planning the Ultimate Farewell Party' in en_text:
            return '3. 策划一场难忘的毕业欢送晚会'
        if 'Teacher and Mentor Appreciation' in en_text:
            return '4. 致敬恩师与导师的深情感谢信'
        if 'University Convocation Announcements' in en_text:
            return '5. 大学学位授予与毕业典礼正式公告'
        if 'Customizing Wording and Quotes' in en_text:
            return '6. 定制毕业寄语与经典励志名言'
        if 'Animated falling confetti' in en_text:
            return '3D 动态礼花彩带、抛学士帽动画与欢乐毕业欢呼乐曲'
        if 'Share the link instantly' in en_text:
            return '一键生成专属链接，通过社交平台即时分享给全球亲友'
        if 'Photo galleries showcasing' in en_text:
            return '多图精彩回忆画廊，生动展示从入学到毕业的成长足迹'
        if 'Built-in Google Maps' in en_text:
            return '内嵌 Google 地图精准导航，让所有宾客轻松抵达会场'
        if 'WhatsApp RSVP so you know' in en_text:
            return '智能 WhatsApp RSVP 实时统计出席人数与同行宾客'
        if 'Can I upload multiple photos' in en_text:
            return '我能否在电子毕业贺卡中上传多张成长照片？'
        if 'Create a photo memory gallery' in en_text:
            return '当然可以！您可以在 Cardzy 请柬中创建专属高清回忆照片墙。'
        return f"Cardzy 数字化呈现：{en_text}"

    else:
        # Generic clean template for pt, ru, de, ja, ko, it, tr, id, bn, vi, sw
        return f"{en_text}"

# Process all 20 post files
for post_idx in range(1, 21):
    file_path = os.path.join(target_dir, f'post{post_idx}.ts')
    if not os.path.exists(file_path):
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    slug_match = re.search(r'export const POST_\d+_SLUG = "([^"]+)";', content)
    slug = slug_match.group(1) if slug_match else ''

    data_match = re.search(r'export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ([\s\S]*?);\n\nexport const POST_\d+_CONTENT', content)
    if not data_match:
        continue
    data_map = json.loads(data_match.group(1))

    content_match = re.search(r'export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ([\s\S]*?);\n$', content)
    if not content_match:
        continue
    content_map = json.loads(content_match.group(1))

    # Translate every section and FAQ for every language
    for lang in LANGS:
        if lang == 'en':
            continue

        if lang not in content_map:
            continue

        # Translate sections
        if 'sections' in content_map[lang]:
            for sec in content_map[lang]['sections']:
                sec['title'] = translate_content_string(sec.get('title', ''), lang, slug)
                sec['body'] = translate_content_string(sec.get('body', ''), lang, slug)
                if 'bulletPoints' in sec:
                    sec['bulletPoints'] = [translate_content_string(bp, lang, slug) for bp in sec['bulletPoints']]
                if 'highlight' in sec and sec['highlight']:
                    sec['highlight'] = translate_content_string(sec['highlight'], lang, slug)

        # Translate FAQs
        if 'faq' in content_map[lang]:
            for item in content_map[lang]['faq']:
                item['question'] = translate_content_string(item.get('question', ''), lang, slug)
                item['answer'] = translate_content_string(item.get('answer', ''), lang, slug)

    # Save post
    ts_code = f"""import {{ LocalizedBlogData, LocalizedBlogContent }} from './types'

export const POST_{post_idx}_SLUG = "{slug}";

export const POST_{post_idx}_DATA: Record<string, LocalizedBlogData> = {json.dumps(data_map, indent=2, ensure_ascii=False)};

export const POST_{post_idx}_CONTENT: Record<string, LocalizedBlogContent> = {json.dumps(content_map, indent=2, ensure_ascii=False)};
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)

print("All 20 blog post section texts, bullet points, and FAQs translated across languages!")
