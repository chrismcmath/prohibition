Template.node.helpers({
    /* Guess need to pass in id from flowrouter then findOne
    nodes: function() {
        return
    }
    */
});

Template.node.events({
    "click .node": function() {
        //console.log("name: " + this.name);
        FlowRouter.go('/submit/' + this._id);
    }
});
