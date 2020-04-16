'use strict';

importScripts('logger.js');

self.addEventListener('install', (evt) => {
  evt.waitUntil(log('[activate error] Install'));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(log('[activate error] Activate'));
  throw new Error('activate error');
});

self.addEventListener('fetch', (evt) => {
  evt.waitUntil(log(`[activate error] Fetch ${evt.request.url}`));
});
