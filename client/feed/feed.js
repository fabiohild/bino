

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

Template.feed.helpers({
  alerts() {
    return Alerts.find({}, {sort: {timestamp: -1}}).fetch()
  },
});



