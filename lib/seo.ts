export const SUPPORTED_LANGS = [
  'en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de',
  'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'
] as const

export function getLanguageAlternates(path: string): Record<string, string> {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  const baseUrl = 'https://cardzy.online'
  const fullUrl = `${baseUrl}${cleanPath}`

  const languages: Record<string, string> = {
    'x-default': fullUrl,
  }

  SUPPORTED_LANGS.forEach((lang) => {
    languages[lang] = lang === 'en' ? fullUrl : `${fullUrl}?lang=${lang}`
  })

  return languages
}
