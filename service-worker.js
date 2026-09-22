const CACHE = 'canvas-workshop-v9';
const ASSETS = [
  './', './index.html', './css/styles.css', './js/app.js', './js/molecule-viewer.js',
  './data/molecules.json', './assets/favicon.svg', './assets/vsepr-participant-input-pack.md', './manifest.webmanifest'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Network-first keeps GitHub Pages updates fresh while retaining an offline fallback.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok && event.request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
