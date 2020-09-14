const map = L.map('map-template').setView([-27.470125,153.02333324], 10);
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//map.locate({enableHighAccuracy: true});

//map.on('locationfound',e => {
//    const coords = [e.latlng.lat,e.latlng.lng];
//    const marker = L.marker(coords);
//    marker.bindPopup("you are  here");
//    map.addLayer(marker);
//});

//const marker = L.marker([-27.470125,153.02333324]);
//marker.bindPopup('Hello!');
//map.addLayer(marker);

//const marker1 = L.marker([-37.8136,144.9631]);
//marker1.bindPopup("you are  here");
//map.addLayer(marker1);

//const marker2 = L.marker([-27.4799476233,153.0130468681]);
//marker2.bindPopup("Jacaranda Coffee Lane");
//map.addLayer(marker2);


