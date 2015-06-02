//Currently supporting 12 players
var TEAM_COLOURS = [
    "#fea3aa",
    "#f8b88b",
    "#faf884",
    "#baed91",
    "#b2cefe",
    "#f2a2e8",
    "#0ea30a",
    "#08b80b",
    "#0af804",
    "#0aed01",
    "#02ce0e",
    "#02a208"
];

Meteor.startup(function () {

    Teams.remove({});

    if (Teams.find().count() === 0) {
        _.each(fake_teams, function (team) {
            Teams.insert({
                name: team.name,
                colour: TEAM_COLOURS[Teams.find({}).count()],
                staticPoints: 0,
                capturedNodes: team.captured_nodes,
                blockedNodes: team.blocked_nodes,
                prohibitions: team.prohibitions
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
