function getCookie(name) {
    const cookies = document.cookie;
    const cookieArray = cookies.split(';');

    for (let cookie of cookieArray) {
        cookie = cookie.trim();

        const [cookieName, cookieValue] = cookie.split('=');

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function manageContainersBasedOnAuth() {
    const container3 = document.getElementById('container3');
    const container4 = document.getElementById('container4');
    const containerHurricaneTracker = document.getElementById('containerHurricaneTracker');
    const containerLiveRadar = document.getElementById('containerLiveRadar');
    const containerPollenMap = document.getElementById('containerPollenMap');

    const cookieValue = getCookie('token');

    const overlayStyle = `
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(43, 79, 139, 0.5); 
    z-index: 1000; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: white; 
    backdrop-filter: blur(5px);  // Apply a blur effect with a strength of 5px;
    border-radius: 15px;
`;
    const overlayMessage = '<div style="' + overlayStyle + '">Please log in to view this content.</div>';
    const currentPath = window.location.pathname

    if (currentPath === '/' || currentPath === '/index.html') {
        if (!cookieValue) {
            container3.innerHTML += overlayMessage;
            container4.innerHTML += overlayMessage;
        }
    } else if (currentPath === '/alerts') {

        if (!cookieValue) {
            containerHurricaneTracker.innerHTML += overlayMessage;
            containerLiveRadar.innerHTML += overlayMessage;
            containerPollenMap.innerHTML += overlayMessage;
        }
    }
}

window.addEventListener('load', function () {
    const cookieName = 'token';
    const cookieValue = getCookie(cookieName);

    if (cookieValue) {
        delayContent();
    }

    manageContainersBasedOnAuth();
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function delayContent() {
    const currentPage = window.location.pathname
    let delayTime = 0;
    if (currentPage === '/') {
        delayTime = 50;
    } else if (currentPage === '/alerts') {
        delayTime = 10;
    } else if (currentPage === '/about') {
        delayTime = 200;
    }

    await delay(delayTime);

    const signOut = document.getElementById('signOutContainer');
    const signIn = document.getElementById('signInContainer');

    signOut.style.display = 'inline-block';
    signIn.style.display = 'none';
}

window.addEventListener('load', function () {
    const cookieName = 'token';
    const cookieValue = getCookie(cookieName);

    if (cookieValue) {
        delayContent();
    }
});