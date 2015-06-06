Template.event_string.helpers({
  localeDate: function () {
    var time = this.date.toLocaleTimeString();
    var fontSafe = time.replace(/:/g, ".");
    return fontSafe;
  }
});
