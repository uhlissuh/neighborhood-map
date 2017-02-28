var LocationsListModel = function() {
  var self = this;

  self.landmarks = [
    {name: "Arcata Ball Park",
    location: {lat: 40.8679, lng: -124.0847}},
    {name: "Northcoast Co-op",
    location: {lat: 40.8690, lng: -124.0888}},
    {name: "Arcata Marsh",
    location: {lat: 40.8581, lng: -124.0905}},
    {name: "Humboldt State University",
    location: {lat: 40.8753, lng: -124.0778}},
    {name: "Arcata Community Forest",
    location: {lat: 40.8748, lng: -124.0504}},
    {name: "Jacoby Storehouse",
    location: {lat: 40.8682, lng: -124.0870}},
    {name: "Minor Theater",
    location: {lat: 40.8701, lng: -124.0866}}
  ];


  self.filterString = ko.observable("");

  self.filteredLandmarks = ko.computed(function(item) {
    return self.landmarks.filter(function(item) {
      return item.name.toLowerCase().includes(self.filterString().toLowerCase());
    });
  });

  self.filteredLandmarks.subscribe(function(filteredList) {
    deleteMarkers();
    for (i = 0; i < filteredList.length; i++) {
      addMarker(filteredList[i].location);
    }
    setMapOnAll(map);
  });
}
