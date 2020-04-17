'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[sync error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[sync error] Activate'));
  self.clients.claim();
});

self.addEventListener('sync', (evt) => {
  evt.waitUntil(log(`[sync error] Sync ${evt.tag}`));
  throw new Error('sync error');
})
