import { getAdminDb, getAdminMessaging } from '@/lib/firebase-admin';

async function sendPushToTokens(tokens: string[], title: string, body: string, url: string) {
  if (!tokens.length) return;
  const messaging = getAdminMessaging();
  const notifId = `notif_${Date.now()}`;
  await messaging.sendEachForMulticast({
    tokens,
    // Required for Android native push and browser-closed delivery
    notification: { title, body },
    // Data block used by SW for URL routing and click tracking
    data: { title, body, url, notificationId: notifId },
    webpush: {
      headers: { Urgency: 'high', TTL: '86400' },
      // webpush.notification is what Chrome/Firefox/Edge on Mac & Windows use
      notification: {
        title,
        body,
        icon: '/android-chrome-192x192.png',
        badge: '/favicon-32x32.png',
        tag: `cardzy-${notifId}`,
        renotify: true,
        requireInteraction: false,
        data: { url, notificationId: notifId },
      },
      fcmOptions: { link: url },
      data: { title, body, url, notificationId: notifId },
    },
  });
}

/** Notify all admin-flagged devices */
export async function notifyAdmins(title: string, body: string, url = '/admin_portal') {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection('push_subscribers').where('isAdmin', '==', true).get();
    const tokens = snapshot.docs.map(d => d.data().token as string).filter(Boolean);
    await sendPushToTokens(tokens, title, body, url);
  } catch (error) {
    console.warn('Failed to notify admins via push:', error);
  }
}

/** Notify a specific user (card creator) by their Firebase userId */
export async function notifyUserById(userId: string, title: string, body: string, url = '/dashboard') {
  try {
    if (!userId) return;
    const db = getAdminDb();
    const snapshot = await db.collection('push_subscribers').where('userId', '==', userId).get();
    const tokens = snapshot.docs.map(d => d.data().token as string).filter(Boolean);
    await sendPushToTokens(tokens, title, body, url);
  } catch (error) {
    console.warn('Failed to notify user via push:', error);
  }
}
