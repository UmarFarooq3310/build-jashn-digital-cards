'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, MapPin, Smartphone, Music, Heart } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const WEDDING_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: {
    en: "Back to Guides", ur: "گائیڈز پر واپس جائیں", es: "Volver a las Guías", fr: "Retour aux Guides", ar: "العودة إلى الأدلة", hi: "वापस गाइड पर जाएं", zh: "返回指南列表", pt: "Voltar para os Guias", ru: "Назад к руководствам", de: "Zurück zu den Anleitungen", ja: "ガイド一覧に戻る", ko: "가이드 목록으로 돌아가기", it: "Torna alle Guide", tr: "Rehberlere Dön", id: "Kembali ke Panduan", bn: "গাইডে ফিরে যান", vi: "Quay Lại Hướng Dẫn", sw: "Rudi kwenye Miongozo"
  },
  badge: {
    en: "Weddings & Celebrations", ur: "شادیاں اور تقریبات", es: "Bodas y Celebraciones", fr: "Mariages et Célébrations", ar: "الأعراس والاحتفالات", hi: "विवाह और उत्सव", zh: "婚礼与庆典", pt: "Casamentos e Celebrações", ru: "Свадьбы и торжества", de: "Hochzeiten & Feiern", ja: "結婚式とお祝い", ko: "결혼식 & 축하", it: "Matrimoni e Feste", tr: "Düğünler ve Kutlamalar", id: "Pernikahan & Perayaan", bn: "বিবাহ ও উদযাপন", vi: "Đám Cưới & Lễ Kỷ Niệm", sw: "Harusi na Sherehe"
  },
  title: {
    en: "How to Design the Perfect Digital Wedding Invitation: Wording & Etiquette",
    ur: "مکمل ڈیجیٹل شادی کا دعوت نامہ کیسے بنائیں: الفاظ اور طریقے",
    es: "Cómo Diseñar la Invitación de Boda Digital Perfecta: Redacción y Etiqueta",
    fr: "Comment Concevoir l'Invitation de Mariage Numérique Parfaite: Formulation et Étiquette",
    ar: "كيفية تصميم دعوة الزفاف الرقمية المثالية: الصياغة وآداب الدعوة",
    hi: "परफेक्ट डिजिटल वेडिंग कार्ड कैसे बनाएं: शब्द और शिष्टाचार",
    zh: "如何设计完美的数字婚礼邀请函：用词与礼仪指南",
    pt: "Como Criar o Convite de Casamento Digital Perfeito: Redação e Etiqueta",
    ru: "Как создать идеальное цифровое свадебное приглашение: формулировки и этикет",
    de: "So gestalten Sie die perfekte digitale Hochzeitseinladung: Formulierungen & Etikette",
    ja: "完璧なデジタル結婚式招待状のデザイン方法：文面とマナー",
    ko: "완벽한 디지털 결혼식 초대장 제작 방법: 문구 및 예절",
    it: "Come Progettare l'Invito di Nozze Digitale Perfetto: Testo ed Etichetta",
    tr: "Kusursuz Dijital Düğün Davetiyesi Nasıl Tasarlanır: Metinler ve Nezaket Kuralları",
    id: "Cara Merancang Undangan Pernikahan Digital yang Sempurna: Kata-kata & Etika",
    bn: "নিখুঁত دیجیتال বিয়ের আমন্ত্রণ তৈরির নির্দেশিকা: শব্দ ও শিষ্টাচার",
    vi: "Cách Thiết Kế Thiệp Mời Đám Cưới Kỹ Thuật Số Hoàn Hảo: Lời Chúc & Nghi Thức",
    sw: "Jinsi ya Kutengeneza Mwaliko Bora wa Harusi wa Dijitali: Maneno na Etiquette"
  },
  publishedDate: {
    en: "Published July 18, 2026", ur: "شائع ہوا: 18 جولائی 2026", es: "Publicado el 18 de julio de 2026", fr: "Publié le 18 juillet 2026", ar: "تاريخ النشر: 18 يوليو 2026", hi: "प्रकाशित: 18 जुलाई 2026", zh: "发布于 2026年7月18日", pt: "Publicado em 18 de julho de 2026", ru: "Опубликовано 18 июля 2026 г.", de: "Veröffentlicht am 18. Juli 2026", ja: "2026年7月18日公開", ko: "2026년 7월 18일 작성됨", it: "Pubblicato il 18 luglio 2026", tr: "Yayınlanma: 18 Temmuz 2026", id: "Diterbitkan 18 Juli 2026", bn: "প্রকাশের তারিখ: ১৮ জুলাই, ২০২৬", vi: "Đăng ngày 18 tháng 7 năm 2026", sw: "Ilichapishwa 18 Julai 2026"
  },
  readTime: {
    en: "6 min read", ur: "6 منٹ مطالعہ", es: "6 min de lectura", fr: "6 min de lecture", ar: "6 دقائق قراءة", hi: "6 मिनट का पाठ", zh: "6 分钟阅读", pt: "6 min de leitura", ru: "6 мин чтения", de: "6 Min. Lesezeit", ja: "6分で読める", ko: "6분 소요", it: "6 min di lettura", tr: "6 dk okuma", id: "6 menit baca", bn: "৬ মিনিট পাঠ", vi: "6 phút đọc", sw: "dakika 6 za kusoma"
  },
  author: {
    en: "By Cardzy Editorial Team", ur: "کارڈزی کی تحریر", es: "Por el equipo editorial de Cardzy", fr: "Par l'équipe éditoriale Cardzy", ar: "بقلم فريق تحرير Cardzy", hi: "Cardzy संपादकीय टीम द्वारा", zh: "Cardzy 编辑团队", pt: "Pela equipe editorial do Cardzy", ru: "Редакция Cardzy", de: "Von der Cardzy Redaktion", ja: "Cardzy 編集チーム", ko: "Cardzy 에디토리얼 팀", it: "A cura del team editoriale di Cardzy", tr: "Cardzy Editör Ekibi", id: "Oleh Tim Editorial Cardzy", bn: "Cardzy এডিটরিয়াল ٹیم", vi: "Bởi Đội Ngũ Biên Tập Cardzy", sw: "Na Timu ya Hariri ya Cardzy"
  },
  introP1: {
    en: "In South Asian traditions, wedding planning is a vibrant journey filled with colors, rituals, and grand events. Historically, printing and distributing physical cards was a heavy logistics task. Today, digital wedding invitations are revolutionizing how couples invite guests.",
    ur: "شادیاں روایات اور رنگا رنگ تقریبات سے بھری ہوتی ہیں۔ ماضی میں کاغذ کے کارڈز چھپوانا اور تقسیم کرنا مشکل کام تھا۔ آج ڈیجیٹل دعوت نامے اس عمل کو انتہائی آسان بنا رہے ہیں۔",
    es: "Las bodas son un viaje vibrante lleno de color, rituales y grandes eventos. Hoy en día, las invitaciones digitales están revolucionando la forma en que los novios invitan a sus seres queridos.",
    fr: "Les mariages sont un voyage vibrant rempli de traditions et d'événements. Aujourd'hui, les invitations numériques révolutionnent la manière d'inviter vos proches.",
    ar: "تعد الترتيبات لحفلات الزفاف رحلة مليئة بالألوان والفعاليات. اليوم، تحدث الدعوات الرقمية ثورة في كيفية إرسال الدعوات للضيوف بسهولة.",
    hi: "शादियों की योजना बनाना रंगों और परंपराओं से भरी एक सुंदर यात्रा है। आज, डिजिटल वेडिंग कार्ड मेहमानों को आमंत्रित करने के तरीके में क्रांति ला रहे हैं।",
    zh: "婚礼筹备是一段充满传统色彩与重大会议的欢聚之旅。如今，数字婚礼邀请函正在彻底改变人们向亲朋好友传递邀约的方式。",
    pt: "O planejamento de um casamento é uma jornada cheia de tradições e grandes momentos. Hoje, os convites digitais revolucionam a forma de convidar seus convidados.",
    ru: "Свадьба — это грандиозный праздник, наполненный традициями. Сегодня цифровые свадебные приглашения кардинально меняют способ приглашения гостей.",
    de: "Eine Hochzeitsplanung ist voller Traditionen und großer Momente. Heute revolutionieren digitale Einladungen die Art und Weise, wie Paare Gäste einladen.",
    ja: "結婚式の計画は伝統と色鮮やかなお祝いに満ちた素晴らしい旅です。現代のデジタル招待状は招待のスタイルを革新しています。",
    ko: "결혼식 준비는 전통과 아름다운 순간들로 가득 찬 여정입니다. 오늘날 디지털 초대장은 하객을 초대하는 방식을 혁신하고 있습니다.",
    it: "La pianificazione di un matrimonio è un viaggio vibrante ricco di tradizioni. Oggi gli inviti digitali stanno rivoluzionando il modo di invitare gli ospiti.",
    tr: "Düğün planlaması gelenekler ve renkli anlarla dolu bir yolculuktur. Günümüzde dijital davetiyeler misafirleri davet etme şeklini değiştiriyor.",
    id: "Perencanaan pernikahan adalah perjalanan indah yang penuh tradisi. Saat ini, undangan digital mengubah cara pasangan mengundang para tamu.",
    bn: "বিয়ের পরিকল্পনা রঙ ও ঐতিহ্যে ভরা এক সুন্দর যাত্রা। আজ 디지털 ইনভিটেশন আমন্ত্রণ জানানোর প্রক্রিয়া সহজ و modern করে তুলছে।",
    vi: "Lập kế hoạch đám cưới là một hành trình rực rỡ đầy truyền thống. Ngày nay, thiệp mời kỹ thuật số đang mang lại sự tiện lợi vượt trội.",
    sw: "Mipango ya harusi ni safari ya kitamaduni na matukio makubwa. Leo mialiko ya dijitali inabadilisha jinsi ya kualika wageni."
  },
  sec1Title: {
    en: "1. The Anatomy of a Digital Wedding Invite", ur: "1. ڈیجیٹل شادی کارڈ کے بنیادی اجزاء", es: "1. La Anatomía de una Invitación de Boda Digital", fr: "1. L'Anatomie d'une Invitation de Mariage Numérique", ar: "1. تشريح دعوة الزفاف الرقمية", hi: "1. डिजिटल वेडिंग कार्ड के प्रमुख अंग", zh: "1. 数字婚礼邀请函的核心要素", pt: "1. A Anatomia de um Convite de Casamento Digital", ru: "1. Анатомия цифрового свадебного приглашения", de: "1. Die Anatomie einer digitalen Hochzeitseinladung", ja: "1. デジタル結婚式招待状の構成要素", ko: "1. 디지털 결혼식 초대장의 핵심 구성 요소", it: "1. L'Anatomia di un Invito di Nozze Digitale", tr: "1. Dijital Düğün Davetiyesinin Bileşenleri", id: "1. Anatomi Undangan Pernikahan Digital", bn: "১. ডিজিটাল বিয়ের کارڈ کے اہم اجزاء", vi: "1. Cấu Trúc Của Một Thiệp Mời Đám Cưới Kỹ Thuật Số", sw: "1. Muundo wa Mwaliko wa Harusi wa Dijitali"
  },
  anatomy1Label: {
    en: "Host Names:", ur: "میزبانوں کے نام:", es: "Nombres de los anfitriones:", fr: "Noms des hôtes :", ar: "أسماء الداعين:", hi: "मेजबानों के नाम:", zh: "主婚人姓名：", pt: "Nomes dos Anfitriões:", ru: "Имена организаторов:", de: "Namen der Gastgeber:", ja: "主催者のお名前：", ko: "혼주 성함:", it: "Nomi degli Ospitanti:", tr: "Ev Sahibi İsimleri:", id: "Nama Tuan Rumah:", bn: "আয়োজকদের নাম:", vi: "Tên Chủ Trì:", sw: "Majina ya Waandalizi:"
  },
  anatomy1Text: {
    en: "Showing clearly who is hosting the event (parents of the bride or groom).", ur: "واضح طور پر دکھانا کہ تقریب کا میزبان کون ہے (دلہا یا دلہن کے والدین)۔", es: "Mostrando claramente quién organiza el evento (padres de la novia o del novio).", fr: "Indiquant clairement qui invite (les parents de la mariée ou du marié).", ar: "إظهار من يدعو للحفل بوضوح (والدا العروس أو العريس).", hi: "स्पष्ट रूप से दिखाना कि कार्यक्रम की मेजबानी कौन कर रहा है (दूल्हा या दुल्हन के माता-पिता)।", zh: "清晰展示谁在主持婚礼（新郎或新娘的父母）。", pt: "Mostrando claramente quem está organizando o evento (pais da noiva ou do noivo).", ru: "Четко указывается, кто выступает организатором (родители невесты или жениха).", de: "Zeigt deutlich, wer die Veranstaltung ausrichtet (Eltern der Braut oder des Bräutigams).", ja: "新郎新婦のご両親など、どなたが主催者であるかを明確に示します。", ko: "행사를 주최하는 분(신랑 또는 신부 부모님)을 명확히 표시합니다.", it: "Mostra chiaramente chi organizza l'evento (genitori della sposa o dello sposo).", tr: "Etkinliğe kimin ev sahipliği yaptığını net bir şekilde gösterin (gelin veya damadın ebeveynleri).", id: "Menampilkan dengan jelas siapa penyelenggara acara (orang tua pengantin wanita/pria).", bn: "অনুষ্ঠানের আয়োজک کے (কনে یا بরের ما-بابا) তা واضح طور پر پیش کرنا۔", vi: "Hiển thị rõ ràng ai là người chủ trì sự kiện (cha mẹ chú rể hoặc cô dâu).", sw: "Kuonyesha wazi ni nani anayeandaa tukio (wazazi wa bibi harusi au bwana harusi)."
  },
  anatomy2Label: {
    en: "Bilingual Greetings:", ur: "دو زبانوں میں پیغامات:", es: "Saludos bilingües:", fr: "Salutations bilingues :", ar: "التحيات ثنائية اللغة:", hi: "द्विभाषी संदेश:", zh: "双语雅致致辞：", pt: "Saudações Bilíngues:", ru: "Двуязычные приветствия:", de: "Zweisprachige Grüße:", ja: "バイリンガルな祝辞：", ko: "이중 언어 인사말:", it: "Saluti Bilingui:", tr: "İki Dilli Mesajlar:", id: "Ucapan Dua Bahasa:", bn: "দ্বিভাষিক শুভেচ্ছা:", vi: "Lời Chúc Song Ngữ:", sw: "Salamu za Lugha Mbili:"
  },
  anatomy2Text: {
    en: "Traditional Bismillah calligraphy followed by detailed event descriptions.", ur: "بسم اللہ خطاطی اور اس کے بعد تقریب کی تمام تفصیلات۔", es: "Caligrafía tradicional seguida de descripciones detalladas del evento.", fr: "Calligraphie traditionnelle suivie de la description détaillée de l'événement.", ar: "الخط العربي التقليدي متبوعاً بتفاصيل الفعالية.", hi: "पारंपरिक सुलेख के साथ विस्तृत कार्यक्रम विवरण।", zh: "包含传统书法艺术以及详细的活动流程说明。", pt: "Caligrafia tradicional seguida de descrições detalhadas do evento.", ru: "Традиционная каллиграфия и подробное описание программы мероприятия.", de: "Traditionelle Kalligrafie gefolgt von detaillierten Beschreibungen.", ja: "伝統的なカリグラフィーとそれに続く詳細なイベント案内。", ko: "전통 칼리그라피 및 상세한 이벤트 안내 문구.", it: "Calligrafia tradizionale seguita dalle descrizioni dettagliate dell'evento.", tr: "Geleneksel hat sanatı ve ardından detaylı etkinlik açıklamaları.", id: "Kaligrafi tradisional diikuti dengan deskripsi acara yang detail.", bn: "ঐতিহ্যবাহী ক্যালিগ্রাফি এবং বিস্তারিত বিবরণ।", vi: "Thư pháp truyền thống kết hợp mô tả chi tiết sự kiện.", sw: "Kaligrafia ya jadi ikifuatiwa na maelezo ya kina ya tukio."
  },
  anatomy3Label: {
    en: "Event Timings:", ur: "تقریب کے اوقات:", es: "Horarios del evento:", fr: "Horaires des événements :", ar: "أوقات الفعاليات:", hi: "कार्यक्रम का समय:", zh: "活动精确时间：", pt: "Horários do Evento:", ru: "Время мероприятий:", de: "Veranstaltungszeiten:", ja: "イベントの時間帯：", ko: "행사 시간:", it: "Orari dell'Evento:", tr: "Etkinlik Saatleri:", id: "Waktu Acara:", bn: "অনুষ্ঠানের সময়সূচী:", vi: "Thời Gian Sự Kiện:", sw: "Muda wa Tukio:"
  },
  anatomy3Text: {
    en: "Stating both guest arrival time and dinner/nikah ceremony times.", ur: "مہمانوں کی آمد کا وقت اور کھانا یا نکاح کا وقت واضح بتانا۔", es: "Indica la hora de llegada de invitados y el horario de la cena o ceremonia.", fr: "Précise l'heure d'arrivée des invités et l'heure du dîner ou de la cérémonie.", ar: "تحديد وقت وصول الضيوف ووقت العشاء أو عقد القران.", hi: "मेहमानों के आगमन का समय और भोजन/समारोह का समय स्पष्ट रूप से बताएं।", zh: "准确注明宾客到达时间与晚宴/仪式开始时间。", pt: "Informando o horário de chegada dos convidados e o horário do jantar/cerimônia.", ru: "Указание времени прибытия гостей и проведения церемонии/ужина.", de: "Gibt sowohl die Ankunftszeit der Gäste als auch die Zeit des Festessens/der Zeremonie an.", ja: "ゲストの到着時刻と夕食・ceremonyの開始時刻を明確に記載。", ko: "하객 도착 시간 및 예식/식사 시간을 상세히 명시합니다.", it: "Indica sia l'orario di arrivo degli ospiti sia l'ora della cena o della cerimonia.", tr: "Davetlilerin varış saatini ve nikah/yemek saatini net biçimde belirtin.", id: "Menyebutkan waktu kedatangan tamu dan waktu makan malam/akad nikah.", bn: "অতিথিদের আসার সময় এবং খাওয়ার/নিকাহের সময় উল্লেখ করা।", vi: "Ghi rõ thời gian đón khách và thời gian làm lễ/dùng tiệc.", sw: "Kuonyesha muda wa kuwasili kwa wageni na muda wa chakula au sherehe."
  },
  anatomy4Label: {
    en: "Dress Code Guidelines:", ur: "لباس کی ہدایات:", es: "Código de vestimenta:", fr: "Code vestimentaire :", ar: "قواعد اللباس:", hi: "ड्रेस कोड निर्देश:", zh: "着装要求指南：", pt: "Dress Code / Traje:", ru: "Дресс-код:", de: "Dresscode-Hinweise:", ja: "ドレスコードの案内：", ko: "드레스 코드 안내:", it: "Codice di Abbigliamento:", tr: "Kıyafet Kodu (Dress Code):", id: "Ketentuan Busana (Dress Code):", bn: "পোশাকের নির্দেশিকা:", vi: "Quy Định Trang Phục:", sw: "Mwongozo wa Mavazi:"
  },
  anatomy4Text: {
    en: "Helping guests match the celebration theme.", ur: "مہمانوں کو تقریب کے تھیم کے مطابق تیار ہونے میں مدد کرنا۔", es: "Ayuda a los invitados a combinar con el tema de la celebración.", fr: "Aide les invités à s'accorder avec le thème de la fête.", ar: "مساعدة الضيوف في اختيار ملابس تتناسب مع ثيم الحفل.", hi: "मेहमानों को उत्सव के विषय से मेल खाने में मदद करना।", zh: "帮助宾客挑选与宴会主题契合的服饰搭配。", pt: "Ajudando os convidados a combinarem com o tema da celebração.", ru: "Помогает гостям подобрать наряды в соответствии с темой торжества.", de: "Hilft den Gästen, sich dem Thema der Feier entsprechend zu kleiden.", ja: "ゲストがお祝いのテーマに合わせた服装を選べるようサポートします。", ko: "하객들이 행사의 테마에 맞게 의상을 준비할 수 있도록 돕습니다.", it: "Aiuta gli ospiti ad abbinare gli abiti al tema della festa.", tr: "Misafirlerin kutlama temasına uygun kıyafet seçmelerine yardımcı olun.", id: "Membantu tamu menyesuaikan pakaian dengan tema perayaan.", bn: "অনুষ্ঠানের تھیم کے ساتھ ملتے جلتے لباس پہننے کی گائیڈ۔", vi: "Giúp khách mời lựa chọn trang phục phù hợp với chủ đề của buổi lễ.", sw: "Kusaidia wageni kulinganisha mavazi yao na mandhari ya sherehe."
  },
  sec2Title: {
    en: "2. Traditional Wording Templates (English & Urdu)", ur: "2. روایتی تحریری ٹیمپلیٹس (انگریزی اور اردو)", es: "2. Plantillas de Redacción Tradicionales (Inglés y Urdu)", fr: "2. Modèles de Texte Traditionnels (Anglais et Ourdou)", ar: "2. نماذج الصياغة التقليدية (الإنجليزية والأوردية)", hi: "2. पारंपरिक शब्द टेम्पलेट (अंग्रेजी और उर्दू)", zh: "2. 传统撰词模板（英文与乌尔都语）", pt: "2. Modelos de Redação Tradicionais (Inglês e Urdu)", ru: "2. Традиционные шаблоны текстов (Английский и Урду)", de: "2. Traditionelle Textvorlagen (Englisch & Urdu)", ja: "2. 伝統的な文面テンプレート（英語＆ウルドゥー語）", ko: "2. 전통 문구 템플릿 (영어 및 우르두어)", it: "2. Modelli di Testo Tradizionali (Inglese e Urdu)", tr: "2. Geleneksel Metin Şablonları (İngilizce ve Urduca)", id: "2. Templat Kata-kata Tradisional (Inggris & Urdu)", bn: "২. প্রথাগত টেক্সট টেমপ্লেট (ইংরেজি ও اردو)", vi: "2. Mẫu Câu Lời Chúc Truyền Thống (Tiếng Anh & Urdu)", sw: "2. Violezo vya Maneno ya Jadi (Kiingereza na Urdu)"
  },
  templateMehndiBadge: {
    en: "Mehndi / Dholki Template", ur: "مہندی / ڈھولکی ٹیمپلیٹ", es: "Plantilla para Mehndi / Dholki", fr: "Modèle Mehndi / Dholki", ar: "نموذج الحناء والدولكي", hi: "मेंहदी / ढोलकी टेम्पलेट", zh: "Mehndi / Dholki 请柬模板", pt: "Modelo para Mehndi / Dholki", ru: "Шаблон для Мехнди / Дхолки", de: "Vorlage für Mehndi / Dholki", ja: "Mehndi / Dholki テンプレート", ko: "멘디 / 돌키 템플릿", it: "Modello per Mehndi / Dholki", tr: "Kına / Dholki Şablonu", id: "Templat Mehndi / Dholki", bn: "মেহেদি / ঢোলকি টেমপ্লেট", vi: "Mẫu Thiệp Mehndi / Dholki", sw: "Kiolezo cha Mehndi / Dholki"
  },
  templateBaraatBadge: {
    en: "Baraat / Shaadi Template", ur: "بارات / شادی ٹیمپلیٹ", es: "Plantilla para Baraat / Boda", fr: "Modèle Baraat / Mariage", ar: "نموذج الزفاف والبرات", hi: "बारात / शादी टेम्पलेट", zh: "Baraat / Shaadi 婚礼主宴模板", pt: "Modelo para Baraat / Casamento", ru: "Шаблон для Бараат / Свадьбы", de: "Vorlage für Baraat / Hochzeit", ja: "Baraat / Shaadi テンプレート", ko: "바라트 / 결혼식 템플릿", it: "Modello per Baraat / Matrimonio", tr: "Düğün / Baraat Şablonu", id: "Templat Baraat / Pernikahan", bn: "বারাত / শাদী টেমপ্লেট", vi: "Mẫu Thiệp Baraat / Tiệc Cưới", sw: "Kiolezo cha Baraat / Harusi"
  },
  labelEnglishWording: {
    en: "English Wording:", ur: "انگریزی الفاظ:", es: "Redacción en inglés:", fr: "Formulation en anglais :", ar: "الصياغة بالإنجليزية:", hi: "अंग्रेजी शब्द:", zh: "英文版本文字：", pt: "Texto em Inglês:", ru: "Текст на английском:", de: "Englische Formulierung:", ja: "英文メッセージ：", ko: "영어 문구:", it: "Testo in Inglese:", tr: "İngilizce Metin:", id: "Teks Bahasa Inggris:", bn: "ইংরেজি বার্তা:", vi: "Lời Chúc Tiếng Anh:", sw: "Maneno ya Kiingereza:"
  },
  labelUrduWording: {
    en: "Urdu Calligraphy Wording:", ur: "اردو خطاطی کے الفاظ:", es: "Caligrafía en urdu:", fr: "Calligraphie en ourdou :", ar: "الخط العربي بالأوردية:", hi: "उर्दू सुलेख शब्द:", zh: "乌尔都语书法雅致文字：", pt: "Caligrafia em Urdu:", ru: "Каллиграфия на урду:", de: "Urdu-Kalligrafie:", ja: "ウルドゥー語カリグラフィー：", ko: "우르두어 캘리그라피 문구:", it: "Calligrafia in Urdu:", tr: "Urduca Hat Metni:", id: "Teks Kaligrafi Urdu:", bn: "اردو ک্যালিگرافی বার্তা:", vi: "Chữ Thư Pháp Urdu:", sw: "Maneno ya Kaligrafia ya Urdu:"
  },
  textMehndiEnglish: {
    en: "\"The Khan Family cordially invites you to join us for an evening of music, henna, and dance as we celebrate the Mehndi Ceremony of their beloved son, Hamza.\"", ur: "خان فیملی آپ کو اپنے پیارے بیٹے ہمزہ کی مہندی کی تقریب میں شرکت کی دلی دعوت دیتی ہے۔", es: "\"La familia Khan te invita cordialmente a una noche de música y henna para celebrar el Mehndi de su amado hijo, Hamza.\"", fr: "\"La famille Khan vous invite cordialement à une soirée de musique et de henné pour célébrer le Mehndi de son fils Hamza.\"", ar: "\"تتشرف عائلة خان بدعوتكم لحضور حفل الحناء الموسيقي بمناسبة زفاف ابنهم حمزة.\"", hi: "\"खान परिवार आपको अपने प्रिय पुत्र हमजा के मेहंदी समारोह के अवसर पर आमंत्रित करता है।\"", zh: "“Khan 氏家族诚挚邀请您出席为长子 Hamza 举办的 Mehndi 音乐与佩戴手绘之夜。”", pt: "\"A família Khan convida cordialmente você para uma noite de música e henna para celebrar o Mehndi de seu amado filho, Hamza.\"", ru: "\"Семья Хан сердечно приглашает вас на вечер музыки и хны по случаю Мехнди их любимого сына Хамзы.\"", de: "\"Familie Khan lädt Sie herzlich zu einem Abend voller Musik und Henna ein, um die Mehndi-Zeremonie ihres Sohnes Hamza zu feiern.\"", ja: "「Khan家は、愛息HamzaのMehndiセレモニーに皆様を心よりご案内申し上げます。」", ko: "\"칸 가족은 사랑하는 아들 함자의 멘디 세레머니에 여러분을 정중히 초대합니다.\"", it: "\"La famiglia Khan vi invita cordialmente a una serata di musica e henné per celebrare il Mehndi del loro amato figlio Hamza.\"", tr: "\"Khan Ailesi, sevgili oğulları Hamza'nın Kına Gecesi kutlamasına sizleri içtenlikle davet eder.\"", id: "\"Keluarga Khan mengundang Anda untuk menghadiri malam musik dan henna dalam rangka acara Mehndi putra mereka, Hamza.\"", bn: "\"খান পরিবার তাদের প্রিয় ছেলে হামজার মেহেদি অনুষ্ঠানে আপনাকে সাদর আমন্ত্রণ জানাচ্ছে।\"", vi: "\"Gia đình Khan trân trọng kính mời quý vị đến tham dự đêm nhạc và vẽ henna mừng lễ Mehndi của con trai Hamza.\"", sw: "\"Familia ya Khan inakualika kwa moyo mkunjufu kwenye usiku wa muziki na henna kusherehekea Mehndi ya kijana wao Hamza.\""
  },
  textBaraatEnglish: {
    en: "\"With the blessings of Allah Subhana Wa Ta'ala, Mr. & Mrs. Tariq Mahmood request the honor of your presence at the Wedding Reception of their daughter, Ayesha, with Hamza.\"", ur: "اللہ تعالی کے فضل و کرم سے محترم طارق محمود اپنی بیٹی عائشہ کی ہمزہ کے ساتھ شادی میں شرکت کی درخواست کرتے ہیں۔", es: "\"Con las bendiciones de Alá, el Sr. y la Sra. Tariq Mahmood solicitan el honor de su presencia en la recepción de boda de su hija, Ayesha, con Hamza.\"", fr: "\"Avec les bénédictions d'Allah, M. et Mme Tariq Mahmood sollicitent l'honneur de votre présence au mariage de leur fille Ayesha avec Hamza.\"", ar: "\"بفضل الله وتوفيقه، يتشرف السيد وزوجته طارق محمود بدعوتكم لحضور حفل زفاف ابنتهم عائشة على حمزة.\"", hi: "\"अल्लाह के आशीर्वाद से, श्री और श्रीमती तारिक महमूद अपनी बेटी आयशा के हमजा के साथ विवाह समारोह में आपकी उपस्थिति की प्रार्थना करते हैं।\"", zh: "“蒙真主赐福，Tariq Mahmood 夫妇谨订于此，蒙臻出席爱女 Ayesha 与 Hamza 的婚礼宴会。”", pt: "\"Com as bênçãos de Allah, o Sr. e a Sra. Tariq Mahmood solicitam a honra da sua presença na recepção de casamento de sua filha, Ayesha, com Hamza.\"", ru: "\"С благословения Аллаха мистер и миссис Тарик Махмуд просят оказать честь своим присутствием на свадебном приеме их дочери Аиши с Хамзой.\"", de: "\"Mit dem Segen Allahs bitten Herr und Frau Tariq Mahmood um die Ehre Ihrer Anwesenheit bei der Hochzeitsfeier ihrer Tochter Ayesha mit Hamza.\"", ja: "「アッラーの祝福のもと、Tariq Mahmood夫妻は娘AyeshaとHamzaの結婚披露宴へのご出席を賜りますようお願い申し上げます。」", ko: "\"알라의 축복으로 타릭 महमूद 부부는 딸 아이샤와 함자의 결혼 피로연에 여러분을 모시고자 합니다.\"", it: "\"Con la benedizione di Allah, il Sig. e la Sig.ra Tariq Mahmood richiedono l'onore della vostra presenza al ricevimento di nozze della figlia Ayesha con Hamza.\"", tr: "\"Allah'ın bereketiyle Sayın Tariq Mahmood ve eşi, kızları Ayesha ile Hamza'nın Düğün Töreninde sizleri aralarında görmekten onur duyar.\"", id: "\"Dengan berkah Allah SWT, Bapak & Ibu Tariq Mahmood mengharapkan kehadiran Anda pada Resepsi Pernikahan putri mereka, Ayesha, dengan Hamza.\"", bn: "\"আল্লাহর অশেষ রহমতে জনাব ও জনাবে তারিক মাহমুদ তাদের কন্যা আয়েশা ও হামজার বিবাহোত্তর সংবর্ধনায় উপস্থিত থাকার অনুরোধ জানাচ্ছেন।\"", vi: "\"Được sự chúc phúc của Thượng Đế, Ông Bà Tariq Mahmood trân trọng kính mời quý vị đến dự Tiệc Cưới của con gái Ayesha cùng Hamza.\"", sw: "\"Kwa baraka za Mwenyezi Mungu, Bw. na Bi. Tariq Mahmood wanaomba heshima ya uwepo wako kwenye Sherehe ya Harusi ya binti yao Ayesha na Hamza.\""
  },
  sec3Title: {
    en: "3. Elevating the Invitation with Modern Features", ur: "3. جدید خصوصیات کے ساتھ دعوت نامے کو بہترین بنائیں", es: "3. Elevando la Invitación con Funciones Modernas", fr: "3. Sublimer l'Invitation avec des Fonctionnalités Modernes", ar: "3. الارتقاء بالدعوة مع الميزات الحديثة", hi: "3. आधुनिक सुविधाओं के साथ आमंत्रण को बेहतर बनाएं", zh: "3. 利用现代功能提升邀请函体验", pt: "3. Elevando o Convite com Recursos Modernos", ru: "3. Современные функции для улучшения приглашения", de: "3. Einladung mit modernen Funktionen aufwerten", ja: "3. 最新機能で招待状をさらに美しく", ko: "3. 현대적인 기능으로 초대장 수준 높이기", it: "3. Valorizzare l'Invito con Funzionalità Moderne", tr: "3. Modern Özelliklerle Davetiyeyi Öne Çıkarın", id: "3. Meningkatkan Undangan dengan Fitur Modern", bn: "৩. আধুনিক ফিচারের মাধ্যমে ইনভিটেশন আরও আকর্ষণীয় করুন", vi: "3. Nâng Tầm Thiệp Mời Với Các Tính Năng Hiện Đại", sw: "3. Kuboresha Mwaliko kwa Vipengele vya Kisasa"
  },
  mapPinTitle: {
    en: "Google Maps Navigation", ur: "گوگل میپس لوکیشن", es: "Navegación con Google Maps", fr: "Navigation Google Maps", ar: "التوجيه عبر خرائط جوجل", hi: "गूगल मैप्स नेविगेशन", zh: "Google 地图导航", pt: "Navegação por Google Maps", ru: "Навигация Google Maps", de: "Google Maps Navigation", ja: "Googleマップルート案内", ko: "Google 지도 길안내", it: "Navigazione Google Maps", tr: "Google Haritalar Yol Tarifi", id: "Navigasi Google Maps", bn: "গুগল ম্যাপস নেভিগেশন", vi: "Dẫn Đường Google Maps", sw: "Ramani ya Google Maps"
  },
  mapPinDesc: {
    en: "Direct routing links to wedding venues and hall locations.", ur: "شادی ہال کی لوکیشن کے لیے ڈائریکٹ میپ لنکس۔", es: "Enlaces directos de navegación a los salones de boda y ubicaciones.", fr: "Liens de navigation directs vers les salles de mariage et lieux de réception.", ar: "روابط توجيه مباشرة للقاعات ومواقع حفل الزفاف.", hi: "वेडिंग हॉल और स्थानों के लिए सीधे नेविगेशन लिंक।", zh: "直通宴会厅与婚礼地点的地图导航链接。", pt: "Links de navegação direta para os locais do casamento.", ru: "Прямые ссылки для навигации к залам и местам проведения свадьбы.", de: "Direkte Navigationslinks zu den Hochzeitslocations und Sälen.", ja: "結婚式場や会場の位置情報を案内するGoogleマップリンク。", ko: "예식장 및 연회장 위치로 이동하는 직접 길안내 링크.", it: "Link di navigazione diretti alle sedi dei matrimoni e alle sale.", tr: "Düğün salonlarına ve mekanlara doğrudan yol tarifi bağlantıları.", id: "Tautan navigasi langsung ke lokasi gedung pernikahan.", bn: "বিয়ের ভেন্যু ও হলের অবস্থান সম্পর্কিত সরাসরি ম্যাপ লিংক।", vi: "Liên kết chỉ đường trực tiếp đến nhà hàng và địa điểm tổ chức tiệc cưới.", sw: "Viungo vya kuelekeza moja kwa moja kwenye ukumbi wa harusi."
  },
  rsvpTitle: {
    en: "Online RSVP Tracking", ur: "آن لائن RSVP ٹریکنگ", es: "Seguimiento de RSVP en línea", fr: "Suivi RSVP en Ligne", ar: "تتبع الحضور أونلاين", hi: "ऑनलाइन RSVP ट्रैकिंग", zh: "在线 RSVP 回复统计", pt: "Rastreamento de RSVP Online", ru: "Онлайн отслеживание RSVP", de: "Online-RSVP-Verwaltung", ja: "オンラインRSVP管理", ko: "온라인 RSVP 참석 관리", it: "Tracciamento RSVP Online", tr: "Çevreci RSVP Takibi", id: "Pelacakan RSVP Online", bn: "অনলাইন RSVP ট্র্যাকিং", vi: "Theo Dõi RSVP Trực Tuyến", sw: "Ufuatiliaji wa RSVP wa Mtandaoni"
  },
  rsvpDesc: {
    en: "Guests register their attendance instantly online.", ur: "مہمان آن لائن فوری طور پر اپنی آمد کی تصدیق کر سکتے ہیں۔", es: "Los invitados confirman su asistencia al instante en línea.", fr: "Les invités confirment leur présence instantanément en ligne.", ar: "تأكيد حضور الضيوف فورياً أونلاين بضغطة زر.", hi: "मेहमान ऑनलाइन तुरंत अपनी उपस्थिति दर्ज करते हैं।", zh: "宾客可在线即时提交出席确认。", pt: "Os convidados confirmam presença instantaneamente online.", ru: "Гости подтверждают свое присутствие онлайн в один клик.", de: "Gäste bestätigen ihre Teilnahme sofort online.", ja: "ゲストがオンラインで即座に出席を登録できます。", ko: "하객들이 온라인으로 즉시 참석 여부를 등록합니다.", it: "Gli ospiti confermano la propria presenza all'istante online.", tr: "Misafirler katılımlarını çevrimiçi olarak anında onaylar.", id: "Tamu mendaftarkan kehadiran mereka secara instan online.", bn: "অতিথিরা অনলাইনে তাত্ক্ষণিকভাবে তাদের উপস্থিতি জানান।", vi: "Khách mời xác nhận sự hiện diện trực tuyến ngay lập tức.", sw: "Wageni wanathibitisha uwepo waos kwa mtandao papo hapo."
  },
  musicTitle: {
    en: "Ambient Background Music", ur: "بیک گراؤنڈ میوزک", es: "Música de Fondo Ambiental", fr: "Musique d'Ambiance en Arrière-Plan", ar: "موسيقى خلفية هادئة", hi: "एम्बिएंट बैकग्राउंड म्यूजिक", zh: "典雅背景音乐播放", pt: "Música de Fundo Ambiente", ru: "Фоновая музыка", de: "Stimmungsvolle Hintergrundmusik", ja: "アンビエントBGM再生", ko: "은은한 배경음악", it: "Musica di Sfondo d'Ambiente", tr: "Fon Müziği", id: "Musik Latar Belakang", bn: "ব্যাকগ্রাউন্ড মিউজিক", vi: "Âm Nhạc Nền Tinh Tế", sw: "Muziki wa Nyuma wa Tulizo"
  },
  musicDesc: {
    en: "Autoplay soft instrumentals or celebratory melodies.", ur: "کارڈ کھلنے پر مدھر بیک گراؤنڈ میوزک چلائیں۔", es: "Música instrumental suave o melodías festivas de fondo.", fr: "Lisez automatiquement de la musique instrumentale ou festive.", ar: "تشغيل موسيقى هادئة أو ألحان احتفالية تلقائياً.", hi: "सॉफ्ट इंस्ट्रूमेंटल या उत्सव धुनों का ऑटोप्ले।", zh: "自动播放优雅轻音乐或欢快节日旋律。", pt: "Reproduza músicas instrumentais suaves ou melodias festivas.", ru: "Автоматическое воспроизведение мягких инструментальных мелодий.", de: "Automatische Wiedergabe sanfter Instrumentals oder Festmelodien.", ja: "エレガントなBGMやお祝いのメロディを自動再生。", ko: "감성적인 경음악이나 축하 멜로디 자동 재생.", it: "Riproduzione automatica di musica strumentale o melodie festose.", tr: "Zarif enstrümantal veya bayram müziklerini otomatik çalın.", id: "Putar musik instrumental lembut atau melodi perayaan secara otomatis.", bn: "স্বয়ংক্রিয়ভাবে সুন্দর ব্যাকগ্রাউনড মিউজিক বাজানো।", vi: "Tự động phát nhạc hòa tấu êm dịu hoặc giai điệu chúc mừng.", sw: "Cheza muziki wa nyuma au nyimbo za furaha kiotomatiki."
  },
  ctaTitle: {
    en: "Launch Your Invitation in Minutes", ur: "منٹوں میں اپنا دعوت نامہ تیار کریں", es: "Lanza tu Invitación en Minutos", fr: "Créez votre Invitation en Quelques Minutes", ar: "أنشئ دعوتك خلال دقائق معدودة", hi: "कुछ ही मिनटों में अपना कार्ड तैयार करें", zh: "数分钟内轻松发布您的专属邀请函", pt: "Lance seu Convite em Minutos", ru: "Создайте приглашение за несколько минут", de: "Erstellen Sie Ihre Einladung in wenigen Minuten", ja: "数分で美しい招待状を作成", ko: "몇 분 만에 초대장 생성하기", it: "Crea il tuo Invito in Pochi Minuti", tr: "Davetiyenizi Dakikalar İçinde Hazırlayın", id: "Buat Undangan Anda dalam Hitungan Menit", bn: "কয়েক মিনিটের মধ্যে আপনার ইনভিটেশন তৈরি করুন", vi: "Tạo Thiệp Mời Của Bạn Trong Vài Phút", sw: "Zindua Mwaliko Wako kwa Dakika Chache"
  },
  ctaDesc: {
    en: "Select from our heritage Mughal Gold or Emerald Classic themes, fill in your timings, and create a beautiful mobile-responsive website.",
    ur: "مغل گولڈ یا ایمرالڈ تھیم کا انتخاب کریں، وقت کی تفصیلات درج کریں اور خوبصورت ویب سائٹ بنائیں۔",
    es: "Elige entre nuestros temas elegantes, completa tus horarios y crea un sitio web hermoso y adaptable a móviles.",
    fr: "Choisissez parmi nos thèmes élégants, renseignez vos horaires et créez un magnifique site web responsive.",
    ar: "اختر من بين ثيماتنا الملكية المميزة، وأدخل المواعيد، وأنشئ موقعاً إلكترونياً رائاً متوافقاً مع الهواتف.",
    hi: "हमारे थीम चुनें, समय दर्ज करें और एक सुंदर मोबाइल-फ्रेंडली वेबसाइट बनाएं।",
    zh: "选择皇家金典或翡翠风雅主题，填写活动时间，即刻生成精美的移动端专属邀请网站。",
    pt: "Escolha entre nossos temas elegantes, preencha os horários e crie um lindo site adaptado para celular.",
    ru: "Выберите тему, укажите детали и даты события, и создайте прекрасный мобильный сайт-приглашение.",
    de: "Wählen Sie aus unseren eleganten Themen, tragen Sie Ihre Zeiten ein und erstellen Sie eine schöne mobile Website.",
    ja: "ヘリテージテーマを選択し、日程を入力して、モバイル対応の美しい招待サイトを作成しましょう。",
    ko: "품격 있는 테마를 선택하고 일정을 입력해 모바일에 최적화된 멋진 초대 사이트를 만들어 보세요.",
    it: "Scegli tra i nostri temi eleganti, inserisci i dettagli e crea uno splendido sito web ottimizzato per mobile.",
    tr: "Zarif temalarımızdan birini seçin, saatleri girin ve mobil uyumlu harika bir davetiye sitesi oluşturun.",
    id: "Pilih dari templat anggun kami, isi jadwal acara Anda, dan buat situs web seluler yang indah.",
    bn: "আমাদের সেরা تھیم انتخاب کریں، وقت যোগ کریں اور خوبصورت موبائل فرینڈلی انویٹیشن سائٹ بنائیں۔",
    vi: "Chọn các chủ đề tinh tế, nhập thời gian và tạo một trang web thiệp mời giao diện di động đẹp mắt.",
    sw: "Chagua kutoka kwa mandhari zetu za kifahari, weka nyakati zako, na utengeneze tovuti nzuri ya simu."
  },
  createInvitationBtn: {
    en: "Create Invitation Now", ur: "ابھی دعوت نامہ بنائیں", es: "Crear Invitación Ahora", fr: "Créer l'Invitation Maintenant", ar: "إنشاء الدعوة الآن", hi: "अभी निमंत्रण बनाएं", zh: "立即创建婚礼邀请函", pt: "Criar Convite Agora", ru: "Создать приглашение сейчас", de: "Jetzt Einladung erstellen", ja: "今すぐ招待状を作成", ko: "지금 초대장 만들기", it: "Crea Invito Ora", tr: "Şimdi Davetiye Oluştur", id: "Buat Undangan Sekarang", bn: "এখনই ইনভিটেশন তৈরি করুন", vi: "Tạo Thiệp Mời Ngay", sw: "Unda Mwaliko Sasa"
  },
  viewThemesBtn: {
    en: "View Premium Themes", ur: "پریمیم تھیمز دیکھیں", es: "Ver Temas Premium", fr: "Voir les Thèmes Premium", ar: "عرض الثيمات المميزة", hi: "प्रीमियम थीम देखें", zh: "查看高级精选主题", pt: "Ver Temas Premium", ru: "Посмотреть Премиум Темы", de: "Premium-Themen anzeigen", ja: "プレミアムテーマを見る", ko: "프리미엄 테마 보기", it: "Visualizza Temi Premium", tr: "Premium Temaları İncele", id: "Lihat Tema Premium", bn: "প্রিমিয়াম تھیم دیکھیں", vi: "Xem Các Chủ Đề Cao Cấp", sw: "Tazama Mandhari za Premium"
  }
}

