var MapModel = function() {
  var map;
  var self = this;
  var infoWindow;
  var markerList = [];

  self.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.8665, lng: -124.0828},
      zoom: 13
    });
    infowindow = new google.maps.InfoWindow({
    });
  };

  self.addMarkers = function(landmarks) {
    for (var i = 0; i < landmarks.length; i++) {
      self.addMarker(landmarks[i].location, landmarks[i].name);
    }
  };

  self.deleteMarkers = function() {
    for (var i = 0; i < markerList.length; i++) {
      markerList[i].setMap(null);
    }
    markerList = [];
  };

  // creates a marker,adds to list, adds listener
  self.addMarker = function(location, name) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    markerList.push(marker);

    marker.addListener('click', function() {
      self.openInfoWindow(name, marker);
    });
  };

  self.openInfoWindow = function(name, marker) {
    if (infowindow) {
      infowindow.setContent("");
      infowindow.close();
    }
    self.toggleBounce(marker);
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
        infowindow.setContent(formattedExtract);
      }
    });
  };

  self.getMarkerForLocation = function(location) {
    for (var i = 0; i < markerList.length; i++) {
      if (markerList[i].getPosition().lat() === location.lat) {
        return markerList[i];
      }
    }
  }

  self.toggleBounce = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){marker.setAnimation(null); }, 750);
  };
};
