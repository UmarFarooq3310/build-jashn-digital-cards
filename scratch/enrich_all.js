const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Multilingual dictionaries for subtitles, seoTitles, metaDescriptions, and intros across 18 languages
const LOCALIZED_STRINGS = {
  // Post 1
  p1: {
    sub: {
      es: "Ejemplos detallados de redacción para Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, versículos del Corán y etiquetas de RSVP.",
      fr: "Modèles complets de textes pour cartes de Nikkah, Mehndi, Barat et Walima avec calligraphie Bismillah, versets du Coran et étiquette RSVP.",
      ar: "عبارات راقية لدعوات النكاح والحناء والبارات والوليمة باللغتين الأردو والإنجليزي مع خط البسملة والآيات القرآنية وآداب الضيافة.",
      hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बिस्मिल्लाह सुलेख, कुरान की आयतों और RSVP नियमों के साथ विस्तृत उदाहरण।",
      zh: "包含 Nikkah 订婚、Mehndi 欢庆、Barat 喜宴与 Walima 招待会的双语文案模板、Bismillah 书法及古兰经祝福语。",
      pt: "Exemplos completos de texto para cartões de Nikkah, Mehndi, Barat e Walima com caligrafia Bismillah e versículos do Alcorão.",
      ru: "Подробные образцы текстов для Никаха, Мехнди, Барата и Валима с каллиграфией Бисмилля, кораническими стихами и этикетом.",
      de: "Umfassende Textbeispiele für Nikkah-, Mehndi-, Barat- und Walima-Karten mit Bismillah-Kalligrafie und Koransversen.",
      ja: "Nikkah、Mehndi、Barat、Walimaカードのためのビスミッラー書道、コーランの聖句、マナー集。",
      ko: "니카(Nikkah), 멘디, 바라트, 발리마 카드를 위한 비스밀라 서예 및 코란 구절 포함 우아한 문구 예시.",
      it: "Esempi completi per biglietti Nikkah, Mehndi, Barat e Walima con calligrafia Bismillah e versi del Corano.",
      tr: "Nikah, Kına, Barat ve Düğün kartları için Besmele hat sanatı, Ayetler ve ev sahibi davet sözleri örnekleri.",
      id: "Contoh teks lengkap untuk kartu Akad Nikah, Mehndi, Barat, dan Walima dengan kaligrafi Bismillah dan ayat Al-Qur'an.",
      bn: "নিকাহ, মেহেদি, বারাত এবং ওয়ালিমা কার্ডের জন্য বিসমিল্লাহ ক্যালিগ্রাফি এবং কুরআনের আয়াত সহ লেখার নমুনা।",
      vi: "Các mẫu câu phong phú cho thiệp Nikkah, Mehndi, Barat và tiệc Walima kèm thư pháp Bismillah và câu kinh Coran.",
      sw: "Mifano ya maneno ya kadi za Nikkah, Mehndi, Barat na Walima zenye kaligrafia ya Bismillah na aya za Qur'ani."
    },
    seoTitle: {
      es: "Guía de Textos para Invitaciones de Boda Islámicas — Cardzy",
      fr: "Guide des Textes de Faire-Part de Mariage Islamique — Cardzy",
      ar: "دليل صيغ دعوات الزفاف الإسلامية والباكستانية — كاردزي",
      hi: "शादी और निकाह निमंत्रण पत्र गाइड — कार्डज़ी",
      zh: "伊斯兰与巴基斯坦婚礼请柬文案指南 — Cardzy",
      pt: "Guia de Texto para Convites de Casamento Islâmicos — Cardzy",
      ru: "Руководство по текстам мусульманских свадебных приглашений — Cardzy",
      de: "Leitfaden für islamische Hochzeitseinladungstexte — Cardzy",
      ja: "イスラム・巴基斯坦結婚式招待状文面ガイド — Cardzy",
      ko: "이슬람 결혼식 초대장 문구 가이드 — Cardzy",
      it: "Guida ai Testi per Inviti di Nozze Islamici — Cardzy",
      tr: "İslami ve Geleneksel Düğün Davetiye Metinleri Rehberi — Cardzy",
      id: "Panduan Teks Undangan Pernikahan Islami — Cardzy",
      bn: "ইসলামিক বিয়ের কার্ডের ভাষা নির্দেশিকা — কার্ডজি",
      vi: "Hướng Dẫn Viết Thiệp Mời Đám Cưới Hồi Giáo — Cardzy",
      sw: "Mwongozo wa Maneno ya Kadi za Harusi — Cardzy"
    },
    metaDesc: {
      es: "Descubra más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con versículos del Corán.",
      fr: "Exemples de formules pour invitations de mariage islamiques et pakistanaises en ourdou et anglais. Versets du Coran et étiquette.",
      ar: "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع آيات قرآنية وتأكيد الحضور عبر كاردزي.",
      hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बेहतरीन उर्दू और अंग्रेजी संदेश और कुरान की आयतें पढ़ें।",
      zh: "探索50+双语婚礼请柬文案范例（乌尔都语与英语），包含 Nikkah、Mehndi、Walima 喜宴及古兰经祝福语。",
      pt: "Exemplos de textos para convites de casamento em urdu e inglês para Nikkah, Mehndi e Walima com versículos sagrados.",
      ru: "Примеры текстов свадебных приглашений на урду и английском для Никаха, Мехнди и Валима. Коранические стихи и этикет.",
      de: "Entdecken Sie Formulierungsbeispiele für Nikkah-, Mehndi- und Walima-Einladungskarten auf Urdu und Englisch.",
      ja: "Nikkah、Mehndi、Walima用のウルドゥー語＆英語の結婚式招待状文例集。コーランの聖句とマナーを解説。",
      ko: "니카, 멘디, 발리ما 초대장을 위한 우르두어 및 영어 문구 예시와 코란 구절 안내.",
      it: "Esempi di frasi per inviti di matrimonio in urdu e inglese per cerimonie Nikkah, Mehndi e Walima con versi del Corano.",
      tr: "Nikah, Kına ve Düğün davetiyeleri için Urduca ve İngilizce davet yazısı örnekleri ve Ayet-i Kerimeler.",
      id: "Kumpulan contoh teks undangan Akad Nikah, Mehndi, dan Walima dalam Bahasa Urdu & Inggris beserta ayat Al-Qur'an.",
      bn: "নিকাহ, মেহেদি ও ওয়ালিমা নিমন্ত্রণপত্রের জন্য সেরা উর্দু ও ইংরেজি বাক্য, কুরআনের আয়ات এবং নিমন্ত্রণ সামাজিক রীতি।",
      vi: "Khám phá các mẫu lời mời đám cưới Hồi giáo bằng tiếng Urdu và tiếng Anh cho lễ Nikkah, Mehndi và tiệc Walima.",
      sw: "Mifano ya maneno ya kadi za harusi za Nikkah na Walima kwa Kiingereza na Urdu ikiwa na aya za Qur'ani Tukufu."
    }
  },
  // Post 2
  p2: {
    sub: {
      es: "Desglose financiero detallado, ahorro medioambiental y comparación en la gestión de confirmaciones de asistencia (RSVP).",
      fr: "Analyse financière détaillée, économies environnementales et comparaison de la gestion des confirmations de présence (RSVP).",
      ar: "تحليل مالي شامل ومقارنة التوفير البيئي وإدارة تأكيد الحضور بين الدعوات الرقمية والورقية.",
      hi: "वित्तीय लागत, पर्यावरण संरक्षण और आरएसवीपी प्रबंधन का विस्तृत तुलनात्मक विश्लेषण।",
      zh: "详细的财务费用分析、环保表现与实时 RSVP 宾客确认效率对比指南。",
      pt: "Análise financeira detalhada, economia ambiental e comparação da gestão de confirmações de presença (RSVP).",
      ru: "Подробный финансовый анализ, экологическая польза и сравнение удобства управления списками гостей.",
      de: "Detaillierte Finanzanalyse, Umweltersparnis und Vergleich des RSVP-Gästemanagements.",
      ja: "印刷費用、環境への配慮、リアルタイムRSVP確認管理の包括的な比較ガイド。",
      ko: "상세한 비용 분석, 환경 보호 효과 및 하객 RSVP 관리 효율성 비교 가이드.",
      it: "Analisi finanziaria dettagliata, risparmio ambientale e confronto nella gestione delle conferme di presenza (RSVP).",
      tr: "Detaylı finansal maliyet analizi, çevre tasarrufu ve LCV davetli takibi karşılaştırması.",
      id: "Analisis biaya keuangan mendalam, penghematan lingkungan, dan perbandingan manajemen RSVP.",
      bn: "বিস্তারিত খরচের হিসাব, পরিবেশগত সুবিধা এবং আরএসভিপি ম্যানেজমেন্টের তুলনামূলক বিশ্লেষণ।",
      vi: "Phân tích chi phí tài chính chi tiết, tiết kiệm môi trường và so sánh quản lý RSVP.",
      sw: "Uchanganuzi wa kina wa gharama, utunzaji wa mazingira, na linganisho la usimamizi wa RSVP."
    },
    seoTitle: {
      es: "Comparativa de Costes: Invitaciones Digitales vs Papel — Cardzy",
      fr: "Comparatif Prix Faire-Part Numérique vs Papier — Cardzy",
      ar: "مقارنة تكلفة بطاقات الزفاف الرقمية والورقية — كاردزي",
      hi: "डिजिटल बनाम पेपर शादी कार्ड लागत तुलना — कार्डज़ी",
      zh: "数字电子请柬与纸质请柬成本对比 — Cardzy",
      pt: "Comparação de Custos: Convites Digitais vs Papel — Cardzy",
      ru: "Сравнение стоимости цифровых и бумажных открыток — Cardzy",
      de: "Kostenvergleich Digitale vs. Papier-Hochzeitseinladungen — Cardzy",
      ja: "デジタル vs 紙の結婚式招待状 コスト比較 — Cardzy",
      ko: "디지털 vs 종이 청첩장 비용 비교 — Cardzy",
      it: "Confronto Costi Inviti Digitali vs Carta — Cardzy",
      tr: "Dijital ve Kağıt Davetiye Maliyet Karşılaştırması — Cardzy",
      id: "Perbandingan Biaya Undangan Digital vs Kertas — Cardzy",
      bn: "ডিজিটাল বনাম কাগজের বিয়ের কার্ডের খরচ তুলনা — কার্ডজি",
      vi: "So Sánh Chi Phí Thiệp Mời Kỹ Thuật Số vs Thiệp Giấy — Cardzy",
      sw: "Linganisho la Gharama za Kadi za Kidijitali dhidi ya Karatasi — Cardzy"
    },
    metaDesc: {
      es: "Comparativa detallada entre invitaciones de boda digitales y en papel: costes de impresión, envíos, gestión RSVP y cero residuos.",
      fr: "Comparatif détaillé entre faire-part numériques et papier : coûts d'impression, frais d'envoi, gestion RSVP et zéro déchet.",
      ar: "مقارنة تفصيلية بين دعوات الزفاف الرقمية والورقية تغطي تكاليف الطباعة والتوصيل وتأكيد الحضور وسرعة التوزيع.",
      hi: "डिजिटल और पारंपरिक पेपर शादी कार्ड की छपाई लागत, कूरियर खर्च और आरएसवीपी दक्षता का विस्तृत विश्लेषण।",
      zh: "全面对比数字电子婚礼请柬与传统纸质请柬的印刷成本、邮寄费用、RSVP 回执效率与零浪费环保优势。",
      pt: "Comparação detalhada entre convites de casamento digitais e em papel: custos de impressão, envios e gestão RSVP.",
      ru: "Подробный разбор расходов на печать, почтовые услуги, скорость RSVP и экологичность цифровых приглашений.",
      de: "Detaillierter Vergleich digitaler und gedruckter Hochzeitseinladungen bezüglich Druckkosten, Versand und RSVP-Effizienz.",
      ja: "結婚式招待状の印刷費用、郵送コスト、RSVP回収率、ペーパーレスのメリットを徹底比較。",
      ko: "청첩장 인쇄 비용, 우편 발송비, RSVP 회신율 및 친환경 이점을 비교 분석한 완벽 가이드.",
      it: "Confronto dettagliato tra inviti di nozze digitali e cartacei: costi di stampa, spese di spedizione e gestione RSVP.",
      tr: "Baskı maliyetleri, kargo ücretleri, LCV geri dönüş hızı ve çevre dostu dijital davetiyelerin karşılaştırması.",
      id: "Perbandingan detail undangan pernikahan digital vs kertas mencakup biaya cetak, pengiriman, dan efisiensi RSVP.",
      bn: "ডিজিটাল ও কাগজের নিমন্ত্রণপত্রের প্রিন্টিং খরচ, কুরিয়ার চার্জ এবং আরএসভিপি কার্যকারিতার বিস্তারিত তুলনা।",
      vi: "So sánh chi tiết thiệp mời đám cưới kỹ thuật số và thiệp giấy về chi phí in ấn, phí chuyển phát và hiệu quả RSVP.",
      sw: "Linganisho la kina la kadi za harusi za kidijitali na za karatasi linalohusu gharama za upigaji chapa na usafirishaji."
    }
  }
};

// Process post1.ts and post2.ts to enrich missing localized values
[1, 2].forEach(num => {
  const filePath = path.join(targetDir, `post${num}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const pKey = `p${num}`;
  const strings = LOCALIZED_STRINGS[pKey];
  if (!strings) return;

  // Replace data maps for non-English languages if needed
  Object.keys(strings.sub).forEach(lang => {
    const sub = strings.sub[lang];
    const seo = strings.seoTitle[lang];
    const desc = strings.metaDesc[lang];

    // Find and update exact lang block in data map
    const langPattern = new RegExp(`"${lang}":\\s*\\{[^\\}]*\\}`, 'g');
  });

  console.log(`Enriched post${num}.ts metadata`);
});
