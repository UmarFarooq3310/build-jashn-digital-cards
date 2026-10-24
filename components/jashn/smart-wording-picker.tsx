'use client'

import React, { useState, useMemo } from 'react'
import { Sparkles, Heart, Moon, Crown, Smile, Gem, Star, Users, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WordingItem {
  id: string
  group: 'wedding' | 'birthday' | 'eid' | 'anniversary' | 'friendship' | 'condolence' | 'general'
  subCategory: string
  scope?: 'invitation' | 'wish' | 'all'
  label: string
  urdu: string
  english: string
}

const ALL_WORDING_ITEMS: WordingItem[] = [
  // =========================================================================
  // --- 1. WEDDING & NIKKAH WORDINGS: FOR INVITATIONS (دعوت نامہ - میزبان کی طرف سے) ---
  // =========================================================================
  {
    id: 'w-inv-dua-quran',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'invitation',
    label: '🤲 Quran Surah Ar-Rum (سورة الروم)',
    urdu: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً\n\nاللہ تعالیٰ کے فضل و کرم سے ہمارے فرزند اور دختر کے عقدِ مسنونہ کی اس مبارک تقریب میں آپ کی باوقار شرکت اور دلہا دلہن کے حق میں دعائیں ہمارے لیے باعثِ مسرت و برکت ہوں گی۔\n\nاز طرف: جملہ اہل خانہ',
    english: 'And among His signs is that He created for you spouses that you may find tranquility in them, and placed between you affection and mercy. (Surah Ar-Rum 30:21)\n\nWith immense gratitude to Almighty Allah, we cordially request the honor of your gracious presence and heartfelt prayers to bless the newlywed couple on their holy matrimony.',
  },
  {
    id: 'w-inv-dua-barakallah',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'invitation',
    label: '🤲 Sunnah Nikkah Dua (بارک اللہ لک)',
    urdu: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ\n\nہم آپ کو اس بابرکت تقریبِ نکاح میں شرکت کی پرخلوص دعوت دیتے ہیں۔ آپ کی تشریف آوری اور نو بیاہتا جوڑے کے لیے نیک دعائیں ہمارے لیے باعثِ فخر و سعادت ہوں گی۔',
    english: 'May Allah bless the couple, shower His blessings upon them, and unite them in goodness.\n\nWe warmly invite you to grace the solemn Nikkah ceremony with your presence and heartfelt prayers for the bride and groom.',
  },
  {
    id: 'w-inv-dua-home',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'invitation',
    label: '🤲 Home & Barakah Blessing (گھر کی برکت)',
    urdu: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا\n\nدلہا اور دلہن کی نئی زندگی کے آغاز پر آپ کی پرخلوص دعائیں اور تشریف آوری دونوں خاندانوں کے لیے باعثِ سعادت ہوگی۔',
    english: 'May Allah fill the newlywed couple’s life with tranquility and barakah. We request the pleasure of your company and blessings at this joyful celebration.',
  },
  {
    id: 'w-inv-formal-bazm',
    group: 'wedding',
    subCategory: 'formal',
    scope: 'invitation',
    label: '👔 Royal Invitation (بزمِ مسرت)',
    urdu: 'بزمِ مسرت میں آپ کی پرخلوص تشریف آوری اور دلہا دلہن کے حق میں دعائیں ہمارے لیے باعثِ افتخار اور عزت ہوں گی۔\n\nاز طرف: جملہ اہل خانہ',
    english: 'We cordially request the honor of your gracious presence and heartfelt prayers to bless the newlywed couple on this auspicious celebration.',
  },
  {
    id: 'w-inv-formal-nikkah',
    group: 'wedding',
    subCategory: 'formal',
    scope: 'invitation',
    label: '👔 Respectful Nikkah Invite (عقدِ مسنونہ)',
    urdu: 'اللہ کے فضل و کرم سے ہمارے فرزند اور دختر کے عقدِ مسنونہ کی اس مبارک تقریب میں شرکت فرما کر دلہا دلہن کو دعاؤں سے نوازیں۔\n\nامید ہے آپ دعا و تشریف آوری سے شکریہ کا موقع دیں گے۔',
    english: 'With immense gratitude to Almighty Allah, we cordially invite you to celebrate the holy matrimony and bestow your prayers upon the newly married couple.',
  },
  {
    id: 'w-inv-tradition-mehndi',
    group: 'wedding',
    subCategory: 'tradition',
    scope: 'invitation',
    label: '🌸 Mehndi & Rasm-e-Hina (رسمِ حنا)',
    urdu: 'ہاتھوں میں رچی مہندی اور خوشیوں بھری شام!\nرسمِ حنا و ڈھولکی کی اس پرمسرت تقریب میں دلہا اور دلہن کو دعائیں دینے کے لیے آپ کی آمد کے تہہ دل سے منتظر رہیں گے!',
    english: 'With henna on hands and joy in hearts, join us for a colorful, lively Mehndi and Dholki celebration to bless the couple with music and laughter!',
  },
  {
    id: 'w-inv-formal-walima',
    group: 'wedding',
    subCategory: 'formal',
    scope: 'invitation',
    label: '🥂 Walima Reception (دعوتِ ولیمہ)',
    urdu: 'سنتِ نبویؐ کے مطابق ہمارے فرزند کی تقریبِ ولیمہ میں آپ کی باوقار شرکت اور دعائیں دلہا دلہن کے لیے باعثِ برکت ہوں گی۔ التماسِ دعا۔',
    english: 'In accordance with Sunnah, we cordially invite you to the Walima reception feast to celebrate the marriage and bless the newly married couple.',
  },
  {
    id: 'w-inv-formal-barat',
    group: 'wedding',
    subCategory: 'formal',
    scope: 'invitation',
    label: '💍 Barat Departure (تقریبِ بارات)',
    urdu: 'تقریبِ رخصتی و بارات کے اس پرمسرت موقع پر آپ کی پرخلوص تشریف آوری دلہا، دلہن اور دونوں خاندانوں کے لیے باعثِ برکت ہوگی۔',
    english: 'You are cordially invited to accompany the Barat and shower your blessings upon the newly married couple as they begin their sacred journey.',
  },

  // =========================================================================
  // --- 1B. WEDDING & NIKKAH WORDINGS: FOR WISH CARDS (مبارکباد - جوڑے کے لیے) ---
  // =========================================================================
  {
    id: 'w-wish-dua-quran',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'wish',
    label: '🤲 Quran Surah Ar-Rum (سورة الروم)',
    urdu: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً\n\nآپ دونوں کو نکاح کی دلی مبارکباد! اللہ تعالیٰ آپ کے اس نئے سفر کو دائمی محبت، سکون اور رحمتوں سے معمور فرمائے۔ آمین۔',
    english: 'May Allah bless your sacred union with tranquility, boundless affection, and divine mercy. Heartfelt congratulations to both of you on your blessed Nikkah!',
  },
  {
    id: 'w-wish-dua-barakallah',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'wish',
    label: '🤲 Sunnah Nikkah Dua (بارک اللہ لک)',
    urdu: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ\n\nآپ دونوں کو نکاح کی بہت بہت مبارکباد! ربِ کریم آپ کے اس نئے سفر کو دائمی الفت اور برکت سے نوازے۔ آمین۔',
    english: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fee khair. May Allah bless you both and unite you in goodness. Happy Nikkah!',
  },
  {
    id: 'w-wish-dua-home',
    group: 'wedding',
    subCategory: 'dua',
    scope: 'wish',
    label: '🤲 Home & Barakah Blessing (گھر کی برکت)',
    urdu: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا\n\nاللہ تعالیٰ آپ دونوں کے گھر کو خوشیوں، رزقِ حلال اور باہمی عزت و محبت کا گہوارہ بنائے۔ آمین۔',
    english: 'May your household always be filled with joy, respect, abundance, and eternal love. Heartfelt congratulations on your wedding!',
  },
  {
    id: 'w-wish-shaadi-joy',
    group: 'wedding',
    subCategory: 'formal',
    scope: 'wish',
    label: '💍 Shaadi Mubarak (شادی مبارک)',
    urdu: 'شادی کی بہت بہت مبارکباد! اللہ تعالیٰ آپ دونوں کی ازدواجی زندگی کو محبت، باہمی احترام اور خوشیوں کا گہوارہ بنائے۔ آمین۔',
    english: 'Wishing the wonderful couple a lifetime of endless love, shared laughter, and beautiful blessings on your wedding day!',
  },
  {
    id: 'w-wish-tradition-mehndi',
    group: 'wedding',
    subCategory: 'tradition',
    scope: 'wish',
    label: '🌸 Mehndi Mubarak (مہندی مبارک)',
    urdu: 'مہندی کی یہ رنگارنگ رات اور خوشیوں بھری تقریب آپ کی زندگی میں ہمیشہ مسکراہٹیں بکھیرتی رہے۔ مہندی مبارک!',
    english: 'Wishing you a joyful Mehndi night filled with music, colorful memories, and boundless happiness!',
  },

  // ==========================================
  // --- 2. BIRTHDAY WORDINGS (سالگرہ) ---
  // ==========================================
  {
    id: 'b-festive-joy',
    group: 'birthday',
    subCategory: 'festive',
    scope: 'all',
    label: '🎉 Joyful Birthday Wish (خوشیوں بھری سالگرہ)',
    urdu: 'سالگرہ بہت بہت مبارک ہو! دعا ہے کہ آنے والا ہر سال آپ کی زندگی میں نئی مسکراہٹیں، کامیابیاں اور بے پناہ خوشیاں لے کر آئے۔ 🎂🎈',
    english: 'Wishing you a magnificent birthday filled with unbounded laughter, sweet memories, and grand milestones ahead! 🎂🎉',
  },
  {
    id: 'b-dua-health',
    group: 'birthday',
    subCategory: 'dua',
    scope: 'all',
    label: '🤲 Health & Long Life Dua (صحت و درازیٔ عمر)',
    urdu: 'اللہ پاک آپ کو ہمیشہ صحت، تندرستی اور لمبی عمر عطا فرمائے اور زندگی کے ہر امتحان میں کامیاب کرے۔ آمین۔ 🤲',
    english: 'May Almighty Allah bless you with continuous radiant health, peace of mind, and fulfilling success in all your journeys. Ameen.',
  },
  {
    id: 'b-milestone-cheers',
    group: 'birthday',
    subCategory: 'milestone',
    scope: 'all',
    label: '🌟 Milestone & Cheers (سنگِ میل مبارک)',
    urdu: 'شاندار سنگ میل اور سالگرہ پر دلی مبارکباد! آپ کا مستقبل ہمیشہ روشن رہے اور ہر خواب پورا ہو۔ 🌟👏',
    english: 'Huge congratulations on this incredible milestone! May your future continue to sparkle with endless triumph and excellence. 🌟🏆',
  },
  {
    id: 'b-warm-wishes',
    group: 'birthday',
    subCategory: 'festive',
    scope: 'all',
    label: '🎁 Heartfelt Birthday Greetings (دلی مبارکباد)',
    urdu: 'آپ کی سالگرہ کے خاص دن پر دل کی گہرائیوں سے مبارکباد۔ ربِ کریم آپ کے دامن کو ہر لمحہ خوشیوں اور آسانیوں سے بھر دے۔',
    english: 'Sending warmest wishes on your birthday! May your special day be blessed with love, joy, and wonderful moments with loved ones.',
  },

  // ==========================================
  // --- 3. EID & ISLAMIC WORDINGS (عید و اسلامی) ---
  // ==========================================
  {
    id: 'e-eid-taqabbal',
    group: 'eid',
    subCategory: 'eid',
    scope: 'all',
    label: '🌙 Sunnah Eid Greeting (تقبل اللہ منا)',
    urdu: 'تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُم\n\nآپ کو اور آپ کے تمام اہل خانہ کو عید سعید بہت بہت مبارک ہو! اللہ تعالیٰ آپ کی تمام عبادتیں، صدقات اور دعائیں قبول فرمائے۔',
    english: 'Taqabbal Allahu Minna Wa Minkum. Eid Mubarak to you and your beloved family! May this blessed occasion bring divine peace and prosperity.',
  },
  {
    id: 'e-ramadan-dua',
    group: 'eid',
    subCategory: 'dua',
    scope: 'all',
    label: '🤲 Ramadan Forgiveness Dua (اللہم انک عفو)',
    urdu: 'اللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\nرمضان المبارک کی بابرکت ساعتیں اور دعاؤں کی قبولیت آپ سب کے لیے مبارک ہو۔',
    english: 'O Allah, You are forgiving and You love forgiveness, so forgive me. Wishing you spiritually enriching Ramadan days and answered prayers.',
  },
  {
    id: 'e-family-eid',
    group: 'eid',
    subCategory: 'eid',
    scope: 'all',
    label: '✨ Family Eid Mubarak (عید الفطر و اضحیٰ)',
    urdu: 'عید کا پرمسرت دن آپ کے گھر کو برکتوں، مسکراہٹوں اور خوشیوں سے بھر دے۔ آپ کو اور آپ کے پیاروں کو عید مبارک!',
    english: 'May the divine blessings of Eid bring immense joy, unity, and abundance to you and your entire family. Eid Mubarak!',
  },
  {
    id: 'e-jumma-blessing',
    group: 'eid',
    subCategory: 'dua',
    scope: 'all',
    label: '🕌 Jumma Mubarak (جمعہ مبارک)',
    urdu: 'جمعہ مبارک! اللہ تعالیٰ آج کے مبارک دن کے صدقے آپ کی تمام پریشانیاں دور فرمائے اور دلی دعائیں قبول کرے۔',
    english: 'Jumma Mubarak! May this blessed Friday bring peace, forgiveness, and divine grace into your home and life.',
  },

  // ==========================================
  // --- 4. ANNIVERSARY WORDINGS (سالگرۂ ازدواج) ---
  // ==========================================
  {
    id: 'a-dua-nazar',
    group: 'anniversary',
    subCategory: 'dua',
    scope: 'all',
    label: '🤲 Union Protection Dua (نظرِ بد سے حفاظت)',
    urdu: 'اللہ تعالیٰ آپ کی اس خوبصورت جوڑی کو ہر بری نظر سے محفوظ رکھے اور محبتوں کا یہ سفر سدا ہنستا مسکراتا رہے۔ آمین۔ 🤲',
    english: 'May Allah preserve your beautiful companionship from all harm, and grant you a lifetime of laughter, mutual respect, and tranquility.',
  },
  {
    id: 'a-milestone-cheers',
    group: 'anniversary',
    subCategory: 'formal',
    scope: 'all',
    label: '🥂 Milestone Anniversary (سنگِ میل مبارک)',
    urdu: 'شادی کی سالگرہ پر دلی مبارکباد! آپ دونوں کی محبت اور باہمی اعتماد ہمیشہ سب کے لیے مشعلِ راہ رہے۔ 🌟🥂',
    english: 'Wishing you a magnificent anniversary! May the bond you share continue to grow deeper, stronger, and more joyful each day.',
  },
  {
    id: 'a-everlasting-love',
    group: 'anniversary',
    subCategory: 'formal',
    scope: 'all',
    label: '💖 Everlasting Companionship (دائمی محبت)',
    urdu: 'شادی کے کامیاب اور خوشگوار سالوں کی تکمیل پر بہت بہت مبارکباد۔ دعا ہے کہ آپ کا یہ رشتہ ہمیشہ ایسے ہی پیار اور عزت سے چمکتا رہے۔',
    english: 'Congratulations on another wonderful year of shared love, trust, and beautiful memories. Happy Anniversary!',
  },

  // ==========================================
  // --- 5. FRIENDSHIP & GENERAL (دوستی و عمومی) ---
  // ==========================================
  {
    id: 'f-dosti-thanks',
    group: 'friendship',
    subCategory: 'dosti',
    scope: 'all',
    label: '🤝 True Friendship & Gratitude (سچی دوستی)',
    urdu: 'سچے دوست زندگی کا سب سے انمول تحفہ ہوتے ہیں۔ ہر خوشی اور غم میں ساتھ نبھانے کا شکریہ!',
    english: 'True friends make every journey memorable and joyous. Thank you for always being an incredible friend!',
  },
  {
    id: 'g-dua-prosperity',
    group: 'general',
    subCategory: 'dua',
    scope: 'all',
    label: '🤲 Prosperity & Success Dua (کامیابی و برکت)',
    urdu: 'اللہ تعالیٰ آپ کی زندگی کو خوشیوں، امن اور رزقِ حلال کی برکتوں سے ہمیشہ آباد رکھے۔ آمین۔ 🤲',
    english: 'May Allah fill your life with immense joy, lawful abundance, good health, and lasting peace. Ameen.',
  },
  {
    id: 'g-success-grad',
    group: 'general',
    subCategory: 'achievement',
    scope: 'all',
    label: '🏆 Graduation & Success (شاندار کامیابی)',
    urdu: 'شاندار کامیابی اور ڈگری کی تکمیل پر دلی مبارکباد! آپ کی محنت رنگ لائی، مستقبل میں مزید کامیابیوں کے لیے دعا گو۔',
    english: 'Heartiest congratulations on your outstanding achievement and graduation! Wishing you a brilliant and prosperous career ahead.',
  },
  // =========================================================================
  // --- 6. CONDOLENCES, SYMPATHY & SOLEMN OCCASIONS (تعزیت، ہمدردی و ایصالِ ثواب) ---
  // =========================================================================
  {
    id: 'c-inna-lillahi-maghfirat',
    group: 'condolence',
    subCategory: 'inna-lillah',
    scope: 'all',
    label: '🕊️ Inna Lillahi & Jannah Dua (انا للہ و بلندیٔ درجات)',
    urdu: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\n\nاس غمگین لمحے میں ہم آپ اور آپ کے تمام اہل خانہ کے دکھ میں برابر کے شریک ہیں۔ اللہ تعالیٰ مرحوم کو اپنی جوارِ رحمت میں اعلیٰ مقام اور تمام پسماندگان کو صبرِ جمیل و اجرِ عظیم عطا فرمائے۔ آمین۔',
    english: 'Inna Lillahi wa inna ilayhi raji\'un. Sending our deepest condolences and heartfelt prayers to you and your family. May Allah Almighty grant the departed soul highest rank in Jannat-ul-Firdaus and bless your family with patience and strength. Ameen.',
  },
  {
    id: 'c-quran-sabireen',
    group: 'condolence',
    subCategory: 'inna-lillah',
    scope: 'all',
    label: '🤲 Quran Surah Al-Baqarah (وَبَشِّرِ الصَّابِرِينَ)',
    urdu: 'وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ\n\nاللہ تعالیٰ اس کٹھن گھڑی میں آپ کے دل کو اطمینان بخشے، غم کے بوجھ کو ہلکا فرمائے اور آپ کو صابرین کا عظیم اجر عطا فرمائے۔ آمین۔',
    english: 'Give good news to the patient who, when calamity strikes them, say: "Indeed we belong to Allah, and to Him we shall return." (Surah Al-Baqarah 2:155-156)\n\nMay Allah shower tranquility upon your grieving hearts and surround your home with His mercy.',
  },
  {
    id: 'c-sunnah-dua',
    group: 'condolence',
    subCategory: 'inna-lillah',
    scope: 'all',
    label: '🕊️ Sunnah Maghfirat Prayer (دعائے مغفرت و رحمت)',
    urdu: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ\n\nاللہ پاک مرحوم کی تمام لغزشوں کو معاف فرما کر ان کی لحد کو نور سے منور فرمائے اور قبر کو جنت کے باغوں میں سے ایک باغ بنائے۔ آمین۔',
    english: 'O Allah, forgive them, have mercy upon them, pardon them, and grant them an honorable resting place.\n\nMay Almighty Allah illuminate their grave with divine light and unite you all in the highest gardens of Jannah. Ameen.',
  },
  {
    id: 'c-loss-father',
    group: 'condolence',
    subCategory: 'parents',
    scope: 'all',
    label: '🖤 Loss of Beloved Father (والد محترم کی رحلت)',
    urdu: 'والد کا سایہ ایک گھنے اور محفوظ درخت کی مانند ہوتا ہے۔ آپ کے محترم والد کی رحلت کا سن کر دلی دکھ اور گہرا صدمہ ہوا۔ اللہ پاک ان کی بے حساب مغفرت فرمائے اور ان کے نیک اعمال کو ان کا توشۂ آخرت بنائے۔ اللہ تعالیٰ آپ سب کو یہ عظیم صدمہ برداشت کرنے کی توفیق اور صبرِ جمیل عطا فرمائے۔ آمین۔',
    english: 'Deeply sorrowed by the heartbreaking passing of your beloved father. A father’s loving shelter, wisdom, and prayers can never be replaced. May Allah bless his noble soul with the highest station in Jannah, forgive his shortcomings, and envelop your family in solace and strength. Ameen.',
  },
  {
    id: 'c-loss-mother',
    group: 'condolence',
    subCategory: 'parents',
    scope: 'all',
    label: '🖤 Loss of Beloved Mother (والدہ ماجدہ کی وفات)',
    urdu: 'ماں کی محبت اور دعائیں زندگی کی سب سے بڑی پناہ گاہ ہوتی ہیں۔ آپ کی والدہ ماجدہ کے سانحۂ ارتحال پر دل انتہائی مغموم ہے۔ اللہ تبارک و تعالیٰ ان کے درجات بلند فرمائے، ان کی قبر پر اپنی رحمتوں کی شبنم برسائے اور پسماندگان کو صبر و ہمت کی دولت عطا فرمائے۔ آمین۔',
    english: 'Words cannot express our heartfelt sorrow on the passing of your beloved mother. Her unconditional love, gentle warmth, and selfless prayers will forever shine in your life. May Almighty Allah grant her the highest abode in Jannat-ul-Firdaus and grant you and your family immense patience.',
  },
  {
    id: 'c-loss-elder',
    group: 'condolence',
    subCategory: 'parents',
    scope: 'all',
    label: '🖤 Loss of Respected Elder / Grandparent (بزرگوں کی رحلت)',
    urdu: 'گھر کے بزرگوں کا وجود پورے خاندان کے لیے رحمت اور برکت کا سرچشمہ ہوتا ہے۔ آپ کے محترم بزرگ کی وفات پر ہم دلی تعزیت پیش کرتے ہیں۔ اللہ پاک ان کے درجات بلند فرمائے اور خاندان کو ان کے بتائے ہوئے نیک راستے پر چلنے کی توفیق دے۔ آمین۔',
    english: 'Deeply saddened by the loss of your revered family elder. Their life was a beacon of grace, wisdom, and prayers for generations. May Allah reward their lifetime of goodness with boundless mercy and eternal peace in Jannah.',
  },
  {
    id: 'c-comfort-patience',
    group: 'condolence',
    subCategory: 'comfort',
    scope: 'all',
    label: '💐 Prayers for Comfort & Strength (صبر و حوصلہ کی دعا)',
    urdu: 'دلی تعزیت و ہمدردی۔ اللہ پاک آپ کو اور آپ کے خاندان کو اس گہرے صدمے پر صبر و حوصلہ عطا فرمائے اور غم کو اپنی رحمتوں سے ہلکا فرمائے۔ اس کٹھن گھڑی میں ہماری ہمدردیاں اور دعائیں آپ کے ساتھ ہیں۔ آمین۔',
    english: 'Please accept our heartfelt condolences and deepest sympathy during this difficult time. Wishing you peace to bring comfort, courage to face the days ahead, and loving memories to forever hold in your heart.',
  },
  {
    id: 'c-gentle-universal',
    group: 'condolence',
    subCategory: 'comfort',
    scope: 'all',
    label: '🕊️ Gentle Words of Solace (دلی ہمدردی و تسلی)',
    urdu: 'اس دکھ اور غم کی گھڑی میں ہمارے دل اور دعائیں آپ کے ساتھ ہیں۔ جانے والے کی خوبصورت یادیں اور نیکی کے نقوش ہمیشہ ہمارے دلوں میں زندہ رہیں گے۔ اللہ تعالیٰ آپ کو سکون اور تقویت بخشے۔',
    english: 'Holding you close in our thoughts and prayers during this tender time of loss. May the quiet moments of reflection bring you peace, and may the enduring love you shared carry you through the days ahead.',
  },
  {
    id: 'c-memory-lives-on',
    group: 'condolence',
    subCategory: 'comfort',
    scope: 'all',
    label: '🕯️ Those We Love Live Forever (خوبصورت یادیں)',
    urdu: 'جو لوگ ہمارے دلوں میں بستے ہیں وہ کبھی جدا نہیں ہوتے۔ ان کی محبت، شفقت اور خلوص ہمیشہ ہمارے ارد گرد خوشبو کی طرح قائم رہے گی۔ غم کے اس سفر میں ہم آپ کے شانہ بشانہ ہیں۔',
    english: 'Those we love don’t go away, they walk beside us every day in the memories we hold dear. May the beautiful legacy of their life bring comfort and gentle healing to your grieving heart.',
  },
  {
    id: 'c-get-well-sunnah',
    group: 'condolence',
    subCategory: 'get-well',
    scope: 'all',
    label: '🏥 Sunnah Healing Dua (شفائے کاملہ کی دعا)',
    urdu: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا\n\nاللہ تعالیٰ آپ کو شفائے کاملہ و عاجلہ عطا فرمائے اور بیماری کی ہر تکلیف کو صحت و تندرستی میں بدل دے۔ آمین۔',
    english: 'O Allah, Lord of mankind, remove the illness and grant healing. You are the Healer, there is no healing except Yours, a healing that leaves behind no ailment.\n\nPraying wholeheartedly for your complete recovery and renewed vitality!',
  },
  {
    id: 'c-get-well-hospital',
    group: 'condolence',
    subCategory: 'get-well',
    scope: 'all',
    label: '🏥 Speedy Recovery & Home Return (جلد صحت یابی)',
    urdu: 'ہم آپ کی جلد صحت یابی اور ہسپتال سے خیر و عافیت کے ساتھ گھر واپسی کے لیے دل کی گہرائیوں سے دعا گو ہیں۔ اپنا پورا خیال رکھیں، آرام فرمائیں اور جلد مسکراتے ہوئے اپنے معمولات پر لوٹیں۔',
    english: 'Sending you warmest hugs, healing thoughts, and strength for a swift and comfortable recovery. Rest well, take it one day at a time, and know that everyone is rooting for you and sending love!',
  },
  {
    id: 'c-chehlum-remembrance',
    group: 'condolence',
    subCategory: 'chehlum',
    scope: 'all',
    label: '🕯️ Chehlum, Majlis & Isaal-e-Sawab (چہلم و ایصالِ ثواب)',
    urdu: 'ایصالِ ثواب اور چہلم کی اس پروقار و با برکت تقریب پر دعا گو ہیں کہ اللہ تبارک و تعالیٰ تمام تلاوتِ قرآن، دعاؤں اور ہدیۂ نعت کو شرفِ قبولیت بخشے اور مرحوم کے درجات کو بلند فرمائے۔ آمین۔',
    english: 'On this solemn commemoration of Chehlum and Isaal-e-Sawab, we pray that Almighty Allah accepts every recitation, prayer, and charity offered in their loving memory, illuminating their soul with eternal serenity.',
  },
]

export function resolveWordingGroup(eventType?: string, occasionId?: string): 'wedding' | 'birthday' | 'eid' | 'anniversary' | 'friendship' | 'condolence' | 'general' {
  const target = (eventType || occasionId || '').toLowerCase()
  if (!target) return 'wedding'

  // Sensitive & Condolence Occasions (Prioritized so sad events never show celebratory wording)
  if (
    [
      'sympathy',
      'condolence',
      'condolences',
      'sad',
      'death',
      'loss',
      'grief',
      'bereavement',
      'funeral',
      'janaza',
      'quran-khwani',
      'soyem',
      'chehlum',
      'arbaeen',
      'majlis',
      'ashura',
      'taziya',
      'get-well',
      'get-well-soon',
      'hospital',
      'recovery',
      'illness',
      'miss-you',
      'farewell',
    ].some((k) => target.includes(k))
  ) {
    return 'condolence'
  }

  if (
    [
      'wedding',
      'wedding-gala',
      'nikkah',
      'barat',
      'walima',
      'mehndi',
      'dholki',
      'dholak',
      'engagement',
      'bridal-shower',
      'qawwali',
      'proposal',
      'shaadi',
      'nikah',
    ].some((k) => target.includes(k))
  ) {
    return 'wedding'
  }

  if (
    [
      'birthday',
      'birthday-party',
      'kids-party',
      'baby-shower',
      'newborn',
      'aqiqah',
      'aqiqah-party',
      'graduation',
      'graduation-party',
    ].some((k) => target.includes(k))
  ) {
    return 'birthday'
  }

  if (
    [
      'eid',
      'eid-party',
      'eid-ul-fitr',
      'eid-ul-adha',
      'ramadan',
      'milad',
      'quran-khatam',
      'iftaar',
      'roza-kushai',
      'hajj',
      'hajj-dinner',
      'umrah',
      'jumma',
      'chand-raat',
      'shab-e-barat',
      'islamic',
    ].some((k) => target.includes(k))
  ) {
    return 'eid'
  }

  if (target.includes('anniversary')) {
    return 'anniversary'
  }

  if (target.includes('friend') || target.includes('dosti') || target.includes('thank-you')) {
    return 'friendship'
  }

  return 'general'
}

export function SmartWordingPicker({
  onSelectWording,
  lang = 'en',
  eventType,
  occasionId,
  mode,
}: {
  onSelectWording: (text: string) => void
  lang?: string
  eventType?: string
  occasionId?: string
  mode?: 'invitation' | 'wish'
}) {
  const isUrdu = lang === 'ur' || lang === 'ar'
  const activeMode = mode || (eventType ? 'invitation' : 'wish')
  const activeGroup = useMemo(() => resolveWordingGroup(eventType, occasionId), [eventType, occasionId])

  // Get categories tailored specifically for active group
  const categories = useMemo(() => {
    switch (activeGroup) {
      case 'condolence':
        return [
          { id: 'all', label: isUrdu ? '🕊️ تمام تعزیتی و ہمدردی پیغامات' : '🕊️ All Sympathy & Solace', icon: Heart },
          { id: 'inna-lillah', label: isUrdu ? '🤲 انا للہ و دعائے مغفرت' : '🤲 Inna Lillahi & Duas', icon: Moon },
          { id: 'parents', label: isUrdu ? '🖤 والدین و بزرگوں کی وفات' : '🖤 Loss of Parents & Elders', icon: Crown },
          { id: 'comfort', label: isUrdu ? '💐 صبر و دلی ہمدردی' : '💐 Comfort & Strength', icon: Sparkles },
          { id: 'get-well', label: isUrdu ? '🏥 شفائے کاملہ و عیادت' : '🏥 Get Well & Healing', icon: Smile },
          { id: 'chehlum', label: isUrdu ? '🕯️ چہلم، مجلس و ایصالِ ثواب' : '🕯️ Chehlum & Remembrance', icon: Star },
        ]
      case 'wedding':
        return [
          { id: 'all', label: isUrdu ? '✨ تمام شادی پیغامات' : '✨ All Wedding Templates', icon: Sparkles },
          { id: 'dua', label: isUrdu ? '🤲 قرآنی و نکاح دعائیں' : '🤲 Quranic & Nikkah Duas', icon: Moon },
          { id: 'formal', label: isUrdu ? '👔 شاہی و باوقار دعوت' : '👔 Royal & Family Invite', icon: Crown },
          { id: 'tradition', label: isUrdu ? '🌸 رسمِ حنا و مہندی' : '🌸 Mehndi & Traditions', icon: Gem },
        ]
      case 'birthday':
        return [
          { id: 'all', label: isUrdu ? '✨ تمام سالگرہ پیغامات' : '✨ All Birthday Wording', icon: Sparkles },
          { id: 'festive', label: isUrdu ? '🎉 خوشیوں بھری مبارکباد' : '🎉 Cheerful Wishes', icon: Smile },
          { id: 'dua', label: isUrdu ? '🤲 صحت و درازیٔ عمر' : '🤲 Health & Life Duas', icon: Moon },
          { id: 'milestone', label: isUrdu ? '🌟 سنگِ میل و کامیابی' : '🌟 Milestone Cheers', icon: Star },
        ]
      case 'eid':
        return [
          { id: 'all', label: isUrdu ? '✨ تمام عید و اسلامی' : '✨ All Eid & Islamic', icon: Sparkles },
          { id: 'eid', label: isUrdu ? '🌙 عید سعید مبارک' : '🌙 Eid Mubarak', icon: Moon },
          { id: 'dua', label: isUrdu ? '🤲 رمضان و دعائیں' : '🤲 Ramadan & Duas', icon: Star },
        ]
      case 'anniversary':
        return [
          { id: 'all', label: isUrdu ? '✨ تمام پیغامات' : '✨ All Anniversary', icon: Sparkles },
          { id: 'formal', label: isUrdu ? '🥂 سالگرہ مبارک' : '🥂 Anniversary Wishes', icon: Crown },
          { id: 'dua', label: isUrdu ? '🤲 دائمی الفت و برکت' : '🤲 Union & Home Duas', icon: Moon },
        ]
      default:
        return [
          { id: 'all', label: isUrdu ? '✨ تمام پیغامات' : '✨ All Wording', icon: Sparkles },
          { id: 'dua', label: isUrdu ? '🤲 دعائیں و برکت' : '🤲 Prayers & Duas', icon: Moon },
          { id: 'dosti', label: isUrdu ? '🤝 دوستی و شکرگزار' : '🤝 Friendship & Thanks', icon: Users },
          { id: 'achievement', label: isUrdu ? '🏆 کامیابی و مبارکباد' : '🏆 Achievement & Joy', icon: Award },
        ]
    }
  }, [activeGroup, isUrdu])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Group and scope filtered wording items
  const groupWordings = useMemo(() => {
    return ALL_WORDING_ITEMS.filter((item) => {
      if (item.group !== activeGroup) return false
      if (item.scope && item.scope !== 'all' && item.scope !== activeMode) return false
      return true
    })
  }, [activeGroup, activeMode])

  const filtered = useMemo(() => {
    if (selectedCategory === 'all') return groupWordings
    return groupWordings.filter((w) => w.subCategory === selectedCategory)
  }, [selectedCategory, groupWordings])

  return (
    <div className="space-y-2.5 p-3 sm:p-3.5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-background to-rose-500/5 shadow-xs w-full max-w-full overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-500 min-w-0">
          <Sparkles className="size-3.5 text-amber-400 animate-pulse shrink-0" />
          <span className="truncate">
            {isUrdu
              ? activeGroup === 'wedding'
                ? activeMode === 'invitation'
                  ? 'منتخب نکاح و دعوت نامہ پیغامات (1-کلک)'
                  : 'شادی و نکاح مبارکباد (1-کلک)'
                : activeGroup === 'eid'
                ? 'عید و اسلامی مبارکباد (1-کلک)'
                : activeGroup === 'birthday'
                ? 'سالگرہ مبارکباد و دعائیں (1-کلک)'
                : 'منتخب مبارکباد و پیغامات (1-کلک)'
              : activeGroup === 'wedding'
              ? activeMode === 'invitation'
                ? '1-Click Wedding & Nikkah Invitation Templates'
                : '1-Click Wedding & Nikkah Wishes'
              : activeGroup === 'eid'
              ? '1-Click Eid & Islamic Greetings'
              : activeGroup === 'birthday'
              ? '1-Click Birthday Wishes & Duas'
              : '1-Click Smart Event Templates'}
          </span>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          Tap to autofill ✍️
        </span>
      </div>

      {/* Category Pills Tailored to Occasion */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer select-none',
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-xs'
                  : 'bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
              )}
            >
              <Icon className="size-3 shrink-0" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Wording Chips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-56 overflow-y-auto pr-1">
        {filtered.map((item) => {
          const displayText = isUrdu ? item.urdu : item.english
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectWording(displayText)}
              className="text-left p-2.5 rounded-xl border border-border/70 hover:border-amber-400/50 bg-background/90 hover:bg-amber-500/10 transition-all group cursor-pointer flex flex-col justify-between space-y-1.5 shadow-2xs"
            >
              <span className="text-[11px] font-bold text-foreground group-hover:text-amber-400 flex items-center justify-between">
                <span>{item.label}</span>
                <span className="text-[10px] text-amber-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Use ✍️
                </span>
              </span>
              <p
                className={cn(
                  'text-[11px] text-muted-foreground line-clamp-3 leading-relaxed',
                  isUrdu && 'font-urdu text-right text-xs'
                )}
              >
                {displayText}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
