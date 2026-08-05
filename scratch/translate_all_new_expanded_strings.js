const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

// Comprehensive translation map for all newly added strings
const NEW_STRINGS_MAP = {
  // Body expansion string
  " Furthermore, incorporating personalized digital cards on Cardzy provides a seamless experience for your guests with real-time updates, direct GPS directions, interactive RSVP buttons, and festive background audio.": {
    ur: " علاوہ ازیں، کارڈزی پر ذاتی ڈیجیٹل کارڈز کا استعمال آپ کے مہمانوں کو ایک شاندار تجربہ فراہم کرتا ہے جس میں فوری اپ ڈیٹس، گوگل میپس کی ڈائریکشنز، واٹس ایپ آر ایس وی پی اور بیک گراؤنڈ میوزک شامل ہیں۔",
    es: " Además, la incorporación de tarjetas digitales personalizadas en Cardzy ofrece una experiencia perfecta para sus invitados con actualizaciones en tiempo real, indicaciones por GPS, botones de RSVP interactivos y música de fondo festiva.",
    fr: " De plus, l'intégration de cartes numériques personnalisées sur Cardzy offre une expérience fluide à vos invités grâce aux mises à jour en temps réel, aux itinéraires GPS, aux boutons RSVP interactifs et à la musique de fond.",
    ar: " بالإضافة إلى ذلك، يمنحك استخدام البطاقات الرقمية المخصصة عبر كاردزي تجربة سلسة لضيوفك مع التحديثات المباشرة، اتجاهات الخريطة، أزرار تأكيد الحضور، والموسيقى الاحتفالية.",
    hi: " इसके अलावा, कार्डज़ी पर व्यक्तिगत डिजिटल कार्ड को शामिल करने से आपके मेहमानों को वास्तविक समय के अपडेट, सीधे जीपीएस दिशा-निर्देश, इंटरैक्टिव आरएसवीपी बटन और उत्सव पृष्ठभूमि संगीत के साथ एक सहज अनुभव मिलता है।",
    zh: " 此外，在 Cardzy 上嵌入个性化电子请柬，更能借助实时动态更新、精准 GPS 地图导航、交互式 RSVP 回执按键及欢快背景音乐，为您的宾客缔造无与伦比的完美体验。",
    pt: " Além disso, a incorporação de cartões digitais personalizados no Cardzy oferece uma experiência perfeita para os seus convidados com atualizações em tempo real, direções GPS, botões RSVP e música de fundo.",
    ru: " Кроме того, использование персональных цифровых открыток на Cardzy обеспечивает вашим гостям максимальный комфорт благодаря обновлениям в реальном времени, GPS-навигации, кнопкам RSVP и праздничной музыке.",
    de: " Darüber hinaus bietet die Integration personalisierter digitaler Karten auf Cardzy Ihren Gästen ein nahtloses Erlebnis mit Echtzeit-Updates, GPS-Wegbeschreibungen, interaktiven RSVP-Buttons und festlicher Hintergrundmusik.",
    ja: " さらに、Cardzyでパーソナライズされたデジタルカードを導入すると、リアルタイム更新、GPSナビゲーション、対話型RSVPボタン、BGMにより、ゲストに素晴らしい体験を提供できます。",
    ko: " 또한, Cardzy에서 맞춤형 디지털 카드를 사용하면 실시간 업데이트, GPS 길 안내, 인터랙티브 RSVP 버튼, 축하 배경 음악을 통해 하객들에게 완벽한 경험을 선사할 수 있습니다.",
    it: " Inoltre, l'integrazione di biglietti digitali personalizzati su Cardzy offre un'esperienza impeccabile ai tuoi ospiti con aggiornamenti in tempo reale, indicazioni GPS, pulsanti RSVP e musica di sottofondo.",
    tr: " Ayrıca, Cardzy'de kişiselleştirilmiş dijital davetiyeler kullanmak, canlı güncellemeler, GPS harita yönlendirmeleri, etkileşimli LCV butonları ve arka plan müziği ile davetlilerinize kusursuz bir deneyim sunar.",
    id: " Selain itu, menyertakan kartu digital kustom di Cardzy memberikan pengalaman luar biasa bagi tamu Anda dengan pembaruan langsung, petunjuk GPS, tombol RSVP interaktif, dan musik latar.",
    bn: " علاوه بر این، কার্ডজিতে কাস্টমাইজড ডিজিটাল কার্ড ব্যবহার করা আপনার অতিথিদের রিয়েল-টাইম আপডেট, গুগল ম্যাপস দিকনির্দেশনা, হোয়াটসঅ্যাপ আরএসভিপি এবং ব্যাকগ্রাউন্ড মিউজিক সহ চমৎকার অভিজ্ঞতা প্রদান করে।",
    vi: " Ngoài ra, việc kết hợp thiệp kỹ thuật số tùy chỉnh trên Cardzy mang lại trải nghiệm tuyệt vời cho khách mời với cập nhật thời gian thực, chỉ đường GPS, nút RSVP và nhạc nền sinh động.",
    sw: " Zaidi ya hayo, kutumia kadi za kidijitali za Cardzy kunatoa uzoefu mzuri kwa wageni wako ukiwa na sasisho za papo hapo, maelekezo ya GPS, vifungo vya RSVP na muziki wa usuli."
  },

  // Bullet point 1
  "Real-time instant updates without re-printing fees or delivery delays": {
    ur: "پرنٹنگ کے اخراجات یا تاخیر کے بغیر لائیو اپ ڈیٹس",
    es: "Actualizaciones instantáneas en tiempo real sin costes de reimpresión ni retrasos",
    fr: "Mises à jour instantanées en temps réel sans frais de réimpression ni délais",
    ar: "تحديثات مباشرة ومستمرة دون تكاليف إعادة طباعة أو تأخير في التوصيل",
    hi: "बिना किसी पुनर्मुद्रण शुल्क या वितरण में देरी के वास्तविक समय में त्वरित अपडेट",
    zh: "无需支付额外重印费用与邮寄等待，轻松享受实时一键修改与动态更新",
    pt: "Atualizações instantâneas em tempo real sem custos de reimpressão ou atrasos",
    ru: "Мгновенные обновления в реальном времени без расходов на перепечатку и задержек",
    de: "Sofortige Echtzeit-Updates ohne Nachdruckkosten oder Lieferverzögerungen",
    ja: "再印刷費用や配送の遅延なしに、リアルタイムで即座に情報を更新",
    ko: "재인쇄 비용이나 배송 지연 없이 실시간으로 즉시 업데이트 가능",
    it: "Aggiornamenti istantanei in tempo reale senza costi di ristampa o ritardi",
    tr: "Yeniden baskı ücreti veya teslimat gecikmesi olmadan canlı güncellemeler",
    id: "Pembaruan langsung secara instan tanpa biaya cetak ulang atau keterlambatan",
    bn: "পুনরায় প্রিন্টিং খরচ বা ডেলিভারি বিলম্ব ছাড়াই রিয়েল-টাইম লাইভ আপডেট",
    vi: "Cập nhật tức thì theo thời gian thực mà không tốn phí in lại hoặc chậm trễ",
    sw: "Sasisho za papo hapo bila gharama za kuchapa tena au kuchelewa kwa utoaji"
  },

  // Bullet point 2
  "Interactive 1-click WhatsApp RSVP confirmation button for hosts": {
    ur: "میزبان کے لیے واٹس ایپ پر ایک کلک میں آر ایس وی پی کی تصدیق",
    es: "Botón interactivo de confirmación RSVP por WhatsApp en 1 clic para anfitriones",
    fr: "Bouton de confirmation RSVP WhatsApp en 1 clic pour les hôtes",
    ar: "زر تأكيد الحضور التفاعلي عبر واتساب بنقرة واحدة للمضيفين",
    hi: "मेजबानों के लिए इंटरैक्टिव 1-क्लिक व्हाट्सएप आरएसवीपी पुष्टि बटन",
    zh: "面向主人的 WhatsApp 交互式一键 RSVP 宾客确认回执按钮",
    pt: "Botão interativo de confirmação RSVP por WhatsApp em 1 clique para anfitriões",
    ru: "Интерактивная кнопка подтверждения RSVP в WhatsApp в 1 клик для хозяев",
    de: "Interaktiver 1-Klick WhatsApp RSVP Bestätigungsbutton für Gastgeber",
    ja: "主催者のためのワンクリック対話型WhatsApp RSVP確認ボタン",
    ko: "주최자를 위한 인터랙티브 1클릭 WhatsApp RSVP 참석 확인 버튼",
    it: "Pulsante di conferma RSVP WhatsApp interattivo in 1 clic per gli ospiti",
    tr: "Davet sahipleri için tek tıkla etkileşimli WhatsApp LCV onay butonu",
    id: "Tombol konfirmasi RSVP WhatsApp 1-klik interaktif untuk tuan rumah",
    bn: "আয়োজকদের জন্য ইন্টারঅ্যাক্টিভ ১-ক্লিক হোয়াটসঅ্যাপ আরএসভিপি বাটন",
    vi: "Nút xác nhận RSVP WhatsApp 1-click tương tác dành cho gia chủ",
    sw: "Kifungo cha uthibitisho wa RSVP wa WhatsApp cha mbofyo 1 kwa waandaaji"
  },

  // Bullet point 3
  "Embedded Google Maps GPS venue navigation link for easy directions": {
    ur: "آسان راستے کے لیے گوگل میپس کا جی پی ایس نیویگیشن لنک",
    es: "Enlace de navegación GPS de Google Maps integrado para direcciones sencillas",
    fr: "Lien de navigation GPS Google Maps intégré pour un itinéraire facile",
    ar: "رابط خريطة موقع جوجل مدمج للتوجيه الجغرافي المباشر وسهولة الوصول",
    hi: "आसान दिशा-निर्देशों के लिए एंबेडेड गूगल मैप्स जीपीएस स्थान लिंक",
    zh: "内置 Google Maps GPS 定位导航链接，为宾客提供极简路线指引",
    pt: "Link de navegação GPS do Google Maps integrado para direções fáceis",
    ru: "Встроенная ссылка на GPS-навигацию Google Карт для легкого поиска venue",
    de: "Integrierter Google Maps GPS-Navigationslink für einfache Anfahrtsbeschreibungen",
    ja: "会場へのスムーズなアクセスを実現するGoogleマップGPSナビゲーションリンク",
    ko: "쉬운 길 안내를 위한 Google 지도 GPS 위치 길안내 링크 포함",
    it: "Link di navigazione GPS Google Maps integrato per indicazioni stradali semplici",
    tr: "Kolay yol tarifi için entegre Google Haritalar GPS konum bağlantısı",
    id: "Tautan navigasi GPS Google Maps yang disematkan untuk petunjuk arah yang mudah",
    bn: "সহজ যোগাযোগের জন্য এমবেড করা গুগল ম্যাপস জিও লোকেশন লিঙ্ক",
    vi: "Liên kết điều hướng GPS Google Maps được tích hợp để chỉ đường dễ dàng",
    sw: "Kiungo cha ramani ya Google Maps GPS kilichowekwa kwa maelekezo rahisi"
  },

  // FAQ 1 Q
  "Can I customize the background music and 3D animations?": {
    ur: "کیا میں بیک گراؤنڈ میوزک اور 3D اینیمیشنز کو حسب ضرورت تبدیل کر سکتا ہوں؟",
    es: "¿Puedo personalizar la música de fondo y las animaciones 3D?",
    fr: "Puis-je personnaliser la musique de fond et les animations 3D ?",
    ar: "هل يمكنني تخصيص الموسيقى الخلفية والمؤثرات المتحركة 3D؟",
    hi: "क्या मैं पृष्ठभूमि संगीत और 3D एनिमेशन को अनुकूलित कर सकता हूं?",
    zh: "我可以自定义背景音乐与 3D 动态特效吗？",
    pt: "Posso personalizar a música de fundo e as animações 3D?",
    ru: "Могу ли я настроить фоновую музыку и 3D-анимацию?",
    de: "Kann ich die Hintergrundmusik und 3D-Animationen anpassen?",
    ja: "BGMや3Dアニメーションをカスタマイズできますか？",
    ko: "배경 음악과 3D 애니메이션을 맞춤 설정할 수 있나요?",
    it: "Posso personalizzare la musica di sottofondo e le animazioni 3D?",
    tr: "Arka plan müziğini ve 3D animasyonları özelleştirebilir miyim?",
    id: "Bisakah saya menyesuaikan musik latar dan animasi 3D?",
    bn: "আমি কি بیک گراؤنڈ মিউজিক এবং ৩ডি অ্যানিমেশন কাস্টমাইজ করতে পারি?",
    vi: "Tôi có thể tùy chỉnh nhạc nền và hiệu ứng hoạt hình 3D không?",
    sw: "Je, ninaweza kubadilisha muziki wa usuli na uhuishaji wa 3D?"
  },

  // FAQ 1 A
  "Yes! Cardzy allows you to select custom festive tracks, animated gold foil effects, and personalized color palettes to match your event theme perfectly.": {
    ur: "جی ہاں! کارڈزی آپ کو اپنی تقریب کے تھیم کے مطابق خصوصی میوزک، گولڈ اینیمیشنز اور کلر تھیمز منتخب کرنے کی اجازت دیتا ہے۔",
    es: "¡Sí! Cardzy le permite seleccionar pistas festivas personalizadas, efectos de pan de oro animados y paletas de colores para adaptarse a su tema.",
    fr: "Oui ! Cardzy vous permet de choisir des musiques festives, des effets dorés animés et des palettes de couleurs adaptées à votre thème.",
    ar: "نعم! يتيح لك كاردزي اختيار مقاطع موسيقية خاصة ومؤثرات ذهبية متحركة وألوان مخصصة لتناسب ثيم مناسبتك تماماً.",
    hi: "हाँ! कार्डज़ी आपको अपने इवेंट थीम से पूरी तरह मेल खाने वाले कस्टम फेस्टिव ट्रैक, एनिमेटेड गोल्ड फ़ॉइल प्रभाव और रंग पैलेट चुनने की अनुमति देता है।",
    zh: "当然可以！Cardzy 允许您自由挑选节日欢快曲目、精致烫金流光特效及专属主题色彩配色，完美契合您的活动主题。",
    pt: "Sim! O Cardzy permite selecionar faixas festivas personalizadas, efeitos de folha de ouro e paletas de cores para combinar com o seu tema.",
    ru: "Да! Cardzy позволяет выбирать персональные музыкальные треки, анимированные золотые эффекты и цветовые палитры под тему праздника.",
    de: "Ja! Cardzy ermöglicht es Ihnen, eigene Musikstücke, animierte Goldfolien-Effekte und Farbpaletten auszuwählen, die perfekt zu Ihrem Thema passen.",
    ja: "はい！Cardzyでは、お祝いの音楽、金箔のアニメーション、カラーパレットをテーマに合わせて自由に変更できます。",
    ko: "네! Cardzy에서는 행사 테마에 딱 맞게 맞춤 음악, 애니메이션 골드 포일 효과, 전용 컬러 팔레트를 자유롭게 선택할 수 있습니다.",
    it: "Sì! Cardzy ti consente di selezionare brani festivi personalizzati, effetti dorati animati e tavolozze di colori per adattarsi al tuo tema.",
    tr: "Evet! Cardzy, etkinlik temanıza mükemmel şekilde uyması için özel müzikler, hareketli altın yaldız efektleri ve renk paletleri seçmenize olanak tanır.",
    id: "Ya! Cardzy memungkinkan Anda memilih musik khusus, efek animasi emas, dan palet warna yang sesuai dengan tema acara Anda.",
    bn: "হ্যাঁ! কার্ডজি আপনাকে ইভেন্ট থিমের সাথে মেলে এমন কাস্টম গান, গোল্ড অ্যানিমেশন এবং রঙের থিম নির্বাচন করার সুযোগ দেয়।",
    vi: "Có chứ! Cardzy cho phép bạn chọn nhạc ăn mừng, hiệu ứng mạ vàng hoạt hình và phối màu phù hợp với chủ đề sự kiện của bạn.",
    sw: "Ndiyo! Cardzy inakuruhusu kuchagua nyimbo, athari za dhahabu na rangi zinazolingana kabisa na sherehe yako."
  },

  // FAQ 2 Q
  "How do guests access the digital card link?": {
    ur: "مہمان ڈیجیٹل کارڈ کے لنک تک کیسے رسائی حاصل کرتے ہیں؟",
    es: "¿Cómo acceden los invitados al enlace de la tarjeta digital?",
    fr: "Comment les invités accèdent-ils au lien de la carte numérique ?",
    ar: "كيف يصل الضيوف إلى رابط البطاقة الرقمية؟",
    hi: "मेहमान डिजिटल कार्ड लिंक तक कैसे पहुंच सकते हैं?",
    zh: "宾客该如何访问电子请柬链接？",
    pt: "Como é que os convidados acedem ao link do cartão digital?",
    ru: "Как гости получают доступ к ссылке на цифровую открытку?",
    de: "Wie greifen Gäste auf den Link der digitalen Karte zu?",
    ja: "ゲストはどのようにしてデジタルカードのリンクにアクセスしますか？",
    ko: "하객들은 디지털 카드 링크에 어떻게 접속하나요?",
    it: "Come accedono gli ospiti al link del biglietto digitale?",
    tr: "Davetliler dijital davetiye bağlantısına nasıl erişir?",
    id: "Bagaimana tamu mengakses tautan kartu digital?",
    bn: "অতিথিরা কীভাবে ডিজিটাল কার্ড লিঙ্কটিতে প্রবেশ করবেন?",
    vi: "Khách mời truy cập liên kết thiệp kỹ thuật số bằng cách nào?",
    sw: "Wageni wanapataje kiungo cha kadi ya kidijitali?"
  },

  // FAQ 2 A
  "Guests can open your card instantly by tapping a WhatsApp link or scanning a custom QR code on any smartphone without downloading any application.": {
    ur: "مہمان بغیر کسی ایپ کے اپنے موبائل پر واٹس ایپ لنک پر کلک کر کے یا کیو آر کوڈ اسکین کر کے فوراً کارڈ دیکھ سکتے ہیں۔",
    es: "Los invitados pueden abrir su tarjeta al instante tocando un enlace de WhatsApp o escaneando un código QR en cualquier smartphone sin descargar ninguna app.",
    fr: "Les invités peuvent ouvrir votre carte instantanément en cliquant sur un lien WhatsApp ou en scannant un code QR sans télécharger d'application.",
    ar: "يمكن للضيوف فتح بطاقتك فوراً عبر النقر على رابط الواتساب أو مسح رمز QR على أي هاتف ذكي دون الحاجة لتنزيل أي تطبيق.",
    hi: "मेहमान बिना किसी ऐप को डाउनलोड किए किसी भी स्मार्टफोन पर व्हाट्सएप लिंक पर टैप करके या क्यूआर कोड स्कैन करके तुरंत आपका कार्ड खोल सकते हैं।",
    zh: "宾客无需下载任何 App，只需用手机直接点击 WhatsApp 极速链接或扫描专属二维码，即可瞬间秒开高精电子请柬。",
    pt: "Os convidados podem abrir o seu cartão instantaneamente tocando num link do WhatsApp ou digitalizando um código QR sem descarregar qualquer aplicação.",
    ru: "Гости могут мгновенно открыть вашу открытку, нажав на ссылку в WhatsApp или отсканировав QR-код с любого смартфона без скачивания приложений.",
    de: "Gäste können Ihre Karte sofort öffnen, indem sie auf einen WhatsApp-Link tippen oder einen QR-Code scannen – ganz ohne App-Download.",
    ja: "ゲストはアプリをダウンロードすることなく、WhatsAppリンクをタップするかQRコードをスキャンするだけで即座にカードを開けます。",
    ko: "하객들은 앱을 다운로드할 필요 없이 WhatsApp 링크를 터치하거나 QR 코드를 스캔하여 어떤 스마트폰에서든 즉시 카드를 열 수 있습니다.",
    it: "Gli ospiti possono aprire il tuo biglietto all'istante toccando un link WhatsApp o scansionando un codice QR senza scaricare alcuna applicazione.",
    tr: "Davetliler herhangi bir uygulama indirmeden, WhatsApp bağlantısına tıklayarak veya QR kodunu taratarak davetiyenizi anında açabilir.",
    id: "Tamu dapat membuka kartu Anda secara instan dengan mengetuk tautan WhatsApp atau memindai kode QR tanpa mengunduh aplikasi apa pun.",
    bn: "অতিথিরা কোনো অ্যাপ ডাউনলোড ছাড়াই হোয়াটসঅ্যাপ লিঙ্কে ক্লিক করে বা কিউআর কোড স্ক্যান করে তাৎক্ষণিকভাবে আপনার কার্ডটি খুলতে পারেন।",
    vi: "Khách mời có thể mở thiệp ngay lập tức bằng cách nhấp vào liên kết WhatsApp hoặc quét mã QR trên mọi điện thoại mà không cần tải ứng dụng.",
    sw: "Wageni wanaweza kufungua kadi yako mara moja kwa kubofya kiungo cha WhatsApp au kusoma msimbo wa QR bila kupakua programu yoyote."
  },

  // FAQ 3 Q
  "Can I export the RSVP responses into Excel or CSV?": {
    ur: "کیا میں آر ایس وی پی کے جوابات ایکسل (Excel) یا CSV میں ایکسپورٹ کر سکتا ہوں؟",
    es: "¿Puedo exportar las respuestas de RSVP a Excel o CSV?",
    fr: "Puis-je exporter les réponses RSVP vers Excel ou CSV ?",
    ar: "هل يمكنني تصدير ردود تأكيد الحضور إلى ملف إكسل Excel أو CSV؟",
    hi: "क्या मैं आरएसवीपी प्रतिक्रियाओं को एक्सेल या सीएसवी में निर्यात कर सकता हूं?",
    zh: "我可以将宾客 RSVP 回执数据导出为 Excel 或 CSV 表格吗？",
    pt: "Posso exportar as respostas do RSVP para Excel ou CSV?",
    ru: "Могу ли я экспортировать ответы RSVP в Excel или CSV?",
    de: "Kann ich die RSVP-Antworten nach Excel oder CSV exportieren?",
    ja: "RSVPの回答データをExcelやCSVにエクスポートできますか？",
    ko: "RSVP 하객 회신 데이터를 Excel이나 CSV 파일로 내보낼 수 있나요?",
    it: "Posso esportare le risposte RSVP in Excel o CSV?",
    tr: "LCV yanıtlarını Excel veya CSV dosyasına aktarabilir miyim?",
    id: "Bisakah saya mengekspor tanggapan RSVP ke Excel atau CSV?",
    bn: "আমি কি আরএসভিপি উত্তরগুলি এক্সেল (Excel) বা CSV ফাইলে এক্সপোর্ট করতে পারি?",
    vi: "Tôi có thể xuất câu trả lời RSVP sang Excel hoặc CSV không?",
    sw: "Je, ninaweza kutoa majibu ya RSVP kwenye Excel au CSV?"
  },

  // FAQ 3 A
  "Yes! You can view and download your complete guest headcount and dietary preference list anytime from your Cardzy host dashboard.": {
    ur: "جی ہاں! آپ اپنے کارڈزی ہوسٹ ڈیش بورڈ سے کسی بھی وقت اپنے تمام مہمانوں کی تعداد اور کھانے کی ترجیحات ڈاؤن لوڈ کر سکتے ہیں۔",
    es: "¡Sí! Puede ver y descargar su lista completa de invitados y preferencias de menú en cualquier momento desde su panel de control en Cardzy.",
    fr: "Oui ! Vous pouvez consulter et télécharger la liste complète de vos invités et de leurs préférences alimentaires depuis votre tableau de bord Cardzy.",
    ar: "نعم! يمكنك عرض وتنزيل القائمة الكاملة لعدد الضيوف وتفضيلات الوجبات في أي وقت من لوحة التحكم الخاصة بك على كاردزي.",
    hi: "हाँ! आप अपने कार्डज़ी होस्ट डैशबोर्ड से किसी भी समय अपने संपूर्ण अतिथि संख्या और भोजन प्राथमिकताओं की सूची देख और डाउनलोड कर सकते हैं।",
    zh: "支持！您可以随时登录您的 Cardzy 主人可视化后台，查看并一键下载包含出席人数与饮食偏好的完整 Excel 报表。",
    pt: "Sim! Pode ver e descarregar a sua lista completa de convidados e preferências alimentares a qualquer momento no seu painel de controlo Cardzy.",
    ru: "Да! Вы можете в любое время просмотреть и скачать полный список гостей с количеством участников и предпочтениями по меню в панели управления Cardzy.",
    de: "Ja! Sie können Ihre vollständige Gästeliste mit Personenzahl und Menüwünschen jederzeit über Ihr Cardzy-Dashboard anzeigen und herunterladen.",
    ja: "はい！Cardzyのダッシュボードから、出席人数や食事の希望を含む完全なゲストリストをいつでも確認・ダウンロードできます。",
    ko: "네! Cardzy 호스트 대시보드에서 하객 수와 식사 취향이 담긴 전체 하객 명단을 언제든지 확인하고 다운로드할 수 있습니다.",
    it: "Sì! Puoi visualizzare e scaricare l'elenco completo dei tuoi ospiti e delle preferenze alimentari in qualsiasi momento dalla tua dashboard Cardzy.",
    tr: "Evet! Cardzy davet sahibi panelinizden davetli sayısını ve yemek tercihlerini içeren eksiksiz listenizi istediğiniz zaman görüntüleyebilir ve indirebilirsiniz.",
    id: "Ya! Anda dapat melihat dan mengunduh daftar lengkap jumlah tamu dan preferensi makanan kapan saja dari dasbor tuan rumah Cardzy Anda.",
    bn: "হ্যাঁ! আপনি আপনার কার্ডজি হোস্ট ড্যাশবোর্ড থেকে যেকোনো সময় অতিথিদের সংখ্যা এবং খাবারের পছন্দের তালিকা দেখতে এবং ডাউনলোড করতে পারেন।",
    vi: "Có chứ! Bạn có thể xem và tải xuống danh sách đầy đủ số lượng khách và sở thích ăn uống bất kỳ lúc nào từ bảng điều khiển Cardzy của mình.",
    sw: "Ndiyo! Unaweza kuangalia na kupakua orodha kamili ya wageni na mapendeleo ya chakula wakati wowote kutoka kwenye dashibodi yako ya Cardzy."
  },

  // Conclusion tail
  " Experience the magic of luxury 3D digital cards on Cardzy today and make your celebrations truly unforgettable!": {
    ur: " کارڈزی پر 3D ڈیجیٹل کارڈز کا جادو دیکھیں اور اپنی تقاریب کو یادگار بنائیں۔",
    es: " ¡Experimente la magia de las tarjetas digitales 3D de lujo en Cardzy hoy y haga que sus celebraciones sean inolvidables!",
    fr: " Découvrez la magie des cartes numériques 3D de luxe sur Cardzy dès aujourd'hui et rendez vos fêtes inoubliables !",
    ar: " استمتع بسحر البطاقات الرقمية 3D الفاخرة عبر كاردزي اليوم واجعل مناسباتك لا تُنسى!",
    hi: " आज ही कार्डज़ी पर लक्जरी 3D डिजिटल कार्ड के जादू का अनुभव करें और अपने समारोहों को वास्तव में अविस्मरणीय बनाएं!",
    zh: " 立即在 Cardzy 上立享高奢 3D 电子请柬的绝妙魅力，为您与挚爱的每一个璀璨时刻铸就永恒美好回忆！",
    pt: " Experimente a magia dos cartões digitais 3D de luxo no Cardzy hoje e torne as suas celebrações inesquecíveis!",
    ru: " Испытайте магию роскошных 3D цифровых открыток на Cardzy уже сегодня и сделайте ваши праздники незабываемыми!",
    de: " Erleben Sie noch heute die Magie luxuriöser digitaler 3D-Karten auf Cardzy und machen Sie Ihre Feiern unvergesslich!",
    ja: " 今すぐCardzyで豪華な3Dデジタルカードの魅力を体感し、特別な日を忘れられない思い出にしましょう！",
    ko: " 지금 Cardzy에서 럭셔리 3D 디지털 카드의 마법을 경험하고 특별한 날을 영원히 잊지 못할 추억으로 만드세요!",
    it: " Vivi la magia dei biglietti digitali 3D di lusso su Cardzy oggi e rendi le tue feste davvero indimenticabili!",
    tr: " Bugün Cardzy'de lüks 3D dijital davetiyelerin sihrini yaşayın ve kutlamalarınızı unutulmaz kılın!",
    id: " Rasakan keajaiban kartu digital 3D mewah di Cardzy hari ini dan buat perayaan Anda benar-benar tak terlupakan!",
    bn: " আজই কার্ডজিতে ৩ডি ডিজিটাল কার্ডের অভিজ্ঞতা নিন এবং আপনার অনুষ্ঠানকে স্মরণীয় করে তুলুন!",
    vi: " Trải nghiệm sự kỳ diệu của thiệp kỹ thuật số 3D cao cấp trên Cardzy ngay hôm nay và làm cho lễ kỷ niệm của bạn trở nên khó quên!",
    sw: " Jifunze uzuri wa kadi za kidijitali za 3D kwenye Cardzy leo na ufanye sherehe zako zisisahaulike!"
  }
};

// Process all post files and replace English strings with native equivalents for each language
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');

  Object.keys(NEW_STRINGS_MAP).forEach(engStr => {
    const langMap = NEW_STRINGS_MAP[engStr];
    Object.keys(langMap).forEach(lang => {
      const locStr = langMap[lang];

      // Replace engStr inside the specific lang block in text
      // We look for lang block in JSON string
      const langRegex = new RegExp(`("${lang}":\\s*\\{[\\s\\S]*?\\})`, 'g');
      text = text.replace(langRegex, (match) => {
        return match.split(engStr).join(locStr);
      });
    });
  });

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Translated all new strings in post${fileIdx}.ts`);
});
