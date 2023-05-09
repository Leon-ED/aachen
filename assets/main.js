const imgs = document.querySelectorAll('img');
console.log(imgs);

imgs.forEach(img => {
    img.setAttribute('draggable', 'false');
});

// Coordonnées de la ville
const cityLat = 50.7753455;    // Latitude de la ville
const cityLng = 6.0838868; // Longitude de la ville
var map;

function initMap() {


    // Création de la carte
    map = L.map('map').setView([cityLat, cityLng], 13);

    // Ajout des tuiles de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(map);

    // Ajout d'un marqueur sur un lieu emblématique de la ville
    var marker = L.marker([cityLat, cityLng]).addTo(map);
    marker.bindPopup("Aachen - Aix-la-Chapelle").openPopup();
}

window.addEventListener("load", initMap);

function setLocation() {
    console.log("setLocation");
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        document.getElementById("latitude").innerHTML = Math.round(lat * 100) / 100;
        document.getElementById("longitude").innerHTML = Math.round(long * 100) / 100;
        document.getElementById("userLocation").classList.remove("hidden");
        const distance = getDistanceFromLatLonInKm(lat, long, cityLat, cityLng);

        //get the map
        var marker = L.marker([lat, long]).addTo(map);

    });

}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Rayon de la terre en km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad ci-dessous
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c; // Distance en km
    document.getElementById("distance").innerHTML = Math.round(d * 100) / 100;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
var interval = null;
const audio = new Audio("assets/son.mp3");
document.getElementById("play").addEventListener("click", element => {
    //jouer le son depuis le fichoer
    console.log("play");
    if(audio.paused){
        interval = setInterval(updateTimer, 1000);
        audio.play();
    }
    
});

document.getElementById("slider-son").addEventListener("change", element => {
    audio.volume = element.target.value;
});

document.getElementById("pause").addEventListener("click", element => {
    //jouer le son depuis le fichoer
    if(!audio.paused){
        clearInterval(interval);
        audio.pause();
    }
});

function updateTimer(){
    const ratio = audio.currentTime / audio.duration;
    document.getElementById("progression").value = ratio * 100;
}

document.addEventListener("DOMContentLoaded", function() {
    // Sélectionnez l'élément <div> où vous souhaitez afficher le sommaire
    
    const sommaireDiv = document.querySelector("#sommaire");
  
    // Créez l'élément <ol> pour le sommaire
    const ol = document.createElement("ol");
  
    // Sélectionnez toutes les sections de la page avec document.querySelectorAll('section')
    const sections = document.querySelectorAll("section");
  
    // Parcourez chaque section
    sections.forEach(function(section) {
      // Récupérez le titre de la section
      const titreSection = section.querySelector("h2").textContent;
  
      // Récupérez l'id de la section
      const idSection = section.id;
  
      // Créez un lien hypertexte avec le titre de la section et l'id correspondant
      const lien = document.createElement("a");
      lien.href = `#${idSection}`;
      lien.textContent = titreSection;
  
      // Créez un élément <li> pour le lien hypertexte
      const li = document.createElement("li");
      li.appendChild(lien);
  
      // Ajoutez l'élément <li> au sommaire (<ol>)
      ol.appendChild(li);
    });
  
    // Ajoutez le sommaire (<ol>) à l'élément <div> correspondant
    sommaireDiv.appendChild(ol);
  
    // Supprimez le premier élément de la liste indiquant le chargement lorsque le chargement est terminé
    document.querySelector("#dummy").remove();
  });
  