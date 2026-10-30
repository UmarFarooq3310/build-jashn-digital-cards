// Push notifications have been removed from Cardzy.
// This script cleanly unregisters any previously installed service worker.
self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.registration.unregister().then(function() {
      return self.clients.matchAll();
    })
  );
});
