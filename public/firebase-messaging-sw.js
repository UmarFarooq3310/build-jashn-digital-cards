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

function normalizeTargetUrl(rawUrl, origin, notifId) {
  if (!rawUrl || typeof rawUrl !== 'string') rawUrl = '/';
  var clean = rawUrl.trim();
  var finalUrl = clean;
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }
    try {
      finalUrl = new URL(clean, origin).href;
    } catch (e) {
      finalUrl = origin + '/';
    }
  }

  if (notifId) {
    try {
      var urlObj = new URL(finalUrl);
      urlObj.searchParams.set('_cnid', notifId);
      return urlObj.href;
    } catch (e) {
      return finalUrl;
    }
  }
  return finalUrl;
}

// Deduplication: prevents duplicate triggers from both FCM SDK and raw push event
var recentNotifications = new Map();
// Track whether FCM SDK already handled this push (set true in onBackgroundMessage)
var fcmHandledIds = new Set();

function isDuplicate(notifId) {
  var now = Date.now();
  var lastSeen = recentNotifications.get(notifId);
  if (lastSeen && (now - lastSeen < 8000)) {
    return true;
  }
  recentNotifications.set(notifId, now);
  // Prune old entries
  if (recentNotifications.size > 50) {
    var cutoff = now - 60000;
    recentNotifications.forEach(function(time, key) {
      if (time < cutoff) recentNotifications.delete(key);
    });
  }
  return false;
}

// Unified function to show native OS notification safely across all platforms
// Works on: Mac, Windows, Linux, Android (Chrome), iOS PWA
function displayNotification(payload, source) {
  var notificationTitle =
    (payload.notification && payload.notification.title) ||
    (payload.data && payload.data.title) ||
    payload.title ||
    'Cardzy 🔔';

  var notificationBody =
    (payload.notification && payload.notification.body) ||
    (payload.data && payload.data.body) ||
    payload.body ||
    '';

  var targetUrl =
    (payload.fcmOptions && payload.fcmOptions.link) ||
    (payload.data && (payload.data.url || payload.data.link)) ||
    (payload.notification && payload.notification.click_action) ||
    payload.url ||
    '/dashboard';

  var notifId =
    (payload.data && payload.data.notificationId) ||
    payload.notificationId ||
    (notificationTitle + '_' + notificationBody).replace(/\s+/g, '_').slice(0, 60);

  if (isDuplicate(notifId)) {
    return Promise.resolve();
  }

  var origin = (self.location && self.location.origin) ? self.location.origin : 'https://cardzy.online';
  var iconUrl = origin + '/android-chrome-192x192.png';
  var badgeUrl = origin + '/favicon-32x32.png';
  var tag = 'cardzy-' + notifId.toString().replace(/[^a-zA-Z0-9]/g, '_').slice(0, 60);

  var notificationOptions = {
    body: notificationBody,
    icon: iconUrl,
    badge: badgeUrl,
    tag: tag,
    renotify: true,
    requireInteraction: false, // false = notification auto-dismisses on Mac/Windows (less intrusive)
    silent: false,
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

// ── 1. FCM SDK background message handler ────────────────────────────────────
// Fires when browser tab is CLOSED or in background.
// FCM SDK calls this for messages that have BOTH notification + data, OR data-only.
messaging.onBackgroundMessage(function(payload) {
  // Mark this notification ID as FCM-handled to prevent raw push event from duping it
  var notifId = (payload.data && payload.data.notificationId) || null;
  if (notifId) fcmHandledIds.add(notifId);
  return displayNotification(payload || {}, 'fcm');
});

// ── 2. Raw Web Push event (fallback for non-FCM pushes and browser-closed wake-up) ──
// This is the critical path for Mac/Windows/Android when the browser process is closed.
// FCM HTTP v1 API sends a raw Web Push which wakes up the SW even with the browser closed.
self.addEventListener('push', function(event) {
  var payload = {};
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      try {
        var text = event.data.text();
        payload = { data: { body: text, title: 'Cardzy 🔔' } };
      } catch (e2) {
        payload = { data: { title: 'Cardzy 🔔', body: 'You have a new notification' } };
      }
    }
  }

  // If no data at all, show a generic notification so the push isn't silent
  if (!payload || Object.keys(payload).length === 0) {
    payload = { data: { title: 'Cardzy 🔔', body: 'You have a new notification', url: '/dashboard' } };
  }

  // Check if FCM SDK already handled this (avoid duplicate on foreground-to-background transition)
  var notifId = (payload.data && payload.data.notificationId) || null;
  if (notifId && fcmHandledIds.has(notifId)) {
    fcmHandledIds.delete(notifId);
    return; // FCM SDK already showed it
  }

  event.waitUntil(displayNotification(payload, 'push'));
});

// ── 3. Notification click handler ────────────────────────────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var rawUrl = (event.notification.data && event.notification.data.url) || '/';
  var notificationId = event.notification.data && event.notification.data.notificationId;
  var origin = (self.location && self.location.origin) ? self.location.origin : 'https://cardzy.online';
  var urlToOpen = normalizeTargetUrl(rawUrl, origin, notificationId);

  var trackPromise = Promise.resolve();
  if (notificationId) {
    try {
      trackPromise = fetch(origin + '/api/push/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: notificationId }),
        keepalive: true
      }).catch(function() {});
    } catch (e) {}
  }

  var navigatePromise = clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
    // If any window of the app is already open, navigate it to the target URL
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
    // No window open — open a new one
    if (clients.openWindow) {
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(Promise.all([trackPromise, navigatePromise]));
});
