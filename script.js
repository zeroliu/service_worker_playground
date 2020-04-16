const pickerContainer = document.querySelector('.sw-picker');

function log(text) {
  console.log(text);
  const body = JSON.stringify({
    ua: self.navigator.userAgent,
    text,
  });
  fetch('https://us-central1-simple-logging-367da.cloudfunctions.net/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

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
  render();
}

run();
