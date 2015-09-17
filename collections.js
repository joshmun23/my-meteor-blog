Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // allow posts to be edited (this is needed after removing the insecure package)
  Posts.allow({
    insert: function(userId, doc) {
      // the user must be logged in, and the document must be owned by the user
      return userId && doc.owner === userId && Meteor.user().roles.admin;
    },
    update: function(userId, doc, fields, modifier) {
      // user must be an admin
      return Meteor.user().roles.admin;
    },
    remove: function(userId, doc) {
      return userId && doc.owner === userId && Meteor.user().roles.admin;
    },
    // make sure we only get this field from the documents to prevent unnecessarily
    // large documents from being passed to rule's functions
    fetch: ['owner']
  });

  Posts.deny({
    update: function (userId, docs, fields, modifier) {
      // can't change owners, timeCreated and slug
      return _.contains(fields, 'owner') || _.contains(fields, 'timeCreated') ||
             _.contains(fields, 'slug');
    }
  })
}
