var NEUTRAL_COLOUR = '#000';
var PATH_COLOUR = '#ccc';
var BORDER_COLOUR = '#555';
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
    if (typeof paper != 'undefined') {
        paper.remove();
    }

    paper = Raphael('raphael-paper', GetScaled(1), GetScaled(1));
    paper.setViewBox(0, 0, GetScaled(1), GetScaled(1));
    paper.canvas.setAttribute('preserveAspectRatio', 'none');
    paper.setSize('100%', '100%');

    var nodes = Nodes.find({});

    // Draw connections
    nodes.forEach(function (node) {
        //Draw lines
        if (node.connectedNodes.length > 0) {
            node.connectedNodes.forEach(function (cnKey) {
            //TODO: Change to id
                var cn = Nodes.findOne({key: cnKey}); 

                //NOTE: The connected node might not have loaded yet, so return safely
                if (typeof cn == 'undefined' ||
                        cn == null) {
                    return;
                }

                var nodeOwner = GetNodeOwner(node);
                var cnOwner = GetNodeOwner(cn);

                if (typeof nodeOwner != 'undefined' &&
                        nodeOwner != null &&
                        nodeOwner._id == cnOwner._id) {
                    var blackLine = paper.path([
                        "M", GetScaled(node.x), GetScaled(node.y),
                        "L", GetScaled(cn.x), GetScaled(cn.y)
                        ]);
                    blackLine.attr({stroke: BORDER_COLOUR, "stroke-width": GetScaled(0.02)});
                    var colourLine = paper.path([
                        "M", GetScaled(node.x), GetScaled(node.y),
                        "L", GetScaled(cn.x), GetScaled(cn.y)
                        ]);
                    colourLine.attr({stroke: nodeOwner.colour, "stroke-width": GetScaled(0.01)});
                } else {
                    var line = paper.path([
                            "M", GetScaled(node.x), GetScaled(node.y),
                            "L", GetScaled(cn.x), GetScaled(cn.y)
                            ]);
                    line.attr({stroke: PATH_COLOUR, "stroke-width": GetScaled(0.01), "stroke-dasharray": "-."});
                }
            });
        }
    });

    // Draw nodes
    nodes.forEach(function (node) {
        var owner = GetNodeOwner(node);
        console.log('got owner: ' + owner);
        var colour;
        if (owner != null) {
            colour = owner.colour;
        } else {
            colour = '#fff';
        }

        var circle = paper.circle(GetScaled(node.x), GetScaled(node.y), GetScaled(0.04));
        circle.attr("fill", NEUTRAL_COLOUR);
        circle.attr("stroke-width", 0);
        circle.attr("stroke", 'transparent');

        var innerCircle = paper.circle(GetScaled(node.x), GetScaled(node.y), GetScaled(0.03));
        innerCircle.attr("fill", colour);
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
            .attr({"font-size": 4, "font-family": "jersey", fill: NEUTRAL_COLOUR});
    });
};

