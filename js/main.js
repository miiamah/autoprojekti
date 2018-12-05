// Modal function
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);
});


let ExcelToJSON = function () {

    this.parseExcel = function (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {

                // Here is object
                let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                let json_object = JSON.stringify(XL_row_object);
                jsonYeah = json_object;
                console.log(JSON.parse(json_object));
                jQuery('#xlx_json').val(json_object);
                try {
                    var userID = firebase.auth().currentUser.uid;
                    var dateSplit2 = XL_row_object[0]["Ajon päättyminen"].replace(' ', '.').split('.');
                    var database = firebase.database();
                    var testiref = database.ref(userID + '/' + dateSplit2[2] + '/' + dateSplit2[1]);
                    var poistoref = userID + '/' + dateSplit2[2] + '/' + dateSplit2[1];


                } catch {
                    alert('Tiedoston lataamisessa tapahtui virhe. Tarkista ohjeet ja kokeile uudelleen.');
                }



                var data = {};
                //JSON OBJECTI TIETOKANTAAN
                for (var i = 0; i < XL_row_object.length; ++i) {
                    data[i] = {
                        "Päivä": XL_row_object[i]["Ajon päättyminen"].replace(' ', '.').split('.'),
                        "Ajomatkat km": XL_row_object[i]["Ajomatkat km"],
                        "Keskinopeus": XL_row_object[i]["Keskinopeus km/h"],
                        "Kokonaiskulutus sähkö": XL_row_object[i]["Kokonaiskulutus kWh"],
                        "Keskikulutus sähkö": XL_row_object[i]["Ø-kulutus sähköllä kWh/100 km"],
                        "Kokonaiskulutus polttoaine": XL_row_object[i]["Kokonaiskulutus l"],
                        "Keskikulutus polttoaine": XL_row_object[i]["Ø-kulutus polttoaine l/100 km"]
                    };
                }


                if (poistoref.includes('undefined') === true) {
                    alert('Ei ladata, ongelma.');
                } else {
                    testiref.set({
                        data
                    });
                }
                // TIETOKANNASTA DATA HTML SIVULLE
                var dbref = firebase.database().ref(userID + "/2018/9/").once("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var childData = childSnapshot.val();
                        //Looppi kiertämään kaikki tiedot
                        for (x in childData) {

                            //kertaMatka on yksi rivi dataa; ajon päättyminen
                            var kertaMatka = childData[x];



                            console.log("kertamatka");
                            console.log(kertaMatka);

                            //Haetaaan tietokannan objectista yksitellen tiedot
                            var paiva = ("Ajon päättyminen: ") +
                                kertaMatka["Päivä"][2] + "-" + kertaMatka["Päivä"][1] + "-" +
                                kertaMatka["Päivä"][0] + " ";

                            var paivaaika = ("Ajassa: ") +
                                kertaMatka["Päivä"][3] +
                                " ";


                            var ajomatka = ("Ajomatkat: ") + kertaMatka["Ajomatkat km"] + " km. ";

                            var keskinopeus = ("Keskinopeus: ") + kertaMatka.Keskinopeus + " km/h ";

                            //kk on lyhenne keskikulutus
                            var kksahko = ("Keskikulutus sähköllä: " + kertaMatka["Keskikulutus sähkö"] + " kWh ");

                            var kkpolttoaine = ("Keskikulutus polttoaineella: ") + kertaMatka["Keskikulutus polttoaine"] + " l/100km ";

                            //koko on lyhenne kokonaiskulutus
                            var kokosahko = ("Kokonaiskulutus sähköllä: ") + kertaMatka["Kokonaiskulutus sähkö"] + " kWh ";

                            var kokopolttoaine = ("Kokonaiskulutus polttoaineella: ") + kertaMatka["Kokonaiskulutus polttoaine"] + " litraa";


                            /*   var bigOne = document.getElementById('bigOne').innerHTML += paiva + paivaaika + ajomatka + keskinopeus + kksahko + kkpolttoaine + kokosahko + kokopolttoaine + "</br>";*/



                        }
                    });
                });
            });
        };


        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
}




function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
    let xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
    location.reload();

};