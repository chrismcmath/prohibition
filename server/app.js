//Currently supporting 12 players
TEAM_COLOURS = [
    "#fea3aa",
    "#f8b88b",
    "#faf884",
    "#baed91",
    "#b2cefe",
    "#f2a2e8",
    "#f0a0a0",
    "#f0b080",
    "#f0f080",
    "#b0e090",
    "#b0c0f0",
    "#f0a0e0"
];

Meteor.startup(function () {

    //Teams.remove({});

    if (Teams.find().count() === 0) {
        _.each(fake_teams, function (team) {
            Teams.insert({
                name: team.name,
                colour: TEAM_COLOURS[Teams.find({}).count()],
                points: 0,
                capturedNodes: team.captured_nodes,
                blockedNodes: team.blocked_nodes,
                prohibitions: team.prohibitions,
                visited_bars: []
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
