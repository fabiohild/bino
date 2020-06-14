import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  // cleanup
  // Meteor.users.remove({})
  // Alerts.remove({})

  // timeout para fechamento das votações
  setInterval(function () {

    closeVotings()

  }, 3000);

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

const closeVotings = async function () {
  console.log("pending votes");

  pendingAlerts = Alerts.find({
    "timestamp": {
      $lt: new Date(Date.now() - 31 * 60 * 1000)
    },
    "voting.alertPrize": {
      $gt: 0
    }
  }).fetch()

  pendingAlerts.forEach(alert => {

    let totalPrize = alert.voting.alertPrize + alert.voting.votersBalance
    // removing balance from alert
    Alerts.update(alert._id, {
      $set: {
        "voting.alertPrize": 0,
        "voting.votersBalance": 0,
      }
    })

    // won?
    if (alert.voting.like.length > alert.voting.dislike.length) { // valid
      sendRewards(totalPrize / 2, [alert.userId])
      sendRewards(totalPrize / 2, [alert.voting.like])
    } else { // lost
      sendRewards(totalPrize, [alert.voting.dislike])
    }
  });

}

const sendRewards = function (prize, arrayReceivers) {
  arrayReceivers.forEach(receiver => {
    if (receiver.constructor === Array)
      receiver = receiver[0]
    console.log(receiver)
    Meteor.users.update(receiver, {
      $inc: {
        "profile.points": prize / arrayReceivers.length
      }
    })
  });
}