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

                const user = result.user;
                const emailDomain = user.email.split('@')[1];

                if (emailDomain === 'quind.io') {

                    // Obtén el token de identificación
                    user.getIdToken().then((idToken) => {
         
                        // Crea la cookie con el token de identificación
                        document.cookie = "id_token=" + idToken + ";path=/";
                    
                        // // Redirecciona a home.html
                        window.location.href = "/pages/home.html";
                    });
                } else {
                    alert('No tienes acceso para ingresar.');
                    firebase.auth().signOut();
                }
            })
            .catch((error) => {
                console.error('Error during sign in:', error);
            });
    });
});