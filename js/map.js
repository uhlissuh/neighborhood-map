var map;
var markerList = [];
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8665, lng: -124.0828},
    zoom: 13
  });

  infowindow = new google.maps.InfoWindow({
  });
}



// creates a marker and adds to list
function addMarker(location, name) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markerList.push(marker);

  // var infowindow = new google.maps.InfoWindow({
  // });

  marker.addListener('click', function() {
    openInfoWindow(name, marker);
  })
}

//opens infowindow and calls wikipedia API
function openInfoWindow(name, marker) {
  if (infowindow) {
    infowindow.setContent("")
    infowindow.close();
  }

  toggleBounce(marker);


  infowindow.open(map, marker);
  var landmarkTitle = encodeURIComponent(name);
  var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&titles=" + landmarkTitle;
  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(data) {
      var pages = data.query.pages;
      for (var key in pages) {
          var extract = pages[key].extract
          var title = pages[key].title
      }
      var formattedExtract = "<div id=infoWindow><h4>" + title + "</h4><p><em>from Wikipedia</em></p>" + extract + "</div>"
      infowindow.setContent(formattedExtract)
    }
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

function toggleBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){marker.setAnimation(null); }, 750);
}
