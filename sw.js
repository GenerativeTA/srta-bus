// SRTA Bus - Service Worker for Offline Support
const CACHE_NAME = 'srta-bus-cache-v34';
const ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

function isDynamicPage(url) {
  return url.includes('install.html') || url.includes('index.html');
}

// Install: cache app assets only (not install.html)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: HTML pages always from network; other assets network-first
self.addEventListener('fetch', event => {
  if (isDynamicPage(event.request.url)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
