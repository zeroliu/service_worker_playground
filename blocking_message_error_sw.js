'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil(log('[blocking message error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[blocking message error] Activate'));
  self.clients.claim();
});

self.addEventListener('blocking message', (evt) => {
  evt.waitUntil(log(`[blocking message error] Message ${evt.data}`));
  evt.waitUntil(Promise.reject('message error'));
});
