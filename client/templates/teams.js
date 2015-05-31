Template.teams.helpers({
  teams: function () {
    return Teams.find({});
  },
  selectedName: function () {
    var team = Teams.findOne(Session.get("self"));
    return team && team.name;
  }
});
