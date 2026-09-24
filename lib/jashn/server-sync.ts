/**
 * Helper to guarantee all card and user operations are synced
 * directly to Cloud Firestore via the Server Admin API (bypassing client-side rules/adblockers).
 */

export type SyncAction =
  | 'sync_user'
  | 'sync_wish'
  | 'sync_invitation'
  | 'sync_vcard'
  | 'sync_magic'
  | 'sync_magic_response'
  | 'sync_rsvp'

export async function syncRecordToServer(action: SyncAction, data: Record<string, any>): Promise<boolean> {
  if (typeof window === 'undefined' || !data) return false

  try {
    const res = await fetch('/api/firestore-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data }),
      keepalive: true,
    })

    if (res.ok) {
      const json = await res.json()
      return !!json.success
    }
    return false
  } catch (err) {
    console.warn(`[Firestore Server Sync] background sync notice for ${action}:`, err)
    return false
  }
}
