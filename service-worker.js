const CACHE_NAME = 'mog-totality-v100.4.2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/mandate_mix.mp3',
  '/1000211769.mp4',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@supabase/supabase-js@2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// INSTALL: Caching Sovereign Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MOG_SYSTEM: Caching Sovereign Assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATE: Purging Legacy Frequencies
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// FETCH: Serving from Local Archive (Offline First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
