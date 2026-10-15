const fs = require('fs');

const NEW_TEMPLATES = {
  'milestone-birthday': [
    {
      en: "Happy Milestone Birthday! Reaching this monumental chapter is truly special. May the coming years bring you radiant health, boundless wisdom, and endless happiness!",
      ur: "خصوصی سالگرہ مبارک! زندگی کے اس تاریخی سنگِ میل پر پہنچنا بہت بڑا اعزاز ہے۔ اللہ پاک آپ کو لمبی عمر، بہترین صحت اور بے شمار خوشیاں عطا فرمائے۔ آمین۔",
      ar: "عيد ميلاد استثنائي مبارك! الوصول إلى هذه المحطة التاريخية إنجاز يستحق الاحتفال. نسأل الله لك دوام الصحة والعافية والسعادة الدائمة.",
      es: "¡Feliz Cumpleaños de Hito Histórico! Llegar a este gran capítulo es algo extraordinario. ¡Que los próximos años te traigan salud, sabiduría y felicidad!",
      fr: "Joyeux anniversaire pour ce cap marquant ! Atteindre cette étape monumentale est un moment précieux. Santé, sagesse et bonheur pour les années à venir !",
      hi: "इस ऐतिहासिक जन्मदिन के पड़ाव पर हार्दिक शुभकामनाएं! ईश्वर आपको दीर्घायु, उत्तम स्वास्थ्य और अपार खुशियां प्रदान करे।",
      zh: "里程碑生日快乐！迈入这一具有纪念意义的重要人生篇章，愿您在未来的岁月里健康长寿、智慧相伴、幸福无疆！",
      pt: "Feliz Aniversário de Marco Histórico! Alcançar este capítulo especial é maravilhoso. Que os próximos anos tragam saúde e muita felicidade!",
      ru: "С юбилеем! Достижение этого знаменательного рубежа — настоящий праздник. Крепкого здоровья, мудрости и бесконечного счастья на долгие годы!",
      de: "Herzlichen Glückwunsch zu diesem besonderen Meilenstein-Geburtstag! Möge dieses neue Kapitel voller Gesundheit, Weisheit und Freude sein!",
      ja: "人生の特別な節目となるお誕生日、心よりお祝い申し上げます！これからも素晴らしい健康と幸福が続きますように。",
      ko: "인생의 특별한 이정표가 되는 생일을 진심으로 축하합니다! 앞으로의 날들이 건강과 지혜, 끝없는 행복으로 가득하길 기원합니다.",
      it: "Buon compleanno per questo importante traguardo! Raggiungere questa tappa è speciale. Ti auguro salute, saggezza e felicità!",
      tr: "Dönüm noktası doğum günün kutlu olsun! Bu özel yaşa ulaşmak büyük bir mutluluk. Sağlık, bilgelik ve neşe dolu yıllar dilerim!",
      id: "Selamat Ulang Tahun untuk tonggak bersejarah ini! Semoga tahun-tahun mendatang membawa kesehatan, kebijaksanaan, dan kebahagiaan berlimpah!",
      bn: "জীবনের বিশেষ মাইলফলক জন্মদিনে আন্তরিক শুভেচ্ছা! আল্লাহ আপনাকে দীর্ঘায়ু, সুস্বাস্থ্য ও অফুরন্ত আনন্দ দান করুন।",
      vi: "Chúc mừng sinh nhật cột mốc trọng đại! Chúc bạn những năm tháng tới luôn tràn ngập sức khỏe, trí tuệ và hạnh phúc viên mãn!",
      sw: "Heri ya siku ya kuzaliwa ya kihistoria! Kufikia hatua hii ni jambo maalum sana. Mungu akupe afya njema na furaha daima!"
    }
  ],
  'golden-anniversary': [
    {
      en: "Golden Jubilee Mubarak! 50 incredible years of love, devotion, and togetherness. May your beautiful bond continue to inspire everyone around you!",
      ur: "گولڈن جوبلی سالگرہ مبارک! 50 سالہ رفاقت، سچی محبت اور خلوص پر دلی مبارکباد۔ اللہ پاک آپ دونوں کی جوڑی کو سدا سلامت اور خوش و خرم رکھے۔ آمین۔",
      ar: "مبارك اليوبيل الذهبي! خمسون عاماً من المحبة والوفاء والشراكة المباركة. حفظكم الله وأدام المحبة بينكما في خير وسعادة.",
      es: "¡Felices Bodas de Oro! 50 años increíbles de amor, devoción y complicidad. ¡Que su hermoso lazo continúe inspirando a todos!",
      fr: "Joyeuses Noces d'Or ! 50 années exceptionnelles d'amour, de dévouement et de complicité. Que votre union demeure une source d'inspiration !",
      hi: "गोल्डन जुबली शादी की सालगिरह पर हार्दिक बधाई! प्रेम और समर्पण के 50 सुनहरे साल। ईश्वर आपकी जोड़ी को सदा खुशहाल रखे।",
      zh: "金婚五十周年吉庆！半个世纪的风雨同舟、相濡以沫。愿二老的深情厚谊永葆青春、白头偕老！",
      pt: "Felizes Bodas de Ouro! 50 anos incríveis de amor, lealdade e companheirismo. Que a união de vocês continue linda e inspiradora!",
      ru: "С золотой свадьбой! 50 прекрасных лет любви, уважения и взаимопонимания. Пусть ваш союз остается примером истинного счастья!",
      de: "Herzlichen Glückwunsch zur Goldenen Hochzeit! 50 wundervolle Jahre voller Liebe und Verbundenheit. Möge euer Bund weiterhin erstrahlen!",
      ja: "金婚式、誠におめでとうございます！50年という長い歳月を共に歩んでこられた深い絆に、心より敬意と祝福を捧げます。",
      ko: "금혼식을 진심으로 축하드립니다! 50년 동안 서로를 아끼고 사랑해 온 아름다운 동행이 앞으로도 영원히 빛나길 바랍니다.",
      it: "Buone Nozze d'Oro! 50 anni meravigliosi d'amore e dedizione. Che il vostro splendido legame continui a illuminare chi vi circonda!",
      tr: "Altın Yıldönümünüz Kutlu Olsun! 50 yıllık sevgi, sadakat ve birlikteliğiniz her daim ilham vermeye devam etsin!",
      id: "Selamat Ulang Tahun Pernikahan Emas ke-50! Semoga ikatan cinta yang luar biasa ini terus diberkahi dengan kedamaian dan kebahagiaan!",
      bn: "৫০তম বিবাহবার্ষিকী তথা গোল্ডেন জুবিলির শুভেচ্ছা! আপনাদের ভালোবাসা ও একসাথে চলার ৫০টি সোনালী বছর সবার জন্য অনুপ্রেরণা।",
      vi: "Chúc mừng đám cưới Vàng 50 năm! 50 năm sắt son, thủy chung và tràn ngập yêu thương. Chúc hai bạn luôn bình an và hạnh phúc bên nhau!",
      sw: "Hongera kwa Jubilei ya Dhahabu ya miaka 50 ya ndoa! Upendo wenu wa dhati na ushirikiano uwe baraka kwa vizazi vyote."
    }
  ],
  'gender-reveal': [
    {
      en: "Congratulations on the sweet baby news! We can't wait to welcome your newest family member. Wishing mother and baby radiant health and happiness!",
      ur: "خوشخبری اور آمدِ نو مولود مبارک! اللہ تعالیٰ آنے والے ننھے مہمان کو آپ کی آنکھوں کی ٹھنڈک، صحت اور لمبی عمر عطا فرمائے۔ آمین۔",
      ar: "مبارك هذه البشارة السعيدة واستقبال المولود المرتقب! جعله الله قرة عين لوالديه ورزقه الصحة والعافية والبركة.",
      es: "¡Felicitaciones por la emocionante noticia del bebé! Deseando a la mamá y al bebé muchísima salud, ternura y alegría.",
      fr: "Félicitations pour cette merveilleuse nouvelle ! Nous avons hâte d'accueillir ce petit ange. Plein de santé et d'amour à la maman et au bébé !",
      hi: "घर में आने वाले नन्हे मेहमान की शुभ सूचना पर बहुत-बहुत बधाई! माँ और बच्चे दोनों को उत्तम स्वास्थ्य और खुशियां मिलें।",
      zh: "热烈祝贺宝宝即将降临的特大喜讯！愿宝宝健康茁壮成长，为全家带来无尽的欢乐与福气！",
      pt: "Parabéns pela doce notícia do bebê! Desejando à mamãe e ao bebezinho muita saúde, carinho e momentos inesquecíveis.",
      ru: "Поздравляем с радостной вестью о скором прибавлении! Желаем будущей маме и малышу крепкого здоровья, мира и счастья!",
      de: "Herzlichen Glückwunsch zu den wunderbaren Babynachrichten! Wir freuen uns sehr auf das Kleine. Gesundheit und Glück für die Familie!",
      ja: "新しい命の嬉しいお知らせ、心よりお祝い申し上げます！母子ともに健康で、笑顔あふれる毎日となりますように。",
      ko: "아름다운 아기 탄생 소식을 진심으로 축하드립니다! 산모와 아기 모두 건강하고 가정에 기쁨이 가득하길 소망합니다.",
      it: "Congratulazioni per la bellissima notizia del bebè in arrivo! Auguriamo alla mamma e al piccolo tanta salute e serenità.",
      tr: "Müjdeli bebek haberi kutlu olsun! Anneye ve minik yavrumuza sağlık, huzur ve bereket dolu bir ömür dileriz.",
      id: "Selamat atas kabar gembira kehadiran buah hati tercinta! Semoga ibu dan bayi selalu dalam lindungan sehat dan bahagia.",
      bn: "পরিবারে নতুন অতিথি আগমনের সুসংবাদে প্রাণঢালা অভিনন্দন! মা ও শিশুর সুস্বাস্থ্য ও দীর্ঘায়ু কামনা করি।",
      vi: "Chúc mừng tin vui đón chào thành viên nhí mới! Chúc mẹ và bé luôn khỏe mạnh, bình an và ngập tràn niềm vui gia đình!",
      sw: "Hongera kwa habari njema ya mtoto anayetarajiwa! Mungu amlinde mama na mtoto kwa afya tele na furaha."
    }
  ],
  'retirement': [
    {
      en: "Congratulations on your well-deserved retirement! Thank you for decades of dedication and excellence. May this golden chapter bring you peace, travel, and joy!",
      ur: "ریٹائرمنٹ مبارک ہو! آپ کی برسوں کی انتھک محنت اور شاندار خدمات کو سلام۔ دعا ہے کہ زندگی کا یہ نیا دور آپ کے لیے سکون، صحت اور خوشیوں کا پیامبر ہو۔",
      ar: "تهانينا بمناسبة التقاعد المستحق بجدارة! شكراً لعقود من العطاء والتميز. نتمنى لك مرحلة جديدة عامرة بالراحة وراحة البال.",
      es: "¡Felicitaciones por tu merecida jubilación! Gracias por años de entrega y excelencia. ¡Que esta nueva etapa te traiga paz y descanso!",
      fr: "Félicitations pour cette retraite bien méritée ! Merci pour vos années de dévouement et d'excellence. Profitez pleinement de ce nouveau chapitre !",
      hi: "शानदार रिटायरमेंट पर हार्दिक बधाई! आपके समर्पण और उत्कृष्ट सेवा के लिए धन्यवाद। यह नया अध्याय शांति और आनंद लेकर आए।",
      zh: "光荣退休，诚挚祝贺！感谢您数十年来兢兢业业的奉献与杰出成就。愿您的退休生活悠然自得、平安喜乐！",
      pt: "Parabéns pela merecida aposentadoria! Obrigado por anos de dedicação exemplar. Que esta nova fase seja repleta de descanso e realizações!",
      ru: "Поздравляем с заслуженным выходом на пенсию! Спасибо за годы преданного труда и профессионализма. Желаем отдыха, здоровья и радости!",
      de: "Herzlichen Glückwunsch zum wohlverdienten Ruhestand! Danke für deinen jahrzehntelangen Einsatz. Genieße die neue Freiheit in vollen Zügen!",
      ja: "ご退職、誠におめでとうございます！長年にわたるご尽力と素晴らしい功績に敬意を表し、心より感謝申し上げます。素敵なセカンドライフを！",
      ko: "명예로운 정년퇴직을 진심으로 축하드립니다! 오랜 세월 동안 보여주신 헌신과 열정에 감사드리며, 여유롭고 행복한 새 출발을 응원합니다.",
      it: "Congratulazioni per la tua meritata pensione! Grazie per anni di dedizione ed eccellenza. Goditi questo meraviglioso capitolo di libertà e pace!",
      tr: "Emekliliğin hayırlı olsun! Yıllarca verdiğin emek ve başarılar için teşekkür eder, huzurlu ve keyifli bir ömür dileriz.",
      id: "Selamat atas masa purnabakti yang membanggakan! Terima kasih atas dedikasi dan karya terbaik selama ini. Nikmati masa pensiun dengan penuh berkah!",
      bn: "মর্যাদাপূর্ণ অবসর গ্রহণের জন্য আন্তরিক অভিনন্দন! আপনার দীর্ঘ কর্মজীবনের নিষ্ঠা ও সেবার জন্য ধন্যবাদ। অবসরের দিনগুলি শান্তিময় হোক।",
      vi: "Chúc mừng bạn đã đến tuổi nghỉ hưu vinh quang! Cảm ơn sự cống hiến xuất sắc trong suốt những năm qua. Chúc bạn an nhàn và hạnh phúc!",
      sw: "Hongera sana kwa kustaafu kwa heshima! Asante kwa miaka mingi ya kazi yenye weledi. Furahia mapumziko haya kwa amani na furaha."
    }
  ],
  'christmas': [
    {
      en: "Merry Christmas! Wishing you and your loved ones a season filled with warmth, love, joy, and peace.",
      ur: "کرسمس کی پرمسرت مبارکباد! دعا ہے کہ یہ تہوار آپ کے گھر اور دل کو امن، محبت اور خوشیوں سے منور کر دے۔",
      ar: "عيد ميلاد مجيد! نتمنى لكم ولعائلاتكم موسماً مليئاً بالسلام والدفء والمحبة والبهجة.",
      es: "¡Feliz Navidad! Deseando a ti y a tus seres queridos una temporada llena de calidez, amor, paz y alegría.",
      fr: "Joyeux Noël ! Que cette période festive soit remplie de chaleur, d'amour, de paix et de bonheur pour vous et vos proches.",
      hi: "क्रिसमस की हार्दिक शुभकामनाएं! यह पावन पर्व आपके और आपके परिवार के जीवन में शांति, प्रेम और खुशियां लाए।",
      zh: "圣诞快乐！愿这个充满温情的节日为您和家人带来平安、喜乐与满满的祝福！",
      pt: "Feliz Natal! Desejo a você e à sua família uma época abençoada com muita paz, carinho e alegria.",
      ru: "Счастливого Рождества! Пусть этот светлый праздник принесет в ваш дом тепло, уют, мир и благополучие!",
      de: "Frohe Weihnachten! Möge diese festliche Zeit dir und deinen Liebsten Wärme, Frieden und Freude schenken.",
      ja: "メリークリスマス！温かい光と愛、そして穏やかな笑顔に包まれた素敵なクリスマスをお過ごしください。",
      ko: "메리 크리스마스! 따뜻한 사랑과 평화, 기쁨이 가득한 축복의 성탄절이 되기를 기원합니다.",
      it: "Buon Natale! Auguro a te e ai tuoi cari una stagione ricca di pace, calore, amore e serenità.",
      tr: "Mutlu Noeller! Sizlere ve sevdiklerinize huzur, neşe, sevgi ve mutluluk dolu bir bayram dilerim.",
      id: "Selamat Hari Natal! Semoga damai dan sukacita Natal senantiasa memenuhi hati serta rumah tangga Anda.",
      bn: "শুভ বড়দিন! আপনার এবং আপনার প্রিয়জনদের জীবন শান্তি, প্রেম ও আনন্দে ভরে উঠুক।",
      vi: "Giáng Sinh an lành! Chúc bạn và gia đình một mùa lễ hội ấm áp, tràn ngập yêu thương và hạnh phúc.",
      sw: "Heri ya Krismasi! Nakutakia wewe na familia yako msimu uliojaa upendo, amani na furaha tele."
    }
  ],
  'thanksgiving': [
    {
      en: "Happy Thanksgiving! Grateful for your presence in our lives. Wishing you a bountiful feast and a heart full of joy.",
      ur: "تھینکس گیونگ مبارک! شکرگزاری کے اس دن پر آپ کی دوستی اور محبت کا تہہ دل سے شکریہ۔ آپ کے لیے ڈھیروں دعائیں اور برکتیں۔",
      ar: "عيد شكر سعيد! ممتنون لوجودكم الطيب في حياتنا، متمنين لكم مائدة عامرة وقلوباً مفعمة بالامتنان والفرح.",
      es: "¡Feliz Día de Acción de Gracias! Agradecido por tu amistad y presencia. Que disfrutes de una fiesta llena de paz y alegría.",
      fr: "Joyeuse fête de Thanksgiving ! Reconnaissant de vous compter dans notre vie. Bénédictions et abondance à votre table !",
      hi: "थैंक्सगिविंग की शुभकामनाएं! जीवन में आपके साथ और प्रेम के लिए हार्दिक आभार। आपका जीवन खुशियों से भरा रहे।",
      zh: "感恩节快乐！心怀感恩，感谢生命中有您的相伴。愿您的生活中常伴欢声笑语与满满的温情！",
      pt: "Feliz Dia de Ação de Graças! Muito grato por sua presença e carinho. Que seu dia seja farto de paz e felicidade.",
      ru: "С Днем Благодарения! Спасибо за то, что вы есть в нашей жизни. Желаем уюта, тепла и изобилия в вашем доме!",
      de: "Frohes Erntedankfest! Dankbar für deine Begleitung. Möge dein Herz voller Freude und dein Tisch reich gedeckt sein.",
      ja: "感謝祭おめでとうございます！いつも温かい支えをありがとうございます。たくさんの実りと幸せをお祈りします。",
      ko: "추수감사절을 축하합니다! 함께할 수 있어 진심으로 감사드리며, 풍요롭고 행복한 시간이 되시길 바랍니다.",
      it: "Buon Ringraziamento! Grato per la tua presenza nella nostra vita. Ti auguro una festa ricca di amore e gioia.",
      tr: "Şükran Gününüz Kutlu Olsun! Hayatımızda olduğun için minnettarız. Bereket ve huzur dolu bir gün dilerim.",
      id: "Selamat Hari Thanksgiving! Bersyukur atas kehadiran Anda dalam hidup kami. Semoga dilimpahi damai dan kebahagiaan.",
      bn: "থ্যাঙ্কসগিভিং-এর শুভেচ্ছা! জীবনে আপনার উপস্থিতির জন্য আমরা কৃতজ্ঞ। আনন্দ ও শান্তিতে কাটুক আপনার প্রতিটি দিন।",
      vi: "Chúc mừng Lễ Tạ Ơn! Cảm ơn vì đã luôn đồng hành cùng chúng tôi. Chúc bạn một mùa lễ ấm áp và tràn đầy phúc lành.",
      sw: "Heri ya Siku ya Shukrani! Nashukuru kwa uwepo wako maishani mwetu. Uwe na baraka tele na amani moyoni."
    }
  ],
  'halloween': [
    {
      en: "Happy Halloween! Wishing you a spooktacular night filled with sweet treats, fun costumes, and thrilling memories!",
      ur: "ہیلووین مبارک! ڈھیر سارے لذیذ ٹریٹس، دلچسپ ملبوسات اور ہنسی مذاق سے بھری رات کی پرلطف تمنائیں۔",
      ar: "هالوين سعيد وممتع! نتمنى لكم أمسية مرحة مليئة بالحلويات والأزياء المبهجة والذكريات الجميلة.",
      es: "¡Feliz Halloween! Deseándote una noche fantástica llena de dulces deliciosos, disfraces geniales y mucha diversión.",
      fr: "Joyeux Halloween ! Passez une soirée terrifiante et amusante, remplie de friandises et de rires !",
      hi: "हैलोवीन की शुभकामनाएं! मीठे पकवानों, अनोखी वेशभूषा और मौज-मस्ती भरी रात का भरपूर आनंद लें!",
      zh: "万圣节快乐！愿您度过一个充满奇装异服、欢歌笑语与无尽惊喜的奇妙之夜！",
      pt: "Feliz Halloween! Desejando uma noite assustadoramente divertida com muitos doces e fantasias incríveis!",
      ru: "С Хэллоуином! Желаем весело провести этот вечер, полный сладких угощений, крутых костюмов и ярких эмоций!",
      de: "Fröhliches Halloween! Ich wünsche dir eine schaurig-schöne Nacht voller Süßigkeiten und jeder Menge Spaß!",
      ja: "ハッピーハロウィン！美味しいお菓子とユニークな仮装で、最高にエキサイティングな夜をお過ごしください！",
      ko: "해피 할로윈! 맛있는 캔디와 멋진 코스튬으로 가득한 신나고 특별한 밤이 되기를 바랍니다!",
      it: "Buon Halloween! Ti auguro una serata paurosamente divertente tra dolcetti, maschere e tante risate!",
      tr: "Cadılar Bayramınız Kutlu Olsun! Bol şekerli, eğlenceli kostümlü ve keyifli bir gece dilerim!",
      id: "Selamat Halloween! Semoga malam ini penuh dengan keseruan, kostum keren, dan aneka manisan lezat!",
      bn: "শুভ হ্যালোইন! মিষ্টি উপহার, মজার পোশাক আর আনন্দময় অনুভূতির দারুণ একটি রাত কাটুক আপনার!",
      vi: "Halloween vui vẻ! Chúc bạn có một đêm lễ hội độc đáo với nhiều bánh kẹo và khoảnh khắc đáng nhớ!",
      sw: "Heri ya Halloween! Uwe na usiku wa kusisimua uliojaa peremende, mavazi ya kipekee na furaha tele."
    }
  ],
  'easter': [
    {
      en: "Happy Easter! May the miracle of Easter bring renewal, hope, and abundant joy to you and your family.",
      ur: "ایسٹر مبارک! دعا ہے کہ ایسٹر کی بہار آپ کے گھرانے کے لیے نئی امید، زندگی اور دائمی خوشیوں کی نوید لائے۔",
      ar: "فصح مجيد ومبارك! عسى أن يحمل عيد الفصح التجدد والأمل والبركات الوافرة لكم ولأسركم الكريمة.",
      es: "¡Feliz Pascua de Resurrección! Que el milagro de la Pascua traiga renovación, esperanza y alegría a tu hogar.",
      fr: "Joyeuses Pâques ! Que la grâce de Pâques apporte renouveau, espérance et paix dans votre foyer.",
      hi: "ईस्टर की हार्दिक शुभकामनाएं! ईस्टर का यह पावन पर्व आपके जीवन में नई आशा, प्रेम और खुशियां लेकर आए।",
      zh: "复活节快乐！愿复活节的神圣光辉为您和家人带来崭新的希望、平安与丰盛的喜悦！",
      pt: "Feliz Páscoa! Que o milagre da Páscoa renove a esperança, a paz e a alegria em seu coração e em seu lar.",
      ru: "Со Светлой Пасхой! Пусть этот святой день принесет в ваши сердца обновление, надежду, мир и чистую радость!",
      de: "Frohe Ostern! Möge das Osterfest dir und deiner Familie neue Hoffnung, Erneuerung und Segen bringen.",
      ja: "ハッピーイースター！復活祭の光が、あなたとご家族に新しい希望と豊かな喜びをもたらしますように。",
      ko: "행복한 부활절을 기원합니다! 부활의 기쁨과 새로운 희망이 당신과 가정에 가득하길 소망합니다.",
      it: "Buona Pasqua! Che il miracolo della Pasqua porti speranza rinnovata, serenità e gioia alla tua famiglia.",
      tr: "Paskalya Bayramınız Kutlu Olsun! Bu kutsal gün evinize umut, yenilenme ve bol neşe getirsin.",
      id: "Selamat Hari Paskah! Kiranya damai dan sukacita Paskah membawa pengharapan baru bagi Anda sekeluarga.",
      bn: "শুভ ইস্টার! ইস্টারের পবিত্র আলো আপনার জীবনকে নতুন আশা, শান্তি ও আনন্দে উদ্ভাসিত করুক।",
      vi: "Chúc mừng Lễ Phục Sinh! Cầu mong phép màu Phục Sinh đem lại sự đổi mới, hy vọng và niềm vui dồi dào.",
      sw: "Heri ya Pasaka! Muujiza wa Pasaka ulete matumaini mapya, amani na furaha tele katika familia yako."
    }
  ],
  'diwali': [
    {
      en: "Happy Diwali! May the festival of lights illuminate your life with health, wealth, prosperity, and endless joy.",
      ur: "دیوالی مبارک! روشنیوں کا یہ خوبصورت تہوار آپ کی زندگی کو صحت، امن، خوشحالی اور کامیابیوں سے جگمگا دے۔",
      ar: "عيد ديوالي سعيد! عسى أن يضيء مهرجان الأنوار حياتكم بالصحة والرخاء والبركة والبهجة الدائمة.",
      es: "¡Feliz Diwali! Que el festival de las luces ilumine tu camino con prosperidad, salud y felicidad infinita.",
      fr: "Joyeux Diwali ! Que la fête des lumières illumine votre existence de prospérité, de santé et de joie.",
      hi: "दीपावली की हार्दिक शुभकामनाएं! दीपों का यह पावन पर्व आपके जीवन को सुख, समृद्धि, उत्तम स्वास्थ्य और खुशियों से रोशन करे।",
      zh: "排灯节快乐！愿这璀璨的光明节照亮您的前程，赐予您健康、繁荣、富足与无尽的喜悦！",
      pt: "Feliz Diwali! Que o festival das luzes ilumine sua jornada com muita saúde, fartura e alegria contagiante.",
      ru: "С праздником Дивали! Пусть фестиваль огней озарит вашу жизнь здоровьем, благополучием и немеркнущим светом радости!",
      de: "Fröhliches Diwali! Möge das Lichterfest dein Leben mit Gesundheit, Wohlstand und tiefer Freude erhellen.",
      ja: "ディワリおめでとうございます！光の祭典があなたの人生を健康と繁栄、そして無限の幸福で照らしますように。",
      ko: "디왈리 축제를 축하합니다! 찬란한 빛의 축제가 당신의 삶에 건강과 번영, 끝없는 기쁨을 비춰주기를 기원합니다.",
      it: "Buon Diwali! Possa la festa delle luci illuminare la tua vita con salute, prosperità e grande serenità.",
      tr: "Diwali Bayramınız Kutlu Olsun! Işıklar festivali hayatınızı sağlık, bereket ve daimi neşeyle aydınlatsın.",
      id: "Selamat Hari Raya Diwali! Semoga festival cahaya menerangi langkah hidup Anda dengan kemakmuran dan kedamaian.",
      bn: "শুভ দীপাবলি! আলোর এই উৎসব আপনার জীবনকে সুখ, সমৃদ্ধি, সুস্বাস্থ্য ও আনন্দে আলোকিত করে তুলুক।",
      vi: "Chúc mừng Lễ hội Ánh sáng Diwali! Cầu chúc ánh sáng rực rỡ mang đến thịnh vượng, sức khỏe và niềm vui cho bạn.",
      sw: "Heri ya Diwali! Tamasha la taa liangazie maisha yako kwa afya, ufanisi na furaha isiyo na kifani."
    }
  ],
  'hanukkah': [
    {
      en: "Chag Urim Sameach! Happy Hanukkah! May the Menorah candles bring warmth, light, peace, and miracles to your home.",
      ur: "ہنوکا مبارک! روشنیوں کے اس مقدس تہوار پر آپ کے گھر اور خاندان کے لیے امن، برکت اور خوشحالی کی دعا ہے۔",
      ar: "عيد حانوكا سعيد! عسى أن تملأ شموع الحانوكا بيتكم بالدفء والسلام والنور والبركات المباركة.",
      es: "¡Jag Janucá Sameaj! Que las luces de la Menorá traigan paz, milagros, amor y bendición a tu hogar.",
      fr: "Joyeux Hanoucca ! Que les bougies de la Menorah illuminent votre foyer de paix, de chaleur et de miracles.",
      hi: "हनुक्का की हार्दिक शुभकामनाएं! यह रोशनी का त्योहार आपके घर में शांति, सुख और चमत्कारिक आशीषें लेकर आए।",
      zh: "光明节吉庆！愿光明节的烛光为您的家庭带来温馨、安宁、和平与奇迹般的美好祝福！",
      pt: "Chag Hanukkah Sameach! Que as velas da Menorá tragam calor, paz, saúde e milagres para a sua família.",
      ru: "Счастливой Хануки! Пусть свет меноры наполнит ваш дом теплом, миром, радостью и чудесными благословениями!",
      de: "Chag Chanukka Sameach! Mögen die Lichter der Menora Frieden, Wärme und Wunder in dein Heim bringen.",
      ja: "ハヌカーおめでとうございます！メノラーの温かい光が、ご家庭に平和と希望、そして奇跡をもたらしますように。",
      ko: "하누카를 진심으로 축하합니다! 메노라의 촛불이 당신의 가정에 따스한 빛과 평화, 기적을 밝혀주길 바랍니다.",
      it: "Chag Hanukkah Sameach! Possa la luce della Menorah portare calore, serenità e miracoli nella tua casa.",
      tr: "Hanuka Bayramınız Kutlu Olsun! Menora ışıkları evinize huzur, bereket ve mucizeler taşısın.",
      id: "Selamat Hari Raya Hanukkah! Semoga lilin Menorah membawa kehangatan, terang, dan damai di rumah Anda.",
      bn: "শুভ হানুক্কা! আলোর এই দিনগুলি আপনার ঘরে উষ্ণতা, শান্তি ও বিস্ময়কর আনন্দ বয়ে আনুক।",
      vi: "Chúc mừng Lễ Hanukkah! Cầu mong ngọn nến Menorah soi sáng mái ấm của bạn với sự bình an và phép màu tuyệt diệu.",
      sw: "Heri ya Hanukkah! Mishumaa ya Menorah ilete joto, mwangaza na miujiza yenye amani nyumbani kwako."
    }
  ],
  'lunar-new-year': [
    {
      en: "Happy Lunar New Year! Wishing you good fortune, robust health, blossoming wealth, and boundless joy in this new spring!",
      ur: "قمری نیا سال مبارک! بہار کے اس نئے سال میں آپ کے لیے صحت، خوشحالی، برکت اور شاندار کامیابیوں کی تمنا ہے۔",
      ar: "سنة قمرية جديدة سعيدة! نتمنى لكم وافر الصحة والخير والازدهار والرخاء مع إطلالة هذا الربيع الجميل.",
      es: "¡Feliz Año Nuevo Lunar! Te deseo abundancia, excelente salud, prosperidad y felicidad infinita en esta nueva primavera.",
      fr: "Joyeux Nouvel An Lunaire ! Que ce nouveau printemps vous comble de santé, de prospérité, de chance et de bonheur !",
      hi: "चंद्र नव वर्ष की हार्दिक शुभकामनाएं! यह नया साल आपके जीवन में उत्तम स्वास्थ्य, धन, समृद्धि और अपार खुशियां लेकर आए।",
      zh: "恭贺新禧，新春大吉！祝您在崭新的一年里龙马精神、身体健康、吉星高照、富贵吉祥、阖家幸福！",
      pt: "Feliz Ano Novo Lunar! Desejando muita fortuna, saúde de ferro, prosperidade e harmonia nesta nova primavera.",
      ru: "С Лунным Новым Годом! Желаем крепкого здоровья, процветания, удачи во всех делах и семейного благополучия!",
      de: "Frohes Mondneujahr! Ich wünsche dir Glück, beste Gesundheit, wachsenden Wohlstand und Freude im neuen Frühling.",
      ja: "旧正月おめでとうございます！新春を迎え、皆様のご健康とご多幸、そして更なる飛躍を心よりお祈り申し上げます。",
      ko: "새해 복 많이 받으세요! 음력 설을 맞아 건강과 번영, 온갖 길운이 가득하시기를 진심으로 축원합니다.",
      it: "Buon Capodanno Lunare! Ti auguro grande fortuna, ottima salute, prosperità e tanta felicità in questa primavera.",
      tr: "Ay Yeni Yılınız Kutlu Olsun! Yeni baharla birlikte sağlık, bereket, şans ve daimi neşe sizinle olsun.",
      id: "Selamat Tahun Baru Imlek! Semoga tahun baru ini membawa keberuntungan, kesehatan prima, dan rezeki berlimpah.",
      bn: "শুভ চান্দ্র নববর্ষ! নতুন বসন্তে আপনার জীবনে প্রাচুর্য, সুস্বাস্থ্য এবং অবিরাম আনন্দ বর্ষিত হোক।",
      vi: "Chúc Mừng Năm Mới Âm Lịch! Chúc bạn và gia đình an khang thịnh vượng, vạn sự như ý và tài lộc dồi dào.",
      sw: "Heri ya Mwaka Mpya wa Lunar! Nakutakia afya thabiti, mafanikio tele na furaha tele katika majira haya mapya."
    }
  ],
  'st-patricks-day': [
    {
      en: "Happy St. Patrick's Day! May luck be your companion, peace hold your hand, and laughter fill your days with cheer!",
      ur: "سینٹ پیٹرک ڈے مبارک! دعا ہے کہ خوش قسمتی آپ کا ساتھ دے اور ہر دن خوشیوں اور مسکراہٹوں سے معمور ہو۔",
      ar: "عيد القديس باتريك سعيد! جعل الله التوفيق حليفكم والسلام رفيقكم والبهجة تملأ أوقاتكم بكل خير.",
      es: "¡Feliz Día de San Patricio! Que la buena suerte te acompañe, la paz reine en tu hogar y la alegría colme tu vida.",
      fr: "Joyeuse Saint-Patrick ! Que la chance vous sourie, que la paix vous accompagne et que la joie illumine vos journées !",
      hi: "सेंट पैट्रिक दिवस की शुभकामनाएं! सौभाग्य सदा आपके साथ रहे और आपका जीवन खुशियों से महकता रहे।",
      zh: "圣帕特里克节快乐！愿好运常伴左右，愿和平常驻心间，愿欢歌笑语洋溢在每一个明媚的日子里！",
      pt: "Feliz Dia de São Patrício! Que a boa sorte seja sua companheira constante e seu coração viva em festa!",
      ru: "С Днем Святого Патрика! Пусть удача сопутствует во всем, а жизнь будет наполнена смехом, теплом и добром!",
      de: "Fröhlichen St. Patrick's Day! Möge das Glück dein ständiger Begleiter sein und Freude deine Tage erfüllen.",
      ja: "セント・パトリックス・デーおめでとうございます！幸運の四つ葉のクローバーが、あなたにたくさんの笑顔を運びますように。",
      ko: "세인트 패트릭 데이를 축하합니다! 행운이 언제나 함께하고 평화와 웃음이 가득한 날들이 되시길 바랍니다.",
      it: "Buon San Patrizio! Che la fortuna sia la tua compagna fedele e che la gioia riempia ogni tuo giorno.",
      tr: "St. Patrick Gününüz Kutlu Olsun! Şans her an yanınızda, neşe ve huzur hayatınızın ayrılmaz parçası olsun.",
      id: "Selamat Hari St. Patrick! Semoga keberuntungan selalu menyertai dan keceriaan memenuhi hari-hari Anda.",
      bn: "সেন্ট প্যাট্রিক দিবসের শুভেচ্ছা! সৌভাগ্য সদা আপনার সাথী হোক এবং জীবনে আনন্দ উপচে পড়ুক।",
      vi: "Chúc mừng Ngày Thánh Patrick! Chúc may mắn luôn mỉm cười và niềm vui luôn tràn ngập trong cuộc sống của bạn.",
      sw: "Heri ya Siku ya Mtakatifu Patrick! Bahati njema iwe nawe na amani itawale maishani mwako daima."
    }
  ],
  'earth-day': [
    {
      en: "Happy Earth Day! Let us cherish, nurture, and protect our beautiful green planet together for generations to come.",
      ur: "یومِ ارض مبارک! آئیے مل کر اپنی اس خوبصورت زمین کی حفاظت، دیکھ بھال اور قدردانی کا عزم کریں۔",
      ar: "يوم أرض مبارك! فلنحافظ على كوكبنا الجميل ونرعاه معاً ليبقى آمناً ومزدهراً للأجيال القادمة.",
      es: "¡Feliz Día de la Tierra! Valoremos, cuidemos y protejamos nuestro hermoso planeta verde para las futuras generaciones.",
      fr: "Joyeuse Journée de la Terre ! Chérissons et préservons ensemble notre magnifique planète pour les générations futures.",
      hi: "पृथ्वी दिवस की हार्दिक शुभकामनाएं! आइए मिलकर अपनी इस हरी-भरी सुंदर धरती की रक्षा और संवर्धन का संकल्प लें।",
      zh: "世界地球日快乐！让我们携起手来，悉心呵护并珍惜我们这颗美丽的绿色星球，造福子孙后代！",
      pt: "Feliz Dia da Terra! Vamos valorizar, nutrir e proteger o nosso belo planeta para as gerações futuras.",
      ru: "С Днем Земли! Давайте вместе беречь, лелеять и защищать нашу прекрасную планету для будущих поколений!",
      de: "Alles Gute zum Tag der Erde! Lasst uns unseren wunderbaren grünen Planeten gemeinsam schützen und bewahren.",
      ja: "アースデイ（地球の日）おめでとうございます！かけがえのない美しい地球を、未来のために共に守り育てましょう。",
      ko: "지구의 날을 축하합니다! 아름다운 지구를 아끼고 보호하여 미래 세대에 건강하게 물려줄 수 있기를 다짐합니다.",
      it: "Buona Giornata della Terra! Custodiamo, proteggiamo e amiamo il nostro splendido pianeta per il futuro di tutti.",
      tr: "Dünya Günü Kutlu Olsun! Gelecek nesiller için güzel yeşil gezegenimizi el ele verip koruyalım.",
      id: "Selamat Hari Bumi! Mari bersama-sama merawat dan menjaga kelestarian bumi tercinta untuk generasi masa depan.",
      bn: "বিশ্ব ধরিত্রী দিবসের শুভেচ্ছা! আসুন একসাথে আমাদের সুন্দর এই সবুজ পৃথিবীর যত্ন নিই ও একে রক্ষা করি।",
      vi: "Chúc mừng Ngày Trái Đất! Hãy cùng nhau nâng niu và bảo vệ hành tinh xanh tươi đẹp của chúng ta cho muôn đời sau.",
      sw: "Heri ya Siku ya Dunia! Tushirikiane pamoja kuitunza na kuilinda sayari yetu nzuri kwa vizazi vijavyo."
    }
  ],
  'phd-defense': [
    {
      en: "Congratulations Dr.! Your successful PhD defense is a historic triumph of intellect, endurance, and vision. So immensely proud of your academic excellence!",
      ur: "ڈاکٹریٹ و پی ایچ ڈی مبارک، ڈاکٹر صاحب! آپ کی انتھک سائنسی تحقیق اور شاندار کامیابی قابلِ فخر ہے۔ اللہ پاک علم کے اس سفر کو مزید برکت عطا فرمائے۔ آمین۔",
      ar: "ألف مبارك مناقشة الدكتوراه بنجاح دكتورنا العزيز! إنجاز أكاديمي عظيم يتوج سنوات الصبر والاجتهاد العلمي الرفيع.",
      es: "¡Felicitaciones Doctor/a! La defensa exitosa de tu doctorado es un triunfo histórico de brillantez y perseverancia. ¡Qué gran orgullo!",
      fr: "Toutes nos félicitations Docteur ! Votre brillante soutenance de thèse est l'aboutissement d'années de rigueur et d'excellence. Immense fierté !",
      hi: "डॉक्टरेट व पीएचडी की शानदार सफलता पर हार्दिक बधाई डॉक्टर साहिब! आपकी वर्षों की कठिन तपस्या ने आज सर्वोच्च सम्मान पाया है।",
      zh: "热烈祝贺博士答辩圆满成功，博士阁下！这是智慧、毅力与学术追求的历史性巅峰荣耀，实至名归，为您感到由衷自豪！",
      pt: "Parabéns, Doutor/a! A defesa da sua tese de doutorado é uma conquista acadêmica magnífica fruto de anos de dedicação. Muito orgulho!",
      ru: "Поздравляем с успешной защитой докторской диссертации, Доктор! Это выдающаяся победа ума, упорства и научной мысли. Гордимся вами!",
      de: "Herzlichen Glückwunsch, Herr/Frau Doktor! Deine erfolgreiche Promotion ist ein triumphaler Meilenstein harter akademischer Arbeit. Enorm stolz!",
      ja: "博士号取得・論文審査の合格、誠におめでとうございます！長年の研究への情熱と弛まぬ努力が結実した最高峰の栄誉です。",
      ko: "박사 학위 취득 및 디펜스 통과를 진심으로 축하드립니다, 박사님! 학문적 열정과 인내가 빚어낸 최고의 성취에 큰 박수를 보냅니다.",
      it: "Congratulazioni Dottore/Dottoressa! Il successo della tua tesi di dottorato è il trionfo dell'ingegno e della perseveranza. Orgogliosissimi!",
      tr: "Tebrikler Sayın Doktor! Doktora tez savunmandaki büyük başarın, yılların emeğinin taçlanmasıdır. Seninle gurur duyuyoruz!",
      id: "Selamat atas gelar Doktor yang diraih! Ujian disertasi PhD Anda adalah bukti kecemerlangan intelektual dan ketekunan luar biasa. Sangat bangga!",
      bn: "পিএইচডি ডিগ্রি অর্জনে প্রাণঢালা অভিনন্দন, ডক্টর সাহেব! আপনার মেধা, নিষ্ঠা ও গবেষণার এক ঐতিহাসিক বিজয়। আমরা গর্বিত!",
      vi: "Chúc mừng tân Tiến sĩ! Bảo vệ thành công luận án tiến sĩ là minh chứng sáng ngời cho trí tuệ và sự kiên trì phi thường của bạn!",
      sw: "Hongera sana Daktari! Kuhitimu kwa shahada ya Uzamivu (PhD) ni ushindi mkubwa wa kielimu na bidii ya miaka mingi. Tunajivunia wewe!"
    }
  ],
  'driving-license': [
    {
      en: "Congratulations on passing your driving test! The roads are officially yours. Wishing you safe travels, scenic adventures, and smooth rides!",
      ur: "ڈرائیونگ لائسنس پاس کرنے پر بہت بہت مبارک ہو! گاڑی اب آپ کی مٹھی میں ہے۔ دعا ہے کہ آپ کا ہر سفر محفوظ، پرسکون اور خوشگوار ہو۔",
      ar: "مبارك اجتياز اختبار القيادة والحصول على الرخصة! الطريق مفتوح أمامك، نتمنى لك رحلات آمنة وسلسة مليئة بالتوفيق والسلامة.",
      es: "¡Felicitaciones por aprobar tu examen de conducir! Las carreteras son oficialmente tuyas. ¡Deseándote viajes seguros y maravillosas aventuras!",
      fr: "Félicitations pour votre permis de conduire ! La route vous appartient. Nous vous souhaitons des trajets en toute sécurité et de superbes aventures !",
      hi: "ड्राइविंग टेस्ट पास करने और लाइसेंस मिलने पर बहुत-बहुत बधाई! हर सफर सुरक्षित और खुशियों से भरा रहे।",
      zh: "恭喜顺利通过驾照考核！从此天高路广，持证上路。祝您一路顺风、行车平安、畅行无阻！",
      pt: "Parabéns por passar no teste de motorista! As estradas são suas agora. Desejo a você viagens seguras e passeios incríveis!",
      ru: "Поздравляем со сдачей на права! Дороги официально открыты для тебя. Желаем безопасной езды, зеленого света и легких путей!",
      de: "Herzlichen Glückwunsch zur bestandenen Führerscheinprüfung! Die Straßen gehören dir. Allzeit sichere und gute Fahrt!",
      ja: "運転免許の合格おめでとうございます！安全運転で、自由で快適な素晴らしいドライブをたくさん楽しんでくださいね！",
      ko: "운전면허 취득을 진심으로 축하합니다! 이제 직접 운전대를 잡고 달릴 시간입니다. 언제나 안전운전하시고 즐거운 드라이브 되세요!",
      it: "Congratulazioni per aver superato l'esame di guida! Ti auguro viaggi meravigliosi, massima sicurezza e strade sempre libere!",
      tr: "Ehliyet sınavını geçmeni yürekten tebrik ederim! Yollar artık seni bekliyor. Kazasız, belasız ve keyifli sürüşler dilerim!",
      id: "Selamat atas kelulusan ujian mengemudi dan mendapatkan SIM! Semoga setiap perjalanan Anda selalu aman, lancar, dan menyenangkan!",
      bn: "ড্রাইভিং লাইসেন্স পরীক্ষায় উত্তীর্ণ হওয়ায় অনেক অভিনন্দন! নিরাপদে গাড়ি চালান এবং আপনার প্রতিটি সফর শুভ হোক।",
      vi: "Chúc mừng bạn đã xuất sắc thi đỗ bằng lái xe! Chúc bạn vạn dặm bình an, lái xe an toàn và khám phá những chân trời mới!",
      sw: "Hongera kwa kufaulu mtihani wa udereva na kupata leseni! Nakutakia safari salama na zenye baraka popote uendapo!"
    }
  ],
  'sports-trophy': [
    {
      en: "Victory Trophy Mubarak! True champions rise through discipline and heart. What an extraordinary performance on the field. Keep conquering!",
      ur: "شاندار فتح اور ٹرافی جیتنا مبارک ہو! میدان میں آپ کی بے مثال کارکردگی نے دل جیت لیے۔ اللہ پاک آپ کو کھیلوں میں مزید بلندیاں عطا فرمائے۔",
      ar: "مبارك كأس البطولة والانتصار المستحق! أداء بطولي وعزيمة فولاذية في الملعب. هنيئاً لك هذا التتويج الباهر والمجد الرياضي!",
      es: "¡Felicitaciones por el trofeo y la victoria! El verdadero campeón se forja con disciplina y pasión. ¡Qué actuación tan sobresaliente!",
      fr: "Félicitations pour ce trophée et cette magnifique victoire ! Une prestation de haut vol sur le terrain digne d'un véritable champion !",
      hi: "शानदार खिताबी जीत और ट्रॉफी पर बधाई! खेल के मैदान पर आपका यह जबर्दस्त प्रदर्शन हम सभी का सिर गर्व से ऊंचा करता है।",
      zh: "热烈祝贺勇夺冠军奖杯！坚韧拼搏、技压群雄，展现了真正的王者风范。向赛场英雄致敬，再创辉煌！",
      pt: "Parabéns pelo troféu e pela vitória espetacular! Um verdadeiro campeão se faz com garra e coração. Continue brilhando!",
      ru: "Поздравляем с завоеванием чемпионского кубка! Потрясающее выступление на поле и заслуженная победа. Только вперед, к новым вершинам!",
      de: "Herzlichen Glückwunsch zum Meisterpokal! Was für ein überragender Triumph und Teamgeist auf dem Platz. Weiter so, Champion!",
      ja: "優勝トロフィーの獲得、おめでとうございます！日々の鍛錬と不屈の闘志が実を結んだ素晴らしい勝利です。次のステージも応援しています！",
      ko: "우승 트로피 차지를 진심으로 축하합니다! 그라운드에서 보여준 압도적인 기량과 투혼은 최고였습니다. 챔피언의 앞날을 응원합니다!",
      it: "Congratulazioni per il trofeo e la splendida vittoria! Una prestazione da vero fuoriclasse sul campo. Continua a vincere!",
      tr: "Şampiyonluk kupasını tebrik ederim! Sahada gösterdiğin azim ve muazzam performansla gerçek bir şampiyonsun. Başarıların daim olsun!",
      id: "Selamat atas perolehan piala dan kemenangan spektakuler! Kerja keras dan semangat juang di lapangan telah terbukti nyata. Juara sejati!",
      bn: "টুর্নামেন্টে অসাধারণ জয় ও চ্যাম্পিয়ন ট্রফি জয়ে প্রাণঢালা অভিনন্দন! আপনার দুর্দান্ত নৈপুণ্য আমাদের গর্বিত করেছে।",
      vi: "Chúc mừng chiếc cúp vô địch danh giá! Phong độ thi đấu quả cảm và đẳng cấp đã mang lại chiến thắng vang dội. Mãi là nhà vô địch!",
      sw: "Hongera kwa kutwaa kombe la ushindi! Mchezo wako uwanjani ulikuwa wa kiwango cha juu sana. Endelea kuwika bingwa!"
    }
  ],
  'visa-approved': [
    {
      en: "Visa Approved Mubarak! Your international journey is officially unlocked. Pack your bags and embark on this thrilling adventure to new horizons!",
      ur: "ویزا منظوری مبارک ہو! نئے سفر اور روشن مستقبل کے دروازے کھل گئے۔ اللہ پاک آپ کے اس بین الاقوامی سفر کو آسان، کامیاب اور بابرکت بنائے۔ آمین۔",
      ar: "مبارك صدور التأشيرة والموافقة الرسمية! فُتحت أمامك آفاق دولية جديدة، نتمنى لك رحلة موفقة وتوفيقاً باهراً في وجهتك القادمة.",
      es: "¡Felicitaciones por la visa aprobada! Tu viaje internacional está oficialmente desbloqueado. ¡Prepara tus maletas y disfruta este gran sueño!",
      fr: "Félicitations pour l'obtention de votre visa ! Les portes du monde s'ouvrent à vous. Préparez vos bagages pour cette formidable aventure !",
      hi: "वीजा मंजूर होने पर बहुत-बहुत बधाई! आपके सपनों की अंतर्राष्ट्रीय उड़ान का रास्ता साफ हो गया है। आपकी नई यात्रा बेहद सफल और सुखद रहे।",
      zh: "热烈祝贺签证顺利获批！通往全球广阔天地的大门已然敞开。收拾行囊，开启奔赴锦绣前程的崭新旅程吧！",
      pt: "Parabéns pelo visto aprovado! O seu passaporte para novos horizontes está carimbado. Prepare as malas e aproveite cada segundo dessa jornada!",
      ru: "Поздравляем с одобрением визы! Дорога к новым международным горизонтам открыта. Собирай чемоданы и лети навстречу мечте!",
      de: "Herzlichen Glückwunsch zum genehmigten Visum! Dein Weg in die Welt steht nun offen. Pack deine Koffer für dieses aufregende Abenteuer!",
      ja: "ビザ発給・承認、誠におめでとうございます！世界への新たな扉が開かれました。素晴らしい旅立ちと未来の成功をお祈りします！",
      ko: "비자 승인을 진심으로 축하합니다! 새로운 세상을 향한 문이 활짝 열렸습니다. 설레는 마음으로 짐을 꾸리고 멋진 도전을 시작하세요!",
      it: "Congratulazioni per il visto approvato! Il tuo viaggio verso nuovi orizzonti è realtà. Prepara le valigie per questa splendida avventura!",
      tr: "Vize onayını yürekten tebrik ederim! Yepyeni ufuklara yelken açma vakti geldi. Yolculuğun hayırlı, başarıların sonsuz olsun!",
      id: "Selamat atas persetujuan visa Anda! Pintu menuju petualangan dan masa depan internasional telah terbuka. Selamat berkemas dan sukses selalu!",
      bn: "ভিসা অনুমোদনে আন্তরিক অভিনন্দন! আপনার স্বপ্নের আন্তর্জাতিক যাত্রার পথ সুগম হলো। নতুন দেশে আপনার জীবন সুখ ও সফলতায় ভরে উঠুক।",
      vi: "Chúc mừng visa của bạn đã được phê duyệt! Cánh cửa bước ra thế giới đã mở rộng. Hãy chuẩn bị hành lý cho chuyến phiêu lưu tuyệt vời này!",
      sw: "Hongera sana kwa kupata visa! Milango ya safari yako ya kimataifa imefunguliwa rasmi. Funga mizigo na ufurahie safari yenye mafanikio!"
    }
  ],
  'baby-shower': [
    {
      en: "Happy Baby Shower! Celebrating the upcoming arrival of your precious bundle of joy. Wishing the family boundless love, health, and sweet blessings!",
      ur: "بیبی شاور مبارک! نئے ننھے مہمان کی آمد پر آپ کے پورے گھرانے کو دلی مبارکباد۔ اللہ ماں اور بچے دونوں کو صحت کاملہ عطا فرمائے۔",
      ar: "مبارك حفل استقبال المولود! نحتفل معكم بقرب وصول هذه الهدية الغالية، نسأل الله للوالدة والمولود دوام الصحة والسلامة والسرور.",
      es: "¡Feliz Baby Shower! Celebrando la pronta llegada de este hermoso angelito. ¡Deseándoles a la familia amor, salud y bendiciones!",
      fr: "Joyeuse Baby Shower ! Célébrons l'arrivée prochaine de ce précieux trésor. Plein d'amour, de santé et de douceur pour toute la famille !",
      hi: "गोद भराई / बेबी शॉवर की हार्दिक शुभकामनाएं! आने वाले नन्हे मेहमान के स्वागत की खुशी में पूरा परिवार खुशियों और स्वास्थ्य से परिपूर्ण रहे।",
      zh: "迎婴派对圆满吉庆！欢喜迎接即将降临的天使小宝贝。祝愿准妈妈与宝宝平安康健，全家充满爱与温暖！",
      pt: "Feliz Chá de Bebê! Celebrando a chegada iminente do seu bem mais precioso. Muita saúde, carinho e bênçãos para toda a família!",
      ru: "С праздником Бэби Шауэр! С нетерпением ждем скорого появления на свет вашего драгоценного чуда. Здоровья и любви вашей семье!",
      de: "Alles Gute zur Babyparty! Wir freuen uns riesig auf euer kleines Wunder. Möge die Familie mit Gesundheit und Liebe gesegnet sein!",
      ja: "ベビーシャワーおめでとうございます！待ち遠しい新しい命の誕生を心から祝福し、母子の健康とご家族の幸せをお祈りします。",
      ko: "베이비 샤워를 축하합니다! 곧 찾아올 소중한 천사를 맞이하며, 산모의 건강과 가정에 넘치는 축복이 가득하길 기원합니다.",
      it: "Buon Baby Shower! Festeggiamo insieme il dolce arrivo del vostro piccolo tesoro. Tanta salute, amore e gioia a tutta la famiglia!",
      tr: "Baby Shower kutlu olsun! Yakında aramıza katılacak minik mucizeyi heyecanla bekliyor, anneye ve bebeğe sağlık ve mutluluk diliyoruz!",
      id: "Selamat Baby Shower! Menyambut kehadiran buah hati yang sangat dinanti. Semoga ibu dan si kecil selalu sehat serta diberkahi kebahagiaan!",
      bn: "বেবি শাওয়ারের শুভেচ্ছা! অনাগত ছোট্ট সোনামণির আগমনে পরিবারে সুখ, সুস্বাস্থ্য ও অফুরন্ত ভালোবাসা ছড়িয়ে পড়ুক।",
      vi: "Chúc mừng tiệc đón em bé Baby Shower! Cùng chờ đón thiên thần nhỏ đáng yêu. Chúc mẹ tròn con vuông và gia đình luôn ngập tràn yêu thương!",
      sw: "Hongera kwa Baby Shower! Tunasherehekea ujio wa mtoto wenu mpendwa. Mungu aibariki familia kwa afya na upendo tele!"
    }
  ],
  'baat-pakki': [
    {
      en: "Baat Pakki Mubarak! Two hearts and two families uniting in love and blessings. May this beautiful beginning blossom into lifelong happiness!",
      ur: "بات پکی مبارک ہو! دو خاندانوں کے اس بابرکت ملاپ پر دل کی گہرائیوں سے مبارکباد۔ اللہ تعالیٰ اس رشتے کو محبت اور خیر کا گہوارہ بنائے۔ آمین۔",
      ar: "مبارك الخطوبة الرسمية وتمام الاتفاق المبارك! جمع الله بين قلبيكما في خير وأتمم فرحتكم على أتم وجه وأسعد حال.",
      es: "¡Felicitaciones por el compromiso formal (Baat Pakki)! Dos almas y familias unidas con amor. ¡Que este inicio florezca en felicidad eterna!",
      fr: "Félicitations pour vos fiançailles officielles ! L'union de deux cœurs et de deux familles. Que cette belle alliance soit source de bonheur infini !",
      hi: "बात पक्की / सगाई की बहुत-बहुत बधाई! दो दिलों और परिवारों का यह सुंदर मिलन सदा प्रेम, विश्वास और खुशियों से महकता रहे।",
      zh: "订婚吉庆，喜结良缘！两心相印、两家结好。愿这份美好良缘化作一生的相知相伴与甜美幸福！",
      pt: "Parabéns pelo noivado formal! Duas almas e duas famílias unidas em amor e respeito. Que esta união floresça em eterna felicidade!",
      ru: "Поздравляем с помолвкой и официальным союзом! Союз двух сердец и семей. Пусть это прекрасное начало приведет к вечному счастью!",
      de: "Herzlichen Glückwunsch zur offiziellen Verlobung! Zwei Herzen und Familien vereint in Liebe. Möge dieser Bund für immer blühen!",
      ja: "ご婚約・結納、誠におめでとうございます！二つの心とご両家が結ばれた素晴らしい門出を祝い、末永いお幸せをお祈りいたします。",
      ko: "약혼과 혼담 성사를 진심으로 축하합니다! 두 마음과 두 가정이 하나로 맺어지는 이 아름다운 시작이 영원한 행복으로 이어지길 바랍니다.",
      it: "Congratulazioni per il fidanzamento ufficiale! Due cuori e due famiglie uniti nell'amore. Che questo legame duri per tutta la vita!",
      tr: "Söz / Nişanınız Hayırlı Olsun! İki kalbin ve ailenin sevgiyle birleştiği bu güzel başlangıç ömür boyu mutluluk getirsin!",
      id: "Selamat atas pertunangan dan ikatan keluarga yang bahagia! Semoga langkah awal yang indah ini berbuah kebahagiaan abadi hingga pelaminan!",
      bn: "পাকা কথা ও বাগদানে আন্তরিক শুভেচ্ছা! দুটি হৃদয় ও দুটি পরিবারের সুন্দর বন্ধন সারা জীবন প্রেম ও শান্তিতে ভরিয়ে রাখুক।",
      vi: "Chúc mừng lễ đính hôn và giao ước gắn kết! Hai trái tim và hai gia đình cùng chung vui. Chúc cho tình yêu này đơm hoa kết trái viên mãn!",
      sw: "Hongera kwa posa na mapatano rasmi! Mioyo miwili na familia mbili zikiungana kwa upendo. Mwanzo huu ulete furaha ya maisha yote!"
    }
  ],
  'housewarming-blessings': [
    {
      en: "Housewarming Mubarak! May your new abode be filled with the warmth of love, divine barakah, joyful laughter, and cherished memories!",
      ur: "نیا گھر مبارک ہو! اللہ پاک آپ کے اس نئے مسکن کو رحمتوں، برکتوں، امن اور دائمی خوشیوں کا گہوارہ بنائے۔ آمین۔",
      ar: "منزل مبارك وعامر بذكر الله! نسأل الله أن يجعله دار أمان ورزق وسلام وبركة لكم ولجميع أفراد أسرتكم.",
      es: "¡Felicidades por tu nuevo hogar! Que esté lleno de risas cálidas, bendiciones celestiales y momentos inolvidables.",
      fr: "Félicitations pour votre nouvelle maison ! Que ce foyer soit béni de paix, de joie, d'amour et de doux souvenirs partagés.",
      hi: "गृह प्रवेश की हार्दिक शुभकामनाएं! आपका यह नया घर सुख, शांति, समृद्धि, आपसी प्रेम और खुशियों का धाम बने।",
      zh: "乔迁新居大吉！愿您的新宅充满欢声笑语、阖家安康、福泽深厚、紫气东来！",
      pt: "Parabéns pela casa nova! Que o seu novo lar seja repleto de amor, serenidade, gargalhadas e memórias inesquecíveis.",
      ru: "С новосельем! Пусть ваш новый дом будет крепостью любви, мира, достатка и душевного спокойствия!",
      de: "Herzlichen Glückwunsch zum neuen Heim! Möge dieses Haus voller Wärme, Segen, Lachen und wunderschöner Erinnerungen sein.",
      ja: "新築・新居へのお引越し、おめでとうございます！新しいお住まいにたくさんの笑顔と安らぎ、そして幸運が満ちますように。",
      ko: "새 보금자리 입주를 진심으로 축하합니다! 새 집에서 가족 모두 건강하시고 사랑과 웃음이 가 끊이지 않기를 기원합니다.",
      it: "Buona nuova casa! Possa la tua nuova dimora essere colma di calore, amore, risate felici e dolci ricordi.",
      tr: "Yeni eviniz kutlu olsun! Yeni yuvanızdan huzur, sağlık, bereket ve neşe hiç eksik olmasın.",
      id: "Selamat menempati rumah baru! Semoga rumah ini selalu dinaungi berkah, kedamaian, dan kenangan indah bersama keluarga.",
      bn: "নতুন গৃহে প্রবেশের আন্তরিক শুভেচ্ছা! আপনার এই নতুন বাড়ি সুখ, শান্তি, সমৃদ্ধি ও ভালোবাসার নিরাপদ আশ্রয় হোক।",
      vi: "Chúc mừng tân gia! Cầu mong tổ ấm mới của bạn luôn tràn ngập tiếng cười, sự ấm áp và tài lộc dồi dào.",
      sw: "Hongera kwa makazi mapya! Nyumba yenu mpya ijazwe na upendo, amani, vicheko na kumbukumbu nzuri daima."
    }
  ]
};

const occasionsFilePath = 'lib/jashn/occasions.ts';
let code = fs.readFileSync(occasionsFilePath, 'utf8');

// Insert missing templates before the closing of MESSAGE_TEMPLATES
// Find '  urs: [' or the end of MESSAGE_TEMPLATES
let insertionCode = '';
for (const [key, templates] of Object.entries(NEW_TEMPLATES)) {
  if (code.includes(`'${key}': [`)) {
    console.log(`Skipping ${key}, already present`);
    continue;
  }
  insertionCode += `  '${key}': ${JSON.stringify(templates, null, 4)},\n`;
}

if (insertionCode) {
  const marker = '}\n\nconst GENERIC_TEMPLATES';
  if (code.includes(marker)) {
    code = code.replace(marker, `${insertionCode}${marker}`);
    console.log('Inserted new templates successfully before urs: [');
  } else {
    console.error('Could not find marker for insertion');
    process.exit(1);
  }
}

fs.writeFileSync(occasionsFilePath, code, 'utf8');
console.log('Finished updating occasions.ts');
