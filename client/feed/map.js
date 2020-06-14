Template.mapView.onRendered(function () {
    let alertCoords = []
    Alerts.find().fetch().forEach(alert => {
        alertCoords.push(alert.location.coordinates)
    });
    initMap(Meteor.user().profile.lastLoc.coordinates, alertCoords)
});

function initMap(userCoords, alertCoords) {
    // The location of Uluru
    var user = {
        lat: userCoords[1],
        lng: userCoords[0]
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 10,
            center: user
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: user,
        map: map
    });

    alertCoords.forEach(alert => {
        console.log(alert)
        new google.maps.Marker({
            position: {
                lat: alert[1],
                lng: alert[0]
            },
            map: map
        });
    });
}