export default function WeddingGuidePage() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return WEDDING_GUIDE_TEXT[key]?.[lang] || WEDDING_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        
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
              <li><strong>{getText('anatomy1Label')} </strong>{getText('anatomy1Text')}</li>
              <li><strong>{getText('anatomy2Label')} </strong>{getText('anatomy2Text')}</li>
              <li><strong>{getText('anatomy3Label')} </strong>{getText('anatomy3Text')}</li>
              <li><strong>{getText('anatomy4Label')} </strong>{getText('anatomy4Text')}</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec2Title')}
            </h3>

            {/* Boxed template: Mehndi */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm my-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                {getText('templateMehndiBadge')}
              </span>
              <p className="font-semibold text-foreground text-sm">{getText('labelEnglishWording')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                {getText('textMehndiEnglish')}
              </p>
              <p className="font-semibold text-foreground text-sm mt-3">{getText('labelUrduWording')}</p>
              <p className="text-sm font-urdu text-primary text-right leading-relaxed">
                ہمزہ کی مہندی کی رنگا رنگ تقریب میں ہم آپ کو دل کی گہرائیوں سے خوش آمدید کہتے ہیں۔
              </p>
            </div>

            {/* Boxed template: Baraat */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm my-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded">
                {getText('templateBaraatBadge')}
              </span>
              <p className="font-semibold text-foreground text-sm">{getText('labelEnglishWording')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                {getText('textBaraatEnglish')}
              </p>
              <p className="font-semibold text-foreground text-sm mt-3">{getText('labelUrduWording')}</p>
              <p className="text-sm font-urdu text-primary text-right leading-relaxed">
                اللہ تعالیٰ کے فضل و کرم سے، ہم آپ کو اپنی بیٹی عائشہ اور ہمزہ کے رشتہ ازدواج میں منسلک ہونے کی خوشی میں شرکت کی دعوت دیتے ہیں۔
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec3Title')}
            </h3>
            
            <div className="grid gap-6 sm:grid-cols-3 my-6">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <MapPin className="size-6 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xs sm:text-sm text-foreground">{getText('mapPinTitle')}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {getText('mapPinDesc')}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <Smartphone className="size-6 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xs sm:text-sm text-foreground">{getText('rsvpTitle')}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {getText('rsvpDesc')}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <Music className="size-6 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-xs sm:text-sm text-foreground">{getText('musicTitle')}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {getText('musicDesc')}
                </p>
              </div>
            </div>

          </div>

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
                href="/create-invitation"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                {getText('createInvitationBtn')}
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                {getText('viewThemesBtn')}
              </Link>
            </div>
          </footer>
        </article>

      </div>
    </div>
  )
}
