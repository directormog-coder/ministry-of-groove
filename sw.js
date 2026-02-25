const CACHE_NAME = 'mog-v70';
const ASSETS = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/directormog-coder/Ministry-of-Groove/main/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
