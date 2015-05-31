Template.team.helpers({
  self: function () {
    return Session.equals("selectedPlayer", this._id) ? "self" : '';
  }
});
