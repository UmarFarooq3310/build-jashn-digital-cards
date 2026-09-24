'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Sparkles,
  Gift,
  Calendar,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Heart,
  Moon,
  Crown,
  GraduationCap,
  Cake,
  Palette,
  Edit3,
  Eye,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  QrCode,
  LayoutDashboard,
  MessageCircle,
  Smartphone,
  Lock,
  Unlock,
  Flame,
  Award,
  Baby,
  Search,
  Play,
  X,
  Compass,
  Phone,
  PartyPopper,
  HeartHandshake,
} from 'lucide-react'
import { createMagicLink, updateMagicLink, getMagicLink, recordCardShare } from '@/lib/jashn/magic-service'
import type { MagicLinkType, MagicOccasion, MagicThemeId } from '@/lib/jashn/magic-types'
import { useJashn } from '@/lib/jashn/store'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { useLang } from '@/lib/lang/context'
import { cn, isPageReload } from '@/lib/utils'

export interface OccasionMeta {
  id: MagicOccasion
  label: string
  urdu: string
  badge: string
  category: 'all' | 'love' | 'birthday' | 'islamic' | 'milestones'
  trending?: boolean
  icon: any
  defaultType: MagicLinkType
  desc: string
  theme: MagicThemeId
  defaultLetter: string
  defaultVerse: string
  urduVerse: string
  defaultQuotes: string[]
}

export const OCCASIONS: OccasionMeta[] = [
  {
    id: 'proposal',
    label: 'Proposal & Love Confession',
    urdu: 'شادی کی پیشکش و اظہارِ محبت',
    badge: '💍 Ultra Romantic & Viral',
    category: 'love',
    trending: true,
    icon: Heart,
    defaultType: 'wish',
    desc: '3D velvet diamond ring box, heartfelt Will You Marry Me letter, interactive YES button',
    theme: 'proposal-crimson',
    defaultLetter:
      'From the moment you entered my life, every sunrise felt brighter and every tomorrow worth waiting for. You are my greatest prayer answered. Will you hold my hand and walk with me through all of life\'s adventures?',
    defaultVerse: 'You are my dream come true, my peace and my forever love 🌸',
    urduVerse: 'تم میری زندگی کا سب سے خوبصورت خواب اور دعا ہو 🌸',
    defaultQuotes: [
      'Your smile lights up even my darkest days. You are my greatest peace. 🌸',
      'With you, every simple day turns into an unforgettable adventure. ✨',
      'I promise to cherish, respect, and love you unconditionally forever. 🤝',
      'I cannot imagine a single tomorrow without your hand in mine. 💖',
    ],
  },
  {
    id: 'birthday',
    label: 'Birthday Bash',
    urdu: 'سالگرہ مبارک',
    badge: '🎂 Blowable Candles & Cake',
    category: 'birthday',
    trending: true,
    icon: Cake,
    defaultType: 'wish',
    desc: 'Interactive cake, blow out candles with microphone or tap, popping balloons',
    theme: 'emerald-gold',
    defaultLetter:
      'Wishing you infinite happiness, boundless health, and success in this wonderful new chapter. Keep shining and inspiring everyone around you!',
    defaultVerse: 'Wishing you infinite joy, sparkling health and pure happiness 🎂',
    urduVerse: 'سالگرہ بہت بہت مبارک ہو! اللّٰہ آپ کو ہمیشہ ہنستا مسکراتا رکھے 🎂',
    defaultQuotes: [
      'Your smile illuminates every room you enter! ✨',
      'Remember our crazy late-night adventures? Best times ever! 🌙',
      'May this year unlock the biggest dreams you have held in your heart! 🚀',
      'The world is genuinely more wonderful and kinder with you in it! 💛',
    ],
  },
  {
    id: 'wedding',
    label: 'Wedding & Shaadi',
    urdu: 'شادی مبارک',
    badge: '👑 Royal Mughal Invitation',
    category: 'love',
    trending: true,
    icon: Crown,
    defaultType: 'invite',
    desc: 'Royal couple celebration, Nikah & Baraat invite with 1-click RSVP & Google Maps',
    theme: 'mughal-gold',
    defaultLetter:
      'Two beautiful souls united in an eternal bond of love, respect, and faith. May your union be blessed with perpetual peace and barakah.',
    defaultVerse: 'Two beautiful souls united in an eternal bond of love and faith 💍',
    urduVerse: 'بارک اللہ لکما وبارک علیکما وجمع بینکما فی خیر 💍',
    defaultQuotes: [
      'Two beautiful souls united in an eternal bond of love and faith. 💍',
      'May your marriage be filled with laughter, deep friendship, and endless barakah. 🌸',
      'A love story blessed by heaven and celebrated by everyone who loves you. ✨',
      'Wishing the gorgeous couple a lifetime of shared dreams and happiness. 🥂',
    ],
  },
  {
    id: 'eid',
    label: 'Eid Mubarak',
    urdu: 'عید مبارک',
    badge: '🌙 Chand Raat & Lanterns',
    category: 'islamic',
    trending: true,
    icon: Moon,
    defaultType: 'wish',
    desc: 'Floating crescent moon, lantern lighting ritual, and heartfelt Eid Dua greetings',
    theme: 'emerald-gold',
    defaultLetter:
      'Eid Mubarak! May this holy occasion bring immense blessings, peace, and prosperity to you and your beloved family. May your days be sweet like sheer khurma!',
    defaultVerse: 'May Allah shower your home with joy, peace, and abundance 🌙',
    urduVerse: 'عید مبارک! اللّٰہ پاک آپ کی تمام دعائیں اور عبادات قبول فرمائے 🌙',
    defaultQuotes: [
      'May Allah shower your home with joy, peace, and abundance this blessed Eid. 🌙',
      'Taqabbal Allahu minna wa minkum (May Allah accept our good deeds). 🤲',
      'May the sweetness of sheer khurma and laughter fill your lovely days! 🍯',
      'Sending heartfelt Duas for your health, prosperity, and happiness. ✨',
    ],
  },
  {
    id: 'anniversary',
    label: 'Anniversary & Romance',
    urdu: 'سالگرہ شادی و رومانس',
    badge: '🥂 Champagne & Memories',
    category: 'love',
    icon: Sparkles,
    defaultType: 'wish',
    desc: 'Champagne cork pop, memory timeline cards, and golden wax sealed love note',
    theme: 'ruby-velvet',
    defaultLetter:
      'Happy Anniversary! Thank you for walking beside me through every storm and sunshine. Here is to celebrating our journey and the countless memories yet to come!',
    defaultVerse: 'To the love of my life: thank you for making every day extraordinary ❤️',
    urduVerse: 'شادی کی سالگرہ مبارک! ہماری محبت سدا یوں ہی قائم رہے ❤️',
    defaultQuotes: [
      'Every single day with you feels like a beautiful dream come true. ❤️',
      'Through every storm and sunshine, our bond only grows deeper. 🌹',
      'To the love of my life: thank you for making life so incredibly special. 💫',
      'Here is to celebrating our journey and the countless memories yet to come! 🥂',
    ],
  },
  {
    id: 'graduation',
    label: 'Graduation & Success',
    urdu: 'کامیابی و گریجویشن',
    badge: '🎓 Golden Honors & Trophy',
    category: 'milestones',
    icon: GraduationCap,
    defaultType: 'wish',
    desc: 'Graduation cap toss, cosmic achievement meter, and gold star celebrations',
    theme: 'royal-sapphire',
    defaultLetter:
      'Huge congratulations on graduating! All your sleepless nights and hard work have paid off in pure gold. The world is ready for your brilliance!',
    defaultVerse: 'Huge congratulations on graduating! The world is ready for your brilliance 🏆',
    urduVerse: 'شاندار کامیابی پر دلی مبارکباد! آپ پر بہت فخر ہے 🏆',
    defaultQuotes: [
      'All your sleepless nights and hard work have finally paid off in gold! 🎓',
      'This degree is just the launchpad — the world is ready for your brilliance! 🚀',
      'Huge congratulations on graduating with such dedication and excellence! 🏆',
      'So beyond proud of you! Go conquer your biggest dreams! 🌟',
    ],
  },
  {
    id: 'party',
    label: 'Party & Celebration',
    urdu: 'جشن پارٹی',
    badge: '🎉 VIP Event & RSVP',
    category: 'birthday',
    icon: Award,
    defaultType: 'invite',
    desc: 'Music party, confetti fanfare, and guest attendance tracker',
    theme: 'midnight-stars',
    defaultLetter:
      'Get ready for an unforgettable evening of high energy, incredible food, music, and memories. Dress sharp and get ready to celebrate!',
    defaultVerse: 'Get ready for an evening of unmatched music, laughter, and memories 🎉',
    urduVerse: 'شاندار پارٹی اور جشن میں آپ کی آمد ہمارے لیے باعثِ مسرت ہوگی ✨',
    defaultQuotes: [
      'Get ready for an evening of unmatched music, laughter, and celebrations! 🎉',
      'The countdown has begun — dress sharp and bring your highest energy! 🕺',
      'Good food, great people, and memories we will talk about for years. 🥂',
      'Let the celebrations begin! Cannot wait to see you there! ✨',
    ],
  },
  {
    id: 'newborn',
    label: 'Newborn & Baby Shower',
    urdu: 'نومولود کی آمد مبارک',
    badge: '🍼 Baby Blessing & Gift',
    category: 'milestones',
    icon: Baby,
    defaultType: 'wish',
    desc: 'Baby crib starlight, lullaby chimes, and congratulations for parents',
    theme: 'emerald-gold',
    defaultLetter:
      'A warm welcome to your precious little angel! May their life be filled with sweet giggles, bright health, and endless love.',
    defaultVerse: 'Welcome little angel! May Allah bless the baby with health and joy 🍼',
    urduVerse: 'ننھے پھول کی آمد بہت بہت مبارک ہو! اللّٰہ پاک درازی عمر عطا فرمائے 🌸',
    defaultQuotes: [
      'Ten tiny fingers, ten tiny toes, and a whole universe of love! 👶',
      'May this little bundle of joy bring infinite barakah to your home. 🌟',
      'Congratulations on your newest family member! Cherish every tiny moment. 🍼',
      'Sending heartfelt prayers and cuddles to the beautiful little miracle! 🌸',
    ],
  },
  {
    id: 'ramadan',
    label: 'Ramadan Kareem',
    urdu: 'رمضان مبارک',
    badge: '🌙 Holy Month of Peace',
    category: 'islamic',
    icon: Moon,
    defaultType: 'wish',
    desc: 'Iftar & Suhoor blessings, Holy Quran verses, and digital lantern lighting',
    theme: 'emerald-gold',
    defaultLetter:
      'Ramadan Mubarak! May this holy month purify our hearts, answer our prayers, and bring divine peace to your household.',
    defaultVerse: 'May this blessed month illuminate your heart and bring boundless peace 🌙',
    urduVerse: 'رمضان المبارک کا بابرکت مہینہ مبارک ہو! اللّٰہ پاک عبادات قبول فرمائے 🤲',
    defaultQuotes: [
      'Wishing you a peaceful and spiritually uplifting Ramadan Kareem! 🌙',
      'May your fasting and Duas be accepted with divine mercy and love. 🤲',
      'May the peace of this sacred month remain in your home all year round. ✨',
      'Sending warm wishes and Dua for you and your beloved family! 🍯',
    ],
  },
  {
    id: 'apology',
    label: 'Heartfelt Apology & Dua',
    urdu: 'معافی و صلح',
    badge: '🥺 Forgive Me & Reconnect',
    category: 'love',
    icon: Heart,
    defaultType: 'wish',
    desc: 'Golden wax envelope, heartfelt amends letter, and gentle peace offering',
    theme: 'romantic-rose',
    defaultLetter:
      'I am truly sorry from the bottom of my heart. Our bond means far too much to me, and I hope we can smile together again.',
    defaultVerse: 'Our bond is precious. Please accept my heartfelt apology ❤️',
    urduVerse: 'مجھ سے ہوئی غلطی پر دل کی گہرائیوں سے معذرت خواہ ہوں۔ صلح کر لیں ❤️',
    defaultQuotes: [
      'I value our bond far more than any disagreement or pride. 🤝',
      'I am genuinely sorry for causing you sadness. Please forgive me. 🌸',
      'Life is too short to let misunderstandings stay between two caring hearts. ❤️',
      'Hoping we can start fresh with warmth, laughter, and trust. ✨',
    ],
  },
  {
    id: 'friendship',
    label: 'Best Friends & Friendship',
    urdu: 'دوستی و تعلقات',
    badge: '👯‍♀️ Best Friends Forever',
    category: 'love',
    trending: true,
    icon: HeartHandshake,
    defaultType: 'wish',
    desc: 'Interactive Fortune Jar, 4 friendship gems, golden wax seal letter, and high-five replies',
    theme: 'romantic-rose',
    defaultLetter:
      'Thank you for being the kind of friend who makes the world feel lighter, brighter, and full of joy. Having you in my life is one of my greatest blessings!',
    defaultVerse: 'True friendship is a rare treasure and a lifelong blessing 💖',
    urduVerse: 'سچی دوستی قدرت کا سب سے خوبصورت اور نایاب تحفہ ہے 💖',
    defaultQuotes: [
      'No matter how much time passes, we always pick up right where we left off! ✨',
      'Our inside jokes and late night laughter sessions are forever legendary! 🌙',
      'Thank you for believing in me even when I doubted myself. You are family chosen by heart! 🤝',
      'Life is 100x more fun, kinder, and unforgettable with you by my side! 👯‍♀️',
    ],
  },
  {
    id: 'thankyou',
    label: 'Heartfelt Gratitude',
    urdu: 'شکریہ و اظہارِ تشکر',
    badge: '🙏 24K Tribute & Praise',
    category: 'milestones',
    trending: true,
    icon: Award,
    defaultType: 'wish',
    desc: '24K Golden tribute box, appreciation spark gems, and heartfelt thank you letter',
    theme: 'mughal-gold',
    defaultLetter:
      'I want to express my deepest appreciation for your kindness, support, and guidance. Your generosity has touched my heart more than words can say.',
    defaultVerse: 'With sincere gratitude from the bottom of my heart 🙏',
    urduVerse: 'آپ کے خلوص، رہنمائی اور تعاون کے لیے دل کی گہرائیوں سے شکریہ 🙏',
    defaultQuotes: [
      'Your generosity and warmth have made a massive difference in my journey. 🌟',
      'I am deeply grateful for your continuous encouragement and steady guidance. ✨',
      'Few people touch lives with the kindness, humility, and grace that you bring. 💛',
      'Thank you from the bottom of my heart for everything you have done! 🙏',
    ],
  },
  {
    id: 'getwell',
    label: 'Get Well & Healing Prayers',
    urdu: 'صحت یابی کی دعا',
    badge: '🌸 Healing Sunshine & Care',
    category: 'milestones',
    icon: Heart,
    defaultType: 'wish',
    desc: 'Blooming sunlight garden, warm comfort petals, and heartfelt recovery prayers',
    theme: 'emerald-gold',
    defaultLetter:
      'Sending you endless warmth, comfort, and sincere prayers for your swift and complete recovery. Take all the time you need to heal and regain your radiant strength!',
    defaultVerse: 'Praying for your speedy recovery, perfect health, and peace 🌸',
    urduVerse: 'اللّٰہ پاک آپ کو مکمل شفا، صحتِ کاملہ اور لمبی زندگی عطا فرمائے 🤲',
    defaultQuotes: [
      'Praying for your swift, gentle, and complete return to full strength and joy! 🌸',
      'Take all the peaceful time you need to rest, recharge, and heal comfortably. ☀️',
      'Sending immense positive energy, warmth, and heartfelt prayers your way. 🤲',
      'Cannot wait to see you back on your feet smiling and shining brighter than ever! 💛',
    ],
  },
  {
    id: 'newyear',
    label: 'New Year & Fresh Start',
    urdu: 'نیا سال مبارک',
    badge: '🎆 Fireworks & Countdown',
    category: 'birthday',
    trending: true,
    icon: Sparkles,
    defaultType: 'wish',
    desc: 'Midnight fireworks spectacle, resolution sparklers, and golden New Year blessings',
    theme: 'midnight-stars',
    defaultLetter:
      'Wishing you 365 days of boundless joy, spectacular breakthroughs, radiant health, and unstoppable success in this magnificent New Year!',
    defaultVerse: 'May this New Year bring immense happiness, success, and prosperity 🎆',
    urduVerse: 'نیا سال مبارک! اللّٰہ پاک یہ سال آپ کے لیے خوشیوں اور کامیابیوں کا سال بنائے ✨',
    defaultQuotes: [
      'May this new chapter unlock the greatest dreams and blessings in your life! 🚀',
      'Here is to 365 new opportunities to shine, love, and conquer new heights! ✨',
      'Wishing you radiant health, infinite peace, and prosperous beginnings! 🥂',
      'Let go of the past and step boldly into your most triumphant year yet! 🌟',
    ],
  },
]

