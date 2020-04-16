const pickerContainer = document.querySelector('.sw-picker');
const pingBtn = document.querySelector('.ping-action');

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
  fetch('ping');
}

const swList = [
  'sw.js',
  'install_error_sw.js',
  'heartbeat_sw.js',
  'heartbeat_wait_until_sw.js'
];

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
  render();
}

run();
