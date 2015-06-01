Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                 "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
    _.each(names, function (name) {
      Teams.insert({
        name: name,
        colour: '#fff',
        staticPoints: Math.floor(Random.fraction() * 10) * 5,
        capturedNodes: [],
        blockedNodes: [],
        score: Math.floor(Random.fraction() * 10) * 5
      });
    });
  }

  //NOTE: Rebuild on each restart
  //Nodes.remove({});
  //
  //
  if (Nodes.find().count() === 0) {
      _.each(all_nodes, function (node) {
          Nodes.insert({
              name: node.name,
              x: node.location.x,
              y: node.location.y
          });
      });
  }
});
