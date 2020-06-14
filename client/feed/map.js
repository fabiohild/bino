Template.mapView.onRendered(function () {
    
    initMap(Meteor.user().profile.lastLoc.coordinates)
});

function initMap(userCoords) {
    // The location of Uluru
    var uluru = {
        lat: userCoords[1],
        lng: userCoords[0]
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 10,
            center: uluru
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}