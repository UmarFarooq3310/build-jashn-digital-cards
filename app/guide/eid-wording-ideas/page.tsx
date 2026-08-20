'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Heart, Send } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const EID_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: {
    en: "Back to Guides", ur: "گائیڈز پر واپس جائیں", es: "Volver a las Guías", fr: "Retour aux Guides", ar: "العودة إلى الأدلة", hi: "वापस गाइड पर जाएं", zh: "返回指南列表", pt: "Voltar para os Guias", ru: "Назад к руководствам", de: "Zurück zu den Anleitungen", ja: "ガイド一覧に戻る", ko: "가이드 목록으로 돌아가기", it: "Torna alle Guide", tr: "Rehberlere Dön", id: "Kembali ke Panduan", bn: "গাইডে ফিরে যান", vi: "Quay Lại Hướng Dẫn", sw: "Rudi kwenye Miongozo"
  },
  badge: {
    en: "Eid Greetings", ur: "عید مبارک", es: "Saludos de Eid", fr: "Vœux de l'Aïd", ar: "تهاني العيد", hi: "ईद शुभकामनाएं", zh: "节日祝福", pt: "Saudações de Eid", ru: "Поздравления с Ид", de: "Eid-Grüße", ja: "Eidの挨拶", ko: "이드 인사말", it: "Auguri per l'Eid", tr: "Bayram Tebrikleri", id: "Ucapan Idul Fitri", bn: "ঈদের শুভেচ্ছা", vi: "Lời Chúc Eid", sw: "Salamu za Eid"
  },
  title: {
    en: "Creative Wording & Custom Message Ideas for Eid Mubarak Wish Cards",
    ur: "عید مبارک وش کارڈز کے لیے بہترین اور خوبصورت الفاظ کے خیالات",
    es: "Ideas de Mensajes Creativos y Frases Personalizadas para Tarjetas de Eid Mubarak",
    fr: "Idées de Textes Créatifs et Messages Personnalisés pour Cartes Eid Mubarak",
    ar: "أفكار ورسائل إبداعية لمباركات وصياغة بطاقات عيد مبارك",
    hi: "ईद मुबारक विश कार्ड के लिए रचनात्मक शब्द और संदेश विचार",
    zh: "开斋节 / 宰牲节祝贺卡创意文字与自定义祝福语指南",
    pt: "Ideias de Mensagens Criativas para Cartões de Eid Mubarak",
    ru: "Идеи красивых текстов и поздравлений для открыток Ид Мубарак",
    de: "Kreative Text- und Nachrichten-Ideen für Eid Mubarak Wunschkarten",
    ja: "Eid Mubarakカード用のクリエイティブなメッセージ＆文面集",
    ko: "이드 무바라크 카드를 위한 창의적인 문구 및 메시지 아이디어",
    it: "Idee di Testi Creativi e Messaggi Personalizzati per Biglietti Eid Mubarak",
    tr: "Bayram Tebrik Kartları İçin Yaratıcı Metin ve Mesaj Fikirleri",
    id: "Ide Kata-kata Kreatif & Pesan Khusus untuk Kartu Ucapan Idul Fitri / Adha",
    bn: "ঈদ মোবারক শুভেচ্ছা کارڈের জন্য চমৎকার ٹیک্সٹ و بار্তার আইডিয়া",
    vi: "Ý Tưởng Lời Chúc Sáng Tạo & Thông Điệp Tùy Chỉnh Cho Thiệp Eid Mubarak",
    sw: "Mawazo ya Maneno ya Ubunifu na Ujumbe wa Kadi za Eid Mubarak"
  },
  publishedDate: {
    en: "Published July 8, 2026", ur: "شائع ہوا: 8 جولائی 2026", es: "Publicado el 8 de julio de 2026", fr: "Publié le 8 juillet 2026", ar: "تاريخ النشر: 8 يوليو 2026", hi: "प्रकाशित: 8 जुलाई 2026", zh: "发布于 2026年7月8日", pt: "Publicado em 8 de julho de 2026", ru: "Опубликовано 8 июля 2026 г.", de: "Veröffentlicht am 8. Juli 2026", ja: "2026年7月8日公開", ko: "2026년 7월 8일 작성됨", it: "Pubblicato l'8 luglio 2026", tr: "Yayınlanma: 8 Temmuz 2026", id: "Diterbitkan 8 Juli 2026", bn: "প্রকাশের তারিখ: ৮ জুলাই, ২০২৬", vi: "Đăng ngày 8 tháng 7 năm 2026", sw: "Ilichapishwa 8 Julai 2026"
  },
  readTime: {
    en: "4 min read", ur: "4 منٹ مطالعہ", es: "4 min de lectura", fr: "4 min de lecture", ar: "4 دقائق قراءة", hi: "4 मिनट का पाठ", zh: "4 分钟阅读", pt: "4 min de leitura", ru: "4 мин чтения", de: "4 Min. Lesezeit", ja: "4分で読める", ko: "4분 소요", it: "4 min di lettura", tr: "4 dk okuma", id: "4 menit baca", bn: "৪ মিনিট পাঠ", vi: "4 phút đọc", sw: "dakika 4 za kusoma"
  },
  author: {
    en: "By Cardzy Editorial Team", ur: "کارڈزی کی تحریر", es: "Por el equipo editorial de Cardzy", fr: "Par l'équipe éditoriale Cardzy", ar: "بقلم فريق تحرير Cardzy", hi: "Cardzy संपादकीय टीम द्वारा", zh: "Cardzy 编辑团队", pt: "Pela equipe editorial do Cardzy", ru: "Редакция Cardzy", de: "Von der Cardzy Redaktion", ja: "Cardzy 編集チーム", ko: "Cardzy 에디토리얼 팀", it: "A cura del team editoriale di Cardzy", tr: "Cardzy Editör Ekibi", id: "Oleh Tim Editorial Cardzy", bn: "Cardzy এডিটরিয়াল ٹیم", vi: "Bởi Đội Ngũ Biên Tập Cardzy", sw: "Na Timu ya Hariri ya Cardzy"
  },
  introP1: {
    en: "Eid-ul-Fitr and Eid-ul-Adha are times of immense gratitude, gathering, and sharing love with family. Sending an animated digital wish card brings back nostalgic holiday warmth with music chimes, calligraphic greetings, and custom designs.",
    ur: "عید الفطر اور عید الاضحی شکر گزاری اور پیار بانٹنے کے دن ہیں۔ اینیمیٹڈ ڈیجیٹل وش کارڈ بھیجنا موسیقی، خوبصورت خطاطی اور ڈیزائن کے ساتھ پرانی یادوں کو تازہ کرتا ہے۔",
    es: "Eid-ul-Fitr y Eid-ul-Adha son momentos de gratitud y reunión familiar. Enviar una tarjeta digital animada brinda calidez festiva con música, caligrafía y diseños personalizados.",
    fr: "L'Aïd-el-Fitr et l'Aïd-el-Adha sont des moments de gratitude et de partage. Envoyer une carte numérique animée apporte de la chaleur avec de la musique et de la calligraphie.",
    ar: "عيد الفطر وعيد الأضحى أوقات للامتنان والمشاركة مع العائلة. تمنحك بطاقات المعايدة الرقمية المتحركة طابعاً احتفالياً دافئاً مع الموسيقى والخط الجميل.",
    hi: "ईद-उल-फितर और ईद-उल-अजहा परिवार के साथ खुशी और आभार व्यक्त करने के अवसर हैं। एनिमेटेड विश कार्ड भेजना संगीत और सुंदर सुलेख के साथ खुशियाँ लाता है।",
    zh: "开斋节与宰牲节是人们心怀感恩、亲友相聚与传递关爱的美好时光。发送动态祝贺卡，伴随清脆音效与高雅书法，能带来浓浓的节日温馨。",
    pt: "O Eid-ul-Fitr e o Eid-ul-Adha são momentos de gratidão e união. Enviar um cartão digital animado traz o calor das festas com música e caligrafia.",
    ru: "Ид-аль-Фитр и Ид-аль-Адха — время благодарности и встречи с родными. Анимированная открытка с музыкой и каллиграфией подарит праздничное тепло.",
    de: "Eid-ul-Fitr und Eid-ul-Adha sind Zeiten der Dankbarkeit und Freude. Eine animierte digitale Karte bringt mit Musik und Kalligrafie festliche Wärme.",
    ja: "Eid-ul-FitrやEid-ul-Adhaは、家族への感謝と愛を分かち合う大切な時です。アニメーション付きのデジタルカードでお祝いしましょう。",
    ko: "이드 알 피트르와 이드 알 아드하는 감사와 사랑을 나누는 시간입니다. 애니메이션 디지털 카드로 축하의 마음을 전달해보세요.",
    it: "L'Eid-ul-Fitr e l'Eid-ul-Adha sono momenti di gratitudine e condivisione. Inviare un biglietto animato dona calore con musica e calligrafia.",
    tr: "Ramazan ve Kurban Bayramları şükran ve sevgi paylaşma zamanlarıdır. Animasyonlu dijital kartlar müzik ve kaligrafi ile bayram coşkusu sunar.",
    id: "Idul Fitri dan Idul Adha adalah momen rasa syukur dan kebersamaan. Mengirim kartu animasi digital membawa kehangatan suasana hari raya.",
    bn: "ঈদুল ফিতর ও ঈদুল আজহা কৃতজ্ঞতা ও ভালোবাসা প্রকাশের সময়। একটি অ্যানিমেটেড ডিজিটাল وش کارڈ পাঠানো পুরোনো স্মৃতির আমেজ ফিরিয়ে আনে।",
    vi: "Eid-ul-Fitr và Eid-ul-Adha là thời điểm bày tỏ lòng biết ơn và yêu thương. Thiệp kỹ thuật số sinh động giúp lan tỏa niềm vui ngày lễ.",
    sw: "Eid-ul-Fitr na Eid-ul-Adha ni nyakati za shukrani na upendo na familia. Kutuma kadi ya picha za mwendo huleta furaha ya sikukuu."
  },
  sec1Title: {
    en: "1. Classic & Short English Wording", ur: "1. مختصر اور کلاسک انگریزی الفاظ", es: "1. Redacción Clásica y Corta en Inglés", fr: "1. Messages Classiques et Courts en Anglais", ar: "1. صياغة إنجليزية كلاسيكية وقصيرة", hi: "1. क्लासिक और छोटे अंग्रेजी शब्द", zh: "1. 经典精短英文言词模板", pt: "1. Frases Clássicas e Curtas em Inglês", ru: "1. Классические короткие тексты", de: "1. Klassische & kurze englische Sprüche", ja: "1. クラシック＆ショート英文メッセージ", ko: "1. 클래식하고 짧은 영문 문구", it: "1. Frasi Classiche e Brevi in Inglese", tr: "1. Klasik ve Kısa Mesajlar", id: "1. Kata-kata Singkat & Klasik", bn: "১. ক্ল্যাসিক ও সংক্ষিপ্ত ইংরেজি বার্তা", vi: "1. Lời Chúc Tiếng Anh Ngắn Gọn & Cổ Điển", sw: "1. Maneno Mafupi na ya Kawaida"
  },
  sec1Bullet1: {
    en: "May this blessed day bring peace, happiness, and prosperity to your home. Eid Mubarak to you and your family!",
    ur: "یہ مبارک دن آپ کے گھر میں امن، خوشیاں اور خوشحالی لائے۔ آپ کو اور آپ کے خاندان کو عید مبارک!",
    es: "¡Que este bendito día traiga paz, felicidad y prosperidad a tu hogar! ¡Eid Mubarak para ti y tu familia!",
    fr: "Que ce jour béni apporte paix, bonheur et prospérité dans votre foyer. Aïd Mubarak à vous et votre famille !",
    ar: "أتمنى أن يجلب هذا اليوم المبارك السلام والسعادة والازدهار لبيتك. عيد مبارك لك ولعائلتك!",
    hi: "यह पावन दिन आपके घर में शांति, खुशी और समृद्धि लाए। आपको और आपके परिवार को ईद मुबारक!",
    zh: "愿这吉祥的日子为您和家人带来和平、幸福与繁荣。祝您及家人开斋节快乐！",
    pt: "Que este dia abençoado traga paz, felicidade e prosperidade para sua casa. Eid Mubarak para você e sua família!",
    ru: "Пусть этот благословенный день принесет в ваш дом мир, счастье и процветание. Ид Мубарак вам и вашей семье!",
    de: "Möge dieser gesegnete Tag Frieden, Glück und Wohlstand in Ihr Zuhause bringen. Eid Mubarak für Sie und Ihre Familie!",
    ja: "この祝福された日がご家庭に平和、幸福、繁栄をもたらしますように。あなたとご家族にEid Mubarak！",
    ko: "이 축복받은 날이 귀하의 가정에 평화와 행복, 번영을 가져다주기를 바랍니다. 귀하와 가족 모두에게 이드 무바라크!",
    it: "Che questo giorno benedetto porti pace, felicità e prosperità nella tua casa. Eid Mubarak a te e alla tua famiglia!",
    tr: "Bu mübarek günün evinize huzur, mutluluk ve bolluk getirmesini dileriz. Size ve ailenize İyi Bayramlar!",
    id: "Semoga hari yang berkah ini membawa kedamaian, kebahagiaan, dan kemakmuran bagi rumah Anda. Selamat Hari Raya untuk Anda dan keluarga!",
    bn: "এই পবিত্র দিনটি আপনার ঘরে শান্তি, সুখ ও সমৃদ্ধি নিয়ে আসুক। আপনাকে ও আপনার পরিবারকে ঈদ মোবারক!",
    vi: "Cầu mong ngày an lành này mang lại hòa bình, hạnh phúc và thịnh vượng cho gia đình bạn. Chúc bạn và gia đình Eid Mubarak!",
    sw: "May siku hii yenye baraka ilete amani, furaha na ufanisi nyumbani kwako. Eid Mubarak kwako na familia yako!"
  },
  sec1Bullet2: {
    en: "Wishing you a joyous Eid filled with laughter, delicious feasts, and cherished moments with loved ones.",
    ur: "خوشی، لذیذ کھانوں اور اپنے پیاروں کے ساتھ حسین لمحات سے بھری عید مبارک۔",
    es: "Te deseamos un Eid lleno de alegría, risas, deliciosos banquetes y momentos entrañables con tus seres queridos.",
    fr: "En vous souhaitant un Aïd joyeux rempli de rires, de festins délicieux et de moments précieux avec vos proches.",
    ar: "أتمنى لك عيداً سعيداً مليئاً بالضحك والولائم اللذيذة واللحظات الثمينة مع الأحبة.",
    hi: "हंसी, स्वादिष्ट दावतों और अपनों के साथ संजोए गए पलों से भरी एक आनंदमय ईद की शुभकामनाएं।",
    zh: "祝您度过一个充满欢声笑语、丰盛美食和与所爱之人共享美好时光的快乐节日。",
    pt: "Desejando a você um Eid alegre, cheio de risadas, deliciosos banquetes e momentos preciosos com quem ama.",
    ru: "Желаем вам радостного праздника, наполненного смехом, вкусными угощениями и драгоценными моментами с близкими.",
    de: "Wir wünschen Ihnen ein frohes Eid-Fest voller Lachen, köstlicher Festmahle und wertvoller Momente mit Ihren Lieben.",
    ja: "笑顔、美味しいごちそう、そして大切な人たちとのかけがえのない時間に満ちた素晴らしいEidになりますように。",
    ko: "웃음과 맛있는 음식, 사랑하는 사람들과의 소중한 순간으로 가득 찬 즐거운 이드가 되기를 바랍니다.",
    it: "Augurandoti un felice Eid ricco di risate, deliziosi banchetti e momenti preziosi con i tuoi cari.",
    tr: "Kahkahalar, lezzetli sofralar ve sevdiklerinizle unutulmaz anlarla dolu neşeli bir bayram dileriz.",
    id: "Mendoakan Anda Hari Raya yang penuh keceriaan, santapan lezat, dan momen berharga bersama orang-orang tercinta.",
    bn: "হাসি, সুস্বাদু খাবার এবং প্রিয়জনদের সাথে সুন্দর মুহূর্তে ভরা এক আনন্দময় ঈদের শুভেচ্ছা।",
    vi: "Chúc bạn một kỳ nghỉ lễ ngập tràn tiếng cười, những bữa tiệc thơm ngon và khoảnh khắc đáng nhớ bên người thân.",
    sw: "Kukutakia Eid yenye furaha iliyojaa kicheko, karamu tamu, na nyakati za thamani na wapendwa."
  },
  sec1Bullet3: {
    en: "May the guidance and blessings of Allah be with you and your family today and always. Eid Mubarak!",
    ur: "اللہ تعالی کی رہنمائی اور برکات آج اور ہمیشہ آپ اور آپ کے خاندان کے ساتھ رہیں۔ عید مبارک!",
    es: "Que la guía y las bendiciones de Alá estén contigo y tu familia hoy y siempre. ¡Eid Mubarak!",
    fr: "Que la guidance et les bénédictions d'Allah soient avec vous et votre famille aujourd'hui et pour toujours. Aïd Mubarak !",
    ar: "أن تكون هداية الله وبركاته معك ومع عائلتك اليوم وكل يوم. عيد مبارك!",
    hi: "अल्लाह का मार्गदर्शन और आशीर्वाद आज और हमेशा आपके और आपके परिवार के साथ रहे। ईद मुबारक!",
    zh: "愿真主的指引与赐福在今天和未来永远伴随您及家人。开斋节快乐！",
    pt: "Que a orientação e as bênçãos de Allah estejam com você e sua família hoje e sempre. Eid Mubarak!",
    ru: "Пусть руководство и благословения Аллаха пребывают с вами и вашей семьей сегодня и всегда. Ид Мубарак!",
    de: "Mögen die Führung und der Segen Allahs heute und immer bei Ihnen und Ihrer Familie sein. Eid Mubarak!",
    ja: "アッラーの導きと祝福が、今日もこれからもあなたとご家族と共にありますように。Eid Mubarak！",
    ko: "알라의 인도하심과 축복이 오늘과 언제나 귀하와 가족에게 함께하기를 바랍니다. 이드 무바라크!",
    it: "Che la guida e le benedizioni di Allah siano con te e la tua famiglia oggi e sempre. Eid Mubarak!",
    tr: "Allah'ın rehberliği ve bereketi bugün ve her zaman sizinle ve ailenizle olsun. İyi Bayramlar!",
    id: "Semoga petunjuk dan berkah Allah senantiasa menyertai Anda dan keluarga hari ini dan selamanya. Selamat Hari Raya!",
    bn: "আল্লাহর হেদায়েত ও রহমত আজ এবং সর্বদা আপনার ও আপনার পরিবারের উপর বর্ষিত হোক। ঈদ মোبارক!",
    vi: "Cầu mong sự dẫn lối và an lành của Thượng đế luôn ở bên bạn và gia đình hôm nay và mãi mãi. Eid Mubarak!",
    sw: "May uongozi na baraka za Mwenyezi Mungu ziwe nawe na familia yako leo na daima. Eid Mubarak!"
  },
  sec2Title: {
    en: "2. Heartwarming Family Messages", ur: "2. دل چھو لینے والے خاندانی پیغامات", es: "2. Mensajes Familiares Conmovedores", fr: "2. Messages Familiaux Chaleureux", ar: "2. رسائل عائلية دافئة", hi: "2. दिल को छू लेने वाले पारिवारिक संदेश", zh: "2. 温馨感人的家庭亲情寄语", pt: "2. Mensagens Familiares Emocionantes", ru: "2. Душевные семейные пожелания", de: "2. Herzerwärmende Botschaften für die Familie", ja: "2. 家族へ送る心温まるメッセージ", ko: "2. 마음을 울리는 가족 메시지", it: "2. Messaggi Familiari Affettuosi", tr: "2. Yürek Isıtan Aile Mesajları", id: "2. Pesan Hangat untuk Keluarga", bn: "২. হৃদয়ে স্পর্শ করা পারিবারিক বার্তা", vi: "2. Thông Điệp Gia Đình Ấm Áp", sw: "2. Ujumbe wa Familia Unaojiweka Moyoni"
  },
  sec2Quote: {
    en: "Even though we are miles apart this Eid, you are always in our hearts and prayers. Sending you our warmest hugs and wishes for a beautiful Eid celebration. Can't wait to celebrate together soon!",
    ur: "اگرچہ اس عید پر ہم فاصلے پر ہیں، لیکن آپ ہمیشہ ہمارے دلوں اور دعاؤں میں ہیں۔ آپ کو عید مبارک کی دلی مبارکباد۔ جلد اکٹھے جشن منانے کا انتظار ہے!",
    es: "Aunque estemos a millas de distancia este Eid, siempre estás en nuestros corazones y oraciones. Te enviamos nuestros mejores deseos para una hermosa celebración.",
    fr: "Même si nous sommes éloignés pour cet Aïd, vous êtes toujours dans nos cœurs et nos prières. Nous vous envoyons nos vœux les plus chaleureux.",
    ar: "على الرغم من بعد المسافات في هذا العيد، إلا أنكم دائماً في قلوبنا ودعواتنا. نرسل لكم أحر التهاني وأجمل الأماني بعيد سعيد.",
    hi: "हालाँकि इस ईद हम मील दूर हैं, आप हमेशा हमारे दिल और प्रार्थनाओं में हैं। आपको एक सुंदर ईद उत्सव के लिए हार्दिक शुभकामनाएं भेज रहे हैं।",
    zh: "虽然这个节日我们相隔遥远，但您始终在我们的心中与祈祷中。为您送上最温暖的拥抱与真挚祝福，期待早日重聚庆祝！",
    pt: "Mesmo estando longe neste Eid, você está sempre em nossos corações e orações. Enviamos nossos abraços mais calorosos para uma linda celebração.",
    ru: "Хотя в этот праздничный день мы далеко друг от друга, вы всегда в наших сердцах и молитвах. Отправляем самые теплые обнимания и пожелания!",
    de: "Auch wenn wir an diesem Eid meilenweit voneinander entfernt sind, sind Sie immer in unseren Herzen und Gebeten. Wir senden Ihnen die wärmsten Wünsche.",
    ja: "今年のEidは遠く離れていても、心と祈りはいつも共にあります。温かいハグとお祝いの気持ちを贈ります。また一緒にお祝いできる日を楽しみにしています！",
    ko: "이번 이드에 멀리 떨어져 있지만, 당신은 항상 우리의 마음과 기도 속에 있습니다. 따뜻한 포옹과 아름다운 축하의 마음을 보냅니다.",
    it: "Anche se siamo lontani in questo Eid, sei sempre nei nostri cuori e nelle nostre preghiere. Ti inviamo i nostri più calorosi auguri.",
    tr: "Bu bayramda kilometrelerce uzakta olsak da, her zaman kalbimizde ve dualarımızdasınız. Size en sıcak kucaklamalarımızı ve dileklerimizi gönderiyoruz.",
    id: "Meskipun kita terpisah jarak saat Hari Raya ini, Anda selalu berada dalam hati dan doa kami. Mengirimkan peluk hangat dan doa terbaik.",
    bn: "এই ঈদে ہمرا دوری تھیلے بھی, آپ ہمیشہ ہمارے دلوں و دعاؤں میں ہیں۔ آپ کے لیے مبارکباد۔",
    vi: "Dù ở xa trong dịp lễ Eid này, bạn luôn ở trong trái tim và lời cầu nguyện của chúng tôi. Gửi đến bạn những cái ôm ấm áp nhất.",
    sw: "Bagamoyo tukitenganishwa na umbali wakati wa Eid hii, daima uko moyoni na katika maombi wetu. Tunakutumia salamu za joto na baraka tele."
  },
  sec3Title: {
    en: "3. Traditional Wording & Poetry (Urdu Shayari)", ur: "3. روایتی الفاظ اور اردو شاعری", es: "3. Redacción Tradicional y Poesía en Urdu", fr: "3. Textes Traditionnels et Poésie en Ourdou", ar: "3. صياغة تقليدية وشعر أوردو", hi: "3. पारंपरिक शब्द और उर्दू शायरी", zh: "3. 传统祝辞与乌尔都语经典诗歌", pt: "3. Frases Tradicionais e Poesia em Urdu", ru: "3. Традиционные тексты и поэзия", de: "3. Traditionelle Texte & Urdu-Poesie", ja: "3. 伝統的な祝辞＆ウルドゥー詩", ko: "3. 전통 문구 및 우르두 시", it: "3. Testi Tradizionali e Poesia in Urdu", tr: "3. Geleneksel Metinler ve Şiirler", id: "3. Ucapan Tradisional & Puisi (Urdu Shayari)", bn: "৩. প্রথাগত বার্তা ও উর্দু কবিতা", vi: "3. Câu Từ Truyền Thống & Thơ Ca", sw: "3. Maneno ya Jadi na Mashairi"
  },
  sec3Label1: {
    en: "Traditional Blessing Wording", ur: "روایتی دعائیہ الفاظ", es: "Frases de Bendición Tradicionales", fr: "Formulation de Bénédiction Traditionnelle", ar: "صياغة مباركة تقليدية", hi: "पारंपरिक आशीर्वाद शब्द", zh: "传统吉祥祷词模板", pt: "Frases Tradicionais de Bênção", ru: "Традиционные тексты благословения", de: "Traditionelle Segensformulierungen", ja: "伝統的な祝福の文面", ko: "전통 축복 문구", it: "Testo di Benedizione Tradizionale", tr: "Geleneksel Dua ve Tebrik Metni", id: "Kata-kata Berkah Tradisional", bn: "প্রথাগত আশীর্বাদের বার্তা", vi: "Lời Chúc An Lành Truyền Thống", sw: "Maneno ya Baraka ya Jadi"
  },
  sec3Label2: {
    en: "Beautiful Eid Poetry (Eid Shayari)", ur: "خوبصورت عید شاعری", es: "Poesía Hermosa de Eid (Shayari)", fr: "Belle Poésie de l'Aïd (Shayari)", ar: "شعر العيد الجميل", hi: "सुंदर ईद शायरी", zh: "优美的节庆古典诗歌（Shayari）", pt: "Bela Poesia de Eid (Shayari)", ru: "Красивая поэзия к празднику Ид", de: "Schöne Eid-Poesie (Shayari)", ja: "Eidの美しい詩（Shayari）", ko: "아름다운 이드 시 (Shayari)", it: "Splendida Poesia per l'Eid (Shayari)", tr: "Güzel Bayram Şiirleri", id: "Puisi Indah Idul Fitri (Shayari)", bn: "মনোমুগ্ধকর ঈদ কবিতা", vi: "Bài Thơ Hay Dịp Lễ Eid", sw: "Mashairi Mazuri ya Eid"
  },
  sec4Title: {
    en: "4. Customizing Your Eid Card on Cardzy", ur: "4. کارڈزی پر اپنا عید کارڈ تیار کرنے کا طریقہ", es: "4. Personalizar tu Tarjeta de Eid en Cardzy", fr: "4. Personnaliser votre Carte d'Aïd sur Cardzy", ar: "4. تخصيص بطاقة العيد الخاصة بك على Cardzy", hi: "4. Cardzy पर अपना ईद कार्ड कस्टमाइज़ करें", zh: "4. 在 Cardzy 上打造个性化节日卡片", pt: "4. Personalizando seu Cartão de Eid no Cardzy", ru: "4. Как настроить открытку к празднику Ид на Cardzy", de: "4. Anpassen Ihrer Eid-Karte auf Cardzy", ja: "4. CardzyでEidカードをカスタマイズする手順", ko: "4. Cardzy에서 이드 카드를 꾸미는 방법", it: "4. Personalizzare il tuo Biglietto Eid su Cardzy", tr: "4. Cardzy'de Bayram Kartınızı Kişiselleştirme", id: "4. Cara Mengkustomisasi Kartu Idul Fitri di Cardzy", bn: "۴. Cardzy-تے آپ کا عید کارڈ ساجانے کی ترکیب", vi: "4. Tùy Chỉnh Thiệp Eid Của Bạn Trên Cardzy", sw: "4. Kugeuza Kadi Yako ya Eid kwenye Cardzy"
  },
  step1Title: {
    en: "Select the Eid Mubarak Occasion", ur: "عید مبارک کا موقع منتخب کریں", es: "Selecciona la ocasión de Eid Mubarak", fr: "Sélectionnez l'occasion Eid Mubarak", ar: "اختر مناسبة عيد مبارك", hi: "ईद मुबारक अवसर चुनें", zh: "选择开斋节/宰牲节主题", pt: "Selecione a ocasião de Eid Mubarak", ru: "Выберите повод Ид Мубарак", de: "Wählen Sie den Anlass Eid Mubarak", ja: "Eid Mubarakのオケージョンを選択", ko: "이드 무바라크 행사 선택", it: "Seleziona l'occasione Eid Mubarak", tr: "Bayram Etkinliğini Seçin", id: "Pilih Acara Idul Fitri", bn: "ঈদ মোবারকের উপলক্ষ বেছে নিন", vi: "Chọn Dịp Eid Mubarak", sw: "Chagua Tukio la Eid Mubarak"
  },
  step1Desc: {
    en: "Head to the Wish builder and select Eid.", ur: "وش بلڈر میں جائیں اور عید کا انتخاب کریں۔", es: "Dirígete al creador de deseos y selecciona Eid.", fr: "Allez dans le générateur de vœux et sélectionnez l'Aïd.", ar: "توجه إلى أداة إنشاء المعايدات واختر العيد.", hi: "विश बिल्डर पर जाएं और ईद चुनें।", zh: "前往祝福生成器并选择开斋节。", pt: "Vá para o criador de desejos e selecione Eid.", ru: "Перейдите в конструктор пожеланий и выберите Ид.", de: "Gehen Sie zum Wunsch-Generator und wählen Sie Eid.", ja: "ウィッシュビルダーに移動してEidを選択します。", ko: "위시 빌더로 이동하여 이드를 선택합니다.", it: "Vai al creatore di auguri e seleziona Eid.", tr: "Dilek oluşturucuya gidin ve Bayram'ı seçin.", id: "Buka pembuat ucapan dan pilih Hari Raya.", bn: "উইশ বিল্ডারে যান এবং ঈদ নির্বাচন করুন।", vi: "Truy cập trình tạo lời chúc và chọn Eid.", sw: "Nenda kwenye muundaji wa matamanio na uchague Eid."
  },
  step2Title: {
    en: "Choose a Theme", ur: "خوبصورت تھیم منتخب کریں", es: "Elige un Tema", fr: "Choisissez un Thème", ar: "اختر ثيماً مميزاً", hi: "एक थीम चुनें", zh: "选择专属设计主题", pt: "Escolha um Tema", ru: "Выберите тему", de: "Wählen Sie ein Thema", ja: "テーマを選択", ko: "테마 선택", it: "Scegli un Tema", tr: "Bir Tema Seçin", id: "Pilih Tema", bn: "একটি تھیم انتخاب کریں", vi: "Chọn Một Chủ Đề", sw: "Chagua Mandhari"
  },
  step2Desc: {
    en: "The Mughal Gold theme features classic green and gold ornaments, perfect for religious celebrations.", ur: "مغل گولڈ تھیم میں روایتی سبز اور سنہری ڈیزائن شامل ہیں جو عید کے لیے بہترین ہیں۔", es: "El tema Mughal Gold presenta adornos clásicos en verde y dorado, ideales para celebraciones religiosas.", fr: "Le thème Mughal Gold propose des ornements vert et or, parfaits pour les fêtes religieuses.", ar: "يتميز ثيم Mughal Gold بظلال الخضرة والذهب الكلاسيكية المثالية للمناسبات الدينية.", hi: "मुगल गोल्ड थीम में हरे और सुनहरे डिज़ाइन हैं, जो ईद के लिए एकदम सही हैं।", zh: "Mughal Gold 主题包含古典绿金装饰，非常适合节日庆典。", pt: "O tema Mughal Gold apresenta ornamentos clássicos em verde e ouro, perfeitos para celebrações.", ru: "Тема Mughal Gold оформлена в зеленых и золотых тонах, идеально подходящих для праздника.", de: "Das Thema Mughal Gold bietet klassische grüne und goldene Elemente, ideal für das Fest.", ja: "Mughal Goldテーマは伝統的なグリーン＆ゴールドの飾りが特徴で、お祝いに最適です。", ko: "Mughal Gold 테마는 그린과 골드 장식이 어우러져 종교 축제에 완벽하게 어울립니다.", it: "Il tema Mughal Gold presenta ornamenti in verde e oro, perfetti per le feste religiose.", tr: "Mughal Gold teması yeşil ve altın detaylarıyla bayram kutlamaları için mükemmeldir.", id: "Tema Mughal Gold menampilkan hiasan hijau dan emas klasik yang cocok untuk hari raya.", bn: "মুঘল گولڈ تھیمے রয়েছে চমৎকার سبز ও সোনালী ڈیزائن যা ঈদের لیے بہترین۔", vi: "Chủ đề Mughal Gold mang các hoa văn xanh và vàng cổ điển, hoàn hảo cho dịp lễ.", sw: "Mandhari ya Mughal Gold ina mapambo ya kijani na dhahabu, kamili kwa sherehe."
  },
  step3Title: {
    en: "Toggle Bilingual Language", ur: "دو زبانوں کا انتخاب کریں", es: "Activa la Opción Bilingüe", fr: "Activez l'Option Bilingue", ar: "التبديل إلى ثنائي اللغة", hi: "द्विभाषी भाषा विकल्प चुनें", zh: "开启双语对译功能", pt: "Ative o Modo Bilíngue", ru: "Переключите двуязычный режим", de: "Zweisprachigkeit aktivieren", ja: "バイリンガル表示を切り替え", ko: "이중 언어 옵션 설정", it: "Attiva la Lingua Bilingue", tr: "İki Dilli Seçeneği Açın", id: "Aktifkan Fitur Dua Bahasa", bn: "দ্বিমুখী ভাষা মোড অন করুন", vi: "Bật Chế Độ Song Ngữ", sw: "Weka Lugha Mbili"
  },
  step3Desc: {
    en: "Add recipient names in English, and write a custom greeting in Urdu or Arabic.", ur: "انگریزی میں نام درج کریں اور اردو یا عربی میں اپنا پیارا پیغام تحریر کریں۔", es: "Añade nombres en inglés y escribe un saludo personalizado en urdu o árabe.", fr: "Ajoutez les noms en anglais et écrivez un vœu personnalisé en ourdou ou en arabe.", ar: "أضف أسماء المستقبلين بالإنجليزية واكتب تهنئة مخصصة بالأوردية أو العربية.", hi: "अंग्रेजी में नाम जोड़ें और उर्दू या अरबी में अपना व्यक्तिगत संदेश लिखें।", zh: "用英文填写接收人姓名，并用乌尔都语或阿拉伯语撰写专属寄语。", pt: "Adicione nomes em inglês e escreva uma saudação personalizada em urdu ou árabe.", ru: "Укажите имена на английском и напишите поздравление на урду или арабском.", de: "Fügen Sie Namen auf Englisch hinzu und schreiben Sie Grüße auf Urdu oder Arabisch.", ja: "英語で宛名を入力し、ウルドゥー語やアラビア語でオリジナルのメッセージを添えましょう。", ko: "영어 이름을 입력하고 우르두어나 아랍어로 맞춤 메시지를 작성하세요.", it: "Aggiungi i nomi in inglese e scrivi un augurio personalizzato in urdu o arabo.", tr: "İsimleri İngilizce ekleyin, mesajınızı Türkçe, Urduca veya Arapça yazın.", id: "Tambahkan nama dalam bahasa Inggris, dan tulis ucapan khusus dalam bahasa Urdu atau Arab.", bn: "ইংরেজি নাম যোগ করুন এবং اردو یا عربی میں اپنا پیغام لکھیں۔", vi: "Thêm tên bằng tiếng Anh và viết lời chúc tùy chỉnh bằng tiếng Urdu hoặc Ả Rập.", sw: "Ongeza majina kwa Kiingereza, na uandike salamu maalum kwa Kiurdu au Kiarabu."
  },
  step4Title: {
    en: "Add Audio", ur: "بیک گراؤنڈ میوزک شامل کریں", es: "Añade Música de Fondo", fr: "Ajoutez de Musique de Fond", ar: "إضافة الصوت والموسيقى", hi: "ऑडियो और संगीत जोड़ें", zh: "添加节日背景音乐", pt: "Adicione Áudio e Música", ru: "Добавьте аудио сопровождение", de: "Audio hinzufügen", ja: "音楽を追加", ko: "오디오 추가", it: "Aggiungi Audio e Musica", tr: "Ses ve Müzik Ekle", id: "Tambahkan Audio", bn: "অডিও মিউজিক যুক্ত করুন", vi: "Thêm Âm Thanh", sw: "Ongeza Sauti na Muziki"
  },
  step4Desc: {
    en: "Choose a festive background tune to play as the card animates open.", ur: "کارڈ کے کھلنے پر چلنے کے لیے بہترین خوشگوار موسیقی یا دھن منتخب کریں۔", es: "Elige una melodía festiva de fondo que suene al abrir la tarjeta animada.", fr: "Choisissez une musique festive qui se déclenche lorsque la carte s'anime.", ar: "اختر نغمة احتفالية هادئة لتعزف تلقائياً عند فتح البطاقة المتحركة.", hi: "कार्ड खुलने पर बजने के लिए एक उत्सव पृष्ठभूमि धुन चुनें।", zh: "选择一首节日背景音乐，在卡片展开动画播放时同步奏响。", pt: "Escolha uma música festiva de fundo para tocar enquanto o cartão se abre.", ru: "Выберите праздничную мелодию, которая будет звучать при открытии открытки.", de: "Wählen Sie eine festliche Hintergrundmusik, die beim Öffnen der Karte ertönt.", ja: "カードが開くアニメーションに合わせて再生されるBGMを選択します。", ko: "카드가 열릴 때 재생될 축하 배경 음악을 선택하세요.", it: "Scegli un sottofondo musicale festoso da riprodurre all'apertura del biglietto.", tr: "Kart açılırken çalacak bayram coşkusuna uygun bir fon müziği seçin.", id: "Pilih musik latar ceria yang diputar saat kartu terbuka secara animasi.", bn: "کارڈ اینیمیٹ ہوتے وقت بجانے کے لیے ایک خوبصورت سر منتخب کریں۔", vi: "Chọn một bản nhạc nền vui tươi để phát khi thiệp mở ra sinh động.", sw: "Chagua wimbo wa background wa sikukuu wa kucheza kadi inapofunguka."
  },
  ctaTitle: {
    en: "Send Your Blessings Today", ur: "آج ہی اپنی مبارکباد بھیجیں", es: "Envía tus Bendiciones Hoy", fr: "Envoyez vos Bénédictions Aujourd'hui", ar: "أرسل تهانيك وبركاتك اليوم", hi: "आज ही अपने आशीर्वाद और शुभकामनाएं भेजें", zh: "立即呈献您的真挚祝福", pt: "Envie suas Bênçãos Hoje", ru: "Отправьте свои поздравления сегодня", de: "Senden Sie noch heute Ihre Segen", ja: "今日、祝福の言葉を送りましょう", ko: "오늘 축복의 마음을 전달하세요", it: "Invia le tue Benedizioni Oggi", tr: "Bayram Tebriğinizi Bugün Gönderin", id: "Kirimkan Berkah Anda Hari Ini", bn: "আজই আপনার শুভেচ্ছা জানান", vi: "Gửi Lời Cầu Chúc Của Bạn Hom Nay", sw: "Tuma Baraka Zako Leo"
  },
  ctaDesc: {
    en: "Customize your Eid card with animations, calligraphic Urdu fonts, and traditional music. Share instantly on WhatsApp for free.",
    ur: "اینیمیشن، خوبصورت خطاطی اور موسیقی کے ساتھ اپنا عید کارڈ بنائیں۔ واٹس ایپ پر مفت شیئر کریں۔",
    es: "Personaliza tu tarjeta de Eid con animaciones, caligrafía y música. Compártela al instante en WhatsApp gratis.",
    fr: "Personnalisez votre carte d'Aïd avec des animations et de la musique. Partagez instantanément sur WhatsApp gratuitement.",
    ar: "خصص بطاقة العيد الخاصة بك مع الرسوم المتحركة والخط العربي والموسيقى. شاركها فوراً عبر واتساب مجاناً.",
    hi: "एनिमेशन, सुंदर सुलेख और संगीत के साथ अपने ईद कार्ड को कस्टमाइज़ करें। व्हाट्सएप पर तुरंत मुफ्त शेयर करें।",
    zh: "添加精致动画、高雅字体与背景音乐，即刻生成专属祝贺卡并免费分享至 WhatsApp。",
    pt: "Personalize seu cartão de Eid com animações, caligrafia e música. Compartilhe instantaneamente no WhatsApp gratuitamente.",
    ru: "Настройте открытку к празднику Ид с анимацией, каллиграфией и музыкой. Поделитесь бесплатно через WhatsApp.",
    de: "Gestalten Sie Ihre Eid-Karte mit Animationen, Kalligrafie und Musik. Teilen Sie sie sofort kostenlos auf WhatsApp.",
    ja: "アニメーション、エレガントなフォント、お祝いの音楽でカードをカスタマイズ。WhatsAppで即座に無料共有できます。",
    ko: "애니메이션, 서체 및 음악으로 이드 카드를 완성해 WhatsApp으로 즉시 무료 공유해 보세요.",
    it: "Personalizza il tuo biglietto Eid con animazioni, calligrafia e musica. Condividilo all'istante su WhatsApp gratis.",
    tr: "Bayram kartınızı animasyonlar, özel fontlar ve müzikle süsleyin. WhatsApp'ta anında ücretsiz paylaşın.",
    id: "Kustomisasi kartu Idul Fitri Anda dengan animasi, kaligrafi, dan musik. Bagikan langsung ke WhatsApp secara gratis.",
    bn: "অ্যানিমেশন، সূক্ষ্ম ফন্ট ও সুর যুক্ত করে নিজের ঈদ کارڈ তৈরি کریں اور ہوسٹس ایپ پر مفت شیئر کریں۔",
    vi: "Tùy chỉnh thiệp Eid với hình ảnh động, phông chữ thư pháp và âm nhạc. Chia sẻ ngay trên WhatsApp miễn phí.",
    sw: "Weka kadi yako ya Eid tayari kwa picha za mwendo, font nzuri, na muziki. Shiriki mara moja kwenye WhatsApp bure."
  },
  sendEidWishBtn: {
    en: "Send an Eid Wish Now", ur: "ابھی عید کا پیغام بھیجیں", es: "Enviar Deseo de Eid Ahora", fr: "Envoyer un Vœu d'Aïd Maintenant", ar: "أرسل تهنئة العيد الآن", hi: "अभी ईद की शुभकामनाएं भेजें", zh: "立即发送开斋节祝福", pt: "Enviar Desejo de Eid Agora", ru: "Отправить поздравление с Ид", de: "Jetzt Eid-Wunsch senden", ja: "今すぐEidカードを送る", ko: "지금 이드 카트 보내기", it: "Invia Auguri per l'Eid Ora", tr: "Şimdi Bayram Kartı Gönder", id: "Kirim Ucapan Hari Raya Sekarang", bn: "এখনই ঈদের বার্তা পাঠান", vi: "Gửi Lời Chúc Eid Ngay", sw: "Tuma Tamani la Eid Sasa"
  },
  moreGuidesBtn: {
    en: "More Celebration Guides", ur: "مزید تقریبات کے گائیڈز", es: "Más Guías de Celebración", fr: "Plus de Guides de Célébration", ar: "المزيد من أدلة الاحتفالات", hi: "अधिक उत्सव गाइड", zh: "浏览更多节庆指南", pt: "Mais Guias de Celebração", ru: "Другие руководства", de: "Weitere Leitfäden", ja: "他のお祝いガイドを見る", ko: "더 많은 축하 가이드 보기", it: "Altre Guide per le Feste", tr: "Diğer Kutlama Rehberleri", id: "Panduan Perayaan Lainnya", bn: "আরও উদযাপনের গাইড", vi: "Xem Thêm Hướng Dẫn Kỷ Niệm", sw: "Miongozo Zaidi ya Sherehe"
  }
}

