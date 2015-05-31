FlowRouter.route('/blog/:postId', {
    subscriptions: function(params) {
        console.log("sub and reg this sub as 'myPost'");
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));
    },
    action: function(params) {
        console.log("Yeah! We are on the post:", params.postId);
    }
});

FlowRouter.route('/', {
    action: function() {
        if (! Meteor.userId()) {
            FlowLayout.render("registration")
        } else {
            FlowLayout.render("teams")
        }
    }
});

FlowRouter.route('/teams/edit/:teamId', {
    action: function() {
        FlowLayout.render("edit_team")
    }
});

FlowRouter.route('/teams', {
    action: function() {
        FlowLayout.render("teams")
    }
});

FlowRouter.route('/nodes', {
    action: function() {
        FlowLayout.render("nodes")
    }
});
