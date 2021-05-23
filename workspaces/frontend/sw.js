// set cache name
const CACHE_NAME = 'mini-trello-v1';

// hooking fetch evt
self.addEventListener('fetch', evt =>
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      // if already cached
      if (resp !== undefined) {
        return resp;
      }

      // or not => try caching
      return fetch(evt.request).then(resp => {
        const respClone = resp.clone();
        caches
          .open(CACHE_NAME)
          .then(cache => cache.put(evt.request, respClone));

        return resp;
      });
    }),
  ),
);
