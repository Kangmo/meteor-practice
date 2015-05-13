if (Meteor.isClient) {

  Template.leaderboard.helpers( {
    'player' : function() {
      return PlayerList.find({}, {sort : {score:-1}});
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
      //console.log("event type : " + event.type + ", name : " + playerNameVar);
      PlayerList.insert({
        name : playerNameVar,
        score : 0
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



// Following code was tested on JavaScript Console.
// PlayerList.insert( { name : "David", score : 0} );
// PlayerList.find().fetch();
// PlayerList.find().count();