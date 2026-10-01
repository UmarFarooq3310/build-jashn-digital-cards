import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { token, userAgent, deviceId, isAdmin, userId } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Valid token is required' }, { status: 400 });
    }

    const cleanToken = token.trim();
    const adminDb = getAdminDb();
    const subsRef = adminDb.collection('push_subscribers');

    // Find any existing docs for this token or deviceId
    const docsToDelete: FirebaseFirestore.DocumentReference[] = [];
    let existingDoc: FirebaseFirestore.DocumentSnapshot | null = null;

    if (deviceId && typeof deviceId === 'string' && deviceId.trim().length > 0) {
      const devSnapshot = await subsRef.where('deviceId', '==', deviceId.trim()).get();
      devSnapshot.forEach((d) => {
        if (!existingDoc) {
          existingDoc = d;
        } else {
          docsToDelete.push(d.ref);
        }
      });
    }

    const tokenSnapshot = await subsRef.where('token', '==', cleanToken).get();
    tokenSnapshot.forEach((d) => {
      if (!existingDoc) {
        existingDoc = d;
      } else if (existingDoc.id !== d.id) {
        docsToDelete.push(d.ref);
      }
    });

    // Delete redundant duplicates for this device
    for (const docRef of docsToDelete) {
      await docRef.delete().catch(() => {});
    }

    if (existingDoc) {
      const updateData: any = {
        token: cleanToken,
        deviceId: deviceId || (existingDoc as any).data()?.deviceId || 'device_' + cleanToken.slice(-8),
        userAgent: userAgent || (existingDoc as any).data()?.userAgent || 'Device',
        createdAt: (existingDoc as any).data()?.createdAt || Date.now(),
        lastActive: Date.now(),
      };
      if (isAdmin === true) updateData.isAdmin = true;
      if (userId && typeof userId === 'string') updateData.userId = userId;
      await (existingDoc as FirebaseFirestore.DocumentSnapshot).ref.set(updateData, { merge: true });
    } else {
      const newData: any = {
        token: cleanToken,
        deviceId: deviceId || 'device_' + cleanToken.slice(-8),
        userAgent: userAgent || 'Mobile/Desktop Device',
        createdAt: Date.now(),
        lastActive: Date.now(),
      };
      if (isAdmin === true) newData.isAdmin = true;
      if (userId && typeof userId === 'string') newData.userId = userId;
      await subsRef.add(newData);
    }

    return NextResponse.json({ success: true, message: 'Device registered uniquely' });
  } catch (error: any) {
    console.error('Error in /api/push/subscribe:', error);
    return NextResponse.json({ error: error.message || 'Failed to save subscription' }, { status: 500 });
  }
}
