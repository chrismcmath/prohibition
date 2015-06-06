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
    GetProhibiters: function(boughtID, node) {
        var prohibiters = [];
        var teams = Teams.find({}).fetch();
        for (j = 0; j < teams.length; j++) {
            var t = teams[j];
            for (i = 0; i < t.prohibitions.length; i++) {
                var p = t.prohibitions[i];
                console.log("[prohitbiters] comp: " + p.toString() + " with " + node.key + " and " + boughtID);
                if (p.node == node.key && p.id == boughtID) {
                    console.log("push");
                    prohibiters.push(t);
                }
            };
        };
        return prohibiters;
    },
    BlockTeamFromNode: function (team, node) {
        var bN = team.blockedNodes;
        bN.push(node.key);
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
        NewEventString(team.name + " are now in control of " + node.name);
        var connectedNodes = Meteor.myFunctions.GetConnectedNodes(node);
        console.log('connectedNodes: ' + connectedNodes);
        addPoints = 1;
        console.log("[POINTS] Gift 1 point for capture");
        connectedNodes.forEach( function (cn) {
            console.log("check " + cn + " against " + team.capturedNodes);
            if (team.capturedNodes.indexOf(cn) > -1) {
                NewEventString(team.name + " just made a link between " + node.name + " and " + Nodes.findOne({key: cn}).name);
                console.log("[POINTS] Gift 2 points for link");
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
        Receipts.insert({
            node: node,
            team: team,
            boughtID: boughtID
            });
        
        //Add to visited
        if (team.visitedNodes.indexOf(node.key) == -1) {
            Teams.update(team._id, {$push: {visitedNodes: node.key}});
            console.log("[POINTS] Gift 1 point for new visit");
            Meteor.myFunctions.GiftPoints(1, team);
            NewEventString(team.name + " just visited " + node.name + " for the first time!");
        }

        if (team.blockedNodes.indexOf(node.key) > -1) {
            NewEventString(team.name + " just tried to gain a bar they're banned from. Naughty!");
            console.error("Trying to buy at blocked node");
            return;
        } else if (team.capturedNodes.indexOf(node.key) > -1) {
            NewEventString(team.name + " just tried to gain a bar they already own. They're mad with power!");
            console.error("Already have node");
            return;
        }

        var prohibiters = Meteor.myFunctions.GetProhibiters(boughtID, node);
        console.log("found " + prohibiters.length + " prohibiters " + prohibiters);

        if (prohibiters.length > 0) {
            Meteor.myFunctions.BlockTeamFromNode(team, node);
            prohibiters.forEach( function (p) {
                NewEventString(team.name + " just drank " + p.name + "'s prohibited drink");
                console.log("[POINTS] Gift 1 point to other team for new successful prohibition");
                Meteor.myFunctions.GiftPoints(1, p);
            });
            NewEventString(team.name + " is now barred from " + node.name);
        } else {
            Meteor.myFunctions.WinNode(node, team); //work out points here
            Meteor.myFunctions.SetProhibition(prohibitID, node, team);
            Meteor.myFunctions.WipeAllBlocks(team);
        }
    }
}
