/**
 * Cardzy Smart vCard (3.0) Contact Exporter
 * Generates and downloads native .vcf contact files for iOS, Android, and Desktop contacts.
 */

export interface VCardContactData {
  fullName?: string
  title?: string
  company?: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  address?: string
  bio?: string
  slug?: string
}

export function generateVCardString(card: VCardContactData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${card.fullName || 'Contact'}`,
  ]

  // Name structure: Last;First;Middle;Prefix;Suffix
  if (card.fullName) {
    const parts = card.fullName.trim().split(/\s+/)
    if (parts.length > 1) {
      const first = parts.slice(0, -1).join(' ')
      const last = parts[parts.length - 1]
      lines.push(`N:${last};${first};;;`)
    } else {
      lines.push(`N:${card.fullName};;;;`)
    }
  }

  if (card.company) {
    lines.push(`ORG:${card.company}`)
  }
  if (card.title) {
    lines.push(`TITLE:${card.title}`)
  }
  if (card.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE,pref:${card.phone}`)
  }
  if (card.whatsapp && card.whatsapp !== card.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${card.whatsapp}`)
  }
  if (card.email) {
    lines.push(`EMAIL;TYPE=INTERNET,WORK,pref:${card.email}`)
  }
  if (card.website) {
    const normUrl = card.website.startsWith('http') ? card.website : `https://${card.website}`
    lines.push(`URL:${normUrl}`)
  }
  if (card.address) {
    // Escaped clean address
    const cleanAddr = card.address.replace(/[,;]/g, ' ')
    lines.push(`ADR;TYPE=WORK:;;${cleanAddr};;;;`)
  }
  if (card.bio) {
    lines.push(`NOTE:${card.bio.replace(/[\r\n]+/g, ' ')}`)
  }

  lines.push('END:VCARD')
  return lines.join('\r\n')
}

export function downloadVCard(card: VCardContactData): boolean {
  if (typeof window === 'undefined') return false

  try {
    const vcfString = generateVCardString(card)
    const blob = new Blob([vcfString], { type: 'text/vcard;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const fileName = `${(card.fullName || 'contact').toLowerCase().replace(/[^a-z0-9]+/g, '_')}_contact.vcf`
    
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1500)
    return true
  } catch (err) {
    console.error('Failed to download vCard:', err)
    return false
  }
}
