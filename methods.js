Meteor.methods({
  insertPost: function(postDocument) {
    if(this.isSimulation) {
      Session.set('saveButton', 'Saving...');
    } else {
      var user = Meteor.user();

      // ensure the user is logged in
      if (!user)
        throw new Meteor.Error(401, "You need to login to write a post");
    }
  }
})
