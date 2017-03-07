var ListModel = function(landmarks, mapModel) {
  var self = this;
  self.landmarks = landmarks;

  self.filterString = ko.observable("");

  self.filteredLandmarks = ko.computed(function(item) {
    return self.landmarks.filter(function(item) {
      return item.nickname.toLowerCase().includes(self.filterString().toLowerCase());
    });
  });

  self.filteredLandmarks.subscribe(function(filteredList) {
    mapModel.deleteMarkers();
    mapModel.addMarkers(filteredList);
  });

  self.openInfoWindow = function(data) {
    var name = data.name;
    var marker = mapModel.getMarkerForLocation(data.location);
    mapModel.openInfoWindow(name, marker);
  }
}
