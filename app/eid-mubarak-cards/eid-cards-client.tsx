'use client'

import Link from 'next/link'
import { ArrowLeft, Sparkles, Send, Globe, MessageSquare } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const EID_LANDING_T: Record<string, Record<string, string>> = {
  backToWishCards: {
    en: "Back to Wish Cards", ur: "وش کارڈز پر واپس جائیں", es: "Volver a Tarjetas de Deseos", fr: "Retour aux Cartes de Vœux", ar: "العودة إلى بطاقات التهنئة", hi: "विश कार्ड पर वापस जाएं", zh: "返回祝贺卡列表", pt: "Voltar para Cartões de Desejos", ru: "Назад к открыткам", de: "Zurück zu den Wunschkarten", ja: "ウィッシュカードに戻る", ko: "위시 카드로 돌아가기", it: "Torna ai Biglietti di Auguri", tr: "Dilek Kartlarına Dön", id: "Kembali ke Kartu Ucapan", bn: "উইশ کارڈے ফিরে যান", vi: "Quay Lại Thiệp Lời Chúc", sw: "Rudi kwenye Kadi za Tamani"
  },
  badge: {
    en: "Occasion Landing Page", ur: "مناسبت لینڈنگ پیج", es: "Página de Ocasión", fr: "Page de Célébration", ar: "صفحة المناسبة", hi: "अवसर लैंडिंग पेज", zh: "节日专属页面", pt: "Página de Ocasião", ru: "Страница праздника", de: "Anlass-Seite", ja: "オケージョンページ", ko: "행사 페이지", it: "Pagina dell'Occasione", tr: "Özel Gün Sayfası", id: "Halaman Acara", bn: "خاص موقع والہ صفحہ", vi: "Trang Dịp Lễ", sw: "Ukurasa wa Tukio"
  },
  title: {
    en: "Interactive Digital Eid Mubarak Cards & Event Invitations",
    ur: "انٹرایکٹو ڈیجیٹل عید مبارک کارڈز اور ایونٹ کے دعوت نامے",
    es: "Tarjetas Digitales Interactivas e Invitaciones de Eid Mubarak",
    fr: "Cartes Numériques Interactives et Invitations Eid Mubarak",
    ar: "بطاقات ودعوات رقمية تفاعلية لعيد مبارك",
    hi: "इंटरेक्टिव डिजिटल ईद मुबारक कार्ड और इवेंट आमंत्रण",
    zh: "开斋节 / 宰牲节互动数字祝贺卡与宴会请柬",
    pt: "Cartões e Convites Digitais Interativos de Eid Mubarak",
    ru: "Интерактивные цифровые открытки и приглашения на Ид Мубарак",
    de: "Interaktive digitale Eid Mubarak Karten & Einladungen",
    ja: "インタラクティブなデジタルEid Mubarakカード＆イベント招待状",
    ko: "인터랙티브 디지털 이드 무바라크 카드 및 행사 초대장",
    it: "Biglietti e Inviti Digitali Interattivi per l'Eid Mubarak",
    tr: "İnteraktif Dijital Bayram Kartları ve Etkinlik Davetiyeleri",
    id: "Kartu Ucapan & Undangan Digital Interaktif Idul Fitri / Adha",
    bn: "انٹرایکٹو ڈیجیٹل عید مبارک کارڈز و ایونٹ انویٹیشن",
    vi: "Thiệp Kỹ Thuật Số & Thiệp Mời Sự Kiện Eid Mubarak",
    sw: "Kadi za Dijitali za Interaktivi na Mialiko ya Eid Mubarak"
  },
  templatePreviewBadge: {
    en: "Template Preview", ur: "ٹیمپلیٹ کا پیش نظارہ", es: "Vista previa de plantilla", fr: "Aperçu du modèle", ar: "معاينة القالب", hi: "टेम्पलेट पूर्वावलोकन", zh: "模板预览", pt: "Prévia do modelo", ru: "Предпросмотр шаблона", de: "Vorlagen-Vorschau", ja: "テンプレートプレビュー", ko: "템플릿 미리보기", it: "Anteprima modello", tr: "Şablon Önizleme", id: "Pratinjau Templat", bn: "ٹیمپلیٹ پریویو", vi: "Xem Trước Mẫu Thiệp", sw: "Hakiki Kiolezo"
  },
  templatePreviewDesc: {
    en: "Interactive crescent moon & lantern themes with WhatsApp RSVP & custom music",
    ur: "واٹس ایپ آر ایس وی پی اور کسٹم میوزک کے ساتھ اینیمیٹڈ چاند اور فانوس تھیمز",
    es: "Temas interactivos de luna creciente y linterna con RSVP de WhatsApp y música personalizada",
    fr: "Thèmes de croissant de lune et lanternes interactifs avec RSVP WhatsApp et musique",
    ar: "ثيمات هلال وفوانيس تفاعلية مع تأكيد حضور عبر واتساب وموسيقى مخصصة",
    hi: "व्हाट्सएप आरएसवीपी और कस्टम म्यूजिक के साथ नया चांद और लालटेन थीम",
    zh: "精美月牙与新月灯笼主题，支持 WhatsApp RSVP 回复与背景音乐",
    pt: "Temas interativos de lua crescente e lanternas com RSVP no WhatsApp e música",
    ru: "Интерактивные темы с полумесяцем и фонарями, с поддержкой RSVP WhatsApp и музыки",
    de: "Interaktive Mond- & Laternen-Themen mit WhatsApp RSVP & eigener Musik",
    ja: "三日月＆ランタンのテーマ。WhatsApp RSVPとカスタムBGM対応",
    ko: "초승달 및 등불 테마, WhatsApp RSVP 및 맞춤 음악 지원",
    it: "Temi interattivi con mezzaluna e lanterne con RSVP WhatsApp e musica",
    tr: "WhatsApp RSVP ve özel müzik içeren interaktif hilal ve fener temaları",
    id: "Tema bulan sabit & lentera interaktif dengan RSVP WhatsApp dan musik kustom",
    bn: "ہوسٹس ایپ آر ایس وی پی و کسٹم میوزک کے ساتھ اینیمیٹڈ چاند اور فانوس تھیمز",
    vi: "Chủ đề trăng lưỡi liềm & đèn lồng sinh động với WhatsApp RSVP và nhạc tùy chỉnh",
    sw: "Mandhari ya mwezi na taa yenye ufuatiliaji wa RSVP wa WhatsApp na muziki"
  },
  sec1Title: {
    en: "Celebrate Joy & Unity with Meaningful Eid Greetings",
    ur: "معنی خیز عید کے پیغامات کے ساتھ خوشیاں اور اتحاد منائیں",
    es: "Celebra la Alegría y la Unidad con Saludos Significativos de Eid",
    fr: "Célébrez la Joie et l'Unité avec des Vœux Significatifs de l'Aïd",
    ar: "احتفل بالجمال والوحدة مع تهاني العيد المعبرة",
    hi: "सार्थक ईद शुभकामनाओं के साथ खुशी और एकता मनाएं",
    zh: "以真挚温馨的开斋节祝福传递喜悦与亲情",
    pt: "Celebre a Alegria e a União com Saudações Significativas de Eid",
    ru: "Празднуйте радость и единство с душевными поздравлениями",
    de: "Feiern Sie Freude und Einheit mit bedeutungsvollen Eid-Grüßen",
    ja: "心のこもったEidの挨拶で喜びと絆をお祝いしましょう",
    ko: "의미 있는 이드 인사로 기쁨과 화합을 나누세요",
    it: "Celebra la Gioia e l'Unità con Auguri Significativi per l'Eid",
    tr: "Anlamlı Bayram Mesajlarıyla Coşku ve Birlikteliği Kutlayın",
    id: "Rayakan Kedamaian & Kebersamaan dengan Ucapan Idul Fitri yang Bermakna",
    bn: "معنی خیز عید کے پیغامات کے ساتھ خوشیاں اور اتحاد منائیں",
    vi: "Tôn Vinh Niềm Vui & Sự Gắn Kết Với Lời Chúc Eid Ý Nghĩa",
    sw: "Sherehekea Furaha na Umoja kwa Salamu zenye Maana za Eid"
  },
  sec1P1: {
    en: "Eid is a time of spiritual reflection, gratitude, and heartfelt reunion. Whether marking the joyous end of Ramadan during Eid al-Fitr or honoring faith and togetherness on Eid al-Adha, sharing blessings lies at the core of the holiday. With Cardzy, distance vanishes — send 3D animated wish cards instantly with calligraphic greetings and audio melodies.",
    ur: "عید روحانیت، شکر گزاری اور محبتوں کے ملن کا موقع ہے۔ چاہے عید الفطر ہو یا عید الاضحی، پیاروں کو مبارکباد بھیجنا اس تہوار کی روح ہے۔ کارڈزی کے ساتھ فاصلے ختم ہو جاتے ہیں — خوبصورت خطاطی اور موسیقی کے ساتھ 3D اینیمیٹڈ وش کارڈز سیکنڈوں میں بھیجیں۔",
    es: "El Eid es un momento de reflexión espiritual, gratitud y reunión familiar. Con Cardzy, las distancias desaparecen: envía tarjetas animadas en 3D al instante con caligrafía y música.",
    fr: "L'Aïd est un moment de réflexion spirituelle, de gratitude et de retrouvailles. Avec Cardzy, la distance disparaît : envoyez des cartes animées 3D instantanément.",
    ar: "العيد وقت للتأمل والامتنان والتجمع العائلي. مع Cardzy، تلاشت المسافات — أرسل بطاقات معايدة رقمية ثلاثية الأبعاد فوراً.",
    hi: "ईद आध्यात्मिक विचार, आभार और पुनर्मिलन का समय है। Cardzy के साथ दूरियां मिट जाती हैं — सुलेख और संगीत के साथ 3D एनिमेटेड विश कार्ड भेजें।",
    zh: "开斋节与宰牲节是令人神圣且充满感恩与重逢的节日。Cardzy 让距离不再是障碍——即刻向远方亲人呈献附带古典艺术与优雅音乐的3D动态贺卡。",
    pt: "O Eid é um momento de reflexão espiritual e união. Com o Cardzy, as distâncias desaparecem — envie cartões animados em 3D instantaneamente.",
    ru: "Ид — время благодарности и встречи с родными. С Cardzy расстояния не помеха: отправляйте анимированные 3D открытки с музыкой за секунды.",
    de: "Eid ist eine Zeit der Besinnung und Freude. Mit Cardzy schwindet jede Entfernung – versenden Sie 3D-animierte Wunschkarten sofort.",
    ja: "Eidは感謝と再会の大切なひとときです。Cardzyを使えば距離を越えて、アニメーションと音楽付きの3Dカードを即座に送ることができます。",
    ko: "이드는 감사와 재회의 시간입니다. Cardzy와 함께라면 거리와 상관없이 3D 애니메이션 카드와 음악을 즉시 전할 수 있습니다.",
    it: "L'Eid è un momento di riflessione e unione. Con Cardzy le distanze scompaiono: invia biglietti animati in 3D all'istante.",
    tr: "Bayram şükran ve sevdiklerinizle buluşma zamanıdır. Cardzy ile mesafeler kalkıyor — kaligrafi ve müzikli 3D bayram kartlarını anında gönderin.",
    id: "Hari Raya adalah saat rasa syukur dan kebersamaan. Dengan Cardzy, jarak bukan lagi penghalang — kirim kartu animasi 3D instan.",
    bn: "عید روحانیت، شکر گزاری اور محبتوں کے ملن کا موقع ہے۔ کارڈزی کے ساتھ فاصلے ختم ہو جاتے ہیں — خوبصورت خطاطی اور موسیقی کے ساتھ 3D اینیمیٹڈ وش کارڈز بھیجیں۔",
    vi: "Eid là thời điểm biểu đạt lòng biết ơn và sự sum họp. Với Cardzy, khoảng cách được xóa bỏ — gửi thiệp 3D sinh động ngay lập tức.",
    sw: "Eid ni wakati wa shukrani na mkusanyiko wa familia. Kwa Cardzy, umbali haupo — tuma kadi za picha za mwendo za 3D mara moja."
  },
  feat1Title: { en: "Multilingual in 18 Languages", ur: "18 زبانوں میں دستیاب", es: "Multilingüe en 18 Idiomas", fr: "Multilingue en 18 Langues", ar: "متعدد اللغات بـ 18 لغة", hi: "18 भाषाओं में उपलब्ध", zh: "支持 18 种全球语言", pt: "Multilíngue em 18 Idiomas", ru: "Поддержка 18 языков", de: "Mehrsprachig in 18 Sprachen", ja: "18言語に対応", ko: "18개 언어 지원", it: "Multilingue in 18 Lingue", tr: "18 Dilde Çok Dilli", id: "Mendukung 18 Bahasa", bn: "১৮টি ভাষায় উপলব্ধ", vi: "Đa Ngôn Ngữ 18 Tiếng", sw: "Inasaidia Lugha 18" },
  feat1Desc: { en: "Share blessings in Arabic, Urdu (نستعلیق), English, French, Spanish, and 13 other languages.", ur: "عربی، اردو (نستعلیق)، انگریزی، فرانسیسی، ہسپانوی اور دیگر زبانوں میں مبارکباد بھیجیں۔", es: "Comparte bendiciones en árabe, urdu, inglés, francés, español y más.", fr: "Partagez des bénédictions en arabe, ourdou, anglais, français, espagnol et plus.", ar: "شارك التبريكات بالعربية، الأوردية، الإنجليزية، الفرنسية وغيرها.", hi: "अरबी, उर्दू (नस्तलीक), अंग्रेजी, फ्रेंच, स्पैनिश आदि में शुभकामनाएं भेजें।", zh: "支持阿拉伯语、乌尔都语 Nastaliq 正体、英语、法语、西班牙语等 18 种语言。", pt: "Compartilhe bênçãos em árabe, urdu, inglês, francês, espanhol e outros.", ru: "Делитесь пожеланиями на арабском, урду, английском, французском и др.", de: "Teilen Sie Segen auf Arabisch, Urdu, Englisch, Französisch und mehr.", ja: "アラビア語、ウルドゥー語、英語、フランス語、スペイン語などで祝福を共有。", ko: "아랍어, 우르두어, 영어, 프랑스어, 스페인어 등으로 축복을 전하세요.", it: "Condividi benedizioni in arabo, urdu, inglese, francese, spagnolo e altri.", tr: "Arapça, Urduca, İngilizce, Fransızca, İspanyolca ve daha fazlasıyla tebrikler gönderin.", id: "Bagikan ucapan dalam bahasa Arab, Urdu, Inggris, Prancis, Spanyol, dan lainnya.", bn: "عربی، اردو، انگریزی، فرانسیسی و دیگر زبانوں میں مبارکباد بھیجیں۔", vi: "Chia sẻ lời chúc bằng tiếng Ả Rập, Urdu, Anh, Pháp, Tây Ban Nha và nhiều ngôn ngữ khác.", sw: "Shiriki baraka kwa Kiarabu, Kiurdu, Kiingereza, Kifaransa, Kispanyoli na vingine." },

  feat2Title: { en: "Instant WhatsApp Sharing", ur: "واٹس ایپ پر فوری شیئرنگ", es: "Compartir al Instante en WhatsApp", fr: "Partage Instantané sur WhatsApp", ar: "مشاركة فورية عبر واتساب", hi: "व्हाट्सएप पर तुरंत शेयरिंग", zh: "一键分享至 WhatsApp", pt: "Compartilhamento Instantâneo no WhatsApp", ru: "Мгновенный шеринг в WhatsApp", de: "Sofortiges Teilen auf WhatsApp", ja: "WhatsAppで即座に共有", ko: "WhatsApp 즉시 공유", it: "Condivisione Istantanea su WhatsApp", tr: "WhatsApp'ta Anında Paylaşım", id: "Berbagi Instan ke WhatsApp", bn: "ہوسٹس ایپ پر فوری شیئرنگ", vi: "Chia Sẻ Tức Thì Qua WhatsApp", sw: "Kushiriki Mara Moja WhatsApp" },
  feat2Desc: { en: "Send your digital Eid greetings straight to individual contacts or family groups in one tap.", ur: "ایک کلک میں اپنے عید کے پیغامات فرد یا فیملی گروپس کو بھیجیں۔", es: "Envía tus saludos digitales directamente a chats individuales o grupos.", fr: "Envoyez vos vœux numériques directement aux contacts ou groupes familiaux.", ar: "أرسل بطاقة التهنئة مباشرة للمحادثات الفردية أو المجموعات العائلية.", hi: "एक टैप में अपनी डिजिटल शुभकामनाएं व्यक्तिगत चैट या समूहों में भेजें।", zh: "只需轻点一下，即可将动态节日卡片呈献给亲友个人或家庭社群。", pt: "Envie suas saudações digitais diretamente para contatos ou grupos.", ru: "Отправляйте открытки в личные сообщения или семейные чаты в один клик.", de: "Senden Sie Ihre digitalen Eid-Grüße mit einem Klick in Einzel- oder Gruppen-Chats.", ja: "ワンタップで個人のチャットや家族グループにカードを送信できます。", ko: "한 번의 탭으로 개인 채팅이나 가족 그룹에 카드를 전송하세요.", it: "Invia i tuoi auguri digitali direttamente a chat singole o gruppi familiari.", tr: "Dijital bayram mesajlarınızı tek dokunuşla kişisel sohbetlere veya aile gruplarına gönderin.", id: "Kirim ucapan digital Anda langsung ke obrolan pribadi atau grup keluarga.", bn: "ایک کلک میں اپنے عید کے پیغامات فرد یا فیملی گروپس کو بھیجیں۔", vi: "Gửi thiệp kỹ thuật số trực tiếp đến tin nhắn cá nhân hoặc nhóm gia đình trong 1 chạm.", sw: "Tuma salamu zako za dijitali moja kwa moja kwenye mazungumzo ya mtu binafsi au vikundi." },

  ctaTitle: { en: "Ready to Send Your Eid Blessings?", ur: "کیا آپ عید کی مبارکباد بھیجنے کے لیے تیار ہیں؟", es: "¿Listo para enviar tus bendiciones de Eid?", fr: "Prêt à envoyer vos vœux de l'Aïd ?", ar: "هل أنت مستعد لإرسال تهاني العيد؟", hi: "क्या आप ईद की शुभकामनाएं भेजने के लिए तैयार हैं?", zh: "准备好送出您的真挚节日祝福了吗？", pt: "Pronto para enviar suas bênçãos de Eid?", ru: "Готовы отправить свои поздравления с праздником Ид?", de: "Bereit, Ihre Eid-Segen zu versenden?", ja: "Eidの祝福を贈る準備はできましたか？", ko: "이드 축복의 마음을 보낼 준비가 되셨나요?", it: "Pronto a inviare i tuoi auguri per l'Eid?", tr: "Bayram Tebriklerinizi Göndermeye Hazır mısınız?", id: "Siap Mengirimkan Berkah Idul Fitri Anda?", bn: "کیا آپ عید کی مبارکباد بھیجنے کے لیے تیار ہیں؟", vi: "Sẵn Sàng Gửi Lời Chúc Eid Của Bạn?", sw: "Uko Tayari Kutuma Baraka Zako za Eid?" },
  ctaDesc: { en: "Customize your Eid Mubarak card with animations, Urdu/Arabic script, and background music in under 2 minutes.", ur: "اینیمیشن، اردو/عربی خطاطی اور موسیقی کے ساتھ 2 منٹ میں اپنا کارڈ بنائیں۔", es: "Personaliza tu tarjeta de Eid Mubarak con animaciones, caligrafía y música en menos de 2 minutos.", fr: "Personnalisez votre carte Eid Mubarak avec des animations, de la calligraphie et de la musique en 2 minutes.", ar: "خصص بطاقة عيد مبارك مع الرسوم المتحركة والخط العربي والموسيقى في أقل من دقيقتين.", hi: "एनिमेशन, सुलेख और संगीत के साथ 2 मिनट में अपना ईद कार्ड कस्टमाइज़ करें।", zh: "只需不到2分钟，即可自定义精致动画、字体与背景音乐，一键生成专属卡片。", pt: "Personalize seu cartão de Eid Mubarak com animações, caligrafia e música em menos de 2 minutos.", ru: "Настройте открытку с анимацией, каллиграфией и музыкой менее чем за 2 минуты.", de: "Gestalten Sie Ihre Eid Mubarak Karte mit Animationen, Schrift und Musik in unter 2 Minuten.", ja: "2分未満でアニメーション、美しいフォント、BGM付きのカードを作成可能。", ko: "2분 이내에 애니메이션, 서체, 배경 음악으로 이드 카드를 완성해 보세요.", it: "Personalizza il tuo biglietto Eid Mubarak con animazioni, calligrafia e musica in meno di 2 minuti.", tr: "Bayram kartınızı animasyonlar, kaligrafi ve müzikle 2 dakikadan kısa sürede hazırlayın.", id: "Kustomisasi kartu ucapan Idul Fitri Anda dengan animasi, kaligrafi, dan musik dalam 2 menit.", bn: "اینیمیشن، اردو/عربی خطاطی اور موسیقی کے ساتھ 2 منٹ میں اپنا کارڈ بنائیں۔", vi: "Tùy chỉnh thiệp Eid Mubarak với hình ảnh động, phông chữ và nhạc nền trong chưa đầy 2 phút.", sw: "Tengeneza kadi yako ya Eid Mubarak kwa picha za mwendo, fonti, na muziki ndani ya dakika 2." },
  ctaBtn: { en: "Create Your Eid Card Now ➡️", ur: "ابھی اپنا عید کارڈ بنائیں ➡️", es: "Crear tu Tarjeta de Eid Ahora ➡️", fr: "Créer votre Carte d'Aïd Maintenant ➡️", ar: "أنشئ بطاقة العيد الآن ➡️", hi: "अभी अपना ईद कार्ड बनाएं ➡️", zh: "立即生成开斋节祝贺卡 ➡️", pt: "Criar seu Cartão de Eid Agora ➡️", ru: "Создать открытку к Ид прямо сейчас ➡️", de: "Jetzt Eid-Karte erstellen ➡️", ja: "今すぐEidカードを作成 ➡️", ko: "지금 이드 카드 만들기 ➡️", it: "Crea Ora il Tuo Biglietto Eid ➡️", tr: "Şimdi Bayram Kartını Oluştur ➡️", id: "Buat Kartu Idul Fitri Sekarang ➡️", bn: "ابھی اپنا عید کارڈ بنائیں ➡️", vi: "Tạo Thiệp Eid Của Bạn Ngay ➡️", sw: "Tengeneza Kadi Yako ya Eid Sasa ➡️" }
}

