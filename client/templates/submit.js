Template.submit.helpers({
    node: function() {
        return Nodes.findOne(FlowRouter.getParam("nodeId"));
    },
    node_items: function() {
         var i = 0;
         var list = [];
         Nodes.findOne(FlowRouter.getParam("nodeId")).items.forEach(function(item) {
         list.push({name: item.name, i: i++});
         });
    }
});

Template.submit.events({
});
