MESSAGE_LIMIT = 10;

Template.event_strings.helpers({
  eventStrings: function () {
    var eses = EventStrings.find({}, {sort: {date: -1}});
    var i = 0;
    var strings = [];
    eses.forEach( function (es) {
        if (i < MESSAGE_LIMIT && typeof es.string != "undefined" && es.string != "" && es.string != null) {
            strings.push(es);
            i++;
        }
    });
    return strings;
  }
});
