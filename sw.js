'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log('v2');
  evt.waitUntil(log('[ServiceWorker] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[ServiceWorker] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[ServiceWorker] Fetch ${evt.request.url}`));
});

self.addEventListener('message', (evt) => {
  console.log(evt);
  evt.waitUntil(log(`[ServiceWorker] Message ${evt.data}`));
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      console.log(clients);
      for (const client of clients) {
        client.postMessage({msg: 'Hello from SW'});
      }
    });
  }, 5000);
});

self.addEventListener('sync', (evt) => {
  evt.waitUntil(log(`[ServiceWorker] Sync ${evt.tag}`));
})

self.addEventListener('push', evt => {
  evt.waitUntil(log(`[ServiceWorker] Push received`));
});
