import json
import os

target_dir = os.path.join(os.path.dirname(__file__), '../lib/blog/translations')

TITLES_18 = {
    6: {
        'en': 'Online Invitation Cards with Live WhatsApp RSVP Tracking (2026)',
        'ur': 'آن لائن ڈیجیٹل دعوت نامے اور لائیو واٹس ایپ آر ایس وی پی بنانے کی جامع گائیڈ',
        'ar': 'دليل إنشاء بطاقات الدعوة الرقمية عبر الإنترنت مع تتبع الحضور المباشر عبر واتساب',
        'es': 'Tarjetas de Invitación Digitales con Seguimiento de RSVP en Vivo por WhatsApp (2026)',
        'fr': 'Faire-Part Numériques en Ligne avec Suivi des Réponses RSVP par WhatsApp (2026)',
        'hi': 'लाइव व्हाट्सएप आरएसवीपी ट्रैकिंग के साथ ऑनलाइन डिजिटल निमंत्रण पत्र गाइड (2026)',
        'zh': '在线电子请柬制作全攻略：集成 WhatsApp 实时 RSVP 宾客回执追踪（2026版）',
        'pt': 'Convites Digitais Online com Rastreamento de RSVP em Tempo Real no WhatsApp (2026)',
        'ru': 'Создание электронных приглашений онлайн с отслеживанием ответов в WhatsApp (2026)',
        'de': 'Online-Einladungskarten mit Live-WhatsApp-RSVP-Verwaltung (Leitfaden 2026)',
        'ja': 'WhatsAppリアルタイム出欠確認付きオンライン招待状作成ガイド（2026年版）',
        'ko': '실시간 WhatsApp 참석 확인(RSVP) 기능을 갖춘 모바일 청첩장 제작 가이드 (2026)',
        'it': 'Inviti Digitali Online con Tracciamento RSVP in Tempo Reale su WhatsApp (2026)',
        'tr': 'Canlı WhatsApp LCV Takibi ile Çevrimiçi Dijital Davetiye Hazırlama Rehberi (2026)',
        'id': 'Panduan Membuat Undangan Digital Online dengan Konfirmasi WhatsApp RSVP Real-Time (2026)',
        'bn': 'লাইভ হোয়াটসঅ্যাপ আরএসভিপি ট্র্যাকিং সহ অনলাইন ডিজিটাল নিমন্ত্রণপত্র তৈরির গাইড (২০২৬)',
        'vi': 'Thiết Kế Thiệp Mời Kỹ Thuật Số Trực Tuyến Tích Hợp Xác Nhận Tham Dự WhatsApp (2026)',
        'sw': 'Kadi za Mialiko za Kidijitali zenye Ufuatiliaji wa Moja kwa Moja wa RSVP ya WhatsApp (2026)'
    },
    7: {
        'en': 'How to Design Custom 3D Animated Wish Cards with Name, Photo & Audio',
        'ur': 'سالگرہ، عید اور سالگرہ کے لیے نام، تصویر اور آڈیو کے ساتھ 3D وش کارڈز بنانے کا طریقہ',
        'ar': 'كيفية تصميم بطاقات تهنئة ثلاثية الأبعاد متحركة مع الصور والأسماء والصوتيات',
        'es': 'Cómo Diseñar Tarjetas de Felicitación Animadas en 3D Personalizadas con Nombre, Foto y Música',
        'fr': 'Comment Créer des Cartes de Vœux Animées 3D Personnalisées avec Nom, Photo et Musique',
        'hi': 'नाम, फोटो और संगीत के साथ कस्टम 3D एनिमेटेड विश कार्ड कैसे बनाएं',
        'zh': '如何设计专属 3D 动态祝福卡：支持定制姓名、照片与背景音乐',
        'pt': 'Como Criar Cartões de Felicitações Animados em 3D com Nome, Foto e Áudio',
        'ru': 'Как создать анимированные 3D-открытки с именем, фотографией и музыкой',
        'de': '3D-animierte Grußkarten mit Namen, Foto und Musik selbst gestalten',
        'ja': '名前・写真・音楽付き3Dアニメーションお祝いカードのデザイン方法',
        'ko': '이름, 사진, 배경음악을 넣은 맞춤형 3D 애니메이션 축하 카드 제작법',
        'it': 'Come Creare Biglietti di Auguri Animati in 3D con Nome, Foto e Musica',
        'tr': 'İsim, Fotoğraf ve Müzikli Özel 3D Animasyonlu Tebrik Kartı Tasarımı',
        'id': 'Cara Mendesain Kartu Ucapan Animasi 3D Kustom dengan Nama, Foto, dan Musik',
        'bn': 'নাম, ছবি এবং অডিও সহ কাস্টম ৩ডি অ্যানিমেটেড শুভেচ্ছা কার্ড তৈরির নিয়ম',
        'vi': 'Cách Thiết Kế Thiệp Chúc Mừng 3D Hoạt Hình Kèm Tên, Ảnh và Nhạc Nền',
        'sw': 'Jinsi ya Kubuni Kadi za Pongezi za 3D zenye Jina, Picha na Muziki'
    },
    8: {
        'en': 'The Ultimate Guide to Global Holiday E-Cards: Christmas, Thanksgiving & New Year 2026',
        'ur': 'عالمی تعطیلات اور سال نو کے لیے اینیمیٹڈ 3D ای کارڈز کی مکمل گائیڈ',
        'ar': 'الدليل الشامل لبطاقات التهنئة الإلكترونية للمناسبات العالمية ورأس السنة الجديدة',
        'es': 'Guía Completa de Tarjetas Electrónicas para Festividades Globales: Navidad y Año Nuevo 2026',
        'fr': 'Guide Ultime des Cartes Virtuelles de Fêtes : Noël, Thanksgiving & Nouvel An 2026',
        'hi': 'वैश्विक छुट्टियों के ई-कार्ड के लिए अंतिम गाइड: क्रिसमस और नया साल 2026',
        'zh': '全球节日电子贺卡终极指南：圣诞节、感恩节与2026新年祝福',
        'pt': 'Guia Definitivo de Cartões Virtuais para Festas Globais: Natal e Ano Novo 2026',
        'ru': 'Полное руководство по электронным открыткам: Рождество, Новый Год 2026',
        'de': 'Der ultimative Leitfaden für Feiertags-E-Cards: Weihnachten & Neujahr 2026',
        'ja': '世界の祝日＆ホリデー電子カード完全ガイド：クリスマス＆2026年新年',
        'ko': '글로벌 연말연시 모바일 카드 완벽 가이드: 크리스마스 & 2026년 새해',
        'it': 'Guida Definitiva ai Biglietti Virtuali per le Feste: Natale e Capodanno 2026',
        'tr': 'Yılbaşı ve Bayram Tebrik E-Kartları Rehberi: Yeni Yıl 2026',
        'id': 'Panduan Lengkap E-Card Liburan Global: Natal & Tahun Baru 2026',
        'bn': 'আন্তর্জাতিক ছুটির দিনের ই-কার্ড গাইড: ক্রিসমাস ও নতুন বছর ২০২৬',
        'vi': 'Cẩm Nang Thiệp Điện Tử Cho Mùa Lễ Hội: Giáng Sinh & Năm Mới 2026',
        'sw': 'Mwongozo Kamili wa Kadi za Sikukuu za Kidijitali: Krismasi na Mwaka Mpya 2026'
    },
    9: {
        'en': 'How to Create Animated Birthday Wish Cards & Milestone Party Invitations Online',
        'ur': 'سالگرہ کے اینیمیٹڈ وش کارڈز اور پارٹی دعوت نامے آن لائن بنانے کا آسان طریقہ',
        'ar': 'طريقة تصميم بطاقات أعياد الميلاد المتحركة ودعوات الحفلات عبر الإنترنت',
        'es': 'Cómo Crear Tarjetas de Cumpleaños Animadas e Invitaciones de Fiesta Online',
        'fr': 'Comment Créer des Cartes d’Anniversaire Animées et Invitations de Fête en Ligne',
        'hi': 'ऑनलाइन एनिमेटेड जन्मदिन कार्ड और पार्टी निमंत्रण कैसे बनाएं',
        'zh': '在线制作动态生日祝福贺卡与里程碑派对请柬完整教程',
        'pt': 'Como Criar Cartões de Aniversário Animados e Convites de Festa Online',
        'ru': 'Как создать анимированные открытки на день рождения и приглашения на вечеринку',
        'de': 'Animierte Geburtstagskarten und Party-Einladungen online gestalten',
        'ja': 'オンラインでアニメーション付き誕生日カード＆パーティー招待状を作成する方法',
        'ko': '온라인으로 생일 축하 애니메이션 카드 및 파티 초대장 만드는 법',
        'it': 'Come Creare Biglietti di Compleanno Animati e Inviti per Feste Online',
        'tr': 'Çevrimiçi Animasyonlu Doğum Günü Tebrik Kartı ve Parti Davetiyesi Hazırlama',
        'id': 'Cara Membuat Kartu Ucapan Ulang Tahun Animasi & Undangan Pesta Online',
        'bn': 'অনলাইনে অ্যানিমেটেড জন্মদিনের শুভেচ্ছা কার্ড ও পার্টি নিমন্ত্রণপত্র তৈরি',
        'vi': 'Cách Tạo Thiệp Sinh Nhật Hoạt Hình & Thiệp Mời Tiệc Trực Tuyến',
        'sw': 'Jinsi ya Kutengeneza Kadi za Siku ya Kuzaliwa na Mialiko ya Sherehe Mtandaoni'
    },
    10: {
        'en': 'The Future of Networking: Smart Digital Business Cards with 1-Click .VCF Save',
        'ur': 'نیٹ ورکنگ کا مستقبل: اسمارٹ ڈیجیٹل وزٹنگ کارڈز اور 1-کلک vCard سیو',
        'ar': 'مستقبل التواصل المهني: بطاقات الأعمال الرقمية الذكية مع حفظ ملف VCF بضغطة زر',
        'es': 'El Futuro del Networking: Tarjetas de Visita Digitales Inteligentes con Guardado .VCF',
        'fr': 'L’Avenir du Réseautage : Cartes de Visite Numériques avec Sauvegarde .VCF en 1 Clic',
        'hi': 'नेटवर्किंग का भविष्य: 1-क्लिक वीसीएफ सेव के साथ स्मार्ट डिजिटल बिजनेस कार्ड',
        'zh': '商务社交的未来：支持一键保存 .VCF 通讯录的名片数字化转型',
        'pt': 'O Futuro do Networking: Cartões de Visita Digitais com Salvamento .VCF em 1 Clique',
        'ru': 'Будущее нетворкинга: Умные цифровые визитки с сохранением контакта .VCF в 1 клик',
        'de': 'Die Zukunft des Networkings: Smarte digitale Visitenkarten mit 1-Klick-.VCF-Speicherung',
        'ja': 'ネットワーキングの未来：1クリック.VCF保存機能付きスマートデジタル名刺',
        'ko': '네트워킹의 미래: 1클릭 .VCF 연락처 저장을 지원하는 스마트 디지털 명함',
        'it': 'Il Futuro del Networking: Biglietti da Visita Digitali con Salvataggio .VCF in 1 Clic',
        'tr': 'İletişimin Geleceği: Tek Tıkla .VCF Rehbere Kaydedilen Akıllı Dijital Kartvizitler',
        'id': 'Masa Depan Networking: Kartu Nama Digital Pintar dengan Simpan Kontak .VCF 1-Klik',
        'bn': 'নেটওয়ার্কিংয়ের ভবিষ্যৎ: ১-ক্লিক ভিসিএফ সেভ সহ স্মার্ট ডিজিটাল বিজনেস কার্ড',
        'vi': 'Tương Lai Của Kết Nối: Danh Thiếp Thông Minh Lưu Danh Bạ .VCF Chỉ Với 1 Chạm',
        'sw': 'Mustakabali wa Mtandao: Kadi Mahiri za Kidijitali zenye Hifadhi ya .VCF kwa Mbofyo 1'
    }
}

