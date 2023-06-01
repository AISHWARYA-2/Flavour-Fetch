const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };

   // Paste the code from Firebase
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

document.getElementById("loginbtn").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
    console.log(error.message);
  });
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.catch(e=>{ console.log(e.message)})
})

firebase.auth().onAuthStateChanged(user=>{ 
  if(user){
    document.getElementById("logout").classList.remove('hide')
  } else{
    document.getElementById("logout").classList.add('hide')
  }
})

document.getElementById("logout").addEventListener('click', e=>{
  firebase.auth().signOut();
  alert('logged out')
})