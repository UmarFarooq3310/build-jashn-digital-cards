const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

function savePostFile(slug, fileIdx, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Saved 100% fully translated post${fileIdx}.ts`);
}

const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Helper to translate section titles across languages
function getSecTitle(baseTitle, lang, secIdx) {
  const titles = {
    es: [
      "1. Apertura Sagrada: Caligrafía Bismillah y Bendiciones del Corán",
      "2. Ejemplos de Textos para la Ceremonia Nikkah (Formal y Elegante)",
      "3. Textos Vibrantes para Noches de Mehndi, Sangeet y Dholki",
      "4. Invitaciones Elegantes para Celebraciones de Barat y Walima",
      "5. Notas de Cortesía: RSVPs, Código de Vestimenta y Mapas"
    ],
    fr: [
      "1. Ouverture Sacrée : Calligraphie Bismillah & Bénédictions du Coran",
      "2. Modèles de Textes pour la Cérémonie de Nikkah (Formel et Élégant)",
      "3. Formules Vibrantes pour les Soirées Mehndi et Dholki",
      "4. Invitations de Prestige pour Barat & Réception de Walima",
      "5. Notes de Courtoisie : RSVP, Code Vestimentaire & Plans"
    ],
    ar: [
      "1. الافتتاحية المباركة: خط البسملة والآيات القرآنية",
      "2. صيغ دعوات حفل النكاح الرسمية والراقية",
      "3. عبارات مبهجة لليالي الحناء والموسيقى",
      "4. دعوات حفل البارات والوليمة المباركة",
      "5. ملاحظات هامة: تأكيد الحضور وخريطة الموقع"
    ],
    ur: [
      "1. بسم اللہ خطاطی اور قرآنی آیات کا بابرکت آغاز",
      "2. نکاح کی پروقار تحریر و مثالیں",
      "3. مہندی اور ڈھولکی کی رنگارنگ تحریر",
      "4. بارات اور ولیمہ کے شاہانہ الفاظ",
      "5. اہم ہدایات: واٹس ایپ آر ایس وی پی اور مینو کی تفصیلات"
    ],
    hi: [
      "1. बिस्मिल्लाह सुलेख और कुरान की आयतों के साथ पवित्र शुरुआत",
      "2. निकाह समारोह के लिए औपचारिक और सुंदर संदेश",
      "3. मेहंदी और ढोलकी की रातों के लिए जीवंत संदेश",
      "4. बारात और वलीमा के लिए शाही निमंत्रण",
      "5. आवश्यक शिष्टाचार: आरएसवीपी और वेन्यू मैप"
    ],
    zh: [
      "1. 庄严开篇：Bismillah 阿拉伯书法与古兰经圣句",
      "2. Nikkah 订婚仪式正式而典雅的文案范例",
      "3. Mehndi 欢庆与 Dholki 歌舞之夜的热烈祝福",
      "4. Barat 喜宴与 Walima 招待会的主人邀约",
      "5. 必备礼仪说明：RSVP 回执、着装要求与地图导航"
    ],
    pt: [
      "1. Abertura Sagrada: Caligrafia Bismillah e Bênçãos do Alcorão",
      "2. Exemplos de Texto para a Cerimónia Nikkah",
      "3. Textos Vibrantes para Noites de Mehndi e Dholki",
      "4. Convites Elegantes para Barat e Walima",
      "5. Notas de Cortesia: RSVPs e Mapas de Localização"
    ],
    ru: [
      "1. Священное начало: каллиграфия Бисмилля и стихи Корана",
      "2. Торжественные тексты приглашений на Никах",
      "3. Яркие поздравления для ночи Мехнди и Дхолки",
      "4. Праздничные приглашения на Барат и Валиму",
      "5. Важные примечания: RSVP, дресс-код и карты"
    ],
    de: [
      "1. Heiliger Auftakt: Bismillah-Kalligrafie & Koransprüche",
      "2. Formelle Textbeispiele für die Nikkah-Zeremonie",
      "3. Lebendige Formulierungen für Mehndi- & Dholki-Abende",
      "4. Einladungen für Barat- und Walima-Empfänge",
      "5. Wichtige Hinweise: RSVP, Dresscode & Anfahrtsplan"
    ],
    ja: [
      "1. 聖なる幕开け：ビスミッラー書道とコーランの祝福",
      "2. Nikkah結婚契約式のための公式＆エレガントな文例",
      "3. Mehndi＆Dholkiの夜のための華やかな文面",
      "4. Barat喜宴＆Walima招待会のための招待状",
      "5. マナーと注意事項：RSVP・ドレスコード・会場マップ"
    ],
    ko: [
      "1. 경건한 시작: 비스밀라 서예 및 코란 구절 축복",
      "2. 니카(Nikkah) 혼인 서약식을 위한 격식 있는 문구 예시",
      "3. 멘디 및 촐키 밤을 위한 화려한 축하 문구",
      "4. 바라트 피로연 및 발리ما 연회를 위한 초대 문구",
      "5. 필수 안내: RSVP 하객 회신 및 위치 지도"
    ],
    it: [
      "1. Apertura Sacra: Calligrafia Bismillah e Benedizioni del Corano",
      "2. Esempi di Testo Formali per la Cerimonia Nikkah",
      "3. Testi Vivaci per le Serate Mehndi e Dholki",
      "4. Inviti Eleganti per le Feste Barat e Walima",
      "5. Note di Cortesia: RSVP, Dress Code e Mappe"
    ],
    tr: [
      "1. Kutsal Açılış: Besmele Hat Sanatı ve Ayet-i Kerimeler",
      "2. Resmi ve Zarif Nikah Töreni Davet Sözleri",
      "3. Kına ve Dholki Geceleri için Renkli Davet Yazıları",
      "4. Barat ve Düğün Yemeği (Velime) Davetiyeleri",
      "5. Nazik Notlar: LCV Takibi, Kıyafet Kodu ve Konum"
    ],
    id: [
      "1. Pembukaan Suci: Kaligrafi Bismillah & Ayat Al-Qur'an",
      "2. Contoh Teks Resmi & Anggun untuk Akad Nikah",
      "3. Kata-kata Meriah untuk Malam Mehndi & Dholki",
      "4. Undangan Elegan untuk Resepsi Barat & Walima",
      "5. Catatan Kesopanan: RSVP, Gaun & Peta Lokasi"
    ],
    bn: [
      "1. পবিত্র সূচনা: বিসমিল্লাহ ক্যালিগ্রাফি ও কুরআনের আয়াত",
      "2. নিকাহ অনুষ্ঠানের জন্য আনুষ্ঠানিক ও মার্জিত বাক্য",
      "3. মেহেদি ও ঢোলকি রাতের আনন্দময় নিমন্ত্রণ বার্তা",
      "4. বারাত ও ওয়ালিমা সংবর্ধনার জন্য রাজকীয় আমন্ত্রণ",
      "5. প্রয়োজনীয় শিষ্টাচার: আরএসভিপি ও গুগল ম্যাপ"
    ],
    vi: [
      "1. Mở Đầu Thiêng Liêng: Thư Pháp Bismillah & Lời Kinh Coran",
      "2. Mẫu Câu Trang Trọng Cho Lễ Nikkah Hồi Giáo",
      "3. Lời Mời Rực Rỡ Cho Đêm Lễ Mehndi & Dholki",
      "4. Thiệp Mời Tiệc Tiệc Barat & Tiệc Walima",
      "5. Ghi Chú Lịch Sự: RSVP, Trang Phục & Bản Đồ"
    ],
    sw: [
      "1. Ufunguzi Mtakatifu: Kaligrafia ya Bismillah na Aya za Qur'ani",
      "2. Mifano ya Maneno Rasmi ya Sherehe ya Nikkah",
      "3. Maneno ya Shangwe ya Usiku wa Mehndi na Dholki",
      "4. Mialiko ya Kifalme ya Harusi ya Barat na Walima",
      "5. Dokezo Muhimu: RSVP, Mavazi na Ramani ya Ukumbi"
    ]
  };

  return titles[lang]?.[secIdx] || baseTitle;
}

console.log("Section title dictionary loaded.");
