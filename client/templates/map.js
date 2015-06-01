var SCALAR = 100;
var NAME_OFFSET = {x: 0, y: 0.08};
var NEUTRAL_COLOUR = '#777';
//NOTE: use glow when teams get it, ps.glow({color: '#f00',width: 40});

Template.map.rendered = function() {
    console.log('map rendered');
    var paper = Raphael('paper', GetScaled(1), GetScaled(1));
    paper.setViewBox(0, 0, GetScaled(1), GetScaled(1));
    paper.canvas.setAttribute('preserveAspectRatio', 'none');
    paper.setSize('100%', '100%');

    var nodes = Nodes.find({});
    // Draw connections
    nodes.forEach(function (node) {
        //Draw lines
        if (node.connectedNodes.length > 0) {
            node.connectedNodes.forEach(function (cnKey) {
                var cn = Nodes.findOne({key: cnKey}); 
                var line = paper.path([
                    "M", GetScaled(node.x), GetScaled(node.y),
                    "L", GetScaled(cn.x), GetScaled(cn.y)
                ]);
                line.attr({stroke: NEUTRAL_COLOUR, "stroke-width": GetScaled(0.001)});
            });
        }
    });
    // Draw nodes
    nodes.forEach(function (node) {
        var colour = GetNodeColour(node);
        console.log('using color: ' + colour);
        var circle = paper.circle(GetScaled(node.x), GetScaled(node.y), GetScaled(0.01));
        circle.attr("fill", colour);
        circle.attr("stroke-width", 0);
        circle.attr("stroke", 'transparent');

        function TweenOut() {
            circle.animate({r:GetScaled(0.045)}, 1000, "<>", TweenIn);
        }

        function TweenIn() {
            circle.animate({r:GetScaled(0.04)}, 1000, "<>", TweenOut);
        }

        TweenOut();

        //text
        paper.text(
            GetScaled(node.x) + GetNameOffsetX(),
            GetScaled(node.y) + GetNameOffsetY(), node.name)
            .attr({"font-size": 4, fill: colour});
    });

};

function GetNodeColour(node) {
    console.log('start');
    var teams = Teams.find({});
    var owningTeam = Teams.find({'capturedNodes.$' : node.key});
    var owningTeam = Teams.find({capturedNodes: {$elemMatch: {Key: node.key}}});

    debugger;
    /*
    return teams.map(function (team) {


        //TODO: Change this to use _id
        if (team.capturedNodes.length > 0 &&
            $.inArray(node.key, team.capturedNodes) > -1) {
                console.log('return team color: ' + team.colour);
                return team.colour;
        }
    });
    */
    console.log('return neutral');
    return NEUTRAL_COLOUR;
    console.log('end');
}

function GetScaled(value) {
    return value * SCALAR;
}

function GetNameOffsetX() {
    return NAME_OFFSET.x * SCALAR;
}

function GetNameOffsetY() {
    return NAME_OFFSET.y * SCALAR;
}
