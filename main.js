if (Meteor.isClient) {
  // Session.setDefault('mySessionExample', 'Sup boo');

  Template.home.created = function() {
    // this.autorun(function(){
    //   alert(Session.get('mySessionExample'))
    // })
  }

  Template.home.helpers({
    // testFunc: function(){
    //   Tracker.autorun(function(c) {
    //     var example = Session.get('mySessionExample');
    //     if(!c.firstRun) {
    //       // this conditional stops reactivity if the session value is the same
    //       alert(example);
    //     }
    //   });
    // }
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
