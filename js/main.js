var map;
function initMap() {
  console.log("init mappppp");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8665, lng: -124.0828},
    zoom: 14
  });
  for (key in sights) {
    var marker = new google.maps.Marker({
      position: sights[key],
      map: map
    });
  }

}
