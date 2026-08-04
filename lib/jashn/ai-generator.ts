
export type AITone = 'funny' | 'emotional' | 'poetic' | 'gamer_hype' | 'urdu_shayari' | 'formal'

export interface AIGeneratorParams {
  occasionLabel: string
  recipientName: string
  relation?: string
  tone: AITone
}

export function generateAIWish({ occasionLabel, recipientName, relation, tone }: AIGeneratorParams): string {
  const name = recipientName.trim() || 'my dear friend'
  const relStr = relation ? `my ${relation.toLowerCase()}` : 'you'

  switch (tone) {
    case 'funny':
      return `Happy ${occasionLabel}, ${name}! Another year older, wiser, and still pretending to have it all together. May your day be filled with cake, laughter, and zero adulting duties!`
    
    case 'emotional':
      return `Dearest ${name}, on this ${occasionLabel}, I just want to remind you how deeply loved and appreciated you are. Thank you for bringing so much warmth and light into our lives every single day.`
    
    case 'poetic':
      return `To ${name}: Like stars that illuminate the night sky, your spirit brightens every corner of our world. May your ${occasionLabel} be a masterpiece of joy, serenity, and beautiful moments.`
    
    case 'gamer_hype':
      return `BOOYAH ${name}! 🏆 Leveling up on this ${occasionLabel}! Squad MVP status unlocked with 100% victory royale energy. Keep dominating every arena!`
    
    case 'urdu_shayari':
      return `خوشیوں کی شمع ہر سو جلتی رہے، \nآپ کی زندگی یوں ہی مسکراتی رہے۔ \n${name} کے لیے دلی دعاؤں کے ساتھ، جشنِ مبارک!`
    
    case 'formal':
    default:
      return `Warmest congratulations and best wishes to ${name} on this memorable ${occasionLabel}. Wishing you continued health, happiness, and extraordinary success ahead.`
  }
}
