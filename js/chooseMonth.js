let color1 = '#1760d6';
let color2 = '#43d317';
let color3 = '#190101';
taulukko2 = [];
bensataulukko = [];
uusibensataulukko = [];
taulukkoReduced = [];

// Select month function
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            color1 = '#190101';
            color2 = '#a8a8a8';
            color3 = '#190101';
            searchData()
        } else {
            color1 = '#1760d6';
            color2 = '#43d317';
            color3 = '#190101';
            searchData()
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
        title: 'Bensan kulutus kilometreittäin',
        width: 900,
        height: 300,
        chart: {
            title: 'Students\' Final Grades',
            subtitle: 'based on hours studied'
        },
        hAxis: {
            title: 'Km ajettu',
            minValue: 0,
        },
        vAxis: {
            title: 'Bensan kulutus',
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

setTimeout(function () {
    // SEKUNNIN ODOTUS ETTÄ MUUT TIEDOSTOT ON VALMIINA

    var database = firebase.database();

    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref(userID);
    ref.on('value', gotData);
}, 1000);




function gotData(data) {
    var vuodetArray = data.val();
    //HAE VUODET TIETOKANNASTA
    var vuodetObject = Object.entries(vuodetArray).forEach(entry => {
        let vuosi = entry[0];
        let value = entry[1];

        console.log(vuosi);
        console.log(value);
        //use key and value here
        //document.getElementById('chooseYear').innerHTML += vuosi + " ";
        //HAE KUUKAUDET TIETOKANNASTA
        var kuukaudetObject = Object.entries(value).forEach(entry => {
            let kuukausi = entry[0];
            //document.getElementById('chooseMonth').innerHTML += kuukausi + " ";
            //Lisää kuukaudet valintaformiin
            var x = document.getElementById("valitseKuukausi");
            var option = document.createElement("option");
            option.text = vuosi + "/" + kuukausi;
            x.add(option);

        });
    });


}



function searchData() {
    // Tehdään searchInputista käyttäjän hakema kuukausi
    var searchInput = document.forms.inputForm.valitseKuukausi.value;
    //Ajaa fetchDatan
    fetchData(searchInput);

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
    bensataulukko = [];
    uusibensataulukko = [];
    taulukkoReduced = [];
    taulukko2 = [];
    console.log(searchInput);
    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref(userID + "/" + searchInput + "/").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            //Looppi kiertämään kaikki tiedot
            for (x in childData) {

                //kertaMatka on yksi rivi dataa; ajon päättyminen
                var kertaMatka = childData[x];



                //console.log("kertamatka");
                //console.log(kertaMatka);

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
            for (var i = 0; i < result.length; i++) {
                taulukkoReduced.push([result[i]["date"], result[i]["sahko"], result[i]["bensa"]]);
            }
            // Laskee kuinka monta ajomatkaa on tehty
            let kaikkiAjot = eTrips + hevTrips;
            // Laskee ajetut kilometrit
            let kaikkiKm = hevKm + eKm;

            // Laskee säästetyn rahamäärän
            // Bensan ja sähköhinnat ovat oletuksia
            const bensaHinta = 1.5;
            const sahkoHinta = 0.075;
            const keskiSahko = (Math.round(((sahkoaKulutettu/kaikkiKm)*100)*100)/100);
            const keskiBensa = (Math.round(((bensaaKulutettu/kaikkiKm)*100)*100)/100);
            const kwh100kmTemp = keskiSahko*sahkoHinta;
            const kwh100km = (Math.round(kwh100kmTemp*100)/100);
            const l100kmTemp = keskiBensa*bensaHinta;
            const l100km = (Math.round(l100kmTemp*100)/100);
            const euroakmTemp = (kwh100km+l100km)/100;
            const euroakm = (Math.round(euroakmTemp*100)/100);
            const aitoHintaTemp = kaikkiKm*euroakm;
            const aitoHinta = (Math.round(aitoHintaTemp*100)/100);
            // Oletus keskikulutus jos olisi ajettu pelkällä bensalla koko kuukausi
            const oletusBkulutus = 6.5;
            const oletusl100km = oletusBkulutus*bensaHinta;
            const oletusEuroakm = oletusl100km/100;
            const oletusHinta = kaikkiKm*oletusEuroakm;

            const saasto = oletusHinta-aitoHinta;


            // Kirjoittaa upload.html sivulle ajetut_km -nimiseen h4:seen tiedot matkojen määrästä ym
            document.getElementById("ajetut_km").innerHTML = "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiKm + "</span> ajettua kilometriä" + "<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + kaikkiAjot + "</span> matkaa" + "<br>" +  "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(bensaaKulutettu) + "</span> litraa bensaa kulunut <br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + Math.round(sahkoaKulutettu) + "</span> kwH sähköä kulunut<br>" + "<span style='font-weight: bolder; color: #2979ff; font-size: 130%'>" + (Math.round(saasto*100)/100) + " €</span> säästetty";


            // Draw the charts
            // Draw the pie chart for Trip Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawTripChart(hevTrips, eTrips, color1, color2));

            // Draw the pie chart for the Driven Km Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawDrivenKmChart(eKm, hevKm, color1, color2));

            // Draw the pie chart for the Consumption Chart when Charts is loaded.
            google.charts.setOnLoadCallback(drawConsumptionChart(color2, color3));

            google.charts.setOnLoadCallback(drawGasToKmChart(color2, color3));

            google.charts.setOnLoadCallback(drawKmHistogram());
            console.log(variables);

        });
    });
}