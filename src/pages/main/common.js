const SERVER_URL = 'https://academy.directlinedev.com';

function sendrequest ({url, method = 'GET', headers, body = null}) {
    return fetch(SERVER_URL + url + '?v=1.0.0', {
        method,
        headers,
        body,
    })
}

function renderMenu () {
    const noLoginLinks = document.querySelectorAll('.nav-no-login_js');
    const loginLinks = document.querySelectorAll('.nav-login_js');
    const isLogin = localStorage.getItem('token');

    if (!noLoginLinks || !loginLinks) {
        return;
    }

    if (isLogin) {
        loginLinks.forEach(link => {
            link.classList.remove('hidden');
        })
        noLoginLinks.forEach(link => {
            link.classList.add('hidden');
        })
    } else {
        loginLinks.forEach(link => {
            link.classList.add('hidden');
        })
        noLoginLinks.forEach(link => {
            link.classList.remove('hidden');
        })
    }
}