Template.alertModal.events({
  'click #sendAlert'(event, instance) {
    let postText = document.getElementById("post").value
    Meteor.call('newAlert', postText, (err, result) => {
        if (err)
            console.log(err, result)
    });
    $('#alertModal').modal('hide')
  },
});