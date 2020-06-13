Router.route('/', function () {
    this.render('landingPage');
});

Router.configure({
    layoutTemplate: 'layout'
});

var isSignedIn = function () {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/');
    } else {
        this.next();
    }
};

Router.onBeforeAction(isSignedIn, {
    except: ['/']
});