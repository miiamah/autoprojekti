let color1 = '#1760d6';
let color2 = '#43d317';
let color3 = '#190101';
taulukko2 = [];
bensataulukko = [];
uusibensataulukko = [];
taulukkoReduced = [];
result = [];
taulu = [];
// Select function
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            color1 = '#1760d6';
            color2 = '#43d317';
            color3 = '#190101';
            searchData();
            searchYearlyData();
        } else {

            color1 = '#190101';
            color2 = '#a8a8a8';
            color3 = '#190101';
            searchData();
            searchYearlyData();
        }
    });

});






function drawKmHistogram() {
    data = new google.visualization.DataTable();

    data.addColumn('number', 'Matkan pituus');

    for (let i = 0; i < taulukko2.length; i++) {
        data.addRow([taulukko2[i][3]], );
    }

    var options = {
        title: 'Matkojen määrä kilometreittäin',
        legend: {
            position: 'none'
        },
        width: 900,
        height: 300,
        histogram: {
            bucketSize: 20
        },
        hAxis: {
            title: 'Ajettu (km)',
        },
        vAxis: {
            title: 'Matkat (kpl)',
        },
        colors: [color2]
    };

    var chart = new google.visualization.Histogram(document.getElementById('km_histogram_div'));
    chart.draw(data, options);
}

function drawGasToKmChart() {

    data = new google.visualization.DataTable();
    data.addColumn('number', 'Matka (km)');
    data.addColumn('number', 'Km / litraa');

    for (let i = 0; i < taulukko2.length; i++) {
        data.addRow([taulukko2[i][3], taulukko2[i][2]], );
    }

    var options = {
        title: 'Bensan keskikulutus kilometreittäin',
        width: 900,
        height: 300,
        chart: {
            title: 'Students\' Final Grades',
            subtitle: 'based on hours studied'
        },
        hAxis: {
            title: 'Ajettu (km)',
            minValue: 0,
        },
        vAxis: {
            title: 'Bensan kulutus (l/100km)',
            minValue: 0,
        },
        colors: [color1]
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('gas_to_km_chart_div'));

    chart.draw(data, options);
}

function drawTripChart(hevTrips, eTrips, color1, color2) {
    // Create data for Trip Chart
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Hybridi', hevTrips],
        ['Täyssähkö', eTrips]
    ]);

    // Set options for Trip Chart
    var options = {
        title: 'Matkojen määrä (kpl)',
        width: 445,
        height: 300,
        colors: [color1, color2]
    };

    // Instantiate and draw the chart
    var chart = new google.visualization.PieChart(document.getElementById('trip_chart_div'));
    chart.draw(data, options);
}

function drawDrivenKmChart(eKm, hevKm, color1, color2) {

    // Create the data table for Driven Km Chart
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Hybridi', hevKm],
        ['Täyssähkö', eKm],
    ]);

    // Set options for Driven Km chart
    var options = {
        title: 'Ajetut kilometrit (km)',
        width: 445,
        height: 300,
        colors: [color1, color2]
    };

    // Instantiate and draw the chart Driven Km chart
    var chart = new google.visualization.PieChart(document.getElementById('driven_km_chart_div'));
    chart.draw(data, options);
}

function drawConsumptionChart(color2, color3) {

    // Create the data table for Consumption Chart
    data = new google.visualization.DataTable();

    data.addColumn('date', 'Aika');
    data.addColumn('number', 'Sähkön kulutus (Muunnettuna bensalitroiksi)');
    data.addColumn('number', 'Bensan kulutus (l)');

    for (let i = 0; i < taulukkoReduced.length; i++) {
        data.addRow([taulukkoReduced[i][0], taulukkoReduced[i][1], taulukkoReduced[i][2]], );
    }

    // Set options for Consumption Chart
    var options = {
        title: 'Kulutus',
        width: 900,
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3
        },
        vAxis: {
            logscale: true
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: true,
        colors: [color2, color3]
    };

    // Instantiate and draw the Consumption Chart
    var chart = new google.visualization.ColumnChart(document.getElementById("consumption_chart_div"));
    chart.draw(data, options);
}

