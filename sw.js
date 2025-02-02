
// Nama cache versi
const cacheName = 'to-do-list-cache-v1';

// Daftar aset yang akan disimpan dalam cache
const assets = [
  '/',
  '/index.html',
  '/css/style.css', // Ganti dengan path CSS Anda
  '/js/script.js',  // Ganti dengan path JavaScript Anda
  '/img/icon-192x192.png',
  '/img/icon-512x512.png'
];

// Event Install - Menyimpan file ke dalam cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Event Fetch - Mengambil file dari cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Jika ada di cache, gunakan cache; jika tidak, ambil dari jaringan
      return response || fetch(event.request);
    })
  );
});

// Event Activate - Membersihkan cache lama jika ada versi baru
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
      );
    })
  );
});
