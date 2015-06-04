http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates
function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}


GetProhibiters = new function(boughtID, prohibitID, n) {
    var prohibiters = [];
    var n1 = n;
    Teams.find({}).forEach( function(t) {
        var node = n1;
        for (i = 0; i < t.prohibitions.length; i++) {
            var p = t.prohibitions[i];
            if (p.node == n.is_this_it && p.id == prohibitID) {
                prohibiters.push(t);
            }
        };
    });
    return prohibiters;
}
//NOTE: don't display blocked nodes in bar list

BlockTeamFromNode = new function(team, node) {
    var bn = team.blockedNodes;
    bn.push(node.key);
    Teams.update(team._id, {$set: {blockedNodes: bN}});
}

GiftPoints = new function(points, team) {
    Teams.update(team._id, {$set: {points: team.points + points}});
}

GetConnectedNodes = new function(node) {
    var connectedNodes = [];
    node.connectedNodes.forEach( function(cn) {
        connectedNodes.push(cn);
    });

    Nodes.find({}).forEach( function(n) {
        if (n.key != node.key) {
            n.connectedNodes.forEach( function (cn) {
                connectedNodes.push(cn);
            });
        }
    });
    return ArrNoDupe(connectedNodes);
}

WinNode = new function(node, team) {
    var connectedNodes = GetConnectedNodes(node);
    addPoints = 1;
    connectedNodes.forEach( function (cn) {
        if (capturedNodes.indexOf(cn) > -1) {
            addPoints += 2;
        }
    });
    GiftPoints(addPoints, team);
}

SetProhibition = new function(prohibitID, node, team) {
    Teams.update(team._id, {$set: {prohibitions: [{node: node.key, id: prohibitID}]}});
}

WipeAllBlocks = new function(team) {
    Teams.update(team._id, {$set: {blockedNodes: []}});
}

CommitPurchase = new function(boughtID, prohibitID, node, team) {
    if (team.blockedNodes.indexOf(node.key) > -1) {
        console.error("Trying to buy at blocked node");
        return;
    }

    var prohibiters = GetProhibiters(boughtID, prohibitID, node);

    if (prohibiters.count > 0) {
        BlockTeamFromNode(team, node);
        prohibiters.forEach( function (p) {
            GiftPoints(1, p);
        });
    } else {
        WinNode(node, team); //work out points here
        SetProhibition(prohibitID, node, team);
        WipeAllBlocks(team);
    }
}
