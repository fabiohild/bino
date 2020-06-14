Router.route('/', function () {
    this.render('landingPage');
});

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/feed', function () {
    this.render('feed');
});

Router.route('/mapView', function () {
    this.render('mapView');
});

Accounts.onLogin(function(info) {
    if (Meteor.isClient)
        Router.go('feed')
});