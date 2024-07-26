function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', () => {
    const userToken = getCookie('id_token');

    if (userToken) {
        fetchUserData(userToken);
      
    } else {
        window.location.href = "../index.html";
    }
});

function fetchUserData(idToken) {

    const url = `https://qcracks-worker.ebetancurpalacio.workers.dev?idToken=${idToken}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            return response.json();
        })
        .then(data => {
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}


function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');

    const userHtml = `
        <p>Bienvenido, ${user.email}</p>
        <img src="${user.photoUrl}" alt="Profile Picture">
        <p>Email: ${user.email}</p>
        <p>Último inicio de sesión: ${new Date(parseInt(user.lastLoginAt)).toLocaleString()}</p>
        <p>Creado en: ${new Date(parseInt(user.createdAt)).toLocaleString()}</p>
    `;

    userInfoDiv.innerHTML = userHtml;
}

