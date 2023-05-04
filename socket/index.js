const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
const PORT = process.env.PORT || 5000;

let users = [];

io.on('connection', (socket) => {
    // connect
    console.log('welcome');
  
    socket.on('my-event', (data) => {
      console.log(`event` + data);
    });
  
    // join room
    socket.on('join-room', (roomId) => {
      console.log(`User joined room ${roomId}`);
      socket.join(roomId);
    });
  
    console.log(io.sockets.adapter.rooms);
  
    // leaver room
    socket.on('leave-room', (roomId) => {
      console.log(`User left room ${roomId}`);
      socket.leave(roomId);
    });
  
    // send msg
    socket.on('send-message', (message) => {
      console.log(`Message received: ${message}`);
      io.emit('receive-message', message);
    });
  
    // receive msg
    socket.on('new-message', (message) => {
      console.log(`New message: ${message}`);
      io.emit('receive-message', message);
    });
  
    // send noti
    socket.on('send-noti', (notification) => {
      console.log(notification);
      const room = notification.room;
      socket.to(room).emit('receive-noti', notification.noti); 
       
    });
     
    // disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  
  });

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));