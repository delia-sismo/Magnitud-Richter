// sw.js
const CACHE_NAME = "magnitud-ml-v2";  // <- cambia el nombre de la versión
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./ARIG.jpg",
  "./CMIG.jpg",
  "./MOIG.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

self.addEventListener("activate", e => {
  // borra cachés viejas
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});
