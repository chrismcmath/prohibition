var width = 1;
var height = 1;

Template.map.rendered = function() {
    console.log('map rendered');
    var paper = Raphael('paper', width, height);
    paper.setViewBox(0, 0, width, height);
    paper.canvas.setAttribute('preserveAspectRatio', 'none');
    paper.setSize('100%', '100%');

    // Draw nodes
    var nodes = Nodes.find({});
    nodes.forEach(function (node) {
        console.log('draw');
        //console.log('drawing node at ' + node.location.x ', ' + node.location.y);
        var circle = paper.circle(node.x, node.y, 0.06);
        circle.attr("fill", GetNodeColour(node));
        circle.attr("stroke-width", 0);
        circle.attr("stroke", 'transparent');
    });

    //Draw lines
};

function GetNodeColour(node) {
    var teams = Teams.find({});
    teams.forEach(function (team) {
        if (team.capturedNodes.length > 0 &&
            team.capturedNodes.contains(node._id)) {
                return team.colour;
        }
    });
    return '#eee';
}
