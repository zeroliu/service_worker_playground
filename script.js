const pickerContainer = document.querySelector('.sw-picker');
const pingBtn = document.querySelector('.ping-action');
const messageBtn = document.querySelector('.message-action');
const syncBtn = document.querySelector('.sync-action');
const pushBtn = document.querySelector('.push-action');
const publicVapidKey = 'BC63NYuMHo5IApDXPU8xeuGJHrHCRR70b1lCVaGPase-PkaEnX4k3ogxBolw0WTWEydspId0uwKQxQSoVylJIfQ';

const swList = [
  'sw.js',
  'heartbeat_sw.js',
  'heartbeat_wait_until_sw.js',
  'install_error_sw.js',
  'blocking_install_error_sw.js',
  'activate_error_sw.js',
  'blocking_activate_error_sw.js',
  'message_error_sw.js',
  'blocking_message_error_sw.js',
  'fetch_error_sw.js',
  'blocking_fetch_error_sw.js',
  'sync_error_sw.js',
  'blocking_sync_error_sw.js',
  'sync_offline_sw.js',
];

function registerSW(path) {
  localStorage.setItem('currentSW', path);
  navigator.serviceWorker.register(path).then(reg => {
    log(`${path} is registered`);
    reg.pushManager.getSubscription().then(function (sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  });
}

function handleClick(e) {
  const path = e.target.dataset.src;
  if (path) {
    registerSW(path);
    render();
  }
}

function ping() {
  fetch('ping').then(console.log);
}

function message() {
  navigator.serviceWorker.controller.postMessage('post message from client');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/, '+').replace(/\_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeUser() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Endpoint URL: ', sub.endpoint);
    fetch('https://us-central1-simple-logging-367da.cloudfunctions.net/log/subscribe', {
      method: 'POST',
      body: JSON.stringify(sub),
      headers: {
        'content-type': 'application/json',
      }
    });
  } catch (e) {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied');
    } else {
      console.error('Unable to subscribe to push', e);
    }
  }
}

async function sync() {
  const registration = await navigator.serviceWorker.ready;
  registration.sync.register('sw-sync');
}

function render() {
  let currentSW = localStorage.getItem('currentSW');
  if (!currentSW) {
    currentSW = swList[0];
  }
  pickerContainer.innerHTML = swList.map(path => `
    <button class="${currentSW === path ? 'selected' : ''}" data-src="${path}">${path}</button>
  `).join('')
}

function run() {
  if (!('serviceWorker' in navigator)) {
    const log = document.querySelector('.log');
    const div = document.createElement('div');
    div.textContent = 'Service Worker is not supported';
    log.parentElement.insertBefore(div, log);
    return;
  }
  let currentSW = localStorage.getItem('currentSW');
  if (!currentSW) {
    currentSW = swList[0];
  }
  window.addEventListener('load', function () {
    console.log('window loaded');
    registerSW(currentSW);
  });
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
  })
  navigator.serviceWorker.addEventListener('message', evt => {
    console.log(evt.data);
  });
  pickerContainer.addEventListener('click', handleClick);
  pingBtn.addEventListener('click', ping);
  messageBtn.addEventListener('click', message);
  syncBtn.addEventListener('click', sync);
  pushBtn.addEventListener('click', subscribeUser);
  render();
}

run();
