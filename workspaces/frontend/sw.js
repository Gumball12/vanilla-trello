self.addEventListener('install', evt =>
  evt.waitUntil(
    caches.open('mini-trello-v1').then(cache =>
      // caching assets
      cache.addAll([
        '/',
        '/index.html',
        'https://fonts.googleapis.com/css2?family=Material+Icons',
      ]),
    ),
  ),
);
