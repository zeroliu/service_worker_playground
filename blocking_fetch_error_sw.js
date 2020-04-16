'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil(log('[blocking fetch error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[blocking fetch error] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[blocking fetch error] Fetch ${evt.request.url}`));
  if (evt.request.url.includes('ping')) {
    evt.respondWith((() => {
      throw new Error('fetch error')
    })());
  }
});

