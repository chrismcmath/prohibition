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
         return list;
    }
});

Template.submit.events({
    "submit": function(event, template){
        // prevent default form submission handler : which is
        // performing an HTTP POST request that will reload the page
        event.preventDefault();
        // construct the contact object that will be passed to the method
        var boughtID = template.$('#bought-select').val();
        var prohibitID = template.$('#prohibit-select').val();
        CommitPurchase(boughtID, prohibitID, Nodes.findOne(FlowRouter.getParam("nodeId")), GetUserTeam());
    }
});