// Occasion-specific 6-Palette Systems
export const OCCASION_PALETTES: Record<string, { id: MagicThemeId; name: string; gradient: string; accent: string; previewBorder: string }[]> = {
  proposal: [
    {
      id: 'proposal-crimson',
      name: 'Velvet Crimson & 24K Gold',
      gradient: 'from-[#3b0312] via-[#24010a] to-[#0d0004]',
      accent: '#f43f5e',
      previewBorder: 'border-rose-500',
    },
    {
      id: 'proposal-rose',
      name: 'Midnight Rose & Diamond',
      gradient: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]',
      accent: '#fb7185',
      previewBorder: 'border-rose-400',
    },
    {
      id: 'proposal-amethyst',
      name: 'Twilight Amethyst & Starlight',
      gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]',
      accent: '#c084fc',
      previewBorder: 'border-purple-400',
    },
    {
      id: 'proposal-emerald',
      name: 'Emerald Romance & Champagne',
      gradient: 'from-[#04241a] via-[#021711] to-[#010a07]',
      accent: '#34d399',
      previewBorder: 'border-emerald-400',
    },
    {
      id: 'proposal-champagne',
      name: 'Champagne Royal Gold',
      gradient: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]',
      accent: '#fbbf24',
      previewBorder: 'border-yellow-400',
    },
    {
      id: 'proposal-noir',
      name: 'Pure Obsidian Noir & Platinum',
      gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]',
      accent: '#f8fafc',
      previewBorder: 'border-slate-300',
    },
  ],
  birthday: [
    { id: 'emerald-gold', name: 'Cardzy Emerald & Gold', gradient: 'from-[#032017] via-[#064e3b] to-[#02130e]', accent: '#f59e0b', previewBorder: 'border-amber-400' },
    { id: 'mughal-gold', name: 'Mughal 24K Royal Gold', gradient: 'from-[#1c1404] via-[#2d1f05] to-[#120d02]', accent: '#eab308', previewBorder: 'border-yellow-400' },
    { id: 'ruby-velvet', name: 'Ruby Velvet & Rose', gradient: 'from-[#380512] via-[#5c081e] to-[#20020a]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'royal-sapphire', name: 'Royal Sapphire Night', gradient: 'from-[#091530] via-[#0f2552] to-[#040a17]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'midnight-stars', name: 'Midnight Celestial Purple', gradient: 'from-[#0b0817] via-[#1a1236] to-[#05030d]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'romantic-rose', name: 'Sweet Berry Blush', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
  ],
  wedding: [
    { id: 'mughal-gold', name: 'Mughal 24K Royal Gold', gradient: 'from-[#1c1404] via-[#2d1f05] to-[#120d02]', accent: '#f5c451', previewBorder: 'border-amber-400' },
    { id: 'ruby-velvet', name: 'Ruby Velvet & Rose Petals', gradient: 'from-[#380512] via-[#5c081e] to-[#20020a]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'emerald-gold', name: 'Emerald Nikkah & Antique Gold', gradient: 'from-[#032017] via-[#064e3b] to-[#02130e]', accent: '#10b981', previewBorder: 'border-emerald-400' },
    { id: 'royal-sapphire', name: 'Royal Sapphire & Silver', gradient: 'from-[#091530] via-[#0f2552] to-[#040a17]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'romantic-rose', name: 'Blush Pink & Champagne', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
    { id: 'proposal-noir', name: 'Midnight Obsidian & Gold', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f5c451', previewBorder: 'border-amber-300' },
  ],
  eid: [
    { id: 'emerald-gold', name: 'Sacred Emerald & Minaret Gold', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#10b981', previewBorder: 'border-emerald-400' },
    { id: 'midnight-stars', name: 'Chand Raat Midnight Blue', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'mughal-gold', name: 'Golden Dune & Crescent Starlight', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'royal-sapphire', name: 'Deep Mosque Sapphire', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'romantic-rose', name: 'Rose Sheer Khurma & Gold', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
    { id: 'ruby-velvet', name: 'Moroccan Lantern Ruby', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
  ],
  anniversary: [
    { id: 'proposal-crimson', name: 'Velvet Crimson Romance', gradient: 'from-[#3b0312] via-[#24010a] to-[#0d0004]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'proposal-champagne', name: 'Champagne Gold Toast', gradient: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]', accent: '#fbbf24', previewBorder: 'border-yellow-400' },
    { id: 'proposal-rose', name: 'Midnight Rose & Candlelight', gradient: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]', accent: '#fb7185', previewBorder: 'border-rose-400' },
    { id: 'ruby-velvet', name: 'Deep Ruby Passion', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-600' },
    { id: 'proposal-amethyst', name: 'Twilight Amethyst Moonbeam', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'proposal-noir', name: 'Classic Noir & Platinum', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f8fafc', previewBorder: 'border-slate-300' },
  ],
  graduation: [
    { id: 'royal-sapphire', name: 'University Blue & Gold Tassel', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'emerald-gold', name: 'Academic Emerald & Honors Gold', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#10b981', previewBorder: 'border-emerald-400' },
    { id: 'mughal-gold', name: 'Golden Valedictorian Distinction', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'midnight-stars', name: 'Midnight Scholar & Starlight', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'proposal-noir', name: 'Presidential Black & Platinum', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f8fafc', previewBorder: 'border-slate-300' },
    { id: 'ruby-velvet', name: 'Crimson Honors & Distinction', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
  ],
  party: [
    { id: 'midnight-stars', name: 'Neon Purple & Disco Flash', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'proposal-amethyst', name: 'Electric Ultraviolet Laser', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#e879f9', previewBorder: 'border-pink-400' },
    { id: 'ruby-velvet', name: 'Club Magenta & Hot Pink', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'royal-sapphire', name: 'Cyber Sapphire & Laser Blue', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'proposal-crimson', name: 'VIP Red Carpet Glam', gradient: 'from-[#3b0312] via-[#24010a] to-[#0d0004]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'mughal-gold', name: 'Champagne Gold VIP Lounge', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-amber-400' },
  ],
  newborn: [
    { id: 'emerald-gold', name: 'Sage Mint & Golden Starlight', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#34d399', previewBorder: 'border-emerald-400' },
    { id: 'proposal-rose', name: 'Baby Blush Pink & Ivory', gradient: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]', accent: '#f472b6', previewBorder: 'border-pink-400' },
    { id: 'royal-sapphire', name: 'Little Prince Sky Blue', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'mughal-gold', name: 'Warm Vanilla Honey & Gold', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'midnight-stars', name: 'Lullaby Lavender & Moon', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'romantic-rose', name: 'Sweet Peach & Cloud White', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
  ],
  ramadan: [
    { id: 'emerald-gold', name: 'Sacred Medina Green & Gold', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#10b981', previewBorder: 'border-emerald-400' },
    { id: 'royal-sapphire', name: 'Taraweeh Midnight Sapphire', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'mughal-gold', name: 'Desert Hilal & Lantern Amber', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'midnight-stars', name: 'Qadr Night Amethyst & Stars', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'proposal-noir', name: 'Kaaba Kiswah Black & Gold', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f5c451', previewBorder: 'border-amber-300' },
    { id: 'ruby-velvet', name: 'Andalusian Ruby & Brass', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
  ],
  apology: [
    { id: 'romantic-rose', name: 'Soft Rose & Healing Dawn', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
    { id: 'proposal-rose', name: 'Gentle Blush & Peace Lily', gradient: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]', accent: '#f472b6', previewBorder: 'border-pink-400' },
    { id: 'proposal-amethyst', name: 'Twilight Lilac & Serenity', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'proposal-crimson', name: 'Deep Sincere Crimson', gradient: 'from-[#3b0312] via-[#24010a] to-[#0d0004]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'mughal-gold', name: 'Kintsugi Gold & Ceramic', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'emerald-gold', name: 'Olive Branch & Warm Amber', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#34d399', previewBorder: 'border-emerald-400' },
  ],
  friendship: [
    { id: 'romantic-rose', name: 'Sweet Berry Bestie Blush', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
    { id: 'proposal-amethyst', name: 'Twilight Lavender Glow', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'midnight-stars', name: 'Celestial Starlight', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'royal-sapphire', name: 'Ocean Breeze & Sapphire', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'proposal-champagne', name: 'Champagne Cheers & Gold', gradient: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]', accent: '#fbbf24', previewBorder: 'border-yellow-400' },
    { id: 'emerald-gold', name: 'Sage Evergreen Friendship', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#34d399', previewBorder: 'border-emerald-400' },
  ],
  thankyou: [
    { id: 'mughal-gold', name: '24K Royal Tribute Gold', gradient: 'from-[#1a1304] via-[#2d1f05] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-amber-400' },
    { id: 'proposal-champagne', name: 'Warm Champagne Gratitude', gradient: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]', accent: '#fbbf24', previewBorder: 'border-yellow-400' },
    { id: 'emerald-gold', name: 'Emerald Honor & Gold', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#10b981', previewBorder: 'border-emerald-400' },
    { id: 'royal-sapphire', name: 'Prestige Sapphire & Silver', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'ruby-velvet', name: 'Velvet Ruby Appreciation', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'proposal-noir', name: 'Classic Obsidian Distinction', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f8fafc', previewBorder: 'border-slate-300' },
  ],
  getwell: [
    { id: 'emerald-gold', name: 'Healing Meadow & Sunlight', gradient: 'from-[#022017] via-[#043324] to-[#01140e]', accent: '#34d399', previewBorder: 'border-emerald-400' },
    { id: 'proposal-rose', name: 'Gentle Blossom & Comfort', gradient: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]', accent: '#f472b6', previewBorder: 'border-pink-400' },
    { id: 'royal-sapphire', name: 'Serene Azure Sky', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'mughal-gold', name: 'Warm Sunburst & Honey', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-yellow-400' },
    { id: 'proposal-amethyst', name: 'Calming Lavender Peace', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'romantic-rose', name: 'Soft Rose Petal Glow', gradient: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', accent: '#fb7185', previewBorder: 'border-rose-400' },
  ],
  newyear: [
    { id: 'midnight-stars', name: 'Midnight Fireworks & Confetti', gradient: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', accent: '#c084fc', previewBorder: 'border-purple-400' },
    { id: 'mughal-gold', name: '24K Champagne Countdown', gradient: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', accent: '#f5c451', previewBorder: 'border-amber-400' },
    { id: 'royal-sapphire', name: 'Electric Sapphire Gala', gradient: 'from-[#07132a] via-[#0d214a] to-[#030914]', accent: '#38bdf8', previewBorder: 'border-sky-400' },
    { id: 'ruby-velvet', name: 'Ruby Glamour Celebration', gradient: 'from-[#330410] via-[#52071a] to-[#1a0107]', accent: '#f43f5e', previewBorder: 'border-rose-500' },
    { id: 'proposal-noir', name: 'VIP Obsidian Platinum', gradient: 'from-[#141414] via-[#0a0a0a] to-[#000000]', accent: '#f8fafc', previewBorder: 'border-slate-300' },
    { id: 'proposal-amethyst', name: 'Neon Ultraviolet Flash', gradient: 'from-[#1f0933] via-[#120421] to-[#08010f]', accent: '#e879f9', previewBorder: 'border-pink-400' },
  ],
}

export function getPalettesForOccasion(occ: string) {
  return OCCASION_PALETTES[occ] || OCCASION_PALETTES.birthday
}

export default function CreateMagicLinkClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useJashn((s) => s.user)
  const showToast = useJashn((s) => s.showToast)
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const occParam = searchParams.get('occasion') as MagicOccasion | null

  // 2-Step Progression State
  const [step, setStep] = useState<1 | 2>(occParam ? 2 : 1)
  const [activeTab, setActiveTab] = useState<'details' | 'design' | 'preview'>('details')

  // Occasion Filter & Search
  const [activeCategory, setActiveCategory] = useState<'all' | 'love' | 'birthday' | 'islamic' | 'milestones'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewDemoOccasion, setPreviewDemoOccasion] = useState<OccasionMeta | null>(null)

  // Chosen occasion
  const [selectedOccasion, setSelectedOccasion] = useState<MagicOccasion>(occParam || 'proposal')
  const activeOccMeta = OCCASIONS.find((o) => o.id === selectedOccasion) || OCCASIONS[0]

  // Palettes for chosen occasion
  const availablePalettes = getPalettesForOccasion(selectedOccasion)

  // Form Fields
  const [selectedTheme, setSelectedTheme] = useState<MagicThemeId>(availablePalettes[0].id)
  const [linkType, setLinkType] = useState<MagicLinkType>(activeOccMeta.defaultType)
  const [senderName, setSenderName] = useState(user?.name || '')
  const [recipientName, setRecipientName] = useState('')

  // Wish Specific
  const [recipientAge, setRecipientAge] = useState<number>(24)
  const [candleCount, setCandleCount] = useState<number>(3)
  const [quotes, setQuotes] = useState<string[]>(activeOccMeta.defaultQuotes)
  const [secretLetter, setSecretLetter] = useState(activeOccMeta.defaultLetter)
  const [customVerse, setCustomVerse] = useState(isUrdu ? activeOccMeta.urduVerse : activeOccMeta.defaultVerse)

  // Proposal Specific
  const [howWeMet, setHowWeMet] = useState('')
  const [specialDate, setSpecialDate] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  // Invite Specific
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('7:30 PM')
  const [venueName, setVenueName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [googleMapsUrl, setGoogleMapsUrl] = useState('')
  const [coupleNames, setCoupleNames] = useState('')

  // Submission State
  const [loading, setLoading] = useState(false)
  const [createdSlug, setCreatedSlug] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const editSlug = searchParams.get('edit')
  const draftKey = editSlug ? `cardzy_draft_magic_edit_${editSlug}` : 'cardzy_draft_magic'
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)

  // Listen to beforeunload to detect page refresh/reload reliably
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem('__cardzy_reloading__', '1')
        if (!editSlug) {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_magic')
        }
      } catch {}
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [draftKey, editSlug])

  // 1. Initial Load: Restore draft or fetch edit record
  useEffect(() => {
    let isCancelled = false
    async function initData() {
      const isReload = isPageReload() || (typeof window !== 'undefined' && sessionStorage.getItem('__cardzy_reloading__') === '1')
      // Clean up legacy entries and reload flag
      try {
        sessionStorage.removeItem('__cardzy_reloading__')
        localStorage.removeItem(draftKey)
        localStorage.removeItem('cardzy_draft_magic')
      } catch {}

      // If user refreshed the creation page (and not editing an existing card), clear draft and reset all fields
      if (!editSlug && isReload) {
        try {
          sessionStorage.removeItem(draftKey)
          sessionStorage.removeItem('cardzy_draft_magic')
        } catch {}
        if (!isCancelled) {
          setSenderName('')
          setRecipientName('')
          setRecipientAge(24)
          setCandleCount(3)
          setQuotes(activeOccMeta.defaultQuotes)
          setSecretLetter(activeOccMeta.defaultLetter)
          setCustomVerse(isUrdu ? activeOccMeta.urduVerse : activeOccMeta.defaultVerse)
          setHowWeMet('')
          setSpecialDate('')
          setWhatsappNumber('')
          setPhotoUrl('')
          setEventTitle('')
          setEventDate('')
          setEventTime('7:30 PM')
          setVenueName('')
          setVenueAddress('')
          setGoogleMapsUrl('')
          setCoupleNames('')
          setStep(1)
          setIsInitialLoaded(true)
        }
        return
      }

      if (editSlug) {
        let loadedData: any = null
        try {
          const draftJson = typeof window !== 'undefined' ? sessionStorage.getItem(draftKey) : null
          if (draftJson) loadedData = JSON.parse(draftJson)
        } catch {}

        if (!loadedData) {
          try {
            const remote = await getMagicLink(editSlug)
            if (remote) loadedData = remote
          } catch (err) {
            console.error('Error fetching magic link for edit:', err)
          }
        }

        if (loadedData && !isCancelled) {
          if (loadedData.occasion) setSelectedOccasion(loadedData.occasion)
          if (loadedData.theme) setSelectedTheme(loadedData.theme)
          if (loadedData.type) setLinkType(loadedData.type)
          if (loadedData.senderName !== undefined) setSenderName(loadedData.senderName)
          if (loadedData.recipientName !== undefined) setRecipientName(loadedData.recipientName)
          if (loadedData.recipientAge !== undefined) setRecipientAge(loadedData.recipientAge)
          
          if (loadedData.wishContent) {
            const wc = loadedData.wishContent
            if (wc.candlesCount !== undefined) setCandleCount(wc.candlesCount)
            if (wc.urduGreeting !== undefined) setCustomVerse(wc.urduGreeting)
            if (wc.secretLetter !== undefined) setSecretLetter(wc.secretLetter)
            if (wc.howWeMet !== undefined) setHowWeMet(wc.howWeMet)
            if (wc.specialDate !== undefined) setSpecialDate(wc.specialDate)
            if (wc.whatsappNumber !== undefined) setWhatsappNumber(wc.whatsappNumber)
            if (wc.photoUrl !== undefined) setPhotoUrl(wc.photoUrl)
            if (wc.balloons && Array.isArray(wc.balloons)) {
              setQuotes(wc.balloons.map((b: any) => b.quote || ''))
            }
          }

          if (loadedData.inviteContent) {
            const ic = loadedData.inviteContent
            if (ic.eventTitle !== undefined) setEventTitle(ic.eventTitle)
            if (ic.eventDate !== undefined) setEventDate(ic.eventDate)
            if (ic.eventTime !== undefined) setEventTime(ic.eventTime)
            if (ic.venueName !== undefined) setVenueName(ic.venueName)
            if (ic.venueAddress !== undefined) setVenueAddress(ic.venueAddress)
            if (ic.googleMapsUrl !== undefined) setGoogleMapsUrl(ic.googleMapsUrl)
            if (ic.coupleNames !== undefined) setCoupleNames(ic.coupleNames)
          }

          if (loadedData.step) setStep(loadedData.step as 1 | 2)
          else setStep(2)
          if (loadedData.activeTab) setActiveTab(loadedData.activeTab as 'details' | 'design' | 'preview')
        }
      } else {
        try {
          const draftJson = typeof window !== 'undefined' ? sessionStorage.getItem(draftKey) : null
          if (draftJson) {
            const d = JSON.parse(draftJson)
            if (d && typeof d === 'object' && !isCancelled) {
              if (d.selectedOccasion) setSelectedOccasion(d.selectedOccasion)
              if (d.selectedTheme) setSelectedTheme(d.selectedTheme)
              if (d.linkType) setLinkType(d.linkType)
              if (d.senderName !== undefined) setSenderName(d.senderName)
              if (d.recipientName !== undefined) setRecipientName(d.recipientName)
              if (d.recipientAge !== undefined) setRecipientAge(d.recipientAge)
              if (d.candleCount !== undefined) setCandleCount(d.candleCount)
              if (d.quotes) setQuotes(d.quotes)
              if (d.secretLetter !== undefined) setSecretLetter(d.secretLetter)
              if (d.customVerse !== undefined) setCustomVerse(d.customVerse)
              if (d.howWeMet !== undefined) setHowWeMet(d.howWeMet)
              if (d.specialDate !== undefined) setSpecialDate(d.specialDate)
              if (d.whatsappNumber !== undefined) setWhatsappNumber(d.whatsappNumber)
              if (d.photoUrl !== undefined) setPhotoUrl(d.photoUrl)
              if (d.eventTitle !== undefined) setEventTitle(d.eventTitle)
              if (d.eventDate !== undefined) setEventDate(d.eventDate)
              if (d.eventTime !== undefined) setEventTime(d.eventTime)
              if (d.venueName !== undefined) setVenueName(d.venueName)
              if (d.venueAddress !== undefined) setVenueAddress(d.venueAddress)
              if (d.googleMapsUrl !== undefined) setGoogleMapsUrl(d.googleMapsUrl)
              if (d.coupleNames !== undefined) setCoupleNames(d.coupleNames)
              if (d.step) setStep(d.step as 1 | 2)
              if (d.activeTab) setActiveTab(d.activeTab as 'details' | 'design' | 'preview')
            }
          }
        } catch {}
      }
      if (!isCancelled) setIsInitialLoaded(true)
    }

    initData()
    return () => {
      isCancelled = true
    }
  }, [editSlug, draftKey])

  // 2. Auto-save draft on every change (SESSION ONLY for active back/forward flow)
  useEffect(() => {
    if (!isInitialLoaded || typeof window === 'undefined') return
    const draftData = {
      step,
      activeTab,
      selectedOccasion,
      selectedTheme,
      linkType,
      senderName,
      recipientName,
      recipientAge,
      candleCount,
      quotes,
      secretLetter,
      customVerse,
      howWeMet,
      specialDate,
      whatsappNumber,
      photoUrl,
      eventTitle,
      eventDate,
      eventTime,
      venueName,
      venueAddress,
      googleMapsUrl,
      coupleNames,
    }
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draftData))
    } catch {}
  }, [
    isInitialLoaded,
    draftKey,
    step,
    activeTab,
    selectedOccasion,
    selectedTheme,
    linkType,
    senderName,
    recipientName,
    recipientAge,
    candleCount,
    quotes,
    secretLetter,
    customVerse,
    howWeMet,
    specialDate,
    whatsappNumber,
    photoUrl,
    eventTitle,
    eventDate,
    eventTime,
    venueName,
    venueAddress,
    googleMapsUrl,
    coupleNames,
  ])

  // 3. Browser Back / PopState support
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.cardzyStep === 'number') {
        setStep(e.state.cardzyStep as 1 | 2)
        if (e.state.cardzyTab) {
          setActiveTab(e.state.cardzyTab)
        }
      } else {
        setStep(1)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const changeStep = (nextStep: 1 | 2, nextTab?: 'details' | 'design' | 'preview') => {
    setStep(nextStep)
    if (nextTab) setActiveTab(nextTab)
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { cardzyStep: nextStep, cardzyTab: nextTab || activeTab },
        '',
        window.location.href
      )
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  // When occasion changes, synchronize defaults
  const handleSelectOccasion = (occ: MagicOccasion) => {
    setSelectedOccasion(occ)
    const meta = OCCASIONS.find((o) => o.id === occ) || OCCASIONS[0]
    const palettes = getPalettesForOccasion(occ)
    setSelectedTheme(palettes[0].id)
    setLinkType(meta.defaultType)
    setQuotes(meta.defaultQuotes)
    setSecretLetter(meta.defaultLetter)
    setCustomVerse(isUrdu ? meta.urduVerse : meta.defaultVerse)
    setActiveTab('details')
    setErrors({})
    changeStep(2, 'details')
  }

  const handleQuoteChange = (idx: number, text: string) => {
    const next = [...quotes]
    next[idx] = text
    setQuotes(next)
  }

  const handleFieldChange = (field: string, value: string, setter: (v: string) => void) => {
    setter(value)
    if (errors[field] && value.trim()) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const validateForm = () => {
    const errs: Record<string, string> = {}
    if (!senderName.trim()) {
      errs.senderName = t('senderNameRequired', 'Your Name (Sender) is required')
    }
    if (!recipientName.trim()) {
      errs.recipientName = t('recipientNameRequired', 'Recipient / Partner Name is required')
    }
    if (!whatsappNumber.trim()) {
      errs.whatsappNumber = t('whatsappNumberRequired', 'WhatsApp number is required so you can receive instant replies')
    } else {
      const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
      if (cleanPhone.length < 7) {
        errs.whatsappNumber = t('whatsappNumberInvalid', 'Please enter a valid WhatsApp phone number with country code')
      }
    }
    if (linkType === 'invite' && !eventDate) {
      errs.eventDate = t('eventDateRequired', 'Event Date is required')
    }
    setErrors(errs)
    return errs
  }

  const handleNextToTheme = () => {
    const errs = validateForm()
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      const firstKey = errKeys[0]
      const firstError = errs[firstKey] || t('completeAllRequiredFields', 'Please complete all required fields marked in red.')
      showToast(firstError, 'error')
      if (typeof window !== 'undefined') {
        const el = document.getElementById(`field-${firstKey}`) || document.querySelector(`[name="${firstKey}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ;(el as HTMLElement).focus()
        }
      }
      return
    }
    changeStep(2, 'design')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateForm()
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      changeStep(2, 'details')
      const firstKey = errKeys[0]
      const firstError = errs[firstKey] || t('completeAllRequiredFields', 'Please complete all required fields marked in red.')
      showToast(firstError, 'error')
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById(`field-${firstKey}`) || document.querySelector(`[name="${firstKey}"]`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            ;(el as HTMLElement).focus()
          }
        }, 120)
      }
      return
    }

    setLoading(true)
    try {
      const payload = {
        type: linkType,
        occasion: selectedOccasion,
        theme: selectedTheme,
        senderName: senderName.trim(),
        senderId: user?.uid,
        recipientName: recipientName.trim(),
        recipientAge: linkType === 'wish' && selectedOccasion === 'birthday' ? Number(recipientAge) : undefined,
        wishContent:
          linkType === 'wish'
            ? {
                candlesCount: Number(candleCount),
                urduGreeting: customVerse.trim() || undefined,
                secretLetter: secretLetter.trim(),
                howWeMet: howWeMet.trim() || undefined,
                specialDate: specialDate.trim() || undefined,
                whatsappNumber: whatsappNumber.trim() || undefined,
                photoUrl: photoUrl.trim() || undefined,
                balloons: quotes.map((q, i) => ({
                  id: i + 1,
                  icon:
                    selectedOccasion === 'proposal'
                      ? 'Heart'
                      : selectedOccasion === 'eid'
                      ? 'Moon'
                      : selectedOccasion === 'anniversary'
                      ? 'Sparkles'
                      : 'Gift',
                  color: ['#f43f5e', '#ec4899', '#eab308', '#0ea5e9'][i % 4],
                  title: `Reason ${i + 1}`,
                  quote: q,
                })),
              }
            : undefined,
        inviteContent:
          linkType === 'invite'
            ? {
                eventTitle: eventTitle.trim() || `${recipientName}'s Celebration`,
                eventDate,
                eventTime,
                venueName: venueName.trim(),
                venueAddress: venueAddress.trim(),
                googleMapsUrl: googleMapsUrl.trim(),
                coupleNames: coupleNames.trim() || undefined,
                whatsappNumber: whatsappNumber.trim() || undefined,
                allowRsvp: true,
              }
            : undefined,
      }

      if (editSlug) {
        await updateMagicLink(editSlug, payload)
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('magicLinkUpdatedSuccess', 'Magic link updated successfully! ✨'), 'success')
        router.push(`/m/${editSlug}?mode=sender`)
      } else {
        const slug = await createMagicLink(payload)
        try {
          sessionStorage.removeItem(draftKey)
          localStorage.removeItem(draftKey)
        } catch {}
        showToast(t('magicLinkCreatedSuccess', 'Magic link created successfully! ✨'), 'success')
        router.push(`/m/${slug}?mode=sender`)
      }
    } catch (err) {
      console.error('Error creating/updating magic link:', err)
      showToast(t('magicLinkCreateError', 'Could not save magic link. Please check your network connection.'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const shareUrl =
    typeof window !== 'undefined' && createdSlug ? `${window.location.origin}/m/${createdSlug}` : ''

  const handleCopy = () => {
    if (!shareUrl) return
    if (createdSlug) recordCardShare('magic', createdSlug, 'copy')
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleWhatsApp = () => {
    if (!shareUrl || !createdSlug) return
    recordCardShare('magic', createdSlug, 'whatsapp')
    const text = encodeURIComponent(
      `✨ Hey ${recipientName}! I created an interactive surprise celebration for you on Cardzy. Tap to open: ${shareUrl}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleSms = () => {
    if (!shareUrl || !createdSlug) return
    recordCardShare('magic', createdSlug, 'sms')
    const text = encodeURIComponent(
      `✨ Hey ${recipientName}! I created an interactive surprise celebration for you on Cardzy. Tap to open: ${shareUrl}`
    )
    window.open(`sms:?&body=${text}`, '_blank')
  }

  // Filtered Occasions for Step 1
  const filteredOccasions = OCCASIONS.filter((occ) => {
    const matchesCat = activeCategory === 'all' || occ.category === activeCategory
    const matchesSearch =
      !searchQuery.trim() ||
      occ.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      occ.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      occ.urdu.includes(searchQuery)
    return matchesCat && matchesSearch
  })

  return (
    <div className="mx-auto w-full max-w-full pb-20 min-w-0">
      
      {/* Universal Studio Mode Switcher */}
      <div className="mb-8 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs">
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            💌 {t('studioTabWish', 'Wish Cards')}
          </Link>
          <Link
            href="/create-invitation"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            🎉 {t('studioTabInvite', 'Invitations')}
          </Link>
          <div
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs bg-[#7B0D1E]"
          >
            <span>🪄</span>
            <span>{t('studioTabMagic', 'Magic Links')}</span>
          </div>
          <Link
            href="/create-visiting-card"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all text-muted-foreground hover:text-foreground hover:bg-card/80 border border-transparent hover:border-border/60"
          >
            📇 {t('studioTabVCard', 'Visiting Cards')}
          </Link>
        </div>
      </div>

      {/* SUCCESS SCREEN */}
      {createdSlug ? (
        <div
          className="max-w-xl mx-auto rounded-3xl text-center text-white overflow-hidden animate-in zoom-in-95 duration-500 relative bg-slate-950 border border-amber-500/40 shadow-2xl"
        >
          {/* Celebration confetti burst (CSS only) */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {['💫','✨','🌟','⭐','🎊','🎉','💛','🔮','🌸','💖'].map((em, i) => (
              <span
                key={i}
                className="absolute text-lg select-none"
                style={{
                  top: `${(i * 13 + 5) % 90}%`,
                  left: `${(i * 17 + 3) % 95}%`,
                  animation: `ml-confetti-drift ${2.5 + i * 0.4}s ease-in-out infinite ${i * 0.35}s`,
                  opacity: 0.6,
                  fontSize: `${0.8 + (i % 3) * 0.4}rem`,
                }}
              >
                {em}
              </span>
            ))}
          </div>

          {/* Top shimmer bar */}
          <div
            aria-hidden="true"
            className="h-1 w-full bg-gradient-to-r from-transparent via-[#7B0D1E] via-amber-400 to-transparent"
          />

          <div className="relative p-6 sm:p-8 z-10">
            {/* Magic wand icon */}
            <div
              className="size-24 rounded-full flex items-center justify-center mx-auto mb-5 text-5xl bg-amber-500/20 border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-pulse"
            >
              🪄
            </div>

            <span
              className="inline-block text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 bg-amber-500/15 border border-amber-400/40 text-amber-300"
            >
              ✨ Link Generated Successfully!
            </span>

            <h2
              className="text-2xl sm:text-3xl font-serif font-black mt-2 mb-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 bg-clip-text text-transparent"
            >
              {activeOccMeta.label} Ready
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 max-w-md mx-auto leading-relaxed">
              Send this interactive magic link to{' '}
              <span className="font-bold text-amber-300">
                {recipientName}
              </span>
              . They will tap to unwrap the 3D surprise, read your letter, and reply in real time!
            </p>

            {/* Premium URL Box */}
            <div
              className="mb-5 rounded-2xl flex items-center gap-3 overflow-hidden bg-black/60 border border-amber-400/30"
            >
              <div className="flex-1 px-4 py-3 text-left overflow-hidden">
                <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-bold block mb-0.5">Your Magic Link</span>
                <span className="text-xs font-mono text-amber-200 truncate block">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 mx-2 my-2 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-105 shadow-sm"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleWhatsApp}
                className="py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
              >
                <MessageCircle className="size-4" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleSms}
                className="py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer bg-sky-600 hover:bg-sky-500 text-white shadow-md"
              >
                <Smartphone className="size-4" />
                <span>Send SMS</span>
              </button>
            </div>

            <a
              href={`${shareUrl}?mode=sender`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:opacity-95"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
                color: '#0a0a0a',
                boxShadow: '0 6px 24px rgba(245,158,11,0.4)',
              }}
            >
              <span>Open & Preview Magic Link</span>
              <ExternalLink className="size-4" />
            </a>

            <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-white/10">
              <Link
                href="/dashboard"
                className="text-xs font-bold flex items-center gap-1.5 transition-colors hover:opacity-80"
                style={{ color: '#fbbf24' }}
              >
                <LayoutDashboard className="size-3.5" />
                <span>Host Dashboard</span>
              </Link>
              <span className="text-zinc-600">•</span>
              <button
                onClick={() => {
                  setCreatedSlug(null)
                  setRecipientName('')
                  changeStep(1)
                }}
                className="text-xs text-slate-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer transition-colors"
              >
                Create another link
              </button>
            </div>
          </div>

          <CardShareModal
            card={
              showShareModal && createdSlug
                ? {
                    title: `${activeOccMeta.label} Magic Link`,
                    recipientOrCouple: recipientName,
                    type: 'magic',
                    slug: createdSlug,
                    url: `/m/${createdSlug}`,
                    occasion: activeOccMeta.label,
                    message: linkType === 'wish' ? secretLetter : eventTitle,
                    theme: selectedTheme,
                    senderName: senderName,
                    date: linkType === 'invite' ? eventDate : undefined,
                    time: linkType === 'invite' ? eventTime : undefined,
                    venue: linkType === 'invite' ? venueName : undefined,
                    waMessage: `✨ I created an interactive surprise for you on Cardzy! Tap to unwrap:`,
                  }
                : null
            }
            onClose={() => setShowShareModal(false)}
          />

          {/* Bottom shimmer bar */}
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #a855f7, #fbbf24, #f43f5e, transparent)',
              animation: 'ml-shimmer-bar 2.5s linear infinite reverse',
            }}
          />
        </div>
      ) : step === 1 ? (
        /* STEP 1: OCCASION SELECTION GRID + CATEGORIES + LIVE DEMO */
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Step 1 Header */}
          <div className="text-center max-w-2xl mx-auto mb-2">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[#7B0D1E] dark:text-rose-400">
                Step 1 of 2 — Pick Your Occasion
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-foreground">
              {t('chooseCelebrationOccasion', '✨ Choose Your Celebration')}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Each occasion has its own 3D interactive props, 6 exclusive palettes, and animated scene.
            </p>
          </div>

          {/* Category Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs">
              {[
                { id: 'all', label: t('catAll', 'All') },
                { id: 'love', label: t('catLove', 'Love & Romance') },
                { id: 'birthday', label: t('catBirthday', 'Birthday & Party') },
                { id: 'islamic', label: t('catIslamic', 'Islamic & Spiritual') },
                { id: 'milestones', label: t('catMilestones', 'Milestones & Care') },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                    activeCategory === cat.id
                      ? "bg-[#7B0D1E] text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchOccasions', 'Search occasions...')}
                className="w-full min-w-0 pl-9 pr-8 py-2 rounded-xl text-xs bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E]/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Occasions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOccasions.map((occ) => {
              const isSelected = selectedOccasion === occ.id
              const EMOJIS: Record<string, string> = {
                proposal: '💍',
                birthday: '🎂',
                wedding: '👑',
                eid: '🌙',
                anniversary: '🥂',
                graduation: '🎓',
                party: '🎉',
                newborn: '🍼',
                ramadan: '🕌',
                apology: '💖',
                friendship: '👯‍♀️',
                thankyou: '🙏',
                getwell: '🌸',
                newyear: '🎆',
              }
              const emoji = EMOJIS[occ.id] || '✨'

              const GRADIENTS: Record<string, string> = {
                proposal: 'from-[#3b0312] via-[#24010a] to-[#0d0004]',
                birthday: 'from-[#032017] via-[#064e3b] to-[#02130e]',
                wedding: 'from-[#1c1404] via-[#2d1f05] to-[#120d02]',
                eid: 'from-[#022017] via-[#043324] to-[#01140e]',
                anniversary: 'from-[#330410] via-[#52071a] to-[#1a0107]',
                graduation: 'from-[#07132a] via-[#0d214a] to-[#030914]',
                party: 'from-[#0b0817] via-[#1a1236] to-[#04020a]',
                newborn: 'from-[#022017] via-[#083829] to-[#01140e]',
                ramadan: 'from-[#0b172a] via-[#032017] to-[#01140e]',
                apology: 'from-[#3a0418] via-[#2a0818] to-[#14020a]',
                friendship: 'from-[#2a0818] via-[#3a0428] to-[#120110]',
                thankyou: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]',
                getwell: 'from-[#022017] via-[#073627] to-[#01170f]',
                newyear: 'from-[#08081a] via-[#161233] to-[#03030d]',
              }
              const bgGradient = GRADIENTS[occ.id] || 'from-slate-900 via-slate-800 to-black'

              return (
                <div
                  key={occ.id}
                  onClick={() => handleSelectOccasion(occ.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectOccasion(occ.id)}
                  className={cn(
                    "relative rounded-3xl flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 border shadow-md hover:shadow-xl hover:-translate-y-1.5",
                    isSelected
                      ? "bg-card border-[#7B0D1E] ring-2 ring-[#7B0D1E]/30"
                      : "bg-card border-border/90 hover:border-[#7B0D1E]/50"
                  )}
                >
                  {/* Top Ambient Glow Line */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 left-0 right-0 h-1 z-20 transition-opacity duration-300",
                      isSelected
                        ? "bg-gradient-to-r from-amber-400 via-[#7B0D1E] to-amber-400 opacity-100"
                        : "bg-gradient-to-r from-transparent via-[#7B0D1E]/60 to-transparent opacity-0 group-hover:opacity-100"
                    )}
                  />

                  {/* 1. VISUAL MINI STAGE / HERO PREVIEW */}
                  <div
                    className={cn(
                      "relative h-36 w-full overflow-hidden p-3.5 flex flex-col justify-between bg-gradient-to-br transition-all duration-500",
                      bgGradient
                    )}
                  >
                    {/* Background Ambient Stars/Sparkles */}
                    <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
                      <div className="absolute top-3 left-4 text-xs text-amber-200/80 animate-pulse">✨</div>
                      <div className="absolute top-8 right-6 text-sm text-yellow-300/60 animate-ping">🌟</div>
                      <div className="absolute bottom-4 left-8 text-xs text-rose-300/70">💫</div>
                      <div className="absolute bottom-3 right-10 text-xs text-purple-300/80">⭐</div>
                    </div>

                    {/* Stage Header Badges */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/20 shadow-xs">
                        {occ.category === 'love'
                          ? t('catLove', 'Love & Romance')
                          : occ.category === 'birthday'
                          ? t('catBirthday', 'Birthday & Party')
                          : occ.category === 'islamic'
                          ? t('catIslamic', 'Islamic & Spiritual')
                          : t('catMilestones', 'Milestones & Care')}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {isSelected && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 shadow-xs">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Centered 3D Emoji Medallion */}
                    <div className="relative z-10 flex items-center justify-center my-auto">
                      <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {emoji}
                      </div>
                    </div>
                  </div>

                  {/* 2. CARD CONTENT AREA */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Title */}
                      <div className="mb-1">
                        <h3 className={cn('text-base sm:text-lg font-bold text-foreground leading-tight font-serif', isUrdu && 'font-nastaliq')}>
                          {isUrdu && occ.urdu ? occ.urdu : occ.label}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {occ.desc}
                      </p>
                    </div>

                    {/* 3. FOOTER ACTIONS */}
                    <div className="pt-3 flex items-center justify-between gap-2 border-t border-border/70">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewDemoOccasion(occ)
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border transition-all cursor-pointer hover:scale-102"
                      >
                        <Play className="size-3 text-[#7B0D1E] fill-[#7B0D1E]" />
                        <span>{t('btnDemo', 'Demo')}</span>
                      </button>

                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl text-white transition-all cursor-pointer",
                          isSelected
                            ? "bg-[#7B0D1E] ring-2 ring-[#7B0D1E]/40 shadow-sm"
                            : "bg-[#7B0D1E] hover:bg-[#630A18] group-hover:shadow-md group-hover:scale-102"
                        )}
                      >
                        <span>{t('btnChoose', 'Choose')}</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Occasion Live Demo Modal */}
          {previewDemoOccasion && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
              <div
                className="max-w-md w-full rounded-3xl bg-card border border-border text-foreground shadow-2xl relative overflow-hidden text-center animate-in zoom-in-95 duration-200"
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-[#7B0D1E] to-amber-400" />

                <div className="p-6 sm:p-7 space-y-4">
                  <button
                    onClick={() => setPreviewDemoOccasion(null)}
                    className="absolute top-4 right-4 size-8 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>

                  <div className="size-20 rounded-2xl flex items-center justify-center mx-auto text-4xl bg-muted/70 border border-border shadow-md">
                    {previewDemoOccasion.id === 'proposal'
                      ? '💍'
                      : previewDemoOccasion.id === 'birthday'
                      ? '🎂'
                      : previewDemoOccasion.id === 'wedding'
                      ? '👑'
                      : previewDemoOccasion.id === 'eid'
                      ? '🌙'
                      : previewDemoOccasion.id === 'anniversary'
                      ? '🥂'
                      : previewDemoOccasion.id === 'graduation'
                      ? '🎓'
                      : previewDemoOccasion.id === 'party'
                      ? '🎉'
                      : previewDemoOccasion.id === 'newborn'
                      ? '🍼'
                      : previewDemoOccasion.id === 'ramadan'
                      ? '🕌'
                      : previewDemoOccasion.id === 'apology'
                      ? '💖'
                      : previewDemoOccasion.id === 'friendship'
                      ? '👯‍♀️'
                      : previewDemoOccasion.id === 'thankyou'
                      ? '🙏'
                      : previewDemoOccasion.id === 'getwell'
                      ? '🌸'
                      : previewDemoOccasion.id === 'newyear'
                      ? '🎆'
                      : '✨'}
                  </div>

                  <h3 className="text-xl font-serif font-black text-foreground">
                    {isUrdu && previewDemoOccasion.urdu ? previewDemoOccasion.urdu : previewDemoOccasion.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {previewDemoOccasion.desc}
                  </p>

                  <div className="p-4 rounded-2xl text-xs italic text-left leading-relaxed bg-muted/50 border border-border text-foreground">
                    &ldquo;{previewDemoOccasion.defaultLetter}&rdquo;
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setPreviewDemoOccasion(null)}
                      className="flex-1 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer bg-muted hover:bg-muted/80 text-foreground border border-border"
                    >
                      {t('btnClose', 'Close')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const occ = previewDemoOccasion.id
                        setPreviewDemoOccasion(null)
                        handleSelectOccasion(occ)
                      }}
                      className="flex-1 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all bg-[#7B0D1E] hover:bg-[#630A18] text-white shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>{t('btnChoose', 'Choose')} 🪄</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* STEP 2: PERSONALIZE & LIVE PREVIEW */
        <div className={cn("space-y-5 animate-in fade-in duration-300 text-left", isUrdu && "text-right font-urdu")}>
          
            {/* Step 2 Top Bar */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/60">
              <button
                type="button"
                onClick={() => {
                  setErrors({})
                  changeStep(1)
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer px-3.5 py-2 rounded-xl transition-all bg-card border border-border text-foreground hover:bg-muted shadow-xs"
              >
                <ArrowLeft className={cn("size-3.5", isUrdu && "rotate-180")} />
                <span>{t('btnBack') || 'Back'}</span>
              </button>

              {/* Occasion badge */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[#7B0D1E] dark:text-rose-400">
                  Step 2 of 2
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">
                  <span>
                    {activeOccMeta.id === 'proposal'
                      ? '💍'
                      : activeOccMeta.id === 'birthday'
                      ? '🎂'
                      : activeOccMeta.id === 'wedding'
                      ? '👑'
                      : activeOccMeta.id === 'eid'
                      ? '🌙'
                      : activeOccMeta.id === 'anniversary'
                      ? '🥂'
                      : activeOccMeta.id === 'graduation'
                      ? '🎓'
                      : activeOccMeta.id === 'party'
                      ? '🎉'
                      : activeOccMeta.id === 'newborn'
                      ? '🍼'
                      : activeOccMeta.id === 'ramadan'
                      ? '🕌'
                      : activeOccMeta.id === 'apology'
                      ? '💖'
                      : activeOccMeta.id === 'friendship'
                      ? '👯‍♀️'
                      : activeOccMeta.id === 'thankyou'
                      ? '🙏'
                      : activeOccMeta.id === 'getwell'
                      ? '🌸'
                      : activeOccMeta.id === 'newyear'
                      ? '🎆'
                      : '✨'}
                  </span>
                  <span>{activeOccMeta.label}</span>
                </span>
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/80 shadow-xs">
              <button
                type="button"
                onClick={() => changeStep(2, 'details')}
                className={cn(
                  "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                  activeTab === 'details'
                    ? "bg-[#7B0D1E] text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                )}
              >
                <Edit3 className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">
                  {linkType === 'invite'
                    ? t('magicTabDetails', '1. Event Details')
                    : t('magicTabDetailsWish', '1. Message & Details')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => changeStep(2, 'design')}
                className={cn(
                  "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                  activeTab === 'design'
                    ? "bg-[#7B0D1E] text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                )}
              >
                <Palette className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{t('magicTabTheme', '2. Theme & Style')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 min-w-0 lg:grid-cols-12 ">
              
              {/* LEFT COLUMN: FORM & THEME PICKER */}
              <div className={'lg:col-span-7 space-y-4 min-w-0'}>
                <div
                  className={cn("rounded-3xl p-5 sm:p-7 text-left bg-card border border-border shadow-xs", isUrdu && "text-right font-urdu")}
                >
                  {/* Form Body */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    
                    {/* DETAILS TAB CONTENT (Section 1) */}
                    <div className={cn('space-y-4 text-left', isUrdu && 'text-right font-urdu', activeTab !== 'details' && 'hidden')}>
                      
                      {/* Sender & Recipient Names */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                            {t('magicSenderLabel', 'Your Name (Sender)')} *
                          </label>
                          <input
                            id="field-senderName"
                            type="text"
                            placeholder={isUrdu ? "مثال: طارق محمود" : "e.g. Farooq / Zaid"}
                            value={senderName}
                            onChange={(e) => handleFieldChange('senderName', e.target.value, setSenderName)}
                            className={cn(
                              'w-full px-4 py-3 bg-background border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-xs',
                              isUrdu ? 'text-right' : 'text-left',
                              errors.senderName ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-[#7B0D1E]'
                            )}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                          {errors.senderName && (
                            <p className={cn("mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200", isUrdu && "flex-row-reverse text-right font-urdu")}>
                              <AlertCircle className="size-3.5 shrink-0" />
                              <span>{errors.senderName}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                            {selectedOccasion === 'proposal' ? 'Partner / Beloved Name *' : t('magicRecipientLabel', 'Recipient Name *')}
                          </label>
                          <input
                            id="field-recipientName"
                            type="text"
                            placeholder={isUrdu ? "مثال: عائشہ" : "e.g. Sara / Ayesha"}
                            value={recipientName}
                            onChange={(e) => handleFieldChange('recipientName', e.target.value, setRecipientName)}
                            className={cn(
                              'w-full px-4 py-3 bg-background border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-xs',
                              isUrdu ? 'text-right' : 'text-left',
                              errors.recipientName ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-[#7B0D1E]'
                            )}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                          {errors.recipientName && (
                            <p className={cn("mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200", isUrdu && "flex-row-reverse text-right font-urdu")}>
                              <AlertCircle className="size-3.5 shrink-0" />
                              <span>{errors.recipientName}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp Number for Instant Alert & Direct Reply */}
                      <div>
                        <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                          {t('magicWhatsAppLabel', 'Your WhatsApp Number for Instant Replies')} *
                        </label>
                        <div className="relative overflow-hidden">
                          <Phone className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                          <input
                            id="field-whatsappNumber"
                            type="tel"
                            placeholder={isUrdu ? "مثال: 923001234567+" : "e.g. +92 300 1234567 or +1 (555) 000-0000"}
                            value={whatsappNumber}
                            onChange={(e) => handleFieldChange('whatsappNumber', e.target.value, setWhatsappNumber)}
                            className={cn(
                              'w-full min-w-0 pl-10 pr-4 py-3 bg-background border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-xs',
                              errors.whatsappNumber
                                ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500'
                                : 'border-input focus:ring-2 focus:ring-[#7B0D1E]'
                            )}
                            dir="ltr"
                          />
                        </div>
                        {errors.whatsappNumber ? (
                          <p className={cn("mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200", isUrdu && "flex-row-reverse text-right font-urdu")}>
                            <AlertCircle className="size-3.5 shrink-0" />
                            <span>{errors.whatsappNumber}</span>
                          </p>
                        ) : (
                          <p className="text-[11px] text-muted-foreground mt-1">
                            {t('magicWhatsAppHelp', 'When your recipient reacts, responds, or confirms RSVP, they will be prompted to send their reply directly to this WhatsApp number.')}
                          </p>
                        )}
                      </div>

                      {/* PROPOSAL SPECIFIC: How We Met & Special Date */}
                      {selectedOccasion === 'proposal' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                          <div>
                            <label className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider block mb-1.5">
                              Our Special Date (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. October 14, 2021"
                              value={specialDate}
                              onChange={(e) => setSpecialDate(e.target.value)}
                              className="w-full min-w-0 px-4 py-2.5 bg-background border border-input rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider block mb-1.5">
                              How We Met (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. On a rainy afternoon at the library cafe..."
                              value={howWeMet}
                              onChange={(e) => setHowWeMet(e.target.value)}
                              className="w-full min-w-0 px-4 py-2.5 bg-background border border-input rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* Secret Letter / Proposal Confession */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider", isUrdu ? "text-right font-urdu" : "text-left")}>
                            {selectedOccasion === 'proposal'
                              ? '💍 Proposal Letter / Heartfelt Confession'
                              : '💌 Heartfelt Secret Letter / Dua'}
                          </label>
                          <button
                            type="button"
                            onClick={() => setSecretLetter(activeOccMeta.defaultLetter)}
                            className="text-[11px] font-semibold text-[#7B0D1E] hover:underline cursor-pointer"
                          >
                            Reset Template
                          </button>
                        </div>
                        <textarea 
                          rows={3}
                          value={secretLetter}
                          onChange={(e) => setSecretLetter(e.target.value)}
                          placeholder="Write your heartfelt thoughts..."
                          className={cn(
                            "w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] leading-relaxed shadow-xs",
                            isUrdu ? "text-right font-urdu" : "text-left"
                          )}
                          dir={isUrdu ? 'rtl' : 'ltr'}
                        />
                      </div>

                      {/* Dedication Verse / Tagline */}
                      <div>
                        <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                          {t('specialDedication', 'Special Dedication / Tagline')}
                        </label>
                        <input
                          type="text"
                          value={customVerse}
                          onChange={(e) => setCustomVerse(e.target.value)}
                          placeholder={t('dedicationPlaceholder', 'e.g. You are my dream come true ✨')}
                          className={cn(
                            'w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs',
                            isUrdu ? 'font-nastaliq text-right' : 'text-left'
                          )}
                          dir={isUrdu ? 'rtl' : 'ltr'}
                        />
                      </div>

                      {/* 4 Interactive Notes / Balloons / Confessions */}
                      {linkType === 'wish' && (
                        <div className="space-y-2 pt-2 border-t border-border/60">
                          <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block", isUrdu ? "text-right font-urdu" : "text-left")}>
                            {selectedOccasion === 'proposal'
                              ? '💖 4 Reasons Why I Love You (Tap to Reveal)'
                              : '🎈 4 Interactive Click-to-Reveal Notes'}
                          </label>
                          <p className={cn("text-[11px] text-muted-foreground", isUrdu ? "text-right font-urdu" : "text-left")}>
                            The recipient taps each floating card in their capsule to read these memories:
                          </p>
                          <div className="space-y-2">
                            {quotes.map((q, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#7B0D1E] w-5">{idx + 1}.</span>
                                <input
                                  type="text"
                                  value={q}
                                  onChange={(e) => handleQuoteChange(idx, e.target.value)}
                                  className={cn(
                                    "flex-1 px-4 py-2.5 bg-background border border-input rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs",
                                    isUrdu ? "text-right font-urdu" : "text-left"
                                  )}
                                  dir={isUrdu ? 'rtl' : 'ltr'}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Birthday Specific: Age & Candles */}
                      {linkType === 'wish' && selectedOccasion === 'birthday' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Age (For milestone stats)
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={120}
                              value={recipientAge}
                              onChange={(e) => setRecipientAge(Number(e.target.value))}
                              className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            />
                          </div>
                          <div>
                            <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Cake Candles Count
                            </label>
                            <select
                              value={candleCount}
                              onChange={(e) => setCandleCount(Number(e.target.value))}
                              className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            >
                              <option value={1}>1 Candle (Minimal)</option>
                              <option value={3}>3 Candles (Traditional)</option>
                              <option value={5}>5 Candles (Grand Feast)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* INVITE SPECIFIC FIELDS */}
                      {linkType === 'invite' && (
                        <div className="space-y-4 pt-3 border-t border-border/60">
                          <div>
                            <label className={cn("text-xs font-bold text-foreground block mb-1.5 uppercase tracking-wider", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Event Title *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Walima Reception / Wedding Gala"
                              value={eventTitle}
                              onChange={(e) => setEventTitle(e.target.value)}
                              className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                                Event Date *
                              </label>
                              <input
                                id="field-eventDate"
                                type="date"
                                value={eventDate}
                                onChange={(e) => handleFieldChange('eventDate', e.target.value, setEventDate)}
                                className={cn(
                                  "w-full px-4 py-3 bg-background border rounded-2xl text-sm text-foreground focus:outline-none transition-all shadow-xs",
                                  isUrdu ? "text-right" : "text-left",
                                  errors.eventDate ? "border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500" : "border-input focus:ring-2 focus:ring-[#7B0D1E]"
                                )}
                                dir={isUrdu ? 'rtl' : 'ltr'}
                              />
                              {errors.eventDate && (
                                <p className={cn("mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200", isUrdu && "flex-row-reverse text-right font-urdu")}>
                                  <AlertCircle className="size-3.5 shrink-0" />
                                  <span>{errors.eventDate}</span>
                                </p>
                              )}
                            </div>
                            <div>
                              <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                                Event Time
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 7:30 PM"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right" : "text-left")}
                                dir={isUrdu ? 'rtl' : 'ltr'}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Venue Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. The Grand Marquee / Pearl Continental"
                              value={venueName}
                              onChange={(e) => setVenueName(e.target.value)}
                              className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            />
                          </div>

                          {/* Single Clean Full Address String Input */}
                          <div>
                            <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Venue Full Address (Street, City, District / Hall)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Grand Ballroom, 4th Floor, Blue Area, Islamabad"
                              value={venueAddress}
                              onChange={(e) => setVenueAddress(e.target.value)}
                              className={cn("w-full px-4 py-3 bg-background border border-input rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E] shadow-xs", isUrdu ? "text-right font-urdu" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            />
                          </div>
                        </div>
                      )}

                      {/* Error Summary Banner (Section 1) */}
                      {Object.keys(errors).length > 0 && (
                        <div className={cn(
                          "rounded-2xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900/60 p-3.5 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200",
                          isUrdu && "flex-row-reverse text-right font-urdu"
                        )}>
                          <AlertCircle className="size-4.5 shrink-0 text-red-600 dark:text-red-400" />
                          <span>{t('completeAllRequiredFields', 'Please complete all required fields marked in red.')}</span>
                        </div>
                      )}

                      {/* Section 1 Navigation Buttons */}
                      <div className="pt-4 border-t border-border/60 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setErrors({})
                            changeStep(1)
                          }}
                          className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm transition-all cursor-pointer bg-card border border-border text-foreground hover:bg-muted shadow-xs flex items-center justify-center gap-2"
                        >
                          <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                          <span>{t('btnBack') || 'Back'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextToTheme}
                          className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm text-white transition-all cursor-pointer bg-[#7B0D1E] hover:bg-[#630A18] shadow-lg shadow-[#7B0D1E]/20 active:scale-98 flex items-center justify-center gap-2"
                        >
                          <span>{t('btnNext') || 'Next'}</span>
                          <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                        </button>
                      </div>
                    </div>

                    {/* THEME PICKER TAB CONTENT (Section 2) */}
                    <div className={cn('space-y-4 text-left', isUrdu && 'text-right font-urdu', activeTab !== 'design' && 'hidden')}>
                      <div>
                        <label className={cn("text-xs font-bold text-foreground uppercase tracking-wider block mb-2", isUrdu ? "text-right font-urdu" : "text-left")}>
                          {activeOccMeta.label} Bespoke Palettes (Choose One)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {availablePalettes.map((th) => {
                            const isSelected = selectedTheme === th.id
                            return (
                              <button
                                key={th.id}
                                type="button"
                                onClick={() => setSelectedTheme(th.id)}
                                className={cn(
                                  'group p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 shadow-xs overflow-hidden text-left relative',
                                  isUrdu ? 'text-right' : 'text-left',
                                  isSelected
                                    ? 'bg-[#7B0D1E]/10 border-[#7B0D1E] ring-2 ring-[#7B0D1E]/25 shadow-md scale-[1.02]'
                                    : 'bg-card border-border hover:border-[#7B0D1E]/40 hover:shadow-xs'
                                )}
                              >
                                {/* Palette Color Gradient Strip */}
                                <div
                                  className={cn(
                                    'h-10 w-full rounded-xl bg-gradient-to-r relative overflow-hidden flex items-center justify-between px-3 border border-white/15',
                                    th.gradient
                                  )}
                                >
                                  <div
                                    className="size-4 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: th.accent }}
                                  />
                                  {isSelected && (
                                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/40">
                                      ✓ Active
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-foreground line-clamp-1">
                                    {th.name}
                                  </span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Error Summary Banner for Section 2 */}
                      {Object.keys(errors).length > 0 && (
                        <div className={cn(
                          "rounded-2xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900/60 p-3.5 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center justify-between gap-2 min-w-0.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200",
                          isUrdu && "flex-row-reverse text-right font-urdu"
                        )}>
                          <div className={cn("flex items-center gap-2.5", isUrdu && "flex-row-reverse")}>
                            <AlertCircle className="size-4.5 shrink-0 text-red-600 dark:text-red-400" />
                            <span>{t('completeAllRequiredFields', 'Please complete all required fields marked in red.')}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              changeStep(2, 'details')
                              const firstKey = Object.keys(errors)[0]
                              if (typeof window !== 'undefined' && firstKey) {
                                setTimeout(() => {
                                  const el = document.getElementById(`field-${firstKey}`) || document.querySelector(`[name="${firstKey}"]`)
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    ;(el as HTMLElement).focus()
                                  }
                                }, 100)
                              }
                            }}
                            className="text-xs font-bold underline underline-offset-2 text-red-700 dark:text-red-300 hover:text-red-800 cursor-pointer shrink-0"
                          >
                            {t('btnBack') || 'Go to Details'}
                          </button>
                        </div>
                      )}

                      {/* Section 2 Navigation Buttons */}
                      <div className="pt-4 border-t border-border/60 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => changeStep(2, 'details')}
                          className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm cursor-pointer transition-all bg-card border border-border text-foreground hover:bg-muted shadow-xs flex items-center justify-center gap-2"
                        >
                          <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                          <span>{t('btnBack') || 'Back'}</span>
                        </button>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm text-white transition-all cursor-pointer disabled:opacity-50 bg-[#7B0D1E] hover:bg-[#630A18] shadow-xl shadow-[#7B0D1E]/20 active:scale-98 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              <span>{t('saving') || 'Finishing...'}</span>
                            </span>
                          ) : (
                            <>
                              <Sparkles className="size-4 text-amber-300 fill-amber-300/40" />
                              <span>{editSlug ? (t('btnUpdate') || 'Update') : (t('btnFinish', 'Finish ✨'))}</span>
                              <ArrowRight className={cn("size-4", isUrdu && "rotate-180")} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN: STICKY LIVE INTERACTIVE CAPSULE PREVIEW */}
              <div className="lg:col-span-5 space-y-4">
                <div className="sticky top-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-muted-foreground">
                      <Eye className="size-3.5 text-[#7B0D1E]" />
                      <span>{t('livePreviewCapsule', 'Live Preview')}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync
                    </span>
                  </div>

                  {/* Premium Preview Frame */}
                  <div
                    className="rounded-3xl p-4 sm:p-5 text-white relative overflow-hidden bg-slate-950 border border-border shadow-xl"
                  >
                    {/* Ambient glow orbs */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-12 -left-12 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none bg-rose-600"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none bg-amber-600"
                    />

                    {/* Gold corner ornaments */}
                    <div className="absolute top-2 left-2 size-4 border-t-2 border-l-2 rounded-tl-lg pointer-events-none border-amber-400/60" />
                    <div className="absolute top-2 right-2 size-4 border-t-2 border-r-2 rounded-tr-lg pointer-events-none border-amber-400/60" />
                    <div className="absolute bottom-2 left-2 size-4 border-b-2 border-l-2 rounded-bl-lg pointer-events-none border-amber-400/60" />
                    <div className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 rounded-br-lg pointer-events-none border-amber-400/60" />

                    {/* Capsule Top Pill */}
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles className="size-3 text-amber-300" />
                        <span>{activeOccMeta.label}</span>
                      </div>

                      <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-white mt-1.5">
                        {linkType === 'invite' ? (eventTitle || '---') : `For ${recipientName.trim() || '---'}`}
                      </h4>
                      <span className="text-[10px] text-rose-200/80 font-medium block">
                        {linkType === 'invite' ? `Hosted by ${senderName.trim() || '---'}` : `From ${senderName.trim() || '---'}`}
                      </span>

                      {(specialDate || howWeMet) && (
                        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5">
                          {specialDate && (
                            <span className="text-[9px] text-amber-200/90 bg-amber-950/40 border border-amber-400/30 px-2 py-0.2 rounded-full">
                              📅 {specialDate}
                            </span>
                          )}
                          {howWeMet && (
                            <span className="text-[9px] text-rose-200/90 bg-rose-950/40 border border-rose-400/30 px-2 py-0.2 rounded-full truncate max-w-[180px]">
                              🧭 {howWeMet}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Full Invitation Details Block if in Invite Mode */}
                    {linkType === 'invite' && (
                      <div className="rounded-2xl bg-black/60 border border-white/15 p-3.5 my-3 shadow-inner space-y-2 text-left">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 border border-white/10 rounded-xl p-2">
                            <span className="text-[10px] text-amber-300 font-bold block uppercase tracking-wider">📅 Date</span>
                            <span className="text-white font-semibold truncate block">{eventDate || '---'}</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-2">
                            <span className="text-[10px] text-amber-300 font-bold block uppercase tracking-wider">⏰ Time</span>
                            <span className="text-white font-semibold truncate block">{eventTime || '---'}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-xs space-y-0.5">
                          <p className="font-bold text-amber-200">🏛️ {venueName || '---'}</p>
                          <p className="text-[11px] text-slate-300">📍 {venueAddress || '---'}</p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs italic text-slate-200 leading-relaxed">
                          &ldquo;{secretLetter || '---'}&rdquo;
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-1">
                          <span className="text-[10px] font-bold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">
                            💌 1-Click WhatsApp RSVP
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Simulated Wish Capsule Center Experience */}
                    {linkType === 'wish' && (
                      <div className="rounded-2xl bg-black/60 border border-white/15 p-4 text-center my-3 shadow-inner">
                        {selectedOccasion === 'proposal' ? (
                          <div className="flex flex-col items-center py-2 space-y-2">
                            <div className="size-16 rounded-2xl bg-gradient-to-tr from-[#3a0418] to-[#5c0b29] border border-rose-400/50 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-bounce">
                              💍
                            </div>
                            <span className="text-xs font-serif font-black text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              {recipientName.trim() || 'Beloved'}, Will You Marry Me?
                            </span>
                            <p className="text-[10px] text-rose-100 italic line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            
                            <span className="text-[9px] text-rose-200/80 bg-rose-950/60 border border-rose-400/30 px-2 py-0.5 rounded-full">
                              💌 {quotes.length} Love Memories & Reasons
                            </span>

                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[9px] font-bold bg-rose-500 text-white px-2.5 py-0.5 rounded-full shadow-sm animate-heartbeat">
                                YES! 💍
                              </span>
                              <span className="text-[9px] font-bold bg-white/15 text-slate-300 px-2 py-0.5 rounded-full">
                                No 🏃‍♂️
                              </span>
                            </div>
                          </div>
                        ) : selectedOccasion === 'birthday' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-bounce">🎂</div>
                            <span className="text-xs font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Happy Birthday {recipientName || 'Friend'}!
                            </span>
                            <p className="text-[10px] text-slate-300 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                              Blow {candleCount} Candles & Pop Balloons
                            </span>
                          </div>
                        ) : selectedOccasion === 'eid' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-pulse">🌙</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Eid Mubarak {recipientName || 'Friend'}!
                            </span>
                            <p className="text-[10px] text-emerald-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[9px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                                Light Lanterns 🏮
                              </span>
                              <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                                Open Eidi 🎁
                              </span>
                            </div>
                          </div>
                        ) : selectedOccasion === 'anniversary' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-bounce">🍾</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Happy Anniversary {recipientName || 'My Love'}!
                            </span>
                            <p className="text-[10px] text-rose-100 italic line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[9px] bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded-full">
                                Pop Champagne 🥂
                              </span>
                              <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                                Wax Seal Letter 💌
                              </span>
                            </div>
                          </div>
                        ) : selectedOccasion === 'graduation' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-bounce">🎓</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Congratulations {recipientName || 'Graduate'}!
                            </span>
                            <p className="text-[10px] text-sky-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[9px] bg-sky-500/30 text-sky-200 border border-sky-400/40 px-2 py-0.5 rounded-full">
                                Cap Toss 🚀
                              </span>
                              <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                                Unroll Diploma 📜
                              </span>
                            </div>
                          </div>
                        ) : selectedOccasion === 'party' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-spin">🪩</div>
                            <span className="text-xs font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Party Bash for {recipientName || 'VIP Guest'}!
                            </span>
                            <p className="text-[10px] text-purple-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <span className="text-[9px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full">
                              Spin Disco & 1-Click RSVP 🎉
                            </span>
                          </div>
                        ) : selectedOccasion === 'newborn' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-bounce">🍼</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Welcome Baby Miracle!
                            </span>
                            <p className="text-[10px] text-emerald-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <span className="text-[9px] bg-pink-500/30 text-pink-200 border border-pink-400/40 px-2 py-0.5 rounded-full">
                              Rock Golden Cradle & Lullaby 🌸
                            </span>
                          </div>
                        ) : selectedOccasion === 'ramadan' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-pulse">🌙</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              Ramadan Kareem {recipientName || 'Family'}!
                            </span>
                            <p className="text-[10px] text-cyan-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <span className="text-[9px] bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 px-2 py-0.5 rounded-full">
                              Hilal Sighting & Sacred Fanous 🏮
                            </span>
                          </div>
                        ) : selectedOccasion === 'apology' ? (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-pulse">💖</div>
                            <span className="text-xs font-serif font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              From the Heart for {recipientName || 'Beloved'}
                            </span>
                            <p className="text-[10px] text-rose-100 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                            <span className="text-[9px] bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded-full">
                              Kintsugi Heart Healing 🕊️
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-2 space-y-1.5">
                            <div className="text-3xl animate-bounce">✨</div>
                            <span className="text-xs font-bold text-amber-300 break-words break-all [overflow-wrap:anywhere]">
                              {activeOccMeta.label}
                            </span>
                            <p className="text-[10px] text-slate-300 line-clamp-3 px-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                              &ldquo;{secretLetter}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dedication Verse Banner */}
                    {customVerse && (
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center my-2">
                        <span className={cn(
                          "text-xs text-amber-300 font-medium block",
                          /[\u0600-\u06FF]/.test(customVerse) ? "font-nastaliq text-sm" : "font-serif italic"
                        )}>
                          {customVerse}
                        </span>
                      </div>
                    )}

                    {/* Micro Footer Notice */}
                    <div className="text-center pt-3 mt-3 border-t border-white/10">
                      <span className="text-[10px] text-slate-400 block">
                        Recipients unwrap in 3D, read memories & reply in real time.
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      ✨ No login required · Free forever · 1-click WhatsApp share
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Keyframe animations */}
        <style>{`
          @keyframes ml-confetti-drift {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.4; }
            33% { transform: translateY(-12px) rotate(15deg) scale(1.1); opacity: 0.8; }
            66% { transform: translateY(6px) rotate(-8deg) scale(0.9); opacity: 0.5; }
          }
          @keyframes ml-wand-pulse {
            0%, 100% { box-shadow: 0 0 30px rgba(245,158,11,0.2), 0 0 60px rgba(244,63,94,0.1); }
            50% { box-shadow: 0 0 50px rgba(245,158,11,0.4), 0 0 100px rgba(244,63,94,0.2); }
          }
          @keyframes ml-shimmer-bar {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes ml-badge-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
            50% { box-shadow: 0 0 16px 4px rgba(245,158,11,0.3); }
          }
        `}</style>

    </div>
  )
}
