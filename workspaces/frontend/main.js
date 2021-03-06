import './src/app.js';
import './src/state.js';

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => console.log('sw loaded')),
  );
}
