// players.js
// Information about current class and names.
// Methods for rerolling these, getting and setting data.

(function() {
  var obj = {};
  obj.player1 = 0;
  obj.player2 = 0;
  obj.prev1 = 99;
  obj.prev2 = 99;
  obj.names = {};
  obj.names.p1 = 'Player 1';
  obj.names.p2 = 'Player 2';

  var roll = function() {
    return Math.floor((Math.random()*9)+1);
  };

  module.exports.reroll = function() {
    obj.player1 = roll();
    while(obj.player1 == obj.prev1) {
      obj.player1 = roll();
    }
    var p2 = roll();
    while(p2 == obj.player1 || p2 == obj.prev2) {
      p2 = roll();
    }
    obj.player2 = p2;

    obj.prev1 = obj.player1;
    obj.prev2 = obj.player2;
  };

  module.exports.getPlayerData = function() {
    var data = {
      p1: obj.player1,
      p2: obj.player2,
      time: Date.now(),
      names: obj.names
    }
    return data;
  };

  module.exports.setNames = function(names) {
    obj.names = names;
  };
}());






