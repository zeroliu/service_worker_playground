'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil(log('[message error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[message error] Activate'));
  self.clients.claim();
});

self.addEventListener('message', (evt) => {
  evt.waitUntil(log(`[message error] Message ${evt.data}`));
  throw new Error('message error');
});
