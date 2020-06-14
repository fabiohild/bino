if (Meteor.isClient) {

    setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                // console.log(location.coords)
                let coords = location.coords

                Meteor.call('setLocation', coords.longitude, coords.latitude, coords.accuracy, (err, result) => {
                    // console.log(err, result) // in case you try it twice, it will throw an exception that email already exists
                });
            })
        }
    }, 10000);

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    Accounts.onLogin(function() {
        Router.go('/feed')
    })

    Accounts.onLogout(function() {
        Router.go('/')
    })

}