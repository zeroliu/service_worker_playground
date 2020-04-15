const pickerContainer = document.querySelector('.sw-picker');

function log(message) {
  console.log(message);
  fetch('https://us-central1-simple-logging-de455.cloudfunctions.net/log', {
    method: 'POST',
    body: message,
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
  registerSW(path);
  render();
}

const swList = [
  'sw.js',
  'install_error_sw.js',
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
    return;
  }
  pickerContainer.addEventListener('click', handleClick);
  render();
}

run();