function drawConsumptionChart2(color2, color3) {

    // Create the data table for Consumption Chart
    data = new google.visualization.DataTable();

    data.addColumn('string', 'Aika');
    data.addColumn('number', 'Sähkön kulutus (Muunnettuna bensalitroiksi)');
    data.addColumn('number', 'Bensan kulutus (l)');

    for (let i = 0; i < taulukkoReduced.length; i++) {
        data.addRow([taulukkoReduced[i][0], taulukkoReduced[i][1], taulukkoReduced[i][2]], );
    }

    // Set options for Consumption Chart
    var options = {
        title: 'Kulutus',
        width: 900,
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3
        },
        vAxis: {
            logscale: true
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: true,
        colors: [color2, color3]
    };

    // Instantiate and draw the Consumption Chart
    var chart = new google.visualization.ColumnChart(document.getElementById("consumption_chart_div"));
    chart.draw(data, options);
}



// OSIOIDEN PIILOTUS JA AVAUS riville 225
var latausosio = document.getElementById("latausosio");

function piilotaLataus() {
    if (latausosio.style.display === "none") {
        latausosio.style.display = "block";
    } else {
        latausosio.style.display = "none";
    }
}

var latauskohta = 'isClosed';
latausosio.style.display = 'none';

var kuukausivalinta = document.getElementById("inputForm");
kuukausivalinta.style.visibility = 'none';


setTimeout(function () {
    $('#loadingRoller').fadeOut('fast');
}, 2500); // <-- time in milliseconds

function showMonthSelection() {
    document.getElementById("inputForm").style.visibility = "visible";
    showOthersNappi.style.display = 'block';
    console.log('tähän alle');
    if (document.getElementById("valitseKuukausi").options[1] == undefined) {
        console.log('tuli undefined');
        console.log(document.getElementById("valitseKuukausi").options[1]);
        latauskohta = 'isOpen';
        kuukausivalinta.style.display = "none";
        latausosio.style.display = "block";
    } else {
        console.log('ei tullu undefined');
        console.log(document.getElementById("valitseKuukausi").options[1]);
        latauskohta = 'isClosed';
        kuukausivalinta.style.display = "block";
        latausosio.style.display = "none";
    }
}

setTimeout("showMonthSelection()", 3000);

var showOthersNappi = document.getElementById('showOthers');
showOthersNappi.style.display = 'none';

function showOthers() {
    kuukausivalinta.style.display = "block";
    latausosio.style.display = "none";

}


setTimeout(function () {
    // SEKUNNIN ODOTUS ETTÄ MUUT TIEDOSTOT ON VALMIINA

    var database = firebase.database();

    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref(userID);
    ref.on('value', gotData);
}, 1000);

var kaikkiKilometrit = 0;
var vuosiKmArray = 0;
var historyObject = {};
var leasingVuodet = [];
var ajokilsatVuosittain = [''];


function gotData(data) {
    var vuodetArray = data.val();
    //HAE VUODET TIETOKANNASTA
    var vuodetObject = Object.entries(vuodetArray).forEach(entry => {
        let vuosi = entry[0];
        let value = entry[1];
        leasingVuodet.push(vuosi);
        console.log(vuosi);
        //console.log(value);


        // TÄHÄN SISÄÄN HISTORIAN AJOTIEDOT--------------------------------------------------------------------------------

        Object.entries(value).forEach(entry => {
            let toka = entry[1];
            for (x in toka) {
                var tokantoka = toka[x]
                Object.entries(tokantoka).forEach(entry => {
                    var matkat = entry[1];

                    var ajomatka = Number(matkat["Ajomatkat km"]);
                    // console.log(ajomatka);
                    kaikkiKilometrit += ajomatka;
                    vuosiKmArray += ajomatka;

                    // historyObject.push([vuosi]: kaikkiKilometrit);

                });

            }

        });




        console.log(vuosiKmArray);

        ajokilsatVuosittain.push(vuosiKmArray);

        vuosiKmArray = 0;




        //----------------------------------------------------------------------------------------------------------------



        //Lisää vuodet valintaformiin
        var vuosivalinta = document.getElementById("valitseVuosi");
        var option = document.createElement("option");
        option.text = vuosi;
        vuosivalinta.add(option);


        var vuosihakuObject = Object.entries(value).forEach(entry => {
            let vuosi = entry[0];
            let value = entry[1];

        });
        //HAE KUUKAUSITTAIN TIETOKANNASTA
        var kuukaudetObject = Object.entries(value).forEach(entry => {

            let kuukausi = entry[0];

            //document.getElementById('chooseMonth').innerHTML += kuukausi + " ";
            //Lisää kuukaudet valintaformiin
            var kkvalinta = document.getElementById("valitseKuukausi");
            var option = document.createElement("option");
            option.text = vuosi + "/" + kuukausi;
            kkvalinta.add(option);

            vuosiFormi = document.getElementById("input-field col");
            if (kkvalinta.length <= 2) {
                vuosiFormi.style.display = "none";
            } else {
                vuosiFormi.style.display = "block";
            }


        });
    });


}

