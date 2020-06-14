Template.layout.onRendered(function () {
  Session.set('currentTime', new Date());
  setInterval(function () {
    Session.set('currentTime', new Date());
  }, 1000); // Replace 1000 with your level of time detail
});

