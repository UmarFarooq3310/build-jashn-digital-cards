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

// Deduplication memory cache (prevents duplicate notification triggers on Android & Desktop)
var recentNotifications = new Map();

// Unified function to show native notification safely across all desktop & mobile platforms
function displayNotification(payload) {
  var notificationTitle = 
    payload.notification?.title || 
    payload.data?.title || 
    payload.title || 
    'Cardzy Alert 🔔';

  var notificationBody = 
    payload.notification?.body || 
    payload.data?.body || 
    payload.body || 
    '';

  var targetUrl = 
    payload.fcmOptions?.link || 
    payload.data?.url || 
    payload.data?.link || 
    payload.notification?.click_action || 
    payload.url || 
    '/';

  var notifId = payload.data?.notificationId || payload.notificationId || (notificationTitle + '_' + notificationBody);

  // Check deduplication cache: if seen within 5 seconds, ignore duplicate call
  var now = Date.now();
  var lastSeen = recentNotifications.get(notifId);
  if (lastSeen && (now - lastSeen < 5000)) {
    return Promise.resolve();
  }
  recentNotifications.set(notifId, now);

  if (recentNotifications.size > 50) {
    var cutoff = now - 60000;
    recentNotifications.forEach(function(time, key) {
      if (time < cutoff) recentNotifications.delete(key);
    });
  }

  var origin = (self.location && self.location.origin) ? self.location.origin : 'https://cardzy.online';
  var iconUrl = origin + '/android-chrome-192x192.png';
  var badgeUrl = origin + '/favicon-32x32.png';
  var tag = 'cardzy-' + notifId.toString().replace(/[^a-zA-Z0-9]/g, '_');

  var notificationOptions = {
    body: notificationBody,
    icon: iconUrl,
    badge: badgeUrl,
    tag: tag, // Guaranteed identical tag collapses into 1 notification on Android & Desktop
    renotify: false, // Prevents buzzing multiple times for the same notification
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: {
      url: targetUrl,
      notificationId: notifId,
      title: notificationTitle,
      body: notificationBody,
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
}

// Single unified Firebase background messaging hook
messaging.onBackgroundMessage(function(payload) {
  return displayNotification(payload || {});
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var rawUrl = event.notification.data?.url || '/';
  var urlToOpen = normalizeTargetUrl(rawUrl, self.location.origin);
  var notificationId = event.notification.data?.notificationId;

  if (notificationId) {
    try {
      fetch('/api/push/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: notificationId })
      }).catch(function() {});
    } catch (e) {}
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
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
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
