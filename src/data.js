let map;
let infowindow;

function SearchRest() {
  // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let myLatlng = new google.maps.LatLng(lat, lon);

    let mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let request = {
      location: myLatlng,
      radius: 5000,
      types: ['restaurant']
    };

    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
          console.log(results[i]);
        }
      }
    });
  });
}

function crearMarcador(place) {
  // Creamos un marcador
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

const renderInfo = (result) => {
  inputText.innerHTML = data.cuisines;
  containerYear.innerHTML = data.Year;
  containerRuntime.innerHTML = data.Runtime;  
};

/*
// API zomato
inputText.addEventListener('keypress', (event) => {
  let key = event.which || event.keyCode;
  if (key === 13) { // codigo 13 es enter
    let movie = inputText.value;
    inputText.value = '';
    // console.log(movie);

    fetch('curl -X GET --header "Accept: application/json" --header "user-key: 6db670593af45b2b19660972a890b815" "https://developers.zomato.com/api/v2.1/cuisines"')
      .then(response => response.json())// si la respuesta es correcta va a dar la informacion como una promesa
      .then(data => {
      // console.log(data);
        renderInfo(data);
      });
  }
}); 
*/

