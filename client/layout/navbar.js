Template.navbar.helpers({
    myBalance() {
        if (Meteor.user())
            return Meteor.user().profile.points.toFixed(2)
    },
  });