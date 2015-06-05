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

//NOTE: When updating model, do not use model's own properties as a base (eg. model.points + new points). This breaks the mongo interface

Meteor.myFunctions = {
    GetProhibiters: function(boughtID, prohibitID, node) {
        var prohibiters = [];
        var teams = Teams.find({}).fetch();
        for (j = 0; j < teams.length; j++) {
            var t = teams[j];
            for (i = 0; i < t.prohibitions.length; i++) {
                var p = t.prohibitions[i];
                if (p.node == node.key && p.id == prohibitID) {
                    prohibiters.push(t);
                }
            };
        };
        return prohibiters;
    },
    BlockTeamFromNode: function (team, node) {
        var bn = team.blockedNodes;
        bn.push(node.key);
        Teams.update(team._id, {$set: {blockedNodes: bN}});
    },
    GiftPoints: function (points, team) {
        console.log("gift points: " + points + " to " + team._id);
        Teams.update(team._id, {$inc: {points: points}});
    },
    GetConnectedNodes: function (node) {
        var connectedNodes = [];
        node.connectedNodes.forEach( function(cn) {
            connectedNodes.push(cn);
        });

        Nodes.find({}).forEach( function(n) {
            if (n.key != node.key) {
                n.connectedNodes.forEach( function (cn) {
                    if (cn == node.key) {
                        connectedNodes.push(n.key);
                    }
                });
            }
        });
        return ArrNoDupe(connectedNodes);
    },
    WinNode: function(node, team) {
        var connectedNodes = Meteor.myFunctions.GetConnectedNodes(node);
        console.log('connectedNodes: ' + connectedNodes);
        addPoints = 1;
        connectedNodes.forEach( function (cn) {
            console.log("check " + cn + " against " + team.capturedNodes);
            if (team.capturedNodes.indexOf(cn) > -1) {
                addPoints += 2;
            }
        });
        Meteor.myFunctions.GiftPoints(addPoints, team);

        //TODO: 
        //AddToVisitedNodes(node, team);

        // Remove node from previous owner
        console.log('remove all captured');
        Teams.find({}).forEach( function (t) {
            console.log('remove captured');
            Teams.update(t._id, {$pull: {capturedNodes: node.key}});
        });

        // Add new owner
        var capNodes = team.capturedNodes.slice();
        capNodes.push(node.key);
        console.log('add captured');
        Teams.update(team._id, {$push: {capturedNodes: node.key}});
    },
    SetProhibition: function (prohibitID, node, team) {
        if (prohibitID < 0) return;
        Teams.update(team._id, {$set: {prohibitions: [{node: node.key, id: prohibitID}]}});
    },
    WipeAllBlocks: function (team) {
        Teams.update(team._id, {$set: {blockedNodes: []}});
    },
    CommitPurchase: function(boughtID, prohibitID, node, team) {
        if (team.blockedNodes.indexOf(node.key) > -1) {
            console.error("Trying to buy at blocked node");
            return;
        } else if (team.capturedNodes.indexOf(node.key) > -1) {
            console.error("Already have node");
            return;
        }

        var prohibiters = Meteor.myFunctions.GetProhibiters(boughtID, prohibitID, node);

        if (prohibiters.count > 0) {
            Meteor.myFunctions.BlockTeamFromNode(team, node);
            prohibiters.forEach( function (p) {
                Meteor.myFunctions.GiftPoints(1, p);
            });
        } else {
            console.log("1 1 1 1 1 1 1 1 1 1 ");
            Meteor.myFunctions.WinNode(node, team); //work out points here
        console.log("2 2 2 2 2 2 2 2 2 2 ");
            Meteor.myFunctions.SetProhibition(prohibitID, node, team);
        console.log("3 3 3 3 3 3 3 3 3 3 ");
            Meteor.myFunctions.WipeAllBlocks(team);
        console.log("4 4 4 4 4 4 4 4 4 4 ");
        }
    }
}

/*
CommitPurchaseGlobal = new function (boughtID, prohibitID, node, team) {
CommitPurchase(boughtID, prohibitID, node, team);
}
*/
