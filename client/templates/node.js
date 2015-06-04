Template.node.helpers({
    /* Guess need to pass in id from flowrouter then findOne
    nodes: function() {
        return
    }
    */
    prohibition_string: function() {
        var p = 0;
        var thisNode = this;
        Teams.find({}).forEach( function(team) {
            team.prohibitions.forEach( function(prohibition) {
                if (prohibition.node == GetNodeID(thisNode)) {
                    p++;
                }
            });
        });
        if (p == 0) {
            return "no prohibitions";
        } else if (p == 1) {
            return "one prohibition from";
        } else {
            return p + " prohibitions from";
        }
    },
    prohibiters: function() {
        var p = [];
        var thisNode = this;
        Teams.find({}).forEach( function(team) {
            team.prohibitions.forEach(function(prohibition) {
                if (prohibition.node == GetNodeID(thisNode)) {
                    p.push({name: team.name, colour: team.colour});
                }
            });
        });
        return p;
    }
});

Template.node.events({
    "click .node": function() {
        //console.log("name: " + this.name);
        FlowRouter.go('/submit/' + this._id);
    }
});
