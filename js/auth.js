const firebaseConfig = {
    apiKey: "AIzaSyDNMJmiCPzlUiB3K0Cpli-4_3X4jYI_T98",
    authDomain: "qcrack-auth.firebaseapp.com",
    projectId: "qcrack-auth",
    storageBucket: "qcrack-auth.appspot.com",
    messagingSenderId: "514235033431",
    appId: "1:514235033431:web:9fa51a8771102128d28012",
    measurementId: "G-J83K8MY9DC"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
    // Agrega event listener para el botón de Iniciar sesión
    document.querySelector('.bIniciar').addEventListener('click', function (e) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // Obtén el token de identificación
                result.user.getIdToken().then((idToken) => {
                    // Información del usuario
                    const user = result.user;
                    const userInfo = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    };
                    alert("token", result.user)
                    // Crea la cookie con el token de identificación
                    document.cookie = "id_token=" + idToken + ";path=/";
                    document.cookie = "user_info=" + JSON.stringify(userInfo) + ";path=/";

                    // // Redirecciona a home.html
                    window.location.href = "home.html";
                });
            })
            .catch((error) => {
                console.error('Error during sign in:', error);
            });
    });
});