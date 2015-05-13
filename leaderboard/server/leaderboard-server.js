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

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayerList.find({createdBy : currentUserId});
//    return PlayerList.find();
  });

  console.log("Hello World on the server side.");
