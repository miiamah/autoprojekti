// Initialize Firebase
(function () {
    var config = {
        apiKey: "AIzaSyAFD3lOAkpVNiXw0Lj3LOWT7aUBitCYp_c",
        authDomain: "team-passat.firebaseapp.com",
        databaseURL: "https://team-passat.firebaseio.com",
        projectId: "team-passat",
        storageBucket: "team-passat.appspot.com",
        messagingSenderId: "825934187463"
    };
    firebase.initializeApp(config);

    // Get elements
    const btnLogOut = document.getElementById('btnLogOut');

    // Add logout event
    btnLogOut.addEventListener('click', (evt) => {
        firebase.auth().signOut();
    });

    // Add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            // If logged in
            console.log(firebaseUser);
        } else {
            // If not logged in redirect to index.html
            console.log('not logged in');
            window.location.href = "index.html";
        }
    });


}());