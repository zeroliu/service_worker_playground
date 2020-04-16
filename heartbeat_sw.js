'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[heartbeat sw] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[heartbeat sw] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[heartbeat sw] Fetch ${evt.request.url}`));
  if (evt.request.url.includes('ping')) {
    setInterval(() => log('[heartbeat sw] ping!'), 5000);
  }
});
