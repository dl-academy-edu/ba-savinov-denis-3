const SERVER_URL = 'https://academy.directlinedev.com';

function sendrequest ({url, method = 'GET', headers, body = null}) {
    return fetch(SERVER_URL + url + '?v=1.0.0', {
        method,
        headers,
        body,
    })
}