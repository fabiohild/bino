Template.alertModal.events({
  'click #sendAlert'(event, instance) {
    let postText = document.getElementById("post").value

    let category = $("input[name=categoria]:checked").attr('id')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
            // console.log(location.coords)
            let coords = location.coords
            
            Meteor.call('newAlert', [coords.latitude, coords.longitude, coords.accuracy], postText, category, (err, result) => {
                if (err)
                    console.log(err, result)
            });
            $('#alertModal').modal('hide')
        })
    } else {
        alert("Habilite a geolocalização no seu browser para postar alertas.")
    }

  },
});