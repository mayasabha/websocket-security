import { Server } from "socket.io";

const io = new Server(8080);

io.on("connection", (socket) => {
  socket.emit("welcome", {name: 'socketio-simple'});

  socket.on("message", (data) => {
      socket.send(data);
  });
});