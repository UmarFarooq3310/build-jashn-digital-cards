import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { token, userAgent } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Valid token is required' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const subsRef = adminDb.collection('push_subscribers');
    const querySnapshot = await subsRef.where('token', '==', token).get();

    if (querySnapshot.empty) {
      await subsRef.add({
        token,
        createdAt: Date.now(),
        userAgent: userAgent || 'Mobile/Desktop Device',
        lastActive: Date.now(),
      });
    } else {
      const batch = adminDb.batch();
      querySnapshot.forEach((docSnap) => {
        batch.update(docSnap.ref, {
          lastActive: Date.now(),
          userAgent: userAgent || docSnap.data().userAgent || 'Device',
        });
      });
      await batch.commit();
    }

    return NextResponse.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error: any) {
    console.error('Error in /api/push/subscribe:', error);
    return NextResponse.json({ error: error.message || 'Failed to save subscription' }, { status: 500 });
  }
}
