'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[install error] Install'));
  throw new Error('install error');
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[install error] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[install error] Fetch ${evt.request.url}`));
});
