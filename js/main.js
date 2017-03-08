function initPage() {
  var landmarks = [
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

  var mapModel = new MapModel();
  var listModel = new ListModel(landmarks, mapModel);

  mapModel.initMap();

  ko.applyBindings(listModel);

  // put all markers on map initially
  mapModel.addMarkers(listModel.landmarks);
}

googleError = function() {
  alert("There was an error loading Google Maps!")
};
