var players = require('./players.js');
players.reroll();

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 9800});
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message);
    var data = JSON.parse(message);

    if(data.command == 'reroll') {
      players.reroll();
    }
    if(data.command == 'updateNames') {
      players.setNames(data.names);
    }
    var playerData = players.getPlayerData();
    wss.broadcast(playerData);
  });
  var playerData = players.getPlayerData();
  ws.send(JSON.stringify(playerData));
});

wss.broadcast = function(data) {
  console.log('broadcasting', data);
  for(var i in this.clients) this.clients[i].send(JSON.stringify(data));
};
