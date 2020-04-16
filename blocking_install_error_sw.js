'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[blocking install error] Install'));
  evt.waitUntil(Promise.reject('install error'));
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[blocking install error] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[blocking install error] Fetch ${evt.request.url}`));
});
