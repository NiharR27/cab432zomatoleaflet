const searchForm = document.querySelector('form');
const rTemp = document.querySelector('template');
const resultArea = document.querySelector('#restaurant-results');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  resultArea.innerHTML = '';


  var marker = new Array();

  markerDel();

 
  const city = e.target.querySelector('#city-name').value;  //for the city
  if(city === '') {
    city = 'Brisbane';
  }     

  const query = e.target.querySelector('#restaurant-name').value; // for the restaurant name
  if (query === '') {
    return
  }
  
  e.target.querySelector('#restaurant-name').value = '';

  const res = await fetch('/search', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'POST', body: `q=${query}`
  })
 
  const json = await res.json();
  populateData(json.restaurants);

  console.log(json.restaurants);

  
   var results = json.restaurants;
   for(i = 0; i<results.length; i++) {
     var LamMarker = new L.marker([results[i].location.latitude,results[i].location.longitude]);
     marker.push(LamMarker);
     marker[i].bindPopup(results[i].name);
     map.addLayer(marker[i]);

   }


   



  //   results.foreach(result => {
  //    marker = l.marker([result.location.latitude,result.location.longitude]);
  //    marker.bindpopup(result.name);
  //    map.addlayer(marker);
  //   markerlist.push(marker);
  //  })
 });


function markerDel() {
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
});
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', e=> {
  console.log(e);
  const coords = [e.latlng.lat,e.latlng.lng];
  const marker = L.circle(coords, {
    color: 'red',
    fillColor: 'red',
    radius: 500
    
  });
  marker.bindPopup('You are Here!');
  map.addLayer(marker);
})
}

function populateData(results) {
  results.forEach(result => {
    const newResult = rTemp.content.cloneNode(true);
    newResult.querySelector('.result-title').innerText = result.name;
    newResult.querySelector('.result-neighborhood').innerText = result.location.locality;
    newResult.querySelector('.result-address').innerText = result.location.address;
    newResult.querySelector('.result-price').innerText = '$'.repeat(result.price);
    newResult.querySelector('.result-thumbnail').src = result.thumbnail;
    newResult.querySelector('.result-website').href = result.url;
    resultArea.appendChild(newResult);
  });
}