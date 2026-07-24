'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/lib/lang/context'
import { Shield } from 'lucide-react'

const TERMS_TEXT: Record<string, Record<string, string>> = {
  title: {
    en: "Terms of Service",
    ur: "سروس کی شرائط",
    es: "Términos del Servicio",
    fr: "Conditions d'Utilisation",
    ar: "شروط الخدمة",
    hi: "सेवा की शर्तें",
    zh: "服务条款",
    pt: "Termos de Serviço",
    ru: "Условия обслуживания",
    de: "Nutzungsbedingungen",
    ja: "利用規約",
    ko: "서비스 이용약관",
    it: "Termini di Servizio",
    tr: "Kullanım Koşulları",
    id: "Syarat Layanan",
    bn: "সেবার শর্তাবলী",
    vi: "Điều khoản Dịch vụ",
    sw: "Vigezo vya Huduma"
  },
  tagline: {
    en: "Legal & Terms",
    ur: "قانون اور شرائط",
    es: "Legal y Términos",
    fr: "Mentions Légales",
    ar: "الأحكام والشروط القانونية",
    hi: "कानूनी और शर्तें",
    zh: "法律声明与条款",
    pt: "Legal e Termos",
    ru: "Условия и правовая информация",
    de: "Rechtliches & Bedingungen",
    ja: "法的情報と利用規約",
    ko: "법적 고지 및 약관",
    it: "Note Legali e Termini",
    tr: "Yasal Bilgiler ve Koşullar",
    id: "Hukum & Ketentuan",
    bn: "আইনি নির্দেশাবলী ও শর্তাবলী",
    vi: "Pháp Lý & Điều Khoản",
    sw: "Kisheria na Vigezo"
  },
  lastUpdated: {
    en: "Last Updated: July 21, 2026",
    ur: "آخری تجدید: 21 جولائی 2026",
    es: "Última actualización: 21 de julio de 2026",
    fr: "Dernière mise à jour : 21 juillet 2026",
    ar: "آخر تحديث: 21 يوليو 2026",
    hi: "अंतिम अपडेट: 21 जुलाई 2026",
    zh: "最后更新于：2026年7月21日",
    pt: "Última atualização: 21 de julho de 2026",
    ru: "Последнее обновление: 21 июля 2026 г.",
    de: "Zuletzt aktualisiert: 21. Juli 2026",
    ja: "最終更新日：2026年7月21日",
    ko: "최종 수정일: 2026년 7월 21일",
    it: "Ultimo aggiornamento: 21 luglio 2026",
    tr: "Son Güncelleme: 21 Temmuz 2026",
    id: "Terakhir diperbarui: 21 Juli 2026",
    bn: "সর্বশেষ সংস্করণ: ২১ জুলাই, ২০২৬",
    vi: "Cập nhật lần cuối: Ngày 21 tháng 7 năm 2026",
    sw: "Imesasishwa mwisho: 21 Julai 2026"
  },
  intro1: {
    en: "Welcome to Cardzy (cardzy.online), operated from Islamabad/Rawalpindi, Pakistan. These Terms of Service ('Terms') govern your access to and use of Cardzy's website, digital wish-card generator, event invitation tools, and related services (collectively, the 'Service').",
    ur: "اسلام آباد/راولپنڈی، پاکستان سے چلنے والے کارڈزی (cardzy.online) میں خوش آمدید۔ یہ سروس کی شرائط آپ کے کارڈزی ویب سائٹ اور سروسز کے استعمال کو ضابطہ میں لاتی ہیں۔",
    es: "Bienvenido a Cardzy (cardzy.online), operado desde Islamabad/Rawalpindi, Pakistán. Estos Términos rigen su acceso y uso del sitio web y los servicios de Cardzy.",
    fr: "Bienvenue sur Cardzy (cardzy.online), exploité depuis Islamabad/Rawalpindi, au Pakistan. Ces conditions régissent votre accès et votre utilisation du service Cardzy.",
    ar: "أهلاً بكم في كاردزي (cardzy.online) المدار من إسلام آباد/راولبندي، باكستان. تحكم شروط الخدمة هذه وصولك واستخدامك لمنصة كاردزي.",
    hi: "Cardzy (cardzy.online) में आपका स्वागत है, जो इस्लामाबाद/रावलपिंडी, पाकिस्तान से संचालित होता है। ये शर्तें आपकी Cardzy सेवाओं के उपयोग को नियंत्रित करती हैं।",
    zh: "欢迎使用 Cardzy (cardzy.online)。本服务条款适用于您访问和使用 Cardzy 网站、数字贺卡制作工具及事件邀请函相关服务。",
    pt: "Bem-vindo ao Cardzy (cardzy.online), operado em Islamabad/Rawalpindi, Paquistão. Estes Termos regem seu acesso e uso dos serviços do Cardzy.",
    ru: "Добро пожаловать в Cardzy (cardzy.online), работающий из Исламабада/Равалпинди, Пакистан. Настоящие Условия регулируют использование вами сервисов Cardzy.",
    de: "Willkommen bei Cardzy (cardzy.online) mit Sitz in Islamabad/Rawalpindi, Pakistan. Diese Bedingungen regeln Ihre Nutzung der Dienste von Cardzy.",
    ja: "パキスタンのイスラマバード/ラワルピンディより運営されているCardzy（cardzy.online）へようこそ。本規約はCardzyのWebサイトおよび関連サービスの利用に適用されます。",
    ko: "파키스탄 이슬라마바드/라왈핀디에서 운영되는 Cardzy(cardzy.online)에 오신 것을 환영합니다. 본 약관은 Cardzy 서비스 이용에 적용됩니다.",
    it: "Benvenuto su Cardzy (cardzy.online), gestito da Islamabad/Rawalpindi, Pakistan. Questi Termini regolano l'accesso e l'uso dei servizi Cardzy.",
    tr: "İslamabad/Rawalpindi, Pakistan merkezli Cardzy'ye (cardzy.online) hoş geldiniz. Bu Kullanım Koşulları, Cardzy hizmetlerini kullanımınızı düzenler.",
    id: "Selamat datang di Cardzy (cardzy.online) yang beroperasi dari Islamabad/Rawalpindi, Pakistan. Ketentuan Layanan ini mengatur penggunaan Anda atas layanan Cardzy.",
    bn: "Cardzy (cardzy.online)-এ স্বাগতম। এই সেবার শর্তাবলী আপনার Cardzy প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী নির্ধারণ করে।",
    vi: "Chào mừng bạn đến với Cardzy (cardzy.online) hoạt động từ Islamabad/Rawalpindi, Pakistan. Điều khoản này quy định việc bạn sử dụng dịch vụ của Cardzy.",
    sw: "Karibu Cardzy (cardzy.online) inayofanya kazi kutoka Islamabad/Rawalpindi, Pakistan. Vigezo hivi vinasimamia matumizi yako ya huduma za Cardzy."
  },
  intro2: {
    en: "By accessing or using Cardzy, you agree to be bound by these Terms. If you do not agree, please do not use our Service.",
    ur: "کارڈزی کو استعمال کرنے سے آپ ان شرائط کو قبول کرتے ہیں۔ اگر آپ متفق نہیں ہیں تو برائے مہربانی ہماری سروس استعمال نہ کریں۔",
    es: "Al acceder o utilizar Cardzy, acepta quedar vinculado por estos Términos. Si no está de acuerdo, no utilice nuestro Servicio.",
    fr: "En accédant à Cardzy, vous acceptez d'être lié par ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre service.",
    ar: "من خلال الوصول إلى كاردزي أو استخدامه، فإنك توافق على الالتزام بهاته الشروط. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا.",
    hi: "Cardzy का उपयोग करके आप इन शर्तों से बंधने के लिए सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवा का उपयोग न करें।",
    zh: "访问或使用 Cardzy 即表示您同意受本条款约束。如果您不同意本条款的任何内容，请停止使用本服务。",
    pt: "Ao acessar ou usar o Cardzy, você concorda com estes Termos. Se não concordar, não utilize nosso Serviço.",
    ru: "Используя Cardzy, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны, пожалуйста, воздержитесь от использования сервиса.",
    de: "Durch den Zugriff auf Cardzy erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie unseren Dienst bitte nicht.",
    ja: "Cardzyにアクセスまたは利用することで、本規約に同意したものとみなされます。同意いただけない場合は利用をお控えください。",
    ko: "Cardzy에 접속하거나 이용함으로써 귀하는 본 약관에 동의하게 됩니다. 동의하지 않는 경우 서비스 이용을 중단해 주세요.",
    it: "Accedendo o utilizzando Cardzy, accetti di essere vincolato da questi Termini. Se non sei d'accordo, ti preghiamo di non utilizzare il Servizio.",
    tr: "Cardzy'ye erişerek veya kullanarak bu Koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen Hizmetimizi kullanmayın.",
    id: "Dengan mengakses atau menggunakan Cardzy, Anda menyetujui Ketentuan ini. Jika Anda tidak setuju, mohon tidak menggunakan Layanan kami.",
    bn: "Cardzy ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে নিতে সম্মত হন। সম্মত না হলে অনুগ্রহ করে আমাদের সেবা ব্যবহার করবেন না।",
    vi: "Bằng cách truy cập Cardzy, bạn đồng ý tuân thủ các Điều khoản này. Nếu không đồng ý, vui lòng không sử dụng dịch vụ.",
    sw: "Kwa kufikia au kutumia Cardzy, unakubali kubana na Vigezo hivi. Kama hukubali, tafadhali usitumie Huduma wetu."
  },
  s1Title: { en: "1. Account Registration & Security", ur: "1. اکاؤنٹ کی رجسٹریشن اور سیکورٹی", es: "1. Registro de Cuenta y Seguridad", fr: "1. Inscription et Sécurité", ar: "1. تسجيل الحساب والأمان", hi: "1. खाता पंजीकरण और सुरक्षा", zh: "1. 账户注册与安全", pt: "1. Registro de Conta e Segurança", ru: "1. Регистрация и безопасность аккаунта", de: "1. Registrierung & Sicherheit", ja: "1. アカウント登録とセキュリティ", ko: "1. 계정 등록 및 보안", it: "1. Registrazione e Sicurezza dell'Account", tr: "1. Hesap Kaydı ve Güvenlik", id: "1. Pendaftaran Akun & Keamanan", bn: "১. অ্যাকাউন্ট নিবন্ধন ও নিরাপত্তা", vi: "1. Đăng Ký Tài Khoản & Bảo Mật", sw: "1. Usajili wa Akaunti na Usalama" },
  s1p1: {
    en: "1.1. You may use certain features of Cardzy as a guest or by registering an account. You agree to provide accurate, current, and complete information during registration.",
    ur: "1.1. آپ کارڈزی کی کچھ خصوصیات مہمان کی حیثیت سے یا اکاؤنٹ رجسٹر کر کے استعمال کر سکتے ہیں۔ آپ رجسٹریشن کے دوران درست اور مکمل معلومات فراہم کرنے پر رضامند ہیں۔",
    es: "1.1. Puede utilizar ciertas funciones como invitado o registrando una cuenta. Acepta proporcionar información precisa y completa al registrarse.",
    fr: "1.1. Vous pouvez utiliser certaines fonctionnalités en tant qu'invité ou en créant un compte. Vous acceptez de fournir des informations exactes lors de l'inscription.",
    ar: "1.1. يمكنك استخدام بعض المزايا كزائر أو عن طريق إنشاء حساب. أنت توافق على تقديم معلومات دقيقة وكاملة عند التسجيل.",
    hi: "1.1. आप अतिथि के रूप में या खाता पंजीकृत करके Cardzy की कुछ सुविधाओं का उपयोग कर सकते हैं। आप सटीक और पूर्ण जानकारी देने के लिए सहमत हैं।",
    zh: "1.1. 您可以以访客身份或注册账户使用 Cardzy 的部分功能。您同意在注册过程中提供准确、完整的信息。",
    pt: "1.1. Você pode usar recursos como visitante ou criando uma conta. Você concorda em fornecer informações precisas ao se registrar.",
    ru: "1.1. Вы можете использовать некоторые функции как гость или зарегистрировав аккаунт. Вы обязуетесь указывать точные данные при регистрации.",
    de: "1.1. Sie können bestimmte Funktionen als Gast oder durch Registrierung eines Kontos nutzen. Sie stimmen zu, genaue Daten anzugeben.",
    ja: "1.1. ゲストまたはアカウント登録によりサービスを利用できます。登録時には正確で完全な情報を提供することに同意するものとします。",
    ko: "1.1. 귀하는 게스트로 이용하거나 계정을 등록하여 Cardzy의 일부 기능을 이용할 수 있습니다. 가입 시 정확한 정보를 제공하는 데 동의합니다.",
    it: "1.1. Puoi utilizzare alcune funzionalità come ospite o registrando un account. Accetti di fornire informazioni accurate al momento della registrazione.",
    tr: "1.1. Cardzy'yi konuk olarak veya bir hesap açarak kullanabilirsiniz. Kayıt sırasında doğru ve eksiksiz bilgi vermeyi kabul edersiniz.",
    id: "1.1. Anda dapat menggunakan fitur tertentu sebagai tamu atau dengan mendaftar akun. Anda setuju untuk memberikan informasi yang akurat saat pendaftaran.",
    bn: "১.১. আপনি অতিথি হিসেবে বা অ্যাকাউন্ট নিবন্ধন করে Cardzy-এর কিছু ফিচার ব্যবহার করতে পারেন। নিবন্ধনের সময় সঠিক তথ্য প্রদানে আপনি সম্মত।",
    vi: "1.1. Bạn có thể sử dụng một số tính năng dưới dạng khách hoặc bằng cách đăng ký tài khoản. Bạn đồng ý cung cấp thông tin chính xác khi đăng ký.",
    sw: "1.1. Unaweza kutumia vipengele fulani kama mgeni au kwa kusajili akaunti. Unakubali kutoa taarifa sahihi wakati wa usajili."
  },
  s1p2: {
    en: "1.2. You are responsible for safeguarding your login credentials and for all activities that occur under your account.",
    ur: "1.2. آپ اپنے لاگ ان کی معلومات کی حفاظت اور اپنے اکاؤنٹ کے تحت ہونے والی تمام سرگرمیوں کے ذمہ دار ہیں۔",
    es: "1.2. Es responsable de custodiar sus credenciales de acceso y de todas las actividades realizadas en su cuenta.",
    fr: "1.2. Vous êtes responsable de la sécurité de vos identifiants et de toutes les activités effectuées sous votre compte.",
    ar: "1.2. أنت مسؤول عن حماية بيانات اعتماد تسجيل الدخول الخاصة بك وعن جميع الأنشطة التي تتم تحت حسابك.",
    hi: "1.2. आप अपने लॉगिन क्रेडेंशियल की सुरक्षा और अपने खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं।",
    zh: "1.2. 您有责任妥善保管您的登录凭据，并对您账户下发生的所有活动承担法律责任。",
    pt: "1.2. Você é responsável por proteger suas credenciais de login e por todas as atividades que ocorram em sua conta.",
    ru: "1.2. Вы несете ответственность за сохранность своих учетных данных и за все действия, совершаемые под вашим аккаунтом.",
    de: "1.2. Sie sind für die Geheimhaltung Ihrer Zugangsdaten und für alle Aktivitäten unter Ihrem Konto verantwortlich.",
    ja: "1.2. ログイン情報の管理およびアカウント下で行われるすべての漏洩や活動については、お客様自身が責任を負うものとします。",
    ko: "1.2. 귀하는 로그인 정보의 보안을 유지하고 계정에서 발생하는 모든 활동에 대해 책임을 집니다.",
    it: "1.2. Sei responsabile della custodia delle tue credenziali di accesso e di tutte le attività svolte tramite il tuo account.",
    tr: "1.2. Giriş bilgilerinizi korumaktan ve hesabınız altında gerçekleşen tüm faaliyetlerden siz sorumlusunuz.",
    id: "1.2. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial login Anda dan atas semua aktivitas yang terjadi di bawah akun Anda.",
    bn: "১.২. আপনি আপনার লগইন তথ্যের নিরাপত্তা এবং আপনার অ্যাকাউন্টের অধীনে পরিচালিত সমস্ত কার্যক্রমের জন্য দায়ী।",
    vi: "1.2. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động diễn ra dưới tài khoản của bạn.",
    sw: "1.2. Unawajibika kulinda taarifa zako za kuingia na kwa shughuli zote zinazotokea chini ya akaunti yako."
  },
  s1p3: {
    en: "1.3. You must notify us immediately at cardzyonline@gmail.com if you suspect unauthorized use of your account.",
    ur: "1.3. اگر آپ کو اپنے اکاؤنٹ کے غیر مجاز استعمال کا شبہ ہو تو آپ کو فوری طور پر cardzyonline@gmail.com پر اطلاع دینی چاہیے۔",
    es: "1.3. Debe notificarnos inmediatamente a cardzyonline@gmail.com si sospecha un uso no autorizado de su cuenta.",
    fr: "1.3. Vous devez nous informer immédiatement à cardzyonline@gmail.com si vous suspectez une utilisation non autorisée.",
    ar: "1.3. يجب عليك إبلاغنا فوراً على cardzyonline@gmail.com إذا كنت تشك في أي استخدام غير مصرح به لحسابك.",
    hi: "1.3. यदि आपको अपने खाते के अनधिकृत उपयोग का संदेह है तो आपको तुरंत cardzyonline@gmail.com पर सूचित करना चाहिए।",
    zh: "1.3. 如果您怀疑您的账户遭到未经授权的使用，请立即发送邮件至 cardzyonline@gmail.com 通知我们。",
    pt: "1.3. Você deve nos notificar imediatamente em cardzyonline@gmail.com se suspeitar de uso não autorizado da sua conta.",
    ru: "1.3. Вы должны немедленно уведомить нас по адресу cardzyonline@gmail.com при подозрении на несанкционированный доступ.",
    de: "1.3. Benachrichtigen Sie uns umgehend unter cardzyonline@gmail.com, wenn Sie eine unbefugte Nutzung vermuten.",
    ja: "1.3. 不正アクセスの疑いがある場合は、直ちに cardzyonline@gmail.com までご連絡ください。",
    ko: "1.3. 계정의 무단 사용이疑心되는 경우 즉시 cardzyonline@gmail.com으로 알려주셔야 합니다.",
    it: "1.3. Devi informarci immediatamente a cardzyonline@gmail.com se sospetti un uso non autorizzato del tuo account.",
    tr: "1.3. Hesabınızın yetkisiz kullanıldığından şüphelenirseniz derhal cardzyonline@gmail.com adresinden bize bildirmelisiniz.",
    id: "1.3. Anda harus segera memberi tahu kami di cardzyonline@gmail.com jika mencurigai penggunaan akun tanpa izin.",
    bn: "১.৩. আপনার অ্যাকাউন্টের অননুমোদিত ব্যবহারের কোনো সন্দেহ থাকলে অবিলম্বে cardzyonline@gmail.com ইমেইলে জানাতে হবে।",
    vi: "1.3. Bạn phải thông báo ngay cho chúng tôi qua cardzyonline@gmail.com nếu nghi ngờ tài khoản bị sử dụng trái phép.",
    sw: "1.3. Lazima utuarifu mara moja kupitia cardzyonline@gmail.com kama unashuku matumizi yasiyo na idhini."
  },
  s2Title: { en: "2. Acceptable Use Policy", ur: "2. مقبول استعمال کی پالیسی", es: "2. Política de Uso Aceptable", fr: "2. Politique d'Utilisation Acceptable", ar: "2. سياسة الاستخدام المقبول", hi: "2. स्वीकार्य उपयोग नीति", zh: "2. 合规使用政策", pt: "2. Política de Uso Aceitável", ru: "2. Правила допустимого использования", de: "2. Richtlinie für akzeptable Nutzung", ja: "2. 利用規約と禁止事項", ko: "2. 올바른 이용 정책", it: "2. Politica di Uso Accettabile", tr: "2. Kabul Edilebilir Kullanım Politikası", id: "2. Kebijakan Penggunaan yang Diperbolehkan", bn: "২. গ্রহণযোগ্য ব্যবহার নীতি", vi: "2. Chính Sách Sử Dụng Chấp Nhận Được", sw: "2. Sera ya Matumizi Yanayokubalika" },
  s2intro: {
    en: "2.1. Cardzy is designed for lawful, celebratory, and personal communication. You agree not to create, upload, publish, or distribute any card, invitation, image, or text that:",
    ur: "2.1. کارڈزی قانونی، خوشی اور ذاتی مواصلات کے لیے بنایا گیا ہے۔ آپ مندرجہ ذیل قسم کے مواد کو بنانے یا شیئر نہ کرنے پر رضامند ہیں:",
    es: "2.1. Cardzy está diseñado para una comunicación legal, festiva y personal. Acepta no crear ni distribuir contenido que:",
    fr: "2.1. Cardzy est conçu pour une communication légale et personnelle. Vous acceptez de ne pas publier de contenu qui :",
    ar: "2.1. تم تصميم كاردزي للتواصل القانوني والاحتفالي والشخصي. أنت توافق على عدم إنشاء أو نشر أي محتوى ينطوي على:",
    hi: "2.1. Cardzy कानूनी, उत्सव और व्यक्तिगत संचार के लिए डिज़ाइन किया गया है। आप ऐसा कोई कार्ड या सामग्री न बनाने के लिए सहमत हैं जो:",
    zh: "2.1. Cardzy 旨在用于合法、庆祝及个人社交沟通。您同意不创建、上传、发布或分发符合以下任何特征的内容：",
    pt: "2.1. O Cardzy foi criado para comunicação legal e comemorativa. Você concorda em não criar ou distribuir conteúdo que:",
    ru: "2.1. Cardzy предназначен для законного и личного общения. Вы обязуетесь не создавать и не распространять контент, который:",
    de: "2.1. Cardzy ist für rechtmäßige, persönliche Kommunikation gedacht. Sie stimmen zu, keine Inhalte zu erstellen, die:",
    ja: "2.1. Cardzyは合法で個人的なお祝いのために設計されています。以下の条件に該当するコンテンツを作成・公開しないことに同意するものとします：",
    ko: "2.1. Cardzy는 합법적이고 개인적인 소통을 위해 설계되었습니다. 귀하는 다음에 해당하는 콘텐츠를 생성하거나 게시하지 않을 것에 동의합니다:",
    it: "2.1. Cardzy è progettato per una comunicazione legale e personale. Accetti di non creare o distribuire contenuti che:",
    tr: "2.1. Cardzy yasal ve kişisel iletişim için tasarlanmıştır. Şunları içeren içerikler oluşturmamayı veya paylaşmamayı kabul edersiniz:",
    id: "2.1. Cardzy dirancang untuk komunikasi yang sah dan personal. Anda setuju untuk tidak membuat atau membagikan konten yang:",
    bn: "২.১. Cardzy বৈধ এবং ব্যক্তিগত যোগাযোগের জন্য তৈরি। আপনি নিম্নলিখিত ধরনের কনটেন্ট না তৈরি করতে সম্মত হন:",
    vi: "2.1. Cardzy được thiết kế cho giao tiếp hợp pháp và cá nhân. Bạn đồng ý không tạo hoặc chia sẻ nội dung:",
    sw: "2.1. Cardzy imeundwa kwa mawasiliano halali na ya kibinafsi. Unakubali kutounda au kusambaza maudhui yanay:"
  },
  s2b1: {
    en: "Is illegal, unlawful, fraudulent, or deceptive under applicable law;",
    ur: "قابلِ اطلاق قانون کے تحت غیر قانونی، دھوکہ دہی یا گمراہ کن ہو؛",
    es: "Sea ilegal, fraudulento o engañoso bajo la ley aplicable;",
    fr: "Est illégal, frauduleux ou trompeur au regard de la loi ;",
    ar: "يكون غير قانوني أو احتيالياً أو مضللاً بموجب القانون؛",
    hi: "लागू कानून के तहत अवैध, धोखाधड़ी या भ्रामक हो;",
    zh: "违反适用法律法规，具有违法、欺诈或误导性质；",
    pt: "Seja ilegal, fraudulento ou enganoso perante a lei;",
    ru: "Является незаконным, мошенническим или вводящим в заблуждение;",
    de: "Illegal, betrügerisch oder irreführend ist;",
    ja: "違法、詐欺的、または誤解を招く内容であるもの；",
    ko: "관련 법률에 따라 불법적이거나 사기 또는 기만적인 내용;",
    it: "Sia illegale, fraudolento o ingannevole secondo le leggi vigenti;",
    tr: "Yasalara aykırı, sahte veya yanıltıcı nitelikte olan;",
    id: "Ilegal, curang, atau menyesatkan menurut hukum yang berlaku;",
    bn: "আইনবহির্ভূত, প্রতারণামূলক বা বিভ্রান্তিকর;",
    vi: "Bất hợp pháp, gian lận hoặc lừa đảo theo pháp luật;",
    sw: "Ni kinyume cha sheria, cha uongo au cha kudanganya;"
  },
  s2b2: {
    en: "Contains hate speech, harassment, defamation, threats, or abusive language;",
    ur: "نفرت انگیز تقریر، ہراسانی، بدنامی، دھمکیوں یا گالی گلوچ پر مبنی ہو؛",
    es: "Contenga discurso de odio, acoso, difamación, amenazas o lenguaje abusivo;",
    fr: "Contient des propos haineux, du harcèlement, de la diffamation ou des menaces ;",
    ar: "يحتوي على خطاب كراهية أو مضايقة أو تشهير أو تهديدات؛",
    hi: "नफरत फैलाने वाला भाषण, उत्पीड़न, मानहानि या धमकी शामिल हो;",
    zh: "包含仇恨言论、骚扰、诽谤、恐吓或侮辱性词汇；",
    pt: "Contenha discurso de ódio, assédio, difamação, ameaças ou linguagem abusiva;",
    ru: "Содержит язык ненависти, домогательства, клевету или угрозы;",
    de: "Hassrede, Belästigung, Verleumdung oder Drohungen enthält;",
    ja: "ヘイトスピーチ、嫌がらせ、中傷、脅迫を含むもの；",
    ko: "혐오 발언, 괴롭힘, 명예훼손,脅迫 또는 모욕적인 언어가 포함된 내용;",
    it: "Contenga incitamento all'odio, molestie, diffamazione o minacce;",
    tr: "Nefret söylemi, taciz, iftira, tehdit veya küfür içeren;",
    id: "Mengandung ujaran kebencian, pelecehan, fitnah, atau ancaman;",
    bn: "ঘৃণামূলক বক্তব্য, হয়রানি, মানহানি বা হুমকি অন্তর্ভুক্ত;",
    vi: "Chứa ngôn từ kích động thù hằn, quấy rối, phỉ báng hoặc đe dọa;",
    sw: "Inahusisha lugha ya chuki, unyanyasaji, matusi au vitisho;"
  },
  s2b3: {
    en: "Displays sexually explicit, pornographic, or violent material;",
    ur: "فحش، پورنوگرافک یا پرتشدد مواد پر مشتمل ہو؛",
    es: "Muestre contenido sexualmente explícito, pornográfico o violento;",
    fr: "Affiche du contenu explicite, pornographique ou violent ;",
    ar: "يعرض مواد صريحة جنسياً أو إباحية أو عنيفة؛",
    hi: "यौन रूप से स्पष्ट, अश्लील या हिंसक सामग्री प्रदर्शित करता हो;",
    zh: "展示色情、淫秽或暴力血腥内容；",
    pt: "Exiba material sexualmente explícito, pornográfico ou violento;",
    ru: "Демонстрирует порнографические материалы или сцены насилия;",
    de: "Sexuell explizite, pornografische oder gewalttätige Inhalte zeigt;",
    ja: "わいせつ、成人向け、または暴力的な素材を含むもの；",
    ko: "음란물, 성적으로 노골적이거나暴力적인 자료;",
    it: "Mostri materiale sessualmente esplicito, pornografico o violento;",
    tr: "Cinsel içerikli, pornografik veya şiddet içeren materyal barındıran;",
    id: "Menampilkan materi pornografi, konten eksplisit, atau kekerasan;",
    bn: "যৌনভাবে স্পষ্ট, অশ্লীল বা সহিংস উপাদান প্রদর্শিত হয়;",
    vi: "Hiển thị nội dung khiêu dâm, đồi trụy hoặc bạo lực;",
    sw: "Inaonyesha maudhui ya ngono, picha chafu au vurugu;"
  },
  s2b4: {
    en: "Infringes on any third party’s intellectual property, trademark, copyright, or privacy rights;",
    ur: "کسی فریق ثالث کے کاپی رائٹ، ٹریڈ مارک یا پرائیویسی کے حقوق کی خلاف ورزی کرے؛",
    es: "Infrinja la propiedad intelectual, derechos de autor o privacidad de terceros;",
    fr: "Viole la propriété intellectuelle, le droit d'auteur ou la vie privée de tiers ;",
    ar: "ينتهك الملكية الفكرية أو العلامة التجارية أو حقوق الخصوصية لأي طرف ثالث؛",
    hi: "किसी तीसरे पक्ष के बौद्धिक संपदा, कॉपीराइट या गोपनीयता अधिकारों का उल्लंघन करता हो;",
    zh: "侵犯任何第三方的知识产权、商标权、版权或隐私权；",
    pt: "Viole direitos autorais, marcas registradas ou privacidade de terceiros;",
    ru: "Нарушает авторские права, товарные знаки или конфиденциальность третьих лиц;",
    de: "Urheberrechte, Marken oder Privatsphäre Dritter verletzt;",
    ja: "第三者の知的財産権、著作権、商標権、またはプライバシーを侵害するもの；",
    ko: "제3자의 지적 재산권, 상표권, 저작권 또는 사생활 권리를 침해하는 내용;",
    it: "Violi la proprietà intellettuale, il copyright o la privacy di terzi;",
    tr: "Üçüncü tarafların telif hakkını, markasını veya gizliliğini ihlal eden;",
    id: "Melanggar hak kekayaan intelektual, hak cipta, atau privasi pihak ketiga;",
    bn: "তৃতীয় পক্ষের বুদ্ধিবৃত্তিক সম্পত্তি, কপিরাইট বা গোপনীয়তার অধিকার লঙ্ঘন করে;",
    vi: "Vi phạm quyền sở hữu trí tuệ, bản quyền hoặc quyền riêng tư của bên thứ ba;",
    sw: "Inakiuka haki za hakimiliki, chapa au faragha za mtu mwingine;"
  },
  s2b5: {
    en: "Contains malware, viruses, phishing links, or unauthorized commercial spam.",
    ur: "وائرس، فِشنگ لنکس یا غیر مجاز سپیم پر مشتمل ہو؛",
    es: "Contenga malware, virus, enlaces de phishing o spam comercial no autorizado.",
    fr: "Contient des virus, liens de phishing ou spams commerciaux non autorisés.",
    ar: "يحتوي على برامج ضارة أو فيروسات أو روابط احتيالية أو رسائل مزعجة.",
    hi: "मैलवेयर, वायरस, फ़िशिंग लिंक या अनधिकृत स्पैम शामिल हो।",
    zh: "包含恶意软件、病毒、钓鱼链接或未经授权的商业垃圾邮件。",
    pt: "Contenha malware, vírus, links de phishing ou spam não autorizado.",
    ru: "Содержит вредоносные программы, вирусы, фишинговые ссылки или спам.",
    de: "Malware, Viren, Phishing-Links oder unaufgeforderten Spam enthält.",
    ja: "マルウェア、ウイルス、フィッシングリンク、またはスパムを含むもの。",
    ko: "악성코드, 바이러스, 피싱 링크 또는 무단 상업성 스팸을 포함하는 경우.",
    it: "Contenga malware, virus, link di phishing o spam non autorizzato.",
    tr: "Kötü amaçlı yazılım, virüs, olta takımı bağlantısı veya spam içeren.",
    id: "Mengandung malware, virus, tautan phishing, atau spam yang tidak diizinkan.",
    bn: "মালওয়্যার, ভাইরাস, ফিশিং লিঙ্ক বা অননুমোদিত স্প্যাম অন্তর্ভুক্ত।",
    vi: "Chứa phần mềm độc hại, virus, liên kết lừa đảo hoặc thư rác thương mại.",
    sw: "Inahusisha virusi, viungo vya ulaghai au ujumbe usiotakiwa wa kibiashara."
  },
  s2outro: {
    en: "2.2. Cardzy reserves the right to review, flag, or remove any card or invitation that violates this policy and suspend or terminate non-compliant accounts without prior notice.",
    ur: "2.2. کارڈزی کو اس پالیسی کی خلاف ورزی کرنے والے کسی بھی کارڈ کو ہٹانے اور اکاؤنٹس کو بغیر کسی اطلاع کے منسوخ کرنے کا حق حاصل ہے۔",
    es: "2.2. Cardzy se reserva el derecho de revisar o eliminar cualquier tarjeta que viole esta política y suspender cuentas sin previo aviso.",
    fr: "2.2. Cardzy se réserve le droit de supprimer toute carte violant cette politique et de suspendre les comptes sans préavis.",
    ar: "2.2. يحتفظ كاردزي بالحق في مراجعة أو إزالة أي بطاقة تخالف هذه السياسة وتعليق الحسابات دون إشعار مسبق.",
    hi: "2.2. Cardzy इस नीति का उल्लंघन करने वाले किसी भी कार्ड को हटाने और बिना किसी सूचना के खातों को निलंबित करने का अधिकार सुरक्षित रखता है।",
    zh: "2.2. Cardzy 保留审查、标记或删除任何违反本政策的贺卡，并在无需事先通知的情况下封禁违规账户的权利。",
    pt: "2.2. O Cardzy reserva-se o direito de remover qualquer cartão que viole esta política e suspender contas sem aviso prévio.",
    ru: "2.2. Cardzy оставляет за собой право удалять открытки, нарушающие правила, и блокировать аккаунты без предварительного уведомления.",
    de: "2.2. Cardzy behält sich das Recht vor, Regelverstöße zu entfernen und Konten ohne Vorankündigung zu sperren.",
    ja: "2.2. Cardzyは本規約に違反するカードを削除し、事前の通知なしに違反アカウントを停止または削除する権利を留保します。",
    ko: "2.2. Cardzy는 본 정책을 위반한 카드를 삭제하고 사전 통보 없이 해당 계정을 정지할 권리를 보유합니다.",
    it: "2.2. Cardzy si riserva il diritto di rimuovere i biglietti non conformi e sospendere gli account senza preavviso.",
    tr: "2.2. Cardzy, bu politikayı ihlal eden kartları kaldırma ve hesapları önceden haber vermeksizin askıya alma hakkını saklı tutar.",
    id: "2.2. Cardzy berhak meninjau atau menghapus kartu yang melanggar dan menangguhkan akun tanpa pemberitahuan sebelumnya.",
    bn: "২.২. Cardzy এই নীতি লঙ্ঘনকারী যেকোনো کارڈ অপসারণ এবং পূর্ববর্তী নোটিশ ছাড়াই অ্যাকাউন্ট স্থগিত করার অধিকার রাখে।",
    vi: "2.2. Cardzy có quyền xem xét, xóa thiệp vi phạm và đình chỉ tài khoản mà không cần thông báo trước.",
    sw: "2.2. Cardzy inahifadhi haki ya kuondoa kadi inayokiuka na kufunga akaunti bila taarifa ya awali."
  },
  s3Title: { en: "3. Plans & Features (Free vs. Cardzy Pro)", ur: "3. پلانز اور خصوصیات (مفت بمقابلہ پرو)", es: "3. Planes y Funciones (Gratis vs Pro)", fr: "3. Formules et Fonctionnalités (Gratuit vs Pro)", ar: "3. الباقات والخصائص (المجانية مقابل الاحترافية)", hi: "3. प्लान और सुविधाएं (मुफ़्त बनाम प्रो)", zh: "3. 方案与权益（免费版 vs Pro 版）", pt: "3. Planos e Recursos (Gratuito vs Pro)", ru: "3. Тарифы и возможности (Free vs Pro)", de: "3. Tarife & Funktionen (Gratis vs. Pro)", ja: "3. プランと機能（Free vs Pro）", ko: "3. 요금제 및 기능 (무료 vs Pro)", it: "3. Piani e Funzionalità (Gratuito vs Pro)", tr: "3. Planlar ve Özellikler (Ücretsiz vs Pro)", id: "3. Paket & Fitur (Gratis vs Pro)", bn: "৩. প্ল্যান ও বৈশিষ্ট্য (ফ্রি বনাম প্রো)", vi: "3. Gói & Tính Năng (Miễn phí vs Pro)", sw: "3. Mipango na Vipengele (Bure vs Pro)" },
  s3p1: {
    en: "3.1. Free Plan: Cardzy offers free digital wish-card creation with basic personalization options. Free cards are provided 'as is' and may display Cardzy branding.",
    ur: "3.1. فری پلان: کارڈزی بنیادی آپشنز کے ساتھ مفت ڈیجیٹل کارڈ بنانے کی سہولت دیتا ہے۔ مفت کارڈز پر کارڈزی برانڈنگ شامل ہو سکتی ہے۔",
    es: "3.1. Plan Gratuito: Cardzy ofrece creación gratuita de tarjetas digitales con opciones básicas. Las tarjetas pueden mostrar la marca Cardzy.",
    fr: "3.1. Forfait Gratuit : Cardzy propose la création gratuite de cartes de vœux. Les cartes gratuites peuvent afficher le logo Cardzy.",
    ar: "3.1. الخطة المجانية: يقدم كاردزي إنشاء بطاقات رقمية مجانًا مع خيارات مخصصة أساسية قد تحمل علامة كاردزي التجارية.",
    hi: "3.1. मुफ़्त प्लान: Cardzy बुनियादी विकल्पों के साथ मुफ़्त कार्ड बनाने की सुविधा देता है। मुफ़्त कार्ड पर Cardzy ब्रांडिंग हो सकती है।",
    zh: "3.1. 免费方案：Cardzy 提供基础个性化选项的免费数字贺卡制作。免费版贺卡按原样提供，且可能包含 Cardzy 品牌水印。",
    pt: "3.1. Plano Gratuito: O Cardzy oferece criação gratuita de cartões digitais básicos que podem conter a marca Cardzy.",
    ru: "3.1. Бесплатный тариф: Cardzy позволяет бесплатно создавать открытки с базовыми опциями. На них может отображаться водяной знак Cardzy.",
    de: "3.1. Kostenloser Tarif: Cardzy bietet kostenlose digitale Karten mit Basisoptionen an. Diese können das Cardzy-Logo enthalten.",
    ja: "3.1. 無料プラン：基本機能を備えたデジタルカードを無料で作成できます。無料カードにはCardzyのロゴが表示される場合があります。",
    ko: "3.1. 무료 요금제: Cardzy는 기본 기능을 갖춘 무료 디지털 소원 카드 제작을 제공합니다. 무료 카드에는 Cardzy 로고가 표시될 수 있습니다.",
    it: "3.1. Piano Gratuito: Cardzy offre la creazione gratuita di biglietti digitali di base. I biglietti gratuiti possono mostrare il marchio Cardzy.",
    tr: "3.1. Ücretsiz Plan: Cardzy, temel seçeneklerle ücretsiz dijital kart oluşturma olanağı sunar. Ücretsiz kartlar Cardzy logosu içerebilir.",
    id: "3.1. Paket Gratis: Cardzy menyediakan pembuatan kartu digital gratis dengan opsi dasar yang dapat menampilkan watermark Cardzy.",
    bn: "৩.১. ফ্রি প্ল্যান: Cardzy সাধারণ অপশন সহ বিনামূল্যে উইশ-کارڈ তৈরির সুযোগ দেয়। এতে Cardzy ব্র্যান্ডিং থাকতে পারে।",
    vi: "3.1. Gói Miễn Phí: Cardzy cung cấp tính năng tạo thiệp miễn phí cơ bản. Thiệp miễn phí có thể hiển thị thương hiệu Cardzy.",
    sw: "3.1. Mpango wa Bure: Cardzy inatoa uundaji wa kadi za bure zilizo na chaguzi za msingi ambazo zinaweza kuwa na chapa ya Cardzy."
  },
  s3p2: {
    en: "3.2. Cardzy Pro Plan: Premium event invitation features (such as WhatsApp RSVP tracking, Google Maps integration, live countdowns, 18-language support, and ad/brand removal) require a paid Cardzy Pro upgrade.",
    ur: "3.2. کارڈزی پرو پلان: پریمیئم خصوصیات (جیسے واٹس ایپ آر ایس وی پی، گوگل میپس، لائیو کاؤنٹ ڈاؤن اور واٹر مارک کا خاتمہ) کے لیے پرو اپ گریڈ ضروری ہے۔",
    es: "3.2. Plan Cardzy Pro: Funciones avanzadas de invitación (RSVP por WhatsApp, Google Maps, cuenta regresiva y remoción de marca) requieren Cardzy Pro.",
    fr: "3.2. Forfait Cardzy Pro : Les fonctionnalités premium (RSVP WhatsApp, Google Maps, décompte, retrait du logo) nécessitent Cardzy Pro.",
    ar: "3.2. خطة Cardzy Pro: تتطلب المزايا المتقدمة (مثل تأكيد الحضور، الخرائط، العداد وإزالة العلامة المائية) ترقية احترافية مدفوعة.",
    hi: "3.2. Cardzy Pro प्लान: प्रीमियम सुविधाओं (जैसे व्हाट्सएप RSVP, गूगल मैप्स, लाइव काउंटडाउन और विज्ञापन हटाने) के लिए भुगतान की आवश्यकता है।",
    zh: "3.2. Cardzy Pro 尊享版：高级邀请函功能（如 WhatsApp RSVP 跟踪、Google Maps 地图指引、实时倒计时、18 种语言及无水印展示）需付费升级。",
    pt: "3.2. Plano Cardzy Pro: Recursos premium (RSVP no WhatsApp, Google Maps, contagem regressiva e remoção de marca) exigem o Cardzy Pro.",
    ru: "3.2. Тариф Cardzy Pro: Премиум-функции (RSVP в WhatsApp, Google Maps, обратный отсчет и удаление бренда) доступны в платной версии Pro.",
    de: "3.2. Cardzy Pro Tarif: Premium-Funktionen (WhatsApp-RSVP, Google Maps, Countdown & ohne Wasserzeichen) erfordern das kostenpflichtige Upgrade.",
    ja: "3.2. Cardzy Proプラン：プレミアム機能（WhatsApp RSVP追跡、Googleマップ案内、カウントダウン、ロゴ非表示など）は有料版で利用可能です。",
    ko: "3.2. Cardzy Pro 요금제: 프리미엄 기능(WhatsApp RSVP, Google 지도 연동, 카운트다운, 로고 제거)은 유료 업그레이드가 필요합니다.",
    it: "3.2. Piano Cardzy Pro: Le funzionalità avanzate (RSVP WhatsApp, Google Maps, conto alla rovescia, rimozione logo) richiedono Cardzy Pro.",
    tr: "3.2. Cardzy Pro Planı: Premium davetiye özellikleri (WhatsApp RSVP, Google Haritalar, geri sayım ve logosuz kullanım) ücretli Pro üyelik gerektirir.",
    id: "3.2. Paket Cardzy Pro: Fitur undangan premium (RSVP WhatsApp, Google Maps, hitung mundur, dan hapus watermark) memerlukan upgrade Pro.",
    bn: "৩.২. Cardzy Pro প্ল্যান: প্রিমিয়াম ফিচার (যেমন হোয়াটসঅ্যাপ RSVP, গুগল ম্যাপস, কাউন্টডাউন ও ওয়াটারমার্ক অপসারণ) এর জন্য প্রো আপডেট আবশ্যক।",
    vi: "3.2. Gói Cardzy Pro: Các tính năng cao cấp (RSVP WhatsApp, Google Maps, đếm ngược, xóa logo) yêu cầu nâng cấp gói Pro trả phí.",
    sw: "3.2. Mpango wa Cardzy Pro: Vipengele vya juu vya mwaliko (RSVP WhatsApp, Google Maps, kuhesabu na kuondoa chapa) vinahitaji Cardzy Pro."
  },
  s3p3: {
    en: "3.3. Features included in free and paid tiers are detailed on our Pricing page and may be updated periodically.",
    ur: "3.3. مفت اور پرو پلانز کی تفصیلات ہماری پرائسنگ پیج پر موجود ہیں جنہیں وقت کے ساتھ اپ ڈیٹ کیا جا سکتا ہے۔",
    es: "3.3. Las funciones incluidas en cada plan se detallan en nuestra página de Precios y pueden actualizarse periódicamente.",
    fr: "3.3. Les fonctionnalités de chaque formule sont détaillées sur notre page Tarifs et peuvent être mises à jour.",
    ar: "3.3. يتم توضيح المزايا المضمنة في كل باقة على صفحة الأسعار الخاصة بنا ويمكن تحديثها دوريًا.",
    hi: "3.3. मुफ़्त और सशुल्क प्लान में शामिल सुविधाओं का विवरण हमारे मूल्य निर्धारण पृष्ठ पर दिया गया है।",
    zh: "3.3. 各版本包含的具体权益详见我们的定价页面（Pricing），相关内容可能会定期调整。",
    pt: "3.3. Os recursos incluídos em cada plano estão detalhados em nossa página de Preços e podem ser atualizados.",
    ru: "3.3. Подробная информация о функциях тарифов представлена на странице «Цены» и может периодически обновляться.",
    de: "3.3. Die in den Tarifen enthaltenen Funktionen sind auf unserer Preise-Seite aufgeführt und können aktualisiert werden.",
    ja: "3.3. 各プランの詳細は「料金ページ」に記載されており、定期的に更新される場合があります。",
    ko: "3.3. 각 요금제에 포함된 기능은 Pricing 페이지에 명시되어 있으며 주기적으로 업데이트될 수 있습니다.",
    it: "3.3. Le funzionalità incluse nei piani sono dettagliate nella pagina Prezzi e possono essere aggiornate.",
    tr: "3.3. Ücretsiz ve ücretli planlara dahil edilen özellikler Fiyatlandırma sayfamızda detaylandırılmıştır.",
    id: "3.3. Fitur yang tercakup dalam setiap paket dijelaskan di halaman Harga dan dapat diperbarui secara berkala.",
    bn: "৩.৩. প্রতিটি প্ল্যানের বিস্তারিত বিবরণ আমাদের প্রাইসিং পেজে দেওয়া আছে যা নিয়মিত আপডেট হতে পারে।",
    vi: "3.3. Chi tiết các tính năng được liệt kê tại trang Bảng Giá và có thể được cập nhật theo thời gian.",
    sw: "3.3. Vipengele vilivyomo katika mipango zote vimeelezwa kwenye ukurasa wetu wa Bei na vinaweza kusahihishwa."
  },
  s4Title: { en: "4. User-Generated Content & Rights", ur: "4. صارف کا مواد اور حقوق", es: "4. Contenido Generado por el Usuario", fr: "4. Contenu Généré par l'Utilisateur", ar: "4. المحتوى المنشأ بواسطة المستخدم وحقوقه", hi: "4. उपयोगकर्ता द्वारा बनाई गई सामग्री और अधिकार", zh: "4. 用户生成内容与知识产权", pt: "4. Conteúdo do Usuário e Direitos", ru: "4. Пользовательский контент и права", de: "4. Nutzergenerierte Inhalte & Rechte", ja: "4. ユーザーコンテンツと権利", ko: "4. 사용자 생성 콘텐츠 및 권리", it: "4. Contenuti dell'Utente e Diritti", tr: "4. Kullanıcı İçeriği ve Haklar", id: "4. Konten Pengguna & Hak-hak", bn: "৪. ব্যবহারকারীর কনটেন্ট ও অধিকার", vi: "4. Nội Dung Do Người Dùng Tạo & Quyền", sw: "4. Maudhui ya Mtumiaji na Haki" },
  s4p1: {
    en: "4.1. Your Ownership: You retain full ownership of all custom text, photos, logos, and personal media uploaded to your cards or invitations ('User Content').",
    ur: "4.1. آپ کی ملکیت: آپ اپنے کارڈز پر اپ لوڈ کی گئی تمام تصاویر، متن اور پرسنل میڈیا کے مکمل مالک رہتے ہیں۔",
    es: "4.1. Su Propiedad: Conserva la propiedad total de todos los textos, fotos y contenido que suba a sus tarjetas ('Contenido del Usuario').",
    fr: "4.1. Votre Propriété : Vous conservez la propriété de tous les textes, photos et contenus téléchargés ('Contenu Utilisateur').",
    ar: "4.1. ملكيتك: أنت تحتفظ بالملكية الكاملة لجميع النصوص والصور والوسائط المرفوعة على بطاقاتك ('محتوى المستخدم').",
    hi: "4.1. आपका स्वामित्व: आप अपने कार्ड या निमंत्रण पर अपलोड किए गए सभी टेक्स्ट, फ़ोटो और मीडिया का पूर्ण स्वामित्व बनाए रखते हैं।",
    zh: "4.1. 您的所有权：您对上传至贺卡或邀请函的所有自定义文字、照片、Logo 及个人媒体（统称“用户内容”）保留完整的所有权。",
    pt: "4.1. Sua Propriedade: Você mantém a propriedade total de todos os textos, fotos e mídias enviadas aos seus cartões.",
    ru: "4.1. Ваша собственность: Вы сохраняете права собственности на весь текст, фотографии и медиафайлы, загруженные на карты.",
    de: "4.1. Ihr Eigentum: Sie behalten das volle Eigentum an allen hochgeladenen Texten, Fotos und Medien ('Nutzerinhalte').",
    ja: "4.1. お客様の所有権：作成したカードにアップロードされたテキスト、写真、ロゴ等の所有権はお客様に帰属します。",
    ko: "4.1. 귀하의 소유권: 귀하는 카드에 업로드한 모든 텍스트, 사진, 로고 및 개인 미디어에 대한 완전한 소유권을 유지합니다.",
    it: "4.1. Tua Proprietà: Mantieni la piena proprietà di tutti i testi, foto e contenuti caricati sui tuoi biglietti.",
    tr: "4.1. Sizin Mülkiyetiniz: Kartlarınıza yüklediğiniz tüm metin, fotoğraf ve görsellerin mülkiyeti tamamen size aittir.",
    id: "4.1. Kepemilikan Anda: Anda tetap memiliki hak milik penuh atas semua teks, foto, dan media yang diunggah ke kartu Anda.",
    bn: "৪.১. আপনার মালিকানা: আপনার کارڈে আপলোড করা সমস্ত টেক্সট, ফটো এবং মিডিয়ার পূর্ণ মালিকানা আপনারই থাকবে।",
    vi: "4.1. Quyền Sở Hữu: Bạn giữ toàn bộ quyền sở hữu đối với văn bản, hình ảnh và phương tiện bạn tải lên thiệp.",
    sw: "4.1. Umiliki Wako: Unahifadhi umiliki kamili wa maandishi, picha na maudhui yote unayoweka kwenye kadi zako."
  },
  s4p2: {
    en: "4.2. License to Cardzy: By uploading User Content, you grant Cardzy a worldwide, non-exclusive, royalty-free license to store, host, render, display, and transmit your content solely for the purpose of operating, rendering, and delivering your cards and invitations to your designated recipients.",
    ur: "4.2. کارڈزی کے لیے لائسنس: مواد اپ لوڈ کر کے، آپ کارڈزی کو کارڈز دکھانے اور بھیجنے کے لیے مواد استعمال کرنے کا غیر مشروط حق دیتے ہیں۔",
    es: "4.2. Licencia a Cardzy: Otorga a Cardzy una licencia para almacenar, renderizar y transmitir su contenido con el único fin de entregar sus tarjetas.",
    fr: "4.2. Licence accordée à Cardzy : Vous accordez à Cardzy une licence permettant de stocker et d'afficher votre contenu afin de livrer vos cartes.",
    ar: "4.2. ترخيص لكاردزي: يمنح رفع المحتوى كاردزي ترخيصًا لعرض ومعالجة المحتوى بهدف تقديم وتوصيل بطاقاتك للجهات المستهدفة.",
    hi: "4.2. Cardzy को लाइसेंस: सामग्री अपलोड करके, आप Cardzy को अपने कार्ड प्रदान करने और वितरित करने के लिए लाइसेंस प्रदान करते हैं।",
    zh: "4.2. 对 Cardzy 的许可授权：通过上传用户内容，您授予 Cardzy 一项全球性、非独占且免版税的许可，仅用于存储、渲染、展示和分发您的贺卡给受邀接收者。",
    pt: "4.2. Licença ao Cardzy: Ao enviar conteúdo, você concede ao Cardzy uma licença para armazenar e exibir seu conteúdo a fim de entregar seus cartões.",
    ru: "4.2. Лицензия Cardzy: Загружая контент, вы предоставляете Cardzy право отображать и передавать его исключительно для доставки ваших карт.",
    de: "4.2. Lizenz an Cardzy: Sie gewähren Cardzy eine Lizenz zum Speichern und Anzeigen Ihrer Inhalte zum Zweck der Bereitstellung Ihrer Karten.",
    ja: "4.2. Cardzyへのライセンス：受取人にカードを配信・表示する目的のためにのみ、Cardzyにコンテンツの保存および表示権限を付与します。",
    ko: "4.2. Cardzy에 대한 라이선스: 콘텐츠를 업로드함으로써 귀하는 카드를 전달하고 표시하는 목적으로 Cardzy에 라이선스를 부여합니다.",
    it: "4.2. Licenza a Cardzy: Caricando i contenuti, concedi a Cardzy una licenza per memorizzare e mostrare il contenuto al fine di consegnare i biglietti.",
    tr: "4.2. Cardzy Lisansı: İçerik yükleyerek, Cardzy'ye kartlarınızı teslim etmek amacıyla içeriğinizi saklama ve görüntüleme lisansı verirsiniz.",
    id: "4.2. Lisensi untuk Cardzy: Dengan mengunggah konten, Anda memberikan Cardzy lisensi untuk menyimpan dan menampilkan konten demi mengirimkan kartu Anda.",
    bn: "৪.২. Cardzy-কে লাইসেন্স: কনটেন্ট আপলোড করে আপনি Cardzy-কে তা প্রদর্শন এবং নির্দিষ্ট প্রাপকদের কাছে পাঠানোর অনুমতি দেন।",
    vi: "4.2. Giấy Phép Cho Cardzy: Khi tải lên nội dung, bạn cấp cho Cardzy quyền lưu trữ và hiển thị nội dung để chuyển thiệp tới người nhận.",
    sw: "4.2. Leseni kwa Cardzy: Kwa kuweka maudhui, unatoa leseni kwa Cardzy kuhifadhi na kuonyesha maudhui ili kufikisha kadi zako."
  },
  s4p3: {
    en: "4.3. You represent and warrant that you own or have obtained all necessary rights and permissions to use any photo, graphic, or font uploaded to Cardzy.",
    ur: "4.3. آپ ضمانت دیتے ہیں کہ آپ کے پاس اپ لوڈ کردہ تمام تصاویر اور فونٹس استعمال کرنے کے قانونی حقوق موجود ہیں۔",
    es: "4.3. Garantiza que posee o ha obtenido los permisos necesarios sobre cualquier foto o fuente subida a Cardzy.",
    fr: "4.3. Vous garantissez que vous détentez les droits nécessaires sur toutes les photos ou polices téléchargées sur Cardzy.",
    ar: "4.3. أنت تقر وتضمن أنك تمتلك أو حصلت على جميع الأذونات اللازمة لاستخدام أي صورة أو خط مرفوع على كاردزي.",
    hi: "4.3. आप आश्वस्त करते हैं कि आपके पास Cardzy पर अपलोड की गई किसी भी फ़ोटो या फ़ॉन्ट का उपयोग करने के सभी अधिकार मौजूद हैं।",
    zh: "4.3. 您声明并保证，对于上传至 Cardzy 的任何照片、图形或字体，您拥有合法的所有权或已取得必要的授权许可。",
    pt: "4.3. Você garante que possui ou obteve todas as permissões necessárias para usar fotos ou fontes enviadas ao Cardzy.",
    ru: "4.3. Вы гарантируете, что обладаете всеми необходимыми правами на использование загружаемых фотографий и шрифтов.",
    de: "4.3. Sie sichern zu, dass Sie über die erforderlichen Rechte an allen hochgeladenen Fotos oder Schriftarten verfügen.",
    ja: "4.3. アップロードする写真やフォント等の素材について、合法的な所有権または使用許諾を得ていることを保証するものとします。",
    ko: "4.3. 귀하는 Cardzy에 업로드한 사진이나 폰트를 사용할 수 있는 모든 정당한 권리를 보유하고 있음을 보증합니다.",
    it: "4.3. Garantisci di possedere o aver ottenuto tutti i permessi necessari per utilizzare foto o font caricati su Cardzy.",
    tr: "4.3. Cardzy'ye yüklediğiniz tüm fotoğraf ve fontları kullanmak için gerekli izinlere sahip olduğunuzu beyan edersiniz.",
    id: "4.3. Anda menjamin bahwa Anda memiliki izin yang diperlukan untuk menggunakan foto atau font yang diunggah ke Cardzy.",
    bn: "৪.৩. আপনি নিশ্চয়তা দেন যে আপনার আপলোড করা সমস্ত ছবি বা ফন্টের আইনি ব্যবহারের অধিকার আপনার রয়েছে।",
    vi: "4.3. Bạn đảm bảo rằng bạn sở hữu hoặc đã có đủ quyền sử dụng mọi hình ảnh hoặc phông chữ tải lên Cardzy.",
    sw: "4.3. Unahakikisha kuwa unamiliki au umepata ruhusa zote zinazohitajika kutumia picha au fonti unazoweka kwenye Cardzy."
  },
  s5Title: { en: "5. Payments, Pricing, and Refund Policy", ur: "5. ادائیگیاں، قیمتیں اور ریفنڈ پالیسی", es: "5. Pagos, Precios y Política de Reembolso", fr: "5. Paiements, Tarifs et Remboursements", ar: "5. المدفوعات والأسعار وسياسة الاسترداد", hi: "5. भुगतान, मूल्य निर्धारण और रिफंड नीति", zh: "5. 支付、定价与退款政策", pt: "5. Pagamentos, Preços e Reembolsos", ru: "5. Оплата, цены и правила возврата", de: "5. Zahlungen, Preise & Rückerstattungen", ja: "5. 支払い、料金および返金規定", ko: "5. 결제, 가격 책정 및 환불 방침", it: "5. Pagamenti, Prezzi e Rimborsi", tr: "5. Ödemeler, Fiyatlandırma ve İade Politikası", id: "5. Pembayaran, Harga, dan Pengembalian Dana", bn: "৫. পেমেন্ট, মূল্য নির্ধারণ ও রিফান্ড নীতি", vi: "5. Thanh Toán, Giá Cả & Hoàn Tiền", sw: "5. Malipo, Bei na Sera ya Kurudisha Pesa" },
  s5p1: {
    en: "5.1. Pricing: All fees for Cardzy Pro upgrades are listed on our website prior to purchase. Prices are subject to change, but changes will not affect active paid orders already completed.",
    ur: "5.1. قیمتیں: پرو اپ گریڈ کے تمام اخراجات ہماری ویب سائٹ پر درج ہیں۔ پہلے سے خریدی گئی سروس پر قیمت کی تبدیلی کا اثر نہیں ہوگا۔",
    es: "5.1. Precios: Las tarifas de Cardzy Pro se muestran en la web antes de la compra y no afectarán pedidos ya completados.",
    fr: "5.1. Tarifs : Les frais Cardzy Pro sont indiqués avant l'achat et n'affectent pas les commandes déjà réglées.",
    ar: "5.1. التسعير: يتم إدراج جميع رسوم ترقية Cardzy Pro على موقعنا قبل الشراء، ولا تؤثر التغييرات على الطلبات المكتملة.",
    hi: "5.1. मूल्य निर्धारण: Cardzy Pro अपग्रेड की सभी फीस खरीदारी से पहले दिखाई जाती है और पहले से पूरे किए गए ऑर्डर को प्रभावित नहीं करती है।",
    zh: "5.1. 价格说明：Cardzy Pro 方案的费用在购买前均公布于官网上。价格调整不会影响已经支付完成的历史订单。",
    pt: "5.1. Preços: As taxas do Cardzy Pro são mostradas no site antes da compra e não afetam compras já concluídas.",
    ru: "5.1. Цены: Стоимость Cardzy Pro указана на сайте до оплаты. Изменение цен не влияет на уже оплаченные заказы.",
    de: "5.1. Preise: Alle Gebühren für Cardzy Pro sind vor dem Kauf einsehbar. Preisänderungen betreffen bereits bezahlte Käufe nicht.",
    ja: "5.1. 料金：Cardzy Proの料金は購入前に表示されます。購入完了済みの注文に価格変更が影響することはありません。",
    ko: "5.1. 가격 책정: Cardzy Pro 비용은 구매 전 웹사이트에 표시되며 이미 완료된 결제에는 영향을 미치지 않습니다.",
    it: "5.1. Prezzi: Tutte le tariffe per Cardzy Pro sono indicate prima dell'acquisto e non influiscono sugli ordini già completati.",
    tr: "5.1. Fiyatlandırma: Cardzy Pro ücretleri satın alma öncesinde sitede belirtilir. Değişiklikler tamamlanmış siparişleri etkilemez.",
    id: "5.1. Harga: Biaya Cardzy Pro tercantum di situs sebelum pembelian. Perubahan harga tidak memengaruhi pesanan yang sudah selesai.",
    bn: "৫.১. মূল্য নির্ধারণ: Cardzy Pro-এর সমস্ত ফি কেনাকাটার আগে সাইটে দেখানো হয় এবং পুরোনো পেমেন্টে এর প্রভাব পড়ে না।",
    vi: "5.1. Giá Cả: Phí nâng cấp Cardzy Pro được niêm yết rõ ràng trước khi mua và không ảnh hưởng đến đơn hàng đã hoàn tất.",
    sw: "5.1. Bei: Ada za Cardzy Pro zimeonyeshwa kwenye tovuti kabla ya kununua. Mabadiliko ya bei hayatadhibiti oda zilizokamilika."
  },
  s5p2: {
    en: "5.2. Payment Processing: Payments are processed securely via third-party payment gateways. Cardzy does not store your full financial credentials or credit card details on our servers.",
    ur: "5.2. ادائیگی کی پروسیسنگ: ادائیگیاں تھرڈ پارٹی پیمنٹ گیٹ ویز کے ذریعے ہوتی ہیں۔ کارڈزی آپ کے کریڈٹ کارڈ کی تفصیلات محفوظ نہیں کرتا۔",
    es: "5.2. Procesamiento de Pagos: Se procesan a través de pasarelas seguras. Cardzy no almacena datos de tarjetas de crédito.",
    fr: "5.2. Traitement des Paiements : Les paiements sont sécurisés via des prestataires tiers. Cardzy ne stocke pas vos coordonnées bancaires.",
    ar: "5.2. معالجة المدفوعات: تتم المدفوعات بشكل آمن عبر بوابات الدفع. لا يخزن كاردزي تفاصيل بطاقتك الائتمانية.",
    hi: "5.2. भुगतान प्रसंस्करण: भुगतान सुरक्षित थर्ड-पार्टी गेटवे के माध्यम से किए जाते हैं। Cardzy कार्ड विवरण संग्रहीत नहीं करता है।",
    zh: "5.2. 支付处理：所有款项均通过第三方支付网关（如 Easypaisa / JazzCash / 信用卡等）安全处理。Cardzy 不在服务器上存储您的完整银行卡或敏感财务数据。",
    pt: "5.2. Processamento de Pagamento: Processados com segurança por terceiros. O Cardzy não armazena dados de cartão de crédito.",
    ru: "5.2. Обработка платежей: Платежи проводятся через надежные платежные шлюзы. Cardzy не хранит данные банковских карт.",
    de: "5.2. Zahlungsabwicklung: Zahlungen werden sicher über Drittanbieter abgewickelt. Cardzy speichert keine Kreditkartendaten.",
    ja: "5.2. 決済処理：決済は外部の安全な決済プロバイダ経由で行われます。Cardzyがクレジットカード情報を保持することはありません。",
    ko: "5.2. 결제 처리: 결제는 안전한 제3자 결제 대행사를 통해 처리됩니다. Cardzy는 귀하의 신용카드 정보를 저장하지 않습니다.",
    it: "5.2. Elaborazione dei Pagamenti: I pagamenti sono gestiti in modo sicuro da terze parti. Cardzy non memorizza i dati delle carte di credito.",
    tr: "5.2. Ödeme İşlemleri: Ödemeler güvenli üçüncü taraf ödeme sağlayıcıları ile yapılır. Cardzy kart bilgilerinizi saklamaz.",
    id: "5.2. Pemrosesan Pembayaran: Pembayaran diproses dengan aman melalui gerbang pembayaran resmi. Cardzy tidak menyimpan data kartu Anda.",
    bn: "৫.২. পেমেন্ট প্রসেসিং: পেমেন্টগুলি সুরক্ষিত পেমেন্ট গেটওয়ের মাধ্যমে পরিচালিত হয়। Cardzy কার্ড বিবরণ সংরক্ষণ করে না।",
    vi: "5.2. Xử Lý Thanh Toán: Thanh toán được xử lý an toàn qua cổng thanh toán trung gian. Cardzy không lưu thông tin thẻ của bạn.",
    sw: "5.2. Uprosesaji wa Malipo: Malipo yanasindikizwa kwa usalama kupitia mifumo ya malipo. Cardzy haihifadhi namba zako za kadi."
  },
  s5p3: {
    en: "5.3. Refund Policy: Due to the digital and instant nature of our service, once a Pro invitation link has been rendered or delivered, payments are generally non-refundable except where technical failure on Cardzy's part prevented service delivery. [REVIEW WITH LAWYER]",
    ur: "5.3. ریفنڈ پالیسی: سروس کی فوری نوعیت کی وجہ سے، کارڈ لنک جنریٹ ہونے کے بعد رقم قابلِ واپسی نہیں ہوتی سوائے تکنیکی خرابی کی صورت میں۔ [REVIEW WITH LAWYER]",
    es: "5.3. Reembolsos: Debido a la naturaleza digital, una vez generado el enlace Pro, el pago no es reembolsable salvo fallo técnico de Cardzy. [REVIEW WITH LAWYER]",
    fr: "5.3. Politique de Remboursement : En raison de la nature numérique du service, aucun remboursement n'est effectué après livraison sauf panne technique. [REVIEW WITH LAWYER]",
    ar: "5.3. سياسة الاسترداد: نظراً لطبيعة الخدمة الرقمية، فإن المدفوعات غير قابلة للاسترداد بعد إنشاء الرابط إلا في حالة وجود عطل فني. [REVIEW WITH LAWYER]",
    hi: "5.3. रिफंड नीति: डिजिटल सेवा की प्रकृति के कारण, प्रो लिंक बनने के बाद भुगतान सामान्यतः वापस नहीं होता है। [REVIEW WITH LAWYER]",
    zh: "5.3. 退款政策：鉴于本服务为在线即时交付的数字产品，一旦 Pro 版邀请函链接生成或发出，原则上不予退款，除非因 Cardzy 自身重大技术故障导致无法正常交付。[REVIEW WITH LAWYER]",
    pt: "5.3. Política de Reembolso: Devido à natureza digital, após a geração do link Pro, os pagamentos não são reembolsáveis salvo falha técnica. [REVIEW WITH LAWYER]",
    ru: "5.3. Правила возврата: В силу цифрового характера услуг, после создания Pro-ссылки средства не возвращаются, за исключением сбоев на стороне Cardzy. [REVIEW WITH LAWYER]",
    de: "5.3. Rückerstattung: Aufgrund der digitalen Natur sind Zahlungen nach Erstellung des Pro-Links grundsätzlich nicht erstattungsfähig. [REVIEW WITH LAWYER]",
    ja: "5.3. 返金規定：デジタルサービスの性質上、Proリンク発行後の返金は原則として行われません（弊社の障害による場合を除く）。[REVIEW WITH LAWYER]",
    ko: "5.3. 환불 방침: 디지털 제품의 특성상 Pro 링크가 생성된 후에는 환불이 불가합니다(시스템 오류로 인한 제공 불가 제외). [REVIEW WITH LAWYER]",
    it: "5.3. Politica di Rimborso: Data la natura digitale, una volta generato il link Pro, i pagamenti non sono rimborsabili salvo guasti tecnici. [REVIEW WITH LAWYER]",
    tr: "5.3. İade Politikası: Dijital hizmet doğası gereği, Pro bağlantısı oluşturulduktan sonra teknik bir arıza haricinde iade yapılmaz. [REVIEW WITH LAWYER]",
    id: "5.3. Kebijakan Pengembalian: Mengingat sifat layanan digital, pembayaran yang sudah selesai umumnya tidak dapat dikembalikan. [REVIEW WITH LAWYER]",
    bn: "৫.৩. রিফান্ড নীতি: ডিজিটাল সেবার কারণে, প্রো লিঙ্ক তৈরি হওয়ার পর টাকা সাধারণত ফেরতযোগ্য নয়। [REVIEW WITH LAWYER]",
    vi: "5.3. Chính Sách Hoàn Tiền: Do đặc thù dịch vụ số, sau khi tạo liên kết Pro, khoản thanh toán không được hoàn lại trừ lỗi kỹ thuật. [REVIEW WITH LAWYER]",
    sw: "5.3. Sera ya Kurudisha Pesa: Kwa sababu ya huduma ya dijitali, kiungo cha Pro kikishatengenezwa malipo hayarudishwa. [REVIEW WITH LAWYER]"
  },
  s6Title: { en: "6. Service Availability & Modifications", ur: "6. سروس کی دستیابی اور تبدیلیاں", es: "6. Disponibilidad del Servicio y Cambios", fr: "6. Disponibilité du Service et Modifications", ar: "6. توفر الخدمة والتعديلات", hi: "6. सेवा की उपलब्धता और संशोधन", zh: "6. 服务可用性与变更", pt: "6. Disponibilidade do Serviço e Modificações", ru: "6. Доступность сервиса и изменения", de: "6. Dienstverfügbarkeit & Änderungen", ja: "6. サービスの利用可能性と変更", ko: "6. 서비스 제공 및 변경", it: "6. Disponibilità del Servizio e Modifiche", tr: "6. Hizmet Kullanılabilirliği ve Değişiklikler", id: "6. Ketersediaan Layanan & Perubahan", bn: "৬. সেবার প্রাপ্যতা ও পরিবর্তনসমূহ", vi: "6. Tính Sẵn Có Của Dịch Vụ & Thay Đổi", sw: "6. Upatikanaji wa Huduma na Mabadiliko" },
  s6p1: {
    en: "6.1. We strive to maintain continuous service availability, but we do not guarantee uninterrupted or error-free operation. Cardzy may perform maintenance, updates, or emergency fixes that temporarily suspend access.",
    ur: "6.1. ہم مسلسل سروس کی دستیابی برقرار رکھنے کی کوشش کرتے ہیں، لیکن بلا تعطل آپریشن کی ضمانت نہیں دیتے۔",
    es: "6.1. Nos esforzamos por mantener el servicio disponible pero no garantizamos un funcionamiento ininterrumpido.",
    fr: "6.1. Nous nous efforçons de maintenir le service disponible mais ne garantissons pas un fonctionnement sans interruption.",
    ar: "6.1. نحن نسعى جاهدين للحفاظ على استمرارية الخدمة، ولكننا لا نضمن عدم حدوث انقطاع أو أخطاء ناتجة عن الصيانة.",
    hi: "6.1. हम निरंतर सेवा उपलब्धता बनाए रखने का प्रयास करते हैं, लेकिन निर्बाध संचालन की गारंटी नहीं देते हैं।",
    zh: "6.1. 我们力求保持服务的持续可用性，但不保证服务完全不受中断或绝无错误。Cardzy 可能会因维护、更新或紧急修复而暂停服务。",
    pt: "6.1. Esforçamo-nos para manter o serviço disponível, mas não garantimos operação ininterrupta sem falhas.",
    ru: "6.1. Мы стремимся к бесперебойной работе сервиса, но не гарантируем абсолютное отсутствие технических сбоев.",
    de: "6.1. Wir bemühen uns um eine dauerhafte Verfügbarkeit, garantieren jedoch keinen unterbrechungsfreien Betrieb.",
    ja: "6.1. 安定したサービス提供に努めますが、メンテナンス等により一時的にアクセスが中断される場合があります。",
    ko: "6.1. 당사는 지속적인 서비스 제공을 위해 노력하지만 무중단 운영을 보장하지는 않습니다.",
    it: "6.1. Ci impegniamo a garantire la disponibilità del servizio, ma non garantiamo un funzionamento ininterrotto.",
    tr: "6.1. Kesintisiz hizmet sunmaya çalışıyoruz ancak bakım nedeniyle geçici kesintiler yaşanabilir.",
    id: "6.1. Kami berusaha menjaga ketersediaan layanan, namun tidak menjamin pemeliharaan tanpa gangguan.",
    bn: "৬.১. ہم سب فراہم کرنے کی کوشش کرتے ہیں لیکن بلا تعطل آپریشن کی مکمل ضمانت نہیں دیتے۔",
    vi: "6.1. Chúng tôi nỗ lực duy trì dịch vụ liên tục nhưng không đảm bảo hệ thống không bao giờ gián đoạn.",
    sw: "6.1. Tunajitahidi kudumisha huduma, lakini hatuhakikishi huduma bila kukatizwa."
  },
  s7Title: { en: "7. Limitation of Liability", ur: "7. ذمہ داری کی حد", es: "7. Limitación de Responsabilidad", fr: "7. Limitation de Responsabilité", ar: "7. تحديد المسؤولية", hi: "7. देयता की सीमा", zh: "7. 责任限制条款", pt: "7. Limitação de Responsabilidade", ru: "7. Ограничение ответственности", de: "7. Haftungsbeschränkung", ja: "7. 責任の制限", ko: "7. 책임의 한계", it: "7. Limitazione di Responsabilità", tr: "7. Sorumluluğun Sınırlandırılması", id: "7. Batasan Tanggung Jawab", bn: "৭. দায়বদ্ধতার সীমাবদ্ধতা", vi: "7. Giới Hạn Trách Nhiệm", sw: "7. Ukomo wa Dhabihu" },
  s7p1: {
    en: "7.1. To the maximum extent permitted by applicable law, Cardzy and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service. [REVIEW WITH LAWYER]",
    ur: "7.1. قابلِ اطلاق قانون کے تحت، کارڈزی سروس کے استعمال سے ہونے والے کسی بھی بالواسطہ یا عارضی نقصان کا ذمہ دار نہیں ہوگا۔ [REVIEW WITH LAWYER]",
    es: "7.1. En la medida en que la ley lo permita, Cardzy no será responsable por daños indirectos o incidentales. [REVIEW WITH LAWYER]",
    fr: "7.1. Dans la mesure permise par la loi, Cardzy ne sera pas responsable des dommages indirects ou consécutifs. [REVIEW WITH LAWYER]",
    ar: "7.1. إلى الحد الأقصى الذي يسمح به القانون، لن يكون كاردزي مسؤولاً عن أي أضرار غير مباشرة ناتجة عن استخدام الخدمة. [REVIEW WITH LAWYER]",
    hi: "7.1. लागू कानून द्वारा अनुमति की अधिकतम सीमा तक, Cardzy अप्रत्यक्ष या आकस्मिक नुकसान के लिए उत्तरदायी नहीं होगा। [REVIEW WITH LAWYER]",
    zh: "7.1. 在适用法律允许的最大范围内，Cardzy 及其关联公司不对因使用本服务而引起的任何间接、附带或惩罚性损害承担责任。[REVIEW WITH LAWYER]",
    pt: "7.1. Na extensão permitida por lei, o Cardzy não será responsável por danos indiretos ou incidentais. [REVIEW WITH LAWYER]",
    ru: "7.1. В максимальной степени, разрешенной законом, Cardzy не несет ответственности за косвенный ущерб. [REVIEW WITH LAWYER]",
    de: "7.1. Soweit gesetzlich zulässig, haftet Cardzy nicht für mittelbare Schäden oder Folgeschäden. [REVIEW WITH LAWYER]",
    ja: "7.1. 法律が許容する最大限において、Cardzyはサービスの利用から生じる間接的損害について責任を負いません。[REVIEW WITH LAWYER]",
    ko: "7.1. 관련 법률이 허용하는 최대 범위 내에서 Cardzy는 간접적 또는 부수적 손해에 대해 책임을 지지 않습니다. [REVIEW WITH LAWYER]",
    it: "7.1. Nella misura consentita dalla legge, Cardzy non sarà responsabile per danni indiretti o incidentali. [REVIEW WITH LAWYER]",
    tr: "7.1. Yasal olarak izin verilen azami ölçüde, Cardzy dolaylı zararlardan sorumlu tutulamaz. [REVIEW WITH LAWYER]",
    id: "7.1. Sejauh diizinkan oleh hukum, Cardzy tidak bertanggung jawab atas kerugian tidak langsung. [REVIEW WITH LAWYER]",
    bn: "৭.১. প্রযোজ্য আইনের অধীনে Cardzy কোনো পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য দায়ী থাকবে না। [REVIEW WITH LAWYER]",
    vi: "7.1. Trong phạm vi pháp luật cho phép, Cardzy không chịu trách nhiệm đối với các thiệt hại gián tiếp. [REVIEW WITH LAWYER]",
    sw: "7.1. Kwa kiasi kinachoruhusiwa na sheria, Cardzy haitawajibika kwa madhara yasiyo ya moja kwa moja. [REVIEW WITH LAWYER]"
  },
  s8Title: { en: "8. Intellectual Property & Branding", ur: "8. ملکیت اور برانڈنگ", es: "8. Propiedad Intelectual y Marca", fr: "8. Propriété Intellectuelle et Marque", ar: "8. الملكية الفكرية والعلامة التجارية", hi: "8. बौद्धिक संपदा और ब्रांडिंग", zh: "8. 知识产权与品牌声明", pt: "8. Propriedade Intelectual e Marca", ru: "8. Интеллектуальная собственность и бренд", de: "8. Geistiges Eigentum & Marke", ja: "8. 知的財産権およびブランディング", ko: "8. 지적 재산권 및 브랜딩", it: "8. Proprietà Intellettuale e Marchio", tr: "8. Fikri Mülkiyet ve Marka", id: "8. Hak Kekayaan Intelektual & Merek", bn: "৮. বুদ্ধিবৃত্তিক সম্পদ ও ব্র্যান্ডিং", vi: "8. Sở Hữu Trí Tuệ & Thương Hiệu", sw: "8. Hakimiliki na Chapa" },
  s8p1: {
    en: "8.1. The Cardzy platform, website design, code, logos, template graphics, and UI elements are the exclusive property of Cardzy and protected by intellectual property laws. You may not copy, reverse engineer, or scrape our platform without permission.",
    ur: "8.1. کارڈزی پلیٹ فارم، کوڈ، لوگوز اور ڈیزائن کارڈزی کی خصوصی ملکیت ہیں۔ اجازت کے بغیر کاپی یا اسکریپ کرنے کی ممانعت ہے۔",
    es: "8.1. La plataforma, diseños, código y logos de Cardzy son propiedad exclusiva de Cardzy. Queda prohibida su copia o raspado sin permiso.",
    fr: "8.1. La plateforme, les modèles et logos Cardzy sont la propriété exclusive de Cardzy. Toute copie sans autorisation est interdite.",
    ar: "8.1. جميع تصاميم وأكواد وشعارات منصة كاردزي هي ملكية حصرية لكاردزي. يمنع النسخ أو الهندسة العكسية دون إذن.",
    hi: "8.1. Cardzy प्लेटफॉर्म, डिजाइन, कोड और लोगो Cardzy की अनन्य संपत्ति हैं। बिना अनुमति के कॉपी करना मना है।",
    zh: "8.1. Cardzy 平台、网站设计、底层代码、Logo、模板UI图案均为 Cardzy 的独家财产，严禁未经授权擅自复制、反向工程或抓取。",
    pt: "8.1. A plataforma, design e logos do Cardzy são propriedade exclusiva do Cardzy. É proibido copiar sem autorização.",
    ru: "8.1. Платформа, дизайн, код и логотипы Cardzy являются исключительной собственностью Cardzy и защищены законом.",
    de: "8.1. Die Plattform, Designs und Logos von Cardzy sind exklusives Eigentum von Cardzy und urheberrechtlich geschützt.",
    ja: "8.1. Cardzyのプラットフォーム、Webデザイン、コード、ロゴ、テンプレートはCardzyの独占的財産であり、無断複製を禁じます。",
    ko: "8.1. Cardzy 플랫폼, 디자인, 코드 및 로고는 Cardzy의 독점 자산이며 무단 복제 및 스크래핑을 금지합니다.",
    it: "8.1. La piattaforma, i design e i loghi di Cardzy sono di proprietà esclusiva di Cardzy e protetti dalle leggi sul copyright.",
    tr: "8.1. Cardzy platformu, tasarımı, kodları ve logosu Cardzy'nin özel mülkiyetidir. İzinsiz kopyalanamaz.",
    id: "8.1. Platform, desain, kode, dan logo Cardzy adalah milik eksklusif Cardzy dan dilindungi hukum.",
    bn: "৮.১. Cardzy প্ল্যাটফর্ম, ডিজাইন, কোড এবং লোগো Cardzy-এর একচেটিয়া সম্পত্তি। অনুমতি ছাড়া কপি করা নিষিদ্ধ।",
    vi: "8.1. Nền tảng, thiết kế và logo của Cardzy là tài sản độc quyền của Cardzy. Nghiêm cấm sao chép khi chưa được phép.",
    sw: "8.1. Jukwaa, muundo na nembo za Cardzy ni mali ya Cardzy. Ni marufuku kunakili bila idhini."
  },
  s9Title: { en: "9. Account Termination", ur: "9. اکاؤنٹ کی منسوخی", es: "9. Cancelación de la Cuenta", fr: "9. Résiliation de Compte", ar: "9. إنهاء الحساب", hi: "9. खाता समाप्ति", zh: "9. 账户终止与封禁", pt: "9. Rescisão de Conta", ru: "9. Прекращение действия аккаунта", de: "9. Kontokündigung", ja: "9. アカウントの停止・解約", ko: "9. 계정 해지 및 중단", it: "9. Chiusura dell'Account", tr: "9. Hesap Feshi", id: "9. Penghentian Akun", bn: "৯. অ্যাকাউন্ট সমাপ্তি", vi: "9. Chấm Dứt Tài Khoản", sw: "9. Kufunga Akaunti" },
  s9p1: {
    en: "9.1. You may stop using the Service at any time. Cardzy reserves the right to suspend or terminate accounts that breach these Terms or engage in abuse.",
    ur: "9.1. آپ کسی بھی وقت سروس کا استعمال چھوڑ سکتے ہیں۔ کارڈزی ان اکاؤنٹس کو معطل کرنے کا حق رکھتا ہے جو شرائط کی خلاف ورزی کرتے ہیں۔",
    es: "9.1. Puede dejar de usar el Servicio en cualquier momento. Cardzy se reserva el derecho de suspender cuentas que violen estos Términos.",
    fr: "9.1. Vous pouvez cesser d'utiliser le service à tout moment. Cardzy se réserve le droit de suspendre les comptes en infraction.",
    ar: "9.1. يمكنك التوقف عن استخدام الخدمة في أي وقت. يحتفظ كاردزي بالحق في إنهاء الحسابات التي تنتهك هذه الشروط.",
    hi: "9.1. आप किसी भी समय सेवा का उपयोग बंद कर सकते हैं। Cardzy इन शर्तों का उल्लंघन करने वाले खातों को निलंबित करने का अधिकार रखता है।",
    zh: "9.1. 您可以随时停止使用本服务。Cardzy 保留对违反本条款或滥用系统的账户实施暂停或终止服务的权利。",
    pt: "9.1. Você pode parar de usar o Serviço a qualquer momento. O Cardzy reserva-se o direito de suspender contas infratoras.",
    ru: "9.1. Вы можете прекратить использование в любое время. Cardzy оставляет за собой право блокировать аккаунты нарушителей.",
    de: "9.1. Sie können die Nutzung jederzeit beenden. Cardzy kann Konten bei Verstößen gegen diese Bedingungen sperren.",
    ja: "9.1. お客様はいつでも利用を停止できます。Cardzyは利用規約に違反したアカウントを停止する権利を有します。",
    ko: "9.1. 귀하는 언제든지 이용을 중단할 수 있습니다. Cardzy는 약관을 위반한 계정을 정지할 권리를 집니다.",
    it: "9.1. Puoi interrompere l'uso del Servizio in qualsiasi momento. Cardzy si riserva il diritto di sospendere gli account violatori.",
    tr: "9.1. Hizmet kullanımını dilediğiniz zaman bırakabilirsiniz. Cardzy kuralları ihlal eden hesapları kapatma hakkını saklı tutar.",
    id: "9.1. Anda dapat berhenti menggunakan Layanan kapan saja. Cardzy berhak menangguhkan akun yang melanggar ketentuan.",
    bn: "৯.১. আপনি যেকোনো সময় সেবা ব্যবহার বন্ধ করতে পারেন। Cardzy নীতি লঙ্ঘনকারী অ্যাকাউন্ট স্থগিত করার অধিকার রাখে।",
    vi: "9.1. Bạn có thể ngừng sử dụng dịch vụ bất kỳ lúc nào. Cardzy có quyền khóa các tài khoản vi phạm điều khoản.",
    sw: "9.1. Unaweza kuacha kutumia Huduma wakati wowote. Cardzy inahifadhi haki ya kufunga akaunti zinazokiuka vigezo."
  },
  s10Title: { en: "10. Governing Law & Dispute Resolution", ur: "10. لاگو قانون اور تنازعات کا حل", es: "10. Ley Aplicable y Jurisdicción", fr: "10. Droit Applicable et Litiges", ar: "10. القانون الساري وحل النزاعات", hi: "10. लागू कानून और विवाद समाधान", zh: "10. 适用法律与争议解决", pt: "10. Lei Aplicável e Jurisdição", ru: "10. Применимое право и разрешение споров", de: "10. Anwendbares Recht & Streitbeilegung", ja: "10. 准拠法および裁判管轄", ko: "10. 준거법 및 분쟁 해결", it: "10. Legge Applicabile e Controversie", tr: "10. Uygulanacak Hukuk ve Uyuşmazlıklar", id: "10. Hukum yang Berlaku & Sengketa", bn: "১০. প্রযোজ্য আইন ও বিরোধ নিষ্পত্তি", vi: "10. Luật Áp Dụng & Giải Quyết Tranh Chấp", sw: "10. Sheria Inayotumika na Migogoro" },
  s10p1: {
    en: "10.1. These Terms are governed by the laws of the Islamic Republic of Pakistan, without regard to conflict of law principles. [REVIEW WITH LAWYER]",
    ur: "10.1. یہ شرائط اسلامی جمہوریہ پاکستان کے قوانین کے تابع ہیں۔ [REVIEW WITH LAWYER]",
    es: "10.1. Estos Términos se rigen por las leyes de la República Islámica de Pakistán. [REVIEW WITH LAWYER]",
    fr: "10.1. Ces conditions sont régies par les lois de la République Islamique du Pakistan. [REVIEW WITH LAWYER]",
    ar: "10.1. تخضع هذه الشروط لقوانين جمهورية إسلام أباد الباكستانية. [REVIEW WITH LAWYER]",
    hi: "10.1. ये शर्तें इस्लामिक रिपब्लिक ऑफ पाकिस्तान के कानूनों द्वारा शासित होती हैं। [REVIEW WITH LAWYER]",
    zh: "10.1. 本条款受巴基斯坦伊斯兰共和国法律管辖，不考虑法律冲突原则。[REVIEW WITH LAWYER]",
    pt: "10.1. Estes Termos são regidos pelas leis da República Islâmica do Paquistão. [REVIEW WITH LAWYER]",
    ru: "10.1. Настоящие Условия регулируются законодательством Исламской Республики Пакистан. [REVIEW WITH LAWYER]",
    de: "10.1. Diese Bedingungen unterliegen den Gesetzen der Islamischen Republik Pakistan. [REVIEW WITH LAWYER]",
    ja: "10.1. 本規約はパキスタン回教共和国の法律に准拠します。[REVIEW WITH LAWYER]",
    ko: "10.1. 본 약관은 파키스탄 이슬람 공화국 법률의 적용을 받습니다. [REVIEW WITH LAWYER]",
    it: "10.1. Questi Termini sono regolati dalle leggi della Repubblica Islamica del Pakistan. [REVIEW WITH LAWYER]",
    tr: "10.1. Bu Koşullar Pakistan İslam Cumhuriyeti yasalarına tabidir. [REVIEW WITH LAWYER]",
    id: "10.1. Ketentuan ini diatur oleh hukum Republik Islam Pakistan. [REVIEW WITH LAWYER]",
    bn: "১০.১. এই শর্তাবলী ইসলামিক রিপাবলিক অব পাকিস্তানের আইনের অধীনে পরিচালিত। [REVIEW WITH LAWYER]",
    vi: "10.1. Điều khoản này được điều chỉnh bởi pháp luật của Cộng hòa Hồi giáo Pakistan. [REVIEW WITH LAWYER]",
    sw: "10.1. Vigezo hivi vinatawaliwa na sheria za Jamhuri ya Kiislamu ya Pakistan. [REVIEW WITH LAWYER]"
  },
  s11Title: { en: "11. Changes to Terms", ur: "11. شرائط میں تبدیلیاں", es: "11. Cambios en los Términos", fr: "11. Modifications des Conditions", ar: "11. التغييرات في الشروط", hi: "11. शर्तों में बदलाव", zh: "11. 条款修定", pt: "11. Alterações nos Termos", ru: "11. Изменение Условий", de: "11. Änderungen der Bedingungen", ja: "11. 利用規約の変更", ko: "11. 약관의 변경", it: "11. Modifiche ai Termini", tr: "11. Koşullardaki Değişiklikler", id: "11. Perubahan Ketentuan", bn: "১১. শর্তাবলীর পরিবর্তন", vi: "11. Thay Đổi Điều Khoản", sw: "11. Mabadiliko ya Vigezo" },
  s11p1: {
    en: "11.1. We may update these Terms from time to time. The revised date at the top of this page will indicate when changes take effect. Continued usage of Cardzy after changes constitutes acceptance.",
    ur: "11.1. ہم وقت کے ساتھ ان شرائط کو اپ ڈیٹ کر سکتے ہیں۔ تبدیلیوں کے بعد کارڈزی کا مسلسل استعمال قبولیت تصور ہوگا۔",
    es: "11.1. Podemos actualizar estos Términos periódicamente. El uso continuado después de los cambios implica su aceptación.",
    fr: "11.1. Nous pouvons mettre à jour ces conditions. L'utilisation continue du service après modifications vaut acceptation.",
    ar: "11.1. قد نقوم بتحديث هذه الشروط من وقت لآخر. يعتبر استمرارك في استخدام كاردزي بعد التغييرات بمثابة موافقة عليها.",
    hi: "11.1. हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं। परिवर्तनों के बाद निरंतर उपयोग स्वीकृति माना जाएगा।",
    zh: "11.1. 我们可能会不时更新本条款。更新后的生效日期将标注于页面顶部。如您在条款更新后继续使用 Cardzy，即视为您接受修改后的条款。",
    pt: "11.1. Podemos atualizar estes Termos periodicamente. O uso continuado após alterações constitui aceitação.",
    ru: "11.1. Мы можем обновлять Условия. Продолжение использования сервиса означает согласие с изменениями.",
    de: "11.1. Wir können diese Bedingungen aktualisieren. Die Fortsetzung der Nutzung gilt als Zustimmung.",
    ja: "11.1. 規約は随時改定されることがあります。改定後の利用継続により、変更後の規約に同意したものとみなされます。",
    ko: "11.1. 당사는 본 약관을 변경할 수 있습니다. 변경 후에도 서비스를 계속 이용하는 것은 개정 약관에 동의함을 의미합니다.",
    it: "11.1. Potremmo aggiornare questi Termini. L'uso continuato dopo le modifiche costituisce accettazione.",
    tr: "11.1. Bu Koşulları güncelleyebiliriz. Değişikliklerden sonra kullanımı sürdürmek kabul anlamına gelir.",
    id: "11.1. Kami dapat memperbarui Ketentuan ini. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujuinya.",
    bn: "১১.১. আমরা এই শর্তাবলী আপডেট করতে পারি। পরিবর্তনের পর সেবা ব্যবহার অব্যাহত রাখা সম্মতি নির্দেশ করে।",
    vi: "11.1. Chúng tôi có thể cập nhật Điều khoản này. Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận.",
    sw: "11.1. Tunaweza kusahihisha Vigezo hivi. Kuendelea kutumia huduma kunamaanisha unakubali."
  },
  s12Title: { en: "12. Contact Information", ur: "12. رابطہ کی معلومات", es: "12. Información de Contacto", fr: "12. Informations de Contact", ar: "12. معلومات الاتصال", hi: "12. संपर्क जानकारी", zh: "12. 联系我们", pt: "12. Informações de Contato", ru: "12. Контактная информация", de: "12. Kontaktinformationen", ja: "12. お問い合わせ先", ko: "12. 연락처 정보", it: "12. Informazioni di Contatto", tr: "12. İletişim Bilgileri", id: "12. Informasi Kontak", bn: "১২. যোগাযোগের তথ্য", vi: "12. Thông Tin Liên Hệ", sw: "12. Taarifa za Mawasiliano" },
  s12p1: {
    en: "12.1. If you have questions regarding these Terms or need assistance, please contact us:",
    ur: "12.1. اگر آپ کے پاس ان شرائط کے بارے میں کوئی سوالات ہیں تو ہم سے رابطہ کریں:",
    es: "12.1. Si tiene preguntas sobre estos Términos, contáctenos:",
    fr: "12.1. Si vous avez des questions concernant ces conditions, contactez-nous :",
    ar: "12.1. إذا كانت لديك أي أسئلة بشأن هذه الشروط، يرجى التواصل معنا:",
    hi: "12.1. यदि इन शर्तों के संबंध में आपके कोई प्रश्न हैं, तो हमसे संपर्क करें:",
    zh: "12.1. 如果您对本服务条款有任何疑问或需要帮助，请通过以下方式联系我们：",
    pt: "12.1. Se você tiver dúvidas sobre estes Termos, entre em contato conosco:",
    ru: "12.1. Если у вас есть вопросы по этим Условиям, свяжитесь с нами:",
    de: "12.1. Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte:",
    ja: "12.1. 本利用規約に関するご質問やご相談は、以下のお問い合わせ先までご連絡ください：",
    ko: "12.1. 본 약관에 대해 궁금한 점이 있으시면 다음으로 문의해 주세요:",
    it: "12.1. Se hai domande su questi Termini, contattaci:",
    tr: "12.1. Bu Koşullarla ilgili sorularınız varsa lütfen bizimle iletişime geçin:",
    id: "12.1. Jika Anda memiliki pertanyaan mengenai Ketentuan ini, silakan hubungi kami:",
    bn: "১২.১. এই শর্তাবলী সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:",
    vi: "12.1. Nếu bạn có câu hỏi nào về Điều khoản này, vui lòng liên hệ với chúng tôi:",
    sw: "12.1. Kama una maswali kuhusu Vigezo hivi, tafadhali wasiliana nasi:"
  }
}

