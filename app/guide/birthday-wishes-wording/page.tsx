'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Heart, Send } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const BIRTHDAY_GUIDE_TEXT: Record<string, Record<string, string>> = {
  backToGuides: {
    en: 'Back to Guides',
    ur: 'گائیڈز پر واپس جائیں',
    ar: 'العودة إلى الأدلة',
    es: 'Volver a las Guías',
    fr: 'Retour aux Guides',
    hi: 'वापस गाइड पर जाएं',
    zh: '返回指南列表',
    pt: 'Voltar para os Guias',
    ru: 'Назад к руководствам',
    de: 'Zurück zu den Anleitungen',
    ja: 'ガイド一覧に戻る',
    ko: '가이드 목록으로 돌아가기',
    it: 'Torna alle Guide',
    tr: 'Rehberlere Dön',
    id: 'Kembali ke Panduan',
    bn: 'গাইডে ফিরে যান',
    vi: 'Quay Lại Hướng Dẫn',
    sw: 'Rudi kwenye Miongozo',
  },
  badge: {
    en: 'Birthday Wishes',
    ur: 'سالگرہ کی مبارکباد',
    ar: 'تهاني عيد الميلاد',
    es: 'Felicitaciones de Cumpleaños',
    fr: 'Vœux d\'Anniversaire',
    hi: 'जन्मदिन की शुभकामनाएं',
    zh: '生日祝福语',
    pt: 'Desejos de Aniversário',
    ru: 'Поздравления с днем рождения',
    de: 'Geburtstagswünsche',
    ja: '誕生日のメッセージ',
    ko: '생일 축하 메시지',
    it: 'Auguri di Compleanno',
    tr: 'Doğum Günü Dilekleri',
    id: 'Ucapan Ulang Tahun',
    bn: 'জন্মদিনের শুভেচ্ছা',
    vi: 'Lời Chúc Mừng Sinh Nhật',
    sw: 'Heri za Siku ya Kuzaliwa',
  },
  title: {
    en: 'Birthday Wish Wording Ideas: Heartfelt, Funny & Formal Messages for Every Card',
    ur: 'سالگرہ کی مبارکباد کے بہترین پیغامات: محبت بھرے، مزاحیہ اور باوقار الفاظ',
    ar: 'أفكار لصياغة رسائل عيد الميلاد: عبارات صادقة، مرحة ورسمية لكل بطاقة',
    es: 'Ideas de Mensajes de Cumpleaños: Frases Emotivas, Divertidas y Formales para Cada Tarjeta',
    fr: 'Idées de Textes d\'Anniversaire: Messages Chaleureux, Drôles et Formels pour Chaque Carte',
    hi: 'जन्मदिन संदेश विचार: हर कार्ड के लिए भावुक, मजेदार और औपचारिक संदेश',
    zh: '生日祝福语精选：适合每张贺卡的温馨、幽默与正式致辞',
    pt: 'Ideias de Mensagens de Aniversário: Frases Emocionantes, Divertidas e Formais',
    ru: 'Идеи поздравлений с днем рождения: душевные, смешные и деловые тексты',
    de: 'Geburtstagswünsche Textideen: Herzliche, lustige und formelle Nachrichten für jede Karte',
    ja: '誕生日のメッセージ文面アイデア：心温まる・ユニーク・フォーマルな文例集',
    ko: '생일 축하 문구 아이디어: 감동적인 메시지부터 위트 있고 격식 있는 문구까지',
    it: 'Idee per Auguri di Compleanno: Frasi Affettuose, Divertenti e Formali per Ogni Biglietto',
    tr: 'Doğum Günü Tebrik Mesajları: Her Kart İçin İçten, Eğlenceli ve Resmi Sözler',
    id: 'Ide Kata-kata Ucapan Ulang Tahun: Pesan Tulus, Lucu & Formal untuk Setiap Kartu',
    bn: 'জন্মদিনের শুভেচ্ছা বার্তার সেরা ভাবনা: প্রতিটি কার্ডের জন্য হৃদয়স্পর্শী ও আনুষ্ঠানিক বার্তা',
    vi: 'Gợi Ý Lời Chúc Sinh Nhật: Chân Thành, Hài Hước & Trang Trọng Cho Mọi Tấm Thiệp',
    sw: 'Mawazo ya Maneno ya Siku ya Kuzaliwa: Ujumbe wa Moyoni, wa Kuchekesha na Rasmi',
  },
  publishedDate: {
    en: 'Published August 15, 2026',
    ur: 'شائع ہوا: 15 اگست 2026',
    ar: 'تاريخ النشر: 15 أغسطس 2026',
    es: 'Publicado el 15 de agosto de 2026',
    fr: 'Publié le 15 août 2026',
    hi: 'प्रकाशित: 15 अगस्त 2026',
    zh: '发布于 2026年8月15日',
    pt: 'Publicado em 15 de agosto de 2026',
    ru: 'Опубликовано 15 августа 2026 г.',
    de: 'Veröffentlicht am 15. August 2026',
    ja: '2026年8月15日公開',
    ko: '2026년 8월 15일 작성됨',
    it: 'Pubblicato il 15 agosto 2026',
    tr: 'Yayınlanma: 15 Ağustos 2026',
    id: 'Diterbitkan 15 Agustus 2026',
    bn: 'প্রকাশের তারিখ: ১৫ আগস্ট, ২০২৬',
    vi: 'Đăng ngày 15 tháng 8 năm 2026',
    sw: 'Ilichapishwa 15 Agosti 2026',
  },
  readTime: {
    en: '5 min read',
    ur: '5 منٹ مطالعہ',
    ar: '5 دقائق قراءة',
    es: '5 min de lectura',
    fr: '5 min de lecture',
    hi: '5 मिनट का पाठ',
    zh: '5 分钟阅读',
    pt: '5 min de leitura',
    ru: '5 мин чтения',
    de: '5 Min. Lesezeit',
    ja: '5分で読める',
    ko: '5분 소요',
    it: '5 min di lettura',
    tr: '5 dk okuma',
    id: '5 menit baca',
    bn: '৫ মিনিট পাঠ',
    vi: '5 phút đọc',
    sw: 'dakika 5 za kusoma',
  },
  author: {
    en: 'By Hasnain',
    ur: 'تحریر: حسنین',
    ar: 'بقلم حسنين',
    es: 'Por Hasnain',
    fr: 'Par Hasnain',
    hi: 'हुसनैन द्वारा',
    zh: 'Hasnain 撰写',
    pt: 'Por Hasnain',
    ru: 'Автор: Хаснайн',
    de: 'Von Hasnain',
    ja: 'Hasnainによる執筆',
    ko: 'Hasnain 작성',
    it: 'Di Hasnain',
    tr: 'Hasnain Tarafından',
    id: 'Oleh Hasnain',
    bn: 'হাসনাইন কর্তৃক',
    vi: 'Bởi Hasnain',
    sw: 'Na Hasnain',
  },
  introP1: {
    en: 'The hardest part of sending a birthday card is rarely the design — it\'s staring at a blank message box, trying to find words that actually sound like you. Below are wording ideas sorted by tone and relationship, so you can pick one, tweak it with a name or an inside joke, and send it in under a minute.',
    ur: 'سالگرہ کا کارڈ بناتے وقت سب سے مشکل کام مناسب الفاظ کا انتخاب ہوتا ہے۔ نیچے مختلف رشتوں اور انداز کے لیے بہترین اور دل کو چھو لینے والے پیغامات دیے گئے ہیں جنہیں آپ صرف ایک کلک میں کاپی یا کارڈ میں شامل کر کے شیئر کر سکتے ہیں۔',
    ar: 'أصعب ما في إرسال بطاقة عيد ميلاد ليس التصميم، بل هو النظر إلى صندوق الرسائل الفارغ ومحاولة العثور على الكلمات المناسبة. فيما يلي أفكار مميزة مرتبة حسب النبرة والعلاقة لتختار منها وتشاركها في أقل من دقيقة.',
    es: 'La parte más difícil de enviar una tarjeta de cumpleaños rara vez es el diseño: es mirar el cuadro en blanco e intentar encontrar las palabras adecuadas. Aquí tienes ideas ordenadas por tono y relación para enviar en menos de un minuto.',
    fr: 'La partie la plus délicate pour envoyer une carte d\'anniversaire n\'est pas le design, mais de trouver les mots justes. Voici des idées réparties par ton et relation pour envoyer un message parfait en une minute.',
    hi: 'जन्मदिन कार्ड भेजने में सबसे कठिन काम खाली बॉक्स को देखना और सही शब्द ढूंढना होता है। नीचे रिश्ते और मिजाज के अनुसार चुनिंदा संदेश दिए गए हैं जिन्हें आप मिनटों में भेज सकते हैं।',
    zh: '发送生日贺卡最难的部分往往不是设计，而是面对空白文本框不知如何下笔。以下按语气和关系精选了祝福语，让你在一分钟内就能轻松定稿并发送。',
    pt: 'A parte mais difícil de enviar um cartão de aniversário raramente é o design, mas sim encontrar as palavras certas. Abaixo estão ideias organizadas por tom e afinidade para você personalizar em menos de um minuto.',
    ru: 'Самое сложное в поздравлении с днем рождения — не дизайн, а поиск искренних слов перед пустым полем ввода. Ниже собраны идеи текстов по стилю и отношениям, чтобы вы могли отправить идеальное пожелание за минуту.',
    de: 'Das Schwierigste an einer Geburtstagskarte ist selten das Design – sondern die passenden Worte zu finden. Hier sind Textideen nach Ton und Beziehung sortiert, die Sie in einer Minute anpassen und verschicken können.',
    ja: 'バースデーカードを贈る際、一番悩むのはメッセージの言葉選びです。ここでは関係性やトーン別に最適な文面アイデアをご紹介します。1分で選んでそのまま贈ることができます。',
    ko: '생일 카드를 보낼 때 가장 어려운 것은 빈 화면을 보며 진심 어린 문구를 고르는 일입니다. 아래 관계와 분위기별 추천 메시지를 활용해 1분 안에 나만의 카드를 완성해보세요.',
    it: 'La parte più difficile di un biglietto di compleanno raramente è il design, ma trovare le parole giuste. Di seguito trovi idee ordinate per tono e relazione, pronte da inviare in meno di un minuto.',
    tr: 'Bir doğum günü kartı gönderirken en zor kısım tasarım değil, doğru kelimeleri bulmaktır. Aşağıda samimi, eğlenceli ve resmi önerileri bularak bir dakikadan kısa sürede gönderebilirsiniz.',
    id: 'Bagian tersulit saat mengirim kartu ulang tahun bukanlah desainnya, melainkan mencari kata-kata yang tepat. Berikut adalah ide ucapan berdasarkan nada dan hubungan yang siap Anda kirim dalam hitungan menit.',
    bn: 'জন্মদিনের কার্ড পাঠানোর সময় সবচেয়ে কঠিন কাজ সঠিক শব্দ খুঁজে নেওয়া। নিচে বিভিন্ন সম্পর্ক ও অনুভূতির জন্য সুন্দর বার্তা দেওয়া হলো যা আপনি খুব সহজেই পাঠাতে পারবেন।',
    vi: 'Phần khó nhất khi gửi thiệp sinh nhật thường là việc tìm lời chúc phù hợp. Dưới đây là những gợi ý theo từng mối quan hệ giúp bạn tạo thiệp và gửi đi chỉ trong một phút.',
    sw: 'Sehemu ngumu zaidi ya kutuma kadi ya siku ya kuzaliwa si muundo, bali ni kupata maneno sahihi. Chini kuna mawazo yaliyopangwa kulingana na uhusiano ili utume kwa chini ya dakika moja.',
  },
  sec1Title: {
    en: '1. Short & Sweet (Works for Almost Anyone)',
    ur: '1. مختصر اور پیارے پیغامات (سب کے لیے موزوں)',
    ar: '1. عبارات قصيرة ولطيفة (تناسب الجميع تقريباً)',
    es: '1. Breves y Dulces (Ideales para casi cualquier persona)',
    fr: '1. Courts et Doux (Convient à presque tout le monde)',
    hi: '1. संक्षिप्त और प्यारे संदेश (सभी के लिए उपयुक्त)',
    zh: '1. 简短而温馨（几乎适合所有人）',
    pt: '1. Curtas e Doces (Perfeitas para quase qualquer pessoa)',
    ru: '1. Короткие и теплые (подходят практически всем)',
    de: '1. Kurz & Herzlich (Für fast jeden geeignet)',
    ja: '1. 短く温かいメッセージ（誰にでも喜ばれる文面）',
    ko: '1. 짧고 다정한 메시지 (누구에게나 잘 어울리는 문구)',
    it: '1. Brevi e Dolci (Perfetti per quasi tutti)',
    tr: '1. Kısa ve Samimi (Hemen Herkese Uygun)',
    id: '1. Singkat & Manis (Cocok untuk Siapa Saja)',
    bn: '১. সংক্ষিপ্ত ও মিষ্টি বার্তা (সবার জন্য উপযুক্ত)',
    vi: '1. Ngắn Gọn & Ngọt Ngào (Phù hợp với hầu hết mọi người)',
    sw: '1. Fupi na Tamu (Inafaa kwa karibu kila mtu)',
  },
  sec1Bullet1: {
    en: 'Wishing you a birthday that\'s as wonderful as you are. Here\'s to another year of good things!',
    ur: 'آپ کو سالگرہ بہت بہت مبارک ہو! دعا ہے کہ آنے والا سال آپ کے لیے بے شمار خوشیاں اور کامیابیاں لائے۔',
    ar: 'أتمنى لك عيد ميلاد رائع بقدر روعتك. عام جديد مليء بالخير والمسرات!',
    es: 'Te deseo un cumpleaños tan maravilloso como tú. ¡Por otro año lleno de cosas buenas!',
    fr: 'Je te souhaite un anniversaire aussi merveilleux que toi. Que cette nouvelle année t\'apporte le meilleur !',
    hi: 'आपको आपके जैसा ही शानदार जन्मदिन मुबारक हो। आने वाला साल खुशियों से भरा रहे!',
    zh: '祝你度过一个和你一样美好的生日，愿新的一年好事连连！',
    pt: 'Desejo a você um aniversário tão maravilhoso quanto você. Que venha mais um ano de conquistas!',
    ru: 'Желаю дня рождения такого же замечательного, как и вы сами. Пусть новый год принесет радость!',
    de: 'Ich wünsche dir einen Geburtstag, der so wunderbar ist wie du selbst. Auf ein weiteres großartiges Jahr!',
    ja: 'あなたのように素敵な誕生日になりますように。素晴らしい一年をお過ごしください！',
    ko: '당신만큼이나 멋진 생일이 되길 바랍니다. 행복으로 가득한 한 해가 되기를 응원합니다!',
    it: 'Ti auguro un compleanno meraviglioso quanto te. A un altro anno ricco di cose belle!',
    tr: 'Senin kadar harika bir doğum günü dilerim. Yeni yaşın tüm güzellikleri beraberinde getirsin!',
    id: 'Semoga ulang tahunmu seindah dirimu. Semoga tahun ini penuh dengan keberkahan dan kebahagiaan!',
    bn: 'আপনার মতো অসাধারণ একটি জন্মদিনের শুভেচ্ছা। নতুন বছরটি আপনার জন্য সুখ ও সমৃদ্ধি বয়ে আনুক!',
    vi: 'Chúc bạn một sinh nhật tuyệt vời như chính con người bạn. Chúc thêm một năm tràn ngập niềm vui!',
    sw: 'Ninakutakia siku ya kuzaliwa nzuri kama ulivyo. Heri ya mwaka mwingine wa mafanikio na furaha!',
  },
  sec1Bullet2: {
    en: 'Happy birthday! May this year bring you more laughter, less stress, and everything you\'ve been hoping for.',
    ur: 'سالگرہ مبارک! اللہ تعالیٰ آپ کی زندگی کو خوشیوں، صحت اور سکون سے بھر دے۔',
    ar: 'عيد ميلاد سعيد! أتمنى أن يحمل لك هذا العام مزيداً من الضحكات والراحة وكل ما تتمناه.',
    es: '¡Feliz cumpleaños! Que este año te traiga más risas, menos preocupaciones y todo lo que anhelas.',
    fr: 'Joyeux anniversaire ! Que cette année t\'apporte plus de rires, moins de stress et tout ce dont tu rêves.',
    hi: 'जन्मदिन की बधाई! यह साल आपके जीवन में ढेर सारी खुशियां और सुकून लेकर आए।',
    zh: '生日快乐！愿新的一年带给你更多欢笑、更少烦恼，心想事成！',
    pt: 'Feliz aniversário! Que este novo ano traga mais sorrisos, menos estresse e tudo o que você deseja.',
    ru: 'С днем рождения! Пусть этот год принесет больше смеха, меньше забот и исполнение всех желаний.',
    de: 'Herzlichen Glückwunsch zum Geburtstag! Möge dieses Jahr mehr Lachen, weniger Stress und alles Gewünschte bringen.',
    ja: 'お誕生日おめでとうございます！たくさんの笑顔と安心に満ちた、素晴らしい一年になりますように。',
    ko: '생일 축하해요! 올 한 해는 웃음이 더 가득하고, 바라는 모든 일이 이뤄지길 바랍니다.',
    it: 'Buon compleanno! Che quest\'anno ti porti più sorrisi, zero pensieri e tutto ciò che desideri.',
    tr: 'Doğum günün kutlu olsun! Bu yıl bol kahkaha, sıfır stres ve dilediğin her şeyi getirsin.',
    id: 'Selamat ulang tahun! Semoga tahun ini membawa lebih banyak tawa, kedamaian, dan harapan yang tercapai.',
    bn: 'শুভ জন্মদিন! এই বছরটি আপনার জীবনে অনেক হাসি, শান্তি এবং কাঙ্ক্ষিত সাফল্য নিয়ে আসুক।',
    vi: 'Chúc mừng sinh nhật! Mong năm nay mang đến cho bạn nhiều tiếng cười, ít âu lo và vạn sự như ý.',
    sw: 'Heri ya siku ya kuzaliwa! Mwaka huu ulete vicheko zaidi, amani na kila kitu unachotarajia.',
  },
  sec1Bullet3: {
    en: 'Another year older, another year more amazing. Have a fantastic birthday!',
    ur: 'زندگی کا ایک اور خوبصورت سال مکمل ہونے پر دلی مبارکباد! آپ کا دن شاندار گزرے۔',
    ar: 'عام إضافي من العمر، وعام إضافي من التميز والروعة. أتمنى لك يوماً رائعاً!',
    es: 'Un año más sabio, un año más extraordinario. ¡Que tengas un cumpleaños genial!',
    fr: 'Un an de plus, et encore plus formidable. Passe un très bel anniversaire !',
    hi: 'एक और खूबसूरत साल पूरा होने पर बधाई! आपका जन्मदिन अद्भुत और यादगार रहे।',
    zh: '长了一岁，魅力更增一分。祝你度过一个精彩绝伦的生日！',
    pt: 'Mais um ano de vida e cada vez mais incrível. Tenha um aniversário espetacular!',
    ru: 'Еще один год позади, и вы стали еще ярче и мудрее. Чудесного дня рождения!',
    de: 'Ein Jahr älter, ein Jahr wunderbarer. Hab einen fantastischen Geburtstag!',
    ja: '歳を重ねるごとにさらに魅力的になっていくあなたへ。最高のお誕生日をお過ごしください！',
    ko: '한 살 더해질수록 더 멋져지는 당신, 최고의 생일을 보내길 바랍니다!',
    it: 'Un anno in più e sempre più straordinario. Trascorri un compleanno fantastico!',
    tr: 'Bir yaş daha büyüdün ve her zamankinden daha harikasın. Doğum günün kutlu olsun!',
    id: 'Bertambah usia, bertambah luar biasa. Selamat menikmati hari ulang tahun yang fantastis!',
    bn: 'বয়স এক বছর বাড়ল, আর আপনি হলেন আরও অনুপ্রেরণাদায়ী। চমৎকার কাটুক আপনার জন্মদিন!',
    vi: 'Thêm một tuổi mới, càng thêm tuyệt vời. Chúc bạn có một ngày sinh nhật rực rỡ!',
    sw: 'Umri unaongezeka na unazidi kuwa bora zaidi. Uwe na siku njema ya kuzaliwa!',
  },
  sec2Title: {
    en: '2. Heartfelt Messages for Family & Close Friends',
    ur: '2. خاندان اور قریبی دوستوں کے لیے دلی پیغامات',
    ar: '2. رسائل نابعة من القلب للعائلة والأصدقاء المقربين',
    es: '2. Mensajes Emotivos para Familia y Amigos Cercanos',
    fr: '2. Messages Chaleureux pour la Famille et les Amis Proches',
    hi: '2. परिवार और करीबी दोस्तों के लिए भावुक संदेश',
    zh: '2. 送给家人与挚友的真挚心意',
    pt: '2. Mensagens de Coração para Família e Amigos Próximos',
    ru: '2. Искренние пожелания для семьи и близких друзей',
    de: '2. Herzliche Botschaften für Familie & enge Freunde',
    ja: '2. 家族や親友に贈る心温まるメッセージ',
    ko: '2. 가족과 소중한 친구를 위한 진심 어린 메시지',
    it: '2. Messaggi Affettuosi per Famiglia e Amici Cari',
    tr: '2. Aile ve Yakın Dostlar İçin İçten Sözler',
    id: '2. Pesan Tulus untuk Keluarga & Sahabat Dekat',
    bn: '২. পরিবার ও ঘনিষ্ঠ বন্ধুদের জন্য আন্তরিক বার্তা',
    vi: '2. Lời Chúc Chân Thành Cho Gia Đình & Bạn Bè Thân Thiết',
    sw: '2. Ujumbe wa Moyoni kwa Familia na Marafiki wa Karibu',
  },
  sec2Quote: {
    en: 'Watching you grow into who you are has been one of the best parts of my life. On your birthday, I just want you to know how proud I am of you, and how grateful I am to have you in my corner. Here\'s to celebrating every version of you, this year and every year after.',
    ur: 'آپ کا میری زندگی میں ہونا ایک انمول نعمت ہے۔ آپ کی سالگرہ کے پرمسرت موقع پر مجھے آپ پر فخر ہے اور میں دل سے دعاگو ہوں کہ آپ ہمیشہ مسکراتے رہیں۔ سالگرہ بہت مبارک ہو!',
    ar: 'رؤيتك تكبر وتبلغ أهدافك هي من أجمل نعم حياتي. في عيد ميلادك، أريدك أن تعرف مدى فخري بك وامتناني لوجودك بجانبي دائماً. كل عام وأنت بألف خير وسعادة.',
    es: 'Verte crecer y convertirte en la persona que eres ha sido uno de los mayores regalos de mi vida. En tu cumpleaños, quiero recordarte lo orgulloso que estoy de ti y lo afortunado que me siento de tenerte a mi lado.',
    fr: 'Te voir évoluer et t\'épanouir est l\'une des plus belles joies de ma vie. Pour ton anniversaire, je tiens à te dire à quel point je suis fier de toi et reconnaissant de t\'avoir à mes côtés. Très bel anniversaire !',
    hi: 'आपको अपनी जिंदगी में पाना एक अनमोल तोहफा है। आपके जन्मदिन पर मुझे आप पर बहुत गर्व है और दुआ है कि आपकी मुस्कान हमेशा यूं ही बनी रहे। जन्मदिन बहुत मुबारक!',
    zh: '看着你一路成长、成为如此优秀的自己，是我生命中最珍贵的经历之一。在你生日之际，我想让你知道我有多为你骄傲，多么庆幸身边有你陪伴。生日快乐！',
    pt: 'Ver quem você se tornou é um dos maiores privilégios da minha vida. No seu aniversário, quero que saiba o quanto me orgulho de você e como sou grato por ter sua companhia. Parabéns de coração!',
    ru: 'Видеть, как вы растете и раскрываетесь — одна из самых больших радостей в моей жизни. В ваш день рождения хочу сказать, как я горжусь вами и как благодарен судьбе за то, что вы есть рядом.',
    de: 'Dich wachsen und deinen Weg gehen zu sehen, ist eines der schönsten Geschenke meines Lebens. Zu deinem Geburtstag möchte ich dir sagen, wie stolz ich auf dich bin und wie dankbar, dich an meiner Seite zu haben.',
    ja: 'あなたが素敵に成長していく姿を見守ることができて本当に幸せです。あなたの誕生日を心からお祝いし、いつもそばにいてくれることに感謝しています。お誕生日おめでとう！',
    ko: '당신이 걸어온 길을 곁에서 지켜보는 것은 제 삶의 큰 축복이었습니다. 생일을 맞아 당신이 얼마나 자랑스럽고 소중한 존재인지 전하고 싶어요. 언제나 응원합니다.',
    it: 'Vederti crescere e diventare la persona che sei è uno dei doni più grandi della mia vita. Per il tuo compleanno voglio dirti quanto sono orgoglioso di te e grato di averti al mio fianco.',
    tr: 'Büyüyüp bugün olduğun harika insan oluşunu izlemek hayatımın en güzel anlarından biriydi. Doğum gününde seninle ne kadar gurur duyduğumu bilmeni isterim. İyi ki varsın!',
    id: 'Melihatmu tumbuh menjadi sosok yang luar biasa adalah anugerah terbesar dalam hidupku. Di hari ulang tahunmu, aku ingin kamu tahu betapa bangganya aku memilikimu. Selamat ulang tahun!',
    bn: 'আপনার পাশে থাকা এবং আপনার অগ্রগতি দেখা আমার জীবনের সেরা অভিজ্ঞতাগুলোর একটি। জন্মদিনে জানাতে চাই আমি আপনাকে নিয়ে কতটা গর্বিত। শুভ জন্মদিন!',
    vi: 'Được đồng hành và chứng kiến sự trưởng thành của bạn là một trong những điều tuyệt vời nhất trong cuộc đời tôi. Sinh nhật này, tôi chỉ muốn bạn biết tôi tự hào về bạn đến nhường nào. Chúc mừng sinh nhật!',
    sw: 'Kukuona ukikua na kuwa mtu bora ni moja ya baraka kubwa katika maisha yangu. Katika siku yako ya kuzaliwa, ninajivunia wewe na ninashukuru sana kuwa nawe maishani.',
  },
  sec3Title: {
    en: '3. Funny & Playful Wishes for Close Friends',
    ur: '3. قریبی دوستوں کے لیے مزاحیہ اور دوستانہ پیغامات',
    ar: '3. تهاني مرحة وفكاهية للأصدقاء المقربين',
    es: '3. Deseos Divertidos e Ingeniosos para Amigos Cercanos',
    fr: '3. Vœux Drôles et Taquins pour les Amis Proches',
    hi: '3. जिगरी दोस्तों के लिए मजेदार और चुटीले संदेश',
    zh: '3. 献给铁杆好友的幽默搞笑祝福',
    pt: '3. Votos Divertidos e Bem-Humorados para Amigos',
    ru: '3. Забавные и шутливые поздравления для друзей',
    de: '3. Lustige & freche Wünsche für beste Freunde',
    ja: '3. 親友に贈るユーモアたっぷりのメッセージ',
    ko: '3. 찐친을 위한 유쾌하고 위트 있는 축하 메시지',
    it: '3. Auguri Divertenti e Scherzosi per Veri Amici',
    tr: '3. Yakın Arkadaşlar İçin Esprili ve Eğlenceli Kutlamalar',
    id: '3. Ucapan Lucu & Menghibur untuk Sahabat Akrab',
    bn: '৩. ঘনিষ্ঠ বন্ধুদের জন্য মজার ও হাস্যরসাত্মক শুভেচ্ছা',
    vi: '3. Lời Chúc Hài Hước & Hóm Hỉnh Dành Cho Bạn Thân',
    sw: '3. Heri za Kuchekesha kwa Marafiki wa Karibu',
  },
  sec3Bullet1: {
    en: 'Happy birthday! You\'re not getting older, you\'re just becoming a rarer vintage.',
    ur: 'سالگرہ مبارک دوست! آپ بوڑھے نہیں ہو رہے، بس تجربہ کار اور نایاب بن رہے ہیں۔',
    ar: 'عيد ميلاد سعيد! أنت لا تكبر في السن، بل تزداد قيمة كتحفة نادرة!',
    es: '¡Feliz cumpleaños! No te estás haciendo viejo, simplemente te estás convirtiendo en un clásico selecto.',
    fr: 'Joyeux anniversaire ! Tu ne vieillis pas, tu deviens simplement un grand cru d\'exception.',
    hi: 'जन्मदिन मुबारक दोस्त! आप बूढ़े नहीं हो रहे, बल्कि विंटेज वाइन की तरह कीमती हो रहे हैं।',
    zh: '生日快乐！你不是变老了，而是像陈年佳酿一样越来越珍贵了！',
    pt: 'Feliz aniversário! Você não está envelhecendo, só está virando uma raridade de colecionador.',
    ru: 'С днем рождения! Вы не стареете, вы просто переходите в категорию элитного выдержанного винтажа.',
    de: 'Alles Gute zum Geburtstag! Du wirst nicht älter, du wirst nur ein seltener Jahrgang.',
    ja: 'お誕生日おめでとう！年を取ってるんじゃないよ、ヴィンテージとしての価値が高まってるだけ！',
    ko: '생일 축하해! 늙어가는 게 아니라, 빈티지 와인처럼 가치가 더해지는 중이야.',
    it: 'Buon compleanno! Non stai invecchiando, stai solo diventando un pezzo da collezione raro.',
    tr: 'Doğum günün kutlu olsun! Yaşlanmıyorsun, sadece yıllandıkça değeri artan bir klasik oluyorsun.',
    id: 'Selamat ulang tahun! Kamu bukan bertambah tua, tapi semakin bernilai seperti barang antik langka.',
    bn: 'শুভ জন্মদিন! আপনি বুড়ো হচ্ছেন না, বরং দামি অ্যান্টিকের মতো দুর্লভ হয়ে উঠছেন।',
    vi: 'Chúc mừng sinh nhật! Bạn không hề già đi, bạn chỉ đang trở thành một phiên bản cổ điển quý hiếm hơn thôi.',
    sw: 'Heri ya siku ya kuzaliwa! Huzeeki, unazidi tu kuwa wa thamani kama vitu vya kale.',
  },
  sec3Bullet2: {
    en: 'Congratulations on surviving another year of my terrible jokes. Here\'s to many more!',
    ur: 'میری باتوں اور مذاق کو ایک اور سال برداشت کرنے پر مبارکباد! جیوتو رہو ہمیشہ۔',
    ar: 'تهانينا على الصمود لعام آخر مع نكاتي الثقيلة. في انتظار المزيد من الأعوام القادمة معاً!',
    es: 'Felicidades por sobrevivir otro año aguantando mis malos chistes. ¡Por muchos más!',
    fr: 'Félicitations d\'avoir survécu une année de plus à mes blagues douteuses. À bien d\'autres encore !',
    hi: 'मेरे खराब चुटकुलों को एक और साल झेलने के लिए बधाई! ऐसे ही हमेशा साथ बने रहो।',
    zh: '恭喜你又成功忍受了我一整年的冷笑话！愿我们友谊长存，继续互损！',
    pt: 'Parabéns por sobreviver a mais um ano com as minhas piadas ruins. Que venham muitos outros!',
    ru: 'Поздравляю с тем, что вы пережили еще один год моих плоских шуток. Впереди еще много таких лет!',
    de: 'Glückwunsch, dass du wieder ein ganzes Jahr meine schlechten Witze überlebt hast. Auf viele weitere!',
    ja: '僕の寒いジョークに耐えてまた一年生き延びたね、おめでとう！これからもよろしく！',
    ko: '내 썰렁한 농담을 1년 더 버텨낸 것을 축하해! 앞으로도 오래오래 함께하자.',
    it: 'Congratulazioni per essere sopravvissuto a un altro anno delle mie battute pessime. Ad altri cento!',
    tr: 'Kötü esprilerime bir yıl daha katlanmayı başardığın için tebrikler. Birlikte daha nice yıllara!',
    id: 'Selamat sudah berhasil bertahan satu tahun lagi mendengarkan lelucon recehku. Semoga persahabatan kita langgeng!',
    bn: 'আমার বাজে রসিকতা আরও এক বছর সহ্য করার জন্য অভিনন্দন! বন্ধুত্ব চিরকাল এমনই থাকুক।',
    vi: 'Chúc mừng bạn đã sống sót thêm một năm trước những trò đùa nhạt nhẽo của tôi. Tiếp tục chịu đựng nhé!',
    sw: 'Hongera kwa kuishi mwaka mwingine ukivumilia vichekesho vyangu vibaya. Tuko pamoja miaka mingi ijayo!',
  },
  sec3Bullet3: {
    en: 'I was going to get you a gift, but then I remembered you already have me as a friend. You\'re welcome.',
    ur: 'میں تحفہ لینے لگا تھا مگر پھر یاد آیا کہ مجھ جیسا بہترین دوست ہی آپ کا سب سے بڑا تحفہ ہے۔ سالگرہ مبارک!',
    ar: 'كنت أنوي شراء هدية قيمة لك، لكن تذكرت أن وجودي كصديق لك هو أعظم هدية. لا داعي للشكر!',
    es: 'Iba a comprarte un regalo, pero recordé que ya me tienes como amigo. De nada.',
    fr: 'J\'allais t\'acheter un cadeau, puis je me suis rappelé que m\'avoir comme ami est déjà le plus beau présent. De rien !',
    hi: 'मैं तुम्हारे लिए तोहफा खरीदने ही वाला था, फिर याद आया कि मेरे जैसा दोस्त ही तुम्हारा सबसे बड़ा तोहफा है!',
    zh: '我本打算送你一份大礼，但转念一想，有我这样的朋友不就是最好的礼物吗？不客气哈！',
    pt: 'Eu ia te comprar um presente, mas lembrei que você já tem a sorte de me ter como amigo. De nada!',
    ru: 'Я хотел подарить тебе подарок, но потом вспомнил, что у тебя уже есть такой замечательный друг, как я. Не благодари!',
    de: 'Ich wollte dir ein Geschenk kaufen, aber dann fiel mir ein, dass du mich ja schon als Freund hast. Gern geschehen!',
    ja: 'プレゼントを買おうと思ったけど、私という最高の友達がいることを思い出したよ。感謝してね！',
    ko: '선물을 사려다가, 나라는 최고의 친구가 이미 곁에 있다는 걸 떠올렸어. 고마워할 필요는 없어!',
    it: 'Stavo per comprarti un regalo, poi mi sono ricordato che hai già me come amico. Non c\'è di che!',
    tr: 'Sana hediye alacaktım ama zaten hayatında benim gibi bir dost olduğunu hatırladım. Rica ederim!',
    id: 'Tadinya mau beliin kado, tapi baru ingat kalau sahabat terbaikmu ini adalah hadiah terindah. Terima kasih kembali!',
    bn: 'উপহার কিনতে চেয়েছিলাম, পরে মনে পড়ল আমার মতো বন্ধুই তো আপনার সেরা উপহার। ধন্যবাদ দেওয়ার দরকার নেই!',
    vi: 'Định mua quà cho bạn đấy, nhưng nhớ ra có một người bạn tuyệt vời như tôi đã là món quà lớn nhất rồi. Không có chi!',
    sw: 'Nilikuwa nikanunue zawadi, lakini nikakumbuka tayari unaye rafiki kama mimi. Karibu sana!',
  },
  sec4Title: {
    en: '4. Formal Wording for Coworkers & Acquaintances',
    ur: '4. دفتری ساتھیوں اور رسمی تعلقات کے لیے شائستہ پیغامات',
    ar: '4. صياغة رسمية لزملاء العمل والمعارف',
    es: '4. Mensajes Formales para Colegas de Trabajo y Conocidos',
    fr: '4. Formules Formelles pour Collègues et Connaissances',
    hi: '4. सहकर्मियों और औपचारिक संपर्कों के लिए गरिमापूर्ण संदेश',
    zh: '4. 适合同事与工作伙伴的职场得体致辞',
    pt: '4. Mensagens Formais para Colegas de Trabalho e Conhecidos',
    ru: '4. Деловые поздравления для коллег и знакомых',
    de: '4. Formelle Formulierungen für Kollegen & Bekannte',
    ja: '4. 職場の上司・同僚・知人に贈る丁寧な文例',
    ko: '4. 직장 동료 및 지인을 위한 정중하고 격식 있는 문구',
    it: '4. Frasi Formali per Colleghi di Lavoro e Conoscenti',
    tr: '4. İş Arkadaşları ve Tanıdıklar İçin Resmi Tebrikler',
    id: '4. Ucapan Formal untuk Rekan Kerja & Kolega',
    bn: '৪. সহকর্মী ও পরিচিতদের জন্য মার্জিত ও আনুষ্ঠানিক বার্তা',
    vi: '4. Lời Chúc Trang Trọng Cho Đồng Nghiệp & Đối Tác',
    sw: '4. Maneno Rasmi kwa Wafanyakazi Wenzako na Marafiki wa Kawaida',
  },
  sec4Bullet1: {
    en: 'Wishing you a very happy birthday and a year filled with great health, success, and happiness.',
    ur: 'آپ کو سالگرہ کی دلی مبارکباد۔ دعا ہے کہ آنے والا سال آپ کے لیے صحت، ترقی اور کامیابیوں کا باعث بنے۔',
    ar: 'أتمنى لك عيد ميلاد سعيداً للغاية وعاماً حافلاً بموفور الصحة والنجاح والتوفيق الدائم.',
    es: 'Le deseo un muy feliz cumpleaños y un año lleno de excelente salud, éxitos y satisfacciones.',
    fr: 'Je vous souhaite un très joyeux anniversaire et une année placée sous le signe de la santé et du succès.',
    hi: 'आपको जन्मदिन की हार्दिक शुभकामनाएं। आने वाला वर्ष उत्तम स्वास्थ्य, समृद्धि और सफलता लेकर आए।',
    zh: '衷心祝愿您生日快乐，新的一年身体健康、事业顺利、幸福美满！',
    pt: 'Desejo a você um feliz aniversário e um ano repleto de muita saúde, realizações e sucesso.',
    ru: 'Сердечно поздравляю с днем рождения! Желаю крепкого здоровья, профессиональных успехов и благополучия.',
    de: 'Ich wünsche Ihnen alles Gute zum Geburtstag und ein erfolgreiches, gesundes und erfülltes neues Lebensjahr.',
    ja: 'お誕生日を心よりお祝い申し上げます。健康に恵まれ、さらなるご活躍と実り多き一年となりますように。',
    ko: '생신을 진심으로 축하드리며, 건강과 행복이 가득하고 큰 성취를 이루는 한 해가 되기를 기원합니다.',
    it: 'I migliori auguri di buon compleanno, con l\'augurio di un anno ricco di salute, soddisfazioni e successo.',
    tr: 'Doğum gününüzü en içten dileklerimle kutlar; sağlık, başarı ve mutluluk dolu bir yıl dilerim.',
    id: 'Selamat ulang tahun. Semoga tahun ini membawa kesehatan, kemakmuran, dan kesuksesan yang berkelanjutan.',
    bn: 'জন্মদিনের আন্তরিক শুভেচ্ছা। নতুন বছরটি আপনার সুস্বাস্থ্য, সফলতা এবং সমৃদ্ধি নিয়ে আসুক।',
    vi: 'Kính chúc anh/chị một ngày sinh nhật thật ý nghĩa và một năm mới dồi dào sức khỏe, thành công rực rỡ.',
    sw: 'Nakutakia heri ya siku ya kuzaliwa na mwaka uliojaa afya njema, mafanikio na furaha tele.',
  },
  sec4Bullet2: {
    en: 'On your special day, we wanted to take a moment to wish you a wonderful birthday and thank you for all you bring to the team.',
    ur: 'آپ کے یومِ پیدائش کے موقع پر ہم آپ کے لیے نیک تمناؤں کا اظہار کرتے ہیں اور آپ کے تعاون کے شکر گزار ہیں۔',
    ar: 'في يومك المميز، نود أن نعبر عن أطيب تمنياتنا لك بعيد ميلاد رائع وخالص شكرنا على كل ما تقدمه لفريق العمل.',
    es: 'En su día especial, queremos desearle un gran cumpleaños y agradecerle todo su compromiso y aportación al equipo.',
    fr: 'En ce jour particulier, nous tenons à vous souhaiter un merveilleux anniversaire et à vous remercier pour votre précieuse contribution à l\'équipe.',
    hi: 'इस विशेष अवसर पर हम आपको जन्मदिन की बधाई देते हैं और टीम में आपके अमूल्य योगदान के लिए आभार व्यक्त करते हैं।',
    zh: '在这个特别的日子里，我们全队祝您生日快乐，并由衷感谢您为团队做出的卓越贡献。',
    pt: 'Neste dia especial, gostaríamos de lhe desejar um excelente aniversário e agradecer por toda a sua dedicação à nossa equipe.',
    ru: 'В этот особенный день хотим поздравить вас с днем рождения и поблагодарить за неоценимый вклад в работу команды.',
    de: 'An Ihrem Ehrentag möchten wir Ihnen herzlich gratulieren und uns für Ihren wertvollen Einsatz in unserem Team bedanken.',
    ja: '特別な佳き日に、心からの祝福を申し上げます。日頃のチームへの素晴らしい貢献に深く感謝いたします。',
    ko: '특별한 날을 맞아 축하 인사를 드리며, 팀을 위해 늘 헌신해 주시는 노고에 깊이 감사드립니다.',
    it: 'In questo giorno speciale, desideriamo farle i migliori auguri di buon compleanno e ringraziarla per il prezioso contributo nel team.',
    tr: 'Bu özel gününüzde doğum gününüzü kutlar, ekibimize kattığınız değerli katkılar için teşekkür ederiz.',
    id: 'Di hari istimewa ini, kami mengucapkan selamat ulang tahun dan terima kasih atas dedikasi luar biasa Anda di tim kami.',
    bn: 'আপনার বিশেষ দিনে আমরা আপনাকে জন্মদিনের অভিনন্দন জানাই এবং দলে আপনার মূল্যবান অবদানের জন্য ধন্যবাদ জ্ঞাপন করি।',
    vi: 'Nhân dịp đặc biệt này, chúng tôi chúc bạn sinh nhật vui vẻ và cảm ơn những đóng góp tuyệt vời của bạn cho tập thể.',
    sw: 'Katika siku hii yako maalum, tunakutakia siku njema ya kuzaliwa na kushukuru mchango wako mkubwa kwenye timu yetu.',
  },
  sec5Title: {
    en: '5. Messages for a Child\'s Birthday',
    ur: '5. بچوں کی سالگرہ کے لیے پیارے پیغامات',
    ar: '5. رسائل لطيفة ومحببة لأعياد ميلاد الأطفال',
    es: '5. Mensajes Tiernos para el Cumpleaños de un Niño',
    fr: '5. Messages Tendres pour l\'Anniversaire d\'un Enfant',
    hi: '5. बच्चों के जन्मदिन के लिए प्यारे और दुलार भरे संदेश',
    zh: '5. 献给小朋友的可爱童趣生日寄语',
    pt: '5. Mensagens Carinhosas para Aniversário de Crianças',
    ru: '5. Трогательные поздравления для детей',
    de: '5. Liebevolle Botschaften zum Kindergeburtstag',
    ja: '5. お子様・キッズ向けの可愛いバースデーメッセージ',
    ko: '5. 어린이를 위한 사랑스럽고 귀여운 생일 메시지',
    it: '5. Messaggi Dolci per il Compleanno di un Bambino',
    tr: '5. Çocukların Doğum Günü İçin Sevimli Mesajlar',
    id: '5. Pesan Manis & Lucu untuk Ulang Tahun Anak',
    bn: '৫. শিশুদের জন্মদিনের জন্য মিষ্টি ও স্নেহভরা বার্তা',
    vi: '5. Lời Chúc Đáng Yêu Dành Cho Sinh Nhật Các Bé',
    sw: '5. Ujumbe Mzuri kwa Siku ya Kuzaliwa ya Mtoto',
  },
  sec5Bullet1: {
    en: 'Happy birthday to a truly special kid! May your day be filled with cake, balloons, and all your favorite things.',
    ur: 'ننھے پری / راجکمار کو سالگرہ بہت مبارک! آپ کا دن کیک، غباروں اور ڈھیروں تحائف سے جگمگائے۔',
    ar: 'عيد ميلاد سعيد لطفلنا الرائع! أتمنى أن يكون يومك مليئاً بالحلوى والبالونات وكل ألعابك المفضلة.',
    es: '¡Feliz cumpleaños a un pequeñito muy especial! Que tu día esté lleno de pastel, globos y todos tus juguetes favoritos.',
    fr: 'Joyeux anniversaire à un enfant extraordinaire ! Que ta journée soit remplie de gâteaux, de ballons et de joie.',
    hi: 'हमारे प्यारे बच्चे को जन्मदिन की ढेरों शुभकामनाएं! तुम्हारा दिन केक, गुब्बारों और खिलौनों से भरा रहे।',
    zh: '祝特别可爱的小宝贝生日快乐！愿你的大日子装满蛋糕、气球和你最爱的一切！',
    pt: 'Feliz aniversário para uma criança super especial! Que seu dia seja cheio de bolo, balões e muitas brincadeiras.',
    ru: 'С днем рождения замечательного малыша! Пусть этот день будет полон вкусного торта, шаров и любимых подарков.',
    de: 'Herzlichen Glückwunsch an ein ganz besonderes Kind! Möge dein Tag voller Kuchen, Luftballons und Freude sein.',
    ja: 'とっても特別なお子様へ、お誕生日おめでとう！ケーキと風船、大好きなものでいっぱいの一日になりますように。',
    ko: '정말 특별한 우리 아이 생일 축하해! 달콤한 케이크와 풍선, 신나는 놀이로 가득한 하루가 되렴.',
    it: 'Buon compleanno a un bimbo davvero speciale! Che la tua giornata sia piena di torta, palloncini e allegria.',
    tr: 'Çok özel bir çocuğa mutlu yıllar! Günün lezzetli pastalar, rengarenk balonlar ve en sevdiğin oyuncaklarla dolsun.',
    id: 'Selamat ulang tahun untuk anak hebat! Semoga harimu penuh dengan kue lezat, balon warna-warni, dan kebahagiaan.',
    bn: 'আমাদের মিষ্টি সোনামণিকে জন্মদিনের অনেক শুভেচ্ছা! কেক, বেলুন আর খেলনায় ভরে উঠুক তোমার দিনটি।',
    vi: 'Chúc mừng sinh nhật thiên thần nhỏ đặc biệt! Chúc ngày của bé ngập tràn bánh ngọt, bóng bay và niềm vui.',
    sw: 'Heri ya siku ya kuzaliwa kwa mtoto maalum! Siku yako ijae keki, puto na michezo yote unayoipenda.',
  },
  sec5Bullet2: {
    en: 'You\'re another year older and another year more awesome. Have the best birthday ever!',
    ur: 'ہماری آنکھوں کا تارا ایک سال اور بڑا ہو گیا! اللہ پاک آپ کو لمبی، خوشحال اور با برکت زندگی عطا فرمائے۔',
    ar: 'كبرت عاماً آخر وأصبحت أكثر تميزاً وبراءة. أتمنى لك أفضل وأجمل عيد ميلاد على الإطلاق!',
    es: '¡Un año más grande y mucho más genial! ¡Que tengas el cumpleaños más divertido de todos!',
    fr: 'Un an de plus et encore plus génial ! Passe le meilleur des anniversaires !',
    hi: 'तुम एक साल और बड़े और पहले से भी प्यारे हो गए हो! तुम्हारा आज का दिन सबसे शानदार रहे।',
    zh: '又长大了一岁，也变得更加聪明懂事啦！尽情享受你最棒的生日吧！',
    pt: 'Mais um aninho de vida e você está cada vez mais incrível! Aproveite o melhor aniversário de todos!',
    ru: 'Ты стал еще на год взрослее и круче! Пусть этот день рождения будет самым классным!',
    de: 'Wieder ein Jahr älter und noch viel toller! Hab den schönsten Geburtstag aller Zeiten!',
    ja: 'ひとつお兄さん・お姉さんになって、ますます素敵になったね！最高のバースデーを楽しんでね！',
    ko: '한 살 더 쑥쑥 자라 더욱 멋져진 우리 주인공! 세상에서 가장 행복한 생일을 보내렴.',
    it: 'Sei cresciuto di un anno e sei sempre più meraviglioso. Trascorri il compleanno più bello di sempre!',
    tr: 'Bir yaş daha büyüdün ve her zamankinden daha harikasın. En güzel doğum günü senin olsun!',
    id: 'Bertambah satu tahun dan semakin pintar serta menggemaskan. Nikmati hari ulang tahun terbaik ini!',
    bn: 'তুমি আরও এক বছর বড় হলে এবং আরও সুন্দর হয়ে উঠলে! তোমার জন্মদিন হোক আনন্দময় ও উজ্জ্বল।',
    vi: 'Bé đã lớn thêm một tuổi và ngày càng ngoan ngoãn, đáng yêu. Chúc bé có một sinh nhật vui nhất trần đời!',
    sw: 'Umekuwa mkubwa kwa mwaka mwingine na mwerevu zaidi. Uwe na sherehe bora zaidi ya siku ya kuzaliwa!',
  },
  sec6Title: {
    en: '6. Customizing Your Birthday Card on Cardzy',
    ur: '6. کارڈزی پر سالگرہ کا کارڈ کیسے بنائیں',
    ar: '6. تخصيص بطاقة عيد ميلادك عبر Cardzy',
    es: '6. Personaliza tu Tarjeta de Cumpleaños en Cardzy',
    fr: '6. Personnaliser votre Carte d\'Anniversaire sur Cardzy',
    hi: '6. Cardzy पर अपना जन्मदिन कार्ड कैसे तैयार करें',
    zh: '6. 在 Cardzy 上定制你的专属生日卡片',
    pt: '6. Como Personalizar seu Cartão de Aniversário no Cardzy',
    ru: '6. Создание открытки на день рождения на Cardzy',
    de: '6. Personalisieren Sie Ihre Geburtstagskarte auf Cardzy',
    ja: '6. Cardzyでバースデーカードをカスタマイズする手順',
    ko: '6. Cardzy에서 나만의 생일 카드 커스텀하기',
    it: '6. Personalizza il Tuo Biglietto di Compleanno su Cardzy',
    tr: '6. Cardzy Üzerinde Doğum Günü Kartınızı Özelleştirin',
    id: '6. Menyesuaikan Kartu Ulang Tahun Anda di Cardzy',
    bn: '৬. Cardzy-তে কীভাবে জন্মদিনের কার্ড কাস্টমাইজ করবেন',
    vi: '6. Tùy Biến Thiệp Sinh Nhật Của Bạn Trên Cardzy',
    sw: '6. Kubinafsisha Kadi Yako ya Siku ya Kuzaliwa kwenye Cardzy',
  },
  step1Title: {
    en: 'Pick the Birthday Template',
    ur: 'سالگرہ کا تھیم منتخب کریں',
    ar: 'اختر قالب عيد الميلاد',
    es: 'Elige la Plantilla de Cumpleaños',
    fr: 'Choisissez le Modèle d\'Anniversaire',
    hi: 'जन्मदिन टेम्पलेट चुनें',
    zh: '选择生日专属主题模板',
    pt: 'Escolha o Modelo de Aniversário',
    ru: 'Выберите шаблон дня рождения',
    de: 'Geburtstags-Vorlage auswählen',
    ja: 'バースデーテンプレートを選択',
    ko: '생일 템플릿 선택',
    it: 'Scegli il Modello di Compleanno',
    tr: 'Doğum Günü Şablonunu Seçin',
    id: 'Pilih Template Ulang Tahun',
    bn: 'জন্মদিনের টেমপ্লেট নির্বাচন করুন',
    vi: 'Chọn Mẫu Thiệp Sinh Nhật',
    sw: 'Chagua Kiolezo cha Siku ya Kuzaliwa',
  },
  step1Desc: {
    en: 'Open the Wish builder and choose from confetti, balloon, or cake-themed animated designs.',
    ur: 'وش بلڈر کھولیں اور کنفیٹی، غبارے یا کیک والے اینیمیٹڈ ڈیزائنز میں سے انتخاب کریں۔',
    ar: 'افتح منشئ التهاني واختر من بين تصميمات متحركة مع قصاصات الورق، البالونات أو كعكة الاحتفال.',
    es: 'Abre el creador de deseos y selecciona diseños animados con confeti, globos o pasteles festivos.',
    fr: 'Ouvrez le créateur de vœux et choisissez des designs animés ornés de confettis, ballons ou gâteaux.',
    hi: 'विश बिल्डर खोलें और कंफ़ेद्दी, गुब्बारे या केक वाले एनिमेटेड डिज़ाइनों में से पसंदीदा चुनें।',
    zh: '打开祝福卡生成器，从缤纷纸花、气球或生日蛋糕等动态主题设计中自由挑选。',
    pt: 'Abra o criador de cartões e escolha entre designs animados com confetes, balões ou bolo temático.',
    ru: 'Откройте конструктор поздравлений и выберите анимации с конфетти, шарами или тортом.',
    de: 'Öffnen Sie den Grußkarten-Builder und wählen Sie aus animierten Designs mit Konfetti, Ballons oder Kuchen.',
    ja: 'ウィッシュビルダーを開き、紙吹雪、風船、バースデーケーキなどの動くデザインから選択します。',
    ko: '카드 제작기를 열고 색종이 조각, 풍선, 케이크 테마의 생동감 넘치는 애니메이션 디자인을 선택하세요.',
    it: 'Apri il builder di auguri e scegli tra animazioni con coriandoli, palloncini o torte festive.',
    tr: 'Tebrik oluşturucuyu açın ve konfeti, balon veya pasta temalı animasyonlu tasarımlardan birini seçin.',
    id: 'Buka pembuat kartu dan pilih dari desain beranimasi dengan konfeti, balon, atau kue ulang tahun.',
    bn: 'উইশ বিল্ডার খুলুন এবং কনফেটি, বেলুন বা কেক থিমের অ্যানিমেটেড ডিজাইন বেছে নিন।',
    vi: 'Mở trình tạo thiệp và chọn trong số các thiết kế chuyển động lung linh với hoa giấy, bóng bay hoặc bánh kem.',
    sw: 'Fungua mtengenezaji wa kadi na uchague muundo wenye puto, keki au michoro ya kupendeza.',
  },
  step2Title: {
    en: 'Match the Wording to the Relationship',
    ur: 'رشتہ کے مطابق مناسب الفاظ منتخب کریں',
    ar: 'طابق الكلمات مع طبيعة العلاقة',
    es: 'Adapta el Mensaje a tu Relación',
    fr: 'Adaptez le Message à la Relation',
    hi: 'रिश्ते के अनुसार उपयुक्त शब्द चुनें',
    zh: '根据亲疏关系匹配恰当措辞',
    pt: 'Adapte o Texto ao Grau de Amizade',
    ru: 'Подберите слова под формат отношений',
    de: 'Worte passend zur Beziehung wählen',
    ja: '相手との関係性に合った言葉をチョイス',
    ko: '관계에 딱 맞는 메시지 선택',
    it: 'Adatta le Parole alla Relazione',
    tr: 'Sözleri İlişkinize Göre Uyarlayın',
    id: 'Sesuaikan Pesan dengan Hubungan',
    bn: 'সম্পর্ক অনুযায়ী উপযুক্ত বার্তা মেলান',
    vi: 'Chọn Lời Chúc Phù Hợp Với Mối Quan Hệ',
    sw: 'Linganisha Maneno na Uhusiano Wenu',
  },
  step2Desc: {
    en: 'Use a heartfelt message for family, a playful one for close friends, or a formal note for coworkers — pick from the ideas above or write your own.',
    ur: 'خاندان، دوستوں یا کولیگز کے لیے اوپر دیے گئے پیغامات میں سے چنیں یا اپنی پسند کے الفاظ لکھیں۔',
    ar: 'اختر رسالة دافئة للعائلة، أو فكاهية للأصدقاء، أو رسمية لزملاء العمل من الأفكار أعلاه أو اكتب كلماتك الخاصة.',
    es: 'Usa un mensaje cariñoso para la familia, divertido para amigos o formal para compañeros de trabajo.',
    fr: 'Optez pour un texte tendre en famille, amusant entre amis ou formel pour vos collègues.',
    hi: 'परिवार के लिए भावुक, दोस्तों के लिए मजेदार या सहकर्मियों के लिए औपचारिक संदेश चुनें या अपना लिखें।',
    zh: '为家人选择深情寄语，给好友挑选风趣幽默的段子，或为职场同事送上稳重祝福，也可自拟文字。',
    pt: 'Use uma mensagem afetuosa para família, bem-humorada para amigos ou formal para o trabalho.',
    ru: 'Выберите искренние слова для родных, шутку для друзей или деловой тон для коллег из списка выше.',
    de: 'Nutzen Sie herzliche Worte für die Familie, Humor für Freunde oder formelle Töne für Kollegen.',
    ja: '家族には心温まる言葉、友人にはユーモア、仕事仲間には丁寧な表現を上記から選ぶか、自由に編集できます。',
    ko: '가족에게는 감동을, 친구에게는 유쾌함을, 동료에게는 정중함을 담아 위 추천 문구를 선택하거나 직접 작성해보세요.',
    it: 'Scegli un messaggio affettuoso per la famiglia, scherzoso per gli amici o formale per i colleghi.',
    tr: 'Aile için içten, arkadaşlar için neşeli, iş arkadaşları için resmi sözler seçin veya kendi mesajınızı yazın.',
    id: 'Gunakan pesan menyentuh untuk keluarga, jenaka untuk sahabat, atau formal untuk rekan kerja.',
    bn: 'পরিবারের জন্য আন্তরিক, বন্ধুদের জন্য মজার কিংবা সহকর্মীদের জন্য মার্জিত বার্তা নির্বাচন করুন।',
    vi: 'Dùng lời chúc ấm áp cho gia đình, hóm hỉnh cho bạn thân hoặc trang trọng cho đồng nghiệp từ gợi ý trên.',
    sw: 'Tumia ujumbe wa upendo kwa familia, wa kuchekesha kwa marafiki au rasmi kwa wafanyakazi wenzako.',
  },
  step3Title: {
    en: 'Add a Personal Touch',
    ur: 'ذاتی تصویر اور موسیقی شامل کریں',
    ar: 'أضف لمسة شخصية وصور وموسيقى',
    es: 'Añade un Toque Personal con Fotos y Música',
    fr: 'Ajoutez une Touche Personnelle',
    hi: 'तस्वीर और संगीत के साथ व्यक्तिगत स्पर्श दें',
    zh: '添加照片与背景音乐增添个性',
    pt: 'Adicione um Toque Pessoal com Foto e Música',
    ru: 'Добавьте личное фото и музыку',
    de: 'Persönliche Note mit Foto & Musik hinzufügen',
    ja: '写真とBGMでオリジナリティをプラス',
    ko: '사진과 음악으로 특별한 감성 더하기',
    it: 'Aggiungi un Tocco Personale con Foto e Musica',
    tr: 'Fotoğraf ve Müzikle Kişisel Bir Dokunuş Ekleyin',
    id: 'Tambahkan Sentuhan Pribadi dengan Foto & Musik',
    bn: 'ছবি ও সংগীতের সাথে ব্যক্তিগত স্পর্শ দিন',
    vi: 'Thêm Dấu Ấn Cá Nhân Với Ảnh & Âm Nhạc',
    sw: 'Ongeza Picha na Muziki wa Kupendeza',
  },
  step3Desc: {
    en: 'Upload a favorite photo together and select celebratory background music so the birthday person enjoys a magical greeting.',
    ur: 'اپنی پسندیدہ تصویر اپ لوڈ کریں اور پس منظر موسیقی منتخب کریں تاکہ کارڈ دیکھنے والے کے لیے ایک یادگار لمحہ بن جائے۔',
    ar: 'قم برفع صورة تذكارية مشتركة واختر موسيقى خلفية احتفالية ليستمتع صاحب العيد بتجربة لا تُنسى.',
    es: 'Sube una foto especial juntos y selecciona música de fondo festiva para que el cumpleañero viva una experiencia mágica.',
    fr: 'Téléversez une jolie photo souvenir et sélectionnez une musique de fond festive pour émerveiller votre proche.',
    hi: 'अपनी पसंदीदा यादगार तस्वीर अपलोड करें और उत्सव संगीत चुनें ताकि कार्ड खोलने वाले को जादुई अनुभव मिले।',
    zh: '上传一张温馨的同框合影，并挑选欢快的背景旋律，让寿星在拆开卡片时收获满满惊喜。',
    pt: 'Envie uma foto inesquecível de vocês e escolha uma trilha sonora para criar um momento encantador.',
    ru: 'Загрузите памятное совместное фото и выберите праздничную мелодию, создающую волшебное настроение.',
    de: 'Laden Sie ein schönes gemeinsames Foto hoch und wählen Sie festliche Musik für einen magischen Moment.',
    ja: 'お気に入りの思い出写真をアップロードし、お祝いのBGMを設定して、特別な演出を届けましょう。',
    ko: '함께 찍은 소중한 사진을 업로드하고 축하 배경음악을 선택하여 감동적인 언박싱 경험을 선물하세요.',
    it: 'Carica una foto ricordo speciale e scegli una colonna sonora festosa per regalare un\'emozione magica.',
    tr: 'Birlikte çekildiğiniz güzel bir fotoğrafı yükleyin ve kutlama müziği seçerek büyülü bir tebrik hazırlayın.',
    id: 'Unggah foto kenangan favorit dan pilih musik latar perayaan agar kartu menjadi pengalaman magis.',
    bn: 'একটি প্রিয় স্মরণীয় ছবি আপলোড করুন এবং উৎসবের আবহ তৈরি করতে মিষ্টি সুরের মিউজিক যোগ করুন।',
    vi: 'Tải lên bức ảnh kỷ niệm yêu thích và chọn giai điệu rộn ràng để người nhận tận hưởng khoảnh khắc tuyệt vời.',
    sw: 'Pakia picha ya kumbukumbu na uchague muziki wa sherehe ili mhusika afurahie salamu za kipekee.',
  },
  step4Title: {
    en: 'Share Instantly',
    ur: 'فوری واٹس ایپ پر شیئر کریں',
    ar: 'مشاركة فورية عبر واتساب',
    es: 'Comparte al Instante por WhatsApp',
    fr: 'Partagez Instantanément',
    hi: 'व्हाट्सएप पर तुरंत शेयर करें',
    zh: '一键极速分享到 WhatsApp',
    pt: 'Compartilhe Instantaneamente',
    ru: 'Мгновенная отправка в WhatsApp',
    de: 'Sofort auf WhatsApp teilen',
    ja: 'WhatsAppですぐにシェア',
    ko: 'WhatsApp으로 즉시 공유',
    it: 'Condividi Subito su WhatsApp',
    tr: 'WhatsApp Üzerinden Anında Paylaşın',
    id: 'Bagikan Instan ke WhatsApp',
    bn: 'হোয়াটসঅ্যাপে তাৎক্ষণিক শেয়ার করুন',
    vi: 'Chia Sẻ Ngay Lập Tức Qua WhatsApp',
    sw: 'Shiriki Papo Hapo kwenye WhatsApp',
  },
  step4Desc: {
    en: 'Get a shareable link and send it directly on WhatsApp, no printing, no waiting, no shipping cost.',
    ur: 'ایک کلک میں لنک حاصل کریں اور واٹس ایپ پر فوراً بھیجیں — بغیر کسی پرنٹنگ اور انتظار کے۔',
    ar: 'احصل على رابط للمشاركة وأرسله مباشرة عبر واتساب بدون طباعة ولا انتظار وبلا تكاليف شحن.',
    es: 'Obtén un enlace interactivo y envíalo directo por WhatsApp: sin impresiones, sin esperas ni gastos de envío.',
    fr: 'Obtenez un lien à partager et envoyez-le directement sur WhatsApp : zéro impression, zéro délai, zéro frais.',
    hi: 'शेयर करने योग्य लिंक प्राप्त करें और बिना किसी छपाई या डाक के इंतजार के सीधे व्हाट्सएप पर भेजें।',
    zh: '一键生成可分享链接，直接在 WhatsApp 发送给寿星，省去印刷等待与高昂运费。',
    pt: 'Gere um link compartilhável e envie pelo WhatsApp: sem custos de impressão, correios ou espera.',
    ru: 'Получите готовую ссылку и отправьте в WhatsApp — без печати, доставки и долгого ожидания.',
    de: 'Erhalten Sie einen teilbaren Link und senden Sie ihn direkt über WhatsApp – ohne Drucken und ohne Wartezeit.',
    ja: '共有リンクを取得してWhatsAppで直接送信。印刷の手間や郵送コストなしで即座に届きます。',
    ko: '링크를 생성해 WhatsApp으로 바로 전송하세요. 인쇄나 배송 기다림 없이 언제 어디서나 전할 수 있습니다.',
    it: 'Genera un link condivisibile e invialo subito su WhatsApp: niente stampa, nessuna attesa né costi di spedizione.',
    tr: 'Paylaşılabilir bağlantıyı alın ve doğrudan WhatsApp\'tan gönderin; baskı veya kargo masrafı olmadan hemen ulaşsın.',
    id: 'Dapatkan tautan unik dan kirimkan langsung di WhatsApp: tanpa cetak fisik, tanpa tunggu dan gratis.',
    bn: 'শেয়ার করার মতো একটি লিংক তৈরি করে সরাসরি হোয়াটসঅ্যাপে পাঠিয়ে দিন—প্রিন্টিং বা ডাক খরচের কোনো ঝামেলা নেই।',
    vi: 'Nhận liên kết thiệp và gửi trực tiếp qua WhatsApp: không cần in ấn, không chờ đợi và hoàn toàn miễn phí.',
    sw: 'Pata kiungo na utume moja kwa moja kwenye WhatsApp, bila kuchapisha, bila kuchelewa wala gharama za usafirishaji.',
  },
  ctaTitle: {
    en: 'Send a Birthday Wish Today',
    ur: 'آج ہی سالگرہ کی مبارکباد بھیجیں',
    ar: 'أرسل تهنئة عيد ميلاد اليوم',
    es: 'Envía una Felicitación de Cumpleaños Hoy',
    fr: 'Envoyez une Carte d\'Anniversaire Aujourd\'hui',
    hi: 'आज ही जन्मदिन की शुभकामनाएं भेजें',
    zh: '立即制作并发送生日祝福',
    pt: 'Envie um Cartão de Aniversário Hoje',
    ru: 'Отправьте поздравление с днем рождения уже сегодня',
    de: 'Verschicken Sie noch heute einen Geburtstagswunsch',
    ja: '今日、バースデーメッセージを届けましょう',
    ko: '지금 특별한 생일 축하 카드를 보내보세요',
    it: 'Invia un Augurio di Compleanno Oggi',
    tr: 'Bugün Bir Doğum Günü Kutlaması Gönderin',
    id: 'Kirimkan Ucapan Ulang Tahun Hari Ini',
    bn: 'আজই জন্মদিনের শুভেচ্ছা কার্ড তৈরি করুন',
    vi: 'Gửi Thiệp Chúc Mừng Sinh Nhật Ngay Hôm Nay',
    sw: 'Tuma Heri ya Siku ya Kuzaliwa Leo',
  },
  ctaDesc: {
    en: 'Build an animated birthday card in minutes with music, photos, and a message that actually sounds like you. Share it free on WhatsApp.',
    ur: 'صرف چند منٹوں میں موسیقی، تصویر اور دلکش اینیمیشن کے ساتھ سالگرہ کا کارڈ تیار کریں اور واٹس ایپ پر مفت شیئر کریں۔',
    ar: 'صمم بطاقة عيد ميلاد متحركة في دقائق مع الموسيقى والصور والكلمات التي تعبر عنك بصدق. شاركها مجاناً عبر واتساب.',
    es: 'Crea una tarjeta animada en minutos con música, fotos y tus propias palabras. Compártela gratis en WhatsApp.',
    fr: 'Créez une carte animée en quelques minutes avec musique, photos et vos mots chaleureux. Partagez-la gratuitement sur WhatsApp.',
    hi: 'संगीत, फोटो और सुंदर संदेश के साथ कुछ ही मिनटों में एनिमेटेड जन्मदिन कार्ड बनाएं और व्हाट्सएप पर फ्री शेयर करें।',
    zh: '几分钟内定制包含背景音乐、照片与走心文字的动效生日卡，免费在 WhatsApp 上分享。',
    pt: 'Crie um cartão animado em minutos com música, fotos e uma mensagem com a sua cara. Compartilhe de graça no WhatsApp.',
    ru: 'Создайте анимационную открытку за пару минут с музыкой, фотографиями и теплыми словами. Делитесь бесплатно в WhatsApp.',
    de: 'Erstellen Sie in Minuten eine animierte Karte mit Musik, Fotos und persönlichen Worten. Kostenlos teilen über WhatsApp.',
    ja: '音楽、写真、温かい言葉を込めた動くバースデーカードを数分で作成。WhatsAppで無料シェアできます。',
    ko: '음악과 사진, 진심 어린 문구가 어우러진 움직이는 생일 카드를 몇 분 만에 만들고 WhatsApp으로 무료 공유하세요.',
    it: 'Crea un biglietto animato in pochi minuti con musica, foto e parole che ti rappresentano. Condividilo gratis su WhatsApp.',
    tr: 'Müzik, fotoğraflar ve içten bir mesajla dakikalar içinde animasyonlu bir doğum günü kartı oluşturun. WhatsApp\'ta ücretsiz paylaşın.',
    id: 'Buat kartu ulang tahun beranimasi dalam hitungan menit dengan musik, foto, dan pesan bermakna. Bagikan gratis di WhatsApp.',
    bn: 'মিউজিক, ছবি এবং আন্তরিক বার্তা দিয়ে মিনিটের মধ্যেই অ্যানিমেটেড কার্ড তৈরি করুন এবং হোয়াটসঅ্যাপে বিনামূল্যে শেয়ার করুন।',
    vi: 'Tạo thiệp sinh nhật chuyển động trong vài phút với âm nhạc, hình ảnh và lời chúc chân thành. Chia sẻ miễn phí trên WhatsApp.',
    sw: 'Tengeneza kadi yenye uhuishaji kwa dakika chache yenye muziki, picha na maneno mazuri. Shiriki bure kwenye WhatsApp.',
  },
  sendWishBtn: {
    en: 'Create a Birthday Card Now',
    ur: 'ابھی سالگرہ کا کارڈ بنائیں',
    ar: 'إنشاء بطاقة عيد ميلاد الآن',
    es: 'Crear Tarjeta de Cumpleaños Ahora',
    fr: 'Créer une Carte d\'Anniversaire',
    hi: 'अभी जन्मदिन कार्ड बनाएं',
    zh: '立即制作生日贺卡',
    pt: 'Criar Cartão de Aniversário Agora',
    ru: 'Создать открытку сейчас',
    de: 'Jetzt Geburtstagskarte erstellen',
    ja: '今すぐバースデーカードを作成',
    ko: '지금 생일 카드 만들기',
    it: 'Crea il Biglietto Ora',
    tr: 'Hemen Doğum Günü Kartı Oluştur',
    id: 'Buat Kartu Ulang Tahun Sekarang',
    bn: 'এখনই জন্মদিনের কার্ড তৈরি করুন',
    vi: 'Tạo Thiệp Sinh Nhật Ngay',
    sw: 'Unda Kadi ya Siku ya Kuzaliwa Sasa',
  },
  moreGuidesBtn: {
    en: 'More Celebration Guides',
    ur: 'مزید تقریبات کی گائیڈز',
    ar: 'المزيد من أدلة الاحتفالات',
    es: 'Más Guías de Celebraciones',
    fr: 'Plus de Guides de Fêtes',
    hi: 'और उत्सव गाइड्स',
    zh: '浏览更多庆典指南',
    pt: 'Mais Guias de Celebrações',
    ru: 'Больше руководств по праздникам',
    de: 'Weitere Festtags-Anleitungen',
    ja: '他のお祝いガイドを見る',
    ko: '더 많은 축하 가이드 보기',
    it: 'Altre Guide per le Feste',
    tr: 'Daha Fazla Kutlama Rehberi',
    id: 'Panduan Perayaan Lainnya',
    bn: 'আরও উৎসব গাইড',
    vi: 'Xem Thêm Hướng Dẫn Kỷ Niệm',
    sw: 'Miongozo Zaidi ya Sherehe',
  },
}

