const CACHE_NAME = 'pisms-v1';
const urlsToCache = [
  '/pisms/',
  '/pisms/index.html',
  '/pisms/js/app.js',
  '/pisms/manifest.json',
  '/pisms/icons/icon-192x192.png',
  '/pisms/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
