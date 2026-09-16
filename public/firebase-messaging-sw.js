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

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

function normalizeTargetUrl(rawUrl, origin) {
  if (!rawUrl || typeof rawUrl !== 'string') return origin + '/';
  var clean = rawUrl.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  try {
    return new URL(clean, origin).href;
  } catch (e) {
    return origin + '/';
  }
}

// Single unified background message handler
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || payload.data?.title || 'Cardzy 🔔';
  const notificationBody = payload.notification?.body || payload.data?.body || '';
  const targetUrl = payload.fcmOptions?.link || payload.data?.url || payload.notification?.click_action || '/';
  const notifId = payload.data?.notificationId;

  const notificationOptions = {
    body: notificationBody,
    icon: '/favicon-32x32.png',
    badge: '/favicon-32x32.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: {
      url: targetUrl,
      notificationId: notifId,
      title: notificationTitle,
      body: notificationBody,
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const rawUrl = event.notification.data?.url || '/';
  const urlToOpen = normalizeTargetUrl(rawUrl, self.location.origin);
  const notificationId = event.notification.data?.notificationId;

  if (notificationId) {
    try {
      fetch('/api/push/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      }).catch(function() {});
    } catch (e) {}
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // 1. If matching tab is open, navigate and focus
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client && 'focus' in client) {
          if ('navigate' in client) {
            return client.navigate(urlToOpen).then(function(navigatedClient) {
              return navigatedClient ? navigatedClient.focus() : client.focus();
            }).catch(function() {
              return client.focus();
            });
          }
          return client.focus();
        }
      }
      // 2. Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
