//AIzaSyCj7xxZkXQUQ3j3Ha8EfQKqsKuXJgA21g4

let map;
let markersArray = [];

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
      radius: radius * 1000,
      type: ['park']
    };

    placesService.nearbySearch(request, (results, status) =>{
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //const locationAddresses = results.destinationAddresses;
        //const locationNames = results.name;
        let outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";
        /*let name = "";
        let address = "";
        let rating = "";*/
        for (let i = 0; i < results.length; i++) {
          /*let request = {
            place: {
              placeId: results[i].place_id,
              location: results[i].geometry.location
            }
          }
          placesService.getDetails(request, (place, status) =>{
            name = place.name;
            address = place.formatted_address;
            rating = place.rating;
          });*/
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
          outputDiv.innerHTML +=
              "Name: " + 
              results[i].name + "<br>" +
              "Address: " + 
              results[i].formatted_address + "<br>" + 
              "Rating: " + "<br>"
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
slider.defaultValue = 1;
let radiusOutput = document.getElementById("radiusValue");
radiusOutput.innerHTML = slider.value;

slider.oninput = () => {
  radius = slider.value;
  radiusOutput.innerHTML = radius;
}
console.log(radius);