// set cache name
const CACHE_NAME = 'mini-trello-v1';

self.addEventListener('install', evt =>
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      // caching font files
      .then(cache =>
        cache.addAll([
          'https://fonts.gstatic.com/s/materialicons/v87/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
          'https://fonts.googleapis.com/earlyaccess/nanumgothic.css',
        ]),
      ),
  ),
);

// hooking fetch evt
self.addEventListener('fetch', evt =>
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      // if already cached
      if (resp !== undefined) {
        return resp;
      }

      // or not => fetching
      return fetch(evt.request);
    }),
  ),
);
