Template.home.created = function() {
	console.log('Created the home template');
};
Template.home.rendered = function() {
	console.log('Rendered the home template');
};
Template.home.destroyed = function() {
	console.log('Destroyed the home template');
};


// Template helpers
Template.home.helpers({
    // #Storing Data -> Querying a collection
    'postsList': function(){
        return Posts.find({}, {sort: {timeCreated: -1}});
    },
    sessionExample: function() {
        return Session.get('mySessionExample')
    }
});

// #Controlling the data flow -> Lazy load posts or how to change subscriptions
Template.home.events({
    'click button.lazyload': function(e, template){
        var currentLimit = Session.get('lazyloadLimit');

        Session.set('lazyloadLimit', currentLimit + 2);
    }
});
