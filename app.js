//AIzaSyCj7xxZkXQUQ3j3Ha8EfQKqsKuXJgA21g4

let map;
let markersArray = [];


const radiusMult = 100;

let radius = 1;

function initMap() {
  // Configure the click listener.

  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.6872,
      lng: -97.3301
    },
    zoom: 5,
  });
  const placesService = new google.maps.places.PlacesService(map);

  let origin = {
    lat: 0,
    lng: 0
  };

  // Configure the click listener.
  google.maps.event.addListener(map, 'click', (mapsMouseEvent) => {
    origin = {
      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng()
    };
    console.log(origin);
    let request = {
      location: origin,
      radius: '10000',
      type: ['park']
    };

    placesService.nearbySearch(request, (results, status) =>{
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          new google.maps.Marker({
            map: map,
            place: {
              placeId: results[i].place_id,
              location: results[i].geometry.location
            },
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
          });
        }
      }
    });

    new google.maps.Marker({
      map: map,
      position: origin
    });

  });
}

function addMarker(latLng, color){
  let url = "http://maps.google.com/mapfiles/ms/icons/";
  url += color + "-dot.png";

  let marker = new google.maps.Marker({
    map: map,
    position: latLng,
    icon: {
      url: url
    }
  });

  //store the marker object drawn in global array
  markersArray.push(marker);
}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}


let slider = document.getElementById("radiusSlider");
let radiusOutput = document.getElementById("radiusValue");
radiusOutput.innerHTML = slider.value;

slider.oninput = () => {
  radius = (slider.value * radiusMult) / 1000;
  radiusOutput.innerHTML = radius;
}
console.log(radius);