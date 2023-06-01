window.onload = function(){
// app.js
    const firebaseConfig = {
    apiKey: "AIzaSyDLTmNykPXkx4XGLNKz8WxCo_y1QOFz9cE",
    authDomain: "flavour-fetch-1d5e3.firebaseapp.com",
    databaseURL: "https://flavour-fetch-1d5e3-default-rtdb.firebaseio.com",
    projectId: "flavour-fetch-1d5e3",
    storageBucket: "flavour-fetch-1d5e3.appspot.com",
    messagingSenderId: "733016344539",
    appId: "1:733016344539:web:5ab3d2f270d4d8458b49fe",
    measurementId: "G-G3VF6W2K76"
  };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    $('#login-btn').on('click', (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
            user.sendEmailVerification()
                .then(() => {
                alert('A verification email has been sent to your email address. Please verify your email and sign in again.');
                })
                .catch((error) => {
                console.error(error);
                });
            } else {
            alert('Signed in successfully!');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    });
}