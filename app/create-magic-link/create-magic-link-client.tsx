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
} from 'lucide-react'
import { createMagicLink, recordCardShare } from '@/lib/jashn/magic-service'
import type { MagicLinkType, MagicOccasion, MagicThemeId } from '@/lib/jashn/magic-types'
import { useJashn } from '@/lib/jashn/store'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

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
    setStep(2)
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
    setActiveTab('design')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateForm()
    const errKeys = Object.keys(errs)
    if (errKeys.length > 0) {
      setActiveTab('details')
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
      const slug = await createMagicLink({
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
                allowRsvp: true,
              }
            : undefined,
      })

      showToast(t('magicLinkCreatedSuccess', 'Magic link created successfully! ✨'), 'success')
      router.push(`/m/${slug}?mode=sender`)
    } catch (err) {
      console.error('Error creating magic link:', err)
      showToast(t('magicLinkCreateError', 'Could not create magic link. Please check your network connection.'), 'error')
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Studio Header & Switcher */}
      <div className="mb-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <Link
            href="/create-invitation"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5DFD3] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#5A4530] transition-all hover:border-[#7A1E2B]/40 hover:text-foreground shadow-sm"
          >
            🎉 {t('weddingInvitationTitle', 'Wedding & Event Invitation')}
          </Link>
          <Link
            href="/create-wish"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5DFD3] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#5A4530] transition-all hover:border-[#7A1E2B]/40 hover:text-foreground shadow-sm"
          >
            📧 {t('sendAnimatedWishCard', 'Send an Animated Wish Card')}
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7A1E2B] via-rose-700 to-amber-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md ring-2 ring-amber-400/30">
            🪄 {t('magicLinksNav', 'Interactive Magic Links')}
            <span className="text-[10px] uppercase font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
              NEW
            </span>
          </div>
        </div>
      </div>

      {/* SUCCESS SCREEN */}
      {createdSlug ? (
        <div className="max-w-xl mx-auto p-6 sm:p-8 bg-gradient-to-b from-rose-950/80 via-black/85 to-amber-950/80 border-2 border-amber-400/60 rounded-3xl backdrop-blur-2xl text-center shadow-[0_0_60px_rgba(245,158,11,0.25)] text-white animate-in zoom-in-95 duration-300">
          <div className="size-20 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce shadow-lg">
            🪄
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-black/60 px-3 py-1 rounded-full border border-amber-400/40">
            Link Generated Successfully!
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-white mt-3">
            {activeOccMeta.label} Ready
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
            Send this interactive magic link to <span className="text-amber-300 font-bold">{recipientName}</span>.
            They will tap to unwrap the 3D surprise, read your letter, and reply in real time!
          </p>

          {/* Clean URL Box */}
          <div className="my-5 p-3 rounded-2xl bg-black/70 border border-amber-400/40 flex items-center justify-between gap-2 shadow-inner">
            <span className="text-xs font-mono text-amber-200 truncate flex-1 text-left px-2">
              {shareUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-md"
            >
              {copied ? <Check className="size-3.5 text-emerald-950" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* 1-Click WhatsApp & SMS Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleWhatsApp}
              className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleSms}
              className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Smartphone className="size-4" />
              <span>Send SMS</span>
            </button>
          </div>

          <a
            href={`${shareUrl}?mode=sender`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:opacity-95"
          >
            <span>Open & Preview Magic Link (Sender View)</span>
            <ExternalLink className="size-4" />
          </a>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5"
            >
              <LayoutDashboard className="size-3.5" />
              <span>Go to Host Dashboard</span>
            </Link>
            <span className="text-zinc-600">•</span>
            <button
              onClick={() => {
                setCreatedSlug(null)
                setRecipientName('')
                setStep(1)
              }}
              className="text-xs text-slate-300 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
            >
              Create another Magic Link
            </button>
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
        </div>
      ) : step === 1 ? (
        /* STEP 1: OCCASION SELECTION GRID + CATEGORIES + LIVE DEMO */
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#7A1E2B] font-serif">
              {t('chooseCelebrationOccasion', '1. Choose Celebration Occasion')}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
              Each occasion features its own 3D interactive props, bespoke form fields, 6 custom palettes, and animated scenes.
            </p>
          </div>

          {/* Category Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-muted/60 rounded-2xl border border-border/60">
              {[
                { id: 'all', label: 'All Occasions' },
                { id: 'love', label: '❤️ Love & Romance' },
                { id: 'birthday', label: '🎂 Birthdays & Parties' },
                { id: 'islamic', label: '🌙 Islamic & Blessings' },
                { id: 'milestones', label: '🎓 Life Milestones' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer',
                    activeCategory === cat.id
                      ? 'bg-[#7A1E2B] text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
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
                placeholder="Search occasions..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7A1E2B]/30"
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOccasions.map((occ) => {
              const Icon = occ.icon
              const isSelected = selectedOccasion === occ.id
              const isProposal = occ.id === 'proposal'

              const THEME_ACCENTS: Record<string, { border: string; glow: string; iconBg: string; text: string }> = {
                proposal: { border: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', iconBg: 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white', text: 'text-rose-600 dark:text-rose-400' },
                birthday: { border: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', iconBg: 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950', text: 'text-amber-600 dark:text-amber-400' },
                wedding: { border: 'hover:border-yellow-400', glow: 'hover:shadow-yellow-500/20', iconBg: 'bg-gradient-to-tr from-yellow-600 via-amber-500 to-yellow-300 text-slate-950', text: 'text-yellow-600 dark:text-yellow-400' },
                eid: { border: 'hover:border-emerald-400', glow: 'hover:shadow-emerald-500/20', iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white', text: 'text-emerald-600 dark:text-emerald-400' },
                anniversary: { border: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', iconBg: 'bg-gradient-to-tr from-rose-700 to-red-500 text-white', text: 'text-rose-600 dark:text-rose-400' },
                graduation: { border: 'hover:border-sky-400', glow: 'hover:shadow-sky-500/20', iconBg: 'bg-gradient-to-tr from-sky-600 to-indigo-600 text-white', text: 'text-sky-600 dark:text-sky-400' },
                party: { border: 'hover:border-purple-400', glow: 'hover:shadow-purple-500/20', iconBg: 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white', text: 'text-purple-600 dark:text-purple-400' },
                newborn: { border: 'hover:border-teal-400', glow: 'hover:shadow-teal-500/20', iconBg: 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-white', text: 'text-teal-600 dark:text-teal-400' },
                ramadan: { border: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', iconBg: 'bg-gradient-to-tr from-emerald-700 to-amber-500 text-white', text: 'text-amber-600 dark:text-amber-400' },
                apology: { border: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', iconBg: 'bg-gradient-to-tr from-rose-500 to-red-400 text-white', text: 'text-rose-600 dark:text-rose-400' },
              }
              const accent = THEME_ACCENTS[occ.id] || THEME_ACCENTS.proposal

              return (
                <div
                  key={occ.id}
                  className={cn(
                    'relative rounded-2xl p-4 border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xs hover:-translate-y-0.5',
                    accent.border,
                    accent.glow,
                    isSelected
                      ? 'border-[#7A1E2B] bg-gradient-to-b from-rose-50/70 to-amber-50/70 dark:from-rose-950/20 dark:to-amber-950/20 shadow-md scale-[1.01]'
                      : 'border-border/70 bg-card hover:shadow-md'
                  )}
                >
                  {/* Subtle decorative radial glow */}
                  <div className="absolute -top-10 -right-10 size-28 bg-gradient-to-br from-amber-400/10 via-rose-500/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  <div>
                    {/* Badge & Active Check */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={cn(
                          'text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1',
                          isProposal
                            ? 'bg-rose-500 text-white border-rose-400 shadow-xs'
                            : 'bg-muted text-muted-foreground border-border'
                        )}
                      >
                        {occ.badge}
                      </span>
                      {occ.trending && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300">
                          🔥 Trending
                        </span>
                      )}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={cn(
                          'size-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-sm',
                          accent.iconBg
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={cn(
                          "text-sm sm:text-base font-bold text-foreground group-hover:text-[#7A1E2B] dark:group-hover:text-amber-300 transition-colors truncate",
                          isUrdu && "font-nastaliq text-base"
                        )}>
                          {occ.label}
                        </h3>
                        <span className="text-[10.5px] font-medium text-muted-foreground block truncate">
                          {occ.defaultType === 'wish' ? 'Interactive 3D Wish Capsule' : 'Event RSVP Digital Invitation'}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11.5px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {occ.desc}
                    </p>
                  </div>

                  {/* Actions Row: Select button + Live Demo button */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewDemoOccasion(occ)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted px-2.5 py-1.5 rounded-lg border border-border/60 transition-colors cursor-pointer"
                    >
                      <Play className="size-3 text-amber-500 fill-amber-500" />
                      <span>Live Demo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectOccasion(occ.id)}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-white bg-gradient-to-r from-[#7A1E2B] to-rose-700 hover:opacity-95 px-3 py-1.5 rounded-xl shadow-xs transition-transform group-hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Customize</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Occasion Live Demo Modal */}
          {previewDemoOccasion && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
              <div className="max-w-md w-full rounded-3xl bg-slate-950 border border-amber-400/50 p-6 text-white shadow-2xl relative overflow-hidden text-center space-y-4">
                <button
                  onClick={() => setPreviewDemoOccasion(null)}
                  className="absolute top-4 right-4 size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="size-4" />
                </button>

                <div className="size-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center mx-auto text-3xl">
                  {previewDemoOccasion.id === 'proposal' ? '💍' : previewDemoOccasion.id === 'birthday' ? '🎂' : '✨'}
                </div>

                <h3 className="text-xl font-serif font-black text-amber-300">
                  {previewDemoOccasion.label}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {previewDemoOccasion.desc}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs italic text-rose-200">
                  &ldquo;{previewDemoOccasion.defaultLetter}&rdquo;
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewDemoOccasion(null)}
                    className="flex-1 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const occ = previewDemoOccasion.id
                      setPreviewDemoOccasion(null)
                      handleSelectOccasion(occ)
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black"
                  >
                    Start Customizing 🪄
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* STEP 2: PERSONALIZE & LIVE PREVIEW */
        <div className={cn("space-y-4 animate-in fade-in duration-300 text-left", isUrdu && "text-right font-urdu")}>
          {/* Top Bar: Change Occasion */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-border/60">
            <button
              type="button"
              onClick={() => {
                setErrors({})
                setStep(1)
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7A1E2B] hover:text-[#52131c] transition-all cursor-pointer bg-muted/70 hover:bg-muted px-3.5 py-1.5 rounded-full border border-border/80 shadow-xs"
            >
              <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
              <span>{t('btnBack') || 'Back to Occasions'}</span>
            </button>

            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full border border-border/60">
              <span>{activeOccMeta.id === 'proposal' ? '💍' : activeOccMeta.id === 'birthday' ? '🎂' : '✨'}</span>
              <span>{activeOccMeta.label}</span>
            </span>
          </div>
          
          {/* 2-Section Tabs (Desktop + Mobile) */}
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-muted/70 border border-border/70 shadow-xs">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={cn(
                  'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
                  activeTab === 'details'
                    ? 'bg-background text-[#7A1E2B] shadow-sm border border-border/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                )}
              >
                <Edit3 className="size-3.5 sm:size-4 shrink-0 text-[#7A1E2B]" />
                <span className="truncate">
                  {linkType === 'invite'
                    ? t('magicTabDetails', '1. Event Details')
                    : t('magicTabDetailsWish', '1. Message & Details')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('design')}
                className={cn(
                  'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
                  activeTab === 'design'
                    ? 'bg-background text-[#7A1E2B] shadow-sm border border-border/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                )}
              >
                <Palette className="size-3.5 sm:size-4 shrink-0 text-[#7A1E2B]" />
                <span className="truncate">{t('magicTabTheme', '2. Theme & Style')}</span>
              </button>
            </div>

            {/* Mobile Preview Toggle (Only visible on screens < lg) */}
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* LEFT COLUMN: FORM & THEME PICKER */}
            <div className={'lg:col-span-7 space-y-4'}>
              <div className={cn(
                "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm text-left",
                isUrdu && "text-right font-urdu"
              )}>
                {/* Form Body */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {/* DETAILS TAB CONTENT (Section 1) */}
                  <div className={cn('space-y-4 text-left', isUrdu && 'text-right font-urdu', activeTab !== 'details' && 'hidden')}>
                    
                    {/* Sender & Recipient Names */}
                    <div className="grid grid-cols-2 gap-4">
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
                            'w-full px-4 py-2.5 bg-background border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all',
                            isUrdu ? 'text-right' : 'text-left',
                            errors.senderName ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500' : 'border-border focus:ring-2 focus:ring-[#7A1E2B]/30'
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
                            'w-full px-4 py-2.5 bg-background border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all',
                            isUrdu ? 'text-right' : 'text-left',
                            errors.recipientName ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500' : 'border-border focus:ring-2 focus:ring-[#7A1E2B]/30'
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

                    {/* PROPOSAL SPECIFIC: How We Met & Special Date */}
                    {selectedOccasion === 'proposal' && (
                      <div className="grid grid-cols-2 gap-4 p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                        <div>
                          <label className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider block mb-1.5">
                            Our Special Date (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. October 14, 2021"
                            value={specialDate}
                            onChange={(e) => setSpecialDate(e.target.value)}
                            className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                            className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-rose-400"
                          />
                        </div>

                        <div className="sm:col-span-2 pt-1">
                          <label className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider block mb-1">
                            Your WhatsApp Number for Instant Alert (Optional)
                          </label>
                          <div className="relative">
                            <Phone className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" />
                            <input
                              type="tel"
                              placeholder="e.g. +92 300 1234567"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-rose-400"
                            />
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            When your partner taps &ldquo;YES! 💍&rdquo;, they will be prompted to send an instant celebration message to this number.
                          </p>
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
                          className="text-[11px] font-semibold text-[#7A1E2B] hover:underline cursor-pointer"
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
                          "w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#7A1E2B]/30 leading-relaxed",
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
                          'w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#7A1E2B]/30',
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
                              <span className="text-xs font-bold text-[#7A1E2B] w-5">{idx + 1}.</span>
                              <input
                                type="text"
                                value={q}
                                onChange={(e) => handleQuoteChange(idx, e.target.value)}
                                className={cn(
                                  "flex-1 px-3.5 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#7A1E2B]/30",
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
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                            Age (For milestone stats)
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={120}
                            value={recipientAge}
                            onChange={(e) => setRecipientAge(Number(e.target.value))}
                            className={cn("w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none", isUrdu ? "text-right" : "text-left")}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                        </div>
                        <div>
                          <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                            Cake Candles Count
                          </label>
                          <select
                            value={candleCount}
                            onChange={(e) => setCandleCount(Number(e.target.value))}
                            className={cn("w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none", isUrdu ? "text-right" : "text-left")}
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
                          <label className={cn("text-xs font-bold text-foreground block mb-1 uppercase tracking-wider", isUrdu ? "text-right font-urdu" : "text-left")}>
                            Event Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Walima Reception / Wedding Gala"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className={cn("w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none", isUrdu ? "text-right" : "text-left")}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Event Date *
                            </label>
                            <input
                              id="field-eventDate"
                              type="date"
                              value={eventDate}
                              onChange={(e) => handleFieldChange('eventDate', e.target.value, setEventDate)}
                              className={cn(
                                "w-full px-4 py-2.5 bg-background border rounded-xl text-sm text-foreground focus:outline-none transition-all",
                                isUrdu ? "text-right" : "text-left",
                                errors.eventDate ? "border-red-500 ring-2 ring-red-500/20 focus:ring-2 focus:ring-red-500" : "border-border focus:ring-2 focus:ring-[#7A1E2B]/30"
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
                            <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                              Event Time
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 7:30 PM"
                              value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                              className={cn("w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none", isUrdu ? "text-right" : "text-left")}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                            Venue Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. The Grand Marquee / Pearl Continental"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            className={cn("w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none", isUrdu ? "text-right font-urdu" : "text-left")}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <div>
                          <label className={cn("text-xs font-semibold text-muted-foreground block mb-1", isUrdu ? "text-right font-urdu" : "text-left")}>
                            Venue Address & Google Maps Link
                          </label>
                          <input
                            type="text"
                            placeholder="Address / Landmark"
                            value={venueAddress}
                            onChange={(e) => setVenueAddress(e.target.value)}
                            className={cn("w-full px-4 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none mb-2", isUrdu ? "text-right font-urdu" : "text-left")}
                            dir={isUrdu ? 'rtl' : 'ltr'}
                          />
                          <input
                            type="url"
                            placeholder="https://maps.google.com/?q=..."
                            value={googleMapsUrl}
                            onChange={(e) => setGoogleMapsUrl(e.target.value)}
                            className={cn("w-full px-4 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none", isUrdu ? "text-right" : "text-left")}
                            dir="ltr"
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
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setErrors({})
                          setStep(1)
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back to Occasions'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextToTheme}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7A1E2B] via-rose-700 to-amber-700 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <span>{t('btnNext') || 'Next: Theme & Style'}</span>
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {availablePalettes.map((th) => {
                          const isSelected = selectedTheme === th.id
                          return (
                            <button
                              key={th.id}
                              type="button"
                              onClick={() => setSelectedTheme(th.id)}
                              className={cn(
                                'p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2',
                                isUrdu ? 'text-right' : 'text-left',
                                isSelected
                                  ? 'bg-primary/5 border-[#7A1E2B] shadow-md ring-2 ring-[#7A1E2B]/20 scale-[1.02]'
                                  : 'bg-card border-border hover:border-[#7A1E2B]/40'
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div
                                  className="size-5 rounded-full border border-white/40 shadow-sm"
                                  style={{ backgroundColor: th.accent }}
                                />
                                {isSelected && (
                                  <span className="text-[10px] font-black text-[#7A1E2B]">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-bold text-foreground line-clamp-1">
                                {th.name}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Error Summary Banner for Section 2 */}
                    {Object.keys(errors).length > 0 && (
                      <div className={cn(
                        "rounded-2xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900/60 p-3.5 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center justify-between gap-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200",
                        isUrdu && "flex-row-reverse text-right font-urdu"
                      )}>
                        <div className={cn("flex items-center gap-2.5", isUrdu && "flex-row-reverse")}>
                          <AlertCircle className="size-4.5 shrink-0 text-red-600 dark:text-red-400" />
                          <span>{t('completeAllRequiredFields', 'Please complete all required fields marked in red.')}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('details')
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
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <ArrowLeft className={cn("size-4", isUrdu && "rotate-180")} />
                        <span>{t('btnBack') || 'Back'}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A1E2B] via-rose-700 to-amber-600 hover:from-[#601320] hover:to-amber-500 text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Creating Your Magic Link...</span>
                        ) : (
                          <>
                            <Sparkles className="size-4 text-amber-300" />
                            <span>{t('generateMagicLinkBtn', 'Generate Royal Magic Link ✨')}</span>
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Eye className="size-3.5 text-[#7A1E2B]" />
                    <span>{t('livePreviewCapsule', 'Live Capsule Preview')}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync
                  </span>
                </div>

                {/* Preview Frame */}
                <div className="rounded-3xl border-2 border-[#7A1E2B]/40 bg-slate-950 p-4 sm:p-5 shadow-2xl text-white relative overflow-hidden">
                  
                  {/* Background Radial Glow */}
                  <div className="absolute -top-10 -left-10 size-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 size-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Ornate Gold Filigree Corners */}
                  <div className="absolute top-2 left-2 size-5 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg pointer-events-none" />
                  <div className="absolute top-2 right-2 size-5 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg pointer-events-none" />
                  <div className="absolute bottom-2 left-2 size-5 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg pointer-events-none" />
                  <div className="absolute bottom-2 right-2 size-5 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg pointer-events-none" />

                  {/* Capsule Top Pill */}
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles className="size-3 text-amber-300" />
                      <span>{activeOccMeta.label}</span>
                    </div>

                    <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-white mt-1.5">
                      For {recipientName.trim() || 'My Beloved'}
                    </h4>
                    <span className="text-[10px] text-rose-200/80 font-medium block">
                      From {senderName.trim() || 'Your Name'}
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

                  {/* Simulated Center Experience */}
                  <div className="rounded-2xl bg-black/60 border border-white/15 p-4 text-center my-3 shadow-inner">
                    {selectedOccasion === 'proposal' ? (
                      <div className="flex flex-col items-center py-2 space-y-2">
                        {/* 3D Ring Box Graphic */}
                        <div className="size-16 rounded-2xl bg-gradient-to-tr from-[#3a0418] to-[#5c0b29] border border-rose-400/50 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-bounce">
                          💍
                        </div>
                        <span className="text-xs font-serif font-black text-amber-300">
                          {recipientName.trim() || 'Beloved'}, Will You Marry Me?
                        </span>
                        <p className="text-[10px] text-rose-100 italic line-clamp-2 px-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        
                        {/* 4 Memories Badge */}
                        <span className="text-[9px] text-rose-200/80 bg-rose-950/60 border border-rose-400/30 px-2 py-0.5 rounded-full">
                          💌 {quotes.length} Love Memories & Reasons
                        </span>

                        {/* Interactive YES & Dodging NO simulator */}
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
                        <span className="text-xs font-bold text-amber-300">
                          Happy Birthday {recipientName || 'Friend'}!
                        </span>
                        <p className="text-[10px] text-slate-300 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                          Blow {candleCount} Candles & Pop Balloons
                        </span>
                      </div>
                    ) : selectedOccasion === 'wedding' ? (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-pulse">👑</div>
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Royal Nikkah of {eventTitle || 'Newlyweds'}
                        </span>
                        <p className="text-[10px] text-amber-100 italic line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                            Palace Gates 🏛️
                          </span>
                          <span className="text-[9px] bg-white/10 text-amber-200 px-2 py-0.5 rounded-full">
                            WhatsApp RSVP 💌
                          </span>
                        </div>
                      </div>
                    ) : selectedOccasion === 'eid' ? (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-pulse">🌙</div>
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Eid Mubarak {recipientName || 'Friend'}!
                        </span>
                        <p className="text-[10px] text-emerald-100 line-clamp-2">
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
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Happy Anniversary {recipientName || 'My Love'}!
                        </span>
                        <p className="text-[10px] text-rose-100 italic line-clamp-2">
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
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Congratulations {recipientName || 'Graduate'}!
                        </span>
                        <p className="text-[10px] text-sky-100 line-clamp-2">
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
                        <span className="text-xs font-bold text-amber-300">
                          Party Bash for {recipientName || 'VIP Guest'}!
                        </span>
                        <p className="text-[10px] text-purple-100 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <span className="text-[9px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full">
                          Spin Disco & 1-Click RSVP 🎉
                        </span>
                      </div>
                    ) : selectedOccasion === 'newborn' ? (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-bounce">🍼</div>
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Welcome Baby Miracle!
                        </span>
                        <p className="text-[10px] text-emerald-100 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <span className="text-[9px] bg-pink-500/30 text-pink-200 border border-pink-400/40 px-2 py-0.5 rounded-full">
                          Rock Golden Cradle & Lullaby 🌸
                        </span>
                      </div>
                    ) : selectedOccasion === 'ramadan' ? (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-pulse">🌙</div>
                        <span className="text-xs font-serif font-bold text-amber-300">
                          Ramadan Kareem {recipientName || 'Family'}!
                        </span>
                        <p className="text-[10px] text-cyan-100 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <span className="text-[9px] bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 px-2 py-0.5 rounded-full">
                          Hilal Sighting & Sacred Fanous 🏮
                        </span>
                      </div>
                    ) : selectedOccasion === 'apology' ? (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-pulse">💖</div>
                        <span className="text-xs font-serif font-bold text-amber-300">
                          From the Heart for {recipientName || 'Beloved'}
                        </span>
                        <p className="text-[10px] text-rose-100 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                        <span className="text-[9px] bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded-full">
                          Kintsugi Heart Healing 🕊️
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-2 space-y-1.5">
                        <div className="text-3xl animate-bounce">✨</div>
                        <span className="text-xs font-bold text-amber-300">
                          {activeOccMeta.label}
                        </span>
                        <p className="text-[10px] text-slate-300 line-clamp-2">
                          &ldquo;{secretLetter}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dedication Verse Banner */}
                  {customVerse && (
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className={cn(
                        "text-xs text-amber-300 font-medium",
                        /[\u0600-\u06FF]/.test(customVerse) ? "font-nastaliq" : "font-serif italic"
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

    </div>
  )
}