function drawLeasingChart(sallitutKm, kaikkiKm) {
    console.log(leasingVuodet);
    console.log(ajokilsatVuosittain);
    console.log(kaikkiKilometrit);
    // Create the data table for Consumption Chart
    data = new google.visualization.DataTable();
    data.addColumn('string', '');
    for (i = 0; i < leasingVuodet.length; i++) {
        data.addColumn('number', [leasingVuodet[i]]);
    }
    data.addColumn('number', 'Jäljellä olevat km.');

    /*
        data.addColumn('number', 'Aika');
        data.addColumn('number', 'Ajetut km');
        data.addColumn('number', 'Jäljellä olevat km');
    */

    let minus = sallitutKm - kaikkiKilometrit;
    ajokilsatVuosittain.push(minus);
    data.addRows([
        ajokilsatVuosittain
    ]);

    // Set options for Consumption Chart
    var options = {
        title: 'Leasing auton kilometrit',
        width: 900,
        height: 150,
        legend: {
            position: 'top',
            maxLines: 3
        },
        vAxis: {
            logscale: true
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: true,
    };

    // Instantiate and draw the Consumption Chart
    var chart = new google.visualization.BarChart(document.getElementById("leasing_div"));
    chart.draw(data, options);
}


var kanopeudet = document.getElementById('nopeusChart');

function searchData() {
    // Tehdään searchInputista käyttäjän hakema kuukausi
    var searchInput = document.forms.inputForm.valitseKuukausi.value;
    fetchData(searchInput);
    if (kanopeudet.style.display = 'none') {
        kanopeudet.style.display = 'block';
    }

}

function searchYearlyData() {
    // Tehdään searchInputista käyttäjän hakema vuosi
    var yearlySearchInput = document.forms.yearInputFrom.valitseVuosi.value;
    fetchYearData(yearlySearchInput);
    for (var i = 0; i < result.length; i++) {
        taulukkoReduced.push([result[i]["date"], result[i]["sahko"], result[i]["bensa"]]);
    }
    if (yearlySearchInput != 'null') {
        google.charts.setOnLoadCallback(drawConsumptionChart2(color2, color3));
    }
    if (yearlySearchInput != 'null') {
        kanopeudet.style.display = 'none'
    }

}





function fetchData(searchInput) {
    let hevTrips = 0;
    let eTrips = 0;
    let hevKm = 0;
    let eKm = 0;
    let bensaaKulutettu = 0;
    let sahkoaKulutettu = 0;
    let saasto = 0;
    variables = [];
    taulukko2 = [];
    bensataulukko = [];
    uusibensataulukko = [];
    taulukkoReduced = [];
    nopeustaulukko = [];

    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref(userID + "/" + searchInput + "/").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            //Looppi kiertämään kaikki tiedot
            for (x in childData) {

                //kertaMatka on yksi rivi dataa; ajon päättyminen
                var kertaMatka = childData[x];


                var kuukaudenKerronta = kertaMatka["Päivä"][1];
                var theKuukausi = '';
                var vuodenKerronta = kertaMatka["Päivä"][2];

                if (kuukaudenKerronta == 1) {
                    theKuukausi = "Tammikuu";
                } else if (kuukaudenKerronta == 2) {
                    theKuukausi = "Helmikuu";
                } else if (kuukaudenKerronta == 3) {
                    theKuukausi = "Maaliskuu";
                } else if (kuukaudenKerronta == 4) {
                    theKuukausi = "Huhtikuu";
                } else if (kuukaudenKerronta == 5) {
                    theKuukausi = "Toukokuu";
                } else if (kuukaudenKerronta == 6) {
                    theKuukausi = "Kesäkuu";
                } else if (kuukaudenKerronta == 7) {
                    theKuukausi = "Heinäkuu";
                } else if (kuukaudenKerronta == 8) {
                    theKuukausi = "Elokuu";
                } else if (kuukaudenKerronta == 9) {
                    theKuukausi = "Syyskuu";
                } else if (kuukaudenKerronta == 10) {
                    theKuukausi = "Lokakuu";
                } else if (kuukaudenKerronta == 11) {
                    theKuukausi = "Marraskuu";
                } else {
                    theKuukausi = "Joulukuu";
                }

                document.getElementById('vuosivalue').selected = true;
                document.getElementById('ajankohtavuosi').innerHTML = '';
                document.getElementById('ajankohtakuukausi').innerHTML = '<span style="font-weight: bolder">' + theKuukausi + ' ' + vuodenKerronta + '</span>';

                //Haetaaan tietokannan objectista yksitellen tiedot
                var paiva = new Date(kertaMatka["Päivä"][2], (kertaMatka["Päivä"][1] - 1), kertaMatka["Päivä"][0]);

                var paivaaika = Number(kertaMatka["Päivä"][3]);

                var ajomatka = Number(kertaMatka["Ajomatkat km"]);

                var keskinopeus = Number(kertaMatka.Keskinopeus);

                //kk on lyhenne keskikulutus
                var kksahko = Number(kertaMatka["Keskikulutus sähkö"]);

                var kkpolttoaine = Number(kertaMatka["Keskikulutus polttoaine"]);

                //koko on lyhenne kokonaiskulutus
                var kokosahko = Number(kertaMatka["Kokonaiskulutus sähkö"]);

                var kokopolttoaine = Number(kertaMatka["Kokonaiskulutus polttoaine"]);

                console.log(kokopolttoaine);
                //var bigOne = document.getElementById('bigOne').innerHTML += paiva + paivaaika + ajomatka + keskinopeus + kksahko + kkpolttoaine + kokosahko + kokopolttoaine + "</br>";

                bensaaKulutettu += kokopolttoaine;
                sahkoaKulutettu += kokosahko;

                //Erittelee täyssähkö ja hev km
                if (kkpolttoaine == 0.0) {
                    eKm += ajomatka;
                } else {
                    hevKm += ajomatka;
                }
                //Laskee matkat hev ja täyssähkönä
                if (kkpolttoaine == 0.0) {
                    eTrips += 1;
                } else {
                    hevTrips += 1;
                }

                // Tekee taulukot joita käytetään kuvaajien piirrossa
                taulukko = [paiva, kksahko, kkpolttoaine, ajomatka];
                taulukko2.push(taulukko);
                nopeustaulukko.push(keskinopeus);

                bensataulukko.push({
                    date: paiva,
                    sahko: (Math.round((kksahko / 9) * 10) / 10),
                    bensa: kkpolttoaine
                });
            }

            //Piirretään  keskinopeuschart
            console.log(nopeustaulukko);
            var sum = 0;
            for (var i = 0; i < nopeustaulukko.length; i++) {
                sum += parseInt(nopeustaulukko[i], 10); //don't forget to add the base
            }

            var kkKeskinopeus = sum / nopeustaulukko.length;
            var pyoristettykeskinopeus = Math.round((kkKeskinopeus * 10) / 10);
            var kkSuurin = Math.max.apply(Math, nopeustaulukko);
            console.log('The average is: ' + pyoristettykeskinopeus + ' Suurin: ' + kkSuurin);
            // NOPEUDEN NÄYTTÄMINEN ( ekat pystyy laittaa fetchdataan) ------

            function nopeusChart() {

                var data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Keskinopeus', pyoristettykeskinopeus],
                    ['Suurin keskinopeus', kkSuurin]
                ]);

                var options = {
                    max: 120,
                    width: 500,
                    height: 220,
                    redFrom: 100,
                    redTo: 130,
                    yellowFrom: 85,
                    yellowTo: 100,
                    majorTicks: [0, 20, 40, 60, 80, 100, 120],
                    minorTicks: 2

                };

                var chart = new google.visualization.Gauge(document.getElementById('nopeusChart'));

                chart.draw(data, options);

            }

            // Yhdistää saman päivän bensan ja sähkönkulutukset yhteen, jotta niitä voidaan käyttää kuvaajassa
            result = Object.values(bensataulukko.reduce((a, {
                date, sahko, bensa
            }) => {
                a[date] = (a[date] || {
                    date, sahko: 0, bensa: 0
                });
                a[date].bensa = a[date].bensa + bensa;
                a[date].sahko = a[date].sahko + sahko;
                return a;
            }, {}));

            // Muuntaa edellisessä kohdassa tehdyn taulukon muotoon jossa muuttujia ei ole nimetty
            for (var i = 0; i < result.length; i++) {
                taulukkoReduced.push([result[i]["date"], result[i]["sahko"], result[i]["bensa"]]);
            }
            // Laskee kuinka monta ajomatkaa on tehty
            let kaikkiAjot = eTrips + hevTrips;
            // Laskee ajetut kilometrit
            let kaikkiKm = hevKm + eKm;

            taulu = [];
            let sallitutKm;
            try {
                firebase.database().ref("1leasingtiedot" + "/" + userID + "/").once("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var childData = childSnapshot.val();
                        console.log(childData);
                        taulu.push(childData);
                    });
                    console.log(taulu);
                    console.log(taulu[0]);
                    showClock();
                    sallitutKm = Number(taulu[1]);
                    console.log(sallitutKm);
                    google.charts.setOnLoadCallback(drawLeasingChart(sallitutKm, kaikkiKm));
                });
            } catch (err) {
                console.log('Hups');
            }

            // Laskee säästetyn rahamäärän
            // Bensan ja sähköhinnat ovat oletuksia
            const bensaHinta = 1.5;
            const sahkoHinta = 0.075;
            const keskiSahko = (Math.round(((sahkoaKulutettu / kaikkiKm) * 100) * 100) / 100);
            const keskiBensa = (Math.round(((bensaaKulutettu / kaikkiKm) * 100) * 100) / 100);
            const kwh100kmTemp = keskiSahko * sahkoHinta;
            const kwh100km = (Math.round(kwh100kmTemp * 100) / 100);
            const l100kmTemp = keskiBensa * bensaHinta;
            const l100km = (Math.round(l100kmTemp * 100) / 100);
            const euroakmTemp = (kwh100km + l100km) / 100;
            const euroakm = (Math.round(euroakmTemp * 100) / 100);
            const aitoHintaTemp = kaikkiKm * euroakm;
            const aitoHinta = (Math.round(aitoHintaTemp * 100) / 100);
            // Oletus keskikulutus jos olisi ajettu pelkällä bensalla koko kuukausi
            const oletusBkulutus = 6.5;
            const oletusl100km = oletusBkulutus * bensaHinta;
            const oletusEuroakm = oletusl100km / 100;
            const oletusHinta = kaikkiKm * oletusEuroakm;

            const saasto = oletusHinta - aitoHinta;


            // Kirjoittaa upload.html sivulle ajetut_km -nimiseen h4:seen tiedot matkojen määrästä ym
            document.getElementById("ajetut_km").innerHTML = "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiKm + "</span> ajettua kilometriä" + "<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiAjot + "</span> matkaa" + "<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(bensaaKulutettu) + "</span> litraa bensaa kulunut <br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(sahkoaKulutettu) + "</span> kWh sähköä kulunut<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + "~" + (Math.round(saasto * 100) / 100) + " €</span> säästetty<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + "~" + aitoHinta + " €</span> käytetty tässä kuussa<br>";


            // Draw the charts
            // Draw the pie chart for Trip Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawTripChart(hevTrips, eTrips, color1, color2));

            // Draw the pie chart for the Driven Km Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawDrivenKmChart(eKm, hevKm, color1, color2));

            // Draw the pie chart for the Consumption Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawConsumptionChart(color2, color3));

            google.charts.setOnLoadCallback(drawGasToKmChart(color2, color3));

            google.charts.setOnLoadCallback(drawKmHistogram());

            google.charts.load('current', {
                'packages': ['gauge']
            });
            google.charts.setOnLoadCallback(nopeusChart);

            console.log(variables);

        });
    });
}

