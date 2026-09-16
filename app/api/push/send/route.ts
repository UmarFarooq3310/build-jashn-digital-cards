import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/firebase-server';
import { getAdminMessaging } from '@/lib/firebase-admin';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { title, body, url, senderName } = await req.json();

    if (!title || !body) {
      return NextResponse.json({ error: 'Missing title or message body' }, { status: 400 });
    }

    // 1. Fetch all subscriber tokens from Firestore
    const subscribersRef = collection(serverDb, 'push_subscribers');
    const snapshot = await getDocs(subscribersRef);
    
    const tokens: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.token && typeof data.token === 'string') {
        tokens.push(data.token);
      }
    });

    if (tokens.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No active subscribers found in push_subscribers collection.',
        sentCount: 0 
      }, { status: 200 });
    }

    let delivered = 0;
    const failedTokens: string[] = [];
    let isFCMDelivered = false;
    let errorMessage: string | null = null;

    // 2. Try FCM HTTP v1 (via Firebase Admin SDK with Service Account) - 100% Free, No Credit Card
    try {
      const messaging = getAdminMessaging();
      const messagePayload = {
        tokens,
        notification: {
          title,
          body,
        },
        webpush: {
          notification: {
            title,
            body,
            icon: '/favicon-32x32.png',
            badge: '/favicon-32x32.png',
          },
          fcmOptions: {
            link: url || '/',
          },
          data: {
            url: url || '/',
          },
        },
        data: {
          url: url || '/',
          title,
          body,
        },
      };

      const response = await messaging.sendEachForMulticast(messagePayload);
      delivered = response.successCount;
      isFCMDelivered = true;

      response.responses.forEach((resp: any, idx: number) => {
        if (!resp.success) {
          const deadToken = tokens[idx];
          failedTokens.push(deadToken);
          // If token has expired / unregistered, delete from Firestore
          if (resp.error?.code === 'messaging/registration-token-not-registered' || resp.error?.code === 'messaging/invalid-registration-token') {
            import('firebase/firestore').then(({ deleteDoc, doc, query, where }) => {
              const q = query(subscribersRef, where('token', '==', deadToken));
              getDocs(q).then((deadSnap) => {
                deadSnap.forEach((d) => deleteDoc(d.ref).catch(() => {}));
              }).catch(() => {});
            }).catch(() => {});
          }
        }
      });
    } catch (adminErr: any) {
      errorMessage = adminErr?.message || String(adminErr);
      console.warn('Firebase Admin FCM v1 dispatch notice:', errorMessage);

      // 3. Fallback to legacy FCM if server key exists in env
      const serverKey = process.env.FIREBASE_FCM_SERVER_KEY;
      if (serverKey) {
        try {
          const fcmPayload = {
            notification: { 
              title, 
              body, 
              icon: '/favicon-32x32.png', 
              click_action: url || '/' 
            },
            data: { 
              url: url || '/',
              title,
              body
            },
            registration_ids: tokens
          };

          const legacyRes = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `key=${serverKey}`
            },
            body: JSON.stringify(fcmPayload)
          });

          const result = await legacyRes.json();
          if (result.results && Array.isArray(result.results)) {
            result.results.forEach((res: any, index: number) => {
              if (res.error) {
                failedTokens.push(tokens[index]);
              } else {
                delivered++;
              }
            });
            isFCMDelivered = true;
          }
        } catch (legacyErr) {
          console.error('Legacy FCM fallback error:', legacyErr);
        }
      }
    }

    // 4. Record notification history in Firestore
    const notifsRef = collection(serverDb, 'push_notifications');
    const notifDoc = await addDoc(notifsRef, {
      title,
      body,
      url: url || '/',
      sentAt: Date.now(),
      sentBy: senderName || 'Admin',
      sentCount: tokens.length,
      deliveredCount: delivered,
      clickedCount: 0,
      status: isFCMDelivered ? (delivered > 0 ? 'sent' : 'failed') : 'pending_service_key',
      failedTokens,
      errorMessage: isFCMDelivered ? null : errorMessage,
    });

    return NextResponse.json({ 
      success: true, 
      notificationId: notifDoc.id, 
      sentCount: tokens.length,
      deliveredCount: delivered, 
      failedCount: failedTokens.length,
      deliveredToFCM: isFCMDelivered,
      warning: !isFCMDelivered 
        ? 'Push recorded in database, but Firebase Service Account Key is needed for live delivery. (100% Free, NO credit card needed! Download from Firebase Console → Project Settings → Service Accounts → Generate new private key).'
        : undefined
    });
  } catch (error: any) {
    console.error('Error sending push notification:', error);
    return NextResponse.json({ error: error.message || 'Failed to send notification' }, { status: 500 });
  }
}
