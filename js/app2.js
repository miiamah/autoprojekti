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

    // Hae elementit
    const btnLogOut = document.getElementById('btnLogOut');
    const btnRemoveUser = document.getElementById('remove-user');
    const btnRemoveAll = document.getElementById('remove-all');
    const btnSave = document.getElementById('btnSave');
    const btnDeleteLeasing = document.getElementById('btnDeleteLeasing');

    //Leasing tietojen tallennus tietokantaan
    btnSave.addEventListener('click', (evt) => {
        saveLeasingInfo();
    });

    function saveLeasingInfo() {
        const maxKm = document.getElementById("sallitut-km").value;
        const leasingStart = document.getElementById("liisaus-alkanut").value;
        const leasingEnd = document.getElementById("liisaus-loppuu").value;
        const userID = firebase.auth().currentUser.uid;
        const database = firebase.database();
        const testiref = database.ref("1leasingtiedot" + "/" + userID);
        if (maxKm == "" || leasingEnd == "" || leasingStart == "") {
            alert("Täytä kaikki kohdat!");
        } else {
            console.log(maxKm);
            testiref.set({
                maxkm: maxKm,
                start: leasingStart,
                end: leasingEnd
            });
            alert("Leasing tiedot tallennettu");
            document.getElementById("liisaus-alkanut").value = "";
            document.getElementById("sallitut-km").value = "";
            document.getElementById("liisaus-loppuu").value = "";
            location.reload();
        }



    }

    //Käyttäjän poisto
    let deleteUser = function () {
        //Heittää alertin "Oletko varma"
        let r = confirm("Oletko varma että haluat poistaa käyttäjätilin?");
        console.log(r);
        //Jos on varma, poistaa tilin
        if (r === true) {

            var user = firebase.auth().currentUser;
            deleteAll();
            user.delete().then(function () {
                alert("Käyttäjätili poistettu");
            }).catch(function (error) {
                // An error happened.
                alert("Tapahtui virhe");
            });
        }
    };
    //Poistaa kaikki tiedot
    let deleteAll = function () {
        var userID = firebase.auth().currentUser.uid;
        firebase.database().ref("/" + userID).remove().then(function () {
            //All deleted
            alert("Kaikki ajotiedot poistettu");
            location.reload();
        }).catch(function (error) {
            //Error
            alert("Tapahtui virhe");
        });
    };

    // Poistaa kaikki leasing tiedot
    function deleteLeasingInfo() {
        var userID = firebase.auth().currentUser.uid;
        let r = confirm("Oletko varma että haluat poistaa leasingtiedot?");
        console.log(r);
        if (r === true) {
            firebase.database().ref("/1leasingtiedot" + "/" + userID).remove().then(function () {
                //All deleted
                alert("Leasingtiedot poistettu");
                location.reload();
            }).catch(function (error) {
                //Error
                alert("Tapahtui virhe");
            });
        }
    }


    btnRemoveUser.addEventListener('click', (evt) => {
        deleteUser();
    });

    //Poista kaikki ajotiedot
    btnRemoveAll.addEventListener('click', (evt) => {
        deleteAll();
    });

    // Lisää logout eventti
    btnLogOut.addEventListener('click', (evt) => {
        firebase.auth().signOut();
    });

    // Poistaa kaikki leasing tiedot
    btnDeleteLeasing.addEventListener('click', (evt) => {
        deleteLeasingInfo();
    });

    //Reaaliaikainen kuuntelija sille onko käyttäjä kirjautunut vai ei
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // If logged in
            console.log(firebaseUser);
            var user = firebase.auth().currentUser;
        } else {
            // If not logged in redirect to index.html
            window.location.href = "index.html";
        }
    });
}());