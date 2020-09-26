const cacheName = 'notes-cache';

const cacheUrls = [
  '/',
  '/assets/css/styles.css',
  '/public/css/bootstrap.min.css',
  '/public/css/normalize.css',
  '/public/css/tachyons.min.css',
  '/public/js/bootstrap.min.js',
  '/public/js/jquery-3.5.1.slim.min.js',
  '/public/js/popper.min.js',
  '/scripts/notes.js',
];

self.addEventListener('install', (event) => event.waitUntil(caches.open(cacheName).then(
  (cache) => cache.addAll(cacheUrls),
  (error) => console.error(error)
)));

self.addEventListener('fetch', (event) => event.respondWith(
  caches.match(event.request)
    .then((response) => {
      if (response) return response;
      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        (response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') return response;
          const responseToCache = response.clone();
          caches.open(cacheName).then((cache) => cache.put(event.request, responseToCache));
          return response;
        }
      );
    })
));

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['page-1', 'page-2'];
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheWhitelist.indexOf(cacheName) === -1) return caches.delete(cacheName);
    }));
  }));
});