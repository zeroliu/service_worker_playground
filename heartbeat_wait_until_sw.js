'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[heartbeat wait until sw] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[heartbeat wait until sw] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[heartbeat wait until sw] Fetch ${evt.request.url}`));
  if (evt.request.url.includes('ping')) {
    const ping = () => new Promise(resolve => setInterval(() => log('[heartbeat wait until sw] ping!'), 5000));
    evt.waitUntil(ping());
  }
});
