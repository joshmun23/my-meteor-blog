if (Meteor.isClient) {
  Session.setDefault('mySessionExample', 'Sup boo');

  Template.home.helpers({
    testFunc: function(){
      Tracker.autorun(function(c) {
        var example = Session.get('mySessionExample');
        if(!c.firstRun) {
          alert(example);
        }
      });
    }
  })
  // Tracker.autorun(function() {
  //   var example = Session.get('mySessionExample');
  //   alert(example);
  // });

  Template.home.events({
    'button .testFunc': function() {
      return testFunc
    }
  })
}
