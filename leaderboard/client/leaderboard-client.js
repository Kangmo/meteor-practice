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

  Meteor.subscribe('thePlayers');
  console.log("Hello World on the client side.");
