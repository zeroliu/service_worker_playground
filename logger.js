const cache = [];

function debounce(callback) {
  let timeoutId = -1;
  const resolves = [];
  return function () {
    return new Promise(resolve => {
      resolves.push(resolve);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const result = callback.apply(undefined, arguments);
        for (const res of resolves) {
          res(result);
        }
        resolves.length = 0;
      }, 500);
    })
  }
}

function sendLog() {
  const body = JSON.stringify(Array.from(cache));
  cache.length = 0;
  return fetch('https://us-central1-simple-logging-367da.cloudfunctions.net/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

const debouncedSendLog = debounce(sendLog);

function log(text) {
  console.log(text);
  const body = {
    ua: self.navigator.userAgent,
    text,
  };
  cache.push(body);
  return debouncedSendLog();
}
