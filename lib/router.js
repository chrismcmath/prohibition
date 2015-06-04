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
            FlowRouter.go(FlowRouter.path('/map' ));
        }
    }
});

FlowRouter.route('/logout', {
    action: function() {
        Meteor.logout(); 
        FlowRouter.go(FlowRouter.path('/' ));
    }
});

FlowRouter.route('/teams/edit/:teamId', {
    action: function(params, queryParams) {
        params.location = "here i am";
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        FlowLayout.render("edit_team")
    }
});

FlowRouter.route('/map', {
    action: function() {
        FlowLayout.render("map")
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

FlowRouter.route('/submit/:nodeId', {
    subscriptions: function(params, queryParams) {
        this.register('node', Meteor.subscribe('Nodes', params.nodeId));
    },
    action: function() {
        FlowLayout.render("submit")
    }
});
