// Add the WebSocket handlers
io.on('connection', function(socket) {
  // Create a new board
  let newBoard = new Board();

  // Emit 'makeBoard' event to create a new board
  io.emit('makeBoard', newBoard);

  console.log('A user connected and a new board was created');

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});