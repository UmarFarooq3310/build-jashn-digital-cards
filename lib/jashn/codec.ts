import type { Wish, Invitation } from './types'
import { getTemplates } from './occasions'

export function encodeShortWish(w: Partial<Wish>): string {
  const params = new URLSearchParams()
  if (w.occasionId) params.set('o', w.occasionId)
  if (w.themeId) params.set('t', w.themeId)
  if (w.borderId) params.set('bor', w.borderId)
  if (w.bgVariantId) params.set('bgV', w.bgVariantId)
  if (w.senderName) params.set('s', w.senderName)
  if (w.recipientName) params.set('r', w.recipientName)
  if (w.relation) params.set('rel', w.relation)
  if (w.language) params.set('l', w.language)

  // Optimization: check if message matches a predefined template
  const templates = w.occasionId ? getTemplates(w.occasionId) : []
  const matchedTemplateIdx = templates.findIndex(
    (t) => t.en === w.message || t.ur === w.message
  )

  if (matchedTemplateIdx !== -1) {
    params.set('ti', String(matchedTemplateIdx))
  } else {
    if (w.message) params.set('m', w.message)
  }
  return params.toString()
}

export function decodeShortWish(params: URLSearchParams, slug: string): Wish | null {
  const o = params.get('o') || params.get('occasion')
  if (!o) return null

  const templates = getTemplates(o)
  const tiParam = params.get('ti')
  const templateIdx = tiParam ? parseInt(tiParam, 10) : -1
  const matchedTemplate = templateIdx !== -1 && templates[templateIdx] ? templates[templateIdx] : null

  return {
    id: slug,
    slug,
    creatorId: 'guest',
    occasionId: o,
    themeId: params.get('t') || 'mehndi-red',
    borderId: params.get('bor') || 'mehndi',
    bgVariantId: params.get('bgV') || undefined,
    senderName: params.get('s') || 'Well Wisher',
    recipientName: params.get('r') || '',
    relation: params.get('rel') || '',
    language: (params.get('l') as any) || 'en',
    message: matchedTemplate ? matchedTemplate.en : (params.get('m') || ''),
    viewCount: 1,
    createdAt: Date.now(),
  }
}

export function encodeShortInvitation(i: Partial<Invitation>): string {
  const params = new URLSearchParams()
  if (i.typeId) params.set('tp', i.typeId)
  if (i.themeId) params.set('t', i.themeId)
  if (i.borderId) params.set('bor', i.borderId)
  if (i.bgVariantId) params.set('bgV', i.bgVariantId)
  if (i.groom) params.set('g', i.groom)
  if (i.bride) params.set('b', i.bride)
  if (i.title) params.set('tt', i.title)
  if (i.hostNames) params.set('h', i.hostNames)
  if (i.date) params.set('dt', i.date)
  if (i.time) params.set('tm', i.time)
  if (i.venue) params.set('v', i.venue)
  if (i.city) params.set('c', i.city)
  if (i.mapsLink) params.set('m', i.mapsLink)
  if (i.dressCode) params.set('dc', i.dressCode)
  if (i.notes) params.set('n', i.notes)
  if (i.rsvpPhone) params.set('ph', i.rsvpPhone)
  return params.toString()
}

export function decodeShortInvitation(params: URLSearchParams, slug: string): Invitation | null {
  const tp = params.get('tp') || params.get('type')
  if (!tp) return null
  return {
    id: slug,
    slug,
    creatorId: 'guest',
    typeId: tp,
    themeId: params.get('t') || 'mehndi-red',
    borderId: params.get('bor') || 'mehndi',
    bgVariantId: params.get('bgV') || undefined,
    groom: params.get('g') || '',
    bride: params.get('b') || '',
    title: params.get('tt') || '',
    hostNames: params.get('h') || '',
    date: params.get('dt') || new Date().toISOString().slice(0, 10),
    time: params.get('tm') || '',
    venue: params.get('v') || '',
    city: params.get('c') || '',
    mapsLink: params.get('m') || '',
    dressCode: params.get('dc') || '',
    notes: params.get('n') || '',
    rsvpPhone: params.get('ph') || '',
    rsvpCount: 0,
    viewCount: 1,
    createdAt: Date.now(),
  }
}