export function EidCardsClient() {
  const { lang, t } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const getText = (key: string) => {
    return EID_LANDING_T[key]?.[lang] || EID_LANDING_T[key]?.['en'] || t(key) || ''
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* Breadcrumb */}
      <Link
        href="/create-wish"
        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors mb-6"
      >
        <ArrowLeft className="size-4" /> {getText('backToWishCards')}
      </Link>

      <article>
        {/* Header */}
        <header className="mb-8">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="size-3.5" /> {getText('badge')}
          </span>
          <h1 className={cn(
            "mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight",
            isUrdu && "font-urdu py-1 text-2xl sm:text-3xl leading-relaxed"
          )}>
            {getText('title')}
          </h1>
        </header>

        {/* Main Template Preview Banner */}
        <div className="my-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 flex items-center justify-center p-6 text-center">
            <div className="space-y-3">
              <div className="inline-block rounded-full bg-amber-400/20 px-4 py-1 text-xs font-semibold text-amber-300 backdrop-blur-xs">
                {getText('templatePreviewBadge')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">
                Eid Mubarak عید مبارک
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md mx-auto">
                {getText('templatePreviewDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="prose prose-emerald max-w-none text-foreground leading-relaxed space-y-6 text-sm sm:text-base">
          <h2 className={cn("text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3 flex items-center gap-2", isUrdu && "font-urdu leading-relaxed")}>
            {getText('sec1Title')}
          </h2>
          <p className={cn(isUrdu && "font-urdu text-base leading-relaxed")}>
            {getText('sec1P1')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
              <Globe className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className={cn("font-bold text-sm text-foreground", isUrdu && "font-urdu text-base")}>{getText('feat1Title')}</h4>
                <p className={cn("text-xs text-muted-foreground mt-1", isUrdu && "font-urdu text-sm")}>{getText('feat1Desc')}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex items-start gap-3">
              <MessageSquare className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className={cn("font-bold text-sm text-foreground", isUrdu && "font-urdu text-base")}>{getText('feat2Title')}</h4>
                <p className={cn("text-xs text-muted-foreground mt-1", isUrdu && "font-urdu text-sm")}>{getText('feat2Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center rounded-3xl bg-gradient-to-r from-emerald-900 to-amber-950 p-8 text-white shadow-md space-y-4">
          <h3 className={cn("text-2xl font-extrabold", isUrdu && "font-urdu leading-relaxed")}>{getText('ctaTitle')}</h3>
          <p className={cn("text-sm text-emerald-200 max-w-md mx-auto", isUrdu && "font-urdu leading-relaxed text-base")}>
            {getText('ctaDesc')}
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/create-wish"
              className="rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-emerald-950 hover:bg-amber-300 transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Send className="size-4" /> {getText('ctaBtn')}
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
