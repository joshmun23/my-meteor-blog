Template.editPost.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var form = e.target,
        user = Meteor.user();
    var slug = _.slugify(form.title.value);

    Posts.insert({
      title: form.title.value,
      slug: slug,
      description: form.description.value,
      text: form.text.value,
      timeCreated: moment().unix(),
      author: user.profile.name,
      owner: user._id
    }, function(error) {
      if (error) {
        // display error to the user
        alert(error.reason);
      } else {
        // redirect to the post
        Router.go('Post', {slug: slug});
      }
    })
  }
})
