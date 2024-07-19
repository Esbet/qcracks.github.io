function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = getCookie('user_info');

    if (userInfo) {
        const user = JSON.parse(decodeURIComponent(userInfo));
        const userInfoDiv = document.getElementById('user-info');

        const userHtml = `
            <p>Bienvenido, ${user.displayName}</p>
            <img src="${user.photoURL}" alt="Profile Picture">
            <p>Email: ${user.email}</p>
        `;

        userInfoDiv.innerHTML = userHtml;
    } else {
        // No hay información del usuario, redireccionar al login
        window.location.href = "../index.html";
    }
});
