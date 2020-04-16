function log(text) {
  console.log(text);
  const body = JSON.stringify({
    ua: self.navigator.userAgent,
    text,
  });
  return fetch('https://us-central1-simple-logging-367da.cloudfunctions.net/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
