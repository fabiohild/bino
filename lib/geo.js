if (Meteor.isClient) {

    myVar = setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                console.log(location)
            })
        }
    }, 2000);


}