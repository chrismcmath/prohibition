Template.body.helpers({
    isMap: function () {
        return Session.get("loc") == "map";
    },
    isNodes: function () {
        return Session.get("loc") == "nodes";
    },
    isTeams: function () {
        return Session.get("loc") == "teams";
    }
});

Template.body.events({
    'click li': function (event) {
        destination = event.target.id;
        Session.set("loc", destination);
        FlowRouter.go(
            FlowRouter.path('/' + destination));
    }
})
