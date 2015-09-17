if(Meteor.isClient) {
    Session.setDefault('lazyloadLimit', 2);
}


Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',

    // #Routes -> Changing the website title
    onAfterAction: function() {
        var data = Posts.findOne({slug: this.params.slug});

        if(_.isObject(data) && !_.isArray(data))
            document.title = 'My Meteor Blog - '+ data.title;
        else
            document.title = 'My Meteor Blog - '+ this.route.getName();
    }
});

PostController = RouteController.extend({
    waitOn: function() {
        return Meteor.subscribe('single-post', this.params.slug);
    },
    data: function() {
        return Posts.findOne({slug: this.params.slug});
    }
})

Router.map(function() {
    // #Routes -> Setup the router
    this.route('Home', {
        path: '/',
        template: 'home',

        // #Routes -> Moving the posts subscription to the "Home" route
        subscriptions: function(){
            return Meteor.subscribe("lazyload-posts", Session.get('lazyloadLimit'));
        }
    });


    // #Routes -> Adding another routne
    this.route('About', {
        path: '/about',
        template: 'about'
    });

    // Refactor post routes after setting controller above
    // this.route('Post', {
    //     path: '/posts/:slug',
    //     template: 'post',

    //     waitOn: function() {
    //         return Meteor.subscribe('single-post', this.params.slug);
    //     },

    //     data: function() {
    //         return Posts.findOne({slug: this.params.slug});
    //     }
    // });
    this.route('Post', {
        path: '/posts/:slug',
        template: 'post',
        controller: 'PostController'
    });

    this.route('Create Post', {
        path: '/create-post',
        template: 'editPost'
    });

    this.route('Edit Post', {
        path: '/edit-post/:slug',
        template: 'editPost',
        controller: 'PostController'
    });

    this.route('View Posts', {
        path: '/posts',
        template: 'posts',
        controller: 'PostController'
    });
});

// set up function to not allow visitors to see user only pages
var requiresLogin = function() {
    if (!Meteor.user() || !Meteor.user().roles ||
        !Meteor.user().roles.admin) {
        this.render('notFound')
    } else {
        this.next();
    };
};

Router.onBeforeAction(requiresLogin, {only: ['Create Post', 'Edit Post']});
