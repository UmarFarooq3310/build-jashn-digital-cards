importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD0asLsaVAmvj2RX_rJmGq5AIyg_MffyEs",
  authDomain: "jashn-app-e3888.firebaseapp.com",
  projectId: "jashn-app-e3888",
  storageBucket: "jashn-app-e3888.firebasestorage.app",
  messagingSenderId: "399759583542",
  appId: "1:399759583542:web:5f2947d5dfbd1be3aeeb97"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle Background FCM message
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || payload.data?.title || 'Cardzy 🔔';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || '',
    icon: '/favicon-32x32.png',
    badge: '/favicon-32x32.png',
    data: {
      url: payload.fcmOptions?.link || payload.data?.url || payload.notification?.click_action || '/',
      notificationId: payload.data?.notificationId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Direct push listener to guarantee banner popup in all browser states (foreground & background)
self.addEventListener('push', function(event) {
  if (!event.data) return;
  try {
    const payload = event.data.json();
    const title = payload.notification?.title || payload.data?.title || 'Cardzy Notification 🔔';
    const options = {
      body: payload.notification?.body || payload.data?.body || '',
      icon: '/favicon-32x32.png',
      badge: '/favicon-32x32.png',
      vibrate: [200, 100, 200],
      data: {
        url: payload.fcmOptions?.link || payload.data?.url || payload.notification?.click_action || '/',
        notificationId: payload.data?.notificationId
      }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (_) {
    // If payload not JSON, show plain text
    try {
      event.waitUntil(self.registration.showNotification('Cardzy 🔔', {
        body: event.data.text(),
        icon: '/favicon-32x32.png'
      }));
    } catch (e) {}
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const rawUrl = event.notification.data?.url || '/';
  const urlToOpen = new URL(rawUrl, self.location.origin).href;
  const notificationId = event.notification.data?.notificationId;

  if (notificationId) {
    event.waitUntil(
      fetch('/api/push/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      })
        .then(() => clients.openWindow(urlToOpen))
        .catch(() => clients.openWindow(urlToOpen))
    );
  } else {
    event.waitUntil(clients.openWindow(urlToOpen));
  }
});
