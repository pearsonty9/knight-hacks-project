//AIzaSyCj7xxZkXQUQ3j3Ha8EfQKqsKuXJgA21g4

let map;

function initMap() {
    // Configure the click listener.

    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const origin1 = { lat: 29.6516, lng: -82.3248 };

    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    
    const destinationA = { lat: 35.7796, lng: -78.6382 };
    const destinationB = { lat: 33.4484, lng: -112.0740 };
    const destinationIcon =
        "https://chart.googleapis.com/chart?" +
        "chst=d_map_pin_letter&chld=D|FF0000|000000";
    const originIcon =
        "https://chart.googleapis.com/chart?" +
        "chst=d_map_pin_letter&chld=O|FFFF00|000000";
    var myLatlng = { lat: 37.6872, lng: -97.3301 };
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.6872, lng: -97.3301 },
        zoom: 5,
    });
    let address;
    var outputDiv = document.getElementById("output");
    service2 = new google.maps.places.PlacesService(map);
    // Configure the click listener.
    google.maps.event.addListener(map, 'click', function (mapsMouseEvent) {
        var lng = mapsMouseEvent.latLng.lng();
        var lat = mapsMouseEvent.latLng.lat();
        console.log(mapsMouseEvent.latLng.lat());
        console.log(mapsMouseEvent.latLng.lng());

        origin2 = { lat: lat, lng: lng };
        var origin2 = myLatlng;
        var request = {
            location: origin2,
            radius: '200',
            type: ['park']
        };

        service2.nearbySearch(request, callback);
        //geocoder.geocode({address: origin2},  showGeocodedAddressOnMap(false));
        geocoder.geocode({ location: origin2 }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                //map.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                  });
                address = results[0].formatted_address;
                outputDiv.innerHTML = address;
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
    });
}



function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log(i);
        }
    }
}