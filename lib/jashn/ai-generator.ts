export type AITone =
  | 'warm'
  | 'emotional'
  | 'poetic'
  | 'funny'
  | 'formal'
  | 'religious'
  | 'short'
  | 'gamer_hype'
  | 'urdu_shayari'

export interface AIGeneratorParams {
  occasionLabel: string
  recipientName: string
  relation?: string
  tone: AITone
  occasionId?: string
  lang?: string
}

export function generateAIWish({
  occasionLabel,
  recipientName,
  relation,
  tone,
  occasionId = '',
  lang = 'en',
}: AIGeneratorParams): string {
  const name = recipientName.trim() || (lang === 'ur' || lang === 'ar' ? 'پیارے دوست' : 'my dear friend')
  const relStr = relation ? relation.toLowerCase() : ''
  const isUrdu = lang === 'ur' || lang === 'ar' || tone === 'urdu_shayari'
  const occId = occasionId.toLowerCase()
  const occLabel = occasionLabel || 'Special Occasion'

  // Detect category from occasionId / occasionLabel
  const isBirthday = occId.includes('birthday') || occLabel.toLowerCase().includes('birthday')
  const isEid = occId.includes('eid') || occLabel.toLowerCase().includes('eid')
  const isRamadan = occId.includes('ramadan') || occLabel.toLowerCase().includes('ramadan')
  const isWedding = occId.includes('wedding') || occId.includes('nikkah') || occId.includes('shaadi') || occLabel.toLowerCase().includes('wedding')
  const isAnniversary = occId.includes('anniversary') || occLabel.toLowerCase().includes('anniversary')
  const isGraduation = occId.includes('graduation') || occLabel.toLowerCase().includes('graduation')
  const isFriendship = occId.includes('friend') || occLabel.toLowerCase().includes('friend')
  const isBaby = occId.includes('baby') || occId.includes('newborn') || occId.includes('aqiqah')
  const isGaming = occId.includes('pubg') || occId.includes('game') || occId.includes('winner')

  if (isGaming || tone === 'gamer_hype') {
    return `🏆 WINNER WINNER CHICKEN DINNER! Huge shoutout to ${name} on dominating the battleground! 👑 Squad MVP status with 100% clutch energy. Keep reigning supreme!`
  }

  // --- URDU GENERATION ---
  if (isUrdu) {
    if (isBirthday) {
      switch (tone) {
        case 'religious':
          return `پیارے ${name}، سالگرہ کے پرمسرت موقع پر دعا ہے کہ اللہ تعالیٰ آپ کو صحتِ کاملہ، درازیٔ عمر اور دونوں جہاں کی کامیابیاں عطا فرمائے۔ آمین۔ 🤲🎂`
        case 'warm':
        case 'emotional':
          return `میرے پیارے ${relStr ? relStr + ' ' : ''}${name}، آپ کی سالگرہ کے خاص دن پر دل کی گہرائیوں سے مبارکباد۔ آپ ہمارے لیے ہمیشہ ایک انمول تحفہ ہیں۔ مسکراتے رہیں! ❤️`
        case 'poetic':
          return `خدا کرے کہ آپ کی زندگی کا ہر لمحہ بہار ہو،\nمسکراہٹیں آپ کے لبوں کا ہمیشہ سنگھار ہوں۔\n${name} کو سالگرہ بہت بہت مبارک! 🌸✨`
        case 'funny':
          return `سالگرہ مبارک ہو ${name}! ایک اور سال بڑے ہو گئے لیکن امید ہے عقل بھی ساتھ ساتھ تھوڑی آئی ہوگی! 😜🎉 پارٹی اور کیک کا انتظار رہے گا!`
        case 'short':
          return `سالگرہ بہت بہت مبارک ہو ${name}! اللہ آپ کو ہمیشہ خوش اور شاد آباد رکھے۔ 🎂🎉`
        case 'formal':
        default:
          return `محترم ${name} صاحب، آپ کو سالگرہ کی دلی مبارکباد پیش کرتے ہیں۔ دعا ہے کہ آنے والا سال آپ کے لیے بے شمار آسانیاں اور برکتیں لے کر آئے۔`
      }
    }

    if (isEid || isRamadan) {
      switch (tone) {
        case 'religious':
          return `تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُم\nپیارے ${name}، عید کی مبارک ساعتوں میں دعا ہے کہ ربِ کریم آپ کی تمام عبادات، دعائیں اور نیک تمنائیں قبول فرمائے۔ عید مبارک! 🌙🤲`
        case 'warm':
          return `عید کے اس پرمسرت دن پر آپ کو اور آپ کے تمام اہل خانہ کو دلی عید مبارک! اللہ تعالیٰ آپ کے گھر کو ہمیشہ خوشیوں سے بھرا رکھے۔ 🌙✨`
        case 'poetic':
          return `عید کا چاند مسرت کا پیام لایا ہے،\nہر دل میں محبتوں کا جام لایا ہے۔\n${name} کو عید سعید کی دلی مبارکباد! 🌙🌸`
        case 'short':
          return `عید مبارک ہو ${name}! اللہ پاک آپ کو اور آپ کے خاندان کو ہمیشہ سلامت رکھے۔ 🌙✨`
        default:
          return `آپ کو اور آپ کے تمام اہل خانہ کو عید مبارک! اللہ تعالیٰ آپ کو سدا سلامت اور خوش رکھے۔`
      }
    }

    if (isWedding || isAnniversary) {
      switch (tone) {
        case 'religious':
          return `بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ\nمحترم ${name}، شادی کی پرمسرت تقریب پر دلی مبارکباد۔ اللہ تعالیٰ آپ کے رشتے کو دائمی الفت اور رحمتوں سے نوازے۔ آمین۔`
        case 'warm':
          return `شادی کی بہت بہت مبارکباد! دعا ہے کہ آپ دونوں کا یہ نیا سفر ہمیشہ محبت، باہمی احترام اور خوشیوں سے معمور رہے۔ ❤️💍`
        case 'poetic':
          return `ہمسفر بن کے چلو تو راستے گلزار ہوں،\nزندگی کا ہر قدم الفت سے سرشار ہو۔\nشادی مبارک! 🌸`
        default:
          return `شادی کی دلی مبارکباد! اللہ تعالیٰ آپ کی ازدواجی زندگی کو خوشیوں اور برکتوں کا گہوارہ بنائے۔`
      }
    }

    if (isGraduation) {
      return `شاندار کامیابی اور گریجویشن پر دلی مبارکباد ${name}! آپ کی محنت رنگ لائی، دعا ہے کہ آپ کا مستقبل تابناک اور درخشاں ہو۔ 🎓🌟`
    }

    // Default Urdu
    return `محترم ${name}، ${occLabel} کے پرمسرت موقع پر دلی مبارکباد اور نیک تمنائیں! اللہ تعالیٰ آپ کے دامن کو ہمیشہ خوشیوں سے بھرپور رکھے۔ ✨`
  }

  // --- ENGLISH GENERATION (Specific to Occasion & Tone) ---
  if (isBirthday) {
    switch (tone) {
      case 'funny':
        return `Happy Birthday, ${name}! 🎉 Another year older, wiser, and still pretending to have it all together! May your day be filled with endless cake, zero adulting, and lots of laughter!`
      case 'warm':
      case 'emotional':
        return `Dearest ${name}, on your special birthday, I want to let you know how grateful I am to have ${relStr ? relStr : 'you'} in my life. You bring so much joy and kindness everywhere you go. Wishing you the happiest year ahead! ❤️🎂`
      case 'poetic':
        return `To ${name}: Like stars that brighten the night sky, your presence brings warmth to every heart. May this birthday unfold a new chapter of peace, vibrant memories, and boundless wonders. 🌟🌸`
      case 'religious':
        return `Happy Birthday, ${name}! 🤲 May Almighty Allah shower His countless blessings upon you, grant you optimal health, long life, peace of mind, and fulfilling success in everything you pursue. Ameen.`
      case 'short':
        return `Happy Birthday, ${name}! 🎂 Wishing you a fantastic celebration filled with joy, laughter, and grand blessings ahead! ✨`
      case 'formal':
      default:
        return `Warmest congratulations and best wishes to ${name} on your birthday. May the year ahead bring you great health, prosperity, and continued achievements. 🌟`
    }
  }

  if (isEid || isRamadan) {
    switch (tone) {
      case 'religious':
        return `Taqabbal Allahu Minna Wa Minkum. 🌙 Dearest ${name}, on this blessed Eid, may Allah accept your good deeds, answer your prayers, and fill your home with divine barakah and serenity. Eid Mubarak! 🤲`
      case 'warm':
        return `Wishing you and your beloved family a joyful and peaceful Eid Mubarak, ${name}! May this auspicious day bring endless smiles and treasured moments together. 🌙✨`
      case 'poetic':
        return `As the festive moon graces the sky, may it illuminate your life with serenity, harmony, and heavenly blessings. Eid Mubarak to ${name} and loved ones! 🌙🌸`
      case 'short':
        return `Eid Mubarak, ${name}! 🌙 Wishing you and your family a blessed, joyful, and prosperous Eid!`
      default:
        return `Sending heartfelt Eid greetings to ${name} and your family. May this joyous occasion bring happiness and abundance to your lives.`
    }
  }

  if (isWedding || isAnniversary) {
    switch (tone) {
      case 'religious':
        return `Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair. 🤲 May Allah bless your union with eternal love, harmony, and abundant peace. Heartfelt congratulations, ${name}!`
      case 'warm':
        return `Heartfelt congratulations on this wonderful milestone, ${name}! May the love you share today grow deeper and stronger with every passing year. Wishing you a lifetime of happiness! ❤️🥂`
      case 'poetic':
        return `May your journey together be a harmonious melody of laughter, respect, and deep understanding. Cheers to love that endures forever! Congratulations, ${name}! 🌸💍`
      case 'short':
        return `Congratulations on your special day, ${name}! 💍 Wishing you both a lifetime of love and joy!`
      default:
        return `Warmest congratulations to ${name} on this auspicious celebration. Wishing you both enduring happiness and prosperity in your beautiful journey together.`
    }
  }

  if (isGraduation) {
    switch (tone) {
      case 'funny':
        return `You officially did it, ${name}! 🎓 Hard work pays off, and now it's time to celebrate like a champion (before the real adulting begins)! Huge congrats!`
      case 'short':
        return `Huge congratulations on your graduation, ${name}! 🎓 Super proud of you and excited for your bright future!`
      default:
        return `Heartiest congratulations on your outstanding academic achievement and graduation, ${name}! 🎓 May your brilliance and dedication open doors to extraordinary success!`
    }
  }

  if (isFriendship) {
    switch (tone) {
      case 'warm':
        return `To my dearest friend ${name}, thank you for always being the one I can count on through every season of life. Truly blessed to have you in my corner! 🤝❤️`
      case 'funny':
        return `Cheers to another year of us being great friends and making questionable decisions together, ${name}! 😂 Best friends forever!`
      default:
        return `Happy Friendship Day to ${name}! Thank you for the endless laughs, great memories, and unwavering support.`
    }
  }

  if (isBaby) {
    return `Welcome to the world, precious little one! 👶🍼 Sending warmest congratulations and heartfelt blessings to ${name} and the proud parents on this joyous new arrival!`
  }

  // Generic fallback for any other occasion
  switch (tone) {
    case 'funny':
      return `Happy ${occLabel}, ${name}! Time to celebrate in style with good food, great company, and zero stress! 🎉`
    case 'warm':
      return `Sending warmest thoughts and heartfelt wishes to ${name} on this ${occLabel}. May your days be illuminated with happiness and love. ❤️`
    case 'poetic':
      return `May the gentle grace of this ${occLabel} bring peace to your spirit and inspiration to your days. Warmest wishes to ${name}. 🌸`
    case 'religious':
      return `On this ${occLabel}, may Almighty Allah shower His continuous mercy, peace, and abundance upon ${name} and your family. Ameen. 🤲`
    case 'short':
      return `Happy ${occLabel}, ${name}! Wishing you all the best today and always! ✨`
    case 'formal':
    default:
      return `Warmest congratulations and best wishes to ${name} on this memorable ${occLabel}. Wishing you continued health, happiness, and extraordinary success ahead.`
  }
}

