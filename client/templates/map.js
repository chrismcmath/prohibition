var SCALAR = 100;
var NAME_OFFSET = {x: 0, y: 0.08};
var NEUTRAL_COLOUR = '#000';
var MULTI_LINE_NAME_OFFSET = {x: 0, y: 0.1};
//NOTE: use glow when teams get it, ps.glow({color: '#f00',width: 40});


Meteor.autosubscribe(function() {
    console.log('autosubscribe');
  Teams.find().observe({
    added: function(team){ 
        console.log('team added');
        DrawMap();
    },
    updated: function(team){ 
        console.log('team updated');
        DrawMap();
    }
  });
  Nodes.find().observe({
    added: function(team){ 
        console.log('team added');
        DrawMap();
    }
  });
});

Template.map.rendered = function() {
    console.log('rendered');
    DrawMap();
}

function DrawMap() {
    console.log('draw map');
    return;
    if (typeof paper != 'undefined') {
        paper.remove();
    }

        console.log('new map');
        paper = Raphael('raphael-paper', GetScaled(1), GetScaled(1));
        paper.setViewBox(0, 0, GetScaled(1), GetScaled(1));
        paper.canvas.setAttribute('preserveAspectRatio', 'none');
        paper.setSize('100%', '100%');

    var nodes = Nodes.find({});
    console.log('node count: ', nodes.length);
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
                line.attr({stroke: NEUTRAL_COLOUR, "stroke-width": GetScaled(0.01), "stroke-dasharray": "-."});
            });
        }
    });
    // Draw nodes
    nodes.forEach(function (node) {
        var colour = GetNodeColour(node);
        console.log('using color: ' + colour);
        var circle = paper.circle(GetScaled(node.x), GetScaled(node.y), GetScaled(0.04));
        circle.attr("fill", colour);
        circle.attr("stroke-width", 0);
        circle.attr("stroke", 'transparent');

        var innerCircle = paper.circle(GetScaled(node.x), GetScaled(node.y), GetScaled(0.03));
        innerCircle.attr("fill", '#fff');
        innerCircle.attr("stroke-width", 0);
        innerCircle.attr("stroke", 'transparent');

        function TweenOut() {
            circle.animate({r:GetScaled(0.045)}, 1000, "<>", TweenIn);
        }

        function TweenIn() {
            circle.animate({r:GetScaled(0.04)}, 1000, "<>", TweenOut);
        }

        //TweenOut();

        //text
        paper.text(
            GetScaled(node.x) + GetNameOffsetX(),
            GetScaled(node.y) + GetNameOffsetY(node.name), node.name)
            .attr({"font-size": 4, "font-family": "jersey", fill: colour});
    });

};

function GetNodeColour(node) {
    console.log('start');
    var teams = Teams.find({});
    /*
    var owningTeam = Teams.find({'capturedNodes.$' : node.key});
    var owningTeam = Teams.find({capturedNodes: {$elemMatch: {Key: node.key}}});
    */

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

function GetNameOffsetY(s) {
    if (s.indexOf('\n') == -1) {
        return NAME_OFFSET.y * SCALAR;
    } else {
        return MULTI_LINE_NAME_OFFSET.y * SCALAR;
    }
}
