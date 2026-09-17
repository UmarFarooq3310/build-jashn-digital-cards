import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/firebase-server';
import { doc, updateDoc, increment } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    let notificationId = '';
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      notificationId = body.notificationId;
    } else {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        notificationId = parsed.notificationId;
      } catch {
        notificationId = text.trim();
      }
    }

    if (!notificationId) {
      return NextResponse.json({ error: 'Missing notificationId' }, { status: 400 });
    }

    const notifRef = doc(serverDb, 'push_notifications', notificationId);
    await updateDoc(notifRef, {
      clickedCount: increment(1)
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error tracking notification click:', error);
    return NextResponse.json({ error: error.message || 'Failed to track click' }, { status: 500 });
  }
}
