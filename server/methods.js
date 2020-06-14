import {
    getAddress
} from "./geoCoder"

Meteor.methods({
    'newAlert'(coords, postText) {
        insertAlert(coords, postText)
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

const insertAlert = async function (coords, postText) {
    const geolocation = await getAddress(coords[0], coords[1])



    username = Meteor.users.findOne(Meteor.userId()).username
    if (username)
        Alerts.insert({
            userName: username,
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