var map;
var markerList = [];

function initMap() {
  console.log("init mappppp");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8665, lng: -124.0828},
    zoom: 14
  });
}



// creates a marker and adds to list
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markerList.push(marker);

  var infowindow = new google.maps.InfoWindow({
    content: "HIIIII"
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markerList.length; i++) {
    markerList[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markerList = [];
}
