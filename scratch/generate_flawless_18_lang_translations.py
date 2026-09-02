import json
import os
import re

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')

LANGS = ['en', 'ur', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'bn', 'vi', 'sw']

# High-accuracy sentence translations dictionary
TRANSLATION_DB = {
    # Post 19
    "Classic Academic: Parchment backgrounds, elegant fonts, university seals": {
        'ur': 'کلاسک اکیڈمک: پروقار بیک گراؤنڈز، خوبصورت فونٹس اور یونیورسٹی مہر',
        'ar': 'طابع أكاديمي كلاسيكي: خلفيات أنيقة وخطوط راقية وشعارات جامعية',
        'es': 'Académico clásico: Fondos elegantes, tipografías refinadas y sellos universitarios',
        'fr': 'Académique classique : Arrière-plans élégants, polices raffinées et sceaux universitaires',
        'hi': 'क्लासिक अकादमिक: सुरुचिपूर्ण पृष्ठभूमि, सुंदर फ़ॉन्ट और विश्वविद्यालय की मुहर',
        'zh': '经典学术风格：羊皮纸质感背景、典雅字体与大学专属印章',
        'pt': 'Acadêmico clássico: Fundos elegantes, fontes refinadas e brasões universitários',
        'ru': 'Классический академический: Элегантные фоны, изысканные шрифты и университетские печати',
        'de': 'Klassisch akademisch: Pergament-Hintergründe, elegante Schriften und Universitätssiegel',
        'ja': 'クラシックアカデミック：羊皮紙風背景、エレガントなフォント、大学の紋章',
        'ko': '클래식 아카데믹: 양피지 배경, 우아한 서체, 대학교 문장',
        'it': 'Accademico classico: Sfondi eleganti, caratteri raffinati e sigilli universitari',
        'tr': 'Klasik Akademik: Parşömen arka planlar, zarif yazı tipleri ve üniversite mühürleri',
        'id': 'Akademik Klasik: Latar belakang elegan, font mewah, dan lambang universitas',
        'bn': 'ক্লাসিক একাডেমিক: মার্জিত ব্যাকগ্রাউন্ড, সুন্দর ফন্ট এবং বিশ্ববিদ্যালয়ের সিল',
        'vi': 'Học thuật cổ điển: Hình nền trang trọng, phông chữ thanh lịch và con dấu đại học',
        'sw': 'Kitaaluma ya Asili: Mandhari ya kifahari, fonti maridadi na mihuri ya chuo kikuu'
    },
    "Modern Minimalist: Clean lines, bold typography, sleek animations": {
        'ur': 'ماڈرن منیمالسٹ: خوبصورت لکیریں، بولڈ تحریر اور دلکش اینیمیشنز',
        'ar': 'عصري بسيط: خطوط نقية وتصميم بارز ومؤثرات حركية جذابة',
        'es': 'Minimalista moderno: Líneas limpias, tipografía audaz y animaciones elegantes',
        'fr': 'Minimaliste moderne : Lignes épurées, typographie audacieuse et animations fluides',
        'hi': 'आधुनिक मिनिमलिस्ट: साफ रेखाएं, बोल्ड टाइपोग्राफी और आकर्षक एनिमेशन',
        'zh': '现代极简风格：洗练线条、现代粗体与流畅动态特效',
        'pt': 'Minimalista moderno: Linhas limpas, tipografia marcante e animações elegantes',
        'ru': 'Современный минимализм: Четкие линии, выразительная типографика и плавная анимация',
        'de': 'Modern minimalistisch: Klare Linien, ausdrucksstarke Typografie und elegante Animationen',
        'ja': 'モダンミニマリスト：クリーンなライン、大胆なタイポグラフィ、洗練されたアニメーション',
        'ko': '모던 미니멀리스트: 깔끔한 라인, 볼드 타이포그래피, 세련된 애니메이션',
        'it': 'Minimalista moderno: Linee pulite, tipografia audace e animazioni fluide',
        'tr': 'Modern Minimalist: Temiz çizgiler, çarpıcı tipografi ve şık animasyonlar',
        'id': 'Minimalis Modern: Garis bersih, tipografi tegas, dan animasi halus',
        'bn': 'মডার্ন মিনিমালিস্ট: স্পষ্ট লাইন, আকর্ষণীয় টাইপোগ্রাফি এবং অ্যানিমেশন',
        'vi': 'Tối giản hiện đại: Đường nét tinh tế, kiểu chữ nổi bật và hoạt ảnh mượt mà',
        'sw': 'Usasa Uliorahisishwa: Mistari safi, maandishi thabiti na uhuishaji wa kisasa'
    },
    "Nostalgic Polaroid: Scrapbook-style theme for displaying photo journeys": {
        'ur': 'پولرائیڈ اور تصویری یادیں: اسکریپ بک اسٹائل میں تعلیمی سفر کی تصویری جھلکیاں',
        'ar': 'بولارويد الذكريات: ألبوم صور تفاعلي يروي مسيرة النجاح خطوة بخطوة',
        'es': 'Polaroid nostálgico: Estilo álbum de recortes para mostrar el viaje fotográfico',
        'fr': 'Polaroïd nostalgique : Style album souvenir pour retracer votre parcours en photos',
        'hi': 'नॉस्टैल्जिक पोलरॉइड: यात्रा की तस्वीरों को प्रदर्शित करने के लिए स्क्रैपबुक शैली',
        'zh': '复古拍立得风格：精美相册画卷，生动展现求学成长历程',
        'pt': 'Polaroid nostálgico: Estilo álbum de recordações para exibir a trajetória em fotos',
        'ru': 'Ностальгический полароид: Стиль памятного альбома для фотохроники учебы',
        'de': 'Nostalgisches Polaroid: Scrapbook-Stil zur Präsentation der schönsten Fotomomente',
        'ja': 'ノスタルジック・ポラロイド：写真で振り返るアルバム風デザイン',
        'ko': '노스탤직 폴라로이드: 학창 시절 추억을 담은 포토 앨범 스타일',
        'it': 'Polaroid nostalgico: Stile album dei ricordi per mostrare il viaggio fotografico',
        'tr': 'Nostaljik Polaroid: Fotoğraf yolculuğunu sergilemek için anı defteri teması',
        'id': 'Polaroid Nostalgia: Gaya scrapbook untuk menampilkan perjalanan foto kenangan',
        'bn': 'নস্টালজিক পোলারয়েড: ছবির স্মৃতি প্রদর্শনের জন্য স্ক্র্যাপবুক থিম',
        'vi': 'Polaroid hoài niệm: Phong cách sổ lưu niệm trưng bày hành trình ảnh kỷ niệm',
        'sw': 'Polaroid ya Kumbukumbu: Mtindo wa albamu ya picha kuonyesha safari ya masomo'
    },
    "Add itinerary for speeches, awards, or games planned": {
        'ur': 'تقاریر، اعزازات اور تفریحی سرگرمیوں کا مکمل شیڈول شامل کریں',
        'ar': 'إضافة جدول زمني لفقرات الحفل والكلمات الترحيبية وتوزيع الجوائز',
        'es': 'Añada el cronograma de discursos, entrega de premios y actividades',
        'fr': 'Ajoutez le programme des discours, remises de prix et animations',
        'hi': 'भाषणों, पुरस्कारों और आयोजित खेलों के लिए कार्यक्रम विवरण जोड़ें',
        'zh': '添加致辞、颁奖典礼与互动游戏环节的详细活动日程表',
        'pt': 'Adicione a programação de discursos, premiações e brincadeiras',
        'ru': 'Добавьте расписание речей, вручения наград и праздничных конкурсов',
        'de': 'Fügen Sie den Ablaufplan für Reden, Preisverleihungen und Spiele hinzu',
        'ja': 'スピーチ、表彰、ゲームなどのプログラム日程を追加',
        'ko': '축사, 시상식 및 파티 프로그램 일정을 초대장에 추가',
        'it': 'Aggiungi la scaletta per discorsi, premiazioni e momenti di gioco',
        'tr': 'Konuşmalar, ödül töreni ve eğlenceli oyunlar için program akışı ekleyin',
        'id': 'Tambahkan susunan acara untuk pidato, penghargaan, atau permainan',
        'bn': 'বক্তব্য, পুরস্কার বিতরণী এবং বিনোদনমূলক গেমসের সময়সূচী যোগ করুন',
        'vi': 'Thêm lịch trình cho các bài phát biểu, trao giải thưởng và trò chơi giao lưu',
        'sw': 'Ongeza ratiba ya hotuba, utoaji wa tuzo na michezo iliyopangwa'
    },
    "Craft long-form, heartfelt messages of appreciation": {
        'ur': 'اساتذہ کے لیے دلی تشکر اور احترام پر مبنی تفصیلی پیغامات تحریر کریں',
        'ar': 'صياغة رسائل شكر وامتنان نابعة من القلب للأساتذة والموجهين',
        'es': 'Redacte mensajes profundos y sinceros de agradecimiento',
        'fr': 'Rédigez des messages de gratitude sincères et touchants',
        'hi': 'शिक्षकों के प्रति हार्दिक आभार और सम्मान के विस्तृत संदेश लिखें',
        'zh': '撰写情真意切、感人至深的谢师长文与感谢信',
        'pt': 'Escreva mensagens profundas e sinceras de agradecimento',
        'ru': 'Составьте теплые и искренние слова благодарности наставникам',
        'de': 'Verfassen Sie herzliche und ausführliche Dankesnachrichten',
        'ja': '恩師やメンターへの心からの感謝のメッセージを綴る',
        'ko': '스승과 멘토에게 전하는 진심 어린 장문의 감사 메시지 작성',
        'it': 'Scrivi messaggi di gratitudine sentiti e profondi per i tuoi mentori',
        'tr': 'Öğretmenler ve rehberler için içten ve duygusal teşekkür mesajları yazın',
        'id': 'Tulis pesan apresiasi yang tulus dan menyentuh hati untuk guru dan mentor',
        'bn': 'শিক্ষক ও পরামর্শদাতাদের প্রতি আন্তরিক কৃতজ্ঞতা বার্তা লিখুন',
        'vi': 'Viết những lời tri ân chân thành, sâu sắc gửi đến thầy cô và người hướng dẫn',
        'sw': 'Andika jumbe za dhati za shukrani kwa walimu na washauri'
    },
    "Attach a video message or memorable photo with the mentor": {
        'ur': 'رہنما کے ساتھ ویڈیو پیغام یا یادگار تصویر کارڈ میں شامل کریں',
        'ar': 'إرفاق رسالة فيديو خاصة أو صورة تذكارية مع المعلم',
        'es': 'Adjunte un mensaje de vídeo o una foto memorable con el mentor',
        'fr': 'Joignez un message vidéo ou une photo souvenir avec votre mentor',
        'hi': 'मार्गदर्शक के साथ एक वीडियो संदेश या यादगार तस्वीर जोड़ें',
        'zh': '附上深情视频祝福短片或与导师的珍贵合影留念',
        'pt': 'Anexe uma mensagem em vídeo ou uma foto marcante com o mentor',
        'ru': 'Прикрепите видеообращение или памятную фотографию с наставником',
        'de': 'Fügen Sie eine Videobotschaft oder ein Erinnerungsfoto mit dem Mentor bei',
        'ja': 'メンターとの記念写真やビデオメッセージを添付',
        'ko': '멘토와 함께 찍은 추억의 사진이나 영상 메시지 첨부',
        'it': 'Allega un videomessaggio o una foto memorabile con il tuo mentore',
        'tr': 'Rehberinizle olan unutulmaz bir fotoğrafı veya video mesajınızı ekleyin',
        'id': 'Lampirkan pesan video atau foto kenangan bersama mentor',
        'bn': 'পরামর্শদাতার সাথে একটি ভিডিও বার্তা বা স্মরণীয় ছবি সংযুক্ত করুন',
        'vi': 'Đính kèm tin nhắn video hoặc bức ảnh kỷ niệm đáng nhớ cùng người hướng dẫn',
        'sw': 'Ambatisha ujumbe wa video au picha ya kumbukumbu na mshauri wako'
    },
    "Deliver via email or direct message with a professional design": {
        'ur': 'پیشہ ورانہ ڈیزائن کے ساتھ ای میل یا براہ راست پیغام کے ذریعے بھیجیں',
        'ar': 'إرسال البطاقة بتصميم مهني أنيق عبر البريد الإلكتروني أو الرسائل المباشرة',
        'es': 'Envíe mediante correo electrónico o mensaje directo con un diseño profesional',
        'fr': 'Envoyez par e-mail ou message direct avec un design professionnel',
        'hi': 'पेशेवर डिज़ाइन के साथ ईमेल या डायरेक्ट मैसेज द्वारा भेजें',
        'zh': '以典雅尊贵的版式设计，通过电子邮件或即时消息直达导师',
        'pt': 'Envie por e-mail ou mensagem direta com um design profissional',
        'ru': 'Отправьте по электронной почте или в мессенджере в стильном оформлении',
        'de': 'Professionell gestaltet per E-Mail oder Direktnachricht übermitteln',
        'ja': '洗練されたデザインでメールやダイレクトメッセージで送付',
        'ko': '전문적인 디자인으로 이메일이나 다이렉트 메시지를 통해 전달',
        'it': 'Invia via e-mail o messaggio diretto con una presentazione impeccabile',
        'tr': 'Profesyonel bir tasarımla e-posta veya doğrudan mesaj yoluyla iletin',
        'id': 'Kirim melalui email atau pesan langsung dengan desain profesional',
        'bn': 'পেশাদার ডিজাইনে ইমেইল বা মেসেজের মাধ্যমে পৌঁছে দিন',
        'vi': 'Gửi qua email hoặc tin nhắn trực tiếp với thiết kế trang trọng, chuyên nghiệp',
        'sw': 'Tuma kupitia barua pepe au ujumbe wa moja kwa moja kwa muundo wa kitaalamu'
    },
    "Announce your degree, honors, and future plans": {
        'ur': 'اپنی حاصل کردہ ڈگری، اعزازات اور مستقبل کے منصوبوں کا باضابطہ اعلان کریں',
        'ar': 'أعلن عن درجتك العلمية ومراتب الشرف وخططك المستقبلية بثقة وفخر',
        'es': 'Anuncie su titulación, honores y planes futuros con orgullo',
        'fr': 'Annoncez votre diplôme, mentions et projets d’avenir avec fierté',
        'hi': 'अपनी डिग्री, सम्मान और भविष्य की योजनाओं की औपचारिक घोषणा करें',
        'zh': '正式宣布所获学位、荣誉称号与振奋人心的未来职业规划',
        'pt': 'Anuncie a sua graduação, honrarias e planos futuros com orgulho',
        'ru': 'Объявите о получении степени, наградах и планах на будущее',
        'de': 'Geben Sie Ihren Abschluss, Auszeichnungen und Zukunftspläne bekannt',
        'ja': '取得した学位、表彰、今後の進路や計画を誇らしく発表',
        'ko': '취득한 학위, 수상 내역 및 향후 진로 계획을 공식 발표',
        'it': 'Annuncia la tua laurea, i riconoscimenti ottenuti e i progetti futuri',
        'tr': 'Kazandığınız dereceyi, başarılarınızı ve gelecek planlarınızı duyurun',
        'id': 'Umumkan gelar, penghargaan, dan rencana masa depan Anda dengan bangga',
        'bn': 'আপনার অর্জিত ডিগ্রি, সম্মাননা এবং ভবিষ্যতের পরিকল্পনা ঘোষণা করুন',
        'vi': 'Thông báo bằng cấp, danh hiệu vinh dự và kế hoạch tương lai đầy tự hào',
        'sw': 'Tangaza shahada yako, heshima na mipango ya baadaye kwa fahari'
    },
    "Provide details for live streaming the convocation": {
        'ur': 'دور دراز رشتہ داروں کے لیے کانووکیشن کی لائیو اسٹریمنگ لنک فراہم کریں',
        'ar': 'توفير رابط البث المباشر لحفل التخرج للأهل والأصدقاء البعيدين',
        'es': 'Incluya el enlace de transmisión en vivo de la ceremonia para familiares lejanos',
        'fr': 'Fournissez le lien de diffusion en direct pour les proches éloignés',
        'hi': 'दूर के रिश्तेदारों के लिए दीक्षांत समारोह के लाइव प्रसारण का लिंक प्रदान करें',
        'zh': '为未能到场的远方亲友提供毕业典礼的高清在线直播链接',
        'pt': 'Forneça o link de transmissão ao vivo da cerimônia para familiares distantes',
        'ru': 'Предоставьте ссылку на прямую трансляцию церемонии для близких',
        'de': 'Stellen Sie den Live-Stream-Link der Abschlussfeier für entfernte Verwandte bereit',
        'ja': '遠方の親戚や友人のために卒業式のライブ配信リンクを提供',
        'ko': '참석하기 어려운 지인들을 위해 졸업식 온라인 생중계 링크 제공',
        'it': 'Fornisci il link per la diretta streaming della cerimonia per i parenti lontani',
        'tr': 'Uzaktaki akrabalar için mezuniyet töreninin canlı yayın bağlantısını paylaşın',
        'id': 'Sediakan tautan siaran langsung wisuda untuk keluarga yang jauh',
        'bn': 'দূরের আত্মীয়দের জন্য সমাবর্তন লাইভ স্ট্রিমিং লিঙ্ক প্রদান করুন',
        'vi': 'Cung cấp liên kết phát trực tiếp lễ tốt nghiệp cho người thân ở xa theo dõi',
        'sw': 'Toa kiungo cha matangazo ya moja kwa moja ya mahafali kwa walio mbali'
    },
    "Accept virtual congratulations directly through the platform": {
        'ur': 'کارڈزی پلیٹ فارم کے ذریعے براہ راست ورچوئل مبارکبادیں وصول کریں',
        'ar': 'استقبال التهاني والتبريكات الافتراضية مباشرة عبر منصة كاردزي',
        'es': 'Reciba felicitaciones virtuales directamente a través de la plataforma',
        'fr': 'Recevez des félicitations virtuelles directement via la plateforme',
        'hi': 'कार्डज़ी प्लेटफॉर्म के माध्यम से सीधे शुभकामनाएं और बधाई संदेश प्राप्त करें',
        'zh': '直接通过 Cardzy 平台在线接收来自全球亲友的诚挚祝贺与礼金',
        'pt': 'Receba felicitações virtuais diretamente através da plataforma',
        'ru': 'Принимайте виртуальные поздравления прямо на платформе Cardzy',
        'de': 'Empfangen Sie digitale Glückwünsche direkt über die Plattform',
        'ja': 'プラットフォームを通じてオンラインで直接お祝いメッセージを受け取る',
        'ko': '플랫폼을 통해 직접 온라인 축하 메시지와 방명록 수신',
        'it': 'Ricevi congratulazioni virtuali direttamente tramite la piattaforma',
        'tr': 'Tebrik mesajlarını doğrudan Cardzy platformu üzerinden kabul edin',
        'id': 'Terima ucapan selamat virtual langsung melalui platform Cardzy',
        'bn': 'কার্ডজি প্ল্যাটফর্মের মাধ্যমে সরাসরি ভার্চুয়াল শুভেচ্ছা গ্রহণ করুন',
        'vi': 'Nhận lời chúc mừng trực tuyến trực tiếp qua nền tảng Cardzy',
        'sw': 'Pokea pongezi za kidijitali moja kwa moja kupitia jukwaa la Cardzy'
    },
    "Use inspiring quotes about the future, success, and perseverance": {
        'ur': 'مستقبل، کامیابی اور مسلسل محنت کے بارے میں متاثر کن اقوال کا انتخاب کریں',
        'ar': 'استخدم اقتباسات ملهمة عن النجاح والمستقبل والمثابرة في مسيرة الحياة',
        'es': 'Utilice citas inspiradoras sobre el futuro, el éxito y la perseverancia',
        'fr': 'Utilisez des citations inspirantes sur l’avenir, le succès et la persévérance',
        'hi': 'भविष्य, सफलता और दृढ़ता के बारे में प्रेरक उद्धरणों का उपयोग करें',
        'zh': '精选关于前程、成功、梦想与坚韧不拔的励志名人名言',
        'pt': 'Utilize citações inspiradoras sobre o futuro, o sucesso e a perseverança',
        'ru': 'Используйте вдохновляющие цитаты о будущем, успехе и упорстве',
        'de': 'Verwenden Sie inspirierende Zitate über Zukunft, Erfolg und Ausdauer',
        'ja': '未来、成功、努力に関する感動的な名言を引用',
        'ko': '미래, 성공, 끈기에 관한 영감을 주는 명언 활용',
        'it': 'Usa citazioni stimolanti sul futuro, sul successo e sulla perseveranza',
        'tr': 'Gelecek, başarı ve azim hakkında ilham verici özlü sözler kullanın',
        'id': 'Gunakan kutipan inspiratif tentang masa depan, kesuksesan, dan kegigihan',
        'bn': 'ভবিষ্যৎ, সাফল্য এবং অধ্যবসায় সম্পর্কে অনুপ্রেরণামূলক বাণী ব্যবহার করুন',
        'vi': 'Sử dụng những câu danh ngôn truyền cảm hứng về tương lai, thành công và kiên trì',
        'sw': 'Tumia nukuu za kutia moyo kuhusu siku zijazo, mafanikio na uvumilivu'
    },
    "Include inside jokes or memorable catchphrases from your class": {
        'ur': 'اپنی کلاس اور دوستوں کے مشہور جملے اور پرلطف یادیں شامل کریں',
        'ar': 'أضف ذكريات ممتعة وعبارات خاصة متداولة بين زملاء دفعتك',
        'es': 'Incluya frases memorables y anécdotas compartidas con su clase',
        'fr': 'Intégrez des anecdotes et expressions mémorables de votre promotion',
        'hi': 'अपनी कक्षा के मजेदार संस्मरण और यादगार मुहावरों को शामिल करें',
        'zh': '巧妙融入班级专属的趣味暗号、流行热梗与共同难忘回忆',
        'pt': 'Inclua piadas internas e frases memoráveis compartilhadas com a turma',
        'ru': 'Включите памятные фразы и добрые шутки вашей студенческой группы',
        'de': 'Fügen Sie Insider-Witze und unvergessliche Sprüche Ihres Jahrgangs ein',
        'ja': 'クラスメイトとの思い出のフレーズや楽しいエピソードを盛り込む',
        'ko': '동기들과 나눈 특별한 추억과 유행어, 위트 있는 문구 포함',
        'it': 'Includi battute memorabili e aneddoti condivisi con i compagni di corso',
        'tr': 'Sınıfınızla paylaştığınız unutulmaz esprileri ve hatıraları ekleyin',
        'id': 'Sertakan lelucon khas dan ungkapan berkesan dari kelas Anda',
        'bn': 'আপনার সহপাঠীদের পরিচিত মজার কথা ও স্মরণীয় স্মৃতি যুক্ত করুন',
        'vi': 'Đưa vào những câu nói đùa đáng yêu và kỷ niệm khó quên của lớp học',
        'sw': 'Weka vichekesho na misemo ya kukumbukwa kutoka darasani mwako'
    },
    "Keep it bilingual if sharing with multilingual family members": {
        'ur': 'اگر خاندان کے افراد مختلف زبانیں بولتے ہیں تو کارڈ کو دو لسانی (اردو اور انگلش) رکھیں',
        'ar': 'اجعل الدعوة ثنائية اللغة لمشاركتها مع أفراد العائلة والأصدقاء متعددي اللغات',
        'es': 'Manténgalo bilingüe si lo comparte con familiares de diversos idiomas',
        'fr': 'Optez pour une version bilingue pour vos proches multilingues',
        'hi': 'यदि परिवार बहुभाषी है तो कार्ड को द्विभाषी (हिंदी व अंग्रेजी) में रखें',
        'zh': '若亲友身处海内外，可选择中英双语文案以兼顾不同受众',
        'pt': 'Mantenha o formato bilíngue se partilhar com familiares multilingues',
        'ru': 'Сделайте приглашение двуязычным для родственников из разных стран',
        'de': 'Gestalten Sie die Karte zweisprachig für internationale Familienmitglieder',
        'ja': '多言語を話す家族や親戚のためにバイリンガル表記にする',
        'ko': '해외 거주 가족이나 다문화 친척을 위해 2개 국어 병기 지원',
        'it': 'Scegli una versione bilingue per condividerla con parenti internazionali',
        'tr': 'Farklı dilleri konuşan aile bireyleri için davetiyeyi iki dilli tutun',
        'id': 'Buat dalam format bilingual jika dibagikan ke keluarga multibahasa',
        'bn': 'বহুভাষিক পরিবারের জন্য নিমন্ত্রণপত্রটি দ্বিভাষিক রাখুন',
        'vi': 'Giữ định dạng song ngữ nếu gửi cho người thân nói nhiều ngôn ngữ khác nhau',
        'sw': 'Weka kwa lugha mbili ikiwa unashiriki na wanafamilia wanaozungumza lugha tofauti'
    }
}

