'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
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
