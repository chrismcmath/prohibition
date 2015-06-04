// change to be user.team = new team();
Accounts.onCreateUser(function(options, user) {
    var team = Teams.insert({
        name: user.username,
        colour: TEAM_COLOURS[Teams.find({}).count()],
        points: 0,
        capturedNodes: [],
        blockedNodes: [],
        prohibitions: [],
        visited_bars: []
    });

    Meteor.users.update(user._id, {$set: {'teamID': team._id}});

    if (Meteor.users.username === 'chrismcmath')
        user.admin = true;

    return user;
});
