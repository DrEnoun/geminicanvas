const CACHE = 'canvas-workshop-v1';
const ASSETS = [
  './', './index.html', './css/styles.css', './js/app.js', './js/molecule-viewer.js',
  './data/molecules.json', './assets/favicon.svg', './manifest.webmanifest'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
