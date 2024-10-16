const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const socket = require('socket.io');

// Login on server
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});


//Static files
app.use(express.static('app'));

//Socker
const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket);
  console.log('Made socket connection');

  socket.on('disconnect', () => {
    console.log('Someone left chat');
  });

  socket.on('send_message', (msg) => {
    io.emit('new_message', msg)
  })
});