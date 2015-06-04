Template.team.helpers({
  self: function () {
    return this.name == GetUserName();
  }
});

Template.team.events({
    "click .team": function() {
        console.log('clicked');
    }
});