export interface AIInvitationGeneratorParams {
  eventTypeName: string
  hostNames?: string
  groomName?: string
  brideName?: string
  tone?: 'formal' | 'royal' | 'islamic' | 'traditional' | 'warm'
  lang?: string
}

export function generateAIInvitationNotes({
  eventTypeName,
  hostNames,
  groomName,
  brideName,
  tone = 'formal',
  lang = 'en',
}: AIInvitationGeneratorParams): string {
  const isUrdu = lang === 'ur' || lang === 'ar'
  const hosts = hostNames?.trim() || (isUrdu ? 'جملہ اہل خانہ' : 'The Family')
  const couple = groomName && brideName ? `${groomName} & ${brideName}` : ''

  if (isUrdu) {
    switch (tone) {
      case 'islamic':
        return `بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ\n\nاللہ تعالیٰ کے فضل و کرم سے اس بابرکت تقریب میں تشریف لا کر دولہا اور دلہن کو دعاؤں سے نوازیں۔ آپ کی پرخلوص شرکت اور نیک تمنائیں ہمارے لیے باعثِ افتخار ہوں گی۔\n\nاز طرف: ${hosts}`
      case 'royal':
        return `بزمِ مسرت میں آپ کی باوقار شرکت اور دلہا دلہن کے حق میں دعائیں ہمارے لیے باعثِ مسرت و عزت ہوں گی۔ امید ہے کہ آپ اپنی تشریف آوری سے اس یادگار تقریب کو رونق بخشیں گے۔\n\nالتماسِ دعا: ${hosts}`
      case 'traditional':
        return `خوشیوں بھری شام اور محبتوں کے رنگ!\nہمارے خاندان کی اس پرمسرت تقریب میں دلہا اور دلہن کو دعائیں دینے کے لیے آپ کی شرکت کے تہہ دل سے منتظر رہیں گے۔\n\nاز طرف: ${hosts}`
      default:
        return `اللہ تعالیٰ کے فضل و احسان سے ${eventTypeName} کی اس پرمسرت تقریب میں آپ کی باوقار تشریف آوری اور دلہا دلہن کے حق میں دعائیں دونوں خاندانوں کے لیے باعثِ برکت ہوں گی۔\n\nاز طرف: ${hosts}`
    }
  }

  // English
  switch (tone) {
    case 'islamic':
      return `With the grace of Almighty Allah, we cordially request the honor of your presence and heartfelt prayers to bless the newlywed couple on the auspicious celebration of ${couple ? `the marriage of ${couple}` : eventTypeName}.\n\nWarm regards,\n${hosts}`
    case 'royal':
      return `We request the immense pleasure of your company to celebrate this grand milestone and shower your blessings upon ${couple ? `${couple}` : 'the couple'}. Your gracious presence will add distinction to our joy.\n\nCordially invited by,\n${hosts}`
    case 'traditional':
      return `Together with our families, we joyfully invite you to share in our happiness and bestow your blessings upon the couple as we celebrate this special ${eventTypeName}.\n\nWith warm wishes,\n${hosts}`
    default:
      return `We cordially invite you to grace the auspicious occasion of ${eventTypeName} with your presence and heartfelt prayers for the couple as they begin their sacred journey together.\n\nHosted by: ${hosts}`
  }
}
