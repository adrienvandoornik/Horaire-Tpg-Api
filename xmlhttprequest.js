let xhttp = new XMLHttpRequest(); // on crée un nouvel objet

xhttp.onreadystatechange = function () { // On attache le callback

  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // On vérifie que c’est OK

    let divHoraire = document.getElementById("horaire");
    let stopCode = JSON.parse(this.responseText).stops[0].stopCode;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {     // On attache le callback

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {  // On vérifie que c’est OK

        let data = JSON.parse(this.responseText);

        // On crée la liste ul
        let tableList = document.createElement('table')

        for (let departure of data.departures) {
          
         let trList = document.createElement('tr')
         tableList.appendChild(trList);

          trList.innerHTML = '<td class="lineCode"><i class="fas fa-bus"></i>&emsp; Ligne &emsp;<div class="linesColors" style="color:#FFFFFF;background-color:#009933;font-weight:bold;width:50px;height:25px;display:inline-block;text-align:center;border-radius:18px;font-size:18px;">' + departure.line.lineCode + '</div></td><td class="waitingTime"><i class="far fa-clock"></i>&emsp; Départ dans ' + departure.waitingTime + ' minutes </td><td class="destination"><i class="fas fa-directions"></i>&emsp; Direction ' + departure.line.destinationName + '</td>';
         
        }

         // On insère le tout dans la div horaire
         divHoraire.appendChild(tableList);
      }
    }
    // On indique la métode et la ressource GetLinesColors de la variable stopCode
    xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetLinesColors.json?&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b");

    // On indique la méthode et la ressource GetNextDepartures de la variable stopCode
    xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode=" + stopCode);
    xhttp.send(); // On lance la requête

  };
};

function rechercheDepartTpg(valeur){
  document.getElementById("horaire").innerHTML="";
  // On indique la métode et la ressource
  xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetStops?stopName=" + valeur + "&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b");
  xhttp.send(); // On lance la requête
};