export default function TermsPage() {
  const { lang } = useLang()
  const t = (key: string) => TERMS_TEXT[key]?.[lang] || TERMS_TEXT[key]?.en || ''

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Shield className="size-3.5" /> {t('tagline')}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              {t('title')}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              {t('lastUpdated')}
            </p>
          </div>

          {/* Core Content */}
          <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-8 text-foreground leading-relaxed text-sm sm:text-base">
            
            <p className="text-muted-foreground">
              {t('intro1')}
            </p>
            <p className="text-muted-foreground">
              {t('intro2')}
            </p>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s1Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s1p1')}</p>
                <p>{t('s1p2')}</p>
                <p>{t('s1p3')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s2Title')}</h2>
              <p className="text-muted-foreground">
                {t('s2intro')}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>{t('s2b1')}</li>
                <li>{t('s2b2')}</li>
                <li>{t('s2b3')}</li>
                <li>{t('s2b4')}</li>
                <li>{t('s2b5')}</li>
              </ul>
              <p className="text-muted-foreground">
                {t('s2outro')}
              </p>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s3Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s3p1')}</p>
                <p>{t('s3p2')}</p>
                <p>{t('s3p3')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s4Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s4p1')}</p>
                <p>{t('s4p2')}</p>
                <p>{t('s4p3')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s5Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s5p1')}</p>
                <p>{t('s5p2')}</p>
                <p>{t('s5p3')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s6Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s6p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s7Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s7p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s8Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s8p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s9Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s9p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s10Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s10p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">{t('s11Title')}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('s11p1')}</p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border/60 pt-6 bg-muted/40 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground">{t('s12Title')}</h2>
              <p className="text-muted-foreground text-sm">
                {t('s12p1')}
              </p>
              <div className="space-y-1 text-sm text-foreground font-medium">
                <p>Email: <a href="mailto:cardzyonline@gmail.com" className="text-emerald-600 hover:underline">cardzyonline@gmail.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">+92 309 3518796</a></p>
                <p>Location: Islamabad / Rawalpindi, Pakistan</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
