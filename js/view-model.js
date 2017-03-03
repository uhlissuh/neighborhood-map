var LocationsListModel = function() {
  var self = this;

  self.landmarks = [
    {name: "Humboldt Crabs",
    nickname: "Humboldt Crabs",
    location: {lat: 40.8679, lng: -124.0847}},
    {name: "Bayside, California",
    nickname: "Bayside",
    location: {lat: 40.8422, lng: -124.0636}},
    {name: "Arcata Wastewater Treatment Plant and Wildlife Sanctuary",
    nickname: "Arcata Wildlife Sanctuary",
    location: {lat: 40.8581, lng: -124.0905}},
    {name: "Humboldt State University",
    nickname: "Humboldt State University",
    location: {lat: 40.8753, lng: -124.0778}},
    {name: "Arcata Community Forest",
    nickname: "Arcata Community Forest",
    location: {lat: 40.8748, lng: -124.0504}},
    {name: "Holly Yashi",
    nickname: "Holly Yashi Jewelry",
    location: {lat: 40.8706, lng: -124.0919}},
    {name: "Minor Theater",
    nickname: "Minor Theater",
    location: {lat: 40.8701, lng: -124.0866}},
    {name: "Arcata High School",
    nickname: "Arcata High School",
    location: {lat: 40.8762, lng: -124.0888}}
  ];


  self.filterString = ko.observable("");

  self.filteredLandmarks = ko.computed(function(item) {
    return self.landmarks.filter(function(item) {
      return item.nickname.toLowerCase().includes(self.filterString().toLowerCase());
    });
  });

  self.filteredLandmarks.subscribe(function(filteredList) {
    deleteMarkers();
    for (i = 0; i < filteredList.length; i++) {
      addMarker(filteredList[i].location, filteredList[i].name);
    }
    setMapOnAll(map);
  });

  self.openInfoWindow = function(data) {
    var marker;
    for (i = 0; i <markerList.length; i++) {
      if (markerList[i].getPosition().lat() === data.location.lat) {
        marker = markerList[i];
      }
    }
    
    var infowindow = new google.maps.InfoWindow({
    });

    infowindow.open(map, marker);
    name = data.name;
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
}
