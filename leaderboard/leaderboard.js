if (Meteor.isClient) {

  Template.leaderboard.helpers( {
    'player' : function() {
      return PlayerList.find();
    },
    'selectedClass' : function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected";
      }
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
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);

      var selectedPlayer = Session.get('selectedPlayer');
      console.log("The selected player is : " + selectedPlayer);
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