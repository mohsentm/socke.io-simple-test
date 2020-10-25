'use strict';

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req: any, res: any) => {
  res.sendFile(__dirname + '/index.html');
});

let UserConnections: any = [];
io.on('connection', (socket: any) => {
  // socket.broadcast.emit('hi');

  if(socket.user === undefined) {
    socket.user = {
        name: socket.id
    }
    console.log('new member', socket.user.name )
    io.emit('chat message', 'new member ' + socket.user.name);
  } 
  
  console.log(socket.user)

  socket.on('chat message', (msg: any) => {
    socket.emit('chat message','sent');
    io.emit('chat message',  socket.user.name + ' -> ' + msg);
    console.log('message: '+ socket.user.name + ' -> ' + msg);
  });

  socket.on('set name', (msg: any) => {
    socket.user.name = msg
    socket.emit('chat message','your name changed ' + socket.user.name);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected', socket.user.name) ;
    io.emit('chat message',  socket.user.name + ' left');
  });
});

http.listen(80, () => {
  console.log('listening on *:80');
});