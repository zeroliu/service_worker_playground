const pickerContainer = document.querySelector('.sw-picker');
const pingBtn = document.querySelector('.ping-action');
const messageBtn = document.querySelector('.message-action');
const syncBtn = document.querySelector('.sync-action');

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
  pickerContainer.addEventListener('click', handleClick);
  pingBtn.addEventListener('click', ping);
  messageBtn.addEventListener('click', message);
  syncBtn.addEventListener('click', sync);
  render();
}

run();
