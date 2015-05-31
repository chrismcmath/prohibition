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
  console.log('got ' + all_nodes);
});
