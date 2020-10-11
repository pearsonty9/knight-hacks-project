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
              results[i].vicinity + "<br>" + 
                "Rating: " +
              results[i].rating + "<br>"
          }
          let finalRating = algorithm(results, radius);
          console.log("final rating: " + finalRating);


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

function algorithm(resultsArray, radius) {
    var qualityParks = 0;
    //console.log("nums: " + resultsArray.length);
    var rating = (resultsArray.length/(Math.pow((radius), 2) * 3.14)) * 5;
    console.log("num :" + rating);
    for (let i = 0; i < resultsArray.length; ++i) {
        if (resultsArray[i].rating >= 4.5 && resultsArray[i].rating != null) {
            qualityParks = qualityParks + 1;
            //console.log(qualityParks);
        }
        if (resultsArray[i].rating < 3.0 && resultsArray[i].rating != null) {
            qualityParks = qualityParks + 1;
        }
    }
    rating = rating + (3 * qualityParks / resultsArray.length);
    if (rating < 0) {
        rating = 0;
    }
    if (rating > 10) {
        rating = 10;
    }
    //console.log(qualityParks / resultsArray.length);
    return rating;
}