import { Breadcrumbs } from '@/components/breadcrumbs'

export default function EidGuidePage() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return EID_GUIDE_TEXT[key]?.[lang] || EID_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Celebration Guides', href: '/guide' },
            { label: 'Eid Mubarak Wishes & Wording' },
          ]}
          className="mb-4"
        />
        
        {/* Back button */}
        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" /> {getText('backToGuides')}
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-10">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {getText('badge')}
            </span>
            <h1 className={cn(
              "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight",
              isUrdu && "font-urdu py-2 text-2xl sm:text-3xl"
            )}>
              {getText('title')}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/60 py-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" /> {getText('publishedDate')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" /> {getText('readTime')}
              </span>
              <span>{getText('author')}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">
            
            <p className={cn(isUrdu && "font-urdu leading-relaxed")}>
              {getText('introP1')}
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec1Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec1Bullet1')}&quot;</li>
              <li>&quot;{getText('sec1Bullet2')}&quot;</li>
              <li>&quot;{getText('sec1Bullet3')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec2Title')}
            </h3>
            <blockquote>
              <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-1">
                &quot;{getText('sec2Quote')}&quot;
              </p>
            </blockquote>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec3Title')}
            </h3>

            <div className="space-y-4 my-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h4 className="font-bold text-xs sm:text-sm text-muted-foreground uppercase mb-2">{getText('sec3Label1')}</h4>
                <p className="text-base sm:text-lg font-urdu text-primary text-right leading-relaxed">
                  آپ کو اور آپ کے تمام اہل خانہ کو میری طرف سے عید سعید مبارک۔ اللہ تعالیٰ آپ کی زندگی کو خوشیوں، صحت اور تندرستی سے بھر دے۔ آمین۔
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h4 className="font-bold text-xs sm:text-sm text-muted-foreground uppercase mb-2">{getText('sec3Label2')}</h4>
                <p className="text-base sm:text-lg font-urdu text-primary text-center leading-relaxed py-2">
                  عید کا دن ہے گلے ہم کو لگا کر ملئے<br />
                  رسم دنیا بھی ہے، موقع بھی ہے، دستور بھی ہے
                </p>
              </div>
            </div>

            {/* Dedicated Section: "Eid Mubarak to You Too" Meaning in Urdu & How to Reply */}
            <section className="my-10 p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                What Does &quot;Eid Mubarak to You Too&quot; Mean in Urdu? (Proper Replies &amp; Meanings)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When someone wishes you a happy Eid, replying with warmth and cultural etiquette is an essential part of South Asian hospitality. If you are searching for what <strong>&quot;Eid Mubarak to you too&quot;</strong> means in Urdu and how to respond properly, here is the full linguistic guide:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="p-4 rounded-2xl bg-card border border-border">
                  <span className="text-xs font-bold uppercase text-emerald-600">Standard Urdu Translation</span>
                  <p className="text-lg font-urdu font-bold text-foreground mt-1">آپ کو بھی عید مبارک</p>
                  <p className="text-xs text-muted-foreground mt-1"><strong>Roman Urdu:</strong> Aap ko bhi Eid Mubarak!</p>
                  <p className="text-xs text-muted-foreground"><strong>English Meaning:</strong> Eid Mubarak to you too!</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border">
                  <span className="text-xs font-bold uppercase text-amber-600">Traditional Islamic Response</span>
                  <p className="text-lg font-urdu font-bold text-foreground mt-1">خیر مبارک</p>
                  <p className="text-xs text-muted-foreground mt-1"><strong>Roman Urdu:</strong> Khair Mubarak!</p>
                  <p className="text-xs text-muted-foreground"><strong>English Meaning:</strong> May goodness and blessings be upon you as well!</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border/70 space-y-2">
                <h4 className="font-bold text-sm text-foreground">More Traditional Urdu Replies to Eid Mubarak:</h4>
                <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
                  <li><strong>&quot;Khair Mubarak, Aap ko bhi عید مبارک!&quot;</strong> — Combining both for extra warmth.</li>
                  <li><strong>&quot;سدا خوش رہیں، عید مبارک&quot;</strong> (<em>Sada khush rahein, Eid Mubarak</em>) — &quot;May you always remain happy and blessed.&quot;</li>
                  <li><strong>&quot;تقبل الله منا ومنكم&quot;</strong> (<em>Taqabbal Allahu minna wa minkum</em>) — &quot;May Allah accept good deeds from us and from you.&quot;</li>
                </ul>
              </div>
            </section>

            {/* Dedicated Section: Urdu Eid Mubarak Wishes & Greetings Collection */}
            <section className="my-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/80 pb-2">
                Copyable Urdu Eid Mubarak Wishes &amp; Greetings (باآسانی کاپی کریں)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Copy these curated Urdu Eid greetings directly to send to relatives on WhatsApp or include in your custom Cardzy animated wish card:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-border bg-card">
                  <p className="text-base font-urdu text-right text-primary font-bold">
                    اللہ تعالیٰ آپ کی زندگی کو خوشیوں، صحت اور کامیابی سے بھر دے۔ عید مبارک!
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <em>English: May Almighty Allah fill your life with eternal happiness, good health, and success. Eid Mubarak!</em>
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-border bg-card">
                  <p className="text-base font-urdu text-right text-primary font-bold">
                    عید کا چاند آپ کی زندگی میں نئی امیدیں اور ڈھیروں خوشیاں لائے۔ عید الفطر مبارک!
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <em>English: May the crescent moon of Eid bring new hope and endless joy to your life. Eid ul Fitr Mubarak!</em>
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-border bg-card">
                  <p className="text-base font-urdu text-right text-primary font-bold">
                    دعاؤں کی قبولیت اور خوشیوں کی برسات کے ساتھ آپ کو اور آپ کی پوری فیملی کو عید مبارک!
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <em>English: With accepted prayers and showers of blessings, Eid Mubarak to you and your entire family!</em>
                  </p>
                </div>
              </div>
            </section>

            {/* Dedicated FAQ Accordion Section */}
            <section className="my-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/80 pb-2">
                Frequently Asked Questions (Frequently Searched)
              </h3>
              <div className="space-y-3">
                <details className="group p-4 rounded-2xl border border-border bg-card [&_summary::-webkit-details-marker]:none">
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-foreground">
                    <span>What does &quot;Eid Mubarak to you too&quot; mean in Urdu?</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">👇</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    In Urdu, &quot;Eid Mubarak to you too&quot; is written as <strong>&quot;آپ کو بھی عید مبارک&quot;</strong> (pronounced <em>Aap ko bhi Eid Mubarak</em>). The customary traditional reply is <strong>&quot;خیر مبارک&quot;</strong> (<em>Khair Mubarak</em>), which means &quot;May goodness be upon you as well.&quot;
                  </p>
                </details>
                <details className="group p-4 rounded-2xl border border-border bg-card [&_summary::-webkit-details-marker]:none">
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-foreground">
                    <span>How do you wish Eid Mubarak in Urdu?</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">👇</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    You can say <strong>&quot;عید مبارک&quot;</strong> (<em>Eid Mubarak</em>) or for a more formal and affectionate greeting say: <strong>&quot;آپ کو اور آپ کے تمام اہل خانہ کو عید مبارک&quot;</strong> (<em>Aap ko aur aap ke tamam ahal-e-khana ko Eid Mubarak</em>).
                  </p>
                </details>
                <details className="group p-4 rounded-2xl border border-border bg-card [&_summary::-webkit-details-marker]:none">
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-foreground">
                    <span>How do I send an animated 3D Eid wish card with my photo on WhatsApp?</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">👇</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Simply open Cardzy&apos;s free <Link href="/create-wish" className="text-primary font-bold hover:underline">Wish Card Generator</Link>, choose the Eid occasion, type your name and optional custom dua, upload your family picture, and click &quot;Share on WhatsApp&quot;. Your recipient gets a 4K animated greeting card link immediately!
                  </p>
                </details>
              </div>
            </section>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec4Title')}
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>{getText('step1Title')}: </strong>{getText('step1Desc')}
              </li>
              <li>
                <strong>{getText('step2Title')}: </strong>{getText('step2Desc')}
              </li>
              <li>
                <strong>{getText('step3Title')}: </strong>{getText('step3Desc')}
              </li>
              <li>
                <strong>{getText('step4Title')}: </strong>{getText('step4Desc')}
              </li>
            </ol>

          </div>

          {/* FAQ Schema Script for Search Engines */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What does "Eid Mubarak to you too" mean in Urdu and how do you reply?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'In Urdu, "Eid Mubarak to you too" translates to "آپ کو بھی عید مبارک" (Aap ko bhi Eid Mubarak). The most traditional response is "خیر مبارک" (Khair Mubarak), meaning "May goodness and blessings be upon you as well."'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'How do you wish Eid Mubarak in Urdu?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'To wish Eid Mubarak in Urdu, you can say "عید مبارک" (Eid Mubarak) or "آپ کو اور آپ کے تمام اہل خانہ کو عید مبارک" (Aap ko aur aap ke tamam ahal-e-khana ko Eid Mubarak).'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the traditional reply to Eid Mubarak in Urdu?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The most traditional reply to Eid Mubarak in Urdu is "خیر مبارک" (Khair Mubarak). You can also say "Taqabbal Allahu minna wa minkum" (May Allah accept it from us and from you).'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'How can I create a personalized 3D animated Eid card with my name?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'You can create a free personalized 3D animated Eid card on Cardzy.online by entering your name, selecting an authentic Urdu or English Eid wish, adding a photo, and sharing directly on WhatsApp.'
                    }
                  }
                ]
              })
            }}
          />

          {/* Article Footer / CTA */}
          <footer className="mt-12 border-t border-border/80 pt-8 text-center">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5">
              <Heart className="size-5 text-primary shrink-0 animate-pulse" /> {getText('ctaTitle')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              {getText('ctaDesc')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/create-wish"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Send className="size-4" /> {getText('sendEidWishBtn')}
              </Link>
              <Link
                href="/guide"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                {getText('moreGuidesBtn')}
              </Link>
            </div>
          </footer>
        </article>

      </div>
    </div>
  )
}
