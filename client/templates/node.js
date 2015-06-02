Template.node.helpers({
});

Template.node.events({
    "click .node": function() {
        FlowRouter.go('/submit/' + this._id);
    }
});
