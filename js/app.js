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

    // Get elements by id
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const warningText = document.getElementById('warningText');

    // Add login event
    btnLogin.addEventListener('click', (evt) => {
        // Get email and password
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => {
            console.log(e.message);
            // Show warning message if incorrect user or password
            if (e.message == 'The password is invalid or the user does not have a password.') {
                warningText.innerHTML = 'Salasana väärin';
            } else if (e.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                warningText.innerHTML = 'Sähköposti osoite ei käytössä';
            } else if (e.message == 'The email address is badly formatted.') {
                warningText.innerHTML = 'Sähköposti ei kelpaa'
            } else {
                warningText.innerHTML = 'Tuntematon virhe';
            }
        });
    });

    // Add signup event
    btnSignUp.addEventListener('click', (evt) => {
        // Get email and password
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign up
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => {
            console.log(e.message);
            // Show warning messages + translate to Finnish
            if (e.message == "The email address is badly formatted.") {
                warningText.innerHTML = "Sähköposti ei kelpaa";
            } else if (e.message == "Password should be at least 6 characters") {
                warningText.innerHTML = "Salasanan täytyy olla vähintään 6 merkkiä pitkä";
            } else if (e.message == "The email address is already in use by another account.") {
                warningText.innerHTML = "Sähköposti on jo käytössä";
            } else if (e.message == "The password must be 6 characters long or more.") {
                warningText.innerHTML = "Salasanan täytyy olla vähintään 6 merkkiä pitkä";
            } else {
                warningText.innerHTML = "Tuntematon virhe";
            }
        });
    });

    // Add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            // Redirect to upload page after login
            window.location.href = "upload.html";
        } else {
            console.log('not logged in');
        }
    });


}());