function fetchYearData(yearlySearchInput) {
    let hevTrips = 0;
    let eTrips = 0;
    let hevKm = 0;
    let eKm = 0;
    let bensaaKulutettu = 0;
    let sahkoaKulutettu = 0;
    let saasto = 0;
    variables = [];
    taulukko2 = [];
    bensataulukko = [];
    uusibensataulukko = [];
    taulukkoReduced = [];

    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref(userID + "/" + yearlySearchInput + "/").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            result = [];
            var childData = childSnapshot.val();
            //Looppi kiertämään kaikki tiedot
            for (x in childData) {}
            //kertaMatka on yksi rivi dataa; ajon päättyminen
            var kuukaudenMatkat = childData[x];


            for (y in kuukaudenMatkat) {
                var vuodenKertaMatka = kuukaudenMatkat[y];

                var vuodenKerronta = vuodenKertaMatka["Päivä"][2];
                document.getElementById('ajankohtavuosi').innerHTML = '<span style="font-weight: bolder">' + vuodenKerronta + '</span>';

                document.getElementById('kuukausivalue').selected = true;
                document.getElementById('ajankohtakuukausi').innerHTML = '';

                var kuukaudenKerronta = vuodenKertaMatka["Päivä"][1];
                var theKuukausi = '';

                if (kuukaudenKerronta == 1) {
                    theKuukausi = "Tammikuu";
                } else if (kuukaudenKerronta == 2) {
                    theKuukausi = "Helmikuu";
                } else if (kuukaudenKerronta == 3) {
                    theKuukausi = "Maaliskuu";
                } else if (kuukaudenKerronta == 4) {
                    theKuukausi = "Huhtikuu";
                } else if (kuukaudenKerronta == 5) {
                    theKuukausi = "Toukokuu";
                } else if (kuukaudenKerronta == 6) {
                    theKuukausi = "Kesäkuu";
                } else if (kuukaudenKerronta == 7) {
                    theKuukausi = "Heinäkuu";
                } else if (kuukaudenKerronta == 8) {
                    theKuukausi = "Elokuu";
                } else if (kuukaudenKerronta == 9) {
                    theKuukausi = "Syyskuu";
                } else if (kuukaudenKerronta == 10) {
                    theKuukausi = "Lokakuu";
                } else if (kuukaudenKerronta == 11) {
                    theKuukausi = "Marraskuu";
                } else {
                    theKuukausi = "Joulukuu";
                }

                //Haetaaan tietokannan objectista yksitellen tiedot
                var paiva = theKuukausi + " " + vuodenKertaMatka["Päivä"][2];

                var paivaaika = Number(vuodenKertaMatka["Päivä"][3]);

                var ajomatka = Number(vuodenKertaMatka["Ajomatkat km"]);

                var keskinopeus = Number(vuodenKertaMatka.Keskinopeus);

                //kk on lyhenne keskikulutus
                var kksahko = Number(vuodenKertaMatka["Keskikulutus sähkö"]);

                var kkpolttoaine = Number(vuodenKertaMatka["Keskikulutus polttoaine"]);

                //koko on lyhenne kokonaiskulutus
                var kokosahko = Number(vuodenKertaMatka["Kokonaiskulutus sähkö"]);

                var kokopolttoaine = Number(vuodenKertaMatka["Kokonaiskulutus polttoaine"]);

                console.log(kokopolttoaine);
                //var bigOne = document.getElementById('bigOne').innerHTML += paiva + paivaaika + ajomatka + keskinopeus + kksahko + kkpolttoaine + kokosahko + kokopolttoaine + "</br>";

                bensaaKulutettu += kokopolttoaine;
                sahkoaKulutettu += kokosahko;

                //Erittelee täyssähkö ja hev km
                if (kkpolttoaine == 0.0) {
                    eKm += ajomatka;
                } else {
                    hevKm += ajomatka;
                }
                //Laskee matkat hev ja täyssähkönä
                if (kkpolttoaine == 0.0) {
                    eTrips += 1;
                } else {
                    hevTrips += 1;
                }

                // Tekee taulukot joita käytetään kuvaajien piirrossa
                taulukko = [paiva, kksahko, kkpolttoaine, ajomatka];
                taulukko2.push(taulukko);

                bensataulukko.push({
                    date: paiva,
                    sahko: (Math.round((kksahko / 9) * 10) / 10),
                    bensa: kkpolttoaine
                });
            }

            // Yhdistää saman päivän bensan ja sähkönkulutukset yhteen, jotta niitä voidaan käyttää kuvaajassa
            result = Object.values(bensataulukko.reduce((a, {
                date, sahko, bensa
            }) => {
                a[date] = (a[date] || {
                    date, sahko: 0, bensa: 0
                });
                a[date].bensa = a[date].bensa + bensa;
                a[date].sahko = a[date].sahko + sahko;
                return a;
            }, {}));


            // Muuntaa edellisessä kohdassa tehdyn taulukon muotoon jossa muuttujia ei ole nimetty

            // Laskee kuinka monta ajomatkaa on tehty
            let kaikkiAjot = eTrips + hevTrips;
            // Laskee ajetut kilometrit
            let kaikkiKm = hevKm + eKm;

            taulu = [];
            let sallitutKm;

            firebase.database().ref("1leasingtiedot" + "/" + userID + "/").once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    console.log(childData);
                    taulu.push(childData);
                });
                console.log(taulu);
                console.log(taulu[0]);


                showClock();

                sallitutKm = Number(taulu[1]);
                console.log(sallitutKm);
                try {
                    google.charts.setOnLoadCallback(drawLeasingChart(sallitutKm, kaikkiKm));
                } catch (err) {
                    console.log('Hups');
                }
            });



            console.log(sallitutKm);
            // Laskee säästetyn rahamäärän
            // Bensan ja sähköhinnat ovat oletuksia
            const bensaHinta = 1.5;
            const sahkoHinta = 0.075;
            const keskiSahko = (Math.round(((sahkoaKulutettu / kaikkiKm) * 100) * 100) / 100);
            const keskiBensa = (Math.round(((bensaaKulutettu / kaikkiKm) * 100) * 100) / 100);
            const kwh100kmTemp = keskiSahko * sahkoHinta;
            const kwh100km = (Math.round(kwh100kmTemp * 100) / 100);
            const l100kmTemp = keskiBensa * bensaHinta;
            const l100km = (Math.round(l100kmTemp * 100) / 100);
            const euroakmTemp = (kwh100km + l100km) / 100;
            const euroakm = (Math.round(euroakmTemp * 100) / 100);
            const aitoHintaTemp = kaikkiKm * euroakm;
            const aitoHinta = (Math.round(aitoHintaTemp * 100) / 100);
            // Oletus keskikulutus jos olisi ajettu pelkällä bensalla koko kuukausi
            const oletusBkulutus = 6.5;
            const oletusl100km = oletusBkulutus * bensaHinta;
            const oletusEuroakm = oletusl100km / 100;
            const oletusHinta = kaikkiKm * oletusEuroakm;
            const saasto = oletusHinta - aitoHinta;

            // Kirjoittaa upload.html sivulle ajetut_km -nimiseen h4:seen tiedot matkojen määrästä ym
            document.getElementById("ajetut_km").innerHTML = "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiKm + "</span> ajettua kilometriä" + "<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiAjot + "</span> matkaa" + "<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(bensaaKulutettu) + "</span> litraa bensaa kulunut <br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(sahkoaKulutettu) + "</span> kWh sähköä kulunut<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + "~" + (Math.round(saasto * 100) / 100) + " €</span> säästetty<br>"  + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + "~" + aitoHinta + " €</span> käytetty vuonna " + vuodenKerronta;

            // Draw the charts
            // Draw the pie chart for Trip Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawTripChart(hevTrips, eTrips, color1, color2));

            // Draw the pie chart for the Driven Km Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawDrivenKmChart(eKm, hevKm, color1, color2));

            // Draw the pie chart for the Consumption Chart when Charts is loaded.


            google.charts.setOnLoadCallback(drawGasToKmChart(color2, color3));

            google.charts.setOnLoadCallback(drawKmHistogram());

        });
    });
}

