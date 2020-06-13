Meteor.methods({
    'newAlert' (postText) {
        username = Meteor.users.findOne(Meteor.userId()).emails[0].address
        if (username)
            Alerts.insert({
                userName: username,
                postText: postText,
                timestamp: new Date()
            })
    },
  });