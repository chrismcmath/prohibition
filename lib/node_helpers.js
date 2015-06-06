GetNodeOwner = function (node) {
    var teams = Teams.find({});
    var owners = Teams.find({'capturedNodes' : node.key}).fetch();
    if (owners.length > 1) {
        console.error('More than one owner of a node: ' + owners);
    } else if (owners.length == 1) {
        return owners[0];
    } else {
        return null;
    }
}

//TODO: change to ID
GetNodeID = function (node) {
    //return node._id;
    return node.key;
}
