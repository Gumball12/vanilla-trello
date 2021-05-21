import './src/app.js';

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => console.log('sw loaded')),
  );
}
