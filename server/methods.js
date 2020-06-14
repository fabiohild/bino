import {
    getAddress
} from "./geoCoder"

Meteor.methods({
    'newAlert'(coords, postText, category) {
        insertAlert(coords, postText, category)
    },
    'vote'(alertId, isLike) {
        // removing one point from user
        let user = Meteor.users.findOne(Meteor.userId())
        if (user.profile.points < 1) {
            console.error("no balance to vote")
            return;
        }
        Meteor.users.update(Meteor.userId(), {
            $inc: {
                "profile.points": -1
            }
        })

        // voting
        if (isLike)
            Alerts.update(alertId, {
                $addToSet: {
                    "voting.voters": Meteor.userId(),
                    "voting.like": Meteor.userId()
                },
                $inc: {
                    "voting.votersBalance": 1
                }
            })
        else
            Alerts.update(alertId, {
                $addToSet: {
                    "voting.voters": Meteor.userId(),
                    "voting.dislike": Meteor.userId()
                },
                $inc: {
                    "voting.votersBalance": 1
                }
            })
    },
    'cleanup'() {
        Alerts.remove({})
    },
    'setLocation'(longitude, latitude, precision) {
        // console.log(Meteor.userId(), longitude, latitude, precision)
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.lastLoc": {
                    "type": "Point",
                    "coordinates": [
                        longitude,
                        latitude
                    ],
                    "precision": precision
                }
            }
        })
    },
});

const insertAlert = async function (coords, postText, category) {
    const geolocation = await getAddress(coords[0], coords[1])



    username = Meteor.users.findOne(Meteor.userId()).username
    if (username)
        Alerts.insert({
            userName: username,
            userId: Meteor.userId(),
            category: category,
            voting: {
                alertPrize: 100,
                voters: [],
                like: [],
                dislike: [],
                votersBalance: 0
            },
            postText: postText,
            timestamp: new Date(),
            geolocation: geolocation,
            "location": {
                "type": "Point",
                "coordinates": [
                    coords[1],
                    coords[0]
                ],
                "precision": coords[2]
            }
        })
}