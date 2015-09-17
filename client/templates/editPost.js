Session.setDefault('saveButton', 'Save Post');
Template.editPost.helpers({
  saveButtonText: function() {
    return Session.get('saveButton');
  }
})

Template.editPost.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var form = e.target,
        user = Meteor.user(),
        _this = this; // we need this to reference the slug in the callback
    var slug = _.slugify(form.title.value);

    // edit the post
    if (this._id) {
      Posts.update(this._id, {$set: {
        title: form.title.value,
        description: form.description.value,
        text: form.text.value
      }}, function(error) {
        if(error) {
          alert(error.reason);
        } else {
          Router.go('Post', {slug: _this.slug});
        }
      });
    } else {
      Posts.insert({
        title: form.title.value,
        slug: slug,
        description: form.description.value,
        text: form.text.value,
        timeCreated: moment().unix(),
        author: user.profile.name,
        owner: user._id
      }, function(error) {
        if(error) {
          // display error to the user
          alert(error.reason);
        } else {
          // redirect to the post
          Router.go('Post', {slug: slug});
        }
      });
    }
  }
})
