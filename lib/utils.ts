import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates a WhatsApp number string.
 * Accepts formats like: +92 300 1234567, 03001234567, 923001234567, 0300-1234567, +1 (555) 000-0000
 */
export function validateWhatsAppNumber(phone: string): {
  isValid: boolean
  cleaned: string
  error?: string
} {
  if (!phone || !phone.trim()) {
    return { isValid: false, cleaned: '', error: 'WhatsApp number is required' }
  }

  // Remove spaces, dashes, parentheses
  const cleaned = phone.trim().replace(/[\s\-\(\)]/g, '')

  // Standard international or local digits check (8 to 15 digits, optional leading +)
  const phoneRegex = /^\+?\d{8,15}$/

  if (!phoneRegex.test(cleaned)) {
    return {
      isValid: false,
      cleaned,
      error: 'Please enter a valid WhatsApp number (e.g. +92 300 1234567 or 0300 1234567)',
    }
  }

  return { isValid: true, cleaned }
}

/**
 * Format WhatsApp number into clean digits suitable for wa.me URLs
 */
export function formatWhatsAppDigits(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '')
  // If local Pakistani format 03xxxxxxxxxx -> convert to 923xxxxxxxxxx
  if (cleaned.startsWith('03') && cleaned.length === 11) {
    cleaned = '92' + cleaned.slice(1)
  }
  return cleaned
}
