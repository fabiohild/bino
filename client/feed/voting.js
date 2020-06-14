Template.voting.helpers({
    getMoment() {
        moment.locale('pt-br');
        return moment(this.timestamp).add(30, 'minutes').from(Session.get("currentTime"), true)
    },
    isOpen() {
        if (moment(this.timestamp).add(30, 'minutes') > moment(new Date()))  return true
    },
    positiveVotes() {
        return this.voting.like.length
    },
    negativeVotes() {
        return this.voting.dislike.length
    },
    hasVoted() {
        return this.voting.voters.includes(Meteor.userId())
    },
    disableVoting() {
        if (this.voting.voters.includes(Meteor.userId()))
            return "disabled"
        else return ""
    }
  });

  Template.voting.events({
    'click #like'(event, instance) {
        Meteor.call('vote', this._id, true)
    },
    'click #dislike'(event, instance) {
        Meteor.call('vote', this._id, false)
    },
  });