const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

const MASTER_SECTION_TITLES = {
  1: [
    {
      en: "1. Timeless Opening: Calligraphy & Celebrated Quotes by Rumi & Gibran",
      ur: "1. رومی اور خلیل جبران کے سدا بہار اقوال اور خطاطی کا بابرکت آغاز",
      es: "1. Apertura Atemporal: Caligrafía y Citas Célebres de Rumi y Gibran",
      fr: "1. Ouverture Temporelle : Calligraphie & Citations Célèbres de Rumi & Gibran",
      ar: "1. الافتتاحية المباركة: خط عربي راقي وأقوال ملهمة لرومي وخليل جبران",
      hi: "1. कालातीत शुरुआत: सुलेख और रूमी व खलील जिब्रान के प्रसिद्ध विचार",
      zh: "1. 永恒开篇：书法与鲁米及纪伯伦经典名言",
      pt: "1. Abertura Atemporal: Caligrafia e Citações Célebres de Rumi e Gibran",
      ru: "1. Священное начало: каллиграфия и цитаты Руми и Джебрана",
      de: "1. Zeitloser Auftakt: Kalligrafie & Berühmte Zitate von Rumi & Gibran",
      ja: "1. 時代を超える幕開け：書道とルミ＆ジブランの名言",
      ko: "1. 영원한 시작: 서예 및 루미와 지브란의 명언",
      it: "1. Apertura Senza Tempo: Calligrafia e Citazioni Famose di Rumi e Gibran",
      tr: "1. Zamansız Açılış: Hat Sanatı ve Rumi ile Cibran'dan Özlü Sözler",
      id: "1. Pembukaan Abadi: Kaligrafi & Kutipan Terkenal Rumi & Gibran",
      bn: "1. কালজয়ী সূচনা: ক্যালিগ্রাফি এবং রুমি ও জিবরানের উক্তি",
      vi: "1. Mở Đầu Vĩnh Cửu: Thư Pháp & Câu Chúc Của Rumi & Gibran",
      sw: "1. Ufunguzi wa Milele: Kaligrafia na Nukuu za Rumi na Gibran"
    },
    {
      en: "2. Nikkah Ceremony Wording Examples (Formal & Elegant)",
      ur: "2. نکاح کی پروقار تحریر و مثالیں",
      es: "2. Ejemplos de Textos para la Ceremonia Nikkah (Formal y Elegante)",
      fr: "2. Modèles de Textes pour la Cérémonie de Nikkah (Formel et Élégant)",
      ar: "2. صيغ دعوات حفل النكاح الرسمية والراقية",
      hi: "2. निकाह समारोह के लिए औपचारिक और सुंदर संदेश",
      zh: "2. Nikkah 订婚仪式正式而典雅的文案范例",
      pt: "2. Exemplos de Texto para a Cerimónia Nikkah (Formal e Elegante)",
      ru: "2. Торжественные тексты приглашений на Никах (Формальные и Элегантные)",
      de: "2. Formelle Textbeispiele für die Nikkah-Zeremonie (Zarif & Elegant)",
      ja: "2. Nikkah結婚契約式のための公式＆エレガントな文例",
      ko: "2. 니카(Nikkah) 혼인 서약식을 위한 격식 있는 문구 예시",
      it: "2. Esempi di Testo Formali per la Cerimonia Nikkah (Eleganti)",
      tr: "2. Resmi ve Zarif Nikah Töreni Davet Sözleri",
      id: "2. Contoh Teks Resmi & Anggun untuk Akad Nikah",
      bn: "2. নিকাহ অনুষ্ঠানের জন্য আনুষ্ঠানিক ও মার্জিত বাক্য",
      vi: "2. Mẫu Câu Trang Trọng Cho Lễ Nikkah Hồi Giáo",
      sw: "2. Mifano ya Maneno Rasmi ya Sherehe ya Nikkah"
    },
    {
      en: "3. Vibrant Wording for Mehndi, Sangeet & Dholki Nights",
      ur: "3. مہندی اور ڈھولکی کی رنگارنگ تحریر",
      es: "3. Textos Vibrantes para Noches de Mehndi, Sangeet y Dholki",
      fr: "3. Formules Vibrantes pour les Soirées Mehndi et Dholki",
      ar: "3. عبارات مبهجة لليالي الحناء والموسيقى",
      hi: "3. मेहंदी और ढोलकी की रातों के लिए जीवंत संदेश",
      zh: "3. Mehndi 欢庆与 Dholki 歌舞之夜的热烈祝福",
      pt: "3. Textos Vibrantes para Noites de Mehndi e Dholki",
      ru: "3. Яркие поздравления для ночи Мехнди и Дхолки",
      de: "3. Lebendige Formulierungen für Mehndi- & Dholki-Abende",
      ja: "3. Mehndi＆Dholkiの夜のための華やかな文面",
      ko: "3. 멘디 및 촐키 밤을 위한 화려한 축하 문구",
      it: "3. Testi Vivaci per le Serate Mehndi e Dholki",
      tr: "3. Kına ve Dholki Geceleri için Renkli Davet Yazıları",
      id: "3. Kata-kata Meriah untuk Malam Mehndi & Dholki",
      bn: "3. মেহেদি ও ঢোলকি রাতের আনন্দময় নিমন্ত্রণ বার্তা",
      vi: "3. Lời Mời Rực Rỡ Cho Đêm Lễ Mehndi & Dholki",
      sw: "3. Maneno ya Shangwe ya Usiku wa Mehndi na Dholki"
    },
    {
      en: "4. Regal Host Invitations for Barat & Walima Galas",
      ur: "4. بارات اور ولیمہ کے شاہانہ الفاظ",
      es: "4. Invitaciones Elegantes para Celebraciones de Barat y Walima",
      fr: "4. Invitations de Prestige pour Barat & Réception de Walima",
      ar: "4. دعوات حفل البارات والوليمة المباركة",
      hi: "4. बारात और वलीमा के लिए शाही निमंत्रण",
      zh: "4. Barat 喜宴与 Walima 招待会的主人邀约",
      pt: "4. Convites Elegantes para Barat e Walima",
      ru: "4. Праздничные приглашения на Барат и Валиму",
      de: "4. Einladungen für Barat- und Walima-Empfänge",
      ja: "4. Barat喜宴＆Walima招待会のための招待状",
      ko: "4. 바라트 피로연 및 발리ما 연회를 위한 초대 문구",
      it: "4. Inviti Eleganti per le Feste Barat e Walima",
      tr: "4. Barat ve Düğün Yemeği (Velime) Davetiyeleri",
      id: "4. Undangan Elegan untuk Resepsi Barat & Walima",
      bn: "4. বারাত ও ওয়ালিমা সংবর্ধনার জন্য রাজکীয় আমন্ত্রণ",
      vi: "4. Thiệp Mời Tiệc Tiệc Barat & Tiệc Walima",
      sw: "4. Mialiko ya Kifalme ya Harusi ya Barat na Walima"
    },
    {
      en: "5. Essential Courtesy Notes: RSVPs, Dress Codes & Venue Maps",
      ur: "5. اہم ہدایات: واٹس ایپ آر ایس وی پی اور مینو کی تفصیلات",
      es: "5. Notas de Cortesía: RSVPs, Código de Vestimenta y Mapas",
      fr: "5. Notes de Courtoisie : RSVP, Code Vestimentaire & Plans",
      ar: "5. ملاحظات هامة: تأكيد الحضور وخريطة الموقع",
      hi: "5. आवश्यक शिष्टाचार: आरएसवीपी और वेन्यू मैप",
      zh: "5. 必备礼仪说明：RSVP 回执、着装要求与地图导航",
      pt: "5. Notas de Cortesia: RSVPs e Mapas de Localização",
      ru: "5. Важные примечания: RSVP, дресс-код и карты",
      de: "5. Wichtige Hinweise: RSVP, Dresscode & Anfahrtsplan",
      ja: "5. マナーと注意事項：RSVP・ドレスコード・会場マップ",
      ko: "5. 필수 안내: RSVP 하객 회신 및 위치 지도",
      it: "5. Note di Cortesia: RSVP, Dress Code e Mappe",
      tr: "5. Nazik Notlar: LCV Takibi, Kıyafet Kodu ve Konum",
      id: "5. Catatan Kesopanan: RSVP, Gaun & Peta Lokasi",
      bn: "5. প্রয়োজনীয় শিষ্টাচার: আরএসভিপি ও গুগল ম্যাপ",
      vi: "5. Ghi Chú Lịch Sự: RSVP, Trang Phục & Bản Đồ",
      sw: "5. Dokezo Muhimu: RSVP, Mavazi na Ramani ya Ukumbi"
    }
  ]
};

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');

  // Fix any English titles in non-English entries
  LANGS.forEach(lang => {
    const titles = MASTER_SECTION_TITLES[fileIdx];
    if (!titles) return;

    titles.forEach((tObj) => {
      const engTitle = tObj.en;
      const transTitle = tObj[lang];
      if (!transTitle) return;

      const langRegex = new RegExp(`("${lang}":\\s*\\{[\\s\\S]*?\\n  \\})`, 'g');
      text = text.replace(langRegex, (block) => {
        return block.split(`"title": "${engTitle}"`).join(`"title": "${transTitle}"`);
      });
    });
  });

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Audited & fixed section titles in post${fileIdx}.ts`);
});
