const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');

// Dictionaries for intros, section bodies, highlights, FAQs, and conclusions across languages
const INTROS = {
  1: {
    es: "Las bodas en las comunidades islámicas y del sur de Asia son celebraciones sagradas que unen a dos familias en fe y amor. La tarjeta de invitación es la carta de presentación oficial que transmite calidez, respeto y tradición. Esta guía ofrece plantillas bilingües con versículos del Corán y etiquetas de RSVP.",
    fr: "Les mariages dans les communautés islamiques et du sud de l'Asie sont des célébrations sacrées unissant deux familles. La carte d'invitation donne le ton de la cérémonie en exprimant respect et foi. Découvrez dans ce guide des modèles de texte élégants pour Nikkah, Mehndi et Walima.",
    ar: "تعتبر الزفاف والمناسبات في المجتم المجتمعات الإسلامية مناسبات مباركة تجمع القلوب والعائلات. دعوة الزفاف هي أول انطباع يترك أثراً عاطفياً وروحياً لدى الضيوف. يقدم لك هذا الدليل صيغاً راقية لدعوات النكاح والوليمة والحناء بالأردو والإنجليزي والعربية.",
    hi: "पाकिस्तान और दुनिया भर में शादियां दो परिवारों का पवित्र मिलन होती हैं। शादी का कार्ड इस उत्सव की पहली घोषणा होता है। कार्डज़ी आपको उर्दू, हिंदी और अंग्रेजी में बिस्मिल्लाह सुलेख, कुरान की आयतों और आधुनिक टेक्स्ट के साथ डिजिटल कार्ड बनाने की सुविधा देता है।",
    zh: "在巴基斯坦及全球穆斯林社区中，婚礼是神圣而庄严的盛典。婚礼请柬不仅是正式的邀约，更寄托着虔诚的祝福与家族的荣光。本指南为您提供 Nikkah 订婚、Mehndi 欢庆和 Walima 喜宴的双语经典文案范例。",
    de: "Hochzeiten in islamischen Gemeinschaften sind heilige und festliche Anlässe. Die Einladungskarte setzt den Ton für die gesamte Feier und drückt Respekt, Segen und familiäre Freude in Urdu und Englisch aus.",
    ru: "Свадьбы в мусульманских традициях — это священные торжества, объединяющие семьи. Свадебное приглашение задает тон всему празднику, выражая уважение, молитвы и радость на урду и английском языке.",
    tr: "İslami ve geleneksel düğünler iki aileyi sevgi ve inançla birleştiren kutsal törenlerdir. Davetiye kartı, bu mutlu olayın ilk habercisidir. Bu rehber Nikah, Kına ve Düğün için Urduca ve İngilizce davet sözleri sunar.",
    id: "Pernikahan dalam tradisi Islami adalah perayaan suci yang menyatukan dua keluarga. Kartu undangan adalah awal dari perayaan ini yang menyampaikan kehangatan, doa, dan rasa hormat.",
    pt: "Os casamentos nas comunidades islâmicas e do sul da Ásia são celebrações sagradas que unem duas famílias. O cartão de convite transmite respeito, fé e tradição com textos em urdu e inglês.",
    ja: "イスラムおよび南アジアのコミュニティにおいて、結婚式は神圣な祝福の儀式です。招待状はイベント全体の印象を決め、敬意と精神的な祝福を伝えます。",
    ko: "이슬람 및 남아시아 커뮤니티의 결혼식은 두 가문이 믿음과 사랑으로 하나가 되는 성스러운 축제입니다. 초대장은 따뜻함과 축복을 전하는 첫 인사입니다.",
    it: "I matrimoni nelle comunità islamiche sono celebrazioni sacre che uniscono due famiglie. Il biglietto di invito esprime rispetto, fede e gioia in urdu e inglese.",
    bn: "ইসলামিক ও পাকিস্তানি সংস্কৃতিতে বিবাহ দুটি পরিবারের পবিত্র মিলন। একটি মার্জিত নিমন্ত্রণপত্র সম্পূর্ণ অনুষ্ঠানের মর্যাদা প্রকাশ করে।",
    vi: "Đám cưới trong cộng đồng Hồi giáo là lễ kỷ niệm thiêng liêng gắn kết hai gia đình. Thiệp mời thể hiện sự tôn trọng, đức tin và niềm vui.",
    sw: "Harusi katika jamii za Kiislamu ni sherehe takatifu zinazounganisha familia mbili. Kadi ya mwaliko inaeleza heshima, baraka na furaha."
  },
  2: {
    es: "Planificar una boda implica gestionar presupuestos, protocolos y el impacto medioambiental. Las parejas modernas están cambiando las invitaciones tradicionales de papel por webs de invitación digital con seguimiento de confirmación por WhatsApp.",
    fr: "Organiser un mariage nécessite de gérer les budgets, le protocole et l'impact environnemental. Les couples modernes délaissent le papier au profit de sites d'invitation numériques avec suivi RSVP WhatsApp.",
    ar: "تتطلب تخطيط الزفاف إدارة ميزانيات ورعايات وضبط الأثر البيئي. يتجه الأزواج اليوم نحو مواقع الدعوات الرقمية الفاخرة التي توفر تتبع الحضور عبر واتساب.",
    hi: "शादी की योजना बनाने में बजट, मेहमानों की मेजबानी और पर्यावरण पर प्रभाव को प्रबंधित करना शामिल है। आधुनिक जोड़े डिजिटल निमंत्रण वेबसाइटों को अपना रहे हैं।",
    zh: "筹备婚礼需要精打细算、兼顾各方礼节并关注环保。现代新人正加速从传统纸质请柬转向集成 WhatsApp RSVP 的高奢电子请柬网站。",
    de: "Die Hochzeitsplanung erfordert Budgetmanagement und Umweltbewusstsein. Moderne Paare wechseln von Papier zu digitalen Einladungs-Websites mit WhatsApp-RSVP.",
    ru: "Планирование свадьбы требует управления бюджетом и заботы об экологии. Современные пары выбирают цифровые приглашения с отслеживанием ответов в WhatsApp.",
    tr: "Düğün planlaması bütçe yönetimini ve çevreye duyarlılığı gerektirir. Modern çiftler kağıt davetiyeler yerine WhatsApp LCV takipli dijital davetiye sitelerini tercih ediyor.",
    id: "Merencanakan pernikahan melibatkan pengelolaan anggaran dan dampak lingkungan. Pasangan modern beralih ke situs undangan digital dengan pelacakan RSVP WhatsApp.",
    pt: "Planear um casamento exige gerir orçamentos e o impacto ambiental. Os casais modernos trocam o papel por convites digitais com rastreio no WhatsApp.",
    ja: "結婚式の準備には予算管理や環境への配慮が不可欠です。現代のカップルは紙の招待状からWhatsApp RSVP付きのデジタルサイトへ移行しています。",
    ko: "결혼식 준비는 예산 관리와 환경 보호를 동반합니다. 현대 커플들은 종이 청첩장 대신 WhatsApp RSVP 추적이 가능한 디지털 웹사이트를 선택하고 있습니다.",
    it: "Pianificare un matrimonio richiede la gestione del budget e l'attenzione all'ambiente. Le coppie moderne scelgono inviti digitali con tracciamento WhatsApp.",
    bn: "বিয়ের পরিকল্পনায় বাজেট নিয়ন্ত্রণ ও পরিবেশের সুরক্ষা অত্যন্ত গুরুত্বপূর্ণ। আধুনিক দম্পতিরা কাগজের কার্ড ছেড়ে হোয়াটসঅ্যাপ আরএসভিপি সহ ডিজিটাল কার্ড বেছে নিচ্ছেন।",
    vi: "Lên kế hoạch đám cưới đòi hỏi quản lý ngân sách và bảo vệ môi trường. Các cặp đôi hiện đại đang chuyển sang thiệp kỹ thuật số có theo dõi RSVP WhatsApp.",
    sw: "Kupanga harusi kunajumuisha usimamizi wa bajeti na utunzaji wa mazingira. Wanandoa wa sasa wanachagua tovuti za kadi za kidijitali zenye RSVP ya WhatsApp."
  }
};

