'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil(log('[fetch error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[fetch error] Activate'));
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[fetch error] Fetch ${evt.request.url}`));
  throw new Error('fetch error');
});

