'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[heartbeat sw] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[heartbeat sw] Activate'));
  setInterval(() => log('[heartbeat sw] ping!'), 5000);
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[heartbeat sw] Fetch ${evt.request.url}`));
});
