import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/firebase-server';
import { doc, updateDoc, increment } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { notificationId } = await req.json();

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
