import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // cleanup

  // Meteor.users.remove({})
  // Alerts.remove({})

  Meteor.users.update({
    "profile.points": {
      $exists: false
    }
  }, {
    $set: {
      "profile.points": 10
    }
  }, {
    multi: true
  })
});


Accounts.onCreateUser(function (options, user) {
  console.log(user)
  profile = {
    points: 10
  }
  user.profile = profile
  return user;
});