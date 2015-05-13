PlayerList = new Mongo.Collection('players');
//UserAccounts = new Mongo.Collection('users');

if (Meteor.isClient) {

  Template.leaderboard.helpers( {
    'player' : function() {
      var currentUserId = Meteor.userId();
      return PlayerList.find(
        {},
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
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement' : function() {
      var selectedPlayer = Session.get("selectedPlayer");
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer)
    }
  })


  Template.addPlayerForm.events({
    'submit form' : function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;

      Meteor.call('insertPlayerData', playerNameVar);
    }
  });

 }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    insertPlayerData : function(playerNameVar) {
      var currentUserId = Meteor.userId();
      PlayerList.insert({
        name : playerNameVar,
        score : 0,
        createdBy : currentUserId
      });
    },
    removePlayerData : function(selectedPlayer) {
      PlayerList.remove( selectedPlayer );
    },
    modifyPlayerScore : function(selectedPlayer, scoreValue) {
      PlayerList.update(selectedPlayer, {$inc : {score: scoreValue}});
    }
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');
  console.log("Hello World on the client side.");
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayerList.find({createdBy : currentUserId});
//    return PlayerList.find();
  });

  console.log("Hello World on the server side.");
}


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
//
// chapter 11.
// meteor remove autopublish
//
// chapter 12.
// meteor remove insecure