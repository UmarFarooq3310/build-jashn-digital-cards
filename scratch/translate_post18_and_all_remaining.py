import json
import os
import re

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')
LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw']

POST_18_TRANSLATIONS = {
    "1. The Significance of Digital Ramadan Wishes": {
        'ur': '1. رمضان المبارک میں ڈیجیٹل مبارکباد اور دعاؤں کی اہمیت',
        'ar': '1. أهمية تبادل التهاني والأدعية الرقمية في شهر رمضان المبارك',
        'es': '1. La importancia de las felicitaciones digitales en Ramadán',
        'fr': '1. L’importance des vœux numériques pendant le Ramadan',
        'hi': '1. रमजान में डिजिटल शुभकामनाओं और दुआओं का महत्व',
        'zh': '1. 斋月数字化祈祷与祝福的重要意义'
    },
    "Instant delivery of prayers and wishes worldwide": {
        'ur': 'دنیا بھر میں اہل خانہ اور دوستوں کو ایک سیکنڈ میں دعائیں اور پیغامات ارسال کریں',
        'ar': 'إرسال الأدعية والتهاني فوراً للأحباب في جميع أنحاء العالم',
        'es': 'Envío instantáneo de bendiciones y oraciones a todo el mundo',
        'fr': 'Envoi instantané de bénédictions et prières dans le monde entier',
        'hi': 'दुनिया भर में परिजनों को तुरंत दुआएं और शुभकामनाएं भेजें',
        'zh': '一键将真挚祈祷与祝福即时送达全球亲友'
    },
    "Rich animated designs with glowing lanterns and crescent moons": {
        'ur': 'روشن فانوسوں، ہلال اور گنبد خضریٰ کے پرنور 3D اینیمیٹڈ تھیمز',
        'ar': 'تصاميم ثلاثية الأبعاد 3D مزينة بالفوانيس المضيئة وهلال رمضان والمساجد',
        'es': 'Diseños animados en 3D con linternas brillantes, mezquitas y media luna dorada',
        'fr': 'Designs animés en 3D avec lanternes scintillantes et croissants de lune',
        'hi': 'चमकते लालटेन, अर्धचंद्र और मस्जिदों के सुंदर 3D एनिमेटेड डिज़ाइन',
        'zh': '融入璀璨斋月灯笼、金色新月与清真寺的沉浸式 3D 动效'
    },
    "Personalize messages with family names and specific duas": {
        'ur': 'خاندانی نام، مخصوص قرآنی دعاؤں اور اردو شاعری کے ساتھ ذاتی کارڈز',
        'ar': 'تخصيص البطاقات بأسماء العائلات وأدعية الإفطار والسحور المأثورة',
        'es': 'Personalice con nombres familiares, duas tradicionales y poesía',
        'fr': 'Personnalisez avec les noms de famille, invocations et messages',
        'hi': 'परिवार के नाम, विशेष दुआओं और शायरी के साथ संदेश कस्टमाइज़ करें',
        'zh': '支持定制家庭姓名、传统开斋祈祷文与专属祝福寄语'
    },
    "2. Crafting the Perfect Iftar Party Invitation": {
        'ur': '2. افطار پارٹی کے خوبصورت ڈیجیٹل دعوت نامے تیار کرنا',
        'ar': '2. تصميم دعوات موائد الإفطار العائلية والرمضانية',
        'es': '2. Creación de invitaciones perfectas para cenas de Iftar',
        'fr': '2. Créer des invitations parfaites pour les repas d’Iftar',
        'hi': '2. इफ्तार पार्टी के आकर्षक डिजिटल निमंत्रण पत्र तैयार करना',
        'zh': '2. 打造典雅开斋宴（Iftar）专属电子请柬'
    },
    "Include accurate Iftar timings and a countdown clock": {
        'ur': 'مغرب کی اذان اور افطار کا درست وقت اور لائیو کاؤنٹ ڈاؤن ٹائمر شامل کریں',
        'ar': 'إدراج مواقيت الإفطار الدقيقة مع عداد تنازلي تفاعلي لأذان المغرب',
        'es': 'Incluya horarios exactos de puesta de sol y cuenta regresiva',
        'fr': 'Indiquez l’heure exacte du coucher de soleil et le compte à rebours',
        'hi': 'सूर्यास्त / इफ्तार का सही समय और लाइव काउंटडाउन टाइमर शामिल करें',
        'zh': '精准标注日落与开斋时间，并附带动态倒计时时钟'
    },
    "Embed Google Maps so guests arrive before Maghrib": {
        'ur': 'گوگل میپس لوکیشن لنک تاکہ تمام مہمان اذان مغرب سے قبل بروقت پہنچ سکیں',
        'ar': 'تضمين موقع الحفل عبر خرائط جوجل لوصول الضيوف قبل أذان المغرب',
        'es': 'Incorpore Google Maps para que los invitados lleguen antes del Maghrib',
        'fr': 'Intégrez Google Maps pour que les invités arrivent avant le Maghreb',
        'hi': 'गूगल मैप्स लोकेशन ताकि सभी मेहमान समय पर पहुंच सकें',
        'zh': '内嵌 Google 地图精准导航，确保宾客在昏礼（Maghrib）前顺利抵达'
    },
    "Highlight dietary menus or potluck coordination details": {
        'ur': 'افطار مینو، سحری پکوان اور کھانے کی تفصیلات نمایاں کریں',
        'ar': 'توضيح قائمة الأطباق والمشروبات الرمضانية وترتيبات الطعام',
        'es': 'Detalle el menú especial de Iftar y opciones dietéticas',
        'fr': 'Détaillez le menu spécial d’Iftar et les options alimentaires',
        'hi': 'इफ्तार मेनू और भोजन व्यवस्था का विवरण स्पष्ट करें',
        'zh': '清晰列明特色开斋美食菜单与清真餐饮细节'
    },
    "3. Suhoor Gatherings and Laylatul Qadr Messages": {
        'ur': '3. سحری محافل اور شب قدر کے لیے خصوصی پیغامات',
        'ar': '3. تنظيم جلسات السحور ورسائل العشر الأواخر وليلة القدر',
        'es': '3. Encuentros de Suhoor y mensajes para Laylatul Qadr',
        'fr': '3. Réunions de Suhoor et messages pour Laylat al-Qadr',
        'hi': '3. सहरी समारोह और लैलतुल कद्र के विशेष संदेश',
        'zh': '3. 封斋宴（Suhoor）聚会与盖德尔夜祈祷祝福'
    },
    "Serene, minimalist designs suited for Suhoor invitations": {
        'ur': 'سحری کے پرسکون اوقات کے لیے دلکش، باوقار اور روحانی ڈیزائنز',
        'ar': 'تصاميم هادئة وروحانية تناسب دعوات السحور وجلسات الفجر',
        'es': 'Diseños serenos y elegantes para invitaciones de Suhoor',
        'fr': 'Designs épurés et spirituels pour les invitations de Suhoor',
        'hi': 'सहरी के लिए शांत, सुरुचिपूर्ण और आध्यात्मिक डिज़ाइन',
        'zh': '专为封斋聚会打造的宁静肃穆与典雅设计'
    },
    "Specialized templates for sharing prayers on Laylatul Qadr": {
        'ur': 'رمضان المبارک کے آخری عشرے اور شب قدر کے لیے مسنون دعائیہ ٹیمپلیٹس',
        'ar': 'قوالب مخصصة للأدعية المأثورة في العشر الأواخر وليلة القدر المباركة',
        'es': 'Plantillas especiales para compartir súplicas en las últimas 10 noches',
        'fr': 'Modèles dédiés pour partager des prières lors des 10 dernières nuits',
        'hi': 'रमजान के अंतिम 10 दिनों और लैलतुल कद्र की विशेष दुआएं',
        'zh': '精选斋月后十日与尊贵之夜（Laylatul Qadr）祈祷模板'
    },
    "Include traditional Arabic duas to enrich your message": {
        'ur': 'عربی دعاؤں اور اردو ترجمے کے ساتھ اپنے پیغام کو بابرکت بنائیں',
        'ar': 'إضافة أدعية قرآنية ونبوية مأثورة بالخط العربي الأصيل',
        'es': 'Incluya duas tradicionales en árabe con su traducción',
        'fr': 'Intégrez des invocations traditionnelles en arabe et traductions',
        'hi': 'पारंपरिक अरबी दुआओं और अनुवाद के साथ संदेश को समृद्ध करें',
        'zh': '融合经典阿拉伯语古兰经祈祷文与双语释义'
    },
    "4. Bilingual Templates: Urdu, Arabic and English": {
        'ur': '4. کثیر لسانی ٹیمپلیٹس: اردو، عربی اور انگلش خطاطی',
        'ar': '4. قوالب ثنائية وثلاثية اللغة: العربية والأردو والإنجليزية',
        'es': '4. Plantillas bilingües: Árabe, Urdu e Inglés',
        'fr': '4. Modèles bilingues : Arabe, Ourdou et Anglais',
        'hi': '4. बहुभाषी टेम्पलेट: उर्दू, अरबी और अंग्रेजी',
        'zh': '4. 多语言祝福模板：阿拉伯语、乌尔都语与英语'
    },
    "Use classic Arabic calligraphy for \"Ramadan Kareem\"": {
        'ur': 'رمضان کریم اور رمضان مبارک کے لیے سنہری عربی خطاطی کا استعمال',
        'ar': 'استخدام خط الثلث والديواني الفاخر لعبارات رمضان كريم ومبارك',
        'es': 'Utilice caligrafía árabe clásica para \"Ramadán Kareem\"',
        'fr': 'Utilisez la calligraphie arabe classique pour \"Ramadan Kareem\"',
        'hi': '\"रमजान करीम\" के लिए क्लासिक अरबी सुलेख का उपयोग करें',
        'zh': '采用典雅奢华的阿拉伯书法呈现“Ramadan Kareem”祝福'
    },
    "Add poetic Urdu couplets wishing prosperity and peace": {
        'ur': 'خیر و برکت، امن اور بخشش کی دعاؤں پر مشتمل اردو اشعار شامل کریں',
        'ar': 'إضافة أبيات شعرية وأدعية مباركة تدعو بالسلام والرحمة والمغفرة',
        'es': 'Añada hermosos versos poéticos deseando paz y prosperidad',
        'fr': 'Ajoutez de beaux vers poétiques souhaitant paix et bénédictions',
        'hi': 'शांति और समृद्धि की कामना करने वाले सुंदर काव्यात्मक संदेश जोड़ें',
        'zh': '嵌入寓意吉祥安康、祈求宽恕与和平的优美诗句'
    },
    "Ensure elders receive messages in the script they cherish": {
        'ur': 'بزرگوں کے لیے ان کے پسندیدہ نستعلیق رسم الخط میں کارڈ بھیجیں',
        'ar': 'مشاركة الرسائل بالخطوط الأصيلة التي يفضلها كبار السن والعائلة',
        'es': 'Asegure que los mayores reciban el mensaje en su caligrafía preferida',
        'fr': 'Offrez à vos aînés des vœux dans la calligraphie qu’ils affectionnent',
        'hi': 'बुजुर्गों को उनकी पसंदीदा लिपि और भाषा में संदेश भेजें',
        'zh': '让长辈亲朋在其熟悉的传统文字中感受温暖与敬意'
    },
    "5. RSVP Tracking for Large Iftars": {
        'ur': '5. بڑی افطار پارٹیوں کے لیے واٹس ایپ آر ایس وی پی ٹریکنگ',
        'ar': '5. تتبع وتأكيد حضور الضيوف للإفطارات الكبيرة عبر واتساب',
        'es': '5. Control de confirmaciones RSVP para grandes banquetes de Iftar',
        'fr': '5. Suivi des présences RSVP pour les grands repas d’Iftar',
        'hi': '5. बड़ी इफ्तार पार्टियों के लिए व्हाट्सएप आरएसवीपी ट्रैकिंग',
        'zh': '5. 大型开斋晚宴 WhatsApp RSVP 智能出席统计'
    },
    "Guests RSVP with a single tap straight to your WhatsApp": {
        'ur': 'مہمان ایک کلک پر شرکت کی تصدیق براہ راست آپ کے واٹس ایپ پر بھیجتے ہیں',
        'ar': 'تأكيد الضيوف لحضورهم بنقرة واحدة مباشرة إلى رقم واتساب الخاص بك',
        'es': 'Los invitados confirman con un solo toque directo a su WhatsApp',
        'fr': 'Les invités confirment en un clic directement sur votre WhatsApp',
        'hi': 'मेहमान एक टैप में सीधे आपके व्हाट्सएप पर उपस्थिति की पुष्टि करते हैं',
        'zh': '宾客只需轻轻一点，出席确认即刻直达您的 WhatsApp'
    },
    "Track confirmed attendees on your Cardzy dashboard in real-time": {
        'ur': 'کارڈزی لائیو ڈیش بورڈ پر حاضرین کی تصدیق شدہ تعداد فوری دیکھیں',
        'ar': 'متابعة قائمة الضيوف المؤكدين في لوحة تحكم كاردزي لحظة بلحظة',
        'es': 'Supervise los asistentes confirmados en su panel de Cardzy en tiempo real',
        'fr': 'Suivez les participants confirmés sur votre tableau de bord en temps réel',
        'hi': 'कार्डज़ी डैशबोर्ड पर वास्तविक समय में मेहमानों की सूची देखें',
        'zh': '在 Cardzy 后台实时掌握已确认出席的宾客人数'
    },
    "Export the final guest list for accurate catering preparation": {
        'ur': 'کھانے کی تیاری اور انتظام کے لیے حتمی مہمانوں کی فہرست ایکسپورٹ کریں',
        'ar': 'تصدير القائمة النهائية لتنظيم كميات الطعام بدقة وتجنب الإسراف',
        'es': 'Exporte la lista final para calcular la comida con precisión',
        'fr': 'Exportez la liste finale pour commander la juste quantité de nourriture',
        'hi': 'सटीक भोजन व्यवस्था के लिए अंतिम अतिथि सूची डाउनलोड करें',
        'zh': '一键导出最终宾客名单，精准把控餐食分量以避免铺张浪费'
    },
    "6. Corporate Ramadan Greetings": {
        'ur': '6. کاروباری اور دفتری رمضان مبارک پیغامات',
        'ar': '6. بطاقات تهنئة شهر رمضان للشركات والمؤسسات',
        'es': '6. Felicitaciones corporativas de Ramadán para empresas',
        'fr': '6. Vœux d’entreprise et cartes professionnelles pour le Ramadan',
        'hi': '6. कंपनियों और कर्मचारियों के लिए कॉर्पोरेट रमजान कार्ड',
        'zh': '6. 企业级商务斋月客户与员工问候'
    },
    "Build stronger client relationships with branded digital cards": {
        'ur': 'اپنے ادارے کے لوگو اور برانڈنگ کے ساتھ کلائنٹس سے تعلقات مضبوط بنائیں',
        'ar': 'تعزيز العلاقات مع العملاء والشركاء ببطاقات رقمية مخصصة بشعار شركتك',
        'es': 'Fortalezca relaciones con clientes mediante tarjetas digitales con su logo',
        'fr': 'Renforcez vos relations clients avec des cartes personnalisées à votre logo',
        'hi': 'कंपनी के लोगो वाले डिजिटल कार्ड से ग्राहकों के साथ संबंध मजबूत करें',
        'zh': '借助定制企业 Logo 与品牌配色的电子贺卡深化客户合作关系'
    },
    "Share easily via email newsletters or WhatsApp business accounts": {
        'ur': 'واٹس ایپ بزنس اکاؤنٹس اور ای میل نیوز لیٹرز کے ذریعے باآسانی شیئر کریں',
        'ar': 'مشاركة سهلة عبر النشرات البريدية وحسابات واتساب للأعمال',
        'es': 'Comparta fácilmente por boletines de correo o WhatsApp Business',
        'fr': 'Diffusez facilement par e-mail ou via WhatsApp Business',
        'hi': 'ईमेल और व्हाट्सएप बिजनेस अकाउंट के जरिए आसानी से साझा करें',
        'zh': '轻松通过企业 WhatsApp 官方账号或邮件通讯一键批量发送'
    },
    "Maintain a professional tone while conveying warm holiday wishes": {
        'ur': 'پیشہ ورانہ وقار کو برقرار رکھتے ہوئے دلی مبارکباد اور نیک تمنائیں پہنچائیں',
        'ar': 'الجمع بين الطابع المهني الراقي والدفء الإنساني في التهاني',
        'es': 'Mantenga un tono profesional transmitiendo cálidos deseos',
        'fr': 'Alliez professionnalisme et chaleur dans vos messages de vœux',
        'hi': 'गर्मजोशी से भरे त्योहार की बधाई देते हुए पेशेवर गरिमा बनाए रखें',
        'zh': '在传递温馨节日问候的同时，保持严谨尊贵的专业商务礼仪'
    },
    "Can I send Cardzy Ramadan wishes on WhatsApp?": {
        'ur': 'کیا میں واٹس ایپ پر کارڈزی رمضان کارڈز بھیج سکتا ہوں؟',
        'ar': 'هل يمكنني إرسال بطاقات تهنئة رمضان من كاردزي عبر واتساب؟',
        'es': '¿Puedo enviar felicitaciones de Ramadán de Cardzy por WhatsApp?',
        'fr': 'Puis-je envoyer des vœux de Ramadan Cardzy sur WhatsApp ?',
        'hi': 'क्या मैं व्हाट्सएप पर कार्डज़ी रमजान कार्ड भेज सकता हूँ?',
        'zh': '能否直接通过 WhatsApp 发送 Cardzy 斋月祝福卡？'
    },
    "Yes! Cardzy generates a clean, shareable link that works perfectly on WhatsApp, displaying a beautiful preview image.": {
        'ur': 'جی ہاں! کارڈزی ایک خوبصورت اور تیز رفتار ویب لنک تیار کرتا ہے جو واٹس ایپ پر شاندار پیش منظر کے ساتھ کھلتا ہے۔',
        'ar': 'نعم! تقوم كاردزي بتوليد رابط مميز وسريع يظهر بمعاينة جذابة على واتساب.',
        'es': '¡Sí! Cardzy genera un enlace limpio que muestra una vista previa atractiva en WhatsApp.',
        'fr': 'Oui ! Cardzy génère un lien court et soigné avec un bel aperçu sur WhatsApp.',
        'hi': 'हाँ! कार्डज़ी एक सुंदर वेब लिंक तैयार करता है जो व्हाट्सएप पर आकर्षक पूर्वावलोकन के साथ खुलता है।',
        'zh': '当然可以！Cardzy 会生成专属短网址，在 WhatsApp 等平台分享时自动展现高清精美卡片预览。'
    },
    "Does the RSVP feature work for Iftar parties?": {
        'ur': 'کیا افطار پارٹیوں کے لیے واٹس ایپ آر ایس وی پی فیچر کام کرتا ہے؟',
        'ar': 'هل تعمل خاصية تأكيد الحضور (RSVP) لدعوات الإفطار؟',
        'es': '¿Funciona la función RSVP para fiestas de Iftar?',
        'fr': 'La fonction RSVP fonctionne-t-elle pour les repas d’Iftar ?',
        'hi': 'क्या इफ्तार पार्टियों के लिए आरएसवीपी फीचर काम करता है?',
        'zh': 'RSVP 宾客回执功能是否适用于开斋晚宴？'
    },
    "Absolutely. The RSVP button can be customized for your Iftar, allowing you to track exactly how many guests will attend.": {
        'ur': 'بالکل! مہمان ایک کلک پر اپنی شرکت کی تصدیق کرتے ہیں اور آپ کو معلوم ہو جاتا ہے کہ کتنے افراد شرکت کر رہے ہیں۔',
        'ar': 'بالتأكيد! يمكنك تخصيص زر تأكيد الحضور لمعرفة العدد الدقيق للضيوف القادمين للإفطار.',
        'es': 'Totalmente. El botón de RSVP le permite saber exactamente cuántos invitados asistirán.',
        'fr': 'Absolument. Le bouton RSVP vous permet de connaître le nombre exact de convives présents.',
        'hi': 'बिल्कुल! मेहमान एक क्लिक में पुष्टि करते हैं जिससे आप सही संख्या जान सकते हैं।',
        'zh': '完全支持！宾客点击确认后，您可以实时掌握确切出席人数与同行亲友数量。'
    }
}

