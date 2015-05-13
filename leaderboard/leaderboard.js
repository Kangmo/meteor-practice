if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

/*
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
*/

  Template.leaderboard.helpers( {
    'player' : function() {
      return PlayerList.find();
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {
  console.log("Hello World on the client side.");
}

if (Meteor.isServer) {
  console.log("Hello World on the server side.");
}

PlayerList = new Mongo.Collection('players');



// Following code was tested on JavaScript Console.
// PlayerList.insert( { name : "David", score : 0} );
// PlayerList.find().fetch();
// PlayerList.find().count();