Template.team.helpers({
  self: function () {
    return this.name == GetUserName();
  },
  prohibitions: function () {
    var team = this;
    var prohibitionArray = [];
    for (i = 0; i < team.prohibitions.length; i++) {
        var nodeKey = team.prohibitions[i].node;
        var node = Nodes.findOne({key: nodeKey});
        prohibitionArray.push({name: node.name});
    }
    return prohibitionArray;
  },
  hasProhibition: function () {
    return this.prohibitions.length > 0;
  }
});

Template.team.events({
    "click .team": function() {
        console.log('clicked');
    }
});
