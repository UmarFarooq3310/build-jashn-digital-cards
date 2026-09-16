import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/firebase-server';
import { getAdminMessaging } from '@/lib/firebase-admin';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from 'firebase/firestore';

function parseDeviceFromUserAgent(ua?: string): { deviceType: 'Mobile' | 'Desktop' | 'Tablet'; name: string } {
  if (!ua) return { deviceType: 'Desktop', name: 'Unknown Device' };
  
  const isIPhone = /iPhone/i.test(ua);
  const isIPad = /iPad/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMac = /Macintosh|Mac OS X/i.test(ua);
  const isWindows = /Windows/i.test(ua);
  const isLinux = /Linux/i.test(ua);

  let browser = 'Browser';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  if (isIPhone) return { deviceType: 'Mobile', name: `iPhone (${browser})` };
  if (isIPad) return { deviceType: 'Tablet', name: `iPad (${browser})` };
  if (isAndroid) return { deviceType: 'Mobile', name: `Android (${browser})` };
  if (isMac) return { deviceType: 'Desktop', name: `Mac (${browser})` };
  if (isWindows) return { deviceType: 'Desktop', name: `Windows (${browser})` };
  if (isLinux) return { deviceType: 'Desktop', name: `Linux (${browser})` };

  return { deviceType: 'Desktop', name: `Desktop (${browser})` };
}

export async function POST(req: Request) {
  try {
    const { title, body, url, senderName } = await req.json();

    if (!title || !body) {
      return NextResponse.json({ error: 'Missing title or message body' }, { status: 400 });
    }

    // 1. Fetch all subscriber docs from Firestore
    const subscribersRef = collection(serverDb, 'push_subscribers');
    const snapshot = await getDocs(subscribersRef);
    
    interface SubItem {
      docId: string;
      token: string;
      userAgent?: string;
      deviceInfo: { deviceType: 'Mobile' | 'Desktop' | 'Tablet'; name: string };
    }

    const subsList: SubItem[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      if (data.token && typeof data.token === 'string') {
        subsList.push({
          docId: d.id,
          token: data.token,
          userAgent: data.userAgent,
          deviceInfo: parseDeviceFromUserAgent(data.userAgent),
        });
      }
    });

    if (subsList.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No active subscribers found in push_subscribers collection.',
        sentCount: 0,
        deliveredCount: 0,
        devices: []
      }, { status: 200 });
    }

    const tokens = subsList.map((s) => s.token);
    let delivered = 0;
    const failedTokens: string[] = [];
    let isFCMDelivered = false;
    let errorMessage: string | null = null;

    interface DeviceReport {
      tokenPreview: string;
      deviceType: 'Mobile' | 'Desktop' | 'Tablet';
      deviceName: string;
      status: 'delivered' | 'failed';
      errorReason?: string;
    }

    const deviceReports: DeviceReport[] = [];

    // 2. Dispatch FCM HTTP v1 multicast
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
            title,
            body,
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
        const sub = subsList[idx]!;
        const tokenPreview = sub.token.substring(0, 10) + '...' + sub.token.slice(-6);

        if (resp.success) {
          deviceReports.push({
            tokenPreview,
            deviceType: sub.deviceInfo.deviceType,
            deviceName: sub.deviceInfo.name,
            status: 'delivered',
            errorReason: 'Delivered successfully ✅',
          });
        } else {
          const errCode = resp.error?.code || 'unknown_error';
          const errMsg = resp.error?.message || 'Failed delivery';
          failedTokens.push(sub.token);

          let readableReason = errMsg;
          if (errCode === 'messaging/registration-token-not-registered') {
            readableReason = 'Token expired / Browser session closed or cleared';
            // Auto delete dead token from Firestore
            deleteDoc(doc(serverDb, 'push_subscribers', sub.docId)).catch(() => {});
          } else if (errCode === 'messaging/invalid-registration-token') {
            readableReason = 'Invalid registration token';
            deleteDoc(doc(serverDb, 'push_subscribers', sub.docId)).catch(() => {});
          }

          deviceReports.push({
            tokenPreview,
            deviceType: sub.deviceInfo.deviceType,
            deviceName: sub.deviceInfo.name,
            status: 'failed',
            errorReason: readableReason,
          });
        }
      });
    } catch (adminErr: any) {
      errorMessage = adminErr?.message || String(adminErr);
      console.warn('Firebase Admin FCM dispatch notice:', errorMessage);

      // Populate failure report if overall FCM call failed
      subsList.forEach((sub) => {
        deviceReports.push({
          tokenPreview: sub.token.substring(0, 10) + '...' + sub.token.slice(-6),
          deviceType: sub.deviceInfo.deviceType,
          deviceName: sub.deviceInfo.name,
          status: 'failed',
          errorReason: errorMessage || 'FCM connection error',
        });
      });
    }

    // 3. Record notification history & device diagnostics in Firestore
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
      devices: deviceReports,
      errorMessage: isFCMDelivered ? null : errorMessage,
    });

    return NextResponse.json({ 
      success: true, 
      notificationId: notifDoc.id, 
      sentCount: tokens.length,
      deliveredCount: delivered, 
      failedCount: failedTokens.length,
      deliveredToFCM: isFCMDelivered,
      devices: deviceReports,
      warning: !isFCMDelivered 
        ? 'Service Account Key is missing or unauthenticated. Real push requires valid credentials.'
        : undefined
    });
  } catch (error: any) {
    console.error('Error sending push notification:', error);
    return NextResponse.json({ error: error.message || 'Failed to send notification' }, { status: 500 });
  }
}