function showClock() {

    var today = new Date();
    console.log('sdgsdgsdgsdgdsgdsgsdgsdgdsgsdgsdgs');
    console.log(taulu);
    console.log(taulu[0]);
    var BigDay = new Date((taulu[0]).toString());
    console.log(BigDay);
    var msPerDay = 24 * 60 * 60 * 1000;
    var timeLeft = (BigDay.getTime() - today.getTime());
    var e_daysLeft = timeLeft / msPerDay;
    var daysLeft = Math.floor(e_daysLeft);
    var yearsLeft = 0;
    if (daysLeft > 365) {
        yearsLeft = Math.floor(daysLeft / 365);
        daysLeft = daysLeft % 365;
    }
    var e_hrsLeft = (e_daysLeft - daysLeft) * 24;
    var hrsLeft = Math.floor(e_hrsLeft);
    var minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);
    if (daysLeft < 0) {
        daysLeft = 0;
    }
    document.getElementById('clockdiv').innerHTML = ("<span style='line-height: 130%'>Leasing voimassa:<br><span style='font-size: 130%; color: #2979ff; font-weight: bolder'>" + yearsLeft + "</span> vuotta <span style='font-size: 130%; color: #2979ff; font-weight: bolder'>" + daysLeft + "</span> päivää</span>");

}

