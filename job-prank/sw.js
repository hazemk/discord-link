const CACHE = 'discord-prank-v7';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png', './application-form.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
