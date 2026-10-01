import { NextResponse } from 'next/server'
import { notifyAdmins } from '@/lib/push-admin-notify'

export async function POST(req: Request) {
  try {
    const { title, body, url } = await req.json()

    if (!title || !body) {
      return NextResponse.json({ error: 'Missing title or body' }, { status: 400 })
    }

    await notifyAdmins(title, body, url || '/admin_portal')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('/api/push/notify-admin error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
