GetUserTeam = function() {
    if (Meteor.user() != null && typeof Meteor.user() != 'undefined') {
        return Teams.findOne({name: Meteor.user().username})
    }
}

GetUserName = function() {
    return Meteor.user().username;
}
