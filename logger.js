function log(message) {
  console.log(message);
  return fetch('https://us-central1-simple-logging-de455.cloudfunctions.net/log', {
    method: 'POST',
    body: message,
    mode: 'no-cors',
  });
}
