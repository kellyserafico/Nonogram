// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});

// // Serve the socket.io.js file with the correct MIME type
// app.get('/socket.io/socket.io.js', function(request, response) {
//   response.sendFile(path.join(__dirname, '/node_modules/socket.io/client-dist/socket.io.js'));
// });

// New connection
io.on('connection', (socket) => {
  console.log('a user connected');
});



// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});


