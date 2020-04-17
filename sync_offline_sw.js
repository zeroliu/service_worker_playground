'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil(log('[sync offline] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[sync offline] Activate'));
  self.clients.claim();
});

function delayLog(timeout) {
  return delayPing(timeout).then(() => log(`${timeout}ms request finished`));
}

self.addEventListener('sync', (evt) => {
  console.log('sync clicked');
  evt.waitUntil(log(`[sync offline] Message ${evt.tag}`));
  for (let i = 0; i < 10; ++i) {
    evt.waitUntil(delayLog(1000 * (i + 1)));
  }
  console.log('all sync tasks scheduled');
});