file_path = os.path.join(target_dir, 'post18.ts')
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

data_match = re.search(r'export const POST_18_DATA: Record<string, LocalizedBlogData> = ([\s\S]*?);\n\nexport const POST_18_CONTENT', content)
data_map = json.loads(data_match.group(1))

content_match = re.search(r'export const POST_18_CONTENT: Record<string, LocalizedBlogContent> = ([\s\S]*?);\n$', content)
content_map = json.loads(content_match.group(1))

for lang in LANGS:
    if lang == 'en' or lang not in content_map:
        continue

    for sec in content_map[lang].get('sections', []):
        sec_title = sec.get('title', '')
        # remove numbering prefix if duplicated
        clean_title = re.sub(r'^\d+\.\s*', '', sec_title).strip()
        for k, v in POST_18_TRANSLATIONS.items():
            if clean_title in k or k in clean_title:
                if lang in v:
                    sec['title'] = v[lang]
                    break

        new_bullets = []
        for bp in sec.get('bulletPoints', []):
            clean_bp = bp.strip()
            translated = False
            for k, v in POST_18_TRANSLATIONS.items():
                if clean_bp == k or k in clean_bp:
                    if lang in v:
                        new_bullets.append(v[lang])
                        translated = True
                        break
            if not translated:
                new_bullets.append(clean_bp)
        sec['bulletPoints'] = new_bullets

    for faq in content_map[lang].get('faq', []):
        q = faq.get('question', '').strip()
        a = faq.get('answer', '').strip()
        for k, v in POST_18_TRANSLATIONS.items():
            if q == k or k in q:
                if lang in v:
                    faq['question'] = v[lang]
            if a == k or k in a:
                if lang in v:
                    faq['answer'] = v[lang]

ts_code = f"""import {{ LocalizedBlogData, LocalizedBlogContent }} from './types'

export const POST_18_SLUG = "ramadan-mubarak-wishes-greetings-cards-iftar-party-invitations";

export const POST_18_DATA: Record<string, LocalizedBlogData> = {json.dumps(data_map, indent=2, ensure_ascii=False)};

export const POST_18_CONTENT: Record<string, LocalizedBlogContent> = {json.dumps(content_map, indent=2, ensure_ascii=False)};
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Post 18 successfully translated into pure multilingual text!")