import { Breadcrumbs } from '@/components/breadcrumbs'

export default function BirthdayGuidePage() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return BIRTHDAY_GUIDE_TEXT[key]?.[lang] || BIRTHDAY_GUIDE_TEXT[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="py-8 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Celebration Guides', href: '/guide' },
            { label: 'Birthday Wishes & Message Ideas' },
          ]}
          className="mb-4"
        />

        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" /> {getText('backToGuides')}
        </Link>

        <article>
          <header className="mb-10">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {getText('badge')}
            </span>
            <h1 className={cn(
              "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl",
              isUrdu ? "font-urdu leading-relaxed text-2xl sm:text-3xl" : "leading-tight"
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
              <Link href="/authors/hasnain" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors">
                {getText('author')}
              </Link>
            </div>
          </header>

          <div className={cn("prose prose-neutral max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base", isUrdu && "font-urdu")}>

            <p>{getText('introP1')}</p>

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
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec3Bullet1')}&quot;</li>
              <li>&quot;{getText('sec3Bullet2')}&quot;</li>
              <li>&quot;{getText('sec3Bullet3')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec4Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec4Bullet1')}&quot;</li>
              <li>&quot;{getText('sec4Bullet2')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec5Title')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>&quot;{getText('sec5Bullet1')}&quot;</li>
              <li>&quot;{getText('sec5Bullet2')}&quot;</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border/80 pb-2">
              {getText('sec6Title')}
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>{getText('step1Title')}: </strong>{getText('step1Desc')}</li>
              <li><strong>{getText('step2Title')}: </strong>{getText('step2Desc')}</li>
              <li><strong>{getText('step3Title')}: </strong>{getText('step3Desc')}</li>
              <li><strong>{getText('step4Title')}: </strong>{getText('step4Desc')}</li>
            </ol>

          </div>

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
                <Send className="size-4" /> {getText('sendWishBtn')}
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