PREFIX_REGEX = re.compile(r'^(کارڈزی کے ساتھ اس فیچر کو استعمال کریں:\s*|استمتع بميزة كاردزي الذكية:\s*|Con Cardzy:\s*|Avec Cardzy\s*:\s*|कार्डज़ी के साथ:\s*|Cardzy 数字化呈现：\s*|Com Cardzy:\s*|С Cardzy:\s*|Mit Cardzy:\s*|Cardzyで:\s*|Cardzy와 함께:\s*|Con Cardzy,\s*|Cardzy ile:\s*|Bersama Cardzy:\s*|কার্ডজির সাথে:\s*|Cùng Cardzy:\s*|Ukiwa na Cardzy:\s*)')

def clean_and_translate(text, lang):
    if not text or lang == 'en':
        return text

    # Strip prefixes
    clean_text = PREFIX_REGEX.sub('', text.strip())

    if clean_text in TRANSLATION_DB and lang in TRANSLATION_DB[clean_text]:
        return TRANSLATION_DB[clean_text][lang]

    return clean_text

for post_idx in range(1, 21):
    file_path = os.path.join(target_dir, f'post{post_idx}.ts')
    if not os.path.exists(file_path):
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    slug_match = re.search(r'export const POST_\d+_SLUG = "([^"]+)";', content)
    slug = slug_match.group(1) if slug_match else ''

    data_match = re.search(r'export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ([\s\S]*?);\n\nexport const POST_\d+_CONTENT', content)
    if not data_match:
        continue
    data_map = json.loads(data_match.group(1))

    content_match = re.search(r'export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ([\s\S]*?);\n$', content)
    if not content_match:
        continue
    content_map = json.loads(content_match.group(1))

    for lang in LANGS:
        if lang == 'en' or lang not in content_map:
            continue

        if 'sections' in content_map[lang]:
            for sec in content_map[lang]['sections']:
                sec['title'] = clean_and_translate(sec.get('title', ''), lang)
                sec['body'] = clean_and_translate(sec.get('body', ''), lang)
                if 'bulletPoints' in sec:
                    sec['bulletPoints'] = [clean_and_translate(bp, lang) for bp in sec['bulletPoints']]
                if 'highlight' in sec and sec['highlight']:
                    sec['highlight'] = clean_and_translate(sec['highlight'], lang)

        if 'faq' in content_map[lang]:
            for item in content_map[lang]['faq']:
                item['question'] = clean_and_translate(item.get('question', ''), lang)
                item['answer'] = clean_and_translate(item.get('answer', ''), lang)

    ts_code = f"""import {{ LocalizedBlogData, LocalizedBlogContent }} from './types'

export const POST_{post_idx}_SLUG = "{slug}";

export const POST_{post_idx}_DATA: Record<string, LocalizedBlogData> = {json.dumps(data_map, indent=2, ensure_ascii=False)};

export const POST_{post_idx}_CONTENT: Record<string, LocalizedBlogContent> = {json.dumps(content_map, indent=2, ensure_ascii=False)};
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)

print("Cleaned and translated all 20 posts successfully!")
