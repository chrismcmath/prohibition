Meteor.startup(function () {

  //Teams.remove({});

  if (Teams.find().count() === 0) {
    var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                 "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
    _.each(names, function (name) {
      Teams.insert({
        name: name,
        colour: '#0ff',
        staticPoints: Math.floor(Random.fraction() * 10) * 5,
        capturedNodes: [],
        blockedNodes: [],
        score: Math.floor(Random.fraction() * 10) * 5
      });
    });
  }

  Nodes.remove({});

  if (Nodes.find().count() === 0) {
      _.each(all_nodes, function (node) {
          Nodes.insert({
              key: node.key,
              name: node.name,
              x: node.location.x,
              y: node.location.y,
              connectedNodes: node.connected_nodes,
              items: node.items
          });
      });
  }
});
