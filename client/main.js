Template.body.helpers({
    isMap: function () {
        return Session.get("loc") == "map";
    },
    isNodes: function () {
        return Session.get("loc") == "nodes";
    },
    isTeams: function () {
        return Session.get("loc") == "teams";
    },
    title: function () {
        return 'Prohibition';
    }
});

Template.body.events({
    'click': function (event) {
        console.log('x. x. x. x. x. x. x. x. x. x. target: ' + event.currentTarget);
    },
    'click .nav-choice': function (event) {
        destination = event.currentTarget.id;
        console.log("dest: " + destination);
        Session.set("loc", destination);
        console.log(' go to ' + FlowRouter.path('/' + destination) + " target " + event.currentTarget);
        FlowRouter.go(
            FlowRouter.path('/' + destination));
    },
    'click .nav-choice h4': function (event) {
        destination = event.currentTarget.id;
        console.log("dest: " + destination);
        Session.set("loc", destination);
        console.log(' go to ' + FlowRouter.path('/' + destination) + " target " + event.currentTarget);
        FlowRouter.go(
            FlowRouter.path('/' + destination));
    }
})
