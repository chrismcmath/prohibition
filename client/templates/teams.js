Template.teams.helpers({
  teams: function () {
    return Teams.find({}, {sort: {points: -11}});
  },
  selectedName: function () {
    var team = Teams.findOne(Session.get("self"));
    return team && team.name;
  }
});
