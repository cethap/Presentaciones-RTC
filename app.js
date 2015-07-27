var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/m', function (req, res) {
  res.sendfile(__dirname + '/movil.html');
});

io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('sendLink', function (data) {
  	console.log(data);
    io.sockets.emit('Linkiar', data);
  });
});

server.listen(process.env.PORT || 8888);