const CONCLUSIONS = {
  1: {
    es: "Diseñar una invitación de boda auténtica es fácil en Cardzy. Elija su caligrafía Bismillah favorita, personalice el texto y comparta elegantes invitaciones digitales al instante por WhatsApp.",
    fr: "Rédiger un faire-part de mariage authentique est simple sur Cardzy. Choisissez votre calligraphie Bismillah, personnalisez les formules et partagez vos invitations sur WhatsApp.",
    ar: "إنشاء دعوة زفاف إسلامية راقية أمر بغاية السهولة عبر كاردزي. اختر خط البسملة المناسب، وسجل العبارات باللغتين، وشارك الدعوة فوراً عبر واتساب.",
    hi: "कार्डज़ी पर अपने शादी कार्ड्स बनाना बेहद आसान है। बिस्मिल्लाह सुलेख चुनें, पाठ दर्ज करें और व्हाट्सएप पर तुरंत शेयर करें।",
    zh: "在 Cardzy 上轻松设计正宗的穆斯林与巴基斯坦婚礼请柬。挑选您喜爱的 Bismillah 阿拉伯书法，定制双语文案，一键通过 WhatsApp 分享！",
    de: "Das Gestalten einer authentischen Hochzeitseinladung ist auf Cardzy mühelos. Wählen Sie Bismillah-Kalligrafie, passen Sie den Text an und teilen Sie digitale Einladungen sofort via WhatsApp.",
    ru: "Создать оригинальное свадебное приглашение на Cardzy просто. Выберите каллиграфию Бисмилля, настройте текст и отправляйте стильные приглашения через WhatsApp.",
    tr: "Cardzy ile özgün düğün davetiyeleri tasarlamak çok kolay. Besmele hat sanatını seçin, metni düzenleyin ve WhatsApp'tan anında paylaşın.",
    id: "Merancang undangan pernikahan Islami sangat mudah di Cardzy. Pilih kaligrafi Bismillah, sesuaikan teks, dan bagikan undangan digital via WhatsApp.",
    pt: "Criar um convite de casamento autêntico é simples no Cardzy. Escolha a caligrafia Bismillah, personalize o texto e partilhe convites digitais no WhatsApp.",
    ja: "Cardzyで本物の結婚式招待状を簡単に作成。お気に入りのビスミッラー書道を選び、文章をカスタマイズしてWhatsAppで即座に共有しましょう。",
    ko: "Cardzy에서 품격 있는 이슬람 결혼식 초대장을 손쉽게 제작하세요. 비스밀라 서예를 선택하고 문구를 수정하여 WhatsApp으로 즉시 공유하세요.",
    it: "Progettare un invito di nozze autentico è facilissimo su Cardzy. Scegli la calligrafia Bismillah, personalizza i testi e condividi inviti digitali su WhatsApp.",
    bn: "কার্ডজিতে ঐতিহ্যবাহী বিয়ে ও نکاح کارڈ তৈরি করুন সহজে। বিসমিল্লাহ ক্যালিগ্রাফি বেছে নিন এবং হোয়াটসঅ্যাপে নিমন্ত্রণ পাঠাও।",
    vi: "Thiết kế thiệp cưới Hồi giáo chân thực thật dễ dàng trên Cardzy. Chọn thư pháp Bismillah, tùy chỉnh lời chúc và chia sẻ ngay qua WhatsApp.",
    sw: "Kustaajabisha familia yako kwa kadi ya harusi ya Kiislamu ni rahisi kwenye Cardzy. Chagua kaligrafia ya Bismillah na ushiriki kupitia WhatsApp."
  },
  2: {
    es: "Cambiar a invitaciones digitales ahorra dinero, protege el medio ambiente y simplifica la gestión de invitados con confirmaciones por WhatsApp. ¡Pruebe Cardzy hoy!",
    fr: "Passer aux invitations numériques économise votre budget, préserve l'environnement et simplifie le suivi RSVP par WhatsApp. Essayez Cardzy dès aujourd'hui !",
    ar: "الانتقال إلى الدعوات الرقمية يوفر المال ويحمي البيئة ويسهل إدارة الحضور عبر واتساب. جرب كاردزي اليوم!",
    hi: "डिजिटल कार्ड्स का चयन आपके पैसे और पर्यावरण की रक्षा करता है। कार्डज़ी पर आज ही अपना कार्ड बनाएं।",
    zh: "全面拥抱数字电子请柬不仅省钱省心，更能全面提升宾客 RSVP 回执效率与环保体验。立即体验 Cardzy！",
    de: "Der Wechsel zu digitalen Einladungen spart Geld, schützt die Umwelt und vereinfacht das Gästemanagement mit WhatsApp-RSVP. Testen Sie Cardzy noch heute!",
    ru: "Переход на цифровые приглашения экономит деньги, бережет природу и упрощает учет гостей через WhatsApp. Попробуйте Cardzy уже сегодня!",
    tr: "Dijital davetiyelere geçmek bütçenizi korur, doğayı destekler ve WhatsApp LCV takibi ile davetli yönetimini kolaylaştırır. Cardzy'yi bugün deneyin!",
    id: "Beralih ke undangan digital menghemat biaya, menjaga lingkungan, dan mempermudah manajemen tamu via WhatsApp. Coba Cardzy hari ini!",
    pt: "Mudar para convites digitais economiza dinheiro, protege o ambiente e simplifica a gestão de convidados com RSVPs no WhatsApp. Experimente o Cardzy!",
    ja: "デジタル招待状への移行は、費用を削減し、環境を保護し、WhatsApp RSVPでゲスト管理をシンプルにします。今すぐCardzyをお試しください！",
    ko: "디지털 청첩장으로의 전환은 비용을 절감하고, 환경을 보호하며, WhatsApp RSVP로 하객 관리를 간소화합니다. 지금 Cardzy를 경험해보세요!",
    it: "Passare agli inviti digitali risparmia denaro, protegge l'ambiente e semplifica la gestione degli ospiti via WhatsApp. Prova Cardzy oggi!",
    bn: "ডিজিটাল কার্ড গ্রহণ আপনার খরচ বাঁচায়, পরিবেশ রক্ষা করে এবং আরএসভিপি পরিচালনা সহজ করে। আজই কার্ডজি ব্যবহার করুন!",
    vi: "Chuyển sang thiệp mời kỹ thuật số giúp tiết kiệm tiền, bảo vệ môi trường và đơn giản hóa quản lý khách mời qua WhatsApp. Trải nghiệm Cardzy ngay hôm nay!",
    sw: "Kubadilisha kwenda kadi za kidijitali kunahifadhi fedha, kunalinda mazingira na kurahisisha usimamizi wa wageni kwa WhatsApp. Jaribu Cardzy leo!"
  }
};

// Process all post files and inject localized intros & conclusions if missing
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(num => {
  const filePath = path.join(targetDir, `post${num}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  const postIntros = INTROS[num];
  const postConcls = CONCLUSIONS[num];

  if (postIntros) {
    Object.keys(postIntros).forEach(lang => {
      const locIntro = postIntros[lang];
      const introRegex = new RegExp(`("${lang}":\\s*\\{[^}]*?"intro":\\s*")[^"]*(")`, 's');
      if (introRegex.test(text)) {
        text = text.replace(introRegex, `$1${locIntro}$2`);
      }
    });
  }

  if (postConcls) {
    Object.keys(postConcls).forEach(lang => {
      const locConcl = postConcls[lang];
      const conclRegex = new RegExp(`("${lang}":\\s*\\{[^}]*?"conclusion":\\s*")[^"]*(")`, 's');
      if (conclRegex.test(text)) {
        text = text.replace(conclRegex, `$1${locConcl}$2`);
      }
    });
  }

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Updated post${num}.ts intros and conclusions for localized languages.`);
});
