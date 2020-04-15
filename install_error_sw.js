'use strict';

self.addEventListener('install', (evt) => {
  try {
    console.log('[sw install error] Install');
    self.skipWaiting();
    throw new Error('install sw failed');
  } catch (e) {
    fetch('https://us-central1-simple-logging-de455.cloudfunctions.net/log', {
      method: 'POST',
      body: `install error sw throws error: ${e.message}`,
    });
  }
  fetch('https://us-central1-simple-logging-de455.cloudfunctions.net/log', {
    method: 'POST',
    body: `install error sw completed`,
  });
});

self.addEventListener('activate', (evt) => {
  console.log('[sw install error] Activate');
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[sw install error] Fetch', evt.request.url);
});
