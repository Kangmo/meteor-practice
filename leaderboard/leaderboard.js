if (Meteor.isClient) {

  Template.leaderboard.helpers( {
    'player' : function() {
      var currentUserId = Meteor.userId();
      return PlayerList.find(
        {createdBy: currentUserId},
        {sort : {score:-1, name: 1}}
      );
    },
    'selectedClass' : function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected";
      }
    },
    'showSelectedPlayer' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayerList.findOne(selectedPlayer);

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
    },
    'click .increment' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
//      PlayerList.update(selectedPlayer, { $set : {score:5} });
      PlayerList.update(selectedPlayer, { $inc : {score:5} });
    },
    'click .decrement' : function() {
      var selectedPlayer = Session.get("selectedPlayer");
      PlayerList.update(selectedPlayer, { $inc : {score:-5} });
    },
    'click .remove' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.remove(selectedPlayer);
    }
  })


  Template.addPlayerForm.events({
    'submit form' : function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      //console.log("event type : " + event.type + ", name : " + playerNameVar);
      PlayerList.insert({
        name : playerNameVar,
        score : 0,
        createdBy : currentUserId
      })
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
//UserAccounts = new Mongo.Collection('users');




// Following code was tested on JavaScript Console.
//
// PlayerList.insert( { name : "David", score : 0} );
// PlayerList.find().fetch();
// PlayerList.find().count();
//
// chapter 10.
// Meteor.users.find().fetch();
//

// Commands typed
// chapter 3.
// meteor create leaderboard
//
// chapter 10.
// meteor add accounts-password
// meteor add accounts-ui
// (After CTRL+C),
// meteor reset