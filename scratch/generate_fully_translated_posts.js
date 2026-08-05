const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Dictionaries per post & per language
const DATA_DICTIONARY = {
  1: {
    slug: "complete-guide-to-pakistani-wedding-invitation-wording-urdu-english",
    category: "Wedding & Nikkah",
    titles: {
      en: "The Complete Guide to Pakistani & Islamic Wedding Invitation Wording (Urdu & English Examples)",
      ur: "پاکستانی شادی کارڈ تحریر گائیڈ (اردو اور انگریزی الفاظ)",
      es: "Guía Completa de Textos para Invitaciones de Boda (Urdu e Inglés)",
      fr: "Guide Complet de Rédaction des Invitations de Mariage (Ourdou & Anglais)",
      ar: "دليل صيغ دعوات الزفاف الباكستانية والإسلامية (أردو وإنجليزي)",
      hi: "पाकिस्तानी शादी कार्ड आमंत्रण पाठ गाइड (उर्दू और अंग्रेजी)",
      zh: "婚礼请柬措辞与文案完整指南（乌尔都语与英语）",
      pt: "Guia Completo de Texto para Convites de Casamento (Urdu e Inglês)",
      ru: "Полное руководство по текстам свадебных приглашений (Урду и Английский)",
      de: "Vollständiger Leitfaden für Hochzeitseinladungstexte (Urdu & Englisch)",
      ja: "結婚式招待状の文面と例文完全ガイド（ウルドゥー語＆英語）",
      ko: "결혼식 초대장 문구 작성 완벽 가이드 (우르두어 및 영어)",
      it: "Guida Completa ai Testi per Inviti di Nozze (Urdu e Inglese)",
      tr: "Düğün Davetiyesi Yazım ve Metin Rehberi (Urduca ve İngilizce)",
      id: "Panduan Lengkap Teks Undangan Pernikahan (Bahasa Urdu & Inggris)",
      bn: "পাকিস্তানি ও ইসলামিক বিয়ের নিমন্ত্রণপত্রের লেখা গাইড (উর্দু ও ইংরেজি)",
      vi: "Hướng Dẫn Viết Lời Mời Đám Cưới Hồi Giáo & Pakistan (Tiếng Urdu & Anh)",
      sw: "Mwongozo Kamilifu wa Maneno ya Kadi za Harusi za Kiislamu (Kiuswahili & Kiingereza)"
    },
    subtitles: {
      en: "Comprehensive wording examples for Nikkah, Mehndi, Barat, and Walima cards with authentic Bismillah calligraphy, Quranic verses, host etiquette, and RSVP notes.",
      ur: "نکاح، مہندی، بارات اور ولیمہ کے لیے روایتی اور جدید ترین اردو اور انگلش الفاظ و دعائیں",
      es: "Ejemplos detallados para tarjetas de Nikkah, Mehndi, Barat y Walima con caligrafía Bismillah, versículos del Corán y etiquetas de RSVP.",
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
    seoTitles: {
      en: "Pakistani & Islamic Wedding Invitation Wording Guide (Urdu & English)",
      ur: "پاکستانی شادی اور نکاح کارڈ تحریر گائیڈ — کارڈزی",
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
    metaDescs: {
      en: "Explore 50+ Pakistani and Islamic wedding invitation wording examples in Urdu & English for Nikkah, Mehndi, Barat & Walima cards. Includes Quranic verses and RSVP etiquette.",
      ur: "نکاح، مہندی، بارات اور ولیمہ کارڈز کے لیے بہترین اردو اور انگریزی تحریر، قرآنی آیات اور دعائیں۔ کارڈزی پر خوبصورت ڈیجیٹل کارڈز دیکھیں۔",
      es: "Descubra más de 50 ejemplos de textos para invitaciones de boda en urdu e inglés para Nikkah, Mehndi y Walima con versículos del Corán.",
      fr: "Exemples de formules pour invitations de mariage islamiques et pakistanaises en ourdou et anglais. Versets du Coran et étiquette.",
      ar: "اكتشف أكثر من 50 نموذجاً لصيغ دعوات الزفاف والنكاح بالأردو والإنجليزي مع آيات قرآنية وتأكيد الحضور عبر كاردزي.",
      hi: "निकाह, मेहंदी, बारात और वलीमा कार्ड के लिए बेहतरीन उर्दू और अंग्रेजी संदेश और कुरान की आयतें पढ़ें।",
      zh: "探索50+双语婚礼请柬文案范例（乌尔都语与英语），包含 Nikkah、Mehndi、Walima 喜宴及古兰经祝福语。",
      pt: "Exemplos de textos para convites de casamento em urdu e inglês para Nikkah, Mehndi e Walima com versículos sagrados.",
      ru: "Примеры текстов свадебных приглашений на урду и английском для Никаха, Мехнди и Валима. Коранические стихи и этикет.",
      de: "Entdecken Sie Formulierungsbeispiele für Nikkah-, Mehndi- und Walima-Einladungskarten auf Urdu und Englisch.",
      ja: "Nikkah、Mehndi、Walima用のウルドゥー語＆英語の結婚式招待状文例集。コーランの聖句とマナーを解説。",
      ko: "니카, 멘디, 발리마 초대장을 위한 우르두어 및 영어 문구 예시와 코란 구절 안내.",
      it: "Esempi di frasi per inviti di matrimonio in urdu e inglese per cerimonie Nikkah, Mehndi e Walima con versi del Corano.",
      tr: "Nikah, Kına ve Düğün davetiyeleri için Urduca ve İngilizce davet yazısı örnekleri ve Ayet-i Kerimeler.",
      id: "Kumpulan contoh teks undangan Akad Nikah, Mehndi, dan Walima dalam Bahasa Urdu & Inggris beserta ayat Al-Qur'an.",
      bn: "নিকাহ, মেহেদি ও ওয়ালিমা নিমন্ত্রণপত্রের জন্য সেরা উর্দু ও ইংরেজি বাক্য, কুরআনের আয়াত এবং নিমন্ত্রণ সামাজিক রীতি।",
      vi: "Khám phá các mẫu lời mời đám cưới Hồi giáo bằng tiếng Urdu và tiếng Anh cho lễ Nikkah, Mehndi và tiệc Walima.",
      sw: "Mifano ya maneno ya kadi za harusi za Nikkah na Walima kwa Kiingereza na Urdu ikiwa na aya za Qur'ani Tukufu."
    }
  }
};

console.log("Dictionary framework created.");
