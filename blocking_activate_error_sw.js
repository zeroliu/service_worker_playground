'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[blocking activate error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[blocking activate error] Activate'));
  evt.waitUntil(Promise.reject('activate error'));
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[blocking activate error] Fetch ${evt.request.url}`));
});
