if (Meteor.isClient) {

  Template.leaderboard.helpers( {
    'player' : function() {
      return PlayerList.find();
    }
  });

  Template.leaderboard.events( {
    'click' : function() {
      return console.log("You clicked something.");
    },
    'click li' : function() {
      console.log("You clicked an li element.");
    },
    'click .player' : function() {
      console.log("You clicked a .player element.");
    }
  })
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