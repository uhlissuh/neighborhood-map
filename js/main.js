
function initPage() {
  initMap();

  var locationsListModel = new LocationsListModel()

  ko.applyBindings(locationsListModel);

// put all markers on map initially
  for (i = 0; i < locationsListModel.landmarks.length; i++) {
    addMarker(locationsListModel.landmarks[i].location, locationsListModel.landmarks[i].name);
  }
  setMapOnAll(map);
}
