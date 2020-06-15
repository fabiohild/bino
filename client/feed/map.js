Template.mapView.onRendered(function () {
    
    initMap(Meteor.user().profile.lastLoc.coordinates, Alerts.find().fetch())
});

function getEmoji(category) {
    console.log(category)
    if (category == "transito")
    return "🚛"
  else if (category == "suspeitas")
    return "🕵️"
  else if (category == "servicos")
    return "🔧 "
  else if (category == "acidentes")
    return "🚨"
  else if (category == "seguranca")
    return "🤚"
  else if (category == "condicoes")
    return "🌧️"
  return "😃"
}

function initMap(userCoords, alerts) {
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
        map: map,
        title: "Sua posição",
    });

    alerts.forEach(alert => {
        new google.maps.Marker({
            position: {
                lat: alert.location.coordinates[1],
                lng: alert.location.coordinates[0]
            },
            map: map,
            label: getEmoji(alert.category),
            title: alert.postText
        });
    });
}