Template.node.helpers({
});

Template.node.events({
    "click .node": function() {
        console.log('yoowho');
        FlowRouter.go('/submit/' + this._id);
    }
});