for post_idx, titles_dict in TITLES_18.items():
    file_path = os.path.join(target_dir, f'post{post_idx}.ts')
    if not os.path.exists(file_path):
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    data_match = content.split('export const POST_' + str(post_idx) + '_DATA: Record<string, LocalizedBlogData> = ')[1].split(';\n\nexport const POST_')[0]
    data_map = json.loads(data_match)

    for lang, t in titles_dict.items():
        if lang in data_map:
            data_map[lang]['title'] = t
            data_map[lang]['seoTitle'] = f"{t} — Cardzy"

    content_match = content.split('export const POST_' + str(post_idx) + '_CONTENT: Record<string, LocalizedBlogContent> = ')[1].split(';\n')[0]
    content_map = json.loads(content_match)

    for lang, t in titles_dict.items():
        if lang in content_map and len(content_map[lang].get('sections', [])) > 0:
            content_map[lang]['sections'][0]['title'] = t

    ts_code = f"""import {{ LocalizedBlogData, LocalizedBlogContent }} from './types'

export const POST_{post_idx}_SLUG = "{content.split('export const POST_' + str(post_idx) + '_SLUG = \"')[1].split('\";')[0]}";

export const POST_{post_idx}_DATA: Record<string, LocalizedBlogData> = {json.dumps(data_map, indent=2, ensure_ascii=False)};

export const POST_{post_idx}_CONTENT: Record<string, LocalizedBlogContent> = {json.dumps(content_map, indent=2, ensure_ascii=False)};
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)

print("Posts 6 to 10 localized across all 18 languages!")
