// // Dependencies
// var express = require('express');
// var http = require('http');
// var path = require('path');
// var socketIO = require('socket.io');
// var app = express();
// var server = http.Server(app);
// var io = socketIO(server);
// app.set('port', 5000);
// app.use('/static', express.static(__dirname + '/static'));

// // Routing
// app.get('/', function(request, response) {
//   response.sendFile(path.join(__dirname, '/static/index.html'));
// });
// // Starts the server.
// server.listen(5000, function() {
//   console.log('Starting server on port 5000');
// });

// // Add the WebSocket handlers
// io.on('connection', function(socket) {
// });

// setInterval(function() {
//   io.sockets.emit('message', 'hi!');

// }, 1000);

// console.log("http://localhost:5000")

//Setup stuff idrk

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const publicPath    = path.join(__dirname, '/../public');
// var socket = io();
app.use('/static', express.static(__dirname + '/static'));

//send html to browser
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});


io.on('connection', (socket) => {
  
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
})
  socket.on('peepee', (msg) => {
    console.log(msg);
  });

  socket.on('makeActive', () => {
  io.sockets.emit('makeActive');
})

  socket.on('makeCanvas', () =>{
    io.sockets.emit('makeCanvas');
  })


});


//start the server with websocket too
server.listen(3000, () => {
  console.log('listening on *:3000');
  
});



// socket.on('makeActive', () => {
//   io.sockets.emit('makeActive');
// })