Template.team.helpers({
  self: function () {
    return Session.equals("selectedPlayer", this._id) ? "self" : '';
  }
});

Template.team.events({
    "click .team": function() {
        console.log('clicked');
    }
});
